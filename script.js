/* LILAURA CORE ENGINE - PURE ETSY EDITION
   Contains EXACTLY your official Etsy listings (LilauraElegance).
   Includes luxury cross-fade hover engine with smart fallbacks.
*/

/* --- URL POLISH: Remove .html from Address Bar --- */
if (window.location.pathname.endsWith('.html') && window.location.pathname !== '/index.html') {
    const cleanUrl = window.location.pathname.replace(/\.html$/, '') + window.location.search + window.location.hash;
    window.history.replaceState(null, '', cleanUrl);
} else if (window.location.pathname === '/index.html') {
    window.history.replaceState(null, '', '/');
}

// --- 1. PRODUCT DATABASE (11 ETSY ITEMS) ---
const products = [
    { 
        id: 1, 
        sku: "ALBR-CUFF-01", 
        name: "18K Gold Plated Stainless Steel Cuff Bracelet", 
        category: "Anti-tarnish Kada", 
        price: 16.49, 
        image: "https://i.etsystatic.com/40040678/r/il/43a595/8197151304/il_1140xN.8197151304_btta.jpg", 
        // 🟢 PASTE YOUR MODEL PHOTO LINK HERE (If left blank, it auto-defaults to a clean zoom on the main image!)
        imageHover: "https://i.etsystatic.com/40040678/r/il/d9061f/8245076873/il_1588xN.8245076873_2lvz.jpg", 
        desc: "Premium 18K gold plated stainless steel cuff bracelet. Waterproof, sweat-resistant, and guaranteed anti-tarnish for everyday luxury wear.",
        etsyLink: "https://www.etsy.com/uk/listing/4530558606/18k-gold-plated-stainless-steel-cuff"
    },
    { 
        id: 2, 
        sku: "SSCF-INF-02", 
        name: "Anti-Tarnish Infinity Cuff with Double Layered Zircon Stones", 
        category: "Anti-tarnish Kada", 
        price: 18.49, 
        image: "https://i.etsystatic.com/40040678/r/il/7a4f17/8197075762/il_1140xN.8197075762_9l3z.jpg", 
        imageHover: "https://i.etsystatic.com/40040678/r/il/76f01a/8244992671/il_1588xN.8244992671_17eo.jpg",
        desc: "Stunning infinity motif open cuff embellished with double-layered sparkling zircon stones. 100% waterproof and hypoallergenic.",
        etsyLink: "https://www.etsy.com/uk/listing/4530529391/anti-tarnish-infinity-cuff-with-double"
    },
    { 
        id: 3, 
        sku: "SSBR-CHM-03", 
        name: "Anti-Tarnish Charm Bracelet (Celestial & Floral Motifs)", 
        category: "Anti-tarnish Bracelets", 
        price: 12.99, 
        image: "https://i.etsystatic.com/40040678/r/il/dc3ce4/8237168671/il_1140xN.8237168671_jfzc.jpg", 
        imageHover: "https://i.etsystatic.com/40040678/r/il/e8ff26/8237168665/il_1588xN.8237168665_bawh.jpg",
        desc: "Delicate charm bracelet featuring intricate celestial and floral motifs on a durable anti-tarnish golden alloy chain.",
        etsyLink: "https://www.etsy.com/uk/listing/4529459089/anti-tarnish-charm-bracelets-with"
    },
    { 
        id: 4, 
        sku: "SSFR-RNG-04", 
        name: "Anti-Tarnish Stainless Steel Statement Ring with Zircon Stones", 
        category: "Finger Rings", 
        price: 12.49, 
        image: "https://i.etsystatic.com/40040678/r/il/8fa288/8237035721/il_1140xN.8237035721_745p.jpg", 
        imageHover: "https://i.etsystatic.com/40040678/r/il/ee4ac9/8236840827/il_1588xN.8236840827_i6s3.jpg",
        desc: "Bold statement ring crafted from titanium stainless steel with embedded brilliant-cut zircon stones. Will never turn your finger green.",
        etsyLink: "https://www.etsy.com/uk/listing/4529409433/anti-tarnish-stainless-steel-rings-with"
    },
    { 
        id: 5, 
        sku: "TRNK-PAL-05", 
        name: "Traditional Palakka Choker Necklace Set with Matching Earstuds", 
        category: "Traditional Jewellery", 
        price: 22.99, 
        image: "https://i.etsystatic.com/40040678/r/il/d4f5e2/8188806402/il_1140xN.8188806402_misi.jpg", 
        imageHover: "https://i.etsystatic.com/40040678/r/il/3b30ae/8236734059/il_1588xN.8236734059_jer7.jpg",
        desc: "Authentic South Indian heritage Palakka choker set. Includes matching traditional earstuds. Perfect for weddings and festive wear.",
        etsyLink: "https://www.etsy.com/uk/listing/4529392003/traditional-palakka-choker-necklace-set"
    },
    { 
        id: 6, 
        sku: "SSNK-EMR-06", 
        name: "Anti-Tarnish Gold Plated Emerald Pendant Necklace", 
        category: "Anti-tarnish Necklaces", 
        price: 15.49, 
        image: "https://i.etsystatic.com/40040678/r/il/ffa352/8189114976/il_1140xN.8189114976_1kwd.jpg", 
        imageHover: "https://i.etsystatic.com/40040678/r/il/30b535/8187441892/il_1588xN.8187441892_4z6t.jpg",
        desc: "Exquisite geometric emerald-cut green stone pendant on an 18k gold vermeil water-resistant chain. Simple, daily luxury.",
        etsyLink: "https://www.etsy.com/uk/listing/4529214581/anti-tarnish-gold-plated-emerald-pendant"
    },
    { 
        id: 7, 
        sku: "SSCF-HPR-07", 
        name: "Gold Plated Stainless Steel Heart Pearl Bangle", 
        category: "Anti-tarnish Kada", 
        price: 17.99, 
        image: "https://i.etsystatic.com/40040678/r/il/8b2186/8160669462/il_1140xN.8160669462_1gej.jpg", 
        imageHover: "https://i.etsystatic.com/40040678/r/il/9e3a42/8163583924/il_1588xN.8163583924_iu7q.jpg",
        desc: "Romantic open cuff bangle featuring twin mother-of-pearl heart accents set in durable gold-plated stainless steel.",
        etsyLink: "https://www.etsy.com/uk/listing/4525317383/gold-plated-stainless-steel-heart-pearl"
    },
    { 
        id: 8, 
        sku: "TRNK-PAL-08", 
        name: "Traditional Kerala Palakka Choker Necklace Set with Jhumka Earrings", 
        category: "Traditional Jewellery", 
        price: 22.79, 
        image: "https://i.etsystatic.com/40040678/r/il/9e8c06/8160739980/il_1140xN.8160739980_sq94.jpg", 
        imageHover: "https://i.etsystatic.com/40040678/r/il/040edc/8208662971/il_1588xN.8208662971_fvbw.jpg",
        desc: "Grand Kerala-style green Palakka short choker necklace paired with traditional bell-shaped Jhumka earrings. Classic temple jewelry.",
        etsyLink: "https://www.etsy.com/uk/listing/4525327387/traditional-kerala-palakka-choker"
    },
    { 
        id: 9, 
        sku: "TRNK-COIN-09", 
        name: "Ganapathy Coin Palakka Choker Traditional Heritage Necklace", 
        category: "Traditional Jewellery", 
        price: 20.99, 
        image: "https://i.etsystatic.com/40040678/r/il/937cd1/7929099115/il_1140xN.7929099115_91kk.jpg", 
        imageHover: "https://i.etsystatic.com/40040678/r/il/cf6068/7881137800/il_1588xN.7881137800_qmft.jpg",
        desc: "Traditional Kasu Mala coin choker featuring Lord Ganesha motifs interlaced with classic Palakka stones. Heirloom craftsmanship.",
        etsyLink: "https://www.etsy.com/uk/listing/4483539459/coin-palakka-choker-traditional-necklace"
    },
    { 
        id: 10, 
        sku: "SSNK-EMR-10", 
        name: "Anti-Tarnish Gold Plated Emerald Green Leaf Pendant Necklace", 
        category: "Anti-tarnish Necklaces", 
        price: 16.99, 
        image: "https://i.etsystatic.com/40040678/r/il/e0133d/8235370965/il_1140xN.8235370965_lcqj.jpg", 
        imageHover: "https://i.etsystatic.com/40040678/r/il/e076b8/8219789654/il_1588xN.8219789654_ae0q.jpg",
        desc: "Exquisite geometric emerald-cut green stone pendant on an 18k gold vermeil water-resistant chain. Simple, daily luxury.",
        etsyLink: "https://www.etsy.com/uk/listing/4533568863/anti-tarnish-gold-plated-emerald-green"
    },
    { 
        id: 11, 
        sku: "TRNK-PAL-11", 
        name: "Traditional Indian Lakshmi Choker Necklace Set with Matching Ear studs", 
        category: "Traditional Jewellery", 
        price: 33.99, 
        image: "https://i.etsystatic.com/40040678/r/il/2c06b4/8267631719/il_794xN.8267631719_jtvb.jpg", 
        imageHover: "https://i.etsystatic.com/40040678/r/il/1aa4cf/8219989822/il_1588xN.8219989822_5rkv.jpg",
        desc: "Authentic South Indian heritage Palakka choker set. Includes matching traditional earstuds. Perfect for weddings and festive wear.",
        etsyLink: "https://www.etsy.com/uk/listing/4533558563/traditional-indian-lakshmi-choker"
    },
    { 
        id: 12, 
        sku: "TRNK-PAL-12", 
        name: "Traditional Indian Meenakari Choker Necklace Set with Earrings", 
        category: "Traditional Jewellery", 
        price: 17.99, 
        image: "https://i.etsystatic.com/40040678/r/il/59bf79/8237200950/il_1588xN.8237200950_eiq3.jpg", 
        imageHover: "https://i.etsystatic.com/40040678/r/il/23e1cb/8285106413/il_1588xN.8285106413_59je.jpg",
        desc: "Authentic South Indian heritage Meenakari Choker set. Includes matching traditional earstuds. Perfect for weddings and festive wear.",
        etsyLink: "https://www.etsy.com/uk/listing/4535073097/red-lotus-meenakari-necklace-set"
    }
];

