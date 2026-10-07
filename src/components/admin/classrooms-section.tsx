"use client";

import { useEffect, useState } from "react";
import { api } from "@/lib/api";
import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import type { ClassroomRow } from "@/lib/admin-types";
import { EmptyState, ErrorNote, SectionHeading, fmtDate } from "./shared";

export function ClassroomsSection() {
  const [classrooms, setClassrooms] = useState<ClassroomRow[] | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let alive = true;
    api<{ classrooms: ClassroomRow[] }>("/api/admin/classrooms")
      .then((d) => alive && setClassrooms(d.classrooms))
      .catch((e: Error) => alive && setError(e.message));
    return () => {
      alive = false;
    };
  }, []);

  return (
    <div className="space-y-4">
      <SectionHeading
        title="Classrooms"
        description="Every classroom on the platform with its teacher, seats and assignments."
      />
      {error && <ErrorNote message={error} />}
      <Card className="border-zinc-200 py-0">
        {classrooms === null && !error ? (
          <div className="space-y-2 p-4">
            {Array.from({ length: 4 }).map((_, i) => (
              <Skeleton key={i} className="h-10 w-full" />
            ))}
          </div>
        ) : classrooms && classrooms.length === 0 ? (
          <div className="p-4">
            <EmptyState
              title="No classrooms yet"
              hint="Classrooms appear here as soon as teachers create them."
            />
          </div>
        ) : classrooms ? (
          <CardContent className="overflow-x-auto py-0">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-zinc-200 text-left text-xs font-semibold uppercase tracking-wide text-zinc-500">
                  <th className="px-4 py-3">Classroom</th>
                  <th className="px-4 py-3">Teacher</th>
                  <th className="px-4 py-3 tabular-nums">Students</th>
                  <th className="px-4 py-3 tabular-nums">Assignments</th>
                  <th className="px-4 py-3">Created</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-zinc-100">
                {classrooms.map((c) => (
                  <tr key={c.id} className="hover:bg-zinc-50">
                    <td className="px-4 py-2.5">
                      <p className="font-semibold text-zinc-900">{c.name}</p>
                      {c.gradeLabel && (
                        <p className="text-xs text-zinc-500">{c.gradeLabel}</p>
                      )}
                    </td>
                    <td className="px-4 py-2.5">
                      <p className="font-medium text-zinc-800">{c.teacherName}</p>
                      <p className="text-xs text-zinc-500">{c.teacherEmail}</p>
                    </td>
                    <td className="px-4 py-2.5 font-semibold tabular-nums">
                      {c.seatCount}
                    </td>
                    <td className="px-4 py-2.5 tabular-nums">{c.assignmentCount}</td>
                    <td className="px-4 py-2.5 text-zinc-500">{fmtDate(c.createdAt)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </CardContent>
        ) : null}
      </Card>
    </div>
  );
}
