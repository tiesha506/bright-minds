"use client";

// ---------------------------------------------------------------------------
// Upload Student Report — teachers share term reports / documents privately
// with a student's linked parent. Files go straight into the private
// "reports" bucket; parents read them via short-lived signed URLs only.
// ---------------------------------------------------------------------------

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { FileText, Loader2, Trash2, UploadCloud } from "lucide-react";
import { api } from "@/lib/api";
import { useAuthStore, type AuthUser } from "@/lib/auth-store";
import {
  REPORT_ACCEPT,
  REPORT_MAX_BYTES,
  reportTypeLabel,
  type ReportItem,
  type ReportParentOption,
  type ReportUploadResponse,
  type ReportsListResponse,
} from "@/lib/report-types";
import { cn } from "@/lib/utils";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Checkbox } from "@/components/ui/checkbox";
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
import {
  EmptyState,
  ErrorNote,
  Field,
  PageHeader,
  Panel,
  SelectInput,
  TextareaInput,
  TextInput,
} from "@/components/teacher/teacher-ui";

interface RosterStudent {
  studentId: string;
  name: string;
  classroomName: string;
}

/** XHR upload so we get real progress events (fetch cannot report them). */
function uploadWithProgress(
  form: FormData,
  token: string,
  onProgress: (pct: number) => void
): Promise<ReportUploadResponse> {
  return new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest();
    xhr.open("POST", "/api/reports/upload");
    xhr.setRequestHeader("Authorization", `Bearer ${token}`);
    xhr.upload.onprogress = (e) => {
      if (e.lengthComputable) onProgress(Math.min(100, Math.round((e.loaded / e.total) * 100)));
    };
    xhr.onload = () => {
      try {
        const data = JSON.parse(xhr.responseText) as ReportUploadResponse & { error?: string };
        if (xhr.status >= 200 && xhr.status < 300) resolve(data);
        else reject(new Error(data.error || `Upload failed (${xhr.status})`));
      } catch {
        reject(new Error(`Upload failed (${xhr.status})`));
      }
    };
    xhr.onerror = () => reject(new Error("Network error during upload"));
    xhr.send(form);
  });
}

function fmtBytes(n: number): string {
  if (n < 1024) return `${n} B`;
  if (n < 1024 * 1024) return `${(n / 1024).toFixed(0)} KB`;
  return `${(n / (1024 * 1024)).toFixed(1)} MB`;
}

