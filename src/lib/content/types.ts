// ---------------------------------------------------------------------------
// BrightMinds content model
// Every subject provides age-adapted lessons for ALL four age groups.
// Content difficulty, vocabulary, examples and activities MUST change per group.
// ---------------------------------------------------------------------------

export type AgeGroup = "early" | "primary" | "intermediate" | "teen";

export type ThemePref = "pink" | "blue" | "neutral";

export interface QuizQuestion {
  /** The question text, written for the target age group. */
  question: string;
  /** 4 answer options (3 is acceptable for early learners). */
  options: string[];
  /** Index of the correct option inside `options`. */
  answerIndex: number;
  /** Friendly explanation shown after answering. */
  explanation: string;
}

export type WorksheetItem =
  /** Fill in the blank — auto-gradable. */
  | { kind: "fill-blank"; prompt: string; answer: string; hint?: string }
  /** Math / fact practice — auto-gradable. */
  | { kind: "practice"; prompt: string; answer: string; hint?: string }
  /** Open short answer — checked against a sample answer by the student. */
  | { kind: "short-answer"; prompt: string; sampleAnswer: string }
  /** Matching game: for left[i] the correct index into `right` is answer[i]. */
  | { kind: "match"; prompt: string; left: string[]; right: string[]; answer: number[] }
  /** Drawing / hands-on prompt with a doodle pad. */
  | { kind: "draw"; prompt: string };

export interface LessonSection {
  heading: string;
  /** The main explanation, tuned to the age group's reading level. */
  body: string;
  /** A concrete worked example. */
  example?: string;
  /** A short remember-tip. */
  tip?: string;
}

export interface Lesson {
  /** Pattern: `${subjectId}-${group}-${n}` e.g. "math-early-1". */
  id: string;
  title: string;
  emoji: string;
  /** Suggested minutes: early 5-8, primary 8-12, intermediate 10-15, teen 15-20. */
  minutes: number;
  /** 1-2 friendly sentences that hook the student. */
  intro: string;
  sections: LessonSection[];
  /** 3-6 key words with age-appropriate meanings. */
  vocab: { word: string; meaning: string }[];
  funFact: string;
  /** early/primary: 4 questions; intermediate/teen: 5 questions. */
  quiz: QuizQuestion[];
  /** 5-6 varied worksheet items. */
  worksheet: WorksheetItem[];
}

export interface Subject {
  id: string;
  name: string;
  emoji: string;
  /** Tailwind gradient classes, e.g. "from-amber-400 to-orange-500". */
  gradient: string;
  /** One-line pitch per age group. */
  taglines: Record<AgeGroup, string>;
  /** Exactly 3 lessons per age group. */
  lessons: Record<AgeGroup, Lesson[]>;
}
