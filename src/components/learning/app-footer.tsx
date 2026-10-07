"use client";

import Link from "next/link";

export function AppFooter() {
  return (
    <footer className="mt-auto border-t bg-card/60 no-print">
      <div className="max-w-6xl mx-auto px-4 py-6 pb-safe">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3 text-sm text-muted-foreground">
          <p className="flex items-center gap-1.5">
            { }
            <img src="/images/mascot.png" alt="" aria-hidden className="w-6 h-6 rounded-full object-cover" />
            BrightMinds — made with <span aria-hidden>💛</span> for curious kids everywhere
          </p>
          <nav aria-label="Footer" className="flex items-center gap-4">
            <Link href="#" className="hover:text-foreground transition-colors">
              About
            </Link>
            <Link href="#" className="hover:text-foreground transition-colors">
              For Parents
            </Link>
            <Link href="#" className="hover:text-foreground transition-colors">
              Privacy
            </Link>
          </nav>
        </div>
        <p className="text-center sm:text-left text-xs text-muted-foreground/70 mt-2">
          © {new Date().getFullYear()} BrightMinds Learning. Every learner welcome, every color celebrated. 🌈
        </p>
      </div>
    </footer>
  );
}
