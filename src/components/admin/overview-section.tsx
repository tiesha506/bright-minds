"use client";

import { useEffect, useState } from "react";
import {
  Award,
  BookOpen,
  ClipboardCheck,
  GraduationCap,
  Presentation,
  School,
  Trophy,
  Users,
} from "lucide-react";
import { api } from "@/lib/api";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { Separator } from "@/components/ui/separator";
import { StatTile } from "@/components/shared/charts";
import type { OverviewData, TopXpStudent } from "@/lib/admin-types";
import { RoleBadge, EmptyState, fmtDate, SectionHeading, ErrorNote } from "./shared";

const AVATAR_STYLES: Record<string, string> = {
  rose: "bg-rose-100 text-rose-700",
  amber: "bg-amber-100 text-amber-700",
  emerald: "bg-emerald-100 text-emerald-700",
  teal: "bg-teal-100 text-teal-700",
  violet: "bg-violet-100 text-violet-700",
  orange: "bg-orange-100 text-orange-700",
};

function StudentAvatar({ student }: { student: TopXpStudent }) {
  if (student.photoUrl) {
    return (
      <img
        src={student.photoUrl}
        alt=""
        className="h-8 w-8 shrink-0 rounded-full border border-zinc-200 object-cover"
      />
    );
  }
  if (student.avatar) {
    return (
      <span
        aria-hidden
        className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-zinc-100 text-lg"
      >
        {student.avatar}
      </span>
    );
  }
  const style = AVATAR_STYLES[student.avatarColor] ?? AVATAR_STYLES.amber;
  return (
    <span
      aria-hidden
      className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-sm font-bold ${style}`}
    >
      {student.name.charAt(0).toUpperCase()}
    </span>
  );
}

function OverviewSkeleton() {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6">
        {Array.from({ length: 12 }).map((_, i) => (
          <Skeleton key={i} className="h-24 rounded-2xl" />
        ))}
      </div>
      <Skeleton className="h-14 rounded-xl" />
      <div className="grid gap-4 lg:grid-cols-2">
        <Skeleton className="h-72 rounded-xl" />
        <Skeleton className="h-72 rounded-xl" />
      </div>
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
          hint={`${data.usersByRole.ADMIN} admins`}
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
          value={data.teachersTotal}
          hint={`${data.parentsTotal} parents`}
        />
        <StatTile
          icon={<School className="h-4 w-4" aria-hidden />}
          label="Classrooms"
          value={data.classroomsTotal}
          hint={`${data.assignmentsTotal} assignments set`}
        />
        <StatTile
          icon={<ClipboardCheck className="h-4 w-4" aria-hidden />}
          label="Completed work"
          value={data.completedAssignments}
          hint={`${data.progressRows.toLocaleString()} lesson results`}
        />
        <StatTile
          icon={<BookOpen className="h-4 w-4" aria-hidden />}
          label="Lessons"
          value={data.lessonsTotal}
          hint={subjectHint}
        />
      </div>

      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6">
        <StatTile
          icon={
            <span aria-hidden className="h-2.5 w-2.5 rounded-full bg-emerald-500" />
          }
          label="Online now"
          value={data.onlineUsers}
          hint="Active in last 5 min"
        />
        <StatTile
          icon={<Users className="h-4 w-4 text-zinc-400" aria-hidden />}
          label="Offline"
          value={data.offlineUsers}
          hint="Signed out or idle"
        />
        <StatTile
          icon={<GraduationCap className="h-4 w-4" aria-hidden />}
          label="Active 7d"
          value={data.activeStudents7d}
          hint="Students learning this week"
        />
        <StatTile
          icon={<Trophy className="h-4 w-4" aria-hidden />}
          label="Total XP"
          value={data.achievements.xpTotal.toLocaleString()}
          hint="Earned by all students"
        />
        <StatTile
          icon={<Award className="h-4 w-4" aria-hidden />}
          label="Certificates"
          value={data.certificatesIssued}
          hint="Issued to date"
        />
        <StatTile
          icon={<BookOpen className="h-4 w-4" aria-hidden />}
          label="Minutes 7d"
          value={data.activityMinutes7d.toLocaleString()}
          hint={`${data.customActivitiesTotal} custom activities`}
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
              {data.activeStudents7d}
            </strong>{" "}
            active students in the last 7 days
          </span>
          <Separator orientation="vertical" className="hidden h-4 sm:block" />
          <span>
            <strong className="tabular-nums text-zinc-900">
              {data.assignmentsTotal.toLocaleString()}
            </strong>{" "}
            assignments created
          </span>
          <Separator orientation="vertical" className="hidden h-4 sm:block" />
          <span>
            <strong className="tabular-nums text-zinc-900">
              {data.completedAssignments.toLocaleString()}
            </strong>{" "}
            assignment submissions completed
          </span>
        </CardContent>
      </Card>

      <div className="grid gap-4 lg:grid-cols-2">
        <Card className="border-zinc-200">
          <CardHeader className="pb-2">
            <CardTitle className="flex items-center gap-2 text-base">
              <Trophy className="h-4 w-4 text-amber-500" aria-hidden />
              Student achievements
            </CardTitle>
            <p className="text-xs text-zinc-500">
              {data.achievements.xpTotal > 0
                ? `${data.achievements.xpTotal.toLocaleString()} XP earned across all students`
                : "XP earned by students"}
            </p>
          </CardHeader>
          <CardContent>
            {data.achievements.topStudents.length === 0 ? (
              <EmptyState
                title="No data available yet"
                hint="Top learners appear here as soon as students start earning XP."
              />
            ) : (
              <ol className="divide-y divide-zinc-100">
                {data.achievements.topStudents.map((s, i) => (
                  <li key={s.id} className="flex items-center gap-3 py-2.5">
                    <span
                      aria-label={`Rank ${i + 1}`}
                      className="w-5 shrink-0 text-center text-xs font-bold text-zinc-400"
                    >
                      {i + 1}
                    </span>
                    <StudentAvatar student={s} />
                    <div className="min-w-0 flex-1">
                      <p className="truncate text-sm font-semibold text-zinc-900">
                        {s.name}
                      </p>
                      <p className="truncate text-xs capitalize text-zinc-500">
                        {s.ageGroup}
                      </p>
                    </div>
                    <span className="shrink-0 rounded-md bg-amber-50 px-2 py-0.5 text-xs font-bold tabular-nums text-amber-700 ring-1 ring-amber-200">
                      {s.xp.toLocaleString()} XP
                    </span>
                  </li>
                ))}
              </ol>
            )}
          </CardContent>
        </Card>

        <Card className="border-zinc-200">
          <CardHeader className="pb-2">
            <CardTitle className="text-base">Recent signups</CardTitle>
          </CardHeader>
          <CardContent>
            {data.recentSignups.length === 0 ? (
              <EmptyState
                title="No data available yet"
                hint="New accounts appear here as soon as people register."
              />
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
    </div>
  );
}
