import type { Subject } from "./types";

// ---------------------------------------------------------------------------
// BrightMinds — Science
// 12 lessons: 3 per age group (early, primary, intermediate, teen).
// Sentence length, vocabulary, quiz size, worksheet types and rigour all
// scale with the age group.
// ---------------------------------------------------------------------------

export const scienceSubject: Subject = {
  id: "science",
  name: "Science",
  emoji: "🔬",
  gradient: "from-emerald-400 to-teal-600",
  taglines: {
    early: "Big wonders for little scientists — let's explore the world!",
    primary: "Curious how things work? From butterflies to planets, let's find out!",
    intermediate: "Real science with real data — sharpen your lab skills.",
    teen: "Master the big ideas: chemistry, physics and genetics — GCSE ready.",
  },
  lessons: {
    // -----------------------------------------------------------------------
    // EARLY (ages 6-8): very short sentences, wonder-driven, everyday examples
    // -----------------------------------------------------------------------
    early: [
      {
        id: "science-early-1",
        title: "Living and Non-Living Things",
        emoji: "🐢",
        minutes: 6,
        intro: "Is your puppy alive? Is your toy robot alive? Let's become science detectives and find out!",
        sections: [
          {
            heading: "What makes something alive?",
            body: "Living things eat, grow, and breathe. They move all by themselves. A cat eats food. A cat grows bigger. A cat breathes air. So a cat is alive!",
            example: "Kai planted a bean seed. It sprouted and grew taller every day. The bean was alive!",
            tip: "Ask three questions: Does it eat? Does it grow? Does it breathe? Three yeses means living!",
          },
          {
            heading: "Non-living things",
            body: "Rocks, chairs, and spoons are non-living. They do not eat, grow, or breathe. A toy car can move. But it needs YOU to push it. Living things move on their own.",
            example: "Maya's teddy bear sits still for years. It never grows. It is non-living.",
          },
          {
            heading: "Was it alive before?",
            body: "Some things were alive long ago. A wooden spoon was part of a tree. Fallen leaves were alive once too. Paper comes from trees as well!",
            tip: "Wood and paper come from trees, so they were once alive.",
          },
        ],
        vocab: [
          { word: "alive", meaning: "A thing that eats, grows, and breathes." },
          { word: "grow", meaning: "To get bigger, just like you do." },
          { word: "breathe", meaning: "To take air in and out." },
        ],
        funFact: "Some bamboo plants can grow almost one whole metre in a single day!",
        quiz: [
          {
            question: "Which one is a living thing?",
            options: ["A rock", "A cat", "A chair"],
            answerIndex: 1,
            explanation: "A cat eats, grows, and breathes. Rocks and chairs do none of these things.",
          },
          {
            question: "What do living things need every day?",
            options: ["Food and water", "Batteries", "New clothes"],
            answerIndex: 0,
            explanation: "Living things need food and water to stay alive. Batteries only power toys.",
          },
          {
            question: "Your toy robot can walk. Is it living?",
            options: [
              "Yes, because it moves",
              "No, it needs people or power to move",
              "No, because robots cannot dance",
            ],
            answerIndex: 1,
            explanation:
              "Robots only move when we press buttons or charge them. Living things move, eat, and grow all by themselves.",
          },
          {
            question: "Which thing was alive long ago?",
            options: ["A plastic spoon", "A wooden spoon", "A glass cup"],
            answerIndex: 1,
            explanation: "Wood comes from trees, and trees are living. Plastic and glass were never alive.",
          },
        ],
        worksheet: [
          {
            kind: "match",
            prompt: "Is it living or non-living? Match each one.",
            left: ["A dog", "A rock", "A tree", "A metal spoon"],
            right: ["Living", "Non-living"],
            answer: [0, 1, 0, 1],
          },
          {
            kind: "draw",
            prompt: "Draw a plant in a pot. Show its stem and leaves!",
          },
          {
            kind: "fill-blank",
            prompt: "Living things ______ bigger as they grow.",
            answer: "grow",
            hint: "Cats, dogs, and you all do this!",
          },
          {
            kind: "short-answer",
            prompt: "Name one living thing and one non-living thing in your home.",
            sampleAnswer: "My cat is living. My table is non-living. (Any correct pair works!)",
          },
          {
            kind: "fill-blank",
            prompt: "Fish breathe underwater using their ______.",
            answer: "gills",
          },
        ],
      },
      {
        id: "science-early-2",
        title: "The Five Senses",
        emoji: "👀",
        minutes: 6,
        intro: "You have five superpowers, and you use them every single day! Get ready to meet your senses.",
        sections: [
          {
            heading: "Meet your five senses",
            body: "Your eyes see colours and shapes. Your ears hear songs and bells. Your nose smells cookies baking. Your tongue tastes sweet and sour. Your skin feels soft and rough.",
            example: "Amara smelled cookies from her bedroom. Her nose told her before her eyes did!",
            tip: "Count them on your fingers: see, hear, smell, taste, touch!",
          },
          {
            heading: "Senses keep you safe",
            body: "Senses warn you about danger. You hear a car horn, so you stop. You feel a hot pot, so you pull away. You smell smoke, so you tell a grown-up.",
            example: "Noah heard a smoke alarm and ran outside with his family.",
            tip: "Never taste anything without asking a grown-up first.",
          },
          {
            heading: "Senses work as a team",
            body: "Your senses help each other. Ice cream tastes sweet. It smells creamy too. It feels very cold! With a blocked nose, food tastes flat.",
          },
        ],
        vocab: [
          { word: "senses", meaning: "The five ways your body learns about the world." },
          { word: "hear", meaning: "To listen with your ears." },
          { word: "touch", meaning: "To feel things with your skin." },
        ],
        funFact: "Your nose can tell apart more than one trillion different smells!",
        quiz: [
          {
            question: "Which body part do you smell with?",
            options: ["Your ears", "Your nose", "Your feet"],
            answerIndex: 1,
            explanation: "Your nose is the smelling superpower. Ears hear and feet just walk!",
          },
          {
            question: "You hear a fire alarm ringing. Which sense told you?",
            options: ["Hearing", "Taste", "Smell"],
            answerIndex: 0,
            explanation: "Sounds travel to your ears. Hearing warned you fast!",
          },
          {
            question: "Which sense tells you ice cream is cold?",
            options: ["Touch", "Smell", "Hearing"],
            answerIndex: 0,
            explanation: "Your skin feels hot and cold. Touch is the temperature sense.",
          },
          {
            question: "How many senses do you have?",
            options: ["Two", "Five", "Ten"],
            answerIndex: 1,
            explanation: "You have five: see, hear, smell, taste, and touch.",
          },
        ],
        worksheet: [
          {
            kind: "match",
            prompt: "Match each sense to the body part that does it.",
            left: ["Seeing", "Hearing", "Smelling", "Tasting"],
            right: ["Tongue", "Eyes", "Nose", "Ears"],
            answer: [1, 3, 2, 0],
          },
          {
            kind: "draw",
            prompt: "Draw yourself smelling a flower. Show your nose and the petals!",
          },
          {
            kind: "fill-blank",
            prompt: "You ______ with your ears.",
            answer: "hear",
            hint: "It rhymes with 'ear'!",
          },
          {
            kind: "fill-blank",
            prompt: "You touch things with your ______.",
            answer: "skin",
          },
          {
            kind: "short-answer",
            prompt: "How can you tell it is raining without looking outside?",
            sampleAnswer: "I can hear raindrops tapping on the roof and windows. I might also smell the wet air.",
          },
        ],
      },
      {
        id: "science-early-3",
        title: "Weather and the Four Seasons",
        emoji: "⛅",
        minutes: 7,
        intro: "Sunny days, snowy days, windy, rainy days! The sky changes every single day — let's find out why.",
        sections: [
          {
            heading: "What is weather?",
            body: "Weather is what the sky and air are doing. It can be sunny, rainy, windy, or snowy. Weather can change fast. A foggy morning can turn into a sunny afternoon!",
            example: "Leo looked outside and saw rain, so he grabbed his umbrella.",
          },
          {
            heading: "The four seasons",
            body: "One year has four seasons. Spring is warm and flowers bloom. Summer is hot and sunny. Autumn is cool and leaves fall. Winter is cold and may bring snow.",
            example: "Zara collects red and orange leaves every autumn.",
            tip: "Seasons always come in order: spring, summer, autumn, winter!",
          },
          {
            heading: "Dressing for the weather",
            body: "We choose clothes for the weather. Rain boots splash in puddles. Mittens keep hands warm in snow. Sunglasses shade our eyes in summer.",
          },
        ],
        vocab: [
          { word: "weather", meaning: "What the sky and air are like each day." },
          { word: "season", meaning: "One of the four parts of the year." },
          { word: "forecast", meaning: "A guess about what weather is coming next." },
        ],
        funFact: "A bolt of lightning is about five times hotter than the surface of the Sun!",
        quiz: [
          {
            question: "Which season is the coldest?",
            options: ["Summer", "Winter", "Spring"],
            answerIndex: 1,
            explanation: "Winter is the coldest season. It may even bring snow!",
          },
          {
            question: "What should you take on a rainy day?",
            options: ["An umbrella", "Sunglasses", "A sun hat"],
            answerIndex: 0,
            explanation: "Rain calls for an umbrella or raincoat. Sunglasses are for sunny days.",
          },
          {
            question: "Leaves change colour and fall in which season?",
            options: ["Spring", "Summer", "Autumn"],
            answerIndex: 2,
            explanation: "Autumn brings cool air and falling red, orange, and yellow leaves.",
          },
          {
            question: "The Sun shines the longest in which season?",
            options: ["Winter", "Autumn", "Summer"],
            answerIndex: 2,
            explanation: "Summer days are the longest and brightest of the whole year.",
          },
        ],
        worksheet: [
          {
            kind: "match",
            prompt: "Match each season to its weather.",
            left: ["Summer", "Winter", "Spring"],
            right: ["Snowy and cold", "Hot and sunny", "Warm — flowers grow"],
            answer: [1, 0, 2],
          },
          {
            kind: "draw",
            prompt: "Draw your favourite season. Show the weather and what you wear!",
          },
          {
            kind: "fill-blank",
            prompt: "Leaves change colour and fall in ______.",
            answer: "autumn",
            hint: "This season is also called fall.",
          },
          {
            kind: "fill-blank",
            prompt: "Rain, snow, wind, and sunshine are all kinds of ______.",
            answer: "weather",
          },
          {
            kind: "short-answer",
            prompt: "What is your favourite thing to do on a sunny day?",
            sampleAnswer: "I like to ride my bike and play in the park. (Any answer you can explain is great!)",
          },
        ],
      },
    ],

    // -----------------------------------------------------------------------
    // PRIMARY (ages 9-11): friendly, richer sentences, how-things-work
    // -----------------------------------------------------------------------
    primary: [
      {
        id: "science-primary-1",
        title: "Plant and Animal Life Cycles",
        emoji: "🦋",
        minutes: 10,
        intro: "Every living thing has a life story, from tiny egg or seed all the way to grown-up. Follow a butterfly and a bean plant through their amazing journeys.",
        sections: [
          {
            heading: "The butterfly's big change",
            body: "A butterfly begins as a tiny egg stuck under a leaf. The egg hatches into a caterpillar that munches leaves and grows fast. Next it builds a hard case called a chrysalis. Inside, its whole body rebuilds itself. Finally an adult butterfly pushes out, dries its wings, and flies away. This huge change is called metamorphosis.",
            example: "Sofia kept caterpillars in a jar and watched each one turn into a painted lady butterfly.",
            tip: "Metamorphosis means 'change of shape' — the caterpillar and the butterfly are the same animal!",
          },
          {
            heading: "From seed to sunflower",
            body: "A seed packs a baby plant and a lunchbox of stored food. With water and warmth, the seed wakes up: a root grows down and a shoot grows up. This is germination. The seedling grows leaves to catch sunlight, then flowers bloom and make new seeds. The cycle starts all over again.",
            example: "Dev grew a bean in a clear plastic cup so he could watch the roots spread each day.",
          },
          {
            heading: "Every life cycle is a loop",
            body: "All plants and animals follow a cycle: birth, growth, reproduction, and new offspring who start again. Frogs metamorphose too, from egg to tadpole to frog. Mammals like dogs skip metamorphosis — puppies are born looking like mini versions of their parents.",
            tip: "Look for the pattern: egg or seed → young → adult → new eggs or seeds.",
          },
        ],
        vocab: [
          { word: "life cycle", meaning: "The stages a living thing passes through, from egg or seed to adult." },
          { word: "metamorphosis", meaning: "A big change in body shape as an animal grows, like caterpillar to butterfly." },
          { word: "germination", meaning: "When a seed wakes up and starts to sprout." },
          { word: "reproduce", meaning: "To make new offspring, like babies or seeds." },
        ],
        funFact: "Monarch butterflies migrate up to 4,800 km each autumn — from Canada all the way to Mexico!",
        quiz: [
          {
            question: "What is the correct order of a butterfly's life cycle?",
            options: [
              "Egg → caterpillar → chrysalis → butterfly",
              "Caterpillar → egg → chrysalis → butterfly",
              "Egg → chrysalis → caterpillar → butterfly",
              "Chrysalis → egg → caterpillar → butterfly",
            ],
            answerIndex: 0,
            explanation:
              "It starts as an egg, hatches into a caterpillar, changes inside a chrysalis, then emerges as a butterfly.",
          },
          {
            question: "What does a seed need to germinate?",
            options: ["Total darkness only", "Water and warmth", "Sunlight only, nothing else", "Wind and sand"],
            answerIndex: 1,
            explanation: "Seeds swell and sprout when they absorb water and feel warmth — light is not needed underground.",
          },
          {
            question: "A tadpole slowly grows into a frog. What is this change called?",
            options: ["Germination", "Migration", "Metamorphosis", "Hibernation"],
            answerIndex: 2,
            explanation: "Metamorphosis is a big change of body shape, like tadpole to frog or caterpillar to butterfly.",
          },
          {
            question: "Why do plants grow flowers?",
            options: [
              "To look pretty for people",
              "To make seeds so new plants can grow",
              "To drink rainwater",
              "To keep insects away",
            ],
            answerIndex: 1,
            explanation: "Flowers make seeds through pollination, so the plant can reproduce and start new life cycles.",
          },
        ],
        worksheet: [
          {
            kind: "fill-blank",
            prompt: "A young frog that hatches from an egg is called a ______.",
            answer: "tadpole",
          },
          {
            kind: "fill-blank",
            prompt: "When a seed wakes up and begins to sprout, we call it ______.",
            answer: "germination",
          },
          {
            kind: "match",
            prompt: "Match each young stage to what it grows into.",
            left: ["Tadpole", "Caterpillar", "Chick", "Seedling"],
            right: ["Butterfly", "Hen", "Sunflower", "Frog"],
            answer: [3, 0, 1, 2],
          },
          {
            kind: "practice",
            prompt: "A sunflower makes 120 seeds. Half of them sprout. How many seedlings grow?",
            answer: "60",
            hint: "Half means divide by 2.",
          },
          {
            kind: "practice",
            prompt: "A butterfly lays 50 eggs. Birds eat 10 of them. How many eggs are left to hatch?",
            answer: "40",
          },
          {
            kind: "short-answer",
            prompt: "Write the four stages of a butterfly's life cycle in order.",
            sampleAnswer: "Egg → caterpillar (larva) → chrysalis (pupa) → adult butterfly.",
          },
        ],
      },
      {
        id: "science-primary-2",
        title: "States of Matter: Solids, Liquids and Gases",
        emoji: "🧊",
        minutes: 10,
        intro: "Ice, water, and steam are the same substance in three different outfits! Discover how matter changes state when it is heated or cooled.",
        sections: [
          {
            heading: "Three states of matter",
            body: "Matter is everything that takes up space — even air! In a solid, tiny particles are packed tightly in neat rows, so solids keep their shape. In a liquid, particles can slide past each other, so liquids flow and take the shape of their container. In a gas, particles fly around freely, spreading out to fill all the space they can.",
            example: "Aisha's chocolate bar is solid in the fridge, but it slowly turns to liquid in her warm hand.",
            tip: "Matter is anything that takes up space — yes, even invisible air!",
          },
          {
            heading: "Heating and cooling change everything",
            body: "Heat a solid and it melts into a liquid; cool the liquid and it freezes back into a solid. Heat a liquid to boiling point and it becomes a gas; cool the gas and it condenses back into a liquid. Water melts at 0°C and boils at 100°C.",
            example: "Marco breathed onto a cold window and watched fog appear — water vapour from his breath condensed into tiny droplets.",
            tip: "Particles move faster when heated and slower when cooled.",
          },
          {
            heading: "Can you undo the change?",
            body: "Melting, freezing, evaporating and condensing are reversible changes — you can always turn the substance back again. But some changes are permanent: you cannot un-burn toast or un-bake a cake, because new substances are made.",
            example: "Kai melted cheese on toast — the cheese could freeze back, but the toasted bread could never be un-toasted.",
          },
        ],
        vocab: [
          { word: "matter", meaning: "Anything that takes up space, like rocks, water, and air." },
          { word: "melt", meaning: "To change from a solid to a liquid when heated." },
          { word: "evaporation", meaning: "When a liquid slowly turns into a gas." },
          { word: "condensation", meaning: "When a gas cools down and turns back into a liquid." },
        ],
        funFact: "Water is the only common substance found naturally on Earth as a solid, a liquid, and a gas!",
        quiz: [
          {
            question: "Which state of matter keeps its own shape?",
            options: ["Liquid", "Gas", "Solid", "Steam"],
            answerIndex: 2,
            explanation: "Solids hold their shape because their particles are locked in place. Liquids flow and gases spread out.",
          },
          {
            question: "At what temperature does water freeze?",
            options: ["100°C", "0°C", "50°C", "-100°C"],
            answerIndex: 1,
            explanation: "Water freezes into ice at 0°C and boils into steam at 100°C.",
          },
          {
            question: "Wet clothes dry on a washing line because of…",
            options: ["Condensation", "Freezing", "Evaporation", "Melting"],
            answerIndex: 2,
            explanation: "The water in the clothes slowly turns into water vapour and drifts away — that is evaporation.",
          },
          {
            question: "Why do water droplets form on the outside of a cold drink can?",
            options: [
              "The can is leaking",
              "Water vapour in the air condenses on the cold surface",
              "The drink is escaping through the metal",
              "The can is melting",
            ],
            answerIndex: 1,
            explanation: "Water vapour in the warm air touches the cold can, cools down, and condenses into droplets.",
          },
        ],
        worksheet: [
          {
            kind: "fill-blank",
            prompt: "When a solid turns into a liquid, the change is called ______.",
            answer: "melting",
          },
          {
            kind: "fill-blank",
            prompt: "Water boils and turns into steam at ______ °C.",
            answer: "100",
          },
          {
            kind: "match",
            prompt: "Match each everyday change to its scientific name.",
            left: [
              "An ice cube in the sun",
              "A puddle drying up",
              "Steam fogging a cold mirror",
              "Water turning to ice in a freezer",
            ],
            right: ["Condensation", "Melting", "Freezing", "Evaporation"],
            answer: [1, 3, 0, 2],
          },
          {
            kind: "practice",
            prompt: "Water freezes at 0°C. A freezer is set to -18°C. How many degrees below freezing is that?",
            answer: "18",
          },
          {
            kind: "short-answer",
            prompt: "Give one change that can be reversed and one that cannot. Say why.",
            sampleAnswer:
              "Melting ice can be reversed by freezing it again, but burnt toast cannot be un-burnt because burning makes new substances.",
          },
          {
            kind: "practice",
            prompt: "Aisha put 8 ice cubes in her drink. After 5 minutes only 3 remain solid. How many have melted?",
            answer: "5",
          },
        ],
      },
      {
        id: "science-primary-3",
        title: "Our Solar System",
        emoji: "🪐",
        minutes: 12,
        intro: "Eight planets race around our Sun like a giant spinning carousel. Buckle up — we're blasting off to meet them!",
        sections: [
          {
            heading: "Meet the Sun and its planets",
            body: "The Sun is a star — a giant ball of hot, glowing gas — sitting at the centre of our solar system. Eight planets orbit (circle around) it: Mercury, Venus, Earth, Mars, Jupiter, Saturn, Uranus, and Neptune. Scientists remember them with: My Very Easy Method Just Speeds Up Naming.",
            example: "Leo built a model with a football as the Sun and marbles as the planets.",
          },
          {
            heading: "Rocky worlds and gas giants",
            body: "The four inner planets — Mercury, Venus, Earth, and Mars — are small and rocky. The four outer planets — Jupiter, Saturn, Uranus, and Neptune — are enormous balls of gas and ice. Jupiter is the biggest planet of all; over 1,300 Earths could fit inside it!",
            tip: "Saturn's famous rings are made of billions of chunks of ice and rock.",
          },
          {
            heading: "Earth: our perfect spot",
            body: "Earth is the third planet from the Sun — at just the right distance for life. It is not too hot and not too cold, with liquid water and air to breathe. Earth spins once every 24 hours, giving us day and night, and takes about 365 days to orbit the Sun — that is one year.",
            example: "Amara noticed her shadow was shortest at noon, when the Sun appeared highest in the sky.",
          },
        ],
        vocab: [
          { word: "planet", meaning: "A large round world that orbits a star." },
          { word: "orbit", meaning: "The curved path one object takes around another, like Earth around the Sun." },
          { word: "star", meaning: "A giant ball of glowing gas that makes its own light, like our Sun." },
          { word: "gravity", meaning: "The invisible force that pulls objects together and keeps planets circling the Sun." },
        ],
        funFact: "A day on Venus is longer than its year — Venus takes 243 Earth days to spin once, but only 225 to orbit the Sun!",
        quiz: [
          {
            question: "Which planet is closest to the Sun?",
            options: ["Earth", "Venus", "Mercury", "Mars"],
            answerIndex: 2,
            explanation: "Mercury is the first planet from the Sun, racing around it in only 88 days.",
          },
          {
            question: "How many planets orbit our Sun?",
            options: ["Five", "Eight", "Nine", "Twelve"],
            answerIndex: 1,
            explanation: "There are eight planets: Mercury, Venus, Earth, Mars, Jupiter, Saturn, Uranus, and Neptune.",
          },
          {
            question: "What causes day and night on Earth?",
            options: [
              "Clouds moving across the sky",
              "Earth spinning on its axis",
              "The Sun switching off at night",
              "The Moon blocking the sunlight",
            ],
            answerIndex: 1,
            explanation: "Earth spins once every 24 hours, so each side takes turns facing the Sun.",
          },
          {
            question: "Which planet is the largest in our solar system?",
            options: ["Saturn", "Earth", "Neptune", "Jupiter"],
            answerIndex: 3,
            explanation: "Jupiter is a giant — more than 1,300 Earths could fit inside it!",
          },
        ],
        worksheet: [
          {
            kind: "fill-blank",
            prompt: "Earth takes about 365 days to ______ once around the Sun.",
            answer: "orbit",
          },
          {
            kind: "fill-blank",
            prompt: "The Sun is the ______ at the centre of our solar system.",
            answer: "star",
          },
          {
            kind: "match",
            prompt: "Match each planet to its amazing fact.",
            left: ["Mars", "Saturn", "Jupiter", "Earth"],
            right: ["The biggest planet", "Famous rings of ice and rock", "Our home planet", "The red planet"],
            answer: [3, 1, 0, 2],
          },
          {
            kind: "practice",
            prompt: "Sunlight takes about 8 minutes to travel from the Sun to Earth. How many minutes would it take to travel to Earth and back again?",
            answer: "16",
          },
          {
            kind: "short-answer",
            prompt: "Why can people live on Earth but not on Venus or Mars?",
            sampleAnswer:
              "Earth is at just the right distance from the Sun, with liquid water and air to breathe. Venus is far too hot and Mars is far too cold.",
          },
          {
            kind: "fill-blank",
            prompt: "The four giant outer planets are made mostly of gas and ______.",
            answer: "ice",
          },
        ],
      },
    ],

    // -----------------------------------------------------------------------
    // INTERMEDIATE (ages 12-13): semi-formal tone, real vocabulary, data
    // -----------------------------------------------------------------------
    intermediate: [
      {
        id: "science-intermediate-1",
        title: "Cells and Body Systems",
        emoji: "🫀",
        minutes: 15,
        intro: "You are built from around 30 trillion cells — microscopic living units working as a team. Meet the cell, then follow how teams of cells keep you running.",
        sections: [
          {
            heading: "Cells: the units of life",
            body: "Cells are the smallest units of life, and your body uses many special types: nerve cells carry electrical signals, red blood cells ferry oxygen, and muscle cells contract to move you. Inside each cell, the nucleus stores DNA and issues instructions, mitochondria release energy from glucose through respiration, and the cell membrane controls what enters and leaves.",
            example: "A red blood cell is only about 7 micrometres across, yet you have roughly 25 trillion of them delivering oxygen.",
            tip: "Tissue = many similar cells together; an organ = different tissues working together.",
          },
          {
            heading: "From cells to systems",
            body: "Cells form tissues, tissues form organs, and organs team up in organ systems. Your digestive system breaks food down using enzymes, absorbing nutrients in the small intestine. Your respiratory system swaps oxygen for carbon dioxide in millions of air sacs called alveoli. Your circulatory system — heart, blood, and vessels — delivers oxygen and nutrients to every cell and carries waste away.",
            example: "At rest your heart pumps about 5 litres of blood each minute — roughly 7,200 litres a day.",
          },
          {
            heading: "Systems working together",
            body: "During exercise, your nervous system senses the demand, so your breathing and heart rate rise to deliver extra oxygen and glucose to working muscles for respiration. Carbon dioxide is removed faster too. A balanced diet, regular exercise, and sleep keep every system healthy.",
            tip: "Enzymes are biological catalysts — they speed up reactions without being used up themselves.",
          },
        ],
        vocab: [
          { word: "cell", meaning: "The smallest living unit of an organism." },
          { word: "nucleus", meaning: "The control centre of a cell, where DNA is stored." },
          { word: "respiration", meaning: "The chemical reaction in cells that releases energy from glucose." },
          { word: "enzyme", meaning: "A protein that speeds up chemical reactions in the body." },
          { word: "tissue", meaning: "A group of similar cells that do the same job." },
        ],
        funFact: "Laid end to end, your blood vessels would stretch about 100,000 km — more than twice around the Earth.",
        quiz: [
          {
            question: "Which part of a cell stores DNA and acts as the control centre?",
            options: ["Cell membrane", "Nucleus", "Mitochondrion", "Cytoplasm"],
            answerIndex: 1,
            explanation: "The nucleus holds the cell's DNA and directs all its activities.",
          },
          {
            question: "Which organ system absorbs oxygen and removes carbon dioxide?",
            options: ["Digestive system", "Respiratory system", "Nervous system", "Skeletal system"],
            answerIndex: 1,
            explanation: "Gas exchange happens in the alveoli of the lungs — that is the respiratory system.",
          },
          {
            question: "Which list goes from smallest to largest?",
            options: [
              "Organ → cell → tissue → organ system",
              "Cell → tissue → organ → organ system",
              "Tissue → cell → organ → organ system",
              "Cell → organ → tissue → organ system",
            ],
            answerIndex: 1,
            explanation: "Similar cells form tissues, tissues form organs, and organs work together in organ systems.",
          },
          {
            question: "During exercise, your heart rate rises mainly to…",
            options: [
              "Cool your skin down",
              "Deliver more oxygen and glucose to your muscles",
              "Remove calcium from your bones",
              "Slow your digestion completely",
            ],
            answerIndex: 1,
            explanation: "Working muscles need extra oxygen and glucose for respiration, so the heart pumps faster.",
          },
          {
            question: "Which structure controls what enters and leaves a cell?",
            options: ["Cell membrane", "Nucleus", "Ribosome", "Vacuole"],
            answerIndex: 0,
            explanation: "The cell membrane is selectively permeable — it decides what passes in and out.",
          },
        ],
        worksheet: [
          {
            kind: "fill-blank",
            prompt: "______ are the organelles that release energy from glucose during respiration.",
            answer: "mitochondria",
          },
          {
            kind: "fill-blank",
            prompt: "The ______ system transports oxygen and nutrients around the body.",
            answer: "circulatory",
          },
          {
            kind: "practice",
            prompt: "A resting heart pumps about 5 litres of blood per minute. How many litres does it pump in one hour?",
            answer: "300",
            hint: "Multiply by 60 minutes.",
          },
          {
            kind: "practice",
            prompt: "Nerve signals can travel at up to 120 metres per second. How far could a signal travel in 2 seconds?",
            answer: "240",
          },
          {
            kind: "short-answer",
            prompt: "Explain the difference between a tissue and an organ, giving one example of each.",
            sampleAnswer:
              "A tissue is a group of similar cells doing the same job, like muscle tissue. An organ is different tissues working together, like the heart.",
          },
          {
            kind: "fill-blank",
            prompt: "Enzymes speed up reactions without being used up, so they act as biological ______.",
            answer: "catalysts",
          },
        ],
      },
      {
        id: "science-intermediate-2",
        title: "Energy, Forces and Motion",
        emoji: "⚙️",
        minutes: 14,
        intro: "Why do you speed up down a slide and then stop at the bottom? Energy and forces control every push, pull, and fall in the universe.",
        sections: [
          {
            heading: "Forces: pushes and pulls",
            body: "A force is a push or pull, measured in newtons (N). Forces can change an object's speed, direction, or shape. Friction opposes movement between surfaces, air resistance slows things moving through air, and gravity pulls objects towards Earth with about 10 N for every kilogram. When forces balance, motion stays the same; when they are unbalanced, the object speeds up, slows down, or changes direction.",
            example: "A skydiver accelerates until air resistance balances their weight — then they fall at a steady top speed called terminal velocity.",
            tip: "Balanced forces = no change in motion. Unbalanced forces = a change in motion.",
          },
          {
            heading: "Speed, distance and time",
            body: "Speed tells you how far something travels each second: speed = distance ÷ time. On a distance–time graph, a straight sloping line means constant speed, a steeper line means faster speed, and a flat line means the object is stationary.",
            example: "Kai cycled 400 metres in 80 seconds, so his speed was 400 ÷ 80 = 5 m/s.",
          },
          {
            heading: "Energy is conserved",
            body: "Energy cannot be created or destroyed — it is only transferred between stores. A ball at the top of a hill stores gravitational potential energy; as it rolls down, that store transfers to kinetic energy. Friction always spreads some energy to the surroundings as heat, which is why the ball never rolls back up quite as high.",
            example: "Lift a 0.5 kg ball 2 m and it gains E = m × g × h = 0.5 × 10 × 2 = 10 J of potential energy.",
          },
        ],
        vocab: [
          { word: "force", meaning: "A push or pull that can change an object's speed, direction, or shape." },
          { word: "friction", meaning: "A force that opposes movement between two touching surfaces." },
          { word: "kinetic energy", meaning: "The energy stored in a moving object." },
          { word: "gravitational potential energy", meaning: "Energy stored in an object because of its height." },
          { word: "terminal velocity", meaning: "The steady top speed reached when air resistance balances weight." },
        ],
        funFact: "The Saturn V Moon rocket produced about 34 million newtons of thrust at liftoff.",
        quiz: [
          {
            question: "Force is measured in…",
            options: ["Joules", "Newtons", "Watts", "Kilograms"],
            answerIndex: 1,
            explanation: "The newton (N) is the unit of force; joules measure energy and watts measure power.",
          },
          {
            question: "A car travels 120 m in 20 s. Its average speed is…",
            options: ["6 m/s", "12 m/s", "24 m/s", "2,400 m/s"],
            answerIndex: 0,
            explanation: "speed = distance ÷ time = 120 ÷ 20 = 6 m/s.",
          },
          {
            question: "Which force slows a bicycle when you brake?",
            options: ["Gravity", "Magnetism", "Friction", "Upthrust"],
            answerIndex: 2,
            explanation: "The brake pads grip the wheel rim, and friction between them converts kinetic energy to heat.",
          },
          {
            question: "A skydiver falls at terminal velocity when…",
            options: [
              "Weight is greater than air resistance",
              "Air resistance equals weight",
              "There is no air resistance",
              "Gravity switches off",
            ],
            answerIndex: 1,
            explanation: "When the two forces balance, the resultant force is zero, so the speed stays constant.",
          },
          {
            question: "As a ball rolls down a hill, its gravitational potential energy…",
            options: [
              "Increases",
              "Transfers to kinetic energy and heat",
              "Is destroyed",
              "Doubles every second",
            ],
            answerIndex: 1,
            explanation: "Energy is conserved: the potential energy store empties into kinetic energy, with some lost to heat from friction.",
          },
        ],
        worksheet: [
          {
            kind: "fill-blank",
            prompt: "The force that opposes movement between two touching surfaces is ______.",
            answer: "friction",
          },
          {
            kind: "fill-blank",
            prompt: "Energy is never created or destroyed, only ______ from one store to another.",
            answer: "transferred",
          },
          {
            kind: "practice",
            prompt: "A sprinter runs 200 m in 25 s. Calculate her average speed in m/s.",
            answer: "8",
            hint: "speed = distance ÷ time",
          },
          {
            kind: "practice",
            prompt: "A book weighs 12 N. Using g ≈ 10 N/kg, what is its mass in kg?",
            answer: "1.2",
          },
          {
            kind: "practice",
            prompt: "A 2 kg ball is lifted 3 m. Using E = m × g × h with g ≈ 10 N/kg, how much gravitational potential energy does it gain, in joules?",
            answer: "60",
          },
          {
            kind: "short-answer",
            prompt: "Describe the energy transfers when a ball bounces, and explain why each bounce is lower than the last.",
            sampleAnswer:
              "Gravitational potential energy transfers to kinetic energy as the ball falls. At each bounce, some energy spreads to the surroundings as heat and sound, so less remains for the next bounce.",
          },
        ],
      },
      {
        id: "science-intermediate-3",
        title: "Ecosystems and Food Webs",
        emoji: "🌍",
        minutes: 14,
        intro: "Every meal you eat is one link in a chain of energy stretching all the way back to the Sun. Let's map the feeding relationships that keep ecosystems alive.",
        sections: [
          {
            heading: "Food chains: energy on the move",
            body: "Producers, like plants, make their own food using sunlight through photosynthesis. Consumers eat other organisms: a primary consumer eats producers, a secondary consumer eats primary consumers, and so on. Arrows in a food chain point from the food to the eater, showing the direction energy travels. Decomposers, like fungi and bacteria, break down dead material and return nutrients to the soil.",
            example: "grass → grasshopper → frog → heron. Only about 10% of the energy passes to the next level; the rest is used for life processes or lost as heat.",
            tip: "Remember: the arrow points the way the energy flows — from meal to eater.",
          },
          {
            heading: "From chains to webs",
            body: "Real animals rarely eat just one thing, so food chains interconnect into food webs. Remove one species and the effects ripple outward — some populations rise while others fall. Top predators can be keystone species whose impact holds the whole web together.",
            example: "When wolves returned to Yellowstone National Park in 1995, deer numbers fell and overgrazed plants recovered — one predator reshaped the entire ecosystem.",
          },
          {
            heading: "Interdependence and balance",
            body: "Every population depends on others for food, pollination, shelter, and nutrient recycling, and on non-living factors like water, light, and temperature. Species compete for food, space, and mates. Habitats with high biodiversity — many different species — are usually more stable, because there are more alternative pathways for energy to flow.",
            example: "Roughly half of the oxygen you breathe is released by plankton drifting in the ocean, showing how connected we are to distant ecosystems.",
          },
        ],
        vocab: [
          { word: "producer", meaning: "An organism that makes its own food using sunlight, such as a plant." },
          { word: "consumer", meaning: "An organism that gets energy by eating other organisms." },
          { word: "decomposer", meaning: "An organism that breaks down dead material and recycles nutrients." },
          { word: "habitat", meaning: "The place where an organism lives." },
          { word: "biodiversity", meaning: "The variety of different species living in an area." },
        ],
        funFact: "The largest living thing on Earth may be a honey fungus in Oregon covering nearly 10 square kilometres.",
        quiz: [
          {
            question: "In a food chain, organisms that make their own food are called…",
            options: ["Consumers", "Producers", "Decomposers", "Predators"],
            answerIndex: 1,
            explanation: "Producers, like plants and algae, use photosynthesis to make their own food.",
          },
          {
            question: "In the chain grass → rabbit → fox, what is the rabbit?",
            options: ["Producer", "Primary consumer", "Secondary consumer", "Decomposer"],
            answerIndex: 1,
            explanation: "The rabbit eats the producer (grass), so it is the primary consumer; the fox is the secondary consumer.",
          },
          {
            question: "Why are decomposers essential to an ecosystem?",
            options: [
              "They hunt the largest predators",
              "They recycle nutrients back into the soil",
              "They make food using sunlight",
              "They produce all the oxygen",
            ],
            answerIndex: 1,
            explanation: "Decomposers break down dead material, returning nutrients that producers need to grow.",
          },
          {
            question: "A disease wipes out most rabbits in a habitat. What will most likely happen to the foxes?",
            options: [
              "They will increase in number",
              "They will turn into producers",
              "They will decline or switch to other prey",
              "They will stop needing energy",
            ],
            answerIndex: 2,
            explanation: "With less food available, foxes either decline in number or hunt different prey — the web adjusts.",
          },
          {
            question: "Roughly how much energy passes from one level of a food chain to the next?",
            options: ["About 90%", "About 50%", "About 10%", "About 100%"],
            answerIndex: 2,
            explanation:
              "Only about 10% passes on — the rest is used for movement and warmth or lost as heat. That is why chains rarely exceed four or five levels.",
          },
        ],
        worksheet: [
          {
            kind: "fill-blank",
            prompt: "Organisms that break down dead material and recycle nutrients are called ______.",
            answer: "decomposers",
          },
          {
            kind: "fill-blank",
            prompt: "Plants make their own food using sunlight in a process called ______.",
            answer: "photosynthesis",
          },
          {
            kind: "practice",
            prompt: "Producers in a meadow store 10,000 kJ of energy. If 10% passes to the next level, how much energy reaches the primary consumers, in kJ?",
            answer: "1000",
          },
          {
            kind: "practice",
            prompt: "A pond survey counted 40 frogs, 120 insects, and 8 herons. How many times more insects were counted than herons?",
            answer: "15",
          },
          {
            kind: "short-answer",
            prompt: "Explain what might happen in a food web if a keystone predator is removed. Use a real example.",
            sampleAnswer:
              "The prey population can rise sharply and overgraze plants. In Yellowstone, wolves had been removed and deer overgrazed vegetation until wolves returned in 1995.",
          },
          {
            kind: "fill-blank",
            prompt: "Many interlinked food chains form a food ______.",
            answer: "web",
          },
        ],
      },
    ],

    // -----------------------------------------------------------------------
    // TEEN (ages 14-15): precise, formulas in plain text, GCSE-level rigour
    // -----------------------------------------------------------------------
    teen: [
      {
        id: "science-teen-1",
        title: "Atoms, Elements and Chemical Reactions",
        emoji: "⚗️",
        minutes: 20,
        intro: "Everything you have ever touched is built from around 100 kinds of atoms. Understanding how those atoms rearrange in reactions is the foundation of all chemistry.",
        sections: [
          {
            heading: "Inside the atom",
            body: "An atom has a tiny central nucleus of protons (positive charge) and neutrons (no charge), surrounded by electrons (negative charge) in shells. The atomic number equals the number of protons and defines the element; the mass number equals protons plus neutrons. Atoms of the same element with different numbers of neutrons are isotopes. In the periodic table, elements are arranged by atomic number, and elements in the same group share the same number of outer-shell electrons — and therefore similar properties.",
            example: "Carbon has atomic number 6, so every carbon atom has 6 protons and 6 electrons. Carbon-12 has 6 neutrons; carbon-14 has 8 — they are isotopes.",
            tip: "Group number ≈ number of outer-shell electrons; period number = number of shells.",
          },
          {
            heading: "Compounds, mixtures and bonding",
            body: "When atoms bond chemically in fixed ratios, they form compounds. In ionic bonding, metals transfer electrons to non-metals, creating oppositely charged ions that attract. In covalent bonding, non-metal atoms share pairs of electrons. Mixtures, by contrast, are just substances jumbled together — not chemically joined — so they can be separated by physical methods like filtration or distillation.",
            example: "Every sample of water (H₂O) has hydrogen and oxygen chemically bonded in a 2:1 ratio, while air is a mixture that can be separated by fractional distillation.",
          },
          {
            heading: "Chemical reactions and equations",
            body: "In a reaction, reactants rearrange into products, but no atoms are created or destroyed — so symbol equations must balance. Exothermic reactions release energy to the surroundings (like combustion); endothermic reactions absorb energy. Reaction rates increase with temperature, concentration, and the surface area of solids, and with a catalyst, which speeds up a reaction without being consumed.",
            example: "Burning methane: CH₄ + 2O₂ → CO₂ + 2H₂O. Check the balance: 1 carbon, 4 hydrogen, and 4 oxygen atoms on each side.",
            tip: "When balancing, never change the small subscripts — only adjust the big coefficients in front.",
          },
        ],
        vocab: [
          { word: "atom", meaning: "The smallest particle of an element: a nucleus of protons and neutrons, surrounded by electrons." },
          { word: "isotope", meaning: "Atoms of the same element with different numbers of neutrons." },
          { word: "ionic bond", meaning: "A bond formed when electrons are transferred, creating oppositely charged ions." },
          { word: "covalent bond", meaning: "A bond formed when atoms share pairs of electrons." },
          { word: "exothermic", meaning: "Describes a reaction that releases energy to the surroundings." },
          { word: "catalyst", meaning: "A substance that speeds up a reaction without being used up." },
        ],
        funFact: "About 75% of all ordinary matter in the universe, by mass, is hydrogen.",
        quiz: [
          {
            question: "An atom has 11 protons and 12 neutrons. What is its mass number?",
            options: ["11", "12", "23", "1"],
            answerIndex: 2,
            explanation: "Mass number = protons + neutrons = 11 + 12 = 23.",
          },
          {
            question: "Which statement about isotopes of an element is correct?",
            options: [
              "They have different numbers of protons",
              "They have different numbers of electrons",
              "They have different numbers of neutrons",
              "They are different elements",
            ],
            answerIndex: 2,
            explanation: "Isotopes have the same atomic number (protons) but different numbers of neutrons, so their masses differ.",
          },
          {
            question: "Water (H₂O) is a compound because…",
            options: [
              "It can be separated by filtration",
              "It contains hydrogen and oxygen chemically bonded in a fixed ratio",
              "It is made of only one type of atom",
              "It boils at 100°C",
            ],
            answerIndex: 1,
            explanation: "A compound is two or more elements chemically bonded in a fixed ratio — filtration cannot separate one.",
          },
          {
            question: "In the equation CH₄ + O₂ → CO₂ + H₂O, what coefficient balances the O₂?",
            options: ["1", "2", "3", "4"],
            answerIndex: 1,
            explanation: "Balancing gives CH₄ + 2O₂ → CO₂ + 2H₂O: four oxygen atoms on each side.",
          },
          {
            question: "Which change would NOT speed up a reaction?",
            options: [
              "Increasing the temperature",
              "Increasing the concentration",
              "Adding a catalyst",
              "Making solid chunks larger",
            ],
            answerIndex: 3,
            explanation: "Larger chunks have less surface area for collisions, so the reaction slows down instead.",
          },
        ],
        worksheet: [
          {
            kind: "fill-blank",
            prompt: "The number of protons in an atom's nucleus is called the ______ number.",
            answer: "atomic",
          },
          {
            kind: "fill-blank",
            prompt: "A reaction that releases energy to the surroundings is called ______.",
            answer: "exothermic",
          },
          {
            kind: "practice",
            prompt: "An oxygen atom has 8 protons and 8 neutrons. What is its mass number?",
            answer: "16",
          },
          {
            kind: "practice",
            prompt: "In the balanced equation 2H₂ + O₂ → 2H₂O, how many hydrogen atoms are on each side?",
            answer: "4",
          },
          {
            kind: "practice",
            prompt: "Calculate the relative formula mass (Mr) of CO₂, using C = 12 and O = 16.",
            answer: "44",
            hint: "Add the masses of all atoms: 1 carbon + 2 oxygen.",
          },
          {
            kind: "short-answer",
            prompt: "Explain why the total mass of the reactants always equals the total mass of the products in a chemical reaction.",
            sampleAnswer:
              "Atoms are only rearranged, never created or destroyed, so the same atoms are present before and after and the total mass is unchanged (conservation of mass).",
          },
        ],
      },
      {
        id: "science-teen-2",
        title: "Newton's Laws and Motion in Depth",
        emoji: "🍎",
        minutes: 18,
        intro: "From sprinting cheetahs to orbiting satellites, three laws published in 1687 still predict every push and pull in the universe. Time to master force, mass, and acceleration.",
        sections: [
          {
            heading: "First law: inertia",
            body: "Newton's first law says an object stays at rest, or keeps moving at constant velocity, unless a resultant force acts on it. With balanced forces, F(net) = 0, so acceleration is zero — but the object can still be moving fast! This resistance to changing motion is called inertia.",
            example: "When a car brakes sharply, passengers continue forwards at the car's original speed until seatbelts apply the force that decelerates them safely.",
            tip: "No resultant force does NOT mean no motion — it means no CHANGE in motion.",
          },
          {
            heading: "Second law: F = m × a",
            body: "Newton's second law quantifies change: resultant force = mass × acceleration (F = m × a). One newton accelerates one kilogram at 1 m/s². A bigger force gives a bigger acceleration; a bigger mass gives a smaller one. Do not confuse mass (kg, the same everywhere) with weight (W = m × g, a force in newtons that varies with gravity).",
            example: "A 60 kg sprinter pushed by a resultant force of 180 N accelerates at a = F/m = 180 ÷ 60 = 3 m/s².",
          },
          {
            heading: "Third law and momentum",
            body: "Newton's third law: when two objects interact, they exert equal and opposite forces on each other. Crucially, the pair acts on different objects, so the forces never cancel out. This is how rockets accelerate in space and how swimmers push water backwards to glide forwards. Related idea: momentum p = m × v is conserved in collisions when no external forces act.",
            example: "A rocket pushes exhaust gases downward; the gases push the rocket upward with an equal force — no air is needed to push against.",
            tip: "Action–reaction pairs act on different bodies — that is why they never cancel.",
          },
        ],
        vocab: [
          { word: "inertia", meaning: "The tendency of an object to resist changes to its state of rest or uniform motion." },
          { word: "resultant force", meaning: "The single force with the same effect as all the individual forces combined." },
          { word: "acceleration", meaning: "The rate of change of velocity, measured in m/s²." },
          { word: "momentum", meaning: "Mass in motion: p = m × v, measured in kg·m/s." },
          { word: "mass", meaning: "The amount of matter in an object in kg — the same everywhere." },
          { word: "weight", meaning: "The force of gravity on an object: W = m × g, measured in newtons." },
        ],
        funFact: "NASA still plots spacecraft trajectories using Newton's laws, published back in 1687.",
        quiz: [
          {
            question: "A 1,500 kg car accelerates at 2 m/s². What resultant force is needed?",
            options: ["750 N", "1,500 N", "3,000 N", "30,000 N"],
            answerIndex: 2,
            explanation: "F = m × a = 1,500 × 2 = 3,000 N.",
          },
          {
            question: "An astronaut releases a spanner in deep space, far from any force. What happens to it?",
            options: [
              "It stops immediately",
              "It keeps moving at constant velocity until a force acts",
              "It accelerates forever",
              "It falls back to the astronaut",
            ],
            answerIndex: 1,
            explanation: "By the first law, with no resultant force the spanner continues at constant velocity — no change in motion.",
          },
          {
            question: "Why do action and reaction forces not cancel each other out?",
            options: [
              "They are not always equal",
              "They act on different objects",
              "They act in the same direction",
              "Friction removes them",
            ],
            answerIndex: 1,
            explanation: "The pair acts on different bodies, so each body experiences one force — they cannot cancel.",
          },
          {
            question: "If you double the mass of an object but keep the resultant force the same, the acceleration will…",
            options: ["Double", "Halve", "Stay the same", "Reverse direction"],
            answerIndex: 1,
            explanation: "a = F ÷ m, so doubling m halves a — acceleration and mass are inversely proportional.",
          },
          {
            question: "On the Moon, g ≈ 1.6 N/kg. What does a 70 kg astronaut weigh there?",
            options: ["70 N", "112 N", "686 N", "0 N"],
            answerIndex: 1,
            explanation: "W = m × g = 70 × 1.6 = 112 N. Their mass stays 70 kg everywhere.",
          },
        ],
        worksheet: [
          {
            kind: "fill-blank",
            prompt: "The tendency of an object to resist changes in its motion is called ______.",
            answer: "inertia",
          },
          {
            kind: "fill-blank",
            prompt: "Newton's second law links resultant force, mass and ______ (the rate of change of velocity).",
            answer: "acceleration",
          },
          {
            kind: "practice",
            prompt: "A 4 kg trolley accelerates at 2.5 m/s². Calculate the resultant force in newtons.",
            answer: "10",
            hint: "F = m × a",
          },
          {
            kind: "practice",
            prompt: "A resultant force of 48 N acts on a cyclist and bike of total mass 6 kg. Calculate the acceleration in m/s².",
            answer: "8",
          },
          {
            kind: "practice",
            prompt: "A 0.45 kg football is kicked from rest to 12 m/s. Calculate its momentum in kg·m/s.",
            answer: "5.4",
            hint: "p = m × v",
          },
          {
            kind: "short-answer",
            prompt: "Use Newton's third law to explain how a swimmer moves forward through water.",
            sampleAnswer:
              "The swimmer pushes water backwards with their hands and feet; by the third law the water pushes the swimmer forwards with an equal and opposite force, so they accelerate forwards.",
          },
        ],
      },
      {
        id: "science-teen-3",
        title: "DNA, Genetics and Heredity",
        emoji: "🧬",
        minutes: 18,
        intro: "Why do you have your mother's eyes and your father's curly hair? The answer is written in a 3-billion-letter code inside almost every one of your cells.",
        sections: [
          {
            heading: "DNA: the code of life",
            body: "DNA is a double helix — two strands coiled around each other, held together by complementary base pairs: adenine (A) always pairs with thymine (T), and cytosine (C) always pairs with guanine (G). A gene is a section of DNA that codes for a protein. In humans, DNA is packaged into 23 pairs of chromosomes, and one full set of instructions is called the genome.",
            example: "One human cell holds about 3 billion base pairs — around 2 metres of DNA coiled into a nucleus just 6 micrometres across.",
          },
          {
            heading: "Genes, alleles and inheritance",
            body: "Genes come in different versions called alleles. A dominant allele is expressed even when only one copy is present; a recessive allele shows only when both copies are recessive. Your genotype is the alleles you carry; your phenotype is the characteristics you actually show. Punnett squares predict the probabilities of offspring genotypes.",
            example: "Simplified eye-colour model: two parents with genotype Bb can produce BB, Bb, Bb, or bb — a 3:1 chance of brown-eyed to blue-eyed children.",
            tip: "Genotype = the alleles present; phenotype = the characteristic you observe.",
          },
          {
            heading: "Meiosis, variation and mutations",
            body: "Meiosis produces gametes (sperm and egg cells) with half the chromosome number, shuffling alleles so each gamete is unique. Fertilisation combines two gametes, so sexual reproduction creates variation — the raw material on which evolution acts. Mutations change DNA sequences: most are neutral, some are harmful, and occasionally one is beneficial, spreading through a population over generations. Gregor Mendel first revealed these patterns in the 1860s by growing around 28,000 pea plants.",
            example: "Mendel found traits passed in predictable ratios (like 3:1) — decades before anyone had even seen a chromosome.",
          },
        ],
        vocab: [
          { word: "DNA", meaning: "The double-helix molecule that carries genetic instructions in base pairs." },
          { word: "gene", meaning: "A section of DNA that codes for a characteristic or protein." },
          { word: "allele", meaning: "A different version of the same gene." },
          { word: "dominant", meaning: "An allele that is expressed even when only one copy is present." },
          { word: "recessive", meaning: "An allele that is expressed only when two copies are present." },
          { word: "meiosis", meaning: "Cell division that produces gametes with half the usual chromosome number." },
        ],
        funFact: "Humans share roughly 60% of their genes with bananas.",
        quiz: [
          {
            question: "In DNA, adenine always pairs with…",
            options: ["Guanine", "Cytosine", "Thymine", "Uracil"],
            answerIndex: 2,
            explanation: "A pairs with T and C pairs with G. Uracil replaces thymine in RNA, not DNA.",
          },
          {
            question: "Two heterozygous parents (Bb × Bb) have a child. What is the probability the child shows the recessive phenotype?",
            options: ["0%", "25%", "50%", "75%"],
            answerIndex: 1,
            explanation: "The cross gives BB, Bb, Bb, bb — so 1 in 4 (25%) are bb and show the recessive trait.",
          },
          {
            question: "Which statement about meiosis is correct?",
            options: [
              "It produces identical body cells",
              "It produces gametes with half the chromosome number",
              "It doubles the chromosome number",
              "It happens in all body cells every day",
            ],
            answerIndex: 1,
            explanation: "Meiosis halves the chromosome number and shuffles alleles, producing genetically unique gametes.",
          },
          {
            question: "An organism's phenotype is…",
            options: [
              "Its full set of alleles",
              "Its observable characteristics",
              "Its number of chromosomes",
              "The base sequence of one gene",
            ],
            answerIndex: 1,
            explanation: "The phenotype is what you can observe — the genotype is the underlying alleles.",
          },
          {
            question: "How can a child show a trait that neither parent displays?",
            options: [
              "Traits skip genes entirely",
              "Both parents carried a recessive allele that the child inherited twice",
              "Mutations never affect traits",
              "DNA changes completely after birth",
            ],
            answerIndex: 1,
            explanation: "Each parent can carry one recessive allele unseen (Bb); a child inheriting both copies (bb) expresses the trait.",
          },
        ],
        worksheet: [
          {
            kind: "fill-blank",
            prompt: "In DNA, cytosine always pairs with ______.",
            answer: "guanine",
          },
          {
            kind: "fill-blank",
            prompt: "Different versions of the same gene are called ______.",
            answer: "alleles",
          },
          {
            kind: "practice",
            prompt: "In a Bb × Bb cross with 4 offspring (expected ratios), how many are expected to be homozygous recessive (bb)?",
            answer: "1",
          },
          {
            kind: "practice",
            prompt: "Human body cells contain 46 chromosomes. How many chromosomes are in a human sperm cell?",
            answer: "23",
          },
          {
            kind: "practice",
            prompt: "The DNA in one human cell is about 2 metres long. How many metres of DNA would 25 cells contain?",
            answer: "50",
          },
          {
            kind: "short-answer",
            prompt: "Explain why offspring from sexual reproduction show variation, referring to meiosis and fertilisation.",
            sampleAnswer:
              "Meiosis shuffles alleles and produces genetically unique gametes with half the chromosomes; fertilisation combines random gametes from two parents, so each offspring receives a unique mix of alleles.",
          },
        ],
      },
    ],
  },
};
