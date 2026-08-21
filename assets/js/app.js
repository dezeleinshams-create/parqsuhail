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
  updateCategoryPillCounts();
  applyViewModeUI();
  renderProducts();
  updateCartUI();
  setupEventListeners();
});

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

// Filter and Sort Products
function getFilteredAndSortedProducts() {
  const products = getProducts();

  // 1. Filter by category & search query
  let filtered = products.filter(p => {
    const matchCat = activeCategory === "all" || p.category === activeCategory;
    const query = searchQuery.trim().toLowerCase();
    const matchSearch = !query || 
      p.name.toLowerCase().includes(query) || 
      (p.nameEn && p.nameEn.toLowerCase().includes(query)) ||
      (p.shortDesc && p.shortDesc.toLowerCase().includes(query)) ||
      (p.id && p.id.toLowerCase().includes(query));
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
      // Keep natural inventory order: devices first, then accessories
      // (order is already set by displayIndex in data.js)
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
      <div class="relative h-36 sm:h-40 w-full bg-slate-950 overflow-hidden cursor-pointer flex items-center justify-center p-2" onclick="openProductModal('${p.id}')">
        <img 
          src="${p.image}" 
          alt="${p.name}" 
          class="max-h-full max-w-full object-contain group-hover:scale-105 transition-transform duration-500" 
          onerror="this.src='assets/images/main_logo.jpg'; this.classList.add('p-4')"
          loading="lazy"
        >
        <div class="absolute inset-0 bg-gradient-to-t from-slate-900/80 via-transparent to-transparent opacity-60"></div>
      </div>


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
          <h3 class="font-bold text-white text-xs sm:text-sm leading-snug line-clamp-2 group-hover:text-cyan-300 transition-colors mb-2 min-h-[2.5rem] cursor-pointer" onclick="openProductModal('${p.id}')" title="${p.name}">
            ${p.name}
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

          <button onclick="addToCart('${p.id}')" class="bg-gradient-to-r from-cyan-500 to-teal-500 hover:from-cyan-400 hover:to-teal-400 text-slate-950 font-bold px-2.5 sm:px-3 py-1.5 rounded-xl text-xs flex items-center gap-1 shadow-md shadow-cyan-500/20 transition active:scale-95 shrink-0" title="إضافة للسلة">
            <i class="fas fa-cart-plus text-[11px]"></i>
            <span class="hidden sm:inline text-[11px]">سلة</span>
          </button>
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
        <div class="w-16 h-16 sm:w-20 sm:h-20 rounded-xl bg-slate-950 border border-slate-800 overflow-hidden shrink-0 flex items-center justify-center p-1 cursor-pointer" onclick="openProductModal('${p.id}')">
          <img src="${p.image}" alt="${p.name}" class="max-h-full max-w-full object-contain group-hover:scale-105 transition" onerror="this.src='assets/images/main_logo.jpg'">
        </div>

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

          <h3 class="font-bold text-white text-sm sm:text-base truncate group-hover:text-cyan-300 transition-colors cursor-pointer" onclick="openProductModal('${p.id}')">
            ${p.name}
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

        <div class="flex gap-3">
          <button onclick="addToCart('${p.id}'); closeModal();" class="flex-1 bg-gradient-to-r from-cyan-500 to-teal-500 hover:from-cyan-400 hover:to-teal-400 text-slate-950 font-bold py-3 rounded-xl text-sm flex items-center justify-center gap-2 shadow-lg shadow-cyan-500/20">
            <i class="fas fa-cart-plus"></i>
            <span>إضافة للسلة الآن</span>
          </button>
          <a href="https://wa.me/${STORE_PHONE}?text=${encodeURIComponent('استفسار بخصوص منتج: ' + p.name)}" target="_blank" class="bg-emerald-600 hover:bg-emerald-500 text-white px-4 py-3 rounded-xl flex items-center justify-center" title="استفسار واتساب">
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

// ----------------- EVENT LISTENERS -----------------
function setupEventListeners() {
  const searchInput = document.getElementById("search-input");
  const clearBtn = document.getElementById("search-clear-btn");

  if (searchInput) {
    searchInput.addEventListener("input", (e) => {
      searchQuery = e.target.value;
      if (clearBtn) {
        clearBtn.classList.toggle("hidden", searchQuery.length === 0);
      }
      currentPage = 1;
      renderProducts();
    });
  }
}
