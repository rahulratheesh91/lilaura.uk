/* LILAURA APEX X™: GLOBAL COMPONENT FACTORY */
(() => {
  'use strict';
  const GA_MEASUREMENT_ID = 'G-82YQHC8Q3X';
  const CONSENT_KEY = 'lilaura_cookie_consent';

  class LilAuraLayout {
    static safeReadConsent() {
      try { return localStorage.getItem(CONSENT_KEY); } catch (_) { return null; }
    }
    static safeWriteConsent(value) {
      try { localStorage.setItem(CONSENT_KEY, value); } catch (error) { console.warn('[LilAura] Consent preference could not be saved.'); }
    }
    static injectGA4() {
      if (window.ga4Loaded || document.getElementById('ga4-script')) return;
      window.ga4Loaded = true;
      window.dataLayer = window.dataLayer || [];
      window.gtag = window.gtag || function gtag() { window.dataLayer.push(arguments); };
      window.gtag('consent', 'default', {
        analytics_storage: 'denied', ad_storage: 'denied', ad_user_data: 'denied', ad_personalization: 'denied', wait_for_update: 500
      });
      window.gtag('js', new Date());
      window.gtag('config', GA_MEASUREMENT_ID, { send_page_view: false });
      const script = document.createElement('script');
      script.id = 'ga4-script'; script.async = true;
      script.src = `https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`;
      document.head.appendChild(script);
      this.checkExistingConsent();
    }
    static checkExistingConsent() {
      const saved = this.safeReadConsent();
      if (saved === 'accepted') this.updateConsent(true, false);
      else if (saved === 'rejected') this.updateConsent(false, false);
      else this.renderConsentBanner();
    }
    static updateConsent(accepted, persist = true) {
      if (persist) this.safeWriteConsent(accepted ? 'accepted' : 'rejected');
      if (window.gtag) {
        window.gtag('consent', 'update', { analytics_storage: accepted ? 'granted' : 'denied', ad_storage: 'denied', ad_user_data: 'denied', ad_personalization: 'denied' });
        if (accepted && !window.__lilauraPageViewSent) {
          window.__lilauraPageViewSent = true;
          window.gtag('event', 'page_view', { page_title: document.title, page_location: location.href, page_path: location.pathname + location.search });
        }
      }
      document.getElementById('lilaura-consent-banner')?.remove();
    }
    static renderConsentBanner() {
      if (document.getElementById('lilaura-consent-banner') || !document.body) return;
      const banner = document.createElement('section');
      banner.id = 'lilaura-consent-banner'; banner.setAttribute('role', 'region'); banner.setAttribute('aria-label', 'Cookie preferences');
      banner.innerHTML = `<div class="lilaura-consent-copy">We use optional analytics to understand visits and improve LilAura. You can reject optional analytics and still use the website. Read our <a href="privacy.html">Privacy Policy</a>.</div><div class="lilaura-consent-actions"><button type="button" id="cookie-reject">Reject optional analytics</button><button type="button" id="cookie-accept">Accept analytics</button></div>`;
      const style = document.createElement('style');
      style.textContent = `#lilaura-consent-banner{position:fixed;z-index:10000;left:16px;right:16px;bottom:16px;max-width:1100px;margin:auto;padding:18px 22px;background:#1a1a1a;color:#fff;box-shadow:0 4px 24px #0003;display:flex;gap:20px;align-items:center;justify-content:space-between;font:14px/1.55 'Proza Libre',sans-serif}#lilaura-consent-banner a{color:#e2c17b;text-decoration:underline}#lilaura-consent-banner .lilaura-consent-actions{display:flex;gap:10px;flex-wrap:wrap}#lilaura-consent-banner button{min-height:44px;padding:10px 14px;border:1px solid #fff;background:transparent;color:#fff;cursor:pointer;font:inherit}#lilaura-consent-banner #cookie-accept{background:#d4af37;color:#111;border-color:#d4af37}@media(max-width:700px){#lilaura-consent-banner{left:8px;right:8px;bottom:8px;display:block;padding:16px}#lilaura-consent-banner .lilaura-consent-actions{margin-top:12px}#lilaura-consent-banner button{flex:1}}`;
      if (!document.getElementById('lilaura-consent-styles')) { style.id = 'lilaura-consent-styles'; document.head.appendChild(style); }
      document.body.appendChild(banner);
      document.getElementById('cookie-accept').addEventListener('click', () => this.updateConsent(true));
      document.getElementById('cookie-reject').addEventListener('click', () => this.updateConsent(false));
    }
  }
  window.LilAuraLayout = LilAuraLayout;

  document.addEventListener('DOMContentLoaded', () => {
      LilAuraLayout.injectGA4();

      const header = document.querySelector('#lilaura-header-mount');
      if (header && !header.dataset.mounted) {
        header.dataset.mounted = 'true';
        header.innerHTML = `<header class="header"><nav class="nav" aria-label="Main navigation"><div class="nav-left"><a href="shop" aria-label="Open collection">Shop</a><a href="about">Our Story</a></div><a class="logo" href="index" aria-label="LilAura home">LilAura<small>JEWELLERY · UK</small></a><div class="nav-right"><a href="concierge">Concierge</a><button class="cart" type="button" data-action="open-cart" aria-label="Open bag">Bag <span class="bubble" id="cart-count">0</span></button><button type="button" class="menu-toggle" data-action="toggle-menu" aria-expanded="false" aria-controls="lilaura-menu" aria-label="Toggle navigation">☰</button></div></nav><div class="mega" id="lilaura-menu"><div class="mega-grid"><div><h4>Explore LilAura</h4><a href="shop">All Jewellery</a><a href="shop?cat=anti-tarnish">Everyday Anti-Tarnish</a><a href="shop?cat=traditional">Traditional Heritage</a><a href="shop?cat=necklaces">Necklaces</a><a href="shop?cat=earrings">Earrings & Studs</a><a href="shop?cat=rings">Rings</a></div><div><h4>Discover</h4><a href="about">Our Story</a><a href="care">Jewellery Care</a><a href="policies">Policies</a><a href="reviews">Reviews</a><a href="contact">Contact</a></div></div></div></header>`;
      }
      
      const footer = document.querySelector('#lilaura-footer-mount');
      if (footer && !footer.dataset.mounted) {
        footer.dataset.mounted = 'true';
        footer.innerHTML = `<footer><div class="foot"><div><div class="foot-logo">LilAura</div><p style="max-width:340px;line-height:1.8;color:rgba(255,255,255,.72);font-size:13px">Jewellery inspired by Indian heritage and modern everyday elegance.</p></div><div><h4>Explore</h4><a href="shop">Shop all</a><a href="shop?cat=anti-tarnish">Everyday Anti-Tarnish</a><a href="shop?cat=traditional">Traditional Heritage</a></div><div><h4>Customer care</h4><a href="care">Jewellery care</a><a href="policies">Policies</a><a href="contact">Contact us</a></div><div><h4>About LilAura</h4><a href="about">Our story</a><a href="reviews">Reviews</a><a href="privacy">Privacy</a><a href="https://www.etsy.com/uk/shop/LilauraElegance" target="_blank" rel="noopener noreferrer">Shop on Etsy ↗</a></div></div><div class="copy"><span>© ${new Date().getFullYear()} LilAura UK</span><span>Thoughtfully curated jewellery</span></div></footer>`;
      }
      
      if (!document.querySelector('#lilaura-cart-ui')) {
        const cartUI = document.createElement('div');
        cartUI.id = 'lilaura-cart-ui';
        cartUI.innerHTML = `<button class="overlay" type="button" data-action="close-cart" aria-label="Close bag"></button><aside class="drawer" id="cart-drawer" role="dialog" aria-modal="true" aria-labelledby="cart-title"><div class="drawer-head"><h3 id="cart-title">Your Bag</h3><button class="close" type="button" data-action="close-cart" aria-label="Close bag">×</button></div><div id="cartItems"></div><div id="cartBottom"><div class="cart-total"><span>Estimated subtotal</span><strong id="cart-subtotal">£0.00</strong></div><p style="font-size:12px;line-height:1.6;color:var(--muted);margin:0 0 16px">Your bag is a LilAura browsing list. Checkout and final totals are handled on Etsy; items are not automatically transferred to Etsy.</p><button class="checkout" type="button" data-action="cart-checkout">Continue to Etsy shop</button></div></aside>`;
        document.body.appendChild(cartUI);
      }

      if (!document.querySelector('#lilaura-scroll-btn')) {
        const scrollBtn = document.createElement('button');
        scrollBtn.id = 'lilaura-scroll-btn';
        scrollBtn.className = 'scroll-action-btn';
        scrollBtn.setAttribute('aria-label', 'Scroll to bottom');
        scrollBtn.innerHTML = `↓`;
        document.body.appendChild(scrollBtn);
      }
  });
})();
