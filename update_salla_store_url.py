import os, glob

OLD_SALLA = "https://salla.sa/barqsuhail"
NEW_SALLA = "https://store.barqsuhail.com"

count = 0
files_to_check = glob.glob("products/*.html") + ["README.md", "index.html", "admin.html", "update_domain_seo.py", "build_seo.py"]

for filepath in files_to_check:
    if os.path.exists(filepath):
        with open(filepath, "r", encoding="utf-8") as f:
            content = f.read()
        if OLD_SALLA in content:
            new_content = content.replace(OLD_SALLA, NEW_SALLA)
            with open(filepath, "w", encoding="utf-8") as f:
                f.write(new_content)
            count += 1
            print(f"Updated {filepath}")

print(f"Total files updated with new store URL ({NEW_SALLA}): {count}")
