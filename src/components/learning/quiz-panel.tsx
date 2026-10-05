"use client";

import { useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { ArrowRight, CheckCircle2, RotateCcw, Trophy, XCircle } from "lucide-react";
import { cn } from "@/lib/utils";
import { celebrate } from "@/lib/confetti";
import { groupStyle } from "@/lib/learning-config";
import type { AgeGroup, Lesson } from "@/lib/content/types";

interface QuizPanelProps {
  lesson: Lesson;
  ageGroup: AgeGroup;
  bestScore: number | null;
  onScore: (score: number) => void;
  onBackToLearn: () => void;
}

export function QuizPanel({ lesson, ageGroup, bestScore, onScore, onBackToLearn }: QuizPanelProps) {
  const style = groupStyle[ageGroup];
  const [index, setIndex] = useState(0);
  const [selected, setSelected] = useState<number | null>(null);
  const [answers, setAnswers] = useState<boolean[]>([]);
  const [finished, setFinished] = useState(false);
  const [runId, setRunId] = useState(0);

  const questions = lesson.quiz;
  const q = questions[index];
  const correctCount = useMemo(() => answers.filter(Boolean).length, [answers]);
  const score = useMemo(
    () => Math.round((correctCount / questions.length) * 100),
    [correctCount, questions.length]
  );

  const isLast = index === questions.length - 1;

  const answer = (optionIndex: number) => {
    if (selected !== null) return;
    setSelected(optionIndex);
    const ok = optionIndex === q.answerIndex;
    setAnswers((a) => [...a, ok]);
    if (ok && ageGroup === "early") {
      celebrate("small");
    }
  };

  const next = () => {
    if (!isLast) {
      setIndex((i) => i + 1);
      setSelected(null);
    } else {
      const finalScore = Math.round((answers.filter(Boolean).length / questions.length) * 100);
      setFinished(true);
      onScore(finalScore);
      if (finalScore >= 60) celebrate("big");
    }
  };

  const restart = () => {
    setIndex(0);
    setSelected(null);
    setAnswers([]);
    setFinished(false);
    setRunId((r) => r + 1);
  };

  // ------------------ Results screen ------------------
  if (finished) {
    const message =
      score === 100
        ? ageGroup === "teen"
          ? "Flawless. You own this topic."
          : "PERFECT! You're a superstar! 🌟"
        : score >= 80
          ? ageGroup === "teen"
            ? "Strong work — you've got this nailed."
            : "Amazing work! 🎉"
          : score >= 60
            ? ageGroup === "teen"
              ? "Solid effort. Review the misses and run it again."
              : "Good job! Keep practicing! 💪"
            : ageGroup === "teen"
              ? "Tough round. Re-read the lesson and try again."
              : "Nice try! Let's learn together! 🤗";

    return (
      <motion.div
        key={`result-${runId}`}
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="text-center py-6"
      >
        <div className="w-24 h-24 mx-auto rounded-full bg-secondary flex items-center justify-center mb-4">
          <Trophy className={cn("w-12 h-12", score >= 80 ? "text-amber-500" : "text-muted-foreground")} />
        </div>
        <h3 className="text-3xl font-bold">{score}%</h3>
        <p className="text-muted-foreground">
          {correctCount} of {questions.length} correct
        </p>
        <p className="mt-3 text-lg font-semibold">{message}</p>
        {bestScore !== null && (
          <p className="text-sm text-muted-foreground mt-1">Personal best: {bestScore}%</p>
        )}
        <div className="flex flex-wrap justify-center gap-3 mt-6">
          <Button onClick={restart} variant="outline" className="rounded-full">
            <RotateCcw className="w-4 h-4 mr-1.5" /> Try again
          </Button>
          <Button onClick={onBackToLearn} variant="ghost" className="rounded-full">
            Review lesson
          </Button>
        </div>
      </motion.div>
    );
  }

  // ------------------ Question screen ------------------
  const answered = selected !== null;
  const isCorrect = answered && selected === q.answerIndex;

  return (
    <div key={runId} className="space-y-4">
      <div className="flex items-center justify-between gap-4">
        <Badge variant="secondary">
          Question {index + 1} of {questions.length}
        </Badge>
        <div className="flex-1 max-w-xs">
          <Progress value={((index + (answered ? 1 : 0)) / questions.length) * 100} aria-hidden />
        </div>
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={index}
          initial={{ opacity: 0, x: 24 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -24 }}
          transition={{ duration: 0.2 }}
        >
          <Card className={style.cardRadius}>
            <CardContent className="p-5 sm:p-7">
              <h3 className="text-lg sm:text-xl font-bold mb-5 leading-snug">{q.question}</h3>

              <div className="grid gap-2.5" role="radiogroup" aria-label="Answers">
                {q.options.map((opt, i) => {
                  const state =
                    !answered
                      ? "idle"
                      : i === q.answerIndex
                        ? "correct"
                        : i === selected
                          ? "wrong"
                          : "dim";
                  return (
                    <button
                      key={i}
                      type="button"
                      role="radio"
                      aria-checked={selected === i}
                      disabled={answered}
                      onClick={() => answer(i)}
                      className={cn(
                        "w-full text-left rounded-2xl border-2 px-4 py-3.5 font-semibold transition-all flex items-center gap-3",
                        state === "idle" &&
                          "border-border bg-card hover:border-primary/50 hover:bg-secondary/60 hover:translate-x-1",
                        state === "correct" && "border-emerald-500 bg-emerald-50 text-emerald-900",
                        state === "wrong" && "border-red-400 bg-red-50 text-red-900",
                        state === "dim" && "border-border opacity-50"
                      )}
                    >
                      <span
                        className={cn(
                          "w-7 h-7 rounded-full shrink-0 flex items-center justify-center text-sm font-bold",
                          state === "correct"
                            ? "bg-emerald-500 text-white"
                            : state === "wrong"
                              ? "bg-red-400 text-white"
                              : "bg-secondary text-secondary-foreground"
                        )}
                        aria-hidden
                      >
                        {state === "correct" ? (
                          <CheckCircle2 className="w-4 h-4" />
                        ) : state === "wrong" ? (
                          <XCircle className="w-4 h-4" />
                        ) : (
                          String.fromCharCode(65 + i)
                        )}
                      </span>
                      <span>{opt}</span>
                    </button>
                  );
                })}
              </div>

              <AnimatePresence>
                {answered && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    className="overflow-hidden"
                  >
                    <div
                      className={cn(
                        "mt-4 rounded-2xl p-4 text-sm",
                        isCorrect ? "bg-emerald-50 text-emerald-900" : "bg-amber-50 text-amber-900"
                      )}
                      role="status"
                    >
                      <p className="font-bold mb-0.5">
                        {isCorrect ? "Correct! 🎉" : "Not quite… 💡"}
                      </p>
                      <p>{q.explanation}</p>
                    </div>
                    <div className="mt-4 flex justify-end">
                      <Button onClick={next} className="rounded-full font-bold">
                        {isLast ? "See my score" : "Next question"}{" "}
                        <ArrowRight className="w-4 h-4 ml-1" />
                      </Button>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </CardContent>
          </Card>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
