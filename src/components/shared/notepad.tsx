"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import {
  Bold,
  Check,
  Heading2,
  Italic,
  List,
  Loader2,
  NotebookPen,
  Plus,
  Search,
  Trash2,
} from "lucide-react";
import { formatDistanceToNowStrict } from "date-fns";
import { toast } from "sonner";
import { api } from "@/lib/api";
import type { AuthUser } from "@/lib/auth-store";
import {
  NOTE_CONTENT_MAX,
  NOTE_TITLE_MAX,
  renderNoteMarkdown,
  type NoteItem,
} from "@/lib/notepad-types";

/**
 * Note Pad — private markdown-ish notes for the signed-in user (students and
 * teachers alike; notes are scoped to the session account server-side).
 *
 * Contract for shell wiring:  <NotePad user={user} variant="playful" | "pro" />
 */
export function NotePad({ user, variant = "playful" }: { user: AuthUser; variant?: "playful" | "pro" }) {
  const playful = variant === "playful";

  const [notes, setNotes] = useState<NoteItem[] | null>(null);
  const [query, setQuery] = useState("");
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [savedAt, setSavedAt] = useState<Date | null>(null);
  const [saving, setSaving] = useState(false);
  const [creating, setCreating] = useState(false);
  const [confirmDelete, setConfirmDelete] = useState(false);

  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const saveTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  /** Refs mirror the live editor values so timers/blur can save without staleness. */
  const editRef = useRef({ id: selectedId, title, content });
  editRef.current = { id: selectedId, title, content };
  const dirtyRef = useRef(false);

  // ------------------------------ data loading ------------------------------

  const loadList = useCallback(async (q: string) => {
    try {
      const data = await api<{ notes: NoteItem[] }>(
        `/api/notes${q ? `?q=${encodeURIComponent(q)}` : ""}`
      );
      setNotes(data.notes);
    } catch {
      setNotes([]);
    }
  }, []);

  useEffect(() => {
    loadList("");
  }, [loadList]);

  // Debounced search.
  useEffect(() => {
    const t = setTimeout(() => loadList(query.trim()), 350);
    return () => clearTimeout(t);
  }, [query, loadList]);

  // ------------------------------ save logic -------------------------------

  const saveIfDirty = useCallback(async () => {
    const { id, title: t, content: c } = editRef.current;
    if (!id || !dirtyRef.current || saving) return;
    setSaving(true);
    try {
      const data = await api<{ note: NoteItem }>(`/api/notes/${id}`, {
        method: "PATCH",
        body: { title: t, content: c },
      });
      dirtyRef.current = false;
      setSavedAt(new Date());
      setNotes((prev) =>
        prev
          ? [data.note, ...prev.filter((n) => n.id !== id)].sort(
              (a, b) => b.updatedAt.localeCompare(a.updatedAt)
            )
          : prev
      );
    } catch (e) {
      toast.error(e instanceof Error ? e.message : "Could not save the note");
    } finally {
      setSaving(false);
    }
  }, [saving]);

  // Idle auto-save (2.5 s after the last keystroke) + save on unmount.
  useEffect(() => {
    if (!selectedId) return;
    if (saveTimer.current) clearTimeout(saveTimer.current);
    saveTimer.current = setTimeout(() => void saveIfDirty(), 2500);
    return () => {
      if (saveTimer.current) clearTimeout(saveTimer.current);
    };
  }, [title, content, selectedId, saveIfDirty]);

  const selectNote = useCallback(
    async (note: NoteItem) => {
      if (note.id === editRef.current.id) return;
      await saveIfDirty();
      setSelectedId(note.id);
      setTitle(note.title);
      setContent(note.content);
      setSavedAt(null);
      dirtyRef.current = false;
    },
    [saveIfDirty]
  );

  const createNote = useCallback(async () => {
    await saveIfDirty();
    setCreating(true);
    try {
      const data = await api<{ note: NoteItem }>("/api/notes", {
        method: "POST",
        body: { title: "", content: "" },
      });
      setNotes((prev) => [data.note, ...(prev ?? [])]);
      setSelectedId(data.note.id);
      setTitle("");
      setContent("");
      setSavedAt(null);
      dirtyRef.current = false;
    } catch (e) {
      toast.error(e instanceof Error ? e.message : "Could not create the note");
    } finally {
      setCreating(false);
    }
  }, [saveIfDirty]);

  const deleteNote = useCallback(async () => {
    const id = editRef.current.id;
    if (!id) return;
    try {
      await api(`/api/notes/${id}`, { method: "DELETE" });
      setNotes((prev) => (prev ?? []).filter((n) => n.id !== id));
      setSelectedId(null);
      setTitle("");
      setContent("");
      dirtyRef.current = false;
      setConfirmDelete(false);
      toast.success("Note deleted");
    } catch (e) {
      toast.error(e instanceof Error ? e.message : "Could not delete the note");
    }
  }, []);

  // --------------------------- markdown toolbar ----------------------------

  const insertMd = useCallback((prefix: string, suffix = "") => {
    const el = textareaRef.current;
    if (!el) return;
    const { selectionStart: s, selectionEnd: e, value } = el;
    const selected = value.slice(s, e);
    const next = `${value.slice(0, s)}${prefix}${selected}${suffix}${value.slice(e)}`;
    setContent(next.slice(0, NOTE_CONTENT_MAX));
    dirtyRef.current = true;
    requestAnimationFrame(() => {
      el.focus();
      el.setSelectionRange(s + prefix.length, s + prefix.length + selected.length);
    });
  }, []);

  // ------------------------------- rendering -------------------------------

  const previewHtml = useMemo(() => renderNoteMarkdown(content), [content]);
  const selectedNote = notes?.find((n) => n.id === selectedId) ?? null;

  const toolBtn =
    "h-9 min-w-9 gap-1 rounded-full px-2 text-xs font-semibold"; // 36px ≥ touch ok w/ p, keep 44px on mobile
  const accent = playful
    ? "bg-amber-100 text-amber-900 hover:bg-amber-200"
    : "bg-muted text-foreground hover:bg-muted/70";

  return (
    <Card className="overflow-hidden">
      <CardHeader className="pb-2">
        <CardTitle className="flex flex-wrap items-center gap-2 text-lg">
          <NotebookPen className={`h-5 w-5 ${playful ? "text-amber-500" : "text-primary"}`} />
          {playful ? "My Note Pad" : "Note Pad"}
          {saving ? (
            <Badge variant="secondary" className="ml-auto gap-1">
              <Loader2 className="h-3 w-3 animate-spin" /> Saving…
            </Badge>
          ) : savedAt ? (
            <Badge variant="secondary" className="ml-auto gap-1">
              <Check className="h-3 w-3" /> Saved
            </Badge>
          ) : null}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid gap-4 md:grid-cols-[minmax(0,16rem)_minmax(0,1fr)]">
          {/* ----------------------------- list ------------------------------ */}
          <div className={`${selectedId ? "hidden md:flex" : "flex"} flex-col gap-2`}>
            <div className="flex gap-2">
              <div className="relative flex-1">
                <Search className="pointer-events-none absolute left-2.5 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <Input
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Search notes…"
                  aria-label="Search notes"
                  className="h-10 rounded-full pl-8"
                />
              </div>
              <Button
                onClick={createNote}
                disabled={creating}
                aria-label="New note"
                className={`h-10 w-10 shrink-0 rounded-full p-0 ${accent}`}
              >
                {creating ? <Loader2 className="h-4 w-4 animate-spin" /> : <Plus className="h-5 w-5" />}
              </Button>
            </div>

            {notes === null && (
              <div className="space-y-2">
                <Skeleton className="h-14 w-full rounded-xl" />
                <Skeleton className="h-14 w-full rounded-xl" />
              </div>
            )}
            {notes !== null && notes.length === 0 && (
              <p className="rounded-xl bg-muted/40 px-3 py-6 text-center text-sm text-muted-foreground">
                {query ? "No notes match your search." : "No notes yet — tap + to start! 📝"}
              </p>
            )}
            {notes !== null && notes.length > 0 && (
              <ScrollArea className="max-h-72 md:max-h-[22rem]">
                <ul className="space-y-2 pr-2 nice-scroll">
                  {notes.map((n) => (
                    <li key={n.id}>
                      <button
                        type="button"
                        onClick={() => void selectNote(n)}
                        className={`w-full rounded-xl border px-3 py-2.5 text-left transition-colors ${
                          n.id === selectedId
                            ? playful
                              ? "border-amber-300 bg-amber-50"
                              : "border-primary/40 bg-primary/5"
                            : "bg-muted/30 hover:bg-muted/60"
                        }`}
                      >
                        <p className="truncate text-sm font-bold">{n.title || "Untitled note"}</p>
                        <p className="truncate text-xs text-muted-foreground">
                          {n.content.replace(/[#*\n-]+/g, " ").trim().slice(0, 60) || "Empty note"} ·{" "}
                          {formatDistanceToNowStrict(new Date(n.updatedAt), { addSuffix: true })}
                        </p>
                      </button>
                    </li>
                  ))}
                </ul>
              </ScrollArea>
            )}
          </div>

          {/* ---------------------------- editor ----------------------------- */}
          <div className={`${selectedId ? "block" : "hidden md:block"} min-w-0`}>
            {!selectedNote ? (
              <div className="flex h-56 items-center justify-center rounded-xl border border-dashed text-center text-sm text-muted-foreground">
                {playful
                  ? "Pick a note or tap + to write one! ✏️"
                  : "Select a note from the list, or create a new one."}
              </div>
            ) : (
              <div className="min-w-0 space-y-2">
                <div className="flex items-center gap-2">
                  <Button
                    variant="ghost"
                    size="sm"
                    className="md:hidden h-9 rounded-full px-3"
                    onClick={() => void saveIfDirty().then(() => setSelectedId(null))}
                  >
                    ← Notes
                  </Button>
                  <div className="ml-auto flex items-center gap-1">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => void saveIfDirty()}
                      className="h-9 rounded-full px-3 text-xs font-semibold"
                    >
                      Save
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => setConfirmDelete(true)}
                      aria-label="Delete note"
                      className="h-9 w-9 rounded-full p-0 text-destructive hover:bg-destructive/10"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>

                <Input
                  value={title}
                  maxLength={NOTE_TITLE_MAX}
                  onChange={(e) => {
                    setTitle(e.target.value);
                    dirtyRef.current = true;
                  }}
                  onBlur={() => void saveIfDirty()}
                  placeholder="Note title…"
                  aria-label="Note title"
                  className={`h-10 border-0 bg-transparent px-0 text-lg font-bold shadow-none focus-visible:ring-0 ${
                    playful ? "font-display" : ""
                  }`}
                />

                {/* formatting toolbar — inserts markdown at the cursor */}
                <div className="flex flex-wrap items-center gap-1.5" role="toolbar" aria-label="Text formatting">
                  <Button variant="outline" size="sm" className={`${toolBtn} ${accent}`} onMouseDown={(e) => e.preventDefault()} onClick={() => insertMd("**", "**")}>
                    <Bold className="h-3.5 w-3.5" /> Bold
                  </Button>
                  <Button variant="outline" size="sm" className={`${toolBtn} ${accent}`} onMouseDown={(e) => e.preventDefault()} onClick={() => insertMd("*", "*")}>
                    <Italic className="h-3.5 w-3.5" /> Italic
                  </Button>
                  <Button variant="outline" size="sm" className={`${toolBtn} ${accent}`} onMouseDown={(e) => e.preventDefault()} onClick={() => insertMd("## ")}>
                    <Heading2 className="h-3.5 w-3.5" /> Heading
                  </Button>
                  <Button variant="outline" size="sm" className={`${toolBtn} ${accent}`} onMouseDown={(e) => e.preventDefault()} onClick={() => insertMd("- ")}>
                    <List className="h-3.5 w-3.5" /> Bullet
                  </Button>
                </div>

                <div className="grid gap-3 lg:grid-cols-2">
                  <Textarea
                    ref={textareaRef}
                    value={content}
                    maxLength={NOTE_CONTENT_MAX}
                    onChange={(e) => {
                      setContent(e.target.value);
                      dirtyRef.current = true;
                    }}
                    onBlur={() => void saveIfDirty()}
                    placeholder={playful ? "Write here… try **bold** or - bullet points!" : "Write your note… markdown supported: **bold**, *italic*, ## heading, - bullet"}
                    aria-label="Note content"
                    className="min-h-44 resize-y rounded-xl md:min-h-56"
                  />
                  {/* live preview */}
                  <div
                    aria-label="Preview"
                    className="max-h-44 overflow-y-auto nice-scroll rounded-xl border bg-muted/20 p-3 text-sm leading-relaxed md:max-h-56 [&_h3.note-h]:mt-2 [&_h3.note-h]:text-base [&_h3.note-h]:font-bold [&_li.note-ul]:ml-4 [&_p.note-p]:my-1 [&_ul.note-ul]:list-disc [&_ul.note-ul]:pl-3 [&_strong]:font-bold"
                    dangerouslySetInnerHTML={{
                      __html:
                        previewHtml ||
                        `<p class="note-p" style="opacity:.5">Live preview appears here…</p>`,
                    }}
                  />
                </div>
              </div>
            )}
          </div>
        </div>
      </CardContent>

      <AlertDialog open={confirmDelete} onOpenChange={setConfirmDelete}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete this note?</AlertDialogTitle>
            <AlertDialogDescription>
              &ldquo;{title || "Untitled note"}&rdquo; will be gone for good. This cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Keep it</AlertDialogCancel>
            <AlertDialogAction
              onClick={() => void deleteNote()}
              className="bg-destructive text-white hover:bg-destructive/90"
            >
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </Card>
  );
}
