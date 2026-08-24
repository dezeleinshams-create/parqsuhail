# -*- coding: utf-8 -*-
"""
Inject Extensive Spare Parts, Maintenance & Replacement Components Q&As into Barq Suhail Mega SEO.
"""

import json
import re

SPARE_PARTS_FAQ = [
    {
        "q": "ما هي قطع الغيار المتوفرة لأجهزة اللاسلكي آيكوم و TYT لدى برق سهيل؟",
        "a": "تتوفر كافة قطع الغيار الأصلية: ترانزستورات الإرسال (Final PA Modules)، شاشات LCD، أزرار وربلات الصوت والقنوات، سوكيت مدخل الريشة والمايك، مراوح التبريد، أسلاك الكهرباء بفيوزات الحماية، وهياكل وحوامل التثبيت المعدنية الأصلية داخل السيارات."
    },
    {
        "q": "هل تتوفر قطع غيار واستبدال لهوائيات السيارات والقواعد؟",
        "a": "نعم، نوفر فصالات الهوائيات القابلة للطي (Folding Joint)، سوستة امتصاص الصدمات والارتداد، قضبان وشعيرات الهوائيات النحاسية البديلة (Whip)، مسامير وبراغي التثبيت الألنكي، ربلات حماية دهان السيارة من الخدش، وفيش PL-259 المطلي بالفضة."
    },
    {
        "q": "أين أجد قطع غيار هواتف الثريا الفضائية (هوائيات، بطاريات، أغطية حماية)؟",
        "a": "تتوفر لدى مؤسسة برق سهيل بالدمام قطع غيار هواتف الثريا الأصلية: الهوائيات القابلة للسحب والطي لهواتف XT-Lite و XT-PRO، بطاريات ليثيوم أيون الأصلية طويلة العمر، أغطية منافذ الشحن والشريحة المقاومة للماء والأتربة، وشواحن السيارة والمنزل المعتمدة."
    },
    {
        "q": "ما هي قطع الغيار والملحقات المتوفرة لأجهزة ملاحة قارمن (Garmin)؟",
        "a": "نوفر حوامل وقواعد تثبيت قارمن على زجاج وديكور السيارة، كابلات شحن ولاعة 12V الأصلية المزودة بفيوز، بطاريات قارمن مونتانا و GPSMAP، كابلات نقل البيانات وتحديث الخرائط عالية السرعة، كفرات سيليكون مقاومة للصدمات، وشاشات حماية زجاجية ضد الكسر."
    },
    {
        "q": "هل يقدم متجر برق سهيل خدمات الصيانة وتغيير قطع الغيار للأجهزة؟",
        "a": "نعم، يقدم قسم الصيانة المتخصص بالمعرض بالدمام فحصاً شاملاً للأجهزة، قياس قوة الواط والإرسال، تغيير الشاشات والأزرار التالفة، فحص ومعايرة الهوائيات، وإصلاح الكابلات والفيش بأعلى دقة واحترافية."
    },
    {
        "q": "كيف تحمي الهوائي وجهاز اللاسلكي من الكسر أثناء دخول الصحراء والمناطق الوعرة؟",
        "a": "باستخدام سوستة امتصاص الصدمات (Heavy Duty Spring) وفصال الهوائي القابل للطي (Folding Hinge)، بالإضافة لاختيار قواعد تثبيت قوية كقواعد دايموند K-400 التي تتحمل الاهتزازات القوية واصطدام الأشجار."
    }
]

def main():
    print("Injecting comprehensive spare parts Q&A into SEO engine...")

    with open('index.html', 'r', encoding='utf-8') as f:
        html = f.read()

    # Find the FAQPage script
    match = re.search(r'<script type="application/ld\+json">\s*(\{[\s\S]*?"@type":\s*"FAQPage"[\s\S]*?\})\s*</script>', html)
    if match:
        faq_data = json.loads(match.group(1))
        existing_questions = {q['name'] for q in faq_data.get('mainEntity', [])}

        for item in SPARE_PARTS_FAQ:
            if item['q'] not in existing_questions:
                faq_data['mainEntity'].append({
                    "@type": "Question",
                    "name": item["q"],
                    "acceptedAnswer": {
                        "@type": "Answer",
                        "text": item["a"]
                    }
                })

        new_faq_str = json.dumps(faq_data, ensure_ascii=False, indent=2)
        new_script_block = f'<script type="application/ld+json">\n{new_faq_str}\n  </script>'

        html = html[:match.start()] + new_script_block + html[match.end():]

        with open('index.html', 'w', encoding='utf-8', newline='\n') as f:
            f.write(html)
        print("Updated index.html FAQ with full spare parts coverage!")

    # Also update product.html
    with open('product.html', 'r', encoding='utf-8') as f:
        p_html = f.read()

    p_match = re.search(r'<script type="application/ld\+json">\s*(\{[\s\S]*?"@type":\s*"FAQPage"[\s\S]*?\})\s*</script>', p_html)
    if p_match:
        p_faq_data = json.loads(p_match.group(1))
        p_existing = {q['name'] for q in p_faq_data.get('mainEntity', [])}

        for item in SPARE_PARTS_FAQ:
            if item['q'] not in p_existing:
                p_faq_data['mainEntity'].append({
                    "@type": "Question",
                    "name": item["q"],
                    "acceptedAnswer": {
                        "@type": "Answer",
                        "text": item["a"]
                    }
                })

        new_p_faq_str = json.dumps(p_faq_data, ensure_ascii=False, indent=2)
        p_new_script = f'<script type="application/ld+json">\n{new_p_faq_str}\n  </script>'
        p_html = p_html[:p_match.start()] + p_new_script + p_html[p_match.end():]

        with open('product.html', 'w', encoding='utf-8', newline='\n') as f:
            f.write(p_html)
        print("Updated product.html FAQ with full spare parts coverage!")

if __name__ == '__main__':
    main()
