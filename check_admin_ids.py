import re

with open('admin.html', 'r', encoding='utf-8') as f:
    html = f.read()

used_ids = set(re.findall(r'getElementById\([\'"]([^\'"]+)[\'"]\)', html))
missing = []
for el_id in used_ids:
    if not re.search(r'id=[\'"]' + re.escape(el_id) + r'[\'"]', html, re.I):
        missing.append(el_id)

print(f"Total used IDs in JS: {len(used_ids)}")
print(f"Missing IDs count: {len(missing)}")
for m in missing:
    print(" - MISSING ID:", m)
