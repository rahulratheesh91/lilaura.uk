/* LILAURA APEX X™ HARDENED PRODUCTION ENGINE (Dynamic Catalog, GA4 & Security) */

// 1. URL POLISH
if (window.location.pathname.endsWith('.html') && window.location.pathname !== '/index.html') {
    window.history.replaceState(null, '', window.location.pathname.replace(/\.html$/, '') + window.location.search);
} else if (window.location.pathname === '/index.html') {
    window.history.replaceState(null, '', '/');
}

// 2. DYNAMIC CATALOG STORAGE
let products = [];
let categories = [];
let promoConfig = { enabled: false, title: "", discountText: "", endTime: "" };

// 3. CART, WISHLIST & UI LOGIC
const $= s => document.querySelector(s),$$ = s => document.querySelectorAll(s);

// Defensive LocalStorage parsing with error recovery
let cart = [];
let wishes = [];
try {
    cart = JSON.parse(localStorage.getItem('lilauraCart') || '[]');
    if (!Array.isArray(cart)) cart = [];
} catch (e) {
    console.warn("Corrupted cart storage reset:", e);
    cart = [];
}

try {
    wishes = JSON.parse(localStorage.getItem('lilauraWish') || '[]');
    if (!Array.isArray(wishes)) wishes = [];
} catch (e) {
    console.warn("Corrupted wishlist storage reset:", e);
    wishes = [];
}

