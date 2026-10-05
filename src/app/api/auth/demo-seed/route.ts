import { db } from "@/lib/db";
import { hashPassword } from "@/lib/server/auth";

/**
 * POST /api/auth/demo-seed — idempotently create demo accounts with realistic
 * data so every dashboard can be explored immediately:
 *   parent@demo.com / demo1234        (children: Alex 8, Jordan 11, Mia 14)
 *   teacher@demo.com / demo1234       (classroom "Grade 5 Mathematics", 12 students)
 *   admin@brightminds.app / admin1234
 *   Student demo login: code DEMO-2026, PIN 8246 (Alex)
 */
function dayKey(offsetDays: number): string {
  const d = new Date();
  d.setDate(d.getDate() - offsetDays);
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(
    d.getDate()
  ).padStart(2, "0")}`;
}

function iso(offsetDays: number): Date {
  const d = new Date();
  d.setDate(d.getDate() - offsetDays);
  d.setHours(16, 30, 0, 0);
  return d;
}

export async function POST() {
  try {
    const existing = await db.user.findUnique({ where: { email: "parent@demo.com" } });
    if (existing) {
      return Response.json({ ok: true, seeded: false, reason: "already-seeded" });
    }

    // ------------------------- accounts -------------------------
    const parent = await db.user.create({
      data: {
        email: "parent@demo.com",
        passwordHash: hashPassword("demo1234"),
        name: "Sam Taylor",
        role: "PARENT",
      },
    });
    const teacher = await db.user.create({
      data: {
        email: "teacher@demo.com",
        passwordHash: hashPassword("demo1234"),
        name: "Ms. Rivera",
        role: "TEACHER",
      },
    });
    await db.user.create({
      data: {
        email: "admin@brightminds.app",
        passwordHash: hashPassword("admin1234"),
        name: "Platform Admin",
        role: "ADMIN",
      },
    });

    // ------------------- parent's three children -------------------
    // score map: subject -> quiz% (null = only read)
    async function child(
      name: string,
      age: number,
      ageGroup: string,
      avatar: string,
      avatarColor: string,
      loginCode: string,
      scores: Record<string, (number | null)[]>
    ) {
      const student = await db.student.create({
        data: {
          id: `demo-${name.toLowerCase()}`,
          name,
          age,
          theme: "neutral",
          ageGroup,
          xp: 240 + Math.floor(Math.random() * 260),
          avatar,
          avatarColor,
          loginCode,
          pin: "8246",
          parentId: parent.id,
        },
      });

      // One progress row per entry, spread across the last 3 weeks.
      let day = 20;
      for (const [subjectId, list] of Object.entries(scores)) {
        let i = 1;
        for (const score of list) {
          await db.progress.upsert({
            where: {
              studentId_lessonId: {
                studentId: student.id,
                lessonId: `${subjectId}-${ageGroup}-${i}`,
              },
            },
            update: {},
            create: {
              studentId: student.id,
              subjectId,
              lessonId: `${subjectId}-${ageGroup}-${i}`,
              score,
              completedAt: iso(day),
            },
          });
          day = Math.max(1, day - 2);
          i += 1;
        }
      }

      // Activity minutes for the last 10 days (varied).
      for (let d = 0; d < 10; d++) {
        const subjects = ["math", "reading", "english", "science"];
        const minutes = [0, 8, 12, 15, 20, 10, 18, 22, 14, 25][d];
        if (minutes === 0) continue;
        const subjectId = subjects[d % subjects.length];
        await db.activityLog.upsert({
          where: {
            studentId_day_subjectId: { studentId: student.id, day: dayKey(d), subjectId },
          },
          update: {},
          create: {
            studentId: student.id,
            day: dayKey(d),
            subjectId,
            minutes,
          },
        });
      }
      return student;
    }

    // Alex 8: strong science, reading needs practice (matches the spec example).
    const alex = await child("Alex", 8, "early", "🦊", "orange", "DEMO-2026", {
      math: [80, 75, 78, null],
      english: [90, 84, 88, null],
      science: [95, 91, 88, 92],
      reading: [65, 72, 60, 58],
    });
    const jordan = await child("Jordan", 11, "primary", "🐼", "teal", "JRD-1131", {
      math: [70, 66, 74],
      english: [82, 79, 85],
      science: [88, 91, 84],
      reading: [76, 81, 79],
    });
    const mia = await child("Mia", 14, "teen", "🦉", "violet", "MIA-1402", {
      math: [84, 88, 91],
      english: [79, 83, 86],
      science: [90, 94, 89],
      reading: [87, 84, 90],
    });

    await db.goal.create({
      data: {
        studentId: alex.id,
        dailyMinutes: 15,
        weeklyLessonTarget: 4,
        prioritySubjects: JSON.stringify(["reading", "math"]),
        note: "Building reading confidence this term.",
      },
    });

    // Warm notifications for the parent.
    await db.notification.createMany({
      data: [
        {
          userId: parent.id,
          childId: alex.id,
          childName: "Alex",
          kind: "completion",
          text: "Alex completed today's reading activity.",
          createdAt: iso(0),
        },
        {
          userId: parent.id,
          childId: mia.id,
          childName: "Mia",
          kind: "score",
          text: "Mia has improved her reading score this week (84% → 90%).",
          createdAt: iso(1),
        },
        {
          userId: parent.id,
          childId: alex.id,
          childName: "Alex",
          kind: "suggestion",
          text: "Alex may benefit from additional fraction practice — try the recommended worksheet.",
          createdAt: iso(1),
        },
      ],
    });

    // ---------------------- teacher classroom ----------------------
    const classroom = await db.classroom.create({
      data: {
        name: "Grade 5 Mathematics",
        gradeLabel: "Grade 5 · Ages 10-11",
        teacherId: teacher.id,
      },
    });

    const roster: [string, number, string, string, string, number | null][] = [
      ["Aisha Rahman", 11, "🐼", "teal", "B", 78],
      ["Diego Santos", 10, "🦁", "amber", "B", 84],
      ["Noor Haddad", 11, "🦉", "violet", "A", 93],
      ["Kai Jensen", 10, "🚀", "teal", "A", 90],
      ["Zara Okafor", 11, "🌟", "rose", "B", 72],
      ["Tomás Silva", 10, "🐢", "emerald", "C", 46],
      ["Priya Patel", 11, "🦄", "rose", "A", 88],
      ["Leo Moreau", 10, "🐸", "emerald", "C", 52],
      ["Ines Kowalski", 11, "🐬", "teal", "B", 75],
      ["Dev Anand", 10, "⚡", "orange", "C", 41],
      ["May Chen", 11, "🌈", "violet", "B", 69],
      ["Otto Berg", 10, "🐝", "amber", "C", 48],
    ];

    let seatDay = 18;
    for (const [name, age, avatar, avatarColor, group, mathScore] of roster) {
      const slug = name.toLowerCase().replace(/[^a-z]/g, "").slice(0, 8);
      const student = await db.student.create({
        data: {
          id: `demo-cl-${slug}`,
          name,
          age,
          theme: "neutral",
          ageGroup: age <= 11 ? "primary" : "intermediate",
          xp: 120 + Math.floor(Math.random() * 300),
          avatar,
          avatarColor,
          loginCode: `STU-${Math.floor(1000 + Math.random() * 8999)}`,
          pin: "8246",
        },
      });
      await db.classroomStudent.create({
        data: { classroomId: classroom.id, studentId: student.id, groupName: group },
      });

      // A few subject rows per student (math from roster; reading weaker for group C).
      await db.progress.upsert({
        where: {
          studentId_lessonId: { studentId: student.id, lessonId: "math-primary-1" },
        },
        update: {},
        create: {
          studentId: student.id,
          subjectId: "math",
          lessonId: "math-primary-1",
          score: mathScore,
          completedAt: iso(seatDay),
        },
      });
      await db.progress.upsert({
        where: {
          studentId_lessonId: { studentId: student.id, lessonId: "math-primary-2" },
        },
        update: {},
        create: {
          studentId: student.id,
          subjectId: "math",
          lessonId: "math-primary-2",
          score: mathScore === null ? null : Math.max(30, mathScore - 6),
          completedAt: iso(Math.max(1, seatDay - 2)),
        },
      });
      const readingScore =
        group === "C" ? Math.max(28, (mathScore ?? 45) - 18) : (mathScore ?? 60) + 4;
      await db.progress.upsert({
        where: {
          studentId_lessonId: { studentId: student.id, lessonId: "reading-primary-1" },
        },
        update: {},
        create: {
          studentId: student.id,
          subjectId: "reading",
          lessonId: "reading-primary-1",
          score: Math.min(98, readingScore),
          completedAt: iso(Math.max(1, seatDay - 4)),
        },
      });
      // Weekly minutes so class analytics have data.
      for (let d = 0; d < 7; d++) {
        const minutes = group === "A" ? 18 + d : group === "B" ? 10 + d : 4 + d;
        await db.activityLog.upsert({
          where: {
            studentId_day_subjectId: {
              studentId: student.id,
              day: dayKey(d),
              subjectId: "math",
            },
          },
          update: {},
          create: { studentId: student.id, day: dayKey(d), subjectId: "math", minutes },
        });
      }
      seatDay = Math.max(1, seatDay - 1);
    }

    // One assignment with mixed completion to power the teacher overview.
    const assignment = await db.assignment.create({
      data: {
        teacherId: teacher.id,
        classroomId: classroom.id,
        title: "Fractions Practice — Multiplication",
        type: "worksheet",
        subjectId: "math",
        lessonId: "math-primary-3",
        level: "primary",
        difficulty: "standard",
        questionCount: 8,
        dueDate: dayKey(-3),
        instructions:
          "Complete the 8 fraction questions. Use the visual method if you get stuck!",
      },
    });
    const seatRows = await db.classroomStudent.findMany({
      where: { classroomId: classroom.id },
      include: { student: true },
    });
    let done = 0;
    for (const seat of seatRows) {
      const completed = done < 9; // 9 of 12 completed
      done += 1;
      await db.assignmentResult.create({
        data: {
          assignmentId: assignment.id,
          studentId: seat.studentId,
          status: completed ? "completed" : "assigned",
          score: completed
            ? Math.min(100, 45 + Math.floor(Math.random() * 55))
            : null,
          completedAt: completed ? iso(1) : null,
        },
      });
    }

    await db.customActivity.create({
      data: {
        teacherId: teacher.id,
        title: "Comparing Fractions with Pizza Models",
        type: "worksheet",
        subjectId: "math",
        ageGroup: "primary",
        status: "draft",
        body: JSON.stringify({
          sections: [
            "Compare fractions using pizza pictures. Which is bigger: 2/3 or 3/4? Draw both, then explain your choice.",
          ],
          items: [
            { prompt: "Which is larger: 1/2 or 3/5?", answer: "3/5" },
            { prompt: "Order from smallest to largest: 1/2, 2/3, 1/4", answer: "1/4, 1/2, 2/3" },
          ],
        }),
      },
    });

    return Response.json({
      ok: true,
      seeded: true,
      demo: {
        parent: "parent@demo.com / demo1234",
        teacher: "teacher@demo.com / demo1234",
        admin: "admin@brightminds.app / admin1234",
        student: "code DEMO-2026 · PIN 8246 (Alex)",
      },
    });
  } catch (err) {
    console.error("demo-seed failed", err);
    return Response.json({ ok: false, error: "Seed failed" }, { status: 500 });
  }
}
