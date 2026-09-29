/**
 * v4.1 LOSHU DEPTH ENGINE (owner: "one liner explanation about loshu grid and
 * planes is waste... can be improvised 10x" + "every prediction outcome needs
 * to be elaborated in depth").
 *
 * Count-aware plane/diagonal essays: the SAME plane reads differently with
 * 0/1/2/3 digits present, and differently again depending on WHICH digits
 * fill it. Each deep block: (1) what the state means, (2) how it shows in
 * work/money/relationships, (3) one concrete example, (4) the watch-out +
 * upay. Bilingual, spoken-simple EN / spoken Hinglish HI.
 * Banned filler words per engine rule: 'theme', 'may suggest', 'consider'.
 */

export type PlaneKey = "thought" | "emotion" | "action";
export type DiagKey = "golden" | "spiritual";

export interface DeepBlock {
  headEn: string; headHi: string;
  bodyEn: string; bodyHi: string;
  upayEn: string; upayHi: string;
}

/* ------------------------------------------------------------------ */
/* PLANES — 3×4 state matrix (complete-3 / double-2 / single-1 / empty-0) */
/* ------------------------------------------------------------------ */

const PLANE_STATE_DEEP: Record<PlaneKey, Record<0 | 1 | 2 | 3, DeepBlock>> = {
  thought: {
    0: {
      headEn: "Mind plane empty (no 4, no 9, no 2)",
      headHi: "man-tal khaali (4 nahi, 9 nahi, 2 nahi)",
      bodyEn:
        "No planning digit on the thinking row — this is a do-first mind: decisions arrive in the body before the notebook. In work it shows as brilliant improvisation and weak follow-through on paper; money slips where planning was required; relationships read your bluntness as temper occasionally. Nothing here is a ceiling — the school's reading is that this person thinks WITH their hands, not in theory. Example: the shop-owner who never wrote an accounts book yet always knows stock, credit and profit in his head — until scale kills the memory game.",
      bodyHi:
        "man-tal ke teen ankon mein ek bhi ank nahi — ye kaam-pehle dimaag hai: faisle kitaab se pehle jism mein aate hain. Kaam mein yehi dikhta hai: shandaar jugaad, kamzor paperwork; paisa wahan phisalta hai jahan planning chahiye thi; rishton mein aapki seedhi zubaan kabhi gussa lagti hai. Koi chhat nahi — school ka vachan: ye insaan sochta haathon se, theory se nahi. Misaal: wo dukaandaar jo kabhi bahi-khata nahi likhta, par stock, udhaar, faayda sab sar mein tikka hai — scale badhne tak.",
      upayEn:
        "One page of written plan weekly (Sunday 20 minutes); big money decisions sleep for one night before signing; say the soft sentence before the strong one.",
      upayHi:
        "har hafte ek page likhit plan (Ravivaar 20 minute); bada paisa-faisla raat bhar soch ke sign; pehle naram line, phir tez line.",
    },
    1: {
      headEn: "Mind plane thin — one thinking digit stands alone",
      headHi: "man-tal patla — sirf ek ank soch sambhalta hai",
      bodyEn:
        "A single digit carries the whole thinking row, so the mind runs a narrow lane excellently and stalls outside it. If it is 4 — the planner: strong on systems, weak on big-picture imagination. If 2 — the feeler: instincts about people are accurate; sequencing tasks is the struggle. If 9 — the visionary: ideas burn bright; the middle details blur. Work and money reward the lane and punish the detours. Example: the analyst who can build any spreadsheet but freezes when asked to 'think strategy' — one muscle, no gym.",
      bodyHi:
        "man-tal ka poora bojh ek ank kandhe par: ek lane mein dimaag kamaal ka, uske bahar atak jaata hai. 4 ho to planner — system mast, imagination patli. 2 ho to feeler — logo ka jaanch sahi, kaam ka tarteeb mushkil. 9 ho to visionary — idea chamakte hain, beech ke details dhundhli. Kaam aur paisa us lane ko pay karte hain, mod par saza. Misaal: wo vishleshan-ki jo bhi spreadsheet bana leta hai par 'strategy soch' pe jam jaata hai — ek muscle, na akhada.",
      upayEn:
        "Borrow the missing muscles: a planning partner (4), a listener-coach (2) or an ideas editor (9); write decisions in 3 lines before acting.",
      upayHi:
        "gayab muscle udhaar lo: planner-mitra (4), sunne-wala coach (2) ya idea-editor (9); faisla se pehle 3 line likh lo.",
    },
    2: {
      headEn: "Mind plane warm — two of the three thinking digits sit",
      headHi: "man-tal garm — teen mein do baithe hain",
      bodyEn:
        "Two digits on the thought row: the mind works real machinery — planning plus instinct, or instinct plus vision. The empty digit names the blind spot: missing 4 = execution timelines drift; missing 2 = people-signal gets misread under stress; missing 9 = the horizon shortens to weeks. Work shows as reliable analysis with one recurring gap; money follows when the blind spot is delegated, stumbles when ignored. Example: the freelancer whose plans (4) and gut (2) run superbly but who keeps underpricing because the 9-vision of 'who I serve big' never got written.",
      bodyHi:
        "do ankon ka man-tal: dimaag ki asli machine chalti hai — plan + jhunjhuna, ya jhunjhuna + nazar. Jo ank gayab, wohi dhundhla punkt: 4 gayab = timeline bikhar jaata; 2 gayab = pressure mein log galat padhe jaate; 9 gayab = door ki nazar hafton mein simat jaati. Kaam pakka vishleshan + ek baar-baar gap; paisa tab aata hai jab gap delegate kiya jaaye. Misaal: wo freelancer jiske paas plan (4) aur jhunjhuna (2) hai par 'bada client kaun' ka likha 9 nahi — isliye kam rate maangta rehta hai.",
      upayEn:
        "The empty digit gets a written workaround: missing 4 → shared calendar with reminders; missing 2 → decide people-matters only after a night; missing 9 → 5-year goal pinned above the desk.",
      upayHi:
        "gayab ank ka likha ilaaj: 4 gayab → calendar + reminder share; 2 gayab → logo ke faisle raat bhar ke baad; 9 gayab → 5-saal ka lakshya desk ke upar chipka.",
    },
    3: {
      headEn: "Mind plane complete (4-9-2 all present) — the strategist's crown",
      headHi: "man-tal poora (4-9-2 sab) — raashtanetra ka taaj",
      bodyEn:
        "The full thinking row: plan (4) + vision (9) + people-read (2) all firing. This is the chart of long games — the person who can hold strategy in the head, adjust with the room, and still keep the schedule. Work: consult, lead, architect — the world pays extra for complete-thinkers. Money: the plan-first habit quietly compounds. Relationships: you read people early and long. Example: the bank branch head who reads both the balance-sheet (4) and the regional politics (2) while keeping the 5-year target (9) pinned — such charts run the district. Watch out: overthinking — three open plans with zero execution is this chart's only real failure mode.",
      bodyHi:
        "poora man-tal: plan (4) + nazar (9) + logon-parai (2) — teeno chalti hain. Ye lambe-game ka chart hai: sir mein strategy, room ke hisaab se adjust, tarteeb bhi. Kaam: salah, netritva, architecture — poora-sochne wale ko duniya dugna deti hai. Paisa: plan-pehle ki aadat chupchaap compounding karti hai. Rishte: log ko jaldi aur door tak padhte ho. Misaal: wo branch-head jo balance-sheet (4) aur politics (2) dono padhta hai aur 5-saal ka target (9) taana rakhta hai — aise chat district chalate hain. Dhyan: atyaadhik sochna — teen khule plan aur zero kaam is chart ki asli fail hi hai.",
      upayEn:
        "Your upay is subtraction, not addition: ship one plan per week — the crown only pays when worn into the field.",
      upayHi:
        "aapka upay jodna nahi, ghataana hai: har hafte ek plan AMAL karo — taaj wahin chamakta hai jab maidan mein pehna jaaye.",
    },
  },
  emotion: {
    0: {
      headEn: "Emotion plane empty (no 3, no 5, no 7)",
      headHi: "bhav-tal khaali (3 nahi, 5 nahi, 7 nahi)",
      bodyEn:
        "The feeling row sits bare: expression of the heart stays rationed — affection, apology and 'I trust you' all queue behind work. People with this grid love deeply and say it late; colleagues experience them as stiff, family experiences them as missing words. Money side: emotional distance actually helps negotiating. Example: the father who transfers school fees before dawn but has not said 'proud of you' in a decade — love in logistics, not in language.",
      bodyHi:
        "bhav-tal ke teen ankon mein kuch nahi: dil ki baat keema-ghar jaisi — mohabbat, maafi, 'bharosa hai tujh par' — sab kaam ke peechhe khadi. Aise log gehra pyaar karte hain aur der se bolte hain; office mein sakht, ghar mein shabd-kehte kam dikhte hain. Paisa side: bhaav ki doori mol-bhav mein madad karti hai. Misaal: wo pita jo faaj ke paise subah-subah bhej deta hai par 'proud of you' das saal se nahi bola — mohabbat shabdon mein nahi, logistics mein.",
      upayEn:
        "One spoken sentence of feeling per day (call the kids, name the feeling); write the harder ones down and hand them over — the plane opens through reps.",
      upayHi:
        "roz ek bol-ki-hui bhaav wali line (bachhon ko call, bhaav naam se bolo); mushkil waali likh ke thaal do — baar-baar karte-karte tal khulta hai.",
    },
    1: {
      headEn: "Emotion plane thin — one digit speaks for the heart",
      headHi: "bhav-tal patla — ek ank dil ka vakil",
      bodyEn:
        "Single-digit feeling row: the emotional vocabulary is one instrument played honestly. 3 alone = joy and ideas express; sorrow doesn't. 5 alone = charm flows; depth hides. 7 alone = depth flows; charm hides. Work: teams follow the warmth but never feel known; close friendships stay at two. Example: the team lead whose Friday pizza is legendary and whose Friday conversations never go past cricket — the team loves him and knows nothing about his actual life.",
      bodyHi:
        "ek ank ka bhav-tal: jazbaat ki bhasha ek hi saaz hai, sachchi bajti hai. Sirf 3 = khushi aur idea bolte hain, dukh nahi. Sirf 5 = chaap-log bolte hain, gehraai chhupi. Sirf 7 = gehraai bolti hai, chaap chhupi. Kaam: team tumhare sath rehti hai par 'jaana hua' kabhi nahi; gehre dost do par se zyada nahi. Misaal: wo lead jiska Friday pizza khaas hai par Friday ki baat-cricket se aage nahi — team dil se maanti hai, asli zindagi se khabar nahi.",
      upayEn:
        "Instrument #2 gets practice: write one paragraph monthly about what the year actually felt like — that paragraph is the second instrument learning to play.",
      upayHi:
        "doosra saaz seekho: mahine mein ek para aapke saal ki asli bhaav ke baare — wahi para doosra saaz hai jo sur mein aayega.",
    },
    2: {
      headEn: "Emotion plane balanced — two expressions available, one withheld",
      headHi: "bhav-tal santulit — do bhaav bolte hain, ek chup",
      bodyEn:
        "Two of joy (3), adapt (5), depth (7): the heart has range. The missing one is the specific gap — no 3 = celebration gets skipped ('work first'); no 5 = adaptation to new people costs effort; no 7 = the deep one-to-one talk keeps slipping quarter to quarter. Relationships here are good and improvable, which is the good news — the plane is one skill away from complete. Example: the manager who praises (3) and listens (5) but never shares his own doubts (7) — his team would die for him and still can't go deep with him.",
      bodyHi:
        "khushi (3), jhukav (5), gehraai (7) mein do milte hain: dil ki range hai. Jo gayab wohi gap — 3 nahi = jashn skip ho jaata ('kaam pehle'); 5 nahi = naye logon se milna mehnat lagti; 7 nahi = ek-ke-ek gehri baat har quarter tal jaati. Rishte achhe aur sudharne-layak hain — ek kadam door hi poora tal hai. Misaal: wo boss jo tareef (3) karta hai aur sunta (5) hai par apne shak kabhi nahi batata (7) — team uske liye jaan deti hai aur phir bhi uske gehra jaana nahi.",
      upayEn:
        "Feed the missing digit: no 3 → schedule celebrations like meetings; no 5 → one new-person coffee each fortnight; no 7 → one honest one-to-one per month, no phones.",
        upayHi:
        "gayab ank ko khilao: 3 gayab → jashn ko meeting ki tarah diary mein rakho; 5 gayab → pakhwaade mein ek nayi-mulaakat ki chai; 7 gayab → mahine mein ek sach wali ekaant-baat, phone band.",
    },
    3: {
      headEn: "Emotion plane complete (3-5-7) — the magnetic heart",
      headHi: "bhav-tal poora (3-5-7) — chumbak dil",
      bodyEn:
        "The complete feeling row: joy, adaptation and depth all present — people meet this chart and remember it for years. Rooms warm up, clients open, strangers become friends. Careers in people-facing work (sales, teaching, healing, leadership) compound unusually here. Money flows through goodwill — the network is the net-worth line of this chart. Example: the relationship manager whose clients bring their children's weddings to plan — 3-5-7 in the feeling row, and the ledger never sleeps. Watch out: absorbing everyone's weather — this heart catches storms meant for others; boundaries are the roof, build them early.",
      bodyHi:
        "poora bhav-tal: khushi, jhukav, gehraai — teeno haazir. Aise chart se jo bhi milta hai, saal baad bhi yaad hai. Kamre garm ho jaate, client khulte, ajanabi dost ban jaate. Logon-se-judne wale careers (sales, sikhana, rahat, netritva) yahan khaas byaaj dete hain. Paisa subah-khair se bahaata — network hi net-worth hai. Misaal: wo RM jiske client apne bachhon ki shaadi ke liye aate hain — bhav-tal mein 3-5-7, aur bahi-khata soti nahi. Dhyan: sabka mausam utha lena — ye dil doosron ke toofan pakad leta; seema chhat hai, pehle banao.",
      upayEn:
        "Say no with the same warmth you say yes — the complete heart needs a gate, not a wall.",
      upayHi:
        "nahi bhi usi garmi se bolo jitni garmi se haan — poore dil ko darwaza chahiye, deewaar nahi.",
    },
  },
  action: {
    0: {
      headEn: "Action plane empty (no 8, no 1, no 6)",
      headHi: "karm-tal khaali (8 nahi, 1 nahi, 6 nahi)",
      bodyEn:
        "The work row bare: starting and finishing on the physical plane is not the native muscle — dreams and drafts live, deadlines starve. Jobs with hard daily quotas grind; jobs with freedom bloom. Money: income plans exist, collection calls also exist. Example: the writer with forty brilliant drafts and one published post — the talent is real, the plane is empty.",
      bodyHi:
        "karm-tal khaali: shuru karna aur poora karna jism ki tal par asli gaand mein nahi — sapne aur draft jeete hain, deadline bhookhi rehti hai. Roz ke sakht quote waale naukri pissti hain, azaadi wali chamakti hai. Paisa: aay ka plan hai, collection ki call bhi. Misaal: wo lekhak jiske paas chaalis shandaar draft aur ek chhapi hui post — talent asli, tal khaali.",
      upayEn:
        "External structure replaces internal one: fixed start-time, body-double sessions, one task-finished-before-lunch rule — the plane fills through borrowed rails.",
      upayHi:
        "bahar ka system andar ki jagah: pakka shuru-samay, saath-baitne wale sessions, dopahar se pehle ek kaam khatam ka niyam — udhaar ki Patri par hi tal bharta hai.",
    },
    1: {
      headEn: "Action plane thin — one worker digit carries all labour",
      headHi: "karm-tal patla — ek hi ank mehnat uthata hai",
      bodyEn:
        "One digit does all the doing. 8 alone = the machine-operator: relentless work, weak start (1) and weak finish-flourish (6). 1 alone = the starter: ignition strong, grinding (8) and closing (6) leak. 6 alone = the finisher: polish and care superb, ignition weak. The person is known for exactly one verb. Money reflects the single verb. Example: the developer who starts five side-projects beautifully (1) and maintains zero (8) — market rewards the finish, not the ignition count.",
      bodyHi:
        "ek ank karta hai sab kaam. Sirf 8 = machine-chalak: kaam laambaa, shuru (1) phisalti, aakhri chamak (6) adhuri. Sirf 1 = aag-lagaak: shuru shandaar, ghisai (8) aur closure (6) mein leak. Sirf 6 = poorak karne wala: polish keval shaandaar, aarambh kamzor. Insaan ek hi shabd se jana jaata hai. Paisa usi shabd ka hota hai. Misaal: jo developer paanch side-projects shaandaar shuru karta hai (1) aur ek bhi sambhalta nahi (8) — bazaar ko chahiye khatam hona, shuruon ki ginti nahi.",
      upayEn:
        "Pair with the opposite verb: starters hire/pair finishers; finishers get a starting partner; operators get a boss who orders them to begin.",
      upayHi:
        "ulti-kaam wale ke saath judo: shuru-karne wala poora-karne wala le/jude; poora karne wala shuru-mitra le; machine-wala aisa senior rakhe jo shuru karne ka order de.",
    },
    2: {
      headEn: "Action plane strong — two verbs available, one missing",
      headHi: "karm-tal balwan — do kaam bolte hain, ek chup",
      bodyEn:
        "Two of start (1), grind (8), close (6). The missing verb is the leak: no 1 = starts wait for perfect conditions; no 8 = mid-project energy collapses; no 6 = the last 10% drags forever. Careers run well with one structural patch. Money arrives when the leak is plugged. Example: the consultant who starts (1) and closes (6) superbly but burns out mid-project every quarter (8) — revenue is fine until the third month of every engagement.",
      bodyHi:
        "shuru (1), ghisai (8), thakaan-band (6) mein do. Jo gayab wohi leak: 1 nahi = shuru perfect-haal ka intezaar karti; 8 nahi = project ke beech mein taaqat girti; 6 nahi = aakhri 10% hamesha latakti. Careers ek structural-jeeyada ke saath achhe chalte hain. Paisa leak band hote hi aata hai. Misaal: wo consultant jo shuru (1) aur samadhan (6) ka maahir par har teesre mahine bhashm (8) — revenue theek jab tak har project ka teesra mahina na aaye.",
      upayEn:
        "Plug the missing verb structurally: no 1 → 10-minute start rule; no 8 → split projects into 2-week sprints with a witness; no 6 → ship on the deadline even at 90%.",
      upayHi:
        "gayab verb ko dhaancha se dhaapo: 1 gayab → 10-minute-shuru niyam; 8 gayab → har project ko 2-hafte ke sprint mein baanto, kisi ko dekhna; 6 gayab → deadline par ship, 90% par bhi.",
    },
    3: {
      headEn: "Action plane complete (8-1-6) — the empire-builder's spine",
      headHi: "karm-tal poora (8-1-6) — samrajya-banane ki reedh",
      bodyEn:
        "The complete work row: ignite (1), iterate (8), deliver (6). This chart finishes what it starts and starts what matters — the rarest of the three complete planes and the engine of every 'how did he do all that' story. Work: operations, entrepreneurship, institution-building pay heavily. Money: machines of income stack quietly. Example: the businessman who opens the store (1), runs it for years (8), and hands it to a manager running it identically (6) — then opens the next one. Watch out: working alone too long — this spine carries others only when it finally learns to delegate; solo-holding caps the very empire it builds.",
      bodyHi:
        "poora karm-tal: aag (1), dhun (8), pahunch (6). Ye chart jo shuru karta hai wo khatam karta hai aur jo zaroori hai wo shuru karta hai — teen poore talon mein sabse durlabh, har 'ye banda ne sab kaise kiya' ki kahani ka enjin. Kaam: operations, dhanda, sanstha-baazi bhaari deti hai. Paisa: aay ki machine chupchaap jamaa hoti jaati. Misaal: jo vyapari dukaan kholta (1), saal-tak chalata (8), phir manager ko ke raasta deta (6) — aur agla kholta. Dhyan: der tak akele chalna — ye reedh tabhi doosron uthati hai jab dena seekhta; akela-sab khud rakhne mein wahi samrajya apni chaukhat pe ruk jaati hai.",
      upayEn:
        "Delegate one empire-layer per year — the complete plane is meant to run kingdoms, not solo shifts.",
      upayHi:
        "har saal ek empire-layer kisi aur ko do — poora karm-tal sark chalane ko bana hai, akele-pahar ke liye nahi.",
    },
  },
};

