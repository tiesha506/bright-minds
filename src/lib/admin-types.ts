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

export interface OverviewData {
  usersByRole: Record<AdminRole, number>;
  usersTotal: number;
  studentsTotal: number;
  classroomsTotal: number;
  assignmentsTotal: number;
  customActivitiesTotal: number;
  progressRows: number;
  activityMinutes7d: number;
  activeStudents7d: number;
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

export interface CountRow {
  label: string;
  value: number;
}

export interface AnalyticsData {
  usersByRole: CountRow[];
  studentsPerAgeGroup: CountRow[];
  progressPerSubject: CountRow[];
  assignmentsByType: CountRow[];
  dailyActive: { label: string; value: number }[];
}

// -------------------------------- Settings --------------------------------

export interface SettingsData {
  registrationOpen: boolean;
}
