"use client";

import { KeyRound, LogOut, ShieldCheck, User } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Avatar } from "@/components/shared/avatar";
import type { AuthUser } from "@/lib/auth-store";
import type { ChildSummary } from "@/lib/parent-types";
import { SectionHeader, levelLabel } from "./parent-ui";

// ---------------------------------------------------------------------------
// Settings — account info, per-child login shortcuts, privacy note and sign
// out. Everything here is real: no fake preferences.
// ---------------------------------------------------------------------------

export function ParentSettings({
  user,
  kids,
  onSelectChild,
  onSignOut,
}: {
  user: AuthUser;
  kids: ChildSummary[];
  onSelectChild: (childId: string) => void;
  onSignOut: () => void;
}) {
  return (
    <div className="space-y-6">
      <SectionHeader title="Settings" subtitle="Your account, your children's codes, your data." />

      <div className="grid gap-6 lg:grid-cols-2">
        {/* ---------------------------- account ----------------------------- */}
        <Card className="rounded-2xl">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-lg">
              <User className="h-5 w-5 text-rose-500" aria-hidden /> Account
            </CardTitle>
            <CardDescription>Managed by BrightMinds — contact support to change.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-1.5">
              <Label htmlFor="parent-name">Your name</Label>
              <Input id="parent-name" value={user.name} readOnly className="bg-muted/50" />
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="parent-email">Email</Label>
              <Input id="parent-email" value={user.email} readOnly className="bg-muted/50" />
            </div>
            <div className="flex items-center gap-2">
              <Badge className="bg-rose-100 text-rose-800 hover:bg-rose-100">
                Parent account
              </Badge>
              <Badge variant="secondary" className="rounded-full">
                Signed in
              </Badge>
            </div>
            <Button
              variant="outline"
              onClick={onSignOut}
              className="rounded-full border-rose-200 text-rose-600 hover:bg-rose-50 hover:text-rose-700"
            >
              <LogOut className="h-4 w-4" aria-hidden /> Sign out
            </Button>
          </CardContent>
        </Card>

        {/* -------------------------- child codes --------------------------- */}
        <Card className="rounded-2xl">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-lg">
              <KeyRound className="h-5 w-5 text-amber-500" aria-hidden /> Device sign-in codes
            </CardTitle>
            <CardDescription>
              Use these on your child&apos;s device — choose &quot;Child sign in&quot;.
            </CardDescription>
          </CardHeader>
          <CardContent>
            {kids.length === 0 ? (
              <p className="rounded-xl bg-muted/50 p-4 text-sm text-muted-foreground">
                Add a child in &quot;My Children&quot; to get a login code and PIN.
              </p>
            ) : (
              <ul className="space-y-2.5">
                {kids.map((kid) => (
                  <li key={kid.id}>
                    <button
                      type="button"
                      onClick={() => onSelectChild(kid.id)}
                      className="flex w-full items-center justify-between gap-3 rounded-2xl border p-3 text-left transition-colors hover:bg-muted/50"
                      aria-label={`Open ${kid.name}'s dashboard`}
                    >
                      <span className="flex items-center gap-3">
                        <Avatar avatar={kid.avatar} color={kid.avatarColor} size="sm" />
                        <span>
                          <span className="block text-sm font-bold">{kid.name}</span>
                          <span className="block text-xs text-muted-foreground">
                            Age {kid.age} · {levelLabel(kid.ageGroup)}
                          </span>
                        </span>
                      </span>
                      <span className="text-right font-mono text-xs text-muted-foreground">
                        <span className="block font-bold text-foreground">{kid.loginCode}</span>
                        PIN {kid.pin}
                      </span>
                    </button>
                  </li>
                ))}
              </ul>
            )}
          </CardContent>
        </Card>
      </div>

      {/* ---------------------------- privacy ----------------------------- */}
      <Card className="rounded-2xl border-emerald-200 bg-emerald-50/60">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-lg text-emerald-900">
            <ShieldCheck className="h-5 w-5" aria-hidden /> Privacy, in plain words
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-2 text-sm leading-relaxed text-emerald-950">
          <p>
            🔒 <strong>Parents only see their own children&apos;s data.</strong> Progress, scores
            and learning time are visible for the children on your account — never anyone
            else&apos;s.
          </p>
          <p>
            💬 We don&apos;t show private conversations. If your child chats with the Learning
            Helper, that stays between them and their learning — you see the progress it creates,
            not the words.
          </p>
          <p>
            🧒 Child data is limited to learning progress: lessons completed, quiz scores and
            practice minutes. Nothing more is collected.
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
