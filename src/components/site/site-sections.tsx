"use client";

import {
  ArrowRight,
  BookOpen,
  GraduationCap,
  HeartHandshake,
  LayoutDashboard,
  LifeBuoy,
  ListChecks,
  Printer,
  Search,
  Sparkles,
  Trophy,
  Type,
} from "lucide-react";
import { subjects } from "@/lib/content";
import { AGE_GROUPS, AGE_GROUP_ORDER } from "@/lib/learning-config";
import { Badge } from "@/components/ui/badge";
import { Reveal, SectionHeading } from "./shared";

// ---------------------------------------------------------------------------
// Marketing sections: About, How It Works, Subjects (real lesson counts from
// the content registry) and Features (all real product features).
// ---------------------------------------------------------------------------

/* ================================ ABOUT ================================ */

const GROUP_LINES: Record<string, string> = {
  early: "Playful foundations — learning feels like play.",
  primary: "Fun, adventure and growing confidence.",
  intermediate: "Focused skills and real-world thinking.",
  teen: "Exam-ready depth — calm, capable, prepared.",
};

export function AboutSection() {
  return (
    <section
      id="about"
      aria-labelledby="about-title"
      className="scroll-mt-20 border-t border-neutral-100 bg-neutral-50/60 py-16 sm:py-20"
    >
      <div className="mx-auto grid max-w-6xl items-center gap-10 px-4 sm:px-6 lg:grid-cols-2 lg:gap-16">
        <Reveal>
          <SectionHeading
            eyebrow="About BrightMinds"
            eyebrowClass="bg-amber-100 text-amber-800"
            title={<span id="about-title">One platform where the whole learning circle clicks</span>}
          />
          <div className="mt-5 space-y-4 text-base leading-relaxed text-neutral-600 sm:text-lg">
            <p>
              <strong className="font-semibold text-neutral-900">Our mission:</strong>{" "}
              every child deserves learning that fits them. BrightMinds brings
              children, teachers and parents into one connected space — so children
              learn with confidence, teachers teach with superpowers and nobody is
              left guessing how it&apos;s going.
            </p>
            <p>
              <strong className="font-semibold text-neutral-900">
                Same subject, the right level:
              </strong>{" "}
              a six-year-old meets fractions as pizza slices and games; a
              fourteen-year-old meets them as ratios and exam technique. Lessons,
              voice and challenges adapt across four stages — playful at 6–8, all the
              way to exam-focused at 14–15.
            </p>
            <p>
              <strong className="font-semibold text-neutral-900">Inclusive by design:</strong>{" "}
              gender never limits what a child can learn — rocket science, poetry,
              coding and cake-baking are for everyone. Themes and avatars are about
              personal style, never stereotypes.
            </p>
          </div>
        </Reveal>

        <Reveal delay={0.15}>
          <div className="space-y-3" aria-label="The four age stages">
            {AGE_GROUP_ORDER.map((g) => {
              const info = AGE_GROUPS[g];
              return (
                <div
                  key={g}
                  className="flex items-center gap-3 rounded-2xl border border-neutral-200 bg-white p-3.5 shadow-sm transition-shadow hover:shadow-md"
                >
                  <span
                    aria-hidden
                    className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-amber-100 text-xl"
                  >
                    {info.emoji}
                  </span>
                  <div className="min-w-0">
                    <p className="text-sm font-bold text-neutral-900 sm:text-base">
                      {info.label}{" "}
                      <span className="font-medium text-neutral-400">· {info.range}</span>
                    </p>
                    <p className="truncate text-xs text-neutral-500 sm:text-sm">
                      {GROUP_LINES[g]}
                    </p>
                  </div>
                </div>
              );
            })}
            <p className="pt-1 text-center text-xs text-neutral-400 lg:text-left">
              Four stages · 108 complete lessons · every subject covered at every age
            </p>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

/* ============================= HOW IT WORKS ============================= */

const STEPS = [
  {
    emoji: "🧒",
    icon: BookOpen,
    tint: "bg-rose-100 text-rose-700",
    title: "Child learns & practises",
    body: "Lessons, quizzes, worksheets and the Strategy Lab — several ways to solve, never just the answer.",
  },
  {
    emoji: "🍎",
    icon: GraduationCap,
    tint: "bg-amber-100 text-amber-700",
    title: "Teacher assigns & differentiates",
    body: "Classrooms and small groups, with assignments matched to each learner's level and needs.",
  },
  {
    emoji: "☁️",
    icon: Sparkles,
    tint: "bg-emerald-100 text-emerald-700",
    title: "Progress is recorded",
    body: "Scores, streaks and learning minutes are tracked automatically — no marking pile, no guesswork.",
  },
  {
    emoji: "👨‍👩‍👧",
    icon: HeartHandshake,
    tint: "bg-violet-100 text-violet-700",
    title: "Parent sees progress & tips",
    body: "A clear dashboard with weekly summaries, goals and gentle recommendations for what comes next.",
  },
];

export function HowItWorksSection() {
  return (
    <section
      id="how-it-works"
      aria-labelledby="how-title"
      className="scroll-mt-20 py-16 sm:py-20"
    >
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <Reveal>
          <SectionHeading
            center
            eyebrow="How It Works"
            eyebrowClass="bg-emerald-100 text-emerald-800"
            title={<span id="how-title">One connected ecosystem, four simple steps</span>}
            description="Everything syncs automatically between your child, their teacher and you."
          />
        </Reveal>

        <ol className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4 lg:gap-6">
          {STEPS.map((step, i) => (
            <li key={step.title} className="relative">
              <Reveal delay={i * 0.1}>
                <div className="h-full rounded-3xl border border-neutral-200 bg-white p-6 shadow-sm transition-shadow hover:shadow-md">
                  <div className="flex items-center justify-between">
                    <span
                      aria-hidden
                      className={`flex h-11 w-11 items-center justify-center rounded-2xl ${step.tint}`}
                    >
                      <step.icon className="h-5 w-5" aria-hidden />
                    </span>
                    <span
                      aria-hidden
                      className="font-display text-3xl font-bold text-neutral-200"
                    >
                      {i + 1}
                    </span>
                  </div>
                  <p className="mt-4 text-base font-bold text-neutral-900">
                    <span aria-hidden className="mr-1.5">{step.emoji}</span>
                    {step.title}
                  </p>
                  <p className="mt-2 text-sm leading-relaxed text-neutral-600">{step.body}</p>
                </div>
              </Reveal>
              {i < STEPS.length - 1 && (
                <span
                  aria-hidden
                  className="absolute top-1/2 -right-4 z-10 hidden -translate-y-1/2 lg:block"
                >
                  <span className="flex h-8 w-8 items-center justify-center rounded-full border border-neutral-200 bg-white shadow-sm">
                    <ArrowRight className="h-4 w-4 text-amber-500" aria-hidden />
                  </span>
                </span>
              )}
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}

/* =============================== SUBJECTS =============================== */

/** One-line pitches per subject (marketing copy alongside real counts). */
const SUBJECT_PITCHES: Record<string, string> = {
  math: "Counting games to algebra mastery — every tough problem solved several different ways.",
  english: "Grammar, storytelling and confident writing, tuned to each age and stage.",
  science: "Hands-on experiments and big ideas, from mini-beasts to Newton's laws.",
  reading: "Real stories and passages, with questions that build deep understanding.",
};

const SUBJECT_BUBBLES: Record<string, string> = {
  math: "bg-amber-100",
  english: "bg-rose-100",
  science: "bg-emerald-100",
  reading: "bg-violet-100",
};

export function SubjectsSection() {
  return (
    <section
      id="subjects"
      aria-labelledby="subjects-title"
      className="scroll-mt-20 border-y border-neutral-100 bg-neutral-50/60 py-16 sm:py-20"
    >
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <Reveal>
          <SectionHeading
            center
            eyebrow="Subjects"
            eyebrowClass="bg-violet-100 text-violet-800"
            title={<span id="subjects-title">Four subjects, every age, real lessons</span>}
            description="Live from our lesson library — the counts below are the actual lessons waiting inside."
          />
        </Reveal>

        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:gap-6">
          {subjects.map((subject, i) => {
            const total = AGE_GROUP_ORDER.reduce(
              (n, g) => n + subject.lessons[g].length,
              0
            );
            return (
              <Reveal key={subject.id} delay={i * 0.08}>
                <article className="flex h-full flex-col rounded-3xl border border-neutral-200 bg-white p-6 shadow-sm transition-shadow hover:shadow-md">
                  <div className="flex items-center gap-3">
                    <span
                      aria-hidden
                      className={`flex h-14 w-14 items-center justify-center rounded-2xl text-3xl ${SUBJECT_BUBBLES[subject.id] ?? "bg-neutral-100"}`}
                    >
                      {subject.emoji}
                    </span>
                    <div className="min-w-0 flex-1">
                      <h3 className="font-display text-xl font-bold text-neutral-900">
                        {subject.name}
                      </h3>
                      <Badge
                        variant="secondary"
                        className="mt-0.5 rounded-full bg-neutral-100 text-neutral-600"
                      >
                        {total} lessons in total
                      </Badge>
                    </div>
                  </div>

                  <p className="mt-3 text-sm leading-relaxed text-neutral-600">
                    {SUBJECT_PITCHES[subject.id] ?? subject.taglines.primary}
                  </p>

                  {/* Real per-age lesson counts from the content registry */}
                  <div
                    className="mt-4 grid grid-cols-2 gap-2"
                    aria-label={`${subject.name} lesson counts by age`}
                  >
                    {AGE_GROUP_ORDER.map((g) => {
                      const info = AGE_GROUPS[g];
                      const n = subject.lessons[g].length;
                      return (
                        <div
                          key={g}
                          className="flex items-center justify-between rounded-xl bg-neutral-100/70 px-3 py-2"
                        >
                          <span className="text-xs font-medium text-neutral-600">
                            <span aria-hidden className="mr-1">{info.emoji}</span>
                            {info.range}
                          </span>
                          <span className="text-xs font-bold text-neutral-900">
                            {n} {n === 1 ? "lesson" : "lessons"}
                          </span>
                        </div>
                      );
                    })}
                  </div>
                </article>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}

/* =============================== FEATURES =============================== */

const FEATURES = [
  {
    icon: Sparkles,
    tint: "bg-rose-100 text-rose-700",
    title: "Strategy Lab",
    body: "Tough problems solved 2–4 genuinely different ways — children pick the method that clicks.",
  },
  {
    icon: Printer,
    tint: "bg-amber-100 text-amber-700",
    title: "Worksheets with answer keys",
    body: "Generate a worksheet on any topic, print it or save it as PDF — full answer key included.",
  },
  {
    icon: ListChecks,
    tint: "bg-emerald-100 text-emerald-700",
    title: "Quizzes that explain mistakes",
    body: "Wrong answers come with a kind explanation of the usual mix-up, never just a red ✗.",
  },
  {
    icon: Trophy,
    tint: "bg-violet-100 text-violet-700",
    title: "Achievements & streaks",
    body: "Badges, XP and daily streaks keep motivation going — celebrating effort, not just scores.",
  },
  {
    icon: Search,
    tint: "bg-amber-100 text-amber-700",
    title: "Age-aware search",
    body: "One search box across lessons, worksheets and vocabulary — always matched to the child's level.",
  },
  {
    icon: Type,
    tint: "bg-rose-100 text-rose-700",
    title: "Adjustable text size",
    body: "Comfortable reading for every child, changed in one tap and remembered.",
  },
  {
    icon: LifeBuoy,
    tint: "bg-violet-100 text-violet-700",
    title: "Learning Helper",
    body: "Guided hints that nudge thinking in the right direction — it never gives the answer away.",
  },
  {
    icon: LayoutDashboard,
    tint: "bg-emerald-100 text-emerald-700",
    title: "Parent & teacher dashboards",
    body: "Progress, groups and printable reports — each adult sees exactly what they need, nothing more.",
  },
];

export function FeaturesSection() {
  return (
    <section
      id="features"
      aria-labelledby="features-title"
      className="scroll-mt-20 py-16 sm:py-20"
    >
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <Reveal>
          <SectionHeading
            center
            eyebrow="Features"
            eyebrowClass="bg-rose-100 text-rose-800"
            title={<span id="features-title">Real tools, not toy features</span>}
            description="Everything below ships today — try it the moment you sign in."
          />
        </Reveal>

        <ul className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {FEATURES.map((feature, i) => (
            <li key={feature.title}>
              <Reveal delay={(i % 4) * 0.07} className="h-full">
                <div className="h-full rounded-3xl border border-neutral-200 bg-white p-5 shadow-sm transition-shadow hover:shadow-md">
                  <span
                    aria-hidden
                    className={`flex h-10 w-10 items-center justify-center rounded-2xl ${feature.tint}`}
                  >
                    <feature.icon className="h-5 w-5" aria-hidden />
                  </span>
                  <h3 className="mt-3 text-sm font-bold text-neutral-900 sm:text-base">
                    {feature.title}
                  </h3>
                  <p className="mt-1.5 text-xs leading-relaxed text-neutral-600 sm:text-sm">
                    {feature.body}
                  </p>
                </div>
              </Reveal>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
