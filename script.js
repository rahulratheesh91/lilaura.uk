/* LilAura storefront behaviour with two-tier filtering, clean URL paths, and promo timer. (Cart & Wishlist Removed) */
(() => {
  'use strict';

  if (window.location.pathname.endsWith('.html') && window.location.pathname !== '/index.html') {
    window.history.replaceState(null, '', window.location.pathname.replace(/\.html$/, '') + window.location.search);
  } else if (window.location.pathname === '/index.html') {
    window.history.replaceState(null, '', '/');
  }

  const CATALOG_URL = 'products.json';
  const RECENT_KEY = 'lilauraRecentlyViewed';
  const money = value => new Intl.NumberFormat('en-GB', { style: 'currency', currency: 'GBP' }).format(Number(value) || 0);
  const $ = (selector, root = document) => root.querySelector(selector); 
  const $$ = (selector, root = document) => Array.from(root.querySelectorAll(selector));
  const escapeHTML = value => String(value ?? '').replace(/[&<>"']/g, char => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[char]));
  
  const safeURL = (value, { internal = false } = {}) => {
    if (!value || typeof value !== 'string') return '';
    try {
      const url = new URL(value, window.location.href);
      if (internal && url.origin === window.location.origin) return url.href;
      if (url.protocol === 'https:' && (url.hostname === 'etsy.com' || url.hostname.endsWith('.etsy.com') || url.hostname.endsWith('.etsystatic.com') || url.hostname === 'lilaura.uk' || url.hostname === 'www.lilaura.uk')) return url.href;
      return '';
    } catch (_) { return ''; }
  };

  const safeEtsyURL = value => {
    const url = safeURL(value);
    if (!url) return '';
    try { const parsed = new URL(url); return (parsed.hostname === 'etsy.com' || parsed.hostname.endsWith('.etsy.com')) && parsed.pathname.startsWith('/uk/') || (parsed.hostname === 'etsy.com' || parsed.hostname.endsWith('.etsy.com')) && parsed.pathname.startsWith('/listing/') ? parsed.href : ''; } catch (_) { return ''; }
  };

  const readJSON = (key, fallback) => {
    try {
      const value = JSON.parse(localStorage.getItem(key) || 'null');
      return value == null ? fallback : value;
    } catch (_) { return fallback; }
  };
  const writeJSON = (key, value) => { try { localStorage.setItem(key, JSON.stringify(value)); return true; } catch (_) { return false; } };

  // Determine Main Line (Anti-Tarnish vs Traditional Heritage)
  const getMainLine = product => {
    const ml = String(product?.mainLine || '').toLowerCase();
    const cat = String(product?.category || '').toLowerCase();
    const name = String(product?.name || '').toLowerCase();
    if (ml.includes('traditional') || cat.includes('traditional') || /palakka|jhumka|temple jewellery|kasu mala|heritage|brass/.test(name)) {
      return 'traditional';
    }
    return 'anti-tarnish';
  };

  // Determine Sub-Category
  const getSubCategory = product => {
    const sc = String(product?.subCategory || '').toLowerCase();
    const cat = String(product?.category || '').toLowerCase();
    const name = String(product?.name || '').toLowerCase();
    if (sc.includes('earring') || cat.includes('earring') || /earring|jhumka|studs?\b/.test(name)) return 'earrings';
    if (sc.includes('ring') || cat.includes('ring') || /\bring\b/.test(name)) return 'rings';
    if (sc.includes('necklace') || cat.includes('necklace') || /necklace|choker|pendant/.test(name)) return 'necklaces';
    if (sc.includes('kada') || sc.includes('cuff') || cat.includes('kada') || cat.includes('bracelet') || cat.includes('bangle') || /kada|cuff|bracelet|bangle/.test(name)) return 'kadas';
    return 'necklaces';
  };

  class LilAuraAnalytics {
    static trackEvent(name, params = {}) {
      if (!window.gtag || window.LilAuraLayout?.safeReadConsent?.() !== 'accepted') return;
      const clean = { ...params };
      ['email','phone','name','address','message','form_data'].forEach(key => delete clean[key]);
      window.gtag('event', name, clean);
    }
    static trackViewItem(product) {
      if (!product) return;
      this.trackEvent('view_item', { currency: 'GBP', value: Number(product.price) || 0, items: [{ item_id: String(product.id || product.sku || ''), item_name: product.name, item_category: product.category || 'Jewellery', price: Number(product.price) || 0, quantity: 1 }] });
    }
    static trackSelectItem(product, listName = 'Product Catalog') {
      if (!product) return;
      this.trackEvent('select_item', { item_list_name: listName, items: [{ item_id: String(product.id || product.sku || ''), item_name: product.name, item_category: product.category || 'Jewellery', price: Number(product.price) || 0 }] });
    }
    static trackOutboundEtsy(context = {}) {
      this.trackEvent('click_outbound_etsy', { destination_type: context.type || 'product_listing', item_id: String(context.id || 'general_shop'), item_name: context.name || 'Etsy Store' });
    }
  }
  window.LilAuraAnalytics = LilAuraAnalytics;

  const Store = {
    catalog: null,
    products: [],
    activeLine: 'all',
    activeSub: 'all',
    isHome: false,
    async init() {
      this.initAccordion();
      this.initPromoTimer();
      this.initScrollButton();
      try {
        const response = await fetch(CATALOG_URL, { headers: { Accept: 'application/json' }, cache: 'no-cache' });
        if (!response.ok) throw new Error(`Catalogue request failed (${response.status})`);
        const data = await response.json();
        if (!data || !Array.isArray(data.items)) throw new Error('Catalogue has no valid items array');
        const seenIds = new Set();
        this.products = data.items.filter(item => {
          const valid = item && (typeof item.id === 'string' || Number.isFinite(Number(item.id))) && String(item.name || '').trim() && Number.isFinite(Number(item.price)) && Number(item.price) >= 0 && safeURL(item.image, { internal: true }) && safeEtsyURL(item.etsyLink);
          if (!valid || seenIds.has(String(item.id))) return false;
          seenIds.add(String(item.id));
          return true;
        }).map(item => ({ ...item, id: String(item.id), price: Number(item.price) }));
        this.catalog = data;
        this.renderCurrentPage();
      } catch (error) {
        console.error('[LilAura] Could not load product catalogue:', error);
      }
    },
    normaliseIds(value) {
      if (!Array.isArray(value)) return [];
      return [...new Set(value.map(v => String(typeof v === 'object' && v ? v.id : v)).filter(v => v && v !== 'undefined'))];
    },
    renderCurrentPage() {
      const path = window.location.pathname.toLowerCase();
      this.isHome = path.endsWith('/') || path.endsWith('/index') || path.endsWith('/index.html');
      if ($('#shop-grid')) this.renderProductGrid();
      if ($('#p-name')) this.renderProductDetail();
      if ($('#recentGrid')) this.renderRecent();
    },
    getVisibleProducts() {
      let items = [...this.products];
      if (this.isHome) {
        // Strict rendering: ONLY show items marked as featured, and absolute max of 4.
        const explicitFeatured = items.filter(p => p.featured === true);
        return explicitFeatured.length > 0 ? explicitFeatured.slice(0, 4) : items.slice(0, 4);
      }
      
      const params = new URLSearchParams(location.search);
      const line = params.get('line') || 'all';
      const sub = params.get('sub') || 'all';
      
      this.activeLine = line;
      this.activeSub = sub;

      if (line !== 'all') {
        items = items.filter(p => getMainLine(p) === line);
      }
      if (sub !== 'all') {
        items = items.filter(p => getSubCategory(p) === sub);
      }
      return items;
    },
    renderProductGrid() {
      const grid = $('#shop-grid');
      if (!grid) return;
      const params = new URLSearchParams(location.search);
      this.activeLine = params.get('line') || 'all';
      this.activeSub = params.get('sub') || 'all';

      const tabs = $('#shopTabs');
      // If we are on the homepage, index.html won't have a #shopTabs element anymore, so this logic is bypassed safely
      if (tabs) {
        tabs.innerHTML = `
          <div class="filter-container">
            <div class="filter-row-primary">
              <button type="button" class="filter-btn-primary ${this.activeLine === 'all' ? 'active' : ''}" data-line="all">All Collections</button>
              <button type="button" class="filter-btn-primary ${this.activeLine === 'anti-tarnish' ? 'active' : ''}" data-line="anti-tarnish">Anti-Tarnish Everyday Luxury</button>
              <button type="button" class="filter-btn-primary ${this.activeLine === 'traditional' ? 'active' : ''}" data-line="traditional">Traditional Heritage</button>
            </div>
            <div class="filter-row-secondary">
              <button type="button" class="filter-btn-secondary ${this.activeSub === 'all' ? 'active' : ''}" data-sub="all">All Types</button>
              <button type="button" class="filter-btn-secondary ${this.activeSub === 'necklaces' ? 'active' : ''}" data-sub="necklaces">Necklaces</button>
              <button type="button" class="filter-btn-secondary ${this.activeSub === 'kadas' ? 'active' : ''}" data-sub="kadas">Kada's & Cuffs</button>
              <button type="button" class="filter-btn-secondary ${this.activeSub === 'earrings' ? 'active' : ''}" data-sub="earrings">Earrings</button>
              <button type="button" class="filter-btn-secondary ${this.activeSub === 'rings' ? 'active' : ''}" data-sub="rings">Finger Rings</button>
            </div>
          </div>
        `;

        tabs.onclick = e => {
          const primaryBtn = e.target.closest('[data-line]');
          const secondaryBtn = e.target.closest('[data-sub]');
          const url = new URL(location.href);

          if (primaryBtn) {
            const line = primaryBtn.dataset.line;
            if (line === 'all') url.searchParams.delete('line'); else url.searchParams.set('line', line);
          }
          if (secondaryBtn) {
            const sub = secondaryBtn.dataset.sub;
            if (sub === 'all') url.searchParams.delete('sub'); else url.searchParams.set('sub', sub);
          }

          history.replaceState({}, '', url);
          this.renderProductGridItems();
          this.renderProductGrid();
        };
      }
      this.renderProductGridItems();
    },
    renderProductGridItems() {
      const grid = $('#shop-grid');
      if (!grid) return;
      const products = this.getVisibleProducts();
      if (!products.length) {
        grid.innerHTML = '<p class="catalogue-message" role="status">No items match this specific selection. Please try adjusting your filters.</p>';
        return;
      }
      grid.innerHTML = products.map(product => this.productCard(product)).join('');
    },
    productCard(product) {
      const id = escapeHTML(product.id);
      const image = safeURL(product.image, { internal: true });
      const hover = safeURL(product.imageHover, { internal: true });
      const line = getMainLine(product);
      const label = line === 'traditional' ? 'Traditional Heritage' : 'Anti-Tarnish Luxury';
      const badge = product.bestseller ? '<span class="tag">Bestseller</span>' : product.newArrival ? '<span class="tag">New Arrival</span>' : '';
      const hoverMarkup = hover ? ( /\.mp4(?:$|\?)/i.test(hover) ? `<video class="hover-img" src="${escapeHTML(hover)}" muted playsinline preload="none" aria-hidden="true"></video>` : `<img class="hover-img" src="${escapeHTML(hover)}" alt="" loading="lazy">`) : '';
      
      return `<article class="product" data-product-id="${id}"><div class="media"><a href="product?id=${encodeURIComponent(product.id)}" aria-label="View ${escapeHTML(product.name)}"><img class="base-img" src="${escapeHTML(image)}" alt="${escapeHTML(product.name)}" loading="lazy" decoding="async" width="600" height="600">${hoverMarkup}</a>${badge}<div class="quickbar"><button type="button" data-action="view-product" data-id="${id}">View</button><button type="button" data-action="etsy-product" data-id="${id}">View on Etsy</button></div></div><div class="pinfo"><div class="pmeta">${escapeHTML(label)}</div><a class="pname" href="product?id=${encodeURIComponent(product.id)}">${escapeHTML(product.name)}</a><div class="price">${money(product.price)}</div></div></article>`;
    },
    renderProductDetail() {
      const id = new URLSearchParams(location.search).get('id');
      const product = this.products.find(item => item.id === String(id));
      if (!product) return;
      document.title = `${product.seoTitle || product.name + ' | LilAura UK'}`;
      const setText = (selector, value) => { const el = $(selector); if (el) el.textContent = value; };
      setText('#p-cat', product.category || 'Jewellery');
      setText('#p-sku', product.sku ? `SKU: ${product.sku}` : '');
      setText('#p-name', product.name);
      setText('#p-price', money(product.price));
      setText('#p-desc', product.desc || 'Discover this piece from the LilAura collection.');
      const image = $('#p-image');
      if (image) { image.src = safeURL(product.image, { internal: true }); image.alt = product.name; image.classList.add('active-img'); }
      const buy = $('#buy-btn');
      const etsy = safeEtsyURL(product.etsyLink);
      if (buy) {
        buy.textContent = 'View on Etsy';
        buy.disabled = !etsy || product.inStock === false;
        if (product.inStock === false) buy.textContent = 'Currently unavailable';
        buy.onclick = () => { if (etsy && product.inStock !== false) {
             window.LilAuraAnalytics?.trackOutboundEtsy?.({ type: 'product_listing', id: product.id, name: product.name });
             window.open(etsy, '_blank', 'noopener,noreferrer'); 
        }};
      }
    },
    addRecentlyViewed(id) {
      const ids = this.normaliseIds(readJSON(RECENT_KEY, [])).filter(existing => existing !== String(id));
      ids.unshift(String(id)); writeJSON(RECENT_KEY, ids.slice(0, 5));
    },
    renderRecent() {
      const grid = $('#recentGrid');
      if (!grid) return;
      const ids = this.normaliseIds(readJSON(RECENT_KEY, [])).filter(id => id !== new URLSearchParams(location.search).get('id'));
      const products = ids.map(id => this.products.find(p => p.id === id)).filter(Boolean).slice(0, 4);
      if (!products.length) { const section = $('#recent'); if (section) section.hidden = true; return; }
      grid.innerHTML = products.map(p => `<a class="recent-card" href="product?id=${encodeURIComponent(p.id)}"><img src="${escapeHTML(safeURL(p.image, { internal: true }))}" alt="${escapeHTML(p.name)}" loading="lazy"><p>${escapeHTML(p.name)}<br><span style="font-size:14px">${money(p.price)}</span></p></a>`).join('');
    },
    initAccordion() {
      document.addEventListener('click', event => {
        const title = event.target.closest('.accordion-title'); if (!title) return;
        const accordion = title.closest('.accordion'); if (!accordion) return;
        accordion.classList.toggle('active');
        const indicator = title.querySelector('span'); if (indicator) indicator.textContent = accordion.classList.contains('active') ? '−' : '+';
      });
    },
    initPromoTimer() {
      const update = () => {
        const rawEnd = this.catalog?.promoConfig?.endTime;
        if (!rawEnd) return;
        const endDate = new Date(rawEnd);
        const remaining = Math.max(0, endDate.getTime() - Date.now());
        const d = Math.floor(remaining / 86400000);
        const h = Math.floor(remaining / 3600000) % 24;
        const m = Math.floor(remaining / 60000) % 60;
        const s = Math.floor(remaining / 1000) % 60;
        
        const mini = $('#miniTimer'); 
        if (mini) {
          mini.textContent = remaining ? `${d > 0 ? d + 'd ' : ''}${String(h).padStart(2,'0')}h ${String(m).padStart(2,'0')}m ${String(s).padStart(2,'0')}s` : 'Offer ended';
        }
      };
      window.setInterval(update, 1000); update();
    },
    initScrollButton() {
      const scrollBtn = $('#lilaura-scroll-btn');
      if (!scrollBtn) return;
      let lastScrollY = window.scrollY;
      window.addEventListener('scroll', () => {
        const currentScrollY = window.scrollY;
        const pageHeight = document.documentElement.scrollHeight;
        if (currentScrollY > 300) {
            scrollBtn.classList.add('visible');
            if (currentScrollY < lastScrollY) { scrollBtn.innerHTML = '↑'; scrollBtn.onclick = () => window.scrollTo({ top: 0, behavior: 'smooth' }); }
            else { scrollBtn.innerHTML = '↓'; scrollBtn.onclick = () => window.scrollTo({ top: pageHeight, behavior: 'smooth' }); }
        } else { scrollBtn.classList.remove('visible'); }
        lastScrollY = currentScrollY;
      });
    }
  };

  document.addEventListener('click', event => {
    const button = event.target.closest('[data-action]'); if (!button) return;
    const id = button.dataset.id;
    switch (button.dataset.action) {
      case 'toggle-menu': $('#mega')?.classList.toggle('open'); break;
      case 'view-product': location.href = `product?id=${encodeURIComponent(id)}`; break;
      case 'etsy-product': { const product = Store.products.find(p => p.id === String(id)); const url = product && safeEtsyURL(product.etsyLink); if (url) window.open(url, '_blank', 'noopener,noreferrer'); break; }
    }
  });

  window.toggleMobileImage = () => {
    const main = $('#p-image'), alternate = $('#p-image-hover');
    if (!main || !alternate || !alternate.getAttribute('src')) return;
    main.classList.toggle('active-img');
    alternate.classList.toggle('active-img');
  };

  document.addEventListener('keydown', event => {
    if (event.key === 'Escape') { $('#mega')?.classList.remove('open'); }
  });

  document.addEventListener('DOMContentLoaded', () => Store.init());
  window.LilAuraStore = Store;
})();
```<br><br><br>To implement this strict 4-item limit in the admin panel and remove the filtering/sorting tabs from the homepage "Featured Pieces" section, we need to update **3 files**.

Here is how we are achieving this:
1. **`admin/index.html`**: We will inject a custom Decap CMS `preSave` validation script. If it detects more than 4 products marked with `featured: true`, it will instantly block you from saving and display an error message.
2. **`index.html`**: We will remove the `<div id="shopTabs"></div>` element from the homepage so the category filters completely disappear from the featured section.
3. **`script.js`**: We will add an absolute fallback guard limiting homepage rendering to exactly 4 items (`.slice(0, 4)`) just to be safe.

Here are the completely updated files to overwrite in your GitHub repository:

---

### 1. `admin/index.html`
*(Overwrite your `admin/index.html` file. Notice the new `CMS.registerEventListener` logic added just before the closing `</body>` tag.)*

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>LilAura Admin Panel</title>
  <link rel="icon" type="image/png" sizes="96x96" href="/favicon.png">
  <style>
    #token-modal {
      display: none;
      position: fixed;
      inset: 0;
      background: rgba(2, 58, 42, 0.6);
      backdrop-filter: blur(4px);
      z-index: 9999;
      align-items: center;
      justify-content: center;
      font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
    }
    .modal-box {
      background: #ffffff;
      padding: 32px;
      border-radius: 8px;
      max-width: 440px;
      width: 90%;
      box-shadow: 0 10px 25px rgba(0,0,0,0.15);
      text-align: center;
    }
    .modal-box h3 { margin: 0 0 12px 0; color: #1a1a1a; font-size: 20px; }
    .modal-box p { font-size: 13px; color: #666; line-height: 1.6; margin-bottom: 20px; }
    .modal-box input {
      width: 100%;
      padding: 12px;
      border: 1px solid #ddd;
      border-radius: 4px;
      margin-bottom: 16px;
      box-sizing: border-box;
      font-size: 14px;
      font-family: monospace;
    }
    .modal-box button {
      background: #023A2A;
      color: #fff;
      border: none;
      padding: 12px 24px;
      font-size: 12px;
      letter-spacing: 0.1em;
      text-transform: uppercase;
      border-radius: 4px;
      cursor: pointer;
      width: 100%;
    }
  </style>
</head>
<body>
  <div id="token-modal">
    <div class="modal-box">
      <h3>LilAura Admin Access</h3>
      <p>Enter your GitHub Personal Access Token (Classic token with <code>repo</code> scope) to access the store manager.</p>
      <input type="password" id="pat-input" placeholder="ghp_xxxxxxxxxxxxxxxxxxxx">
      <button onclick="saveToken()">Authenticate & Enter</button>
    </div>
  </div>

  <script>
    const STORAGE_KEY = 'decap-cms-user';
    const legacyKey = 'netlify-cms-user';
    let userSession = null;
    try {
      userSession = localStorage.getItem(STORAGE_KEY) || localStorage.getItem(legacyKey);
    } catch (e) {
      userSession = null;
    }

    if (!userSession) {
      document.addEventListener('DOMContentLoaded', () => {
        const modal = document.getElementById('token-modal');
        if (modal) modal.style.display = 'flex';
      });
    }

    function saveToken() {
      const token = document.getElementById('pat-input').value.trim();
      if (!token) {
        alert('Please paste a valid token.');
        return;
      }
      const payload = JSON.stringify({ token: token, backendName: 'github' });
      try {
        localStorage.setItem(STORAGE_KEY, payload);
        localStorage.setItem(legacyKey, payload);
      } catch (e) {
        console.error("Storage error:", e);
      }
      window.location.reload();
    }
  </script>

  <!-- Decap CMS Core Engine -->
  <script src="https://unpkg.com/decap-cms@^3.0.0/dist/decap-cms.js"></script>

  <!-- LILAURA APEX X™: Custom Validation Rules -->
  <script>
    CMS.registerEventListener({
      name: 'preSave',
      handler: ({ entry }) => {
        try {
          // Check if we are modifying the 'catalog' file
          if (entry.get('slug') === 'catalog') {
            const data = entry.get('data').toJS();
            if (data && data.items) {
              // Count how many products have the 'featured' toggle set to true
              const featuredCount = data.items.filter(item => item.featured === true).length;
              
              if (featuredCount > 4) {
                // Block the save and throw an error to the user
                return Promise.reject(new Error(`Validation Failed: You are not allowed to have more than 4 featured items. You currently have ${featuredCount} selected. Please uncheck some 'Featured on Homepage?' toggles before publishing.`));
              }
            }
          }
        } catch(e) {
          console.error(e);
        }
      }
    });
  </script>
</body>
</html>
