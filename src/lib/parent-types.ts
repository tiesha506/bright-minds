// ---------------------------------------------------------------------------
// Shared types for the Parent platform (server API responses ↔ client UI).
// Parents only ever receive data for their OWN children.
// ---------------------------------------------------------------------------

/** A child as shown in "My Children" lists / cards. */
export interface ChildSummary {
  id: string;
  name: string;
  age: number;
  ageGroup: string; // early | primary | intermediate | teen
  avatar: string;
  avatarColor: string;
  theme: string; // pink | blue | neutral
  xp: number;
  /** Parents need these to set the child's device up. */
  loginCode: string | null;
  pin: string | null;
  lessonsDone: number;
  worksheetsDone: number;
  streak: number;
  /** Minutes learned in the last 7 days (incl. today). */
  weeklyMinutes: number;
  /** Minutes learned today. */
  todayMinutes: number;
  /** Blended progress 0-100 (null when nothing recorded yet). */
  overallPct: number | null;
  /** Average quiz score per subject id (null = no scores yet). */
  subjectAverages: Record<string, number | null>;
}

export interface GoalData {
  dailyMinutes: number;
  weeklyLessonTarget: number;
  prioritySubjects: string[];
  note: string;
}

export interface SubjectProgress {
  subjectId: string;
  label: string;
  emoji: string;
  /** Average quiz score for this subject (null = no scores yet). */
  avgScore: number | null;
  lessonsDone: number;
  lessonsTotal: number;
}

export interface QuizResultItem {
  lessonId: string;
  lessonTitle: string;
  subjectId: string;
  emoji: string;
  score: number;
  /** ISO date string. */
  date: string;
}

export interface AssignmentStatusItem {
  title: string;
  type: string;
  status: string; // assigned | completed
  score: number | null;
  dueDate: string;
  classroomName: string;
}

export interface Recommendation {
  icon: string;
  title: string;
  detail: string;
  subjectId?: string;
  lessonId?: string;
}

export interface DayMinutes {
  /** Short label, e.g. "Mon" or "Mar 3". */
  day: string;
  /** YYYY-MM-DD */
  date: string;
  minutes: number;
}

export interface StrengthItem {
  subjectId: string;
  label: string;
  emoji: string;
  avgScore: number;
}

export interface PracticeItem {
  subjectId: string;
  label: string;
  emoji: string;
  avgScore: number | null;
  lessonTitles: string[];
}

export interface OverviewResponse {
  profile: {
    id: string;
    name: string;
    age: number;
    ageGroup: string;
    avatar: string;
    avatarColor: string;
    xp: number;
  };
  goal: GoalData;
  subjectProgress: SubjectProgress[];
  overallPct: number;
  weeklyMinutes: DayMinutes[];
  monthlyMinutes: number;
  /** This week's minutes minus last week's (positive = more than last week). */
  weeklyDelta: number;
  todayMinutes: number;
  lessonsCompleted: number;
  lessonsThisWeek: number;
  worksheetsCompleted: number;
  quizAverage: number | null;
  recentQuizResults: QuizResultItem[];
  /** Reading quiz scores over time (oldest → newest) for the sparkline. */
  readingScores: number[];
  readingAvg: number | null;
  streakDays: number;
  strengths: StrengthItem[];
  needsPractice: PracticeItem[];
  recommendations: Recommendation[];
  assignments: AssignmentStatusItem[];
}

export interface NotificationItem {
  id: string;
  childId: string | null;
  childName: string;
  kind: string; // completion | score | suggestion | assignment
  text: string;
  read: boolean;
  createdAt: string;
}

export interface NotificationsResponse {
  notifications: NotificationItem[];
  unreadCount: number;
}

export interface ReportResponse {
  profile: {
    id: string;
    name: string;
    age: number;
    ageGroup: string;
    avatar: string;
    avatarColor: string;
  };
  range: "week" | "month";
  /** Inclusive range the report covers (YYYY-MM-DD). */
  rangeStart: string;
  rangeEnd: string;
  generatedAt: string;
  summary: string[];
  subjectProgress: SubjectProgress[];
  minutesPerDay: DayMinutes[];
  totalMinutes: number;
  lessonsCompleted: number;
  lessonsThisPeriod: number;
  worksheetsCompleted: number;
  quizAverage: number | null;
  quizResults: QuizResultItem[];
  skillsMastered: QuizResultItem[];
  skillsNeedingPractice: QuizResultItem[];
  readingScores: number[];
  readingAvg: number | null;
  streakDays: number;
  goal: GoalData;
}

/** Body for PATCH /api/parent/children/[childId]. */
export interface UpdateChildInput {
  name?: string;
  age?: number;
  avatar?: string;
  avatarColor?: string;
  theme?: string;
  goal?: {
    dailyMinutes?: number;
    weeklyLessonTarget?: number;
    prioritySubjects?: string[];
    note?: string;
  };
}
