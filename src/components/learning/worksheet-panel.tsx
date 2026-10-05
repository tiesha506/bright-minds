"use client";

import { useMemo, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Check, Eraser, Eye, KeyRound, Paintbrush, Printer, Undo2 } from "lucide-react";
import { cn } from "@/lib/utils";
import { celebrate } from "@/lib/confetti";
import type { WorksheetItem } from "@/lib/content/types";

interface WorksheetMeta {
  studentName: string;
  date: string;
  subjectName: string;
  topicName: string;
}

interface WorksheetPanelProps {
  items: WorksheetItem[];
  lessonTitle: string;
  /** Printable header info (name/date/subject/topic). Optional for lesson worksheets. */
  meta?: WorksheetMeta;
  /** Called when the student checks work for the first time. */
  onGraded?: (correct: number, gradable: number) => void;
}

function normalize(s: string) {
  return s
    .trim()
    .toLowerCase()
    .replace(/\s+/g, " ")
    .replace(/[.,!?;:]+$/g, "")
    .replace(/[""]/g, '"');
}

/** Deterministic shuffle so SSR and client render the same tile order. */
function seededShuffle<T>(arr: T[], seed: number): T[] {
  const out = [...arr];
  let s = seed;
  for (let i = out.length - 1; i > 0; i--) {
    s = (s * 9301 + 49297) % 233280;
    const j = Math.floor((s / 233280) * (i + 1));
    [out[i], out[j]] = [out[j], out[i]];
  }
  return out;
}

interface ItemState {
  value: string;
  checked: boolean;
  correct: boolean | null;
  revealed: boolean;
  drewIt: boolean;
  matches: number[];
  built: string[];
}

function initState(items: WorksheetItem[]): ItemState[] {
  return items.map((item) => ({
    value: "",
    checked: false,
    correct: null,
    revealed: false,
    drewIt: false,
    matches: item.kind === "match" ? item.left.map(() => -1) : [],
    built: [],
  }));
}

