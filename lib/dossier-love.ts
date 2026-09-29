/**
 * v5.3 AKASHIC DOSSIER — CHAPTER: THE LOVE BLUEPRINT (the value king).
 * Canonical spec: ~/anko-ki-maya-study/AKASHIC-DOSSIER-MASTER-SPEC.md §5 —
 * "two intertwining energy streams on sacred geometry; highest-value module".
 *
 * Engine: mulank-keyed full blueprint (love style → soulmate archetype),
 * the 5-act relationship movie (Attraction → Attachment → Conflict →
 * Transformation → Legacy) and an emotional timeline of love windows
 * (18→70+ age ranges, deterministic per mulank, marked with the window
 * holding the queried age). Bilingual spoken-simple EN / roman-Hinglish HI
 * with 'aap'. Every block interprets — never predicts (voice law);
 * validateLove() is the banned-copy + completeness gate.
 */

export interface LoveBlueprint {
  howYouLoveEn: string; howYouLoveHi: string;
  whatYouNeedEn: string; whatYouNeedHi: string;
  /** two blind spots, each a full pattern paragraph (≥20 words) */
  blindSpotsEn: string[]; blindSpotsHi: string[];
  idealPartnerEn: string; idealPartnerHi: string;
  marriageStyleEn: string; marriageStyleHi: string;
  commitmentPatternEn: string; commitmentPatternHi: string;
  emotionalNeedsEn: string; emotionalNeedsHi: string;
  communicationStyleEn: string; communicationStyleHi: string;
  breakupTriggersEn: string; breakupTriggersHi: string;
  longTermRiskEn: string; longTermRiskHi: string;
  soulmateArchetypeEn: string; soulmateArchetypeHi: string;
}

export interface MovieAct {
  /** act index 1..5 */
  act: number;
  nameEn: string; nameHi: string;
  lineEn: string; lineHi: string;
}

export interface LoveWindow {
  fromAge: number;
  toAge: number; /** 99 = open-ended "and onward" */
  themeEn: string; themeHi: string;
  gistEn: string; gistHi: string;
  basis: string; // "mulank-n arc + dasha overlap (window k)" style, interpret-only
  isCurrent: boolean;
}

