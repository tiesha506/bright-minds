"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import { Skeleton } from "@/components/ui/skeleton";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import {
  BellRing,
  CalendarClock,
  Loader2,
  Pencil,
  Plus,
  Repeat,
  Trash2,
} from "lucide-react";
import {
  format,
  isToday,
  isTomorrow,
  isYesterday,
  formatDistanceToNowStrict,
} from "date-fns";
import { toast } from "sonner";
import { api } from "@/lib/api";
import type { AuthUser } from "@/lib/auth-store";
import { REMINDER_NOTES_MAX, REMINDER_TITLE_MAX, type ReminderItem } from "@/lib/notepad-types";

const REPEAT_LABEL: Record<string, string> = {
  none: "Once",
  daily: "Every day",
  weekly: "Every week",
  monthly: "Every month",
};

/** "Tomorrow 3:00 PM" style label for a due date. */
function formatDue(iso: string): string {
  const d = new Date(iso);
  const time = format(d, "h:mm a");
  if (isToday(d)) return `Today ${time}`;
  if (isTomorrow(d)) return `Tomorrow ${time}`;
  if (isYesterday(d)) return `Yesterday ${time}`;
  return `${format(d, "EEE, d MMM")} · ${time}`;
}

interface FormState {
  title: string;
  date: string;
  time: string;
  repeat: "none" | "daily" | "weekly" | "monthly";
  notes: string;
}

const emptyForm: FormState = { title: "", date: "", time: "09:00", repeat: "none", notes: "" };

function toForm(r: ReminderItem): FormState {
  const d = new Date(r.dueAt);
  return {
    title: r.title,
    date: format(d, "yyyy-MM-dd"),
    time: format(d, "HH:mm"),
    repeat: (["none", "daily", "weekly", "monthly"].includes(r.repeat)
      ? r.repeat
      : "none") as FormState["repeat"],
    notes: r.notes,
  };
}

/**
 * RemindersPanel — personal reminders with recurrence for any signed-in role.
 *
 * Contract for shell wiring:  <RemindersPanel user={user} variant="playful" | "pro" />
 */
