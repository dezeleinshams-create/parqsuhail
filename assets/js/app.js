// Main JavaScript Application for Barq Suhail (www.barqsuhail.com)
// Optimized for High-Density 99+ Products Catalog

const STORE_PHONE = "966507181115";
let cart = JSON.parse(localStorage.getItem("barq_cart")) || [];

// Catalog State
let activeCategory = "all";
let searchQuery = "";
let sortBy = "featured";
let viewMode = localStorage.getItem("barq_view_mode") || "grid";
let currentPage = 1;
let itemsPerPage = 20; // 20 products per page default

document.addEventListener("DOMContentLoaded", () => {
  initTheme();
  applyThemeConfig();
  updateCategoryPillCounts();
  applyViewModeUI();
  renderProducts();
  updateCartUI();
  setupEventListeners();
});

// ----------------- VISUAL THEME & LAYOUT BUILDER SYNC -----------------
function applyThemeConfig() {
  let config = null;
  const raw = localStorage.getItem("barq_theme_config");
  if (raw) {
    try { config = JSON.parse(raw); } catch(e) {}
  }
  if (!config && typeof THEME_CONFIG !== 'undefined' && THEME_CONFIG && Object.keys(THEME_CONFIG).length > 0) {
    config = THEME_CONFIG;
  }
  if (!config && typeof window !== 'undefined' && window.THEME_CONFIG && Object.keys(window.THEME_CONFIG).length > 0) {
    config = window.THEME_CONFIG;
  }
  if (!config) return;
  try {

    // 1. Reorder & Toggle Sections Visibility
    const mainContainer = document.getElementById("main-sections-container");
    if (mainContainer && Array.isArray(config.sectionsOrder)) {
      config.sectionsOrder.forEach(secId => {
        const secEl = document.getElementById(secId);
        if (secEl) {
          mainContainer.appendChild(secEl);
          if (config.sectionsVisible && config.sectionsVisible[secId] === false) {
            secEl.style.display = "none";
          } else {
            secEl.style.display = "";
          }
        }
      });
    }

    // 2. Hero Banner (home)
    if (config.banner) {
      const bannerImg = document.getElementById("hero-banner-img");
      const bannerImgContainer = document.getElementById("hero-banner-img-container");
      if (bannerImg && config.banner.image) bannerImg.src = config.banner.image;
      if (bannerImg && config.banner.fit) bannerImg.style.objectFit = config.banner.fit;
      if (bannerImgContainer && config.banner.height) {
        bannerImgContainer.style.height = config.banner.height;
        if (bannerImg) bannerImg.style.height = "100%";
      }
      if (config.banner.title) {
        const titleEl = document.getElementById("hero-main-title");
        if (titleEl) titleEl.innerHTML = config.banner.title;
      }
      if (config.banner.desc) {
        const descEl = document.getElementById("hero-main-desc");
        if (descEl) descEl.innerHTML = config.banner.desc;
      }
      if (config.banner.btnText) {
        const btnTextEl = document.getElementById("hero-cta-btn-text");
        if (btnTextEl) btnTextEl.textContent = config.banner.btnText;
      }
      if (config.banner.btnLink) {
        const btnEl = document.getElementById("hero-cta-btn");
        if (btnEl) btnEl.href = config.banner.btnLink;
      }
    }

    // 3. Thuraya Spotlight Section
    if (config.thuraya) {
      const thurayaImg = document.getElementById("thuraya-banner-img");
      const thurayaImgContainer = document.getElementById("thuraya-banner-img-container");
      if (thurayaImg && config.thuraya.image) thurayaImg.src = config.thuraya.image;
      if (thurayaImg && config.thuraya.fit) thurayaImg.style.objectFit = config.thuraya.fit;
      if (thurayaImgContainer && config.thuraya.height) {
        thurayaImgContainer.style.height = config.thuraya.height;
        if (thurayaImg) thurayaImg.style.height = "100%";
      }
      const titleEl = document.getElementById("thuraya-title");
      if (titleEl && config.thuraya.title) titleEl.textContent = config.thuraya.title;
      const descEl = document.getElementById("thuraya-desc");
      if (descEl && config.thuraya.desc) descEl.textContent = config.thuraya.desc;
      const btnTextEl = document.getElementById("thuraya-cta-btn-text");
      if (btnTextEl && config.thuraya.btnText) btnTextEl.textContent = config.thuraya.btnText;
      const btnEl = document.getElementById("thuraya-cta-btn");
      if (btnEl && config.thuraya.btnLink) btnEl.href = config.thuraya.btnLink;
    }

    // 4. Garmin GPS Section
    if (config.garmin) {
      const garminImg = document.getElementById("garmin-banner-img");
      const garminImgContainer = document.getElementById("garmin-banner-img-container");
      if (garminImg && config.garmin.image) garminImg.src = config.garmin.image;
      if (garminImg && config.garmin.fit) garminImg.style.objectFit = config.garmin.fit;
      if (garminImgContainer && config.garmin.height) {
        garminImgContainer.style.height = config.garmin.height;
        if (garminImg) garminImg.style.height = "100%";
      }
      const titleEl = document.getElementById("garmin-title");
      if (titleEl && config.garmin.title) titleEl.textContent = config.garmin.title;
      const descEl = document.getElementById("garmin-desc");
      if (descEl && config.garmin.desc) descEl.textContent = config.garmin.desc;
      const btnTextEl = document.getElementById("garmin-cta-btn-text");
      if (btnTextEl && config.garmin.btnText) btnTextEl.textContent = config.garmin.btnText;
      const btnEl = document.getElementById("garmin-cta-btn");
      if (btnEl && config.garmin.btnLink) btnEl.href = config.garmin.btnLink;
    }

    // 5. B2B Quote Section
    if (config.b2b) {
      const titleEl = document.getElementById("b2b-title");
      if (titleEl && config.b2b.title) titleEl.textContent = config.b2b.title;
      const descEl = document.getElementById("b2b-desc");
      if (descEl && config.b2b.desc) descEl.textContent = config.b2b.desc;
    }

    // 6. Showroom Card Section
    if (config.showroom) {
      const showroomImg = document.getElementById("showroom-banner-img");
      const showroomImgContainer = document.getElementById("showroom-banner-img-container");
      if (showroomImg && config.showroom.image) showroomImg.src = config.showroom.image;
      if (showroomImg && config.showroom.fit) showroomImg.style.objectFit = config.showroom.fit;
      if (showroomImgContainer && config.showroom.height) {
        showroomImgContainer.style.height = config.showroom.height;
        if (showroomImg) showroomImg.style.height = "100%";
      }
      const titleEl = document.getElementById("showroom-title");
      if (titleEl && config.showroom.title) titleEl.textContent = config.showroom.title;
      const descEl = document.getElementById("showroom-desc");
      if (descEl && config.showroom.desc) descEl.textContent = config.showroom.desc;
      const addrEl = document.getElementById("showroom-address-text");
      if (addrEl && config.showroom.address) addrEl.textContent = config.showroom.address;
      const hoursEl = document.getElementById("showroom-hours-text");
      if (hoursEl && config.showroom.hours) hoursEl.textContent = config.showroom.hours;
      const phoneEl = document.getElementById("showroom-phone-text");
      if (phoneEl && config.showroom.phone) phoneEl.textContent = config.showroom.phone;
    }

    // 7. Header Quote Button
    if (config.headerBtn) {
      const hBtn = document.getElementById("header-quote-btn");
      const hBtnText = document.getElementById("header-quote-btn-text");
      if (hBtnText && config.headerBtn.text) hBtnText.textContent = config.headerBtn.text;
      if (hBtn && config.headerBtn.link) hBtn.href = config.headerBtn.link;
    }

    // 8. WhatsApp Floating Button
    if (config.whatsapp) {
      const waBtn = document.querySelector('a[href*="wa.me"]');
      if (waBtn) {
        const phone = config.whatsapp.phone || STORE_PHONE;
        const msg = encodeURIComponent(config.whatsapp.message || "");
        waBtn.href = `https://wa.me/${phone}${msg ? '?text=' + msg : ''}`;
      }
    }

    // 9. Grid Layout Columns & Sizing
    if (config.layout && config.layout.gridCols) {
      const prodContainer = document.getElementById("products-container");
      if (prodContainer && viewMode === "grid") {
        const cols = config.layout.gridCols;
        if (cols === "3") {
          prodContainer.className = "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 transition-all";
        } else if (cols === "4") {
          prodContainer.className = "grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 transition-all";
        } else if (cols === "6") {
          prodContainer.className = "grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-3 transition-all";
        } else {
          prodContainer.className = "grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3 sm:gap-4 transition-all";
        }
      }
    }
  } catch(e) {
    console.error("Error applying theme config:", e);
  }
}



// ----------------- THEME MANAGEMENT (Light / Dark) -----------------
function initTheme() {
  const saved = localStorage.getItem("barq_theme");
  const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
  const activeTheme = saved ? saved : (prefersDark ? "dark" : "dark"); // default to sleek dark
  setTheme(activeTheme, false);
}

function toggleTheme() {
  const isCurrentlyDark = document.documentElement.classList.contains("dark") || 
                          !document.documentElement.classList.contains("light");
  const newTheme = isCurrentlyDark ? "light" : "dark";
  setTheme(newTheme, true);
  showToast(newTheme === "light" ? "تم تفعيل الوضع الفاتح ☀️" : "تم تفعيل الوضع الداكن 🌙");
}

