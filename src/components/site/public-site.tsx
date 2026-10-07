"use client";

import { useCallback, useEffect, useState } from "react";
import { ShieldCheck } from "lucide-react";
import { useAuthStore } from "@/lib/auth-store";
import { SiteHeader } from "./site-header";
import { SiteHero } from "./site-hero";
import {
  AboutSection,
  FeaturesSection,
  HowItWorksSection,
  SubjectsSection,
} from "./site-sections";
import { ParentsSection, TeachersSection } from "./site-audience";
import { LoginDialog, SignupDialog } from "./auth-dialogs";
import { navClick } from "./shared";

// ---------------------------------------------------------------------------
// PublicSite — the signed-out marketing site. page.tsx renders this when
// there is no user and no guest session. All auth actions write the session
// into the auth store and the app shell takes over from there.
// ---------------------------------------------------------------------------

export function PublicSite() {
  const [authDialog, setAuthDialog] = useState<"login" | "signup" | null>(null);
  const [signupRole, setSignupRole] = useState<"PARENT" | "TEACHER">("PARENT");

  const openLogin = useCallback(() => setAuthDialog("login"), []);

  const openSignup = useCallback((role: "PARENT" | "TEACHER" = "PARENT") => {
    setSignupRole(role);
    setAuthDialog("signup");
  }, []);

  const startGuest = useCallback(() => {
    // Shell swaps PublicSite for the guest student app — nothing else to do.
    useAuthStore.getState().startGuest();
  }, []);

  return (
    <div className="flex min-h-screen flex-col bg-white text-neutral-900 antialiased">
      <SiteHeader onLogin={openLogin} onSignup={() => openSignup()} />

      <main className="flex-1">
        <SiteHero
          onStart={() => openSignup()}
          onGuest={startGuest}
          onLogin={openLogin}
        />
        <AboutSection />
        <HowItWorksSection />
        <SubjectsSection />
        <FeaturesSection />
        <ParentsSection onSignup={() => openSignup("PARENT")} />
        <TeachersSection onSignup={() => openSignup("TEACHER")} />
      </main>

      <SiteFooter onLogin={openLogin} />

      {/* Auth dialogs — keyboard accessible (Radix), stay mounted and hidden. */}
      <LoginDialog
        open={authDialog === "login"}
        onOpenChange={(o) => {
          if (!o) setAuthDialog(null);
        }}
        onSwitchToSignup={() => setAuthDialog("signup")}
      />
      <SignupDialog
        open={authDialog === "signup"}
        onOpenChange={(o) => {
          if (!o) setAuthDialog(null);
        }}
        onSwitchToLogin={() => setAuthDialog("login")}
        role={signupRole}
        onRoleChange={setSignupRole}
      />
    </div>
  );
}

/* -------------------------------- FOOTER -------------------------------- */

function SiteFooter({ onLogin }: { onLogin: () => void }) {
  return (
    <footer className="mt-auto border-t border-neutral-200 bg-neutral-50">
      <div className="mx-auto grid max-w-6xl gap-8 px-4 py-10 sm:grid-cols-2 sm:px-6 md:grid-cols-4">
        <div className="md:col-span-2">
          <div className="flex items-center gap-2">
            <img
              src="/logo.png"
              alt="BrightMinds logo"
              className="h-9 w-9 rounded-full bg-white shadow-sm"
            />
            <span className="font-display text-lg font-bold tracking-tight text-neutral-900">
              BrightMinds
            </span>
          </div>
          <p className="mt-3 max-w-sm text-sm leading-relaxed text-neutral-500">
            Personalised learning for ages 6–15 across Mathematics, English, Science
            and Reading — for curious kids, supportive parents and creative teachers.
          </p>
        </div>

        <nav aria-label="Explore">
          <h2 className="text-sm font-bold text-neutral-900">Explore</h2>
          <ul className="mt-3 space-y-2 text-sm">
            <li>
              <a
                href="#about"
                onClick={navClick("about")}
                className="text-neutral-500 transition-colors hover:text-neutral-900"
              >
                About
              </a>
            </li>
            <li>
              <a
                href="#parents"
                onClick={navClick("parents")}
                className="text-neutral-500 transition-colors hover:text-neutral-900"
              >
                For Parents
              </a>
            </li>
            <li>
              <a
                href="#teachers"
                onClick={navClick("teachers")}
                className="text-neutral-500 transition-colors hover:text-neutral-900"
              >
                For Teachers
              </a>
            </li>
            <li>
              <button
                type="button"
                onClick={onLogin}
                className="text-neutral-500 transition-colors hover:text-neutral-900"
              >
                Log in
              </button>
            </li>
          </ul>
        </nav>

        <div>
          <h2 className="text-sm font-bold text-neutral-900">Child safety</h2>
          <p className="mt-3 flex items-start gap-1.5 text-sm leading-relaxed text-neutral-500">
            <ShieldCheck className="mt-0.5 h-4 w-4 shrink-0 text-emerald-600" aria-hidden />
            Designed for children under 13 with privacy in mind — we collect only
            what learning needs.
          </p>
        </div>
      </div>

      <div className="border-t border-neutral-200 px-4 py-4 text-center text-xs text-neutral-400 sm:px-6">
        © 2026 BrightMinds. Made with care for curious kids. 💛
      </div>
    </footer>
  );
}
