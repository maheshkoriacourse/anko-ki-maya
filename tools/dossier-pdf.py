#!/usr/bin/env python3
"""
v6.0 AKASHIC LIFE DOSSIER — LUXURY PDF GENERATOR (canonical spec).
Reads dossier engines for a given customer birth data and produces a
single-page-flow luxury HTML → WeasyPrint → branded PDF, spec design:
obsidian/navy bg, antique gold, Cinzel-style serif headings (DejaVu fallback
offline), Sri-Yantra-faint cover, chapter sectioning.
Usage: python3 dossier_pdf.py "Aarav Sharma" 2 11 1980 out.pdf
"""
import sys, subprocess, json, html
from datetime import date

REPO = "/home/maheshkoria/anko-ki-maya"
OUT_DEFAULT = "/home/maheshkoria/dossier-sample.pdf"

# Pull data from the TS libs via a small node bridge (single source of truth)
def build_ts_data(name, d, m, y):
    script = f'''
const {{ soulArchetype }} = require('./lib/dossier.ts');  // placeholder — replaced below
'''
    # Simpler: node can't import TS directly without loader; use tsx
    js = f'''
import {{ soulArchetype }} from './lib/dossier.ts';
import {{ hiddenStoryOf }} from './lib/dossier-chapters.ts';
import {{ buildLifeMap }} from './lib/dossier-lifemap.ts';
import {{ woundsOf }} from './lib/dossier-wounds.ts';
import {{ loveBlueprintOf, relationMovieActs, loveTimeline }} from './lib/dossier-love.ts';
import {{ peopleOf, wealthOf, careerOf }} from './lib/dossier-civil.ts';
import {{ next12Months, next5Years }} from './lib/dossier-year.ts';
const now = new Date();
const birth = new Date(`${y}-{String(m).padStart(2,'0')}-${String(d).padStart(2,'0')}T06:00:00Z`);
let age = now.getFullYear() - birth.getFullYear();
if (now.getMonth() + 1 < m || (now.getMonth() + 1 === m && now.getDate() < d)) age--;

const a = soulArchetype(Number(process.argv[2]), Number(process.argv[3]));
const story = hiddenStoryOf(Number(process.argv[2]));
const map = buildLifeMap(Number(process.argv[5]), Number(process.argv[6]), Number(process.argv[7]));
const missing = (() => {{
  const digits = `${y}${{String(m).padStart(2,'0')}}${{String(d).padStart(2,'0')}}`.split('').map(Number);
  const present = new Set(digits);
  return [1,2,3,4,5,6,7,8,9].filter(n => !present.has(n));
}})();
const wounds = woundsOf({{ mulank: Number(process.argv[2]), bhagyank: Number(process.argv[3]), missing, karmic: [] }});
const love = loveBlueprintOf(Number(process.argv[2]), Number(process.argv[3]));
const acts = relationMovieActs(Number(process.argv[2]));
const timeline = loveTimeline(Number(process.argv[2]), Math.max(18, age));
const people = peopleOf(Number(process.argv[2]));
const wealth = wealthOf(Number(process.argv[2]), Number(process.argv[3]));
const career = careerOf(Number(process.argv[2]), Number(process.argv[3]));
const months = next12Months({{ y: Number(process.argv[5]), m: Number(process.argv[6]), d: Number(process.argv[7]) }}, now.getFullYear(), now.getMonth() + 1);
const years = next5Years({{ y: Number(process.argv[5]), m: Number(process.argv[6]), d: Number(process.argv[7]) }}, now.getFullYear());
const out = {{ name: process.argv[1], mulank: Number(process.argv[2]), bhagyank: Number(process.argv[3]), age, archetype: a, story, mapBands: map.bands, wounds, love, acts, timeline, people, wealth, career, months, years }};
console.log(JSON.stringify(out));
'''
    path = f"{REPO}/_dossier_bridge.mjs"
    with open(path, 'w') as f:
        f.write("const { y, m, d } = JSON.parse(process.argv[8] || '{}');\n" + js.replace('`${y}-', '`${JSON.parse(process.argv[7]||"{}").y}-'))
    return path

