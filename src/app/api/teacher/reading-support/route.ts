import { requireTeacher, seatsForTeacher, aggregateStudents, avgOf } from "../_server";
import { getLessons } from "@/lib/content";
import type { Lesson } from "@/lib/content/types";
import type { AgeGroup } from "@/lib/content/types";
import { READING_SKILLS, ageGroupForAge } from "@/lib/teacher-types";
import type { RecommendStep, ReadingSupportEntry } from "@/lib/teacher-types";

const FLAG_AVG = 65; // readingAvg below this gets flagged
const FLAG_SCORE = 50; // any single reading quiz below this gets flagged

function groupLessons(group: AgeGroup): Lesson[] {
  return getLessons("reading", group);
}

/**
 * Build the 4-step recommended activity list from REAL registry lessons:
 * 1 short passage (warm-up) -> 2 skill lesson -> 3 its worksheet -> 4 its quiz.
 */
function recommend(group: AgeGroup, targetLessonId: string): RecommendStep[] {
  const lessons = groupLessons(group);
  const target = lessons.find((l) => l.id === targetLessonId) ?? lessons[0];
  if (!target) {
    return [{ step: 1, title: "Reading practice", type: "reading" }];
  }
  const idx = lessons.findIndex((l) => l.id === target.id);
  const warmup = idx > 0 ? lessons[idx - 1] : lessons[0];
  const steps: RecommendStep[] = [];
  if (warmup && warmup.id !== target.id) {
    steps.push({ step: 1, title: `Read: ${warmup.title}`, lessonId: warmup.id, type: "reading" });
  } else {
    steps.push({ step: 1, title: `Re-read: ${target.title}`, lessonId: target.id, type: "reading" });
  }
  steps.push({ step: 2, title: `Lesson: ${target.title}`, lessonId: target.id, type: "lesson" });
  steps.push({ step: 3, title: `Worksheet: ${target.title}`, lessonId: target.id, type: "worksheet" });
  steps.push({ step: 4, title: `Quiz: ${target.title}`, lessonId: target.id, type: "quiz" });
  return steps;
}

interface Entry extends ReadingSupportEntry {
  flagged: boolean;
}

/** GET /api/teacher/reading-support — reading skill analysis for the roster. */
export async function GET(req: Request) {
  const auth = await requireTeacher(req);
  if (auth instanceof Response) return auth;

  const seats = await seatsForTeacher(auth.id);

  // One entry per distinct student (first seat wins for classroom context).
  const seen = new Set<string>();
  const uniqueSeats = seats.filter((s) =>
    seen.has(s.student.id) ? false : (seen.add(s.student.id), true)
  );

  const aggregates = await aggregateStudents(uniqueSeats.map((s) => s.student.id));
  const all: Entry[] = [];

  for (const seat of uniqueSeats) {
    const agg = aggregates.get(seat.student.id);
    const rows = agg?.rows ?? [];
    const group = (
      ["early", "primary", "intermediate", "teen"].includes(seat.student.ageGroup)
        ? seat.student.ageGroup
        : ageGroupForAge(seat.student.age)
    ) as AgeGroup;

    const skillMap = READING_SKILLS[group] ?? {};
    const readingRows = rows.filter((r) => r.subjectId === "reading");
    const scoreByLesson = new Map<string, number>();
    for (const r of readingRows) {
      if (typeof r.score === "number") {
        // keep the best attempt per lesson
        scoreByLesson.set(r.lessonId, Math.max(scoreByLesson.get(r.lessonId) ?? 0, r.score));
      }
    }
    const readingAvg = avgOf(
      readingRows.map((r) => r.score).filter((s): s is number => typeof s === "number")
    );

    const skills = Object.entries(skillMap).map(([n, skill]) => {
      const lessonId = `reading-${group}-${n}`;
      return { skill, lessonId, score: scoreByLesson.get(lessonId) ?? null };
    });

    // Weakest skill: lowest score; if anything is unattempted, prefer the
    // first unattempted skill ("not yet attempted").
    const unattempted = skills.find((s) => s.score === null);
    const lowest = skills
      .filter((s): s is { skill: string; lessonId: string; score: number } => s.score !== null)
      .sort((a, b) => a.score - b.score)[0];
    const weakest = unattempted
      ? { ...unattempted }
      : lowest
        ? { ...lowest }
        : { skill: "Reading", lessonId: `reading-${group}-1`, score: null };

    const anyLow = skills.some((s) => s.score !== null && s.score < FLAG_SCORE);
    const flagged = readingAvg === null || (readingAvg < FLAG_AVG) || anyLow;

    all.push({
      studentId: seat.student.id,
      name: seat.student.name,
      classroomId: seat.classroomId,
      classroomName: seat.classroomName,
      groupName: seat.groupName,
      readingAvg: readingAvg === null ? null : Math.round(readingAvg),
      weakestSkill: weakest,
      skills,
      recommended: recommend(group, weakest.lessonId),
      flagged,
    });
  }

  const sorted = all.sort((a, b) => (a.readingAvg ?? -1) - (b.readingAvg ?? -1));

  const strip = (e: Entry): ReadingSupportEntry => ({
    studentId: e.studentId,
    name: e.name,
    classroomId: e.classroomId,
    classroomName: e.classroomName,
    groupName: e.groupName,
    readingAvg: e.readingAvg,
    weakestSkill: e.weakestSkill,
    skills: e.skills,
    recommended: e.recommended,
  });

  return Response.json({
    flagged: sorted.filter((e) => e.flagged).map(strip),
    all: sorted.map(strip),
  });
}
