# -*- coding: utf-8 -*-
"""
Expand FAQPage Schema with comprehensive Q&As for all cables, connectors, mounts,
microphones, power supplies, batteries, and accessories.
"""

import json
import re

ACCESSORIES_FAQ = [
    {
        "q": "ما هي أفضل أنواع أسلاك وكابلات الهوائيات للسيارات؟",
        "a": "يعتبر السلك الإيطالي الأصلي RG-58 عالي المرونة وسلك RG-213 من أفضل كابلات التوصيل، حيث يتميزان بنسبة فقد منخفضة جداً للإشارة ومقاومة عالية لحرارة محرك السيارة والشمس مع طبقة عزل نحاسية مزدوجة تمنع التشويش وتضمن أقصى مدى إرسال."
    },
    {
        "q": "ما هي أفضل قواعد تثبيت هوائيات اللاسلكي على السيارات والشاص والجيوب؟",
        "a": "تتوفر خيارات متعددة: القواعد المغناطيسية الأصلية (Heavy Duty Magnet) فائقة الثبات على السرعات العالية، قواعد التثبيت على الشنطة وحافة الباب (Trunk/Hatch Mount كقواعد دايموند K-400 وسيريو)، وقواعد التثبيت على سلة التندة ومرايا الشاص واللاندكروزر والباترول مع عزل أرضي ممتاز."
    },
    {
        "q": "هل يتوفر مايك ريشة DTMF أصلي لأجهزة آيكوم و TYT؟",
        "a": "نعم، تتوفر ريش ومايكروفونات DTMF الأصلية المزودة بلوحة أرقام كاملة وأزرار تحكم بالتردد والصوت لأجهزة آيكوم IC-V3500 و IC-2300H و IC-2730، بالإضافة لريش أجهزة TYT اليدوية والمثبتة وسماعات الأذن المقاومة للضوضاء."
    },
    {
        "q": "ما هي أنواع الفيش والكونكترات المستخدمة في أجهزة اللاسلكي والهوائيات؟",
        "a": "تتوفر جميع أنواع الفيش والكونكترات الأصلية: فيش PL-259 النحاسي المطلي بالفضة، فيش SO-239، فصالات وزوايا 90 درجة، تحويلات SMA إلى BNC و UHF لتوصيل الأجهزة اليدوية بهوائيات السيارات الخارجية، وفصالات حماية الكابلات من الالتواء."
    },
    {
        "q": "كيف أختار محول الطاقة (Power Supply) المناسب لتشغيل جهاز اللاسلكي في البيت أو الاستراحة؟",
        "a": "لتشغيل أجهزة اللاسلكي مثل آيكوم بقوة 65 واط بكفاءة كاملة في المنزل، ينصح باستخدام محول طاقة (Power Supply) منظم بجهد 13.8 فولت وتيار لا يقل عن 25 إلى 30 أمبير مزود بمروحة تبريد وحماية من التماس الكهربائي وتصفية للترددات لمنع الوشيش."
    },
    {
        "q": "هل تتوفر بطاريات وشواحن أصلية لأجهزة اللاسلكي اليدوية؟",
        "a": "نعم، يوفر متجر برق سهيل بطاريات ليثيوم أيون (Li-ion) أصلية بسعة عالية تدوم طويلاً لأجهزة TYT و كينوود وبوفنق، بالإضافة لقواعد الشحن المكتبية السريعة وشواحن ولاعة السيارة 12V للاستخدام أثناء السفر والمقناص."
    },
    {
        "q": "ما هي وصلة برمجة أجهزة اللاسلكي وكيف يتم ضبط الترددات؟",
        "a": "تتوفر وصلات برمجة USB الأصلية المتوافقة مع أجهزة آيكوم و TYT وكينوود لربط الجهاز بالكمبيوتر وبرمجة قنوات الاتصال، نغمات التشفير (CTCSS/DCS)، وتسمية القنوات، كما يقدم المعرض خدمة البرمجة الفورية المباشرة للعملاء."
    },
    {
        "q": "ما هي أهمية اختبار نسبة الموجة الراجعة (SWR) عند تركيب الهوائي والوصلات؟",
        "a": "فحص نسبة SWR عبر جهاز قياس متخصص يضمن مطابقة معايرة الهوائي مع التردد المطلوب، مما يحمي ترانزستور الإرسال الداخلي للجهاز من الاحتراق ويحقق أقصى مدى وصول للموجات اللاسلكية."
    },
    {
        "q": "هل تتوفر قطع غيار مثل الفصالات والربلات والأزرار وحوامل التثبيت؟",
        "a": "نعم، نوفر قطع الغيار الاستهلاكية: فصالات الهوائيات القابلة للطي، مسامير وبراغي التثبيت، ربلات العزل المقاومة للماء والأتربة، قواعد تثبيت الأجهزة (Bracket) داخل السيارة، وأسلاك التوصيل بفيوز الأمان."
    },
    {
        "q": "كيف يمكن توصيل جهاز اللاسلكي اليدوي بهوائي السيارة الخارجي؟",
        "a": "يتم ذلك بسهولة عبر وصلة تحويل (Adapter) من سن الجهاز اليدوي (SMA-Male أو SMA-Female) إلى مدخل الفيش المعتاد (SO-239)، مما يضاعف مدى إرسال واستقبال الجهاز اليدوي عدة مرات داخل السيارة."
    }
]

def main():
    print("Expanding FAQ with all accessories and cable questions...")

    with open('index.html', 'r', encoding='utf-8') as f:
        html = f.read()

    # Find the FAQPage script
    match = re.search(r'<script type="application/ld\+json">\s*(\{[\s\S]*?"@type":\s*"FAQPage"[\s\S]*?\})\s*</script>', html)
    if match:
        faq_data = json.loads(match.group(1))
        existing_questions = {q['name'] for q in faq_data.get('mainEntity', [])}

        for item in ACCESSORIES_FAQ:
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
        print("Updated index.html FAQ with full accessories coverage!")

    # Also update product.html
    with open('product.html', 'r', encoding='utf-8') as f:
        p_html = f.read()

    p_match = re.search(r'<script type="application/ld\+json">\s*(\{[\s\S]*?"@type":\s*"FAQPage"[\s\S]*?\})\s*</script>', p_html)
    if p_match:
        p_faq_data = json.loads(p_match.group(1))
        p_existing = {q['name'] for q in p_faq_data.get('mainEntity', [])}

        for item in ACCESSORIES_FAQ:
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
        print("Updated product.html FAQ with full accessories coverage!")

if __name__ == '__main__':
    main()
