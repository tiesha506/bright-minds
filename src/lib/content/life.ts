// ---------------------------------------------------------------------------
// BrightMinds — Life & World subject content
// 12 lessons (3 per age group), following src/lib/content/types.ts
// Site-wide rule: examples mix genders freely; no interest or career is
// ever tied to one gender (Maya the coder, Leo the nurse, Amara the
// electrician, Kai the dancer...).
// ---------------------------------------------------------------------------

import type { Subject } from "./types";

export const lifeSubject: Subject = {
  id: "life",
  name: "Life & World",
  emoji: "🌍",
  gradient: "from-violet-500 to-purple-600",
  taglines: {
    early: "Meet helpers, feel your feelings, and make music — your world is amazing!",
    primary: "Travel the globe, master your money, and invent like a pro.",
    intermediate: "Decode cultures, stay safe online, and set goals that actually happen.",
    teen: "Real life, real skills: budgets, careers, and leading with confidence.",
  },
  lessons: {
    // ------------------------------------------------------------------
    // EARLY (ages 6-8) — very short sentences, warm inclusive tone
    // ------------------------------------------------------------------
    early: [
      {
        id: "life-early-1",
        title: "Helpers in My Neighborhood",
        emoji: "🏘️",
        minutes: 6,
        intro:
          "Who keeps your neighborhood safe and happy? Let's meet the helpers all around you!",
        sections: [
          {
            heading: "Who Helps Us?",
            body: "Your neighborhood is full of helpers. Firefighters put out fires. Doctors help us feel better. Teachers help us learn and grow.",
            example:
              "When Leo broke his arm, Dr. Chen put a cast on it. Now it is all healed!",
            tip: "Say thank you to helpers. It makes their day.",
          },
          {
            heading: "So Many Helpers",
            body: "Mail carriers bring letters and packages. Farmers grow the food we eat. Bus drivers take us to school. Kai the nurse helps people get well.",
            example:
              "Amara the crossing guard helps kids cross the street safely every morning.",
            tip: "Many helpers wear special clothes or badges. Look for them!",
          },
          {
            heading: "You Can Help Too!",
            body: "Even kids can be helpers. Pick up litter with gloves on. Welcome new kids at school. Help set the table at home.",
            example: "Maya helped her neighbor carry groceries. They both smiled big.",
            tip: "Every kind act makes your community stronger.",
          },
        ],
        vocab: [
          { word: "helper", meaning: "Someone who makes things better for other people." },
          { word: "neighborhood", meaning: "The place where you live, near your home." },
          { word: "community", meaning: "All the people who live in one place together." },
        ],
        funFact:
          "A mail carrier can walk up to 10 miles in a single day delivering letters!",
        quiz: [
          {
            question: "Who puts out fires?",
            options: ["A firefighter", "A chef", "A painter"],
            answerIndex: 0,
            explanation:
              "Firefighters are trained to put out fires and keep us safe. Never hide from them — they are there to help!",
          },
          {
            question: "Who brings letters to your house?",
            options: ["An astronaut", "A mail carrier", "A dentist"],
            answerIndex: 1,
            explanation:
              "Mail carriers deliver letters and packages to homes almost every day, rain or shine.",
          },
          {
            question: "Who helps you when you feel sick?",
            options: ["A baker", "A pilot", "A doctor"],
            answerIndex: 2,
            explanation:
              "Doctors and nurses help us when we are sick or hurt so we can feel better.",
          },
          {
            question: "Who grows the food we eat?",
            options: ["A farmer", "A painter", "A swimmer"],
            answerIndex: 0,
            explanation:
              "Farmers grow fruits, vegetables, and grains that end up on our plates.",
          },
        ],
        worksheet: [
          {
            kind: "match",
            prompt: "Match each helper to their tool.",
            left: ["Firefighter", "Doctor", "Mail carrier"],
            right: ["Stethoscope", "Fire hose", "Letters and packages"],
            answer: [1, 0, 2],
          },
          {
            kind: "fill-blank",
            prompt: "A ______ grows food on a farm.",
            answer: "farmer",
            hint: "This person works with plants and animals.",
          },
          {
            kind: "draw",
            prompt: "Draw yourself helping in your community.",
          },
          {
            kind: "fill-blank",
            prompt: "A ______ drives a big red truck and sprays water on fires.",
            answer: "firefighter",
          },
          {
            kind: "short-answer",
            prompt: "Who is one helper you see in your neighborhood? What do they do?",
            sampleAnswer:
              "The crossing guard helps us cross the street safely every morning.",
          },
        ],
      },
      {
        id: "life-early-2",
        title: "Big Feelings, Great Friends",
        emoji: "💛",
        minutes: 6,
        intro:
          "Feelings are like weather inside us — sunny, stormy, everything in between. Let's learn about them and be great friends!",
        sections: [
          {
            heading: "Naming Your Feelings",
            body: "Feelings live inside you. Happy feels warm like sunshine. Sad feels like rainy days. Mad feels hot like fire. All feelings are okay to have.",
            example:
              "Leo's tower fell down. He said, 'I feel sad.' Then he built it again.",
            tip: "Saying your feeling out loud can help.",
          },
          {
            heading: "Calming Big Feelings",
            body: "Big feelings can feel too big. Take three slow, deep breaths. Count to five slowly. Ask a grown-up for a hug.",
            example:
              "Maya felt mad at her brother. She breathed in and out slowly. Then she felt calmer.",
            tip: "Deep breaths are like a pause button.",
          },
          {
            heading: "Being a Good Friend",
            body: "Good friends share and take turns. Good friends use kind words. Good friends listen when others talk. Good friends ask, 'Are you okay?'",
            example:
              "Kai saw Sam alone at recess. Kai asked Sam to play. Sam smiled big.",
            tip: "Treat friends how you want to be treated.",
          },
        ],
        vocab: [
          { word: "feeling", meaning: "How you are inside, like happy, sad, or mad." },
          { word: "kind", meaning: "Being nice and helpful to others." },
          { word: "calm", meaning: "Quiet and peaceful inside." },
        ],
        funFact:
          "Many Olympic athletes take slow, deep breaths before they compete to stay calm.",
        quiz: [
          {
            question: "What can you do when you feel mad?",
            options: ["Take deep breaths", "Yell louder", "Break toys"],
            answerIndex: 0,
            explanation:
              "Slow deep breaths calm your body down. Yelling or breaking things makes feelings bigger.",
          },
          {
            question: "How can you be a good friend?",
            options: ["Grab toys away", "Share and take turns", "Say mean words"],
            answerIndex: 1,
            explanation: "Sharing and taking turns shows friends that you care about them.",
          },
          {
            question: "Are all feelings okay to have?",
            options: ["No, only happy ones", "Yes, all feelings are okay", "Nobody has feelings"],
            answerIndex: 1,
            explanation:
              "Every feeling is a message from inside you. What matters is what we do with them.",
          },
          {
            question: "What could you say to a sad friend?",
            options: ["Nothing at all", "'Go away!'", "'Are you okay? I can help.'"],
            answerIndex: 2,
            explanation:
              "Kind words show a friend you care. Asking 'Are you okay?' is a great start.",
          },
        ],
        worksheet: [
          {
            kind: "match",
            prompt: "Match each feeling to how it might look.",
            left: ["Happy", "Sad", "Scared"],
            right: ["A big smile", "Tears when your balloon pops", "Hiding close at a new place"],
            answer: [0, 1, 2],
          },
          {
            kind: "fill-blank",
            prompt: "When I feel upset, I can take three slow, deep ______.",
            answer: "breaths",
            hint: "You do this all day long without thinking!",
          },
          {
            kind: "draw",
            prompt: "Draw you and a friend playing together.",
          },
          {
            kind: "fill-blank",
            prompt: "When a friend is talking, I ______ to them.",
            answer: "listen",
            hint: "Good friends do this with their ears.",
          },
          {
            kind: "short-answer",
            prompt: "Name one kind thing you can do for a friend.",
            sampleAnswer:
              "I can share my crayons when my friend forgets theirs.",
          },
        ],
      },
      {
        id: "life-early-3",
        title: "Colors, Music & Rhythm Fun",
        emoji: "🎵",
        minutes: 6,
        intro: "Clap, tap, and sing along! Colors and music make the whole world sing.",
        sections: [
          {
            heading: "A World of Colors",
            body: "Look around! Red is like apples. Blue is like the sky. Yellow is like the sun. You can mix colors to make brand new ones.",
            example: "Amara mixed blue paint and yellow paint. She made green!",
            tip: "Red plus yellow makes orange.",
          },
          {
            heading: "Clap the Rhythm",
            body: "Rhythm is a pattern of sounds. Clap, clap, tap! Clap, clap, tap! Try it fast. Now try it slow.",
            example: "Leo clapped a rhythm with his sister. Their dog barked along!",
            tip: "Patterns repeat. That is what makes a rhythm.",
          },
          {
            heading: "Music Everywhere",
            body: "People all over the world make music. Drums boom. Flutes toot. Guitars strum. Music can make you want to dance!",
            example:
              "Kai danced to a big drum at the park. Grandma hummed a soft song at home.",
            tip: "Sing a song you love today.",
          },
        ],
        vocab: [
          { word: "color", meaning: "What your eyes see, like red, blue, or yellow." },
          { word: "rhythm", meaning: "Sounds that repeat in a pattern, like clap, clap, tap." },
          { word: "music", meaning: "Sounds put together so you can sing, play, or dance." },
        ],
        funFact:
          "The biggest drum in the world is taller than a grown-up — you could almost stand inside it!",
        quiz: [
          {
            question: "Red paint plus yellow paint makes...",
            options: ["Green paint", "Orange paint", "No paint"],
            answerIndex: 1,
            explanation:
              "Red and yellow mix together to make orange. Mixing colors is like magic!",
          },
          {
            question: "What is rhythm?",
            options: ["A kind of fruit", "A pattern of sounds like clap, clap, tap", "A quiet place"],
            answerIndex: 1,
            explanation: "Rhythm means sounds that repeat in a pattern over and over.",
          },
          {
            question: "Which one makes music?",
            options: ["A drum", "A shoe", "A pillow"],
            answerIndex: 0,
            explanation: "Drums make music when you tap or hit them. Shoes and pillows do not!",
          },
          {
            question: "What color is the sky on a sunny day?",
            options: ["Pink polka dots", "Brown", "Blue"],
            answerIndex: 2,
            explanation:
              "On a sunny day the sky looks blue. At sunset it can turn orange and pink!",
          },
        ],
        worksheet: [
          {
            kind: "match",
            prompt: "Match each color to a thing.",
            left: ["Red", "Yellow", "Blue"],
            right: ["Banana", "Strawberry", "The sky"],
            answer: [1, 0, 2],
          },
          {
            kind: "fill-blank",
            prompt: "Blue paint + yellow paint makes ______.",
            answer: "green",
          },
          {
            kind: "draw",
            prompt: "Draw a rainbow or a drum you would love to play.",
          },
          {
            kind: "fill-blank",
            prompt: "Clap, clap, tap! This kind of repeating pattern is called ______.",
            answer: "rhythm",
            hint: "It starts with the letter R.",
          },
          {
            kind: "short-answer",
            prompt: "What song do you love to sing? Who sings it with you?",
            sampleAnswer:
              "I love to sing 'Twinkle, Twinkle' with my grandma in the car.",
          },
        ],
      },
    ],

    // ------------------------------------------------------------------
    // PRIMARY (ages 9-11) — friendly, richer sentences, concrete examples
    // ------------------------------------------------------------------
    primary: [
      {
        id: "life-primary-1",
        title: "Our Amazing World: Continents & Oceans",
        emoji: "🗺️",
        minutes: 10,
        intro:
          "Grab your imaginary passport! Today we tour seven continents and five oceans without leaving your chair.",
        sections: [
          {
            heading: "Seven Continents, One Planet",
            body: "Earth's land is split into seven huge pieces called continents: Asia, Africa, North America, South America, Antarctica, Europe, and Australia (often called Oceania). Asia is the biggest of them all. Antarctica is the coldest — ice covers almost all of it, and only scientists stay there for long stretches.",
            example:
              "Maya lives in North America and video-calls her cousin in Lagos, Africa — two continents, one conversation.",
            tip: "Sing a continents song or make up a memory trick for the seven names.",
          },
          {
            heading: "Five Oceans, One Big Blue",
            body: "There are five named oceans: the Pacific, Atlantic, Indian, Southern, and Arctic. The Pacific is the champion — it stretches between Asia and the Americas and covers about a third of Earth's surface. Really, all five connect into one giant World Ocean.",
            example:
              "Amara's aunt sailed a research ship across the Atlantic Ocean from Brazil to South Africa.",
            tip: "Every drop is connected — rivers run to oceans, oceans make rain.",
          },
          {
            heading: "Map Skills Starter Pack",
            body: "Maps are pictures with rules. The compass rose shows directions: north at the top, south at the bottom, east on the right, west on the left. Different colors stand for land and water, and a legend explains the symbols.",
            example:
              "On a world map, find the large landmass colored green that touches both the Pacific and Atlantic — that's North America.",
            tip: "Check the legend first, then explore the map.",
          },
        ],
        vocab: [
          { word: "continent", meaning: "One of the seven huge pieces of land on Earth." },
          { word: "ocean", meaning: "One of the five huge bodies of salt water on Earth." },
          { word: "compass rose", meaning: "The symbol on a map that shows north, south, east, and west." },
          { word: "equator", meaning: "An invisible line around the middle of Earth." },
        ],
        funFact: "Asia is so big that about 60% of all the people on Earth live there.",
        quiz: [
          {
            question: "How many continents are there on Earth?",
            options: ["5", "6", "7", "9"],
            answerIndex: 2,
            explanation:
              "Seven: Asia, Africa, North America, South America, Antarctica, Europe, and Australia (Oceania).",
          },
          {
            question: "Which is the largest ocean?",
            options: ["Atlantic", "Pacific", "Indian", "Arctic"],
            answerIndex: 1,
            explanation:
              "The Pacific is the biggest — it covers about a third of Earth's surface.",
          },
          {
            question: "Which continent is the coldest, covered in ice, where penguins live?",
            options: ["Africa", "Australia", "Antarctica", "Europe"],
            answerIndex: 2,
            explanation:
              "Antarctica sits over the South Pole. Penguins live there, but almost no people do!",
          },
          {
            question: "On most maps, which direction is at the top?",
            options: ["South", "East", "West", "North"],
            answerIndex: 3,
            explanation:
              "Most maps put north at the top, south at the bottom, east on the right, and west on the left.",
          },
        ],
        worksheet: [
          {
            kind: "fill-blank",
            prompt: "The largest ocean on Earth is the ______ Ocean.",
            answer: "Pacific",
          },
          {
            kind: "fill-blank",
            prompt: "There are ______ continents on Earth. (Write the number.)",
            answer: "7",
            hint: "Count them: Asia, Africa, North America, South America, Antarctica, Europe, Australia.",
          },
          {
            kind: "practice",
            prompt:
              "A map's compass rose shows north at the top. If you walk toward the bottom of the map, which direction are you going?",
            answer: "south",
            hint: "It's the opposite of north.",
          },
          {
            kind: "fill-blank",
            prompt: "The continent at the South Pole, covered in ice, is ______.",
            answer: "Antarctica",
          },
          {
            kind: "match",
            prompt: "Match each place to its clue.",
            left: ["Antarctica", "Pacific Ocean", "Africa"],
            right: ["The largest ocean", "The coldest continent", "Home to 54 countries"],
            answer: [1, 0, 2],
          },
          {
            kind: "short-answer",
            prompt: "Which continent would you most like to visit, and what would you want to see there?",
            sampleAnswer:
              "I want to visit Australia to see kangaroos and the Great Barrier Reef.",
          },
        ],
      },
      {
        id: "life-primary-2",
        title: "Money Basics: Earn, Save & Spend Wisely",
        emoji: "💰",
        minutes: 10,
        intro:
          "Ever wanted a new game, book, or bike? Learn how money works so your big goals can come true.",
        sections: [
          {
            heading: "Where Money Comes From: Earning",
            body: "Money doesn't appear by magic — people earn it by doing work. Grown-ups earn money at their jobs. Kids can earn a little too, with extra chores, a lemonade stand, or helping neighbors (with permission).",
            example:
              "Leo sold lemonade at 50 cents a cup. He sold 20 cups and earned $10 for his work.",
            tip: "Work first, money second — that's how earning goes.",
          },
          {
            heading: "Saving: The Superpower",
            body: "Saving means keeping money instead of spending it right away. Savers put part of their money in a jar or a savings account and let it grow toward a goal. It helps to know the difference between needs (like food and warm clothes) and wants (like candy and toys).",
            example:
              "Maya saves $2 every week. In 6 weeks she has $12 — enough for the book she wanted!",
            tip: "Save a little bit every time. Small amounts add up fast.",
          },
          {
            heading: "Spending Wisely",
            body: "Before you buy, ask three questions: Do I need it? Do I just want it? Will I still like it next week? Then compare prices — the same item can cost different amounts at different stores.",
            example:
              "Amara found the same markers at two stores: one for $6 and one for $4. Buying the $4 box saved her $2.",
            tip: "Try the 24-hour rule: wait a day before buying something you just want.",
          },
        ],
        vocab: [
          { word: "earn", meaning: "To get money by doing work or a job." },
          { word: "save", meaning: "To keep money instead of spending it, often for a goal." },
          { word: "spend", meaning: "To use money to buy things." },
          { word: "goal", meaning: "Something you want and make a plan for, like saving for a bike." },
        ],
        funFact: "Paper money was invented in China more than 1,000 years ago.",
        quiz: [
          {
            question: "Leo sells 20 cups of lemonade at 50 cents each. How much did he earn?",
            options: ["$10", "$5", "$20", "$1"],
            answerIndex: 0,
            explanation: "Each cup earns $0.50, so 20 cups earn 20 × $0.50 = $10.",
          },
          {
            question: "Maya saves $2 every week. How much does she have after 6 weeks?",
            options: ["$8", "$10", "$12", "$18"],
            answerIndex: 2,
            explanation: "$2 each week for 6 weeks: 2 × 6 = $12. Small, steady saving adds up!",
          },
          {
            question: "What does 'saving' mean?",
            options: [
              "Spending all your money fast",
              "Keeping money for later",
              "Borrowing money from friends",
              "Losing money",
            ],
            answerIndex: 1,
            explanation:
              "Saving means keeping your money instead of spending it right away, often for a goal.",
          },
          {
            question: "The same toy costs $9 at one store and $7 at another. Buying the cheaper one saves...",
            options: ["$1", "$2", "$3", "$9"],
            answerIndex: 1,
            explanation: "$9 − $7 = $2. Comparing prices is an easy way to keep more of your money.",
          },
        ],
        worksheet: [
          {
            kind: "fill-blank",
            prompt: "When you keep money instead of spending it, you ______ it.",
            answer: "save",
          },
          {
            kind: "practice",
            prompt: "Sam earns $3 a week doing chores. How much does he earn in 4 weeks? (Write the number.)",
            answer: "12",
            hint: "Multiply 3 × 4.",
          },
          {
            kind: "practice",
            prompt: "A comic book costs $8. Kai has saved $5 so far. How many more dollars does Kai need? (Write the number.)",
            answer: "3",
            hint: "Subtract 8 − 5.",
          },
          {
            kind: "fill-blank",
            prompt: "Food and a warm coat are ______, while candy and toys are wants.",
            answer: "needs",
            hint: "Starts with the letter N.",
          },
          {
            kind: "short-answer",
            prompt: "If you earned $10 this week, what would you save for? Why?",
            sampleAnswer:
              "I would save $5 toward art supplies and keep $5 for a school trip, because the trip means a lot to me.",
          },
          {
            kind: "short-answer",
            prompt: "Name one safe way a kid your age could earn money.",
            sampleAnswer:
              "Walking a neighbor's dog or helping wash the family car with permission.",
          },
        ],
      },
      {
        id: "life-primary-3",
        title: "Creative Problem Solving Like an Inventor",
        emoji: "💡",
        minutes: 10,
        intro:
          "Inventors see problems and dream up fixes — silly ideas welcome. Today, you become the inventor!",
        sections: [
          {
            heading: "Every Invention Solves a Problem",
            body: "Look around: umbrellas solve getting wet, backpacks solve carrying books, spoons solve eating soup. Every invention started because one person got bugged by a problem and asked, 'How could this be better?'",
            example:
              "Amara's pencils kept rolling off her desk. She taped on a paper ledge — problem solved!",
            tip: "When something bugs you, write it down. That's an idea seed.",
          },
          {
            heading: "The Inventor Steps",
            body: "Inventors follow a loop: 1) Find a problem. 2) Imagine lots of ideas — even silly ones. 3) Build a rough model called a prototype. 4) Test it and make it better. Then test again!",
            example:
              "Kai built a cardboard phone stand. It wobbled, so a wider base fixed it. Version 3 was the winner.",
            tip: "Silly ideas often grow into great ideas.",
          },
          {
            heading: "Team Brainstorms",
            body: "Inventors rarely work alone. In a brainstorm, every idea counts and nobody teases. Build on each other's thoughts with the magic words: 'Yes, and…' Two minds can fix what one mind missed.",
            example:
              "Maya kept forgetting her library books. Her friend suggested a door hanger checklist — and they built it together.",
            tip: "Say 'Yes, and…' instead of 'No, but…'",
          },
        ],
        vocab: [
          { word: "invention", meaning: "A new thing someone made to solve a problem." },
          { word: "brainstorm", meaning: "Thinking up many ideas without judging them." },
          { word: "prototype", meaning: "A first, rough try at building your idea." },
          { word: "improve", meaning: "To make something better." },
        ],
        funFact:
          "The idea for Velcro came when inventor George de Mestral studied burrs stuck to his dog's fur.",
        quiz: [
          {
            question: "What is the FIRST step to invent something?",
            options: ["Buy it in a store", "Find a problem to solve", "Hide your idea", "Copy a friend"],
            answerIndex: 1,
            explanation:
              "Inventions start with a problem someone wants to solve. Then comes imagining and testing ideas.",
          },
          {
            question: "A rough first model you build to test your idea is called a...",
            options: ["prototype", "pancake", "penguin", "passport"],
            answerIndex: 0,
            explanation: "A prototype is a rough first version you build so you can test and improve it.",
          },
          {
            question: "During a brainstorm, which move is best?",
            options: [
              "Laugh at silly ideas",
              "Pick only your own idea",
              "Say 'Yes, and…' to build on ideas",
              "Stay quiet the whole time",
            ],
            answerIndex: 2,
            explanation:
              "Good brainstorms build on each other's ideas instead of judging them too fast.",
          },
          {
            question: "Kai's phone stand wobbled. What should Kai do?",
            options: ["Throw it away and quit", "Test and improve it", "Pretend it works", "Blame the phone"],
            answerIndex: 1,
            explanation:
              "Inventors expect early versions to flop. Testing and improving is how ideas get good.",
          },
        ],
        worksheet: [
          {
            kind: "fill-blank",
            prompt: "A first, rough try at building your idea is called a ______.",
            answer: "prototype",
            hint: "It starts with the letter P.",
          },
          {
            kind: "fill-blank",
            prompt: "In a brainstorm, we think of ______ ideas, even silly ones.",
            answer: "many",
          },
          {
            kind: "practice",
            prompt:
              "Maya's invention took 3 tries: version 1 wobbled, version 2 was too small, and version 3 worked. How many tries came BEFORE the working one? (Write the number.)",
            answer: "2",
            hint: "Count the versions before version 3.",
          },
          {
            kind: "practice",
            prompt: "Leo tests 4 paper airplane designs, and each test takes 2 minutes. How many minutes in total? (Write the number.)",
            answer: "8",
            hint: "Multiply 4 × 2.",
          },
          {
            kind: "short-answer",
            prompt: "Name one small problem in your day. What invention could help solve it?",
            sampleAnswer:
              "My shoes get untied, so I would invent a magnetic clasp that keeps them shut.",
          },
          {
            kind: "short-answer",
            prompt: "Why is it smart to test an invention more than once?",
            sampleAnswer:
              "Because the first try often has problems, and each test shows you how to make it better.",
          },
        ],
      },
    ],

    // ------------------------------------------------------------------
    // INTERMEDIATE (ages 12-13) — clear, semi-formal, real-world examples
    // ------------------------------------------------------------------
    intermediate: [
      {
        id: "life-intermediate-1",
        title: "World Cultures & Map Skills",
        emoji: "🌐",
        minutes: 12,
        intro:
          "From Tokyo's packed trains to markets in Nairobi, culture shapes how people live — and maps help you navigate it all.",
        sections: [
          {
            heading: "Culture: More Than a Passport Stamp",
            body: "Culture is the invisible operating system a community shares: its language, food, celebrations, humor, and values. More than 7,000 languages are spoken worldwide, each attached to traditions — Diwali lamps in India, dumpling-making at Lunar New Year, marigold altars for Día de los Muertos in Mexico. Curiosity and respect are the traveler's basic tools: ask questions, and never assume your way is the default.",
            example:
              "When Maya's class hosted exchange students from Nairobi and Seoul, they swapped greetings, snacks, and playlists — and discovered both families shared one rule: never show up empty-handed.",
            tip: "Ask 'What does this mean to you?' instead of deciding what it means.",
          },
          {
            heading: "Reading Maps Like a Professional",
            body: "Maps are data made visible. The equator divides Earth into the Northern and Southern Hemispheres. Latitude lines measure distance north or south of the equator; longitude lines measure distance east or west of the prime meridian. A map's scale shows real-world distances, the legend (or key) explains the symbols, and the compass rose orients you. Reading those elements first is the difference between navigating and guessing.",
            example:
              "Tokyo sits at roughly 35°N — about the same latitude as Athens and Los Angeles, which is why they share similar winter daylight.",
            tip: "Check the legend before anything else; symbols vary between maps.",
          },
          {
            heading: "One Connected World",
            body: "Cultures don't sit still — they trade, migrate, blend, and remix online. A single T-shirt might be designed in one country, sewn in a second, and sold in a third. You'll hear Korean pop built on reggae rhythms and eat Peruvian-Japanese fusion in São Paulo. Global citizenship means understanding these connections — and your place in them.",
            example:
              "Trace almost any product you own — sneakers, a phone, chocolate — and you'll find parts from five or more countries.",
            tip: "Learn to say 'hello' and 'thank you' in three languages. Small effort, big doors.",
          },
        ],
        vocab: [
          { word: "culture", meaning: "The language, food, traditions, and values a group of people shares." },
          { word: "hemisphere", meaning: "Half of Earth — divided north/south by the equator or east/west by the prime meridian." },
          { word: "latitude", meaning: "Imaginary east–west lines measuring distance north or south of the equator." },
          { word: "longitude", meaning: "Imaginary north–south lines measuring distance east or west of the prime meridian." },
          { word: "tradition", meaning: "A custom passed down through generations, like a holiday, meal, or dance." },
        ],
        funFact:
          "Papua New Guinea has over 800 languages — more than any other country in the world.",
        quiz: [
          {
            question: "The equator divides Earth into which two hemispheres?",
            options: ["East and West", "Northern and Southern", "Land and Water", "Polar and Equatorial"],
            answerIndex: 1,
            explanation:
              "The equator is the line around Earth's middle, splitting the planet into Northern and Southern Hemispheres.",
          },
          {
            question: "Which lines measure distance north or south of the equator?",
            options: ["Longitude", "Latitude", "Time zones", "Borders"],
            answerIndex: 1,
            explanation:
              "Latitude lines run east–west and measure how far north or south you are from the equator.",
          },
          {
            question: "About how many languages are spoken in the world today?",
            options: ["About 70", "About 700", "About 7,000", "About 70,000"],
            answerIndex: 2,
            explanation:
              "Linguists estimate around 7,000 languages, though many now have very few speakers left.",
          },
          {
            question: "A map's legend (or key) tells you...",
            options: [
              "The weather forecast",
              "What the map's symbols mean",
              "Where to buy maps",
              "The map's price",
            ],
            answerIndex: 1,
            explanation:
              "The legend decodes the symbols so you know what roads, rivers, and borders actually mean.",
          },
          {
            question:
              "A T-shirt designed in one country, sewn in a second, and sold in a third is an example of...",
            options: [
              "Global connections through trade",
              "Proof that maps are wrong",
              "Countries refusing to trade",
              "Nothing important",
            ],
            answerIndex: 0,
            explanation:
              "Products often pass through many countries before reaching you — that's global trade connecting cultures.",
          },
        ],
        worksheet: [
          {
            kind: "fill-blank",
            prompt: "The equator divides Earth into the Northern and Southern ______.",
            answer: "hemispheres",
          },
          {
            kind: "fill-blank",
            prompt: "Lines that run east–west and measure distance from the equator are lines of ______.",
            answer: "latitude",
          },
          {
            kind: "fill-blank",
            prompt: "The map's ______ (or key) explains what its symbols mean.",
            answer: "legend",
            hint: "It begins with 'le'.",
          },
          {
            kind: "fill-blank",
            prompt: "Lines running from pole to pole that measure distance east or west are lines of ______.",
            answer: "longitude",
          },
          {
            kind: "short-answer",
            prompt: "Name one celebration from another culture that interests you. What is one thing you learned about it?",
            sampleAnswer:
              "Diwali is the festival of lights in India, where people light lamps and share sweets.",
          },
          {
            kind: "short-answer",
            prompt: "Why is it valuable to learn about cultures different from your own?",
            sampleAnswer:
              "It helps you understand people better, avoid stereotypes, and work well with others in a connected world.",
          },
        ],
      },
      {
        id: "life-intermediate-2",
        title: "Digital Citizenship & Online Safety",
        emoji: "🔐",
        minutes: 12,
        intro:
          "You live part of your life online. Learn to keep that part safe, kind, and smart.",
        sections: [
          {
            heading: "Your Digital Footprint Is Permanent(ish)",
            body: "Everything you post, like, and share adds to a record called your digital footprint. Screenshots make 'deleted' a soft word — anything sent can be saved and resurfaced years later by future schools, employers, or strangers. That's not a reason to never post; it's a reason to post with intention.",
            example:
              "A harsh comment posted at 12 can be the first thing a recruiter finds at 25. The flip side is also true: thoughtful projects and kind interactions build a footprint worth finding.",
            tip: "Before posting, ask: would I be fine showing this to my grandmother and a future boss?",
          },
          {
            heading: "Locks, Keys & Phishing Hooks",
            body: "Strong passwords are long, unique per account, and mix characters — or better, use a passphrase plus two-factor authentication. Never share or reuse them. Privacy settings decide who sees your location, school, and photos, so audit them regularly. Then there's phishing: messages engineered to make you panic-click. Urgent warnings, too-good-to-be-true prizes, and strange links are classic red flags.",
            example:
              "'You WON a phone! Verify your info in 1 hour!' is textbook phishing — real organizations don't demand your details under a countdown.",
            tip: "When a message rushes you, that's the tell. Slow down, verify, and check with an adult.",
          },
          {
            heading: "Kindness, Courage & Balance",
            body: "Cyberbullying spreads fast because screens create distance — but distance also means you can be the upstander who breaks the chain: don't pile on, save evidence, report it, and support the target privately. Screens deserve balance too: notifications off during homework and sleep, and protected time for real-world friends and movement.",
            example:
              "Leo watched a group chat turn on a classmate over an embarrassing photo. He didn't laugh, messaged the classmate privately, showed his mom the thread, and reported it to the school counselor.",
            tip: "Being an upstander takes one message. Being a bystander costs someone a lot.",
          },
        ],
        vocab: [
          { word: "digital footprint", meaning: "The lasting trail of data, posts, and activity you leave online." },
          { word: "phishing", meaning: "Fake messages designed to trick you into clicking bad links or handing over personal info." },
          { word: "privacy", meaning: "Control over who can see your information and how it's used." },
          { word: "cyberbullying", meaning: "Using messages, posts, or comments to repeatedly hurt or embarrass someone." },
          { word: "upstander", meaning: "A person who safely supports the target and reports bullying instead of just watching." },
        ],
        funFact:
          "More than half of all humans — over 4 billion people — now use social media.",
        quiz: [
          {
            question: "Which password is strongest?",
            options: ["maya2013", "password123", "Blue#Tiger$42run", "12345678"],
            answerIndex: 2,
            explanation:
              "Long, mixed-up passphrases are hard to guess; names, years, and number patterns are cracked in seconds.",
          },
          {
            question: "A message says: 'URGENT! Your account closes in 1 hour — click this link!' What is this most likely?",
            options: ["A real alert", "Phishing", "A software update", "A friend's joke"],
            answerIndex: 1,
            explanation:
              "Urgency is a classic phishing trick — attackers want you to panic-click before you think.",
          },
          {
            question: "Your digital footprint is...",
            options: [
              "Shoes you buy online",
              "The trail of data you leave online",
              "A device for walking",
              "A privacy setting",
            ],
            answerIndex: 1,
            explanation:
              "Your digital footprint is the data trail of everything you post, like, and share online.",
          },
          {
            question: "You see classmates mocking someone in a group chat. The best response is to...",
            options: [
              "Join in so you fit in",
              "Ignore it and say nothing",
              "Not participate, keep evidence, and report it to a trusted adult",
              "Share it to more chats",
            ],
            answerIndex: 2,
            explanation:
              "Joining in fuels the bullying. Stepping out, keeping evidence, and reporting protects everyone.",
          },
          {
            question: "Which of these is safest to post publicly?",
            options: [
              "Your home address",
              "Your live location every hour",
              "A photo of your finished art project",
              "Your school schedule",
            ],
            answerIndex: 2,
            explanation:
              "Your artwork reveals nothing that puts you at risk, unlike addresses, live locations, or schedules.",
          },
        ],
        worksheet: [
          {
            kind: "fill-blank",
            prompt: "The trail of data and posts you leave online is called your digital ______.",
            answer: "footprint",
          },
          {
            kind: "fill-blank",
            prompt:
              "Fake messages that try to trick you into clicking bad links or sharing personal info are called ______.",
            answer: "phishing",
          },
          {
            kind: "fill-blank",
            prompt: "A strong password should be long, unique, and never ______ with anyone.",
            answer: "shared",
          },
          {
            kind: "short-answer",
            prompt: "List two red flags that suggest a message might be phishing.",
            sampleAnswer:
              "Urgent threats or countdowns, and strange links or requests for personal information.",
          },
          {
            kind: "short-answer",
            prompt: "What would you do if a friend was being cyberbullied? Give two actions.",
            sampleAnswer:
              "I would not join in, save evidence, report it to a trusted adult, and support my friend privately.",
          },
          {
            kind: "short-answer",
            prompt: "Why can something you post at age 12 still matter when you are 25?",
            sampleAnswer:
              "Posts can stay online for years, and future schools or employers might find them.",
          },
        ],
      },
      {
        id: "life-intermediate-3",
        title: "Goal Setting & Study Skills",
        emoji: "🎯",
        minutes: 12,
        intro:
          "Big dreams need a plan. Learn how to set goals you can actually hit — and study smarter, not longer.",
        sections: [
          {
            heading: "Goals You Can Actually Hit",
            body: "Vague goals quietly fail: 'do better in math' has no finish line. Strong goals are specific and measurable — they say exactly what 'done' looks like and by when. Then shrink the mountain: break the goal into weekly steps you can put on a schedule. A goal you can't put on a calendar is a wish.",
            example:
              "Instead of 'get better at Spanish,' Maya chose: 'Learn 10 words a day, five days a week, and self-quiz every Friday for three weeks.' Every day had a clear job.",
            tip: "Write the goal where you'll see it daily. Out of sight, out of plan.",
          },
          {
            heading: "Study Smarter, Not Longer",
            body: "Research is blunt about what works: quizzing yourself (retrieval practice) and spacing study across several days beat rereading and highlighting every time. Add a focus rhythm — 25 minutes of work, 5-minute break — and remove your phone from the room, not just your desk. Teaching a concept to someone else is the final test of understanding.",
            example:
              "Leo studied 20 minutes a night for a week and outperformed his old 2-hour cram, because sleep between sessions let his brain file everything away.",
            tip: "Closed book, blank page: write what you remember, then check your gaps.",
          },
          {
            heading: "Track, Reflect, Adjust",
            body: "Goals drift without a check-in. Once a week, review: What moved forward? What got stuck? Why? If you missed a target, treat it as data, not failure — find the cause (a distraction, an overpacked week) and adjust the plan, not the dream. This loop is the growth mindset in action: abilities grow with effort, strategy, and honest feedback.",
            example:
              "Amara missed her reading goal one week, noticed her phone was eating her evenings, moved it to another room, and hit the goal the next week.",
            tip: "Missed it? Change the method, not the mission.",
          },
        ],
        vocab: [
          { word: "goal", meaning: "A specific result you plan and work toward." },
          { word: "measurable", meaning: "Able to be counted or checked, so you know when you've succeeded." },
          { word: "retrieval practice", meaning: "Studying by pulling information out of your memory (self-quizzing) instead of rereading." },
          { word: "distraction", meaning: "Anything that pulls your attention away from the task you're doing." },
          { word: "growth mindset", meaning: "The belief that abilities grow with effort, strategy, and feedback." },
        ],
        funFact:
          "In one study by psychologist Dr. Gail Matthews, people who wrote down their goals were significantly more likely to achieve them than people who only thought about them.",
        quiz: [
          {
            question: "Which is the most specific goal?",
            options: ["Be awesome at science", "Do better in science", "Score 90% or higher on next Friday's science quiz", "Try hard in school"],
            answerIndex: 2,
            explanation:
              "'90% or higher on Friday's quiz' names exactly what success looks like and when it happens.",
          },
          {
            question: "Which study method does research support as most effective?",
            options: [
              "Rereading notes once, the night before",
              "Highlighting everything in the book",
              "Self-quizzing across several short sessions",
              "Studying with the TV on",
            ],
            answerIndex: 2,
            explanation:
              "Retrieval practice — quizzing yourself over spaced sessions — beats rereading and highlighting in study after study.",
          },
          {
            question: "A 'distraction' is...",
            options: [
              "A study break that helps you focus",
              "Anything that pulls your attention away from the task",
              "A type of planner",
              "A kind of goal",
            ],
            answerIndex: 1,
            explanation: "A distraction is anything that pulls your attention away from what you meant to do.",
          },
          {
            question: "You miss a weekly goal. The best next step is to...",
            options: [
              "Give up on the goal",
              "Blame your teacher",
              "Figure out what went wrong and adjust your plan",
              "Pretend you hit it",
            ],
            answerIndex: 2,
            explanation:
              "Missing a goal is data, not defeat. Find the cause, adjust the plan, and try again.",
          },
          {
            question: "The '25 minutes focused, 5 minutes break' pattern is mainly designed to...",
            options: [
              "Make studying feel endless",
              "Keep focus strong while avoiding burnout",
              "Test your patience",
              "Replace sleep",
            ],
            answerIndex: 1,
            explanation:
              "Short focused bursts with real breaks keep your brain fresh so you can sustain attention.",
          },
        ],
        worksheet: [
          {
            kind: "fill-blank",
            prompt: "Good goals should be specific and ______, so you can tell when you've hit them.",
            answer: "measurable",
          },
          {
            kind: "fill-blank",
            prompt: "Quizzing yourself instead of rereading is called ______ practice.",
            answer: "retrieval",
            hint: "It means pulling information out of your memory.",
          },
          {
            kind: "fill-blank",
            prompt: "Studying a little each day spread over time is called ______ practice (the opposite of cramming).",
            answer: "spaced",
          },
          {
            kind: "short-answer",
            prompt: "Turn this vague goal into a specific one: 'Get better at basketball.'",
            sampleAnswer:
              "Practice free throws for 15 minutes every day after school for two weeks, tracking how many I make.",
          },
          {
            kind: "short-answer",
            prompt: "Name your biggest study distraction and one way you will handle it this week.",
            sampleAnswer:
              "My phone — I will leave it in another room and use a 25-minute focus timer.",
          },
          {
            kind: "short-answer",
            prompt: "Describe one small habit that could help you reach a bigger goal.",
            sampleAnswer:
              "Packing my backpack the night before so I never forget homework.",
          },
        ],
      },
    ],

    // ------------------------------------------------------------------
    // TEEN (ages 14-15) — mature, practical, honest about the real world
    // ------------------------------------------------------------------
    teen: [
      {
        id: "life-teen-1",
        title: "Personal Finance: Budgeting, Saving & Credit",
        emoji: "💳",
        minutes: 18,
        intro:
          "Your first paycheck is closer than you think. Master budgeting, saving, and how credit really works — before the real world tests you.",
        sections: [
          {
            heading: "Budgeting: The 50/30/20 Rule",
            body: "A budget is a plan, not a punishment. Take whatever money comes in and split it: about 50% for needs, 30% for wants, and 20% for savings and debt repayment. The exact numbers flex with your situation, but the habit — deciding where money goes before it disappears — is what builds long-term wealth.",
            example:
              "You earn $200 a month from a weekend job. That's roughly $100 for needs like transit and groceries, $60 for wants, and $40 straight to savings — that's 'paying yourself first.'",
            tip: "Move savings out on payday, before spending starts.",
          },
          {
            heading: "Saving & the Power of Compounding",
            body: "An emergency fund — cash set aside for surprise costs — is step one; even one month of expenses changes how safe you feel. After that, invested money can grow through compounding: your returns start earning their own returns. A classic shortcut, the Rule of 72, says that at roughly 7% average annual growth, money doubles about every 10 years — which is why starting early beats starting big.",
            example:
              "Two people save the same total, but the one who starts at 15 instead of 25 can end up with dramatically more by 45, because every dollar had ten extra years to compound.",
            tip: "Time in the market matters more than timing it.",
          },
          {
            heading: "Credit: A Tool, Not Free Money",
            body: "A credit score (roughly 300–850) tells lenders how reliably you repay. Pay every bill on time and keep balances low — a strong score later means cheaper car loans, easier apartment rentals, and sometimes even better job offers. Carried balances are the trap: credit cards often charge interest at 20%+ APR, so unpaid amounts grow fast. The rule: only charge what you can pay off in full.",
            example:
              "Leaving a $1,000 balance on a card with a 20%+ APR can cost a couple hundred dollars in interest over a year. Paying in full every month costs $0 — and still builds your history.",
            tip: "A credit card is a convenience tool, not extra income.",
          },
        ],
        vocab: [
          { word: "budget", meaning: "A plan for your money — what comes in, what goes out, and what gets saved." },
          { word: "interest", meaning: "The cost of borrowing money, or the reward a bank pays you for saving it." },
          { word: "credit score", meaning: "A number (roughly 300–850) that rates how reliably you repay borrowed money." },
          { word: "compound growth", meaning: "When your earnings start generating earnings of their own, so money grows faster over time." },
          { word: "emergency fund", meaning: "Cash set aside for surprise costs, like a cracked phone screen or a car repair." },
          { word: "APR", meaning: "Annual percentage rate — the yearly cost of borrowing, shown as a percentage." },
        ],
        funFact:
          "The 50/30/20 rule was popularized by U.S. Senator Elizabeth Warren in her book 'All Your Worth.'",
        quiz: [
          {
            question: "You earn $400/month. Under the 50/30/20 rule, how much should go to savings and debt repayment?",
            options: ["$20", "$80", "$120", "$200"],
            answerIndex: 1,
            explanation: "The rule puts 20% toward savings and debt: 0.20 × $400 = $80.",
          },
          {
            question: "Which choice best builds a strong credit history over time?",
            options: [
              "Maxing out cards and paying the minimum",
              "Never using any credit at all",
              "Using a small amount and paying the full balance on time, every month",
              "Opening five new credit cards in one year",
            ],
            answerIndex: 2,
            explanation:
              "Small, consistent use plus on-time full payments is the safest way to build a solid credit record.",
          },
          {
            question: "Why does starting to save early matter so much?",
            options: [
              "Early savers get better interest rates",
              "Earnings compound — early money has more time to grow",
              "Banks reward customer loyalty only",
              "It doesn't; only the amount matters",
            ],
            answerIndex: 1,
            explanation:
              "Thanks to compounding, money saved earlier has more years to grow — time matters more than the starting amount.",
          },
          {
            question: "Your phone breaks unexpectedly. Which fund exists exactly for this situation?",
            options: ["Vacation fund", "Wants budget", "Emergency fund", "Credit limit"],
            answerIndex: 2,
            explanation:
              "An emergency fund is cash set aside for surprise costs so you don't need debt to cover them.",
          },
          {
            question: "A card charges ~20% APR and you carry a balance instead of paying in full. What happens?",
            options: [
              "Nothing — APR only matters at signup",
              "You pay interest on the remaining balance, and it adds up fast",
              "The debt disappears after 30 days",
              "Your credit score automatically improves",
            ],
            answerIndex: 1,
            explanation:
              "Carrying a balance means interest charges pile up on whatever remains — that's how card debt snowballs.",
          },
        ],
        worksheet: [
          {
            kind: "fill-blank",
            prompt: "Under the 50/30/20 rule, ______% of income goes to savings and debt repayment. (Write the number.)",
            answer: "20",
          },
          {
            kind: "fill-blank",
            prompt: "Your ______ score (roughly 300–850) rates how reliably you repay borrowed money.",
            answer: "credit",
          },
          {
            kind: "practice",
            prompt: "You earn $300/month. Using the 50/30/20 rule, how many dollars go to wants? (Write the number.)",
            answer: "90",
            hint: "30% of 300.",
          },
          {
            kind: "practice",
            prompt: "You save $50/month. How much will you have saved in one year, before any interest? (Write the number.)",
            answer: "600",
            hint: "50 × 12.",
          },
          {
            kind: "short-answer",
            prompt:
              "You get $500/month. Draft a quick 50/30/20 budget: give the dollar amounts for needs, wants, and savings, and name one item in each bucket.",
            sampleAnswer:
              "$250 needs (transport, groceries), $150 wants (streaming, eating out), $100 savings (emergency fund).",
          },
          {
            kind: "short-answer",
            prompt: "Why can paying a credit card in full each month beat paying only the minimum?",
            sampleAnswer:
              "Paying in full avoids interest charges, which compound and can cost hundreds a year, while still building your credit history.",
          },
        ],
      },
      {
        id: "life-teen-2",
        title: "Careers of the Future & Your Strengths",
        emoji: "🚀",
        minutes: 18,
        intro:
          "Half the jobs you'll hold may not exist yet. Learn where the world is heading — and which of your strengths will carry you there.",
        sections: [
          {
            heading: "Where Work Is Heading",
            body: "A lot of tomorrow's hiring will happen in health care, renewable energy, cybersecurity, data and AI, and skilled trades like electrical work and welding. Automation keeps reshaping jobs: routine, repetitive tasks get handed to machines, while distinctly human skills — judgment, creativity, empathy, hands-on repair — grow more valuable. No career belongs to one gender, and no single job is 'future-proof,' but adaptable people with real skills stay in demand.",
            example:
              "Maya the software engineer, Leo the pediatric nurse, Amara the electrician, and Kai the interaction designer all work in growing fields — and any of those paths is open to anyone.",
            tip: "Follow problems you find interesting; industries always reward problem-solvers.",
          },
          {
            heading: "Know Your Strengths",
            body: "A strength isn't just what you're good at — it's what you're good at AND what energizes you. Clues: When do you lose track of time? What do friends ask for your help with? What feels easy to you but hard to others? Strengths aren't fixed labels; they grow with deliberate practice. Knowing yours helps you pick classes, clubs, and first jobs that actually fit.",
            example:
              "Kai noticed they lit up while explaining code to teammates — a sign of teaching and communication strengths, not just technical skill.",
            tip: "Ask two people what they'd come to you for. Their answers reveal strengths you can't see.",
          },
          {
            heading: "Paths & Experiments",
            body: "There are many routes into good careers: apprenticeships, certificates, community college, university, military training, or starting something yourself. Test interests cheaply before committing years — shadow someone for a day, take a free online course, join a club, volunteer, or build a small project. Collect what you make into a simple portfolio; proof beats promises.",
            example:
              "Amara was curious about nursing. She shadowed a nurse practitioner for a day, loved the pace, and signed up for a CPR certification course that same month.",
            tip: "A one-day shadow costs nothing and can save you years.",
          },
        ],
        vocab: [
          { word: "automation", meaning: "When machines or software take over tasks, especially routine ones." },
          { word: "apprenticeship", meaning: "Paid, on-the-job training in a skilled trade under experienced workers." },
          { word: "transferable skill", meaning: "A skill valuable across many jobs, like communication, problem-solving, or teamwork." },
          { word: "portfolio", meaning: "A collection of projects and work that proves what you can do." },
          { word: "networking", meaning: "Building genuine professional relationships that share knowledge and open doors." },
          { word: "mentor", meaning: "An experienced person who guides and encourages your growth." },
        ],
        funFact:
          "The U.S. Bureau of Labor Statistics projects that health care and renewable energy will add some of the most jobs through the early 2030s.",
        quiz: [
          {
            question: "Which skill set becomes MORE valuable as routine tasks get automated?",
            options: [
              "Memorizing facts quickly",
              "Doing the same task faster than a machine",
              "Creative problem-solving and empathy",
              "Hand-copying data into spreadsheets",
            ],
            answerIndex: 2,
            explanation:
              "Machines are great at routine tasks but weak at judgment, creativity, and empathy — those stay human strengths.",
          },
          {
            question: "A 17-year-old wants to become a licensed electrician. The most direct path is usually...",
            options: [
              "A paid apprenticeship through a trade program",
              "A PhD in literature",
              "Waiting until age 30 to decide",
              "Watching random videos for ten years",
            ],
            answerIndex: 0,
            explanation:
              "Apprenticeships pay you while you learn a skilled trade from experts on the job.",
          },
          {
            question: "What's the smartest way to 'test drive' a career interest cheaply?",
            options: [
              "Buy expensive equipment immediately",
              "Shadow a professional for a day or take a short online course",
              "Enroll in the longest program available",
              "Just assume you'll love it",
            ],
            answerIndex: 1,
            explanation:
              "Shadowing or a short course costs little and quickly tells you whether a path genuinely interests you.",
          },
          {
            question: "Your strengths are usually found at the overlap of...",
            options: [
              "What you're good at and what energizes you",
              "What pays the most and what is easiest",
              "What your friends do and what's trendy",
              "What sounds impressive on social media",
            ],
            answerIndex: 0,
            explanation:
              "Sustainable motivation lives where your abilities meet genuine energy for the work.",
          },
          {
            question: "Why do transferable skills matter for the future?",
            options: [
              "They only work in one specific job",
              "They let you adapt when industries and tools change",
              "They're only useful for managers",
              "They replace the need for any practice",
            ],
            answerIndex: 1,
            explanation:
              "Industries and tools change fast; transferable skills like communication and problem-solving move with you from job to job.",
          },
        ],
        worksheet: [
          {
            kind: "fill-blank",
            prompt: "Paid, on-the-job training for a skilled trade is called an ______.",
            answer: "apprenticeship",
          },
          {
            kind: "fill-blank",
            prompt:
              "Skills like communication and problem-solving that work in many different jobs are called ______ skills.",
            answer: "transferable",
          },
          {
            kind: "practice",
            prompt:
              "Kai's skills portfolio has 6 items and grows by 2 items each month. How many items after 4 months? (Write the number.)",
            answer: "14",
            hint: "6 + (2 × 4).",
          },
          {
            kind: "practice",
            prompt: "A robotics club has 12 members and forms teams of 3. How many full teams can it form? (Write the number.)",
            answer: "4",
            hint: "Divide 12 by 3.",
          },
          {
            kind: "short-answer",
            prompt: "When do you lose track of time? What does that suggest about your strengths?",
            sampleAnswer:
              "When I edit videos — it suggests I have creative and technical strengths that fit media production.",
          },
          {
            kind: "short-answer",
            prompt: "Name one career that interests you and one low-cost way you could test it this year.",
            sampleAnswer:
              "Marine biology — I could volunteer at an aquarium or take a free oceanography course online.",
          },
        ],
      },
      {
        id: "life-teen-3",
        title: "Leadership, Well-Being & Stress Management",
        emoji: "🧘",
        minutes: 18,
        intro:
          "Leadership isn't a title — it's how you handle pressure, people, and yourself. Build habits that keep you steady when life speeds up.",
        sections: [
          {
            heading: "What Stress Actually Is",
            body: "Stress is your body's built-in alarm: heart rate rises, senses sharpen, muscles tense. In short bursts it can actually help — a little nervous energy before a game or presentation sharpens focus. But when stress never switches off, it wrecks sleep, mood, memory, and health. Learn your early signals: tight shoulders, a short temper, doomscrolling at 1 a.m.",
            example:
              "Before her recital, Kai's hands shook. Two minutes of slow breathing slowed her heart rate, and she played cleanly.",
            tip: "Name the signal early — stress is easier to manage at a 3 than at a 9.",
          },
          {
            heading: "Reset Tools That Actually Work",
            body: "These aren't vibes, they're physiology. Box breathing (inhale 4 counts, hold 4, exhale 4, hold 4) calms your nervous system — athletes and first responders use it. The 5-4-3-2-1 grounding technique interrupts spiraling thoughts: name 5 things you see, 4 you can touch, 3 you hear, 2 you smell, 1 you taste. Add the big three: 8–10 hours of sleep, regular movement, and talking to someone you trust. Late-night screens sabotage all of it.",
            example:
              "Leo felt panic rising before an exam. He ran 5-4-3-2-1 in his head, then started with the easiest question to build momentum.",
            tip: "Pick ONE technique and drill it while calm, so it works when you're not.",
          },
          {
            heading: "Leadership: Influence, Not Titles",
            body: "You don't need a badge to lead — leadership is how you affect the people around you. The fundamentals: listen first, communicate clearly, own your mistakes, delegate instead of hoarding tasks, and credit the team publicly. In a group project, that looks like setting an agenda, matching tasks to people's strengths, and checking in before the deadline, not after.",
            example:
              "Amara ran the school fundraiser: she asked teammates what they were good at, split the work to match, and thanked everyone by name. The event doubled its goal — and everyone wanted her to lead the next one.",
            tip: "Great leaders make everyone else better, not just themselves.",
          },
        ],
        vocab: [
          { word: "stress", meaning: "Your body's response to pressure, demands, or big changes." },
          { word: "resilience", meaning: "The ability to recover and adapt after setbacks." },
          { word: "mindfulness", meaning: "Paying calm, non-judgmental attention to the present moment." },
          { word: "box breathing", meaning: "A calming technique: inhale 4 counts, hold 4, exhale 4, hold 4." },
          { word: "burnout", meaning: "Physical and emotional exhaustion caused by long-term, unmanaged stress." },
          { word: "delegation", meaning: "Trusting teammates with tasks so the whole group can accomplish more." },
        ],
        funFact:
          "U.S. Navy SEALs use box breathing to stay calm in high-pressure situations.",
        quiz: [
          {
            question: "Which statement about stress is most accurate?",
            options: [
              "All stress is harmful and should be eliminated",
              "Some short-term stress can sharpen focus, but chronic stress harms health",
              "Stress only affects adults",
              "Stress is a sign of weakness",
            ],
            answerIndex: 1,
            explanation:
              "Short-term stress can boost focus (like before a game), but lasting chronic stress damages sleep, memory, and health.",
          },
          {
            question: "Box breathing follows which pattern?",
            options: [
              "Breathe as fast as you can for 30 seconds",
              "Hold your breath until dizzy",
              "Inhale 4, hold 4, exhale 4, hold 4",
              "Inhale 1, exhale 20",
            ],
            answerIndex: 2,
            explanation:
              "Box breathing — 4 counts in, hold 4, out 4, hold 4 — steadies the nervous system under pressure.",
          },
          {
            question: "You're leading a group project and one teammate is overloaded. The best leadership move is to...",
            options: [
              "Ignore it; it's their problem",
              "Redistribute tasks based on strengths and check in regularly",
              "Do everything yourself to prove you're the best",
              "Remove them from the team",
            ],
            answerIndex: 1,
            explanation:
              "Good leaders rebalance workloads and check in — that builds trust and better results.",
          },
          {
            question: "For well-being, teens generally need how much sleep?",
            options: ["4–5 hours", "Exactly 12 hours", "About 8–10 hours", "Any amount, if caffeinated"],
            answerIndex: 2,
            explanation:
              "Most teens need roughly 8–10 hours of sleep for mood, memory, and health.",
          },
          {
            question: "Which combination best builds long-term resilience?",
            options: [
              "Suppressing emotions and pushing through exhaustion",
              "Regular sleep, movement, supportive relationships, and asking for help",
              "Avoiding every challenge forever",
              "Energy drinks before every test",
            ],
            answerIndex: 1,
            explanation:
              "Resilience is built from steady basics: sleep, movement, connection, and asking for help early.",
          },
        ],
        worksheet: [
          {
            kind: "fill-blank",
            prompt: "In box breathing, you inhale for 4 counts, hold for 4, exhale for 4, and ______ for 4.",
            answer: "hold",
          },
          {
            kind: "fill-blank",
            prompt: "The ability to recover and adapt after setbacks is called ______.",
            answer: "resilience",
          },
          {
            kind: "practice",
            prompt:
              "A student does 3 rounds of box breathing. Each round takes 16 seconds (4 × 4 counts). How many seconds in total? (Write the number.)",
            answer: "48",
            hint: "3 × 16.",
          },
          {
            kind: "practice",
            prompt:
              "Kai leads a 6-person team that completes 30 tasks split equally. How many tasks per person? (Write the number.)",
            answer: "5",
            hint: "Divide 30 by 6.",
          },
          {
            kind: "short-answer",
            prompt:
              "What are YOUR two earliest personal stress signals, and which technique from this lesson will you try this week?",
            sampleAnswer:
              "Tight shoulders and snapping at people — I'll try box breathing before bed and a 10-minute walk after school.",
          },
          {
            kind: "short-answer",
            prompt:
              "Describe a time you led (or could lead) something small. What would you do differently using 'listen first, credit the team'?",
            sampleAnswer:
              "When I ran our car wash, I assigned jobs without asking preferences. Next time I'd ask first and thank everyone publicly.",
          },
        ],
      },
    ],
  },
};
