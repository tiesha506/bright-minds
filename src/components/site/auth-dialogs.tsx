"use client";

import { useState } from "react";
import type { FormEvent } from "react";
import {
  GraduationCap,
  HeartHandshake,
  Loader2,
  LogIn,
  UserPlus,
} from "lucide-react";
import { api } from "@/lib/api";
import { useAuthStore, type AuthStudent, type AuthUser } from "@/lib/auth-store";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { cn } from "@/lib/utils";

// ---------------------------------------------------------------------------
// Login + Sign Up dialogs for the public site. On success they write the
// session into the auth store — the app shell reacts and swaps PublicSite for
// the correct role dashboard (nothing else to do, and we never clear auth).
// ---------------------------------------------------------------------------

interface LoginResponse {
  token: string;
  user: AuthUser;
}
interface StudentLoginResponse extends LoginResponse {
  student: AuthStudent;
}
type SignupResponse = LoginResponse

/** Server messages are already friendly; make network hiccups friendly too. */
function friendlyError(err: unknown, fallback: string): string {
  const msg = err instanceof Error ? err.message : "";
  if (!msg || msg.startsWith("Request failed")) return fallback;
  return msg;
}

function ErrorText({ children }: { children: string }) {
  return (
    <p role="alert" className="text-sm font-medium text-rose-600">
      {children}
    </p>
  );
}

/* ------------------------------- LOGIN ---------------------------------- */

