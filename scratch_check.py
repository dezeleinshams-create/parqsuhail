import re

with open('assets/js/data.js', 'r', encoding='utf-8') as f:
    text = f.read()

matches = re.findall(r'(?:\bid|\"id\")\s*:\s*"([^"]+)"', text)
print("Total products in data.js:", len(matches))
print("First 3:", matches[:3])
print("Last 3:", matches[-3:])
