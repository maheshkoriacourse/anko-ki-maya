"""Update v3-voice.test.ts Devanagari assertions → Hinglish (v3.2 contract)."""
import re

p = 'tests/v3-voice.test.ts'
s = open(p, encoding='utf-8').read()

HI_HINGLISH = (
    "expect(%s).toMatch(/\\b(hai|hain|ka|ki|ke|ko|mein|saal|tha|karo)\\b/);\n"
    "      expect(%s).not.toMatch(/[\\u0900-\\u097F]/);"
)

repls = [
    ("expect(p.readingHi).toMatch(/[\\u0900-\\u097F]/);",
     HI_HINGLISH % ("p.readingHi", "p.readingHi")),
    ("expect(s.remedyHi).toMatch(/[\\u0900-\\u097F]/);",
     HI_HINGLISH % ("s.remedyHi", "s.remedyHi")),
    ("expect(v.remedyHi).toMatch(/[\\u0900-\\u097F]/);",
     HI_HINGLISH % ("v.remedyHi", "v.remedyHi")),
    ("expect(g.behaviorHi).toMatch(/[\\u0900-\\u097F]/);",
     HI_HINGLISH % ("g.behaviorHi", "g.behaviorHi")),
    ("expect(r.lineHi).toMatch(/[\\u0900-\\u097F]/);",
     HI_HINGLISH % ("r.lineHi", "r.lineHi")),
]
for old, new in repls:
    if old in s:
        s = s.replace(old, new)
    else:
        print('MISS:', old[:60])
open(p, 'w', encoding='utf-8').write(s)
print('v3-voice updated')