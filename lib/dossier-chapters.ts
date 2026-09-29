/**
 * v5.2 AKASHIC DOSSIER — CHAPTER 2: THE HIDDEN STORY OF YOUR LIFE
 * (canonical spec: narrative-not-numbers; customer-first voice; interpret
 * never predict; wounds→redemption arc; cliffhanger into Chapter 3.)
 *
 * Engine: mulank-keyed 6-beat hidden story (hook → design → pattern-proof →
 * cost → turn → gift), personalized with bhagyank flavor + current mahadasha
 * line when available. Bilingual spoken-Hinglish / simple EN.
 */

export interface StoryBeat {
  labelHi: string;
  textHi: string;
  textEn: string;
}

export interface HiddenStory {
  titleEn: string;
  titleHi: string;
  beats: StoryBeat[];
}

export const STORIES: Record<number, HiddenStory> = {
  1: {
    titleEn: "The hidden story of your life",
    titleHi: "aapki zindagi ki chhupi kahani",
    beats: [
      { labelHi: "hook", textHi: "sab kuch aapne khud seekha — par kabhi kisi ne yeh nahi kaha ki aapko iski zarurat kyun thi.", textEn: "You taught yourself everything — but no one ever told you why you had to." },
      { labelHi: "design", textHi: "aapki design mein shuru se 'pehla kadam' ka raaj tha: jahan log intezaar karte hain, aap shuru kar dete ho — isliye aapki zindagi mein leaders ka aur students ka dono role aaya.", textEn: "Your design carried the first step: where others wait, you begin — which is why life kept handing you both the leader and the student role." },
      { labelHi: "pattern", textHi: "notice karo — har jagah jahan naya kaam ya naya safar shuru hua, wahan pehli baar aap akele the. baad mein log aaye.", textEn: "Notice the pattern: wherever something new began, you were alone at the start. People came later." },
      { labelHi: "cost", textHi: "is design ki keemat ye rahi: aap aage chalte-chalte tanha ho jaate ho — aur chupke se ye soch ke thak jaate ho ki 'kabhi koi aage aake bolega, tum ruk jao, main dekh loonga'.", textEn: "The cost of this design: moving first leaves you lonely — and quietly tired of waiting for someone to say 'stop, I'll take it from here'." },
      { labelHi: "turn", textHi: "lekin kahani ka mod yahi hai: aapki taakat banne-ki-hai, tootne-ki-nahi. jis din aapne ek kaam chhota dekha, us din wo kaam aap se bada nikla.", textEn: "The turn: your strength was never in breaking, it was in building. The day a task felt small, it came back bigger than you." },
      { labelHi: "gift", textHi: "to yahi aapki chhupi kahani hai — pehla-kadam-pudhne-wala insaan, jiska asli imtihaan aage badhkar 'rukna nahi' nahi, 'sath lena' nikharga hai.", textEn: "So here is your hidden story — the one who moves first, whose real test is not speed but the courage to bring others along." },
    ],
  },
  2: {
    titleEn: "The hidden story of your life",
    titleHi: "aapki zindagi ki chhupi kahani",
    beats: [
      { labelHi: "hook", textHi: "aap bachpan se hi dhire-dhire padhte the — log bolte the 'dheema hai', par wo nahi jaante ki aap gehrai padhte ho.", textEn: "You always read slowly — people called you slow, but they never knew your reading was deep." },
      { labelHi: "design", textHi: "aapki design do baar sehi hoti hai: pehli baar sunne pe, doosri baar sach-maanne pe. isliye jitna log jaldi mein miss karte hain, aap utna catch karte hain.", textEn: "Your design runs through things twice: first to hear, then to believe. So you catch what hurried people miss." },
      { labelHi: "pattern", textHi: "notice karo — jahan bhi confusion tha, aap aksar last word the. aur log dhire dhire yahi aadat maan gaye.", textEn: "Notice the pattern: wherever there was confusion, your word often ended the discussion — and people slowly trusted that habit." },
      { labelHi: "cost", textHi: "is ka keemat: bahut baar aapne sunne ke chakkar mein apna point chhupa liya — aur raat ko ghutno pe ye pachhtawa aata raha 'us din bol diya hota'.", textEn: "The cost: listening often swallowed your own point — and late nights carried the quiet ache of 'I should have said it'." },
      { labelHi: "turn", textHi: "par yahi mod nikla: jis din aapne dheere bol ke sach kaha, us din aapki baat ke chhote shabd logon ko hila gaye.", textEn: "But here came the turn: the day you said the truth in your own slow words, your few words shook the room." },
      { labelHi: "gift", textHi: "aapki chhupi kahani: wo dheema-dhakkan insaan nahi — wo insaan jiska palat-kar sochna duniya ke ghadi ki tikri se aage jaata hai.", textEn: "Your hidden story: not a slow heart — a depth the world's stopwatch never learned to measure." },
    ],
  },
  3: {
    titleEn: "The hidden story of your life",
    titleHi: "aapki zindagi ki chhupi kahani",
    beats: [
      { labelHi: "hook", textHi: "aapke andar ek chulha hamesha jalta raha hai — bachpan se hi aapke mann mein ek se ek idea aate rahe, par kabhi kisi ne poocha nahi ki aap sab kuch ek saath kaise le ke bhaagte ho.", textEn: "There was always one more idea glowing inside you — school, home, anywhere — yet nobody ever asked how you managed to carry them all at once." },
      { labelHi: "design", textHi: "aapki design thi do baaton ki: kabhi poora josh, kabhi poora soch. jab dono ek din saath baithte hain, duniya mein aap se bada karne-wala kam hai.", textEn: "Your design carried two energies: full fire and full thought. On the days they sit at the same table together, few people can out-build you." },
      { labelHi: "pattern", textHi: "notice karo — aapke saare favourite projects ke beech hamesha ek adhoora page pada rahta hai: aapne shuru kiya, phir naya idea aa gaya aur pehla peeche chhut gaya.", textEn: "Notice the pattern: behind every passion project lay a half-open page — you began in joy, a new idea arrived, and the first one slipped out of sight." },
      { labelHi: "cost", textHi: "par is flame ki keemat ye rahi: log aapko 'bikhra hua' kehte the — aur aap raat-raat bhar yahi soch ke thak jaate rahe ki asli kaam wahi nikla jo aadha reh gaya.", textEn: "The cost was real: people read your brightness as scattered energy — and you quietly carried the ache of knowing your true work was the one left unfinished." },
      { labelHi: "turn", textHi: "lekin kahani ka mod yahi hai: jis din aapne apne saare josh ko ek jhanda ke neeche joda, aapke adhoore kaam mil kar logon ke liye umang ban gaye.", textEn: "But the turn came on the day you gathered your fires under one flag — and your half-built loves, standing together, became something that lifted everyone around you." },
      { labelHi: "gift", textHi: "to yahi aapki chhupi kahani hai — bikhri flame nahi, growing flame: jiska asli raaz shuru karne mein nahi, saare josh ko ek roshni mein jalane mein hai.", textEn: "So here is your hidden story — not a scattered flame, a growing one: your mastery is not in starting; it is in lighting many sparks from a single light." },
    ],
  },
  4: {
    titleEn: "The hidden story of your life",
    titleHi: "aapki zindagi ki chhupi kahani",
    beats: [
      { labelHi: "hook", textHi: "aap wo insaan ho jise bachpan se hi sab kuch theek-theek, seedha aur bharosemand banana aata tha — par log usi aadat ko dekh-kar bhaari samajh baithe, aur ye baat aapne kabhi bataayi nahi.", textEn: "You were the child who stacked things straight and made them hold — and grown people called it heavy-handed, though it was really care nobody could see." },
      { labelHi: "design", textHi: "aapki design mein ek hameesha wala dhang hai: jahan doosre sab cheezein tod-kar hatt jate hain, aap wahin aage ka plan bana dete ho. isliye ghar ho ya dukaan, log pehle aapko dhundte hain.", textEn: "Your design builds what stays: where others knock things loose and drift, you draft the next step in place. That is why homes and teams keep coming to you first." },
      { labelHi: "pattern", textHi: "notice karo — jab bhi cheezein bikhri, pehle aap hi uthhaate the: hisaab theek, ghar ka intezaam, sab kuch — aur isi intezaam mein aapki apni khushi peeche chhooti reh gayi.", textEn: "Notice the pattern: when hard days came, you became the wall — the accounts set right, the house in order — while your own small happiness never got a column of its own." },
      { labelHi: "cost", textHi: "par us diwar ki aadat ki keemat lagi: aap itne pakke dikhe ki log aapka haal tak nahi puchte — aur dheere dheere aapne apni thakaan chup kar rakhna seekh liya.", textEn: "The price of standing steady: people assumed the wall needed nothing — and slowly you learned to fold your weariness away so nobody would notice." },
      { labelHi: "turn", textHi: "par kahani ka mod yahi hai: jis din waqt ne aapki pakki deewar ka imtihaan liya, aap khade rahe — aur log tab aaye, kyunki tika hua insaan aaj-kal kam milta hai.", textEn: "But the turn came on the day time tested your wall: you stood — and people finally came close, because someone who stays has grown rare in their lives." },
      { labelHi: "gift", textHi: "to yahi aapki chhupi kahani hai — saakht insaan nahi, wall builder: jiska raaz saakht hone mein nahi, itna dhang banaana hai ki doosre dil uske andar ruk sake.", textEn: "So here is your hidden story — not a rigid person, a wall builder: your mastery is not holding tight, it is building order other hearts can rest inside." },
    ],
  },
  5: {
    titleEn: "The hidden story of your life",
    titleHi: "aapki zindagi ki chhupi kahani",
    beats: [
      { labelHi: "hook", textHi: "aapki baat mein shuru se hi ek chamak thi — aap jahan bolte the, log sunte the. par yeh kaun kehta ki chamak ke peeche aapka mann kaafi akela rehta hai.", textEn: "Your words carried a shine from the start — when you spoke, people listened. Yet the full truth was that something in you always kept half of it unsaid." },
      { labelHi: "design", textHi: "aapki design mein do cheezein ek saath aayi: bolne ki taakat aur bandhe na jaane-wala mann. isliye aap jahan bhi gaye, ghanto baatein bani — aur phir achhank doori ka mann karta tha.", textEn: "Your design brought two gifts together: a silver tongue and a mind that refuses leashes. So wherever you went, hours of talk followed — and then came the sudden pull away." },
      { labelHi: "pattern", textHi: "notice karo — jab bhi koi rishta ya kaam aapko bandh-ne laga, aap ne naya raasta dhundh liya: naya dost, naya shahar, nayi baat. chalna aapke liye ghar jaisa tha, tikna mehmaan.", textEn: "Notice the pattern: whenever work or a bond began to cage you, you found a fresh path — a new friend, a new city, a new argument. Movement kept rescuing you." },
      { labelHi: "cost", textHi: "is chamak ki keemat: bahut log aapko sirf baton ka saudagar samajh baithe — aur aapki asli gehrai chhoone ke liye unke paas waqt hi nahi raha. andar se aap ye dekh kar thak jaate rahe.", textEn: "The cost lands here: people took you for a seller of nice words — nobody sat long enough to meet your depth. You wearied quietly of being heard but never known." },
      { labelHi: "turn", textHi: "par yahi mod nikla: jis din aapne saalon se dabaye hue sach ko sab ke saamne kaha, poora kamra chup ho gaya — us roz aapki asli gehrai logon ko dikh hi gayi.", textEn: "But the turn came the day the long-held truth left your mouth — the room went quiet, and for the first time people saw the depth under the sparkle." },
      { labelHi: "gift", textHi: "to yahi aapki chhupi kahani hai — bas chal-te-rahe jaise musafir nahi: ek aisi zubaan jiske shabd darvaaze ban gaye, aur jiska asli imtihaan hai waqt se tikna.", textEn: "So here is your hidden story — not a restless wanderer, a silver tongue: your gift is a voice that opened doors, and your mastery is choosing which ones to stay inside." },
    ],
  },
  6: {
    titleEn: "The hidden story of your life",
    titleHi: "aapki zindagi ki chhupi kahani",
    beats: [
      { labelHi: "hook", textHi: "aapne bachpan se hi apne logon ko pehle rakha — apni baat baad mein, ghar ki zarurat pehle. kisi ne yahi nahi kaha ki pehla khayal aap bhi deserve karte ho.", textEn: "You learned early to put your people first — your own matter waited, the house's need did not. No one ever said you deserved first place too." },
      { labelHi: "design", textHi: "aapki design mein do cheezein aayi hai: seva ka khoyara dil aur ghar ka poora khayal. isliye aap jo bhi jodte ho — rishta, dosti, family — usko apna dharm maankar nibhaate ho.", textEn: "Your design carried a warm heart plus full care of the home — so every bond you made became a duty of love that you honoured without being asked." },
      { labelHi: "pattern", textHi: "notice karo — jis bhi din kisi apne ko zarurat thi, aap sab se pehle pahunche: roti leke, baith ke sunne, aur ghar waqt se sambhaale. aapne kabhi inhe ehsaan nahi bataaya.", textEn: "Notice the pattern: whenever someone close needed food, comfort or a place to fall, you arrived first — and you never once called any of it a favour." },
      { labelHi: "cost", textHi: "par is dil ki keemat bhaari hai: aap roz itna le lete ho ki aksar raat ko thake hue so jaate ho — aur chupke se yahi sochte ho ki 'agar main na rahu to kaun sambhale'.", textEn: "The cost of this warmth: you keep carrying until your body whispers to stop — then lie awake wondering who would hold the family if you ever set it down." },
      { labelHi: "turn", textHi: "par kahani ka mod yahi hai: jis din aapne apne liye thoda sa waqt rakha, log ek aapke bina bhi sambhal gaye — aur tab aapko dikha ki aap ka bhi khayal zaroori hai.", textEn: "But the turn came the first time you saved an hour for yourself: your people held steady — and you finally saw that love that includes you is still love." },
      { labelHi: "gift", textHi: "to yahi aapki chhupi kahani hai — sab ka boojh uthane wale nahi, family flame: jiska raaz sab pe qurbani nahi, itna pyaar baant-na ki apne liye bhi thoda bacha rahe.", textEn: "So here is your hidden story — not a bearer of every load, a family flame: your mastery is not sacrifice, it is a love large enough to hold yourself inside it." },
    ],
  },
  7: {
    titleEn: "The hidden story of your life",
    titleHi: "aapki zindagi ki chhupi kahani",
    beats: [
      { labelHi: "hook", textHi: "aapka mann shuru se thoda alag chala — jab log dher mein khush the, aap akele baith kar soch rahe the: duniya ke peeche asli raaj kya hai. log keh gaye 'akele', aap apni taraf se chup rahe.", textEn: "Your mind walked alone from the start — while the crowd laughed together, you sat apart asking what truly sits behind it all. People called it isolating; you called it honest." },
      { labelHi: "design", textHi: "aapki design mein gehrai ka hissa banta gaya: jahan doosre jhund mein jhankte the, aap ek-ek patthar utha-kar dekh rahe the — isliye raaj aap ko sab se gehre mila.", textEn: "Your design dug for depth where others glanced — stone by stone you turned things over, and the secrets that stayed hidden from the crowd landed in your hands." },
      { labelHi: "pattern", textHi: "notice karo — jab bhi naya sach aaya, aap pehle akele aazaama: padha, socha, phir apna banaya. dheere dheere yahi aadaat ban gayi — asli jawab akele baithne se hi aata hai.", textEn: "Notice the pattern: new truths always came to you first privately — you read, sat with them, then made them your own. The habit grew: the real answer waits alone." },
      { labelHi: "cost", textHi: "par is raaste ki keemat lag gayi: log aapko gehra samajh-ne mein haar maane aur aage nikal gaye — aap andar tak gehra poora ho gaya, par ek raat apni mehfil mein sab se akela baitha mila.", textEn: "The cost of the long road: people gave up reading you and moved on — and one night you looked around your own gathering and found yourself the stranger in the crowd." },
      { labelHi: "turn", textHi: "par kahani ka mod yahi hai: ek raat kisi adhoore insaan ne aapse ek hi sawaal kiya — aur aapka jawab uski asli raah ban gaya. tab aapne dekha: aapki akele roshni kisi ke liye lantern sabit hui thi.", textEn: "But the turn: the night a struggling person asked you one question, your answer lit their road — and you finally saw your lone lamp was never for only you." },
      { labelHi: "gift", textHi: "to yahi aapki chhupi kahani hai — akela raahi nahi, lone lantern: jiska raaz bheed se chhupna nahi, apni bati ko akhri raaste par khada kar jana hai.", textEn: "So here is your hidden story — not a stranger at the edge, a lone lantern: your mastery is not hiding the light, it is placing it exactly where a lost walker needs it." },
    ],
  },
  8: {
    titleEn: "The hidden story of your life",
    titleHi: "aapki zindagi ki chhupi kahani",
    beats: [
      { labelHi: "hook", textHi: "aapko har achhi cheez der se mili — pehli badi safalta sab se aakhri aayi. log keh gaye 'dheema hai', par dheere aane wali cheez ki wajah wo aaj tak nahi jaante.", textEn: "Everything true in your life arrived slow — your first win came long after everyone else's. People read it as slowness; they never learned what delay was actually building." },
      { labelHi: "design", textHi: "aapki design mein pahad ki haddi hai: jahan doosre jaldi mein upar chadh jaate hain, aap ek ek kadma naap kar chalte hain — aur wahi naapna baad mein aapko duniya mein bada banata hai.", textEn: "Your design has mountain bone: where the quick climb fast, you measure every step — and that very measuring is what eventually makes you large in the world." },
      { labelHi: "pattern", textHi: "notice karo — aap jo bhi aaj apne paas hai, uska hisaab aapne aaj nahi, saalon mein banaaya hai. jaldi mein aane wale log aap se aage nikal gaye, par pahad kabhi jaldi nahi deta.", textEn: "Notice the pattern: whatever you hold today, you didn't rush into — you grew it over seasons. The quick ones crossed you years back, yet the mountain never hurries." },
      { labelHi: "cost", textHi: "par deri ki keemat bhaari lagi: aap saalon tak chup rahe — andar se yahi soch ke thak gaye ki jab tak aapka waqt na aaye, log aapki asli taakat samajh nahi paate.", textEn: "The cost of delay was real: for whole years you stayed quiet while being misread — and the waiting quietly taught you to doubt the very strength you carried." },
      { labelHi: "turn", textHi: "par kahani ka mod yahi hai: jab aapka waqt aaya aur pahad aapke naam pe khada hua, jaldi-jaldi chal-ne wale log ek ek karke aapke paas laute — tab aapne dekha: sab se majboot cheez pehle intezaar maangti hai.", textEn: "But the turn: the day your hour finally came, the rushers returned one by one — and you saw plainly that the mightiest things in life first ask for patience." },
      { labelHi: "gift", textHi: "to yahi aapki chhupi kahani hai — dheere chalne wale nahi, slow mountain: jiska raaz dher se milna nahi, jis dhang se aap har deri ko apni buniyaad banate ho.", textEn: "So here is your hidden story — not a latecomer, a slow mountain: your mastery is not patience endured, it is turning every delay into foundation ground." },
    ],
  },
  9: {
    titleEn: "The hidden story of your life",
    titleHi: "aapki zindagi ki chhupi kahani",
    beats: [
      { labelHi: "hook", textHi: "aap insaan shuru se hi baant-te aaye — apni seekh, apna waqt, apna dil. par ek sawaal sab se pehle aaya: itna sab baante hue, aap khud kahan khade the.", textEn: "You gave from the start — your learning, your hours, your heart. But one question arrived before all of it: while pouring out, where exactly were you standing?" },
      { labelHi: "design", textHi: "aapki design poori hai: jo aapne seekha wo samajh ban gaya, jo samajh aaya wo aapke logon ke liye nikla. isliye aapki zindagi ek nadia hui — sab ke liye raasta, aur aap sab se aakhri.", textEn: "Your design runs complete: what you learned became understanding, and what you understood kept pouring out for the people around you — a wide river that carries many boats." },
      { labelHi: "pattern", textHi: "notice karo — jab tak aapka kaam poora nahi hota, aap ruk-te nahi: shuru se aakhri tak, chahe us mein saal kyun na lage. aur raaste mein aaye logon ko aap aage badhaate rahe.", textEn: "Notice the pattern: you don't stop mid-way — from the first turn to the last, even when seasons pass. And along the way you kept lifting every person who walked beside you." },
      { labelHi: "cost", textHi: "par sab se aakhri mein jo aata hai, uski keemat sab se bhaari hai: aapne logon ki poori kahaniyan likhi, apni kahani aadhi chhut gayi — aur andar se ek din yahi aawaz aayi: 'ab to poora ho gaya, par mera kya hai'.", textEn: "The cost of completion arrives last and lands heavy: you carried everyone's full story while your own stayed half-written — and the ache knew its way home." },
      { labelHi: "turn", textHi: "par kahani ka mod yahi hai: jis din aapne apni adhoori kahani bhi likhna shuru kiya, tab aapne dekha — jo poora ban gaya usko chhodna bhi ek asli mukti nikli.", textEn: "But the turn: the day you gave your own half-written story a page, you finally saw it — letting go of what became whole is itself the freedom you always gave others." },
      { labelHi: "gift", textHi: "to yahi aapki chhupi kahani hai — sab ki kahaniyan sambhale wale nahi, wide river: jiska asli raaz sab ko baante rahe jaana nahi, sab ki zarurat mein ek din apni zarurat bhi shamil ho jaana.", textEn: "So here is your hidden story — not a keeper of everyone's tale, a wide river: your mastery is not giving endlessly, it is leaving room for your own story to finish." },
    ],
  },
};

