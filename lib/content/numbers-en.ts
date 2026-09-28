/**
 * Anko Ki Maya v2 — English interpretive content.
 *
 * All copy written originally for this project; themes drawn from the study
 * notes are REWRITTEN in original words (no verbatim borrowing from any
 * book/site). Safe-language: layered essence/shadow/gift/practice framing —
 * possibilities and themes, never deterministic guarantees.
 */

export interface NumberContent {
  number: number;
  title: string;
  essence: string; // ~2 sentences
  shadow: string;
  gift: string;
  practice: string;
  essay: string; // ~150-300 words with essence/shadow/gift/practice layers
  keywords: string[];
}

export const NUMBER_CONTENT_EN: Record<number, NumberContent> = {
  1: {
    number: 1,
    title: "The Initiator",
    essence:
      "One carries the voltage of the first step — the spark that prefers to move before the map is finished. People with strong 1 energy tend to think in openings rather than endings.",
    shadow:
      "The same spark can burn as impatience: listening slips, help feels like interference, and pride quietly insists on doing everything alone.",
    gift:
      "Originality that starts things — the courage to stand first in an empty room and call it a beginning.",
    practice:
      "Begin one thing this week that is unmistakably yours, and invite one person into it early — initiation plus inclusion is the full 1.",
    essay:
      "In the classical charts 1 belongs to the Sun: the number that lights a scene simply by entering it. If this vibration runs through your core numbers, you likely recognise a restlessness that will not accept borrowed directions. You would rather invent a path than memorise one, and people around you probably come to you when a decision needs an owner.\n\nThe shadow side is worth honest attention. Independence, unexamined, hardens into a one-person army: you stop delegating, stop asking, and then wonder why the load feels heavy. Ego in the 1 vibration rarely shouts — it just quietly edits other people out of the plan.\n\nThe gift of this number is real and rare: the ability to begin without permission. Very few vibrations can walk into uncertainty and treat it as an invitation.\n\nThe practice that balances 1 is deliberate inclusion. Start the project, make the call, plant the flag — and then, early and on purpose, hand a meaningful piece of it to someone else. Initiation plus inclusion turns the lone spark into a fire that others can warm their hands at. A theme to reflect on: where did leading alone serve you last year, and where did it quietly cost you?",
    keywords: ["initiation", "independence", "originality", "leadership", "courage"],
  },
  2: {
    number: 2,
    title: "The Partner",
    essence:
      "Two is the number of the space between people — the sensitivity that notices a mood entering the room before a word is spoken. Strong 2 energy builds bridges and remembers birthdays.",
    shadow:
      "The tuning fork of 2 can vibrate to everyone else's note: agreeing to stay safe, resenting quietly, and losing track of where you end and others begin.",
    gift:
      "Diplomacy that dissolves friction — the rare ability to hold two people's truths at once without dropping either.",
    practice:
      "Once this week, say the true sentence gently instead of the easy sentence — boundary and kindness can share a single breath.",
    essay:
      "Classical systems give 2 to the Moon: reflective, receptive, pulling tides in things that look still. If 2 runs through your core numbers, you probably read rooms before you read pages — nuance, subtext and the sentence someone almost said are your native texts. Where a 1 walks in and starts, a 2 circles the table first, sensing who needs what.\n\nThe shadow deserves care. Receptivity without an anchor becomes accommodation: you agree, you absorb, you adjust — and somewhere in that generosity the record of your own preferences goes missing. Resentment in the 2 vibration is usually unspoken agreement that was never actually agreed with.\n\nThe gift is profound: peacemaking that is not weakness. A tuned 2 can sit between two enemies and leave with both feeling understood — families, teams and friendships stay intact because you are in them.\n\nThe practice is gentle honesty. Choose one relationship where you have been smoothing over a real difference. Say the true thing, slowly and kindly, this week. A theme to reflect on: which 'yes' in your life is actually a 'not yet'?",
    keywords: ["partnership", "sensitivity", "diplomacy", "patience", "empathy"],
  },
  3: {
    number: 3,
    title: "The Communicator",
    essence:
      "Three is the number of expression — the joy that turns an idea into a story, a story into laughter, laughter into connection. Strong 3 energy makes rooms warmer by being in them.",
    shadow:
      "Bright energy scatters easily: ten beginnings, three middle acts, few endings — and criticism lands harder on you than you ever show.",
    gift:
      "The alchemy of words — making the complex feel simple and the ordinary feel worth telling.",
    practice:
      "Pick one creative thread and finish a small piece of it publicly this week — expression completes itself in the sharing.",
    essay:
      "Tradition reads 3 as the child of 1 and 2: impulse joined to harmony produces expression. It is the number of writers, teachers, performers and storytellers — anyone whose gift turns air into atmosphere. If 3 moves through your core numbers, your mind probably runs several bright tracks at once, and silence feels less like rest and more like a held breath.\n\nThe shadow of 3 is scattering. Enthusiasm starts ten fires and remembers to feed three; projects bloom and wilt from sheer abundance. And beneath the sparkle, many 3s carry an unusual sensitivity to criticism — the laugh on the outside, the sting replaying on the inside.\n\nThe gift is genuine charisma: the ability to make meaning enjoyable. Ideas that would die in a report come alive in your telling. Communities form around your humour.\n\nThe practice is finishing. Choose the single most alive creative thread and carry one small piece of it to completion — publish, present, perform — this week. Expression in the 3 vibration completes its circuit only when it is shared. A theme to reflect on: what did you start this year that deserves one more push to done?",
    keywords: ["expression", "creativity", "joy", "storytelling", "optimism"],
  },
  4: {
    number: 4,
    title: "The Builder",
    essence:
      "Four is the number of the foundation — the patience that shows up again tomorrow, and the next day, until the thing stands. Strong 4 energy turns ideas into systems that outlast moods.",
    shadow:
      "Order can ossify: rules become walls, spontaneity feels like threat, and 'this is how it's done' quietly blocks a better how.",
    gift:
      "Endurance — the rare discipline that keeps building after the excitement has left the room.",
    practice:
      "Repair or systematise one small corner of your work or home this week — and then deliberately break your own routine once, on purpose, to prove the walls have doors.",
    essay:
      "In the older charts 4 is the square: the shape that holds weight, the number of foundations, seasons and steady return. If 4 runs through your core numbers, you are likely the person others quietly depend on — the one who reads the fine print, remembers the commitment, and is still there when the exciting people have drifted to the next thing.\n\nThe shadow is rigidity. A love of order, unexamined, can turn method into prison: change reads as chaos, other people's messiness reads as disrespect, and the plan becomes more precious than the purpose it served. In the karmic-debt form (13), tradition reads a lesson about effort itself — work that flows when the heart is in it and grinds when it is not.\n\nThe gift is trustworthiness, the slowest-burning and most valuable fuel in any endeavour. Systems you build keep working when you are resting.\n\nThe practice is flexible strength: build the routine — and once a week, deliberately step outside it in a small chosen way. Structure with doors, not walls. A theme to reflect on: which rule in your life is a foundation, and which is just familiar?",
    keywords: ["structure", "discipline", "loyalty", "foundations", "endurance"],
  },
  5: {
    number: 5,
    title: "The Explorer",
    essence:
      "Five is the number of the open road — senses sharp, curiosity hungry, change treated as nutrition rather than threat. Strong 5 energy learns by touching the world directly.",
    shadow:
      "Freedom can tilt into flight: commitments feel like cages, restlessness mistakes motion for progress, and excess whispers that more of everything will finally feel like enough.",
    gift:
      "Adaptability — the composure that stays resourceful when plans collapse, because you never fully believed they were the destination anyway.",
    practice:
      "Choose your one anchor — a practice, a person, a promise — that stays fixed while everything else moves, and honour it daily.",
    essay:
      "Tradition gives 5 to quicksilver Mercury: the number of trade, travel, languages and the five senses through which the world arrives. If 5 runs through your core numbers, you probably learn with your whole body — lectures bore you, markets teach you, and a new city feels like a library you get to walk through. Change does not frighten you; stagnation does.\n\nThe shadow is the scatter of a magnificent appetite. Freedom without an anchor drifts into overcommitment — the calendar full, the wells dry. In its karmic-debt form (14), tradition reads a lesson about excess itself: the same sensitivity that makes pleasures vivid can make them habit-forming, and the practice is moderation as a form of self-respect rather than punishment.\n\nThe gift is resilience through versatility. When the plan dies, a 5 is already curious about what the rubble reveals — reinvention is your resting state.\n\nThe practice is the sacred anchor. Pick one fixed point — a morning walk, a weekly call, a standing promise — and treat it as the pole star while everything else rotates. Freedom with a keel sails far. A theme to reflect on: what constant have you been avoiding, and what would one small constant make possible?",
    keywords: ["freedom", "adaptability", "curiosity", "change", "versatility"],
  },
  6: {
    number: 6,
    title: "The Nurturer",
    essence:
      "Six is the number of care made visible — the hand that fixes, feeds, beautifies and holds. Strong 6 energy treats other people's wellbeing as part of its own definition of a good day.",
    shadow:
      "Care can curdle into control: giving with an invisible invoice attached, perfectionism projected onto everyone nearby, and the self quietly last on every list.",
    gift:
      "Devotion that builds sanctuaries — homes, teams and friendships that feel safe because you tend them.",
    practice:
      "Do one beautiful thing for your own space or body this week, with zero usefulness required — receiving is also a discipline.",
    essay:
      "Tradition gives 6 to Venus: harmony, beauty, home, and love that expresses itself as service. If 6 runs through your core numbers, you likely cannot walk past an unwatered plant or an unfed guest — responsibility for the happiness of your circle is simply part of how you see. People describe you as dependable the way lighthouses are dependable.\n\nThe shadow needs gentle honesty. Care that never asks 'and me?' becomes martyrdom with a tidy face: resentment accrues invisibly, control masquerades as help, and the standard of perfection you hold quietly exhausts everyone standing near it.\n\nThe gift is sanctuary-building. A tuned 6 creates spaces — houses, studios, teams — where people exhale. Beauty, comfort and loyalty flow from your hands with unusual fluency.\n\nThe practice is receiving. Once a week, deliberately occupy the other chair: ask for help, accept the compliment, spend on yourself without justification. The caretaker who cannot be cared for eventually serves from an empty bowl. A theme to reflect on: whose comfort did you protect this month, and who is protecting yours?",
    keywords: ["care", "harmony", "home", "beauty", "responsibility"],
  },
  7: {
    number: 7,
    title: "The Seeker",
    essence:
      "Seven is the number of the inner temple — depth over display, questions over answers, meaning over noise. Strong 7 energy studies the room by leaving it, periodically, for quieter rooms.",
    shadow:
      "Depth can become distance: withdrawal that looks like peace from outside and feels like loneliness from inside, and analysis that postpones living indefinitely.",
    gift:
      "Insight — the ability to see the pattern underneath the event, and to be comfortable in questions that keep others awake.",
    practice:
      "Take one finding from your inner world and voice it to someone who matters this week — insight ripens only when spoken.",
    essay:
      "Tradition gives 7 to the seeker's path: study, solitude, and the stubborn conviction that surfaces are the least interesting part of anything. If 7 runs through your core numbers, small talk may genuinely cost you — not from shyness, but because the conversation you want is always three layers down. You trust what you have verified, not what you have been told.\n\nThe shadow is the hermit's trap. Solitude, which begins as a resource, can quietly become a policy: analysis replaces action, reflection replaces connection, and the inner temple becomes a hiding place with good architecture.\n\nThe gift is depth perception. A tuned 7 sees the pattern under the situation, the motive under the statement, the question under the question. Research, diagnosis, philosophy, craft mastery — all belong naturally to you.\n\nThe practice is export. Choose one insight per week and give it away — tell the friend what you noticed, teach the colleague what you learned, publish the note. Wisdom in the 7 vibration completes itself only when it leaves the temple. A theme to reflect on: what do you know deeply that you have never said aloud?",
    keywords: ["depth", "analysis", "spirituality", "solitude", "wisdom"],
  },
  8: {
    number: 8,
    title: "The Steward",
    essence:
      "Eight is the number of the long game — ambition with a memory, resources managed like a promise, power held like a responsibility. Strong 8 energy builds things that can carry weight.",
    shadow:
      "The engine can eat its driver: work-life balance dissolves, self-worth gets measured in outcomes, and control tightens exactly where trust should loosen.",
    gift:
      "Executive gravity — the capacity to take a heavy vision and organise the people, money and patience that make it real.",
    practice:
      "Review your money and your calendar together once this week, and ask what each is buying you in the wider wealth: time, health, relationships.",
    essay:
      "Tradition gives 8 to Saturn's school: the number of consequence, endurance and material mastery. If 8 runs through your core numbers, you likely think in decades, not quarters — you can wait out a slow season because you are building something with a spine. Justice matters to you unduly; you keep ledgers, and you pay what is owed.\n\nThe shadow is heavy. An unexamined 8 can turn into all engine and no driver: rest feels like theft, tenderness feels like liability, and somewhere along the way the abundant life you were funding becomes the thing you no longer have time to live. In its karmic-debt form (17's cousin 8 lessons aside), tradition reads power as a test of stewardship: the same strength that builds can crush if it stops listening.\n\nThe gift is gravity. A tuned 8 can walk into chaos — a failing budget, a broken team, a stalled project — and the room settles, because someone finally has the weight to hold it.\n\nThe practice is holistic accounting. Once a week, audit wealth in its full dimensions: money, time, health, love. A balanced 8 spends on all four currencies. A theme to reflect on: what did your ambition buy you this year — and what did it quietly cost?",
    keywords: ["ambition", "stewardship", "justice", "abundance", "endurance"],
  },
  9: {
    number: 9,
    title: "The Humanitarian",
    essence:
      "Nine is the number of the wide lens — compassion with a spine, wisdom that has survived disillusionment, love that includes strangers. Strong 9 energy asks what any decision means for the whole.",
    shadow:
      "Wide vision can blur the near: personal needs go unattended, endings are dragged out of loyalty, and old grievances replay because forgiveness was offered but never completed.",
    gift:
      "Generosity that changes rooms — the ability to see people as they could be and treat them as if it were already true.",
    practice:
      "Complete one ending this week — forgive the debt, close the project, give the thing away — and mark the release deliberately.",
    essay:
      "Tradition gives 9 to Mars' mature face: the number that contains all the digits and, in that sense, has met them all. If 9 runs through your core numbers, you probably live at an unusual altitude — petty politics bore you, causes energise you, and your compassion has survived enough disappointment to have developed muscles. You forgive, but you do not forget the lesson.\n\nThe shadow is the unfinished ending. The 9 vibration loves completeness, yet its loyalty can keep it holding doors open long after the room has emptied. Old hurts replay not because forgiveness was impossible, but because the ritual of release was never actually performed — the feeling was offered, the chapter was not closed.\n\nThe gift is the wide lens. A tuned 9 sees the human in the stranger, the pattern in the era, the purpose in the pain. Art, teaching, healing, leadership with conscience — all draw naturally on you.\n\nThe practice is conscious completion. Choose one thing — a resentment, a project, a possession — and end it with ceremony this week: forgive fully, ship the final version, hand the item to someone who needs it. A theme to reflect on: what are you still carrying that has already finished its lesson?",
    keywords: ["compassion", "completion", "wisdom", "generosity", "healing"],
  },
};

