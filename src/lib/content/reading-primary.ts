// Reading — Primary (ages 9-11)
// Seven lessons: main idea, supporting details & evidence, characters & motives,
// setting & sequence, context clues, predicting & inferring, and summarising.
// Every lesson is built around a REAL, complete passage followed by strategy
// questions — read first, then think like a reading detective.
import type { Lesson } from "./types";

export const lessons: Lesson[] = [
  // -------------------------------------------------------------------------
  // 1. Finding the Main Idea
  // -------------------------------------------------------------------------
  {
    id: "reading-primary-1",
    title: "Finding the Main Idea",
    emoji: "🐝",
    minutes: 10,
    intro:
      "Every passage has one BIG point hiding among lots of little facts. Learn to spot the main idea and tell it apart from the details that support it.",
    sections: [
      {
        heading: "Main Idea vs. Details",
        body:
          "The main idea is what the whole passage is MOSTLY about — the big umbrella. The details are the smaller facts that fit underneath it and prove it. If the main idea is 'bees help our food grow', details like 'farmers rent beehives' and 'one bee visits hundreds of flowers' all hang from that umbrella.",
        example:
          "Passage about a dog park. Main idea: the dog park makes dogs and owners happier. Details: dogs fetch, owners chat, the park opened in May. See how the details support the big point?",
        tip: "Ask yourself: if I could keep only ONE sentence as the title, which would it be?",
      },
      {
        heading: "Two Tricks for Finding It",
        body:
          "Trick 1 — The Title Test: good titles are usually the main idea in a few words. Trick 2 — The Detail Check: list what each paragraph is about; when most details point the same direction, that direction is your main idea. Careful: a main idea is never just ONE tiny detail, and never so wide it covers the whole universe.",
        example:
          "Details: bees carry pollen, pollen makes seeds, fruit needs seeds. The main idea that ties them: bees pollinate plants, which makes our food possible.",
        tip: "The main idea is usually BIGGER than one detail but SMALLER than everything in the world.",
      },
      {
        heading: "The Passage: Busy Bees at Work",
        body:
          "Next time you bite into a juicy apple or a strawberry, thank a honeybee. Honeybees are small, striped insects with a very big job: they are pollinators. When a bee lands on a flower to drink sweet nectar, yellow pollen dust sticks to the fuzzy hairs on its legs. As the bee flies from flower to flower, it drops that pollen off, and this helps plants grow seeds and fruit. Without pollination, plants could not make the apples, almonds, blueberries, melons and cucumbers we love to eat. Farmers know this, so some of them even rent beehives! A truck delivers hive boxes to an orchard, and thousands of bees get to work. One bee visits hundreds of flowers in a single trip. Back at the hive, bees do the waggle dance — a figure-eight wiggle that tells other bees where the best flowers are. Scientists who study bees have found that about one out of every three bites of food we eat depends on pollinators like bees. So the next time you crunch a cucumber or spread jam on your toast, remember: a tiny, buzzing worker helped make your lunch possible.",
        tip: "Read once for enjoyment, then once more asking: what is this MOSTLY about?",
      },
    ],
    vocab: [
      { word: "main idea", meaning: "What a passage is mostly about — the big point." },
      { word: "supporting detail", meaning: "A smaller fact that proves or explains the main idea." },
      { word: "pollinator", meaning: "An animal, like a bee, that moves pollen between flowers so plants can make fruit and seeds." },
      { word: "nectar", meaning: "The sweet liquid inside flowers that bees drink." },
      { word: "orchard", meaning: "A field of fruit trees." },
    ],
    funFact:
      "One honeybee makes only about 1/12 of a teaspoon of honey in its entire life — it takes a whole team of bees to fill your jar!",
    challenge: {
      prompt:
        "One of these sentences does NOT belong in a paragraph about how bees help crops grow. Find the odd one out: (1) Bees carry pollen on the fuzzy hairs of their legs. (2) Farmers rent beehives so orchards get pollinated. (3) Honey never spoils, so archaeologists have tasted 3,000-year-old honey. (4) About one in three bites of food depends on pollinators.",
      hint: "Ask of each sentence: does it prove that bees help our food grow?",
      steps: [
        "Test sentence 1: pollen on legs → pollination → food grows. Belongs!",
        "Test sentence 2: rented hives → more pollination → food grows. Belongs!",
        "Test sentence 3: honey keeping forever is fun, but it says nothing about pollinating crops. It does NOT support the main idea.",
        "Test sentence 4: one in three bites → pollinators feed us. Belongs!",
      ],
      answer: "Sentence 3 does not belong — the 3,000-year-old honey fact.",
      answerWhy:
        "A paragraph's details must all support its main idea. The honey fact is interesting, but it is about honey storage, not about bees pollinating crops — it belongs in a different paragraph.",
    },
    quiz: [
      {
        question: "What is this passage MOSTLY about?",
        options: [
          "How bees make honey inside the hive",
          "Why trucks deliver beehives to orchards",
          "Honeybees pollinate plants, which helps much of our food grow",
          "How to catch a bee safely",
        ],
        answerIndex: 2,
        explanation:
          "Every part of the passage — pollen, flowers, fruit, rented hives, one in three bites — points to bees helping our food grow.",
        misconceptions: [
          "Honey is barely mentioned (just the waggle dance) — it is not the big point.",
          "Rented hives are ONE detail, not the whole umbrella.",
          "Yes! That's the umbrella every detail hangs from.",
          "The passage never talks about catching bees — too far off.",
        ],
      },
      {
        question: "Which detail BEST supports the main idea?",
        options: [
          "Bees are black and yellow stripes.",
          "About one in three bites of our food depends on pollinators.",
          "A truck delivered hive boxes to an orchard.",
          "Bees do a figure-eight waggle dance.",
        ],
        answerIndex: 1,
        explanation:
          "'One in three bites' directly proves how much our food depends on bee pollination — that is strong support.",
        misconceptions: [
          "True, but a stripe colour doesn't prove bees help food grow.",
          "Yes! It directly proves the main idea.",
          "Trucks are how hives travel — a small step in the story, weak support on its own.",
          "The waggle dance shows how bees share flower locations — interesting, but not the strongest proof of our food depending on them.",
        ],
      },
      {
        question: "Why does pollen stick to a bee?",
        options: [
          "The bee carries a tiny glue pot.",
          "Nectar is sticky and coats the bee.",
          "Flowers have hooks that grab the bee.",
          "The bee's legs and body are fuzzy, so pollen dust clings.",
        ],
        answerIndex: 3,
        explanation: "The passage says pollen sticks to the fuzzy hairs on a bee's legs as it drinks nectar.",
        misconceptions: [
          "Silly — bees don't carry glue.",
          "Nectar is the sweet drink; it's the fuzz that catches pollen.",
          "Flowers are gentle with their pollinators — no hooks!",
          "Right! Fuzzy hairs are nature's pollen velcro.",
        ],
      },
      {
        question: "Which question would help you find the main idea fastest?",
        options: [
          "What is the passage mostly about?",
          "How long is the passage?",
          "Which words are the longest?",
          "What year did this happen?",
        ],
        answerIndex: 0,
        explanation: "'Mostly about?' is THE main-idea question — it makes your brain look for the umbrella.",
        misconceptions: [
          "Yes! Asking 'mostly about what?' points you straight at the main idea.",
          "Length tells you nothing about the big point.",
          "Long words are vocabulary, not the main idea.",
          "Dates matter in history passages, but they don't reveal the main idea.",
        ],
      },
    ],
    worksheet: [
      {
        kind: "fill-blank",
        prompt: "The main idea is what a passage is ______ about. (Type one word.)",
        answer: "mostly",
      },
      {
        kind: "fill-blank",
        prompt: "Bees carry ______ from flower to flower, which helps plants make fruit. (Type one word.)",
        answer: "pollen",
      },
      {
        kind: "match",
        prompt: "Match each term to its meaning!",
        left: ["main idea", "supporting detail", "waggle dance"],
        right: [
          "a figure-eight wiggle that shows where flowers are",
          "what the passage is mostly about",
          "a fact that proves the main idea",
        ],
        answer: [1, 2, 0],
      },
      {
        kind: "fill-blank",
        prompt: "A bee's waggle dance tells other bees where to find the best ______. (Type one word.)",
        answer: "flowers",
      },
      {
        kind: "short-answer",
        prompt: "Name TWO foods from the passage that need bee pollination. Write them as a short list.",
        sampleAnswer: "Apples and cucumbers (the passage also lists almonds, blueberries, melons and strawberries).",
      },
      {
        kind: "writing",
        prompt:
          "Write TWO sentences about the bee passage: sentence 1 states the main idea, sentence 2 gives one supporting detail from the text.",
        sampleAnswer:
          "Honeybees pollinate plants, and that helps much of our food grow. For example, about one in every three bites of food we eat depends on pollinators like bees.",
        minWords: 14,
      },
    ],
  },

  // -------------------------------------------------------------------------
  // 2. Supporting Details and Evidence
  // -------------------------------------------------------------------------
  {
    id: "reading-primary-2",
    title: "Supporting Details and Evidence",
    emoji: "🔎",
    minutes: 10,
    intro:
      "Anyone can CLAIM something — readers ask 'prove it!'. Learn to hunt down the exact sentences that back up an idea, using a passage about record-breaking animal journeys.",
    sections: [
      {
        heading: "The 'Prove It!' Skill",
        body:
          "A claim is an idea someone says is true. Evidence is the fact, number or example from the text that proves it. Strong readers don't just agree or disagree — they point to the exact sentence: 'I believe it because the passage says…'. If you can't find support, the claim is just an opinion.",
        example:
          "Claim: 'Cheetahs are fast.' Evidence: 'A cheetah can sprint at over 100 km/h.' The second sentence does the proving.",
        tip: "Evidence usually has a NUMBER, a NAME, or a thing that happened you could check.",
      },
      {
        heading: "Detail Detective Moves",
        body:
          "Move 1: Read the claim carefully — what exactly needs proving? Move 2: Scan the passage for numbers and facts that match. Move 3: Test each fact by asking 'does this really prove the claim, or is it just nearby?'. A detail can be true and still not support the claim!",
        example:
          "Claim: 'Monarchs are mighty travellers.' Fact A: 'Monarchs have orange wings' (true, but doesn't prove it). Fact B: 'Monarchs fly up to 4,800 km to Mexico' (that proves it!).",
        tip: "Ask: would this fact convince a doubter? That's evidence.",
      },
      {
        heading: "The Passage: The Great Animal Journeys",
        body:
          "Every year, some animals make journeys that would amaze any explorer. The champion is the Arctic tern, a slim seabird that flies from the top of the world to the bottom — and back again. That is a round trip of about 70,000 kilometres every year, the longest migration of any animal on Earth. Monarch butterflies are tiny, but they are mighty travellers too. Each autumn, millions of them flutter up to 4,800 kilometres from Canada and the United States to the same few forests in Mexico — trees their great-great-grandparents left the year before. How do they find the way? Scientists believe monarchs use the position of the sun and a built-in sense of Earth's magnetic field, like carrying a compass in their bodies. In Africa, wildebeest migrate in herds of more than a million animals, crossing rivers full of hungry crocodiles to reach fresh grass. The journeys are dangerous, but they pay off: by following the rain, the herds always find food and water. Scientists track these travellers with leg bands and small GPS trackers, because knowing where animals go helps people protect the places they need along the way.",
        tip: "As you read, star the facts with numbers — they make the best evidence.",
      },
    ],
    vocab: [
      { word: "claim", meaning: "An idea stated as true, waiting to be proved." },
      { word: "evidence", meaning: "A fact or example from the text that proves a claim." },
      { word: "migration", meaning: "A long seasonal journey that animals make to find food or better weather." },
      { word: "herd", meaning: "A large group of animals that travel together." },
    ],
    funFact:
      "A tiny Arctic tern can live about 30 years. In its lifetime it flies roughly three round trips to the Moon and back!",
    challenge: {
      prompt:
        "Your friend claims: 'Monarch butterflies are incredible travellers.' Find the TWO facts in the passage that prove it, and explain why each one counts as evidence.",
      hint: "One fact is about distance, one is about accuracy — where do they land?",
      steps: [
        "Scan the monarch sentences for numbers: 'up to 4,800 kilometres' — that's fact one.",
        "Second fact: they return to 'the same few forests in Mexico' their great-great-grandparents left.",
        "Fact one proves the JOURNEY is long. Fact two proves it is astonishingly PRECISE without a map.",
        "Check: would these convince a doubter who says 'butterflies are weak'? Yes — distance and precision.",
      ],
      answer:
        "Evidence 1: monarchs fly up to 4,800 km from Canada and the US to Mexico. Evidence 2: they find the same few forests their great-great-grandparents left a year before.",
      answerWhy:
        "Evidence must support the exact claim. 'Incredible travellers' needs proof of travel skill — a huge distance AND navigating precisely to the same forests both do that. Wing colour would not.",
    },
    quiz: [
      {
        question: "What is the passage mostly about?",
        options: [
          "Why some animals sleep through winter",
          "How scientists tag birds in zoos",
          "The life cycle of a butterfly",
          "Amazing long journeys that animals make every year",
        ],
        answerIndex: 3,
        explanation:
          "Terns, monarchs and wildebeest — the whole passage is about their epic yearly journeys, called migration.",
        misconceptions: [
          "Nobody sleeps through winter here — they MOVE instead!",
          "GPS trackers appear, but only as a small part at the end.",
          "Only monarchs get life-cycle attention — the passage covers three species.",
          "Yes! Terns, monarchs and wildebeest — one theme: epic yearly journeys.",
        ],
      },
      {
        question: "Prove it: which sentence shows the Arctic tern is a champion flier?",
        options: [
          "It flies about 70,000 kilometres a year — the longest migration on Earth.",
          "It is a slim seabird with narrow wings.",
          "It lives near the top of the world.",
          "It eats fish from the ocean.",
        ],
        answerIndex: 0,
        explanation:
          "'Champion' needs proof of winning — 70,000 km a year, the longest migration on Earth, does exactly that.",
        misconceptions: [
          "Yes! The record-breaking distance proves 'champion'.",
          "Looks are true but don't prove flying skill.",
          "Where it lives says nothing about how far it flies.",
          "Diet is a fun fact — but it proves nothing about long flights.",
        ],
      },
      {
        question: "Which detail explains HOW monarchs find their way?",
        options: [
          "They follow trucks heading south.",
          "They use the sun's position and Earth's magnetic field.",
          "They memorise road maps.",
          "They ask other butterflies for directions.",
        ],
        answerIndex: 1,
        explanation:
          "The passage says scientists believe monarchs use the sun and a built-in sense of Earth's magnetic field — a body compass!",
        misconceptions: [
          "Butterflies can't keep up with trucks — that's invented.",
          "Right! Sun position plus magnetic sense is their navigation kit.",
          "Butterflies don't read maps — the compass is inside them.",
          "No butterfly GPS chatter — the guide is in the sky and the field.",
        ],
      },
      {
        question: "Why do scientists track migrating animals with bands and GPS trackers?",
        options: [
          "To race the animals against each other",
          "To teach the animals new routes",
          "To protect the places the animals need along the way",
          "To sell tickets to watch them",
        ],
        answerIndex: 2,
        explanation:
          "The last sentence says tracking shows where animals go so people can protect the places they need.",
        misconceptions: [
          "No races — scientists are measuring, not coaching.",
          "Animals follow instinct, not lessons — tracking is for people's benefit.",
          "Yes! Knowing the route means guarding the stopover places.",
          "Tracking is research, not a show.",
        ],
      },
    ],
    worksheet: [
      {
        kind: "fill-blank",
        prompt: "A ______ is an idea you want to prove; evidence is the facts that prove it. (Type one word.)",
        answer: "claim",
      },
      {
        kind: "fill-blank",
        prompt:
          "The Arctic tern migrates about ______ kilometres a year. (Type the number exactly as in the passage, with a comma.)",
        answer: "70,000",
      },
      {
        kind: "match",
        prompt: "Match each traveller to its journey!",
        left: ["Arctic tern", "monarch butterfly", "wildebeest"],
        right: [
          "flies to the same few forests in Mexico",
          "the longest migration of any animal on Earth",
          "crosses crocodile rivers in a herd of over a million",
        ],
        answer: [1, 0, 2],
      },
      {
        kind: "fill-blank",
        prompt: "Scientists follow the animals with leg bands and small GPS ______. (Type one word.)",
        answer: "trackers",
      },
      {
        kind: "short-answer",
        prompt:
          "Find one detail from the passage that proves migration can be DANGEROUS. Write it in your own words.",
        sampleAnswer:
          "Wildebeest herds must cross rivers full of hungry crocodiles to reach fresh grass, so the journey can cost lives.",
      },
      {
        kind: "writing",
        prompt:
          "Write a claim about animal migration (one sentence), then give ONE piece of evidence from the passage that proves it. Start with 'Claim:' and 'Evidence:'.",
        sampleAnswer:
          "Claim: Some animals travel unbelievable distances every year. Evidence: The Arctic tern flies about 70,000 kilometres a year — the longest migration of any animal on Earth.",
        minWords: 16,
      },
    ],
  },

  // -------------------------------------------------------------------------
  // 3. Characters: What They Do and Why
  // -------------------------------------------------------------------------
  {
    id: "reading-primary-3",
    title: "Characters: What They Do and Why",
    emoji: "🎭",
    minutes: 10,
    intro:
      "Characters rarely announce their feelings — they SHOW them. Read about Noor's big violin day and work out what her actions reveal about why she does what she does.",
    sections: [
      {
        heading: "Actions Are Clues",
        body:
          "Authors rarely write 'she was brave'. Instead, they show what a character DOES, and readers work out the feeling or motive behind it. A motive is the reason a character acts. Sweat on the hands + going on stage anyway = nervous but determined.",
        example:
          "'Diego shared his lunch without being asked.' The action shows generosity — the author never had to say the word.",
        tip: "Ask: what did the character DO, and what does that action whisper about them?",
      },
      {
        heading: "The Why-Behind the What",
        body:
          "To find a motive, trace the action backwards: Action → Feeling it might show → Reason it might make sense. Use story clues for each step, and check them against what the character says and thinks. Two readers can disagree politely — as long as both point to clues.",
        example:
          "Noor stands where everyone can see her before her performance. Action: chose the front. Feeling: brave, maybe scared-but-brave. Reason: she decided fear wouldn't stop her — her own words prove it later!",
        tip: "Quote the story in your answer: 'because the passage says…'.",
      },
      {
        heading: "The Passage: Noor's Big Day",
        body:
          "Noor had practised her violin every single day for two weeks — even when her favourite show was on. On Saturday morning she stuffed her sheet music into her backpack, but when she reached the community centre, her hands felt sweaty. About fifty chairs waited in the hall. Her cousin Kai peeked into the practice room. 'Want to practise in the storage room instead?' he offered. 'Nobody would know.' Noor looked at the floor for a long moment. Then she stood up straight, carried her violin to the stage, and chose a chair in the front row where everyone could see her. When her name was called, her knees shook — but she walked out anyway. The first notes wobbled. She took a breath, imagined her gran listening at home, and kept playing. By the last song the room was silent, and people leaned forward in their seats. Afterwards, Kai ran up. 'You looked scared,' he said. 'Why didn't you hide?' Noor laughed and hugged her violin case. 'I WAS scared,' she said. 'That's exactly why I went first. If I can play scared, then scared can't stop me.'",
        tip: "Star every action: practising daily, sweaty hands, choosing the front row. Each one is a clue.",
      },
    ],
    vocab: [
      { word: "character", meaning: "A person or animal in a story." },
      { word: "motive", meaning: "The reason a character does something." },
      { word: "determined", meaning: "Not giving up, even when something is hard or scary." },
      { word: "action", meaning: "What a character does — the clues that show feelings." },
    ],
    funFact:
      "Actors say 'the show must go on!' — the phrase comes from 1800s theatres and circuses, where performers kept performing no matter what happened backstage.",
    quiz: [
      {
        question: "Why did Noor go to the stage instead of hiding?",
        options: [
          "Kai pushed her onto the stage.",
          "She forgot where the storage room was.",
          "She wanted to prove that being scared wouldn't stop her.",
          "She wanted to win a prize for being brave.",
        ],
        answerIndex: 2,
        explanation:
          "Her own words prove it: 'That's exactly why I went first. If I can play scared, then scared can't stop me.'",
        misconceptions: [
          "Kai offered her an escape — nobody pushed her.",
          "She knew exactly where the storage room was; she chose the stage.",
          "Yes! Her words at the end state the motive directly.",
          "No prize for bravery was offered — her motive wasn't a reward.",
        ],
      },
      {
        question: "Which detail shows Noor was nervous?",
        options: [
          "She practised every day for two weeks.",
          "Her hands felt sweaty and her knees shook.",
          "She packed her sheet music.",
          "She hugged her violin case afterwards.",
        ],
        answerIndex: 1,
        explanation: "Sweaty hands and shaking knees are body clues of nervousness — classic 'show, don't tell'.",
        misconceptions: [
          "Daily practice shows determination, not nerves.",
          "Yes! Those are the body-clues of stage fright.",
          "Packing shows she was prepared, not scared.",
          "The hug shows love for her violin — the nerves were the sweat and shakes.",
        ],
      },
      {
        question: "What does Noor's daily practice tell you about her?",
        options: [
          "She was forgetful and needed reminders.",
          "She was determined and hard-working.",
          "She was bored at home.",
          "She was forced to play by her family.",
        ],
        answerIndex: 1,
        explanation:
          "Practising daily — even during her favourite show — is evidence of determination and discipline.",
        misconceptions: [
          "Forgetting looks like MISSING practice — she did the opposite.",
          "Yes! Giving up her show for practice shows real determination.",
          "Bored people don't practise daily on purpose!",
          "The passage shows her choice, not a family rule.",
        ],
      },
      {
        question: "Why do you think Noor imagined her gran listening?",
        options: [
          "To remember which song came next",
          "To check how long the song was",
          "To feel calm and supported",
          "To hear the audience better",
        ],
        answerIndex: 2,
        explanation:
          "She took a breath and pictured someone loving and safe — a classic trick for calming stage fright so she could keep playing.",
        misconceptions: [
          "Imagining a person wouldn't help her remember notes — she already knew the song.",
          "Gran isn't a clock — the imagination trick is about feelings.",
          "Yes! A comforting face helps a nervous performer steady themselves.",
          "Imagining gran happens inside her head — it can't change her ears.",
        ],
      },
    ],
    worksheet: [
      {
        kind: "fill-blank",
        prompt: "The reason a character does something is called their ______. (Type one word.)",
        answer: "motive",
      },
      {
        kind: "fill-blank",
        prompt: "Noor practised her violin every day for two ______. (Type one word.)",
        answer: "weeks",
      },
      {
        kind: "match",
        prompt: "Match each action to what it reveals!",
        left: ["sweaty hands, shaking knees", "going on stage anyway", "hugging the violin case"],
        right: ["showing she loved her violin", "a sign she felt nervous", "showing she was scared but brave"],
        answer: [1, 2, 0],
      },
      {
        kind: "fill-blank",
        prompt: "Before playing, Noor took a breath and imagined her ______ listening at home. (Type one word.)",
        answer: "gran",
      },
      {
        kind: "short-answer",
        prompt:
          "Kai offered Noor a way to hide where 'nobody would know'. Why do you think she said no? Use at least one clue from the story.",
        sampleAnswer:
          "She said no because she wanted to face her fear head-on — she later says, 'That's exactly why I went first. If I can play scared, then scared can't stop me.'",
      },
      {
        kind: "writing",
        prompt:
          "Write TWO sentences about a time you (or a character from a book) did something even though you felt nervous: what you did, and why you did it.",
        sampleAnswer:
          "I was nervous to read my poem at assembly, but I walked onto the stage anyway. I did it because I had worked hard on the poem and wanted to share it with my class.",
        minWords: 16,
      },
    ],
  },

  // -------------------------------------------------------------------------
  // 4. Setting and the Order of Events
  // -------------------------------------------------------------------------
  {
    id: "reading-primary-4",
    title: "Setting and the Order of Events",
    emoji: "🗺️",
    minutes: 10,
    intro:
      "Stories travel through TIME as well as place. Learn to spot the setting and follow the order words — first, then, after that, finally — through one very windy market morning.",
    sections: [
      {
        heading: "Setting: Where and When",
        body:
          "The setting is where AND when a story happens: a market square on a Saturday morning, a cabin in a snowy night. Setting shapes what can happen — a mango can't roll downhill in a swimming pool! Good readers build a picture of the place in their heads as they read.",
        example:
          "'The harbour town smelled of salt air and fresh bread.' One sentence gives you place (harbour town) and feeling (salt + bread).",
        tip: "Ask: could this event happen somewhere else? If not, the setting matters to the story.",
      },
      {
        heading: "Sequence Words Are Signposts",
        body:
          "Order words tell you when things happen: first, then, next, after that, finally. They are signposts on the story road. Retelling a story in order — beginning, middle, end — proves you understood it. Watch out: authors sometimes jump back with words like 'before' or 'last week', so stay alert!",
        example:
          "'First we packed. Then we hiked. Finally we reached the lake.' Three signposts, three events, perfect order.",
        tip: "Number the events in the margin: 1, 2, 3. Your future self will thank you.",
      },
      {
        heading: "The Passage: The Great Mango Escape",
        body:
          "Saturday morning dawned bright and windy over the harbour town of San Remedios. First, Tomás helped his aunt unload crates of mangoes from her blue pickup at six o'clock, before the sun had fully climbed over the fishing boats. The market square smelled of salt air and fresh bread. Then, at half past seven, the stalls opened and shoppers poured in — grandmothers with baskets, kids weaving between the fruit pyramids, a busker tuning his guitar by the fountain. After that, around nine, a sudden gust of wind knocked over the biggest mango pyramid. Mangoes rolled everywhere. 'Catch them before they escape!' Tomás shouted, and soon a dozen kids were chasing fruit as if it were a game. Next, Aunt Rosa laughed so hard she nearly dropped her price sign, and she promised every helper a free mango. Finally, by noon, the square was calm again. The crates were empty, the busker had earned enough coins for lunch, and Tomás sat on the pickup's tailgate eating the juiciest mango of the day. 'Same time next Saturday?' his aunt asked. Tomás grinned — a day at the market was the best adventure in town.",
        tip: "Spot the signposts: First… Then… After that… Next… Finally… Number the events as you go.",
      },
    ],
    vocab: [
      { word: "setting", meaning: "Where and when a story happens." },
      { word: "sequence", meaning: "The order in which events happen." },
      { word: "finally", meaning: "An order word meaning at the end, after everything else." },
      { word: "busker", meaning: "A street performer who plays music for coins." },
    ],
    funFact:
      "Storytellers used order words like 'first, then, finally' for thousands of years — long before stories were written down, memory tricks kept tales in order.",
    quiz: [
      {
        question: "Where and when does the story take place?",
        options: [
          "a harbour town's market square, on a Saturday morning",
          "a mountain cabin, on a snowy night",
          "a school gym, during a storm",
          "a city subway, at rush hour",
        ],
        answerIndex: 0,
        explanation:
          "Saturday morning over the harbour town of San Remedios, in the market square — that's the setting.",
        misconceptions: [
          "Yes! Harbour town + market square + Saturday morning.",
          "Too chilly for mangoes — and no mountains in this story.",
          "No gym or storm — the wind was outside in the square.",
          "No subway — the vehicles here are pickups and fishing boats.",
        ],
      },
      {
        question: "Which event happened FIRST?",
        options: [
          "A gust of wind knocked over the mangoes.",
          "Tomás helped unload crates at six o'clock.",
          "Aunt Rosa promised free mangoes.",
          "The busker earned coins for lunch.",
        ],
        answerIndex: 1,
        explanation:
          "'First, Tomás helped his aunt unload crates… at six o'clock' — the earliest signpost in the story.",
        misconceptions: [
          "The wind struck around nine — that's in the middle.",
          "Yes! Unloading at six comes before everything else.",
          "The free-mango promise came after the wind knocked fruit down.",
          "The busker's lunch money came at the end, by noon.",
        ],
      },
      {
        question: "Which event happened LAST?",
        options: [
          "The stalls opened at half past seven.",
          "Tomás ate a juicy mango on the pickup's tailgate.",
          "Kids chased rolling mangoes.",
          "Shoppers poured into the square.",
        ],
        answerIndex: 1,
        explanation:
          "'Finally, by noon… Tomás sat on the pickup's tailgate eating the juiciest mango' — the final event.",
        misconceptions: [
          "Stalls opening at 7:30 is an early event.",
          "Yes! Eating the mango by noon is the ending.",
          "The mango chase happened mid-morning, after the gust.",
          "Shoppers arrived at 7:30 — near the beginning.",
        ],
      },
      {
        question: "Which word from the story shows ORDER rather than describing a thing?",
        options: ["mango", "finally", "guitar", "windy"],
        answerIndex: 1,
        explanation: "'Finally' is a sequence signpost — it tells you where you are on the story road.",
        misconceptions: [
          "A mango is a thing (a noun), not an order word.",
          "Yes! 'Finally' signals the last event.",
          "A guitar is an object you can hold.",
          "'Windy' describes the weather — describing, not ordering.",
        ],
      },
    ],
    worksheet: [
      {
        kind: "fill-blank",
        prompt: "The ______ is where and when a story happens. (Type one word.)",
        answer: "setting",
      },
      {
        kind: "fill-blank",
        prompt: "Tomás helped unload crates at ______ o'clock in the morning. (Type the number word.)",
        answer: "six",
      },
      {
        kind: "match",
        prompt: "Match each order word to its place in the sequence!",
        left: ["First", "Then", "Finally"],
        right: ["in the end", "at the start", "coming next after that"],
        answer: [1, 2, 0],
      },
      {
        kind: "fill-blank",
        prompt: "A sudden ______ of wind knocked over the biggest mango pyramid. (Type one word.)",
        answer: "gust",
      },
      {
        kind: "short-answer",
        prompt:
          "Retell the wind disaster in TWO sentences, using the order words 'then' and 'finally' (or 'after that').",
        sampleAnswer:
          "Then a sudden gust of wind knocked over the mango pyramid, and kids chased the rolling fruit. Finally, Aunt Rosa promised every helper a free mango.",
      },
      {
        kind: "writing",
        prompt:
          "Write TWO sentences about your morning using the order words 'first' and 'then'. Make the order crystal clear.",
        sampleAnswer:
          "First I ate breakfast and packed my school bag. Then I walked to school with my older brother.",
        minWords: 12,
      },
    ],
  },

  // -------------------------------------------------------------------------
  // 5. Context Clues: Cracking New Words
  // -------------------------------------------------------------------------
  {
    id: "reading-primary-5",
    title: "Context Clues: Cracking New Words",
    emoji: "🗝️",
    minutes: 11,
    intro:
      "Don't let a mystery word stop your reading! Four clue types — definition, example, contrast and cause-effect — can crack almost any new word. Try them on a museum field trip.",
    sections: [
      {
        heading: "Four Kinds of Clues",
        body:
          "DEFINITION clue: the meaning is right there — 'fragile — it could shatter like an eggshell'. EXAMPLE clue: examples reveal the idea — 'citrus fruit, such as lemons and oranges'. CONTRAST clue: a flip word like 'but' or 'however' shows the opposite — 'everyone rushed forward, but Zara hesitated'. CAUSE-EFFECT clue: one thing leads to another — 'his throat was dry, so he asked for water'.",
        example:
          "'The vase was ancient — older than her grandmother's grandmother.' The dash introduces a definition-style clue: ancient means very, very old.",
        tip: "Punctuation is your friend: dashes, commas and 'such as' often mark a clue.",
      },
      {
        heading: "How to Crack a Word",
        body:
          "Step 1: reread the WHOLE sentence — clues usually live nearby. Step 2: name the clue type you found. Step 3: guess the meaning. Step 4: swap your guess into the sentence — does it still make sense? If yes, crack confirmed. Keep reading; you don't always need a dictionary.",
        example:
          "'Kai was parched; his throat was dry and scratchy.' Clue type: definition/cause-effect. Guess: parched = very thirsty. Test the swap: 'Kai was very thirsty' — works!",
        tip: "Swapping your guess back into the sentence is the crack-checker.",
      },
      {
        heading: "The Passage: The Museum Field Trip",
        body:
          "'Careful — that vase is fragile,' the guide warned. 'It could shatter like an eggshell if it fell.' Priya stepped back and studied a pottery jar older than her grandmother, older than her grandmother's grandmother — an ancient jar from a city that no longer exists. Kai was parched after the long bus ride; his throat was dry and he asked for water twice. When the guide invited volunteers to touch a smooth stone tool, everyone rushed forward, but Zara hesitated — she stood at the back, unsure — until Priya waved her up. The final room held a vast map that covered an entire wall, so big you needed ten steps to walk from one end to the other. 'Museums hold clues,' the guide said. 'Every object has a story.' Priya copied the ancient jar's wavy patterns into her notebook, while Kai drew the vast map with a tiny arrow that said 'you are here'. On the bus home, Kai decided the trip had been too short, and Zara finally stopped hesitating long enough to ask her question about the ancient jar. She is going to be an archaeologist someday, Priya thought — someone who digs up the past.",
        tip: "As you read, underline the clue words: dashes, 'but', 'so', and 'someone who…'.",
      },
    ],
    vocab: [
      { word: "fragile", meaning: "Easily broken or shattered." },
      { word: "parched", meaning: "Very, very thirsty." },
      { word: "hesitated", meaning: "Paused or waited because of unsureness." },
      { word: "vast", meaning: "Extremely big; huge." },
      { word: "ancient", meaning: "Very, very old." },
    ],
    funFact:
      "English borrows words from everywhere: 'fragile' sailed over from Latin, 'parched' grew from Middle English. Every dictionary word is a tiny time traveller.",
    challenge: {
      prompt:
        "A made-up word appears in a fantasy book: 'The gloamling crept out of its cave only at dusk, when the sky grew dark, and it slept all day beneath the stones.' What kind of creature is a gloamling? Which clues told you, and what clue TYPE is each?",
      hint: "Look at WHEN it comes out and WHAT it does during the day.",
      steps: [
        "Clue 1: 'only at dusk, when the sky grew dark' — a definition-style clue about its active time.",
        "Clue 2: 'slept all day beneath the stones' — an example/behaviour clue.",
        "Combine: a gloamling is a night-active, cave-dwelling creature — nocturnal and shy of daylight.",
        "Name the types: clue 1 is a definition-style (restates the meaning), clue 2 is an example of behaviour.",
      ],
      answer:
        "A gloamling is a night-loving creature that hides in caves by day — the dusk clue is a definition-style clue, and the sleeping-beneath-stones detail is an example clue.",
      answerWhy:
        "Even for a word that doesn't exist, the surrounding sentences act as context clues. Behaviour clues (when it's active, where it sleeps) let you define an unknown creature just like an unknown real word.",
    },
    quiz: [
      {
        question: "Fragile means…",
        options: ["very heavy", "easily broken", "very old", "very shiny"],
        answerIndex: 1,
        explanation: "The guide's clue — 'it could shatter like an eggshell' — defines fragile as easily broken.",
        misconceptions: [
          "Eggshells break because they're delicate, not heavy.",
          "Yes! 'Shatter like an eggshell' is the definition clue.",
          "Very old is 'ancient' — a different word from this passage.",
          "Shine isn't in the clues — eggshells aren't famous for sparkle.",
        ],
      },
      {
        question: "Parched means…",
        options: ["very thirsty", "very tidy", "very sleepy", "very hungry"],
        answerIndex: 0,
        explanation: "'His throat was dry and he asked for water twice' — a cause-effect clue for parched.",
        misconceptions: [
          "Yes! Dry throat + asking for water = very thirsty.",
          "Tidy would be neat — Kai was thirsty, not folding socks.",
          "Sleepy isn't in the clues — it was a dry throat, not yawns.",
          "Hungry is for food — Kai asked for WATER twice.",
        ],
      },
      {
        question: "Hesitated means…",
        options: ["shouted loudly", "hurried forward", "paused or waited, unsure", "danced happily"],
        answerIndex: 2,
        explanation:
          "The contrast clue does it: 'everyone rushed forward, BUT Zara hesitated — she stood at the back, unsure.'",
        misconceptions: [
          "Shouting is the opposite of Zara's quiet standing back.",
          "The OTHERS hurried forward — the 'but' flips it for Zara.",
          "Yes! The contrast with 'rushed forward' shows hesitation.",
          "Zara stood still at the back — no dancing happened here.",
        ],
      },
      {
        question: "'Kai was parched; his throat was dry and he asked for water twice.' Which clue type is this?",
        options: [
          "a contrast clue using 'but'",
          "a definition/cause-effect clue after the semicolon",
          "a rhyming clue",
          "a picture clue",
        ],
        answerIndex: 1,
        explanation:
          "The part after the semicolon explains the result of being parched — dry throat, asking for water. That's definition/cause-effect.",
        misconceptions: [
          "No 'but' here — nothing is being flipped.",
          "Yes! The semicolon introduces the explanation of parched.",
          "Rhyming isn't a context clue type — look at meaning, not sound.",
          "No pictures on this page — text clues only!",
        ],
      },
    ],
    worksheet: [
      {
        kind: "fill-blank",
        prompt: "The words ______ a new word give you hints about its meaning. (Type one word.)",
        answer: "around",
      },
      {
        kind: "fill-blank",
        prompt: "Kai was parched — his throat was ______. (Type one word, as in the passage.)",
        answer: "dry",
      },
      {
        kind: "match",
        prompt: "Match each clue type to its example from the passage!",
        left: ["definition clue", "contrast clue", "cause-effect clue"],
        right: [
          "everyone rushed forward, but Zara hesitated",
          "his throat was dry, so he asked for water twice",
          "fragile — it could shatter like an eggshell",
        ],
        answer: [2, 0, 1],
      },
      {
        kind: "fill-blank",
        prompt: "The final room held a ______ map that covered an entire wall. (Type one word.)",
        answer: "vast",
      },
      {
        kind: "short-answer",
        prompt:
          "The passage never defines 'archaeologist' with a fancy word — but the ending gives a clue. Use it to explain what an archaeologist is, in your own words.",
        sampleAnswer:
          "An archaeologist is someone who digs up and studies things from the past, like the ancient jar — 'someone who digs up the past'.",
      },
      {
        kind: "writing",
        prompt:
          "Write a sentence using the word 'vast' correctly. Make the meaning clear from the OTHER words in your sentence — no dictionary allowed!",
        sampleAnswer: "The vast desert stretched so far that we could not see the other side, even from the tall dune.",
        minWords: 10,
      },
    ],
  },

  // -------------------------------------------------------------------------
  // 6. Predict and Infer Like a Detective
  // -------------------------------------------------------------------------
  {
    id: "reading-primary-6",
    title: "Predict and Infer Like a Detective",
    emoji: "🔭",
    minutes: 11,
    intro:
      "Prediction and inference are detective cousins: one guesses what happens NEXT, the other figures out what's HIDDEN. Practise both on the same mystery — a kitchen full of clues.",
    sections: [
      {
        heading: "Prediction vs. Inference",
        body:
          "A PREDICTION is a smart guess about what will happen next in the story. An INFERENCE is a smart guess about something the author hints at but never says outright. Both use text clues plus what you already know. Prediction points FORWARD; inference digs UNDER the surface.",
        example:
          "Clue: a character grabs an umbrella. PREDICT: it will probably rain. INFER: the character thinks rain is coming. One glance, two detective moves!",
        tip: "Say it like a detective: 'The clues are… so I predict/infer…'.",
      },
      {
        heading: "Clues Are Evidence",
        body:
          "Good detectives never guess without evidence. Collect the clues first — an object, a time, a note, a sound. Then add your own experience: what usually happens in situations like this? That mix of text clue + life knowledge = a solid prediction or inference. And like any good detective, be ready to revise when new clues arrive!",
        example:
          "Steam still rising from two mugs → INFER people left very recently → PREDICT they might still be nearby.",
        tip: "Ask: what do the clues SAY, what do I KNOW, so what can I FIGURE OUT?",
      },
      {
        heading: "The Passage: The Clues on the Fridge",
        body:
          "Mila pushed open the kitchen door and stopped. The fridge was covered with crayon drawings — five of them, all dragons, all signed 'Leo, age 6'. Next to them hung a photo of a boy holding a trophy almost as big as himself. A muddy football with LEO printed on it sat by the door. On the kitchen table stood two mugs of hot chocolate, still steaming, and a plate with only crumbs left. Leo's boots were gone from the mat. Mum's car keys were missing from their hook, and a note on the fridge said, 'Gone to the park — back by five. — Mum'. Mila checked the clock: twenty to five. Outside, grey clouds had piled up like unmade beds, and the wind was picking leaves off the path. Mila stuffed a small umbrella into her pocket, grabbed her scarf, and jogged toward the park. The garden gate squeaked as she slipped out. As she turned the corner, she heard laughter drifting over the fence, the squeak of swings — and a familiar voice shouting, 'One more goal!' Behind her, the first fat raindrops began to speckle the pavement.",
        tip: "List the clues as you read: drawings, trophy, steaming mugs, the note, the clock, the clouds.",
      },
    ],
    vocab: [
      { word: "predict", meaning: "To make a smart guess about what happens next." },
      { word: "infer", meaning: "To figure out something the author hints at but doesn't say." },
      { word: "clue", meaning: "A detail in the text that helps you figure things out." },
      { word: "evidence", meaning: "The clues you can point to as proof of your idea." },
    ],
    funFact:
      "Detectives call careful clue-reading 'deduction' — Sherlock Holmes' famous method. Your brain does it every time you read between the lines!",
    quiz: [
      {
        question: "Who does the trophy photo most likely show? (inference)",
        options: ["Mila", "Leo", "the busker", "Mum"],
        answerIndex: 1,
        explanation:
          "The photo hangs beside Leo's drawings and beside a football marked LEO — the clues point to Leo as the trophy winner.",
        misconceptions: [
          "Mila is the detective here — nothing links HER to the trophy.",
          "Yes! Drawings signed 'Leo' + a football with LEO on it make him the best match.",
          "No busker appears in this story at all.",
          "Mum left the note, but the kid-sized trophy and football point to Leo.",
        ],
      },
      {
        question: "The hot chocolate was 'still steaming'. What can you infer? (inference)",
        options: [
          "Leo and Mum left very recently.",
          "The mugs were there all night.",
          "Mila made the hot chocolate.",
          "Nobody has been in the kitchen for days.",
        ],
        answerIndex: 0,
        explanation:
          "Steam means the drinks are fresh — combined with the missing keys and boots, Leo and Mum left only moments ago.",
        misconceptions: [
          "Yes! Steam + gone boots + gone keys all say 'just left'.",
          "Overnight cocoa would be cold — steam means fresh.",
          "Mila just walked in — the mugs were waiting, not made by her.",
          "Fresh steam says the opposite — someone was JUST here.",
        ],
      },
      {
        question: "What will MOST LIKELY happen next? (prediction)",
        options: [
          "Mila will find Leo and Mum at the park before five.",
          "The dragons on the fridge will come alive.",
          "Mum will come home alone at nine.",
          "The hot chocolate will refill itself.",
        ],
        answerIndex: 0,
        explanation:
          "The note says the park; the clock says twenty to five; laughter and 'One more goal!' drift from that direction. The clues align!",
        misconceptions: [
          "Yes! Every clue — note, clock, laughter — points to the park before five.",
          "Fun, but fridge dragons are drawings — no clue supports magic here.",
          "The note says back BY five, and Mum's keys and voice clues say they're still out together.",
          "Cocoa doesn't refill — and no clue suggests it.",
        ],
      },
      {
        question: "What is the difference between predicting and inferring?",
        options: [
          "They are exactly the same thing.",
          "Inference is guessing with no clues at all.",
          "Prediction = what comes NEXT; inference = hidden facts figured out from clues.",
          "Prediction only works with pictures; inference only with words.",
        ],
        answerIndex: 2,
        explanation:
          "Both use clues — but prediction looks forward to the next event, while inference uncovers what the author implies right now.",
        misconceptions: [
          "Close cousins, but different: forward-guessing vs. hidden-fact-digging.",
          "Neither skill works without clues — detectives need evidence!",
          "Yes! Prediction points forward; inference digs under the surface.",
          "Both skills work with words AND pictures — the difference is direction, not tools.",
        ],
      },
    ],
    worksheet: [
      {
        kind: "fill-blank",
        prompt: "A prediction is a smart guess about what happens ______. (Type one word.)",
        answer: "next",
      },
      {
        kind: "fill-blank",
        prompt: "Inferring means reading ______ the lines — figuring out what is hinted but not said. (Type one word.)",
        answer: "between",
      },
      {
        kind: "match",
        prompt: "Match each clue to what it tells the detective!",
        left: ["note: 'back by five'", "still-steaming hot chocolate", "grey clouds piling up"],
        right: ["where Leo and Mum went", "rain might be coming", "they had just left"],
        answer: [0, 2, 1],
      },
      {
        kind: "fill-blank",
        prompt: "The plate on the table had only ______ left. (Type one word.)",
        answer: "crumbs",
      },
      {
        kind: "short-answer",
        prompt:
          "Infer: why did Mila check the clock before leaving the kitchen? Use at least one clue from the passage.",
        sampleAnswer:
          "The note said they'd be back by five, and it was twenty to five — so Mila checked the time because she wanted to reach the park before they came home.",
      },
      {
        kind: "writing",
        prompt:
          "Write a two-line mystery of your own: give TWO clues about something, but never say directly what happened. Let the reader infer it!",
        sampleAnswer:
          "Muddy boots by the door and a wet raincoat on the hook. There was a smell of rain in the hallway.",
        minWords: 12,
      },
    ],
  },

  // -------------------------------------------------------------------------
  // 7. Summarising: Story in a Nutshell
  // -------------------------------------------------------------------------
  {
    id: "reading-primary-7",
    title: "Summarising: Story in a Nutshell",
    emoji: "🌰",
    minutes: 11,
    intro:
      "A summary squeezes a whole story into a few powerful sentences — no details dropped, no extras added. Learn the Somebody-Wanted-But-So-Then frame and become a summary surgeon!",
    sections: [
      {
        heading: "What Makes a Good Summary?",
        body:
          "A summary is a SHORT retelling with only the most important parts: the big problem, the key actions, the outcome. It is not too NARROW (just one tiny detail) and not too BROAD (so vague it could describe any story). Cut the side characters, the weather reports and the snack breaks — keep the spine of the story.",
        example:
          "Too narrow: 'A boy once borrowed a rubber band.' Too broad: 'Things happened at school.' Just right: 'A girl's robot broke before the fair, so she repaired it and learned from the failure.'",
        tip: "If your summary could describe a hundred different stories, it's too broad.",
      },
      {
        heading: "The SWBST Frame",
        body:
          "Use Somebody-Wanted-But-So-Then: SOMEBODY (who?), WANTED (what did they hope for?), BUT (what went wrong?), SO (what did they do?), THEN (how did it end?). Fill the five slots and you have a summary with all the bones and none of the fluff.",
        example:
          "Somebody: Amara. Wanted: to enter the science fair with Biscuit. But: the robot's arm snapped. So: she fixed it with a knotted inner-tube band. Then: Biscuit worked perfectly and she won second place.",
        tip: "Five slots, five words minimum — SWBST is a summary skeleton you can always hang a story on.",
      },
      {
        heading: "The Passage: The Robot Repair",
        body:
          "Amara had wanted to enter the school science fair for a whole year. She built a small robot named Biscuit that could sort recycling into paper, plastic and metal. Two nights before the fair, Biscuit's arm jammed and went limp. Amara felt like crying, but instead she opened the robot's panel and tested each part one by one. Deep inside the arm she found a snapped rubber band — the same band her little brother had borrowed for his slingshot the week before. She had no spare, and the shops were closed. So she knocked on her neighbour's door. Mr. Okafor, a retired engineer, didn't hand her a new band. Instead, he showed her how to fold and knot a strip of old bicycle inner tube into a strong replacement. Amara refitted the arm and ran three full tests. Biscuit sorted every item perfectly. On fair day the judges asked their hardest question: 'What part of your project are you proudest of?' Amara didn't point at the robot. She pointed at the knotted tube. 'The part that failed,' she said, 'because it taught me more than the part that worked.' She won second place — and a high-five from Mr. Okafor.",
        tip: "Try the SWBST frame in your head as you finish reading — the slots fill themselves.",
      },
    ],
    vocab: [
      { word: "summary", meaning: "A short retelling of only the most important parts." },
      { word: "too narrow", meaning: "A summary made of one tiny detail that misses the big picture." },
      { word: "too broad", meaning: "A summary so vague it could fit almost any story." },
      { word: "outcome", meaning: "How things ended up at the close of a story." },
    ],
    funFact:
      "Writer Ernest Hemingway was once challenged to write a story in only six words. He wrote: 'For sale: baby shoes, never worn.' Proof a summary can be tiny AND powerful.",
    challenge: {
      prompt:
        "Summarise the robot story in EXACTLY five short parts using SWBST — but add one extra rule: every part must be five words or fewer.",
      hint: "Fill the slots first, then trim each one like a haircut — keep the bone, cut the fluff.",
      steps: [
        "Somebody: Amara (2 words — done!).",
        "Wanted: 'to enter the science fair' — four words.",
        "But: 'Biscuit's arm snapped' — three words.",
        "So: 'she knotted an inner-tube band' — five words.",
        "Then: 'Biscuit worked; she won second place.' Trim if needed!",
      ],
      answer:
        "Somebody: Amara. Wanted: to enter the science fair. But: Biscuit's arm snapped. So: she knotted an inner-tube band. Then: Biscuit worked and she won second place.",
      answerWhy:
        "The five SWBST slots guarantee nothing important is missing, while the word limit forces out small details — the two skills every good summariser needs.",
    },
    quiz: [
      {
        question: "Choose the BEST summary of the passage.",
        options: [
          "Amara's little brother once borrowed a rubber band for his slingshot.",
          "Amara wanted to enter the science fair, but her robot broke, so she fixed it with help and learned from the failure.",
          "Things happened to a girl and a robot.",
          "Amara built a robot that could sort paper, plastic and metal.",
        ],
        answerIndex: 1,
        explanation:
          "It has all five SWBST parts — who, wanted, but, so, then — and nothing extra. That's a nutshell!",
        misconceptions: [
          "True but too narrow — one tiny detail from the middle.",
          "Yes! Complete spine of the story, right size.",
          "Too broad — it could describe almost any story.",
          "True but too narrow — only the set-up, missing the problem and the fix.",
        ],
      },
      {
        question: "Why is 'Amara's little brother once borrowed a rubber band' a POOR summary?",
        options: [
          "It is too long.",
          "It is too narrow — it's one small detail, not the story.",
          "It is the main idea.",
          "It gives away the ending.",
        ],
        answerIndex: 1,
        explanation:
          "A summary needs the story's spine. One borrowed rubber band is a detail, not the point.",
        misconceptions: [
          "It's actually short — the problem is what it leaves OUT.",
          "Yes! Too narrow: one detail can't carry a whole story.",
          "The main idea is the whole fix-and-learn journey, not the band.",
          "It doesn't even reach the ending — that's part of the problem.",
        ],
      },
      {
        question: "In the SWBST frame, what goes in the BUT slot?",
        options: [
          "the character's name",
          "the setting",
          "the problem — what went wrong",
          "how everything ended",
        ],
        answerIndex: 2,
        explanation: "BUT is the turning point: what went wrong or got in the way. In this story: Biscuit's arm snapped.",
        misconceptions: [
          "The name belongs in SOMEBODY.",
          "The setting rarely makes a summary's backbone.",
          "Yes! BUT is where the problem lives.",
          "The ending goes in THEN — BUT is the problem.",
        ],
      },
      {
        question: "Which summary is TOO BROAD?",
        options: [
          "A girl had a little brother and a neighbour.",
          "Amara fixed her broken robot with a knotted tube and learned from failure.",
          "Biscuit sorted recycling into paper, plastic and metal.",
          "A girl solved a problem and learned something.",
        ],
        answerIndex: 3,
        explanation:
          "'A girl solved a problem' could fit a million stories — no robot, no fair, no specifics. That's too broad.",
        misconceptions: [
          "That one has specifics (brother, neighbour) — too narrow, but not vague.",
          "That's the just-right summary.",
          "Specific and true — a bit narrow, but not too broad.",
          "Yes! So vague it fits almost any story ever told.",
        ],
      },
    ],
    worksheet: [
      {
        kind: "fill-blank",
        prompt: "A good summary keeps only the most ______ parts of a story. (Type one word.)",
        answer: "important",
      },
      {
        kind: "fill-blank",
        prompt: "The SWBST frame ends with THEN, and before THEN comes ______ — the problem slot. (Type the word.)",
        answer: "but",
      },
      {
        kind: "match",
        prompt: "Match each SWBST slot to its job!",
        left: ["Somebody", "Wanted", "So"],
        right: ["what they hoped for", "who the story is about", "what they did about the problem"],
        answer: [1, 0, 2],
      },
      {
        kind: "fill-blank",
        prompt: "A summary made of one tiny detail is too ______. (Type one word.)",
        answer: "narrow",
      },
      {
        kind: "short-answer",
        prompt:
          "Write a ONE-sentence SWBST summary of the robot story. Use the words 'wanted', 'but' and 'so'.",
        sampleAnswer:
          "Amara wanted to enter the science fair, but Biscuit's arm snapped, so she fixed it with a knotted inner-tube band and won second place.",
      },
      {
        kind: "writing",
        prompt:
          "Write a TWO-sentence summary of a book, film or show you know well. Use the word 'wanted' in sentence 1 and the word 'so' in sentence 2.",
        sampleAnswer:
          "A little lost fish wanted to find his way home across the ocean. So a forgetful new friend helped him swim the whole way, and he made it back to his dad.",
        minWords: 16,
      },
    ],
  },
];
