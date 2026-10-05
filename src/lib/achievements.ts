import type { AgeGroup } from "@/lib/content/types";
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
}

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
    description: "Try a lesson in every subject",
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
  xp: number
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
  };
  return { earned: ACHIEVEMENTS.filter((a) => a.check(ctx)), ctx };
}
