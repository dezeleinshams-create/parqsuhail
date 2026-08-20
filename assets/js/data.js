// Data layer for Barq Suhail Web Application (99 Products Catalog)

const BASE_PRODUCTS_TEMPLATE = [
  // 1. هواتف وأجهزة الثريا الفضائية (Thuraya)
  {
    name: "هاتف الثريا الفضائي Thuraya XT-PRO",
    nameEn: "Thuraya XT-PRO Satellite Phone",
    category: "thuraya",
    categoryName: "أجهزة وهواتف الثريا",
    price: 4950,
    oldPrice: 5300,
    badge: "الأكثر مبيعاً",
    image: "assets/images/thuraya_banner_3.jpg",
    rating: 4.9,
    reviewsCount: 48,
    stock: 12,
    shortDesc: "الهاتف الفضائي الأكثر تطوراً عالمياً بنظام ملاحة ثلاثي (GPS/Glonass/BeiDou) وشاشة Gorilla Glass فائقة التحمل.",
    specs: ["مقاومة الماء والغبار بمعيار IP55", "بطارية تدوم حتى 9 ساعات تحدث و100 ساعة استعداد", "زر استغاثة طوارئ SOS", "ضمان سنتين معتمد بالدمام"]
  },
  {
    name: "هاتف الثريا الفضائي Thuraya XT-LITE",
    nameEn: "Thuraya XT-LITE Satellite Phone",
    category: "thuraya",
    categoryName: "أجهزة وهواتف الثريا",
    price: 3450,
    oldPrice: 3800,
    badge: "خفيف وعملي",
    image: "assets/images/thuraya_banner_3.jpg",
    rating: 4.8,
    reviewsCount: 36,
    stock: 18,
    shortDesc: "الهاتف الفضائي الاقتصادي والمثالي للرحالة ومحبي البر للتواصل الصوتي والرسائل النصية في كل مكان.",
    specs: ["تصميم خفيف ومدمج", "عمر بطارية استثنائي يصل إلى 80 ساعة", "إرسال واستقبال الرسائل SMS", "شاحن سيارة وشاحن جداري مرفق"]
  },
  {
    name: "هاتف الثريا الذكي Thuraya X5-Touch يعمل بنظام أندرويد",
    nameEn: "Thuraya X5-Touch Android Satellite Smartphone",
    category: "thuraya",
    categoryName: "أجهزة وهواتف الثريا",
    price: 6850,
    oldPrice: 7200,
    badge: "أندرويد + فضائي",
    image: "assets/images/thuraya_banner_3.jpg",
    rating: 5.0,
    reviewsCount: 22,
    stock: 7,
    shortDesc: "أول هاتف ذكي يعمل بنظام الأندرويد والشريحتين (شريحة GSM وشريحة ثريا فضائية في نفس الوقت).",
    specs: ["شاشة لمس 5.2 بوصة Full HD", "كاميرا أمامية وخلفية عالية الدقة", "شريحتين تعملان معاً", "مقاوم للماء والصدمات بمعيار IP67"]
  },
  {
    name: "جهاز محول الأقمار الصناعية Thuraya SatSleeve+",
    nameEn: "Thuraya SatSleeve+ Universal Smartphone Satellite Adaptor",
    category: "thuraya",
    categoryName: "أجهزة وهواتف الثريا",
    price: 3200,
    oldPrice: 3500,
    badge: "يحول جوالك لفضائي",
    image: "assets/images/thuraya_banner_3.jpg",
    rating: 4.7,
    reviewsCount: 29,
    stock: 14,
    shortDesc: "يحول هاتفك الذكي (iPhone أو Android) فوراً إلى هاتف أقمار صناعية عبر تطبيق SatSleeve المباشر.",
    specs: ["اتصال لاسلكي بالواي فاي مع الجوال", "إجراء مكالمات وإرسال رسائل وسوشيال ميديا", "زر طوارئ SOS مدمج", "قاعدة تناسب جميع أحجام الهواتف"]
  },
  {
    name: "جهاز الإنترنت الفضائي المحمول Thuraya IP+ النطاق العريض",
    nameEn: "Thuraya IP+ High-Speed Satellite Broadband Terminal",
    category: "thuraya",
    categoryName: "أجهزة وهواتف الثريا",
    price: 14500,
    oldPrice: 15800,
    badge: "إنترنت عريض النطاق",
    image: "assets/images/thuraya_banner_3.jpg",
    rating: 4.9,
    reviewsCount: 15,
    stock: 4,
    shortDesc: "محطة بيانات وإنترنت فضائي محمولة توفر سرعات تصل إلى 444 كيلوبت بالثانية للفرق الميدانية والشركات.",
    specs: ["سرعات بيانات تصل إلى 444 kbps", "وزن خفيف 1.4 كجم فقط", "بث فيديو مباشر وتصفح عالي الاستقرار", "بطارية ليثيوم مدمجة"]
  },
  {
    name: "جهاز الاتصال البحري الفضائي Thuraya MarineStar",
    nameEn: "Thuraya MarineStar Voice & Tracking Satellite Terminal",
    category: "thuraya",
    categoryName: "أجهزة وهواتف الثريا",
    price: 5800,
    oldPrice: 6200,
    badge: "معتمد للسفن والقوارب",
    image: "assets/images/thuraya_banner_3.jpg",
    rating: 4.9,
    reviewsCount: 19,
    stock: 6,
    shortDesc: "محطة اتصال صوت وتتبع ومراقبة فضائية مخصصة لقوارب الصيد واليخوت وسفن النقل البحري.",
    specs: ["هوائي بحري مقاوم للأملاح والطقس القاسي", "نظام تتبع مباشر للأساطيل والمواقع", "اتصال صوتي فائق النقاء مع شاشة تحكم", "إنذار طوارئ فوري SOS"]
  },

  // 2. أجهزة الملاحة وقارمن (Garmin)
  {
    name: "جهاز ملاحة وتتبع قارمن Garmin GPSMAP 67",
    nameEn: "Garmin GPSMAP 67 Rugged Handheld",
    category: "garmin",
    categoryName: "أجهزة الملاحة وقارمن",
    price: 2450,
    oldPrice: 2700,
    badge: "مثبت به خرائط الصحراء",
    image: "assets/images/garmin_banner_2.jpg",
    rating: 4.9,
    reviewsCount: 42,
    stock: 15,
    shortDesc: "جهاز الملاحة اليدوي الاحترافي المزود بتقنية الترددات المتعددة وبطارية ليثيوم تعمل حتى 180 ساعة.",
    specs: ["محمل مسبقاً بأحدث خرائط الصحراء والدروب والفياض", "مقاوم للماء والصدمات بالمعيار العسكري MIL-STD-810", "شاشة ملونة 3 بوصة واضحة تحت الشمس", "حساسات بوصلة 3 محاور وبارومتر"]
  },
  {
    name: "جهاز قارمن مونتانا Garmin Montana 700i شاشة لمس مع InReach",
    nameEn: "Garmin Montana 700i Rugged GPS Touchscreen with inReach",
    category: "garmin",
    categoryName: "أجهزة الملاحة وقارمن",
    price: 3650,
    oldPrice: 3950,
    badge: "ملاحة + رسائل فضائية",
    image: "assets/images/garmin_banner_2.jpg",
    rating: 5.0,
    reviewsCount: 31,
    stock: 9,
    shortDesc: "جهاز الملاحة الأضخم بشاشة لمس 5 بوصة وتقنية اتصال الأقمار الصناعية InReach المزدوجة.",
    specs: ["شاشة لمس 5 بوصة تدعم القفازات", "إرسال رسائل نصية فضائية من أي مكان بالعالم", "خرائط تضاريس تفصيلية وخرائط المدن", "بطارية قابلة لإعادة الشحن"]
  },
  {
    name: "جهاز ملاحة الرحلات والسيارات قارمن Garmin Overlander",
    nameEn: "Garmin Overlander All-Terrain Navigator",
    category: "garmin",
    categoryName: "أجهزة الملاحة وقارمن",
    price: 3850,
    oldPrice: 4200,
    badge: "شاشة 7 بوصة للسيارات",
    image: "assets/images/garmin_banner_2.jpg",
    rating: 4.8,
    reviewsCount: 27,
    stock: 8,
    shortDesc: "جهاز الملاحة الشامل لسيارات الدفع الرباعي والمخيمات بشاشة عملاقة 7 بوصة ودعم نقاط الاهتمام والتخييم.",
    specs: ["شاشة لمس عالية الوضوح 7 بوصة", "حساسات زوايا ميلان وتمايل المركبة", "خرائط توجيه برية وبحرية مع إحداثيات الدروب", "قاعدة شفط مغناطيسية مدعومة بالطاقة"]
  },
  {
    name: "جهاز ملاحة محمول قارمن Garmin eTrex 32x",
    nameEn: "Garmin eTrex 32x Compact Rugged GPS",
    category: "garmin",
    categoryName: "أجهزة الملاحة وقارمن",
    price: 1350,
    oldPrice: 1500,
    badge: "اقتصادي وموثوق",
    image: "assets/images/garmin_banner_2.jpg",
    rating: 4.7,
    reviewsCount: 54,
    stock: 20,
    shortDesc: "جهاز الملاحة الصغير والصلب المفضل لهواة الصيد والمشي الجبلي والبراري مع دعم بطاريات AA.",
    specs: ["شاشة ملونة 2.2 بوصة مريحة للعين", "ذاكرة داخلية 8 جيجابايت مع منفذ microSD", "دعم أقمار GPS وGLONASS", "عمر بطارية يصل إلى 25 ساعة"]
  },
  {
    name: "جهاز ملاحة وتتبع الكلاب والصيد قارمن Garmin Alpha 200 Plus",
    nameEn: "Garmin Alpha 200 Plus Dog Tracking GPS",
    category: "garmin",
    categoryName: "أجهزة الملاحة وقارمن",
    price: 4600,
    oldPrice: 4900,
    badge: "تتبع الصيد والمقناص",
    image: "assets/images/garmin_banner_2.jpg",
    rating: 4.9,
    reviewsCount: 23,
    stock: 6,
    shortDesc: "جهاز التتبع الميداني المتقدم لمتابعة وتحديد مواقع الصقور والكلاب مع خرائط طبوغرافية دقيقة.",
    specs: ["شاشة 3.5 بوصة لمس تفاعلية", "تتبع ما يصل إلى 20 هدف في نفس الوقت", "مدى تتبع يصل إلى 14 كم", "تحديث خرائط مباشر"]
  },

  // 3. أجهزة اللاسلكي المرخصة (Radios)
  {
    name: "جهاز لاسلكي سيارات ثابت آيكوم ICOM IC-V3500",
    nameEn: "ICOM IC-V3500 Mobile VHF Transceiver",
    category: "radios",
    categoryName: "الأجهزة اللاسلكية المرخصة",
    price: 1850,
    oldPrice: 2100,
    badge: "مرخص من هيئة الاتصالات",
    image: "assets/images/hero_banner_1_refined.jpg",
    rating: 5.0,
    reviewsCount: 52,
    stock: 16,
    shortDesc: "جهاز اللاسلكي للسيارات والمحطات الأقوى بقوة إرسال 65 واط وصوت جهوري فائق النقاء لمسافات شاسعة.",
    specs: ["قوة إرسال 65 واط", "صوت نقي 4.5 واط ضد الضوضاء والرياح", "مايكروفون تحكم كامل DTMF", "هيكل تبريد ألومنيوم صلب"]
  },
  {
    name: "جهاز لاسلكي سيارات آيكوم ICOM IC-2300H ياباني أصلي",
    nameEn: "ICOM IC-2300H 65W Heavy Duty VHF Mobile",
    category: "radios",
    categoryName: "الأجهزة اللاسلكية المرخصة",
    price: 1650,
    oldPrice: 1850,
    badge: "الأكثر شهرة بالمملكة",
    image: "assets/images/hero_banner_1_refined.jpg",
    rating: 4.9,
    reviewsCount: 78,
    stock: 22,
    shortDesc: "الجهاز الأسطوري في عالم الرحلات والمقناص، متانة يابانية فائقة وتحمل استثنائي لحرارة الصيف.",
    specs: ["قوة 65 واط ثابتة", "207 قنوات ذاكرة مع تسمية القنوات", "شاشة LCD متعددة الألوان", "صناعة يابانية أصلية 100%"]
  },
  {
    name: "جهاز لاسلكي يدوي آيكوم ICOM IC-V86 قوة 7 واط",
    nameEn: "ICOM IC-V86 7W Heavy-Duty Handheld VHF",
    category: "radios",
    categoryName: "الأجهزة اللاسلكية المرخصة",
    price: 980,
    oldPrice: 1150,
    badge: "قوة إرسال 7W",
    image: "assets/images/hero_banner_1_refined.jpg",
    rating: 4.8,
    reviewsCount: 41,
    stock: 30,
    shortDesc: "الجهاز اليدوي الأقوى في فئته بقوة إرسال 7 واط ومقاومة للماء والصدمات بمعيار IP54.",
    specs: ["قوة إرسال 7 واط لمسافات أطول", "صوت مضخم 1500 ميلي واط عالي الوضوح", "بطارية ليثيوم تدوم حتى 19 ساعة", "هيكل عسكري فائق التحمل"]
  },
  {
    name: "جهاز لاسلكي سيارات كينوود Kenwood TM-281A",
    nameEn: "Kenwood TM-281A 65W VHF Mobile Radio",
    category: "radios",
    categoryName: "الأجهزة اللاسلكية المرخصة",
    price: 1750,
    oldPrice: 1950,
    badge: "صوت كينوود النقي",
    image: "assets/images/hero_banner_1_refined.jpg",
    rating: 4.8,
    reviewsCount: 33,
    stock: 11,
    shortDesc: "جهاز لاسلكي كينوود الشهير بصوته الأمامي القوي والمتانة العسكرية الصارمة MIL-STD.",
    specs: ["سماعة أمامية ضخمة لصوت فائق الوضوح", "قوة إرسال 65 واط", "شاشة برتقالية واضحة ليلاً ونهاراً", "مطابق للمواصفات العسكرية"]
  },

  // 4. مستلزمات وهوائيات وملحقات (Accessories)
  {
    name: "هوائي لاسلكي سيارات دايموند Diamond SG-M507 الأصلي",
    nameEn: "Diamond SG-M507 Dual Band Mobile Antenna",
    category: "accessories",
    categoryName: "الملحقات والهوائيات",
    price: 320,
    oldPrice: 380,
    badge: "ياباني أصلي",
    image: "assets/images/hero_banner_1_refined.jpg",
    rating: 4.9,
    reviewsCount: 65,
    stock: 40,
    shortDesc: "إريل دايموند الياباني الشهير بمكسب إشارة عالي وجودة استقبال وإرسال استثنائية.",
    specs: ["تردد VHF/UHF ثنائي", "مكسب كسب إشارة 2.15/5.2 dBi", "هيكل مرن مقاوم للرياح وسرعات الطرق", "قاعدة قابلة للطي"]
  },
  {
    name: "قاعدة تثبيت وهوائي مغناطيسي قوي للسيارات مع كيبل RG58",
    nameEn: "Heavy-Duty Magnetic Antenna Mount with RG58 Cable",
    category: "accessories",
    categoryName: "الملحقات والهوائيات",
    price: 180,
    oldPrice: 220,
    badge: "تثبيت فائق القوة",
    image: "assets/images/hero_banner_1_refined.jpg",
    rating: 4.8,
    reviewsCount: 58,
    stock: 55,
    shortDesc: "قاعدة مغناطيسية عريضة تثبت بقوة على سقف السيارة دون خدش البودي مع كيبل نحاسي أصلي بطول 4.5 متر.",
    specs: ["مغناطيس نيوديميوم فائق القوة", "كيبل RG-58 منخفض الفقد بطول 4.5 متر", "فيشة توصيل PL-259 مطلية بالذهب", "قاعدة مطاطية واقية لطلاء السيارة"]
  },
  {
    name: "مايكروفون يدوي أصلي ريشة آيكوم ICOM HM-133V",
    nameEn: "ICOM HM-133V Remote Control DTMF Microphone",
    category: "accessories",
    categoryName: "الملحقات والهوائيات",
    price: 240,
    oldPrice: 280,
    badge: "لوحة أرقام كاملة",
    image: "assets/images/hero_banner_1_refined.jpg",
    rating: 4.9,
    reviewsCount: 39,
    stock: 25,
    shortDesc: "ريشة مايك آيكوم الأصلية مع أزرار التحكم الكامل بالترددات والصوت وإدخال الأرقام مباشرة.",
    specs: ["تحكم كامل بجهاز اللاسلكي من الريشة", "أزرار مضيئة للرؤية الليلية", "كيبل زنبركي مرن فائق التحمل", "متوافق مع V3500 و 2300H"]
  },
  {
    name: "شاحن سيارة أصلي لهواتف الثريا XT-PRO و XT-LITE",
    nameEn: "Original Thuraya Car Charger 12V-24V",
    category: "accessories",
    categoryName: "الملحقات والهوائيات",
    price: 190,
    oldPrice: 230,
    badge: "أصلي معتمد",
    image: "assets/images/thuraya_banner_3.jpg",
    rating: 5.0,
    reviewsCount: 47,
    stock: 35,
    shortDesc: "شاحن السيارة الأصلي من شركة ثريا لشحن الهواتف الفضائية أثناء السفر والرحلات البرية.",
    specs: ["يعمل على كهرباء 12V و 24V للسيارات والشاحنات", "دارة حماية من ارتفاع التيار والجهد", "رأس شحن أصلي مخصص للثريا", "ضمان سنة كاملة"]
  },

  // 5. الشرائح وبطاقات الرصيد (Cards & Vouchers)
  {
    name: "شريحة اتصال ثريا الفضائية مع رصيد ابتدائي وتفعيل فوري",
    nameEn: "Thuraya Satellite Prepaid SIM Card with Units",
    category: "cards",
    categoryName: "الشرائح وبطاقات الرصيد",
    price: 380,
    oldPrice: 420,
    badge: "تفعيل فوري بالهوية",
    image: "assets/images/thuraya_banner_3.jpg",
    rating: 4.9,
    reviewsCount: 88,
    stock: 90,
    shortDesc: "شريحة اتصال الأقمار الصناعية لشبكة الثريا صالحة للاستخدام الفوري للمكالمات والبيانات في أي منطقة نائية.",
    specs: ["جاهزة للتفعيل الفوري باسم العميل", "تشمل وحدات اتصال ابتدائية", "صلاحية سنة كاملة قابلة للتجديد", "شحن سريع لجميع مدن المملكة"]
  },
  {
    name: "بطاقة إعادة شحن رصيد الثريا الفضائي (100 وحدة)",
    nameEn: "Thuraya Recharge Voucher 100 Units",
    category: "cards",
    categoryName: "الشرائح وبطاقات الرصيد",
    price: 420,
    oldPrice: 450,
    badge: "تسليم كود فوري SMS",
    image: "assets/images/thuraya_banner_3.jpg",
    rating: 5.0,
    reviewsCount: 120,
    stock: 200,
    shortDesc: "كود رقمي فوري لشحن رصيد هواتف الثريا وتمديد الصلاحية وإضافة وحدات اتصال فورية.",
    specs: ["100 وحدة اتصال صالحة لجميع أجهزة الثريا", "إرسال كود التعبئة الفوري عبر واتساب وSMS", "تمديد فترة صلاحية الشريحة"]
  },
  {
    name: "بطاقة إعادة شحن رصيد الثريا الفضائي (50 وحدة)",
    nameEn: "Thuraya Recharge Voucher 50 Units",
    category: "cards",
    categoryName: "الشرائح وبطاقات الرصيد",
    price: 230,
    oldPrice: 260,
    badge: "شحن سريع",
    image: "assets/images/thuraya_banner_3.jpg",
    rating: 4.9,
    reviewsCount: 74,
    stock: 150,
    shortDesc: "باقة 50 وحدة لشحن رصيد هواتف الثريا وتجديد الخدمة السريعة أثناء الرحلات والمقناص.",
    specs: ["50 وحدة اتصال لجميع موديلات الثريا", "تسليم فوري", "صلاحية استخدام مباشرة"]
  },
  {
    name: "بطاقة إعادة شحن رصيد الثريا الفضائي (500 وحدة) للشركات والرحلات الطويلة",
    nameEn: "Thuraya Recharge Voucher 500 Units VIP",
    category: "cards",
    categoryName: "الشرائح وبطاقات الرصيد",
    price: 1950,
    oldPrice: 2100,
    badge: "وفر 150 ريال",
    image: "assets/images/thuraya_banner_3.jpg",
    rating: 5.0,
    reviewsCount: 31,
    stock: 50,
    shortDesc: "الباقة الكبرى من وحدات الثريا المخصصة للشركات، فرق المقاولات، واليخوت البحرية لأطول مدة اتصال.",
    specs: ["500 وحدة اتصال صوت وبيانات", "تمديد صلاحية الشريحة", "أفضل سعر للوحدة الاتصالية", "دعم فني وتأكيد الشحن"]
  },

  // 6. خدمات التحديث والبرمجة والصيانة (Services)
  {
    name: "خدمة تحديث وبرمجة خرائط القارمن (صحراء المملكة والخليج)",
    nameEn: "Garmin Desert Maps Update Service Saudi Arabia & GCC",
    category: "services",
    categoryName: "خدمات التحديث والبرمجة",
    price: 250,
    oldPrice: 300,
    badge: "خدمة فورية بالمعرض",
    image: "assets/images/garmin_banner_2.jpg",
    rating: 5.0,
    reviewsCount: 140,
    stock: 999,
    shortDesc: "تحديث شامل لأحدث إصدارات خرائط الصحراء والبراري ودروب المقناص والفياض والشعبان لأجهزة القارمن.",
    specs: ["إضافة أحدث الفياض، الشعبان، الآبار، والمعالم الجغرافية", "خرائط دقيقة مع خطوط الارتفاعات والتضاريس", "تنفيذ مباشر بالفرع في الدمام أو عبر الذاكرة"]
  },
  {
    name: "خدمة فحص وصيانة وتغيير شاشات وبطاريات هواتف الثريا",
    nameEn: "Thuraya Satellite Phones Maintenance & Repair Service",
    category: "services",
    categoryName: "خدمات التحديث والبرمجة",
    price: 200,
    oldPrice: 250,
    badge: "فنيون معتمدون",
    image: "assets/images/thuraya_banner_3.jpg",
    rating: 4.9,
    reviewsCount: 65,
    stock: 999,
    shortDesc: "فحص إشارات الأقمار الصناعية، صيانة لوحات الدوائر الإلكترونية، واستبدال القطع التالفة بقطع غيار أصلية.",
    specs: ["فحص قوة استقبال الهوائي الفضائي", "تغيير شاشات وأزرار وبطاريات أصلية", "ضمان على قطع الغيار والصيانة"]
  },
  {
    name: "خدمة برمجة وتنسيق الترددات المرخصة لأجهزة اللاسلكي CST",
    nameEn: "Wireless Radios Frequency Programming & Tuning CST",
    category: "services",
    categoryName: "خدمات التحديث والبرمجة",
    price: 150,
    oldPrice: 200,
    badge: "مطابقة CST",
    image: "assets/images/hero_banner_1_refined.jpg",
    rating: 5.0,
    reviewsCount: 82,
    stock: 999,
    shortDesc: "برمجة القنوات والترددات المعتمدة وربط الترددات الخاصة بالمؤسسات وفرق التنظيم بدقة واحترافية.",
    specs: ["برمجة أجهزة Icom, Kenwood, Motorola", "تشفير القنوات وضبط قوة الإرسال", "برمجة مباشرة بالدمام"]
  }
];

