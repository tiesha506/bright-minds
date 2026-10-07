import type { AgeGroup, Lesson, Subject } from "./types";

// Every subject is composed from four age-group files so difficulty, voice and
// activities can be tuned per group (early 6-8 / primary 9-11 /
// intermediate 12-13 / teen 14-15).
import { lessons as mathEarlyLessons } from "./math-early";
import { lessons as mathPrimaryLessons } from "./math-primary";
import { lessons as mathIntermediateLessons } from "./math-intermediate";
import { lessons as mathTeenLessons } from "./math-teen";

import { lessons as englishEarlyLessons } from "./english-early";
import { lessons as englishPrimaryLessons } from "./english-primary";
import { lessons as englishIntermediateLessons } from "./english-intermediate";
import { lessons as englishTeenLessons } from "./english-teen";

import { lessons as scienceEarlyLessons } from "./science-early";
import { lessons as sciencePrimaryLessons } from "./science-primary";
import { lessons as scienceIntermediateLessons } from "./science-intermediate";
import { lessons as scienceTeenLessons } from "./science-teen";

import { lessons as readingEarlyLessons } from "./reading-early";
import { lessons as readingPrimaryLessons } from "./reading-primary";
import { lessons as readingIntermediateLessons } from "./reading-intermediate";
import { lessons as readingTeenLessons } from "./reading-teen";

export * from "./types";

function compose(parts: {
  early: Lesson[];
  primary: Lesson[];
  intermediate: Lesson[];
  teen: Lesson[];
}): Record<AgeGroup, Lesson[]> {
  return {
    early: parts.early,
    primary: parts.primary,
    intermediate: parts.intermediate,
    teen: parts.teen,
  };
}

const mathSubject: Subject = {
  id: "math",
  name: "Mathematics",
  emoji: "🔢",
  gradient: "from-amber-400 to-orange-500",
  taglines: {
    early: "Count, sort and play with numbers every day!",
    primary: "Level up your times tables, fractions and money smarts!",
    intermediate: "Crack ratios, integers and equations with real-world math.",
    teen: "Master algebra, functions and data — skills for exams and for life.",
  },
  lessons: compose({
    early: mathEarlyLessons,
    primary: mathPrimaryLessons,
    intermediate: mathIntermediateLessons,
    teen: mathTeenLessons,
  }),
};

const englishSubject: Subject = {
  id: "english",
  name: "English",
  emoji: "✏️",
  gradient: "from-rose-400 to-pink-600",
  taglines: {
    early: "Words, sentences and stories — let's play with language!",
    primary: "Grammar superpowers, spelling tricks and story writing.",
    intermediate: "Craft powerful sentences, essays and arguments.",
    teen: "Sharpen grammar, rhetoric and writing for exams and beyond.",
  },
  lessons: compose({
    early: englishEarlyLessons,
    primary: englishPrimaryLessons,
    intermediate: englishIntermediateLessons,
    teen: englishTeenLessons,
  }),
};

const scienceSubject: Subject = {
  id: "science",
  name: "Science",
  emoji: "🔬",
  gradient: "from-emerald-400 to-teal-600",
  taglines: {
    early: "Explore animals, plants, weather and wild experiments!",
    primary: "Solar systems, circuits and the secrets of matter.",
    intermediate: "Cells, atoms, energy and ecosystems — the real deal.",
    teen: "Genetics, Newton's laws and inquiry skills for exam success.",
  },
  lessons: compose({
    early: scienceEarlyLessons,
    primary: sciencePrimaryLessons,
    intermediate: scienceIntermediateLessons,
    teen: scienceTeenLessons,
  }),
};

const readingSubject: Subject = {
  id: "reading",
  name: "Reading",
  emoji: "📖",
  gradient: "from-violet-500 to-purple-600",
  taglines: {
    early: "Phonics fun and stories made just for you.",
    primary: "Main ideas, characters and cracking new words.",
    intermediate: "Inference, themes and thinking between the lines.",
    teen: "Critique arguments, decode bias and read like a scholar.",
  },
  lessons: compose({
    early: readingEarlyLessons,
    primary: readingPrimaryLessons,
    intermediate: readingIntermediateLessons,
    teen: readingTeenLessons,
  }),
};

/** The four major subjects: MATH • ENGLISH • SCIENCE • READING. */
export const subjects: Subject[] = [
  mathSubject,
  englishSubject,
  scienceSubject,
  readingSubject,
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
