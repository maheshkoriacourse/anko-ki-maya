/**
 * Anko Ki Maya v3.3 — VEDIC CONTENT (secret layer).
 *
 * 27 nakshatra mini-essays (60-100 words EN), 9 dasha-lord period essays,
 * 2 dosha explainers — EN + Hinglish (v3.2 voice: romanized spoken, direct
 * jyotishi; Devanagari ONLY in mantras/Om/deity lines). Original copy —
 * no verbatim book text.
 */

import type { Lang } from "./content";

/* ------------------------------------------------------------------ */
/* 27 nakshatra mini-essays (index 0 = Ashwini … 26 = Revati)           */
/* ------------------------------------------------------------------ */

export interface NakshatraEssay {
  name: string;
  lord: string; // school graha name
  symbolEn: string;
  essayEn: string;
  essayHi: string;
  keywords: string[];
}

export const NAKSHATRA_ESSAYS: NakshatraEssay[] = [
  { name: "Ashwini", lord: "Ketu", symbolEn: "the horse's head", keywords: ["speed", "pioneer", "healing"],
    essayEn: "Ashwini moves first and asks later. People born under this nakshatra open doors the crowd hasn't even noticed yet — rescue work, start-ups, emergency rooms, anywhere speed is mercy. The horse's head gives stamina and a short fuse alike: begin fast, finish faster, rest briefly. Its one lesson outlasts the races: patience with slow people, who are most people.",
    essayHi: "Ashwini pehle chalta hai, baad mein poochhta hai. is nakshatra ke log aise darwaaze kholte hain jise bheed ne dekha hi nahi — rescue, startup, emergency. ghode ka sir: stamina aur chhoti agg. seekh: dheemon ke saath sabr." },
  { name: "Bharani", lord: "Venus", symbolEn: "the yoni", keywords: ["bearing", "discipline", "creative-fire"],
    essayEn: "Bharani carries weight — literally: the womb that bears, the judge who bears responsibility for lives. Life hands this native creative fire AND the discipline to contain it, a rare double forging. Extremes tempt constantly; walking the middle path is the whole trick of the years. Careers in art, birth-work, justice and hospitality flourish under that balance.",
    essayHi: "Bharani bojh uthata hai — garbh jaisa, nyaayi jaisa. jeevan is janm ko raajanik agg BHI deta hai aur usay rokne ka anushasan BHI. atiyog ka lalach; beech ka raasta hi asli trick. kala, janm-seva, nyaay, atithi-seva mein phool." },
  { name: "Krittika", lord: "Sun", symbolEn: "the razor/pearl", keywords: ["cutting", "purifying", "sharp-truth"],
    essayEn: "Krittika cuts. The razor trims the truth to its essence and the fire burns the impure away. Careers: surgery, critique, editing, command — anywhere the dull edge fails. The shadow is a tongue that wounds before the mind approves; seven nurses of the fire taught the lesson. One rule governs the blade: cut the work, never the person.",
    essayHi: "Krittika kaatta hai. ustara satya ko saar tak kaatata hai; agni apavitra jala deti hai. career: shalya-chikitsa, aalochana, editing, sena-ka-anushasan. chhaya: zubaan pehle chot karti hai, dimaag baad mein. ek niyam: kaam ko kaato, insaan ko nahi." },
  { name: "Rohini", lord: "Moon", symbolEn: "the ox-cart", keywords: ["growth", "beauty", "steady-rise"],
    essayEn: "Rohini grows things — crops, companies, children, beauty. The red star of the ox-cart rises slowly and fills every granary it passes. Charm is native to the born; so is a taste for comfort that can drift into luxury's debt if unwatched. Steady tending beats brilliant sprints here: what Rohini waters daily, Ripens beyond expectation.",
    essayHi: "Rohini cheezein ugaata hai — fasal, company, bachche, sundarta. bael-gaadhi ka laal taara dheere chadhata hai aur khoti bharta hai. aakarshan janm-siddh hai; aaraam ka shauk karz ban sakta hai. yahan tez daud se lagataar dekhbhaal jeetti hai." },
  { name: "Mrigashira", lord: "Mars", symbolEn: "the deer's head", keywords: ["search", "restless", "curious"],
    essayEn: "Mrigashira searches. The deer's head never stops scanning — for the better city, the truer answer, the next skill. This is the eternal student's star: breadth over depth until one search becomes a career. Doors open through curiosity the plodder never finds. The discipline to master: guard against quitting at 80%, because the last mile is where the deer is finally caught.",
    essayHi: "Mrigashira dhoondhta hai. hiran ka sar kabhi rukta nahi — behtar shehar, sahi jawab, agli hunar. yeh sada-student ka tara hai: gahrai se pehle chaurahaai — jab tak ek khoj hi career na ban jaaye. 80% par chhodne ki aadat se bacho." },
  { name: "Ardra", lord: "Rahu", symbolEn: "the teardrop/storm", keywords: ["storm", "renewal", "sharp-mind"],
    essayEn: "Ardra is the storm that cleans the air. Born under it: a mind that probes until something breaks — then rebuilds it better than before. Turbulence is the syllabus, not the punishment; the rain ends in green. Careers in research, tech and upheaval-adjacent work suit the weather. Calm comes after mastery here, never before it.",
    essayHi: "Ardra aisi toofan hai jo hawa saaf karti hai. iske antargat janm: dimaag jo todne tak chheenta hai — phir behtar banakar jodta hai. khalbal hi syllabus hai, saza nahi. research, tech, badlaav ke kaam; shaanti maharat ke baad aati hai, pehle nahi." },
  { name: "Punarvasu", lord: "Jupiter", symbolEn: "the return of light", keywords: ["return", "safety", "wisdom"],
    essayEn: "Punarvasu returns — the light comes back after the storm. Natives recover: money, homes, hope, all come back once. Home-learning, teaching, restoration work fit this generous, repeating tide. The risk is real too: settling for the safe second act instead of the first love. When Punarvasu holds its nerve through the dark stretch, everything lost returns doubled — that is the nakshatra's whole promise.",
    essayHi: "Punarvasu lautata hai — toofan ke baad roshni wapas. iske janm wapas aate hain: paisa, ghar, umeed, sab ek baar. ghar-k gyaan, padhai, jirah-tod ka kaam. khatra: pehla pyaar chhod kar mehfooz doosra hissa basa lena." },
  { name: "Pushya", lord: "Saturn", symbolEn: "the cow's udder", keywords: ["nurture", "trust", "orthodox"],
    essayEn: "Pushya feeds. The most auspicious nakshatra in the classical lists: it nourishes whoever comes to it, and the world keeps coming back for more. Trust is the native's currency; institutions, food, care-work, banking all sit naturally here. Saturn's discipline underneath makes the kindness reliable rather than soft — people return because the help actually lands, on time, every time.",
    essayHi: "Pushya palata hai. gyaan-parampara ki sabse shubh nakshatra: jo aata hai, use poshan. bharosa hi is janm ki currency; sanstha, ann, dekhbhaal, bank — sab lagte hain. neeche Shani ka anushasan: neeyat naram, niyam sakht." },
  { name: "Ashlesha", lord: "Mercury", symbolEn: "the coiled serpent", keywords: ["intense", "strategic", "penetrating"],
    essayEn: "Ashlesha coils. The serpent's grip: strategic patience, hypnotic focus, research that penetrates to the very root. Poison or medicine — the same mouth decides. Politics, pharma, psychology, occult research all suit this penetrating mind. The hard-won lesson is transparency with one's own people: the coil protects the clan, not schemes against it, and then nothing can grip tighter.",
    essayHi: "Ashlesha lapet-ta hai. saanp ki pakad: raananeeti, sammohit dhyaan, jad tak pahunchne wali khoj. vish ya dawa — ek hi muh. raajniti, pharma, manovigyan, gupt-vidya. seekh: apne logon ke saath khol-kar rehna." },
  { name: "Magha", lord: "Ketu", symbolEn: "the throne", keywords: ["lineage", "authority", "ancestor"],
    essayEn: "Magha sits on the throne — but the seat belongs to the ancestors who built it. Family legacy, family business, family name: this nakshatra inherits and must deliver to the dead as to the living. Pride is fuel and trap both, in the same breath. Honouring the elders' path while quietly updating its methods is the whole art of the reign.",
    essayHi: "Magha gaddi par baithta hai — par gaddi purvajon ki hai. khaandaan ki virasat, business, naam: yeh nakshatra waris hai, aur dena hai usko. gham Fuel bhi, jaal bhi. buzurgon ka raasta pakdo, tariqa naya rakho — yehi kala hai." },
  { name: "Purva Phalguni", lord: "Venus", symbolEn: "the front legs of the hammock", keywords: ["leisure", "art", "romance"],
    essayEn: "Purva Phalguni rests in the hammock it wove itself. Arts, romance, hospitality, celebration — the nakshatra of the good life earned early and enjoyed openly. The standing danger is mistaking leisure for purpose, the hammock for the road. When a real craft takes the centre seat instead, luck arrives as if on cue — the audience always finds the performer.",
    essayHi: "Purva Phalguni apni buni hui khatiya mein aaraam karta hai. kala, prem, atithi-seva, utsav — jaldi kamai hui achhi zindagi ka nakshatra. khatra: aaraam ko maksad samajh baithna. jab hunar beech ki kursi le leta hai, kismat ishaare par aati hai." },
  { name: "Uttara Phalguni", lord: "Sun", symbolEn: "the back legs of the hammock", keywords: ["patronage", "contracts", "generosity"],
    essayEn: "Uttara Phalguni holds the hammock for others. Patronage, partnership contracts, the generous benefactor: this star gives through alliances, and alliances repay it. Long agreements — marriage, franchises, tenures — are its home turf, signed and upheld. Its one accounting rule pairs generosity with accountability: keep the ledger clean and the patron's hand stays open for life.",
    essayHi: "Uttara Phalguni doosron ke liye khatiya pakadta hai. sanrakshan, saajhedaari-kaaraarnama, udar-data: yeh tara jodi se deta hai. lambi baandhein — shaadi, franchise, naukri-kaal — iski apni zameen. udarta + hisaab-dono; bahi saaf rakho." },
  { name: "Hasta", lord: "Moon", symbolEn: "the hand", keywords: ["skill", "craft", "clever-hands"],
    essayEn: "Hasta is the hand — the maker's star. Anything done with skilled hands or quick wit belongs here: surgery, craft, trade, comedy, sleight-of-hand. Its humour disarms a hostile room; its thrift funds the workshop through lean months. The maker's one commandment stands: finish the prototype, not just the plan — Hasta is judged by what the hand actually shipped.",
    essayHi: "Hasta haath hai — kaarigar ka tara. haath se banaya ya dimaag se becha — sab isi ka: shalya, shilp, sauda, hasaane-wali baat, jaadu. iski majak se khilona-khata hota hai; kanjoosi workshop chalati hai. plan mat chhodo, prototype poora karo." },
  { name: "Chitra", lord: "Mars", symbolEn: "the jewel", keywords: ["design", "brilliance", "statement"],
    essayEn: "Chitra is the jewel — Tvashtar's workshop of architects, designers and brilliant one-offs. It builds things that glitter and last: buildings, brands, signatures. The quiet risk is building for applause instead of for use — applause fades in a season. In Chitra's arithmetic one signature work always outweighs ten sparkles; polish the thing that will still be shown in ten years.",
    essayHi: "Chitra heera hai — Tvashtar ki workshop: architect, designer, chamakte hue alag kaam. jo banaata hai, chamakta bhi hai aur tikta bhi hai. khatra: istemaal ke liye nahi, taaliyon ke liye banana. das chamak se ek signature-kaam bada." },
  { name: "Swati", lord: "Rahu", symbolEn: "the young wind-swept sprout", keywords: ["independence", "trade", "flexibility"],
    essayEn: "Swati bends like the wind and never breaks — the independent trader's star. Self-made money, foreign connections, constant movement: import-export, aviation, markets, freelancing all fit the sail. Its one homework is commitment, the sailor's knot: the free agent still signs the contract, shows up season after season, and lets the wind carry a ship that holds together.",
    essayHi: "Swati hawa mein jhukta hai, kabhi toot-ta nahi — swatantra vyapari ka tara. khud ki kamaai, videshi naata, safar: aayaat-niryat, aviation, bazaar, freelance. homework: wada — azaad agent bhi kaaraarnama sign karta hai." },
  { name: "Vishakha", lord: "Jupiter", symbolEn: "the triumphal gateway", keywords: ["ambition", "focus", "patience-to-goal"],
    essayEn: "Vishakha stares at the goal and burns through everything between. The triumphal gateway: ambition with real patience — a harvest star that can wait out a whole season without losing faith. Single-target focus is what wins here; scattered ambition just burns the field it meant to reap. Choose the one prize, then let nothing between you and the gate.",
    essayHi: "Vishakha nishaane ko ghoor-ta hai aur beech ki sab cheez jala deta hai. vijay-dwaar: asli sabr ke saath mahatva-kaanksha — poora mausam intezaar kar leta hai. ek nishaan par dhyan jeetta hai; bikhri mohabbat khet jala deti hai." },
  { name: "Anuradha", lord: "Saturn", symbolEn: "the lotus", keywords: ["devotion", "groups", "friendly-discipline"],
    essayEn: "Anuradha blooms in the group. The lotus in the pond: friendship, organisations, foreign teams — a discipline that works WITH people, never over them. Devotion to a shared goal is its quiet genius; teams follow it willingly. Only one shadow needs watching: loyalty to the wrong crowd. Pick the circle as carefully as the cause.",
    essayHi: "Anuradha toli mein khilta hai. taalaab mein kamal: dosti, sanstha, videshi team — anushasan jo logon ke saath chalta hai, un par nahi. saajha nishaan hi iska pyaar hai; chhaya: galat bheed ke prati wafadaari." },
  { name: "Jyeshtha", lord: "Mercury", symbolEn: "the eldest/umbrella", keywords: ["seniority", "protect", "responsibility"],
    essayEn: "Jyeshtha is the eldest — the one who holds the umbrella over the family. First-born energy: authority taken early, responsibility carried longest. Careers in senior management, protection services, elder-craft suit the bearing. One lesson softens the load: let others stand in the sun sometimes — the umbrella held for decades needs co-carriers, not just followers.",
    essayHi: "Jyeshtha bada hai — ghar ki chhatri pakadne waala. bade-bhai ki oorja: pad jaldi, zimmedari lambi. senior-management, suraksha-seva, buzurg-hunar. seekh: kabhi-kabhi doosron ko dhoop mein khada hone do." },
  { name: "Mula", lord: "Ketu", symbolEn: "the root", keywords: ["root-truth", "uprooting", "philosophy"],
    essayEn: "Mula digs to the root and pulls. Philosophy, medicine's origins, the foundation behind the facade — this nakshatra uproots to find what actually holds. Careers in research, root-cause work and spiritual inquiry come naturally to the digger. Its one iron rule kept the sages safe: uproot ideas and broken systems, never people — the root that matters is the true one.",
    essayHi: "Mula jad tak khodta hai aur kheench leta hai. darshan, chikitsa ki jad, aar-paar ke neeche ki neev — yeh nakshatra pakadne ke liye ukhaadta hai. career: research, root-cause, adhyatm. vichar ukhaado, insaan nahi." },
  { name: "Purva Ashadha", lord: "Venus", symbolEn: "the winnowing basket", keywords: ["invincible-claim", "purifying", "persistence"],
    essayEn: "Purva Ashadha winnows: the basket shakes until only the grain remains — the 'invincible' star of the field. Persuasion, purification, public debate: its voice carries across crowds and sceptics alike. Persistence is the weapon — the same argument, said cleaner, said again — until the case that seemed lost stands unanswerable on the table.",
    essayHi: "Purva Ashadha oontaata hai: tokri hilti hai, sirf anaaj bachta hai — 'ajay' ka tara. prabhaav, shuddhi, saarjaniit bahas: iski awaaz pahunchti hai. hathiyaar: lagataar mehnat — wahi baat, saaf banakar, phir kaho." },
  { name: "Uttara Ashadha", lord: "Sun", symbolEn: "the elephant's tusk", keywords: ["lasting-victory", "duty", "leadership"],
    essayEn: "Uttara Ashadha wins for good. Late but permanent victory — the elephant's tusk never regrows and never needs to. Duty, tenure, institutions: careers of long-haul leadership fit the patience. Its promise cuts both ways and holds: what you build properly here, nobody gets to take down — so build only what deserves that permanence.",
    essayHi: "Uttara Ashadha pakki jeet-ta hai. der se, par hamesha ke liye — haathi ka lad nahi ugtta, aur uski zaroorat bhi nahi. duty, naukri-kaal, sanstha: lambi-daur ke neta. iska wada: jo yahan banaaya, koi giraa nahi sakta." },
  { name: "Shravana", lord: "Moon", symbolEn: "the ear", keywords: ["listening", "learning", "tradition"],
    essayEn: "Shravana listens. The ear that carries tradition forward: oral learning, teaching, broadcasting, archives — knowledge kept alive by hearing. The native learns by listening and earns by repeating exactly what others let slip past. One caution disciplines the gift: listening does not mean obeying every voice; sift the heard, then carry only the true.",
    essayHi: "Shravana sun-ta hai. parampara ko aage badhaane waala kaan: sun-kar gyaan, padhaana, prasaaran, archives. is janm ko sun-kar gyaan milta hai — aur doosron se chhoote hue sun-kar kamai. hoshiyar: sunna har awaaz ke aage jhukna nahi." },
  { name: "Dhanishtha", lord: "Mars", symbolEn: "the drum", keywords: ["rhythm", "wealth", "team-beat"],
    essayEn: "Dhanishtha keeps the beat — the drum that keeps a team marching as one. Wealth arrives through rhythm: real estate, music, logistics, group enterprise all reward the steady pulse. The richest of the nakshatra promises is paid out on one condition only — keep time with the group; the drummer who plays solo eats alone.",
    essayHi: "Dhanishtha taal pakadta hai — dholak jo team ko ek saath chalta rakhe. dhan taal se: zameen, sangeet, supply-chain, toli-ka-business. sabse ameer nakshatra-vaada — jo toli ke saath tal mein rahe, usi ko." },
  { name: "Shatabhisha", lord: "Rahu", symbolEn: "the hundred healers", keywords: ["healing", "networks", "veil"],
    essayEn: "Shatabhisha is the circle of hundred healers. Mystery, healing at scale, the veil between the seen and unseen: pharma, tech-networks, esoteric research all answer its call. Its gift is fixing what the crowd calls unfixable; its cost is loneliness at the edge of knowledge. Healers who share the circle rather than guard it never lack company.",
    essayHi: "Shatabhisha sau vaidya ka ghera hai. rahasya, bade-paimaane ka ilaaj, dikhave-aur-na-dikhave ke beech ka parda: pharma, tech-network, gupt-vidya. inaam: jise bheed 'nahi ho sakta' kahe, usay theek karna; daam: kinare par tanhaai." },
  { name: "Purva Bhadrapada", lord: "Jupiter", symbolEn: "the front legs of the funeral cot", keywords: ["idealism", "ascetic-fire", "transformation"],
    essayEn: "Purva Bhadrapada carries the ascetic's fire: idealism intense enough to burn the old self to ash. The front legs of the cot — transformation is the whole theme. Careers in reform, depth-philosophy, esoteric tech fit the burning edge. One guard rules the years: tend the fire but never let it collapse into cynicism; the flame is meant to light, not scorch.",
    essayHi: "Purva Bhadrapada tapasvi ki agg uthaata hai: aadarsh itna tez ki purana swagam jala de. khatiya ke aage ke pair — parivartan hi vishay hai. sudhaar, gehri darshan, gupt-tech. agg ko sambhalo; woh tadatmaa na ban jaaye." },
  { name: "Uttara Bhadrapada", lord: "Saturn", symbolEn: "the back legs of the funeral cot", keywords: ["depth", "compassion", "completion"],
    essayEn: "Uttara Bhadrapada completes what the fire began. Deep water and deep calm: compassion with real staying power, wealth that arrives through settled wisdom rather than luck. The back legs of the cot — the quiet finisher every project needs. Teaching, counselling, long research, settled finance suit the depth; what this star finishes stays finished.",
    essayHi: "Uttara Bhadrapada wah poora karta hai jo agg ne shuru kiya. gehra paani, gehra chain: karuna jo tikti hai, sampatti jo basi hui budhi se aati hai. peechhe ke pair — chupchaap poora karne waala. padhaana, salah, lambi khoj, sthir finance." },
  { name: "Revati", lord: "Mercury", symbolEn: "the shepherd's drum", keywords: ["guidance", "journeys", "completion"],
    essayEn: "Revati shepherds the flock home — the last nakshatra, the safe arrival after the long road. Guidance, travel, the final mile of any long project: careers in care, logistics, and endings done well suit the shepherd. Its blessing is simple and rare: whoever works with Revati reaches home — and Revati keeps count of every one delivered.",
    essayHi: "Revati bhed-badi ko ghar lauta-ta hai — aakhri nakshatra, mehfooz pahunch. disha-dikhana, safar, kisi bhi lambe kaam ka aakhri chaalan: dekhbhaal, supply, achhe-aant ka career. iska aashirwad: Revati ke saath jo kaam, woh ghar pahunchta hai." },
];

