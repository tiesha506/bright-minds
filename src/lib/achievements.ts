import type { LessonProgress } from "@/lib/student-store";

export interface Achievement {
  id: string;
  title: string;
  description: string;
  emoji: string;
  check: (ctx: AchievementContext) => boolean;
}

export interface AchievementContext {
  progress: Record<string, LessonProgress>;
  xp: number;
  subjectsTouched: Set<string>;
  bestScore: number;
  quizCount: number;
  completedCount: number;
  /** Consecutive-day learning streak. */
  streak: number;
  /** Number of completed worksheet sets. */
  worksheetsDone: number;
  /** Lessons completed within one subject. */
  countForSubject: (subjectId: string) => number;
}

const LESSONS_PER_SUBJECT_BADGE = 5;

export const ACHIEVEMENTS: Achievement[] = [
  {
    id: "first-steps",
    title: "First Steps",
    description: "Finish your very first lesson",
    emoji: "🌱",
    check: (c) => c.completedCount >= 1,
  },
  {
    id: "quiz-star",
    title: "Quiz Star",
    description: "Score 80% or more on a quiz",
    emoji: "⭐",
    check: (c) => c.bestScore >= 80,
  },
  {
    id: "explorer",
    title: "Explorer",
    description: "Try a lesson in all four core subjects",
    emoji: "🧭",
    check: (c) => c.subjectsTouched.size >= 4,
  },
  {
    id: "scholar",
    title: "Scholar",
    description: "Complete 5 lessons",
    emoji: "🎓",
    check: (c) => c.completedCount >= 5,
  },
  {
    id: "perfect-score",
    title: "Perfect Score",
    description: "Get 100% on any quiz",
    emoji: "💯",
    check: (c) => c.bestScore >= 100,
  },
  {
    id: "math-master",
    title: "Math Master",
    description: `Complete ${LESSONS_PER_SUBJECT_BADGE} Mathematics lessons`,
    emoji: "🏆",
    check: (c) => c.countForSubject("math") >= LESSONS_PER_SUBJECT_BADGE,
  },
  {
    id: "english-expert",
    title: "English Expert",
    description: `Complete ${LESSONS_PER_SUBJECT_BADGE} English lessons`,
    emoji: "✍️",
    check: (c) => c.countForSubject("english") >= LESSONS_PER_SUBJECT_BADGE,
  },
  {
    id: "science-explorer",
    title: "Science Explorer",
    description: `Complete ${LESSONS_PER_SUBJECT_BADGE} Science lessons`,
    emoji: "🔬",
    check: (c) => c.countForSubject("science") >= LESSONS_PER_SUBJECT_BADGE,
  },
  {
    id: "reading-champion",
    title: "Reading Champion",
    description: `Complete ${LESSONS_PER_SUBJECT_BADGE} Reading lessons`,
    emoji: "📖",
    check: (c) => c.countForSubject("reading") >= LESSONS_PER_SUBJECT_BADGE,
  },
  {
    id: "worksheet-wizard",
    title: "Worksheet Wizard",
    description: "Finish 5 worksheets",
    emoji: "📝",
    check: (c) => c.worksheetsDone >= 5,
  },
  {
    id: "streak-3",
    title: "On Fire",
    description: "Learn 3 days in a row",
    emoji: "🔥",
    check: (c) => c.streak >= 3,
  },
  {
    id: "streak-7",
    title: "Unstoppable",
    description: "Learn 7 days in a row",
    emoji: "⚡",
    check: (c) => c.streak >= 7,
  },
  {
    id: "xp-collector",
    title: "XP Collector",
    description: "Earn 200 XP",
    emoji: "💎",
    check: (c) => c.xp >= 200,
  },
  {
    id: "brainiac",
    title: "Brainiac",
    description: "Complete 10 lessons",
    emoji: "🧠",
    check: (c) => c.completedCount >= 10,
  },
  {
    id: "legend",
    title: "Learning Legend",
    description: "Earn 500 XP",
    emoji: "🏆",
    check: (c) => c.xp >= 500,
  },
];

export function evaluateAchievements(
  progress: Record<string, LessonProgress>,
  xp: number,
  extra?: { streak?: number; worksheetsDone?: number }
): { earned: Achievement[]; ctx: AchievementContext } {
  const entries = Object.values(progress);
  const subjectsTouched = new Set(entries.map((e) => e.subjectId));
  const scores = entries
    .map((e) => e.score)
    .filter((s): s is number => typeof s === "number");
  const ctx: AchievementContext = {
    progress,
    xp,
    subjectsTouched,
    bestScore: scores.length ? Math.max(...scores) : 0,
    quizCount: scores.length,
    completedCount: entries.length,
    streak: extra?.streak ?? 0,
    worksheetsDone: extra?.worksheetsDone ?? 0,
    countForSubject: (subjectId) =>
      entries.filter((e) => e.subjectId === subjectId).length,
  };
  return { earned: ACHIEVEMENTS.filter((a) => a.check(ctx)), ctx };
}
