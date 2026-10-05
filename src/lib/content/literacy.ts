// ---------------------------------------------------------------------------
// BrightMinds — Reading & Writing subject content
// 12 lessons: 3 per age group (early, primary, intermediate, teen)
// ---------------------------------------------------------------------------

import type { Subject } from "./types";

export const literacySubject: Subject = {
  id: "literacy",
  name: "Reading & Writing",
  emoji: "📚",
  gradient: "from-rose-400 to-pink-600",

  taglines: {
    early: "Rhymes, letters, and stories to start your reading adventure!",
    primary: "Level up your reading superpowers and write like a pro!",
    intermediate: "Decode texts, bend language like a writer, and argue with evidence.",
    teen: "Analyze literature, wield rhetoric, and craft a voice that's unmistakably yours.",
  },

  lessons: {
    // -----------------------------------------------------------------------
    // EARLY (ages 6-8)
    // -----------------------------------------------------------------------
    early: [
      {
        id: "literacy-early-1",
        title: "Letters and Their Sounds",
        emoji: "🔤",
        minutes: 6,
        intro: "Letters are little sound friends! Let's meet them and make rhymes together.",
        sections: [
          {
            heading: "Every Letter Makes a Sound",
            body: "Each letter has its own sound. B says buh, like in bat. S says sss, like in sun. Say them out loud with me!",
            example: "B says buh, like ball and bat. S says sss, like sun and sock.",
            tip: "Say each sound out loud. Hear it? You did it!",
          },
          {
            heading: "Rhyming Words Sound the Same",
            body: "Rhymes are words that end the same. Cat rhymes with hat. Star rhymes with car. Sing a little song and hear them match!",
            example: "Hop, top, mop — they all rhyme!",
            tip: "Change the first sound to make a new rhyme.",
          },
          {
            heading: "Put Sounds Together",
            body: "Now blend sounds into words. C... a... t... says cat! M... o... p... says mop! You are reading!",
            example: "c-a-t says cat. d-o-g says dog.",
            tip: "Go slow. Blend one sound at a time.",
          },
        ],
        vocab: [
          { word: "letter", meaning: "A letter is a mark like A, B, or C." },
          { word: "sound", meaning: "A sound is what you hear when you say a word." },
          { word: "rhyme", meaning: "A rhyme is a word that ends the same, like cat and hat." },
        ],
        funFact: "The alphabet song uses the same tune as 'Twinkle, Twinkle, Little Star'!",
        quiz: [
          {
            question: "Which word rhymes with cat?",
            options: ["dog", "hat", "sun"],
            answerIndex: 1,
            explanation: "Hat ends with -at, just like cat. Dog and sun end with different sounds.",
          },
          {
            question: "Which sound does M make in moon?",
            options: ["tuh", "sss", "mmm"],
            answerIndex: 2,
            explanation: "Moon starts with M, and M says mmm. Tuh is for T and sss is for S.",
          },
          {
            question: "Which word rhymes with star?",
            options: ["car", "tree", "book"],
            answerIndex: 0,
            explanation: "Star and car both end with -ar. Tree and book end differently.",
          },
          {
            question: "Blend it: c-a-t says which word?",
            options: ["dog", "sun", "cat"],
            answerIndex: 2,
            explanation: "Blend the sounds slowly: c... a... t... That makes cat!",
          },
        ],
        worksheet: [
          {
            kind: "fill-blank",
            prompt: "Cat rhymes with hat. The word 'hat' ends with the letters ___.",
            answer: "at",
            hint: "Listen to the ending sound.",
          },
          {
            kind: "match",
            prompt: "Draw a line from each word to its rhyme!",
            left: ["star", "cake", "dog"],
            right: ["car", "lake", "log"],
            answer: [0, 1, 2],
          },
          {
            kind: "fill-blank",
            prompt: "Blend the sounds: m-o-p says ___.",
            answer: "mop",
            hint: "Blend slowly: m... o... p...",
          },
          {
            kind: "short-answer",
            prompt: "Say a word that rhymes with bug out loud, then write it here!",
            sampleAnswer: "rug (hug, mug, or jug work too)",
          },
          {
            kind: "draw",
            prompt: "Draw your favorite story character and give them a big smile!",
          },
        ],
      },
      {
        id: "literacy-early-2",
        title: "Sight Words and Simple Sentences",
        emoji: "👀",
        minutes: 7,
        intro: "Some words you can read in one fast look — like magic! Let's use them to build sentences.",
        sections: [
          {
            heading: "Magic Sight Words",
            body: "Some little words pop up everywhere. The, and, I, and said are sight words. Learn to read them fast, in one look!",
            example: "I see the big red dog.",
            tip: "Flash them like cards. Fast eyes, fast words!",
          },
          {
            heading: "Build a Sentence",
            body: "A sentence tells a whole idea. Start with a capital letter. End with a period. Now it is complete!",
            example: "The cat sat on the mat.",
            tip: "Every sentence needs a dot at the end.",
          },
          {
            heading: "You Are a Writer",
            body: "Use sight words to write your own. Try: 'I see a bug.' Add more: 'I see a bug and a frog.' Wow — you wrote two sentences!",
            example: "I said hi to Mom.",
            tip: "Read your sentence out loud. Does it sound right?",
          },
        ],
        vocab: [
          { word: "sight word", meaning: "A sight word is a little word you read in one look." },
          { word: "sentence", meaning: "A sentence is words that tell a whole idea." },
          { word: "period", meaning: "A period is the dot at the end of a sentence." },
        ],
        funFact: "The word 'the' is the most common word in English — it shows up everywhere!",
        quiz: [
          {
            question: "Which word is a sight word?",
            options: ["dog", "the", "hop"],
            answerIndex: 1,
            explanation: "'The' is a tiny word we learn by sight. Dog and hop are words we can sound out.",
          },
          {
            question: "What goes at the end of a sentence?",
            options: ["a period (.)", "a star (★)", "a heart (♥)"],
            answerIndex: 0,
            explanation: "A period is the dot that tells you the sentence is done.",
          },
          {
            question: "Which sentence is written right?",
            options: ["the cat naps.", "The cat naps.", "the Cat naps"],
            answerIndex: 1,
            explanation: "A sentence starts with a capital letter and ends with a period.",
          },
          {
            question: "Which one tells a whole idea?",
            options: ["Big red", "The dog runs.", "fluffy cat"],
            answerIndex: 1,
            explanation: "'The dog runs.' is a full sentence. 'Big red' and 'fluffy cat' are just word pieces.",
          },
        ],
        worksheet: [
          {
            kind: "match",
            prompt: "Finish each sentence! Match the start to the best ending.",
            left: ["The dog", "I see", "We said"],
            right: ["hi.", "the moon.", "ran fast."],
            answer: [2, 1, 0],
          },
          {
            kind: "fill-blank",
            prompt: "Every sentence starts with a ___ letter.",
            answer: "capital",
            hint: "It is BIG!",
          },
          {
            kind: "fill-blank",
            prompt: "The dot at the end of a sentence is called a ___.",
            answer: "period",
            hint: "It is tiny and round.",
          },
          {
            kind: "short-answer",
            prompt: "Write one tiny sentence about a dog. Start big, end with a dot!",
            sampleAnswer: "The dog runs fast.",
          },
          {
            kind: "draw",
            prompt: "Draw a picture for the sentence 'The cat sat on the mat.'",
          },
        ],
      },
      {
        id: "literacy-early-3",
        title: "Story Time: Beginning, Middle, and End",
        emoji: "📖",
        minutes: 8,
        intro: "Every story is like a rainbow: beginning, middle, and end. Let's follow the colors!",
        sections: [
          {
            heading: "The Beginning",
            body: "Every story starts somewhere. The beginning tells who and where. It starts the fun!",
            example: "Once there was a bunny named Boo. He lost his carrot.",
            tip: "Look for the words 'once upon a time' or 'one day'.",
          },
          {
            heading: "The Middle",
            body: "Uh-oh! The middle is where trouble comes. The problem makes the story exciting!",
            example: "Boo looked and looked. No carrot anywhere!",
            tip: "The middle is the biggest part of the story.",
          },
          {
            heading: "The End",
            body: "The end fixes the problem. It says goodbye with a smile.",
            example: "Kai found the carrot. Hooray for Boo!",
            tip: "Endings often have a happy face or a little lesson.",
          },
        ],
        vocab: [
          { word: "character", meaning: "A character is who the story is about." },
          { word: "problem", meaning: "The problem is the trouble in the story." },
          { word: "ending", meaning: "The ending is how the story finishes." },
        ],
        funFact: "Long before books, people told stories out loud around fires — your ears were the first library!",
        quiz: [
          {
            question: "Which story part comes first?",
            options: ["the end", "the beginning", "the middle"],
            answerIndex: 1,
            explanation: "Stories start at the beginning, then go to the middle, and end at the end.",
          },
          {
            question: "What is a character?",
            options: ["A person or animal in the story", "The cover of the book", "The trouble in the story"],
            answerIndex: 0,
            explanation: "A character is who the story is about — like Boo the bunny!",
          },
          {
            question: "The middle of a story has the...",
            options: ["The cover", "The problem", "The goodbye"],
            answerIndex: 1,
            explanation: "The middle is where the problem happens and makes things exciting.",
          },
          {
            question: "'The bunny found his carrot. Hooray!' Which part is it?",
            options: ["The beginning", "The middle", "The end"],
            answerIndex: 2,
            explanation: "The problem is fixed and the story says goodbye — that is the end!",
          },
        ],
        worksheet: [
          {
            kind: "fill-blank",
            prompt: "Every story starts at the ___.",
            answer: "beginning",
            hint: "It comes first!",
          },
          {
            kind: "match",
            prompt: "Match each story part to what happens there!",
            left: ["Beginning", "Middle", "End"],
            right: ["The problem is fixed", "We meet the characters", "The problem happens"],
            answer: [1, 2, 0],
          },
          {
            kind: "fill-blank",
            prompt: "The trouble in a story is called the ___.",
            answer: "problem",
            hint: "It makes you say uh-oh!",
          },
          {
            kind: "short-answer",
            prompt: "Who is the character in a story you love?",
            sampleAnswer: "Boo the bunny — or any character from your favorite book.",
          },
          {
            kind: "draw",
            prompt: "Draw what happens in the middle of a story you love!",
          },
        ],
      },
    ],

    // -----------------------------------------------------------------------
    // PRIMARY (ages 9-11)
    // -----------------------------------------------------------------------
    primary: [
      {
        id: "literacy-primary-1",
        title: "Nouns, Verbs & Adjectives",
        emoji: "🏷️",
        minutes: 10,
        intro: "Words have jobs: some name things, some do things, and some describe things. Meet the word team!",
        sections: [
          {
            heading: "Nouns: The Name Team",
            body: "A noun names something: a person, a place, a thing, or an animal. Teacher, playground, backpack, puppy — all nouns! Names like Maya and Dev are nouns too. If you can point at it, it's probably a noun.",
            example: "Leo found a fossil behind the school.",
            tip: "Spot test: can you take a photo of it? Then it's likely a noun.",
          },
          {
            heading: "Verbs: The Action Team",
            body: "A verb shows action or being. Run, jump, whisper, giggle, is, and was are all verbs. Every sentence needs at least one — without a verb, nothing happens!",
            example: "Amara sprinted across the field and slid into home base.",
            tip: "If you can do it with your body, it's probably a verb.",
          },
          {
            heading: "Adjectives: The Describe Team",
            body: "An adjective describes a noun. It tells what something looks, sounds, or feels like. Fuzzy, enormous, brave, shiny, purple — adjectives make writing colorful.",
            example: "A tiny, brave mouse outsmarted an enormous, sleepy cat.",
            tip: "Adjectives usually sit right before the noun they describe.",
          },
        ],
        vocab: [
          { word: "noun", meaning: "A noun names a person, place, thing, or animal." },
          { word: "verb", meaning: "A verb shows an action or a state of being." },
          { word: "adjective", meaning: "An adjective describes what a noun is like." },
          { word: "describe", meaning: "To describe is to say what something is like." },
        ],
        funFact: "The word 'noun' comes from the Latin 'nomen,' which simply means 'name.'",
        quiz: [
          {
            question: "Which word is a noun?",
            options: ["quickly", "Amara", "shouted", "enormous"],
            answerIndex: 1,
            explanation: "Amara names a person. 'Quickly' tells how, 'shouted' is an action, and 'enormous' describes.",
          },
          {
            question: "Which word is a verb?",
            options: ["backpack", "giggle", "silly", "grass"],
            answerIndex: 1,
            explanation: "'Giggle' shows an action — something you do. The others name or describe things.",
          },
          {
            question: "Which word is an adjective?",
            options: ["swim", "table", "fluffy", "Dev"],
            answerIndex: 2,
            explanation: "'Fluffy' describes what something is like. Swim is an action, table is a thing, Dev is a name.",
          },
          {
            question: "In 'Marco painted a bright mural,' which word is the adjective?",
            options: ["painted", "mural", "bright", "a"],
            answerIndex: 2,
            explanation: "'Bright' describes the mural. 'Painted' is the verb and 'mural' is the noun.",
          },
        ],
        worksheet: [
          {
            kind: "fill-blank",
            prompt: "A word that names a person, place, or thing is a ___.",
            answer: "noun",
          },
          {
            kind: "fill-blank",
            prompt: "In 'The fluffy rabbit hopped,' the word 'hopped' is a ___.",
            answer: "verb",
          },
          {
            kind: "fill-blank",
            prompt: "In 'Sofia wore a shiny badge,' the word 'shiny' is an ___.",
            answer: "adjective",
            hint: "It starts with a vowel, so use 'an'.",
          },
          {
            kind: "match",
            prompt: "Match each word to its job!",
            left: ["dragon", "galloped", "sparkly"],
            right: ["adjective", "noun", "verb"],
            answer: [1, 2, 0],
          },
          {
            kind: "short-answer",
            prompt: "Write one sentence with a noun, a verb, AND an adjective.",
            sampleAnswer: "Kai adopted a playful puppy.",
          },
          {
            kind: "fill-blank",
            prompt: "In 'Zara whispered a secret,' the person's name is a ___.",
            answer: "noun",
            hint: "It names a person.",
          },
        ],
      },
      {
        id: "literacy-primary-2",
        title: "Reading Comprehension Superpowers",
        emoji: "🦸",
        minutes: 12,
        intro: "Great readers aren't lucky — they use superpowers. Time to activate yours.",
        sections: [
          {
            heading: "Superpower 1: Predict",
            body: "Predicting means using clues to make a smart guess about what happens next. Good readers predict all the time — and change their guesses as new clues appear. It's like being a detective who reads!",
            example: "If Noah's kite string snaps in chapter one, you might predict a chase after the runaway kite.",
            tip: "Pause at chapter breaks and ask: 'What might happen next — and why do I think so?'",
          },
          {
            heading: "Superpower 2: Question",
            body: "Strong readers talk to the book in their heads. They ask: Why did Dev hide the letter? What will Aisha do now? Questions keep your brain switched on, and reading on usually brings answers.",
            example: "'Why did the dog dig up the garden?' Keep reading — authors love to answer.",
            tip: "No answer yet? Write your question in the margin and hunt for it.",
          },
          {
            heading: "Superpower 3: Visualize",
            body: "Visualizing means making a movie in your mind from the author's words. If the story says 'the cabin creaked in the icy wind,' you can almost hear it. Details are the film equipment — use them!",
            example: "'The cocoa steamed, and the marshmallows bobbed like little boats.' Can you see it? Can you smell it?",
            tip: "Close your eyes for five seconds after a description. Replay it.",
          },
        ],
        vocab: [
          { word: "predict", meaning: "To predict is to make a smart guess about what happens next." },
          { word: "clue", meaning: "A clue is a piece of information that helps you guess or understand." },
          { word: "question", meaning: "A question is something you ask to learn more." },
          { word: "visualize", meaning: "To visualize is to picture the story in your mind like a movie." },
        ],
        funFact: "Scientists found that reading about smells can wake up the smell part of your brain — words really do light up your senses!",
        quiz: [
          {
            question: "Using clues to guess what happens next is called...",
            options: ["predicting", "skipping", "copying", "shouting"],
            answerIndex: 0,
            explanation: "Predicting is a smart guess based on clues. Good readers do it constantly.",
          },
          {
            question: "Which is a good question to ask while reading?",
            options: ["How much does the book weigh?", "Why did the character hide the map?", "What is my shoe size?", "How many pages can I skip?"],
            answerIndex: 1,
            explanation: "Asking about the character keeps your brain engaged with the story.",
          },
          {
            question: "Making a movie of the story in your mind is called...",
            options: ["memorizing", "daydreaming off-topic", "visualizing", "speed-reading"],
            answerIndex: 2,
            explanation: "Visualizing means picturing the story using the author's details.",
          },
          {
            question: "The story says: 'Noah's hands shook as he opened the envelope.' What can you predict?",
            options: ["Noah is hungry", "Noah is asleep", "The envelope is empty", "Noah is nervous about what's inside"],
            answerIndex: 3,
            explanation: "Shaking hands are a clue. They suggest Noah is nervous about the letter.",
          },
        ],
        worksheet: [
          {
            kind: "fill-blank",
            prompt: "Making a smart guess about what happens next is called ___.",
            answer: "predicting",
          },
          {
            kind: "fill-blank",
            prompt: "Picturing the story in your mind like a movie is called ___.",
            answer: "visualizing",
          },
          {
            kind: "fill-blank",
            prompt: "A piece of information that helps you guess is a ___.",
            answer: "clue",
            hint: "Detectives collect them.",
          },
          {
            kind: "match",
            prompt: "Match each superpower to what it does!",
            left: ["Predict", "Question", "Visualize"],
            right: ["Picture the story like a movie", "Guess what happens next", "Ask who, what, and why"],
            answer: [1, 2, 0],
          },
          {
            kind: "short-answer",
            prompt: "A story begins: 'Aisha found a mysterious locked box in the attic.' What do you predict happens next?",
            sampleAnswer: "She finds the key and discovers something surprising inside.",
          },
          {
            kind: "short-answer",
            prompt: "Why does asking questions help you understand a story better?",
            sampleAnswer: "It keeps your brain curious and looking for answers as you read.",
          },
        ],
      },
      {
        id: "literacy-primary-3",
        title: "Great Paragraphs & Story Elements",
        emoji: "✍️",
        minutes: 12,
        intro: "A paragraph is like a pizza slice: one main idea with tasty details on top. Then we'll stir in story magic.",
        sections: [
          {
            heading: "One Slice, One Idea",
            body: "A great paragraph sticks to ONE main idea. Start with a topic sentence that announces the idea. Add detail sentences that prove it with examples. Wrap up with a sentence that ties it together.",
            example: "Topic: 'Our class garden is amazing.' Details: 'We planted tomatoes and sunflowers. Dev waters them every morning. Last week we harvested our first carrots!'",
            tip: "If a sentence doesn't support the topic, save it for another paragraph.",
          },
          {
            heading: "The Story Elements Kit",
            body: "Stories are built from parts: characters (who), setting (where and when), and plot (what happens). Strong writers choose details that fit — a spooky setting makes a spooky plot easier.",
            example: "Setting: a floating city above the clouds. Character: Zara, a young cloud shepherd. Plot: her sheep drift toward a storm.",
            tip: "Before writing, fill in the kit: who, where, when, and what's the problem?",
          },
          {
            heading: "Hook Your Reader",
            body: "The first sentence is your fishing hook. Start with something surprising, a big question, or a sound: 'BOOM! The volcano burped.' A good hook makes readers NEED to find out what happens next.",
            example: "'Nobody expected the class hamster to escape — least of all through Marco's backpack.'",
            tip: "Stuck? Write your ending first, then hook readers toward it.",
          },
        ],
        vocab: [
          { word: "topic sentence", meaning: "The topic sentence tells what a paragraph is mainly about." },
          { word: "detail", meaning: "A detail is a small piece of information that supports the main idea." },
          { word: "setting", meaning: "The setting is where and when a story happens." },
          { word: "plot", meaning: "The plot is what happens in a story, from start to finish." },
        ],
        funFact: "'Paragraph' comes from the Greek 'paragraphos,' meaning 'written beside' — a mark ancient editors scribbled next to the text.",
        quiz: [
          {
            question: "What does a topic sentence do?",
            options: ["Ends every story", "Counts the words", "Tells what the paragraph is mainly about", "Names the illustrator"],
            answerIndex: 2,
            explanation: "The topic sentence announces the paragraph's main idea, usually at the start.",
          },
          {
            question: "The where and when of a story is the...",
            options: ["plot", "setting", "detail", "noun"],
            answerIndex: 1,
            explanation: "Setting tells where and when the story happens.",
          },
          {
            question: "Which detail BEST supports the topic sentence 'Our class garden is amazing'?",
            options: ["I like pizza", "Gardens are a seven-letter word", "The sky is blue", "We grew sunflowers taller than the door"],
            answerIndex: 3,
            explanation: "The sunflower detail proves the garden is amazing. The others are off-topic.",
          },
          {
            question: "What happens in a story, from start to finish, is the...",
            options: ["setting", "title", "cover", "plot"],
            answerIndex: 3,
            explanation: "The plot is the sequence of events, from beginning to end.",
          },
        ],
        worksheet: [
          {
            kind: "fill-blank",
            prompt: "The first sentence of a paragraph, which tells the main idea, is the ___ sentence.",
            answer: "topic",
          },
          {
            kind: "fill-blank",
            prompt: "Where and when a story happens is the ___.",
            answer: "setting",
          },
          {
            kind: "fill-blank",
            prompt: "Small pieces of information that support the main idea are ___.",
            answer: "details",
          },
          {
            kind: "short-answer",
            prompt: "Write a topic sentence about your favorite animal.",
            sampleAnswer: "Dolphins are some of the smartest animals in the ocean.",
          },
          {
            kind: "match",
            prompt: "Match each story element to its job!",
            left: ["Setting", "Character", "Plot"],
            right: ["What happens in the story", "Where and when it happens", "Who the story is about"],
            answer: [1, 2, 0],
          },
          {
            kind: "short-answer",
            prompt: "What is one way to hook your reader in the very first sentence?",
            sampleAnswer: "Start with something surprising, a big question, or a funny sound.",
          },
        ],
      },
    ],

    // -----------------------------------------------------------------------
    // INTERMEDIATE (ages 12-13)
    // -----------------------------------------------------------------------
    intermediate: [
      {
        id: "literacy-intermediate-1",
        title: "Figurative Language: Similes, Metaphors & More",
        emoji: "🎭",
        minutes: 12,
        intro: "Writers rarely say things straight — they bend language to paint pictures. Learn their favorite tools.",
        sections: [
          {
            heading: "Simile and Metaphor",
            body: "A simile compares two things using 'like' or 'as': 'The hallway was as loud as a rock concert.' A metaphor skips the signal words and says one thing IS another: 'The final exam was a monster.' Both create imagery — pictures and sensations in the reader's mind — but a metaphor tends to hit harder because it fuses the two things together.",
            example: "Simile: 'Her smile was like a sunrise.' Metaphor: 'Her smile was a sunrise.'",
            tip: "Quick test: is 'like' or 'as' doing the comparing? Call it a simile.",
          },
          {
            heading: "Personification and Hyperbole",
            body: "Personification gives human actions or feelings to non-human things: 'The wind whispered through the bleachers.' Hyperbole is deliberate exaggeration for effect: 'I've told you a million times to charge your tablet.' Neither is meant literally — that's the point. The exaggeration and the human traits carry the emotion.",
            example: "'My alarm clock screamed at me this morning' — personification with a dash of hyperbole.",
            tip: "If a sentence literally can't be true, the writer is probably being figurative.",
          },
          {
            heading: "Why Writers Bend Language",
            body: "Figurative language does work that plain statements can't: it compresses meaning and creates feeling. Song lyrics, ads, and sports commentary lean on it constantly. When you analyze a text, notice a figure of speech, name the device, and explain what it adds — that's a complete analytical move.",
            example: "'The team's defense was a brick wall' says toughness and reliability in five words.",
            tip: "Spot it, name it, explain it: 'This metaphor suggests...'",
          },
        ],
        vocab: [
          { word: "simile", meaning: "A simile compares two things using 'like' or 'as'." },
          { word: "metaphor", meaning: "A metaphor states that one thing IS another." },
          { word: "personification", meaning: "Personification gives human traits to non-human things." },
          { word: "hyperbole", meaning: "Hyperbole is extreme exaggeration used for effect." },
          { word: "imagery", meaning: "Imagery is language that appeals to the senses and paints pictures in the mind." },
        ],
        funFact: "Chaucer wrote a version of 'time flies' around 1386 — an idiom still going strong after more than 600 years.",
        quiz: [
          {
            question: "'The cafeteria was as silent as a library.' This is a...",
            options: ["metaphor", "simile", "hyperbole", "personification"],
            answerIndex: 1,
            explanation: "The comparison uses 'as,' which makes it a simile.",
          },
          {
            question: "'My backpack weighs a ton.' This is...",
            options: ["simile", "personification", "hyperbole", "alliteration"],
            answerIndex: 2,
            explanation: "It's deliberate exaggeration for effect — hyperbole. Nobody weighs their backpack in tons.",
          },
          {
            question: "'The old car coughed and sputtered up the hill.' This is...",
            options: ["metaphor", "simile", "hyperbole", "personification"],
            answerIndex: 3,
            explanation: "Coughing and sputtering are human actions given to a car — personification.",
          },
          {
            question: "'The sunset was a painting spread across the sky.' This is a...",
            options: ["simile", "metaphor", "hyperbole", "onomatopoeia"],
            answerIndex: 1,
            explanation: "It says the sunset IS a painting — no 'like' or 'as' — so it's a metaphor.",
          },
          {
            question: "Which sentence uses a simile?",
            options: ["Leo is a lion on the soccer field", "Leo plays like a lion on the soccer field", "The soccer ball begged to be kicked", "I've watched a thousand soccer games"],
            answerIndex: 1,
            explanation: "Only this option uses 'like' to compare Leo to a lion. Option A is a metaphor; the others are personification and hyperbole.",
          },
        ],
        worksheet: [
          {
            kind: "fill-blank",
            prompt: "A comparison using 'like' or 'as' is a ___.",
            answer: "simile",
          },
          {
            kind: "fill-blank",
            prompt: "Saying one thing IS another ('the test was a monster') is a ___.",
            answer: "metaphor",
          },
          {
            kind: "fill-blank",
            prompt: "'The thunder grumbled all night' gives thunder a human action. This is ___.",
            answer: "personification",
          },
          {
            kind: "fill-blank",
            prompt: "'I've told you a million times to charge your tablet' is an extreme exaggeration called ___.",
            answer: "hyperbole",
          },
          {
            kind: "short-answer",
            prompt: "Rewrite 'Sofia was very tired' as a simile.",
            sampleAnswer: "Sofia was as tired as a hibernating bear.",
          },
          {
            kind: "short-answer",
            prompt: "Why might an ad use hyperbole like 'the best snack in the universe'?",
            sampleAnswer: "To grab attention and make the product feel exciting and unforgettable.",
          },
        ],
      },
      {
        id: "literacy-intermediate-2",
        title: "Non-Fiction: Text Structures & Main Idea",
        emoji: "📰",
        minutes: 13,
        intro: "Non-fiction writers organize ideas like architects design buildings. Find the blueprint, and the main idea reveals itself.",
        sections: [
          {
            heading: "Five Ways to Build a Text",
            body: "Writers organize non-fiction in predictable structures: description, sequence (chronological order), cause and effect, compare and contrast, and problem and solution. A news article about a wildfire might trace cause and effect: a dry season, a lightning strike, a fast-moving blaze. Recognizing the structure turns a wall of text into a map.",
            example: "'Because the storm arrived early, the harvest failed, and prices doubled' — one sentence, a full cause-and-effect chain.",
            tip: "Skim first for the structure, then read closely for facts.",
          },
          {
            heading: "Hunting the Main Idea",
            body: "The topic is what a text is about; the main idea is the point the author makes about that topic. It's often in the topic sentence, but not always — sometimes you assemble it from details. Supporting details are the facts, examples, and statistics that prove the main idea. If you deleted a sentence and the argument survived, it was a supporting detail; if the argument collapsed, you found the main idea.",
            example: "An article about sea turtles: topic — 'conservation'; main idea — 'beach programs are helping turtle populations recover.'",
            tip: "Ask: 'What does the author want me to believe or understand?'",
          },
          {
            heading: "Signal Words Are Signposts",
            body: "Authors leave linguistic breadcrumbs. 'Because,' 'since,' and 'therefore' signal cause and effect. 'However,' 'in contrast,' and 'on the other hand' signal compare and contrast. 'First,' 'next,' and 'finally' signal sequence. 'A solution is to...' signals problem and solution. Underline them first — they map the author's plan before you've read a full paragraph.",
            example: "'Unlike last season, the team now rotates pitchers' — 'unlike' announces a comparison.",
            tip: "Signal words are road signs; ignore them and you'll miss the turn.",
          },
        ],
        vocab: [
          { word: "main idea", meaning: "The most important point the author wants you to understand." },
          { word: "supporting detail", meaning: "A fact or example that proves or explains the main idea." },
          { word: "text structure", meaning: "The way an author organizes information in a text." },
          { word: "cause", meaning: "The reason something happens." },
          { word: "effect", meaning: "The result that happens because of a cause." },
        ],
        funFact: "Skilled readers' eyes don't glide smoothly — they jump in tiny hops called saccades, landing about 4-5 times per second.",
        quiz: [
          {
            question: "An article explains events in order from 1969 to today. Which structure is it using?",
            options: ["sequence", "compare and contrast", "problem and solution", "description"],
            answerIndex: 0,
            explanation: "Events presented in time order use sequence, also called chronological order.",
          },
          {
            question: "Words like 'however' and 'on the other hand' signal which structure?",
            options: ["cause and effect", "chronological order", "compare and contrast", "description"],
            answerIndex: 2,
            explanation: "These signal words announce a comparison or contrast between two things.",
          },
          {
            question: "The main idea of a passage is...",
            options: ["the first sentence, always", "the most important point the author makes", "the funniest detail", "the title copied word-for-word"],
            answerIndex: 1,
            explanation: "The main idea is the author's central point. It's often in the topic sentence, but not always.",
          },
          {
            question: "'Because the bridge was icy, the city closed it overnight.' What structure is this sentence mainly using?",
            options: ["compare and contrast", "sequence", "description", "cause and effect"],
            answerIndex: 3,
            explanation: "'Because' links the icy bridge (cause) to the closing (effect).",
          },
          {
            question: "An article's main idea is 'School gardens improve student health.' Which sentence is a supporting detail?",
            options: ["School gardens help students eat healthier.", "Last spring, Marco's class grew 40 pounds of carrots.", "Carrots are orange.", "This article is about gardens."],
            answerIndex: 1,
            explanation: "A specific fact with numbers that proves the main idea is a supporting detail. Option A just restates the main idea.",
          },
        ],
        worksheet: [
          {
            kind: "fill-blank",
            prompt: "The most important point an author makes is the ___ idea.",
            answer: "main",
            hint: "Two words together: ___ idea.",
          },
          {
            kind: "fill-blank",
            prompt: "Words like 'because' and 'therefore' signal a ___-and-effect structure.",
            answer: "cause",
          },
          {
            kind: "fill-blank",
            prompt: "Events told in the order they happened use ___ order.",
            answer: "chronological",
            hint: "It shares a root with 'chronometer,' a timekeeper.",
          },
          {
            kind: "fill-blank",
            prompt: "The structure that shows how two things are alike and different is called compare and ___.",
            answer: "contrast",
          },
          {
            kind: "short-answer",
            prompt: "A paragraph reads: 'Video games get a bad rap. Studies show strategy games can sharpen problem-solving skills.' State the main idea in your own words.",
            sampleAnswer: "Video games may be more useful than people think — they can build thinking skills.",
          },
          {
            kind: "short-answer",
            prompt: "In one sentence, explain the difference between a cause and an effect.",
            sampleAnswer: "The cause is why something happens; the effect is the result of it happening.",
          },
        ],
      },
      {
        id: "literacy-intermediate-3",
        title: "Essay Basics: Claim, Reasons, Evidence",
        emoji: "📝",
        minutes: 15,
        intro: "An essay is a court case on paper: state your claim, back it with reasons, and win with evidence.",
        sections: [
          {
            heading: "Start With a Claim",
            body: "Every persuasive essay stands on a claim — your position, stated in one clear, specific sentence. 'School lunches are okay-ish' isn't a claim; it shrugs. 'Our school should offer a daily vegetarian option' takes a position someone could dispute. A strong claim is narrow enough to defend with the space you have.",
            example: "Weak: 'Exercise matters.' Strong: 'Riverdale Middle School should add a 10-minute movement break between second and third period.'",
            tip: "If nobody could disagree, it's a fact, not a claim — aim for debatable.",
          },
          {
            heading: "Reasons, Then Evidence",
            body: "Reasons answer why your claim is true; evidence proves the reasons. Evidence comes in a few forms: facts, statistics, expert quotes, and real examples. Plan one reason per body paragraph, each followed by at least two pieces of evidence. 'It would help students focus' is a reason; '22% of students in one study reported losing focus before lunch' is evidence.",
            example: "Reason: a later start improves sleep. Evidence: the American Academy of Pediatrics recommends 8:30 a.m. starts for teens.",
            tip: "For every reason ask 'says who?' — then find the source.",
          },
          {
            heading: "Assemble the Essay",
            body: "The structure is straightforward. Introduction: a hook to grab attention, then your claim. Body: one paragraph per reason, evidence inside each. Conclusion: restate the claim in fresh words and leave the reader with stakes — why it matters. Strong essays also address the counterargument: admit the other side's best point, then answer it.",
            example: "'Some say a later start would cut into practice time; however, schools that switched saw teams finish drills faster because players trained more alert.'",
            tip: "Outline before drafting: claim → three reasons → evidence for each → counterargument → conclusion.",
          },
        ],
        vocab: [
          { word: "claim", meaning: "Your position on an issue, stated as one clear, debatable sentence." },
          { word: "reason", meaning: "A statement that explains WHY your claim is true." },
          { word: "evidence", meaning: "Facts, statistics, examples, or expert quotes that prove a reason." },
          { word: "counterargument", meaning: "The opposing viewpoint, which you acknowledge and then answer." },
          { word: "hook", meaning: "An opening line designed to grab the reader's attention." },
        ],
        funFact: "Ancient Greek and Roman students practiced essays with drills called 'progymnasmata' — persuasive writing homework from 2,000 years ago.",
        quiz: [
          {
            question: "Which is the strongest claim for an essay?",
            options: ["Pizza is food.", "I kind of like homework, maybe.", "Our town should add a bike lane on Maple Street to keep riders safe.", "Bikes have wheels."],
            answerIndex: 2,
            explanation: "It's specific, debatable, and narrow enough to defend. The others are facts or shrugs.",
          },
          {
            question: "Evidence in an essay means...",
            options: ["your feelings only", "facts, statistics, or expert quotes that support a reason", "the longest paragraph", "a made-up story"],
            answerIndex: 1,
            explanation: "Evidence is verifiable proof — facts, statistics, examples, or expert quotes.",
          },
          {
            question: "What belongs in an essay's introduction?",
            options: ["every detail you know", "a hook and your claim", "only the conclusion", "a list of vocabulary words"],
            answerIndex: 1,
            explanation: "The introduction hooks the reader and states the claim.",
          },
          {
            question: "Addressing a counterargument makes your essay stronger because...",
            options: ["it fills extra space", "it shows you've considered other viewpoints and can answer them", "it confuses the reader", "it removes the need for evidence"],
            answerIndex: 1,
            explanation: "Confronting the best opposing point shows your position can survive challenges.",
          },
          {
            question: "'In 2023, our city's bike-share trips doubled after one protected lane opened' is an example of...",
            options: ["a counterargument", "a hook", "evidence", "a conclusion"],
            answerIndex: 2,
            explanation: "It's a statistic that proves a reason — textbook evidence.",
          },
        ],
        worksheet: [
          {
            kind: "fill-blank",
            prompt: "Your position on an issue, stated in one sentence, is your ___.",
            answer: "claim",
          },
          {
            kind: "fill-blank",
            prompt: "Facts, statistics, and expert quotes that back up your reasons are called ___.",
            answer: "evidence",
          },
          {
            kind: "fill-blank",
            prompt: "The opposing viewpoint you acknowledge and then answer is the ___.",
            answer: "counterargument",
          },
          {
            kind: "fill-blank",
            prompt: "Which essay part is this: 'Imagine missing breakfast every single day — that's the reality for one in four students here.'? Write one word.",
            answer: "hook",
            hint: "It's designed to grab attention.",
          },
          {
            kind: "short-answer",
            prompt: "Turn 'School starts too early' into a strong, specific claim.",
            sampleAnswer: "Our school should start 30 minutes later so students can get enough sleep.",
          },
          {
            kind: "short-answer",
            prompt: "You claim the library needs later hours. Name one piece of evidence you could look for.",
            sampleAnswer: "A survey showing students want to study there after 3 p.m., or checkout records.",
          },
        ],
      },
    ],

    // -----------------------------------------------------------------------
    // TEEN (ages 14-15)
    // -----------------------------------------------------------------------
    teen: [
      {
        id: "literacy-teen-1",
        title: "Literary Analysis: Theme, Tone & Symbolism",
        emoji: "🔍",
        minutes: 18,
        intro: "Literature rarely means exactly what it says. Analysis is how you read between the lines — and prove what you find there.",
        sections: [
          {
            heading: "Theme Is an Argument, Not a Word",
            body: "A topic is what a work is about; a theme is what it argues about life. 'Family' is a topic. 'Family is built by loyalty, not blood' is a theme — and you could defend it with evidence from The Outsiders, where Johnny and Dally survive through gang loyalty rather than through their homes. Always push a topic to a full, arguable sentence.",
            example: "Topic: loyalty. Theme: 'In The Outsiders, loyalty becomes the family Ponyboy never had — for better and for worse.'",
            tip: "A theme must be debatable; if everyone agrees instantly, sharpen it.",
          },
          {
            heading: "Tone Is Built Word by Word",
            body: "Tone is the author's attitude toward the subject, manufactured from diction (word choice) and syntax (sentence structure). In The Outsiders, Ponyboy's colloquial first-person narration signals his age and honesty. In Sonnet 18, Shakespeare's 'darling buds of May' sounds tender and admiring. The analytical question is always: why THIS word and not a neutral one?",
            example: "'Rough winds do shake the darling buds of May' — 'rough' set against 'darling' builds a protective, loving tone.",
            tip: "Collect three charged words from a passage; the tone usually hides in them.",
          },
          {
            heading: "Symbols, Motifs, and Your Claim",
            body: "A symbol is an object that carries a larger meaning: the green light in The Great Gatsby compresses Gatsby's entire longing into one image. A motif is a recurring element — an image, phrase, or situation — that accumulates meaning with each appearance. In an analytical essay, make a claim (what you think), support it with quotes (how the text shows it), and explain the stakes (so what it means).",
            example: "Claim: 'Fitzgerald's green light symbolizes a future that stays permanently out of reach.' Evidence: Gatsby 'stretched out his arms toward' it each night.",
            tip: "Formula: claim → evidence → commentary. Repeat until your reader is convinced.",
          },
        ],
        vocab: [
          { word: "theme", meaning: "A work's central, arguable message about life — stated as a full sentence." },
          { word: "tone", meaning: "The author's attitude toward the subject, built through word choice." },
          { word: "diction", meaning: "An author's deliberate choice of words, which shapes tone and meaning." },
          { word: "symbolism", meaning: "The use of an object or image to represent a larger idea." },
          { word: "motif", meaning: "An image or idea that recurs throughout a work and builds meaning." },
          { word: "evidence", meaning: "Quoted words from the text used to prove an interpretation." },
        ],
        funFact: "Shakespeare gave us hundreds of words still in use today, including 'eyeball,' 'bedroom,' and 'lonely.'",
        quiz: [
          {
            question: "Which statement is a theme, not merely a topic?",
            options: ["Courage", "War happens", "Courage often means acting despite fear, not the absence of it", "Soldiers feel afraid"],
            answerIndex: 2,
            explanation: "A theme is a full, arguable claim about life. 'Courage' is just a topic word.",
          },
          {
            question: "An author describes a funeral using words like 'hollow,' 'gray,' and 'hushed.' The tone is best described as...",
            options: ["cheerful", "desolate", "sarcastic", "nostalgic"],
            answerIndex: 1,
            explanation: "Empty, colorless, silent diction builds a desolate — bleak and abandoned — tone.",
          },
          {
            question: "In The Great Gatsby, the green light at the end of Daisy's dock most plausibly symbolizes...",
            options: ["Gatsby's longing for a future that stays just out of reach", "Nick's jealousy of Gatsby's parties", "Daisy's wealth, in a strictly literal sense", "the dangers of electricity"],
            answerIndex: 0,
            explanation: "Gatsby literally stretches toward the light as he dreams of Daisy and the future with her — an unattainable dream.",
          },
          {
            question: "A repeated image of caged birds across a novel most likely functions as...",
            options: ["an accident of setting", "a motif suggesting confinement and longing", "the story's antagonist", "a red herring planted by the narrator"],
            answerIndex: 1,
            explanation: "A recurring image that builds meaning across a text is a motif — here, one about confinement and freedom.",
          },
          {
            question: "Which is the strongest analytical claim about The Outsiders?",
            options: ["The book is about teenagers.", "S.E. Hinton uses Ponyboy's narration to show empathy crossing social divides.", "Two gangs appear in the book.", "I thought the ending was sad."],
            answerIndex: 1,
            explanation: "It makes an arguable claim about HOW the novel creates meaning, provable with quotes. The others are facts or opinions.",
          },
        ],
        worksheet: [
          {
            kind: "fill-blank",
            prompt: "A work's central, arguable message about life is its ___.",
            answer: "theme",
          },
          {
            kind: "fill-blank",
            prompt: "The author's attitude toward the subject, built through word choice, is the ___.",
            answer: "tone",
          },
          {
            kind: "fill-blank",
            prompt: "An object that carries a larger meaning — like Gatsby's green light — is a ___.",
            answer: "symbol",
          },
          {
            kind: "practice",
            prompt: "Quoting the text to prove your interpretation is using ___. Write one word.",
            answer: "evidence",
            hint: "It's the proof in your analytical essay.",
          },
          {
            kind: "short-answer",
            prompt: "Turn the topic 'friendship' into a one-sentence theme you could defend with evidence.",
            sampleAnswer: "True friendship demands sacrifice, but it is worth the cost.",
          },
          {
            kind: "short-answer",
            prompt: "In Romeo and Juliet, light and dark imagery recurs throughout the play. What might this repeated contrast suggest?",
            sampleAnswer: "The lovers' brilliance shining against the darkness of the feud — love thriving in a violent world.",
          },
        ],
      },
      {
        id: "literacy-teen-2",
        title: "Rhetoric & Persuasion: Ethos, Pathos, Logos",
        emoji: "🗣️",
        minutes: 18,
        intro: "Every persuasive text is engineered, from campaign speeches to sneaker ads. Aristotle drew the blueprint 2,300 years ago — and it still works.",
        sections: [
          {
            heading: "The Three Appeals",
            body: "Aristotle split persuasion into three appeals. Ethos is credibility: the speaker's character, experience, and trustworthiness. Pathos is emotion: stories and images that move the audience. Logos is logic: facts, statistics, and reasoning. Strong persuasion braids all three, but most texts lean hardest on one — your job is to notice which, and how.",
            example: "A shelter ad shows one trembling dog (pathos), quotes 'a veterinarian with 20 years of experience' (ethos), and cites 'adoption cuts stray populations 40%' (logos).",
            tip: "Ask of any line: is it trying to make me trust, feel, or conclude?",
          },
          {
            heading: "Devices That Do the Work",
            body: "Beyond the appeals, watch for rhetorical devices: anaphora — repeating a phrase at the start of successive clauses, as in Churchill's 'we shall fight on the beaches' — rhetorical questions that make the audience argue with themselves, and charged diction that frames the issue before the argument begins. Also notice concession: when a speaker admits the other side's best point, it builds fairness right before the rebuttal lands.",
            example: "'How long must families wait for a safe crossing before this city acts?' — a rhetorical question that turns listeners into debaters.",
            tip: "When a speaker says 'I understand your concern...' a rebuttal is coming.",
          },
          {
            heading: "How to Analyze a Speech",
            body: "Analysis follows a method. First, state the speaker's central claim. Next, identify the appeals and devices, quoting exact lines. Then consider the audience: who are they, and what does the speaker want them to feel or do? Finally, judge effectiveness — which moments actually move the audience, and which fall flat? Lincoln's Gettysburg Address is a model: 272 words that reframe a battle as a test of whether a nation 'conceived in liberty' can endure.",
            example: "Claim of the Gettysburg Address: the war is a test of democracy itself. Method: solemn diction ('hallow,' 'devotion') plus structural reversal — 'government of the people, by the people, for the people.'",
            tip: "Quote small, analyze big: one sharp line beats a paragraph of summary.",
          },
        ],
        vocab: [
          { word: "ethos", meaning: "The appeal to the speaker's credibility, character, and trustworthiness." },
          { word: "pathos", meaning: "The appeal to the audience's emotions." },
          { word: "logos", meaning: "The appeal to logic: facts, statistics, and reasoning." },
          { word: "rhetoric", meaning: "The art of using language effectively to persuade or inform." },
          { word: "anaphora", meaning: "The repetition of a word or phrase at the start of successive clauses." },
          { word: "bias", meaning: "A leaning or prejudice that shapes how information is presented." },
        ],
        funFact: "Aristotle's 'Rhetoric,' written around 350 BCE, is still the persuasion toolkit students study more than 2,300 years later.",
        quiz: [
          {
            question: "A surgeon writing about health policy opens by mentioning 25 years of practice. Which appeal is this?",
            options: ["pathos", "logos", "ethos", "anaphora"],
            answerIndex: 2,
            explanation: "Establishing experience and credentials builds credibility — that's ethos.",
          },
          {
            question: "'How long must families wait for safe crossings before this city acts?' This device is...",
            options: ["a rhetorical question", "a statistic", "a simile", "a concession"],
            answerIndex: 0,
            explanation: "It isn't answered because the audience already knows the answer — a classic rhetorical question.",
          },
          {
            question: "Which excerpt relies most clearly on logos?",
            options: ["Imagine a child alone in the dark", "As a mother of three, I've seen it firsthand", "Traffic fatalities fell 30% after speed cameras were installed", "We will never surrender"],
            answerIndex: 2,
            explanation: "A specific statistic argued through data is logos. The others are pathos, ethos, and charged repetition.",
          },
          {
            question: "Anaphora is best described as...",
            options: ["repetition of a phrase at the start of successive clauses", "a comparison using 'like' or 'as'", "citing an expert's credentials", "ending a speech with a call to action"],
            answerIndex: 0,
            explanation: "Anaphora repeats opening words — 'we shall fight... we shall fight...' — to build rhythm and force.",
          },
          {
            question: "A strong rhetorical analysis should...",
            options: ["summarize the speech and note whether it was interesting", "identify the claim, examine how appeals and devices move the audience, and judge effectiveness", "list every fact the speech contains", "explain whether you personally agree with the speaker"],
            answerIndex: 1,
            explanation: "Analysis explains HOW persuasion works on an audience — not whether you liked or agreed with it.",
          },
        ],
        worksheet: [
          {
            kind: "fill-blank",
            prompt: "The appeal to the speaker's credibility and character is ___.",
            answer: "ethos",
          },
          {
            kind: "fill-blank",
            prompt: "The appeal to the audience's emotions is ___.",
            answer: "pathos",
          },
          {
            kind: "fill-blank",
            prompt: "The appeal to logic, facts, and evidence is ___.",
            answer: "logos",
          },
          {
            kind: "practice",
            prompt: "Identify the device: 'We shall fight in France... we shall fight in the seas and oceans... we shall fight on the beaches.' Write one word.",
            answer: "anaphora",
            hint: "Notice what repeats at the start of each clause.",
          },
          {
            kind: "short-answer",
            prompt: "In 'I Have a Dream,' Martin Luther King Jr. repeats 'I have a dream' across successive lines. What effect does this anaphora create for the audience?",
            sampleAnswer: "It builds rhythm and momentum, making the vision feel united, memorable, and unstoppable.",
          },
          {
            kind: "short-answer",
            prompt: "Think of a recent ad. Name one appeal it uses and explain how it works on the audience.",
            sampleAnswer: "A sneaker ad uses athlete endorsements (ethos) so viewers trust the shoes are winners' choices.",
          },
        ],
      },
      {
        id: "literacy-teen-3",
        title: "Finding Your Voice: Creative Writing Craft",
        emoji: "🪶",
        minutes: 20,
        intro: "Voice is the fingerprint you leave on the page. You can't fake it — but you can build it, deliberately, scene by scene.",
        sections: [
          {
            heading: "Show, Don't Tell",
            body: "'Kai was nervous' informs; it doesn't dramatize. Showing means putting the emotion on screen through action, body language, sensory detail, and dialogue, so the reader diagnoses the feeling without being told. Readers trust what they observe far more than what they're announced.",
            example: "Telling: 'The room was scary.' Showing: 'The flashlight beam found the doorway — and the doorway was shut.'",
            tip: "Hunt the emotion words in your draft ('angry,' 'nervous') and replace each with an action.",
          },
          {
            heading: "Diction and Detail Build Voice",
            body: "Voice emerges from the words a narrator chooses and the things a narrator notices. Holden Caulfield's opening in The Catcher in the Rye — 'If you really want to hear about it...' — establishes personality through slang, digression, and attitude before any plot arrives. On the sentence level, 'a dog' is generic; 'a three-legged greyhound with a bitten ear' is a point of view.",
            example: "Draft: 'She walked slowly to the door.' Revision: 'She crossed to the door like it might bite.'",
            tip: "List the first five things your narrator would notice in a room — that list is their voice.",
          },
          {
            heading: "Revise Like an Editor",
            body: "First drafts are for discovering the story; revision is for engineering it. Cut clichés ('quiet as a mouse') and replace them with specific images. Vary sentence rhythm — a short sentence hits harder after a long one. Stephen King's rule is to cut about 10% of the draft; when you find a line you love that serves nothing, kill your darling and keep the scene.",
            example: "Cliché: 'quiet as a mouse.' Replaced: 'so quiet the fridge hum sounded like a soloist.'",
            tip: "Read the draft aloud. Your ear catches what your eyes forgive.",
          },
        ],
        vocab: [
          { word: "voice", meaning: "The distinct personality and style that comes through a writer's words." },
          { word: "diction", meaning: "A writer's deliberate choice of words." },
          { word: "imagery", meaning: "Language that appeals to the senses." },
          { word: "dialogue", meaning: "Spoken exchanges between characters, used to reveal character and advance the story." },
          { word: "pacing", meaning: "The speed at which a story unfolds, controlled by sentence length and scene choice." },
          { word: "cliche", meaning: "A phrase so overused it has lost its impact, like 'quiet as a mouse.'" },
        ],
        funFact: "Stephen King's revision rule: cut roughly 10% of your first draft — he insists the story gets stronger every time you do.",
        quiz: [
          {
            question: "Which sentence best 'shows' rather than tells that Marco is exhausted?",
            options: ["Marco was very tired.", "Marco was exhausted beyond belief.", "Marco yawned through a fourth coffee, rereading the same paragraph for the third time.", "Marco felt tired after work."],
            answerIndex: 2,
            explanation: "Concrete actions — the yawns, the coffee, the rereading — let the reader infer exhaustion. The others just announce it.",
          },
          {
            question: "'A three-legged greyhound with a bitten ear' improves on 'a dog' because it...",
            options: ["is longer, and length always improves writing", "uses concrete, specific detail that creates a vivid image", "avoids description entirely", "removes the character from the scene"],
            answerIndex: 1,
            explanation: "Specific detail creates imagery and a point of view. Length alone means nothing.",
          },
          {
            question: "Which opening most establishes a distinct, informal narrative voice?",
            options: ["This report shall delineate the events of the summer.", "If you really want to hear about it, you'll probably want to know where I was born and all — but I'm not going into that.", "The events occurred during the summer months.", "In this essay, I will describe my vacation."],
            answerIndex: 1,
            explanation: "The Holden Caulfield-style line reveals attitude, slang, and personality — voice. The others are neutral reporting.",
          },
          {
            question: "During revision, cutting a sentence you love that doesn't serve the scene is often called...",
            options: ["padding", "killing your darlings", "outlining", "worldbuilding"],
            answerIndex: 1,
            explanation: "'Kill your darlings' means sacrificing beloved lines that don't earn their place.",
          },
          {
            question: "Varying sentence length in a passage mainly affects...",
            options: ["pacing and rhythm, shaping how the reader experiences the moment", "the spelling of key words", "the genre of the piece", "whether dialogue is permitted"],
            answerIndex: 0,
            explanation: "Short sentences create speed or punch; long ones slow and immerse. That's pacing.",
          },
        ],
        worksheet: [
          {
            kind: "fill-blank",
            prompt: "Writing that dramatizes emotion through action and detail follows the rule 'show, don't ___.'",
            answer: "tell",
          },
          {
            kind: "fill-blank",
            prompt: "A phrase so overused it has lost its punch is a ___.",
            answer: "cliche",
            hint: "Like 'quiet as a mouse.'",
          },
          {
            kind: "fill-blank",
            prompt: "The distinct personality that comes through a writer's words is their ___.",
            answer: "voice",
          },
          {
            kind: "practice",
            prompt: "Identify the element: '“Get out,” Amara said, barely above a whisper.' Write one word.",
            answer: "dialogue",
            hint: "It's a character speaking.",
          },
          {
            kind: "short-answer",
            prompt: "Rewrite 'Noah was scared' as a show-don't-tell sentence.",
            sampleAnswer: "Noah's hands trembled as the floorboards creaked behind him.",
          },
          {
            kind: "short-answer",
            prompt: "Why does reading your draft aloud help you revise?",
            sampleAnswer: "Your ear catches clunky rhythm, repeated words, and dialogue that doesn't sound real.",
          },
        ],
      },
    ],
  },
};
