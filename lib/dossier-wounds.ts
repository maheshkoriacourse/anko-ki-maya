/**
 * v5.4 AKASHIC DOSSIER — CHAPTER 4: THE WOUNDS YOU CARRY
 * (canonical spec: AKASHIC-DOSSIER-MASTER-SPEC.md §4 — "the emotional
 * money-chapter; lotus-from-cracked-stone; rejection patterns, trust
 * patterns, family karma, self-worth, emotional triggers — NEVER negative,
 * always redemption").
 *
 * Engine: a bank of wound PATTERNS (each keyed to the number-combo that
 * raises it — mulank, karmic debt 13/14/16/19, missing Lo Shu digits,
 * bhagyank) + woundsOf(core) — a deterministic selector that orders the
 * 3-5 most relevant wounds for one chart, most-relevant first.
 *
 * Voice laws (enforced by validateWounds):
 *  - EN = spoken-simple, HI = romanized spoken Hinglish with 'aap';
 *    no Devanagari anywhere.
 *  - interpret NEVER predict: 'will happen' / 'may suggest' /
 *    'theme to reflect' / 'guaranteed' family is banned.
 *  - NO one-liners: every narrative block ≥2 sentences (EN ≥25 words,
 *    HI ≥25 words); upay blocks carry 2-3 concrete practices.
 *  - every wound is honest-basis referenced (basis string names the
 *    number-combo) and redemption-framed.
 */

export interface WoundPattern {
  id: string;
  nameEn: string;
  nameHi: string;
  /** how the wound forms — ≥2 sentences (EN ≥25w / HI ≥25w). */
  howItFormsEn: string;
  howItFormsHi: string;
  /** everyday examples of how it shows — ≥2 sentences each. */
  howItShowsEn: string;
  howItShowsHi: string;
  /** redemption arc — the turn, interpret-only. */
  redemptionEn: string;
  redemptionHi: string;
  /** upay: 2-3 concrete practices, bilingual. */
  upayEn: string[];
  upayHi: string[];
  /** honest basis — number-keyed, e.g. "mulank-2 + missing-6". */
  basis: string;
}

export interface WoundsCore {
  mulank: number; // reduced birth-day number (10→1, 11→2, 22→4 … caller folds)
  bhagyank: number; // life-path digit (school-folded; masters 11/22/33 accepted)
  /** Lo Shu digits absent from the grid AFTER the bhagyank digit fills. */
  missing: number[];
  /** karmic debts detected among 13/14/16/19. */
  karmic: number[];
}

/* ------------------------------------------------------------------ */
/* Matching weights — which core numbers raise which wound              */
/* ------------------------------------------------------------------ */

/** mulank → wound ids it raises (first = strongest, kept in order). */
const MULANK_WOUNDS: Record<number, string[]> = {
  1: ["kabhi-kaafi-nahi", "kisise-niche", "khud-kam-dekhna", "bharosa-toota"],
  2: ["kabhi-chuna-nahi-gaya", "chhudne-ka-darr", "mehsoos-chna-dikhaya-nahi", "kabhi-kaafi-nahi"],
  3: ["kabhi-chuna-nahi-gaya", "kabhi-kaafi-nahi", "kisise-niche", "bharosa-toota"],
  4: ["ghar-saaf-chinta", "khud-kam-dekhna", "kabhi-kaafi-nahi", "bharosa-toota"],
  5: ["chhudne-ka-darr", "bharosa-toota", "kabhi-chuna-nahi-gaya", "kisise-niche"],
  6: ["ghar-saaf-chinta", "khud-kam-dekhna", "chhudne-ka-darr", "kabhi-chuna-nahi-gaya"],
  7: ["kabhi-chuna-nahi-gaya", "bharosa-toota", "mehsoos-chna-dikhaya-nahi", "kabhi-kaafi-nahi"],
  8: ["kabhi-kaafi-nahi", "khud-kam-dekhna", "bharosa-toota", "kisise-niche"],
  9: ["bharosa-toota", "kisise-niche", "kabhi-chuna-nahi-gaya", "chhudne-ka-darr"],
};

/** karmic debt number → wound ids it raises. */
const KARMIC_WOUNDS: Record<number, string[]> = {
  13: ["kabhi-kaafi-nahi", "ghar-saaf-chinta"],
  14: ["chhudne-ka-darr", "bharosa-toota"],
  16: ["bharosa-toota", "khud-kam-dekhna"],
  19: ["kabhi-chuna-nahi-gaya", "khud-kam-dekhna"],
};

/** missing Lo Shu digit → wound ids it raises. */
const MISSING_WOUNDS: Record<number, string[]> = {
  1: ["khud-kam-dekhna", "kabhi-chuna-nahi-gaya"],
  2: ["chhudne-ka-darr", "kabhi-chuna-nahi-gaya"],
  3: ["mehsoos-chna-dikhaya-nahi", "kabhi-chuna-nahi-gaya"],
  4: ["ghar-saaf-chinta", "kabhi-kaafi-nahi"],
  5: ["mehsoos-chna-dikhaya-nahi", "kisise-niche"],
  6: ["ghar-saaf-chinta", "khud-kam-dekhna"],
  7: ["bharosa-toota", "mehsoos-chna-dikhaya-nahi"],
  8: ["kabhi-kaafi-nahi", "kisise-niche"],
  9: ["khud-kam-dekhna", "kabhi-kaafi-nahi"],
};

