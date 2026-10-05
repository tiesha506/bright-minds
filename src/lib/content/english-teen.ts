// English — Teen (ages 14-15)
// Six exam-oriented lessons: grammar precision (agreement & pronoun case),
// essay structure, rhetoric & persuasive devices, show-don't-tell creative
// writing, summary/paraphrase/quote skills, and speaking & listening.
// Mature, academic, and never babyish — written for students who want respect.
import type { Lesson } from "./types";

export const lessons: Lesson[] = [
  // -------------------------------------------------------------------------
  // 1. Grammar Precision: Agreement and Pronoun Case
  // -------------------------------------------------------------------------
  {
    id: "english-teen-1",
    title: "Grammar Precision: Agreement and Pronoun Case",
    emoji: "🎯",
    minutes: 18,
    intro:
      "Examiners rarely reward flash and rarely forgive sloppiness. 'Between you and I', 'the team are', 'everyone have finished' — these quiet errors cost real marks. This lesson shuts them down.",
    sections: [
      {
        heading: "Agreement With Sneaky Subjects",
        body:
          "Verbs must agree with their subjects: a singular subject takes a singular verb. Sounds easy — until exam questions hide the subject. Prepositional phrases are the classic disguise: in 'The box of chocolates IS on the table', the subject is 'box', not 'chocolates'. Collective nouns like team, committee, government and audience name ONE group, so formal exam writing treats them as singular: 'The team IS winning its matches'. And with 'either/or' and 'neither/nor', the verb agrees with the NEARER subject: 'Neither the players nor the coach WAS happy' but 'Neither the coach nor the players WERE happy'.",
        example:
          "Cross out the phrase between subject and verb: 'The quality of the performances (was/were) uneven.' Cross out 'of the performances' → 'The quality … was uneven.' ✓",
        tip: "To find the true subject, delete any 'of …' phrase and read what remains.",
      },
      {
        heading: "Indefinite Pronouns Are Singular",
        body:
          "Words like everyone, everybody, each, either, neither, someone, nobody and one sound plural but take SINGULAR verbs: 'Everyone HAS finished', 'Each of the answers IS correct', 'Nobody WAS listening'. The trap is the plural noun sitting nearby — 'Each of the students' tempts you towards 'are', but 'each' is the subject and 'each' is singular. (If you keep the sentence 'Each … their' later in the sentence, most modern exam boards accept singular 'they' — but the VERB stays singular.)",
        example:
          "'Everyone in both classes HAS handed in the essay.' The plural 'classes' is a decoy; 'everyone' commands the verb.",
        tip: "Everyone, each, nobody → singular verb, every time.",
      },
      {
        heading: "Pronoun Case: I or Me?",
        body:
          "Pronouns change shape depending on their job. SUBJECT case (I, he, she, we, they) does the action; OBJECT case (me, him, her, us, them) receives it. Two exam favourites: after a preposition use the object case — 'between you and ME', never 'between you and I'. And in comparisons, complete the clause in your head: 'She runs faster than I (do)'. Quick test for compound subjects: drop the other person. 'Kai and (I/me) presented' → 'I presented' sounds right, so 'Kai and I presented'.",
        example:
          "'The certificates were awarded to Diego and me.' Test: 'awarded to me' — correct. 'Me and Diego went' fails the same test: 'me went' is wrong, so 'Diego and I went'.",
        tip: "Drop the partner pronoun and say the sentence — your ear knows the case.",
      },
      {
        heading: "Who or Whom?",
        body:
          "'Who' is a subject; 'whom' is an object. Use 'who' when the pronoun does the action ('Who called?') and 'whom' when it receives one or follows a preposition ('Whom did you invite?', 'To whom it may concern'). The substitution test settles it: answer the question with he/him. If 'him' fits, you need 'whom' — both end in -m. Informal speech flattens everything to 'who', and that's fine in texts, but exam writing still respects the distinction.",
        example:
          "'Whom did you sit with at lunch?' → 'I sat with HIM' → object → whom. 'Who wants dessert?' → 'HE wants dessert' → subject → who.",
        tip: "him = whom (both end in m). he = who. That's the whole trick.",
      },
      {
        heading: "Exam Traps Round-Up",
        body:
          "Four last traps that separate grades. ONE: compound subjects joined by 'and' are plural — unless they form one unit ('Fish and chips IS my usual order'). TWO: 'there is/there are' must match what actually follows ('There ARE two essays due'). THREE: 'the number of' is singular ('The number of absences IS rising') while 'a number of' is plural ('A number of students ARE complaining'). FOUR: don't let an interrupting clause fool you — 'The novel, along with its sequels, REMAINS unfinished' (the phrase 'along with' never creates a plural subject).",
        example:
          "'A number of viewers WERE unconvinced, but the number of five-star reviews IS growing.' Same idea, opposite verbs — both correct.",
        tip: "Underline the verb, then hunt for its true subject before you judge any sentence.",
      },
    ],
    vocab: [
      { word: "agreement", meaning: "The grammar rule that a verb must match its subject in number: she writes, they write." },
      { word: "collective noun", meaning: "A noun naming one group of members — team, committee, audience — treated as singular in formal writing." },
      { word: "indefinite pronoun", meaning: "A pronoun like everyone, each or nobody that doesn't name a specific person and takes a singular verb." },
      { word: "antecedent", meaning: "The noun a pronoun refers back to: in 'Amara lost her keys', 'Amara' is the antecedent of 'her'." },
      { word: "subject case", meaning: "The pronoun form used for doers of actions: I, he, she, we, they." },
      { word: "object case", meaning: "The pronoun form used after verbs and prepositions: me, him, her, us, them." },
    ],
    funFact:
      "Singular 'they' isn't an internet invention. Shakespeare used it in 'The Comedy of Errors' — 'There's not a man I meet but doth salute me as if I were their well-acquainted friend' — more than 400 years before style guides began arguing about it.",
    quiz: [
      {
        question: "Which sentence has correct subject–verb agreement?",
        options: [
          "The list of names are on the board.",
          "The list of names is on the board.",
          "The list of names were on the board.",
          "The lists of names is on the board.",
        ],
        answerIndex: 1,
        explanation:
          "The true subject is 'list' — singular — so it takes 'is'. The plural 'names' is trapped inside the prepositional phrase 'of names', where it can't command the verb.",
        misconceptions: [
          "'Names' sits right next to the verb, which is exactly the disguise — cross out 'of names' and the singular 'list' is left.",
          "Correct — delete 'of names' and you're matching the verb to 'list', which is singular.",
          "'Were' would need a plural subject; 'list' is singular, so this doubles the error.",
          "This flips the trap: now the subject IS plural ('lists'), so it would need 'are', not 'is'.",
        ],
      },
      {
        question: "In FORMAL exam writing, which sentence is the safest choice?",
        options: [
          "The team is proud of its record.",
          "The team are proud of their record.",
          "The team am proud of my record.",
          "The teams is proud of its record.",
        ],
        answerIndex: 0,
        explanation:
          "A collective noun names one group acting as one unit, so formal writing pairs it with a singular verb and singular 'its'. (British speech often allows the plural, but exams prefer the singular.)",
        misconceptions: [
          "Yes — one team, one unit: singular verb 'is' and singular 'its' travel together.",
          "Everyday British usage allows 'the team are', but exam-formal style treats the collective noun as singular.",
          "'Am' pairs only with 'I' — a team can never be 'I', and 'my record' changes the meaning entirely.",
          "Now the subject is genuinely plural ('teams'), which is the one thing that can never take 'is'.",
        ],
      },
      {
        question: "Neither the coach nor the players ______ happy after the final whistle.",
        options: ["was", "were", "are", "is"],
        answerIndex: 1,
        explanation:
          "With neither/nor, the verb agrees with the NEARER subject — 'the players', plural — and 'after the final whistle' sets the sentence in the past, so 'were' fits both rules.",
        misconceptions: [
          "Tempting, because 'neither' feels singular — but the governing rule is agreement with the nearer subject, 'players'.",
          "Correct — nearest subject 'players' is plural, and the finished match puts us in the past tense.",
          "'Are' matches 'players' in number but clashes with the past-tense setting of the sentence.",
          "'Is' fails twice: the nearer subject is plural and the event is in the past.",
        ],
      },
      {
        question: "'Between you and ______, that film was overrated.' Which pronoun fits?",
        options: ["I", "me", "myself", "mine"],
        answerIndex: 1,
        explanation:
          "'Between' is a preposition, and prepositions take the object case. Drop 'you and' and test it: you'd say 'between me' — never 'between I'.",
        misconceptions: [
          "'You and I' sounds educated, which is exactly why this trap works — but 'between' demands the object form.",
          "Right — after a preposition, object case is the rule: me.",
          "'Myself' is reflexive and needs an 'I' earlier in the sentence both doing and receiving the action.",
          "'Mine' signals possession — the sentence isn't about owning anything.",
        ],
      },
      {
        question: "______ did you sit with at lunch? (Formal exam choice.)",
        options: ["Who", "Whom", "Whose", "Which"],
        answerIndex: 1,
        explanation:
          "The pronoun is the object of 'with' — you sat with HIM. The he/him test: an answer with 'him' means you need 'whom'.",
        misconceptions: [
          "'Who' sounds natural in speech and is fine informally, but exam writing places 'whom' wherever the pronoun is an object.",
          "Correct — 'I sat with him' → object position → 'whom' is the exam-safe form.",
          "'Whose' is possessive — this sentence asks about a person, not about ownership.",
          "'Which' chooses between options — here we're asking about a person acting as an object of 'with'.",
        ],
      },
    ],
    worksheet: [
      {
        kind: "fill-blank",
        prompt: "Everyone in both classes ______ finished the essay. (Type has or have.)",
        answer: "has",
        hint: "Which is the real subject — 'everyone' or 'classes'?",
      },
      {
        kind: "fill-blank",
        prompt: "Neither the phones nor the laptop ______ working. (Type is or are.)",
        answer: "is",
        hint: "With neither/nor, match the verb to the NEARER subject.",
      },
      {
        kind: "correct-sentence",
        prompt:
          "Fix the agreement for formal exam writing and retype the whole corrected sentence.",
        sentence: "The team of volunteers were decorating the hall yesterday.",
        answer: "The team of volunteers was decorating the hall yesterday.",
        why: "'Team' is a collective noun acting as one unit, so formal writing gives it a singular verb; 'of volunteers' is a prepositional phrase, not the subject.",
      },
      {
        kind: "correct-sentence",
        prompt: "Fix the pronoun case (and mind polite word order) and retype the sentence.",
        sentence: "Me and Priya went to the library.",
        answer: "Priya and I went to the library.",
        why: "The pronoun is half of the sentence's subject, so it takes subject case 'I'; courtesy also puts the other person's name first.",
      },
      {
        kind: "build-sentence",
        prompt: "Tap the words to build a sentence using the correct object-case pronoun.",
        words: ["Between", "you", "and", "me,", "the", "essay", "was", "harder", "than", "it", "looked"],
        answer: "Between you and me, the essay was harder than it looked.",
      },
      {
        kind: "short-answer",
        prompt:
          "Write ONE sentence using the indefinite pronoun 'nobody' with a verb that agrees with it.",
        sampleAnswer: "Nobody in the class has finished the puzzle.",
      },
    ],
    challenge: {
      prompt:
        "This paragraph hides FOUR agreement/case errors. Find and fix them all, then retype the corrected paragraph: 'The pile of letters were on the desk. Each one was addressed to Amara and I. Neither the postman nor the neighbours knows who left them, and everybody were curious.'",
      hint: "One subject–verb error, one pronoun-case error, one nearest-subject error, one indefinite-pronoun error.",
      steps: [
        "Sentence 1: cross out 'of letters' — what number is the true subject?",
        "Sentence 2: drop 'Amara and' and test the pronoun — 'addressed to I' or 'addressed to me'?",
        "Sentence 3: apply the nearest-subject rule to 'neither the postman nor the neighbours'.",
        "Sentence 4: ask whether 'everybody' is singular or plural, then match the verb.",
        "Retype the whole paragraph with all four fixes and read it aloud to confirm.",
      ],
      answer:
        "The pile of letters was on the desk. Each one was addressed to Amara and me. Neither the postman nor the neighbours know who left them, and everybody was curious.",
      answerWhy:
        "'Pile' is the singular subject of sentence 1, so 'was'. 'To' is a preposition, so object case gives 'Amara and me'. In sentence 3 the nearer subject is the plural 'the neighbours', so 'know'. And 'everybody' is an indefinite pronoun — always singular — so 'everybody was'. Four traps, four rules.",
    },
  },

  // -------------------------------------------------------------------------
  // 2. Essay Structure: Thesis, Evidence and Flow
  // -------------------------------------------------------------------------
  {
    id: "english-teen-2",
    title: "Essay Structure: Thesis, Evidence and Flow",
    emoji: "🧱",
    minutes: 18,
    intro:
      "A great essay isn't a brain dump — it's engineered. Thesis, topic sentences, evidence, flow: build it properly and the examiner glides from your first line to your last without ever wondering where this is going.",
    sections: [
      {
        heading: "The Thesis: One Sentence of Argument",
        body:
          "A thesis is the claim your whole essay defends — not a topic, not a fact. 'School uniforms' is a topic. 'School uniforms exist' is a fact. 'School uniforms should be optional in the sixth form because they don't improve learning and they limit self-expression' is a thesis: specific, arguable, and provable with evidence. The examiner should be able to DISAGREE with a good thesis — otherwise there's nothing to argue.",
        example:
          "Weak: 'This essay will discuss homework.' Strong: 'Homework should be capped at one hour a night because it crowds out sleep and its learning benefits shrink beyond that point.'",
        tip: "Test any thesis by asking: could a sensible person argue the opposite? If not, you've written a fact.",
      },
      {
        heading: "Topic Sentences and the PEEL Paragraph",
        body:
          "Each body paragraph is a mini-essay with its own mini-thesis: the topic sentence. Then run PEEL — Point (the topic sentence), Evidence (quote, statistic or example), Explanation (why that evidence proves the point — usually the longest part), Link (a bridge to the question or the next paragraph). If your evidence occupies more space than your explanation, you're quote-dropping: pasting proof without doing the thinking the marks are for.",
        example:
          "Point: 'Later start times would boost alertness.' Evidence: 'One UK pilot school reported sharper morning focus after moving registration to 10am.' Explanation: 'Because teenage sleep cycles run late, an earlier start fights biology rather than laziness.' Link: 'Alert, not awake — that is the difference a later bell makes.'",
        tip: "Aim for a 1:2 ratio — one line of evidence, at least two lines of your own explanation.",
      },
      {
        heading: "Evidence Must Earn Its Place",
        body:
          "Evidence can be a quotation, a statistic, an example or an expert's view — but it must be introduced, not dumped. Signal it ('The data shows…', 'As the narrator admits…'), keep quotations short, and always follow with explanation. An examiner should never meet a quotation they can't attribute to your argument: every piece of evidence answers the question 'why should I believe this paragraph?'",
        example:
          "Dropped: 'Students are tired. \"Lessons start too early.\"' Embedded: 'Even the narrator concedes the point, calling early lessons \"a test of endurance, not thinking\".'",
        tip: "Introduce → quote → explain. Never let evidence stand alone.",
      },
      {
        heading: "Transitions: The Hidden Signposts",
        body:
          "Transitions are words that tell the reader what LOGICAL move you're making. 'Furthermore' and 'similarly' add. 'However', 'conversely' and 'on the other hand' contrast. 'Consequently' and 'therefore' claim cause and effect. 'For instance' introduces examples. Choose the one that names what you're actually doing — a 'however' where the logic adds, not contrasts, misleads the reader and suggests you don't quite know your own argument.",
        example:
          "'The first trial succeeded. HOWEVER, the second failed when the sample shrank.' Swap in 'furthermore' and you'd claim a failure was more good news.",
        tip: "Read your essay's transition words in a row: they should sketch the argument's shape.",
      },
      {
        heading: "The Reverse Outline: Your Five-Minute Flow Check",
        body:
          "Finished a draft? Extract only the first sentence of every paragraph and read them in order. They should retell your whole argument like a spark-notes skeleton: thesis defended step by step, no jumps, no repeats. If two topic sentences make the same point, merge the paragraphs. If you can't tell what a paragraph argues from its first sentence, the paragraph — not the sentence — needs rewriting. This is the fastest structural edit known to students.",
        example:
          "Skeleton: 'Later starts boost alertness. → Pilots schools saw better focus. → Teachers worry about buses. → Buses can be rescheduled. → Therefore the change is worth trialling.' Every link earns its place.",
        tip: "Do the reverse outline before your final read-through — fix the skeleton, then the skin.",
      },
    ],
    vocab: [
      { word: "thesis", meaning: "The one-sentence claim an essay argues and defends with evidence." },
      { word: "topic sentence", meaning: "The first sentence of a body paragraph — a mini-thesis for that paragraph." },
      { word: "evidence", meaning: "A quotation, statistic, example or expert view used to prove a point." },
      { word: "transition", meaning: "A word that signals the logical move between ideas: however, furthermore, consequently." },
      { word: "coherent", meaning: "Logically connected and easy to follow — the quality of writing that flows." },
      { word: "elaboration", meaning: "Your explanation of how and why evidence supports the point it follows." },
    ],
    funFact:
      "The word 'essay' comes from the French 'essai' — a trial or an attempt. Michel de Montaigne used it in 1580 for his short pieces of thinking-out-loud, treating each one as an experiment rather than a final verdict. Every essay you write is, literally, an attempt.",
    quiz: [
      {
        question: "Which is the strongest thesis statement?",
        options: [
          "This essay will discuss school uniforms.",
          "School uniforms should be optional because they don't improve learning and they limit self-expression.",
          "School uniforms exist in many countries around the world.",
          "School uniforms are nice.",
        ],
        answerIndex: 1,
        explanation:
          "It's specific, arguable (someone could disagree), and previews two provable reasons — the examiner knows exactly what the essay will do.",
        misconceptions: [
          "That's an announcement of a topic, not an argument — there's nothing to agree or disagree with.",
          "Yes — a defensible claim plus two reasons your body paragraphs can prove.",
          "A true fact, but facts nobody disputes can't carry an argument.",
          "'Nice' is an opinion with no reasons attached — the reader can't see where the essay is going.",
        ],
      },
      {
        question: "In a PEEL paragraph, what comes immediately AFTER your evidence?",
        options: [
          "Explanation — your reasoning about why the evidence proves the point",
          "Another piece of evidence",
          "The conclusion of the whole essay",
          "The topic sentence repeated word for word",
        ],
        answerIndex: 0,
        explanation:
          "Evidence never speaks for itself. The explanation is where you connect the proof to the point — and where most of the marks live.",
        misconceptions: [
          "Exactly — one line of evidence deserves at least two lines of your own thinking.",
          "Stacking quote on quote is quote-dropping — the examiner ends up doing your analysis for you.",
          "The conclusion closes the essay; a body paragraph needs analysis, not an ending.",
          "Repeating the topic sentence wastes the space where your elaboration should go.",
        ],
      },
      {
        question: "You write: 'The first trial succeeded. ______, the second failed.' Which transition fits?",
        options: ["Furthermore", "However", "Consequently", "Similarly"],
        answerIndex: 1,
        explanation:
          "The second sentence contradicts the first, so you need a contrast word — 'however' signals exactly that reversal.",
        misconceptions: [
          "'Furthermore' adds a similar point — but failure isn't more of the success.",
          "Correct — success, then failure: 'however' names the contrast honestly.",
          "'Consequently' claims the failure was caused by the success — a different logic and a false one here.",
          "'Similarly' promises a second success, which is the opposite of what happened.",
        ],
      },
      {
        question: "What does a topic sentence do?",
        options: [
          "States the main point of ONE paragraph, usually as its first sentence",
          "Lists every quotation you plan to use",
          "Restates the thesis in the middle of the essay",
          "Sums up the whole essay at the start of the conclusion",
        ],
        answerIndex: 0,
        explanation:
          "Think of it as a mini-thesis: it focuses one paragraph, and the paragraph's evidence then proves it.",
        misconceptions: [
          "Yes — one paragraph, one point, announced up front.",
          "Quotations are the evidence inside paragraphs; a planning list is not a sentence in the essay.",
          "The thesis lives in the introduction; each body paragraph gets its own smaller claim.",
          "That's the conclusion's job — a topic sentence opens and focuses a body paragraph.",
        ],
      },
      {
        question: "Your draft is finished. You read ONLY the first sentence of every paragraph. Why?",
        options: [
          "To check the argument still flows logically from start to finish",
          "To check the spelling is perfect",
          "To count whether you have enough quotations",
          "To check the essay is long enough",
        ],
        answerIndex: 0,
        explanation:
          "That's the reverse outline — the first sentences should retell your argument like a skeleton. If the skeleton reads well, the essay's structure holds.",
        misconceptions: [
          "Exactly — it's a five-minute structural audit of the whole argument.",
          "Spelling is surface proofreading; this technique tests structure, not surface.",
          "Quotes are judged inside their paragraphs — the reverse outline tests the argument's shape.",
          "Padding the length doesn't survive a reverse outline — weak links show up instantly.",
        ],
      },
    ],
    worksheet: [
      {
        kind: "fill-blank",
        prompt: "The single sentence that states the claim your whole essay defends is called the ______.",
        answer: "thesis",
      },
      {
        kind: "fill-blank",
        prompt: "PEEL stands for Point, Evidence, ______, Link. (Type the missing word.)",
        answer: "explanation",
      },
      {
        kind: "fill-blank",
        prompt: "'The evidence is strong; ______, two studies disagree.' (Type the one-word contrast connector.)",
        answer: "however",
        hint: "Which transition signals a contrast?",
      },
      {
        kind: "match",
        prompt: "Match each transition to the logical move it signals!",
        left: ["However", "Furthermore", "Consequently", "For instance"],
        right: ["adds a supporting point", "signals a contrast", "introduces an example", "shows a cause-and-effect result"],
        answer: [1, 0, 3, 2],
      },
      {
        kind: "short-answer",
        prompt:
          "Turn the topic 'School uniform debate' into a ONE-sentence thesis you could actually defend.",
        sampleAnswer:
          "School uniforms should be optional in the sixth form because they don't improve learning and they limit self-expression.",
      },
      {
        kind: "writing",
        prompt:
          "Write ONE PEEL paragraph on: 'Phones should be banned in classrooms.' You may invent a realistic statistic for practice. Label your Point, Evidence, Explanation and Link.",
        sampleAnswer:
          "Point: Phones fragment attention in class. Evidence: In one school trial, teachers recorded 30% more correct answers in phone-free lessons. Explanation: Because attention is limited, every glance at a screen steals focus from the explanations students later need in tests, so the cost of a single notification is much bigger than it looks. Link: That is why banning phones in classrooms protects learning itself.",
        minWords: 50,
      },
    ],
    challenge: {
      prompt:
        "Fix this flawed thesis and plan the essay it implies: 'This essay will talk about why homework is bad and about history and other things.' Rewrite it as ONE sharp, arguable thesis, then write the TWO topic sentences its body paragraphs would need.",
      hint: "Delete the announcement, choose ONE argument, attach two provable reasons — then each reason becomes a topic sentence.",
      steps: [
        "Cross out the announcement ('This essay will talk about') — theses argue, they don't announce.",
        "Cut the sprawl: 'history and other things' is not an argument — pick the homework claim only.",
        "Add two specific reasons you could prove with evidence.",
        "Test it: could a sensible person disagree? If yes, it's arguable.",
        "Convert each reason into a topic sentence that could open a body paragraph.",
      ],
      answer:
        "Thesis: 'Homework should be capped at one hour a night because it crowds out sleep and its academic benefits shrink beyond that point.' Topic sentence 1: 'First, an hourly cap protects sleep, which research links directly to memory and exam performance.' Topic sentence 2: 'Second, studies suggest the learning benefit of homework flattens out after roughly sixty minutes.'",
      answerWhy:
        "The rewrite is arguable (a school could disagree), specific (one hour), and provable (sleep research, dose-response studies) — and its two reasons ARE its two topic sentences, which is exactly how a thesis engineers an essay. The original announced topics instead of arguing anything.",
    },
  },

  // -------------------------------------------------------------------------
  // 3. Rhetoric and Persuasive Devices
  // -------------------------------------------------------------------------
  {
    id: "english-teen-3",
    title: "Rhetoric and Persuasive Devices",
    emoji: "🎙️",
    minutes: 17,
    intro:
      "Ads, speeches, election campaigns, even your friend arguing for a later curfew — persuasion runs on a toolkit that's over 2,000 years old. Name the tools and you'll never be manipulated invisibly again. Bonus: you'll wield them better too.",
    sections: [
      {
        heading: "The Three Appeals: Ethos, Pathos, Logos",
        body:
          "Aristotle split persuasion into three appeals. ETHOS persuades through credibility — experience, qualifications, shared values ('As a paramedic, I've seen this firsthand'). PATHOS persuades through emotion — vivid images, stories, fear, hope ('Imagine your dog waiting at a window that never opens'). LOGOS persuades through logic — facts, statistics, cause and effect ('Collisions drop 30% where this law exists'). Strong persuasion layers all three; weak persuasion leans on one and hopes.",
        example:
          "Ethos: 'Our mechanics have serviced buses in this depot for 30 years.' Pathos: 'Every late bus is a child standing in the rain.' Logos: 'New engines cut breakdowns by half.'",
        tip: "Ask of any persuasive text: is it borrowing trust, feeling, or logic — and which is it dodging?",
      },
      {
        heading: "The Rule of Three and Rhetorical Questions",
        body:
          "Three-part phrases ('tricolons') feel complete: 'friends, countrymen, lend me your ears' works as 'Read, write, revise' does. Three is the smallest number that creates a pattern, a rise and a landing — that's why slogans and speeches love it. RHETORICAL questions persuade differently: they're asked for effect, not answers, forcing listeners to argue your point inside their own heads ('Is this really the school we want to be?'). Used together, a question opens the wound and a tricolon offers the cure.",
        example:
          "'We can plan it, we can build it, we can open it by September.' Tricolon: pattern, build, payoff.",
        tip: "Rhetorical questions work only when the obvious answer is the one you want.",
      },
      {
        heading: "Anecdote vs Statistics: The Story and the Number",
        body:
          "An ANECDOTE is one person's story — vivid, memorable, persuasive, and dangerously limited. One student who loved a new timetable proves one student loved it. A STATISTIC summarises many cases — harder to feel, harder to argue with, and easiest to distort ('9 out of 10 testers' — which testers? how many?). The most convincing writing pairs them: the anecdote makes the audience care, the statistic makes the case. When analysing, always ask what an anecdote leaves out and who a statistic leaves behind.",
        example:
          "'My brother's grades collapsed when revision apps replaced his teacher (anecdote). Across 40 schools, app-only classes averaged 12% lower scores (statistic). Together they convince.'",
        tip: "Anecdotal evidence persuades emotions; statistics persuade minds — exam answers should say so.",
      },
      {
        heading: "Analysing a Persuasive Excerpt",
        body:
          "Analysis is naming the device AND its effect. Take this student-council speech: 'Every morning, 200 students squeeze past our overflowing bins. Last week one of them was Kai, holding his sandwich wrapper with nowhere to put it. Is this really the school we want to be? Together, we can sort this — for the planet, for our community, for pride in our school.' Devices: statistic (200), emotive 'overflowing', anecdote (Kai), rhetorical question, inclusive 'we', tricolon in the final line. Effect: the number proves scale, the story makes it personal, the question recruits your judgement, the tricolon ends on momentum.",
        example:
          "One-line analysis: 'The speaker moves from evidence (200 students) to empathy (Kai's wrapper) to invitation (we), so the audience feels the problem is theirs — and so is the fix.'",
        tip: "In analysis, never stop at the label — every device name needs a 'so that the reader…' clause.",
      },
    ],
    vocab: [
      { word: "ethos", meaning: "Persuasion through the speaker's credibility, experience or shared values." },
      { word: "pathos", meaning: "Persuasion through the audience's emotions — pity, fear, hope, pride." },
      { word: "logos", meaning: "Persuasion through logic: facts, statistics and reasoning." },
      { word: "rhetorical question", meaning: "A question asked for effect, not an answer, making listeners judge for themselves." },
      { word: "anecdotal evidence", meaning: "A single personal story offered as proof — vivid but unrepresentative." },
      { word: "tricolon", meaning: "A persuasive pattern of three parallel phrases — the rule of three." },
    ],
    funFact:
      "After a lightning victory in 47 BC, Julius Caesar reported 'Veni, vidi, vici' — 'I came, I saw, I conquered' — a three-part line the biographer Suetonius says was paraded at his triumph. Two thousand years later, the rule of three is still winning arguments.",
    quiz: [
      {
        question: "'As a doctor with twenty years in emergency medicine, I can tell you helmets save lives.' Which appeal is doing the persuading?",
        options: ["Ethos — credibility from experience", "Pathos — fear appeal", "Logos — statistics", "None of the appeals"],
        answerIndex: 0,
        explanation:
          "The persuasive weight comes from WHO is speaking: twenty years of front-line experience makes the speaker worth believing. That's ethos.",
        misconceptions: [
          "Yes — qualifications and experience are the classic markers of ethos.",
          "The line stays calm — no vivid imagery or emotional language yet, so it isn't pathos.",
          "There are no numbers or statistics here — logos would need data or reasoning.",
          "Every persuasive line leans on at least one appeal — this one borrows trust.",
        ],
      },
      {
        question: "'Imagine your dog waiting at a shelter window that never opens.' This appeal is…",
        options: ["Logos", "Pathos", "Ethos", "A statistic"],
        answerIndex: 1,
        explanation:
          "It paints a picture designed to make you FEEL — no numbers, no credentials, just emotion. Textbook pathos.",
        misconceptions: [
          "Logos needs facts or reasoning — this line offers a feeling, not an argument.",
          "Correct — the image is engineered to stir emotion, which is pathos by definition.",
          "Ethos borrows credibility — no qualifications or trust markers appear here.",
          "A statistic would be a number from data — there isn't one in the sentence.",
        ],
      },
      {
        question: "Which line uses a RHETORICAL question?",
        options: [
          "Is this really the school we want to be?",
          "Our bins overflow by Wednesday every week.",
          "Last week, Kai couldn't find anywhere to put his wrapper.",
          "The council collected 400 tonnes of litter last year.",
        ],
        answerIndex: 0,
        explanation:
          "It's asked for effect — the speaker doesn't want an answer, they want the audience to judge themselves and agree. That's the rhetorical question.",
        misconceptions: [
          "Correct — no answer is expected; the question does the persuading.",
          "That's an emotive statement of fact — powerful, but it isn't a question.",
          "That's an anecdote — a single concrete story used as evidence.",
          "That's a statistic — a number summarising many cases.",
        ],
      },
      {
        question: "'My gran smoked all her life and lived to 94, so smoking can't be that dangerous.' This reasoning is…",
        options: [
          "Sound — gran is a credible witness",
          "Anecdotal evidence — one personal story can't outweigh population data",
          "A statistic",
          "Ethos at its best",
        ],
        answerIndex: 1,
        explanation:
          "It's a vivid single case used as proof. One survivor story doesn't dent decades of data on millions of smokers — that's why anecdotes persuade wrongly.",
        misconceptions: [
          "Warm and memorable — which is exactly why anecdotes mislead; a sample of one proves nothing about populations.",
          "Correct — it's anecdotal: emotionally powerful, statistically empty.",
          "A statistic summarises many cases with numbers — one gran is not a dataset.",
          "Ethos is about the speaker's credibility, not about stretching a story of one into a rule for all.",
        ],
      },
      {
        question: "'For the planet, for our community, for pride in our school.' Why does this triple structure persuade?",
        options: [
          "The rhythm feels complete and memorable, so the ending lands",
          "It proves the statistics are correct",
          "It creates a rhyme that aids spelling",
          "It shortens the speech",
        ],
        answerIndex: 0,
        explanation:
          "Three parallel phrases create pattern, rise and landing — a tricolon. The audience remembers what had rhythm, and remembered lines get quoted.",
        misconceptions: [
          "Yes — three is the smallest number that builds a pattern, and the build makes the final phrase feel inevitable.",
          "The tricolon adds rhythm, not proof — the statistics stand or fall separately.",
          "Nothing rhymes here; the power is rhythm and parallel structure.",
          "It actually adds words — the gain is memorability, not brevity.",
        ],
      },
    ],
    worksheet: [
      {
        kind: "fill-blank",
        prompt: "Persuading by showing the speaker's credibility and trustworthiness appeals to ______. (Type ethos, pathos or logos.)",
        answer: "ethos",
      },
      {
        kind: "fill-blank",
        prompt: "Persuading by stirring the audience's emotions appeals to ______. (Type ethos, pathos or logos.)",
        answer: "pathos",
      },
      {
        kind: "match",
        prompt: "Match each line to the device it uses!",
        left: [
          "We shall plan, we shall build, we shall win.",
          "Don't you deserve cleaner air?",
          "Surveys show 68% of students agree.",
          "On my first day here, I got lost twice.",
        ],
        right: ["statistics (logos)", "tricolon (rule of three)", "anecdote", "rhetorical question"],
        answer: [1, 3, 0, 2],
      },
      {
        kind: "short-answer",
        prompt:
          "Think of an advert you saw this week. Name ONE persuasive device it used and explain its effect in a sentence.",
        sampleAnswer:
          "The advert claimed '9 out of 10 dentists recommend it' — a statistic (logos) that makes the product feel scientifically approved without saying which dentists were asked.",
      },
      {
        kind: "build-sentence",
        prompt: "Tap the words to build the closing tricolon of a campaign speech.",
        words: ["Together", "we", "can", "sort", "this", "for", "the", "planet,", "for", "our", "community", "and", "for", "our", "school"],
        answer: "Together we can sort this for the planet, for our community and for our school.",
      },
      {
        kind: "writing",
        prompt:
          "Write a three-sentence mini-speech for or against 'School uniform should be optional'. Sentence 1 uses pathos, sentence 2 uses logos, sentence 3 uses a tricolon. Label each device in brackets.",
        sampleAnswer:
          "Picture a corridor where every student looks like a photocopy of the last (pathos). Schools that relaxed uniform rules report no drop in achievement (logos). Let us choose how we dress, how we think, and how we grow (tricolon).",
        minWords: 35,
      },
    ],
    challenge: {
      prompt:
        "Dissect this ad slogan, expose its weak points, then rebuild it stronger: 'Sleep deeper. Wake brighter. Live better — chosen by 9 out of 10 testers.' Name each device, explain why the persuading works, identify what the line conveniently hides, and rewrite it adding an element of ethos.",
      hint: "Tricolon + statistic = rhythm and logos. What's missing is WHO the testers were and WHY they're believable — that gap is where ethos goes.",
      steps: [
        "Label the devices: the three-part command and the '9 out of 10' claim.",
        "Interrogate the statistic: how many testers? selected how? '9 out of 10' of a tiny hand-picked sample proves little.",
        "Spot the missing appeal: no source, no expertise, no brand track record — ethos is absent.",
        "Rewrite, adding a credible named source or qualification to the same tricolon-plus-statistic frame.",
        "Compare the two versions: the devices stayed, the honesty went up — and so did the persuasion.",
      ],
      answer:
        "Analysis: 'Sleep deeper. Wake brighter. Live better' is a tricolon (rhythm and completeness); 'chosen by 9 out of 10 testers' is a statistic (logos) — but the testers are unnamed and uncounted, and no credibility backs the claim. Rebuild: 'Sleep deeper. Wake brighter. Live better — the mattress recommended by the National Sleep Institute after 200 families tested it for a month.'",
      answerWhy:
        "The rebuild keeps the tricolon (pathos-rhythm) and upgrades the statistic with a number and a method (stronger logos), while the named institute supplies the missing ethos. All three appeals working together is what Aristotle meant by a complete persuasive case — and it's also harder to challenge, which examiners reward.",
    },
  },

  // -------------------------------------------------------------------------
  // 4. Creative Writing: Show, Don't Tell
  // -------------------------------------------------------------------------
  {
    id: "english-teen-4",
    title: "Creative Writing: Show, Don't Tell",
    emoji: "🎬",
    minutes: 18,
    intro:
      "Readers don't want to be told the cave was scary — they want their pulse to jump. Show, don't tell is the difference between a report and a scene, and it's the single fastest way to level up your narrative writing marks.",
    sections: [
      {
        heading: "Telling States. Showing Proves.",
        body:
          "Telling hands the reader a conclusion: 'Noor was nervous.' Showing hands them the EVIDENCE and lets them reach the conclusion: 'Noor read the question twice, then a third time, her pen hovering above nothing.' The reader who works things out feels clever — and feels present. The technique isn't banning 'nervous' forever; it's knowing that conclusions carry no picture, and pictures are what stick with the examiner.",
        example:
          "Telling: 'The house was derelict.' Showing: 'The front door hung on one hinge, and grass grew through the hallway carpet.'",
        tip: "After every 'he was/she was' sentence, ask: what would a camera see instead?",
      },
      {
        heading: "The Five-Sense Camera",
        body:
          "Most students write only what the eye sees. The pros run all five senses — and reach for the neglected ones first. Sound, smell and touch are underused superpowers: 'the corridor smelled of disinfectant and rain-soaked coats' places the reader faster than any visual list. Choose precise nouns and strong verbs over piles of adjectives: 'sneakers squeaked on wet tile' beats 'the floor was very slippery and loud'. Two or three well-chosen sensory details beat ten generic ones.",
        example: "'The market hit me at the gate — diesel, frying onions, and a vendor shouting prices over a scooter horn.' Three senses, one sentence, and the reader is standing there.",
        tip: "In any scene, force yourself to use one non-visual sense — it's the detail examiners remember.",
      },
      {
        heading: "Vary Your Openers, Control the Pace",
        body:
          "If five sentences in a row start with 'I' or 'The', your rhythm flatlines. Vary the openers: start with an -ing verb ('Opening the door, I caught a glimpse…'), a prepositional phrase ('Beyond the gate, footsteps…'), an adverb or a fragment. Then use sentence LENGTH as a pacing tool: short sentences speed the heart rate in action ('The light died. Something moved.'); longer sentences slow the reader for description and thought. Rhythm is meaning.",
        example:
          "Before: 'I opened the door. I saw a shadow. I ran.' After: 'Opening the door, I caught a glimpse of a shadow — and ran.'",
        tip: "Circle the first word of every sentence in a paragraph: three identical openers in a row means it's edit time.",
      },
      {
        heading: "Dialogue That Works",
        body:
          "Dialogue does two jobs at once: it reveals character and it moves the plot — anything else is filler. Punctuation rules: start a new line for each new speaker; keep the end punctuation INSIDE the quotation marks; keep the reporting tag lowercase ('…she said', not '…She said'); use plain 'said' and 'asked' more than fancy tags — 'she expostulated' yanks the reader out of the scene. UK fiction often uses single quotation marks for speech; double is equally correct. Choose one and stay consistent.",
        example:
          "'Where are you going?' asked Amara.\n'Nowhere fast,' muttered Kai, already three steps away.\nNew line per speaker, punctuation inside the marks, lowercase tags.",
        tip: "Read dialogue aloud — if it sounds like an essay, cut it until it sounds like people.",
      },
      {
        heading: "Mood: Choose Details Like a Director",
        body:
          "Mood is the emotion the READER feels, and you build it by selecting details that serve one feeling — not by announcing it. The same street can feel hopeful or menacing depending on what you film: dawn light and bread smells, or dead streetlamps and a slow car. Ask of every detail: does it feed the mood or leak it? A single wrong-feeling detail ('the curtains hung perfectly still, though the window was wide open') builds more unease than a paragraph of 'it was creepy'.",
        example: "Menace: 'The playground swings hung dead still, though the evening wind was up.' The stillness against the wind does the frightening.",
        tip: "Pick your mood word FIRST, then audition every detail against it.",
      },
    ],
    vocab: [
      { word: "imagery", meaning: "Descriptive writing that appeals to the five senses." },
      { word: "sensory detail", meaning: "A specific detail of sound, smell, taste, touch or sight that places the reader in a scene." },
      { word: "mood", meaning: "The atmosphere a piece creates — the feeling the READER gets." },
      { word: "tone", meaning: "The writer's attitude towards the subject — how the WRITER sounds." },
      { word: "cliché", meaning: "A phrase so overused it has lost its force, like 'as quiet as a mouse'." },
      { word: "dialogue", meaning: "Words spoken by characters, set out with correct punctuation and new lines per speaker." },
    ],
    funFact:
      "In an 1886 letter, Anton Chekhov told his brother you don't need to write 'the moon was shining' — describe the glint of broken bottle glass on a mill dam and readers see moonlight for themselves. The famous version, 'Don't tell me the moon is shining; show me the glint of light on broken glass', is a polished paraphrase of his advice.",
    quiz: [
      {
        question: "Which sentence SHOWS rather than tells?",
        options: [
          "Diego was exhausted.",
          "Diego dragged his bag up the stairs and answered in half-words, already halfway to sleep.",
          "Diego felt very tired, honestly.",
          "Diego was so tired he could sleep for a year.",
        ],
        answerIndex: 1,
        explanation:
          "Actions and detail — the dragged bag, the half-word answers — give the reader evidence and let them conclude 'exhausted' without being told.",
        misconceptions: [
          "That's the conclusion itself — showing supplies the picture that proves it.",
          "Yes — the reader works out the tiredness from what they can see and hear.",
          "'Very tired' still tells; adding 'honestly' doesn't create a picture.",
          "That's exaggeration built on a worn phrase — the reader gets a cliché, not a scene.",
        ],
      },
      {
        question: "Which line of dialogue is punctuated correctly?",
        options: [
          "'Where are you going' asked Amara.",
          "'Where are you going?' asked Amara.",
          "'Where are you going?.' asked Amara.",
          "'Where are you going?' Asked Amara.",
        ],
        answerIndex: 1,
        explanation:
          "The question mark belongs to the speech, so it sits inside the quotation marks — and the reporting tag continues the same sentence, so 'asked' stays lowercase.",
        misconceptions: [
          "The question mark is part of the speech and must sit inside the marks; the tag stays lowercase.",
          "Correct — end punctuation inside the quotes, lowercase reporting tag.",
          "One piece of end punctuation is enough — '?.' doubles up.",
          "After the closing quote the sentence continues, so the tag must stay lowercase.",
        ],
      },
      {
        question: "'I opened the door. I saw a shadow. I ran.' Which revision best varies the openers?",
        options: [
          "I opened the door. I saw a shadow. I ran faster.",
          "Opening the door, I caught a glimpse of a shadow — and ran.",
          "I opened the door, I saw a shadow, I ran.",
          "The door I opened. A shadow I saw. Running I ran.",
        ],
        answerIndex: 1,
        explanation:
          "An -ing opener, a dash, and varied verbs break the drumbeat of 'I… I… I…' while keeping the pace — rhythm mirrors the panic without becoming a formula.",
        misconceptions: [
          "Same 'I' openers with an extra adverb — the flat rhythm is unchanged.",
          "Yes — the -ing opener and dash vary the pattern and tighten the pace.",
          "That's a comma splice — three sentences jammed together with commas.",
          "Fancy inversion everywhere reads as a stunt — vary naturally, not mechanically.",
        ],
      },
      {
        question: "Which detail best builds an UNEASY mood?",
        options: [
          "The curtains were blue.",
          "The curtains hung perfectly still, though the window was wide open.",
          "The curtains cost twenty pounds.",
          "The curtains were extremely colourful.",
        ],
        answerIndex: 1,
        explanation:
          "Stillness where there should be movement is a wrong-feeling detail — the reader's neck prickles before they know why. Mood is built from loaded details, not random facts.",
        misconceptions: [
          "A neutral fact carries no mood — unease needs details that feel off.",
          "Yes — the impossible stillness makes the room feel watched.",
          "A price is shopping information; it leaves the reader's feelings untouched.",
          "'Colourful' describes the curtains, not the atmosphere of the room.",
        ],
      },
      {
        question: "Which phrase is the cliché a writer should replace?",
        options: [
          "As quiet as a mouse",
          "Rain tapped the window like fingertips.",
          "The engine coughed twice and died.",
          "The floorboards announced every step.",
        ],
        answerIndex: 0,
        explanation:
          "'As quiet as a mouse' is so worn that readers skim straight past it — no picture forms. The others are fresh images doing real work.",
        misconceptions: [
          "Yes — a stock comparison signals imagination switched off; invent your own.",
          "Fresh and specific — fingertips on glass gives rain a new angle.",
          "Giving the engine a human 'cough' is lively personification, not a stock phrase.",
          "Floorboards 'announcing' steps is a fresh twist on an old sound.",
        ],
      },
    ],
    worksheet: [
      {
        kind: "fill-blank",
        prompt:
          "Descriptive writing that appeals to the five senses — sight, sound, smell, taste and touch — is called ______.",
        answer: "imagery",
      },
      {
        kind: "fill-blank",
        prompt: "A comparison so overused it has lost its punch, like 'as cold as ice', is a ______.",
        answer: "cliché",
      },
      {
        kind: "correct-sentence",
        prompt: "Fix the dialogue punctuation and retype the whole line.",
        sentence: "'I can't believe it' exclaimed Kai.",
        answer: "'I can't believe it!' exclaimed Kai.",
        why: "The exclamation mark belongs to the speech, so it goes inside the quotation marks, and the reporting tag continues the sentence in lowercase.",
      },
      {
        kind: "build-sentence",
        prompt: "Tap the words to build a sentence that opens with an -ing verb.",
        words: ["Opening", "the", "gate", "slowly,", "Noor", "listened", "for", "footsteps", "behind", "her"],
        answer: "Opening the gate slowly, Noor listened for footsteps behind her.",
      },
      {
        kind: "short-answer",
        prompt:
          "Rewrite 'The market was noisy' so it SHOWS two senses — and don't use the word noisy.",
        sampleAnswer:
          "Vendors shouted over the wail of a scooter horn, and the smell of frying onions hit me at the gate.",
      },
      {
        kind: "writing",
        prompt:
          "Write a 4-5 sentence scene showing that a character is scared in the library at night — WITHOUT using scared, afraid, terrified or frightened. Use one non-visual sense and vary your sentence openers.",
        sampleAnswer:
          "The heating clicked off and the silence behind the stacks grew ears. Tomás's torch beam jittered across the spines, catching the dust he had no intention of breathing. Somewhere between Biographies and Business, a page turned — slowly, and not by him. 'Anyone there?' he asked, and the library let the question die mid-air.",
        minWords: 50,
      },
    ],
    challenge: {
      prompt:
        "Transform this telling paragraph into a showing one: 'The house was old and spooky. It was dark outside. Tomás was scared. The wind was loud.' Rules: 4-6 sentences, at least two senses besides sight, at least two different sentence openers, and one line of correctly punctuated dialogue. The words spooky and scared must not appear.",
      hint: "Turn each telling sentence into evidence: what does an old house DO to your ears, nose and skin? What does fear make a body DO?",
      steps: [
        "List the four telling sentences and what each one asserts.",
        "For each, invent 1-2 concrete details a camera or microphone would catch — include one sound and one smell or touch.",
        "Choose openers: one -ing verb, one prepositional phrase or fragment.",
        "Add one short line of dialogue with punctuation inside the quotation marks and a lowercase tag.",
        "Check: no 'spooky', no 'scared', rhythm varies, senses stacked — then read it aloud.",
      ],
      answer:
        "The gate shrieked as Tomás pushed it, and the smell of wet rot drifted from the porch. Wind rattled the upstairs shutters like hands testing the windows. 'Who's there?' he whispered, though the porch light had died weeks ago. He counted to three, then took the step he couldn't take back.",
      answerWhy:
        "Every telling claim becomes evidence: the shriek and smell prove 'old', the rattling shutters and dead light prove 'spooky', the whisper and the counting prove 'scared'. The reader assembles the fear themselves — which is precisely why they feel it. Varied openers control the rhythm, and the dialogue grounds the scene in a voice.",
    },
  },

  // -------------------------------------------------------------------------
  // 5. Summarise, Paraphrase, Quote
  // -------------------------------------------------------------------------
  {
    id: "english-teen-5",
    title: "Summarise, Paraphrase, Quote",
    emoji: "✂️",
    minutes: 17,
    intro:
      "Coursework, exams, science reports, history essays — every one of them grades the same hidden skill: handling other people's words honestly. Master the three tools — summarise, paraphrase, quote — and you'll never fear a 'use your own words' question again.",
    sections: [
      {
        heading: "Three Tools, Three Jobs",
        body:
          "A SUMMARY condenses: much shorter, main points only, your own words. A PARAPHRASE translates: roughly the original length, every idea kept, your own words. A QUOTATION preserves: the author's exact words inside quotation marks, used when the phrasing itself matters. Choose by purpose — condensing a whole article? Summary. Repackaging one idea? Paraphrase. Analysing a writer's specific choice of words? Quote. Problems start when the tool doesn't match the job.",
        example:
          "60-word original → 15-word summary. → 60-word paraphrase. → exact 8 words in quotation marks with the author named. Three tools, three different outputs.",
        tip: "Before you borrow words, ask: do I need it SHORT, MINE, or EXACT?",
      },
      {
        heading: "Condensing Without Distorting",
        body:
          "To summarise: read the whole text first, find the main idea of each paragraph, delete examples and lists, and keep the PROPORTIONS — if the source spends half its space on causes, your summary should too. The accuracy test: a reader who never sees the original must not come away misled. Cutting 'almost' from 'almost half the students' changes the claim; dropping a caveat turns a balanced report into propaganda. Summarising is compression, not reinterpretation.",
        example:
          "60-word report: waste fell a third after posters, bin-monitoring and reusable cutlery. Summary: 'The eco-club cut lunchtime waste by a third through posters, bin checks and reusable cutlery.' Same claim, quarter of the words.",
        tip: "Keep the qualifiers — 'almost', 'may', 'some' carry meaning.",
      },
      {
        heading: "Paraphrasing Like a Pro",
        body:
          "A real paraphrase changes the vocabulary AND the structure while keeping the meaning intact. The classic fail is synonym roulette — swapping word by word ('storm' → 'tempest', 'forced' → 'compelled') — which keeps the original structure, sounds bizarre, and still counts as too close. The pro method: read the passage, cover it, say the idea aloud as if telling a friend, then write THAT down. Finally compare: same meaning? different shape? If your version mirrors the original clause by clause, rebuild it.",
        example:
          "Original: 'The storm forced the closure of every coastal road.' Roulette: 'The tempest compelled the shutdown of each littoral route.' Pro: 'Every coastal road had to close because of the storm.'",
        tip: "Cover → say aloud → write from memory → check accuracy. Four steps, honest paraphrase.",
      },
      {
        heading: "Embedding Quotations",
        body:
          "A quotation should be bolted into YOUR sentence, not parked beside it. Copy exactly — every word, capital and qualifier. Signal it ('the narrator admits…', 'the data shows…'), keep it short, and follow with explanation. Use square brackets for tiny adjustments ('she [the mayor] insisted') and an ellipsis for a cut. The quote sandwich: introduce, quote, explain. An embedded quote proves you read closely; a dropped quote proves you can copy and paste.",
        example:
          "Dropped: The speaker is sad. 'I am so alone.' Embedded: The speaker's loneliness boils down to three bare words: 'I am so alone'.",
        tip: "No quotation should ever sit alone as its own sentence.",
      },
      {
        heading: "Avoiding Plagiarism",
        body:
          "Plagiarism is presenting someone else's words OR ideas as your own. That means uncited quotations, uncited paraphrases, and even 'borrowed' structure all count. The fix is simple: acknowledge — name the source in your sentence or in a citation. The exception is common knowledge: facts an ordinary adult could know ('Paris is the capital of France') need no citation; anything specific ('waste fell 33% in two months') does. Citing isn't cheating — it's evidence you did your reading, and examiners reward it.",
        example: "Needs citation: 'One 2019 survey found 62% of teens check their phone within five minutes of waking.' Doesn't: 'Many teens sleep next to their phones.'",
        tip: "If you had to look it up, name where you found it.",
      },
    ],
    vocab: [
      { word: "summarise", meaning: "To give a much shorter version of a text in your own words, main points only." },
      { word: "paraphrase", meaning: "To restate a passage in your own words at a similar length, keeping every idea." },
      { word: "condense", meaning: "To compress a text into fewer words while keeping its meaning intact." },
      { word: "embedded quotation", meaning: "A quotation woven into your own sentence, introduced and explained by you." },
      { word: "citation", meaning: "A note naming the source of words or ideas you have used." },
      { word: "plagiarism", meaning: "Presenting someone else's words or ideas as your own, with or without copying them exactly." },
    ],
    funFact:
      "The word 'plagiarism' traces to the Latin 'plagiarius' — a kidnapper. Around AD 100 the Roman poet Martial accused a rival of kidnapping his verses and publishing them under another name, and the insulting nickname stuck as our word for literary theft.",
    quiz: [
      {
        question: "You turn a 600-word article into a 40-word version in your own words. You have written a…",
        options: ["Summary", "Paraphrase", "Quotation", "Citation"],
        answerIndex: 0,
        explanation:
          "Much shorter, main points only, your own words — the complete recipe for a summary.",
        misconceptions: [
          "Correct — drastic shortening in fresh words is summarising.",
          "A paraphrase keeps roughly the original length and all the detail — 40 words out of 600 is far too short.",
          "A quotation copies the author's exact words — these are your own.",
          "A citation names the source; it doesn't shorten anything.",
        ],
      },
      {
        question: "Which is the best paraphrase of 'The storm forced the closure of every coastal road'?",
        options: [
          "The tempest compelled the shutdown of each littoral route.",
          "Every coastal road had to close because of the storm.",
          "The storm forced the closure of every coastal road.",
          "Some roads were closed by weather.",
        ],
        answerIndex: 1,
        explanation:
          "Same meaning, new structure, natural vocabulary — a genuine paraphrase that stays accurate to every part of the original.",
        misconceptions: [
          "Synonym roulette: swapping word for word keeps the original structure, distorts the register — and doesn't fool anyone about where it came from.",
          "Correct — restructured, plain, and faithful: the paraphrase sweet spot.",
          "That's the original copied word for word — changing nothing isn't paraphrasing.",
          "'Some' and 'weather' shrink the claim — every part of the meaning must survive, including 'every' and 'storm'.",
        ],
      },
      {
        question: "Which sentence EMBEDS the quotation properly?",
        options: [
          "The speaker is sad. 'I am so alone.'",
          "The speaker's loneliness boils down to three bare words: 'I am so alone'.",
          "'I am so alone', the speaker is sad.",
          "The speaker is really, really sad!!!",
        ],
        answerIndex: 1,
        explanation:
          "Your sentence introduces the quote and frames its meaning — quote, meet analysis. That's what embedding means.",
        misconceptions: [
          "Quote-dropping: two sentences standing side by side with none of your interpretation gluing them.",
          "Correct — introduced by your sentence, framed by your reading.",
          "That's a comma splice — two statements jammed together with only a comma.",
          "Exclamation marks aren't analysis — and the actual quoted words have vanished.",
        ],
      },
      {
        question: "You paraphrase an article in your own words and forget to cite it. Is that plagiarism?",
        options: [
          "Yes — the ideas still belong to their source, even when the words are yours",
          "No — new words make it new work",
          "No — only copied sentences count",
          "Only if the source is a book",
        ],
        answerIndex: 0,
        explanation:
          "Plagiarism covers borrowed IDEAS as well as borrowed words. A paraphrase without acknowledgement presents someone's thinking as yours — cite paraphrases too.",
        misconceptions: [
          "Correct — rewording changes the surface, not the ownership; the citation is still owed.",
          "Fresh wording changes the surface only — the underlying ideas were borrowed.",
          "Copied quotes are just the obvious case; uncited paraphrase is the one examiners catch most.",
          "The source type is irrelevant — articles, websites, videos and interviews all count.",
        ],
      },
      {
        question: "The text says: 'Almost half of the students walked to school.' Which quotation copies it ACCURATELY?",
        options: [
          "'Half of the students walked to school.'",
          "'Almost half of the students walked to school.'",
          "'Most students walked to school.'",
          "'Half of the students walked, which is almost everyone.'",
        ],
        answerIndex: 1,
        explanation:
          "Accuracy means word for word — including the qualifier 'Almost', which changes what the claim actually says. Dropping it is the sneakiest quotation error there is.",
        misconceptions: [
          "Dropping 'Almost' makes a vaguer claim sound exact — accuracy lives in qualifiers.",
          "Correct — every word, capital and qualifier reproduced exactly.",
          "That's a paraphrase pretending to be a quote — 'most' is not what the source said.",
          "A quotation may not contain your interpretation — only the source's words.",
        ],
      },
    ],
    worksheet: [
      {
        kind: "fill-blank",
        prompt: "A version of a text that is much shorter and gives only the main points is a ______. (Type summary or paraphrase.)",
        answer: "summary",
      },
      {
        kind: "fill-blank",
        prompt: "Rewriting an author's idea in your own words at a similar length is called ______. (Type summarising or paraphrasing.)",
        answer: "paraphrasing",
      },
      {
        kind: "practice",
        prompt:
          "An accurate quotation copies the source exactly. The source sentence is 'Almost half of the students walked to school'. How many words must appear inside your quotation marks? Count them. (Type the number.)",
        answer: "8",
        hint: "Count every word, including 'Almost' and 'of'.",
      },
      {
        kind: "match",
        prompt: "Match each task to the right tool!",
        left: [
          "A 15-word gist of a three-page report",
          "An exact sentence copied inside quotation marks, with the author named",
          "One paragraph rewritten in your own words, keeping every idea",
          "A list naming every source you used",
        ],
        right: ["paraphrase", "summary", "citation list (bibliography)", "quotation"],
        answer: [1, 3, 0, 2],
      },
      {
        kind: "short-answer",
        prompt:
          "Paraphrase this in your own words — change BOTH vocabulary and structure, and keep the meaning: 'Social media can amplify small disagreements into public arguments.'",
        sampleAnswer:
          "A minor online spat can grow into a big, visible row once social media gets involved.",
      },
      {
        kind: "writing",
        prompt:
          "Summarise this passage in no more than 20 words: 'Last spring, Greenfield High's eco-club launched a campaign to cut lunchtime waste. Students designed posters, weighed bins each Friday, and persuaded the canteen to switch to reusable cutlery. Within two months, food waste fell by a third, and the council asked the club to present its method to other schools across the district.'",
        sampleAnswer:
          "Greenfield High's eco-club cut lunchtime food waste by a third through posters, bin-monitoring and reusable cutlery.",
      },
    ],
    challenge: {
      prompt:
        "Repair a botched paraphrase. Original: 'Although the experiment failed twice, Dr Okafor says the third attempt produced results her team had never expected.' Flawed version: 'The experiment always fails, and the team expected nothing.' Write an accurate paraphrase, then name the TWO distortions the flawed version makes.",
      hint: "Find the meaning parts first: two failures, a third attempt, unexpected results, who said it. Which of those did the flawed version lose, change or invent?",
      steps: [
        "List the four meaning parts of the original (two failures; a third attempt; surprising results; Dr Okafor's account).",
        "Audit the flawed version against the list: what did it invent ('always'), and what did it erase (the success AND the surprise)?",
        "Rebuild: change structure and vocabulary while keeping all four parts.",
        "Check the tone: 'Although' signals a contrast — your version must keep that turn.",
        "Compare your sentence with the original clause by clause to confirm it isn't synonym roulette.",
      ],
      answer:
        "Accurate paraphrase: 'After two failed attempts, Dr Okafor's third try brought results that stunned her team.' Distortion 1: 'always fails' invents a permanent pattern out of two failures. Distortion 2: 'expected nothing' erases both the success of the third attempt and the team's surprise at it.",
      answerWhy:
        "The repair keeps all four meaning parts — the two failures, the third attempt, the unexpected results and the named researcher — while changing structure and vocabulary. Paraphrasing is a fidelity test: compress or reword all you like, but every part of the meaning must survive, and nothing may be added.",
    },
  },

  // -------------------------------------------------------------------------
  // 6. Speak and Listen: Presentations and Discussion
  // -------------------------------------------------------------------------
  {
    id: "english-teen-6",
    title: "Speak and Listen: Presentations and Discussion",
    emoji: "🎤",
    minutes: 18,
    intro:
      "Sooner or later you'll stand up and talk — assessment, interview, debate — and someone will grade how you handle the replies. The good news: presenting is a skill with parts, and every single part can be practised.",
    sections: [
      {
        heading: "Build the Talk: A Three-Part Shape",
        body:
          "Every strong talk runs the same shape. OPENING: a hook (question, statistic, anecdote or bold claim) plus a roadmap of your two or three main points. BODY: one point at a time, each with an example — remember your audience can't re-read you, so simpler sentences and more signposts than writing. ENDING: a conclusion that answers 'so what?' and lands a final line you've rehearsed. Ten seconds of planning the shape beats two minutes of extra facts.",
        example:
          "Opening: 'Hold up your phone. Four hours a day — that's the average teenager's screen time. I'll show you one small change our school could make: first what the research says, then what we can do.'",
        tip: "Write your final sentence FIRST — then build a talk that earns it.",
      },
      {
        heading: "Signposting: Give Listeners Handles",
        body:
          "Listeners can't rewind, so hand them handles: spoken transitions that announce the structure. 'First…', 'That brings me to my second point…', 'So what does this mean for us?', 'Finally, and most importantly…'. Signposts do three jobs — they tell the audience where they are, they tell them where they're going, and they buy YOU a second to think. A talk without signposts is a hallway with no doors; even brilliant content gets lost in it.",
        example: "'So far, the problem. Now the fix — and this is the part you can use tonight.' One sentence, and every listener snaps back to attention.",
        tip: "Plan one signpost per section minimum — say them slower than the rest.",
      },
      {
        heading: "Voice: Pace, Pause, Projection",
        body:
          "Nerves speed you up and shrink your voice — so train the antidotes. PACE: aim for roughly 130 words a minute, slower than feels natural (your nerves lie to you about speed). PAUSE: silence after a key point sounds like confidence and gives listeners time to absorb — and a planned pause is the cure for 'um'. PROJECTION: volume comes from breath support, not shouting — speak to the back wall. Vary your pitch so key words stand out, and practise OUT LOUD at least twice: silent reading rehearses nothing.",
        example: "'The results were clear. (pause) One third less waste, in eight weeks.' The pause turns a statistic into a moment.",
        tip: "Mark pauses on your cue cards like punctuation — then honour them.",
      },
      {
        heading: "Active Listening and Respectful Disagreement",
        body:
          "Discussion assessments score your listening as hard as your talking. Active listening means responding to what was ACTUALLY said — building on it ('Adding to that…'), probing it ('Could you say more about how that would work?'), or challenging it with reasons. Disagree with ideas, never people: 'I see why you'd say that, but the data suggests the opposite — can I show you?' lands better AND scores better than 'That's wrong'. If you're put on the spot, buy time: 'That's a fair question — let me think for a second.'",
        example:
          "Weak: silence, or 'whatever you think'. Strong: 'I take your point that it's expensive — but over five years the energy savings cover it. Shall I show the figures?'",
        tip: "One sentence of acknowledgement before any disagreement — it costs nothing and buys everything.",
      },
      {
        heading: "Discussion: Build, Don't Bulldoze",
        body:
          "Top discussion groups have a rhythm: BUILD (extend someone's idea), CHALLENGE (question or counter it with reasons), PROBE (ask the question nobody's asked), SUMMARISE (every so often, say where the group has got to: 'So we agree on X, but Y is still open'). Bulldozers talk longest and win nothing — examiners reward the student who makes the GROUP think better. And when someone disagrees with you, treat it as a gift: rebut the point, not the person, and you've just demonstrated the hardest skill on the mark scheme.",
        example:
          "Summarising move: 'So we agree phones distract, but we're split on banning versus phone-parking. Should we look at schools that tried each?'",
        tip: "Aim to say one thing that changes the group's thinking — not five things.",
      },
    ],
    vocab: [
      { word: "signpost", meaning: "A spoken phrase that guides listeners through the structure of a talk: 'First…', 'To sum up…'." },
      { word: "discourse marker", meaning: "A word that organises speech and signals direction — 'so', 'anyway', 'actually', 'in fact'." },
      { word: "projection", meaning: "Speaking loudly enough for the whole room by supporting your voice with breath, not strain." },
      { word: "articulation", meaning: "Saying words clearly and precisely so every syllable survives the back row." },
      { word: "rebuttal", meaning: "A reasoned response that disagrees with an argument — aimed at the point, not the person." },
      { word: "stance", meaning: "Your clear position on the topic, stated and defended throughout a talk or discussion." },
    ],
    funFact:
      "Warren Buffett, one of the world's most successful investors, says a public-speaking course he took as a young man changed his life — he still displays its certificate in his office and has claimed that sharpening your communication skills can raise your professional value by 50%.",
    quiz: [
      {
        question: "The best opening of a presentation…",
        options: [
          "Hooks attention and previews the main points",
          "Lists all your sources in full",
          "Apologises in case the talk is boring",
          "Hides your strongest point as a surprise for the end",
        ],
        answerIndex: 0,
        explanation:
          "A hook earns attention; a roadmap tells listeners where you're going. Audiences follow talks they can map — and you always know what comes next, which calms nerves.",
        misconceptions: [
          "Yes — hook, stance, roadmap: that's an opening that earns the next five minutes.",
          "Sources belong at the end or in writing — the opening's only job is to earn attention.",
          "Apologies lower expectations and your own confidence — start strong instead.",
          "Surprise endings lose audiences; the roadmap makes them follow, and the journey stays interesting.",
        ],
      },
      {
        question: "Which line is a signpost?",
        options: [
          "'So what does this mean for us? Let's look at two answers.'",
          "'Um… so… yeah, anyway.'",
          "'This is a graph.'",
          "'Sorry, I've lost my place.'",
        ],
        answerIndex: 0,
        explanation:
          "It signals a move (from problem to answers) and tells listeners exactly what's coming. That's signposting: structure made audible.",
        misconceptions: [
          "Correct — it announces the shift and gives the audience something to hold on to.",
          "Filler is the noise signposts replace — it guides nobody anywhere.",
          "Naming a visual isn't guiding — say WHY it's there and what to notice.",
          "An apology is a stall, not a direction — your signposts are what rescue you.",
        ],
      },
      {
        question: "You're rushing, and every other word is 'um'. What helps most?",
        options: [
          "Plan pauses at signposts and slow the pace — breathe where the punctuation goes",
          "Speed up so there's less time for 'um'",
          "Say 'um' more confidently",
          "Memorise the talk word for word",
        ],
        answerIndex: 0,
        explanation:
          "Deliberate pauses replace fillers, slow you to a listenable pace, and buy thinking time. Nerves speed you up — the pause is the brake that fixes both problems at once.",
        misconceptions: [
          "Exactly — the pause is the tool that does the job 'um' pretends to do.",
          "Rushing makes fillers worse and loses the audience even faster.",
          "A confident 'um' is still an 'um' — silence sounds far more assured.",
          "Word-for-word memory cracks under pressure; knowing your signposts survives it.",
        ],
      },
      {
        question: "A classmate claims something you think is wrong. For a discussion assessment, the strongest response is…",
        options: [
          "'I see why you'd say that, but the data suggests the opposite — can I show you?'",
          "'That's just wrong.'",
          "'Fine, whatever you think.'",
          "Say nothing and wait for someone else",
        ],
        answerIndex: 0,
        explanation:
          "Acknowledge, then disagree with reasons: it engages the argument, models respect, and demonstrates exactly the skill the mark scheme rewards.",
        misconceptions: [
          "Yes — courteous, confident, and backed by reasoning: disagreement done properly.",
          "Blunt dismissal attacks without engaging — the tone costs you the listening marks.",
          "Abandoning your stance to keep the peace forfeits your contribution marks.",
          "Silence is absence — assessments reward contributing, including respectful challenge.",
        ],
      },
      {
        question: "In a group discussion, ACTIVE listening looks like…",
        options: [
          "Responding to what was actually said — building on it or probing it",
          "Rehearsing your next line while the other person speaks",
          "Nodding along while thinking about lunch",
          "Interrupting quickly with your better idea",
        ],
        answerIndex: 0,
        explanation:
          "Active listening shows itself in responses that clearly grew from the other person's point — extend it, question it, or counter it. Anything else is performing attention.",
        misconceptions: [
          "Correct — your next contribution should be recognisably built on theirs.",
          "Rehearsing means you'll answer the point you EXPECTED, not the one they made — examiners spot it instantly.",
          "Nodding without processing collapses the moment it's your turn to respond.",
          "Interruption breaks respect — engage the point fully once it lands instead.",
        ],
      },
    ],
    worksheet: [
      {
        kind: "fill-blank",
        prompt:
          "A phrase that guides listeners through a talk, like 'First…' or 'To sum up…', is called a ______. (Type signpost or statistic.)",
        answer: "signpost",
      },
      {
        kind: "practice",
        prompt:
          "A clear talking pace is roughly 130 words per minute. About how many words should a 2-minute talk be? (Type the number.)",
        answer: "260",
        hint: "130 words each minute, twice over.",
      },
      {
        kind: "fill-blank",
        prompt: "A polite, reasoned response that disagrees with an argument is a ______. (Type rebuttal or rehearsal.)",
        answer: "rebuttal",
      },
      {
        kind: "match",
        prompt: "Match each discussion phrase to the job it does!",
        left: [
          "First, let's look at the problem.",
          "Adding to Amara's point…",
          "I take your point, however…",
          "So, to sum up…",
        ],
        right: ["summarising the discussion", "building on someone's idea", "signposting the first point", "respectful disagreement"],
        answer: [2, 1, 3, 0],
      },
      {
        kind: "short-answer",
        prompt:
          "Your talk's next point is about recycling. Write ONE signpost sentence a listener would instantly recognise as a signpost.",
        sampleAnswer: "That brings me to my second point: what actually happens to our recycling.",
      },
      {
        kind: "writing",
        prompt:
          "Write a 3-4 sentence introduction to a talk titled 'One Small Change Our School Could Make'. Include a hook, your stance, and a preview of your two main points.",
        sampleAnswer:
          "Look at the clock — most of us will spend four hours staring at a screen today. I believe our school could make one small change with a big payoff: a five-minute phone park at the start of lessons. First, I'll show you what the research says about attention, and then what our own survey found.",
        minWords: 45,
      },
    ],
    challenge: {
      prompt:
        "Build a 60-second presentation opening on any school topic you care about. It must contain: a hook (question, statistic or anecdote), one clear sentence of stance, a two-point roadmap using signpost language, and a marked pause. Write it out (about 120-130 words), then rehearse it aloud with a timer and adjust the pace.",
      hint: "Hook earns the ears, stance sets the direction, roadmap keeps everyone aboard — and the pause is where you breathe and they think.",
      steps: [
        "Choose your hook type — question, statistic or anecdote — and draft it in one punchy sentence.",
        "State your stance in exactly one sentence: what you believe and why it matters.",
        "Roadmap it: 'First… then…' with your two main points in signpost language.",
        "Mark a planned pause with a slash after your strongest line.",
        "Time it aloud: aim for 55-65 seconds at ~130 words a minute; trim until it fits, then rehearse twice more.",
      ],
      answer:
        "Example script: 'Hold up your phone. (pause) Four hours — that's the average time a teenager spends looking at this screen every day. / Today I'm going to show you one small change our school could make, and why it matters. First, what the research says about attention and learning. Then, what we can actually do about it — starting tomorrow.' Roughly 60 words: 30 seconds of opening, timed and paced, with the pause after the hook landing the statistic.",
      answerWhy:
        "The script contains every structural element examiners reward — hook, stance, signposted roadmap, planned pause — and at a 130-words-a-minute pace it fits its slot without rushing. Just as importantly, a speaker who knows their roadmap never wonders what comes next, which is the deepest cure for stage nerves.",
    },
  },
];