/* ------------------------------------------------------------------ */
/* Master numbers                                                      */
/* ------------------------------------------------------------------ */

export const MASTER_CONTENT_EN: Record<number, NumberContent> = {
  11: {
    number: 11,
    title: "Master 11 — The Intuitive Channel",
    essence:
      "Eleven is a 2 raised to high voltage: the antennae that sense undercurrents before events confirm them. It arrives with inspiration — and with the responsibility to stay grounded.",
    shadow:
      "High sensitivity swings: self-doubt, nerves frayed by noise, and inspiration admired from the shore rather than sailed.",
    gift:
      "Vision and felt-sense — the channel that receives the idea before the evidence arrives.",
    practice:
      "Pair every bolt of insight with one small grounded action within 24 hours — inspiration plus implementation is the full 11.",
    essay:
      "Eleven stands upright like two pillars — the classical image of a channel between what is seen and what is sensed. When 11 appears in a core position, tradition reads an intensified 2: all the sensitivity of the partner number, run through a higher voltage. You may notice you know things before you can explain knowing them; rooms, people and decisions transmit their nature to you early.\n\nThe shadow is the price of the voltage. Nervous systems this receptive fray in noise; self-doubt arrives precisely because you can see the gap between what you sense and what you can prove. Some 11s spend years admiring their own signal from the shore, waiting for confidence before acting — the current does not work that way.\n\nThe gift is genuine vision. A tuned 11 articulates the undercurrent that everyone feels and nobody has named, and people suddenly feel less alone in the fog.\n\nThe practice is grounding the signal. Within a day of each real insight, take one concrete step — write it, build the smallest version, tell the one right person. Dual notation applies here: 11/2 means the intuitive channel and the partnering heart are the same gift at two altitudes. A theme to reflect on: which inner signal have you been honouring, and which explaining away?",
    keywords: ["intuition", "inspiration", "sensitivity", "vision", "grounding"],
  },
  22: {
    number: 22,
    title: "Master 22 — The Master Builder",
    essence:
      "Twenty-two is a 4 raised to architectural scale: visions that require decades, structures that serve thousands. It is the number of the cathedral-thinker who still lays one brick at a time.",
    shadow:
      "The scale can paralyse: projects feel too large to start, perfectionism delays the first brick, and the weight of 'this should matter' crushes play.",
    gift:
      "Practical idealism — dreams that survive contact with logistics, and logistics that stay worthy of the dream.",
    practice:
      "Name the cathedral in one sentence, then lay this week's brick — same sentence, smaller scale, every week.",
    essay:
      "Twenty-two is the classical master-builder: the 4's discipline multiplied by the 11's vision, drawn at the scale of institutions, communities and legacies. When 22 sits in a core position, tradition reads a person who cannot be satisfied with a sandcastle — the inner question is always 'what would this look like if it served ten thousand people?'\n\nThe shadow is the intimidation of scale. Dreams this size can freeze the builder at the drawing board: better to imagine than to begin and see the vision shrink into scaffolding. Some 22s spend decades preparing to begin.\n\nThe gift is the rarest fusion in the number system: imagination that respects logistics. A tuned 22 holds a twenty-year vision in one hand and a Tuesday schedule in the other, and both hands agree.\n\nThe practice is the brick discipline. Write the whole vision in one sentence. Then lay one literal brick this week — the smallest concrete act that a witness could photograph. Dual notation applies: 22/4 means the master builder and the steady mason are the same soul at two altitudes. A theme to reflect on: which long project keeps knocking at your door, and what is the smallest brick it is asking for this week?",
    keywords: ["master-builder", "vision", "legacy", "practical-idealism", "scale"],
  },
  33: {
    number: 33,
    title: "Master 33 — The Teacher of the Heart",
    essence:
      "Thirty-three is a 6 raised to devotional scale: care that reaches beyond family and circle toward anyone who needs teaching, healing or lifting. Love, in this vibration, becomes a vocation.",
    shadow:
      "The well runs dry invisibly: carrying others' pain as identity, boundaries read as betrayal, and self-care postponed in favour of everyone's emergency.",
    gift:
      "Healing presence — people leave conversations with you standing straighter than they entered.",
    practice:
      "Serve from overflow, not obligation: refill your own well first each week, then give from what genuinely renews.",
    essay:
      "Thirty-three is the classical teacher of the heart: the 6's devotion enlarged until the household becomes the community. When 33 stands in a core position, tradition reads a vocation of care — teaching, healing, mentoring, raising — where the act of lifting others is not a task on the list but the shape of the list itself.\n\nThe shadow is the emptied caretaker. Devotion at this scale can quietly dissolve the self: your worth fuses with your usefulness, rest feels like abandonment of duty, and the healer stops healing themselves first. Boundaries, which are the guardrails of sustainable giving, read as betrayal of the very people you serve.\n\nThe gift is rare presence. A tuned 33 changes the gravity of a room — the anxious settle, the lost find direction, children and elders alike relax. This is not technique; it is nature.\n\nThe practice is refill-first. Each week, tend your own well deliberately — rest, beauty, silence, joy — and only then pour. Dual notation applies: 33/6 means the master teacher and the devoted nurturer are the same heart at two altitudes. A theme to reflect on: where does your care have the widest ripple — and what would sustainable giving look like there?",
    keywords: ["devotion", "healing", "teaching", "compassion", "service"],
  },
};