export const LOVE_BY_MULANK: Record<number, LoveBlueprint> = {
  1: {
    howYouLoveEn:
      "You love like a torch-bearer: you move toward people by protecting and providing for them. Early on you learned that being useful and strong is how affection arrives, so you love in acts — carrying, deciding, sheltering — and you call a bond healthy when the person beside you stands taller because of what you did.",
    howYouLoveHi:
      "aap pyaar mein mashaal uthaane wale ho: logon ke paas aap hifazat aur kaam se pahunchte hain. pehle dinon se aapne mehsoos kiya tha ki mazboot aur kaam-ke-liye bolu mohabbat aati hai — isliye aapki mohabbat aise kaamon mein boli jaati hai jinhe aapne kisi ke liye kiya. aap jodi ko tab sehat-mand maante ho jab aapke saath wala aapki wajah se seedha khada ho.",
    whatYouNeedEn:
      "You need to be honored, not merely needed. Your love account fills when someone says out loud that what you built moved them, and when your decisions meet trust instead of audit. You also need a room of your own — a quiet hour where the crown comes off — and a partner who does not read that room as rejection.",
    whatYouNeedHi:
      "aapko izzat chahiye, sirf zarurat nahi. jab koi bol ke kahe ki aapne jo banaaya usne mere andar kuch kiya, tab aapka dil bhar jaata hai; aur jab aapke faisle par bharosa uthaaye jaata hai, audit se nahi. chaahat mein ek apna kamra bhi hai — ek shaant ghanta jahan taj utar jaata hai — aur woh saathi jisne us kamre ko doori na samjha.",
    blindSpotsEn: [
      "You can confuse command with care: the moment fear enters the relationship, your hand goes to the steering wheel. The household starts feeling run rather than held, and the person you love slowly stands smaller behind your driver's posture while you cannot see it happening.",
      "You hear questions as tests. When a partner asks where you were, you answer the accusation you imagined instead of the worry they offered — so small check-ins turn into courtrooms, and the actual ache beneath the question never gets its day in front of you.",
    ],
    blindSpotsHi: [
      "aap aadesh aur khayal ko ek maan sakte ho: jis pal rishte mein darr ghusa, aapka haath steering pe chala jaata hai. ghar ko chalaya hua mehsoos hone lagta hai — aur aapke saath wala aapki driver-wali banawat ke peeche dheere-dheere chhota hota jata hai, jo aapko dikh hi nahi paata.",
      "aap sawaalon ko imtihaan samajh lete ho. jab saathi poochta hai kahan the, aap apne mann ki banaai aarop ki jawab dete ho, unki bataai chinta ki nahi — isliye chhote poochh adalat ban jaate hain aur sawaal ke andar jo asli dard rakha hai, wo aapke saamne kabhi nahi aata.",
    ],
    idealPartnerEn:
      "The one who loves you does not stand behind you — they stand beside you, and sometimes ahead. Your kindred is a person with their own fire and their own name, who argues with your verdicts in daylight and chooses you again freely, without being managed into it. With them, being first stops being your job and becomes your joy.",
    idealPartnerHi:
      "aapse mohabbat karne wala aapke peeche nahi khada hota — aapke bagal mein, kabhi kabhi aage. aapki hum-joli us insaan mein hai jisake andar apni aag aur apna naam hai, jo din-ki-roshni mein aapke faisle par behas karta hai aur aapko phir se aazaadi se chunta hai. unke saath pehla hona aapka kaam nahi, khushi banti hai.",
    marriageStyleEn:
      "For you marriage is a shared kingdom, and you quietly grade yourself as its provider of last resort. The architecture carries one habit worth watching: decisions about money and the future stay drafted in your own head, so you feel alone in carrying what two people had never openly named together.",
    marriageStyleHi:
      "aapke liye shaadi ek sanjhi-saltaavat hai — aur aap khud ko chup-chaap uska aakhri-dawaa maante ho. is banawat mein ek aadat bhaari hai: paisa aur kal ke faisle aapke mann hi mein bane rehte hain, isliye wajah-donon-ke-hote-hue aap akele mehsoos karte hain ek aisa bojh jispe do logon ne kabhi naama likha hi nahi.",
    commitmentPatternEn:
      "Once chosen, you commit with ceremony — your word, your income and your calendar orient toward the household. You do not hedge love the way you hedge plans. Yet your commitment lives in verbs of doing; the same muscle must learn the quieter verbs: staying, admitting, resting.",
    commitmentPatternHi:
      "ek baar chun liya, to aap samaroh ke saath bandhe hote hain — aapka vaada, aapki kamai, aapka hafta sab ghar ki taraf mud jaata hai. aap mohabbat ko planon ki tarah adhoora nahi chhodte. par aapki wafaa karne ke kriya-kalpon mein zinda hai; wahi maanspeshi dheere kriyaon ko bhi seekhti hai — rukne, manne, aaram karne.",
    emotionalNeedsEn:
      "Under the armor you want to be moved by someone — to hear that your presence, not only your output, landed. You need loyalty made visible: names defended publicly and moods never weaponized. More than praise, you need a place where 'I don't know today' is a legal sentence.",
    emotionalNeedsHi:
      "zirah ke andar aap chaahte ho ki koi aapko hilaa de — ye sunne ke liye ki aapki maujoodgi ne, sirf kaam nahi, andar tak kaam kiya. aapki zarurat hai dikhne-wali wafaa: naam aam-sabha mein bachaaye jaate hain, mann-pasand hathyar nahi banta. tareef se bhi zyada chahiye ek jagah jahan 'aaj mujhe nahi pata' jaisa vaakya halal ho.",
    communicationStyleEn:
      "You speak first and process mid-sentence, so your partner keeps receiving your drafts. Directness is your gift — nobody wonders where they stand with you. The gap is speed: fast answers read as final verdicts. The phrase worth adding to your vocabulary is 'hold on — say it again, let me hear it properly.'",
    communicationStyleHi:
      "aap bolne shuru kar dete hain aur jumle ke beech sochte hain — isliye saathi ko aapke khurafe hi milte rehte hain. seedhi-baat aapki daulat hai: koi ghoom-phenker nahi baithta ki aap kaun ho. par tezi gap banati hai: jaldi di gayi jawab aakhri-faisla jaisi lagti hai. aapki zubaan mein yeh jumla judne chahiye — 'rauko — dobara bolo, dhang se sunna hai.'",
    breakupTriggersEn:
      "Public disrespect is the classic trigger: a joke at your expense in the wrong room can echo for weeks. Equally sharp is being handled — a partner who manages your moods instead of meeting them. You rarely leave when love fades; you leave the day respect does.",
    breakupTriggersHi:
      "aam sabse tez chubhan: awaam ke saamne aapka mazaak udana — galat kamre mein ek mazaaq hafte ke dinon tak goonjta hai. samaan tez hai khud-ko-sambhaalna: saathi aapke mann se milne ke bajaye usse sambhalte rahe. aap rishte tab nahi chhodte jab mohabbat mar jaati hai — tab chhodte hain jab izzat mar jaati hai.",
    longTermRiskEn:
      "The long game's quiet risk is that you can build a marriage where everyone is managed and nobody is known. The provider's pride slowly retires the lover, and the bond drifts toward a well-run company with a lonely chief executive reading its books alone at night.",
    longTermRiskHi:
      "lambe-saath ki chhupi khatra ye hai: aap aisi shaadi bana sakte ho jismein sab sambhale jaate hain aur koi jaana nahi jaata. dawaa-uthaane ki ghuroor dheere-dheere aashiq ko retire kar deta hai, aur jodi ek achhi-chalti company ban jati hai jiska thake-hue CEO raat ko akela hisaab dekhta hai.",
    soulmateArchetypeEn:
      "Your soulmate shape is the Co-Ruler — the fire that checks the crown. The person worth a lifetime argues with respect and rests with loyalty: together you build a dynasty, and apart each stays sovereign. The union worth remembering is the one where two fires light the same hall, never the one where one outshines the other.",
    soulmateArchetypeHi:
      "aapke aatma-saathi ka aakaar hai Co-Ruler — wo aag jo taj ko jaanchti hai. zindagi-bhar laayak wo insaan hai jo izzat se behas karta hai aur wafaa se aaram karta hai: saath mein aap ek khandan khade karte ho, alag mein dono azaad raajya. wo rishta yaad rahega jahan do aagon ne ek hi sabha jalaayi — jahan ek ne doosri ko chhota nahi kiya.",
  },
  2: {
    howYouLoveEn:
      "You love by weather-reading: you track the moods of a room the way sailors read the sky. Your affection is attention — the right tea remembered, the unspoken worry named gently. People feel loved by you before you say a word, because decades of quiet noticing taught you exactly what each heart wanted.",
    howYouLoveHi:
      "aap pyaar mausam-padhne se karte ho: kamre ki hawa aap pani ke jahaz-wale jaisi padhte hain. aapki mohabbat dyaan hai — sahi chai yaad rakhna, aankhe-band chinta ko dheere se naam dena. aapse log bolne se pehle pyaar mehsoos karte hain, kyunki saalon ki chup-nigrani ne aapko sikha diya ki kis dil ko kya chahiye hota hai.",
    whatYouNeedEn:
      "You need reciprocity made visible: someone who checks on you with the same precision you check on them. You need your silence treated as a doorbell, not a blank wall — a partner who knocks when you go quiet. And you need permission to take up the larger half of the bed, the talk, the week.",
    whatYouNeedHi:
      "aapko badla-badli dikhni chahiye: koi jo aapko utni hi baarik nazar se dekhe jitna aap sabko dekhte ho. aapki khamoshi ko darwaze-ki-ghanti samjha jaaye — bhaari-dewaar nahi — aisi saathi jo aap shaant hue to dastak de. aur aapko ye izazat chahiye ki bistar, baat aur hafte ka bada hissa bhi aap le sakein.",
    blindSpotsEn: [
      "You convert patience into sacrifice and then present the bill silently. The ledger of quiet accommodations grows in a drawer nobody opens, and when it finally bursts out it arrives like an ambush — the partner is blindsided by a debt they never knew was being recorded.",
      "You keep absorbing until you evaporate. Your radar is so busy tracking everyone else's weather that your own storms arrive unannounced, and the collapse looks sudden to people who never saw the years of steady rain that preceded it.",
    ],
    blindSpotsHi: [
      "aap sabr ko qurbani bana lete ho aur phir bill chupchaap pesh karte ho. chhoti-chhoti chup-sahantiyon ka khata ek tiji mein badhta hai jise koi kholta nahi — aur jab wo aakhir mein phata hai, to ghaat-laga-ne ki tarah aata hai: saathi ek aise karze se daag-daar hote hain jo kabhi likha jaana hi nahi jaanta tha.",
      "aap uthaate-uthaate ghul jaate hain. aapki radar itni busy rehti hai doosron ka mausam dekhne mein ki aapki apni aandhi bina itlaa aati hai — aur wo bhachak logon ko achanak lagta hai jo us se pade baras-saal ki tehzeeb nahi dekh paate.",
    ],
    idealPartnerEn:
      "Your ideal is a warm, decisive presence — someone who does not need you to translate yourself twice. It is a partner with clean intentions and visible effort, who says their need out loud instead of hoping you mind-read one more time. With them, your stillness is held as a gift, not taxed as a duty.",
    idealPartnerHi:
      "aapka hara-haraa saathi narm-lekin-faisle-wala hota hai — jo aapko do baar khud-ko tarjuma karne ko nahi majboor kare. ye wo insaan hai jiskin niyat saaf hai aur judaai kahaan-dikhta hai: jo apni zarur bol ke kahta hai, aapke mann-padhne ki ek aur baar ki bheekh ke roop mein nahi. unke saath aapka sukoon nazar aata hai — umeed ki daulat nahi.",
    marriageStyleEn:
      "For you marriage is a small shared government, and you are its weather ministry. You keep the emotional infrastructure running — moods forecast, guests soothed, repairs scheduled. The architecture holds a flaw: you staff this whole government alone, then wait years before applying for the promotion of actually being in it.",
    marriageStyleHi:
      "aapke liye shaadi ek chhoti sanjhi-hakoomat hai aur aap uske mausam-bibhaag ho. aap bhaavnaa-infrastrucuture chalate ho — mood ki mausam-vigyan, mehmaan ka shaant karna, marammat ka schedule. banawat mein ek dabaav rakha hai: aap yeh poora bibhaag akele chalaate ho, aur saalon tak ye na maange ki asli-baazoo mein aa jaayein.",
    commitmentPatternEn:
      "You commit slowly and completely — your fidelity is a tide, not a wave: it arrives without ceremony and keeps rising. Once inside the bond you treat anniversaries as architecture, memories as property, the partner's family as your own brief. You leave only when the silence runs out of reasons.",
    commitmentPatternHi:
      "aap dhire bandhe ho par poore — aapki wafaa ek lahar nahi, lehar hai: bina dhamake aati hai, aur badhti hi jaati hai. rishte ke andar aap saalgirahon ko buniyaad maante ho, yaadon ko jaydaad, saathi ke parivaar ko apna zimma. aap chhodte sirf tab hain jab mausam ki khaamoshi koi bahaana na rahe.",
    emotionalNeedsEn:
      "Under the calm you need to be pursued once in a while — held, coaxed, asked twice. You need someone to open what you quietly shelved. And you need safety for anger: a partner who does not flinch when the reservoir finally speaks, because rage is the only voice your load has left.",
    emotionalNeedsHi:
      "shaant-dikh ke andar aap chaahte ho ki kabhi-kabhi aapka peecha kiya jaaye — pakda jaaye, phusphausa ke poocha jaaye, do baar. aapko kisi ko chahiye jo aapne chupke se tiji mein rakha ho, use khole. aur gussa ke liye suraksha chahiye: aisa saathi jo jab bandh-paani bol pade to na jhijhke — kyunki wafa se, wafaa gusse hi aapke bojh ki aakhri ho. (kripya dhyan: ye awaaz aapko dungi, aapke saath wale ka kaam hai wo pehchaane.)",
    communicationStyleEn:
      "You speak in hints and let silence carry the verdict. Your gift is precision: your words are chosen, your feedback lands soft but exact. The gap is completeness — the second half of every message stays inside. The phrase worth adding: 'I know I said it's fine — it is not fine; let me try again.'",
    communicationStyleHi:
      "aap iishaaron mein bolte ho aur raasta ka faisla khamoshi dene deti hai. aapki daulat baariki hai: aapke shabd chin-te hain, feedback naram aata hai par seedha. gap hai poornata: har sandeshe ka doosra aadha andar hi rehta hai. yeh jumla aapki zubaan mein judne chahiye: 'maine kaha tha sab theek hai — sach mein theek nahi; ek baar phir koshish karta hoon.'",
    breakupTriggersEn:
      "The classic trigger is chronic one-sidedness — years of being the only one carrying. The sharp one is dismissiveness: a shrug over something you had quietly carried all week. You do not exit over a loud betrayal easily; you exit the day you realize you are the only one holding the walls up.",
    breakupTriggersHi:
      "aam sabse tez chubhan: saalon-ki-ek-tarfa-ta — sirf aap hi uthate rahe ho. samaan tez hai utez-pan: jo cheez aapne poore hafte chup se sahi, usko ek sansaani-phel dene. aap zor-ka-betrayal itna asani se chhod kar nahi jaate — aap us roz jaate ho jab aapko dikh jaata hai ki deewaron ko uthane wala sirf aap hi hai.",
    longTermRiskEn:
      "The long game's risk is the reservoir: twenty years of silent carrying can end in one night of unpayable arithmetic if the load never gets spoken. The marriage's infrastructure survives, but the person who ran it arrives at the harbor empty — and love built on service leaves thin bones behind.",
    longTermRiskHi:
      "lambe-saath ki khatra wahi reservoir hai: bees-saal ki chup-chaap uthai ek raat mein na-chuki-wala hisaab tak pahunch sakti hai agar bojh kabhi bol na nikla. shaadi ka infra-structure tik jaata hai, par chalane-wala bandargah tak bina-saaman pahunch jaata hai — aur seva par tiki mohabbat peechhe patli haddiyan chhod jaati hai.",
    soulmateArchetypeEn:
      "Your soulmate shape is the Steady Flame — warmth that does not need tending to burn. The one worth a lifetime is emotionally literate: they speak feelings in sentences, not weather reports. The union that will last is where your radar finally becomes optional, and your love is received the way you meant it, not the way it silently arrived.",
    soulmateArchetypeHi:
      "aapke aatma-saathi ka aakaar hai Steady Flame — aisi garmi jise jalaye rakhne ki zarurat nahi. zindagi-bhar laayak wo hai jo bhaavnaon mein vaakya bolta hai, mausam ki khabar nahi. wo jodi tikegi jahan aapki radar aakhirkar ek option ban jaaye — aur aapki mohabbat waisi milti hai jaisa aapne kaha tha, na jaise wo chup-chaap pahunchi thi.",
  },
  3: {
    howYouLoveEn:
      "You love like a storyteller in love with being understood: your affection is expression — songs sent at midnight, the joke built for one person, the essay written about someone who will never see it. You fall in love with the conversation itself, and a partner who keeps talking with you is someone you never stop choosing.",
    howYouLoveHi:
      "aap pyaar us kissa-kaho ke tarah karte ho jo samjhe-jaane ke khwaab mein doobi ho: aapki mohabbat izhaar hai — aadhi-raat ka gaana, kisi ek ke liye banaaya mazaak, us par likha lekh jo usko kabhi dikhega hi nahi. aap baat-cheet mein hi gir jaate ho, aur jo saathi dosti-baaten jaari rakhta hai, usko aap kabhi chhodte nahi.",
    whatYouNeedEn:
      "You need a witness: someone who receives your fire without converting it into a to-do list. You need play inside commitment — a marriage that stays interesting counts double for you. And you need audience without evaluation: a partner who laughs before critiquing, who hears the third idea at full volume.",
    whatYouNeedHi:
      "aapko ek gawah chahiye: koi jo aapki aag ko kaam-ki-list banaaye bina hi qabool kare. aapko commitment ke andar khel chahiye — dilchaspi-bani shaadi aap ke liye dugni ginta hai. aur aapko bina-tanqeed ke darshak chahiye: jo saathi hansta hai pehle, aur aapke teesre idea ko poori awaaz mein sunta hai.",
    blindSpotsEn: [
      "You can spend the friendship in the courtship: the same charm that won the room slowly trains it to applaud and not to engage. A partner watching the show learns to clap rather than to speak, and one evening you find you are famous inside your own house and unanswered inside it too.",
      "You mistake momentum for depth. Falling fast feels like clarity to you, but speed skips the boring floors where real love actually lives — and you sometimes build the whole wedding in your head before learning whether the person can carry a Tuesday.",
    ],
    blindSpotsHi: [
      "aap dosti ko courtship mein kharch kar sakte ho: wahi charm jisne kamra jita, dheere-dheere usko taaliyan peene ka aadat de deta hai. show-dekhne-wala saathi bolna chhod ke taali bajana seekh jaata hai — phir ek shaam aapko dikhta hai ki aap apne hi ghar mein mashhoor ho, aur us ghar mein bhi javab-heen.",
      "aap raftaar ko gehraai samajh lete ho. jaldi girna aapko saaf-manas samajh aata hai, par tezi wo bhooring manzilon ko chhod deti hai jahan asli mohabbat rehti hai — aur kabhi-kabhi aap poora vivaah dimaag mein bana lete ho, pehle hi ye jaanche bina ki wo insaan mangalwar ka bojh utha sakta hai ya nahi.",
    ],
    idealPartnerEn:
      "Your ideal partner is a curious equal — a mind that plays back, not a fan who plays along. It is someone with their own projects and their own evenings, who matches your intensity on some days and out-quiets you on others. With them the spotlight becomes a shared lamp, and the marriage keeps generating new chapters.",
    idealPartnerHi:
      "aapka hara saathi ek jijnasu-hamdard hai — wo dimaag jo palat kar jawab deta hai, wo fan jo saath-tal-mil kar chale. wo insaan hai jiske apne projects aur apni shaamein hain, jo kuch dinon aapki tez-bhadi saath deta hai aur kuch dinon aapse zyada shaant ho jaata hai. unke saath spot-light ek sanjhi lamp ban jaati hai, aur shaadi nayi-kahaniyan banati rehti hai.",
    marriageStyleEn:
      "For you marriage is a workshop with a festival inside it: plans pinned, walls repainted, guests fed, songs written. The routine parts are where you strain — bills do not rhyme, anniversaries recur without applause. You are loyal to the institution but must consciously court the calendar, not only the person.",
    marriageStyleHi:
      "aapke liye shaadi ek workshop hai jiske andar meela chhaapta hai: plan pin hue, deewaren rangeen, mehmaan bhojan-saadhu, gaane likhe. rozana-wale hisse wahan aapki aanch aati hai — bill kavi nahi karte, saalgirah bina taaliyon ke laut aati hai. aap institution ke sthir-sadasya hain, par calendar ko bhi apna chahna hai — sirf insaan nahi.",
    commitmentPatternEn:
      "You commit in chapters: full presence when inspired, quiet drift when the music stops. Fidelity is rarely your problem — focus is. Once past the third year you become remarkably permanent, but the bond needs deliberate re-naming every few years, the way a good series renews itself with the same cast.",
    commitmentPatternHi:
      "aap chapter-dar-chapter bandhe ho: jahan kavya hai wahan poori maujoodgi, jahan sangeet tham gaya wahan chupki-dhund. wafaa aapki kamzori kabhi nahi — dhyan hai. teesre-saal ke baad aap kabil-e-taajub pakke bante ho, par jodi ko har teen-chaar saal mein jaan-boojh kar navela naam dena hota hai, jaise achhi series apni-cast ke saath hi nav-jeevan leti hai.",
    emotionalNeedsEn:
      "Under the brightness you need to be seen as more than the mood-lift. You need one person who notices the tired hour behind the funny hour — and who understands that your restlessness is often grief moving too fast to sit down. Enthusiasm must be allowed to have shadows.",
    emotionalNeedsHi:
      "roshni ke neeche aap chaahte ho ki aapko sirf manau-shakti samajh na liya jaaye. ek insaan chahiye jo hasne-wale ghante ke peeche ka thaka-hua ghanta dekhe — aur samjhe ki aapki bechaini aksar woh dukh hai jo baithne se pehle hi tez chal padta hai. josh ko parchhaiyan rakhni chahiye.",
    communicationStyleEn:
      "You communicate in stories — the direct sentence only arrives after three scenes of setup. Your gift is translation: heavy truths arrive gentle and land memorable. The gap is delay: important discomforts get rehearsed into performances. The phrase worth adding: 'no bit here — this one is real, and I need you to just listen.'",
    communicationStyleHi:
      "aap qisson mein baat karte ho — seedha vaakya teen manziron ke setup ke baad aata hai. aapki daulat tarjume ki hai: bhaari sach naram pahunch kar yaadgaar bante hain. gap hai deri: zaruri-takleefein performance bana ke rehearse ho jaati hain. yeh jumla judne chahiye: 'isse koi mazaaq nahi — ye asli hai, aur bas sunt raho.'",
    breakupTriggersEn:
      "The classic trigger is the bore: a bond that stops surprising you starts feeling like a closed theatre. The sharp one is being mocked instead of enjoyed — laughter at you differs from laughter with you. You exit quietly when the conversation dies; you were never staying for the furniture.",
    breakupTriggersHi:
      "aam sabse tez chubhan: bhanvar — jodi jo hairaan karna band kar deti hai wo band-theatre jaisi lagne lagti hai. samaan tez hai mazaak-banaya-jaana: aap par hanse jaana aur aap ke saath hanse jaana mein zameen-asmaan ka farq hai. jab baat-cheet mar jaati hai aap chup-chaap nikal jaate ho; aap to kabhi furniture ke liye ruke hi nahi the.",
    longTermRiskEn:
      "The long game's risk is the un-finished shelf: half-built plans and half-kept promises accumulate until the partner lives beside a museum of beginnings. The real debt is emotional — attention spent everywhere arrives nowhere home, and the person who married your focus keeps waiting for their turn at the mic.",
    longTermRiskHi:
      "lambe-saath ki khatra adhoora-shelf hai: aadhe-bane plan aur aadhe-nibhae waade jama hote jaate hain — jab tak saathi shuruaaton ke museum ke bagal mein rehne lagta hai. asli karza bhaavnao ka hai: har jagah bitaya dhyan ghar tak kuch nahi pahunchata — aur aapke dhyan se shaadi karne wali insaan mic ki baari ka intezaar karti reh jaati hai.",
    soulmateArchetypeEn:
      "Your soulmate shape is the Woven Story — a person who can hold both your spark and your silence. The one worth a lifetime stays fascinating after the first hundred conversations, argues well, and keeps a private shelf of things they save to tell only you. Your lasting union is co-authorship, not applause.",
    soulmateArchetypeHi:
      "aapke aatma-saathi ka aakaar hai Woven Story — wo insaan jo aapki chingari aur aapki khamoshi dono utha sakta hai. zindagi-bhar laayak wo hai jo sau-baatein ke baad bhi hairan-kun rehta hai, achhi behas karta hai, aur kuch cheezein sirf aapko batane ke liye apni tijori mein rakhta hai. aapki tiki-jodi co-likhai hai — taaliyon ka shor nahi.",
  },
  4: {
    howYouLoveEn:
      "You love like an engineer: affection becomes infrastructure — the safe house, the funded school, the emergency fund nobody knows exists until it saves them. You show love by making life dependable. The partner learns that behind every boring habit of yours stands an act of care that never asked for a review.",
    howYouLoveHi:
      "aap pyaar engineer ke dhang se karte ho: mohabbat dhaancha ban jaati hai — mehfooz ghar, bhara-jaata school fee, wo emergency-fund jiska koi ko khabar nahi hoti jab tak wo bachaat nahi. aap mohabbat zindagi bharosemand banane mein bolte ho. saathi dheere-dheere seekh jaata hai ki aapki har bhoori-aadat ke peeche ek khayal rakha hua hai jo review maangta hi nahi.",
    whatYouNeedEn:
      "You need acknowledged effort: the builder's love deserves a builder's thanks. You need a partner who says 'I see what it cost you' — and you need, more than any grand gesture, small visible deposits into your life: a planned weekend, a praised meal, a future spoken about in plural.",
    whatYouNeedHi:
      "aapko mehnat-ki-pahchaan chahiye: builder ki mohabbat builder ka shukriya maangti hai. aapko wo saathi chahiye jo kahe 'mujhe dikhta hai isne aapse kya kharcha kiya' — aur aapko kisi bade gesture se zyada chahiye zindagi mein chhote dikhne-wale jama: plan-shuda weekend, tareef-ki hui daawat, bahuvachan mein boli hui aane-waali-zindagi.",
    blindSpotsEn: [
      "You can turn love into a project plan and intimacy into a schedule. The partner is received, not met: dates routed through duty, rest postponed until the list is clear. Meanwhile the list never clears, and one evening the person across the table feels less like a spouse and more like a stakeholder.",
      "You defend your method when you meant to protect your heart. Feedback about the way you love lands as an audit of your craft, so conversations about closeness turn into arguments about standards — and the original ask stays on the table, unanswered and unloved.",
    ],
    blindSpotsHi: [
      "aap mohabbat ko project-yaojana bana sakte ho aur apnapan ko schedule. saathi sulaya nahi jata — receive kiya jata hai: date zarur ke raaste se guzarti hai, aaram list-khaali hone par talat hai. par list kabhi khaali nahi hoti, aur ek shaam aapko dikhta hai ki table ke us-paar ki insaan patni jaisi nahi — stakeholder jaisi hai.",
      "aap apni vidhi ki raksha karne lagte hain jabki aap dil ki karna chahte the. aapke pyaar-ke-dhang par feedback aapke hunar ki audit jaisa lagta hai — isliye apnapan ki baatein maan-dhandhe ke bahas banti hain, aur asli-maang table par padi reh jaati hai: jawab-heen, pyaar-heen.",
    ],
    idealPartnerEn:
      "Your ideal partner is patient with the process and honest with the vision — someone who respects the scaffolding while reminding you the building is for living in, not for framing. It is a person soft enough to say 'come away from the wall now' and strong enough to hold the family if you ever sit down.",
    idealPartnerHi:
      "aapka hara saathi process ke saath sabr rakhta hai aur vision ke saath sach: jo scaffolding ki izzat kare par yaad dilaaye ki building rehne ke liye hai, dikhane ke liye nahi. wo insaan hai naram jitna kahe 'ab deewar se chhod ke aao' — aur mazboot jitna ghar ko sambhaal le agar aap kabhi baith jaayein.",
    marriageStyleEn:
      "For you marriage is the permanent house you never finish tuning — every season brings a repair, a savings goal, a policy quietly rewritten. You run the household like an institution: stable, insured, documented. The architecture holds a hollow room: feelings without a checklist have no scheduled entry.",
    marriageStyleHi:
      "aapke liye shaadi wo pakki-deewar jaisa ghar hai jise aap kabhi poora tune nahi karte — har season ek marammat, ek saving-lakshya, ek chup-chaap badli hui niyam-avali. aap ghar ko institution jaisa chalaate ho: sthir, surakhshit, jama-kharch likha hua. dhaanche mein ek khaali kamra hai: aise hissaas jinko checklist nahi, unki koi entry schedule mein nahi.",
    commitmentPatternEn:
      "You commit like a foundation: poured once, checked for decades, never poured twice. Your fidelity is structural — vows are documents to you. The cost of such stone is temperature: the bond holds any weight but can radiate cold. The pattern must add warmth as maintenance, not as exception.",
    commitmentPatternHi:
      "aap commitment neev ke dhang se karte ho: ek baar daali gayi, dashak-dar-dashak jaanchi gayi, dobara kabhi nahi. aapki wafaa dhaanchik hai — aapke liye kasmein dastavez hain. aise-patthar ki keemat temperature hai: jodi har bojh uthaati hai par thandak bikharti hai. is dhang mein garami bhi maintenance-jaisi dekhbhaal maangti hai — vishesh-avasar nahi.",
    emotionalNeedsEn:
      "Under the load-bearing exterior you need relief from standing: one place where you are allowed to be unfinished. You need your work seen, not scored — and you need affection that does not arrive as another task. A partner who says 'sit, the wall holds itself' gives you the marriage your chart planned.",
    emotionalNeedsHi:
      "bojh-uthaane-wali-biradri ke neeche aapko khade-hone se chhuti chahiye: ek jagah jahan aap adhoore hone ki izazat rakhte ho. aapko apna kaam dekha jaaye, na ke scored — aur aisi mohabbat chahiye jo doosra kaam bana kar na aaye. wo saathi jo kahe 'baith jao, deewar swayam tikti hai' — wahi jodi deti hai jo aapke chart ne sochi thi.",
    communicationStyleEn:
      "You speak in reports: facts first, feelings footnoted if at all. Your gift is reliability — your word, once given, behaves like poured concrete. The gap is emotional transparency: love arrives as logistics. The phrase worth adding: 'this is not about the plan — this is about me; stay for this part.'",
    communicationStyleHi:
      "aap report ke dhang se bolte ho: pehle tathya, hissas ek aar-paar mein, agar likhe gaye hon. aapki daulat bharosa-hi-bharosa hai — aapka shabd ek baar diya, daale gaye concrete jaisa behave karta hai. gap hai bhaavnaatmak-saaf-pan: mohabbat logistics ke roop mein aati hai. yeh jumla judne chahiye: 'yeh plan ke baare mein nahi — mere baare mein hai; is hisse ke liye ruk jao.'",
    breakupTriggersEn:
      "The classic trigger is being made replaceable: years of unseen effort, then a partner flirts with abandoning it all for 'a more exciting life'. The sharp one is chaos-proof tests passed silently — you exit the day you realize the structure was loved, never the builder.",
    breakupTriggersHi:
      "aam sabse tez chubhan: badalne-wala banaya jaana — saalon ki an-dekhi mehnat, phir saathi ka is sab ko 'zyada dilchasp zindagi' ke liye chhodne ki taraf jhukna. samaan tez hai chup-chaap imtihaan-guzara: aap us roz nikal jaate ho jab dikh jaata hai ki dhaancha pyaar kar liya gaya, banane-wala nahi.",
    longTermRiskEn:
      "The long game's risk is the inhabited blueprint: a marriage so well-managed it stops being inhabited emotionally. Rooms stay perfect because nobody breathes freely in them. The slow risk is resentment compounding as interest — the builder eventually invoices, and decades of unpaid thanks are a hard settlement.",
    longTermRiskHi:
      "lambe-saath ki khatra basa-hua-blueprint hai: aisi shaadi jo itni achhi-chali ki bhaavnaatmak-roop mein basayi hi nahi gayi. kamre perfect rehte hain kyunki koi unmein azaadi se saans nahi leta. dheemi khatra hi asli hai — na-hisab-e-kitaab mehnat karz ki tarah byaaj leta hai: banane-wale ko aakhir mein invoice deni padti hai, aur dashakon ke bina-shukriya ek mushkil hisaab ban jaata hai.",
    soulmateArchetypeEn:
      "Your soulmate shape is the Hearth-Keeper — steady hands that treasure structure without confusing it with love. The one worth a lifetime thanks the bridge while walking it, pulls you off the site occasionally, and defends your slowness to a fast world. The union that lasts is a lived house, not a finished one.",
    soulmateArchetypeHi:
      "aapke aatma-saathi ka aakaar hai Hearth-Keeper — aise saanji haath jo dhaanchi ko amaanat rakhein use mohabbat samajhe bina. zindagi-bhar laayak wo hai jo pul par chalte-chalte uska shukriya ada kare, beech-kabhi aapko site se nikaal le, aur tez-duniya ke saamne aapki dheri-vigyan ki hifazat kare. tiki-hui jodi basaya-gaya ghar hai — poora-kiya-hua nahi.",
  },
  5: {
    howYouLoveEn:
      "You love like a freedom-song: your affection is aliveness — a person who feels more themselves beside you than alone. You court with surprises, travel, questions. You are at your most faithful when the bond keeps moving; the partner who lets you stay curious is the one you quietly never leave.",
    howYouLoveHi:
      "aap pyaar azaadi-ke-gaan jaise karte ho: aapki mohabbat zinda-dili hai — aapke bagal mein wahi insaan aur bhi zyada khud ho jaata hai, akela hokar nahi. aap hairat, safar aur sawaalon se mohabbat shuru karte ho. aap wahan sabse jyada wafadaar ho jahan rishta chalta rehta hai; jo saathi aapki jignasata sehna seekh gaya, wahi wahi aap chup-chaap kabhi chhodte nahi.",
    whatYouNeedEn:
      "You need room inside the rope: a partner who offers belonging without a leash. You need novelty as maintenance — new cities, new dishes, new versions of the same old argument. And you need honesty without audit; love that asks where you were is, to your ears, the first syllable of a cage.",
    whatYouNeedHi:
      "aapko rassee ke andar kamra chahiye: wo saathi jo bandhapan de bina rashee de. aapko navachetana maintenance ke roop mein chahiye — naye shahar, naye pakwaan, purani behas ke naye roop. aur aapko bina-audit ki sachai chahiye; 'tum kahan the' puchne wala pyaar aapke kano mein qaid-ki-pehla-akshar lagta hai.",
    blindSpotsEn: [
      "You can use freedom as an anaesthetic: when intimacy deepens past the comfortable point, the calendar fills with escape valves and the partner negotiates with a ghost. Restlessness then speaks for you, and the honest sentence — 'I am scared of how much I love this' — never gets its hearing.",
      "You mistake the itch for the truth. Growth in a long bond often feels identical to being stuck, so every season four arrives the urge to begin again somewhere clean — and the hard-won depth of your current love keeps getting traded for the intoxicating shallowness of chapter one.",
    ],
    blindSpotsHi: [
      "aap azadi ko nasha bana sakte ho: jab apnapan aram-bindi se aage badhta hai, dhandha calendar bhar deta hai bhaagne-wali khidkiyon se — aur saathi tishya-shaiya se baat karta hai. bechaini phir aapki zubaan ban jaati hai, aur wahi sachchi jumla — 'mujhe dar lagta hai is mohabbat ki gehraai se' — kabhi sunai nahi deta.",
      "aap khujli ko sach samajh lete ho. lambe-rishte mein badhna aur phasa hona aapko ek jaisa mehsoos hota hai — isliye har chaar-saal par saaf-thithi pe shuru karne ki chah jaagti hai, aur aapki purani mohabbat ki kathin-gehraai har baar pehle-chapter ki tez-madhur-shaallow ka mohataaj hoti hai.",
    ],
    idealPartnerEn:
      "Your ideal partner is light on their feet and firm in their centre — a person who can say 'go, and come back' in the same breath. It is someone with their own orbit: friends, interests, an inner life that does not orbit you. Their independence keeps renewing the view; their steadiness is the home you keep returning to.",
    idealPartnerHi:
      "aapka hara saathi halke-qadmon ka aur beech-meez par tika hua hai — jo ek hi saans mein kahe 'jao, aur laut ke aao'. wo insaan hai jiski apni parikrama hai: dost, dilaaspey, andar-ki-ek-zindagi jo aapke chakkar mein nahi. unka azaadi nazara har baar naya bana deta hai; unka sanaata wo aashiyaana hai jahan aap baar-baar lautte ho.",
    marriageStyleEn:
      "For you marriage is a base-camp on a long expedition: you return, resupply, rest — and leave again knowing the tents will stand. You anchor the union through adventure, not routine, and guard its door fiercely once the person inside is finally chosen. The architecture must hold two doors: yours, and one always open.",
    marriageStyleHi:
      "aapke liye shaadi lambe-safar ka base-camp hai: aap lautte ho, bhare khatye, aaram karte ho — aur aise jaate ho ki pata hai tents khade rahenge. aap rishte ko adventure se sanjhi baandhate ho, rozane se nahi; aur agar andar-wali insaan ek baar chun liya gaya, to darwaaze ki hifazat aap aakhir-tak karte ho. dhaanche mein do darwaze sambhal ke rakhe jaane chahiye: aapka, aur ek hamesha-khula.",
    commitmentPatternEn:
      "You commit paradoxically: fiercely loyal yet structurally light, all-in on the person yet allergic to the cage. Your pattern is choosing — the vow renews through re-decisions, not through paperwork. The healthiest version adds visible reliability so the partner is not left reading tea-leaves about your staying.",
    commitmentPatternHi:
      "aap virodhabhaas mein bandhe ho: poori wafaa-lekin-halke dhaanche, insaan-pur-tar-ham-lekin qaid-se-sansaanp. aapka dhang hai chunna — vaada paperwork se nahi, dobara-faislon se naye-sir-renew hota hai. sabse swasthi baddhi: dikh-ne-wali bharosemandi jod do, warna saathi aapke rukne par chai-ki-patti padhta reh jaayega.",
    emotionalNeedsEn:
      "Under the wanderlust you need to be believed: your love reads light but lands deep, and you need one person who does not punish the packaging. You need rest from managing impressions — and one companion for whom your arrival is always an event, never an interruption.",
    emotionalNeedsHi:
      "ghumakkad-jaan ke neeche aapko vishwas chahiye: aapki mohabbat halki dikhti hai par gehri girti hai — aur ek insaan chahiye jo packaging ke peeche ki baat ko na saja de. aapko chahiye chhutti from impression-management — aur ek saathi jiske liye aapka aana hamesha utsav hai, baad-mein-baat nahi.",
    communicationStyleEn:
      "You communicate in motion — side by side in the car, mid-walk, over a plan in motion. Face-to-face pressure makes your answers contract. Your gift is lightness: heavy topics stay survivable. The gap is follow-through: the talk after the exit. The phrase worth adding: 'sit with me two more minutes — this part matters.'",
    communicationStyleHi:
      "aap motion mein baat karte ho — gaadi mein bagal-ke-nishaan, chalte-chalte, chal-rahe plan par. saamne-baithne ka dabav aapke jawab samet deta hai. aapki daulat halka-pan hai: bhaari vishay bhi sambhal-jane-wale hote hain. gap hai poorni-dekhna: raaste se nikalne ke baad ki baat. yeh jumla judne chahiye: 'mere saath do min aur baitho — yeh hissa zaroori hai.'",
    breakupTriggersEn:
      "The classic trigger is suffocation: the day the love starts requiring permission slips, your feet get restless. The sharp one is public shaming of your nature — a joke about your leaving, made loudly, by the one who claims to hold you. You go quietly, quickly, and almost never announce the door.",
    breakupTriggersHi:
      "aam sabse tez chubhan: gham — jis din mohabbat ko permission-slip maangna shuru, us din aapke pair bechain ho jaate hain. samaan tez hai aapki-fitrat ka aam-sabha-mein mazaak banaana — jo khud aapko rokta hai, 'raasta pakadna to usko khabar hai' keh ke. aap chup-chaap jaate ho, tez — aur takreeban kabhi darwaaze ki khabar nahi dete.",
    longTermRiskEn:
      "The long game's risk is the serial exit pattern: leaving just before depth arrives, so no bond grows a full spine. The quieter risk is the partner who adapts forever — trained, accommodating, worn. If movement never learns to dwell, the collection of fascinating beginnings keeps growing and home keeps waiting.",
    longTermRiskHi:
      "lambe-saath ki khatra lagtar-bhaagne ka pattern hai: gehraai pahunchne se pehle hi chhod dena — jisse har-jodi ki peeth ki hadi poori kabhi nahi banti. dheemi khatra hai wo saathi jo hamesha adapt karta hai — seekhna, sar-samarpan, thak jaana. agar chalna kabhi tikna nahi seekhta, to aap ke paas dilchasp shuruaat jama ho jaayengi aur aap ek baar bhi ghar nahi aayenge.",
    soulmateArchetypeEn:
      "Your soulmate shape is the Open Road with a Name — a person, not a place, who satisfies adventure and permanence at once. The one worth a lifetime plans expeditions and keeps one shelf unchanged for decades. Your lasting union is travel without escape: two free agents who keep choosing the same address.",
    soulmateArchetypeHi:
      "aapke aatma-saathi ka aakaar hai Open Road-With-a-Name — insaan, jagah nahi, jo ek hi saath adventure aur stirta de. zindagi-bhar laayak wo hai jo expeditions plan kare aur ek shelf dashakon tak na badle. aapki tiki jodi hai aise-yatra jo bhaag-nahi: do azaad-log jo baar-baar wahi pata chunte hain.",
  },
  6: {
    howYouLoveEn:
      "You love like a homecoming: your affection is care made physical — food cooked, crises managed, birthdays engineered. You bind people into family whether they asked to be kin or not. The partner learns quickly that your love speaks in service, and that being yours means being carried, beautifully and without invoice.",
    howYouLoveHi:
      "aap pyaar ghar-lautne ke dhang se karte ho: aapki mohabbat khayal ko shareer de deti hai — khaana pakaya, sanksaal sambhale, janamdin engineer kiye. aap logon ko parivaar bandh lete ho chahe unhone aapna hone ko na manga ho. saathi jaldi seekh jaata hai ki aapki mohabbat seva ki zubaan bolti hai — aur aapka hona matlab hota hai uthaya jaana, haseen aur bina bill.",
    whatYouNeedEn:
      "You need rest built into the love you give: a partner who insists on carrying you sometimes, not merely thanking you. You need appreciation with specifics — not 'thanks for everything', but 'that Tuesday, you saved me'. And you need one hour a week where nobody in the world calls you responsible.",
    whatYouNeedHi:
      "aapko us pyaar ke andar aaram chahiye jo aap deti ho: wo saathi jo kabhi-kabhi aapko uthaane par adaigar kare, sirf shukriya se nahi. aapko tareef ki jaeed-baari chahiye — 'sab ke liye shukriya' nahi, par 'us mangalwar ne aapne mujhe bacha liya'. auraapko hafte ke ek ghante ki zarurat hai jahan duniya aapko jitna bhi responsible nahi maanti.",
    blindSpotsEn: [
      "You can keep the peace and lose the truth: your conflict style is swallowing, smoothing, carrying both halves of a broken evening. The marriage reads calm because you pay for its calm privately — until one ordinary Tuesday the whole balance arrives, and the partner has never once seen it coming.",
      "You give rescue instead of presence. When someone you love struggles, you fix, fund and arrange — but the deeper ask, to simply witness their helplessness, never happens. They learn to hide their struggling from you, which quietly starves the intimacy the rescuing was meant to build.",
    ],
    blindSpotsHi: [
      "aap shanti rakh kar sach khote ho: aapka tanav-hal hone-dena-chupna-hai aur dono-andhe-aadhi-shaam ko uthaaney. shaadi shaant dikhti hai kyunki uski shaanti aapke andar ke hisaab se aati hai — tak ek aam mangalwar poora balance aata hai aur saathi ne ye aata dekha hi kabhi nahi.",
      "aap maujoodgi ki jagah bachao dete ho. jab aapka insaan takleep mein ho, aap theek karte ho, dhan dete ho, bandobast karte ho — par wo gehra-maangna, sirf aapki be-basi ko gawahi dena, kabhi poora nahi hota. wo dheere-dheere apni takleef aapse chhupane lagta hai, jisse wahi apnapan bhooka reh jaata hai jo bachane-wali mohabbat banana chahti thi.",
    ],
    idealPartnerEn:
      "Your ideal partner is mutually responsible: someone who carries the home without being drafted, and insists you be a person in it too — not the family's load-bearing wall. It is a person strong enough for hard weeks and gentle enough to put your medicine down and simply hold your hand.",
    idealPartnerHi:
      "aapka hara saathi mohabbat-mein-mohabbat-hai: jo ghar uthaaye bina-draft-hua ki, aur aap ko is parivaar mein ek insaan ki tarah dekhe — na ke load-bearing wall. wo insaan hai kathin-hafte ke liye mazboot aur aapki dawai neeche rakh par unke haath hi pakadne ke liye narm.",
    marriageStyleEn:
      "For you marriage is a home with an open kitchen: you cook for the marriage, host the relatives, remember every anniversary. The architecture is generous but must be kept from tipping into an institution: duty makes the house stand, but only desire keeps it alive. Your task is to keep the romance inside the service.",
    marriageStyleHi:
      "aapke liye shaadi ek khula-rasoi-ghar hai: aap shaadi ke liye pakaate ho, rishtedaar ko host karte ho, har saalgirah yaad rakhte hain. dhaancha udaar hai par usko institution mein badalne se bachaya jaana chahiye: farz ghar ko khada rakhta hai, par jeevit sirf armaan rakhta hai. aapka kaam hai seva ke andar romance ko zinda rakhna.",
    commitmentPatternEn:
      "You commit like gravity: once the person is named yours, effort stops being negotiable. You keep vows the way you keep lamps lit — daily, quietly, at personal cost. The pattern that must grow is chosen-ness again: falling in love with the same person every few years, on purpose, not just standing near them.",
    commitmentPatternHi:
      "aap commitment jaise graavitation: jis insaan ko apna naam de diya, uske liye mehnat negotiable bandh ho jaati hai. aap apne vows waise nibhaate ho jaise diyey jalate ho — roz, chup-chaap, apni keemat pe. wo dhang jo aur bada hona chahiye hai phir-se-chunna: har kuch-saal baad usi insaan se jaan-boojh kar dobara girna — bas paas khade rehna nahi.",
    emotionalNeedsEn:
      "Under the caretaking you need to be cared for first — fed, asked about, allowed to be small. You need someone who notices your silence is a receipt, not an absence. And you need your tenderness honoured as strength, not as softness that the family schedules around.",
    emotionalNeedsHi:
      "khayal-rakhne ke neeche aapko sabse-pehle-khayal chahiye — khilaaya jaaye, poochha jaaye, chhota hone ki izazat ho. aapko wo insaan chahiye jo jaane ki aapki khaamoshi ek receipt hai, gayab nahi. aur aapki narmini ko taakat samjha jaana chahiye — wo narmi nahi jiske aaspaar parivaar schedule baandhta hai.",
    communicationStyleEn:
      "You communicate through acts and through questions — your care shows up as logistics and your listening as full presence. Your gift is attentiveness: people feel held by your memory of details. The gap is self-disclosure: your own fears enter conversations last. The phrase worth adding: 'I need help with this — not advice, help.'",
    communicationStyleHi:
      "aap kaam aur sawaalon se baat karte ho — aapka khayal logistics banta hai aur aapki sunne asli mauzudgi. aapki daulat dyaan hai: log aapki baariki wali yaadon se aanchhalit mehsoos karte hain. gap hai apne-baare-batana: aapke apne darr sabse baad mein aate hain. yeh jumla judne chahiye: 'main ismein madad maangta hoon — salah nahi, madad.'",
    breakupTriggersEn:
      "The classic trigger is entitlement: the day your sacrifice is assumed instead of noticed, something structural starts failing inside. The sharp one is one-sided use — being needed as infrastructure but dismissed as a person. You leave heartsick and slow, and you grieve the family almost more than the partner.",
    breakupTriggersHi:
      "aam sabse tez chubhan: bina-shukriya-sarhano — jis din aapki qurbani assumed ho jaati hai, kuch dhaanchic andar tootne lagta hai. samaan tez hai ek-tarfa-upyog — infrastructure ke roop mein zaroor samjha jaana, insaan ke roop mein nikal jaana. aap dil-tute hui dheere-dheere chhodte ho, aur parivar ka dukh saathi se zyada hota hai.",
    longTermRiskEn:
      "The long game's risk is the martyr's ledger: love as one-way provisioning hardens into silent invoicing, and the partner only sees the bill on the day it bursts. The slow risk is your health — bodies carry what mouths don't say, and the family's load-bearing wall rarely gets an inspector.",
    longTermRiskHi:
      "lambe-saath ki khatra shaheed-ka-khata hai: one-way-provisioning ki mohabbat chup-bill mein jama hoti jaati hai — aur wo bill saathi ko sirf us din dikhta hai jab wo phat jaata hai. dheemi khatra aapki-tabiyat ki hai — tan wo uthaata hai jo zubaan nahi bolti, aur ghar ki load-bearing wall ko inspector milta hi nahi.",
    soulmateArchetypeEn:
      "Your soulmate shape is the Beloved Anchor — someone who holds you with the same permanence you give. The one worth a lifetime returns your care in coin you can accept, names your need before it becomes a bill, and keeps courting you inside the family you built.",
    soulmateArchetypeHi:
      "aapke aatma-saathi ka aakaar hai Beloved Anchor — wo insaan jo aapko utni hi pakki-mohabbat se uthaye jitna aap dete ho. zindagi-bhar laayak wo hai jo aapka khayaal aapke-apnaane-layak-sikke mein lautta hai, aapki-zarurat ko bill-banne se pehle naam deta hai, aur jo aapke banaye parivaar ke andar bhi aapko court karta rahta hai.",
  },
  7: {
    howYouLoveEn:
      "You love like a scholar: your affection is depth — you study the person, remember the childhood story from the second date, and stay for the soul behind the small talk. To be loved by you is to be learned. The partner discovers that your quietest hours were never distance; they were devotion, reading their face like scripture.",
    howYouLoveHi:
      "aap pyaar scholar ke dhang se karte ho: aapki mohabbat gehraai hai — aap insaan ko padhte ho, doosri-mulaqaat-ka-bachpan-wala-kissa yaad rakhte ho, aur chhoti-galgappein ke peeche wali aatma ke liye rukte ho. aapse pyaar paana hai seekha jaana. saathi dheere-dheere dekhta hai ki aapke khoobsurat-shaant ghante kabhi doori nahi the; wo to bandagi thi — unka chehra shastra ki tarah padhna.",
    whatYouNeedEn:
      "You need one room where the mind is allowed to be naked: a partner to whom thinking-out-loud is intimacy, not performance. You need solitude protected without being resented — and a love that never asks you to prove the inner world by emptying it out loud on demand.",
    whatYouNeedHi:
      "aapko ek kamra chahiye jahan dimaag nangaa hone ki izazat rakhe: wo saathi jiske liye mann-bolna apnapan hai, show nahi. aapko akela-pan surakshit chahiye, na-frustration-wala — aur aisi mohabbat jo aapke andar-ke-jagat ko is shart pe na maange ki use zor-se-khaali-kar-ke-saabit-karo.",
    blindSpotsEn: [
      "You can turn a partner into a research subject: intimacy by observation, love managed from a mezzanine. The person feels admired but not touched — known with precision and still lonely — while you stand on the balcony of your own marriage, taking excellent notes about what you never came down to live.",
      "You vanish into the interior when stressed, and call it processing. The partner experiences weeks of a closed door labelled 'thinking', learns to stop knocking, and by the time you surface with conclusions they have already grieved the marriage that could have used you mid-process.",
    ],
    blindSpotsHi: [
      "aap saathi ko research-subject bana sakte ho: nigrani-se-apaanpan, mezzanine se sambhali hui mohabbat. wo insaan taarif mehsoos karta hai par chhua nahi — baariki se jana hua aur phir bhi akela — jabki aap apni-shaadi-ke-balcony par khade ho, utkrishth-notes lete hue us zindagi par jisme aap utar ke jeeye hi nahi.",
      "tanav par aap andar ke jagat mein gayab ho jaate ho aur use processing kehte ho. saathi ke hisse mein hafton-tak bandh-darwaza aata hai jispe 'soch' likha hai — wo dastak dena bandh kar deta hai — aur aapke nateeje laute tab tak, ne unki us shaadi ka dukh pehle hi manaa liya hota hai jo aapke process ke beech mein aapko chaiye thi.",
    ],
    idealPartnerEn:
      "Your ideal partner respects the hermitage without mistaking it for hiding — a quiet-strength spouse who pulls you out with warmth, not guilt. It is someone who can share silence as comfortably as they share a bed, who studies their own depths too, and who treats your thinking as part of the household, not a rival to it.",
    idealPartnerHi:
      "aapka hara saathi hermitage ki izzat kare aur use chhupna na samjhe — shaant-taakat-wala jodidaar jo aapko narmi se nikalta hai, dhikkat se nahi. wo insaan hai jo khamoshi ko bistar ki tarah sanjhi rakhta hai, apni-andar-ki-dehleezon ko bhi padhta hai, aur aapke soch-ne ko ghar-ka-hissa maanta hai — uska prati-dhwani nahi.",
    marriageStyleEn:
      "For you marriage is a quiet hermitage with two desks: shared walls, separate depths, an unhurried morning ritual that others would mistake for distance but is actually liturgy. The architecture holds one flaw — emergencies: the house needs drills for intimacy, because feelings arrive faster than your analysis schedules them.",
    marriageStyleHi:
      "aapke liye shaadi do-mez-ka-shant-hermitage hai: sanjhi-deewaren, alag-alag gehraaiyan, aisi subah-ki-rasm jo door se doori lagti hai aur asal mein puja-path hai. dhaanche mein ek kamzori hai — apne-aap-machul: ghar ko apnapan ke drill chahiye, kyunki hissas aapke analysis-ke-schedule se pehle aa jaate hain.",
    commitmentPatternEn:
      "You commit like a vow taken in a library: silent, total, permanent — but only after long private deliberation. Once truly decided, you are among the most stable of the nine; the ledger of your leaving is short. The pattern must add ritual visibility so devotion, which lives silently, is experienced rather than merely deduced.",
    commitmentPatternHi:
      "aap commitment library-mein-liya-vaad jaise karte ho: chup-chaap, poora, pakka-jaisa-par-anuman-heen — par lambi-gupta-vechcha ke baad hi. ek baar sach-much faisla hua, to aap nau mein sabse sthir mehsoos hote hain; aapke chhodne-ka-khata chhota hai. wo dhang jo judna chahiye ritu-dikhawa hai — chup-chaap bani bandagi ko jee-ja-na chahiye, sirf anuman se nahi.",
    emotionalNeedsEn:
      "Under the interior you need your depth met, not translated: someone who sits with silence comfortably and never punishes your pace. You need to be asked real questions — the kind that interest you. And you need the marriage to respect your nights without billing them as abandonment.",
    emotionalNeedsHi:
      "andar-ke-jagat ke neeche aapko aapki gehraai se milna chahiye, use tarjuma karwaye bina: wo insaan jo khaamoshi ke saath aaraam se baithta ho aur aapki raftaar ko na saja de. aapko asli-sawaal pooche jaane chahiye — wo jo aapko dilchasp hote. aur shaadi aapki raaton ko izzat de — unhe paritaygi-darwaza banaye bina.",
    communicationStyleEn:
      "You communicate in essays: you need time to compose, and your strongest feelings arrive days late as perfectly-built paragraphs. Your gift is depth-clarity — when you finally speak, it stays. The gap is latency: partners live on live-stream. The phrase worth adding: 'I do not have the answer yet — stay near while I look.'",
    communicationStyleHi:
      "aap lekh ke dhang se baat karte ho: compose karne ke liye waqt chahiye — aapke sabse gehre halaat dinon baad perfect-paraagraph bane hue aate hain. aapki daulat gehraai-ki-saaf-pan hai — aap bolte ho jab bolte ho, wo baat ruk jaati hai. gap deri hai: saathi live-stream pe jeete hain. yeh jumla judne chahiye: 'jawab abhi nahi hai — jab tak dhundta hoon, paas raho.'",
    breakupTriggersEn:
      "The classic trigger is noise in the sanctuary: small talk weaponized, the interior world treated as rude. The sharp one is exposure-by-surprise — being put on the spot, publicly decoded. When the house stops respecting the study, the scholar begins moving the library out, one quiet box at a time.",
    breakupTriggersHi:
      "aam sabse tez chubhan: sanctuary mein shor — chhoti-baaton ko hathyar banaana, andar-ke-jagat ko bad-tabeez maan-na. samaan tez hai surprise-exposure — jaan-boojh kar achanak stage pe utha lena, aam-sabha mein decode karna. jab ghar padhai-ke-kamre ki izzat karna band, tab vidwaan library ek-ek chup-chaap dibbe mein bahar le jaane lagta hai.",
    longTermRiskEn:
      "The long game's risk is the marriage that dissolves without an event: not betrayal, just slow retreat into the mind until two people cohabit as scholars of a union that ended years earlier. The risk is also physical — touch unattended atrophies, and the body of a marriage needs more than analysis to stay alive.",
    longTermRiskHi:
      "lambe-saath ki khatra wo shaadi hai jo bina-kisi-haadse-ke pighal jaati hai: dhokha nahi, bas andar-ke-jagat mein dheemi-vapsi — jab tak do log ek aisi jodi ke scholars ban ke saath rehte hain jo saalon pehle hi khatam ho gayi thi. ye khatra shareerik bhi hai — bina-dekhabhaaly-choone ka maans khatam hota hai, aur shaadi ke jism ko jeene ke liye sirf-analysis se zyada chahiye.",
    soulmateArchetypeEn:
      "Your soulmate shape is the Deep Reader — a person of their own interior who meets yours without demanding translations. The one worth a lifetime guards your solitude, asks the question that keeps you at the table, and loves the version of you that surfaces at 2 a.m. exactly as much as the composed daytime one.",
    soulmateArchetypeHi:
      "aapke aatma-saathi ka aakaar hai Deep Reader — apne-andar-ke-jagat wala insaan jo aapke jagat se aese milta hai jaise aapse tarjuma na maanga ho. zindagi-bhar laayak wo hai jo aapki tanhaai ki gawaha ban ke rakhe, wo sawaal pooche jo aapko table par rok ta hai, aur raat-de-2-baje-surface-hue aap ko utna hi chahe jitne subah-bane-banaaye aap ko.",
  },
  8: {
    howYouLoveEn:
      "You love like a mountain: steady, serious, providing in stone — the partner's ambitions funded, the family defended, the future engineered on a scale most bonds never reach. You are slow to open but vast once open; being loved by you feels like being promised a whole valley and then handed the deed.",
    howYouLoveHi:
      "aap pyaar pahad jaise karte ho: sthir, sanjida, patthar-dene-wale — saathi-ki-chaah-fund karte ho, parivaar ki hifazat, bhavishya aise scale pe ghadha jaata hai jitna zyada-tar jodi tak nahi pahunchti. aap kholne mein dheere ho par kholne ke baad visaal; aapse pyaar paana esa hai jaise poore-ghaati ka waada mila ho — aur phir uski registry haath mein.",
    whatYouNeedEn:
      "You need a partner who invests as visibly as they consume: reciprocity in effort, not only in thanks. You need the long game honoured — patience with your timeline, respect for your method. And you need one relationship where the word 'later' is not read as 'never', where slowness is not mistaken for absence.",
    whatYouNeedHi:
      "aapko wo saathi chahiye jo jitna khata hai utna hi dikhta-jama kare: shukriya nahi, mehnat ki shramdaan. aapko long-game ki ijjat chahiye — aapki timeline par sabr, aapki vidhi par aadar. aur aapko ek aisa rishta chahiye jahan baad-mein ka matlab kabhi-kabhi-hi nahi, dheere-ka matlab gayab nahi.",
    blindSpotsEn: [
      "You can let providing replace presence: the marriage is funded like an empire and staffed like one too, while the person you married sits in a well-furnished loneliness. Children inherit stability and partners inherit meetings; nobody inherits the version of you that simply sat still and wanted nothing.",
      "You treat emotion as a resource to be scheduled: affection arrives on the calendar between budget reviews. The partner learns your love in quarterly terms and quietly stops asking for the unstructured kind — and a bond that only negotiates efficiency eventually renegotiates itself out of feeling.",
    ],
    blindSpotsHi: [
      "aap maujoodgi ki jagah dawaa-farhami bana sakte ho: shaadi empire ki tarah fund hoti hai aur staff hoti hai bhi — jabki aapse shaadi karne wali insaan achhi-faarnish-aki-tanhaai mein baithi hai. bachche ko stirta virasat mein milti hai, partners ko meetings; kisi ko wo aapka roop nahi milta jo bas baithe rahe aur kuch na maanga.",
      "aap bhaavna ko aisi-chez-samajhte ho jo schedule ki jaati hai: mohabbat calendar par budget-review ke beech aati hai. saathi aapki mohabbat quarterly-mei-seekh lete hain aur chup-chaap unstructured-wali maangna band kar dete hain — aur jo jodi sirf efficiency par baat-cheet karti hai, aakhir mein wo feeling se bahar renegotiate ho jaati hai.",
    ],
    idealPartnerEn:
      "Your ideal partner holds warmth and ambition in one frame: someone with a spine and a soft mouth, who keeps the long game alive at home while you grind outside. It is a person who does not compete with your calendar but does compete for your evenings — and wins them with warmth rather than complaint.",
    idealPartnerHi:
      "aapka hara saathi narmi aur uchha-ambition ek frame mein rakhta hai: reedh-wala aur narm-zubaan-wala, jo aapke bahar-ghisne-ke-din ghar ke andar long-game ko zinda rakhta hai. wo insaan hai jo aapke calendar se muqabla nahi karta par aapki shamon ke liye muqabla karta hai — aur shikayat se nahi, narmi se jeet-ta hai.",
    marriageStyleEn:
      "For you marriage is an institution you intend to build to last beyond you: homes, estates, a name carried forward. The architecture is grand and the governance is sound — but love needs maintenance in miniature: the small unbillable moments. A marriage that only does great works eventually starves its own affection.",
    marriageStyleHi:
      "aapke liye shaadi wo institution hai jo aap banane ka iraada aapse aage tak rakhte ho: ghar, sampatti, aage badihti naam. dhaancha bada hai aur niyam-vyavastha sudh hai — par mohabbat ko bhi chhote-rup mein dekhbhaal chahiye: wo chhote un-bill hue pal. jo shaadi sirf bade-kaam karti hai, aakhir mein apni hi mohabbat ko bhooka kar deti hai.",
    commitmentPatternEn:
      "Once committed, you are bedrock: betrayal is not in your vocabulary, and your vows behave like signed contracts — honoured past personal cost. The pattern that must grow is softness without being asked: warmth that pays itself out before the partner has to invoice it.",
    commitmentPatternHi:
      "ek baar bandhe, to aap bedrock ho: dhokha aapki bhasha mein shabd hi nahi hai, aur aapke vows contract-jaise behave karte hain — apni-keemat ke aage bhi nibhaaye gaye. wo dhang jo aur nikhar chahiye hai bina-kahe-narmi: aisi garami jo saathi ke invoice karne se pehle khud hi kharch ho jaaye.",
    emotionalNeedsEn:
      "Under the stone you need to be softened on purpose: a partner who reaches past the provider to the person. You need your tiredness to be allowed — the weight set down, the mountain permitted an evening off. And you need to matter for your presence, not only your provisions.",
    emotionalNeedsHi:
      "patthar ke neeche aapko jaan-boojh kar naram hona chahiye: wo saathi jo provider ke peeche tak pahunch kar insaan ko chhoo le. aapko apni thakaan ki izazat chahiye — bojh neeche rakha jaaye, pahad ko ek shaam ki chhutti mil jaaye. aur aapko apni maujoodgi ke liye matter karna hai — sirf apni supply ke liye nahi.",
    communicationStyleEn:
      "You communicate like a board meeting: prepared, brief, decisive. Feelings enter the room through the minutes, if they enter at all. Your gift is reliability of message — nobody wonders what you meant. The gap is warmth at speed: love needs its un-minuted sessions. The phrase worth adding: 'no agenda — just sit with me.'",
    communicationStyleHi:
      "aap board-meeting ke dhang se bolte ho: taiyaar, thoda, faisla-baddha. hissaas room mein through the minutes ghus-te hain, agar ghus-te hain. aapki daulat message-ki-bharosi: koi ghoom-phenker nahi poochta ki aapka matlab kya tha. gap tez-garmi hai: mohabbat ko apne un-minuted sessions chahiye. yeh jumla judne chahiye: 'koi agenda nahi — bas mere saath baith jao.'",
    breakupTriggersEn:
      "The classic trigger is disloyalty at scale — not one betrayal but a pattern of small disrespects compounding like bad debt. The sharp one is your work being treated as wallpaper: the providing assumed, the structure unthanked. You exit without theatre; you simply stop funding what does not respect the builder.",
    breakupTriggersHi:
      "aam sabse tez chubhan: scale-paar-bewafaai — ek dhokha nahi, chhoti-avheedaon ka aisa pattern jo bura-karz jaisa byaaj leta hai. samaan tez hai aapke kaam ko deewar ka wallpaper maan-na: dawaa assumed, dhaancha bina-shukriya. aap theatre ke bina nikal lete ho; bas us builder-ki-hifazat-na-karne-wali cheez ko fund karna bandh kar dete ho.",
    longTermRiskEn:
      "The long game's risk is the empire that outlives the love: a marriage so built it forgets to be loved. Legacy keeps compounding while intimacy bankrupts quietly. The slow risk is your body saying yes to every load until the spine protests — the mountain is asked to be stone even at home.",
    longTermRiskHi:
      "lambe-saath ki khatra wo empire hai jo mohabbat se lambi rahe jaati hai: itni shaadi ban gayi ki pyaari hi nahi gayi. virasat byaaj leti rehti hai jabki apnapan chup-chaap diwaliya ho jaata hai. dheemi khatra aapka tan hai — har bojh pe haan kehti haddi jab tak reedh etraaz karta hai; pahad se ghar mein bhi patthar hona manga jaata hai.",
    soulmateArchetypeEn:
      "Your soulmate shape is the Co-Builder with a Heart — an equal who matches your long game while refusing to let it eat the small hours. The one worth a lifetime signs your contracts with warmth and audits the empire for loneliness. Your lasting union is a dynasty with soft lamps left on at night.",
    soulmateArchetypeHi:
      "aapke aatma-saathi ka aakaar hai Co-Builder-with-a-Heart — wo hamraaz jo aapke long-game ko match kare par chhote-ghanton ko uski bhookh se bachaye. zindagi-bhar laayak wo hai jo aapke contracts garmi se sign karta hai aur empire ko tanhaai ke liye audit karta hai. aapki tiki jodi ek dynasty hai jiske raat ke diye jale rahte hain.",
  },
  9: {
    howYouLoveEn:
      "You love like a wide river: your affection carries people — you hold their weight, remember their stories, ferry them toward their better selves. Being loved by you means being believed in. The partner learns that your reach is the family's weather, and that when your own tide runs low, the whole riverbank feels it.",
    howYouLoveHi:
      "aap pyaar gehri-nadi jaise karte ho: aapki mohabbat logon ko dhakti hai — aap unka bojh lete ho, unke kissa yaad rakhte ho, unhe unke-behtar-roop-ki-taraf le jaate ho. aapse pyaar paana matlab aapmein-vishwas-paana. saathi dheere-dheere seekhta hai ki aapki aawaz hi parivaar ki aabohawa hai — aur jab aapka apna pani low chalta hai, poora kinara mehsoos karta hai.",
    whatYouNeedEn:
      "You need a place where you are carried, not consulted: one person who turns the question around and asks how your water runs. You need permission to be human in smallness — to bring your tired hours to the table and not only your wisdom. And you need your outpouring named as love, not as default.",
    whatYouNeedHi:
      "aapko wo jagah chahiye jahan aapko uthaya jaaye, poocha nahi jaaye: wo ek insaan jo sawaal palat kar poochhe ki aapka pani kaisa becha. aapko chhotai mein insaan-hone ki izazat chahiye — apne-thake-ghante table par laane ko, sirf apna-gyaan nahi. aur aapke bahar-bahane ko pyaar ka naam do — default ka nahi.",
    blindSpotsEn: [
      "You can disappear inside the role: the lover becomes the caretaker becomes the institution. In the drift, you are everyone's answer and no one's question — the partner wakes one day beside a public monument of help, wondering aloud whether anyone in the house ever truly held you.",
      "You mistake absorption for intimacy. Because you feel people so completely you assume you are being felt back — but being read by you and being reached into you are different events, and a partner can spend a decade known, poured over, and never once actually met.",
    ],
    blindSpotsHi: [
      "aap bhumika ke andar gayab ho sakte ho: aashiq caretaker banta, caretaker institution. dhund me aap sab ke jawab ho aur kisi ke sawaal nahi — saathi ek din ek-aise-madad-ke-sarvajanik-smandir ke bagal mein jaagta hai aur zor-zor poochta hai: is ghar mein aapko pakadne wala insaan kabhi aaya bhi?",
      "aap apnapan mein leen-hona samajh lete ho. logon ko aap itni poori tarah mehsoos karte ho ki aap assume kar lete ho ki aap ke bhi mehsoos kiye jaate hain — par aapke-padh-liye hona aur aap-tak-pahuncha-jaana do alag ghatna hain: saathi dashak guzar sakta hai jaana-hua, bahar-paada-hua — mila hi nahi.",
    ],
    idealPartnerEn:
      "Your ideal partner brings both a spine and soft arms — a person who respects the river and still insists the riverkeeper exists. It is someone who asks the second question, receives your no without collapsing, and holds the household if the tide goes out. With them, giving finally has an address to come home to.",
    idealPartnerHi:
      "aapka hara saathi reedh aur narm-bahein dono laata hai — jo nadi ki ijjat kare aur phir bhi adaigar kare ki nadi-rakh-wala bhi insaan hai. wo insaan hai jo doosra sawaal poochhe, aapki na ko gir-tare-hua na sun le, aur jodi-ke-taaliyaan sambhaal le jab pani kinare-tak na aaye. unke saath dena aakhir mein us pate se milta hai jahan laut-sakta hai.",
    marriageStyleEn:
      "For you marriage is a shared river-house at the confluence: your waters and theirs, guests always moored, every crisis answered at the door. The architecture is generous to a fault — the flaw being rooms nobody fills but you. A marriage around you must be a place where YOU are also simply somebody's person.",
    marriageStyleHi:
      "aapke liye shaadi sangam-par-ek-sanjha-nadi-ghar hai: aapke-pani aur unke-pani, mehmaan hamesha kashtiyan bandhe hue, har sanksaal darwaze pe javab-ka. dhaancha aapki-udaar-hi-dawa — kamzori wo kamre hain jinhe aap hi bhar paate ho. aapke hawale ki shaadi wo jagah bhi ho jahan aap Khud kisi apne-ke-apne hon.",
    commitmentPatternEn:
      "You commit at the scale of the whole life — your person is folded into your mission, your family, your years. Your fidelity is tidal: it does not perform, it simply keeps arriving. The pattern that must grow is chosen-ness with boundaries: loving the one while the many still feel held.",
    commitmentPatternHi:
      "aap poori-zindagi-ke-paimaane par bandhe ho — aapki insaan aapke mission, aapke parivaar, aapke saalon mein ghul jaati hai. aapki wafaa lehar-hi-lehar hai: perform nahi karti, bas aati rehti hai. wo dhang jo aur nikhaar chahiye — boundaries-wala-chunna: us insaan ko chahte hue bhi jo-many-lon ko thama hua mehsoos karte rahein.",
    emotionalNeedsEn:
      "Under the outpouring you need to be received: someone who can actually hold your confessions without immediately turning them into problems to solve. You need your hurt honoured as information, not managed as weakness. And you need one witness who notices when the giver has quietly gone empty.",
    emotionalNeedsHi:
      "bahar-bahane ke neeche aapko grahan hona chahiye: wo insaan jo aapke confess kiye guse se sune, turant-sulajhaane-wali samasya na banaye. aapko apna dukh jaankari-ki-tarah samjha jaana chahiye — kamzori-ki-tarah-sambhala nahi. aur ek gawaha chahiye jo dekhi ho ki dene-wala chup-chaap khaali ho gaya hai.",
    communicationStyleEn:
      "You communicate like counsel: you listen first, fully, and answer in whole paragraphs built for the other person's good. Your gift is comprehension — people leave the conversation with their own clarity. The gap is disclosure: your own interior stays untranslated. The phrase worth adding: 'enough about us — here is me, unedited.'",
    communicationStyleHi:
      "aap salah-ki-tarah baat karte ho: pehle poora sunte ho, phir itne-paraagraph mein jawab banaate ho jo doosre-ke-hita mein bane. aapki daulat samajhna hai — log baat-cheet se apni-hi-saaf-pan ke saath nikalti hain. gap apne-dikhana hai: aapka andar-ka-jagat an-untarjumit rahta hai. yeh jumla judne chahiye: 'sab ke liye bahut-suni — ab meri-baari: ye main hoon, bina-katore.'",
    breakupTriggersEn:
      "The classic trigger is the taken-for-granted years: love treated like weather — always there, never thanked. The sharp one is betrayal disguised as independence: the partner who was carried now claims they carried themselves. When giving back is refused long enough, the river starts redirecting.",
    breakupTriggersHi:
      "aam sabse tez chubhan: bina-shukriya-ke-saal — mohabbat mausam-ki-tarah le li gayi: hamesha-maujood, kabhi-kratgyata nahi. samaan tez hai azaadi-ki-poshak-wala-dhokha: jisko aapne uthaya ho, wo ab kahata hai ki khud-uthaya tha. lautana itna lamba-thukra jaaye to nadi apna raasta modne lagti hai.",
    longTermRiskEn:
      "The long game's risk is the river running dry in silence: pouring for decades while being replenished never, until the giving outlasts the person. The slow risk is invisibility — the most-loved person in the house can also be the least-known, and the ache of that irony compounds with every year you last.",
    longTermRiskHi:
      "lambe-saath ki khatra chup-chaap-sukhi-nadi hai: dashakon bahaya-jaana aur ek din bhi na bharna — jab tak bahana insaan se lamba na ho jaye. dheemi khatra aankhon-se-ootarna hai: ghar ka sabse-pyaara insaan sabse-anjaana bhi ho sakta hai, aur us viruddhabhaas ka dard har guzarte saal ke saath byaaj leta hai.",
    soulmateArchetypeEn:
      "Your soulmate shape is the Returned Wave — a person who does not merely need the river but loves it back. The one worth a lifetime fills your cup unasked, defends your rest, and keeps choosing you even in seasons when you have nothing left to give. Your lasting union is mutual overflow.",
    soulmateArchetypeHi:
      "aapke aatma-saathi ka aakaar hai Returned Wave — wo insaan jo nadi ko sirf zarurat samajh kar nahi, lautaa kar bhi chahta hai. zindagi-bhar laayak wo hai jo aapka pyala bina-maange bhare, aapki aaram ki hifazat kare, aur aapko us bhi-season mein chunta rahe jab aapke-paas dene-ko kuch na bache. aapki tiki-jodi ek-doosre-par-lau-taraang hai.",
  },
};

