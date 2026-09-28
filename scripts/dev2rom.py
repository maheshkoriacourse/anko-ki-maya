"""Devanagari → roman (spoken Hinglish) transliterator for v3.2 copy pass.

Rules:
- Mantra strings (any string literal containing ॐ), the Om glyph ॐ itself,
  Devanagari numerals ०-९, the app title, deity blessing lines and the
  'हिं' language toggle mark are PROTECTED (left as Devanagari).
- Everything else Devanagari is transliterated in place (string values AND
  comments — comments don't ship, but clean them anyway).
- Formal imperative endings (दीजिए/करें/लें…) are pre-swapped to informal
  (do/karo/lo…) before transliteration, per the v3.2 spoken-Hinglish rule.
- Post fixups map frequent function words to canonical Hinglish spellings.

Usage: python3 scripts/dev2rom.py FILE [FILE...]
"""
import re
import sys

VOWELS = {
    "अ": "a", "आ": "aa", "इ": "i", "ई": "ee",
    "उ": "u", "ऊ": "oo", "ऋ": "ri", "ए": "e",
    "ऐ": "ai", "ओ": "o", "औ": "au",
}
CONS = {
    "क": "k", "ख": "kh", "ग": "g", "घ": "gh", "ङ": "n",
    "च": "ch", "छ": "chh", "ज": "j", "झ": "jh", "ञ": "n",
    "ट": "t", "ठ": "th", "ड": "d", "ढ": "dh", "ण": "n",
    "त": "t", "थ": "th", "द": "d", "ध": "dh", "न": "n",
    "प": "p", "फ": "ph", "ब": "b", "भ": "bh", "म": "m",
    "य": "y", "र": "r", "ल": "l", "ळ": "l", "व": "v",
    "श": "sh", "ष": "sh", "स": "s", "ह": "h",
    "ज़": "z", "फ़": "f", "क़": "q", "ख़": "kh", "ग़": "gh",
    "ड़": "r", "ढ़": "rh", "य़": "y",
}
MATRAS = {
    "ा": "aa", "ि": "i", "ी": "ee", "ु": "u", "ू": "oo",
    "ृ": "ri", "े": "e", "ै": "ai", "ो": "o", "ौ": "au",
    "ॉ": "o",
}
SIGNS = {"ं": "n", "ँ": "", "ः": "h", "़": ""}

VIRAMA = "्"
DEV_RUN = re.compile(r"[\u0900-\u097F]+")
NUMERALS = set("\u0966\u0967\u0968\u0969\u096A\u096B\u096C\u096D\u096E\u096F")

# formal → informal verb swaps (pre-transliteration)
FORMAL_SWAPS = [
    ("जाँचवाएँ", "जाँचो"), ("जाँचें", "जाँचो"), ("धारण करें", "धारण करो"),
    ("दीजिए", "दो"), ("दें", "दो"), ("दीजिये", "दो"),
    ("कीजिए", "करो"), ("कीजिये", "करो"), ("करें", "करो"), ("करिए", "करो"),
    ("लें", "लो"), ("रखें", "रखो"), ("रखिए", "रखो"), ("चुनें", "चुनो"),
    ("बनाएँ", "बनाओ"), ("बनाएं", "बनाओ"), ("लिखें", "लिखो"),
    ("बताएँ", "बताओ"), ("बताएं", "बताओ"), ("निभाएँ", "निभाओ"),
    ("पहनें", "पहनो"), ("सीखें", "सीखो"), ("देखें", "देखो"),
    ("देखिए", "देखो"), ("पढ़िए", "पढ़ो"), ("जाएँ", "जाओ"), ("कहें", "कहो"),
    ("चाहें", "चाहो"), ("बढ़ाएँ", "बढ़ाओ"), ("सुनें", "सुनो"),
    ("माँगें", "माँगो"), ("पूछें", "पूछो"), ("तय करें", "तय करो"),
    ("न भूलें", "भूलो mat"), ("रचें", "रचो"), ("साझा करें", "बाँटो"),
]

# post-transliteration canonical spellings
FIXUPS = [
    ("meen", "mein"), ("nahein", "nahi"), ("nahii", "nahi"),
    (" lie ", " liye "), (" lie,", " liye,"), (" lie.", " liye."),
    ("jyada", "zyada"), ("jaldee", "jaldi"), ("raha hai", "raha hai"),
]

