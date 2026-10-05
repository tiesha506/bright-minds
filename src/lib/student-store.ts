"use client";

import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import { ageToGroup } from "@/lib/learning-config";
import { getLesson } from "@/lib/content";
import type { AgeGroup, ThemePref } from "@/lib/content/types";

export interface StudentProfile {
  /** Client-generated id (uuid) used as the DB key. */
  id: string;
  name: string;
  age: number;
  theme: ThemePref;
  ageGroup: AgeGroup;
  /** Emoji avatar chosen by the student (see shared/avatar). */
  avatar?: string;
  /** Avatar bubble colour key. */
  avatarColor?: string;
  /** Accessibility: preferred base text size. */
  textSize?: TextSize;
}

export type TextSize = "small" | "medium" | "large";

export const TEXT_SIZE_PX: Record<TextSize, string> = {
  small: "14.5px",
  medium: "16px",
  large: "18.5px",
};

/** Local (not UTC) YYYY-MM-DD — streaks should follow the student's day. */
export function localDate(d = new Date()): string {
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(
    d.getDate()
  ).padStart(2, "0")}`;
}

export interface LessonProgress {
  subjectId: string;
  lessonId: string;
  /** Best quiz score in percent (null if only read so far). */
  score: number | null;
  completedAt: string;
}

export interface DailyChallengeState {
  date: string;
  done: boolean;
}

interface StudentState {
  profile: StudentProfile | null;
  xp: number;
  progress: Record<string, LessonProgress>;
  dailyChallenge: DailyChallengeState | null;
  /** Consecutive-day learning streak (local days). */
  streak: number;
  /** Last local day the student was active (YYYY-MM-DD). */
  lastActiveDate: string | null;
  /** Recent active days, newest last, capped at 30. */
  activeDates: string[];
  /** Worksheet sets completed (lesson ids or generated sheet keys). */
  worksheetsDone: string[];
  setProfile: (p: StudentProfile) => void;
  hydrateFromServer: (
    p: StudentProfile,
    rows: { subjectId: string; lessonId: string; score: number | null; completedAt: string }[],
    serverXp?: number
  ) => void;
  updateProfile: (p: Partial<Omit<StudentProfile, "id">>) => void;
  markLessonRead: (subjectId: string, lessonId: string) => void;
  saveQuizScore: (subjectId: string, lessonId: string, score: number) => void;
  claimDailyChallenge: () => void;
  /** Called on app activity: keeps the daily streak alive. */
  touchStreak: () => void;
  markWorksheetDone: (key: string) => void;
  setTextSize: (t: TextSize) => void;
  /** Award XP outside lessons (mixed challenges, practice zone...). */
  addXp: (n: number) => void;
  startFresh: () => void;
}

// ------------------------------- XP rules ---------------------------------
export const XP = {
  readLesson: 10,
  dailyChallenge: 5,
  quizBase: 15,
  /** +1 XP per 10% quiz score above a retry's previous best is capped by max(). */
  quizBonus: (scorePercent: number) => Math.round(scorePercent / 10),
} as const;

export function levelFromXp(xp: number) {
  const level = Math.floor(xp / 100) + 1;
  const intoLevel = xp % 100;
  return { level, intoLevel, nextAt: 100 };
}

function syncProfile(p: StudentProfile, xp: number, worksheetsDone?: number) {
  // Best-effort server sync; localStorage remains the source of truth.
  fetch("/api/students", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ ...p, xp, worksheetsDone }),
  }).catch(() => undefined);
}

/** Fire-and-forget activity log (drives parent/teacher "time spent learning"). */
function logActivity(studentId: string, subjectId: string, minutes: number) {
  if (minutes <= 0) return;
  fetch("/api/activity", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ studentId, subjectId, minutes, day: localDate() }),
  }).catch(() => undefined);
}

function syncProgress(
  studentId: string,
  entry: LessonProgress,
  xp: number
) {
  fetch("/api/progress", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ studentId, xp, ...entry }),
  }).catch(() => undefined);
}

export const useStudentStore = create<StudentState>()(
  persist(
    (set, get) => ({
      profile: null,
      xp: 0,
      progress: {},
      dailyChallenge: null,
      streak: 0,
      lastActiveDate: null,
      activeDates: [],
      worksheetsDone: [],

      touchStreak: () => {
        const state = get();
        const today = localDate();
        if (state.lastActiveDate === today) return;
        const yesterday = localDate(new Date(Date.now() - 86400000));
        const streak =
          state.lastActiveDate === yesterday ? state.streak + 1 : 1;
        const activeDates = [...state.activeDates.filter((d) => d !== today), today].slice(-30);
        set({ streak, lastActiveDate: today, activeDates });
        if (state.profile) syncProfile(state.profile, state.xp);
      },

      markWorksheetDone: (key) => {
        const state = get();
        if (state.worksheetsDone.includes(key)) return;
        const worksheetsDone = [...state.worksheetsDone, key].slice(-200);
        set({ worksheetsDone });
        if (state.profile)
          syncProfile(state.profile, state.xp, worksheetsDone.length);
      },

      setTextSize: (t) => {
        const state = get();
        if (!state.profile) return;
        const next = { ...state.profile, textSize: t };
        set({ profile: next });
        syncProfile(next, state.xp);
      },

      addXp: (n) => {
        const state = get();
        if (n <= 0) return;
        const xp = state.xp + n;
        set({ xp });
        if (state.profile) syncProfile(state.profile, xp);
      },

      setProfile: (p) => {
        set({ profile: p });
        syncProfile(p, get().xp);
      },

      /** Used when a child signs in with a code: adopt the server profile and
       *  merge server-side progress into the local state (best score wins). */
      hydrateFromServer: (
        p: StudentProfile,
        rows: { subjectId: string; lessonId: string; score: number | null; completedAt: string }[],
        serverXp?: number
      ) => {
        const local = get().progress;
        const merged: Record<string, LessonProgress> = { ...local };
        for (const row of rows) {
          const existing = merged[row.lessonId];
          const rowScore = row.score ?? -1;
          const localScore = existing?.score ?? -1;
          if (!existing || rowScore > localScore) {
            merged[row.lessonId] = {
              subjectId: row.subjectId,
              lessonId: row.lessonId,
              score: row.score,
              completedAt: row.completedAt,
            };
          }
        }
        const xp = Math.max(get().xp, serverXp ?? 0);
        set({ profile: p, progress: merged, xp });
        syncProfile(p, xp);
      },

      updateProfile: (partial) => {
        const current = get().profile;
        if (!current) return;
        const next: StudentProfile = {
          ...current,
          ...partial,
          ageGroup:
            partial.age !== undefined
              ? ageToGroup(partial.age)
              : current.ageGroup,
        };
        set({ profile: next });
        syncProfile(next, get().xp);
      },

      markLessonRead: (subjectId, lessonId) => {
        const state = get();
        if (!state.profile) return;
        const existing = state.progress[lessonId];
        if (existing) {
          // Already earned XP for this lesson.
          return;
        }
        const entry: LessonProgress = {
          subjectId,
          lessonId,
          score: null,
          completedAt: new Date().toISOString(),
        };
        const xp = state.xp + XP.readLesson;
        set({ progress: { ...state.progress, [lessonId]: entry }, xp });
        get().touchStreak();
        syncProgress(state.profile.id, entry, xp);
        const lesson = getLesson(subjectId, lessonId);
        if (lesson) logActivity(state.profile.id, subjectId, Math.min(lesson.minutes, 25));
      },

      saveQuizScore: (subjectId, lessonId, score) => {
        const state = get();
        if (!state.profile) return;
        const existing = state.progress[lessonId];
        const best = Math.max(existing?.score ?? 0, score);
        const entry: LessonProgress = {
          subjectId,
          lessonId,
          score: best,
          completedAt: existing?.completedAt ?? new Date().toISOString(),
        };
        // Award XP for improvement or first attempt.
        const prevScore = existing?.score ?? 0;
        let gained = 0;
        if (!existing) {
          gained = XP.quizBase + XP.quizBonus(score);
        } else if (score > prevScore) {
          gained = Math.round(((score - prevScore) / 10) * 2);
        }
        const xp = state.xp + gained;
        set({ progress: { ...state.progress, [lessonId]: entry }, xp });
        get().touchStreak();
        syncProgress(state.profile.id, entry, xp);
        logActivity(state.profile.id, subjectId, 4);
      },

      claimDailyChallenge: () => {
        const state = get();
        const today = new Date().toISOString().slice(0, 10);
        if (state.dailyChallenge?.date === today && state.dailyChallenge.done)
          return;
        const xp = state.xp + XP.dailyChallenge;
        set({ dailyChallenge: { date: today, done: true }, xp });
        if (state.profile) syncProfile(state.profile, xp);
      },

      startFresh: () => {
        set({
          profile: null,
          xp: 0,
          progress: {},
          dailyChallenge: null,
          streak: 0,
          lastActiveDate: null,
          activeDates: [],
          worksheetsDone: [],
        });
      },
    }),
    {
      name: "brightminds-student",
      storage: createJSONStorage(() => localStorage),
    }
  )
);
