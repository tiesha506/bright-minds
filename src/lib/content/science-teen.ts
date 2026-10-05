// ---------------------------------------------------------------------------
// BrightMinds — Science, Teen / Advanced (ages 14-15)
// Eight exam-oriented lessons: scientific inquiry, genetics, periodic table &
// reactions, Newton's laws, work/power/energy, matter & density, Earth & space
// (tectonics/climate/stars), and coordination & control. Real formulas, real
// numbers, real lab skills — pitched at GCSE-style rigour.
// ---------------------------------------------------------------------------
import type { Lesson } from "./types";

export const lessons: Lesson[] = [
  // -------------------------------------------------------------------------
  // 1. Scientific inquiry: designing real experiments
  // -------------------------------------------------------------------------
  {
    id: "science-teen-1",
    title: "Scientific Inquiry: Designing Real Experiments",
    emoji: "🧪",
    minutes: 18,
    intro:
      "Exam boards love asking you to critique an experiment — and so do real scientists. This lesson hands you the vocabulary and the eye for flaws that separate a good investigation from a lucky guess.",
    sections: [
      {
        heading: "Variables: the three you must be able to name",
        body:
          "Every fair test has three kinds of variables. The independent variable is what YOU deliberately change. The dependent variable is what you measure as a result. Control variables are everything else you hold constant so they cannot sneak in and confuse the result. If Priya tests how water temperature affects how fast sugar dissolves, the water temperature is independent, the time to dissolve is dependent, and the water volume, sugar mass and stirring rate must all be controlled.",
        example:
          "💧 100 mL water (controlled) · 🔥 temperature changed 20 °C → 60 °C (independent) · ⏱️ time measured in seconds (dependent)",
        tip:
          "Exam trick: the independent variable goes on the x-axis of your graph, the dependent variable on the y-axis. Every time.",
      },
      {
        heading: "Controls: two words, two meanings",
        body:
          "Students mix up two similar terms. A control variable is a quantity you keep the same. A control group is a comparison condition that gets NO treatment — plants given no fertiliser, patients given a placebo — so you can see what the treatment actually does compared with normal. Without a control group, you cannot tell whether the treatment caused the change or whether it would have happened anyway.",
        example:
          "🌱 20 seedlings with fertiliser vs 20 identical seedlings without = a control group. Same soil, water and light = control variables.",
      },
      {
        heading: "Reliability, validity and repeating yourself",
        body:
          "Reliability is about consistency: repeat each measurement at least three times, calculate the mean, and identify anomalies (results far from the pattern) so they can be rechecked rather than quietly copied. A smaller spread between repeats (a small range) means more reliable data. Validity is about whether the investigation actually answers the question: if you changed two variables at once, the data may be perfectly repeatable yet still invalid. A conclusion is only valid if it is supported by valid, controlled data.",
        example:
          "⏱️ Times of 1.8 s, 2.0 s and 1.6 s give a mean of 1.8 s and a range of 0.4 s. Shrink that range and your data gets more reliable.",
        tip:
          "Never delete an anomaly just because it is inconvenient. Remeasure it, and discuss it in your evaluation.",
      },
      {
        heading: "Picture the experiment: cress under lamps",
        body:
          "Imagine the set-up photo: three identical seed trays of cress sit on the same shelf, 20 seedlings each, same soil, watered equally every day. Lamp A hangs 10 cm above its tray, Lamp B at 20 cm, Lamp C at 30 cm — brightness is the independent variable. After 7 days the results graph appears: the x-axis reads 'distance of lamp (cm)', the y-axis 'mean seedling height (cm)'. Three bars step downward — 8.2 cm, then 5.1 cm, then 3.4 cm — each capped with a small error bar showing the spread of repeats. The downward staircase is the evidence: less light, less growth. A single plant would show nothing; 60 plants with repeats show a trend you can defend.",
      },
      {
        heading: "Investigate: the ruler-drop reaction test",
        body:
          "Test whether distraction changes reaction time. 1. Sit at a clear desk; a partner holds a 30 cm ruler vertically above your open hand, the 0 cm mark level with your thumb. 2. Without warning they drop it — catch it as fast as you can. 3. Read the catch distance: a fall of 20 cm corresponds to a reaction time of about 0.20 s, using t = √(2d ÷ 9.8). 4. Record 5 drops, then repeat while your partner talks to you or you count backwards from 50. 5. Compare the mean catch distances: longer distance = slower reaction.\n\n⚠️ Safety: stay seated, keep elbows off the edge, clear away cups and screens first, and use a plastic ruler — no standing swipes, no testing near anyone's face.",
      },
    ],
    vocab: [
      { word: "hypothesis", meaning: "A testable prediction linking the independent and dependent variables, e.g. 'more light makes cress grow taller'." },
      { word: "independent variable", meaning: "The one factor you deliberately change in an investigation." },
      { word: "dependent variable", meaning: "The factor you measure; its value depends on what you changed." },
      { word: "control variable", meaning: "A quantity kept identical throughout so it cannot affect the result." },
      { word: "control group", meaning: "A comparison set-up that receives no treatment, giving a baseline to judge the treatment against." },
      { word: "anomaly", meaning: "A measurement that does not fit the pattern; it should be rechecked and discussed, not hidden." },
    ],
    funFact:
      "In 1747, ship's surgeon James Lind gave twelve scurvy-stricken sailors six different treatments aboard HMS Salisbury — and the two given oranges and lemons recovered fastest. It is often called the first controlled clinical trial, and it ran before anyone knew vitamins existed.",
    quiz: [
      {
        question: "Noor grows cress seedlings under lamps of different brightness and measures their height after a week. What is the independent variable?",
        options: ["The height of the seedlings", "The amount of water given", "The brightness of the lamp", "The number of seeds in each tray"],
        answerIndex: 2,
        explanation: "The independent variable is the factor Noor deliberately changes: the lamp brightness (which sets the light intensity).",
        misconceptions: [
          "Height is what she MEASURES — that is the dependent variable.",
          "Water is kept identical so it cannot skew the result — a control variable.",
          "Yes! The lamp brightness is what she deliberately changes.",
          "Seed numbers are matched from the start — a control variable, not the tested factor.",
        ],
      },
      {
        question: "Why does a good experiment include a control group (for example, plants given no fertiliser)?",
        options: ["To make the experiment cheaper", "To provide a baseline for comparison", "To keep the temperature constant", "To use up spare materials"],
        answerIndex: 1,
        explanation: "The control group shows what happens WITHOUT the treatment, so any difference can be attributed to the treatment itself.",
        misconceptions: [
          "Cost is not a scientific reason — controls exist for the comparison they provide.",
          "Yes! Without the untreated baseline you cannot tell whether the treatment did anything.",
          "Temperature is a control VARIABLE, not a control group — different idea entirely.",
          "Controls are essential, not housekeeping — they anchor the whole comparison.",
        ],
      },
      {
        question: "Diego times a reaction five times: 0.31, 0.33, 0.32, 0.30 and 0.32 s. What is the MAIN reason for repeating readings?",
        options: ["To reduce the effect of random error", "To make the experiment take longer", "To confirm the first reading is always right", "To create anomalies to discuss"],
        answerIndex: 0,
        explanation: "Random errors pull readings up and down; averaging several repeats cancels much of that scatter out (mean = 1.58 ÷ 5 = 0.316 s).",
        misconceptions: [
          "Yes! Repeats plus a mean damp down the random ups and downs.",
          "Time cost is irrelevant — the point is statistical, not scheduling.",
          "The first reading has no special status — all five count equally in the mean.",
          "Anomalies are a nuisance to be checked, never the goal of repeating.",
        ],
      },
      {
        question: "Which change would most improve the RELIABILITY of Zara's results?",
        options: ["Using a longer ruler", "Writing the results in a neat table", "Testing only the participants who seem fastest", "Repeating each measurement and calculating the mean"],
        answerIndex: 3,
        explanation: "Reliability means consistent, repeatable data — repeats averaged into a mean are the standard fix for random scatter.",
        misconceptions: [
          "A longer ruler may improve precision, but reliability comes from repetition.",
          "A tidy table presents data; it does not make the data more trustworthy.",
          "Cherry-picking participants biases the sample — the opposite of good practice.",
          "Yes! Repeat, average, and compare the spread — that is the reliability recipe.",
        ],
      },
      {
        question: "A website claims 'chewing gum doubles exam scores', based on one student who chewed gum. What is the biggest problem with the evidence?",
        options: [
          "One student with no control group — many other factors could explain the score",
          "The experiment needed more chewing gum",
          "Exam scores cannot be measured scientifically",
          "The study should have lasted exactly one week",
        ],
        answerIndex: 0,
        explanation: "A single participant with no comparison group is anecdote, not evidence — revision, mood or luck could equally explain the score.",
        misconceptions: [
          "Yes! Tiny sample plus no control means the claim cannot be separated from coincidence.",
          "The quantity of gum is beside the point — the design is the problem.",
          "Scores are perfectly measurable; the weakness is the sample and missing control.",
          "Duration is not the flaw — the lack of any comparison is.",
        ],
      },
    ],
    worksheet: [
      {
        kind: "fill-blank",
        prompt: "The variable you deliberately change in a fair test is the ______ variable.",
        answer: "independent",
      },
      {
        kind: "practice",
        prompt: "Kai times one pendulum swing three times: 1.8 s, 2.0 s and 1.6 s. Calculate the mean time, in seconds.",
        answer: "1.8",
        hint: "(1.8 + 2.0 + 1.6) ÷ 3",
      },
      {
        kind: "practice",
        prompt: "Using the same three times, what is the range of Kai's readings, in seconds?",
        answer: "0.4",
        hint: "largest − smallest",
      },
      {
        kind: "fill-blank",
        prompt: "A measurement that does not fit the overall pattern is called an ______.",
        answer: "anomaly",
      },
      {
        kind: "short-answer",
        prompt:
          "A student tests plant food on one plant on a sunny windowsill and compares it with a plant in a dark cupboard. Explain why the conclusions will be unreliable.",
        sampleAnswer:
          "Two variables differ at once: the plant food AND the light. Any growth difference could come from either, so the test is not fair. The plants should sit side by side in identical light and temperature, with the same water — only the plant food should change — and several plants per group should be measured to reduce random error.",
      },
      {
        kind: "fill-blank",
        prompt: "Repeating measurements and calculating the ______ reduces the effect of random error.",
        answer: "mean",
      },
    ],
    challenge: {
      prompt:
        "Ads claim 'FocusFizz' improves reaction time. Sofia tested it on herself: one morning with no drink, one evening after drinking FocusFizz — and she scored better at night. Identify the flaws in her 'trial', then design a proper one.",
      hint: "Look for variables she changed without noticing, the sample size, and whether anyone knew which drink was which.",
      steps: [
        "List what differed between the two sessions besides the drink (time of day, tiredness, practice effect, expectation).",
        "Note the sample: n = 1, tested twice — no comparison group, no repeats across people.",
        "Spot the bias: Sofia knew when she had the drink, so expectation alone could improve her score.",
        "Redesign: at least 20 volunteers, randomly split into two groups — FocusFizz vs an identical-looking placebo drink.",
        "Test everyone at the same time of day with a ruler-drop protocol, testers and participants 'blind' to who got what, 5 drops each, compare the two group means.",
      ],
      answer:
        "Her trial is invalid: the drink was confounded with time of day and practice, the sample was one person, and knowing she had the drink invites a placebo effect. A valid trial needs a decent sample, random assignment, a placebo control, identical test conditions and blinding.",
      answerWhy:
        "Because several variables changed at once, the data — however consistent — cannot show that FocusFizz caused the improvement. Randomisation spreads out confounders, the placebo control isolates the drink's effect, and blinding removes expectation bias. That is exactly how real clinical trials are built.",
    },
  },

  // -------------------------------------------------------------------------
  // 2. Genetics: DNA, genes and inheritance
  // -------------------------------------------------------------------------
  {
    id: "science-teen-2",
    title: "Genetics: DNA, Genes and Inheritance",
    emoji: "🧬",
    minutes: 18,
    intro:
      "Every one of your cells carries a three-billion-letter instruction manual written in DNA. Learn how the code is organised, shuffled and passed on — and how to predict traits with a Punnett square, the way examiners want.",
    sections: [
      {
        heading: "DNA: the code in a double helix",
        body:
          "DNA is a double helix — picture a ladder twisted lengthways into a spiral. The two sides of the ladder are alternating sugar and phosphate units, and each rung is a pair of bases locked together by complementary pairing: adenine (A) always pairs with thymine (T), and cytosine (C) always pairs with guanine (G). Because of this rule, each strand can act as a template for an exact copy. The order of the bases is a four-letter code, and a section of the code that instructs a protein is a gene.",
        example:
          "🪜 Strand: …A T G C… pairs with …T A C G… — snap the ladder apart and each half rebuilds its missing partner.",
        tip: "Write the pairs as A–T and C–G and you can complete any strand from its partner.",
      },
      {
        heading: "Genes, alleles and variation",
        body:
          "Human body cells contain 23 pairs of chromosomes — 46 in total — with thousands of genes lined up along them. Different versions of the same gene are called alleles, and your genotype is the pair of alleles you carry (like TT, Tt or tt). Variation comes in two flavours examiners ask about: continuous variation (height, mass, hand span — any value across a range, influenced by genes AND environment) and discontinuous variation (blood group, pea flower colour — distinct categories set by genes).",
        example:
          "Class survey: heights spread smoothly from 1.5 m to 1.9 m = continuous. Blood groups sort into just A, B, AB and O = discontinuous.",
      },
      {
        heading: "Dominant, recessive and Punnett squares",
        body:
          "If two alleles differ, the dominant one is expressed and the recessive one is hidden — but it can reappear in the next generation. A Punnett square is a 2 × 2 grid of all possible gamete combinations. Take Mendel's pea plants: T = tall (dominant), t = short (recessive). Cross two heterozygous tall plants, Tt × Tt: the grid fills with TT, Tt, Tt, tt. So the genotype ratio is 1 : 2 : 1 and the phenotype ratio is 3 tall : 1 short — a 25% chance of short offspring from two tall parents. That surprise is exactly why recessive traits can skip generations.",
        example:
          "🌱 Tt × Tt → 25% TT (tall), 50% Tt (tall), 25% tt (short) → 3 : 1 tall to short.",
        tip: "Ratio check: 3 : 1 has 4 parts; 25% of offspring being tt must match 1 of those 4 parts.",
      },
      {
        heading: "Picture the figure: a pedigree chart",
        body:
          "Geneticists track inheritance on a family tree called a pedigree. Picture it: circles are females, squares are males, horizontal lines join parents, and vertical lines drop to children. Shaded shapes show people who express the trait. Suppose a shaded child sits under two unshaded parents — that single clue does heavy lifting: the trait must be recessive (the parents must be carriers, heterozygous, and each passed on the recessive allele), and each unshaded sibling of the affected child has a 2-in-3 chance of being a carrier. Reading shapes and shading like this is a standard exam skill.",
      },
      {
        heading: "Investigate: extract strawberry DNA",
        body:
          "You can see real DNA in ten minutes. 1. Mash one strawberry in a bag with 100 mL of water, a squirt of washing-up liquid and a pinch of salt — the soap dissolves cell membranes and the salt strips proteins off the DNA. 2. Strain the mush through a cloth into a clear glass, keeping the foam out. 3. Tilt the glass and slowly pour in an equal volume of ice-cold rubbing alcohol so it floats on top. 4. Wait: white, cloudy strands will gather at the boundary — that is DNA. 5. Spool it out with a cocktail stick.\n\n⚠️ Safety: wear eye protection, use alcohol only under adult supervision and away from flames (it is flammable), do not taste anything, and wash hands afterwards.",
      },
    ],
    vocab: [
      { word: "DNA", meaning: "The double-helixed molecule that stores genetic instructions in the sequence of its bases A, T, C and G." },
      { word: "gene", meaning: "A section of DNA that codes for a protein and helps determine a characteristic." },
      { word: "allele", meaning: "A different version of the same gene, such as T or t for plant height." },
      { word: "genotype", meaning: "The pair of alleles an organism carries for a gene (e.g. TT, Tt or tt)." },
      { word: "phenotype", meaning: "The observable characteristics produced by the genotype interacting with the environment." },
      { word: "dominant", meaning: "An allele that is expressed even when only one copy is present; its hidden partner is recessive." },
    ],
    funFact:
      "Stretched out, the DNA in a single one of your cells would measure about 2 metres — yet it is coiled to fit inside a nucleus roughly 0.006 mm across. That packing ratio beats anything engineers have built.",
    quiz: [
      {
        question: "In a DNA molecule, the base guanine (G) always pairs with…",
        options: ["Adenine (A)", "Cytosine (C)", "Thymine (T)", "Uracil (U)"],
        answerIndex: 1,
        explanation: "Complementary base pairing is strict: C pairs with G, and A pairs with T.",
        misconceptions: [
          "A pairs with T, not G — memorise the two pairs: A–T and C–G.",
          "Yes! Cytosine always pairs with guanine.",
          "Thymine pairs with adenine — the other half of the rule.",
          "Uracil replaces thymine in RNA, not in DNA.",
        ],
      },
      {
        question: "Two heterozygous tall pea plants (Tt × Tt) are crossed. What fraction of the offspring do you expect to be short (tt)?",
        options: ["None — tall is dominant", "1/2", "1/4", "3/4"],
        answerIndex: 2,
        explanation: "The Punnett square gives TT, Tt, Tt and tt — so 1 in 4 (25%) are short.",
        misconceptions: [
          "Dominance hides t in Tt plants, but tt offspring are still possible.",
          "Half would be right for Tt × tt — draw the square for Tt × Tt.",
          "Yes! TT, Tt, Tt, tt — one of the four boxes is tt.",
          "3/4 are TALL (TT or Tt). Only 1/4 — the tt box — is short.",
        ],
      },
      {
        question: "What exactly is an allele?",
        options: ["A different version of the same gene", "A type of protein", "A chromosome found only in gametes", "The scientific name for DNA"],
        answerIndex: 0,
        explanation: "Alleles are variant forms of one gene — T and t are alleles of the same height gene.",
        misconceptions: [
          "Yes! Same gene, different version — that is an allele.",
          "Genes code FOR proteins; alleles are versions of the gene itself.",
          "Gametes carry alleles, but an allele is not a chromosome.",
          "DNA is the whole molecule; an allele is one version of a section of it.",
        ],
      },
      {
        question: "A plant with genotype tt is short, while Tt plants are tall. From this you can tell that…",
        options: ["t is dominant over T", "Height is a discontinuous variable in humans", "The two plants are clones", "T is dominant over t"],
        answerIndex: 3,
        explanation: "Whichever allele shows in the heterozygote is dominant: Tt plants are tall, so T dominates t.",
        misconceptions: [
          "If t were dominant, Tt plants would be short — they are not.",
          "Height in humans is continuous, and the question is about pea genetics anyway.",
          "They differ in height, so they cannot be identical clones.",
          "Yes! The allele expressed in the heterozygote (Tt = tall) is the dominant one.",
        ],
      },
      {
        question: "Which feature shows DISCONTINUOUS variation?",
        options: ["Hand span", "Blood group", "Body mass", "Height"],
        answerIndex: 1,
        explanation: "Discontinuous variation sorts into distinct categories with no in-between values — like blood groups A, B, AB and O.",
        misconceptions: [
          "Span can be any value in a range — that is continuous.",
          "Yes! Blood groups fall into separate categories with no intermediates.",
          "Mass varies smoothly across a range — continuous.",
          "Height is the classic example of continuous variation.",
        ],
      },
    ],
    worksheet: [
      {
        kind: "fill-blank",
        prompt: "In DNA, adenine always pairs with ______, and cytosine always pairs with guanine.",
        answer: "thymine",
      },
      {
        kind: "practice",
        prompt: "In a Tt × tt cross, what percentage of offspring will be short (tt)?",
        answer: "50",
        hint: "Tt gives gametes T and t; tt gives only t. Fill the two-box cross.",
      },
      {
        kind: "practice",
        prompt: "How many chromosomes are there in one human body cell?",
        answer: "46",
        hint: "23 pairs",
      },
      {
        kind: "fill-blank",
        prompt: "The pair of alleles an organism carries (such as Tt) makes up its ______.",
        answer: "genotype",
      },
      {
        kind: "short-answer",
        prompt:
          "Both of Priya's parents can roll their tongues, but Priya cannot. Use a Punnett square to explain how this is possible (let R = roller, dominant; r = non-roller).",
        sampleAnswer:
          "Both parents must be carriers, Rr. The cross Rr × Rr gives RR, Rr, Rr and rr. Priya inherited r from each parent, giving rr (25% chance), so the recessive trait appeared even though neither parent shows it.",
      },
      {
        kind: "fill-blank",
        prompt: "The visible characteristics produced by a genotype are called the ______.",
        answer: "phenotype",
      },
    ],
    challenge: {
      prompt:
        "Two carriers of the recessive allele for a trait (Tt × Tt) plan to have four children. What is the probability that ALL FOUR children show the recessive trait (tt)? Give your answer as a fraction and as a percentage, and explain why it is so small.",
      hint: "First find the chance of tt for ONE child, then remember each child is an independent event — like four coin flips landing the same way.",
      steps: [
        "From the Tt × Tt square, P(tt) for one child = 1/4.",
        "Treat the four children as independent events, so multiply probabilities: (1/4) × (1/4) × (1/4) × (1/4).",
        "Compute the fraction: (1/4)⁴ = 1/256.",
        "Convert to a percentage: 1 ÷ 256 × 100 ≈ 0.39%.",
        "Sanity-check with odds: 1 in 256 is rarer than guessing one named face in a school of 256 students.",
      ],
      answer: "1/256, which is about 0.39% (roughly 1 in 256 families of four children).",
      answerWhy:
        "Each child is a separate, independent 'draw' from the 1 TT : 2 Tt : 1 tt spread, so the one-in-four chance must be multiplied four times: (1/4)⁴ = 1/256 ≈ 0.39%. Independent events multiply — the same logic that makes four heads in a row much rarer than one.",
    },
  },

  // -------------------------------------------------------------------------
  // 3. Chemistry: the periodic table and chemical reactions
  // -------------------------------------------------------------------------
  {
    id: "science-teen-3",
    title: "Chemistry: The Periodic Table and Chemical Reactions",
    emoji: "⚗️",
    minutes: 19,
    intro:
      "The periodic table is chemistry's map and reactions are its grammar. Master the group trends, balance equations without panic, and you can predict what a reaction will produce — including its energy bill.",
    sections: [
      {
        heading: "Groups, periods and the trends that matter",
        body:
          "Elements are arranged by atomic number. Vertical columns are groups: elements in a group share the same number of outer-shell electrons, which is why they react similarly (Group 1 metals have 1 outer electron, Group 7 halogens have 7). Horizontal rows are periods, and the period number tells you how many shells are occupied. Trends run both ways: down Group 1, reactivity INCREASES because the outer electron sits farther from the nucleus and is lost more easily; down Group 7, reactivity DECREASES because gaining an electron gets harder as the shell fills farther out. Group 0 (noble gases) have full outer shells, so they barely react at all.",
        example:
          "🧂 Sodium (Group 1) fizzes in water; potassium (also Group 1, but lower) ignites — further down, more violent.",
        tip: "Group number ≈ outer electrons; period number = number of shells. Two facts, half a page of exam marks.",
      },
      {
        heading: "Balancing equations, step by step",
        body:
          "Atoms are never created or destroyed in a reaction (conservation of mass), so every symbol equation must have the same number of each atom on both sides. Method: 1. Write the correct formulae — never change small subscripts like the 2 in O₂. 2. Count each element on both sides. 3. Adjust only the big coefficients in front of formulae. 4. Re-count everything. Take burning magnesium: Mg + O₂ → MgO has 2 O left but 1 O right, so put a 2 in front of MgO, then a 2 in front of Mg to rebalance: 2Mg + O₂ → 2MgO. Two magnesiums and two oxygens each side — balanced.",
        example:
          "CH₄ + 2O₂ → CO₂ + 2H₂O: left has 1 C, 4 H, 4 O; right has 1 C, 4 H, 4 O. ✓",
      },
      {
        heading: "Exothermic or endothermic? Energy in, energy out",
        body:
          "Exothermic reactions RELEASE energy to the surroundings, so the temperature of the surroundings rises — combustion, neutralisation, oxidation, hand warmers. Endothermic reactions TAKE IN energy, so the surroundings cool — photosynthesis, thermal decomposition, sports injury cold packs, citric acid reacting with bicarbonate of soda. Signs that a chemical reaction happened at all: a gas produced (fizzing), a colour change, a temperature change, or a new solid (precipitate). One caution worthy of exam marks: a temperature change alone is not proof of a reaction, because dissolving some substances heats or cools water without any new substance forming.",
        example:
          "🔥 Hand warmer: exothermic (warms you) · 🧊 Sports cold pack: endothermic (absorbs heat from your ankle).",
      },
      {
        heading: "Picture the figures: the energy diagram and the table's map",
        body:
          "Two diagrams dominate this topic. First, the reaction energy diagram: the vertical axis is energy, the horizontal axis is reaction progress. For an exothermic reaction, the reactants sit on a HIGH platform and the products on a LOWER one — the drop between them is the energy given out — with a hump in between labelled the activation energy, the minimum energy needed to start the reaction. An endothermic diagram is the same picture upside down: products above reactants, an uphill climb. Second, the periodic table itself: metals fill the left and centre with a zig-zag staircase line separating them from non-metals on the right, Group 1 hugging the left edge, Group 0 pinned against the right, and the periods running as rows beneath one another.",
      },
      {
        heading: "Investigate: catch a reaction cooling things down",
        body:
          "Prove an endothermic reaction with a thermometer. 1. Put 50 mL of water in a beaker and record its temperature (about 20 °C). 2. Add one teaspoon of sodium bicarbonate, stir until dissolved, and record again — expect little change. 3. Now add one teaspoon of citric acid to the same solution, stir, and watch the thermometer: the temperature falls by several degrees because the reaction absorbs energy from the water. 4. Compare with a control: dissolve a teaspoon of table sugar in fresh 50 mL of water — sugar dissolving changes the temperature only slightly, showing the citric-acid result is a genuine reaction, not just dissolving.\n\n⚠️ Safety: wear goggles, work on a spill-proof surface, never taste any of the chemicals, and rinse spills promptly.",
      },
    ],
    vocab: [
      { word: "group", meaning: "A vertical column of the periodic table; its elements share the same number of outer-shell electrons and react similarly." },
      { word: "period", meaning: "A horizontal row of the periodic table; the period number equals the number of occupied electron shells." },
      { word: "exothermic", meaning: "A reaction that releases energy to the surroundings, raising their temperature." },
      { word: "endothermic", meaning: "A reaction that absorbs energy from the surroundings, lowering their temperature." },
      { word: "conservation of mass", meaning: "The law that atoms are neither created nor destroyed in a reaction, so total mass stays constant and equations must balance." },
      { word: "activation energy", meaning: "The minimum energy needed for reactant particles to react — the hump on the energy diagram." },
    ],
    funFact:
      "Mendeleev's 1869 periodic table left deliberate gaps for undiscovered elements — and he predicted their properties. When gallium was found in 1875, its melting point, density and reactions matched his 'eka-aluminium' prediction almost exactly. A theory so good it found elements nobody had seen.",
    quiz: [
      {
        question: "Elements in the same GROUP of the periodic table…",
        options: ["Have the same number of occupied shells", "Have similar masses", "Have the same number of electrons in their outer shell", "Are all metals"],
        answerIndex: 2,
        explanation: "Same group means the same number of outer-shell electrons — the reason group members react in similar ways.",
        misconceptions: [
          "That describes a PERIOD (row) — shells increase as you go down a group.",
          "Masses change steadily down a group; it is the outer electrons that match.",
          "Yes! Same group, same outer electrons, similar chemistry.",
          "Groups run through metals AND non-metals — Group 7 and Group 0 are non-metals.",
        ],
      },
      {
        question: "As you go DOWN Group 1 (lithium → sodium → potassium), the metals…",
        options: ["Become MORE reactive", "Become LESS reactive", "Keep exactly the same reactivity", "Turn into non-metals"],
        answerIndex: 0,
        explanation: "The single outer electron sits farther from the nucleus down the group, so it is lost more easily — reactivity increases.",
        misconceptions: [
          "Yes! Bigger atoms lose their outer electron more easily — potassium beats sodium beats lithium.",
          "That is Group 7's trend — the halogens weaken going down; Group 1 strengthens.",
          "There is a clear trend: potassium reacts far more violently with water than lithium.",
          "They stay metals — only their reactivity changes.",
        ],
      },
      {
        question: "Balance the equation: Mg + O₂ → MgO. The coefficient needed in front of Mg is…",
        options: ["1 — it is already balanced", "3", "4", "2"],
        answerIndex: 3,
        explanation: "2Mg + O₂ → 2MgO balances: 2 Mg and 2 O atoms on each side.",
        misconceptions: [
          "Count the oxygens: 2 on the left, only 1 on the right — not balanced yet.",
          "Try 2Mg + O₂ → 2MgO and re-count every atom.",
          "Four would leave the magnesium unbalanced — re-count from scratch.",
          "Yes! Two Mg on each side, two O on each side.",
        ],
      },
      {
        question: "Amara mixes two clear solutions; the tube warms up and a pale solid appears. These observations show the reaction is…",
        options: ["Endothermic", "Exothermic", "A change of state", "Just dissolving"],
        answerIndex: 1,
        explanation: "Heat released to the surroundings plus a new solid forming — the tube warming means energy is given out: exothermic.",
        misconceptions: [
          "Endothermic reactions make the surroundings COLDER, not warmer.",
          "Yes! Warming surroundings = energy released = exothermic.",
          "Changes of state (melting, boiling) form no new substance — a new solid is a reaction.",
          "Dissolving alone rarely creates a new solid; a precipitate signals a chemical change.",
        ],
      },
      {
        question: "Which reaction is ENDOTHERMIC?",
        options: ["Burning methane", "Neutralising an acid with an alkali", "Photosynthesis", "Freezing water"],
        answerIndex: 2,
        explanation: "Photosynthesis takes in light energy to build glucose from CO₂ and water — a textbook endothermic change.",
        misconceptions: [
          "Combustion pours out heat and light — strongly exothermic.",
          "Neutralisation warms the mixture — exothermic.",
          "Yes! It continuously absorbs energy to build glucose.",
          "Sneaky — but freezing GIVES OUT energy as particles lock into place, so it is exothermic.",
        ],
      },
    ],
    worksheet: [
      {
        kind: "fill-blank",
        prompt: "Vertical columns of the periodic table are called ______.",
        answer: "groups",
      },
      {
        kind: "fill-blank",
        prompt: "A reaction that releases energy and warms the surroundings is ______.",
        answer: "exothermic",
      },
      {
        kind: "practice",
        prompt: "In the balanced equation 2H₂ + O₂ → 2H₂O, how many oxygen atoms are on each side?",
        answer: "2",
        hint: "Count the O in O₂, then the O's inside 2H₂O.",
      },
      {
        kind: "practice",
        prompt: "Calculate the relative formula mass (Mr) of MgO, using Mg = 24 and O = 16.",
        answer: "40",
        hint: "Add one Mg and one O.",
      },
      {
        kind: "short-answer",
        prompt:
          "Diego drops zinc into hydrochloric acid: bubbles form, the tube warms up and the zinc shrinks away. Give three pieces of evidence that a chemical reaction has happened.",
        sampleAnswer:
          "1) Bubbles show a new gas (hydrogen) is produced. 2) The warming shows energy is released to the surroundings, so it is exothermic. 3) The zinc disappears because it is consumed, forming a new substance (zinc chloride) — new substances mean a chemical reaction.",
      },
      {
        kind: "practice",
        prompt: "How many electrons sit in the outer shell of every Group 2 element?",
        answer: "2",
      },
    ],
    challenge: {
      prompt:
        "Propane (C₃H₈) burns in oxygen to give carbon dioxide and water: C₃H₈ + O₂ → CO₂ + H₂O. Balance the equation completely, showing at each step which element you are counting, and verify every atom at the end.",
      hint: "Balance carbon first, then hydrogen, then let oxygen fall where it must — and never touch the subscripts.",
      steps: [
        "Carbon: 3 C on the left (in C₃H₈) → put a 3 in front of CO₂, giving 3 C on the right.",
        "Hydrogen: 8 H on the left → water carries H one at a time, so put a 4 in front of H₂O, giving 8 H on the right.",
        "Oxygen: right side now has 3 × 2 = 6 O (in CO₂) plus 4 × 1 = 4 O (in H₂O) = 10 O total.",
        "Left side needs 10 O atoms: O₂ supplies 2 each, so 10 ÷ 2 = 5 → put a 5 in front of O₂.",
        "Verify: left = 3 C, 8 H, 10 O; right = 3 C, 8 H, 6 + 4 = 10 O. ✓",
      ],
      answer: "C₃H₈ + 5O₂ → 3CO₂ + 4H₂O",
      answerWhy:
        "Every atom is accounted for: 3 carbon, 8 hydrogen and 10 oxygen atoms on each side, so mass is conserved. The order (C, then H, then O) works because changing the O₂ coefficient at the end never disturbs the carbon or hydrogen counts.",
    },
  },

  // -------------------------------------------------------------------------
  // 4. Forces and motion: Newton's laws in action
  // -------------------------------------------------------------------------
  {
    id: "science-teen-4",
    title: "Forces and Motion: Newton's Laws in Action",
    emoji: "🚀",
    minutes: 19,
    intro:
      "Newton's three laws explain everything from seatbelts to rockets, and exam papers lean on F = ma hard. Learn to find the resultant force first — after that, the numbers fall into place.",
    sections: [
      {
        heading: "First law: no resultant force, no change",
        body:
          "A resultant force is the single overall force after all forces combine: forces in the same direction add, opposite directions subtract. Newton's first law says when the resultant force on an object is ZERO, its velocity does not change — a stationary object stays still, and a moving object keeps moving at the same speed in the same direction. That surprises people, because on Earth friction usually stops things; in deep space a thrown ball would coast forever. Inertia is the name for this reluctance to change velocity, and it scales with mass: heavier objects need bigger forces to change their motion, which is why seatbelts matter so much in a heavy, fast-moving car.",
        example:
          "🚗 Cruising at 70 km/h with the engine exactly balancing drag: resultant force = 0, so the car holds 70 km/h without speeding up.",
        tip: "'Constant velocity' and 'stationary' both mean resultant force = 0. Examiners reward you for saying why.",
      },
      {
        heading: "Second law: F = ma",
        body:
          "Newton's second law quantifies change: resultant force = mass × acceleration (F = ma), with force in newtons (N), mass in kilograms and acceleration in m/s². Two worked examples. One: a 6 kg trolley pushed with a 24 N resultant force accelerates at a = F ÷ m = 24 ÷ 6 = 4 m/s². Two: a 300 kg go-kart has thrust 800 N and drag 200 N, so the resultant is 600 N and a = 600 ÷ 300 = 2 m/s². Note the sequence examiners want: find the RESULTANT force first, then divide by the mass.",
        example:
          "🛒 Resultant 24 N on 6 kg → 4 m/s². Double the force, same mass → 8 m/s². Double the mass, same force → 2 m/s².",
      },
      {
        heading: "Third law and terminal speed",
        body:
          "Newton's third law: forces come in pairs — when object A pushes object B, B pushes A equally and oppositely, and the two forces act on DIFFERENT objects. A rocket pushes exhaust gas down; the gas pushes the rocket up. Terminal velocity combines all three laws: a skydiver's weight is constant, but drag grows with speed. At first the resultant force is large and she accelerates hard; as she speeds up, drag grows and the resultant (and so the acceleration) shrinks; when drag finally equals her weight, the resultant is zero and — first law — she falls at a constant terminal speed. Opening the parachute multiplies drag, suddenly making the resultant upward, so she slows to a new, much lower terminal velocity.",
        example:
          "🪂 70 kg skydiver: weight ≈ 700 N. Terminal velocity arrives when drag = 700 N and resultant = 0 N.",
      },
      {
        heading: "Picture the figures: free-body diagram and velocity–time graph",
        body:
          "Picture the skydiver drawn as a simple box with two arrows: a 700 N arrow pointing DOWN labelled 'weight' and a 700 N arrow pointing UP labelled 'drag' — equal lengths, because at terminal velocity the forces balance. Earlier in the fall, the down arrow is longer; after the parachute opens, the up arrow is longer. Below it, the velocity–time graph for the whole jump: the curve starts steep (large acceleration), bends over as drag builds (shrinking acceleration), then flattens into a horizontal plateau at the first terminal velocity. When the parachute opens, the curve dips sharply, then flattens again at a much lower terminal speed. Gradient = acceleration; a flat section = zero resultant force.",
      },
      {
        heading: "Investigate: balloon rocket lab",
        body:
          "Watch the third law in action. 1. Thread a drinking straw onto a 5 m length of string and stretch the string tightly across the room between two chairs. 2. Inflate a long balloon, hold the neck closed (do not tie it) and tape the balloon to the straw. 3. Release and time the run; measure the distance travelled with a tape measure. 4. Repeat 3 times per balloon size, then repeat with a bigger and a smaller balloon — the air pushed backwards is the action, the thrust on the balloon is the reaction. 5. Plot mean distance against balloon size and explain the trend using resultant force and how quickly the air runs out.\n\n⚠️ Safety: wear eye protection while inflating, keep balloons away from anyone with a latex allergy, launch along the string away from people's faces, and clear the runway of trip hazards.",
      },
    ],
    vocab: [
      { word: "resultant force", meaning: "The single force that has the same effect as all the individual forces combined." },
      { word: "inertia", meaning: "The tendency of an object to keep its current velocity; the more massive the object, the greater its inertia." },
      { word: "newton (N)", meaning: "The unit of force; 1 N gives a 1 kg mass an acceleration of 1 m/s²." },
      { word: "acceleration", meaning: "The rate of change of velocity, measured in m/s²." },
      { word: "air resistance (drag)", meaning: "The frictional force opposing motion through air; it grows as speed grows." },
      { word: "terminal velocity", meaning: "The constant speed reached when drag equals weight, giving zero resultant force." },
    ],
    funFact:
      "The Saturn V Moon rocket's first stage produced about 34 million newtons of thrust at liftoff — roughly the weight of 3,500 tonnes pressing upward — making it still one of the most powerful rockets ever flown.",
    quiz: [
      {
        question: "The resultant force on a moving car is zero. The car will…",
        options: ["Slow down and stop", "Keep moving at constant velocity", "Speed up", "Change direction"],
        answerIndex: 1,
        explanation: "Newton's first law: with zero resultant force, velocity stays exactly the same — same speed, same direction.",
        misconceptions: [
          "Slowing needs a resultant force backwards — but the resultant is zero.",
          "Yes! No resultant force means no change in velocity.",
          "Speeding up needs a resultant force in the direction of motion.",
          "Changing direction is an acceleration — that requires a force.",
        ],
      },
      {
        question: "A resultant force of 12 N acts on a 4 kg cart. Its acceleration is…",
        options: ["48 m/s²", "0.33 m/s²", "16 m/s²", "3 m/s²"],
        answerIndex: 3,
        explanation: "a = F ÷ m = 12 ÷ 4 = 3 m/s².",
        misconceptions: [
          "That's F × m — the formula divides: a = F ÷ m.",
          "You divided upside down (4 ÷ 12). Keep it as F ÷ m.",
          "Adding force and mass gives a meaningless number — divide 12 by 4.",
          "Yes! 12 ÷ 4 = 3 m/s².",
        ],
      },
      {
        question: "A rocket engine pushes exhaust gases downward. The gases push the rocket upward. This is an example of…",
        options: ["Newton's third law", "Newton's first law", "Terminal velocity", "Inertia"],
        answerIndex: 0,
        explanation: "Equal and opposite forces acting on two different objects — the classic third-law pair.",
        misconceptions: [
          "Yes! Action–reaction pairs act on different objects: gas and rocket.",
          "The first law is about zero resultant force and unchanged velocity.",
          "Terminal velocity is about drag balancing weight — not this interaction.",
          "Inertia resists changes of motion; the paired push is third-law physics.",
        ],
      },
      {
        question: "Marco has reached terminal velocity during a skydive. The drag force on him…",
        options: ["Is zero", "Is greater than his weight", "Equals his weight", "Keeps increasing"],
        answerIndex: 2,
        explanation: "Terminal velocity means zero resultant force, so drag must exactly balance his weight.",
        misconceptions: [
          "Drag is not zero — it has GROWN until it balances his weight.",
          "If drag were greater, he would decelerate — but he is falling steadily.",
          "Yes! Balanced forces: drag = weight, resultant = 0, constant speed.",
          "Drag stops growing once the speed stops changing — that is what 'terminal' means.",
        ],
      },
      {
        question: "A car's engine drives it forward with 800 N while air resistance and friction total 300 N backwards. The resultant force is…",
        options: ["1100 N forward", "500 N forward", "500 N backward", "800 N forward"],
        answerIndex: 1,
        explanation: "Opposite forces subtract: 800 − 300 = 500 N forward, so the car accelerates forward.",
        misconceptions: [
          "Forces in opposite directions subtract — they do not add.",
          "Yes! 800 − 300 = 500 N forward.",
          "The larger force wins — the net push is still forward.",
          "That ignores the 300 N of resistance acting backwards.",
        ],
      },
    ],
    worksheet: [
      {
        kind: "fill-blank",
        prompt: "The single force with the same effect as all the forces acting together is the ______ force.",
        answer: "resultant",
      },
      {
        kind: "practice",
        prompt: "A resultant force of 20 N pushes a 4 kg trolley. Calculate its acceleration, in m/s².",
        answer: "5",
        hint: "a = F ÷ m",
      },
      {
        kind: "practice",
        prompt: "At terminal velocity, a skydiver's weight is 550 N. What is the size of the drag force, in newtons?",
        answer: "550",
        hint: "Terminal velocity = balanced forces.",
      },
      {
        kind: "fill-blank",
        prompt: "The tendency of an object to keep its current motion is called ______.",
        answer: "inertia",
      },
      {
        kind: "short-answer",
        prompt:
          "Explain why standing passengers lurch FORWARD when a bus brakes hard, and name the safety feature that counters it.",
        sampleAnswer:
          "Their bodies keep moving at the bus's original velocity — inertia — while the bus slows beneath them, so they appear thrown forward. A seatbelt (or holding a rail) supplies the backward resultant force needed to decelerate their bodies with the bus.",
      },
      {
        kind: "practice",
        prompt: "A 60 kg sprinter accelerates out of the blocks at 5 m/s². What resultant force, in newtons, do her legs produce?",
        answer: "300",
        hint: "F = m × a",
      },
    ],
    challenge: {
      prompt:
        "Kai's model rocket has mass 2 kg, so it weighs 20 N (g = 10 N/kg). Its engine produces 44 N of thrust straight up, and air resistance averages 4 N downward during the burn. Calculate (a) the resultant force, (b) the acceleration, and (c) the rocket's speed 3.0 s after ignition, starting from rest.",
      hint: "Work in order: forces → resultant → acceleration → velocity. Keep 'up' positive and subtract BOTH downward forces.",
      steps: [
        "List the vertical forces: thrust 44 N up; weight 20 N down; air resistance 4 N down.",
        "Resultant force = 44 − 20 − 4 = 20 N upward.",
        "Acceleration: a = F ÷ m = 20 ÷ 2 = 10 m/s².",
        "Speed after 3.0 s from rest: v = a × t = 10 × 3.0 = 30 m/s.",
        "Check units and size: 30 m/s ≈ 108 km/h — fast but believable for a model rocket.",
      ],
      answer: "(a) 20 N upward, (b) 10 m/s², (c) 30 m/s after 3.0 s.",
      answerWhy:
        "All three vertical forces combine first: 44 N of thrust minus 20 N of weight minus 4 N of drag leaves a 20 N resultant upward. Dividing by the 2 kg mass gives the acceleration (20 ÷ 2 = 10 m/s²), and multiplying acceleration by the 3 s burn gives the change in velocity from rest (10 × 3 = 30 m/s). Forces → resultant → acceleration → velocity: exactly the chain examiners reward.",
    },
  },

  // -------------------------------------------------------------------------
  // 5. Energy: work, power and transformations
  // -------------------------------------------------------------------------
  {
    id: "science-teen-5",
    title: "Energy: Work, Power and Transformations",
    emoji: "⚡",
    minutes: 18,
    intro:
      "Energy never appears or vanishes — it just changes address, and the bill arrives in joules. Learn to calculate work, power and efficiency the way examiners (and engineers) do, and to spot where the 'lost' energy really goes.",
    sections: [
      {
        heading: "Work done = force × distance",
        body:
          "In physics, 'work' has a precise meaning: work done is the energy transferred by a force acting over a distance, W = F × d, measured in joules (1 J = 1 N·m). The force must act along the direction of motion. Push a crate with a steady 500 N over 3 m and you transfer W = 500 × 3 = 1500 J. But hold a heavy bag perfectly still and you do NO work in the physics sense — a big force, but zero distance — however much your arms ache (your muscles do internal work, which is why they tire). Raising a 600 N weight by 4 m transfers 2400 J into its gravitational store: that number is also the energy you must supply, minimum.",
        example:
          "📦 Push: 500 N × 3 m = 1500 J · 🧍 Holding still: 500 N × 0 m = 0 J",
        tip: "Convert to metres and newtons BEFORE multiplying — mixed units are the most common exam slip.",
      },
      {
        heading: "Power: the rate of doing work",
        body:
          "Power measures how FAST energy is transferred: P = E ÷ t, in watts (1 W = 1 J/s). The 1500 J crate push finished in 3 s delivers 1500 ÷ 3 = 500 W. Aisha, mass 55 kg (weight 550 N using g = 10 N/kg), climbs a 3 m staircase in 5 s: work done = 550 × 3 = 1650 J, so her useful power = 1650 ÷ 5 = 330 W. Walk the same stairs slowly and the work is identical — only the power changes. That is the whole distinction: energy says how much, power says how quickly.",
        example:
          "🏃 Same 1650 J in 10 s instead of 5 s → power halves to 165 W.",
      },
      {
        heading: "Efficiency and Sankey thinking",
        body:
          "No device transfers all its input energy usefully — friction, air resistance and electrical resistance always skim some into thermal (and often sound) stores. Efficiency = useful energy output ÷ total energy input × 100%. A motor receiving 200 J of electrical energy and delivering 150 J of movement has efficiency 150 ÷ 200 × 100 = 75%; the missing 50 J warms the motor. Because some energy always spreads out to heat the surroundings, no device can ever reach 100% — that is not bad engineering, it is physics.",
        example:
          "💡 Old filament bulb: about 10% light, 90% heat. 💻 Laptop charger losses: warm brick, same story.",
      },
      {
        heading: "Picture the figure: the Sankey diagram",
        body:
          "A Sankey diagram draws energy like a river. One thick arrow enters from the left, its WIDTH drawn in proportion to the total input energy — say 200 J of electricity into a motor. Partway along, the arrow splits. A narrower arm continues straight ahead, labelled 'useful kinetic energy: 150 J', its width exactly three-quarters of the input arrow. A second arm curves downward, labelled 'wasted thermal energy + sound: 50 J', a quarter of the width. Reading rule: compare widths, not arrowhead sizes — the widths ARE the numbers, and useful + wasted widths must always sum to the input width.",
      },
      {
        heading: "Investigate: your own stair-climb power",
        body:
          "1. Measure the vertical height of one staircase (top step minus bottom, in metres). 2. Measure your mass in kg and convert to weight using weight = mass × 10 N/kg. 3. Time yourself walking the stairs at a steady pace; repeat 3 times and take the mean. 4. Calculate work done = weight × height, then power = work ÷ mean time. 5. Repeat at a brisk (still safe) pace and compare powers: same work, very different watts. Zara's data, for example: mass 55 kg → 550 N; height 3 m; times 5.0, 4.8, 5.2 s (mean 5.0 s) → 1650 J → 330 W.\n\n⚠️ Safety: wear non-slip shoes, use the handrail, one step at a time, never race or jump, and stop immediately if you feel dizzy.",
      },
    ],
    vocab: [
      { word: "work done", meaning: "Energy transferred by a force acting over a distance: W = F × d, in joules." },
      { word: "joule (J)", meaning: "The unit of energy; 1 J is transferred by 1 newton acting over 1 metre." },
      { word: "power", meaning: "The rate of energy transfer: P = E ÷ t, in watts." },
      { word: "watt (W)", meaning: "The unit of power; 1 watt = 1 joule transferred per second." },
      { word: "efficiency", meaning: "Useful energy output divided by total energy input, × 100%." },
      { word: "dissipated", meaning: "Describes energy spread to the surroundings (usually as heat), making it less useful — but never destroyed." },
    ],
    funFact:
      "Elite Tour de France sprinters can exceed 1,000 watts in a finishing burst — the output of about ten old-style 100-watt light bulbs, delivered by a pair of human legs for a few seconds.",
    quiz: [
      {
        question: "A crate is pushed 3 m along the floor with a steady force of 500 N in the direction of motion. Work done = …",
        options: ["1500 J", "500 J", "150 J", "0 J"],
        answerIndex: 0,
        explanation: "W = F × d = 500 × 3 = 1500 J.",
        misconceptions: [
          "Yes! 500 N × 3 m = 1500 J.",
          "That is just the force — multiply by the distance as well.",
          "Check the arithmetic: 500 × 3 is 1500, not 150.",
          "Zero work needs zero distance — the crate moved 3 m.",
        ],
      },
      {
        question: "A motor transfers 2400 J of energy in 8 s. Its power is…",
        options: ["19,200 W", "240 W", "300 W", "8 W"],
        answerIndex: 2,
        explanation: "P = E ÷ t = 2400 ÷ 8 = 300 W.",
        misconceptions: [
          "That is E × t — power divides the energy by the time.",
          "2400 ÷ 8 is not 240 — recompute.",
          "Yes! 2400 ÷ 8 = 300 W.",
          "8 s is the time; divide the joules by it.",
        ],
      },
      {
        question: "A motor receives 200 J of electrical energy and delivers 150 J of useful movement. Its efficiency is…",
        options: ["350%", "50%", "200 J", "75%"],
        answerIndex: 3,
        explanation: "Efficiency = useful ÷ input × 100 = 150 ÷ 200 × 100 = 75%.",
        misconceptions: [
          "Efficiency can never exceed 100% — you cannot get out more than goes in.",
          "50% would mean 100 J useful — this motor did better.",
          "200 J is the input energy, not a percentage.",
          "Yes! 150 ÷ 200 × 100 = 75%.",
        ],
      },
      {
        question: "No device can ever be 100% efficient because…",
        options: [
          "Energy gets destroyed inside the machine",
          "Some energy always spreads to the surroundings as heat (and often sound)",
          "Batteries eventually run out",
          "Gravity interferes with every mechanism",
        ],
        answerIndex: 1,
        explanation: "Energy is conserved, but friction and resistance always transfer some of it to thermal (and sound) stores — useful energy shrinks, total energy does not.",
        misconceptions: [
          "Energy is never destroyed — it is transferred to less useful stores.",
          "Yes! Wasted heat and sound are unavoidable, so 100% is unreachable.",
          "A flat battery is about stored energy running low, not efficiency.",
          "Even frictionless-in-vacuum devices heat up — gravity is not the culprit.",
        ],
      },
      {
        question: "In which situation is NO work done in the physics sense?",
        options: [
          "Holding a heavy box perfectly still",
          "Lifting the box onto a shelf",
          "Pushing the box along the floor",
          "Carrying the box up a staircase",
        ],
        answerIndex: 0,
        explanation: "Work = force × distance moved; with the box motionless, distance = 0, so W = 0 (even though muscles tire).",
        misconceptions: [
          "Yes! A big force with zero distance transfers zero energy.",
          "Lifting moves the box against gravity — work is done.",
          "The box moves in the direction of the push — work is done.",
          "Climbing raises the box's gravitational store — work is done.",
        ],
      },
    ],
    worksheet: [
      {
        kind: "fill-blank",
        prompt: "Energy transferred by a force acting over a distance is called work done, measured in ______.",
        answer: "joules",
      },
      {
        kind: "practice",
        prompt: "A crate is pushed 4 m with a steady 60 N force along the direction of motion. Work done, in joules?",
        answer: "240",
        hint: "F × d",
      },
      {
        kind: "practice",
        prompt: "A kettle transfers 180,000 J in 120 s. What is its power, in watts?",
        answer: "1500",
        hint: "E ÷ t",
      },
      {
        kind: "fill-blank",
        prompt: "Power is measured in watts: 1 watt = 1 ______ transferred per second.",
        answer: "joule",
      },
      {
        kind: "short-answer",
        prompt:
          "A roller coaster climbs its first hill, then races down. Describe the main energy transfers, and explain why every later hill must be lower than the first.",
        sampleAnswer:
          "The chain lift fills the car's gravitational potential store; the drop transfers it to kinetic energy, so the car is fastest at the bottom. Friction and air resistance keep transferring some energy to thermal and sound stores, so after each climb there is less energy available — later hills must be lower, and the car eventually rolls to a stop with its energy dissipated as heat and noise.",
      },
      {
        kind: "practice",
        prompt: "A motor does 900 J of useful work from a 1200 J input. What is its efficiency, as a percentage?",
        answer: "75",
        hint: "useful ÷ total × 100",
      },
    ],
    challenge: {
      prompt:
        "Amara's electric hoist lifts a 400 N crate 30 m in 20 s, using 16,000 J of electrical energy. Calculate (a) the useful work done on the crate, (b) the useful power output, (c) the efficiency of the hoist, and (d) how many joules were wasted.",
      hint: "Find the useful job first, then divide by time for power, then compare useful against input for efficiency — the leftovers are the waste.",
      steps: [
        "Useful work: W = F × d = 400 × 30 = 12,000 J.",
        "Useful power: P = W ÷ t = 12,000 ÷ 20 = 600 W.",
        "Efficiency: 12,000 ÷ 16,000 × 100 = 75%.",
        "Wasted energy: input − useful = 16,000 − 12,000 = 4,000 J (heat and motor noise).",
        "Cross-check: 25% of 16,000 = 4,000 J — consistent with 75% efficiency. ✓",
      ],
      answer: "(a) 12,000 J, (b) 600 W, (c) 75%, (d) 4,000 J wasted (as heat and sound).",
      answerWhy:
        "The crate only 'cares' about force × height (400 × 30 = 12,000 J); everything else is bookkeeping. Dividing by the 20 s run time gives the useful 600 W, and the 4,000 J gap between input and useful output — a quarter of the input — is exactly the 25% inefficiency. Useful + wasted always equals input.",
    },
  },

  // -------------------------------------------------------------------------
  // 6. Matter: particle model, density and changes of state
  // -------------------------------------------------------------------------
  {
    id: "science-teen-6",
    title: "Matter: Particle Model, Density and Changes of State",
    emoji: "🧊",
    minutes: 19,
    intro:
      "Why does ice float while a stone sinks? Why do snowshoes stop you sinking? One model — particles — plus one equation — density — explains a surprising amount of the material world, and both are exam staples.",
    sections: [
      {
        heading: "The particle model, from solid to gas",
        body:
          "All matter is particles, and their arrangement and energy set the state. In a SOLID, particles touch in a regular pattern and only vibrate about fixed positions — that is why solids hold their shape. In a LIQUID, particles still touch but are arranged randomly and can slide past one another — liquids flow and take their container's shape. In a GAS, particles are far apart and fly around fast and randomly — gases expand to fill any space. Heating supplies energy: at melting, particles vibrate so hard the fixed structure breaks down; at boiling, particles throughout the liquid gain enough energy to break free as bubbles. Evaporation differs from boiling: it happens only at the surface, below the boiling point, and it is the FASTEST particles that escape — which is why sweating cools you (the quickest, hottest particles leave, lowering the average energy of what remains). Sublimation is the direct solid-to-gas leap, like dry ice smoking away.",
        example:
          "🧊 solid: neat rows, vibrate in place · 💧 liquid: touch but slide · ☁️ gas: sparse, fast, chaotic",
      },
      {
        heading: "Density = mass ÷ volume",
        body:
          "Density measures how tightly mass is packed: ρ = m ÷ V, commonly in g/cm³. A 27 g metal block occupying 10 cm³ has density 27 ÷ 10 = 2.7 g/cm³ — the signature of aluminium. Water is 1.0 g/cm³; ice only about 0.92, because freezing locks water molecules into an open lattice with extra space — which is why ice FLOATS, an unusual property shared by very few substances. To compare across units: 1 g/cm³ = 1000 kg/m³.",
        example:
          "⚖️ Cork ≈ 0.25 g/cm³ (floats high) · 💧 water 1.0 · 🪨 iron ≈ 7.8 (sinks fast) · 🥇 gold 19.3 (sinks fastest)",
        tip: "Density decides floating: less dense than the fluid = floats; more dense = sinks.",
      },
      {
        heading: "Pressure: force spread over area",
        body:
          "Pressure is force per unit area: P = F ÷ A, measured in pascals (1 Pa = 1 N/m²). The same force spread over a bigger area presses less hard per square metre. Diego weighs 600 N; in boots with a total contact area of 0.02 m² he presses 600 ÷ 0.02 = 30,000 Pa into the snow — and sinks. On snowshoes with 0.30 m² of area, the pressure drops to 600 ÷ 0.3 = 2,000 Pa — 15 times less, so he stays on top. Gases press too: their countless particle collisions with container walls add up to gas pressure, which is why pumping more particles into a tyre raises it.",
        example: "🥾 Boots: 30,000 Pa · 🷹 Snowshoes: 2,000 Pa — same weight, bigger area, gentler push.",
      },
      {
        heading: "Picture the figures: particle diagrams and the heating curve",
        body:
          "Picture three boxes side by side. Box 1 (solid): dozens of circles packed edge-to-edge in tidy rows, each with tiny vibration arrows pointing back and forth. Box 2 (liquid): the same circles, still touching, but scattered at random angles with curved arrows showing them sliding past each other. Box 3 (gas): five lonely circles spread wide apart with long straight arrows in every direction. Beneath them runs the heating curve: a graph of temperature against time for heating ice. The line climbs (ice warming), then flattens at 0 °C (melting — energy goes into breaking the structure, NOT raising temperature), climbs again (water warming), then plateaus at 100 °C (boiling — energy again goes into separating particles, not temperature). Flat sections = changing state; sloped sections = heating one state.",
      },
      {
        heading: "Investigate: density by water displacement",
        body:
          "Measure the density of an irregular object. 1. Weigh a small stone on a balance: 156 g. 2. Pour 50 mL of water into a measuring cylinder. 3. Lower the stone in gently on a string and read the new level: 70 mL. 4. Volume of stone = 70 − 50 = 20 cm³. 5. Density = 156 ÷ 20 = 7.8 g/cm³ — matching iron, so this 'stone' is an ore-rich lump. 6. Repeat twice and average your volumes to check reliability.\n\n⚠️ Safety: keep the glass cylinder on a flat surface away from table edges, lower objects slowly (no drops), wipe spills immediately so nobody slips, and report any chipped glassware.",
      },
    ],
    vocab: [
      { word: "particle model", meaning: "The idea that matter is made of moving particles whose arrangement and energy explain the properties of solids, liquids and gases." },
      { word: "density", meaning: "Mass per unit volume: ρ = m ÷ V, e.g. in g/cm³." },
      { word: "pressure", meaning: "Force per unit area: P = F ÷ A, measured in pascals (N/m²)." },
      { word: "pascal (Pa)", meaning: "The unit of pressure; 1 Pa = 1 newton spread over 1 square metre." },
      { word: "evaporation", meaning: "Particles escaping from a liquid's SURFACE at any temperature; the fastest particles leave first, cooling the liquid." },
      { word: "sublimation", meaning: "The direct change from solid to gas with no liquid stage, like dry ice." },
    ],
    funFact:
      "Gallium melts at just 29.8 °C — below body temperature — so a solid lump of it will literally melt into a puddle in your warm hand. Chemists mould it into spoons as a party trick: it vanishes in a cup of tea (do not drink it, though).",
    quiz: [
      {
        question: "A metal block has mass 54 g and volume 20 cm³. Its density is…",
        options: ["1080 g/cm³", "3.2 g/cm³", "2.7 g/cm³", "0.37 g/cm³"],
        answerIndex: 2,
        explanation: "ρ = m ÷ V = 54 ÷ 20 = 2.7 g/cm³ — aluminium's signature density.",
        misconceptions: [
          "That is m × V — density divides mass BY volume.",
          "Divide the numbers rather than mixing them: 54 ÷ 20.",
          "Yes! 54 ÷ 20 = 2.7 g/cm³.",
          "That is V ÷ m — upside down.",
        ],
      },
      {
        question: "Which statement about the particles in a GAS is correct?",
        options: [
          "They touch and vibrate about fixed positions",
          "They move fast and randomly, with big gaps between them",
          "They are locked in a neat, repeating lattice",
          "They only move when heated",
        ],
        answerIndex: 1,
        explanation: "Gas particles are far apart, fast-moving and random — filling whatever space they get.",
        misconceptions: [
          "That is the solid picture.",
          "Yes! Fast, random motion with mostly empty space between particles.",
          "Neat lattices belong to solids — gases are chaos.",
          "Gas particles move constantly (until absolute zero at −273 °C).",
        ],
      },
      {
        question: "Dry ice (solid CO₂) turns straight into gas without melting. This change is called…",
        options: ["Condensation", "Evaporation", "Deposition", "Sublimation"],
        answerIndex: 3,
        explanation: "Solid → gas directly, with no liquid stage, is sublimation.",
        misconceptions: [
          "Condensation is gas → liquid.",
          "Evaporation is liquid → gas at the surface.",
          "Deposition is the REVERSE: gas straight to solid (like frost forming).",
          "Yes! Sublimation skips the liquid stage entirely.",
        ],
      },
      {
        question: "Ice floats on water because…",
        options: [
          "Ice is less dense than liquid water — freezing locks particles into an open structure",
          "Ice is colder, and cold things rise",
          "Ice particles are lighter than water particles",
          "Water pushes ice up with magnetic forces",
        ],
        answerIndex: 0,
        explanation: "Freezing holds water molecules in an open lattice with more space between them, so ice's density (~0.92 g/cm³) is lower than water's (1.0 g/cm³).",
        misconceptions: [
          "Yes! The open lattice gives ice extra spacing and lower density — hence floating.",
          "Floating is decided by density, not temperature alone.",
          "All water particles have identical mass — only the ARRANGEMENT differs.",
          "Buoyancy comes from density differences, not magnetism.",
        ],
      },
      {
        question: "On a heating curve for ice → water → steam, the FLAT sections show that…",
        options: [
          "The thermometer is broken",
          "Particles are losing energy",
          "Energy is being used to change state, so the temperature stays constant",
          "The substance is cooling down",
        ],
        answerIndex: 2,
        explanation: "During melting and boiling, the energy supplied breaks attractions between particles instead of raising the temperature.",
        misconceptions: [
          "The plateau is real physics — a genuine pause in temperature rise.",
          "While heating, particles GAIN energy — even on the flat sections.",
          "Yes! Flat = state change; the energy goes into separating particles.",
          "The curve is for steady heating — temperature only plateaus at state changes.",
        ],
      },
    ],
    worksheet: [
      {
        kind: "fill-blank",
        prompt: "Mass per unit volume is called ______.",
        answer: "density",
      },
      {
        kind: "practice",
        prompt: "A metal cube has mass 216 g and volume 80 cm³. Calculate its density, in g/cm³.",
        answer: "2.7",
        hint: "m ÷ V",
      },
      {
        kind: "practice",
        prompt: "Diego's weight is 600 N and his boots cover 0.02 m² of snow. What pressure, in Pa, does he exert?",
        answer: "30000",
        hint: "P = F ÷ A",
      },
      {
        kind: "fill-blank",
        prompt: "The direct change from solid to gas — as dry ice performs — is called ______.",
        answer: "sublimation",
      },
      {
        kind: "short-answer",
        prompt:
          "Using the particle model, explain why evaporation cools the liquid left behind.",
        sampleAnswer:
          "Particles in a liquid have a range of energies. The fastest, most energetic particles escape first from the surface. That lowers the average kinetic energy of the particles remaining, and lower average energy means a lower temperature — so the liquid cools.",
      },
      {
        kind: "practice",
        prompt: "A stone has mass 156 g. In a measuring cylinder, the water level rises from 50 mL to 70 mL. Calculate the stone's density, in g/cm³.",
        answer: "7.8",
        hint: "Volume = 70 − 50, then m ÷ V",
      },
    ],
    challenge: {
      prompt:
        "A market stall sells a 'pure gold' coin. Amara weighs it: 38.6 g. She lowers it into a measuring cylinder and the water rises from 40.0 mL to 44.0 mL. Gold's density is 19.3 g/cm³. (a) Find the coin's volume, (b) its density, (c) the verdict, and (d) the volume a REAL 38.6 g gold coin would displace.",
      hint: "Displacement gives volume; density then gives the verdict. For (d), rearrange V = m ÷ ρ.",
      steps: [
        "Volume by displacement: 44.0 − 40.0 = 4.0 cm³.",
        "Density: ρ = m ÷ V = 38.6 ÷ 4.0 = 9.65 g/cm³.",
        "Compare: 9.65 is about half of gold's 19.3 g/cm³ — the coin is not pure gold (it could be gold-plated lead-free alloy).",
        "Real gold volume: V = m ÷ ρ = 38.6 ÷ 19.3 = 2.0 cm³ — the water would rise only 2 mL, not 4.",
        "Conclusion: the fake occupies twice the volume of genuine gold of the same mass.",
      ],
      answer: "(a) 4.0 cm³, (b) 9.65 g/cm³, (c) not pure gold, (d) a real 38.6 g gold coin displaces just 2.0 cm³.",
      answerWhy:
        "Density is the fingerprint: 38.6 ÷ 4.0 = 9.65 g/cm³, roughly half gold's 19.3 g/cm³, so the coin is about twice as 'puffy' per gram as the real thing. This is exactly Archimedes' crown test — displacement exposes fakes that look perfect.",
    },
  },

  // -------------------------------------------------------------------------
  // 7. Earth and space: tectonics, climate and the universe
  // -------------------------------------------------------------------------
  {
    id: "science-teen-7",
    title: "Earth and Space: Tectonics, Climate and the Universe",
    emoji: "🌍",
    minutes: 20,
    intro:
      "The ground beneath you is a slow conveyor belt, the air above is a heat-trapping blanket, and overhead stars are being born and dying right now. Connect the systems — and dodge the ozone/greenhouse trap question that catches out half of every exam hall.",
    sections: [
      {
        heading: "Plates on the move: the four boundaries",
        body:
          "Earth's crust is cracked into tectonic plates riding on the slowly churning mantle, driven by convection currents of hot rock rising and sinking. At CONSTRUCTIVE (divergent) boundaries plates move apart and magma wells up as new crust — the Mid-Atlantic Ridge, which surfaces in Iceland. At DESTRUCTIVE (convergent) boundaries an oceanic plate dives beneath another (subduction), melts, and feeds violent volcanoes and deep trenches — the Andes grow this way. At CONSERVATIVE (transform) boundaries plates grind PAST each other: no crust is destroyed, so earthquakes dominate but volcanoes are rare — the San Andreas Fault. At COLLISION boundaries two continental plates crumple upward: the Himalayas are still rising. Earthquakes happen at every type; volcanoes mainly at constructive and destructive ones.",
        example:
          "🇮🇸 Iceland: plates apart · 🏔️ Andes: subduction · 🌉 San Andreas: sliding past · 🗻 Himalayas: continent vs continent",
      },
      {
        heading: "The rock cycle, wired to the plates",
        body:
          "The three rock families are stations in a loop that plate tectonics powers. Igneous rock forms when magma or lava cools (fast cooling gives tiny crystals, slow cooling gives large ones). Weathering and erosion break any rock into sediment, which compacts and cements into sedimentary rock. Buried deep, heat and pressure bake rock into metamorphic rock without melting it — limestone becomes marble. Subduction drags oceanic crust down to melt into fresh magma, closing the loop; collision and uplift can thrust old rock back up to be eroded again. Every rock you can pick up is somewhere on this cycle, and the engine is the mantle's heat.",
        example: "🌋 magma cools → igneous · 🌧️ erodes → sediment → sedimentary · 🔥 buried → metamorphic → subducted → magma again",
      },
      {
        heading: "Greenhouse effect vs ozone layer: the classic mix-up",
        body:
          "These two are different systems that solve different problems. The GREENHOUSE EFFECT is a warming process: gases such as CO₂, methane and water vapour absorb infrared radiation the Earth emits and re-emit it back downward, keeping the surface about 33 °C warmer than it would otherwise be. Burning fossil fuels adds CO₂ and strengthens the effect — that enhanced warming is climate change. The OZONE LAYER is a shield: a band of O₃ gas in the stratosphere that absorbs harmful ultraviolet radiation before it reaches the ground. In the 1980s, CFC gases (from old fridges and aerosols) destroyed ozone, thinning the layer over Antarctica; the 1987 Montreal Protocol phased CFCs out and the layer is recovering. Trap question, decoded: the ozone layer does NOT trap heat, and greenhouse gases do NOT block UV — but CFCs, unhelpfully, do both (they are also potent greenhouse gases).",
        example: "☀️ UV danger → ozone layer's problem · 🌡️ infrared heat escaping → greenhouse gases' problem",
      },
      {
        heading: "Picture the figures: subduction cross-section and the star life cycle",
        body:
          "First picture: a cross-section through a destructive boundary. On the left, a dark oceanic plate curves downward like a slide, diving beneath a thicker continental plate on the right. Where the oceanic plate grinds down, earthquakes cluster as dots along the contact. Heat releases water and melts rock, and red magma chambers rise through the continent to feed a cone-shaped volcano at the surface, with a trench marking the flex point offshore. Second picture: the star life cycle as a flowchart. A NEBULA (cloud of gas and dust) collapses under gravity into a PROTOSTAR, which ignites into a MAIN SEQUENCE star — our Sun's current stage, halfway through a roughly 10-billion-year run. Small stars then swell into RED GIANTS, shed their outer layers, and end as WHITE DWARFS fading slowly. Massive stars blaze through a RED SUPERGIANT stage and die in a SUPERNOVA, leaving a NEUTRON STAR or, for the heaviest, a BLACK HOLE. Our Sun: red giant next, white dwarf eventually — never a supernova.",
      },
      {
        heading: "Investigate: watch a convection current",
        body:
          "See the engine that moves plates. 1. Fill a clear square dish with cold water and let it settle. 2. Colour a cup of warm water with food dye. 3. Using a pipette, gently release the dyed warm water at one bottom corner and a plain ice cube at the opposite corner. 4. Watch: the warm dyed water rises in a plume, flows across the surface, cools, and sinks near the ice — a circulating loop. 5. Sketch the loop with arrows, then explain: warm fluid is less dense and rises; cooled fluid is denser and sinks. The mantle churns in exactly this way, a few centimetres per year — about the speed your fingernails grow, which is why plates creep rather than race.\n\n⚠️ Safety: warm (not boiling) water only, handled by an adult or with oven gloves; wipe spills; handle glass dishes on a flat surface.",
      },
    ],
    vocab: [
      { word: "tectonic plate", meaning: "One of the large rigid slabs of Earth's crust that move slowly over the mantle, a few cm per year." },
      { word: "subduction", meaning: "The sinking of a denser oceanic plate beneath another plate at a destructive boundary, where it melts." },
      { word: "magma", meaning: "Molten rock beneath Earth's surface; once erupted it is called lava." },
      { word: "greenhouse effect", meaning: "The warming caused by gases absorbing and re-emitting infrared radiation from Earth's surface; enhanced by extra CO₂ from burning fossil fuels." },
      { word: "ozone layer", meaning: "A stratospheric band of O₃ gas that absorbs harmful ultraviolet radiation before it reaches the ground." },
      { word: "nebula", meaning: "A vast cloud of gas and dust in space where gravity gathers material to form new stars." },
    ],
    funFact:
      "Tectonic plates creep along at 2–5 cm per year — about the speed your fingernails grow. Slow, but with 50 million years of runway: that is how an ocean opens.",
    quiz: [
      {
        question: "At a divergent (constructive) boundary, two plates…",
        options: [
          "Crunch together and buckle upwards",
          "Move apart, and magma rises to form new crust",
          "Slide past each other sideways",
          "Stay perfectly still",
        ],
        answerIndex: 1,
        explanation: "Plates separate, magma wells up and solidifies as new oceanic crust — the Mid-Atlantic Ridge is the showcase.",
        misconceptions: [
          "Crunching together is a convergent/destructive boundary.",
          "Yes! Plates part, new crust forms — Iceland sits right on the seam.",
          "Sideways grinding is a conservative boundary, like the San Andreas.",
          "Plates creep a few centimetres per year — never still.",
        ],
      },
      {
        question: "The San Andreas Fault is famous for earthquakes but almost no volcanoes. Why?",
        options: [
          "The rock there is too hard to melt",
          "Volcanoes only ever form under the ocean",
          "Earthquakes prevent magma from rising",
          "The plates slide PAST each other, so little crust is forced down and melted",
        ],
        answerIndex: 3,
        explanation: "Conservative boundaries neither create nor destroy crust, so there is no subduction-generated magma to feed volcanoes.",
        misconceptions: [
          "Rock hardness is not the reason — it is the boundary type.",
          "Volcanoes form on land too — the Andes and Cascade Range.",
          "Earthquakes do not cap volcanoes; there is simply little melting at a conservative boundary.",
          "Yes! No subduction means no fresh magma — plenty of earthquakes, few volcanoes.",
        ],
      },
      {
        question: "The ozone layer's job is to…",
        options: [
          "Absorb harmful ultraviolet (UV) radiation",
          "Trap infrared heat and warm the planet",
          "Produce the oxygen we breathe",
          "Reflect sunlight back into space like a mirror",
        ],
        answerIndex: 0,
        explanation: "Ozone (O₃) high in the stratosphere absorbs UV radiation — it is a shield, not a blanket.",
        misconceptions: [
          "Yes! Soaking up UV is exactly the ozone layer's job.",
          "That is the greenhouse gases' role — the classic mix-up this lesson untangles.",
          "The oxygen we breathe comes from photosynthesis, not the O₃ layer.",
          "It absorbs UV rather than bouncing light back.",
        ],
      },
      {
        question: "Our Sun is currently a main-sequence star. Its NEXT major stage will be…",
        options: ["Supernova", "Neutron star", "Red giant", "Black hole"],
        answerIndex: 2,
        explanation: "When its core hydrogen runs low, the Sun will swell into a red giant, later shed its outer layers and end as a white dwarf.",
        misconceptions: [
          "Supernovae are for massive stars — the Sun is far too small.",
          "Neutron stars form from the collapsed cores of massive stars.",
          "Yes! Red giant next (in around 5 billion years), white dwarf at the end.",
          "Black holes need stars far more massive than the Sun.",
        ],
      },
      {
        question: "Sedimentary rock can be transformed into metamorphic rock by…",
        options: [
          "Cooling quickly in water",
          "Heat and pressure deep underground",
          "Being eroded by wind and rain",
          "Freezing and thawing",
        ],
        answerIndex: 1,
        explanation: "Burying rock exposes it to heat and pressure that recrystallise it without melting — limestone becomes marble.",
        misconceptions: [
          "Quick cooling makes IGNEOUS rock from magma.",
          "Yes! Heat plus pressure, no melting, gives metamorphic rock.",
          "Erosion breaks rock into sediment — the raw material of sedimentary rock, not metamorphic.",
          "Weathering shatters rock; it does not transform its crystals.",
        ],
      },
    ],
    worksheet: [
      {
        kind: "fill-blank",
        prompt: "Molten rock beneath Earth's surface is called ______; once it erupts, it is called lava.",
        answer: "magma",
      },
      {
        kind: "fill-blank",
        prompt: "Rock changed by heat and pressure without melting is called ______ rock.",
        answer: "metamorphic",
      },
      {
        kind: "practice",
        prompt: "A plate creeps 5 cm each year. How far does it move in 200 years, in metres?",
        answer: "10",
        hint: "5 × 200 cm, then ÷ 100",
      },
      {
        kind: "practice",
        prompt: "The Sun is a main-sequence star. Which stage comes next for it?",
        answer: "red giant",
      },
      {
        kind: "short-answer",
        prompt:
          "A friend says: 'The ozone hole causes global warming.' Sort out the confusion in a few sentences.",
        sampleAnswer:
          "They are two separate problems. The ozone layer is a UV shield in the stratosphere; CFC pollution thinned it, and the Montreal Protocol (1987) is helping it recover. Global warming comes from greenhouse gases like CO₂ and methane trapping infrared heat, mainly from burning fossil fuels. The mix-up exists because CFCs happen to be both ozone-destroyers and greenhouse gases — but the ozone hole itself is not what warms the planet.",
      },
      {
        kind: "practice",
        prompt: "A plate moves 4 cm per year for 50 million years. How far does it travel, in km?",
        answer: "2000",
        hint: "4 × 50,000,000 cm; 1 km = 100,000 cm",
      },
    ],
    challenge: {
      prompt:
        "The Atlantic Ocean widens at roughly 2.5 cm per year, and its widest stretch between continents is about 5,000 km. Estimate the age of the oldest Atlantic sea floor, showing every conversion, then compare your estimate with the fossil evidence geologists actually find.",
      hint: "Convert the distance to centimetres, divide by the spreading rate to get years, then sanity-check against the age of the oldest Atlantic fossils.",
      steps: [
        "Convert distance: 5,000 km × 100,000 = 500,000,000 cm.",
        "Divide by the rate: 500,000,000 ÷ 2.5 = 200,000,000 years.",
        "Express it: about 200 million years.",
        "Check against evidence: the oldest Atlantic crust, dated by fossils in drill cores near the continental margins, is roughly 180–200 million years old.",
        "Discuss the estimate's limits: spreading rates vary along the ridge, so this is an average-based estimate — exactly the kind scientists refine with real data.",
      ],
      answer: "About 200 million years — right in line with the ~180–200-million-year age of the oldest Atlantic sea floor.",
      answerWhy:
        "Age = distance ÷ rate, with the units aligned (cm ÷ cm/year = years). The estimate lands within about 10% of the fossil-dated crust, showing how a simple rate calculation can reconstruct Earth history — the same reasoning geologists used before deep drilling confirmed it.",
    },
  },

  // -------------------------------------------------------------------------
  // 8. Body systems: coordination and control
  // -------------------------------------------------------------------------
  {
    id: "science-teen-8",
    title: "Body Systems: Coordination and Control",
    emoji: "🧠",
    minutes: 18,
    intro:
      "Your body runs two communication networks at once — electrical and chemical. Learn how they keep you at exactly 37 °C whether you are asleep or sprinting, and how they gang up during exercise.",
    sections: [
      {
        heading: "Two messaging systems: nerves vs hormones",
        body:
          "The nervous system sends electrical impulses along neurones — fast (up to about 120 m/s in the quickest fibres), precise and short-lived, perfect for 'move your hand NOW'. The endocrine system releases hormones into the blood: chemical messengers that travel everywhere but only bind to their target organs. Hormones act more slowly and last longer — insulin manages blood glucose for hours, adrenaline primes your whole body for minutes. Exam comparisons ask for three contrasts: speed (nerves faster), duration (hormones longer-lasting) and route (electrical along neurones vs chemical via the bloodstream).",
        example: "⚡ Nerves: milliseconds, one pathway · 🩸 Hormones: seconds to hours, delivered everywhere via blood",
        tip: "Three-line comparison answers score full marks: speed, duration, route.",
      },
      {
        heading: "The reflex arc — and the diagram exams love",
        body:
          "Picture the standard reflex arc diagram: a fingertip touches a pin at the far left. An arrow labelled 'stimulus' leads to a RECEPTOR in the skin. From there the path runs through three neurones drawn as chained cells: a SENSORY neurone carries the impulse to the spinal cord (drawn as a column), a RELAY neurone passes it across the cord, and a MOTOR neurone runs out to an EFFECTOR — a muscle, which contracts and yanks the hand away. Above the spinal cord, the brain sits greyed-out with a dashed line and the note 'conscious awareness arrives later'. The point: the arc bypasses the conscious brain entirely, cutting the delay to a fraction of a second. Between each neurone sits a synapse — a tiny gap crossed by diffusing chemicals, which is where reflex drugs and venoms act.",
        example: "👆 stimulus → receptor → sensory neurone → relay neurone → motor neurone → effector → response",
      },
      {
        heading: "Homeostasis: holding the line at 37 °C",
        body:
          "Homeostasis is the maintenance of steady internal conditions by automatic negative feedback — a loop that detects a change and reverses it. Temperature control: your core must stay near 37 °C. Too hot? Blood vessels in the skin VASODILATE (widen, flushing heat out) and sweat glands release water that evaporates, carrying energy away. Too cold? VASOCONSTRICTION narrows skin vessels to conserve heat, hairs stand erect to trap an insulating layer, and SHIVERING makes muscles contract rapidly to generate warmth. Blood glucose works the same way: after a meal the pancreas releases INSULIN, which tells liver and muscle cells to store glucose as glycogen, lowering blood levels; between meals, GLUCAGON converts glycogen back, raising them. In type 1 diabetes the pancreas cannot make insulin, so glucose must be managed by injection.",
        example: "🌡️ 39 °C → vasodilation + sweat → back to 37 · 🍬 glucose high → insulin → stored as glycogen → back to normal",
      },
      {
        heading: "Exercise: the systems gang up",
        body:
          "During a 400 m race, working muscles need far more glucose and oxygen for respiration — and they churn out extra CO₂. The nervous system and adrenaline raise heart rate so blood delivers O₂ and glucose faster; breathing rate AND depth increase so the lungs load more oxygen and dump more CO₂; arterioles feeding muscles widen while gut supply narrows; skin vasodilates and sweating ramps up to dump the extra heat all that respiration generates. After the race, heart and breathing rates stay elevated to repay the 'oxygen debt', then negative feedback restores every value to its set point. Coordination, not chance: nervous for speed, endocrine for sustain, homeostasis for the recovery.",
      },
      {
        heading: "Investigate: pulse rate and recovery",
        body:
          "1. Find your pulse at your wrist or neck. Count beats for exactly 15 s and multiply by 4 for beats per minute (bpm). Kai's resting count: 18 beats → 72 bpm. 2. Step up and down on a low, stable step for one full minute (steady rhythm, not a sprint). 3. Sit down and measure your pulse immediately, then at 1, 2 and 3 minutes after stopping. 4. Record all readings in a table, repeat on another day, and compare recovery speed with a partner — a faster return toward resting rate signals better cardiovascular fitness. Kai's post-exercise reading of 30 beats in 15 s means 120 bpm, and watching the 15-second counts shrink minute by minute IS the recovery curve.\n\n⚠️ Safety: no history of heart or breathing conditions without a check first, keep water nearby, wear non-slip shoes on the step, stop at once if dizzy or unwell, and never exercise intensely alone.",
      },
    ],
    vocab: [
      { word: "neurone", meaning: "A specialised cell that transmits electrical impulses; sensory, relay and motor neurones chain together in reflex arcs." },
      { word: "synapse", meaning: "The tiny gap between two neurones, crossed by diffusing chemical messengers." },
      { word: "hormone", meaning: "A chemical messenger released by a gland and carried in the blood to its target organ." },
      { word: "reflex", meaning: "A rapid, automatic response that bypasses the conscious brain via the reflex arc." },
      { word: "homeostasis", meaning: "The maintenance of steady internal conditions (temperature, blood glucose, water) by automatic control." },
      { word: "negative feedback", meaning: "A control loop that detects a deviation from a set point and triggers changes that reverse it." },
    ],
    funFact:
      "The fastest human nerve impulses travel at up to about 120 m/s — roughly 430 km/h, the cruising speed of a Formula 1 car. The slowest crawl along at around 1 m/s, which is why a dull ache registers noticeably later than a sharp pain.",
    quiz: [
      {
        question: "Which statement is TRUE of hormones?",
        options: [
          "They travel in the blood and act more slowly but longer than nerve impulses",
          "They travel along nerves at 120 m/s",
          "They only ever affect the brain",
          "They act instantly and vanish immediately",
        ],
        answerIndex: 0,
        explanation: "Hormones are chemical messengers distributed by the bloodstream — slower to act than nerves, but their effects persist longer.",
        misconceptions: [
          "Yes! Blood-borne, slower onset, longer-lasting — the hormonal signature.",
          "That is nerve impulse speed — hormones ride the bloodstream.",
          "Hormones target specific organs all over the body — uterus, liver, kidneys and more.",
          "Instant-and-brief describes nerves; hormones linger.",
        ],
      },
      {
        question: "Put the reflex arc in order, using 1 = motor neurone, 2 = receptor, 3 = sensory neurone, 4 = effector, 5 = relay neurone.",
        options: ["2 → 3 → 1 → 5 → 4", "2 → 1 → 5 → 3 → 4", "2 → 3 → 5 → 1 → 4", "3 → 2 → 5 → 1 → 4"],
        answerIndex: 2,
        explanation: "The impulse runs receptor → sensory neurone → relay neurone (in the CNS) → motor neurone → effector: 2 → 3 → 5 → 1 → 4.",
        misconceptions: [
          "Motor before relay? The signal must cross the CNS relay before heading out.",
          "The motor neurone cannot come second — it is the final path to the effector.",
          "Yes! Receptor, sensory, relay, motor, effector — the canonical order.",
          "The stimulus is detected by the receptor first, so the sequence must start at 2.",
        ],
      },
      {
        question: "After a large sugary meal, the pancreas releases insulin, which…",
        options: [
          "Raises blood glucose even further",
          "Moves glucose out of the blood and into storage as glycogen",
          "Converts glycogen back into glucose",
          "Speeds up digestion",
        ],
        answerIndex: 1,
        explanation: "Insulin lowers blood glucose by signalling liver and muscle cells to absorb glucose and store it as glycogen.",
        misconceptions: [
          "Insulin LOWERS blood glucose — raising it is glucagon's job.",
          "Yes! Insulin = glucose out of the blood, into glycogen stores.",
          "That reversal is glucagon's role, between meals.",
          "Insulin manages glucose levels; it is not a digestive accelerator.",
        ],
      },
      {
        question: "You step outside into freezing wind. Which responses would your body deploy?",
        options: [
          "Vasodilation and sweating",
          "Vasodilation and shivering",
          "Sweating and reduced respiration",
          "Vasoconstriction and shivering",
        ],
        answerIndex: 3,
        explanation: "Narrowed skin vessels conserve core heat, and rapid muscle contractions (shivering) generate extra warmth.",
        misconceptions: [
          "Widening vessels and sweating are COOLING responses — the wrong direction.",
          "Shivering fits, but vasodilation would dump heat faster.",
          "Sweating cools you — the exact opposite of what the cold demands.",
          "Yes! Conserve heat (vasoconstriction) and generate it (shivering).",
        ],
      },
      {
        question: "During a 400 m race, breathing rate and depth increase mainly to…",
        options: [
          "Deliver more oxygen to respiring muscles and remove extra CO₂",
          "Cool the lungs down",
          "Raise adrenaline levels",
          "Speed up digestion of race-day snacks",
        ],
        answerIndex: 0,
        explanation: "Working muscles need more oxygen for respiration and produce more carbon dioxide — deeper, faster breathing handles both.",
        misconceptions: [
          "Yes! More O₂ in for respiration, more CO₂ out — the lungs' job during exercise.",
          "Cooling is handled by sweating and vasodilation, not the lungs.",
          "Adrenaline is a hormone released by glands — not a product of breathing harder.",
          "Digestion is actually toned DOWN during intense exercise.",
        ],
      },
    ],
    worksheet: [
      {
        kind: "fill-blank",
        prompt: "Chemical messengers released by glands and carried in the blood are ______.",
        answer: "hormones",
      },
      {
        kind: "practice",
        prompt: "Kai counts 18 pulse beats in 15 seconds. What is his heart rate, in beats per minute (bpm)?",
        answer: "72",
        hint: "multiply the 15-second count by 4",
      },
      {
        kind: "practice",
        prompt: "Straight after exercise his pulse gives 30 beats in 15 seconds. What is his heart rate, in bpm?",
        answer: "120",
        hint: "30 × 4",
      },
      {
        kind: "fill-blank",
        prompt: "The hormone that lowers blood glucose by promoting glycogen storage is ______.",
        answer: "insulin",
      },
      {
        kind: "short-answer",
        prompt:
          "Explain why reflex actions are faster than conscious responses. Refer to the pathway the impulse takes.",
        sampleAnswer:
          "A reflex impulse travels through the spinal cord via just a few neurones (sensory → relay → motor) and never needs to reach the conscious brain for a decision to be made. Skipping the brain's processing saves time — vital when the response (pulling away from heat) prevents injury.",
      },
      {
        kind: "practice",
        prompt: "An impulse travels 1.2 m along a neurone at 60 m/s. How long does the journey take, in seconds?",
        answer: "0.02",
        hint: "time = distance ÷ speed",
      },
    ],
    challenge: {
      prompt:
        "Noor times two runners' heart-rate recovery after identical one-minute stepping tests. Amara: resting 72 bpm, peaks at 132, then 108 after 1 min, 96 after 2 min, 84 after 3 min, 72 after 4 min. Kai: resting 70 bpm, peaks at 150, and is still at 118 bpm four minutes later. (a) By how much does each runner's heart rate exceed resting at the 4-minute mark? (b) Who is fitter, and what is your evidence? (c) Explain the physiology behind a fast recovery.",
      hint: "Compare each 4-minute reading with that runner's OWN resting rate, then think about what a strong heart does per beat.",
      steps: [
        "Amara at 4 min: 72 bpm — exactly her resting rate, so she exceeds it by 0 bpm.",
        "Kai at 4 min: 118 − 70 = 48 bpm above his resting rate, still working hard.",
        "Peak comparison too: Amara rose 60 bpm above rest; Kai rose 80 bpm — his heart had to beat faster to deliver the same oxygen.",
        "Verdict: Amara is fitter — she returns to baseline within 4 minutes and peaked lower.",
        "Physiology: a trained heart pumps more blood per beat (larger stroke volume), so it needs fewer beats; efficient gas exchange and prompt negative feedback then restore the set point quickly.",
      ],
      answer:
        "(a) Amara exceeds rest by 0 bpm at 4 minutes; Kai by 48 bpm. (b) Amara is fitter — lower peak and full recovery to 72 bpm within 4 minutes. (c) Trained hearts deliver more oxygen per beat, so they peak lower and negative feedback restores resting rate faster.",
      answerWhy:
        "Recovery speed is a standard fitness indicator: it reflects how quickly oxygen delivery can drop back once demand falls and how well homeostatic feedback re-asserts the set point. Amara's 0-bpm gap against Kai's 48-bpm gap — and her smaller rise from rest — is exactly the data pattern coaches and physiologists look for.",
    },
  },
];