/** bhagyank digit → a milder flavor weight (adds one point, never leads). */
const BHAGYANK_WOUNDS: Record<number, string> = {
  1: "kabhi-kaafi-nahi",
  2: "chhudne-ka-darr",
  3: "kabhi-chuna-nahi-gaya",
  4: "ghar-saaf-chinta",
  5: "chhudne-ka-darr",
  6: "ghar-saaf-chinta",
  7: "bharosa-toota",
  8: "kabhi-kaafi-nahi",
  9: "bharosa-toota",
};

const foldDigit = (n: number): number =>
  n === 11 ? 2 : n === 22 ? 4 : n === 33 ? 6 : (((n % 9) + 9) % 9) || 9;

/* ------------------------------------------------------------------ */
/* THE BANK — 10 wound patterns (8 required + 2 depth variants)         */
/* ------------------------------------------------------------------ */

export const WOUND_BANK: WoundPattern[] = [
  {
    id: "kabhi-chuna-nahi-gaya",
    nameEn: "The wound of never being picked first",
    nameHi: "kabhi chuna nahi gaya — pehla hona hi nahi",
    howItFormsEn:
      "This wound forms in small rooms, not big ones: the team list that was read aloud and your name wasn't on it, the seat that filled up while you were still deciding, the call that went to someone 'better known'. No single day labelled it — but every small skip taught you one quiet lesson: waiting to be chosen is a skill you were never going to get graded on.",
    howItFormsHi:
      "yeh zakham chhote kamron mein banta hai, bade nahi: naamon wali list padi jaati thi aur aapka naam nahi hota tha, kursi bhar jaati thi jab tak aap tay hote, call usi ko jaati thi jo 'zyada jaana-maana' ho. kisi ek din ne yeh nahi likha — par har chhoti chhut ne ek khamosh seekh di: chuna jaana bhi ek hunar hai, aur use kaun gino.",
    howItShowsEn:
      "It shows in the small over-preparations: you arrive early, you come over-ready, you volunteer so no one gets the chance to skip you. A friend's plan where your name comes late in the sentence can quietly colour your whole evening, and you answer 'no, it's fine' before anyone has actually asked.",
    howItShowsHi:
      "yeh chhoti tayyariyon mein dikhta hai: aap waqt se pehle pahunchte ho, zyada tyar hoke aate ho, khud pehle haath uthate ho taaki aapko koi chhod hi na de. dost ki baat mein agar aapka naam aakhir mein aata hai to chupke se poora shaam rang jaata hai — aur 'nahi, koi baat nahi' aap bol dete ho jab kisi ne poochha hi nahi.",
    redemptionEn:
      "The turn arrives the day you stop auditioning. The people who stayed for the quiet version of you were not settling — they were reading you faster than the rooms you kept trying to impress. Being chosen is an event; choosing yourself is a practice, and it compounds.",
    redemptionHi:
      "mod wahan aata hai jahan aap dikhaane wali auditions band kar dete ho. jo log aapke chup-chaap roop ke saath tike, wo aapko padhne mein kamaron se tez the — thak gaye hum, chune nahi gaye. chuna jaana ek pal hai; khud ko chunna roz ki ibaadat hai — aur woh jama hoti hai.",
    upayEn: [
      "Once a week, name one thing you did purely for yourself — write it down before the week ends.",
      "Join one room where nobody knew your old story (a class, a group, a team) and let that room meet you fresh.",
    ],
    upayHi: [
      "hafte mein ek baar, ek cheez ka naam lo jo aapne sirf apne liye ki — hafte khatam hone se pehle likh lo.",
      "ek aisi jagah judo jahan aapki purani kahani koi na jaanta ho — ek class, ek group, ek team — aur us jagah ko apna naya roop dikha do.",
    ],
    basis: "mulank-2/3/7 + missing-2",
  },
  {
    id: "chhudne-ka-darr",
    nameEn: "The wound of being quietly dropped",
    nameHi: "chhudne ka darr — chup-chaap chhod diya jaana",
    howItFormsEn:
      "This forms when somebody who needed you stopped needing you without a conversation: the message that simply stopped getting replies, a job phase that ended with a handshake and no farewell, a friend whose silence you noticed weeks after it began. Because there was no scene, your mind never got to close the file — so it keeps the file open, and reads every new silence as the same old ending.",
    howItFormsHi:
      "yeh tab banta hai jab aapke apne koi bina baat kiye poochhna chhod dete hain: aapka message ka jawab aana band, aapki naukri ka daur jo bas bas hataas ho ke khatam khatam, dost jo aapse chup ho gaya aur aapko yaqeen nahi chala. koi scene hua hi nahi — isliye mann ne file band nahi ki, aur ab har nayi khamoshi ko wahi purana ant samajh leta hai.",
    howItShowsEn:
      "It shows as reading between everyone's lines: a short reply from someone you love gets checked twice, and you reread an afternoon's chats at night hunting for your own mistake. You often leave first that you will not be left — you cancel before they can, you withdraw before the door closes on you.",
    howItShowsHi:
      "yeh sab ke jumlon ke beech padhne mein dikhata hai: jis se aap pyaar karte ho uska chhota jawab do baar dekha jaata hai, raat ko poori chat dohraayi jaati hai ki meri galti kahan thi. aap aksar pehle chhod dete ho taaki chhoda na jaaye — pehle cancel, pehle doori, pehle darwaze se pehle bahar.",
    redemptionEn:
      "The redemption is naming it once, out loud, to one person: 'silence takes my mind hostage.' The moment the fear has a sentence, it stops running the house from the basement. And you discover something better — the ones worth keeping answer the direct question, and the answer rarely matches the ending your mind had written.",
    redemptionHi:
      "ilaaj hai ek baar bol ke naam dena, kisi ek apne ko: 'khamoshi mera mann bajaad leti hai.' jis pal darr ko ek jumla mil jaata hai, woh basement se chalana band kar deta hai. aur ek aur cheez dikhti hai — jo log asli ke hain, wo seedha sawaal chup nahi hone deta; jawab aksar aapke mann likhe ant se alag milta hai.",
    upayEn: [
      "When a silence feels heavy, ask directly within a day — one question, no charge sheet.",
      "Keep one weekly person-contact ritual that no mood can cancel: a voice note counts.",
    ],
    upayHi: [
      "aap jab khamoshi bhaari mehsoos karo, ek din ke andar seedha poochh lo — ek sawaal, aarop ki list nahi.",
      "ek haftey riwaaz aap rakho jo aapka koi mood band na kar sake: aapka voice note bhi ginta hai.",
    ],
    basis: "karmic-14 + mulank-5",
  },
  {
    id: "bharosa-toota",
    nameEn: "The wound of trust once broken",
    nameHi: "bharosa toota — ek baar toota, hamesha nishaan",
    howItFormsEn:
      "This forms on the day an entrusted thing came back broken: a private thing retold as someone's anecdote, a partnership where your name signed and their name hid, a promise kept loud then kept never. After that, trust stopped being a hand extended and became a gate opened slowly, one verification at a time — which is safe, but very expensive in years.",
    howItFormsHi:
      "yeh us din banta hai jab di hui cheez lootta kar aayi: apni baat kisi ki kahaani ban gayi, saajhedari jisme aapke naam ka khat, aur unka naam chhu tha; vaada jo zor se rakha gaya aur chup-chaap toota. us din ke baad bharosa haath nahi, dheeme se khulta darwaza bana — har baar ek kadam, ek jaanch. mehfooz, par saalon ke hisaab se mehanga.",
    howItShowsEn:
      "It shows in the small audits: you check who else read the message, you ask a question twice to a fresh person, you run a second channel on people just in case. New warmth arrives fully only after a long test period — and people often give up mid-test, which confirms the wound and refiles the paperwork.",
    howItShowsHi:
      "yeh chhoti jaanchon mein dikhata hai: aap dekhte hain kisi aur ne message padha ya nahi aap ek hi sawaal naye bande se do baar poochhte ho, chhota backup raasta khade rakh chukate hain. nayi taallukqi poori sirf lambe imtihaan ke baad — aur log beech imtihaan mein haar jaate hain, jo zakham ko aur mazboot kar deta hai.",
    redemptionEn:
      "The turn is a graded ledger, not a wall: one small, reversible stake placed with a new person each season. Trust rebuilt this way grows in rings — and the day someone passes a real test without knowing it was one, the door stays open a little on its own.",
    redemptionHi:
      "aapka mod yahi hai: aapki deewar nahi, aapki darje-wali hisaab-kitaab — aap har season ek naye insaan ke saath ek chhota, aasani se uthaya ja sakta bharosa rakho. isi taraf se aapka bharosa mohre ki tarah bandhta hai; aur us din jab koi aapka imtihaan de usse bina jaane ki wo imtihaan tha, aapka darwaza khud thoda aur khul jaata hai.",
    upayEn: [
      "Keep two columns in your head: 'proven' and 'untested' — let no one move columns without data.",
      "One deliberate small risk per season with a new person — sized so a break costs you a scratch, not a season.",
    ],
    upayHi: [
      "aapke mann mein do qataar rakho: 'parakha hua' aur 'bina parakha' — aap bina asli wazan ke kisi ko qataar na badalne do.",
      "aap har season ke naye insaan ke saath ek aasaan chhota risk lo — aisa ke toot pe sirf aapko kharech lage, mausam nahi.",
    ],
    basis: "karmic-16 + mulank-7/8",
  },
  {
    id: "khud-kam-dekhna",
    nameEn: "The wound of seeing yourself small",
    nameHi: "khud ko kam dekhna — andar se chhota ginoon",
    howItFormsEn:
      "Somewhere in childhood the mirror was turned the wrong way: a comparison came from the family table ('look at cousin ji'), or a teacher praised everyone except you, or the loud ones got the attention while your careful work was called 'okay'. The world saw plenty; the inside camera fixed at a low angle — and it kept filming with that angle for decades.",
    howItFormsHi:
      "bachpan mein kahin aaina ulta mud gaya tha: ghar ki mez se aayi muqable ki baat ('dekho aapke cousin ko'), teacher ne sab ki tareef ki aur aapka kaam bas 'theek', upar se zor-walon ko poori dekh. bahar se sab kuch saaf dikhta raha; andar ka kamera neechi harkat pe jam gaya — aur woh wahi harkat saalon tak filme chalta raha.",
    howItShowsEn:
      "It shows every time credit is being distributed and your own name slips off your own tongue. You quote the team before yourself, feel like a fraud in new rooms even when you built real things, and apologise for asking what you are owed. Compliments bounce off — 'they're just being polite' — while criticism goes straight to the wall.",
    howItShowsHi:
      "yeh har us mauke par dikhta hai jahan tareef bantte waqt aapki apni zubaan aapka naam chhod deti hai. pehle team ka naam, baad mein apna; naye kamron mein lagta hai main fraud hoon chahe asli cheezein banaai hon; jo haq hai wo maangne ke pehle maafi. tareef chipak ti nahi — 'bas khushamad hai' — aur chhota-se-criticism seedha deewar tak jaata hai.",
    redemptionEn:
      "The turn is bookkeeping, not motivation: a written record of what you actually built and carried — reviewed on your worst days, signed on your best. You are not asked to feel bigger; you are asked to read your own ledger before believing the low-angle camera.",
    redemptionHi:
      "aapke liye mod motivation nahi, hisaab hai: aap likha hua kaid rakho jo aapne banaya aur uthaya — bura din par dohrao, achhe din par dastakhaat karo. aapse nahi kaha jaata ki aap bade mehsoos karo; kaha jaata hai ki aap neechi-harkat ke kamera par bharosa karne se pehle apni bahi-khata padho.",
    upayEn: [
      "Keep a wins-file: one line every Friday of something real you did — read it before any big meeting.",
      "Catch the 'they're being polite' reflex once a day and replace it with one concrete compliment word.",
    ],
    upayHi: [
      "aap jeet ka folder rakho: har itvaar ek line, aapne jo asli kiya — kisi badi meeting se pehle aap usse padho.",
      "aap roz ek baar 'bas khushamad hai' wali aadat pakro aur aap uski jagah ek saaf tareef-ka shabd rakho.",
    ],
    basis: "mulank-8 + karmic-19 + missing-1",
  },
  {
    id: "mehsoos-chna-dikhaya-nahi",
    nameEn: "The wound of feelings shown as nothing",
    nameHi: "mehsoos kar ke bhi dikhayen nahi — bhaav ka chhupa",
    howItFormsEn:
      "This forms in a house where feelings were handled like weather — noticed, never discussed. Tears met with 'stop crying', anger with 'lower your voice', hurt with silence until it healed on its own. You learned to translate every storm into a plain face, and the translation got so fluent that even you stopped being able to read it.",
    howItFormsHi:
      "yeh us ghar mein banta hai jahan bhaavon ko mausam jaisa sambhala jaata tha — dekha jaata, baat nahi hoti. aansuon par 'roiye mat', gusse par 'awaaz neechi', chot par chuppi jab tak khud thik ho jaave. aapne sikha liya har toofan ka anuwad saaf chehre mein — aur anuwad itna raunak ho gaya ke aap bhi khud ka na padh paaye.",
    howItShowsEn:
      "It shows as the mismatch: everyone calls you 'so calm', while your chest is the one that never quiets. In the moment you say 'it's nothing'; the same moment returns at 2 am as a full argument, won by you, in a room with only you in it. Intimate rooms call you distant; work rooms call you steady — same habit, two names.",
    howItShowsHi:
      "yeh aise dikhta hai: sab kahein 'aap kitne shaant ho' jabki seene mein khamoshi ka shor hota hai. maukey par aap kahte ho 'koi baat nahi' — wahi mauka raat ke do baje poora jhagda banta hai, jeet aapki, aur kamre mein sirf aap. gharelu rishte aapko door kehte hain, office aapko sthir — aadat ek, naam do.",
    redemptionEn:
      "The redemption is the named feeling, at the moment, in one sentence — five words is enough. Not confessions; translations corrected. Every feeling that gets its word becomes data; every feeling swallowed becomes a brick in a wall you eventually have to demolish at night.",
    redemptionHi:
      "aapka ilaaj: aap jo bhi mehsoos kar rahe ho — bhaav ka naam, usi mauke par, ek jumle mein — paanch shabd kaafi. aapse pachhtawa nahi maanga; aapke anuwad ka sudhaar hai. jis bhaav ko shabd milta hai wo aapke liye jaankari ban jaata hai; jo andar nigala jaata hai wo eent banta hai — aur wah deewar raat ke waqt hilani padti hai.",
    upayEn: [
      "Follow the rule of five words: in conflict or hurt, speak the first five words of the feeling within 24 hours.",
      "End of day, write one line — 'today anger/spain/war felt…' — ten evenings teaches ten names.",
    ],
    upayHi: [
      "aap paanch-shabd ka usool rakho: rishte ke tanav ya chot mein, aap pehle paanch shabd 24 ghante ke andar bol do.",
      "aap din ke ant mein ek line likho: 'aaj mujhe ghussa/taallukat/dard mehsoos hua …' — aapke dus shaam dus naam sikha dete hain.",
    ],
    basis: "missing-3/5 + mulank-2",
  },
  {
    id: "ghar-saaf-chinta",
    nameEn: "The wound carrying a house-worry",
    nameHi: "ghar-saaf-rakhne ki chupi chinta — ghar ka bojh",
    howItFormsEn:
      "This wound is handed down, not chosen: a family where the roof was fragile once — money fell short, respect was questioned, order held things together. The family learned that a home must be guarded, arranged and clean, because chaos once cost them something real. You inherited the guard-post, not the memory of why — so you serve the house as if the old collapse is still scheduled.",
    howItFormsHi:
      "yeh zakham aata hua diya jaata hai, chuna nahi jaata: ghar jahan chhat ek baar kamzor hui — paisa chhota, izzat sawaal se giri, aur order ne sab kuch sanbhala. ghar ne seekhi ki aashiyana banao, rakho saaf, sambhalte raho, kyunki bekayabi ne ek asli cheez khari. aapko pehredaari mili, kahani nahi — isliye aap ghar ko wah se sambhaalte ho jaise purana toofan dobara ho raha ho.",
    howItShowsEn:
      "It shows as the invisible checklist: the fridge stock, the papers filed, the gifts remembered, the calendar that no one else thinks matters. You feel a day is spoiled when the house is out of rhythm, even without a word spoken. Rest reads as a missed duty; you can enjoy an afternoon only once the home is 'done' — and it never stays done.",
    howItShowsHi:
      "yeh dikhta hai aisi chup list mein: fridge bhara ho, kagaz file ho, gift yaad rahay, kalendra aapke paas ho — aur koi aur ise jaisa samajhta hi nahi. ghar ki tarteeb bikharti hai to din kharab lagta hai, bina kisi baat ke. aaraam farz se jhagda hota hai; dopahar maza tab tak nahi jab tak ghar 'poora' na ho — aur ghar kabhi poora nahi hota.",
    redemptionEn:
      "The turn is renaming the fear: the house stands on people, not on polish. One weekly sentence to the family — 'what do you actually need from me this week?' — replaces hours of guessed guarding, and the answer is almost always smaller than the labour you donated.",
    redemptionHi:
      "mod yahi hai: darr ka naam badalna — ghar chamak pe khada nahi, logon pe khada hai. hafte mein ek jumla ghar ko — 'is hafte aapko asli mein kya chahiye?' — ghanton ki andaze wali pehredaari se bada kaam karta hai, aur jawab aksar aapki di gayi mehnat se chhota milta hai.",
    upayEn: [
      "Ask the house one weekly question — 'what do you actually need?' — and let that answer, not your anxiety, set the work.",
      "Schedule one unguarded hour daily where nothing can be arranged, cleaned or checked.",
    ],
    upayHi: [
      "ghar se hafte mein ek sawaal — 'asli mein kya chahiye?' — jawab wahi kaam ka naapa ho, aapki ghanti nahi.",
      "aap roz ek ghanta jagah pe rakho jahan aapka koi intezaam nahi, safai nahi, jaanch nahi.",
    ],
    basis: "mulank-6 + karmic-13 + missing-4/6",
  },
  {
    id: "kisise-niche",
    nameEn: "The wound of seeing yourself below",
    nameHi: "kisi se neeche dekhna — aapke neeche ka aainah",
    howItFormsEn:
      "This wound is built by the arithmetic of comparison: the same exam, different marks; the same wedding, different houses; the same school batch, different city names. Somebody was always one step ahead, and the family's eyes followed that one step. Slowly 'ahead of me' became the only angle you could see people from — so friends became mirrors and mirrors became verdicts.",
    howItFormsHi:
      "yeh zakham aapke saath muqaable ke ganit se banta hai: aapki wahi pariksha, aapka alag aankda; aapki wahi shaadi, aapka alag ghar; aapki school ki wahi batch, alag shehar. koi na koi hamesha aapse ek qadam aage tha aur aapke parivaar ki aankhein us qadam par thin. dheere-dheere 'mere se aage' hi aapke liye insaan dekhne ka aakhri harkat ban gaya — aapke dost aaiene bane, aur aaiene faisal dene lage.",
    howItShowsEn:
      "It shows in the scroll: a colleague's announcement, a cousin's photograph, a stranger's milestone — and your mood drops a floor without a word. It shows in your celebrations, which are real but never full, because the next step up is already in the room. You give better congratulations than you give yourself permission to feel.",
    howItShowsHi:
      "yeh scrolling mein dikhta hai: aapke saath ke naukri-ki-elam, cousin ki tasveer, ek ajnabi ka pad — aur ek jumle bina, aapka mann ek manzil neeche chala jaata hai. aapki khushiyon mein asliyat hai par poori nahi hoti — kyunki agla qadam pehle hi kamre mein khada hota hai. aap doosron ko badhai doosron se achhi dete ho, khud ko ijazat nahi dete.",
    redemptionEn:
      "The turn is changing the timeline: you stop comparing your middle to somebody's highlight and start comparing you-to-you — this year's ledger against last year's. The only race your chart actually runs is against the version of you from five years back, and you have been beating that runner quietly for a long time.",
    redemptionHi:
      "mod hai waqt ki lakeer badalna: aap muqaable chhodte ho kisi ke ujale-pal se aur karte ho aap-se-aap — is saal ki bahi-khata pichhle saal se. aapka chart asli mein paanch saal se pehle wale aap se daudta hai; aur us daurak ko aap chup-chaap der se paas se harate hi rahe.",
    upayEn: [
      "One scroll-free evening a week — replace the feed with one page of your own diary.",
      "Once a month, list three things you have that the three-years-ago you would call a dream.",
    ],
    upayHi: [
      "aap hafte mein ek shaam bina-scroll rakho — aap feed ki jagah apni diary ka ek page kholo.",
      "aap mahine mein ek baar teen cheezein likho jo aapke teen-saal-purane roop ke liye sapna the.",
    ],
    basis: "missing-8 + mulank-1/9",
  },
  {
    id: "kabhi-kaafi-nahi",
    nameEn: "The wound of never-enough",
    nameHi: "kabhi kaafi nahi — har poore ko aadha ginoon",
    howItFormsEn:
      "This wound builds itself out of a moving finish-line: every time you arrived, the line had shifted — the degree was good but 'what next', the money came but 'not like the big ones', the house was built but 'the loan though'. Nothing was ever declared insufficient; the bar simply moved in silence. So you learned to run behind a target that refuses to let itself be caught.",
    howItFormsHi:
      "yeh zakham rukti nahi wali line se banta hai: har baar jab aap pahunche, aage badh gayi — padh liya par 'agla kya', paisa aaya par 'bade nahi banne hain', ghar ban gaya par 'karz dekh lo'. kisi ne kabhi nahi kah aapka kaam kamzoor tha; bas haddi chup-chaap khisak gayi. phir aapne daud seekhi us peeche jo pakadna hi pasand nahi karta.",
    howItShowsEn:
      "It shows as the half-an-inch habit: the win is reviewed for forty seconds and reviewed for its flaws for forty minutes. Two days after a success the mood is flat again, and rest is consumed like a cheat meal — guilt included. 'Enough' is a word you use for other people, never for yourself.",
    howItShowsHi:
      "yeh aadhe-inch ki aadat se dikhata hai: jeet ko chalees second, uske aib ko chalees minute. safalta ke do din baad phir sannata, aur aaram khane jaisa khaya jaata hai — bina apnayat, guilt ke saath. 'kaafi' jumla aap doosron ke liye bolte ho, apne naam nahi.",
    redemptionEn:
      "The turn is learning the one verb your pattern never taught you: stopping. A finish-line you drew yourself, crossed out in ink — that is what teaches the nervous system 'this was enough'. The hunger made you; what you do with it now is your choice, not your sentence.",
    redemptionHi:
      "mod hai woh ek kriya seekhna jo aapke pattern ne sikhaya hi nahi: rukna. aapki khud ki kheenchi hui line, ink se kaat di — yahi sikhata hai aapke dimaag ko 'yeh poora ho gaya'. aapki bhook ne aapko banaya; ab uska istemaal aapki marzi hai, aapki saza nahi.",
    upayEn: [
      "Define done before you start: write the finish-line down, and celebrate it within 24 hours — in writing.",
      "Keep one 'enough-file': compliments that arrived unsolicited, saved verbatim, reread on flat days.",
    ],
    upayHi: [
      "aap shuru se pehle 'khatam' likho: aap line saaf likho, aur 24 ghante ke andar aap us jeet ka likhit jashn karo.",
      "aapka 'kaafi-folder' rakho: bina maange aapko aayi tareefein, jaise boli gayi waisi hi likhi — aap sannaat dinon mein dohrao padho.",
    ],
    basis: "mulank-8 + karmic-13 + missing-9",
  },
  {
    id: "aapki-kahani-koi-suna-hi-nahi",
    nameEn: "The wound of the unheard story",
    nameHi: "aapki kahani koi suna hi nahi — bina sune wala zakham",
    howItFormsEn:
      "This forms in the years when you had something true to say and the room wanted something simpler: your version compressed into one sentence while you were still mid-sentence, the family's rehearsed story told about you without you, the friend who answered before you finished. The story of you was written by committee — and no one read out the final draft for approval.",
    howItFormsHi:
      "yeh un saalon mein banta hai jab aapke paas asli baat thi aur mehfil ko aapse chhota sa jawab chahiye tha: aapka hiss aadhe jumle mein kaat diya gaya, aapke baare ghar ki tayar-shuda kahani bina aapse sunaye sunaii di, dost ne aapka jumla poora hone se pehle hi jawab de diya. aapki kahani samiti ne likhi — aur aakhri draft kisi ne padh kar sunaya hi nahi, na ke aapse poochh liya.",
    howItShowsEn:
      "It shows as the long pause before you speak: you rehearse the whole paragraph because half-stories have been cut off before. In groups you listen harder than you talk, carry the group's memory, and people assume you have 'nothing to add'. The richest versions of you exist in exactly one or two rooms — the rest of the world has heard the abridged print.",
    howItShowsHi:
      "yeh aapke bolne se pehle ki lambi chup ki tarah dikhta hai: aap poori baat mann hi mann bil lete ho kyunki aapki aadhi kahani kaata ja chuka hai. aap mehfil mein kehne se zyada sunte ho, sab ki baatein aapki yaad hoti hain, aur log samajhte hain ke aapko koi baat nahi hoti. aapka sab se behtareen roop sirf ek-do kamron mein hai — baaki duniya ne aapki short kahani sunni hai.",
    redemptionEn:
      "The redemption is becoming your own publisher: one written record — a diary of the version nobody compressed. Spoken rooms will compress; the page does not. Three honest pages written to nobody will re-teach you the weight of your own voice better than applause from a crowd that misheard you.",
    redemptionHi:
      "ilaaj hai aapka apna publisher banna: ek likhit kaid — wo roop jis ko kisi ne aapka chhota nahi kiya. bolne ki mehfil aapko chhoti banati hai; page nahi. teen suchi page bina kisike liye likhe hue aapki zabani ke wazan ko bheed ki tareef se bhi dobara sikha denge.",
    upayEn: [
      "Keep a private log of the stories you were not asked about — the page hears everything.",
      "Once a week, give one full story to one full listener: no interruptions, start to finish.",
    ],
    upayHi: [
      "aap apni bin-suni kahaniyon ka niji record rakho — aapka page sab kuch sunta hai.",
      "aap hafte mein ek poori kahani ek poore sunane-wale ko do: aap bina kaat-khao, shuru se aakhir tak.",
    ],
    basis: "missing-3 + mulank-2/7",
  },
  {
    id: "chup-chaap-jeet",
    nameEn: "The wound of the unclaimed win",
    nameHi: "chup-chaap jeet — bin naam wali jama hui",
    howItFormsEn:
      "This forms wherever your work ran without your signature: the plan that everyone used but no one credited, the crisis handled at midnight while someone else took the morning applause. You kept saying 'it's the team' on a team that never said your name back. The wound is quiet and very specific: not envy at the applause — the absence of your own name in your own story.",
    howItFormsHi:
      "yeh wohin banta hai jahan aapka kaam aapke naam ke bina gaya: plan jo sab ne istemaal kiya par kisi ne naam na kiya, raat ke andar aap sambhal gaye par subah ki tareef kisi aur ko gayi. aap bolte rahe 'yeh team ka hai' — aur us team ne aapka naam kabhi bola hi nahi. zakham khamosh hai par behtaa: tareef ka jalan nahi — apni kahani mein apna naam gayab.",
    howItShowsEn:
      "It shows as the reflex: achievements slide out of your introduction before you even notice them leave. Interviews, introductions, family functions — you under-sell in three languages. Then private nights ask 'why did they stop calling me for the good work?' — a question whose honest answer is that you taught everyone your name was optional.",
    howItShowsHi:
      "yeh us aadat se dikhata hai: aapke taaruf se aapki safaltein aap pehle hi hat chukate hain, notice bhi nahi hota. interview, parichay, ghar ka mahaul — teen zubaanon mein aap kaam kam kehte hain. phir raat ko sawaal uthta hai 'aachha kaam ab mujhe bulaya kyun nahi jaata?' — jis ka sachchi jawab yeh hai ke aapne sab ko sikhaya tha aapka naam optional hai.",
    redemptionEn:
      "The turn is one signature per season: a work, a talk, a project, a post — a thing with the name attached, visible, undisturbed. Not arrogance; documentation. The family ledger must be read aloud to stay clean, and your contribution's ledger is the one nobody else can write for you.",
    redemptionHi:
      "mod hai har season ek dastakhat: ek kaam, ek baat, ek project, ek post — naam laga ke, saaye mein, baghair kisi bhi shor ke. ghamand nahi; kayad. ghar ki hisaab-kitaab zor se padhi jaaye tabhi saaf rahegi — aur aapke kaam ki bahi-khata aap ke siwa koi likh hi nahi sakta.",
    upayEn: [
      "Publish one named artefact every season — the name on it is the practice, the content almost incidental.",
      "In your next introduction, say one true work-line about yourself without trimming it first.",
    ],
    upayHi: [
      "aap har season ek naam-wala kaam bahar laao — aapka naam uspe hona hi asli riwaaz hai, cheez aadhi hai.",
      "agli baar jab aap apna taaruf do, to ek asli kaam-ki-line apne liye bina kaate bolo — aapne haq se bachaya hai.",
    ],
    basis: "missing-1 + mulank-2",
  },
];

