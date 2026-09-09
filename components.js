/* LILAURA APEX X™: GLOBAL COMPONENT FACTORY */

const LILAURA_UI = {
    renderHeader: () => `
        <header class="header">
            <nav class="nav">
                <div class="nav-left"><a href="index.html">Home</a><a href="shop.html">Collections</a><a href="about.html">Our Story</a></div>
                <a class="logo" href="index.html">LilAura<small>Elegance Made Eternal</small></a>
                <div class="nav-right"><button class="wish" onclick="window.location.href='shop.html'">♡</button><button class="cart" id="cartBtn">Bag <span class="bubble" id="cartCount">0</span></button></div>
            </nav>
            <div class="mega" id="mega">
                <div class="mega-grid">
                    <a class="mega-feature" href="shop.html"><span>New Season →</span></a>
                    <div><h4>Shop</h4><a href="shop.html">New Arrivals</a><a href="shop.html">Bestsellers</a><a href="shop.html">Gift Edit</a><a href="shop.html">Under £35</a></div>
                    <div><h4>Jewellery</h4><a href="shop.html">Necklaces</a><a href="shop.html">Earrings</a><a href="shop.html">Bracelets</a><a href="shop.html">Kadas & Cuffs</a></div>
                    <div><h4>Collections</h4><a href="shop.html">Heritage Brass</a><a href="shop.html">Anti-Tarnish</a><a href="shop.html">Statement</a><a href="shop.html">Everyday</a></div>
                    <div>
                        <h4>Discover</h4>
                        <a href="about.html">Our Story</a>
                        <a href="care.html">Jewellery Care</a>
                        <a href="reviews.html">Reviews</a>
                        <a href="concierge.html">Concierge</a>
                        <a href="policies.html">Legal & Policies</a>
                    </div>
                </div>
            </div>
        </header>
    `,
    renderFooter: () => `
        <footer>
            <div class="foot" style="grid-template-columns: 1.5fr repeat(4, 1fr);">
                <div>
                    <div class="foot-logo">LILAURA</div>
                    <p style="max-width:300px;color:var(--soft); margin-top:15px; line-height: 1.8; font-size:14px;">Modern heritage jewellery. Designed to be lived in.</p>
                </div>
                <div>
                    <h4>Shop</h4>
                    <a href="shop.html">New arrivals</a>
                    <a href="shop.html">Bestsellers</a>
                    <a href="shop.html">Anti-tarnish</a>
                    <a href="shop.html">Gift edit</a>
                </div>
                <div>
                    <h4>Discover</h4>
                    <a href="about.html">Our story</a>
                    <a href="care.html">Jewellery care</a>
                    <a href="reviews.html">Reviews</a>
                    <a href="concierge.html">Concierge</a>
                </div>
                <div>
                    <h4>Help & Legal</h4>
                    <a href="contact.html">Contact Us</a>
                    <a href="policies.html#returns">Returns Policy</a>
                    <a href="policies.html#terms">Terms of Service</a>
                    <a href="privacy.html">Privacy Notice</a> <!-- UPDATED ROUTING -->
                </div>
                <div>
                    <h4>Connect</h4>
                    <a href="https://www.etsy.com/uk/shop/LilauraElegance" target="_blank">Etsy Shop</a>
                    <a href="https://instagram.com/lilaura.uk" target="_blank">Instagram</a>
                    <a href="https://wa.me/447303179015" target="_blank">WhatsApp</a>
                </div>
            </div>
            <div class="copy">
                <span>© ${new Date().getFullYear()} LilAura UK. All rights reserved.</span>
                <span>Modern heritage. Made to be worn.</span>
            </div>
        </footer>
    `,
    renderDrawer: () => `
        <div class="overlay" id="overlay"></div>
        <aside class="drawer" id="drawer">
            <div class="drawer-head"><h3>Your bag</h3><button class="close" id="closeDrawer">×</button></div>
            <div id="cartItems"></div>
            <div id="cartBottom"></div>
        </aside>
        <div class="toast" id="toast"></div>
    `
};

// Injection Execution
document.addEventListener('DOMContentLoaded', () => {
    const headerMount = document.getElementById('lilaura-header-mount');
    const footerMount = document.getElementById('lilaura-footer-mount');
    
    if (headerMount) headerMount.innerHTML = LILAURA_UI.renderHeader();
    if (footerMount) {
        footerMount.innerHTML = LILAURA_UI.renderFooter();
        footerMount.insertAdjacentHTML('afterend', LILAURA_UI.renderDrawer());
    }
});
