"use client";
// TEMPORARY QA page (deleted after testing) — renders the ParentApp directly
// so it can be browser-tested while other role apps are still being built.
import { useSyncExternalStore } from "react";
import { useAuthStore } from "@/lib/auth-store";
import { ParentApp } from "@/components/parent/parent-app";

export default function ParentQaPage() {
  const mounted = useSyncExternalStore(
    () => () => {},
    () => true,
    () => false
  );
  const user = useAuthStore((s) => s.user);
  if (!mounted) return <div className="min-h-screen bg-background" />;
  if (!user) return <div className="p-8">SIGNED_OUT</div>;
  return <ParentApp user={user} />;
}