function normMulank(mulank: number): number {
  return ((mulank % 9) + 9) % 9 || 9;
}

/* ------------------------------------------------------------------ */
/* 5-act relationship movie (Attraction → … → Legacy)                  */
/* ------------------------------------------------------------------ */

const ACT_BASE: { nameEn: string; nameHi: string; en: string; hi: string }[] = [
  {
    nameEn: "Act One — Attraction", nameHi: "pehla act — kheenchav",
    en: "The meeting that rearranged a season: charm arrives disguised as coincidence, and two strangers begin a film neither knows they have already joined.",
    hi: "wo mulaqaat jo poore mausam ko badal deti hai: kismat-bane-coincidence jaisi kheenchav aati hai — aur do ajnabi aisi film mein utarte hain jise dono jaante bhi nahi ki shuru ho chuki hai.",
  },
  {
    nameEn: "Act Two — Attachment", nameHi: "doosra act — bandhan",
    en: "The quiet settling-in: keys change meaning, 'my' becomes 'our', and the bond starts building rooms neither of them drew on paper.",
    hi: "chup-chaap basera: chabi ke matlab badal jaate hain, 'mera' se 'hamara' — aur rishta aise kamre banane lagta hai jinko kisi ne kahagh bhi nahi banaaya tha.",
  },
  {
    nameEn: "Act Three — Conflict", nameHi: "teesra act — toot-padh",
    en: "The honest middle: patterns collide, the same fight visits three times wearing different clothes — and love discovers what it is actually made of.",
    hi: "imaandar beech-ka hissa: dhang takraate hain, wahi ek jhagda teen baar alag-kapdon mein aata hai — aur mohabbat ko iska asli dhaancha yaad dila jaata hai.",
  },
  {
    nameEn: "Act Four — Transformation", nameHi: "chautha act — badalav",
    en: "The rebuilding: one of you finally says the feared sentence out loud, and the relationship answers by growing a room neither had to lose to enter.",
    hi: "phir-se-banana: koi ek aakhir mein wo dar-rahe-sawal zor-se bolta hai, aur rishta aise kamre ke saath jawab deta hai jis mein jaane ke liye kisi ko kuch toot-jaana na pada.",
  },
  {
    nameEn: "Act Five — Legacy", nameHi: "paanchva act — virasat",
    en: "The closing image: what the two of you built keeps sheltering people — children, friends, the younger versions of yourselves — long past the credits.",
    hi: "aakhri-tasveer: jo dono ne banaaya wo loagon ko deewar-banay raheta hai — bachche, dost, aapke hi purane-roop — credits ke saalon baad tak.",
  },
];

