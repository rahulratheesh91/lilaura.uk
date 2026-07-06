/* LILAURA CORE ENGINE - ETSY INTEGRATION EDITION
   Connects lilaura.uk directly to official Etsy storefront (LilauraElegance)
   Handles Product Catalog, Etsy Checkout Routing, and Luxury Social Proof
*/

// --- 1. PRODUCT DATABASE ---
// TIP: To show your exact Etsy photo without uploading to GitHub, right-click your photo on Etsy,
// click "Copy Image Address", and paste the i.etsystatic.com link into the image field below!
const products = [
    // --- FEATURED OFFICIAL ETSY LISTINGS ---
    { 
        id: 1, 
        sku: "ALBR-CUFF-01", 
        name: "18K Gold Plated Stainless Steel Cuff Bracelet", 
        category: "Anti-tarnish Kada", 
        price: 45.00, 
        image: "https://images.unsplash.com/photo-1602173574767-37ac01994b2a?auto=format&fit=crop&w=800", 
        desc: "Premium 18K gold plated stainless steel cuff bracelet. Waterproof, sweat-resistant, and guaranteed anti-tarnish for everyday luxury wear.",
        etsyLink: "https://www.etsy.com/uk/listing/4530558606/18k-gold-plated-stainless-steel-cuff"
    },
    { 
        id: 2, 
        sku: "SSCF-INF-02", 
        name: "Anti-Tarnish Infinity Cuff with Double Layered Zircon Stones", 
        category: "Anti-tarnish Kada", 
        price: 55.00, 
        image: "https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?auto=format&fit=crop&w=800", 
        desc: "Stunning infinity motif open cuff embellished with double-layered sparkling zircon stones. 100% waterproof and hypoallergenic.",
        etsyLink: "https://www.etsy.com/uk/listing/4530529391/anti-tarnish-infinity-cuff-with-double"
    },
    { 
        id: 3, 
        sku: "SSBR-CHM-03", 
        name: "Anti-Tarnish Charm Bracelet (Celestial & Floral Motifs)", 
        category: "Anti-tarnish Bracelets", 
        price: 48.00, 
        image: "https://images.unsplash.com/photo-1611591437281-460bfbe1220a?auto=format&fit=crop&w=800", 
        desc: "Delicate charm bracelet featuring intricate celestial and floral motifs on a durable anti-tarnish golden alloy chain.",
        etsyLink: "https://www.etsy.com/uk/listing/4529459089/anti-tarnish-charm-bracelets-with"
    },
    { 
        id: 4, 
        sku: "SSFR-RNG-04", 
        name: "Anti-Tarnish Stainless Steel Statement Ring with Zircon Stones", 
        category: "Finger Rings", 
        price: 35.00, 
        image: "https://images.unsplash.com/photo-1605100804763-247f67b3557e?auto=format&fit=crop&w=800", 
        desc: "Bold statement ring crafted from titanium stainless steel with embedded brilliant-cut zircon stones. Will never turn your finger green.",
        etsyLink: "https://www.etsy.com/uk/listing/4529409433/anti-tarnish-stainless-steel-rings-with"
    },
    { 
        id: 5, 
        sku: "TRNK-PAL-05", 
        name: "Traditional Palakka Choker Necklace Set with Matching Earstuds", 
        category: "Traditional Jewellery", 
        price: 85.00, 
        image: "https://images.unsplash.com/photo-1617112837568-7c852445657b?auto=format&fit=crop&w=800", 
        desc: "Authentic South Indian heritage Palakka choker set. Includes matching traditional earstuds. Perfect for weddings and festive wear.",
        etsyLink: "https://www.etsy.com/uk/listing/4529392003/traditional-palakka-choker-necklace-set"
    },
    { 
        id: 6, 
        sku: "SSNK-EMR-06", 
        name: "Anti-Tarnish Gold Plated Emerald Pendant Necklace", 
        category: "Anti-tarnish Necklaces", 
        price: 52.00, 
        image: "https://images.unsplash.com/photo-1599643478518-17488fbbcd75?auto=format&fit=crop&w=800", 
        desc: "Exquisite geometric emerald-cut green stone pendant on an 18k gold vermeil water-resistant chain. Simple, daily luxury.",
        etsyLink: "https://www.etsy.com/uk/listing/4529214581/anti-tarnish-gold-plated-emerald-pendant"
    },
    { 
        id: 7, 
        sku: "SSCF-HPR-07", 
        name: "Gold Plated Stainless Steel Heart Pearl Bangle", 
        category: "Anti-tarnish Kada", 
        price: 58.00, 
        image: "https://images.unsplash.com/photo-1602173574767-37ac01994b2a?auto=format&fit=crop&w=800", 
        desc: "Romantic open cuff bangle featuring twin mother-of-pearl heart accents set in durable gold-plated stainless steel.",
        etsyLink: "https://www.etsy.com/uk/listing/4525317383/gold-plated-stainless-steel-heart-pearl"
    },
    { 
        id: 8, 
        sku: "TRNK-PAL-08", 
        name: "Traditional Kerala Palakka Choker Necklace Set with Jhumka Earrings", 
        category: "Traditional Jewellery", 
        price: 95.00, 
        image: "https://images.unsplash.com/photo-1617112837568-7c852445657b?auto=format&fit=crop&w=800", 
        desc: "Grand Kerala-style green Palakka short choker necklace paired with traditional bell-shaped Jhumka earrings. Classic temple jewelry.",
        etsyLink: "https://www.etsy.com/uk/listing/4525327387/traditional-kerala-palakka-choker"
    },
    { 
        id: 9, 
        sku: "TRNK-COIN-09", 
        name: "Ganapathy Coin Palakka Choker Traditional Heritage Necklace", 
        category: "Traditional Jewellery", 
        price: 110.00, 
        image: "https://images.unsplash.com/photo-1617112837568-7c852445657b?auto=format&fit=crop&w=800", 
        desc: "Traditional Kasu Mala coin choker featuring Lord Ganesha motifs interlaced with classic Palakka stones. Heirloom craftsmanship.",
        etsyLink: "https://www.etsy.com/uk/listing/4483539459/coin-palakka-choker-traditional-necklace"
    },

    // --- EXTENDED ARCHIVE (All point to official Etsy Shop fallback) ---
    { id: 10, sku: "SSNK-SNK-10", name: "18K Gold Liquid Snake Chain", category: "Anti-tarnish Necklaces", price: 40.00, image: "https://images.unsplash.com/photo-1599643478518-17488fbbcd75?auto=format&fit=crop&w=800", desc: "Sleek, liquid-gold effect snake chain. Essential daily wear that resists water and sweat.", etsyLink: "https://www.etsy.com/uk/shop/LilauraElegance" },
    { id: 11, sku: "SSBR-CLV-11", name: "Black Onyx Clover Bracelet", category: "Anti-tarnish Bracelets", price: 48.00, image: "https://images.unsplash.com/photo-1573408301185-9146fe634ad0?auto=format&fit=crop&w=800", desc: "Elegant black clover motifs set in an 18k gold-plated stainless steel chain.", etsyLink: "https://www.etsy.com/uk/shop/LilauraElegance" },
    { id: 12, sku: "SSFR-TRI-12", name: "Tri-Layered White Diamond Illusion Ring", category: "Finger Rings", price: 38.00, image: "https://images.unsplash.com/photo-1605100804763-247f67b3557e?auto=format&fit=crop&w=800", desc: "Statement ring giving the illusion of three stacked diamond bands. Completely waterproof.", etsyLink: "https://www.etsy.com/uk/shop/LilauraElegance" },
    { id: 13, sku: "TRNK-KASU-13", name: "Three Layered Grand Kasu Mala", category: "Traditional Jewellery", price: 150.00, image: "https://images.unsplash.com/photo-1617112837568-7c852445657b?auto=format&fit=crop&w=800", desc: "Grand three-tier Lakshmi coin necklace designed for bridal elegance and grand festivities.", etsyLink: "https://www.etsy.com/uk/shop/LilauraElegance" },
    { id: 14, sku: "SSCF-EVL-14", name: "Sapphire Blue Evil Eye Protection Cuff", category: "Anti-tarnish Kada", price: 58.00, image: "https://images.unsplash.com/photo-1602173574767-37ac01994b2a?auto=format&fit=crop&w=800", desc: "Protective Evil Eye open cuff featuring deep blue zirconia accents. Rigid and durable.", etsyLink: "https://www.etsy.com/uk/shop/LilauraElegance" },
    { id: 15, sku: "SSNK-BUT-15", name: "Golden Butterfly Curb Chain", category: "Anti-tarnish Necklaces", price: 50.00, image: "https://images.unsplash.com/photo-1599643478518-17488fbbcd75?auto=format&fit=crop&w=800", desc: "Bold curb link chain featuring a polished gold butterfly centerpiece.", etsyLink: "https://www.etsy.com/uk/shop/LilauraElegance" }
];

