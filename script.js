/* LilAura storefront behaviour with dual-tier filtering, backward compatibility routing, pinned products, and promo timer. */
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

  // SMART CATEGORIZATION: Determine Main Line (Anti-Tarnish vs Traditional Heritage)
  const getMainLine = product => {
    const ml = String(product?.mainLine || '').toLowerCase();
    const cat = String(product?.category || '').toLowerCase();
    const name = String(product?.name || '').toLowerCase();
    
    if (ml === 'traditional') return 'traditional';
    if (ml === 'anti-tarnish') return 'anti-tarnish';
    
    // Safety Net: If CMS fields are empty, read the title/category for clues
    if (cat.includes('traditional') || /palakka|jhumka|temple|kasu mala|heritage|brass|lakshmi|nagas|haram|ghungroo|meenakari/.test(name)) {
      return 'traditional';
    }
    return 'anti-tarnish';
  };

  // SMART CATEGORIZATION: Determine Sub-Category
  const getSubCategory = product => {
    const sc = String(product?.subCategory || '').toLowerCase();
    const cat = String(product?.category || '').toLowerCase();
    const name = String(product?.name || '').toLowerCase();
    
    if (sc === 'necklaces' || cat.includes('necklace') || /necklace|choker|pendant|haram|mala/.test(name)) return 'necklaces';
    if (sc === 'kadas' || cat.includes('kada') || cat.includes('cuff') || /kada|cuff|bangle|bracelet/.test(name)) return 'kadas';
    if (sc === 'earrings' || cat.includes('earring') || /earring|jhumka|stud/.test(name)) return 'earrings';
    if (sc === 'rings' || cat.includes('ring') || /\bring\b/.test(name)) return 'rings';
    
    return 'necklaces'; // Default fallback
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
        
        let rawItems = [];
        if (Array.isArray(data)) rawItems = data;
        else if (data && Array.isArray(data.items)) rawItems = data.items;
        else rawItems = [];

        const seenIds = new Set();
        this.products = rawItems.filter(item => {
          const valid = item && (typeof item.id === 'string' || Number.isFinite(Number(item.id))) && String(item.name || '').trim() && Number.isFinite(Number(item.price)) && Number(item.price) >= 0;
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
    renderCurrentPage() {
      const path = window.location.pathname.toLowerCase();
      this.isHome = path.endsWith('/') || path.endsWith('/index') || path.endsWith('/index.html');
      if ($('#shop-grid')) this.renderProductGrid();
      if ($('#p-name')) this.renderProductDetail();
      if ($('#recentGrid')) this.renderRecent();
    },

    // BACKWARD COMPATIBILITY: Map old '?cat=' links cleanly to '?line=' or '?sub='
    parseFilters() {
      const params = new URLSearchParams(location.search);
      let line = params.get('line');
      let sub = params.get('sub');
      let cat = params.get('cat');

      if (cat) {
        if (cat === 'anti-tarnish' || cat === 'traditional') {
          line = cat;
        } else if (cat !== 'all') {
          sub = cat;
        }
      }

      this.activeLine = line || 'all';
      this.activeSub = sub || 'all';
    },

    getVisibleProducts() {
      let items = [...this.products];
      
      // Strict guard to guarantee a maximum of 4 featured items on homepage
      if (this.isHome) {
        const explicitFeatured = items.filter(p => p.featured === true);
        return explicitFeatured.length > 0 ? explicitFeatured.slice(0, 4) : items.slice(0, 4);
      }
      
      this.parseFilters();

      // Apply Dual-Tier Filtering
      if (this.activeLine !== 'all') {
        items = items.filter(p => getMainLine(p) === this.activeLine);
      }
      if (this.activeSub !== 'all') {
        items = items.filter(p => getSubCategory(p) === this.activeSub);
      }

      // PINNED PRODUCTS LOGIC: Sort IDs 18, 19, 20, 21, 22 to the bottom of the grid
      const bottomIds = ['18', '19', '20', '21', '22'];
      const regularItems = items.filter(p => !bottomIds.includes(String(p.id)));
      const pinnedItems = items.filter(p => bottomIds.includes(String(p.id)));
      
      return [...regularItems, ...pinnedItems];
    },

    renderProductGrid() {
      const grid = $('#shop-grid');
      if (!grid) return;
      
      this.parseFilters();

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

          // Strip old '?cat=' parameter when using new UI filters
          url.searchParams.delete('cat');

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
        grid.innerHTML = '<p class="catalogue-message" role="status" style="grid-column: 1 / -1; text-align: center; color: var(--muted); padding: 40px 0;">No items match this specific selection. Please try adjusting your filters.</p>';
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
      
      const line = getMainLine(product);
      const formattedLine = line === 'traditional' ? 'Traditional Heritage' : 'Anti-Tarnish Luxury';
      
      setText('#p-cat', formattedLine);
      setText('#p-sku', product.sku ? `SKU: ${product.sku}` : `SKU: LA-${product.id}`);
      setText('#p-name', product.name);
      setText('#p-price', money(product.price));
      setText('#p-desc', product.desc || 'Discover this piece from the LilAura collection. Designed for modern elegance and timeless appeal.');
      
      const image = $('#p-image');
      const imageHover = $('#p-image-hover');
      const hint = $('#gallery-hint');
      
      if (image) { 
        image.src = safeURL(product.image, { internal: true }); 
        image.alt = product.name; 
        image.classList.add('active-img'); 
      }
      
      if (imageHover && product.imageHover) {
        imageHover.src = safeURL(product.imageHover, { internal: true });
        imageHover.alt = product.name + " Alternate View";
        if (hint) hint.style.display = 'block';
      } else {
        if (imageHover) imageHover.style.display = 'none';
        if (hint) hint.style.display = 'none';
      }

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
      this.addRecentlyViewed(product.id);
    },

    addRecentlyViewed(id) {
      const ids = this.normaliseIds(readJSON(RECENT_KEY, [])).filter(existing => existing !== String(id));
      ids.unshift(String(id)); writeJSON(RECENT_KEY, ids.slice(0, 4));
    },

    renderRecent() {
      const grid = $('#recentGrid');
      if (!grid) return;
      const ids = this.normaliseIds(readJSON(RECENT_KEY, [])).filter(id => id !== new URLSearchParams(location.search).get('id'));
      const products = ids.map(id => this.products.find(p => p.id === id)).filter(Boolean).slice(0, 4);
      
      if (!products.length) { 
          const section = $('.recent-section'); 
          if (section) section.style.display = 'none'; 
          return; 
      }
      
      grid.innerHTML = products.map(p => `<a class="recent-card" href="product?id=${encodeURIComponent(p.id)}"><div style="overflow:hidden; border-radius:2px;"><img src="${escapeHTML(safeURL(p.image, { internal: true }))}" alt="${escapeHTML(p.name)}" loading="lazy"></div><p>${escapeHTML(p.name)}<br><span>${money(p.price)}</span></p></a>`).join('');
    },

    initAccordion() {
      document.addEventListener('click', event => {
        const title = event.target.closest('.accordion-title'); if (!title) return;
        const accordion = title.closest('.accordion'); if (!accordion) return;
        
        accordion.classList.toggle('active');
        
        const indicator = title.querySelector('.indicator'); 
        if (indicator) {
            indicator.textContent = accordion.classList.contains('active') ? '−' : '+';
        }
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
    if (!main || !alternate || alternate.style.display === 'none') return;
    main.classList.toggle('active-img');
    alternate.classList.toggle('active-img');
  };

  document.addEventListener('keydown', event => {
    if (event.key === 'Escape') { $('#mega')?.classList.remove('open'); }
  });

  document.addEventListener('DOMContentLoaded', () => Store.init());
  window.LilAuraStore = Store;
})();