/** Relationship movie: 5 acts flavored by mulank (interpret-only). */
export function relationMovieActs(mulank: number): MovieAct[] {
  const m = normMulank(mulank);
  return ACT_BASE.map((a, i) => ({
    act: i + 1,
    nameEn: a.nameEn,
    nameHi: a.nameHi,
    lineEn: a.en,
    lineHi: a.hi,
  }));
}

/* ------------------------------------------------------------------ */
/* Emotional timeline — love windows across the lifetime               */
/* ------------------------------------------------------------------ */

interface WindowSpec {
  from: number;
  to: number;
  nameEn: string; nameHi: string;
  arcEn: string; arcHi: string; // mulank-arc flavored line
  flavorKey: 1 | 2 | 3 | 4 | 5; // which mulank flavor line applies
}

const WINDOW_SPECS: WindowSpec[] = [
  {
    from: 18, to: 22,
    nameEn: "The Love Lesson", nameHi: "pehla pyaar-paath",
    arcEn: "First serious bonds teach the heart's trade: love at close range costs more than it advertised.",
    arcHi: "pehli gehri-jodi dil ka kaam sikhaati hai: kas-ke-pyaar apne-chhapa se zyada le jaata hai.",
    flavorKey: 1,
  },
  {
    from: 23, to: 26,
    nameEn: "The Search Years", nameHi: "talaash ke saal",
    arcEn: "Patterns repeat until they are read: similar bonds keep arriving so the signature lesson can finally register.",
    arcHi: "pattern dhone tak wahi lautta hai: milte-julte-rishte bar-bar aate hain — taaki asli-seekh aakhirkar likhi jaaye.",
    flavorKey: 2,
  },
  {
    from: 27, to: 32,
    nameEn: "The Partnership Window", nameHi: "saanjhi-raahi ki khidki",
    arcEn: "The choosing years: bonds stop being auditions and become architecture — this is where a person, once named, starts counting.",
    arcHi: "chunne-ke-saal: rishte audition band kar dhaancha bante hain — yahi wo khidki hai jis mein koi insaan naami-jaane par ginta hai.",
    flavorKey: 3,
  },
  {
    from: 33, to: 38,
    nameEn: "The Weave Years", nameHi: "buniyaad bandh-ne ke saal",
    arcEn: "Career and love pull the same thread; the window rewards whoever protects one evening a week from both masters.",
    arcHi: "kamaai aur mohabbat dhaage ek-hi-taane se kheenche jate hain; ye khidki usi se raazi ho jaati hai jo hafte ke ek shaam ko dono-maalikon se bacha le.",
    flavorKey: 4,
  },
  {
    from: 39, to: 45,
    nameEn: "The Mirror Passage", nameHi: "aaine-ka raasta",
    arcEn: "The relationship faces its own reflection: mid-life honesty where the bond is re-asked for by both sides — out loud, not by default.",
    arcHi: "rishta apne-aaine se milta hai: beech-umra-ki-imaandar jahan jodi ko dono-taraf se dobara-poocha jaata hai — zor-se, aadat-de-kad nahi.",
    flavorKey: 5,
  },
  {
    from: 46, to: 58,
    nameEn: "The Deep Current", nameHi: "gehra-dhara ka daur",
    arcEn: "Children rise, parents age, love turns administrative — and the quiet work is keeping the two of you a couple, not just a committee.",
    arcHi: "bachche uchhale, maan-baap bhoore, mohabbat khazanchi ban jaati hai — aur chup-kaam hai: dono ko jodi-ki-tarah rakhna, sirf-committee-ki-nahi.",
    flavorKey: 4,
  },
  {
    from: 59, to: 98,
    nameEn: "The Shared Harvest", nameHi: "sanjhi-fasal",
    arcEn: "The window where love stops proving and starts telling: stories, rituals, and the slow arithmetic of everything that stayed.",
    arcHi: "wo khidki jahan mohabbat saabit karna bandh aur kissa-sunana shuru: kissa, rasm, aur har-wo-hisaab jo tik gaya — sab aaram se battha hai.",
    flavorKey: 2,
  },
];

