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
/* ------------------------------------------------------------------ */
/* v4.1 PINNACLE + CHALLENGE DEEP (owner: "cycles section no           */
/* explanation — can't understand anything") — 4-beat bilingual         */
/* explanations per pinnacle/challenge number, school voice.            */
/* ------------------------------------------------------------------ */

export const PINNACLE_DEEP: Record<number, DeepEssay> = {
  1: {
    headlineEn: "Pinnacle 1 — the stand-alone chapter",
    headlineHi: "Pinnacle 1 — akela khada hone ka chapter",
    deepEn:
      "This chapter pulls you toward independence: your own name carries weight now, and things bought on borrowed authority stop working. Careers peak here when you lead something visibly — a team, a practice, your own firm. Work it like this: build the thing that can't be taken — your skill, your client list, your body of work. Example: this is the chapter where a bank officer becomes the branch head everyone calls by name. Watch out: pride at the top of this chapter reads as ego from outside; carry people along or the same people stop opening doors.",
    deepHi:
      "Ye chapter aapko swatantrata ki taraf kheenchta hai: aapke naam ka wajan badhta hai, udhaar ki authority pe lena band ho jaata hai. Careers yahan tab chamakte hain jab aap kuch dikha ke lead karte ho — team, practice, apna kaam. Aise chalao: wahi banao jo koi chheen na sake — hunar, client-list, body of work. Misaal: yahi wo chapter hai jab bank officer branch-head banta hai jo sab naam se jaante hain. Dhyan: is chapter ki chadhai pe ahankaar neeche se ego dikhta hai; logon ko saath le chalo warna wahi darwaaze band karte hain.",
  },
  2: {
    headlineEn: "Pinnacle 2 — partnerships and quiet power",
    headlineHi: "Pinnacle 2 — saajhedaari aur khamosh taakat",
    deepEn:
      "This chapter rewards patience and alliances: the big things here arrive through one steady relationship — a partner, a loyal team, one institution that keeps calling you back. It is not a spotlight chapter, it is a trust chapter. Work it like this: choose two or three relationships and water them for years; take the slower, surer deal. Example: this is the chapter where a quiet personal bank relationship manager becomes the person HNI clients ask for by name. Watch out: this chapter's danger is disappearing behind others' names while your own growth politely waits — keep one visible calling card of your own.",
    deepHi:
      "Ye chapter sabr aur jodiyon ko pay karta hai: badi cheezein yahan ek pakka rishta lake aati hain — partner, wafadaar team, ek sanstha jo baar-baar aapko bulaati hai. Yeh spot-light ka chapter nahi, bharose ka hai. Aise chalao: do-teen rishte chuno aur saalon tak unhe paani do; dheema par pakka sauda lo. Misaal: yahi wo chapter hai jab chupchaap RM HNI clients ke naam se maangte hain. Dhyan: is chapter ka khatra — logo ke naam ke peeche gaayab ho jaana, jabki aapki apni growth politely intezaar karti hai; apna ek dikhta raasta rakho.",
  },
  3: {
    headlineEn: "Pinnacle 3 — voice, children and creative growth",
    headlineHi: "Pinnacle 3 — awaaz, santan aur srijan ki vridhi",
    deepEn:
      "This chapter expands through expression: teaching, writing, speaking, building for children and family — the growth here compounds every time you give the gift out loud. Careers that bloom: training, content, marketing, any role where your words move people to act. Work it like this: put your voice on record once a week — post, teach, speak; keep the family close in decisions. Example: this is the chapter where someone becomes the mentor juniors quote years later. Watch out: scattering across five creative half-projects ends none of them; finish one visible work per year of this chapter.",
    deepHi:
      "Ye chapter awaaz se faailta hai: sikhana, likhna, bolna, bachhon aur ghar ke liye banana — jaise-jaise aap apni baat zubaan se dete hain, yehi compounding hota hai. Blooming careers: training, content, marketing, har role jismein aapke shabd log ko kaam par utaarte hon. Aise chalao: hafte mein ek baar apni awaaz rekhar karo — post, sikhao, bolo; parivaar ko faisle mein rakho. Misaal: yahi wo chapter hai jahan koi woh guru ban jaata hai jise juniors saalon baad quote karte hain. Dhyan: paanch aadhe srijan-faiyle saalon bhar latke reh jaate hain — is chapter ke har saal ek poora dikhta kaam khatam karo.",
  },
  4: {
    headlineEn: "Pinnacle 4 — the slow build that stays built",
    headlineHi: "Pinnacle 4 — dheema banaav jo bana rehta hai",
    deepEn:
      "This chapter is Shani's: slow, exacting, unglamorous — and the one that leaves you owning real things at its end: property, savings, an unshakeable reputation, systems that run without you. Careers: operations, credit, compliance, long-horizon roles. Work it like this: pick the boring discipline and repeat it — SIPs of effort; do not change course mid-chapter for a fast lane. Example: this is the chapter where someone who saved quietly for ten years wakes up debt-free with a paid house. Watch out: grinding without rest — this chapter punishes skipped health and skipped family like compound interest; take the one full day off weekly.",
    deepHi:
      "Ye chapter Shani ka hai: dheemay, sakht, chamak-heen — aur akhir mein aapse asli cheezein rakhwata hai: property, bachat, pakki izzat, aise system jo aapke bina chalte hain. Careers: operations, credit, compliance, lambi-nazar wale roles. Aise chalao: ek boring anushasan chuno aur dohrao — mehnat ka SIP; chapter ke beech tez lane ke chakkar mein rasta na badlo. Misaal: yahi wo chapter hai jab das saal chupchaap bachane wala aadmi rin-mukt jaagta hai, ghar makuulat. Dhyan: aaram chhod ke ghisna — is chapter mein sehat aur parivaar ka skipped hisaab byaaj ke saath aata hai; hafte mein ek poora chhutti rakho.",
  },
  5: {
    headlineEn: "Pinnacle 5 — motion, markets and reinvention",
    headlineHi: "Pinnacle 5 — chaal, bazaar aur apne-aap ko badalna",
    deepEn:
      "This chapter runs on change: travel, new trades, new audiences, reinventions of self. Money and opportunity here love movement — multiple income lines are natural in this chapter. Work it like this: say yes to the unfamiliar room, learn the new tool early, keep one anchor discipline so the motion has a spine. Example: this is the chapter where a career pivots — the banker who starts writing, the CA who starts a fintech. Watch out: restlessness — five re-inventions a year leave no compounding; every new bet needs its minimum season to pay.",
    deepHi:
      "Ye chapter badalne par chalta hai: saffar, naye dhandhe, naye audience, apni naya roop. Yahan paisa aur avsar chaal ko pyaar karte hain — kai income-lines Natural hain. Aise chalao: anjaan kamre mein haan kaho, naya tool jaldi seekho, ek anchor-anushasan rakho taaki chaal ki reedh rahe. Misaal: yahi wo chapter hai jab career turn leta hai — bankar jo likhta hai, CA jo fintech khadta hai. Dhyan: bechaini — ek saal mein paanch baar naya roop, koi compounding nahi; har naye bet ko uska kam-se-kam mausam chahiye chukkane ko.",
  },
  6: {
    headlineEn: "Pinnacle 6 — home, duty and the family ledger",
    headlineHi: "Pinnacle 6 — ghar, zimmedari aur parivaar ka hisaab",
    deepEn:
      "This chapter centres the household: parents' care, children's futures, the house itself, and authority in caring professions. Careers bloom in medicine, education, HR, family business leadership. Work it like this: the family and community you serve are also your network of return — invest with both eyes open; put the financial plan for parents and kids in writing. Example: this is the chapter where someone quietly becomes the pillar every relative leans on — and their word becomes bankable. Watch out: over-carrying — carrying everyone until your own tank empties; service that excludes self-care collapses mid-chapter.",
    deepHi:
      "Ye chapter ghar ko kendra mein rakhta hai: maa-baap ki dekhbhaal, bachhon ka bhavishya, ghar khud, aur seva-bhaav wale profession mein authority. Careers: medicine, education, HR, parivaarik vyapaar ki netritva. Aise chalao: parivaar aur samaj jo aap sevate ho, wahi aap ki wapsi ka network hai — dono aankhein kholkar invest karo; maa-baap aur bachhon ka financial plan likh ke rakho. Misaal: yahi wo chapter hai jahan koi chupchaap sabki tek ban jaata hai — aur uski baat bank jaisi maani jaati hai. Dhyan: atyaadhik bojh — sabko uthao-apna tank khaali; aise seva jo swa-kehyal ko chhod de, chapter ke beech mein girti hai.",
  },
  7: {
    headlineEn: "Pinnacle 7 — depth, study and the inner lane",
    headlineHi: "Pinnacle 7 — gehraai, adhyayan aur bhitar ka raasta",
    deepEn:
      "This chapter thins the crowd and deepens the person: it favours study, research, spiritual practice, specialist mastery over general visibility. Careers: analysis, research, teaching a niche, healing, writing. Work it like this: choose one deep lane and give it years; guard one daily quiet hour as if it were a client meeting — it is, with the long-term client. Example: this is the chapter where a generalist quietly becomes 'the person whose one subject is dangerous'. Watch out: isolation — Ketu's lane turns you hermit without a plan; keep exactly three people in your week, chosen well.",
    deepHi:
      "Ye chapter bheed ko patla karta hai aur insaan ko gehra: adhyayan, research, ruhaani taaqat, khaas maharat se aam pehchaan ke upar. Careers: vishleshan, research, ek niche ka sikhana, healing, likhna. Aise chalao: ek gehri lane chuno aur saal de do; roz ki khamosh ghanta rakho — wahi lambi-nazar wala client hai. Misaal: yahi wo chapter hai jab aam-dimaag chupchaap 'bana baya jiski ek subject khatarnak' ban jaata hai. Dhyan: akele-ghoomna — Ketu ki lane bina plan ke sanyaasi bana deti hai; hafte mein theek teen log rakho, soch ke chune hue.",
  },
  8: {
    headlineEn: "Pinnacle 8 — assets, authority and the long ledger",
    headlineHi: "Pinnacle 8 — sampatti, adhikaar aur lambi bahi-khata",
    deepEn:
      "This chapter is the harvest-of-scale one: positions grow, holdings grow, but every gain is measured and billed. Careers: leadership in money institutions, entrepreneurship at scale, any role where balance-sheets answer to you. Work it like this: play the long ledger — real assets, clean accounts, name-backed guarantees; avoid borrowing to look big. Example: this is the chapter where someone becomes known as 'the one whose word his bank'. Watch out: the same scale taxes health and home quietly; the 8-chapter end-game is only counted as success if the body and the family arrive with you.",
    deepHi:
      "Ye chapter scale ki kataai ka hai: pad badhte hain, sampatti badhti hai — par har labh naapa aur bill hua. Careers: paison ki sansthaon mein leadership, bade scale ka dhanda, har role jahan balance-sheet aapse jawab deti hai. Aise chalao: lambi bahi-khata khelo — asli sampatti, saaf khaate, naam ki zanjeer; bada dikhne ke liye udhaar mat lo. Misaal: yahi wo chapter hai jab koi 'jiski baat bank hai' kehlaya. Dhyan: wahi scale sehat aur ghar par chupchaap cash maangta hai; 8-chapter ki antim jama sirf tab hai jab badan aur parivaar aapke saath pahunchen.",
  },
  9: {
    headlineEn: "Pinnacle 9 — the wide world and what you leave behind",
    headlineHi: "Pinnacle 9 — vishaal duniya aur jo aapke baad bache",
    deepEn:
      "This chapter turns the face outward: legacy, institutions, public good, letting the small self go. Careers: advising at scale, public writing/teaching, social leadership, the senior-mentor seat. Work it like this: give away what you know — the more you hand to others mid-chapter, the more returns named after you come back at its end. Example: this is the chapter where the professional becomes the institution's memory everyone calls. Watch out: holding on — grudges, old titles, expired ambitions all cost more in this chapter than they pay; empty the drawers deliberately.",
    deepHi:
      "Ye chapter chehra duniya ki taraf modta hai: virasat, sanstha, lok-hit, chhota aham chhodna. Careers: bade par salah, sabke samne likhna/sikhana, samajik netritva, senior-mentor ki seat. Aise chalao: jo jaante ho, baanto — jitna chapter ke beech mein do, uske ant mein utna hi aapke naam wapas aata hai. Misaal: yahi wo chapter hai jab professional 'wahi jiski yaad sanstha hai' ban jaata hai, jise sab bulaate hain. Dhyan: pakad ke rakhna — purani dushmani, purane pad, expir ambeejo — is chapter mein utna kharch utna labh nahi; drawers khud khol ke khaali karo.",
  },
};

