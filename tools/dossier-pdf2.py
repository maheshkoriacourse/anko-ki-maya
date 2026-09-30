#!/usr/bin/env python3
"""
v6.1 AKASHIC DOSSIER — LUXURY PDF GENERATOR with LANGUAGE OPTION (Mahesh ka order,
30 Sep: "dossier pdf me kis language me chahiye uska option do").

Languages:
  en    = English chapters
  hi    = Hinglish-Hindi chapters (roman-script, spoken voice)
  both  = EN book pehle + HI book baad (deluxe 2-in-1)
Usage:
  python3 dossier-pdf.py "Name" D M YYYY out.pdf --lang=en|hi|both
Default: both.
Works from a snapshot JSON produced by the bridge (_dossier_bridge.mts) so the
TS engines stay the single source of truth. If no snapshot exists, it runs tsx.
"""
import sys, subprocess, json as J, html, os

REPO = "/home/maheshkoria/anko-ki-maya"
SCRATCH = "/home/maheshkoria/.hermes/cache/scratch"
SNAPSHOT = "/tmp/bridge-out.json"

def esc(s): return html.escape(str(s))
def p(x): return f"<p>{esc(x)}</p>"
def li(xs): return "<ul>" + "".join(f"<li>{esc(x)}</li>" for x in xs) + "</ul>"

def nums_of(d, m, y):
    calc = subprocess.run(["node", "-e", f'''
const d={d}, m={m}, y={y};
const digits=(n)=>String(n).split('').reduce((s,x)=>s+ +x,0);
let mul=d; while(mul>9&&![11,22].includes(mul)) mul=digits(mul);
let bp=digits(digits(digits(String(d))+digits(String(m)))+digits(String(y)));
while(String(bp).split('').length>1&&![11,22,33].includes(bp)) bp=digits(String(bp));
const now=new Date(); const b=new Date(`${{y}}-${{m}}-${{d}}T06:00:00Z`);
let age=now.getFullYear()-b.getFullYear();
if(now.getMonth()+1<m||(now.getMonth()+1===m&&now.getDate()<d)) age--;
console.log(JSON.stringify({{mul,bp,age}}));
'''], capture_output=True, text=True, cwd=REPO)
    n = J.loads(calc.stdout.strip())
    return n["mul"], n["bp"], n["age"]

def data_of(name, M, B, A, y, m, d):
    res = subprocess.run(["npx", "--yes", "tsx", f"{SCRATCH}/_dossier_bridge.mts", name, str(M), str(B), str(A), str(y), str(m), str(d)],
                         capture_output=True, text=True, cwd=REPO, timeout=180)
    if res.returncode != 0:
        print("BRIDGE STDERR:", res.stderr[:600]); sys.exit(1)
    return J.loads(res.stdout)

def label_from_key(k):
    import re
    return re.sub(r"(?<!^)(?=[A-Z])", " ", k[:-2]).title()

