/* LilAura storefront behaviour with clean URL paths, promo timer with day/hour formatting, explicit featured-product curation, and dynamic scrolling navigation. */
(() => {
  'use strict';

  // 1. URL POLISH (Clean URL paths without .html in address bar)
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

  // Advanced Category Filter Matching (includes Anti-Tarnish grouping)
  const categoryFor = product => {
    const raw = String(product?.category || '').trim().toLowerCase();
    const name = String(product?.name || '').toLowerCase();
    if (raw.includes('traditional') || raw === 'traditional' || /palakka|jhumka|temple jewellery|kasu mala|heritage/.test(name)) return 'traditional';
    if (raw.includes('anti tarnish') || raw.includes('anti-tarnish')) return 'anti-tarnish';
    if (raw.includes('earring') || raw === 'earrings' || /earring|jhumka|studs?\b/.test(name)) return 'earrings';
    if (raw.includes('ring') || raw === 'finger rings' || /\bring\b/.test(name)) return 'rings';
    if (raw.includes('necklace') || raw === 'necklaces' || /necklace|choker|pendant/.test(name)) return 'necklaces';
    if (raw.includes('kada') || raw.includes('kadas') || raw.includes('cuff') || raw.includes('bracelet') || raw.includes('bangle') || /kada|cuff|bracelet|bangle/.test(name)) return 'kadas';
    return 'all';
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
    activeCategory: 'all',
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
        if (!this.products.length) this.showPageError('The catalogue is temporarily unavailable. Please try again later.');
      } catch (error) {
        console.error('[LilAura] Could not load product catalogue:', error);
        this.showPageError('We could not load the collection right now. Please refresh the page or visit our Etsy shop.');
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
      if (this.activeCategory !== 'all') {
        if (this.activeCategory === 'anti-tarnish') {
            items = items.filter(p => categoryFor(p) === 'anti-tarnish' || (p.category || '').toLowerCase().includes('anti-tarnish'));
        } else {
            items = items.filter(p => categoryFor(p) === this.activeCategory);
        }
      }
      return items;
    },
    renderProductGrid() {
      const grid = $('#shop-grid');
      if (!grid) return;
      this.activeCategory = new URLSearchParams(location.search).get('cat') || 'all';
      const validCategories = ['all', 'anti-tarnish', 'kadas', 'necklaces', 'traditional', 'earrings', 'rings'];
      if (!validCategories.includes(this.activeCategory)) this.activeCategory = 'all';
      const tabs = $('#shopTabs');
      if (tabs) {
        const labels = [['all','All Pieces'],['anti-tarnish','Everyday Anti-Tarnish'],['traditional','Traditional Heritage'],['necklaces','Necklaces'],['kadas','Kadas & Cuffs'],['earrings','Earrings'],['rings','Rings']];
        tabs.innerHTML = labels.map(([id, label]) => `<button type="button" class="tab ${this.activeCategory === id ? 'active' : ''}" data-category="${id}" aria-pressed="${this.activeCategory === id}">${label}</button>`).join('');
        tabs.addEventListener('click', event => {
          const button = event.target.closest('[data-category]');
          if (!button) return;
          const category = button.dataset.category;
          const url = new URL(location.href);
          if (category === 'all') url.searchParams.delete('cat'); else url.searchParams.set('cat', category);
          history.replaceState({}, '', url);
          this.activeCategory = category;
          $$('.tab', tabs).forEach(tab => { const active = tab.dataset.category === category; tab.classList.toggle('active', active); tab.setAttribute('aria-pressed', String(active)); });
          this.renderProductGridItems();
        });
      }
      this.renderProductGridItems();
    },
    renderProductGridItems() {
      const grid = $('#shop-grid');
      if (!grid) return;
      const products = this.getVisibleProducts();
      if (!products.length) {
        grid.innerHTML = '<p class="catalogue-message" role="status">No products are available in this category at the moment. Please choose another category.</p>';
        return;
      }
      grid.innerHTML = products.map(product => this.productCard(product)).join('');
    },
    productCard(product) {
      const id = escapeHTML(product.id);
      const image = safeURL(product.image, { internal: true });
      const hover = safeURL(product.imageHover, { internal: true });
      const category = categoryFor(product);
      const label = category === 'traditional' ? 'Traditional' : category === 'anti-tarnish' ? 'Anti-Tarnish' : category === 'kadas' ? 'Kadas & Cuffs' : category === 'necklaces' ? 'Necklaces' : category === 'rings' ? 'Rings' : category === 'earrings' ? 'Earrings' : 'Jewellery';
      const badge = product.bestseller ? '<span class="tag">Bestseller</span>' : product.newArrival ? '<span class="tag">New Arrival</span>' : '';
      const hoverMarkup = hover ? ( /\.mp4(?:$|\?)/i.test(hover) ? `<video class="hover-img" src="${escapeHTML(hover)}" muted playsinline preload="none" aria-hidden="true"></video>` : `<img class="hover-img" src="${escapeHTML(hover)}" alt="" loading="lazy">`) : '';
      return `<article class="product" data-product-id="${id}"><div class="media"><a href="product?id=${encodeURIComponent(product.id)}" aria-label="View ${escapeHTML(product.name)}"><img class="base-img" src="${escapeHTML(image)}" alt="${escapeHTML(product.name)}" loading="lazy" decoding="async" width="600" height="600">${hoverMarkup}</a>${badge}<button class="heart ${this.wishlist.includes(product.id) ? 'active' : ''}" type="button" data-action="wishlist" data-id="${id}" aria-label="${this.wishlist.includes(product.id) ? 'Remove from' : 'Add to'} wishlist: ${escapeHTML(product.name)}" aria-pressed="${this.wishlist.includes(product.id)}">♡</button><div class="quickbar"><button type="button" data-action="view-product" data-id="${id}">View</button><button type="button" data-action="etsy-product" data-id="${id}">View on Etsy</button></div></div><div class="pinfo"><div class="pmeta">${escapeHTML(label)}</div><a class="pname" href="product?id=${encodeURIComponent(product.id)}">${escapeHTML(product.name)}</a><div class="price">${money(product.price)}</div>${product.inStock === false ? '<div class="pmeta" style="margin-top:6px">Currently unavailable</div>' : ''}</div></article>`;
    },
    renderProductDetail() {
      const id = new URLSearchParams(location.search).get('id');
      const product = this.products.find(item => item.id === String(id));
      const container = $('#product-detail-container');
      if (!product) {
        if (container) container.innerHTML = '<div class="catalogue-message" role="status"><h1>Product not found</h1><p>This product link may be out of date.</p><a class="btn" href="shop">Return to the collection</a></div>';
        document.title = 'Product not found | LilAura';
        return;
      }
      document.title = `${product.seoTitle || product.name + ' | LilAura UK'}`;
      const setText = (selector, value) => { const element = $(selector); if (element) element.textContent = value; };
      setText('#p-cat', product.category || 'Jewellery');
      setText('#p-sku', product.sku ? `SKU: ${product.sku}` : '');
      setText('#p-name', product.name);
      setText('#p-price', money(product.price));
      setText('#p-desc', product.desc || 'Discover this piece from the LilAura collection.');
      const image = $('#p-image');
      if (image) { image.src = safeURL(product.image, { internal: true }); image.alt = product.name; image.classList.add('active-img'); image.onerror = () => { image.alt = `${product.name} image unavailable`; }; }
      const hover = $('#p-image-hover');
      const video = $('#p-video-hover');
      const hoverURL = safeURL(product.imageHover, { internal: true });
      if (hover && video) {
        hover.classList.remove('active-img'); hover.style.display = 'none'; video.classList.remove('active-img'); video.style.display = 'none';
        if (hoverURL && /\.mp4(?:$|\?)/i.test(hoverURL)) { video.src = hoverURL; video.style.display = 'block'; video.classList.add('gallery-alternate'); }
        else if (hoverURL) { hover.src = hoverURL; hover.alt = `${product.name} alternate view`; hover.style.display = 'block'; }
      }
      const material = $('#faq-mat-content');
      if (material) material.textContent = product.category && /traditional/i.test(product.category) ? 'Traditional jewellery. Please refer to the product listing for the exact materials, finish and care guidance.' : 'Please refer to the product listing for the exact materials, finish and care guidance for this item.';
      const buy = $('#buy-btn');
      const etsy = safeEtsyURL(product.etsyLink);
      if (buy) {
        buy.textContent = 'View on Etsy';
        buy.disabled = !etsy || product.inStock === false;
        if (product.inStock === false) buy.textContent = 'Currently unavailable';
        buy.addEventListener('click', () => { if (etsy && product.inStock !== false) { window.LilAuraAnalytics?.trackOutboundEtsy?.({ type: 'product_listing', id: product.id, name: product.name }); window.open(etsy, '_blank', 'noopener,noreferrer'); } });
      }
      this.addRecentlyViewed(product.id);
      window.currentLilAuraProduct = product;
      if (window.LilAuraAnalytics?.trackViewItem) window.LilAuraAnalytics.trackViewItem(product);
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
      const bubble = $('#cart-count'); if (bubble) bubble.textContent = String(count);
      const itemsEl = $('#cartItems');
      if (itemsEl) {
        if (!this.cart.length) itemsEl.innerHTML = '<p style="color:var(--muted);line-height:1.8">Your bag is empty. Explore the collection to find your next favourite piece.</p><a class="btn" href="shop">Explore the collection</a>';
        else itemsEl.innerHTML = this.cart.map(row => { const p = this.products.find(product => product.id === row.id); if (!p) return ''; return `<div class="cart-item"><img src="${escapeHTML(safeURL(p.image, { internal: true }))}" alt="${escapeHTML(p.name)}"><div style="flex:1"><h4>${escapeHTML(p.name)}</h4><small class="price-mod">${money(p.price)}</small><div style="display:flex;align-items:center;gap:10px;margin-top:12px"><button type="button" data-action="qty-minus" data-id="${escapeHTML(p.id)}" aria-label="Decrease quantity">−</button><span>${row.quantity}</span><button type="button" data-action="qty-plus" data-id="${escapeHTML(p.id)}" aria-label="Increase quantity" ${p.inStock === false ? 'disabled' : ''}>+</button><button type="button" data-action="remove-cart" data-id="${escapeHTML(p.id)}" style="margin-left:auto">Remove</button></div></div></div>`; }).join('');
      }
      const subtotal = this.cart.reduce((sum, row) => { const p = this.products.find(product => product.id === row.id); return sum + (p ? p.price * row.quantity : 0); }, 0);
      const total = $('#cart-subtotal'); if (total) total.textContent = money(subtotal);
      const checkout = $('[data-action="cart-checkout"]'); if (checkout) checkout.disabled = !this.cart.length;
    },
    openCart() { $('.overlay')?.classList.add('open'); $('#cart-drawer')?.classList.add('open'); document.body.classList.add('lock'); $('.close')?.focus(); },
    closeCart() { $('.overlay')?.classList.remove('open'); $('#cart-drawer')?.classList.remove('open'); document.body.classList.remove('lock'); $('[data-action="open-cart"]')?.focus(); },
    toggleWishlist(id) {
      const key = String(id); const exists = this.wishlist.includes(key);
      this.wishlist = exists ? this.wishlist.filter(item => item !== key) : [...this.wishlist, key];
      writeJSON(WISHLIST_KEY, this.wishlist); this.updateWishlistButtons();
      const product = this.products.find(p => p.id === key);
      if (!exists && product) window.LilAuraAnalytics?.trackAddToWishlist?.(product);
    },
    updateWishlistButtons() {
      $$('[data-action="wishlist"]').forEach(button => { const active = this.wishlist.includes(String(button.dataset.id)); button.classList.toggle('active', active); button.setAttribute('aria-pressed', String(active)); button.setAttribute('aria-label', `${active ? 'Remove from' : 'Add to'} wishlist: ${button.closest('.product')?.querySelector('.pname')?.textContent || 'product'}`); button.textContent = active ? '♥' : '♡'; });
    },
    showPageError(message) {
      const grid = $('#shop-grid');
      if (grid && !this.products.length) grid.innerHTML = `<p class="catalogue-message" role="alert">${escapeHTML(message)} <a href="https://www.etsy.com/uk/shop/LilauraElegance" target="_blank" rel="noopener noreferrer">Visit our Etsy shop</a>.</p>`;
      const container = $('#product-detail-container');
      if (container && !this.products.length) container.innerHTML = `<div class="catalogue-message" role="alert">${escapeHTML(message)} <a href="shop">Return to the collection</a>.</div>`;
    },
    initAccordion() {
      document.addEventListener('click', event => {
        const title = event.target.closest('.accordion-title'); if (!title) return;
        const accordion = title.closest('.accordion'); if (!accordion) return;
        accordion.classList.toggle('active');
        const indicator = title.querySelector('span'); if (indicator) indicator.textContent = accordion.classList.contains('active') ? '−' : '+';
        const content = $('.accordion-content', accordion); if (content) content.setAttribute('aria-hidden', String(!accordion.classList.contains('active')));
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
        
        const set = (selector, value) => { const el = $(selector); if (el) el.textContent = String(value).padStart(2, '0'); };
        set('#days', d); set('#hours', h); set('#mins', m); set('#secs', s);
        
        const mini = $('#miniTimer'); 
        if (mini) {
          mini.textContent = remaining ? `${d > 0 ? d + 'd ' : ''}${String(h).padStart(2,'0')}h ${String(m).padStart(2,'0')}m ${String(s).padStart(2,'0')}s` : 'Offer ended';
        }
        if (!remaining) $$('.announce, .promo-countdown').forEach(el => { if (el.querySelector('#miniTimer') || el.classList.contains('promo-countdown')) el.hidden = true; });
      };
      this._promoInterval = window.setInterval(update, 1000);
      const originalRender = this.renderCurrentPage.bind(this);
      this.renderCurrentPage = () => { originalRender(); update(); };
      update();
    },
    initNewsletterNotice() {
      const form = $('.news .form'); if (!form) return;
      form.addEventListener('submit', event => {
        event.preventDefault();
        let status = $('.newsletter-status', form.parentElement);
        if (!status) { status = document.createElement('p'); status.className = 'newsletter-status'; status.setAttribute('role', 'status'); form.insertAdjacentElement('afterend', status); }
        status.textContent = 'Newsletter sign-up is not connected yet. Please contact shop@lilaura.uk to hear about updates.';
      });
    },
    initScrollButton() {
      const scrollBtn = $('#lilaura-scroll-btn');
      if (!scrollBtn) return;
      
      let lastScrollY = window.scrollY;
      
      window.addEventListener('scroll', () => {
        const currentScrollY = window.scrollY;
        const pageHeight = document.documentElement.scrollHeight;
        const windowHeight = window.innerHeight;

        if (currentScrollY > 300) {
            scrollBtn.classList.add('visible');
            if (currentScrollY < lastScrollY) {
                // Scrolling up -> point UP to return to top
                scrollBtn.innerHTML = '↑';
                scrollBtn.onclick = () => window.scrollTo({ top: 0, behavior: 'smooth' });
            } else {
                // Scrolling down -> point DOWN to jump to footer
                scrollBtn.innerHTML = '↓';
                scrollBtn.onclick = () => window.scrollTo({ top: pageHeight, behavior: 'smooth' });
            }
        } else {
            scrollBtn.classList.remove('visible');
        }
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
      case 'toggle-menu': { const menu = $('#lilaura-menu'); const open = menu?.classList.toggle('open'); button.setAttribute('aria-expanded', String(Boolean(open))); break; }
      case 'wishlist': event.preventDefault(); event.stopPropagation(); Store.toggleWishlist(id); break;
      case 'view-product': location.href = `product?id=${encodeURIComponent(id)}`; break;
      case 'etsy-product': { const product = Store.products.find(p => p.id === String(id)); const url = product && safeEtsyURL(product.etsyLink); if (url) { window.LilAuraAnalytics?.trackOutboundEtsy?.({ type: 'product_listing', id: product.id, name: product.name }); window.open(url, '_blank', 'noopener,noreferrer'); } break; }
      case 'add-cart': Store.addToCart(id); break;
      case 'qty-minus': Store.changeQuantity(id, -1); break;
      case 'qty-plus': Store.changeQuantity(id, 1); break;
      case 'remove-cart': Store.removeCartItem(id); break;
      case 'cart-checkout': window.open('https://www.etsy.com/uk/shop/LilauraElegance', '_blank', 'noopener,noreferrer'); break;
    }
  });

  window.toggleMobileImage = () => {
    const main = $('#p-image'), alternate = $('#p-image-hover'), video = $('#p-video-hover');
    const candidates = [main, alternate, video].filter(el => el && (el.getAttribute('src') || '') && el.style.display !== 'none');
    if (candidates.length < 2) return;
    const current = candidates.find(el => el.classList.contains('active-img')) || candidates[0];
    const next = candidates[(candidates.indexOf(current) + 1) % candidates.length];
    candidates.forEach(el => el.classList.toggle('active-img', el === next));
    const indicator = $('#photoIndicator'); if (indicator) indicator.textContent = `${candidates.indexOf(next) + 1} / ${candidates.length} (Tap to view detail)`;
  };

  document.addEventListener('keydown', event => {
    if (event.key === 'Escape') { Store.closeCart(); $('#lilaura-menu')?.classList.remove('open'); $('[data-action="toggle-menu"]')?.setAttribute('aria-expanded', 'false'); }
  });

  document.addEventListener('DOMContentLoaded', () => Store.init());
  window.LilAuraStore = Store;
  window.LilAuraAnalytics = window.LilAuraAnalytics || LilAuraAnalytics;
})();