function setTheme(theme, save = true) {
  const html = document.documentElement;
  if (theme === "dark") {
    html.classList.add("dark");
    html.classList.remove("light");
  } else {
    html.classList.add("light");
    html.classList.remove("dark");
  }

  if (save) {
    localStorage.setItem("barq_theme", theme);
  }

  updateThemeToggleUI(theme);
}

function updateThemeToggleUI(theme) {
  const buttons = document.querySelectorAll(".theme-toggle-btn");
  buttons.forEach(btn => {
    const isTopMini = btn.querySelector(".theme-label");
    if (isTopMini) {
      if (theme === "dark") {
        btn.innerHTML = `<i class="fas fa-sun text-[11px] text-amber-400"></i><span class="theme-label text-[10px] text-slate-300">داكن</span>`;
        btn.setAttribute("title", "التبديل إلى الوضع الفاتح");
      } else {
        btn.innerHTML = `<i class="fas fa-moon text-[11px] text-cyan-600"></i><span class="theme-label text-[10px] text-slate-700">فاتح</span>`;
        btn.setAttribute("title", "التبديل إلى الوضع الداكن");
      }
    } else {
      if (theme === "dark") {
        btn.innerHTML = `<i class="fas fa-sun text-amber-400 text-base"></i>`;
        btn.setAttribute("title", "التبديل إلى الوضع الفاتح (Light Mode)");
      } else {
        btn.innerHTML = `<i class="fas fa-moon text-cyan-600 text-base"></i>`;
        btn.setAttribute("title", "التبديل إلى الوضع الداكن (Dark Mode)");
      }
    }
  });
}

// Get Products from localStorage or INITIAL_PRODUCTS
function getProducts() {
  const stored = localStorage.getItem("barq_products");
  if (stored) {
    try {
      const parsed = JSON.parse(stored);
      if (Array.isArray(parsed) && parsed.length > 0) return parsed;
    } catch (e) {
      console.error("Error reading stored products:", e);
    }
  }
  return typeof INITIAL_PRODUCTS !== "undefined" ? INITIAL_PRODUCTS : [];
}

// Update count badges on category pills
function updateCategoryPillCounts() {
  const products = getProducts();
  const counts = {
    all: products.length,
    devices: 0,
    thuraya: 0,
    garmin: 0,
    radios: 0,
    accessories: 0,
    cards: 0,
    services: 0
  };

  products.forEach(p => {
    if (counts[p.category] !== undefined) {
      counts[p.category]++;
    }
  });

  for (const [key, count] of Object.entries(counts)) {
    const el = document.getElementById(`count-${key}`);
    if (el) el.textContent = count;
  }

  const badgeTotal = document.getElementById("catalog-badge-total");
  if (badgeTotal) badgeTotal.textContent = `${products.length} منتج في المخزون`;
}

