"""v3.2 Hinglish copy conversion — replaces formal Devanagari strings with
romanized spoken Hinglish in the named files. Idempotent: reports any string
not found (already converted) as MISS and lists remaining Devanagari lines."""
import re
import sys

# (file, [(old_devanagari, new_hinglish)])
JOBS: dict[str, list[tuple[str, str]]] = {}

def job(fname, pairs):
    JOBS[fname] = pairs

# ---- app/page.tsx (remaining form strings) ----
job('app/page.tsx', [
    ('जन्म-प्रमाण-पत्र वाला नाम — इसी से नामांक और आत्म-इच्छा बनते हैं।',
     'Janm-pramaan-patra wala naam — isi se Namank aur Soul Urge banta hai.'),
    ('बुलाया जाने वाला नाम', 'Bulaya jaane wala naam'),
    ('जैसे: आरव मेहता', 'jaise: Aarav Mehta'),
    ('जैसे: आरव', 'jaise: Aarav'),
    ('जन्म-तिथि *', 'Janm-tithi *'),
    ('जन्म-नाम *', 'Janm-naam *'),
    ('आपका डेटा इसी ब्राउज़र में रहता है — सेटिंग्स से निर्यात/हटाएँ कभी भी।',
     'Aapka data isi browser mein rehta hai — Settings se export/delete kabhi bhi.'),
    ('मेरा वाचन दिखाओ', 'Mera vachan dikhao'),
    ('बस देख रहे हैं? डेमो प्रोफ़ाइल (आरव मेहता, १५ जून १९९०) पहले से भरी है — ',
     'Sirf dekh rahe ho? Demo profile (Aarav Mehta, 15 June 1990) pehle se bhari hai — '),
    ('अभी का हाल देखें', 'Abhi ka haal dekho'),
    ('निःशुल्क', 'Free'),
])

DEV = re.compile(r'[\u0900-\u097F]')

def main():
    only = sys.argv[1:] or list(JOBS)
    for fname in only:
        if fname not in JOBS:
            print(f'NO JOB DEFINED for {fname}')
            continue
        try:
            s = open(fname, encoding='utf-8').read()
        except FileNotFoundError:
            print(f'FILE NOT FOUND: {fname}')
            continue
        for old, new in JOBS[fname]:
            if old in s:
                s = s.replace(old, new)
            else:
                print(f'MISS in {fname}: {old[:50]}')
        open(fname, 'w', encoding='utf-8').write(s)
        left = [l.strip()[:130] for l in s.splitlines() if DEV.search(l)]
        print(f'--- {fname}: {len(left)} devanagari lines left')
        for l in left:
            print(f'    | {l}')

if __name__ == '__main__':
    main()