interface BankIndex {
  byId: Map<string, WoundPattern>;
}

// A tiny lazy index so lookup remains O(1) without module init cost surprises.
let idx: BankIndex | null = null;
function bankIndex(): BankIndex {
  if (!idx) {
    idx = { byId: new Map() };
    for (const w of WOUND_BANK) idx.byId.set(w.id, w);
  }
  return idx;
}

/* ------------------------------------------------------------------ */
/* woundsOf — deterministic selector (most-relevant first)              */
/* ------------------------------------------------------------------ */

/**
 * Select the 3-5 most relevant wound patterns for one chart.
 * Weights: mulank lead wounds (+3), its tail (+2), karmic debts (+4),
 * missing digits (+2), bhagyank flavour (+1). Ties break by bank order —
 * deterministic per identical core, no randomness anywhere.
 * Always returns at least 3 and at most 5, first block = most relevant.
 */
export function woundsOf(core: WoundsCore): WoundPattern[] {
  const score = new Map<string, number>();
  const add = (id: string, n: number) => score.set(id, (score.get(id) ?? 0) + n);

  const m = foldDigit(core.mulank);
  const b = foldDigit(core.bhagyank);

  const mul = MULANK_WOUNDS[m] ?? [];
  if (mul[0]) add(mul[0], 3);
  for (let i = 1; i < mul.length; i++) add(mul[i], 2);

  for (const k of KARMIC_WOUNDS_KEYS_ORDER) {
    if (core.karmic.includes(k)) {
      for (const id of KARMIC_WOUNDS[k]) add(id, 4);
    }
  }

  for (const d of core.missing) {
    const dd = foldDigit(d);
    for (const id of MISSING_WOUNDS[dd] ?? []) add(id, 2);
  }

  const bh = BHAGYANK_WOUNDS[b] ?? BHAGYANK_WOUNDS[9];
  add(bh, 1);

  const ordered = [...score.entries()].sort((a, x) => {
    if (x[1] !== a[1]) return x[1] - a[1];
    return bankOrder(a[0]) - bankOrder(x[0]);
  });

  const out: WoundPattern[] = [];
  for (const [id] of ordered) {
    const w = bankIndex().byId.get(id);
    if (w && !out.includes(w)) out.push(w);
    if (out.length === 5) break;
  }

  // Bank-order top-up so even an all-zero chart gets its 3 wounds.
  for (const w of WOUND_BANK) {
    if (out.length >= 3) break;
    if (!out.includes(w)) out.push(w);
  }
  if (out.length > 5) out.length = 5;
  return out;
}

