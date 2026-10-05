import type { AgeGroup, ThemePref } from "@/lib/content/types";

export interface AgeGroupInfo {
  id: AgeGroup;
  label: string;
  range: string;
  min: number;
  max: number;
  tagline: string;
  emoji: string;
  /** How the UI should feel for this group. */
  vibe: "playful" | "fun" | "clean" | "sleek";
}

export const AGE_GROUPS: Record<AgeGroup, AgeGroupInfo> = {
  early: {
    id: "early",
    label: "Early Learning",
    range: "Ages 6–8",
    min: 6,
    max: 8,
    tagline: "Big fun, easy words, and lots of high-fives!",
    emoji: "🌱",
    vibe: "playful",
  },
  primary: {
    id: "primary",
    label: "Primary Learning",
    range: "Ages 9–11",
    min: 9,
    max: 11,
    tagline: "Level up your skills with games and challenges!",
    emoji: "🚀",
    vibe: "fun",
  },
  intermediate: {
    id: "intermediate",
    label: "Intermediate Learning",
    range: "Ages 12–13",
    min: 12,
    max: 13,
    tagline: "Real-world smarts, trickier puzzles, bigger ideas.",
    emoji: "⚡",
    vibe: "clean",
  },
  teen: {
    id: "teen",
    label: "Advanced Learning",
    range: "Ages 14–15",
    min: 14,
    max: 15,
    tagline: "Deep dives and skills that prep you for what's next.",
    emoji: "🎯",
    vibe: "sleek",
  },
};

export const AGE_GROUP_ORDER: AgeGroup[] = [
  "early",
  "primary",
  "intermediate",
  "teen",
];

export function ageToGroup(age: number): AgeGroup {
  if (age <= 8) return "early";
  if (age <= 11) return "primary";
  if (age <= 13) return "intermediate";
  return "teen";
}

export interface ThemeInfo {
  id: ThemePref;
  label: string;
  description: string;
  emoji: string;
  swatch: string[];
}

export const THEMES: ThemeInfo[] = [
  {
    id: "pink",
    label: "Pink Sparkle",
    description: "A bright, rosy world of color",
    emoji: "🌸",
    swatch: ["#f472b6", "#fb7185", "#fbcfe8"],
  },
  {
    id: "blue",
    label: "Blue Sky",
    description: "Cool, calm and adventurous",
    emoji: "🚀",
    swatch: ["#60a5fa", "#3b82f6", "#bfdbfe"],
  },
  {
    id: "neutral",
    label: "Balanced",
    description: "A fresh, nature-inspired mix",
    emoji: "🌈",
    swatch: ["#2dd4bf", "#34d399", "#a7f3d0"],
  },
];

/** Per-group copy + presentation knobs used across the UI. */
export const groupStyle: Record<
  AgeGroup,
  {
    greeting: (name: string) => string;
    cta: string;
    quizNudge: string;
    sectionWord: string;
    cardRadius: string;
    titleSize: string;
    showMascotEverywhere: boolean;
  }
> = {
  early: {
    greeting: (n) => `Hi ${n}! 👋 Ready for a fun day?`,
    cta: "Let's go!",
    quizNudge: "Time for a mini quiz! You've got this! 💪",
    sectionWord: "Part",
    cardRadius: "rounded-3xl",
    titleSize: "text-4xl sm:text-5xl",
    showMascotEverywhere: true,
  },
  primary: {
    greeting: (n) => `Welcome back, ${n}! 🚀`,
    cta: "Start learning",
    quizNudge: "Ready to beat this quiz? 🏅",
    sectionWord: "Step",
    cardRadius: "rounded-2xl",
    titleSize: "text-3xl sm:text-4xl",
    showMascotEverywhere: true,
  },
  intermediate: {
    greeting: (n) => `Good to see you, ${n}.`,
    cta: "Continue",
    quizNudge: "Take the challenge →",
    sectionWord: "Section",
    cardRadius: "rounded-xl",
    titleSize: "text-3xl sm:text-4xl",
    showMascotEverywhere: false,
  },
  teen: {
    greeting: (n) => `Welcome back, ${n}.`,
    cta: "Resume",
    quizNudge: "Test yourself →",
    sectionWord: "Section",
    cardRadius: "rounded-xl",
    titleSize: "text-3xl sm:text-4xl",
    showMascotEverywhere: false,
  },
};
