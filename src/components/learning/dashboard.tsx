"use client";

import { motion } from "framer-motion";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { BookOpen, Brain, Flame, PartyPopper, Play, Star, Trophy, Zap } from "lucide-react";
import { cn } from "@/lib/utils";
import { AGE_GROUPS, groupStyle } from "@/lib/learning-config";
import { subjects, totalLessonsFor, getDailyChallenge } from "@/lib/content";
import type { AgeGroup } from "@/lib/content/types";
import type { LessonProgress } from "@/lib/student-store";
import { levelFromXp } from "@/lib/student-store";
import { evaluateAchievements, ACHIEVEMENTS } from "@/lib/achievements";

interface DashboardProps {
  profile: { name: string; ageGroup: AgeGroup; age: number };
  xp: number;
  progress: Record<string, LessonProgress>;
  onOpenSubject: (subjectId: string) => void;
  onOpenLesson: (subjectId: string, lessonId: string) => void;
  onOpenAchievements: () => void;
  onOpenDailyChallenge: () => void;
  dailyChallengeDone: boolean;
}

const FADE_UP = {
  initial: { opacity: 0, y: 16 },
  animate: { opacity: 1, y: 0 },
};

export function Dashboard({
  profile,
  xp,
  progress,
  onOpenSubject,
  onOpenLesson,
  onOpenAchievements,
  onOpenDailyChallenge,
  dailyChallengeDone,
}: DashboardProps) {
  const group = profile.ageGroup;
  const info = AGE_GROUPS[group];
  const style = groupStyle[group];

  const { level, intoLevel } = levelFromXp(xp);

  const entries = Object.values(progress);
  const completedCount = entries.length;
  const total = totalLessonsFor(group);
  const quizScores = entries.map((e) => e.score).filter((s): s is number => s !== null);
  const avgScore = quizScores.length
    ? Math.round(quizScores.reduce((a, b) => a + b, 0) / quizScores.length)
    : null;

  const { earned } = evaluateAchievements(progress, xp);

  // Find the next lesson to continue (first incomplete).
  const nextUp = subjects
    .flatMap((s) => s.lessons[group].map((l) => ({ subject: s, lesson: l })))
    .find((x) => !progress[x.lesson.id]);

  const daily = getDailyChallenge(group);

  return (
    <div className="space-y-6 sm:space-y-8">
      {/* ---------------- Hero greeting ---------------- */}
      <motion.section
        {...FADE_UP}
        transition={{ duration: 0.35 }}
        aria-labelledby="greeting"
        className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-primary via-primary to-primary/70 text-primary-foreground p-6 sm:p-8"
      >
        <div className="absolute -right-6 -top-6 w-36 h-36 rounded-full bg-white/10" aria-hidden />
        <div className="absolute right-10 bottom-[-30px] w-24 h-24 rounded-full bg-white/10" aria-hidden />
        <div className="relative flex flex-col sm:flex-row sm:items-center gap-5">
          {(style.showMascotEverywhere || true) && (
            <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-full bg-white/20 border-4 border-white/40 overflow-hidden shrink-0 mx-auto sm:mx-0">
              { }
              <img src="/images/mascot.png" alt="Your learning buddy" className="w-full h-full object-cover" />
            </div>
          )}
          <div className="flex-1 text-center sm:text-left">
            <p className="text-xs sm:text-sm font-semibold uppercase tracking-wider text-primary-foreground/80">
              {info.emoji} {info.label} · {info.range}
            </p>
            <h1 id="greeting" className={cn("font-bold mt-1", style.titleSize)}>
              {style.greeting(profile.name)}
            </h1>
            <p className="mt-1 text-primary-foreground/85">{info.tagline}</p>
          </div>
          <div className="text-center sm:text-right shrink-0">
            <p className="text-3xl font-bold">{xp} XP</p>
            <div className="mt-1 w-full sm:w-40">
              <Progress
                value={intoLevel}
                className="h-2 bg-white/25 [&>div]:bg-white"
                aria-label={`${intoLevel} of 100 XP to level ${level + 1}`}
              />
              <p className="text-xs mt-1 text-primary-foreground/80">
                {100 - intoLevel} XP to Level {level + 1}
              </p>
            </div>
          </div>
        </div>

        {nextUp && (
          <div className="relative mt-5 rounded-2xl bg-white/15 backdrop-blur-sm p-4 flex flex-col sm:flex-row sm:items-center gap-3">
            <div className="flex-1">
              <p className="text-xs font-semibold uppercase tracking-wide text-primary-foreground/75">
                Up next for you
              </p>
              <p className="font-bold text-lg">
                {nextUp.lesson.emoji} {nextUp.lesson.title}
              </p>
              <p className="text-sm text-primary-foreground/80">
                {nextUp.subject.name} · {nextUp.lesson.minutes} min
              </p>
            </div>
            <Button
              onClick={() => onOpenLesson(nextUp.subject.id, nextUp.lesson.id)}
              className="rounded-full font-bold bg-white text-primary hover:bg-white/90 w-full sm:w-auto"
            >
              <Play className="w-4 h-4 mr-1.5" /> {style.cta}
            </Button>
          </div>
        )}
      </motion.section>

      {/* ---------------- Stats ---------------- */}
      <motion.section
        {...FADE_UP}
        transition={{ duration: 0.35, delay: 0.05 }}
        aria-label="Your stats"
        className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4"
      >
        <StatCard
          icon={<ZapIcon />}
          label="Total XP"
          value={String(xp)}
          hint={`Level ${level}`}
        />
        <StatCard
          icon={<BookOpen className="w-5 h-5 text-emerald-500" />}
          label="Lessons done"
          value={`${completedCount}/${total}`}
          hint={completedCount === 0 ? "Start your first!" : "Keep going!"}
        />
        <StatCard
          icon={<Brain className="w-5 h-5 text-violet-500" />}
          label="Quiz average"
          value={avgScore !== null ? `${avgScore}%` : "—"}
          hint={avgScore !== null ? (avgScore >= 80 ? "Amazing! 🎉" : "Practice makes perfect") : "Take a quiz"}
        />
        <StatCard
          icon={<Trophy className="w-5 h-5 text-amber-500" />}
          label="Badges"
          value={`${earned.length}/${ACHIEVEMENTS.length}`}
          hint={earned.length ? earned[earned.length - 1].title : "Earn your first"}
        />
      </motion.section>

      {/* ---------------- Daily challenge ---------------- */}
      <motion.section {...FADE_UP} transition={{ duration: 0.35, delay: 0.1 }}>
        <Card
          className={cn(
            "border-dashed border-2 border-primary/40 bg-secondary/50 cursor-pointer hover:bg-secondary transition-colors",
            style.cardRadius
          )}
          role="button"
          tabIndex={0}
          aria-label={`Question of the day from ${daily.subject.name}: ${daily.lesson.title}. ${dailyChallengeDone ? "Completed today." : "Open challenge."}`}
          onClick={onOpenDailyChallenge}
          onKeyDown={(e) => (e.key === "Enter" || e.key === " ") && onOpenDailyChallenge()}
        >
          <CardContent className="p-5 flex items-center gap-4">
            <div className="w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center text-2xl shrink-0">
              {dailyChallengeDone ? <PartyPopper className="w-6 h-6 text-primary" /> : "🔥"}
            </div>
            <div className="flex-1 min-w-0">
              <p className="font-bold">
                {dailyChallengeDone ? "Daily challenge complete! 🎉" : "Question of the Day 🔥"}
              </p>
              <p className="text-sm text-muted-foreground truncate">
                {daily.subject.emoji} {daily.subject.name} · {daily.lesson.title}
              </p>
            </div>
            {dailyChallengeDone ? (
              <Badge className="shrink-0">+5 XP earned</Badge>
            ) : (
              <Button size="sm" className="rounded-full shrink-0">
                Try it
              </Button>
            )}
          </CardContent>
        </Card>
      </motion.section>

      {/* ---------------- Subjects ---------------- */}
      <motion.section {...FADE_UP} transition={{ duration: 0.35, delay: 0.15 }} aria-labelledby="subjects-heading">
        <h2 id="subjects-heading" className="text-2xl font-bold mb-4">
          {group === "early"
            ? "What do you want to explore today? 🌟"
            : group === "primary"
              ? "Choose your mission 🚀"
              : group === "intermediate"
                ? "Pick a subject"
                : "Your subjects"}
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
          {subjects.map((subject, i) => {
            const lessons = subject.lessons[group];
            const done = lessons.filter((l) => progress[l.id]).length;
            const pct = Math.round((done / lessons.length) * 100);
            return (
              <motion.div
                key={subject.id}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: 0.15 + i * 0.06 }}
              >
                <Card
                  className={cn(
                    "group h-full hover:shadow-xl hover:-translate-y-1 transition-all cursor-pointer border-border/70",
                    style.cardRadius
                  )}
                  role="button"
                  tabIndex={0}
                  aria-label={`${subject.name}: ${done} of ${lessons.length} lessons complete`}
                  onClick={() => onOpenSubject(subject.id)}
                  onKeyDown={(e) => (e.key === "Enter" || e.key === " ") && onOpenSubject(subject.id)}
                >
                  <CardHeader className="pb-2">
                    <div
                      className={cn(
                        "w-14 h-14 rounded-2xl bg-gradient-to-br flex items-center justify-center text-3xl shadow-md group-hover:scale-110 transition-transform",
                        subject.gradient
                      )}
                      aria-hidden
                    >
                      {subject.emoji}
                    </div>
                    <CardTitle className="text-xl mt-3">{subject.name}</CardTitle>
                    <p className="text-sm text-muted-foreground min-h-[40px]">{subject.taglines[group]}</p>
                  </CardHeader>
                  <CardContent className="pt-0">
                    <div className="flex items-center justify-between text-sm mb-1.5">
                      <span className="text-muted-foreground">
                        {done}/{lessons.length} lessons
                      </span>
                      {pct === 100 && <Badge className="bg-emerald-500 hover:bg-emerald-500">Done! 🎉</Badge>}
                    </div>
                    <Progress value={pct} aria-label={`${pct}% complete`} />
                  </CardContent>
                </Card>
              </motion.div>
            );
          })}
        </div>
      </motion.section>

      {/* ---------------- Achievements strip ---------------- */}
      <motion.section {...FADE_UP} transition={{ duration: 0.35, delay: 0.2 }} aria-labelledby="badges-heading">
        <div className="flex items-center justify-between mb-4">
          <h2 id="badges-heading" className="text-2xl font-bold">
            {group === "early" ? "Your sticker collection ⭐" : "Achievements"}
          </h2>
          <Button variant="ghost" size="sm" onClick={onOpenAchievements}>
            See all
          </Button>
        </div>
        <div className="flex gap-3 overflow-x-auto pb-2 nice-scroll max-h-32 items-stretch">
          {ACHIEVEMENTS.map((a) => {
            const has = earned.some((e) => e.id === a.id);
            return (
              <div
                key={a.id}
                className={cn(
                  "shrink-0 w-28 rounded-2xl border-2 p-3 text-center transition-all",
                  has
                    ? "border-amber-300 bg-amber-50 dark:bg-amber-950/20 shadow-sm"
                    : "border-dashed border-border opacity-60"
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

      {/* Fun closing note for young learners */}
      {group === "early" && (
        <motion.p
          {...FADE_UP}
          className="text-center text-muted-foreground text-lg"
          transition={{ duration: 0.35, delay: 0.25 }}
        >
          <Star className="inline w-5 h-5 text-amber-400 -mt-1" /> You are doing GREAT today,{" "}
          {profile.name}! <Flame className="inline w-5 h-5 text-orange-500 -mt-1" />
        </motion.p>
      )}
    </div>
  );
}

function StatCard({
  icon,
  label,
  value,
  hint,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
  hint?: string;
}) {
  return (
    <Card className="p-4">
      <div className="flex items-center gap-2 text-sm text-muted-foreground">
        {icon}
        <span>{label}</span>
      </div>
      <p className="text-2xl font-bold mt-1">{value}</p>
      {hint && <p className="text-xs text-muted-foreground mt-0.5 truncate">{hint}</p>}
    </Card>
  );
}

function ZapIcon() {
  return <Zap className="w-5 h-5 text-primary" />;
}