/* ------------------------------------------------------------------ */
/* Zero-masters framing                                                */
/* ------------------------------------------------------------------ */

export const ZERO_MASTERS_EN =
  "Your chart holds no master number 11/22/33 — and that is a fully valid, complete chart. Master numbers are one octave of the language, not a rank: the 2, 4 and 6 vibrations carry the same themes at ground level, lived through practice rather than voltage. Depth of life is measured in how you meet your numbers, never in how loudly they announce themselves.";

export const MASTER_BADGE_LABEL = "Master number";

/* ------------------------------------------------------------------ */
/* Karmic debt meanings (13/14/16/19)                                  */
/* ------------------------------------------------------------------ */

export const KARMIC_DEBT_CONTENT_EN: Record<number, { title: string; theme: string }> = {
  13: {
    title: "Karmic Debt 13 — the discipline of honest work",
    theme:
      "Tradition reads 13 as a recurring work-discipline theme: shortcuts have cost you before, and effort done with the heart flows where effort done grudgingly grinds. A theme to reflect on: which task in your life deserves your whole hand, not half of it?",
  },
  14: {
    title: "Karmic Debt 14 — freedom measured by moderation",
    theme:
      "Tradition reads 14 as a theme of excess and its recalibration: vivid appetites, sudden changes, and the repeated invitation to choose the middle path by self-respect rather than by punishment. A theme to reflect on: which pleasure rules you a little, and what would a sovereign version of it look like?",
  },
  16: {
    title: "Karmic Debt 16 — the citadel rebuilt",
    theme:
      "Tradition reads 16 as ego's structures meeting lightning: a sudden fall from a high place followed by a humbler, truer rebuild. The classical warning is about illusions of invulnerability; the classical gift is a foundation that finally stands on reality. A theme to reflect on: what in your life was built on image, and what would the honest version look like?",
  },
  19: {
    title: "Karmic Debt 19 — independence in service",
    theme:
      "Tradition reads 19 as power's lesson: strength and leadership given first, interdependence learned later. The self-centred use of force isolates; the same force in service builds. A theme to reflect on: where does your standing-alone serve the work, and where has it become the work's obstacle?",
  },
};

