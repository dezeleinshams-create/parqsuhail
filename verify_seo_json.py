import re
import json

for fn in ['index.html', 'product.html']:
    with open(fn, 'r', encoding='utf-8') as f:
        content = f.read()
    scripts = re.findall(r'<script type="application/ld\+json">([\s\S]*?)</script>', content)
    print(f'Checking {fn}: {len(scripts)} JSON-LD blocks')
    for i, s in enumerate(scripts, 1):
        try:
            data = json.loads(s.strip())
            t = data.get('@type', 'No @type')
            print(f' - Block {i}: Type {t} -> VALID!')
        except Exception as e:
            print(f' - Block {i}: ERROR {e}')