// --- 2. PAGE LOAD & RENDERING LOGIC ---
document.addEventListener('DOMContentLoaded', () => {
    // Review Bar Dismiss
    const reviewClose = document.getElementById('close-review');
    const reviewBar = document.getElementById('review-bar');
    if(reviewClose && reviewBar) {
        reviewClose.addEventListener('click', () => {
            reviewBar.style.display = 'none';
        });
    }

    // Dynamic Shop Grid
    const shopGrid = document.getElementById('shop-grid');
    if (shopGrid) {
        renderShop(products);
    }

    // Dynamic Product Detail
    const productDetail = document.getElementById('product-detail-container');
    if (productDetail) {
        const urlParams = new URLSearchParams(window.location.search);
        const pid = parseInt(urlParams.get('id'));
        const product = products.find(p => p.id === pid) || products[0]; // Fallback to item 1 if not found
        renderProductDetail(product);
    }
});

function renderShop(items) {
    const container = document.getElementById('shop-grid');
    if (!container) return; 
    
    container.innerHTML = items.map(p => `
        <div class="group cursor-pointer flex flex-col justify-between" onclick="window.location.href='product.html?id=${p.id}'">
            <div>
                <div class="w-full aspect-[3/4] overflow-hidden bg-gray-100 relative border border-lilaura-gold/10">
                    <img src="${p.image}" alt="${p.name}" loading="lazy" class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700">
                    <div class="absolute top-2 left-2 bg-black/70 backdrop-blur-sm text-lilaura-gold text-[9px] px-2 py-1 tracking-widest uppercase font-sans">Official Etsy Item</div>
                    <div class="absolute bottom-0 inset-x-0 bg-gradient-to-t from-black/60 to-transparent p-3 opacity-0 group-hover:opacity-100 transition-opacity flex justify-end">
                        <span class="text-white text-[10px] uppercase tracking-widest bg-lilaura-emerald px-2 py-1">View Details &rarr;</span>
                    </div>
                </div>
                <div class="mt-4 text-center">
                    <p class="text-[9px] tracking-[0.2em] uppercase text-lilaura-emerald mb-1">${p.category}</p>
                    <h3 class="font-serif text-base md:text-lg text-lilaura-text leading-snug group-hover:text-lilaura-gold transition-colors line-clamp-2">${p.name}</h3>
                </div>
            </div>
            <div class="mt-2 text-center">
                <p class="font-serif text-lg text-lilaura-gold font-semibold">£${p.price.toFixed(2)}</p>
            </div>
        </div>
    `).join('');
}