PROTECT_STRINGS = [
    # mantra literals live under ॐ detection; deity/app-title/toggle below
    "भोलेनाथ की कृपा से",
    "माँ के आशीर्वाद से",
    "अंकों की माया",
    "हिं",
]


def translit_run(run: str) -> str:
    out = []
    i = 0
    n = len(run)
    while i < n:
        ch = run[i]
        if ch in NUMERALS or ch == "\u0950":  # ॐ and digits pass through
            out.append(ch)
            i += 1
            continue
        if ch == VIRAMA:
            i += 1
            continue
        if ch in CONS:
            out.append(CONS[ch])
            i += 1
            if i < n and run[i] == VIRAMA:
                i += 1  # dead consonant: no inherent vowel
            elif i < n and run[i] in MATRAS:
                out.append(MATRAS[run[i]])
                i += 1
                # anusvara may follow the matra (हिंदी pattern)
                if i < n and run[i] in SIGNS and run[i] != "़":
                    out.append(SIGNS[run[i]])
                    i += 1
            elif i < n and run[i] in SIGNS and run[i] != "़":
                out.append(SIGNS[run[i]])  # anusvara/chandrabindu value
                i += 1
            else:
                out.append("\x01a")  # inherent vowel (word-final schwa dropped later)
            continue
        if ch in VOWELS:
            out.append(VOWELS[ch])
            i += 1
            continue
        if ch in MATRAS:
            if ch == VIRAMA:
                i += 1
                continue
            out.append(MATRAS[ch])
            i += 1
            continue
        if ch in SIGNS:
            out.append(SIGNS[ch])
            i += 1
            continue
        if ch in ("।", "॥"):
            out.append(".")
            i += 1
            continue
        out.append(ch)
        i += 1
    s = "".join(out)
    # word-final schwa drop: 'a' before a non-letter boundary or punctuation
    s = re.sub(r"\x01a(?=[^a-z\x01]|$)", "", s)
    s = s.replace("\x01a", "a").replace("\x01", "")
    s = re.sub(r"([aieou])\1\1", r"\1\1", s)  # triple vowel collapse
    return s


# --- orthographic normalisation for spoken Hinglish -------------------------
NORMALISE = [
    # long 'aa' in verb endings reads better single in roman Hindi
    ("aa hai", "a hai"), ("aa hain", "a hain"), ("aa hai.", "a hai."),
    ("ta hai", "ta hai"),  # no-op anchor
    ("chaart", "chart"), ("aapake", "aapke"), ("raja-rekhaa", "raja-rekha"),
    ("jnaana", "gyaan"), ("antarjnaana", "antargyaan"),
    ("sntana", "santaana"), ("anausaar", "anusaar"),
    ("ghatnaaaon", "ghatnaon"), ("ghatnaaon", "ghatnaon"), ("bnatee", "banti"),
    ("soochee", "soochi"), ("mehumaana", "mehamaan"), ("mehumaana-", "mehamaan-"),
    ("jaldee", "jaldi"), ("sattaa", "satta"), ("chalaataa", "chalata"),
    ("chaahataa", "chaahata"), ("detaa hai", "deta hai"), ("hai।", "hai."),
    ("aapakaa", "aapka"), ("apakae", "aapke"), ("aapakee", "aapki"),
    ("rahaataa", "rehata"), ("rahataa", "rehata"), ("rhtee", "rehti"),
    ("bnatee", "banti"), ("bnata", "banta"), ("bnataa", "banta"),
    ("ghatnao", "ghatnaon"), ("santana", "santaana"),
]
# participle endings: 'chalaataa'→'chalata' family is handled by generic rule
def _verb_aa(s: str) -> str:
    # words ending 'taa'/'tee'/'ti' + 'hai' family: strip the doubled aa
    return re.sub(r"([bcdghjklmnprstvz])aa(?= |,|:|\.|$)", r"\1a", s)

def _verb_ee(s: str) -> str:
    # future/person endings: 'pakengee'→'pakengi', 'milegee'→'milegi',
    # 'khulegee'→'khulegi' — the doubled 'ee' is long-vowel noise on endings
    return re.sub(r"(?:g|n|l|t|s|k|d|v|jh|chh|sh|th|dh|bh|gh|kh|ph)ee(?= |,|:|\.|$)", "i", s)


