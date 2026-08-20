// Data layer for Barq Suhail Web Application
const INITIAL_PRODUCTS = [
  {
    id: "BS-THU-01",
    name: "هاتف الثريا الفضائي Thuraya XT-PRO",
    nameEn: "Thuraya XT-PRO Satellite Phone",
    category: "thuraya",
    categoryName: "أجهزة وهواتف الثريا",
    price: 4950,
    oldPrice: 5300,
    badge: "الأكثر مبيعاً",
    image: "assets/images/thuraya_banner_3.jpg",
    rating: 4.9,
    reviewsCount: 28,
    stock: 12,
    shortDesc: "الهاتف الفضائي الأكثر تطوراً عالمياً بنظام ملاحة ثلاثي (GPS/Glonass/BeiDou) وشاشة Gorilla Glass فائقة التحمل.",
    specs: [
      "مقاومة الماء والغبار والصدمات بمعيار IP55/IK05",
      "بطارية قوية تدوم حتى 9 ساعات تحدث و100 ساعة استعداد",
      "زر استغاثة مخصص للطوارئ (SOS Button)",
      "ضمان سنتين معتمد لدى مؤسسة برق سهيل",
      "تغطية فضائية شاملة لكافة صحاري وبحار المملكة"
    ]
  },
  {
    id: "BS-GAR-01",
    name: "جهاز ملاحة وتتبع قارمن Garmin GPSMAP 67",
    nameEn: "Garmin GPSMAP 67 Rugged Handheld",
    category: "garmin",
    categoryName: "أجهزة الملاحة وقارمن",
    price: 2450,
    oldPrice: 2700,
    badge: "مثبت به خرائط الصحراء",
    image: "assets/images/garmin_banner_2.jpg",
    rating: 4.8,
    reviewsCount: 34,
    stock: 8,
    shortDesc: "جهاز الملاحة اليدوي الاحترافي المزود بتقنية الترددات المتعددة وبطارية ليثيوم تعمل حتى 180 ساعة.",
    specs: [
      "محمل مسبقاً بأحدث خرائط الصحراء والدروب والفياض",
      "مقاوم للماء والصدمات بالمعيار العسكري MIL-STD-810",
      "شاشة ملونة 3 بوصة واضحة تحت أشعة الشمس المباشرة",
      "حساسات بوصلة 3 محاور وبارومتر مقياس الارتفاع",
      "خدمة التحديث والبرمجة بالدمام"
    ]
  },
  {
    id: "BS-RAD-01",
    name: "جهاز لاسلكي سيارات ثابت آيكوم ICOM IC-V3500",
    nameEn: "ICOM IC-V3500 Mobile VHF Transceiver",
    category: "radios",
    categoryName: "الأجهزة اللاسلكية المرخصة",
    price: 1850,
    oldPrice: 2100,
    badge: "مرخص من هيئة الاتصالات",
    image: "assets/images/hero_banner_1_refined.jpg",
    rating: 5.0,
    reviewsCount: 45,
    stock: 15,
    shortDesc: "جهاز اللاسلكي للسيارات والمحطات الأقوى بقوة إرسال 65 واط وصوت جهوري فائق النقاء لمسافات شاسعة.",
    specs: [
      "قوة إرسال جبارة 65 واط لتغطية واسعة جداً",
      "صوت نقي بقوة 4.5 واط ضد الضوضاء وسرعات الرياح",
      "مايكروفون تحكم كامل مدمج بلوحة أرقام DTMF",
      "هيكل تبريد ألومنيوم صلب للتحمل في درجات الحرارة العالية",
      "مرخص رسمياً من هيئة الاتصالات والفضاء وتقنية المعلومات"
    ]
  },
  {
    id: "BS-THU-SIM",
    name: "شريحة اتصال ثريا الفضائية مع رصيد ابتدائي",
    nameEn: "Thuraya Satellite Prepaid SIM Card",
    category: "cards",
    categoryName: "الشرائح وبطاقات الرصيد",
    price: 380,
    oldPrice: 420,
    badge: "تفعيل فوري",
    image: "assets/images/thuraya_banner_3.jpg",
    rating: 4.9,
    reviewsCount: 62,
    stock: 50,
    shortDesc: "شريحة اتصال الأقمار الصناعية لشبكة الثريا صالحة للاستخدام الفوري للمكالمات والبيانات في أي منطقة نائية.",
    specs: [
      "جاهزة للتفعيل الفوري باسم العميل",
      "تشمل وحدات اتصال ابتدائية",
      "صلاحية سنة كاملة قابلة للتجديد",
      "شحن سريع لجميع مدن المملكة"
    ]
  },
  {
    id: "BS-THU-V100",
    name: "بطاقة إعادة شحن رصيد الثريا (100 وحدة)",
    nameEn: "Thuraya Recharge Voucher 100 Units",
    category: "cards",
    categoryName: "الشرائح وبطاقات الرصيد",
    price: 420,
    oldPrice: 450,
    badge: "تسليم فوري كود SMS",
    image: "assets/images/thuraya_banner_3.jpg",
    rating: 5.0,
    reviewsCount: 89,
    stock: 99,
    shortDesc: "كود رقمي فوري لشحن رصيد هواتف الثريا الفضائية وتمديد الصلاحية وإضافة وحدات اتصال فورية.",
    specs: [
      "100 وحدة اتصال صالحة لجميع أجهزة الثريا",
      "إرسال كود التعبئة الفوري عبر واتساب وSMS",
      "تمديد فترة صلاحية الشريحة"
    ]
  },
  {
    id: "BS-SRV-MAPS",
    name: "خدمة تحديث وبرمجة خرائط القارمن (البر والبحر)",
    nameEn: "Garmin Maps Update & Programming Service",
    category: "services",
    categoryName: "خدمات التحديث والبرمجة",
    price: 250,
    oldPrice: 300,
    badge: "خدمة فورية بالمعرض",
    image: "assets/images/garmin_banner_2.jpg",
    rating: 5.0,
    reviewsCount: 110,
    stock: 999,
    shortDesc: "تحديث شامل لأحدث إصدارات خرائط الصحراء والبراري ودروب المقناص أو الخرائط البحرية لأجهزة القارمن.",
    specs: [
      "إضافة أحدث الفياض، الشعبان، الآبار، والمعالم الجغرافية",
      "خرائط دقيقة مع خطوط الارتفاعات والتضاريس",
      "تنفيذ مباشر بالفرع في الدمام أو عبر بطاقات الذاكرة البريدية"
    ]
  }
];

// Initialize LocalStorage with default products if empty
if (!localStorage.getItem("barq_products")) {
  localStorage.setItem("barq_products", JSON.stringify(INITIAL_PRODUCTS));
}
