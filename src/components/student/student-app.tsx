"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { Onboarding } from "@/components/learning/onboarding";
import { AppHeader } from "@/components/learning/app-header";
import type { NavKey } from "@/components/learning/app-header";
import { AppFooter } from "@/components/learning/app-footer";
import { Dashboard } from "@/components/learning/dashboard";
import { SubjectsView } from "@/components/learning/subjects-view";
import { SubjectView } from "@/components/learning/subject-view";
import { LessonView } from "@/components/learning/lesson-view";
import { WorksheetsHub } from "@/components/learning/worksheets-hub";
import { PracticeZone } from "@/components/learning/practice-zone";
import { AchievementsView } from "@/components/learning/achievements-view";
import { ProgressView } from "@/components/learning/progress-view";
import { SearchDialog } from "@/components/learning/nav-search";
import { SettingsDialog } from "@/components/learning/settings-dialog";
import { DailyChallengeDialog } from "@/components/learning/daily-challenge-dialog";
import { LearningHelperView } from "@/components/student/learning-helper";
import { MyAssignments } from "@/components/student/my-assignments";
import { StudentReportsSection } from "@/components/student/report-section";
import { CertificatesPanel } from "@/components/student/certificates-panel";
import { NotePad } from "@/components/shared/notepad";
import { RemindersPanel } from "@/components/shared/reminders-panel";
import { ThemeToggle } from "@/components/shared/theme-toggle";
import { HelpButton } from "@/components/shared/howto-guides";
import { GuidedTour } from "@/components/shared/guided-tour";
import { Card, CardContent } from "@/components/ui/card";
import { useStudentStore } from "@/lib/student-store";
import { useAuthStore } from "@/lib/auth-store";
import { api } from "@/lib/api";
import { celebrate } from "@/lib/confetti";
import { AGE_GROUPS, THEMES } from "@/lib/learning-config";
import type { ThemePref, AgeGroup } from "@/lib/content/types";

type LessonTab = "learn" | "quiz" | "worksheet";

type View =
  | { name: "dashboard" }
  | { name: "subjects" }
  | { name: "subject"; subjectId: string }
  | { name: "lesson"; subjectId: string; lessonId: string; tab?: LessonTab }
  | { name: "worksheets" }
  | { name: "practice" }
  | { name: "helper" }
  | { name: "achievements" }
  | { name: "progress" }
  | { name: "reports" }
  | { name: "certificates" };

/** The nav's "Reading" entry opens the dedicated Reading subject. */
const READING_SUBJECT_ID = "reading";

function activeNavKey(view: View): NavKey {
  switch (view.name) {
    case "dashboard":
      return "home";
    case "subjects":
      return "subjects";
    case "subject":
    case "lesson":
      return view.subjectId === READING_SUBJECT_ID ? "reading" : "subjects";
    case "worksheets":
      return "worksheets";
    case "practice":
      return "practice";
    case "helper":
      return "helper";
    case "achievements":
      return "achievements";
    case "progress":
      return "progress";
    case "reports":
      return "reports";
    case "certificates":
      return "certificates";
  }
}

/**
 * The complete student experience (works for guests AND signed-in children —
 * signed-in children hydrate their server profile + progress automatically).
 */
