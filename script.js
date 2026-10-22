/* LilAura storefront behaviour with dual-tier filtering, clean URL paths, and promo timer. */
(() => {
  'use strict';

  if (window.location.pathname.endsWith('.html') && window.location.pathname !== '/index.html') {
    window.history.replaceState(null, '', window.location.pathname.replace(/\.html$/, '') + window.location.search);
  } else if (window.location.pathname === '/index.html') {
    window.history.replaceState(null, '', '/');
  }

  const CATALOG_URL = 'products.json';
  const CART_KEY = 'lilauraCart';
  const WISHLIST_KEY = 'lilauraWish';
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
    static trackOutboundEtsy(context = {}) {
      this.trackEvent('click_outbound_etsy', { destination_type: context.type || 'product_listing', item_id: String(context.id || 'general_shop'), item_name: context.name || 'Etsy Store' });
    }
    static trackAddToWishlist(product) {
      if (!product) return;
      this.trackEvent('add_to_wishlist', { currency: 'GBP', value: Number(product.price) || 0, items: [{ item_id: String(product.id || product.sku || ''), item_name: product.name, price: Number(product.price) || 0 }] });
    }
  }
  window.LilAuraAnalytics = LilAuraAnalytics;

  const Store = {
    catalog: null,
    products: [],
    cart: [],
    wishlist: [],
    activeLine: 'all',
    activeSub: 'all',
    isHome: false,
    async init() {
      this.cart = this.normaliseCart(readJSON(CART_KEY, []));
      this.wishlist = this.normaliseIds(readJSON(WISHLIST_KEY, []));
      this.initAccordion();
      this.initPromoTimer();
      this.initNewsletterNotice();
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
        this.cart = this.cart.filter(row => this.products.some(p => p.id === row.id));
        this.saveCart();
        this.renderCurrentPage();
        this.updateCartUI();
      } catch (error) {
        console.error('[LilAura] Could not load product catalogue:', error);
      }
    },
    normaliseIds(value) {
      if (!Array.isArray(value)) return [];
      return [...new Set(value.map(v => String(typeof v === 'object' && v ? v.id : v)).filter(v => v && v !== 'undefined'))];
    },
    normaliseCart(value) {
      if (!Array.isArray(value)) return [];
      const rows = new Map();
      value.forEach(row => {
        if (!row || row.id == null) return;
        const id = String(row.id);
        const quantity = Math.max(1, Math.min(99, Math.floor(Number(row.quantity || row.qty) || 1)));
        rows.set(id, { id, quantity: Math.min(99, (rows.get(id)?.quantity || 0) + quantity) });
      });
      return [...rows.values()];
    },
    renderCurrentPage() {
      const path = window.location.pathname.toLowerCase();
      this.isHome = path.endsWith('/') || path.endsWith('/index') || path.endsWith('/index.html');
      if ($('#shop-grid')) this.renderProductGrid();
      if ($('#p-name')) this.renderProductDetail();
      if ($('#recentGrid')) this.renderRecent();
      this.updateWishlistButtons();
    },
    getVisibleProducts() {
      let items = [...this.products];
      if (this.isHome) {
        const explicitFeatured = items.filter(p => p.featured === true);
        items = explicitFeatured.length > 0 ? explicitFeatured : items.slice(0, 8);
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
      return `<article class="product" data-product-id="${id}"><div class="media"><a href="product?id=${encodeURIComponent(product.id)}" aria-label="View ${escapeHTML(product.name)}"><img class="base-img" src="${escapeHTML(image)}" alt="${escapeHTML(product.name)}" loading="lazy" decoding="async" width="600" height="600">${hoverMarkup}</a>${badge}<button class="heart ${this.wishlist.includes(product.id) ? 'active' : ''}" type="button" data-action="wishlist" data-id="${id}" aria-label="Wishlist" aria-pressed="${this.wishlist.includes(product.id)}">♡</button><div class="quickbar"><button type="button" data-action="view-product" data-id="${id}">View</button><button type="button" data-action="etsy-product" data-id="${id}">View on Etsy</button></div></div><div class="pinfo"><div class="pmeta">${escapeHTML(label)}</div><a class="pname" href="product?id=${encodeURIComponent(product.id)}">${escapeHTML(product.name)}</a><div class="price">${money(product.price)}</div></div></article>`;
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
        buy.onclick = () => { if (etsy && product.inStock !== false) window.open(etsy, '_blank', 'noopener,noreferrer'); };
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
    addToCart(id) {
      const product = this.products.find(p => p.id === String(id));
      if (!product || product.inStock === false) return;
      const row = this.cart.find(item => item.id === product.id);
      if (row) row.quantity = Math.min(99, row.quantity + 1); else this.cart.push({ id: product.id, quantity: 1 });
      this.saveCart(); this.updateCartUI(); this.openCart();
    },
    changeQuantity(id, delta) {
      const row = this.cart.find(item => item.id === String(id));
      if (!row) return;
      row.quantity += delta;
      if (row.quantity <= 0) this.cart = this.cart.filter(item => item.id !== row.id);
      else row.quantity = Math.min(99, row.quantity);
      this.saveCart(); this.updateCartUI();
    },
    removeCartItem(id) { this.cart = this.cart.filter(item => item.id !== String(id)); this.saveCart(); this.updateCartUI(); },
    saveCart() { writeJSON(CART_KEY, this.cart); },
    updateCartUI() {
      const count = this.cart.reduce((sum, row) => sum + row.quantity, 0);
      const bubble = $('#cartCount'); if (bubble) bubble.textContent = String(count);
      const itemsEl = $('#cartItems');
      if (itemsEl) {
        if (!this.cart.length) itemsEl.innerHTML = '<p style="color:var(--muted);line-height:1.8">Your bag is empty. Explore the collection to find your next favourite piece.</p><a class="btn" href="shop">Explore the collection</a>';
        else itemsEl.innerHTML = this.cart.map(row => { const p = this.products.find(product => product.id === row.id); if (!p) return ''; return `<div class="cart-item"><img src="${escapeHTML(safeURL(p.image, { internal: true }))}" alt="${escapeHTML(p.name)}"><div style="flex:1"><h4>${escapeHTML(p.name)}</h4><small class="price-mod">${money(p.price)}</small><div style="display:flex;align-items:center;gap:10px;margin-top:12px"><button type="button" data-action="qty-minus" data-id="${escapeHTML(p.id)}">−</button><span>${row.quantity}</span><button type="button" data-action="qty-plus" data-id="${escapeHTML(p.id)}">+</button><button type="button" data-action="remove-cart" data-id="${escapeHTML(p.id)}" style="margin-left:auto">Remove</button></div></div></div>`; }).join('');
      }
      const subtotal = this.cart.reduce((sum, row) => { const p = this.products.find(product => product.id === row.id); return sum + (p ? p.price * row.quantity : 0); }, 0);
      const total = $('#cart-subtotal'); if (total) total.textContent = money(subtotal);
    },
    openCart() { $('#overlay')?.classList.add('open'); $('#drawer')?.classList.add('open'); document.body.classList.add('lock'); },
    closeCart() { $('#overlay')?.classList.remove('open'); $('#drawer')?.classList.remove('open'); document.body.classList.remove('lock'); },
    toggleWishlist(id) {
      const key = String(id); const exists = this.wishlist.includes(key);
      this.wishlist = exists ? this.wishlist.filter(item => item !== key) : [...this.wishlist, key];
      writeJSON(WISHLIST_KEY, this.wishlist); this.updateWishlistButtons();
    },
    updateWishlistButtons() {
      $$('[data-action="wishlist"]').forEach(button => { const active = this.wishlist.includes(String(button.dataset.id)); button.classList.toggle('active', active); button.textContent = active ? '♥' : '♡'; });
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
    initNewsletterNotice() {
      const form = $('.news .form'); if (!form) return;
      form.addEventListener('submit', event => {
        event.preventDefault();
        alert('Thank you for subscribing to LilAura UK.');
      });
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
      case 'open-cart': Store.openCart(); break;
      case 'close-cart': Store.closeCart(); break;
      case 'toggle-menu': $('#mega')?.classList.toggle('open'); break;
      case 'wishlist': event.preventDefault(); event.stopPropagation(); Store.toggleWishlist(id); break;
      case 'view-product': location.href = `product?id=${encodeURIComponent(id)}`; break;
      case 'etsy-product': { const product = Store.products.find(p => p.id === String(id)); const url = product && safeEtsyURL(product.etsyLink); if (url) window.open(url, '_blank', 'noopener,noreferrer'); break; }
      case 'add-cart': Store.addToCart(id); break;
      case 'qty-minus': Store.changeQuantity(id, -1); break;
      case 'qty-plus': Store.changeQuantity(id, 1); break;
      case 'remove-cart': Store.removeCartItem(id); break;
      case 'cart-checkout': window.open('https://www.etsy.com/uk/shop/LilauraElegance', '_blank', 'noopener,noreferrer'); break;
    }
  });

  window.toggleMobileImage = () => {
    const main = $('#p-image'), alternate = $('#p-image-hover');
    if (!main || !alternate || !alternate.getAttribute('src')) return;
    main.classList.toggle('active-img');
    alternate.classList.toggle('active-img');
  };

  document.addEventListener('keydown', event => {
    if (event.key === 'Escape') { Store.closeCart(); $('#mega')?.classList.remove('open'); }
  });

  document.addEventListener('DOMContentLoaded', () => Store.init());
  window.LilAuraStore = Store;
})();
