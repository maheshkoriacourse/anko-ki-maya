/**
 * v3.5 DEPTH ENGINE (owner: "1/2 sentence se kya engage hoga, pura details
 * do… context do, examples do, meaningful banao").
 *
 * Month-deep essays: 4-beat jyotishi structure per personal-month number —
 * (1) kyun ka naam (graha link), (2) kya chalega / kya atkega (specific),
 * (3) kaise kaam karo (concrete), (4) ek chhota example (relatable).
 * EN = spoken-simple; HI = spoken Hinglish (not shuddh, not English).
 * Banned words: 'theme', 'may suggest', 'consider' as filler.
 */

export type DeepEssay = {
  headlineEn: string;
  headlineHi: string;
  deepEn: string;
  deepHi: string;
};

export const PERSONAL_MONTH_DEEP: Record<number, DeepEssay> = {
  1: {
    headlineEn: "Surya opens the books — the month of the first move",
    headlineHi: "Surya khaatein kholta hai — pehla kadam uthaane ka mahina",
    deepEn:
      "This is a Sun month: leadership, fresh starts, visibility from your own name. Things you start now carry your signature for the whole cycle — an application sent, a pitch made, a room entered first. Doors crack open because people are looking for new faces in a 1 month, not old ones. Work it like this: pick the ONE move that matters, do it in the first ten days, and follow up twice. Example: instead of waiting for the appraisal cycle, walk in with your one-page wins list this month — the same facts land bigger now.",
    deepHi:
      "Ye Surya ka mahina hai — agwaai, naya aarambh, aapke naam se pehchaan. Is mahine jo shuru karte hain, wo poore chakra par aapki mohar likha jata hai — bheja form, diya pitch, pehle ghusa meeting mein. 1 ke mahine log naye chehron ke shikaar mein hote hain, purane nahi — isliye darwaaze khulte hain. Aise kaam karo: ek hi bada move chuno, mahine ke pehle das dinon mein karo, aur do baar follow-up karo. Misaal: appraisal cycle ka intezaar chhodo — is mahine apni one-page achievements list lekar chauthok jao, wahi baat badi sunti hai.",
  },
  2: {
    headlineEn: "Chandra month — the deal that comes quietly beats the one you chase",
    headlineHi: "Chandra ka mahina — jo baat chupchaap aati hai, wahi bhaage-peechhe waali se badi hoti hai",
    deepEn:
      "A Moon month: patience, listening, partnerships. Progress here comes sideways — through a phone call, a reference, a quiet dinner conversation — not through force. People carry more emotion than information this month, so the one who listens closely hears the real deal under the small talk. Work it like this: have the one honest conversation you postponed, hold your rate when negotiations start, and water the two most useful relationships you know. Example: that colleague who went quiet — one genuine 'kaise ho?' this month reopens more doors than ten cold messages.",
    deepHi:
      "Chandra ka mahina — sabr, sunna, saajhedaari. Is mahine tareqqi edhgi chalti hai — phone par, kisi reference se, khamosh baat-cheet mein, jabardasti se nahi. Log is mahine jaankari se zyada jazbaat leke ghumte hain — jo dhyan se sunta hai, chhoti-badi baaton ke neeche ka asli sauda sunta hai. Aise chalao: jis imaandaar baat ko daant rakh gaye, wo kar do; mol-bhav shuru ho to apni keemat pakad ke rakho; aur apne do sabse kaam-asta rishton ko is mahine paani do. Misaal: jo saathi chup ho gaya tha — is mahine ek saans 'kaise ho?' das thandi messages se zyada darwaaze kholti hai.",
  },
  3: {
    headlineEn: "Guru month — your voice collects favours",
    headlineHi: "Guru ka mahina — aapki awaaz ehsaan jutaati hai",
    deepEn:
      "A Jupiter month: expansion, expression, learning. Whatever you teach, write, present or put on stage this month multiplies — Jupiter pays back in reach, not just rupees. Attention gathered now becomes goodwill that later becomes opportunity, so visibility work is not vanity this month, it is capital. Work it like this: publish or present once a week, accept the invite to speak, start the small course. Example: one LinkedIn post detailing a client problem you solved can pull more qualified calls this month than a month of cold outreach.",
    deepHi:
      "Guru ka mahina — phailaav, bayaan, seekhna. Jo is mahine sikhate ho, likhte ho, stage par pesh karte ho — wo guna hota hai; Guru rupayon se pehle pahunch dete se daalta hai. Ab jutee hui nazar baad mein mauqa bankar lautti hai — isliye is mahine dikhna dikhawa nahi, pooonji hai. Aise chalao: hafte mein ek baar kuch publish ya present karo, bolne ka bulaava sweekar karo, chhota course shuru karo. Misaal: ek LinkedIn post jismein aapne kaise kisi client ka masla hal kiya — is mahine usse zyada fit calls mahine bhar ki thandi koshish se aati hain.",
  },
  4: {
    headlineEn: "Rahu month — build the systems, skip the shortcuts",
    headlineHi: "Rahu ka mahina — system banao, nayaakhurdi se bacho",
    deepEn:
      "A Rahu month: hard foundations. Nothing glamorous happens and everything durable gets built — processes, documents, routines, backups, compliance. Rahu tests with shortcuts: that too-good deal, that skipped verification — the bill arrives in the same year, at interest. Work it like this: pick the one system whose failure keeps costing you (reporting, follow-up, billing, health routine) and fix it for good this month. Example: the two hours spent making the client-reporting template now quietly saves a week of firefighting every quarter for years.",
    deepHi:
      "Rahu ka mahina — sakht neenv. Kuch chamakdaar nahi hota, aur jo kuch tikau banta hai wo yahin banta hai — process, kaagza, roz-kaam, backup, anupaalna. Rahu shorcuts se parikhta hai: wo zyada-bhari sauda, wo chhodi gayi jaanch — bill isi saal mein aata hai, byaaj ke saath. Aise chalao: ek system chuno jiski chapkaat baar-baar pade (reporting, follow-up, billing, sehat ka rooj) — aur is mahine use pakka theek karo. Misaal: client-reporting ka template aaj ke do ghante mein banao, to har quarter mein ek hafta aagbandhane se bach jaata hai, saalon tak.",
  },
  5: {
    headlineEn: "Budh month — movement opens what stillness keeps shut",
    headlineHi: "Budh ka mahina — hilti cheez khulti hai, ruki cheez band rehti hai",
    deepEn:
      "A Mercury month: travel, pitches, new contacts, quick exchanges. Fortune in a 5 month moves along roads — the meeting away from your desk, the new name in your phone, the market you have not visited. Staying in one room this month means paying full price for a closed window. Work it like this: take the trip, make three fresh introductions, answer every message within a day — but write every deal down before signing, because Mercury months breed speed and misread terms. Example: a single outstation visit often settles in one dinner what six weeks of emails cannot.",
    deepHi:
      "Budh ka mahina — safar, pitch, naye contacts, tez lein-dein. 5 ke mahine naseeb sadkon par chalta hai — desk se door wali meeting, phone mein naya naam, wahi bazaar jahan ab tak nahi gaye. Is mahine ek hi kamre mein baithe rahna band khidki ke poore daam dena hai. Aise chalao: safar karo, teen nayi introduction lo, har message din bhar ke andar jawab do — par har sauda likh ke lein, kyunki Budh ke mahine raftaar bhi laate hain aur galat-padha bhi. Misaal: bahar ki ek visit aksar ek daawat mein woh kar deti hai jo chhe hafton ki email nahi kar paati.",
  },
  6: {
    headlineEn: "Shukra month — the home promise kept returns with interest",
    headlineHi: "Shukra ka mahina — ghar ka nibhaaya vaada byaaj samet lautta hai",
    deepEn:
      "A Venus month: family, love, home and the money that keeps them. Venus rules comfort and duty together — this month repairs at home pay cash dividends outside it, because a settled household is the platform every bold move stands on. Marriage talks, property decisions, health routines of the family — all weigh heavily now, and skipping them to grind at work buys friction, not growth. Work it like this: make the one family decision you keep circling, keep it in writing, and give the week's first evening to the house, not the inbox. Example: the kitchen-table conversation planned for 'after the busy season' is exactly the work this month is for.",
    deepHi:
      "Shukra ka mahina — parivaar, prem, ghar, aur unhe paalane wala paisa. Shukra sukh aur zimmedari dono ke swami hain — is mahine ghar ke theek hua ek marammari bahar sone ki dihaad deti hai, kyunki tiki hui grihasthi hi har bade faislon ki zameen hai. Shaadi ki baatein, property ke faisle, ghar ki sehat-routine — ab sab bhari vajan se sochni banti hai; aur inhe chhod ke sirf kaam mein ghussna khata-mehngi kirayedaari khareedta hai, taraqqi nahi. Aise chalao: wo ek ghar ka faisla jo baar-baar taal rahe ho, is mahine karo, likh ke rakho, aur hafte ki pehli shaam mej par nahi, ghar par do. Misaal: 'busy season ke baad' taali kitchen-table wali baat — isi mahine ke kaam ke liye bani hai.",
  },
  7: {
    headlineEn: "Ketu month — the silence that compounds",
    headlineHi: "Ketu ka mahina — khamoshi jo byaaj khayi jaati hai",
    deepEn:
      "A Ketu month: study, retreat, depth. Loud pushes stall this month while quiet mastery compounds — research done now saves rework later, and the certification or skill banked now pays for years. Visibility can wait one month without dying; half-built foundations cannot. Work it like this: one hour of deep study daily, no screens first hour if you can, and finish the notes — half-read material in a 7 month is money half-spent. Example: the analyst who spends this month mastering one tool walks into next month's stage-ready opportunity with something real to show.",
    deepHi:
      "Ketu ka mahina — adhyayan, akelapan, gehraai. Is mahine shor wale push ruk jaate hain aur khamosh hunar byaaj jama karta hai — ab ki kari shodh baad ki dobara-mehnat bachaati hai, aur abki banked certificate/course saalon tak daalta hai. Dikhaai ek mahine ruk jaane se nahi marti; aadhi bani neenv marti hai. Aise chalao: roz ek ghanta gehra padhana, ho sake to pehla ghanta bina screen, aur notes poore karo — 7 mein aadha-padha material aadha-kharcha paisa hai. Misaal: jo analyst is mahine ek tool par pakki parchi bana leta hai, wo agle mahine stage-ready mauqe mein kuch asli dikhane ke saath ghushta hai.",
  },
  8: {
    headlineEn: "Shani month — the money audit that protects you",
    headlineHi: "Shani ka mahina — paisa ki jaanch jo bachaati hai",
    deepEn:
      "A Saturn month: money, power, and accountability. This is the strongest month of the year for collecting receivables, negotiating position, closing property — and the most dangerous month for shortcuts, because Saturn audits and sends every invoice of loose practice back within the same cycle. Power given now (role, signing authority, responsibility) sticks. Work it like this: chase what you are owed, ask plainly for what you have earned, clean every half-documented arrangement — and keep everything clean. Example: the 'adjust later verbally' habit that survives every other month gets caught in an 8 month; settle it on paper first.",
    deepHi:
      "Shani ka mahina — dhan, shakti, aur jawaab-dehi. Saal ka sabse sakt dhan-mahina: baqaya vasooli, apni keemat mangna, property kholna — aur shortcuts ka sabse khatarnaak mahina, kyunki Shani jaanch karta hai aur dheemi-kamai ka har bill isi chakra mein waapis bhejta hai. Ab di gayi shakti (role, signing authority, zimmedari) chipakti hai. Aise chalao: apna paisa maango, kamaya hua saaf maango, aadhi-likhi har vyavastha theek karo — aur sab kuch imaandaar rakho. Misaal: 'baad mein baki hisaab kar lete hain' wali aadat jo doosre mahine chal jaati hai, 8 mein pakdi jaati hai — pehle kaagze par hisaab pakka karo.",
  },
  9: {
    headlineEn: "Mangal-closure month — empty the desk, free the next cycle",
    headlineHi: "Mangal-band ka mahina — mej khaali karo, agla chakra kholo",
    deepEn:
      "The completion month: chapters close now by choice or by force. Projects that hang, agreements that drag, grievances that replay — in a 9 month each either gets finished, forgiven or removed; leaving them in place taxes the next year's energy. Space made now (inbox, debts, grudges, even an old commitment) is what the incoming 1 cycle fills with something new. Work it like this: ship or kill every half-done project, close the two oldest open loops, and make peace where it costs only words. Example: writing that honest two-line closure note to the old partner this month costs nothing, and removes the drag from every fresh start next cycle.",
    deepHi:
      "Band hote ke mahina: ab adhyaya apni marzi se ya majboori se band hote hain. Jo project latke hain, jo saude ghaseet rahe hain, jo shikwaat dohrate hain — 9 ke mahine ya to poore hote hain, ya maaf hote hain, ya hat jaate hain; jagah chhod diye gaye cheezein agle saal ki urja par lagaan lagati hain. Ab khodi gayi jagah (inbox, udhaar, krodh, purana vaad) hi aane wale 1 chakra mein kuch naya bharta hai. Aise chalao: aadhe-ade project ko ya ship karo ya band karo, do sabse purane open loop band karo, aur jahan kharch sirf shabd ka ho — maafi/khulasa de do. Misaal: purane partner ko do-line ka saaf closure note is mahine likhna muft hai, aur agle chakra ke har naye aarambh se bhaari ghaseet-hatata hai.",
  },
};