export function StudentApp() {
  const { toast } = useToast();
  const [view, setView] = useState<View>({ name: "dashboard" });
  const [settingsOpen, setSettingsOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [dailyOpen, setDailyOpen] = useState(false);

  const authUser = useAuthStore((s) => s.user);
  const authStudent = useAuthStore((s) => s.student);
  const clearAuth = useAuthStore((s) => s.clear);

  const profile = useStudentStore((s) => s.profile);
  const xp = useStudentStore((s) => s.xp);
  const streak = useStudentStore((s) => s.streak);
  const progress = useStudentStore((s) => s.progress);
  const activeDates = useStudentStore((s) => s.activeDates);
  const worksheetsDone = useStudentStore((s) => s.worksheetsDone);
  const dailyChallenge = useStudentStore((s) => s.dailyChallenge);
  const setProfile = useStudentStore((s) => s.setProfile);
  const updateProfile = useStudentStore((s) => s.updateProfile);
  const hydrateFromServer = useStudentStore((s) => s.hydrateFromServer);
  const markLessonRead = useStudentStore((s) => s.markLessonRead);
  const saveQuizScore = useStudentStore((s) => s.saveQuizScore);
  const claimDailyChallenge = useStudentStore((s) => s.claimDailyChallenge);
  const startFresh = useStudentStore((s) => s.startFresh);

  // Signed-in children adopt their server profile + progress exactly once.
  const hydratedRef = useRef(false);
  useEffect(() => {
    if (hydratedRef.current) return;
    if (authUser?.role !== "STUDENT" || !authStudent) return;
    hydratedRef.current = true;
    api<{
      student: {
        id: string;
        name: string;
        age: number;
        theme: string;
        ageGroup: string;
        avatar: string;
        avatarColor: string;
        photoUrl?: string;
        xp: number;
      };
      progress: {
        subjectId: string;
        lessonId: string;
        score: number | null;
        completedAt: string;
      }[];
    }>(`/api/student/bootstrap?studentId=${encodeURIComponent(authStudent.id)}`)
      .then((data) => {
        hydrateFromServer(
          {
            id: data.student.id,
            name: data.student.name,
            age: data.student.age,
            theme: data.student.theme as ThemePref,
            ageGroup: data.student.ageGroup as AgeGroup,
            avatar: data.student.avatar || authStudent.avatar,
            avatarColor: data.student.avatarColor || authStudent.avatarColor,
            photoUrl: data.student.photoUrl ?? authStudent.photoUrl ?? undefined,
          },
          data.progress,
          data.student.xp
        );
      })
      .catch(() => {
        // Offline or not yet reachable: adopt the profile from the session.
        hydrateFromServer(
          {
            id: authStudent.id,
            name: authStudent.name,
            age: authStudent.age,
            theme: authStudent.theme as ThemePref,
            ageGroup: authStudent.ageGroup as AgeGroup,
            avatar: authStudent.avatar,
            avatarColor: authStudent.avatarColor,
          },
          [],
          authStudent.xp
        );
      });
  }, [authUser, authStudent, hydrateFromServer]);

  const navigate = useCallback((key: NavKey) => {
    switch (key) {
      case "home":
        setView({ name: "dashboard" });
        break;
      case "subjects":
        setView({ name: "subjects" });
        break;
      case "worksheets":
        setView({ name: "worksheets" });
        break;
      case "practice":
        setView({ name: "practice" });
        break;
      case "reading":
        setView({ name: "subject", subjectId: READING_SUBJECT_ID });
        break;
      case "helper":
        setView({ name: "helper" });
        break;
      case "achievements":
        setView({ name: "achievements" });
        break;
      case "progress":
        setView({ name: "progress" });
        break;
      case "reports":
        setView({ name: "reports" });
        break;
      case "certificates":
        setView({ name: "certificates" });
        break;
    }
  }, []);

  // Scroll to top whenever the view changes.
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [view]);

  // Ctrl/Cmd + K opens search.
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        if (useStudentStore.getState().profile) {
          setSearchOpen((v) => !v);
        }
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  const today = new Date().toISOString().slice(0, 10);
  const dailyDone = dailyChallenge?.date === today && dailyChallenge.done;

  // ---------------- First visit: onboarding ----------------
  if (!profile) {
    return (
      <Onboarding
        onDone={({ name, age, theme, avatar, avatarColor }) => {
          setProfile({
            id:
              authUser?.role === "STUDENT" && authStudent
                ? authStudent.id
                : typeof crypto !== "undefined" && "randomUUID" in crypto
                  ? crypto.randomUUID()
                  : `bm-${Date.now()}-${Math.random().toString(36).slice(2)}`,
            name,
            age,
            theme,
            avatar,
            avatarColor,
            ageGroup: AGE_GROUPS[
              age <= 8 ? "early" : age <= 11 ? "primary" : age <= 13 ? "intermediate" : "teen"
            ].id,
          });
          setView({ name: "dashboard" });
          celebrate("big");
          toast({
            title: `Welcome, ${name}! 🎉`,
            description: `Your ${THEMES.find((t) => t.id === theme)?.label} space is ready. Have fun learning!`,
          });
        }}
      />
    );
  }

  const themeClass =
    profile.theme === "pink"
      ? "theme-pink"
      : profile.theme === "blue"
        ? "theme-blue"
        : "theme-neutral";

  const exitStudent = () => {
    if (!authUser && useAuthStore.getState().guest) {
      clearAuth();
      startFresh();
      return;
    }
    if (authUser?.role === "STUDENT") {
      fetch("/api/auth/logout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        ...(useAuthStore.getState().token
          ? { headers: { Authorization: `Bearer ${useAuthStore.getState().token}` } }
          : {}),
      }).catch(() => undefined);
      clearAuth();
      startFresh();
    } else {
      startFresh();
    }
    setView({ name: "dashboard" });
  };

  return (
    <div className={themeClass}>
      <div className="min-h-screen flex flex-col bg-background text-foreground">
        {/* Appearance + help for small screens (lg+ shows them inside the header). */}
        <div className="mx-auto flex w-full max-w-6xl items-center justify-end gap-2 px-4 pt-2 lg:hidden no-print">
          <HelpButton role="student" label="Help" />
          <ThemeToggle />
        </div>

        <AppHeader
          profile={profile}
          xp={xp}
          streak={streak}
          active={activeNavKey(view)}
          onNavigate={navigate}
          onOpenSearch={() => setSearchOpen(true)}
          onOpenSettings={() => setSettingsOpen(true)}
          onSwitchStudent={exitStudent}
        />

        <main className="flex-1 w-full max-w-6xl mx-auto px-4 py-6 sm:py-8">
          {view.name === "dashboard" && (
            <div className="space-y-6" data-tour="dashboard">
              <div data-tour="welcome">
                <Dashboard
                  profile={{
                    name: profile.name,
                    ageGroup: profile.ageGroup,
                    age: profile.age,
                    avatar: profile.avatar,
                    avatarColor: profile.avatarColor,
                    photoUrl: profile.photoUrl,
                  }}
                  xp={xp}
                  progress={progress}
                  onOpenSubject={(subjectId) => setView({ name: "subject", subjectId })}
                  onOpenLesson={(subjectId, lessonId) =>
                    setView({ name: "lesson", subjectId, lessonId })
                  }
                  onOpenAchievements={() => setView({ name: "achievements" })}
                  onOpenDailyChallenge={() => setDailyOpen(true)}
                  dailyChallengeDone={dailyDone}
                />
              </div>
              <div data-tour="assignments">
                <MyAssignments
                  onOpenLesson={(subjectId, lessonId) =>
                    setView({ name: "lesson", subjectId, lessonId })
                  }
                />
              </div>
              {/* Notes + reminders — signed-in children only (needs an account to save). */}
              {authUser && authStudent && (
                <div className="grid gap-4 md:grid-cols-2">
                  <NotePad user={authUser} variant="playful" />
                  <RemindersPanel user={authUser} variant="playful" />
                </div>
              )}
            </div>
          )}

          {view.name === "subjects" && (
            <SubjectsView
              ageGroup={profile.ageGroup}
              progress={progress}
              onOpenSubject={(subjectId) => setView({ name: "subject", subjectId })}
            />
          )}

          {view.name === "subject" && (
            <SubjectView
              key={view.subjectId}
              subjectId={view.subjectId}
              ageGroup={profile.ageGroup}
              progress={progress}
              onBack={() => setView({ name: "subjects" })}
              onOpenLesson={(lessonId) =>
                setView({ name: "lesson", subjectId: view.subjectId, lessonId })
              }
            />
          )}

          {view.name === "lesson" && (
            <LessonView
              key={`${view.subjectId}-${view.lessonId}-${view.tab ?? "learn"}`}
              subjectId={view.subjectId}
              lessonId={view.lessonId}
              ageGroup={profile.ageGroup}
              progress={progress[view.lessonId]}
              initialTab={view.tab}
              onBack={() => setView({ name: "subject", subjectId: view.subjectId })}
              onMarkRead={() => {
                markLessonRead(view.subjectId, view.lessonId);
                celebrate("small");
                toast({
                  title: "Lesson started! 📖",
                  description: "+10 XP earned. Try the quiz for even more!",
                });
              }}
              onQuizScore={(score) => {
                saveQuizScore(view.subjectId, view.lessonId, score);
                toast({
                  title: score >= 80 ? "Quiz smashed! 🏅" : "Quiz complete! 💪",
                  description:
                    score > (progress[view.lessonId]?.score ?? 0)
                      ? `You scored ${score}% — XP added to your bank!`
                      : `You scored ${score}%. Your best stays at ${progress[view.lessonId]?.score ?? score}%.`,
                });
              }}
            />
          )}

          {view.name === "worksheets" && (
            <WorksheetsHub
              defaultAgeGroup={profile.ageGroup}
              studentName={profile.name}
            />
          )}

          {view.name === "practice" && (
            <PracticeZone
              ageGroup={profile.ageGroup}
              dailyChallengeDone={dailyDone}
              onOpenDailyChallenge={() => setDailyOpen(true)}
              onOpenLesson={(subjectId, lessonId) =>
                setView({ name: "lesson", subjectId, lessonId })
              }
            />
          )}

          {view.name === "helper" && <LearningHelperView />}

          {view.name === "achievements" && (
            <AchievementsView
              xp={xp}
              progress={progress}
              onBack={() => setView({ name: "dashboard" })}
            />
          )}

          {view.name === "progress" && (
            <ProgressView
              ageGroup={profile.ageGroup}
              xp={xp}
              progress={progress}
              streak={streak}
              activeDates={activeDates}
              worksheetsDone={worksheetsDone.length}
              onOpenSubject={(subjectId) => setView({ name: "subject", subjectId })}
              onOpenAchievements={() => setView({ name: "achievements" })}
            />
          )}

          {view.name === "reports" && <StudentReportsSection />}

          {view.name === "certificates" &&
            (authStudent ? (
              <div data-tour="certificates">
                <CertificatesPanel
                  studentId={authStudent.id}
                  studentName={authStudent.name}
                />
              </div>
            ) : (
              <Card className="rounded-3xl border-dashed">
                <CardContent className="flex flex-col items-center gap-2 p-8 text-center">
                  <span className="text-4xl" aria-hidden>
                    🏆
                  </span>
                  <p className="font-bold">Certificates live in your account</p>
                  <p className="max-w-sm text-sm text-muted-foreground">
                    Sign in with your code (ask your family for the &quot;Child sign
                    in&quot; code) to earn and print gold certificates!
                  </p>
                </CardContent>
              </Card>
            ))}
        </main>

        <AppFooter />

        <SearchDialog
          open={searchOpen}
          onOpenChange={setSearchOpen}
          ageGroup={profile.ageGroup}
          onSelect={(subjectId, lessonId, tab) => {
            setSearchOpen(false);
            setView({ name: "lesson", subjectId, lessonId, tab });
          }}
        />

        <SettingsDialog
          open={settingsOpen}
          onOpenChange={setSettingsOpen}
          profile={profile}
          onSave={(partial) => {
            updateProfile({ ...partial, photoUrl: partial.photoUrl ?? undefined });
            toast({
              title: "Settings saved ✅",
              description: "Your learning space has been updated.",
            });
          }}
          onSwitchStudent={exitStudent}
        />

        <DailyChallengeDialog
          open={dailyOpen}
          onOpenChange={setDailyOpen}
          ageGroup={profile.ageGroup}
          done={dailyDone}
          studentName={profile.name}
          onClaim={(correct) => {
            if (!dailyDone) {
              claimDailyChallenge();
              if (correct) celebrate("small");
            }
          }}
        />

        {/* One-time guided tour (auto-plays once per signed-in child). */}
        {authUser && authStudent && (
          <GuidedTour role="student" userId={authStudent.id} />
        )}
      </div>
    </div>
  );
}