/* ------------------------------------------------------------------ */
/* Karmic lessons (missing name digits)                                */
/* ------------------------------------------------------------------ */

export const KARMIC_LESSON_EN: Record<number, string> = {
  1: "Missing 1 in the name suggests a life-theme around initiating: beginning may not come naturally, so small deliberate starts become a learned superpower.",
  2: "Missing 2 in the name suggests a life-theme around sensitivity: partnership and patience may need conscious practice — they arrive as skills earned, not gifts assumed.",
  3: "Missing 3 in the name suggests a life-theme around expression: joy and creative voice may need deliberate cultivation, especially the courage to be seen enjoying.",
  4: "Missing 4 in the name suggests a life-theme around order: systems and follow-through may be the lessons of adulthood — structure learned later, held more consciously.",
  5: "Missing 5 in the name suggests a life-theme around adaptability: change and variety may be approached cautiously at first, then mastered deliberately.",
  6: "Missing 6 in the name suggests a life-theme around care: responsibility for others' wellbeing may be learned through experience rather than instinct — and all the stronger for it.",
  7: "Missing 7 in the name suggests a life-theme around reflection: quiet analysis and faith-in-the-unproven may both need cultivating against a bias for the visible and immediate.",
  8: "Missing 8 in the name suggests a life-theme around material mastery: money and authority lessons arrive as a curriculum — taught by the world, learned by choice.",
  9: "Missing 9 in the name suggests a life-theme around completion: letting go, forgiving and seeing the bigger picture may be practiced skills — the widest lens earned last.",
};