# Simpler approach: use tsx directly with a self-contained script
BRIDGE = f'''
import {{ soulArchetype }} from "{REPO}/lib/dossier";
import {{ hiddenStoryOf }} from "{REPO}/lib/dossier-chapters";
import {{ buildLifeMap }} from "{REPO}/lib/dossier-lifemap";
import {{ woundsOf }} from "{REPO}/lib/dossier-wounds";
import {{ loveBlueprintOf, relationMovieActs, loveTimeline }} from "{REPO}/lib/dossier-love";
import {{ peopleOf, wealthOf, careerOf }} from "{REPO}/lib/dossier-civil";
import {{ next12Months, next5Years }} from "{REPO}/lib/dossier-year";

const [name, mulank, bhagyank, age, by, bm, bd] = process.argv.slice(2);
const M = Number(mulank), B = Number(bhagyank), A = Number(age);
const Y = Number(by), Mo = Number(bm), D = Number(bd);

const missing = (() => {{
  const digits = `${{by}}${{String(bm).padStart(2, "0")}}${{String(bd).padStart(2, "0")}}`.split("").map(Number);
  const present = new Set(digits);
  const bf = String(B);
  for (const ch of bf.replace(/\\D/g, "")) present.add(Number(ch));
  return [1,2,3,4,5,6,7,8,9].filter((n) => !present.has(n));
}})();

const out = {{
  name, mulank: M, bhagyank: B, age: A,
  archetype: soulArchetype(M, B),
  story: hiddenStoryOf(M),
  map: buildLifeMap(Y, Mo, D),
  wounds: woundsOf({{ mulank: M, bhagyank: B, missing, karmic: [] }}),
  love: loveBlueprintOf(M, B),
  acts: relationMovieActs(M),
  timeline: loveTimeline(M, Math.max(18, A)),
  people: peopleOf(M),
  wealth: wealthOf(M, B),
  career: careerOf(M, B),
  months: next12Months({{ y: Y, m: Mo, d: D }}, new Date().getFullYear(), new Date().getMonth() + 1),
  years: next5Years({{ y: Y, m: Mo, d: D }}, new Date().getFullYear()),
}};
console.log(JSON.stringify(out));
'''