/** Personal-year DEEP paragraphs (longterm + blueprint Ch.1). */
export const PERSONAL_YEAR_DEEP: Record<number, DeepEssay> = {
  1: {
    headlineEn: "The first-move year — Surya-led: leadership, fresh starts, name-growth",
    headlineHi: "pehla-kadam saal — Surya pradhan: agwaai, naya aarambh, naam ki taraqqi",
    deepEn:
      "A Sun year: the ten-year cycle restarts and this year sets the direction of everything after it. Leadership roles, self-led projects and anything begun under your own name grow disproportionately now — the years 2-to-9 feed on the base laid here. Practical shape: name the one goal of this cycle in one written line, start it in the first half of the year, and build visible proof of it every quarter. Watch: starting five things — an un-watered 1 year leaves a muddy foundation for eight following years.",
    deepHi:
      "Surya saal: das-saal ka chakra naya shuru hota hai aur yehi saal aage ke sab kuch ki disha tay karta hai. Agwaai-wale roles, khud-led projects, aur apne naam se shuru hua sab kuch is saal bahut tez barhta hai — aage ke saal 2 se 9 isi neenv par palte hain. Amal: is chakra ka ek lakshya ek line mein likho, saal ke pehle aardh mein shuru karo, aur har quarter mein uska dekhne-layak saboot banao. Hoshiyar: paanch cheezein shuru karna — 1 saal bina paani chhoda gaya to aage ke aath saal ki neenv keechad mein rehti hai.",
  },
  2: {
    headlineEn: "The patience year — Chandra-led: partnerships ripen, compounding runs unseen",
    headlineHi: "sabr saal — Chandra pradhan: saajhedaariyan pakeegee, byaaj andar hi andar chalta hai",
    deepEn:
      "A Moon year: partnerships, allies and quiet compounding. Nothing announces itself loudly, but the people-movements made now — collaborations started, trust banked, alliances fed daily — mature over years 3 and 4 into the visible results everyone else attributes to luck. Practical shape: feed the key relationships weekly, join or form the one alliance that matters, resist the scoreboard — under a 2 the ledger fills silently. Watch: impatience. Quitting a 2 year early is uprooting a sapling to check if it is growing.",
    deepHi:
      "Chandra saal: saajhedaari, yaar, aur andar hi andar chalta byaaj. Kuch bhi shor se nahi aata, par abki li gayi logon ki chaal — shuru kiye gaye collaboration, jama hua bharosa, roz pala gaya alliance — saal 3 aur 4 mein saamne wale ke 'kismat' bankar dikhte hain. Amal: hinde hisse ke rishton ko hafte mein ek baar sambhaalein, zaroori alliance se judein ya banayein, aur scoreboard na tolein — 2 ke neeche khata chupchaap bharta hai. Hoshiyar: be-sabri. 2 saal mein dobara utaar ke dekhna paudhe ko jad se ukhaadna hai ki bo raha ya nahi.",
  },
  3: {
    headlineEn: "The visibility year — Guru-led: your name travels, opportunities chase it",
    headlineHi: "dikhaai saal — Guru pradhan: aapka naam door jaata hai, mauqa uske peechhe aata hai",
    deepEn:
      "A Jupiter year: expansion in reach before expansion in money. Publishing, teaching, speaking and stage-work compound this year — each public piece you produce widens the audience the next one lands on. Money follows the attention, usually in the second half. Practical shape: a fixed publishing or presenting rhythm (weekly if possible), one big stage (a talk, a course, a book chapter) committed to, and a record of who responded — Jupiter's network pays quietly but repeatedly. Watch: spreading into ten directions without finishing one.",
    deepHi:
      "Guru saal: pehle pahunch barhti hai, phir paisa. Publish, sikhana, bolna, stage — is saal compounding hota hai; aapki banai har sabkuch-nazar-wali cheez agle ko naya audience deti hai. Paisa nazar ke peechhe aata hai, aksar doosre aardh mein. Amal: pakka publish/present kaa rooj (haan to hafte-waar), ek bada stage (talk, course, kitab-ka-adhyay) jo pakka ho, aur kisne jawab diya uska lekha — Guru ka network chupchap par baar-baar daalta hai. Hoshiyar: das dishaon mein bina koi poora kiye phailna.",
  },
  4: {
    headlineEn: "The foundations year — Rahu-led: hardest work, biggest later-payoff, zero shortcuts",
    headlineHi: "neenv saal — Rahu pradhan: sakht se sakht mehnat, baad ka sabse bada daav, shortcut nahi",
    deepEn:
      "A Rahu year: systems, discipline and durability. This is usually the least glamorous year of the cycle and frequently the one that decides how large years 5-to-8 can become — the infrastructure built now (processes, savings, health, skill depth, licenses) sets the ceiling of the expansion years. Practical shape: pick two structures to make permanent (one money, one health or craft), delay the grand launch if it rests on soft ground, and accept slow months as the deal itself. Watch: shortcuts — Rahu's paperwork-bill arrives at compounding interest.",
    deepHi:
      "Rahu saal: system, anushasan, tikaav. Yeh chakra ka sabse be-glaimar saal hota hai aur aksar wahi sabse faisla-kun hota hai ki saal 5 se 8 kitne bade banenge — abki buniyaad (process, bachat, sehat, hunar, license) hi expansion-saalon ki chhat tay karti hai. Amal: do sanrachnaayein pakki banao (ek paise ki, ek sehat ya hunar ki), bade launch ko rok do agar neenv naram hai, aur dheeme mahine ko hi saude ka hissa mano. Hoshiyar: shortcut — Rahu ka kagzee-bill byaaj jama karke isi saal aata hai.",
  },
  5: {
    headlineEn: "The change year — Budh-led: movement, switches and new markets",
    headlineHi: "badlav saal — Budh pradhan: harakat, switch, naye bazaar",
    deepEn:
      "A Mercury year: the cycle's travel-and-trade window. Job switches, city moves, new markets, new formats — the deals of this year come from roads and fresh rooms, not from repeating last year's routes. Fortune here is quick-footed: it rewards the asked question, the taken trip, the sent proposal. Practical shape: allow two calculated changes (one career, one location or format), travel for every serious opportunity, and keep every term in writing — Mercury speeds flow and misreads alike. Watch: impulse deals signed on adrenaline without the terms sheet.",
    deepHi:
      "Budh saal: chakra ka safar-o-sauda window. Naukri switch, sheher hatak, naya bazaar, naya format — is saal ke saude sadkon aur naye kamron se aate hain, pichhle saal ki raste dohraane se nahi. Yahan naseeb tez-pair hai: poochhi hui sawaal, li gayi trip, bheja gaya proposal paalta hai. Amal: do hisaab-lagam badlav do (ek career ka, ek jagah ya format ka), har sanri mauqe ke liye safar karo, aur har sharaart kaagze par rakho — Budh raftaar aur galat-padhna dono laata hai. Hoshiyar: adrenaline par bina terms-sheet ke dabe saude.",
  },
  6: {
    headlineEn: "The family-and-fortune year — Shukra-led: home and money bloom together",
    headlineHi: "ghar-aur-bhagya saal — Shukra pradhan: ghar aur paisa saath mehakte hain",
    deepEn:
      "A Venus year: the deepest domestic year of the nine-cycle, and its hidden wealth angle. Family decisions that were circling — marriage, children, property, parents' care — come to a head and belong to this year; equally, money tied to home (property, family business, stability-driven salary) grows best now. A settled home is this year's actual engine of outside expansion. Practical shape: complete the one family commitment before the year's second half, keep a formal monthly home-budget ritual, and treat home repair as investment, not interruption. Watch: absorbing everyone's load until your own health is the one unpaid bill.",
    deepHi:
      "Shukra saal: naun-chakra ka sabse gehra ghareloo saal, aur uska chhupa hua dhan-saath. Ghire hue parivaar ke faisle — shaadi, aulaad, property, maata-pita ki dekhbhaal — is saal ke hi naam ke faisle hain; aur ghar se juda paisa (property, parivaar ka dhandha, tiki hui tankhwah bhi) ab sabse tez barhta hai. Tika hua ghar isi saal ki asli bahar-taraqqi ka engine hai. Amal: ek parivaar-commitment saal ke doosre aardh se pehle poora karo, mahine ki pehli tareekh ko ghar-budget ka pakka rooj rakho, aur ghar ke marammari ko kharcha nahi, nifystani mano. Hoshiyar: sab ka bojh uthaate-uthaate khud ki sehat hi aisi bill ho jaaye jiska bhugta na hua ho.",
  },
  7: {
    headlineEn: "The mastery year — Ketu-led: loud pushes stall, quiet depth compounds",
    headlineHi: "hunar saal — Ketu pradhan: shor wale push rukte hain, khamosh gehraai byaaj jama karti hai",
    deepEn:
      "A Ketu year: retreat, research, and one craft taken deep. Outward momentum (switches, launches, loud asks) resists this year and punishing it rarely works — while the study, certification or specialization banked now becomes the unfair advantage of years 8 and 9. The world pays a 7-year's graduate heavily, two years after quietly. Practical shape: one discipline to master by year-end, a daily non-negotiable study block, and acceptance that this year's scoreboard is private. Watch: reading the stillness as failure and quitting the deep work in month four.",
    deepHi:
      "Ketu saal: ret, shodh, aur ek hunar par gehra chadhna. Bahar-wali raftaar (switch, launch, bada maang) is saal atakti hai aur zor laagane se thaskata hai — par abki kari study, certificate ya specialization saal 8 va 9 ki na-insaaf wali taakat bankar lautati hai. 7-saal ka graduate duniya se do saal baad aaraam se bojhbhaari paalta hai. Amal: ek ikkela hunar jisse saal ke ant tak pakka karna hai, roz ka bina-sharti padhai ka block, aur ye maanna ki is saal ka saboot-chitha niji hai. Hoshiyar: khamoshi ko haar samajh ke mahine 4 me gehra kaam chhod dena.",
  },
  8: {
    headlineEn: "The money-and-power year — Shani-led: collect, negotiate, close clean",
    headlineHi: "paisa-aur-shakti saal — Shani pradhan: vasooli karo, mol-bhav karo, saaf band karo",
    deepEn:
      "A Saturn year: the harvest window of the whole cycle — and the audit in the same room. Money moves made in a 8 year are the largest of the cycle: receivables collected, position asked for, property transacted, authority granted — all stick. The same gravity punishes loose practice instantly. Practical shape: a written receivables list chased weekly, one big ask (role, fees, price) prepared and made, and every arrangement documented from day one. Watch: shortcuts of any kind inside an 8 year — Saturn's bills are the only ones that arrive with compounding and witnesses.",
    deepHi:
      "Shani saal: poore chakra ki fasal-khand — aur usi kamre mein jaanch. 8 saal ke dhan-mauqe chakra ke sabse bade hote hain: baqaya vasool, padav maangi, property sambhali, aayug diya — sab chipakta hai. Usi gurutva se dheemi kamai turant pakdi jaati hai. Amal: likhi hui baqaya-suchi jise hafte waari dhoda jaye, ek bada maang (padav, fees, daam) tayyaar karke karo, aur har saajhedaari ek din se kaagze par. Hoshiyar: 8 saal mein koi bhi shortcut — Shani ke bill aate hain byaaj aur gawahon ke saath.",
  },
  9: {
    headlineEn: "The completion year — Mangal-led: chapters close, the desk empties for the new cycle",
    headlineHi: "poora-karne ka saal — Mangal pradhan: adhyaya band, mej khaali — naya chakra aata hai",
    deepEn:
      "A Mars year of endings done right: every hanging project, dragging agreement and unresolved grievance either finds closure or finds you. Nine-years are clearing windows — the space made (commitments, debts, even beliefs) is exactly what the next 1 year fills with something new. Relationships that were scaffolding come down this year with dignity; work that was identity ends by choice. Practical shape: a two-column 'close it or keep it' list of every open loop, hard weekly execution of the close column, and forgiveness where it costs words only. Watch: dragging things into the 1 year — the new cycle taxes unfinished weight.",
    deepHi:
      "Mangal saal, theek se kari bandish: har latka project, ghaseet hua sauda, aur an-hal hua shikwaat — ya band hota hai ya aapko pakadta hai. Nau saal ke mahine saaf-safai ke khand hai — khodi gayi jagah (zimmedari, udhaar, soch tak) hi aane wale 1 saal mein naya bharti hai. Jo rishte aar ka tiika the, wo is saal izzat se ut jaate hain; jo kaam pehchaan bana tha, wo apni marzi se khatam hota hai. Amal: har open-loop ki do-colmun 'band karo ya rakho' suchi, band-column ka sakht hafte-waar execution, aur jahan kharch sirf shabd ho — maafi. Hoshiyar: cheezein ko 1 saal mein ghaseetna — naya chakra adhuri boojh par lagaan lagata hai.",
  },
};

/** Shorthand getters for pages. */
export function monthDeep(pm: number, lang: "en" | "hi") {
  const d = PERSONAL_MONTH_DEEP[pm] ?? PERSONAL_MONTH_DEEP[1];
  return lang === "hi" ? d.deepHi : d.deepEn;
}
export function monthHeadline(pm: number, lang: "en" | "hi") {
  const d = PERSONAL_MONTH_DEEP[pm] ?? PERSONAL_MONTH_DEEP[1];
  return lang === "hi" ? d.headlineHi : d.headlineEn;
}
export function yearDeep(py: number, lang: "en" | "hi") {
  const d = PERSONAL_YEAR_DEEP[py] ?? PERSONAL_YEAR_DEEP[1];
  return lang === "hi" ? d.deepHi : d.deepEn;
}
export function yearHeadline(py: number, lang: "en" | "hi") {
  const d = PERSONAL_YEAR_DEEP[py] ?? PERSONAL_YEAR_DEEP[1];
  return lang === "hi" ? d.headlineHi : d.headlineEn;
}