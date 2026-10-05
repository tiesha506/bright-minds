"use client";

import { useMemo, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { CheckCircle2, XCircle } from "lucide-react";
import { cn } from "@/lib/utils";
import { getDailyChallenge } from "@/lib/content";
import type { AgeGroup } from "@/lib/content/types";

interface DailyChallengeDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  ageGroup: AgeGroup;
  done: boolean;
  onClaim: (correct: boolean) => void;
  studentName: string;
}

export function DailyChallengeDialog({
  open,
  onOpenChange,
  ageGroup,
  done,
  onClaim,
  studentName,
}: DailyChallengeDialogProps) {
  const [selected, setSelected] = useState<number | null>(null);

  const daily = useMemo(() => getDailyChallenge(ageGroup), [ageGroup]);
  const q = daily.lesson.quiz[daily.questionIndex];

  const answered = selected !== null;
  const isCorrect = answered && selected === q.answerIndex;

  const closeAndReset = () => {
    onOpenChange(false);
    setTimeout(() => setSelected(null), 300);
  };

  return (
    <Dialog open={open} onOpenChange={(o) => (o ? onOpenChange(o) : closeAndReset())}>
      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle>
            🔥 Question of the Day
          </DialogTitle>
          <DialogDescription>
            {done
              ? `You already completed today's challenge, ${studentName} — here it is again for fun!`
              : `${daily.subject.emoji} ${daily.subject.name} · ${daily.lesson.title} · +5 XP`}
          </DialogDescription>
        </DialogHeader>

        <div>
          <h3 className="font-bold text-lg leading-snug mb-4">{q.question}</h3>
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
                  onClick={() => {
                    setSelected(i);
                    onClaim(i === q.answerIndex);
                  }}
                  className={cn(
                    "w-full text-left rounded-2xl border-2 px-4 py-3 font-semibold transition-all flex items-center gap-3",
                    state === "idle" && "border-border hover:border-primary/50 hover:bg-secondary/60",
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

          {answered && (
            <div
              className={cn(
                "mt-4 rounded-2xl p-4 text-sm",
                isCorrect ? "bg-emerald-50 text-emerald-900" : "bg-amber-50 text-amber-900"
              )}
              role="status"
            >
              <p className="font-bold mb-0.5">
                {isCorrect ? "Correct! +5 XP ⚡" : "Not quite — now you know! 💡"}
              </p>
              <p>{q.explanation}</p>
            </div>
          )}
        </div>

        <DialogFooter>
          <Button
            variant="outline"
            onClick={() => onOpenChange(false)}
            className="rounded-full"
          >
            Maybe later
          </Button>
          <Button
            onClick={closeAndReset}
            disabled={!answered}
            className="rounded-full font-bold"
          >
            {isCorrect ? "Awesome! Done ✨" : "Got it, done"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
