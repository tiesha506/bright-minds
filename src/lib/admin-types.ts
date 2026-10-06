// Shared types for the Admin platform (API responses + UI props).

export type AdminRole = "STUDENT" | "PARENT" | "TEACHER" | "ADMIN";
export type AgeGroupName = "early" | "primary" | "intermediate" | "teen";

export const ADMIN_ROLES: AdminRole[] = ["STUDENT", "PARENT", "TEACHER", "ADMIN"];
export const AGE_GROUPS: AgeGroupName[] = ["early", "primary", "intermediate", "teen"];

// ------------------------------- Overview ---------------------------------

export interface SubjectLessonStat {
  subjectId: string;
  name: string;
  emoji: string;
  byGroup: Record<AgeGroupName, number>;
  total: number;
}

export interface RecentSignup {
  id: string;
  name: string;
  email: string;
  role: AdminRole;
  createdAt: string;
}

export interface TopXpStudent {
  id: string;
  name: string;
  xp: number;
  ageGroup: string;
  avatar: string;
  photoUrl: string;
  avatarColor: string;
}

export interface OverviewData {
  usersByRole: Record<AdminRole, number>;
  usersTotal: number;
  studentsTotal: number;
  parentsTotal: number;
  teachersTotal: number;
  classroomsTotal: number;
  assignmentsTotal: number;
  /** AssignmentResult rows with status="completed". */
  completedAssignments: number;
  customActivitiesTotal: number;
  progressRows: number;
  activityMinutes7d: number;
  /** Students with any ActivityLog / Progress / ResourceView / AssignmentResult activity in the last 7 days. */
  activeStudents7d: number;
  /** Users whose lastSeenAt is within the last 5 minutes. */
  onlineUsers: number;
  /** usersTotal − onlineUsers. */
  offlineUsers: number;
  certificatesIssued: number;
  achievements: {
    /** Real XP sum across all students. */
    xpTotal: number;
    /** Highest-XP students (xp > 0), best first. */
    topStudents: TopXpStudent[];
  };
  lessonsPerSubject: SubjectLessonStat[];
  lessonsTotal: number;
  registrationOpen: boolean;
  recentSignups: RecentSignup[];
}

// -------------------------------- Users -----------------------------------

export interface AdminUserRow {
  id: string;
  name: string;
  email: string;
  role: AdminRole;
  createdAt: string;
  /** ISO timestamp of the last authenticated request, or null when never seen. */
  lastSeenAt: string | null;
  /** Parents: number of linked child profiles. */
  childrenCount: number;
  /** Teachers: number of owned classrooms. */
  classroomCount: number;
}

export interface AdminStudentRow {
  id: string;
  name: string;
  age: number;
  ageGroup: string;
  parentName: string | null;
  hasCode: boolean;
  createdAt: string;
}

export interface UsersData {
  users: AdminUserRow[];
  students: AdminStudentRow[];
}

// ------------------------------ Classrooms --------------------------------

export interface ClassroomRow {
  id: string;
  name: string;
  gradeLabel: string;
  teacherName: string;
  teacherEmail: string;
  seatCount: number;
  assignmentCount: number;
  createdAt: string;
}

// -------------------------------- Content ---------------------------------

export interface StatusCount {
  label: string;
  value: number;
}

export interface ContentData {
  subjects: SubjectLessonStat[];
  lessonsTotal: number;
  customActivities: StatusCount[];
  customActivitiesTotal: number;
  assignmentsByType: StatusCount[];
  assignmentsTotal: number;
}

// ------------------------------- Analytics --------------------------------

export type AnalyticsRange =
  | "today"
  | "7d"
  | "30d"
  | "3m"
  | "6m"
  | "12m"
  | "custom";

export type AnalyticsBucketSize = "day" | "week" | "month";

export interface AnalyticsBucket {
  /** Unique bucket key: YYYY-MM-DD (day/week start) or YYYY-MM (month). */
  key: string;
  /** Short human label for chart axes. */
  label: string;
}

/** A per-bucket value in a time series. */
export interface AnalyticsPoint {
  key: string;
  label: string;
  value: number;
}

/** Per-bucket average that can be genuinely "no data" (null), e.g. quiz scores. */
export interface AnalyticsNullablePoint {
  key: string;
  label: string;
  value: number | null;
}

/** Per-subject usage over the range (real rows only; empty array = no data). */
export interface SubjectUsageRow {
  subjectId: string;
  label: string;
  lessons: number;
  minutes: number;
}

export interface AnalyticsTotals {
  studentRegistrations: number;
  parentRegistrations: number;
  teacherRegistrations: number;
  /** Distinct students with ActivityLog/Progress activity in the range. */
  activeStudents: number;
  assignmentsCreated: number;
  /** Distinct teachers who created assignments in the range. */
  activeTeachers: number;
  /** Distinct parents with notifications or newly linked children in the range. */
  activeParents: number;
  completedResults: number;
  assignedResults: number;
  certificates: number;
  activityMinutes: number;
  /** Average score of completed quiz results in the range; null when none. */
  quizAvg: number | null;
}

export interface AnalyticsSeries {
  /** New Student (child) profiles per bucket. */
  studentRegistrations: AnalyticsPoint[];
  /** New PARENT accounts per bucket. */
  parentRegistrations: AnalyticsPoint[];
  /** New TEACHER accounts per bucket. */
  teacherRegistrations: AnalyticsPoint[];
  /** Distinct active students per bucket (ActivityLog + Progress). */
  activeStudents: AnalyticsPoint[];
  /** Assignments created per bucket. */
  teacherAssignments: AnalyticsPoint[];
  /** Assignment results completed per bucket (by completedAt). */
  completionCompleted: AnalyticsPoint[];
  /** Assignment results created per bucket (by the assignment's createdAt). */
  completionAssigned: AnalyticsPoint[];
  /** Average quiz score per bucket; null when a bucket has no completed quizzes. */
  quizAvg: AnalyticsNullablePoint[];
  /** Per-subject Progress lessons + ActivityLog minutes over the range. */
  subjectUsage: SubjectUsageRow[];
  /** Reading minutes per bucket (ActivityLog subjectId="reading"). */
  readingMinutes: AnalyticsPoint[];
  /** Certificates earned per bucket. */
  certificates: AnalyticsPoint[];
  /** Total learning minutes per bucket (all subjects). */
  activityMinutes: AnalyticsPoint[];
}

export interface CountRow {
  label: string;
  value: number;
}

export interface AnalyticsData {
  range: AnalyticsRange;
  /** Inclusive start of the window (ISO). */
  from: string;
  /** End of the window (ISO). */
  to: string;
  bucketSize: AnalyticsBucketSize;
  buckets: AnalyticsBucket[];
  series: AnalyticsSeries;
  totals: AnalyticsTotals;
  /** All-time context charts (unchanged by the range filter). */
  allTime: {
    usersByRole: CountRow[];
    studentsPerAgeGroup: CountRow[];
    assignmentsByType: CountRow[];
  };
}

// -------------------------------- Settings --------------------------------

export interface SettingsData {
  registrationOpen: boolean;
}