export const GENERIC: StoryBeat[] = [
  { labelHi: "hook", textHi: "aapki zindagi ke aage peeche ek hi pattern chal raha hai — aur wo pattern kisi ne aapko kabhi saaf nahi bataya.", textEn: "One pattern has been running through your whole life — and no one ever laid it out plainly for you." },
  { labelHi: "design", textHi: "aapki design mein zaruri zaruri kharch hote hain: aap logon se pehle samajhte ho, aur parinaam mein pehchaan aati hai — isliye aapki zindagi sab se jaldi bharosa maangti hai aur sab se dher se deti hai.", textEn: "Your design pays its dues early: you understand people before they show their cards — which is why life keeps demanding trust you only give slowly." },
  { labelHi: "cost", textHi: "is design ki keemat yahi hai — jab tak aap bharosa nahi karte, tum logon ke liye 'tough se tough' dikhte ho, aur andar thake hue ho.", textEn: "The cost: until you hand over trust, you look the toughest to people — while inside you are the most tired." },
  { labelHi: "turn", textHi: "par kahani ka mod wahi hai: aapki zindagi ne aapko pehle akele padha — kyunki uska plan aapko kisi ke Sahara banane ka tha, kisi ke sahare ka nahi.", textEn: "But the story turns here: life taught you to stand alone first — not because it wanted you lonely, but because it was building you into someone others can rest against." },
  { labelHi: "gift", textHi: "to yahi aapki chhupi kahani hai — aur agli chapter mein iska raasta: jeevan-map, jahan aapki saalon-wali kahani ke pahad aur nadi dono saaf dikhegi.", textEn: "That is your hidden story — and next comes its ground: the Life Map, where your years will rise like a river across mountains." },
];

/** mulank-keyed hidden story; falls back gracefully for 3-9 until copy bank expands. */
export function hiddenStoryOf(mulank: number): HiddenStory {
  const m = ((mulank % 9) + 9) % 9 || 9;
  return STORIES[m] || {
    titleEn: "The hidden story of your life",
    titleHi: "aapki zindagi ki chhupi kahani",
    beats: GENERIC.map((b) => ({ ...b, labelHi: b.labelHi })),
  };
}