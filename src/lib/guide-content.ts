// ---------------------------------------------------------------------------
// How-To guide content, per role. Consumed by <HowToGuides role={...} />.
// Student copy uses simple, friendly wording; adult roles get plain how-tos.
// ---------------------------------------------------------------------------

export type GuideRole = "student" | "parent" | "teacher" | "admin";

export interface GuideStep {
  text: string;
  /** Optional extra hint shown under the step. */
  tip?: string;
}

export interface GuideChapter {
  title: string;
  emoji: string;
  steps: GuideStep[];
}

export const GUIDES: Record<GuideRole, GuideChapter[]> = {
  // ------------------------------------------------------------------ STUDENT
  student: [
    {
      title: "Sign in with your code",
      emoji: "🔑",
      steps: [
        {
          text: "On the first screen, tap “I'm a Student”.",
          tip: "Ask a grown-up if you can't find your code.",
        },
        { text: "Type your special code (like AXK-42Q) in the first box." },
        { text: "Type your 4-number PIN in the second box." },
        { text: "Tap the big Sign In button — you're in! 🎉" },
      ],
    },
    {
      title: "Look around your Home",
      emoji: "🏠",
      steps: [
        { text: "Your Home page shows your name, stars (XP) and flame streak." },
        { text: "Scroll down to see what your teacher gave you to do." },
        { text: "Tap the ☰ menu (or the icons at the top) to jump anywhere." },
        { text: "Tap Search 🔍 to find any lesson super fast." },
      ],
    },
    {
      title: "Find your subjects",
      emoji: "📚",
      steps: [
        { text: "Tap “Subjects” in the menu." },
        { text: "You'll see Math, English, Science and Reading cards." },
        { text: "Tap a subject to see all the lessons inside it." },
        { text: "Lessons with a ✓ are already done. Try a new one!" },
      ],
    },
    {
      title: "Complete assignments",
      emoji: "✅",
      steps: [
        { text: "On your Home page, find the “My Assignments” box." },
        { text: "Assignments from your teacher show a due date and a color." },
        { text: "Tap an assignment to open it." },
        { text: "Answer the questions, then tap Submit to finish it.",
          tip: "Finish all your work before the due date for a happy teacher!" },
      ],
    },
    {
      title: "Submit your work",
      emoji: "📮",
      steps: [
        { text: "When you finish a quiz or worksheet, check your answers." },
        { text: "Tap the Submit button at the bottom." },
        { text: "You'll see your score right away — great job!" },
        { text: "Your teacher and parents can now see that you finished. 👏" },
      ],
    },
    {
      title: "Watch videos",
      emoji: "🎬",
      steps: [
        { text: "Some lessons and assignments have videos inside." },
        { text: "Tap the big play button ▶ to start the video." },
        { text: "Use the speaker icon if you need it louder or quieter." },
      ],
    },
    {
      title: "Listen to audio",
      emoji: "🎧",
      steps: [
        { text: "Lessons with a 🎧 icon have sound you can listen to." },
        { text: "Tap the play button to hear the story or instructions." },
        { text: "You can pause any time and play again later." },
      ],
    },
    {
      title: "Do worksheets",
      emoji: "📝",
      steps: [
        { text: "Tap “Worksheets” in the menu." },
        { text: "Pick a worksheet that looks fun." },
        { text: "Fill in the answers — typing, matching or drawing." },
        { text: "Tap Check to see how you did, or Print to keep a paper copy." },
      ],
    },
    {
      title: "Use your Note Pad",
      emoji: "📓",
      steps: [
        { text: "Open the Helper (🤖) or Settings to find your Note Pad." },
        { text: "Tap New Note and give it a name." },
        { text: "Write anything you want to remember — only you can see it." },
      ],
    },
    {
      title: "Set reminders",
      emoji: "⏰",
      steps: [
        { text: "Open Settings and find Reminders." },
        { text: "Tap Add Reminder and write what to remember, like “Reading time!”." },
        { text: "Pick a day and time, and choose if it repeats." },
        { text: "You'll get a friendly reminder when it's time. ⏰" },
      ],
    },
    {
      title: "See your progress",
      emoji: "📈",
      steps: [
        { text: "Tap “Progress” in the menu." },
        { text: "See your XP, streak and how many lessons you finished." },
        { text: "Each subject shows your best quiz score." },
      ],
    },
    {
      title: "Earn & download certificates",
      emoji: "🏆",
      steps: [
        { text: "Finish assignments and lessons to earn certificates." },
        { text: "Your certificates show in the Certificates panel with a gold frame." },
        { text: "Tap Download to open your certificate." },
        { text: "Tap Print / Save PDF — ask a grown-up to help you keep it!" },
      ],
    },
    {
      title: "Meet your Learning Helper",
      emoji: "🤖",
      steps: [
        { text: "Tap “Helper” in the menu to open your Learning Helper." },
        { text: "Ask it anything about your lessons — it explains kindly." },
        { text: "It can give you hints, but it never does the work for you!" },
      ],
    },
  ],

  // ------------------------------------------------------------------ PARENT
  parent: [
    {
      title: "Create or link your child",
      emoji: "🧒",
      steps: [
        { text: "Sign in to your parent account and open the Children page." },
        { text: "Tap Add Child and fill in their name and age." },
        { text: "BrightMinds creates a login code + 4-digit PIN for them." },
        {
          text: "Share that code and PIN with your child for their own sign-in.",
          tip: "The code is how your child signs in on any device.",
        },
      ],
    },
    {
      title: "Sign in to your account",
      emoji: "🔐",
      steps: [
        { text: "Open BrightMinds and tap Parent on the first screen." },
        { text: "Enter your email and password, then tap Sign In." },
        { text: "Forgot your password? Use the reset link on the sign-in card." },
      ],
    },
    {
      title: "Switch between children",
      emoji: "🔀",
      steps: [
        { text: "Open the Children page from the menu." },
        { text: "Tap the child you want to look at." },
        { text: "Progress, reports and certificates update to that child." },
      ],
    },
    {
      title: "View your child's progress",
      emoji: "📊",
      steps: [
        { text: "Open Progress for the selected child." },
        { text: "See lessons completed, best scores and weekly minutes." },
        { text: "Subjects with lower averages are flagged as “needs support”." },
      ],
    },
    {
      title: "View assignments",
      emoji: "🗂️",
      steps: [
        { text: "Assignments from teachers appear on your child's overview." },
        { text: "Each card shows the due date and whether it's completed." },
        { text: "Overdue work is marked so you can gently remind your child." },
      ],
    },
    {
      title: "View & download reports",
      emoji: "📄",
      steps: [
        { text: "Open the Reports page to see documents shared by teachers." },
        { text: "Tap a report to preview it." },
        { text: "Tap Download to save a copy to your device." },
        {
          text: "You only see reports the teacher shared with you — they're private.",
        },
      ],
    },
    {
      title: "View & download certificates",
      emoji: "🏆",
      steps: [
        { text: "Open Certificates for your child." },
        { text: "Every certificate your child earned is listed with its serial." },
        { text: "Tap Download to open the print-ready certificate." },
        { text: "Print it or save as PDF to celebrate! 🎉" },
      ],
    },
    {
      title: "Set learning goals",
      emoji: "🎯",
      steps: [
        { text: "Open Goals for your child." },
        { text: "Choose daily minutes and a weekly lesson target." },
        { text: "Pick priority subjects your child should focus on first." },
        { text: "Save — your child's dashboard gently follows these goals." },
      ],
    },
    {
      title: "Create reminders",
      emoji: "⏰",
      steps: [
        { text: "Open Reminders from the menu." },
        { text: "Tap New Reminder, write a title and pick a date and time." },
        { text: "Choose to repeat daily, weekly or monthly." },
        { text: "Mark reminders done with a tap when finished." },
      ],
    },
    {
      title: "Account settings",
      emoji: "⚙️",
      steps: [
        { text: "Open Settings from the header menu." },
        { text: "Update your name, profile photo or password." },
        { text: "Sign out securely from any device when you're done." },
      ],
    },
    {
      title: "Change the appearance",
      emoji: "🎨",
      steps: [
        { text: "In Settings, open the Appearance card." },
        { text: "Choose Light, Dark or Eye-Friendly mode." },
        {
          text: "Eye-Friendly uses soft cream colours that are gentle in the evening.",
          tip: "Appearance never changes learning difficulty — that follows your child's age.",
        },
      ],
    },
    {
      title: "Understanding progress reports",
      emoji: "🧭",
      steps: [
        { text: "Average score shows how your child is doing across quizzes." },
        { text: "Weekly minutes show time actually spent learning." },
        { text: "“Needs support” flags appear when scores drop under 60%." },
        {
          text: "Use goals + reminders together to build a steady routine.",
          tip: "Small daily sessions beat one long weekly session.",
        },
      ],
    },
  ],

  // ----------------------------------------------------------------- TEACHER
  teacher: [
    {
      title: "Create classrooms",
      emoji: "🏫",
      steps: [
        { text: "Open Classrooms and tap New Classroom." },
        { text: "Give it a name and a grade label (e.g. “Grade 4B”)." },
        { text: "The classroom appears on your dashboard with its student count." },
      ],
    },
    {
      title: "Add students",
      emoji: "➕",
      steps: [
        { text: "Open a classroom and tap Add Student." },
        { text: "Enter the student's name and age — BrightMinds sets their age group." },
        { text: "A login code + PIN is generated; give it to the student." },
        { text: "Students appear instantly in the roster and can sign in." },
      ],
    },
    {
      title: "Create groups",
      emoji: "👥",
      steps: [
        { text: "Inside a classroom, each student can be given a group (A, B, C…)." },
        { text: "Open the student's row and set or change their group name." },
        { text: "Assign work to a whole group for easy differentiation." },
      ],
    },
    {
      title: "Upload lesson plans & materials",
      emoji: "📤",
      steps: [
        { text: "Open the Content page and tap Upload." },
        { text: "Choose a document, image, video or audio file." },
        { text: "Pick the subject and topic so it's easy to find later." },
        {
          text: "PDFs and Word documents are read automatically to build questions.",
        },
      ],
    },
    {
      title: "Add links",
      emoji: "🔗",
      steps: [
        { text: "On the Content page, choose Link instead of Upload." },
        { text: "Paste a video or website URL and give it a title." },
        { text: "Linked resources can be attached to assignments like uploads." },
      ],
    },
    {
      title: "Scan documents",
      emoji: "📷",
      steps: [
        { text: "On the Upload dialog, pick or take a photo of a worksheet page." },
        { text: "The text is extracted (OCR) from the image automatically." },
        { text: "Check the extracted text and fix anything that looks off." },
      ],
    },
    {
      title: "Create questions from material",
      emoji: "🧠",
      steps: [
        { text: "After uploading, tap Analyse to process the document." },
        {
          text: "BrightMinds extracts objectives, vocabulary and question ideas grounded in YOUR text.",
        },
        { text: "Review, edit or delete generated questions before using them." },
        { text: "Mark the material Ready when you're happy with it." },
      ],
    },
    {
      title: "Assign work & group work",
      emoji: "📌",
      steps: [
        { text: "Open Assignments and tap New Assignment." },
        { text: "Choose a lesson, material or custom activity as the source." },
        { text: "Pick the class, a specific group, or hand-select students." },
        { text: "Set difficulty, question count and an optional due date." },
        {
          text: "Group selections automatically target every student in that group.",
        },
      ],
    },
    {
      title: "Upload student reports",
      emoji: "📮",
      steps: [
        { text: "Open Reports and tap Upload Report." },
        { text: "Choose the student and the file (PDF, image, document)." },
        { text: "Select which parent/guardian may see this report." },
        {
          text: "Only that parent can open it — reports are private by design.",
        },
      ],
    },
    {
      title: "See who's online",
      emoji: "🟢",
      steps: [
        { text: "Rosters show a green dot for students active in the last 7 days." },
        { text: "Grey dots mean the student hasn't been active recently." },
        { text: "Status updates as students use their accounts — no setup needed." },
      ],
    },
    {
      title: "Track student progress",
      emoji: "📈",
      steps: [
        { text: "Open a classroom or the Students page." },
        { text: "Each student shows lessons done, average score and last active." },
        { text: "“Needs support” highlights anyone averaging under 60%." },
      ],
    },
    {
      title: "Use the Note Pad",
      emoji: "📓",
      steps: [
        { text: "Open your Note Pad from the menu." },
        { text: "Keep lesson ideas, to-dos or planning notes here." },
        { text: "Notes are private to your account." },
      ],
    },
    {
      title: "Set reminders",
      emoji: "⏰",
      steps: [
        { text: "Open Reminders from the menu." },
        { text: "Add a title, due date and optional repeat pattern." },
        { text: "Great for marking deadlines or parent meetings." },
      ],
    },
    {
      title: "Read analytics",
      emoji: "📊",
      steps: [
        { text: "Open Analytics to see class-wide trends." },
        { text: "Compare subject averages, completion and activity over time." },
        { text: "Spot struggling students early with the support list." },
      ],
    },
  ],

  // ------------------------------------------------------------------- ADMIN
  admin: [
    {
      title: "Manage users",
      emoji: "👤",
      steps: [
        { text: "Open Users to browse all accounts." },
        { text: "Filter by role: parents, teachers, students or admins." },
        { text: "Create, edit or deactivate accounts as needed." },
        { text: "Deactivating keeps history but blocks sign-in." },
      ],
    },
    {
      title: "Manage students & parents",
      emoji: "🧒",
      steps: [
        { text: "The Students list shows every learner with age group and parent." },
        { text: "Re-link a student to a different parent if a family changes." },
        { text: "Login codes and PINs can be regenerated for any child." },
      ],
    },
    {
      title: "Manage classrooms & subjects",
      emoji: "🏫",
      steps: [
        { text: "Classrooms lists every class with its teacher and size." },
        { text: "Move students between classrooms when they change classes." },
        { text: "Subjects and their content can be reviewed on the Content page." },
      ],
    },
    {
      title: "Manage content",
      emoji: "🗂️",
      steps: [
        { text: "Open Content to audit uploaded materials platform-wide." },
        { text: "Remove anything that doesn't meet the platform rules." },
        { text: "Content is private and served via signed URLs only." },
      ],
    },
    {
      title: "Read analytics",
      emoji: "📊",
      steps: [
        { text: "The Overview shows platform-wide counts at a glance." },
        { text: "Analytics charts show growth, activity and engagement trends." },
        { text: "Use trends to plan capacity and outreach." },
      ],
    },
    {
      title: "Permissions",
      emoji: "🛡️",
      steps: [
        { text: "Open Permissions to see role capabilities." },
        { text: "Roles: STUDENT, PARENT, TEACHER and ADMIN — each has strict scopes." },
        { text: "Promote a trusted user to teacher from the Users page." },
      ],
    },
    {
      title: "Certificates",
      emoji: "🏆",
      steps: [
        { text: "The admin view shows certificate counts by kind." },
        { text: "Certificates are earned automatically by real student milestones." },
        { text: "Recent awards list the latest certificates with student names." },
      ],
    },
    {
      title: "Platform settings",
      emoji: "⚙️",
      steps: [
        { text: "Open Settings to manage platform-level configuration." },
        { text: "Changes apply immediately for all users." },
      ],
    },
    {
      title: "Monitor activity",
      emoji: "📡",
      steps: [
        { text: "Online status is based on real last-seen heartbeats." },
        { text: "The overview highlights active users in the last minutes and days." },
        { text: "Sudden drops in activity are the first sign of access problems." },
      ],
    },
    {
      title: "Security",
      emoji: "🔒",
      steps: [
        { text: "Passwords are scrypt-hashed; sessions are bearer tokens." },
        { text: "Student files and reports live in private storage buckets." },
        { text: "Never share admin credentials — rotate them if exposed." },
        { text: "Sign out ends the server session immediately." },
      ],
    },
  ],
};