// --- 2. PAGE LOAD & RENDERING LOGIC ---
document.addEventListener('DOMContentLoaded', () => {
    const reviewClose = document.getElementById('close-review');
    const reviewBar = document.getElementById('review-bar');
    if(reviewClose && reviewBar) {
        reviewClose.addEventListener('click', () => {
            reviewBar.style.display = 'none';
        });
    }

    const shopGrid = document.getElementById('shop-grid');
    if (shopGrid) {
        renderShop(products);
    }

    const productDetail = document.getElementById('product-detail-container');
    if (productDetail) {
        const urlParams = new URLSearchParams(window.location.search);
        const pid = parseInt(urlParams.get('id'));
        const product = products.find(p => p.id === pid) || products[0]; 
        renderProductDetail(product);
    }
});

function renderShop(items) {
    const container = document.getElementById('shop-grid');
    if (!container) return; 
    
    if (items.length === 0) {
        container.innerHTML = `<div class="col-span-full text-center py-12 font-serif text-xl text-lilaura-subtle">No jewelry items found in this category. Explore our "All" collection above.</div>`;
        return;
    }

    // 🟢 UPDATED: Shop Grid now uses the Dual-Image Stack for seamless hover cross-fades
    container.innerHTML = items.map(p => `
        <div class="group cursor-pointer flex flex-col justify-between" onclick="window.location.href='product?id=${p.id}'">
            <div>
                <div class="w-full aspect-[3/4] overflow-hidden bg-gray-100 relative border border-lilaura-gold/10">
                    
                    <img src="${p.image}" alt="${p.name}" loading="lazy" 
                         class="absolute inset-0 w-full h-full object-cover transition-all duration-700 ease-out group-hover:opacity-0 group-hover:scale-105 z-10">
                    
                    <img src="${p.imageHover ? p.imageHover : p.image}" alt="Model wearing ${p.name}" loading="lazy" 
                         class="absolute inset-0 w-full h-full object-cover opacity-0 transition-all duration-700 ease-out group-hover:opacity-100 group-hover:scale-105 z-20">
                    
                    <div class="absolute top-2 left-2 bg-black/70 backdrop-blur-sm text-lilaura-gold text-[9px] px-2 py-1 tracking-widest uppercase font-sans z-30">Official Etsy Item</div>
                    <div class="absolute bottom-0 inset-x-0 bg-gradient-to-t from-black/60 to-transparent p-3 opacity-0 group-hover:opacity-100 transition-opacity flex justify-end z-30">
                        <span class="text-white text-[10px] uppercase tracking-widest bg-lilaura-emerald px-2 py-1">View Details &rarr;</span>
                    </div>
                </div>
                <div class="mt-4 text-center">
                    <p class="text-[9px] tracking-[0.2em] uppercase text-lilaura-emerald mb-1">${p.category}</p>
                    <h3 class="font-serif text-base md:text-lg text-lilaura-text leading-snug group-hover:text-lilaura-gold transition-colors line-clamp-2">${p.name}</h3>
                </div>
            </div>
            <div class="mt-2 text-center">
                <p class="font-price text-xl text-lilaura-gold font-normal tracking-widest">£${p.price.toFixed(2)}</p>
            </div>
        </div>
    `).join('');
}