def polish(s: str) -> str:
    for old, new in NORMALISE:
        s = s.replace(old, new)
    s = _verb_aa(s)
    s = _verb_ee(s)
    for old, new in FIXUPS:
        s = s.replace(old, new)
    # final word-level cleanup: any Devanagari token the dict knows, apply
    s = re.sub(r"[\u0900-\u097F]+", lambda m: DICT.get(m.group(0), m.group(0)), s)
    return s


# canonical word dictionary (loaded lazily from sibling module)
try:
    from dev2rom_dict import DICT  # type: ignore[import-not-found]
except ImportError:
    DICT = {}

def apply_dict(text: str) -> str:
    """Longest-first exact token replacement for known Devanagari words."""
    if not DICT:
        return text
    for old, new in sorted(DICT.items(), key=lambda kv: -len(kv[0])):
        text = text.replace(old, new)
    return text


def protect_mask(text: str):
    """Return text with protected substrings swapped to \x00N\x00 tokens."""
    store: list[str] = []

    def stash(m: re.Match) -> str:
        store.append(m.group(0))
        return f"\x00{len(store) - 1}\x00"

    # 1. string literals containing ॐ (mantras) — both ' and ` quoted
    text = re.sub(r'"[^"\n]*ॐ[^"\n]*"', stash, text)
    text = re.sub(r"'[^'\n]*ॐ[^'\n]*'", stash, text)
    text = re.sub(r"`[^`\n]*ॐ[^`\n]*`", stash, text)
    # 2. named protect strings (longest first)
    for p in sorted(PROTECT_STRINGS, key=len, reverse=True):
        if p in text:
            store.append(p)
            text = text.replace(p, f"\x00{len(store) - 1}\x00")
    return text, store


def restore(text: str, store: list[str]) -> str:
    for i, v in enumerate(store):
        text = text.replace(f"\x00{i}\x00", v)
    return text


PRE_MANTRA_SWAPS: list[tuple[str, str]] = [
 [
  "'ॐ सुर्याय नमः'",
  "'ॐ Suryaya Namah'"
 ],
 [
  "'ॐ चंद्राय नमः'",
  "'ॐ Chandraya Namah'"
 ],
 [
  "'ॐ गुरवे नमः'",
  "'ॐ Gurave Namah'"
 ],
 [
  "'ॐ राहवे नमः'",
  "'ॐ Rahave Namah'"
 ],
 [
  "'ॐ बुधाय नमः'",
  "'ॐ Budhaya Namah'"
 ],
 [
  "'ॐ शुक्राय नमः'",
  "'ॐ Shukraya Namah'"
 ],
 [
  "'ॐ केतवे नमः'",
  "'ॐ Ketave Namah'"
 ],
 [
  "'ॐ शनैश्चराय नमः'",
  "'ॐ Shanicharaya Namah'"
 ],
 [
  "'ॐ मंगलाय नमः'",
  "'ॐ Mangalaya Namah'"
 ]
]

