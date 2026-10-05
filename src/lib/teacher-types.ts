// ---------------------------------------------------------------------------
// BrightMinds — shared types + helpers for the Teacher platform.
// Client-safe (no server imports): used by both /api/teacher routes and the
// teacher UI components.
// ---------------------------------------------------------------------------

import type { AgeGroup } from "@/lib/content/types";

// ------------------------------- Auth / guards -----------------------------

export const SUBJECT_IDS = ["math", "english", "science", "reading"] as const;
export type SubjectId = (typeof SUBJECT_IDS)[number];

export const SUBJECT_LABELS: Record<string, string> = {
  math: "Mathematics",
  english: "English",
  science: "Science",
  reading: "Reading",
};

export const ASSIGNMENT_TYPES = ["lesson", "quiz", "worksheet", "reading", "custom"] as const;
export type AssignmentType = (typeof ASSIGNMENT_TYPES)[number];

export const ASSIGNMENT_TYPE_LABELS: Record<string, string> = {
  lesson: "Lesson",
  quiz: "Quiz",
  worksheet: "Worksheet",
  reading: "Reading",
  custom: "Teacher activity",
};

export const CONTENT_TYPES = [
  "lesson",
  "worksheet",
  "quiz",
  "reading",
  "vocabulary",
  "math",
  "science",
] as const;
export type ContentType = (typeof CONTENT_TYPES)[number];

export const CONTENT_TYPE_LABELS: Record<string, string> = {
  lesson: "Lesson",
  worksheet: "Worksheet",
  quiz: "Quiz",
  reading: "Reading",
  vocabulary: "Vocabulary",
  math: "Math practice",
  science: "Science",
};

export const CONTENT_STATUSES = ["draft", "private", "assigned"] as const;
export type ContentStatus = (typeof CONTENT_STATUSES)[number];

export const DIFFICULTIES = ["mild", "standard", "tricky"] as const;
export type Difficulty = (typeof DIFFICULTIES)[number];

/** Differentiated seat groups (matches the classroom groups legend). */
export const GROUPS = ["A", "B", "C"] as const;
export const GROUP_LABELS: Record<string, string> = {
  A: "Group A — Advanced",
  B: "Group B — On Level",
  C: "Group C — Additional Support",
};
export const GROUP_SHORT: Record<string, string> = {
  A: "A · Advanced",
  B: "B · On level",
  C: "C · Support",
};

export const AVATAR_COLOR_KEYS = ["rose", "amber", "emerald", "teal", "violet", "orange"] as const;

// ------------------------------ Age helpers --------------------------------

export function ageGroupForAge(age: number): AgeGroup {
  return age <= 8 ? "early" : age <= 11 ? "primary" : age <= 13 ? "intermediate" : "teen";
}

export const AGE_GROUP_LABELS: Record<AgeGroup, string> = {
  early: "Early (6-8)",
  primary: "Primary (9-11)",
  intermediate: "Intermediate (12-13)",
  teen: "Teen (14-15)",
};

// ------------------------------ Reading skills ------------------------------
// Reading lessons map to comprehension skills by id suffix per age group.
// Key = the lesson number in `reading-<group>-<n>`, value = the skill label.

export const READING_SKILLS: Record<AgeGroup, Record<number, string>> = {
  early: {
    1: "Phonics",
    2: "Phonics: Long Vowels",
    3: "Sight Words & Fluency",
    4: "Comprehension",
    5: "Prediction",
    6: "Context Clues & Vocabulary",
  },
  primary: {
    1: "Main Idea",
    2: "Supporting Details",
    3: "Characters",
    4: "Setting & Sequence",
    5: "Context Clues",
    6: "Inference",
    7: "Summarising",
  },
  intermediate: {
    1: "Inference",
    2: "Theme",
    3: "Summarising",
    4: "Comparing Texts",
    5: "Tone & Word Choice",
    6: "Fact vs Opinion",
  },
  teen: {
    1: "Purpose & Audience",
    2: "Bias",
    3: "Evaluating Arguments",
    4: "Synthesis",
    5: "Symbolism",
    6: "Annotation & Exam Skills",
  },
};

// ------------------------------ API payloads --------------------------------

export interface TeacherOverview {
  totalStudents: number;
  activeStudents: number;
  studentsNeedingSupport: number;
  avgClassProgress: number; // 0-100
  assignmentCompletionPct: number; // 0-100
  quizAverage: number | null;
  readingAvg: number | null;
  subjectAverages: { subjectId: string; avg: number | null; lessonsDone: number }[];
  recentActivityCount: number;
  recentMinutes: number;
  supportList: { studentId: string; name: string; reason: string }[];
  weeklyMinutes: { label: string; value: number }[];
  distribution: { label: string; value: number }[];
  readingTrend: { label: string; value: number }[];
  classrooms: { id: string; name: string; studentCount: number }[];
}

export interface RosterEntry {
  seatId: string;
  studentId: string;
  name: string;
  age: number;
  ageGroup: string;
  avatar: string;
  avatarColor: string;
  loginCode: string | null;
  groupName: string;
  avg: number | null;
  mathAvg: number | null;
  readingAvg: number | null;
  quizAvg: number | null;
  lessonsDone: number;
  lastActive: string | null; // YYYY-MM-DD
}

