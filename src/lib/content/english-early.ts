// English — Early Learning (ages 6-8)
// Six lessons: nouns, verbs, capital letters & full stops, adjectives,
// rhyming words and simple sentences. Short sentences, everyday examples,
// lots of warmth — big ideas in tiny, friendly bites.
import type { Lesson } from "./types";

export const lessons: Lesson[] = [
  // -------------------------------------------------------------------------
  // 1. Nouns: People, Places, Things
  // -------------------------------------------------------------------------
  {
    id: "english-early-1",
    title: "Nouns: People, Places, Things",
    emoji: "🔎",
    minutes: 6,
    intro:
      "Words are hiding all around you — and some of them are NAME words! Let's go noun hunting.",
    sections: [
      {
        heading: "Nouns Are Naming Words",
        body:
          "A noun names something. If you can see it, visit it, or give it a high-five, it might be a noun! A noun can name a person (teacher), a place (park), or a thing (balloon).",
        example:
          "Yuki, school, and backpack are all nouns. Yuki is a person, school is a place, and a backpack is a thing!",
        tip: "Point at something right now. Its name is a noun. You just found one!",
      },
      {
        heading: "Nouns Are Everywhere!",
        body:
          "Look around your room: lamp, floor, teddy bear. Look outside: tree, road, cloud. Even your OWN name is a noun — names of people are nouns too.",
        example:
          "At the beach you can spot nouns in seconds: sand (thing), ocean (place), Leo (person splashing in the waves).",
        tip: "Pet names count! If you have a cat named Miso, 'Miso' is a noun.",
      },
      {
        heading: "Sorting Your Noun Treasure",
        body:
          "Good noun hunters sort their finds into three treasure chests: PEOPLE, PLACES, and THINGS. Try it with any words you spot.",
        example:
          "Magnet, doctor, kitchen. Doctor goes in the PEOPLE chest, kitchen in the PLACES chest, and magnet in the THINGS chest.",
        tip: "Ask: is it someone, someWHERE, or something?",
      },
    ],
    vocab: [
      { word: "noun", meaning: "A word that names a person, a place, or a thing." },
      { word: "person", meaning: "Someone — like a teacher, a friend, or you!" },
      { word: "place", meaning: "Somewhere you can go — like a park or a kitchen." },
      { word: "thing", meaning: "Something you can touch or see — like a spoon or a kite." },
    ],
    funFact:
      "'Noun' comes from the Latin word 'nomen', which means 'name' — so a noun really is just a fancy name for a naming word!",
    quiz: [
      {
        question: "Which word is a noun?",
        options: ["jump", "playground", "quickly", "happy"],
        answerIndex: 1,
        explanation:
          "A noun names a person, place, or thing. 'Playground' names a place — so it's a noun!",
        misconceptions: [
          "'Jump' shows an action — that makes it a verb, not a noun.",
          "Yes! 'Playground' names a place, and naming words are nouns.",
          "'Quickly' tells HOW you do something — it's a describing word for actions, not a name.",
          "'Happy' describes a feeling — it tells what something is like, but it doesn't NAME anything.",
        ],
      },
      {
        question: "Which of these names a PLACE?",
        options: ["toothbrush", "Amina", "library", "fluffy"],
        answerIndex: 2,
        explanation: "A library is a place you can visit — so 'library' is a place-noun!",
        misconceptions: [
          "A toothbrush is a thing you can hold — a thing-noun, not a place.",
          "Amina is a person! People are nouns too, just not PLACES.",
          "That's it! A library is somewhere you can go.",
          "'Fluffy' describes what something feels like — it's a describing word.",
        ],
      },
      {
        question: "In 'The dog chased the ball', which word is a noun?",
        options: ["chased", "dog", "quickly", "the"],
        answerIndex: 1,
        explanation:
          "'Dog' names an animal — animals are things-nouns too! ('Ball' is a noun as well.)",
        misconceptions: [
          "'Chased' is the action word — the verb. The noun is WHO the sentence is about!",
          "Right! 'Dog' names a furry friend, so it's a noun.",
          "'Quickly' tells how the dog chased — it's a describing word for the action.",
          "'The' is a tiny helper word — it points at nouns but isn't one itself.",
        ],
      },
      {
        question: "Which word names a person?",
        options: ["soup", "spoon", "Grandpa", "kitchen"],
        answerIndex: 2,
        explanation: "Grandpa is a person — and people are nouns!",
        misconceptions: [
          "Soup is a thing you can eat — a thing-noun.",
          "A spoon is a thing too — it names an object, not a person.",
          "Yes! Grandpa is a person, so 'Grandpa' is a person-noun.",
          "A kitchen is a place — it's a noun, but a place-noun.",
        ],
      },
    ],
    worksheet: [
      {
        kind: "fill-blank",
        prompt: "A noun names a person, ______, or thing.",
        answer: "place",
        hint: "You can visit one!",
      },
      {
        kind: "fill-blank",
        prompt: "In 'The cat sat on the mat', the two nouns are cat and ______.",
        answer: "mat",
      },
      {
        kind: "match",
        prompt: "Match each noun to what it names!",
        left: ["Yuki", "park", "balloon"],
        right: ["a thing", "a person", "a place"],
        answer: [1, 2, 0],
      },
      {
        kind: "build-sentence",
        prompt: "Tap the words to build a sentence about a noun find!",
        words: ["found", "a", "Leo", "shiny", "rock"],
        answer: "Leo found a shiny rock.",
      },
      {
        kind: "fill-blank",
        prompt: "Names of people are nouns too. Your own name is a ______.",
        answer: "noun",
      },
      {
        kind: "short-answer",
        prompt: "Look around your room and name three nouns you can see.",
        sampleAnswer: "I can see a book, a lamp, and a door.",
      },
    ],
    challenge: {
      prompt:
        "Noun hunt: find three nouns hiding in a kitchen — one person-noun (or pet!), one place-noun, and one thing-noun.",
      hint: "A pet with a name counts as a person-noun! Look for the big cold box, a sunny spot, a useful drawer…",
      steps: [
        "Picture a kitchen (or go look at a real one!).",
        "Find a person-noun: someone who could be there, like Sam, Mom, or the dog Biscuit.",
        "Find a place-noun: a spot like the sink, the corner, or the pantry.",
        "Find a thing-noun: an object like a spoon, a pot, or a fridge magnet.",
        "Say all three out loud: person, place, thing!",
      ],
      answer: "Example: Sam (person), sink (place), spoon (thing).",
      answerWhy:
        "Each word NAMES something: a person, a place, and a thing. Naming words are always nouns — even a silly made-up word like 'gigglepot' would be a noun if it named something!",
    },
  },

  // -------------------------------------------------------------------------
  // 2. Action Words (Verbs)
  // -------------------------------------------------------------------------
  {
    id: "english-early-2",
    title: "Action Words (Verbs)",
    emoji: "🏃",
    minutes: 6,
    intro:
      "Run! Jump! Giggle! Verbs are the action words that make sentences MOVE. Ready to act some out?",
    sections: [
      {
        heading: "Verbs Are Doing Words",
        body:
          "A verb shows what someone or something DOES. If you can do it with your body, it's probably a verb: run, hop, wiggle, sneeze!",
        example:
          "In 'The frog hops', 'hops' is the verb — it tells you the frog's action.",
        tip: "Act the word out. If you can DO it, it's a verb!",
      },
      {
        heading: "Verbs Give Sentences Energy",
        body:
          "A sentence without a verb just sits there. 'The dog…' the dog WHAT? Add a verb and — zoom! — the dog barks, runs, or naps. The verb is the engine.",
        example:
          "'Kai kicks the ball.' Kicks is the verb. Kai does the action, and the ball goes flying!",
        tip: "Every sentence needs at least one verb. It's the engine that makes it go!",
      },
      {
        heading: "Even Quiet Verbs Count",
        body:
          "Some verbs are noisy: shout, stomp, clap. Some verbs are sleepy: rest, dream, yawn. They're ALL verbs, because they all show what happens.",
        example:
          "'The kitten sleeps.' Not much action — but 'sleeps' is still the verb!",
        tip: "Sleeping, thinking, and giggling are all actions too.",
      },
    ],
    vocab: [
      { word: "verb", meaning: "An action word — it shows what someone or something does." },
      { word: "action", meaning: "Doing something, like running, jumping, or singing." },
      { word: "sentence", meaning: "A group of words that tells a whole idea." },
    ],
    funFact:
      "The word 'run' is a champion verb — the Oxford English Dictionary lists around 645 different ways to use it. No other English word has more!",
    quiz: [
      {
        question: "Which word is a verb?",
        options: ["table", "sleepy", "jump", "green"],
        answerIndex: 2,
        explanation: "You can jump! It's an action — so 'jump' is a verb.",
        misconceptions: [
          "A table is a thing you can put books on — it's a noun.",
          "'Sleepy' describes how you feel — it's a describing word (adjective).",
          "That's right! Jumping is an action, so 'jump' is a verb.",
          "'Green' describes a color — it's a describing word, not an action.",
        ],
      },
      {
        question: "In 'The bird sings a song', which word is the verb?",
        options: ["bird", "sings", "song", "a"],
        answerIndex: 1,
        explanation: "'Sings' shows what the bird does — it's the action word!",
        misconceptions: [
          "'Bird' names the animal doing the action — it's a noun.",
          "Correct! Singing is the action, so 'sings' is the verb.",
          "'Song' is a thing — a noun. The verb is what the bird DOES.",
          "'A' is a tiny helper word, not an action.",
        ],
      },
      {
        question: "Which verb fits? 'Fish ______ in water.'",
        options: ["bark", "swim", "meow", "fly"],
        answerIndex: 1,
        explanation: "Fish swim! 'Swim' is the action that matches a fish.",
        misconceptions: [
          "Dogs bark — that action belongs to a dog, not a fish.",
          "Yes! Fish swim, so 'swim' is the right action word.",
          "Cats meow — try an action a fish can do!",
          "Birds fly — a fish would pick a splishier verb.",
        ],
      },
      {
        question: "Which one is an action word?",
        options: ["sofa", "purple", "hop", "quiet"],
        answerIndex: 2,
        explanation: "Hopping is something you DO — 'hop' is a verb!",
        misconceptions: [
          "A sofa is furniture — a thing-noun.",
          "'Purple' is a color — a describing word.",
          "Yes! Hopping is an action, so 'hop' is the verb.",
          "'Quiet' describes how something is — not what it does.",
        ],
      },
    ],
    worksheet: [
      {
        kind: "fill-blank",
        prompt: "A verb is a ______ word. It shows what someone does.",
        answer: "doing",
      },
      {
        kind: "build-sentence",
        prompt: "Tap the words to build a sentence full of action!",
        words: ["Kai", "kicks", "the", "ball"],
        answer: "Kai kicks the ball.",
      },
      {
        kind: "match",
        prompt: "Match each animal to its action!",
        left: ["bird", "fish", "rabbit"],
        right: ["hops", "swims", "flies"],
        answer: [1, 2, 0],
      },
      {
        kind: "fill-blank",
        prompt: "In 'Sam claps his hands', the verb is ______.",
        answer: "claps",
      },
      {
        kind: "short-answer",
        prompt: "Pretend to do your favorite action word, then write the verb.",
        sampleAnswer: "I love to dance. Dance is my favorite verb!",
      },
      {
        kind: "build-sentence",
        prompt: "Build one more action sentence!",
        words: ["hopped", "The", "frog", "away"],
        answer: "The frog hopped away.",
      },
    ],
  },

  // -------------------------------------------------------------------------
  // 3. Capital Letters and Full Stops
  // -------------------------------------------------------------------------
  {
    id: "english-early-3",
    title: "Capital Letters and Full Stops",
    emoji: "✏️",
    minutes: 7,
    intro:
      "Every sentence needs a strong start and a firm stop — like a race! A capital letter says GO, and a full stop says STOP.",
    sections: [
      {
        heading: "Capital Letters Start the Race",
        body:
          "The first word of every sentence gets a capital letter. Names get capitals too: Amina, Kai, Toronto, Friday. Capitals are like little flags that say 'important!'",
        example: "'the cat naps' needs fixing → 'The cat naps.' Now The is wearing its capital flag!",
        tip: "Names always get a capital — even your best friend's hamster's name.",
      },
      {
        heading: "Full Stops Bring the Sentence Home",
        body:
          "A full stop (you can also call it a period) goes at the very end of a sentence. It tells the reader: this idea is finished, take a breath. A full stop is a tiny dot with a big job.",
        example: "'I like yaks' → 'I like yaks.' The full stop shows the idea is complete.",
        tip: "Full stop = the finish line of a sentence.",
      },
      {
        heading: "Check Every Sentence",
        body:
          "Great writers check two things on every sentence: Does it START with a capital? Does it END with a full stop? Two checks, and your writing looks sharp!",
        example:
          "'yuki and sam ran home' → 'Yuki and Sam ran home.' Capitals for the sentence AND the names!",
        tip: "When you write your name, give it a capital — you're important!",
      },
    ],
    vocab: [
      { word: "capital letter", meaning: "The BIG letter that starts a sentence or a name — like A." },
      { word: "full stop", meaning: "The dot at the end of a sentence. It is also called a period." },
      { word: "sentence", meaning: "A whole idea in words — it starts with a capital and ends with a full stop." },
    ],
    funFact:
      "Long ago, people wrote with NO spaces between words and no full stops at all! Punctuation was invented to show readers where to breathe.",
    quiz: [
      {
        question: "Which sentence is written correctly?",
        options: ["the dog is big.", "The dog is big", "The dog is big.", "the Dog is big."],
        answerIndex: 2,
        explanation:
          "It starts with a capital T and ends with a full stop. Perfect sentence!",
        misconceptions: [
          "Close! But 'the' needs a capital T at the start of a sentence.",
          "Almost! The capital is right, but the sentence needs a full stop at the end.",
          "Yes! Capital letter at the start, full stop at the end.",
          "'Dog' shouldn't have a capital in the middle, and 'the' should! Only sentence-starters and names get capitals.",
        ],
      },
      {
        question: "Where does a full stop go?",
        options: [
          "At the start of a sentence",
          "In the middle of a word",
          "At the end of a sentence",
          "Next to every noun",
        ],
        answerIndex: 2,
        explanation: "A full stop comes at the very end — it says the sentence is finished!",
        misconceptions: [
          "The START of a sentence belongs to the capital letter.",
          "Never inside a word! The full stop waits at the end.",
          "Yes! The full stop is the finish line of a sentence.",
          "Nouns don't need dots — every sentence just needs ONE full stop, at the end.",
        ],
      },
      {
        question: "Which word needs a capital letter? 'my friend amina lives in perth.'",
        options: ["my", "friend", "amina", "lives"],
        answerIndex: 2,
        explanation:
          "Amina is a name, and names always get capitals! ('My' also needs one because it starts the sentence.)",
        misconceptions: [
          "'My' starts the sentence, so it needs a capital too — but the name is the special one to spot here.",
          "'Friend' is a normal word in the middle, so it stays lowercase.",
          "Right! Amina is a name, so it needs a capital A.",
          "'Lives' is a normal action word in the middle — no capital needed.",
        ],
      },
      {
        question: "What does a full stop tell you?",
        options: [
          "The sentence is finished",
          "Read louder",
          "The word is a noun",
          "Jump to the next word",
        ],
        answerIndex: 0,
        explanation: "A full stop means the idea is complete — time to take a breath!",
        misconceptions: [
          "Yes! The full stop shows the sentence is done.",
          "For loud reading you'd want an exclamation mark — a full stop is calm.",
          "Full stops don't name words — they just end sentences.",
          "No jumping! A full stop means STOP and breathe.",
        ],
      },
    ],
    worksheet: [
      {
        kind: "fill-blank",
        prompt: "Every sentence starts with a ______ letter.",
        answer: "capital",
      },
      {
        kind: "correct-sentence",
        prompt: "Fix this sentence and retype it correctly!",
        sentence: "the cat naps",
        answer: "The cat naps.",
        why: "Sentences start with a capital letter (The) and end with a full stop. Two fixes, done!",
      },
      {
        kind: "correct-sentence",
        prompt: "This one needs three fixes. Retype it correctly!",
        sentence: "yuki and sam ran home",
        answer: "Yuki and Sam ran home.",
        why: "Capital Y for Yuki, capital S for Sam, and a full stop at the end. Names always get capitals!",
      },
      {
        kind: "match",
        prompt: "Match each piece to its job!",
        left: ["Capital letter", "Full stop", "Name"],
        right: ["ends the sentence", "starts the sentence", "always gets a capital"],
        answer: [1, 0, 2],
      },
      {
        kind: "fill-blank",
        prompt: "A full stop goes at the ______ of a sentence.",
        answer: "end",
      },
      {
        kind: "build-sentence",
        prompt: "Build a silly sentence. Remember: I is always a capital!",
        words: ["I", "like", "yaks"],
        answer: "I like yaks.",
      },
    ],
  },

  // -------------------------------------------------------------------------
  // 4. Describing Words (Adjectives)
  // -------------------------------------------------------------------------
  {
    id: "english-early-4",
    title: "Describing Words (Adjectives)",
    emoji: "🌈",
    minutes: 6,
    intro:
      "Is it slimy? Sparkly? Gigantic? Describing words paint pictures with words — let's grab our paintbrushes!",
    sections: [
      {
        heading: "Adjectives Describe",
        body:
          "A describing word (the grown-up name is adjective) tells you MORE about a person, place, or thing. Is the puppy big or tiny? Fluffy or smooth? Adjectives tell you!",
        example: "'The fluffy puppy wags its tail.' Fluffy describes the puppy.",
        tip: "Adjectives answer: what is it like?",
      },
      {
        heading: "Use Your Senses",
        body:
          "Your senses find adjectives everywhere! Eyes see: red, shiny, enormous. Ears hear: loud, quiet, squeaky. Nose smells: stinky, sweet. Tongue tastes: sour, salty. Fingers feel: soft, bumpy, gooey.",
        example: "A lemon is sour, yellow, and bumpy. Three adjectives from one fruit!",
        tip: "Can't think of a describing word? Use your senses!",
      },
      {
        heading: "Make Boring Sentences Pop",
        body:
          "'The dog ran.' Okay… but which dog? How did it run? Add describing words: 'The soggy dog splashed through the puddles.' WOW! Now you can see it!",
        example:
          "'A dragon lived there.' → 'An enormous dragon with purple scales lived there.' WOW! Now you can see it!",
        tip: "One or two strong describing words beat five weak ones.",
      },
    ],
    vocab: [
      { word: "adjective", meaning: "A describing word — it tells what something is like." },
      { word: "describe", meaning: "To say more about something: its color, size, feel, or smell." },
      { word: "senses", meaning: "Seeing, hearing, smelling, tasting, and touching." },
    ],
    funFact:
      "'Big' has lots of fun cousins: large, huge, giant, enormous, gigantic — and the silliest of all, 'humongous'!",
    quiz: [
      {
        question: "Which word is a describing word?",
        options: ["run", "fluffy", "kitten", "under"],
        answerIndex: 1,
        explanation: "'Fluffy' describes what something feels like — it's an adjective!",
        misconceptions: [
          "'Run' is an action — a verb. Describing words tell what something is LIKE.",
          "Yes! 'Fluffy' describes a kitten, a blanket, or a cloud.",
          "'Kitten' names an animal — it's a noun.",
          "'Under' tells where something is — it's a position word, not a describer.",
        ],
      },
      {
        question: "In 'The giant pizza sat on the table', which word describes the pizza?",
        options: ["giant", "sat", "table", "the"],
        answerIndex: 0,
        explanation: "'Giant' tells you how BIG the pizza is — that's a describing word!",
        misconceptions: [
          "Yes! 'Giant' describes the pizza's size.",
          "'Sat' is the action — the verb.",
          "'Table' is a thing — a noun, not a describer.",
          "'The' is a tiny helper word that points at nouns.",
        ],
      },
      {
        question: "Which describing word fits ice cream best?",
        options: ["melty", "wooden", "angry", "sandy"],
        answerIndex: 0,
        explanation: "Ice cream gets melty in the sun — 'melty' fits perfectly!",
        misconceptions: [
          "Yes! Melty is exactly what ice cream does on a warm day.",
          "Wooden fits a chair or a spoon — not ice cream!",
          "Ice cream never gets angry — try a taste or temperature word.",
          "Sandy fits a beach — ice cream wants a cooler word!",
        ],
      },
      {
        question: "Which word describes how a lemon tastes?",
        options: ["loud", "sour", "sleepy", "tall"],
        answerIndex: 1,
        explanation: "Lemons taste sour! Taste words are describing words.",
        misconceptions: [
          "'Loud' describes sound — your ears, not your tongue!",
          "Yes! Sour is the classic lemon taste.",
          "'Sleepy' describes how YOU feel — not how a lemon tastes.",
          "'Tall' describes height — lemons are small and round!",
        ],
      },
    ],
    worksheet: [
      {
        kind: "fill-blank",
        prompt: "A describing word is called an ______.",
        answer: "adjective",
        hint: "It starts with the same letter as 'apple'.",
      },
      {
        kind: "match",
        prompt: "Match each thing to a describing word that fits!",
        left: ["lemon", "pillow", "elephant"],
        right: ["soft", "enormous", "sour"],
        answer: [2, 0, 1],
      },
      {
        kind: "build-sentence",
        prompt: "Which kite? The red one! Build the sentence.",
        words: ["The", "red", "kite", "flies"],
        answer: "The red kite flies.",
      },
      {
        kind: "fill-blank",
        prompt: "In 'the shiny coin', the describing word is ______.",
        answer: "shiny",
      },
      {
        kind: "short-answer",
        prompt: "Describe your favorite snack with two describing words.",
        sampleAnswer: "My favorite snack is a warm, cheesy slice of pizza!",
      },
      {
        kind: "build-sentence",
        prompt: "Build a sentence with a describing word about size!",
        words: ["A", "tiny", "mouse", "squeaked"],
        answer: "A tiny mouse squeaked.",
      },
    ],
  },

  // -------------------------------------------------------------------------
  // 5. Rhyming Words
  // -------------------------------------------------------------------------
  {
    id: "english-early-5",
    title: "Rhyming Words",
    emoji: "🎵",
    minutes: 6,
    intro:
      "Cat, hat, mat, bat! Rhyming words are words that sing together at the end. Let's make some word music!",
    sections: [
      {
        heading: "Rhymes Sound Alike at the End",
        body:
          "Rhyming words end with the same sounds. Say them out loud: star… car! Cake… snake! Your ears will hear the match — rhyming is a listening game.",
        example: "'The bee sat on my knee.' Bee and knee rhyme — they share their ending sounds!",
        tip: "Say the words out loud. If they sound like a mini song, they rhyme!",
      },
      {
        heading: "Word Families",
        body:
          "Rhyming words grow in families. The -at family: cat, hat, mat, bat, sat. The -ig family: pig, wig, big, dig. Change the first sound and — poof! — a brand-new rhyme.",
        example: "Take 'hop'. Swap the h: top, mop, stop, shop. One word, a whole family of rhymes!",
        tip: "One family, many words: change the first letter, keep the ending.",
      },
      {
        heading: "Make Your Own Rhyme",
        body:
          "Pick a word, then say the alphabet slowly until you hear a match. Sun… bun! fun! run! You just made rhymes. Strings of rhymes become poems and songs.",
        example: "'I saw a frog sitting on a log.' Frog and log — you're basically a poet already!",
        tip: "Nonsense words rhyme too: 'a frog on a mog'? Silly — but it rhymes!",
      },
    ],
    vocab: [
      { word: "rhyme", meaning: "Words that end with the same sound, like cat and hat." },
      { word: "word family", meaning: "A group of words that rhyme, like pig, wig, and big." },
      { word: "poem", meaning: "Writing made of lines that often rhyme and sound musical." },
    ],
    funFact:
      "Dr. Seuss's friend bet him he couldn't write a book using only 50 different words — so he wrote 'Green Eggs and Ham' and won the bet!",
    quiz: [
      {
        question: "Which word rhymes with 'cat'?",
        options: ["dog", "hat", "sun", "cup"],
        answerIndex: 1,
        explanation: "'Hat' ends with the same -at sound as 'cat' — a perfect rhyme!",
        misconceptions: [
          "'Dog' ends with an -og sound — that rhymes with frog and log!",
          "Yes! Cat… hat — hear the matching ending?",
          "'Sun' ends with -un — it rhymes with fun and run.",
          "'Cup' ends with -up — it rhymes with pup and sup.",
        ],
      },
      {
        question: "Which pair of words rhymes?",
        options: ["moon–sock", "star–car", "tree–box", "cake–goat"],
        answerIndex: 1,
        explanation: "Star and car share the -ar sound — they rhyme!",
        misconceptions: [
          "Moon ends in -oon, sock ends in -ock. Different endings!",
          "Yes! Star… car — the ending sounds match perfectly.",
          "Tree ends in -ee, box ends in -ox. Listen again — not a match.",
          "Cake ends in -ake, goat ends in -oat. Close, but the sounds don't match.",
        ],
      },
      {
        question: "Which word does NOT rhyme with 'hop'?",
        options: ["top", "mop", "shop", "cup"],
        answerIndex: 3,
        explanation: "'Cup' ends with -up, not -op. The others all rhyme with hop!",
        misconceptions: [
          "'Top' ends with -op — it rhymes with hop!",
          "'Mop' ends with -op — a good rhyme.",
          "'Shop' ends with -op — it rhymes too.",
          "Yes! 'Cup' ends with -up, so it breaks the -op pattern.",
        ],
      },
      {
        question: "Finish the rhyme: 'There once was a bee, who sat on my ______.'",
        options: ["knee", "chair", "shoe", "hat"],
        answerIndex: 0,
        explanation: "Bee and knee share the -ee sound — the rhyme is complete!",
        misconceptions: [
          "Yes! Bee… knee — the ending sounds match.",
          "'Chair' makes sense but doesn't rhyme with bee — rhyming needs matching sounds.",
          "'Shoe' almost sounds like it could work, but it ends in -oo, not -ee.",
          "'Hat' rhymes with cat and mat — not with bee.",
        ],
      },
    ],
    worksheet: [
      {
        kind: "match",
        prompt: "Match each word to its rhyming partner!",
        left: ["star", "cake", "moon"],
        right: ["spoon", "car", "snake"],
        answer: [1, 2, 0],
      },
      {
        kind: "fill-blank",
        prompt: "Words that rhyme end with the same ______.",
        answer: "sounds",
      },
      {
        kind: "fill-blank",
        prompt: "Do 'sun' and 'fun' rhyme? Write yes or no.",
        answer: "yes",
      },
      {
        kind: "fill-blank",
        prompt: "Do 'box' and 'star' rhyme? Write yes or no.",
        answer: "no",
      },
      {
        kind: "build-sentence",
        prompt: "Build a rhyming sentence — the last two words rhyme!",
        words: ["The", "fox", "sat", "on", "a", "box"],
        answer: "The fox sat on a box.",
      },
      {
        kind: "short-answer",
        prompt: "Make up one rhyming pair of your own, like 'goat–boat'.",
        sampleAnswer: "frog–log! I like to hop like a frog onto a log.",
      },
    ],
  },

  // -------------------------------------------------------------------------
  // 6. Simple Sentences
  // -------------------------------------------------------------------------
  {
    id: "english-early-6",
    title: "Simple Sentences",
    emoji: "🧱",
    minutes: 7,
    intro:
      "Sentences are like LEGO towers: the bricks have to fit together just right, or the whole thing wobbles! Let's build sentences that make sense.",
    sections: [
      {
        heading: "A Sentence Tells Who and What Happens",
        body:
          "A real sentence gives you two things: WHO or WHAT the sentence is about, and WHAT happens. 'Leo naps.' Who? Leo. What happens? Napping. That's a whole idea!",
        example:
          "'The cat sleeps.' Who or what? The cat. What happens? Sleeping. Complete sentence!",
        tip: "Every sentence needs a who (or what) AND a what-happens.",
      },
      {
        heading: "Words Must Make Sense Together",
        body:
          "Put words in a silly order and the sentence breaks: 'Ball the kicked Leo' — huh? Put them in the right order and everything clicks: 'Leo kicked the ball.' Same words, but now they make sense!",
        example:
          "'Sleeps the cat' sounds mixed up. 'The cat sleeps' — now your ears smile!",
        tip: "Read your sentence out loud. Do your ears smile? It works!",
      },
      {
        heading: "Sentences Work Together Too",
        body:
          "When sentences team up, the order matters. 'I planted a seed. I watered it. A flower grew!' — sense made. But 'A flower grew. I planted a seed.' — wait, how did the flower get there? Keep events in an order that makes sense together.",
        example:
          "First the sun rises, THEN Leo wakes up. Swap them and the story gets confusing!",
        tip: "Tell things in order: first, next, last.",
      },
    ],
    vocab: [
      { word: "sentence", meaning: "A group of words that tells a whole idea." },
      { word: "complete", meaning: "Finished — nothing missing." },
      { word: "order", meaning: "The sequence things happen in: first, next, last." },
    ],
    funFact:
      "A sentence can be tiny: 'Go!' is a complete sentence — one word, a capital letter, and it makes perfect sense!",
    quiz: [
      {
        question: "Which one is a real sentence?",
        options: ["Ball the kicked Leo", "Leo kicked the ball.", "Kicked ball Leo the", "Leo the ball kicked"],
        answerIndex: 1,
        explanation: "'Leo kicked the ball.' tells who (Leo) and what happens (kicked) — in an order that makes sense!",
        misconceptions: [
          "The words are jumbled! Who kicks the ball? Try putting Leo first.",
          "Yes! It has a who, a what-happens, a capital, and a full stop.",
          "Scrambled again! English sentences like the doer up front.",
          "Almost the right words — but 'Leo the ball kicked' is still tangled up.",
        ],
      },
      {
        question: "What two things does a simple sentence tell you?",
        options: [
          "Who and what happens",
          "A color and a number",
          "A rhyme and a song",
          "A letter and a full stop",
        ],
        answerIndex: 0,
        explanation:
          "A sentence names a who (or what) and tells what happens. That's what makes it complete!",
        misconceptions: [
          "Yes! Who it's about + what happens = a complete sentence.",
          "Colors and numbers are nice, but sentences don't need them.",
          "Rhymes are fun, but they don't make a sentence complete.",
          "A capital and a full stop are the sentence's OUTFIT — the who and what-happens are its heart.",
        ],
      },
      {
        question: "Which word order makes sense?",
        options: ["Sleeps the cat", "Cat the sleeps", "The cat sleeps.", "The sleeps cat"],
        answerIndex: 2,
        explanation: "'The cat sleeps.' — the who (the cat) comes before the what-happens (sleeps).",
        misconceptions: [
          "'Sleeps' up front tangles the sentence — the who usually comes first.",
          "'Cat the sleeps' is scrambled — 'the' hugs the word it describes.",
          "Yes! The cat first, then the action. It makes sense!",
          "'The sleeps cat' puts the action in the wrong spot — cats sleep, sleeps don't cat!",
        ],
      },
      {
        question: "'The sandwich ate Leo.' Does this sentence make sense?",
        options: [
          "No — sandwiches can't eat people!",
          "Yes — sandwiches are hungry",
          "No — it needs more adjectives",
          "Yes — it rhymes",
        ],
        answerIndex: 0,
        explanation:
          "It's built like a sentence, but the meaning is silly — sandwiches don't eat people. Words must make SENSE together!",
        misconceptions: [
          "Right! The words fit together, but the idea is impossible — meaning matters.",
          "Sandwiches are delicious, not hungry — this sentence mixes up who does what!",
          "More describing words wouldn't fix it — the ACTION is backwards.",
          "It doesn't even rhyme — and rhyming was never the goal. Sense is!",
        ],
      },
    ],
    worksheet: [
      {
        kind: "build-sentence",
        prompt: "Unscramble the words into a sentence that makes sense!",
        words: ["kicks", "Leo", "the", "ball"],
        answer: "Leo kicks the ball.",
      },
      {
        kind: "build-sentence",
        prompt: "One more scramble — build a complete sentence!",
        words: ["naps", "The", "cat"],
        answer: "The cat naps.",
      },
      {
        kind: "fill-blank",
        prompt: "A sentence tells who and what ______.",
        answer: "happens",
      },
      {
        kind: "fill-blank",
        prompt: "Does 'The dog walks to school.' make sense? Write yes or no.",
        answer: "yes",
      },
      {
        kind: "match",
        prompt: "Match each beginning to its best ending!",
        left: ["The sun", "Leo ate", "The fish"],
        right: ["rises in the morning.", "swims in the water.", "a big sandwich."],
        answer: [0, 2, 1],
      },
      {
        kind: "short-answer",
        prompt: "Make these words into a sentence that makes sense: 'bus school to the rides Priya'",
        sampleAnswer: "Priya rides the bus to school.",
      },
    ],
    challenge: {
      prompt:
        "Put these three events in an order that makes sense together: (A) Amara watered the seed every day. (B) Amara planted a sunflower seed. (C) A tall sunflower grew!",
      hint: "Can you water a seed you haven't planted yet? Think about what must happen first.",
      steps: [
        "Read all three events slowly.",
        "Ask: which one starts everything?",
        "Ask: which one needs time and care before the last one can happen?",
        "Put them in order: first, next, last.",
        "Read your order out loud — does it make sense together?",
      ],
      answer:
        "B → A → C: Amara planted a seed, watered it every day, and a tall sunflower grew.",
      answerWhy:
        "You can't water a seed before planting it, and a sunflower only grows after planting AND watering. When sentences happen in a sensible order, your whole story makes sense together!",
    },
  },
];
