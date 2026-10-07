"use client";

import { useState } from "react";
import { Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { NAV_LINKS, navClick, scrollToSection } from "./shared";
import { cn } from "@/lib/utils";

// ---------------------------------------------------------------------------
// Sticky marketing header: logo, anchor nav (desktop), Log in / Sign up and a
// mobile sheet menu (390px-friendly).
// ---------------------------------------------------------------------------

export function SiteHeader({
  onLogin,
  onSignup,
}: {
  onLogin: () => void;
  onSignup: () => void;
}) {
  const [menuOpen, setMenuOpen] = useState(false);

  function goFromMenu(id: string) {
    setMenuOpen(false);
    // Let the sheet close and unlock body scroll before scrolling.
    window.setTimeout(() => scrollToSection(id), 120);
  }

  return (
    <header className="sticky top-0 z-40 border-b border-neutral-200/70 bg-white/85 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between gap-2 px-4 sm:px-6">
        <a
          href="#home"
          onClick={navClick("home")}
          aria-label="BrightMinds — back to top"
          className="flex shrink-0 items-center gap-2"
        >
          <img
            src="/logo.png"
            alt="BrightMinds logo"
            className="h-9 w-9 rounded-full bg-white shadow-sm"
          />
          <span className="font-display text-lg font-bold tracking-tight text-neutral-900">
            BrightMinds
          </span>
        </a>

        <nav aria-label="Main" className="hidden items-center gap-0.5 lg:flex">
          {NAV_LINKS.map((link) => (
            <a
              key={link.id}
              href={`#${link.id}`}
              onClick={navClick(link.id)}
              className="rounded-full px-3 py-2 text-sm font-medium text-neutral-600 transition-colors hover:bg-neutral-100 hover:text-neutral-900"
            >
              {link.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-1.5">
          <Button
            variant="ghost"
            onClick={onLogin}
            className="hidden rounded-full text-neutral-700 hover:text-neutral-900 sm:inline-flex"
          >
            Log in
          </Button>
          <Button
            onClick={onSignup}
            className="rounded-full bg-amber-500 text-white shadow-sm hover:bg-amber-600"
          >
            Sign up
          </Button>

          {/* Mobile menu */}
          <Sheet open={menuOpen} onOpenChange={setMenuOpen}>
            <SheetTrigger asChild>
              <Button
                variant="outline"
                size="icon"
                aria-label="Open menu"
                className="rounded-full lg:hidden"
              >
                <Menu className="h-5 w-5" aria-hidden />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-72">
              <SheetHeader>
                <SheetTitle className="flex items-center gap-2 text-left">
                  <img
                    src="/logo.png"
                    alt="BrightMinds logo"
                    className="h-8 w-8 rounded-full"
                  />
                  BrightMinds
                </SheetTitle>
                <SheetDescription className="text-left">
                  Personalised learning for ages 6–15
                </SheetDescription>
              </SheetHeader>
              <nav aria-label="Mobile" className="flex flex-col gap-1 px-4">
                {NAV_LINKS.map((link) => (
                  <a
                    key={link.id}
                    href={`#${link.id}`}
                    onClick={(e) => {
                      e.preventDefault();
                      goFromMenu(link.id);
                    }}
                    className={cn(
                      "rounded-xl px-3 py-2.5 text-base font-medium text-neutral-700 transition-colors",
                      "hover:bg-neutral-100 hover:text-neutral-900"
                    )}
                  >
                    {link.label}
                  </a>
                ))}
              </nav>
              <div className="mt-4 flex flex-col gap-2 border-t border-neutral-200 px-4 pt-4">
                <Button
                  variant="outline"
                  className="w-full rounded-full"
                  onClick={() => {
                    setMenuOpen(false);
                    onLogin();
                  }}
                >
                  Log in
                </Button>
                <Button
                  className="w-full rounded-full bg-amber-500 text-white hover:bg-amber-600"
                  onClick={() => {
                    setMenuOpen(false);
                    onSignup();
                  }}
                >
                  Sign up free
                </Button>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
