// Reading — Early (ages 6-8)
// Six lessons: short vowel word families, long vowels & silent e, sight words,
// story elements (who/what/where), predicting, and little context clues.
// Every lesson has a REAL decodable story to read plus post-reading questions.
// Short sentences, mostly decodable words, lots of warmth — tiny readers
// becoming real readers.
import type { Lesson } from "./types";

export const lessons: Lesson[] = [
  // -------------------------------------------------------------------------
  // 1. Phonics: Short Vowel Word Families
  // -------------------------------------------------------------------------
  {
    id: "reading-early-1",
    title: "Phonics: Short Vowel Word Families",
    emoji: "🐱",
    minutes: 6,
    intro:
      "Cat, hat, mat — these words are twins! Learn the sound families -at, -en and -ig, then read a whole story about a cat and a big pig all by yourself.",
    sections: [
      {
        heading: "Word Families Are Sound Twins",
        body:
          "A word family is a group of words that end the same way and rhyme. The -at family goes: cat, mat, sat, hat, rat. Change the first letter and — pop! — a brand-new word appears.",
        example:
          "Blend it out loud: c…a…t. Say it faster: cat! Now swap the c for an m: m…a…t — mat! Same ending, new word.",
        tip: "If you can read 'cat', you can already read mat, hat, rat and sat. Word families give you lots of words for free!",
      },
      {
        heading: "More Sound Twins: -en and -ig",
        body:
          "The -en family: hen, pen, ten, den. The -ig family: big, pig, dig, wig. Say the ending first — 'en', 'ig' — then stick the first sound on the front. That is called blending, and it is how readers unlock new words.",
        example:
          "p + ig = pig. w + ig = wig. h + en = hen. Three blends, three words — easy!",
        tip: "When a new word looks hard, slide it apart: s…l…ow. Then zip it back together. You've got this!",
      },
      {
        heading: "Part 1: Read the story",
        body:
          "The Cat and the Big Pig. The cat sat. The cat sat on a mat. A big pig ran to the cat. The pig did not stop. The pig hit the mat! The cat did not like that.",
        tip: "Put your finger under each word. Tap the ones from the -at, -en and -ig families as you read.",
      },
      {
        heading: "Part 2: Finish the story",
        body:
          "The cat said, 'No, no, big pig!' The pig got a wig. He put on the wig. 'I am a big pig in a wig!' The cat and the pig sat on the mat. They had a nap in the sun.",
        tip: "Read it again — can you read it even smoother the second time?",
      },
    ],
    vocab: [
      { word: "word family", meaning: "Words that end the same and rhyme, like cat, hat and mat." },
      { word: "blend", meaning: "Pushing sounds together to make a word, like c-a-t makes cat." },
      { word: "rhyme", meaning: "Words that end with the same sound, like pig and wig." },
    ],
    funFact:
      "The -at family is a champion: cat, hat, bat, rat, mat, sat, fat, pat — learn one ending and you can read eight words!",
    quiz: [
      {
        question: "Which word rhymes with cat?",
        options: ["bed", "hat", "pig"],
        answerIndex: 1,
        explanation: "Hat ends with -at just like cat. They are sound twins from the -at family!",
        misconceptions: [
          "'Bed' ends with -ed, a different family.",
          "Yes! 'Hat' ends with -at, so it rhymes with 'cat'.",
          "'Pig' ends with -ig, so it rhymes with 'big' and 'wig' instead.",
        ],
      },
      {
        question: "Blend it: h - a - t. Which word do you get?",
        options: ["hat", "hit", "hop"],
        answerIndex: 0,
        explanation: "h + a + t = hat. The middle a makes its short sound: /ă/.",
        misconceptions: [
          "Right! H…a…t pushes together into 'hat'.",
          "'Hit' has an i in the middle — this blend has an a.",
          "'Hop' has an o — look again at the middle letter.",
        ],
      },
      {
        question: "Which word belongs to the -ig family?",
        options: ["pen", "big", "cat"],
        answerIndex: 1,
        explanation: "'Big' ends with -ig, so it is in the -ig family with pig, dig and wig.",
        misconceptions: [
          "'Pen' belongs to the -en family with hen and ten.",
          "Yes! 'Big' is an -ig word, just like 'pig' from the story.",
          "'Cat' belongs to the -at family.",
        ],
      },
      {
        question: "In the story, what did the pig put on?",
        options: ["a hat", "a wig", "a mat"],
        answerIndex: 1,
        explanation: "The pig put on a wig and said, 'I am a big pig in a wig!'",
        misconceptions: [
          "Nobody in the story wore a hat — check Part 2 again!",
          "Yes! The pig got a wig and put it on.",
          "The mat is where everyone SAT — the pig wore a wig.",
        ],
      },
    ],
    worksheet: [
      {
        kind: "fill-blank",
        prompt: "Type the missing story word: 'The cat sat on the ______.' (It rhymes with hat.)",
        answer: "mat",
        hint: "It starts with m.",
      },
      {
        kind: "fill-blank",
        prompt: "Blend the sounds to make the word: p + i + g = ______. (Type the whole word.)",
        answer: "pig",
      },
      {
        kind: "match",
        prompt: "Sort each word into its word family!",
        left: ["cat", "pig", "hen"],
        right: ["-ig family", "-at family", "-en family"],
        answer: [1, 0, 2],
      },
      {
        kind: "fill-blank",
        prompt: "In the story, the big pig ran to the ______. (Type one word.)",
        answer: "cat",
      },
      {
        kind: "short-answer",
        prompt: "Tell what happened in the story. What did the pig do, and how did it end?",
        sampleAnswer:
          "A big pig ran to the cat and bumped the mat. The cat said no, no! Then the pig put on a wig, and the cat and the pig had a nap in the sun.",
      },
    ],
  },

  // -------------------------------------------------------------------------
  // 2. Phonics: Long Vowels and Silent e
  // -------------------------------------------------------------------------
  {
    id: "reading-early-2",
    title: "Phonics: Long Vowels and Silent e",
    emoji: "🪁",
    minutes: 6,
    intro:
      "There is a sneaky helper at the end of some words: silent e! It hides, but it makes vowels shout their own names. Then you can read a story about a kite, a cake and a bike ride.",
    sections: [
      {
        heading: "Silent e Is a Magic Helper",
        body:
          "Compare: cap and cape. Kit and kite. Hop and hope. The little e at the end does not make a sound — but it makes the vowel in the middle say its NAME. That is called a long vowel sound.",
        example:
          "Without e: cap (short a, like a hat). With e: cape (long a — 'ay!'). The e is silent, but it does a loud job.",
        tip: "Silent e whispers: 'Say your name!' to the vowel before it.",
      },
      {
        heading: "Three Magic Families: a-e, i-e, o-e",
        body:
          "a-e words: cake, lake, made, name. i-e words: bike, kite, ride, fine. o-e words: home, nose, hope, bone. Spot the pattern: consonant + vowel + consonant + silent e.",
        example:
          "can → cane. kit → kite. hop → hope. Add one silent e and each vowel says its name!",
        tip: "See an e at the end? Try the long vowel sound first — it usually works!",
      },
      {
        heading: "Part 1: Read the story",
        body:
          "A Bike, a Kite and a Cake. Jake got a new bike. He rides it fast. May has a red kite. The kite goes up, up, up! Mom made a cake. The cake has lime ice on top.",
        tip: "Tap every silent e word you find. There are lots: bike, kite, cake, made, rides…",
      },
      {
        heading: "Part 2: Finish the story",
        body:
          "Jake rides home. He can see the cake. May runs with her kite. They eat cake at the table. Yum! What a fine day to ride a bike and fly a kite.",
        tip: "Read the last line loud and proud — it has THREE silent e words!",
      },
    ],
    vocab: [
      { word: "long vowel", meaning: "When a vowel says its own name, like the i in kite." },
      { word: "silent e", meaning: "An e at the end of a word that is not said out loud but changes the vowel sound." },
      { word: "rhyme", meaning: "Words that end with the same sound, like cake and lake." },
    ],
    funFact:
      "Silent e is over 600 years old! Scribes added it so words would not end in a lone v or u — and it stayed, changing how vowels sound.",
    quiz: [
      {
        question: "Which word has a LONG a sound (a says its name)?",
        options: ["cap", "cape", "tap"],
        answerIndex: 1,
        explanation: "Cape has silent e, so the a says its name: 'ay'. Cap and tap have short a.",
        misconceptions: [
          "'Cap' has no silent e, so the a makes its short sound.",
          "Yes! The silent e makes 'cape' say long a.",
          "'Tap' has no silent e — short a again.",
        ],
      },
      {
        question: "The silent e in 'bike' makes the i…",
        options: ["say its short sound", "say its name", "disappear"],
        answerIndex: 1,
        explanation: "Silent e makes the vowel say its NAME: i in 'bike' says /ī/.",
        misconceptions: [
          "Short i is what 'kit' says — silent e stretches it long.",
          "Right! The i says its name — /ī/ — because of silent e.",
          "The i is still said out loud! Only the e stays silent.",
        ],
      },
      {
        question: "What did Mom make in the story?",
        options: ["a cake", "a kite", "a bike"],
        answerIndex: 0,
        explanation: "Mom made a cake with lime ice on top. Jake had the bike and May had the kite!",
        misconceptions: [
          "Yes! Mom made the cake in Part 1.",
          "The kite belongs to May — she flies it.",
          "The bike is Jake's new ride.",
        ],
      },
      {
        question: "Add silent e to make a new word: kit → kite. Now can → ?",
        options: ["kitt", "cane", "can"],
        answerIndex: 1,
        explanation: "can + e = cane. The silent e makes the a say its name!",
        misconceptions: [
          "Two t's is not how it works — just add e at the end.",
          "Yes! 'Cane' is 'can' with a magic e.",
          "Look again — 'can' with nothing added stays 'can'.",
        ],
      },
    ],
    worksheet: [
      {
        kind: "fill-blank",
        prompt: "Silent e makes the vowel say its ______. (Type one word.)",
        answer: "name",
      },
      {
        kind: "fill-blank",
        prompt: "Finish the rhyme: 'The kite goes up so high, up into the ______.' (Type one word.)",
        answer: "sky",
        hint: "It rhymes with high and starts with s.",
      },
      {
        kind: "match",
        prompt: "Match each word to its long vowel sound!",
        left: ["cake", "bike", "home"],
        right: ["long i", "long o", "long a"],
        answer: [2, 0, 1],
      },
      {
        kind: "fill-blank",
        prompt: "In the story, May runs with her ______. (Type one word.)",
        answer: "kite",
      },
      {
        kind: "short-answer",
        prompt: "What did Jake and May do on that fine day? Tell one thing from the story.",
        sampleAnswer:
          "Jake rode his new bike home, May flew her red kite, and they ate Mom's cake at the table.",
      },
    ],
  },

  // -------------------------------------------------------------------------
  // 3. Sight Words and Reading Smoothly
  // -------------------------------------------------------------------------
  {
    id: "reading-early-3",
    title: "Sight Words and Reading Smoothly",
    emoji: "📖",
    minutes: 6,
    intro:
      "Some little words pop up EVERYWHERE — the, like, said, you. Learn to spot them in a snap, track with your finger, and read like you talk!",
    sections: [
      {
        heading: "Sight Words: Words You Just Know",
        body:
          "Sight words are tiny busy words like the, like, said, you, we, my, do and to. Many of them cannot be sounded out — you just LEARN them by eye, like recognizing a friend's face. When you know them instantly, reading gets fast and fun.",
        example:
          "In 'I like to read', three words are sight words: I, like, to. Only 'read' needs sounding out!",
        tip: "Meet a sight word five times and it moves in forever. Flash them like animal cards!",
      },
      {
        heading: "Finger Tracking: Read Like You Talk",
        body:
          "Put your finger under each word as you read. It stops your eyes from jumping around. Try not to robot-blurt word… word… word — let words flow together smoothly, like you are telling a friend something.",
        example:
          "'We… like… to… play' sounds jumpy. Smooth it out: 'We like to play!' Same words, happy rhythm.",
        tip: "Read a line twice: first slow with your finger, then smooth like talking.",
      },
      {
        heading: "Part 1: Read the story",
        body:
          "I Like To… 'I like to read,' said Amara. 'I like to run,' said Kai. 'I like to play with my dog,' said Tomás. 'Do you like to run?' asked Amara. 'Yes, I do!' said Kai. 'I like to run fast!'",
        tip: "Look how many times 'I', 'like', 'to' and 'said' appear. Those are sight words — you can snap-read them!",
      },
      {
        heading: "Part 2: Finish the story",
        body:
          "'Do you like to read?' asked Tomás. 'Yes, I do!' said Amara. 'I read every day.' We like to read. We like to run. We like to play. What do you like to do?",
        tip: "This story repeats lines on purpose. Repeated words make reading smoother — enjoy the rhythm!",
      },
    ],
    vocab: [
      { word: "sight word", meaning: "A little word you learn to know right away, like the, said and like." },
      { word: "smooth", meaning: "Reading that flows like talking — not jumpy and robot-y." },
      { word: "pattern", meaning: "Something that repeats, like the lines in this story." },
    ],
    funFact:
      "Just 100 little words make up about HALF of everything you read. Words like 'the' and 'and' are the busiest words in every book!",
    quiz: [
      {
        question: "Which word is a sight word you should just remember?",
        options: ["wagon", "splash", "said"],
        answerIndex: 2,
        explanation: "'Said' shows up in books all the time — learn it by eye and you never have to sound it out.",
        misconceptions: [
          "'Wagon' is a longer word you CAN sound out — wag-on.",
          "'Splash' is a fun word to sound out, not a sight word.",
          "Yes! 'Said' is a super-common sight word.",
        ],
      },
      {
        question: "In the story, what does Kai like to do?",
        options: ["run", "bake", "paint"],
        answerIndex: 0,
        explanation: "Kai says, 'I like to run… I like to run fast!'",
        misconceptions: [
          "Yes! Running fast is Kai's favourite.",
          "Nobody bakes in this story — that was in another one!",
          "No painting here — Amara likes to read.",
        ],
      },
      {
        question: "What does the word 'said' tell you?",
        options: ["someone is speaking", "someone is sleeping", "someone is running"],
        answerIndex: 0,
        explanation: "'Said' means someone spoke — like 'I like to read,' said Amara.",
        misconceptions: [
          "Right! 'Said' introduces what someone says out loud.",
          "Sleepy words would be 'yawned' or 'slept'.",
          "Running is an action — 'said' is a talking word.",
        ],
      },
      {
        question: "Where does your finger go while you track?",
        options: ["on your nose", "under each word", "in your pocket"],
        answerIndex: 1,
        explanation: "Track UNDER each word — it keeps your eyes moving smoothly along the line.",
        misconceptions: [
          "Silly nose! Your finger helps your EYES, so it goes on the page.",
          "Yes! Under each word, left to right, like a little train.",
          "Keep the finger on the page — it is your reading helper.",
        ],
      },
    ],
    worksheet: [
      {
        kind: "fill-blank",
        prompt: "Type the missing story word: 'I like to ______,' said Amara. (She opened a book.)",
        answer: "read",
      },
      {
        kind: "fill-blank",
        prompt: "A sight word is a word you know right ______, without sounding it out. (Type one word.)",
        answer: "away",
      },
      {
        kind: "match",
        prompt: "Match each word to what it does!",
        left: ["said", "you", "play"],
        right: ["an action word", "names the person being talked to", "tells someone is speaking"],
        answer: [2, 1, 0],
      },
      {
        kind: "fill-blank",
        prompt: "Track under each word with your ______ to read smoothly. (Type one word.)",
        answer: "finger",
      },
      {
        kind: "short-answer",
        prompt: "Use the story pattern to tell about YOU. Say or write: 'I like to ______.' Give two things.",
        sampleAnswer: "I like to swim. I like to draw pictures of cats.",
      },
    ],
  },

  // -------------------------------------------------------------------------
  // 4. Story Time: Who, What and Where
  // -------------------------------------------------------------------------
  {
    id: "reading-early-4",
    title: "Story Time: Who, What and Where",
    emoji: "🦆",
    minutes: 7,
    intro:
      "Every story hides three treasures: WHO was in it, WHAT happened, and WHERE it happened. Read a real story about Noor and some hungry ducks — then go treasure hunting!",
    sections: [
      {
        heading: "Every Story Has Three Treasures",
        body:
          "WHO means the characters — the people or animals in the story. WHAT means what happened — the things they did. WHERE means the setting — the place the story happens. Good readers hunt for all three!",
        example:
          "'Kai kicked the ball in the park.' WHO: Kai. WHAT: kicked the ball. WHERE: the park. Three treasures, one little sentence!",
        tip: "Ask yourself after every story: Who? What? Where?",
      },
      {
        heading: "Be a Story Detective",
        body:
          "When you finish a story, shut your eyes and make a picture in your head. Who was in it? What did they do first, next and last? Where did it all happen? If you can answer, you really READ it — not just the words, but the whole story.",
        example:
          "A bedtime story about a dragon: WHO is the dragon, WHAT did it do, and WHERE does it live — a cave? a castle? a treehouse?",
        tip: "Retell it to a grown-up or a teddy. Retelling makes the story stick!",
      },
      {
        heading: "Part 1: Read the story",
        body:
          "Noor and the Ducks. Noor went to the pond with her dad. She took bread for the ducks. A fat duck waddled up. Quack! Quack! It ate the bread fast. Then a little duck came. It was too slow. The fat duck ate all the bread!",
        tip: "Treasure hunt: WHO is in the story so far? WHERE are they?",
      },
      {
        heading: "Part 2: Finish the story",
        body:
          "Noor got more bread from her bag. She fed the little duck first. The little duck ate and ate. Then it slept in the sun. The fat duck swam in the pond. Noor and her dad went home. 'What a fun day at the pond!' said Noor.",
        tip: "Now hunt for WHAT: what did Noor do for the little duck?",
      },
    ],
    vocab: [
      { word: "character", meaning: "A person or animal in a story, like Noor or the ducks." },
      { word: "setting", meaning: "Where and when a story happens, like the pond in the sun." },
      { word: "event", meaning: "Something that happens in a story, like feeding the ducks." },
    ],
    funFact:
      "Reporters ask the same three questions when they write the news: WHO, WHAT, WHERE. Stories and newspapers work the same way!",
    quiz: [
      {
        question: "Who is the story mostly about?",
        options: ["a bag of bread", "Noor and her dad", "a sleepy cat"],
        answerIndex: 1,
        explanation: "Noor and her dad went to the pond together — they are the main characters.",
        misconceptions: [
          "The bread is important, but it is a thing, not a character.",
          "Yes! Noor and her dad are in every part of the story.",
          "There is no cat in this story — the animals are ducks!",
        ],
      },
      {
        question: "Where did the story happen?",
        options: ["at the pond", "at school", "in a tree house"],
        answerIndex: 0,
        explanation: "Noor went to the pond to feed the ducks — that is the setting.",
        misconceptions: [
          "Yes! The whole story happens at the pond.",
          "No school in this story — it was a fun day out.",
          "Nobody climbed a tree here — look for the water!",
        ],
      },
      {
        question: "What did Noor do for the little duck?",
        options: ["she gave it a bath", "she fed it first", "she took its photo"],
        answerIndex: 1,
        explanation: "The little duck was too slow, so Noor fed it FIRST. Kind thinking!",
        misconceptions: [
          "No bath — but she did bring it something to eat!",
          "Yes! She fed the little duck first, before the fat duck.",
          "No photos in this story — just bread and kindness.",
        ],
      },
      {
        question: "What happened at the END of the story?",
        options: ["the fat duck ate all the bread", "Noor and her dad went home", "the ducks flew away"],
        answerIndex: 1,
        explanation: "At the end, Noor and her dad went home, and Noor said what a fun day!",
        misconceptions: [
          "That happened in Part 1 — the fat duck grabbed all the bread early.",
          "Yes! Going home happy is the ending.",
          "The ducks did not fly away — the little one slept in the sun!",
        ],
      },
    ],
    worksheet: [
      {
        kind: "fill-blank",
        prompt: "The people and animals in a story are called the ______. (Type one word.)",
        answer: "characters",
        hint: "It starts with c.",
      },
      {
        kind: "fill-blank",
        prompt: "Noor took ______ to the pond for the ducks. (Type one word.)",
        answer: "bread",
      },
      {
        kind: "match",
        prompt: "Match each treasure question to its answer from the story!",
        left: ["Who?", "Where?", "What?"],
        right: ["fed the ducks", "the pond", "Noor and her dad"],
        answer: [2, 1, 0],
      },
      {
        kind: "fill-blank",
        prompt: "The little duck slept in the ______ after eating. (Type one word.)",
        answer: "sun",
      },
      {
        kind: "short-answer",
        prompt: "Tell what happened in the story, in your own words. Start with 'Noor…'. Say the WHO, the WHAT and the WHERE!",
        sampleAnswer:
          "Noor and her dad went to the pond with bread. The fat duck ate all the bread, so Noor fed the little duck first. The little duck ate, slept in the sun, and they went home happy.",
      },
    ],
  },

  // -------------------------------------------------------------------------
  // 5. Guess What Comes Next (Predicting)
  // -------------------------------------------------------------------------
  {
    id: "reading-early-5",
    title: "Guess What Comes Next (Predicting)",
    emoji: "🔮",
    minutes: 7,
    intro:
      "Good readers are guessers — SMART guessers! They use story clues to predict what comes next. Read to the cliff-hanger of this mystery-box story and make your own prediction.",
    sections: [
      {
        heading: "Reading Is Smart Guessing",
        body:
          "To predict means to guess what will happen next, using clues from the story. You are not just guessing wildly — you are a detective! If a character packs a swimsuit, you can predict a swim. Clues first, guess second.",
        example:
          "'Amara put on her wellies and grabbed an umbrella.' Predict: it is probably raining outside!",
        tip: "Say it like a pro: 'I predict… because…'. The BECAUSE is the magic word.",
      },
      {
        heading: "Clue Hunters Stop and Think",
        body:
          "Great readers stop at exciting spots and ask two questions: What will happen next? And WHY do I think that? If your prediction turns out different — no problem! Stories love surprises. Just make a new prediction and keep reading.",
        example:
          "A dog is staring at an open cookie jar, tail wagging. Predict: what probably happened? Why do you think so?",
        tip: "There can be MORE than one good prediction — as long as your clues back you up.",
      },
      {
        heading: "Part 1: Read the story",
        body:
          "The Mystery Box. Kai and Zara made a big paper box. They painted it red and blue. 'It is a mystery box,' said Kai. They put it by the big tree. Then they hid behind the tree. What is that? A squirrel ran to the box! It sniffed and sniffed. It pushed the box with its nose.",
        tip: "Stop! Predict: what will the squirrel do to the box? Why do you think that?",
      },
      {
        heading: "Part 2: The cliff-hanger!",
        body:
          "The box began to tip… tip… TIP! Just then, Mom called from the porch. 'Snack time!' Kai and Zara ran to get sandwiches. What will they find when they come back?",
        tip: "The story stops right at the exciting part — that is called a cliff-hanger. Your prediction finishes it!",
      },
    ],
    vocab: [
      { word: "predict", meaning: "To guess what happens next, using clues." },
      { word: "clue", meaning: "A hint in the story that helps you guess." },
      { word: "mystery", meaning: "Something strange that you wonder about." },
    ],
    funFact:
      "Your brain is a prediction machine! It guesses the next word before you even read it. Good readers just guess SMARTER by using clues.",
    quiz: [
      {
        question: "What does it mean to predict?",
        options: [
          "to read the story twice",
          "to guess what happens next, using clues",
          "to skip to the end",
        ],
        answerIndex: 1,
        explanation: "Predicting is a smart guess about what comes next — clues first, guess second!",
        misconceptions: [
          "Reading twice helps you get smoother, but it is not predicting.",
          "Yes! Predict = guess next + use clues.",
          "Skipping the end spoils the fun — predictions make reading exciting!",
        ],
      },
      {
        question: "Where did Kai and Zara hide?",
        options: ["behind the porch", "behind a big tree", "under the box"],
        answerIndex: 1,
        explanation: "They put the box by the big tree, then hid behind the tree to watch.",
        misconceptions: [
          "Mom called FROM the porch — the kids hid behind the tree.",
          "Yes! The big tree was their hiding spot.",
          "They did not fit under the box — the squirrel went TO the box!",
        ],
      },
      {
        question: "Which animal came to the mystery box?",
        options: ["a cat", "a dog", "a squirrel"],
        answerIndex: 2,
        explanation: "A squirrel ran to the box, sniffed it, and pushed it with its nose!",
        misconceptions: [
          "No cat came — think bushy tail and acorns!",
          "No dog either — this visitor could climb the story faster.",
          "Yes! The squirrel did the sniffing and pushing.",
        ],
      },
      {
        question: "What will MOST LIKELY happen next?",
        options: [
          "the box will fly to the moon",
          "Mom will eat the box",
          "the box will tip over when they come back",
        ],
        answerIndex: 2,
        explanation:
          "The box was already tipping, tip… tip… TIP! The best prediction uses that clue: it will fall over.",
        misconceptions: [
          "Boxes cannot fly — and no clues point to the moon!",
          "Silly! Mom made snacks, not box soup.",
          "Yes! Tip… tip… TIP — the box is falling, so it will be over when they return.",
        ],
      },
    ],
    worksheet: [
      {
        kind: "fill-blank",
        prompt: "Good readers use story ______ to predict what comes next. (Type one word.)",
        answer: "clues",
      },
      {
        kind: "fill-blank",
        prompt: "The box began to ______ just before Mom called. (Type one word.)",
        answer: "tip",
      },
      {
        kind: "match",
        prompt: "Match each word to its meaning!",
        left: ["predict", "clue", "mystery"],
        right: ["a hint that helps you guess", "something strange you wonder about", "a smart guess about what is next"],
        answer: [2, 0, 1],
      },
      {
        kind: "fill-blank",
        prompt: "Kai and Zara ran to get ______ when Mom called. (Type one word.)",
        answer: "sandwiches",
        hint: "It starts with s — they were having snack time!",
      },
      {
        kind: "short-answer",
        prompt: "YOU finish the story! What do you think happens to the mystery box? Tell what you think AND why — use 'because'.",
        sampleAnswer:
          "I think the squirrel knocked the box over, because it pushed the box with its nose and the box was already tipping. When Kai and Zara come back, the box will be on its side.",
      },
    ],
  },

  // -------------------------------------------------------------------------
  // 6. New Words from the Story (Little Context Clues)
  // -------------------------------------------------------------------------
  {
    id: "reading-early-6",
    title: "New Words from the Story (Little Context Clues)",
    emoji: "🔍",
    minutes: 6,
    intro:
      "Meet a word you have never seen? Do not stop — be a word detective! The words around it give clues. Read this snowy story and crack four new words.",
    sections: [
      {
        heading: "Word Detectives Use Clues",
        body:
          "When you find a new word, the words AROUND it are your helpers. They are called context clues. Look for hints like what the word does, what it looks like, or how someone feels. Then make a smart guess about the meaning.",
        example:
          "'The lemon made Priya pucker her lips.' Even if you never met 'pucker', the lemon gives it away — your lips squeeze!",
        tip: "Reread the whole sentence. New words make more sense with their neighbours.",
      },
      {
        heading: "Try It: Four Mystery Words",
        body:
          "In the story you are about to read, four words might be new: SHIVERED, GIGANTIC, MUNCHED and PEEKED. Do not worry! The other words will help you. Cold day… pulled her coat tighter… what do you think 'shivered' means? See? You are already detecting.",
        example:
          "'It was gigantic — taller than her dad!' The words after the dash are a big clue about what gigantic means.",
        tip: "Smart guess beats perfect answer. Try it, then check with the quiz!",
      },
      {
        heading: "Part 1: Read the story",
        body:
          "Priya and the Gigantic Snowman. It was a cold, snowy day. Priya shivered and pulled her coat tighter. Then she got an idea. She built a snowman with three big snowballs. It was gigantic — taller than her dad! Priya used a carrot for the nose. Her puppy, Mochi, came out.",
        tip: "Detected any new words yet? 'Shivered' and 'gigantic' are hiding here.",
      },
      {
        heading: "Part 2: Finish the story",
        body:
          "Mochi munched the little bits of snow and wagged his tail. Priya peeked around the snowman. 'Boo!' she said. Mochi barked and jumped. They played until the sun went down. What a chilly, happy day!",
        tip: "Two more new words here: 'munched' and 'peeked'. Use the clues around them!",
      },
    ],
    vocab: [
      { word: "shivered", meaning: "Shook a little because of the cold." },
      { word: "gigantic", meaning: "Super, super big." },
      { word: "munched", meaning: "Chewed and ate with small bites." },
      { word: "peeked", meaning: "Looked quickly or secretly." },
    ],
    funFact:
      "Good readers meet 2 or 3 new words on every page — and context clues are how they learn them without a dictionary. You just did it!",
    quiz: [
      {
        question: "The snowman was GIGANTIC — taller than her dad! Gigantic means…",
        options: ["very small", "very big", "very round"],
        answerIndex: 1,
        explanation: "'Taller than her dad!' is the clue — gigantic means very, very big.",
        misconceptions: [
          "The clue says TALLER than her dad — that is big, not small.",
          "Yes! Gigantic = super big.",
          "Roundness is not the clue — height is!",
        ],
      },
      {
        question: "It was cold, so Priya SHIVERED and pulled her coat tighter. Shivered means…",
        options: ["she ran inside", "her body shook a little", "she clapped her hands"],
        answerIndex: 1,
        explanation: "Cold day + tighter coat = shivering, a little shake your body makes when cold.",
        misconceptions: [
          "She stayed out to build a snowman — the clue is about the cold.",
          "Yes! Shivering is a tiny shake from being cold.",
          "Clapping keeps hands warm, but shivering is the body-shake.",
        ],
      },
      {
        question: "Mochi MUNCHED the little bits of snow. Munched means…",
        options: ["hid under the snow", "painted the snow", "chewed and ate"],
        answerIndex: 2,
        explanation: "Munching is eating with crunchy little bites — like Mochi with the snow bits!",
        misconceptions: [
          "Munching happens with the mouth, not with hiding.",
          "No paints here — Mochi was snacking!",
          "Yes! Munched means chewed and ate.",
        ],
      },
      {
        question: "Which words in the story gave you a CLUE about 'gigantic'?",
        options: ["a carrot for the nose", "taller than her dad", "three big snowballs"],
        answerIndex: 1,
        explanation: "'Taller than her dad!' tells you gigantic is about being very big.",
        misconceptions: [
          "The carrot tells you about the snowman's face, not the word 'gigantic'.",
          "Yes! Comparing to her dad is the size clue.",
          "Good try — but 'taller than her dad' is the strongest size clue.",
        ],
      },
    ],
    worksheet: [
      {
        kind: "fill-blank",
        prompt: "The words ______ a new word give you clues about its meaning. (Type one word.)",
        answer: "around",
      },
      {
        kind: "fill-blank",
        prompt: "Priya built a gigantic snowman — taller than her ______. (Type one word.)",
        answer: "dad",
      },
      {
        kind: "match",
        prompt: "Match each new word to its meaning!",
        left: ["shivered", "peeked", "munched"],
        right: ["ate with small bites", "shook a little from cold", "looked quickly or secretly"],
        answer: [1, 2, 0],
      },
      {
        kind: "fill-blank",
        prompt: "Mochi munched the little bits of ______. (Type one word.)",
        answer: "snow",
      },
      {
        kind: "short-answer",
        prompt: "Tell what happened when Priya played with Mochi. Try to use ONE new word from the story.",
        sampleAnswer:
          "Priya peeked around the snowman and said Boo! Mochi barked and jumped, and they played until the sun went down.",
      },
    ],
  },
];