def render_book(data, lang, name):
    E = lang == "en"
    pick = lambda en, hi: (en if E else hi)
    ARC = data["archetype"]

    ch1 = f"<section><h2>{esc(pick('Chapter One — Who Are You, Really?', 'Chapter One — Who Are You, Truly?'))}</h2>"
    ch1 += f"<div class='beat'><h3 style='color:#f0cf74'>{esc(pick(ARC['name'], ARC['nameHi']))}</h3><p class='it'>{esc(pick(ARC.get('crestEn',''), ARC.get('crestHi', ARC.get('crestEn',''))))}</p></div>"
    ch1 += p(pick(ARC["coreEn"], ARC["coreHi"]))
    ch1 += f"<p class='lab'>{esc(pick('Strengths','Shaktiyan'))}</p>{li(pick(ARC['strengthsEn'], ARC['strengthsHi']))}"
    ch1 += f"<div class='wound'><p class='lab'>{esc(pick('The hidden weakness nobody names','Chhupi kamzori — jo koi nahi batata'))}</p>{p(pick(ARC['shadowEn'], ARC['shadowHi']))}<p class='it'>{esc(pick(ARC['redemptionEn'], ARC['redemptionHi']))}</p></div>"
    ch1 += p(pick(ARC["purposeEn"], ARC["purposeHi"])) + p(pick(ARC["growthEn"], ARC["growthHi"])) + "</section>"

    STORY = "".join(f"<p class='beat'><span class='lab'>{esc(b['labelHi'].upper())}</span> {esc(pick(b['textEn'], b['textHi']))}</p>" for b in data["story"]["beats"])
    ch2 = f"<section><h2>{esc(pick('Chapter Two — The Hidden Story of Your Life','Chapter Two — The Hidden Story'))}</h2>{STORY}<p class='cliff'>{esc(pick('Next: the Life Map — your years rise like a river.','Next chapter: Life-Map — your years like a river.'))}</p></section>"

    BANDS = "".join(
        f"<div class='beat'><p><b>{mb['fromAge']}–{mb['toAge']}</b> · {esc(pick(mb['nameEn'], mb['nameHi']))}</p>"
        f"{p(pick(mb['gistEn'], mb['gistHi']))}<p class='mut'>{esc(mb['basis'])}</p></div>" for mb in data["map"]["bands"])
    ch3 = f"<section><h2>{esc(pick('Chapter Three — The Years That Shaped You','Chapter Three — The Years That Built You'))}</h2>{BANDS}<p class='cliff'>{esc(pick('Behind every bend lies a wound you never saw clearly…','Behind every turn there is a wound that you never fully saw…'))}</p></section>"

    WOUNDS = "".join(
        f"<div class='wound'><h3>{esc(pick(w['nameEn'], w['nameHi']))}</h3>"
        f"{p(pick(w['howItFormsEn'], w['howItFormsHi']))}{p(pick(w['howItShowsEn'], w['howItShowsHi']))}"
        f"<div class='heal'><p class='lab'>{esc(pick('The healing path','Path to healing'))}</p><p class='it'>{esc(pick(w['redemptionEn'], w['redemptionHi']))}</p></div>"
        f"<div class='upay'><p class='lab gold'>{esc(pick('Start today','Start today'))}</p>{li(pick(w['upayEn'], w['upayHi']))}<p class='mut'>{esc(w['basis'])}</p></div></div>"
        for w in data["wounds"])
    ch4 = f"<section><h2>{esc(pick('Chapter Four — The Wounds You Never Healed','Chapter Four — The Wounds That Never Fully Healed'))}</h2>{WOUNDS}</section>"

    LV = data["love"]
    LOVE = ""
    for k, v in LV.items():
        if k.endswith("En") and isinstance(v, str):
            kHi = k[:-2] + "Hi"
            LOVE += f"<div class='lb'><h4>{esc(label_from_key(k))}</h4>{p(pick(v, LV.get(kHi, v)))}</div>"
    ACTS = "".join(
        f"<div class='act'><p class='gold'><b>Act {i+1}: {esc(pick(a.get('nameEn',''), a.get('nameHi','')))}</b></p><p>{esc(pick(a.get('lineEn',''), a.get('lineHi','')))}</p></div>"
        for i, a in enumerate(data["acts"]))
    TL = "".join(
        f"<div class='tl'><p class='gold'><b>{esc(pick('Ages','Age'))} {t.get('fromAge','')}–{t.get('toAge','')}</b></p><p>{esc(pick(t.get('gistEn', t.get('themeEn','')), t.get('gistHi', t.get('themeHi',''))))}</p></div>"
        for t in data["timeline"])
    ch5 = f"<section><h2>{esc(pick('Chapter Five — The Love Blueprint','Chapter Five — The Blueprint of Love'))}</h2>{LOVE}<h4>{esc(pick('The Relationship Movie','Film of Relationships'))}</h4>{ACTS}<h4>{esc(pick('Emotional Timeline','Timeline of Emotions'))}</h4>{TL}</section>"

    PEOPLE = "".join(f"<div class='person'><h4>{esc(pick(x['nameEn'], x['nameHi']))}</h4>{p(pick(x['patternEn'], x['patternHi']))}</div>" for x in data["people"])
    ch6 = f"<section><h2>{esc(pick('Chapter Six — The People Destined to Shape You','Chapter Six — The People Who Made You'))}</h2>{PEOPLE}</section>"

    WV = data["wealth"]
    WEALTH = ""
    for k, v in WV.items():
        if k.endswith("En") and isinstance(v, str):
            kHi = k[:-2] + "Hi"
            WEALTH += f"<div class='lb'><h4>{esc(label_from_key(k))}</h4>{p(pick(v, WV.get(kHi, v)))}</div>"
    ch7 = f"<section><h2>{esc(pick('Chapter Seven — The Wealth Code','Chapter Seven — The Code of Money'))}</h2>{WEALTH}</section>"

    CV = data["career"]
    SCORES = "".join(
        f"<div class='score'><b>{esc(pick(s['label'], s['labelHi']))}</b>"
        f"<span class='bar-outer'><span style='display:inline-block;width:{s['score']}%;height:6px;background:linear-gradient(90deg,#B87333,#D4AF37);border-radius:3px'></span></span>"
        f"<b class='gold'>{s['score']}</b></div>" for s in CV["scores"])
    ch8 = f"<section><h2>{esc(pick('Chapter Eight — Career DNA','Chapter Eight — DNA of Work'))}</h2>{p(pick(CV['identityEn'], CV['identityHi']))}{SCORES}</section>"

    def month_rows():
        for mx in data["months"]:
            todays = esc(pick("Today's move:", 'Start today:'))
            yield (f"<div class='month'><h3>{esc(mx['month'])}</h3><p><b>{esc(pick(mx['themeEn'], mx['themeHi']))}</b></p>"
                   f"<p>{esc(pick(mx['chanceEn'], mx['chanceHi']))}</p>"
                   f"<p class='mut'><b>{esc(pick('Watch:', 'Be careful:'))}</b> {esc(pick(mx['stressEn'], mx['stressHi']))}</p>"
                   f"<p class='gold'><b>{todays}</b> {esc(pick(mx['focusEn'], mx['focusHi']))}</p>"
                   f"<p class='cliff'>{esc(pick('What seems insignificant now may become important later.','What seems ordinary today will become talk tomorrow.'))}</p></div>")
    MONTHS = "".join(month_rows())
    ch9 = f"<section><h2>{esc(pick('Chapter Nine — The Next Twelve Months','Chapter Nine — The Next Twelve Months'))}</h2>{MONTHS}</section>"

    YEARS = "".join(f"<div class='yr'><h3>{yx['year']} — {esc(pick(yx['titleEn'], yx['titleHi']))}</h3><p>{esc(pick(yx['lineEn'], yx['lineHi']))}</p></div>" for yx in data["years"])
    ch10 = f"<section><h2>{esc(pick('Chapter Ten — The Next Five Years','Chapter Ten — The Next Five Years'))}</h2>{YEARS}</section>"

    ch11 = f"<section><h2>{esc(pick('Chapter Eleven — A Letter From Your Future Self','Chapter Eleven — A Letter From The Future'))}</h2><div class='it' style='font-size:11pt; line-height:2'>"
    ch11 += pick(
        "I know what is keeping you awake tonight.<br/><br/>And I also know what happens next: what binds you today loosens by tomorrow. The night that feels heaviest to you is the one that made me strongest.<br/><br/>One request only — write down the decision you keep postponing today. Tomorrow, that note becomes the line I live by.",
        "What you are worried about today — I know.<br/><br/>And this too — what is tangled today will be resolved by tomorrow. The night that felt heaviest to you is the one that made my strongest shoulders.<br/><br/>Just one request — write down today the decision you keep postponing. Tomorrow that note becomes the line of my life.")
    ch11 += f"</div><p class='gold' style='text-align:right'>— {esc(name)}</p></section>"

    PB = "".join(
        f"<div class='pb'><h4>{esc(pick(ar['areaEn'], ar['areaHi']))}</h4>"
        + "".join(f"<div class='beat'><p><b>{esc(pick(mv['moveEn'], mv['moveHi']))}</b></p><p class='it'>{esc(pick(mv['whyEn'], mv['whyHi']))}</p></div>" for mv in ar["moves"])
        + "</div>" for ar in data["playbook"])
    ch12 = f"<section><h2>{esc(pick('Chapter Twelve — The Life Playbook','Chapter Twelve — The Playbook of Life'))}</h2>{PB}<p class='cliff'>{esc(pick('Many read their book. The few who move get to live it.','Many will read — the ones who walk, they will become.'))}</p></section>"

    cover = f"""
<div class='cover'>
  <p class='sub'>{esc(pick('The Akashic Life Dossier™','The Akashic Life-Dossier™'))}</p>
  <p style='font-size:20pt; letter-spacing:4px; color:#D4AF37; margin:10px 0'>{esc(pick('LIFE DOSSIER','LIFE-DOSSIER'))}</p>
  <div class='idcard'>{esc(name)}</div>
  <p class='credits'>{esc(pick('Ancient Wisdom · AI · Life Pattern Intelligence','Ancient Pragya · AI · Life-Pattern Intelligence'))}<br/><br/>{esc(pick('Prepared Through','Prepared By'))}<br/>{esc(pick('Numerological Pattern Intelligence','Numerology Pattern-Pragya'))}<br/>{esc(pick('Vedic Symbolism · Archetypal Analysis · Temporal Mapping','Vedic Symbolism · Archetype Analysis · Time-Map'))}</p>
  <p class='mut' style='margin-top:22px'>{esc(pick('Your Past Decoded. Your Present Revealed. Your Future Interpreted.','The Past Decoded. The Present Unlocked. The Future Interpreted.'))}</p>
  <p class='mut'>Mulank {data['mulank']} · Bhagyank {data['bhagyank']} · {esc(pick('Age','Age'))} {data['age']}</p>
</div>
<div class='revel'>
  <p class='sub' style='color:#FFB347'>{esc(pick('Not a reading — a dossier','This is not a reading — it is a dossier'))}</p>
  <p style='margin-top:28px; font-style:italic; font-size:11.5pt; line-height:2.2'>{esc(pick('Before you continue.','Before beginning.'))}<br/><br/>{esc(pick('Everything you are about to read may feel impossible.','What you read may seem impossible.'))}<br/><br/>{esc(pick('Some parts may feel uncomfortable.','Some places will sting.'))}<br/>{esc(pick('Some parts may explain events you have never discussed with anyone.','Some things will reveal those words too, which you have never said to anyone.'))}<br/><br/><b style='color:#D4AF37'>{esc(pick('Read with honesty.','Read honestly.'))}</b></p>
</div>"""

    return cover + ch1 + ch2 + ch3 + ch4 + ch5 + ch6 + ch7 + ch8 + ch9 + ch10 + ch11 + ch12

