/* LILAURA CORE ENGINE 
  Handles Product Data, Cart Logic, and WhatsApp Integration
*/

// --- 1. PRODUCT DATABASE ---
const products = [
    // Anti-tarnish Necklaces
    {
        id: 1,
        name: "The Rani Kundan Choker",
        category: "Anti-tarnish Necklaces",
        price: 120.00,
        image: "https://images.unsplash.com/photo-1599643478518-17488fbbcd75?q=80&w=800&auto=format&fit=crop",
        desc: "A timeless Kundan piece treated with our proprietary anti-tarnish coating. Water-resistant and heirloom quality.",
        instaLink: "https://instagram.com/lilaura.uk/"
    },
    {
        id: 2,
        name: "Emerald Drop Pendant",
        category: "Anti-tarnish Necklaces",
        price: 85.00,
        image: "https://images.unsplash.com/photo-1601121141461-9d6647bca1ed?q=80&w=800&auto=format&fit=crop",
        desc: "Minimalist luxury. Gold vermeil chain with a synthetic emerald stone.",
        instaLink: "https://instagram.com/lilaura.uk/"
    },
    {
        id: 3,
        name: "Temple Coin Necklace",
        category: "Anti-tarnish Necklaces",
        price: 95.00,
        image: "https://images.unsplash.com/photo-1611591437281-460bfbe1220a?q=80&w=800&auto=format&fit=crop",
        desc: "Inspired by Southern Indian temple jewelry, reimagined for modern daily wear.",
        instaLink: "https://instagram.com/lilaura.uk/"
    },

    // Anti-tarnish Bracelets
    {
        id: 4,
        name: "Infinity Gold Link",
        category: "Anti-tarnish Bracelets",
        price: 55.00,
        image: "https://images.unsplash.com/photo-1611591437281-460bfbe1220a?q=80&w=800&auto=format&fit=crop", // Placeholder
        desc: "A dainty bracelet that refuses to fade. Perfect for stacking.",
        instaLink: "https://instagram.com/lilaura.uk/"
    },
    {
        id: 5,
        name: "Polki Cuff Bracelet",
        category: "Anti-tarnish Bracelets",
        price: 110.00,
        image: "https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?q=80&w=800&auto=format&fit=crop",
        desc: "Traditional Polki design on a flexible, anti-tarnish open cuff.",
        instaLink: "https://instagram.com/lilaura.uk/"
    },

    // Anti-tarnish Kada
    {
        id: 6,
        name: "Royal Rajwadi Kada",
        category: "Anti-tarnish Kada",
        price: 140.00,
        image: "https://images.unsplash.com/photo-1602173574767-37ac01994b2a?q=80&w=800&auto=format&fit=crop",
        desc: "Heavy look, light weight. 18k Gold plating with guaranteed longevity.",
        instaLink: "https://instagram.com/lilaura.uk/"
    },
    {
        id: 7,
        name: "Sleek Daily Kada",
        category: "Anti-tarnish Kada",
        price: 60.00,
        image: "https://images.unsplash.com/photo-1602173574767-37ac01994b2a?q=80&w=800&auto=format&fit=crop",
        desc: "For the modern woman. Simple, elegant, and waterproof.",
        instaLink: "https://instagram.com/lilaura.uk/"
    },

    // Traditional Jewellery
    {
        id: 8,
        name: "Bridal Maang Tikka",
        category: "Traditional Jewellery",
        price: 45.00,
        image: "https://images.unsplash.com/photo-1617112837568-7c852445657b?q=80&w=800&auto=format&fit=crop",
        desc: "Classic heritage design for weddings and festivals.",
        instaLink: "https://instagram.com/lilaura.uk/"
    },
    {
        id: 9,
        name: "Jhumka Statement Earrings",
        category: "Traditional Jewellery",
        price: 75.00,
        image: "https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?q=80&w=800&auto=format&fit=crop",
        desc: "Oversized Jhumkas with pearl detailing.",
        instaLink: "https://instagram.com/lilaura.uk/"
    },
    {
        id: 10,
        name: "Navratna Choker Set",
        category: "Traditional Jewellery",
        price: 200.00,
        image: "https://images.unsplash.com/photo-1599643478518-17488fbbcd75?q=80&w=800&auto=format&fit=crop",
        desc: "The nine gems of royalty. A complete set for the grandest occasions.",
        instaLink: "https://instagram.com/lilaura.uk/"
    }
];

// --- 2. CART LOGIC ---
let cart = JSON.parse(localStorage.getItem('lilauraCart')) || [];

function addToCart(productId) {
    const product = products.find(p => p.id === productId);
    if (product) {
        cart.push(product);
        localStorage.setItem('lilauraCart', JSON.stringify(cart));
        updateCartCount();
        alert(`${product.name} added to your cart.`);
    }
}

function updateCartCount() {
    const count = cart.length;
    const badges = document.querySelectorAll('.cart-count');
    badges.forEach(b => b.innerText = count);
}

function checkoutWhatsApp() {
    if (cart.length === 0) {
        alert("Your cart is empty.");
        return;
    }

    let message = "Hello Lilaura! I would like to order the following:%0A%0A";
    let total = 0;

    cart.forEach((item, index) => {
        message += `${index + 1}. ${item.name} - £${item.price}%0A`;
        total += item.price;
    });

    message += `%0A*Total Price: £${total}*`;
    message += "%0A%0APlease confirm availability and payment details.";

    const phone = "447303179015";
    window.open(`https://wa.me/${phone}?text=${message}`, '_blank');
}

