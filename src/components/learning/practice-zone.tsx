"use client";

import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import {
  BookOpen,
  ChevronDown,
  Flame,
  Lightbulb,
  PartyPopper,
  Sparkles,
  Target,
  Zap,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { AGE_GROUPS, groupStyle } from "@/lib/learning-config";
import { subjects } from "@/lib/content";
import type { AgeGroup, Lesson } from "@/lib/content/types";
import { useStudentStore, XP } from "@/lib/student-store";
import { QuizPanel } from "./quiz-panel";
import { celebrate } from "@/lib/confetti";

interface PracticeZoneProps {
  ageGroup: AgeGroup;
  dailyChallengeDone: boolean;
  onOpenDailyChallenge: () => void;
  onOpenLesson: (subjectId: string, lessonId: string) => void;
}

/** Deterministic per-day shuffle so the mixed quiz is stable within a day. */
function daySeed(): number {
  const d = new Date();
  return d.getFullYear() * 10000 + (d.getMonth() + 1) * 100 + d.getDate();
}

function buildMixedLesson(group: AgeGroup): Lesson {
  const seed = daySeed();
  const pool: { q: Lesson["quiz"][number]; subject: string }[] = [];
  for (const s of subjects) {
    for (const l of s.lessons[group]) {
      for (const q of l.quiz) pool.push({ q, subject: s.name });
    }
  }
  // Seeded selection of 5 questions across subjects.
  const picked: { q: Lesson["quiz"][number]; subject: string }[] = [];
  let s = seed;
  while (picked.length < Math.min(5, pool.length)) {
    s = (s * 9301 + 49297) % 233280;
    const idx = Math.floor((s / 233280) * pool.length);
    const candidate = pool[idx];
    if (!picked.some((p) => p.q === candidate.q)) picked.push(candidate);
  }
  return {
    id: `mixed-challenge-${seed}`,
    title: "Mixed Challenge",
    emoji: "🧠",
    minutes: 5,
    intro: "Five questions from across your subjects — a true brain workout!",
    sections: [],
    vocab: [],
    funFact: "",
    quiz: picked.map((p) => p.q),
    worksheet: [],
  };
}

export function PracticeZone({
  ageGroup,
  dailyChallengeDone,
  onOpenDailyChallenge,
  onOpenLesson,
}: PracticeZoneProps) {
  const info = AGE_GROUPS[ageGroup];
  const style = groupStyle[ageGroup];
  const addXp = useStudentStore((s) => s.addXp);
  const touchStreak = useStudentStore((s) => s.touchStreak);

  const [mixedRun, setMixedRun] = useState(0);
  const [mixedDone, setMixedDone] = useState(false);
  const mixedLesson = useMemo(() => buildMixedLesson(ageGroup), [ageGroup, mixedRun]);

  // Lesson challenges available at this level (math + others that define them).
  const challenges = useMemo(
    () =>
      subjects
        .flatMap((s) =>
          s.lessons[ageGroup]
            .filter((l) => l.challenge)
            .map((l) => ({ subject: s, lesson: l }))
        )
        .slice(0, 6),
    [ageGroup]
  );

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold flex items-center gap-2">
          <Sparkles className="w-7 h-7 text-primary" /> Practice Zone
        </h1>
        <p className="text-muted-foreground mt-1">
          Daily challenges, mixed quizzes and brain-stretching problems — {info.range}.
        </p>
      </div>

      {/* Daily challenge */}
      <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}>
        <Card
          className={cn(
            "border-dashed border-2 border-primary/40 bg-secondary/50 cursor-pointer hover:bg-secondary transition-colors",
            style.cardRadius
          )}
          role="button"
          tabIndex={0}
          aria-label={`Question of the day. ${dailyChallengeDone ? "Completed today." : "Open challenge."}`}
          onClick={onOpenDailyChallenge}
          onKeyDown={(e) => (e.key === "Enter" || e.key === " ") && onOpenDailyChallenge()}
        >
          <CardContent className="p-5 flex items-center gap-4">
            <div className="w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center text-2xl shrink-0">
              {dailyChallengeDone ? <PartyPopper className="w-6 h-6 text-primary" /> : <Flame className="w-6 h-6 text-orange-500" />}
            </div>
            <div className="flex-1 min-w-0">
              <p className="font-bold">
                {dailyChallengeDone ? "Daily challenge complete! 🎉" : "Question of the Day 🔥"}
              </p>
              <p className="text-sm text-muted-foreground">One quick question — every day counts for your streak.</p>
            </div>
            {dailyChallengeDone ? (
              <Badge className="shrink-0">+{XP.dailyChallenge} XP earned</Badge>
            ) : (
              <Button size="sm" className="rounded-full shrink-0">
                Try it
              </Button>
            )}
          </CardContent>
        </Card>
      </motion.div>

      {/* Mixed challenge quiz */}
      <motion.section
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.05 }}
        aria-labelledby="mixed-heading"
      >
        <Card>
          <CardContent className="p-5 sm:p-6">
            {mixedDone ? (
              <div className="text-center py-4">
                <p className="text-4xl mb-2" aria-hidden>
                  🏅
                </p>
                <h2 id="mixed-heading" className="text-xl font-bold">
                  Mixed Challenge complete!
                </h2>
                <p className="text-sm text-muted-foreground mt-1">
                  You earned +5 XP. Come back tomorrow for five fresh questions!
                </p>
                <Button
                  variant="outline"
                  className="rounded-full mt-4"
                  onClick={() => {
                    setMixedDone(false);
                    setMixedRun((r) => r + 1);
                  }}
                >
                  Practice again
                </Button>
              </div>
            ) : (
              <>
                <div className="flex items-start justify-between gap-3 mb-3">
                  <div>
                    <h2 id="mixed-heading" className="text-xl font-bold">
                      🧠 Mixed Challenge Quiz
                    </h2>
                    <p className="text-sm text-muted-foreground">
                      5 questions drawn from every subject at your level. Complete it once a day
                      for bonus XP!
                    </p>
                  </div>
                  <Badge className="shrink-0 gap-1">
                    <Zap className="w-3 h-3" /> +5 XP
                  </Badge>
                </div>
                <QuizPanel
                  key={mixedRun}
                  lesson={mixedLesson}
                  ageGroup={ageGroup}
                  bestScore={null}
                  onScore={(score) => {
                    setMixedDone(true);
                    addXp(XP.dailyChallenge);
                    touchStreak();
                    if (score >= 60) celebrate("big");
                  }}
                  onBackToLearn={() => setMixedRun((r) => r + 1)}
                />
              </>
            )}
          </CardContent>
        </Card>
      </motion.section>

      {/* Subject quick practice */}
      <motion.section
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        aria-labelledby="quick-heading"
      >
        <h2 id="quick-heading" className="text-xl font-bold mb-3">
          Quick practice by subject
        </h2>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
          {subjects.map((s) => {
            const next = s.lessons[ageGroup].find((l) => true);
            return (
              <button
                key={s.id}
                type="button"
                onClick={() => next && onOpenLesson(s.id, next.id)}
                className="rounded-2xl border-2 border-border bg-card p-4 text-left hover:border-primary/50 hover:-translate-y-0.5 hover:shadow-md transition-all"
              >
                <div
                  className={cn(
                    "w-10 h-10 rounded-xl bg-gradient-to-br flex items-center justify-center text-xl mb-2",
                    s.gradient
                  )}
                  aria-hidden
                >
                  {s.emoji}
                </div>
                <p className="font-bold text-sm">{s.name}</p>
                <p className="text-xs text-muted-foreground mt-0.5 flex items-center gap-1">
                  <Target className="w-3 h-3" /> Jump into a lesson
                </p>
              </button>
            );
          })}
        </div>
      </motion.section>

      {/* Challenge questions from lessons */}
      {challenges.length > 0 && (
        <motion.section
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15 }}
          aria-labelledby="challenge-heading"
        >
          <h2 id="challenge-heading" className="text-xl font-bold mb-1">
            🌟 Challenge questions
          </h2>
          <p className="text-sm text-muted-foreground mb-3">
            Stretch problems from lessons you&apos;ve met. Try it alone first — then peek at the
            steps.
          </p>
          <div className="grid gap-3 md:grid-cols-2">
            {challenges.map(({ subject, lesson }) => (
              <ChallengeCard
                key={lesson.id}
                subjectName={subject.name}
                subjectEmoji={subject.emoji}
                lessonTitle={lesson.title}
                prompt={lesson.challenge!.prompt}
                hint={lesson.challenge!.hint}
                steps={lesson.challenge!.steps}
                answer={lesson.challenge!.answer}
                answerWhy={lesson.challenge!.answerWhy}
                onOpenLesson={() => onOpenLesson(subject.id, lesson.id)}
              />
            ))}
          </div>
        </motion.section>
      )}
    </div>
  );
}

