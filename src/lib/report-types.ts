// ---------------------------------------------------------------------------
// Shared types for the Student Report system (private educational records).
// Teachers upload documents into the private "reports" Supabase bucket and
// grant access to the student's linked parent. Files are only ever reachable
// through short-lived signed URLs minted by /api/reports/[id]/file.
// ---------------------------------------------------------------------------

/** A parent/guardian eligible to receive a student's report. */
export interface ReportParentOption {
  id: string;
  name: string;
  email: string;
}

/** A parent who has been granted access to a report (teacher list view). */
export interface ReportAccessInfo {
  parentUserId: string;
  parentName: string;
}

/** One student report as returned by GET /api/reports (role-aware). */
export interface ReportItem {
  id: string;
  studentId: string;
  studentName: string;
  /** e.g. "Term 1" */
  term: string;
  description: string;
  fileName: string;
  mimeType: string;
  /** ISO date string. */
  createdAt: string;
  /** Display name of the teacher/admin who uploaded the report. */
  uploadedBy: string;
  /** Parents granted access (populated for the teacher/admin view). */
  parents: ReportAccessInfo[];
}

export interface ReportsListResponse {
  reports: ReportItem[];
}

export interface ReportUploadResponse {
  report: ReportItem;
}

/** File constraints shared by the upload route and the teacher upload UI. */
export const REPORT_MAX_BYTES = 25 * 1024 * 1024; // 25 MB

export const REPORT_ACCEPT = ".pdf,.doc,.docx,.jpg,.jpeg,.png";

/** Pretty label for a file extension (used by file-type chips). */
export function reportTypeLabel(fileName: string): string {
  const ext = fileName.split(".").pop()?.toLowerCase() ?? "";
  if (ext === "pdf") return "PDF";
  if (ext === "doc" || ext === "docx") return "Word";
  if (ext === "jpg" || ext === "jpeg") return "JPG";
  if (ext === "png") return "PNG";
  return ext ? ext.toUpperCase() : "File";
}
