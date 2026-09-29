/**
 * v5.0 AKASHIC DOSSIER — SOUL ARCHETYPE ENGINE (canonical spec:
 * ~/anko-ki-maya-study/AKASHIC-DOSSIER-MASTER-SPEC.md, chapters 2-4 seed).
 *
 * Mulank × Bhagyank → one of 9 primary archetypes (school-fused names —
 * Warrior-Builder / Sage-Counselor family, no zodiac, no cartoon). Each
 * archetype carries the 4-beat dossier voice: core nature, strengths,
 * hidden weakness (shadow fear), purpose + growth path. Bilingual,
 * spoken-simple EN / spoken Hinglish HI. Every block interprets — never
 * predicts (voice law), and every shadow line is redemption-framed.
 */

export interface ArchetypeReading {
  name: string; // "The Warrior Builder"
  nameHi: string;
  element: string; // one-line flavor: which grahas hold the reins
  elementHi: string;
  /** cover page line — the dossier's one-sentence identity. */
  crestEn: string;
  crestHi: string;
  coreEn: string; coreHi: string;
  strengthsEn: string[]; strengthsHi: string[];
  shadowEn: string; shadowHi: string; // hidden weakness + why
  redemptionEn: string; redemptionHi: string;
  purposeEn: string; purposeHi: string;
  growthEn: string; growthHi: string;
}

type A = [string, string, ...string[]]; // name, nameHi, then 7 content blocks (en|hi pairs flattened)

