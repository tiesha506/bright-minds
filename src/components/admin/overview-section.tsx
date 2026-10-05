"use client";

import { useEffect, useState } from "react";
import {
  BookOpen,
  ClipboardList,
  GraduationCap,
  Presentation,
  School,
  Users,
} from "lucide-react";
import { api } from "@/lib/api";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { Separator } from "@/components/ui/separator";
import { StatTile } from "@/components/shared/charts";
import type { OverviewData } from "@/lib/admin-types";
import { RoleBadge, fmtDate, SectionHeading, ErrorNote } from "./shared";

function OverviewSkeleton() {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6">
        {Array.from({ length: 6 }).map((_, i) => (
          <Skeleton key={i} className="h-24 rounded-2xl" />
        ))}
      </div>
      <Skeleton className="h-14 rounded-xl" />
      <Skeleton className="h-72 rounded-xl" />
    </div>
  );
}

export function OverviewSection() {
  const [data, setData] = useState<OverviewData | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let alive = true;
    api<OverviewData>("/api/admin/overview")
      .then((d) => alive && setData(d))
      .catch((e: Error) => alive && setError(e.message));
    return () => {
      alive = false;
    };
  }, []);

  if (error) {
    return (
      <div>
        <SectionHeading title="Overview" />
        <ErrorNote message={error} />
      </div>
    );
  }
  if (!data) {
    return (
      <div>
        <SectionHeading title="Overview" />
        <OverviewSkeleton />
      </div>
    );
  }

  const subjectHint = data.lessonsPerSubject
    .map((s) => `${s.name.split(" ")[0]} ${s.total}`)
    .join(" · ");

  return (
    <div className="space-y-6">
      <SectionHeading
        title="Overview"
        description="Platform-wide totals, refreshed live from the database."
      />

      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6">
        <StatTile
          icon={<Users className="h-4 w-4" aria-hidden />}
          label="Total users"
          value={data.usersTotal}
          hint={`${data.usersByRole.PARENT} parents · ${data.usersByRole.TEACHER} teachers · ${data.usersByRole.ADMIN} admins`}
        />
        <StatTile
          icon={<GraduationCap className="h-4 w-4" aria-hidden />}
          label="Students"
          value={data.studentsTotal}
          hint="Child profiles"
        />
        <StatTile
          icon={<Presentation className="h-4 w-4" aria-hidden />}
          label="Teachers"
          value={data.usersByRole.TEACHER}
          hint="Teacher accounts"
        />
        <StatTile
          icon={<School className="h-4 w-4" aria-hidden />}
          label="Classrooms"
          value={data.classroomsTotal}
          hint={`${data.assignmentsTotal} assignments set`}
        />
        <StatTile
          icon={<ClipboardList className="h-4 w-4" aria-hidden />}
          label="Assignments"
          value={data.assignmentsTotal}
          hint={`${data.customActivitiesTotal} custom activities`}
        />
        <StatTile
          icon={<BookOpen className="h-4 w-4" aria-hidden />}
          label="Lessons"
          value={data.lessonsTotal}
          hint={subjectHint}
        />
      </div>

      <Card className="border-zinc-200">
        <CardContent className="flex flex-wrap items-center gap-x-4 gap-y-1 py-3 text-sm text-zinc-600">
          <span className="flex items-center gap-1.5 font-semibold text-zinc-800">
            <span
              aria-hidden
              className={`h-2 w-2 rounded-full ${
                data.registrationOpen ? "bg-emerald-500" : "bg-red-500"
              }`}
            />
            Registration {data.registrationOpen ? "open" : "closed"}
          </span>
          <Separator orientation="vertical" className="hidden h-4 sm:block" />
          <span>
            <strong className="tabular-nums text-zinc-900">
              {data.activityMinutes7d.toLocaleString()}
            </strong>{" "}
            learning minutes in the last 7 days
          </span>
          <Separator orientation="vertical" className="hidden h-4 sm:block" />
          <span>
            <strong className="tabular-nums text-zinc-900">{data.activeStudents7d}</strong>{" "}
            active students this week
          </span>
          <Separator orientation="vertical" className="hidden h-4 sm:block" />
          <span>
            <strong className="tabular-nums text-zinc-900">
              {data.progressRows.toLocaleString()}
            </strong>{" "}
            progress rows recorded
          </span>
        </CardContent>
      </Card>

      <Card className="border-zinc-200">
        <CardHeader className="pb-2">
          <CardTitle className="text-base">Recent signups</CardTitle>
        </CardHeader>
        <CardContent>
          {data.recentSignups.length === 0 ? (
            <p className="py-6 text-center text-sm text-zinc-500">No accounts yet.</p>
          ) : (
            <ul className="divide-y divide-zinc-100">
              {data.recentSignups.map((u) => (
                <li key={u.id} className="flex items-center justify-between gap-3 py-2.5">
                  <div className="min-w-0">
                    <p className="truncate text-sm font-semibold text-zinc-900">{u.name}</p>
                    <p className="truncate text-xs text-zinc-500">{u.email}</p>
                  </div>
                  <div className="flex shrink-0 items-center gap-3">
                    <RoleBadge role={u.role} />
                    <span className="hidden w-20 text-right text-xs text-zinc-500 sm:block">
                      {fmtDate(u.createdAt)}
                    </span>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
