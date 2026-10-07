"use client";

import { Check, FileText, GraduationCap, HeartHandshake, ShieldCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Reveal, SectionHeading } from "./shared";

// ---------------------------------------------------------------------------
// "For Parents" and "For Teachers" sections with role CTAs.
// ---------------------------------------------------------------------------

const PARENT_BULLETS = [
  "A clear overview of each child's progress across all four subjects",
  "Weekly learning time at a glance — who's learning, when and for how long",
  "Personalised recommendations for what to practise next",
  "Set goals: daily minutes and weekly lesson targets",
  "Gentle notifications when something needs attention",
  "Add and manage multiple children under one account",
  "Print or save progress reports as PDF for school meetings",
  "Private by design: parents only ever see their own children",
];

const TEACHER_BULLETS = [
  "Create classrooms and organise students into ability groups",
  "Assign differentiated work by age level and difficulty",
  "Content creator: build your own lessons and worksheets",
  "Reading intervention with dedicated passage-based lessons",
  "Teacher Helper drafts assignments, hints and feedback for you",
  "Printable reports and answer keys for every worksheet",
  "Class analytics: completion rates, scores and learning minutes",
];

function AudienceBullets({ bullets, tone }: { bullets: string[]; tone: string }) {
  return (
    <ul className="mt-6 space-y-3">
      {bullets.map((bullet) => (
        <li key={bullet} className="flex items-start gap-3">
          <span
            aria-hidden
            className={`mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full ${tone}`}
          >
            <Check className="h-3.5 w-3.5" aria-hidden />
          </span>
          <span className="text-sm leading-relaxed text-neutral-600 sm:text-base">
            {bullet}
          </span>
        </li>
      ))}
    </ul>
  );
}

export function ParentsSection({ onSignup }: { onSignup: () => void }) {
  return (
    <section
      id="parents"
      aria-labelledby="parents-title"
      className="scroll-mt-20 border-y border-neutral-100 bg-neutral-50/60 py-16 sm:py-20"
    >
      <div className="mx-auto grid max-w-6xl items-center gap-10 px-4 sm:px-6 lg:grid-cols-[1fr_340px]">
        <Reveal>
          <SectionHeading
            eyebrow="For Parents"
            eyebrowClass="bg-amber-100 text-amber-800"
            title={<span id="parents-title">Know exactly how your child is doing</span>}
            description="No dashboards to decode, no jargon — just a warm, honest picture of your child's learning."
          />
          <AudienceBullets bullets={PARENT_BULLETS} tone="bg-amber-100 text-amber-700" />
        </Reveal>

        <Reveal delay={0.15}>
          <div className="rounded-3xl border border-amber-200 bg-gradient-to-br from-amber-50 to-rose-50 p-6 shadow-sm sm:p-8">
            <span
              aria-hidden
              className="flex h-12 w-12 items-center justify-center rounded-2xl bg-amber-100 text-amber-700"
            >
              <HeartHandshake className="h-6 w-6" aria-hidden />
            </span>
            <h3 className="font-display mt-4 text-xl font-bold text-neutral-900">
              Start your family&apos;s journey
            </h3>
            <p className="mt-2 text-sm leading-relaxed text-neutral-600">
              Create a free parent account, add your children with their own login
              codes, and see their first progress within minutes.
            </p>
            <Button
              onClick={onSignup}
              className="mt-5 w-full rounded-full bg-amber-500 font-semibold text-white shadow-sm hover:bg-amber-600"
            >
              Create a parent account
            </Button>
            <p className="mt-3 flex items-center justify-center gap-1.5 text-center text-xs text-neutral-500">
              <ShieldCheck className="h-3.5 w-3.5" aria-hidden />
              Free to try · no card needed
            </p>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

export function TeachersSection({ onSignup }: { onSignup: () => void }) {
  return (
    <section
      id="teachers"
      aria-labelledby="teachers-title"
      className="scroll-mt-20 py-16 sm:py-20"
    >
      <div className="mx-auto grid max-w-6xl items-center gap-10 px-4 sm:px-6 lg:grid-cols-[1fr_340px]">
        <Reveal>
          <SectionHeading
            eyebrow="For Teachers"
            eyebrowClass="bg-emerald-100 text-emerald-800"
            title={<span id="teachers-title">Differentiate in minutes, not evenings</span>}
            description="Assign the right work to the right child automatically — and let the marking mark itself."
          />
          <AudienceBullets bullets={TEACHER_BULLETS} tone="bg-emerald-100 text-emerald-700" />
        </Reveal>

        <Reveal delay={0.15}>
          <div className="rounded-3xl border border-emerald-200 bg-gradient-to-br from-emerald-50 to-teal-50 p-6 shadow-sm sm:p-8">
            <span
              aria-hidden
              className="flex h-12 w-12 items-center justify-center rounded-2xl bg-emerald-100 text-emerald-700"
            >
              <GraduationCap className="h-6 w-6" aria-hidden />
            </span>
            <h3 className="font-display mt-4 text-xl font-bold text-neutral-900">
              Bring your classroom online
            </h3>
            <p className="mt-2 text-sm leading-relaxed text-neutral-600">
              Set up a classroom, hand out login codes, and every student gets a
              personalised path — with reports ready for parents&apos; evening.
            </p>
            <Button
              onClick={onSignup}
              className="mt-5 w-full rounded-full bg-emerald-600 font-semibold text-white shadow-sm hover:bg-emerald-700"
            >
              Create a teacher account
            </Button>
            <p className="mt-3 flex items-center justify-center gap-1.5 text-center text-xs text-neutral-500">
              <FileText className="h-3.5 w-3.5" aria-hidden />
              Works alongside your existing plans
            </p>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
