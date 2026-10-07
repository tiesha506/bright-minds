"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { ArrowLeft, Lock } from "lucide-react";
import { cn } from "@/lib/utils";
import { ACHIEVEMENTS, evaluateAchievements } from "@/lib/achievements";
import type { LessonProgress } from "@/lib/student-store";

interface AchievementsViewProps {
  xp: number;
  progress: Record<string, LessonProgress>;
  onBack: () => void;
}

export function AchievementsView({ xp, progress, onBack }: AchievementsViewProps) {
  const { earned, ctx } = evaluateAchievements(progress, xp);

  return (
    <div className="space-y-5">
      <div>
        <Button variant="ghost" onClick={onBack} className="mb-3 -ml-2">
          <ArrowLeft className="w-4 h-4 mr-1" /> Back to dashboard
        </Button>
        <h1 className="text-3xl font-bold">My Achievements 🏆</h1>
        <p className="text-muted-foreground">
          You&apos;ve earned <strong>{earned.length}</strong> of {ACHIEVEMENTS.length} badges —
          amazing work!
        </p>
        <Progress
          value={(earned.length / ACHIEVEMENTS.length) * 100}
          className="mt-3 max-w-sm"
          aria-label={`${earned.length} of ${ACHIEVEMENTS.length} achievements earned`}
        />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {ACHIEVEMENTS.map((a, i) => {
          const has = earned.some((e) => e.id === a.id);
          return (
            <motion.div
              key={a.id}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05, duration: 0.3 }}
            >
              <Card
                className={cn(
                  "h-full transition-all",
                  has
                    ? "border-amber-300 bg-gradient-to-br from-amber-50 to-orange-50 shadow-md"
                    : "opacity-75"
                )}
              >
                <CardContent className="p-5 flex items-start gap-4">
                  <div
                    className={cn(
                      "w-14 h-14 rounded-2xl flex items-center justify-center text-3xl shrink-0",
                      has ? "bg-white shadow" : "bg-muted grayscale"
                    )}
                    aria-hidden
                  >
                    {has ? a.emoji : <Lock className="w-6 h-6 text-muted-foreground" />}
                  </div>
                  <div className="min-w-0">
                    <p className="font-bold flex items-center gap-2">
                      {a.title}
                      {has && <span aria-hidden>✨</span>}
                    </p>
                    <p className="text-sm text-muted-foreground">{a.description}</p>
                    <p className={cn("text-xs mt-1 font-semibold", has ? "text-amber-600" : "text-muted-foreground")}>
                      {has ? "Earned!" : "Keep learning to unlock"}
                    </p>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          );
        })}
      </div>

      <Card>
        <CardContent className="p-5">
          <h2 className="font-bold mb-2">Your journey so far 📊</h2>
          <ul className="text-sm text-muted-foreground space-y-1">
            <li>• Lessons started: {ctx.completedCount}</li>
            <li>• Quizzes taken: {ctx.quizCount}</li>
            <li>• Best quiz score: {ctx.bestScore}%</li>
            <li>• Subjects explored: {ctx.subjectsTouched.size} of 4</li>
          </ul>
        </CardContent>
      </Card>
    </div>
  );
}
