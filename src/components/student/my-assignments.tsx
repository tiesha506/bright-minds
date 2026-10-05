"use client";

import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { ClipboardList, CalendarClock, CheckCircle2, AlertCircle } from "lucide-react";
import { useAuthStore } from "@/lib/auth-store";
import { useStudentStore } from "@/lib/student-store";
import { api } from "@/lib/api";

const SUBJECT_LABEL: Record<string, string> = {
  math: "Math",
  english: "English",
  science: "Science",
  reading: "Reading",
};

interface AssignmentItem {
  id: string;
  title: string;
  type: string;
  subjectId: string;
  lessonId: string | null;
  lessonTitle: string | null;
  lessonEmoji: string | null;
  minutes: number | null;
  difficulty: string;
  questionCount: number;
  dueDate: string;
  instructions: string;
  status: string;
  score: number | null;
  overdue: boolean;
}

const TYPE_LABEL: Record<string, string> = {
  lesson: "📘 Lesson",
  quiz: "🧠 Quiz",
  worksheet: "📝 Worksheet",
  reading: "📖 Reading",
  custom: "🎨 Teacher activity",
};

export function MyAssignments({ onOpenLesson }: { onOpenLesson: (subjectId: string, lessonId: string) => void }) {
  const user = useAuthStore((s) => s.user);
  const profile = useStudentStore((s) => s.profile);
  const [items, setItems] = useState<AssignmentItem[] | null>(null);
  const [error, setError] = useState<string | null>(null);

  const isStudent = user?.role === "STUDENT";

  useEffect(() => {
    if (!isStudent || !profile) return;
    let cancelled = false;
    api<{ assignments: AssignmentItem[] }>(
      `/api/student/assignments?studentId=${encodeURIComponent(profile.id)}`
    )
      .then((data) => {
        if (!cancelled) setItems(data.assignments);
      })
      .catch((e) => {
        if (!cancelled) {
          setItems([]);
          setError(e instanceof Error ? e.message : "Could not load assignments");
        }
      });
    return () => {
      cancelled = true;
    };
  }, [isStudent, profile]);

  if (!isStudent) return null;

  const todo = (items ?? []).filter((a) => a.status !== "completed");
  const done = (items ?? []).filter((a) => a.status === "completed");

  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle className="flex items-center gap-2 text-lg">
          <ClipboardList className="h-5 w-5 text-primary" /> My Assignments
          {items && (
            <Badge variant="secondary" className="ml-auto">
              {todo.length} to do
            </Badge>
          )}
        </CardTitle>
      </CardHeader>
      <CardContent>
        {items === null && (
          <div className="space-y-2">
            <Skeleton className="h-14 w-full" />
            <Skeleton className="h-14 w-full" />
          </div>
        )}
        {items !== null && items.length === 0 && (
          <p className="py-3 text-center text-sm text-muted-foreground">
            No assignments right now — enjoy free learning! 🎉
          </p>
        )}
        {error && (
          <p role="alert" className="text-sm text-destructive">{error}</p>
        )}
        {items !== null && (
          <div className="space-y-2">
            {[...todo, ...done].slice(0, 6).map((a) => (
              <div
                key={a.id}
                className="flex flex-wrap items-center gap-2 rounded-xl border bg-muted/30 px-3 py-2.5"
              >
                <span className="text-xl" aria-hidden>
                  {a.lessonEmoji ?? "📌"}
                </span>
                <div className="min-w-0 flex-1">
                  <p className="truncate text-sm font-bold">{a.title}</p>
                  <p className="text-xs text-muted-foreground">
                    {TYPE_LABEL[a.type] ?? a.type}
                    {a.lessonTitle ? ` · ${a.lessonTitle}` : ""}
                    {SUBJECT_LABEL[a.subjectId] ? ` · ${SUBJECT_LABEL[a.subjectId]}` : ""}
                    {a.dueDate ? ` · due ${a.dueDate}` : ""}
                  </p>
                </div>
                {a.status === "completed" ? (
                  <Badge className="gap-1 bg-emerald-100 text-emerald-800 hover:bg-emerald-100">
                    <CheckCircle2 className="h-3 w-3" />
                    {a.score !== null ? `${a.score}%` : "Done"}
                  </Badge>
                ) : a.overdue ? (
                  <Badge className="gap-1 bg-amber-100 text-amber-800 hover:bg-amber-100">
                    <AlertCircle className="h-3 w-3" /> Overdue
                  </Badge>
                ) : (
                  <Badge variant="secondary" className="gap-1">
                    <CalendarClock className="h-3 w-3" /> To do
                  </Badge>
                )}
                {a.lessonId && a.status !== "completed" && (
                  <Button
                    size="sm"
                    className="rounded-full"
                    onClick={() => onOpenLesson(a.subjectId, a.lessonId!)}
                  >
                    Start
                  </Button>
                )}
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
}