// XSS Sanitization Utility
function escapeHtml(str) {
    if (!str) return '';
    return String(str)
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;')
        .replace(/'/g, '&#039;');
}

function toast(m) {
    let t = $('#toast'); if(!t) return;
    t.textContent = m; t.classList.add('show');
    setTimeout(() => t.classList.remove('show'), 2000);
}

function renderRecent(){
    let r = [];
    try {
        r = JSON.parse(localStorage.getItem('lilauraRecent') || '[]');
    } catch (e) { r = []; }
    
    if(!r.length) return;
    const recentSection = $('#recent');
    const recentGrid = $('#recentGrid');
    
    if (recentSection && recentGrid) {
        recentSection.classList.add('show');
        recentGrid.innerHTML = r.map(x => `
        <div class="recent-card" onclick="trackRecentClick(${x.id}, '${escapeHtml(x.name).replace(/'/g, "\\'")}'); window.location.href='product.html?id=${x.id}'">
            <img src="${escapeHtml(x.img)}" alt="${escapeHtml(x.name)}">
            <p>${escapeHtml(x.name)}<br><small style="font-family:'Bodoni Moda', serif; font-size:15px; color:var(--gold); letter-spacing:0.05em;">£${(+x.price).toFixed(2)}</small></p>
        </div>`).join('');
    }
}

function trackRecentClick(id, name) {
    if (typeof gtag === 'function') {
        gtag('event', 'select_item_recent', { item_id: id, item_name: name });
    }
}

function saveCart() {
    try {
        localStorage.setItem('lilauraCart', JSON.stringify(cart));
        localStorage.setItem('lilauraWish', JSON.stringify(wishes));
    } catch (e) {
        console.error("Failed writing to localStorage:", e);
    }
    renderCart();
    const countEl = $('#cartCount');
    if(countEl) countEl.textContent = cart.reduce((a, x) => a + (x.qty || 1), 0);
}

function renderCart() {
    let box = $('#cartItems'), bottom = $('#cartBottom');
    if(!box || !bottom) return;
    
    if(!cart.length){
        box.innerHTML = `<div class="cart-empty" style="text-align:center; padding:40px 0; color:var(--muted);">Your bag is waiting.<br><br><a class="under" href="shop.html" onclick="closeDrawer()">Discover the edit</a></div>`;
        bottom.innerHTML = ''; return;
    }
    
    box.innerHTML = cart.map((x, i) => `
        <div class="cart-item">
            <img src="${escapeHtml(x.img)}" alt="${escapeHtml(x.name)}">
            <div style="flex:1">
                <h4>${escapeHtml(x.name)}</h4>
                <small class="price-mod">£${(+x.price).toFixed(2)}</small><small style="letter-spacing:0.1em; color:var(--gold); text-transform:uppercase; margin-left:8px">· Qty ${x.qty || 1}</small><br>
                <button aria-label="Remove item" onclick="removeItem(${i})" style="border:0;background:none;padding:12px 0 0;text-decoration:underline;font-size:10px; color:var(--muted); cursor:pointer; transition:color 0.3s;" onmouseover="this.style.color='var(--ink)'" onmouseout="this.style.color='var(--muted)'">Remove Item</button>
            </div>
        </div>`).join('');
        
    let total = cart.reduce((a, x) => a + (x.price * (x.qty || 1)), 0);
    
    let checkoutLink = 'https://www.etsy.com/uk/shop/LilauraElegance';
    let singleProductName = "Multiple Items / General Shop";
    
    if (cart.length === 1) {
        const matchedProduct = products.find(p => p.id === cart[0].id || p.name === cart[0].name);
        if (matchedProduct && matchedProduct.etsyLink) {
            checkoutLink = matchedProduct.etsyLink;
            singleProductName = matchedProduct.name;
        }
    }

    bottom.innerHTML = `
        <div class="cart-total"><span>Total</span><span class="price-mod">£${total.toFixed(2)}</span></div>
        <button class="checkout" onclick="trackEtsyCheckout('${escapeHtml(singleProductName).replace(/'/g, "\\'")}', ${total}); window.open('${checkoutLink}', '_blank')">Checkout securely on Etsy</button>
        <button onclick="clearCart()" style="width:100%; border:0; background:none; padding:20px 0 0; font-family:'Proza Libre', sans-serif; font-size:9px; letter-spacing:0.15em; text-transform:uppercase; color:var(--muted); cursor:pointer; text-decoration:underline; transition:color 0.3s;" onmouseover="this.style.color='var(--ink)'" onmouseout="this.style.color='var(--muted)'">Empty Bag</button>`;
}

function trackEtsyCheckout(productName, totalValue) {
    if (typeof gtag === 'function') {
        gtag('event', 'click_etsy_checkout', {
            currency: 'GBP',
            value: totalValue,
            item_name: productName
        });
    }
}

function removeItem(i) { 
    const removed = cart[i];
    if (removed && typeof gtag === 'function') {
        gtag('event', 'remove_from_cart', {
            currency: 'GBP',
            value: removed.price * (removed.qty || 1),
            items: [{ item_id: removed.sku || removed.id, item_name: removed.name, price: removed.price, quantity: removed.qty || 1 }]
        });
    }
    cart.splice(i, 1); 
    saveCart(); 
    toast('Item removed from bag'); 
}

function clearCart() {
    if (confirm("Are you sure you want to empty your bag?")) {
        if (typeof gtag === 'function') {
            gtag('event', 'clear_cart');
        }
        cart = [];
        saveCart();
        toast('Bag has been emptied');
    }
}

function openDrawer() { 
    $('#drawer')?.classList.add('open'); 
    $('#overlay')?.classList.add('open'); 
    document.body.classList.add('lock'); 
    if (typeof gtag === 'function') {
        gtag('event', 'open_cart_drawer');
    }
}

function closeDrawer() { $('#drawer')?.classList.remove('open'); $('#overlay')?.classList.remove('open'); document.body.classList.remove('lock'); }

function addToCart(id) {
    const p = products.find(x => x.id === id); 
    if(!p) return;
    
    // Out-of-stock guard
    if(!p.inStock) {
        toast(p.name + ' is currently sold out.');
        return;
    }

    let item = cart.find(x => x.id === p.id || x.name === p.name);
    if(item) {
        item.qty = (item.qty || 1) + 1;
    } else {
        cart.push({ id: p.id, sku: p.sku, name: p.name, price: p.price, img: p.image, qty: 1 });
    }
    saveCart(); 
    
    // GA4 Add to Cart Tracking
    if (typeof gtag === 'function') {
        gtag('event', 'add_to_cart', {
            currency: 'GBP',
            value: p.price,
            items: [{ item_id: p.sku || p.id, item_name: p.name, price: p.price, quantity: 1 }]
        });
    }

    toast(p.name + ' added to bag'); 
    openDrawer();
}

function toggleWish(event, id) {
    event.stopPropagation(); 
    const p = products.find(x => x.id === id); 
    if(!p) return;
    
    if(wishes.includes(p.name)) { 
        wishes = wishes.filter(x => x !== p.name); 
        toast('Removed from wishlist'); 
        event.target.classList.remove('active'); 
        if (typeof gtag === 'function') gtag('event', 'remove_from_wishlist', { item_name: p.name });
    } else { 
        wishes.push(p.name); 
        toast('Added to wishlist'); 
        event.target.classList.add('active'); 
        if (typeof gtag === 'function') gtag('event', 'add_to_wishlist', { item_name: p.name });
    }
    saveCart();
}

// 4. ASYNC INITIALIZATION & PROMO RENDERING
async function initStore() {
    try {
        const response = await fetch('/products.json');
        const data = await response.json();
        products = data.items || [];
        categories = data.categories || [];
        promoConfig = data.promoConfig || { enabled: false };

        renderPromoBanner(promoConfig);
        renderCategoryTabs(); 
    } catch (e) {
        console.error("Failed loading products.json:", e);
    }

    const shopGrid = document.getElementById('shop-grid');
    if (shopGrid) {
        const params = new URLSearchParams(window.location.search);
        const catParam = params.get('cat');
        if (catParam) {
            filterProducts(catParam.toLowerCase());
        } else {
            renderShop(products);
        }
    }

    const detailContainer = document.getElementById('product-detail-container');
    if (detailContainer) {
        const params = new URLSearchParams(window.location.search);
        const p = products.find(x => x.id === parseInt(params.get('id'))) || products[0];
        if (p) {
            renderDetail(p);
            if (typeof gtag === 'function') {
                gtag('event', 'view_item', {
                    currency: 'GBP',
                    value: p.price,
                    items: [{ item_id: p.sku || p.id, item_name: p.name, price: p.price }]
                });
            }
        }
    }

    renderRecent();
}

function renderPromoBanner(config) {
    const announceBar = document.querySelector('.announce');
    if (!announceBar) return;

    if (!config.enabled || (config.endTime && new Date(config.endTime).getTime() < Date.now())) {
        announceBar.style.display = 'none';
        return;
    }

    announceBar.style.display = 'block';
    announceBar.innerHTML = `${escapeHtml(config.title || '')} · <b>${escapeHtml(config.discountText || '')}</b> · Ends in <span id="miniTimer">--:--:--</span>`;
}

document.addEventListener('DOMContentLoaded', () => {
    if($('#cartBtn')) $('#cartBtn').onclick = openDrawer;
    if($('#closeDrawer')) $('#closeDrawer').onclick = closeDrawer;
    if($('#overlay')) $('#overlay').onclick = closeDrawer;
    if($('#menuBtn')) $('#menuBtn').onclick = () => $('#mega').classList.toggle('open');
    saveCart();

    initStore();
    
    setInterval(updateTimer, 1000); 
    updateTimer();
});

function renderShop(items) {
    const container = document.getElementById('shop-grid');
    if (!container) return;
    if (!items.length) { container.innerHTML = `<div style="grid-column:1/-1; text-align:center; padding:50px 0;">No items found.</div>`; return; }

    container.innerHTML = items.map(p => {
        const isVid = p.imageHover && p.imageHover.endsWith('.mp4');
        const hoverHTML = isVid ? `<video src="${escapeHtml(p.imageHover)}" autoplay loop muted class="hover-visual"></video>` : `<img src="${escapeHtml(p.imageHover || p.image)}" class="hover-img" alt="${escapeHtml(p.name)} hover">`;
        
        let badgeHTML = '';
        if (!p.inStock) {
            badgeHTML = `<span class="tag" style="background:var(--ink); color:var(--white);">Sold Out</span>`;
        } else if (p.bestseller) {
            badgeHTML = `<span class="tag" style="background:var(--gold); color:var(--white);">Best Seller</span>`;
        } else if (p.newArrival) {
            badgeHTML = `<span class="tag" style="background:var(--emerald); color:var(--white);">New Arrival</span>`;
        }

        const activeWish = wishes.includes(p.name) ? 'active' : '';

        return `
        <article class="product" onclick="window.location.href='product.html?id=${p.id}'">
            <div class="media">
                ${badgeHTML}
                <button class="heart ${activeWish}" aria-label="Add to wishlist" onclick="toggleWish(event, ${p.id})">♡</button>
                <img src="${escapeHtml(p.image)}" class="base-img" loading="lazy" alt="${escapeHtml(p.name)}">
                ${hoverHTML}
                <div class="quickbar">
                    <button class="quick" onclick="event.stopPropagation(); window.location.href='product.html?id=${p.id}'">Quick view</button>
                    <button class="add" onclick="event.stopPropagation(); addToCart(${p.id})">Add to bag</button>
                </div>
            </div>
            <div class="pinfo">
                <div class="pmeta">${escapeHtml(p.category)}</div>
                <div class="pname">${escapeHtml(p.name)}</div>
                <div class="price">£${(+p.price).toFixed(2)}</div>
            </div>
        </article>`;
    }).join('');
}

// 5. MOBILE IMAGE GALLERY TOGGLE STATE
let currentMobileImageIndex = 0;

function toggleMobileImage() {
    if (window.innerWidth > 900) return;

    const mainImg = document.getElementById('p-image');
    const hoverImg = document.getElementById('p-image-hover');
    const videoHover = document.getElementById('p-video-hover');
    const indicator = document.getElementById('photoIndicator');

    const hasHoverVisual = (hoverImg && hoverImg.getAttribute('src')) || 
                           (videoHover && videoHover.getAttribute('src'));

    if (!hasHoverVisual) return;

    if (currentMobileImageIndex === 0) {
        if(mainImg) mainImg.classList.remove('active-img');
        if (videoHover && videoHover.getAttribute('src')) {
            videoHover.style.display = 'block';
            videoHover.classList.add('active-img');
        } else if (hoverImg) {
            hoverImg.classList.add('active-img');
        }
        currentMobileImageIndex = 1;
        if (indicator) indicator.textContent = '2 / 2 (Tap for main view)';
    } else {
        if (hoverImg) hoverImg.classList.remove('active-img');
        if (videoHover) {
            videoHover.classList.remove('active-img');
            videoHover.style.display = 'none';
        }
        if(mainImg) mainImg.classList.add('active-img');
        currentMobileImageIndex = 0;
        if (indicator) indicator.textContent = '1 / 2 (Tap to view detail)';
    }
}

// 6. PDP RENDERING & DIRECT ROUTING
function renderDetail(p) {
    document.title = p.seoTitle || `${p.name} | LilAura UK`;
    if($('#p-cat')) $('#p-cat').innerText = p.category; 
    if($('#p-sku')) $('#p-sku').innerText = `SKU: ${p.sku}`;
    if($('#p-name')) $('#p-name').innerText = p.name; 
    if($('#p-price')) $('#p-price').innerText = `£${(+p.price).toFixed(2)}`;
    if($('#p-desc')) $('#p-desc').innerText = p.desc;
    
    currentMobileImageIndex = 0;
    const indicator = document.getElementById('photoIndicator');
    if(indicator) indicator.textContent = '1 / 2 (Tap to view detail)';

    const mainImg = $('#p-image');
    const hoverImg = $('#p-image-hover');
    const videoHover = $('#p-video-hover');

    if(mainImg) {
        mainImg.src = p.image;
        mainImg.classList.add('active-img');
    }

    if (p.imageHover && p.imageHover.endsWith('.mp4')) { 
        if(videoHover) {
            videoHover.src = p.imageHover; 
            videoHover.classList.remove('active-img');
            videoHover.style.display = 'none';
        }
    } else if (p.imageHover) { 
        if(hoverImg) {
            hoverImg.src = p.imageHover; 
            hoverImg.classList.remove('active-img');
        }
    } else {
        if(indicator) indicator.style.display = 'none';
    }

    const buyBtn = $('#buy-btn');
    if(buyBtn) {
        buyBtn.innerText = "Proceed to Checkout";
        buyBtn.onclick = () => { 
            if(!p.inStock) {
                toast('Item is currently out of stock.'); 
            } else {
                if (typeof gtag === 'function') {
                    gtag('event', 'click_etsy_checkout', {
                        currency: 'GBP',
                        value: p.price,
                        item_name: p.name
                    });
                }
                window.open(p.etsyLink, '_blank'); 
            }
        };

        if(!p.inStock) { 
            buyBtn.innerText = "Out of Stock"; 
            buyBtn.style.background = "#ddd"; 
            buyBtn.style.color = "#666"; 
        }
    }

    if(p.category) {
        if (p.category.toLowerCase().includes('traditional') || p.category.toLowerCase().includes('palakka')) {
            if($('#faq-mat-title')) $('#faq-mat-title').innerHTML = `Materials & Finish <span>+</span>`;
            if($('#faq-mat-content')) $('#faq-mat-content').innerHTML = `Forged in authentic traditional brass with a classic gold coating.`;
        } else {
            if($('#faq-mat-title')) $('#faq-mat-title').innerHTML = `Anti-Tarnish Guarantee <span>+</span>`;
            if($('#faq-mat-content')) $('#faq-mat-content').innerHTML = `Crafted from high-grade stainless steel with 18K gold PVD plating. 100% waterproof.`;
        }
    }

    $$('.accordion').forEach(el => el.onclick = () => el.classList.toggle('active'));
    
    if (typeof injectProductSEO === 'function') injectProductSEO(p);
    remember(p);
}

// 7. RECENTLY VIEWED MEMORY
function remember(p) {
    let r = [];
    try {
        r = JSON.parse(localStorage.getItem('lilauraRecent') || '[]');
    } catch(e) { r = []; }
    
    r = r.filter(x => x.id !== p.id);
    r.unshift({ id: p.id, name: p.name, price: p.price, img: p.image });
    if (r.length > 4) r.pop();
    
    try {
        localStorage.setItem('lilauraRecent', JSON.stringify(r));
    } catch(e) {}
}

// 8. TIMERS
function updateTimer() {
    if (!promoConfig || !promoConfig.endTime) return;

    let endTime = new Date(promoConfig.endTime).getTime();
    let d = Math.max(0, endTime - Date.now());
    let s = Math.floor(d / 1000);
    
    let days = Math.floor(s / (3600 * 24));
    s %= (3600 * 24);
    let h = Math.floor(s / 3600);
    s %= 3600;
    let m = Math.floor(s / 60);
    let sec = s % 60;

    if($('#miniTimer')) {
        $('#miniTimer').textContent = `${days}d ${String(h).padStart(2,'0')}h ${String(m).padStart(2,'0')}m ${String(sec).padStart(2,'0')}s`;
    }

    if($('#days')) $('#days').textContent = String(days).padStart(2,'0');
    if($('#hours')) $('#hours').textContent = String(h).padStart(2,'0');
    if($('#mins')) $('#mins').textContent = String(m).padStart(2,'0');
    if($('#secs')) $('#secs').textContent = String(sec).padStart(2,'0');
}

// 9. DYNAMIC SEO & METADATA INJECTION
function injectProductSEO(p) {
    document.title = p.seoTitle || `${p.name} | LilAura UK`;

    let metaDesc = document.querySelector('meta[name="description"]');
    if (!metaDesc) {
        metaDesc = document.createElement('meta');
        metaDesc.name = "description";
        document.head.appendChild(metaDesc);
    }
    metaDesc.setAttribute("content", p.metaDesc || p.desc);

    const ogTags = {
        "og:title": p.name,
        "og:description": p.metaDesc || p.desc,
        "og:image": p.image,
        "og:url": window.location.href,
        "og:type": "product"
    };
    
    Object.entries(ogTags).forEach(([property, content]) => {
        let tag = document.querySelector(`meta[property="${property}"]`);
        if (!tag) {
            tag = document.createElement('meta');
            tag.setAttribute("property", property);
            document.head.appendChild(tag);
        }
        tag.setAttribute("content", content);
    });

    const existingSchema = document.getElementById('lilaura-product-schema');
    if (existingSchema) existingSchema.remove();

    const schema = {
        "@context": "https://schema.org/",
        "@type": "Product",
        "name": p.name,
        "image": [p.image, p.imageHover].filter(Boolean),
        "description": p.desc,
        "sku": p.sku,
        "brand": { "@type": "Brand", "name": "LilAura" },
        "offers": {
            "@type": "Offer",
            "url": window.location.href,
            "priceCurrency": "GBP",
            "price": (+p.price).toFixed(2),
            "availability": p.inStock ? "https://schema.org/InStock" : "https://schema.org/OutOfStock",
            "itemCondition": "https://schema.org/NewCondition",
            "seller": { "@type": "Organization", "name": "LilAura Elegance" }
        }
    };

    const script = document.createElement('script');
    script.type = 'application/ld+json';
    script.id = 'lilaura-product-schema';
    script.text = JSON.stringify(schema);
    document.head.appendChild(script);
}

// 11. CENTRALIZED STRICT FILTER LOGIC
function filterProducts(f) {
    const shopGrid = document.getElementById('shop-grid');
    if (!shopGrid) return;

    if (typeof gtag === 'function') {
        gtag('event', 'view_item_list', { item_category: f });
    }

    if (f === 'all' || !f) {
        renderShop(products);
    } else {
        renderShop(products.filter(p => {
            const cat = (p.category || '').toLowerCase();
            const name = (p.name || '').toLowerCase();

            if (f === 'rings') {
                return cat.includes('ring') && !cat.includes('kada') && !cat.includes('bracelet') && !cat.includes('cuff');
            }
            if (f === 'kadas') {
                return cat.includes('kada') || cat.includes('bracelet') || cat.includes('cuff') || cat.includes('bangle') || name.includes('cuff');
            }
            if (f.includes('earring')) {
                return (cat.includes('earring') || cat.includes('stud') || name.includes('earring') || name.includes('stud')) && 
                       !cat.includes('traditional') && !name.includes('choker');
            }
            if (f === 'traditional') {
                return cat.includes('traditional') || cat.includes('palakka') || cat.includes('choker') || cat.includes('temple');
            }
            if (f === 'necklaces') {
                return cat.includes('necklace') || cat.includes('chain') || cat.includes('pendant');
            }
            if (f === 'bestsellers') {
                return p.bestseller === true;
            }
            if (f === 'new') {
                return p.newArrival === true;
            }

            return cat.includes(f) || name.includes(f);
        }));
    }
}

// 12. DYNAMIC CATEGORY TABS RENDERING
function renderCategoryTabs() {
    const tabsContainer = document.getElementById('shopTabs');
    if (!tabsContainer) return;

    const list = categories.length ? categories : [
        { id: 'all', title: 'All' },
        { id: 'kadas', title: 'Kadas & Cuffs' },
        { id: 'necklaces', title: 'Necklaces' },
        { id: 'traditional', title: 'Traditional' },
        { id: 'earrings', title: 'Earrings and Studs' },
        { id: 'rings', title: 'Rings' }
    ];

    tabsContainer.innerHTML = list.map((cat, index) => `
        <button class="tab ${index === 0 ? 'active' : ''}" data-filter="${escapeHtml(cat.id).toLowerCase()}">${escapeHtml(cat.title)}</button>
    `).join('');

    const params = new URLSearchParams(window.location.search);
    const catParam = params.get('cat');
    if (catParam) {
        $$('.tab').forEach(t => {
            if (t.dataset.filter === catParam.toLowerCase()) {
                t.classList.add('active');
            } else {
                t.classList.remove('active');
            }
        });
    }

    $$('.tab').forEach(b => { b.onclick = () => { $$
('.tab').forEach(x => x.classList.remove('active'));
            b.classList.add('active');
            const f = (b.dataset.filter || '').toLowerCase();
            
            const newUrl = f === 'all' ? 'shop.html' : `shop.html?cat=${f}`;
            window.history.replaceState(null, '', newUrl);

            filterProducts(f);
        };
    });
}
