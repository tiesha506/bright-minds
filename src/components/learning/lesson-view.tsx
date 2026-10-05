"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  ArrowLeft,
  ArrowRight,
  BookOpen,
  CheckCircle2,
  ChevronDown,
  Clock,
  Lightbulb,
  PartyPopper,
  PencilLine,
  Sparkles,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { groupStyle } from "@/lib/learning-config";
import { getLesson, getSubject } from "@/lib/content";
import type { AgeGroup, LessonSection, MethodExample, SolveMethod } from "@/lib/content/types";
import type { LessonProgress } from "@/lib/student-store";
import { QuizPanel } from "./quiz-panel";
import { WorksheetPanel } from "./worksheet-panel";

interface LessonViewProps {
  subjectId: string;
  lessonId: string;
  ageGroup: AgeGroup;
  progress: LessonProgress | undefined;
  onBack: () => void;
  onMarkRead: () => void;
  onQuizScore: (score: number) => void;
}

export function LessonView({
  subjectId,
  lessonId,
  ageGroup,
  progress,
  onBack,
  onMarkRead,
  onQuizScore,
}: LessonViewProps) {
  const subject = getSubject(subjectId);
  const lesson = getLesson(subjectId, lessonId);
  const [tab, setTab] = useState("learn");

  if (!subject || !lesson) return null;

  const style = groupStyle[ageGroup];
  const isRead = !!progress;
  const bestScore = progress?.score ?? null;

  return (
    <div className="space-y-5">
      {/* Header */}
      <div>
        <Button variant="ghost" onClick={onBack} className="mb-3 -ml-2 no-print">
          <ArrowLeft className="w-4 h-4 mr-1" /> Back to {subject.name}
        </Button>
        <div className="flex flex-wrap items-start justify-between gap-3">
          <div className="flex items-start gap-3 sm:gap-4 min-w-0">
            <div
              className={cn(
                "w-14 h-14 sm:w-16 sm:h-16 rounded-2xl bg-gradient-to-br flex items-center justify-center text-3xl sm:text-4xl shadow-md shrink-0",
                subject.gradient
              )}
              aria-hidden
            >
              {lesson.emoji}
            </div>
            <div className="min-w-0">
              <h1 className="text-2xl sm:text-3xl font-bold leading-tight">{lesson.title}</h1>
              <p className="text-sm text-muted-foreground flex flex-wrap items-center gap-x-3 gap-y-1 mt-1">
                <span className="inline-flex items-center gap-1">
                  <Clock className="w-3.5 h-3.5" /> ~{lesson.minutes} min
                </span>
                <span>{subject.name}</span>
                {isRead && (
                  <Badge className="bg-emerald-500 hover:bg-emerald-500 gap-1">
                    <CheckCircle2 className="w-3 h-3" /> Started
                  </Badge>
                )}
              </p>
            </div>
          </div>
        </div>
        <p className="mt-3 text-base text-foreground/85">{lesson.intro}</p>
      </div>

      <Tabs value={tab} onValueChange={setTab} className="w-full">
        <TabsList className="w-full sm:w-auto grid grid-cols-3 sm:inline-flex h-auto p-1 rounded-2xl no-print">
          <TabsTrigger value="learn" className="rounded-xl py-2 gap-1.5">
            <BookOpen className="w-4 h-4" /> Learn
          </TabsTrigger>
          <TabsTrigger value="quiz" className="rounded-xl py-2 gap-1.5">
            <Sparkles className="w-4 h-4" /> Quiz
          </TabsTrigger>
          <TabsTrigger value="worksheet" className="rounded-xl py-2 gap-1.5">
            <PencilLine className="w-4 h-4" /> Worksheet
          </TabsTrigger>
        </TabsList>

        {/* ---------------- Learn tab ---------------- */}
        <TabsContent value="learn" className="mt-4 space-y-5">
          <div className="space-y-4">
            {lesson.sections.map((section, i) => (
              <SectionCard
                key={i}
                section={section}
                number={i + 1}
                word={style.sectionWord}
                radius={style.cardRadius}
              />
            ))}
          </div>

          {/* Strategy Lab: the SAME problem solved with DIFFERENT methods */}
          {lesson.strategyLab && lesson.strategyLab.length > 0 && (
            <StrategyLab lab={lesson.strategyLab} isMath={subjectId === "math"} />
          )}

          {/* Challenge Zone: a stretch problem with hint → steps → answer */}
          {lesson.challenge && <ChallengeZone challenge={lesson.challenge} />}

          {/* Fun fact */}
          <Card className={cn("border-amber-200 bg-amber-50/70", style.cardRadius)}>
            <CardContent className="p-4 flex items-start gap-3">
              <span className="text-2xl" aria-hidden>
                💡
              </span>
              <div>
                <p className="font-bold text-amber-900">Wow, really?</p>
                <p className="text-sm text-amber-800">{lesson.funFact}</p>
              </div>
            </CardContent>
          </Card>

          {/* Vocab */}
          <section aria-labelledby="vocab-heading">
            <h2 id="vocab-heading" className="text-xl font-bold mb-3">
              Key words {ageGroup === "early" ? "(tap to flip! 🔄)" : ""}
            </h2>
            <div className="grid gap-3 sm:grid-cols-2">
              {lesson.vocab.map((v) =>
                ageGroup === "early" || ageGroup === "primary" ? (
                  <VocabFlipCard key={v.word} word={v.word} meaning={v.meaning} />
                ) : (
                  <Card key={v.word} className={cn("py-0", style.cardRadius)}>
                    <CardContent className="p-4">
                      <p className="font-bold text-primary">{v.word}</p>
                      <p className="text-sm text-muted-foreground mt-0.5">{v.meaning}</p>
                    </CardContent>
                  </Card>
                )
              )}
            </div>
          </section>

          <div className="flex flex-col sm:flex-row gap-3 no-print">
            {!isRead && (
              <Button
                size="lg"
                onClick={() => {
                  onMarkRead();
                }}
                className="rounded-full font-bold flex-1"
              >
                <PartyPopper className="w-5 h-5 mr-2" /> I read it! (+10 XP)
              </Button>
            )}
            <Button
              size="lg"
              variant={isRead ? "default" : "outline"}
              onClick={() => setTab("quiz")}
              className="rounded-full font-bold flex-1"
            >
              {style.quizNudge} <ArrowRight className="w-4 h-4 ml-1.5" />
            </Button>
          </div>
        </TabsContent>

        {/* ---------------- Quiz tab ---------------- */}
        <TabsContent value="quiz" className="mt-4">
          <QuizPanel
            lesson={lesson}
            ageGroup={ageGroup}
            bestScore={bestScore}
            onScore={onQuizScore}
            onBackToLearn={() => setTab("learn")}
          />
        </TabsContent>

        {/* ---------------- Worksheet tab ---------------- */}
        <TabsContent value="worksheet" className="mt-4">
          <WorksheetPanel items={lesson.worksheet} lessonTitle={lesson.title} />
        </TabsContent>
      </Tabs>
    </div>
  );
}

