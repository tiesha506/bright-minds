"use client";

import { useCallback, useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { CheckCircle2, Loader2 } from "lucide-react";
import { toast } from "sonner";
import { api } from "@/lib/api";
import { useAuthStore } from "@/lib/auth-store";
import { useStudentStore } from "@/lib/student-store";

interface StudentResource {
  id: string;
  kind: "video" | "audio" | "link" | "doc" | "image" | "file";
  source: "link" | "upload";
  title: string;
  url: string | null;
  fileName: string;
  mimeType: string;
  openedAt: string | null;
  completedAt: string | null;
}

const KIND_META: Record<string, { label: string; className: string }> = {
  video: { label: "▶️ Watch Video", className: "bg-violet-100 text-violet-900 hover:bg-violet-200" },
  audio: { label: "🎧 Listen to Audio", className: "bg-teal-100 text-teal-900 hover:bg-teal-200" },
  link: { label: "🔗 Open Learning Resource", className: "bg-orange-100 text-orange-900 hover:bg-orange-200" },
  doc: { label: "📄 View Document", className: "bg-rose-100 text-rose-900 hover:bg-rose-200" },
  image: { label: "🖼️ View Image", className: "bg-emerald-100 text-emerald-900 hover:bg-emerald-200" },
  file: { label: "📎 Open File", className: "bg-amber-100 text-amber-900 hover:bg-amber-200" },
};

/**
 * ResourceButtons — learning resources a teacher attached to an assignment.
 * Render inside the student assignment card/detail for the active student.
 *
 * Contract for shell wiring:  <ResourceButtons assignmentId={assignment.id} />
 * (Only renders for signed-in student sessions with a server profile.)
 */
export function ResourceButtons({ assignmentId }: { assignmentId: string }) {
  const user = useAuthStore((s) => s.user);
  const profile = useStudentStore((s) => s.profile);

  const [resources, setResources] = useState<StudentResource[] | null>(null);
  const [openingId, setOpeningId] = useState<string | null>(null);
  const [audioUrl, setAudioUrl] = useState<{ id: string; url: string; title: string } | null>(null);

  const isStudent = user?.role === "STUDENT" && !!profile;

  const load = useCallback(async () => {
    if (!profile) return;
    try {
      const data = await api<{ resources: StudentResource[] }>(
        `/api/resources?assignmentId=${encodeURIComponent(assignmentId)}&studentId=${encodeURIComponent(profile.id)}`
      );
      setResources(data.resources);
    } catch {
      setResources([]);
    }
  }, [assignmentId, profile]);

  useEffect(() => {
    if (isStudent) load();
  }, [isStudent, load]);

  if (!isStudent) return null;

  /** Opens a resource: tracks the view, then shows/plays it. */
  const openResource = async (r: StudentResource) => {
    if (!profile) return;
    setOpeningId(r.id);
    try {
      const data = await api<{ url: string | null }>(
        `/api/resources/${r.id}/view`,
        { method: "POST", body: { studentId: profile.id } }
      );
      setResources((prev) =>
        (prev ?? []).map((x) =>
          x.id === r.id
            ? { ...x, url: data.url ?? x.url, openedAt: x.openedAt ?? new Date().toISOString() }
            : x
        )
      );
      if (!data.url) {
        toast.error("This resource is unavailable right now.");
        return;
      }
      if (r.kind === "audio") {
        // Inline HTML5 player instead of a new tab.
        setAudioUrl({ id: r.id, url: data.url, title: r.title });
      } else {
        // video / link / doc / image / file → new tab
        window.open(data.url, "_blank", "noopener,noreferrer");
      }
    } catch (e) {
      toast.error(e instanceof Error ? e.message : "Could not open the resource");
    } finally {
      setOpeningId(null);
    }
  };

  const markDone = async (r: StudentResource) => {
    if (!profile) return;
    try {
      const data = await api<{ view: { completedAt: string | null } }>(
        `/api/resources/${r.id}/view`,
        { method: "PATCH", body: { studentId: profile.id, completed: true } }
      );
      setResources((prev) =>
        (prev ?? []).map((x) =>
          x.id === r.id ? { ...x, completedAt: data.view.completedAt } : x
        )
      );
      toast.success("Marked as done! 🎉");
    } catch (e) {
      toast.error(e instanceof Error ? e.message : "Could not mark as done");
    }
  };

  if (resources !== null && resources.length === 0) return null;

  return (
    <div className="min-w-0 space-y-2">
      {resources === null && (
        <div className="space-y-2">
          <Skeleton className="h-10 w-3/4 rounded-full" />
        </div>
      )}
      {resources !== null && (
        <ul className="space-y-2">
          {resources.map((r) => {
            const meta = KIND_META[r.kind] ?? KIND_META.file;
            const done = !!r.completedAt;
            return (
              <li key={r.id} className="min-w-0 rounded-xl border bg-muted/20 px-3 py-2">
                <div className="flex flex-wrap items-center gap-2">
                  <Button
                    size="sm"
                    disabled={openingId === r.id || r.url === null && r.source === "upload"}
                    onClick={() => void openResource(r)}
                    className={`h-10 rounded-full font-bold ${meta.className}`}
                    aria-label={`${meta.label}: ${r.title}`}
                  >
                    {openingId === r.id ? (
                      <Loader2 className="h-4 w-4 animate-spin" />
                    ) : (
                      meta.label
                    )}
                  </Button>
                  <span className="min-w-0 flex-1 truncate text-xs font-semibold text-muted-foreground">
                    {r.title}
                    {r.source === "upload" && r.fileName ? ` · ${r.fileName}` : ""}
                  </span>
                  {done ? (
                    <Badge className="gap-1 bg-emerald-100 text-emerald-800 hover:bg-emerald-100">
                      <CheckCircle2 className="h-3 w-3" /> Done
                    </Badge>
                  ) : (
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => void markDone(r)}
                      className="h-9 rounded-full px-3 text-xs font-semibold text-emerald-700 hover:bg-emerald-50"
                    >
                      Mark as done
                    </Button>
                  )}
                </div>
                {r.kind === "audio" && audioUrl?.id === r.id && (
                  <div className="mt-2">
                    <audio controls autoPlay src={audioUrl.url} className="w-full max-w-md">
                      Your browser does not support audio playback.
                    </audio>
                  </div>
                )}
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}
