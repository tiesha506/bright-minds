// Reading — Teen (ages 14-15)
// The dedicated Reading subject, exam-level: author's purpose, persuasion and
// bias, argument evaluation, synthesis across texts, symbolism and advanced
// inference, and scholarly annotation. Real, complete passages throughout.
// strategyLab is intentionally omitted for Reading.
import type { Lesson } from "./types";

export const lessons: Lesson[] = [
  // -------------------------------------------------------------------------
  // 1. Author's Purpose and Audience
  // -------------------------------------------------------------------------
  {
    id: "reading-teen-1",
    title: "Author's Purpose and Audience",
    emoji: "🧭",
    minutes: 17,
    intro:
      "Every text is built by someone, for someone, to DO something. At exam level you must name the purpose precisely (persuade, not just 'talk about'), identify the intended audience from textual signals, and explain HOW the writing is engineered for both.",
    sections: [
      {
        heading: "Purpose Is a Verb Aimed at a Reader",
        body:
          "Purpose is what the writer wants to DO to the reader: persuade, inform, entertain, analyse — or a blend with one dominant mode. The precise answer matters. 'This column is about phones' describes a topic; 'this column argues that governors should adopt phone-free school days' names a PURPOSE. To find the dominant mode, ask what the text wants you to think, feel or DO by the last line — and remember that a persuasive text can inform and entertain along the way without its purpose changing.",
        example:
          "A columnist may use facts (informing), a joke (entertaining) and a concession (appearing fair) — all in service of the dominant purpose: persuading you to act. Examiners reward students who name the dominant purpose and label the supporting moves.",
        tip: "State purpose as a sentence with a verb and a target: 'to persuade [audience] to [action]'.",
      },
      {
        heading: "Audience Leaves Fingerprints",
        body:
          "You rarely get told the audience — you infer it from fingerprints: direct address ('Governors, I am looking at you'), assumed knowledge (statistics quoted without explanation imply an informed readership), register and vocabulary, the publication it appears in, and the counter-arguments the writer bothers to answer (you answer the objections YOUR audience would raise). The anecdote chosen for the opening is also an audience signal: writers open with whatever will make THEIR readers flinch or nod.",
        example:
          "'You can, of course: the front office phone worked in 1995' — the slightly impatient register tells you the writer is answering parents, and has heard this objection many times.",
        tip: "Find the person the counter-arguments are aimed at — that person is the audience.",
      },
      {
        heading: "The Passage · 1 — 'Phones Down, Minds Up' (a column by Ruth Adeyemi)",
        body:
          "Last Tuesday I watched a fourteen-year-old photograph his homework rather than read it. He photographed the worksheet, posted it to a group chat, and farmed the thinking out to five phones in five bedrooms. He was not lazy; he was efficient, sociable and fast. But that moment is what school is now competing against — and it is losing.",
        tip: "As you read, tag each paragraph: what is the writer DOING here — hooking, proving, conceding, urging?",
      },
      {
        heading: "The Passage · 2",
        body:
          "Governors, I am looking at you, because this is your decision, not the government's and not the tech companies'. Every term we argue about phones as if this were a discipline squabble — a matter of confiscations and grumbles. It is not. It is an attention question, and attention is the raw material of everything a school exists to do. Can a student who checks a phone every four minutes build a proof, draft an essay, or sit inside a difficult novel for an hour? Is it any wonder test scores sag when lessons are interrupted by a hundred silent alarms?",
      },
      {
        heading: "The Passage · 3",
        body:
          "The evidence, for those who like evidence, is blunt. In 2023, UNESCO — the United Nations education agency — recommended banning smartphones in schools where they disrupt learning. Researchers at the London School of Economics studied schools that introduced phone bans and found test scores improved afterwards, with the biggest gains going to students who had been struggling most. Think about what that means: the phone ban acted like targeted support for the very students the system usually fails. Which other free intervention in recent memory has done that?",
      },
      {
        heading: "The Passage · 4",
        body:
          "I can hear the objections from here, and the fairest one deserves an answer: phones are not evil. They are cameras, calculators, dictionaries and maps — tools our generation never dreamed of. Agreed. But there is a difference between a tool and an interrupter, and the difference is whether you choose when to pick it up. A school day that guarantees six phone-free hours is not a punishment; it is a promise — the promise that for six hours a day, your attention belongs to you.",
      },
      {
        heading: "The Passage · 5",
        body:
          "Some parents will say, 'I need to reach my child.' You can, of course: the front office phone worked in 1995, and it still works. Others will argue that phones should be allowed because the workplace will be full of them. But schools are not workplaces — they are gyms for the mind, and athletes do not train with the heaviest weights they can find by accident.",
      },
      {
        heading: "The Passage · 6",
        body:
          "So here is my proposal, addressed to governors and head teachers reading this: phone-free school days — not phone-free lessons, which are unpoliceable, but phone-free days, with devices handed in at registration or locked in pouches. Fund the pouches. Publish the results. If our schools' data does not improve within two years, write to this column and tell me I was wrong; I will print the letter myself. But if the LSE researchers are right, the quietest thing a school ever does — switching off the alarms — may also be the loudest success it has.",
        tip: "Count the audience fingerprints in paragraph 6: who is 'addressed', who is dared, who is promised?",
      },
      {
        heading: "Worked Example: Naming Purpose and Audience Precisely",
        body:
          "Weak answer: 'The writer thinks phones are bad.' Strong answer: 'The dominant purpose is to PERSUADE school governors to adopt phone-free school days. The writer informs (UNESCO, LSE findings) and entertains (the 1995 office phone) in service of that purpose. The primary audience is governors and head teachers — addressed directly in paragraphs 2 and 6 — with a secondary audience of parents, whose objections are answered in paragraph 5.' That answer names the mode, the target, the supporting moves and BOTH audiences: exam-level.",
        example:
          "Test yourself: why does the columnist promise to print her critics' letters? Because printing criticism pre-empts the 'you never listen' objection — persuasion engineering, not humility.",
      },
    ],
    vocab: [
      { word: "subjective", meaning: "Based on personal feelings or opinions rather than external evidence." },
      { word: "objective", meaning: "Based on checkable evidence, independent of anyone's feelings." },
      { word: "connotation", meaning: "The emotional shadow a word carries beyond its literal meaning — 'alarm' vs 'reminder'." },
      { word: "rhetorical", meaning: "Asked or said for effect, not because an answer is wanted — a rhetorical question implies its own answer." },
      { word: "register", meaning: "The level of formality a text adopts, chosen to suit its audience." },
      { word: "anecdote", meaning: "A short personal story used to hook a reader or illustrate a point — vivid, but weak as proof." },
    ],
    funFact:
      "Aristotle set out the three persuasive appeals — ethos (credibility), pathos (emotion), logos (logic) — in his Rhetoric, over 2,300 years ago; examiners still grade against his framework.",
    challenge: {
      prompt:
        "Rewrite the column's opening paragraph (Passage · 1) for a NEW audience: a Year 10 student council deciding its own phone policy. Keep the persuasive purpose. Then list three changes you made and name what each change does for the new audience.",
      hint:
        "Change the register, the direct address, and the stakes. The anecdote could stay — students would recognise it — but the 'governors' framing must go.",
      steps: [
        "Identify the original's audience fingerprints: direct address to governors, talk of funding and results, exam-adjacent stakes.",
        "Draft your version: open with the same homework-photographing moment, but frame the stakes as what YOUR lessons and grades feel like.",
        "Swap the register: slightly less official, still forceful — address 'us', not 'them'.",
        "End with an action the student council can actually take (a trial week, a survey).",
        "List three changes and name the effect of each (e.g. 'direct address changed to 'we' — makes the audience the actor').",
      ],
      answer:
        "Example opening: 'Last Tuesday a boy in our year photographed his homework instead of reading it — posted it to a group chat and let five phones do the thinking. He wasn't lazy; he was efficient. That's exactly what we're up against when we decide our phone policy, and this week we get to decide it.' Changes: (1) 'governors' removed and replaced with 'we' — the audience becomes the actor; (2) stakes shifted from school data to our lessons and our decision; (3) the closing call to action is one a student council can actually deliver.",
      answerWhy:
        "Purpose is fixed (persuade), but audience engineering is adjustable: register, address, examples and call to action all re-aim the same argument at a different room. Rewriting for a new audience proves you understand BOTH — which is exactly what purpose-and-audience questions test.",
    },
    quiz: [
      {
        question: "What is the writer's PRIMARY (dominant) purpose?",
        options: [
          "To inform readers about UNESCO's 2023 recommendation.",
          "To persuade school leaders to adopt phone-free school days.",
          "To entertain readers with stories about teenagers.",
          "To analyse the phone industry's marketing strategies.",
        ],
        answerIndex: 1,
        explanation:
          "Strategy: purpose = what the text wants DONE by the last line. The column ends with a concrete proposal addressed to 'governors and head teachers' — everything else (statistics, jokes, concessions) serves that persuasion.",
        misconceptions: [
          "Informing happens in paragraph 3, but the facts serve the argument — they are the means, not the end.",
          "Correct! A proposal, a dare ('write to this column'), and named decision-makers: pure persuasion engineering.",
          "The anecdotes are hooks in service of the argument, not the destination.",
          "The tech industry is barely mentioned — phones are treated as a school-policy question.",
        ],
      },
      {
        question: "Who is the MOST clearly intended primary audience?",
        options: [
          "Smartphone manufacturers.",
          "Primary-school children.",
          "School governors and head teachers.",
          "Professional athletes.",
        ],
        answerIndex: 2,
        explanation:
          "Strategy: follow the fingerprints. Paragraph 2 says 'Governors, I am looking at you'; paragraph 6 is 'addressed to governors and head teachers reading this' and proposes exactly what they control. The audience is named, twice.",
        misconceptions: [
          "The tech companies are named as NOT responsible (paragraph 2) — they are not the audience being moved.",
          "The column's register and policy proposals are far above a primary-age readership.",
          "Correct! Direct address, policy powers, and a call to action aimed at exactly them.",
          "The gym metaphor mentions athletes — it's an analogy, not an address.",
        ],
      },
      {
        question: "Why does the writer open with the homework-photographing anecdote?",
        options: [
          "To humiliate the boy publicly.",
          "To prove that all students cheat constantly.",
          "To hook the reader and make an abstract policy debate concrete in one image.",
          "To fill space before the statistics arrive.",
        ],
        answerIndex: 2,
        explanation:
          "Strategy: opening moves are engineered. One vivid scene converts 'phone policy' — a dull committee topic — into a picture every reader can see. Note the writer's fairness: 'He was not lazy' — she builds credibility even while hooking you.",
        misconceptions: [
          "The writer explicitly defends the boy ('not lazy') — the opposite of humiliation.",
          "One student, one incident: the writer never generalises to 'all students' — the statistics do the generalising.",
          "Correct! Hook + concreteness + credibility in five sentences.",
          "Every line of a 600-word column is load-bearing; anecdotes earn their space.",
        ],
      },
      {
        question:
          "The LSE study is used mainly to...",
        options: [
          "entertain readers who enjoy research.",
          "show the writer's argument has independent, evidence-based support — and that the gains are largest where help is needed most.",
          "prove that phones cause every school failure.",
          "fill paragraph 3 with something official-sounding.",
        ],
        answerIndex: 1,
        explanation:
          "Strategy: ask what job the evidence does. It backs the persuasion (logos), and the 'biggest gains for struggling students' detail converts a rule into a moral selling-point: the ban helps the most vulnerable first.",
        misconceptions: [
          "Research citations are rarely entertainment; watch what claim they're attached to.",
          "Correct! Evidence + the equity detail — double duty for the argument.",
          "The writer claims scores 'improved' — never 'phones cause every failure'. Exaggeration is its own trap.",
          "The paragraph draws a conclusion from the study ('think about what that means') — it is doing argument work.",
        ],
      },
      {
        question: "'Is it any wonder test scores sag when lessons are interrupted by a hundred silent alarms?' This line is best described as...",
        options: [
          "a genuine question awaiting research.",
          "a rhetorical question that implies its own answer — sagging scores are the alarms' fault.",
          "a statistical fact from UNESCO.",
          "a command to the reader.",
        ],
        answerIndex: 1,
        explanation:
          "Strategy: 'Is it any wonder...' is a shape with a fixed meaning — it asserts that the answer is obvious. The question mark does the arguing so the writer doesn't have to prove causation directly. Spotting this is spotting persuasion in real time.",
        misconceptions: [
          "Rhetorical questions never expect an answer — the phrase 'any wonder' pre-decides it.",
          "Correct! It plants the causal claim as if it were common sense.",
          "No source is attached; the statistic (UNESCO) comes in the NEXT paragraph — that ordering is deliberate.",
          "It ends in a question mark, not an imperative verb — it invites agreement rather than commanding action.",
        ],
      },
    ],
    worksheet: [
      {
        kind: "fill-blank",
        prompt:
          "A ______ question is asked for effect, not because the writer wants an answer. (Type one word.)",
        answer: "rhetorical",
        hint: "Paragraph 2's 'Is it any wonder...' is one.",
      },
      {
        kind: "fill-blank",
        prompt:
          "Writing that aims to change the reader's mind has the primary purpose to ______. (Type one word.)",
        answer: "persuade",
        hint: "Inform, entertain, analyse... and the fourth mode.",
      },
      {
        kind: "practice",
        prompt:
          "The column says the biggest gains from phone bans went to students who had been ______ most. (Type the word as used in Passage · 3.)",
        answer: "struggling",
        hint: "Seven letters — it ends in '-ing'.",
      },
      {
        kind: "practice",
        prompt:
          "According to the column, which year's office phone is mentioned as still working? Type the year in digits.",
        answer: "1995",
        hint: "Passage · 5 — the answer to 'I need to reach my child.'",
      },
      {
        kind: "short-answer",
        prompt:
          "Name the PRIMARY audience and ONE secondary audience of the column, and quote up to five words that identify each.",
        sampleAnswer:
          "Primary audience: school governors and head teachers — identified by 'Governors, I am looking at you' (Passage · 2). Secondary audience: parents — identified by 'Some parents will say...' (Passage · 5), where their objections are answered directly.",
      },
      {
        kind: "writing",
        prompt:
          "Write a mini-column of your own (4 sentences) on a school issue you care about: one sentence of ethos (why you're credible), one of pathos (feeling), one of logos (evidence or logic), and a one-sentence call to action. Label each sentence.",
        sampleAnswer:
          "Ethos: As the person who has fixed our form's projector eleven times, I know our classroom tech is failing us. Pathos: Every glitch costs us the one minute of a video that makes a topic click. Logos: Our class lost an estimated ten lessons to tech failures last term — ten lessons we cannot get back. Call to action: Ask the business manager, this week, what a replacement bulb costs — because the answer is less than one school trip.",
        minWords: 30,
      },
    ],
  },

  // -------------------------------------------------------------------------
  // 2. Persuasion Techniques and Bias
  // -------------------------------------------------------------------------
  {
    id: "reading-teen-2",
    title: "Persuasion Techniques and Bias",
    emoji: "🎣",
    minutes: 18,
    intro:
      "Some texts argue. Others manipulate. Loaded language, cherry-picked surveys, misused statistics, attacks on the person — once you can NAME the techniques, you can never be quietly managed by them again. Today's passage is deliberately riddled with them.",
    sections: [
      {
        heading: "The Technique Toolkit",
        body:
          "LOADED LANGUAGE: emotionally charged wording where neutral wording would do ('concrete scar' vs 'new path'). CHERRY-PICKING: presenting only the data or voices that support you (a survey of your own newsletter's readers). MISUSED STATISTICS: a true number stripped of context — no baseline, no comparison, correlation dressed as cause. AD HOMINEM: attacking the arguer (their hobby, their history) instead of their argument. STRAW MAN: misrepresenting the other side so it is easy to knock down. FALSE DILEMMA: pretending only two options exist. SLIPPERY SLOPE: claiming one step must lead to disaster.",
        example:
          "'Injuries rose 15%!' — true? Maybe. Misleading? Ask: 15% of what, compared to when? Did cycling itself rise by more? A number without a baseline is decoration, not evidence.",
        tip: "Name the technique, then explain the HARM in one sentence: what does it stop you from finding out?",
      },
      {
        heading: "How Bias Hides in Structure",
        body:
          "Bias is not only vocabulary — it lives in choices: which survey gets quoted, which expert counts, whose story is told and whose is absent. The most reliable detector is a two-column habit: every claim on the left, the support offered on the right. Empty rows are the argument's holes. Bias often intensifies at the close — watch the final paragraph for the demand ('there is no middle ground') that reveals the text was never negotiating.",
        example:
          "'Dr Fenwick... agrees they are nonsense' — a retired dentist is an authority on teeth. Quoted on air-quality data, his title borrows authority it hasn't earned. Ask: expert in WHAT, exactly?",
        tip: "The strongest habit: rewrite one loaded sentence neutrally. Bias evaporates when you drain the adjectives.",
      },
      {
        heading: "The Passage · 1 — 'Save Our Riverside' (an open letter to Bramford Council, from Douglas Pemberton, Chair, Residents for a Quiet Riverside)",
        body:
          "A concrete scar is about to be driven through our beloved riverside meadow, and the people of Bramford will not stand for it. Of the two hundred residents who answered the survey in our newsletter, 87% oppose the cycle lane. Two hundred voices may not sound like many, but everyone I spoke to at the allotments agrees with them, and the allotments are the heartbeat of this town. The people have spoken, and the council should listen before it is too late.",
        tip: "Read with a pencil. Tag every technique you meet — there are at least eight in this letter.",
      },
      {
        heading: "The Passage · 2",
        body:
          "Let us talk facts, since the council likes that word. Since the trial lane opened on Oak Avenue, injuries to cyclists on nearby Millbrook Road have risen by 15%. Emergency calls in the district went up. Fifteen per cent. Imagine if a medicine increased injuries by fifteen per cent — the council would ban the medicine. How much more evidence do we need that these lanes are dangerous? And for what — a lane most of us will never use? The council claims the scheme will 'calm traffic', as if cars were rampaging bulls that need taming. Our streets were calm before the planners arrived.",
      },
      {
        heading: "The Passage · 3",
        body:
          "And who is behind this scheme? Councillor Amara Okafor, a competitive cyclist who owns two racing bikes and spends her weekends in lycra, is hardly an impartial judge of a cycling lane. Perhaps the councillor believes what she believes because of who she is; the rest of us must live with what she decides. Dr Fenwick, our respected local dentist of forty years, has looked at the council's air-quality figures and agrees they are nonsense.",
      },
      {
        heading: "The Passage · 4",
        body:
          "The human cost is what the numbers will never show. My neighbour Ida, who is eighty-six, has sat on the same bench by the willow for thirty years; now she says the place is ruined for her. Elderly residents and young families will lose their quiet green space forever. Where will children play — between the handlebars? Either we stop this lane now, or we lose the meadow forever — there is no middle ground.",
      },
      {
        heading: "The Passage · 5",
        body:
          "And mark my words about where this ends: first the cycle lane, then parking meters along the towpath, then a full car ban, and then what? Every freedom the motorist has left in this town will be peeled away, one strip of paint at a time. The people of Bramford deserve better than to be guinea pigs in the council's social experiment.",
      },
      {
        heading: "The Passage · 6",
        body:
          "The meadow cannot speak, so we must. Come to the town hall on the 14th, and bring your neighbours. The meadow was here before every one of us, and it deserves better than to be a ribbon of tarmac. Bramford was built on common sense, and common sense says: keep the cars, keep the peace, and keep the planners out of our meadow. Yours in defence of the meadow, Douglas Pemberton.",
        tip: "Final paragraphs concentrate persuasion — count the techniques in Passage · 6 alone.",
      },
      {
        heading: "Worked Example: One Number, Three Questions",
        body:
          "The letter's centrepiece is its 87% figure, drawn from two hundred residents. Three questions expose it. (1) SAMPLE: who answered? Newsletter readers, self-selected — the most engaged opponents were the most likely to respond. (2) SIZE: is 200 of a town of thousands representative? Unknown — and the letter never says how many received the survey. (3) QUESTION WORDING: what exactly was asked? A loaded question produces loaded percentages. None of this proves the 87% wrong — it proves the number, as presented, supports nothing. That is the difference between a statistic and a use of a statistic.",
        example:
          "Neutral rewrite of the opening: 'The council plans to build an asphalt cycle path along the eastern edge of Riverside Meadow. In a survey printed in our newsletter, 87% of the 200 residents who chose to respond opposed it.' Every fact survives; every shudder is gone.",
      },
    ],
    vocab: [
      { word: "loaded language", meaning: "Emotionally charged wording where neutral wording would do — 'scar', not 'path'." },
      { word: "cherry-picking", meaning: "Selecting only the data or voices that support your case and ignoring the rest." },
      { word: "ad hominem", meaning: "Attacking the person making the argument instead of the argument itself." },
      { word: "false dilemma", meaning: "Presenting exactly two options as if no others exist — 'stop it now or lose it forever'." },
      { word: "slippery slope", meaning: "Claiming one step must inevitably trigger a chain of disasters, without evidence for the links." },
      { word: "anecdotal evidence", meaning: "A personal story offered as proof — vivid, memorable, and unrepresentative." },
    ],
    funFact:
      "'Ad hominem' is Latin for 'to the person' — logicians have been naming this move since at least the seventeenth century, and it has never once made an argument truer.",
    challenge: {
      prompt:
        "Exam-level rewrite: neutralise the letter's opening paragraph (Passage · 1) so that every sentence is checkable and no loaded words remain. Then list the THREE techniques you removed and name each one.",
      hint:
        "Keep every checkable fact (the survey, the 87%, the 200 respondents, the planned path). Drain the shudders: 'concrete scar', 'will not stand for it', 'the people have spoken', 'before it is too late'.",
      steps: [
        "Underline every judgement word in Passage · 1: 'concrete scar', 'beloved', 'will not stand for', 'the people have spoken', 'too late'.",
        "Replace each with neutral wording that preserves the fact: 'concrete scar' → 'asphalt cycle path'; the survey becomes 'a survey printed in our newsletter'.",
        "Add the context the original hid: the respondents were self-selected newsletter readers who chose to answer.",
        "Read your rewrite against the original: same facts, zero adrenaline?",
        "List the removed techniques: loaded language, cherry-picked (self-selected) sample presented as 'the people', and false urgency.",
      ],
      answer:
        "Example rewrite: 'The council plans to build an asphalt cycle path along the eastern edge of Riverside Meadow. In a survey printed in our residents' newsletter, 87% of the 200 residents who chose to respond opposed the path. The survey reached newsletter subscribers only, and respondents selected themselves. The council will consider the responses alongside its other consultation evidence.' Techniques removed: loaded language ('scar', 'beloved'), cherry-picking (a self-selected sample presented as 'the people'), and false urgency ('before it is too late').",
      answerWhy:
        "Neutralising a passage is the sharpest proof you can identify bias: you must name every judgement word, restore every missing context, and still keep the checkable facts standing. If your rewrite could be printed by the council AND the residents' group without either flinching, it is neutral.",
    },
    quiz: [
      {
        question:
          "'A concrete scar is about to be driven through our beloved riverside meadow.' Which technique is this an example of?",
        options: [
          "Neutral description",
          "Loaded language — 'scar' and 'beloved' pre-load the reader's emotions before any evidence appears.",
          "Statistical analysis",
          "Understatement",
        ],
        answerIndex: 1,
        explanation:
          "Strategy: swap each word for its neutral twin and feel the difference: 'scar'→'path', 'beloved'→'local'. The facts don't change; the pressure on the reader does. That pressure is the technique.",
        misconceptions: [
          "'Scar' and 'beloved' are judgements, not measurements — the sentence could never appear in a planning report.",
          "Correct! The judgement arrives before the evidence — that ordering is the whole trick.",
          "No number or measurement appears in the sentence at all.",
          "Understatement shrinks things ('a bit of a problem'); this does the opposite.",
        ],
      },
      {
        question: "Why is the letter's 87% figure — based on two hundred newsletter respondents — misleading as presented?",
        options: [
          "Because 87% is too small a majority to matter.",
          "Because the two hundred are self-selected newsletter respondents — an unrepresentative sample presented as 'the people have spoken'.",
          "Because surveys are never allowed in arguments.",
          "Because the writer forgot to include decimals.",
        ],
        answerIndex: 1,
        explanation:
          "Strategy: interrogate any percentage with three questions — who was sampled, how many, and what was asked? The letter fails at the first: self-selected respondents over-represent the most engaged (most opposed) readers. The number may even be accurate — accuracy is not the issue; representativeness is.",
        misconceptions: [
          "The size of the majority isn't the flaw — the SELECTION of the sample is.",
          "Correct! The technique is cherry-picking, and the 'people have spoken' line inflates a self-selected few into a town.",
          "Surveys are legitimate — this one's sampling method is the problem, not its existence.",
          "Decimals would change nothing; the flaw is structural, not cosmetic.",
        ],
      },
      {
        question:
          "'Councillor Okafor, a competitive cyclist who owns two racing bikes... is hardly an impartial judge.' Which technique is this?",
        options: [
          "A relevant disclosure of expertise",
          "Ad hominem — attacking the arguer's identity instead of engaging the proposal.",
          "A statistical control",
          "A counter-argument, properly answered",
        ],
        answerIndex: 1,
        explanation:
          "Strategy: ask whether the point attacks the PLAN or the PERSON. Her cycling history would matter only if it invalidated her reasoning — the letter never touches her reasoning. Note the twist: the same facts could be relevant disclosure IF the letter used them to open a debate about her arguments; here they replace the debate.",
        misconceptions: [
          "Relevant disclosure comes with engagement: 'here is her case, and here is where it fails' — absent here.",
          "Correct! Identity is substituted for argument — the definition of the fallacy.",
          "Nothing is controlled or quantified; the sentence contains no data.",
          "A counter-argument requires representing her position first — the letter never states it.",
        ],
      },
      {
        question:
          "'Either we stop this lane now, or we lose the meadow forever — there is no middle ground.' Which technique is this, and why?",
        options: [
          "False dilemma — it invents exactly two outcomes and bans all alternatives, when many middle paths exist (reroute, narrow, seasonal access).",
          "Slippery slope — it predicts a chain of disasters.",
          "Straw man — it misquotes the council.",
          "Cherry-picking — it selects one survey.",
        ],
        answerIndex: 0,
        explanation:
          "Strategy: 'either... or...' plus 'no middle ground' is the false-dilemma signature. The world is rarely binary; the writer needs it to be, because a real negotiation would shrink the letter's stakes.",
        misconceptions: [
          "Correct! Two manufactured options, all others erased.",
          "The slippery slope is Passage · 5 (lane → meters → car ban). Match the technique to its actual sentence.",
          "The straw man is 'rampaging bulls' — that one mocks the council's wording; this one removes your choices.",
          "No survey is involved in this line — watch for the number-lines separately.",
        ],
      },
      {
        question: "Which line from the letter is the STRAW MAN — misrepresenting the other side to make it easy to attack?",
        options: [
          "'injuries to cyclists on nearby Millbrook Road have risen by 15%'",
          "'My neighbour Ida... now she says the place is ruined for her.'",
          "'The council claims the scheme will \"calm traffic\", as if cars were rampaging bulls that need taming.'",
          "'Dr Fenwick... agrees they are nonsense.'",
        ],
        answerIndex: 2,
        explanation:
          "Strategy: the straw man distorts before attacking. 'As if cars were rampaging bulls' turns a traffic-management claim ('calm traffic' = slow and steady flow) into a ridiculous image, then defeats the ridiculous version instead of the real one.",
        misconceptions: [
          "That's the misused statistic — a real number missing its baseline and comparison.",
          "That's anecdotal evidence — one personal story standing in for a town.",
          "Correct! It 'calms' the council's claim into absurdity first, then fights the absurdity.",
          "That's borrowed (and misapplied) authority — a dentist certified on air quality nobody checked.",
        ],
      },
    ],
    worksheet: [
      {
        kind: "fill-blank",
        prompt:
          "Using emotionally charged wording where neutral wording would do is called ______ language. (Type one word.)",
        answer: "loaded",
        hint: "'Concrete scar' instead of 'new path'.",
      },
      {
        kind: "fill-blank",
        prompt:
          "Attacking the person instead of their argument is ______ hominem. (Type one word.)",
        answer: "ad",
        hint: "Latin, two letters.",
      },
      {
        kind: "practice",
        prompt:
          "The 87% figure comes from 200 self-selected newsletter respondents. What is the name of this technique? Type one word (hyphenated).",
        answer: "cherry-picking",
        hint: "You pick only the ripest facts off the tree.",
      },
      {
        kind: "practice",
        prompt:
          "'Either we stop this lane now, or we lose the meadow forever' presents exactly two manufactured options. The technique is called a false ______. (Type the missing word.)",
        answer: "dilemma",
        hint: "The two-options-only fallacy — starts with 'dil'.",
      },
      {
        kind: "short-answer",
        prompt:
          "Rewrite ONE loaded sentence from the letter in neutral language, keeping its checkable content. Quote the original (up to eight words) first.",
        sampleAnswer:
          "Original: 'A concrete scar is about to be driven through our beloved riverside meadow.' Neutral: 'The council plans to build an asphalt cycle path along the eastern edge of Riverside Meadow.' The facts (a path, its location, its material) survive; the shudder does not.",
      },
      {
        kind: "writing",
        prompt:
          "Pick a technique the letter does NOT use heavily (e.g. bandwagon, appeal to fear, weasel words). Write ONE sentence a biased writer might use about the meadow debate using that technique, then its neutral twin. Label both sentences.",
        sampleAnswer:
          "Bandwagon: 'Everyone in Bramford already knows the lane must be stopped.' Neutral twin: 'Many residents hold strong views on both sides of the cycle-lane proposal.' The first manufactures a crowd; the second leaves room for the town to actually be divided.",
        minWords: 30,
      },
    ],
  },

  // -------------------------------------------------------------------------
  // 3. Evaluating Arguments: Claims, Reasons, Evidence
  // -------------------------------------------------------------------------
  {
    id: "reading-teen-3",
    title: "Evaluating Arguments: Claims, Reasons, Evidence",
    emoji: "🧪",
    minutes: 18,
    intro:
      "An argument is a machine: claim at the front, reasons and evidence as the engine, a hidden weld called the warrant holding it together. Learn to test the machine — spot the strong evidence, flag the weak, and find the counter-argument before it finds you.",
    sections: [
      {
        heading: "The Anatomy: Claim · Evidence · Warrant",
        body:
          "The CLAIM is what the writer wants accepted. The EVIDENCE is the support offered (studies, data, examples, expert testimony). The WARRANT is the usually-unstated bridge explaining why THIS evidence supports THIS claim — the principle that connects them. Evaluation means testing all three: Is the claim precise? Is the evidence strong, relevant and recent? Does the warrant actually hold? Strong evidence is representative (many cases, not one), relevant (it bears on THIS claim), and sourced (traceable). Weak evidence is anecdotal, cherry-picked, or vague ('studies show' — which studies?).",
        example:
          "Evidence: 'a large review found homework linked to achievement in secondary school but not primary.' Claim: 'primary homework should be cut.' Warrant: 'practices without evidence of benefit should not consume children's time.' Say the warrant out loud and you can finally test it — that's why making warrants explicit is the examiner's favourite skill.",
        tip: "If you can't say why the evidence supports the claim, you've found a missing or broken warrant.",
      },
      {
        heading: "Counter-Arguments and the Strength Ladder",
        body:
          "A strong writer meets the best version of the opposing case — the steel man, not the straw man — and answers it. When evaluating, rank evidence on a ladder: (1) systematic reviews / large pooled studies, (2) individual studies, (3) expert testimony, (4) anecdotes and personal stories. Vivid stories sit at the bottom for PROOF but are honest writers often flag them as such. The exam skill is comparative judgement: given two pieces of evidence, which better supports the claim, and WHY — in terms of representativeness, relevance and source quality.",
        example:
          "'Ten-year-old Maya cries over worksheets' (anecdote, rung 4) versus 'a pooled review of dozens of studies' (run 1). The story moves you; the review should move your conclusion. A careful writer says exactly that — and this lesson's passage does.",
        tip: "Evaluation question = comparison + criterion. Always name your criterion (representativeness, relevance, recency).",
      },
      {
        heading: "The Passage · 1 — 'Homework Is Broken: A Repair Manual' (an essay by Daniel Okonkwo)",
        body:
          "Homework, as most schools practise it, fails the students it is meant to help — and the honest response is not to abolish it but to rebuild it from the evidence up. That is my claim. By 'as practised' I mean the default: differentiated worksheets, due tomorrow, marked late or not at all. Here is my case.",
        tip: "Tag as you read: where is the claim? Where is each rung of the evidence ladder?",
      },
      {
        heading: "The Passage · 2",
        body:
          "Begin with the largest kind of evidence, a review pooling dozens of American studies: for secondary-school students, homework correlated positively with achievement; for primary-school children, the link was weak or absent. The same review found the correlation grew steadily stronger with age — a pattern, not a fluke. In other words, the practice most damaging to ten-year-olds' evenings has the least evidence behind it. If a medicine showed strong results for adults and none for children, we would not keep prescribing it to children out of tradition.",
      },
      {
        heading: "The Passage · 3",
        body:
          "What works is not volume but design. Cognitive science has repeatedly found that testing yourself — retrieving an answer from memory — beats re-reading notes for long-term retention; it is one of the most replicated findings in the field, and it survives every honest attempt to make it disappear. Ten minutes of self-quiz can beat an hour of highlighting. Yet most homework remains the highlighting kind: long, passive, and unmarked by morning.",
      },
      {
        heading: "The Passage · 4",
        body:
          "I met a ten-year-old — call her Maya — who cried over worksheets three nights running. My anecdote is vivid, and it proves nothing; the systematic evidence above is what carries this argument. But anecdotes matter for one purpose: they show the stakes the statistics abstract away. Somewhere behind every 'weak or absent' is a kitchen table at 9 p.m.",
      },
      {
        heading: "The Passage · 5",
        body:
          "The strongest counter-argument says homework builds independent study habits, and that abolishing it would widen the gap, because affluent families would buy tutoring while poorer families lose the only structure homework provides. Fair — if homework were the only structure on offer. But retrieval homework is short, explicit and school-provided: the structure survives, the tears do not. Meanwhile the current system quietly outsources teaching to whoever is free at 7 p.m. — usually a tired adult guessing at this week's method. If the method changed last week, the guessing teaches the wrong thing, and the advantage flows to the households confident enough to notice.",
      },
      {
        heading: "The Passage · 6",
        body:
          "The warrant under my argument is simple: if the value of homework depends on its design, then the design is the thing to fix — not the principle. Abolition throws away the habit-building; the status quo keeps the harm. The repair manual is shorter than either: less of it, retrieved not re-read, marked the same day, and set only where the evidence says it earns its place — which, for now, means secondary schools first, primary schools on probation. That is not a revolution. It is maintenance — which is what 'broken' actually asks for.",
        tip: "Paragraph 6 states the warrant OUT LOUD — rare and honest. Quote it in your evaluation answers.",
      },
      {
        heading: "Worked Example: Choosing the Better Evidence",
        body:
          "Question: which better supports the claim that 'primary-school homework lacks support' — the pooled review (Passage · 2) or Maya's story (Passage · 4)? Answer with a criterion: the review, because it is REPRESENTATIVE (dozens of studies rather than one kitchen), RELEVANT (it measures the homework–achievement link directly), and SOURCED (a named body of research), while the anecdote is one unrepresentative case — something the writer concedes in the very paragraph that tells it. The story is honest colour; the review is the load-bearing beam.",
        example:
          "Exam phrasing: 'The review is stronger because it is systematic and representative; the anecdote, though the writer flags it as non-proof, illustrates rather than demonstrates.'",
      },
    ],
    vocab: [
      { word: "claim", meaning: "The proposition a writer wants accepted — the machine's chassis." },
      { word: "warrant", meaning: "The often-unstated bridge explaining why the evidence supports the claim." },
      { word: "corroborate", meaning: "To confirm or strengthen a claim with independent supporting evidence." },
      { word: "counter-argument", meaning: "The strongest opposing case — which a fair writer addresses and answers." },
      { word: "credible", meaning: "Believable for good reasons: sourced, expert, and free of obvious bias." },
      { word: "generalisable", meaning: "Based on enough representative cases to be extended to others — the opposite of one anecdote." },
    ],
    funFact:
      "Stephen Toulmin laid out the claim–evidence–warrant model in his book 'The Uses of Argument' (1958) — exam boards worldwide still grade essays against his skeleton.",
    challenge: {
      prompt:
        "Build a full Toulmin skeleton for a claim of YOUR own about school (one line per part): claim, reason, evidence, warrant, counter-argument, rebuttal. Then mark which rung of the evidence ladder your evidence sits on.",
      hint:
        "Pick a claim narrow enough to defend: 'Our school should start clubs at lunchtime', 'Form time should be silent reading' — not 'school should be better'.",
      steps: [
        "Write the claim as one precise sentence someone could disagree with.",
        "Give the reason your claim is true, then attach evidence — name its ladder rung (study / single study / expert / anecdote).",
        "Write the warrant: 'This evidence supports the claim because...'",
        "State the counter-argument in its STRONGEST form (steel man), as its holder would say it.",
        "Answer it with a rebuttal that grants what is fair and limits what is not — one sentence.",
      ],
      answer:
        "Example — Claim: 'Form time should be silent reading twice a week.' Reason: reading volume drives vocabulary growth. Evidence: our year's library loans rose 40% during last year's reading week (ladder rung 2 — a single local study). Warrant: practices that raise reading volume at near-zero cost should be adopted. Counter-argument: form tutors use that time for notices, and attendance issues mean some students never get the messages. Rebuttal: notices can move to email and the final two minutes; the reading time survives, and the students who most miss messages are often the same ones who most need the reading.",
      answerWhy:
        "The skeleton exposes whether an argument is a building or a pile of bricks: the warrant reveals hidden assumptions, the steel-manned counter-argument tests the claim against its best opposition, and the ladder rung forces honesty about evidence quality. Any claim that survives all six parts is one you can defend anywhere — including an exam.",
    },
    quiz: [
      {
        question: "What is the essay's central CLAIM?",
        options: [
          "Homework should be abolished in all schools immediately.",
          "Homework as commonly practised fails students and should be redesigned on the evidence — not abolished.",
          "Homework is the best part of education.",
          "Students should re-read their notes every evening.",
        ],
        answerIndex: 1,
        explanation:
          "Strategy: a claim must be stated precisely enough to disagree with. Paragraph 1 states it and paragraph 6 restates it: rebuild the design (less, retrieved, marked same day), because abolition and status quo are both rejected.",
        misconceptions: [
          "That is the position the essay explicitly rejects ('not to abolish it') — read paragraph 1's hinge.",
          "Correct! The essay occupies the redesign middle ground — and names its three repairs.",
          "The essay is a prosecution of the status quo, not a celebration of it.",
          "Re-reading is the method the evidence AGAINST: retrieval beats re-reading (Passage · 3).",
        ],
      },
      {
        question:
          "Which piece of evidence BEST supports the claim that homework shows little benefit for primary-age children?",
        options: [
          "A pooled review of dozens of studies finding a weak or absent link for primary pupils.",
          "The story of Maya crying over worksheets.",
          "A suggestion that ten-year-olds dislike homework.",
          "The observation that worksheets are marked late.",
        ],
        answerIndex: 0,
        explanation:
          "Strategy: rank by the ladder — representativeness, relevance, source. A pooled review sits at the top: many cases, directly on-topic, traceable. The anecdote is honest colour that the writer himself flags as non-proof.",
        misconceptions: [
          "Correct! Systematic, representative, and directly about the primary-school link.",
          "Vivid but single: the writer says 'it proves nothing' — and he is modelling good practice.",
          "A suggestion isn't evidence at all — no data, no source, no cases.",
          "That detail describes practice quality, not the benefit question.",
        ],
      },
      {
        question:
          "The writer includes Maya's story even though he calls it non-proof. What is the BEST evaluation of that choice?",
        options: [
          "It is a mistake; strong arguments never tell stories.",
          "It is fair: the anecdote illustrates the human stakes while the systematic evidence carries the proof — and the writer says exactly that.",
          "It proves the claim by itself.",
          "It weakens the essay because examiners dislike crying children.",
        ],
        answerIndex: 1,
        explanation:
          "Strategy: evaluate the WRITER'S method, not just the content. Flagging the anecdote's limits while using it for stakes is precisely what separates persuasive honesty from manipulation — the writer draws the ladder for you in Passage · 4.",
        misconceptions: [
          "Stories have a legitimate job (stakes, motivation); pretending otherwise misunderstands how writing works.",
          "Correct! Colour and proof are different jobs — the writer assigns each correctly.",
          "The writer explicitly denies it: 'proves nothing'.",
          "Emotional material done HONESTLY (limits admitted) strengthens credibility rather than weakening it.",
        ],
      },
      {
        question: "Which of these is the counter-argument the essay addresses — and what is the essay's rebuttal?",
        options: [
          "Counter: homework is boring. Rebuttal: life is boring.",
          "Counter: abolishing homework widens the gap because it is poor families' only structure. Rebuttal: short, explicit, school-provided retrieval homework preserves the structure without the harm.",
          "Counter: teachers hate marking. Rebuttal: pay them more.",
          "Counter: phones cause distraction. Rebuttal: ban phones.",
        ],
        answerIndex: 1,
        explanation:
          "Strategy: find the paragraph that does two jobs — presents the opposition at full strength ('Fair...') and then answers it without dismissing it. Passage · 5 is the model: concede the premise, redirect the solution.",
        misconceptions: [
          "Nowhere in the essay — a real counter-argument is the opposition's BEST point, not a cartoon.",
          "Correct! It grants what is fair ('if homework were the only structure') and removes the condition with a redesigned alternative.",
          "Not present — and 'pay them more' answers nothing about structure.",
          "Not present — that argument belongs to a different essay entirely.",
        ],
      },
      {
        question: "Which sentence states the WARRANT of the essay's main argument?",
        options: [
          "'I met a ten-year-old — call her Maya — who cried over worksheets three nights running.'",
          "'Ten minutes of self-quiz can beat an hour of highlighting.'",
          "'If the value of homework depends on its design, then the design is the thing to fix — not the principle.'",
          "'Begin with the largest kind of evidence...'",
        ],
        answerIndex: 2,
        explanation:
          "Strategy: the warrant is the bridge — the IF-THEN principle connecting evidence to claim. Passage · 6 states it almost verbatim, which is why the essay feels transparent: the hidden weld has been shown on camera.",
        misconceptions: [
          "That's the anecdote — evidence-adjacent colour, not a connecting principle.",
          "That's a finding (evidence) from cognitive science, not the bridge from evidence to claim.",
          "Correct! The IF-THEN bridge, stated out loud in paragraph 6 — the essay shows its own welds.",
          "That's a signpost to the evidence — scaffolding, not the warrant.",
        ],
      },
    ],
    worksheet: [
      {
        kind: "fill-blank",
        prompt:
          "A ______ is the often-unstated link that explains why the evidence supports the claim. (Type one word.)",
        answer: "warrant",
        hint: "Toulmin's hidden bridge — six letters.",
      },
      {
        kind: "fill-blank",
        prompt:
          "A ______-argument is the opposing view that a strong writer presents at full strength and then answers. (Type one word, hyphenated.)",
        answer: "counter",
        hint: "Passage · 5 begins with it.",
      },
      {
        kind: "practice",
        prompt:
          "According to the pooled review in the essay, how strong is the link between homework and achievement for PRIMARY-school children? Type one word: strong or weak.",
        answer: "weak",
        hint: "'...or absent' completes the phrase in Passage · 2.",
      },
      {
        kind: "practice",
        prompt:
          "The essay says self-testing (retrieval) beats re-reading notes for long-term retention. Is that finding described as one of the most replicated in the field? Type yes or no (lowercase).",
        answer: "yes",
        hint: "Passage · 3 states it directly.",
      },
      {
        kind: "short-answer",
        prompt:
          "The essay offers two pieces of evidence for its main claim: the pooled review and the redesign findings. In 2–3 sentences, explain why the pooled review is the stronger support, naming your criterion.",
        sampleAnswer:
          "The pooled review is stronger because it is representative — dozens of studies rather than one case — and directly relevant, measuring the homework–achievement link across age groups. My criterion is representativeness plus relevance: the review satisfies both, while single stories or observations, however vivid, cannot be generalised.",
      },
      {
        kind: "writing",
        prompt:
          "Write your own three-part argument (4–5 sentences, labelled): (1) CLAIM — a precise, debatable statement about school; (2) REASON + EVIDENCE — one reason with a piece of evidence, naming its strength; (3) COUNTER + REBUTTAL — the best opposing point and your answer to it.",
        sampleAnswer:
          "Claim: our school should publish its homework timetable a term in advance. Reason and evidence: families plan around predictable loads — our survey of two form groups found 80% of conflicts happened in surprise-homework weeks (local, small-scale evidence, so indicative rather than proof). Warrant: predictability reduces avoidable conflict at no cost. Counter: a fixed timetable removes teachers' flexibility to respond to how lessons actually go. Rebuttal: the timetable can reserve one flex week per half-term — flexibility survives, surprise disappears.",
        minWords: 30,
      },
    ],
  },

  // -------------------------------------------------------------------------
  // 4. Synthesis: Reading Multiple Texts
  // -------------------------------------------------------------------------
  {
    id: "reading-teen-4",
    title: "Synthesis: Reading Multiple Texts",
    emoji: "🔗",
    minutes: 18,
    intro:
      "Exams love to hand you TWO texts on one event and ask what ONLY reading both can tell you: where they agree, where they conflict, what one uses that the other ignores. Synthesis is reading as a committee of one. (Both texts below were written for this lesson about the fictional town of Bramford.)",
    sections: [
      {
        heading: "Synthesis: The Four Moves",
        body:
          "When two texts cover one event, make four moves. (1) MAP THE SHARED GROUND: facts both accept — the agreement zone is where reliable information lives. (2) MAP THE CONFLICTS: where they interpret the same facts differently, or emphasise different facts. (3) TRACE THE BORROWING: notice when one text USES the other's data — and what it leaves out. (4) BUILD THE THIRD PICTURE: the conclusion only available by combining — including the issues NEITHER text resolves. A synthesis answer always cites BOTH texts.",
        example:
          "If a report says 'lateness fell from 46 to 30 a day' and an editorial says 'lateness fell by more than a third', they agree — the editorial is restating the report's arithmetic. But if the report prints a parents' petition and the editorial calls it 'real frustration' then moves on, you've found a conflict of EMPHASIS: same fact, opposite weight.",
        tip: "Venn diagram first, essay second: shared facts in the overlap, each text's exclusive claims in its own circle.",
      },
      {
        heading: "Weighing Genres: Report vs Opinion",
        body:
          "A news report's job is verifiable facts with attributed quotes; an editorial's job is a argued position. Neither is 'truer' — but they are trustworthy about DIFFERENT things. Numbers, dates and quotes: trust the report's discipline of attribution, and check whether the editorial uses them accurately. Judgements, priorities and predictions: the editorial is where they live. The sophisticated move is to notice when an editorial's ARITHMETIC is fine but its FRAMING is loaded — accurate sums, slanted spotlight.",
        example:
          "'£48,000 across 1,900 students is about £25 each' — the division is correct. Whether 'textbook price' is the right COMPARISON (a one-off term cost presented against a familiar small purchase) is a framing question, not an arithmetic one.",
        tip: "For every number in the editorial, find its twin in the report. Missing twins are where the argument lives.",
      },
      {
        heading: "Text A · The News Report (1 of 3) — 'Bramford schools try Sleep-In Wednesdays — and lateness falls by a third', by Elif Demir, education correspondent",
        body:
          "Two of Bramford's secondary schools have finished a one-term trial of later Wednesday starts, with early figures showing lateness down by roughly a third and attendance up. North Bramford Academy and St Cuthbert's High — 1,900 students between them — moved their first Wednesday lesson from 8:45 to 10:25 from January. The trial followed growing concern about teenage sleep, which researchers say shifts later during adolescence. Wednesday was chosen because it is the day with the highest lateness at both schools, and neither school had altered its Wednesday timetable in over a decade.",
      },
      {
        heading: "Text A · The News Report (2 of 3)",
        body:
          "Across the two schools, the average number of late arrivals fell from 46 per school day to 30 — a drop of about 35%. Overall attendance rose from 92.1% to 93.6%. In a survey of 1,400 students, 61% said they slept longer on Tuesday nights during the trial. Noor Ellery, 15, said: 'Wednesday used to be my worst day. Now it's my best.'",
      },
      {
        heading: "Text A · The News Report (3 of 3)",
        body:
          "The change was not free. The bus company re-timed two routes at a cost of £48,000 for the term, and 214 parents signed a petition asking for the trial to end early, saying after-school clubs and childcare now finish too late. Headteachers urged caution. 'One term is a snapshot, not a verdict,' said Priya Nair, head of North Bramford Academy. The survey was anonymous and completed during form time, and both heads said they would accept the council's decision either way. The council will review the data in June before deciding whether the trial continues, expands or stops.",
        tip: "Text A's discipline: every number attributed, every objection printed — including ones the trial's fans would rather forget.",
      },
      {
        heading: "Text B · The Editorial (1 of 3) — 'Make Wednesdays Permanent' (the Bramford Evening Post's view)",
        body:
          "Some experiments fail quietly and deserve quiet funerals. This is not one of them. One term of Sleep-In Wednesdays at North Bramford Academy and St Cuthbert's High has produced the clearest attendance data this city has seen in years, and the council should read it properly: lateness fell from 46 students a day to 30 — more than a third — and attendance rose 1.5 percentage points. That rise is not administrative wallpaper: 1.5% of 1,900 students is roughly 28 extra students in classrooms every single day.",
      },
      {
        heading: "Text B · The Editorial (2 of 3)",
        body:
          "The objections deserve honest answers. The buses cost £48,000 for the term; across 1,900 students that is about £25 each — less than the price of a school textbook — and the council spends more than that replacing broken windows. After-school clubs finish later, say the 214 petitioning parents. True, and their frustration is real; but 854 of the 1,400 students surveyed reported sleeping longer, and we know which number should weigh more. As for clubs: this city rescheduled its entire fire-drill system in a week. Lunchtime clubs are not rocket science.",
      },
      {
        heading: "Text B · The Editorial (3 of 3)",
        body:
          "Headteachers call one term 'a snapshot, not a verdict'. Perhaps. But every month of waiting is another month of thirty late arrivals a day that we know how to reduce. Make Wednesdays permanent, publish the next year of data, and let the verdict write itself.",
        tip: "Compare the editorial's numbers against the report's, line by line. Whose 854? Whose 214? Which objection got answered with arithmetic — and which got a shrug?",
      },
      {
        heading: "Worked Example: The Third Picture",
        body:
          "SHARED GROUND: lateness fell 46 → 30 (about a third); attendance rose 1.5 points; the survey found 61% slept longer; the buses cost £48,000; 214 parents petitioned. CONFLICTS: the report treats one term as 'a snapshot, not a verdict' (Nair's caution leads the ending); the editorial treats the same term as a verdict in waiting ('every month of waiting' has a cost). BORROWING: the editorial uses the report's lateness, attendance and survey numbers — but reframes the £48,000 as '£25 each' and the petition as outnumbered by 854. THIRD PICTURE (only from combining): the strongest OPEN issue is not cost (answered) and not lateness (improved) but whether the club-scheduling fix — lunchtime clubs — has ever been TRIALLED. Neither text says it has.",
        example:
          "Exam phrasing: 'Both texts accept the fall in lateness, but the report frames one term as insufficient evidence while the editorial argues delay itself has a cost — a conflict about how much evidence is enough, not about the numbers.'",
      },
    ],
    vocab: [
      { word: "synthesis", meaning: "Combining information from multiple texts to build a conclusion neither text states alone." },
      { word: "source", meaning: "The text (or person) information comes from — always worth naming in synthesis answers." },
      { word: "consensus", meaning: "The points of genuine agreement between texts — the safest ground in the overlap." },
      { word: "contradiction", meaning: "A direct clash: two texts asserting things that cannot both be true." },
      { word: "editorial", meaning: "An opinion piece representing a publication's institutional view — persuasion by design." },
      { word: "attribution", meaning: "Naming who said or produced a claim — the news report's core discipline." },
    ],
    funFact:
      "'Synthesis' comes from Greek syn- ('together') and tithenai ('to place') — literally 'placing together', which is exactly the skill: two texts, one third picture.",
    challenge: {
      prompt:
        "Verify the editor's cheapest-sounding claim with your own arithmetic: £48,000 across 1,900 students. Show the division, state the exact per-student figure to the nearest penny, and judge in 2–3 sentences whether 'less than the price of a school textbook' is a fair comparison — noting anything the framing omits.",
      hint:
        "Divide, then ask: per student per WHAT? And is a textbook a recurring or one-off purchase for a family?",
      steps: [
        "Compute: 48,000 ÷ 1,900.",
        "Round to the nearest penny: the answer is £25.26 — the editor's 'about £25 each' is arithmetically fair.",
        "Identify the framing: the cost is per student PER TERM, and the trial would recur every term if made permanent — the comparison makes a recurring cost sound like a one-off purchase.",
        "Note what's absent: £48,000 per term is about £144,000 per year, and 'broken windows' is an unsourced comparison.",
        "Write your judgement: fair arithmetic, generous framing — the number is right, the spotlight is slanted.",
      ],
      answer:
        "48,000 ÷ 1,900 = £25.26 per student per term, so 'about £25 each' is arithmetically accurate. The framing is generous, though: it presents a RECURRING termly cost against a one-off everyday purchase ('a textbook'), and never mentions the annualised figure (about £144,000 a year) — plus the broken-windows comparison cites no source. Verdict: the maths is honest; the spotlight is not.",
      answerWhy:
        "Synthesis at exam level means auditing one text against the other: the report gives you the raw £48,000, the editorial gives you the framing, and only combining both lets you say 'accurate arithmetic, slanted spotlight' — a judgement neither text makes alone.",
    },
    quiz: [
      {
        question: "On which claim do BOTH texts agree?",
        options: [
          "Lateness across the two schools fell by roughly a third during the trial.",
          "One term is a snapshot, not a verdict.",
          "The bus company should be paid nothing.",
          "Lunchtime clubs are already running successfully.",
        ],
        answerIndex: 0,
        explanation:
          "Strategy: find the numbers in both texts. Text A: 'from 46 per school day to 30 — about 35%'. Text B: 'from 46 students a day to 30 — more than a third'. Identical arithmetic, independently stated: the agreement zone.",
        misconceptions: [
          "Correct! 46→30 appears in both — the shared ground everything else is argued on top of.",
          "That is the HEADTEACHER'S caution in Text A; the editorial argues the opposite ('every month of waiting...').",
          "Neither text says this — Text B accepts the £48,000 and argues it is small.",
          "Text B PROPOSES lunchtime clubs; neither text says they exist yet — a classic trap for readers who skim.",
        ],
      },
      {
        question: "Where do the two texts most clearly CONFLICT?",
        options: [
          "Whether lateness fell during the trial.",
          "Whether one term of data is enough to justify making the change permanent.",
          "Whether 1,900 students attend the two schools.",
          "Whether teenagers sleep more than adults.",
        ],
        answerIndex: 1,
        explanation:
          "Strategy: separate facts from verdicts. The facts are shared; the conflict is interpretive — Text A quotes the headteacher's 'snapshot, not a verdict', while Text B argues that waiting itself costs thirty late arrivals a day.",
        misconceptions: [
          "They agree on this — it's the overlap, not the clash.",
          "Correct! A conflict about the STANDARD OF PROOF, not about any single fact.",
          "Both state the same figure — no conflict.",
          "Nobody in either text compares teens to adults — invented, so not a real conflict.",
        ],
      },
      {
        question: "Which detail from Text A does the editorial (Text B) USE to build its case about classroom impact?",
        options: [
          "The headteacher's 'snapshot, not a verdict' quote.",
          "The survey finding that 61% of 1,400 students slept longer — converted by the editor into a headcount of 854.",
          "The fact that Wednesday was chosen for having the highest lateness.",
          "The reporter's byline.",
        ],
        answerIndex: 1,
        explanation:
          "Strategy: trace the borrowing. Text B converts the report's percentage into an absolute headcount (61% of 1,400 = 854) to outweigh the 214 petitioners — a textbook synthesis move, and one you can check: 0.61 × 1,400 = 854.",
        misconceptions: [
          "The editorial QUOTES that line but to argue against its weight — it isn't building the case for permanence.",
          "Correct! Percentage → headcount: the borrowing is real, and the arithmetic checks out.",
          "That detail stays in the report; the editorial never uses it.",
          "Bylines never carry arguments.",
        ],
      },
      {
        question:
          "After combining BOTH texts, which issue about making the trial permanent remains genuinely UNRESOLVED?",
        options: [
          "The bus cost — Text B answers it with per-student arithmetic.",
          "Whether lateness fell — both texts report the same drop.",
          "Whether after-school clubs can successfully move to lunchtimes — proposed by Text B, but neither text shows it has been trialled.",
          "Whether attendance rose — both texts accept the 1.5-point rise.",
        ],
        answerIndex: 2,
        explanation:
          "Strategy: build the third picture. The cost is answered (fairly or not), lateness and attendance are shared facts — but the club fix exists only as the editor's confident analogy ('fire drills... lunchtime clubs are not rocket science'). No text provides evidence it works. That is the open seam only synthesis reveals.",
        misconceptions: [
          "Answered — accurately — by Text B's arithmetic, even if the framing is generous.",
          "Shared ground — the least contested point in the whole pair.",
          "Correct! A proposal presented with confidence but zero evidence — the issue neither text closes.",
          "Shared ground again — 92.1% to 93.6% appears in both.",
        ],
      },
      {
        question:
          "Text B converts the attendance rise into 'roughly 28 extra students in classrooms every single day'. What arithmetic does that rely on?",
        options: [
          "1.5% of 1,900 students ≈ 28–29 students.",
          "46 late arrivals minus 30 late arrivals.",
          "1,400 surveyed students times 61%.",
          "93.6% minus 92.1%, times £48,000.",
        ],
        answerIndex: 0,
        explanation:
          "Strategy: verify editorial arithmetic against the report's own figures. 0.015 × 1,900 = 28.5 ≈ 28. The move is arithmetically sound — notice it also silently assumes the rise is uniform, which a careful reader might question.",
        misconceptions: [
          "Correct! Attendance points × population = headcount, and the numbers are Text A's own.",
          "That's the lateness drop (16 students), a different calculation entirely.",
          "That's the 854 sleepers — the other borrowed conversion.",
          "Mixing a percentage-point rise with a pound cost — dimensionally nonsense, which is exactly how you know it's wrong.",
        ],
      },
    ],
    worksheet: [
      {
        kind: "fill-blank",
        prompt:
          "Reading several texts together to build a conclusion neither states alone is called ______. (Type one word.)",
        answer: "synthesis",
        hint: "Greek for 'placing together'.",
      },
      {
        kind: "fill-blank",
        prompt:
          "When two texts say opposite things about the same point, they ______; when they say the same thing, they agree. (Type one word.)",
        answer: "conflict",
        hint: "The non-overlapping parts of the Venn diagram.",
      },
      {
        kind: "practice",
        prompt:
          "By how many percentage points did attendance rise during the trial (Text A)? Type the number only, using a decimal point if needed.",
        answer: "1.5",
        hint: "From 92.1% to 93.6%.",
      },
      {
        kind: "practice",
        prompt:
          "What did the bus company's re-timed routes cost for the term? Type the amount exactly as written in Text A, including the £ sign and comma.",
        answer: "£48,000",
        hint: "Text A, third paragraph.",
      },
      {
        kind: "short-answer",
        prompt:
          "In two sentences: state ONE thing the two texts agree on, and ONE thing they conflict about.",
        sampleAnswer:
          "They agree that lateness fell from 46 students a day to 30 — about a third — during the trial. They conflict about what that evidence is worth: Text A quotes the headteacher calling one term 'a snapshot, not a verdict', while Text B argues that every month of delay costs thirty late arrivals a day that are already proven reducible.",
      },
      {
        kind: "writing",
        prompt:
          "You are the council officer writing the June decision note. In 4–5 sentences, combine BOTH texts: state the strongest evidence FOR permanence, the strongest concern AGAINST, what remains untested, and one piece of extra evidence you would require before voting.",
        sampleAnswer:
          "For permanence: lateness fell by roughly a third (46 to 30 a day) and attendance rose 1.5 points — about 28 extra students in class daily. Against: clubs and childcare finish later, and 214 parents petitioned to end the trial early. Untested: whether lunchtime clubs actually work as the editorial assumes; neither text shows they have been trialled. I would require a second term of data plus a costed plan for club re-scheduling before voting, so the decision rests on verified numbers rather than confident analogies.",
        minWords: 30,
      },
    ],
  },

  // -------------------------------------------------------------------------
  // 5. Symbolism and Advanced Inference
  // -------------------------------------------------------------------------
  {
    id: "reading-teen-5",
    title: "Symbolism and Advanced Inference",
    emoji: "🗼",
    minutes: 17,
    intro:
      "Great stories run two engines at once: a plot you follow and a meaning you excavate. A recurring object — a lamp, a tide, a key — is never just furniture. Learn to track symbols across a whole passage and anchor every inference to the text's own words.",
    sections: [
      {
        heading: "Symbols: Objects With Second Jobs",
        body:
          "A SYMBOL is an object, image or action that recurs AND carries meaning beyond itself. The test is recurrence plus weight: once is scenery, three times is a symbol. Track each candidate across the passage — where does it first appear, how does it change, what happens at its LAST appearance? Symbols gain meaning through contrast and change: a light that holds steady while everything else shifts is making an argument about constancy. An ALLEGORY goes further — a whole narrative whose characters and events work as one sustained symbolic system.",
        example:
          "In this lesson's story: the lighthouse appears at the start (as a simile for a letter), in the middle (as work) and at the end (as inheritance). That arc IS the meaning: what begins as possibility ends as duty carried voluntarily.",
        tip: "Make a three-column log: symbol / appearances / what changes. The change column writes your analysis for you.",
      },
      {
        heading: "Advanced Inference: Anchor Everything",
        body:
          "At this level, inference questions reward answers with two parts: the READING (what you conclude) and the ANCHOR (the words that justify it). Ambiguity is allowed — 'the text supports this reading more than that one' is a strong answer — but floating readings are not. The hardest inferences track what characters DON'T say: a father who says 'the light doesn't need two of us' while leaving a key on a pillow is a study in what admission costs. Read actions as sentences, and silence as a sentence too.",
        example:
          "'The tide, which never asks permission, was already turning' — the final line fuses the story's largest symbol with its deepest question. What the tide's turning 'means' depends on every previous appearance: that is advanced inference — cumulative, anchored, and honest about ambiguity.",
        tip: "For every inference: 'I read this as... because the text says...'. Two halves, always.",
      },
      {
        heading: "The Passage · I — 'The Keeper's Lamp'",
        body:
          "From April to September, the ferry came to Gray Rock on Thursdays. Noor had been counting them the way other people count money: fourteen ferries left in the season, and one of them could carry her away. The letter from Calder University — marine engineering, full scholarship — sat propped against her alarm clock like a lighthouse in miniature, flashing possibilities at her every morning.",
        tip: "Log the symbols as they arrive: ferry, letter, lighthouse, lamp, tide, key. Watch what each one DOES.",
      },
      {
        heading: "The Passage · II",
        body:
          "Her father kept Gray Rock's light the way his father had, and his father before that: winding the clockwork that turned the lens, trimming the wick, walking the gallery rail at dusk to clear the gulls' nests. 'The sea doesn't owe you a crossing,' he liked to say, elbows on the rail. 'The light just tells the truth about where the rocks are.'",
      },
      {
        heading: "The Passage · III",
        body:
          "At dusk they climbed the ninety-one steps together. Noor knew them by sound — hollow at eleven, solid at forty — and from the gallery the mainland town was a smear of gold, close enough to tempt, far enough to survive. Her grandfather had laid the gallery's brass rail, and she could feel where his hands had worn it shiny. She would stand where the beam swept out over the water and feel it pass through her, patient as a hand confirming every boat.",
      },
      {
        heading: "The Passage · IV",
        body:
          "On Wednesday the storm came early. Her father turned his wrist wrong on the winch handle — the mainland doctor had said rest, which on Gray Rock was a kind of joke — and so, at five o'clock, he pressed the brass key into her hand. 'Trim the wick. Wind the clockwork. Watch for the 11:40.' The Marian-P, out of Bramford, fishing through the bad weather like a stubborn thought.",
      },
      {
        heading: "The Passage · V",
        body:
          "She climbed. The lamp took the flame the way it had taken flames for a hundred years, and the beam went out across the dark and cut its patient arc, and the clockwork turned under her hands the way it had turned under his. Below her the tide crept up the rocks like a thief with a measuring tape, and the wind tried the windows like a landlord. At 11:40 she saw the Marian-P's small light stagger out of the black, and she watched the beam find it, and hold it, and walk it home.",
      },
      {
        heading: "The Passage · VI",
        body:
          "In the morning her father stood at the gallery rail, wrist strapped, watching the water be reasonable again. 'The light doesn't need two of us,' he said. 'It never did.' Then he looked — just once — at her window, where the scholarship letter was propped against the clock.",
      },
      {
        heading: "The Passage · VII",
        body:
          "Thursday came with its horn. Noor packed her bag, and the letter, and on the pillow she found the brass key, placed where she could not miss it, polished like a promise. Down on the jetty the ferry coughed its first smoke. The tide, which never asks permission, was already turning.",
        tip: "Final appearance of THREE symbols in one paragraph — the key, the ferry, the tide. What does each final version mean?",
      },
      {
        heading: "Worked Example: The Key's Three Appearances",
        body:
          "First appearance (IV): given by necessity — the father's wrist fails, the key is a handover of TASKS. Second, implied (V): the key works; the light is kept; the beam 'walks' a boat home — the handover succeeds. Final appearance (VII): left on the PILLOW, 'polished like a promise' — no necessity now, only choice. The symbol's arc converts necessity into blessing: what was handed over to save a storm has become a gift that says go, and come back. That reading is anchored in all three appearances plus the adjectives ('polished', 'promise') — advanced inference in one paragraph.",
        example:
          "Contrast case: 'The sea doesn't owe you a crossing' (II) versus the tide that 'never asks permission' (VII). The father's worldview says nature owes nothing; the closing image says nature moves regardless of our asking. The tension between those two lines is the story's engine — duty against change.",
      },
    ],
    vocab: [
      { word: "symbol", meaning: "A recurring object or image that carries meaning beyond itself — a lamp standing for duty." },
      { word: "allegory", meaning: "A narrative whose characters and events work as one sustained symbolic system for an idea." },
      { word: "motif", meaning: "A recurring element (image, phrase, sound) that builds meaning through repetition." },
      { word: "ambiguity", meaning: "Deliberate openness to more than one reading — handled by weighing which the text supports more." },
      { word: "inference", meaning: "A conclusion anchored in text evidence — here, advanced: tracking symbols and unspoken motives." },
      { word: "mood", meaning: "The atmosphere a passage creates in the reader — storm passages build dread through sound and motion." },
    ],
    funFact:
      "The Pharos (Lighthouse) of Alexandria, built around 280 BCE, was one of the Seven Wonders of the Ancient World and guided sailors for well over a thousand years before earthquakes brought it down.",
    challenge: {
      prompt:
        "Build the symbol table for 'The Keeper's Lamp': choose THREE recurring symbols (lighthouse/light, tide, brass key). For each: (1) quote its first appearance (up to eight words), (2) quote its last appearance (up to eight words), (3) write one sentence on what the CHANGE between them means.",
      hint:
        "The letter is 'like a lighthouse in miniature' (I); the beam 'walks' the boat home (V); the tide opens as the father's worldview and closes as a force that 'never asks permission'.",
      steps: [
        "Light/lighthouse: first = 'like a lighthouse in miniature, flashing possibilities' (I); last = the beam 'finds it, and holds it, and walks it home' (V). Meaning: possibility matures into a capability that protects others.",
        "Tide: first appears in the father's worldview — the sea owes nothing (II); last = 'which never asks permission, was already turning' (VII). Meaning: change comes whether we authorise it or not — the daughter's choice is real but so is time.",
        "Brass key: first = 'pressed... into her hand' out of necessity (IV); last = 'polished like a promise' on the pillow (VII). Meaning: duty handed over under pressure returns as trust freely given.",
        "Check each sentence is ANCHORED: every claim names its appearance and quotes the words.",
        "Add one closing sentence on how the three symbols vote the same way — the story's unified meaning.",
      ],
      answer:
        "Light: from 'flashing possibilities' (a future imagined) to a beam that 'holds' and 'walks home' (a future she can operate) — possibility becomes competence in service. Tide: from a sea that 'doesn't owe you a crossing' to a tide that 'never asks permission' — nature's indifference becomes the case for acting now. Key: from 'pressed into her hand' (necessity) to 'polished like a promise' (trust). Together they vote one way: the story's meaning is that growing up is converting what you are given — light, time, duty — into what you can carry, and that leaving, like the tide, is not betrayal but rhythm.",
      answerWhy:
        "A symbol table is the examiner's gold standard for literary analysis: it forces recurrence (first vs last), evidence (quotes) and interpretation (meaning) into one structure. The final sentence — how the symbols interact — is the move that separates top-band answers from summaries.",
    },
    quiz: [
      {
        question: "What does the TIDE most plausibly symbolise in the story?",
        options: [
          "The danger of fishing in bad weather.",
          "Change and time, which move regardless of anyone's permission — the force pressing on Noor's decision.",
          "The town's disapproval of island life.",
          "The ferry company's timetable.",
        ],
        answerIndex: 1,
        explanation:
          "Strategy: track the symbol's arc. The father's line ('The sea doesn't owe you a crossing') sets the sea as indifferent; the closing line ('never asks permission, was already turning') makes the tide the story's clock. Its final position — fused with her departure — confirms the reading.",
        misconceptions: [
          "The storm does the danger work; the tide is attached to TIME and CHOICE in both its bookend appearances.",
          "Correct! Indifferent motion + final fusion with the ferry = change that won't wait.",
          "The town appears only as 'a smear of gold' — tempting, not disapproving.",
          "Timetables are the ferry's job; the tide's job in the story is meaning.",
        ],
      },
      {
        question:
          "The scholarship letter is 'like a lighthouse in miniature, flashing possibilities'. What does this simile plant?",
        options: [
          "That the letter is dangerous at sea.",
          "That the university, like the light, offers guidance toward a future — and that Noor's two worlds are already mirroring each other.",
          "That the letter is physically small.",
          "That universities are full of storms.",
        ],
        answerIndex: 1,
        explanation:
          "Strategy: similes bind two worlds. By casting the LETTER as a lighthouse, the writer fuses the symbol of family duty with the symbol of her future — before we have read a single line about the choice. The rest of the story cashes that image in.",
        misconceptions: [
          "Nothing in the story treats the letter as a physical hazard — follow the emotional logic, not the literal one.",
          "Correct! The simile is a promise about the story's structure: duty and future will have to be reconciled.",
          "The size detail is decoration; the operative words are 'lighthouse' and 'flashing'.",
          "The storm arrives on Wednesday — the simile is about the letter's glow, not weather.",
        ],
      },
      {
        question: "What does the brass key left on the PILLOW most plausibly signal?",
        options: [
          "The father has forgotten it there.",
          "The father's blessing and trust: she may leave — and she still belongs; the duty is hers whenever she returns.",
          "Noor is being locked out of the lighthouse.",
          "The lighthouse is being sold.",
        ],
        answerIndex: 1,
        explanation:
          "Strategy: compare the key's two appearances. Given under duress (IV) versus placed, polished, 'like a promise' on a pillow (VII) — the change converts necessity into gift. A pillow is where you wake; the message is for her future, not her chores.",
        misconceptions: [
          "'Polished like a promise' is the writer telling you it was deliberate — forgotten things aren't polished.",
          "Correct! Placed + polished + pillow: a benediction, in objects.",
          "Nothing in the text supports exclusion — the key is the opposite of a lock-out.",
          "No sale is mentioned or hinted; the key points to inheritance, not transaction.",
        ],
      },
      {
        question:
          "'The light just tells the truth about where the rocks are.' What is the best interpretation of the father's line?",
        options: [
          "Lighthouses use radar to find rocks.",
          "The father sees his work — and his worldview — as honest guidance: naming dangers plainly, expecting nothing in return.",
          "The sea is full of lies.",
          "The rocks move every night.",
        ],
        answerIndex: 1,
        explanation:
          "Strategy: a character's maxim is a compressed philosophy. 'Doesn't owe you' + 'tells the truth' = duty without reward, honesty without comfort. It also explains his actions later: he neither begs her to stay nor lies about how much he'll miss her.",
        misconceptions: [
          "The story's light is a flame and clockwork — the line is philosophy, not technology.",
          "Correct! It is his creed, and it quietly becomes the story's standard for how love is expressed on Gray Rock.",
          "Nothing in the text personifies the sea as deceitful — indifference, not dishonesty.",
          "Rocks are the fixed points the light names — their fixity is the whole point.",
        ],
      },
      {
        question: "Does Noor leave on the Thursday ferry? Choose the BEST-ANCHORED answer.",
        options: [
          "She stays — the story says so directly.",
          "The text is deliberately ambiguous, but the weight of evidence (packed bag, letter packed, key as blessing, turning tide) supports the reading that she leaves, carrying the keeper's spirit with her.",
          "She leaves to never return — the story resents the island.",
          "The story refuses to tell us anything at all about her choice.",
        ],
        answerIndex: 1,
        explanation:
          "Strategy: advanced inference = reading + anchor + honesty about ambiguity. 'Packed her bag, and the letter' and the tide 'already turning' support departure; 'polished like a promise' supports return-in-spirit. The best answer holds both — that is what ambiguity is FOR.",
        misconceptions: [
          "The story never states the choice — beware inventing the certainty the text withholds.",
          "Correct! Ambiguous, but weighted — and you can cite every weight.",
          "Nothing in the tone is resentful; the final images (promise, blessing) are warm.",
          "'Refuses to tell us anything' overstates it — the text is packed with directional evidence; ambiguity is not emptiness.",
        ],
      },
    ],
    worksheet: [
      {
        kind: "fill-blank",
        prompt:
          "A recurring object that carries meaning beyond itself — like the lamp standing for duty — is called a ______. (Type one word.)",
        answer: "symbol",
        hint: "Six letters — the lesson's central idea.",
      },
      {
        kind: "fill-blank",
        prompt:
          "A narrative whose characters and events work as ONE sustained symbolic system is an ______. (Type one word.)",
        answer: "allegory",
        hint: "It starts with 'all' — the whole story is the symbol.",
      },
      {
        kind: "practice",
        prompt:
          "How many steps are in Gray Rock's lighthouse tower? Type the number in digits.",
        answer: "91",
        hint: "The passage writes it as a word — 'ninety-one'.",
      },
      {
        kind: "practice",
        prompt:
          "What is the name of the fishing boat the beam guides home? Type the name exactly, including the hyphen.",
        answer: "Marian-P",
        hint: "Passage · IV introduces her; Passage · V brings her home.",
      },
      {
        kind: "short-answer",
        prompt:
          "What might the turning tide in the final line suggest about Noor's decision? Answer in two sentences, anchoring each to the text.",
        sampleAnswer:
          "The tide 'which never asks permission, was already turning' suggests time and change move on their own — so her choice must be made now, and it cannot be undone by waiting. Paired with the polished key 'like a promise', I read the ending as her leaving with blessing: the turning is not loss but rhythm — she can go, because the light and the family will still be there.",
      },
      {
        kind: "writing",
        prompt:
          "Choose a recurring object from a book or film you know well. In 3–4 sentences, explain what it symbolises and cite ONE specific scene that proves it. Anchor every claim: 'I read the object as... because in the scene where...'.",
        sampleAnswer:
          "In 'The Hunger Games', the mockingjay pin symbolises rebellion that began as accident: Katniss wears it as a gift, not a statement, and the districts read meaning INTO it. I read the pin as the story's argument that symbols are made by the people who need them, because the scene where it becomes the rebels' badge happens entirely off her authorship. By the final book, she objects to being its symbol — proving the pin outgrew its wearer, which is exactly what symbols in fiction do.",
        minWords: 30,
      },
    ],
  },

  // -------------------------------------------------------------------------
  // 6. Read Like a Scholar: Annotation and Exam Passages
  // -------------------------------------------------------------------------
  {
    id: "reading-teen-6",
    title: "Read Like a Scholar: Annotation and Exam Passages",
    emoji: "📝",
    minutes: 18,
    intro:
      "Dense exam passages are not read — they are worked. Scholars annotate: they number paragraphs, compress each one to a margin gist, mark evidence, and triage questions. Run the full method on a genuinely academic passage about what sleep does with yesterday.",
    sections: [
      {
        heading: "The Annotation System",
        body:
          "Five marks, consistently used: (1) NUMBER each paragraph — exams refer to them; (2) GIST each paragraph in three to five words in the margin — the map of the argument; (3) CIRCLE the load-bearing terms (defined words, named mechanisms); (4) BRACKET the evidence (studies, figures, examples) — bracketed text is quiz fuel; (5) QUESTION MARK next to anything unclear — come back, don't stall. The gist column is the exam cheat you build yourself: most 'main idea' and 'structure' questions can be answered from it without re-reading.",
        example:
          "For a paragraph about replay during sleep, the margin might read: 'hippocampus → cortex, at night'. Five words that answer any later question about where consolidation happens.",
        tip: "Two passes: first pass = gists only (90 seconds); second pass = marks and brackets. Never mark before you map.",
      },
      {
        heading: "Question Triage: The Exam Clock",
        body:
          "Triage questions by cost: VOCAB-IN-CONTEXT and DETAIL questions are cheap — the answer sits in one bracketed sentence, so do them first while the text is fresh. INFERENCE questions are medium — they need two anchors, so do them second. MAIN-IDEA and PURPOSE questions are expensive — they need the whole gist column, so do them LAST, when your map is complete. Wrong answers in cheap questions are usually 'true but irrelevant'; in expensive questions they are 'true for one paragraph, applied to the whole text'.",
        example:
          "Order of attack on this lesson's mini exam: Q1–Q2 (cheap: located evidence), Q3–Q4 (medium: two-anchor inference), Q5 (expensive: whole-map purpose).",
        tip: "For main-idea options, cross out any answer that is the GIST of one paragraph. Scope errors are the most common exam loss.",
      },
      {
        heading: "The Passage · (1) — 'Consolidation: What Sleep Does With Yesterday'",
        body:
          "(1) A memory formed today is a rumour about tomorrow. The physiological changes that encode an experience are initially fragile: they can be disrupted by interference, stress or distraction. Consolidation is the process by which this fragile trace becomes stable, and a substantial body of research locates a decisive portion of that process in sleep.",
        tip: "First pass: gist every paragraph in 3–5 words before reading past paragraph (2).",
      },
      {
        heading: "The Passage · (2)",
        body:
          "(2) The prevailing model divides the labour between two structures. The hippocampus — a small, seahorse-shaped region deep in the temporal lobe — acts as a fast, temporary store: it binds the elements of an episode quickly but does not hold them permanently. The cortex, by contrast, stores slowly but durably. During slow-wave sleep, the deep, synchronised stage that dominates the first half of the night, the hippocampus is thought to re-activate — or 'replay' — the neural patterns laid down during the day, teaching them, in effect, to the cortex. Slow-wave activity runs highest after a day rich in learning, as though the brain budgets its depth according to need.",
      },
      {
        heading: "The Passage · (3)",
        body:
          "(3) The replay hypothesis is not merely theoretical. In influential animal studies, rats that had learned to run a maze showed, during subsequent sleep, the same sequences of hippocampal firing they had produced while running — compressed and repeated, as though the day were being rehearsed. Human studies converge from the other direction: participants who sleep after learning word pairs recall significantly more the next day than those who remain awake, and naps rich in slow-wave sleep produce measurable benefits to retention. The effects survive controls for time of day and motivation.",
      },
      {
        heading: "The Passage · (4)",
        body:
          "(4) Sleep before learning matters as much as sleep after it. Participants deprived of a single night's sleep form measurably fewer new memories the following day, even after one recovery night — suggesting the sleep-deprived hippocampus is a poor surface for imprinting. The tired brain does not merely fail to consolidate; it struggles to record. Memory formation, in other words, draws on a budget that must be refilled nightly.",
      },
      {
        heading: "The Passage · (5)",
        body:
          "(5) The educational implications are unglamorous but firm. Cramming through the night is doubly costly: it forfeits the night's consolidation and weakens the next day's encoding. Spacing study across days, and testing oneself rather than re-reading, works with the consolidation system instead of against it. On this evidence, sleep is not a break from studying; it is the final stage of it. A test sat after a full night's sleep is sat with a different brain than the one that did the studying.",
      },
      {
        heading: "The Passage · (6)",
        body:
          "(6) Caveats remain. Individuals vary in sleep architecture; rapid eye movement sleep appears to carry benefits of its own, perhaps for emotional and creative material; and much of the human evidence is correlational, which limits strong causal claims. But the direction of the evidence has been consistent for decades, and no serious alternative explains why a brain would spend a third of its life offline — unless the offline hours are, in a strict sense, the work.",
        tip: "Your gist column should now read like a five-line argument map. Use it for Q4 and Q5.",
      },
      {
        heading: "Worked Example: The Gist Column at Work",
        body:
          "Margin gists: (1) traces fragile; sleep consolidates. (2) hippocampus fast/temporary; cortex slow/durable; replay at night. (3) rat replay + human recall evidence. (4) sleep BEFORE learning aids encoding. (5) cramming doubly costly; sleep = final study stage. (6) caveats; conclusion. Notice the argument's shape: definition → mechanism → evidence → extension → application → honesty. When a main-idea question offers 'sleep is pleasant' (topic drift), 'rats rehearse mazes' (one paragraph's scope) and 'consolidation happens in sleep, so study plans should include sleep' (the whole map) — the gist column picks the winner in three seconds.",
        example:
          "Exam discipline in one line: cheap questions from brackets, medium from two anchors, expensive from the gist column — in that order.",
      },
    ],
    vocab: [
      { word: "annotation", meaning: "Purposeful marking of a text while reading: numbers, gists, circles, brackets, question marks." },
      { word: "gist", meaning: "The compressed essence of a paragraph in a few words — your margin map." },
      { word: "skim", meaning: "Reading rapidly for the overall shape and gist, not the details." },
      { word: "scan", meaning: "Reading rapidly to LOCATE one specific fact — the cheap-question skill." },
      { word: "paraphrase", meaning: "Restating a text's meaning in your own words — the gist column in action." },
      { word: "jargon", meaning: "Specialist terminology of a field ('hippocampus', 'encoding') — define it in your margin the first time it appears." },
    ],
    funFact:
      "Edgar Allan Poe popularised the word 'marginalia' with his 1844 essays celebrating the notes readers scribble in book margins — the same habit you are about to make systematic.",
    challenge: {
      prompt:
        "Exam triage drill: you have 8 minutes for this passage and five questions (one detail, one vocab-in-context, one inference, one main idea, one author's-method). Plan your order and timing, then justify each decision with the triage rule it follows.",
      hint:
        "Sort by COST: which answers live in one bracketed sentence, which need two anchors, which need the whole gist column?",
      steps: [
        "List the five question types and mark each cheap / medium / expensive using the triage rule.",
        "Allocate: detail and vocab first (≈1 min each — locate the bracket), inference next (≈2 min — two anchors), main idea and method last (≈2 min each — gist column).",
        "Write your order explicitly: e.g. vocab → detail → inference → method → main idea.",
        "For the main idea, state the rule you'll apply: reject any option whose scope is one paragraph.",
        "Say what you would do with 2 minutes left and two expensive questions unfinished (answer the one whose gist is clearest; never leave a main-idea question blank).",
      ],
      answer:
        "Order: vocab-in-context and detail first (each answerable from one bracketed sentence — 'consolidation', 'replay'), inference third (two anchors: e.g. paragraph 4 + paragraph 5 for the cramming question), then author's-method (the rat study — located, but its purpose needs the surrounding argument), and main idea LAST from the gist column. Justifications: cost rises with the number of text locations an answer depends on; scope rule kills one-paragraph main-idea options; with 2 minutes left, answer the expensive question whose gist is clearest and never leave a whole-map question blank — main-idea questions carry the most marks per second of your prepared map.",
      answerWhy:
        "Triage converts reading skill into marks under time pressure: every decision follows a stated rule (cost, scope, anchors), which is exactly what examiners mean by 'exam technique'. The method in this lesson is the transferable version of that rule-set.",
    },
    quiz: [
      {
        question:
          "According to the passage, during which sleep stage does the hippocampus mainly replay the day's patterns?",
        options: [
          "Rapid eye movement (REM) sleep.",
          "Slow-wave (deep) sleep.",
          "The drowsy moments just before falling asleep.",
          "Light sleep in the final hour before waking.",
        ],
        answerIndex: 1,
        explanation:
          "Strategy: cheap question — locate the bracket. Paragraph (2) states it directly: 'During slow-wave sleep... the hippocampus is thought to re-activate... the neural patterns'. One bracket, one answer.",
        misconceptions: [
          "Paragraph (6) mentions REM carrying OTHER benefits — for emotional and creative material. A classic 'true elsewhere' trap.",
          "Correct! Paragraph (2), the mechanism paragraph — the bracket pays off.",
          "The passage never discusses the falling-asleep transition; don't import outside knowledge.",
          "The passage says slow-wave dominates the FIRST half of the night — the final hour is the wrong end.",
        ],
      },
      {
        question: "As used in paragraph (1), 'consolidation' most nearly means...",
        options: [
          "memorising a list by repetition.",
          "the process by which a fragile memory trace becomes stable.",
          "falling asleep more quickly.",
          "tidying a study desk.",
        ],
        answerIndex: 1,
        explanation:
          "Strategy: vocab-in-context = definition hunting. Paragraph (1) defines its own term: 'Consolidation is the process by which this fragile trace becomes stable'. The sentence IS the answer — no dictionary required.",
        misconceptions: [
          "Repetition is a study technique; consolidation is what the BRAIN does afterwards — different agents.",
          "Correct! The definition is in the sentence that introduces the word.",
          "Speed of sleep onset never appears; the paragraph is about memory, not insomnia.",
          "A real-world meaning of 'consolidate' — the context, as always, outranks the dictionary.",
        ],
      },
      {
        question:
          "Why is cramming through the night described as 'doubly costly'?",
        options: [
          "It costs money for coffee and lights.",
          "It forfeits that night's consolidation AND weakens the next day's encoding of new material.",
          "It makes students both hungry and tired.",
          "It doubles the number of pages re-read.",
        ],
        answerIndex: 1,
        explanation:
          "Strategy: medium question — two anchors. Paragraph (5) names both losses ('forfeits the night's consolidation... weakens the next day's encoding'), and paragraph (4) supplies the mechanism for the second loss (the sleep-deprived hippocampus records poorly).",
        misconceptions: [
          "Money never appears — the costs in this passage are cognitive.",
          "Correct! One night, two separate losses — that's what 'doubly' is counting.",
          "Hunger is not in the passage; tiredness alone is only HALF the doubling.",
          "Re-reading volume isn't the issue — the passage's complaint is about losing sleep's two memory services.",
        ],
      },
      {
        question:
          "Why does the author include the rat-maze studies in paragraph (3)?",
        options: [
          "To entertain readers who like animals.",
          "To show the writer loves animal research more than human studies.",
          "To provide direct, physical evidence for the replay hypothesis — firing sequences observed during sleep — before presenting the human behavioural evidence.",
          "To suggest students should run mazes before exams.",
        ],
        answerIndex: 2,
        explanation:
          "Strategy: author's-method questions ask WHY this evidence, HERE. The paragraph's structure is the answer: 'not merely theoretical' — the rat data observes the mechanism directly; the human data then confirms the effect behaviourally. Two rungs, one ladder.",
        misconceptions: [
          "Entertainment is never the stated job of evidence in an academic passage — look at the surrounding claim.",
          "No preference is expressed; the author uses both, each for what it does best.",
          "Correct! Mechanism evidence first, behavioural confirmation second — the paragraph is a ladder by design.",
          "That's a joke reading of an academic move; the passage's register never supports it.",
        ],
      },
      {
        question: "Which option best captures the MAIN IDEA of the whole passage?",
        options: [
          "Sleep is pleasant and helps people feel rested.",
          "Rats rehearse mazes in their sleep.",
          "Sleep actively consolidates and prepares memory, so effective studying must be built around it — while acknowledging the evidence's limits.",
          "Students should never study in the evening.",
        ],
        answerIndex: 2,
        explanation:
          "Strategy: expensive question — whole gist column. The map runs definition → mechanism → evidence → encoding → application → caveats. Only option 3 spans that full scope; the others are one paragraph dressed as a thesis.",
        misconceptions: [
          "True, pleasant, and nowhere the passage's point — a topic drift option.",
          "The scope rule: that is paragraph (3) alone applied to everything — the most common exam loss.",
          "Correct! Mechanism + application + caveats: the full map in one sentence.",
          "The passage never bans evening study — it redesigns its relationship with sleep.",
        ],
      },
    ],
    worksheet: [
      {
        kind: "fill-blank",
        prompt:
          "Reading rapidly to LOCATE one specific fact is called ______; reading rapidly for the overall gist is skimming. (Type one word.)",
        answer: "scanning",
        hint: "The cheap-question skill — starts with 's', ends in '-ing'.",
      },
      {
        kind: "fill-blank",
        prompt:
          "Slow-wave sleep is the stage the passage also calls ______ sleep. (Type one word.)",
        answer: "deep",
        hint: "Paragraph (2), two commas after 'slow-wave sleep'.",
      },
      {
        kind: "practice",
        prompt:
          "Which brain structure acts as the fast, temporary memory store in the passage? Type the word.",
        answer: "hippocampus",
        hint: "Paragraph (2) — seahorse-shaped.",
      },
      {
        kind: "practice",
        prompt:
          "In which sleep stage does the hippocampus mainly replay the day's patterns? Type the two words as written in paragraph (2), hyphenated where it appears.",
        answer: "slow-wave sleep",
        hint: "The deep, synchronised stage.",
      },
      {
        kind: "short-answer",
        prompt:
          "Explain in two sentences why an all-night cram is 'doubly costly', using the passage's own mechanisms.",
        sampleAnswer:
          "The cram forfeits that night's slow-wave sleep, so the hippocampus never replays the day's patterns to the cortex for durable storage. It also weakens the next day's encoding, because paragraph (4) shows a sleep-deprived hippocampus forms fewer new memories — so the student both stores less and records less.",
      },
      {
        kind: "writing",
        prompt:
          "Design YOUR annotation system in 4 sentences: name your five margin marks (e.g. ? = confused, ★ = likely exam point, ▢ = evidence) and give a one-line reason for each. Then state the order you would answer cheap, medium and expensive questions and why.",
        sampleAnswer:
          "My marks: ①②③ paragraph numbers so questions can be located fast; three-word gists per paragraph as my argument map; circles around defined terms like 'consolidation' so vocab questions cost seconds; brackets around studies and figures as quiz fuel; and ? beside anything I don't follow so I return once, not five times. Order: cheap questions first from my brackets, medium two-anchor inferences next, expensive whole-map questions last — because my gist column is only complete at the end, and it is my best weapon on main-idea questions.",
        minWords: 30,
      },
    ],
  },
];
