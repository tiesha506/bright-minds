// Mathematics — Early Learning (ages 6-8)
// 7 lessons: counting, number sense, addition, subtraction, shapes,
// early multiplication and word problems — each with a multi-method
// Strategy Lab (never just the answer, always the different ways!).
import type { Lesson } from "./types";

export const lessons: Lesson[] = [
  // ---------------------------------------------------------------------------
  // 1. Counting Carnival
  // ---------------------------------------------------------------------------
  {
    id: "math-early-1",
    title: "Counting Carnival",
    emoji: "🎉",
    minutes: 6,
    intro:
      "Step right up to the Counting Carnival! Count balloons, horses and tickets — all the way to 20 and beyond.",
    sections: [
      {
        heading: "Count to 10, Then 20!",
        body:
          "Count your fingers. One, two, three… up to ten! After ten comes eleven. Then twelve, thirteen… all the way to twenty!",
        example: "🎡 At the fair, Maya counts 12 balloons: 1, 2, 3 … 12!",
        tip: "Numbers from 13 to 19 end in '-teen'.",
      },
      {
        heading: "Count Everything You See",
        body:
          "Look around. Count the chairs. Count the doors. Count your toys! Point at each thing as you say its number.",
        example: "1, 2, 3 — three teddy bears on the bed!",
        tip: "Point and count. Do not skip anything or count it twice!",
      },
      {
        heading: "Skip Counting: The Fast Lane",
        body:
          "Big kids count faster. Skip count by 2s: 2, 4, 6, 8… By 5s: 5, 10, 15, 20… By 10s: 10, 20, 30, 40…",
        example: "Shoes come in pairs. Count them by 2s: 2, 4, 6, 8, 10, 12!",
        tip: "Skip counting hops over numbers, like hopping over puddles.",
      },
    ],
    vocab: [
      { word: "count", meaning: "Say numbers in order to find how many." },
      { word: "skip counting", meaning: "Counting in hops: 2, 4, 6 instead of 1, 2, 3." },
      { word: "pair", meaning: "Two things that go together, like shoes." },
    ],
    funFact:
      "Honeybees can count! Studies show they keep track of up to 4 landmarks on the way back home.",
    strategyLab: [
      {
        problem: "A rollercoaster has 6 cars. 2 kids sit in each car. How many kids in all?",
        answer: "12",
        answerCheck:
          "Count the kids again, starting from 1. You land on 12 every time!",
        methods: [
          {
            name: "Count All, One by One",
            emoji: "🧮",
            whenToUse: "Great when you want to be extra careful.",
            steps: [
              "Picture the 6 cars with kids inside.",
              "Point and count every kid: 1, 2, 3 … all the way to 12.",
              "The last number you say is the answer: 12!",
            ],
          },
          {
            name: "Skip Count by 2s",
            emoji: "🎠",
            whenToUse: "Perfect when things come in pairs!",
            steps: [
              "Each car holds 2 kids — a pair!",
              "Say one number for each car: 2, 4, 6, 8, 10, 12.",
              "Six cars, six numbers. The last one is 12!",
            ],
          },
          {
            name: "Draw a Picture",
            emoji: "✏️",
            whenToUse: "Best when you like to see the math.",
            steps: [
              "Draw 6 circles for the cars.",
              "Draw 2 dots inside each circle.",
              "Count all the dots: 12!",
            ],
          },
        ],
      },
      {
        problem: "Aisha has 3 sticker strips. Each strip has 10 stickers. How many stickers in all?",
        answer: "30",
        answerCheck:
          "Say it another way: 10 + 10 + 10 = 30. Same answer every way!",
        methods: [
          {
            name: "Skip Count by 10s",
            emoji: "🎫",
            whenToUse: "Perfect for groups of 10!",
            steps: [
              "One strip, one number.",
              "Count: 10, 20, 30.",
              "Three strips — 30 stickers!",
            ],
          },
          {
            name: "Count the Tens",
            emoji: "🔟",
            whenToUse: "Great for big numbers that come in tens.",
            steps: [
              "Each strip is 1 ten.",
              "Count the tens: 1 ten, 2 tens, 3 tens.",
              "3 tens is written like this: 30!",
            ],
          },
          {
            name: "Keep Adding 10",
            emoji: "➕",
            whenToUse: "Good when you already know how to add 10.",
            steps: [
              "Start with the first strip: 10.",
              "Add one strip: 10 + 10 = 20.",
              "Add the last strip: 20 + 10 = 30!",
            ],
          },
        ],
      },
    ],
    quiz: [
      {
        question: "Count the balloons: 🎈🎈🎈🎈🎈",
        options: ["5", "4", "6"],
        answerIndex: 0,
        explanation: "Touch each balloon one time as you count: one, two, three, four, five!",
      },
      {
        question: "What number comes after 13?",
        options: ["12", "14", "15"],
        answerIndex: 1,
        explanation: "Count up: …12, 13, 14! Fourteen comes right after thirteen.",
      },
      {
        question: "Skip count by 5s: 5, 10, ___?",
        options: ["15", "12", "20"],
        answerIndex: 0,
        explanation: "Hopping by 5s goes 5, 10, 15! Count your fingers: one hand is 5, two hands is 10.",
      },
      {
        question: "Skip count by 10s: 10, 20, 30, ___?",
        options: ["35", "50", "40"],
        answerIndex: 2,
        explanation: "Tens go 10, 20, 30, 40! Four tens is 40.",
      },
    ],
    worksheet: [
      {
        kind: "practice",
        prompt: "Count the bunnies: 🐰🐰🐰🐰🐰🐰🐰 How many bunnies?",
        answer: "7",
        hint: "Point to each bunny one time.",
      },
      {
        kind: "fill-blank",
        prompt: "What number comes right after 19?",
        answer: "20",
      },
      {
        kind: "fill-blank",
        prompt: "Skip count by 2s: 2, 4, 6, ___, 10.",
        answer: "8",
        hint: "Hop by 2s!",
      },
      {
        kind: "match",
        prompt: "Match each numeral to its word!",
        left: ["15", "20", "12"],
        right: ["twelve", "fifteen", "twenty"],
        answer: [1, 2, 0],
      },
      {
        kind: "draw",
        prompt: "Draw 5 balloons 🎈. Count them out loud to a grown-up!",
      },
    ],
  },

  // ---------------------------------------------------------------------------
  // 2. Number Detective
  // ---------------------------------------------------------------------------
  {
    id: "math-early-2",
    title: "Number Detective",
    emoji: "🔍",
    minutes: 6,
    intro:
      "Put on your detective hat! Read numbers, write numbers, and find out which one is the biggest.",
    sections: [
      {
        heading: "Meet the Numbers 0 to 10",
        body:
          "A numeral is how a number looks, like 7. Every numeral has a word too: 7 says 'seven'. And zero? Zero means none at all!",
        example: "7 = seven = 🐞🐞🐞🐞🐞🐞🐞. Same number, three ways!",
        tip: "Match the numeral to a group of things. Count to check!",
      },
      {
        heading: "Ten, Teens and Twenty",
        body:
          "Ten is one full group of ten. The teens add more: 14 is 10 and 4 extra. Twenty is 2 tens!",
        example: "14 = 🔟 + 4 dots. Say it: 'ten and four make fourteen!'",
        tip: "Every teen number hides a 10 inside.",
      },
      {
        heading: "More or Less?",
        body:
          "Comparing asks: which is bigger? Which is smaller? When you count up, numbers get bigger. So the number you say later is bigger!",
        example: "9 or 15? Count: 9 comes first, 15 comes later. So 15 is bigger!",
        tip: "Later in counting = bigger. First = smaller.",
      },
    ],
    vocab: [
      { word: "numeral", meaning: "How a number looks when written, like 5." },
      { word: "compare", meaning: "Look at two numbers. Which is bigger?" },
      { word: "twenty", meaning: "2 tens! It is the number after 19." },
    ],
    funFact:
      "The numeral 0 was invented in India about 1,500 years ago. Before that, people had no symbol for 'nothing'!",
    strategyLab: [
      {
        problem: "Which is bigger: 14 or 9?",
        answer: "14",
        answerCheck:
          "Build a tower of 9 blocks. Keep adding until you reach 14. You needed 5 more blocks — 14 really is bigger!",
        methods: [
          {
            name: "Count On from the Small One",
            emoji: "🚶",
            whenToUse: "A quick check for two numbers.",
            steps: [
              "Start at 9.",
              "Walk up: 10, 11, 12, 13, 14.",
              "You had to walk 5 steps to reach 14 — so 14 is bigger!",
            ],
          },
          {
            name: "Number Line Hops",
            emoji: "🐸",
            whenToUse: "Best if you love hopping!",
            steps: [
              "Picture a number line from 0 to 20.",
              "Hop to 9. Then hop to 14.",
              "14 is farther from 0, so it is bigger!",
            ],
          },
          {
            name: "Ten Stacks",
            emoji: "🔟",
            whenToUse: "Super for teen numbers.",
            steps: [
              "14 is 1 full ten and 4 extra.",
              "9 is not even 1 full ten.",
              "A full ten plus extra beats no ten — 14 is bigger!",
            ],
          },
        ],
      },
      {
        problem: "Sofia holds 3 number cards: 17, 12 and 6. Which card shows the smallest number?",
        answer: "6",
        answerCheck:
          "Say them in order: 6, 12, 17. Six comes first, so it is the smallest!",
        methods: [
          {
            name: "Count and Spot",
            emoji: "🕵️",
            whenToUse: "Works for any set of numbers.",
            steps: [
              "Count up from 1.",
              "You meet 6 first, then 12, then 17.",
              "The first one you meet is the smallest: 6!",
            ],
          },
          {
            name: "Look for Full Tens",
            emoji: "🔟",
            whenToUse: "Fast when some numbers are teens.",
            steps: [
              "17 has a full ten inside.",
              "12 has a full ten too.",
              "6 has no ten at all — so 6 is smallest!",
            ],
          },
          {
            name: "Number Line",
            emoji: "📏",
            whenToUse: "Good when you picture numbers in a line.",
            steps: [
              "Picture a line from 0 to 20.",
              "Find 6, 12 and 17 on the line.",
              "The one closest to 0 is smallest: 6!",
            ],
          },
        ],
      },
    ],
    quiz: [
      {
        question: "Which number is bigger?",
        options: ["6", "11", "9"],
        answerIndex: 1,
        explanation: "Count on from 6: 7, 8, 9, 10, 11. Eleven comes later, so it is bigger!",
      },
      {
        question: "Which numeral means eight?",
        options: ["8", "5", "18"],
        answerIndex: 0,
        explanation: "The numeral 8 is eight. Eighteen would need a 1 and an 8!",
      },
      {
        question: "Which number is the smallest?",
        options: ["16", "12", "7"],
        answerIndex: 2,
        explanation: "Count up: 7 comes before 12 and 16. The first one is the smallest!",
      },
      {
        question: "What is 10 made of?",
        options: ["2 tens", "1 ten", "5 tens"],
        answerIndex: 1,
        explanation: "10 is one full group of ten. Twenty is 2 tens!",
      },
    ],
    worksheet: [
      {
        kind: "fill-blank",
        prompt: "Write the bigger number: 8 or 13?",
        answer: "13",
        hint: "Count on from 8 and see where you stop.",
      },
      {
        kind: "practice",
        prompt: "Count the fish: 🐠🐠🐠🐠🐠🐠🐠🐠🐠 How many fish?",
        answer: "9",
      },
      {
        kind: "fill-blank",
        prompt: "Write the smallest number: 11, 4, 18.",
        answer: "4",
        hint: "4 has no full ten inside.",
      },
      {
        kind: "match",
        prompt: "Match each numeral to its group of apples!",
        left: ["4", "2", "6"],
        right: ["🍎🍎", "🍎🍎🍎🍎🍎🍎", "🍎🍎🍎🍎"],
        answer: [2, 0, 1],
      },
      {
        kind: "draw",
        prompt: "Draw 10 dots. Then draw 3 dots under them. Which row has more?",
      },
    ],
  },

  // ---------------------------------------------------------------------------
  // 3. Addition Adventure
  // ---------------------------------------------------------------------------
  {
    id: "math-early-3",
    title: "Addition Adventure",
    emoji: "➕",
    minutes: 6,
    intro:
      "Pack your backpack — the Addition Adventure starts now! Put groups together and watch numbers grow.",
    sections: [
      {
        heading: "Adding Puts Groups Together",
        body:
          "Adding means putting two groups into one. The new group is bigger! You can add toys, fruit or blocks.",
        example: "🍎🍎🍎 + 🍎🍎 = 5 apples. 3 + 2 = 5!",
        tip: "Count the first group. Then count the second group too.",
      },
      {
        heading: "Count On to Add",
        body:
          "Start with the bigger number. Hold it in your head. Then count on the small number with your fingers.",
        example: "5 + 3: say '5' in your head. Then count 6, 7, 8!",
        tip: "Start from the bigger number. It is faster!",
      },
      {
        heading: "Make Ten and Double It",
        body:
          "Ten is your magic friend. If a number almost makes 10, finish the ten first. Doubles are easy too — the same number added twice!",
        example: "9 + 4: 9 + 1 makes 10. Then 10 + 3 = 13. And 6 + 6 is a double: 12!",
        tip: "Learn your doubles: 2+2=4, 3+3=6, 4+4=8, 5+5=10.",
      },
    ],
    vocab: [
      { word: "add", meaning: "Put groups together to make a bigger group." },
      { word: "sum", meaning: "The answer when you add. The sum of 2 + 3 is 5." },
      { word: "double", meaning: "The same number added to itself, like 4 + 4." },
    ],
    funFact:
      "The plus sign (+) first appeared in a printed math book in 1489 — more than 500 years ago!",
    strategyLab: [
      {
        problem: "Marco has 8 toy cars. His aunt gives him 5 more. How many cars now?",
        answer: "13",
        answerCheck:
          "Take 5 away from 13: 13 − 5 = 8. Right back where Marco started!",
        methods: [
          {
            name: "Count On",
            emoji: "👣",
            whenToUse: "Fast when one number is small.",
            steps: [
              "Hold 8 in your head.",
              "Count 5 more on your fingers: 9, 10, 11, 12, 13.",
              "One finger for each new car — 13 cars!",
            ],
          },
          {
            name: "Make Ten",
            emoji: "🎈",
            whenToUse: "Great when a number is close to 10.",
            steps: [
              "8 needs 2 more to make 10.",
              "Split the 5 into 2 and 3.",
              "8 + 2 = 10. Then 10 + 3 = 13!",
            ],
          },
          {
            name: "Draw a Picture",
            emoji: "✏️",
            whenToUse: "Best when you want to see every car.",
            steps: [
              "Draw 8 circles for Marco's cars.",
              "Draw 5 more circles for the new cars.",
              "Count all the circles: 13!",
            ],
          },
        ],
      },
      {
        problem: "Zara finds 6 shells at the beach. Then she finds 6 more. How many shells now?",
        answer: "12",
        answerCheck:
          "Go backwards: 12 − 6 = 6. The twins come back apart again!",
        methods: [
          {
            name: "Use Doubles",
            emoji: "✌️",
            whenToUse: "Perfect when both numbers match!",
            steps: [
              "6 and 6 are twin numbers.",
              "Say the double: 6 + 6 = 12.",
              "Think of a dozen eggs — 12!",
            ],
          },
          {
            name: "Count On",
            emoji: "👣",
            whenToUse: "Works every time, just a bit slower.",
            steps: [
              "Hold 6 in your head.",
              "Count 6 more: 7, 8, 9, 10, 11, 12.",
              "Zara has 12 shells!",
            ],
          },
          {
            name: "Make Ten",
            emoji: "🎁",
            whenToUse: "Great when a number almost reaches 10.",
            steps: [
              "Split the second 6 into 4 and 2.",
              "6 + 4 makes 10.",
              "Then 10 + 2 = 12!",
            ],
          },
        ],
      },
    ],
    quiz: [
      {
        question: "3 apples + 2 apples = ?",
        options: ["4 apples", "5 apples", "6 apples"],
        answerIndex: 1,
        explanation: "Put the groups together: 3, 4, 5! The sum is 5 apples.",
      },
      {
        question: "Count on: 7 + 1 = ?",
        options: ["8", "7", "9"],
        answerIndex: 0,
        explanation: "Hold 7 in your head. Count on 1: 8!",
      },
      {
        question: "9 + 5 = ? (Hint: 9 + 1 makes 10!)",
        options: ["13", "14", "15"],
        answerIndex: 1,
        explanation: "9 + 1 = 10. Then 10 + 4 = 14! Make ten first.",
      },
      {
        question: "What is the double of 5? (5 + 5)",
        options: ["10", "9", "8"],
        answerIndex: 0,
        explanation: "Double your 5 fingers — all 10 fingers! So 5 + 5 = 10.",
      },
    ],
    worksheet: [
      {
        kind: "practice",
        prompt: "4 + 3 = ?",
        answer: "7",
        hint: "Count on from 4: 5, 6, 7.",
      },
      {
        kind: "practice",
        prompt: "9 + 4 = ?",
        answer: "13",
        hint: "Make ten first: 9 + 1 = 10.",
      },
      {
        kind: "fill-blank",
        prompt: "6 + 6 = ? (a double!)",
        answer: "12",
      },
      {
        kind: "match",
        prompt: "Match each sum to its answer!",
        left: ["2 + 3", "5 + 5", "7 + 2"],
        right: ["10", "9", "5"],
        answer: [2, 0, 1],
      },
      {
        kind: "draw",
        prompt: "Draw 5 apples 🍎. Then draw 3 more apples. Count all your apples!",
      },
    ],
  },

  // ---------------------------------------------------------------------------
  // 4. Subtraction Safari
  // ---------------------------------------------------------------------------
  {
    id: "math-early-4",
    title: "Subtraction Safari",
    emoji: "➖",
    minutes: 7,
    intro:
      "Grab your binoculars — the Subtraction Safari is here! Take away, count back and spot the difference.",
    sections: [
      {
        heading: "Taking Away",
        body:
          "Subtracting means taking some away. What is left is smaller! Bananas get eaten. Balloons pop away.",
        example: "7 bananas, 2 get eaten. 7 − 2 = 5 bananas left!",
        tip: "Use beans or buttons. Push some away and count what is left.",
      },
      {
        heading: "Count Back",
        body:
          "Start at the big number. Count backwards. One count for each thing that goes away.",
        example: "10 − 3: say '10'. Then count back: 9, 8, 7. The answer is 7!",
        tip: "Fold one finger down for each count back.",
      },
      {
        heading: "Find the Difference",
        body:
          "'How many more?' is a subtraction question! Count up from the smaller number to the bigger one.",
        example: "Sofia has 9 stickers. Amara has 12. Count up: 10, 11, 12 — that is 3 hops. Amara has 3 more!",
        tip: "'How many more' is subtraction in disguise!",
      },
    ],
    vocab: [
      { word: "subtract", meaning: "Take some away. The group gets smaller." },
      { word: "left", meaning: "What is still there after some go away." },
      { word: "difference", meaning: "How far apart two numbers are. The difference of 10 and 7 is 3." },
    ],
    funFact:
      "The minus sign (−) appeared in the very same 1489 math book as the plus sign. The twins met on the same page!",
    strategyLab: [
      {
        problem: "A monkey had 12 bananas 🍌. He ate 4. How many bananas are left?",
        answer: "8",
        answerCheck:
          "Add the bananas back: 8 + 4 = 12. Every banana is back!",
        methods: [
          {
            name: "Take Away and Count",
            emoji: "🍌",
            whenToUse: "Best when you have real things to move.",
            steps: [
              "Count out 12 beans or buttons.",
              "Push 4 of them away.",
              "Count what is left: 8!",
            ],
          },
          {
            name: "Count Back",
            emoji: "🐾",
            whenToUse: "Fast when you can hop backwards in your head.",
            steps: [
              "Start at 12.",
              "Count back 4 hops: 11, 10, 9, 8.",
              "One hop for each banana — the answer is 8!",
            ],
          },
          {
            name: "Think Addition",
            emoji: "🔄",
            whenToUse: "Great when adding feels easier than taking away.",
            steps: [
              "Ask: 4 plus what makes 12?",
              "Try 8: 4 + 8 = 12. It works!",
              "So 12 − 4 = 8.",
            ],
          },
        ],
      },
      {
        problem: "Noah spots 15 zebras. Sofia spots 9. How many MORE zebras did Noah spot?",
        answer: "6",
        answerCheck: "Add it back: 9 + 6 = 15. The difference fits perfectly!",
        methods: [
          {
            name: "Count Up from the Small One",
            emoji: "🦓",
            whenToUse: "Perfect for 'how many more' stories.",
            steps: [
              "Start at Sofia's 9.",
              "Count up to 15: 10, 11, 12, 13, 14, 15.",
              "You said 6 numbers — Noah saw 6 more zebras!",
            ],
          },
          {
            name: "Match Them Up",
            emoji: "🧮",
            whenToUse: "Best when you like to see the gap.",
            steps: [
              "Draw a row of 9 dots for Sofia.",
              "Draw a row of 15 dots for Noah, under hers.",
              "Match the dots. 6 dots have no partner — that is the difference!",
            ],
          },
        ],
      },
    ],
    quiz: [
      {
        question: "You have 5 cookies 🍪 and eat 2. How many are left?",
        options: ["2", "3", "4"],
        answerIndex: 1,
        explanation: "5 − 2 = 3. Two cookies are gone, three are left!",
      },
      {
        question: "Count back: 10 − 3 = ?",
        options: ["7", "8", "9"],
        answerIndex: 0,
        explanation: "Start at 10. Count back: 9, 8, 7. Three hops land on 7!",
      },
      {
        question: "12 − 5 = ?",
        options: ["6", "7", "8"],
        answerIndex: 1,
        explanation: "Think addition: 5 + 7 = 12. So 12 − 5 = 7!",
      },
      {
        question: "8 − 8 = ?",
        options: ["1", "8", "0"],
        answerIndex: 2,
        explanation: "Take all 8 away and nothing is left. Zero means none!",
      },
    ],
    worksheet: [
      {
        kind: "practice",
        prompt: "10 − 3 = ?",
        answer: "7",
        hint: "Count back: 9, 8, 7.",
      },
      {
        kind: "practice",
        prompt: "12 − 5 = ?",
        answer: "7",
        hint: "Think addition: 5 + ? = 12.",
      },
      {
        kind: "fill-blank",
        prompt: "9 − 4 = ?",
        answer: "5",
      },
      {
        kind: "match",
        prompt: "Match each problem to its answer!",
        left: ["9 − 2", "10 − 6", "6 − 6"],
        right: ["0", "7", "4"],
        answer: [1, 2, 0],
      },
      {
        kind: "draw",
        prompt: "Draw 9 fish 🐟. Cross out 3 with your pencil. How many are left?",
      },
    ],
  },

  // ---------------------------------------------------------------------------
  // 5. Shapes All Around Us
  // ---------------------------------------------------------------------------
  {
    id: "math-early-5",
    title: "Shapes All Around Us",
    emoji: "🔷",
    minutes: 6,
    intro:
      "Shapes are hiding everywhere — in your lunch box, on the street, in your toy box. Let's catch them!",
    sections: [
      {
        heading: "Flat Shapes (2D)",
        body:
          "Flat shapes lie on paper. A circle is round, with no corners. A triangle has 3 sides. A square has 4 sides, all the same.",
        example: "A slice of watermelon looks like a triangle!",
        tip: "Count the sides and corners to name a shape.",
      },
      {
        heading: "Puffy Shapes (3D)",
        body:
          "Some shapes are not flat — they puff out! A ball is a sphere. A dice is a cube. A can is a cylinder.",
        example: "A dice 🎲 is a cube. It has 6 square faces!",
        tip: "Flat = 2D. Puffy = 3D.",
      },
      {
        heading: "Go on a Shape Hunt",
        body:
          "Shapes hide all over your home. Wheels are circles. Windows are squares. Boxes are cubes. Count sides and corners to catch them!",
        example: "A slice of toast: 4 sides, 4 corners. Square!",
        tip: "Sides and corners are your shape clues.",
      },
    ],
    vocab: [
      { word: "side", meaning: "The straight edge of a shape." },
      { word: "corner", meaning: "The pointy spot where two sides meet." },
      { word: "cube", meaning: "A puffy box shape, like a dice." },
    ],
    funFact:
      "Bees build honeycombs out of hexagons — six-sided shapes that fit together with no gaps!",
    strategyLab: [
      {
        problem: "Amara's cracker has 4 corners. All 4 sides are the same length. What shape is it?",
        answer: "square",
        answerCheck:
          "Count the sides one more time: 1, 2, 3, 4 — and they are all the same. A square every time!",
        methods: [
          {
            name: "Count the Sides",
            emoji: "🔢",
            whenToUse: "Always works for naming a shape.",
            steps: [
              "Count the corners: 1, 2, 3, 4.",
              "Count the sides: 4 sides.",
              "All sides the same length? Then it is a square!",
            ],
          },
          {
            name: "Trace and Turn",
            emoji: "✏️",
            whenToUse: "Nice if you like to touch and check.",
            steps: [
              "Trace the cracker on paper.",
              "Turn the cracker to fit the drawing again.",
              "It fits 4 different ways — all sides match. Square!",
            ],
          },
          {
            name: "Shape Hunt",
            emoji: "🏠",
            whenToUse: "Fun when you want to spot shapes around you.",
            steps: [
              "Look for things with 4 sides that all match.",
              "A window, a napkin, a square waffle!",
              "They are all squares — just like the cracker.",
            ],
          },
        ],
      },
      {
        problem: "Leo holds a ball. Is it a circle or a sphere?",
        answer: "sphere",
        answerCheck:
          "A circle is a flat picture on paper. A ball is puffy all around — so it is a sphere!",
        methods: [
          {
            name: "The Flat Test",
            emoji: "📄",
            whenToUse: "Tells flat and puffy shapes apart.",
            steps: [
              "A circle is flat, like a drawing on paper.",
              "The ball is puffy all around.",
              "Puffy round shape = sphere!",
            ],
          },
          {
            name: "The Roll Test",
            emoji: "🤾",
            whenToUse: "Fun when you can really try it.",
            steps: [
              "Try to press the ball flat under a heavy book.",
              "It will not flatten — it is not a flat shape!",
              "Puffy shapes like balls are spheres.",
            ],
          },
        ],
      },
    ],
    quiz: [
      {
        question: "How many sides does a square have?",
        options: ["3", "4", "5"],
        answerIndex: 1,
        explanation: "A square always has 4 sides, and they are all the same length.",
      },
      {
        question: "Which shape has 3 corners?",
        options: ["circle", "square", "triangle"],
        answerIndex: 2,
        explanation: "Tri means three! A triangle has 3 sides and 3 corners.",
      },
      {
        question: "A can of soup looks most like a…",
        options: ["cylinder", "sphere", "triangle"],
        answerIndex: 0,
        explanation: "A can is round and straight — that puffy shape is called a cylinder!",
      },
      {
        question: "A ball is a…",
        options: ["cube", "sphere", "square"],
        answerIndex: 1,
        explanation: "A ball is puffy and round all over — a sphere!",
      },
    ],
    worksheet: [
      {
        kind: "practice",
        prompt: "How many sides does a triangle have?",
        answer: "3",
      },
      {
        kind: "fill-blank",
        prompt: "A square has ___ corners.",
        answer: "4",
      },
      {
        kind: "fill-blank",
        prompt: "A dice is this puffy box shape: ______.",
        answer: "cube",
        hint: "It is a 3D shape you can roll on a table.",
      },
      {
        kind: "match",
        prompt: "Match each shape to its name!",
        left: ["🔺", "🟦", "🧊"],
        right: ["cube", "square", "triangle"],
        answer: [2, 1, 0],
      },
      {
        kind: "draw",
        prompt: "Draw a house: 1 square for the walls and 1 triangle for the roof!",
      },
    ],
  },

  // ---------------------------------------------------------------------------
  // 6. Groups of Fun: Simple Multiplication
  // ---------------------------------------------------------------------------
  {
    id: "math-early-6",
    title: "Groups of Fun: Simple Multiplication",
    emoji: "🍪",
    minutes: 7,
    intro:
      "Multiplying is just adding the same group again and again. Cookies, bikes and fingers — let's count them the smart way!",
    sections: [
      {
        heading: "Groups of the Same Size",
        body:
          "Multiplying means equal groups — groups with the same number inside. 3 × 5 means 3 groups of 5.",
        example: "Dev bakes cookies. 3 plates, 5 cookies on each: 5 + 5 + 5 = 15 cookies!",
        tip: "The × sign means 'groups of'.",
      },
      {
        heading: "Arrays: Neat Rows",
        body:
          "An array is things lined up in neat rows and columns. Rows make counting easy. Count one row, then count the rows!",
        example: "An egg box has 2 rows of 6 eggs. 6 + 6 = 12 eggs!",
        tip: "Make sure every row has the same number, or it is not an array.",
      },
      {
        heading: "Superpowers: ×2, ×5, ×10",
        body:
          "Some times tables hide inside skip counting! ×2: count by 2s. ×5: count by 5s. ×10: count by 10s.",
        example: "4 hands: 5, 10, 15, 20 — that is 4 × 5 = 20 fingers!",
        tip: "Your two hands are a ×5 machine.",
      },
    ],
    vocab: [
      { word: "equal groups", meaning: "Groups with the same number inside each one." },
      { word: "multiply", meaning: "Add the same number again and again. 3 × 2 means 2 + 2 + 2." },
      { word: "array", meaning: "Things lined up in neat rows and columns." },
    ],
    funFact:
      "A spider has 8 legs — that is 4 groups of 2, or 2 groups of 4. Spiders know their times tables!",
    strategyLab: [
      {
        problem: "Dev puts 5 cookies on each of 3 plates. How many cookies in all?",
        answer: "15",
        answerCheck:
          "Count one cookie at a time from 1 to 15. Then count by 5s again — 15 both ways!",
        methods: [
          {
            name: "Equal Groups Addition",
            emoji: "➕",
            whenToUse: "Great when the groups are small.",
            steps: [
              "There are 3 groups. Each group has 5.",
              "Add: 5 + 5 = 10.",
              "Then 10 + 5 = 15 cookies!",
            ],
          },
          {
            name: "Skip Count by 5s",
            emoji: "🔢",
            whenToUse: "Perfect for counting groups of 5!",
            steps: [
              "Point at the first plate: 5.",
              "Second plate: 10. Third plate: 15.",
              "One number per plate, 3 plates — 15 cookies!",
            ],
          },
          {
            name: "Draw an Array",
            emoji: "🍪",
            whenToUse: "Best when you like to see the whole picture.",
            steps: [
              "Draw 3 rows.",
              "Draw 5 circles in each row.",
              "Count all the circles: 15!",
            ],
          },
        ],
      },
      {
        problem: "A bike shop has 5 bikes. Each bike has 2 wheels. How many wheels in all?",
        answer: "10",
        answerCheck:
          "Add it up: 2 + 2 + 2 + 2 + 2 = 10. And 10 wheels on 5 bikes gives 2 each!",
        methods: [
          {
            name: "Skip Count by 2s",
            emoji: "🚲",
            whenToUse: "Perfect when things come in pairs.",
            steps: [
              "One number for each bike.",
              "Count: 2, 4, 6, 8, 10.",
              "Five bikes — 10 wheels!",
            ],
          },
          {
            name: "Double It",
            emoji: "✌️",
            whenToUse: "Clever when every group holds 2.",
            steps: [
              "Each bike has 2 wheels — a pair!",
              "5 bikes means 5 pairs: 5 and 5.",
              "5 + 5 = 10 wheels!",
            ],
          },
          {
            name: "Draw an Array",
            emoji: "⚫",
            whenToUse: "Best when you want to see every wheel.",
            steps: [
              "Draw 5 rows.",
              "Draw 2 dots in each row.",
              "Count all the dots: 10!",
            ],
          },
        ],
      },
    ],
    quiz: [
      {
        question: "2 × 3 means 2 groups of 3 apples. How many apples?",
        options: ["5", "6", "8"],
        answerIndex: 1,
        explanation: "3 + 3 = 6. Two groups of 3 make 6 apples!",
      },
      {
        question: "Skip count by 5s: 5, 10, 15, ___?",
        options: ["16", "25", "20"],
        answerIndex: 2,
        explanation: "Hopping by 5s: 5, 10, 15, 20! Four hops is 4 × 5 = 20.",
      },
      {
        question: "5 bikes, 2 wheels each. How many wheels? (5 × 2)",
        options: ["7", "10", "12"],
        answerIndex: 1,
        explanation: "Count by 2s: 2, 4, 6, 8, 10. Five bikes have 10 wheels!",
      },
      {
        question: "What is 10 × 3?",
        options: ["13", "20", "30"],
        answerIndex: 2,
        explanation: "Count by 10s three times: 10, 20, 30!",
      },
    ],
    worksheet: [
      {
        kind: "practice",
        prompt: "2 + 2 + 2 + 2 = ?",
        answer: "8",
        hint: "Skip count by 2s: 2, 4, 6, 8.",
      },
      {
        kind: "fill-blank",
        prompt: "Skip count by 5s: 5, 10, ___, 20.",
        answer: "15",
      },
      {
        kind: "practice",
        prompt: "3 boxes of 10 crayons. How many crayons? (3 × 10 = ?)",
        answer: "30",
        hint: "Count by 10s: 10, 20, 30.",
      },
      {
        kind: "match",
        prompt: "Match each multiplication to its answer!",
        left: ["2 × 3", "5 × 2", "10 × 2"],
        right: ["20", "6", "10"],
        answer: [1, 2, 0],
      },
      {
        kind: "draw",
        prompt: "Draw an array: 3 rows of 2 stars ⭐. How many stars did you draw?",
      },
    ],
  },

  // ---------------------------------------------------------------------------
  // 7. Story Problem Superstars
  // ---------------------------------------------------------------------------
  {
    id: "math-early-7",
    title: "Story Problem Superstars",
    emoji: "⭐",
    minutes: 7,
    intro:
      "Stories hide math inside them! Read the story, draw a picture, and solve it like a superstar.",
    sections: [
      {
        heading: "Step 1: Read It Like a Detective",
        body:
          "Story problems hide numbers in words. Read it twice. Find the numbers. Find out what happened!",
        example: "'Maya has 7 crayons. Leo gives her 5 more.' The numbers are 7 and 5. Giving more means add!",
        tip: "Clue words: 'altogether' and 'in all' mean add. 'Left' means take away.",
      },
      {
        heading: "Step 2: Draw It",
        body:
          "Draw circles for the things in the story. If things go away, cross them out!",
        example: "'Kai had 14 grapes and ate 6.' Draw 14 grapes. Cross out 6. Count what is left!",
        tip: "You do not need to draw well. Circles work great.",
      },
      {
        heading: "Step 3: Solve It and Check",
        body:
          "Pick your favorite method and solve. Then check by going backwards. A checked answer is a superpower answer!",
        example: "7 + 5 = 12. Check: 12 − 5 = 7. The story makes sense!",
        tip: "Adding and subtracting undo each other.",
      },
    ],
    vocab: [
      { word: "story problem", meaning: "A little story that hides a math question." },
      { word: "altogether", meaning: "A clue word — add everything up!" },
      { word: "clue word", meaning: "A word in the story that tells you what to do." },
    ],
    funFact:
      "Ancient Egyptians wrote story problems about bread over 3,000 years ago. Kids like you solved them!",
    strategyLab: [
      {
        problem: "Maya has 7 crayons. Leo gives her 5 more. How many crayons does Maya have now?",
        answer: "12",
        answerCheck:
          "Go backwards: 12 − 5 = 7. That is exactly what Maya started with!",
        methods: [
          {
            name: "Draw a Picture",
            emoji: "✏️",
            whenToUse: "Perfect for your first try at any story problem.",
            steps: [
              "Draw 7 circles for Maya's crayons.",
              "Draw 5 more circles for Leo's crayons.",
              "Count all the circles: 12!",
            ],
          },
          {
            name: "Count On",
            emoji: "👣",
            whenToUse: "Fast when one number is small.",
            steps: [
              "Hold 7 in your head.",
              "Count 5 more on your fingers: 8, 9, 10, 11, 12.",
              "Stop at the last finger: 12 crayons!",
            ],
          },
          {
            name: "Make Ten",
            emoji: "🎁",
            whenToUse: "Great when a number is close to 10.",
            steps: [
              "7 needs 3 more to make 10.",
              "Split the 5 into 3 and 2.",
              "7 + 3 = 10. Then 10 + 2 = 12!",
            ],
          },
        ],
      },
      {
        problem: "Kai had 14 grapes 🍇. He ate 6 of them. How many grapes are left?",
        answer: "8",
        answerCheck:
          "Check by adding back: 8 + 6 = 14. All the grapes are found!",
        methods: [
          {
            name: "Draw and Cross Out",
            emoji: "🍇",
            whenToUse: "Use it whenever things go away in the story.",
            steps: [
              "Draw 14 little circles.",
              "Cross out 6 for the grapes Kai ate.",
              "Count the grapes not crossed out: 8!",
            ],
          },
          {
            name: "Count Back",
            emoji: "⏪",
            whenToUse: "Quick when the small number is short.",
            steps: [
              "Start at 14.",
              "Count back 6: 13, 12, 11, 10, 9, 8.",
              "One count for each grape — 8 left!",
            ],
          },
          {
            name: "Think Addition",
            emoji: "🔄",
            whenToUse: "Super when you know your adding facts.",
            steps: [
              "Ask: 6 plus what makes 14?",
              "Try 8: 6 + 8 = 14. It works!",
              "So 14 − 6 = 8 grapes.",
            ],
          },
        ],
      },
    ],
    quiz: [
      {
        question: "Maya has 3 toys. Dev gives her 2 more. How many toys now?",
        options: ["4", "5", "6"],
        answerIndex: 1,
        explanation: "3 + 2 = 5. Count on from 3: 4, 5!",
      },
      {
        question: "Kai had 8 balloons. 3 flew away. How many are left?",
        options: ["11", "6", "5"],
        answerIndex: 2,
        explanation: "8 − 3 = 5. Count back: 7, 6, 5!",
      },
      {
        question: "Which clue word means ADD?",
        options: ["left", "altogether", "away"],
        answerIndex: 1,
        explanation: "'Altogether' means put it all together — add! 'Left' and 'away' mean subtract.",
      },
      {
        question: "Sofia saw 9 ducks. 4 swam off. How many ducks are left?",
        options: ["5", "13", "4"],
        answerIndex: 0,
        explanation: "9 − 4 = 5. Draw 9 ducks and cross out 4!",
      },
    ],
    worksheet: [
      {
        kind: "practice",
        prompt: "Maya has 6 stickers. Leo gives her 4 more. How many stickers now?",
        answer: "10",
        hint: "The clue word 'more' means add!",
      },
      {
        kind: "practice",
        prompt: "Kai had 9 grapes 🍇. He ate 4. How many grapes are left?",
        answer: "5",
      },
      {
        kind: "fill-blank",
        prompt: "'Altogether' is a clue word. It means you should ______.",
        answer: "add",
      },
      {
        kind: "match",
        prompt: "Match each clue word to what you should do!",
        left: ["altogether", "are left", "how many more"],
        right: ["take away", "add", "find the difference"],
        answer: [1, 0, 2],
      },
      {
        kind: "draw",
        prompt: "Draw 4 cats and 2 dogs. Count all your animals. How many did you draw?",
      },
    ],
  },
];