export function RemindersPanel({ user, variant = "playful" }: { user: AuthUser; variant?: "playful" | "pro" }) {
  const playful = variant === "playful";
  const [items, setItems] = useState<ReminderItem[] | null>(null);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [form, setForm] = useState<FormState>(emptyForm);
  const [busy, setBusy] = useState(false);
  const [completingId, setCompletingId] = useState<string | null>(null);

  const load = useCallback(async () => {
    try {
      const data = await api<{ reminders: ReminderItem[] }>("/api/reminders?scope=all");
      setItems(data.reminders);
    } catch {
      setItems([]);
    }
  }, []);

  useEffect(() => {
    load();
  }, [load]);

  const pending = useMemo(() => (items ?? []).filter((r) => !r.done), [items]);
  const done = useMemo(() => (items ?? []).filter((r) => r.done), [items]);

  // ------------------------------ mutations --------------------------------

  const openAdd = () => {
    setEditingId(null);
    setForm(emptyForm);
    setDialogOpen(true);
  };

  const openEdit = (r: ReminderItem) => {
    setEditingId(r.id);
    setForm(toForm(r));
    setDialogOpen(true);
  };

  const submit = async () => {
    if (!form.title.trim() || !form.date) {
      toast.error("Add a title and pick a date");
      return;
    }
    setBusy(true);
    const dueAt = new Date(`${form.date}T${form.time || "09:00"}`).toISOString();
    const body = {
      title: form.title,
      dueAt,
      repeat: form.repeat,
      notes: form.notes,
    };
    try {
      if (editingId) {
        const data = await api<{ reminder: ReminderItem }>(`/api/reminders/${editingId}`, {
          method: "PATCH",
          body,
        });
        setItems((prev) =>
          (prev ?? []).map((r) => (r.id === editingId ? data.reminder : r))
        );
        toast.success("Reminder updated");
      } else {
        const data = await api<{ reminder: ReminderItem }>("/api/reminders", {
          method: "POST",
          body,
        });
        setItems((prev) => [data.reminder, ...(prev ?? [])]);
        toast.success("Reminder added! ⏰");
      }
      setDialogOpen(false);
    } catch (e) {
      toast.error(e instanceof Error ? e.message : "Could not save the reminder");
    } finally {
      setBusy(false);
    }
  };

  const toggleDone = async (r: ReminderItem) => {
    setCompletingId(r.id);
    try {
      const data = await api<{ reminder: ReminderItem }>(`/api/reminders/${r.id}`, {
        method: "PATCH",
        body: { done: true },
      });
      setItems((prev) => (prev ?? []).map((x) => (x.id === r.id ? data.reminder : x)));
      // Recurring reminders roll forward instead of completing.
      if (!data.reminder.done) {
        toast.success(
          `Recurring — next one due ${formatDue(data.reminder.dueAt)} 🔁`
        );
      } else {
        toast.success("Nice, done! ✅");
      }
    } catch (e) {
      toast.error(e instanceof Error ? e.message : "Could not update the reminder");
    } finally {
      setCompletingId(null);
    }
  };

  const remove = async (r: ReminderItem) => {
    try {
      await api(`/api/reminders/${r.id}`, { method: "DELETE" });
      setItems((prev) => (prev ?? []).filter((x) => x.id !== r.id));
      toast.success("Reminder deleted");
    } catch (e) {
      toast.error(e instanceof Error ? e.message : "Could not delete the reminder");
    }
  };

  // ------------------------------- rendering --------------------------------

  const accent = playful
    ? "bg-amber-100 text-amber-900 hover:bg-amber-200"
    : "bg-muted text-foreground hover:bg-muted/70";

  const row = (r: ReminderItem, isDone: boolean) => (
    <li
      key={r.id}
      className={`flex flex-wrap items-center gap-2 rounded-xl border px-3 py-2.5 ${
        isDone
          ? "border-transparent bg-muted/30 opacity-70"
          : r.overdue
            ? "border-destructive/30 bg-destructive/5"
            : "bg-muted/30"
      }`}
    >
      <Checkbox
        checked={isDone}
        onCheckedChange={() => !isDone && void toggleDone(r)}
        disabled={isDone || completingId === r.id}
        aria-label={isDone ? "Completed" : `Mark ${r.title} as done`}
        className="h-5 w-5"
      />
      <div className="min-w-0 flex-1">
        <p className={`truncate text-sm font-bold ${isDone ? "line-through" : ""}`}>{r.title}</p>
        <p
          className={`text-xs ${
            !isDone && r.overdue ? "font-semibold text-destructive" : "text-muted-foreground"
          }`}
        >
          {isDone ? `Was due ${formatDue(r.dueAt)}` : formatDue(r.dueAt)}
          {r.notes ? ` · ${r.notes}` : ""}
        </p>
      </div>
      {r.repeat !== "none" && !isDone && (
        <Badge variant="secondary" className="gap-1">
          <Repeat className="h-3 w-3" /> {REPEAT_LABEL[r.repeat]}
        </Badge>
      )}
      {!isDone && r.overdue && (
        <Badge className="bg-destructive text-white hover:bg-destructive">Overdue</Badge>
      )}
      {!isDone && (
        <div className="flex items-center gap-0.5">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => openEdit(r)}
            aria-label={`Edit ${r.title}`}
            className="h-9 w-9 rounded-full p-0"
          >
            <Pencil className="h-4 w-4" />
          </Button>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => void remove(r)}
            aria-label={`Delete ${r.title}`}
            className="h-9 w-9 rounded-full p-0 text-destructive hover:bg-destructive/10"
          >
            <Trash2 className="h-4 w-4" />
          </Button>
        </div>
      )}
      {completingId === r.id && <Loader2 className="h-4 w-4 animate-spin text-muted-foreground" />}
    </li>
  );

  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle className="flex flex-wrap items-center gap-2 text-lg">
          <BellRing className={`h-5 w-5 ${playful ? "text-amber-500" : "text-primary"}`} />
          {playful ? "My Reminders" : "Reminders"}
          {items !== null && pending.length > 0 && (
            <Badge variant="secondary" className="ml-auto">
              {pending.length} to do
            </Badge>
          )}
          <Button
            size="sm"
            onClick={openAdd}
            className={`ml-auto rounded-full ${pending.length ? "" : ""} ${items === null ? "hidden" : ""} ${playful ? "sm:ml-2" : "sm:ml-2"}`}
          >
            <Plus className="h-4 w-4" /> Add
          </Button>
        </CardTitle>
      </CardHeader>
      <CardContent>
        {items === null && (
          <div className="space-y-2">
            <Skeleton className="h-12 w-full rounded-xl" />
            <Skeleton className="h-12 w-full rounded-xl" />
          </div>
        )}
        {items !== null && items.length === 0 && (
          <div className="rounded-xl bg-muted/40 px-3 py-8 text-center">
            <p className="text-sm font-semibold">🔔 No reminders yet — add one!</p>
            <p className="mt-1 text-xs text-muted-foreground">
              Homework due dates, reading practice, anything worth remembering.
            </p>
          </div>
        )}
        {items !== null && items.length > 0 && (
          <ScrollArea className="max-h-96">
            <div className="space-y-4 pr-2">
              <ul className="space-y-2">
                {pending.map((r) => row(r, false))}
                {pending.length === 0 && (
                  <li className="rounded-xl bg-emerald-50 px-3 py-4 text-center text-sm font-semibold text-emerald-800">
                    All caught up! 🎉
                  </li>
                )}
              </ul>
              {done.length > 0 && (
                <div>
                  <p className="mb-2 text-xs font-bold uppercase tracking-wide text-muted-foreground">
                    Completed ({done.length})
                  </p>
                  <ul className="space-y-2">{done.map((r) => row(r, true))}</ul>
                </div>
              )}
            </div>
          </ScrollArea>
        )}
      </CardContent>

      {/* --------------------------- add / edit dialog --------------------------- */}
      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>{editingId ? "Edit reminder" : "New reminder"}</DialogTitle>
            <DialogDescription>
              Repeating reminders roll forward automatically when you tick them off.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-3">
            <div className="grid gap-1.5">
              <Label htmlFor="rem-title">What</Label>
              <Input
                id="rem-title"
                value={form.title}
                maxLength={REMINDER_TITLE_MAX}
                onChange={(e) => setForm((f) => ({ ...f, title: e.target.value }))}
                placeholder="e.g. Practise times tables"
                className="h-10"
              />
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div className="grid gap-1.5">
                <Label htmlFor="rem-date">Date</Label>
                <Input
                  id="rem-date"
                  type="date"
                  value={form.date}
                  onChange={(e) => setForm((f) => ({ ...f, date: e.target.value }))}
                  className="h-10"
                />
              </div>
              <div className="grid gap-1.5">
                <Label htmlFor="rem-time">Time</Label>
                <Input
                  id="rem-time"
                  type="time"
                  value={form.time}
                  onChange={(e) => setForm((f) => ({ ...f, time: e.target.value }))}
                  className="h-10"
                />
              </div>
            </div>
            <div className="grid gap-1.5">
              <Label>Repeat</Label>
              <Select
                value={form.repeat}
                onValueChange={(v) => setForm((f) => ({ ...f, repeat: v as FormState["repeat"] }))}
              >
                <SelectTrigger className="h-10 w-full" aria-label="Repeat">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="none">Once</SelectItem>
                  <SelectItem value="daily">Every day</SelectItem>
                  <SelectItem value="weekly">Every week</SelectItem>
                  <SelectItem value="monthly">Every month</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="grid gap-1.5">
              <Label htmlFor="rem-notes">Notes (optional)</Label>
              <Textarea
                id="rem-notes"
                value={form.notes}
                maxLength={REMINDER_NOTES_MAX}
                onChange={(e) => setForm((f) => ({ ...f, notes: e.target.value }))}
                placeholder="Anything to remember…"
                className="min-h-16"
              />
            </div>
          </div>
          <DialogFooter className="gap-2">
            <Button variant="outline" onClick={() => setDialogOpen(false)} className="h-10 rounded-full">
              Cancel
            </Button>
            <Button onClick={() => void submit()} disabled={busy} className="h-10 rounded-full">
              {busy ? <Loader2 className="h-4 w-4 animate-spin" /> : <CalendarClock className="h-4 w-4" />}
              {editingId ? "Save changes" : "Add reminder"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </Card>
  );
}