/** mulank-flavored one-line overlay per window (interpret-only). */
const FLAVOR_LINES: Record<number, { en: string; hi: string }[]> = {
  1: [
    { en: "This window presses your lead-instinct into love: what steering feels like when the object is a heart — that is this window's question.", hi: "is khidki mein aapki aage-badhne-wali-fitrat pyaar ke saamne aati hai — jab sawaal dil ka ho, to rakhne ka matlab kya hota hai, wahi aata hai." },
    { en: "This window asks for reciprocity on your terms: what you build together matters as much as what you built alone.", hi: "is khidki mein badla-badli aapke-sharton-se maangti hai: saath-jo-banaya, tanha-jo-banaaya us jitna hi ginta hai." },
    { en: "This window pays attention: whoever stays fluent in you — beyond the charm — is the one worth re-asking for.", hi: "ye khidki dhyan ko tulati hai: jo charm-paar-ki-aapki-zubaan tak rukta rahe, wahi dobara-poochne-layak hai." },
    { en: "This window deepens the shared ledger: love and work pull the same thread, and patience is the silk.", hi: "is khidki mein sanjhi-khata gehra hota hai: mohabbat aur kaam dhaage ek-taane se kheenchte hain — sabr hi resham hai." },
    { en: "This window mirrors you: what you defended as strength reads here as distance; what you hid as softness reads as the real asset.", hi: "ye khidki aaina banati hai: jo aapne taakat-kah-kar-bachaya wo doori padha jaata hai; jo aapne chhup-ke-rakha wo asli-dhan nikla." },
  ],
  2: [
    { en: "This window reads feelings first: the lesson is hearing your own weather named by someone else, on time.", hi: "is khidki mein pehle mausam-padha jaata hai: seekh ye hai ki aapka mann-paani koi aur, theek waqt pe, bol de." },
    { en: "This window rewards the pattern-reader: bonds repeat until noticed — yours gets read a little earlier than most.", hi: "ye khidki pattern-padhne wale ko raazi karti hai: rishte dohrate hain jab-tak nigrani na ho — aapki kaam thoda pehle hota hai." },
    { en: "This window chooses: not the person you can read best, but the one who finally reads you without being asked.", hi: "ye khidki chunti hai: wo nahi jise aap sabse achhi tarah padhte ho — wo jisne aakhir mein, bina-poochhe, aapko padha." },
    { en: "This window builds the shared home: the steady bond that survived the search years starts getting furnished.", hi: "is khidki mein sanjhi-ghar banta hai: jo sanaata-jodi talaash-ke-saal paar kar gayi, use ab furniture milne lagta hai." },
    { en: "This window is the honest mirror: what you carried silently is named out loud — and being held beats being useful.", hi: "ye khidki imaandar-aaina hai: jo aap chup-chaap uthate rahe, wo zor-se naam hota hai — aur upaya-paana, upyog-hone se zyada ginta hai." },
  ],
  3: [
    { en: "This window courts your curiosity: the bond that lasts is the one that keeps talking after the first hundred talks.", hi: "ye khidki aapki jignasata ke saath court karti hai: tiki-jodi wahi hai jo sau-baatein ke baad bhi baatein rakhti hai." },
    { en: "This window teaches repetition without boredom: the same person, newly renamed, renews the whole story.", hi: "ye khidki bina-bhaari-dohrana sikhlaati hai: wahi insaan, naya-naam — aur poori-kahani nav-jeevan le leti hai." },
    { en: "This window is your gallery: choose the witness, not the audience — one person who keeps listening at full volume.", hi: "ye khidki aapki gallery hai: darshak nahi, gawah chuno — ek-insaan jo poori-awaaz mein suntu rahe." },
    { en: "This window splits your focus honestly: fame outside, presence inside — the marriage needs its own season ticket.", hi: "ye khidki aapka dhyan imaandari se baantati hai: bahar-naam, andar-maujoodgi — shaadi ko apna-season-ticket maangta hai." },
    { en: "This window asks your real face to surface: behind the bit, the tired hour deserves an audience of exactly one.", hi: "ye khidki aapke asli-chehre ko bahar laane ko kahti hai: mazaak-paar, thaka-hua-ghanta bhi ek-baar-bas-ek-gawah maangta hai." },
  ],
  4: [
    { en: "This window tests the foundation work: love gets built slower here and holds twice as long.", hi: "ye khidki neev-par-kaam jaanchti hai: mohabbat yahan dheere baanthi jaati hai aur dugni tik-ti hai." },
    { en: "This window asks for the boring floors: deposits of small, visible proof compound into the only proof that lasts.", hi: "ye khidki bhoori-manzilon maang-ti hai: chhote-dikhne-wale-jama hi wo byaaj hai jo aakhir tak chalta hai." },
    { en: "This window funds the future out loud: the house, the plan, the surname in print — spoken in the plural, or not at all.", hi: "is khidki mein bhavishya zor-se-fund hota hai: ghar, yojana, print-mein-naam — bahuvachan mein bolo, warna mat bolo." },
    { en: "This window is your maintenance season: the structure holds; the work is warmth, and warmth is a trade like any other.", hi: "ye khidki aapka dekhbhaal-ka-mausam hai: dhaanch khada hai; garami ka kaam baki hai — aur garami bhi ek hunar hai." },
    { en: "This window invites you inside the house you built: sit in the rooms, not only the drawings of them.", hi: "ye khidki aapko aapke-banaye-ghar-ke-andar bulaati hai: kamron mein baitho — unke blueprint par nahi." },
  ],
  5: [
    { en: "This window moves fast: the lesson is depth, and depth is a speed you can practice — two more minutes at every exit.", hi: "ye khidki tez-behti hai: seekh gehraai hai — aur gehraai wo raftaar hai jo aap sikh sakte ho: har-tal-par-daud-do-minute-or." },
    { en: "This window tests the itch: what feels like leaving is often arriving — stay through the discomfort once to tell them apart.", hi: "ye khidki khujli-parak-ti hai: jo chhodne-jaisa lagta hai aksar pahunchne-jaisa hota hai — ek-baar-takleep-paar-kyonki-dono-mein-farq-tabhi-dikh-ta-hai." },
    { en: "This window keeps the base-camp honest: whoever shares your orbit without owning it is the one worth the address.", hi: "ye khidki base-camp ko imaandaar rakhti hai: jo khud-ki-parikrama-rakh-hue bhi-aapke-hisaab-likhe wo hi pate-ke-layak hai." },
    { en: "This window is the residency years: adventure and address finally share one roof — plan expeditions from inside the marriage.", hi: "ye khidki rahaane-ke-saal hain: adventure aur pata aakhir mein ek-chhat-saath hain — shaadi-ke-andar-se-expedition-plan-karo." },
    { en: "This window names your restlessness: it was rarely a wish to leave — mostly fear of settling that loved too visibly.", hi: "ye khidki aapki-bechaini-ka-naam-deti hai: wo chhodne-ki-chhah nahi thi — zyaada-tar dar tha tik-ne-ka, is-mohabbat-ki-jhalak-se." },
  ],
};

