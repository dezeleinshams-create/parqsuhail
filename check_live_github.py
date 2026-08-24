import urllib.request, re

url = "https://raw.githubusercontent.com/dezeleinshams-create/parqsuhail/main/assets/js/data.js"
req = urllib.request.urlopen(url)
content = req.read().decode('utf-8')
matches = re.findall(r'(?:\bid|\"id\")\s*:\s*"([^"]+)"', content)
print("Live GitHub data.js products count:", len(matches))
print("First 3 matches:", matches[:3])
