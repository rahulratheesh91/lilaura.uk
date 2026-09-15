/* LILAURA APEX X™ UNIFIED ENGINE (Dynamic JSON Catalog & Cart UX) */

// 1. URL POLISH
if (window.location.pathname.endsWith('.html') && window.location.pathname !== '/index.html') {
    window.history.replaceState(null, '', window.location.pathname.replace(/\.html$/, '') + window.location.search);
} else if (window.location.pathname === '/index.html') {
    window.history.replaceState(null, '', '/');
}

// 2. DYNAMIC CATALOG STORAGE
let products = [];
let categories = [];

// 3. CART & UI LOGIC
const $ = s => document.querySelector(s), $$ = s => document.querySelectorAll(s);
let cart = JSON.parse(localStorage.getItem('lilauraCart') || '[]');
let wishes = JSON.parse(localStorage.getItem('lilauraWish') || '[]');

function toast(m) {
    let t = $('#toast'); if(!t) return;
    t.textContent = m; t.classList.add('show');
    setTimeout(() => t.classList.remove('show'), 2000);
}

function renderRecent(){
    let r = JSON.parse(localStorage.getItem('lilauraRecent')||'[]');
    if(!r.length) return;
    const recentSection = $('#recent');
    const recentGrid = $('#recentGrid');
    
    if (recentSection && recentGrid) {
        recentSection.classList.add('show');
        recentGrid.innerHTML = r.map(x => `
        <div class="recent-card" onclick="window.location.href='product.html?id=${x.id}'">
            <img src="${x.img}" alt="${x.name}">
            <p>${x.name}<br><small style="font-family:'Bodoni Moda', serif; font-size:15px; color:var(--gold); letter-spacing:0.05em;">£${(+x.price).toFixed(2)}</small></p>
        </div>`).join('');
    }
}