/* ------------------------------------------------------------------ */
/* Bridge numbers                                                      */
/* ------------------------------------------------------------------ */

export const BRIDGE_CONTENT_EN: Record<number, string> = {
  0: "Bridge 0 — an open road between two parts of you: the inner and outer already cooperate.",
  1: "Bridge 1 — a small gap between parts of you: adjust one habit and the two begin cooperating.",
  2: "Bridge 2 — sensitivity is the connector: more patience between your inner and outer life closes this bridge.",
  3: "Bridge 3 — expression is the connector: say the feeling out loud and the gap closes.",
  4: "Bridge 4 — work is the connector: a shared practical project unites these parts of you.",
  5: "Bridge 5 — flexibility is the connector: one deliberate change of routine links the two sides.",
  6: "Bridge 6 — care is the connector: responsibility for home or loved ones naturally fuses these parts.",
  7: "Bridge 7 — reflection is the connector: quiet study or retreat time heals the split.",
  8: "Bridge 8 — stewardship is the connector: a long-term material goal gives both parts a common job.",
};

/* ------------------------------------------------------------------ */
/* Hidden passion & balance                                            */
/* ------------------------------------------------------------------ */

export const HIDDEN_PASSION_EN: Record<number, string> = {
  1: "Hidden Passion 1 — a repeated pull toward independence and starting things threads through your whole name.",
  2: "Hidden Passion 2 — a repeated pull toward partnership, sensitivity and peacemaking threads through your name.",
  3: "Hidden Passion 3 — a repeated pull toward expression, joy and creative voice threads through your name.",
  4: "Hidden Passion 4 — a repeated pull toward order, craft and steady work threads through your name.",
  5: "Hidden Passion 5 — a repeated pull toward freedom, change and sensory aliveness threads through your name.",
  6: "Hidden Passion 6 — a repeated pull toward care, beauty and home threads through your name.",
  7: "Hidden Passion 7 — a repeated pull toward depth, study and meaning threads through your name.",
  8: "Hidden Passion 8 — a repeated pull toward stewardship, ambition and justice threads through your name.",
  9: "Hidden Passion 9 — a repeated pull toward compassion, causes and completion threads through your name.",
};

