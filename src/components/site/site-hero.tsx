"use client";

import { motion } from "framer-motion";
import { ShieldCheck, Target, TrendingUp } from "lucide-react";
import { Button } from "@/components/ui/button";

// ---------------------------------------------------------------------------
// Hero: headline, sub-line, CTAs (start free / guest), trust chips and a
// friendly illustration built from floating product-hint cards + emoji.
// ---------------------------------------------------------------------------

const TRUST_CHIPS = [
  { icon: Target, label: "Age-adaptive", tint: "text-amber-700 bg-amber-100" },
  { icon: ShieldCheck, label: "Safe for kids", tint: "text-emerald-700 bg-emerald-100" },
  { icon: TrendingUp, label: "Progress you can see", tint: "text-violet-700 bg-violet-100" },
];

function Float({
  children,
  delay = 0,
  className,
}: {
  children: React.ReactNode;
  delay?: number;
  className?: string;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.92 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5, delay, ease: "easeOut" }}
      className={className}
    >
      <motion.div
        animate={{ y: [0, -8, 0] }}
        transition={{ duration: 4.5, repeat: Infinity, ease: "easeInOut", delay }}
      >
        {children}
      </motion.div>
    </motion.div>
  );
}

export function SiteHero({
  onStart,
  onGuest,
  onLogin,
}: {
  onStart: () => void;
  onGuest: () => void;
  onLogin: () => void;
}) {
  return (
    <section id="home" aria-labelledby="hero-title" className="relative overflow-hidden">
      {/* Warm gradient blobs */}
      <div
        aria-hidden
        className="pointer-events-none absolute -top-32 -left-32 h-96 w-96 rounded-full bg-amber-200/50 blur-3xl"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute top-32 -right-32 h-96 w-96 rounded-full bg-rose-200/50 blur-3xl"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute -bottom-24 left-1/3 h-80 w-80 rounded-full bg-violet-200/40 blur-3xl"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute top-1/2 left-2/3 h-64 w-64 rounded-full bg-emerald-200/40 blur-3xl"
      />

      <div className="relative mx-auto grid max-w-6xl items-center gap-12 px-4 pt-12 pb-16 sm:px-6 sm:pt-16 sm:pb-24 lg:grid-cols-2">
        {/* Copy */}
        <div className="text-center lg:text-left">
          <img
            src="/logo.png"
            alt="BrightMinds logo"
            className="mx-auto mb-5 h-16 w-auto drop-shadow-sm lg:mx-0"
          />
          <p className="inline-flex items-center gap-1.5 rounded-full border border-amber-200 bg-amber-50 px-3 py-1 text-xs font-bold text-amber-800 sm:text-sm">
            <span aria-hidden>✨</span> Personalised learning for ages 6–15
          </p>
          <h1
            id="hero-title"
            className="font-display mt-4 text-4xl leading-tight font-bold tracking-tight text-neutral-900 sm:text-5xl lg:text-[3.4rem]"
          >
            Learning that fits{" "}
            <span className="bg-gradient-to-r from-amber-500 via-rose-500 to-violet-500 bg-clip-text text-transparent">
              your child
            </span>
            , not the other way round
          </h1>
          <p className="mx-auto mt-5 max-w-xl text-base text-neutral-600 sm:text-lg lg:mx-0">
            Mathematics, English, Science and Reading — taught at exactly the right
            level for ages 6–15, explained step by step, with progress parents and
            teachers can actually see.
          </p>

          <div className="mt-7 flex flex-col items-center gap-3 sm:flex-row sm:justify-center lg:justify-start">
            <Button
              onClick={onStart}
              className="h-12 w-full rounded-full bg-amber-500 px-7 text-base font-semibold text-white shadow-lg shadow-amber-500/25 hover:bg-amber-600 sm:w-auto"
            >
              Start free <span aria-hidden>→</span>
            </Button>
            <Button
              variant="outline"
              onClick={onGuest}
              className="h-12 w-full rounded-full border-neutral-300 px-6 text-base font-semibold text-neutral-700 hover:bg-neutral-50 sm:w-auto"
            >
              Explore as a guest <span aria-hidden>🎈</span>
            </Button>
          </div>
          <p className="mt-3 text-sm text-neutral-500">
            Already have an account?{" "}
            <button
              type="button"
              onClick={onLogin}
              className="font-semibold text-neutral-900 underline decoration-amber-400 decoration-2 underline-offset-2 hover:text-amber-700"
            >
              Log in
            </button>
          </p>

          <ul
            aria-label="Why families trust BrightMinds"
            className="mt-7 flex flex-wrap items-center justify-center gap-2 lg:justify-start"
          >
            {TRUST_CHIPS.map((chip) => (
              <li
                key={chip.label}
                className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-semibold sm:text-sm ${chip.tint}`}
              >
                <chip.icon className="h-4 w-4" aria-hidden />
                {chip.label}
              </li>
            ))}
          </ul>
        </div>

        {/* Friendly illustration: floating cards that mirror the real product */}
        <div
          aria-hidden
          className="relative mx-auto grid w-full max-w-md grid-cols-2 gap-4 sm:gap-5"
        >
          <Float delay={0.1} className="rotate-[-2deg]">
            <div className="rounded-3xl border border-neutral-200 bg-white p-4 shadow-lg shadow-rose-100">
              <p className="text-2xl">📐</p>
              <p className="mt-1 text-sm font-bold text-neutral-900">Strategy Lab</p>
              <p className="text-xs text-neutral-500">3 ways to solve 24 ÷ 6</p>
              <div className="mt-2 flex flex-wrap gap-1">
                {["Arrays", "Groups", "Times-table"].map((m) => (
                  <span
                    key={m}
                    className="rounded-full bg-rose-100 px-2 py-0.5 text-[10px] font-semibold text-rose-700"
                  >
                    {m}
                  </span>
                ))}
              </div>
            </div>
          </Float>

          <Float delay={0.35} className="mt-8 rotate-[2deg]">
            <div className="rounded-3xl border border-neutral-200 bg-white p-4 shadow-lg shadow-amber-100">
              <p className="text-2xl">🔥</p>
              <p className="mt-1 text-sm font-bold text-neutral-900">7-day streak</p>
              <p className="text-xs text-neutral-500">Alex is on a roll! 🦊</p>
            </div>
          </Float>

          <Float delay={0.55} className="-mt-2 rotate-[1.5deg]">
            <div className="rounded-3xl border border-neutral-200 bg-white p-4 shadow-lg shadow-violet-100">
              <p className="text-2xl">🧠</p>
              <p className="mt-1 text-sm font-bold text-neutral-900">Learning Helper</p>
              <p className="text-xs text-neutral-500">
                “Try splitting the middle term…” — hints, never the answer.
              </p>
            </div>
          </Float>

          <Float delay={0.8} className="mt-6 rotate-[-1.5deg]">
            <div className="rounded-3xl border border-neutral-200 bg-white p-4 shadow-lg shadow-emerald-100">
              <p className="text-2xl">📈</p>
              <p className="mt-1 text-sm font-bold text-neutral-900">Mia: 84% → 90%</p>
              <p className="text-xs text-neutral-500">Weekly summary sent to Dad</p>
            </div>
          </Float>

          <span className="absolute -top-4 right-6 hidden text-2xl sm:block">✏️</span>
          <span className="absolute top-1/2 -left-5 hidden text-2xl sm:block">🔬</span>
          <span className="absolute -right-4 bottom-2 hidden text-2xl sm:block">📖</span>
          <span className="absolute -bottom-5 left-1/4 hidden text-xl sm:block">✨</span>
        </div>
      </div>
    </section>
  );
}
