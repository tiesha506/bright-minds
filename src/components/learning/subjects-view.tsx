"use client";

import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { cn } from "@/lib/utils";
import { AGE_GROUPS, groupStyle } from "@/lib/learning-config";
import { subjects } from "@/lib/content";
import type { AgeGroup } from "@/lib/content/types";
import type { LessonProgress } from "@/lib/student-store";

interface SubjectsViewProps {
  ageGroup: AgeGroup;
  progress: Record<string, LessonProgress>;
  onOpenSubject: (subjectId: string) => void;
}

export function SubjectsView({ ageGroup, progress, onOpenSubject }: SubjectsViewProps) {
  const info = AGE_GROUPS[ageGroup];
  const style = groupStyle[ageGroup];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Your Subjects</h1>
        <p className="text-muted-foreground mt-1">
          Four core subjects, tuned to {info.label} ({info.range}). Pick one and dive in!
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {subjects.map((subject, i) => {
          const lessons = subject.lessons[ageGroup];
          const done = lessons.filter((l) => progress[l.id]).length;
          const pct = Math.round((done / lessons.length) * 100);
          return (
            <motion.div
              key={subject.id}
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: i * 0.06 }}
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
                  <div className="flex items-start justify-between gap-3">
                    <div
                      className={cn(
                        "w-14 h-14 rounded-2xl bg-gradient-to-br flex items-center justify-center text-3xl shadow-md group-hover:scale-110 transition-transform",
                        subject.gradient
                      )}
                      aria-hidden
                    >
                      {subject.emoji}
                    </div>
                    {pct === 100 && <Badge className="bg-emerald-500 hover:bg-emerald-500">Done! 🎉</Badge>}
                  </div>
                  <CardTitle className="text-xl mt-3">{subject.name}</CardTitle>
                  <p className="text-sm text-muted-foreground">{subject.taglines[ageGroup]}</p>
                </CardHeader>
                <CardContent className="pt-0">
                  <div className="flex items-center justify-between text-sm mb-1.5">
                    <span className="text-muted-foreground">
                      {done}/{lessons.length} lessons
                    </span>
                    <span className="text-xs text-muted-foreground">
                      {lessons.reduce((n, l) => n + l.quiz.length, 0)} quiz questions
                    </span>
                  </div>
                  <Progress value={pct} aria-label={`${pct}% complete`} />
                </CardContent>
              </Card>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
