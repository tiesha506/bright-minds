"use client";

import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Label } from "@/components/ui/label";
import { NotebookPen, Printer, RotateCcw, Sparkles } from "lucide-react";
import { cn } from "@/lib/utils";
import { AGE_GROUPS, AGE_GROUP_ORDER } from "@/lib/learning-config";
import { subjects } from "@/lib/content";
import type { AgeGroup, Subject, WorksheetItem } from "@/lib/content/types";
import { WorksheetPanel } from "./worksheet-panel";
import { useStudentStore } from "@/lib/student-store";
import { toast } from "@/hooks/use-toast";

type Difficulty = "mild" | "standard" | "tricky";

const DIFFICULTIES: { id: Difficulty; label: string; hint: string; kinds: string[] }[] = [
  {
    id: "mild",
    label: "Mild 😊",
    hint: "Warm-up level",
    kinds: ["fill-blank", "match"],
  },
  {
    id: "standard",
    label: "Standard 💪",
    hint: "A bit of everything",
    kinds: ["fill-blank", "practice", "match", "correct-sentence", "build-sentence", "short-answer", "writing", "draw"],
  },
  {
    id: "tricky",
    label: "Tricky 🔥",
    hint: "Brain stretchers",
    kinds: ["practice", "correct-sentence", "build-sentence", "short-answer", "writing"],
  },
];

const COUNTS = [5, 8, 10] as const;

interface GeneratedSheet {
  key: string;
  items: WorksheetItem[];
  subjectName: string;
  topicName: string;
}

function pickItems(
  subject: Subject,
  group: AgeGroup,
  topicId: string, // lesson id or "all"
  difficulty: Difficulty,
  count: number
): GeneratedSheet | null {
  const lessons = subject.lessons[group];
  const pool = lessons.filter((l) => topicId === "all" || l.id === topicId);
  const diff = DIFFICULTIES.find((d) => d.id === difficulty)!;

  let candidates: { lesson: (typeof lessons)[number]; item: WorksheetItem }[] = [];
  for (const lesson of pool) {
    for (const item of lesson.worksheet) {
      if (diff.kinds.includes(item.kind)) candidates.push({ lesson, item });
    }
  }
  // Fallback: top up with anything if the filtered pool is too small.
  if (candidates.length < count) {
    for (const lesson of pool) {
      for (const item of lesson.worksheet) {
        if (!candidates.some((c) => c.item === item)) candidates.push({ lesson, item });
      }
    }
  }
  if (candidates.length === 0) return null;

  // Shuffle deterministically-ish (client only component; Math.random is fine here).
  const shuffled = [...candidates].sort(() => Math.random() - 0.5);
  const chosen = shuffled.slice(0, Math.min(count, shuffled.length));

  const topicName =
    topicId === "all"
      ? `${subject.name} — Mixed topics`
      : (pool.find((l) => l.id === topicId)?.title ?? "Mixed");

  return {
    key: `gen-${subject.id}-${group}-${topicId}-${difficulty}-${chosen.map((c) => c.item.prompt.length).join("")}`,
    items: chosen.map((c) => c.item),
    subjectName: subject.name,
    topicName,
  };
}

