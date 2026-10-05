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
  Clock,
  Lightbulb,
  PartyPopper,
  PencilLine,
  Sparkles,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { groupStyle } from "@/lib/learning-config";
import { getLesson, getSubject } from "@/lib/content";
import type { AgeGroup, LessonSection } from "@/lib/content/types";
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
