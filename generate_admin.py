import os

content = '''<!DOCTYPE html>
<html lang="ar" dir="rtl">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>لوحة التحكم | مؤسسة برق سهيل التجارية</title>
  <script src="https://cdn.tailwindcss.com"></script>
  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css">
  <link href="https://fonts.googleapis.com/css2?family=Cairo:wght@600;700;800;900&family=Tajawal:wght@400;500;700;800&display=swap" rel="stylesheet">
  <script>
    tailwind.config = {
      darkMode: 'class',
      theme: {
        extend: {
          colors: {
            brand: { teal: '#008DA5', cyan: '#00D2FF', dark: '#0A0F1D' }
          },
          fontFamily: {
            cairo: ['Cairo', 'sans-serif'],
            tajawal: ['Tajawal', 'sans-serif']
          }
        }
      }
    }
  </script>
  <style>
    * { box-sizing: border-box; }
    body { font-family: 'Tajawal', sans-serif; background: #070C1A; color: #e2e8f0; margin: 0; min-height: 100vh; }
    h1, h2, h3, h4 { font-family: 'Cairo', sans-serif; }
    ::-webkit-scrollbar { width: 6px; height: 6px; }
    ::-webkit-scrollbar-track { background: #070C1A; }
    ::-webkit-scrollbar-thumb { background: #1e293b; border-radius: 4px; }
    ::-webkit-scrollbar-thumb:hover { background: #00D2FF44; }
    
    .sidebar { width: 250px; min-height: 100vh; background: #050811; border-left: 1px solid #1e293b; position: fixed; top: 0; right: 0; z-index: 40; display: flex; flex-direction: column; }
    .main-content { margin-right: 250px; min-height: 100vh; }
    @media (max-width: 768px) {
      .sidebar { position: static; width: 100%; min-height: auto; }
      .main-content { margin-right: 0; }
    }
    
    .glass-card { background: rgba(15, 23, 42, 0.75); backdrop-filter: blur(12px); border: 1px solid #1e293b; border-radius: 16px; }
    .admin-input { background: #070c18; border: 1px solid #1e293b; border-radius: 10px; padding: 10px 14px; color: #f1f5f9; width: 100%; font-family: 'Tajawal', sans-serif; font-size: 13px; outline: none; transition: border-color 0.2s; }
    .admin-input:focus { border-color: #00D2FF; }
    .admin-input::placeholder { color: #475569; }
    
    .nav-btn { display: flex; align-items: center; gap: 12px; padding: 11px 16px; border-radius: 12px; font-size: 13.5px; font-weight: 700; color: #94a3b8; transition: all 0.2s; width: 100%; text-align: right; background: none; border: none; cursor: pointer; text-decoration: none; }
    .nav-btn:hover { color: #fff; background: rgba(255,255,255,0.05); }
    .nav-btn.active { color: #00D2FF; background: rgba(0, 210, 255, 0.1); border-right: 3px solid #00D2FF; }
    
    .img-upload-box { border: 2px dashed #334155; border-radius: 12px; min-height: 130px; display: flex; flex-direction: column; align-items: center; justify-content: center; cursor: pointer; transition: all 0.2s; overflow: hidden; background: #070c18; }
    .img-upload-box:hover, .img-upload-box.dragover { border-color: #00D2FF; background: rgba(0, 210, 255, 0.05); }
    .img-upload-box img { width: 100%; height: 130px; object-fit: cover; }
    
    .spec-tag { background: #1e293b; border: 1px solid #334155; border-radius: 8px; padding: 4px 10px; font-size: 12px; display: inline-flex; align-items: center; gap: 6px; }
    
    #modal-overlay { position: fixed; inset: 0; background: rgba(0,0,0,0.8); backdrop-filter: blur(8px); z-index: 50; display: none; align-items: center; justify-content: center; padding: 16px; }
    #modal-overlay.active { display: flex; }
    .modal-box { background: #0F172A; border: 1px solid #1e293b; border-radius: 20px; width: 100%; max-width: 840px; max-height: 90vh; overflow-y: auto; box-shadow: 0 25px 60px rgba(0,0,0,0.6); }
    
    #toast { position: fixed; bottom: 24px; left: 50%; transform: translateX(-50%); background: #00D2FF; color: #070C1A; font-weight: 800; padding: 12px 28px; border-radius: 9999px; z-index: 9999; display: none; font-size: 14px; box-shadow: 0 10px 30px rgba(0,210,255,0.3); }

    /* Login Screen Overlay */
    #login-overlay { position: fixed; inset: 0; background: #050811; z-index: 9999; display: flex; align-items: center; justify-content: center; padding: 20px; }
    .login-box { background: rgba(15, 23, 42, 0.95); border: 1px solid #1e293b; border-radius: 24px; padding: 36px 30px; width: 100%; max-width: 420px; box-shadow: 0 30px 80px rgba(0,0,0,0.8), 0 0 40px rgba(0,210,255,0.08); text-align: center; }

    /* Visual Builder Drag & Selection Items */
    .builder-section-item { background: #0b1120; border: 1px solid #1e293b; border-radius: 12px; padding: 14px 18px; display: flex; align-items: center; justify-content: space-between; transition: all 0.2s; user-select: none; cursor: pointer; }
    .builder-section-item:hover { border-color: #00D2FF88; background: #0e172a; }
    .builder-section-item.active-sec { border: 2px solid #00D2FF !important; background: rgba(0,210,255,0.08) !important; box-shadow: 0 0 20px rgba(0,210,255,0.15); }
    .builder-section-item.hidden-sec { opacity: 0.5; background: #070c18; }
    
    .fit-btn { padding: 8px 14px; border-radius: 8px; border: 1px solid #1e293b; background: #070c18; color: #94a3b8; font-size: 12px; font-weight: 700; cursor: pointer; transition: all 0.2s; }
    .fit-btn:hover { color: #fff; border-color: #334155; }
    .fit-btn.active { background: rgba(0,210,255,0.15); border-color: #00D2FF; color: #00D2FF; }
  </style>
</head>
<body>

<div id="toast"></div>
<input type="file" id="file-input-el" accept="image/*" style="display:none" onchange="handleFileChosen(event)">

<!-- 🔒 Login Screen -->
<div id="login-overlay">
  <div class="login-box">
    <div style="width: 60px; height: 60px; border-radius: 18px; background: rgba(0,210,255,0.12); border: 1px solid rgba(0,210,255,0.25); display: flex; align-items: center; justify-content: center; color: #00D2FF; font-size: 26px; margin: 0 auto 18px;">
      <i class="fas fa-shield-halved"></i>
    </div>
    <h2 style="color: #fff; font-size: 20px; font-weight: 800; margin-bottom: 6px;">لوحة تحكم برق سهيل</h2>
    <p style="color: #64748b; font-size: 12px; margin-bottom: 24px;">نظام إدارة المخزون والصلاحيات الآمن</p>

    <form onsubmit="handleLoginSubmit(event)" style="display: flex; flex-direction: column; gap: 14px; text-align: right;">
      <div>
        <label style="display: block; font-size: 11px; font-weight: 700; color: #94a3b8; margin-bottom: 6px;">اسم المستخدم (Username)</label>
        <div style="position: relative;">
          <i class="fas fa-user" style="position: absolute; right: 12px; top: 50%; transform: translateY(-50%); color: #475569; font-size: 13px;"></i>
          <input type="text" id="login-username" class="admin-input" style="padding-right: 36px;" placeholder="أدخل اسم المستخدم..." required autofocus>
        </div>
      </div>

      <div>
        <label style="display: block; font-size: 11px; font-weight: 700; color: #94a3b8; margin-bottom: 6px;">كلمة المرور (Password)</label>
        <div style="position: relative;">
          <i class="fas fa-key" style="position: absolute; right: 12px; top: 50%; transform: translateY(-50%); color: #475569; font-size: 13px;"></i>
          <input type="password" id="login-password" class="admin-input" style="padding-right: 36px;" placeholder="••••••••" required>
        </div>
      </div>

      <div id="login-error" style="display: none; background: rgba(239,68,68,0.12); border: 1px solid rgba(239,68,68,0.3); color: #f87171; font-size: 11px; font-weight: 700; padding: 8px 12px; border-radius: 8px; text-align: center;">
        ❌ اسم المستخدم أو كلمة المرور غير صحيحة!
      </div>

      <button type="submit" id="login-btn-text" style="background: linear-gradient(135deg, #008DA5, #00D2FF); color: #070C1A; border: none; font-weight: 800; padding: 13px; border-radius: 12px; font-size: 14px; cursor: pointer; margin-top: 6px; box-shadow: 0 4px 20px rgba(0,210,255,0.25);">
        <i class="fas fa-right-to-bracket ml-1"></i> تسجيل الدخول
      </button>

      <div style="text-align: center; margin-top: 10px;">
        <a href="index.html" style="color: #64748b; font-size: 12px; text-decoration: none; transition: color 0.2s;" onmouseover="this.style.color='#00D2FF'" onmouseout="this.style.color='#64748b'">
          ⮌ العودة للمتجر الرئيسي
        </a>
      </div>
    </form>
  </div>
</div>

<!-- Sidebar -->
<aside class="sidebar">
  <a href="index.html" style="padding: 18px 16px; border-bottom: 1px solid #1e293b; display: flex; align-items: center; gap: 12px; text-decoration: none; cursor: pointer; transition: all 0.2s;" onmouseover="this.style.background='rgba(0,210,255,0.06)'" onmouseout="this.style.background='transparent'" title="اضغط للعودة للمتجر الرئيسي">
    <div style="width: 40px; height: 40px; border-radius: 12px; background: rgba(0,210,255,0.15); display: flex; align-items: center; justify-content: center; color: #00D2FF; font-size: 18px;">
      <i class="fas fa-bolt"></i>
    </div>
    <div>
      <div style="color: #fff; font-weight: 800; font-size: 15px; display: flex; align-items: center; gap: 6px;">
        <span>برق سهيل</span>
        <i class="fas fa-arrow-left" style="font-size: 11px; color: #00D2FF;"></i>
      </div>
      <div style="color: #00D2FF; font-size: 11px; font-weight: 700; margin-top: 2px;">⮌ العودة للمتجر الرئيسي</div>
    </div>
  </a>

  <!-- Logged User Info Pill -->
  <div style="padding: 10px 16px; background: rgba(7, 12, 24, 0.6); border-bottom: 1px solid #1e293b; display: flex; align-items: center; justify-content: space-between;">
    <div style="display: flex; align-items: center; gap: 8px;">
      <div style="width: 28px; height: 28px; border-radius: 8px; background: rgba(0,210,255,0.1); color: #00D2FF; display: flex; align-items: center; justify-content: center; font-size: 12px;">
        <i class="fas fa-user-shield"></i>
      </div>
      <div>
        <div id="current-user-name" style="color: #fff; font-size: 12px; font-weight: 800;">المسؤول</div>
        <div id="current-user-role-badge" style="font-size: 10px; font-weight: 700; color: #38bdf8;">مسؤول عام</div>
      </div>
    </div>
    <span id="role-pill" style="font-size: 9px; font-weight: 800; background: rgba(0,210,255,0.15); color: #00D2FF; padding: 2px 6px; border-radius: 6px;">كامل الصلاحيات</span>
  </div>

  <nav style="padding: 12px; flex: 1; display: flex; flex-direction: column; gap: 4px;">
    <button class="nav-btn active" id="nav-tab-products" onclick="switchTab('products')">
      <i class="fas fa-boxes-stacked w-5 text-center"></i> إدارة المنتجات
    </button>
    <button class="nav-btn" id="nav-tab-add" onclick="switchTab('add')">
      <i class="fas fa-plus-circle w-5 text-center"></i> إضافة صنف جديد
    </button>
    <!-- 🎨 Visual Theme & Layout Builder Tab Button -->
    <button class="nav-btn" id="nav-tab-builder" onclick="switchTab('builder')" style="color: #00D2FF;">
      <i class="fas fa-wand-magic-sparkles w-5 text-center"></i> مخصص التصميم والهياكل
    </button>
    <button class="nav-btn" id="nav-tab-stats" onclick="switchTab('stats')">
      <i class="fas fa-chart-pie w-5 text-center"></i> إحصائيات المخزون
    </button>
    <!-- Super Admin Only Tab -->
    <button class="nav-btn" id="nav-tab-users" onclick="switchTab('users')" style="color: #c084fc;">
      <i class="fas fa-users-gear w-5 text-center"></i> إدارة المسؤولين
    </button>
    <div style="border-top: 1px solid #1e293b; margin: 10px 0;"></div>
    <a href="index.html" class="nav-btn">
      <i class="fas fa-store w-5 text-center"></i> عرض المتجر الرئيسي
    </a>
    <button class="nav-btn" onclick="handleLogout()" style="color: #f87171;">
      <i class="fas fa-power-off w-5 text-center"></i> تسجيل الخروج
    </button>
  </nav>

  <div style="padding: 16px; border-top: 1px solid #1e293b; font-size: 11px; color: #475569; text-align: center;">
    مؤسسة برق سهيل التجارية © 2026
  </div>
</aside>

<!-- Main Area -->
<div class="main-content">
  <!-- Header -->
  <header style="position: sticky; top: 0; z-index: 30; background: rgba(5, 8, 17, 0.95); backdrop-filter: blur(12px); border-bottom: 1px solid #1e293b; padding: 14px 24px; display: flex; align-items: center; justify-content: space-between;">
    <div style="display: flex; align-items: center; gap: 12px;">
      <h1 id="page-main-title" style="color: #fff; font-size: 18px; font-weight: 800; margin: 0;">لوحة تحكم المخزون</h1>
      <span id="count-badge" style="background: rgba(0,210,255,0.1); color: #00D2FF; border: 1px solid rgba(0,210,255,0.25); font-size: 12px; font-weight: 700; padding: 3px 12px; border-radius: 9999px; font-family: monospace;">0 صنف</span>
    </div>
    <div style="display: flex; gap: 10px; align-items: center;">
      <button onclick="resetToDefault()" style="display: flex; align-items: center; gap: 6px; background: #1e293b; color: #94a3b8; border: none; border-radius: 10px; padding: 8px 14px; font-size: 12px; font-weight: 700; cursor: pointer;" title="استعادة الجرد الأصلي من ملف البيانات">
        <i class="fas fa-rotate-left"></i> استعادة الجرد
      </button>
      <button onclick="exportJSON()" style="display: flex; align-items: center; gap: 6px; background: #1e293b; color: #cbd5e1; border: none; border-radius: 10px; padding: 8px 14px; font-size: 12px; font-weight: 700; cursor: pointer;">
        <i class="fas fa-download"></i> تصدير JSON
      </button>
      <button onclick="switchTab('add')" style="display: flex; align-items: center; gap: 6px; background: linear-gradient(135deg, #008DA5, #00D2FF); color: #070C1A; border: none; border-radius: 10px; padding: 8px 18px; font-size: 13px; font-weight: 800; cursor: pointer; box-shadow: 0 4px 15px rgba(0,210,255,0.25);">
        <i class="fas fa-plus"></i> إضافة صنف
      </button>
      <button onclick="handleLogout()" style="background: rgba(239,68,68,0.12); color: #f87171; border: 1px solid rgba(239,68,68,0.25); border-radius: 10px; padding: 8px 12px; font-size: 12px; font-weight: 700; cursor: pointer;" title="تسجيل الخروج">
        <i class="fas fa-arrow-right-from-bracket"></i> خروج
      </button>
    </div>
  </header>

  <div style="padding: 24px;">

    <!-- Tab 1: Products Management -->
    <div id="tab-products">
      <!-- Filter Bar -->
      <div class="glass-card" style="padding: 16px; margin-bottom: 20px;">
        <div style="display: grid; grid-template-columns: 1fr 180px 180px; gap: 12px;">
          <div style="position: relative;">
            <i class="fas fa-search" style="position: absolute; right: 12px; top: 50%; transform: translateY(-50%); color: #64748b; font-size: 13px;"></i>
            <input type="text" id="search-inp" oninput="renderProductsTable()" class="admin-input" style="padding-right: 38px;" placeholder="ابحث باسم الصنف، أو SKU، أو الموديل...">
          </div>
          <select id="cat-filter" onchange="renderProductsTable()" class="admin-input">
            <option value="all">كل الفئات</option>
            <option value="devices">📡 أجهزة اللاسلكي</option>
            <option value="thuraya">🛰️ أجهزة الثريا</option>
            <option value="garmin">🗺️ قارمن والملاحة</option>
            <option value="accessories">🔌 الملحقات والهوائيات</option>
            <option value="cards">📶 الشرائح والرصيد</option>
            <option value="services">🛠️ الخدمات البرمجية</option>
          </select>
          <select id="sort-filter" onchange="renderProductsTable()" class="admin-input">
            <option value="default">ترتيب الافتراضي (أجهزة أولاً)</option>
            <option value="name">الاسم أ → ي</option>
            <option value="price-asc">السعر: من الأقل للأعلى</option>
            <option value="price-desc">السعر: من الأعلى للأقل</option>
            <option value="stock-asc">المخزون: من الأقل للأعلى</option>
            <option value="stock-desc">المخزون: من الأعلى للأقل</option>
          </select>
        </div>
        <div style="margin-top: 10px; font-size: 12px; color: #64748b;">
          عدد الأصناف المعروضة: <span id="results-count" style="color: #00D2FF; font-weight: 800; font-family: monospace;">0</span>
        </div>
      </div>

      <!-- Table Container -->
      <div class="glass-card" style="overflow: hidden;">
        <div style="display: grid; grid-template-columns: 60px 1fr 140px 100px 90px 70px 100px; gap: 12px; padding: 12px 18px; border-bottom: 1px solid #1e293b; font-size: 11px; font-weight: 800; color: #64748b; text-transform: uppercase;">
          <div>الصورة</div>
          <div>اسم الصنف / الرمز</div>
          <div>الفئة</div>
          <div style="text-align: center;">السعر النهائي</div>
          <div style="text-align: center;">الخصم المباشر</div>
          <div style="text-align: center;">المخزون</div>
          <div style="text-align: center;">تحكم</div>
        </div>
        <div id="products-rows"></div>
      </div>
    </div>

    <!-- Tab 2: Add Product Form -->
    <div id="tab-add" style="display: none; max-width: 780px; margin: 0 auto;">
      <div style="display: flex; align-items: center; gap: 12px; margin-bottom: 20px;">
        <button onclick="switchTab('products')" style="background: none; border: none; color: #94a3b8; cursor: pointer; font-size: 16px;"><i class="fas fa-arrow-right"></i></button>
        <h2 style="color: #fff; font-size: 18px; margin: 0; font-weight: 800;">➕ إضافة صنف جديد للمخزون</h2>
      </div>
      <div class="glass-card" style="padding: 24px;">
        <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 20px;">
          <!-- Left Column -->
          <div style="display: flex; flex-direction: column; gap: 14px;">
            <div>
              <label style="display: block; font-size: 12px; font-weight: 700; color: #94a3b8; margin-bottom: 6px;">📷 صورة الصنف</label>
              <div class="img-upload-box" id="add-img-box" onclick="triggerUpload('add')" ondragover="dragOverHandler(event)" ondragleave="dragLeaveHandler(event)" ondrop="dropHandler(event, 'add')">
                <div style="text-align: center; color: #64748b; padding: 12px;">
                  <i class="fas fa-cloud-arrow-up" style="font-size: 26px; margin-bottom: 6px; color: #00D2FF;"></i>
                  <div style="font-size: 12px; font-weight: 700; color: #cbd5e1;">اضغط لرفع صورة أو اسحبها هنا</div>
                  <div style="font-size: 10px; color: #475569; margin-top: 2px;">PNG, JPG, WEBP</div>
                </div>
              </div>
              <input type="text" id="add-img-url" class="admin-input" style="margin-top: 8px; font-size: 12px;" placeholder="أو ضع رابط مباشر للصورة هنا..." oninput="previewUrl('add')">
            </div>
            <div>
              <label style="display: block; font-size: 12px; font-weight: 700; color: #94a3b8; margin-bottom: 6px;">📌 اسم الصنف بالعربي *</label>
              <input type="text" id="add-name" class="admin-input" placeholder="مثال: جهاز لاسلكي آيكوم IC-V3500">
            </div>
            <div>
              <label style="display: block; font-size: 12px; font-weight: 700; color: #94a3b8; margin-bottom: 6px;">🔤 الاسم بالإنجليزي</label>
              <input type="text" id="add-name-en" class="admin-input" placeholder="مثال: ICOM IC-V3500 Transceiver">
            </div>
            <div>
              <label style="display: block; font-size: 12px; font-weight: 700; color: #94a3b8; margin-bottom: 6px;">🗂️ الفئة والتصنيف *</label>
              <select id="add-category" class="admin-input">
                <option value="devices">📡 أجهزة اللاسلكي</option>
                <option value="thuraya">🛰️ أجهزة الثريا</option>
                <option value="garmin">🗺️ قارمن والملاحة</option>
                <option value="accessories">🔌 الملحقات والهوائيات</option>
                <option value="cards">📶 الشرائح والرصيد</option>
                <option value="services">🛠️ الخدمات البرمجية</option>
              </select>
            </div>
            <div>
              <label style="display: block; font-size: 12px; font-weight: 700; color: #94a3b8; margin-bottom: 6px;">🏷️ الشارة الترويجية (Badge)</label>
              <input type="text" id="add-badge" class="admin-input" placeholder="مثال: الأكثر مبيعاً، جديد، أصلي 100%">
            </div>
          </div>

          <!-- Right Column -->
          <div style="display: flex; flex-direction: column; gap: 14px;">
            <!-- Pricing 3-Box System -->
            <div style="background: rgba(7,12,24,0.6); border: 1px solid #1e293b; border-radius: 12px; padding: 12px;">
              <div style="font-size: 12px; font-weight: 800; color: #00D2FF; margin-bottom: 8px;">💰 تسعير الصنف والتخفيض</div>
              <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 10px; margin-bottom: 8px;">
                <div>
                  <label style="display: block; font-size: 11px; font-weight: 700; color: #94a3b8; margin-bottom: 4px;">السعر الأساسي (ر.س) *</label>
                  <input type="number" id="add-base-price" class="admin-input" placeholder="مثال: 100" min="0" style="font-family: monospace;" oninput="calcAddPricing('base')">
                </div>
                <div>
                  <label style="display: block; font-size: 11px; font-weight: 700; color: #f87171; margin-bottom: 4px;">قيمة الخصم (ر.س)</label>
                  <input type="number" id="add-discount-amt" class="admin-input" placeholder="مثال: 30" min="0" style="color: #f87171; font-weight: 800; font-family: monospace;" oninput="calcAddPricing('discount')">
                </div>
              </div>
              <div>
                <label style="display: block; font-size: 11px; font-weight: 700; color: #34d399; margin-bottom: 4px;">السعر النهائي للبيع (ر.س) *</label>
                <input type="number" id="add-final-price" class="admin-input" placeholder="مثال: 70" min="0" style="color: #34d399; font-weight: 800; font-family: monospace; font-size: 15px;" oninput="calcAddPricing('final')">
              </div>
              <div id="add-ribbon-preview" style="display: none; margin-top: 8px; padding: 6px 12px; background: rgba(244,63,94,0.1); border: 1px solid rgba(244,63,94,0.25); border-radius: 8px; font-size: 11px; color: #fb7185; font-weight: 700; text-align: center;">
                🏷️ سيظهر شريط في المتجر: <span id="add-ribbon-text" class="font-bold font-mono">خصم 0 ر.س</span>
              </div>
            </div>

            <div>
              <label style="display: block; font-size: 12px; font-weight: 700; color: #94a3b8; margin-bottom: 6px;">📦 كمية المخزون *</label>
              <div style="display: flex; align-items: center; gap: 8px;">
                <button type="button" onclick="adjustQty('add', -1)" style="width: 38px; height: 38px; border-radius: 10px; background: #1e293b; color: #fff; border: none; font-size: 18px; font-weight: 800; cursor: pointer;">−</button>
                <input type="number" id="add-stock" class="admin-input" value="10" min="0" style="text-align: center; font-size: 16px; font-weight: 800; font-family: monospace;">
                <button type="button" onclick="adjustQty('add', 1)" style="width: 38px; height: 38px; border-radius: 10px; background: #1e293b; color: #fff; border: none; font-size: 18px; font-weight: 800; cursor: pointer;">+</button>
              </div>
            </div>

            <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 10px;">
              <div>
                <label style="display: block; font-size: 12px; font-weight: 700; color: #94a3b8; margin-bottom: 6px;">⭐ التقييم</label>
                <input type="number" id="add-rating" class="admin-input" value="4.8" min="1" max="5" step="0.1">
              </div>
              <div>
                <label style="display: block; font-size: 12px; font-weight: 700; color: #94a3b8; margin-bottom: 6px;">💬 عدد التقييمات</label>
                <input type="number" id="add-reviews" class="admin-input" value="12" min="0">
              </div>
            </div>

            <div>
              <label style="display: block; font-size: 12px; font-weight: 700; color: #94a3b8; margin-bottom: 6px;">📝 مواصفات ووصف الصنف</label>
              <textarea id="add-desc" class="admin-input" rows="3" style="resize: vertical;" placeholder="اكتب وصفاً أو مواصفات فنية..."></textarea>
            </div>
          </div>
        </div>

        <!-- Specs Tagging -->
        <div style="margin-top: 18px;">
          <label style="display: block; font-size: 12px; font-weight: 700; color: #94a3b8; margin-bottom: 6px;">⚙️ نقاط المواصفات السريعة</label>
          <div id="add-specs-tags" style="display: flex; flex-wrap: wrap; gap: 6px; min-height: 40px; padding: 10px; background: #070c18; border: 1px solid #1e293b; border-radius: 10px; margin-bottom: 8px;"></div>
          <div style="display: flex; gap: 8px;">
            <input type="text" id="add-spec-text" class="admin-input" placeholder="اكتب مواصفة واضغط Enter أو زر الإضافة..." onkeydown="if(event.key==='Enter'){event.preventDefault();addSpecItem('add');}">
            <button type="button" onclick="addSpecItem('add')" style="width: 42px; border-radius: 10px; background: rgba(0,210,255,0.15); color: #00D2FF; border: none; cursor: pointer; font-size: 16px;"><i class="fas fa-plus"></i></button>
          </div>
        </div>

        <div style="display: flex; gap: 10px; margin-top: 24px; padding-top: 18px; border-top: 1px solid #1e293b;">
          <button onclick="saveNewProduct()" style="flex: 1; background: linear-gradient(135deg, #008DA5, #00D2FF); color: #070C1A; border: none; font-weight: 800; padding: 14px; border-radius: 12px; font-size: 14px; cursor: pointer;">
            <i class="fas fa-check-circle"></i> حفظ وإضافة الصنف للموقع
          </button>
          <button onclick="switchTab('products')" style="padding: 14px 22px; background: #1e293b; color: #94a3b8; border: none; border-radius: 12px; font-weight: 700; cursor: pointer;">
            إلغاء
          </button>
        </div>
      </div>
    </div>

    <!-- 🎨 Tab: Visual Builder (مخصص التصميم والهياكل) -->
    <div id="tab-builder" style="display: none; max-width: 960px; margin: 0 auto;">
      <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 20px; flex-wrap: wrap; gap: 12px;">
        <div>
          <h2 style="color: #fff; font-size: 19px; font-weight: 800; margin: 0; display: flex; align-items: center; gap: 8px;">
            <span style="color: #00D2FF;">🎨</span> مخصص تصميم وهياكل المتجر
          </h2>
          <p style="color: #64748b; font-size: 12px; margin-top: 4px;">اضغط على أي قسم بالأعلى لتعديل صوره وتمددها ونصوصه ومربعاته بالأسفل فوراً</p>
        </div>
        <div style="display: flex; gap: 10px;">
          <button onclick="resetThemeBuilderConfig()" style="background: #1e293b; color: #94a3b8; border: none; border-radius: 10px; padding: 10px 16px; font-size: 12px; font-weight: 700; cursor: pointer;">
            <i class="fas fa-rotate-left"></i> استعادة الافتراضي
          </button>
          <button onclick="saveThemeBuilderConfig()" style="background: linear-gradient(135deg, #008DA5, #00D2FF); color: #070C1A; border: none; border-radius: 10px; padding: 10px 22px; font-size: 13px; font-weight: 800; cursor: pointer; box-shadow: 0 4px 15px rgba(0,210,255,0.25);">
            <i class="fas fa-cloud-arrow-up"></i> حفظ ونشر التصميم
          </button>
        </div>
      </div>

      <div style="display: flex; flex-direction: column; gap: 24px;">

        <!-- 1. Interactive Sections Reordering & Click Selector List -->
        <div class="glass-card" style="padding: 20px;">
          <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 14px;">
            <div>
              <h3 style="color: #fff; font-size: 15px; font-weight: 800; margin: 0; display: flex; align-items: center; gap: 8px;">
                <i class="fas fa-layer-group" style="color: #00D2FF;"></i> 1. أقسام المتجر (اضغط على أي قسم لعرض وتعديل تفاصيله بالأسفل 👇)
              </h3>
              <p style="color: #64748b; font-size: 11.5px; margin-top: 2px;">يمكنك الضغط على أي قسم لتعديله، أو استخدام الأسهم لتحريك ترتيبه في الصفحة</p>
            </div>
          </div>
          <div id="builder-sections-list" style="display: flex; flex-direction: column; gap: 10px;"></div>
        </div>

        <!-- 2. Dynamic Section Customizer Container (Switches based on clicked section) -->
        <div id="dynamic-section-customizer-container"></div>

        <!-- 3. Global Buttons & WhatsApp Connector -->
        <div class="glass-card" style="padding: 20px;">
          <h3 style="color: #fff; font-size: 15px; font-weight: 800; margin: 0 0 4px; display: flex; align-items: center; gap: 8px;">
            <i class="fas fa-link" style="color: #4ade80;"></i> ربط أزرار الموقع والواتساب (Global Buttons & WhatsApp)
          </h3>
          <p style="color: #64748b; font-size: 11.5px; margin-bottom: 16px;">تحديد وجهة زر الهيدر ورقم ورسالة الواتساب العائم</p>

          <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 16px;">
            <!-- Header Quote Button -->
            <div style="background: rgba(7,12,24,0.6); border: 1px solid #1e293b; border-radius: 12px; padding: 14px;">
              <div style="font-size: 12px; font-weight: 800; color: #00D2FF; margin-bottom: 10px; display: flex; align-items: center; gap: 6px;">
                <i class="fas fa-file-invoice"></i> زر الهيدر العلوي
              </div>
              <div style="display: flex; flex-direction: column; gap: 8px;">
                <div>
                  <label style="display: block; font-size: 11px; font-weight: 700; color: #94a3b8; margin-bottom: 4px;">نص الزر</label>
                  <input type="text" id="builder-header-btn-text" class="admin-input" value="طلب تسعيرة">
                </div>
                <div>
                  <label style="display: block; font-size: 11px; font-weight: 700; color: #94a3b8; margin-bottom: 4px;">رابط الزر</label>
                  <input type="text" id="builder-header-btn-link" class="admin-input" value="#b2b" style="direction: ltr; font-family: monospace;">
                </div>
              </div>
            </div>

            <!-- WhatsApp Floating Button -->
            <div style="background: rgba(7,12,24,0.6); border: 1px solid #1e293b; border-radius: 12px; padding: 14px;">
              <div style="font-size: 12px; font-weight: 800; color: #34d399; margin-bottom: 10px; display: flex; align-items: center; gap: 6px;">
                <i class="fab fa-whatsapp"></i> زر الواتساب العائم
              </div>
              <div style="display: flex; flex-direction: column; gap: 8px;">
                <div>
                  <label style="display: block; font-size: 11px; font-weight: 700; color: #94a3b8; margin-bottom: 4px;">رقم الواتساب (مع كود الدولة 966)</label>
                  <input type="text" id="builder-wa-phone" class="admin-input" value="966507181115" style="direction: ltr; font-family: monospace;">
                </div>
                <div>
                  <label style="display: block; font-size: 11px; font-weight: 700; color: #94a3b8; margin-bottom: 4px;">رسالة الترحيب الافتتاحية</label>
                  <input type="text" id="builder-wa-msg" class="admin-input" value="السلام عليكم، أود الاستفسار عن أجهزة برق سهيل">
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Save Floating Bar -->
        <div style="display: flex; gap: 12px; justify-content: flex-end;">
          <button onclick="saveThemeBuilderConfig()" style="background: linear-gradient(135deg, #008DA5, #00D2FF); color: #070C1A; border: none; border-radius: 12px; padding: 14px 28px; font-size: 14px; font-weight: 800; cursor: pointer; box-shadow: 0 4px 20px rgba(0,210,255,0.3);">
            <i class="fas fa-check-circle ml-1"></i> حفظ ونشر جميع التعديلات فوراً
          </button>
        </div>

      </div>
    </div>

    <!-- Tab 3: Stats -->
    <div id="tab-stats" style="display: none;">
      <h2 style="color: #fff; font-size: 18px; font-weight: 800; margin-bottom: 20px;">📊 تقرير وإحصائيات المخزون</h2>
      <div id="stats-grid" style="display: grid; grid-template-columns: repeat(auto-fill, minmax(200px, 1fr)); gap: 16px; margin-bottom: 24px;"></div>
      <div class="glass-card" style="padding: 20px;">
        <h3 style="color: #fff; font-size: 14px; font-weight: 800; margin: 0 0 16px;">⚠️ أصناف بحاجة لإعادة طلب (مخزونها قليل أو منعدم)</h3>
        <div id="low-stock-list"></div>
      </div>
    </div>

    <!-- Tab 4: Super Admin User Management (إدارة المسؤولين) -->
    <div id="tab-users" style="display: none;">
      <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 20px;">
        <div>
          <h2 style="color: #fff; font-size: 18px; font-weight: 800; margin: 0;">👥 إدارة المسؤولين والمديرين</h2>
          <p style="color: #64748b; font-size: 12px; margin-top: 4px;">إضافة وتعديل حسابات المديرين والمسؤولين وتحديد صلاحياتهم</p>
        </div>
        <button onclick="openAddUserModal()" style="display: flex; align-items: center; gap: 6px; background: linear-gradient(135deg, #a855f7, #c084fc); color: #070C1A; border: none; border-radius: 10px; padding: 10px 18px; font-size: 13px; font-weight: 800; cursor: pointer; box-shadow: 0 4px 15px rgba(168,85,247,0.25);">
          <i class="fas fa-user-plus"></i> إضافة مسؤول / مدير جديد
        </button>
      </div>

      <div class="glass-card" style="overflow: hidden;">
        <div style="display: grid; grid-template-columns: 1fr 140px 140px 140px 100px; gap: 12px; padding: 12px 18px; border-bottom: 1px solid #1e293b; font-size: 11px; font-weight: 800; color: #64748b; text-transform: uppercase;">
          <div>الاسم الكامل / الحساب</div>
          <div>اسم المستخدم (Username)</div>
          <div style="text-align: center;">الرتبة والصلاحية</div>
          <div style="text-align: center;">تاريخ الإنشاء</div>
          <div style="text-align: center;">تحكم</div>
        </div>
        <div id="users-rows-container"></div>
      </div>
    </div>

  </div>
</div>

<!-- Edit Product Modal -->
<div id="modal-overlay" onclick="handleOverlayClick(event)">
  <div class="modal-box" id="edit-modal-box"></div>
</div>

<!-- User Add/Edit Modal -->
<div id="user-modal-overlay" style="position: fixed; inset: 0; background: rgba(0,0,0,0.85); backdrop-filter: blur(8px); z-index: 60; display: none; align-items: center; justify-content: center; padding: 16px;" onclick="if(event.target===this)closeUserModal()">
  <div class="modal-box" style="max-width: 480px; padding: 24px;">
    <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 18px; padding-bottom: 12px; border-bottom: 1px solid #1e293b;">
      <h3 id="user-modal-title" style="color: #fff; font-size: 16px; font-weight: 800; margin: 0;">➕ إضافة مستخدم جديد</h3>
      <button onclick="closeUserModal()" style="width: 30px; height: 30px; border-radius: 8px; background: #1e293b; border: none; color: #94a3b8; cursor: pointer;"><i class="fas fa-times"></i></button>
    </div>

    <form onsubmit="handleSaveUser(event)" style="display: flex; flex-direction: column; gap: 12px;">
      <input type="hidden" id="modal-user-id">
      <div>
        <label style="display: block; font-size: 11px; font-weight: 700; color: #94a3b8; margin-bottom: 4px;">الاسم الكامل *</label>
        <input type="text" id="modal-user-fullname" class="admin-input" placeholder="مثال: أحمد السعيد" required>
      </div>
      <div>
        <label style="display: block; font-size: 11px; font-weight: 700; color: #94a3b8; margin-bottom: 4px;">اسم المستخدم (Username) *</label>
        <input type="text" id="modal-user-username" class="admin-input" placeholder="مثال: ahmed_admin" required>
      </div>
      <div>
        <label style="display: block; font-size: 11px; font-weight: 700; color: #94a3b8; margin-bottom: 4px;">كلمة المرور (Password) *</label>
        <input type="password" id="modal-user-password" class="admin-input" placeholder="أدخل كلمة مرور قوية...">
        <div id="password-hint" style="font-size: 10px; color: #64748b; margin-top: 2px; display: none;">اتركه فارغاً إن لم ترغب بتغيير كلمة المرور الحالية</div>
      </div>
      <div>
        <label style="display: block; font-size: 11px; font-weight: 700; color: #94a3b8; margin-bottom: 4px;">الرتبة والصلاحيات *</label>
        <select id="modal-user-role" class="admin-input">
          <option value="manager">مدير (إدارة المنتجات والمخزون والأسعار)</option>
          <option value="superadmin">مسؤول عام (صلاحيات كاملة للموقع وحذف المديرين)</option>
        </select>
      </div>

      <div style="display: flex; gap: 10px; margin-top: 14px; padding-top: 14px; border-top: 1px solid #1e293b;">
        <button type="submit" style="flex: 1; background: linear-gradient(135deg, #a855f7, #c084fc); color: #070C1A; border: none; font-weight: 800; padding: 12px; border-radius: 10px; font-size: 13px; cursor: pointer;">
          <i class="fas fa-save"></i> حفظ الحساب
        </button>
        <button type="button" onclick="closeUserModal()" style="padding: 12px 18px; background: #1e293b; color: #94a3b8; border: none; border-radius: 10px; font-weight: 700; cursor: pointer;">
          إلغاء
        </button>
      </div>
    </form>
  </div>
</div>

<!-- DATA LAYER -->
<script src="assets/js/data.js"></script>
<script>
// ── Cryptographic SHA-256 Utility ────────────────────────────
async function computeSHA256(message) {
  var msgBuffer = new TextEncoder().encode(message);
  var hashBuffer = await crypto.subtle.digest('SHA-256', msgBuffer);
  var hashArray = Array.from(new Uint8Array(hashBuffer));
  return hashArray.map(function(b) { return b.toString(16).padStart(2, '0'); }).join('');
}

// Master Admin Hash (Plain text is never stored in source code)
var MASTER_ADMIN_HASH = "dd4005f19020a24600e28e0b99753f0b5ca79e269e5a8e69e218e20654f44377";

// State
var currentUser = null;
var adminUsersList = [];
var storeProducts = [];
var currentEditingId = null;
var uploadTarget = 'add';
var addSpecsList = [];
var editSpecsList = [];

// Visual Builder State
var selectedBuilderSectionId = 'home';

var DEFAULT_SECTIONS_META = [
  { id: 'home', title: 'البنر الإعلاني الرئيسي (Hero Banner)', icon: 'fas fa-image', desc: 'صورة البنر وتمددها، والعناوين وزر الكتالوج' },
  { id: 'section-features', title: 'شريط المميزات والضمان (Features Strip)', icon: 'fas fa-shield-halved', desc: 'ميزات المتجر، ترخيص CST، والشحن والتوصيل' },
  { id: 'products', title: 'كتالوج المنتجات والفئات (Products Catalog)', icon: 'fas fa-boxes-stacked', desc: 'عدد الأعمدة، نمط العرض، وكثافة المنتجات' },
  { id: 'thuraya', title: 'قسم هواتف وأجهزة الثريا (Thuraya Spotlight)', icon: 'fas fa-satellite', desc: 'بنر الثريا الفضائية ومواصفاتها وزر الواتساب' },
  { id: 'garmin', title: 'قسم قارمن والملاحة والخرائط (Garmin GPS)', icon: 'fas fa-map-location-dot', desc: 'بنر قارمن الصحراوي ومميزات الملاحة والتحديث' },
  { id: 'b2b', title: 'نموذج طلب عروض الأسعار (B2B Quote Request)', icon: 'fas fa-file-invoice', desc: 'عناوين نموذج تسعيرات الشركات والمقناص' },
  { id: 'showroom', title: 'بطاقة المعرض وخريطة الدمام (Showroom Card)', icon: 'fas fa-store', desc: 'صورة المعرض، العنوان، أوقات العمل، ورابط الخرائط' }
];

var currentThemeConfig = {
  sectionsOrder: ['home', 'section-features', 'products', 'thuraya', 'garmin', 'b2b', 'showroom'],
  sectionsVisible: {
    'home': true,
    'section-features': true,
    'products': true,
    'thuraya': true,
    'garmin': true,
    'b2b': true,
    'showroom': true
  },
  banner: {
    image: 'assets/images/hero_banner_1_refined.jpg',
    fit: 'cover',
    height: '380px',
    title: 'حلول الاتصالات الفضائية واللاسلكية والملاحة في المملكة',
    desc: 'مؤسسة برق سهيل التجارية وجهتكم الرائدة لتجهيز الرحلات البرية والبحرية بأحدث هواتف الثريا، أجهزة اللاسلكي المرخصة من هيئة الاتصالات (CST)، وملاحة وخرائط قارمن مع الضمان والدعم الفني المباشر بالدمام.',
    btnText: 'تصفح كتالوج الأجهزة',
    btnLink: '#products'
  },
  thuraya: {
    image: 'assets/images/thuraya_banner_3.jpg',
    fit: 'cover',
    height: '340px',
    title: 'اتصال فضائي لا ينقطع أينما ذهبت',
    desc: 'نوفر في مؤسسة برق سهيل أحدث هواتف وأجهزة الأقمار الصناعية وشبكة الثريا، الحل الأمثل للرحالة، أصحاب المقناص، عمال المناجم، والسفن البحرية في أي نقطة خارج تغطية شبكات الجوال.',
    btnText: 'استفسر عن عروض الثريا واتساب',
    btnLink: 'https://wa.me/966507181115?text=استفسار%20عن%20أجهزة%20وشرائح%20الثريا'
  },
  garmin: {
    image: 'assets/images/garmin_banner_2.jpg',
    fit: 'cover',
    height: '340px',
    title: 'استكشف دروب الصحراء والبحر بدقة متناهية',
    desc: 'أجهزة الملاحة اليدوية والمثبتة من شركة قارمن (Garmin) العالمية، محملة مسبقاً بأحدث خرائط تضاريس المملكة، الفياض، الشعبان، والمعالم الجغرافية البرية والبحرية.',
    btnText: 'عرض أجهزة قارمن والخرائط',
    btnLink: '#products'
  },
  b2b: {
    title: 'طلب عرض أسعار رسمي للشركات والمقناص',
    desc: 'للشركات، المقاولات، الجهات الحكومية، ومجموعات الرحلات البرية والبحرية. نجهز لكم عروض أسعار تفصيلية شاملة التراخيص والتوريد.'
  },
  showroom: {
    image: 'assets/images/store_identity_card.jpg',
    fit: 'cover',
    height: '380px',
    title: 'تفضل بزيارة معرضنا بالدمام',
    desc: 'يسعدنا استقبالكم في معرضنا للاطلاع المباشر على الأجهزة، تجربة الهواتف، وبرمجة وتحديث خرائط القارمن الفورية.',
    address: 'الدمام - حي بدر (المخطط 91) - داخل محل القناص الدولي، بجوار رفيق الدرب ومقابل مطعم البيك، طريق الملك فهد (خط المطار).',
    hours: 'السبت إلى الخميس: 9:00 صباحاً - 10:00 مساءً',
    phone: '0507181115 / +966507181115'
  },
  headerBtn: {
    text: 'طلب تسعيرة',
    link: '#b2b'
  },
  whatsapp: {
    phone: '966507181115',
    message: 'السلام عليكم، أود الاستفسار عن أجهزة برق سهيل'
  },
  layout: {
    gridCols: '5'
  }
};

var CATEGORY_MAP = {
  devices: { name: 'أجهزة اللاسلكي', icon: '📡', badgeClass: 'background:#1e3a5f;color:#60a5fa;' },
  thuraya: { name: 'أجهزة الثريا', icon: '🛰️', badgeClass: 'background:#1a2e4a;color:#38bdf8;' },
  garmin: { name: 'قارمن والملاحة', icon: '🗺️', badgeClass: 'background:#1e3a2f;color:#4ade80;' },
  accessories: { name: 'الملحقات والهوائيات', icon: '🔌', badgeClass: 'background:#2d2a1e;color:#fbbf24;' },
  cards: { name: 'الشرائح والرصيد', icon: '📶', badgeClass: 'background:#2d1e3a;color:#c084fc;' },
  services: { name: 'الخدمات البرمجية', icon: '🛠️', badgeClass: 'background:#1e2d2d;color:#2dd4bf;' }
};

var CATEGORY_PRIORITY = { devices: 1, thuraya: 2, garmin: 3, accessories: 4, cards: 5, services: 6 };

// ── Initialize ──────────────────────────────────────────────
window.addEventListener('DOMContentLoaded', function () {
  initUsersDatabase();
  loadThemeBuilderConfig();
  checkAuth();
});

function initUsersDatabase() {
  var saved = localStorage.getItem('barq_admin_users');
  if (saved) {
    try { adminUsersList = JSON.parse(saved); } catch(e) { adminUsersList = []; }
  }
  if (!adminUsersList || adminUsersList.length === 0) {
    adminUsersList = [
      {
        id: 'usr-master',
        username: 'admin',
        fullname: 'المسؤول العام',
        role: 'superadmin',
        passwordHash: MASTER_ADMIN_HASH,
        createdAt: '2026-08-21'
      }
    ];
    localStorage.setItem('barq_admin_users', JSON.stringify(adminUsersList));
  }
}

function checkAuth() {
  var sessionUser = sessionStorage.getItem('barq_logged_user') || localStorage.getItem('barq_logged_user');
  var loginOverlay = document.getElementById('login-overlay');

  if (sessionUser) {
    try {
      currentUser = JSON.parse(sessionUser);
      if (loginOverlay) loginOverlay.style.display = 'none';
      applyUserPermissions();
      loadData();
      return;
    } catch(e) {}
  }

  if (loginOverlay) loginOverlay.style.display = 'flex';
}

function applyUserPermissions() {
  if (!currentUser) return;

  var nameEl = document.getElementById('current-user-name');
  var roleBadgeEl = document.getElementById('current-user-role-badge');
  var rolePill = document.getElementById('role-pill');
  var usersTabBtn = document.getElementById('nav-tab-users');

  if (nameEl) nameEl.textContent = currentUser.fullname || currentUser.username;
  
  if (currentUser.role === 'superadmin') {
    if (roleBadgeEl) { roleBadgeEl.textContent = 'مسؤول عام (الرئيسي)'; roleBadgeEl.style.color = '#c084fc'; }
    if (rolePill) { rolePill.textContent = 'صلاحيات كاملة'; rolePill.style.background = 'rgba(192,132,252,0.2)'; rolePill.style.color = '#c084fc'; }
    if (usersTabBtn) usersTabBtn.style.display = 'flex';
  } else {
    if (roleBadgeEl) { roleBadgeEl.textContent = 'مدير المخزون'; roleBadgeEl.style.color = '#38bdf8'; }
    if (rolePill) { rolePill.textContent = 'إدارة المخزون'; rolePill.style.background = 'rgba(56,189,248,0.2)'; rolePill.style.color = '#38bdf8'; }
    if (usersTabBtn) usersTabBtn.style.display = 'none';
  }
}

async function handleLoginSubmit(e) {
  e.preventDefault();
  var u = (document.getElementById('login-username').value || '').trim().toLowerCase();
  var p = (document.getElementById('login-password').value || '').trim();
  var err = document.getElementById('login-error');

  initUsersDatabase();

  var enteredHash = await computeSHA256(p);

  // Check in users database
  var matched = adminUsersList.find(function(user) {
    return user.username.toLowerCase() === u && user.passwordHash === enteredHash;
  });

  if (matched) {
    currentUser = matched;
    sessionStorage.setItem('barq_logged_user', JSON.stringify(matched));
    localStorage.setItem('barq_logged_user', JSON.stringify(matched));
    document.getElementById('login-overlay').style.display = 'none';
    applyUserPermissions();
    loadData();
    showToast('👋 مرحباً بك ' + (matched.fullname || matched.username) + '! تم تسجيل الدخول بنجاح');
  } else {
    if (err) {
      err.style.display = 'block';
      setTimeout(function() { err.style.display = 'none'; }, 4000);
    }
  }
}

function handleLogout() {
  if (!confirm('هل تريد تسجيل الخروج من لوحة التحكم؟')) return;
  sessionStorage.removeItem('barq_logged_user');
  localStorage.removeItem('barq_logged_user');
  window.location.reload();
}

// ── Tab Switcher ────────────────────────────────────────────
function switchTab(tabId) {
  if (tabId === 'users' && (!currentUser || currentUser.role !== 'superadmin')) {
    showToast('❌ ليس لديك صلاحية للوصول لإدارة المسؤولين!');
    return;
  }

  var titleMap = {
    products: 'لوحة تحكم المخزون',
    add: 'إضافة صنف جديد للمخزون',
    builder: 'مخصص تصميم وهياكل المتجر',
    stats: 'تقرير وإحصائيات المخزون',
    users: 'إدارة المسؤولين والمشرفين'
  };

  var titleEl = document.getElementById('page-main-title');
  if (titleEl && titleMap[tabId]) titleEl.textContent = titleMap[tabId];

  ['products', 'add', 'builder', 'stats', 'users'].forEach(function(t) {
    var el = document.getElementById('tab-' + t);
    var btn = document.getElementById('nav-tab-' + t);
    if (el) el.style.display = (t === tabId) ? 'block' : 'none';
    if (btn) btn.classList.toggle('active', t === tabId);
  });

  if (tabId === 'stats') renderStats();
  if (tabId === 'users') renderUsersTable();
  if (tabId === 'builder') populateBuilderUI();
}

// ── Visual Theme & Layout Builder Logic ─────────────────────
function loadThemeBuilderConfig() {
  var saved = localStorage.getItem('barq_theme_config');
  if (saved) {
    try {
      var parsed = JSON.parse(saved);
      if (parsed) currentThemeConfig = Object.assign({}, currentThemeConfig, parsed);
    } catch(e) {}
  }
}

function populateBuilderUI() {
  renderBuilderSectionsList();
  renderSectionCustomizer(selectedBuilderSectionId);

  // Populate Header Button
  var hb = currentThemeConfig.headerBtn || {};
  if (document.getElementById('builder-header-btn-text')) document.getElementById('builder-header-btn-text').value = hb.text || 'طلب تسعيرة';
  if (document.getElementById('builder-header-btn-link')) document.getElementById('builder-header-btn-link').value = hb.link || '#b2b';

  // Populate WhatsApp
  var wa = currentThemeConfig.whatsapp || {};
  if (document.getElementById('builder-wa-phone')) document.getElementById('builder-wa-phone').value = wa.phone || '966507181115';
  if (document.getElementById('builder-wa-msg')) document.getElementById('builder-wa-msg').value = wa.message || '';
}

function selectBuilderSection(secId) {
  selectedBuilderSectionId = secId;
  renderBuilderSectionsList();
  renderSectionCustomizer(secId);
}

function renderBuilderSectionsList() {
  var container = document.getElementById('builder-sections-list');
  if (!container) return;

  var order = currentThemeConfig.sectionsOrder || [];
  var visibleMap = currentThemeConfig.sectionsVisible || {};

  container.innerHTML = order.map(function(secId, idx) {
    var meta = DEFAULT_SECTIONS_META.find(function(m) { return m.id === secId; }) || { id: secId, title: secId, icon: 'fas fa-cube', desc: '' };
    var isVisible = (visibleMap[secId] !== false);
    var isSelected = (selectedBuilderSectionId === secId);
    var isFirst = (idx === 0);
    var isLast = (idx === order.length - 1);

    return '<div class="builder-section-item ' + (isSelected ? 'active-sec' : '') + ' ' + (isVisible ? '' : 'hidden-sec') + '" onclick="selectBuilderSection(\\'' + secId + '\\')">' +
      '<div style="display: flex; align-items: center; gap: 14px;">' +
        '<div style="width: 36px; height: 36px; border-radius: 10px; background: ' + (isSelected ? 'rgba(0,210,255,0.25)' : 'rgba(0,210,255,0.1)') + '; color: #00D2FF; display: flex; align-items: center; justify-content: center; font-size: 15px;">' +
          '<i class="' + meta.icon + '"></i>' +
        '</div>' +
        '<div>' +
          '<div style="color: #fff; font-size: 14px; font-weight: 800; display: flex; align-items: center; gap: 8px;">' +
            '<span>' + meta.title + '</span>' +
            (isSelected ? '<span style="font-size: 10px; background: #00D2FF; color: #070C1A; padding: 2px 8px; border-radius: 999px; font-weight: 800;">محدد للتعديل بالأسفل 👇</span>' : '') +
          '</div>' +
          '<div style="color: #64748b; font-size: 11px; margin-top: 2px;">' + meta.desc + '</div>' +
        '</div>' +
      '</div>' +
      '<div style="display: flex; align-items: center; gap: 8px;" onclick="event.stopPropagation();">' +
        '<span style="font-size: 11px; font-weight: 700; padding: 4px 10px; border-radius: 8px; ' + (isVisible ? 'background:rgba(52,211,153,0.15);color:#34d399;' : 'background:rgba(239,68,68,0.15);color:#f87171;') + '">' + (isVisible ? 'ظاهر' : 'مخفي') + '</span>' +
        '<button type="button" onclick="toggleBuilderSectionVisibility(\\'' + secId + '\\')" style="width: 34px; height: 34px; border-radius: 8px; background: #1e293b; color: ' + (isVisible ? '#00D2FF' : '#94a3b8') + '; border: none; cursor: pointer; font-size: 13px;" title="' + (isVisible ? 'إخفاء القسم' : 'إظهار القسم') + '"><i class="fas ' + (isVisible ? 'fa-eye' : 'fa-eye-slash') + '"></i></button>' +
        '<button type="button" onclick="moveBuilderSection(' + idx + ', -1)" ' + (isFirst ? 'disabled style="opacity:0.3;cursor:not-allowed;"' : '') + ' style="width: 34px; height: 34px; border-radius: 8px; background: #1e293b; color: #fff; border: none; cursor: pointer; font-size: 13px;" title="تحريك لأعلى ⬆"><i class="fas fa-arrow-up"></i></button>' +
        '<button type="button" onclick="moveBuilderSection(' + idx + ', 1)" ' + (isLast ? 'disabled style="opacity:0.3;cursor:not-allowed;"' : '') + ' style="width: 34px; height: 34px; border-radius: 8px; background: #1e293b; color: #fff; border: none; cursor: pointer; font-size: 13px;" title="تحريك لأسفل ⬇"><i class="fas fa-arrow-down"></i></button>' +
      '</div>' +
    '</div>';
  }).join('');
}

// ── Dynamic Section Customizer Renderer ─────────────────────
function renderSectionCustomizer(secId) {
  var container = document.getElementById('dynamic-section-customizer-container');
  if (!container) return;

  var meta = DEFAULT_SECTIONS_META.find(function(m) { return m.id === secId; }) || { id: secId, title: secId, icon: 'fas fa-cube' };
  var html = '';

  if (secId === 'home') {
    var b = currentThemeConfig.banner || {};
    var fit = b.fit || 'cover';
    var height = b.height || '380px';

    html = '<div class="glass-card" style="padding: 22px; border: 2px solid rgba(0,210,255,0.4);">' +
      '<div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 16px; border-bottom: 1px solid #1e293b; padding-bottom: 12px;">' +
        '<div>' +
          '<h3 style="color: #fff; font-size: 16px; font-weight: 800; margin: 0; display: flex; align-items: center; gap: 8px;">' +
            '<i class="' + meta.icon + '" style="color: #00D2FF;"></i> تعديل: ' + meta.title +
          '</h3>' +
          '<p style="color: #64748b; font-size: 11.5px; margin-top: 2px;">تعديل صورة البنر الرئيسي، تمددها وملاءمتها للمربع، والنصوص وأزرار التصفح</p>' +
        '</div>' +
        '<span style="background: rgba(0,210,255,0.15); color: #00D2FF; padding: 4px 12px; border-radius: 999px; font-size: 11px; font-weight: 800;">القسم الحالي</span>' +
      '</div>' +
      '<div style="display: grid; grid-template-columns: 1fr 1fr; gap: 20px;">' +
        '<div>' +
          '<label style="display: block; font-size: 12px; font-weight: 700; color: #94a3b8; margin-bottom: 6px;">📷 صورة البنر الإعلاني (اضغط للرفع أو الصق رابط)</label>' +
          '<div class="img-upload-box" id="builder-banner-img-box" onclick="triggerUpload(\\'builder-banner\\')" ondragover="dragOverHandler(event)" ondragleave="dragLeaveHandler(event)" ondrop="dropHandler(event, \\'builder-banner\\')" style="min-height: 180px; position: relative;">' +
            '<img id="builder-banner-preview-img" src="' + (b.image || 'assets/images/hero_banner_1_refined.jpg') + '" style="width: 100%; height: 180px; object-fit: ' + fit + ';">' +
          '</div>' +
          '<input type="text" id="builder-banner-img-url" class="admin-input" style="margin-top: 8px; font-size: 12px;" value="' + (b.image || '') + '" placeholder="رابط صورة البنر..." oninput="previewBuilderBannerUrl()">' +
          '<div style="margin-top: 14px;">' +
            '<label style="display: block; font-size: 11px; font-weight: 700; color: #94a3b8; margin-bottom: 6px;">📐 طريقة ملاءمة وتمدد الصورة داخل المربع (Image Fit):</label>' +
            '<div style="display: grid; grid-template-columns: 1fr 1fr 1fr; gap: 6px;">' +
              '<button type="button" class="fit-btn ' + (fit==='cover'?'active':'') + '" id="fit-btn-cover" onclick="setBannerFit(\\'cover\\')"><i class="fas fa-crop-simple"></i> Cover (تغطية)</button>' +
              '<button type="button" class="fit-btn ' + (fit==='contain'?'active':'') + '" id="fit-btn-contain" onclick="setBannerFit(\\'contain\\')"><i class="fas fa-expand"></i> Contain (احتواء)</button>' +
              '<button type="button" class="fit-btn ' + (fit==='fill'?'active':'') + '" id="fit-btn-fill" onclick="setBannerFit(\\'fill\\')"><i class="fas fa-up-right-and-down-left-from-center"></i> Fill (تمدد)</button>' +
            '</div>' +
          '</div>' +
          '<div style="margin-top: 14px;">' +
            '<label style="display: block; font-size: 11px; font-weight: 700; color: #94a3b8; margin-bottom: 6px;">📏 ارتفاع مربع البنر:</label>' +
            '<div style="display: grid; grid-template-columns: 1fr 1fr 1fr 1fr; gap: 6px;">' +
              '<button type="button" class="fit-btn ' + (height==='260px'?'active':'') + '" id="height-btn-260" onclick="setBannerHeight(\\'260px\\')">260px</button>' +
              '<button type="button" class="fit-btn ' + (height==='380px'?'active':'') + '" id="height-btn-380" onclick="setBannerHeight(\\'380px\\')">380px</button>' +
              '<button type="button" class="fit-btn ' + (height==='480px'?'active':'') + '" id="height-btn-480" onclick="setBannerHeight(\\'480px\\')">480px</button>' +
              '<button type="button" class="fit-btn ' + (height==='auto'?'active':'') + '" id="height-btn-auto" onclick="setBannerHeight(\\'auto\\')">تلقائي</button>' +
            '</div>' +
          '</div>' +
        '</div>' +
        '<div style="display: flex; flex-direction: column; gap: 12px;">' +
          '<div><label style="display: block; font-size: 11.5px; font-weight: 700; color: #94a3b8; margin-bottom: 4px;">📌 عنوان البنر الرئيسي</label><input type="text" id="builder-banner-title" class="admin-input" value="' + (b.title || '') + '"></div>' +
          '<div><label style="display: block; font-size: 11.5px; font-weight: 700; color: #94a3b8; margin-bottom: 4px;">📝 النص التوضيحي للبنر</label><textarea id="builder-banner-desc" class="admin-input" rows="3" style="resize: vertical;">' + (b.desc || '') + '</textarea></div>' +
          '<div style="display: grid; grid-template-columns: 1fr 1fr; gap: 10px;">' +
            '<div><label style="display: block; font-size: 11.5px; font-weight: 700; color: #34d399; margin-bottom: 4px;">🔘 نص زر البنر</label><input type="text" id="builder-banner-btn-text" class="admin-input" value="' + (b.btnText || '') + '"></div>' +
            '<div><label style="display: block; font-size: 11.5px; font-weight: 700; color: #34d399; margin-bottom: 4px;">🔗 رابط الزر</label><input type="text" id="builder-banner-btn-link" class="admin-input" value="' + (b.btnLink || '') + '" style="direction: ltr; font-family: monospace;"></div>' +
          '</div>' +
        '</div>' +
      '</div>' +
    '</div>';

  } else if (secId === 'thuraya') {
    var t = currentThemeConfig.thuraya || {};
    var fit = t.fit || 'cover';

    html = '<div class="glass-card" style="padding: 22px; border: 2px solid rgba(56,189,248,0.4);">' +
      '<div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 16px; border-bottom: 1px solid #1e293b; padding-bottom: 12px;">' +
        '<div>' +
          '<h3 style="color: #fff; font-size: 16px; font-weight: 800; margin: 0; display: flex; align-items: center; gap: 8px;">' +
            '<i class="' + meta.icon + '" style="color: #38bdf8;"></i> تعديل: ' + meta.title +
          '</h3>' +
          '<p style="color: #64748b; font-size: 11.5px; margin-top: 2px;">تخصيص صورة هواتف الثريا، تمددها، النصوص والأزرار</p>' +
        '</div>' +
        '<span style="background: rgba(56,189,248,0.15); color: #38bdf8; padding: 4px 12px; border-radius: 999px; font-size: 11px; font-weight: 800;">القسم الحالي</span>' +
      '</div>' +
      '<div style="display: grid; grid-template-columns: 1fr 1fr; gap: 20px;">' +
        '<div>' +
          '<label style="display: block; font-size: 12px; font-weight: 700; color: #94a3b8; margin-bottom: 6px;">📷 صورة بنر أجهزة الثريا</label>' +
          '<div class="img-upload-box" id="builder-thuraya-img-box" onclick="triggerUpload(\\'builder-thuraya\\')" ondragover="dragOverHandler(event)" ondragleave="dragLeaveHandler(event)" ondrop="dropHandler(event, \\'builder-thuraya\\')" style="min-height: 180px; position: relative;">' +
            '<img id="builder-thuraya-preview-img" src="' + (t.image || 'assets/images/thuraya_banner_3.jpg') + '" style="width: 100%; height: 180px; object-fit: ' + fit + ';">' +
          '</div>' +
          '<input type="text" id="builder-thuraya-img-url" class="admin-input" style="margin-top: 8px; font-size: 12px;" value="' + (t.image || '') + '" placeholder="رابط صورة الثريا..." oninput="previewGenericImageUrl(\\'thuraya\\')">' +
          '<div style="margin-top: 14px;">' +
            '<label style="display: block; font-size: 11px; font-weight: 700; color: #94a3b8; margin-bottom: 6px;">📐 طريقة ملاءمة وتمدد صورة الثريا (Image Fit):</label>' +
            '<div style="display: grid; grid-template-columns: 1fr 1fr 1fr; gap: 6px;">' +
              '<button type="button" class="fit-btn ' + (fit==='cover'?'active':'') + '" onclick="setGenericFit(\\'thuraya\\', \\'cover\\')">Cover (تغطية)</button>' +
              '<button type="button" class="fit-btn ' + (fit==='contain'?'active':'') + '" onclick="setGenericFit(\\'thuraya\\', \\'contain\\')">Contain (احتواء)</button>' +
              '<button type="button" class="fit-btn ' + (fit==='fill'?'active':'') + '" onclick="setGenericFit(\\'thuraya\\', \\'fill\\')">Fill (تمدد)</button>' +
            '</div>' +
          '</div>' +
        '</div>' +
        '<div style="display: flex; flex-direction: column; gap: 12px;">' +
          '<div><label style="display: block; font-size: 11.5px; font-weight: 700; color: #94a3b8; margin-bottom: 4px;">📌 عنوان قسم الثريا</label><input type="text" id="builder-thuraya-title" class="admin-input" value="' + (t.title || '') + '"></div>' +
          '<div><label style="display: block; font-size: 11.5px; font-weight: 700; color: #94a3b8; margin-bottom: 4px;">📝 وصف وتفاصيل الثريا</label><textarea id="builder-thuraya-desc" class="admin-input" rows="3" style="resize: vertical;">' + (t.desc || '') + '</textarea></div>' +
          '<div style="display: grid; grid-template-columns: 1fr 1fr; gap: 10px;">' +
            '<div><label style="display: block; font-size: 11.5px; font-weight: 700; color: #34d399; margin-bottom: 4px;">🔘 نص زر واتساب</label><input type="text" id="builder-thuraya-btn-text" class="admin-input" value="' + (t.btnText || '') + '"></div>' +
            '<div><label style="display: block; font-size: 11.5px; font-weight: 700; color: #34d399; margin-bottom: 4px;">🔗 رابط الزر</label><input type="text" id="builder-thuraya-btn-link" class="admin-input" value="' + (t.btnLink || '') + '" style="direction: ltr; font-family: monospace;"></div>' +
          '</div>' +
        '</div>' +
      '</div>' +
    '</div>';

  } else if (secId === 'garmin') {
    var g = currentThemeConfig.garmin || {};
    var fit = g.fit || 'cover';

    html = '<div class="glass-card" style="padding: 22px; border: 2px solid rgba(74,222,128,0.4);">' +
      '<div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 16px; border-bottom: 1px solid #1e293b; padding-bottom: 12px;">' +
        '<div>' +
          '<h3 style="color: #fff; font-size: 16px; font-weight: 800; margin: 0; display: flex; align-items: center; gap: 8px;">' +
            '<i class="' + meta.icon + '" style="color: #4ade80;"></i> تعديل: ' + meta.title +
          '</h3>' +
          '<p style="color: #64748b; font-size: 11.5px; margin-top: 2px;">تخصيص صورة ملاحة وخرائط قارمن، تمددها، والنصوص والأزرار</p>' +
        '</div>' +
        '<span style="background: rgba(74,222,128,0.15); color: #4ade80; padding: 4px 12px; border-radius: 999px; font-size: 11px; font-weight: 800;">القسم الحالي</span>' +
      '</div>' +
      '<div style="display: grid; grid-template-columns: 1fr 1fr; gap: 20px;">' +
        '<div>' +
          '<label style="display: block; font-size: 12px; font-weight: 700; color: #94a3b8; margin-bottom: 6px;">📷 صورة بنر قارمن والملاحة</label>' +
          '<div class="img-upload-box" id="builder-garmin-img-box" onclick="triggerUpload(\\'builder-garmin\\')" ondragover="dragOverHandler(event)" ondragleave="dragLeaveHandler(event)" ondrop="dropHandler(event, \\'builder-garmin\\')" style="min-height: 180px; position: relative;">' +
            '<img id="builder-garmin-preview-img" src="' + (g.image || 'assets/images/garmin_banner_2.jpg') + '" style="width: 100%; height: 180px; object-fit: ' + fit + ';">' +
          '</div>' +
          '<input type="text" id="builder-garmin-img-url" class="admin-input" style="margin-top: 8px; font-size: 12px;" value="' + (g.image || '') + '" placeholder="رابط صورة قارمن..." oninput="previewGenericImageUrl(\\'garmin\\')">' +
          '<div style="margin-top: 14px;">' +
            '<label style="display: block; font-size: 11px; font-weight: 700; color: #94a3b8; margin-bottom: 6px;">📐 طريقة ملاءمة وتمدد صورة قارمن (Image Fit):</label>' +
            '<div style="display: grid; grid-template-columns: 1fr 1fr 1fr; gap: 6px;">' +
              '<button type="button" class="fit-btn ' + (fit==='cover'?'active':'') + '" onclick="setGenericFit(\\'garmin\\', \\'cover\\')">Cover (تغطية)</button>' +
              '<button type="button" class="fit-btn ' + (fit==='contain'?'active':'') + '" onclick="setGenericFit(\\'garmin\\', \\'contain\\')">Contain (احتواء)</button>' +
              '<button type="button" class="fit-btn ' + (fit==='fill'?'active':'') + '" onclick="setGenericFit(\\'garmin\\', \\'fill\\')">Fill (تمدد)</button>' +
            '</div>' +
          '</div>' +
        '</div>' +
        '<div style="display: flex; flex-direction: column; gap: 12px;">' +
          '<div><label style="display: block; font-size: 11.5px; font-weight: 700; color: #94a3b8; margin-bottom: 4px;">📌 عنوان قسم قارمن</label><input type="text" id="builder-garmin-title" class="admin-input" value="' + (g.title || '') + '"></div>' +
          '<div><label style="display: block; font-size: 11.5px; font-weight: 700; color: #94a3b8; margin-bottom: 4px;">📝 وصف وتفاصيل قارمن والخرائط</label><textarea id="builder-garmin-desc" class="admin-input" rows="3" style="resize: vertical;">' + (g.desc || '') + '</textarea></div>' +
          '<div style="display: grid; grid-template-columns: 1fr 1fr; gap: 10px;">' +
            '<div><label style="display: block; font-size: 11.5px; font-weight: 700; color: #34d399; margin-bottom: 4px;">🔘 نص الزر</label><input type="text" id="builder-garmin-btn-text" class="admin-input" value="' + (g.btnText || '') + '"></div>' +
            '<div><label style="display: block; font-size: 11.5px; font-weight: 700; color: #34d399; margin-bottom: 4px;">🔗 رابط الزر</label><input type="text" id="builder-garmin-btn-link" class="admin-input" value="' + (g.btnLink || '') + '" style="direction: ltr; font-family: monospace;"></div>' +
          '</div>' +
        '</div>' +
      '</div>' +
    '</div>';

  } else if (secId === 'products') {
    var lay = currentThemeConfig.layout || {};
    var cols = lay.gridCols || '5';

    html = '<div class="glass-card" style="padding: 22px; border: 2px solid rgba(192,132,252,0.4);">' +
      '<div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 16px; border-bottom: 1px solid #1e293b; padding-bottom: 12px;">' +
        '<div>' +
          '<h3 style="color: #fff; font-size: 16px; font-weight: 800; margin: 0; display: flex; align-items: center; gap: 8px;">' +
            '<i class="' + meta.icon + '" style="color: #c084fc;"></i> تعديل: ' + meta.title +
          '</h3>' +
          '<p style="color: #64748b; font-size: 11.5px; margin-top: 2px;">التحكم في كثافة وهيكل شبكة عرض المنتجات وعدد الأعمدة</p>' +
        '</div>' +
        '<span style="background: rgba(192,132,252,0.15); color: #c084fc; padding: 4px 12px; border-radius: 999px; font-size: 11px; font-weight: 800;">القسم الحالي</span>' +
      '</div>' +
      '<div>' +
        '<label style="display: block; font-size: 12px; font-weight: 700; color: #94a3b8; margin-bottom: 8px;">📐 عدد أعمدة عرض كروت المنتجات على الشاشات الكبيرة:</label>' +
        '<div style="display: grid; grid-template-columns: repeat(4, 1fr); gap: 10px;">' +
          '<button type="button" class="fit-btn ' + (cols==='3'?'active':'') + '" id="grid-cols-3" onclick="setGridCols(\\'3\\')"><div style="font-size: 14px; font-weight: 800;">3 أعمدة</div><div style="font-size: 10px; color: #64748b;">كروت كبيرة وعريضة</div></button>' +
          '<button type="button" class="fit-btn ' + (cols==='4'?'active':'') + '" id="grid-cols-4" onclick="setGridCols(\\'4\\')"><div style="font-size: 14px; font-weight: 800;">4 أعمدة</div><div style="font-size: 10px; color: #64748b;">كروت متوسطة متوازنة</div></button>' +
          '<button type="button" class="fit-btn ' + (cols==='5'?'active':'') + '" id="grid-cols-5" onclick="setGridCols(\\'5\\')"><div style="font-size: 14px; font-weight: 800;">5 أعمدة (افتراضي)</div><div style="font-size: 10px; color: #64748b;">مدمجة وعالية الكثافة</div></button>' +
          '<button type="button" class="fit-btn ' + (cols==='6'?'active':'') + '" id="grid-cols-6" onclick="setGridCols(\\'6\\')"><div style="font-size: 14px; font-weight: 800;">6 أعمدة</div><div style="font-size: 10px; color: #64748b;">أقصى سعة للمنتجات</div></button>' +
        '</div>' +
      '</div>' +
    '</div>';

  } else if (secId === 'b2b') {
    var b2b = currentThemeConfig.b2b || {};

    html = '<div class="glass-card" style="padding: 22px; border: 2px solid rgba(251,191,36,0.4);">' +
      '<div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 16px; border-bottom: 1px solid #1e293b; padding-bottom: 12px;">' +
        '<div>' +
          '<h3 style="color: #fff; font-size: 16px; font-weight: 800; margin: 0; display: flex; align-items: center; gap: 8px;">' +
            '<i class="' + meta.icon + '" style="color: #fbbf24;"></i> تعديل: ' + meta.title +
          '</h3>' +
          '<p style="color: #64748b; font-size: 11.5px; margin-top: 2px;">تعديل عناوين ونصوص نموذج طلب عروض أسعار الشركات والمقناص</p>' +
        '</div>' +
        '<span style="background: rgba(251,191,36,0.15); color: #fbbf24; padding: 4px 12px; border-radius: 999px; font-size: 11px; font-weight: 800;">القسم الحالي</span>' +
      '</div>' +
      '<div style="display: flex; flex-direction: column; gap: 12px;">' +
        '<div><label style="display: block; font-size: 11.5px; font-weight: 700; color: #94a3b8; margin-bottom: 4px;">📌 عنوان نموذج الأسعار</label><input type="text" id="builder-b2b-title" class="admin-input" value="' + (b2b.title || '') + '"></div>' +
        '<div><label style="display: block; font-size: 11.5px; font-weight: 700; color: #94a3b8; margin-bottom: 4px;">📝 الوصف التوضيحي للنموذج</label><textarea id="builder-b2b-desc" class="admin-input" rows="3" style="resize: vertical;">' + (b2b.desc || '') + '</textarea></div>' +
      '</div>' +
    '</div>';

  } else if (secId === 'showroom') {
    var sh = currentThemeConfig.showroom || {};
    var fit = sh.fit || 'cover';

    html = '<div class="glass-card" style="padding: 22px; border: 2px solid rgba(45,212,191,0.4);">' +
      '<div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 16px; border-bottom: 1px solid #1e293b; padding-bottom: 12px;">' +
        '<div>' +
          '<h3 style="color: #fff; font-size: 16px; font-weight: 800; margin: 0; display: flex; align-items: center; gap: 8px;">' +
            '<i class="' + meta.icon + '" style="color: #2dd4bf;"></i> تعديل: ' + meta.title +
          '</h3>' +
          '<p style="color: #64748b; font-size: 11.5px; margin-top: 2px;">تعديل صورة بطاقة المعرض، أبعاد تمددها، العنوان التفصيلي وأوقات العمل</p>' +
        '</div>' +
        '<span style="background: rgba(45,212,191,0.15); color: #2dd4bf; padding: 4px 12px; border-radius: 999px; font-size: 11px; font-weight: 800;">القسم الحالي</span>' +
      '</div>' +
      '<div style="display: grid; grid-template-columns: 1fr 1fr; gap: 20px;">' +
        '<div>' +
          '<label style="display: block; font-size: 12px; font-weight: 700; color: #94a3b8; margin-bottom: 6px;">📷 صورة بطاقة المعرض والهوية</label>' +
          '<div class="img-upload-box" id="builder-showroom-img-box" onclick="triggerUpload(\\'builder-showroom\\')" ondragover="dragOverHandler(event)" ondragleave="dragLeaveHandler(event)" ondrop="dropHandler(event, \\'builder-showroom\\')" style="min-height: 180px; position: relative;">' +
            '<img id="builder-showroom-preview-img" src="' + (sh.image || 'assets/images/store_identity_card.jpg') + '" style="width: 100%; height: 180px; object-fit: ' + fit + ';">' +
          '</div>' +
          '<input type="text" id="builder-showroom-img-url" class="admin-input" style="margin-top: 8px; font-size: 12px;" value="' + (sh.image || '') + '" placeholder="رابط صورة المعرض..." oninput="previewGenericImageUrl(\\'showroom\\')">' +
          '<div style="margin-top: 14px;">' +
            '<label style="display: block; font-size: 11px; font-weight: 700; color: #94a3b8; margin-bottom: 6px;">📐 طريقة ملاءمة وتمدد صورة المعرض (Image Fit):</label>' +
            '<div style="display: grid; grid-template-columns: 1fr 1fr 1fr; gap: 6px;">' +
              '<button type="button" class="fit-btn ' + (fit==='cover'?'active':'') + '" onclick="setGenericFit(\\'showroom\\', \\'cover\\')">Cover (تغطية)</button>' +
              '<button type="button" class="fit-btn ' + (fit==='contain'?'active':'') + '" onclick="setGenericFit(\\'showroom\\', \\'contain\\')">Contain (احتواء)</button>' +
              '<button type="button" class="fit-btn ' + (fit==='fill'?'active':'') + '" onclick="setGenericFit(\\'showroom\\', \\'fill\\')">Fill (تمدد)</button>' +
            '</div>' +
          '</div>' +
        '</div>' +
        '<div style="display: flex; flex-direction: column; gap: 10px;">' +
          '<div><label style="display: block; font-size: 11.5px; font-weight: 700; color: #94a3b8; margin-bottom: 4px;">📌 عنوان المعرض</label><input type="text" id="builder-showroom-title" class="admin-input" value="' + (sh.title || '') + '"></div>' +
          '<div><label style="display: block; font-size: 11.5px; font-weight: 700; color: #94a3b8; margin-bottom: 4px;">📝 الوصف الترحيبي</label><textarea id="builder-showroom-desc" class="admin-input" rows="2">' + (sh.desc || '') + '</textarea></div>' +
          '<div><label style="display: block; font-size: 11.5px; font-weight: 700; color: #94a3b8; margin-bottom: 4px;">📍 العنوان التفصيلي</label><input type="text" id="builder-showroom-address" class="admin-input" value="' + (sh.address || '') + '"></div>' +
          '<div><label style="display: block; font-size: 11.5px; font-weight: 700; color: #94a3b8; margin-bottom: 4px;">⏰ أوقات العمل</label><input type="text" id="builder-showroom-hours" class="admin-input" value="' + (sh.hours || '') + '"></div>' +
          '<div><label style="display: block; font-size: 11.5px; font-weight: 700; color: #94a3b8; margin-bottom: 4px;">📞 الهاتف والمبيعات</label><input type="text" id="builder-showroom-phone" class="admin-input" value="' + (sh.phone || '') + '"></div>' +
        '</div>' +
      '</div>' +
    '</div>';

  } else if (secId === 'section-features') {
    html = '<div class="glass-card" style="padding: 22px; border: 2px solid rgba(0,210,255,0.4);">' +
      '<div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 16px; border-bottom: 1px solid #1e293b; padding-bottom: 12px;">' +
        '<div>' +
          '<h3 style="color: #fff; font-size: 16px; font-weight: 800; margin: 0; display: flex; align-items: center; gap: 8px;">' +
            '<i class="' + meta.icon + '" style="color: #00D2FF;"></i> تعديل: ' + meta.title +
          '</h3>' +
          '<p style="color: #64748b; font-size: 11.5px; margin-top: 2px;">شريط الميزات السريعة (الترخيص CST، سرعة التوصيل، الدعم الفني، وخرائط قارمن)</p>' +
        '</div>' +
        '<span style="background: rgba(0,210,255,0.15); color: #00D2FF; padding: 4px 12px; border-radius: 999px; font-size: 11px; font-weight: 800;">القسم الحالي</span>' +
      '</div>' +
      '<div style="color: #cbd5e1; font-size: 13px; line-height: 1.6; padding: 12px; background: rgba(7,12,24,0.6); border-radius: 12px;">' +
        '✅ شريط المميزات مفعل ومضبوط تلقائياً بالهوية المعتمدة لهيئة الاتصالات (CST) وخدمات الصيانة والضمان والتوصيل.' +
      '</div>' +
    '</div>';
  }

  container.innerHTML = html;
}

function moveBuilderSection(idx, dir) {
  var order = currentThemeConfig.sectionsOrder;
  var targetIdx = idx + dir;
  if (targetIdx < 0 || targetIdx >= order.length) return;

  var temp = order[idx];
  order[idx] = order[targetIdx];
  order[targetIdx] = temp;

  renderBuilderSectionsList();
  showToast('🔄 تم تحريك القسم!');
}

function toggleBuilderSectionVisibility(secId) {
  if (!currentThemeConfig.sectionsVisible) currentThemeConfig.sectionsVisible = {};
  var current = (currentThemeConfig.sectionsVisible[secId] !== false);
  currentThemeConfig.sectionsVisible[secId] = !current;
  renderBuilderSectionsList();
  showToast(!current ? '👁️ تم إظهار القسم' : '🙈 تم إخفاء القسم');
}

function setBannerFit(fitMode, notify) {
  if (!currentThemeConfig.banner) currentThemeConfig.banner = {};
  currentThemeConfig.banner.fit = fitMode;

  ['cover', 'contain', 'fill'].forEach(function(m) {
    var btn = document.getElementById('fit-btn-' + m);
    if (btn) btn.classList.toggle('active', m === fitMode);
  });

  var previewImg = document.getElementById('builder-banner-preview-img');
  if (previewImg) previewImg.style.objectFit = fitMode;

  if (notify !== false) showToast('📐 نمط التمدد: ' + fitMode);
}

function setGenericFit(secKey, fitMode) {
  if (!currentThemeConfig[secKey]) currentThemeConfig[secKey] = {};
  currentThemeConfig[secKey].fit = fitMode;
  var previewImg = document.getElementById('builder-' + secKey + '-preview-img');
  if (previewImg) previewImg.style.objectFit = fitMode;
  renderSectionCustomizer(secKey);
  showToast('📐 نمط التمدد: ' + fitMode);
}

function setBannerHeight(heightVal, notify) {
  if (!currentThemeConfig.banner) currentThemeConfig.banner = {};
  currentThemeConfig.banner.height = heightVal;

  var keys = ['260', '380', '480', 'auto'];
  keys.forEach(function(k) {
    var btn = document.getElementById('height-btn-' + k);
    if (btn) btn.classList.toggle('active', (k === 'auto' && heightVal === 'auto') || (heightVal === k + 'px'));
  });

  var box = document.getElementById('builder-banner-img-box');
  var previewImg = document.getElementById('builder-banner-preview-img');
  if (box && previewImg) {
    box.style.minHeight = (heightVal === 'auto' ? '180px' : heightVal);
    previewImg.style.height = (heightVal === 'auto' ? '180px' : heightVal);
  }

  if (notify !== false) showToast('📏 تم تحديد الارتفاع: ' + heightVal);
}

function setGridCols(colsVal, notify) {
  if (!currentThemeConfig.layout) currentThemeConfig.layout = {};
  currentThemeConfig.layout.gridCols = colsVal;

  ['3', '4', '5', '6'].forEach(function(c) {
    var btn = document.getElementById('grid-cols-' + c);
    if (btn) btn.classList.toggle('active', c === colsVal);
  });

  if (notify !== false) showToast('📐 تم ضبط عدد الأعمدة: ' + colsVal + ' أعمدة');
}

function previewBuilderBannerUrl() {
  var urlInp = document.getElementById('builder-banner-img-url');
  var previewImg = document.getElementById('builder-banner-preview-img');
  if (urlInp && previewImg && urlInp.value.trim()) {
    previewImg.src = urlInp.value.trim();
    if (!currentThemeConfig.banner) currentThemeConfig.banner = {};
    currentThemeConfig.banner.image = urlInp.value.trim();
  }
}

function previewGenericImageUrl(secKey) {
  var urlInp = document.getElementById('builder-' + secKey + '-img-url');
  var previewImg = document.getElementById('builder-' + secKey + '-preview-img');
  if (urlInp && previewImg && urlInp.value.trim()) {
    previewImg.src = urlInp.value.trim();
    if (!currentThemeConfig[secKey]) currentThemeConfig[secKey] = {};
    currentThemeConfig[secKey].image = urlInp.value.trim();
  }
}

function saveThemeBuilderConfig() {
  // Collect Banner
  if (document.getElementById('builder-banner-title')) {
    if (!currentThemeConfig.banner) currentThemeConfig.banner = {};
    currentThemeConfig.banner.image = (document.getElementById('builder-banner-img-url') ? document.getElementById('builder-banner-img-url').value : '').trim() || currentThemeConfig.banner.image;
    currentThemeConfig.banner.title = (document.getElementById('builder-banner-title').value || '').trim();
    currentThemeConfig.banner.desc = (document.getElementById('builder-banner-desc').value || '').trim();
    currentThemeConfig.banner.btnText = (document.getElementById('builder-banner-btn-text').value || '').trim();
    currentThemeConfig.banner.btnLink = (document.getElementById('builder-banner-btn-link').value || '').trim();
  }

  // Collect Thuraya
  if (document.getElementById('builder-thuraya-title')) {
    if (!currentThemeConfig.thuraya) currentThemeConfig.thuraya = {};
    currentThemeConfig.thuraya.image = (document.getElementById('builder-thuraya-img-url') ? document.getElementById('builder-thuraya-img-url').value : '').trim() || currentThemeConfig.thuraya.image;
    currentThemeConfig.thuraya.title = (document.getElementById('builder-thuraya-title').value || '').trim();
    currentThemeConfig.thuraya.desc = (document.getElementById('builder-thuraya-desc').value || '').trim();
    currentThemeConfig.thuraya.btnText = (document.getElementById('builder-thuraya-btn-text').value || '').trim();
    currentThemeConfig.thuraya.btnLink = (document.getElementById('builder-thuraya-btn-link').value || '').trim();
  }

  // Collect Garmin
  if (document.getElementById('builder-garmin-title')) {
    if (!currentThemeConfig.garmin) currentThemeConfig.garmin = {};
    currentThemeConfig.garmin.image = (document.getElementById('builder-garmin-img-url') ? document.getElementById('builder-garmin-img-url').value : '').trim() || currentThemeConfig.garmin.image;
    currentThemeConfig.garmin.title = (document.getElementById('builder-garmin-title').value || '').trim();
    currentThemeConfig.garmin.desc = (document.getElementById('builder-garmin-desc').value || '').trim();
    currentThemeConfig.garmin.btnText = (document.getElementById('builder-garmin-btn-text').value || '').trim();
    currentThemeConfig.garmin.btnLink = (document.getElementById('builder-garmin-btn-link').value || '').trim();
  }

  // Collect B2B
  if (document.getElementById('builder-b2b-title')) {
    if (!currentThemeConfig.b2b) currentThemeConfig.b2b = {};
    currentThemeConfig.b2b.title = (document.getElementById('builder-b2b-title').value || '').trim();
    currentThemeConfig.b2b.desc = (document.getElementById('builder-b2b-desc').value || '').trim();
  }

  // Collect Showroom
  if (document.getElementById('builder-showroom-title')) {
    if (!currentThemeConfig.showroom) currentThemeConfig.showroom = {};
    currentThemeConfig.showroom.image = (document.getElementById('builder-showroom-img-url') ? document.getElementById('builder-showroom-img-url').value : '').trim() || currentThemeConfig.showroom.image;
    currentThemeConfig.showroom.title = (document.getElementById('builder-showroom-title').value || '').trim();
    currentThemeConfig.showroom.desc = (document.getElementById('builder-showroom-desc').value || '').trim();
    currentThemeConfig.showroom.address = (document.getElementById('builder-showroom-address').value || '').trim();
    currentThemeConfig.showroom.hours = (document.getElementById('builder-showroom-hours').value || '').trim();
    currentThemeConfig.showroom.phone = (document.getElementById('builder-showroom-phone').value || '').trim();
  }

  // Collect Global
  if (document.getElementById('builder-header-btn-text')) {
    currentThemeConfig.headerBtn = {
      text: (document.getElementById('builder-header-btn-text').value || '').trim(),
      link: (document.getElementById('builder-header-btn-link').value || '').trim()
    };
  }

  if (document.getElementById('builder-wa-phone')) {
    currentThemeConfig.whatsapp = {
      phone: (document.getElementById('builder-wa-phone').value || '').trim(),
      message: (document.getElementById('builder-wa-msg').value || '').trim()
    };
  }

  localStorage.setItem('barq_theme_config', JSON.stringify(currentThemeConfig));
  showToast('🚀 تم حفظ ونشر تصميم وهياكل المتجر بنجاح!');
}

function resetThemeBuilderConfig() {
  if (!confirm('هل تريد استعادة تصميم الموقع الافتراضي بالكامل؟')) return;
  localStorage.removeItem('barq_theme_config');
  currentThemeConfig = {
    sectionsOrder: ['home', 'section-features', 'products', 'thuraya', 'garmin', 'b2b', 'showroom'],
    sectionsVisible: {
      'home': true,
      'section-features': true,
      'products': true,
      'thuraya': true,
      'garmin': true,
      'b2b': true,
      'showroom': true
    },
    banner: {
      image: 'assets/images/hero_banner_1_refined.jpg',
      fit: 'cover',
      height: '380px',
      title: 'حلول الاتصالات الفضائية واللاسلكية والملاحة في المملكة',
      desc: 'مؤسسة برق سهيل التجارية وجهتكم الرائدة لتجهيز الرحلات البرية والبحرية بأحدث هواتف الثريا، أجهزة اللاسلكي المرخصة من هيئة الاتصالات (CST)، وملاحة وخرائط قارمن مع الضمان والدعم الفني المباشر بالدمام.',
      btnText: 'تصفح كتالوج الأجهزة',
      btnLink: '#products'
    },
    thuraya: {
      image: 'assets/images/thuraya_banner_3.jpg',
      fit: 'cover',
      height: '340px',
      title: 'اتصال فضائي لا ينقطع أينما ذهبت',
      desc: 'نوفر في مؤسسة برق سهيل أحدث هواتف وأجهزة الأقمار الصناعية وشبكة الثريا، الحل الأمثل للرحالة، أصحاب المقناص، عمال المناجم، والسفن البحرية في أي نقطة خارج تغطية شبكات الجوال.',
      btnText: 'استفسر عن عروض الثريا واتساب',
      btnLink: 'https://wa.me/966507181115?text=استفسار%20عن%20أجهزة%20وشرائح%20الثريا'
    },
    garmin: {
      image: 'assets/images/garmin_banner_2.jpg',
      fit: 'cover',
      height: '340px',
      title: 'استكشف دروب الصحراء والبحر بدقة متناهية',
      desc: 'أجهزة الملاحة اليدوية والمثبتة من شركة قارمن (Garmin) العالمية، محملة مسبقاً بأحدث خرائط تضاريس المملكة، الفياض، الشعبان، والمعالم الجغرافية البرية والبحرية.',
      btnText: 'عرض أجهزة قارمن والخرائط',
      btnLink: '#products'
    },
    b2b: {
      title: 'طلب عرض أسعار رسمي للشركات والمقناص',
      desc: 'للشركات، المقاولات، الجهات الحكومية، ومجموعات الرحلات البرية والبحرية. نجهز لكم عروض أسعار تفصيلية شاملة التراخيص والتوريد.'
    },
    showroom: {
      image: 'assets/images/store_identity_card.jpg',
      fit: 'cover',
      height: '380px',
      title: 'تفضل بزيارة معرضنا بالدمام',
      desc: 'يسعدنا استقبالكم في معرضنا للاطلاع المباشر على الأجهزة، تجربة الهواتف، وبرمجة وتحديث خرائط القارمن الفورية.',
      address: 'الدمام - حي بدر (المخطط 91) - داخل محل القناص الدولي، بجوار رفيق الدرب ومقابل مطعم البيك، طريق الملك فهد (خط المطار).',
      hours: 'السبت إلى الخميس: 9:00 صباحاً - 10:00 مساءً',
      phone: '0507181115 / +966507181115'
    },
    headerBtn: { text: 'طلب تسعيرة', link: '#b2b' },
    whatsapp: { phone: '966507181115', message: 'السلام عليكم، أود الاستفسار عن أجهزة برق سهيل' },
    layout: { gridCols: '5' }
  };
  selectedBuilderSectionId = 'home';
  populateBuilderUI();
  showToast('🔄 تم استعادة التصميم الافتراضي!');
}

// ── Users Management (Super Admin Only) ─────────────────────
function renderUsersTable() {
  initUsersDatabase();
  var container = document.getElementById('users-rows-container');
  if (!container) return;

  container.innerHTML = adminUsersList.map(function(u) {
    var isSuper = u.role === 'superadmin';
    var roleBadge = isSuper
      ? '<span style="background: rgba(192,132,252,0.15); color: #c084fc; border: 1px solid rgba(192,132,252,0.3); font-size: 11px; font-weight: 800; padding: 2px 10px; border-radius: 999px;">👑 مسؤول عام</span>'
      : '<span style="background: rgba(56,189,248,0.15); color: #38bdf8; border: 1px solid rgba(56,189,248,0.3); font-size: 11px; font-weight: 800; padding: 2px 10px; border-radius: 999px;">💼 مدير</span>';

    var isSelf = (currentUser && currentUser.username === u.username);

    return '<div style="display: grid; grid-template-columns: 1fr 140px 140px 140px 100px; gap: 12px; padding: 14px 18px; align-items: center; border-bottom: 1px solid rgba(30, 41, 59, 0.5);">' +
      '<div style="display: flex; align-items: center; gap: 10px;">' +
        '<div style="width: 38px; height: 38px; border-radius: 10px; background: ' + (isSuper ? 'rgba(192,132,252,0.15)' : 'rgba(56,189,248,0.15)') + '; color: ' + (isSuper ? '#c084fc' : '#38bdf8') + '; display: flex; align-items: center; justify-content: center; font-size: 15px;">' +
          '<i class="' + (isSuper ? 'fas fa-crown' : 'fas fa-user-tie') + '"></i>' +
        '</div>' +
        '<div>' +
          '<div style="color: #fff; font-size: 13px; font-weight: 800;">' + u.fullname + ' ' + (isSelf ? '<span style="color:#00D2FF; font-size:10px;">(حسابك الحالي)</span>' : '') + '</div>' +
          '<div style="color: #64748b; font-size: 11px;">' + (isSuper ? 'صلاحية كاملة للموقع وحذف المديرين' : 'صلاحية إدارة المخزون والأسعار') + '</div>' +
        '</div>' +
      '</div>' +
      '<div style="font-family: monospace; color: #00D2FF; font-weight: 700; font-size: 13px;">@' + u.username + '</div>' +
      '<div style="text-align: center;">' + roleBadge + '</div>' +
      '<div style="text-align: center; color: #64748b; font-size: 12px; font-family: monospace;">' + (u.createdAt || '2026-08-21') + '</div>' +
      '<div style="display: flex; gap: 6px; justify-content: center;">' +
        '<button onclick="openEditUserModal(\\'' + u.id + '\\')" style="width: 32px; height: 32px; border-radius: 8px; background: rgba(0,210,255,0.12); color: #00D2FF; border: none; cursor: pointer; font-size: 13px;" title="تعديل الحساب وكلمة المرور"><i class="fas fa-pen"></i></button>' +
        (isSelf
          ? '<button disabled style="width: 32px; height: 32px; border-radius: 8px; background: rgba(100,116,139,0.1); color: #475569; border: none; cursor: not-allowed;" title="لا يمكن حذف حسابك الحالي"><i class="fas fa-lock"></i></button>'
          : '<button onclick="deleteUser(\\'' + u.id + '\\')" style="width: 32px; height: 32px; border-radius: 8px; background: rgba(239,68,68,0.12); color: #f87171; border: none; cursor: pointer; font-size: 13px;" title="حذف المدير"><i class="fas fa-trash"></i></button>') +
      '</div>' +
    '</div>';
  }).join('');
}

function openAddUserModal() {
  document.getElementById('user-modal-title').textContent = '➕ إضافة مسؤول أو مدير جديد';
  document.getElementById('modal-user-id').value = '';
  document.getElementById('modal-user-fullname').value = '';
  document.getElementById('modal-user-username').value = '';
  document.getElementById('modal-user-password').value = '';
  document.getElementById('modal-user-password').required = true;
  document.getElementById('password-hint').style.display = 'none';
  document.getElementById('modal-user-role').value = 'manager';
  document.getElementById('user-modal-overlay').style.display = 'flex';
}

function openEditUserModal(userId) {
  initUsersDatabase();
  var u = adminUsersList.find(function(x) { return x.id === userId; });
  if (!u) return;

  document.getElementById('user-modal-title').textContent = '✏️ تعديل بيانات الحساب';
  document.getElementById('modal-user-id').value = u.id;
  document.getElementById('modal-user-fullname').value = u.fullname || '';
  document.getElementById('modal-user-username').value = u.username || '';
  document.getElementById('modal-user-password').value = '';
  document.getElementById('modal-user-password').required = false;
  document.getElementById('password-hint').style.display = 'block';
  document.getElementById('modal-user-role').value = u.role || 'manager';
  document.getElementById('user-modal-overlay').style.display = 'flex';
}

function closeUserModal() {
  document.getElementById('user-modal-overlay').style.display = 'none';
}

async function handleSaveUser(e) {
  e.preventDefault();
  initUsersDatabase();

  var uid = document.getElementById('modal-user-id').value;
  var fullname = (document.getElementById('modal-user-fullname').value || '').trim();
  var username = (document.getElementById('modal-user-username').value || '').trim().toLowerCase();
  var password = (document.getElementById('modal-user-password').value || '').trim();
  var role = document.getElementById('modal-user-role').value;

  if (uid) {
    // Edit existing
    var idx = adminUsersList.findIndex(function(x) { return x.id === uid; });
    if (idx === -1) return;

    adminUsersList[idx].fullname = fullname;
    adminUsersList[idx].username = username;
    adminUsersList[idx].role = role;

    if (password) {
      adminUsersList[idx].passwordHash = await computeSHA256(password);
    }

    localStorage.setItem('barq_admin_users', JSON.stringify(adminUsersList));
    closeUserModal();
    renderUsersTable();
    showToast('✅ تم تعديل الحساب بنجاح!');
  } else {
    // Add new
    if (!password) { showToast('❌ يجب تحديد كلمة مرور للحساب الجديد!'); return; }

    // Check duplicate username
    var exists = adminUsersList.some(function(x) { return x.username.toLowerCase() === username; });
    if (exists) { showToast('❌ اسم المستخدم مستخدم بالفعل! اختر اسماً آخر'); return; }

    var pHash = await computeSHA256(password);
    var newUser = {
      id: 'usr-' + Date.now().toString(36),
      username: username,
      fullname: fullname,
      role: role,
      passwordHash: pHash,
      createdAt: new Date().toISOString().slice(0, 10)
    };

    adminUsersList.push(newUser);
    localStorage.setItem('barq_admin_users', JSON.stringify(adminUsersList));
    closeUserModal();
    renderUsersTable();
    showToast('✅ تم إنشاء حساب ' + (role === 'superadmin' ? 'المسؤول العام' : 'المدير') + ' بنجاح!');
  }
}

function deleteUser(userId) {
  initUsersDatabase();
  var u = adminUsersList.find(function(x) { return x.id === userId; });
  if (!u) return;

  if (!confirm('هل أنت متأكد من حذف الحساب: \"' + u.fullname + ' (@' + u.username + ')\" نهائياً؟')) return;

  adminUsersList = adminUsersList.filter(function(x) { return x.id !== userId; });
  localStorage.setItem('barq_admin_users', JSON.stringify(adminUsersList));
  renderUsersTable();
  showToast('🗑️ تم حذف حساب المدير بنجاح!');
}

// ── Products Data ───────────────────────────────────────────
function loadData() {
  var saved = localStorage.getItem('barq_products');
  if (saved) {
    try { storeProducts = JSON.parse(saved); } catch(e) { storeProducts = []; }
  }

  if (!storeProducts || storeProducts.length === 0) {
    if (typeof INITIAL_PRODUCTS !== 'undefined' && INITIAL_PRODUCTS.length > 0) {
      storeProducts = JSON.parse(JSON.stringify(INITIAL_PRODUCTS));
    } else if (typeof INVENTORY_PRODUCTS !== 'undefined' && INVENTORY_PRODUCTS.length > 0) {
      storeProducts = JSON.parse(JSON.stringify(INVENTORY_PRODUCTS));
      storeProducts.sort(function(a, b) {
        return (CATEGORY_PRIORITY[a.category] || 9) - (CATEGORY_PRIORITY[b.category] || 9);
      });
      storeProducts.forEach(function(p, i) { p.displayIndex = i + 1; });
    }
  }

  saveToStorage();
  renderProductsTable();
  renderStats();
  updateBadge();
}

function saveToStorage() {
  localStorage.setItem('barq_products', JSON.stringify(storeProducts));
  updateBadge();
}

function updateBadge() {
  var b = document.getElementById('count-badge');
  if (b) b.textContent = storeProducts.length + ' صنف';
}

function resetToDefault() {
  if (!confirm('هل تريد استعادة بيانات الجرد الافتراضية كاملة؟ سيتم حذف التعديلات والرجوع للأصل.')) return;
  if (typeof INITIAL_PRODUCTS !== 'undefined' && INITIAL_PRODUCTS.length > 0) {
    storeProducts = JSON.parse(JSON.stringify(INITIAL_PRODUCTS));
  } else if (typeof INVENTORY_PRODUCTS !== 'undefined' && INVENTORY_PRODUCTS.length > 0) {
    storeProducts = JSON.parse(JSON.stringify(INVENTORY_PRODUCTS));
  }
  saveToStorage();
  renderProductsTable();
  renderStats();
  showToast('✅ تم استعادة بيانات الجرد الأصلية!');
}

// ── Pricing Calculations ────────────────────────────────────
function calcAddPricing(changedField) {
  var baseEl = document.getElementById('add-base-price');
  var discEl = document.getElementById('add-discount-amt');
  var finalEl = document.getElementById('add-final-price');
  var ribbonEl = document.getElementById('add-ribbon-preview');
  var ribbonText = document.getElementById('add-ribbon-text');

  var base = parseFloat(baseEl.value) || 0;
  var disc = parseFloat(discEl.value) || 0;
  var final = parseFloat(finalEl.value) || 0;

  if (changedField === 'base' || changedField === 'discount') {
    if (base > 0) {
      if (disc > 0) { finalEl.value = Math.max(0, base - disc); }
      else { finalEl.value = base; }
    }
  } else if (changedField === 'final') {
    if (base > 0 && final < base) { discEl.value = base - final; }
    else { discEl.value = 0; }
  }

  var currentDisc = parseFloat(discEl.value) || 0;
  if (currentDisc > 0 && base > 0) {
    ribbonText.textContent = 'خصم ' + currentDisc.toLocaleString() + ' ر.س';
    ribbonEl.style.display = 'block';
  } else {
    ribbonEl.style.display = 'none';
  }
}

function calcEditPricing(changedField) {
  var baseEl = document.getElementById('edit-base-price');
  var discEl = document.getElementById('edit-discount-amt');
  var finalEl = document.getElementById('edit-final-price');
  var ribbonEl = document.getElementById('edit-ribbon-preview');
  var ribbonText = document.getElementById('edit-ribbon-text');

  var base = parseFloat(baseEl.value) || 0;
  var disc = parseFloat(discEl.value) || 0;
  var final = parseFloat(finalEl.value) || 0;

  if (changedField === 'base' || changedField === 'discount') {
    if (base > 0) {
      if (disc > 0) { finalEl.value = Math.max(0, base - disc); }
      else { finalEl.value = base; }
    }
  } else if (changedField === 'final') {
    if (base > 0 && final < base) { discEl.value = base - final; }
    else { discEl.value = 0; }
  }

  var currentDisc = parseFloat(discEl.value) || 0;
  if (currentDisc > 0 && base > 0) {
    ribbonText.textContent = 'خصم ' + currentDisc.toLocaleString() + ' ر.س';
    ribbonEl.style.display = 'block';
  } else {
    ribbonEl.style.display = 'none';
  }
}

// ── Render Products Table ───────────────────────────────────
function renderProductsTable() {
  var search = (document.getElementById('search-inp').value || '').toLowerCase().trim();
  var catFilter = document.getElementById('cat-filter').value;
  var sortFilter = document.getElementById('sort-filter').value;

  var filtered = storeProducts.slice();

  if (catFilter !== 'all') {
    filtered = filtered.filter(function(p) { return p.category === catFilter; });
  }

  if (search) {
    filtered = filtered.filter(function(p) {
      return (p.name || '').toLowerCase().includes(search) ||
             (p.id || '').toLowerCase().includes(search) ||
             (p.nameEn || '').toLowerCase().includes(search);
    });
  }

  if (sortFilter === 'name') {
    filtered.sort(function(a, b) { return (a.name || '').localeCompare(b.name || '', 'ar'); });
  } else if (sortFilter === 'price-asc') {
    filtered.sort(function(a, b) { return (a.price || 0) - (b.price || 0); });
  } else if (sortFilter === 'price-desc') {
    filtered.sort(function(a, b) { return (b.price || 0) - (a.price || 0); });
  } else if (sortFilter === 'stock-asc') {
    filtered.sort(function(a, b) { return (a.stock || 0) - (b.stock || 0); });
  } else if (sortFilter === 'stock-desc') {
    filtered.sort(function(a, b) { return (b.stock || 0) - (a.stock || 0); });
  } else {
    filtered.sort(function(a, b) {
      return ((CATEGORY_PRIORITY[a.category] || 9) - (CATEGORY_PRIORITY[b.category] || 9)) ||
             ((a.displayIndex || 0) - (b.displayIndex || 0));
    });
  }

  document.getElementById('results-count').textContent = filtered.length;
  var container = document.getElementById('products-rows');

  if (filtered.length === 0) {
    container.innerHTML = '<div style="padding: 50px; text-align: center; color: #64748b;"><i class="fas fa-search" style="font-size: 28px; margin-bottom: 10px; display: block; opacity: 0.4;"></i>لا توجد أصناف مطابقة للبحث</div>';
    return;
  }

  container.innerHTML = filtered.map(function(p) {
    var cat = CATEGORY_MAP[p.category] || { name: p.category, icon: '📦', badgeClass: 'background:#1e293b;color:#94a3b8;' };
    var stock = (p.stock !== undefined) ? p.stock : 10;
    var stockColor = stock === 0 ? '#f87171' : stock <= 3 ? '#fbbf24' : '#34d399';
    var discountCash = (p.oldPrice && p.oldPrice > p.price) ? (p.oldPrice - p.price) : 0;

    var imgTag = p.image
      ? '<img src="' + p.image + '" style="width: 100%; height: 100%; object-fit: cover;" onerror="this.parentElement.innerHTML=\\'<i class=\\\\\\"fas fa-image\\\\\\" style=\\\\\\"color:#475569;font-size:16px\\\\\\"></i>\\'">'
      : '<i class="fas fa-image" style="color: #475569; font-size: 16px;"></i>';

    return '<div style="display: grid; grid-template-columns: 60px 1fr 140px 100px 90px 70px 100px; gap: 12px; padding: 12px 18px; align-items: center; border-bottom: 1px solid rgba(30, 41, 59, 0.5); transition: background 0.15s;" onmouseover="this.style.background=\\'rgba(0,210,255,0.03)\\'" onmouseout="this.style.background=\\'transparent\\'">' +
      '<div><div style="width: 48px; height: 48px; border-radius: 10px; overflow: hidden; background: #070c18; border: 1px solid #1e293b; display: flex; align-items: center; justify-content: center;">' + imgTag + '</div></div>' +
      '<div>' +
        '<div style="color: #fff; font-size: 13px; font-weight: 700; line-height: 1.35;">' + p.name + '</div>' +
        '<div style="color: #64748b; font-size: 11px; font-family: monospace; margin-top: 2px;">' + p.id + '</div>' +
        (p.badge ? '<span style="display: inline-block; font-size: 10px; font-weight: 800; background: rgba(0,210,255,0.1); color: #00D2FF; border: 1px solid rgba(0,210,255,0.2); padding: 1px 8px; border-radius: 999px; margin-top: 2px;">' + p.badge + '</span>' : '') +
      '</div>' +
      '<div><span style="display: inline-flex; align-items: center; gap: 4px; padding: 3px 10px; border-radius: 20px; font-size: 11px; font-weight: 700; ' + cat.badgeClass + '">' + cat.icon + ' ' + cat.name + '</span></div>' +
      '<div style="text-align: center;"><div style="color: #34d399; font-size: 14px; font-weight: 800; font-family: monospace;">' + (p.price || 0).toLocaleString() + '</div><div style="color: #64748b; font-size: 10px;">ر.س</div></div>' +
      '<div style="text-align: center;">' + (discountCash > 0 ? '<span style="font-size: 11px; font-weight: 800; color: #f87171; background: rgba(239,68,68,0.12); padding: 3px 8px; border-radius: 999px; font-family: monospace;">-' + discountCash.toLocaleString() + ' ر.س</span>' : '<span style="color:#334155;">—</span>') + '</div>' +
      '<div style="text-align: center;"><span style="font-size: 14px; font-weight: 800; font-family: monospace; color: ' + stockColor + ';">' + (stock === 999 ? '∞' : stock) + '</span></div>' +
      '<div style="display: flex; gap: 6px; justify-content: center;">' +
        '<button onclick="openEditModal(\\'' + p.id + '\\')" style="width: 32px; height: 32px; border-radius: 8px; background: rgba(0,210,255,0.12); color: #00D2FF; border: none; cursor: pointer; font-size: 13px;" title="تحرير كامل للصنف"><i class="fas fa-pen"></i></button>' +
        '<button onclick="duplicateProduct(\\'' + p.id + '\\')" style="width: 32px; height: 32px; border-radius: 8px; background: rgba(148,163,184,0.15); color: #94a3b8; border: none; cursor: pointer; font-size: 13px;" title="نسخ الصنف"><i class="fas fa-copy"></i></button>' +
        '<button onclick="deleteProduct(\\'' + p.id + '\\')" style="width: 32px; height: 32px; border-radius: 8px; background: rgba(239,68,68,0.12); color: #f87171; border: none; cursor: pointer; font-size: 13px;" title="حذف"><i class="fas fa-trash"></i></button>' +
      '</div>' +
    '</div>';
  }).join('');
}

// ── Edit Modal ──────────────────────────────────────────────
function openEditModal(productId) {
  var p = storeProducts.find(function(x) { return x.id === productId; });
  if (!p) return;
  currentEditingId = productId;
  uploadTarget = 'edit';
  editSpecsList = (p.specs || []).slice();

  var basePrice = (p.oldPrice && p.oldPrice > p.price) ? p.oldPrice : p.price;
  var discountAmt = (p.oldPrice && p.oldPrice > p.price) ? (p.oldPrice - p.price) : 0;
  var finalPrice = p.price || 0;

  var catOptionsHtml = Object.keys(CATEGORY_MAP).map(function(key) {
    var c = CATEGORY_MAP[key];
    var sel = (p.category === key) ? ' selected' : '';
    return '<option value="' + key + '"' + sel + '>' + c.icon + ' ' + c.name + '</option>';
  }).join('');

  var imgDisplay = p.image
    ? '<img src="' + p.image + '" style="width: 100%; height: 130px; object-fit: cover;">'
    : '<div style="text-align: center; color: #64748b; padding: 12px;"><i class="fas fa-cloud-arrow-up" style="font-size: 26px; margin-bottom: 6px; color: #00D2FF;"></i><div style="font-size: 12px; font-weight: 700; color: #cbd5e1;">اضغط لرفع صورة أو اسحبها هنا</div></div>';

  var modalHtml = '<div style="padding: 24px;">' +
    '<div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 20px; padding-bottom: 16px; border-bottom: 1px solid #1e293b;">' +
      '<div><h2 style="color: #fff; font-size: 17px; font-weight: 800; margin: 0;">✏️ تحرير وتعديل بيانات الصنف</h2><div style="color: #64748b; font-size: 11px; font-family: monospace; margin-top: 3px;">' + p.id + '</div></div>' +
      '<button onclick="closeEditModal()" style="width: 34px; height: 34px; border-radius: 10px; background: #1e293b; border: none; color: #94a3b8; cursor: pointer; font-size: 14px;"><i class="fas fa-times"></i></button>' +
    '</div>' +
    '<div style="display: grid; grid-template-columns: 1fr 1fr; gap: 20px;">' +
      '<!-- Left -->' +
      '<div style="display: flex; flex-direction: column; gap: 14px;">' +
        '<div>' +
          '<label style="display: block; font-size: 12px; font-weight: 700; color: #94a3b8; margin-bottom: 6px;">📷 صورة الصنف</label>' +
          '<div class="img-upload-box" id="edit-img-box" onclick="triggerUpload(\\'edit\\')" ondragover="dragOverHandler(event)" ondragleave="dragLeaveHandler(event)" ondrop="dropHandler(event, \\'edit\\')">' + imgDisplay + '</div>' +
          '<input type="text" id="edit-img-url" class="admin-input" style="margin-top: 8px; font-size: 12px;" value="' + (p.image || '') + '" placeholder="أو الصق رابط الصورة مباشرة..." oninput="previewUrl(\\'edit\\')">' +
        '</div>' +
        '<div><label style="display: block; font-size: 12px; font-weight: 700; color: #94a3b8; margin-bottom: 6px;">📌 اسم الصنف بالعربي</label><input type="text" id="edit-name" class="admin-input" value="' + (p.name || '') + '"></div>' +
        '<div><label style="display: block; font-size: 12px; font-weight: 700; color: #94a3b8; margin-bottom: 6px;">🔤 الاسم بالإنجليزي</label><input type="text" id="edit-name-en" class="admin-input" value="' + (p.nameEn || '') + '"></div>' +
        '<div><label style="display: block; font-size: 12px; font-weight: 700; color: #94a3b8; margin-bottom: 6px;">🗂️ الفئة</label><select id="edit-category" class="admin-input">' + catOptionsHtml + '</select></div>' +
        '<div><label style="display: block; font-size: 12px; font-weight: 700; color: #94a3b8; margin-bottom: 6px;">🏷️ الشارة الترويجية</label><input type="text" id="edit-badge" class="admin-input" value="' + (p.badge || '') + '" placeholder="مثال: الأكثر مبيعاً، خصم خاص..."></div>' +
      '</div>' +
      '<!-- Right -->' +
      '<div style="display: flex; flex-direction: column; gap: 14px;">' +
        '<div style="background: rgba(7,12,24,0.6); border: 1px solid #1e293b; border-radius: 12px; padding: 12px;">' +
          '<div style="font-size: 12px; font-weight: 800; color: #00D2FF; margin-bottom: 8px;">💰 تسعير الصنف والتخفيض</div>' +
          '<div style="display: grid; grid-template-columns: 1fr 1fr; gap: 10px; margin-bottom: 8px;">' +
            '<div>' +
              '<label style="display: block; font-size: 11px; font-weight: 700; color: #94a3b8; margin-bottom: 4px;">السعر الأساسي (ر.س) *</label>' +
              '<input type="number" id="edit-base-price" class="admin-input" value="' + basePrice + '" min="0" style="font-family: monospace;" oninput="calcEditPricing(\\'base\\')">' +
            '</div>' +
            '<div>' +
              '<label style="display: block; font-size: 11px; font-weight: 700; color: #f87171; margin-bottom: 4px;">قيمة الخصم (ر.س)</label>' +
              '<input type="number" id="edit-discount-amt" class="admin-input" value="' + discountAmt + '" min="0" style="color: #f87171; font-weight: 800; font-family: monospace;" oninput="calcEditPricing(\\'discount\\')">' +
            '</div>' +
          '</div>' +
          '<div>' +
            '<label style="display: block; font-size: 11px; font-weight: 700; color: #34d399; margin-bottom: 4px;">السعر النهائي للبيع (ر.س) *</label>' +
            '<input type="number" id="edit-final-price" class="admin-input" value="' + finalPrice + '" min="0" style="color: #34d399; font-weight: 800; font-family: monospace; font-size: 15px;" oninput="calcEditPricing(\\'final\\')">' +
          '</div>' +
          '<div id="edit-ribbon-preview" style="display: ' + (discountAmt > 0 ? 'block' : 'none') + '; margin-top: 8px; padding: 6px 12px; background: rgba(244,63,94,0.1); border: 1px solid rgba(244,63,94,0.25); border-radius: 8px; font-size: 11px; color: #fb7185; font-weight: 700; text-align: center;">' +
            '🏷️ سيظهر شريط في المتجر: <span id="edit-ribbon-text" class="font-bold font-mono">خصم ' + discountAmt.toLocaleString() + ' ر.س</span>' +
          '</div>' +
        '</div>' +
        '<div><label style="display: block; font-size: 12px; font-weight: 700; color: #94a3b8; margin-bottom: 6px;">📦 كمية المخزون</label>' +
          '<div style="display: flex; align-items: center; gap: 8px;">' +
            '<button type="button" onclick="adjustQty(\\'edit\\', -1)" style="width: 38px; height: 38px; border-radius: 10px; background: #1e293b; color: #fff; border: none; font-size: 18px; font-weight: 800; cursor: pointer;\">−</button>' +
            '<input type="number" id="edit-stock" class="admin-input" value="' + (p.stock !== undefined ? p.stock : 10) + '" min="0" style="text-align: center; font-size: 16px; font-weight: 800; font-family: monospace; color: #34d399;">' +
            '<button type="button" onclick="adjustQty(\\'edit\\', 1)" style="width: 38px; height: 38px; border-radius: 10px; background: #1e293b; color: #fff; border: none; font-size: 18px; font-weight: 800; cursor: pointer;\">+</button>' +
          '</div>' +
          '<div style="display: flex; gap: 6px; margin-top: 8px;">' +
            '<button type="button" onclick="setStockValue(0)" style="flex: 1; font-size: 11px; background: rgba(239,68,68,0.15); color: #f87171; border: none; padding: 6px; border-radius: 8px; cursor: pointer; font-weight: 700;">نفد</button>' +
            '<button type="button" onclick="setStockValue(5)" style="flex: 1; font-size: 11px; background: #1e293b; color: #cbd5e1; border: none; padding: 6px; border-radius: 8px; cursor: pointer;">5</button>' +
            '<button type="button" onclick="setStockValue(10)" style="flex: 1; font-size: 11px; background: #1e293b; color: #cbd5e1; border: none; padding: 6px; border-radius: 8px; cursor: pointer;">10</button>' +
            '<button type="button" onclick="setStockValue(20)" style="flex: 1; font-size: 11px; background: #1e293b; color: #cbd5e1; border: none; padding: 6px; border-radius: 8px; cursor: pointer;">20</button>' +
            '<button type="button" onclick="setStockValue(999)" style="flex: 1; font-size: 11px; background: rgba(0,210,255,0.15); color: #00D2FF; border: none; padding: 6px; border-radius: 8px; cursor: pointer; font-weight: 800;">غير محدود</button>' +
          '</div>' +
        '</div>' +
        '<div style="display: grid; grid-template-columns: 1fr 1fr; gap: 10px;">' +
          '<div><label style="display: block; font-size: 12px; font-weight: 700; color: #94a3b8; margin-bottom: 6px;">⭐ التقييم</label><input type="number" id="edit-rating" class="admin-input" value="' + (p.rating || 4.8) + '" min="1" max="5" step="0.1"></div>' +
          '<div><label style="display: block; font-size: 12px; font-weight: 700; color: #94a3b8; margin-bottom: 6px;">💬 التقييمات</label><input type="number" id="edit-reviews" class="admin-input" value="' + (p.reviewsCount || 0) + '" min="0"></div>' +
        '</div>' +
        '<div><label style="display: block; font-size: 12px; font-weight: 700; color: #94a3b8; margin-bottom: 6px;">📝 وصف الصنف</label><textarea id="edit-desc" class="admin-input" rows="3" style="resize: vertical;">' + (p.shortDesc || '') + '</textarea></div>' +
      '</div>' +
    '</div>' +
    '<div style="margin-top: 18px;">' +
      '<label style="display: block; font-size: 12px; font-weight: 700; color: #94a3b8; margin-bottom: 6px;">⚙️ نقاط المواصفات</label>' +
      '<div id="edit-specs-tags" style="display: flex; flex-wrap: wrap; gap: 6px; min-height: 40px; padding: 10px; background: #070c18; border: 1px solid #1e293b; border-radius: 10px; margin-bottom: 8px;"></div>' +
      '<div style="display: flex; gap: 8px;">' +
        '<input type="text" id="edit-spec-text" class="admin-input" placeholder="أضف مواصفة واضغط Enter..." onkeydown="if(event.key===\\'Enter\\'){event.preventDefault();addSpecItem(\\'edit\\');}">' +
        '<button type="button" onclick="addSpecItem(\\'edit\\')" style="width: 42px; border-radius: 10px; background: rgba(0,210,255,0.15); color: #00D2FF; border: none; cursor: pointer; font-size: 16px;"><i class="fas fa-plus"></i></button>' +
      '</div>' +
    '</div>' +
    '<div style="display: flex; gap: 10px; margin-top: 24px; padding-top: 18px; border-top: 1px solid #1e293b;">' +
      '<button onclick="saveEditChanges()" style="flex: 1; background: linear-gradient(135deg, #008DA5, #00D2FF); color: #070C1A; border: none; font-weight: 800; padding: 14px; border-radius: 12px; font-size: 14px; cursor: pointer;"><i class="fas fa-save"></i> حفظ جميع التعديلات</button>' +
      '<button onclick="closeEditModal()" style="padding: 14px 22px; background: #1e293b; color: #94a3b8; border: none; border-radius: 12px; font-weight: 700; cursor: pointer;">إلغاء</button>' +
      '<button onclick="deleteProduct(\\'' + p.id + '\\', true)" style="width: 46px; background: rgba(239,68,68,0.15); color: #f87171; border: none; border-radius: 12px; cursor: pointer;"><i class="fas fa-trash"></i></button>' +
    '</div>' +
  '</div>';

  document.getElementById('edit-modal-box').innerHTML = modalHtml;
  document.getElementById('modal-overlay').classList.add('active');
  document.body.style.overflow = 'hidden';
  renderSpecTags('edit');
}

function closeEditModal() {
  document.getElementById('modal-overlay').classList.remove('active');
  document.body.style.overflow = '';
  currentEditingId = null;
}

function handleOverlayClick(e) {
  if (e.target === document.getElementById('modal-overlay')) closeEditModal();
}

// ── Specs Management ────────────────────────────────────────
function renderSpecTags(mode) {
  var container = document.getElementById(mode + '-specs-tags');
  if (!container) return;
  var list = (mode === 'edit') ? editSpecsList : addSpecsList;

  if (list.length === 0) {
    container.innerHTML = '<span style="color: #475569; font-size: 12px;">لم يتم إضافة مواصفات بعد...</span>';
    return;
  }

  container.innerHTML = list.map(function(s, idx) {
    return '<span class="spec-tag">' + s + ' <button type="button" onclick="removeSpecItem(\\'' + mode + '\\', ' + idx + ')\" style="background: none; border: none; color: #f87171; cursor: pointer; font-size: 11px;"><i class="fas fa-times"></i></button></span>';
  }).join('');
}

function addSpecItem(mode) {
  var inp = document.getElementById(mode + '-spec-text');
  var val = (inp ? inp.value : '').trim();
  if (!val) return;
  if (mode === 'edit') editSpecsList.push(val);
  else addSpecsList.push(val);
  inp.value = '';
  renderSpecTags(mode);
}

function removeSpecItem(mode, idx) {
  if (mode === 'edit') editSpecsList.splice(idx, 1);
  else addSpecsList.splice(idx, 1);
  renderSpecTags(mode);
}

// ── Save Edit ───────────────────────────────────────────────
function saveEditChanges() {
  var idx = storeProducts.findIndex(function(x) { return x.id === currentEditingId; });
  if (idx === -1) { showToast('❌ الصنف غير موجود!'); return; }

  var cat = document.getElementById('edit-category').value;
  var basePrice = parseFloat(document.getElementById('edit-base-price').value) || 0;
  var discountAmt = parseFloat(document.getElementById('edit-discount-amt').value) || 0;
  var finalPrice = parseFloat(document.getElementById('edit-final-price').value) || 0;

  if (!finalPrice && basePrice > 0) {
    finalPrice = Math.max(0, basePrice - discountAmt);
  }

  storeProducts[idx] = Object.assign({}, storeProducts[idx], {
    name: (document.getElementById('edit-name').value || '').trim(),
    nameEn: (document.getElementById('edit-name-en').value || '').trim(),
    category: cat,
    categoryName: (CATEGORY_MAP[cat] || {}).name || cat,
    badge: (document.getElementById('edit-badge').value || '').trim(),
    price: finalPrice,
    oldPrice: (discountAmt > 0 && basePrice > finalPrice) ? basePrice : 0,
    stock: parseInt(document.getElementById('edit-stock').value) || 0,
    rating: parseFloat(document.getElementById('edit-rating').value) || 4.8,
    reviewsCount: parseInt(document.getElementById('edit-reviews').value) || 0,
    shortDesc: (document.getElementById('edit-desc').value || '').trim(),
    specs: editSpecsList.slice(),
    image: (document.getElementById('edit-img-url').value || '').trim() || storeProducts[idx].image || ''
  });

  saveToStorage();
  closeEditModal();
  renderProductsTable();
  renderStats();
  showToast('✅ تم حفظ التعديلات وحفظ الخصم بنجاح!');
}

// ── Add New Product ─────────────────────────────────────────
function saveNewProduct() {
  var name = (document.getElementById('add-name').value || '').trim();
  if (!name) { showToast('❌ يجب كتابة اسم الصنف!'); return; }

  var basePrice = parseFloat(document.getElementById('add-base-price').value) || 0;
  var discountAmt = parseFloat(document.getElementById('add-discount-amt').value) || 0;
  var finalPrice = parseFloat(document.getElementById('add-final-price').value) || 0;

  if (!finalPrice && basePrice > 0) {
    finalPrice = Math.max(0, basePrice - discountAmt);
  }
  if (!finalPrice && !basePrice) {
    showToast('❌ يجب تحديد سعر الصنف!'); return;
  }

  var cat = document.getElementById('add-category').value;

  var newProd = {
    id: 'SKU-' + Date.now().toString(36).toUpperCase(),
    name: name,
    nameEn: (document.getElementById('add-name-en').value || '').trim(),
    category: cat,
    categoryName: (CATEGORY_MAP[cat] || {}).name || cat,
    badge: (document.getElementById('add-badge').value || '').trim(),
    price: finalPrice,
    oldPrice: (discountAmt > 0 && basePrice > finalPrice) ? basePrice : 0,
    stock: parseInt(document.getElementById('add-stock').value) || 0,
    rating: parseFloat(document.getElementById('add-rating').value) || 4.8,
    reviewsCount: parseInt(document.getElementById('add-reviews').value) || 0,
    shortDesc: (document.getElementById('add-desc').value || '').trim(),
    specs: addSpecsList.slice(),
    image: (document.getElementById('add-img-url').value || '').trim(),
    displayIndex: storeProducts.length + 1
  };

  storeProducts.push(newProd);
  saveToStorage();

  // Reset Form
  document.getElementById('add-name').value = '';
  document.getElementById('add-name-en').value = '';
  document.getElementById('add-base-price').value = '';
  document.getElementById('add-discount-amt').value = '';
  document.getElementById('add-final-price').value = '';
  document.getElementById('add-badge').value = '';
  document.getElementById('add-desc').value = '';
  document.getElementById('add-img-url').value = '';
  document.getElementById('add-img-box').innerHTML = '<div style="text-align: center; color: #64748b; padding: 12px;"><i class="fas fa-cloud-arrow-up" style="font-size: 26px; margin-bottom: 6px; color: #00D2FF;"></i><div style="font-size: 12px; font-weight: 700; color: #cbd5e1;">اضغط لرفع صورة أو اسحبها هنا</div></div>';
  document.getElementById('add-ribbon-preview').style.display = 'none';
  addSpecsList = [];
  renderSpecTags('add');

  switchTab('products');
  renderProductsTable();
  renderStats();
  showToast('✅ تم إضافة "' + name + '" للموقع بنجاح!');
}

// ── Delete / Duplicate Product ──────────────────────────────
function deleteProduct(id, fromModal) {
  var p = storeProducts.find(function(x) { return x.id === id; });
  if (!p) return;
  if (!confirm('هل أنت متأكد من حذف الصنف: "' + p.name + '"؟')) return;

  storeProducts = storeProducts.filter(function(x) { return x.id !== id; });
  saveToStorage();
  if (fromModal) closeEditModal();
  renderProductsTable();
  renderStats();
  showToast('🗑️ تم حذف الصنف بنجاح!');
}

function duplicateProduct(id) {
  var p = storeProducts.find(function(x) { return x.id === id; });
  if (!p) return;

  var copy = Object.assign({}, p, {
    id: 'COPY-' + Date.now().toString(36).toUpperCase(),
    name: 'نسخة - ' + p.name
  });

  var idx = storeProducts.findIndex(function(x) { return x.id === id; });
  storeProducts.splice(idx + 1, 0, copy);
  saveToStorage();
  renderProductsTable();
  showToast('📋 تم عمل نسخة من "' + p.name + '"');
}

// ── Quantity Helpers ────────────────────────────────────────
function adjustQty(mode, delta) {
  var input = document.getElementById(mode + '-stock');
  if (!input) return;
  var current = parseInt(input.value) || 0;
  input.value = Math.max(0, current + delta);
}

function setStockValue(val) {
  var input = document.getElementById('edit-stock');
  if (input) input.value = val;
}

// ── Images Upload & Drag/Drop ────────────────────────────────
function triggerUpload(mode) {
  uploadTarget = mode;
  document.getElementById('file-input-el').click();
}

function handleFileChosen(e) {
  var file = e.target.files[0];
  if (!file) return;
  var reader = new FileReader();
  reader.onload = function(evt) {
    if (uploadTarget === 'builder-banner') {
      var previewImg = document.getElementById('builder-banner-preview-img');
      var urlInp = document.getElementById('builder-banner-img-url');
      if (previewImg) previewImg.src = evt.target.result;
      if (urlInp) urlInp.value = evt.target.result;
      if (!currentThemeConfig.banner) currentThemeConfig.banner = {};
      currentThemeConfig.banner.image = evt.target.result;
    } else if (uploadTarget.startsWith('builder-')) {
      var secKey = uploadTarget.replace('builder-', '');
      var previewImg = document.getElementById('builder-' + secKey + '-preview-img');
      var urlInp = document.getElementById('builder-' + secKey + '-img-url');
      if (previewImg) previewImg.src = evt.target.result;
      if (urlInp) urlInp.value = evt.target.result;
      if (!currentThemeConfig[secKey]) currentThemeConfig[secKey] = {};
      currentThemeConfig[secKey].image = evt.target.result;
    } else {
      setBoxImage(uploadTarget, evt.target.result);
    }
  };
  reader.readAsDataURL(file);
  e.target.value = '';
}

function dragOverHandler(e) {
  e.preventDefault();
  e.currentTarget.classList.add('dragover');
}

function dragLeaveHandler(e) {
  e.currentTarget.classList.remove('dragover');
}

function dropHandler(e, mode) {
  e.preventDefault();
  e.currentTarget.classList.remove('dragover');
  var file = e.dataTransfer && e.dataTransfer.files[0];
  if (!file || !file.type.startsWith('image/')) return;
  uploadTarget = mode;
  var reader = new FileReader();
  reader.onload = function(evt) {
    if (mode === 'builder-banner') {
      var previewImg = document.getElementById('builder-banner-preview-img');
      var urlInp = document.getElementById('builder-banner-img-url');
      if (previewImg) previewImg.src = evt.target.result;
      if (urlInp) urlInp.value = evt.target.result;
      if (!currentThemeConfig.banner) currentThemeConfig.banner = {};
      currentThemeConfig.banner.image = evt.target.result;
    } else if (mode.startsWith('builder-')) {
      var secKey = mode.replace('builder-', '');
      var previewImg = document.getElementById('builder-' + secKey + '-preview-img');
      var urlInp = document.getElementById('builder-' + secKey + '-img-url');
      if (previewImg) previewImg.src = evt.target.result;
      if (urlInp) urlInp.value = evt.target.result;
      if (!currentThemeConfig[secKey]) currentThemeConfig[secKey] = {};
      currentThemeConfig[secKey].image = evt.target.result;
    } else {
      setBoxImage(mode, evt.target.result);
    }
  };
  reader.readAsDataURL(file);
}

function setBoxImage(mode, src) {
  var box = document.getElementById(mode + '-img-box');
  var urlInput = document.getElementById(mode + '-img-url');
  if (box) box.innerHTML = '<img src="' + src + '" style="width: 100%; height: 130px; object-fit: cover;">';
  if (urlInput) urlInput.value = src;
}

function previewUrl(mode) {
  var urlInput = document.getElementById(mode + '-img-url');
  var box = document.getElementById(mode + '-img-box');
  if (!urlInput || !box) return;
  var url = urlInput.value.trim();
  if (url) {
    box.innerHTML = '<img src="' + url + '" style="width: 100%; height: 130px; object-fit: cover;" onerror="this.parentElement.innerHTML=\\'<div style=\\\\\\"color:#f87171;font-size:12px;text-align:center;padding:20px;\\\\\\">رابط غير صالح</div>\\'">';
  }
}

// ── Stats ───────────────────────────────────────────────────
function renderStats() {
  var counts = {};
  var totalStock = 0;
  var lowStock = [];

  storeProducts.forEach(function(p) {
    counts[p.category] = (counts[p.category] || 0) + 1;
    var st = (p.stock !== undefined) ? p.stock : 10;
    totalStock += st;
    if (st <= 3) lowStock.push(p);
  });

  var statCards = [
    { label: 'إجمالي الأصناف', val: storeProducts.length, icon: 'fas fa-boxes-stacked', color: '#00D2FF', bg: 'rgba(0,210,255,0.12)' },
    { label: 'إجمالي القطع في المخزون', val: totalStock, icon: 'fas fa-warehouse', color: '#34d399', bg: 'rgba(52,211,153,0.12)' },
    { label: 'أصناف قاربت على النفاد', val: lowStock.length, icon: 'fas fa-triangle-exclamation', color: '#f87171', bg: 'rgba(239,68,68,0.12)' },
    { label: 'أجهزة اللاسلكي', val: counts.devices || 0, icon: 'fas fa-radio', color: '#60a5fa', bg: 'rgba(96,165,250,0.12)' },
    { label: 'أجهزة الثريا', val: counts.thuraya || 0, icon: 'fas fa-satellite', color: '#38bdf8', bg: 'rgba(56,189,248,0.12)' },
    { label: 'قارمن والملاحة', val: counts.garmin || 0, icon: 'fas fa-map-location-dot', color: '#4ade80', bg: 'rgba(74,222,128,0.12)' },
    { label: 'الملحقات والهوائيات', val: counts.accessories || 0, icon: 'fas fa-plug', color: '#fbbf24', bg: 'rgba(251,191,36,0.12)' },
    { label: 'الشرائح والخدمات', val: (counts.cards || 0) + (counts.services || 0), icon: 'fas fa-sim-card', color: '#c084fc', bg: 'rgba(192,132,252,0.12)' }
  ];

  var grid = document.getElementById('stats-grid');
  if (grid) {
    grid.innerHTML = statCards.map(function(s) {
      return '<div style="background: rgba(15,23,42,0.75); border: 1px solid #1e293b; border-radius: 14px; padding: 16px; display: flex; align-items: center; gap: 14px;">' +
        '<div style="width: 44px; height: 44px; border-radius: 12px; background: ' + s.bg + '; color: ' + s.color + '; display: flex; align-items: center; justify-content: center; font-size: 20px; flex-shrink: 0;"><i class="' + s.icon + '"></i></div>' +
        '<div><div style="font-size: 24px; font-weight: 800; font-family: monospace; color: ' + s.color + ';\">' + s.val + '</div><div style="font-size: 12px; color: #64748b;">' + s.label + '</div></div>' +
      '</div>';
    }).join('');
  }

  var lowList = document.getElementById('low-stock-list');
  if (lowList) {
    if (lowStock.length === 0) {
      lowList.innerHTML = '<div style="color: #34d399; font-size: 13px; text-align: center; padding: 16px;"><i class="fas fa-check-circle"></i> المخزون بحالة ممتازة - لا توجد نواقص</div>';
    } else {
      lowList.innerHTML = lowStock.map(function(p) {
        return '<div style="display: flex; align-items: center; justify-content: space-between; padding: 12px; background: rgba(239,68,68,0.06); border: 1px solid rgba(239,68,68,0.2); border-radius: 10px; margin-bottom: 8px;">' +
          '<div><div style="color: #fff; font-size: 13px; font-weight: 700;">' + p.name + '</div><div style="color: #64748b; font-size: 11px; font-family: monospace;">' + p.id + '</div></div>' +
          '<div style="display: flex; align-items: center; gap: 12px;">' +
            '<span style="color: #f87171; font-weight: 800; font-family: monospace; font-size: 13px;">المتبقي: ' + (p.stock || 0) + '</span>' +
            '<button onclick="openEditModal(\\'' + p.id + '\\')" style="background: rgba(0,210,255,0.15); color: #00D2FF; border: none; border-radius: 8px; padding: 6px 12px; font-size: 11px; font-weight: 700; cursor: pointer;">تعديل المخزون</button>' +
          '</div>' +
        '</div>';
      }).join('');
    }
  }
}

// ── Export ──────────────────────────────────────────────────
function exportJSON() {
  var dataStr = JSON.stringify(storeProducts, null, 2);
  var blob = new Blob([dataStr], { type: 'application/json' });
  var url = URL.createObjectURL(blob);
  var a = document.createElement('a');
  a.href = url;
  a.download = 'barq-inventory-' + new Date().toISOString().slice(0, 10) + '.json';
  a.click();
  URL.revokeObjectURL(url);
  showToast('📥 تم تصدير ملف المخزون بنجاح!');
}

// ── Toast ───────────────────────────────────────────────────
function showToast(msg) {
  var t = document.getElementById('toast');
  t.textContent = msg;
  t.style.display = 'block';
  clearTimeout(t._timer);
  t._timer = setTimeout(function() {
    t.style.display = 'none';
  }, 3000);
}

// ── Security & Anti-Theft Guard ─────────────────────────────
(function(){
  if(window.top!==window.self){try{window.top.location=window.self.location;}catch(e){}}
  document.addEventListener('contextmenu',function(e){e.preventDefault();});
  document.addEventListener('keydown',function(e){
    if(e.key==='F12'||(e.ctrlKey&&e.shiftKey&&(e.key==='I'||e.key==='i'||e.key==='J'||e.key==='j'||e.key==='C'||e.key==='c'))||(e.ctrlKey&&(e.key==='U'||e.key==='u'||e.key==='S'||e.key==='s'))){
      e.preventDefault();return false;
    }
  });
})();
</script>
</body>
</html>
'''

with open('admin.html', 'w', encoding='utf-8') as f:
    f.write(content)

print('admin.html with Interactive Section Selector generated successfully! Length:', len(content))
