// Reading — Intermediate (ages 12-13)
// The dedicated Reading subject: real, complete reading passages followed by
// post-reading comprehension work. Six lessons: inference, theme, summarising
// non-fiction, comparing texts, word choice & tone, fact vs opinion vs claim.
// strategyLab is intentionally omitted for Reading.
import type { Lesson } from "./types";

export const lessons: Lesson[] = [
  // -------------------------------------------------------------------------
  // 1. Inference Detective: Reading Between the Lines
  // -------------------------------------------------------------------------
  {
    id: "reading-intermediate-1",
    title: "Inference Detective: Reading Between the Lines",
    emoji: "🕵️",
    minutes: 13,
    intro:
      "Good readers are detectives. The story tells you what happened; the clues tell you what it MEANS. Learn the evidence-plus-logic habit and the hidden layer of any text opens up.",
    sections: [
      {
        heading: "What an Inference Actually Is",
        body:
          "An inference is a conclusion you build from two ingredients: EVIDENCE (words you can point to in the text) plus LOGIC (your own reasoning). It is not a wild guess and it is not a fact stated in the text. It is the sensible bridge between the two. If a writer says a character 'arrived twenty minutes early in a blazer two sizes too big', the text never says the family is short of money — but a careful reader can infer it.",
        example:
          "Text says: 'She folded the 94% test into her bag without showing anyone.' Evidence + logic → inference: she is private about her success, or success may not win her approval here.",
        tip: "An inference is an argument: every claim you make needs a clue you can quote.",
      },
      {
        heading: "The Detective's Habit: Quote, Then Question",
        body:
          "Train one habit: every time a detail surprises you, (1) QUOTE it — put your finger on the exact words, (2) QUESTION it — why would the writer include this?, (3) CONNECT it — what does it join up with elsewhere? One clue alone is thin; three clues pointing the same way are a case. Writers do not include details by accident: a peeled label, a slow bus, a Saturday job — each one is doing a job.",
        example:
          "Clue A: sandwich from a multi-pack. Clue B: bottle label peeled off. Clue C: flat, light trip envelope. Each is small. Together they suggest money is tight — more strongly than any one clue could.",
        tip: "Ask of every clue: what is the SIMPLEST explanation that fits ALL the clues?",
      },
      {
        heading: "The Passage · I — 'The Late Bus'",
        body:
          "Zara joined Willowbrook High in October, three weeks after term began. On her first morning she arrived at 7:40 — twenty minutes before anyone needed to be there — and stood by the gate reading the noticeboard until a teacher unlocked the doors.",
        tip: "Parts are numbered (I-VII) so you can cite evidence like a detective: 'Part I says...'.",
      },
      {
        heading: "The Passage · II",
        body:
          "She never ordered the meal deal. Everyone else queued for pizza or the pasta pot; Zara always had a sandwich wrapped in greaseproof paper, the kind that comes in multi-packs at the supermarket, and a bottle of water with the label peeled off. When the form collected envelopes for the school trip, hers went in last, flat and light.",
      },
      {
        heading: "The Passage · III",
        body:
          "Her blazer was two sizes too big, the sleeves rolled twice at the cuff, and by November she still wore the same thin trainers, gone grey with rain. But her planner was immaculate. Every homework sat in neat columns; every page was dated. When Mr Osei handed back her science test with 94% at the top, she folded it into her bag without showing anyone.",
      },
      {
        heading: "The Passage · IV",
        body:
          "Tomás, who sat one desk across, noticed things. He noticed that Zara stayed in the library until it closed, then caught the 4:45 bus — the one that took an hour instead of twenty minutes. He noticed she worked Saturday mornings at her aunt's shop, because he had seen her stacking shelves while his mum shopped there. He noticed that when the class talked about the ski trip, she laughed along and then changed the subject.",
      },
      {
        heading: "The Passage · V",
        body:
          "So Tomás never mentioned the ski trip to her directly. When Mr Osei announced partners for the next experiment, Tomás asked to work with Zara, and he turned the library table into 'theirs'. On the last day of term he said, casually, that his brother had outgrown his ski jacket, and that spare kit always sold for almost nothing at the school swap shop.",
      },
      {
        heading: "The Passage · VI",
        body:
          "'Right,' said Zara, eyes on her neat columns. 'That's useful to know.'",
      },
      {
        heading: "The Passage · VII",
        body:
          "And she smiled — quickly, before she could stop it — the first real smile Tomás had seen from her all term.",
        tip: "Final beats carry weight: writers end on the detail they most want to linger.",
      },
      {
        heading: "Worked Example: From Clues to Case",
        body:
          "Claim: 'Money is probably tight in Zara's family, and she keeps it private.' Evidence: the multi-pack sandwich (II), the flat and light envelope (II), the oversized blazer and worn trainers (III). Logic: three independent details all fit one explanation; none fits the rival explanation ('she prefers her own food') as well. That is a strong inference — not certain, but the best-supported reading of the clues.",
        example:
          "A WEAK inference would be 'Zara doesn't like pizza' — it fits one clue but ignores the rest. Strong inferences explain the most clues with the least strain.",
      },
    ],
    vocab: [
      { word: "inference", meaning: "A conclusion you build from text evidence plus your own reasoning — not stated, but supported." },
      { word: "evidence", meaning: "Words you can point to (and quote) in the text that back up your reading." },
      { word: "conclude", meaning: "To settle on the best-supported explanation after weighing the clues." },
      { word: "clue", meaning: "Any detail the writer includes on purpose — a word, an action, an object." },
      { word: "motive", meaning: "A character's hidden reason for acting; often what inference questions are really about." },
    ],
    funFact:
      "The word 'inference' comes from the Latin inferre, meaning 'to carry in' — you carry the clues inward and build the conclusion yourself.",
    challenge: {
      prompt:
        "Rank the THREE strongest pieces of evidence that money is tight in Zara's family, best first. For each, say in one sentence why it counts as evidence — and why your top choice beats the others.",
      hint:
        "The strongest evidence is the detail that is hardest to explain any other way. Quote the exact words from the numbered parts.",
      steps: [
        "Shortlist every money-flavoured detail from Parts II–IV: sandwich, label, envelope, blazer, trainers, Saturday job.",
        "Test each one: could it be explained by taste or habit instead? Cross out any clue with an easy rival explanation.",
        "Rank what's left: the flat, light trip envelope is hard to explain any other way; the peeled label is private by design.",
        "Write your ranking as three sentences, each quoting the part number and the words.",
        "Finish with one sentence on WHY your top clue wins: it points at money directly, while others only fit.",
      ],
      answer:
        "Example ranking — 1) 'hers went in last, flat and light' (Part II): a donation envelope's weight is a direct signal of what is inside; 2) 'a sandwich... the kind that comes in multi-packs at the supermarket' with 'the label peeled off' (Part II): cheaper food, and privacy about it; 3) 'the same thin trainers, gone grey with rain' (Part III): months without replacement. The envelope wins because it is the hardest to explain any other way.",
      answerWhy:
        "Inference questions reward evidence that is both DIRECT and DIFFICULT to explain otherwise. Taste could explain a sandwich; pride could explain a hidden test score — but a flat, light contribution envelope points straight at constrained money, which is why it makes the strongest case.",
    },
    quiz: [
      {
        question:
          "Why does Zara always have a supermarket sandwich and a bottle with the label peeled off? (Best inference)",
        options: [
          "She is fussy about cafeteria food.",
          "Money is probably tight at home, and she quietly avoids drawing attention to it.",
          "She doesn't like queuing with her classmates.",
          "The cafeteria food is unhealthy.",
        ],
        answerIndex: 1,
        explanation:
          "Strategy: stack the clues. Multi-pack sandwich + peeled label + flat, light envelope + worn trainers all point one direction. The label detail adds privacy — she doesn't just have less to spend, she manages what people see.",
        misconceptions: [
          "Taste could explain one sandwich — but it can't explain the envelope, the trainers and the Saturday job stacking up together.",
          "Yes! No single clue proves it, but four independent details fit this explanation best.",
          "Nothing in the text suggests she minds the queue — the clues are about what she brings, not where she stands.",
          "The narrator never criticises the cafeteria food; this is a detail about Zara, not a review.",
        ],
      },
      {
        question:
          "Which quoted detail is the STRONGEST evidence that Zara takes pride and care in her work?",
        options: [
          "'she arrived at 7:40 — twenty minutes before anyone needed to be there'",
          "'Every homework sat in neat columns; every page was dated.'",
          "'she laughed along and then changed the subject'",
          "'a bottle of water with the label peeled off'",
        ],
        answerIndex: 1,
        explanation:
          "Strategy: match the evidence to the exact claim. The claim is about pride and care in WORK — the immaculate planner is the only clue that is about her work itself. The other clues point to other things (punctuality, privacy, money).",
        misconceptions: [
          "That clue suggests responsibility or an early start — but it isn't about the quality of her work.",
          "Correct! Neat columns and dated pages are directly about how she handles her work.",
          "That clue is about the ski trip — it shows self-protection, not pride in work.",
          "That clue connects to money and privacy, not to her work.",
        ],
      },
      {
        question:
          "In Part V, why does Tomás mention the swap shop 'casually'?",
        options: [
          "He is showing off that his family can afford ski kit.",
          "He wants Zara to owe him a favour.",
          "He has forgotten that he saw her at the shop.",
          "He wants to help her join the trip without making her situation obvious.",
        ],
        answerIndex: 3,
        explanation:
          "Strategy: read a character's ACTIONS for motive. Everything Tomás does is low-key: partner request, shared table, a 'casual' mention. The word 'casually' is the writer's signal — help offered so quietly it protects dignity.",
        misconceptions: [
          "Showing off would mean drawing attention to money — the opposite of how Tomás behaves.",
          "Nothing in the text points to favours or debts; his kindness expects nothing back.",
          "Part IV says he noticed her at the shop; forgetting is not what the word 'casually' signals.",
          "Yes! 'Casually' is the clue: deliberate help delivered so it can't embarrass anyone.",
        ],
      },
      {
        question: "Which statement about the story is an INFERENCE, not a fact stated in the text?",
        options: [
          "Zara joined Willowbrook High in October.",
          "Zara scored 94% on her science test.",
          "Money is probably tight in Zara's family.",
          "Zara works Saturday mornings at her aunt's shop.",
        ],
        answerIndex: 2,
        explanation:
          "Strategy: a FACT is written in the text and can be pointed at; an INFERENCE is built from clues. Three options are stated word-for-word (Parts I, III, IV). Only 'money is probably tight' requires you to reason — the word 'probably' is the giveaway.",
        misconceptions: [
          "Part I states this directly — a fact.",
          "Part III states the score directly — a fact.",
          "Correct! The text never says this; you built it from the sandwich, the envelope and the trainers.",
          "Part IV states the Saturday job directly (Tomás saw her there) — a fact.",
        ],
      },
      {
        question:
          "What is the best inference about the final line: 'she smiled — quickly, before she could stop it'?",
        options: [
          "She is embarrassed because Tomás is funny-looking.",
          "She isn't used to receiving quiet kindness, and it moved her before she could hide it.",
          "She has decided to buy the ski jacket immediately.",
          "She is smiling at the thought of the holidays.",
        ],
        answerIndex: 1,
        explanation:
          "Strategy: end lines are engineered. 'Before she could stop it' tells you the smile escaped a habit of hiding feelings — so the kindness reached someone who isn't used to it. That reading uses the exact words; the others ignore them.",
        misconceptions: [
          "Nothing describes Tomás's looks — the line is about the smile escaping, not about him.",
          "Yes! The escaped smile plus a term of guarded behaviour adds up to someone moved by unexpected kindness.",
          "The jacket is a possibility she notes — the line is about her reaction, not a purchase plan.",
          "There is no mention of holidays in the final beats; stay with the words on the page.",
        ],
      },
    ],
    worksheet: [
      {
        kind: "fill-blank",
        prompt:
          "A ______ is something stated in the text that you can check by pointing at the words. (Type one word.)",
        answer: "fact",
        hint: "The opposite of an inference.",
      },
      {
        kind: "fill-blank",
        prompt:
          "An ______ is a conclusion you build by combining text evidence with your own logic. (Type one word.)",
        answer: "inference",
        hint: "It starts with 'in' — you carry the clues inward.",
      },
      {
        kind: "fill-blank",
        prompt:
          "Zara arrived ______ minutes early on her first morning. (Type the number.)",
        answer: "20",
        hint: "Part I: 7:40, twenty minutes before anyone needed to be there.",
      },
      {
        kind: "match",
        prompt:
          "Match each clue from 'The Late Bus' to the inference it best supports.",
        left: [
          "a sandwich 'the kind that comes in multi-packs at the supermarket'",
          "'Every homework sat in neat columns; every page was dated.'",
          "he mentioned the swap shop 'casually'",
          "'stayed in the library until it closed, then caught the 4:45 bus'",
        ],
        right: [
          "She takes pride and control in her work.",
          "Money may be tight, and she keeps it private.",
          "He wants to help without embarrassing her.",
          "Her after-school time is shaped by duty or distance.",
        ],
        answer: [1, 0, 2, 3],
      },
      {
        kind: "short-answer",
        prompt:
          "Why do you think Zara folded her 94% test into her bag without showing anyone? Give your inference, then quote the clue you relied on.",
        sampleAnswer:
          "She seems very private about her achievements — maybe success doesn't get celebrated at home, or she doesn't want to stand out. My clue: 'she folded it into her bag without showing anyone' (Part III) — a celebration would look completely different.",
      },
      {
        kind: "writing",
        prompt:
          "The story never says 'Zara is poor' or 'Tomás is kind' — we infer both. Write 2–3 sentences about ANOTHER inference you can make from the story. Name the clue you used (quote up to eight words) and explain your logic.",
        sampleAnswer:
          "I infer that Zara misses or needs more time with her family, because she stays at school until the library closes and then takes the slow 4:45 bus home (Part IV). If home were close and easy, she would have less reason to build her whole afternoon around school. The clues suggest her days are stretched by duty and distance.",
        minWords: 20,
      },
    ],
  },

  // -------------------------------------------------------------------------
  // 2. Theme: The Message Under the Story
  // -------------------------------------------------------------------------
  {
    id: "reading-intermediate-2",
    title: "Theme: The Message Under the Story",
    emoji: "🎯",
    minutes: 13,
    intro:
      "A story is an iceberg. The plot floats on top — robots, matches, trophies. The theme is the shape underneath: what the whole story says about life. Learn to tell topic, moral and theme apart.",
    sections: [
      {
        heading: "Topic vs Moral vs Theme",
        body:
          "The TOPIC is what the story is literally about — you can name it in a phrase ('a robotics competition'). The MORAL is a rule it teaches ('practise in real conditions'). The THEME is bigger and softer: a full sentence about people and life that the ENTIRE story supports ('real success grows out of studying failure'). A theme must fit the beginning, the middle and the end — not just the last line.",
        example:
          "Story: a club's robot fails in bright light because they only tested in dim rooms. Topic: a robotics final. Moral: test under real conditions. Theme: setbacks become lessons when you examine them honestly.",
        tip: "Theme = a full sentence about life. If you can answer it with 'yes' or a single noun, it isn't a theme yet.",
      },
      {
        heading: "How Writers Hide the Theme (On Purpose)",
        body:
          "Strong writers almost never announce the theme. Instead they: repeat a pattern (three failures, then a change), give a character a line that tips the meaning ('The robot didn't get worse. The world did.'), and choose what to show LAST — the final image is usually the theme in disguise. Your job is to collect these signals and phrase the theme yourself.",
        example:
          "A character keeps a photo of a failure instead of the trophy. That choice IS the theme, shown not told: the failure mattered more than the win.",
        tip: "Ask: what does the main character KNOW at the end that they didn't know at the start? That gap is usually the theme.",
      },
      {
        heading: "The Passage · I — 'The Robot That Froze'",
        body:
          "The line-following robot had a name: Sherlock. For six weeks, the Ravenswood Robotics Club — Kai, Amara, Priya and their mentor, Ms Devi — had built him from a kit, a breadboard and stubborn optimism. Sherlock could follow a black line, dodge a foam block, and beep a jaunty tune when he finished. Or he could, at least, in Kai's kitchen, at two in the afternoon, with the curtains half open.",
      },
      {
        heading: "The Passage · II",
        body:
          "At the regional finals, Sherlock's arena was a sports hall with skylights, and the lights were on, and the sun was out. Sherlock rolled off the starting ramp, veered left where the line curved right, and parked himself, contentedly, against a chair leg. The timer ran out. The crowd clapped politely. Amara laughed — a short, surprised laugh — and then pressed her sleeve against her eyes.",
      },
      {
        heading: "The Passage · III",
        body:
          "On the bus home nobody talked. Kai replayed it in his head: every practice run had happened in soft daylight; the cheap infrared sensors they had used were fooled by strong sun. They had never tested under hall lighting, because finals day was the only day they had ever been in a hall. Priya said it first: 'We tested in exactly one condition. We got lucky it never mattered — until it did.'",
      },
      {
        heading: "The Passage · IV",
        body:
          "Ms Devi let the silence sit, then asked one question: 'What did today cost you, and what did it buy?' The club met the following Tuesday. They bought a cheap desk lamp and a blackout cloth and rebuilt the course under different light, then on different floor surfaces, then on a wobbly table. They wrote a one-page list titled 'Everything That Can Go Wrong'; by spring it ran to three pages.",
      },
      {
        heading: "The Passage · V",
        body:
          "When the next competition came, Sherlock finished third — and when a rookie team's robot froze during the finals, it was Priya who leaned over the barrier and said, 'Check what changed. The robot didn't get worse. The world did.'",
      },
      {
        heading: "The Passage · VI",
        body:
          "Two years later, Kai was coaching a Year 7 team. On his clipboard, under their names, he kept the photo of Sherlock parked against the chair leg. Not the trophy photo. The chair leg.",
        tip: "The last image is the theme wearing a disguise. Why keep THAT photo?",
      },
      {
        heading: "Worked Example: Testing a Theme Sentence",
        body:
          "Candidate theme: 'Real success grows out of studying failure.' Test it against the WHOLE story: the comfortable kitchen practices (I) — fits, false confidence sets up the fall. The freeze (II) — fits, the failure happens. The bus conversation and the growing list (III–IV) — fits, the failure is studied. The coaching photo (VI) — fits, the lesson is carried forward. A theme that fits every part survives; one that only fits the ending is probably a moral or a summary instead.",
        example:
          "Tempting but too small: 'Check your sensors.' That's the moral of ROBOTICS. The theme is about people: how growth actually happens.",
      },
    ],
    vocab: [
      { word: "theme", meaning: "The message about life the whole story supports — usually a full sentence, never directly announced." },
      { word: "topic", meaning: "What the story is literally about, nameable in a phrase: robots, a race, a move to a new city." },
      { word: "moral", meaning: "A practical rule a story teaches ('look before you leap') — narrower than a theme." },
      { word: "implied", meaning: "Suggested rather than stated; themes are almost always implied." },
      { word: "resilience", meaning: "The ability to recover from setbacks — a common theme in stories about failure." },
    ],
    funFact:
      "Aesop's fables — among the oldest theme machines in the world — are over 2,500 years old, and we are still arguing about what 'The Tortoise and the Hare' really means.",
    challenge: {
      prompt:
        "A classmate claims the theme is 'Never give up'. Write ONE sentence arguing against that reading using a specific detail from the story, then write the better theme sentence you would offer instead.",
      hint:
        "Did the club just try HARDER at the same thing — or did they change something about HOW they prepared?",
      steps: [
        "Re-read Part IV: what did the club actually do differently after the failure? (New lamp, blackout cloth, new surfaces, a list of failure modes.)",
        "Notice: they didn't simply retry the same routine — they attacked their own blind spots.",
        "Write your counter-argument: 'Never give up' implies sheer persistence, but the story's turning point is a CHANGE OF METHOD.",
        "Draft the replacement theme so it fits Parts I–VI: something like 'Real growth comes from studying failure, not just surviving it.'",
        "Test your sentence against every part of the story before committing to it.",
      ],
      answer:
        "Against 'Never give up': the club didn't win by repeating the same effort — the turning point (Part IV) was rebuilding the course under different light and surfaces and listing failure modes, which is a change of THINKING, not just of effort. Better theme: 'Real growth comes from honestly studying your failures, not from simply trying again.'",
      answerWhy:
        "'Never give up' fits the ending but ignores the middle, where the story shows preparation being redesigned. A theme must be supported by the WHOLE text — and this story is less about persistence than about the quality of attention paid to what went wrong.",
    },
    quiz: [
      {
        question: "Which pair correctly names the story's TOPIC and one of its THEMES?",
        options: [
          "Topic: a robotics competition. Theme: real success grows out of studying failure.",
          "Topic: failure teaches lessons. Theme: Sherlock the robot.",
          "Topic: Kai's kitchen. Theme: sports halls have skylights.",
          "Topic: the Ravenswood club. Theme: robots are unreliable.",
        ],
        answerIndex: 0,
        explanation:
          "Strategy: topic = a phrase about the surface events; theme = a full sentence about life the WHOLE story supports. Only option 1 gets both right — and its theme survives testing against every part of the story.",
        misconceptions: [
          "Correct! 'A robotics competition' is the surface; the sentence about growth is the message underneath.",
          "These are swapped — 'Sherlock the robot' is a character (surface), and 'failure teaches lessons' is closer to a theme.",
          "'Kai's kitchen' is a setting detail, and the skylights are one clue — neither is the message about life.",
          "'Robots are unreliable' is too literal — the story is about people learning, not about robot quality.",
        ],
      },
      {
        question: "Which sentence best states the THEME of the whole story?",
        options: [
          "Robots often break at the worst moment.",
          "Winning is the only thing that matters.",
          "Real growth comes from honestly studying failure.",
          "Infrared sensors are fooled by sunlight.",
        ],
        answerIndex: 2,
        explanation:
          "Strategy: test each candidate against beginning, middle AND end. Only 'growth from studied failure' fits the cosy practice runs, the freeze, the redesigned testing and the kept photo. The others are either a plot detail, a contradiction, or a sensor fact.",
        misconceptions: [
          "That's a plot event, not a message about life.",
          "The story argues the opposite — the club treasures the failure more than the trophy.",
          "Correct! It is about people and change, and it fits every part of the story.",
          "That's a technical fact from the plot — useful, but it isn't what the story says about life.",
        ],
      },
      {
        question:
          "Why does Kai keep the photo of Sherlock against the chair leg instead of the trophy photo?",
        options: [
          "He lost the trophy photo.",
          "He is embarrassed about winning only third place.",
          "The chair-leg photo is funnier, so it motivates the Year 7 team.",
          "The failure taught him more than the trophy did, and that lesson is what he wants to pass on.",
        ],
        answerIndex: 3,
        explanation:
          "Strategy: choices reveal values. The final beat (Part VI) is the theme shown, not told — he coaches with the image of the failure because that is where the real lesson lives.",
        misconceptions: [
          "The text never mentions a lost photo — inventing backstory is guessing, not inferring.",
          "Embarrassment doesn't fit: he chooses to SHOW the failure to new students.",
          "Humour isn't in the text; the tone at the end is reflective, not jokey.",
          "Yes! The choice of photo is the writer's last word on what mattered.",
        ],
      },
      {
        question: "Which detail BEST supports the theme you chose?",
        options: [
          "'The crowd clapped politely.'",
          "'We tested in exactly one condition. We got lucky it never mattered — until it did.'",
          "'The line-following robot had a name: Sherlock.'",
          "'Sherlock rolled off the starting ramp.'",
        ],
        answerIndex: 1,
        explanation:
          "Strategy: the best support is the line where the story EXPLAINS its own logic. Priya's line names the exact gap between confidence and reality — the engine of the theme.",
        misconceptions: [
          "Polite clapping sets the scene of the defeat but doesn't carry the message.",
          "Correct! This line turns the plot event into an insight about preparation and luck.",
          "The robot's name is colour — charming, but it teaches nothing.",
          "That's the action of the failure, not the meaning of it.",
        ],
      },
      {
        question: "A theme must be...",
        options: [
          "stated in the story's final line.",
          "a full sentence about life that the whole story supports.",
          "the same as the story's title.",
          "only about the main character's feelings.",
        ],
        answerIndex: 1,
        explanation:
          "Strategy: the definition question. A theme is a complete idea about life or people, supported across the WHOLE text — usually implied, rarely announced.",
        misconceptions: [
          "Some stories never state their theme — the final image often implies it instead.",
          "Yes! One full sentence, supported start to finish.",
          "Titles sometimes hint at the theme, but many titles are puns or red herrings.",
          "Themes reach beyond one character to what the story says about people in general.",
        ],
      },
    ],
    worksheet: [
      {
        kind: "fill-blank",
        prompt:
          "The ______ of a story is what it is literally about (e.g. a robotics competition); the theme is the message underneath. (Type one word.)",
        answer: "topic",
        hint: "It rhymes with 'optic' — it's what you SEE on the surface.",
      },
      {
        kind: "fill-blank",
        prompt:
          "A theme is usually a full ______ about life, not a single word. (Type one word.)",
        answer: "sentence",
        hint: "Think grammar: subject + verb.",
      },
      {
        kind: "fill-blank",
        prompt:
          "By spring, the club's list titled 'Everything That Can Go Wrong' ran to how many pages? (Type the number.)",
        answer: "3",
        hint: "Part IV: it started as one page.",
      },
      {
        kind: "match",
        prompt: "Match each story detail to the theme-supporting idea it carries.",
        left: [
          "Sherlock freezes in the sunlit hall",
          "The club rebuilds the course under different lights and surfaces",
          "Priya leans over the barrier to help the rookie team",
          "Kai keeps the chair-leg photo, not the trophy photo",
        ],
        right: [
          "Setbacks become lessons when you study them.",
          "Hard-won knowledge is worth more than a win.",
          "One blind spot can undo good work.",
          "Learning from failure means you can teach others.",
        ],
        answer: [2, 0, 3, 1],
      },
      {
        kind: "short-answer",
        prompt:
          "State the theme of 'The Robot That Froze' in ONE full sentence of your own, then name the one detail (quote up to eight words) that convinced you.",
        sampleAnswer:
          "Theme: genuine growth begins the moment you examine your failures honestly instead of hiding from them. The detail that convinced me: 'We tested in exactly one condition. We got lucky it never mattered — until it did' (Part III) — the whole story turns on that insight.",
      },
      {
        kind: "writing",
        prompt:
          "Think of a time something went wrong for you — in school, sport, code, a game, anything. Write 3–4 sentences: what happened, and what THEME would the story of that day teach? Write the theme as a full sentence about life.",
        sampleAnswer:
          "I entered a chess tournament having only ever played my cousin, and I lost my first three games to openings I had never seen. The story of that day would carry the theme that practising against easy opponents can build false confidence, and that real improvement begins when you seek out the opponents who show you what you don't know.",
        minWords: 20,
      },
    ],
  },

  // -------------------------------------------------------------------------
  // 3. Summarising Non-Fiction
  // -------------------------------------------------------------------------
  {
    id: "reading-intermediate-3",
    title: "Summarising Non-Fiction",
    emoji: "🌊",
    minutes: 14,
    intro:
      "A great summary is a compressed file of a text: main idea plus only the key details, nothing else. Learn the compression habit — then prove it on a real informational text about a noisy ocean.",
    sections: [
      {
        heading: "The Anatomy of a Summary",
        body:
          "A summary has two parts: the MAIN IDEA (what the whole text is about, in one sentence) and the KEY DETAILS (the evidence that makes the main idea believable — usually two to four of them). Everything else is cut: examples that merely entertain, background you already knew, numbers that aren't doing important work. If a detail could be deleted without the main idea collapsing, it isn't key.",
        example:
          "Main idea: 'Human noise is harming ocean animals that rely on sound — and it is fixable.' Key details: noise masks whale calls; a 2001 shipping pause lowered whale stress hormones; slower ships and rerouted lanes help.",
        tip: "The deletion test: cut the detail in your head. If the main idea still stands, leave it out of the summary.",
      },
      {
        heading: "The Three Ways Summaries Go Wrong",
        body:
          "TOO NARROW: it reports one detail as if it were the point ('Whales sing to each other'). TOO BROAD: it is so vague it could fit hundreds of texts ('The ocean has problems'). MISSING A KEY POINT: it picks real details but leaves out the one the whole text is built around. The fix is always the same: find the sentence that, if you deleted it, the text would stop making sense — that's your main idea.",
        example:
          "Too narrow: 'Ships make noise.' Too broad: 'The sea is important.' Missing the key point: 'Whales communicate with sound' — true, but it ignores what humans are doing to that sound.",
        tip: "Your summary should FAIL if you swap it with a summary of a different text. If it fits any text, it's too broad.",
      },
      {
        heading: "The Passage · 1 — 'The Ocean Is Getting Louder'",
        body:
          "Underwater, sound is king. Light fades quickly in the ocean — below about 200 metres there is little of it left — so many sea animals effectively 'see' with their ears. Sound also travels more than four times faster in water than in air, which makes it the best long-distance signal nature offers. Blue whales, the largest animals that have ever lived, produce low, booming calls that can carry across enormous distances. Dolphins click and whistle to hunt and to hold the pod together. A whale that cannot hear is, in a real sense, a whale that is lost.",
      },
      {
        heading: "The Passage · 2",
        body:
          "For millions of years this sound world was quiet except for storms and earthquakes. Then came the engines. Thousands of cargo ships now drag propellers through the sea at all hours, and those propellers produce a deep, constant rumble that spreads for kilometres. The rumble sits in the same low-frequency range as many whale calls. Scientists call the effect 'masking': it is like trying to follow a conversation with a concert next door. Whales respond by calling louder, repeating themselves, or falling silent — all of which burn energy that should be spent finding food.",
      },
      {
        heading: "The Passage · 3",
        body:
          "The clearest evidence of what noise does came by accident. After 11 September 2001, shipping paused, and the waters of the Bay of Fundy in Canada suddenly quietened. Researchers studying North Atlantic right whales found that stress-related hormones in the whales' droppings fell to the lowest levels in years. The lesson was hard to ignore: quieter seas, calmer whales.",
      },
      {
        heading: "The Passage · 4",
        body:
          "The good news is that ocean noise is one of the easiest pollutants to fix, because when the noise stops, it stops. Ports in Canada and elsewhere have asked ships to slow down in whale waters; slower propellers churn far less, and measured noise drops sharply. Shipping lanes can be nudged away from feeding grounds, and new propeller designs reduce cavitation — the bubble-bursting effect behind most of the rumble.",
      },
      {
        heading: "The Passage · 5",
        body:
          "The ocean will never be silent, and it does not need to be. Storms will crash, whales will sing, and ships will still sail. But between the noise a whale makes and the noise we make, only one of us can choose to turn the volume down.",
        tip: "Notice the text's own signposts: 'The good news is...' often marks a key point.",
      },
      {
        heading: "Worked Example: Building the Summary Live",
        body:
          "Step 1 — main idea: 'Human-made noise is disrupting ocean animals that depend on sound, but simple changes can quiet the seas.' Step 2 — key details worth keeping: (a) noise masks whale calls, costing energy; (b) the 2001 Bay of Fundy finding — less shipping, lower whale stress hormones; (c) fixes exist: slower ships, rerouted lanes, quieter propellers. Step 3 — what we cut: the 200-metre light fact (background), the dolphin clicks (example, not central), the final image (style, not information).",
        example:
          "Full model summary (two sentences): 'Human noise from ships masks the sounds whales and dolphins need to survive, and it measurably stresses them. Because the noise stops when ships slow down or move, simple changes can quickly make the seas quieter.'",
      },
    ],
    vocab: [
      { word: "main idea", meaning: "The one sentence the whole text is built to deliver — everything else supports it." },
      { word: "key detail", meaning: "A fact that makes the main idea convincing; delete it and the argument weakens." },
      { word: "summary", meaning: "A short restatement of main idea + key details, in your own words, with no opinions added." },
      { word: "decibel", meaning: "The unit for measuring how loud a sound is." },
      { word: "masking", meaning: "Here: human noise covering animal calls, like a concert drowning out a conversation." },
    ],
    funFact:
      "Sound travels about 4.4 times faster in seawater (roughly 1,480 metres per second) than it does in air — one reason the ocean is a world built on sound.",
    challenge: {
      prompt:
        "Write a summary of the passage in EXACTLY 15 words. Then cross out your weakest word and explain in one sentence why the summary still works without it.",
      hint:
        "Count the main idea first (about 10 words), then spend the remaining words on the single strongest key detail.",
      steps: [
        "Write your main idea in about ten words: human noise masks whale sounds, but fixes exist.",
        "Add the strongest key detail in about five words — the 2001 finding or the slow-ships fix.",
        "Count every word; adjust until you land on exactly 15.",
        "Cross out one word that adds nothing (often an adjective like 'very').",
        "Justify the cut: the sentence means the same thing, so the word was decoration, not information.",
      ],
      answer:
        "Example (15 words): 'Ship noise masks whale calls and stresses ocean animals, but slower ships can quickly quiet seas.' Cut example: remove 'quickly' — the main idea and key detail survive, so the word was emphasis, not information.",
      answerWhy:
        "Summarising is compression under pressure. A word-count limit forces the deletion test on every word, which is exactly the skill: keep the main idea and the load-bearing details, drop everything decorative.",
    },
    quiz: [
      {
        question: "What is the MAIN IDEA of the passage?",
        options: [
          "Whales and dolphins make many different sounds.",
          "Human noise is disrupting ocean animals that depend on sound — and simple changes can fix it.",
          "The ocean is full of problems that cannot be solved.",
          "Sound travels faster in water than in air.",
        ],
        answerIndex: 1,
        explanation:
          "Strategy: a main idea must cover the WHOLE text — the problem AND the fix. Option 1 and 4 are supporting details; option 3 is too broad and contradicts Paragraph 4, which is all about solvability.",
        misconceptions: [
          "That's Paragraph 1's opening example — a detail, not the destination.",
          "Correct! It captures the problem, the animals affected, and the fix the text spends Paragraph 4 on.",
          "Too broad — and the text argues the opposite of hopeless: 'one of the easiest pollutants to fix'.",
          "A true supporting detail, but it only sets up the argument; it isn't the point.",
        ],
      },
      {
        question:
          "Which detail is the KEY evidence that noise really affects whales — not just a nice extra?",
        options: [
          "The Bay of Fundy finding that whale stress hormones dropped when shipping paused.",
          "The fact that light fades below 200 metres.",
          "The description of storms and earthquakes.",
          "The sentence that ships 'will still sail'.",
        ],
        answerIndex: 0,
        explanation:
          "Strategy: apply the deletion test. Remove the Bay of Fundy paragraph and the text's biggest claim — that noise measurably harms whales — loses its strongest proof. The other options are background or style.",
        misconceptions: [
          "Correct! It is the passage's only direct biological evidence linking noise to harm.",
          "That's background science — it explains why sound matters, but it proves nothing about harm.",
          "Atmosphere, not evidence.",
          "A closing image — rhetorical style, not proof.",
        ],
      },
      {
        question: "Which is the BEST one-sentence summary of the passage?",
        options: [
          "Whales use sound.",
          "The ocean has many problems.",
          "Human noise from ships masks whale calls and stresses ocean animals, but slowing ships and rerouting lanes can quiet the seas.",
          "In 2001, shipping stopped for a while in Canada.",
        ],
        answerIndex: 2,
        explanation:
          "Strategy: a best-summary option must be neither too narrow, nor too broad, nor missing a key point. Option 3 carries the problem, the harm, AND the fix — the full shape of the text.",
        misconceptions: [
          "Too narrow: one detail presented as the whole point.",
          "Too broad: it could headline a thousand different texts.",
          "Correct! Main idea plus key details, in order.",
          "Too narrow: one factual moment, and it omits both the harm and the fix.",
        ],
      },
      {
        question: "Which detail does NOT belong in a summary of this passage?",
        options: [
          "The finding that quieter seas meant lower whale stress hormones.",
          "The fact that noise 'masks' whale calls, costing whales energy.",
          "The fact that light fades below about 200 metres.",
          "The point that slower ships and rerouted lanes reduce noise.",
        ],
        answerIndex: 2,
        explanation:
          "Strategy: summaries keep load-bearing details. The 200-metre fact is background that explains why sound matters — interesting, but the argument still stands without it.",
        misconceptions: [
          "Keep it — it is the key evidence of harm.",
          "Keep it — it names the central problem.",
          "Correct! Background detail: helpful context, not a key point.",
          "Keep it — the fix is half of the main idea.",
        ],
      },
      {
        question: "As used in Paragraph 2, 'masking' means...",
        options: [
          "painting ships a special colour to protect whales.",
          "covering animal calls with human noise, like a concert drowning out a conversation.",
          "whales hiding from ships on the seabed.",
          "a type of diving mask used by researchers.",
        ],
        answerIndex: 1,
        explanation:
          "Strategy: use the text's own definition — the writer supplies the simile 'like trying to follow a conversation with a concert next door'. Vocab-in-context questions are answered by the surrounding sentence, not by memory.",
        misconceptions: [
          "No ships are being painted — the word describes sound, not paint.",
          "Yes! The next-door-concert simile is the definition hiding in plain sight.",
          "Hiding is tempting because of the word 'mask', but the paragraph is about SOUND covering SOUND.",
          "The context gives the meaning; a real-world look-alike word is a trap.",
        ],
      },
    ],
    worksheet: [
      {
        kind: "fill-blank",
        prompt:
          "A summary states the main idea plus only the ______ details. (Type one word.)",
        answer: "key",
        hint: "The details that carry weight — delete them and the text collapses.",
      },
      {
        kind: "fill-blank",
        prompt:
          "Sound travels about four times faster in ______ than in air. (Type one word.)",
        answer: "water",
        hint: "Paragraph 1 of the passage.",
      },
      {
        kind: "fill-blank",
        prompt:
          "The 2001 shipping pause happened in the Bay of ______. (Type one word.)",
        answer: "Fundy",
        hint: "It's in Canada — Paragraph 3.",
      },
      {
        kind: "match",
        prompt: "Match each item to whether it belongs in a summary of the passage.",
        left: [
          "The main idea, stated in one sentence",
          "The description of storms and earthquakes",
          "The Bay of Fundy stress-hormone finding",
          "The exact depth at which light fades",
        ],
        right: [
          "Belongs — key supporting evidence",
          "Leave out — background detail",
          "Belongs — it IS the summary",
          "Leave out — atmosphere, not information",
        ],
        answer: [2, 3, 0, 1],
      },
      {
        kind: "short-answer",
        prompt:
          "Write a two-sentence summary of the passage: sentence 1 = the main idea; sentence 2 = the two most important supporting details.",
        sampleAnswer:
          "Human noise from ships masks the sounds whales and dolphins depend on and measurably stresses them. Evidence shows the harm directly — whale stress hormones dropped when shipping paused in 2001 — and slowing ships or moving lanes can quickly quiet the seas.",
      },
      {
        kind: "writing",
        prompt:
          "Summarising is a life skill. Pick a film, book, match or game you know well and write a 2–3 sentence summary: main idea first, then only the details that carry weight. No spoilers about the ending unless they ARE the point.",
        sampleAnswer:
          "Our team's season was built on defence: we conceded the fewest goals in the league. The key details are that our goalkeeper was a converted midfielder, and that we practised pressing drills twice a week — everything else, like the weather or the kit colours, doesn't change what the season was about.",
        minWords: 20,
      },
    ],
  },

  // -------------------------------------------------------------------------
  // 4. Comparing Two Texts
  // -------------------------------------------------------------------------
  {
    id: "reading-intermediate-4",
    title: "Comparing Two Texts",
    emoji: "⚖️",
    minutes: 13,
    intro:
      "Real readers rarely meet just one voice. News, reviews, arguments — texts argue with each other all the time. Learn to map where two writers agree, where they clash, and HOW each one builds their case.",
    sections: [
      {
        heading: "The Three-Way Map: Agree · Clash · Method",
        body:
          "When you compare two texts on one topic, track three things. (1) AGREE: the beliefs or facts they share — the overlap zone. (2) CLASH: where they draw opposite conclusions from similar facts. (3) METHOD: the kind of evidence each leans on — science, personal experience, numbers, stories. Two writers can agree on every fact and still disagree on what to DO, because they weigh the costs differently.",
        example:
          "Two writers agree that teenagers need more sleep. One calls for later school bells; the other says the bell isn't the problem. Same fact, opposite fixes — the disagreement lives in the solution, not the fact.",
        tip: "Draw two overlapping circles and label the overlap 'BOTH'. Comparison questions live in the overlap and the gap.",
      },
      {
        heading: "Spot the Kind of Evidence",
        body:
          "Ask of each text: is this writer using RESEARCH (studies, experts), LOGIC (if-this-then-that reasoning), EXPERIENCE ('in my classroom...'), or VALUES (what matters most)? A sleep scientist will quote biology; a coach will quote timetables and bus routes. Neither is automatically wrong — but knowing the evidence type tells you what each argument is strong at, and what it never addresses.",
        example:
          "'Melatonin shifts later in adolescence' is research evidence. 'Our training already ends at 5:15' is experience evidence. A full picture needs both.",
        tip: "The fastest comparison question to answer: 'What KIND of evidence is each writer using?'",
      },
      {
        heading: "Text A · 'Later Bells, Sharper Minds' — by Dr Lena Okafor, sleep researcher",
        body:
          "Here is an inconvenient biological fact: most teenagers' body clocks run late. During adolescence the brain's release of melatonin — the hormone that makes us sleepy — shifts to later in the evening, so asking a thirteen-year-old to be sharp at 8:00 a.m. is like asking an adult to start work at 5:00. The evidence agrees with the biology: when schools move their start times later, studies report longer sleep, better attendance and, in several cases, improved grades. Sleep experts, including the American Academy of Pediatrics, have urged secondary schools to start no earlier than 8:30 a.m. Will later bells solve everything? No. But a change that costs a timetable adjustment and returns rested, punctual, more teachable students is not a luxury. I have spent ten years measuring sleep in laboratories, and every morning I see the result on the bus: twenty children doing their best work while jet-lagged. We could simply let their clocks catch up.",
      },
      {
        heading: "Text B · 'Hold the Late Bell' — by Marcus Hale, PE teacher and rugby coach",
        body:
          "Dr Okafor is right that teenagers need more sleep — nobody in a staffroom disagrees. But a later bell is the wrong fix, and our school day proves it. Push the start back thirty minutes and every after-school club, match and bus route slides later with it. Last year our Year 8 training sessions already ended at 5:15; a later start would push them into the dark. Families feel it too: later finishes mean later dinners, later homework, and younger siblings waiting around. And here is what nobody mentions: the students who drift in late at 8:30 will drift in late at 9:00. Sleep debt is not cured by moving it around the timetable. There are better tools: homework set in sensible amounts, phones out of bedrooms at night, and form tutors who actually ask why someone looks exhausted. Change the habits around sleep and you help every hour of the day. Move the bell, and you simply reschedule the problem — and hand the invoice to sport.",
        tip: "Text B opens by naming what it AGREES with — a classic comparison signal.",
      },
      {
        heading: "Worked Example: Mapping the Two Texts",
        body:
          "AGREE: teenagers need more sleep; the current system leaves many of them exhausted. CLASH: Text A says move the school start later; Text B says the knock-on effects (clubs in the dark, late dinners) make it the wrong fix and habits should change instead. METHOD: Text A leans on research — melatonin, studies, the AAP recommendation, plus the writer's lab experience. Text B leans on school logistics — training times, buses, family routines. Each argument is strongest exactly where the other is quietest.",
        example:
          "Exam-style move: to answer 'How do the writers differ?', name the SHARED ground first, then the disagreement. 'Both agree teens need sleep, but Okafor blames the clock and Hale blames the timetable around it.'",
      },
    ],
    vocab: [
      { word: "compare", meaning: "To examine what two texts SHARE as well as how they differ." },
      { word: "contrast", meaning: "To focus on the differences — where two texts clash or diverge." },
      { word: "viewpoint", meaning: "A writer's position on the topic — the 'side' their text takes." },
      { word: "evidence", meaning: "What a writer offers as support: research, logic, experience or values." },
      { word: "purpose", meaning: "What a writer wants to DO to the reader: inform, persuade, warn, reassure." },
    ],
    funFact:
      "In 2014, the American Academy of Pediatrics officially urged secondary schools to start no earlier than 8:30 a.m. — because of exactly the teenage body-clock shift described in Text A.",
    challenge: {
      prompt:
        "Dr Okafor and Mr Hale meet on live radio. Write the ONE question you would ask EACH writer to expose the weakest point of their argument — then say, in a sentence each, why that point is vulnerable.",
      hint:
        "Look for what each writer claims but never fully supports. Okafor says later bells cost 'a timetable adjustment'; Hale says late students will be late anyway.",
      steps: [
        "Re-scan Text A for claims presented without evidence — especially about costs and knock-on effects.",
        "Re-scan Text B for claims presented without evidence — especially the prediction about lateness.",
        "Write Okafor's question: e.g. 'Who pays for the later buses and shorter club sessions — and why does your argument call that only a timetable adjustment?'",
        "Write Hale's question: e.g. 'Do you have any evidence that students who are late at 8:30 stay late at 9:00, or is that an assumption?'",
        "Add one sentence per question naming the vulnerable spot: unsupported claim vs unsourced prediction.",
      ],
      answer:
        "For Okafor: 'Later bells push clubs, buses and family routines later — why does your column describe all of that as merely a timetable adjustment?' Her argument quantifies the benefits but hand-waves the costs. For Hale: 'What evidence do you have that late arrivals at 8:30 would still be late at 9:00?' His central claim is a prediction with no data behind it.",
      answerWhy:
        "The strongest comparison move is not picking a winner — it is locating what each writer asserts without support. Every argument has a quiet corner; good readers bring a torch.",
    },
    quiz: [
      {
        question: "On which point do BOTH writers agree?",
        options: [
          "Teenagers need more sleep than they are currently getting.",
          "Later school bells solve everything.",
          "Schools should never change their timetables.",
          "Rugby is the most important after-school activity.",
        ],
        answerIndex: 0,
        explanation:
          "Strategy: find the overlap zone. Text B opens by conceding exactly this — 'nobody in a staffroom disagrees'. The disagreement starts with the FIX, not the fact.",
        misconceptions: [
          "Yes — Text A argues it from science and Text B concedes it from experience.",
          "Text B explicitly rejects this; and 'solve everything' is too strong even for Text A.",
          "Text A's whole column is a timetable-change proposal.",
          "Rugby never appears; Text B mentions training only as an example of knock-on effects.",
        ],
      },
      {
        question: "What is the biggest point of DISAGREEMENT between the two texts?",
        options: [
          "Whether teenagers sleep enough at the moment.",
          "Whether moving the school start time later is the right solution.",
          "Whether melatonin exists.",
          "Whether after-school clubs exist.",
        ],
        answerIndex: 1,
        explanation:
          "Strategy: separate shared facts from disputed solutions. Both accept the sleep problem; Text A prescribes a later bell, Text B calls that rescheduling the problem and targets habits instead.",
        misconceptions: [
          "They agree the current situation is bad — that's the overlap, not the clash.",
          "Correct! One blames the clock and wants the bell moved; the other blames the surrounding schedule and wants habits changed.",
          "Nobody disputes the biology — Text B never challenges the science, only the solution.",
          "Text B's whole case rests on clubs and buses existing; no disagreement there.",
        ],
      },
      {
        question: "How does Dr Okafor mainly try to persuade her reader?",
        options: [
          "By insulting teachers who disagree with her.",
          "By telling funny stories about buses.",
          "By citing sleep science, studies and her own ten years of lab work.",
          "By threatening to close the school.",
        ],
        answerIndex: 2,
        explanation:
          "Strategy: name the evidence type. Text A is built on research evidence — biology (melatonin), studies of schools that changed, an expert body's recommendation, and the writer's professional credibility.",
        misconceptions: [
          "No insults appear — that would be a different (and weaker) method.",
          "The bus appears once, as an observation, not as the persuasive engine.",
          "Correct! Research plus professional experience is Text A's backbone.",
          "Nothing of the sort — the column is persuasive, not coercive.",
        ],
      },
      {
        question: "Which line from Text B is an OPINION rather than a checkable fact?",
        options: [
          "'Last year our Year 8 training sessions already ended at 5:15.'",
          "'a later bell is the wrong fix'",
          "'later finishes mean later dinners'",
          "'nobody in a staffroom disagrees'",
        ],
        answerIndex: 1,
        explanation:
          "Strategy: a fact can be checked against a record; an opinion is a judgement. A training end-time is verifiable. 'The wrong fix' is an evaluation — it could be argued, not looked up.",
        misconceptions: [
          "That's a time on a school record — checkable, so a fact.",
          "Correct! 'Wrong' is a judgement call dressed as a conclusion.",
          "This is a general claim about cause and effect — closer to reasoning than to pure opinion, and it describes mechanisms rather than judging them.",
          "This is a (debatable) factual claim about what people think — Text B presents it as an observation.",
        ],
      },
      {
        question: "Which sentence correctly describes what each text is BUILT on?",
        options: [
          "Text A is built on sleep science; Text B is built on daily school logistics.",
          "Text A is built on sports results; Text B is built on sleep labs.",
          "Both are built on rumours.",
          "Text A is built on bus timetables; Text B is built on hormones.",
        ],
        answerIndex: 0,
        explanation:
          "Strategy: match each writer to their evidence source. Okafor = laboratories, studies, expert guidance. Hale = training times, buses, dinners, siblings. The evidence sources ARE the comparison.",
        misconceptions: [
          "Yes — and noticing this lets you predict each writer's blind spot.",
          "Swapped: the sports detail belongs to Text B, the science to Text A.",
          "Neither text relies on rumours; both use first-hand or research-based support.",
          "Swapped again — track which writer mentions which detail.",
        ],
      },
    ],
    worksheet: [
      {
        kind: "fill-blank",
        prompt:
          "A ______ question asks what two texts share; a contrast question asks how they differ. (Type one word.)",
        answer: "compare",
        hint: "The overlap zone of the two circles.",
      },
      {
        kind: "fill-blank",
        prompt:
          "Both writers agree that teenagers need more ______. (Type one word.)",
        answer: "sleep",
        hint: "Text B concedes it in its very first line.",
      },
      {
        kind: "fill-blank",
        prompt:
          "Text A names the hormone that shifts later in adolescence: ______. (Type one word.)",
        answer: "melatonin",
        hint: "It makes us sleepy — and its release moves later in the evening.",
      },
      {
        kind: "match",
        prompt: "Match each statement to where it appears: Both, Text A only, Text B only, or Neither.",
        left: [
          "Teenagers need more sleep.",
          "Melatonin is released later in the evening during adolescence.",
          "Later bells would push after-school clubs into the dark.",
          "Schools should start at 7:00 a.m.",
        ],
        right: [
          "Both writers agree",
          "Text A only",
          "Text B only",
          "Neither text says this",
        ],
        answer: [0, 1, 2, 3],
      },
      {
        kind: "short-answer",
        prompt:
          "In two sentences: name ONE thing the writers agree on, and ONE thing they disagree about.",
        sampleAnswer:
          "They agree that teenagers are not getting enough sleep and that this harms them. They disagree on the fix: Dr Okafor wants schools to start later, while Mr Hale believes later bells simply reschedule the problem and wants habits and schedules around sleep changed instead.",
      },
      {
        kind: "writing",
        prompt:
          "Who persuades YOU more — Dr Okafor or Mr Hale? Write 3–4 sentences: say which argument you find stronger and why, pointing at one piece of evidence from EACH text.",
        sampleAnswer:
          "I find Mr Hale slightly more persuasive, because his evidence is concrete: our Year 8 training already ends at 5:15, and later finishes really would squeeze families. But Dr Okafor's science is strong too — the melatonin shift and the 8:30 recommendation are hard to argue with. Hale wins for me because he takes her fact seriously and attacks only the solution, which makes his case feel fair-minded.",
        minWords: 20,
      },
    ],
  },

  // -------------------------------------------------------------------------
  // 5. Word Choice and Tone
  // -------------------------------------------------------------------------
  {
    id: "reading-intermediate-5",
    title: "Word Choice and Tone",
    emoji: "🎨",
    minutes: 13,
    intro:
      "Writers never just tell you the mood — they plant it, word by word. 'Shoved' and 'placed' describe the same action with opposite feelings. Train your ear for connotation, and tone shifts become impossible to miss.",
    sections: [
      {
        heading: "Connotation: The Word's Shadow",
        body:
          "Every word has a DENOTATION (its literal meaning) and a CONNOTATION (the feelings that shadow it). 'Thrifty', 'cheap' and 'stingy' all mean careful with money — but the shadow differs: respect, neutrality, contempt. Tone — the writer's attitude — is built almost entirely from these shadows. To analyse tone, hunt the words whose literal meaning could be swapped for a neutral one, and ask what the swap would lose.",
        example:
          "'The removal men bellowed numbers' — swap 'bellowed' for 'called' and the sentence keeps its literal meaning but loses the rough, overwhelming noise. The writer chose 'bellowed' to make you FEEL the chaos.",
        tip: "Tone analysis in one move: find the verb or adjective, swap it for the most boring synonym, and name what changed.",
      },
      {
        heading: "Following the Tone Shift",
        body:
          "Passages rarely hold one mood. Watch for the hinge — the moment, event or discovery where the word choices flip. Signals include: a change from harsh verbs to warm ones, weather or light changing, a memory appearing, and sentence rhythm shifting (short and choppy = tension; long and flowing = calm or reflection). Name the tone on BOTH sides of the hinge, then quote one word from each side as proof.",
        example:
          "'The sky hung grey and low' (heavy, resentful) → 'Late sun poured sideways... gilding the dust' (warm, open). Same sky, new tone — the writer changed, not the weather.",
        tip: "Quote both sides of the hinge. A tone-shift answer without two quoted words is just a vibe.",
      },
      {
        heading: "The Passage · I — 'Moving Day'",
        body:
          "The flat was a graveyard of boxes by noon, and I hated every one of them. I shoved my duvet into a bin bag — a bin bag — while the removal men bellowed numbers at each other on the stairs. Outside, the sky hung grey and low, like it had already given up on the day. Twelve years of my life were being sealed into cardboard and labelled 'MISC'.",
      },
      {
        heading: "The Passage · II",
        body:
          "Mum kept trying. 'Look, your new room gets the evening sun.' I grunted. The evening sun. As if light could make a strange bedroom mine.",
      },
      {
        heading: "The Passage · III",
        body:
          "Then, taping up the last box from my desk, I found it: the shoebox. Inside, my primary-school 'about me' sheet — age seven, favourite animal: all of them. A cinema stub. A photo of Grandpa on the balcony, laughing at something outside the frame, his hand frozen mid-wave. I sat down on the floor, right there among the boxes, and the flat felt suddenly, unbearably full — not of furniture, but of time.",
      },
      {
        heading: "The Passage · IV",
        body:
          "I taped that box shut and wrote on it, in careful letters: OPEN FIRST.",
      },
      {
        heading: "The Passage · V",
        body:
          "By late afternoon the sky had changed its mind. Late sun poured sideways through the bare windows, gilding the dust in the air, and the empty rooms — which had looked wounded all day — suddenly looked possible. New rooms always look like someone else's until your things argue with them. Mine would argue soon enough.",
      },
      {
        heading: "The Passage · VI",
        body:
          "The van pulled away at five, and I rode in it with my elbows on the box marked OPEN FIRST, watching my street slide past. I had lived there my whole childhood, and it took one afternoon of boxes to teach me what I should have seen on any ordinary Tuesday: that a home is not the walls. It is the shoebox. It is the people who packed it with you.",
        tip: "Compare Part I's verbs with Part V's — that contrast IS the tone shift.",
      },
      {
        heading: "The Passage · VII",
        body:
          "The van turned onto the main road. Somewhere behind me, my old flat stood empty and golden, and somewhere ahead a new room waited for the evening sun. I unzipped the bag, pulled out my duvet, and hugged it all the way there.",
      },
      {
        heading: "Worked Example: Mapping the Tone Arc",
        body:
          "Part I–II — tone: resentful, overwhelmed. Proof: 'graveyard of boxes', 'shoved', 'bellowed', 'I hated every one of them', the flat grey sky. Part III–IV — hinge: finding the shoebox; tone turns tender and reflective ('unbearably full... of time', 'careful letters'). Part V–VII — tone: hopeful, accepting. Proof: the sky 'changed its mind', 'gilding', rooms that 'looked possible', and the final image of hugging the duvet. Three tones, one arc — and every one of them is made of word choices.",
        example:
          "The metaphor 'the sky... had already given up on the day' works double duty: it describes weather AND mirrors the narrator's mood. When scenery shares the narrator's feelings, readers absorb the tone without being told.",
      },
    ],
    vocab: [
      { word: "tone", meaning: "The writer's attitude toward the subject, revealed through word choice — resentful, tender, hopeful." },
      { word: "connotation", meaning: "The feeling a word carries beyond its literal meaning: 'shoved' vs 'placed'." },
      { word: "metaphor", meaning: "Describing one thing as if it were another: 'a graveyard of boxes'." },
      { word: "mood", meaning: "The atmosphere the READER feels — related to tone, but experienced rather than expressed." },
      { word: "shift", meaning: "The hinge where a passage's tone turns — usually marked by changed words, light or memory." },
    ],
    funFact:
      "Mark Twain wrote that the difference between the almost right word and the right word is 'the difference between the lightning bug and the lightning' — one letter of difference, a storm of connotation.",
    challenge: {
      prompt:
        "Rewrite the opening two sentences of 'Moving Day' so the facts stay identical but the tone becomes CHEERFUL. Then list the exact words you swapped and what each swap did.",
      hint:
        "Keep every fact (boxes, noon, duvet, bin bag, removal men, stairs). Only the word SHADOWS may change.",
      steps: [
        "List the loaded words in the original: 'graveyard', 'hated', 'shoved', 'bellowed', 'given up'.",
        "Replace each with a same-meaning, sunnier word: 'graveyard of boxes' → 'mountain of boxes'; 'shoved' → 'tucked'; 'bellowed' → 'called'.",
        "Fix the sky line: 'like it had already given up' → something like 'like it was saving its best light for later'.",
        "Read yours aloud against the original and check: same events, opposite feelings?",
        "List each swap in a table: old word, new word, what feeling it changed.",
      ],
      answer:
        "Example: 'The flat was a mountain of boxes by noon, and I greeted every one of them. I tucked my duvet into a bin bag — a bin bag — while the removal men called numbers to each other on the stairs.' Swaps: graveyard→mountain (menace→adventure), hated→greeted (hostility→readiness), shoved→tucked (violence→care), bellowed→called (roar→clatter).",
      answerWhy:
        "The facts never moved — the same boxes were packed at the same time by the same people. Tone lives in connotation, so changing a handful of shadows flips the reader's feelings while the events stand still. That is exactly what a writer's word choice controls.",
    },
    quiz: [
      {
        question: "What is the narrator's tone at the START of the passage (Parts I–II)?",
        options: [
          "Joyful and excited",
          "Resentful and overwhelmed",
          "Calm and dreamy",
          "Frightened of the removal men",
        ],
        answerIndex: 1,
        explanation:
          "Strategy: collect the loaded words first. 'Graveyard', 'hated', 'shoved', 'bellowed', the sighing '— a bin bag —', and the sky 'giving up' all point the same direction: resentful and overwhelmed.",
        misconceptions: [
          "The words are hostile — nothing reads as joy here.",
          "Yes! The heavy verbs and the 'graveyard' metaphor build frustration on every line.",
          "Calm writing uses gentle verbs; 'shoved' and 'bellowed' are anything but.",
          "The men are loud, but the narrator is irritated, not scared — check the word 'bellowed' again.",
        ],
      },
      {
        question: "Which group of words CREATES that opening tone?",
        options: [
          "'gilding', 'possible', 'golden'",
          "'graveyard', 'shoved', 'bellowed'",
          "'careful letters', 'shoebox'",
          "'argue', 'slide past'",
        ],
        answerIndex: 1,
        explanation:
          "Strategy: tone is evidence-based — always ask WHICH words. Option 1 belongs to the hopeful ending; only option 2 is the harsh opening vocabulary.",
        misconceptions: [
          "Those are the warm ending words — right idea, wrong part of the passage.",
          "Correct! Every word carries harshness or weight.",
          "The shoebox starts the TENDER middle, not the resentful opening.",
          "'Argue' is playful (Part V) and 'slide past' is reflective — neither is the opening's register.",
        ],
      },
      {
        question: "Where does the tone SHIFT, and what does it shift to?",
        options: [
          "At the shoebox discovery — from resentful to tender and reflective.",
          "It never shifts; the mood stays angry throughout.",
          "At noon — from bored to excited.",
          "At five o'clock — from happy to furious.",
        ],
        answerIndex: 0,
        explanation:
          "Strategy: find the hinge. The shoebox (Part III) changes the vocabulary: 'unbearably full — not of furniture, but of time' is tender, and everything after moves warmer.",
        misconceptions: [
          "Correct! The memory objects flip the narrator's attention from what is lost to what is carried.",
          "Track the words: 'gilding', 'possible', 'golden' cannot coexist with sustained anger.",
          "Noon is when the opening tone is established — no flip happens there.",
          "Five o'clock is the arrival of the FINAL tone (hopeful); the shift began earlier.",
        ],
      },
      {
        question:
          "What does the simile 'the sky hung grey and low, like it had already given up on the day' add to Part I?",
        options: [
          "It proves that rain was forecast.",
          "It mirrors the narrator's mood — the world seems to share their gloom.",
          "It shows the writer knows about meteorology.",
          "It hints that the family is moving because of the weather.",
        ],
        answerIndex: 1,
        explanation:
          "Strategy: ask what the figure of speech DOES, not just what it says. Giving up is a human feeling — the writer has bent the weather to match the narrator's mood, so the gloom feels total.",
        misconceptions: [
          "A forecast would state rain; this simile states an attitude.",
          "Yes! Scenery that shares the narrator's feelings is a classic tone-builder.",
          "The writer isn't teaching science — the sky is doing an emotional job.",
          "The reason for moving is never the weather; stay with what the simile is doing.",
        ],
      },
      {
        question:
          "What does writing 'OPEN FIRST' 'in careful letters' (Part IV) reveal about the narrator's change?",
        options: [
          "They are practising their handwriting.",
          "The movers instructed them to label boxes.",
          "They have decided what matters most — the first signs of acceptance and gratitude.",
          "They plan to open the box years later as a joke.",
        ],
        answerIndex: 2,
        explanation:
          "Strategy: small actions carry big turns. 'Careful' is the opposite of 'shoved' — the same hands now moving with respect. The narrator has shifted from grieving the past to choosing what to carry forward.",
        misconceptions: [
          "Handwriting isn't the point — 'careful' signals emotional care.",
          "No instruction from the movers exists in the text; this is the narrator's own idea.",
          "Yes! The deliberate label shows the shoebox discovery has rewritten their priorities.",
          "A joke would need jokey language; 'careful letters' is the opposite register.",
        ],
      },
    ],
    worksheet: [
      {
        kind: "fill-blank",
        prompt:
          "Tone is the writer's ______ toward the subject, revealed through word choice. (Type one word.)",
        answer: "attitude",
        hint: "Think: how does the writer FEEL about what they're describing?",
      },
      {
        kind: "fill-blank",
        prompt:
          "______ is the feeling a word carries beyond its literal meaning — 'shoved' vs 'placed'. (Type one word.)",
        answer: "connotation",
        hint: "It starts with 'con-' — the word's shadow.",
      },
      {
        kind: "fill-blank",
        prompt:
          "The passage compares the flat full of boxes to a '______'. (Type one word.)",
        answer: "graveyard",
        hint: "Part I — a place associated with endings.",
      },
      {
        kind: "match",
        prompt: "Match each word from the passage to the connotation it carries.",
        left: ["shoved", "gilding", "bellowed", "possible"],
        right: [
          "warm, precious light",
          "hopeful, open future",
          "harsh, angry energy",
          "loud, rough noise",
        ],
        answer: [2, 0, 3, 1],
      },
      {
        kind: "short-answer",
        prompt:
          "Find the moment the tone shifts. Quote up to six words from the passage that mark the shift, then name the new tone in one phrase.",
        sampleAnswer:
          "The shift happens with 'Then, taping up the last box from my desk, I found it: the shoebox.' The new tone is tender and reflective — the narrator stops fighting the move and starts remembering what it holds.",
      },
      {
        kind: "writing",
        prompt:
          "Tone is a dial, not a switch. Choose ONE sentence from your own day (e.g. 'I walked to school') and write it twice: once with a grumpy tone, once with a cheerful tone. Change at least two words each time, and label your two versions.",
        sampleAnswer:
          "Grumpy: 'I trudged to school through the freezing drizzle, backpack dragging like an anchor.' Cheerful: 'I strolled to school through the sparkling drizzle, backpack bouncing like a spring.' Swapped: trudged→strolled, freezing→sparkling, dragging→bouncing. Same walk, opposite worlds.",
        minWords: 20,
      },
    ],
  },

  // -------------------------------------------------------------------------
  // 6. Fact vs Opinion vs Claim
  // -------------------------------------------------------------------------
  {
    id: "reading-intermediate-6",
    title: "Fact vs Opinion vs Claim",
    emoji: "🔍",
    minutes: 12,
    intro:
      "Before you believe anything you read — posts, ads, even homework help sites — sort it into three boxes: fact, opinion, claim. Critical reading starts with this sorting habit. Test it on a real debate about a tiny plastic object.",
    sections: [
      {
        heading: "Three Boxes, Three Tests",
        body:
          "A FACT can be checked and proved true or false ('The UK banned plastic straws in October 2020'). An OPINION expresses a personal judgement and cannot be proved or disproved ('Paper straws are a soggy tragedy'). A CLAIM is between the two: a position the writer argues FOR, which CAN be supported or attacked with evidence ('Straw bans work because they change habits, not just straws'). Claims are where thinking happens — they invite the question 'prove it'.",
        example:
          "'Americans use around 500 million straws a day' → fact (check the estimate's source). 'Soggy tragedy' → opinion. 'A straw is the first domino: refuse one small convenience and bigger ones follow' → claim — testable with evidence about what happened after straw bans.",
        tip: "Opinions often hide behind fact-shaped clothing. The test is never HOW confident it sounds — it's whether it can be checked.",
      },
      {
        heading: "The Signposts Writers Use",
        body:
          "Skilled writers label their own moves: 'Consider first what can be checked', 'I confess, the opinion:', 'here is a claim worth taking seriously'. Weaker writers blur the boxes — an opinion smuggled in as fact is called an assertion. When you read, hunt for the signposts AND for their absence: if a strong judgement arrives with no 'in my view' and no evidence, you've caught an assertion, and you should handle it with tongs.",
        example:
          "'Researchers caution it is difficult to separate the effect of bans from other changes' — that's a fact about the STATE of the evidence. Spotting this is advanced sorting: a claim carefully limited by facts.",
        tip: "Ask three questions of any sentence: Can I check it? Is it a judgement? Is it a position being argued?",
      },
      {
        heading: "The Passage · 1 — 'The First Domino'",
        body:
          "Few objects have divided a nation like the drinking straw. Consider first what can be checked. Volunteer beach-cleaning groups around the world, such as those taking part in the International Coastal Cleanup, have collected plastic straws in the millions from shorelines. The United States National Park Service has estimated that Americans alone use around 500 million straws every day. Most recycling facilities cannot handle straws — they are too light and too small — so the majority are landfilled or escape into rivers and the sea, where plastic waste can harm seabirds and turtles.",
      },
      {
        heading: "The Passage · 2",
        body:
          "Now the rules. The United Kingdom banned plastic straws, stirrers and cotton buds in October 2020, and the European Union's ban took effect in 2021. Studies of single-use plastic litter on European beaches since then report falls in several categories, although researchers caution it is difficult to separate the effect of the bans from other changes, such as reduced tourism during a pandemic.",
      },
      {
        heading: "The Passage · 3",
        body:
          "And now, I confess, the opinion: paper straws are a soggy tragedy. Anyone who has watched one dissolve halfway through a milkshake knows that paper is a poor substitute for plastic. That frustration is real — but it is an experience, not a statistic, and it belongs in the opinion box.",
      },
      {
        heading: "The Passage · 4",
        body:
          "But here is a claim worth taking seriously: banning straws is less about the straws themselves than about what the ban asks of us. A straw is a small, unnecessary convenience; if we cannot give that up, we will certainly not give up anything that costs us. Several cities that banned straws went on to restrict other single-use plastics. The straw, in other words, is a first domino.",
      },
      {
        heading: "The Passage · 5",
        body:
          "Is that argument proven? Not yet — dominoes can wobble. Sceptics fairly point out that some disabled people rely on plastic straws, and a few bans have been adjusted with medical exemptions. That is what good policy does: it listens, measures, and corrects.",
      },
      {
        heading: "The Passage · 6",
        body:
          "So keep your facts checked, your opinions owned, and your claims supported. And if your paper straw gives up before your milkshake does, remember: that frustration is an opinion, honestly held — and the landfill numbers are not.",
        tip: "Paragraph 3 shows a writer OWNING an opinion. That honesty is a sign of a text worth trusting.",
      },
      {
        heading: "Worked Example: Sorting a Tricky Sentence",
        body:
          "Sentence: 'Several cities that banned straws went on to restrict other single-use plastics.' Is it fact, opinion or claim? Test it: the events could be checked against city records, so it is fact-shaped — but in the passage it is doing CLAIM work: it is offered as evidence for the domino argument. This is the deep lesson: the same sentence can be a fact in isolation and a building block of a claim in context. Sorting is about the JOB a sentence is doing, not just its shape.",
        example:
          "'The straw is a first domino' cannot be checked like a date — it's a claim. But its supporting sentence IS checkable. Strong arguments braided fact into claim; weak ones braid opinion in and hope you don't notice.",
      },
    ],
    vocab: [
      { word: "fact", meaning: "A statement that can be checked and proved true or false." },
      { word: "opinion", meaning: "A personal judgement or feeling that cannot be proved or disproved." },
      { word: "claim", meaning: "A position a writer argues for, which CAN be supported or attacked with evidence." },
      { word: "verifiable", meaning: "Able to be checked against records, data or sources." },
      { word: "assertion", meaning: "A strong statement offered without evidence — an opinion pretending to be a fact." },
    ],
    funFact:
      "The UK's ban on plastic straws took effect in October 2020, and the European Union's equivalent rules applied from July 2021 — the UK ban included medical exemptions for people who rely on plastic straws.",
    challenge: {
      prompt:
        "The writer's domino claim: 'A straw is the first domino — refuse one small convenience and bigger refusals follow.' Design the test: name (1) the exact evidence you would gather to check it, and (2) the strongest counter-argument a sceptic would raise, in one sentence each.",
      hint:
        "The claim predicts a SEQUENCE over time (straw bans first, then other bans). What records would show that sequence?",
      steps: [
        "Restate the claim as a checkable prediction: after straw bans, restrictions on OTHER single-use plastics should follow.",
        "Name the evidence: council and government records of which single-use plastic rules came before and after straw bans, in the same cities.",
        "Name the counter-argument: the sceptic says other plastic bans were coming anyway for climate reasons, so straws caused nothing.",
        "Add the tie-breaker: compare cities that banned straws with similar cities that did not — if the domino effect is real, the first group restricts more, sooner.",
        "Conclude: what result would prove the claim, and what result would wobble it?",
      ],
      answer:
        "Evidence: policy records from cities before and after straw bans, showing whether restrictions on cups, cutlery or bags followed, ideally compared with similar cities that never banned straws. Counter-argument: other single-use plastic rules were already planned for environmental reasons, so the straw ban was a passenger, not a domino. If straw-banning cities restrict other plastics sooner than comparable cities, the claim stands; if both move together regardless, it wobbles.",
      answerWhy:
        "A claim becomes credible when you can say IN ADVANCE what evidence would support it and what would weaken it. Building that test — including the counter-argument — is the core skill of critical reading, and it works on adverts, speeches and history books alike.",
    },
    quiz: [
      {
        question: "Which sentence from the passage is a FACT — checkable against records?",
        options: [
          "'Paper straws are a soggy tragedy.'",
          "'The United Kingdom banned plastic straws... in October 2020.'",
          "'The straw, in other words, is a first domino.'",
          "'Consider first what can be checked.'",
        ],
        answerIndex: 1,
        explanation:
          "Strategy: ask 'could I check this?' A ban's date can be verified in law records — fact. The soggy verdict is a judgement; the domino is a metaphor-claim; the last is an instruction.",
        misconceptions: [
          "That's the writer's owned opinion — deliberately labelled in Paragraph 3.",
          "Correct! A date and a law: exactly the kind of sentence you can verify.",
          "A claim wrapped in a metaphor — the domino image is an argument, not a record.",
          "That's the writer telling you their method — an instruction, not a checkable event.",
        ],
      },
      {
        question: "Which sentence is an OPINION the writer openly owns?",
        options: [
          "'Most recycling facilities cannot handle straws.'",
          "'The European Union's ban took effect in 2021.'",
          "'Paper straws are a soggy tragedy.'",
          "'Some disabled people rely on plastic straws.'",
        ],
        answerIndex: 2,
        explanation:
          "Strategy: opinions express judgement, not measurement. 'Soggy tragedy' is feeling-laden language — and the writer even confesses it: 'I confess, the opinion:'.",
        misconceptions: [
          "A claim about recycling capability — checkable by asking facilities, so fact-shaped.",
          "A date — verifiable, fact.",
          "Correct! Judgement words ('soggy', 'tragedy') and the writer's own signpost give it away.",
          "A statement about people's needs — checkable, and the writer uses it fairly as a counter-argument.",
        ],
      },
      {
        question:
          "'Banning straws is less about the straws themselves than about what the ban asks of us.' This sentence is best described as...",
        options: [
          "a fact anyone can check in a book.",
          "a claim — a position the writer then supports with reasoning and evidence.",
          "a spelling mistake.",
          "a command to the reader.",
        ],
        answerIndex: 1,
        explanation:
          "Strategy: claims invite 'prove it'. The writer answers that invitation in Paragraph 4 — the domino reasoning and the cities that went further. Claim + support = argument.",
        misconceptions: [
          "No database records 'what a ban asks of us' — it's an interpretation, argued not archived.",
          "Correct! The writer calls it 'a claim worth taking seriously' and then supports it.",
          "The sentence is grammatically fine — judge the CONTENT, not your comfort with it.",
          "It proposes an idea for consideration; it doesn't instruct you to do anything.",
        ],
      },
      {
        question: "How does the writer signal that the milkshake paragraph contains OPINION?",
        options: [
          "By using statistics from the National Park Service.",
          "By writing 'I confess, the opinion:' before sharing it.",
          "By quoting a law passed in 2020.",
          "By citing beach-cleaning volunteers.",
        ],
        answerIndex: 1,
        explanation:
          "Strategy: honest writers label their moves. 'I confess' plus 'the opinion' is a signpost saying: judgement incoming, handle as opinion. Recognising signposts lets you sort sentences at speed.",
        misconceptions: [
          "Statistics appear in Paragraph 1 — they signal FACT, the opposite move.",
          "Correct! The phrase is the label; the soggy tragedy follows.",
          "The law date is fact-signalling — it anchors Paragraph 2, not the milkshake.",
          "The volunteers support the litter facts in Paragraph 1, not the paper-straw opinion.",
        ],
      },
      {
        question: "Why does the writer include the line 'Not yet — dominoes can wobble'?",
        options: [
          "To admit the claim is not fully proven and that fair counter-arguments exist.",
          "To prove the claim with more statistics.",
          "To insult the sceptics who disagree.",
          "To end the debate and move on.",
        ],
        answerIndex: 0,
        explanation:
          "Strategy: watch for intellectual honesty. The writer states the claim, then immediately limits it and gives the sceptics their fair say (medical exemptions). That is what critical reading looks like — and how you should write your own claims.",
        misconceptions: [
          "Yes! Claim, limits, counter-argument, correction — the full honest arc in one paragraph.",
          "No new statistics appear there; the line does the opposite of proving.",
          "The writer calls the sceptics 'fair' — the opposite of an insult.",
          "The paragraph keeps the debate alive by describing how good policy corrects itself.",
        ],
      },
    ],
    worksheet: [
      {
        kind: "fill-blank",
        prompt:
          "A claim is a statement that can be supported with ______ and reasoning. (Type one word.)",
        answer: "evidence",
        hint: "What you'd bring to 'prove it'.",
      },
      {
        kind: "fill-blank",
        prompt:
          "The UK banned plastic straws in October ______. (Type the year.)",
        answer: "2020",
        hint: "Paragraph 2 of the passage — a checkable fact.",
      },
      {
        kind: "fill-blank",
        prompt:
          "A strong statement offered WITHOUT evidence — an opinion dressed as fact — is called an ______. (Type one word.)",
        answer: "assertion",
        hint: "Starts with 'a' — handle with tongs.",
      },
      {
        kind: "match",
        prompt: "Match each sentence from the passage to its correct box.",
        left: [
          "'Americans... use around 500 million straws every day' (NPS estimate)",
          "'Paper straws are a soggy tragedy.'",
          "'The straw, in other words, is a first domino.'",
          "'Is that argument proven?'",
        ],
        right: [
          "A checkable fact",
          "A personal opinion",
          "A supportable claim",
          "A question",
        ],
        answer: [0, 1, 2, 3],
      },
      {
        kind: "short-answer",
        prompt:
          "Choose ONE claim from the passage (quote up to eight words) and name the kind of evidence that would best support it.",
        sampleAnswer:
          "Claim: 'The straw... is a first domino.' Best evidence: policy records from cities showing which single-use plastic bans followed their straw bans, compared with similar cities that never banned straws — that would show whether refusing one convenience really triggers bigger refusals.",
      },
      {
        kind: "writing",
        prompt:
          "Sort your own school day into the three boxes. Write one FACT about your school day, one OPINION about it, and one CLAIM about how to improve it — label each one (Fact / Opinion / Claim).",
        sampleAnswer:
          "Fact: our school day starts at 8:45. Opinion: the canteen's pasta pot is the best food in the building. Claim: if the school moved break ten minutes later, fewer students would skip breakfast, because most of the skipping happens when break lands too close to lunch.",
        minWords: 20,
      },
    ],
  },
];
