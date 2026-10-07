"use client";

import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Check } from "lucide-react";
import { cn } from "@/lib/utils";
import { THEMES } from "@/lib/learning-config";
import { AvatarPicker, AvatarPhotoEditor } from "@/components/shared/avatar";
import type { ThemePref } from "@/lib/content/types";
import type { StudentProfile } from "@/lib/student-store";

interface SettingsDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  profile: StudentProfile;
  onSave: (partial: {
    name: string;
    age: number;
    theme: ThemePref;
    avatar: string;
    avatarColor: string;
    photoUrl: string | null;
  }) => void;
  onSwitchStudent: () => void;
}

export function SettingsDialog({
  open,
  onOpenChange,
  profile,
  onSave,
  onSwitchStudent,
}: SettingsDialogProps) {
  const [name, setName] = useState(profile.name);
  const [age, setAge] = useState(profile.age);
  const [theme, setTheme] = useState<ThemePref>(profile.theme);
  const [avatar, setAvatar] = useState(profile.avatar ?? "🦊");
  const [avatarColor, setAvatarColor] = useState(profile.avatarColor ?? "amber");
  const [photoUrl, setPhotoUrl] = useState(profile.photoUrl ?? null);

  // Re-sync local state when the dialog opens for a different profile.
  const [lastId, setLastId] = useState(profile.id);
  if (profile.id !== lastId) {
    setLastId(profile.id);
    setName(profile.name);
    setAge(profile.age);
    setTheme(profile.theme);
    setAvatar(profile.avatar ?? "🦊");
    setAvatarColor(profile.avatarColor ?? "amber");
    setPhotoUrl(profile.photoUrl ?? null);
  }

  const nameValid = name.trim().length >= 1 && name.trim().length <= 20;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-h-[90vh] overflow-y-auto nice-scroll sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Profile &amp; theme 🛠️</DialogTitle>
          <DialogDescription>
            Update your details anytime — your progress is safe.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-5 py-2">
          <div className="space-y-2">
            <Label>Profile photo</Label>
            <AvatarPhotoEditor
              targetType="student"
              targetId={profile.id}
              photoUrl={photoUrl}
              avatar={avatar}
              color={avatarColor}
              name={profile.name}
              onChanged={(url) => setPhotoUrl(url)}
            />
            <p className="text-xs text-muted-foreground">
              Optional — a grown-up can also add one for you.
            </p>
          </div>

          <div className="space-y-2">
            <Label htmlFor="settings-name">First name</Label>
            <Input
              id="settings-name"
              value={name}
              onChange={(e) => setName(e.target.value.replace(/[^a-zA-Z\s'-]/g, "").slice(0, 20))}
              className="rounded-xl"
            />
          </div>

          <div className="space-y-2">
            <Label>Your avatar</Label>
            <AvatarPicker
              value={avatar}
              color={avatarColor}
              compact
              onChange={(a, c) => {
                setAvatar(a);
                setAvatarColor(c);
              }}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="settings-age">Age</Label>
            <select
              id="settings-age"
              value={age}
              onChange={(e) => setAge(Number(e.target.value))}
              className="h-10 w-full rounded-xl border border-input bg-background px-3 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
            >
              {Array.from({ length: 10 }, (_, i) => i + 6).map((a) => (
                <option key={a} value={a}>
                  {a} years old
                </option>
              ))}
            </select>
          </div>

          <div className="space-y-2">
            <Label>Color theme</Label>
            <div className="grid gap-2" role="radiogroup" aria-label="Color theme">
              {THEMES.map((t) => (
                <button
                  key={t.id}
                  type="button"
                  role="radio"
                  aria-checked={theme === t.id}
                  onClick={() => setTheme(t.id)}
                  className={cn(
                    "flex items-center gap-3 rounded-xl border-2 p-3 text-left transition-all",
                    theme === t.id ? "border-primary bg-secondary" : "border-border hover:border-primary/40"
                  )}
                >
                  <div className="flex -space-x-1.5">
                    {t.swatch.map((c) => (
                      <span
                        key={c}
                        className="w-6 h-6 rounded-full border-2 border-white shadow-sm"
                        style={{ backgroundColor: c }}
                      />
                    ))}
                  </div>
                  <span className="font-semibold flex-1">
                    {t.emoji} {t.label}
                  </span>
                  {theme === t.id && <Check className="w-4 h-4 text-primary" />}
                </button>
              ))}
            </div>
            <p className="text-xs text-muted-foreground">
              Colors are just for fun — every subject is for every student.
            </p>
          </div>
        </div>

        <DialogFooter className="flex-col sm:flex-row gap-2 items-stretch">
          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button variant="ghost" className="text-destructive hover:text-destructive sm:mr-auto">
                Switch student
              </Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Start over for a new student?</AlertDialogTitle>
                <AlertDialogDescription>
                  This clears {profile.name}&apos;s profile and progress on this device. This
                  cannot be undone.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Cancel</AlertDialogCancel>
                <AlertDialogAction
                  onClick={onSwitchStudent}
                  className="bg-destructive text-white hover:bg-destructive/90"
                >
                  Yes, start fresh
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
          <div className="flex gap-2 justify-end">
            <Button variant="outline" onClick={() => onOpenChange(false)}>
              Cancel
            </Button>
            <Button
              disabled={!nameValid}
              onClick={() => {
                onSave({ name: name.trim(), age, theme, avatar, avatarColor, photoUrl });
                onOpenChange(false);
              }}
            >
              Save changes
            </Button>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