export const BALANCE_NOTE_EN =
  "The Balance number (your initials, reduced) is read in tradition as the tone you strike under pressure. It colours how all your other numbers behave in a storm.";

/* ------------------------------------------------------------------ */
/* Rational thought                                                    */
/* ------------------------------------------------------------------ */

export const RATIONAL_THOUGHT_EN: Record<number, string> = {
  1: "Rational Thought 1 — the mind reaches conclusions independently and fast; it trusts its own first reading.",
  2: "Rational Thought 2 — the mind deliberates by weighing, pairing and consulting; it trusts harmony over speed.",
  3: "Rational Thought 3 — the mind thinks in images and stories; it trusts what can be said memorably.",
  4: "Rational Thought 4 — the mind builds stepwise proofs; it trusts what survives procedure.",
  5: "Rational Thought 5 — the mind thinks by reframing; it trusts what survives a change of angle.",
  6: "Rational Thought 6 — the mind thinks in duties and effects; it trusts what benefits the whole.",
  7: "Rational Thought 7 — the mind thinks by drilling downward; it trusts only what survives silence.",
  8: "Rational Thought 8 — the mind thinks in costs and structures; it trusts what can carry weight.",
  9: "Rational Thought 9 — the mind thinks in eras and patterns; it trusts what stays true from altitude.",
};