/** Bank insertion order for deterministic tie-breaks. */
function bankOrder(id: string): number {
  return WOUND_BANK.findIndex((w) => w.id === id);
}

const KARMIC_WOUNDS_KEYS_ORDER = [13, 14, 16, 19] as const;

/* ------------------------------------------------------------------ */
/* validateWounds — data-layer contract gate                           */
/* ------------------------------------------------------------------ */

const BANNED_STRINGS: RegExp[] = [
  /will happen/i,
  /may suggest/i,
  /theme to reflect/i,
  /\bguaranteed?\b/i,
  // deterministic-guarantee family (spoken-Hinglish roman register)
  /\bzaroor hoga\b/i,
  /\bzaroor hogi\b/i,
  /\bpakka hoga\b/i,
  /\bpakka hogi\b/i,
];

const REQUIRED_IDS = [
  "kabhi-chuna-nahi-gaya",
  "chhudne-ka-darr",
  "bharosa-toota",
  "khud-kam-dekhna",
  "mehsoos-chna-dikhaya-nahi",
  "ghar-saaf-chinta",
  "kisise-niche",
  "kabhi-kaafi-nahi",
];

const words = (s: string): number =>
  s.split(/\s+/).filter((w) => /[\p{L}]/u.test(w)).length;

/**
 * Contract gate: throws when the bank holds fewer than 8 patterns or a
 * required school wound is missing, or when any block breaks the voice law —
 * banned construction, a one-liner block (<2 sentences), a thin block
 * (EN/HI narrative <25 words), Devanagari in HI, an empty/short upay list
 * (needs 2-3 practices), or a basis string without a number-keyed anchor.
 */
