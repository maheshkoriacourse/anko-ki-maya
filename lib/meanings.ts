/**
 * Anko Ki Maya — original interpretive copy.
 *
 * Every line here is written for this project. Do NOT paste interpretation
 * text from other websites/books (copyright + tone). Direct jyotishi voice
 * (numerology-product-lab rules) applies to every string in this file:
 * SACH → KAARAN → UPAY, spoken-simple — never guarantees, never hedging.
 */

export const DISCLAIMER = "Traditional numerology-based reading.";

/* ------------------------------------------------------------------ */
/* Core numbers 1-9                                                    */
/* ------------------------------------------------------------------ */

export interface NumberMeaning {
  title: string;
  essence: string;
  strengths: string;
  growthEdge: string;
  reflectionQuestions: string[];
}

export const NUMBER_MEANINGS: Record<number, NumberMeaning> = {
  1: {
    title: "The Initiator",
    essence:
      "A vibration of independent beginnings — this number reads a person who prefers to lead, originate and think for themselves.",
    strengths:
      "Original thinking, courage to start, comfort with standing alone.",
    growthEdge:
      "Independence pulls one way, help-seeking pulls the other — the work is leading yourself while still asking for support in time.",
    reflectionQuestions: [
      "Where in my life am I being invited to begin something of my own?",
      "When did I last ask for support — and how did that feel?",
      "What would 'leading gently' look like this week?",
    ],
  },
  2: {
    title: "The Partner",
    essence:
      "A vibration of sensitivity and partnership — this number reads a person who notices nuance, builds bridges and values harmony.",
    strengths: "Empathy, patience, diplomacy, attention to detail in relationships.",
    growthEdge:
      "The number 2 carries the saying-no struggle and honors-own-pace struggle — boundaries are the work to build.",
    reflectionQuestions: [
      "Which relationship deserves more of my honest attention?",
      "Where might I be agreeing when I want to pause?",
      "What does gentle patience look like in action?",
    ],
  },
  3: {
    title: "The Communicator",
    essence:
      "A vibration of expression and joy — this number reads a person who uplifts through words, art and humour.",
    strengths: "Creativity, storytelling, optimism, social warmth.",
    growthEdge:
      "Energy scatters across many shiny projects — the work is finishing what you start before starting the next.",
    reflectionQuestions: [
      "What do I most want to express right now?",
      "Which creative thread is asking for consistent attention?",
      "How does play restore me?",
    ],
  },
  4: {
    title: "The Builder",
    essence:
      "A vibration of structure and steadiness — this number reads a person who turns ideas into reliable systems.",
    strengths: "Discipline, loyalty, practical craft, patience with long efforts.",
    growthEdge:
      "Routine turns rigid under change — bend the plan, keep the foundation.",
    reflectionQuestions: [
      "What am I building that deserves patience?",
      "Where could a little more spontaneity serve me?",
      "What does 'enough order' look like in my week?",
    ],
  },
  5: {
    title: "The Explorer",
    essence:
      "A vibration of freedom and curiosity — this number reads a person who learns by moving, tasting and adapting.",
    strengths: "Adaptability, magnetic energy, courage to change course.",
    growthEdge:
      "Restlessness keeps pulling between commitments — keep the freedom, add the follow-through.",
    reflectionQuestions: [
      "Where is novelty enriching me — and where is it distracting me?",
      "What change have I been circling without stepping into?",
      "What anchor keeps me grounded while I explore?",
    ],
  },
  6: {
    title: "The Nurturer",
    essence:
      "A vibration of care and responsibility — this number reads a person who creates beauty and takes care of people and places.",
    strengths: "Warmth, dependability, aesthetic sense, devotion to loved ones.",
    growthEdge:
      "Over-giving is the pattern here — care must include yourself in the ledger.",
    reflectionQuestions: [
      "Who or what am I caring for — and is the ledger balanced?",
      "Where might service be hiding perfectionism?",
      "What does receiving gracefully feel like?",
    ],
  },
  7: {
    title: "The Seeker",
    essence:
      "A vibration of depth and analysis — this number reads a person who needs quiet, study and meaning beneath surfaces.",
    strengths: "Insight, focus, comfort with solitude, love of learning.",
    growthEdge:
      "Withdrawal wins exactly when connection is needed — share your inner findings with the few people you trust.",
    reflectionQuestions: [
      "What question has been living in me this season?",
      "Where do I find meaningful stillness?",
      "Which insight am I ready to voice?",
    ],
  },
  8: {
    title: "The Steward",
    essence:
      "A vibration of stewardship and material mastery — this number reads a person who shapes resources, organisations and long games.",
    strengths: "Ambition with stamina, fairness, comfort with responsibility.",
    growthEdge:
      "Work-life imbalance builds quietly — real wealth counts time, health and relationships alongside money.",
    reflectionQuestions: [
      "What am I building toward, and why does it matter to me?",
      "How do I define abundance beyond money?",
      "Where could I delegate or rest without guilt?",
    ],
  },
  9: {
    title: "The Humanitarian",
    essence:
      "A vibration of compassion and completion — this number reads a person drawn to causes, wisdom and the bigger picture.",
    strengths: "Generosity, forgiveness, artistic breadth, global-mindedness.",
    growthEdge:
      "Letting go is the hard part — close each chapter with gratitude, then move.",
    reflectionQuestions: [
      "What cause makes me lose track of time?",
      "What am I ready to release or complete?",
      "Whose perspective would widen mine right now?",
    ],
  },
};

