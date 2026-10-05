// ---------------------------------------------------------------------------
// BrightMinds — Science, Early Learning (ages 6-8)
// Six lessons: animal habitats, plant growth, body basics, weather watching,
// our Earth, and first experiments (sink or float + mixing colors).
// Sentences are short and wonder-driven, with senses language. Every lesson
// has a text "diagram", a safe hands-on experiment, and a way to apply it.
// ---------------------------------------------------------------------------
import type { Lesson } from "./types";

export const lessons: Lesson[] = [
  // -------------------------------------------------------------------------
  // 1. Amazing animals and their homes
  // -------------------------------------------------------------------------
  {
    id: "science-early-1",
    title: "Amazing Animals and Their Homes",
    emoji: "🐾",
    minutes: 6,
    intro:
      "Every animal has a special home in nature. Come explore forests, oceans, deserts and icy lands to meet the animals that live there!",
    sections: [
      {
        heading: "An animal's home is its habitat",
        body:
          "A habitat is where an animal finds everything it needs: food, water and shelter. Different animals need different homes.",
        example:
          "🌲 Forest → deer, owls, worms  ·  🌊 Ocean → fish, octopuses, whales  ·  🏜️ Desert → camels, lizards  ·  🧊 Icy polar land → penguins, polar bears",
        tip: "Say it out loud: habitat = home + food + water + shelter!",
      },
      {
        heading: "Try it: Build a habitat map",
        body:
          "Fold a big piece of paper into 4 boxes. Label them forest, ocean, desert and ice. Draw one animal in each box. Now draw what each animal eats and drinks there. Show your map to a family member and teach them one animal fact!",
      },
      {
        heading: "Bodies match their homes",
        body:
          "Animal bodies are built for their habitat. A duck has webbed feet like paddles for swimming. A polar bear has thick fur for the freezing ice. A fennec fox has huge ears that let out extra heat in the hot desert.",
        example:
          "A camel's hump stores fat for energy — not water! The fat helps a camel keep going when food is hard to find.",
        tip: "Look at an animal's feet, ears and fur — they give clues about its home.",
      },
      {
        heading: "Some animals build their own homes",
        body:
          "Beavers pile sticks into lodges with underwater doors. Ants dig busy tunnels under the ground. Birds weave cozy nests. Rabbits dig burrows with many exits for a quick escape!",
      },
    ],
    vocab: [
      { word: "habitat", meaning: "The natural home of an animal or plant." },
      { word: "shelter", meaning: "A safe place to hide and rest." },
      { word: "burrow", meaning: "A hole home dug under the ground." },
      { word: "fur", meaning: "Soft hair that keeps some animals warm." },
    ],
    funFact:
      "A hermit crab carries its home on its back! When it grows too big, it moves into a bigger empty seashell — like moving to a new house.",
    quiz: [
      {
        question: "Where does a fish live?",
        options: ["In an ocean habitat", "In a tree nest", "In a desert burrow"],
        answerIndex: 0,
        explanation: "Fish need water to breathe and swim, so their habitat is the ocean.",
        misconceptions: [
          "Yes! Fish breathe with gills, so they need water all around them.",
          "Trees are homes for birds and squirrels. A fish out of water cannot breathe!",
          "Deserts are hot and dry. A fish would have no water to swim in at all!",
        ],
      },
      {
        question: "Which animal lives in a desert?",
        options: ["A dolphin", "A camel", "A penguin"],
        answerIndex: 1,
        explanation: "Camels are built for hot, dry deserts. Dolphins live in the ocean and penguins in cold places.",
        misconceptions: [
          "Dolphins need ocean water to swim and breathe. A desert has no sea at all!",
          "Yes! Camels can walk far in the heat and store fat in their humps.",
          "Penguins love cold, icy places. A hot desert would be much too warm for them!",
        ],
      },
      {
        question: "Why does a polar bear have thick fur?",
        options: ["To taste its food", "To hop higher", "To stay warm in icy places"],
        answerIndex: 2,
        explanation: "Thick fur traps warm air close to the skin, like a cozy winter jacket.",
        misconceptions: [
          "Taste comes from the tongue, not fur. Fur is for warmth!",
          "Fur cannot make you hop! Polar bears use their strong legs to swim and walk.",
          "That's right — thick fur works like a warm coat in the freezing cold.",
        ],
      },
      {
        question: "A rabbit digs an underground home called a...",
        options: ["A web", "A burrow", "A nest"],
        answerIndex: 1,
        explanation: "Rabbits dig burrows with tunnels and many exits so they can escape danger fast.",
        misconceptions: [
          "Spiders spin webs to catch food, not to live in like a rabbit house!",
          "Yes! A burrow is a safe tunnel home under the ground.",
          "Nests are bowl homes in trees for birds. Rabbits dig under the ground instead.",
        ],
      },
    ],
    worksheet: [
      {
        kind: "match",
        prompt: "Match each animal to its home!",
        left: ["Bird", "Bee", "Rabbit", "Ant"],
        right: ["Hive", "Burrow", "Nest", "Anthill"],
        answer: [2, 0, 1, 3],
      },
      {
        kind: "draw",
        prompt: "Draw one animal inside its habitat. Add its food and water too!",
      },
      {
        kind: "fill-blank",
        prompt: "An animal's home in nature is called its ______.",
        answer: "habitat",
        hint: "It starts with 'hab' — like habit!",
      },
      {
        kind: "fill-blank",
        prompt: "A rabbit digs an underground home called a ______.",
        answer: "burrow",
      },
      {
        kind: "short-answer",
        prompt: "Pick an animal. Why would it be unhappy living in a different habitat?",
        sampleAnswer:
          "A penguin would be too hot in the desert. Its thick feathers keep it warm in icy places, so the hot desert would make it overheat. (Any thoughtful answer is great!)",
      },
    ],
  },

  // -------------------------------------------------------------------------
  // 2. Plants: how they grow
  // -------------------------------------------------------------------------
  {
    id: "science-early-2",
    title: "Plants: How They Grow",
    emoji: "🌱",
    minutes: 7,
    intro:
      "A tiny seed can grow into a giant sunflower! Let's find out what plants need and what each part of a plant does.",
    sections: [
      {
        heading: "What plants need to grow",
        body:
          "Plants need the same things you do: water, air and warmth. They also need sunlight and soil. With all five, a seed wakes up and sprouts!",
        example: "☀️ sunlight + 💧 water + 🌬️ air + 🌎 soil food → 🌱 a happy, growing plant",
        tip: "A plant without one of these gets weak — just like you without water!",
      },
      {
        heading: "Plant parts and their jobs",
        body:
          "Every plant part has a job. Roots grow down to drink water and hold the plant tight. The stem carries the water up like a straw. Leaves catch sunlight to make plant food. Flowers make seeds for new plants.",
        example:
          "🌼 flower: makes seeds  ·  🍃 leaves: catch sunlight  ·  🌿 stem: carries water like a straw  ·  🌱 roots: drink water underground",
      },
      {
        heading: "Try it: Grow a bean in a cup",
        body:
          "1. Line a clear plastic cup with a damp paper towel. 2. Press a bean seed against the towel so you can see it. 3. Put the cup in a sunny window. 4. Keep the towel damp, not soaking. 5. Check every day — first a root dives down, then a shoot climbs up! Draw what you see each day.",
      },
      {
        heading: "How seeds go traveling",
        body:
          "Seeds cannot walk, so they hitch rides! Dandelion seeds float on the wind like tiny parachutes. Some seeds stick to animal fur. Squirrels bury acorns and forget some — those grow into oaks. A coconut can float on the sea to a new beach.",
        tip: "Next time you see a dandelion puff, blow it and watch seeds fly!",
      },
    ],
    vocab: [
      { word: "seed", meaning: "The tiny starting part of a new plant." },
      { word: "root", meaning: "The part under the ground that drinks water and holds the plant." },
      { word: "stem", meaning: "The part that holds the plant up and carries water." },
      { word: "sprout", meaning: "When a seed starts to grow." },
    ],
    funFact:
      "The biggest seed in the world is the coco de mer palm seed. It can weigh about 20 kilograms — as much as a 6-year-old kid!",
    quiz: [
      {
        question: "What do roots do for a plant?",
        options: ["Drink water and hold the plant in the soil", "Catch sunlight to make food", "Make flowers and seeds"],
        answerIndex: 0,
        explanation: "Roots grow underground to soak up water and keep the plant steady.",
        misconceptions: [
          "That's right — roots drink and grip, like straws and anchors together!",
          "Leaves are the sunlight catchers. Roots work underground where it is dark.",
          "Flowers make the seeds. Roots are busy underground with water!",
        ],
      },
      {
        question: "Which part catches sunlight?",
        options: ["The roots", "The leaves", "The soil"],
        answerIndex: 1,
        explanation: "Leaves are wide and green so they can soak up lots of sunlight to make plant food.",
        misconceptions: [
          "Roots stay underground, so the sunlight never reaches them!",
          "Yes! Green leaves are the plant's sunshine catchers.",
          "Soil gives water and a place to hold on. It cannot catch sunlight.",
        ],
      },
      {
        question: "A seed starts to sprout when it gets...",
        options: ["Water and warmth", "Only cold wind", "A toy to play with"],
        answerIndex: 0,
        explanation: "Water wakes the seed up and warmth tells it that it is safe to grow.",
        misconceptions: [
          "Yes! Water plus warmth makes a seed sprout, like a cozy spring day.",
          "Cold wind would keep the seed asleep. Seeds like it warm!",
          "Seeds do not play with toys — they just need water, air and warmth.",
        ],
      },
      {
        question: "How does a dandelion seed travel?",
        options: ["It swims across a river", "The wind blows it", "It digs a tunnel"],
        answerIndex: 1,
        explanation: "Dandelion seeds have fluffy parachutes that carry them on the breeze.",
        misconceptions: [
          "Seeds cannot swim like fish! Dandelions use the air.",
          "Yes! The fluffy top acts like a tiny parachute in the wind.",
          "Moles dig tunnels, not seeds. Seeds ride the wind instead.",
        ],
      },
    ],
    worksheet: [
      {
        kind: "fill-blank",
        prompt: "Plants drink water with their ______.",
        answer: "roots",
      },
      {
        kind: "match",
        prompt: "Match each plant part to its job!",
        left: ["Roots", "Stem", "Leaves", "Flower"],
        right: ["Carries water up like a straw", "Makes seeds", "Drinks water from the soil", "Catch sunlight to make food"],
        answer: [2, 0, 3, 1],
      },
      {
        kind: "draw",
        prompt: "Draw a plant and label the roots, stem, leaves and flower.",
      },
      {
        kind: "fill-blank",
        prompt: "A seed needs water, air and ______ to sprout.",
        answer: "warmth",
        hint: "Not too hot, not too cold!",
      },
      {
        kind: "short-answer",
        prompt: "Predict: what will happen to a plant that gets water but lives in a dark closet?",
        sampleAnswer:
          "It would grow tall and pale and then get weak, because the leaves need sunlight to make plant food.",
      },
    ],
  },

  // -------------------------------------------------------------------------
  // 3. My body basics (senses, bones)
  // -------------------------------------------------------------------------
  {
    id: "science-early-3",
    title: "My Body Basics",
    emoji: "🦴",
    minutes: 7,
    intro:
      "You are walking around with a super team inside you — senses that explore the world and bones that hold you tall!",
    sections: [
      {
        heading: "Your body is a team",
        body:
          "Your body parts work together all day. Your senses gather news about the world. Your brain reads the news and decides what to do. Then your muscles and bones make the move!",
        example: "👀 eyes see the ball → 🧠 brain says 'catch!' → 🖐️ hands and 🦴 bones reach out",
        tip: "Your brain is the boss — it gets messages faster than you can blink!",
      },
      {
        heading: "Your five senses",
        body:
          "You have five ways to explore: your eyes see, your ears hear, your nose smells, your tongue tastes, and your skin feels. Each sense sends a special message to your brain.",
        example: "Amara smelled cookies baking from her bedroom. Her nose told her before her eyes did!",
      },
      {
        heading: "Bones: your hidden frame",
        body:
          "Under your skin you have bones, like the frame of a house. Your skull is a hard helmet for your brain. Your ribs are a cage that guards your heart and lungs. Your leg bones let you walk, run and jump.",
        example: "🛡️ skull protects the brain  ·  🦴 ribs guard the heart and lungs  ·  🦵 leg bones help you jump",
      },
      {
        heading: "Try it: Bone and sense detective",
        body:
          "1. Gently feel your forehead — that hard helmet is your skull! 2. Take a deep breath and feel your ribs move. 3. Bend a finger and feel the little bone joints. 4. Now play the sense game: close your eyes while a grown-up hands you a fruit. Smell it, touch it, then guess what it is before you peek!",
      },
    ],
    vocab: [
      { word: "senses", meaning: "The five ways your body learns about the world." },
      { word: "bones", meaning: "The hard parts inside you that hold you up." },
      { word: "brain", meaning: "The bossy control center inside your head." },
      { word: "protect", meaning: "To keep something safe from harm." },
    ],
    funFact:
      "Babies are born with about 300 bones! As they grow, some join together, so grown-ups have 206.",
    quiz: [
      {
        question: "How many senses do you have?",
        options: ["Two", "One hundred", "Five"],
        answerIndex: 2,
        explanation: "You have five senses: seeing, hearing, smelling, tasting and touching.",
        misconceptions: [
          "You see and hear with two, but there are three more: smell, taste and touch!",
          "That would be amazing, but five is your magic number of senses.",
          "Yes! See, hear, smell, taste and touch — count them on one hand.",
        ],
      },
      {
        question: "Which part protects your brain?",
        options: ["Your elbow", "Your skull", "Your hair"],
        answerIndex: 1,
        explanation: "The skull is a hard bone helmet around your brain.",
        misconceptions: [
          "Your elbow bends your arm. It cannot guard your brain!",
          "Yes! The skull is your built-in helmet.",
          "Hair is cozy, but it is soft. Your skull is the hard protector.",
        ],
      },
      {
        question: "What do your ears do?",
        options: ["Taste cookies", "Hear sounds", "See colors"],
        answerIndex: 1,
        explanation: "Sounds travel through the air to your ears, and your brain hears them.",
        misconceptions: [
          "Yum, but tasting is your tongue's job!",
          "Yes! Ears catch sounds like a cup catches water.",
          "Colors are for your eyes. Ears catch sounds instead.",
        ],
      },
      {
        question: "Bones help you...",
        options: ["Smell pizza", "Sing louder", "Stand up and move"],
        answerIndex: 2,
        explanation: "Bones hold your body up and give your muscles something to pull on so you can move.",
        misconceptions: [
          "Smelling is your nose's superpower, not your bones!",
          "Singing is your voice and lungs. Bones hold you up while you sing!",
          "That's it! Bones are your frame, like the beams of a house.",
        ],
      },
    ],
    worksheet: [
      {
        kind: "match",
        prompt: "Match each sense to the body part that does it.",
        left: ["Seeing", "Hearing", "Smelling", "Tasting"],
        right: ["Nose", "Eyes", "Tongue", "Ears"],
        answer: [1, 3, 0, 2],
      },
      {
        kind: "fill-blank",
        prompt: "Your ______ is a hard helmet that protects your brain.",
        answer: "skull",
      },
      {
        kind: "draw",
        prompt: "Draw your hand with fingers spread. Now try to feel the bones inside and draw them too!",
      },
      {
        kind: "fill-blank",
        prompt: "You hear sounds with your ______.",
        answer: "ears",
      },
      {
        kind: "short-answer",
        prompt: "You eat a crunchy apple. Which senses do you use, and what does each one tell you?",
        sampleAnswer:
          "I see its color, smell its sweet smell, feel its smooth skin, taste the juicy flavor, and hear the crunchy bite!",
      },
    ],
  },

  // -------------------------------------------------------------------------
  // 4. Weather watching (sun, rain, clouds, seasons)
  // -------------------------------------------------------------------------
  {
    id: "science-early-4",
    title: "Weather Watching",
    emoji: "⛅",
    minutes: 6,
    intro:
      "Sunny days, rainy days, windy, snowy days! The sky changes every day — let's learn to read it like a scientist.",
    sections: [
      {
        heading: "What is weather?",
        body:
          "Weather is what the sky and air are doing right now. It can be sunny, cloudy, rainy, windy or snowy. Weather can change fast — a cloudy morning can turn into a sunny afternoon!",
        example: "Leo saw gray clouds, grabbed his umbrella, and stayed dry on the way to school.",
        tip: "Look out the window and say today's weather out loud!",
      },
      {
        heading: "Clouds make rain",
        body:
          "The Sun warms water in lakes and oceans. Tiny water bits float up, too small to see. High in the sky they clump together into clouds. When the drops get big and heavy, they fall as rain!",
        example: "💧 tiny drops float up → ☁️ drops clump into a cloud → 🌧️ heavy drops fall as rain",
      },
      {
        heading: "The four seasons",
        body:
          "One year has four seasons. Spring is warm and flowers pop up. Summer is hot and bright. Fall (some people call it autumn) brings cool air and colorful leaves. Winter is the coldest and may bring snow.",
        example: "🌸 spring → ☀️ summer → 🍂 fall → ❄️ winter → 🌸 spring... it repeats every year!",
        tip: "Seasons always come in the same order, like a song you know by heart.",
      },
      {
        heading: "Try it: Make a rain gauge",
        body:
          "1. Put a clear cup outside where rain can reach it, not under a roof. 2. After it rains, look at the water line. 3. With a grown-up, mark the line with tape and write the date. 4. Compare after the next rain — which day had more? 5. Bonus: draw a sun, cloud or raindrops in a weather chart every morning!",
      },
    ],
    vocab: [
      { word: "weather", meaning: "What the sky and air are like right now." },
      { word: "cloud", meaning: "A fluffy bunch of tiny water drops in the sky." },
      { word: "season", meaning: "One of the four parts of the year." },
      { word: "forecast", meaning: "A smart guess about tomorrow's weather." },
    ],
    funFact:
      "A big fluffy cloud can weigh as much as 100 elephants — but it still floats, because it is spread out over a huge space of sky!",
    quiz: [
      {
        question: "Rain falls from...",
        options: ["Light switches", "Clouds", "The doormat"],
        answerIndex: 1,
        explanation: "Clouds are made of tiny water drops. When they get heavy, the drops fall as rain.",
        misconceptions: [
          "Light switches give you light indoors — the sky makes rain outside!",
          "Yes! Heavy drops fall from clouds high in the sky.",
          "Doormats stay dry unless rain has already fallen. Rain comes from clouds.",
        ],
      },
      {
        question: "Which season is the coldest?",
        options: ["Summer", "Spring", "Winter"],
        answerIndex: 2,
        explanation: "Winter is the coldest season, and in many places it brings snow.",
        misconceptions: [
          "Summer is the hottest season — the opposite of cold!",
          "Spring is when things warm up and flowers grow.",
          "Yes! Winter is the chilly season with the shortest days.",
        ],
      },
      {
        question: "What does the Sun give us?",
        options: ["Rain and snow", "Light and warmth", "Thunder"],
        answerIndex: 1,
        explanation: "The Sun lights up the day and warms the land, water and air.",
        misconceptions: [
          "Rain and snow fall from clouds. The Sun actually helps dry puddles up!",
          "Yes! Sunshine brings light for our eyes and warmth for our skin.",
          "Thunder comes from storms. The Sun just glows and warms us.",
        ],
      },
      {
        question: "Which tool measures rain?",
        options: ["A clock", "A spoon", "A rain gauge"],
        answerIndex: 2,
        explanation: "A rain gauge is an open cup that collects rain so you can see how much fell.",
        misconceptions: [
          "A clock tells time. It cannot collect raindrops!",
          "A spoon is too tiny — a big cup catches much more rain to measure.",
          "Yes! A rain gauge is a scientist's cup for catching rain.",
        ],
      },
    ],
    worksheet: [
      {
        kind: "match",
        prompt: "Match each season to its weather!",
        left: ["Summer", "Winter", "Spring", "Fall"],
        right: ["Cool days and falling leaves", "Hot and sunny", "Cold, maybe snow", "Warm with new flowers"],
        answer: [1, 2, 3, 0],
      },
      {
        kind: "draw",
        prompt: "Look outside right now. Draw today's weather — sun, clouds, rain or snow!",
      },
      {
        kind: "fill-blank",
        prompt: "Rain falls from ______.",
        answer: "clouds",
      },
      {
        kind: "fill-blank",
        prompt: "The ______ gives us light and warmth every day.",
        answer: "Sun",
      },
      {
        kind: "short-answer",
        prompt: "Your senses can warn you before a storm. What might you hear, see or feel?",
        sampleAnswer:
          "I might see dark clouds, feel the wind getting stronger, and hear thunder rumbling far away.",
      },
    ],
  },

  // -------------------------------------------------------------------------
  // 5. Our Earth: land, water and sky
  // -------------------------------------------------------------------------
  {
    id: "science-early-5",
    title: "Our Earth: Land, Water and Sky",
    emoji: "🌍",
    minutes: 6,
    intro:
      "We live on a giant ball of rock and water that spins through space! Let's explore the land, the water and the sky above.",
    sections: [
      {
        heading: "Earth is our big round home",
        body:
          "Earth is a huge round ball called a planet. Look at a globe: most of it is blue water. The rest is land where people, animals and plants live. And above everything is the airy sky!",
        example: "🌍 Earth = 💧 water + ⛰️ land + ☁️ sky",
        tip: "Spin a globe — that is what Earth really does, once every day and night!",
      },
      {
        heading: "Land shapes",
        body:
          "Land is not flat. Mountains rise very tall and rocky. Hills are small, round bumps. Valleys are the low places between them. Plains are big, flat stretches where farms grow.",
        example: "⛰️ mountain: tallest  ·  🏞️ valley: lowest land between hills  ·  🌾 plains: flat as a pancake",
      },
      {
        heading: "Water, water everywhere",
        body:
          "Most of Earth's water is in big salty oceans. Rivers and lakes hold fresh water, the kind we can drink. Rain refills the rivers, and rivers flow down to the sea.",
        example: "🌊 ocean: salty  ·  🏞️ rivers and lakes: fresh water for drinking",
      },
      {
        heading: "Try it: Build land and water in a tub",
        body:
          "1. Line a tray or baking dish with an old towel. 2. Pile damp dirt into hills and a big pebble mountain. 3. Pour a little water into the low spots to make a lake. 4. Now pour water from a cup onto your tallest hill. 5. Watch the water rush downhill into your lake. Water always flows down! Wash your hands after.",
      },
    ],
    vocab: [
      { word: "Earth", meaning: "The planet we all live on." },
      { word: "ocean", meaning: "A huge body of salty water." },
      { word: "mountain", meaning: "A very tall piece of land." },
      { word: "fresh water", meaning: "Water that is not salty, like in rivers and lakes." },
    ],
    funFact:
      "About 97 out of every 100 drops of Earth's water are salty ocean water. Only a tiny bit is fresh water we can drink!",
    quiz: [
      {
        question: "What shape is Earth?",
        options: ["A flat square", "A banana", "A big round ball"],
        answerIndex: 2,
        explanation: "Earth is a giant round ball — a planet — that spins in space.",
        misconceptions: [
          "Earth is not flat! From space, astronauts see a big round ball.",
          "Bendy and yellow — definitely not our planet! Earth is round.",
          "Yes! Earth is a huge round ball, which is why globes are ball-shaped.",
        ],
      },
      {
        question: "Most of Earth's surface is covered by...",
        options: ["Grass", "Water", "Clouds"],
        answerIndex: 1,
        explanation: "About 7 out of 10 parts of Earth's surface are covered by ocean water.",
        misconceptions: [
          "Grass covers some land, but land itself is only a small part of Earth.",
          "Yes! Oceans cover most of our planet — that is why globes look so blue.",
          "Clouds float in the sky above. Below them, water covers most of Earth.",
        ],
      },
      {
        question: "Ocean water tastes...",
        options: ["Sweet like juice", "Like nothing", "Salty"],
        answerIndex: 2,
        explanation: "Ocean water has lots of salt in it, so we cannot drink it.",
        misconceptions: [
          "No sugar in the sea! Ocean water is salty from rocks dissolving over millions of years.",
          "Take one sip at the beach and you will notice — the ocean is definitely salty!",
          "Yes! Oceans are salty, which is why we drink fresh water from rivers and lakes instead.",
        ],
      },
      {
        question: "A very, very tall piece of land is a...",
        options: ["A puddle", "A mountain", "A blanket"],
        answerIndex: 1,
        explanation: "Mountains rise high above the land — some are so tall they have snow on top!",
        misconceptions: [
          "A puddle is a tiny splash of water, the opposite of tall!",
          "Yes! Mountains are the tallest land shapes on Earth.",
          "Blankets are soft and flat for sleeping. Mountains are hard and tall!",
        ],
      },
    ],
    worksheet: [
      {
        kind: "match",
        prompt: "Match each land or water shape to its clue!",
        left: ["Mountain", "Hill", "Valley", "Ocean"],
        right: ["Low land between hills", "Very tall, rocky land", "Huge salty water", "A small round bump of land"],
        answer: [1, 3, 0, 2],
      },
      {
        kind: "draw",
        prompt: "Draw our Earth! Show the land, the water and the sky above.",
      },
      {
        kind: "fill-blank",
        prompt: "Ocean water is ______, so we cannot drink it.",
        answer: "salty",
      },
      {
        kind: "fill-blank",
        prompt: "Rain water flows ______ hills into rivers.",
        answer: "down",
      },
      {
        kind: "short-answer",
        prompt: "Where do you think rainwater goes after it falls?",
        sampleAnswer:
          "It soaks into the ground, collects in puddles, or flows into rivers and lakes. (Any thoughtful answer is great!)",
      },
    ],
  },

  // -------------------------------------------------------------------------
  // 6. Simple experiments: sink or float & mixing colors
  // -------------------------------------------------------------------------
  {
    id: "science-early-6",
    title: "Simple Experiments: Sink or Float & Mixing Colors",
    emoji: "🧪",
    minutes: 7,
    intro:
      "Scientists ask questions and try things out. Today YOU are the scientist — with water, colors and lots of guesses!",
    sections: [
      {
        heading: "What is an experiment?",
        body:
          "An experiment is a careful test. First you guess what will happen. Then you try it. Then you watch closely and tell someone what you learned. Guessing first is important — it is called a prediction!",
        example: "🤔 predict → 🧪 test → 👀 observe → 🗣️ share",
        tip: "Wrong predictions are great! They help you learn something new.",
      },
      {
        heading: "Try it: Sink or float?",
        body:
          "1. Fill a big bowl halfway with water and put a towel underneath. 2. Pick objects: a spoon, an apple, a pebble, a sponge, a plastic toy. 3. For each one, say your prediction: sink or float? 4. Gently lower it in and watch. 5. Sort them into two groups: sinkers and floaters. Which group surprised you?",
      },
      {
        heading: "Why do things sink or float?",
        body:
          "It is not just about being big or small — it is about being heavy for its size. Objects packed heavy for their size sink. Light, airy things float. That is why a giant ship floats: its shape holds lots of air inside!",
        example: "🪨 pebble: heavy for its size → sinks  ·  🍎 apple: has air inside → floats",
      },
      {
        heading: "Try it: Mixing colors",
        body:
          "1. Line up 3 clear cups with a little water. 2. Add red food coloring to one, yellow to another, and blue to the last. 3. Predict what two colors will make! 4. Mix red + yellow in a new cup — hello, orange! 5. Mix yellow + blue — green! 6. Mix red + blue — purple! You made new colors, just like a paint scientist.",
      },
    ],
    vocab: [
      { word: "experiment", meaning: "A careful test to find something out." },
      { word: "prediction", meaning: "Your smart guess before you test." },
      { word: "sink", meaning: "To go down under the water." },
      { word: "float", meaning: "To stay on top of the water." },
      { word: "mix", meaning: "To put things together and stir." },
    ],
    funFact:
      "In the very salty Dead Sea, the water is so heavy with salt that you float like a cork — you cannot sink even if you try!",
    quiz: [
      {
        question: "Your guess before you test is called a...",
        options: ["A sandwich", "A prediction", "A napkin"],
        answerIndex: 1,
        explanation: "A prediction is your smart guess about what will happen in an experiment.",
        misconceptions: [
          "Sandwiches are for lunch, not for guessing!",
          "Yes! Scientists always predict first, then test.",
          "Napkins wipe up spills. Predictions happen in your brain!",
        ],
      },
      {
        question: "A wooden block in water will mostly...",
        options: ["Sink", "Hop out", "Float"],
        answerIndex: 2,
        explanation: "Wood is light for its size, so blocks usually float on top.",
        misconceptions: [
          "Some heavy woods sink, but most blocks are light for their size and float.",
          "Blocks cannot hop! But they do sit happily on top of the water.",
          "Yes! Most wooden blocks float like little boats.",
        ],
      },
      {
        question: "Red color mixed with yellow makes...",
        options: ["Green", "Orange", "Gray"],
        answerIndex: 1,
        explanation: "Red and yellow mix to make orange, like a sunset!",
        misconceptions: [
          "Green comes from yellow + blue. Try that mix next!",
          "Yes! Red + yellow = orange. Warm colors make warm colors.",
          "Gray comes from black and white. Red and yellow make something much brighter!",
        ],
      },
      {
        question: "A good scientist watches...",
        options: ["With eyes closed", "Very, very fast", "Carefully"],
        answerIndex: 2,
        explanation: "Scientists watch carefully so they notice every little change.",
        misconceptions: [
          "Closed eyes cannot see results! Scientists keep looking.",
          "Rushing makes you miss things. Careful and slow wins the science race.",
          "Yes! Careful watching is how scientists catch amazing details.",
        ],
      },
    ],
    worksheet: [
      {
        kind: "practice",
        prompt: "Sara tested 6 objects in her bowl. 4 of them floated. How many sank?",
        answer: "2",
        hint: "6 − 4 = ?",
      },
      {
        kind: "match",
        prompt: "Match each color mix to the color it makes!",
        left: ["Red + yellow", "Yellow + blue", "Red + blue"],
        right: ["Green", "Orange", "Purple"],
        answer: [1, 0, 2],
      },
      {
        kind: "fill-blank",
        prompt: "Your guess before you test is called a ______.",
        answer: "prediction",
      },
      {
        kind: "draw",
        prompt: "Draw a bowl of water. Draw your floating objects on top and your sunken objects at the bottom!",
      },
      {
        kind: "short-answer",
        prompt: "Why can a huge metal ship float, while a small metal spoon sinks?",
        sampleAnswer:
          "The ship's shape holds lots of air, so it is light for its big size. The spoon is heavy for its tiny size, so it sinks.",
      },
    ],
    challenge: {
      prompt:
        "The Orange Puzzle: does an orange float better with its peel ON or OFF? Write your prediction, then find out!",
      hint: "Look closely at the peel — it is spongy and full of tiny holes of air.",
      steps: [
        "Fill a big bowl with water and write your prediction: peel on or peel off?",
        "Gently place a whole orange with its peel in the water. What happens?",
        "Take the orange out. With a grown-up's help, peel it.",
        "Place the peeled orange in the water and watch carefully!",
        "Tell someone what you discovered and why you think it happened.",
      ],
      answer: "The orange with its peel floats. The peeled orange often sinks!",
      answerWhy:
        "The peel is spongy and full of tiny air pockets, like a built-in life jacket. Without it, the fruit is packed more tightly and becomes heavier for its size, so it can sink. Scientists call 'heavy for its size' density!",
    },
  },
];