export function WorksheetsHub({
  defaultAgeGroup,
  studentName,
}: {
  defaultAgeGroup: AgeGroup;
  studentName: string;
}) {
  const markWorksheetDone = useStudentStore((s) => s.markWorksheetDone);
  const [subjectId, setSubjectId] = useState(subjects[0].id);
  const [group, setGroup] = useState<AgeGroup>(defaultAgeGroup);
  const [topicId, setTopicId] = useState<string>("all");
  const [difficulty, setDifficulty] = useState<Difficulty>("standard");
  const [count, setCount] = useState<number>(8);
  const [sheet, setSheet] = useState<GeneratedSheet | null>(null);

  const subject = subjects.find((s) => s.id === subjectId) ?? subjects[0];
  const lessons = subject.lessons[group];

  const generate = () => {
    const next = pickItems(subject, group, topicId, difficulty, count);
    if (!next || next.items.length === 0) {
      toast({
        title: "Not enough questions yet 😅",
        description: "Try a different topic or level — more content is on the way!",
      });
      return;
    }
    setSheet(next);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const today = useMemo(
    () =>
      new Date().toLocaleDateString("en-GB", {
        day: "numeric",
        month: "long",
        year: "numeric",
      }),
    []
  );

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold flex items-center gap-2">
          <NotebookPen className="w-7 h-7 text-primary" /> Worksheet Builder
        </h1>
        <p className="text-muted-foreground mt-1">
          Pick your settings, generate a worksheet, practice online — or print it with a grown-up
          answer key.
        </p>
      </div>

      {/* Builder card */}
      <Card>
        <CardContent className="p-5 sm:p-6 space-y-5">
          {/* Subject */}
          <div className="space-y-2">
            <Label>Subject</Label>
            <div className="flex flex-wrap gap-2" role="radiogroup" aria-label="Subject">
              {subjects.map((s) => (
                <button
                  key={s.id}
                  type="button"
                  role="radio"
                  aria-checked={subjectId === s.id}
                  onClick={() => {
                    setSubjectId(s.id);
                    setTopicId("all");
                    setSheet(null);
                  }}
                  className={cn(
                    "rounded-full border-2 px-4 py-2 font-semibold transition-all",
                    subjectId === s.id
                      ? "border-primary bg-secondary"
                      : "border-border hover:border-primary/40"
                  )}
                >
                  {s.emoji} {s.name}
                </button>
              ))}
            </div>
          </div>

          {/* Level */}
          <div className="space-y-2">
            <Label>Age / level</Label>
            <div className="flex flex-wrap gap-2" role="radiogroup" aria-label="Level">
              {AGE_GROUP_ORDER.map((g) => (
                <button
                  key={g}
                  type="button"
                  role="radio"
                  aria-checked={group === g}
                  onClick={() => {
                    setGroup(g);
                    setTopicId("all");
                    setSheet(null);
                  }}
                  className={cn(
                    "rounded-full border-2 px-4 py-2 text-sm font-semibold transition-all",
                    group === g ? "border-primary bg-secondary" : "border-border hover:border-primary/40"
                  )}
                >
                  {AGE_GROUPS[g].emoji} {AGE_GROUPS[g].label}
                </button>
              ))}
            </div>
          </div>

          {/* Topic + difficulty + count */}
          <div className="grid gap-4 sm:grid-cols-3">
            <div className="space-y-2">
              <Label htmlFor="ws-topic">Topic</Label>
              <select
                id="ws-topic"
                value={topicId}
                onChange={(e) => {
                  setTopicId(e.target.value);
                  setSheet(null);
                }}
                className="h-10 w-full rounded-xl border border-input bg-background px-3 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
              >
                <option value="all">🎲 Mixed topics</option>
                {lessons.map((l) => (
                  <option key={l.id} value={l.id}>
                    {l.emoji} {l.title}
                  </option>
                ))}
              </select>
            </div>
            <div className="space-y-2">
              <Label>Difficulty</Label>
              <div className="flex flex-wrap gap-1.5">
                {DIFFICULTIES.map((d) => (
                  <button
                    key={d.id}
                    type="button"
                    onClick={() => {
                      setDifficulty(d.id);
                      setSheet(null);
                    }}
                    aria-pressed={difficulty === d.id}
                    title={d.hint}
                    className={cn(
                      "rounded-full border-2 px-3 py-1.5 text-sm font-semibold transition-all",
                      difficulty === d.id
                        ? "border-primary bg-secondary"
                        : "border-border hover:border-primary/40"
                    )}
                  >
                    {d.label}
                  </button>
                ))}
              </div>
            </div>
            <div className="space-y-2">
              <Label>Questions</Label>
              <div className="flex flex-wrap gap-1.5">
                {COUNTS.map((c) => (
                  <button
                    key={c}
                    type="button"
                    onClick={() => {
                      setCount(c);
                      setSheet(null);
                    }}
                    aria-pressed={count === c}
                    className={cn(
                      "rounded-full border-2 px-4 py-1.5 text-sm font-semibold transition-all",
                      count === c ? "border-primary bg-secondary" : "border-border hover:border-primary/40"
                    )}
                  >
                    {c}
                  </button>
                ))}
              </div>
            </div>
          </div>

          <Button size="lg" onClick={generate} className="rounded-full font-bold w-full sm:w-auto">
            <Sparkles className="w-5 h-5 mr-1.5" /> Generate worksheet
          </Button>
        </CardContent>
      </Card>

      {/* Generated sheet */}
      {sheet && (
        <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}>
          <div className="flex flex-wrap items-center justify-between gap-2 mb-3 no-print">
            <Badge variant="secondary" className="gap-1">
              <NotebookPen className="w-3.5 h-3.5" /> {sheet.items.length} questions ·{" "}
              {DIFFICULTIES.find((d) => d.id === difficulty)?.label}
            </Badge>
            <div className="flex gap-2">
              <Button variant="outline" size="sm" className="rounded-full" onClick={generate}>
                <RotateCcw className="w-4 h-4 mr-1" /> New questions
              </Button>
              <Button
                variant="outline"
                size="sm"
                className="rounded-full"
                onClick={() => window.print()}
              >
                <Printer className="w-4 h-4 mr-1" /> Print / Save PDF
              </Button>
            </div>
          </div>
          <WorksheetPanel
            items={sheet.items}
            lessonTitle={`${sheet.subjectName} · ${sheet.topicName}`}
            meta={{
              studentName,
              date: today,
              subjectName: sheet.subjectName,
              topicName: sheet.topicName,
            }}
            onGraded={(correct, gradable) => {
              markWorksheetDone(sheet.key);
              if (gradable > 0 && correct === gradable) {
                toast({
                  title: "Perfect worksheet! 🏆",
                  description: "Every question correct — brilliant work!",
                });
              }
            }}
          />
        </motion.div>
      )}

      {/* Hint when nothing generated */}
      {!sheet && (
        <Card className="border-dashed border-2 border-primary/30 bg-secondary/40">
          <CardContent className="p-5 text-center text-sm text-muted-foreground">
            Your generated worksheet will appear here — with your name, today&apos;s date, the
            topic, and a printable answer key. 🎯
          </CardContent>
        </Card>
      )}
    </div>
  );
}
