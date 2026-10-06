"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { ArrowLeft, ArrowRight, Check, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { TOUR_STEPS, type TourRole, type TourStep } from "@/lib/tour-content";
import { cn } from "@/lib/utils";

export const TOUR_DONE_PREFIX = "bm-tour-done-";

function tourKey(userId: string): string {
  return `${TOUR_DONE_PREFIX}${userId}`;
}

/** Forget that this user finished the tour — it will play again next mount. */
export function resetTour(userId: string): void {
  try {
    localStorage.removeItem(tourKey(userId));
  } catch {
    /* private mode — nothing to reset */
  }
}

function markDone(userId: string): void {
  try {
    localStorage.setItem(tourKey(userId), "1");
  } catch {
    /* private mode — tour will just show again */
  }
}

interface Rect {
  top: number;
  left: number;
  width: number;
  height: number;
}

const PAD = 8; // breathing room around the highlighted element
const CARD_W = 330;

/**
 * Spotlight guided tour for one role. Dims the page, highlights each
 * `[data-tour="…"]` element in order and shows a friendly card.
 * Steps whose element is missing (section not rendered) are skipped
 * gracefully. Plays automatically once per user (localStorage).
 */
export function GuidedTour({ role, userId }: { role: TourRole; userId: string }) {
  const steps = TOUR_STEPS[role];

  const [active, setActive] = useState(false);
  const [available, setAvailable] = useState<TourStep[]>([]);
  const [stepIdx, setStepIdx] = useState(0);
  const [rect, setRect] = useState<Rect | null>(null);
  const [cardH, setCardH] = useState(190);

  const cardRef = useRef<HTMLDivElement>(null);
  const measureRaf = useRef<number>(0);

  const step = available[stepIdx];

  // ---- Auto-start once per user -------------------------------------------
  useEffect(() => {
    if (!userId) return;
    let done = false;
    try {
      done = localStorage.getItem(tourKey(userId)) === "1";
    } catch {
      /* ignore */
    }
    if (done) return;
    // Give the shell a moment to paint, then resolve which steps exist in the
    // DOM. Sections without their data-tour element are skipped; if nothing is
    // highlightable the tour simply doesn't open (and won't be marked done).
    const t = setTimeout(() => {
      const present = steps.filter(
        (s) => document.querySelector(`[data-tour="${s.selector}"]`) !== null
      );
      if (present.length === 0) return;
      setAvailable(present);
      setStepIdx(0);
      setActive(true);
    }, 800);
    return () => clearTimeout(t);
  }, [userId, steps]);

  // ---- Measure the highlighted element -------------------------------------
  const measure = useCallback(() => {
    if (!step) return;
    const el = document.querySelector<HTMLElement>(`[data-tour="${step.selector}"]`);
    if (!el) return;
    const r = el.getBoundingClientRect();
    if (r.width === 0 && r.height === 0) return;
    setRect({ top: r.top, left: r.left, width: r.width, height: r.height });
  }, [step]);

  useEffect(() => {
    if (!active || !step) return;
    const el = document.querySelector<HTMLElement>(`[data-tour="${step.selector}"]`);
    if (!el) return;

    // Bring the target into view, then measure (smooth scroll takes a beat).
    el.scrollIntoView({ behavior: "smooth", block: "center" });
    const t1 = setTimeout(measure, 350);
    const t2 = setTimeout(measure, 800);

    const onScroll = () => {
      cancelAnimationFrame(measureRaf.current);
      measureRaf.current = requestAnimationFrame(measure);
    };
    window.addEventListener("resize", onScroll);
    window.addEventListener("scroll", onScroll, true);

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      cancelAnimationFrame(measureRaf.current);
      window.removeEventListener("resize", onScroll);
      window.removeEventListener("scroll", onScroll, true);
    };
  }, [active, step, measure]);

  // ---- Keep the popover card measured too ----------------------------------
  useEffect(() => {
    const raf = requestAnimationFrame(() => {
      if (cardRef.current) setCardH(cardRef.current.offsetHeight || 190);
    });
    return () => cancelAnimationFrame(raf);
  }, [step, rect]);

  function finish() {
    markDone(userId);
    setActive(false);
    setRect(null);
  }

  function go(delta: 1 | -1) {
    setStepIdx((i) => {
      const nextIdx = i + delta;
      if (nextIdx >= available.length) {
        finish();
        return i;
      }
      return Math.max(0, nextIdx);
    });
  }
  function next() {
    go(1);
  }
  function back() {
    go(-1);
  }

  // ---- Keyboard shortcuts ---------------------------------------------------
  useEffect(() => {
    if (!active) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") finish();
      if (e.key === "ArrowRight") next();
      if (e.key === "ArrowLeft") back();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [active, stepIdx, available]);

  if (!active || !step || !rect) return null;

  // ---- Popover geometry (clamped to the viewport) --------------------------
  const vw = typeof window !== "undefined" ? window.innerWidth : 1024;
  const vh = typeof window !== "undefined" ? window.innerHeight : 768;
  const cardW = Math.min(CARD_W, vw - 24);
  const gap = 12;

  const hl = {
    top: Math.max(0, rect.top - PAD),
    left: Math.max(0, rect.left - PAD),
    width: rect.width + PAD * 2,
    height: rect.height + PAD * 2,
  };

  let cardTop =
    step.position === "top" ? hl.top - cardH - gap : hl.top + hl.height + gap;
  // Flip if the preferred side overflows.
  if (cardTop + cardH > vh - 8) {
    const flipped = hl.top - cardH - gap;
    cardTop = flipped >= 8 ? flipped : Math.max(8, Math.min(cardTop, vh - cardH - 8));
  }
  const cardLeft = Math.max(
    12,
    Math.min(hl.left + hl.width / 2 - cardW / 2, vw - cardW - 12)
  );

  return (
    <div className="print:hidden" role="dialog" aria-modal="true" aria-label={step.title}>
      {/* Spotlight cut-out: the hole is transparent, everything else is dimmed */}
      <div
        aria-hidden="true"
        className="pointer-events-none fixed z-[95] rounded-2xl transition-all duration-300"
        style={{
          top: hl.top,
          left: hl.left,
          width: hl.width,
          height: hl.height,
          boxShadow: "0 0 0 200vmax rgba(20, 16, 12, 0.6)",
          outline: "3px solid var(--primary)",
          outlineOffset: "3px",
        }}
      />

      {/* Popover card */}
      <div
        ref={cardRef}
        className="bg-card fixed z-[96] w-[330px] max-w-[calc(100vw-24px)] rounded-2xl border p-4 shadow-2xl transition-all duration-300"
        style={{ top: cardTop, left: cardLeft }}
      >
        <div className="mb-1 flex items-start justify-between gap-2">
          <p className="text-primary text-xs font-bold tracking-wide uppercase">
            Step {stepIdx + 1} of {available.length}
          </p>
          <button
            type="button"
            onClick={finish}
            aria-label="Skip tour"
            className="text-muted-foreground hover:text-foreground -mt-1 -mr-1 flex h-9 w-9 items-center justify-center rounded-full"
          >
            <X className="h-4 w-4" aria-hidden="true" />
          </button>
        </div>
        <h3 className="font-display text-lg font-semibold">{step.title}</h3>
        <p className="text-muted-foreground mt-1 text-sm leading-relaxed">{step.text}</p>

        <div className="mt-3 flex items-center justify-between gap-2">
          <div className="flex gap-1.5" aria-hidden="true">
            {available.map((_, i) => (
              <span
                key={i}
                className={cn(
                  "h-1.5 rounded-full transition-all",
                  i === stepIdx ? "bg-primary w-5" : "bg-muted-foreground/30 w-1.5"
                )}
              />
            ))}
          </div>
          <div className="flex items-center gap-2">
            {stepIdx > 0 && (
              <Button variant="outline" size="sm" onClick={back} className="min-h-11 rounded-full px-3">
                <ArrowLeft className="h-4 w-4" aria-hidden="true" />
                Back
              </Button>
            )}
            {stepIdx < available.length - 1 ? (
              <Button size="sm" onClick={next} className="min-h-11 rounded-full px-4">
                Next
                <ArrowRight className="ml-1 h-4 w-4" aria-hidden="true" />
              </Button>
            ) : (
              <Button size="sm" onClick={finish} className="min-h-11 rounded-full px-4">
                <Check className="mr-1 h-4 w-4" aria-hidden="true" />
                Done
              </Button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
