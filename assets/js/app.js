// Main JavaScript Application for Barq Suhail (www.barqsuhail.com)

const STORE_PHONE = "966507181115";
let cart = JSON.parse(localStorage.getItem("barq_cart")) || [];
let activeCategory = "all";
let searchQuery = "";

document.addEventListener("DOMContentLoaded", () => {
  renderProducts();
  updateCartUI();
  setupEventListeners();
});

// Get Products from localStorage
function getProducts() {
  const stored = localStorage.getItem("barq_products");
  return stored ? JSON.parse(stored) : INITIAL_PRODUCTS;
}

// Render Products Grid
function renderProducts() {
  const container = document.getElementById("products-container");
  if (!container) return;

  const products = getProducts();
  const filtered = products.filter(p => {
    const matchCat = activeCategory === "all" || p.category === activeCategory;
    const matchSearch = p.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                        p.shortDesc.toLowerCase().includes(searchQuery.toLowerCase());
    return matchCat && matchSearch;
  });

  if (filtered.length === 0) {
    container.innerHTML = `
      <div class="col-span-full py-12 text-center text-slate-400">
        <i class="fas fa-search text-4xl mb-3 text-cyan-500/50"></i>
        <p class="text-lg">لا توجد منتجات مطابقة لبحثك في هذا القسم حالياً.</p>
      </div>
    `;
    return;
  }

  container.innerHTML = filtered.map(p => `
    <div class="product-card group relative bg-slate-900/80 border border-slate-800 hover:border-cyan-500/50 rounded-2xl overflow-hidden transition-all duration-300 hover:-translate-y-1.5 shadow-lg shadow-black/40 flex flex-col justify-between">
      
      <!-- Badge & Action Top -->
      <div class="absolute top-3 right-3 z-10 flex flex-col gap-1.5">
        ${p.badge ? `<span class="bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 text-xs font-bold px-2.5 py-1 rounded-full backdrop-blur-md">${p.badge}</span>` : ''}
      </div>

      <!-- Product Image -->
      <div class="relative h-56 w-full bg-slate-950 overflow-hidden cursor-pointer" onclick="openProductModal('${p.id}')">
        <img src="${p.image}" alt="${p.name}" class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" onerror="this.src='assets/images/main_logo.jpg'; this.classList.add('p-8')">
        <div class="absolute inset-0 bg-gradient-to-t from-slate-900 via-transparent to-transparent opacity-80"></div>
      </div>

      <!-- Product Details -->
      <div class="p-5 flex-1 flex flex-col justify-between">
        <div>
          <div class="flex items-center justify-between text-xs text-slate-400 mb-1.5">
            <span class="text-cyan-400 font-medium">${p.categoryName}</span>
            <div class="flex items-center text-amber-400">
              <i class="fas fa-star text-xs ml-1"></i>
              <span>${p.rating}</span>
            </div>
          </div>

          <h3 class="font-bold text-white text-base leading-snug group-hover:text-cyan-300 transition-colors mb-2 cursor-pointer" onclick="openProductModal('${p.id}')">
            ${p.name}
          </h3>

          <p class="text-slate-400 text-xs line-clamp-2 mb-4 leading-relaxed">
            ${p.shortDesc}
          </p>
        </div>

        <!-- Price and Add to Cart -->
        <div class="pt-3 border-t border-slate-800/80 flex items-center justify-between mt-auto">
          <div>
            <div class="text-xl font-extrabold text-white font-mono flex items-baseline gap-1">
              ${p.price.toLocaleString()} <span class="text-xs font-normal text-cyan-400 font-sans">ر.س</span>
            </div>
            ${p.oldPrice ? `<span class="text-xs text-slate-500 line-through">${p.oldPrice.toLocaleString()} ر.س</span>` : ''}
          </div>

          <div class="flex items-center gap-2">
            <button onclick="openProductModal('${p.id}')" class="p-2.5 bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white rounded-xl text-sm transition" title="عرض التفاصيل">
              <i class="fas fa-eye"></i>
            </button>
            <button onclick="addToCart('${p.id}')" class="bg-gradient-to-r from-cyan-500 to-teal-500 hover:from-cyan-400 hover:to-teal-400 text-slate-950 font-bold px-3.5 py-2.5 rounded-xl text-xs flex items-center gap-1.5 shadow-lg shadow-cyan-500/20 transition active:scale-95">
              <i class="fas fa-cart-plus"></i>
              <span>إضافة للسلة</span>
            </button>
          </div>
        </div>

      </div>

    </div>
  `).join("");
}

// Filter Category
function setCategory(cat, btn) {
  activeCategory = cat;
  document.querySelectorAll(".cat-pill").forEach(el => {
    el.classList.remove("bg-cyan-500", "text-slate-950", "shadow-cyan-500/30");
    el.classList.add("bg-slate-800/80", "text-slate-300");
  });
  btn.classList.add("bg-cyan-500", "text-slate-950", "shadow-cyan-500/30");
  btn.classList.remove("bg-slate-800/80", "text-slate-300");
  renderProducts();
}

// Add to Cart
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
  showToast(`تمت إضافة "${product.name}" إلى سلتك بنجاح! 🛒`);
}