/* ------------------------------------------------------------------ */
/* 9 dasha-lord period essays (mahadasha themes)                       */
/* ------------------------------------------------------------------ */

export interface DashaEssay {
  lord: string; // panchanga name: Sun…Mars
  school: string; // school graha name
  periodEn: string;
  periodHi: string;
}

export const DASHA_ESSAYS: DashaEssay[] = [
  { lord: "Sun", school: "Surya",
    periodEn: "The Sun's years put your NAME in rooms it used to only visit. Position, titles, father-figures, government doors. Ego is the fee: share credit and the light multiplies; hoard it and it singes.",
    periodHi: "Surya ke saal aapke NAAM ko wo kamre mein le jaate hain jo pehle sirf dekhte the. pad, title, pita-figures, sarkari darwaaze. ahankaar fees hai: credit baanto, roshni dugni; jodo, jal jaoge." },
  { lord: "Moon", school: "Chandra",
    periodEn: "The Moon's years flow on feelings, home and the public's trust. Mother's health, house moves, caretaking. Your audience feels what you feel — clean moods, clean business. The tide is real: work with it.",
    periodHi: "Chandra ke saal bhaavna, ghar aur jan-bharose par chalte hain. maa ki sehat, ghar-badal, dekhbhaal. apni audience wohi mehsoos karti hai jo aap karte ho — man saaf, dhanda saaf. lahar asli hai; usi ke saath chalo." },
  { lord: "Mars", school: "Mangal",
    periodEn: "Mars' years hand you the sword: land, machinery, sports, bold moves. Speed wins — and scars teach. Pick fights you can finish; the discipline of Tuesday (restraint, seva) keeps the fire cooking, not burning.",
    periodHi: "Mangal ke saal talwaar dete hain: zameen, machine, khel, bade kadam. raftaar jeet-ti hai — aur nishaan sikhaate hain. woh ladai chuno jo khatam kar sakte ho; Mangalvaar ka sanyam agg ko chulha banaye, aag nahi." },
  { lord: "Rahu", school: "Rahu",
    periodEn: "Rahu's years are the ladder of sudden rises — foreign lands, new tech, unconventional routes. Paperwork clean, cash buffered, promises in writing. What Rahu gives fast it can ask questions about later; keep receipts.",
    periodHi: "Rahu ke saal achanak chadhav ki seedhi hain — videsh, nayi tech, gair-Parampara raaste. kaagzaat saaf, cash buffer, waade likhit mein. Rahu jo jaldi deta hai, baad mein hisaab maangta hai; rasid rakhо." },
  { lord: "Jupiter", school: "Guru",
    periodEn: "Jupiter's years expand: study, counsel, children, wealth that grows by giving. Mentors appear; so do the entitled. Discernment is the whole curriculum — take advice from the worthy, give it generously, and the years compound.",
    periodHi: "Guru ke saal phail-te hain: padhai, salah, santan, dhan jo dete hue badhta hai. guni aapke raaste mein aate hain; haqdaar bhi. vivek hi poora syllabus — yogya se salah lo, bade dil se do, saal byaaj dekar lautenge." },
  { lord: "Saturn", school: "Shani",
    periodEn: "Saturn's years are the slow judge's bench: workload rises, shortcuts bill later. Everything built properly stays built. Serve the old, keep the accounts honest, and by the end you own things that can't be taken.",
    periodHi: "Shani ke saal dheemay nyaayi ka bench hain: kaam badhta hai, shortcut ka byaaj baad mein. jo theek bana wah tikaa rehta hai. buzurgon ki seva, hisaab saaf — ant mein woh cheezein aapki hongi jo koi chheen nahi sakta." },
  { lord: "Mercury", school: "Budh",
    periodEn: "Mercury's years run on wit: trade, contracts, writing, code, negotiation. Deals multiply; so does the noise. Read everything twice, sign nothing rushed, and let the universal friend's humour carry the rooms.",
    periodHi: "Budh ke saal chaturai par chalte hain: vyapar, karaar, likhai, code, baat-cheet. saude dugne; shor bhi dugna. har kagaz do baar padho, jaldi sign na karo, aur sabka-mitr ki chaturai kamron ko chalati rakhe." },
  { lord: "Ketu", school: "Ketu",
    periodEn: "Ketu's years pull the crowd noise out and hand you one deep lane. Detachment, spiritual study, mastery of a craft, sudden renunciations. Money thins before it clarifies — the least material dasha, often the most valuable.",
    periodHi: "Ketu ke saal bheed ka shor hataate hain aur ek gehri lane dete hain. vairagya, adhyatm, hunar mein maharat, achanak sanyas. paisa pehle patla, phir saaf — sabse kam-maanav dasha, aksar sabse keemti." },
  { lord: "Venus", school: "Shukra",
    periodEn: "Venus' years reward craft, beauty and bonds: art, design, comfort, marriage matters. The sweetest dasha — and the one that bills indulgence. Keep the craft ahead of the comfort and the years stay sweet.",
    periodHi: "Shukra ke saal hunar, sundarta aur rishton ko dete hain: kala, design, aaraam, shaadi-grihasti. sabse meethe saal — aur sabse pahle indulge karne ka bill. hunar ko aaraam se aage rakho; saal meethe rahenge." },
];