def divider(name):
    return f"<div style='page-break-before:always; text-align:center; padding-top:300px'><p style='color:#B87333; letter-spacing:5px; font-size:12pt'>{esc(name + ' — Hinglish Edition')}</p></div>"

def main():
    args = [a for a in sys.argv[1:] if not a.startswith("--")]
    kw = dict(a[2:].split("=", 1) for a in sys.argv[1:] if a.startswith("--"))
    lang = kw.get("lang", "both")

    name = args[0] if len(args) > 0 else "Aarav Mehta"
    d = int(args[1]) if len(args) > 1 else 2
    m = int(args[2]) if len(args) > 2 else 11
    y = int(args[3]) if len(args) > 3 else 1980
    out = args[4] if len(args) > 4 else f"{SCRATCH}/dossier-sample-{lang}.pdf"

    if os.path.exists(SNAPSHOT):
        data = J.load(open(SNAPSHOT))
    else:
        M, B, A = nums_of(d, m, y)
        data = data_of(name, M, B, A, y, m, d)

    if lang == "en":
        books = [render_book(data, "en", name)]
    elif lang == "hi":
        books = [render_book(data, "hi", name)]
    else:
        books = [render_book(data, "en", name), divider(name), render_book(data, "hi", name)]

    CSS = open(f"{SCRATCH}/_dossier_css.css").read()
    hp = out.replace(".pdf", ".html")
    open(hp, "w").write(f"<!DOCTYPE html><html><head><meta charset='utf-8'><style>{CSS}</style></head><body>{''.join(books)}<footer>The Akashic Life Dossier™ · Interpretive guidance only — never deterministic prediction.</footer></body></html>")
    subprocess.run(["weasyprint", hp, out], check=True, timeout=300)
    print("PDF READY:", out, "| lang:", lang)

if __name__ == "__main__":
    main()