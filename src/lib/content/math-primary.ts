// Mathematics — Primary Learning (ages 9-11)
// Eight lessons: multiplication, division, fractions, decimals, percentages,
// geometry, measurement and multi-step word problems. Every lesson includes a
// Strategy Lab: the same problem solved with DIFFERENT methods, because there
// is never just one way to think.
import type { Lesson } from "./types";

export const lessons: Lesson[] = [
  // -------------------------------------------------------------------------
  // 1. Multiplication & Times Tables
  // -------------------------------------------------------------------------
  {
    id: "math-primary-1",
    title: "Multiplication & Times Tables",
    emoji: "✖️",
    minutes: 10,
    intro:
      "Times tables are a shortcut for fast adding — and they unlock puzzles everywhere, from muffin trays to sticker packs.",
    sections: [
      {
        heading: "Multiplication Is Fast Adding",
        body: "3 × 4 means 3 groups of 4. You could add 4 + 4 + 4, but multiplying is much faster.",
        example:
          "Maya bakes 3 trays of muffins. Each tray holds 4 muffins. 3 × 4 = 12 muffins in total.",
        tip: "Every time you see ×, think 'groups of'.",
      },
      {
        heading: "Tricks for Times Tables",
        body: "Some facts are easy friends. Anything × 1 stays the same. Anything × 10 just adds a zero. The 5s hop by fives: 5, 10, 15, 20… And you can break big facts into friendly chunks: 7 × 8 = (7 × 5) + (7 × 3).",
        example: "7 × 1 = 7,  8 × 10 = 80,  6 × 5 = 30 (count by fives!).",
        tip: "9s trick: 9 × 7 → the digits of the answer add to 9 (6 + 3), so the answer is 63.",
      },
      {
        heading: "Arrays: The Picture of Multiplication",
        body: "An array is a neat grid of rows and columns. 4 rows of 6 counters shows 4 × 6 = 24. Flip it sideways — 6 rows of 4 — and you still have 24. Swapping the order never changes the answer.",
        example:
          "Kai lines up 5 rows of 3 toy cars. Turn the parking lot sideways: 3 rows of 5. Either way, 15 cars.",
        tip: "Stuck on a fact? Draw the array, then skip-count the rows.",
      },
      {
        heading: "Tables in Real Life",
        body: "Multiplication pops up everywhere — packing goody bags, counting wheels on cars, buying packs of cards.",
        example:
          "Noah buys 6 packs of stickers. Each pack has 5 stickers. 6 × 5 = 30 stickers. Nice haul!",
        tip: "Practise 5 minutes a day. Small steps multiply up fast.",
      },
    ],
    vocab: [
      {
        word: "multiply",
        meaning: "Add the same number again and again, like 4 + 4 + 4.",
      },
      { word: "factor", meaning: "A number being multiplied, like the 3 in 3 × 4." },
      { word: "product", meaning: "The answer to a multiplication problem." },
      {
        word: "array",
        meaning: "A grid of equal rows and columns that shows a multiplication fact.",
      },
    ],
    funFact:
      "Babylonian students used multiplication tables carved into clay tablets nearly 4,000 years ago!",
    strategyLab: [
      {
        problem: "7 × 8 = ?",
        answer: "56",
        answerCheck: "Check: 56 ÷ 7 = 8 ✓ — or flip it: 8 × 7 = 56 too.",
        methods: [
          {
            name: "Break It Up",
            emoji: "🎯",
            whenToUse: "Great when one factor is big — split it into chunks you already know.",
            steps: [
              "Split the 8 into friendly chunks: 5 and 3, because 5 + 3 = 8.",
              "Solve the easy parts: 7 × 5 = 35 and 7 × 3 = 21.",
              "Stitch them back together: 35 + 21 = 56.",
              "So 7 × 8 = 56.",
            ],
          },
          {
            name: "Double, Double, Double",
            emoji: "🔁",
            whenToUse: "Shines when you multiply by 8, because 8 = 2 × 2 × 2 — just keep doubling.",
            steps: [
              "Start with one group: 7.",
              "Double it: 7 × 2 = 14.",
              "Double again: 14 × 2 = 28.",
              "Double a third time: 28 × 2 = 56. Three doublings is ×8!",
            ],
          },
          {
            name: "Array Model",
            emoji: "🧱",
            whenToUse: "Best when you like to SEE the maths — build it, then count it.",
            steps: [
              "Lay out 7 rows of 8 counters in a neat grid.",
              "Skip-count the rows: 8, 16, 24, 32, 40, 48, 56.",
              "Flip the grid sideways: now 8 rows of 7 — still 56 counters.",
              "So 7 × 8 = 56, whichever way you look at it.",
            ],
          },
        ],
      },
      {
        problem: "6 × 9 = ?",
        answer: "54",
        answerCheck: "Check: 54 ÷ 9 = 6 ✓ — and the digits 5 + 4 = 9, the 9s fingerprint.",
        methods: [
          {
            name: "Ten Groups, Minus One",
            emoji: "🎁",
            whenToUse: "Perfect for ×9 facts — nines are just one less than ten groups.",
            steps: [
              "Start with an easy cousin fact: 6 × 10 = 60.",
              "But you only wanted 6 nines, not 6 tens — so take away one group of 6.",
              "60 − 6 = 54.",
              "So 6 × 9 = 54.",
            ],
          },
          {
            name: "Nines Skip-Count",
            emoji: "🦘",
            whenToUse: "Use it when the 9s rhyme is stuck in your head — hop the pattern out loud.",
            steps: [
              "Hop along the number line in nines: 9, 18, 27, 36, 45, 54.",
              "Count the hops: that was 6 hops.",
              "Six hops of 9 lands on 54, so 6 × 9 = 54.",
            ],
          },
        ],
      },
    ],
    quiz: [
      {
        question: "What does 4 × 3 mean?",
        options: ["4 + 3", "3 groups of 4", "3 × 3 plus 1", "4 more than 3"],
        answerIndex: 1,
        explanation: "Multiplying makes equal groups: 3 groups of 4 = 12.",
      },
      {
        question: "6 × 5 = ?",
        options: ["11", "30", "35", "25"],
        answerIndex: 1,
        explanation: "Count by fives six times: 5, 10, 15, 20, 25, 30.",
      },
      {
        question: "Noah packs 4 bags with 6 marbles each. How many marbles in total?",
        options: ["10", "18", "24", "30"],
        answerIndex: 2,
        explanation: "4 groups of 6: 4 × 6 = 24 marbles.",
      },
      {
        question:
          "Amara solves 7 × 8 by thinking (7 × 5) + (7 × 3). What answer does she get?",
        options: ["35", "21", "56", "63"],
        answerIndex: 2,
        explanation: "Break it up: 35 + 21 = 56 — the same as 7 × 8.",
      },
    ],
    worksheet: [
      {
        kind: "practice",
        prompt: "7 × 8 = ?",
        answer: "56",
        hint: "Remember: 5, 6, 7, 8 → 56 = 7 × 8.",
      },
      { kind: "fill-blank", prompt: "5 × 9 = ?", answer: "45" },
      {
        kind: "practice",
        prompt: "Amara puts 8 pencils in each of 5 cups. How many pencils in total?",
        answer: "40",
      },
      { kind: "fill-blank", prompt: "3 × ___ = 24. What number goes in the blank?", answer: "8" },
      {
        kind: "match",
        prompt: "Match each fact to the trick that solves it fastest!",
        left: ["6 × 9", "8 × 10", "7 × 1"],
        right: ["add a zero: 80", "stays the same: 9", "ten groups minus one: 60 − 6 = 54"],
        answer: [2, 0, 1],
      },
      {
        kind: "short-answer",
        prompt:
          "Write one times-table fact you find tricky, then describe a strategy from this lesson (break it up, doubling, arrays…) that could help you remember it.",
        sampleAnswer:
          "7 × 8 is tricky for me. I can break it up: 7 × 5 = 35 and 7 × 3 = 21, and 35 + 21 = 56.",
      },
    ],
  },

  // -------------------------------------------------------------------------
  // 2. Division: Sharing & Grouping
  // -------------------------------------------------------------------------
  {
    id: "math-primary-2",
    title: "Division: Sharing & Grouping",
    emoji: "➗",
    minutes: 11,
    intro:
      "Sharing cookies, dealing cards, splitting pizza — division is fair sharing, and there is more than one smart path to the answer.",
    sections: [
      {
        heading: "What Division Really Means",
        body: "Division shares a total into equal groups. 24 ÷ 6 asks: if 24 cookies are shared equally onto 6 plates, how many cookies land on each plate?",
        example: "12 stickers shared between 3 friends → 12 ÷ 3 = 4 stickers each. Fair!",
        tip: "The ÷ sign looks like a cookie resting on a plate — a picture of fair sharing!",
      },
      {
        heading: "Sharing or Grouping? Both!",
        body: "24 ÷ 6 can tell two stories. Sharing: split 24 into 6 equal groups → 4 in each. Grouping: how many groups of 6 fit inside 24? Also 4! Same fact, two pictures.",
        example:
          "18 ÷ 3: share 18 apples into 3 baskets (6 each), or count how many baskets of 3 you can fill (6 baskets).",
        tip: "Division answers 'how many in each group?' OR 'how many groups?' — both are correct.",
      },
      {
        heading: "Fact Families Save the Day",
        body: "Every division fact has multiplication partners. 6 × 4 = 24, 4 × 6 = 24, 24 ÷ 6 = 4, 24 ÷ 4 = 6 — one family. Know one fact and you get three free.",
        example: "Stuck on 45 ÷ 9? Ask '9 × what = 45?' → 9 × 5 = 45, so 45 ÷ 9 = 5.",
        tip: "Strong times tables make division ten times easier.",
      },
    ],
    vocab: [
      { word: "divide", meaning: "Share a total into equal groups." },
      { word: "dividend", meaning: "The total you start with — the 24 in 24 ÷ 6." },
      { word: "divisor", meaning: "The number of equal groups — the 6 in 24 ÷ 6." },
      { word: "quotient", meaning: "The answer to a division problem — the 4 in 24 ÷ 6 = 4." },
    ],
    funFact:
      "The ÷ sign is called the obelus. A maths book first used it for division in 1659 — and it really does look like a cookie on a plate!",
    strategyLab: [
      {
        problem: "24 ÷ 6 = ?",
        answer: "4",
        answerCheck: "Check: 4 × 6 = 24 ✓ — multiplication is the inverse (undo) of division.",
        methods: [
          {
            name: "Equal Groups",
            emoji: "🍪",
            whenToUse: "Use it when you want to see the sharing happen with real objects.",
            steps: [
              "Set out 6 plates (one for each friend) and 24 cookies to share.",
              "Deal the cookies one at a time: every plate gets a cookie each round.",
              "Count the rounds: after round 1, 6 cookies are placed; round 2 → 12; round 3 → 18; round 4 → all 24.",
              "Each plate holds 4 cookies, so 24 ÷ 6 = 4.",
            ],
          },
          {
            name: "Repeated Subtraction",
            emoji: "➖",
            whenToUse: "Use it when you can picture peeling groups off the total, one at a time.",
            steps: [
              "Start with 24 and peel off one group of 6: 24 − 6 = 18.",
              "Keep peeling: 18 − 6 = 12, then 12 − 6 = 6, then 6 − 6 = 0.",
              "Count the subtractions: you subtracted 6 exactly 4 times.",
              "So 24 ÷ 6 = 4.",
            ],
          },
          {
            name: "Think Multiplication",
            emoji: "✖️",
            whenToUse: "Fastest of all — use it whenever your times tables are sharp.",
            steps: [
              "Division and multiplication are a team, so ask: 6 × ? = 24?",
              "Test it: 6 × 3 = 18 — too small. Try 6 × 4 = 24 — exactly right!",
              "Because 6 × 4 = 24, the matching division must be 24 ÷ 6 = 4.",
            ],
          },
          {
            name: "Array Model",
            emoji: "🔲",
            whenToUse: "Use it when neat rows help you see groups and leftovers at a glance.",
            steps: [
              "Place 24 counters in neat rows, putting 6 counters in each row.",
              "Row 1, row 2, row 3, row 4 — the counters stop at exactly 4 full rows, none left over.",
              "Each row is one group of 6, and there are 4 rows, so 24 ÷ 6 = 4.",
            ],
          },
        ],
      },
      {
        problem: "35 ÷ 5 = ?",
        answer: "7",
        answerCheck: "Check: 7 × 5 = 35 ✓ — seven fives rebuild the whole 35.",
        methods: [
          {
            name: "Equal Groups",
            emoji: "🧁",
            whenToUse: "Use it for hands-on sharing when the total is not too huge.",
            steps: [
              "Line up 5 boxes for 5 friends, with 35 cupcakes to share.",
              "Deal the cupcakes one at a time so every box gets the same amount.",
              "After 7 rounds, every cupcake is placed and each box holds 7.",
              "So 35 ÷ 5 = 7.",
            ],
          },
          {
            name: "Repeated Subtraction",
            emoji: "⬇️",
            whenToUse: "Use it to count how many equal chunks hide inside the total.",
            steps: [
              "Subtract a 5 each time: 35 − 5 = 30 (1 group).",
              "Keep going: 25, 20, 15, 10, 5, 0.",
              "You subtracted 5 seven times, so 35 ÷ 5 = 7.",
            ],
          },
          {
            name: "Count by Fives",
            emoji: "🦘",
            whenToUse: "Use it when the fives are automatic for you — just count the hops.",
            steps: [
              "Hop along the number line in fives: 5, 10, 15, 20, 25, 30, 35.",
              "Count the hops it took to reach 35: seven hops.",
              "Seven hops of 5 means 35 ÷ 5 = 7.",
            ],
          },
        ],
      },
    ],
    quiz: [
      {
        question: "24 ÷ 6 = ?",
        options: ["3", "4", "5", "6"],
        answerIndex: 1,
        explanation: "Four groups of 6: 6 × 4 = 24, so 24 ÷ 6 = 4.",
      },
      {
        question: "Zara shares 18 apples equally into 3 baskets. How many apples per basket?",
        options: ["5", "6", "7", "9"],
        answerIndex: 1,
        explanation: "18 ÷ 3 = 6, because 3 × 6 = 18.",
      },
      {
        question: "Which multiplication fact helps most with 45 ÷ 9 = ?",
        options: ["9 × 5 = 45", "9 × 9 = 81", "5 × 5 = 25", "45 × 1 = 45"],
        answerIndex: 0,
        explanation: "Think multiplication: 9 × 5 = 45, so 45 ÷ 9 = 5.",
      },
      {
        question: "Which number sentence belongs to the same fact family as 8 × 3 = 24?",
        options: ["24 ÷ 3 = 8", "24 + 3 = 27", "8 − 3 = 5", "24 × 3 = 72"],
        answerIndex: 0,
        explanation:
          "Fact families travel together: 8 × 3 = 24, 3 × 8 = 24, 24 ÷ 3 = 8, 24 ÷ 8 = 3.",
      },
    ],
    worksheet: [
      { kind: "practice", prompt: "36 ÷ 6 = ?", answer: "6" },
      { kind: "fill-blank", prompt: "___ ÷ 4 = 6. What number goes in the blank?", answer: "24" },
      {
        kind: "practice",
        prompt: "Kai shares 45 marbles equally among 5 jars. How many marbles in each jar?",
        answer: "9",
      },
      {
        kind: "match",
        prompt: "Match each division to the method that shows it best!",
        left: ["24 ÷ 6", "35 ÷ 5", "12 ÷ 4"],
        right: [
          "7 — count by fives, 7 hops",
          "3 — deal 12 cookies onto 4 plates",
          "4 — because 6 × 4 = 24",
        ],
        answer: [2, 0, 1],
      },
      {
        kind: "short-answer",
        prompt:
          "Aisha solved 24 ÷ 6 by subtracting 6 again and again until she reached 0. Describe her steps and say how many subtractions she made.",
        sampleAnswer:
          "24 − 6 = 18, 18 − 6 = 12, 12 − 6 = 6, 6 − 6 = 0. She subtracted 6 four times, so 24 ÷ 6 = 4.",
      },
      {
        kind: "practice",
        prompt: "Marco has 56 cards and packs them into packs of 7. How many packs does he fill?",
        answer: "8",
      },
    ],
  },

  // -------------------------------------------------------------------------
  // 3. Fractions Made Friendly
  // -------------------------------------------------------------------------
  {
    id: "math-primary-3",
    title: "Fractions Made Friendly",
    emoji: "🍕",
    minutes: 10,
    intro:
      "Fractions are just fair shares — like splitting a pizza with friends so everyone gets their part.",
    sections: [
      {
        heading: "Fair Shares",
        body: "A fraction shows parts of a whole. If you cut a pizza into 4 equal slices and eat 1 slice, you ate 1/4 of the pizza.",
        example: "Leo cuts a sandwich into 2 equal parts. Each part is 1/2.",
        tip: "The parts must be equal! Unequal parts are not real fractions.",
      },
      {
        heading: "Numerator and Denominator",
        body: "The top number (numerator) tells how many parts you have. The bottom number (denominator) tells how many equal parts the whole was split into.",
        example: "In 3/8, you have 3 of the 8 equal parts — like 3 slices of an 8-slice pizza.",
        tip: "Down is the denominator — both words start with D.",
      },
      {
        heading: "Equivalent Fractions",
        body: "Different fractions can name the same amount. Half a pizza is 1/2, but also 2/4 or 4/8. Multiply (or divide) the top AND bottom by the same number and the amount never changes.",
        example: "1/2 = 2/4 = 3/6 = 4/8 — same pizza, different slicing.",
        tip: "Whatever you do to the top, do to the bottom. Always both!",
      },
      {
        heading: "Comparing Fractions",
        body: "A bigger bottom number means smaller slices! 1/2 is bigger than 1/4, because half a pizza beats a quarter of it. To compare tricky fractions, give them the same denominator first.",
        example:
          "Zara eats 1/2 of a chocolate bar and Dev eats 1/3 of the same bar. Zara gets more chocolate!",
        tip: "Same top number? The smaller bottom number wins.",
      },
      {
        heading: "Fractions of a Set",
        body: "Fractions also work on groups of things. To find 1/2 of 12 stickers, share them into 2 equal piles: 6 each. To find 3/4 of 12, split into 4 equal piles, then take 3 of them.",
        example: "1/2 of 12 = 6. 3/4 of 12: 12 ÷ 4 = 3 per pile, then 3 × 3 = 9.",
        tip: "Divide by the bottom, multiply by the top.",
      },
    ],
    vocab: [
      { word: "fraction", meaning: "An equal part of a whole, like 1/2 or 3/4." },
      { word: "numerator", meaning: "The top number: how many parts you have." },
      {
        word: "denominator",
        meaning: "The bottom number: how many equal parts the whole has.",
      },
      {
        word: "equivalent",
        meaning: "Equal in value, like 1/2 and 2/4 — different looks, same amount.",
      },
    ],
    funFact:
      "The word 'fraction' comes from the Latin 'fractus', which means 'broken' — a fraction is a whole number broken into parts!",
    strategyLab: [
      {
        problem: "What is 3/4 of 12?",
        answer: "9",
        answerCheck: "Check: 12 − 9 = 3 left over, and 3 is exactly 1/4 of 12 ✓",
        methods: [
          {
            name: "Unit Fractions First",
            emoji: "🍰",
            whenToUse: "The trusty recipe: divide by the bottom, multiply by the top.",
            steps: [
              "Find ONE part first: 1/4 of 12 means 12 ÷ 4 = 3.",
              "So each quarter of 12 is 3.",
              "You want 3 quarters: 3 × 3 = 9.",
              "So 3/4 of 12 = 9.",
            ],
          },
          {
            name: "Deal into Equal Piles",
            emoji: "🃏",
            whenToUse: "Use it with real objects when you want to see the fraction happen.",
            steps: [
              "Count out 12 counters (or grapes!).",
              "Deal them into 4 equal piles, one at a time — each pile gets 3.",
              "Each pile is one quarter. Take 3 of the piles.",
              "3 + 3 + 3 = 9 counters.",
            ],
          },
          {
            name: "Bar Model",
            emoji: "🍫",
            whenToUse: "Use it on paper — one bar sketch beats a page of guessing.",
            steps: [
              "Draw a bar and split it into 4 equal boxes — that is the whole (12).",
              "Each box must be 12 ÷ 4 = 3.",
              "Shade 3 of the 4 boxes.",
              "Shaded boxes: 3 + 3 + 3 = 9.",
            ],
          },
        ],
      },
      {
        problem: "Which is bigger: 2/3 or 3/5?",
        answer: "2/3",
        answerCheck: "Check: with matching fifteenths, 10/15 > 9/15 ✓",
        methods: [
          {
            name: "Match the Bottoms",
            emoji: "🤝",
            whenToUse: "Use it when the pieces are different sizes — same denominator makes it fair.",
            steps: [
              "Both 3 and 5 fit into 15, so rewrite each fraction in fifteenths.",
              "2/3 = 10/15 (multiply top and bottom by 5).",
              "3/5 = 9/15 (multiply top and bottom by 3).",
              "10/15 > 9/15, so 2/3 is bigger.",
            ],
          },
          {
            name: "Draw Both Pictures",
            emoji: "🖼️",
            whenToUse: "Use it when you trust your eyes more than your rules.",
            steps: [
              "Draw two same-size bars.",
              "Shade 2 of 3 parts on the first bar, and 3 of 5 parts on the second.",
              "Compare the shaded amounts: the 2/3 bar clearly covers more.",
              "So 2/3 is bigger.",
            ],
          },
        ],
      },
    ],
    quiz: [
      {
        question: "A pizza is cut into 4 equal slices. You eat 1 slice. What fraction did you eat?",
        options: ["1/2", "1/3", "1/4", "4/1"],
        answerIndex: 2,
        explanation: "The whole had 4 equal parts, so each slice is 1/4.",
      },
      {
        question: "What is 1/2 of 18?",
        options: ["6", "8", "9", "12"],
        answerIndex: 2,
        explanation: "Half of 18 means sharing into 2 equal groups: 18 ÷ 2 = 9.",
      },
      {
        question: "Which fraction is equivalent (equal) to 1/2?",
        options: ["2/5", "3/6", "3/4", "4/6"],
        answerIndex: 1,
        explanation: "3/6 = 1/2 — multiply the 1 and 2 of 1/2 by 3.",
      },
      {
        question: "Aisha eats 2/4 of a cake and Marco eats 2/8 of the same cake. Who ate more?",
        options: ["Marco", "Aisha", "They ate the same", "Cannot tell"],
        answerIndex: 1,
        explanation: "Fourths are bigger slices than eighths, so 2/4 is more than 2/8.",
      },
    ],
    worksheet: [
      { kind: "fill-blank", prompt: "1/2 of 10 grapes is ___ grapes.", answer: "5" },
      { kind: "fill-blank", prompt: "In the fraction 2/3, the numerator is ___.", answer: "2" },
      {
        kind: "practice",
        prompt: "Which fraction is bigger: 1/2 or 1/6? Type the bigger one (like 1/2).",
        answer: "1/2",
      },
      {
        kind: "practice",
        prompt: "What is 3/4 of 16? Type just the number.",
        answer: "12",
        hint: "Find 1/4 of 16 first, then take 3 of them.",
      },
      {
        kind: "match",
        prompt: "Match each fraction to an equivalent twin!",
        left: ["1/2", "2/3", "1/4"],
        right: ["4/6", "2/8", "4/8"],
        answer: [2, 0, 1],
      },
      {
        kind: "short-answer",
        prompt:
          "Describe how you would share 1 sandwich fairly between you and 3 friends. What fraction does each person get?",
        sampleAnswer:
          "Cut it into 4 equal pieces — one for me and three for my friends. Each person gets 1/4 of the sandwich.",
      },
    ],
  },

  // -------------------------------------------------------------------------
  // 4. Decimals: Parts of a Whole
  // -------------------------------------------------------------------------
  {
    id: "math-primary-4",
    title: "Decimals: Parts of a Whole",
    emoji: "💰",
    minutes: 10,
    intro:
      "Decimals are fractions in disguise — and money is the friendliest decimal of all.",
    sections: [
      {
        heading: "Decimals Are Fractions in Disguise",
        body: "A decimal point splits whole numbers from parts of a whole. One tenth (1/10) is written 0.1 — a dime, one tenth of a dollar. One hundredth (1/100) is written 0.01 — a penny!",
        example: "$0.10 is a dime (a tenth of a dollar). $0.01 is a penny (a hundredth of a dollar).",
        tip: "Tenths live one place after the point; hundredths live two places after.",
      },
      {
        heading: "Decimal Place Value",
        body: "In 2.47, the 2 means 2 ones, the 4 means 4 tenths, and the 7 means 7 hundredths. Each place is 10 times smaller as you move right.",
        example: "3.5 = 3 ones + 5 tenths = 3 and a half — the same as 3 5/10.",
        tip: "Read it out loud: 2.47 is 'two point four seven', or 2 and 47 hundredths.",
      },
      {
        heading: "Comparing Decimals",
        body: "Line up the decimal points and check the tenths place first. Careful: more digits does NOT mean bigger! 0.8 is bigger than 0.75, because 0.8 = 0.80.",
        example: "0.5 vs 0.45 → think 0.50 vs 0.45. Fifty hundredths beats 45 hundredths.",
        tip: "Pad with zeros so both numbers match in length — then compare like whole numbers.",
      },
      {
        heading: "Adding Decimals with Money",
        body: "Money is the friendliest decimal. Line up the decimal points, then add place by place: pennies, dimes, dollars.",
        example: "Sofia buys a $2.75 notebook and a $1.20 pen. Line them up: 2.75 + 1.20 = $3.95.",
        tip: "Decimal points must line up like soldiers — then add.",
      },
    ],
    vocab: [
      { word: "decimal", meaning: "A number with a point that shows parts of a whole, like 2.5." },
      { word: "tenth", meaning: "One of 10 equal parts, written 0.1." },
      { word: "hundredth", meaning: "One of 100 equal parts, written 0.01." },
      { word: "place value", meaning: "What each digit is worth, based on its spot." },
    ],
    funFact:
      "'Decimal' comes from the Latin 'decimus', meaning tenth — and our whole number system is decimal too: each place is 10 times the one on its right!",
    strategyLab: [
      {
        problem: "0.7 + 0.45 = ?",
        answer: "1.15",
        answerCheck: "Check: 1.15 − 0.45 = 0.70 ✓ — subtraction undoes addition.",
        methods: [
          {
            name: "Money Mode",
            emoji: "🪙",
            whenToUse: "Use it whenever decimals involve cash — coins make it concrete.",
            steps: [
              "Turn decimals into coins: 0.7 is 70¢ (7 dimes) and 0.45 is 45¢.",
              "Add the money: 70¢ + 45¢ = 115¢.",
              "Turn it back: 115¢ = $1.15, so 0.7 + 0.45 = 1.15.",
            ],
          },
          {
            name: "Pad and Line Up",
            emoji: "🎯",
            whenToUse: "The go-to written method — pad with zeros so every place matches.",
            steps: [
              "Pad the shorter number: 0.7 becomes 0.70 (7 tenths = 70 hundredths).",
              "Write 0.70 + 0.45 with the decimal points lined up.",
              "Add the hundredths: 0 + 5 = 5. Add the tenths: 7 + 4 = 11 — that spills one into the ones place.",
              "The answer is 1.15.",
            ],
          },
          {
            name: "Number Line Bridge",
            emoji: "🌉",
            whenToUse: "Use it to build number sense — hop to the next whole number first.",
            steps: [
              "Start at 0.7 and ask: how far to the next whole number? 0.3 gets you to 1.0.",
              "Use 0.3 of the 0.45 to land on 1.0.",
              "You still have 0.45 − 0.3 = 0.15 left to travel.",
              "Hop the last bit: 1.0 + 0.15 = 1.15.",
            ],
          },
        ],
      },
      {
        problem: "Which is bigger: 0.8 or 0.75?",
        answer: "0.8",
        answerCheck: "Check: 0.80 − 0.75 = 0.05, so 0.8 is five hundredths bigger ✓",
        methods: [
          {
            name: "Pad to Match",
            emoji: "🧭",
            whenToUse: "Use it for any compare — equal lengths make the truth visible.",
            steps: [
              "Pad 0.8 with a zero so both numbers have the same places: 0.80 vs 0.75.",
              "Compare hundredths: 80 hundredths vs 75 hundredths.",
              "80 > 75, so 0.8 is bigger — more digits does not mean more value!",
            ],
          },
          {
            name: "Money Mode",
            emoji: "💵",
            whenToUse: "Use it when the decimals are dollars and cents in real life.",
            steps: [
              "Read them as money: 0.8 dollars = 80¢, and 0.75 dollars = 75¢.",
              "Ask which handful of coins you would rather have: 80¢ or 75¢.",
              "80¢ wins, so 0.8 is bigger.",
            ],
          },
        ],
      },
    ],
    quiz: [
      {
        question: "What is 0.3 as a fraction?",
        options: ["3/100", "3/10", "1/3", "3/1"],
        answerIndex: 1,
        explanation: "0.3 means 3 tenths — the 3 sits in the tenths place.",
      },
      {
        question: "Which decimal is the biggest?",
        options: ["0.5", "0.45", "0.35", "0.4"],
        answerIndex: 0,
        explanation: "0.5 = 0.50, and 50 hundredths beats 45, 35 and 40 hundredths.",
      },
      {
        question: "Aisha adds $2.50 + $1.25 for a comic and a pencil. What is the total?",
        options: ["$3.50", "$3.75", "$4.25", "$3.25"],
        answerIndex: 1,
        explanation: "Line up the points: 2.50 + 1.25 = 3.75.",
      },
      {
        question: "In the number 4.62, which digit is in the hundredths place?",
        options: ["4", "6", "2", "0"],
        answerIndex: 2,
        explanation: "Tenths first after the point, hundredths second: the 2 is in the hundredths place.",
      },
    ],
    worksheet: [
      { kind: "fill-blank", prompt: "0.5 is the same as the fraction ___ (write it like 5/10).", answer: "5/10" },
      { kind: "fill-blank", prompt: "In 3.27, the digit in the tenths place is ___.", answer: "2" },
      {
        kind: "practice",
        prompt: "Which is bigger: 0.9 or 0.85? Type the bigger one.",
        answer: "0.9",
      },
      {
        kind: "practice",
        prompt: "Leo buys a notebook for $2.30 and a pen for $1.20. What is the total? (like $3.50)",
        answer: "$3.50",
        hint: "Line up the decimal points, then add.",
      },
      {
        kind: "match",
        prompt: "Match each decimal to its fraction twin!",
        left: ["0.5", "0.25", "0.75"],
        right: ["3/4", "1/4", "1/2"],
        answer: [2, 1, 0],
      },
      {
        kind: "short-answer",
        prompt:
          "Marco paid $1.00 for a 60¢ eraser. Write his change as a decimal and explain how you found it.",
        sampleAnswer:
          "$1.00 − $0.60 = $0.40. I lined up the decimal points and subtracted (or counted up from 60¢ to 100¢). His change is $0.40.",
      },
    ],
  },

  // -------------------------------------------------------------------------
  // 5. Percentages: Out of 100
  // -------------------------------------------------------------------------
  {
    id: "math-primary-5",
    title: "Percentages: Out of 100",
    emoji: "💯",
    minutes: 10,
    intro:
      "Percent means 'out of 100' — befriend 50%, 25% and 10% and you will spot them everywhere: scores, sales and slime recipes.",
    sections: [
      {
        heading: "Percent Means Out of 100",
        body: "'Per cent' means 'out of every 100'. If 25 out of 100 students walk to school, that is 25%. A perfect score is 100% — the whole thing.",
        example: "A 100-square grid with 50 squares shaded is 50% shaded — exactly half.",
        tip: "Spot the 'cent' in percent — like century (100 years) and cent (1/100 of a dollar).",
      },
      {
        heading: "Friendly Percents You Can Do in Your Head",
        body: "50% is half — divide by 2. 25% is a quarter — halve twice, or divide by 4. 10% is one tenth — divide by 10. 1% is one hundredth — divide by 100.",
        example: "10% of 60 = 6. 25% of 60 = 15. 50% of 60 = 30. 1% of 60 = 0.6.",
        tip: "Start with 10%, then scale up: 30% is three lots of 10%.",
      },
      {
        heading: "Fraction ↔ Decimal ↔ Percent",
        body: "The same amount wears three costumes: 1/2 = 0.5 = 50%. 1/4 = 0.25 = 25%. 3/4 = 0.75 = 75%. 1/10 = 0.1 = 10%.",
        example: "Aisha eats 1/4 of a pizza — that is 0.25, or 25% of the pizza.",
        tip: "Out-of-100 fractions flip straight to percents: 75/100 = 75%.",
      },
    ],
    vocab: [
      { word: "percent", meaning: "Out of every 100. The symbol is %." },
      {
        word: "benchmark",
        meaning: "A friendly helper amount, like 10% or 50%, that you build other answers with.",
      },
      { word: "quarter", meaning: "One of 4 equal parts — the same as 25%." },
      { word: "discount", meaning: "An amount cut off a price, often written as a percent." },
    ],
    funFact:
      "'Percent' comes from the Latin 'per centum' — 'by the hundred'. Ancient Romans were charging interest 'per centum' over 2,000 years ago!",
    strategyLab: [
      {
        problem: "What is 25% of 48?",
        answer: "12",
        answerCheck: "Check: 12 × 4 = 48 ✓ — four quarters rebuild the whole.",
        methods: [
          {
            name: "Half, Then Half Again",
            emoji: "✂️",
            whenToUse: "Great for 25% — a quarter is just half of a half.",
            steps: [
              "25% is a quarter, and a quarter is half of a half.",
              "Half of 48 is 24 (that is 50%).",
              "Half of 24 is 12 (that is 25%).",
              "So 25% of 48 = 12.",
            ],
          },
          {
            name: "Divide by 4",
            emoji: "🌟",
            whenToUse: "Fastest when the number divides nicely — 25% means ÷ 4.",
            steps: [
              "25% = 25/100 = 1/4.",
              "So find 1/4 of 48: 48 ÷ 4 = 12.",
              "So 25% of 48 = 12.",
            ],
          },
          {
            name: "Four Equal Groups",
            emoji: "🧁",
            whenToUse: "Use it when you like to see the whole split up before choosing.",
            steps: [
              "25% means one part out of 4 equal parts.",
              "Split 48 into 4 equal groups: 12, 12, 12, 12.",
              "One group is 25%, and one group holds 12.",
              "So 25% of 48 = 12.",
            ],
          },
        ],
      },
      {
        problem: "A $30 game is 10% off. How much do you save?",
        answer: "$3",
        answerCheck: "Check: 3 × 10 = 30 ✓ — ten parts of $3 rebuild the whole price.",
        methods: [
          {
            name: "Divide by 10",
            emoji: "➗",
            whenToUse: "The 10% superpower — one tenth is a single slide of the digits.",
            steps: [
              "10% means one tenth: 10/100 = 1/10.",
              "One tenth of 30 is 30 ÷ 10 = 3.",
              "You save $3 (and pay $27).",
            ],
          },
          {
            name: "Count the Tens",
            emoji: "🎯",
            whenToUse: "Use it to really see why 10% works — each ten pays one dollar.",
            steps: [
              "Chop the price into tens: 30 is 10 + 10 + 10 — three tens.",
              "10% of each ten is 1 dollar (one out of every 10).",
              "Three tens × $1 = $3 saved.",
            ],
          },
        ],
      },
    ],
    quiz: [
      {
        question: "What does 50% of something mean?",
        options: ["A quarter of it", "Half of it", "All of it", "Twice as much"],
        answerIndex: 1,
        explanation: "50% = 50/100 = 1/2 — exactly half.",
      },
      {
        question: "10% of 90 = ?",
        options: ["9", "90", "19", "0.9"],
        answerIndex: 0,
        explanation: "10% means divide by 10: 90 ÷ 10 = 9.",
      },
      {
        question: "Which percent is the same as 1/2?",
        options: ["25%", "10%", "75%", "50%"],
        answerIndex: 3,
        explanation: "1/2 = 50/100 = 50%.",
      },
      {
        question: "Dev answers 20 out of 20 questions correctly. His score as a percent is…",
        options: ["50%", "75%", "100%", "20%"],
        answerIndex: 2,
        explanation: "20 out of 20 is the whole thing — 100%.",
      },
    ],
    worksheet: [
      { kind: "fill-blank", prompt: "50% of 24 is ___.", answer: "12" },
      {
        kind: "fill-blank",
        prompt: "10% means one ___ of a whole (divide by 10 to find it).",
        answer: "tenth",
      },
      { kind: "practice", prompt: "What is 25% of 20? Type just the number.", answer: "5" },
      {
        kind: "practice",
        prompt: "A $40 backpack is 10% off. How many dollars do you save? Type just the number.",
        answer: "4",
        hint: "10% means divide by 10.",
      },
      {
        kind: "match",
        prompt: "Match each fraction to its percent costume!",
        left: ["1/2", "1/4", "3/4"],
        right: ["75%", "50%", "25%"],
        answer: [1, 2, 0],
      },
      {
        kind: "short-answer",
        prompt:
          "Sofia gets 15 out of 20 on a spelling test. Explain how you could find her score as a percent. (Hint: how many hundredths is 15/20?)",
        sampleAnswer:
          "15/20 = 75/100, because multiply the top and bottom of 15/20 by 5. So Sofia scored 75%.",
      },
    ],
  },

  // -------------------------------------------------------------------------
  // 6. Geometry: Shapes, Perimeter & Area
  // -------------------------------------------------------------------------
  {
    id: "math-primary-6",
    title: "Geometry: Shapes, Perimeter & Area",
    emoji: "📐",
    minutes: 12,
    intro:
      "Shapes, fences, floors and corners — geometry is the maths you can see all around you.",
    sections: [
      {
        heading: "2D Shape Detective",
        body: "Flat shapes are named by their sides and corners. Triangle: 3 sides. Quadrilateral: 4 sides (squares and rectangles are quadrilaterals). Pentagon: 5 sides. Hexagon: 6 sides. A square has 4 equal sides; a rectangle has 2 pairs of equal sides — and both have 4 square corners.",
        example: "A stop sign is an octagon — 8 sides!",
        tip: "'Quad' means four, 'penta' five, 'hexa' six, 'octa' eight — like a quad bike.",
      },
      {
        heading: "3D Shapes Have Depth",
        body: "Solid shapes have faces (flat surfaces), edges (where faces meet) and vertices (corners). A cube has 6 square faces, 12 edges and 8 vertices. A cylinder has 2 circle faces; a sphere has none!",
        example: "A dice is a cube: 6 faces, 12 edges, 8 vertices. Roll it!",
        tip: "Count a cube's vertices: 4 on top plus 4 on the bottom = 8.",
      },
      {
        heading: "Perimeter: The Walk Around",
        body: "Perimeter is the distance all the way around a shape — like a fence around a garden. Add every side: 6 + 4 + 6 + 4 = 20. For rectangles there is a shortcut: 2 × (length + width).",
        example: "A garden 5 m long and 3 m wide needs 2 × (5 + 3) = 16 m of fence.",
        tip: "Peri-meter means 'measure around' — imagine an ant walking the border.",
      },
      {
        heading: "Area: Cover the Floor",
        body: "Area measures how much surface a shape covers, in square units. Count the unit squares inside, or multiply: for rectangles, area = length × width.",
        example: "A rectangle 6 cm long and 4 cm wide fits 4 rows of 6 squares = 24 cm².",
        tip: "Perimeter is the fence; area is the grass inside it.",
      },
      {
        heading: "Angle Basics",
        body: "Angles measure turns, in degrees. A right angle is a perfect square corner: 90°. Smaller than a right angle is acute; bigger (but less than a straight 180° line) is obtuse.",
        example: "The corner of a book is a right angle. At 3:00, a clock's hands sit 90° apart.",
        tip: "Acute = 'a cute little angle'. Obtuse = big and open.",
      },
    ],
    vocab: [
      { word: "perimeter", meaning: "The distance all the way around a shape." },
      { word: "area", meaning: "How much surface a shape covers, in square units." },
      { word: "vertex", meaning: "A corner of a shape. More than one? Vertices." },
      { word: "right angle", meaning: "A square corner measuring exactly 90 degrees." },
    ],
    funFact:
      "Euclid wrote a whole book of geometry around 300 BC — and students still learn ideas from it over 2,300 years later!",
    strategyLab: [
      {
        problem: "Perimeter of a rectangle 6 cm long and 4 cm wide?",
        answer: "20 cm",
        answerCheck: "Check: 20 − 6 − 4 − 6 = 4 ✓ — the left-over side matches the last width.",
        methods: [
          {
            name: "Walk the Sides",
            emoji: "🚶",
            whenToUse: "Use it whenever a shape is in front of you — just travel the border.",
            steps: [
              "Pretend to walk the edges, starting at a corner: along the long side (6), turn, short side (4), turn, long side (6), turn, short side (4).",
              "Add each leg of the trip: 6 + 4 + 6 + 4.",
              "Total distance: 20 cm.",
            ],
          },
          {
            name: "Double the Sides",
            emoji: "🎯",
            whenToUse: "The rectangle shortcut — two lengths and two widths, doubled and done.",
            steps: [
              "A rectangle has 2 long sides and 2 short sides.",
              "Add one length and one width: 6 + 4 = 10.",
              "Double it (the walk goes back along both): 2 × 10 = 20 cm.",
            ],
          },
          {
            name: "Pairs Plus",
            emoji: "🧦",
            whenToUse: "Use it for quick mental maths — double each side, then add.",
            steps: [
              "Double the length: 2 × 6 = 12.",
              "Double the width: 2 × 4 = 8.",
              "Add the pairs: 12 + 8 = 20 cm.",
            ],
          },
        ],
      },
      {
        problem: "Area of the same rectangle (6 cm × 4 cm)?",
        answer: "24 cm²",
        answerCheck: "Check: 24 ÷ 6 = 4 ✓ — the answer splits back into 4 rows of 6.",
        methods: [
          {
            name: "Count Squares",
            emoji: "🔢",
            whenToUse: "Use it when you are new to area — see the squares, trust the count.",
            steps: [
              "Draw the rectangle on centimetre grid paper: 6 squares across, 4 squares down.",
              "Count the squares row by row: each row holds 6.",
              "Four rows of 6 squares = 24 squares, so the area is 24 cm².",
            ],
          },
          {
            name: "Multiply Sides",
            emoji: "✖️",
            whenToUse: "The grown-up formula — fastest once you understand why it works.",
            steps: [
              "Each row has 6 squares, and there are 4 rows.",
              "That is 6 × 4 — length × width.",
              "6 × 4 = 24, so the area is 24 cm².",
            ],
          },
          {
            name: "Skip-Count Rows",
            emoji: "🦘",
            whenToUse: "Use it as a bridge between counting and multiplying.",
            steps: [
              "Say the running total as you finish each row of 6: 6, 12, 18, 24.",
              "You skip-counted by 6 four times.",
              "That lands on 24, so the area is 24 cm².",
            ],
          },
        ],
      },
    ],
    quiz: [
      {
        question: "How many faces does a cube have?",
        options: ["4", "6", "8", "12"],
        answerIndex: 1,
        explanation: "A cube has 6 square faces — like the 6 sides of a dice.",
      },
      {
        question: "What is the perimeter of a rectangle 5 cm long and 3 cm wide?",
        options: ["8 cm", "15 cm", "16 cm", "10 cm"],
        answerIndex: 2,
        explanation: "Walk the sides: 5 + 3 + 5 + 3 = 16 cm.",
      },
      {
        question: "What is the area of a rectangle 7 cm long and 4 cm wide?",
        options: ["11 cm²", "28 cm²", "22 cm²", "14 cm²"],
        answerIndex: 1,
        explanation: "Area = length × width = 7 × 4 = 28 cm².",
      },
      {
        question: "An angle smaller than a right angle (90°) is called…",
        options: ["obtuse", "acute", "straight", "round"],
        answerIndex: 1,
        explanation: "Acute angles are the cute little ones, smaller than 90°.",
      },
    ],
    worksheet: [
      { kind: "fill-blank", prompt: "A triangle has ___ sides.", answer: "3" },
      {
        kind: "practice",
        prompt: "A square has sides of 7 cm. What is its perimeter? Type just the number of cm.",
        answer: "28",
        hint: "All 4 sides are equal.",
      },
      {
        kind: "practice",
        prompt: "A rectangle is 8 m long and 3 m wide. What is its area? Type just the number of square metres.",
        answer: "24",
      },
      {
        kind: "match",
        prompt: "Match each shape to its superpower!",
        left: ["triangle", "cube", "hexagon"],
        right: ["6 faces, solid shape", "3 sides, flat shape", "6 sides, flat shape"],
        answer: [1, 0, 2],
      },
      { kind: "fill-blank", prompt: "A right angle measures ___ degrees.", answer: "90" },
      {
        kind: "short-answer",
        prompt:
          "Zara wants a ribbon border around a photo that is 10 cm long and 6 cm wide. How much ribbon does she need, and how did you work it out?",
        sampleAnswer:
          "Perimeter: 10 + 6 + 10 + 6 = 32 cm (or 2 × (10 + 6) = 32). She needs 32 cm of ribbon.",
      },
    ],
  },

  // -------------------------------------------------------------------------
  // 7. Measurement Masters
  // -------------------------------------------------------------------------
  {
    id: "math-primary-7",
    title: "Measurement Masters",
    emoji: "⚖️",
    minutes: 11,
    intro:
      "Metres, grams, litres, minutes and coins — master these measures and you can size up anything.",
    sections: [
      {
        heading: "Metric Length",
        body: "Metric length climbs in steps of 10, 100 and 1000: 10 millimetres = 1 centimetre, 100 centimetres = 1 metre, 1000 metres = 1 kilometre. Pick the unit that fits the job: pencil → cm, classroom → m, trip to the next town → km.",
        example: "A new pencil is about 18 cm. A soccer field is about 100 m.",
        tip: "Kilo means 1000; centi means 100th — kilo-metre, centi-metre, cent.",
      },
      {
        heading: "Mass: How Heavy?",
        body: "We measure mass in grams (g) and kilograms (kg). 1000 g = 1 kg. A paperclip is about 1 g, an apple about 200 g, a big bag of rice maybe 5 kg.",
        example: "Six 200 g apples together weigh 6 × 200 = 1200 g — just over 1 kg.",
        tip: "Grams for light things, kilograms for heavy ones.",
      },
      {
        heading: "Capacity: How Much Fits?",
        body: "Capacity is how much liquid a container holds, measured in millilitres (mL) and litres (L). 1000 mL = 1 L. A teaspoon is about 5 mL, a juice box about 200 mL, a big bottle 1 L or 2 L.",
        example: "Five 200 mL juice boxes poured into a jug = 1000 mL = 1 whole litre.",
        tip: "A litre of milk and 1000 mL are the same amount — two names, one jug.",
      },
      {
        heading: "Time & Money Round-Up",
        body: "Time skills: count minutes by fives around the clock, and add time in chunks. Money skills: add coin values biggest first, and count up to make change.",
        example: "Bus leaves 3:20, arrives 3:55: 3:20 → 3:50 is 30 minutes, plus 5 more = 35 minutes.",
        tip: "For change, count up from the price to what you paid: 65¢ paid with $1? 75, 85, 95, $1.00 → 35¢.",
      },
    ],
    vocab: [
      { word: "unit", meaning: "The amount you measure with, like 1 cm, 1 g or 1 mL." },
      { word: "kilometre", meaning: "1000 metres — about a 12-minute walk." },
      { word: "litre", meaning: "1000 millilitres — a big bottle of water." },
      { word: "change", meaning: "Money you get back when you pay more than the price." },
    ],
    funFact:
      "A litre of water weighs almost exactly 1 kilogram — mass and capacity are secret partners!",
    strategyLab: [
      {
        problem: "Kai's ribbon is 250 cm. Dev's ribbon is 2 m 40 cm. Whose ribbon is longer?",
        answer: "Kai's ribbon (by 10 cm)",
        answerCheck: "Check: 240 cm + 10 cm = 250 cm ✓ — Kai's is exactly 10 cm longer.",
        methods: [
          {
            name: "Convert to Centimetres",
            emoji: "📏",
            whenToUse: "Use it when one measure is all in cm — pull the other one down to match.",
            steps: [
              "100 cm = 1 m, so 2 m = 200 cm.",
              "Dev's ribbon: 200 cm + 40 cm = 240 cm.",
              "Compare: 250 cm vs 240 cm — Kai's ribbon is longer by 10 cm.",
            ],
          },
          {
            name: "Convert to Metres",
            emoji: "🔀",
            whenToUse: "Use it when you prefer thinking in metres — push the cm up instead.",
            steps: [
              "100 cm makes 1 m, so Kai's 250 cm is 2 m and a half-leftover of 50 cm: 2 m 50 cm.",
              "Compare in the same units: 2 m 50 cm vs 2 m 40 cm.",
              "50 cm beats 40 cm, so Kai's ribbon is longer.",
            ],
          },
        ],
      },
      {
        problem: "A jug holds 1 L of juice. Maya pours four 250 mL cups. How much juice is left?",
        answer: "0 mL (none!)",
        answerCheck: "Check: 250 × 4 = 1000 mL = 1 L ✓ — the cups drank the whole jug.",
        methods: [
          {
            name: "Convert to Millilitres",
            emoji: "🥛",
            whenToUse: "Use it whenever L and mL mix — match the units first, then calculate.",
            steps: [
              "1000 mL = 1 L, so the jug holds 1000 mL.",
              "Four cups of 250 mL: 250 × 4 = 1000 mL poured.",
              "Juice left: 1000 − 1000 = 0 mL. The jug is empty!",
            ],
          },
          {
            name: "Quarter-Jug Picture",
            emoji: "🧃",
            whenToUse: "Use it to see the fractions hiding inside litres and millilitres.",
            steps: [
              "250 mL is one quarter of 1000 mL — one quarter of the jug.",
              "Four cups = four quarters.",
              "Four quarters make one whole jug, so 0 mL is left.",
            ],
          },
        ],
      },
    ],
    quiz: [
      {
        question: "How many centimetres are in 1 metre?",
        options: ["10", "100", "1000", "60"],
        answerIndex: 1,
        explanation: "100 cm = 1 m — that is why metre sticks have 100 marks.",
      },
      {
        question: "Which unit is best for measuring the mass of an apple?",
        options: ["litres", "metres", "grams", "hours"],
        answerIndex: 2,
        explanation: "Mass is measured in grams (or kilograms) — about 200 g for an apple.",
      },
      {
        question: "A bottle holds 500 mL. How many bottles fill a 2 litre jug?",
        options: ["2", "3", "4", "5"],
        answerIndex: 2,
        explanation: "2 L = 2000 mL, and 2000 ÷ 500 = 4 bottles.",
      },
      {
        question: "Noah pays $1.00 for an 80¢ muffin. His change is…",
        options: ["10¢", "20¢", "30¢", "80¢"],
        answerIndex: 1,
        explanation: "Count up: 80… 90, $1.00 → 20¢ change.",
      },
    ],
    worksheet: [
      { kind: "fill-blank", prompt: "1 kg = ___ g. Type just the number.", answer: "1000" },
      { kind: "fill-blank", prompt: "1000 metres = 1 ___ (what unit?).", answer: "kilometre" },
      {
        kind: "practice",
        prompt: "A pencil is 12 cm and a crayon is 9 cm. How much longer is the pencil? Type just the number of cm.",
        answer: "3",
      },
      {
        kind: "practice",
        prompt: "Aisha drinks 2 cups of 200 mL each. How many mL did she drink? Type just the number.",
        answer: "400",
      },
      {
        kind: "match",
        prompt: "Match each measuring job to its best unit!",
        left: ["mass of a dog", "water in a bathtub", "distance to the next city"],
        right: ["litres", "kilograms", "kilometres"],
        answer: [1, 0, 2],
      },
      {
        kind: "short-answer",
        prompt:
          "Marco's bus leaves at 3:20 and arrives at 3:55. How long is the ride? Explain how you found it.",
        sampleAnswer:
          "From 3:20 to 3:50 is 30 minutes, then 5 more minutes to 3:55. The ride is 35 minutes.",
      },
    ],
  },

  // -------------------------------------------------------------------------
  // 8. Word Problem Champions
  // -------------------------------------------------------------------------
  {
    id: "math-primary-8",
    title: "Word Problem Champions",
    emoji: "🏆",
    minutes: 12,
    intro:
      "Word problems are mystery stories where YOU are the detective — and champions never face a story without a toolkit.",
    sections: [
      {
        heading: "Two-Step Stories",
        body: "Some problems hide two questions in one. First you find a hidden number (like the cost of 3 packs), then use it to answer the real question. Slow down and solve one step at a time.",
        example:
          "Maya has 34 beads, buys 3 packs of 12, then gives 20 beads to her cousin. Step 1: 3 × 12 = 36. Step 2: 34 + 36 − 20 = 50 beads.",
        tip: "Every giant problem is just little steps stacked up.",
      },
      {
        heading: "Untangle the Story",
        body: "Champion routine: 1) Read twice. 2) Underline the question — what must you find? 3) Circle the numbers you need. 4) Cross out info you don't need. 5) Choose the operations (+, −, ×, ÷) for each step.",
        example:
          "'Each bag holds 4 muffins' — that hints at ÷ or ×. 'How much money does she collect?' — that is the question to underline.",
        tip: "If a number never gets used, that's fine — stories love to distract.",
      },
      {
        heading: "Bar Models: Picture the Story",
        body: "A bar model turns words into a picture. Draw a long bar for the total, then split it into parts for what you know. The empty part is what you are hunting for.",
        example:
          "70 beads total: one bar shows 'had 34' + 'bought 36'; chop a 20-piece off the end and the remaining bar is the answer: 50.",
        tip: "You don't need to draw well — you need to draw clearly. Boxes are enough.",
      },
      {
        heading: "Check It Backwards",
        body: "Champions finish by reversing the story: put your answer back in and see if it rebuilds the start. If Maya ends with 50, then 50 + 20 (gave away) = 70, and 70 − 36 (bought) = 34 — exactly her starting beads.",
        example: "Sold 6 bags for $18? Check: 18 ÷ 6 = $3 per bag ✓",
        tip: "Working backwards is the closest thing maths has to a time machine.",
      },
    ],
    vocab: [
      {
        word: "multi-step",
        meaning: "A problem that needs two or more mini-answers before the final one.",
      },
      { word: "operation", meaning: "A maths action: +, −, × or ÷." },
      { word: "bar model", meaning: "A drawing of boxes that shows the parts and the total." },
      { word: "estimate", meaning: "A smart rough answer, found before or after the exact one." },
    ],
    funFact:
      "The longest recorded Monopoly game lasted about 70 days — imagine the multi-step money problems two players would solve in that time!",
    strategyLab: [
      {
        problem:
          "Maya has 34 beads, buys 3 packs of 12, then gives 20 beads to her cousin. How many beads now?",
        answer: "50 beads",
        answerCheck:
          "Check: 50 + 20 = 70, and 70 − 36 = 34 ✓ — back to Maya's starting beads.",
        methods: [
          {
            name: "Step by Step",
            emoji: "🪜",
            whenToUse: "The champion's default — find the hidden number first, then finish the story.",
            steps: [
              "Step 1 — the hidden number: 3 packs of 12 = 3 × 12 = 36 beads bought.",
              "Step 2 — add what she has: 34 + 36 = 70 beads.",
              "Step 3 — take away the gift: 70 − 20 = 50 beads.",
            ],
          },
          {
            name: "Bar Model",
            emoji: "📊",
            whenToUse: "Use it when the story feels tangled — draw the parts before computing.",
            steps: [
              "Draw a bar split into two pieces: 'had 34' and 'bought 36'. Together they make 70.",
              "Chop a piece off the end labelled 'gave 20'.",
              "The bar that remains is the answer: 70 − 20 = 50 beads.",
            ],
          },
          {
            name: "Number Line Jumps",
            emoji: "🦘",
            whenToUse: "Use it to feel the story moving — up for gains, back for losses.",
            steps: [
              "Start at 34 on the number line.",
              "Jump up by 36 (the beads bought) and land on 70.",
              "Jump back by 20 (the beads given) and land on 50 beads.",
            ],
          },
        ],
      },
      {
        problem:
          "Amara bakes 24 muffins for a school fair. She sells them in bags of 4 for $3 a bag and sells every bag. How much money does she collect?",
        answer: "$18",
        answerCheck: "Check: $18 ÷ 6 bags = $3 per bag ✓ — the price matches the story.",
        methods: [
          {
            name: "Bags First",
            emoji: "🧮",
            whenToUse: "The natural order — find the hidden number (bags), then the money.",
            steps: [
              "Step 1 — hidden number: 24 muffins in bags of 4 → 24 ÷ 4 = 6 bags.",
              "Step 2 — money: 6 bags × $3 = $18 collected.",
            ],
          },
          {
            name: "Count Up in Threes",
            emoji: "💰",
            whenToUse: "Use it to track the money growing bag by bag — great for a sanity check.",
            steps: [
              "Every bag adds $3, so count: $3, $6, $9, $12, $15, $18.",
              "Count the threes: 6 of them — one per bag.",
              "So Amara collects $18.",
            ],
          },
        ],
      },
    ],
    quiz: [
      {
        question: "Maya has 34 beads and buys 3 packs of 12. How many beads does she have now?",
        options: ["46", "58", "70", "72"],
        answerIndex: 2,
        explanation: "Two steps: 3 × 12 = 36, then 34 + 36 = 70.",
      },
      {
        question: "Kai buys 2 comics at $6 each and pays with a $20 bill. How much change?",
        options: ["$8", "$12", "$14", "$6"],
        answerIndex: 0,
        explanation: "Step 1: 2 × 6 = 12. Step 2: 20 − 12 = 8 → $8 change.",
      },
      {
        question: "What should you do FIRST with a long word problem?",
        options: [
          "Guess the answer quickly",
          "Underline the question and circle the numbers",
          "Write the final answer",
          "Multiply any two numbers you see",
        ],
        answerIndex: 1,
        explanation: "Untangle first: know what is asked and what you can use.",
      },
      {
        question:
          "Dev solved a problem that ended with 'then he gave away 5'. To check his answer backwards, Dev should…",
        options: [
          "Add 5 back to his answer",
          "Subtract 5 from his answer again",
          "Double his answer",
          "Erase his work",
        ],
        answerIndex: 0,
        explanation: "Reversing 'gave away 5' means adding 5 back to rebuild the start.",
      },
    ],
    worksheet: [
      {
        kind: "practice",
        prompt: "Zara has 15 marbles. She wins 2 games and gets 6 marbles for each win. How many marbles now?",
        answer: "27",
        hint: "Two steps: marbles won first, then add.",
      },
      {
        kind: "practice",
        prompt: "Noah buys 3 notebooks at $4 each and pays with a $20 bill. How much change? (like $8)",
        answer: "$8",
      },
      {
        kind: "fill-blank",
        prompt:
          "In a word problem, the sentence that asks what to find is called the ___ — underline it first!",
        answer: "question",
      },
      {
        kind: "match",
        prompt: "Match each detective move to what it does!",
        left: ["Read the question", "Circle the numbers", "Check backwards"],
        right: [
          "run the operations in reverse to test the answer",
          "spot the data you will use",
          "find what is being asked",
        ],
        answer: [2, 1, 0],
      },
      {
        kind: "practice",
        prompt:
          "Aisha packs 45 muffins into bags of 5. Each bag sells for $2 and she sells every bag. How many dollars does she collect? Type just the number.",
        answer: "18",
        hint: "Bags first, then money.",
      },
      {
        kind: "short-answer",
        prompt:
          "Write your own two-step word problem about pocket money for a friend to solve, then show the steps to solve it.",
        sampleAnswer:
          "Kai saves $5 each week for 4 weeks, then spends $9 on a game. How much money is left? Step 1: 4 × 5 = 20. Step 2: 20 − 9 = 11. Kai has $11 left.",
      },
    ],
  },
];