function clearCart() {
    cart = [];
    localStorage.setItem('lilauraCart', JSON.stringify(cart));
    updateCartCount();
    alert("Cart cleared.");
}

// --- 3. PAGE LOAD LOGIC ---
document.addEventListener('DOMContentLoaded', () => {
    updateCartCount();

    // Floating Review Bar Logic
    const reviewClose = document.getElementById('close-review');
    const reviewBar = document.getElementById('review-bar');
    if(reviewClose && reviewBar) {
        reviewClose.addEventListener('click', () => {
            reviewBar.style.display = 'none';
        });
    }
  
    // Dynamic Shop Rendering
    const shopGrid = document.getElementById('shop-grid');
    if (shopGrid) {
        renderShop(products);
    }

    // Dynamic Product Details Rendering
    const productDetail = document.getElementById('product-detail-container');
    if (productDetail) {
        const urlParams = new URLSearchParams(window.location.search);
        const pid = parseInt(urlParams.get('id'));
        const product = products.find(p => p.id === pid);
        if (product) renderProductDetail(product);
    }
});

function renderShop(items) {
    const container = document.getElementById('shop-grid');
    container.innerHTML = items.map(p => `
        <div class="group cursor-pointer" onclick="window.location.href='product.html?id=${p.id}'">
            <div class="w-full aspect-[3/4] overflow-hidden bg-gray-200">
                <img src="${p.image}" alt="${p.name}" class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500">
            </div>
            <div class="mt-4 text-center">
                <p class="text-xs tracking-widest uppercase text-lilaura-emerald">${p.category}</p>
                <h3 class="font-serif text-xl text-lilaura-text mt-1 group-hover:text-lilaura-gold transition-colors">${p.name}</h3>
                <p class="font-sans text-lilaura-subtle mt-1">£${p.price.toFixed(2)}</p>
            </div>
        </div>
    `).join('');
}

function renderProductDetail(p) {

// Add this inside your renderProductDetail function
const schemaData = {
  "@context": "https://schema.org/",
  "@type": "Product",
  "name": p.name,
  "image": [
    "https://www.lilaura.uk/" + p.image
  ],
  "description": p.desc,
  "sku": "LILAURA-" + p.id,
  "brand": {
    "@type": "Brand",
    "name": "Lilaura"
  },
  "offers": {
    "@type": "Offer",
    "url": window.location.href,
    "priceCurrency": "GBP",
    "price": p.price,
    "priceValidUntil": "2025-11-20",
    "itemCondition": "https://schema.org/NewCondition",
    "availability": "https://schema.org/InStock"
  }
};

const script = document.createElement('script');
script.type = "application/ld+json";
script.text = JSON.stringify(schemaData);
document.head.appendChild(script);
  
  document.getElementById('p-image').src = p.image;
    document.getElementById('p-cat').innerText = p.category;
    document.getElementById('p-name').innerText = p.name;
    document.getElementById('p-price').innerText = `£${p.price.toFixed(2)}`;
    document.getElementById('p-desc').innerText = p.desc;
    document.getElementById('p-insta').href = p.instaLink;
    
    // Bind Add to Cart Button
    const btn = document.getElementById('add-to-cart-btn');
    btn.onclick = () => addToCart(p.id);
}

// Filter Function
function filterCategory(cat) {
    if(cat === 'All') {
        renderShop(products);
    } else {
        const filtered = products.filter(p => p.category === cat);
        renderShop(filtered);
    }
}
// --- 4. SOCIAL PROOF (FOMO) LOGIC ---
const ukLocations = [
    "London", "Birmingham", "Manchester", "Leicester", "Leeds", 
    "Edinburgh", "Glasgow", "Bristol", "Liverpool", "Nottingham", "Bradford"
];

const customerNames = [
    "Ms.Bennett", "Sarah", "Anjali", "Jessica", "Mrs.Whitby", 
    "Neha", "Emily", "Ms.Kensington", "Chloe", "Riya", 
    "Ms.Fletcher", "Zara", "Mrs.Wright", "Rebecca", "Simran"
];

function triggerFomoNotification() {
    const fomoPopup = document.getElementById('fomo-popup');
    
    // If the element doesn't exist on this page, stop running
    if (!fomoPopup) return; 

    // Get a random city
    const randomCity = ukLocations[Math.floor(Math.random() * ukLocations.length)];
    
    // Get a random name
    const randomName = customerNames[Math.floor(Math.random() * customerNames.length)];
    
    // Get a random product from your existing 'products' array
    const randomProduct = products[Math.floor(Math.random() * products.length)];

    // Update the text in the HTML
    // It will now say: "Priya in London recently purchased"
    document.getElementById('fomo-text').innerText = `${randomName} in ${randomCity} purchased`;
    document.getElementById('fomo-product').innerText = randomProduct.name;

    // Slide it in (Make sure CSS class 'show-fomo' is in your styles)
    fomoPopup.classList.add('show-fomo');

    // Slide it out after 5 seconds
    setTimeout(() => {
        fomoPopup.classList.remove('show-fomo');
    }, 5000);
}

// Start the cycle
// First popup appears after 5 seconds
setTimeout(() => {
    triggerFomoNotification();
    // Then a new one every 25 seconds
    setInterval(triggerFomoNotification, 25000);
}, 5000);
