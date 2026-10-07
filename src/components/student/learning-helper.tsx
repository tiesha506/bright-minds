"use client";

import { useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Badge } from "@/components/ui/badge";
import { Bot, Send, Sparkles, Loader2 } from "lucide-react";
import { useStudentStore } from "@/lib/student-store";
import { cn } from "@/lib/utils";

interface ChatMessage {
  role: "student" | "helper";
  text: string;
}

const SUBJECTS = [
  { id: "general", label: "Any subject", emoji: "✨" },
  { id: "math", label: "Math", emoji: "🔢" },
  { id: "english", label: "English", emoji: "✏️" },
  { id: "science", label: "Science", emoji: "🔬" },
  { id: "reading", label: "Reading", emoji: "📖" },
];

const STARTERS = [
  "I'm stuck on simplifying fractions — can you give me a hint?",
  "How do I know where to put a comma?",
  "Why do we Seasons change? Explain simply.",
  "Give me a trick to remember my 7 times tables.",
  "What does 'infer' mean when I'm reading a story?",
];

export function LearningHelperView() {
  const profile = useStudentStore((s) => s.profile);
  const [subject, setSubject] = useState("general");
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      role: "helper",
      text: `Hi${profile ? ` ${profile.name}` : ""}! 👋 I'm your Learning Helper. I won't give you answers — I'll help you figure them out yourself, which is how brains grow strongest! What are you working on?`,
    },
  ]);
  const [input, setInput] = useState("");
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const endRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: "smooth", block: "end" });
  }, [messages, busy]);

  async function send(text: string) {
    const question = text.trim();
    if (!question || busy) return;
    setError(null);
    setInput("");
    setMessages((m) => [...m, { role: "student", text: question }]);
    setBusy(true);
    try {
      const res = await fetch("/api/student/helper", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          question,
          subject,
          age: profile?.age ?? 9,
        }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error ?? "Something went wrong");
      setMessages((m) => [...m, { role: "helper", text: data.reply }]);
    } catch (e) {
      setError(e instanceof Error ? e.message : "Something went wrong");
    } finally {
      setBusy(false);
    }
  }

  return (
    <div className="mx-auto max-w-2xl space-y-4">
      <div className="flex items-center gap-3">
        <span className="flex h-11 w-11 items-center justify-center rounded-full bg-primary/15 text-2xl">
          🤖
        </span>
        <div>
          <h1 className="text-2xl font-extrabold">Learning Helper</h1>
          <p className="text-sm text-muted-foreground">
            I explain and give hints — but never the answer. You&apos;ve got this! 💪
          </p>
        </div>
      </div>

      <div className="flex flex-wrap gap-1.5">
        {SUBJECTS.map((s) => (
          <button
            key={s.id}
            type="button"
            onClick={() => setSubject(s.id)}
            aria-pressed={subject === s.id}
            className={cn(
              "rounded-full border px-3 py-1.5 text-sm font-semibold transition-colors",
              subject === s.id
                ? "border-primary bg-primary/10 text-primary"
                : "bg-muted/50 hover:bg-muted"
            )}
          >
            {s.emoji} {s.label}
          </button>
        ))}
      </div>

      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="flex items-center gap-2 text-base">
            <Sparkles className="h-4 w-4 text-primary" /> Chat with your helper
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <ScrollArea className="h-80 max-h-80 pr-3">
            <div className="space-y-3">
              {messages.map((m, i) => (
                <div
                  key={i}
                  className={cn(
                    "flex gap-2",
                    m.role === "student" ? "justify-end" : "justify-start"
                  )}
                >
                  {m.role === "helper" && (
                    <span className="mt-1 flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-primary/15">
                      <Bot className="h-4 w-4" />
                    </span>
                  )}
                  <p
                    className={cn(
                      "max-w-[85%] whitespace-pre-wrap rounded-2xl px-3.5 py-2.5 text-sm leading-relaxed",
                      m.role === "student"
                        ? "rounded-br-sm bg-primary text-primary-foreground"
                        : "rounded-bl-sm bg-muted"
                    )}
                  >
                    {m.text}
                  </p>
                </div>
              ))}
              {busy && (
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Loader2 className="h-4 w-4 animate-spin" /> Thinking of a good hint…
                </div>
              )}
              <div ref={endRef} />
            </div>
          </ScrollArea>

          {error && (
            <p role="alert" className="rounded-lg bg-destructive/10 px-3 py-2 text-sm text-destructive">
              {error}
            </p>
          )}

          <form
            className="flex gap-2"
            onSubmit={(e) => {
              e.preventDefault();
              send(input);
            }}
          >
            <Input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask for a hint — e.g. how do I add fractions?"
              maxLength={600}
              aria-label="Your question"
            />
            <Button type="submit" disabled={busy || input.trim().length < 2} aria-label="Send question">
              <Send className="h-4 w-4" />
            </Button>
          </form>

          <div className="flex flex-wrap gap-1.5 pt-1">
            {STARTERS.map((s) => (
              <button
                key={s}
                type="button"
                onClick={() => send(s)}
                disabled={busy}
                className="rounded-full bg-muted/60 px-3 py-1 text-xs font-medium text-muted-foreground transition-colors hover:bg-muted hover:text-foreground disabled:opacity-50"
              >
                {s}
              </button>
            ))}
          </div>
        </CardContent>
      </Card>

      <p className="text-center text-xs text-muted-foreground">
        <Badge variant="secondary" className="mr-1">Safe</Badge>
        Learning Helper never opens websites and never asks for personal details.
      </p>
    </div>
  );
}