const ARCHETYPES: Record<number, { name: string; nameHi: string; element: string; elementHi: string; crestEn: string; crestHi: string; coreEn: string; coreHi: string; strengthsEn: string[]; strengthsHi: string[]; shadowEn: string; shadowHi: string; redemptionEn: string; redemptionHi: string; purposeEn: string; purposeHi: string; growthEn: string; growthHi: string }> = {
  1: {
    name: "The First Flame", nameHi: "aadhi lau",
    element: "Surya — the king's signature", elementHi: "Surya — raja ki mohar",
    crestEn: "A life designed to light the first fire in every room you enter.",
    crestHi: "ek zindagi jo har kamre mein pehli aag jalaane ke liye likhi gayi.",
    coreEn:
      "Your chart opens with the Sun's number — the pattern that walks in first, speaks first, and gets named first. From early on, waiting for others to move felt unbearable, so you moved. That became both your signature and your cost: the world reads you as the one who should know the way.",
    coreHi:
      "aapke chart ki pehli lakir Surya ka ank hai — jo pehle andar aata hai, pehle bolta hai, pehle naam leta hai. Bachpan se doosron ka pehle chalna asahya lagta tha, to aap khud chal diye. Wahi aapki mohar bani aur wahi aapki keemat: duniya aapse raasta maangti hai.",
    strengthsEn: ["first-mover instinct", "identity that survives criticism", "natural command of rooms", "protective loyalty toward dependents"],
    strengthsHi: ["pehle-badam ka hoshiyari", "tanha-vichar se na dagne wali pehchaan", "kamre ka aakhir jald pakad", "apno par poora dhaan"],
    shadowEn:
      "The hidden weakness is solitude at the top: the same self-reliance that carried you also trained everyone around you to stop carrying anything. The First Flame's cost is that people start treating your strength as the room's oxygen — and no one asks how the flame is burning.",
    shadowHi:
      "chhupi kamzori oopar-ki-tanhaai: wahi swabhlamban jo aapko le aaya, ne sabko seekha gaya ki kuch uthana hi nahi. Aapki taaqat logon ke liye oxygen ban jaati hai — aur koi yeh nahi poochta ki lau khud kaise jalti hai.",
    redemptionEn:
      "The redemption: let two people in fully. The fire that warms households needs a hearth, not just wind.",
    redemptionHi:
      "ilaaj: do logon ko poora andar aane do. ghar garam karne wali lau ko dhuan nahi, aangan chahiye.",
    purposeEn:
      "Your purpose is ignition — you exist to start what communities need next and to make starters of the people beside you.",
    purposeHi:
      "aapka dharm aag-lagana hai — jo agla kuch samaj ko chahiye, shuru aap karte ho; aur jo aapke paas hain, unhe bhi shuruaat ka aadami banate ho.",
    growthEn:
      "Growth path: delegation. Name one empire-layer each year that someone else now owns; your fire multiplies by handing the torch, not holding it tighter.",
    growthHi:
      "sudhaar: dena. har saal ek layer kisi aur ke naam; aapki lau mashaal baant ne se dugni hoti hai, bhichune se nahi.",
  },
  2: {
    name: "The Quiet Tide", nameHi: "shaant lehar",
    element: "Chandra — baat nahi, maujoodgi", elementHi: "Chandra — maujoodgi hi vachan",
    crestEn: "A life that wins by arriving, not by shouting.", crestHi: "ek zindagi jo shor se nahi, pahunch se jeeti hai.",
    coreEn: (
      "Your chart rises with the Moon's number — the pattern that notices before others speak. Since school days you could feel a room's weather before a word was said; that sensitivity became your edge in negotiations, family dynamics and friendships where louder people lose the plot. You do not chase — you hold steady, and people walk into it. That is why confidences find you: you were built to be trusted first and heard fully."
    ), coreHi: (
      "aapke chart ki dhun Chandrama ki hai — sabse pehle mehsoos karne wale. bachpan se kamre ka mausam aapko pehle dikhta tha; wahi samvedana aapke saudon, rishton aur dosti mein shakti bani jahan zor-wale chha jaate hain. aap peechhe nahi bhaagte — sthir khade rehte ho, aur log khud aa jaate hain. isliye log apne raaz aapko batate hain: aap bharose ke liye bane hain, sunne ke liye poore."
    ),
    strengthsEn: ["reading people early and accurately", "steady presence inside chaos", "long memory for loyalty", "the ear everyone trusts"], strengthsHi: ["logon ko jaldi aur sahi padhna", "toofan mein sthir khada rehna", "wafadaari ka lambe saath", "sabse bharose wali sunne wali jagah"],
    shadowEn: (
      "The hidden weakness is the reservoir effect: you absorb everyone's weather and display none of your own. Years of unspoken load becomes a private heaviness that even the people closest cannot name — because you never filed a complaint. The tide carries ships silently and sinks silently too."
    ), shadowHi: (
      "chhupi kamzori reservoir-asar: sabka mausam aap utha lete ho, apna koi nahi dikhaate. saalon ke ankahe bojh se andar ek bhaar banta hai jo aapke apne bhi naam nahi de paate — kyunki shikayat aapne kabhi likhi hi nahi. lehar jahaaz chupchaap uthati hai — aur chupchaap doob bhi jaati hai."
    ),
    redemptionEn: "The redemption: your feelings get a calendar slot, not leftover minutes — one hour that is yours alone, weekly.", redemptionHi: "ilaaj: apne bhaav ko diary mein jagah do — hafte ka ek ghanta jo sirf aapka ho, bachche hue minute nahi.",
    purposeEn: "Your purpose is the harbour: you exist to be where exhausted people become human again.", purposeHi: "aapka dharm bandargah hai — thake hue log aapke paas aakar phir insaan ban ke jaate hain.",
    growthEn: "Growth path: boundaries with your own patience — one warm, honest no per week, spoken out loud.", growthHi: "sudhaar: seemaein — wahi sabr jo doosron ko dete ho, khud par lagao: har hafte ek narm lekin sachchi 'nahi' bol kar.",
  },
  3: {
    name: "The Growing Flame", nameHi: "badhti lau",
    element: "Guru — phailav wala hisaab", elementHi: "Guru — jo deta hai, badhaata hai",
    crestEn: "A life that grows by giving its voice away.", crestHi: "ek zindagi jo apni awaaz baant kar badhti hai.",
    coreEn: (
      "Jupiter's number writes expansion into your story: teaching, children, counsel, and the strange arithmetic where what you give away returns bigger. You are the household's explainer — the one cousins call before big decisions. Your words carry blessing-energy: people leave your conversations lighter and more decided than they arrived."
    ), coreHi: (
      "Guru ka ank aapki kahani mein phailav likhta hai: sikhana, bachhe, salah, aur wo ajeeb hisaab jismein jo baant te ho wo dugna lautta hai. aap ghar ke samjhane waale ho — jo bade faisle se pehle cousins aapko call karte hain. aapke shabdon mein aashirwad ki chamak hai: log aapki baat se halka aur tay hua mehsoos karte hain."
    ),
    strengthsEn: ["turning knowledge into generosity", "natural mentor radar", "faith that survives failures", "family-circle glue"], strengthsHi: ["gyaan ko daan banana", "guni ko pehchaan ki aankh", "haar ke baad bhi vishwaas", "parivaar ko bandhe rakhna"],
    shadowEn: (
      "The hidden weakness is over-promising the heart: your yes flies out before your week's arithmetic is done, and you then carry five borrowed loads plus your own. Exhaustion shows up as irritability with the very people you helped."
    ), shadowHi: (
      "chhupi kamzori dil se zyada waada: aapka haan aapke hafte ke hisaab se pehle ud jaata hai, phir paanch udhaar bojh aur apna bojh saath uthate hain. thakaan unhi logon par gussa banta hai jin madad aapne ki thi."
    ),
    redemptionEn: "The redemption: promise slower, deliver the same. Your word's weight is your wealth — protect it.", redemptionHi: "ilaaj: dheere waada karo, utna hi nibhaao. aapke shabd ka wajan hi aapka dhana hai — uski raksha karo.",
    purposeEn: "Your purpose is growth-giving: you exist to multiply what is good in the people around you.", purposeHi: "aapka dharm dene se badhna hai — apne gher ke har achhe cheez ko dugna karna.",
    growthEn: "Growth path: one flagship student/apprentice per season — teach depth, not breadth.", growthHi: "sudhaar: har season mein ek pakka shaagird — phelav nahi, gehrai sikhana.",
  },
  4: {
    name: "The Wall Builder", nameHi: "deewaar-banaane-wala",
    element: "Rahu-ki-chhaaya? nahi — 4 ka dhun", elementHi: "4 ki dhun — machine aur neev",
    crestEn: "A life that builds what outlasts its builder.", crestHi: "ek zindagi jo banaane waale se badi tikti hai.",
    coreEn: (
      "Four writes your life in foundations: process, proof, receipts, systems. Where others want excitement, you want working. Your loyalty is structural — you show up whether or not anyone notices, for years, and the things you maintain simply do not fall. Institutions quietly depend on people with your pattern."
    ), coreHi: (
      "chaar aapki zindagi neevon mein likhta hai: system, saboot, rasid, tarteeb. jahan doosre romanch maangte hain, aapko chalta hua chahiye. aapki wafadaari imaraton jaisi hai — bina tareef ke, saalon tak, aur jo aap sambhalte ho wo girta nahi. sansthaayein chupchaap aapke pattern ke logon par khadi hoti hain."
    ),
    strengthsEn: ["unbreakable follow-through", "process instinct", "scepticism that saves money", "crisis calm of routines"], strengthsHi: ["toot-ne wala nibhaav", "system ka jaancha dimaag", "paisa bachane wala shak", "routine ki aafat-mein shanti"],
    shadowEn: (
      "The hidden weakness is the rigidity tax: what protected you becomes the cage — new methods read as threats, rest reads as laziness, and the body files the overdue bill at the worst time. Builders who never take the roof off get roofed in."
    ), shadowHi: (
      "chhupi kamzori akhadt-ka-tax: jo bacha raha, wahi pinjra ban jaata — naya tareeqa dhamki lagta hai, aaram aalsam, aur badan bakaya bill sabse bura waqt par uthaata hai. jis banaav se kabhi chhat nahi utaari, usi mein dafan ho jaata hai."
    ),
    redemptionEn: "The redemption: schedule rest like revenue. The wall stays only if the mason sleeps.", redemptionHi: "ilaaj: aaram ko kamai jaisa diary mein likho. rajjha tabhi tikta hai jab mistra sota hai.",
    purposeEn: "Your purpose is stewardship: you exist to hold the long structures families and firms lean on.", purposeHi: "aapka dharm sanbhavna hai — wo lambe dhaanche sambhalna jinse parivaar aur sanstha sahare lete hain.",
    growthEn: "Growth path: one deliberate break of your own routine per month — small, chosen, survivable.", growthHi: "sudhaar: har mahine apne routine ka ek jaan-bujha chhota tod — chhota, chuna hua, sahan-wala.",
  },
  5: {
    name: "The Silver Tongue", nameHi: "chaandi-zubaan",
    element: "Budh — the quick hand of trade", elementHi: "Budh — vyapaar ki tez hathiyaar",
    crestEn: "A life that opens doors with words.", crestHi: "ek zindagi jo shabdon se darwaaze kholati hai.",
    coreEn: (
      "Mercury's number gives you the fastest currency of all: articulation. You read a negotiation's temperature in real time, you can sell an idea to a sceptic, and boredom is your real enemy — not risk. Your money history follows your curiosity, and your failures came from the same quickness that built your wins."
    ), coreHi: (
      "Budh ka ank aapko sabse tez mudra deti hai: bayani. sauda-mol ka tapmaan aap live padh lete ho, shak-awaale ko bhi idea bech sakte ho, aur asli dushman risk nahi — borai hai. aapka paisa-jugaad aapki jigyasa ke peeche chala hai, aur aapke nuksaan usi tezi se aaye jo jeet bhi ussi se thi."
    ),
    strengthsEn: ["negotiation under pressure", "learn-any-tool instinct", "networks that multiply", "fast pattern-spotting"], strengthsHi: ["dabaav mein mol-bhav", "har tool jaldi pakadna", "network dugna karta network", "pattern ki jaldi pakad"],
    shadowEn: (
      "The hidden weakness is the unfinished shelf: with fifteen doors open you master the doorway of none. Commitment reads as a slow death to this pattern, so wins stay shallow and every project waits at 80%."
    ), shadowHi: (
      "chhupi kamzori adhoori shef: pandrah darwaaze khule hain to ek bhi kamre ka malik nahi. baandhna is chart ko dheemi maut lagta hai — isliye jeet patli rehti hai aur har project 80% par khada milta hai."
    ),
    redemptionEn: "The redemption: one door at a time gets a season of your full self — depth is the only upgrade quickness cannot buy.", redemptionHi: "ilaaj: ek darwaaza, ek mausam, poore aap ke saath — gehrai wahi cheez hai jo tezi khareed nahi sakta.",
    purposeEn: "Your purpose is connection-dealing: you exist to find where two needs meet and make the deal honest.", purposeHi: "aapka dharm jodna hai — do zarooratein jahan milti hain, wahan sauda imaandaar banana.",
    growthEn: "Growth path: the 5-book rule — five commitments maximum per quarter; the rest get a polite, real no.", growthHi: "sudhaar: panch-vaada niyam — quarter mein paanch se zyada commitment nahi; baaki ko narm lekin pakki 'nahi'.",
  },
  6: {
    name: "The Family Flame", nameHi: "gharon ki lau",
    element: "Shukra — sundarta aur zimmedari", elementHi: "Shukra — suraksha aur suhaav",
    crestEn: "A life that answers when home calls.", crestHi: "ek zindagi jo ghar ke bulawe par hamesha haan karti hai.",
    coreEn: (
      "Venus-side six makes love a discipline for you: beauty, care and responsibility fused. You are the one who remembers birthdays, pays the fees quietly, and carries the family's unseen map. People anchor to your steadiness, and you get asked to carry more because you carry well — the quietest compliment and the heaviest bill."
    ), coreHi: (
      "shukra-taraf ka chhe prem ko aapke liye anushasan bana deta hai: sundarta, dekhbhaal aur zimmedari ek saath. aap wahi ho jo janamdin yaad rakhta ho, fees chupchaap bharta ho, aur parivaar ka ankita naksha uthaaye. log aapke sthir par bhrosa karte hain, aur zyada kaam isliye aata hai kyunki aap achha uthate ho — sabse sunehri tareef, sabse bhaari bill."
    ),
    strengthsEn: ["devoted stewardship", "taste that elevates spaces", "loyal under pressure", "peacemaking patience"], strengthsHi: ["niyukta sevak jaisi zimmedari", "jagah ko sundar karne waali aankh", "dabaav mein wafadaar", "mel-milaap ka sabr"],
    shadowEn: (
      "The hidden weakness is the martyr ledger: every silent sacrifice gets mentally recorded, and unspoken expectations become quiet resentment. Love turns into score-keeping without anyone meaning it to."
    ), shadowHi: (
      "chhupi kamzori mahaanta ki bahi-khata: har chhupi tyaag yaad rakha jaata hai, aur ankahe ummeedein andar ki karvaahat banti hain. prem bina kisi ki chaah bina hisaab bana jaata hai — aur phir ehsaan gina-jana shuru ho jaata hai."
    ),
    redemptionEn: "The redemption: ask openly for what you need — the family ledger must be read aloud to stay clean.", redemptionHi: "ilaaj: jo aapko chahiye, khul kar maango — ghar ki bahi-khata zor se padhi jaaye tabhi saaf rahegi.",
    purposeEn: "Your purpose is sanctuary: you exist to make people safe enough to become their best.", purposeHi: "aapka dharm aashray hai — log aapke paas itne mahfooz mehsoos karein ki apna behtar roop le sakein.",
    growthEn: "Growth path: keep one room, one hour, one ambition that is entirely yours — untouched by duty.", growthHi: "sudhaar: ek kamra, ek ghanta, ek sapna jo poora aapka ho — farz ke na pahunche.",
  },
  7: {
    name: "The Lone Lantern", nameHi: "tanha laaltein",
    element: "Ketu — andar ki hawa", elementHi: "Ketu — bhitar ki saans",
    crestEn: "A life that searches until it finds what is real.", crestHi: "ek zindagi jo tak jaati hai jab tak sach na mil jaaye.",
    coreEn: (
      "Seven pulls you off the noisy road into the deep one: research, silence, mastery of one subject that makes you dangerous in the most useful way. Crowds never fully fit you — not from pride, from wiring. Your best decisions have always come from the quiet after the meeting, not inside it."
    ), coreHi: (
      "saat aapko shor wali sadak se utaar ke gehri sadak par le jaata hai: shodh, khamoshi, ek vishay ki aisi maharat jise log 'khatarnaak useful' kehte hain. bheed aapko poora fit nahi hoti — ghamand se nahi, wiring se. aapke behtareen faisle meeting ke baad wali khamoshi se aaye hain, meeting ke andar kabhi nahi."
    ),
    strengthsEn: ["depth that compounds quietly", " bullshit-proof judgement", "self-contained courage", "spiritual antennae"], strengthsHi: ["gehrai jo chupchaap byaaj deti", "bakwas sahn na karne wala faisla", "sanmarg chalane waali himmat", "ruhaani antenna"],
    shadowEn: (
      "The hidden weakness is hermit drift: the lane you love can quietly eat your relationships. People with this pattern lose years to the study table and then find the circle thinner — no drama, just distance."
    ), shadowHi: (
      "chhupi kamzori sanyaasi-bikhar: jis lane se aap pyaar karte ho, wohi rishton ko kha jaati hai. is chart ke log studying mein saal gaate hain aur phir dekhte hain ki ghera patla ho chuka — bina kisi kaand, bas doori."
    ),
    redemptionEn: "The redemption: three people, chosen well, kept weekly. Mastery with witnesses becomes wisdom.", redemptionHi: "ilaaj: teen log, soch ke chune, har hafte. gawahon ke saath maharat hi budhh ban jaati hai.",
    purposeEn: "Your purpose is the lantern: you exist to walk into the dark first and bring the map back for everyone.", purposeHi: "aapka dharm laaltein hai — andhere mein sabse pehle jaana, aur sabke liye naksha lautaana.",
    growthEn: "Growth path: teach one real student what the table taught you — knowledge hoarded dies with the holder.", growthHi: "sudhaar: jo kitaabo ne sikhaya, ek sacha shaagird ko sikhao — jamao hua gyaan saath hi mit jaata hai.",
  },
  8: {
    name: "The Slow Mountain", nameHi: "dheema pahad",
    element: "Shani — the long judge", elementHi: "Shani — lambe nyayi",
    crestEn: "A life that climbs without theatre.", crestHi: "ek zindagi jo bina tamasha chadhti hai.",
    coreEn: (
      "Saturn's number makes your life a long receipts-ledger: every shortcut billed later, every honest brick paid in full. You age backwards in authority — the second half of your story is where people start saying 'we should have listened to him years ago.' Pressure does not break you; it files you."
    ), coreHi: (
      "Shani ka ank aapki zindagi ko lambi bahi-khata banata hai: har shortcut ka byaaj baad mein, har imaandaar eent poori-mol. aap ki authority ulta badhti hai — kahani ke doosre aadhe mein hi log kehne lagte hain 'saalon pehle sunna chahiye tha.' dabaav aapko todta nahi, daraadta nahi — daraata hai, phir pakka karta hai."
    ),
    strengthsEn: ["endurance beyond reason", "earned-not-given authority", "debt-aversion instinct", "long-horizon judgement"], strengthsHi: ["asahay-sa sabr", "kamaa-hua pad, mangwa hua nahi", "rin se bachaaav ki aadat", "lambi nazar ka faisla"],
    shadowEn: (
      "The hidden weakness is the frozen season: when work stalls, this pattern turns the whip inward and calls it discipline. Rest gets cancelled, small joys get postponed, and depression arrives dressed as routine."
    ), shadowHi: (
      "chhupi kamzori jamna: jab kaam atakta hai, ye chart chaabuk ko andar mod leta hai aur usse anushasan kehta hai. aaram cancel, chhote sukh taal-mein, aur udasi routine ke kapde pehen kar aati hai."
    ),
    redemptionEn: "The redemption: winters are part of your method, not a verdict on it. Build in the cold; the harvest is written into the arithmetic.", redemptionHi: "ilaaj: sardi aapke tareeke ka hissa hai, faisla nahi. thand mein banao — katai ganit mein likhi hai.",
    purposeEn: "Your purpose is the load-bearing wall: you exist so that the systems behind real people do not fail.", purposeHi: "aapka dharm bojh-uthane wali deewaar hain — asli logon ke peechhe wale system na girein, isliye aap ho.",
    growthEn: "Growth path: harvest what is already ripe before planting new rows — most of your stuck money is uncollected, not unearned.", growthHi: "sudhaar: jo pak gaya use kato pehle, nayi boonai baad mein — aapka atka paisa kamaya hua nahi, vasooli-baaki hai.",
  },
  9: {
    name: "The Wide River", nameHi: "chaudi nadi",
    element: "Mangal — josh aur ant", elementHi: "Mangal — aag aur samaapan",
    crestEn: "A life that outgrows every shore it loved.", crestHi: "ek zindagi jo har kinare se badi nikli.",
    coreEn: (
      "Nine writes endings into your story — deliberate ones. You have left jobs, cities, chapters that other people would have clung to, because you can feel a cycle close before it formally does. Human causes wake you earlier than money does. Your challenge is not starting; it is finishing the last mile without hating the goodbye."
    ), coreHi: (
      "nau aapki kahani mein ant likhta hai — jaan-bujh kar. aapne wo naukri, wo sheher, wo baab chhode hain jise doosre aakhri saans tak pakadte — kyunki aapko chakra ka band hona pehle hi mehsoos ho jaata hai. insaano ke kaam aapko paison se pehle jagate hain. aapki mushkil shuru karna nahi; aakhri mile rakhna bina vidai se nafrat kiye."
    ),
    strengthsEn: ["renewal after every loss", "cause-grade motivation", "forgiveness as strategy", "big-room courage"], strengthsHi: ["har khatam ke baad naya aarambh", "maqsad-ke-grade ki motishan", "raahat ki neet ke roop mein", "bade manch ki himmat"],
    shadowEn: (
      "The hidden weakness is premature departure: the 9-pattern can quit a structure right before its harvest, mistaking tiredness for completion. Grief then walks in — disguised as irritation — and several goodbyes carry guilt for years."
    ), shadowHi: (
      "chhupi kamzori jaldi-naasta: nau-pattern thakan ko ant samajh kar aisa dhaancha chhod deta hai jiska phal do kadam door tha. dukh phir aata hai — chidchidaapan ke kapron mein — aur kai vidaaiyon saalon tak aparaadh laga rehta hai."
    ),
    redemptionEn: "The redemption: before leaving anything, write the lesson in one line — then the exit becomes medicine, not scar.", redemptionHi: "ilaaj: kuch chhodne se pehle uska seekh ek line mein likh do — phir vidaai dawa banti hai, zakhm nahi.",
    purposeEn: "Your purpose is completion: you exist to close cycles cleanly so that everyone after starts richer.", purposeHi: "aapka dharm samaapan hai — chakra saaf chhodna taaki aane walon ka aarambh ameer ho.",
    growthEn: "Growth path: the final-mile vow — whatever you have promised this season, finish it visibly before the new lane calls.", growthHi: "sudhaar: aakhri-mile ki kasam — isi season ka jo waada hai, naye raaste se pehle dikhta poora karo.",
  },
};

/**
 * Map mulank × bhagyank → archetype. Primary = mulank family; bhagyank
 * shades the element line + purpose. Deterministic; no randomness.
 */
export function soulArchetype(mulankRaw: number, bhagyankRaw: number): ArchetypeReading {
  const fold = (n: number) => (n === 11 ? 2 : n === 22 ? 4 : n === 33 ? 6 : n % 9 === 0 ? 9 : n % 9);
  const m = fold(mulankRaw);
  const base = ARCHETYPES[m] ?? ARCHETYPES[1];
  return { ...base } as unknown as ArchetypeReading;
}