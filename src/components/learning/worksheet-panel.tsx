"use client";

import { useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Check, Eraser, Eye, Paintbrush, Printer } from "lucide-react";
import { cn } from "@/lib/utils";
import { celebrate } from "@/lib/confetti";
import type { WorksheetItem } from "@/lib/content/types";

interface WorksheetPanelProps {
  items: WorksheetItem[];
  lessonTitle: string;
}

function normalize(s: string) {
  return s.trim().toLowerCase().replace(/\s+/g, " ").replace(/[.,!?]+$/g, "");
}

interface ItemState {
  value: string;
  checked: boolean;
  correct: boolean | null;
  revealed: boolean;
  drewIt: boolean;
  matches: number[];
}

export function WorksheetPanel({ items, lessonTitle }: WorksheetPanelProps) {
  const [states, setStates] = useState<ItemState[]>(() =>
    items.map((item) => ({
      value: "",
      checked: false,
      correct: null,
      revealed: false,
      drewIt: false,
      matches: item.kind === "match" ? item.left.map(() => -1) : [],
    }))
  );
  const [allChecked, setAllChecked] = useState(false);

  const update = (i: number, patch: Partial<ItemState>) =>
    setStates((s) => s.map((st, idx) => (idx === i ? { ...st, ...patch } : st)));

  const gradeItem = (item: WorksheetItem, st: ItemState): boolean | null => {
    if (item.kind === "fill-blank" || item.kind === "practice") {
      return normalize(st.value) === normalize(item.answer);
    }
    if (item.kind === "match") {
      return st.matches.every((m, idx) => m === item.answer[idx]);
    }
    return null; // open-ended
  };

  const isGradable = (it: WorksheetItem) =>
    it.kind === "fill-blank" || it.kind === "practice" || it.kind === "match";

  const checkAll = () => {
    const next = states.map((st, i) => ({
      ...st,
      checked: true,
      correct: gradeItem(items[i], st),
    }));
    setStates(next);
    setAllChecked(true);
    const gradableIdx = items
      .map((it, i) => (isGradable(it) ? i : -1))
      .filter((i) => i >= 0);
    const results = gradableIdx.map((i) => next[i]);
    const allRight = results.every((r) => r.correct === true);
    const someRight = results.some((r) => r.correct === true);
    if (gradableIdx.length > 0 && allRight) celebrate("big");
    else if (someRight) celebrate("small");
  };

  const gradableCount = items.filter(isGradable).length;
  const rightCount = states.filter((s) => s.correct === true).length;

  return (
    <div className="space-y-4">
      <Card className="print-full">
        <CardContent className="p-5 sm:p-6">
          <div className="flex flex-wrap items-center justify-between gap-2 mb-1 no-print">
            <Badge variant="secondary">Worksheet</Badge>
            <Button variant="outline" size="sm" onClick={() => window.print()} className="rounded-full">
              <Printer className="w-4 h-4 mr-1" /> Print
            </Button>
          </div>
          <h3 className="text-lg font-bold">{lessonTitle} — Practice Sheet</h3>
          <p className="text-sm text-muted-foreground">
            Answer each part. {gradableCount > 0 ? "Green check = you got it!" : "Reflect and write from the heart."}
          </p>

          <ol className="mt-5 space-y-5 list-none">
            {items.map((item, i) => {
              const st = states[i];
              return (
                <li key={i} className="rounded-2xl border p-4 bg-card">
                  <div className="flex items-start gap-3">
                    <span
                      className={cn(
                        "w-7 h-7 shrink-0 rounded-full flex items-center justify-center text-sm font-bold",
                        st.correct === true
                          ? "bg-emerald-500 text-white"
                          : st.correct === false
                            ? "bg-red-400 text-white"
                            : "bg-secondary text-secondary-foreground"
                      )}
                      aria-hidden
                    >
                      {st.correct === true ? <Check className="w-4 h-4" /> : i + 1}
                    </span>
                    <div className="flex-1 min-w-0 space-y-3">
                      <p className="font-semibold leading-snug">{item.prompt}</p>

                      {/* fill-blank & practice */}
                      {(item.kind === "fill-blank" || item.kind === "practice") && (
                        <div className="space-y-2">
                          {"hint" in item && item.hint && !st.revealed && (
                            <p className="text-xs text-muted-foreground">Hint: {item.hint}</p>
                          )}
                          <Input
                            value={st.value}
                            onChange={(e) => update(i, { value: e.target.value, correct: null, checked: false })}
                            placeholder="Your answer…"
                            aria-label={`Answer for question ${i + 1}`}
                            className={cn(
                              "max-w-xs rounded-xl",
                              st.correct === true && "border-emerald-500 focus-visible:ring-emerald-500",
                              st.correct === false && "border-red-400 focus-visible:ring-red-400"
                            )}
                          />
                          {st.revealed && (
                            <p className="text-sm text-emerald-700 font-semibold">
                              Answer: {item.answer}
                            </p>
                          )}
                        </div>
                      )}

                      {/* short-answer */}
                      {item.kind === "short-answer" && (
                        <div className="space-y-2">
                          <textarea
                            value={st.value}
                            onChange={(e) => update(i, { value: e.target.value })}
                            placeholder="Write your thoughts…"
                            aria-label={`Answer for question ${i + 1}`}
                            rows={3}
                            className="w-full rounded-xl border border-input bg-background px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                          />
                          {st.revealed && (
                            <div className="rounded-xl bg-secondary p-3 text-sm">
                              <p className="font-semibold text-secondary-foreground mb-0.5">Sample answer:</p>
                              <p className="text-secondary-foreground/90">{item.sampleAnswer}</p>
                            </div>
                          )}
                        </div>
                      )}

                      {/* match */}
                      {item.kind === "match" && (
                        <div className="grid gap-2 sm:grid-cols-2">
                          {item.left.map((leftText, li) => (
                            <div key={li} className="flex items-center gap-2">
                              <span className="text-sm font-semibold flex-1 truncate" title={leftText}>
                                {leftText}
                              </span>
                              <select
                                value={st.matches[li]}
                                onChange={(e) => {
                                  const matches = [...st.matches];
                                  matches[li] = Number(e.target.value);
                                  update(i, { matches, correct: null, checked: false });
                                }}
                                aria-label={`Match for ${leftText}`}
                                className="h-9 rounded-lg border border-input bg-background px-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring max-w-[45%]"
                              >
                                <option value={-1} disabled>
                                  Choose…
                                </option>
                                {item.right.map((rightText, ri) => (
                                  <option key={ri} value={ri}>
                                    {rightText}
                                  </option>
                                ))}
                              </select>
                            </div>
                          ))}
                          {st.revealed && (
                            <p className="text-sm text-emerald-700 font-semibold">
                              Correct matches:{" "}
                              {item.left
                                .map((l, li) => `${l} → ${item.right[item.answer[li]]}`)
                                .join(" · ")}
                            </p>
                          )}
                        </div>
                      )}

                      {/* draw */}
                      {item.kind === "draw" && (
                        <div className="space-y-2">
                          <DoodlePad
                            onChange={(hasInk) => update(i, { drewIt: hasInk })}
                          />
                          <label className="flex items-center gap-2 text-sm cursor-pointer w-fit">
                            <input
                              type="checkbox"
                              checked={st.drewIt}
                              onChange={(e) => update(i, { drewIt: e.target.checked })}
                              className="w-4 h-4 accent-[var(--primary)]"
                            />
                            I made my masterpiece! 🎨
                          </label>
                        </div>
                      )}
                    </div>
                  </div>
                </li>
              );
            })}
          </ol>

          <div className="mt-6 flex flex-wrap items-center gap-3 no-print">
            <Button onClick={checkAll} className="rounded-full font-bold">
              <Check className="w-4 h-4 mr-1.5" /> Check my work
            </Button>
            <Button
              variant="outline"
              onClick={() =>
                setStates((s) => s.map((st) => ({ ...st, revealed: true })))
              }
              className="rounded-full"
            >
              <Eye className="w-4 h-4 mr-1.5" /> Show answers
            </Button>
            {allChecked && gradableCount > 0 && (
              <Badge
                className={cn(
                  "text-sm py-1.5",
                  rightCount === gradableCount
                    ? "bg-emerald-500 hover:bg-emerald-500"
                    : "bg-amber-500 hover:bg-amber-500"
                )}
                role="status"
              >
                {rightCount === gradableCount
                  ? "All correct — outstanding! 🏆"
                  : `${rightCount}/${gradableCount} correct — review the red ones!`}
              </Badge>
            )}
          </div>
          <p className="text-xs text-muted-foreground mt-3 no-print">
            Tip: worksheets don&apos;t give XP — quizzes do! But practicing makes your brain stronger. 🧠
          </p>
        </CardContent>
      </Card>
    </div>
  );
}