/* ------------------------------------------------------------------ */
/* Master numbers 11 / 22 / 33                                         */
/* ------------------------------------------------------------------ */

export const MASTER_MEANINGS: Record<number, NumberMeaning> = {
  11: {
    title: "Master 11 — The Intuitive",
    essence:
      "An intensified 2: heightened intuition and inspiration — this number reads a person who senses undercurrents early.",
    strengths: "Vision, empathy, magnetic presence, spiritual curiosity.",
    growthEdge:
      "Intensity tips into self-doubt — ground the inspiration in one small daily action.",
    reflectionQuestions: [
      "Which quiet inner signal have I been honouring — and which ignoring?",
      "What would it look like to trust my timing?",
      "Where can I turn insight into a small, real step?",
    ],
  },
  22: {
    title: "Master 22 — The Builder of Big Things",
    essence:
      "An intensified 4: visionary building — this number reads a person who dreams in systems and serves many people through structure.",
    strengths: "Practical idealism, patience with legacy-scale projects, leadership.",
    growthEdge:
      "The scale of ambition feels heavy — count progress over perfection.",
    reflectionQuestions: [
      "What long project deserves my steadier devotion?",
      "How can I break the big vision into this week's brick?",
      "Who shares the dream and could carry it with me?",
    ],
  },
  33: {
    title: "Master 33 — The Teacher of the Heart",
    essence:
      "An intensified 6: devoted service — this number reads a person whose care lifts whole communities, not just circles.",
    strengths: "Deep compassion, healing presence, creative mentorship.",
    growthEdge:
      "Carrying others can eclipse you — make the giving sustainable.",
    reflectionQuestions: [
      "Where does my care have the most ripple effect?",
      "What boundaries protect my ability to serve?",
      "How do I refill the well I pour from?",
    ],
  },
};

export function meaningFor(n: number): NumberMeaning {
  if (n === 11 || n === 22 || n === 33) return MASTER_MEANINGS[n];
  return (
    NUMBER_MEANINGS[n] ?? {
      title: `Number ${n}`,
      essence: "A reflective vibration to explore.",
      strengths: "",
      growthEdge: "",
      reflectionQuestions: [],
    }
  );
}

/* ------------------------------------------------------------------ */
/* Ank Dasha themes (v3 direct voice — owner's rewrite order)           */
/* ------------------------------------------------------------------ */

/**
 * v3 DIRECT-VOICE Ank Dasha themes (owner ban on hedged copy: no 'theme',
 * no 'may be a supportive period'). Direct jyotishi narrative, EN + HI.
 */
