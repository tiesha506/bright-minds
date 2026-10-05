import type { Subject } from "./types";

export const mathSubject: Subject = {
  id: "math",
  name: "Math",
  emoji: "🔢",
  gradient: "from-amber-400 to-orange-500",

  taglines: {
    early: "Count, sort and play with numbers every day!",
    primary: "Level up your times tables, fractions and money smarts!",
    intermediate: "Crack decimals, ratios and equations with real-world math.",
    teen: "Master algebra, geometry and data — skills for exams and for life.",
  },

  lessons: {
    early: [
      {
        id: "math-early-1",
        title: "Counting & Numbers to 20+",
        emoji: "🧮",
        minutes: 6,
        intro:
          "Numbers are everywhere! Let's count apples, balloons and toys all the way up.",
        sections: [
          {
            heading: "Counting to 10",
            body: "Count your fingers. One, two, three… all the way to ten!",
            example: "🍎🍎🍎🍎🍎 — five apples! Say one number for each apple.",
            tip: "Point at each thing as you count. Do not skip anything!",
          },
          {
            heading: "Bigger Numbers",
            body: "After ten comes eleven. Then twelve, thirteen… up to twenty!",
            example: "🎈 Twelve balloons! That is a lot of balloons.",
            tip: "Numbers from 13 to 19 all end in '-teen'.",
          },
          {
            heading: "How Many Do You See?",
            body: "Look around you. Count the chairs. Count the doors. Count everything!",
            example: "1, 2, 3 — three teddy bears on the bed!",
          },
        ],
        vocab: [
          { word: "count", meaning: "Say numbers in order to find how many." },
          { word: "more", meaning: "A bigger amount. 7 cookies is more than 3 cookies." },
          { word: "zero", meaning: "No things at all! 0 means none." },
        ],
        funFact:
          "Honeybees can count! Studies show they can keep track of up to 4 landmarks on the way back home.",
        quiz: [
          {
            question: "Count the apples: 🍎🍎🍎",
            options: ["2", "3", "4"],
            answerIndex: 1,
            explanation: "Touch each apple one time as you count: one, two, three!",
          },
          {
            question: "What number comes after 6?",
            options: ["5", "7", "8"],
            answerIndex: 1,
            explanation: "When you count up, seven comes right after six.",
          },
          {
            question: "How many fingers are on one hand?",
            options: ["5", "10", "3"],
            answerIndex: 0,
            explanation: "One hand has five fingers. Two hands have ten!",
          },
          {
            question: "Which number is the biggest?",
            options: ["12", "9", "15"],
            answerIndex: 2,
            explanation: "15 comes last when you count, so it is the biggest.",
          },
        ],
        worksheet: [
          { kind: "draw", prompt: "Draw 4 circles. Then count them out loud!" },
          {
            kind: "practice",
            prompt: "Count the stars: ⭐⭐⭐⭐⭐⭐ How many stars?",
            answer: "6",
            hint: "Point to each star as you count.",
          },
          {
            kind: "fill-blank",
            prompt: "What number comes right after 9?",
            answer: "10",
          },
          {
            kind: "match",
            prompt: "Match each number to its word!",
            left: ["3", "5", "7"],
            right: ["three", "five", "seven"],
            answer: [0, 1, 2],
          },
          {
            kind: "fill-blank",
            prompt: "Count the balloons: 🎈🎈🎈🎈🎈🎈🎈🎈 How many balloons?",
            answer: "8",
          },
        ],
      },
      {
        id: "math-early-2",
        title: "Shapes All Around Us",
        emoji: "🔺",
        minutes: 6,
        intro: "Look around! Shapes are hiding everywhere in your home.",
        sections: [
          {
            heading: "Circles Are Round",
            body: "A circle is round like a ball. It has no corners at all.",
            example: "A pizza is a circle. A clock is a circle too!",
            tip: "Trace the bottom of a cup to draw a perfect circle.",
          },
          {
            heading: "Shapes with Sides",
            body: "A square has 4 sides. They are all the same. A triangle has 3 sides.",
            example: "A slice of watermelon looks like a triangle!",
            tip: "Count the sides to name a shape.",
          },
          {
            heading: "Go on a Shape Hunt",
            body: "Shapes hide everywhere in your home. Can you find them?",
            example: "A window is a square. A wheel is a circle!",
          },
        ],
        vocab: [
          { word: "circle", meaning: "A round shape with no corners." },
          { word: "square", meaning: "A shape with 4 sides, all the same." },
          { word: "triangle", meaning: "A shape with 3 sides." },
        ],
        funFact:
          "Bees build their honeycombs out of hexagons — six-sided shapes that fit together with no gaps!",
        quiz: [
          {
            question: "How many sides does a triangle have?",
            options: ["2", "3", "4"],
            answerIndex: 1,
            explanation: "Tri means three! A triangle always has 3 sides.",
          },
          {
            question: "Which shape is round?",
            options: ["🔺 triangle", "🔵 circle", "🟨 square"],
            answerIndex: 1,
            explanation: "A circle is round like a ball. It has no corners!",
          },
          {
            question: "How many sides does a square have?",
            options: ["4", "3", "5"],
            answerIndex: 0,
            explanation: "A square always has 4 sides, and they are all the same length.",
          },
          {
            question: "A ball looks most like a…",
            options: ["square", "circle", "triangle"],
            answerIndex: 1,
            explanation: "A ball is round, just like a circle!",
          },
        ],
        worksheet: [
          { kind: "draw", prompt: "Draw a big triangle. Then draw a circle under it!" },
          {
            kind: "match",
            prompt: "Match each shape to its name!",
            left: ["🔴", "🟦", "🔺"],
            right: ["circle", "square", "triangle"],
            answer: [0, 1, 2],
          },
          {
            kind: "practice",
            prompt: "How many sides does a square have?",
            answer: "4",
          },
          {
            kind: "fill-blank",
            prompt: "A pizza has the shape of a ______.",
            answer: "circle",
            hint: "It is round with no corners.",
          },
          {
            kind: "fill-blank",
            prompt: "How many corners does a triangle have?",
            answer: "3",
          },
        ],
      },
      {
        id: "math-early-3",
        title: "Adding & Subtracting Small Numbers",
        emoji: "➕",
        minutes: 7,
        intro: "Put together, take away — number magic with apples and balloons!",
        sections: [
          {
            heading: "Adding Puts Together",
            body: "Adding means putting groups together. The group gets bigger!",
            example: "🍎🍎 + 🍎 = 3 apples! Two apples and one apple make three.",
            tip: "Start with the big group, then count on: 2… 3!",
          },
          {
            heading: "Subtracting Takes Away",
            body: "Subtracting means taking some away. The group gets smaller!",
            example: "5 balloons, 2 pop. 5 − 2 = 3 balloons left!",
            tip: "Use your fingers. Put some down to take away.",
          },
          {
            heading: "Opposite Twins",
            body: "Adding and subtracting are opposites. They undo each other!",
            example: "3 + 2 = 5. Then 5 − 2 = 3. See? Back to the start!",
          },
        ],
        vocab: [
          { word: "add", meaning: "Put groups together to make a bigger group." },
          { word: "take away", meaning: "Subtract. Some things go away!" },
          { word: "equals", meaning: "Means 'the same as'. 2 + 2 equals 4." },
        ],
        funFact:
          "The plus (+) and minus (−) signs first appeared in a printed math book in 1489 — over 500 years ago!",
        quiz: [
          {
            question: "2 apples + 2 apples = ?",
            options: ["3 apples", "4 apples", "5 apples"],
            answerIndex: 1,
            explanation: "Put the two groups together: 2 + 2 = 4 apples!",
          },
          {
            question: "You have 5 cookies 🍪 and eat 1. How many are left?",
            options: ["4", "5", "6"],
            answerIndex: 0,
            explanation: "5 − 1 = 4. One cookie is gone!",
          },
          {
            question: "3 + 1 = ?",
            options: ["2", "3", "4"],
            answerIndex: 2,
            explanation: "Count on from 3: one more is 4!",
          },
          {
            question: "4 balloons and 2 pop. How many are left?",
            options: ["2", "3", "6"],
            answerIndex: 0,
            explanation: "4 − 2 = 2 balloons still floating!",
          },
        ],
        worksheet: [
          {
            kind: "practice",
            prompt: "2 + 3 = ?",
            answer: "5",
            hint: "Count on from 2: 3, 4, 5.",
          },
          {
            kind: "practice",
            prompt: "5 − 2 = ?",
            answer: "3",
          },
          { kind: "draw", prompt: "Draw 4 circles. Then draw 2 more circles. Count them all!" },
          {
            kind: "match",
            prompt: "Match each problem to its answer!",
            left: ["1 + 1", "4 − 1", "2 + 2"],
            right: ["2", "3", "4"],
            answer: [0, 1, 2],
          },
          {
            kind: "fill-blank",
            prompt: "6 − 4 = ?",
            answer: "2",
          },
        ],
      },
    ],

    primary: [
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
            body: "Some facts are easy friends. Anything × 1 stays the same. Anything × 10 just adds a zero. The 5s hop by fives: 5, 10, 15, 20…",
            example: "7 × 1 = 7,  8 × 10 = 80,  6 × 5 = 30 (count by fives!).",
            tip: "9s trick: 9 × 7 → the digits of the answer add to 9 (6 + 3), so the answer is 63.",
          },
          {
            heading: "Tables in Real Life",
            body: "Multiplication pops up everywhere — packing goody bags, counting wheels on cars, buying packs of cards.",
            example:
              "Kai buys 6 packs of stickers. Each pack has 5 stickers. 6 × 5 = 30 stickers. Nice haul!",
            tip: "Practise 5 minutes a day. Small steps add up fast.",
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
            word: "times table",
            meaning: "A list of answers for one number, like the 5s: 5, 10, 15, 20…",
          },
        ],
        funFact:
          "Babylonian students used multiplication tables carved into clay tablets nearly 4,000 years ago!",
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
            question: "Which is TRUE about multiplying by 1?",
            options: [
              "It doubles the number",
              "It keeps the number the same",
              "It makes the number 1",
              "It adds 10",
            ],
            answerIndex: 1,
            explanation: "1 group of anything is just that thing: 9 × 1 = 9.",
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
            kind: "practice",
            prompt: "Sofia buys 9 packs of cards. Each pack has 6 cards. How many cards?",
            answer: "54",
          },
          {
            kind: "short-answer",
            prompt:
              "Write one times-table fact you find tricky, then describe a trick that could help you remember it.",
            sampleAnswer:
              "7 × 8 is tricky for me. The trick is '5, 6, 7, 8' → 56 = 7 × 8, and I can check it by doubling 7 × 4 = 28.",
          },
        ],
      },
      {
        id: "math-primary-2",
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
            heading: "Comparing Fractions",
            body: "A bigger bottom number means smaller slices! 1/2 is bigger than 1/4, because half a pizza beats a quarter of it.",
            example:
              "Zara eats 1/2 of a chocolate bar and Dev eats 1/3 of the same bar. Zara gets more chocolate!",
            tip: "Same top number? The smaller bottom number wins.",
          },
        ],
        vocab: [
          { word: "fraction", meaning: "An equal part of a whole, like 1/2 or 3/4." },
          { word: "numerator", meaning: "The top number: how many parts you have." },
          {
            word: "denominator",
            meaning: "The bottom number: how many equal parts the whole has.",
          },
          { word: "half", meaning: "One of 2 equal parts. Written 1/2." },
        ],
        funFact:
          "The word 'fraction' comes from the Latin 'fractus', which means 'broken' — a fraction is a whole number broken into parts!",
        quiz: [
          {
            question: "A pizza is cut into 4 equal slices. You eat 1 slice. What fraction did you eat?",
            options: ["1/2", "1/3", "1/4", "4/1"],
            answerIndex: 2,
            explanation: "The whole had 4 equal parts, so each slice is 1/4.",
          },
          {
            question: "Which fraction is the biggest?",
            options: ["1/2", "1/3", "1/4", "1/8"],
            answerIndex: 0,
            explanation: "Fewer slices means bigger slices — half beats them all here.",
          },
          {
            question: "In the fraction 3/5, what does the 5 tell you?",
            options: [
              "How many parts you have",
              "How many equal parts the whole has",
              "The final answer",
              "How many pizzas",
            ],
            answerIndex: 1,
            explanation: "The denominator (bottom) says the whole was split into 5 equal parts.",
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
            prompt: "Kai cuts a melon into 8 equal pieces and eats 3. What fraction did Kai eat? (like 3/8)",
            answer: "3/8",
          },
          {
            kind: "short-answer",
            prompt:
              "Describe how you would share 1 sandwich fairly between you and 3 friends. What fraction does each person get?",
            sampleAnswer:
              "Cut it into 4 equal pieces — one for me and three for my friends. Each person gets 1/4 of the sandwich.",
          },
          {
            kind: "match",
            prompt: "Match each fraction to its words!",
            left: ["1/2", "1/4", "3/4"],
            right: ["three quarters", "one half", "one quarter"],
            answer: [1, 2, 0],
          },
        ],
      },
      {
        id: "math-primary-3",
        title: "Time & Money Skills",
        emoji: "⏰",
        minutes: 9,
        intro:
          "Read the clock, count your coins — these two skills pay off every single day of your life.",
        sections: [
          {
            heading: "Reading Clocks",
            body: "The short hand shows the hour. The long hand shows the minutes. When the long hand points at 3, it is 15 minutes past.",
            example: "Short hand on 4, long hand on 12 → 4 o'clock. Snack time!",
            tip: "Count by fives around the clock: 5, 10, 15, 20, 25, 30…",
          },
          {
            heading: "Counting Money",
            body: "Coins and bills have values. Add the biggest first: a dollar, then quarters (25¢ each), then dimes (10¢) and nickels (5¢).",
            example: "2 quarters + 1 dime + 1 nickel = 25 + 25 + 10 + 5 = 65¢.",
            tip: "100¢ makes 1 dollar.",
          },
          {
            heading: "Making Change",
            body: "Change is the money you get back when you pay more than the price. Start at the price and count up to what you paid.",
            example:
              "Sofia pays $1.00 for a 75¢ pencil. Count up: 75… 85, 90, 95, $1.00. That is 25¢ change.",
            tip: "Counting up to the dollar is easier than subtracting!",
          },
        ],
        vocab: [
          { word: "quarter", meaning: "A coin worth 25¢ — one quarter of a dollar." },
          { word: "change", meaning: "Money you get back after paying too much." },
          { word: "hour", meaning: "60 minutes. The short clock hand counts hours." },
          { word: "minute", meaning: "60 seconds. The long clock hand counts minutes." },
        ],
        funFact:
          "The minute hand of a clock travels about 1,440 full laps around the clock face every single day!",
        quiz: [
          {
            question: "The long hand points at 6 and the short hand is just past 2. What time is it?",
            options: ["2:30", "6:00", "2:06", "12:30"],
            answerIndex: 0,
            explanation: "Long hand on 6 means 30 minutes — half past 2 is 2:30.",
          },
          {
            question: "How many quarters make 1 dollar?",
            options: ["2", "3", "4", "5"],
            answerIndex: 2,
            explanation: "4 × 25¢ = 100¢ = $1.",
          },
          {
            question: "Maya buys a sticker for 60¢ and pays with a dollar. How much change does she get?",
            options: ["40¢", "50¢", "60¢", "30¢"],
            answerIndex: 0,
            explanation: "100 − 60 = 40, so she gets 40¢ back.",
          },
          {
            question: "Which coin is worth the most?",
            options: ["nickel", "dime", "quarter", "penny"],
            answerIndex: 2,
            explanation: "A quarter is 25¢ — more than a dime (10¢), nickel (5¢) or penny (1¢).",
          },
        ],
        worksheet: [
          {
            kind: "fill-blank",
            prompt: "The long hand on a clock counts ______.",
            answer: "minutes",
          },
          { kind: "practice", prompt: "How many minutes are in 1 hour?", answer: "60" },
          {
            kind: "practice",
            prompt: "2 quarters + 3 dimes = ___¢. Type just the number of cents.",
            answer: "80",
            hint: "Quarters are 25¢ each, dimes are 10¢ each.",
          },
          {
            kind: "fill-blank",
            prompt: "Dev pays $1.00 for a 65¢ juice. His change is ___¢.",
            answer: "35",
          },
          {
            kind: "short-answer",
            prompt:
              "You have two quarters and one dime. You want to buy a ball for 50¢. Do you have enough? Explain your thinking.",
            sampleAnswer:
              "Two quarters are 50¢, plus a dime makes 60¢. Since 60¢ is more than 50¢, yes — and I would have 10¢ left over.",
          },
          {
            kind: "match",
            prompt: "Match each coin to its value!",
            left: ["penny", "dime", "quarter"],
            right: ["10¢", "1¢", "25¢"],
            answer: [1, 0, 2],
          },
        ],
      },
    ],

    intermediate: [
      {
        id: "math-intermediate-1",
        title: "Decimals & Percents",
        emoji: "🛒",
        minutes: 12,
        intro:
          "Decimals and percents are two languages for the same idea — parts of a whole — and you will meet both every time you shop.",
        sections: [
          {
            heading: "Place Value Past the Point",
            body: "A decimal point splits whole numbers from parts. In 3.75, the 7 sits in the tenths place (7/10) and the 5 sits in the hundredths place (5/100).",
            example:
              "$3.75 means 3 dollars, plus 7 tenths of a dollar (70¢), plus 5 hundredths (5¢).",
            tip: "The further right a digit sits, the smaller its value.",
          },
          {
            heading: "Percent Means 'Per Hundred'",
            body: "A percent is a fraction with 100 on the bottom: 25% = 25/100 = 0.25. To switch between forms, move the decimal point two places.",
            example:
              "A $40 hoodie is on sale for 25% off. 25% of 40 = 40 × 0.25 = 10. You save $10 and pay $30.",
            tip: "10% of a number = move the decimal one place left. 10% of 60 is 6.",
          },
          {
            heading: "Converting Between Forms",
            body: "Fractions, decimals and percents are three outfits for the same number: 1/2 = 0.5 = 50%. To find a percent of a number, convert the percent to a decimal first, then multiply.",
            example:
              "A game download shows 0.75 complete. That is 75% — three quarters done. A 20% chance of rain is 0.2 — unlikely, so sunglasses are fine.",
          },
        ],
        vocab: [
          { word: "decimal", meaning: "A number with a point showing parts of a whole, like 0.5." },
          { word: "percent", meaning: "Parts per hundred. 40% = 40/100 = 0.4." },
          { word: "tenth", meaning: "One of ten equal parts — the first digit after the point." },
          {
            word: "hundredth",
            meaning: "One of a hundred equal parts — the second digit after the point.",
          },
          { word: "discount", meaning: "Money taken off a price, often shown as a percent." },
        ],
        funFact:
          "The % symbol evolved from an Italian abbreviation of 'per cento' — literally 'per hundred'.",
        quiz: [
          {
            question: "What is 0.7 written as a percent?",
            options: ["0.7%", "7%", "70%", "700%"],
            answerIndex: 2,
            explanation: "Move the decimal point two places right: 0.7 → 70%.",
          },
          {
            question: "A $60 game is 50% off. What do you pay?",
            options: ["$6", "$20", "$30", "$50"],
            answerIndex: 2,
            explanation: "50% off means half price: 60 ÷ 2 = $30.",
          },
          {
            question: "Which number is the largest?",
            options: ["0.4", "0.35", "0.09", "0.401"],
            answerIndex: 3,
            explanation: "0.401 is just past 0.4; 0.35 and 0.09 are smaller.",
          },
          {
            question: "12 is what percent of 60?",
            options: ["12%", "20%", "24%", "72%"],
            answerIndex: 1,
            explanation: "12/60 = 1/5 = 0.2 = 20%.",
          },
          {
            question: "Aisha tips 15% on an $8 snack. About how much is the tip?",
            options: ["$0.15", "$0.80", "$1.20", "$12.00"],
            answerIndex: 2,
            explanation: "10% of 8 is 0.80 and 5% is 0.40, so 15% = 0.80 + 0.40 = $1.20.",
          },
        ],
        worksheet: [
          { kind: "fill-blank", prompt: "Write 45% as a decimal.", answer: "0.45" },
          { kind: "practice", prompt: "What is 10% of 250?", answer: "25" },
          {
            kind: "practice",
            prompt: "A $36 game is 25% off. What is the sale price, in dollars?",
            answer: "27",
            hint: "First find 25% of 36, then subtract it.",
          },
          { kind: "fill-blank", prompt: "0.9 = ___% (type just the number).", answer: "90" },
          {
            kind: "short-answer",
            prompt:
              "A weather report says there is an 80% chance of rain tomorrow. What does that mean, and should Kai bring an umbrella? Explain.",
            sampleAnswer:
              "It means that on about 80 days out of 100 like this one, it rained. That is very likely, so yes — Kai should bring an umbrella.",
          },
          {
            kind: "practice",
            prompt: "Marco scores 18 out of 20 on a quiz. What percent is that? (type just the number)",
            answer: "90",
            hint: "18/20 as a decimal, then move the point two places.",
          },
        ],
      },
      {
        id: "math-intermediate-2",
        title: "Ratios & Proportions",
        emoji: "⚖️",
        minutes: 12,
        intro:
          "Ratios compare things — like a perfect pancake recipe. Get the ratio right and you can scale it up for any crowd.",
        sections: [
          {
            heading: "What Is a Ratio?",
            body: "A ratio compares two amounts. If a fruit punch mixes 2 cups of juice with 3 cups of water, the ratio is 2 to 3, written 2:3. Order matters!",
            example:
              "In a class of 12 students, 8 play soccer and 4 play chess. The ratio of soccer to chess is 8:4, which simplifies to 2:1.",
            tip: "Simplify ratios just like fractions — divide both parts by the same number.",
          },
          {
            heading: "Proportions: Equal Ratios",
            body: "A proportion says two ratios are equal, like 2:3 = 4:6. To find a missing value, scale up or down — multiply or divide both parts by the same number.",
            example:
              "A recipe needs 2 eggs for every 3 cups of flour. For 9 cups of flour: 9 ÷ 3 = 3, so you need 2 × 3 = 6 eggs.",
          },
          {
            heading: "Unit Rates",
            body: "A unit rate compares to exactly 1 — like price per item or speed per hour. Divide to find it.",
            example: "6 apples cost $3.00, so each apple costs 3 ÷ 6 = $0.50 — fifty cents per apple.",
            tip: "Unit rates make shopping comparisons easy: the lowest price per item wins.",
          },
        ],
        vocab: [
          { word: "ratio", meaning: "A comparison of two amounts, like 3:2." },
          { word: "proportion", meaning: "Two equal ratios, like 1:2 = 4:8." },
          { word: "unit rate", meaning: "A rate per one unit, like $2 per apple." },
          {
            word: "scale",
            meaning: "Grow or shrink both parts of a ratio by the same factor.",
          },
          {
            word: "equivalent",
            meaning: "Different-looking ratios that mean the same comparison.",
          },
        ],
        funFact:
          "The golden ratio (about 1.618) shows up in sunflower seeds, seashells and even the Parthenon in Greece.",
        quiz: [
          {
            question: "A smoothie uses 3 bananas for 2 cups of milk. What is the banana-to-milk ratio?",
            options: ["2:3", "3:2", "3:5", "2:2"],
            answerIndex: 1,
            explanation: "Bananas come first in the question: 3 bananas to 2 cups = 3:2.",
          },
          {
            question: "Which ratio is equivalent to 4:6?",
            options: ["2:3", "6:4", "4:3", "2:6"],
            answerIndex: 0,
            explanation: "Divide both parts by 2: 4:6 = 2:3.",
          },
          {
            question: "A car travels 180 miles in 3 hours. What is its speed as a unit rate?",
            options: ["60 miles per hour", "180 miles per hour", "54 miles per hour", "36 miles per hour"],
            answerIndex: 0,
            explanation: "180 ÷ 3 = 60, so the car averages 60 mph.",
          },
          {
            question: "If 5 notebooks cost $10, how much do 8 notebooks cost?",
            options: ["$14", "$16", "$18", "$12"],
            answerIndex: 1,
            explanation: "Each notebook is $2, so 8 × 2 = $16.",
          },
          {
            question: "A map scale says 1 cm = 5 km. Two cities are 7 cm apart on the map. What is the real distance?",
            options: ["12 km", "35 km", "57 km", "70 km"],
            answerIndex: 1,
            explanation: "7 × 5 = 35 km.",
          },
        ],
        worksheet: [
          {
            kind: "fill-blank",
            prompt: "Simplify the ratio 6:8 to its simplest form (like 3:4).",
            answer: "3:4",
          },
          {
            kind: "practice",
            prompt: "A trail mix uses 2 cups of nuts per 1 cup of raisins. How many cups of nuts for 5 cups of raisins?",
            answer: "10",
          },
          {
            kind: "practice",
            prompt: "Zara reads 30 pages in 45 minutes. At that rate, how many pages in 90 minutes?",
            answer: "60",
            hint: "90 minutes is double 45 minutes.",
          },
          {
            kind: "fill-blank",
            prompt: "12 pencils cost $3.00. The unit price is $___ per pencil.",
            answer: "0.25",
          },
          {
            kind: "short-answer",
            prompt:
              "A pancake recipe serves 4 people and calls for 1.5 cups of milk. You need to serve 6 people. How much milk do you need, and how do you know?",
            sampleAnswer:
              "6 is 1.5 times 4, so scale the whole recipe by 1.5: 1.5 × 1.5 = 2.25 cups of milk.",
          },
          {
            kind: "practice",
            prompt: "A model car is built at 1:24 scale. The real car is 4.8 meters long. How long is the model, in meters?",
            answer: "0.2",
            hint: "Divide the real length by 24.",
          },
        ],
      },
      {
        id: "math-intermediate-3",
        title: "Intro to Algebra: Solving Equations",
        emoji: "🧩",
        minutes: 13,
        intro:
          "Algebra turns 'mystery number' puzzles into equations you can actually solve — it is detective work with letters.",
        sections: [
          {
            heading: "Letters Stand for Numbers",
            body: "A variable is a letter that holds the place of a mystery number. If Noah has n marbles and finds 5 more, we write n + 5.",
            example: "n + 5 = 12 asks: what number plus 5 makes 12? The answer is n = 7.",
            tip: "Read expressions out loud: 3x means 'three groups of x'.",
          },
          {
            heading: "Balance the Equation",
            body: "An equation is like a balanced scale. Whatever you do to one side, you must do to the other. To undo '+ 5', subtract 5 from both sides.",
            example: "x + 5 = 12 → x + 5 − 5 = 12 − 5 → x = 7. Check: 7 + 5 = 12 ✓",
          },
          {
            heading: "Undo Multiplication Too",
            body: "Use the opposite operation to peel away each layer. Addition undoes subtraction, and division undoes multiplication.",
            example: "4y = 28 → divide both sides by 4 → y = 7. Check: 4 × 7 = 28 ✓",
            tip: "Always check your answer by substituting it back into the original equation.",
          },
        ],
        vocab: [
          {
            word: "variable",
            meaning: "A letter, like x, standing for an unknown number.",
          },
          {
            word: "equation",
            meaning: "A math sentence with an equals sign, balanced on both sides.",
          },
          { word: "solve", meaning: "Find the value of the variable that makes the equation true." },
          {
            word: "inverse operation",
            meaning: "The opposite operation — subtraction undoes addition, division undoes multiplication.",
          },
          { word: "term", meaning: "A building block of an expression, like 3x or +5." },
        ],
        funFact:
          "The word 'algebra' comes from 'al-jabr', the title of a 9th-century math book by the Persian mathematician al-Khwarizmi.",
        quiz: [
          {
            question: "What does the x in 3x stand for?",
            options: ["The letter after w", "An unknown number", "The times symbol", "Zero"],
            answerIndex: 1,
            explanation: "A variable is a placeholder for a number we have not found yet.",
          },
          {
            question: "Solve: x + 6 = 14",
            options: ["x = 6", "x = 8", "x = 14", "x = 20"],
            answerIndex: 1,
            explanation: "Subtract 6 from both sides: x = 14 − 6 = 8.",
          },
          {
            question: "Solve: 5m = 45",
            options: ["m = 9", "m = 40", "m = 50", "m = 225"],
            answerIndex: 0,
            explanation: "Divide both sides by 5: m = 45 ÷ 5 = 9.",
          },
          {
            question: "Solve: y − 7 = 3",
            options: ["y = 4", "y = 10", "y = 21", "y = −4"],
            answerIndex: 1,
            explanation: "Add 7 to both sides: y = 3 + 7 = 10.",
          },
          {
            question: "Sofia thinks n = 4 solves 2n + 3 = 10. Is she right?",
            options: [
              "Yes — because 2 + 3 = 5",
              "No — n = 4 gives 11",
              "No — n = 4 gives 7",
              "Yes — because 2 × 4 = 8",
            ],
            answerIndex: 1,
            explanation: "Check it: 2 × 4 + 3 = 11, not 10. The real solution is n = 3.5.",
          },
        ],
        worksheet: [
          { kind: "fill-blank", prompt: "Solve: x + 9 = 15.  x = ___", answer: "6" },
          { kind: "practice", prompt: "Solve: 3a = 21.  a = ?", answer: "7" },
          { kind: "practice", prompt: "Solve: y − 4 = 10.  y = ?", answer: "14" },
          {
            kind: "fill-blank",
            prompt: "To solve 2x = 18, divide both sides by ___.",
            answer: "2",
          },
          {
            kind: "short-answer",
            prompt:
              "Dev writes the equation x + 4 = 4x − 8 and guesses that x = 4. Check his guess by substituting into both sides, then explain whether he is correct.",
            sampleAnswer:
              "Left side: 4 + 4 = 8. Right side: 4 × 4 − 8 = 16 − 8 = 8. Both sides equal 8, so yes — x = 4 is correct.",
          },
          {
            kind: "practice",
            prompt: "Amara buys 4 same-priced pens for $12. If p is the price of one pen, solve 4p = 12.  p = ?",
            answer: "3",
            hint: "Divide both sides by 4. The answer is in dollars.",
          },
        ],
      },
    ],

    teen: [
      {
        id: "math-teen-1",
        title: "Linear Equations & Graphing Lines",
        emoji: "📈",
        minutes: 18,
        intro:
          "Every straight line hides a simple rule. Learn to read y = mx + b and you can model anything that changes at a constant rate — taxi fares, gym fees, phone plans.",
        sections: [
          {
            heading: "Slope: The Rate of Change",
            body: "In y = mx + b, m is the slope — how fast y rises for each step of x. Slope = rise/run = (y₂ − y₁)/(x₂ − x₁). A slope of 3 means y grows 3 units for every 1 unit of x.",
            example:
              "A phone plan costs $20 plus $2 per GB. The cost line has slope 2: each extra gigabyte adds exactly $2.",
            tip: "Positive slope rises left to right; negative slope falls. Zero slope is horizontal.",
          },
          {
            heading: "Intercepts and Forms",
            body: "b is the y-intercept — where the line crosses the y-axis, the starting value when x = 0. Key forms: slope-intercept y = mx + b, point-slope y − y₁ = m(x − x₁), standard Ax + By = C.",
            example:
              "For the phone plan C = 2g + 20: at g = 0 the cost is $20, so the y-intercept is (0, 20).",
            tip: "Convert to slope-intercept form when you need to graph quickly.",
          },
          {
            heading: "Graphing and Interpreting",
            body: "Plot the y-intercept, then step with the slope: run 1, rise m. Two points fix a line completely. Parallel lines share a slope; perpendicular lines have slopes multiplying to −1.",
            example: "Graph y = 2x + 20: start at (0, 20), move right 1 and up 2 to reach (1, 22).",
            tip: "The x-intercept solves 0 = mx + b — the point where the model hits zero.",
          },
        ],
        vocab: [
          {
            word: "slope",
            meaning: "Rate of change of a line: rise over run, the m in y = mx + b.",
          },
          {
            word: "y-intercept",
            meaning: "Where the line crosses the y-axis — the value when x = 0.",
          },
          {
            word: "linear",
            meaning: "Changing by equal amounts; a constant rate that graphs as a straight line.",
          },
          { word: "parallel", meaning: "Lines with the same slope that never intersect." },
          {
            word: "perpendicular",
            meaning: "Lines meeting at 90°; their slopes multiply to −1.",
          },
          {
            word: "system",
            meaning: "Two or more equations solved together; the solution is where the lines cross.",
          },
        ],
        funFact:
          "The coordinate plane is named after René Descartes — legend says watching a fly walk across his ceiling gave him the idea.",
        quiz: [
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
            question:
              "A taxi charges $3.50 to start plus $1.20 per km. Which equation gives the fare f for a d-km ride?",
            options: ["f = 3.50d + 1.20", "f = 1.20d + 3.50", "f = 4.70d", "f = 1.20(d + 3.50)"],
            answerIndex: 1,
            explanation: "The per-km rate is the slope (1.20d) and the start fee is the intercept (3.50).",
          },
          {
            question: "Where does y = 3x − 6 cross the x-axis?",
            options: ["(0, −6)", "(2, 0)", "(−2, 0)", "(6, 0)"],
            answerIndex: 1,
            explanation: "Set y = 0: 3x = 6, so x = 2. The point is (2, 0).",
          },
          {
            question: "How many intersection points do y = 2x + 1 and y = 2x − 5 have?",
            options: ["Exactly one", "None — they are parallel", "Infinitely many", "Cannot be determined"],
            answerIndex: 1,
            explanation: "Equal slopes but different intercepts → parallel lines never meet.",
          },
        ],
        worksheet: [
          { kind: "fill-blank", prompt: "The slope of y = −5x + 2 is ___.", answer: "-5" },
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
            prompt: "Solve the system: y = x + 4 and y = 3x − 2. What is the x-value of the intersection point?",
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
      {
        id: "math-teen-2",
        title: "Pythagorean Theorem & Geometry",
        emoji: "📐",
        minutes: 16,
        intro:
          "One ancient formula still powers construction, navigation and video games: a² + b² = c². Let's put it to work.",
        sections: [
          {
            heading: "Right Triangles and the Theorem",
            body: "In a right triangle, the two shorter sides are the legs and the longest side (opposite the right angle) is the hypotenuse. The theorem states a² + b² = c², where c is the hypotenuse.",
            example: "Legs 3 and 4: 3² + 4² = 9 + 16 = 25, so c² = 25 and c = 5.",
            tip: "Only the two legs get squared and added — never include c² on the left.",
          },
          {
            heading: "Finding Any Missing Side",
            body: "To find the hypotenuse, square both legs, add, then take the square root. To find a leg, subtract instead: a² = c² − b².",
            example:
              "A ladder leans with its foot 5 m from a wall and reaches 12 m up. Its length: 5² + 12² = 25 + 144 = 169, so √169 = 13 m.",
            tip: "Memorize the triples 3-4-5, 5-12-13 and 8-15-17 — they appear in exams constantly.",
          },
          {
            heading: "Why It Matters",
            body: "The theorem verifies right angles on construction sites, computes straight-line (diagonal) distances, and underpins the coordinate distance formula: d = √((x₂−x₁)² + (y₂−y₁)²).",
            example:
              "A screen is 16 by 12 inches. Its diagonal is √(16² + 12²) = √(256 + 144) = √400 = 20 inches.",
            tip: "The distance formula is just the Pythagorean theorem on a grid.",
          },
        ],
        vocab: [
          {
            word: "hypotenuse",
            meaning: "The longest side of a right triangle, opposite the right angle.",
          },
          { word: "leg", meaning: "Either of the two shorter sides forming the right angle." },
          {
            word: "square root",
            meaning: "A number that multiplied by itself gives the original: √25 = 5.",
          },
          {
            word: "Pythagorean triple",
            meaning: "Whole numbers satisfying a² + b² = c², like 3-4-5.",
          },
          {
            word: "converse",
            meaning: "If a² + b² = c² holds for three sides, the triangle must be right-angled.",
          },
          {
            word: "diagonal",
            meaning: "A straight line cutting across a shape, e.g. corner to corner of a screen.",
          },
        ],
        funFact:
          "Babylonian mathematicians used Pythagorean triples like 3-4-5 over 1,000 years before Pythagoras was born.",
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
            explanation: "13² − 5² = 169 − 25 = 144, and √144 = 12.",
          },
          {
            question: "Which set is a Pythagorean triple?",
            options: ["2, 3, 4", "4, 5, 6", "6, 8, 10", "5, 6, 8"],
            answerIndex: 2,
            explanation: "36 + 64 = 100, so 6-8-10 works — it is the 3-4-5 triple doubled.",
          },
          {
            question: "A rectangle measures 9 m by 12 m. Its diagonal is…",
            options: ["15 m", "21 m", "13 m", "3 m"],
            answerIndex: 0,
            explanation: "√(9² + 12²) = √(81 + 144) = √225 = 15 m.",
          },
          {
            question: "A triangle has sides 7, 24, 25. What can you conclude?",
            options: [
              "It is a right triangle",
              "It is equilateral",
              "It cannot exist",
              "It has no right angle",
            ],
            answerIndex: 0,
            explanation: "7² + 24² = 49 + 576 = 625 = 25², so by the converse it is right-angled.",
          },
        ],
        worksheet: [
          {
            kind: "fill-blank",
            prompt: "In a right triangle with legs 9 and 12, the hypotenuse is ___.",
            answer: "15",
            hint: "9² + 12² = 225.",
          },
          { kind: "practice", prompt: "Find the hypotenuse for legs 5 and 12.", answer: "13" },
          {
            kind: "fill-blank",
            prompt: "Hypotenuse 10, one leg 6: the other leg is √___ (type the number under the root).",
            answer: "64",
          },
          {
            kind: "practice",
            prompt: "A kite string is taut: it runs 30 m horizontally from Kai and the kite is 40 m high. How long is the string, in meters?",
            answer: "50",
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
            prompt: "The squares of the two legs equal the square of the ______.",
            answer: "hypotenuse",
          },
        ],
      },
      {
        id: "math-teen-3",
        title: "Statistics & Probability",
        emoji: "🎲",
        minutes: 17,
        intro:
          "Data is everywhere — sports stats, app analytics, weather forecasts. Statistics turns raw numbers into decisions, and probability tells you what to expect.",
        sections: [
          {
            heading: "Measures of Center",
            body: "The mean is the sum divided by the count. The median is the middle value of an ordered list. The mode is the most frequent value. Outliers drag the mean but barely move the median.",
            example:
              "Salaries (in $k): 30, 35, 40, 45, 250. Mean = 400 ÷ 5 = 80, but the median is 40 — one outlier makes the mean misleading.",
            tip: "When outliers are present, report the median.",
          },
          {
            heading: "Spread and Display",
            body: "Range = maximum − minimum. Standard deviation measures how far values typically sit from the mean. Box plots show median, quartiles and outliers; histograms show the shape of the data.",
            example: "Quiz scores 60, 70, 70, 80, 90: range = 90 − 60 = 30, and the mode is 70.",
            tip: "Always check units and sample size before comparing two data sets.",
          },
          {
            heading: "Probability Basics",
            body: "Probability = favourable outcomes ÷ total outcomes, always between 0 and 1. Independent events multiply: P(A and B) = P(A) × P(B).",
            example: "Two fair coins: P(two heads) = 1/2 × 1/2 = 1/4 = 25%.",
            tip: "0 means impossible, 1 means certain — nothing in between is guaranteed.",
          },
        ],
        vocab: [
          { word: "mean", meaning: "Sum of all values divided by how many values there are." },
          { word: "median", meaning: "The middle value once the data is ordered." },
          { word: "mode", meaning: "The value that appears most often." },
          { word: "outlier", meaning: "A value far away from the rest of the data." },
          {
            word: "probability",
            meaning: "A number from 0 to 1 measuring how likely an event is.",
          },
          {
            word: "independent",
            meaning: "Events that do not affect each other, so their probabilities multiply.",
          },
        ],
        funFact:
          "The word 'statistics' comes from 'state' — it began as the data governments collected about their populations.",
        quiz: [
          {
            question: "Data: 4, 8, 15, 16, 23, 42. What is the median?",
            options: ["15", "16", "15.5", "23"],
            answerIndex: 2,
            explanation: "With six values, average the two middle ones: (15 + 16) ÷ 2 = 15.5.",
          },
          {
            question: "A bag has 3 red, 2 blue and 5 green marbles. What is P(blue)?",
            options: ["1/2", "1/5", "2/3", "2/5"],
            answerIndex: 1,
            explanation: "2 blue out of 10 total: 2/10 = 1/5.",
          },
          {
            question:
              "Which measure of center best describes a typical income when one billionaire is in the data set?",
            options: ["Mean", "Median", "Mode", "Range"],
            answerIndex: 1,
            explanation: "The extreme outlier inflates the mean; the median resists outliers.",
          },
          {
            question: "Rolling two fair dice, what is P(both show 6)?",
            options: ["1/6", "1/12", "1/36", "1/2"],
            answerIndex: 2,
            explanation: "Independent events: 1/6 × 1/6 = 1/36.",
          },
          {
            question: "Scores: 70, 75, 80, 85, 250. Which statement is true?",
            options: [
              "The mean is the best summary",
              "The median is 80",
              "The mode is 250",
              "The range is 5",
            ],
            answerIndex: 1,
            explanation: "Ordered, the middle value is 80. The outlier drags the mean to 112.",
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
            prompt: "Rolling a fair die: P(even number) = ___ (as a fraction like 1/2).",
            answer: "1/2",
          },
          {
            kind: "practice",
            prompt: "Data set: 3, 3, 5, 9, 10, 18. What is the range?",
            answer: "15",
          },
          {
            kind: "short-answer",
            prompt:
              "A game drops a rare item 5% of the time per attempt. Aisha claims that 'after 20 attempts it is guaranteed'. Explain why she is wrong, and describe what actually happens to the chance as attempts pile up.",
            sampleAnswer:
              "Each attempt is independent, so nothing is guaranteed: after 20 attempts the chance of at least one drop is 1 − 0.95²⁰ ≈ 64%. The odds climb toward 100% but never quite reach it.",
          },
          {
            kind: "fill-blank",
            prompt: "Independent events: P(A) = 1/2 and P(B) = 1/3. P(A and B) = ___ (fraction like 1/2).",
            answer: "1/6",
          },
        ],
      },
    ],
  },
};