function renderProductDetail(p) {
    // Load main text details
    document.getElementById('p-cat').innerText = p.category;
    document.getElementById('p-name').innerText = p.name;
    document.getElementById('p-price').innerText = `£${p.price.toFixed(2)}`;
    document.getElementById('p-desc').innerText = p.desc;
    document.getElementById('p-sku').innerText = `SKU: ${p.sku}`; 
    
    // 🟢 1. AUTOMATIC DYNAMIC ALT TEXT
    const baseImg = document.getElementById('p-image');
    if (baseImg) {
        baseImg.src = p.image;
        baseImg.alt = `${p.name} - Anti-tarnish Indian Jewellery UK`; // Tells Google Images what this is
    }
    
    const hoverImg = document.getElementById('p-image-hover');
    if (hoverImg) {
        hoverImg.src = p.imageHover ? p.imageHover : p.image;
        hoverImg.alt = `Model wearing ${p.name}`; // Covers the second image
    }

    // 🟢 2. AUTOMATIC SEO PAGE TITLE
    // Changes the browser tab and Google Search blue link
    document.title = `${p.name} | Lilaura UK`;

    // 🟢 3. AUTOMATIC META DESCRIPTION
    // Tells Google what text to put under the blue link in search results
    let metaDesc = document.querySelector('meta[name="description"]');
    if (!metaDesc) {
        metaDesc = document.createElement('meta');
        metaDesc.name = 'description';
        document.head.appendChild(metaDesc);
    }
    // Grabs the first 155 characters of your product description (Google's limit)
    metaDesc.content = p.desc.substring(0, 155) + "... Buy directly via our official Etsy storefront.";
    
    // Wire Primary Action Button
    const etsyBtn = document.getElementById('buy-etsy-btn');
    if (etsyBtn) {
        etsyBtn.href = p.etsyLink || "https://www.etsy.com/uk/shop/LilauraElegance";
    }

    // SEO Schema (Already handling advanced Google Shopping data!)
    const schemaData = {
      "@context": "https://schema.org/",
      "@type": "Product",
      "name": p.name,
      "image": [p.image],
      "description": p.desc,
      "sku": p.sku,
      "brand": { "@type": "Brand", "name": "Lilaura" },
      "offers": {
        "@type": "Offer",
        "priceCurrency": "GBP",
        "price": p.price,
        "availability": "https://schema.org/InStock",
        "url": p.etsyLink || window.location.href
      }
    };
    const script = document.createElement('script');
    script.type = "application/ld+json";
    script.text = JSON.stringify(schemaData);
    document.head.appendChild(script);
}