export function LoginDialog({
  open,
  onOpenChange,
  onSwitchToSignup,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSwitchToSignup: () => void;
}) {
  const [tab, setTab] = useState<"email" | "student">("email");

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailError, setEmailError] = useState<string | null>(null);
  const [emailLoading, setEmailLoading] = useState(false);

  const [code, setCode] = useState("");
  const [pin, setPin] = useState("");
  const [studentError, setStudentError] = useState<string | null>(null);
  const [studentLoading, setStudentLoading] = useState(false);

  function switchTab(value: string) {
    setTab(value === "student" ? "student" : "email");
    setEmailError(null);
    setStudentError(null);
  }

  async function submitEmail(e: FormEvent) {
    e.preventDefault();
    if (emailLoading) return;
    setEmailError(null);
    if (!email.trim() || !password) {
      setEmailError("Enter your email and password to sign in.");
      return;
    }
    setEmailLoading(true);
    try {
      const data = await api<LoginResponse>("/api/auth/login", {
        method: "POST",
        body: { email: email.trim(), password },
      });
      // Shell reacts to the session and swaps this site away — nothing else to do.
      useAuthStore.getState().setSession(data.user, data.token);
    } catch (err) {
      setEmailLoading(false);
      setEmailError(friendlyError(err, "Could not sign in right now — please try again."));
    }
  }

  async function submitStudent(e: FormEvent) {
    e.preventDefault();
    if (studentLoading) return;
    setStudentError(null);
    const cleanCode = code.trim().toUpperCase();
    if (!cleanCode) {
      setStudentError("Enter the code from your parent or teacher.");
      return;
    }
    if (!/^\d{4}$/.test(pin.trim())) {
      setStudentError("Your PIN is the 4 digits your parent or teacher gave you.");
      return;
    }
    setStudentLoading(true);
    try {
      const data = await api<StudentLoginResponse>("/api/auth/student-login", {
        method: "POST",
        body: { code: cleanCode, pin: pin.trim() },
      });
      // Shell reacts — never clear auth after this.
      useAuthStore.getState().setSession(data.user, data.token);
      useAuthStore.getState().setStudent(data.student);
    } catch (err) {
      setStudentLoading(false);
      setStudentError(friendlyError(err, "Could not sign in right now — please try again."));
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="rounded-3xl border-neutral-200 p-6 sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="font-display text-xl font-bold text-neutral-900">
            Welcome back 👋
          </DialogTitle>
          <DialogDescription>
            Sign in to continue your learning journey.
          </DialogDescription>
        </DialogHeader>

        <Tabs value={tab} onValueChange={switchTab} className="gap-4">
          <TabsList className="h-auto w-full grid-cols-2 rounded-2xl p-1">
            <TabsTrigger
              value="email"
              className="rounded-xl py-2 text-xs sm:text-sm data-[state=active]:bg-white data-[state=active]:shadow-sm"
            >
              Email account
            </TabsTrigger>
            <TabsTrigger
              value="student"
              className="rounded-xl py-2 text-xs sm:text-sm data-[state=active]:bg-white data-[state=active]:shadow-sm"
            >
              I&apos;m a Student
            </TabsTrigger>
          </TabsList>

          {/* ---- Email / password (PARENT · TEACHER · ADMIN) ---- */}
          <TabsContent value="email">
            <form onSubmit={submitEmail} className="space-y-4" noValidate>
              <div className="space-y-2">
                <Label htmlFor="login-email">Email</Label>
                <Input
                  id="login-email"
                  type="text"
                  inputMode="email"
                  autoComplete="username"
                  placeholder="you@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  aria-invalid={!!emailError}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="login-password">Password</Label>
                <Input
                  id="login-password"
                  type="password"
                  autoComplete="current-password"
                  placeholder="Your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  aria-invalid={!!emailError}
                />
              </div>
              {emailError && <ErrorText>{emailError}</ErrorText>}
              <Button
                type="submit"
                disabled={emailLoading}
                className="w-full rounded-full bg-amber-500 font-semibold text-white hover:bg-amber-600"
              >
                {emailLoading ? (
                  <Loader2 className="h-4 w-4 animate-spin" aria-hidden />
                ) : (
                  <LogIn className="h-4 w-4" aria-hidden />
                )}
                {emailLoading ? "Signing in…" : "Sign in"}
              </Button>
            </form>
          </TabsContent>

          {/* ---- Code + PIN (STUDENT) ---- */}
          <TabsContent value="student">
            <form onSubmit={submitStudent} className="space-y-4" noValidate>
              <div className="space-y-2">
                <Label htmlFor="login-code">Class or family code</Label>
                <Input
                  id="login-code"
                  placeholder="e.g. DEMO-2026"
                  autoCapitalize="characters"
                  autoCorrect="off"
                  spellCheck={false}
                  value={code}
                  onChange={(e) => setCode(e.target.value.toUpperCase())}
                  className="tracking-widest uppercase"
                  aria-invalid={!!studentError}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="login-pin">4-digit PIN</Label>
                <Input
                  id="login-pin"
                  inputMode="numeric"
                  autoComplete="off"
                  maxLength={4}
                  placeholder="••••"
                  value={pin}
                  onChange={(e) => setPin(e.target.value.replace(/\D/g, "").slice(0, 4))}
                  className="tracking-[0.4em]"
                  aria-invalid={!!studentError}
                />
              </div>
              {studentError && <ErrorText>{studentError}</ErrorText>}
              <Button
                type="submit"
                disabled={studentLoading}
                className="w-full rounded-full bg-violet-600 font-semibold text-white hover:bg-violet-700"
              >
                {studentLoading ? (
                  <Loader2 className="h-4 w-4 animate-spin" aria-hidden />
                ) : (
                  <LogIn className="h-4 w-4" aria-hidden />
                )}
                {studentLoading ? "Signing in…" : "Sign in as a student"}
              </Button>
            </form>
          </TabsContent>
        </Tabs>

        <p className="text-center text-sm text-neutral-500">
          New to BrightMinds?{" "}
          <button
            type="button"
            onClick={onSwitchToSignup}
            className="font-semibold text-neutral-900 underline decoration-amber-400 decoration-2 underline-offset-2 hover:text-amber-700"
          >
            Create a free account
          </button>
        </p>
      </DialogContent>
    </Dialog>
  );
}

/* ------------------------------- SIGN UP -------------------------------- */

