import type { AgeGroup } from "@/lib/content/types";
import { subjects, subjectMap } from "@/lib/content";

export interface SearchResult {
  id: string;
  /** Display category shown in results. */
  type: "Lesson" | "Strategy" | "Worksheet" | "Word";
  title: string;
  detail: string;
  subjectId: string;
  subjectName: string;
  subjectEmoji: string;
  lessonId: string;
  /** Which tab to open when the result is clicked. */
  tab: "learn" | "quiz" | "worksheet";
}

/**
 * Builds a search index over the student's OWN age-level content only, so
 * results always respect the student's age (a 7-year-old and a 15-year-old
 * searching "fractions" get different, level-appropriate results).
 */
export function buildSearchIndex(group: AgeGroup): SearchResult[] {
  const results: SearchResult[] = [];
  for (const subject of subjects) {
    for (const lesson of subject.lessons[group]) {
      const base = {
        subjectId: subject.id,
        subjectName: subject.name,
        subjectEmoji: subject.emoji,
        lessonId: lesson.id,
      };
      results.push({
        id: `${lesson.id}:lesson`,
        type: "Lesson",
        title: `${lesson.emoji} ${lesson.title}`,
        detail: lesson.intro,
        ...base,
        tab: "learn",
      });
      if (lesson.strategyLab) {
        for (const ex of lesson.strategyLab) {
          for (const m of ex.methods) {
            results.push({
              id: `${lesson.id}:method:${m.name}`,
              type: "Strategy",
              title: `${m.emoji} ${m.name}`,
              detail: `A different way to solve: ${ex.problem}`,
              ...base,
              tab: "learn",
            });
          }
        }
      }
      if (lesson.challenge) {
        results.push({
          id: `${lesson.id}:challenge`,
          type: "Strategy",
          title: `🌟 Challenge: ${lesson.title}`,
          detail: lesson.challenge.prompt,
          ...base,
          tab: "learn",
        });
      }
      if (lesson.worksheet.length > 0) {
        results.push({
          id: `${lesson.id}:worksheet`,
          type: "Worksheet",
          title: `${lesson.title} — Worksheet`,
          detail: `${lesson.worksheet.length} practice activities with instant checking`,
          ...base,
          tab: "worksheet",
        });
      }
      for (const v of lesson.vocab) {
        results.push({
          id: `${lesson.id}:word:${v.word}`,
          type: "Word",
          title: `${v.word}`,
          detail: `${v.meaning} (from ${lesson.title})`,
          ...base,
          tab: "learn",
        });
      }
    }
  }
  return results;
}

export function searchContent(
  index: SearchResult[],
  query: string,
  limit = 12
): SearchResult[] {
  const q = query.trim().toLowerCase();
  if (!q) return [];
  const words = q.split(/\s+/);
  const scored = index
    .map((r) => {
      const haystack = `${r.title} ${r.detail} ${r.subjectName}`.toLowerCase();
      let score = 0;
      for (const w of words) {
        if (!haystack.includes(w)) return { r, score: -1 };
        if (r.title.toLowerCase().includes(w)) score += 3;
        if (haystack.startsWith(w)) score += 2;
        score += 1;
      }
      // Type priority: lessons and strategies above vocab.
      const typeBoost =
        r.type === "Lesson" ? 2 : r.type === "Strategy" || r.type === "Worksheet" ? 1.5 : 0;
      return { r, score: score + typeBoost };
    })
    .filter((x) => x.score > 0)
    .sort((a, b) => b.score - a.score);
  return scored.slice(0, limit).map((x) => x.r);
}

/** All subject ids available to a student (core + bonus). */
export function allSubjectIds(): string[] {
  return Object.keys(subjectMap);
}