function saveCart() {
    localStorage.setItem('lilauraCart', JSON.stringify(cart));
    localStorage.setItem('lilauraWish', JSON.stringify(wishes));
    renderCart();
    const countEl = $('#cartCount');
    if(countEl) countEl.textContent = cart.reduce((a, x) => a + x.qty, 0);
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
            <img src="${x.img}" alt="${x.name}">
            <div style="flex:1">
                <h4>${x.name}</h4>
                <small class="price-mod">£${x.price.toFixed(2)}</small><small style="letter-spacing:0.1em; color:var(--gold); text-transform:uppercase; margin-left:8px">· Qty ${x.qty}</small><br>
                <button aria-label="Remove item" onclick="removeItem(${i})" style="border:0;background:none;padding:12px 0 0;text-decoration:underline;font-size:10px; color:var(--muted); cursor:pointer; transition:color 0.3s;" onmouseover="this.style.color='var(--ink)'" onmouseout="this.style.color='var(--muted)'">Remove Item</button>
            </div>
        </div>`).join('');
        
    let total = cart.reduce((a, x) => a + x.price * x.qty, 0);
    
    // --- APEX X™: SMART CART ROUTING ---
    let checkoutLink = 'https://www.etsy.com/uk/shop/LilauraElegance';
    
    if (cart.length === 1) {
        const matchedProduct = products.find(p => p.name === cart[0].name);
        if (matchedProduct && matchedProduct.etsyLink) {
            checkoutLink = matchedProduct.etsyLink;
        }
    }

    bottom.innerHTML = `
        <div class="cart-total"><span>Total</span><span class="price-mod">£${total.toFixed(2)}</span></div>
        <button class="checkout" onclick="window.open('${checkoutLink}', '_blank')">Checkout securely on Etsy</button>
        <!-- LILAURA APEX X™: CLEAR BAG BUTTON -->
        <button onclick="clearCart()" style="width:100%; border:0; background:none; padding:20px 0 0; font-family:'Proza Libre', sans-serif; font-size:9px; letter-spacing:0.15em; text-transform:uppercase; color:var(--muted); cursor:pointer; text-decoration:underline; transition:color 0.3s;" onmouseover="this.style.color='var(--ink)'" onmouseout="this.style.color='var(--muted)'">Empty Bag</button>`;
}

function removeItem(i) { 
    cart.splice(i, 1); 
    saveCart(); 
    toast('Item removed from bag'); 
}

function clearCart() {
    if (confirm("Are you sure you want to empty your bag?")) {
        cart = [];
        saveCart();
        toast('Bag has been emptied');
    }
}

function openDrawer() { $('#drawer')?.classList.add('open'); $('#overlay')?.classList.add('open'); document.body.classList.add('lock'); }
function closeDrawer() { $('#drawer')?.classList.remove('open'); $('#overlay')?.classList.remove('open'); document.body.classList.remove('lock'); }

function addToCart(id) {
    const p = products.find(x => x.id === id); if(!p) return;
    let item = cart.find(x => x.name === p.name);
    if(item) item.qty++; else cart.push({name: p.name, price: p.price, img: p.image, qty: 1});
    saveCart(); toast(p.name + ' added to bag'); openDrawer();
}

function toggleWish(event, id) {
    event.stopPropagation(); const p = products.find(x => x.id === id); if(!p) return;
    if(wishes.includes(p.name)) { wishes = wishes.filter(x => x !== p.name); toast('Removed from wishlist'); event.target.classList.remove('active'); } 
    else { wishes.push(p.name); toast('Added to wishlist'); event.target.classList.add('active'); }
    saveCart();
}

// 4. ASYNC INITIALIZATION & DOM MOUNTING
async function initStore() {
    try {
        const response = await fetch('/products.json?v=' + Date.now());
        const data = await response.json();
        products = data.items || [];
        categories = data.categories || [];
    } catch (e) {
        console.error("Failed loading products.json, retrying fallback...", e);
    }

    const shopGrid = document.getElementById('shop-grid');
    if (shopGrid) renderShop(products);

    const detailContainer = document.getElementById('product-detail-container');
    if (detailContainer) {
        const params = new URLSearchParams(window.location.search);
        const p = products.find(x => x.id === parseInt(params.get('id'))) || products[0];
        if (p) renderDetail(p);
    }

    renderRecent();
}

document.addEventListener('DOMContentLoaded', () => {
    if($('#cartBtn')) $('#cartBtn').onclick = openDrawer;
    if($('#closeDrawer')) $('#closeDrawer').onclick = closeDrawer;
    if($('#overlay')) $('#overlay').onclick = closeDrawer;
    if($('#menuBtn')) $('#menuBtn').onclick = () => $('#mega').classList.toggle('open');
    saveCart();

    initStore();

    // Filter Logic with Smart Mapping
    $$('.tab').forEach(b => b.onclick = () => {
        $$('.tab').forEach(x => x.classList.remove('active'));
        b.classList.add('active');
        const f = (b.dataset.filter || '').toLowerCase();
        
        const shopGrid = document.getElementById('shop-grid');
        if (!shopGrid) return;

        if (f === 'all' || !f) {
            renderShop(products);
        } else if (f === 'kadas') {
            const wristwear = products.filter(p => 
                p.category.toLowerCase().includes('kada') || 
                p.category.toLowerCase().includes('bracelet') ||
                p.name.toLowerCase().includes('cuff') ||
                p.name.toLowerCase().includes('bangle')
            );
            renderShop(wristwear);
        } else if (f === 'rings') {
            const pureRings = products.filter(p => 
                p.category.toLowerCase().includes('finger rings') || 
                (p.name.toLowerCase().includes('ring') && !p.name.toLowerCase().includes('earring'))
            );
            renderShop(pureRings);
        } else {
            renderShop(products.filter(p => 
                p.category.toLowerCase().includes(f) ||
                p.name.toLowerCase().includes(f)
            ));
        }
    });

    // Temporal FOMO Engine (43s delay, 1.5h cooldown)
    const fomoLastShown = localStorage.getItem('lilauraFomoLastShown');
    const now = Date.now();
    const cooldownPeriod = 1.5 * 60 * 60 * 1000;
    
    if (!fomoLastShown || now - parseInt(fomoLastShown) > cooldownPeriod) {
        if (typeof triggerFomo === 'function') {
            setTimeout(triggerFomo, 43000);
        }
    }
    
    setInterval(updateTimer, 1000); 
    updateTimer();
});

function renderShop(items) {
    const container = document.getElementById('shop-grid');
    if (!container) return;
    if (!items.length) { container.innerHTML = `<div style="grid-column:1/-1; text-align:center; padding:50px 0;">No items found.</div>`; return; }

    const bottomIds = [16, 17, 18, 19, 20, 21, 22];
    const regularItems = items.filter(p => !bottomIds.includes(p.id));
    const bottomItems = items.filter(p => bottomIds.includes(p.id));
    const sortedItems = [...regularItems, ...bottomItems];

    container.innerHTML = sortedItems.map(p => {
        const isVid = p.imageHover && p.imageHover.endsWith('.mp4');
        const hoverHTML = isVid ? `<video src="${p.imageHover}" autoplay loop muted class="hover-visual"></video>` : `<img src="${p.imageHover || p.image}" class="hover-img">`;
        const tag = p.inStock ? '' : `<span class="tag" style="background:var(--ink); color:var(--white);">Sold Out</span>`;
        const activeWish = wishes.includes(p.name) ? 'active' : '';

        return `
        <article class="product" onclick="window.location.href='product.html?id=${p.id}'">
            <div class="media">
                ${tag}
                <button class="heart ${activeWish}" aria-label="Add to wishlist" onclick="toggleWish(event, ${p.id})">♡</button>
                <img src="${p.image}" class="base-img" loading="lazy" alt="${p.name}">
                ${hoverHTML}
                <div class="quickbar">
                    <button class="quick" onclick="event.stopPropagation(); window.location.href='product.html?id=${p.id}'">Quick view</button>
                    <button class="add" onclick="event.stopPropagation(); addToCart(${p.id})">Add to bag</button>
                </div>
            </div>
            <div class="pinfo">
                <div class="pmeta">${p.category}</div>
                <div class="pname">${p.name}</div>
                <div class="price">£${p.price.toFixed(2)}</div>
            </div>
        </article>`;
    }).join('');
}

// 5. PDP RENDERING & DIRECT ROUTING
function renderDetail(p) {
    document.title = p.seoTitle || `${p.name} | LilAura UK`;
    $('#p-cat').innerText = p.category; $('#p-sku').innerText = `SKU: ${p.sku}`;
    $('#p-name').innerText = p.name; $('#p-price').innerText = `£${p.price.toFixed(2)}`;
    $('#p-desc').innerText = p.desc;
    
    $('#p-image').src = p.image;
    if (p.imageHover && p.imageHover.endsWith('.mp4')) { 
        $('#p-video-hover').src = p.imageHover; 
        $('#p-video-hover').style.display = 'block'; 
    } else { 
        $('#p-image-hover').src = p.imageHover || p.image; 
    }

    const buyBtn = $('#buy-btn');
    buyBtn.innerText = "Proceed to Checkout";
    
    buyBtn.onclick = () => { 
        if(!p.inStock) {
            toast('Item is currently out of stock.'); 
        } else {
            window.open(p.etsyLink, '_blank'); 
        }
    };

    if(!p.inStock) { 
        buyBtn.innerText = "Out of Stock"; 
        buyBtn.style.background = "#ddd"; 
        buyBtn.style.color = "#666"; 
    }

    if (p.category.includes('Traditional')) {
        $('#faq-mat-title').innerHTML = `Materials & Finish <span>+</span>`;
        $('#faq-mat-content').innerHTML = `Forged in authentic traditional brass with a classic gold coating.`;
    } else {
        $('#faq-mat-title').innerHTML = `Anti-Tarnish Guarantee <span>+</span>`;
        $('#faq-mat-content').innerHTML = `Crafted from high-grade stainless steel with 18K gold PVD plating. 100% waterproof.`;
    }

    $$('.accordion').forEach(el => el.onclick = () => el.classList.toggle('active'));
    
    if (typeof injectProductSEO === 'function') injectProductSEO(p);
    remember(p);
}

// 6. RECENTLY VIEWED MEMORY
function remember(p) {
    let r = JSON.parse(localStorage.getItem('lilauraRecent') || '[]');
    r = r.filter(x => x.id !== p.id);
    r.unshift({ id: p.id, name: p.name, price: p.price, img: p.image });
    if (r.length > 4) r.pop();
    localStorage.setItem('lilauraRecent', JSON.stringify(r));
}

// 7. TIMERS
function updateTimer() {
    let endTime = localStorage.getItem('lilauraTimerEnd');
    if (!endTime) {
        endTime = Date.now() + (511 * 60 * 60 * 1000); 
        localStorage.setItem('lilauraTimerEnd', endTime);
    }

    let d = Math.max(0, parseInt(endTime) - Date.now());
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

// 8. DYNAMIC SEO & METADATA INJECTION
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
        "brand": {
            "@type": "Brand",
            "name": "LilAura"
        },
        "offers": {
            "@type": "Offer",
            "url": window.location.href,
            "priceCurrency": "GBP",
            "price": p.price.toFixed(2),
            "availability": p.inStock ? "https://schema.org/InStock" : "https://schema.org/OutOfStock",
            "itemCondition": "https://schema.org/NewCondition",
            "seller": {
                "@type": "Organization",
                "name": "LilAura Elegance"
            }
        }
    };

    const script = document.createElement('script');
    script.type = 'application/ld+json';
    script.id = 'lilaura-product-schema';
    script.text = JSON.stringify(schema);
    document.head.appendChild(script);
}

// 9. LILAURA APEX X™: SOCIAL PROOF ENGINE (FOMO)
function triggerFomo() {
    const fomoPopup = document.getElementById('fomo-popup');
    const fomoText = document.getElementById('fomo-text');
    const fomoProduct = document.getElementById('fomo-product');
    
    if (!fomoPopup || !fomoText || !fomoProduct) return;

    const availableProducts = products.filter(p => p.inStock);
    if (availableProducts.length === 0) return;

    const randomProduct = availableProducts[Math.floor(Math.random() * availableProducts.length)];
    
    const locations = ['London', 'Manchester', 'Birmingham', 'Surrey', 'Edinburgh', 'Bristol', 'Kent', 'Essex'];
    const times = ['2 minutes ago', '14 minutes ago', '1 hour ago', 'Just now'];
    const randomLoc = locations[Math.floor(Math.random() * locations.length)];
    const randomTime = times[Math.floor(Math.random() * times.length)];

    fomoText.textContent = `Someone in ${randomLoc} bought this ${randomTime}`;
    fomoProduct.textContent = randomProduct.name;
    
    fomoPopup.style.opacity = '1';
    fomoPopup.style.transform = 'translateY(0)';
    fomoPopup.style.pointerEvents = 'auto';

    fomoPopup.onclick = () => window.location.href = `product.html?id=${randomProduct.id}`;
    fomoPopup.style.cursor = 'pointer';

    localStorage.setItem('lilauraFomoLastShown', Date.now().toString());

    setTimeout(() => {
        fomoPopup.style.opacity = '0';
        fomoPopup.style.transform = 'translateY(150px)';
        fomoPopup.style.pointerEvents = 'none';
    }, 6000);
}