export function ReportUpload({ user }: { user: AuthUser }) {
  void user;
  const { toast } = useToast();
  const token = useAuthStore((s) => s.token);

  // ------------------------------- roster ---------------------------------
  const [students, setStudents] = useState<RosterStudent[] | null>(null);
  const [rosterError, setRosterError] = useState<string | null>(null);
  const [studentId, setStudentId] = useState("");

  // ------------------------------- parents --------------------------------
  const [parents, setParents] = useState<ReportParentOption[] | null>(null);
  const [parentsLoading, setParentsLoading] = useState(false);
  const [selectedParents, setSelectedParents] = useState<Set<string>>(new Set());

  // -------------------------------- form ----------------------------------
  const [file, setFile] = useState<File | null>(null);
  const [term, setTerm] = useState("");
  const [description, setDescription] = useState("");
  const [dragOver, setDragOver] = useState(false);
  const [progress, setProgress] = useState<number | null>(null);
  const [uploadError, setUploadError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // ------------------------------ my uploads ------------------------------
  const [myReports, setMyReports] = useState<ReportItem[] | null>(null);
  const [listLoading, setListLoading] = useState(true);
  const [listError, setListError] = useState<string | null>(null);
  const [deleteTarget, setDeleteTarget] = useState<ReportItem | null>(null);
  const [deleting, setDeleting] = useState(false);

  const loadRoster = useCallback(() => {
    setRosterError(null);
    api<{ students: RosterStudent[] }>("/api/teacher/classrooms")
      .then((d) => {
        // Deduplicate students seated in several classrooms.
        const seen = new Set<string>();
        setStudents(
          d.students.filter((s) => {
            if (seen.has(s.studentId)) return false;
            seen.add(s.studentId);
            return true;
          })
        );
      })
      .catch((e: unknown) =>
        setRosterError(e instanceof Error ? e.message : "Could not load your students")
      );
  }, []);

  const loadMyReports = useCallback(() => {
    setListLoading(true);
    setListError(null);
    api<ReportsListResponse>("/api/reports")
      .then((d) => setMyReports(d.reports))
      .catch((e: unknown) =>
        setListError(e instanceof Error ? e.message : "Could not load your uploaded reports")
      )
      .finally(() => setListLoading(false));
  }, []);

  useEffect(() => {
    loadRoster();
    loadMyReports();
  }, [loadRoster, loadMyReports]);

  // Load eligible parents whenever the selected student changes.
  useEffect(() => {
    setSelectedParents(new Set());
    setParents(null);
    if (!studentId) return;
    let cancelled = false;
    setParentsLoading(true);
    api<{ parents: ReportParentOption[] }>(
      `/api/reports/parents?studentId=${encodeURIComponent(studentId)}`
    )
      .then((d) => {
        if (!cancelled) setParents(d.parents);
      })
      .catch(() => {
        if (!cancelled) setParents([]);
      })
      .finally(() => {
        if (!cancelled) setParentsLoading(false);
      });
    return () => {
      cancelled = true;
    };
  }, [studentId]);

  const setFileChecked = (next: File | null) => {
    setUploadError(null);
    if (!next) {
      setFile(null);
      return;
    }
    const ext = next.name.split(".").pop()?.toLowerCase() ?? "";
    if (!["pdf", "doc", "docx", "jpg", "jpeg", "png"].includes(ext)) {
      setUploadError("Only PDF, DOC, DOCX, JPG or PNG files are allowed.");
      return;
    }
    if (next.size > REPORT_MAX_BYTES) {
      setUploadError("Reports must be under 25 MB.");
      return;
    }
    setFile(next);
  };

  const canUpload =
    !!studentId &&
    !!file &&
    term.trim().length > 0 &&
    selectedParents.size > 0 &&
    progress === null;

  const submit = async () => {
    if (!canUpload || !file || !token) return;
    setUploadError(null);
    setProgress(0);
    try {
      const form = new FormData();
      form.append("file", file);
      form.append("studentId", studentId);
      form.append("term", term.trim());
      form.append("description", description.trim());
      form.append("parentIds", JSON.stringify(Array.from(selectedParents)));
      const res = await uploadWithProgress(form, token, setProgress);
      setProgress(100);
      const studentName = res.report.studentName;
      toast({
        title: "Report shared ✅",
        description: `${res.report.fileName} is now available to ${studentName}'s parent${
          res.report.parents.length === 1 ? "" : "s"
        }.`,
      });
      setFile(null);
      setTerm("");
      setDescription("");
      if (fileInputRef.current) fileInputRef.current.value = "";
      loadMyReports();
    } catch (e) {
      setUploadError(e instanceof Error ? e.message : "Upload failed");
    } finally {
      setProgress(null);
    }
  };

  const confirmDelete = async () => {
    if (!deleteTarget) return;
    setDeleting(true);
    try {
      await api(`/api/reports/${encodeURIComponent(deleteTarget.id)}`, { method: "DELETE" });
      toast({ title: "Report deleted", description: `${deleteTarget.fileName} was removed.` });
      setDeleteTarget(null);
      loadMyReports();
    } catch (e) {
      toast({
        title: "Could not delete",
        description: e instanceof Error ? e.message : "Please try again.",
        variant: "destructive",
      });
    } finally {
      setDeleting(false);
    }
  };

  const selectedStudent = useMemo(
    () => students?.find((s) => s.studentId === studentId),
    [students, studentId]
  );

  return (
    <div className="space-y-5">
      <PageHeader
        emoji="🗂️"
        title="Upload Student Report"
        subtitle="Share term reports and documents privately with a student's parent — files are stored securely and access is granted per parent."
      />

      <div className="grid gap-5 lg:grid-cols-5">
        {/* ------------------------------ form ------------------------------ */}
        <Panel
          title="New report"
          subtitle="PDF, DOC, DOCX, JPG or PNG · up to 25 MB"
          className="lg:col-span-3"
        >
          <div className="space-y-4">
            <Field label="Student" htmlFor="report-student">
              <SelectInput
                id="report-student"
                value={studentId}
                onChange={(e) => setStudentId(e.target.value)}
                disabled={!students || students.length === 0}
              >
                <option value="">
                  {students === null
                    ? "Loading students…"
                    : students.length === 0
                      ? "No students in your classrooms yet"
                      : "Choose a student…"}
                </option>
                {students?.map((s) => (
                  <option key={s.studentId} value={s.studentId}>
                    {s.name} — {s.classroomName}
                  </option>
                ))}
              </SelectInput>
            </Field>

            {/* Parents (loaded per student) */}
            <Field
              label="Share with parent"
              hint="Reports are private — only the parent you select can open them."
            >
              {parentsLoading ? (
                <p className="flex items-center gap-2 py-2 text-xs text-slate-500">
                  <Loader2 className="h-3.5 w-3.5 animate-spin" /> Checking parent account…
                </p>
              ) : parents && parents.length === 0 ? (
                <p className="rounded-lg border border-amber-200 bg-amber-50 px-3 py-2 text-xs text-amber-800">
                  This student has no parent account linked — upload denied until a parent is
                  connected.
                </p>
              ) : (
                <div className="space-y-1">
                  {parents?.map((p) => (
                    <label
                      key={p.id}
                      className="flex min-h-11 cursor-pointer items-center gap-2 rounded-lg border border-slate-200 px-3 py-2 text-sm hover:bg-slate-50"
                    >
                      <Checkbox
                        checked={selectedParents.has(p.id)}
                        onCheckedChange={(v) =>
                          setSelectedParents((prev) => {
                            const next = new Set(prev);
                            if (v) next.add(p.id);
                            else next.delete(p.id);
                            return next;
                          })
                        }
                        aria-label={`Share with ${p.name}`}
                      />
                      <span className="flex-1 truncate font-medium">{p.name}</span>
                      <span className="truncate text-xs text-slate-400">{p.email}</span>
                    </label>
                  ))}
                </div>
              )}
            </Field>

            {/* Dropzone */}
            <div
              onDragOver={(e) => {
                e.preventDefault();
                setDragOver(true);
              }}
              onDragLeave={() => setDragOver(false)}
              onDrop={(e) => {
                e.preventDefault();
                setDragOver(false);
                setFileChecked(e.dataTransfer.files?.[0] ?? null);
              }}
            >
              <label
                htmlFor="report-file"
                className={cn(
                  "flex min-h-28 cursor-pointer flex-col items-center justify-center gap-2 rounded-xl border-2 border-dashed px-4 py-6 text-center transition-colors",
                  dragOver
                    ? "border-emerald-500 bg-emerald-50"
                    : "border-slate-300 bg-slate-50/60 hover:border-emerald-400 hover:bg-emerald-50/40"
                )}
              >
                <input
                  ref={fileInputRef}
                  id="report-file"
                  type="file"
                  accept={REPORT_ACCEPT}
                  className="sr-only"
                  onChange={(e) => setFileChecked(e.target.files?.[0] ?? null)}
                />
                {file ? (
                  <>
                    <FileText className="h-7 w-7 text-emerald-600" aria-hidden />
                    <span className="max-w-full truncate text-sm font-semibold text-slate-800">
                      {file.name}
                    </span>
                    <span className="text-xs text-slate-500">
                      {reportTypeLabel(file.name)} · {fmtBytes(file.size)} — tap to change
                    </span>
                  </>
                ) : (
                  <>
                    <UploadCloud className="h-7 w-7 text-slate-400" aria-hidden />
                    <span className="text-sm font-semibold text-slate-700">
                      Drop a file here or tap to browse
                    </span>
                    <span className="text-xs text-slate-500">PDF · DOC · DOCX · JPG · PNG</span>
                  </>
                )}
              </label>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <Field label="Term" htmlFor="report-term" hint="Shown to the parent, e.g. “Term 1”.">
                <TextInput
                  id="report-term"
                  value={term}
                  onChange={(e) => setTerm(e.target.value)}
                  placeholder="Term 1"
                  maxLength={40}
                  list="report-term-suggestions"
                />
                <datalist id="report-term-suggestions">
                  <option value="Term 1" />
                  <option value="Term 2" />
                  <option value="Term 3" />
                </datalist>
              </Field>
              <Field label="Description (optional)" htmlFor="report-desc">
                <TextareaInput
                  id="report-desc"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="A short note about this report…"
                  rows={2}
                  maxLength={1000}
                />
              </Field>
            </div>

            {progress !== null && (
              <div className="space-y-1" aria-live="polite">
                <Progress value={progress} className="h-2" />
                <p className="text-right text-xs text-slate-500">{progress}% uploaded</p>
              </div>
            )}
            {uploadError && <ErrorNote message={uploadError} />}

            <Button
              onClick={submit}
              disabled={!canUpload}
              className="min-h-11 w-full bg-emerald-600 text-white hover:bg-emerald-700 sm:w-auto"
            >
              {progress !== null ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin" /> Uploading…
                </>
              ) : (
                <>
                  <UploadCloud className="h-4 w-4" /> Upload & share report
                </>
              )}
            </Button>
          </div>
        </Panel>

        {/* --------------------------- my uploads --------------------------- */}
        <Panel
          title="My uploaded reports"
          subtitle="Private to you and the parents you granted."
          className="lg:col-span-2"
        >
          {listLoading && !myReports ? (
            <p className="flex items-center gap-2 py-8 text-sm text-slate-500">
              <Loader2 className="h-4 w-4 animate-spin" /> Loading…
            </p>
          ) : listError ? (
            <ErrorNote message={listError} />
          ) : !myReports || myReports.length === 0 ? (
            <EmptyState
              title="No reports yet"
              hint="Upload your first student report — the parent is notified as soon as it lands."
            />
          ) : (
            <ul className="nice-scroll max-h-96 space-y-2 overflow-y-auto pr-1" aria-label="Uploaded reports">
              {myReports.map((r) => (
                <li
                  key={r.id}
                  className="rounded-xl border border-slate-200 bg-white p-3 transition-colors hover:border-emerald-200"
                >
                  <div className="flex items-start gap-2.5">
                    <span className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-emerald-50 text-emerald-700">
                      <FileText className="h-4 w-4" aria-hidden />
                    </span>
                    <div className="min-w-0 flex-1">
                      <p className="truncate text-sm font-semibold text-slate-900">{r.fileName}</p>
                      <p className="truncate text-xs text-slate-500">
                        {r.studentName} · {r.term} ·{" "}
                        {new Date(r.createdAt).toLocaleDateString("en-US", {
                          month: "short",
                          day: "numeric",
                          year: "numeric",
                        })}
                      </p>
                      <p className="mt-0.5 truncate text-[11px] text-slate-400">
                        Shared with:{" "}
                        {r.parents.length > 0
                          ? r.parents.map((p) => p.parentName).join(", ")
                          : "—"}
                      </p>
                      <div className="mt-2 flex flex-wrap gap-1.5">
                        <Button asChild size="sm" variant="outline" className="h-8 rounded-full">
                          <a
                            href={`/api/reports/${encodeURIComponent(r.id)}/file`}
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            Download
                          </a>
                        </Button>
                        <Button
                          size="sm"
                          variant="outline"
                          className="h-8 rounded-full text-rose-600 hover:bg-rose-50 hover:text-rose-700"
                          onClick={() => setDeleteTarget(r)}
                          aria-label={`Delete ${r.fileName}`}
                        >
                          <Trash2 className="h-3.5 w-3.5" aria-hidden /> Delete
                        </Button>
                      </div>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </Panel>
      </div>

      {rosterError && <ErrorNote message={rosterError} />}

      {/* Delete confirmation */}
      <AlertDialog open={!!deleteTarget} onOpenChange={(v) => !v && setDeleteTarget(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete this report?</AlertDialogTitle>
            <AlertDialogDescription>
              {deleteTarget
                ? `${deleteTarget.fileName} (${deleteTarget.studentName} · ${deleteTarget.term}) will be removed for the parent too. This cannot be undone.`
                : ""}
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel disabled={deleting}>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={(e) => {
                e.preventDefault();
                confirmDelete();
              }}
              disabled={deleting}
              className="bg-rose-600 text-white hover:bg-rose-700"
            >
              {deleting && <Loader2 className="h-4 w-4 animate-spin" />} Delete report
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
