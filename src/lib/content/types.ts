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

// ---------------------------------------------------------------------------
// Strategy Lab — "never just the answer, show DIFFERENT ways to solve it"
// Used heavily by Mathematics lessons: the same problem is solved with
// multiple genuinely different methods so students can pick what clicks.
// ---------------------------------------------------------------------------

export interface SolveMethod {
  /** Method name, e.g. "Repeated Subtraction" or "Make Ten". */
  name: string;
  emoji: string;
  /** One friendly line: when this method shines (tuned to the age group). */
  whenToUse: string;
  /** 2-4 numbered steps that solve the example using THIS method. */
  steps: string[];
}

export interface MethodExample {
  /** The problem, e.g. "24 ÷ 6 = ?". */
  problem: string;
  /** The final answer, e.g. "4". */
  answer: string;
  /** Why the answer makes sense — e.g. check with the inverse operation. */
  answerCheck: string;
  /** 2-4 genuinely DIFFERENT methods for the same problem. */
  methods: SolveMethod[];
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
  /**
   * Optional "Strategy Lab": worked problems, each solved with MULTIPLE
   * different methods. Math lessons SHOULD include 1-2 of these — never
   * simply hand over the answer, always show the different ways of thinking.
   */
  strategyLab?: MethodExample[];
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
