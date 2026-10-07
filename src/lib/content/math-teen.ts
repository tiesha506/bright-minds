// Mathematics — Advanced/Teen Learning (ages 14-15)
import type { Lesson } from "./types";

export const lessons: Lesson[] = [
  // ---------------------------------------------------------------------------
  // 1. Algebra Essentials
  // ---------------------------------------------------------------------------
  {
    id: "math-teen-1",
    title: "Algebra Essentials",
    emoji: "🧮",
    minutes: 16,
    intro:
      "Algebra is the grammar of mathematics. Simplify expressions, expand brackets, factorise quadratics and command the index laws — these four moves unlock every later topic.",
    sections: [
      {
        heading: "Expressions & Like Terms",
        body: "An expression is a chain of terms joined by + and −. You may only combine like terms — same letter, same power. 3x and 5x combine; 3x and 5x² do not.",
        example:
          "Simplify 3x² + 5x − x² + 2x: the x² terms give 3 − 1 = 2x², the x terms give 5 + 2 = 7x, so the answer is 2x² + 7x.",
        tip: "Circle the sign in front of each term before you move it — minus signs love to be forgotten.",
      },
      {
        heading: "Expanding Brackets (Distributive Law)",
        body: "Multiply everything inside a bracket by everything outside: a(b + c) = ab + ac. With two brackets, every term in the first must meet every term in the second.",
        example: "(x + 4)(x + 3) = x² + 3x + 4x + 12 = x² + 7x + 12.",
        tip: "Draw a 2×2 grid of products when two brackets meet — nothing gets skipped.",
      },
      {
        heading: "Factorising Simple Quadratics",
        body: "Factorising reverses expanding. For x² + bx + c, hunt two numbers that multiply to c and add to b: x² + bx + c = (x + p)(x + q). Special case: a difference of two squares, x² − k² = (x + k)(x − k).",
        example:
          "x² − 7x + 12: product 12, sum −7 → the numbers are −3 and −4, so (x − 3)(x − 4). And x² − 25 = (x + 5)(x − 5).",
        tip: "Check by expanding your answer — you should get back exactly where you started.",
      },
      {
        heading: "Index Laws",
        body: "Powers follow four rules: aᵐ × aⁿ = aᵐ⁺ⁿ (add the powers), aᵐ ÷ aⁿ = aᵐ⁻ⁿ (subtract), (aᵐ)ⁿ = aᵐˣⁿ (multiply), and a⁰ = 1 for any a ≠ 0.",
        example: "b³ × b⁴ = b⁷; b⁹ ÷ b⁵ = b⁴; (b²)³ = b⁶.",
        tip: "Expand a tiny case to see the rule: b² × b³ = b·b·b·b·b = b⁵ — that is why powers add.",
      },
    ],
    vocab: [
      { word: "expression", meaning: "A chain of numbers and letters joined by + and −, with no equals sign." },
      { word: "like terms", meaning: "Terms with the same letter and power, e.g. 4x² and −x² — the only terms you can merge." },
      { word: "expand", meaning: "Multiply out brackets using the distributive law." },
      { word: "factorise", meaning: "Rewrite an expression as a product of brackets — expanding in reverse." },
      { word: "index (exponent)", meaning: "The small power showing how many times the base multiplies itself." },
      { word: "quadratic", meaning: "An expression whose highest power is x², like x² − 7x + 12." },
    ],
    funFact:
      "The word 'algebra' comes from al-jabr, the title of al-Khwarizmi's 9th-century textbook — and 'algorithm' is a Latinised version of his name.",
    strategyLab: [
      {
        problem: "Expand and simplify (x + 4)(x + 3).",
        answer: "x² + 7x + 12",
        answerCheck:
          "Substitute x = 1: (1 + 4)(1 + 3) = 5 × 4 = 20 and 1² + 7(1) + 12 = 20. Same value — the expansion is correct.",
        methods: [
          {
            name: "Distributive Expansion (FOIL)",
            emoji: "✖️",
            whenToUse: "Fast and reliable whenever both brackets have two terms.",
            steps: [
              "Multiply the First terms: x × x = x².",
              "Multiply the Outer terms: x × 3 = 3x, and the Inner terms: 4 × x = 4x.",
              "Multiply the Last terms: 4 × 3 = 12.",
              "Collect like terms: x² + 3x + 4x + 12 = x² + 7x + 12.",
            ],
          },
          {
            name: "Area Model (Grid)",
            emoji: "▦",
            whenToUse: "Best when brackets get bigger or you keep forgetting a pair of terms.",
            steps: [
              "Split (x + 4) into a row and (x + 3) into a column to form a 2×2 grid.",
              "Fill each cell with a product: x·x = x², x·3 = 3x, 4·x = 4x, 4·3 = 12.",
              "Add all four cells and simplify: x² + 3x + 4x + 12 = x² + 7x + 12.",
            ],
          },
          {
            name: "Sum-and-Product Shortcut",
            emoji: "⚡",
            whenToUse: "Only for (x + p)(x + q) where x² has no number in front — instant results.",
            steps: [
              "Multiply the constants for the last term: 4 × 3 = 12.",
              "Add the constants for the middle term, keeping signs: 4 + 3 = 7.",
              "Write the answer directly: x² + 7x + 12.",
            ],
          },
        ],
      },
      {
        problem: "Factorise x² − 7x + 12.",
        answer: "(x − 3)(x − 4)",
        answerCheck:
          "Expand back with the distributive law: x² − 4x − 3x + 12 = x² − 7x + 12 — exactly the original expression.",
        methods: [
          {
            name: "Product–Sum Search",
            emoji: "🔎",
            whenToUse: "The standard method for x² + bx + c when you can juggle factor pairs mentally.",
            steps: [
              "List factor pairs of 12: 1 & 12, 2 & 6, 3 & 4.",
              "You need a pair that ADDS to −7, so both numbers must be negative: −3 and −4.",
              "Write the brackets: (x − 3)(x − 4).",
            ],
          },
          {
            name: "Split the Middle Term (Grouping)",
            emoji: "✂️",
            whenToUse: "Powerful when the coefficients grow and the mental search gets hard.",
            steps: [
              "Rewrite −7x as −3x − 4x: x² − 3x − 4x + 12.",
              "Group and factor each half: x(x − 3) − 4(x − 3).",
              "Pull out the common bracket: (x − 3)(x − 4).",
            ],
          },
        ],
      },
    ],
    quiz: [
      {
        question: "Simplify 4x + 3y − x + 2y.",
        options: ["3x + 5y", "4x + 5y", "3x + y", "5x + 5y"],
        answerIndex: 0,
        explanation: "x-terms: 4x − x = 3x. y-terms: 3y + 2y = 5y. Result: 3x + 5y.",
      },
      {
        question: "Expand (x + 5)(x − 2).",
        options: ["x² − 3x − 10", "x² + 3x − 10", "x² + 7x − 10", "x² + 3x + 10"],
        answerIndex: 1,
        explanation: "FOIL: x² − 2x + 5x − 10 = x² + 3x − 10.",
      },
      {
        question: "Which is the factorisation of x² − 16?",
        options: ["(x − 4)²", "(x + 4)(x − 4)", "(x + 8)(x − 2)", "(x + 16)(x − 1)"],
        answerIndex: 1,
        explanation:
          "Difference of two squares: x² − 16 = (x + 4)(x − 4). Check the trap: (x − 4)² would expand to x² − 8x + 16.",
      },
      {
        question: "Simplify (b²)³ × b.",
        options: ["b⁶", "b⁷", "b⁹", "b⁵"],
        answerIndex: 1,
        explanation: "(b²)³ = b²ˣ³ = b⁶ (multiply powers), then b⁶ × b = b⁷ (add powers).",
      },
      {
        question: "Noah simplified 3x² + 2x − x² + 5x and wrote 2x⁴ + 7x. What went wrong?",
        options: [
          "He multiplied the exponents (2 × 2 = 4) instead of keeping the power 2",
          "He forgot to flip the sign of −x²",
          "He combined x² terms and x terms, which are unlike",
          "Nothing — 2x⁴ + 7x is correct",
        ],
        answerIndex: 0,
        explanation:
          "3x² − x² = 2x²: subtracting like terms never changes the exponent. The correct answer is 2x² + 7x (his 7x was fine).",
      },
    ],
    worksheet: [
      {
        kind: "fill-blank",
        prompt: "In the expression 7x − 3x + 5, the x-terms simplify to ___x.",
        answer: "4",
        hint: "Subtract the coefficients: 7 − 3.",
      },
      {
        kind: "practice",
        prompt: "Expand and simplify 2(3x + 4) + 5(x − 2). The result looks like 11x − ___. What number goes in the gap?",
        answer: "2",
        hint: "6x + 8 + 5x − 10 — combine the plain numbers.",
      },
      {
        kind: "match",
        prompt: "Match each expression to its simplified form.",
        left: ["a³ × a⁴", "(a²)³", "a⁷ ÷ a²", "a⁰ (a ≠ 0)"],
        right: ["a⁶", "a⁷", "1", "a⁵"],
        answer: [1, 0, 3, 2],
      },
      {
        kind: "practice",
        prompt: "(x + 4)(x + 3) expands to x² + ___x + 12. What number goes in the gap?",
        answer: "7",
        hint: "Multiply the constants for the end; add them for the middle.",
      },
      {
        kind: "short-answer",
        prompt: "Factorise x² − 7x + 12 and explain how you found the two numbers.",
        sampleAnswer:
          "(x − 3)(x − 4). I need two numbers with product 12 and sum −7, so both must be negative: −3 × (−4) = 12 and −3 + (−4) = −7.",
      },
      {
        kind: "fill-blank",
        prompt: "Simplify (b⁵)² = b^___. (type the exponent)",
        answer: "10",
        hint: "Multiply the powers.",
      },
    ],
  },

  // ---------------------------------------------------------------------------
  // 2. Linear Equations & Graphing Lines (adapted from original math-teen-1)
  // ---------------------------------------------------------------------------
  {
    id: "math-teen-2",
    title: "Linear Equations & Graphing Lines",
    emoji: "📈",
    minutes: 18,
    intro:
      "Every straight line hides a simple rule. Solve equations by keeping the balance, read y = mx + b like a story, and find where two lines agree.",
    sections: [
      {
        heading: "Solving Equations: Keep It Balanced",
        body: "An equation is a balance scale: the left side equals the right. Whatever you do to one side you must do to the other. Aim for all the x-terms on one side and all the numbers on the other.",
        example: "5x − 3 = 2x + 9 → subtract 2x: 3x − 3 = 9 → add 3: 3x = 12 → divide by 3: x = 4.",
        tip: "Substitute your answer back into both sides. If they match, you are certain.",
      },
      {
        heading: "Slope: The Rate of Change",
        body: "In y = mx + b, m is the slope — how fast y rises for each step of x. Slope = rise/run = (y₂ − y₁)/(x₂ − x₁). A slope of 3 means y grows 3 units for every 1 unit of x.",
        example:
          "A phone plan costs $20 plus $2 per GB. The cost line has slope 2: each extra gigabyte adds exactly $2.",
        tip: "Positive slope rises left to right; negative slope falls. Zero slope is horizontal.",
      },
      {
        heading: "Intercepts and Graphing",
        body: "b is the y-intercept — the starting value when x = 0. To graph, plot the intercept, then step with the slope: run 1, rise m. Parallel lines share a slope; perpendicular slopes multiply to −1.",
        example: "Graph y = 2x + 20: start at (0, 20), move right 1 and up 2 to reach (1, 22).",
        tip: "The x-intercept solves 0 = mx + b — the moment the model hits zero.",
      },
      {
        heading: "Systems: Two Lines, One Meeting Point",
        body: "Two linear equations solved together form a system. The solution is the point where the lines cross — the single (x, y) that satisfies both. Solve by substitution, elimination, or graphing.",
        example:
          "y = x + 4 and y = 3x − 2: set x + 4 = 3x − 2 → 6 = 2x → x = 3, then y = 7. The lines cross at (3, 7).",
        tip: "Same slope but different intercept = parallel lines = no solution.",
      },
    ],
    vocab: [
      { word: "slope", meaning: "Rate of change of a line: rise over run, the m in y = mx + b." },
      { word: "y-intercept", meaning: "Where the line crosses the y-axis — the value when x = 0." },
      { word: "linear", meaning: "Changing by equal amounts; a constant rate that graphs as a straight line." },
      { word: "parallel", meaning: "Lines with the same slope that never intersect." },
      { word: "perpendicular", meaning: "Lines meeting at 90°; their slopes multiply to −1." },
      { word: "system", meaning: "Two or more equations solved together; the solution is where the lines cross." },
    ],
    funFact:
      "The coordinate plane is named after René Descartes — legend says watching a fly walk across his ceiling gave him the idea.",
    strategyLab: [
      {
        problem: "Solve 4x + 9 = 2x + 21.",
        answer: "x = 6",
        answerCheck:
          "Substitute: 4(6) + 9 = 33 and 2(6) + 21 = 33. Both sides equal 33 — perfectly balanced.",
        methods: [
          {
            name: "Balance Method",
            emoji: "⚖️",
            whenToUse: "The default for any linear equation — always safe.",
            steps: [
              "Subtract 2x from both sides to gather x-terms: 2x + 9 = 21.",
              "Subtract 9 from both sides: 2x = 12.",
              "Divide both sides by 2: x = 6.",
            ],
          },
          {
            name: "Trial Table (Spot the Balance)",
            emoji: "🔍",
            whenToUse: "A great sanity check — and instant in multiple-choice when you can test options.",
            steps: [
              "Try x = 5: left = 29, right = 31 — the left side is smaller.",
              "Try x = 7: left = 37, right = 35 — now the left is bigger, so the answer sits between.",
              "Try x = 6: left = 33, right = 33 — balanced. x = 6.",
            ],
          },
        ],
      },
      {
        problem: "Solve the system y = 2x + 1 and y = −x + 7.",
        answer: "x = 2, y = 5 — the lines cross at (2, 5)",
        answerCheck: "Check both equations: 2(2) + 1 = 5 ✓ and −2 + 7 = 5 ✓ — the point satisfies both.",
        methods: [
          {
            name: "Substitution",
            emoji: "🔀",
            whenToUse: "Perfect when one variable is already isolated, like y = …",
            steps: [
              "Both expressions equal y, so set them equal: 2x + 1 = −x + 7.",
              "Add x to both sides and subtract 1: 3x = 6, so x = 2.",
              "Substitute back: y = 2(2) + 1 = 5.",
            ],
          },
          {
            name: "Elimination",
            emoji: "➖",
            whenToUse: "Strong when you can line both equations up in matching form.",
            steps: [
              "Rewrite as y − 2x = 1 and y + x = 7.",
              "Subtract the first from the second: (y + x) − (y − 2x) = 7 − 1, so 3x = 6.",
              "So x = 2, and y = 2(2) + 1 = 5.",
            ],
          },
          {
            name: "Graph Both Lines",
            emoji: "📈",
            whenToUse: "Best when you want to SEE why the answer makes sense, or estimate first.",
            steps: [
              "Line 1: y-intercept (0, 1), slope 2 → passes through (1, 3) and (2, 5).",
              "Line 2: y-intercept (0, 7), slope −1 → passes through (2, 5) and (7, 0).",
              "Both lines pass through (2, 5) — that shared point is the solution.",
            ],
          },
        ],
      },
    ],
    quiz: [
      {
        question: "Solve 4x − 7 = 2x + 5.",
        options: ["3", "4", "6", "9"],
        answerIndex: 2,
        explanation: "Subtract 2x: 2x − 7 = 5. Add 7: 2x = 12, so x = 6.",
      },
      {
        question: "What is the slope of the line through (1, 5) and (3, 11)?",
        options: ["2", "3", "6", "1/2"],
        answerIndex: 1,
        explanation: "Slope = (11 − 5)/(3 − 1) = 6/2 = 3.",
      },
      {
        question: "Which line is parallel to y = 4x − 7?",
        options: ["y = −4x + 7", "y = 4x + 3", "y = (1/4)x − 7", "y = x + 4"],
        answerIndex: 1,
        explanation: "Parallel lines share the same slope — only y = 4x + 3 has slope 4.",
      },
      {
        question: "Where does y = 3x − 6 cross the x-axis?",
        options: ["(0, −6)", "(−2, 0)", "(2, 0)", "(6, 0)"],
        answerIndex: 2,
        explanation: "Set y = 0: 3x = 6, so x = 2. The point is (2, 0).",
      },
      {
        question: "Solve the system y = x + 2 and y = 3x − 4. The lines cross at…",
        options: ["(1, 3)", "(3, 5)", "(2, 4)", "(5, 3)"],
        answerIndex: 1,
        explanation: "Set x + 2 = 3x − 4 → 6 = 2x → x = 3, then y = 5. Check: 3 + 2 = 5 ✓ and 3(3) − 4 = 5 ✓.",
      },
    ],
    worksheet: [
      {
        kind: "fill-blank",
        prompt: "The slope of y = −5x + 2 is ___.",
        answer: "-5",
      },
      {
        kind: "practice",
        prompt: "Find the slope of the line through (2, 3) and (6, 15).",
        answer: "3",
        hint: "Slope = (y₂ − y₁)/(x₂ − x₁).",
      },
      {
        kind: "fill-blank",
        prompt: "A line has slope 2 and y-intercept 7. Its equation is y = 2x + ___.",
        answer: "7",
      },
      {
        kind: "practice",
        prompt:
          "Solve the system y = x + 4 and y = 3x − 2. What is the x-value of the intersection point?",
        answer: "3",
        hint: "Set x + 4 = 3x − 2 and solve.",
      },
      {
        kind: "short-answer",
        prompt:
          "A gym charges a flat fee plus a per-visit fee. 5 visits cost $45 and 8 visits cost $66. Explain how to find the per-visit fee and the flat fee.",
        sampleAnswer:
          "Cost rises $66 − $45 = $21 over 3 extra visits, so the slope is $7 per visit. Flat fee = 45 − 5 × 7 = $10.",
      },
      {
        kind: "fill-blank",
        prompt: "The x-intercept of y = 4x − 12 is (___, 0).",
        answer: "3",
      },
    ],
  },

  // ---------------------------------------------------------------------------
  // 3. Functions: Input-Output Machines
  // ---------------------------------------------------------------------------
  {
    id: "math-teen-3",
    title: "Functions: Input-Output Machines",
    emoji: "⚙️",
    minutes: 16,
    intro:
      "A function is a machine: feed it an input, it hands you exactly one output. Master f(x) and you can describe everything from phone bills to rocket trajectories.",
    sections: [
      {
        heading: "Meet the Machine: f(x)",
        body: "f(x) = 2x + 3 is a rule: take input x, double it, add 3. f(4) means feed in 4: f(4) = 2(4) + 3 = 11. The letter f names the machine; whatever sits in the brackets is the input you feed it.",
        example: "If g(x) = x² − 1, then g(5) = 25 − 1 = 24 and g(−3) = 9 − 1 = 8.",
        tip: "f(2) does NOT mean f times 2 — it means 'run machine f on the input 2'.",
      },
      {
        heading: "Domain and Range",
        body: "The domain is the set of inputs the machine accepts; the range is the set of outputs it can produce. Some inputs are forbidden — you can never divide by zero.",
        example:
          "f(x) = 12/x accepts every input except 0. For f(x) = x² with whole-number inputs 0 to 5, the range is 0, 1, 4, 9, 16, 25.",
        tip: "Ask: what would break the machine? Anything that does is outside the domain.",
      },
      {
        heading: "Tables and Graphs",
        body: "List inputs in a table, compute outputs, then plot each (x, f(x)) pair. A true function gives exactly one output per input — so its graph passes the vertical line test: no vertical line can hit it twice.",
        example:
          "f(x) = 2x + 3 at x = −1, 0, 1, 2 gives outputs 1, 3, 5, 7 — four points on a perfectly straight line.",
        tip: "Curves like x² also pass the vertical line test — 'function' does not mean 'straight line'.",
      },
      {
        heading: "Linear vs Non-Linear Models",
        body: "Linear functions change by equal steps (a constant rate): y = 3x + 5. Non-linear functions change by unequal steps: x², 2ˣ, or curved real-world behaviour. In a table, check the first differences — equal steps mean linear.",
        example:
          "Tank V(t) = 120 − 4t is linear (drains exactly 4 L every minute); braking distance d(s) = 0.05s² is not (double the speed, quadruple the distance).",
        tip: "Phone plans and wages are usually linear; anything involving area, speed² or doubling is not.",
      },
    ],
    vocab: [
      { word: "function", meaning: "A rule assigning exactly one output to each input, written f(x)." },
      { word: "input", meaning: "The value you feed into the machine — the x you choose." },
      { word: "output", meaning: "The value the machine returns — f of that input." },
      { word: "domain", meaning: "The set of inputs a function accepts." },
      { word: "range", meaning: "The set of outputs a function can produce." },
      { word: "non-linear", meaning: "Not a constant rate of change — its graph curves instead of staying straight." },
    ],
    funFact:
      "Leonhard Euler introduced the f(x) notation in 1734 — the same mathematician who popularised π, e and i. You are writing his inventions every maths lesson.",
    strategyLab: [
      {
        problem: "If f(x) = 3x − 4, find the input x that makes f(x) = 14.",
        answer: "x = 6",
        answerCheck: "Run the machine on 6: f(6) = 3(6) − 4 = 18 − 4 = 14 ✓.",
        methods: [
          {
            name: "Balance Method",
            emoji: "⚖️",
            whenToUse: "Any time you know the output and must reverse the rule.",
            steps: [
              "Write the equation: 3x − 4 = 14.",
              "Add 4 to both sides: 3x = 18.",
              "Divide both sides by 3: x = 6.",
            ],
          },
          {
            name: "Backtracking (Reverse the Machine)",
            emoji: "🔄",
            whenToUse: "Brilliant for multi-step rules — undo each operation in reverse order.",
            steps: [
              "The machine does ×3 then −4. To undo it, reverse the order: +4 then ÷3.",
              "Start from the output: 14 + 4 = 18.",
              "Then 18 ÷ 3 = 6. The input was 6.",
            ],
          },
          {
            name: "Table of Values",
            emoji: "📋",
            whenToUse: "Good for a small search, and for spotting the pattern between rows.",
            steps: [
              "Compute f(4) = 8 and f(5) = 11 — the outputs climb by 3 per step.",
              "The next row is f(6) = 14 — exactly the target.",
              "So the input is 6, one step past 5.",
            ],
          },
        ],
      },
      {
        problem: "A table gives x = 1, 2, 3, 4 and y = 2, 5, 10, 17. Is the function linear? If not, what rule fits?",
        answer: "Not linear — it fits y = x² + 1",
        answerCheck:
          "Test the rule on every input: 1² + 1 = 2, 4 + 1 = 5, 9 + 1 = 10, 16 + 1 = 17 — all four match.",
        methods: [
          {
            name: "First Differences",
            emoji: "📊",
            whenToUse: "The fastest linearity test for any table.",
            steps: [
              "Subtract consecutive outputs: 5 − 2 = 3, 10 − 5 = 5, 17 − 10 = 7.",
              "Differences 3, 5, 7 are NOT equal, so the rate of change is not constant — not linear.",
              "The differences themselves grow by 2 each time — the signature of a quadratic.",
            ],
          },
          {
            name: "Hunt the Pattern (Compare to x²)",
            emoji: "🧩",
            whenToUse: "When differences are not constant, compare the outputs to x², 2ˣ and friends.",
            steps: [
              "Compare y with x²: at x = 1, x² = 1 but y = 2; at x = 2, x² = 4 but y = 5.",
              "y is always exactly one more than x², so guess y = x² + 1.",
              "Confirm on the rest: 3² + 1 = 10 ✓ and 4² + 1 = 17 ✓. Rule: y = x² + 1.",
            ],
          },
        ],
      },
    ],
    quiz: [
      {
        question: "If f(x) = 2x + 3, what is f(5)?",
        options: ["10", "13", "16", "28"],
        answerIndex: 1,
        explanation: "f(5) = 2(5) + 3 = 10 + 3 = 13.",
      },
      {
        question: "If g(x) = x² − 4, which input gives an output of 0?",
        options: ["0", "2", "4", "8"],
        answerIndex: 1,
        explanation: "g(2) = 4 − 4 = 0. (−2 works too — it just is not listed.)",
      },
      {
        question: "The function f(x) = 12/x is undefined for exactly one input. Which one?",
        options: ["1", "2", "0", "3"],
        answerIndex: 2,
        explanation: "Division by zero is impossible, so x = 0 is outside the domain.",
      },
      {
        question: "Which of these functions is non-linear?",
        options: ["f(x) = 5x − 1", "f(x) = x² + 3x", "f(x) = 10 − x", "f(x) = 2(x + 4)"],
        answerIndex: 1,
        explanation: "The x² term bends the graph. Watch the last option: 2(x + 4) = 2x + 8 — secretly linear!",
      },
      {
        question: "A drone's battery after t minutes is b(t) = 100 − 8t percent. What does b(6) = 52 tell you?",
        options: [
          "After 6 minutes, 52% of the battery remains",
          "The battery drains 52% per minute",
          "After 52 minutes, 6% remains",
          "The battery lasts 52 hours",
        ],
        answerIndex: 0,
        explanation: "b(6) = 100 − 8(6) = 100 − 48 = 52: the input 6 is minutes, the output 52 is the percent left.",
      },
    ],
    worksheet: [
      {
        kind: "fill-blank",
        prompt: "If f(x) = x + 7, then f(3) = ___.",
        answer: "10",
      },
      {
        kind: "practice",
        prompt: "If g(x) = 4x − 5, find g(6).",
        answer: "19",
        hint: "4 × 6 = 24, then −5.",
      },
      {
        kind: "fill-blank",
        prompt: "For f(x) = 2x + 1, the input that gives f(x) = 9 is x = ___.",
        answer: "4",
        hint: "Solve 2x + 1 = 9.",
      },
      {
        kind: "practice",
        prompt: "A machine multiplies its input by 3, then subtracts 2. What output does the input 5 produce?",
        answer: "13",
        hint: "3 × 5 = 15, then −2.",
      },
      {
        kind: "short-answer",
        prompt:
          "Maya models water in a 120-litre tank with V(t) = 120 − 4t (litres after t minutes). Explain what V(0) and the −4 tell you, and find when the tank is empty.",
        sampleAnswer:
          "V(0) = 120: the tank starts full. The −4 means it drains 4 litres every minute (a constant rate, so linear). Empty when 120 − 4t = 0, so t = 30 minutes.",
      },
      {
        kind: "fill-blank",
        prompt: "A graph is a function only if it passes the ______ line test.",
        answer: "vertical",
      },
    ],
  },

  // ---------------------------------------------------------------------------
  // 4. Geometry: Pythagoras & Beyond (adapted + extended from original math-teen-2)
  // ---------------------------------------------------------------------------
  {
    id: "math-teen-4",
    title: "Geometry: Pythagoras & Beyond",
    emoji: "📐",
    minutes: 18,
    intro:
      "Right triangles, angle rules and similar shapes form the engineer's toolkit — from ladder angles to map scaling. One ancient theorem, three new tools.",
    sections: [
      {
        heading: "Right Triangles and the Theorem",
        body: "In a right triangle, the two shorter sides are the legs and the longest side (opposite the right angle) is the hypotenuse. The theorem states a² + b² = c², where c is the hypotenuse.",
        example: "Legs 3 and 4: 3² + 4² = 9 + 16 = 25, so c² = 25 and c = 5.",
        tip: "Only the two legs get squared and added — never include c² on the left.",
      },
      {
        heading: "Missing Sides and the Distance Formula",
        body: "To find the hypotenuse, square both legs, add, then take the square root. To find a leg, subtract instead: a² = c² − b². On a coordinate grid the same idea becomes the distance formula: d = √((x₂−x₁)² + (y₂−y₁)²).",
        example: "A screen is 16 by 12 inches: diagonal = √(256 + 144) = √400 = 20 inches.",
        tip: "Memorise the triples 3-4-5, 5-12-13 and 8-15-17 — they appear constantly.",
      },
      {
        heading: "Angle Reasoning",
        body: "Three facts unlock most diagram problems: angles on a straight line add to 180°, vertically opposite angles are equal, and a triangle's interior angles always total 180°. For any polygon with n sides, the interior angles total (n − 2) × 180°.",
        example:
          "Triangle angles 2x, 50° and 60°: 2x + 110 = 180, so x = 35. A hexagon's interior angles total (6 − 2) × 180° = 720°.",
        tip: "Mark every angle you can deduce on the diagram BEFORE writing any equation.",
      },
      {
        heading: "Congruence and Similarity",
        body: "Congruent shapes are identical — same size, same angles, every matching side equal. Similar shapes share the same shape but a different size: matching angles are equal and matching sides all scale by the SAME factor. Areas scale by the factor squared.",
        example:
          "A photo 4 cm × 6 cm is enlarged by scale factor 3 → 12 cm × 18 cm. Its area grows 9×: from 24 cm² to 216 cm².",
        tip: "Lengths scale by k, areas by k². Mixing those up is the classic exam trap.",
      },
    ],
    vocab: [
      { word: "hypotenuse", meaning: "The longest side of a right triangle, opposite the right angle." },
      { word: "leg", meaning: "Either of the two shorter sides forming the right angle." },
      { word: "converse", meaning: "If a² + b² = c² holds for three sides, the triangle must be right-angled." },
      { word: "congruent", meaning: "Exactly identical in shape and size — a perfect clone." },
      { word: "similar", meaning: "Same shape, different size: equal matching angles, sides in the same ratio." },
      { word: "scale factor", meaning: "The number every length is multiplied by when a shape is enlarged." },
    ],
    funFact:
      "Site workers still check right angles with the 3-4-5 rope trick — knot a rope at 3 m, 4 m and 5 m and the corner is square, exactly as Babylonian builders did 4,000 years ago.",
    strategyLab: [
      {
        problem: "A 13 m ladder leans against a wall with its foot 5 m from the base. How high up the wall does it reach?",
        answer: "12 m",
        answerCheck: "Verify with the theorem: 5² + 12² = 25 + 144 = 169 = 13². It checks out.",
        methods: [
          {
            name: "Pythagoras Rearranged",
            emoji: "🔺",
            whenToUse: "Always works — for a leg, subtract instead of add.",
            steps: [
              "The ladder is the hypotenuse c = 13; the known leg is b = 5; the height a is missing.",
              "a² = c² − b² = 169 − 25 = 144.",
              "a = √144 = 12 m.",
            ],
          },
          {
            name: "Spot the Triple",
            emoji: "🧠",
            whenToUse: "Fastest when the numbers match a Pythagorean triple you know.",
            steps: [
              "Recognise 5 and 13 as members of the 5-12-13 triple.",
              "The missing side must be 12.",
              "Sanity-check: 25 + 144 = 169 ✓.",
            ],
          },
          {
            name: "Difference of Squares",
            emoji: "➖",
            whenToUse: "Elegant mental arithmetic when c and b are easy to add and subtract.",
            steps: [
              "a² = c² − b² = 13² − 5².",
              "Factor: 13² − 5² = (13 − 5)(13 + 5) = 8 × 18 = 144.",
              "a = √144 = 12 m.",
            ],
          },
        ],
      },
      {
        problem:
          "A tree casts a 9 m shadow. At the same moment Maya, who is 1.6 m tall, casts a 1.2 m shadow. How tall is the tree?",
        answer: "12 m",
        answerCheck:
          "Compare the ratios: 12/9 = 1.333… and 1.6/1.2 = 1.333… — the triangles really are similar.",
        methods: [
          {
            name: "Scale Factor",
            emoji: "📏",
            whenToUse: "When one triangle is clearly an enlargement of the other.",
            steps: [
              "Sun rays create similar triangles: tree-with-shadow and Maya-with-shadow.",
              "Shadow scale factor: 9 ÷ 1.2 = 7.5.",
              "Tree height: 1.6 × 7.5 = 12 m.",
            ],
          },
          {
            name: "Cross-Multiplication",
            emoji: "✖️",
            whenToUse: "A rock-solid proportion set-up for any similar-figure problem.",
            steps: [
              "Write the proportion h/9 = 1.6/1.2.",
              "Cross-multiply: 1.2h = 9 × 1.6 = 14.4.",
              "Divide: h = 14.4 ÷ 1.2 = 12 m.",
            ],
          },
        ],
      },
    ],
    quiz: [
      {
        question: "A right triangle has legs 6 and 8. What is the hypotenuse?",
        options: ["10", "12", "14", "48"],
        answerIndex: 0,
        explanation: "6² + 8² = 36 + 64 = 100, and √100 = 10.",
      },
      {
        question: "The hypotenuse is 13 and one leg is 5. The other leg is…",
        options: ["8", "12", "18", "13² − 5²"],
        answerIndex: 1,
        explanation: "13² − 5² = 144 is the SQUARED side — you still need √144 = 12.",
      },
      {
        question: "A triangle has angles 2x, 50° and 60°. What is x?",
        options: ["30", "35", "40", "70"],
        answerIndex: 1,
        explanation: "Angles total 180°: 2x + 110 = 180, so 2x = 70 and x = 35.",
      },
      {
        question: "Two similar rectangles have a length scale factor of 1 : 3. Their areas scale by…",
        options: ["3", "6", "9", "27"],
        answerIndex: 2,
        explanation: "Areas scale by k² = 3² = 9.",
      },
      {
        question: "Using (n − 2) × 180°, the interior angles of a hexagon sum to…",
        options: ["540°", "620°", "720°", "1080°"],
        answerIndex: 2,
        explanation: "(6 − 2) × 180° = 4 × 180° = 720°.",
      },
    ],
    worksheet: [
      {
        kind: "fill-blank",
        prompt: "In a right triangle with legs 9 and 12, the hypotenuse is ___.",
        answer: "15",
        hint: "9² + 12² = 225.",
      },
      {
        kind: "practice",
        prompt: "Find the hypotenuse for legs 5 and 12.",
        answer: "13",
        hint: "A famous triple.",
      },
      {
        kind: "fill-blank",
        prompt: "Hypotenuse 10, one leg 6: the other leg is √___ (type the number under the root).",
        answer: "64",
      },
      {
        kind: "practice",
        prompt:
          "A kite string is taut: it runs 30 m horizontally from Kai's hand and the kite is 40 m high. How long is the string, in metres?",
        answer: "50",
        hint: "30² + 40² = 2500.",
      },
      {
        kind: "short-answer",
        prompt:
          "A TV screen measures 40 inches diagonally and is 32 inches wide. Show how to find its height using the Pythagorean theorem, then state the height.",
        sampleAnswer:
          "height² = 40² − 32² = 1600 − 1024 = 576, so height = √576 = 24 inches.",
      },
      {
        kind: "fill-blank",
        prompt: "If two similar shapes have lengths scaling by 3, their areas scale by ___.",
        answer: "9",
        hint: "Areas use the scale factor squared.",
      },
    ],
  },

  // ---------------------------------------------------------------------------
  // 5. Ratios & Proportions, Advanced
  // ---------------------------------------------------------------------------
  {
    id: "math-teen-5",
    title: "Ratios & Proportions, Advanced",
    emoji: "⚖️",
    minutes: 17,
    intro:
      "Ratios run the world's recipes, maps, machines and money. Level up from simple sharing to direct and inverse proportion — and start thinking like an engineer.",
    sections: [
      {
        heading: "Direct Proportion and the Unitary Method",
        body: "Two quantities are directly proportional when they multiply up together: y = kx. Double one, the other doubles. The unitary method finds the value of ONE first, then scales up.",
        example: "5 kg of apples cost $12, so 1 kg costs $2.40 — and 8 kg cost 8 × 2.40 = $19.20.",
        tip: "Check the direction: if one quantity doubles, a directly proportional one must double too.",
      },
      {
        heading: "Inverse Proportion",
        body: "Inversely proportional quantities multiply to a constant: y = k/x. More workers → fewer days; greater speed → less time. The product of the two quantities stays fixed.",
        example: "4 painters take 6 days: 4 × 6 = 24 painter-days. With 8 painters: 24 ÷ 8 = 3 days.",
        tip: "Ask first: should the answer be bigger or smaller? Inverse proportion flips the direction.",
      },
      {
        heading: "Scale Drawings and Maps",
        body: "A scale like 1 : 50 000 means 1 cm on paper equals 50 000 cm (0.5 km) in reality. Convert units carefully — that is where most marks are lost.",
        example: "On a 1 : 50 000 map, a 7.4 cm path is 7.4 × 50 000 = 370 000 cm = 3.7 km in real life.",
        tip: "Convert cm → m (÷100) first, then m → km (÷1000).",
      },
      {
        heading: "Sharing Ratios and Similar Figures",
        body: "To share an amount in the ratio m : n, add the parts, divide the total by that sum, then multiply each share. Similar figures have equal matching angles and matching sides in the same ratio — so one known measurement converts all the others.",
        example: "Share $480 in ratio 3 : 5 → 8 parts → $60 per part → $180 and $300.",
        tip: "A ratio is a comparison, not an amount — always find the value of one part first.",
      },
    ],
    vocab: [
      { word: "ratio", meaning: "A comparison of two quantities, like 3 : 5, showing how many times one contains the other." },
      { word: "direct proportion", meaning: "Both quantities grow by the same factor: y = kx." },
      { word: "inverse proportion", meaning: "One goes up, the other goes down, product constant: y = k/x." },
      { word: "unitary method", meaning: "Find the value of one unit first, then scale to what you need." },
      { word: "constant of proportionality", meaning: "The fixed k linking two proportional quantities." },
      { word: "scale drawing", meaning: "A shrunken (or enlarged) copy where every length uses the same ratio, like 1 : 50 000." },
    ],
    funFact:
      "Double a guitar string's vibration frequency and you hear the same note an octave higher — every musical interval is a simple ratio like 2:1 or 3:2, which is why Pythagoras was obsessed with strings.",
    strategyLab: [
      {
        problem: "Share $480 between Leo and Amara in the ratio 3 : 5.",
        answer: "Leo $180, Amara $300",
        answerCheck:
          "Add the shares back: 180 + 300 = 480 ✓, and 180 : 300 simplifies to 3 : 5 (divide both by 60) ✓.",
        methods: [
          {
            name: "Unitary Method (Value of One Part)",
            emoji: "1️⃣",
            whenToUse: "The standard exam method — works for any ratio sharing.",
            steps: [
              "Total parts: 3 + 5 = 8.",
              "One part is worth 480 ÷ 8 = $60.",
              "Leo: 3 × 60 = $180; Amara: 5 × 60 = $300.",
            ],
          },
          {
            name: "Fraction Multiplier",
            emoji: "🧮",
            whenToUse: "Fast once you see each share as a fraction of the total.",
            steps: [
              "Leo gets 3 of 8 parts, i.e. 3/8 of the money; Amara gets 5/8.",
              "Leo: 3/8 × 480 = 180.",
              "Amara: 5/8 × 480 = 300.",
            ],
          },
        ],
      },
      {
        problem: "Six painters paint a house in 10 days, all working at the same rate. How long would 12 painters take?",
        answer: "5 days",
        answerCheck: "Both scenarios need 60 painter-days: 6 × 10 = 60 and 12 × 5 = 60 ✓.",
        methods: [
          {
            name: "Constant Product",
            emoji: "✖️",
            whenToUse: "Inverse proportion always hides a constant product — find it and divide.",
            steps: [
              "Total work: workers × days = 6 × 10 = 60 painter-days.",
              "New time: 60 ÷ 12 = 5 days.",
              "More painters, less time — the product stayed at 60 throughout.",
            ],
          },
          {
            name: "Double-and-Halve Logic",
            emoji: "🔄",
            whenToUse: "A brilliant mental check when the change is a simple multiple.",
            steps: [
              "12 painters is double 6 — twice the workforce.",
              "Twice the workers → half the time (that is what inverse means).",
              "10 ÷ 2 = 5 days.",
            ],
          },
        ],
      },
    ],
    quiz: [
      {
        question: "3 notebooks cost $8.40. At the same rate, what do 7 notebooks cost?",
        options: ["$19.60", "$18.60", "$20.40", "$19.20"],
        answerIndex: 0,
        explanation: "Unitary: $8.40 ÷ 3 = $2.40 each; 7 × 2.40 = $19.60.",
      },
      {
        question: "Zara and Dev share 45 stickers in the ratio 2 : 3. How many does Zara get?",
        options: ["15", "18", "20", "27"],
        answerIndex: 1,
        explanation: "5 parts: 45 ÷ 5 = 9 per part. Zara has 2 parts: 2 × 9 = 18.",
      },
      {
        question: "Five pumps drain a pool in 12 hours. How long would 15 identical pumps take?",
        options: ["4 hours", "3 hours", "6 hours", "36 hours"],
        answerIndex: 0,
        explanation: "Inverse: 5 × 12 = 60 pump-hours. 60 ÷ 15 = 4 hours. Triple the pumps → a third of the time.",
      },
      {
        question: "On a map with scale 1 : 25 000, two towns are 8 cm apart. What is the real distance?",
        options: ["0.8 km", "2 km", "20 km", "200 km"],
        answerIndex: 1,
        explanation: "8 × 25 000 = 200 000 cm = 2 000 m = 2 km.",
      },
      {
        question: "y is inversely proportional to x. When x = 4, y = 6. What is y when x = 8?",
        options: ["3", "12", "2", "8"],
        answerIndex: 0,
        explanation: "The constant is xy = 4 × 6 = 24. When x = 8: y = 24 ÷ 8 = 3. (Choosing 12 falls for direct proportion!)",
      },
    ],
    worksheet: [
      {
        kind: "fill-blank",
        prompt: "$90 is shared between Kai and Marco in the ratio 2 : 1. The larger share is $___.",
        answer: "60",
        hint: "3 parts of $30 each.",
      },
      {
        kind: "practice",
        prompt: "A car uses 8 litres of petrol per 100 km. How many litres for a 350 km trip?",
        answer: "28",
        hint: "8 × 3.5.",
      },
      {
        kind: "fill-blank",
        prompt: "y is directly proportional to x. When x = 5, y = 12. When x = 10, y = ___.",
        answer: "24",
      },
      {
        kind: "practice",
        prompt:
          "A map scale is 1 : 50 000. A hiking path measures 7.4 cm on the map. How many kilometres is that in real life?",
        answer: "3.7",
        hint: "7.4 × 50 000 cm, then convert to km.",
      },
      {
        kind: "short-answer",
        prompt:
          "Six machines fill an order in 15 hours. Sofia suggests using 9 machines instead. Explain why the job then takes 10 hours, and why this relationship is inverse rather than direct.",
        sampleAnswer:
          "Total work = 6 × 15 = 90 machine-hours, which stays constant. With 9 machines: 90 ÷ 9 = 10 hours. It is inverse because more machines means LESS time — the two quantities move in opposite directions while their product stays fixed.",
      },
      {
        kind: "fill-blank",
        prompt: "Two similar figures have lengths scaling by 3, so their areas scale by ___.",
        answer: "9",
      },
    ],
  },

  // ---------------------------------------------------------------------------
  // 6. Statistics: Data in the Real World (refit of stats half of original math-teen-3)
  // ---------------------------------------------------------------------------
  {
    id: "math-teen-6",
    title: "Statistics: Data in the Real World",
    emoji: "📊",
    minutes: 18,
    intro:
      "Data decides elections, medicines and game patches — but only if you read it honestly. Learn sampling, spread, box plots and the correlation trap.",
    sections: [
      {
        heading: "Sampling and Bias",
        body: "You rarely survey everyone — you sample. A sample must represent the whole group fairly. Convenience samples (just your friends, just the gym) over-represent some voices and skew every conclusion.",
        example:
          "A school polls only the basketball teams about new sports facilities — of course they want courts. A fairer sample picks names randomly from every year group.",
        tip: "Before trusting any statistic, ask: who got asked, and who did not?",
      },
      {
        heading: "Averages and Spread",
        body: "The mean is the sum ÷ count, the median is the middle of the ordered list, the mode is the most frequent value. Outliers drag the mean but barely move the median. Spread matters too: range = maximum − minimum.",
        example:
          "Salaries (in $1000s): 30, 35, 40, 45, 250. Mean = 80 but median = 40 — one outlier makes the mean misleading.",
        tip: "Outlier in the data? Report the median alongside the mean.",
      },
      {
        heading: "Quartiles and Box Plots",
        body: "Quartiles chop ordered data into quarters: Q1 (lower quartile), Q2 (the median), Q3 (upper quartile). The interquartile range IQR = Q3 − Q1 measures the spread of the middle 50%. A box plot draws all five key numbers in one picture.",
        example: "For 2, 4, 6, 8, 10, 12, 14: median = 8, Q1 = 4, Q3 = 12, IQR = 8.",
        tip: "Two players with equal averages can still differ wildly — compare their IQRs.",
      },
      {
        heading: "Correlation ≠ Causation",
        body: "Two things rising together (correlation) does not mean one causes the other — a hidden third variable may drive both. Scatter plots reveal the strength of a correlation; only controlled experiments support causes.",
        example:
          "Ice cream sales and drownings rise together every summer — hot weather drives both; ice cream harms no one.",
        tip: "Ask: could a third factor explain this? Could it be coincidence?",
      },
    ],
    vocab: [
      { word: "sample", meaning: "A smaller group chosen to represent a whole population." },
      { word: "bias", meaning: "A systematic tilt in how data was collected, making results unfair or skewed." },
      { word: "outlier", meaning: "A value far away from the rest of the data." },
      { word: "quartile", meaning: "A cut point splitting ordered data into quarters: Q1, Q2 (median), Q3." },
      { word: "interquartile range", meaning: "IQR = Q3 − Q1: the spread of the middle 50% of the data." },
      { word: "correlation", meaning: "Two variables moving together — which alone proves no cause." },
    ],
    funFact:
      "In the 1850s Florence Nightingale invented diagram-based statistics: her 'coxcomb' charts proved most Crimean War soldiers died from disease, not battle — and transformed hospital hygiene.",
    strategyLab: [
      {
        problem:
          "Two gamers average the same points: Noah 12, 14, 15, 16, 18 and Marco 2, 12, 15, 18, 28. Who is the more consistent scorer?",
        answer: "Noah — same mean (15) but a far smaller spread",
        answerCheck:
          "Recompute the means: Noah 75 ÷ 5 = 15 ✓ and Marco 75 ÷ 5 = 15 ✓. The difference is spread, not centre.",
        methods: [
          {
            name: "Range Comparison",
            emoji: "📏",
            whenToUse: "The quickest spread check between two data sets.",
            steps: [
              "Noah: max − min = 18 − 12 = 6.",
              "Marco: max − min = 28 − 2 = 26.",
              "Same mean, but Marco's results swing 26 vs Noah's 6 → Noah is the consistent one.",
            ],
          },
          {
            name: "Deviation-from-the-Mean",
            emoji: "🎯",
            whenToUse: "The logic behind standard deviation — how far do values typically sit from the mean?",
            steps: [
              "Noah's gaps from 15: 3, 1, 0, 1, 3 — never more than 3.",
              "Marco's gaps from 15: 13, 3, 0, 3, 13 — usually large.",
              "A small typical gap means consistency: Noah.",
            ],
          },
        ],
      },
      {
        problem: "Ten quiz scores: 12, 15, 11, 18, 14, 9, 16, 13, 17, 10. Find the median and the interquartile range.",
        answer: "median 13.5, IQR = 5",
        answerCheck:
          "There are 10 values, so the median sits between the 5th and 6th ordered values. Lower half 9–13 → Q1 = 11; upper half 14–18 → Q3 = 16; 16 − 11 = 5 ✓.",
        methods: [
          {
            name: "Order, Split, Take Middles",
            emoji: "📶",
            whenToUse: "The by-hand method — always start by sorting.",
            steps: [
              "Order the data: 9, 10, 11, 12, 13, 14, 15, 16, 17, 18.",
              "Median = average of 5th and 6th values: (13 + 14) ÷ 2 = 13.5.",
              "Split around the median: lower half 9, 10, 11, 12, 13 → Q1 = 11; upper half 14, 15, 16, 17, 18 → Q3 = 16.",
              "IQR = 16 − 11 = 5.",
            ],
          },
          {
            name: "Five-Number Summary (Box Plot View)",
            emoji: "📦",
            whenToUse: "When you want the whole story of a data set in one picture.",
            steps: [
              "Collect the five numbers: min 9, Q1 11, median 13.5, Q3 16, max 18.",
              "Sketch the box from Q1 to Q3 with a line at the median.",
              "Read the box width: IQR = Q3 − Q1 = 16 − 11 = 5 — the middle half of scores lives in a 5-point band.",
            ],
          },
        ],
      },
    ],
    quiz: [
      {
        question: "Data: 4, 8, 15, 16, 23, 42. What is the median?",
        options: ["15", "16", "15.5", "23"],
        answerIndex: 2,
        explanation: "With six values, average the two middle ones: (15 + 16) ÷ 2 = 15.5.",
      },
      {
        question: "A school wants students' opinions on lunches. It surveys only the basketball teams. What is the main problem?",
        options: [
          "The sample is biased — it over-represents sporty students",
          "Basketball teams are too small to count",
          "Surveys can never be trusted",
          "The sample is too random",
        ],
        answerIndex: 0,
        explanation:
          "The sample is not representative of the whole school — that is the definition of bias.",
      },
      {
        question: "Data: 3, 5, 7, 9, 11, 13, 15. What is the interquartile range (Q3 − Q1)?",
        options: ["8", "12", "5", "10"],
        answerIndex: 0,
        explanation:
          "Median 9 splits the data. Lower half 3, 5, 7 → Q1 = 5; upper half 11, 13, 15 → Q3 = 13. IQR = 13 − 5 = 8.",
      },
      {
        question: "Ice cream sales and drowning incidents rise together every summer. What is the best explanation?",
        options: [
          "Ice cream causes drowning",
          "A hidden variable — hot weather — drives both",
          "The numbers must be faked",
          "Drowning makes people hungry",
        ],
        answerIndex: 1,
        explanation: "Correlation without causation: heat causes both swimming and ice cream. Watch for third variables.",
      },
      {
        question:
          "Salaries (in $1000s): 30, 35, 40, 45, 250. The median is 40 but the mean is 80. Why is the median the better 'typical' value here?",
        options: [
          "The outlier 250 drags the mean far above what most people earn",
          "Medians are always bigger than means",
          "The mean was miscalculated",
          "The mode would be better still",
        ],
        answerIndex: 0,
        explanation: "Sum = 400, mean = 80 — but four of five people earn under $50k. The outlier inflates the mean; the median resists it.",
      },
    ],
    worksheet: [
      {
        kind: "fill-blank",
        prompt: "Find the mean of 6, 7, 8, 11. (type the number)",
        answer: "8",
      },
      {
        kind: "practice",
        prompt: "Find the median of 12, 5, 9, 3, 10.",
        answer: "9",
        hint: "Order the list first.",
      },
      {
        kind: "fill-blank",
        prompt: "What is the range of 3, 3, 5, 9, 10, 18?",
        answer: "15",
      },
      {
        kind: "practice",
        prompt: "Scores: 2, 4, 4, 6, 10, 14, 18. What is the lower quartile Q1?",
        answer: "4",
        hint: "Median of the lower half (2, 4, 4).",
      },
      {
        kind: "short-answer",
        prompt:
          "Noah claims, 'People who carry umbrellas make it rain.' Explain what his reasoning gets wrong about correlation and causation.",
        sampleAnswer:
          "Umbrellas and rain are correlated, but neither causes the other — a third factor (stormy weather in the forecast) causes both umbrella-carrying and rain. Correlation alone cannot establish cause; you would need a controlled experiment.",
      },
      {
        kind: "fill-blank",
        prompt: "The ______ is the middle value of an ordered data set.",
        answer: "median",
      },
    ],
  },

  // ---------------------------------------------------------------------------
  // 7. Probability: Predicting Chance (refit of probability half of original math-teen-3)
  // ---------------------------------------------------------------------------
  {
    id: "math-teen-7",
    title: "Probability: Predicting Chance",
    emoji: "🎲",
    minutes: 17,
    intro:
      "From loot boxes to weather apps to basketball strategy, probability is how smart people bet on the future. Learn to count chances like a bookmaker — or beat one.",
    sections: [
      {
        heading: "Theoretical vs Experimental",
        body: "Theoretical probability = favourable outcomes ÷ total equally likely outcomes. Experimental probability = observed successes ÷ trials. Short runs wobble; as trials pile up, results converge to the theory — the law of large numbers.",
        example:
          "A fair coin is 'due' nothing: 10 flips giving 3 heads (30%) is normal wobble. Theory says 50%, and millions of flips get extremely close to it.",
        tip: "P = 0 means impossible, P = 1 means certain — everything real sits in between.",
      },
      {
        heading: "Tree Diagrams and Independent Events",
        body: "A tree diagram lists every combined outcome: multiply probabilities along the branches. Independent events do not influence each other, so P(A and B) = P(A) × P(B).",
        example: "Two coins: P(HH) = 1/2 × 1/2 = 1/4. A die and a coin: P(six and heads) = 1/6 × 1/2 = 1/12.",
        tip: "The tips of a complete tree must all have equal probability — a great error check.",
      },
      {
        heading: "Complementary Counting",
        body: "Sometimes 'at least one' is messy to count directly but easy the other way round: P(at least one A) = 1 − P(no A). Flip the problem.",
        example: "P(at least one head in two flips) = 1 − P(TT) = 1 − 1/4 = 3/4.",
        tip: "See the words 'at least'? Immediately think 1 − P(none).",
      },
      {
        heading: "Expected Outcomes",
        body: "Expected number of successes = number of trials × probability of success. It is a long-run average, not a promise for the next run.",
        example: "Roll a die 300 times: expect 300 × 1/6 = 50 sixes — though 44 or 57 would be unremarkable.",
        tip: "Game designers use expected value to price loot drops so the game stays fair AND fun.",
      },
    ],
    vocab: [
      { word: "theoretical probability", meaning: "Favourable ÷ total equally likely outcomes — what should happen." },
      { word: "experimental probability", meaning: "Observed successes ÷ trials — what actually happened." },
      { word: "tree diagram", meaning: "A branching picture of combined outcomes; multiply along branches." },
      { word: "independent events", meaning: "Events that do not affect each other, so their probabilities multiply." },
      { word: "complement", meaning: "The opposite event: P(not A) = 1 − P(A)." },
      { word: "expected value", meaning: "Trials × probability — the average result over the long run." },
    ],
    funFact:
      "In 1654 the gambler Chevalier de Méré wrote to Blaise Pascal about how to split a pot fairly. The Pascal–Fermat letters that followed essentially invented probability theory.",
    strategyLab: [
      {
        problem: "Two fair dice are rolled. What is P(sum = 7)?",
        answer: "6/36 = 1/6",
        answerCheck:
          "A full 6×6 grid holds 36 equally likely outcomes; the six diagonal pairs (1,6)…(6,1) confirm 6 favourable — and 6/36 simplifies to 1/6.",
        methods: [
          {
            name: "Grid Listing",
            emoji: "▦",
            whenToUse: "Small outcome spaces — list everything and count.",
            steps: [
              "Make a 6×6 grid: rows for the first die, columns for the second — 36 equally likely cells.",
              "Mark every cell whose labels add to 7: (1,6), (2,5), (3,4), (4,3), (5,2), (6,1).",
              "P(sum = 7) = 6/36 = 1/6.",
            ],
          },
          {
            name: "For-Each Partner Count",
            emoji: "🤝",
            whenToUse: "Faster than a grid once you notice the structure.",
            steps: [
              "Fix the first die: if it shows 1, the second must be 6 — exactly one partner works.",
              "The same holds for 2, 3, 4, 5 and 6: one partner each, and no pair repeats.",
              "So 6 favourable outcomes out of 36 → 1/6.",
            ],
          },
        ],
      },
      {
        problem: "A coin is flipped 3 times. What is P(at least one head)?",
        answer: "7/8",
        answerCheck:
          "The full tree has 8 equal tips (HHH … TTT); exactly 7 of them contain a head. Both methods agree.",
        methods: [
          {
            name: "Complementary Counting",
            emoji: "🔄",
            whenToUse: "'At least one' problems — count the opposite, then subtract.",
            steps: [
              "P(at least one head) = 1 − P(no heads).",
              "No heads means TTT: P = 1/2 × 1/2 × 1/2 = 1/8.",
              "Answer: 1 − 1/8 = 7/8.",
            ],
          },
          {
            name: "Tree Diagram",
            emoji: "🌳",
            whenToUse: "When you need to SEE every outcome — or the question asks about several events at once.",
            steps: [
              "Draw 3 stages of H/T branches: 2 × 2 × 2 = 8 tips.",
              "Multiply along each path: every tip has probability 1/8.",
              "Every tip except TTT contains at least one head: 7 tips → 7/8.",
            ],
          },
        ],
      },
    ],
    quiz: [
      {
        question: "A bag has 3 red, 2 blue and 5 green marbles. What is P(blue)?",
        options: ["1/2", "1/5", "2/3", "2/5"],
        answerIndex: 1,
        explanation: "2 blue out of 10 total: 2/10 = 1/5.",
      },
      {
        question: "Rolling two fair dice, what is P(both show 6)?",
        options: ["1/6", "1/12", "1/36", "1/2"],
        answerIndex: 2,
        explanation: "Independent events: 1/6 × 1/6 = 1/36.",
      },
      {
        question: "A spinner lands on 'bonus' 1/5 of the time. In 80 spins, how many bonuses should you expect?",
        options: ["16", "20", "25", "40"],
        answerIndex: 0,
        explanation: "Expected value = trials × probability = 80 × 1/5 = 16.",
      },
      {
        question: "Kai flips a fair coin and gets 5 heads in a row. What is P(heads) on the next flip?",
        options: [
          "Less than 1/2 — tails is due",
          "Exactly 1/2 — flips are independent",
          "More than 1/2 — heads is on a streak",
          "It depends on the first five flips",
        ],
        answerIndex: 1,
        explanation:
          "Coins have no memory. Each flip is independent, so the chance stays 1/2 — the 'gambler's fallacy' catches millions.",
      },
      {
        question: "A die is rolled twice. What is P(at least one six)?",
        options: ["11/36", "1/3", "25/36", "1/6"],
        answerIndex: 0,
        explanation: "P(no six in a roll) = 5/6, so P(no six twice) = 25/36. Complement: 1 − 25/36 = 11/36.",
      },
    ],
    worksheet: [
      {
        kind: "fill-blank",
        prompt: "Independent events: P(A) = 1/2 and P(B) = 1/3, so P(A and B) = ___ (a fraction like 1/2).",
        answer: "1/6",
      },
      {
        kind: "practice",
        prompt: "A bag holds 3 red, 2 blue and 5 green marbles. Find P(blue) as a fraction in lowest terms.",
        answer: "1/5",
        hint: "Count all the marbles first.",
      },
      {
        kind: "match",
        prompt: "Match each event to its probability.",
        left: [
          "P(six on one fair die)",
          "P(hearts, from a 52-card deck)",
          "P(two heads, two fair coins)",
          "P(a number greater than 4 on one fair die)",
        ],
        right: ["1/4", "1/13", "1/6", "1/3"],
        answer: [2, 1, 0, 3],
      },
      {
        kind: "practice",
        prompt: "A spinner lands 'bonus' 1/5 of the time. In 200 spins, how many bonuses should Aisha expect?",
        answer: "40",
        hint: "Trials × probability.",
      },
      {
        kind: "short-answer",
        prompt:
          "Marco flips a coin 20 times and gets 14 heads. He claims the coin must be unfair. Explain the difference between experimental and theoretical probability, and what he should do next.",
        sampleAnswer:
          "His experimental probability is 14/20 = 0.7, but the theoretical value for a fair coin is 0.5. Small samples wobble a lot. He should flip many more times — if the coin is fair, the relative frequency should drift toward 0.5.",
      },
      {
        kind: "fill-blank",
        prompt: "P(at least one head in two flips) = 1 − 1/4 = ___ (a fraction).",
        answer: "3/4",
      },
    ],
  },

  // ---------------------------------------------------------------------------
  // 8. Advanced Problem Solving
  // ---------------------------------------------------------------------------
  {
    id: "math-teen-8",
    title: "Advanced Problem Solving",
    emoji: "🏔️",
    minutes: 20,
    intro:
      "Hard problems are not solved by genius — they are solved by method. Learn the Understand-Plan-Solve-Check loop, Fermi estimation and model-building, then walk into any exam calmly.",
    sections: [
      {
        heading: "The UPSC Loop",
        body: "Four stages, every time. Understand: what is asked, what is given? Plan: which tools fit (equation, ratio, diagram)? Solve: execute neatly, one step per line. Check: does the answer size up, do units match, does substitution work?",
        example:
          "'A number doubled plus 3 is 17.' Understand: find the number. Plan: balance the equation. Solve: 2n + 3 = 17 → n = 7. Check: 2(7) + 3 = 17 ✓.",
        tip: "Most marks are lost at Understand — reread the question once more before you compute.",
      },
      {
        heading: "Fermi Estimation",
        body: "Fermi problems look impossible ('how many piano tuners in a city?') and are solved by breaking them into estimable chunks, rounding boldly, and multiplying. Getting within 3× of the truth counts as a win — the reasoning is the skill.",
        example: "Breaths per year: about 15 per minute × 60 × 24 ≈ 21,600 per day; × 365 ≈ 7.9 million per year.",
        tip: "Keep numbers to 1–2 significant figures — precision is pointless when your inputs are estimates.",
      },
      {
        heading: "Building Models from Scenarios",
        body: "Real questions hide equations. Translate words into symbols: flat fee + per-unit rate → y = mx + b; more workers → inverse proportion; repeated growth → multiply by the scale factor each step. Identify the structure first, then compute.",
        example:
          "Plan A: $25 + $1.50 per GB. Plan B: $40 flat. Equal when 25 + 1.5g = 40 → g = 10 GB. Below 10 GB choose A; above, B.",
        tip: "Name your variables before you build — 'let g = gigabytes used' prevents confusion later.",
      },
      {
        heading: "Exam Technique",
        body: "Scan the whole paper first and start on your strongest topic. Show working — method marks survive arithmetic slips. Estimate before you calculate so wild answers expose themselves. Leave time to check units, signs, and the actual question asked.",
        example:
          "Before multiplying 48 × 21 exactly, estimate 50 × 20 = 1000 — if your exact answer comes out 10,080, the estimate just saved you.",
        tip: "One clear line of working per step. Examiners cannot mark what they cannot read.",
      },
    ],
    vocab: [
      { word: "strategy", meaning: "A chosen plan of attack before any numbers get touched." },
      { word: "estimate", meaning: "A quick, sensible approximation used to sanity-check exact work." },
      { word: "order of magnitude", meaning: "The power of ten a quantity sits at — 'thousands' vs 'millions'." },
      { word: "model", meaning: "A mathematical description (equation, graph, ratio) of a real situation." },
      { word: "break-even point", meaning: "The value where two cost options are equal — the switch-over." },
      { word: "assumption", meaning: "A stated simplification, like 'about 4,000 steps per day', that makes estimating possible." },
    ],
    funFact:
      "Physicist Enrico Fermi challenged students with 'how many piano tuners work in Chicago?' — no notes allowed. He also led the team that built the world's first nuclear reactor in 1942.",
    strategyLab: [
      {
        problem:
          "Plan A costs $25 plus $1.50 per GB of data. Plan B costs $40 flat. At how many GB do the plans cost the same, and which is better above that?",
        answer: "They match at 10 GB; above 10 GB Plan B is cheaper",
        answerCheck:
          "Test just past the switch: at 12 GB, A = 25 + 1.5(12) = $43 > $40 = B ✓ — so B wins above the break-even point.",
        methods: [
          {
            name: "Break-Even Equation",
            emoji: "⚖️",
            whenToUse: "Any 'when do two options match?' scenario.",
            steps: [
              "Let g = GB used. Set the costs equal: 25 + 1.5g = 40.",
              "Subtract 25: 1.5g = 15.",
              "Divide by 1.5: g = 10. Above 10 GB, flat Plan B beats Plan A.",
            ],
          },
          {
            name: "Table of Values",
            emoji: "📋",
            whenToUse: "When you want to SEE the crossover — great for explaining your answer to others.",
            steps: [
              "Compute A = 25 + 1.5g at g = 0, 5, 10, 15: $25, $32.50, $40, $47.50.",
              "Plan B forms a constant row: $40, $40, $40, $40.",
              "The rows touch at g = 10; beyond it A climbs past B.",
            ],
          },
          {
            name: "Graph the Lines",
            emoji: "📈",
            whenToUse: "Perfect when a question asks you to justify the answer visually.",
            steps: [
              "Plot A: y-intercept 25, slope 1.5 — a rising line.",
              "Plot B: a horizontal line at 40.",
              "The intersection at (10, 40) is the break-even point; to its right, B sits lower (cheaper).",
            ],
          },
        ],
      },
      {
        problem: "Fermi estimate: roughly how many seconds does an 80-year lifetime contain?",
        answer: "About 2.5 billion seconds (≈ 2.5 × 10⁹)",
        answerCheck:
          "Exact-ish: 31,536,000 seconds per year × 80 = 2,522,880,000 — the estimate 2.5 × 10⁹ is within 1%.",
        methods: [
          {
            name: "Multiply-Out (Chunked Fermi)",
            emoji: "🧮",
            whenToUse: "When you know the conversion chain and can chain it step by step.",
            steps: [
              "80 years × 365 days ≈ 29,200 days.",
              "× 24 hours ≈ 700,800 hours.",
              "× 3600 seconds ≈ 2.5 billion seconds.",
            ],
          },
          {
            name: "π × 10⁷ Shortcut",
            emoji: "🔟",
            whenToUse: "A one-second sanity check for any answer involving time in seconds.",
            steps: [
              "One year ≈ π × 10⁷ seconds — a famous coincidence (≈ 31.4 million).",
              "80 × 3.14 × 10⁷ ≈ 2.5 × 10⁹.",
              "Order of magnitude: billions. Any answer in millions or trillions is instantly suspect.",
            ],
          },
        ],
      },
    ],
    quiz: [
      {
        question: "What should be Dev's FIRST step when facing a long, unfamiliar problem?",
        options: [
          "Make sure he understands exactly what is asked and what information he has",
          "Start calculating immediately to save time",
          "Try the most impressive-looking method",
          "Skip it and hope it is not worth many marks",
        ],
        answerIndex: 0,
        explanation: "Understand comes before everything — a perfect answer to the wrong question scores zero.",
      },
      {
        question: "A heart beats about 70 times per minute. Roughly how many beats is that per day?",
        options: ["1,000", "10,000", "100,000", "10,000,000"],
        answerIndex: 2,
        explanation: "70 × 60 = 4,200 per hour; × 24 ≈ 100,800 — so about 100,000.",
      },
      {
        question:
          "Gym A charges $10 per visit. Gym B charges $59 per month for unlimited visits. B becomes cheaper once you visit more than ___ times a month.",
        options: ["4", "5", "6", "10"],
        answerIndex: 2,
        explanation: "5 visits cost $50 (A cheaper); 6 visits cost $60 > $59 — so from the 6th visit, B wins.",
      },
      {
        question: "Amara multiplies 48 × 21 and gets 10,080. What is the fastest sanity check?",
        options: [
          "Estimate 50 × 20 = 1000 — her answer is about 10× too big",
          "Multiply again exactly the same way",
          "Add the digits of both numbers",
          "Divide 10,080 by 21",
        ],
        answerIndex: 0,
        explanation: "Rounding gives 50 × 20 = 1000, so the true answer is near 1000 (exactly 1,008) — not 10,080.",
      },
      {
        question: "A 240-litre tank fills at 12 L/min while a leak drains 4 L/min. How long does it take to fill?",
        options: ["15 minutes", "20 minutes", "30 minutes", "60 minutes"],
        answerIndex: 2,
        explanation: "Net rate = 12 − 4 = 8 L/min. Time = 240 ÷ 8 = 30 minutes.",
      },
    ],
    worksheet: [
      {
        kind: "fill-blank",
        prompt: "The problem-solving loop: Understand → Plan → ___ → Check.",
        answer: "solve",
      },
      {
        kind: "practice",
        prompt:
          "A heart beats about 70 times per minute. How many beats in 24 hours? (type digits only, no commas)",
        answer: "100800",
        hint: "70 × 60 × 24.",
      },
      {
        kind: "fill-blank",
        prompt: "Estimate 197 × 41 by rounding: 200 × 40 = ___.",
        answer: "8000",
      },
      {
        kind: "practice",
        prompt:
          "A 300-litre tank fills at 18 L/min while leaking 3 L/min. How many minutes does it take to fill? (type digits only)",
        answer: "20",
        hint: "Net rate = 18 − 3 = 15 L/min.",
      },
      {
        kind: "short-answer",
        prompt:
          "Aisha wants a Fermi estimate of how many steps she walks during a school year of 200 school days. Describe the assumption she should state, and give a sensible estimate.",
        sampleAnswer:
          "State an assumption such as 'about 4,000 steps per school day' (walking to school, breaks, PE). Then 4,000 × 200 = 800,000 steps. Any clearly stated daily assumption in the 2,000–8,000 range gives a defensible estimate between 400,000 and 1,600,000.",
      },
      {
        kind: "fill-blank",
        prompt:
          "Plan A: $25 + $1.50 per GB. Plan B: $40 flat. The two plans cost the same at ___ GB.",
        answer: "10",
        hint: "Solve 25 + 1.5g = 40.",
      },
    ],
  },
];
