"use client";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Card, CardContent } from "@/components/ui/card";
import { SectionHeading } from "./shared";

// ---------------------------------------------------------------------------
// Admin how-to guide — plain-language instructions for running the platform.
// ---------------------------------------------------------------------------

interface GuideTopic {
  id: string;
  title: string;
  steps: string[];
}

const TOPICS: GuideTopic[] = [
  {
    id: "users",
    title: "Managing user accounts",
    steps: [
      "Open the Users section to see every account, with its role and when it was last active.",
      "Use the role tabs (All / Parents / Teachers / Admins / Students) or the search box to find someone quickly.",
      "Change a person's role with the dropdown next to their row — the change applies immediately.",
      "Delete an account with the trash button. You will be asked to confirm: deletion removes the account's sessions, classrooms, assignments, activities, notifications and child profiles, and cannot be undone.",
      "You cannot change the role of, or delete, your own admin account while signed in.",
    ],
  },
  {
    id: "students-parents",
    title: "Managing students, parents & child profiles",
    steps: [
      "Child profiles are separate from accounts: parents create profiles for their children during onboarding, and each profile has its own age group, XP and progress.",
      "In the Users section, choose the Students tab to list every child profile with its age, age group, linked parent and login code status.",
      "A green 'Set' badge in the Login code column means the child can sign in on devices with their code and PIN.",
      "Deleting a child profile removes their progress, activity log, classroom seats, assignment results, certificates and goal. This cannot be undone.",
      "Parent accounts are linked to children automatically — the Linked column on a parent row shows how many children they have.",
    ],
  },
  {
    id: "teachers-classrooms",
    title: "Managing teachers & classrooms",
    steps: [
      "Teacher accounts create classrooms, set assignments and upload learning materials.",
      "The Classrooms section lists every classroom with its teacher, seat count (enrolled children) and number of assignments.",
      "Classrooms are created, renamed and staffed by teachers from their own dashboard — admins have full visibility but do not need to manage day-to-day seating.",
      "Deleting a teacher account (in Users) removes their classrooms and assignments, so double-check before confirming.",
    ],
  },
  {
    id: "content",
    title: "Subjects & content",
    steps: [
      "The curriculum is organised into subjects (Maths, English, Science, Reading), each with lessons for four age groups: Early (6–8), Primary (9–11), Intermediate (12–13) and Teen (14–15).",
      "The Content section shows the real lesson counts per subject and age group, plus custom activities and assignments teachers have created.",
      "Teachers can upload documents, videos and links with their materials; uploads are stored privately and only shared through assignments.",
      "Lesson content files live in the content pipeline — contact the development team to change the built-in curriculum.",
    ],
  },
  {
    id: "analytics",
    title: "Viewing analytics",
    steps: [
      "The Analytics section shows platform activity over time. Pick a range: Today, 7 days, 30 days, 3 months, 6 months, 12 months, or Custom dates.",
      "Charts cover new registrations, active students, learning minutes, teacher activity, assignment completion, quiz averages, reading activity, certificates and subject usage.",
      "A chart showing 'No data available yet' means nothing was recorded in that period — numbers are never estimated or filled in.",
      "The three 'All-time' cards at the bottom always show totals since launch, independent of the selected range.",
    ],
  },
  {
    id: "permissions",
    title: "Permissions",
    steps: [
      "Every action in the console is checked server-side: only signed-in admins can call admin APIs, and the session is validated on every request.",
      "Roles control what each account can do: PARENT manages child profiles, TEACHER manages classrooms and assignments, ADMIN has full platform access.",
      "Use the Permissions section as a reference for what each role can and cannot see.",
      "When you change someone's role, it takes effect on their next request — no restart needed.",
    ],
  },
  {
    id: "certificates",
    title: "Certificates",
    steps: [
      "Students earn certificates automatically for milestones such as finishing lessons, completing assignments, learning streaks and level-ups.",
      "Each certificate has a unique serial number, a title and the date it was earned.",
      "The Overview section shows the total number of certificates issued platform-wide; the Analytics section shows how many were earned per period.",
      "Certificates belong to the child profile — they move with the student and are removed if the profile is deleted.",
    ],
  },
  {
    id: "settings",
    title: "Platform settings",
    steps: [
      "The Settings section controls platform-wide switches, currently including whether new registration is open or closed.",
      'Closing registration stops new signups; existing users keep full access. The Overview strip shows the current state with a green (open) or red (closed) dot.',
      "Settings changes apply immediately for everyone — no restart required.",
    ],
  },
  {
    id: "monitoring",
    title: "Monitoring system activity",
    steps: [
      "The Overview section is your health check: online users (green dot, active in the last 5 minutes), offline users, active students this week, learning minutes and completed work.",
      "A user counts as online when they made an authenticated request in the last 5 minutes; the Users section shows 'Last active' for every account.",
      "Active students are counted from real learning events (activity log, lesson progress, resource views, assignment results) in the last 7 days.",
      "If numbers look stuck, they will refresh the next time you open the section — everything is read live from the database.",
    ],
  },
  {
    id: "security",
    title: "Security",
    steps: [
      "Passwords are stored only as strong hashes; nobody (including admins) can read them.",
      "Admin sessions expire like any other session — sign out when you finish, especially on shared computers.",
      "Deleting an account also destroys all of its sessions, so removed users are signed out everywhere immediately.",
      "Uploaded materials and student reports are stored in private storage buckets with signed, expiring links — they are never publicly reachable.",
      "If you suspect an account is compromised, delete it or change its role to cut access, then ask the person to re-register.",
    ],
  },
];

export function GuideSection() {
  return (
    <div className="space-y-4">
      <SectionHeading
        title="Guide"
        description="How to run BrightMinds — plain-language instructions for every admin task."
      />
      <Card className="border-zinc-200 py-0">
        <CardContent className="py-2">
          <Accordion type="single" collapsible defaultValue="users" className="w-full">
            {TOPICS.map((t) => (
              <AccordionItem key={t.id} value={t.id}>
                <AccordionTrigger className="text-sm font-semibold text-zinc-900 hover:no-underline">
                  {t.title}
                </AccordionTrigger>
                <AccordionContent className="text-zinc-600">
                  <ul className="list-disc space-y-1.5 pl-5">
                    {t.steps.map((s, i) => (
                      <li key={i}>{s}</li>
                    ))}
                  </ul>
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </CardContent>
      </Card>
      <p className="text-xs text-zinc-500">
        Tip: this guide covers day-to-day administration. For curriculum changes or
        infrastructure work, contact the development team.
      </p>
    </div>
  );
}
