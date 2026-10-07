// English — Primary (ages 9-11)
// Six lessons: parts of speech, verb tenses, commas & apostrophes, prefixes &
// suffixes, paragraphs, and creative story writing. Playful but practical —
// real tools for confident writers.
import type { Lesson } from "./types";

export const lessons: Lesson[] = [
  // -------------------------------------------------------------------------
  // 1. Parts of Speech Roundup
  // -------------------------------------------------------------------------
  {
    id: "english-primary-1",
    title: "Parts of Speech Roundup",
    emoji: "🤠",
    minutes: 10,
    intro:
      "Every word in English has a job. Saddle up — we're rounding up nouns, verbs, adjectives, adverbs, and pronouns and putting each one to work!",
    sections: [
      {
        heading: "The Five Jobs on the Ranch",
        body:
          "NOUNS name things: ranch, lasso, Priya. VERBS show action: rides, lassos, gallops. ADJECTIVES describe nouns: dusty, brave, enormous. PRONOUNS stand in for nouns: she, he, they, it.",
        example:
          "'Brave Priya gallops across the dusty ranch.' Brave = adjective, Priya = noun, gallops = verb, ranch = noun, dusty = adjective.",
        tip: "A word's job depends on how it's USED, not just what it is.",
      },
      {
        heading: "Adverbs: The Verb's Sidekick",
        body:
          "An adverb adds details to a VERB — it tells how, when, or how much. Many adverbs end in -ly: quickly, slowly, loudly, quietly. But not all! 'Leo runs fast' — fast is the adverb there.",
        example:
          "'Sam finished the puzzle quickly.' Quickly tells HOW Sam finished. That's the adverb at work.",
        tip: "Adverbs answer: HOW did that happen?",
      },
      {
        heading: "Pronouns: The Stand-Ins",
        body:
          "Saying 'Amara gave Amara's ticket to Leo, and Leo cheered' is clunky. Pronouns swoop in: 'Amara gave HER ticket to Leo, and HE cheered.' Shorter, smoother, smarter.",
        example: "she, he, they, it, we, him, her, them — small words doing heavy lifting.",
        tip: "Use a pronoun after you've named the noun, so readers know who's who.",
      },
    ],
    vocab: [
      { word: "noun", meaning: "A person, place, or thing — like explorer, forest, or Kai." },
      { word: "adjective", meaning: "A word that describes a noun, like brave or dusty." },
      { word: "adverb", meaning: "A word that tells more about a verb, like quickly or fast." },
      { word: "pronoun", meaning: "A word that stands in for a noun, like she, he, or they." },
    ],
    funFact:
      "The word 'set' may be the most versatile word in English — dictionary editors have counted hundreds of different uses for it as both a noun and a verb!",
    quiz: [
      {
        question: "In 'Yuki quickly finished her puzzle', which word is the adverb?",
        options: ["Yuki", "quickly", "finished", "puzzle"],
        answerIndex: 1,
        explanation: "'Quickly' tells HOW Yuki finished — that makes it an adverb.",
        misconceptions: [
          "'Yuki' names a person — that's a noun.",
          "Yes! 'Quickly' tells how the finishing happened.",
          "'Finished' shows the action — it's the verb.",
          "'Puzzle' names a thing — it's a noun.",
        ],
      },
      {
        question: "In 'Amara gave Leo her spare ticket, and he cheered', which word is a pronoun?",
        options: ["Amara", "gave", "he", "ticket"],
        answerIndex: 2,
        explanation: "'He' stands in for Leo — standing in for a noun is a pronoun's job!",
        misconceptions: [
          "'Amara' names a person — it's a noun.",
          "'Gave' shows the action — it's the verb.",
          "Right! 'He' takes the place of the noun 'Leo'.",
          "'Ticket' names a thing — it's a noun.",
        ],
      },
      {
        question: "Which word is an adjective in 'The enormous wave crashed loudly'?",
        options: ["enormous", "wave", "crashed", "loudly"],
        answerIndex: 0,
        explanation: "'Enormous' describes the wave — adjectives describe nouns.",
        misconceptions: [
          "Yes! 'Enormous' tells how big the wave is.",
          "'Wave' is the noun being described — not the describer.",
          "'Crashed' is the action — the verb.",
          "'Loudly' tells how the crashing happened — it's an adverb.",
        ],
      },
      {
        question: "In 'Sam sent a postcard from Rome', what job does 'Rome' do?",
        options: [
          "It names a place, so it's a noun",
          "It's an adjective",
          "It's a verb",
          "It's a pronoun",
        ],
        answerIndex: 0,
        explanation: "Rome names a place — places are nouns, so 'Rome' is a noun!",
        misconceptions: [
          "Correct! Names of places are nouns.",
          "Adjectives describe — 'Rome' isn't describing anything here.",
          "Verbs show action — 'Rome' isn't doing anything.",
          "Pronouns stand in for nouns — 'Rome' IS the noun, no stand-in needed.",
        ],
      },
    ],
    worksheet: [
      {
        kind: "match",
        prompt: "Match each word to its part-of-speech job!",
        left: ["quickly", "Priya", "shouted", "gigantic", "she"],
        right: ["noun", "adjective", "verb", "adverb", "pronoun"],
        answer: [3, 0, 2, 1, 4],
      },
      {
        kind: "fill-blank",
        prompt: "An adverb usually tells more about a ______.",
        answer: "verb",
        hint: "It often ends in -ly.",
      },
      {
        kind: "fill-blank",
        prompt: "'They' replaces 'Amina and Kai', so 'they' is a ______.",
        answer: "pronoun",
      },
      {
        kind: "build-sentence",
        prompt: "Build a sentence with an adjective (brave) AND an adverb (slowly)!",
        words: ["The", "brave", "explorer", "walked", "slowly"],
        answer: "The brave explorer walked slowly.",
      },
      {
        kind: "fill-blank",
        prompt: "In 'Leo runs fast', the adverb is ______.",
        answer: "fast",
        hint: "Not every adverb ends in -ly!",
      },
      {
        kind: "short-answer",
        prompt: "Write a sentence with a noun, a verb, and an adjective — then label them.",
        sampleAnswer:
          "Zara painted a colorful mural. (noun: mural, verb: painted, adjective: colorful)",
      },
    ],
    challenge: {
      prompt:
        "The word 'dance' can be a noun AND a verb. Write two short sentences: one where 'dance' is the noun, one where it's the verb.",
      hint: "Try 'a dance' for the noun version and 'they dance' for the verb version.",
      steps: [
        "Say this out loud: 'We learned a new dance.' Here 'dance' names a thing — a noun!",
        "Now say: 'We dance every Friday.' Here 'dance' shows the action — a verb!",
        "Write your own noun sentence. Clue: the noun version often follows 'a' or 'the'.",
        "Write your own verb sentence — the verb version DOES something.",
        "Check: does the first sentence NAME something, and the second one DO something?",
      ],
      answer:
        "Examples: 'The dance was full of sparkles.' (noun) — 'The penguins dance on the ice.' (verb)",
      answerWhy:
        "A word's part of speech comes from its JOB in the sentence, not the word itself. The same word can name a thing (noun) or show an action (verb) — English words are flexible like that!",
    },
  },

  // -------------------------------------------------------------------------
  // 2. Verb Tenses: Past, Present, Future
  // -------------------------------------------------------------------------
  {
    id: "english-primary-2",
    title: "Verb Tenses: Past, Present, Future",
    emoji: "⏳",
    minutes: 10,
    intro:
      "Verbs are time travelers! One little change tells us if something already happened, is happening now, or hasn't happened yet.",
    sections: [
      {
        heading: "Three Time Zones",
        body:
          "PAST tense = it already happened: 'Priya walked to the market.' PRESENT tense = happening now: 'Priya walks to the market.' FUTURE tense = still to come: 'Priya will walk to the market.' Same walk, three time zones!",
        example:
          "paint → painted (past) → paints (present) → will paint (future). One verb, three clocks.",
        tip: "Ask: did it happen, is it happening, or will it happen?",
      },
      {
        heading: "The Regular Route and the Future Helper",
        body:
          "Most verbs take the regular route: add -ed for the past (jump → jumped) and add 'will' for the future (will jump). 'Will' is the future's trusty helper — put it in front and any verb can time-travel forward.",
        example: "Today I play. Yesterday I played. Tomorrow I will play.",
        tip: "'Will' + verb = future. That's the whole trick!",
      },
      {
        heading: "The Tricky Changers",
        body:
          "Some verbs refuse the -ed route and change shape instead: go → went, eat → ate, run → ran, see → saw. They're called irregular verbs, and the only way to catch them is to know them.",
        example: "'Yesterday I eat pizza' sounds wrong — the tricky verb demands 'Yesterday I ATE pizza.'",
        tip: "Irregular verbs are memorization friends — meet them often and they'll stick.",
      },
    ],
    vocab: [
      { word: "tense", meaning: "The form of a verb that shows when something happens." },
      { word: "past", meaning: "Already happened — like yesterday or last year." },
      { word: "future", meaning: "Still to come — like tomorrow or next week." },
      { word: "irregular", meaning: "A verb that changes shape in the past, like go → went." },
    ],
    funFact:
      "Why is the past of 'go'… 'went'? Because 'went' was originally the past tense of a different verb, 'wend' (as in 'wend your way')! English borrowed it to fill in for 'go'.",
    quiz: [
      {
        question: "'Yesterday, Priya ______ to the market.' Which verb fits?",
        options: ["walks", "walked", "will walk", "walking"],
        answerIndex: 1,
        explanation: "'Yesterday' is past time, so the past tense 'walked' fits perfectly.",
        misconceptions: [
          "'Walks' is present tense — that's for right now, not yesterday.",
          "Yes! 'Walked' puts the action safely in the past.",
          "'Will walk' is future tense — yesterday already happened!",
          "'Walking' needs a helper like 'was' — on its own it can't be the verb here.",
        ],
      },
      {
        question: "Which sentence is in the FUTURE tense?",
        options: [
          "Leo paints a mural.",
          "Leo painted a mural.",
          "Leo will paint a mural.",
          "Leo was painting a mural.",
        ],
        answerIndex: 2,
        explanation: "'Will' + verb = future tense. Leo hasn't painted it yet!",
        misconceptions: [
          "'Paints' is present — happening now.",
          "'Painted' is past — already done.",
          "Correct! 'Will paint' points forward to tomorrow.",
          "'Was painting' looks back at the past — future needs 'will'.",
        ],
      },
      {
        question: "What is the past tense of 'eat'?",
        options: ["eated", "ate", "eaten", "eating"],
        answerIndex: 1,
        explanation: "'Eat' is irregular — its past tense is 'ate'. No -ed allowed!",
        misconceptions: [
          "'Eated' sounds logical but 'eat' is a rule-breaker — the real form is 'ate'.",
          "Yes! Eat → ate. Irregular verbs change shape instead of adding -ed.",
          "'Eaten' needs a helper: 'I have eaten'. On its own, the past is 'ate'.",
          "'Eating' is the ongoing form — 'I was eating'. Past tense alone is 'ate'.",
        ],
      },
      {
        question: "'The dragons guard the castle.' Which tense is this?",
        options: ["Past", "Present", "Future", "No tense"],
        answerIndex: 1,
        explanation: "'Guard' with no -ed and no 'will' is the simple present — it's happening now (or always!).",
        misconceptions: [
          "Past tense would look like 'guarded' — see the -ed?",
          "Yes! 'Guard' is happening now — present tense.",
          "Future would need 'will guard' — the future's helper is missing.",
          "Every verb carries a tense — 'guard' is wearing the present one.",
        ],
      },
    ],
    worksheet: [
      {
        kind: "fill-blank",
        prompt: "Yesterday I ______ (walk) to school.",
        answer: "walked",
      },
      {
        kind: "fill-blank",
        prompt: "Tomorrow it ______ (rain). Add 'will'.",
        answer: "will rain",
      },
      {
        kind: "correct-sentence",
        prompt: "This sentence is stuck in the wrong time zone. Fix and retype it!",
        sentence: "Yesterday we go to the beach.",
        answer: "Yesterday we went to the beach.",
        why: "'Yesterday' puts us in the past, so 'go' must become its irregular past form 'went'.",
      },
      {
        kind: "match",
        prompt: "Match each verb to its tense!",
        left: ["ate", "will jump", "runs"],
        right: ["present tense", "past tense", "future tense"],
        answer: [1, 2, 0],
      },
      {
        kind: "build-sentence",
        prompt: "Build a future-tense sentence!",
        words: ["Tomorrow", "we", "will", "swim"],
        answer: "Tomorrow we will swim.",
      },
      {
        kind: "short-answer",
        prompt: "Change this to the past: 'Kai watches the eclipse.' Then change it to the future.",
        sampleAnswer: "Past: Kai watched the eclipse. Future: Kai will watch the eclipse.",
      },
    ],
  },

  // -------------------------------------------------------------------------
  // 3. Punctuation Power: Commas & Apostrophes
  // -------------------------------------------------------------------------
  {
    id: "english-primary-3",
    title: "Punctuation Power: Commas & Apostrophes",
    emoji: "✨",
    minutes: 11,
    intro:
      "Two tiny marks, giant superpowers! Commas keep lists tidy, and apostrophes show what belongs to whom. Small dots, big responsibility.",
    sections: [
      {
        heading: "Commas Tidy Up Lists",
        body:
          "When you list three or more things, commas keep them from bumping into each other: 'We packed apples, bananas, and pears.' Also use a comma after an opener like 'After school,' — it gives the reader a tiny pause.",
        example:
          "'After school, we play soccer, eat snacks, and rest.' One comma handles the opener, the rest handle the list.",
        tip: "Read your sentence aloud — commas go where you'd naturally take a tiny pause.",
      },
      {
        heading: "Apostrophes Show Ownership",
        body:
          "An apostrophe + s shows that something BELONGS to someone: 'Leo's hat' means the hat belongs to Leo. 'The dog's bone' means one dog owns that bone.",
        example: "'Sam's sketchbook is full of dragons.' The sketchbook is Sam's property!",
        tip: "Ask: who owns it? That owner gets the apostrophe + s.",
      },
      {
        heading: "Apostrophes Also Squish Words",
        body:
          "Contractions are two words squished into one, with the apostrophe marking the missing letters: do not → don't, I am → I'm, cannot → can't. The apostrophe is a tiny bandage where letters used to be.",
        example: "'She is' becomes 'she's' — the apostrophe stands in for the missing 'i'.",
        tip: "Contractions are great for talking; full forms feel more formal.",
      },
    ],
    vocab: [
      { word: "comma", meaning: "A tiny pause mark that keeps lists and sentences tidy." },
      { word: "apostrophe", meaning: "The little mark in dog's and don't." },
      { word: "contraction", meaning: "Two words squished together, like do not → don't." },
      { word: "possession", meaning: "When something belongs to someone, like Kai's kite." },
    ],
    funFact:
      "One tiny comma was worth about 5 million dollars! A dairy company in the United States won a lawsuit because of a missing comma in a contract's list.",
    quiz: [
      {
        question: "Which list is punctuated correctly?",
        options: [
          "We packed apples bananas and pears.",
          "We packed, apples bananas and pears.",
          "We packed apples, bananas, and pears.",
          "We packed apples bananas, and pears.",
        ],
        answerIndex: 2,
        explanation: "Commas between every item keep the list tidy — including one before 'and'!",
        misconceptions: [
          "No commas at all? The fruits crash into each other — they need pauses between them.",
          "The comma after 'packed' pauses in the wrong spot — commas go BETWEEN list items.",
          "Yes! A comma between each item, and one tidy comma before 'and'.",
          "The first comma arrived late — 'apples' and 'bananas' need one between them too.",
        ],
      },
      {
        question: "What does the apostrophe show in 'Leo's hat'?",
        options: ["Leo is happy", "The hat belongs to Leo", "Leo owns many hats", "It's shouting"],
        answerIndex: 1,
        explanation: "'Leo's hat' = the hat of Leo. Apostrophe + s shows ownership!",
        misconceptions: [
          "'Leo is happy' would need different words — 'Leo's hat' is about ownership.",
          "Yes! The apostrophe + s shows the hat is Leo's.",
          "One hat, one apostrophe — many hats belonging to Leo would be 'Leo's hats'.",
          "Exclamation marks shout — apostrophes show ownership or contractions.",
        ],
      },
      {
        question: "What is the contraction for 'do not'?",
        options: ["donot", "don't", "do'nt", "dont"],
        answerIndex: 1,
        explanation: "Do + not = don't. The apostrophe stands in for the missing 'o'!",
        misconceptions: [
          "No apostrophe? Then the squished words lose their bandage — the mark matters!",
          "Correct! 'don't' with the apostrophe marking the missing 'o'.",
          "The apostrophe goes where letters disappear — after the 'n', not inside 'do'.",
          "So close — but the apostrophe can't be skipped. It's doing a real job!",
        ],
      },
      {
        question: "Choose the correctly punctuated sentence.",
        options: [
          "After school, we play soccer.",
          "After school we, play soccer.",
          "After, school we play soccer.",
          "After school we play, soccer.",
        ],
        answerIndex: 0,
        explanation: "'After school' is an opener, so the comma comes right after it.",
        misconceptions: [
          "Yes! The comma follows the opener 'After school' and gives a natural pause.",
          "The comma landed in the middle of the action — it belongs after the opener.",
          "'After' and 'school' are partners — don't split them with a comma!",
          "A comma before 'soccer' breaks up the phrase 'play soccer' — not a natural pause.",
        ],
      },
    ],
    worksheet: [
      {
        kind: "correct-sentence",
        prompt: "Add the missing list commas and retype the sentence!",
        sentence: "We bought apples oranges and pears.",
        answer: "We bought apples, oranges, and pears.",
        why: "A list needs commas between its items. The comma before 'and' is the Oxford comma — optional, but neat!",
      },
      {
        kind: "correct-sentence",
        prompt: "This bone needs an owner. Fix and retype!",
        sentence: "The dogs bone is gone.",
        answer: "The dog's bone is gone.",
        why: "The bone belongs to one dog, so 'dog' needs an apostrophe + s to show possession.",
      },
      {
        kind: "fill-blank",
        prompt: "I am → I'm. The word 'I'm' is called a ______.",
        answer: "contraction",
      },
      {
        kind: "fill-blank",
        prompt: "Write the contraction for 'do not': ______",
        answer: "don't",
      },
      {
        kind: "match",
        prompt: "Match each example to its punctuation job!",
        left: ["Kai's kite", "can't", "Priya, Leo, and Sam"],
        right: ["a contraction: can + not", "shows the kite belongs to Kai", "commas separating a list"],
        answer: [1, 0, 2],
      },
      {
        kind: "short-answer",
        prompt: "Write one sentence about your family that uses an apostrophe to show ownership.",
        sampleAnswer: "My sister's bicycle is painted bright orange.",
      },
    ],
  },

  // -------------------------------------------------------------------------
  // 4. Prefixes and Suffixes
  // -------------------------------------------------------------------------
  {
    id: "english-primary-4",
    title: "Prefixes and Suffixes",
    emoji: "🧩",
    minutes: 11,
    intro:
      "Words are built like LEGO models! Snap a prefix on the front or a suffix on the end and you can build whole new words.",
    sections: [
      {
        heading: "Prefixes Go in Front",
        body:
          "A prefix is a word part ATTACHED to the start of a word that changes its meaning. 'un-' means not: unhappy = not happy. 're-' means again: redo = do again. 'pre-' means before: preview = see before.",
        example: "un + lock = unlock. One tiny part flips the whole meaning!",
        tip: "See 'un-', 're-', or 'pre-'? You already know half the word.",
      },
      {
        heading: "Suffixes Hang On the End",
        body:
          "A suffix attaches to the END of a word. '-ful' means full of: careful = full of care. '-less' means without: careless = without care. '-er' means someone who does: teacher = one who teaches.",
        example: "hope + less = hopeless (without hope). hope + ful = hopeful (full of hope). Opposites from the same root!",
        tip: "-less and -ful are meaning opposites: without vs. full of.",
      },
      {
        heading: "Decode Words Like a Detective",
        body:
          "Here's the superpower: when you meet a huge word, break it into parts. 'Unbreakable' = un (not) + break + able (can be done). So unbreakable = cannot be broken. You just read a three-part word!",
        example: "'Rereadable'? re (again) + read + able (can be). A book so good you can read it again!",
        tip: "Big words are just small words wearing costumes.",
      },
    ],
    vocab: [
      { word: "prefix", meaning: "A word part added to the START, like un- or re-." },
      { word: "suffix", meaning: "A word part added to the END, like -ful or -less." },
      { word: "root word", meaning: "The main word the parts attach to, like 'happy' in unhappy." },
      { word: "decode", meaning: "To work out a word's meaning by breaking it into parts." },
    ],
    funFact:
      "'un-' is super-glue for words: English speakers have stuck it onto more than a thousand words — unhappy, unplug, unzip, and even the silly 'unputdownable'!",
    quiz: [
      {
        question: "What does 'redo' mean?",
        options: ["do again", "do badly", "do before", "not do"],
        answerIndex: 0,
        explanation: "'re-' means again, so redo = do it again!",
        misconceptions: [
          "Yes! 're-' always means again — redo, replay, rewrite.",
          "'re-' doesn't judge quality — it just means one more time.",
          "'pre-' means before, but 're-' means again.",
          "'un-' means not — 're-' means again. Easy to mix up!",
        ],
      },
      {
        question: "Which word has a SUFFIX?",
        options: ["unhappy", "rewrite", "careless", "preheat"],
        answerIndex: 2,
        explanation: "'-less' is attached at the END of 'care' — that's a suffix!",
        misconceptions: [
          "'un-' sits at the START — that's a prefix.",
          "'re-' sits at the START too — another prefix.",
          "Yes! '-less' comes after the root word — a true suffix.",
          "'pre-' is at the START — prefixes go first!",
        ],
      },
      {
        question: "In 'fearless', what does '-less' mean?",
        options: ["full of fear", "without fear", "afraid again", "before fear"],
        answerIndex: 1,
        explanation: "'-less' means without — fearless means without fear!",
        misconceptions: [
          "Full of is '-ful' — fearless is the opposite!",
          "Yes! -less = without. No fear here.",
          "'re-' means again, not '-less'.",
          "'pre-' means before — different part entirely.",
        ],
      },
      {
        question: "un + happy = ? And what does it mean?",
        options: [
          "unhappy — not happy",
          "unhappy — very happy",
          "rehappy — happy again",
          "happiful — full of happy",
        ],
        answerIndex: 0,
        explanation: "'un-' means not, so unhappy = not happy.",
        misconceptions: [
          "Correct! un (not) + happy = unhappy. The prefix flips the meaning.",
          "'un-' means NOT — it can't make things MORE happy.",
          "Close thinking, but 'again' is 're-' — and it goes in front: 'rehappy' isn't a real word!",
          "'-ful' means full of, but suffixes attach to the end — and 'happiful' isn't standard English.",
        ],
      },
    ],
    worksheet: [
      {
        kind: "match",
        prompt: "Match each word to its meaning!",
        left: ["rewrite", "hopeless", "unfair", "teacher"],
        right: ["without hope", "do again", "one who teaches", "not fair"],
        answer: [1, 0, 3, 2],
      },
      {
        kind: "fill-blank",
        prompt: "un + kind = ______",
        answer: "unkind",
      },
      {
        kind: "fill-blank",
        prompt: "A suffix is added to the ______ of a word.",
        answer: "end",
      },
      {
        kind: "fill-blank",
        prompt: "care + -less = ______. It means without care.",
        answer: "careless",
      },
      {
        kind: "build-sentence",
        prompt: "Build a sentence about a mouse with no fear!",
        words: ["The", "fearless", "mouse", "explored", "the", "tunnel"],
        answer: "The fearless mouse explored the tunnel.",
      },
      {
        kind: "short-answer",
        prompt: "Use the prefix 're-' with any verb in a sentence.",
        sampleAnswer: "I will refill my water bottle before practice.",
      },
    ],
    challenge: {
      prompt:
        "Invent your own word using 'un-' or '-less'. Write it, then define it in one sentence.",
      hint: "Start from a real word: un + socks? sock + less? The sillier the better — as long as the parts do their jobs.",
      steps: [
        "Pick a base word you know, like 'nap', 'sock', or 'sound'.",
        "Add 'un-' (not) in front, or '-less' (without) at the end.",
        "Check: does your new word's meaning match what its parts promise?",
        "Write a one-sentence definition.",
        "Try it in a sentence to see if it sounds right!",
      ],
      answer: "Example: 'sockless' — without socks. 'I went sockless all summer.'",
      answerWhy:
        "Prefixes and suffixes are reliable meaning-makers: 'un-' consistently means not, and '-less' means without. Even a brand-new word announces its meaning — that's how readers decode words they've never seen before.",
    },
  },

  // -------------------------------------------------------------------------
  // 5. Paragraphs: One Main Idea Each
  // -------------------------------------------------------------------------
  {
    id: "english-primary-5",
    title: "Paragraphs: One Main Idea Each",
    emoji: "📄",
    minutes: 10,
    intro:
      "A paragraph is like a pizza box: it holds ONE pizza, not five random slices! Let's learn to pack one main idea per box.",
    sections: [
      {
        heading: "What Is a Paragraph?",
        body:
          "A paragraph is a group of sentences about ONE main idea. You spot it easily: it starts on a new line, often with a small indent. When the idea changes — new paragraph!",
        example:
          "A paragraph about your dog. A NEW paragraph when you switch to your goldfish. Different pets, different boxes.",
        tip: "New idea? New line. That's the paragraph rule.",
      },
      {
        heading: "The Topic Sentence Leads",
        body:
          "The topic sentence is the captain of the paragraph — it states the main idea first. Then the other sentences are the crew: details, reasons, and examples that support the captain.",
        example:
          "Topic sentence: 'My dog Biscuit is a chaos machine.' Details: he steals socks, digs holes, and barks at the vacuum.",
        tip: "State your main idea first, then back it up.",
      },
      {
        heading: "Stick to the Point",
        body:
          "Every sentence in the paragraph must belong there. Writing about Biscuit the dog? Then 'Bananas are berries' has to wait for a different paragraph. Off-topic sentences are like socks in the pizza box — wrong container!",
        example:
          "Main idea: our class trip. On-topic: the bus ride, the museum, the gift shop. Off-topic: your new shoes (unless the trip is ABOUT shoes).",
        tip: "Before you keep a sentence, ask: does this support the main idea?",
      },
    ],
    vocab: [
      { word: "paragraph", meaning: "A group of sentences about one main idea." },
      { word: "topic sentence", meaning: "The sentence that states the paragraph's main idea." },
      { word: "detail", meaning: "A fact or example that supports the main idea." },
      { word: "main idea", meaning: "What the paragraph is mostly about." },
    ],
    funFact:
      "Newspapers often use one-sentence paragraphs on purpose — short paragraphs help busy readers skim the news fast. Now you know writers can bend the rules on purpose!",
    quiz: [
      {
        question: "What does the topic sentence do?",
        options: [
          "Tells the main idea of the paragraph",
          "Lists the alphabet",
          "Tells a joke",
          "Comes last",
        ],
        answerIndex: 0,
        explanation: "The topic sentence leads the paragraph by stating its main idea.",
        misconceptions: [
          "Yes! The topic sentence announces what the whole paragraph is about.",
          "The alphabet is great, but it's not a topic.",
          "Jokes welcome the paragraph — but the topic sentence's job is the main idea.",
          "It usually comes FIRST, leading the paragraph like a captain.",
        ],
      },
      {
        question: "A paragraph is about your dog. Which detail does NOT belong?",
        options: [
          "He fetches tennis balls.",
          "He sleeps in a red bed.",
          "He barks at the mail carrier.",
          "Bananas are technically berries.",
        ],
        answerIndex: 3,
        explanation: "Bananas have nothing to do with your dog — that detail needs a different paragraph!",
        misconceptions: [
          "Fetching is a dog thing — it supports the main idea.",
          "A dog's bed fits right into a paragraph about your dog.",
          "Barking at the mail carrier is peak dog behavior — keep it!",
          "Yes! It's a true fact, but it's off-topic. True isn't the same as belonging.",
        ],
      },
      {
        question: "How does a new paragraph begin?",
        options: [
          "On a new line, often indented",
          "In the middle of a sentence",
          "Always with the letter W",
          "With a picture",
        ],
        answerIndex: 0,
        explanation: "A new paragraph starts on a fresh line — often with a little indent.",
        misconceptions: [
          "Yes! New line, small indent — that's how readers spot a new idea.",
          "Mid-sentence paragraph switches would scramble your ideas!",
          "No special letter required — any sentence can start a paragraph.",
          "Some paragraphs have pictures nearby, but the paragraph itself is words.",
        ],
      },
      {
        question:
          "Three sentences all describe frosting, candles, and a wish. What main idea do they share?",
        options: [
          "A birthday celebration",
          "How to fix bicycles",
          "The history of socks",
          "A rainy day",
        ],
        answerIndex: 0,
        explanation: "Frosting, candles, and a wish all point to one main idea: a birthday party!",
        misconceptions: [
          "Yes! Those details all belong to a birthday celebration.",
          "Bicycles need tools and wheels — no frosting required.",
          "Socks have their own story — candles and wishes aren't part of it.",
          "Rain brings puddles, not party candles.",
        ],
      },
    ],
    worksheet: [
      {
        kind: "fill-blank",
        prompt: "The ______ sentence tells the main idea of a paragraph.",
        answer: "topic",
      },
      {
        kind: "fill-blank",
        prompt: "A new paragraph starts on a new ______.",
        answer: "line",
      },
      {
        kind: "match",
        prompt: "Match each set of details to its topic!",
        left: ["whiskers, purring, litter box", "goalkeeper, penalty, whistles", "erasers, pencils, backpack"],
        right: ["a soccer match", "school supplies", "a pet cat"],
        answer: [2, 0, 1],
      },
      {
        kind: "short-answer",
        prompt: "Write a topic sentence about your favorite food.",
        sampleAnswer:
          "Tacos are the best food in the world because you can fill them with anything.",
      },
      {
        kind: "writing",
        prompt:
          "Write a short paragraph (3 sentences) about recess. Start with a topic sentence, then add two details that stick to the same idea.",
        sampleAnswer:
          "Recess is the best part of my day. I play four-square with Kai and Yuki, and we laugh until the bell rings. Even rainy-day recess inside is fun because we build paper forts.",
        minWords: 15,
      },
      {
        kind: "fill-blank",
        prompt: "Every sentence in a paragraph should stick to the same main ______.",
        answer: "idea",
      },
    ],
  },

  // -------------------------------------------------------------------------
  // 6. Creative Story Writing
  // -------------------------------------------------------------------------
  {
    id: "english-primary-6",
    title: "Creative Story Writing",
    emoji: "📖",
    minutes: 12,
    intro:
      "Every story ever told — from cave paintings to video games — rides the same story mountain: a beginning, a middle, and an end. Time for your climb!",
    sections: [
      {
        heading: "The Story Mountain",
        body:
          "The BEGINNING introduces your character, the setting, and a hint of trouble. The MIDDLE is where the big problem happens and things get hard. The END solves the problem and lands softly. Climb up, peak, glide down.",
        example:
          "Beginning: Yuki finds a locked box. Middle: the key is inside the neighbor's mysterious greenhouse. End: the box opens — and it's full of her grandmother's old letters.",
        tip: "If your story feels stuck, ask: what does my character WANT?",
      },
      {
        heading: "Characters Want Things",
        body:
          "A character who wants nothing has no story. A character who wants something — a lost puppy found, a race won, a monster befriended — creates problems, and problems create plots!",
        example:
          "Theo wants to fly. He builds wings out of umbrellas. They wobble. That's a story starting right there.",
        tip: "Strong want = strong story. Give your character a mission.",
      },
      {
        heading: "Juicy Details, Strong Finish",
        body:
          "Show feelings with actions instead of announcing them: 'Kai's hands trembled' beats 'Kai was scared'. Then give readers a real ending — the problem solved and a final moment that feels finished, like a landing, not a face-plant.",
        example:
          "Weak ending: 'Then they went home.' Strong ending: 'As the bus pulled away, Mira pressed the fossil to the window and grinned — her first real treasure.'",
        tip: "The last line should make the reader feel: ahh, complete.",
      },
    ],
    vocab: [
      { word: "character", meaning: "Who the story is about — a person, animal, or even a robot." },
      { word: "setting", meaning: "Where and when the story happens." },
      { word: "plot", meaning: "What happens in the story: the events from start to finish." },
      { word: "beginning", meaning: "The start of the story — characters, setting, and a hint of trouble." },
    ],
    funFact:
      "Aristotle, a thinker from ancient Greece, wrote over 2,300 years ago that every good story has a beginning, a middle, and an end. Storytellers still follow his advice today!",
    quiz: [
      {
        question: "What does the BEGINNING of a story do?",
        options: [
          "Introduces characters, setting, and a hint of trouble",
          "Solves the problem",
          "Shows the biggest battle",
          "Says 'The End'",
        ],
        answerIndex: 0,
        explanation:
          "The beginning sets the scene: who, where, and a first whisper of the problem.",
        misconceptions: [
          "Yes! The beginning introduces everyone and hints at trouble to come.",
          "Solving comes later — the beginning just sets things up.",
          "The biggest trouble usually peaks in the middle, not the start.",
          "'The End' is the finish line — the beginning is the starting line!",
        ],
      },
      {
        question: "Where does the big problem usually happen?",
        options: ["The beginning", "The middle", "The end", "In the title"],
        answerIndex: 1,
        explanation: "The middle is where trouble peaks — it's the mountain's summit!",
        misconceptions: [
          "The beginning only HINTS at trouble — the full blast comes later.",
          "Yes! The middle is where problems pile up and stakes rise.",
          "The end solves the problem — it doesn't start the biggest one.",
          "Titles tease the story — the big drama happens inside, in the middle.",
        ],
      },
      {
        question: "What makes an ending satisfying?",
        options: [
          "It solves the problem and feels finished",
          "It stops suddenly mid-sentence",
          "It introduces ten new characters",
          "It forgets the problem",
        ],
        answerIndex: 0,
        explanation: "A good ending resolves the problem and lands like a gentle touchdown.",
        misconceptions: [
          "Yes! Solve the problem, give a final moment, done.",
          "Stopping mid-sentence leaves readers hanging — and not in a good way.",
          "Ten new characters at the end? That's chaos, not closure.",
          "Readers need the problem solved — forgetting it breaks the story.",
        ],
      },
      {
        question: "Which detail shows what a character FEELS?",
        options: [
          "Kai's hands trembled as he opened the door.",
          "The door was brown.",
          "The door had a handle.",
          "It was Tuesday.",
        ],
        answerIndex: 0,
        explanation:
          "Trembling hands SHOW nervousness — actions let readers feel the emotion themselves.",
        misconceptions: [
          "Yes! Trembling hands show nerves without saying 'nervous'.",
          "A brown door describes the setting — not a feeling.",
          "Handles are handy, but they don't carry emotion.",
          "The day of the week sets time — feelings need actions.",
        ],
      },
    ],
    worksheet: [
      {
        kind: "writing",
        prompt:
          "Write the BEGINNING of a story about a lost puppy. Introduce your character, the setting, and hint at the problem. (At least 2 sentences.)",
        sampleAnswer:
          "Yuki was walking home through Maple Park when she heard a tiny whimper. Behind the bench sat a muddy puppy with no collar, blinking up at her with hopeful eyes.",
        minWords: 20,
      },
      {
        kind: "match",
        prompt: "Match each story snippet to its story part!",
        left: [
          "Once upon a time, in a quiet village…",
          "Suddenly, the dragon swooped down!",
          "At last, safe at home, Mira smiled.",
        ],
        right: ["the ending", "the beginning", "the middle"],
        answer: [1, 2, 0],
      },
      {
        kind: "short-answer",
        prompt: "Invent a character and tell what they WANT.",
        sampleAnswer:
          "Theo, a shy robot, wants to learn how to tell jokes so he can make his little sister laugh.",
      },
      {
        kind: "fill-blank",
        prompt: "The middle of the story is where the big ______ happens.",
        answer: "problem",
      },
      {
        kind: "build-sentence",
        prompt: "Build a story-opening sentence with a mysterious describing word!",
        words: ["Kai", "opened", "the", "mysterious", "door"],
        answer: "Kai opened the mysterious door.",
      },
      {
        kind: "fill-blank",
        prompt: "The time and place of a story is called the ______.",
        answer: "setting",
      },
    ],
    challenge: {
      prompt:
        "Mini writing brief: write a three-sentence story about a magic backpack — sentence 1 = beginning (character + setting), sentence 2 = middle (the big problem), sentence 3 = end (how it's solved).",
      hint: "Give the backpack ONE magical power. What goes wrong because of it? Each sentence does exactly one job.",
      steps: [
        "Sentence 1: name a character, a place, and mention the magic backpack.",
        "Sentence 2: the backpack's magic causes a big problem.",
        "Sentence 3: the character solves the problem — end with a satisfying last line.",
        "Read it back: does each sentence do its own job?",
        "Polish: swap one word for a juicier synonym.",
      ],
      answer:
        "Example: 'Sam found a dusty backpack that produced any book he wished for. But when it sneezed out a dragon encyclopedia, the dragon crawled right off the page! Sam wished for a quiet bedtime story, and the dragon curled up, snored, and turned back into print.'",
      answerWhy:
        "The three sentences do the three jobs: introduce, complicate, resolve. Beginning–middle–end isn't a formula for boring stories — it's the frame that makes ANY idea feel complete.",
    },
  },
];