/* ------------------------------------------------------------------ */
/* Dosha explainers                                                    */
/* ------------------------------------------------------------------ */

export const DOSHA_EXPLAINERS = {
  mangal: {
    titleEn: "Mangal check (Ank+Graha pariksha)",
    titleHi: "Mangal jaanch (Ank+Graha pariksha)",
    explainEn: "One of the classical marriage-matching checks: where Mars sits. If present, tradition prescribes matching with a similarly-placed chart or the listed upay — presented here as care guidance, never fear.",
    explainHi: "shaadi-milan ki paramparik jaanchon mein se ek: Mangal kahan baitha hai. agar mila, toh parampara ka jawab: milane-wale chart mein bhi waisa hi placement, ya neeche diye upay — yahan yeh dekhbhaal ki salah hai, dar nahi.",
    upayEn: "Tuesday seva + 'ॐ Mangalaya Namah' 108 japa (see remedies page).",
    upayHi: "Mangalvaar ki seva + 'ॐ Mangalaya Namah' ka 108 japa (upay page par).",
  },
  kalaSarpa: {
    titleEn: "Rahu-Ketu axis check (Ank+Graha pariksha)",
    titleHi: "Rahu-Ketu rekha jaanch (Ank+Graha pariksha)",
    explainEn: "When all seven grahas line up on one side of the Rahu-Ketu axis, tradition reads a 'tunnel life': one deep lane with unusual turns. Traditions differ on its weight — we present it as a lens, not a verdict.",
    explainHi: "jab saat graha Rahu-Ketu rekha ke ek hi taraf ho jayein, toh parampara 'tunnel-jeevan' kehti hai: ek gehri lane, anokhe mod. paramparaon mein wajan alag-alag — hum ise drishti ke roop mein dete hain, faisla nahi.",
    upayEn: "Saturday Rahu-Ketu japa + paper-trail discipline (see remedies page).",
    upayHi: "Shanivaar Rahu-Ketu japa + kaagzaat-anushasan (upay page par).",
  },
};

/** Get a nakshatra essay by index (0-26); safe fallback to Ashwini. */
export function nakshatraEssay(index: number): NakshatraEssay {
  return NAKSHATRA_ESSAYS[((index % 27) + 27) % 27] ?? NAKSHATRA_ESSAYS[0];
}

/** Get a dasha essay by panchanga lord name; safe fallback to Sun. */
export function dashaEssay(lord: string): DashaEssay {
  return DASHA_ESSAYS.find((d) => d.lord === lord) ?? DASHA_ESSAYS[0];
}

export function nakshatraText(index: number, lang: Lang): string {
  const e = nakshatraEssay(index);
  return lang === "hi" ? e.essayHi : e.essayEn;
}

export function dashaText(lord: string, lang: Lang): string {
  const e = dashaEssay(lord);
  return lang === "hi" ? e.periodHi : e.periodEn;
}