import { randomBytes } from "node:crypto";
import { db } from "@/lib/db";

// ---------------------------------------------------------------------------
// Certificates — real, earned awards. No demo seeding anywhere: certificates
// are only created when a student genuinely reaches a milestone.
// ---------------------------------------------------------------------------

export type CertificateKind = "lesson" | "assignment" | "streak" | "level" | "custom";

export interface EarnedCertificate {
  id: string;
  serial: string;
  title: string;
  kind: string;
  description: string;
  earnedAt: Date;
}

const BASE32 = "ABCDEFGHIJKLMNOPQRSTUVWXYZ23456789"; // RFC-4648 alphabet

function randomSerial(): string {
  const year = new Date().getFullYear();
  const bytes = randomBytes(6);
  let code = "";
  for (let i = 0; i < 6; i++) code += BASE32[bytes[i] % 32];
  return `BM-${year}-${code}`;
}

function startOfToday(): Date {
  const d = new Date();
  d.setHours(0, 0, 0, 0);
  return d;
}

/**
 * Award a certificate to a student. Duplicate-safe: if the same student
 * already earned the same kind+title today, the existing row is returned
 * instead of creating a duplicate. Serials look like BM-2025-K7Q2XM.
 */
export async function awardCertificate(
  studentId: string,
  kind: CertificateKind,
  title: string,
  description: string
): Promise<EarnedCertificate> {
  const existing = await db.certificate.findFirst({
    where: {
      studentId,
      kind,
      title,
      earnedAt: { gte: startOfToday() },
    },
  });
  if (existing) return existing;

  // Retry a few times in the (very unlikely) event of a serial collision.
  for (let attempt = 0; attempt < 5; attempt++) {
    try {
      return await db.certificate.create({
        data: { studentId, kind, title, description, serial: randomSerial() },
      });
    } catch {
      if (attempt === 4) throw new Error("Could not generate a unique certificate serial");
    }
  }
  throw new Error("Could not award certificate"); // unreachable
}

// ------------------------- Milestone certificates --------------------------

const WORKSHEET_MILESTONES = [10, 20, 50] as const;
const XP_MILESTONES = [100, 500, 1000] as const;
const READING_LESSONS_FOR_STAR = 5;

/**
 * Honestly evaluate a student's real progress and award any milestone
 * certificates they have justly earned:
 *  - First completed teacher assignment  → "First Steps" (assignment)
 *  - Worksheets done crossing 10/20/50   → "Worksheet Star (10/20/50)" (streak)
 *  - XP crossing 100/500/1000            → "XP Champion (100/500/1000)" (level)
 *  - 5+ distinct reading lessons done    → "Reading Star" (lesson)
 *
 * Idempotent and monotonic — safe to call after any progress/XP/assignment
 * completion write. Returns ONLY the certificates newly created by this call.
 */
export async function ensureMilestoneCertificates(studentId: string): Promise<EarnedCertificate[]> {
  const [student, completedAssignments, readingLessons, existingTitles] = await Promise.all([
    db.student.findUnique({
      where: { id: studentId },
      select: { id: true, xp: true, worksheetsDone: true },
    }),
    db.assignmentResult.count({ where: { studentId, status: "completed" } }),
    db.progress.findMany({
      where: { studentId, subjectId: "reading" },
      select: { lessonId: true },
    }),
    db.certificate.findMany({ where: { studentId }, select: { title: true } }),
  ]);

  if (!student) return [];
  const has = (title: string) => existingTitles.some((c) => c.title === title);
  const pending: { kind: CertificateKind; title: string; description: string }[] = [];

  if (completedAssignments >= 1 && !has("First Steps")) {
    pending.push({
      kind: "assignment",
      title: "First Steps",
      description: "Completed their very first teacher assignment. Every journey starts here!",
    });
  }

  for (const n of WORKSHEET_MILESTONES) {
    const title = `Worksheet Star (${n})`;
    if (student.worksheetsDone >= n && !has(title)) {
      pending.push({
        kind: "streak",
        title,
        description: `Finished ${n} worksheets with steady effort. Star power!`,
      });
    }
  }

  for (const xp of XP_MILESTONES) {
    const title = `XP Champion (${xp})`;
    if (student.xp >= xp && !has(title)) {
      pending.push({
        kind: "level",
        title,
        description: `Earned a mighty ${xp} XP through lessons, quizzes and worksheets.`,
      });
    }
  }

  const distinctReading = new Set(readingLessons.map((r) => r.lessonId));
  if (distinctReading.size >= READING_LESSONS_FOR_STAR && !has("Reading Star")) {
    pending.push({
      kind: "lesson",
      title: "Reading Star",
      description: `Completed ${distinctReading.size} reading lessons. A true book explorer!`,
    });
  }

  const awarded: EarnedCertificate[] = [];
  for (const p of pending) {
    awarded.push(await awardCertificate(studentId, p.kind, p.title, p.description));
  }
  return awarded;
}
