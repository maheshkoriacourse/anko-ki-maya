/**
 * Anko Ki Maya — original interpretive copy.
 *
 * Every line here is written for this project. Do NOT paste interpretation
 * text from other websites/books (copyright + tone). Safe-language rules
 * (README → "Safety language rules") apply to every string in this file:
 * themes, possibilities and reflection prompts — never guarantees.
 */

export const DISCLAIMER = "Anko Ki Maya is for entertainment and self-reflection only. It is not medical, legal, financial, mental-health, or factual predictive advice.";

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
      "A vibration of independent beginnings — may reflect a person who prefers to lead, originate and think for themselves.",
    strengths:
      "Original thinking, courage to start, comfort with standing alone.",
    growthEdge:
      "May notice a pull between independence and asking for help; a theme to reflect on is balancing self-leadership with collaboration.",
    reflectionQuestions: [
      "Where in my life am I being invited to begin something of my own?",
      "When did I last ask for support — and how did that feel?",
      "What would 'leading gently' look like this week?",
    ],
  },
  2: {
    title: "The Partner",
    essence:
      "A vibration of sensitivity and partnership — may reflect a person who notices nuance, builds bridges and values harmony.",
    strengths: "Empathy, patience, diplomacy, attention to detail in relationships.",
    growthEdge:
      "May notice a theme around saying no and honouring their own pace — worth reflecting on boundaries.",
    reflectionQuestions: [
      "Which relationship deserves more of my honest attention?",
      "Where might I be agreeing when I want to pause?",
      "What does gentle patience look like in action?",
    ],
  },
  3: {
    title: "The Communicator",
    essence:
      "A vibration of expression and joy — may reflect a person who uplifts through words, art and humour.",
    strengths: "Creativity, storytelling, optimism, social warmth.",
    growthEdge:
      "May notice energy scattered across many projects; a theme to reflect on is finishing what sparkles.",
    reflectionQuestions: [
      "What do I most want to express right now?",
      "Which creative thread is asking for consistent attention?",
      "How does play restore me?",
    ],
  },
  4: {
    title: "The Builder",
    essence:
      "A vibration of structure and steadiness — may reflect a person who turns ideas into reliable systems.",
    strengths: "Discipline, loyalty, practical craft, patience with long efforts.",
    growthEdge:
      "May notice rigidity under change; a theme to reflect on is letting routines flex without losing foundations.",
    reflectionQuestions: [
      "What am I building that deserves patience?",
      "Where could a little more spontaneity serve me?",
      "What does 'enough order' look like in my week?",
    ],
  },
  5: {
    title: "The Explorer",
    essence:
      "A vibration of freedom and curiosity — may reflect a person who learns by moving, tasting and adapting.",
    strengths: "Adaptability, magnetic energy, courage to change course.",
    growthEdge:
      "May notice restlessness between commitments; a theme to reflect on is freedom with follow-through.",
    reflectionQuestions: [
      "Where is novelty enriching me — and where is it distracting me?",
      "What change have I been circling without stepping into?",
      "What anchor keeps me grounded while I explore?",
    ],
  },
  6: {
    title: "The Nurturer",
    essence:
      "A vibration of care and responsibility — may reflect a person who creates beauty and takes care of people and places.",
    strengths: "Warmth, dependability, aesthetic sense, devotion to loved ones.",
    growthEdge:
      "May notice over-giving; a theme to reflect on is care that includes the self.",
    reflectionQuestions: [
      "Who or what am I caring for — and is the ledger balanced?",
      "Where might service be hiding perfectionism?",
      "What does receiving gracefully feel like?",
    ],
  },
  7: {
    title: "The Seeker",
    essence:
      "A vibration of depth and analysis — may reflect a person who needs quiet, study and meaning beneath surfaces.",
    strengths: "Insight, focus, comfort with solitude, love of learning.",
    growthEdge:
      "May notice withdrawal when connection is needed; a theme to reflect on is sharing inner findings with trusted people.",
    reflectionQuestions: [
      "What question has been living in me this season?",
      "Where do I find meaningful stillness?",
      "Which insight am I ready to voice?",
    ],
  },
  8: {
    title: "The Steward",
    essence:
      "A vibration of stewardship and material mastery — may reflect a person who shapes resources, organisations and long games.",
    strengths: "Ambition with stamina, fairness, comfort with responsibility.",
    growthEdge:
      "May notice work-life imbalance; a theme to reflect on is wealth in the wider sense — time, health, relationships.",
    reflectionQuestions: [
      "What am I building toward, and why does it matter to me?",
      "How do I define abundance beyond money?",
      "Where could I delegate or rest without guilt?",
    ],
  },
  9: {
    title: "The Humanitarian",
    essence:
      "A vibration of compassion and completion — may reflect a person drawn to causes, wisdom and the bigger picture.",
    strengths: "Generosity, forgiveness, artistic breadth, global-mindedness.",
    growthEdge:
      "May notice difficulty letting go; a theme to reflect on is closing chapters with gratitude.",
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
      "An intensified 2: heightened intuition and inspiration — may reflect a person who senses undercurrents early.",
    strengths: "Vision, empathy, magnetic presence, spiritual curiosity.",
    growthEdge:
      "Intensity can tip into self-doubt; a theme to reflect on is grounding inspiration into small daily actions.",
    reflectionQuestions: [
      "Which quiet inner signal have I been honouring — and which ignoring?",
      "What would it look like to trust my timing?",
      "Where can I turn insight into a small, real step?",
    ],
  },
  22: {
    title: "Master 22 — The Builder of Big Things",
    essence:
      "An intensified 4: visionary building — may reflect a person who dreams in systems and serves many people through structure.",
    strengths: "Practical idealism, patience with legacy-scale projects, leadership.",
    growthEdge:
      "The scale of ambition can feel heavy; a theme to reflect on is progress over perfection.",
    reflectionQuestions: [
      "What long project deserves my steadier devotion?",
      "How can I break the big vision into this week's brick?",
      "Who shares the dream and could carry it with me?",
    ],
  },
  33: {
    title: "Master 33 — The Teacher of the Heart",
    essence:
      "An intensified 6: devoted service — may reflect a person whose care lifts whole communities, not just circles.",
    strengths: "Deep compassion, healing presence, creative mentorship.",
    growthEdge:
      "Carrying others can eclipse the self; a theme to reflect on is sustainable giving.",
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
/* Personal Year themes (9-year cycle)                                 */
/* ------------------------------------------------------------------ */

/** Safe-language Personal Year themes — possibilities, never predictions. */
export const PERSONAL_YEAR_THEMES: Record<number, { theme: string; focus: string }> = {
  1: {
    theme: "A planting year — new beginnings and self-definition",
    focus: "Consider which seed you most want to plant and name it clearly.",
  },
  2: {
    theme: "A patience year — relationships, gentler rhythms and slow growth",
    focus: "Consider nurturing key connections and letting things ripen.",
  },
  3: {
    theme: "An expression year — creativity, visibility and social joy",
    focus: "Consider sharing your voice; a theme to reflect on is consistent creative play.",
  },
  4: {
    theme: "A foundations year — systems, health routines and steady work",
    focus: "Consider simplifying and building one solid structure at a time.",
  },
  5: {
    theme: "A change-and-freedom year — movement, learning and variety",
    focus: "Consider where you feel called to stretch; keep one anchor habit.",
  },
  6: {
    theme: "A care-and-home year — relationships, beauty and responsibility",
    focus: "Consider tending home, family and community bonds.",
  },
  7: {
    theme: "An inner-study year — reflection, learning and quieter pace",
    focus: "Consider a study practice or retreat time; a reflective window for insight.",
  },
  8: {
    theme: "A stewardship year — career moves, money mindset and mastery",
    focus: "Consider long-game decisions; review budgets and boundaries calmly.",
  },
  9: {
    theme: "A completion year — release, gratitude and clearing ground",
    focus: "Consider what to close with grace to make space for the next cycle.",
  },
  11: {
    theme: "An intuitive-growth year (master 11) — inspiration with sensitivity",
    focus: "Consider pairing big inner signals with small grounded steps.",
  },
  22: {
    theme: "A master-builder year (22) — visions seeking structure",
    focus: "Consider one meaningful structure that serves others.",
  },
  33: {
    theme: "A devoted-service year (33) — teaching and heart-led care",
    focus: "Consider mentoring or service that lights you up sustainably.",
  },
};

/** Safe-language Personal Month flavor lines, keyed by 1-9 (+11/22 keep 2/4). */
export const PERSONAL_MONTH_THEMES: Record<number, string> = {
  1: "may be a supportive period for starting small and claiming ownership",
  2: "may be a supportive period for listening, partnership and patient steps",
  3: "may be a supportive period for visible creative expression",
  4: "may be a supportive period for organising and steady routines",
  5: "may be a supportive period for trying new approaches and networking",
  6: "may be a supportive period for family care and beautifying spaces",
  7: "may be a supportive period for study, retreat and deep thinking",
  8: "may be a supportive period for money reviews and career asks",
  9: "may be a supportive period for wrapping up loose ends with grace",
};

/** Watch-out reflections per Personal Month — phrased as gentle checks. */
export const PERSONAL_MONTH_WATCHOUTS: Record<number, string> = {
  1: "a theme to reflect on: impatience with people who move at a different pace",
  2: "a theme to reflect on: absorbing others' moods without noticing your own",
  3: "a theme to reflect on: scattering energy across too many bright ideas",
  4: "a theme to reflect on: stiffness when plans need to flex",
  5: "a theme to reflect on: overcommitting in the excitement of novelty",
  6: "a theme to reflect on: carrying responsibilities that aren't yours",
  7: "a theme to reflect on: retreating when a simple conversation would help",
  8: "a theme to reflect on: measuring worth only by outcomes",
  9: "a theme to reflect on: holding on to what is clearly finished",
};

/* ------------------------------------------------------------------ */
/* Life-area lenses (Six-Month Forecast tabs)                          */
/* ------------------------------------------------------------------ */

export const LIFE_AREA_PROMPT: Record<string, string> = {
  Career:
    "Which work pattern is emerging for me, and what small move would honour it?",
  Relationships:
    "Which relationship deserves a more honest conversation this month?",
  "Money Mindset":
    "What belief about money am I carrying, and does it still serve me?",
  Wellbeing:
    "What rhythm of rest, movement and nourishment feels sustainable now?",
  Creativity:
    "What wants to be expressed through me this month — and what's stopping it?",
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