// ---------------------- Simple canvas doodle pad ----------------------
function DoodlePad({ onChange }: { onChange: (hasInk: boolean) => void }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const drawing = useRef(false);
  const hasInk = useRef(false);

  const pos = (e: React.PointerEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current!;
    const rect = canvas.getBoundingClientRect();
    return {
      x: ((e.clientX - rect.left) / rect.width) * canvas.width,
      y: ((e.clientY - rect.top) / rect.height) * canvas.height,
    };
  };

  const start = (e: React.PointerEvent<HTMLCanvasElement>) => {
    e.preventDefault();
    drawing.current = true;
    const ctx = canvasRef.current!.getContext("2d")!;
    const { x, y } = pos(e);
    ctx.beginPath();
    ctx.moveTo(x, y);
  };

  const move = (e: React.PointerEvent<HTMLCanvasElement>) => {
    if (!drawing.current) return;
    e.preventDefault();
    const ctx = canvasRef.current!.getContext("2d")!;
    const styles = getComputedStyle(document.documentElement);
    ctx.strokeStyle = styles.getPropertyValue("--primary").trim() || "#e11d8f";
    ctx.lineWidth = 4;
    ctx.lineCap = "round";
    ctx.lineJoin = "round";
    const { x, y } = pos(e);
    ctx.lineTo(x, y);
    ctx.stroke();
    if (!hasInk.current) {
      hasInk.current = true;
      onChange(true);
    }
  };

  const stop = () => {
    drawing.current = false;
  };

  const clear = () => {
    const canvas = canvasRef.current!;
    canvas.getContext("2d")!.clearRect(0, 0, canvas.width, canvas.height);
    hasInk.current = false;
    onChange(false);
  };

  return (
    <div className="space-y-1.5">
      <div className="rounded-2xl border-2 border-dashed border-primary/40 bg-secondary/30 p-1.5 w-full max-w-sm">
        <canvas
          ref={canvasRef}
          width={560}
          height={300}
          className="w-full h-auto rounded-xl bg-white touch-none cursor-crosshair"
          onPointerDown={start}
          onPointerMove={move}
          onPointerUp={stop}
          onPointerLeave={stop}
          role="img"
          aria-label="Drawing area. Draw your answer here with a mouse, pen or finger."
        />
      </div>
      <Button variant="ghost" size="sm" onClick={clear} type="button" className="no-print">
        <Eraser className="w-4 h-4 mr-1" /> Clear drawing
      </Button>
      <p className="text-xs text-muted-foreground flex items-center gap-1 no-print">
        <Paintbrush className="w-3 h-3" /> Draw with your finger, mouse or stylus — or on paper!
      </p>
    </div>
  );
}