// ---------------- Strategy Lab: different ways to solve it ----------------
function StrategyLab({ lab, isMath }: { lab: MethodExample[]; isMath: boolean }) {
  const [revealed, setRevealed] = useState<Record<number, boolean>>({});
  return (
    <section aria-labelledby="lab-heading" className="space-y-4">
      <div className="flex items-start gap-2.5">
        <span className="text-3xl leading-none mt-0.5" aria-hidden>
          🧠
        </span>
        <div>
          <h2 id="lab-heading" className="text-xl sm:text-2xl font-bold">
            Strategy Lab
          </h2>
          <p className="text-sm text-muted-foreground">
            {isMath
              ? "Smart mathematicians know MANY ways to solve the same problem. Tap each method, try the steps, then pick the one that clicks for you!"
              : "There is more than one way to think about a problem. Tap each strategy and see which one clicks for you!"}
          </p>
        </div>
      </div>

      {lab.map((ex, i) => (
        <Card key={i} className={cn(styleSafeRadius, "overflow-hidden border-2 border-primary/15 bg-gradient-to-br from-primary/5 to-secondary/40")}>
          <CardContent className="p-4 sm:p-5 space-y-4">
            {/* Problem banner */}
            <div
              className="rounded-xl bg-background/90 border-2 border-dashed border-primary/30 py-3.5 px-4 text-center"
              aria-label={`Problem: ${ex.problem}`}
            >
              <p className="text-xs font-bold uppercase tracking-wider text-primary/70 mb-0.5">
                Problem {i + 1}
              </p>
              <p className="text-2xl sm:text-3xl font-bold" style={{ fontFamily: "var(--font-fredoka)" }}>
                {ex.problem}
              </p>
            </div>

            {/* Method cards */}
            <div className={cn("grid gap-3", ex.methods.length >= 3 ? "md:grid-cols-2 xl:grid-cols-3" : "md:grid-cols-2")}>
              {ex.methods.map((m, j) => (
                <MethodCard key={j} method={m} defaultOpen={j === 0} />
              ))}
            </div>

            {/* Answer — revealed on purpose, never just handed over */}
            {revealed[i] ? (
              <motion.div
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                className="rounded-xl border-2 border-emerald-300 bg-emerald-50 p-4 flex items-start gap-3"
                aria-live="polite"
              >
                <CheckCircle2 className="w-5 h-5 text-emerald-600 mt-0.5 shrink-0" aria-hidden />
                <div>
                  <p className="font-bold text-emerald-900">
                    Answer: {ex.answer}
                  </p>
                  <p className="text-sm text-emerald-800">{ex.answerCheck}</p>
                  <p className="text-xs text-emerald-700 mt-1">
                    🌟 Which method felt easiest for you? Everyone has a favourite!
                  </p>
                </div>
              </motion.div>
            ) : (
              <div className="flex justify-center">
                <Button
                  variant="outline"
                  className="rounded-full font-semibold"
                  onClick={() => setRevealed((r) => ({ ...r, [i]: true }))}
                >
                  <Lightbulb className="w-4 h-4 mr-1.5" />
                  Tried it yourself? Show the answer &amp; check
                </Button>
              </div>
            )}
          </CardContent>
        </Card>
      ))}
    </section>
  );
}

