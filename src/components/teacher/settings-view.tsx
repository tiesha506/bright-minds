"use client";

// ---------------------------------------------------------------------------
// Settings — teacher info, classroom shortcuts, privacy note, sign out.
// ---------------------------------------------------------------------------

import { useState } from "react";
import { LogOut, School, ShieldCheck } from "lucide-react";
import { api } from "@/lib/api";
import { useAuthStore } from "@/lib/auth-store";
import type { AuthUser } from "@/lib/auth-store";
import { AvatarPhotoEditor } from "@/components/shared/avatar";
import { AppearanceSettings } from "@/components/shared/appearance-settings";
import {
  Loading,
  ErrorNote,
  Panel,
  PageHeader,
  useFetch,
} from "@/components/teacher/teacher-ui";
import type { TeacherClassroomSummary, TeacherNavKey } from "@/lib/teacher-types";
import { Button } from "@/components/ui/button";

export function SettingsView({
  user,
  onNavigate,
}: {
  user: AuthUser;
  onNavigate: (key: TeacherNavKey) => void;
}) {
  const { data, error, loading } = useFetch<{ classrooms: TeacherClassroomSummary[] }>(
    () => api("/api/teacher/classrooms"),
    []
  );

  const [photoUrl, setPhotoUrl] = useState<string | null>(user.photoUrl ?? null);
  const [savingPhoto, setSavingPhoto] = useState(false);

  async function savePhoto(url: string | null) {
    setSavingPhoto(true);
    try {
      await api("/api/auth/profile", { method: "PATCH", body: { photoUrl: url } });
      setPhotoUrl(url);
      // Keep the session store in sync so headers pick the photo up.
      const token = useAuthStore.getState().token;
      if (token) {
        useAuthStore
          .getState()
          .setSession({ ...user, photoUrl: url ?? undefined }, token);
      }
    } catch {
      alert("Could not save your photo. Please try again.");
    } finally {
      setSavingPhoto(false);
    }
  }

  const signOut = async () => {
    try {
      await api("/api/auth/logout", { method: "POST" });
    } catch {
      // Session already gone — continue with local sign-out.
    }
    useAuthStore.getState().clear();
  };

  return (
    <div className="space-y-5">
      <PageHeader emoji="⚙️" title="Settings" subtitle="Your account, shortcuts and privacy." />

      <Panel title="Teacher information">
        <div className="mb-4 flex items-center justify-between gap-3 rounded-lg border border-slate-200 bg-slate-50/60 px-3 py-3">
          <AvatarPhotoEditor
            targetType="user"
            photoUrl={photoUrl}
            name={user.name}
            onChanged={savePhoto}
          />
          {savingPhoto && (
            <span className="text-xs text-slate-400" role="status">Saving…</span>
          )}
        </div>
        <dl className="grid gap-3 sm:grid-cols-2">
          <div className="rounded-lg border border-slate-200 bg-slate-50/60 px-3 py-2">
            <dt className="text-[10px] font-bold uppercase tracking-wide text-slate-400">Name</dt>
            <dd className="text-sm font-bold text-slate-800">{user.name}</dd>
          </div>
          <div className="rounded-lg border border-slate-200 bg-slate-50/60 px-3 py-2">
            <dt className="text-[10px] font-bold uppercase tracking-wide text-slate-400">Email</dt>
            <dd className="truncate text-sm font-bold text-slate-800">{user.email}</dd>
          </div>
          <div className="rounded-lg border border-slate-200 bg-slate-50/60 px-3 py-2">
            <dt className="text-[10px] font-bold uppercase tracking-wide text-slate-400">Role</dt>
            <dd className="text-sm font-bold text-slate-800">Teacher</dd>
          </div>
          <div className="rounded-lg border border-slate-200 bg-slate-50/60 px-3 py-2">
            <dt className="text-[10px] font-bold uppercase tracking-wide text-slate-400">Sign in method</dt>
            <dd className="text-sm font-bold text-slate-800">Email + password</dd>
          </div>
        </dl>
        <p className="mt-2 text-xs text-slate-400">
          Email is managed by your school&rsquo;s BrightMinds administrator and is read-only here.
        </p>
      </Panel>

      {/* Appearance — Light / Dark / Eye-Friendly for this device. */}
      <AppearanceSettings />

      <Panel
        title="Your classrooms"
        actions={
          <button
            type="button"
            onClick={() => onNavigate("classrooms")}
            className="text-xs font-semibold text-emerald-700 hover:underline"
          >
            Manage →
          </button>
        }
      >
        {loading && <Loading />}
        {error && <ErrorNote message={error} />}
        {data && data.classrooms.length === 0 && (
          <p className="text-sm text-slate-400">No classrooms yet.</p>
        )}
        {data && data.classrooms.length > 0 && (
          <div className="flex flex-wrap gap-2">
            {data.classrooms.map((c) => (
              <button
                key={c.id}
                type="button"
                onClick={() => onNavigate("classrooms")}
                className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-3 py-1.5 text-xs font-semibold text-slate-700 hover:border-emerald-300"
              >
                <School className="h-3.5 w-3.5 text-emerald-500" aria-hidden />
                {c.name}
                <span className="text-slate-400">{c.studentCount}</span>
              </button>
            ))}
          </div>
        )}
      </Panel>

      <Panel title="Privacy">
        <div className="flex items-start gap-2 rounded-lg bg-emerald-50/70 px-3 py-3 text-sm text-emerald-900 ring-1 ring-emerald-100">
          <ShieldCheck className="mt-0.5 h-4 w-4 shrink-0 text-emerald-600" aria-hidden />
          <p>
            <strong>Teachers only see students in their classrooms.</strong> Every request is checked
            against your classroom ownership on the server — dashboards, profiles, reports and
            Helper drafts included. Student login codes and PINs are shown only to their own
            teacher.
          </p>
        </div>
      </Panel>

      <Panel title="Session">
        <p className="text-sm text-slate-500">
          Signed in as <strong className="text-slate-800">{user.name}</strong>. Signing out ends
          this session on this device.
        </p>
        <Button onClick={signOut} variant="outline" className="mt-3 border-rose-200 text-rose-600 hover:bg-rose-50 hover:text-rose-700">
          <LogOut className="h-4 w-4" /> Sign out
        </Button>
      </Panel>
    </div>
  );
}