export const CHALLENGE_DEEP: Record<number, DeepEssay> = {
  0: {
    headlineEn: "Challenge 0 — the free and the fearsome: all choices open",
    headlineHi: "Challenge 0 — sab khula, sab aapki marzi",
    deepEn:
      "Zero gives no fixed test — it hands you every choice at once, which is its own trap: nothing external forces growth, so most people drift and call it freedom. Work it like this: choose your own two disciplines and post them where you see them daily; zero periods reward the self-made syllabus. Example: the person who picks 'one skill + one health habit' for this whole period walks out sharper than periods with harder tests. Watch out: no teacher, no deadline — mark your own attendance weekly.",
    deepHi:
      "Shunya ko koi pakka imtihaan nahi — woh sabhi vikalp ek saath deta hai, aur yehi jaal hai: bahar se koi growth zabardasti nahi, isliye zyada log bha jaate hain aur azaadi kehte hain. Aise chalao: apne do anushasan chuno aur roz aankhon ke saamne chipkao; zero period swa-banaye syllabus ko pay karta hai. Misaal: is poore period ke liye jo 'ek hunar + ek sehat-aadat' utha leta hai, wo sakht imtihaan waale period se bhi gehra nikalta hai. Dhyan: na guru, na deadline — apni hazri har hafte khud lagao.",
  },
  1: {
    headlineEn: "Challenge 1 — the test of voice: assert without stepping on necks",
    headlineHi: "Challenge 1 — awaaz ka test: bolna, par gale par pair rakhe bina",
    deepEn:
      "This period keeps tripping your ability to stand up for yourself: either you swallow your no and others walk over you, or you push too hard and turn allies into enemies. Work it like this: practise the clean one-line no — 'ye mere hisaab mein fit nahi'; say it early and once. Example: the colleague who learns this line in this period becomes the person whose no is respected without a fight. Watch out: the pendulum — meek week followed by explosive week teaches nobody; steady voice beats loud voice in this test.",
    deepHi:
      "Ye period aapki apni vakalat baar-baar thokta hai: ya aap apna 'nahi' nigal jaate ho aur log aap par guzar jaate hain, ya itna tez dhakkate ho ki mitra virodhi ban jaate hain. Aise chalao: ek line ka saaf 'nahi' seekho — 'ye mere hisaab mein fit nahi'; pehle kaho, ek baar kaho. Misaal: jo saathi ye line is period mein seekh leta hai, uska nahi aage se adhikar maang kar respect laata hai. Dhyan: pendulum — ek hafte bheegi billi, doosre hafte aag; is imtihaan mein shaant awaaz, tez awaaz se bhaari padti hai.",
  },
  2: {
    headlineEn: "Challenge 2 — the test of skin: taking small slights too seriously",
    headlineHi: "Challenge 2 — khaal ka test: chhoti baat ko zakhm banan a",
    deepEn:
      "This period sharpens your sensitivity until small slights bleed big: a tone in a call, a delayed reply, a seat in a meeting. The growth is thickening the skin WITHOUT hardening the heart. Work it like this: before reacting to any slight, ask 'kaunsa kaam iska jawab hai?' — none in 90% of cases. Example: the professional who stops scoring every meeting learns that the table's silence was never about them. Watch out: reading rejection into neutral events — not every short reply is a message; the period literally rehearses misreading.",
    deepHi:
      "Ye period aapki samvedana ko itna tez karta hai ki chhoti baat khoon kar deti hai: call ka lehja, late jawab, meeting ki seat. Vridhi: khaal mota karna, bin dil saksa kar ke. Aise chalao: kisi bhi baat pe re-act se pehle poochho — 'iska jawab kaunsa kaam dein?' — 90% mein jawab: koi nahi. Misaal: jo professional har meeting ka score karna band karta hai, usko dikhta hai ki table ka chup hon usse juri hi nahi tha. Dhyan: bina-buniyaad rejection padhna — har chhota reply sandesh nahi; ye period galat-padhnayi ki rehearsal karwata hai.",
  },
  3: {
    headlineEn: "Challenge 3 — the test of finishing what you start saying",
    headlineHi: "Challenge 3 — jo shuru karte ho, poora bolna",
    deepEn:
      "This period scatters your expression: many starts, five projects half-spoken, none landing. The growth is completing — one piece of work, one conversation, one piece of writing — visibly finished. Work it like this: the rule of one: one thing shipped out per week, however small. Example: the ten-article starter who picks one article and finishes it becomes the author in this period. Watch out: self-criticism stalling the pen — first drafts are supposed to be ugly; ship them anyway.",
    deepHi:
      "Ye period aapki bayani bikherti hai: bahut shuruat, paanch adhure project, kuch bhi dhanka nahi. Vridhi: poora karna — ek kaam, ek baat-cheet, ek likhai — aankhon ke saamne khatam. Aise chalao: ek ka niyam — hafte mein ek cheez ship karo, chhoti hi sahi. Misaal: das-article-shuru-karne wala is period mein ek article chun ke poora karta hai aur author ban jaata hai. Dhyan: aatm-aalochana kalam rok deti hai — pehle draft badsurat hote hi hain; phir bhi bhejo.",
  },
  4: {
    headlineEn: "Challenge 4 — the test of the boring middle",
    headlineHi: "Challenge 4 — bore beech ka test",
    deepEn:
      "This period tests whether you can work the unglamorous middle: systems, receipts, order, the third month of every regime, where nothing shines and everything decisive lives. Work it like this: make the middle beautiful — clean desk, clean ledger, clean sleep; the results arrive at the chapter's end, not its middle. Example: the manager who files every receipt in this period finds the audit passing itself later. Watch out: rebelling against method exactly when method starts working — do not change the routine in week nine; that is the test talking.",
    deepHi:
      "Ye period check karta hai — chamak-heen beech ka kaam kar sakta ho? system, rasid, tarteeb, har routine ka teesra mahina — jahan kuch nahi chamakta aur sab faisla hota hai. Aise chalao: beech ko sundar banao — saaf desk, saaf hisaab, saaf neend; result chapter ke ant mein aata hai, beech mein nahi. Misaal: jo manager is period mein har rasid file karta hai, uska audit baad mein khud pass hota hai. Dhyan: method se baghawat — theek jab method kaam karne lagta hai; navmein hafte mein routine mat badlo — ye imtihaan bolta hai.",
  },
  5: {
    headlineEn: "Challenge 5 — the test of handles: freedom without self-control",
    headlineHi: "Challenge 5 — handle ka test: bina patti ki azaadi",
    deepEn:
      "This period tempts you with many doors and tests whether you can keep hold of the steering: excess in spend, drink, promises, opinions. The growth is freedom WITH handles — enjoy the wide lane with two hands on the wheel. Work it like this: pre-commit limits (the drink rule, the spend ceiling, the yes-quota) before the week starts, not during. Example: the person who decided 'weekdays dry' in this period keeps every other freedom intact — handles don't shrink the road, they keep you on it. Watch out: chasing everything until nothing compound.",
    deepHi:
      "Ye period kai darwaaze khol ke dekhta hai — steering pakad sakte ho? kharch mein ati, daru mein ati, waade mein ati, rai mein ati. Vridhi: azaadi HANDLE ke saath — chaudi lane pe maza, par dono haath wheel par. Aise chalao: hafte shuru hone se pehle limit chun lo (daru-rule, kharch-ceilng, haan-quota), week ke dauran nahi. Misaal: is period mein jo 'weekday dry' chun leta hai, baaki sab azaadiyo ko poora bhaanpan nahi — handle road chhota nahi karte, road par rakhte hain. Dhyan: sab ki bheed — kuch compound nahi hota.",
  },
  6: {
    headlineEn: "Challenge 6 — the test of carrying without controlling",
    headlineHi: "Challenge 6 — uthana, par sab sambhalte na jaana",
    deepEn:
      "This period hands you more people to care for and immediately tests whether care turns into control: advising becomes ordering, help becomes score-keeping. The growth is generous service without strings; let people live even when you pay for their roof. Work it like this: help once, silently, then drop the receipt — no reminders. Example: the parent who funds the child's plan without weekly audits gets the child's trust and the plan's success both. Watch out: martyrdom at home — the 'main hi sab karoon' tone converts love into debt; say what you need too.",
    deepHi:
      "Ye period aapko zyada log uthata deta hai aur turant check karta hai — khayal, control banta hai? salah hukum ban jaati hai, madad bahi-baant ban jaati hai. Vridhi: bina shaart seva — log jeeyein, chahe chhat aapke paise se bane. Aise chalao: ek baar madad karo, chupchaap, phir rasid girao — reminder nahi. Misaal: jo maan apne bachhe ka plan bina roz-audit fund karta hai, usko bachhe ka bharosa bhi milta hai aur plan ki kamyabi bhi. Dhyan: ghar mein mahaanta ka tone — 'main hi sab karoon' prem ko rin bana deta hai; aapki zaroorat bhi bolo.",
  },
  7: {
    headlineEn: "Challenge 7 — the test of trust against the inner lawyer",
    headlineHi: "Challenge 7 — shak ka vakil jeetna",
    deepEn:
      "This period hands everyone a defence attorney inside your head: every kindness gets cross-examined, every silence gets read as verdict. The growth is practising trust as a DAILY ACT, not as a feeling: extend one open-card offer a week. Work it like this: when the inner lawyer speaks, ask for the one piece of evidence that would prove the bad theory — it rarely exists. Example: the manager who assumes the late report means overload (not disrespect) keeps the team intact through this period. Watch out: withdrawing into the mind-trial — three people you cut off early in this period were probably innocent.",
    deepHi:
      "Ye period sabke sir mein vakil bitha deta hai: har ehmaani aankhon ke saamne cross hai, har chup kaunsi saza hai. Vridhi: bharosa MESHOSOOS nahi, roz ka KAM ho — hafte mein ek khul-card offer do. Aise chalao: jab andar ka vakil bole, poochho — 'bura saabit karne ke liye kaunsa pramaan chahiye?' — wo aksar hota hi nahi. Misaal: jo manager late report ko bhari hui team samajhta hai (bina apmaan) is period me team ko waisa hi sambhal ke rakhta hai. Dhyan: dimaag ke muqadme mein ghus jaana — is period mein jin teeno ko aap jaldi kaat gaye, wo sab jaan-bujh ke kar rahe the ya nahi — aap ne dhyan hi nahi diya.",
  },
  8: {
    headlineEn: "Challenge 8 — the test of money's grip: power without clench",
    headlineHi: "Challenge 8 — paise ki pakad ka test: taakat bin murdaar bhinchn",
    deepEn:
      "This period tests your relationship with power and money: either you chase both anxiously and lose dignity in the chasing, or you fear them and refuse your own due. The growth is the firm open hand. Work it like this: negotiate hard for your worth ONCE in this period — then rest; price your work at the respectful number and stop apologising. Example: the professional who asks for the salary bump in this period learns the ask WAS the test. Watch out: measuring self-worth in the wrong currency — a body that sleeps and a family that laughs is also a balance sheet.",
    deepHi:
      "Ye period aapka paise-taakat ke saath rishta aazmaata hai: dono pareshani se bhaagte ho aur bhaagte mein laaj daav par lagti hai, ya dono se dar ke apna haq thukrate ho. Vridhi: pakki khuli muthi. Aise chalao: is period mein apne daam par sakht mol-bhav EK baar karo — phir aaram; respectful number par apna kaam rakho aur maafi band. Misaal: is period mein salary baare mein jo poochta hai, seekhta hai ki poochna HI imtihaan tha. Dhyan: apne aap ko galat currency mein naapna — neend leta badan, hansta parivaar — ye bhi balance-sheet hai.",
  },
  9: {
    headlineEn: "Challenge 9 — the test of dropping the old keys",
    headlineHi: "Challenge 9 — purani chabiyan chhodne ka test",
    deepEn:
      "This period keeps asking you to let go: old titles, old grudges, expired ambitions, and people whose role in your story is over. You may have to leave before the door closes, and that is the uncomfortable part. Work it like this: write the release list — things you keep only because they are heavy; empty one item per month. Example: the executive who stops chasing the title he missed walks into the role he actually owns. Watch out: bitterness compounding — resentment in this period is interest-free for it, and it charges you daily.",
    deepHi:
      "Ye period baar-baar chhodne ko kehta hai: purane pad, purani kharcheeri, expired sapne, aur wo log jinka role aapki story mein khatam ho chuka. Darwaza band hone se pehle chhodna padta hai — yehi takleef wala hissa hai. Aise chalao: release-list likho — wo cheezein jo sirf isliye rakhi hain kyunki bhaari hain; mahine mein ek item khaali karo. Misaal: jo executive apne chhouka pad ko bhaagne band karta hai, wo asli role mein chala jaata hai jo uska tha hi. Dhyan: kadwaahat ka byaaj — is period mein nafrat par byaaj nahi milta, roz khaat hai aapko.",
  },
};

/** Shorthand getters for the cycles section. */
export function pinnacleDeep(n: number, lang: "en" | "hi") {
  const d = PINNACLE_DEEP[n] ?? PINNACLE_DEEP[1];
  return lang === "hi" ? d.deepHi : d.deepEn;
}
export function pinnacleHeadline(n: number, lang: "en" | "hi") {
  const d = PINNACLE_DEEP[n] ?? PINNACLE_DEEP[1];
  return lang === "hi" ? d.headlineHi : d.headlineEn;
}
export function challengeDeep(n: number, lang: "en" | "hi") {
  const d = CHALLENGE_DEEP[n] ?? CHALLENGE_DEEP[0];
  return lang === "hi" ? d.deepHi : d.deepEn;
}
export function challengeHeadline(n: number, lang: "en" | "hi") {
  const d = CHALLENGE_DEEP[n] ?? CHALLENGE_DEEP[0];
  return lang === "hi" ? d.headlineHi : d.headlineEn;
}
