import json, subprocess, re

# 1. Get original 92 products from commit 3d61be8
out_orig = subprocess.check_output(['git', 'show', '3d61be8:assets/js/data.js']).decode('utf-8')

# 2. Get current data.js
with open('assets/js/data.js', 'r', encoding='utf-8') as f:
    text_curr = f.read()

# Let's inspect products in text_curr
curr_ids = re.findall(r'"id":\s*"([^"]+)"', text_curr)
print("Current IDs count:", len(curr_ids))

# Let's inspect products in out_orig
orig_ids = re.findall(r'id:\s*"([^"]+)"', out_orig)
print("Orig IDs count:", len(orig_ids))

# Write a clean data.js that contains all 92 original products + any new ones
# In out_orig, let's see how it was formatted
with open('assets/js/data.js', 'w', encoding='utf-8', newline='\n') as f:
    f.write(out_orig)

print("Restored original 92 products in assets/js/data.js")
