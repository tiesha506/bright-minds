"use client";

import { useMemo, useState } from "react";
import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import { AGE_GROUPS } from "@/lib/learning-config";
import { buildSearchIndex, searchContent } from "@/lib/search-index";
import type { AgeGroup } from "@/lib/content/types";

interface SearchDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  ageGroup: AgeGroup;
  onSelect: (subjectId: string, lessonId: string, tab: "learn" | "quiz" | "worksheet") => void;
}

export function SearchDialog({ open, onOpenChange, ageGroup, onSelect }: SearchDialogProps) {
  const [query, setQuery] = useState("");
  const group = AGE_GROUPS[ageGroup];

  const index = useMemo(() => buildSearchIndex(ageGroup), [ageGroup]);
  const results = useMemo(() => searchContent(index, query), [index, query]);

  // Clearing on close means every open starts with a fresh query.
  const handleOpenChange = (next: boolean) => {
    if (!next) setQuery("");
    onOpenChange(next);
  };

  const grouped = useMemo(() => {
    const map = new Map<string, typeof results>();
    for (const r of results) {
      const list = map.get(r.type) ?? [];
      list.push(r);
      map.set(r.type, list);
    }
    return map;
  }, [results]);

  return (
    <CommandDialog open={open} onOpenChange={handleOpenChange}>
      <CommandInput
        value={query}
        onValueChange={setQuery}
        placeholder="Search lessons, strategies, worksheets, words…"
      />
      <CommandList className="nice-scroll">
        <CommandEmpty>
          {query.trim()
            ? "Nothing found for your level yet — try another word!"
            : "Type to search your level's content."}
        </CommandEmpty>
        <p className="px-4 pt-1 pb-2 text-xs text-muted-foreground">
          Showing {group.emoji} {group.label} content ({group.range}) — matched to your age.
        </p>
        {[...grouped.entries()].map(([type, items]) => (
          <CommandGroup
            key={type}
            heading={
              type === "Lesson"
                ? "📘 Lessons"
                : type === "Strategy"
                  ? "🧠 Methods & strategies"
                  : type === "Worksheet"
                    ? "📝 Worksheets"
                    : "🔤 Key words"
            }
          >
            {items.map((r) => (
              <CommandItem
                key={r.id}
                value={`${r.title} ${r.detail} ${r.subjectName}`}
                onSelect={() => {
                  onOpenChange(false);
                  onSelect(r.subjectId, r.lessonId, r.tab);
                }}
                className="cursor-pointer"
              >
                <div className="flex flex-col min-w-0">
                  <span className="font-semibold truncate">{r.title}</span>
                  <span className="text-xs text-muted-foreground line-clamp-1">
                    {r.subjectEmoji} {r.subjectName} · {r.detail}
                  </span>
                </div>
              </CommandItem>
            ))}
          </CommandGroup>
        ))}
      </CommandList>
    </CommandDialog>
  );
}
