// Mathematics — Intermediate Learning (ages 12-13)
// Seven lessons: Ratios & Proportions, Integers, Percent Power, Algebra Basics,
// Geometry, Statistics and a Problem-Solving Toolbox.
// Every lesson carries a Strategy Lab: the SAME problem solved with genuinely
// different mental models, because at BrightMinds we never just hand over answers.
import type { Lesson } from "./types";

export const lessons: Lesson[] = [
  // -------------------------------------------------------------------------
  // 1. Ratios & Proportions
  // -------------------------------------------------------------------------
  {
    id: "math-intermediate-1",
    title: "Ratios & Proportions",
    emoji: "⚖️",
    minutes: 12,
    intro:
      "Ratios are the secret recipes behind perfect smoothies, model cars and map scales. Master them and you can scale anything up or down without ruining it.",
    sections: [
      {
        heading: "What Is a Ratio?",
        body: "A ratio compares two amounts. If a smoothie blends 3 cups of mango with 4 cups of yogurt, the ratio of mango to yogurt is 3:4. Order matters — 3:4 is NOT the same as 4:3. Ratios simplify exactly like fractions: divide both parts by the same number.",
        example:
          "In a class of 24 students, 14 walk to school and 10 bike. The walk-to-bike ratio is 14:10, which simplifies to 7:5.",
        tip: "Simplify a ratio by dividing BOTH parts by the same number.",
      },
      {
        heading: "Proportions: Equal Ratios",
        body: "A proportion says two ratios are equal, like 3:4 = 6:8. To find a missing value, ask how one side changed, then do the same to the other side. That single question solves most recipe, speed and scale problems.",
        example:
          "A recipe needs 2 eggs for every 3 cups of flour. For 9 cups of flour: 9 ÷ 3 = 3, so you need 2 × 3 = 6 eggs.",
        tip: "Ask: what was one side multiplied by? Apply the SAME factor to the other side.",
      },
      {
        heading: "Unit Rates",
        body: "A unit rate compares to exactly ONE — price per item, speed per hour, pages per minute. Divide to find it. Unit rates make shopping comparisons instant: the lowest cost-per-one wins.",
        example:
          "6 apples cost $3.00, so each apple costs 3 ÷ 6 = $0.50 — fifty cents per apple.",
        tip: "Unit rate turns every comparison into a per-one contest.",
      },
      {
        heading: "Proportion Tables & Map Scales",
        body: "When numbers get messy, line the two ratios up in a proportion table and cross-multiply: if a/b = c/d, then a × d = b × c. This is exactly how map scales work — 1 cm on paper standing for many kilometres on the ground.",
        example:
          "A map scale is 1 cm : 25 km. Two cities sit 6 cm apart, so the real distance is 6 × 25 = 150 km.",
        tip: "Cross-multiplying works because both ratios hide the same unit rate.",
      },
    ],
    vocab: [
      { word: "ratio", meaning: "A comparison of two amounts, like 3:4." },
      { word: "proportion", meaning: "Two equal ratios, like 3:4 = 6:8." },
      { word: "unit rate", meaning: "A rate per exactly one, like $0.50 per apple." },
      { word: "scale factor", meaning: "The number both parts of a ratio are multiplied or divided by." },
      { word: "equivalent", meaning: "Different-looking ratios that describe the same comparison." },
    ],
    funFact:
      "The golden ratio (about 1.618) appears in sunflower seed spirals, seashells and even the Parthenon in Greece.",
    strategyLab: [
      {
        problem: "Maya's smoothie recipe blends 3 cups of mango with 4 cups of yogurt. She wants to use 12 cups of yogurt. How many cups of mango keep the taste exactly the same?",
        answer: "9 cups",
        answerCheck:
          "Check the scale factor: yogurt went 4 → 12 (× 3), and mango went 3 → 9 (× 3) too ✓",
        methods: [
          {
            name: "Scale Factor Detective",
            emoji: "🔍",
            whenToUse: "When one amount is an easy multiple of the other.",
            steps: [
              "Find how the known part changed: 4 cups → 12 cups is × 3.",
              "Apply the SAME factor to the other part: 3 × 3 = 9.",
              "So 9 cups of mango keeps the 3:4 ratio exact.",
            ],
          },
          {
            name: "Unit Rate First",
            emoji: "🎯",
            whenToUse: "When you want an amount-per-one before scaling up.",
            steps: [
              "Find mango per 1 cup of yogurt: 3 ÷ 4 = 0.75 cup.",
              "Multiply by the yogurt you actually have: 0.75 × 12 = 9.",
              "Answer: 9 cups of mango.",
            ],
          },
          {
            name: "Proportion Table + Cross-Multiply",
            emoji: "⚖️",
            whenToUse: "When the numbers are messy and scaling is not obvious.",
            steps: [
              "Set up the proportion 3/4 = m/12.",
              "Cross-multiply: 4 × m = 3 × 12, so 4m = 36.",
              "Divide both sides by 4: m = 9.",
            ],
          },
        ],
      },
      {
        problem: "A map scale says 1 cm : 5 km. Two towns are 8.5 cm apart on the map. What is the real distance?",
        answer: "42.5 km",
        answerCheck:
          "Estimate first: 8.5 cm is just under 9 cm, and 9 × 5 = 45 — so 42.5 km sits right in range ✓",
        methods: [
          {
            name: "Rate Multiplier",
            emoji: "🚗",
            whenToUse: "When the scale gives you a clean value per unit.",
            steps: [
              "Each cm stands for 5 km, so every cm is worth 5.",
              "Multiply: 8.5 × 5 = 42.5.",
              "Answer: 42.5 km.",
            ],
          },
          {
            name: "Chunk & Add",
            emoji: "🧩",
            whenToUse: "When the multiplier is awkward but the number splits nicely.",
            steps: [
              "Split 8.5 cm into friendly chunks: 8 cm + 0.5 cm.",
              "8 cm = 40 km, and 0.5 cm = 2.5 km.",
              "Add the chunks: 40 + 2.5 = 42.5 km.",
            ],
          },
          {
            name: "Cross-Multiply",
            emoji: "✖️",
            whenToUse: "When you want one reliable method that always works.",
            steps: [
              "Write the proportion 1/5 = 8.5/d.",
              "Cross-multiply: 1 × d = 5 × 8.5.",
              "So d = 42.5 km.",
            ],
          },
        ],
      },
    ],
    quiz: [
      {
        question: "A trail mix blends 5 parts nuts with 2 parts chocolate. What is the nut-to-chocolate ratio?",
        options: ["2:5", "5:2", "7:5", "5:7"],
        answerIndex: 1,
        explanation: "Nuts were named first, so nuts come first: 5:2.",
      },
      {
        question: "Which ratio is equivalent to 12:18?",
        options: ["2:3", "3:2", "4:9", "6:12"],
        answerIndex: 0,
        explanation: "Divide both parts by 6: 12:18 = 2:3.",
      },
      {
        question: "Amara drives 210 miles in 3 hours. What is her average speed as a unit rate?",
        options: ["63 mph", "70 mph", "630 mph", "213 mph"],
        answerIndex: 1,
        explanation: "210 ÷ 3 = 70, so she averages 70 miles per hour.",
      },
      {
        question: "A recipe needs 4 eggs for every 6 cups of flour. How many eggs for 15 cups of flour?",
        options: ["8 eggs", "10 eggs", "12 eggs", "11 eggs"],
        answerIndex: 1,
        explanation: "15 ÷ 6 = 2.5, so scale the eggs too: 4 × 2.5 = 10.",
      },
      {
        question: "A map scale is 1 cm : 25 km. Two cities are 6 cm apart on the map. What is the real distance?",
        options: ["31 km", "125 km", "150 km", "600 km"],
        answerIndex: 2,
        explanation: "Each cm is worth 25 km: 6 × 25 = 150 km.",
      },
    ],
    worksheet: [
      {
        kind: "fill-blank",
        prompt: "Simplify the ratio 10:15 to its simplest form (like 2:3).",
        answer: "2:3",
      },
      {
        kind: "practice",
        prompt: "A punch recipe uses 3 cups of juice for every 2 cups of soda. How many cups of juice for 8 cups of soda?",
        answer: "12",
        hint: "8 ÷ 2 tells you the scale factor.",
      },
      {
        kind: "practice",
        prompt: "Leo reads 40 pages in 50 minutes. At that rate, how many pages in 100 minutes?",
        answer: "80",
        hint: "100 minutes is double 50 minutes.",
      },
      {
        kind: "fill-blank",
        prompt: "9 movie tickets cost $36. The unit price is $___ per ticket.",
        answer: "4",
      },
      {
        kind: "short-answer",
        prompt:
          "A smoothie recipe for 2 people uses 1.5 cups of mango. You are blending for 5 people. How much mango do you need, and how do you know?",
        sampleAnswer:
          "5 ÷ 2 = 2.5, so scale the recipe by 2.5: 1.5 × 2.5 = 3.75 cups of mango.",
      },
      {
        kind: "practice",
        prompt: "A model train is built at 1:87 scale. The real train is 26.1 metres long. How long is the model, in metres?",
        answer: "0.3",
        hint: "Divide the real length by 87.",
      },
    ],
  },

  // -------------------------------------------------------------------------
  // 2. Integers: The Number Line in Both Directions
  // -------------------------------------------------------------------------
  {
    id: "math-intermediate-2",
    title: "Integers: The Number Line in Both Directions",
    emoji: "🌡️",
    minutes: 13,
    intro:
      "Temperatures drop below zero, submarines dive below sea level and game scores can go negative. Integers are the numbers that live on BOTH sides of zero.",
    sections: [
      {
        heading: "Meet the Negatives",
        body: "The number line does not stop at zero — it keeps going left into negative numbers. Every positive number has an opposite the same distance from zero: 3 and -3 are opposites. Zero is its own opposite and sits right in the middle.",
        example: "Owing $8 can be written as -8 dollars. A basement 2 floors down is at level -2.",
        tip: "The further LEFT a number sits, the smaller it is — even though it looks bigger.",
      },
      {
        heading: "Comparing & Ordering",
        body: "To compare integers, picture the number line: any number to the right is greater. That is why -8 < -3 — it is colder! The absolute value of a number, written |n|, is its distance from zero and is never negative: |-7| = 7.",
        example: "Order from least to greatest: -5, 2, -1, 0 becomes -5, -1, 0, 2. And |-7| = 7 because -7 sits 7 steps from zero.",
        tip: "Think temperature: -8°C is colder than -3°C, so -8 is the smaller number.",
      },
      {
        heading: "Adding & Subtracting",
        body: "Adding a positive moves right; adding a negative moves LEFT. Subtracting is the reverse: subtracting a positive moves left, and subtracting a negative moves right. When signs clash in an addition like -6 + 11, the answer takes the sign of the bigger absolute value.",
        example: "-6 + 11 = 5 (start at -6, jump 11 right). -4 - 6 = -10 (start at -4, jump 6 left). A zero pair is a +1 with a -1: they cancel to 0.",
        tip: "Sketch a quick number line — four seconds of drawing saves four wrong answers.",
      },
      {
        heading: "Multiplying & Dividing",
        body: "Multiply or divide the absolute values first, then decide the sign: SAME signs give a positive answer, DIFFERENT signs give a negative answer. This works for every combination.",
        example: "(-3) × 4 = -12 (different signs), but (-3) × (-4) = 12 (same signs). And -12 ÷ 4 = -3.",
        tip: "Same signs +, different signs −. Say it twice, use it forever.",
      },
      {
        heading: "Integers in Real Life",
        body: "Negative numbers are everywhere: temperatures below zero, elevations below sea level, yards lost in football, money you owe. A debt of $12 is -12; paying back $5 brings you to -7.",
        example: "A submarine at -60 m that rises 25 m is now at -60 + 25 = -35 m — still 35 m below the surface.",
        tip: "Ask yourself: does zero mean sea level, freezing, broke or nothing? Context sets the zero.",
      },
    ],
    vocab: [
      { word: "integer", meaning: "A whole number and its negatives: ..., -2, -1, 0, 1, 2, ..." },
      { word: "opposite", meaning: "The same distance from zero on the other side, like 4 and -4." },
      { word: "zero pair", meaning: "A positive and a negative that cancel to 0." },
      { word: "absolute value", meaning: "Distance from zero, always positive: |-9| = 9." },
      { word: "elevation", meaning: "Height relative to sea level — below sea level is negative." },
    ],
    funFact:
      "The lowest temperature ever recorded on Earth was -89.2°C at Vostok Station, Antarctica, in 1983.",
    strategyLab: [
      {
        problem: "At midnight the temperature is -4°C. By noon it has risen 9 degrees. What is the noon temperature?",
        answer: "5°C",
        answerCheck: "Check by counting back: from 5°C, dropping 9 degrees lands on -4°C again ✓",
        methods: [
          {
            name: "Number Line Moves",
            emoji: "↗️",
            whenToUse: "Whenever you can picture the line — it makes signs visual.",
            steps: [
              "Start at -4 on the number line.",
              "'Rises 9 degrees' means jump 9 steps to the RIGHT.",
              "Four steps reach 0, then five more land on 5. So it is 5°C.",
            ],
          },
          {
            name: "Bridge to Zero",
            emoji: "🌉",
            whenToUse: "When you cross zero and want to avoid sign slips.",
            steps: [
              "Split the journey at zero: -4 to 0 is 4 steps.",
              "The rise still has 9 - 4 = 5 steps left.",
              "Those 5 steps land above zero: 5°C.",
            ],
          },
          {
            name: "Sign Rules for Adding",
            emoji: "➕",
            whenToUse: "For fast mental addition with mixed signs.",
            steps: [
              "-4 + 9 mixes signs, so subtract the absolute values: 9 - 4 = 5.",
              "The bigger absolute value (9) is positive, so the answer is positive.",
              "Answer: 5°C.",
            ],
          },
        ],
      },
      {
        problem: "A scuba diver descends 3 metres per minute for 4 minutes. What is her depth, written as an integer?",
        answer: "-12 m",
        answerCheck: "Check with the inverse operation: -12 ÷ 4 = -3 metres per minute ✓",
        methods: [
          {
            name: "Repeated Addition",
            emoji: "🧮",
            whenToUse: "To SEE what multiplication by a negative really means.",
            steps: [
              "Each minute adds -3 m: -3 + -3 + -3 + -3.",
              "Four groups of -3 pile up below zero.",
              "Total: -12 m.",
            ],
          },
          {
            name: "Sign Rules",
            emoji: "✖️",
            whenToUse: "The fastest route once you trust the rule.",
            steps: [
              "Multiply the absolute values: 3 × 4 = 12.",
              "Negative × positive are different signs, so the answer is negative.",
              "Answer: -12 m.",
            ],
          },
          {
            name: "Number Line Jumps",
            emoji: "↔️",
            whenToUse: "To picture repeated moves landing further and further left.",
            steps: [
              "Start at 0 on a vertical or horizontal line.",
              "Make 4 equal jumps of 3, all to the LEFT (down is negative).",
              "You land on -12.",
            ],
          },
        ],
      },
    ],
    quiz: [
      {
        question: "Which number is the greatest?",
        options: ["-7", "-2", "-9", "0"],
        answerIndex: 3,
        explanation: "Every negative sits below zero on the number line, so 0 wins.",
      },
      {
        question: "-6 + 11 = ?",
        options: ["-5", "5", "17", "-17"],
        answerIndex: 1,
        explanation: "Signs differ, so subtract: 11 - 6 = 5, and the bigger value is positive.",
      },
      {
        question: "-4 - 6 = ?",
        options: ["2", "-2", "10", "-10"],
        answerIndex: 3,
        explanation: "Subtracting 6 moves 6 steps left from -4, landing on -10.",
      },
      {
        question: "(-3) × (-5) = ?",
        options: ["-15", "15", "-8", "8"],
        answerIndex: 1,
        explanation: "Same signs multiply to a positive: 3 × 5 = 15.",
      },
      {
        question: "A submarine sits at -60 m and rises 25 m. What is its new position?",
        options: ["-85 m", "-35 m", "35 m", "-25 m"],
        answerIndex: 1,
        explanation: "-60 + 25 = -35 — still 35 metres below the surface.",
      },
    ],
    worksheet: [
      {
        kind: "fill-blank",
        prompt: "What integer is 4 less than -1?",
        answer: "-5",
        hint: "Start at -1 and move 4 steps left.",
      },
      {
        kind: "practice",
        prompt: "-8 + 13 = ?",
        answer: "5",
      },
      {
        kind: "practice",
        prompt: "-9 - 7 = ?",
        answer: "-16",
        hint: "Subtracting 7 pushes you further left from -9.",
      },
      {
        kind: "practice",
        prompt: "-6 × -4 = ?",
        answer: "24",
        hint: "Same signs — what does that mean for the sign of the answer?",
      },
      {
        kind: "fill-blank",
        prompt: "|-12| = ___",
        answer: "12",
      },
      {
        kind: "short-answer",
        prompt:
          "Noah's town is 15°C at noon and the temperature drops 22 degrees by midnight. What is the midnight temperature? Explain your thinking.",
        sampleAnswer:
          "15 - 22 = -7, so it is -7°C at midnight. Subtracting 22 from 15 takes me past zero down to -7.",
      },
    ],
  },

  // -------------------------------------------------------------------------
  // 3. Percent Power
  // -------------------------------------------------------------------------
  {
    id: "math-intermediate-3",
    title: "Percent Power",
    emoji: "💯",
    minutes: 12,
    intro:
      "Percents run the world of shopping, test scores and stats. Learn the 10% benchmark trick and you can do most percent problems in your head.",
    sections: [
      {
        heading: "Three Outfits for One Number",
        body: "Fractions, decimals and percents are three outfits for the same number: 1/2 = 0.5 = 50%. Percent literally means 'per hundred', so 35% = 35/100 = 0.35. To switch, move the decimal point two places — right for decimal to percent, left for percent to decimal.",
        example: "1/4 = 0.25 = 25%. A download bar showing 0.75 is 75% — three quarters done.",
        tip: "Decimal → percent: two places RIGHT. Percent → decimal: two places LEFT.",
      },
      {
        heading: "Percent of a Number: the 10% Benchmark",
        body: "10% of any number is that number with the decimal moved one place left. From there you can build almost anything: 20% is two 10%s, 5% is half a 10%, 15% is 10% + 5%. Benchmarks turn percent problems into mental math.",
        example: "15% of 60: 10% is 6, 5% is 3, so 15% = 6 + 3 = 9.",
        tip: "Benchmarks first (10%, 25%, 50%), then add or scale them.",
      },
      {
        heading: "Percent Increase & Decrease",
        body: "Percent change is always measured against the ORIGINAL amount: change ÷ original × 100. A rise from 20 to 30 is +10 on an original 20, so a 50% increase. For decreases, multiplying by the percent you PAY is even quicker: 20% off means paying 80%.",
        example: "A $45 hoodie at 20% off: pay 80% → 45 × 0.8 = $36.",
        tip: "Always divide the change by the ORIGINAL amount, never the new one.",
      },
      {
        heading: "Discounts & Sales Tax",
        body: "Discounts take money OFF, tax adds it ON. Discount: multiply by (100 − off)%. Tax: multiply by (100 + tax)%. Store signs, receipts and restaurant bills all use exactly this math.",
        example: "A $32 game at 25% off costs 32 × 0.75 = $24. A $40 dinner plus 10% tax costs 40 × 1.1 = $44.",
        tip: "Discount: × (100 − off)%. Tax: × (100 + tax)%. One multiplication each.",
      },
    ],
    vocab: [
      { word: "percent", meaning: "Parts per hundred: 40% = 40/100 = 0.4." },
      { word: "benchmark", meaning: "A friendly percent like 10%, 25% or 50% used to build harder ones." },
      { word: "discount", meaning: "Money taken OFF a price, usually written as a percent." },
      { word: "sales tax", meaning: "A percent ADDED to a price, paid to the government." },
      { word: "percent increase", meaning: "How much a value grew, divided by its original amount." },
    ],
    funFact:
      "The % symbol evolved from an Italian shorthand for 'per cento' — literally 'per hundred'.",
    strategyLab: [
      {
        problem: "A $45 hoodie is on sale for 20% off. What is the sale price?",
        answer: "$36",
        answerCheck:
          "Check by adding back: 36 + 9 = 45 ✓ (and $36 is just under $45 — right for a small cut)",
        methods: [
          {
            name: "Benchmark: 10% then Scale",
            emoji: "🏁",
            whenToUse: "For mental math when no calculator is around.",
            steps: [
              "10% of $45 is $4.50 — move the decimal one place left.",
              "20% is two of those: 2 × 4.50 = $9 off.",
              "45 - 9 = $36.",
            ],
          },
          {
            name: "Fraction Friend",
            emoji: "🍰",
            whenToUse: "When the percent is a famous fraction like 25%, 50% or 20%.",
            steps: [
              "20% = 20/100 = 1/5.",
              "1/5 of 45 = 45 ÷ 5 = $9 off.",
              "45 - 9 = $36.",
            ],
          },
          {
            name: "Pay-the-Rest Multiplier",
            emoji: "💳",
            whenToUse: "When you want the final price in ONE step.",
            steps: [
              "20% off means you pay 80%.",
              "80% as a decimal is 0.8, so 45 × 0.8 = 36.",
              "One multiplication, no subtracting — $36.",
            ],
          },
        ],
      },
      {
        problem: "After a 25% discount, a backpack costs $36. What was the original price?",
        answer: "$48",
        answerCheck: "Check: 25% of 48 = 12, and 48 - 12 = 36 ✓",
        methods: [
          {
            name: "Reverse Multiplier",
            emoji: "🔄",
            whenToUse: "When you know the discounted price but need the original.",
            steps: [
              "Paying 25% less means $36 is 75% of the original.",
              "75% = 0.75, so original = 36 ÷ 0.75.",
              "36 ÷ 0.75 = $48.",
            ],
          },
          {
            name: "Quarter Chunks",
            emoji: "🍫",
            whenToUse: "When the discount is a clean fraction of the whole.",
            steps: [
              "25% off means one quarter was taken away, leaving three quarters.",
              "So each quarter is 36 ÷ 3 = $12.",
              "The whole is four quarters: 4 × 12 = $48.",
            ],
          },
          {
            name: "Estimate-then-Check",
            emoji: "🎯",
            whenToUse: "When you are unsure and want a safety net.",
            steps: [
              "Guess a friendly price: $50 → 25% off is $12.50 → $37.50. A little too high.",
              "Adjust down: try $48 → 25% of 48 is $12 → 48 - 12 = $36.",
              "Exactly right, so the original was $48.",
            ],
          },
        ],
      },
    ],
    quiz: [
      {
        question: "What is 0.35 written as a percent?",
        options: ["0.35%", "3.5%", "35%", "350%"],
        answerIndex: 2,
        explanation: "Move the decimal point two places right: 0.35 → 35%.",
      },
      {
        question: "What is 30% of 80?",
        options: ["24", "21", "18", "27"],
        answerIndex: 0,
        explanation: "10% of 80 is 8, so 30% is 3 × 8 = 24.",
      },
      {
        question: "A $50 jacket is 40% off. What is the sale price?",
        options: ["$20", "$30", "$40", "$10"],
        answerIndex: 1,
        explanation: "40% of 50 is 20, so you pay 50 - 20 = $30.",
      },
      {
        question: "A video had 20 likes, then 30 the next day. What is the percent increase?",
        options: ["25%", "150%", "50%", "10%"],
        answerIndex: 2,
        explanation: "The change is 10 on an original 20: 10 ÷ 20 = 0.5 = 50%.",
      },
      {
        question: "Which percent is equal to 3/5?",
        options: ["35%", "60%", "53%", "65%"],
        answerIndex: 1,
        explanation: "3/5 = 0.6 = 60% (or scale 3/5 to tenths: 6/10).",
      },
    ],
    worksheet: [
      {
        kind: "fill-blank",
        prompt: "Write 7/10 as a percent (just the number).",
        answer: "70",
      },
      {
        kind: "practice",
        prompt: "What is 15% of 60?",
        answer: "9",
        hint: "10% of 60 is 6, and 5% is 3.",
      },
      {
        kind: "practice",
        prompt: "A $32 game is 25% off. What is the sale price, in dollars?",
        answer: "24",
        hint: "25% of 32 first, then subtract.",
      },
      {
        kind: "practice",
        prompt: "A $40 dinner bill gets 10% sales tax added. What is the total, in dollars?",
        answer: "44",
      },
      {
        kind: "fill-blank",
        prompt: "0.08 = ___% (just the number)",
        answer: "8",
      },
      {
        kind: "short-answer",
        prompt:
          "Zara's video got 200 views on Monday and 240 on Tuesday. Dev says that is a 40% increase. Is Dev right? Explain.",
        sampleAnswer:
          "No. The increase is 40 views, but percents compare to the ORIGINAL: 40 ÷ 200 = 0.2 = 20%. Dev confused the 40 extra views with 40%.",
      },
    ],
  },

  // -------------------------------------------------------------------------
  // 4. Algebra Basics: Solving Equations
  // -------------------------------------------------------------------------
  {
    id: "math-intermediate-4",
    title: "Algebra Basics: Solving Equations",
    emoji: "🧩",
    minutes: 13,
    intro:
      "An equation is a balanced scale with a mystery weight hidden on one side. Your job: keep it balanced while you uncover the mystery.",
    sections: [
      {
        heading: "Letters Are Mystery Numbers",
        body: "A variable is a letter holding the place of an unknown number. If Leo has n marbles and finds 5 more, we write n + 5. An expression like n + 5 has no equals sign; an EQUATION like n + 5 = 12 makes a claim you can test and solve.",
        example: "n + 5 = 12 asks: what number plus 5 makes 12? The answer is n = 7.",
        tip: "Read 3x out loud as 'three groups of x' — it really means 3 × x.",
      },
      {
        heading: "The Balance Method",
        body: "An equation is a scale in perfect balance. Whatever you do to one side, you MUST do to the other. To undo '+ 5', subtract 5 from both sides. To undo '× 4', divide both sides by 4. Each move peels one layer off the variable.",
        example: "x + 5 = 12 → subtract 5 from both sides → x = 7. And 4y = 28 → divide both sides by 4 → y = 7.",
        tip: "Whatever you do to one side, do to the other — always, every time.",
      },
      {
        heading: "Two-Step Equations",
        body: "Equations like 2x + 3 = 11 hide TWO operations. Undo them in reverse order: addition or subtraction first, then multiplication or division. Peel from the outside in.",
        example: "2x + 3 = 11 → subtract 3: 2x = 8 → divide by 2: x = 4. Check: 2(4) + 3 = 11 ✓",
        tip: "Undo in reverse order of operations: +/− first, then ×/÷.",
      },
      {
        heading: "Equations from Words",
        body: "Real problems hand you sentences, not symbols. Define your variable in plain words, then translate: '5 identical packs cost $20 in total' becomes 5p = 20, where p is the price of one pack.",
        example: "Kai's age plus 9 equals 21 → k + 9 = 21 → k = 12.",
        tip: "Write 'let p = ...' before the equation. Future-you will thank you.",
      },
    ],
    vocab: [
      { word: "variable", meaning: "A letter, like x, standing for an unknown number." },
      { word: "equation", meaning: "A math sentence with an equals sign, balanced on both sides." },
      { word: "inverse operation", meaning: "The undo operation: subtraction undoes addition, division undoes multiplication." },
      { word: "coefficient", meaning: "The number multiplied by a variable, like the 3 in 3x." },
      { word: "isolate", meaning: "Get the variable alone on one side of the equals sign." },
    ],
    funFact:
      "The word 'algebra' comes from 'al-jabr', the title of a 9th-century math book by the Persian mathematician al-Khwarizmi.",
    strategyLab: [
      {
        problem: "Solve 3x + 4 = 19.",
        answer: "x = 5",
        answerCheck: "Substitute x = 5 back in: 3(5) + 4 = 15 + 4 = 19 ✓",
        methods: [
          {
            name: "Balance Method",
            emoji: "⚖️",
            whenToUse: "The all-purpose method — it works on every equation.",
            steps: [
              "Subtract 4 from BOTH sides: 3x = 15.",
              "Divide both sides by 3: x = 5.",
              "The scale stayed balanced the whole time.",
            ],
          },
          {
            name: "Cover-Up",
            emoji: "🙈",
            whenToUse: "For quick mental solving of two-step equations.",
            steps: [
              "Cover the 3x with your thumb: what plus 4 makes 19? That is 15, so 3x = 15.",
              "Uncover: what times 3 makes 15? That is 5.",
              "x = 5.",
            ],
          },
          {
            name: "Guess-Check-Improve",
            emoji: "🔁",
            whenToUse: "When you are stuck and need a way back in.",
            steps: [
              "Try x = 4: 3(4) + 4 = 16 — too small.",
              "Try x = 6: 3(6) + 4 = 22 — too big.",
              "Something in between: x = 5 gives 15 + 4 = 19 ✓",
            ],
          },
        ],
      },
      {
        problem: "Amara buys 3 same-priced protein bars and a $6 drink for $30 total. If p is the price of one bar, solve 3p + 6 = 30.",
        answer: "p = 8",
        answerCheck: "Substitute p = 8: 3(8) + 6 = 24 + 6 = 30 ✓",
        methods: [
          {
            name: "Balance Method",
            emoji: "⚖️",
            whenToUse: "To solve it symbolically, ready for harder equations later.",
            steps: [
              "Subtract 6 from both sides: 3p = 24.",
              "Divide both sides by 3: p = 8.",
              "Each bar costs $8.",
            ],
          },
          {
            name: "Bar Model",
            emoji: "📊",
            whenToUse: "When you want to SEE the parts of the total.",
            steps: [
              "Draw one long bar for the $30 total.",
              "Cut off the $6 drink — $24 remains for the bars.",
              "Split the rest into 3 equal parts: 24 ÷ 3 = $8 each.",
            ],
          },
          {
            name: "Work Backwards",
            emoji: "⏪",
            whenToUse: "When the story runs forwards but the unknown hides at the start.",
            steps: [
              "The receipt ends at $30.",
              "Undo the drink: 30 - 6 = 24.",
              "Undo the three equal bars: 24 ÷ 3 = $8 per bar.",
            ],
          },
        ],
      },
    ],
    quiz: [
      {
        question: "Solve: x - 5 = 12",
        options: ["x = 7", "x = 17", "x = 60", "x = -17"],
        answerIndex: 1,
        explanation: "Add 5 to both sides: x = 12 + 5 = 17.",
      },
      {
        question: "Solve: 4m = 36",
        options: ["m = 32", "m = 40", "m = 9", "m = 144"],
        answerIndex: 2,
        explanation: "Divide both sides by 4: m = 36 ÷ 4 = 9.",
      },
      {
        question: "Solve: 2x + 3 = 11",
        options: ["x = 3", "x = 4", "x = 7", "x = 8"],
        answerIndex: 1,
        explanation: "Subtract 3 first: 2x = 8, then divide by 2: x = 4.",
      },
      {
        question: "Leo buys 5 identical card packs for $20 total. If p is the price of one pack, which equation fits?",
        options: ["5p = 20", "p + 5 = 20", "5 + p = 20", "20p = 5"],
        answerIndex: 0,
        explanation: "Five packs at price p each cost 5 × p = 5p dollars, and that equals 20.",
      },
      {
        question: "Which value solves 3n - 2 = 10?",
        options: ["n = 2", "n = 3", "n = 4", "n = 6"],
        answerIndex: 2,
        explanation: "Check n = 4: 3(4) - 2 = 12 - 2 = 10 ✓",
      },
    ],
    worksheet: [
      {
        kind: "fill-blank",
        prompt: "Solve: x + 7 = 15.  x = ___",
        answer: "8",
      },
      {
        kind: "practice",
        prompt: "Solve: 6a = 42.  a = ?",
        answer: "7",
      },
      {
        kind: "practice",
        prompt: "Solve: 2y + 5 = 17.  y = ?",
        answer: "6",
        hint: "Subtract 5 from both sides first.",
      },
      {
        kind: "fill-blank",
        prompt: "To solve x/4 = 3, multiply both sides by ___.",
        answer: "4",
      },
      {
        kind: "practice",
        prompt: "Kai's age plus 9 equals 21: k + 9 = 21. How old is Kai?",
        answer: "12",
      },
      {
        kind: "short-answer",
        prompt:
          "Dev solves 4x - 3 = 13 and gets x = 4. Use substitution to check his answer, and explain whether Dev is correct.",
        sampleAnswer:
          "Substitute x = 4: 4 × 4 - 3 = 16 - 3 = 13, which matches the right side. So Dev is correct.",
      },
    ],
  },

  // -------------------------------------------------------------------------
  // 5. Geometry: Angles, Area & Volume
  // -------------------------------------------------------------------------
  {
    id: "math-intermediate-5",
    title: "Geometry: Angles, Area & Volume",
    emoji: "📐",
    minutes: 14,
    intro:
      "Angles rule every corner of your world — skate ramps, roofs, soccer fields. Learn the angle laws and the area formulas, and shapes start giving up their secrets.",
    sections: [
      {
        heading: "Angle Laws",
        body: "Angles on a straight line add to 180° (a half-turn). Angles around a point add to 360° (a full turn). Vertically opposite angles — the ones facing each other in an X — are equal. When a line crosses two parallel lines, the tucked-in angles come in equal or add-to-180 pairs.",
        example: "One angle on a straight line is 115°, so the other is 180 - 115 = 65°. Around a point: 150° + 120° + 90° = 360°.",
        tip: "A straight line is a half-turn (180°); a full spin is 360°.",
      },
      {
        heading: "Triangles & Quadrilaterals",
        body: "The three angles inside ANY triangle always add to 180°. Know two angles and the third is automatic. Any four-sided shape (quadrilateral) has interior angles adding to 360°.",
        example: "A triangle with angles 70° and 60° must have a third angle of 180 - 130 = 50°.",
        tip: "Tear the corners off a paper triangle and they line up into a straight line — 180° you can see.",
      },
      {
        heading: "Area: Parallelograms & Triangles",
        body: "A parallelogram is a pushed-over rectangle, so its area is base × height — but height means the PERPENDICULAR distance, not the slanted side. A triangle is exactly half a parallelogram, so its area is base × height ÷ 2.",
        example: "Parallelogram: base 9 cm, height 4 cm → 9 × 4 = 36 cm². Triangle: base 10 cm, height 6 cm → 10 × 6 ÷ 2 = 30 cm².",
        tip: "The height must be perpendicular to the base — never measure along the slant.",
      },
      {
        heading: "Volume & Circle Vocabulary",
        body: "Volume measures how much space a 3D shape holds. For a box (rectangular prism): volume = length × width × height. For circles, meet the key words: the radius runs from centre to edge, the diameter crosses the whole circle through the centre (d = 2 × r), and the circumference is the distance around.",
        example: "A box 4 m × 3 m × 2 m holds 4 × 3 × 2 = 24 m³. A circle with radius 5 cm has diameter 10 cm.",
        tip: "Area gets squared units (cm²); volume gets cubed units (cm³).",
      },
    ],
    vocab: [
      { word: "parallel", meaning: "Lines that always stay the same distance apart and never meet." },
      { word: "right angle", meaning: "A square corner measuring exactly 90°." },
      { word: "perpendicular height", meaning: "The straight-up distance from base to top at 90°." },
      { word: "volume", meaning: "The amount of 3D space a shape holds, measured in cubic units." },
      { word: "diameter", meaning: "A straight line across a circle through the centre — twice the radius." },
    ],
    funFact:
      "Ancient Egyptian rope-stretchers re-measured farm fields with knotted ropes after the Nile flooded every year — 'geometry' literally means earth-measuring in Greek.",
    strategyLab: [
      {
        problem: "A triangle has a right angle (90°) and another angle of 35°. What is the third angle?",
        answer: "55°",
        answerCheck: "Check: 55 + 90 + 35 = 180 ✓",
        methods: [
          {
            name: "Angle Sum Detective",
            emoji: "🔎",
            whenToUse: "Any triangle, any time — the 180° law never fails.",
            steps: [
              "All three angles of a triangle total 180°.",
              "Add the known angles: 90 + 35 = 125.",
              "Subtract: 180 - 125 = 55°.",
            ],
          },
          {
            name: "Right-Triangle Shortcut",
            emoji: "📐",
            whenToUse: "When the triangle has a 90° angle and you want speed.",
            steps: [
              "In a right triangle, the two sharp angles must share the leftover 90°.",
              "So the missing angle = 90 - 35.",
              "= 55°.",
            ],
          },
          {
            name: "Solve It Like Algebra",
            emoji: "🧩",
            whenToUse: "When you want geometry and algebra working together.",
            steps: [
              "Call the missing angle a.",
              "Write the equation: a + 90 + 35 = 180, so a + 125 = 180.",
              "Subtract 125 from both sides: a = 55°.",
            ],
          },
        ],
      },
      {
        problem: "Marco's storage box is 4 m long, 3 m wide and 2 m tall. What is its volume?",
        answer: "24 m³",
        answerCheck: "Check the units: m × m × m = m³, and 24 one-metre cubes fill the box ✓",
        methods: [
          {
            name: "Layer Stacking",
            emoji: "🧱",
            whenToUse: "To understand WHY the formula works.",
            steps: [
              "The base holds 4 × 3 = 12 one-metre cubes.",
              "The box is 2 m tall, so it fits 2 layers.",
              "12 × 2 = 24 m³.",
            ],
          },
          {
            name: "Formula Plug-In",
            emoji: "🧮",
            whenToUse: "The fast, reliable route once you know the formula.",
            steps: [
              "Volume = length × width × height.",
              "V = 4 × 3 × 2.",
              "= 24 m³.",
            ],
          },
          {
            name: "Friendliest-Order Chunking",
            emoji: "🧠",
            whenToUse: "For mental math — multiplication order is your choice.",
            steps: [
              "Pick the easiest pair first: 4 × 2 = 8.",
              "Finish with 8 × 3 = 24.",
              "Changing the order never changes the volume, so use it to make mental math easy.",
            ],
          },
        ],
      },
    ],
    quiz: [
      {
        question: "Two angles sit on a straight line. One is 115°. What is the other?",
        options: ["55°", "65°", "75°", "245°"],
        answerIndex: 1,
        explanation: "Angles on a line total 180°: 180 - 115 = 65°.",
      },
      {
        question: "A triangle has angles of 70° and 60°. What is the third angle?",
        options: ["40°", "45°", "50°", "60°"],
        answerIndex: 2,
        explanation: "Triangle angles total 180°: 180 - 70 - 60 = 50°.",
      },
      {
        question: "What is the area of a parallelogram with base 9 cm and perpendicular height 4 cm?",
        options: ["13 cm²", "26 cm²", "36 cm²", "45 cm²"],
        answerIndex: 2,
        explanation: "Area = base × height = 9 × 4 = 36 cm².",
      },
      {
        question: "What is the volume of a cube with edges of 3 cm?",
        options: ["6 cm³", "9 cm³", "12 cm³", "27 cm³"],
        answerIndex: 3,
        explanation: "A cube is a box with equal sides: 3 × 3 × 3 = 27 cm³.",
      },
      {
        question: "A circle has a diameter of 14 cm. What is its radius?",
        options: ["5 cm", "6 cm", "7 cm", "28 cm"],
        answerIndex: 2,
        explanation: "The radius is half the diameter: 14 ÷ 2 = 7 cm.",
      },
    ],
    worksheet: [
      {
        kind: "fill-blank",
        prompt: "Two angles sit on a straight line. One is 40°, so the other is ___°.",
        answer: "140",
      },
      {
        kind: "practice",
        prompt: "A triangle has angles of 85° and 60°. Find the third angle, in degrees.",
        answer: "35",
        hint: "Triangle angles total 180°.",
      },
      {
        kind: "practice",
        prompt: "Find the area of a parallelogram with base 7 cm and perpendicular height 3 cm (in cm²).",
        answer: "21",
      },
      {
        kind: "practice",
        prompt: "A triangular flag has a base of 10 cm and a perpendicular height of 6 cm. What is its area, in cm²?",
        answer: "30",
        hint: "Triangle area is half of base × height.",
      },
      {
        kind: "fill-blank",
        prompt: "A box measures 5 cm × 4 cm × 2 cm. Its volume is ___ cm³.",
        answer: "40",
      },
      {
        kind: "short-answer",
        prompt:
          "Aisha measures a wheel and finds its radius is 5 cm. What is the diameter, and how are radius and diameter related?",
        sampleAnswer:
          "Diameter = 10 cm. The diameter always stretches straight across through the centre, so it is exactly twice the radius (d = 2 × r).",
      },
    ],
  },

  // -------------------------------------------------------------------------
  // 6. Statistics: Making Sense of Data
  // -------------------------------------------------------------------------
  {
    id: "math-intermediate-6",
    title: "Statistics: Making Sense of Data",
    emoji: "📊",
    minutes: 13,
    intro:
      "Every game score, video view and test grade is data. Statistics turns a pile of numbers into a story you can trust — or helps you spot a story that is fake.",
    sections: [
      {
        heading: "The Averages: Mean, Median, Mode",
        body: "The MEAN is the fair-share value: add everything, divide by how many. The MEDIAN is the middle value when the data is in order. The MODE is the value that appears most often. Each one answers 'what is typical?' in a slightly different way.",
        example: "Scores of 4, 7, 9, 12: mean = (4 + 7 + 9 + 12) ÷ 4 = 32 ÷ 4 = 8. For 2, 4, 4, 7, 9, 4 the mode is 4.",
        tip: "Median rule: ORDER the data first, then find the middle. No skipping!",
      },
      {
        heading: "Range & Outliers",
        body: "The RANGE is the spread: biggest minus smallest. An OUTLIER is a value far away from the rest of the pack. Outliers stretch the range and drag the mean toward themselves — but the median barely notices them.",
        example: "For 15, 8, 22, 10 the range is 22 - 8 = 14. If one game scores 90 while the rest score about 20, that 90 is an outlier.",
        tip: "Spot the outlier BEFORE you choose an average.",
      },
      {
        heading: "Choosing the Best Average",
        body: "With clean, even data the mean is great. With an outlier in the mix, the median tells the honest story — that is why house prices and salaries are reported with medians. The mode is the go-to for sizes, colours and votes, where the most POPULAR value matters most.",
        example: "Views of 12, 15, 9, 14, 150: the mean is 40 (fooled by the viral hit) but the median is 14 — a far better 'typical' video.",
        tip: "Outlier in the data? Report the median.",
      },
      {
        heading: "Reading Graphs — and Catching Liars",
        body: "Bar graphs compare categories; line graphs show change over time. But graphs can mislead: a y-axis that starts at 90 instead of 0 makes a tiny change look dramatic, and squished or stretched scales exaggerate trends. Always read the axes before you believe the picture.",
        example: "A line graph starting its y-axis at 90 can make a rise from 91 to 95 look like a mountain.",
        tip: "Two questions for any graph: Where does the y-axis start? What does each step represent?",
      },
    ],
    vocab: [
      { word: "mean", meaning: "The fair-share average: add all values, divide by how many." },
      { word: "median", meaning: "The middle value once the data is in order." },
      { word: "mode", meaning: "The value that appears most often." },
      { word: "range", meaning: "Biggest minus smallest — the spread of the data." },
      { word: "outlier", meaning: "A value far away from the rest of the data." },
    ],
    funFact:
      "Nurse Florence Nightingale used statistics and bold graphs in the 1850s to prove more soldiers were dying from disease than battle — and changed hospital hygiene forever.",
    strategyLab: [
      {
        problem: "Five quiz scores: 7, 8, 10, 6, 9. Find the mean.",
        answer: "8",
        answerCheck: "Check by multiplying back: 8 × 5 = 40, which matches the total ✓",
        methods: [
          {
            name: "Add & Divide",
            emoji: "➗",
            whenToUse: "The standard method — fast and always correct.",
            steps: [
              "Add every score: 7 + 8 + 10 + 6 + 9 = 40.",
              "Count the scores: there are 5.",
              "Divide: 40 ÷ 5 = 8.",
            ],
          },
          {
            name: "Leveling Out",
            emoji: "🌊",
            whenToUse: "To understand what the mean actually IS.",
            steps: [
              "Picture the scores as five stacks of cubes: heights 7, 8, 10, 6, 9.",
              "Slide cubes from the tall stacks (10) to the short ones (6) until all stacks match.",
              "Every stack levels out at 8 — that is the mean.",
            ],
          },
          {
            name: "Balance Around a Guess",
            emoji: "⚖️",
            whenToUse: "To check a mean without redoing the division.",
            steps: [
              "Guess a centre — say 8 — and measure each score's distance from it: -1, 0, +2, -2, +1.",
              "Add the distances: -1 + 0 + 2 - 2 + 1 = 0.",
              "The distances cancel to 0, so 8 is the perfect balance point — the mean.",
            ],
          },
        ],
      },
      {
        problem: "Kai's last five videos got 12, 15, 9, 14 and one viral hit of 150 views. Which average describes a typical video better?",
        answer: "The median: 14 (the outlier drags the mean up to 40)",
        answerCheck:
          "Check: ignore the viral 150 and the mean of the rest is 50 ÷ 4 = 12.5 — right beside the median, confirming 14 is the typical video ✓",
        methods: [
          {
            name: "Compute Both & Compare",
            emoji: "🥊",
            whenToUse: "When you are unsure which average to trust.",
            steps: [
              "Mean: 12 + 15 + 9 + 14 + 150 = 200, and 200 ÷ 5 = 40.",
              "Median: sort → 9, 12, 14, 15, 150 → the middle is 14.",
              "40 describes the viral day, not a typical one — the median (14) wins.",
            ],
          },
          {
            name: "Outlier Radar",
            emoji: "📡",
            whenToUse: "For a fast decision before doing any division.",
            steps: [
              "Scan the data for a value far from the pack: 150 is huge compared to 9-15.",
              "Means get dragged toward outliers; medians only care about position in line.",
              "So report the median: 14.",
            ],
          },
          {
            name: "Make a Table",
            emoji: "📋",
            whenToUse: "To organize the data and see the cluster.",
            steps: [
              "List the views in order on a line from 0 to 150.",
              "Four videos cluster between 9 and 15; one sits far away at 150.",
              "The centre of the cluster, 14, is the honest 'typical' value.",
            ],
          },
        ],
      },
    ],
    quiz: [
      {
        question: "What is the mean of 4, 7, 9, 12?",
        options: ["32", "8", "9", "7"],
        answerIndex: 1,
        explanation: "32 ÷ 4 = 8. Add first, then divide by how many.",
      },
      {
        question: "What is the median of 3, 9, 5?",
        options: ["9", "3", "5", "6"],
        answerIndex: 2,
        explanation: "Order first: 3, 5, 9. The middle value is 5.",
      },
      {
        question: "What is the mode of 2, 4, 4, 7, 9, 4?",
        options: ["4", "2", "7", "9"],
        answerIndex: 0,
        explanation: "4 appears three times — more than any other value.",
      },
      {
        question: "What is the range of 15, 8, 22, 10?",
        options: ["6", "12", "14", "22"],
        answerIndex: 2,
        explanation: "Range = biggest - smallest = 22 - 8 = 14.",
      },
      {
        question: "A data set has one value way bigger than all the rest. Which average is LEAST affected by it?",
        options: ["The mean", "The mode", "The range", "The median"],
        answerIndex: 3,
        explanation: "The median depends only on position in the ordered list, so outliers barely move it.",
      },
    ],
    worksheet: [
      {
        kind: "fill-blank",
        prompt: "Find the mean of 6, 8, 10, 12.",
        answer: "9",
        hint: "Add them all, then divide by 4.",
      },
      {
        kind: "practice",
        prompt: "Find the median of 11, 3, 7, 5, 9.",
        answer: "7",
        hint: "Order the numbers first.",
      },
      {
        kind: "practice",
        prompt: "Find the mode of 5, 2, 5, 8, 5, 1.",
        answer: "5",
      },
      {
        kind: "practice",
        prompt: "Find the range of 24, 6, 13, 19.",
        answer: "18",
      },
      {
        kind: "fill-blank",
        prompt: "To find the mean, add all the values, then ___ by how many values there are.",
        answer: "divide",
      },
      {
        kind: "short-answer",
        prompt:
          "Marco's points per game: 20, 18, 22, 90, 19. Leo says his average is about 34; Maya says it is about 20. Who describes a typical game better, and why?",
        sampleAnswer:
          "Maya. The 90 is an outlier — it drags the mean up to 33.8 (169 ÷ 5). The median is 20, which describes a typical game far better.",
      },
    ],
  },

  // -------------------------------------------------------------------------
  // 7. The Problem-Solving Toolbox
  // -------------------------------------------------------------------------
  {
    id: "math-intermediate-7",
    title: "The Problem-Solving Toolbox",
    emoji: "🧰",
    minutes: 15,
    intro:
      "Hard problems are not solved by magic — they are solved by strategies. Load your toolbox with five moves that work on almost anything, then practise picking the right one.",
    sections: [
      {
        heading: "Five Tools That Solve Almost Anything",
        body: "WORK BACKWARDS when you know the ending but not the beginning. DRAW A DIAGRAM when the problem has shape or space. MAKE A TABLE when lots of small cases pile up. FIND THE PATTERN when numbers repeat with a rule. GUESS-CHECK-IMPROVE when nothing else fits — smart guesses shrink the answer's hiding place.",
        example:
          "A problem ends with 'how much did she start with?' → Work Backwards. A problem about a garden path → Draw a Diagram.",
        tip: "Stuck? Try ANY tool. A messy start beats no start.",
      },
      {
        heading: "Work Backwards & Draw It",
        body: "Some stories run forwards but hide the answer at the beginning. Start at the final number and undo each step with its inverse operation, in reverse order. For shape and space puzzles, a quick sketch or bar model turns words into something your eyes can attack.",
        example: "End with $5, undo a $4 snack (5 + 4 = 9), undo spending half (9 × 2 = 18). She started with $18.",
        tip: "Reverse the operations in REVERSE order — and a sketch counts as math.",
      },
      {
        heading: "Tables & Patterns",
        body: "When a problem repeats — days, rows, rounds — build a table of the first few cases. The table slows the chaos down and the rule usually jumps out. Then you can jump straight to the case you need instead of listing all of them.",
        example: "A snail climbs 3 m up a 10 m well each day and slips back 2 m each night: a table shows it gains 1 m net per night, escaping on day 8.",
        tip: "A table turns chaos into a pattern you can SEE.",
      },
      {
        heading: "Guess-Check-Improve & Check Your Work",
        body: "Guess something reasonable, test it against the problem, and use the miss to aim the next guess. Under? Go higher. Over? Come down. Each round squeezes the answer. And whatever strategy you use, finish with a check — verify the answer against the original story.",
        example: "Taxi: $4 to start plus $2 per km costs $16. Guess 5 km: 4 + 10 = 14, too low. Improve: 6 km → 4 + 12 = 16 ✓",
        tip: "A check is part of the answer, not a bonus round.",
      },
    ],
    vocab: [
      { word: "strategy", meaning: "A planned move for attacking a problem." },
      { word: "diagram", meaning: "A quick sketch that turns words into a picture." },
      { word: "pattern", meaning: "A repeating rule, like +4 each time." },
      { word: "estimate", meaning: "A smart rough answer used to sanity-check exact work." },
      { word: "multi-step problem", meaning: "A problem needing two or more operations chained together." },
    ],
    funFact:
      "Schoolboy Carl Friedrich Gauss reportedly summed the numbers 1 to 100 in seconds by pairing 1 + 100, 2 + 99 … — 50 pairs of 101, totalling 5050. Pattern power!",
    strategyLab: [
      {
        problem: "Maya spent half her money on a book, then $4 on a snack, and had $5 left. How much did she start with?",
        answer: "$18",
        answerCheck: "Check forwards: 18 ÷ 2 = 9 on the book, then 9 - 4 = 5 left ✓",
        methods: [
          {
            name: "Work Backwards",
            emoji: "⏪",
            whenToUse: "When the problem tells you the ending and asks for the start.",
            steps: [
              "Start at the end: $5 left.",
              "Undo the snack with the inverse: 5 + 4 = $9 — that was after the book.",
              "Undo spending half: 9 × 2 = $18 to start.",
            ],
          },
          {
            name: "Draw a Bar Model",
            emoji: "📊",
            whenToUse: "When the problem splits a whole into parts.",
            steps: [
              "Draw the starting money as one long bar.",
              "Mark off half for the book; the rest splits into a $4 chunk and a $5 chunk.",
              "The two chunks make the other half: 4 + 5 = 9, so the whole bar = 2 × 9 = $18.",
            ],
          },
          {
            name: "Guess-Check-Improve",
            emoji: "🔁",
            whenToUse: "When you cannot see the path but can test a guess.",
            steps: [
              "Guess $16: half is 8, then 8 - 4 = 4 left — too small.",
              "Guess $20: half is 10, then 10 - 4 = 6 left — too big.",
              "Between them: $18 → 9 - 4 = 5 ✓",
            ],
          },
        ],
      },
      {
        problem: "Sofia saves $3 in week 1, $6 in week 2, $9 in week 3, adding $3 every week. How much has she saved in total after 10 weeks?",
        answer: "$165",
        answerCheck:
          "Check a small case: weeks 1-3 give 3 + 6 + 9 = 18, and 3 × (1 + 2 + 3) = 3 × 6 = 18 ✓ — the pattern holds, so $165 stands.",
        methods: [
          {
            name: "Find the Pattern & Pair Up",
            emoji: "🧦",
            whenToUse: "When a list adds up in a neat, symmetric way.",
            steps: [
              "The deposits are 3, 6, 9, …, 30 — ten amounts.",
              "Pair the outer amounts: 3 + 30 = 33, 6 + 27 = 33, 9 + 24 = 33 … every pair hits 33.",
              "Five pairs of 33: 5 × 33 = $165.",
            ],
          },
          {
            name: "Make a Table",
            emoji: "📋",
            whenToUse: "When you want to watch the total grow week by week.",
            steps: [
              "Track the running total: week 1 → $3, week 2 → $9, week 3 → $18, week 4 → $30 …",
              "Keep adding multiples of 3 up to week 10 (deposit 3 × 10 = $30).",
              "Total = 3 × (1 + 2 + … + 10) = 3 × 55 = $165.",
            ],
          },
          {
            name: "Shortcut Formula",
            emoji: "🧮",
            whenToUse: "When the list is long and you trust the pattern.",
            steps: [
              "The deposits are 3 × 1 up to 3 × 10, so factor out the 3.",
              "Use the famous sum 1 + 2 + … + 10 = (10 × 11) ÷ 2 = 55.",
              "Multiply back: 3 × 55 = $165.",
            ],
          },
        ],
      },
    ],
    quiz: [
      {
        question: "A problem describes a chain of trades and ends with 'How many marbles did Leo start with?' Which strategy fits best?",
        options: ["Work backwards", "Find the pattern", "Make a table", "Draw a diagram"],
        answerIndex: 0,
        explanation: "You know the ending but need the beginning — undo each step in reverse order.",
      },
      {
        question: "What comes next in the pattern: 2, 5, 8, 11, ___?",
        options: ["12", "13", "14", "15"],
        answerIndex: 2,
        explanation: "The rule is +3 each time: 11 + 3 = 14.",
      },
      {
        question: "A taxi charges $4 to start plus $2 per kilometre. A ride costs $16. How many kilometres was it?",
        options: ["5", "6", "7", "12"],
        answerIndex: 1,
        explanation: "Take off the start fee: 16 - 4 = 12. Then 12 ÷ 2 = 6 km.",
      },
      {
        question: "Kai thinks of a number, doubles it, adds 3 and gets 17. What was the number?",
        options: ["5", "7", "8", "10"],
        answerIndex: 1,
        explanation: "Work backwards: 17 - 3 = 14, then 14 ÷ 2 = 7.",
      },
      {
        question: "Use estimating: about how much is 19 × 21?",
        options: ["About 40", "About 400", "About 4,000", "About 39"],
        answerIndex: 1,
        explanation: "Round to friendly numbers: 20 × 20 = 400 (the exact answer, 399, is right beside it).",
      },
    ],
    worksheet: [
      {
        kind: "fill-blank",
        prompt: "What comes next in the pattern: 5, 9, 13, 17, ___?",
        answer: "21",
      },
      {
        kind: "practice",
        prompt: "A number is doubled, then 5 is added, to make 25. What was the number? (Work backwards!)",
        answer: "10",
        hint: "Undo the +5 first, then undo the doubling.",
      },
      {
        kind: "practice",
        prompt: "A snail climbs 3 m up a 10 m well each day and slides 2 m back each night. On which day does it escape?",
        answer: "8",
        hint: "Make a table: after each night it is 1 m higher than the morning before.",
      },
      {
        kind: "practice",
        prompt: "A bike rental costs $5 plus $3 per hour. Amara pays $23. For how many hours did she rent it?",
        answer: "6",
      },
      {
        kind: "fill-blank",
        prompt: "Estimate 39 × 21 by rounding to friendly numbers: 40 × 20 = ___.",
        answer: "800",
      },
      {
        kind: "short-answer",
        prompt:
          "A challenge says Zara won 6 cards, lost 3, then doubled her pile to end with 30. Which strategy would you choose, and what is your first step?",
        sampleAnswer:
          "Work backwards. First step: undo the doubling — 30 ÷ 2 = 15. Then undo losing 3 (add 3 → 18), then undo winning 6 (subtract 6 → 12). She started with 12.",
      },
    ],
  },
];
