// ---------------------------------------------------------------------------
// Shared types + a tiny safe markdown renderer for the Note Pad.
// Supports exactly the subset the toolbar inserts:
//   ## Heading · **bold** · *italic* · - bullet · plain line breaks
// Everything is escaped first, so notes can never inject HTML.
// ---------------------------------------------------------------------------

export interface NoteItem {
  id: string;
  title: string;
  content: string;
  createdAt: string;
  updatedAt: string;
}

export interface ReminderRepeat {
  /** none | daily | weekly | monthly */
  repeat: "none" | "daily" | "weekly" | "monthly";
}

export interface ReminderItem {
  id: string;
  title: string;
  dueAt: string; // ISO
  repeat: ReminderRepeat["repeat"];
  notes: string;
  done: boolean;
  overdue: boolean;
  createdAt: string;
}

export const NOTE_TITLE_MAX = 120;
export const NOTE_CONTENT_MAX = 20000;
export const REMINDER_TITLE_MAX = 140;
export const REMINDER_NOTES_MAX = 2000;

// ------------------------------ escaping -----------------------------------

function escapeHtml(s: string): string {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

/** Inline passes: strong → em. Input must already be HTML-escaped. */
function inline(escaped: string): string {
  return escaped
    .replace(/\*\*([^*]+)\*\*/g, "<strong>$1</strong>")
    .replace(/\*([^*\n]+)\*/g, "<em>$1</em>");
}

/**
 * Renders the Note Pad markdown subset to safe HTML.
 * Block structure: "## " headings, "- " bullet groups, blank-line paragraphs,
 * single newlines become <br />.
 */
export function renderNoteMarkdown(md: string): string {
  const lines = escapeHtml(md ?? "").split("\n");
  const out: string[] = [];
  let inList = false;

  const closeList = () => {
    if (inList) {
      out.push("</ul>");
      inList = false;
    }
  };

  for (const raw of lines) {
    const line = raw.trimEnd();
    if (/^##\s+/.test(line)) {
      closeList();
      out.push(`<h3 class="note-h">${inline(line.replace(/^##\s+/, ""))}</h3>`);
    } else if (/^[-•]\s+/.test(line)) {
      if (!inList) {
        out.push('<ul class="note-ul">');
        inList = true;
      }
      out.push(`<li>${inline(line.replace(/^[-•]\s+/, ""))}</li>`);
    } else if (line.trim() === "") {
      closeList();
    } else {
      closeList();
      out.push(`<p class="note-p">${inline(line)}</p>`);
    }
  }
  closeList();
  return out.join("\n");
}