function filterCategory(cat, event) {
    const buttons = document.querySelectorAll('.filter-btn');
    buttons.forEach(btn => btn.classList.remove('text-lilaura-gold', 'border-lilaura-gold'));
    if (event && event.target) {
        event.target.classList.add('text-lilaura-gold', 'border-lilaura-gold');
    }

    if(cat === 'All') {
        renderShop(products);
    } else {
        const filtered = products.filter(p => p.category === cat);
        renderShop(filtered);
    }
}

// --- 3. LUXURY SOCIAL PROOF (FOMO) LOGIC ---
const ukLocations = ["London", "Birmingham", "Manchester", "Leicester", "Leeds", "Edinburgh", "Glasgow", "Bristol", "Liverpool", "Nottingham", "Bradford"];
const customerNames = ["Priya", "Sarah", "Anjali", "Jessica", "Fatima", "Neha", "Emily", "Aisha", "Chloe", "Riya", "Sonia", "Zara", "Meera", "Rebecca", "Simran"];

// Configuration for Luxury Pacing
let notificationCount = 0;
const MAX_NOTIFICATIONS = 3; // Maximum popups per session to avoid annoying the user

function triggerFomoNotification() {
    // Abort if we have already shown the maximum number of elegant nudges
    if (notificationCount >= MAX_NOTIFICATIONS) return;

    const fomoPopup = document.getElementById('fomo-popup');
    if (!fomoPopup) return; 

    // Generate random data
    const randomCity = ukLocations[Math.floor(Math.random() * ukLocations.length)];
    const randomName = customerNames[Math.floor(Math.random() * customerNames.length)];
    const randomProduct = products[Math.floor(Math.random() * products.length)];

    // Populate the popup
    document.getElementById('fomo-text').innerText = `${randomName} in ${randomCity} recently ordered via Etsy`;
    document.getElementById('fomo-product').innerText = randomProduct.name;

    // Display the popup
    fomoPopup.classList.add('show-fomo');
    notificationCount++;

    // Remove the popup after 5 seconds, then schedule the next one (if under cap)
    setTimeout(() => {
        fomoPopup.classList.remove('show-fomo');
        
        if (notificationCount < MAX_NOTIFICATIONS) {
            // Calculate a random delay between 2 to 5 minutes (120,000ms to 300,000ms)
            const minDelay = 120000;
            const maxDelay = 300000;
            const nextDelay = Math.floor(Math.random() * (maxDelay - minDelay + 1) + minDelay);
            
            setTimeout(triggerFomoNotification, nextDelay);
        }
    }, 5000);
}

// Initial gentle delay: Wait 20 seconds before showing the very first notification
setTimeout(() => {
    triggerFomoNotification();
}, 20000);
