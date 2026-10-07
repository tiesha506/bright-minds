"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { ArrowRight, BookOpen, CheckCircle2, Flame, NotebookPen, TrendingUp, Zap } from "lucide-react";
import { cn } from "@/lib/utils";
import { AGE_GROUPS } from "@/lib/learning-config";
import { subjects, totalLessonsFor } from "@/lib/content";
import type { AgeGroup } from "@/lib/content/types";
import type { LessonProgress } from "@/lib/student-store";
import { levelFromXp } from "@/lib/student-store";
import { evaluateAchievements, ACHIEVEMENTS } from "@/lib/achievements";

interface ProgressViewProps {
  ageGroup: AgeGroup;
  xp: number;
  progress: Record<string, LessonProgress>;
  streak: number;
  activeDates: string[];
  worksheetsDone: number;
  onOpenSubject: (subjectId: string) => void;
  onOpenAchievements: () => void;
}

export function ProgressView({
  ageGroup,
  xp,
  progress,
  streak,
  activeDates,
  worksheetsDone,
  onOpenSubject,
  onOpenAchievements,
}: ProgressViewProps) {
  const info = AGE_GROUPS[ageGroup];
  const { level, intoLevel } = levelFromXp(xp);
  const entries = Object.values(progress);
  const total = totalLessonsFor(ageGroup);
  const scores = entries.map((e) => e.score).filter((s): s is number => s !== null);
  const avg = scores.length ? Math.round(scores.reduce((a, b) => a + b, 0) / scores.length) : null;

  const { earned } = evaluateAchievements(progress, xp, { streak, worksheetsDone });

  // Last 7 local days of activity.
  const last7 = Array.from({ length: 7 }, (_, i) => {
    const d = new Date(Date.now() - (6 - i) * 86400000);
    const key = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(
      d.getDate()
    ).padStart(2, "0")}`;
    return { key, label: d.toLocaleDateString("en", { weekday: "narrow" }), active: activeDates.includes(key) };
  });

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold flex items-center gap-2">
          <TrendingUp className="w-7 h-7 text-primary" /> My Progress
        </h1>
        <p className="text-muted-foreground mt-1">
          {info.emoji} {info.label} · {info.range} — your learning, at a glance.
        </p>
      </div>

      {/* Overview stats */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        className="grid grid-cols-2 lg:grid-cols-4 gap-3"
      >
        <Card className="p-4">
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Zap className="w-4 h-4 text-primary" /> Total XP
          </div>
          <p className="text-2xl font-bold mt-1">{xp}</p>
          <Progress value={intoLevel} className="h-1.5 mt-2" aria-label={`${intoLevel}% to next level`} />
          <p className="text-xs text-muted-foreground mt-1">Level {level} · {100 - intoLevel} XP to go</p>
        </Card>
        <Card className="p-4">
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <BookOpen className="w-4 h-4 text-emerald-500" /> Lessons
          </div>
          <p className="text-2xl font-bold mt-1">
            {entries.length}/{total}
          </p>
          <p className="text-xs text-muted-foreground mt-1">
            {entries.length === 0 ? "Start your first!" : "Great pace — keep it up!"}
          </p>
        </Card>
        <Card className="p-4">
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <CheckCircle2 className="w-4 h-4 text-violet-500" /> Quiz average
          </div>
          <p className="text-2xl font-bold mt-1">{avg !== null ? `${avg}%` : "—"}</p>
          <p className="text-xs text-muted-foreground mt-1">{scores.length} quizzes taken</p>
        </Card>
        <Card className="p-4">
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <NotebookPen className="w-4 h-4 text-amber-500" /> Worksheets
          </div>
          <p className="text-2xl font-bold mt-1">{worksheetsDone}</p>
          <p className="text-xs text-muted-foreground mt-1">Practice sets completed</p>
        </Card>
      </motion.div>

      {/* Streak calendar */}
      <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.05 }}>
        <Card>
          <CardContent className="p-5">
            <div className="flex items-center justify-between flex-wrap gap-2">
              <h2 className="text-lg font-bold flex items-center gap-2">
                <Flame className="w-5 h-5 text-orange-500" /> Learning streak
              </h2>
              <Badge variant="secondary" className="bg-orange-100 text-orange-800 border-orange-200">
                🔥 {streak} day{streak === 1 ? "" : "s"} in a row
              </Badge>
            </div>
            <div className="flex gap-2 mt-4" aria-label="Last 7 days of activity">
              {last7.map((d) => (
                <div key={d.key} className="flex flex-col items-center gap-1">
                  <div
                    className={cn(
                      "w-9 h-9 rounded-xl flex items-center justify-center text-sm font-bold transition-colors",
                      d.active ? "bg-primary text-primary-foreground" : "bg-secondary text-muted-foreground"
                    )}
                    aria-label={`${d.label}: ${d.active ? "active" : "no activity"}`}
                  >
                    {d.active ? "✓" : ""}
                  </div>
                  <span className="text-[10px] text-muted-foreground uppercase">{d.label}</span>
                </div>
              ))}
            </div>
            <p className="text-xs text-muted-foreground mt-3">
              Learn something any day to keep the flame alive — lessons, quizzes, worksheets and
              daily challenges all count!
            </p>
          </CardContent>
        </Card>
      </motion.div>

      {/* Per-subject progress */}
      <motion.section
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        aria-labelledby="subject-progress-heading"
        className="space-y-3"
      >
        <h2 id="subject-progress-heading" className="text-xl font-bold">
          Subject progress
        </h2>
        {subjects.map((s) => {
          const lessons = s.lessons[ageGroup];
          const done = lessons.filter((l) => progress[l.id]).length;
          const pct = Math.round((done / lessons.length) * 100);
          const subjectEntries = lessons
            .map((l) => progress[l.id])
            .filter((p): p is LessonProgress => !!p && p.score !== null);
          const subjectAvg = subjectEntries.length
            ? Math.round(subjectEntries.reduce((a, b) => a + (b.score ?? 0), 0) / subjectEntries.length)
            : null;
          return (
            <Card key={s.id}>
              <CardContent className="p-4 flex items-center gap-4">
                <div
                  className={cn(
                    "w-11 h-11 rounded-xl bg-gradient-to-br flex items-center justify-center text-xl shrink-0",
                    s.gradient
                  )}
                  aria-hidden
                >
                  {s.emoji}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between gap-2">
                    <p className="font-bold truncate">{s.name}</p>
                    <span className="text-sm text-muted-foreground shrink-0">
                      {done}/{lessons.length} · {pct}%
                    </span>
                  </div>
                  <Progress value={pct} className="h-2 mt-2" aria-label={`${s.name} ${pct}% complete`} />
                  <p className="text-xs text-muted-foreground mt-1">
                    Quiz average: {subjectAvg !== null ? `${subjectAvg}%` : "no quizzes yet"}
                  </p>
                </div>
                <Button variant="ghost" size="icon" className="rounded-full shrink-0" aria-label={`Open ${s.name}`} onClick={() => onOpenSubject(s.id)}>
                  <ArrowRight className="w-4 h-4" />
                </Button>
              </CardContent>
            </Card>
          );
        })}
      </motion.section>

      {/* Badges */}
      <motion.section
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.15 }}
        aria-labelledby="progress-badges-heading"
      >
        <div className="flex items-center justify-between mb-3">
          <h2 id="progress-badges-heading" className="text-xl font-bold">
            Badges
          </h2>
          <Button variant="ghost" size="sm" onClick={onOpenAchievements}>
            See all
          </Button>
        </div>
        <div className="flex gap-3 overflow-x-auto pb-2 nice-scroll">
          {ACHIEVEMENTS.map((a) => {
            const has = earned.some((e) => e.id === a.id);
            return (
              <div
                key={a.id}
                className={cn(
                  "shrink-0 w-28 rounded-2xl border-2 p-3 text-center transition-all",
                  has ? "border-amber-300 bg-amber-50 shadow-sm" : "border-dashed border-border opacity-60"
                )}
                title={`${a.title}: ${a.description}`}
              >
                <div className={cn("text-3xl", !has && "grayscale")}>{a.emoji}</div>
                <p className="text-xs font-bold mt-1 leading-tight">{a.title}</p>
                <p className="text-[10px] text-muted-foreground leading-tight mt-0.5">
                  {has ? "Earned!" : a.description}
                </p>
              </div>
            );
          })}
        </div>
      </motion.section>
    </div>
  );
}
