import { db } from "@/lib/db";
import {
  REPORT_MAX_BYTES,
  type ReportUploadResponse,
} from "@/lib/report-types";
import {
  buildReportKey,
  canManageStudent,
  reportStorageConfigured,
  requireUser,
  uploadReportObject,
  validateReportFile,
} from "../_util";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

/**
 * POST /api/reports/upload — multipart/form-data (TEACHER or ADMIN)
 *   file        PDF / DOC / DOCX / JPG / PNG, ≤ 25 MB (ext + mime + magic bytes)
 *   studentId   the student this report is about
 *   term        e.g. "Term 1" (required)
 *   description optional free text
 *   parentIds   JSON string array — at least one; every id must be the ACTIVE
 *               parent linked to the student (Student.parentId).
 *
 * The file is stored in the private "reports" bucket; a Report row plus one
 * ReportAccess row per granted parent are created, and each parent receives a
 * notification. Access is private: parents read only via short-lived signed
 * URLs minted by /api/reports/[id]/file.
 */
export async function POST(req: Request) {
  const auth = await requireUser(req, ["TEACHER", "ADMIN"]);
  if (auth instanceof Response) return auth;

  if (!reportStorageConfigured()) {
    return Response.json({ error: "Report storage is not configured." }, { status: 500 });
  }

  let form: FormData;
  try {
    form = await req.formData();
  } catch {
    return Response.json({ error: "Expected multipart form data." }, { status: 400 });
  }

  const file = form.get("file");
  const studentId = String(form.get("studentId") ?? "").trim();
  const term = String(form.get("term") ?? "").trim();
  const description = String(form.get("description") ?? "").trim().slice(0, 1000);
  const parentIdsRaw = String(form.get("parentIds") ?? "[]");

  if (!(file instanceof File)) {
    return Response.json({ error: "Choose a file to upload." }, { status: 400 });
  }
  if (file.size <= 0) {
    return Response.json({ error: "The chosen file is empty." }, { status: 400 });
  }
  if (file.size > REPORT_MAX_BYTES) {
    return Response.json({ error: "Reports must be under 25 MB." }, { status: 400 });
  }
  if (!studentId) {
    return Response.json({ error: "Choose a student for this report." }, { status: 400 });
  }
  if (!term || term.length > 40) {
    return Response.json({ error: "Enter a term label (e.g. \u201CTerm 1\u201D)." }, { status: 400 });
  }

  // --------------------------- student + permission -------------------------
  const student = await db.student.findUnique({
    where: { id: studentId },
    select: { id: true, name: true, parentId: true, parent: { select: { id: true, name: true } } },
  });
  if (!student) {
    return Response.json({ error: "Student not found." }, { status: 404 });
  }
  if (!(await canManageStudent(auth, studentId))) {
    return Response.json(
      { error: "You can only upload reports for students in your classrooms." },
      { status: 403 }
    );
  }

  // ------------------------------ parent access -----------------------------
  if (!student.parentId) {
    return Response.json(
      {
        error:
          "This student has no parent account linked — upload denied. Link a parent first.",
      },
      { status: 400 }
    );
  }
  let requested: string[] = [];
  try {
    const parsed: unknown = JSON.parse(parentIdsRaw);
    if (Array.isArray(parsed)) {
      requested = parsed.filter((v): v is string => typeof v === "string");
    }
  } catch {
    return Response.json({ error: "parentIds must be a JSON array of user ids." }, { status: 400 });
  }
  // Only the ACTIVE linked parent may ever be granted access.
  const allowedParentIds = new Set([student.parentId]);
  const grantedParentIds = Array.from(new Set(requested)).filter((id) =>
    allowedParentIds.has(id)
  );
  if (grantedParentIds.length === 0) {
    return Response.json(
      { error: "Select at least one parent to share this report with." },
      { status: 400 }
    );
  }

  // ------------------------------ file content ------------------------------
  const bytes = Buffer.from(await file.arrayBuffer());
  const mimeType = validateReportFile(file.name, file.type, bytes);
  if (mimeType === null) {
    return Response.json(
      { error: "Only PDF, DOC, DOCX, JPG or PNG files are allowed." },
      { status: 400 }
    );
  }

  // ------------------------------- store file -------------------------------
  const fileKey = buildReportKey(studentId, file.name);
  try {
    await uploadReportObject(fileKey, bytes, mimeType);
  } catch {
    return Response.json(
      { error: "Could not store the report file. Please try again." },
      { status: 502 }
    );
  }

  // ------------------------------ persist rows ------------------------------
  const report = await db.report.create({
    data: {
      studentId,
      uploadedById: auth.id,
      term,
      description,
      fileKey,
      fileName: file.name.split(/[\\/]/).pop() || file.name,
      mimeType,
    },
  });
  await db.reportAccess.createMany({
    data: grantedParentIds.map((parentUserId) => ({ reportId: report.id, parentUserId })),
    skipDuplicates: true,
  });

  // ---------------------------- notify the parents --------------------------
  try {
    await db.notification.createMany({
      data: grantedParentIds.map((userId) => ({
        userId,
        childId: student.id,
        childName: student.name,
        kind: "report",
        text: `\u{1F4C4} New student report available \u2014 ${student.name} (${term})`,
      })),
      skipDuplicates: true,
    });
  } catch (err) {
    // Report is saved; the notification must never fail the upload.
    console.error("report notification failed", err);
  }

  const parentNames = await db.user.findMany({
    where: { id: { in: grantedParentIds } },
    select: { id: true, name: true },
  });

  const payload: ReportUploadResponse = {
    report: {
      id: report.id,
      studentId,
      studentName: student.name,
      term,
      description,
      fileName: report.fileName,
      mimeType,
      createdAt: report.createdAt.toISOString(),
      uploadedBy: auth.name,
      parents: parentNames.map((p) => ({ parentUserId: p.id, parentName: p.name })),
    },
  };
  return Response.json(payload, { status: 201 });
}