const styleSafeRadius = "rounded-2xl";

const METHOD_KIND_LABEL: Record<string, string> = {
  standard: "📘 Standard",
  visual: "👀 Visual",
  "number-line": "📏 Number line",
  mental: "⚡ Mental math",
  story: "📖 Story",
};

function ChallengeZone({
  challenge,
}: {
  challenge: NonNullable<import("@/lib/content/types").Lesson["challenge"]>;
}) {
  const [input, setInput] = useState("");
  const [checked, setChecked] = useState<"none" | "right" | "wrong">("none");
  const [showHint, setShowHint] = useState(false);
  const [stepsShown, setStepsShown] = useState(0);
  const norm = (s: string) => s.trim().toLowerCase().replace(/\s+/g, " ").replace(/[.,!?]+$/g, "");
  const done = stepsShown >= challenge.steps.length;

  return (
    <Card className={cn(styleSafeRadius, "border-2 border-amber-300 bg-gradient-to-br from-amber-50 to-orange-50")}>
      <CardContent className="p-4 sm:p-5 space-y-3">
        <div className="flex items-center gap-2">
          <span className="text-2xl" aria-hidden>
            🌟
          </span>
          <div>
            <h2 className="text-lg font-bold">Challenge Zone</h2>
            <p className="text-xs text-muted-foreground">A stretch problem — try it solo first!</p>
          </div>
        </div>
        <p className="font-semibold leading-snug">{challenge.prompt}</p>
        <div className="flex flex-wrap gap-2 no-print">
          <Input
            value={input}
            onChange={(e) => {
              setInput(e.target.value);
              setChecked("none");
            }}
            placeholder="Your answer…"
            aria-label="Challenge answer"
            className={cn(
              "max-w-xs rounded-xl bg-background",
              checked === "right" && "border-emerald-500",
              checked === "wrong" && "border-amber-400"
            )}
          />
          <Button
            size="sm"
            className="rounded-full"
            onClick={() => setChecked(norm(input) === norm(challenge.answer) ? "right" : input.trim() ? "wrong" : "none")}
          >
            Check
          </Button>
          <Button
            size="sm"
            variant="outline"
            className="rounded-full"
            onClick={() => setShowHint((v) => !v)}
            aria-expanded={showHint}
          >
            💡 {showHint ? "Hide" : "Hint"}
          </Button>
          <Button
            size="sm"
            variant="outline"
            className="rounded-full"
            onClick={() => setStepsShown((n) => (done ? 0 : n + 1))}
            aria-label="Reveal the next solution step"
          >
            {stepsShown === 0
              ? "Step-by-step solution"
              : done
                ? "Hide solution"
                : `Next step (${stepsShown}/${challenge.steps.length})`}
          </Button>
        </div>
        {showHint && (
          <p className="text-sm rounded-xl bg-amber-100 text-amber-900 px-3 py-2" role="status">
            {challenge.hint}
          </p>
        )}
        {checked === "right" && (
          <p className="text-sm font-semibold text-emerald-700" role="status">
            Correct! You crushed the challenge 🎉
          </p>
        )}
        {checked === "wrong" && (
          <p className="text-sm text-amber-800" role="status">
            Not yet — mistakes are practice in disguise! Peek at a hint or the steps. 🌱
          </p>
        )}
        {stepsShown > 0 && (
          <ol className="space-y-1.5" aria-live="polite">
            {challenge.steps.slice(0, stepsShown).map((s, i) => (
              <li key={i} className="flex gap-2 text-sm">
                <span
                  className="w-5 h-5 rounded-full bg-amber-500 text-white text-[11px] font-bold flex items-center justify-center shrink-0 mt-0.5"
                  aria-hidden
                >
                  {i + 1}
                </span>
                <span>{s}</span>
              </li>
            ))}
          </ol>
        )}
        {done && (
          <div className="rounded-xl border-2 border-emerald-300 bg-emerald-50 p-3 text-sm" aria-live="polite">
            <p className="font-bold text-emerald-900">Answer: {challenge.answer}</p>
            <p className="text-emerald-800">Why it works: {challenge.answerWhy}</p>
          </div>
        )}
      </CardContent>
    </Card>
  );
}

