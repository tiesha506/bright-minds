"use client";

import { useCallback, useEffect, useState, useSyncExternalStore } from "react";
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
import { useStudentStore } from "@/lib/student-store";
import { celebrate } from "@/lib/confetti";
import { AGE_GROUPS, THEMES } from "@/lib/learning-config";
import type { ThemePref } from "@/lib/content/types";

type LessonTab = "learn" | "quiz" | "worksheet";

type View =
  | { name: "dashboard" }
  | { name: "subjects" }
  | { name: "subject"; subjectId: string }
  | { name: "lesson"; subjectId: string; lessonId: string; tab?: LessonTab }
  | { name: "worksheets" }
  | { name: "practice" }
  | { name: "achievements" }
  | { name: "progress" };

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
    case "achievements":
      return "achievements";
    case "progress":
      return "progress";
  }
}

export default function Home() {
  const { toast } = useToast();
  const [view, setView] = useState<View>({ name: "dashboard" });
  const [settingsOpen, setSettingsOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [dailyOpen, setDailyOpen] = useState(false);

  const profile = useStudentStore((s) => s.profile);
  const xp = useStudentStore((s) => s.xp);
  const streak = useStudentStore((s) => s.streak);
  const progress = useStudentStore((s) => s.progress);
  const activeDates = useStudentStore((s) => s.activeDates);
  const worksheetsDone = useStudentStore((s) => s.worksheetsDone);
  const dailyChallenge = useStudentStore((s) => s.dailyChallenge);
  const setProfile = useStudentStore((s) => s.setProfile);
  const updateProfile = useStudentStore((s) => s.updateProfile);
  const markLessonRead = useStudentStore((s) => s.markLessonRead);
  const saveQuizScore = useStudentStore((s) => s.saveQuizScore);
  const claimDailyChallenge = useStudentStore((s) => s.claimDailyChallenge);
  const startFresh = useStudentStore((s) => s.startFresh);

  // Hydration-safe "mounted" check (avoids SSR/localStorage mismatch).
  const mounted = useSyncExternalStore(
    () => () => {},
    () => true,
    () => false
  );

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
      case "achievements":
        setView({ name: "achievements" });
        break;
      case "progress":
        setView({ name: "progress" });
        break;
    }
  }, []);

  // Scroll to top whenever the view changes.
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [view]);

  // Ctrl/Cmd + K opens search (only for signed-in students).
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

  if (!mounted) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="rounded-full overflow-hidden bg-white shadow-lg animate-pulse">
          <img src="/logo.png" alt="BrightMinds" className="h-24 sm:h-28 w-auto" />
        </div>
      </div>
    );
  }

  const today = new Date().toISOString().slice(0, 10);
  const dailyDone = dailyChallenge?.date === today && dailyChallenge.done;

  // ---------------- First visit: onboarding ----------------
  if (!profile) {
    return (
      <Onboarding
        onDone={({ name, age, theme }) => {
          setProfile({
            id:
              typeof crypto !== "undefined" && "randomUUID" in crypto
                ? crypto.randomUUID()
                : `bm-${Date.now()}-${Math.random().toString(36).slice(2)}`,
            name,
            age,
            theme,
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

  return (
    <div className={themeClass}>
      <div className="min-h-screen flex flex-col bg-background text-foreground">
        <AppHeader
          profile={profile}
          xp={xp}
          streak={streak}
          active={activeNavKey(view)}
          onNavigate={navigate}
          onOpenSearch={() => setSearchOpen(true)}
          onOpenSettings={() => setSettingsOpen(true)}
          onSwitchStudent={() => {
            startFresh();
            setView({ name: "dashboard" });
          }}
        />

        <main className="flex-1 w-full max-w-6xl mx-auto px-4 py-6 sm:py-8">
          {view.name === "dashboard" && (
            <Dashboard
              profile={{ name: profile.name, ageGroup: profile.ageGroup, age: profile.age }}
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
            updateProfile(partial);
            toast({
              title: "Settings saved ✅",
              description: "Your learning space has been updated.",
            });
          }}
          onSwitchStudent={() => {
            startFresh();
            setSettingsOpen(false);
            setView({ name: "dashboard" });
          }}
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
      </div>
    </div>
  );
}