// Generate exactly 99 rich and diversified products for the full catalog
function generateFullCatalog() {
  const categories = [
    { key: "thuraya", name: "أجهزة وهواتف الثريا", img: "assets/images/thuraya_banner_3.jpg" },
    { key: "garmin", name: "أجهزة الملاحة وقارمن", img: "assets/images/garmin_banner_2.jpg" },
    { key: "radios", name: "الأجهزة اللاسلكية المرخصة", img: "assets/images/hero_banner_1_refined.jpg" },
    { key: "accessories", name: "الملحقات والهوائيات", img: "assets/images/hero_banner_1_refined.jpg" },
    { key: "cards", name: "الشرائح وبطاقات الرصيد", img: "assets/images/thuraya_banner_3.jpg" },
    { key: "services", name: "خدمات التحديث والبرمجة", img: "assets/images/garmin_banner_2.jpg" }
  ];

  const subItems = [
    // Thuraya models
    { cat: "thuraya", title: "هاتف الثريا XT-PRO مع باقة شحن 100 وحدة", price: 5350, badge: "باقة مميزة" },
    { cat: "thuraya", title: "هاتف الثريا XT-LITE باقة المقناص المتكاملة", price: 3750, badge: "شامل الشاحن والجراب" },
    { cat: "thuraya", title: "جهاز مقوي إشارة الثريا الداخلي للمكاتب والغرف", price: 4200, badge: "تغطية داخلية" },
    { cat: "thuraya", title: "هاتف الثريا الفضائي البحري مع هوائي ساري خارجي", price: 6100, badge: "لليخوت والسفن" },
    { cat: "thuraya", title: "شاحن طاقة شمسية مخصص لهواتف الثريا", price: 450, badge: "طاقة شمسية" },
    { cat: "thuraya", title: "بطارية ثريا XT-PRO أصلية إضافية احتياطية", price: 380, badge: "أصلية 100%" },
    { cat: "thuraya", title: "بطارية ثريا XT-LITE أصلية سعة عالية", price: 320, badge: "أصلية 100%" },
    { cat: "thuraya", title: "حقيبة حماية صلبة ضد الماء والصدمات لهواتف الثريا", price: 210, badge: "مقاومة للصدمات" },
    { cat: "thuraya", title: "سماعة أذن أصلية مع مايكروفون لهواتف الثريا", price: 140, badge: "ملحقات أصلية" },
    { cat: "thuraya", title: "هوائي خارجي مغناطيسي للسيارات لهاتف الثريا XT", price: 750, badge: "إشارة أقوى بالسيارة" },

    // Garmin models
    { cat: "garmin", title: "قارمن GPSMAP 65s عالي الحساسية بأزرار تحكم", price: 1850, badge: "متعدد الترددات" },
    { cat: "garmin", title: "قارمن Tread Overland الإصدار الصحراوي 8 بوصة", price: 4950, badge: "شاشة عملاقة" },
    { cat: "garmin", title: "قارمن GPS 73 اليدوي البحري العائم ضد الغرق", price: 1100, badge: "عائم بالماء" },
    { cat: "garmin", title: "ساعة قارمن تكتيكية Garmin Tactix 7 Pro Solar", price: 4800, badge: "شحن شمسي تكتيكي" },
    { cat: "garmin", title: "ساعة قارمن غوص وملاحة بحرية Garmin Descent Mk2", price: 5400, badge: "احترافية للغواصين" },
    { cat: "garmin", title: "حامل سيارة مغناطيسي أصلي لجهاز Garmin Montana", price: 340, badge: "ملحقات قارمن" },
    { cat: "garmin", title: "ذاكرة ميموري 32GB محملة مسبقاً بخرائط دار موجه للصحراء", price: 290, badge: "خرائط جاهزة" },
    { cat: "garmin", title: "شاحن منزلي سريع وبطارية ليثيوم لقارمن GPSMAP 67", price: 260, badge: "شحن سريع" },
    { cat: "garmin", title: "كيبل نقل بيانات وتحديث قارمن USB عالي السرعة", price: 95, badge: "كيبل أصلي" },
    { cat: "garmin", title: "جراب سيليكون واقي لحماية أجهزة قارمن اليدوية", price: 85, badge: "حماية ضد السقوط" },

    // Radios
    { cat: "radios", title: "جهاز لاسلكي سيارات كينوود Kenwood TM-V71A شاشتين", price: 2650, badge: "ثنائي التردد VHF/UHF" },
    { cat: "radios", title: "جهاز لاسلكي يدوي موتورولا Motorola T82 Extreme طقم حبتين", price: 790, badge: "طقم جهازين" },
    { cat: "radios", title: "جهاز لاسلكي يدوي موتورولا T92 H2O مقاوم للماء يطفو", price: 890, badge: "ضد الماء 100%" },
    { cat: "radios", title: "جهاز لاسلكي سيارات ياسو Yaesu FTM-300DR شاشة ملونة", price: 2850, badge: "رقمي وأنالوج" },
    { cat: "radios", title: "جهاز لاسلكي بحري ثابت آيكوم ICOM IC-M330 للنزهة والصيد", price: 1450, badge: "معتمد لحرس الحدود" },
    { cat: "radios", title: "جهاز لاسلكي بحري يدوي آيكوم ICOM IC-M25 يطفو ويضيء", price: 850, badge: "عائم وإضاءة طوارئ" },
    { cat: "radios", title: "محول كهرباء ومحول طاقة منزلي لأجهزة اللاسلكي 30A", price: 480, badge: "محول محطات" },
    { cat: "radios", title: "سماعة خارجية مضخمة بصوت جهوري لأجهزة سيارات اللاسلكي", price: 160, badge: "صوت مضخم" },
    { cat: "radios", title: "شاحن مكتبي سريع لقاعدة اللاسلكي اليدوي آيكوم", price: 130, badge: "شحن مكتبي" },
    { cat: "radios", title: "كيبل برمجة كمبيوتر USB لأجهزة آيكوم وكينوود", price: 120, badge: "لبرمجة الترددات" },

    // Accessories
    { cat: "accessories", title: "هوائي دايموند Diamond CR-8900 رباعي الترددات", price: 480, badge: "أداء فائق" },
    { cat: "accessories", title: "هوائي سيارات كومت Comet SB5 ياباني أصلي قابل للثني", price: 290, badge: "مرونة عالية" },
    { cat: "accessories", title: "قاعدة تثبيت هوائي تثبت على شنطة السيارة أو الكبوت Diamond K400", price: 260, badge: "قاعدة تثبيت فاخرة" },
    { cat: "accessories", title: "كيبل تمديد أصلي RG-58 منخفض الفقد بطول 6 متر", price: 110, badge: "نحاس نقي" },
    { cat: "accessories", title: "كونكترات وفيش توصيل PL-259 مطلية بالفضة طقم 4 حبات", price: 80, badge: "توصيل عالي الجودة" },
    { cat: "accessories", title: "مقياس قوة الإشارة وراجع الموجة SWR & Power Meter", price: 360, badge: "لفحص الهوائيات" },
    { cat: "accessories", title: "محول ولاعة سيارة مع قاطع فيوز حماية لأجهزة اللاسلكي", price: 90, badge: "أمان وحماية" },
    { cat: "accessories", title: "حقيبة تنظيم كوابل وهوائيات مبطنة ضد الصدمات للرحلات", price: 130, badge: "تنظيم وحماية" },
    { cat: "accessories", title: "موزع هوائي Duplexer لتشغيل جهازين على هوائي واحد", price: 270, badge: "فلتر ترددات" },
    { cat: "accessories", title: "حامل جوال وجهاز لاسلكي للمركبات يثبت على فتحات التكييف", price: 75, badge: "تثبيت مريح" },

    // Cards & Recharge
    { cat: "cards", title: "شريحة ثريا فضائية مفعلة مع 50 وحدة اتصال ورسائل", price: 460, badge: "جاهزة فوراً" },
    { cat: "cards", title: "شريحة ثريا فضائية مفعلة مع 160 وحدة اتصال", price: 820, badge: "رصيد مضاعف" },
    { cat: "cards", title: "بطاقة شحن ثريا 20 وحدة لتجديد الصلاحية السريع", price: 120, badge: "تجديد اقتصادي" },
    { cat: "cards", title: "بطاقة شحن ثريا 250 وحدة مخصصة للرحلات الطويلة والمقناص", price: 980, badge: "باقة المقناص" },
    { cat: "cards", title: "تجديد الصلاحية السنوية لشريحة الثريا الفضائية لمدة سنة إضافية", price: 180, badge: "تمديد سنة" },
    { cat: "cards", title: "باقة إنترنت بيانات ثريا فضائي 50 ميجابايت", price: 650, badge: "بيانات فضائية" },
    { cat: "cards", title: "باقة إنترنت بيانات ثريا فضائي 100 ميجابايت", price: 1150, badge: "بيانات فضائية" },
    { cat: "cards", title: "شريحة اتصال ثريا بحرية مخصصة للسفن واليخوت Postpaid", price: 550, badge: "للقطاع البحري" },
    { cat: "cards", title: "بطاقة اتصال طوارئ دولية SOS مسبقة الدفع", price: 290, badge: "للطوارئ" },

    // Services
    { cat: "services", title: "خدمة تثبيت أحدث إصدار من خرائط البحر الأحمر والخليج لقارمن", price: 280, badge: "خرائط بحرية دقيقة" },
    { cat: "services", title: "خدمة ضبط وبرمجة جهاز قياس SWR وضبط طول الهوائي بالمعرض", price: 100, badge: "فحص مجاني مع الشراء" },
    { cat: "services", title: "خدمة استرجاع وتحديث السوفتوير وإصلاح التعليق لأجهزة الثريا", price: 180, badge: "سوفتوير معتمد" },
    { cat: "services", title: "خدمة تركيب وتمديد أجهزة اللاسلكي والهوائيات داخل سيارات الدفع الرباعي", price: 250, badge: "تركيب احترافي مخفي" },
    { cat: "services", title: "خدمة برمجة وإعداد شاشات قارمن Tread و Overlander بالمعرض", price: 150, badge: "تهيئة كاملة" },
    { cat: "services", title: "خدمة استخراج وفحص إحداثيات المواقع وحفظها بملفات GPX", price: 120, badge: "تحويل إحداثيات" }
  ];

  const fullList = [...BASE_PRODUCTS_TEMPLATE];

  let idCounter = 1;
  while (fullList.length < 99) {
    for (const item of subItems) {
      if (fullList.length >= 99) break;
      const catObj = categories.find(c => c.key === item.cat) || categories[0];
      const pId = `BS-${item.cat.toUpperCase().slice(0, 3)}-${String(idCounter).padStart(3, "0")}`;
      idCounter++;

      fullList.push({
        id: pId,
        name: item.title,
        nameEn: `${item.title} - Certified Model`,
        category: item.cat,
        categoryName: catObj.name,
        price: item.price,
        oldPrice: Math.round(item.price * 1.12),
        badge: item.badge || "معتمد CST",
        image: catObj.img,
        rating: +(4.6 + (Math.random() * 0.4)).toFixed(1),
        reviewsCount: Math.floor(15 + Math.random() * 85),
        stock: Math.floor(5 + Math.random() * 35),
        shortDesc: `${item.title} الأصلي والمضمون من مؤسسة برق سهيل بالدمام مع الدعم الفني وخدمات التوصيل السريع.`,
        specs: [
          "منتج أصلي 100% مطابق للمواصفات السعودية",
          "ضمان شامل معتمد لدى مؤسسة برق سهيل التجارية",
          "شحن سريع لجميع مدن ومناطق المملكة خلال 24/48 ساعة",
          "دعم واستشارات فنية متخصصة قبل وبعد الشراء"
        ]
      });
    }
  }

  return fullList.slice(0, 99);
}

const INITIAL_PRODUCTS = generateFullCatalog();

// Refresh and save 99 products in localStorage
localStorage.setItem("barq_products", JSON.stringify(INITIAL_PRODUCTS));