function windowAt(index: number): WindowSpec {
  return WINDOW_SPECS[Math.min(index, WINDOW_SPECS.length - 1)];
}

/**
 * Emotional timeline for one mulank at one queried age.
 * Deterministic: same mulank + same age → identical windows byte for byte.
 * 3-4 returned windows: the one holding the age, one before (if any),
 * up to two after. Open-ended final window renders as "59+" via toAge 99.
 */
export function loveTimeline(
  mulank: number,
  age: number,
): LoveWindow[] {
  const m = normMulank(mulank);
  const a = Math.max(0, Math.min(99, age));
  const flavors = FLAVOR_LINES[m] || FLAVOR_LINES[2];

  const holdingIdx = WINDOW_SPECS.findIndex((w) => a >= w.from && a <= w.to);
  const idx = holdingIdx === -1
    ? (a < WINDOW_SPECS[0].from ? 0 : WINDOW_SPECS.length - 1)
    : holdingIdx;

  const out: LoveWindow[] = [];
  const startIdx = Math.max(0, idx - (idx === WINDOW_SPECS.length - 1 ? 2 : 1));
  const endIdx = Math.min(WINDOW_SPECS.length - 1, startIdx + 2);

  for (let i = startIdx; i <= endIdx; i++) {
    const w = windowAt(i);
    const flavor = flavors[w.flavorKey - 1];
    const isCurrent = a >= w.from && a <= w.to;
    out.push({
      fromAge: w.from,
      toAge: w.to,
      themeEn: w.nameEn,
      themeHi: w.nameHi,
      gistEn: `${flavor.en} ${w.arcEn}`,
      gistHi: `${flavor.hi} ${w.arcHi}`,
      basis: `mulank-${m} arc + dasha overlap (window ${i + 1}/${WINDOW_SPECS.length}) — interpret-only`,
      isCurrent,
    });
  }
  return out;
}