export function validateWounds(): void {
  if (!Array.isArray(WOUND_BANK) || WOUND_BANK.length < 8) {
    throw new Error(`validateWounds: bank needs ≥8 wound patterns — got ${WOUND_BANK.length}`);
  }
  const ids = new Set(WOUND_BANK.map((w) => w.id));
  for (const req of REQUIRED_IDS) {
    if (!ids.has(req)) throw new Error(`validateWounds: required wound "${req}" missing from bank`);
  }
  for (const w of WOUND_BANK) {
    const at = `wound "${w.id}"`;
    if (!w.id || !w.nameEn || !w.nameHi) throw new Error(`validateWounds: ${at} missing id/name`);
    const narrative: Array<[string, string, "en" | "hi"]> = [
      [w.howItFormsEn, "howItFormsEn", "en"],
      [w.howItFormsHi, "howItFormsHi", "hi"],
      [w.howItShowsEn, "howItShowsEn", "en"],
      [w.howItShowsHi, "howItShowsHi", "hi"],
      [w.redemptionEn, "redemptionEn", "en"],
      [w.redemptionHi, "redemptionHi", "hi"],
    ];
    for (const [t, key, lang] of narrative) {
      if (typeof t !== "string" || words(t) < 25) {
        throw new Error(`validateWounds: ${at} ${key} thinner than the 25-word floor`);
      }
      const sentences = t.split(/[.!?](?:\s|$)/).filter((s) => s.trim().length > 0);
      if (sentences.length < 2) throw new Error(`validateWounds: ${at} ${key} is a one-liner`);
      if (lang === "hi" && /[\u0900-\u097F]/.test(t)) {
        throw new Error(`validateWounds: ${at} ${key} carries Devanagari — HI voice is romanized`);
      }
      if (lang === "hi" && !/aap/i.test(t)) {
        throw new Error(`validateWounds: ${at} ${key} missing the 'aap' HI register`);
      }
    }
    if (!Array.isArray(w.upayEn) || w.upayEn.length < 2 || w.upayEn.length > 3) {
      throw new Error(`validateWounds: ${at} upayEn needs 2-3 practices`);
    }
    if (!Array.isArray(w.upayHi) || w.upayHi.length < 2 || w.upayHi.length > 3) {
      throw new Error(`validateWounds: ${at} upayHi needs 2-3 practices`);
    }
    for (const [i, u] of w.upayEn.entries()) {
      if (typeof u !== "string" || words(u) < 8) throw new Error(`validateWounds: ${at} upayEn[${i}] too thin`);
    }
    for (const [i, u] of w.upayHi.entries()) {
      if (typeof u !== "string" || words(u) < 6) throw new Error(`validateWounds: ${at} upayHi[${i}] too thin`);
      if (/[\u0900-\u097F]/.test(u)) throw new Error(`validateWounds: ${at} upayHi[${i}] carries Devanagari`);
      if (!/aap/i.test(u)) throw new Error(`validateWounds: ${at} upayHi[${i}] missing the 'aap' HI register`);
    }
    if (!/(mulank|karmic|missing|bhagyank)-\d/.test(w.basis)) {
      throw new Error(`validateWounds: ${at} basis "${w.basis}" is not number-keyed`);
    }
  }
  // banned-copy sweep across every string in the module's data
  const all: string[] = [];
  for (const w of WOUND_BANK) {
    all.push(
      w.nameEn, w.nameHi, w.howItFormsEn, w.howItFormsHi,
      w.howItShowsEn, w.howItShowsHi, w.redemptionEn, w.redemptionHi,
      ...w.upayEn, ...w.upayHi, w.basis,
    );
  }
  for (const t of all) {
    for (const rx of BANNED_STRINGS) {
      if (rx.test(t)) throw new Error(`validateWounds: banned copy /${rx.source}/ in "${t.slice(0, 70)}"`);
    }
  }
}