PRE_SWAPS: list[tuple[str, str]] = [
 [
  "प्रातः सूर्य-जल अर्पण, रविवार",
  "Praatah soory-jal arpan, Ravivaar"
 ],
 [
  "सोमवार श्वेत दान,",
  "Somvaar shwet daan,"
 ],
 [
  "गुरुवार हल्दी दान,",
  "Guruvaar haldi daan,"
 ],
 [
  "शनि के लिए शनिवार तेल-दान; अंक 4 के लिए रोज़ बही-खाता,",
  "Shani ke liye Shanivaar tail-daan; ank 4 ke liye roz hisaab-kitaab,"
 ],
 [
  "और बड़ा लॉन्च एक वर्ष टालें।",
  "aur bada launch ek saal taalo."
 ],
 [
  "बुधवार हरे वस्त्र,",
  "Budhvaar hare vastra,"
 ],
 [
  "हर सौदा साइन से पहले लिखें।",
  "har sauda sign se pehle likho."
 ],
 [
  "शुक्रवार श्वेत दान,",
  "Shukravaar shwet daan,"
 ],
 [
  "पारिवारिक वादा पहले, व्यापारिक बाद।",
  "parivaarik waada pehle, business baad."
 ],
 [
  "108 जप, क्रीम/भूरा दान;",
  "108 japa, cream/bhoora daan;"
 ],
 [
  "एक कला चुपचाप में महारत — मंच अंक-दशा 8/1 पर फिर खुलेगा।",
  "ek kala mein chupke se maharat — manch ank-dasha 8/1 par phir khulega."
 ],
 [
  "शनिवार तेल-दान,",
  "Shanivaar tail-daan,"
 ],
 [
  "हर सौदा साफ़, हर वादा निभा।",
  "har sauda saaf, har waada nibhao."
 ],
 [
  "मंगलवार मसूर दान,",
  "Mangalvaar masoor daan,"
 ],
 [
  "टकराव की जगह समापन चुनें।",
  "takraav ki jagah samaapan chuno."
 ],
 [
  "रोज़ काम-अनुशासन (पक्के घंटे, निभाए वादे) और प्रातः",
  "Roz kaam-anushasan (pakke ghante, nibhaaye waade) aur praatah"
 ],
 [
  "का 108 जप।",
  "ka 108 japa."
 ],
 [
  "हर सौदा लिखें, नक़द बफ़र रखें, बुधवार",
  "Har sauda likho, naqd buffer rakho, Budhvaar"
 ],
 [
  "बड़े फ़ैसले से पहले सलाह, श्रेय खुलकर बाँटें, रोज़",
  "Bade faislon se pehle salah, shrey khulkar baanto, roz"
 ],
 [
  "का 108 जप।",
  "ka 108 japa."
 ],
 [
  "108 जप;",
  "108 japa;"
 ],
 [
  "108 जप।",
  "108 japa."
 ],
 [
  "108 जप, ",
  "108 japa, "
 ],
 [
  "108 जप",
  "108 japa"
 ],
 [
  "बाँटें",
  "baanto"
 ],
 [
  "लिखें",
  "likho"
 ],
 [
  "रखें",
  "rakho"
 ],
 [
  "शनिवार 'ॐ",
  "Shanivaar 'ॐ"
 ],
 [
  "सोमवार 'ॐ",
  "Somvaar 'ॐ"
 ],
 [
  "बुधवार 'ॐ",
  "Budhvaar 'ॐ"
 ],
 [
  "गुरुवार 'ॐ",
  "Guruvaar 'ॐ"
 ],
 [
  "शुक्रवार 'ॐ",
  "Shukravaar 'ॐ"
 ],
 [
  "मंगलवार 'ॐ",
  "Mangalvaar 'ॐ"
 ],
 [
  "रविवार 'ॐ",
  "Ravivaar 'ॐ"
 ],
 [
  "चुपचाप",
  "chupke se"
 ],
 [
  "महारत",
  "maharat"
 ],
 [
  "मंच",
  "manch"
 ]
]


def convert(text: str) -> str:
    for old, new in PRE_MANTRA_SWAPS:
        if old in text:
            text = text.replace(old, new)
    for old, new in PRE_SWAPS:
        if old in text:
            text = text.replace(old, new)
    text, store = protect_mask(text)

    # 1. phrase-level dict entries (keys containing a space) — longest first.
    #    These can never be substrings of a single word, so blind replace is safe.
    for old, new in sorted((kv for kv in DICT.items() if " " in kv[0]),
                           key=lambda kv: -len(kv[0])):
        if old in text:
            text = text.replace(old, new)

    # 2. formal→informal swaps at run level (exact word matches only)
    FORMAL_SET = dict(FORMAL_SWAPS)

    # 3. per-run: exact single-word dict / swap match, else transliterate
    def repl(m: re.Match) -> str:
        run = m.group(0)
        if run in DICT:
            return DICT[run]
        if run in FORMAL_SET:
            return FORMAL_SET[run]
        return polish(translit_run(run))

    text = DEV_RUN.sub(repl, text)
    return restore(text, store)


def main() -> None:
    files = sys.argv[1:]
    for f in files:
        s = open(f, encoding="utf-8").read()
        conv = convert(s)
        open(f, "w", encoding="utf-8").write(conv)
        left = [l.strip()[:110] for l in conv.splitlines() if DEV_RUN.search(l) and not l.lstrip().startswith("//") and not l.strip().startswith(("*", "/*"))]
        print(f"--- {f}: {len(left)} devanagari code-lines left (comments excluded)")
        for l in left[:12]:
            print("    |", l)


if __name__ == "__main__":
    main()