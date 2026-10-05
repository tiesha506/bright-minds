// ---------------------------------------------------------------------------
// BrightMinds — Science, Primary Learning (ages 9-11)
// Eight lessons: solar system, states of matter, energy (light/heat/sound),
// food chains, human organs, forces & friction, simple circuits, and Earth
// science (rocks, volcanoes, water cycle). Every lesson includes a text
// "diagram", a safe hands-on experiment and a concept-application section.
// ---------------------------------------------------------------------------
import type { Lesson } from "./types";

export const lessons: Lesson[] = [
  // -------------------------------------------------------------------------
  // 1. The solar system
  // -------------------------------------------------------------------------
  {
    id: "science-primary-1",
    title: "The Solar System",
    emoji: "🪐",
    minutes: 10,
    intro:
      "Our Sun holds a family of eight planets, and Earth is one of them! Blast off on a tour of the whole solar system.",
    sections: [
      {
        heading: "Our Sun and its eight planets",
        body:
          "The solar system is the Sun and everything that travels around it. The Sun sits in the middle, and its gravity keeps eight planets circling in paths called orbits. In order from the Sun: Mercury, Venus, Earth, Mars, Jupiter, Saturn, Uranus and Neptune.",
        example:
          "☀️ Sun → 🪨 Mercury → 🌡️ Venus → 🌍 Earth → 🔴 Mars → 🟠 Jupiter (biggest) → 💍 Saturn (rings) → 🌀 Uranus → ❄️ Neptune (farthest)",
        tip: "Remember the order with: My Very Excellent Mother Just Served Us Noodles!",
      },
      {
        heading: "Rocky worlds and gas giants",
        body:
          "The four inner planets — Mercury, Venus, Earth and Mars — are small and rocky, with solid surfaces you could stand on. The four outer planets are giants made mostly of gas and ice, with no solid ground. Between Mars and Jupiter floats the asteroid belt, thousands of leftover space rocks.",
        example:
          "🌍 Earth: rocky with oceans and air  ·  🟠 Jupiter: so big that 1,300 Earths could fit inside",
      },
      {
        heading: "Day, night and years",
        body:
          "Earth is always busy. It spins like a top once every 24 hours, giving us day and night. At the same time it travels around the Sun once every year. One trip around the Sun is called one orbit, and it takes Earth about 365 days.",
        example: "Earth spinning = one day  ·  Earth orbiting the Sun = one year",
      },
      {
        heading: "Try it: Make a pocket solar system",
        body:
          "1. Lay a long strip of paper on the floor. 2. Draw the Sun at one end. 3. Use small round objects to stand for planets: a peppercorn for Mercury, a bigger bead for Earth, a ping-pong ball for Jupiter. 4. Place them in order along the strip. 5. Walk your finger from planet to planet and say their names out loud. Which gap looks longest?",
      },
    ],
    vocab: [
      { word: "orbit", meaning: "The path one object takes around another, like Earth around the Sun." },
      { word: "planet", meaning: "A large round world that orbits a star." },
      { word: "solar system", meaning: "The Sun and all the objects that orbit it." },
      { word: "asteroid", meaning: "A rocky space object, smaller than a planet." },
    ],
    funFact:
      "On Venus, a single day is longer than its year! Venus takes about 243 Earth days to spin once, but only about 225 Earth days to orbit the Sun.",
    quiz: [
      {
        question: "What is at the center of our solar system?",
        options: ["Earth", "The Sun", "The Moon", "Jupiter"],
        answerIndex: 1,
        explanation: "The Sun's huge gravity holds every planet in orbit around it.",
        misconceptions: [
          "Earth orbits the Sun with the other planets — we are not the center!",
          "Yes! The Sun's gravity keeps the whole family of planets circling.",
          "The Moon orbits Earth, so it is much closer to us than the Sun.",
          "Jupiter is the biggest planet, but even it orbits the Sun.",
        ],
      },
      {
        question: "Which planet do we live on?",
        options: ["Mars", "Venus", "Earth", "Saturn"],
        answerIndex: 2,
        explanation: "Earth is the third planet from the Sun — the only one known to have life.",
        misconceptions: [
          "Mars is the red planet next door. Robots explore it, but nobody lives there yet!",
          "Venus is the hottest planet, wrapped in thick clouds. Too hot for us!",
          "Correct! Earth is the third planet from the Sun, covered in oceans and life.",
          "Saturn is famous for its dazzling rings of ice and rock.",
        ],
      },
      {
        question: "Which is the biggest planet?",
        options: ["Earth", "Jupiter", "Mars", "Mercury"],
        answerIndex: 1,
        explanation: "Jupiter is a giant — about 1,300 Earths would fit inside it.",
        misconceptions: [
          "Earth feels big to us, but it is a small rocky planet in a family of giants.",
          "Yes! Jupiter is the giant of the solar system.",
          "Mars is actually one of the smallest planets — about half Earth's size.",
          "Mercury is the smallest planet of all, closest to the Sun.",
        ],
      },
      {
        question: "How long does Earth take to orbit the Sun once?",
        options: ["One day", "One week", "One month", "One year"],
        answerIndex: 3,
        explanation: "One full orbit around the Sun takes Earth about 365 days — one year.",
        misconceptions: [
          "One day is one spin of Earth — that gives you day and night instead.",
          "A week is only 7 spins. Earth is barely out of the driveway!",
          "One month is how long the Moon takes to circle Earth, not Earth around the Sun.",
          "Yes! 365 days of orbiting equals one year — and one trip around the Sun.",
        ],
      },
    ],
    worksheet: [
      {
        kind: "fill-blank",
        prompt: "Earth is the ______ planet from the Sun.",
        answer: "third",
        hint: "Mercury, Venus, then...",
      },
      {
        kind: "match",
        prompt: "Match each planet to its famous fact!",
        left: ["Jupiter", "Saturn", "Mars", "Neptune"],
        right: ["Famous for its bright rings", "The farthest planet from the Sun", "The biggest planet", "The red, dusty planet"],
        answer: [2, 0, 3, 1],
      },
      {
        kind: "practice",
        prompt:
          "Sunlight takes about 8 minutes to reach Earth. About how many minutes would it take to reach a planet 3 times farther away?",
        answer: "24",
        hint: "3 × 8",
      },
      {
        kind: "draw",
        prompt: "Draw the Sun in the middle and at least four planets in order around it. Label them!",
      },
      {
        kind: "fill-blank",
        prompt: "Earth spins once every ______ hours, giving us day and night.",
        answer: "24",
      },
      {
        kind: "short-answer",
        prompt: "Why does Mars look red?",
        sampleAnswer:
          "Mars is covered in rusty, iron-rich dust and rocks. Rusty iron reflects a reddish color, so the whole planet looks red.",
      },
    ],
  },

  // -------------------------------------------------------------------------
  // 2. Matter: solids, liquids and gases
  // -------------------------------------------------------------------------
  {
    id: "science-primary-2",
    title: "Matter: Solids, Liquids and Gases",
    emoji: "🧊",
    minutes: 10,
    intro:
      "Ice, water and steam are the same substance in three different outfits! Meet the three states of matter and the tiny particles behind them.",
    sections: [
      {
        heading: "Three states of matter",
        body:
          "Matter is anything that takes up space — even invisible air! Everything is made of tiny particles. In a solid they are packed tightly and only vibrate in place, so solids keep their shape. In a liquid they can slide past each other, so liquids flow. In a gas they fly around freely and fill any container.",
        example:
          "🧊 solid: particles packed tight, vibrating  ·  💧 liquid: particles sliding past each other  ·  💨 gas: particles flying free",
        tip: "Matter is anything that takes up space — yes, even this air you are breathing!",
      },
      {
        heading: "Changing states",
        body:
          "Heat makes particles move faster; cooling slows them down. Heat ice and it melts into water. Heat water to 100°C and it boils into steam. Cool the steam and it condenses into droplets. Cool water to 0°C and it freezes into ice.",
        example:
          "melting: solid → liquid  ·  evaporating: liquid → gas  ·  condensing: gas → liquid  ·  freezing: liquid → solid",
      },
      {
        heading: "Try it: Blow up a balloon with a gas you make",
        body:
          "1. With a grown-up, put 3 spoonfuls of baking soda into a dry plastic bottle. 2. Pour some vinegar into a balloon, then stretch the balloon over the bottle top without spilling. 3. Lift the balloon so the vinegar pours in. 4. Watch it puff up! The fizzing is carbon dioxide gas taking up space. 5. Feel the bottle — the reaction also makes it slightly cooler.",
      },
      {
        heading: "Can you undo the change?",
        body:
          "Melting, freezing, evaporating and condensing are reversible changes — you can always change the substance back. But some changes are permanent: you cannot un-burn toast or un-bake a cake, because heating made new substances.",
        example: "Kai melted cheese on toast — the cheese could freeze back, but the toast could never be un-toasted.",
      },
    ],
    vocab: [
      { word: "matter", meaning: "Anything that takes up space, like rocks, water and air." },
      { word: "particle", meaning: "A tiny piece that matter is made of." },
      { word: "evaporate", meaning: "When a liquid slowly turns into a gas." },
      { word: "condense", meaning: "When a gas cools and turns back into a liquid." },
      { word: "reversible", meaning: "A change that can be undone." },
    ],
    funFact:
      "Scientists discovered that hot water can sometimes freeze faster than cold water! It is called the Mpemba effect, and it still keeps scientists arguing today.",
    quiz: [
      {
        question: "Which state of matter keeps its own shape?",
        options: ["Liquid", "Gas", "Solid", "Steam"],
        answerIndex: 2,
        explanation: "Solid particles are locked in place, so solids keep their shape until you force them to change.",
        misconceptions: [
          "Liquids flow and take the shape of their cup — only solids keep their own shape.",
          "Gases spread out to fill any space, so they definitely do not keep a shape.",
          "Yes! Solids hold their shape because their particles are packed tight.",
          "Steam is water as a gas — it zooms around freely and has no fixed shape.",
        ],
      },
      {
        question: "Steam touching a cold mirror turns into droplets. This change is called...",
        options: ["Evaporation", "Condensation", "Freezing", "Melting"],
        answerIndex: 1,
        explanation: "A gas cooling into a liquid is condensation — the droplets are condensed steam.",
        misconceptions: [
          "Evaporation is the opposite: a liquid turning into a gas and drifting away.",
          "Yes! Gas + cooling = liquid droplets. That is condensation.",
          "Freezing makes a solid (ice). The droplets here are liquid, not solid.",
          "Melting turns solids into liquids. Here the gas is turning into a liquid.",
        ],
      },
      {
        question: "What do particles do when matter is heated?",
        options: ["They stop moving", "They disappear", "They change color", "They move faster"],
        answerIndex: 3,
        explanation: "Heat energy makes particles vibrate and zoom faster — that is what temperature measures.",
        misconceptions: [
          "Cooling slows particles down, but heating speeds them up.",
          "Particles never vanish — matter cannot just disappear!",
          "Color can sometimes change, but the real action is particles speeding up.",
          "Yes! More heat means faster-jiggling, faster-flying particles.",
        ],
      },
      {
        question: "At what temperature does water freeze?",
        options: ["100°C", "50°C", "0°C", "10°C"],
        answerIndex: 2,
        explanation: "Water freezes into ice at 0°C and boils into steam at 100°C.",
        misconceptions: [
          "100°C is the boiling point — the hottest water gets before turning to steam.",
          "50°C is bath-too-hot water, still flowing as a liquid.",
          "Yes! At 0°C water particles slow down enough to lock into ice.",
          "At 10°C water is still liquid — just chilly water.",
        ],
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
        prompt: "Match each everyday change to its scientific name!",
        left: ["An ice cube melting in the sun", "A puddle drying up", "Steam fogging a cold mirror", "Water hardening in the freezer"],
        right: ["Freezing", "Melting", "Evaporation", "Condensation"],
        answer: [1, 2, 3, 0],
      },
      {
        kind: "practice",
        prompt: "A freezer is set to -18°C. How many degrees below freezing (0°C) is that?",
        answer: "18",
      },
      {
        kind: "draw",
        prompt: "Draw how the particles look in a solid, a liquid and a gas. Use dots and arrows!",
      },
      {
        kind: "short-answer",
        prompt: "Explain why a wet shirt dries on a sunny, windy washing line.",
        sampleAnswer:
          "The Sun warms the water particles so they evaporate into water vapor, and the wind blows the vapor away so more water can evaporate.",
      },
    ],
  },

  // -------------------------------------------------------------------------
  // 3. Energy: light, heat and sound
  // -------------------------------------------------------------------------
  {
    id: "science-primary-3",
    title: "Energy: Light, Heat and Sound",
    emoji: "💡",
    minutes: 11,
    intro:
      "You can see energy, feel energy and hear energy! Discover how light, heat and sound travel — and test them yourself.",
    sections: [
      {
        heading: "What is energy?",
        body:
          "Energy is the ability to make things happen — to move, glow, warm or make noise. It comes in many forms. Light energy lets you see. Heat energy warms you. Sound energy reaches your ears. Moving objects carry movement energy too.",
        example: "☀️ light from the Sun  ·  🔥 heat from a radiator  ·  🥁 sound from a drum",
      },
      {
        heading: "Light travels in straight lines",
        body:
          "Light zooms out from its source in straight lines. When something blocks the light, the light cannot bend around it, so a dark shadow forms behind the object. Some things make light (the Sun, a lamp, fire). Others only reflect light that hits them — like the Moon and everything around you.",
        example: "💡 light source → 🧍 you block the light → 🌑 shadow stretches behind you",
        tip: "The Moon does not make its own light — it reflects sunlight like a giant mirror.",
      },
      {
        heading: "Heat moves from hot to cold",
        body:
          "Heat energy always flows from something hot to something cooler, never the other way by itself. Touch a metal spoon in hot soup: heat flows up the spoon into your fingers. Metal is a good conductor — it passes heat along quickly. Plastic and wood are insulators that pass heat slowly.",
        example: "🔥 hot soup → 🥄 metal spoon conducts heat → 🖐️ warm handle (use a wooden spoon instead!)",
      },
      {
        heading: "Sound is shaking air",
        body:
          "Every sound starts with a vibration — something shaking back and forth fast. A drum skin vibrates, pushing the air in waves. The waves travel to your ear and make your eardrum vibrate too. Sound can travel through air, water and even solids — but not through empty space, where there is nothing to shake.",
        example: "🥁 drum vibrates → 🌊 air ripples spread out → 👂 eardrum vibrates → 🧠 brain hears 'boom!'",
      },
      {
        heading: "Try it: See sound jump",
        body:
          "1. Stretch plastic wrap tightly over a big bowl and tape it down. 2. Sprinkle a few grains of rice on top. 3. Hold a metal pot close to the bowl and bang it with a wooden spoon (not too hard!). 4. Watch the rice dance and jump. 5. The sound waves from the pot made the wrap and rice vibrate — you just SAW sound energy move!",
      },
    ],
    vocab: [
      { word: "energy", meaning: "The ability to make things move, glow, warm up or make sound." },
      { word: "vibrate", meaning: "To shake back and forth very fast." },
      { word: "shadow", meaning: "The dark area behind something that blocks light." },
      { word: "reflect", meaning: "To bounce light off a surface." },
      { word: "conductor", meaning: "A material that lets heat travel through it easily." },
    ],
    funFact:
      "Sound travels about four times faster in water than in air — that is how whales can sing to each other across huge stretches of ocean!",
    quiz: [
      {
        question: "Why does your shadow stretch behind you on a sunny day?",
        options: [
          "Your shadow is made of water vapor",
          "Light travels in straight lines and your body blocks it",
          "Shadows grow from the ground upward",
          "Light bends smoothly around your body",
        ],
        answerIndex: 1,
        explanation:
          "Light moves in straight lines and cannot bend around you, so the space behind you stays dark — that is your shadow.",
        misconceptions: [
          "Shadows are dark, not wet! They are just blocked light.",
          "Yes! Straight-line light gets blocked, leaving a dark shape behind you.",
          "Shadows are not alive — they simply appear where light cannot reach.",
          "If light could bend around you, there would be no shadow at all!",
        ],
      },
      {
        question: "The Moon glows in the night sky because it...",
        options: ["Makes its own light", "Is on fire", "Reflects sunlight", "Stores sunlight from daytime"],
        answerIndex: 2,
        explanation: "The Moon has no light of its own — it reflects light from the Sun toward us.",
        misconceptions: [
          "Unlike the Sun, the Moon does not make light — it is a big rocky ball.",
          "Nothing is burning there! The Moon has no oxygen to burn and no fire.",
          "Yes! Sunlight bounces off the Moon's surface like a mirror.",
          "The Moon cannot store light for later — it only reflects while sunlight hits it.",
        ],
      },
      {
        question: "Sound is made when objects...",
        options: ["Vibrate", "Freeze", "Light up", "Smell strong"],
        answerIndex: 0,
        explanation: "Every sound begins with a vibration that pushes waves through the air to your ears.",
        misconceptions: [
          "Freezing stops things from moving — vibration is what makes sound!",
          "Light lets you see; it is vibration that lets you hear.",
          "Strong smells come from your nose, not your ears. Sound needs shaking!",
        ],
      },
      {
        question: "A metal spoon left in hot soup gets hot because heat moves...",
        options: ["From the spoon to the soup", "From the hot soup to the cooler spoon", "From the air to the spoon", "Nowhere — metal makes its own heat"],
        answerIndex: 1,
        explanation:
          "Heat always flows from hotter to cooler. The soup passes heat into the spoon by conduction.",
        misconceptions: [
          "Heat never flows from cold to hot by itself — the soup is the heat source.",
          "Yes! Heat always flows from hot to cold, warming the cooler spoon.",
          "The soup is much hotter than the air, so the heat comes from the soup.",
          "Metal does not create heat — it just conducts heat that is already there.",
        ],
      },
    ],
    worksheet: [
      {
        kind: "fill-blank",
        prompt: "Sound is made when objects ______, or shake back and forth quickly.",
        answer: "vibrate",
      },
      {
        kind: "match",
        prompt: "Match each energy form to its example!",
        left: ["Light energy", "Heat energy", "Sound energy"],
        right: ["A ringing guitar string", "A glowing lamp", "A warm cup of cocoa"],
        answer: [1, 2, 0],
      },
      {
        kind: "practice",
        prompt:
          "Sound takes about 3 seconds to travel 1 km. If thunder arrives 6 seconds after the lightning flash, about how far away was the storm, in km?",
        answer: "2",
        hint: "6 ÷ 3",
      },
      {
        kind: "draw",
        prompt: "Draw yourself outdoors on a sunny day with your shadow. Label the light source!",
      },
      {
        kind: "fill-blank",
        prompt: "Heat always moves from ______ things to cooler things.",
        answer: "hot",
      },
      {
        kind: "short-answer",
        prompt: "Why can you hear your friends talking in the next room?",
        sampleAnswer:
          "Sound vibrations travel through the air and through the wall itself. Sound can move through solids, so voices pass right through doors and walls.",
      },
    ],
  },

  // -------------------------------------------------------------------------
  // 4. Ecosystems: food chains
  // -------------------------------------------------------------------------
  {
    id: "science-primary-4",
    title: "Ecosystems: Food Chains",
    emoji: "🦅",
    minutes: 11,
    intro:
      "Who eats whom? Follow the Sun's energy from a leaf all the way to a hawk, and meet the cleanup crew that recycles everything.",
    sections: [
      {
        heading: "Food chains: who eats what",
        body:
          "A food chain shows how food energy passes from one living thing to the next. It always starts with a producer — a plant that makes its own food using sunlight. Then come consumers, animals that must eat to get energy. The arrows point in the direction the energy travels.",
        example: "☀️ → 🌿 grass (producer) → 🐛 caterpillar → 🐦 bird → 🦅 hawk",
        tip: "The arrow means 'is eaten by' — energy flows along the arrow.",
      },
      {
        heading: "Producers, consumers and decomposers",
        body:
          "Producers, like grass and trees, capture sunlight and turn it into food. Consumers eat plants or other animals: herbivores eat plants, carnivores eat animals, and omnivores eat both. Decomposers — worms, fungi and tiny bacteria — break down dead things and return nutrients to the soil for new plants.",
        example:
          "🌿 producer  ·  🐰 herbivore  ·  🦊 carnivore  ·  🐻 omnivore  ·  🍄 decomposer — the recycling team!",
      },
      {
        heading: "Try it: Backyard food chain hunt",
        body:
          "1. Find a patch of grass, a park or a garden and sit quietly for 5 minutes. 2. Write down every living thing you spot: grass, daisies, ants, bees, birds. 3. Pick two you saw and ask: who might eat this? Who might eat the eater? 4. Draw your own 3-link food chain with arrows. 5. Never touch or disturb animals — good scientists observe gently.",
      },
      {
        heading: "What if one link breaks?",
        body:
          "Food chains connect like a stack of blocks — remove one and the whole stack wobbles. If all the caterpillars vanished, baby birds would starve, hawks would lose their prey, and uneaten plants could take over. Every link matters.",
        example: "Fewer caterpillars → fewer birds → fewer hawks... AND more munching caterpillars' plants!",
      },
    ],
    vocab: [
      { word: "producer", meaning: "A living thing, like a plant, that makes its own food." },
      { word: "consumer", meaning: "A living thing that eats other living things for energy." },
      { word: "decomposer", meaning: "A living thing that breaks down dead material, like a worm or fungus." },
      { word: "predator", meaning: "An animal that hunts other animals for food." },
      { word: "prey", meaning: "An animal that gets hunted by a predator." },
    ],
    funFact:
      "One old oak tree can support over 2,000 other species — birds, insects, fungi and more. A single tree can be a whole food web!",
    quiz: [
      {
        question: "Every food chain starts with...",
        options: ["A producer that makes its own food", "A fierce predator", "The biggest animal around", "A decomposer"],
        answerIndex: 0,
        explanation: "Plants capture the Sun's energy and turn it into food, so chains always begin with producers.",
        misconceptions: [
          "Yes! Only producers can turn sunlight into food, so they start every chain.",
          "Predators come later in the chain — they need prey to eat first!",
          "Even the biggest animal needs food that starts with a plant.",
          "Decomposers recycle at the end of the story — they do not start chains.",
        ],
      },
      {
        question: "The arrows in a food chain show...",
        options: ["How far each animal travels", "Which animal is oldest", "How energy in food moves", "Who runs fastest"],
        answerIndex: 2,
        explanation: "The arrow points from the eaten to the eater — it shows energy flowing along the chain.",
        misconceptions: [
          "Arrows are not about journeys — they are about who eats whom.",
          "Age does not matter in a food chain — energy flow does!",
          "Yes! An arrow from grass to rabbit means energy moved from grass into rabbit.",
          "Speed has nothing to do with it — arrows track food energy, not races.",
        ],
      },
      {
        question: "Worms and fungi are important because they...",
        options: ["Break down dead things and return nutrients to the soil", "Hunt prey like predators", "Make food from sunlight", "Drink all the water in the soil"],
        answerIndex: 0,
        explanation: "Decomposers recycle dead material into soil nutrients that plants need to grow.",
        misconceptions: [
          "Yes! Decomposers are nature's recycling crew.",
          "Worms and fungi are not hunters — they munch on dead and decaying material.",
          "Only plants with chlorophyll can make food from sunlight. Fungi cannot!",
          "Worms actually help water soak into soil — they do not drink it all!",
        ],
      },
      {
        question: "If all the plants in a habitat died, the animals would...",
        options: ["Grow bigger", "Run out of food and struggle to survive", "Start making food from sunlight", "Move underground and be fine"],
        answerIndex: 1,
        explanation: "Plants feed every food chain. Without them, herbivores starve first, then predators too.",
        misconceptions: [
          "No plants means less food, not more — animals cannot grow without energy.",
          "Yes! Every chain starts with plants, so losing them shakes the whole habitat.",
          "Animals cannot photosynthesize — only producers can use sunlight to make food.",
          "Some animals live underground, but they still need food from above!",
        ],
      },
    ],
    worksheet: [
      {
        kind: "fill-blank",
        prompt: "A food chain always starts with a ______ that makes its own food using sunlight.",
        answer: "producer",
      },
      {
        kind: "match",
        prompt: "Match each living thing to its role!",
        left: ["Grass", "Rabbit", "Fox", "Mushroom"],
        right: ["A consumer that hunts other animals", "A producer", "A consumer that eats plants", "A decomposer"],
        answer: [1, 2, 0, 3],
      },
      {
        kind: "practice",
        prompt: "A hawk catches 3 snakes. Each snake ate 2 mice. How many mice fed those snakes?",
        answer: "6",
        hint: "3 × 2",
      },
      {
        kind: "draw",
        prompt: "Draw a food chain with 4 living things and arrows. It must start with a plant!",
      },
      {
        kind: "fill-blank",
        prompt: "Animals that eat only plants are called ______.",
        answer: "herbivores",
      },
      {
        kind: "short-answer",
        prompt: "Predict: what happens to the rabbits and hawks in a meadow if all the foxes leave?",
        sampleAnswer:
          "With fewer predators, the rabbit population may grow at first. But more rabbits eat more grass, and hawks may catch more rabbits. Everything in the ecosystem shifts like ripples.",
      },
    ],
  },

  // -------------------------------------------------------------------------
  // 5. The human body: organs that keep us alive
  // -------------------------------------------------------------------------
  {
    id: "science-primary-5",
    title: "The Human Body: Organs That Keep Us Alive",
    emoji: "🫀",
    minutes: 10,
    intro:
      "Right now, inside you, a pump is beating and airbags are breathing — no days off! Meet the organ team that keeps you going.",
    sections: [
      {
        heading: "Your body's life-support team",
        body:
          "Organs are body parts with big jobs. Your heart pumps blood. Your lungs breathe in air. Your brain sends messages. Your stomach breaks down food. Your kidneys clean your blood. They all work together like a relay team — and you are the prize they are racing for!",
        example: "🫁 lungs grab oxygen → 🫀 heart pumps it in blood → 🦵 muscles burn it to let you run",
      },
      {
        heading: "Heart and blood: the delivery service",
        body:
          "Your heart is a muscle about the size of your fist. It squeezes over and over, pushing blood through tubes called blood vessels. Blood delivers oxygen and food energy to every cell and carries away waste. Feel your wrist and you can feel this delivery service at work — that is your pulse!",
        example: "🫀 pump → 🩸 blood carries oxygen + food → every cell gets energy",
      },
      {
        heading: "Lungs: breathing in life",
        body:
          "You breathe about 20,000 times a day! Air rushes into your lungs, where oxygen hops into your blood. At the same time, carbon dioxide — a waste gas your cells make — hops out and leaves when you breathe out. Your lungs swap the gases, and your blood does the delivering.",
        example: "Breath in: 🌬️ oxygen goes in  ·  Breath out: 💨 carbon dioxide goes out",
      },
      {
        heading: "Try it: Feel your heart work",
        body:
          "1. Sit quietly. Find your pulse on your wrist or neck. 2. With a grown-up timing you, count your beats for 15 seconds, then multiply by 4 to get beats per minute. Write it down. 3. Do 20 jumping jacks. 4. Count your pulse again right away — wow, faster! 5. Wait 2 minutes and count once more. Why does your heart speed up? Why does it calm down?",
      },
    ],
    vocab: [
      { word: "organ", meaning: "A body part with a special job, like the heart or lungs." },
      { word: "heart", meaning: "The muscle that pumps blood around your body." },
      { word: "lungs", meaning: "The organs that take in oxygen and let out carbon dioxide." },
      { word: "oxygen", meaning: "The gas in air that your cells need for energy." },
      { word: "pulse", meaning: "The thumping you can feel each time your heart beats." },
    ],
    funFact:
      "Your heart beats about 100,000 times a day, pushing blood through vessels that could stretch over 100,000 km — more than twice around the Earth!",
    quiz: [
      {
        question: "Which organ pumps blood around your body?",
        options: ["The stomach", "The brain", "The lungs", "The heart"],
        answerIndex: 3,
        explanation: "The heart is a muscle that squeezes to push blood to every part of you.",
        misconceptions: [
          "The stomach squeezes food, not blood — digestion is its job.",
          "The brain sends the signals, but the heart does the pumping!",
          "Lungs breathe air. The blood still needs the heart to move it.",
          "Yes! The heart squeezes about 100,000 times a day.",
        ],
      },
      {
        question: "What do your lungs take in from the air?",
        options: ["Carbon dioxide", "Oxygen", "Water", "Food"],
        answerIndex: 1,
        explanation: "Your lungs grab oxygen from the air and pass it into your blood.",
        misconceptions: [
          "Carbon dioxide is the waste gas you breathe OUT, not in.",
          "Yes! Oxygen rides in your blood to every cell that needs energy.",
          "You drink water — lungs handle gases, not liquids.",
          "Food travels through your stomach, never your lungs!",
        ],
      },
      {
        question: "Which organ is the control center that sends messages everywhere?",
        options: ["The brain", "The heart", "The stomach", "The skin"],
        answerIndex: 0,
        explanation: "The brain sends electrical signals through your body to control everything you do.",
        misconceptions: [
          "Yes! The brain is the boss, sending messages faster than you can think 'brain'.",
          "The heart beats on its own, but the brain still tells it to speed up or slow down.",
          "The stomach digests food. It follows orders — it does not give them.",
          "Skin feels touch and protects you. The brain does the deciding.",
        ],
      },
      {
        question: "After you run around, your pulse...",
        options: ["Stops completely", "Turns into breathing", "Slows down immediately", "Beats faster"],
        answerIndex: 3,
        explanation: "Running muscles need more oxygen, so your heart pumps faster to deliver it.",
        misconceptions: [
          "Your heart never takes a break — it would stop delivering oxygen!",
          "Pulse and breathing work together, but one does not turn into the other.",
          "Your pulse stays fast for a while — it takes time to calm back down.",
          "Yes! Faster beating delivers more oxygen to your hard-working muscles.",
        ],
      },
    ],
    worksheet: [
      {
        kind: "fill-blank",
        prompt: "Your ______ is a muscle that pumps blood all around your body.",
        answer: "heart",
      },
      {
        kind: "match",
        prompt: "Match each organ to its job!",
        left: ["Heart", "Lungs", "Brain", "Stomach"],
        right: ["Breathes in oxygen", "Squeezes and mashes food", "Pumps blood", "Controls everything with signals"],
        answer: [2, 0, 3, 1],
      },
      {
        kind: "practice",
        prompt: "Your heart beats about 75 times each minute. About how many beats is that in 4 minutes?",
        answer: "300",
        hint: "75 × 4",
      },
      {
        kind: "draw",
        prompt: "Draw your chest and label where your heart and lungs are. Add arrows for the blood!",
      },
      {
        kind: "fill-blank",
        prompt: "You breathe in ______ and breathe out carbon dioxide.",
        answer: "oxygen",
      },
      {
        kind: "short-answer",
        prompt: "Why do you breathe faster when you run?",
        sampleAnswer:
          "Running muscles burn energy quickly, so they need more oxygen and make more carbon dioxide. Your lungs breathe faster to bring oxygen in and push carbon dioxide out.",
      },
    ],
  },

  // -------------------------------------------------------------------------
  // 6. Forces: pushes, pulls and friction
  // -------------------------------------------------------------------------
  {
    id: "science-primary-6",
    title: "Forces: Pushes, Pulls and Friction",
    emoji: "🛷",
    minutes: 10,
    intro:
      "Every kick, catch and slide is a force at work! Meet pushes, pulls, friction and gravity — the invisible helpers and stoppers.",
    sections: [
      {
        heading: "Forces are pushes and pulls",
        body:
          "A force is simply a push or a pull. Forces can start things moving, stop them, speed them up, slow them down or change their direction. Scientists measure forces in units called newtons (N), named after Isaac Newton.",
        example: "👉 push a cart forward  ·  👈 pull a wagon behind you  ·  🧲 magnet pulls a paper clip",
      },
      {
        heading: "Friction: the grippy force",
        body:
          "When two surfaces rub together, a force called friction tries to slow them down. Rough surfaces grip a lot; smooth ones grip less. Friction is often helpful — it lets your shoes grip the floor and your bike brakes stop the wheels. But it also slows down sleds and slides, which is why smooth slides are faster!",
        example: "🧦 carpet = strong friction, slow slide  ·  🛷 smooth ice = weak friction, zoom!",
      },
      {
        heading: "Gravity: Earth's pull",
        body:
          "Gravity is the force that pulls everything toward the center of the Earth. Drop a pencil and gravity pulls it down. Gravity is why you land back on the ground when you jump — and why sleds speed downhill.",
        example: "🍎 drop an apple → gravity pulls it down → thud!",
        tip: "Pushing uphill fights gravity. Sliding downhill, gravity is on your side.",
      },
      {
        heading: "Try it: Friction ramp race",
        body:
          "1. Prop a small board or cardboard on a book to make a ramp. 2. Lay different surfaces at the bottom: a towel, a smooth tray, a piece of carpet. 3. Slide the same toy car down the ramp onto each surface. 4. Measure how far it goes with a ruler each time. 5. Which surface stopped it soonest? That one had the most friction!",
      },
    ],
    vocab: [
      { word: "force", meaning: "A push or a pull that can change how things move." },
      { word: "friction", meaning: "The force made when two surfaces rub together; it slows things down." },
      { word: "gravity", meaning: "The force that pulls things toward the center of the Earth." },
      { word: "newton", meaning: "The unit scientists use to measure force (N)." },
      { word: "surface", meaning: "The outside of something you touch or slide on." },
    ],
    funFact:
      "A gecko can run up a wall because its toes are covered in millions of microscopic hairs that grip the surface — friction, supercharged!",
    quiz: [
      {
        question: "A push or a pull is called a...",
        options: ["Friction", "Shadow", "Force", "Circuit"],
        answerIndex: 2,
        explanation: "Any push or pull is a force — measured in newtons.",
        misconceptions: [
          "Friction is one special force, but pushes and pulls in general are called forces.",
          "Shadows are blocked light — they cannot push anything!",
          "Yes! Kick a ball or tug a rope: both are forces.",
          "A circuit is a loop for electricity, nothing to do with pushes and pulls.",
        ],
      },
      {
        question: "Friction always tries to...",
        options: ["Make things float", "Speed things up", "Make things lighter", "Slow moving things down"],
        answerIndex: 3,
        explanation: "Friction acts between rubbing surfaces and always opposes movement.",
        misconceptions: [
          "Floating is about floating, not rubbing! Friction has no magic lift.",
          "Friction is a stopper, not a speeder — it fights motion.",
          "Friction cannot change how heavy something is — weight stays the same.",
          "Yes! Rubbing surfaces always try to slow each other down.",
        ],
      },
      {
        question: "Which surface would create the MOST friction for a sliding box?",
        options: ["Smooth ice", "Thick carpet", "A polished table", "A wet slide"],
        answerIndex: 1,
        explanation: "Rough, fuzzy carpet grips the box hardest, so friction is strongest there.",
        misconceptions: [
          "Ice is famously slippery — very little friction there!",
          "Yes! Carpet's fuzzy roughness grips the box the most.",
          "Polished tables are smooth, so the box slides with little grip.",
          "Wet slides are slippery on purpose — water reduces friction.",
        ],
      },
      {
        question: "The force that pulls a dropped apple toward the ground is...",
        options: ["Gravity", "Magnetism", "Sound", "Friction"],
        answerIndex: 0,
        explanation: "Gravity pulls everything toward the center of the Earth.",
        misconceptions: [
          "Yes! Gravity is Earth's pull on everything, from apples to astronauts.",
          "Magnets pull only some metals — apples are not magnetic!",
          "Sound is shaking air. It cannot pull an apple down.",
          "Friction happens between rubbing surfaces. An apple falling through air barely touches anything.",
        ],
      },
    ],
    worksheet: [
      {
        kind: "fill-blank",
        prompt: "______ is the force made when two surfaces rub together.",
        answer: "Friction",
      },
      {
        kind: "match",
        prompt: "Match each situation to the force doing it!",
        left: ["Gravity", "Friction", "Push", "Pull"],
        right: ["Slows a sled sliding on grass", "Pulls a dropped ball to the ground", "Opens a drawer toward you", "Starts a shopping cart moving"],
        answer: [1, 0, 3, 2],
      },
      {
        kind: "practice",
        prompt:
          "Leo pushes his sled with 20 N of force while friction pushes back with 5 N. How many newtons of force still move the sled forward?",
        answer: "15",
        hint: "20 − 5",
      },
      {
        kind: "draw",
        prompt: "Draw yourself on a sled. Add arrows for the push, gravity pulling down and friction rubbing back!",
      },
      {
        kind: "fill-blank",
        prompt: "The force that pulls everything toward the center of Earth is ______.",
        answer: "gravity",
      },
      {
        kind: "short-answer",
        prompt: "Why do sidewalks get extra slippery when they are icy?",
        sampleAnswer:
          "Ice makes a very smooth, wet surface, so there is much less friction between your shoes and the ground. With less grip, your shoes slide instead of stopping.",
      },
    ],
  },

  // -------------------------------------------------------------------------
  // 7. Electricity: simple circuits
  // -------------------------------------------------------------------------
  {
    id: "science-primary-7",
    title: "Electricity: Simple Circuits",
    emoji: "⚡",
    minutes: 11,
    intro:
      "Flip a switch and light appears — but why? Build your own circuits and discover how electricity flows and what it can flow through.",
    sections: [
      {
        heading: "What is electricity?",
        body:
          "Electricity is energy carried by tiny charged particles that flow through materials like metal wires. Batteries store electrical energy and push it around a circuit. Wall sockets carry much stronger electricity that is dangerous — never experiment with those!",
        example: "🔋 battery = a small, safe energy pump  ·  🏠 wall socket = strong and dangerous, hands off!",
        tip: "Only ever use batteries for your experiments.",
      },
      {
        heading: "A complete circuit",
        body:
          "Electricity needs a complete loop to flow: from the battery, through wires, through a bulb, and back to the battery. One tiny gap and the flow stops — like a drawbridge left open. A switch is just a way to open and close the gap on purpose.",
        example: "🔋 battery → wire → 💡 bulb → wire → back to battery = glowing!  ·  Any gap = dark.",
      },
      {
        heading: "Try it: Build a circuit and test conductors",
        body:
          "1. With a grown-up, connect a 1.5 V battery to a small bulb with two wires so it lights. 2. Disconnect one wire at one end. 3. Now touch that free end and the bulb end to the same object — a metal spoon, then a plastic ruler. 4. If the bulb lights, electricity flowed through the object: it is a conductor! 5. Test 5 objects and sort them. 6. Unhook the battery when you finish.",
      },
      {
        heading: "Conductors and insulators",
        body:
          "Materials that let electricity flow through are conductors — almost all metals, like copper, steel and aluminum. Materials that block it are insulators, like plastic, rubber, wood and glass. That is why wires are metal inside with a plastic coat outside: the metal carries the flow, and the plastic keeps it from escaping and keeps you safe.",
        example: "🥄 metal spoon = conductor  ·  🥢 plastic ruler = insulator",
      },
    ],
    vocab: [
      { word: "circuit", meaning: "A complete loop that electricity flows around." },
      { word: "battery", meaning: "A store of electrical energy that pushes the flow around a circuit." },
      { word: "conductor", meaning: "A material that lets electricity flow through it, like metal." },
      { word: "insulator", meaning: "A material that blocks electricity, like plastic." },
      { word: "switch", meaning: "A part that opens or closes a circuit to stop or start the flow." },
    ],
    funFact:
      "An electric eel can produce a shock of about 600 volts — around five times a wall socket — to stun its prey. Zap!",
    quiz: [
      {
        question: "A bulb lights up only when the circuit is...",
        options: ["Very long", "Full of air", "Made of plastic", "Complete, with no gaps"],
        answerIndex: 3,
        explanation: "Electricity needs a closed loop. Any gap in the circuit stops the flow instantly.",
        misconceptions: [
          "Long or short does not matter — a complete loop does!",
          "Extra air in the loop does nothing. Electricity flows through metal, not air.",
          "Plastic blocks electricity — a plastic circuit would stay dark.",
          "Yes! A complete loop lets the current flow all the way around.",
        ],
      },
      {
        question: "Which material is a conductor?",
        options: ["A rubber band", "A plastic ruler", "A copper wire", "A wooden spoon"],
        answerIndex: 2,
        explanation: "Metals like copper let electricity flow easily — that is why wires are made of copper.",
        misconceptions: [
          "Rubber blocks electricity so well that it is used for safety gloves.",
          "Plastic is an insulator — it is the safety coat around real wires.",
          "Yes! Copper is a top conductor, used in almost every wire.",
          "Wood is an insulator. Use a wooden spoon safely near the stove.",
        ],
      },
      {
        question: "A switch turns a light off by...",
        options: ["Opening a gap in the circuit", "Adding more wires", "Making the battery bigger", "Freezing the bulb"],
        answerIndex: 0,
        explanation: "Flipping the switch opens the loop, so the current cannot flow and the light goes out.",
        misconceptions: [
          "Yes! The switch breaks the loop, and the flow stops in a flash.",
          "More wires would not stop the flow — only a gap in the loop can.",
          "The battery size changes the energy, but only a gap stops the flow.",
          "Bulbs do not care about temperature that way — they go dark when the loop opens.",
        ],
      },
      {
        question: "The plastic coating around a wire is there to...",
        options: ["Make the electricity stronger", "Stop the electricity escaping and keep you safe", "Turn the wire into a magnet", "Help bulbs glow brighter"],
        answerIndex: 1,
        explanation: "Plastic is an insulator. It keeps the current inside the wire and away from your hands.",
        misconceptions: [
          "Insulators cannot boost electricity — they block it, which is the point!",
          "Yes! The plastic coat traps the flow inside and protects you.",
          "The plastic coat is not magnetic — it is a safety barrier.",
          "Brightness depends on the battery and bulb, not the coat.",
        ],
      },
    ],
    worksheet: [
      {
        kind: "fill-blank",
        prompt: "A bulb only lights when the circuit is ______, with no gaps.",
        answer: "complete",
      },
      {
        kind: "match",
        prompt: "Match each object to conductor or insulator!",
        left: ["Paper clip", "Plastic ruler", "Aluminum foil", "Rubber band"],
        right: ["Insulator", "Conductor", "Insulator", "Conductor"],
        answer: [1, 0, 3, 2],
      },
      {
        kind: "practice",
        prompt: "One battery gives 1.5 volts. Maya connects 2 batteries end to end in her circuit. How many volts now?",
        answer: "3",
        hint: "1.5 + 1.5",
      },
      {
        kind: "draw",
        prompt: "Draw a complete circuit: battery, two wires and a bulb. Add arrows to show the flow going around the loop!",
      },
      {
        kind: "fill-blank",
        prompt: "Materials that let electricity pass through them are called ______.",
        answer: "conductors",
      },
      {
        kind: "short-answer",
        prompt: "Why does the bulb go out when you open the switch?",
        sampleAnswer:
          "Opening the switch makes a gap in the circuit. Electricity needs a complete loop to flow, so the current stops and the bulb goes dark.",
      },
    ],
    challenge: {
      prompt:
        "Brighter with two? Add a second bulb to your circuit, in a row (one after the other). Predict: brighter, the same, or dimmer? Then test it!",
      hint: "Both bulbs must share the same battery's energy as the current flows through them one by one.",
      steps: [
        "Build a circuit that lights one bulb brightly.",
        "Write your prediction: two bulbs in a row = brighter, same or dimmer?",
        "Connect a second bulb so the current flows through both, one after the other.",
        "Compare the brightness with your one-bulb circuit.",
        "Try it again with the bulbs side by side in separate loops — compare that too!",
      ],
      answer: "Two bulbs in a row glow DIMMER than one bulb alone.",
      answerWhy:
        "The same electric current has to flow through both bulbs one after the other, and they share the battery's energy between them, so each one glows less brightly. (Bulbs in separate loops each get their own path, so they stay bright — that is how houses are wired!)",
    },
  },

  // -------------------------------------------------------------------------
  // 8. Earth science: rocks, volcanoes and the water cycle
  // -------------------------------------------------------------------------
  {
    id: "science-primary-8",
    title: "Earth Science: Rocks, Volcanoes and the Water Cycle",
    emoji: "🌋",
    minutes: 11,
    intro:
      "Under your feet, rocks are made, pushed and melted — and above your head, water is looping around the planet nonstop!",
    sections: [
      {
        heading: "Three kinds of rocks",
        body:
          "Igneous rocks form when melted rock cools and hardens — think of black, glassy rocks near old volcanoes. Sedimentary rocks form in layers at the bottom of rivers and seas, pressed together over millions of years — they often hold fossils. Metamorphic rocks form deep underground when heat and squeezing change older rocks into new ones.",
        example:
          "🌋 lava cools → igneous  ·  🏞️ sand and shells press into layers → sedimentary  ·  🔥 heat + squeeze → metamorphic",
        tip: "Igneous = fire-born. Sedimentary = settled layers. Metamorphic = changed shape.",
      },
      {
        heading: "Volcanoes: mountains that erupt",
        body:
          "Deep underground, rock is so hot it melts into magma. Magma is lighter than solid rock, so it rises through cracks. When it bursts out of a volcano it is called lava, and it flows and cools into brand-new rock. Ash and gas puff out too — sometimes spectacularly!",
        example: "Magma underground = 🌡️  ·  Lava above ground = 🌋  ·  Cooled lava = new igneous rock!",
      },
      {
        heading: "The water cycle",
        body:
          "Earth's water never sits still. The Sun evaporates water from oceans into invisible vapor. High up, the vapor cools and condenses into clouds. When droplets grow heavy, precipitation falls as rain, snow or hail. Rivers gather the water and carry it back to the sea — and the giant loop starts again!",
        example: "🌊 evaporates → ☁️ condenses → 🌧️ precipitates → 🏞️ collects → back to the sea → repeat forever",
      },
      {
        heading: "Try it: Mini water cycle in a bag",
        body:
          "1. With a grown-up, pour a shallow layer of water into a strong zip-top bag. 2. Tape the bag flat against a sunny window. 3. Check it after an hour and the next day. 4. You should see fog on the plastic and droplets sliding down — evaporation, condensation and even 'rain' running back to the puddle below!",
      },
    ],
    vocab: [
      { word: "magma", meaning: "Melted rock beneath Earth's surface." },
      { word: "lava", meaning: "Melted rock that has reached the surface." },
      { word: "evaporation", meaning: "When a liquid turns into a gas and rises." },
      { word: "condensation", meaning: "When a gas cools into tiny liquid droplets." },
      { word: "precipitation", meaning: "Water falling from clouds as rain, snow, sleet or hail." },
    ],
    funFact:
      "The water you drank today may once have been sipped by a dinosaur! Earth has been recycling the same water for around 4 billion years.",
    quiz: [
      {
        question: "Melted rock beneath Earth's surface is called...",
        options: ["Sediment", "Lava", "Magma", "Ice"],
        answerIndex: 2,
        explanation: "Magma is melted rock underground. Once it erupts above the surface, it becomes lava.",
        misconceptions: [
          "Sediment is sand and mud that settles in layers — no melting involved.",
          "Lava is the above-ground name! Underground melted rock is magma.",
          "Yes! Magma bubbles underground, waiting for a chance to rise.",
          "Ice is frozen water — cool, but not even close to melted rock!",
        ],
      },
      {
        question: "Which rock forms when lava cools and hardens?",
        options: ["Igneous", "Sedimentary", "Metamorphic", "Sponge rock"],
        answerIndex: 0,
        explanation: "Cooling melted rock makes igneous rock — like basalt and obsidian.",
        misconceptions: [
          "Yes! Igneous means 'fire-born' — it is frozen lava or magma.",
          "Sedimentary rocks build up in layers over ages, not from cooling lava.",
          "Metamorphic rocks are old rocks changed by heat and pressure underground.",
          "Good try — but rocks do not come in sponge form!",
        ],
      },
      {
        question: "In the water cycle, clouds form when water vapor...",
        options: ["Freezes into ice cubes", "Turns into sand", "Sinks to the ocean floor", "Cools and condenses"],
        answerIndex: 3,
        explanation: "Rising vapor cools high in the sky and condenses into tiny droplets that make clouds.",
        misconceptions: [
          "Freezing makes snow or hail, not the clouds themselves — clouds are droplets.",
          "Sand never falls from the sky here! Clouds are made of water droplets.",
          "Vapor is lighter than air — it rises, it does not sink!",
          "Yes! Cooling vapor condenses into the tiny droplets that build clouds.",
        ],
      },
      {
        question: "Rain, snow, sleet and hail are all kinds of...",
        options: ["Evaporation", "Condensation", "Precipitation", "Collection"],
        answerIndex: 2,
        explanation: "Any water falling from clouds — rain, snow, sleet or hail — is precipitation.",
        misconceptions: [
          "Evaporation is water rising UP as vapor, not falling down.",
          "Condensation builds clouds. Precipitation is when the water falls!",
          "Yes! Whatever falls from a cloud is precipitation.",
          "Collection is the last step, when water gathers in rivers, lakes and oceans.",
        ],
      },
    ],
    worksheet: [
      {
        kind: "fill-blank",
        prompt: "Melted rock beneath Earth's surface is called ______.",
        answer: "magma",
      },
      {
        kind: "match",
        prompt: "Match each rock type to how it forms!",
        left: ["Igneous rock", "Sedimentary rock", "Metamorphic rock"],
        right: [
          "Layers of sand and shells pressed together over time",
          "Melted rock that cooled and hardened",
          "An old rock squeezed and heated until it changed",
        ],
        answer: [1, 0, 2],
      },
      {
        kind: "practice",
        prompt: "A sunny puddle loses 200 mL of water each hour to evaporation. How many mL evaporate in 3 hours?",
        answer: "600",
        hint: "200 × 3",
      },
      {
        kind: "draw",
        prompt: "Draw the water cycle as a loop: ocean, cloud, rain, river — with arrows showing the way!",
      },
      {
        kind: "fill-blank",
        prompt: "When water vapor cools into droplets, we call it ______.",
        answer: "condensation",
      },
      {
        kind: "short-answer",
        prompt: "Follow one raindrop: explain how water that falls on a mountain can end up back in the ocean.",
        sampleAnswer:
          "It soaks into the soil or flows downhill into streams, streams join rivers, and rivers carry the water to the ocean. Then the Sun evaporates it into a cloud and the cycle starts again.",
      },
    ],
  },
];