function ChallengeCard({
  subjectName,
  subjectEmoji,
  lessonTitle,
  prompt,
  hint,
  steps,
  answer,
  answerWhy,
  onOpenLesson,
}: {
  subjectName: string;
  subjectEmoji: string;
  lessonTitle: string;
  prompt: string;
  hint: string;
  steps: string[];
  answer: string;
  answerWhy: string;
  onOpenLesson: () => void;
}) {
  const [showHint, setShowHint] = useState(false);
  const [stepsShown, setStepsShown] = useState(0);

  return (
    <Card className="border-2 border-amber-200 bg-amber-50/50">
      <CardContent className="p-4 space-y-3">
        <div>
          <p className="text-xs font-bold uppercase tracking-wide text-amber-700">
            {subjectEmoji} {subjectName} · {lessonTitle}
          </p>
          <p className="font-semibold mt-1 leading-snug">{prompt}</p>
        </div>

        <div className="flex flex-wrap gap-2">
          <Button
            variant="outline"
            size="sm"
            className="rounded-full"
            onClick={() => setShowHint((v) => !v)}
            aria-expanded={showHint}
          >
            <Lightbulb className="w-3.5 h-3.5 mr-1" /> {showHint ? "Hide hint" : "Hint"}
          </Button>
          <Button
            variant="outline"
            size="sm"
            className="rounded-full"
            onClick={() => setStepsShown((n) => (n >= steps.length ? 0 : n + 1))}
            aria-label="Reveal the next step"
          >
            <ChevronDown className="w-3.5 h-3.5 mr-1" />
            {stepsShown === 0
              ? "Show me a step"
              : stepsShown >= steps.length
                ? "Hide solution"
                : `Next step (${stepsShown}/${steps.length})`}
          </Button>
          <Button variant="ghost" size="sm" className="rounded-full" onClick={onOpenLesson}>
            <BookOpen className="w-3.5 h-3.5 mr-1" /> Lesson
          </Button>
        </div>

        {showHint && <p className="text-sm text-amber-900 bg-amber-100 rounded-xl px-3 py-2">💡 {hint}</p>}

        {stepsShown > 0 && (
          <ol className="space-y-1.5" aria-live="polite">
            {steps.slice(0, stepsShown).map((s, i) => (
              <li key={i} className="flex gap-2 text-sm">
                <span className="w-5 h-5 rounded-full bg-amber-500 text-white text-[11px] font-bold flex items-center justify-center shrink-0 mt-0.5">
                  {i + 1}
                </span>
                <span>{s}</span>
              </li>
            ))}
          </ol>
        )}

        {stepsShown >= steps.length && steps.length > 0 && (
          <div className="rounded-xl border-2 border-emerald-300 bg-emerald-50 p-3 text-sm" aria-live="polite">
            <p className="font-bold text-emerald-900">Answer: {answer}</p>
            <p className="text-emerald-800">{answerWhy}</p>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