if __name__ == "__main__":
    name = sys.argv[1] if len(sys.argv) > 1 else "Aarav Mehta"
    d = int(sys.argv[2]) if len(sys.argv) > 2 else 2
    m = int(sys.argv[3]) if len(sys.argv) > 3 else 11
    y = int(sys.argv[4]) if len(sys.argv) > 4 else 1980
    out = sys.argv[5] if len(sys.argv) > 5 else "/home/maheshkoria/.hermes/cache/scratch/dossier-sample.pdf"

    # compute mulank/bhagyank/age via node quickly
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
    import json as J
    nums = J.loads(calc.stdout.strip())
    M, B, A = nums["mul"], nums["bp"], nums["age"]

    with open(f"{REPO}/_dossier_bridge.mts", "w") as f:
        f.write(BRIDGE)
    res = subprocess.run(["npx", "--yes", "tsx", "_dossier_bridge.mts", name, str(M), str(B), str(A), str(y), str(m), str(d)],
                         capture_output=True, text=True, cwd=REPO, timeout=120)
    if res.returncode != 0:
        print("BRIDGE STDERR:", res.stderr[:400]); sys.exit(1)
    data = J.loads(res.stdout)

    # ---------- LUXURY HTML ----------
    def esc(s): return html.escape(str(s))
    def p(x): return f"<p>{esc(x)}</p>"
    def h2(t): return f"<h2>{esc(t)}</h2>"
    def sect(t, body): return f"<section><h2>{esc(t)}</h2>{body}</section>"
    def li(items, cls=""):
        lis = "".join(f"<li>{esc(i)}</li>" for i in (items if isinstance(items, list) else [items]))
        return f'<ul class="{cls}">{lis}</ul>'

    months_html = "".join(
        f"<div class='month'><p class='mtitle'>{esc(mx['themeEn'] if False else '')}{esc(str(mx.get('month','')))}</p></div>"
        for mx in data["months"])  # simple fallback

    months_rows = ""
    for mx in data["months"]:
        months_rows += f"""
        <div class="month"><h3>{esc(str(mx.get('month','')))}</h3>
        <p><b>{esc(mx.get('themeEn',''))}</b></p><p>{esc(mx.get('chanceEn',''))}</p>
        <p class="mut"><b>Watch:</b> {esc(mx.get('stressEn',''))}</p><p class="gold"><b>Today's move:</b> {esc(mx.get('focusEn',''))}</p>
        <p class="cliff">What seems insignificant now may become important later.</p></div>"""

    years_rows = "".join(
        f"<div class='yr'><h3>{esc(str(yx.get('year','')))} — {esc(yx.get('titleEn',''))}</h3><p>{esc(yx.get('lineEn',''))}</p></div>"
        for yx in data["years"])

    map_rows = "".join(
        f"<div class='band'><p><b>{esc(str(mb.get('fromAge','')))}–{esc(str(mb.get('toAge','')))}</b> · {esc(mb.get('nameEn',''))}</p><p>{esc(mb.get('gistEn',''))}</p><p class='mut'>{esc(mb.get('basis',''))}</p></div>"
        for mb in data["map"]["bands"])

    wound_cards = ""
    for w in data["wounds"]:
        wound_cards += f"""
        <div class="wound"><h3>{esc(w['nameEn'])}</h3>{p(w['howItFormsEn'])}{p(w['howItShowsEn'])}
        <div class="heal"><p class="lab">The healing path</p><p class="it">{esc(w['redemptionEn'])}</p></div>
        <div class="upay"><p class="lab gold">Start today</p>{li(w['upayEn'])}<p class="mut">{esc(w['basis'])}</p></div></div>"""

    love_pairs = [(k, v) for k, v in data["love"].items() if isinstance(v, str) and v]
    love_rows = "".join(f"<div class='lb'><h4>{esc(k.replace('En','').replace('Hi','').title())}</h4>{p(v)}</div>" for k, v in love_pairs[:6] if k.endswith("En"))

    acts_rows = "".join(f"<div class='act'><p class='t'>{esc(getattr(x,'nameEn','') or x.get('nameEn',''))}</p><p>{esc(x.get('lineEn',''))}</p></div>" for x in (data["acts"] or []))

    tl_rows = "".join(f"<div class='tl'><p class='gold'><b>Ages {esc(str(t.get('fromAge','')))}–{esc(str(t.get('toAge','')))}</b></p><p>{esc(t.get('gistEn', t.get('themeEn','')))}</p></div>" for t in data["timeline"])

    people_rows = "".join(f"<div class='person'><h4>{esc(x['nameEn'])}</h4>{p(x['patternEn'])}</div>" for x in data["people"])

    wealth_pairs = [(k, v) for k, v in data["wealth"].items() if isinstance(v, str) and v and k.endswith("En")]
    wealth_rows = "".join(f"<div class='lb'><h4>{esc(k.replace('En','').title())}</h4>{p(v)}</div>" for k, v in wealth_pairs)

    career_rows = "".join(
        f"<div class='score'><span>{esc(s['label'])}</span><div class='bar'><div style='width:{esc(str(s['score']))}%'></div></div><b>{esc(str(s['score']))}</b></div>"
        for s in data["career"]["scores"])
    career_html = p(data["career"]["identityEn"]) + career_rows

    pb_rows = "".join(
        f"<div class='pb'><h4>{esc(ar['areaEn'])}</h4>" +
        "".join(f"<div class='move'><p><b>{esc(mv['moveEn'])}</b></p><p class='it'>{esc(mv['whyEn'])}</p></div>" for m in [None] for mv in ar["moves"]) +
        "</div>" for ar in (data.get("playbook") or []))

    story_rows = "".join(f"<p class='beat'><span class='lab'>{esc(b.get('labelHi','').upper())}</span> {esc(b.get('textEn', b.get('textHi','')))}</p>" for b in data["story"]["beats"])

    html_doc = f"""<!DOCTYPE html><html><head><meta charset="utf-8"><style>
@page {{ size: A4; margin: 0; }}
@page cover {{ margin: 0; }}
body {{ font-family: 'DejaVu Serif', Georgia, serif; color: #efe4c8; background: #0B1026; font-size: 10.2pt; line-height: 1.5; }}
.cover {{ page: cover; height: 29.7cm; background: #0B1026; color: #efe4c8; text-align: center; padding-top: 220px; position: relative; }}
.cover h1 {{ font-size: 26pt; letter-spacing: 4px; color: #D4AF37; margin-bottom: 10px; }}
.cover .sub {{ letter-spacing: 6px; color: #B87333; font-size: 9pt; text-transform: uppercase; }}
.cover .name {{ font-size: 30pt; color: #f0cf74; border-top: 1px solid #B87333; border-bottom: 1px solid #B87333; display: inline-block; padding: 12px 40px; margin-top: 40px; }}
.cover .credits {{ margin-top: 60px; font-size: 9pt; color: #b3a5c9; letter-spacing: 1px; line-height: 2 }}
section {{ padding: 40px 55px; page-break-before: always; background: #0B1026; }}
h2 {{ color: #D4AF37; letter-spacing: 3px; font-size: 16pt; text-transform: uppercase; border-bottom: 1px solid #2a3555; padding-bottom: 8px; margin-bottom: 14px; }}
h3 {{ color: #f0cf74; font-size: 12pt; }}
h4 {{ color: #D4AF37; margin: 8px 0; font-size: 10.5pt; }}
p {{ margin: 6px 0; }}
.mut {{ color: #9d90b5; font-size: 8.5pt; }}
.gold {{ color: #FFB347; }}
.it {{ font-style: italic; color: #e8d9a8; }}
.beat {{ border-left: 2px solid #b87333; padding-left: 10px; margin: 10px 0; }}
.wound {{ border: 1px solid #2a3555; padding: 12px 16px; margin: 12px 0; border-radius: 6px; }}
.heal {{ background: rgba(212,175,55,0.07); border-radius: 6px; padding: 8px 12px; margin-top: 8px; }}
.upay {{ border: 1px solid #2a3555; padding: 8px 12px; margin-top: 8px; border-radius: 6px; }}
.lab {{ font-size: 8pt; text-transform: uppercase; letter-spacing: 2px; color: #D4AF37; }}
ul {{ margin: 4px 0 6px 18px; }}
li {{ margin: 3px 0; }}
.month {{ border: 1px solid #2a3555; border-radius: 8px; padding: 10px 14px; margin: 10px 0; }}
.yr {{ border: 1px solid #D4AF37; border-radius: 8px; padding: 10px 16px; margin: 10px 0; }}
.cliff {{ font-style: italic; color: #b3a5c9; font-size: 8.5pt; margin-top: 6px; }}
.score {{ margin: 6px 0; }} .score div {{ display: inline-block; }} .score .bar {{ display: inline-block; width: 300px; height: 6px; background: #1a1f3d; border-radius: 3px; margin: 0 10px; }}
.score .bar > div {{ height: 5px; background: linear-gradient(90deg,#B87333,#D4AF37); border-radius: 3px; }}
.tl, .act, .person, .lb, .pb {{ border-left: 2px solid #b87333; padding-left: 12px; margin: 10px 0; }}
footer {{ text-align: center; color: #6d6385; font-size: 8pt; padding: 20px 0; }}
</style></head><body>

<div class="cover">
  <p class="sub">THE AKASHIC LIFE DOSSIER™</p>
  <h1>MAHESH KORIA</h1>  <!-- replaced below -->
</div>
</body></html>"""

    # rebuild cover with customer name + section content
    cover = f'''
<div class="cover">
  <p class="sub">THE AKASHIC LIFE DOSSIER™</p>
  <p class="credits">Ancient Wisdom · AI · Life Pattern Intelligence</p>
  <p class="name">{esc(name)}</p>
  <p class="credits" style="margin-top:18px">Prepared Through<br>Numerological Pattern Intelligence<br>Vedic Symbolism · Archetypal Analysis · Temporal Mapping</p>
  <p class="mut" style="margin-top:30px">Your Past Decoded. Your Present Revealed. Your Future Interpreted.</p>
</div>'''

    revelation = f'''
<div style="padding:200px 60px; text-align:center">
  <p class="sub" style="color:#FFB347">NOT A READING — A DOSSIER</p>
  <p style="margin-top:30px; font-style:italic; font-size:12.5pt; line-height:2.1">Before you continue.<br/><br/>Everything you are about to read may feel impossible.<br/><br/>Some parts may feel uncomfortable.<br/>Some parts may explain events you have never discussed with anyone.<br/><br/><b style="color:#D4AF37">Read with honesty.</b></p>
</div>'''

    ch1 = sect("Chapter One — Who Are You, Really?",
        f"<div class='beat'><h3 style='color:#f0cf74'>{esc(data['archetype']['name'])}</h3>{p(data['archetype']['crestEn'])}</div>"
        + p(data["archetype"]["coreEn"])
        + "<p class='lab'>Strengths</p>" + li(data["archetype"]["strengthsEn"])
        + "<div class='wound'><p class='lab'>The hidden weakness nobody names</p>" + p(data["archetype"]["shadowEn"])
        + f"<p class='it'>{esc(data['archetype']['redemptionEn'])}</p></div>"
        + p(data["archetype"]["purposeEn"]) + p(data["archetype"]["growthEn"]))
    ch2 = sect("Chapter Two — The Hidden Story of Your Life", story_rows
        + "<p class='cliff'>Next: the story that made your life the way it is…</p>")
    ch3 = sect("Chapter Three — The Years That Shaped You",
        "".join(f"<div class='beat'><p><b>{esc(str(mb.get('fromAge','')))}–{esc(str(mb.get('toAge','')))}</b> · {esc(mb.get('nameEn',''))}</p>{p(mb.get('gistEn',''))}<p class='mut'>{esc(mb.get('basis',''))}</p></p></div>" for mb in data["map"]["bands"])
        + "<p class='cliff'>Behind every bend of this river lies a wound…</p>")
    ch4 = sect("Chapter Four — The Wounds You Never Healed", wound_cards)
    ch5 = sect("Chapter Five — The Love Blueprint", love_rows + acts_rows + tl_rows)
    ch6 = sect("Chapter Six — The People Destined to Shape You", "".join(f"<div class='person'><h4>{esc(x['nameEn'])}</h4>{p(x['patternEn'])}</div>" for x in data["people"]))
    ch7 = sect("Chapter Seven — The Wealth Code", wealth_rows)
    ch8 = sect("Chapter Eight — Career DNA", career_rows)
    ch12m = sect("Chapter Nine — The Next Twelve Months", months_rows)
    ch5y = sect("Chapter Ten — The Next Five Years", years_rows)
    letter = sect("Chapter Eleven — A Letter From Your Future Self",
        f"<p class='it' style='font-size:11.5pt'>I know what is keeping you awake tonight.<br/><br/>And I also know what happens next: what binds you today loosens by tomorrow.<br/>The night that feels heaviest to you is the one that made me strongest.<br/><br/>One request only — write down the decision you keep postponing today. Tomorrow, that note becomes the line I live by.</p><p class='gold' style='text-align:right'>— {esc(name)}</p>")
    pb = sect("Chapter Twelve — The Life Playbook", pb_rows +
        "<p class='cliff'>Many read their book. The few who move get to live it.</p>")

    full = f"""<!DOCTYPE html><html><head><meta charset='utf-8'><style>{open('/home/maheshkoria/.hermes/cache/scratch/dossier-style.css').read() if False else CSS}</style></head>
<body>{cover}{revelation}{ch1}{ch2}{ch3}{ch4}{ch5}{ch6}{ch7}{ch8}{ch12m}{ch5y}{letter}{pb}
<footer>Akashic Life Dossier™ · Interpretive guidance only — never deterministic prediction.</footer>
</body></html>"""
    open(out_html_path, 'w').write(full)
    # weasyprint
    subprocess.run(["weasyprint", out_html_path, out], check=True, timeout=300)

    print("PDF ready:", out)