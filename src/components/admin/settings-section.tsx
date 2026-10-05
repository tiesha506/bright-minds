"use client";

import { useEffect, useState } from "react";
import { api } from "@/lib/api";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Skeleton } from "@/components/ui/skeleton";
import { Switch } from "@/components/ui/switch";
import type { SettingsData } from "@/lib/admin-types";
import { ErrorNote, SectionHeading } from "./shared";

export function SettingsSection() {
  const [data, setData] = useState<SettingsData | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);
  const [savedAt, setSavedAt] = useState<string | null>(null);

  useEffect(() => {
    let alive = true;
    api<SettingsData>("/api/admin/settings")
      .then((d) => alive && setData(d))
      .catch((e: Error) => alive && setError(e.message));
    return () => {
      alive = false;
    };
  }, []);

  async function toggleRegistration(open: boolean) {
    setSaving(true);
    setError(null);
    try {
      const updated = await api<SettingsData>("/api/admin/settings", {
        method: "PUT",
        body: { registrationOpen: open },
      });
      setData(updated);
      setSavedAt(new Date().toLocaleTimeString());
    } catch (e) {
      setError((e as Error).message);
    } finally {
      setSaving(false);
    }
  }

  return (
    <div className="space-y-4 max-w-2xl">
      <SectionHeading
        title="Settings"
        description="Platform-wide configuration, stored in the PlatformSetting table."
      />
      {error && <ErrorNote message={error} />}

      <Card className="border-zinc-200">
        <CardHeader className="pb-2">
          <CardTitle className="text-base">Registrations</CardTitle>
        </CardHeader>
        <CardContent>
          {data === null && !error ? (
            <Skeleton className="h-16 w-full" />
          ) : data ? (
            <div className="flex items-center justify-between gap-4">
              <div>
                <div className="flex items-center gap-2">
                  <p className="text-sm font-semibold text-zinc-900">
                    Open registration
                  </p>
                  {data.registrationOpen ? (
                    <Badge className="border-transparent bg-emerald-100 text-emerald-800 hover:bg-emerald-100">
                      Open
                    </Badge>
                  ) : (
                    <Badge className="border-transparent bg-red-100 text-red-800 hover:bg-red-100">
                      Closed
                    </Badge>
                  )}
                </div>
                <p className="mt-1 max-w-md text-sm text-zinc-500">
                  Allow new PARENT and TEACHER accounts to sign up. The sign-up route
                  enforces this immediately — while closed, new registrations are
                  rejected with “Registrations are currently closed”.
                </p>
              </div>
              <Switch
                checked={data.registrationOpen}
                onCheckedChange={toggleRegistration}
                disabled={saving}
                aria-label="Toggle open registration"
              />
            </div>
          ) : null}
        </CardContent>
      </Card>

      <div className="rounded-lg border border-zinc-200 bg-white px-4 py-3 text-sm text-zinc-600">
        <p className="font-semibold text-zinc-800">How this works</p>
        <p className="mt-1">
          The setting is stored as the PlatformSetting key{" "}
          <code className="rounded bg-zinc-100 px-1.5 py-0.5 font-mono text-xs">
            registrationOpen
          </code>{" "}
          (default <code className="rounded bg-zinc-100 px-1.5 py-0.5 font-mono text-xs">true</code>
          ). <code className="rounded bg-zinc-100 px-1.5 py-0.5 font-mono text-xs">POST /api/auth/signup</code>{" "}
          checks it before creating any account, so closing registration takes effect
          instantly — no redeploy needed.
        </p>
        <Separator className="my-3" />
        <div className="flex items-center justify-between">
          <span className="text-xs text-zinc-500">
            Admin accounts are unaffected — they are created outside the sign-up flow.
          </span>
          {savedAt && (
            <span className="text-xs font-semibold text-emerald-700">
              Saved at {savedAt}
            </span>
          )}
        </div>
      </div>

      {data && (
        <Button
          variant="outline"
          size="sm"
          disabled={saving}
          onClick={() => toggleRegistration(data.registrationOpen)}
          className="border-zinc-300"
        >
          {saving ? "Saving…" : "Re-apply current value"}
        </Button>
      )}
    </div>
  );
}
