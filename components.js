/* LILAURA APEX X™: GLOBAL COMPONENT FACTORY */

const LILAURA_UI = {
    renderHeader: () => `
        <header class="header">
            <nav class="nav">
                <div class="nav-left"><a href="shop">Shop</a><a href="about">Our Story</a></div>
                <a class="logo" href="index">LilAura<small>JEWELLERY · UK</small></a>
                <div class="nav-right">
                    <a href="concierge">Concierge</a>
                    <button class="cart" type="button" data-action="open-cart" aria-label="Open bag">Bag <span class="bubble" id="cart-count">0</span></button>
                    <button type="button" class="menu-toggle" data-action="toggle-menu" aria-expanded="false" aria-controls="lilaura-menu" aria-label="Toggle navigation">☰</button>
                </div>
            </nav>
            <div class="mega" id="lilaura-menu">
                <div class="mega-grid">
                    <div><h4>Explore LilAura</h4><a href="shop">All Jewellery</a><a href="shop?cat=kadas">Kadas & Cuffs</a><a href="shop?cat=necklaces">Necklaces</a><a href="shop?cat=traditional">Traditional Jewellery</a><a href="shop?cat=earrings">Earrings & Studs</a><a href="shop?cat=rings">Rings</a></div>
                    <div><h4>Discover</h4><a href="about">Our Story</a><a href="care">Jewellery Care</a><a href="policies">Policies</a><a href="reviews">Reviews</a><a href="contact">Contact</a></div>
                </div>
            </div>
        </header>
    `,
    renderFooter: () => `
        <footer>
            <div class="foot" style="grid-template-columns: 1.5fr repeat(3, 1fr);">
                <div>
                    <div class="foot-logo">LilAura</div>
                    <p style="max-width:340px;line-height:1.8;color:rgba(255,255,255,.72);font-size:13px">Jewellery inspired by Indian heritage and modern everyday elegance.</p>
                </div>
                <div>
                    <h4>Explore</h4>
                    <a href="shop">Shop all</a>
                    <a href="shop?cat=anti-tarnish">Everyday wear Anti-tarnish jewellery</a>
                    <a href="shop?cat=traditional">Traditional Heritage jewellery</a>
                </div>
                <div>
                    <h4>Customer Care</h4>
                    <a href="care">Jewellery care</a>
                    <a href="policies">Policies</a>
                    <a href="contact">Contact us</a>
                </div>
                <div>
                    <h4>About LilAura</h4>
                    <a href="about">Our story</a>
                    <a href="reviews">Reviews</a>
                    <a href="privacy">Privacy</a>
                    <a href="https://www.etsy.com/uk/shop/LilauraElegance" target="_blank" rel="noopener noreferrer">Shop on Etsy ↗</a>
                </div>
            </div>
            <div class="copy">
                <span>© ${new Date().getFullYear()} LilAura UK</span>
                <span>Thoughtfully curated jewellery</span>
            </div>
        </footer>
    `,
    renderDrawer: () => `
        <div class="overlay" id="overlay" data-action="close-cart"></div>
        <aside class="drawer" id="cart-drawer" role="dialog" aria-modal="true" aria-labelledby="cart-title">
            <div class="drawer-head">
                <h3 id="cart-title">Your Bag</h3>
                <button class="close" type="button" data-action="close-cart" aria-label="Close bag">×</button>
            </div>
            <div id="cartItems"></div>
            <div id="cartBottom">
                <div class="cart-total"><span>Estimated subtotal</span><strong id="cart-subtotal">£0.00</strong></div>
                <p style="font-size:12px;line-height:1.6;color:var(--muted);margin:0 0 16px">Your bag is a LilAura browsing list. Checkout and final totals are handled on Etsy; items are not automatically transferred to Etsy.</p>
                <button class="checkout" type="button" data-action="cart-checkout">Continue to Etsy shop</button>
            </div>
        </aside>
        <div class="toast" id="toast"></div>
    `,
    renderScrollButton: () => `
        <button id="lilaura-scroll-btn" class="scroll-fab" aria-label="Scroll navigation">
            <span class="scroll-arrow">↓</span>
        </button>
    `
};

// Injection Execution
document.addEventListener('DOMContentLoaded', () => {
    const headerMount = document.getElementById('lilaura-header-mount');
    const footerMount = document.getElementById('lilaura-footer-mount');
    
    if (headerMount && !headerMount.dataset.mounted) {
        headerMount.dataset.mounted = 'true';
        headerMount.innerHTML = LILAURA_UI.renderHeader();
    }
    
    if (footerMount && !footerMount.dataset.mounted) {
        footerMount.dataset.mounted = 'true';
        footerMount.innerHTML = LILAURA_UI.renderFooter();
        
        // Inject Cart UI if missing
        if (!document.getElementById('lilaura-cart-ui')) {
            const cartUI = document.createElement('div');
            cartUI.id = 'lilaura-cart-ui';
            cartUI.innerHTML = LILAURA_UI.renderDrawer();
            document.body.appendChild(cartUI);
        }

        // Inject Dynamic Scroll Button
        if (!document.getElementById('lilaura-scroll-btn')) {
            document.body.insertAdjacentHTML('beforeend', LILAURA_UI.renderScrollButton());
        }
    }
});