/* ------------------------------------------------------------------ */
/* DIAGONALS                                                           */
/* ------------------------------------------------------------------ */

const DIAG_DEEP: Record<DiagKey, Record<"open"|"full", DeepBlock>> = {
  golden: {
    open: {
      headEn: "Golden diagonal (2-4-8) open — the wealth-lane is unbuilt",
      headHi: "sunheri vikaas-rekha (2-4-8) khuli — dhan-lane adhbani",
      bodyEn:
        "Moon (2), Rahu (4), Saturn (8) fail to link on the money diagonal, so income comes through effort rather than structure: money arrives in pulses, leaves in leaks. It is emphatically NOT poverty — it is a plumbing problem. Careers that inherit money through systems (real estate, long contracts, institutional salary + SIP) protect this chart best. Example: the trader who makes a killing in October and spends it by February — the lane needs pipes, not pace.",
      bodyHi:
        "Chandra (2), Rahu (4), Shani (8) paisa-wali vikaas-rekha par milte nahi — aay mehnat se aati hai, dhaancha se nahi: paisa jhatke se aata, chhuan se jaata. YE GHARBHI NAHI — plumbin' ki dikkat hai. Careers jahan paisa system se aaye (property, lambe contract, institutional-salary + SIP) is chart ko sabse sambhalte hain. Misaal: jo trader October mein bada banata hai aur February tak ura deta — lane ko pipes chahiye, raftaar nahi.",
      upayEn:
        "Automate the pipes: auto-SIP on salary day, no-cash weeks, and one written ledger review monthly — the golden lane builds itself once the leaks are named.",
      upayHi:
        "pipes automate karo: salary-din par auto-SIP, cash-free hafte, aur mahine mein likhit hisaab — leaks ka naam ho gaya to sunheri lane khud ban jaati hai.",
    },
    full: {
      headEn: "Golden diagonal complete (2-4-8) — wealth with structure",
      headHi: "sunheri vikaas-rekha poori (2-4-8) — dhaancha ke saath dhan",
      bodyEn:
        "Moon (2) people instinct, Rahu (4) unconventional vehicles, Saturn (8) long discipline — all three on the money diagonal: this is the classical wealth-building line. Money compounds when held long; assets accumulate without drama. Careers: investments, property, institutional finance, family-business scaling. Example: the portfolio that looks boring for six years and unrecognisable in the ninth — 2-4-8 is that curve. Watch out: Saturn's lane means slow is the REQUIREMENT — quick-exit impatience is the only way this line loses.",
      bodyHi:
        "Chandra (2) logon-parai, Rahu (4) gair-riwaayi raaste, Shani (8) lambi-dhun — paiswaali rekha par teeno: yehi shashtrath dhan-building line hai. Paisa lambe pakad par compounding; sampatti bina dhamake jamaa. Careers: invest, property, institutional-finance, family-business ka scale. Misaal: portfolio jo 6 saal udas dikhta hai aur 9ve se pehchana hi nahi jaata — 2-4-8 wahi curve hai. Dhyan: Shani ki lane mein dheemay hi RAJ hai — jaldi-mevaad mein nikalna hi is line ka ek haarna hai.",
      upayEn:
        "Feed the curve: increase the SIP by a fixed step yearly and lock the long holdings behind a written rule.",
      upayHi:
        "curve ko khilao: SIP har saal ek pakko kadam badhao aur lambe holdings ko likhit niyam ke peechhe band karo.",
    },
  },
  spiritual: {
    open: {
      headEn: "Spiritual diagonal (1-5-9) open — confidence needs feeding",
      headHi: "aatm-bal rekha (1-5-9) khuli — vishwaas ko poshan chahiye",
      bodyEn:
        "Sun (1), Mercury (5), Mars (9) don't chain on the confidence diagonal: self-doubt visits at exactly the moments the room expects certainty (first day, first pitch, first stage). The talent underneath is usually intact — the ignition line is what flickers. Careers that provide external structure (teams, rituals, coaches) steadier the flame. Example: the student who aces the mock and blanks at the viva — not ability, wiring.",
      bodyHi:
        "Surya (1), Budh (5), Mangal (9) aatm-bal waali rekha par zanjeer nahi bante: shak apne aap aata hai wahin jab kamra yaqeen maangta hai (pehla din, pehla pitch, pehla manch). Andar ka hunar aksar theek girta hai — chingari ki line hi hil karti hai. Careers jahan dhaancha bahar se mile (team, riwaaz, coach) chingari sambhalti hain. Misaal: jo student mock mein topper aur viva mein khaali — hunar nahi, wiring.",
      upayEn:
        "Confidence through reps: one small bold act daily (the call, the raised hand, the two-line post) — 100 reps reset the diagonal more than one speech ever will.",
      upayHi:
        "baar-baar karke vishwaas: roz ek chhota bada-kadam (call, haath uthana, do-line post) — 100 baar hi rekha thik karti hai, ek bhashan kabhi nahi.",
    },
    full: {
      headEn: "Spiritual diagonal complete (1-5-9) — unshakeable centre",
      headHi: "aatm-bal rekha poori (1-5-9) — na hilne wala kendra",
      bodyEn:
        "Sun (1) identity, Mercury (5) articulation, Mars (9) drive — the confidence chain links completely: this person walks into hostile rooms with settled eyes. The classical mark of leaders who don't need the room's permission. Careers: command roles, courts, negotiation, public leadership. Money follows the centre — people pay certainty's premium. Example: the surgeon who speaks twice — once before and once after everyone else — and both times, stillness. Watch out: certainty ossifying into deafness; write the dissent down anyway.",
      bodyHi:
        "Surya (1) pehchaan, Budh (5) bayani, Mangal (9) chhaap — poora vishwaas-chain juda: aisa insaan virodh ke kamre mein bhi bilkul baseerat ke saath ghusa. Klasiki nishaan: jo netritva ko kamre ki ijazat nahi chahiye. Careers: command, kachehri, sauda-mol, saamne-baith ke netritva. Paisa kendra ka par peechhe chalta — log yaqeen ki premium dete hain. Misaal: jo sarjan do baar bolta hai — sabse pehle aur sabse baad — dono baar, bilkul sthir. Dhyan: yaqeen agar bahre tak sakht ho jaaye; virodh ko phir bhi likh kar rakho.",
      upayEn:
        "Keep the stillness and carry one genuine questioner — the centre stays a centre only while it keeps listening.",
        upayHi:
        "sthirata rakho aur ek pakka sawal-maalik saath rakho — kendra tabhi kendra hai jab sunta rahe.",
    },
  },
};

/* ------------------------------------------------------------------ */
/* PUBLIC API                                                          */
/* ------------------------------------------------------------------ */

export function planeDeep(
  key: PlaneKey,
  presentCount: number,
  lang: "en" | "hi",
): { head: string; body: string; upay: string } {
  const state = (presentCount >= 3 ? 3 : presentCount) as 0 | 1 | 2 | 3;
  const d = PLANE_STATE_DEEP[key][state];
  return lang === "hi"
    ? { head: d.headHi, body: d.bodyHi, upay: d.upayHi }
    : { head: d.headEn, body: d.bodyEn, upay: d.upayEn };
}

export function diagonalDeep(
  key: DiagKey,
  complete: boolean,
  lang: "en" | "hi",
): { head: string; body: string; upay: string } {
  const d = DIAG_DEEP[key][complete ? "full" : "open"];
  return lang === "hi"
    ? { head: d.headHi, body: d.bodyHi, upay: d.upayHi }
    : { head: d.headEn, body: d.bodyEn, upay: d.upayEn };
}