export const PERSONAL_YEAR_THEMES: Record<number, { theme: string; focus: string }> = {
  1: {
    theme: "The year of new beginnings — career takes a big turn",
    focus: "Name the mission in one line and start in the first half — the first mover wins this year.",
  },
  2: {
    theme: "The patience year — partnerships ripen, quick wins hide",
    focus: "Feed the key relationships daily; stop measuring speed, the compounding runs underneath.",
  },
  3: {
    theme: "The visibility year — your name travels far",
    focus: "Publish, present, speak weekly; money follows attention this year.",
  },
  4: {
    theme: "The foundations year — hardest work, biggest payoff later",
    focus: "Build the systems, delay the grand launch one year; shortcuts bill double now.",
  },
  5: {
    theme: "The change year — travel, switches and new markets",
    focus: "Say yes to movement; write every deal down before signing.",
  },
  6: {
    theme: "The family-and-fortune year — home and money bloom together",
    focus: "Make the family decision you keep circling; keep the home promise before the business one.",
  },
  7: {
    theme: "The master-study year — loud pushes stall, mastery compounds",
    focus: "Master one craft quietly; the stage reopens next year and runs on what you learn now.",
  },
  8: {
    theme: "The money-and-power year — paisa-barne ka saal",
    focus: "Ask for the position, close the property, collect receivables — and keep it clean; Saturn audits.",
  },
  9: {
    theme: "The completion year — chapters close by choice or by force",
    focus: "Finish what hangs, forgive what binds; clear the desk for the new cycle.",
  },
  11: {
    theme: "The intuitive master-year (11) — big signals need grounding",
    focus: "One grounded step daily; a concrete project turns inspiration into legacy.",
  },
  22: {
    theme: "The master-builder year (22) — visions seeking structure",
    focus: "Think in decades; lay one foundation stone every week.",
  },
  33: {
    theme: "The devoted-service year (33) — care that ripples beyond circles",
    focus: "Mentor one person deliberately; refill your own well weekly.",
  },
};

/** Personal Month flavor lines — direct voice (v3). */
export const PERSONAL_MONTH_THEMES: Record<number, string> = {
  1: "the month to make the first move — proposals land, doors crack open",
  2: "a listening month — the deal that arrives quietly beats the one you chase",
  3: "a visibility month — speak, post, present; your voice collects favours",
  4: "a systems month — the unglamorous work here is the highest-paid work",
  5: "a movement month — travel, pitch, network; the fresh contact pays",
  6: "a family-and-fortune month — the home promise kept now returns with interest",
  7: "a study month — research now saves rework later; visibility can wait",
  8: "the money month — chase receivables, negotiate hard, close clean",
  9: "the closure month — finish, forgive, empty the desk for what comes",
};

/** Watch-outs per Personal Month — plain-spoken checks (v3). */
export const PERSONAL_MONTH_WATCHOUTS: Record<number, string> = {
  1: "watch-out: impatience with slower people burns alliances this month",
  2: "watch-out: absorbing others' moods without noticing your own",
  3: "watch-out: ten bright tables starve the main one",
  4: "watch-out: stiffness when plans need to flex",
  5: "watch-out: impulsive big bets — write the deal, then move",
  6: "watch-out: carrying responsibilities that aren't yours",
  7: "watch-out: retreating when one honest conversation would do",
  8: "watch-out: shortcuts — Saturn sends the bill in the same year",
  9: "watch-out: holding on to what is clearly finished",
};

/* ------------------------------------------------------------------ */
/* Life-area lenses (Six-Month Forecast tabs)                          */
/* ------------------------------------------------------------------ */

export const LIFE_AREA_PROMPT: Record<string, string> = {
  Career:
    "Which move does this month's Ank Dasha demand — and what is stopping it?",
  Relationships:
    "Which relationship deserves the honest sentence this month?",
  "Money Mindset":
    "Is this a money month (8/5) or a saving month (4)? Act on the answer.",
  Wellbeing:
    "Which rhythm of rest, movement and nourishment keeps this month's pace sustainable?",
  Creativity:
    "What wants to be expressed through you this month — and what's stopping it?",
};

/* ------------------------------------------------------------------ */
/* Lo Shu digit themes (kept in meanings for safe-language copy)       */
/* ------------------------------------------------------------------ */

export const LO_SHU_CELL_HINT: Record<number, string> = {
  1: "leadership and fresh starts",
  2: "sensitivity and partnership",
  3: "creativity and expression",
  4: "order and practicality",
  5: "freedom and adaptability",
  6: "care and home harmony",
  7: "analysis and inner life",
  8: "money mindset and ambition",
  9: "compassion and idealism",
};

/** v3.2 Hinglish twin of LO_SHU_CELL_HINT (spoken register, romanized). */
export const LO_SHU_CELL_HINT_HI: Record<number, string> = {
  1: "leadership aur nayi shuruaat",
  2: "sensitivity aur saajhedari",
  3: "creativity aur expression",
  4: "order aur practical dimaag",
  5: "azadi aur adaptability",
  6: "care aur ghar ki harmony",
  7: "analysis aur bheetari zindagi",
  8: "paisa-dimaag aur ambition",
  9: "compassion aur idealism",
};