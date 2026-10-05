import type { AgeGroup, Lesson, Subject } from "./types";
import { mathSubject } from "./math";
import { literacySubject } from "./literacy";
import { scienceSubject } from "./science";
import { lifeSubject } from "./life";

export * from "./types";

export const subjects: Subject[] = [
  mathSubject,
  literacySubject,
  scienceSubject,
  lifeSubject,
];

export const subjectMap: Record<string, Subject> = Object.fromEntries(
  subjects.map((s) => [s.id, s])
);

export function getSubject(subjectId: string): Subject | undefined {
  return subjectMap[subjectId];
}

export function getLessons(subjectId: string, group: AgeGroup): Lesson[] {
  return subjectMap[subjectId]?.lessons[group] ?? [];
}

export function getLesson(subjectId: string, lessonId: string): Lesson | undefined {
  const subject = subjectMap[subjectId];
  if (!subject) return undefined;
  // Lesson ids follow the pattern `${subjectId}-${group}-${n}`, e.g. "math-early-1".
  const group = lessonId.split("-")[1] as AgeGroup;
  return (subject.lessons[group] ?? []).find((l) => l.id === lessonId);
}

/** Total number of lessons available to a given age group. */
export function totalLessonsFor(group: AgeGroup): number {
  return subjects.reduce((n, s) => n + s.lessons[group].length, 0);
}

/** Deterministic Question of the Day: picks (subject, lesson, question) by date. */
export function getDailyChallenge(
  group: AgeGroup,
  date = new Date()
): { subject: Subject; lesson: Lesson; questionIndex: number } {
  const seed = Number(
    `${date.getFullYear()}${String(date.getMonth() + 1).padStart(2, "0")}${String(
      date.getDate()
    ).padStart(2, "0")}`
  );
  const subject = subjects[seed % subjects.length];
  const lessons = subject.lessons[group];
  const lesson = lessons[Math.floor(seed / 7) % lessons.length];
  const questionIndex = Math.floor(seed / 13) % lesson.quiz.length;
  return { subject, lesson, questionIndex };
}