function MethodCard({ method, defaultOpen }: { method: SolveMethod; defaultOpen?: boolean }) {
  const [open, setOpen] = useState(!!defaultOpen);
  return (
    <button
      type="button"
      onClick={() => setOpen((o) => !o)}
      aria-expanded={open}
      aria-label={`Method: ${method.name}. ${open ? "Steps shown" : "Tap to show steps"}`}
      className="text-left h-full"
    >
      <Card
        className={cn(
          "h-full py-0 transition-all duration-200 cursor-pointer hover:shadow-md hover:-translate-y-0.5",
          open && "border-primary/40 bg-background shadow-sm"
        )}
      >
        <CardContent className="p-4">
          <div className="flex items-center justify-between gap-2">
            <p className="font-bold flex items-center gap-2 min-w-0">
              <span className="text-xl shrink-0" aria-hidden>
                {method.emoji}
              </span>
              <span className="truncate">{method.name}</span>
            </p>
            <ChevronDown
              className={cn("w-4 h-4 shrink-0 text-muted-foreground transition-transform", open && "rotate-180")}
              aria-hidden
            />
          </div>
          <p className="text-xs text-muted-foreground mt-1">
            {method.kind && (
              <Badge
                variant="secondary"
                className="mr-1.5 text-[10px] py-0 h-5 bg-primary/10 text-primary border-primary/20"
              >
                {METHOD_KIND_LABEL[method.kind] ?? method.kind}
              </Badge>
            )}
            <span className="font-semibold">Works great when…</span> {method.whenToUse}
          </p>
          {open && (
            <motion.ol
              initial={{ opacity: 0, y: -4 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.2 }}
              className="mt-3 space-y-2"
            >
              {method.steps.map((s, i) => (
                <li key={i} className="flex gap-2 text-sm">
                  <span
                    className="w-5 h-5 rounded-full bg-primary text-primary-foreground text-[11px] font-bold flex items-center justify-center shrink-0 mt-0.5"
                    aria-hidden
                  >
                    {i + 1}
                  </span>
                  <span className="text-foreground/90">{s}</span>
                </li>
              ))}
            </motion.ol>
          )}
        </CardContent>
      </Card>
    </button>
  );
}

// ---------------- Section card ----------------
function SectionCard({
  section,
  number,
  word,
  radius,
}: {
  section: LessonSection;
  number: number;
  word: string;
  radius: string;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <Card className={radius}>
        <CardContent className="p-5 sm:p-6">
          <p className="text-xs font-bold uppercase tracking-wider text-primary/70 mb-1">
            {word} {number}
          </p>
          <h3 className="text-lg sm:text-xl font-bold mb-2">{section.heading}</h3>
          <p className="leading-relaxed text-foreground/90">{section.body}</p>
          {section.example && (
            <div className="mt-3 rounded-xl bg-secondary/70 p-3.5 text-sm">
              <p className="font-bold text-secondary-foreground mb-0.5">Example</p>
              <p className="text-secondary-foreground/90">{section.example}</p>
            </div>
          )}
          {section.tip && (
            <p className="mt-3 text-sm flex items-start gap-1.5 text-muted-foreground">
              <Lightbulb className="w-4 h-4 mt-0.5 shrink-0 text-amber-500" />
              <span>
                <strong className="text-foreground">Tip:</strong> {section.tip}
              </span>
            </p>
          )}
        </CardContent>
      </Card>
    </motion.div>
  );
}

// ---------------- Flip card for young learners ----------------
function VocabFlipCard({ word, meaning }: { word: string; meaning: string }) {
  const [flipped, setFlipped] = useState(false);
  return (
    <button
      type="button"
      onClick={() => setFlipped((f) => !f)}
      aria-pressed={flipped}
      aria-label={`Word: ${word}. ${flipped ? `Meaning: ${meaning}` : "Tap to reveal meaning"}`}
      className="text-left h-full"
    >
      <Card
        className={cn(
          "h-full transition-all duration-300 cursor-pointer hover:shadow-md py-0",
          flipped && "bg-secondary border-primary/30"
        )}
      >
        <CardContent className="p-4">
          {flipped ? (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
              <p className="text-sm text-muted-foreground">{word} means…</p>
              <p className="font-semibold">{meaning}</p>
            </motion.div>
          ) : (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex items-center justify-between gap-2">
              <p className="font-bold text-lg text-primary">{word}</p>
              <span className="text-xs text-muted-foreground">tap 🔄</span>
            </motion.div>
          )}
        </CardContent>
      </Card>
    </button>
  );
}