// Update Cart Quantity
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

// Remove from Cart
function removeFromCart(productId) {
  cart = cart.filter(i => i.id !== productId);
  saveCart();
  updateCartUI();
  showToast("تم حذف المنتج من السلة");
}

function saveCart() {
  localStorage.setItem("barq_cart", JSON.stringify(cart));
}

// Update Cart UI
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
  const subtotalEl = document.getElementById("cart-subtotal");
  const totalEl = document.getElementById("cart-total");

  if (itemsContainer) {
    if (cart.length === 0) {
      itemsContainer.innerHTML = `
        <div class="py-16 text-center text-slate-400">
          <i class="fas fa-shopping-basket text-5xl mb-3 text-slate-600"></i>
          <p class="text-base font-medium">سلة مشترياتك فارغة حالياً</p>
          <p class="text-xs text-slate-500 mt-1">تصفح منتجاتنا وأضف ما يناسبك</p>
        </div>
      `;
    } else {
      itemsContainer.innerHTML = cart.map(item => `
        <div class="flex items-center justify-between gap-3 p-3 bg-slate-950/60 border border-slate-800/80 rounded-xl">
          <img src="${item.image}" alt="${item.name}" class="w-14 h-14 object-cover rounded-lg bg-slate-900">
          <div class="flex-1 min-w-0">
            <h4 class="text-xs font-bold text-white truncate">${item.name}</h4>
            <div class="text-cyan-400 text-xs font-mono font-bold mt-1">${(item.price * item.qty).toLocaleString()} ر.س</div>
            <div class="flex items-center gap-2 mt-1.5">
              <button onclick="updateQty('${item.id}', -1)" class="w-5 h-5 bg-slate-800 text-slate-300 hover:bg-slate-700 rounded flex items-center justify-center text-xs">-</button>
              <span class="text-xs text-white font-mono px-1.5">${item.qty}</span>
              <button onclick="updateQty('${item.id}', 1)" class="w-5 h-5 bg-slate-800 text-slate-300 hover:bg-slate-700 rounded flex items-center justify-center text-xs">+</button>
            </div>
          </div>
          <button onclick="removeFromCart('${item.id}')" class="text-slate-500 hover:text-red-400 p-1 text-xs">
            <i class="fas fa-trash"></i>
          </button>
        </div>
      `).join("");
    }
  }

  if (subtotalEl) subtotalEl.textContent = `${totalPrice.toLocaleString()} ر.س`;
  if (totalEl) totalEl.textContent = `${totalPrice.toLocaleString()} ر.س`;
}

// Toggle Cart Drawer
function toggleCart(show) {
  const drawer = document.getElementById("cart-drawer");
  const overlay = document.getElementById("cart-overlay");
  if (!drawer || !overlay) return;

  if (show) {
    overlay.classList.remove("hidden");
    setTimeout(() => {
      drawer.classList.remove("translate-x-full");
    }, 10);
  } else {
    drawer.classList.add("translate-x-full");
    setTimeout(() => {
      overlay.classList.add("hidden");
    }, 300);
  }
}

// Checkout to WhatsApp
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

// Submit B2B Request a Quote Form
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

  // Save in localStorage for admin
  const quotes = JSON.parse(localStorage.getItem("barq_quotes") || "[]");
  quotes.unshift(quote);
  localStorage.setItem("barq_quotes", JSON.stringify(quotes));

  // Redirect to WhatsApp with Quote Details
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

// Product Quick View Modal
function openProductModal(productId) {
  const products = getProducts();
  const p = products.find(i => i.id === productId);
  if (!p) return;

  const modal = document.getElementById("product-modal");
  const content = document.getElementById("modal-content");
  if (!modal || !content) return;

  content.innerHTML = `
    <div class="grid md:grid-cols-2 gap-6 p-6">
      <div class="h-72 md:h-full rounded-2xl overflow-hidden bg-slate-950 border border-slate-800">
        <img src="${p.image}" alt="${p.name}" class="w-full h-full object-cover">
      </div>
      <div class="flex flex-col justify-between">
        <div>
          <span class="text-xs text-cyan-400 font-bold bg-cyan-500/10 px-2.5 py-1 rounded-full border border-cyan-500/20">${p.categoryName}</span>
          <h2 class="text-xl font-bold text-white mt-2">${p.name}</h2>
          <p class="text-slate-400 text-xs mt-1 font-mono">${p.nameEn}</p>

          <div class="my-4 text-2xl font-black text-white font-mono flex items-baseline gap-1">
            ${p.price.toLocaleString()} <span class="text-sm font-normal text-cyan-400">ريال سعودي</span>
          </div>

          <p class="text-slate-300 text-xs leading-relaxed mb-4">${p.shortDesc}</p>

          <div class="space-y-1.5 mb-6">
            <h4 class="text-xs font-bold text-white">المواصفات والضمان:</h4>
            ${p.specs.map(s => `
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

// Toast Notification
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

// Event Listeners
function setupEventListeners() {
  const searchInput = document.getElementById("search-input");
  if (searchInput) {
    searchInput.addEventListener("input", (e) => {
      searchQuery = e.target.value;
      renderProducts();
    });
  }
}
