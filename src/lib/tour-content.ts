// ---------------------------------------------------------------------------
// Guided tour content, per role. Each step targets an element carrying
// `data-tour="<selector>"` in the app shells.
//
// REQUIRED data-tour KEYS (orchestrator: add these to the shells):
//   student  → welcome, dashboard, subjects, assignments, progress, certificates
//   teacher  → dashboard, students, classrooms, content, assignments, reports,
//              analytics
//   parent   → dashboard, children, progress, reports, certificates, settings
//   admin    → overview, users, classrooms, content, analytics, permissions,
//              settings
// Missing elements are skipped gracefully by the tour.
// ---------------------------------------------------------------------------

export type TourRole = "student" | "parent" | "teacher" | "admin";

export type TourPosition = "bottom" | "top";

export interface TourStep {
  /** Value of the `data-tour` attribute this step highlights. */
  selector: string;
  title: string;
  text: string;
  /** Where the popover card appears relative to the highlighted element. */
  position: TourPosition;
}

export const TOUR_STEPS: Record<TourRole, TourStep[]> = {
  student: [
    {
      selector: "welcome",
      title: "Welcome, superstar! 🎉",
      text: "This quick tour shows you around. It takes less than a minute — let's go!",
      position: "bottom",
    },
    {
      selector: "dashboard",
      title: "Your Home base 🏠",
      text: "This is your Home. You'll see your XP stars, your streak flame and everything your teacher gave you.",
      position: "bottom",
    },
    {
      selector: "subjects",
      title: "Pick a subject 📚",
      text: "Tap Subjects to explore Math, English, Science and Reading. Every subject is full of adventures!",
      position: "bottom",
    },
    {
      selector: "assignments",
      title: "Your assignments ✅",
      text: "Work your teacher gave you lands here. Finish it before the due date and tap Submit!",
      position: "top",
    },
    {
      selector: "progress",
      title: "Watch yourself grow 📈",
      text: "Progress shows your best scores, your streak and how much you've learned.",
      position: "top",
    },
    {
      selector: "certificates",
      title: "Win certificates 🏆",
      text: "Finish lessons and assignments to earn gold certificates. You can print them and keep them forever!",
      position: "top",
    },
  ],

  teacher: [
    {
      selector: "dashboard",
      title: "Your teaching dashboard 🏫",
      text: "A live snapshot of your classrooms, activity and anything that needs attention.",
      position: "bottom",
    },
    {
      selector: "students",
      title: "Your students 🧒",
      text: "Every student you teach, with progress, activity status and their login codes.",
      position: "bottom",
    },
    {
      selector: "classrooms",
      title: "Classrooms & groups 👥",
      text: "Create classrooms, add students and split them into groups (A, B, C) for differentiated work.",
      position: "bottom",
    },
    {
      selector: "content",
      title: "Upload your content 📤",
      text: "Upload documents, images, videos or audio — or paste a link. Documents are auto-analysed into questions.",
      position: "bottom",
    },
    {
      selector: "assignments",
      title: "Assign work 📌",
      text: "Build assignments from your material and send them to a class, a group or selected students.",
      position: "bottom",
    },
    {
      selector: "reports",
      title: "Student reports 📮",
      text: "Upload private report documents and choose exactly which parent can see each one.",
      position: "top",
    },
    {
      selector: "analytics",
      title: "Analytics 📊",
      text: "Track subject averages, completion and engagement trends across your classrooms.",
      position: "top",
    },
  ],

  parent: [
    {
      selector: "dashboard",
      title: "Welcome to the Family View 👋",
      text: "This is your overview of your child's learning life — quick and calm.",
      position: "bottom",
    },
    {
      selector: "children",
      title: "Your children 🧒",
      text: "Add children, find their login code + PIN, and switch between them any time.",
      position: "bottom",
    },
    {
      selector: "progress",
      title: "Learning progress 📊",
      text: "See completed lessons, best scores and weekly learning minutes for the selected child.",
      position: "bottom",
    },
    {
      selector: "reports",
      title: "School reports 📄",
      text: "Teachers share private reports here. Preview and download them any time.",
      position: "bottom",
    },
    {
      selector: "certificates",
      title: "Certificates 🏆",
      text: "Every award your child earns is kept here — print them for the fridge door!",
      position: "top",
    },
    {
      selector: "settings",
      title: "Settings & appearance ⚙️",
      text: "Manage your account, goals, reminders and try the Eye-Friendly theme for evenings. 🌿",
      position: "top",
    },
  ],

  admin: [
    {
      selector: "overview",
      title: "Platform overview 🌍",
      text: "Live counts of users, classrooms, content and certificates across BrightMinds.",
      position: "bottom",
    },
    {
      selector: "users",
      title: "User management 👤",
      text: "Every parent, teacher and student account — create, edit, change roles or deactivate.",
      position: "bottom",
    },
    {
      selector: "classrooms",
      title: "Classrooms 🏫",
      text: "All classrooms with their teachers, seat counts and assignment volume.",
      position: "bottom",
    },
    {
      selector: "content",
      title: "Content audit 🗂️",
      text: "Review curriculum coverage and teacher-uploaded materials across the platform.",
      position: "bottom",
    },
    {
      selector: "analytics",
      title: "Platform analytics 📊",
      text: "Engagement, growth and activity trends to guide capacity planning.",
      position: "top",
    },
    {
      selector: "permissions",
      title: "Permissions 🛡️",
      text: "What each role can and cannot do — keep the platform safe by design.",
      position: "top",
    },
    {
      selector: "settings",
      title: "Platform settings ⚙️",
      text: "Platform-wide configuration. Changes apply immediately for everyone.",
      position: "top",
    },
  ],
};