function renderProductDetail(p) {
    document.getElementById('p-image').src = p.image;
    document.getElementById('p-cat').innerText = p.category;
    document.getElementById('p-name').innerText = p.name;
    document.getElementById('p-price').innerText = `£${p.price.toFixed(2)}`;
    document.getElementById('p-desc').innerText = p.desc;
    document.getElementById('p-sku').innerText = `SKU: ${p.sku}`; 
    
    // Wire Primary Action Button directly to official Etsy Shop Listing
    const etsyBtn = document.getElementById('buy-etsy-btn');
    if (etsyBtn) {
        etsyBtn.href = p.etsyLink || "https://www.etsy.com/uk/shop/LilauraElegance";
    }

    // SEO Schema Injection
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
const ukLocations = [
    "London", "Birmingham", "Manchester", "Leicester", "Leeds", 
    "Edinburgh", "Glasgow", "Bristol", "Liverpool", "Nottingham", "Bradford"
];

const customerNames = [
    "Priya", "Sarah", "Anjali", "Jessica", "Fatima", 
    "Neha", "Emily", "Aisha", "Chloe", "Riya", 
    "Sonia", "Zara", "Meera", "Rebecca", "Simran"
];

function triggerFomoNotification() {
    const fomoPopup = document.getElementById('fomo-popup');
    if (!fomoPopup) return; 

    const randomCity = ukLocations[Math.floor(Math.random() * ukLocations.length)];
    const randomName = customerNames[Math.floor(Math.random() * customerNames.length)];
    const randomProduct = products[Math.floor(Math.random() * products.length)];

    document.getElementById('fomo-text').innerText = `${randomName} in ${randomCity} recently ordered via Etsy`;
    document.getElementById('fomo-product').innerText = randomProduct.name;

    fomoPopup.classList.add('show-fomo');

    setTimeout(() => {
        fomoPopup.classList.remove('show-fomo');
    }, 5000);
}

setTimeout(() => {
    triggerFomoNotification();
    setInterval(triggerFomoNotification, 60000); 
}, 8000);
