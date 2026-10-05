"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Check, ArrowRight, Sparkles } from "lucide-react";
import { cn } from "@/lib/utils";
import { AGE_GROUPS, THEMES, ageToGroup } from "@/lib/learning-config";
import type { AgeGroup, ThemePref } from "@/lib/content/types";

interface OnboardingProps {
  onDone: (profile: { name: string; age: number; theme: ThemePref }) => void;
}

const STEPS = ["Name", "Age", "Style", "Ready"];

export function Onboarding({ onDone }: OnboardingProps) {
  const [step, setStep] = useState(0);
  const [name, setName] = useState("");
  const [age, setAge] = useState<number | null>(null);
  const [theme, setTheme] = useState<ThemePref | null>(null);

  const nameValid = name.trim().length >= 1 && name.trim().length <= 20;
  const group: AgeGroup | null = age ? ageToGroup(age) : null;

  const canNext =
    (step === 0 && nameValid) || (step === 1 && age !== null) || (step === 2 && theme !== null);

  const finish = () => {
    if (!canFinish) return;
    onDone({ name: name.trim(), age: age!, theme: theme! });
  };

  const canFinish = step === 3 && nameValid && age !== null && theme !== null;

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-4 py-8 bg-dots relative overflow-hidden">
      {/* floating decorative shapes */}
      <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
        <span className="absolute top-[8%] left-[6%] text-4xl opacity-30 animate-bounce [animation-duration:3s]">✏️</span>
        <span className="absolute top-[15%] right-[10%] text-4xl opacity-30 animate-bounce [animation-duration:4s]">📚</span>
        <span className="absolute bottom-[12%] left-[12%] text-4xl opacity-30 animate-bounce [animation-duration:3.5s]">🧮</span>
        <span className="absolute bottom-[18%] right-[7%] text-4xl opacity-30 animate-bounce [animation-duration:4.5s]">🔬</span>
      </div>

      <main className="w-full max-w-lg relative">
        {/* Logo + name */}
        <div className="flex flex-col items-center mb-6">
          <div className="w-24 h-24 rounded-full bg-card shadow-lg border-2 border-primary/20 overflow-hidden flex items-center justify-center">
            { }
            <img src="/images/mascot.png" alt="BrightMinds owl mascot" className="w-full h-full object-cover" />
          </div>
          <h1 className="mt-3 text-4xl font-bold text-primary" style={{ fontFamily: "var(--font-fredoka)" }}>
            BrightMinds
          </h1>
          <p className="text-muted-foreground text-center">
            Learning made just for you — ages 6 to 15!
          </p>
        </div>

        {/* Step progress */}
        <div className="flex items-center justify-center gap-2 mb-4" aria-label={`Step ${step + 1} of ${STEPS.length}`}>
          {STEPS.map((label, i) => (
            <div key={label} className="flex items-center gap-2">
              <div
                className={cn(
                  "w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold transition-colors",
                  i < step && "bg-primary text-primary-foreground",
                  i === step && "bg-primary text-primary-foreground ring-4 ring-primary/20",
                  i > step && "bg-muted text-muted-foreground"
                )}
                aria-current={i === step ? "step" : undefined}
              >
                {i < step ? <Check className="w-4 h-4" /> : i + 1}
              </div>
              {i < STEPS.length - 1 && (
                <div className={cn("h-1 w-6 sm:w-10 rounded-full", i < step ? "bg-primary" : "bg-muted")} />
              )}
            </div>
          ))}
        </div>

        <Card className="shadow-xl border-primary/15">
          <CardContent className="p-6 sm:p-8">
            <AnimatePresence mode="wait">
              {step === 0 && (
                <motion.div
                  key="name"
                  initial={{ opacity: 0, x: 30 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -30 }}
                  transition={{ duration: 0.25 }}
                >
                  <h2 className="text-2xl font-bold mb-1">Hello there! 👋</h2>
                  <p className="text-muted-foreground mb-6">What&apos;s your first name?</p>
                  <Input
                    value={name}
                    onChange={(e) => setName(e.target.value.replace(/[^a-zA-Z\s'-]/g, "").slice(0, 20))}
                    placeholder="Type your name…"
                    aria-label="First name"
                    className="h-14 text-xl text-center rounded-2xl border-2 focus-visible:ring-4"
                    autoFocus
                    onKeyDown={(e) => e.key === "Enter" && nameValid && setStep(1)}
                  />
                  {name.length > 0 && !nameValid && (
                    <p className="text-destructive text-sm mt-2 text-center">Please enter a name (1–20 characters).</p>
                  )}
                </motion.div>
              )}

              {step === 1 && (
                <motion.div
                  key="age"
                  initial={{ opacity: 0, x: 30 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -30 }}
                  transition={{ duration: 0.25 }}
                >
                  <h2 className="text-2xl font-bold mb-1">Nice to meet you, {name.trim()}! 🎉</h2>
                  <p className="text-muted-foreground mb-6">How old are you?</p>
                  <div className="grid grid-cols-5 gap-2 sm:gap-3" role="radiogroup" aria-label="Age">
                    {Array.from({ length: 10 }, (_, i) => i + 6).map((a) => (
                      <button
                        key={a}
                        type="button"
                        role="radio"
                        aria-checked={age === a}
                        onClick={() => setAge(a)}
                        className={cn(
                          "h-14 rounded-2xl text-xl font-bold transition-all border-2",
                          age === a
                            ? "bg-primary text-primary-foreground border-primary scale-105 shadow-lg"
                            : "bg-secondary text-secondary-foreground border-transparent hover:border-primary/40 hover:scale-105"
                        )}
                      >
                        {a}
                      </button>
                    ))}
                  </div>
                  {group && (
                    <div className="mt-5 rounded-2xl bg-secondary p-4 text-center animate-in fade-in slide-in-from-bottom-2">
                      <Badge variant="secondary" className="mb-1">
                        {AGE_GROUPS[group].emoji} {AGE_GROUPS[group].range}
                      </Badge>
                      <p className="font-bold text-lg">{AGE_GROUPS[group].label}</p>
                      <p className="text-sm text-muted-foreground">{AGE_GROUPS[group].tagline}</p>
                    </div>
                  )}
                </motion.div>
              )}

              {step === 2 && (
                <motion.div
                  key="theme"
                  initial={{ opacity: 0, x: 30 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -30 }}
                  transition={{ duration: 0.25 }}
                >
                  <h2 className="text-2xl font-bold mb-1">Pick your style! 🎨</h2>
                  <p className="text-muted-foreground mb-1">Choose the colors you like best.</p>
                  <p className="text-xs text-muted-foreground mb-6 flex items-center gap-1">
                    <Sparkles className="w-3 h-3 shrink-0" />
                    Your pick only changes the look — every subject and activity is for everyone!
                  </p>
                  <div className="grid gap-3" role="radiogroup" aria-label="Color theme">
                    {THEMES.map((t) => (
                      <button
                        key={t.id}
                        type="button"
                        role="radio"
                        aria-checked={theme === t.id}
                        onClick={() => setTheme(t.id)}
                        className={cn(
                          "flex items-center gap-4 rounded-2xl border-2 p-4 text-left transition-all hover:scale-[1.02]",
                          theme === t.id
                            ? "border-primary bg-secondary shadow-md ring-2 ring-primary/30"
                            : "border-border bg-card hover:border-primary/40"
                        )}
                      >
                        <div className="flex -space-x-2">
                          {t.swatch.map((c) => (
                            <span
                              key={c}
                              className="w-9 h-9 rounded-full border-2 border-white shadow"
                              style={{ backgroundColor: c }}
                            />
                          ))}
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="font-bold">
                            {t.emoji} {t.label}
                          </p>
                          <p className="text-sm text-muted-foreground">{t.description}</p>
                        </div>
                        {theme === t.id && (
                          <span className="w-6 h-6 rounded-full bg-primary text-primary-foreground flex items-center justify-center">
                            <Check className="w-4 h-4" />
                          </span>
                        )}
                      </button>
                    ))}
                  </div>
                </motion.div>
              )}

              {step === 3 && (
                <motion.div
                  key="done"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.25 }}
                  className="text-center"
                >
                  <div className="w-20 h-20 mx-auto rounded-full bg-secondary flex items-center justify-center text-4xl mb-4">
                    {AGE_GROUPS[group!].emoji}
                  </div>
                  <h2 className="text-2xl font-bold mb-1">You&apos;re all set, {name.trim()}!</h2>
                  <p className="text-muted-foreground mb-6">
                    Your learning adventure is ready.
                  </p>
                  <div className="rounded-2xl border-2 border-dashed border-primary/30 p-4 text-left space-y-2 bg-secondary/40">
                    <p className="flex justify-between gap-4">
                      <span className="text-muted-foreground">Name</span>
                      <span className="font-semibold">{name.trim()}</span>
                    </p>
                    <p className="flex justify-between gap-4">
                      <span className="text-muted-foreground">Age</span>
                      <span className="font-semibold">{age} years old</span>
                    </p>
                    <p className="flex justify-between gap-4">
                      <span className="text-muted-foreground">Level</span>
                      <span className="font-semibold">
                        {AGE_GROUPS[group!].label} ({AGE_GROUPS[group!].range})
                      </span>
                    </p>
                    <p className="flex justify-between gap-4">
                      <span className="text-muted-foreground">Colors</span>
                      <span className="font-semibold">
                        {THEMES.find((t) => t.id === theme)?.emoji}{" "}
                        {THEMES.find((t) => t.id === theme)?.label}
                      </span>
                    </p>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Navigation */}
            <div className="flex items-center justify-between mt-8">
              <Button
                variant="ghost"
                onClick={() => setStep((s) => Math.max(0, s - 1))}
                disabled={step === 0}
              >
                Back
              </Button>
              {step < 3 ? (
                <Button
                  size="lg"
                  disabled={!canNext}
                  onClick={() => setStep((s) => s + 1)}
                  className="rounded-full px-8 font-bold"
                >
                  Next <ArrowRight className="ml-1 w-4 h-4" />
                </Button>
              ) : (
                <Button
                  size="lg"
                  disabled={!canFinish}
                  onClick={finish}
                  className="rounded-full px-8 font-bold"
                >
                  Start learning ✨
                </Button>
              )}
            </div>
            <Progress value={((step + 1) / STEPS.length) * 100} className="mt-6 h-1.5" aria-hidden />
          </CardContent>
        </Card>
      </main>
    </div>
  );
}
