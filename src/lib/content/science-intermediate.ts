// ---------------------------------------------------------------------------
// BrightMinds — Science, Intermediate Learning (ages 12-13)
// Seven lessons: classification, atoms & mixtures, speed & energy transfer,
// ecological relationships, cells, energy stores & conservation, and Earth &
// space (seasons, tides, Moon). Real vocabulary, real data, real lab skills.
// ---------------------------------------------------------------------------
import type { Lesson } from "./types";

export const lessons: Lesson[] = [
  // -------------------------------------------------------------------------
  // 1. Biology: classification of living things
  // -------------------------------------------------------------------------
  {
    id: "science-intermediate-1",
    title: "Classification of Living Things",
    emoji: "🦁",
    minutes: 12,
    intro:
      "Earth hosts millions of species — so scientists need a filing system. Learn how classification sorts every living thing into its place.",
    sections: [
      {
        heading: "Why classify?",
        body:
          "Classification groups living things by shared features so scientists can study, name and find them again. In the 1700s, Carl Linnaeus invented the two-part scientific name we still use: genus + species. A lion is Panthera leo; a human is Homo sapiens. Every species on Earth gets one unique name that scientists in any language can use.",
        example: "🦁 Panthera leo (lion)  ·  🐯 Panthera tigris (tiger) — same genus, different species",
        tip: "Two organisms share a species name only if they are the same kind of organism.",
      },
      {
        heading: "The levels, from big to small",
        body:
          "Organisms fit into nested levels: kingdom → phylum → class → order → family → genus → species. Each level gets more specific. A house cat walks down from Animalia (kingdom) to Chordata (phylum) to Mammalia (class) to Carnivora (order) to Felidae (family) to Felis (genus) to catus (species). Students remember it with: King Philip Came Over For Good Soup.",
        example:
          "🐆 Felidae (all wild and domestic cats) → Panthera (big roaring cats) → leo (lion): each level narrows the group.",
      },
      {
        heading: "The vertebrate classes",
        body:
          "Vertebrates are animals with backbones, sorted into five familiar classes. Mammals have hair and feed milk to young. Birds have feathers and hard-shelled eggs. Reptiles have dry scaly skin and cannot make their own body heat. Amphibians live a double life in water and on land with moist skin. Fish breathe through gills with fins and scales.",
        example: "🦇 bat = mammal (not a bird!)  ·  🐧 penguin = bird (not a fish!)  ·  🐋 whale = mammal (not a fish!)",
        tip: "A dolphin has no gills or scales — it breathes air and nurses calves: a mammal.",
      },
      {
        heading: "Try it: Build a dichotomous key",
        body:
          "1. Collect 6 different leaves (or 6 classroom objects). 2. Write yes/no questions that split the group in half: 'Is it longer than wide? Does it have a jagged edge?' 3. Keep splitting until each item has a unique path. 4. Swap keys with a partner — can they identify every item using only your questions? That branching question path is a dichotomous key, the tool real biologists use.",
      },
    ],
    vocab: [
      { word: "classification", meaning: "Sorting living things into groups based on shared features." },
      { word: "species", meaning: "A group of organisms so similar they can breed together to produce fertile offspring." },
      { word: "vertebrate", meaning: "An animal with a backbone." },
      { word: "invertebrate", meaning: "An animal without a backbone, like an insect or worm." },
      { word: "genus", meaning: "The group just above species in the naming system." },
    ],
    funFact:
      "Scientists have named about 1.5 million species, but estimates suggest nearly 9 million exist — new species are formally discovered almost every week!",
    quiz: [
      {
        question: "What is the correct order of classification levels, from broadest to most specific?",
        options: ["Species → kingdom → genus", "Kingdom → species → genus", "Kingdom → genus → species", "Genus → kingdom → species"],
        answerIndex: 2,
        explanation: "Kingdom is the biggest group, then genus narrows it, and species is the most specific level.",
        misconceptions: [
          "Species is the smallest, most specific level — it cannot come first from broad to narrow.",
          "Species and genus are swapped — genus contains several species, not the other way.",
          "Yes! Kingdom → phylum → class → order → family → genus → species.",
          "Genus sits inside kingdom, so kingdom must come first.",
        ],
      },
      {
        question: "In the scientific name Panthera leo, what does leo represent?",
        options: ["The species", "The kingdom", "The genus", "The phylum"],
        answerIndex: 0,
        explanation: "The two-part name is genus + species: Panthera is the genus and leo is the species.",
        misconceptions: [
          "Yes! The second word names the species — the lion.",
          "Kingdom names like Animalia are far too broad to appear in a species name.",
          "Panthera is the genus. Leo comes second, so it is the species.",
          "Phyla have names like Chordata — they never appear in binomial names.",
        ],
      },
      {
        question: "A snake has dry scales and cannot make its own body heat. It is a...",
        options: ["Amphibian", "Mammal", "Reptile", "Fish"],
        answerIndex: 2,
        explanation: "Dry scales plus relying on the environment for body warmth are reptile features.",
        misconceptions: [
          "Amphibians have moist, smooth skin — think frogs, not scales.",
          "Mammals have hair and make their own body heat. Snakes do neither.",
          "Yes! Scaly skin and external warmth are classic reptile traits.",
          "Fish breathe with gills in water. A snake breathes air with lungs.",
        ],
      },
      {
        question: "Insects, worms and octopuses are all...",
        options: ["Invertebrates", "Vertebrates", "Mammals", "Birds"],
        answerIndex: 0,
        explanation: "None of them has a backbone, so all are invertebrates — the largest animal group by far.",
        misconceptions: [
          "Yes! No backbone means invertebrate — about 97% of animal species qualify.",
          "No backbone means no vertebrate status — check for a spine first!",
          "Mammals all have backbones and hair. Insects have neither.",
          "Feathers would be required — octopuses are featherless and proud of it.",
        ],
      },
      {
        question: "Why did Linnaeus's two-part naming system spread so fast?",
        options: [
          "It gave every species one name scientists everywhere could use",
          "It made species names as short as possible",
          "It proved all species were related",
          "It replaced the need for specimens",
        ],
        answerIndex: 0,
        explanation: "Before Linnaeus, one species could have many local names. One scientific name ended the confusion.",
        misconceptions: [
          "Yes! A single universal name lets a scientist in any country know exactly which organism is meant.",
          "Some binomials are long! Clarity, not brevity, was the goal.",
          "Showing evolutionary relationships came later with Darwin — Linnaeus organized names.",
          "Scientists still collect and study specimens; names alone cannot describe anatomy.",
        ],
      },
    ],
    worksheet: [
      {
        kind: "fill-blank",
        prompt: "In the scientific name Panthera leo, the word leo names the ______.",
        answer: "species",
      },
      {
        kind: "match",
        prompt: "Match each vertebrate class to its feature!",
        left: ["Mammal", "Bird", "Fish", "Reptile"],
        right: [
          "Has feathers and lays hard-shelled eggs",
          "Has dry scaly skin and cannot make its own body heat",
          "Has hair or fur and feeds milk to its young",
          "Lives in water and breathes with gills",
        ],
        answer: [2, 0, 3, 1],
      },
      {
        kind: "practice",
        prompt:
          "A dichotomous key splits with yes/no questions. How many different specimens can 6 questions tell apart? (Each question doubles the paths: 2 × 2 × 2 × 2 × 2 × 2)",
        answer: "64",
        hint: "2 to the power of 6",
      },
      {
        kind: "fill-blank",
        prompt: "Animals without backbones, like insects and worms, are called ______.",
        answer: "invertebrates",
      },
      {
        kind: "writing",
        prompt:
          "Explain why scientists classify living things. Use the words 'features' and 'species' in your answer.",
        minWords: 40,
        sampleAnswer:
          "Scientists classify living things to organize millions of species into groups based on shared features. Knowing an organism's group lets scientists predict facts about it, communicate clearly across languages, and recognize new species. For example, identifying a bat as a mammal tells us it has fur and feeds milk to its young, even though it flies.",
      },
      {
        kind: "short-answer",
        prompt: "Why is a mushroom NOT classified as a plant?",
        sampleAnswer:
          "Mushrooms are fungi. They have no chlorophyll and cannot make food from sunlight; instead they feed by breaking down dead material. Fungi get their own kingdom.",
      },
    ],
  },

  // -------------------------------------------------------------------------
  // 2. Chemistry basics: atoms, elements and mixtures
  // -------------------------------------------------------------------------
  {
    id: "science-intermediate-2",
    title: "Chemistry Basics: Atoms, Elements and Mixtures",
    emoji: "⚛️",
    minutes: 13,
    intro:
      "Everything you can touch is built from about 100 kinds of building blocks. Meet atoms, elements, compounds and mixtures.",
    sections: [
      {
        heading: "Atoms and elements",
        body:
          "An atom is the smallest particle of an element that still behaves like that element. An element is a substance made of only one kind of atom, and each element has a symbol: O for oxygen, Fe for iron, He for helium. All known elements are organized in the periodic table by their properties.",
        example: "⚛️ hydrogen (H) + ⚛️ hydrogen (H) + ⚛️ oxygen (O) → one water molecule (H₂O)",
        tip: "Symbols may look odd because they come from Latin names — Fe comes from 'ferrum'.",
      },
      {
        heading: "Compounds vs mixtures",
        body:
          "A compound forms when elements chemically bond in a fixed ratio — water is always 2 hydrogens to 1 oxygen, no exceptions. A mixture is substances simply placed together, in any amounts, each keeping its own properties. Mixtures can be separated by physical methods like picking, filtering or using a magnet; compounds need chemical reactions to split.",
        example: "🥗 salad = mixture (easy to pick apart)  ·  💧 H₂O = compound (bonded tight)",
      },
      {
        heading: "Try it: Separate a kitchen mixture",
        body:
          "1. Mix a spoonful of sand with a spoonful of salt — that is a mixture. 2. Use a magnet to check for iron filings if you have some: they fly to the magnet! 3. For sand + salt: stir into warm water so the salt dissolves. 4. Filter through a paper towel: the sand stays behind. 5. Leave the salty water in a shallow dish in a sunny window for a few days — the water evaporates and salt crystals return!",
      },
      {
        heading: "Physical or chemical change?",
        body:
          "In a physical change, the substance stays the same — ice melting, paper tearing, salt dissolving. In a chemical change, new substances form with new properties: rusting iron, burning wood, baking bread. Clues for a chemical change include a gas produced, a color change, or energy released as heat and light.",
        example: "🧊 melted ice can refreeze = physical  ·  🍞 toast can never un-toast = chemical",
      },
    ],
    vocab: [
      { word: "atom", meaning: "The smallest particle of an element that keeps that element's properties." },
      { word: "element", meaning: "A substance made of only one kind of atom." },
      { word: "compound", meaning: "Two or more elements chemically bonded in a fixed ratio." },
      { word: "mixture", meaning: "Substances combined physically, each keeping its own properties." },
      { word: "molecule", meaning: "Two or more atoms bonded together, like H₂O." },
    ],
    funFact:
      "Helium was discovered in the Sun before it was found on Earth! In 1868 astronomers spotted its mystery line in sunlight; it took 27 more years to find it in a lab.",
    quiz: [
      {
        question: "What is the smallest particle of an element that still behaves like that element?",
        options: ["A molecule", "A cell", "A mixture", "An atom"],
        answerIndex: 3,
        explanation: "Atoms are the basic units of elements. Cut smaller and it stops behaving like the element.",
        misconceptions: [
          "A molecule contains two or more atoms bonded together — it is built from atoms, not smaller than them.",
          "Cells are the building blocks of living things, far bigger and more complex than atoms.",
          "A mixture is many substances jumbled together — not a single particle at all!",
          "Yes! The atom is the smallest unit that still acts like its element.",
        ],
      },
      {
        question: "Water (H₂O) is an example of a...",
        options: ["Compound", "Mixture", "Element", "Solution of sand"],
        answerIndex: 0,
        explanation: "Hydrogen and oxygen are chemically bonded in a fixed 2:1 ratio — that is a compound.",
        misconceptions: [
          "Yes! Fixed ratio + chemical bonds = compound.",
          "Mixtures have no fixed ratio and can be separated physically. Water cannot.",
          "Water contains two different elements, so it cannot be a single element.",
          "Sand does not dissolve into water chemically — irrelevant here, and water is bonded.",
        ],
      },
      {
        question: "Which of these is a mixture?",
        options: ["Carbon dioxide (CO₂)", "Air", "Pure gold", "Table salt (NaCl)"],
        answerIndex: 1,
        explanation: "Air is nitrogen, oxygen, argon and more simply jumbled together — a mixture you can separate.",
        misconceptions: [
          "CO₂ is carbon and oxygen chemically bonded in a fixed ratio — a compound.",
          "Yes! Air is several gases mixed physically, each keeping its own properties.",
          "Pure gold is a single element — the opposite of a mixture.",
          "NaCl is sodium and chlorine bonded in a fixed 1:1 ratio — a compound.",
        ],
      },
      {
        question: "A bicycle left in the rain develops rust. This is a...",
        options: ["Physical change", "Reversible change", "Chemical change", "Change of state"],
        answerIndex: 2,
        explanation: "Iron reacts with oxygen and water to form a new substance, rust, with new properties.",
        misconceptions: [
          "No new substance forms in a physical change — rust is definitely new.",
          "You cannot turn rust back into shiny iron by cooling or drying it.",
          "Yes! A new substance formed, so it is a chemical change.",
          "Changes of state (melting, boiling) keep the same substance. Rusting does not.",
        ],
      },
      {
        question: "The symbol Fe on the periodic table stands for...",
        options: ["Fluorine", "Iron", "Francium", "Flerovium"],
        answerIndex: 1,
        explanation: "Fe comes from ferrum, the Latin word for iron.",
        misconceptions: [
          "Fluorine's symbol is F — a single letter, no room for the 'e'.",
          "Yes! Fe is iron, from the Latin ferrum.",
          "Francium is Fr — one of the rarest natural elements.",
          "Flerovium is Fl, a superheavy synthetic element.",
        ],
      },
    ],
    worksheet: [
      {
        kind: "fill-blank",
        prompt: "The smallest particle of an element that still behaves like that element is an ______.",
        answer: "atom",
      },
      {
        kind: "match",
        prompt: "Match each symbol to its element!",
        left: ["O", "Fe", "He", "C"],
        right: ["Carbon", "Iron", "Oxygen", "Helium"],
        answer: [2, 1, 3, 0],
      },
      {
        kind: "practice",
        prompt: "One water molecule is H₂O: 2 hydrogen atoms + 1 oxygen atom. How many atoms are in 3 water molecules?",
        answer: "9",
        hint: "(2 + 1) × 3",
      },
      {
        kind: "fill-blank",
        prompt: "Sand and salt stirred together make a ______, which can be separated without a chemical reaction.",
        answer: "mixture",
      },
      {
        kind: "writing",
        prompt:
          "Explain the difference between a compound and a mixture. Include one example of each and how they can be separated.",
        minWords: 40,
        sampleAnswer:
          "A compound is two or more elements chemically bonded in a fixed ratio, like water (H₂O). You cannot separate it by filtering — only a chemical reaction can split it. A mixture is substances placed together physically, like sand and salt. Each keeps its own properties, and you can separate it by dissolving, filtering or using a magnet.",
      },
      {
        kind: "short-answer",
        prompt: "Is dissolving salt in water a physical or chemical change? How could you prove it?",
        sampleAnswer:
          "Physical. Leave the solution in a sunny window and the water evaporates, leaving the salt crystals back again. No new substance was made, so it is reversible — a physical change.",
      },
    ],
  },

  // -------------------------------------------------------------------------
  // 3. Physics basics: speed, motion and energy transfer
  // -------------------------------------------------------------------------
  {
    id: "science-intermediate-3",
    title: "Physics Basics: Speed, Motion and Energy Transfer",
    emoji: "🏎️",
    minutes: 13,
    intro:
      "How fast is fast? Measure it. This lesson turns motion into numbers you can calculate, graph and trust.",
    sections: [
      {
        heading: "Speed = distance ÷ time",
        body:
          "Speed tells you how much distance an object covers each second or hour. Calculate it with speed = distance ÷ time. Units matter: meters per second (m/s) for sprints, kilometers per hour (km/h) for cars. A sprinter covering 100 m in 20 s runs at 100 ÷ 20 = 5 m/s.",
        example: "🚴 Maya rides 60 km in 3 h → speed = 60 ÷ 3 = 20 km/h",
        tip: "Cover the one you want in the formula triangle: distance on top, speed and time below.",
      },
      {
        heading: "Reading motion on a distance-time graph",
        body:
          "Plot distance against time and the line's steepness is the speed. A steep line means fast movement; a gentle slope means slow; a flat horizontal line means the object is stationary — distance is not changing. Two lines' steepness lets you compare racers at a glance.",
        example: "📈 steep line = fast  ·  📉 gentle line = slow  ·  ➖ flat line = stopped",
      },
      {
        heading: "Energy transfer: from store to store",
        body:
          "Energy is never just floating loose — it moves between stores. Your muscles transfer chemical energy into movement and heat. A bat transfers its movement energy into a flying ball. Friction always transfers some energy into heating the surfaces. Nothing is lost: it just changes address.",
        example: "🍫 food (chemical store) → 🏃 movement + 🔥 heat  ·  🏏 bat → ⚾ ball flies + 🔥 slight warmth",
      },
      {
        heading: "Try it: Time your sprint",
        body:
          "1. Measure a 20 m course with a tape measure or meter sticks. 2. Have a partner time you with a phone stopwatch as you sprint it. 3. Repeat 3 times and record all three times. 4. Calculate your average time, then speed = 20 ÷ average time. 5. Compare with a partner — and calculate who covered more meters per second!",
      },
    ],
    vocab: [
      { word: "speed", meaning: "Distance traveled per unit of time: distance ÷ time." },
      { word: "average speed", meaning: "Total distance divided by total time for a whole journey." },
      { word: "distance-time graph", meaning: "A graph where the line's steepness shows speed." },
      { word: "energy transfer", meaning: "Energy moving from one store or object to another." },
      { word: "stationary", meaning: "Not moving; distance stays the same." },
    ],
    funFact:
      "A cheetah can sprint at about 30 m/s — but only for around 20-30 seconds. After that, overheating forces it to stop and rest!",
    quiz: [
      {
        question: "A cyclist rides 60 km in 3 hours. What is the average speed?",
        options: ["180 km/h", "63 km/h", "20 km/h", "30 km/h"],
        answerIndex: 2,
        explanation: "Speed = distance ÷ time = 60 km ÷ 3 h = 20 km/h.",
        misconceptions: [
          "That multiplies instead of divides — 60 × 3 would be a wild 180 km/h!",
          "Close, but you do not add a small amount — divide 60 by 3.",
          "Yes! 60 ÷ 3 = 20 km/h — a steady, realistic cycling pace.",
          "That would need a 2-hour ride. Check the time: it was 3 hours.",
        ],
      },
      {
        question: "On a distance-time graph, a flat horizontal line means the object is...",
        options: ["Stationary", "Moving fast", "Accelerating", "Moving backwards"],
        answerIndex: 0,
        explanation: "If distance is not changing as time passes, the object is not moving.",
        misconceptions: [
          "Yes! No change in distance means no movement at all.",
          "Fast movement makes a steep line, not a flat one.",
          "Acceleration shows as a curve getting steeper, not a flat line.",
          "Distance-time graphs do not show direction like that — flat simply means stopped.",
        ],
      },
      {
        question: "Which is a sensible unit for speed?",
        options: ["m/s", "m", "s", "N"],
        answerIndex: 0,
        explanation: "Speed combines distance and time, so its unit is a distance unit over a time unit.",
        misconceptions: [
          "Yes! Meters per second (m/s) or kilometers per hour (km/h) both measure speed.",
          "Meters alone measure distance, not how fast it was covered.",
          "Seconds measure time. Speed needs distance AND time.",
          "Newtons measure force — a completely different quantity.",
        ],
      },
      {
        question: "Rubbing your hands together on a cold day warms them. Where did the heat come from?",
        options: ["The air around you", "Friction transferred movement energy to heat", "Your bones vibrating", "The heat multiplied from nowhere"],
        answerIndex: 1,
        explanation: "Friction between rubbing surfaces transfers movement energy into the thermal store — warmth!",
        misconceptions: [
          "Cold air cannot warm your hands — the energy came from your muscles.",
          "Yes! Friction converts movement energy into heat energy. Nothing is created — it transfers.",
          "Bones do not vibrate when you rub your hands — muscles supply the energy.",
          "Energy cannot appear from nowhere — it moved from your movement store to heat.",
        ],
      },
      {
        question: "A ball rolls 15 m in 5 s. Its speed is...",
        options: ["75 m/s", "0.33 m/s", "10 m/s", "3 m/s"],
        answerIndex: 3,
        explanation: "Speed = 15 m ÷ 5 s = 3 m/s.",
        misconceptions: [
          "That multiplies distance by time — try dividing instead.",
          "That divides time by distance, which is upside-down. Flip it: distance ÷ time.",
          "Check the numbers again: 15 ÷ 5 = 3, not 10.",
          "Yes! 15 m ÷ 5 s = 3 m/s.",
        ],
      },
    ],
    worksheet: [
      {
        kind: "fill-blank",
        prompt: "Speed = distance ÷ ______.",
        answer: "time",
      },
      {
        kind: "practice",
        prompt: "A runner covers 120 m in 40 s. What is the speed in m/s?",
        answer: "3",
        hint: "120 ÷ 40",
      },
      {
        kind: "practice",
        prompt: "A car travels at 80 km/h for 2 hours. How far does it travel, in km?",
        answer: "160",
        hint: "distance = speed × time",
      },
      {
        kind: "match",
        prompt: "Match each distance-time graph line to what it shows!",
        left: ["A steep line", "A flat horizontal line", "A gentler line"],
        right: ["The object is stationary", "The object is moving slowly", "The object is moving fast"],
        answer: [2, 0, 1],
      },
      {
        kind: "practice",
        prompt: "Maya sprints 100 m in 25 s. Her average speed is ______ m/s.",
        answer: "4",
        hint: "100 ÷ 25",
      },
      {
        kind: "short-answer",
        prompt: "Why should you time each sprint three times and average the results?",
        sampleAnswer:
          "Human reaction time and small timing errors make each trial slightly different. Averaging three trials reduces the effect of random error and gives a fairer, more reliable speed.",
      },
    ],
  },

  // -------------------------------------------------------------------------
  // 4. Ecology: relationships in ecosystems
  // -------------------------------------------------------------------------
  {
    id: "science-intermediate-4",
    title: "Ecology: Relationships in Ecosystems",
    emoji: "🐝",
    minutes: 13,
    intro:
      "No species lives alone. Meet the partnerships, rivalries and freeloading that shape every ecosystem on Earth.",
    sections: [
      {
        heading: "Ecosystems: living and non-living together",
        body:
          "An ecosystem is a community of organisms interacting with each other AND with their non-living surroundings. Ecologists split the factors into biotic (living: plants, animals, bacteria) and abiotic (non-living: sunlight, water, temperature, soil). Change one factor and the whole system can shift.",
        example: "🌿 biotic: oak, rabbit, fox, fungi  ·  ☀️💧 abiotic: sunlight, rainfall, soil minerals",
      },
      {
        heading: "Symbiosis: living together",
        body:
          "Symbiosis describes close relationships between species. In mutualism, both partners win: bees get nectar while flowers get pollinated. In commensalism, one benefits and the other is unaffected. In parasitism, one benefits at the host's expense: fleas feed on dogs.",
        example: "🐝 ↔️ 🌸 both win = mutualism  ·  🐟 remora hitches a free ride = commensalism  ·  🦟 feeds on host = parasitism",
      },
      {
        heading: "Competition and limiting factors",
        body:
          "Organisms compete for resources: food, water, space, light and mates. Competition happens within a species (two foxes for the same rabbit) and between species (weeds vs garden plants). The factors that cap a population's growth are limiting factors — if food or water runs short, population size falls.",
        example: "🕊️ more nests than good spots → competition → only the best-placed nests raise chicks",
      },
      {
        heading: "Try it: Quadrat population count",
        body:
          "1. Make a 1 m × 1 m square from string. 2. Toss it gently onto a lawn or field. 3. Count one species inside the square, like daisies — use the same counting rules as a partner (split edge cases in half). 4. Estimate the whole area's population: daisies per m² × total m². 5. Toss 3 times and average for a better estimate — real ecologists do exactly this!",
      },
    ],
    vocab: [
      { word: "ecosystem", meaning: "A community of organisms interacting with each other and their environment." },
      { word: "biotic", meaning: "The living parts of an ecosystem." },
      { word: "abiotic", meaning: "The non-living parts, like light, water and temperature." },
      { word: "mutualism", meaning: "A relationship where both organisms benefit." },
      { word: "parasite", meaning: "An organism that lives on or in a host and harms it." },
      { word: "population", meaning: "All the individuals of one species in an area." },
    ],
    funFact:
      "Clownfish and sea anemones are mutualism teammates: the anemone's stingers protect the fish, and the fish aggressively chases away anemone-eating butterflyfish!",
    quiz: [
      {
        question: "Bees visit flowers for nectar and carry pollen between plants. This relationship is...",
        options: ["Parasitism", "Competition", "Mutualism", "Commensalism"],
        answerIndex: 2,
        explanation: "Both partners benefit — the bee gets food and the flower gets pollinated.",
        misconceptions: [
          "The flower is not harmed by the bee, so this is not parasitism.",
          "They are helping, not fighting over the same resource.",
          "Yes! Both organisms gain — the definition of mutualism.",
          "Commensalism helps only one partner. Here both clearly benefit.",
        ],
      },
      {
        question: "Which of these is an abiotic factor in a pond ecosystem?",
        options: ["Algae", "Rainfall", "Frogs", "Bacteria"],
        answerIndex: 1,
        explanation: "Abiotic means non-living. Rainfall affects the pond but is not alive.",
        misconceptions: [
          "Algae are living organisms — biotic!",
          "Yes! Rainfall is non-living, so it is an abiotic factor.",
          "Frogs are very much alive — a classic biotic factor.",
          "Bacteria are living things, so they count as biotic.",
        ],
      },
      {
        question: "A flea feeds on a dog's blood, harming the dog. The flea is a...",
        options: ["Mutualist", "Producer", "Decomposer", "Parasite"],
        answerIndex: 3,
        explanation: "A parasite benefits while its host is harmed — exactly the flea-dog relationship.",
        misconceptions: [
          "Mutualism helps both partners. The dog clearly gets nothing good here.",
          "Producers make their own food from sunlight. Fleas feed on hosts!",
          "Decomposers break down dead material. The dog is alive and not amused.",
          "Yes! Benefit for one, harm for the host — parasitism.",
        ],
      },
      {
        question: "Which could be a limiting factor for a deer population in a forest?",
        options: ["Food shortage in winter", "A harsh drought", "Wolf predation", "All of these"],
        answerIndex: 3,
        explanation: "Food, water and predators can each cap how large a population can grow.",
        misconceptions: [
          "True, but not the only one — keep reading the options!",
          "True too! Water shortages shrink populations. Look for the fullest answer.",
          "Predators limit prey populations as well. There is a better answer.",
          "Yes! Food, water and predation can all limit a population's size.",
        ],
      },
      {
        question: "In a 1 m² quadrat you count 8 daisies. The lawn is about 50 m². Your estimate for the whole lawn is...",
        options: ["58 daisies", "400 daisies", "420 daisies", "42 daisies"],
        answerIndex: 1,
        explanation: "8 daisies per m² × 50 m² = 400 daisies — that is how quadrat sampling scales up.",
        misconceptions: [
          "Adding gives the wrong scale — multiply the density by the area.",
          "Yes! 8 × 50 = 400 daisies on the lawn.",
          "Almost — 8 × 50 is exactly 400, no need to add a margin.",
          "That divides instead of multiplying. Daisies per m² times area!",
        ],
      },
    ],
    worksheet: [
      {
        kind: "fill-blank",
        prompt: "Non-living parts of an ecosystem, like sunlight and rainfall, are called ______ factors.",
        answer: "abiotic",
      },
      {
        kind: "match",
        prompt: "Match each relationship to its description!",
        left: ["Mutualism", "Parasitism", "Commensalism", "Competition"],
        right: [
          "Both organisms benefit",
          "Organisms fight over the same resources",
          "One benefits, the other is unaffected",
          "One benefits while harming its host",
        ],
        answer: [0, 3, 2, 1],
      },
      {
        kind: "practice",
        prompt: "You count 8 daisies in each of three 1 m² quadrats: 8, 7 and 9. Your lawn is 50 m². Estimate the total number of daisies.",
        answer: "400",
        hint: "Average of 8, 7 and 9 is 8 per m², then × 50",
      },
      {
        kind: "fill-blank",
        prompt: "A flea feeding on a dog is a ______, because it benefits while its host is harmed.",
        answer: "parasite",
      },
      {
        kind: "writing",
        prompt:
          "Choose one example of mutualism. Explain what each partner gives and gets, and why neither would do as well alone.",
        minWords: 40,
        sampleAnswer:
          "Bees and flowers are mutual partners. The flower gives nectar that feeds the bee; the bee carries pollen to other flowers so plants can make seeds. Without bees, many flowering plants could not reproduce; without flowers, bees would lose a major food source. Each partner's gain supports the other, so both populations would shrink if separated.",
      },
      {
        kind: "short-answer",
        prompt: "Predict two effects on a garden ecosystem if all the bees disappeared.",
        sampleAnswer:
          "Flowering plants would produce far fewer seeds and fruits, and animals that eat those fruits or seeds would lose food. Crop pollination would also suffer, reducing harvests for humans.",
      },
    ],
  },

  // -------------------------------------------------------------------------
  // 5. Cells: the building blocks of life
  // -------------------------------------------------------------------------
  {
    id: "science-intermediate-5",
    title: "Cells: The Building Blocks of Life",
    emoji: "🔬",
    minutes: 14,
    intro:
      "You are built from about 30 trillion living bricks, each a busy microscopic factory. Welcome to the cell.",
    sections: [
      {
        heading: "Cell theory",
        body:
          "Three big ideas: all living things are made of cells; the cell is the basic unit of life; and all cells come from existing cells. Some organisms are single cells (bacteria, amoebas). Others, like you, are multicellular — trillions of cells cooperating with specialized jobs.",
        example: "🦠 bacteria: one cell does everything  ·  🧍 human: ~30 trillion cells, each with a specialty",
      },
      {
        heading: "Inside the cell: the organelles",
        body:
          "The nucleus stores DNA and acts as the control center. The cell membrane controls what enters and leaves. Cytoplasm is the jelly where reactions happen. Mitochondria release energy from food through respiration. Plant cells add three extras: a rigid cell wall, chloroplasts that capture light, and a large vacuole full of sap for support.",
        example:
          "🔍 animal cell: membrane + nucleus + mitochondria  ·  🌿 plant cell adds: cell wall + chloroplasts + big vacuole",
        tip: "Mitochondria = power stations. Chloroplasts = solar panels. Membrane = security gate.",
      },
      {
        heading: "Specialized cells",
        body:
          "Multicellular organisms assign cells specialist roles. Red blood cells lose their nucleus to pack in more hemoglobin for carrying oxygen. Nerve cells grow long, thin extensions to carry signals quickly. Root hair cells stretch out to soak up water. Shape always matches the job.",
        example: "🩸 red blood cell: doughnut-shaped oxygen taxi  ·  🧠 nerve cell: long wire-like messenger",
      },
      {
        heading: "Try it: Build a model cell",
        body:
          "1. Half-fill a strong zip-top bag with clear gelatin (the cytoplasm) — the bag is the membrane. 2. Drop in a grape or plum (the nucleus), a few kidney beans (mitochondria) and green candies or peas (chloroplasts). 3. Seal and place the bag inside a stiff box (cell wall) for the plant-cell version. 4. Label a diagram of your model with each part and its job.",
      },
    ],
    vocab: [
      { word: "cell", meaning: "The basic unit all living things are made of." },
      { word: "nucleus", meaning: "The control center of the cell, where DNA is stored." },
      { word: "cell membrane", meaning: "The boundary that controls what enters and leaves the cell." },
      { word: "mitochondria", meaning: "Organelles that release energy from food through respiration." },
      { word: "chloroplast", meaning: "The plant organelle that absorbs light for photosynthesis." },
    ],
    funFact:
      "Your body replaces roughly 3 million cells every second — over 250 billion a day — and most of you is younger than you are!",
    quiz: [
      {
        question: "Which part controls the cell and stores its DNA?",
        options: ["The cell membrane", "The nucleus", "The cytoplasm", "The cell wall"],
        answerIndex: 1,
        explanation: "The nucleus holds the DNA — the instructions that run the whole cell.",
        misconceptions: [
          "The membrane guards the border; it does not store DNA.",
          "Yes! The nucleus is the control center with the genetic instructions.",
          "Cytoplasm is the jelly where reactions happen, not the control room.",
          "Only plant cells have a wall, and it provides structure, not control.",
        ],
      },
      {
        question: "Which structures do plant cells have that animal cells do not?",
        options: ["Nucleus and membrane", "Mitochondria and cytoplasm", "Cell wall and chloroplasts", "DNA and ribosomes"],
        answerIndex: 2,
        explanation: "Cell walls and chloroplasts are plant-only extras; animal cells lack both.",
        misconceptions: [
          "Both animal and plant cells have nuclei and membranes.",
          "Both cell types need mitochondria for energy and cytoplasm for reactions.",
          "Yes! Only plant cells build a rigid wall and harvest light with chloroplasts.",
          "All cells store DNA and build proteins — these are shared, not plant-only.",
        ],
      },
      {
        question: "What do mitochondria do?",
        options: [
          "Capture sunlight for photosynthesis",
          "Release energy from food through respiration",
          "Store water for support",
          "Make new cells",
        ],
        answerIndex: 1,
        explanation: "Mitochondria are the power stations: they transfer energy from glucose into a usable form.",
        misconceptions: [
          "That is the chloroplast's solar-panel job.",
          "Yes! Mitochondria power the cell by respiring glucose.",
          "The big vacuole stores water and keeps plant cells firm.",
          "New cells come from existing cells dividing — mitochondria supply the energy for it.",
        ],
      },
      {
        question: "Red blood cells are unusual because they...",
        options: [
          "Have no nucleus, to carry more oxygen",
          "Are the largest cells in the body",
          "Photosynthesize in sunlight",
          "Have a cell wall",
        ],
        answerIndex: 0,
        explanation: "Ditching the nucleus frees up space for more hemoglobin, the oxygen-carrying protein.",
        misconceptions: [
          "Yes! No nucleus means more room for hemoglobin — a specialist trade-off.",
          "They are actually tiny — small enough to squeeze through narrow capillaries.",
          "No human cell photosynthesizes — we are not plants!",
          "Cell walls are plant structures. Human cells never build them.",
        ],
      },
      {
        question: "Why do muscle cells contain far more mitochondria than fat cells?",
        options: [
          "Muscle cells are larger",
          "Muscle cells need more energy for contraction",
          "Fat cells cannot respire",
          "Mitochondria store fat",
        ],
        answerIndex: 1,
        explanation: "More mitochondria means faster energy release — exactly what hard-working muscles demand.",
        misconceptions: [
          "Size is not the driver — energy demand is.",
          "Yes! Constant contraction needs constant energy, so muscles pack in power stations.",
          "Fat cells do respire; they just do not need much energy throughput.",
          "Mitochondria release energy from food — fat storage happens elsewhere in the cell.",
        ],
      },
    ],
    worksheet: [
      {
        kind: "fill-blank",
        prompt: "The ______ is the control center of the cell and stores the DNA.",
        answer: "nucleus",
      },
      {
        kind: "match",
        prompt: "Match each cell part to its job!",
        left: ["Cell membrane", "Mitochondria", "Chloroplast", "Cell wall"],
        right: [
          "Releases energy from food",
          "Stiff outer layer that keeps plant cells firm",
          "Controls what enters and leaves the cell",
          "Absorbs light for photosynthesis",
        ],
        answer: [2, 0, 3, 1],
      },
      {
        kind: "practice",
        prompt: "Your body replaces about 3 million cells each second. How many million cells is that per minute?",
        answer: "180",
        hint: "3 × 60",
      },
      {
        kind: "fill-blank",
        prompt: "Green plant cells contain ______ that capture light energy for photosynthesis.",
        answer: "chloroplasts",
      },
      {
        kind: "writing",
        prompt:
          "Explain why muscle cells contain many more mitochondria than fat cells. Use the words 'energy' and 'respiration'.",
        minWords: 40,
        sampleAnswer:
          "Muscle cells contract constantly and need lots of energy quickly. Mitochondria carry out respiration, releasing energy from glucose, so more mitochondria means more power. Fat cells mostly store energy rather than using it, so they need far fewer mitochondria.",
      },
      {
        kind: "short-answer",
        prompt: "Why do plant cells keep a firm shape while animal cells are soft and squishy?",
        sampleAnswer:
          "Plant cells have a rigid cell wall made of cellulose outside the membrane, plus a water-filled vacuole pressing outward. Together they keep the cell firm. Animal cells have neither.",
      },
    ],
  },

  // -------------------------------------------------------------------------
  // 6. Energy: kinetic, potential and conservation
  // -------------------------------------------------------------------------
  {
    id: "science-intermediate-6",
    title: "Energy: Kinetic, Potential and Conservation",
    emoji: "🎢",
    minutes: 14,
    intro:
      "Energy is the universe's currency — it never vanishes, only changes accounts. Track it through drops, bounces and roller coasters.",
    sections: [
      {
        heading: "Energy stores",
        body:
          "Energy waits in stores until it is transferred. Kinetic energy is the store of movement — the faster something moves, the more kinetic energy it has. Gravitational potential energy is the store of height — lift something higher and you fill its store. There are also elastic stores (stretched rubber bands) and chemical stores (food, fuel).",
        example: "🏃 kinetic: moving  ·  🏔️ gravitational potential: high up  ·  🎯 elastic: stretched  ·  🍫 chemical: food and fuel",
        tip: "Double an object's speed and its kinetic energy roughly quadruples — speed matters a lot!",
      },
      {
        heading: "Conservation of energy",
        body:
          "Energy cannot be created or destroyed — only transferred between stores. A roller coaster car dragged up the first hill fills its gravitational potential store. As it plunges, that store drains into kinetic energy. At the bottom, most of it is kinetic; climbing the next hill converts it back. But friction and air resistance always skim some energy into heat and sound, so every later hill must be lower than the first.",
        example: "🎢 top of first hill: all GPE → falling: GPE → KE → bottom: mostly KE (plus some heat) → next hill: KE → GPE",
      },
      {
        heading: "Try it: Bouncy ball energy audit",
        body:
          "1. Hold a bouncy ball next to a wall and mark the drop height with tape. 2. Drop it (do not throw) and mark how high it rebounds. 3. Repeat 3 times and average your rebound heights. 4. Why is the rebound always lower than the drop? 5. Listen closely during the bounce — that sound is energy leaving the bounce, along with heat that warms the ball and floor a tiny bit.",
      },
      {
        heading: "Energy chains in real life",
        body:
          "Follow an energy chain and you can explain almost any event. You eat breakfast (chemical store) → muscles transfer it to movement climbing stairs (gravitational potential store) → you slide down the banister (kinetic) → friction warms your pants (thermal). Every step obeys conservation of energy.",
        example: "🍫 chemical → 🧗 gravitational potential → 🛝 kinetic → 🔥 thermal + 🔊 sound",
      },
    ],
    vocab: [
      { word: "kinetic energy", meaning: "The energy store of a moving object." },
      { word: "gravitational potential energy", meaning: "The energy store of an object raised above the ground." },
      { word: "conservation of energy", meaning: "Energy cannot be created or destroyed, only transferred." },
      { word: "energy transfer", meaning: "Energy moving from one store to another." },
      { word: "elastic potential energy", meaning: "The energy stored in a stretched or squashed object." },
    ],
    funFact:
      "Roller coaster designers rely on conservation of energy: the first hill must be the tallest, because the cars can never climb higher than the energy they started with!",
    quiz: [
      {
        question: "The energy an object has because it is moving is called...",
        options: ["Gravitational potential energy", "Chemical energy", "Elastic energy", "Kinetic energy"],
        answerIndex: 3,
        explanation: "Kinetic energy is the movement store — faster motion means more of it.",
        misconceptions: [
          "That is the height store — a still book on a shelf has it, but nothing moving.",
          "Chemical energy waits in food and fuel, not in motion.",
          "Elastic energy lives in stretched things, like rubber bands.",
          "Yes! Kinetic = the energy of movement.",
        ],
      },
      {
        question: "A book resting on a high shelf has mostly...",
        options: ["Gravitational potential energy", "Kinetic energy", "Sound energy", "Electrical energy"],
        answerIndex: 0,
        explanation: "Height fills the gravitational potential store, ready to convert if the book falls.",
        misconceptions: [
          "Yes! Its height gives it gravitational potential energy.",
          "The book is perfectly still — kinetic energy needs movement.",
          "No sound is being made while it rests quietly.",
          "Nothing is plugged in — no electrical store involved.",
        ],
      },
      {
        question: "As a ball falls toward the ground, its energy...",
        options: [
          "Transfers from gravitational potential to kinetic",
          "Is destroyed when it lands",
          "Stays in the chemical store",
          "Transfers from kinetic to gravitational potential",
        ],
        answerIndex: 0,
        explanation: "Height drains into speed: gravitational potential energy converts to kinetic energy as it falls.",
        misconceptions: [
          "Yes! Height becomes speed — GPE converts to KE on the way down.",
          "Energy is never destroyed — it transfers to heat and sound at impact.",
          "Falling involves no food or fuel — the chemical store is not the star here.",
          "That is the reverse — it happens when you THROW the ball upward, not as it falls.",
        ],
      },
      {
        question: "A bouncy ball never rebounds to its original drop height because...",
        options: [
          "Some energy transferred to heat and sound",
          "Energy was destroyed in the bounce",
          "Gravity gets stronger near the floor",
          "Balls lose mass when they bounce",
        ],
        answerIndex: 0,
        explanation: "Friction and the 'thud' transfer some energy to thermal and sound stores, leaving less for rebounding.",
        misconceptions: [
          "Yes! Energy is conserved — some just leaks into warmth and noise.",
          "Energy is never destroyed. It moved to other stores instead.",
          "Gravity is essentially the same over the height of a bounce.",
          "The ball does not lose matter — only energy changes location.",
        ],
      },
      {
        question: "A roller coaster's later hills must be lower than the first because...",
        options: [
          "Riders prefer it that way",
          "Friction transfers some energy to heat, so there is less to convert",
          "Kinetic energy disappears at the bottom",
          "Gravity weakens after the first hill",
        ],
        answerIndex: 1,
        explanation: "Friction and air resistance keep skimming energy into heat, so the cars cannot climb as high again.",
        misconceptions: [
          "Designers follow physics, not just taste — the energy budget decides the height!",
          "Yes! Energy lost to friction means less available for climbing.",
          "Kinetic energy is conserved into other stores — it does not simply vanish.",
          "Gravity does not change along the track — the energy budget is the real constraint.",
        ],
      },
    ],
    worksheet: [
      {
        kind: "fill-blank",
        prompt: "The energy an object has because it is moving is called ______ energy.",
        answer: "kinetic",
      },
      {
        kind: "match",
        prompt: "Match each situation to its main energy store!",
        left: ["Ball at the top of a hill", "Stretched rubber band", "Chocolate bar", "Rolling ball"],
        right: ["Chemical energy store", "Elastic potential energy", "Gravitational potential energy", "Kinetic energy"],
        answer: [2, 1, 0, 3],
      },
      {
        kind: "practice",
        prompt: "A ball is dropped from 2 m and rebounds to 1.2 m. How many meters of height are 'missing'?",
        answer: "0.8",
        hint: "2 − 1.2",
      },
      {
        kind: "fill-blank",
        prompt: "Energy cannot be created or ______, only transferred between stores.",
        answer: "destroyed",
      },
      {
        kind: "writing",
        prompt:
          "Use a roller coaster to explain conservation of energy. Mention the first hill, the fastest point, and what friction does.",
        minWords: 40,
        sampleAnswer:
          "The car is dragged up the first hill, filling its gravitational potential store. As it falls, that store transfers to kinetic energy, so the car is fastest at the lowest point. It can only climb hills lower than the first, and each hill after is lower, because friction and air resistance transfer some energy to heat and sound.",
      },
      {
        kind: "short-answer",
        prompt: "Where exactly does the 'missing' energy of a bouncing ball go?",
        sampleAnswer:
          "Some transfers to heating the ball and the floor (thermal store), and some becomes the sound you hear. The energy is not destroyed — it just spreads into stores that are not useful for bouncing.",
      },
    ],
    challenge: {
      prompt:
        "The Nose Test: tie a small weight to a 1 m string to make a pendulum. With a partner holding the top, pull the weight back to just touching your nose — then release it WITHOUT pushing. Predict: will it swing back and hit you? (Stand still!)",
      hint: "Think about conservation of energy — and remember friction and air resistance skim a little energy every swing.",
      steps: [
        "Tie a washer or small weight to a 1 m string. A partner holds the top end steady.",
        "Predict out loud: on the swing back, will it touch your nose? Why or why not?",
        "Pull the weight back until it just touches the tip of your nose, then let go cleanly — do NOT push.",
        "Stand perfectly still and watch the weight approach on its return swing.",
        "Repeat twice. Does it ever reach your nose? Explain the pattern.",
      ],
      answer: "It swings back close to your nose but never quite touches it — and it stops short a little more each time.",
      answerWhy:
        "At your nose the weight has its maximum gravitational potential energy and zero speed. Conservation of energy means it cannot arrive back higher than it started, and air resistance plus friction at the string transfer a little energy to heat each swing — so each return swing falls slightly short. (This is only safe if you release, never push!)",
    },
  },

  // -------------------------------------------------------------------------
  // 7. Earth and space: seasons, tides and the Moon
  // -------------------------------------------------------------------------
  {
    id: "science-intermediate-7",
    title: "Earth and Space: Seasons, Tides and the Moon",
    emoji: "🌙",
    minutes: 14,
    intro:
      "Why is it summer in Sydney when New York freezes? And why does the ocean breathe twice a day? Tilt, spin, gravity — let's go.",
    sections: [
      {
        heading: "Seasons come from tilt, not distance",
        body:
          "Earth's axis is tilted about 23.5°. When your hemisphere tilts toward the Sun, sunlight strikes it more directly and days are longer — summer. Tilt away, and the same energy spreads over a bigger area with short days — winter. A common myth says seasons come from Earth moving closer to the Sun, but Earth's orbit is nearly circular, and the Southern Hemisphere has summer in December, when Earth is actually closest to the Sun!",
        example:
          "🌞 direct rays on tilted-toward hemisphere = summer  ·  🌞 slanted rays on tilted-away hemisphere = winter",
        tip: "Tilt is the cause. Distance is the myth.",
      },
      {
        heading: "Phases of the Moon",
        body:
          "The Moon takes about 29.5 days to complete its cycle of phases. Half the Moon is always lit by the Sun — phases happen because we see different amounts of that lit half as the Moon orbits Earth. New moon: the lit side faces away from us. A week later: first quarter (half visible). Full moon: the whole lit side faces us.",
        example: "🌑 new → 🌒 crescent → 🌓 first quarter → 🌔 gibbous → 🌕 full → and back down again",
      },
      {
        heading: "Tides: the Moon's gentle grip",
        body:
          "The Moon's gravity pulls on Earth's oceans, raising a bulge of water on the side facing the Moon. A second bulge forms on the opposite side. As Earth spins through these bulges, most coastlines get two high tides and two low tides each day. The Sun's gravity adds to it — spring tides (highest) align Sun and Moon; neap tides (smallest) have them at right angles.",
        example: "🌊 bulge toward Moon → 🌍 Earth spins through it → two high tides a day at most coasts",
      },
      {
        heading: "Try it: Keep a Moon journal",
        body:
          "1. For two weeks, look for the Moon at the same time each evening (and morning, if it is not visible at night). 2. Sketch its shape and note the date and time. 3. Label each phase: crescent, quarter, gibbous, full. 4. Predict the next phase before checking! 5. Bonus: check a tide chart for a nearby coast — do high tides shift about 50 minutes later each day, matching the Moon's motion?",
      },
    ],
    vocab: [
      { word: "hemisphere", meaning: "Half of the Earth — northern or southern." },
      { word: "phase", meaning: "The shape of the lit part of the Moon we see from Earth." },
      { word: "orbit", meaning: "The curved path one object takes around another." },
      { word: "tide", meaning: "The regular rise and fall of sea level, mainly caused by the Moon's gravity." },
      { word: "axis", meaning: "The imaginary line Earth spins around." },
    ],
    funFact:
      "The Moon is drifting about 3.8 cm farther from Earth every year — about the speed your fingernails grow!",
    quiz: [
      {
        question: "What mainly causes the seasons?",
        options: [
          "Earth's distance from the Sun changing",
          "Earth's tilted axis",
          "Cloud cover changing through the year",
          "The Moon's phases",
        ],
        answerIndex: 1,
        explanation:
          "The 23.5° tilt changes how directly sunlight hits each hemisphere — direct light means summer.",
        misconceptions: [
          "Common myth! Earth's orbit is nearly circular, and the closest point happens in January.",
          "Yes! The tilt decides how directly sunlight strikes each hemisphere.",
          "Clouds vary locally. Every hemisphere warms and cools in the same yearly pattern.",
          "The Moon's phases are unrelated to seasonal temperature.",
        ],
      },
      {
        question: "During a new moon, the Moon appears dark because...",
        options: [
          "The Moon has stopped existing that night",
          "Its lit side faces away from Earth",
          "Clouds always cover it",
          "It is too far from the Sun to light up",
        ],
        answerIndex: 1,
        explanation: "The Sun still lights half the Moon — we just see the unlit side during a new moon.",
        misconceptions: [
          "The Moon is still there — it is just between Earth and the Sun with its dark side facing us.",
          "Yes! The lit half faces the Sun, away from us, so we see almost nothing.",
          "New moons happen in clear weather too — geometry, not clouds, explains the darkness.",
          "The Moon is always roughly the same distance from the Sun as Earth is.",
        ],
      },
      {
        question: "Tides are mainly caused by...",
        options: ["The Moon's gravity pulling the oceans", "Wind pushing waves ashore", "Rain filling the ocean", "Fish swimming in circles"],
        answerIndex: 0,
        explanation: "The Moon's gravity raises ocean bulges; Earth's spin carries coastlines through them.",
        misconceptions: [
          "Yes! The Moon's gravity pulls the oceans into two bulges.",
          "Wind makes waves, but the steady twice-daily rhythm comes from the Moon.",
          "Rivers and rain add water slowly — they cannot raise and lower coasts twice daily.",
          "The ocean is far too massive to be moved by fish, charming as the idea is.",
        ],
      },
      {
        question: "About how long does it take to go from one full moon to the next?",
        options: ["About a week", "About a month", "About a year", "About a day"],
        answerIndex: 1,
        explanation: "The full cycle of phases takes about 29.5 days — roughly one month (the word comes from 'Moon'!).",
        misconceptions: [
          "A week only gets you from new moon to first quarter.",
          "Yes! About 29.5 days — the origin of the word 'month'.",
          "A year is one lap around the Sun. The Moon laps Earth far more often.",
          "The Moon needs weeks, not hours, to cycle through its phases.",
        ],
      },
      {
        question: "Why is December summer in Australia but winter in the United States?",
        options: [
          "Australia is closer to the Sun in December",
          "The Southern Hemisphere is tilted toward the Sun then",
          "Australia has more beaches, so it stays warm",
          "The Sun is hotter in December",
        ],
        answerIndex: 1,
        explanation:
          "In December the Southern Hemisphere leans toward the Sun, getting direct light and long days — summer.",
        misconceptions: [
          "Earth is actually closest to the Sun in early January — tilt, not distance, rules the seasons.",
          "Yes! Tilted toward the Sun means direct rays and summer for the Southern Hemisphere.",
          "Beaches do not create seasons — the whole hemisphere warms together.",
          "The Sun's output barely changes — the tilt changes where the light lands.",
        ],
      },
    ],
    worksheet: [
      {
        kind: "fill-blank",
        prompt: "Earth's axis is tilted about ______ degrees, which is why we have seasons.",
        answer: "23.5",
        hint: "Between 23 and 24 — write it with the decimal.",
      },
      {
        kind: "match",
        prompt: "Match each term to its meaning!",
        left: ["New moon", "Full moon", "High tide", "Orbit"],
        right: [
          "The whole lit side faces us",
          "The path one object takes around another",
          "The Moon's dark side faces us",
          "The sea rises as the Moon pulls it",
        ],
        answer: [2, 0, 3, 1],
      },
      {
        kind: "practice",
        prompt: "The Moon drifts 3.8 cm farther from Earth each year. How many METERS farther will it be in 1,000 years?",
        answer: "38",
        hint: "3.8 cm × 1000 = ? cm, then convert to meters",
      },
      {
        kind: "fill-blank",
        prompt: "Most coastlines have about ______ high tides every day.",
        answer: "two",
      },
      {
        kind: "writing",
        prompt:
          "Explain why December is summer in Australia but winter in the United States. Mention the tilt, direct sunlight and day length.",
        minWords: 40,
        sampleAnswer:
          "Earth's axis is tilted about 23.5°. In December the Southern Hemisphere leans toward the Sun, so sunlight hits Australia more directly and days are longer — summer. The Northern Hemisphere leans away, so the United States gets slanted, weaker light and short days — winter. Distance from the Sun is not the cause.",
      },
      {
        kind: "short-answer",
        prompt: "Why do we always see the same face of the Moon?",
        sampleAnswer:
          "The Moon is tidally locked: it rotates exactly once for each orbit of Earth, so the same side always points toward us.",
      },
    ],
  },
];
