"use client";

import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

export type Role = "STUDENT" | "PARENT" | "TEACHER" | "ADMIN";

export interface AuthUser {
  id: string;
  email: string;
  name: string;
  role: Role;
  /** Profile photo URL (Supabase Storage) — parents/teachers can upload one. */
  photoUrl?: string;
}

/** When role === STUDENT, the child's server profile rides along so the
 *  student app can hydrate progress for exactly this child. */
export interface AuthStudent {
  id: string;
  name: string;
  age: number;
  theme: string;
  ageGroup: string;
  avatar?: string;
  avatarColor?: string;
  photoUrl?: string;
  xp?: number;
}

interface AuthState {
  /** Null when signed out (public website / guest student mode). */
  user: AuthUser | null;
  token: string | null;
  student: AuthStudent | null;
  /** Guest students explore without an account (progress stays on-device). */
  guest: boolean;
  setSession: (user: AuthUser, token: string) => void;
  setStudent: (student: AuthStudent | null) => void;
  startGuest: () => void;
  clear: () => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      token: null,
      student: null,
      guest: false,
      setSession: (user, token) => set({ user, token, student: null, guest: false }),
      setStudent: (student) => set({ student }),
      startGuest: () => set({ guest: true, user: null, token: null, student: null }),
      clear: () => set({ user: null, token: null, student: null, guest: false }),
    }),
    {
      name: "brightminds-auth",
      storage: createJSONStorage(() => localStorage),
    }
  )
);