export function SignupDialog({
  open,
  onOpenChange,
  onSwitchToLogin,
  role,
  onRoleChange,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSwitchToLogin: () => void;
  /** Lifted to PublicSite so section CTAs can preselect the role. */
  role: "PARENT" | "TEACHER";
  onRoleChange: (role: "PARENT" | "TEACHER") => void;
}) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function submit(e: FormEvent) {
    e.preventDefault();
    if (loading) return;
    setError(null);
    if (name.trim().length < 2) {
      setError("Please tell us your name.");
      return;
    }
    if (!/^\S+@\S+\.\S+$/.test(email.trim())) {
      setError("That email doesn't look quite right — mind checking it?");
      return;
    }
    if (password.length < 8) {
      setError("Please choose a password with at least 8 characters.");
      return;
    }
    setLoading(true);
    try {
      const data = await api<SignupResponse>("/api/auth/signup", {
        method: "POST",
        body: { name: name.trim(), email: email.trim(), password, role },
      });
      // Shell reacts — nothing else to do, never clear auth.
      useAuthStore.getState().setSession(data.user, data.token);
    } catch (err) {
      setLoading(false);
      setError(friendlyError(err, "Could not create the account — please try again."));
    }
  }

  const roleOptions = [
    {
      value: "PARENT" as const,
      icon: HeartHandshake,
      label: "Parent",
      hint: "Follow your child's progress",
    },
    {
      value: "TEACHER" as const,
      icon: GraduationCap,
      label: "Teacher",
      hint: "Run classrooms & assignments",
    },
  ];

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="rounded-3xl border-neutral-200 p-6 sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="font-display text-xl font-bold text-neutral-900">
            Create your free account ✨
          </DialogTitle>
          <DialogDescription>
            Takes less than a minute — your dashboards are ready right after.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={submit} className="space-y-4" noValidate>
          {/* Role toggle */}
          <div
            role="radiogroup"
            aria-label="I am signing up as a…"
            className="grid grid-cols-2 gap-2"
          >
            {roleOptions.map((option) => {
              const checked = role === option.value;
              return (
                <button
                  key={option.value}
                  type="button"
                  role="radio"
                  aria-checked={checked}
                  onClick={() => onRoleChange(option.value)}
                  className={cn(
                    "rounded-2xl border-2 p-3 text-left transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
                    checked
                      ? "border-amber-400 bg-amber-50"
                      : "border-neutral-200 bg-white hover:border-neutral-300"
                  )}
                >
                  <span
                    aria-hidden
                    className={cn(
                      "flex h-9 w-9 items-center justify-center rounded-xl",
                      checked ? "bg-amber-100 text-amber-700" : "bg-neutral-100 text-neutral-500"
                    )}
                  >
                    <option.icon className="h-4.5 w-4.5" aria-hidden />
                  </span>
                  <p className="mt-2 text-sm font-bold text-neutral-900">{option.label}</p>
                  <p className="text-xs text-neutral-500">{option.hint}</p>
                </button>
              );
            })}
          </div>

          <div className="space-y-2">
            <Label htmlFor="signup-name">Your name</Label>
            <Input
              id="signup-name"
              autoComplete="name"
              placeholder="e.g. Sam Taylor"
              value={name}
              onChange={(e) => setName(e.target.value)}
              aria-invalid={!!error}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="signup-email">Email</Label>
            <Input
              id="signup-email"
              type="email"
              autoComplete="email"
              placeholder="you@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              aria-invalid={!!error}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="signup-password">Password</Label>
            <Input
              id="signup-password"
              type="password"
              autoComplete="new-password"
              placeholder="At least 8 characters"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              aria-invalid={!!error}
            />
          </div>

          {error && <ErrorText>{error}</ErrorText>}

          <Button
            type="submit"
            disabled={loading}
            className="w-full rounded-full bg-amber-500 font-semibold text-white hover:bg-amber-600"
          >
            {loading ? (
              <Loader2 className="h-4 w-4 animate-spin" aria-hidden />
            ) : (
              <UserPlus className="h-4 w-4" aria-hidden />
            )}
            {loading ? "Creating your account…" : `Create my ${role === "PARENT" ? "parent" : "teacher"} account`}
          </Button>

          <p className="rounded-2xl bg-violet-50 px-3 py-2.5 text-xs leading-relaxed text-violet-800">
            <span aria-hidden>👧</span> Students don&apos;t need an email account —
            they sign in with a code from their parent or teacher.
          </p>
        </form>

        <p className="text-center text-sm text-neutral-500">
          Already have an account?{" "}
          <button
            type="button"
            onClick={onSwitchToLogin}
            className="font-semibold text-neutral-900 underline decoration-amber-400 decoration-2 underline-offset-2 hover:text-amber-700"
          >
            Log in
          </button>
        </p>
      </DialogContent>
    </Dialog>
  );
}
