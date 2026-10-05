"use client";

import { useEffect, useState, useSyncExternalStore } from "react";
import { useToast } from "@/hooks/use-toast";
import { Onboarding } from "@/components/learning/onboarding";
import { AppHeader } from "@/components/learning/app-header";
import { AppFooter } from "@/components/learning/app-footer";
import { Dashboard } from "@/components/learning/dashboard";
import { SubjectView } from "@/components/learning/subject-view";
import { LessonView } from "@/components/learning/lesson-view";
import { AchievementsView } from "@/components/learning/achievements-view";
import { SettingsDialog } from "@/components/learning/settings-dialog";
import { DailyChallengeDialog } from "@/components/learning/daily-challenge-dialog";
import { useStudentStore } from "@/lib/student-store";
import { celebrate } from "@/lib/confetti";
import { AGE_GROUPS, THEMES } from "@/lib/learning-config";
import type { ThemePref } from "@/lib/content/types";

type View =
  | { name: "dashboard" }
  | { name: "subject"; subjectId: string }
  | { name: "lesson"; subjectId: string; lessonId: string }
  | { name: "achievements" };

export default function Home() {
  const { toast } = useToast();
  const [view, setView] = useState<View>({ name: "dashboard" });
  const [settingsOpen, setSettingsOpen] = useState(false);
  const [dailyOpen, setDailyOpen] = useState(false);

  const profile = useStudentStore((s) => s.profile);
  const xp = useStudentStore((s) => s.xp);
  const progress = useStudentStore((s) => s.progress);
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

  // Scroll to top whenever the view changes.
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [view]);

  if (!mounted) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="rounded-2xl overflow-hidden bg-black shadow-lg animate-pulse">
          <img src="/logo.png" alt="BrightMinds" className="h-20 sm:h-24 w-auto" />
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
          const groupKey = age <= 8 ? "early" : age <= 11 ? "primary" : age <= 13 ? "intermediate" : "teen";
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
          onOpenSettings={() => setSettingsOpen(true)}
          onOpenAchievements={() => setView({ name: "achievements" })}
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

          {view.name === "subject" && (
            <SubjectView
              subjectId={view.subjectId}
              ageGroup={profile.ageGroup}
              progress={progress}
              onBack={() => setView({ name: "dashboard" })}
              onOpenLesson={(lessonId) =>
                setView({ name: "lesson", subjectId: view.subjectId, lessonId })
              }
            />
          )}

          {view.name === "lesson" && (
            <LessonView
              subjectId={view.subjectId}
              lessonId={view.lessonId}
              ageGroup={profile.ageGroup}
              progress={progress[view.lessonId]}
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

          {view.name === "achievements" && (
            <AchievementsView
              xp={xp}
              progress={progress}
              onBack={() => setView({ name: "dashboard" })}
            />
          )}
        </main>

        <AppFooter />

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