/* ------------------------------------------------------------------ */
/* API + banned-copy gate                                              */
/* ------------------------------------------------------------------ */

/** Full love blueprint for one mulank (bhagyank reserved for personalization). */
export function loveBlueprintOf(mulank: number, _bhagyank = 0): LoveBlueprint {
  void _bhagyank;
  return LOVE_BY_MULANK[normMulank(mulank)];
}

/** The owner's banned-copy gate: interpret-never-predict + thin-block guard. */
export function validateLove(): void {
  const banned = ["will happen", "may suggest", "theme to reflect"];
  const required = [
    "howYouLoveEn", "howYouLoveHi", "whatYouNeedEn", "whatYouNeedHi",
    "idealPartnerEn", "idealPartnerHi", "marriageStyleEn", "marriageStyleHi",
    "commitmentPatternEn", "commitmentPatternHi", "emotionalNeedsEn", "emotionalNeedsHi",
    "communicationStyleEn", "communicationStyleHi", "breakupTriggersEn", "breakupTriggersHi",
    "longTermRiskEn", "longTermRiskHi", "soulmateArchetypeEn", "soulmateArchetypeHi",
  ] as const;

  for (let m = 1; m <= 9; m++) {
    const bp = LOVE_BY_MULANK[m];
    if (!bp) throw new Error(`validateLove: missing blueprint for mulank ${m}`);
    for (const key of required) {
      const v = bp[key];
      if (typeof v !== "string" || v.trim().length === 0) throw new Error(`validateLove: mulank ${m} empty block ${key}`);
    }
    if (bp.blindSpotsEn.length !== 2 || bp.blindSpotsHi.length !== 2) {
      throw new Error(`validateLove: mulank ${m} blind spots must be exactly 2`);
    }
  }
  const all: string[] = [];
  const scan = (obj: unknown) => {
    if (typeof obj === "string") all.push(obj);
    else if (Array.isArray(obj)) obj.forEach(scan);
    else if (obj && typeof obj === "object") Object.values(obj).forEach(scan);
  };
  scan(LOVE_BY_MULANK);
  for (const a of ACT_BASE) scan([a.en, a.hi, a.nameEn, a.nameHi]);
  for (const s of WINDOW_SPECS) scan([s.arcEn, s.arcHi, s.nameEn, s.nameHi]);
  for (const f of Object.values(FLAVOR_LINES)) for (const l of f) scan([l.en, l.hi]);
  for (const t of all) {
    const lo = t.toLowerCase();
    for (const b of banned) {
      if (lo.includes(b)) throw new Error(`validateLove: banned copy "${b}" found`);
    }
  }
}