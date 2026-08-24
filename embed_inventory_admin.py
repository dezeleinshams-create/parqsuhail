import re

# 1. Read data.js to get INVENTORY_PRODUCTS array
with open('assets/js/data.js', 'r', encoding='utf-8') as f:
    data_js = f.read()

start = data_js.find('const INVENTORY_PRODUCTS = [')
end = data_js.find('];\n\n// Sequential priority map', start)
if end == -1:
    end = data_js.find('];', start)

inv_block = data_js[start:end+2]
# Replace const with var DEFAULT_INVENTORY_PRODUCTS
inv_block = inv_block.replace('const INVENTORY_PRODUCTS =', 'var DEFAULT_INVENTORY_PRODUCTS =', 1)

# 2. Read admin.html
with open('admin.html', 'r', encoding='utf-8') as f:
    admin_html = f.read()

# Check if DEFAULT_INVENTORY_PRODUCTS is already there
if 'var DEFAULT_INVENTORY_PRODUCTS =' in admin_html:
    admin_html = re.sub(r'var DEFAULT_INVENTORY_PRODUCTS = \[[\s\S]*?\];', '', admin_html)

# Insert inv_block right after `var MASTER_ADMIN_HASH = ACCEPTED_HASHES[0];\n`
target = 'var MASTER_ADMIN_HASH = ACCEPTED_HASHES[0];'
replacement = target + '\n\n' + inv_block

admin_html = admin_html.replace(target, replacement, 1)

with open('admin.html', 'w', encoding='utf-8', newline='\n') as f:
    f.write(admin_html)

print('Embedded DEFAULT_INVENTORY_PRODUCTS into admin.html successfully!')
