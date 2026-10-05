"use client";

import type { MouseEvent, ReactNode } from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

// ---------------------------------------------------------------------------
// Shared building blocks for the public marketing site: nav model, smooth
// anchor scrolling, entrance animations and the section heading pattern.
// ---------------------------------------------------------------------------

export const NAV_LINKS = [
  { id: "home", label: "Home" },
  { id: "about", label: "About" },
  { id: "how-it-works", label: "How It Works" },
  { id: "subjects", label: "Subjects" },
  { id: "features", label: "Features" },
  { id: "parents", label: "For Parents" },
  { id: "teachers", label: "For Teachers" },
] as const;

/** Smoothly scroll to a section by its element id. */
export function scrollToSection(id: string) {
  if (id === "home") {
    window.scrollTo({ top: 0, behavior: "smooth" });
    return;
  }
  document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
}

/** Anchor click handler that keeps the href semantics but scrolls smoothly. */
export function navClick(id: string) {
  return (e: MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    scrollToSection(id);
  };
}

/** Framer-motion entrance animation used across all sections. */
export function Reveal({
  children,
  delay = 0,
  y = 24,
  className,
}: {
  children: ReactNode;
  delay?: number;
  y?: number;
  className?: string;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.55, delay, ease: "easeOut" }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

/** Consistent eyebrow-chip + title + description heading for each section. */
export function SectionHeading({
  eyebrow,
  eyebrowClass,
  title,
  description,
  center = false,
}: {
  eyebrow: string;
  eyebrowClass?: string;
  title: ReactNode;
  description?: string;
  center?: boolean;
}) {
  return (
    <div className={cn("max-w-2xl", center && "mx-auto text-center")}>
      <span
        className={cn(
          "inline-flex items-center rounded-full px-3 py-1 text-xs font-bold tracking-wide uppercase",
          eyebrowClass ?? "bg-amber-100 text-amber-800"
        )}
      >
        {eyebrow}
      </span>
      <h2 className="font-display mt-3 text-3xl font-bold tracking-tight text-neutral-900 sm:text-4xl">
        {title}
      </h2>
      {description && (
        <p className="mt-3 text-base text-neutral-600 sm:text-lg">{description}</p>
      )}
    </div>
  );
}
