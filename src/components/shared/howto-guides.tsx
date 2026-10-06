"use client";

import { useMemo, useState } from "react";
import { CircleHelp, LifeBuoy, Search, X } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { DropdownMenuItem } from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { GUIDES, type GuideRole, type GuideChapter } from "@/lib/guide-content";
import { cn } from "@/lib/utils";

function filterChapters(chapters: GuideChapter[], query: string): GuideChapter[] {
  const q = query.trim().toLowerCase();
  if (!q) return chapters;
  return chapters
    .map((chapter) => {
      const titleHit = chapter.title.toLowerCase().includes(q);
      const steps = chapter.steps.filter(
        (s) =>
          s.text.toLowerCase().includes(q) ||
          (s.tip ?? "").toLowerCase().includes(q)
      );
      if (titleHit) return chapter;
      return steps.length > 0 ? { ...chapter, steps } : null;
    })
    .filter((c): c is GuideChapter => c !== null);
}

/**
 * Role-specific How-To guides in a searchable, accordion dialog.
 * Students get bigger, friendlier text with simpler wording.
 */
export function HowToGuides({
  role,
  open: openProp,
  onOpenChange: onOpenChangeProp,
  trigger,
}: {
  role: GuideRole;
  /** Optional controlled open state (shells can drive the dialog themselves). */
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  /** Optional custom trigger element. */
  trigger?: React.ReactNode;
}) {
  const [uncontrolledOpen, setUncontrolledOpen] = useState(false);
  const [query, setQuery] = useState("");

  const open = openProp ?? uncontrolledOpen;
  const setOpen = onOpenChangeProp ?? setUncontrolledOpen;

  const chapters = GUIDES[role];
  const filtered = useMemo(() => filterChapters(chapters, query), [chapters, query]);
  const student = role === "student";
  const totalSteps = chapters.reduce((n, c) => n + c.steps.length, 0);

  return (
    <Dialog
      open={open}
      onOpenChange={(v) => {
        setOpen(v);
        if (!v) setQuery("");
      }}
    >
      {trigger && <DialogTrigger asChild>{trigger}</DialogTrigger>}
      <DialogContent className="flex max-h-[85vh] flex-col gap-0 overflow-hidden p-0 sm:max-w-xl">
        <DialogHeader className="border-b px-5 pt-5 pb-4">
          <DialogTitle className="font-display flex items-center gap-2 text-xl sm:text-2xl">
            <LifeBuoy className="h-6 w-6 text-primary" aria-hidden="true" />
            How-To Guide {student && "🤝"}
          </DialogTitle>
          <DialogDescription>
            {chapters.length} chapters · {totalSteps} steps
            {student ? " — tap a chapter to open it!" : ""}
          </DialogDescription>
        </DialogHeader>

        <div className="border-b px-5 py-3">
          <div className="relative">
            <Search
              className="text-muted-foreground pointer-events-none absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2"
              aria-hidden="true"
            />
            <Input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search the guide… (e.g. certificate, upload)"
              aria-label="Search the guide"
              className="pl-9"
            />
            {query && (
              <button
                type="button"
                onClick={() => setQuery("")}
                aria-label="Clear search"
                className="text-muted-foreground hover:text-foreground absolute top-1/2 right-2 min-h-11 min-w-11 -translate-y-1/2 rounded-full p-3"
              >
                <X className="h-4 w-4" aria-hidden="true" />
              </button>
            )}
          </div>
        </div>

        <div className="nice-scroll flex-1 overflow-y-auto px-5 py-2">
          {filtered.length === 0 ? (
            <div className="py-10 text-center">
              <p className="font-display text-lg font-semibold">No matches for “{query}” 🔍</p>
              <p className="text-muted-foreground mt-1 text-sm">
                Try another word, like “report” or “password”.
              </p>
            </div>
          ) : (
            <Accordion
              type="single"
              collapsible
              defaultValue={filtered[0] ? `chapter-${chapters.indexOf(filtered[0])}` : undefined}
              className="w-full"
            >
              {filtered.map((chapter) => {
                const originalIndex = chapters.indexOf(chapter);
                return (
                  <AccordionItem key={`${chapter.title}-${originalIndex}`} value={`chapter-${originalIndex}`}>
                    <AccordionTrigger
                      className={cn(
                        "hover:no-underline",
                        student ? "text-base font-semibold sm:text-lg" : "text-[15px] font-semibold"
                      )}
                    >
                      <span className="flex items-center gap-2.5">
                        <span aria-hidden="true" className="text-xl">
                          {chapter.emoji}
                        </span>
                        {chapter.title}
                      </span>
                    </AccordionTrigger>
                    <AccordionContent>
                      <ol className={cn("space-y-3", student && "text-base sm:text-lg")}>
                        {chapter.steps.map((step, i) => (
                          <li key={i} className="flex gap-3">
                            <span
                              className="bg-primary/10 text-primary mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full text-xs font-bold"
                              aria-hidden="true"
                            >
                              {i + 1}
                            </span>
                            <span>
                              <span className="leading-relaxed">{step.text}</span>
                              {step.tip && (
                                <span className="text-muted-foreground mt-1 block text-sm">
                                  💡 {step.tip}
                                </span>
                              )}
                            </span>
                          </li>
                        ))}
                      </ol>
                    </AccordionContent>
                  </AccordionItem>
                );
              })}
            </Accordion>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}

/**
 * Drop-in help entry for dropdown menus. Opens the How-To dialog for the role.
 */
export function HelpMenuItem({ role, label = "How-To Guide" }: { role: GuideRole; label?: string }) {
  const [open, setOpen] = useState(false);
  return (
    <>
      <DropdownMenuItem
        onSelect={(e) => {
          e.preventDefault();
          setOpen(true);
        }}
        className="cursor-pointer"
      >
        <CircleHelp className="mr-2 h-4 w-4" aria-hidden="true" />
        {label}
      </DropdownMenuItem>
      <HowToGuides role={role} open={open} onOpenChange={setOpen} />
    </>
  );
}

/** Simple button version for headers/toolbars. */
export function HelpButton({ role, label = "Help" }: { role: GuideRole; label?: string }) {
  return (
    <HowToGuides
      role={role}
      trigger={
        <Button variant="outline" size="sm" className="min-h-11 rounded-full">
          <CircleHelp className="mr-1.5 h-4 w-4" aria-hidden="true" />
          {label}
        </Button>
      }
    />
  );
}