export interface TeacherClassroomSummary {
  id: string;
  name: string;
  gradeLabel: string;
  studentCount: number;
  assignmentCount: number;
  createdAt: string;
}

export interface TeacherClassroomList {
  classrooms: TeacherClassroomSummary[];
  students: (RosterEntry & { classroomId: string; classroomName: string })[];
}

export interface TeacherClassroomDetail {
  classroom: { id: string; name: string; gradeLabel: string; createdAt: string };
  studentCount: number;
  assignmentCount: number;
  students: RosterEntry[];
  groups: { group: string; count: number }[];
}

export interface SubjectStat {
  subjectId: string;
  avg: number | null;
  lessonsDone: number;
  total: number;
}

export interface QuizResultRow {
  lessonId: string;
  subjectId: string;
  lessonTitle: string;
  emoji: string;
  score: number | null;
  date: string;
}

export interface SkillRow {
  lessonId: string;
  skill: string;
  title: string;
  score: number | null;
}

export interface AssignmentHistoryRow {
  assignmentId: string;
  title: string;
  type: string;
  status: string;
  score: number | null;
  dueDate: string;
  classroomName: string;
}

export interface TeacherStudentProfile {
  student: {
    id: string;
    name: string;
    age: number;
    ageGroup: AgeGroup;
    avatar: string;
    avatarColor: string;
    loginCode: string | null;
    worksheetsDone: number;
    xp: number;
  };
  classrooms: { id: string; name: string; groupName: string }[];
  subjects: SubjectStat[];
  quizResults: QuizResultRow[];
  readingDetail: QuizResultRow[];
  skillsMastered: SkillRow[];
  needsPractice: SkillRow[];
  activity14: { label: string; value: number }[];
  assignments: AssignmentHistoryRow[];
  overallAvg: number | null;
  quizAvg: number | null;
  readingAvg: number | null;
}

export interface TeacherAssignmentRow {
  id: string;
  title: string;
  type: string;
  subjectId: string;
  lessonId: string | null;
  lessonTitle: string | null;
  classroomId: string;
  classroomName: string;
  level: string;
  difficulty: string;
  questionCount: number;
  dueDate: string;
  instructions: string;
  groupName: string | null;
  studentIds: string[];
  createdAt: string;
  targetCount: number;
  completedCount: number;
  avgScore: number | null;
}

export interface CustomActivityRow {
  id: string;
  title: string;
  type: string;
  subjectId: string;
  ageGroup: string;
  status: string;
  body: unknown;
  itemCount: number;
  createdAt: string;
  updatedAt: string;
}

export interface RecommendStep {
  step: number;
  title: string;
  lessonId?: string;
  type: string;
}

export interface ReadingSupportEntry {
  studentId: string;
  name: string;
  classroomId: string;
  classroomName: string;
  groupName: string;
  readingAvg: number | null;
  weakestSkill: { skill: string; lessonId: string; score: number | null };
  skills: { skill: string; lessonId: string; score: number | null }[];
  recommended: RecommendStep[];
}

export interface ReadingSupportResponse {
  flagged: ReadingSupportEntry[];
  all: ReadingSupportEntry[];
}

export interface ReportEntry {
  studentId: string;
  name: string;
  groupName: string;
  subjectAverages: Record<string, number | null>;
  quizAvg: number | null;
  readingAvg: number | null;
  lessonsDone: number;
  assignmentCompletion: { completed: number; total: number } | null;
  lastActive: string | null;
  interventions: string[];
}

export interface ClassReport {
  classroom: { id: string; name: string; gradeLabel: string };
  teacherName: string;
  generatedAt: string;
  roster: ReportEntry[];
  aggregates: {
    students: number;
    subjectAverages: Record<string, number | null>;
    quizAvg: number | null;
    readingAvg: number | null;
    assignmentCompletionPct: number | null;
    activeLast7: number;
  };
  interventionList: { name: string; focus: string }[];
}

// ------------------------------ Nav (teacher shell) -------------------------

export type TeacherNavKey =
  | "dashboard"
  | "students"
  | "classrooms"
  | "assignments"
  | "content"
  | "analytics"
  | "reading"
  | "helper"
  | "reports"
  | "settings";

// ------------------------------ Small helpers -------------------------------

export type ScoreBand = "strong" | "ontrack" | "watch" | "support";

export function scoreBand(score: number | null): ScoreBand {
  if (score === null) return "watch";
  if (score >= 80) return "strong";
  if (score >= 60) return "ontrack";
  if (score >= 50) return "watch";
  return "support";
}

export const SCORE_BAND_STYLES: Record<ScoreBand, string> = {
  strong: "bg-emerald-100 text-emerald-800",
  ontrack: "bg-teal-100 text-teal-800",
  watch: "bg-amber-100 text-amber-800",
  support: "bg-rose-100 text-rose-800",
};

export const SCORE_BAND_LABELS: Record<ScoreBand, string> = {
  strong: "Strong",
  ontrack: "On track",
  watch: "Watch",
  support: "Needs support",
};

export function fmtPct(n: number | null | undefined, dash = "—"): string {
  if (n === null || n === undefined || Number.isNaN(n)) return dash;
  return `${Math.round(n)}%`;
}

export function fmtDate(iso: string | null | undefined): string {
  if (!iso) return "—";
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return iso.slice(0, 10);
  return d.toLocaleDateString(undefined, { day: "numeric", month: "short", year: "numeric" });
}
