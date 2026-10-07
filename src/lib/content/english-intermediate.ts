// English — Intermediate (ages 12-13)
// Six lessons: clauses & complex sentences, active/passive voice, figurative
// language, formal vs informal register, advanced punctuation, and persuasive
// techniques. Confident, concrete, and never babyish.
import type { Lesson } from "./types";

export const lessons: Lesson[] = [
  // -------------------------------------------------------------------------
  // 1. Clauses and Complex Sentences
  // -------------------------------------------------------------------------
  {
    id: "english-intermediate-1",
    title: "Clauses and Complex Sentences",
    emoji: "🔗",
    minutes: 12,
    intro:
      "Simple sentences are fine — but complex sentences let you show cause, contrast, and timing in a single elegant line. Time to upgrade your sentence engine.",
    sections: [
      {
        heading: "Two Kinds of Clauses",
        body:
          "A clause is a group of words with a subject and a verb. An INDEPENDENT clause can stand alone as a sentence: 'The storm arrived early.' A DEPENDENT clause has a subject and verb too, but it starts with a word like because, although, when, or if — and it CANNOT stand alone: 'because the roads flooded.' It leaves you waiting for more.",
        example:
          "Independent: 'We canceled the picnic.' Dependent: 'because the roads flooded.' Glue them together: 'We canceled the picnic because the roads flooded.'",
        tip: "If a clause starts with because/although/when/if, it needs a partner.",
      },
      {
        heading: "The Subordinating Superpowers",
        body:
          "Subordinating conjunctions are the tiny words that turn independent clauses into dependent ones — and each one adds meaning. BECAUSE gives a reason. WHEN gives a time. ALTHOUGH gives a contrast. IF gives a condition. Choose the one that matches what you actually mean.",
        example:
          "'Although it rained, we hiked' and 'Because it rained, we hiked' describe two very different hikes!",
        tip: "Conjunction choice changes meaning — pick deliberately.",
      },
      {
        heading: "Building Complex Sentences",
        body:
          "A complex sentence = one independent clause + at least one dependent clause. When the dependent clause comes FIRST, follow it with a comma: 'Although she was nervous, Priya auditioned.' When it comes second, usually no comma: 'Priya auditioned although she was nervous.'",
        example:
          "'When the bell rings, we leave.' vs. 'We leave when the bell rings.' Same facts, different punctuation.",
        tip: "Dependent clause first → comma. Dependent clause second → usually no comma.",
      },
    ],
    vocab: [
      { word: "clause", meaning: "A group of words with a subject and a verb." },
      { word: "independent clause", meaning: "A clause that can stand alone as a full sentence." },
      { word: "dependent clause", meaning: "A clause that cannot stand alone — it starts with words like because or although." },
      { word: "subordinating conjunction", meaning: "A word like because, when, although, or if that creates a dependent clause." },
    ],
    funFact:
      "'It was the best of times, it was the worst of times…' — Charles Dickens's famous opening in 'A Tale of Two Cities' is built entirely from balanced clauses, and readers still quote it more than 165 years later.",
    quiz: [
      {
        question: "Which of these is a DEPENDENT clause?",
        options: [
          "The storm arrived early.",
          "because the roads flooded",
          "We canceled the picnic.",
          "It rained all day.",
        ],
        answerIndex: 1,
        explanation:
          "'Because the roads flooded' starts with 'because' — it leaves you hanging, so it can't stand alone.",
        misconceptions: [
          "This has a subject and verb and makes a complete thought — it's independent.",
          "Yes! 'Because' makes this clause dependent on the rest of the sentence.",
          "Complete thought, stands alone — independent through and through.",
          "Full sentence with subject and verb — nothing missing, so it's independent.",
        ],
      },
      {
        question: "Which is a complex sentence?",
        options: [
          "The dog barked.",
          "The dog barked, and the cat ran.",
          "When the dog barked, the cat ran.",
          "The dog barked; the cat ran.",
        ],
        answerIndex: 2,
        explanation:
          "'When the dog barked' is a dependent clause attached to an independent clause — that's the complex recipe.",
        misconceptions: [
          "One independent clause alone = a simple sentence.",
          "Two independent clauses joined by 'and' = a compound sentence.",
          "Correct! One dependent + one independent clause = complex.",
          "A semicolon joins two independent clauses — still compound, not complex.",
        ],
      },
      {
        question: "In 'Although she was nervous, Priya auditioned', why is there a comma?",
        options: [
          "The dependent clause comes first",
          "'Priya' is a long name",
          "Commas are optional decorations",
          "Because 'although' is a verb",
        ],
        answerIndex: 0,
        explanation:
          "When a dependent clause opens the sentence, a comma separates it from the independent clause that follows.",
        misconceptions: [
          "Yes! Opener-dependent clauses need a comma before the main clause starts.",
          "Name length has nothing to do with it — position of the clause does.",
          "Commas follow rules — this one marks the end of the dependent opener.",
          "'Although' is a conjunction — it's the comma's placement that follows the rule.",
        ],
      },
      {
        question: "'Because the bus was late.' What's wrong with this?",
        options: [
          "It's a fragment — a dependent clause can't stand alone",
          "It needs an exclamation mark",
          "Nothing — it's a perfect sentence",
          "'Because' is spelled wrong",
        ],
        answerIndex: 0,
        explanation:
          "Starting with 'because' makes it dependent — the reader is left waiting for the rest of the thought.",
        misconceptions: [
          "Correct! Attach an independent clause, like: 'Because the bus was late, we missed registration.'",
          "Punctuation energy won't fix it — the clause is incomplete, not unexciting.",
          "It looks like a sentence, but the 'because' leaves the thought unfinished.",
          "The spelling is fine — the problem is the clause can't stand alone.",
        ],
      },
      {
        question: "Which subordinating conjunction shows a CONTRAST?",
        options: ["because", "when", "although", "if"],
        answerIndex: 2,
        explanation: "'Although' signals a contrast — something surprising given the first clause.",
        misconceptions: [
          "'Because' gives a REASON, not a contrast.",
          "'When' gives a TIME.",
          "Yes! 'Although' sets up an expected twist — that's contrast.",
          "'If' sets a CONDITION.",
        ],
      },
    ],
    worksheet: [
      {
        kind: "correct-sentence",
        prompt:
          "Fix this fragment by attaching the idea 'we canceled the picnic'. Start with 'Because' and retype the whole corrected sentence.",
        sentence: "Because it was raining.",
        answer: "Because it was raining, we canceled the picnic.",
        why: "'Because it was raining' is a dependent clause that cannot stand alone — it must hook onto an independent clause to complete the thought.",
      },
      {
        kind: "fill-blank",
        prompt: "A dependent clause ______ stand alone as a sentence. (Write can or cannot.)",
        answer: "cannot",
      },
      {
        kind: "fill-blank",
        prompt: "In 'When the bell rings, we leave', the dependent clause is '______'.",
        answer: "when the bell rings",
      },
      {
        kind: "fill-blank",
        prompt: "Join these with a subordinating conjunction: 'I slept early ______ I was exhausted.'",
        answer: "because",
        hint: "Which conjunction gives a reason?",
      },
      {
        kind: "match",
        prompt: "Match each sentence to its type!",
        left: ["The dog barked.", "The dog barked, and the cat ran.", "When the dog barked, the cat ran."],
        right: ["complex sentence", "simple sentence", "compound sentence"],
        answer: [1, 2, 0],
      },
      {
        kind: "writing",
        prompt: "Write ONE complex sentence about your day that starts with 'Although'.",
        sampleAnswer:
          "Although my morning started with a spilled smoothie, the rest of my day turned out great.",
      },
    ],
    challenge: {
      prompt:
        "Combine these two sentences into ONE complex sentence: 'The test was hard.' + 'Everyone passed it.' Use 'although' and start your sentence with it.",
      hint: "Put the dependent clause first, then a comma, then the independent clause.",
      steps: [
        "Build the dependent clause: 'Although the test was hard,'",
        "Add a comma after the opener.",
        "Attach the independent clause: 'everyone passed it.'",
        "Read it aloud — it should feel complete in one breath.",
        "Bonus: flip the order and notice the comma disappears.",
      ],
      answer: "Although the test was hard, everyone passed it.",
      answerWhy:
        "'Although' demotes 'the test was hard' to a dependent clause, and the comma marks the join. Flip it — 'Everyone passed it although the test was hard.' — and standard style drops the comma, because the sentence no longer needs the pause.",
    },
  },

  // -------------------------------------------------------------------------
  // 2. Active and Passive Voice
  // -------------------------------------------------------------------------
  {
    id: "english-intermediate-2",
    title: "Active and Passive Voice",
    emoji: "🎭",
    minutes: 12,
    intro:
      "Did the subject DO the thing, or did the thing get DONE to it? Voice changes who's in charge of your sentence — and sometimes who takes the blame.",
    sections: [
      {
        heading: "Who's Driving the Sentence?",
        body:
          "ACTIVE voice: the subject does the action — 'Amara scored the goal.' PASSIVE voice: the subject receives the action — 'The goal was scored by Amara.' Same event, but active puts the doer in the driver's seat.",
        example:
          "Active: 'Leo broke the window.' Passive: 'The window was broken by Leo.' Active is shorter and more direct.",
        tip: "Ask: is my subject acting or being acted upon?",
      },
      {
        heading: "Spot the Passive Recipe",
        body:
          "Passive voice is built with a form of 'be' (is, was, were, been) plus a past participle (broken, sung, eaten), often followed by 'by' + doer. Signals: 'was broken', 'is considered', 'were chosen'. If you can ask 'by whom?' and the sentence doesn't answer, that's passive without a named doer.",
        example:
          "'The song was sung by the choir.' Be-verb (was) + participle (sung) + by-phrase = textbook passive.",
        tip: "'be' + past participle = passive alarm bells.",
      },
      {
        heading: "When Passive Actually Wins",
        body:
          "Passive isn't wrong — it's a tool. Use it when the doer is unknown ('My bike was stolen'), when the receiver matters more ('The vaccines were refrigerated'), or in science writing where the process is the star. Just don't use it to dodge responsibility — readers notice.",
        example:
          "Science: 'The solution was heated to 90°C.' The heating matters more than who held the beaker.",
        tip: "Default to active; choose passive only for a reason.",
      },
    ],
    vocab: [
      { word: "active voice", meaning: "The subject does the action: 'Amara scored.'" },
      { word: "passive voice", meaning: "The subject receives the action: 'The goal was scored.'" },
      { word: "past participle", meaning: "The verb form used with 'be' in passive: broken, sung, eaten." },
      { word: "by-phrase", meaning: "The 'by Amara' part of a passive sentence that names the doer." },
    ],
    funFact:
      "'Mistakes were made' is the most famous passive-voice dodge in politics — it admits that mistakes happened without ever saying WHO made them!",
    quiz: [
      {
        question: "Which sentence is in the PASSIVE voice?",
        options: [
          "The cat knocked over the vase.",
          "The vase was knocked over by the cat.",
          "The clumsy cat strikes again.",
          "Knock-knock — who's there?",
        ],
        answerIndex: 1,
        explanation:
          "'Was knocked over' = be-verb + past participle. The vase receives the action — that's passive.",
        misconceptions: [
          "Here the cat DOES the knocking — that's active voice.",
          "Yes! The vase isn't doing anything — it's receiving the action.",
          "The cat is acting again — active voice with attitude.",
          "A joke, not a voice — but nice timing.",
        ],
      },
      {
        question: "What's the passive voice recipe?",
        options: [
          "a form of 'be' + past participle",
          "past tense + exclamation mark",
          "a subject + two adjectives",
          "'by' + verb + comma",
        ],
        answerIndex: 0,
        explanation: "Passive = be-verb (was, is, were) + past participle (broken, sung). That's the formula.",
        misconceptions: [
          "Correct! 'was broken', 'is sung', 'were eaten' — that's the passive engine.",
          "Exclamation marks add excitement, not passivity.",
          "Adjectives describe — they don't build the passive.",
          "The by-phrase is optional garnish; the real recipe is be + past participle.",
        ],
      },
      {
        question: "Change to ACTIVE voice: 'The goal was scored by Amara.'",
        options: [
          "Amara scored the goal.",
          "The goal scored Amara.",
          "Amara was scoring.",
          "The goal is scoring.",
        ],
        answerIndex: 0,
        explanation: "Move the doer (Amara) to the front and let her act: 'Amara scored the goal.'",
        misconceptions: [
          "Yes! Doer first, action verb, receiver last — active and direct.",
          "Careful — now the goal is scoring Amara! Keep the roles straight.",
          "'Was scoring' is a tense change, not a voice change — and it alters the meaning.",
          "The goal still isn't doing anything — the doer must act.",
        ],
      },
      {
        question: "'My bike was stolen last night.' Why might the speaker choose passive here?",
        options: [
          "The doer is unknown",
          "Bikes can't speak",
          "It's shorter to type",
          "Passive is always wrong",
        ],
        answerIndex: 0,
        explanation:
          "When you don't know who did it, passive lets you state the event without inventing a doer.",
        misconceptions: [
          "Yes! Unknown doer is the classic reason to go passive.",
          "True, but irrelevant — no sentence needs the bike to speak.",
          "Passive is usually LONGER, not shorter.",
          "Passive is legitimate when the doer is unknown or unimportant — the trick is choosing it on purpose.",
        ],
      },
      {
        question: "In 'The song was sung by the choir', what is the subject of the sentence?",
        options: ["the song", "the choir", "sung", "by"],
        answerIndex: 0,
        explanation:
          "In passive voice, the RECEIVER of the action ('the song') is the grammatical subject.",
        misconceptions: [
          "Yes! Passive promotes the receiver to subject — that's its signature move.",
          "The choir is the DOER, but in passive the doer hides in the by-phrase.",
          "'Sung' is the past participle — part of the verb, not the subject.",
          "'By' is a preposition introducing the doer — not a subject.",
        ],
      },
    ],
    worksheet: [
      {
        kind: "correct-sentence",
        prompt: "Make this sentence active and punchy. Retype it.",
        sentence: "The window was broken by Leo.",
        answer: "Leo broke the window.",
        why: "The doer ('Leo') moves to the front and the be + past participle scaffolding disappears — active voice is shorter and more direct.",
      },
      {
        kind: "fill-blank",
        prompt: "Passive voice is built with a form of 'be' plus the ______ participle.",
        answer: "past",
      },
      {
        kind: "fill-blank",
        prompt:
          "'The cake was eaten.' Ask 'by whom?' — if the sentence doesn't say, it's in ______ voice.",
        answer: "passive",
      },
      {
        kind: "match",
        prompt: "Match each sentence to its description!",
        left: [
          "The choir sang the song.",
          "The song was sung by the choir.",
          "My phone was stolen last night.",
        ],
        right: [
          "active voice — doer up front",
          "passive voice — doer unknown",
          "passive voice with a 'by' phrase",
        ],
        answer: [0, 2, 1],
      },
      {
        kind: "fill-blank",
        prompt: "'The ball was thrown.' If WHO threw it matters, switch to ______ voice.",
        answer: "active",
      },
      {
        kind: "writing",
        prompt:
          "Rewrite these two passive sentences in active voice, then say in one sentence which version sounds stronger and why: 'The medals were won by our team. The trophy was carried home by Kai.'",
        sampleAnswer:
          "Our team won the medals, and Kai carried the trophy home. The active versions sound stronger because the doers act up front instead of receiving the action.",
      },
    ],
  },

  // -------------------------------------------------------------------------
  // 3. Figurative Language
  // -------------------------------------------------------------------------
  {
    id: "english-intermediate-3",
    title: "Figurative Language",
    emoji: "🎨",
    minutes: 11,
    intro:
      "Sometimes the best way to describe something is to compare it to something else entirely. Similes, metaphors, and personification are the artist's tools of writing.",
    sections: [
      {
        heading: "Simile: Say 'Like'",
        body:
          "A simile compares two things using 'like' or 'as'. 'Her laugh was like silver bells.' The comparison creates an instant picture — you HEAR that laugh now, don't you?",
        example:
          "'As brave as a lion.' 'The clouds drifted like ships.' Both similes — both with like or as.",
        tip: "See 'like' or 'as' doing a comparison? That's a simile.",
      },
      {
        heading: "Metaphor: It IS the Thing",
        body:
          "A metaphor skips 'like' and says one thing IS another. 'The classroom was a zoo.' Nobody means actual animals — the metaphor borrows the zoo's wildness and drops it onto the classroom.",
        example:
          "'Time is a thief.' Time can't literally steal — but the metaphor makes you feel moments slipping away.",
        tip: "Metaphor = direct equation. Simile = comparison with like/as.",
      },
      {
        heading: "Personification: Human Traits for Everything",
        body:
          "Personification gives human abilities to non-human things: the wind whispers, the thunder growls, opportunity knocks. It makes the world of your writing feel alive.",
        example:
          "'The old house groaned and sighed all night.' Houses can't literally groan — but now yours feels haunted.",
        tip: "If a non-human thing acts human, you've found personification.",
      },
    ],
    vocab: [
      { word: "simile", meaning: "A comparison using 'like' or 'as': brave as a lion." },
      { word: "metaphor", meaning: "A direct comparison saying one thing IS another: time is a thief." },
      { word: "personification", meaning: "Giving human traits to non-human things: the wind whispered." },
      { word: "figurative language", meaning: "Words used creatively, beyond their literal meaning." },
    ],
    funFact:
      "Shakespeare packed one of the most quoted metaphors of all time into 'As You Like It': 'All the world's a stage, and all the men and women merely players.'",
    quiz: [
      {
        question: "Which sentence contains a simile?",
        options: [
          "The moon was a lantern.",
          "Her laugh was like silver bells.",
          "The wind grabbed his jacket.",
          "Time crawled.",
        ],
        answerIndex: 1,
        explanation: "'Like silver bells' — the word 'like' makes this comparison a simile.",
        misconceptions: [
          "'Was a lantern' with no 'like' — that's a metaphor.",
          "Yes! 'Like' or 'as' signals a simile every time.",
          "The wind acting like a person is personification.",
          "'Crawled' gives time an animal trait — personification again.",
        ],
      },
      {
        question: "'The classroom was a zoo.' This is a…",
        options: ["simile", "metaphor", "personification", "rhyme"],
        answerIndex: 1,
        explanation:
          "It says the classroom IS a zoo — no 'like', no 'as'. Direct equation = metaphor.",
        misconceptions: [
          "A simile would need 'like' or 'as' — 'was like a zoo'.",
          "Yes! It directly calls the classroom a zoo — a metaphor.",
          "No humans-acting traits here — just a direct comparison.",
          "Rhyme is about matching sounds — this is about comparison.",
        ],
      },
      {
        question: "'The thunder growled all night.' This is…",
        options: ["personification", "metaphor", "simile", "alliteration"],
        answerIndex: 0,
        explanation:
          "Growling is something animals — and only famously grumpy people — do. Thunder got a human/animal trait: personification.",
        misconceptions: [
          "Yes! Thunder doing something so alive and moody is personification.",
          "A metaphor would call thunder something else — 'thunder was an orchestra'.",
          "No 'like' or 'as' — not a simile.",
          "Alliteration repeats starting sounds (like 'big black boots') — not this.",
        ],
      },
      {
        question: "'Time is a thief' means…",
        options: [
          "Time literally steals watches",
          "Time passes quietly and takes moments from us",
          "Thieves love clocks",
          "Time is expensive",
        ],
        answerIndex: 1,
        explanation:
          "Metaphors work by borrowing feelings: a thief takes things secretly, and so does passing time.",
        misconceptions: [
          "Figurative language isn't literal — no watches were harmed.",
          "Yes! The metaphor captures how time silently steals our moments.",
          "Cute theory, but the metaphor is about loss, not burglary tools.",
          "That would be about money — this metaphor is about moments.",
        ],
      },
      {
        question: "What's the difference between a simile and a metaphor?",
        options: [
          "A simile uses 'like' or 'as'; a metaphor says one thing IS another",
          "Metaphors rhyme; similes don't",
          "Similes are always longer",
          "There is no difference",
        ],
        answerIndex: 0,
        explanation:
          "Similes compare openly (like/as); metaphors fuse the two things (X is Y). Different tools, different feel.",
        misconceptions: [
          "Exactly — 'like a lion' (simile) vs. 'he IS a lion' (metaphor).",
          "Neither one requires rhyme — that's poetry's job, not comparison's.",
          "Length has nothing to do with it — watch for like/as vs. is.",
          "They're cousins, but the like/as vs. is difference is real and matters.",
        ],
      },
    ],
    worksheet: [
      {
        kind: "match",
        prompt: "Match each example to its technique!",
        left: ["as brave as a lion", "The wind whispered secrets", "Time is a thief"],
        right: ["metaphor", "simile", "personification"],
        answer: [1, 2, 0],
      },
      {
        kind: "fill-blank",
        prompt: "A simile compares using 'like' or '______'.",
        answer: "as",
      },
      {
        kind: "fill-blank",
        prompt: "'The thunder growled angrily' gives thunder a ______ trait.",
        answer: "human",
      },
      {
        kind: "fill-blank",
        prompt: "'The classroom was a zoo' is a ______.",
        answer: "metaphor",
      },
      {
        kind: "short-answer",
        prompt: "Write your own simile about homework.",
        sampleAnswer:
          "Homework is like a stubborn knot — annoying at first, but satisfying once you work it out.",
      },
      {
        kind: "writing",
        prompt:
          "Describe a storm in two sentences: use ONE metaphor and ONE personification.",
        sampleAnswer:
          "The storm was an angry orchestra tuning up. Lightning lashed the sky while the rain drummed its fingers on the roof.",
      },
    ],
  },

  // -------------------------------------------------------------------------
  // 4. Formal vs Informal Language
  // -------------------------------------------------------------------------
  {
    id: "english-intermediate-4",
    title: "Formal vs Informal Language",
    emoji: "🎩",
    minutes: 12,
    intro:
      "You already speak two (or more!) versions of English — the one you text your friends and the one you'd use emailing a principal. The skill is switching on purpose.",
    sections: [
      {
        heading: "Two Outfits for Your Words",
        body:
          "FORMAL language is precise, complete, and polished: full sentences, no slang, few contractions. INFORMAL language is relaxed and chatty: contractions, slang, and fragments are fine. Neither is 'better' — the SITUATION decides which one to wear.",
        example:
          "Informal: 'gonna head out, cya tmr!' Formal: 'I am leaving now and will see you tomorrow.'",
        tip: "Match your words to the moment, like matching clothes to the weather.",
      },
      {
        heading: "The Formal Signals",
        body:
          "Formal writing swaps casual words for precise ones (kids → children), avoids texting abbreviations, and uses full verb forms (can't → cannot). It also prefers objective tone: 'The experiment yielded fascinating results' instead of 'The experiment was super cool.'",
        example:
          "'I would like to request a meeting' beats 'can we meet up sometime?' in an email to a teacher.",
        tip: "When in doubt with adults and officials: formal.",
      },
      {
        heading: "Know Your Audience",
        body:
          "Before writing, ask: WHO is reading, and what do they expect? A text to your best friend, a history essay, and a club application each call for a different register. Skilled writers switch smoothly — and never let slang sneak into an essay by accident.",
        example:
          "Same news, two registers: 'We won 3–0, it was INSANE!' vs. 'Our team won three to nil in a dominant performance.'",
        tip: "Audience first, words second.",
      },
    ],
    vocab: [
      { word: "formal language", meaning: "Polished, precise language for serious situations." },
      { word: "informal language", meaning: "Relaxed, chatty language for friends and familiar settings." },
      { word: "slang", meaning: "Very casual words understood by a group, like 'cool' or 'ghosting'." },
      { word: "register", meaning: "The level of formality that fits a situation." },
    ],
    funFact:
      "In 2013, Oxford Dictionaries chose 'selfie' as its Word of the Year — proof that slang can hop from text messages to the official dictionary in just a few years!",
    quiz: [
      {
        question: "Which sentence belongs in a letter to the principal?",
        options: [
          "Yo! Quick q — can we get longer lunch?",
          "I am writing to request a longer lunch period.",
          "Lunch too short, pls fix, thx.",
          "guess what, lunch is SO short lol",
        ],
        answerIndex: 1,
        explanation:
          "Complete sentences, precise words, respectful tone — that's formal register for a formal audience.",
        misconceptions: [
          "Slang like 'yo' and 'q' belongs with friends, not principals.",
          "Yes! Formal, polite, and precise — exactly right for the principal.",
          "Abbreviations like 'pls' and 'thx' are texting language.",
          "Lowercase casualness and 'lol' are fine in chats — not in letters.",
        ],
      },
      {
        question: "What makes writing informal?",
        options: [
          "Slang, contractions, and chatty phrases",
          "Long paragraphs",
          "Footnotes",
          "Silent letters",
        ],
        answerIndex: 0,
        explanation:
          "Informal writing relaxes the rules: slang, contractions, and conversational flow are welcome.",
        misconceptions: [
          "Yes! Those three are the classic informal signals.",
          "Long paragraphs can be formal OR informal — length isn't the clue.",
          "Footnotes are a formal research habit, if anything.",
          "Silent letters are just spelling — register lives in word choice.",
        ],
      },
      {
        question: "'The experiment yielded fascinating results' is ______ language.",
        options: ["formal", "informal", "texting slang", "a contraction"],
        answerIndex: 0,
        explanation:
          "'Yielded' is a precise, formal word choice — texting slang would say 'gave us' or 'got'.",
        misconceptions: [
          "Yes! 'Yielded' and 'fascinating' are polished, formal choices.",
          "Informal would sound more like 'the experiment was really cool'.",
          "No abbreviations or slang here — it's the opposite of texting language.",
          "There's no contracted word in the sentence at all.",
        ],
      },
      {
        question: "Which audience is most likely to hear your informal register?",
        options: [
          "A university admissions officer",
          "Your best friend",
          "A job interviewer",
          "A judge",
        ],
        answerIndex: 1,
        explanation:
          "Close friends share your slang and casual tone — that's where informal language lives.",
        misconceptions: [
          "Admissions officers expect polished, formal writing.",
          "Yes! Friends get the real, relaxed you.",
          "Interviewers expect professional, formal speech.",
          "Courtrooms are about as formal as language gets.",
        ],
      },
      {
        question: "When is informal language the RIGHT choice?",
        options: [
          "Never",
          "In a text to a friend or a personal blog",
          "In a science report",
          "In a formal complaint",
        ],
        answerIndex: 1,
        explanation:
          "Informal language fits relaxed settings where the audience shares your casual tone.",
        misconceptions: [
          "Never? You'd sound robotic texting your friends!",
          "Yes! Casual audience + casual setting = informal register wins.",
          "Science reports demand precise, formal language.",
          "Formal complaints need formal language to be taken seriously.",
        ],
      },
    ],
    worksheet: [
      {
        kind: "correct-sentence",
        prompt: "Translate this text-message English into one formal sentence. Retype it.",
        sentence: "gonna finish my project tmr, sry",
        answer: "I will finish my project tomorrow.",
        why: "Formal writing avoids slang and abbreviations: 'gonna' becomes 'will', 'tmr' becomes 'tomorrow', and any apology deserves its own polite sentence.",
      },
      {
        kind: "fill-blank",
        prompt: "In an essay, swap 'kids' for the more formal word '______'.",
        answer: "children",
      },
      {
        kind: "match",
        prompt: "Formal or informal? Match each line to its register.",
        left: ["Hey!!", "Furthermore, the evidence suggests…", "Gonna head out now.", "I would appreciate your consideration."],
        right: ["formal — email to your principal", "informal — text to your best friend"],
        answer: [1, 0, 1, 0],
      },
      {
        kind: "writing",
        prompt:
          "Rewrite this text message as a formal sentence for your teacher: 'cant come 2 practice, sry'",
        sampleAnswer: "I am sorry, but I will be unable to attend practice today.",
      },
      {
        kind: "short-answer",
        prompt: "Name one situation where informal language is perfectly acceptable, and say why.",
        sampleAnswer:
          "A group chat with friends is fine for informal language because everyone there shares the slang and expects a chatty tone.",
      },
      {
        kind: "fill-blank",
        prompt: "Textspeak like 'u' and 'tmr' belongs in ______ messages, not essays.",
        answer: "informal",
      },
    ],
    challenge: {
      prompt:
        "Translate this formal sentence into casual text-speak for a friend, then list two things that changed: 'I would like to inform you that the meeting has been rescheduled to Thursday.'",
      hint: "Think: which phrases get compressed, and how does the tone change?",
      steps: [
        "Read the formal sentence aloud — notice the long phrases.",
        "Compress 'I would like to inform you' into something like 'fyi'.",
        "Shorten 'has been rescheduled to' into 'moved to'.",
        "Add friend-energy (lowercase, an emoji) if you like.",
        "List two changes: vocabulary compressed, tone relaxed.",
      ],
      answer:
        "Example: 'fyi the meeting moved to thursday!' Changes: the long phrases got compressed and the serious tone relaxed.",
      answerWhy:
        "Register is a sliding scale, not a switch. The same facts can wear formal or casual clothes — a strong writer picks the outfit the audience expects and can explain exactly what changed.",
    },
  },

  // -------------------------------------------------------------------------
  // 5. Semicolons, Colons and Dashes
  // -------------------------------------------------------------------------
  {
    id: "english-intermediate-5",
    title: "Semicolons, Colons and Dashes",
    emoji: "⚡",
    minutes: 11,
    intro:
      "You've mastered commas and full stops — now meet the punctuation power trio that makes writing sound sophisticated, dramatic, or both at once.",
    sections: [
      {
        heading: "The Semicolon: The Elegant Join",
        body:
          "A semicolon (;) joins two independent clauses that are closely related: 'The rain stopped; we played outside.' Both halves could stand alone, but the semicolon says they belong together. It's a period and a comma holding hands.",
        example:
          "'I finished my essay; then I celebrated with hot chocolate.' Two thoughts, one elegant sentence.",
        tip: "Semicolons join full sentences only — never a full sentence plus a fragment.",
      },
      {
        heading: "The Colon: The Announcer",
        body:
          "A colon (:) follows a COMPLETE sentence and announces what's next: a list, an explanation, or a dramatic reveal. 'I need three things: paper, glue, and glitter.' The sentence before the colon must be able to stand alone.",
        example:
          "'Here's the plan: wake up, run, then celebrate.' The colon says 'ta-da!' before the list arrives.",
        tip: "No colon directly after a verb — 'My favorites are: …' is a classic mistake.",
      },
      {
        heading: "The Dash: The Dramatic Entrance",
        body:
          "A dash (—) inserts a sudden extra thought or interruption: 'The answer — finally — arrived.' Dashes are louder than commas and more casual than parentheses. Use them for emphasis and surprise — but sparingly.",
        example:
          "'My plan was simple: one dash can change the rhythm — dramatically.'",
        tip: "One or two dashes per page, max. Drama loses power when it's constant.",
      },
    ],
    vocab: [
      { word: "semicolon", meaning: "The mark (;) that joins two closely related full sentences." },
      { word: "colon", meaning: "The mark (:) that announces a list or explanation after a complete sentence." },
      { word: "dash", meaning: "The mark (—) that inserts a dramatic extra thought." },
      { word: "independent clause", meaning: "A group of words that can stand alone as a sentence." },
    ],
    funFact:
      "The semicolon is only about 500 years old! A Venetian printer named Aldus Manutius invented it around 1494 so related thoughts could travel together in one sentence.",
    quiz: [
      {
        question: "Which sentence uses a semicolon correctly?",
        options: [
          "I finished my homework; then I played outside.",
          "I finished; my homework then I played outside.",
          "I finished my homework; playing, outside.",
          "I finished; then; I played outside.",
        ],
        answerIndex: 0,
        explanation:
          "Both halves are complete thoughts, and the semicolon joins them because they're closely related.",
        misconceptions: [
          "Yes! Two complete, related thoughts joined by a semicolon — textbook.",
          "The split lands in the middle of a phrase — each side must be a full sentence.",
          "'Playing, outside' isn't a complete sentence on the right side.",
          "One semicolon per join — stacking them breaks the sentence apart.",
        ],
      },
      {
        question: "Which sentence uses the colon correctly?",
        options: [
          "Pack these three things paper glue glitter.",
          "Pack these three things: paper, glue, and glitter.",
          "Pack these, three things paper glue glitter.",
          "Pack: these three things paper glue glitter.",
        ],
        answerIndex: 1,
        explanation:
          "The complete sentence 'Pack these three things' announces the list — colon, then the items.",
        misconceptions: [
          "With no punctuation, the list crashes into the sentence.",
          "Yes! Complete sentence first, colon, then the announced list.",
          "A comma can't announce a list — it's too quiet for the job.",
          "The colon must follow a COMPLETE sentence — 'Pack:' leaves it hanging.",
        ],
      },
      {
        question: "What does the dash do in 'The answer — finally — arrived.'?",
        options: [
          "Interrupts for dramatic emphasis",
          "Ends the sentence",
          "Shows ownership",
          "Replaces a letter",
        ],
        answerIndex: 0,
        explanation:
          "The dashes pinch out the middle of the sentence to add drama — 'finally' gets its moment.",
        misconceptions: [
          "Yes! The dash interrupts the flow for emphasis.",
          "The sentence ends with a full stop — the dashes work inside it.",
          "Ownership is the apostrophe's job ('the dog's bone').",
          "That's the apostrophe's other job — contractions like don't.",
        ],
      },
      {
        question: "Which sentence MISUSES the colon?",
        options: [
          "Here's the plan: wake up, run, then celebrate.",
          "My favorite colors are: green and gold.",
          "One thing is certain: the quiz will be tricky.",
          "She packed one item: a toothbrush.",
        ],
        answerIndex: 1,
        explanation:
          "Never put a colon directly after a verb — 'are' already flows into its objects.",
        misconceptions: [
          "This one is correct — a complete sentence announces the plan.",
          "Right — the colon after 'are' is the classic mistake. 'My favorite colors are green and gold.'",
          "Correct usage: complete sentence, then the reveal.",
          "Correct again — one item or many, the colon announces them the same way.",
        ],
      },
      {
        question: "A semicolon can join two ______ clauses.",
        options: ["independent", "dependent", "verb", "adjective"],
        answerIndex: 0,
        explanation:
          "Each side of a semicolon must be able to stand alone — that means independent clauses.",
        misconceptions: [
          "Yes! Two standalone thoughts, joined with style.",
          "Dependent clauses can't stand alone — a semicolon between them would wobble.",
          "There's no such thing as a verb clause — clauses need a subject AND verb.",
          "Adjectives describe — they don't form clauses at all.",
        ],
      },
    ],
    worksheet: [
      {
        kind: "correct-sentence",
        prompt: "Add the missing mark and retype the sentence.",
        sentence: "I have three pets a cat, a dog, and a fish.",
        answer: "I have three pets: a cat, a dog, and a fish.",
        why: "The complete sentence 'I have three pets' announces the list, so a colon goes after 'pets'.",
      },
      {
        kind: "fill-blank",
        prompt: "A semicolon can join two ______ clauses that could each stand alone.",
        answer: "independent",
      },
      {
        kind: "fill-blank",
        prompt: "Use a ______ to announce a list after a complete sentence.",
        answer: "colon",
      },
      {
        kind: "match",
        prompt: "Match each sentence to the mark it showcases!",
        left: [
          "The rain stopped; we played outside.",
          "I need three things: paper, glue, and glitter.",
          "The answer — finally — arrived.",
        ],
        right: ["colon announcing a list", "semicolon joining two sentences", "dash adding dramatic interruption"],
        answer: [1, 0, 2],
      },
      {
        kind: "correct-sentence",
        prompt: "Fix the colon misuse and retype.",
        sentence: "My favorite colors are: green and gold.",
        answer: "My favorite colors are green and gold.",
        why: "Never put a colon directly after a verb — the sentence already flows into its own objects. Colons follow complete sentences.",
      },
      {
        kind: "short-answer",
        prompt: "Write your own sentence that uses a dash for drama.",
        sampleAnswer: "The volcano — quiet for a hundred years — began to rumble.",
      },
    ],
  },

  // -------------------------------------------------------------------------
  // 6. Persuasive Writing Techniques
  // -------------------------------------------------------------------------
  {
    id: "english-intermediate-6",
    title: "Persuasive Writing Techniques",
    emoji: "📣",
    minutes: 12,
    intro:
      "Persuasion is everywhere — ads, speeches, even that group chat arguing about pizza toppings. Learn the techniques and you'll spot them AND use them.",
    sections: [
      {
        heading: "Claim + Reasons + Evidence",
        body:
          "Every persuasive piece starts with a CLAIM (what you want readers to believe), supports it with REASONS, and backs each reason with EVIDENCE — facts, statistics, examples, or expert opinions. Feelings start arguments; evidence wins them.",
        example:
          "Claim: 'Our town needs a bike lane.' Evidence: 'City data shows 42 bike accidents on Main Street in two years.'",
        tip: "No evidence? No persuasion. Opinions alone are just noise.",
      },
      {
        heading: "The Persuasive Toolbox",
        body:
          "Writers reach for reliable devices: the RULE OF THREE ('Reduce, reuse, recycle' — triads are memorable), EMOTIVE language ('desperate', 'thriving'), RHETORICAL questions ('Would you want to be judged by one bad day?'), and vivid 'imagine if…' scenarios that put readers inside the picture.",
        example:
          "'Imagine if every student had a garden outside their classroom.' One sentence, and readers are already there.",
        tip: "Devices work best in small doses — one per paragraph, maximum.",
      },
      {
        heading: "Meet the Counter-Argument",
        body:
          "Strong persuaders don't ignore the other side — they invite it in and answer it. 'Some say later start times would clash with sports practice. But pilot schools solved this with rotating schedules.' Addressing objections shows confidence and makes your case harder to knock down.",
        example:
          "Claim: homework should be capped. Counter: 'Homework builds discipline.' Answer: 'Students already build discipline through sports, music, and classwork.'",
        tip: "Answer the other side before your reader thinks of it.",
      },
    ],
    vocab: [
      { word: "claim", meaning: "The main point you want readers to believe." },
      { word: "evidence", meaning: "Facts, statistics, or examples that support your claim." },
      { word: "counter-argument", meaning: "The opposing view, mentioned and then answered." },
      { word: "call to action", meaning: "The line that tells readers exactly what to do next." },
    ],
    funFact:
      "Aristotle's three persuasion tools — ethos (trust), pathos (emotion), and logos (logic) — are over 2,300 years old, and you can still spot all three in every ad break today.",
    quiz: [
      {
        question: "Which evidence BEST supports the claim 'Our town needs a bike lane'?",
        options: [
          "Bikes are pretty.",
          "City data shows 42 bike accidents on Main Street in two years.",
          "I think bikes are neat.",
          "My cousin likes his bike.",
        ],
        answerIndex: 1,
        explanation:
          "Specific, checkable data about safety directly supports the claim. That's evidence that persuades.",
        misconceptions: [
          "Pretty is an opinion — it doesn't prove a need for a lane.",
          "Yes! A specific statistic about accidents is powerful, relevant evidence.",
          "'I think' announces an opinion, not evidence.",
          "One cousin's preference is too small and personal to convince a town.",
        ],
      },
      {
        question: "'Would you want to be judged by one bad day?' This is…",
        options: ["a rhetorical question", "a comma splice", "a simile", "a thesis"],
        answerIndex: 0,
        explanation:
          "It's asked for effect, not for an answer — it makes readers reflect and agree.",
        misconceptions: [
          "Yes! Rhetorical questions persuade by making readers think it through themselves.",
          "A comma splice is a grammar error — two sentences joined by only a comma.",
          "A simile compares with like/as — no comparison here.",
          "A thesis is an essay's main claim — this is a persuasion device.",
        ],
      },
      {
        question: "What is a counter-argument for?",
        options: [
          "To mention the other side and answer it — making you more convincing",
          "To confuse the reader",
          "To make your essay longer with lies",
          "To end your essay",
        ],
        answerIndex: 0,
        explanation:
          "Addressing objections shows confidence: you've considered the other side and it still loses.",
        misconceptions: [
          "Yes! Meeting objections head-on makes your argument sturdier.",
          "Clarity persuades — confusion loses readers.",
          "Never argue with lies — answer honestly and fairly.",
          "The counter-argument usually sits before the conclusion, not at the very end.",
        ],
      },
      {
        question: "'Reduce, reuse, recycle' works because of…",
        options: ["the rule of three", "the Oxford comma", "passive voice", "rhyming"],
        answerIndex: 0,
        explanation:
          "Three-part phrases are rhythmically satisfying and easy to remember — that's the rule of three.",
        misconceptions: [
          "Yes! Triads stick in memory — that's why speeches and slogans love them.",
          "No comma drama here — it's the three-part rhythm doing the work.",
          "All three verbs are active — passive voice isn't the trick.",
          "Nothing rhymes — it's the pattern of three that makes it memorable.",
        ],
      },
      {
        question: "Which phrase uses emotive language?",
        options: [
          "The shelter is full.",
          "The shelter is desperate — cold, crowded, and out of time.",
          "The shelter has a roof.",
          "The shelter opened in 2004.",
        ],
        answerIndex: 1,
        explanation:
          "'Desperate', 'cold', 'out of time' — these words are chosen to make readers FEEL something.",
        misconceptions: [
          "True but neutral — no emotional charge.",
          "Yes! Those word choices are designed to stir emotion.",
          "Factual and flat — no emotional pull.",
          "A historical fact — informative, but it doesn't tug at feelings.",
        ],
      },
    ],
    worksheet: [
      {
        kind: "writing",
        prompt:
          "Write a mini persuasive paragraph (3-4 sentences) answering: Should the school day start later? Include a claim, two reasons, and a call to action.",
        sampleAnswer:
          "Our school day should start one hour later because teenage brains need sleep to learn. Studies link later start times to better grades and fewer morning accidents. Ask the school board to test a later start next term — our grades and our safety are worth it.",
        minWords: 30,
      },
      {
        kind: "match",
        prompt: "Match each line to its persuasive technique!",
        left: [
          "Imagine if every student had a garden…",
          "Studies show 8 in 10 doctors agree…",
          "Would you want homework on YOUR birthday?",
          "Sign the petition today!",
        ],
        right: ["statistics (logos)", "rhetorical question", "call to action", "emotional image (pathos)"],
        answer: [3, 0, 1, 2],
      },
      {
        kind: "fill-blank",
        prompt: "Backing your claim with facts, data, and examples is called ______.",
        answer: "evidence",
      },
      {
        kind: "short-answer",
        prompt:
          "Give ONE counter-argument to 'Homework should be banned', then answer it in a sentence.",
        sampleAnswer:
          "Some say homework builds discipline, but students already practice discipline through sports, music, and classwork.",
      },
      {
        kind: "fill-blank",
        prompt: "A question you ask without expecting an answer is a ______ question.",
        answer: "rhetorical",
      },
      {
        kind: "short-answer",
        prompt: "Turn 'Cats are popular pets' into an emotive sentence.",
        sampleAnswer:
          "Cats curl into warm, purring knots of comfort, winning hearts in millions of homes.",
      },
    ],
    challenge: {
      prompt:
        "You have 60 seconds to persuade the class: 'Every student should join a club.' Write a three-sentence pitch — one sentence of ethos, one of pathos, one of logos — and label each one.",
      hint: "Ethos = credibility or experience; pathos = feeling; logos = facts and numbers. One sentence each, then tag them.",
      steps: [
        "Ethos sentence: speak from experience or cite a trustworthy voice.",
        "Pathos sentence: make the listener FEEL belonging, excitement, or missing out.",
        "Logos sentence: use a number, a study, or clear cause-and-effect.",
        "Reread and label each sentence: ethos, pathos, logos.",
        "Finish with a mini call to action if you have room.",
      ],
      answer:
        "Example — 'As club president for two years, I've watched shy students become confident leaders (ethos). Imagine never finding your people in a school of hundreds (pathos). Clubs meet weekly, cost nothing, and members report 20% less stress (logos).'",
      answerWhy:
        "Aristotle's three appeals still power every pitch, ad, and speech: credibility earns trust, emotion creates connection, and logic seals the decision. Using all three makes persuasion feel effortless.",
    },
  },
];
