"use client";

import { motion } from "framer-motion";
import {
  Card,
  CardContent,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { ArrowLeft, CheckCircle2, Clock, Star } from "lucide-react";
import { cn } from "@/lib/utils";
import { groupStyle, AGE_GROUPS } from "@/lib/learning-config";
import { getSubject } from "@/lib/content";
import type { AgeGroup } from "@/lib/content/types";
import type { LessonProgress } from "@/lib/student-store";

interface SubjectViewProps {
  subjectId: string;
  ageGroup: AgeGroup;
  progress: Record<string, LessonProgress>;
  onBack: () => void;
  onOpenLesson: (lessonId: string) => void;
}

export function SubjectView({
  subjectId,
  ageGroup,
  progress,
  onBack,
  onOpenLesson,
}: SubjectViewProps) {
  const subject = getSubject(subjectId);
  if (!subject) return null;

  const lessons = subject.lessons[ageGroup];
  const info = AGE_GROUPS[ageGroup];
  const style = groupStyle[ageGroup];
  const done = lessons.filter((l) => progress[l.id]).length;
  const pct = Math.round((done / lessons.length) * 100);

  return (
    <div className="space-y-6">
      <div>
        <Button variant="ghost" onClick={onBack} className="mb-3 -ml-2">
          <ArrowLeft className="w-4 h-4 mr-1" /> Back to dashboard
        </Button>

        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          className={cn(
            "rounded-3xl bg-gradient-to-br p-6 sm:p-8 text-white relative overflow-hidden",
            subject.gradient
          )}
        >
          <div className="absolute -right-8 -bottom-10 text-[10rem] opacity-20 select-none" aria-hidden>
            {subject.emoji}
          </div>
          <div className="relative">
            <p className="text-sm font-semibold uppercase tracking-wider text-white/80">
              {info.emoji} {info.label} · {info.range}
            </p>
            <h1 className="text-3xl sm:text-4xl font-bold mt-1 flex items-center gap-3">
              <span aria-hidden>{subject.emoji}</span> {subject.name}
            </h1>
            <p className="mt-1 text-white/90 max-w-xl">{subject.taglines[ageGroup]}</p>
            <div className="mt-4 max-w-xs">
              <div className="flex justify-between text-sm mb-1">
                <span>{done} of {lessons.length} complete</span>
                <span>{pct}%</span>
              </div>
              <Progress value={pct} className="h-2 bg-white/30 [&>div]:bg-white" aria-label={`${pct}% complete`} />
            </div>
          </div>
        </motion.div>
      </div>

      <section aria-label="Lessons" className="grid gap-3 sm:gap-4">
        {lessons.map((lesson, i) => {
          const p = progress[lesson.id];
          const score = p?.score ?? null;
          return (
            <motion.div
              key={lesson.id}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.06, duration: 0.3 }}
            >
              <Card
                className={cn(
                  "group cursor-pointer hover:shadow-lg hover:-translate-y-0.5 transition-all",
                  style.cardRadius
                )}
                role="button"
                tabIndex={0}
                aria-label={`${lesson.title}, about ${lesson.minutes} minutes${score !== null ? `, best score ${score}%` : ""}`}
                onClick={() => onOpenLesson(lesson.id)}
                onKeyDown={(e) => (e.key === "Enter" || e.key === " ") && onOpenLesson(lesson.id)}
              >
                <CardContent className="p-4 sm:p-5 flex items-center gap-4">
                  <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-2xl bg-secondary flex items-center justify-center text-2xl sm:text-3xl shrink-0 group-hover:scale-110 transition-transform" aria-hidden>
                    {lesson.emoji}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-bold text-base sm:text-lg leading-tight">
                      {i + 1}. {lesson.title}
                    </p>
                    <p className="text-sm text-muted-foreground line-clamp-1">{lesson.intro}</p>
                    <p className="text-xs text-muted-foreground mt-1 flex items-center gap-1">
                      <Clock className="w-3 h-3" /> ~{lesson.minutes} min · {lesson.quiz.length} quiz questions ·
                      worksheet included
                    </p>
                  </div>
                  <div className="shrink-0 flex flex-col items-end gap-1.5">
                    {p ? (
                      <>
                        <Badge className="gap-1 bg-emerald-500 hover:bg-emerald-500">
                          <CheckCircle2 className="w-3 h-3" /> Started
                        </Badge>
                        {score !== null && (
                          <Badge variant="outline" className="gap-1">
                            <Star className="w-3 h-3 text-amber-500" /> {score}%
                          </Badge>
                        )}
                      </>
                    ) : (
                      <Button size="sm" className="rounded-full">
                        {style.cta}
                      </Button>
                    )}
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          );
        })}
      </section>
    </div>
  );
}
