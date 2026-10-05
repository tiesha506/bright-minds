"use client";

import { useSyncExternalStore } from "react";
import { useAuthStore } from "@/lib/auth-store";
import { PublicSite } from "@/components/site/public-site";
import { StudentApp } from "@/components/student/student-app";
import { ParentApp } from "@/components/parent/parent-app";
import { TeacherApp } from "@/components/teacher/teacher-app";
import { AdminApp } from "@/components/admin/admin-app";

function Splash() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-background">
      <div className="rounded-full overflow-hidden bg-white shadow-lg animate-pulse">
        <img src="/logo.png" alt="BrightMinds" className="h-24 sm:h-28 w-auto" />
      </div>
    </div>
  );
}

export default function Home() {
  // Hydration-safe "mounted" check (avoids SSR/localStorage mismatch).
  const mounted = useSyncExternalStore(
    () => () => {},
    () => true,
    () => false
  );

  const user = useAuthStore((s) => s.user);
  const guest = useAuthStore((s) => s.guest);

  if (!mounted) return <Splash />;

  // Signed-out visitors see the public website (with login / sign up).
  if (!user && !guest) return <PublicSite />;

  // Role-based routing — each role gets its own dashboard world.
  if (!user) return <StudentApp />; // guest student
  switch (user.role) {
    case "STUDENT":
      return <StudentApp />;
    case "PARENT":
      return <ParentApp user={user} />;
    case "TEACHER":
      return <TeacherApp user={user} />;
    case "ADMIN":
      return <AdminApp user={user} />;
    default:
      return <PublicSite />;
  }
}