// ----------------- INTELLIGENT ARABIC & MULTILINGUAL SEARCH ENGINE -----------------
function normalizeSearchText(str) {
  if (!str) return "";
  return str
    .toString()
    .toLowerCase()
    .replace(/[\u064B-\u065F\u0670]/g, "") // remove tashkeel (diacritics)
    .replace(/[أإآ]/g, "ا")
    .replace(/ة/g, "ه")
    .replace(/[ىي]/g, "ي")
    .replace(/[ؤئ]/g, "ء")
    .replace(/[-_.,/\\()]/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

const SEARCH_ALIASES = {
  "ايك": ["ايكوم", "آيكوم", "icom", "v3500", "2300", "2730", "f1000", "hm 133"],
  "ايكوم": ["icom", "آيكوم", "v3500", "2300", "2730", "f1000", "hm 133"],
  "icom": ["ايكوم", "آيكوم", "v3500", "2300", "2730"],
  "كنود": ["كينوود", "kenwood", "tm 281", "281"],
  "كينوود": ["kenwood", "كنود", "tm 281", "281"],
  "kenwood": ["كينوود", "كنود"],
  "ثريا": ["thuraya", "xt", "xt pro", "xt lite", "x5"],
  "ثرياء": ["thuraya", "ثريا"],
  "thuraya": ["ثريا", "xt pro", "xt lite", "x5"],
  "قارمن": ["garmin", "جارمن", "montana", "gpsmap", "tread", "drivesmart", "خرائط"],
  "جارمن": ["garmin", "قارمن", "montana", "gpsmap"],
  "garmin": ["قارمن", "جارمن", "gps", "montana"],
  "موتورولا": ["motorola", "موتورلا", "gp328", "cp040"],
  "motorola": ["موتورولا", "موتورلا"],
  "هوائي": ["انتل", "دايموند", "diamond", "comet", "اريال", "سوطي"],
  "انتل": ["هوائي", "دايموند", "diamond", "comet", "سوطي"],
  "دايموند": ["diamond", "دايموند", "هوائي", "انتل"],
  "diamond": ["دايموند", "هوائي", "انتل"],
  "ريشه": ["مايك", "ميكروفون", "ريشة", "mic", "hm 133"],
  "ريشة": ["مايك", "ميكروفون", "ريشه", "mic", "hm 133"],
  "مايك": ["ريشه", "ريشة", "ميكروفون", "mic", "hm 133"],
  "شاحن": ["شواحن", "شاحن سياره", "قاعده شحن", "charger", "محول"],
  "بطاريه": ["بطارية", "بطاريات", "battery", "bp"],
  "كيبل": ["كابل", "سلك", "توصيله", "rg58", "rg8", "cable", "كونكتر"],
  "قاعده": ["قاعدة", "مغناطيس", "تثبيت", "mount", "ستاند"],
  "قاعدة": ["قاعده", "مغناطيس", "تثبيت", "mount"],
  "شريحه": ["شريحة", "شرائح", "sim", "رصيد", "تجديد", "كارت", "بطاقه"],
  "شريحة": ["شريحه", "شرائح", "sim", "رصيد", "تجديد", "كارت", "بطاقه"],
  "خرائط": ["خريطه", "برمجه", "تحديث", "صحراء", "براري", "maps"]
};

function matchProductSearch(p, query) {
  const normQ = normalizeSearchText(query);
  if (!normQ) return true;

  const pName = normalizeSearchText(p.name);
  const pNameEn = normalizeSearchText(p.nameEn);
  const pId = normalizeSearchText(p.id);
  const pDesc = normalizeSearchText(p.shortDesc);
  const pCat = normalizeSearchText(p.categoryName);
  const pBadge = normalizeSearchText(p.badge);
  const pSpecs = Array.isArray(p.specs) ? p.specs.map(s => normalizeSearchText(s)).join(" ") : "";
  const fullProductText = `${pName} ${pNameEn} ${pId} ${pCat} ${pBadge} ${pDesc} ${pSpecs}`;

  // 1. Exact or partial substring match in product text
  if (fullProductText.includes(normQ)) return true;

  // 2. Tokenize search query words
  const queryTokens = normQ.split(" ").filter(Boolean);
  const allTokensMatch = queryTokens.every(tok => {
    if (fullProductText.includes(tok)) return true;

    // Check aliases for this token
    for (const [key, aliases] of Object.entries(SEARCH_ALIASES)) {
      if (tok.startsWith(key) || key.startsWith(tok) || tok === key) {
        if (aliases.some(alias => fullProductText.includes(alias))) return true;
      }
    }
    return false;
  });

  if (allTokensMatch) return true;

  // 3. Check alias triggers
  for (const [key, aliases] of Object.entries(SEARCH_ALIASES)) {
    if (key.includes(normQ) || normQ.includes(key)) {
      if (aliases.some(alias => fullProductText.includes(alias))) return true;
    }
  }

  return false;
}

// Filter and Sort Products
function getFilteredAndSortedProducts() {
  const products = getProducts();

  // 1. Filter by category & smart search matching
  let filtered = products.filter(p => {
    const matchCat = (activeCategory === "all" || p.category === activeCategory);
    const matchSearch = matchProductSearch(p, searchQuery);
    return matchCat && matchSearch;
  });

  // 2. Sort
  switch (sortBy) {
    case "price-asc":
      filtered.sort((a, b) => a.price - b.price);
      break;
    case "price-desc":
      filtered.sort((a, b) => b.price - a.price);
      break;
    case "rating-desc":
      filtered.sort((a, b) => (b.rating || 0) - (a.rating || 0));
      break;
    case "name-asc":
      filtered.sort((a, b) => a.name.localeCompare(b.name, "ar"));
      break;
    case "featured":
    default:
      filtered.sort((a, b) => (a.displayIndex || 0) - (b.displayIndex || 0));
      break;
  }

  return filtered;
}

// Render Products Grid / List with Pagination
function renderProducts() {
  const container = document.getElementById("products-container");
  const countText = document.getElementById("results-count-text");
  const paginationContainer = document.getElementById("pagination-container");
  if (!container) return;

  const allFiltered = getFilteredAndSortedProducts();
  const totalItems = allFiltered.length;

  // Pagination calculation
  const effectivePerPage = itemsPerPage === "all" ? totalItems : parseInt(itemsPerPage, 10);
  const totalPages = Math.max(1, Math.ceil(totalItems / effectivePerPage));

  if (currentPage > totalPages) currentPage = totalPages;
  if (currentPage < 1) currentPage = 1;

  const startIndex = (currentPage - 1) * effectivePerPage;
  const endIndex = itemsPerPage === "all" ? totalItems : Math.min(startIndex + effectivePerPage, totalItems);
  const displayedProducts = allFiltered.slice(startIndex, endIndex);

  // Update Status bar text
  if (countText) {
    if (totalItems === 0) {
      countText.innerHTML = `<span class="text-rose-400 font-bold">لا توجد نتائج مطابقة</span>`;
    } else {
      countText.innerHTML = `عرض <span class="text-cyan-400 font-bold font-mono">${startIndex + 1} - ${endIndex}</span> من أصل <span class="text-white font-bold font-mono">${totalItems}</span> منتج`;
    }
  }

  // Active filter tags
  updateActiveFilterTags(totalItems);

  // Empty state
  if (displayedProducts.length === 0) {
    container.className = "w-full py-16 text-center text-slate-400 bg-slate-900/40 border border-slate-800 rounded-3xl";
    container.innerHTML = `
      <div class="max-w-md mx-auto space-y-3">
        <div class="w-16 h-16 rounded-2xl bg-cyan-500/10 text-cyan-400 flex items-center justify-center text-2xl mx-auto border border-cyan-500/20">
          <i class="fas fa-search"></i>
        </div>
        <h3 class="text-lg font-bold text-white">لم نجد أجهزة مطابقة لبحثك</h3>
        <p class="text-xs text-slate-400">جرب البحث بكلمات أخرى أو اختر قسماً مختلفاً من الكبسولات أعلاه.</p>
        <button onclick="resetFilters()" class="bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-xs px-5 py-2.5 rounded-xl transition shadow-lg shadow-cyan-500/20">
          إعادة ضبط وتصفح كل المنتجات
        </button>
      </div>
    `;
    if (paginationContainer) paginationContainer.innerHTML = "";
    return;
  }

  // Apply layout class
  if (viewMode === "list") {
    container.className = "flex flex-col gap-3 transition-all";
    container.innerHTML = displayedProducts.map(p => renderListCard(p)).join("");
  } else {
    container.className = "grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3 sm:gap-4 transition-all";
    container.innerHTML = displayedProducts.map(p => renderGridCard(p)).join("");
  }

  // Render Pagination
  renderPaginationUI(totalPages, totalItems);
}

// Render Compact Grid Card (High-density design)
function renderGridCard(p) {
  return `
    <div class="product-card group relative bg-slate-900/90 border border-slate-800/90 hover:border-cyan-500/50 rounded-2xl overflow-hidden transition-all duration-300 hover:-translate-y-1 shadow-md hover:shadow-xl hover:shadow-cyan-500/10 flex flex-col justify-between">
      
      <!-- Top Action & Badges Overlay -->
      <div class="absolute top-2 inset-x-2 z-10 flex items-center justify-between gap-1.5 pointer-events-none">
        ${p.badge ? `<span class="bg-slate-950/90 text-cyan-300 border border-cyan-500/40 text-[10px] sm:text-[11px] font-bold px-2 py-0.5 rounded-lg backdrop-blur-md shadow-sm shrink-0 truncate max-w-[45%]">${p.badge}</span>` : '<span></span>'}
        
        <div class="flex items-center gap-1.5 shrink-0">
          ${(p.oldPrice && p.oldPrice > p.price) ? `
            <span class="bg-gradient-to-r from-rose-600 via-rose-500 to-amber-500 text-white text-[10px] sm:text-[11px] font-black px-2.5 py-0.5 rounded-lg shadow-lg shadow-rose-500/50 border border-rose-400/60 ring-1 ring-amber-400/50 flex items-center gap-1 font-mono tracking-tight animate-pulse">
              <i class="fas fa-bolt text-[9px] text-amber-200 animate-bounce"></i>
              <span>خصم ${(p.oldPrice - p.price).toLocaleString()} ر.س</span>
            </span>
          ` : ''}


          <button onclick="openProductModal('${p.id}')" class="pointer-events-auto w-7 h-7 rounded-lg bg-slate-950/90 hover:bg-cyan-500 text-slate-300 hover:text-slate-950 flex items-center justify-center text-xs transition border border-slate-800 backdrop-blur-md" title="نظرة سريعة">
            <i class="fas fa-eye"></i>
          </button>
        </div>
      </div>


      <!-- Image Container (Compact h-36 to h-40) -->
      <a href="product.html?id=${encodeURIComponent(p.id)}" class="relative h-36 sm:h-40 w-full bg-slate-950 overflow-hidden cursor-pointer flex items-center justify-center p-2 block" title="فتح صفحة ${p.name}">
        <img 
          src="${p.image}" 
          alt="${p.name}" 
          class="max-h-full max-w-full object-contain group-hover:scale-105 transition-transform duration-500" 
          onerror="this.src='assets/images/main_logo.jpg'; this.classList.add('p-4')"
          loading="lazy"
        >
        <div class="absolute inset-0 bg-gradient-to-t from-slate-900/80 via-transparent to-transparent opacity-60"></div>
      </a>


      <!-- Card Details (Compact padding p-3 sm:p-3.5) -->
      <div class="p-3 sm:p-3.5 flex-1 flex flex-col justify-between bg-slate-900/60">
        <div>
          <!-- Category & Rating Row -->
          <div class="flex items-center justify-between text-[11px] text-slate-400 mb-1">
            <span class="text-cyan-400 font-medium truncate max-w-[70%]">${p.categoryName || 'أجهزة معتمدة'}</span>
            <div class="flex items-center text-amber-400 font-mono text-[10px] shrink-0">
              <i class="fas fa-star text-[9px] ml-0.5"></i>
              <span>${p.rating || '5.0'}</span>
            </div>
          </div>

          <!-- Product Title (Clamped to 2 lines for uniform height) -->
          <h3 class="font-bold text-white text-xs sm:text-sm leading-snug line-clamp-2 group-hover:text-cyan-300 transition-colors mb-2 min-h-[2.5rem]" title="${p.name}">
            <a href="product.html?id=${encodeURIComponent(p.id)}">${p.name}</a>
          </h3>
        </div>

        <!-- Price & Add to Cart Row -->
        <div class="pt-2 border-t border-slate-800/80 flex items-center justify-between mt-auto gap-2">
          <div class="min-w-0">
            <div class="text-sm sm:text-base font-extrabold text-white font-mono flex items-baseline gap-0.5">
              ${p.price.toLocaleString()} <span class="text-[10px] font-normal text-cyan-400 font-sans">ر.س</span>
            </div>
            ${p.oldPrice ? `<span class="text-[10px] text-slate-500 line-through font-mono block truncate">${p.oldPrice.toLocaleString()} ر.س</span>` : ''}
          </div>

          <div class="flex items-center gap-1">
            <a href="product.html?id=${encodeURIComponent(p.id)}" class="p-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white text-xs transition" title="صفحة المنتج">
              <i class="fas fa-arrow-up-right-from-square text-[11px]"></i>
            </a>
            <button onclick="addToCart('${p.id}')" class="bg-gradient-to-r from-cyan-500 to-teal-500 hover:from-cyan-400 hover:to-teal-400 text-slate-950 font-bold px-2.5 sm:px-3 py-1.5 rounded-xl text-xs flex items-center gap-1 shadow-md shadow-cyan-500/20 transition active:scale-95 shrink-0" title="إضافة للسلة">
              <i class="fas fa-cart-plus text-[11px]"></i>
              <span class="hidden sm:inline text-[11px]">سلة</span>
            </button>
          </div>
        </div>

      </div>

    </div>
  `;
}

// Render Compact List Card (Horizontal fast comparison layout)
function renderListCard(p) {
  return `
    <div class="product-card group bg-slate-900/90 border border-slate-800 hover:border-cyan-500/50 rounded-2xl p-3 sm:p-4 transition-all duration-200 hover:-translate-y-0.5 shadow-md flex flex-col sm:flex-row items-center justify-between gap-4">
      
      <div class="flex items-center gap-3.5 w-full sm:w-auto flex-1 min-w-0">
        <!-- Thumbnail -->
        <a href="product.html?id=${encodeURIComponent(p.id)}" class="w-16 h-16 sm:w-20 sm:h-20 rounded-xl bg-slate-950 border border-slate-800 overflow-hidden shrink-0 flex items-center justify-center p-1 cursor-pointer block" title="فتح صفحة ${p.name}">
          <img src="${p.image}" alt="${p.name}" class="max-h-full max-w-full object-contain group-hover:scale-105 transition" onerror="this.src='assets/images/main_logo.jpg'">
        </a>

        <!-- Info -->
        <div class="flex-1 min-w-0 space-y-1">
          <div class="flex items-center gap-2 flex-wrap">
            <span class="text-[11px] font-bold text-cyan-400 bg-cyan-500/10 px-2 py-0.5 rounded-md border border-cyan-500/20">${p.categoryName}</span>
            ${(p.oldPrice && p.oldPrice > p.price) ? `<span class="text-[10px] font-bold text-white bg-gradient-to-r from-rose-600 to-amber-500 px-2 py-0.5 rounded-md shadow-sm font-mono">خصم ${(p.oldPrice - p.price).toLocaleString()} ر.س</span>` : ''}
            ${p.badge ? `<span class="text-[10px] font-bold text-slate-300 bg-slate-800 px-2 py-0.5 rounded-md">${p.badge}</span>` : ''}
            <div class="flex items-center text-amber-400 font-mono text-xs">
              <i class="fas fa-star text-[10px] ml-1"></i>
              <span>${p.rating}</span>
            </div>
          </div>

          <h3 class="font-bold text-white text-sm sm:text-base truncate group-hover:text-cyan-300 transition-colors">
            <a href="product.html?id=${encodeURIComponent(p.id)}">${p.name}</a>
          </h3>

          <p class="text-xs text-slate-400 line-clamp-1 hidden md:block">${p.shortDesc}</p>
        </div>
      </div>

      <!-- Price & Actions Side -->
      <div class="flex items-center justify-between sm:justify-end gap-4 w-full sm:w-auto pt-2 sm:pt-0 border-t sm:border-t-0 border-slate-800 shrink-0">
        <div class="text-left sm:text-right">
          <div class="text-base sm:text-lg font-extrabold text-white font-mono">
            ${p.price.toLocaleString()} <span class="text-xs font-normal text-cyan-400 font-sans">ر.س</span>
          </div>
          ${p.oldPrice ? `<span class="text-xs text-slate-500 line-through font-mono">${p.oldPrice.toLocaleString()} ر.س</span>` : ''}
        </div>

        <div class="flex items-center gap-2">
          <button onclick="openProductModal('${p.id}')" class="p-2 bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white rounded-xl text-xs transition" title="عرض التفاصيل">
            <i class="fas fa-eye"></i>
          </button>
          <button onclick="addToCart('${p.id}')" class="bg-gradient-to-r from-cyan-500 to-teal-500 hover:from-cyan-400 hover:to-teal-400 text-slate-950 font-bold px-4 py-2 rounded-xl text-xs flex items-center gap-1.5 shadow-md shadow-cyan-500/20 transition active:scale-95">
            <i class="fas fa-cart-plus"></i>
            <span>إضافة للسلة</span>
          </button>
        </div>
      </div>

    </div>
  `;
}

// Render Pagination Controls
function renderPaginationUI(totalPages, totalItems) {
  const container = document.getElementById("pagination-container");
  if (!container) return;

  if (totalPages <= 1 || itemsPerPage === "all") {
    container.innerHTML = `
      <div class="text-xs text-slate-500">تم عرض جميع المنتجات (${totalItems})</div>
      <div class="flex items-center gap-2">
        <button onclick="scrollToProductsTop()" class="text-xs text-cyan-400 hover:text-cyan-300 font-bold flex items-center gap-1">
          <i class="fas fa-arrow-up"></i> العودة للأعلى
        </button>
      </div>
    `;
    return;
  }

  let buttonsHtml = "";

  // Prev Button
  buttonsHtml += `
    <button 
      onclick="goToPage(${currentPage - 1})" 
      ${currentPage === 1 ? 'disabled class="opacity-40 cursor-not-allowed px-3 py-2 rounded-xl bg-slate-900 border border-slate-800 text-slate-500 text-xs flex items-center gap-1"' : 'class="px-3 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-700 text-slate-200 text-xs font-bold transition flex items-center gap-1"'}
    >
      <i class="fas fa-chevron-right"></i>
      <span>السابق</span>
    </button>
  `;

  // Page Numbers
  const maxButtons = 5;
  let startPage = Math.max(1, currentPage - 2);
  let endPage = Math.min(totalPages, startPage + maxButtons - 1);
  if (endPage - startPage < maxButtons - 1) {
    startPage = Math.max(1, endPage - maxButtons + 1);
  }

  if (startPage > 1) {
    buttonsHtml += `<button onclick="goToPage(1)" class="w-8 h-8 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-300 border border-slate-800 text-xs font-mono font-bold transition">1</button>`;
    if (startPage > 2) buttonsHtml += `<span class="text-slate-600 px-1 font-mono">...</span>`;
  }

  for (let i = startPage; i <= endPage; i++) {
    const isActive = i === currentPage;
    buttonsHtml += `
      <button 
        onclick="goToPage(${i})" 
        class="w-8 h-8 rounded-xl text-xs font-mono font-bold transition ${isActive ? 'bg-cyan-500 text-slate-950 shadow-md shadow-cyan-500/30' : 'bg-slate-900 hover:bg-slate-800 text-slate-300 border border-slate-800'}"
      >
        ${i}
      </button>
    `;
  }

  if (endPage < totalPages) {
    if (endPage < totalPages - 1) buttonsHtml += `<span class="text-slate-600 px-1 font-mono">...</span>`;
    buttonsHtml += `<button onclick="goToPage(${totalPages})" class="w-8 h-8 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-300 border border-slate-800 text-xs font-mono font-bold transition">${totalPages}</button>`;
  }

  // Next Button
  buttonsHtml += `
    <button 
      onclick="goToPage(${currentPage + 1})" 
      ${currentPage === totalPages ? 'disabled class="opacity-40 cursor-not-allowed px-3 py-2 rounded-xl bg-slate-900 border border-slate-800 text-slate-500 text-xs flex items-center gap-1"' : 'class="px-3 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-700 text-slate-200 text-xs font-bold transition flex items-center gap-1"'}
    >
      <span>التالي</span>
      <i class="fas fa-chevron-left"></i>
    </button>
  `;

  container.innerHTML = `
    <div class="text-xs text-slate-400 font-mono">
      صفحة <span class="text-white font-bold">${currentPage}</span> من <span class="text-white font-bold">${totalPages}</span>
    </div>
    <div class="flex items-center gap-1.5 flex-wrap justify-center">
      ${buttonsHtml}
    </div>
  `;
}

// Navigation and Filter handlers
function goToPage(page) {
  currentPage = page;
  renderProducts();
  scrollToProductsTop();
}

function scrollToProductsTop() {
  const section = document.getElementById("products");
  if (section) {
    section.scrollIntoView({ behavior: "smooth", block: "start" });
  }
}

function setCategory(cat, btn) {
  activeCategory = cat;
  currentPage = 1;

  document.querySelectorAll(".cat-pill").forEach(el => {
    el.classList.remove("bg-cyan-500", "text-slate-950", "shadow-cyan-500/30");
    el.classList.add("bg-slate-800/80", "text-slate-300");
  });

  if (btn) {
    btn.classList.add("bg-cyan-500", "text-slate-950", "shadow-cyan-500/30");
    btn.classList.remove("bg-slate-800/80", "text-slate-300");
  }

  renderProducts();
}

function changeSort(val) {
  sortBy = val;
  currentPage = 1;
  renderProducts();
}

function changeItemsPerPage(val) {
  itemsPerPage = val;
  currentPage = 1;
  renderProducts();
}

function setViewMode(mode) {
  viewMode = mode;
  localStorage.setItem("barq_view_mode", mode);
  applyViewModeUI();
  renderProducts();
}

function applyViewModeUI() {
  const btnGrid = document.getElementById("btn-view-grid");
  const btnList = document.getElementById("btn-view-list");
  if (!btnGrid || !btnList) return;

  if (viewMode === "list") {
    btnList.className = "px-3 py-1.5 rounded-lg text-xs font-bold transition flex items-center gap-1.5 bg-cyan-500 text-slate-950 shadow-md shadow-cyan-500/20";
    btnGrid.className = "px-3 py-1.5 rounded-lg text-xs font-bold transition flex items-center gap-1.5 text-slate-400 hover:text-white";
  } else {
    btnGrid.className = "px-3 py-1.5 rounded-lg text-xs font-bold transition flex items-center gap-1.5 bg-cyan-500 text-slate-950 shadow-md shadow-cyan-500/20";
    btnList.className = "px-3 py-1.5 rounded-lg text-xs font-bold transition flex items-center gap-1.5 text-slate-400 hover:text-white";
  }
}

function clearSearch() {
  const searchInput = document.getElementById("search-input");
  if (searchInput) {
    searchInput.value = "";
    searchQuery = "";
  }
  const clearBtn = document.getElementById("search-clear-btn");
  if (clearBtn) clearBtn.classList.add("hidden");
  currentPage = 1;
  renderProducts();
}

function resetFilters() {
  searchQuery = "";
  activeCategory = "all";
  sortBy = "featured";

  const searchInput = document.getElementById("search-input");
  if (searchInput) searchInput.value = "";

  const sortSelect = document.getElementById("sort-select");
  if (sortSelect) sortSelect.value = "featured";

  const firstCatBtn = document.querySelector(".cat-pill");
  setCategory("all", firstCatBtn);
}

function updateActiveFilterTags(totalCount) {
  const container = document.getElementById("active-filter-tags");
  if (!container) return;

  let tags = [];
  if (activeCategory !== "all") {
    const catMap = {
      thuraya: "أجهزة الثريا",
      garmin: "قارمن والملاحة",
      radios: "أجهزة اللاسلكي",
      accessories: "الملحقات والهوائيات",
      cards: "الشرائح والرصيد",
      services: "خدمات التحديث"
    };
    tags.push(`
      <span class="inline-flex items-center gap-1 bg-cyan-500/10 text-cyan-400 border border-cyan-500/30 px-2 py-0.5 rounded-lg text-[11px]">
        قسم: ${catMap[activeCategory] || activeCategory}
        <button onclick="setCategory('all', document.querySelector('.cat-pill'))" class="hover:text-white mr-1">&times;</button>
      </span>
    `);
  }

  if (searchQuery.trim()) {
    tags.push(`
      <span class="inline-flex items-center gap-1 bg-slate-800 text-slate-300 border border-slate-700 px-2 py-0.5 rounded-lg text-[11px]">
        بحث: "${searchQuery}"
        <button onclick="clearSearch()" class="hover:text-white mr-1">&times;</button>
      </span>
    `);
  }

  container.innerHTML = tags.join("");
}

// ----------------- CART SYSTEM -----------------
function addToCart(productId) {
  const products = getProducts();
  const product = products.find(p => p.id === productId);
  if (!product) return;

  const existing = cart.find(item => item.id === productId);
  if (existing) {
    existing.qty += 1;
  } else {
    cart.push({ ...product, qty: 1 });
  }

  saveCart();
  updateCartUI();
  toggleCart(true); // Open drawer smoothly on add
  showToast(`تمت إضافة "${product.name}" إلى السلة 🛒`);
}

function updateQty(productId, delta) {
  const item = cart.find(i => i.id === productId);
  if (!item) return;

  item.qty += delta;
  if (item.qty <= 0) {
    cart = cart.filter(i => i.id !== productId);
  }

  saveCart();
  updateCartUI();
}

function removeFromCart(productId) {
  cart = cart.filter(i => i.id !== productId);
  saveCart();
  updateCartUI();
  showToast("تم حذف المنتج من السلة");
}

function saveCart() {
  localStorage.setItem("barq_cart", JSON.stringify(cart));
}

function updateCartUI() {
  const totalCount = cart.reduce((sum, i) => sum + i.qty, 0);
  const totalPrice = cart.reduce((sum, i) => sum + (i.price * i.qty), 0);

  // Badge count
  document.querySelectorAll(".cart-count").forEach(el => {
    el.textContent = totalCount;
    el.classList.toggle("hidden", totalCount === 0);
  });

  // Cart Drawer Content
  const itemsContainer = document.getElementById("cart-items");
  const totalEl = document.getElementById("cart-total");

  if (itemsContainer) {
    if (cart.length === 0) {
      itemsContainer.innerHTML = `
        <div class="py-16 text-center text-slate-400">
          <i class="fas fa-shopping-basket text-5xl mb-3 text-slate-600"></i>
          <p class="text-base font-bold text-white">سلة مشترياتك فارغة حالياً</p>
          <p class="text-xs text-slate-400 mt-1">تصفح أجهزتنا وأضف ما يناسبك</p>
        </div>
      `;
    } else {
      itemsContainer.innerHTML = cart.map(item => `
        <div class="flex items-center gap-3 p-3.5 bg-slate-950 border border-slate-800 rounded-2xl">
          <img src="${item.image}" alt="${item.name}" class="w-16 h-16 object-contain rounded-xl bg-slate-900 border border-slate-800 shrink-0 p-1" onerror="this.src='assets/images/main_logo.jpg'">
          
          <div class="flex-1 min-w-0">
            <h4 class="text-xs font-bold text-white leading-tight mb-1 truncate">${item.name}</h4>
            <div class="text-cyan-400 text-xs font-mono font-bold">${(item.price * item.qty).toLocaleString()} ر.س</div>
            
            <div class="flex items-center gap-2 mt-2">
              <div class="flex items-center bg-slate-900 border border-slate-700 rounded-lg overflow-hidden">
                <button onclick="updateQty('${item.id}', -1)" class="w-6 h-6 text-slate-300 hover:text-white hover:bg-slate-800 flex items-center justify-center text-xs font-bold transition">-</button>
                <span class="text-xs text-white font-mono px-2 font-bold">${item.qty}</span>
                <button onclick="updateQty('${item.id}', 1)" class="w-6 h-6 text-slate-300 hover:text-white hover:bg-slate-800 flex items-center justify-center text-xs font-bold transition">+</button>
              </div>
            </div>
          </div>

          <button onclick="removeFromCart('${item.id}')" class="text-slate-500 hover:text-red-400 p-2 rounded-lg hover:bg-slate-900 transition" title="حذف">
            <i class="fas fa-trash-can text-sm"></i>
          </button>
        </div>
      `).join("");
    }
  }

  if (totalEl) totalEl.textContent = `${totalPrice.toLocaleString()} ر.س`;
}

function toggleCart(show) {
  const container = document.getElementById("cart-modal-container");
  if (!container) return;

  if (show) {
    container.classList.remove("hidden");
    document.body.style.overflow = "hidden";
  } else {
    container.classList.add("hidden");
    document.body.style.overflow = "auto";
  }
}

function checkoutViaWhatsApp() {
  if (cart.length === 0) {
    showToast("سلتك فارغة! يرجى إضافة منتجات أولاً.");
    return;
  }

  const total = cart.reduce((sum, i) => sum + (i.price * i.qty), 0);
  let msg = `السلام عليكم ورحمة الله،\nأود إتمام طلب شراء من موقع مؤسسة برق سهيل التجارية:\n\n`;
  
  cart.forEach((item, idx) => {
    msg += `${idx + 1}. *${item.name}*\n   - الكمية: ${item.qty}\n   - السعر الإجمالي: ${(item.price * item.qty).toLocaleString()} ر.س\n`;
  });

  msg += `\n*المجموع الإجمالي:* ${total.toLocaleString()} ر.س\n\nيرجى تأكيد توفر المنتجات وتزويدي ببيانات الدفع والتوصيل. شكراً لكم!`;

  const url = `https://wa.me/${STORE_PHONE}?text=${encodeURIComponent(msg)}`;
  window.open(url, "_blank");
}

// ----------------- B2B QUOTE FORM -----------------
function submitQuoteForm(e) {
  e.preventDefault();
  const form = e.target;
  const name = form.company_name.value;
  const contact = form.contact_person.value;
  const phone = form.phone.value;
  const productType = form.product_type.value;
  const qty = form.quantity.value;
  const notes = form.notes.value;

  const quote = {
    id: "Q-" + Date.now().toString().slice(-5),
    name,
    contact,
    phone,
    productType,
    qty,
    notes,
    date: new Date().toLocaleDateString("ar-SA")
  };

  const quotes = JSON.parse(localStorage.getItem("barq_quotes") || "[]");
  quotes.unshift(quote);
  localStorage.setItem("barq_quotes", JSON.stringify(quotes));

  let msg = `*طلب عرض سعر رسمي (B2B / مؤسسات)*\n`;
  msg += `🏢 المؤسسة/الجهة: ${name}\n`;
  msg += `👤 المسؤول: ${contact}\n`;
  msg += `📞 الهاتف: ${phone}\n`;
  msg += `📦 نوع الأجهزة والخدمات: ${productType}\n`;
  msg += `🔢 الكمية المطلوبة: ${qty}\n`;
  if (notes) msg += `📝 ملاحظات إضافية: ${notes}\n`;

  const url = `https://wa.me/${STORE_PHONE}?text=${encodeURIComponent(msg)}`;
  window.open(url, "_blank");

  form.reset();
  showToast("تم استلام طلب عرض السعر وجاري تحويلك للواتساب!");
}

// ----------------- QUICK VIEW MODAL -----------------
function openProductModal(productId) {
  const products = getProducts();
  const p = products.find(i => i.id === productId);
  if (!p) return;

  const modal = document.getElementById("product-modal");
  const content = document.getElementById("modal-content");
  if (!modal || !content) return;

  content.innerHTML = `
    <div class="grid md:grid-cols-2 gap-6 p-6">
      <div class="h-64 sm:h-80 md:h-full rounded-2xl overflow-hidden bg-slate-950 border border-slate-800 flex items-center justify-center p-4">
        <img src="${p.image}" alt="${p.name}" class="max-h-full max-w-full object-contain" onerror="this.src='assets/images/main_logo.jpg'">
      </div>
      <div class="flex flex-col justify-between">
        <div>
          <div class="flex items-center gap-2 mb-2">
            <span class="text-xs text-cyan-400 font-bold bg-cyan-500/10 px-2.5 py-1 rounded-full border border-cyan-500/20">${p.categoryName}</span>
            ${p.badge ? `<span class="text-xs text-slate-300 bg-slate-800 px-2.5 py-1 rounded-full border border-slate-700">${p.badge}</span>` : ''}
          </div>
          <h2 class="text-lg sm:text-xl font-bold text-white">${p.name}</h2>
          <p class="text-slate-400 text-xs mt-1 font-mono">${p.nameEn || ''}</p>

          <div class="my-4 text-2xl font-black text-white font-mono flex items-baseline gap-1">
            ${p.price.toLocaleString()} <span class="text-sm font-normal text-cyan-400">ريال سعودي</span>
            ${p.oldPrice ? `<span class="text-xs text-slate-500 line-through mr-2 font-mono">${p.oldPrice.toLocaleString()} ر.س</span>` : ''}
          </div>

          <p class="text-slate-300 text-xs leading-relaxed mb-4">${p.shortDesc}</p>

          <div class="space-y-1.5 mb-6">
            <h4 class="text-xs font-bold text-white">المواصفات والضمان:</h4>
            ${(p.specs || []).map(s => `
              <div class="flex items-center gap-2 text-xs text-slate-300">
                <i class="fas fa-check-circle text-cyan-400 text-[10px]"></i>
                <span>${s}</span>
              </div>
            `).join("")}
          </div>
        </div>

        <div class="flex gap-2.5 flex-wrap">
          <button onclick="addToCart('${p.id}'); closeModal();" class="flex-1 bg-gradient-to-r from-cyan-500 to-teal-500 hover:from-cyan-400 hover:to-teal-400 text-slate-950 font-bold py-3 rounded-xl text-xs sm:text-sm flex items-center justify-center gap-2 shadow-lg shadow-cyan-500/20 transition">
            <i class="fas fa-cart-plus"></i>
            <span>إضافة للسلة</span>
          </button>
          <a href="product.html?id=${encodeURIComponent(p.id)}" class="bg-slate-800 hover:bg-slate-700 text-cyan-300 border border-cyan-500/30 px-3.5 py-3 rounded-xl flex items-center justify-center text-xs font-bold transition gap-1.5" title="عرض صفحة المنتج المستقلة">
            <i class="fas fa-arrow-up-right-from-square"></i>
            <span>صفحة المنتج</span>
          </a>
          <a href="https://wa.me/${STORE_PHONE}?text=${encodeURIComponent('استفسار بخصوص منتج: ' + p.name)}" target="_blank" class="bg-emerald-600 hover:bg-emerald-500 text-white px-3.5 py-3 rounded-xl flex items-center justify-center" title="استفسار واتساب">
            <i class="fab fa-whatsapp text-lg"></i>
          </a>
        </div>
      </div>
    </div>
  `;

  modal.classList.remove("hidden");
}

function closeModal() {
  const modal = document.getElementById("product-modal");
  if (modal) modal.classList.add("hidden");
}

// ----------------- TOAST NOTIFICATIONS -----------------
function showToast(message) {
  let toast = document.getElementById("barq-toast");
  if (!toast) {
    toast = document.createElement("div");
    toast.id = "barq-toast";
    toast.className = "fixed bottom-6 left-6 z-50 bg-slate-900 border border-cyan-500/50 text-white px-5 py-3.5 rounded-2xl shadow-2xl shadow-black/80 flex items-center gap-3 transition-all duration-300 transform translate-y-20 opacity-0";
    document.body.appendChild(toast);
  }

  toast.innerHTML = `<i class="fas fa-bolt text-cyan-400"></i><span class="text-sm font-medium">${message}</span>`;
  toast.classList.remove("translate-y-20", "opacity-0");

  setTimeout(() => {
    toast.classList.add("translate-y-20", "opacity-0");
  }, 3500);
}

// ----------------- AUTO-SUGGESTIONS DROPDOWN SYSTEM -----------------
function highlightSearchMatch(text, query) {
  if (!text || !query) return text || "";
  const normQ = normalizeSearchText(query);
  if (!normQ) return text;

  // Simple token highlight regex
  try {
    const tokens = normQ.split(" ").filter(t => t.length > 0);
    let result = text;
    tokens.forEach(tok => {
      // Look for match ignoring case
      const regex = new RegExp(`(${tok.replace(/[-/\\^$*+?.()|[\]{}]/g, '\\$&')})`, "gi");
      result = result.replace(regex, `<span class="bg-cyan-500/20 text-cyan-300 font-bold px-1 rounded">$1</span>`);
    });
    return result;
  } catch(e) {
    return text;
  }
}

function renderSearchSuggestions(query) {
  const dropdown = document.getElementById("search-suggestions-dropdown");
  if (!dropdown) return;

  const products = getProducts();
  const trimmed = (query || "").trim();

  // If query is empty -> show Popular Quick Searches
  if (!trimmed) {
    dropdown.innerHTML = `
      <div class="p-4">
        <div class="flex items-center justify-between mb-3 text-xs text-slate-400 font-bold">
          <span class="flex items-center gap-1.5 text-cyan-400">
            <i class="fas fa-fire"></i> الأكثر بحثاً في المتجر:
          </span>
          <span class="text-[10px] text-slate-400">اضغط للبحث السريع</span>
        </div>
        <div class="flex flex-wrap gap-2">
          <button type="button" onclick="quickSearch('آيكوم V3500')" class="px-3 py-1.5 rounded-xl bg-slate-800/90 hover:bg-cyan-500/20 hover:border-cyan-500/50 border border-slate-700 text-xs text-slate-200 hover:text-cyan-300 transition flex items-center gap-1.5">
            <i class="fas fa-search text-[10px] text-cyan-400"></i> آيكوم V3500
          </button>
          <button type="button" onclick="quickSearch('ثريا XT-PRO')" class="px-3 py-1.5 rounded-xl bg-slate-800/90 hover:bg-cyan-500/20 hover:border-cyan-500/50 border border-slate-700 text-xs text-slate-200 hover:text-cyan-300 transition flex items-center gap-1.5">
            <i class="fas fa-search text-[10px] text-cyan-400"></i> ثريا XT-PRO
          </button>
          <button type="button" onclick="quickSearch('قارمن 67')" class="px-3 py-1.5 rounded-xl bg-slate-800/90 hover:bg-cyan-500/20 hover:border-cyan-500/50 border border-slate-700 text-xs text-slate-200 hover:text-cyan-300 transition flex items-center gap-1.5">
            <i class="fas fa-search text-[10px] text-cyan-400"></i> قارمن GPSMAP 67
          </button>
          <button type="button" onclick="quickSearch('ريشة مايك')" class="px-3 py-1.5 rounded-xl bg-slate-800/90 hover:bg-cyan-500/20 hover:border-cyan-500/50 border border-slate-700 text-xs text-slate-200 hover:text-cyan-300 transition flex items-center gap-1.5">
            <i class="fas fa-search text-[10px] text-cyan-400"></i> ريشة مايك آيكوم
          </button>
          <button type="button" onclick="quickSearch('هوائي دايموند')" class="px-3 py-1.5 rounded-xl bg-slate-800/90 hover:bg-cyan-500/20 hover:border-cyan-500/50 border border-slate-700 text-xs text-slate-200 hover:text-cyan-300 transition flex items-center gap-1.5">
            <i class="fas fa-search text-[10px] text-cyan-400"></i> هوائي دايموند أصلي
          </button>
          <button type="button" onclick="quickSearch('شريحة ثريا')" class="px-3 py-1.5 rounded-xl bg-slate-800/90 hover:bg-cyan-500/20 hover:border-cyan-500/50 border border-slate-700 text-xs text-slate-200 hover:text-cyan-300 transition flex items-center gap-1.5">
            <i class="fas fa-search text-[10px] text-cyan-400"></i> شريحة وتجديد ثريا
          </button>
          <button type="button" onclick="quickSearch('تحديث خرائط')" class="px-3 py-1.5 rounded-xl bg-slate-800/90 hover:bg-cyan-500/20 hover:border-cyan-500/50 border border-slate-700 text-xs text-slate-200 hover:text-cyan-300 transition flex items-center gap-1.5">
            <i class="fas fa-search text-[10px] text-cyan-400"></i> تحديث وبرمجة خرائط
          </button>
        </div>
      </div>
    `;
    dropdown.classList.remove("hidden");
    return;
  }

  // Filter matching products
  const matching = products.filter(p => matchProductSearch(p, trimmed));

  if (matching.length === 0) {
    dropdown.innerHTML = `
      <div class="p-6 text-center text-slate-400 space-y-2">
        <i class="fas fa-magnifying-glass text-2xl text-slate-500"></i>
        <div class="text-sm font-bold text-white">لا توجد نتائج مطابقة لـ "${trimmed}"</div>
        <p class="text-xs text-slate-400">جرب كتابة: "ايكوم"، "ثريا"، "قارمن"، "ريشة"، "هوائي"، أو "شاحن"</p>
      </div>
    `;
    dropdown.classList.remove("hidden");
    return;
  }

  // Display top 6 suggestions
  const topMatches = matching.slice(0, 6);
  const itemsHtml = topMatches.map(p => {
    const stock = (p.stock !== undefined) ? p.stock : 10;
    const isOut = (stock === 0);
    const categoryBadge = p.categoryName || "منتج معتمد";

    return `
      <div onclick="selectSuggestedProduct('${p.id}')" class="p-3 hover:bg-slate-800/90 border-b border-slate-800/80 cursor-pointer transition flex items-center justify-between gap-3 group">
        <div class="flex items-center gap-3 min-w-0">
          <div class="w-12 h-12 rounded-xl bg-slate-950 border border-slate-800 overflow-hidden flex items-center justify-center shrink-0 p-1 group-hover:border-cyan-400/50 transition">
            <img src="${p.image}" alt="${p.name}" class="max-h-full max-w-full object-contain" onerror="this.src='assets/images/hero_banner_1_refined.jpg'">
          </div>
          <div class="min-w-0">
            <div class="text-xs sm:text-sm font-bold text-white truncate group-hover:text-cyan-300 transition">
              ${highlightSearchMatch(p.name, trimmed)}
            </div>
            <div class="flex items-center gap-2 mt-1">
              <span class="text-[10px] font-bold bg-cyan-500/10 text-cyan-400 border border-cyan-500/20 px-2 py-0.5 rounded-full">${categoryBadge}</span>
              ${p.nameEn ? `<span class="text-[10px] text-slate-400 font-mono hidden sm:inline">${p.nameEn}</span>` : ''}
            </div>
          </div>
        </div>
        
        <div class="text-left shrink-0">
          <div class="text-xs sm:text-sm font-black font-mono text-cyan-400">${p.price.toLocaleString()} ر.س</div>
          ${p.oldPrice && p.oldPrice > p.price ? `<div class="text-[10px] text-slate-400 line-through font-mono">-${(p.oldPrice - p.price).toLocaleString()} ر.س</div>` : ''}
        </div>
      </div>
    `;
  }).join("");

  dropdown.innerHTML = `
    <div class="p-2.5 bg-slate-950/80 border-b border-slate-800 flex items-center justify-between text-xs">
      <span class="font-bold text-cyan-400 flex items-center gap-1.5">
        <i class="fas fa-wand-magic-sparkles"></i> نتائج الاقتراحات السريعة لـ "${trimmed}"
      </span>
      <span class="bg-cyan-500/10 text-cyan-300 font-mono font-bold px-2 py-0.5 rounded-full text-[10px]">
        ${matching.length} منتج متوفر
      </span>
    </div>

    <div class="divide-y divide-slate-800/40">
      ${itemsHtml}
    </div>

    <div class="p-2.5 bg-slate-950/90 text-center border-t border-slate-800">
      <button type="button" onclick="closeSearchSuggestions(); scrollToCatalog();" class="w-full py-2 px-4 rounded-xl bg-gradient-to-r from-cyan-500 to-teal-500 hover:from-cyan-400 hover:to-teal-400 text-slate-950 font-bold text-xs shadow-md transition flex items-center justify-center gap-2">
        <i class="fas fa-list-check"></i>
        <span>عرض كافة النتائج في الكتالوج (${matching.length} منتج)</span>
      </button>
    </div>
  `;

  dropdown.classList.remove("hidden");
}

function closeSearchSuggestions() {
  const dropdown = document.getElementById("search-suggestions-dropdown");
  if (dropdown) dropdown.classList.add("hidden");
}

function selectSuggestedProduct(productId) {
  closeSearchSuggestions();
  window.location.href = `product.html?id=${encodeURIComponent(productId)}`;
}

function quickSearch(term) {
  const input = document.getElementById("search-input");
  const clearBtn = document.getElementById("search-clear-btn");
  if (input) {
    input.value = term;
    searchQuery = term;
    if (clearBtn) clearBtn.classList.remove("hidden");
    currentPage = 1;
    renderProducts();
    renderSearchSuggestions(term);
  }
}

function clearSearch() {
  const input = document.getElementById("search-input");
  const clearBtn = document.getElementById("search-clear-btn");
  if (input) input.value = "";
  if (clearBtn) clearBtn.classList.add("hidden");
  searchQuery = "";
  currentPage = 1;
  renderProducts();
  closeSearchSuggestions();
}

function scrollToCatalog() {
  const catSection = document.getElementById("products");
  if (catSection) {
    catSection.scrollIntoView({ behavior: "smooth", block: "start" });
  }
}

// ----------------- EVENT LISTENERS -----------------
function setupEventListeners() {
  const searchInput = document.getElementById("search-input");
  const clearBtn = document.getElementById("search-clear-btn");
  const searchWrapper = document.getElementById("search-wrapper");

  if (searchInput) {
    // Input Event -> Filter Catalog & Show Live Suggestions
    searchInput.addEventListener("input", (e) => {
      searchQuery = e.target.value;
      if (clearBtn) {
        clearBtn.classList.toggle("hidden", searchQuery.length === 0);
      }
      currentPage = 1;
      renderProducts();
      renderSearchSuggestions(searchQuery);
    });

    // Focus Event -> Open Suggestions Dropdown
    searchInput.addEventListener("focus", () => {
      renderSearchSuggestions(searchInput.value);
    });

    // Keydown for Escape & Enter
    searchInput.addEventListener("keydown", (e) => {
      if (e.key === "Escape") {
        closeSearchSuggestions();
      } else if (e.key === "Enter") {
        closeSearchSuggestions();
        scrollToCatalog();
      }
    });
  }

  // Click Outside to Close Suggestions Dropdown
  document.addEventListener("click", (e) => {
    if (searchWrapper && !searchWrapper.contains(e.target)) {
      closeSearchSuggestions();
    }
  });

  // Init Advanced Features
  initAdvancedFeatures();
}

// ==========================================================
// 🧭 ADVANCED TOOLKIT: SMART FINDER QUIZ CONTROLLER
// ==========================================================
let quizState = {
  step1: null, // hunting, marine, security, travel
  step2: null, // car, handheld, satellite
  step3: null  // bundle, device_only
};

function handleQuizAnswer(step, val) {
  if (step === 1) {
    quizState.step1 = val;
    goQuizStep(2);
  } else if (step === 2) {
    quizState.step2 = val;
    goQuizStep(3);
  } else if (step === 3) {
    quizState.step3 = val;
    renderQuizResult();
  }
}

function goQuizStep(step) {
  [1, 2, 3].forEach(s => {
    const el = document.getElementById(`quiz-step-${s}`);
    const dot = document.getElementById(`step-dot-${s}`);
    if (el) el.classList.toggle("hidden", s !== step);
    if (dot) {
      if (s === step) {
        dot.className = "relative z-10 w-9 h-9 rounded-full bg-cyan-500 text-slate-950 font-bold flex items-center justify-center text-xs shadow-lg shadow-cyan-500/40";
      } else if (s < step) {
        dot.className = "relative z-10 w-9 h-9 rounded-full bg-emerald-500 text-white font-bold flex items-center justify-center text-xs shadow-md";
        dot.innerHTML = `<i class="fas fa-check"></i>`;
      } else {
        dot.className = "relative z-10 w-9 h-9 rounded-full bg-slate-800 text-slate-400 font-bold flex items-center justify-center text-xs border border-slate-700";
        dot.textContent = s;
      }
    }
  });

  const resEl = document.getElementById("quiz-result");
  if (resEl) resEl.classList.add("hidden");
}

function resetQuiz() {
  quizState = { step1: null, step2: null, step3: null };
  goQuizStep(1);
}

function renderQuizResult() {
  [1, 2, 3].forEach(s => {
    const el = document.getElementById(`quiz-step-${s}`);
    if (el) el.classList.add("hidden");
  });

  const resWrap = document.getElementById("quiz-result");
  const resCard = document.getElementById("quiz-result-card");
  const resTitle = document.getElementById("quiz-result-title");
  if (!resWrap || !resCard) return;

  const products = getProducts();

  // Recommendation Matcher
  let rec = {
    title: "باقة المقناص والبر المعتمدة (آيكوم IC-V3500)",
    desc: "أقوى توليفة للمقناص والرحلات الصحراوية بقوة إرسال 65 واط وصوت فائق النقاء.",
    primaryId: "Sku-5624-350",
    items: [
      { name: "جهاز آيكوم IC-V3500 الأصلي (65W)", id: "Sku-5624-350", price: 1850 },
      { name: "هوائي دايموند (أبو عقال) الأصلي", id: "Sku-25321", price: 320 },
      { name: "قاعدة تثبيت تايوانية فاخرة", id: "Sku-35272", price: 140 },
      { name: "كيبل RG58 إيطالي أصلي 5 متر", id: "Sku-40320", price: 110 }
    ],
    bundlePrice: 2250,
    oldBundlePrice: 2420
  };

  if (quizState.step1 === 'marine' || quizState.step2 === 'car') {
    rec = {
      title: "باقة الأداء الياباني الشاق (آيكوم IC-2300H)",
      desc: "متانة يابانية استثنائية وتحمل جبار للحرارة مع هوائي سيريو 3 وصلات.",
      primaryId: "Sku-5624-230",
      items: [
        { name: "جهاز آيكوم IC-2300H ياباني أصلي", id: "Sku-5624-230", price: 1650 },
        { name: "هوائي سيريو - ثلاث وصلات أصلي", id: "Sku-25326", price: 290 },
        { name: "قاعدة تايوانية للسيارات والقوارب", id: "Sku-35272", price: 140 },
        { name: "سلك هوائي إيطالي معتمد", id: "Sku-40320", price: 110 }
      ],
      bundlePrice: 2050,
      oldBundlePrice: 2190
    };
  } else if (quizState.step2 === 'handheld' || quizState.step1 === 'security') {
    rec = {
      title: "باقة الاتصال اليدوي عالي القوة (TYT 15W)",
      desc: "أعلى مدى للأجهزة اليدوية المحمولة مع ريشة مايك وهوائي مرن.",
      primaryId: "Sku-15W",
      items: [
        { name: "جهاز TYT 15W لاسلكي يدوي قوي", id: "Sku-15W", price: 420 },
        { name: "ريشة TYT يدوي (مايك ريشة)", id: "Sku-81435", price: 95 },
        { name: "هوائي يدوي مرن إضافي", id: "Sku-949284", price: 65 }
      ],
      bundlePrice: 530,
      oldBundlePrice: 580
    };
  } else if (quizState.step2 === 'satellite' || quizState.step1 === 'travel') {
    rec = {
      title: "باقة الاتصال الفضائي والطوارئ (ثريا وسفر)",
      desc: "تغطية عالمية بدون أبراج جوال مع شريحة ثريا ووحدة شحن فورية.",
      primaryId: "Sku-14275",
      items: [
        { name: "هاتف الثريا الفضائي المعتمد", id: "Sku-14275", price: 4200 },
        { name: "شريحة ثريا فضائية مفعلة", id: "Sku-140320", price: 350 },
        { name: "بطاقة شحن رصيد ثريا 100 وحدة", id: "Sku-14300", price: 680 }
      ],
      bundlePrice: 5050,
      oldBundlePrice: 5230
    };
  }

  if (quizState.step3 === 'device_only') {
    const single = products.find(p => p.id === rec.primaryId) || products[0];
    rec.title = `جهازك الأنسب: ${single.name}`;
    rec.desc = single.shortDesc;
    rec.items = [{ name: single.name, id: single.id, price: single.price }];
    rec.bundlePrice = single.price;
    rec.oldBundlePrice = single.oldPrice || 0;
  }

  if (resTitle) resTitle.textContent = rec.title;

  const saving = (rec.oldBundlePrice > rec.bundlePrice) ? (rec.oldBundlePrice - rec.bundlePrice) : 0;

  resCard.innerHTML = `
    <div class="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
      <div class="lg:col-span-7 space-y-4">
        <p class="text-slate-300 text-xs sm:text-sm leading-relaxed">${rec.desc}</p>
        
        <div class="space-y-2 pt-2">
          <h5 class="text-xs font-bold text-slate-400">محتويات الباقة المرشحة:</h5>
          <div class="space-y-1.5">
            ${rec.items.map(item => `
              <div class="flex items-center justify-between p-2.5 rounded-xl bg-slate-900 border border-slate-800 text-xs">
                <span class="text-white font-medium flex items-center gap-2">
                  <i class="fas fa-check-circle text-cyan-400 text-[11px]"></i>
                  ${item.name}
                </span>
                <span class="font-mono text-cyan-400 font-bold">${item.price.toLocaleString()} ر.س</span>
              </div>
            `).join('')}
          </div>
        </div>

        <div class="pt-2 flex items-center gap-2 text-[11px] text-slate-400">
          <i class="fas fa-shield-check text-emerald-400"></i>
          <span>ضمان سنتين معتمد + برمجة الترددات مجاناً بالمعرض</span>
        </div>
      </div>

      <div class="lg:col-span-5 bg-slate-900 border border-slate-800 rounded-2xl p-6 text-center space-y-4 shadow-xl">
        <div>
          <span class="text-xs text-slate-400">السعر الإجمالي للباقة:</span>
          <div class="text-3xl sm:text-4xl font-black text-white font-mono mt-1">${rec.bundlePrice.toLocaleString()} <span class="text-sm font-bold text-cyan-400">ر.س</span></div>
          ${saving > 0 ? `
            <div class="inline-block mt-2 bg-gradient-to-r from-rose-600 to-amber-500 text-white font-black text-xs px-3 py-1 rounded-lg font-mono">
              وفرت ${saving.toLocaleString()} ر.س
            </div>
          ` : ''}
        </div>

        <div class="space-y-2 pt-2">
          <button onclick="addBundleToCart('${rec.items.map(i => i.id).join(',')}')" class="w-full bg-gradient-to-r from-cyan-500 to-teal-500 hover:from-cyan-400 hover:to-teal-400 text-slate-950 font-bold py-3 rounded-xl text-xs flex items-center justify-center gap-2 shadow-lg shadow-cyan-500/20 active:scale-95 transition">
            <i class="fas fa-cart-plus"></i>
            <span>إضافة الباقة كاملة للسلة</span>
          </button>

          <a href="https://wa.me/${STORE_PHONE}?text=${encodeURIComponent('السلام عليكم، أود طلب الباقة المرشحة من المستشار الذكي: ' + rec.title + ' بقيمة ' + rec.bundlePrice.toLocaleString() + ' ر.س')}" target="_blank" class="w-full bg-emerald-600 hover:bg-emerald-500 text-white font-bold py-3 rounded-xl text-xs flex items-center justify-center gap-2 shadow-lg shadow-emerald-600/20 active:scale-95 transition">
            <i class="fab fa-whatsapp text-base"></i>
            <span>طلب الباقة عبر واتساب</span>
          </a>
        </div>
      </div>
    </div>
  `;

  resWrap.classList.remove("hidden");
}

function addBundleToCart(idsString) {
  const ids = idsString.split(',').map(s => s.trim()).filter(Boolean);
  const products = getProducts();

  ids.forEach(id => {
    const p = products.find(x => x.id === id);
    if (p) {
      const existing = cart.find(x => x.id === id);
      if (existing) existing.qty += 1;
      else cart.push({ ...p, qty: 1 });
    }
  });

  saveCart();
  updateCartUI();
  toggleCart(true);
  showToast(`تمت إضافة الباقة كاملة (${ids.length} منتجات) إلى السلة 🛒`);
}

// ==========================================================
// 🔌 ADVANCED TOOLKIT: COMPATIBILITY ENGINE CONTROLLER
// ==========================================================
function updateCompatibilityUI(deviceId) {
  const grid = document.getElementById("compat-results-grid");
  if (!grid) return;

  const products = getProducts();
  const targetDevice = products.find(p => p.id === deviceId);

  // Filter matching accessories from inventory
  const allAccs = products.filter(p => p.category === 'accessories' || p.category === 'cards');
  
  let matchingAccs = [];

  if (deviceId.includes('5624') || deviceId.includes('10111') || deviceId.includes('8000')) {
    // Mobile VHF Radios
    matchingAccs = allAccs.filter(p => 
      p.name.includes('سيريو') || 
      p.name.includes('دايموند') || 
      p.name.includes('لارسن') || 
      p.name.includes('قاعدة') || 
      p.name.includes('كيبل') || 
      p.name.includes('ريشة')
    ).slice(0, 4);
  } else if (deviceId.includes('88') || deviceId.includes('15W') || deviceId.includes('26656') || deviceId.includes('23721')) {
    // Handheld Radios
    matchingAccs = allAccs.filter(p => 
      p.name.includes('يدوي') || 
      p.name.includes('بوفنق') || 
      p.name.includes('ريشة') || 
      p.name.includes('بطارية')
    ).slice(0, 4);
  } else if (deviceId.includes('14275')) {
    // Thuraya
    matchingAccs = products.filter(p => p.category === 'cards' || (p.category === 'accessories' && p.name.includes('ثريا'))).slice(0, 4);
  } else {
    // Garmin / Other
    matchingAccs = allAccs.slice(0, 4);
  }

  if (matchingAccs.length === 0) {
    matchingAccs = allAccs.slice(0, 4);
  }

  grid.innerHTML = matchingAccs.map(p => `
    <div class="product-card group relative bg-slate-900/90 border border-slate-800 hover:border-cyan-500/50 rounded-2xl p-3.5 transition flex flex-col justify-between shadow-md">
      <div class="relative h-32 w-full bg-slate-950 rounded-xl overflow-hidden flex items-center justify-center p-2 mb-2">
        <span class="absolute top-2 right-2 bg-emerald-500/90 text-slate-950 text-[9px] font-black px-2 py-0.5 rounded-md flex items-center gap-1">
          <i class="fas fa-check"></i> متوافق 100%
        </span>
        <a href="product.html?id=${encodeURIComponent(p.id)}">
          <img src="${p.image}" alt="${p.name}" class="max-h-full max-w-full object-contain group-hover:scale-105 transition" onerror="this.src='assets/images/main_logo.jpg'">
        </a>
      </div>

      <div class="space-y-1.5 flex-1 flex flex-col justify-between">
        <div>
          <div class="text-[10px] text-cyan-400 font-bold">${p.categoryName || 'ملحق معتمد'}</div>
          <h4 class="text-xs font-bold text-white leading-snug line-clamp-2 min-h-[2rem]">
            <a href="product.html?id=${encodeURIComponent(p.id)}" class="hover:text-cyan-300 transition">${p.name}</a>
          </h4>
        </div>

        <div class="pt-2 border-t border-slate-800 flex items-center justify-between gap-2 mt-auto">
          <div class="text-sm font-black text-white font-mono">${p.price.toLocaleString()} <span class="text-[10px] font-normal text-cyan-400 font-sans">ر.س</span></div>
          <button onclick="addToCart('${p.id}')" class="p-2 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-xs flex items-center gap-1" title="إضافة للسلة">
            <i class="fas fa-cart-plus"></i>
          </button>
        </div>
      </div>
    </div>
  `).join('');
}

// ==========================================================
// ❓ ADVANCED TOOLKIT: FAQ ACCORDION CONTROLLER
// ==========================================================
function toggleFaq(faqId) {
  const content = document.getElementById(`faq-content-${faqId}`);
  const icon = document.getElementById(`faq-icon-${faqId}`);
  if (!content || !icon) return;

  const isHidden = content.classList.contains("hidden");

  // Close other FAQs
  [1, 2, 3, 4, 5].forEach(id => {
    const c = document.getElementById(`faq-content-${id}`);
    const ic = document.getElementById(`faq-icon-${id}`);
    if (c) c.classList.add("hidden");
    if (ic) ic.style.transform = "rotate(0deg)";
  });

  if (isHidden) {
    content.classList.remove("hidden");
    icon.style.transform = "rotate(180deg)";
  }
}

function initAdvancedFeatures() {
  // Initialize compatibility tool on page load
  const compatSelect = document.getElementById("compat-device-select");
  if (compatSelect) {
    updateCompatibilityUI(compatSelect.value || "Sku-5624-350");
  }
}


