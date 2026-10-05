"use client";

import { useEffect, useState } from "react";
import { MoreVertical, Pencil, Plus, Trash2 } from "lucide-react";
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
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { Avatar, AvatarPicker } from "@/components/shared/avatar";
import { api } from "@/lib/api";
import { THEMES } from "@/lib/learning-config";
import type { ChildSummary } from "@/lib/parent-types";
import {
  EmptyState,
  ErrorState,
  SectionHeader,
  levelLabel,
} from "./parent-ui";

// ---------------------------------------------------------------------------
// My Children — cards per child, add / edit / remove, and the generated
// login code + PIN revealed after creating a child.
// ---------------------------------------------------------------------------

interface ChildForm {
  name: string;
  age: string;
  theme: string;
  avatar: string;
  avatarColor: string;
}

const EMPTY_FORM: ChildForm = { name: "", age: "8", theme: "neutral", avatar: "🦊", avatarColor: "amber" };

export function ParentChildren({
  kids,
  loading,
  error,
  onReload,
  onSelect,
}: {
  kids: ChildSummary[];
  loading: boolean;
  error: string | null;
  onReload: () => Promise<void> | void;
  onSelect: (childId: string) => void;
}) {
  const { toast } = useToast();
  const [addOpen, setAddOpen] = useState(false);
  const [editing, setEditing] = useState<ChildSummary | null>(null);
  const [removing, setRemoving] = useState<ChildSummary | null>(null);
  const [created, setCreated] = useState<ChildSummary | null>(null);
  const [saving, setSaving] = useState(false);
  const [form, setForm] = useState<ChildForm>(EMPTY_FORM);

  useEffect(() => {
    if (addOpen) setForm(EMPTY_FORM);
  }, [addOpen]);

  // Prefill the form whenever the edit dialog opens.
  useEffect(() => {
    if (editing) {
      setForm({
        name: editing.name,
        age: String(editing.age),
        theme: editing.theme,
        avatar: editing.avatar || "🦊",
        avatarColor: editing.avatarColor || "amber",
      });
    }
  }, [editing]);

  const submitAdd = async () => {
    setSaving(true);
    try {
      const data = await api<{ child: ChildSummary }>("/api/parent/children", {
        method: "POST",
        body: {
          name: form.name,
          age: Number(form.age),
          theme: form.theme,
          avatar: form.avatar,
          avatarColor: form.avatarColor,
        },
      });
      setAddOpen(false);
      setCreated(data.child);
      await onReload();
    } catch (err) {
      toast({
        title: "Couldn't add your child",
        description: err instanceof Error ? err.message : "Please try again.",
      });
    } finally {
      setSaving(false);
    }
  };

  const submitEdit = async () => {
    if (!editing) return;
    setSaving(true);
    try {
      await api(`/api/parent/children/${encodeURIComponent(editing.id)}`, {
        method: "PATCH",
        body: {
          name: form.name,
          age: Number(form.age),
          theme: form.theme,
          avatar: form.avatar,
          avatarColor: form.avatarColor,
        },
      });
      setEditing(null);
      await onReload();
      toast({ title: "Changes saved ✅", description: "Your child's profile is up to date." });
    } catch (err) {
      toast({
        title: "Couldn't save changes",
        description: err instanceof Error ? err.message : "Please try again.",
      });
    } finally {
      setSaving(false);
    }
  };

  const submitRemove = async () => {
    if (!removing) return;
    setSaving(true);
    try {
      await api(`/api/parent/children/${encodeURIComponent(removing.id)}`, { method: "DELETE" });
      setRemoving(null);
      await onReload();
      toast({ title: "Profile removed", description: "All of that learning data was deleted." });
    } catch (err) {
      toast({
        title: "Couldn't remove profile",
        description: err instanceof Error ? err.message : "Please try again.",
      });
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="space-y-6">
      <SectionHeader
        title="My Children"
        subtitle="Everyone's learning journey lives here."
        action={
          <Button
            onClick={() => setAddOpen(true)}
            className="rounded-full bg-rose-500 hover:bg-rose-600"
          >
            <Plus className="h-4 w-4" aria-hidden /> Add child
          </Button>
        }
      />

      {error && kids.length === 0 ? (
        <ErrorState message={error} onRetry={onReload} />
      ) : kids.length === 0 && !loading ? (
        <EmptyState
          icon="🧒"
          title="No children yet"
          detail="Add a child to get their very own login code — then they can learn on any device, and you can follow along here."
          action={
            <Button onClick={() => setAddOpen(true)} className="rounded-full bg-rose-500 hover:bg-rose-600">
              <Plus className="h-4 w-4" aria-hidden /> Add your first child
            </Button>
          }
        />
      ) : (
        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
          {kids.map((kid) => (
            <Card key={kid.id} className="rounded-2xl transition-shadow hover:shadow-md">
              <CardHeader className="pb-2">
                <div className="flex items-start justify-between gap-2">
                  <div className="flex items-center gap-3">
                    <Avatar avatar={kid.avatar} color={kid.avatarColor} size="lg" />
                    <div>
                      <CardTitle className="text-lg leading-tight">{kid.name}</CardTitle>
                      <CardDescription className="mt-0.5">
                        Age {kid.age} · {levelLabel(kid.ageGroup)}
                      </CardDescription>
                    </div>
                  </div>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="icon" aria-label={`More options for ${kid.name}`}>
                        <MoreVertical className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem onClick={() => setEditing(kid)}>
                        <Pencil className="h-4 w-4" aria-hidden /> Edit profile
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={() => setRemoving(kid)} className="text-rose-600">
                        <Trash2 className="h-4 w-4" aria-hidden /> Remove child
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="grid grid-cols-3 gap-2 text-center">
                  <div className="rounded-xl bg-muted/60 p-2">
                    <p className="text-base font-extrabold tabular-nums">{kid.lessonsDone}</p>
                    <p className="text-[11px] text-muted-foreground">lessons</p>
                  </div>
                  <div className="rounded-xl bg-muted/60 p-2">
                    <p className="text-base font-extrabold tabular-nums">{kid.weeklyMinutes}m</p>
                    <p className="text-[11px] text-muted-foreground">this week</p>
                  </div>
                  <div className="rounded-xl bg-muted/60 p-2">
                    <p className="text-base font-extrabold tabular-nums">{kid.streak}🔥</p>
                    <p className="text-[11px] text-muted-foreground">streak</p>
                  </div>
                </div>
                <div className="flex flex-wrap gap-1.5">
                  {Object.entries(kid.subjectAverages).map(([subjectId, avg]) =>
                    avg === null ? null : (
                      <Badge
                        key={subjectId}
                        variant="secondary"
                        className="rounded-full bg-background font-semibold"
                      >
                        {subjectId === "math"
                          ? "🔢"
                          : subjectId === "english"
                            ? "✏️"
                            : subjectId === "science"
                              ? "🔬"
                              : "📖"}{" "}
                        {avg}%
                      </Badge>
                    )
                  )}
                  {Object.values(kid.subjectAverages).every((v) => v === null) && (
                    <span className="text-xs text-muted-foreground">No quizzes yet — just starting out</span>
                  )}
                </div>
                <div className="flex items-center justify-between gap-2 pt-1">
                  <p className="font-mono text-xs text-muted-foreground">
                    Code {kid.loginCode} · PIN {kid.pin}
                  </p>
                  <Button
                    onClick={() => onSelect(kid.id)}
                    className="rounded-full bg-amber-500 text-white hover:bg-amber-600"
                  >
                    View dashboard
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      {/* ------------------------------ add ------------------------------ */}
      <Dialog open={addOpen} onOpenChange={setAddOpen}>
        <DialogContent className="rounded-3xl sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Add a child</DialogTitle>
            <DialogDescription>
              We&apos;ll create a login code your child can use on their own device.
            </DialogDescription>
          </DialogHeader>
          <ChildFormFields form={form} onChange={setForm} />
          <DialogFooter>
            <Button variant="outline" onClick={() => setAddOpen(false)} disabled={saving}>
              Cancel
            </Button>
            <Button
              onClick={submitAdd}
              disabled={saving || form.name.trim().length === 0}
              className="rounded-full bg-rose-500 hover:bg-rose-600"
            >
              {saving ? "Creating…" : "Create profile"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* ------------------------------ edit ------------------------------ */}
      <Dialog open={editing !== null} onOpenChange={(open) => !open && setEditing(null)}>
        <DialogContent className="rounded-3xl sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Edit {editing?.name}</DialogTitle>
            <DialogDescription>
              Changing the age keeps lessons at the right level automatically.
            </DialogDescription>
          </DialogHeader>
          {editing && <ChildFormFields form={form} onChange={setForm} />}
          <DialogFooter>
            <Button variant="outline" onClick={() => setEditing(null)} disabled={saving}>
              Cancel
            </Button>
            <Button
              onClick={submitEdit}
              disabled={saving || form.name.trim().length === 0}
              className="rounded-full bg-rose-500 hover:bg-rose-600"
            >
              {saving ? "Saving…" : "Save changes"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* ----------------------------- remove ----------------------------- */}
      <AlertDialog open={removing !== null} onOpenChange={(open) => !open && setRemoving(null)}>
        <AlertDialogContent className="rounded-3xl">
          <AlertDialogHeader>
            <AlertDialogTitle>Remove {removing?.name}&apos;s profile?</AlertDialogTitle>
            <AlertDialogDescription>
              This permanently deletes their progress, streaks and goals from BrightMinds. There is
              no undo — please be sure.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel disabled={saving}>Keep profile</AlertDialogCancel>
            <AlertDialogAction
              onClick={(e) => {
                e.preventDefault();
                submitRemove();
              }}
              disabled={saving}
              className="bg-rose-600 hover:bg-rose-700"
            >
              {saving ? "Removing…" : "Yes, remove"}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      {/* --------------------- success: code + PIN reveal -------------------- */}
      <Dialog open={created !== null} onOpenChange={(open) => !open && setCreated(null)}>
        <DialogContent className="rounded-3xl sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="text-xl">🎉 {created?.name} is ready to learn!</DialogTitle>
            <DialogDescription>
              Use this code on your child&apos;s device to sign in. Keep the PIN somewhere handy.
            </DialogDescription>
          </DialogHeader>
          {created && (
            <div className="space-y-3">
              <div className="rounded-2xl border-2 border-dashed border-amber-300 bg-amber-50 p-4 text-center">
                <p className="text-xs font-bold uppercase tracking-wide text-amber-700">
                  Login code
                </p>
                <p className="mt-1 font-mono text-3xl font-extrabold tracking-widest text-amber-900">
                  {created.loginCode}
                </p>
              </div>
              <div className="rounded-2xl border-2 border-dashed border-rose-300 bg-rose-50 p-4 text-center">
                <p className="text-xs font-bold uppercase tracking-wide text-rose-700">Secret PIN</p>
                <p className="mt-1 font-mono text-3xl font-extrabold tracking-widest text-rose-900">
                  {created.pin}
                </p>
              </div>
              <ol className="list-decimal space-y-1 pl-5 text-sm text-muted-foreground">
                <li>Open BrightMinds on your child&apos;s device.</li>
                <li>Choose &quot;Child sign in&quot; and enter the code.</li>
                <li>Type the PIN, and learning can begin!</li>
              </ol>
            </div>
          )}
          <DialogFooter>
            <Button
              onClick={() => {
                if (created) onSelect(created.id);
                setCreated(null);
              }}
              className="rounded-full bg-amber-500 text-white hover:bg-amber-600"
            >
              Got it — see dashboard
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}

// ------------------------------ form fields ---------------------------------

function ChildFormFields({
  form,
  onChange,
}: {
  form: ChildForm;
  onChange: (f: ChildForm) => void;
}) {
  return (
    <div className="space-y-4">
      <div className="grid grid-cols-2 gap-3">
        <div className="space-y-1.5">
          <Label htmlFor="child-name">Name</Label>
          <Input
            id="child-name"
            value={form.name}
            maxLength={40}
            placeholder="e.g. Alex"
            onChange={(e) => onChange({ ...form, name: e.target.value })}
          />
        </div>
        <div className="space-y-1.5">
          <Label htmlFor="child-age">Age</Label>
          <Select value={form.age} onValueChange={(age) => onChange({ ...form, age })}>
            <SelectTrigger id="child-age">
              <SelectValue placeholder="Age" />
            </SelectTrigger>
            <SelectContent>
              {Array.from({ length: 10 }, (_, i) => i + 6).map((age) => (
                <SelectItem key={age} value={String(age)}>
                  {age} years old
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>
      <div className="space-y-1.5">
        <Label>Theme on their device</Label>
        <Select value={form.theme} onValueChange={(theme) => onChange({ ...form, theme })}>
          <SelectTrigger aria-label="Theme">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            {THEMES.map((t) => (
              <SelectItem key={t.id} value={t.id}>
                {t.emoji} {t.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      <div className="space-y-1.5">
        <Label>Avatar</Label>
        <AvatarPicker
          value={form.avatar}
          color={form.avatarColor}
          onChange={(avatar, avatarColor) => onChange({ ...form, avatar, avatarColor })}
        />
      </div>
    </div>
  );
}