export function WorksheetPanel({ items, lessonTitle, meta, onGraded }: WorksheetPanelProps) {
  const [states, setStates] = useState<ItemState[]>(() => initState(items));
  const [allChecked, setAllChecked] = useState(false);
  const [keyVisible, setKeyVisible] = useState(false);
  const [gradedOnce, setGradedOnce] = useState(false);

  // Re-seed states if the item set changes (worksheet generator).
  const itemsKey = useMemo(() => JSON.stringify(items).length + items.length, [items]);
  const [lastKey, setLastKey] = useState(itemsKey);
  if (itemsKey !== lastKey) {
    setLastKey(itemsKey);
    setStates(initState(items));
    setAllChecked(false);
    setGradedOnce(false);
  }

  const update = (i: number, patch: Partial<ItemState>) =>
    setStates((s) => s.map((st, idx) => (idx === i ? { ...st, ...patch } : st)));

  const isGradable = (it: WorksheetItem) =>
    it.kind === "fill-blank" ||
    it.kind === "practice" ||
    it.kind === "match" ||
    it.kind === "correct-sentence" ||
    it.kind === "build-sentence" ||
    it.kind === "writing";

  const gradeItem = (item: WorksheetItem, st: ItemState): boolean | null => {
    if (item.kind === "fill-blank" || item.kind === "practice") {
      return normalize(st.value) === normalize(item.answer);
    }
    if (item.kind === "correct-sentence") {
      return normalize(st.value) === normalize(item.answer);
    }
    if (item.kind === "build-sentence") {
      return normalize(st.built.join(" ")) === normalize(item.answer);
    }
    if (item.kind === "match") {
      return st.matches.every((m, idx) => m === item.answer[idx]);
    }
    if (item.kind === "writing") {
      const min = item.minWords ?? 12;
      return st.value.trim().split(/\s+/).filter(Boolean).length >= min;
    }
    return null; // short-answer and draw are self-checked
  };

  const checkAll = () => {
    const next = states.map((st, i) => ({
      ...st,
      checked: true,
      correct: gradeItem(items[i], st),
    }));
    setStates(next);
    setAllChecked(true);
    const gradableIdx = items.map((it, i) => (isGradable(it) ? i : -1)).filter((i) => i >= 0);
    const results = gradableIdx.map((i) => next[i]);
    const allRight = results.every((r) => r.correct === true);
    const someRight = results.some((r) => r.correct === true);
    if (gradableIdx.length > 0 && allRight) celebrate("big");
    else if (someRight) celebrate("small");
    if (!gradedOnce && onGraded) {
      setGradedOnce(true);
      const correct = results.filter((r) => r.correct === true).length;
      onGraded(correct, gradableIdx.length);
    }
  };

  const gradableCount = items.filter(isGradable).length;
  const rightCount = states.filter((s) => s.correct === true).length;

  const answerKeyLines = items.map((item, i) => {
    switch (item.kind) {
      case "fill-blank":
      case "practice":
      case "correct-sentence":
        return `${i + 1}. ${item.answer}`;
      case "build-sentence":
        return `${i + 1}. ${item.answer}`;
      case "match":
        return `${i + 1}. ${item.left
          .map((l, li) => `${l} → ${item.right[item.answer[li]]}`)
          .join(" · ")}`;
      case "short-answer":
        return `${i + 1}. Sample: ${item.sampleAnswer}`;
      case "writing":
        return `${i + 1}. Sample: ${item.sampleAnswer}`;
      case "draw":
        return `${i + 1}. (drawing activity)`;
    }
  });

  return (
    <div className="space-y-4">
      <Card className="print-full">
        <CardContent className="p-5 sm:p-6">
          {/* Printable header: name, date, subject, topic */}
          <div className="flex flex-wrap items-center justify-between gap-2 mb-3 no-print">
            <Badge variant="secondary">Worksheet</Badge>
            <div className="flex gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setKeyVisible((v) => !v)}
                className="rounded-full"
                aria-pressed={keyVisible}
              >
                <KeyRound className="w-4 h-4 mr-1" /> Answer key
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => window.print()}
                className="rounded-full"
              >
                <Printer className="w-4 h-4 mr-1" /> Print / Save PDF
              </Button>
            </div>
          </div>

          <h3 className="text-lg font-bold print:text-xl">{lessonTitle}</h3>
          {meta ? (
            <div className="mt-3 grid grid-cols-1 sm:grid-cols-2 gap-2 text-sm print:grid-cols-2">
              <p>
                <span className="font-semibold">Name:</span> {meta.studentName}
              </p>
              <p>
                <span className="font-semibold">Date:</span> {meta.date}
              </p>
              <p>
                <span className="font-semibold">Subject:</span> {meta.subjectName}
              </p>
              <p>
                <span className="font-semibold">Topic:</span> {meta.topicName}
              </p>
            </div>
          ) : (
            <p className="text-sm text-muted-foreground">
              Answer each part.{" "}
              {gradableCount > 0
                ? "Green check = you got it!"
                : "Reflect and write from the heart."}
            </p>
          )}
          <div className="mt-3 border-t border-dashed" aria-hidden />

          <ol className="mt-5 space-y-5 list-none">
            {items.map((item, i) => {
              const st = states[i];
              return (
                <li key={i} className="rounded-2xl border p-4 bg-card print:break-inside-avoid">
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
                            onChange={(e) =>
                              update(i, { value: e.target.value, correct: null, checked: false })
                            }
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

                      {/* correct-sentence */}
                      {item.kind === "correct-sentence" && (
                        <div className="space-y-2">
                          <p className="rounded-xl bg-amber-50 border border-amber-200 px-3 py-2 text-amber-900 print:bg-white print:border-neutral-300">
                            <span className="text-xs font-bold uppercase tracking-wide block mb-0.5">
                              Find the mistake
                            </span>
                            {item.sentence}
                          </p>
                          <Input
                            value={st.value}
                            onChange={(e) =>
                              update(i, { value: e.target.value, correct: null, checked: false })
                            }
                            placeholder="Type the corrected sentence…"
                            aria-label={`Corrected sentence for question ${i + 1}`}
                            className={cn(
                              "rounded-xl",
                              st.correct === true && "border-emerald-500",
                              st.correct === false && "border-red-400"
                            )}
                          />
                          {st.revealed && (
                            <div className="text-sm space-y-0.5">
                              <p className="text-emerald-700 font-semibold">
                                Correct: {item.answer}
                              </p>
                              {item.why && (
                                <p className="text-muted-foreground">Why: {item.why}</p>
                              )}
                            </div>
                          )}
                          {st.correct === false && item.why && (
                            <p className="text-sm rounded-xl bg-sky-50 text-sky-900 border border-sky-200 px-3 py-2 print:bg-white print:border-neutral-300">
                              🌱 Nice try! {item.why}
                            </p>
                          )}
                        </div>
                      )}

                      {/* build-sentence */}
                      {item.kind === "build-sentence" && (
                        <div className="space-y-2">
                          <div
                            className="min-h-11 rounded-xl border-2 border-dashed border-primary/30 bg-secondary/30 px-3 py-2 text-sm font-semibold"
                            aria-live="polite"
                            aria-label={`Your sentence for question ${i + 1}`}
                          >
                            {st.built.length ? st.built.join(" ") : "Tap the words below…"}
                          </div>
                          <div className="flex flex-wrap gap-2">
                            {seededShuffle(item.words, 7 + i * 13).map((w, wi) => {
                              const used = st.built.filter((b) => b === w).length;
                              const total = item.words.filter((x) => x === w).length;
                              const disabled = used >= total || st.revealed;
                              return (
                                <button
                                  key={`${w}-${wi}`}
                                  type="button"
                                  disabled={disabled}
                                  onClick={() =>
                                    update(i, { built: [...st.built, w], correct: null, checked: false })
                                  }
                                  className={cn(
                                    "rounded-full border-2 px-3 py-1.5 text-sm font-semibold transition-all",
                                    disabled
                                      ? "opacity-30 border-border"
                                      : "border-primary/40 hover:bg-secondary hover:-translate-y-0.5"
                                  )}
                                >
                                  {w}
                                </button>
                              );
                            })}
                          </div>
                          <Button
                            type="button"
                            variant="ghost"
                            size="sm"
                            onClick={() => update(i, { built: st.built.slice(0, -1), correct: null })}
                            disabled={!st.built.length}
                          >
                            <Undo2 className="w-3.5 h-3.5 mr-1" /> Undo word
                          </Button>
                          {st.revealed && (
                            <p className="text-sm text-emerald-700 font-semibold">
                              Correct: {item.answer}
                            </p>
                          )}
                          {st.correct === false && (
                            <p className="text-sm text-muted-foreground">
                              🌱 Almost! Check the word order — read your sentence out loud and
                              listen for what sounds off.
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
                              <p className="font-semibold text-secondary-foreground mb-0.5">
                                Sample answer:
                              </p>
                              <p className="text-secondary-foreground/90">{item.sampleAnswer}</p>
                            </div>
                          )}
                        </div>
                      )}

                      {/* writing prompt */}
                      {item.kind === "writing" && (
                        <div className="space-y-2">
                          <textarea
                            value={st.value}
                            onChange={(e) => update(i, { value: e.target.value, correct: null, checked: false })}
                            placeholder="Let your ideas flow…"
                            aria-label={`Writing answer for question ${i + 1}`}
                            rows={4}
                            className="w-full rounded-xl border border-input bg-background px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                          />
                          <p className="text-xs text-muted-foreground">
                            {st.value.trim().split(/\s+/).filter(Boolean).length} words
                            {item.minWords ? ` · aim for ${item.minWords}+` : ""}
                          </p>
                          {st.revealed && (
                            <div className="rounded-xl bg-secondary p-3 text-sm">
                              <p className="font-semibold text-secondary-foreground mb-0.5">
                                Example to learn from:
                              </p>
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
                          <DoodlePad onChange={(hasInk) => update(i, { drewIt: hasInk })} />
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

          {/* Printable answer key */}
          <div className="hidden print:block mt-8 border-t-2 border-neutral-300 pt-4">
            <p className="font-bold text-lg mb-2">Answer Key (for teachers &amp; parents)</p>
            <ol className="space-y-1 text-sm">
              {answerKeyLines.map((line) => (
                <li key={line}>{line}</li>
              ))}
            </ol>
          </div>

          {/* On-screen answer key */}
          {keyVisible && (
            <div className="mt-6 rounded-2xl border-2 border-dashed border-primary/30 bg-secondary/30 p-4 no-print">
              <p className="font-bold mb-2 flex items-center gap-1.5">
                <KeyRound className="w-4 h-4" /> Answer key
              </p>
              <ol className="space-y-1 text-sm">
                {answerKeyLines.map((line) => (
                  <li key={line}>{line}</li>
                ))}
              </ol>
            </div>
          )}

          <div className="mt-6 flex flex-wrap items-center gap-3 no-print">
            <Button onClick={checkAll} className="rounded-full font-bold">
              <Check className="w-4 h-4 mr-1.5" /> Check my work
            </Button>
            <Button
              variant="outline"
              onClick={() => setStates((s) => s.map((st) => ({ ...st, revealed: true })))}
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
                  : `${rightCount}/${gradableCount} correct — mistakes are how we learn! 🌱`}
              </Badge>
            )}
          </div>
          <p className="text-xs text-muted-foreground mt-3 no-print">
            Tip: use “Print / Save PDF” to keep a paper copy — the answer key prints on its own
            page for a grown-up to check.
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
