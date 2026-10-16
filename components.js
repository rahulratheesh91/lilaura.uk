// LilAura Shared Components & Layout Injection - Release 3
const GA_MEASUREMENT_ID = 'G-82YQHC8Q3X';

class LilAuraLayout {
    static injectGA4() {
        // Prevent duplicate injection
        if (window.ga4Loaded || document.getElementById('ga4-script')) return;
        window.ga4Loaded = true;

        // Default consent state (Denied until user explicitly accepts)
        window.dataLayer = window.dataLayer || [];
        function gtag(){dataLayer.push(arguments);}
        window.gtag = gtag;

        gtatif('consent', 'default', {
            'analytics_storage': 'denied',
            'ad_storage': 'denied',
            'ad_user_data': 'denied',
            'ad_personalization': 'denied',
            'wait_for_update': 500
        });

        gtag('js', new Date());
        gtag('config', GA_MEASUREMENT_ID, { 'send_page_view': true });

        const script = document.createElement('script');
        script.id = 'ga4-script';
        script.async = true;
        script.src = `https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`;
        document.head.appendChild(script);

        LilAuraLayout.checkExistingConsent();
    }

    static checkExistingConsent() {
        const savedConsent = localStorage.getItem('lilaura_cookie_consent');
        if (savedConsent === 'accepted') {
            LilAuraLayout.updateConsent(true);
        } else if (savedConsent === 'rejected') {
            LilAuraLayout.updateConsent(false);
        } else {
            LilAuraLayout.renderConsentBanner();
        }
    }

    static updateConsent(accepted) {
        localStorage.setItem('lilaura_cookie_consent', accepted ? 'accepted' : 'rejected');
        if (window.gtag) {
            window.gtag('consent', 'update', {
                'analytics_storage': accepted ? 'granted' : 'denied',
                'ad_storage': 'denied',
                'ad_user_data': 'denied',
                'ad_personalization': 'denied'
            });
        }
        const banner = document.getElementById('lilaura-consent-banner');
        if (banner) banner.remove();
    }

    static renderConsentBanner() {
        if (document.getElementById('lilaura-consent-banner')) return;
        const banner = document.createElement('div');
        banner.id = 'lilaura-consent-banner';
        banner.style.cssText = `
            position: fixed; bottom: 0; left: 0; width: 100%; background: #111; color: #fff;
            padding: 16px 24px; display: flex; justify-content: space-between; align-items: center;
            z-index: 10000; font-family: inherit; font-size: 14px; box-shadow: 0 -4px 12px rgba(0,0,0,0.15);
        `;
        banner.innerHTML = `
            <div style="max-width: 800px; line-height: 1.5;">
                We use analytics cookies to understand visitor interactions and improve your experience on LilAura. 
                You can accept or reject optional analytics storage. Read our <a href="about.html" style="color: #d4af37; text-decoration: underline;">Privacy Policy</a>.
            </div>
            <div style="display: flex; gap: 12px;">
                <button id="cookie-reject" style="background: transparent; border: 1px solid #fff; color: #fff; padding: 8px 16px; cursor: pointer; border-radius: 4px;">Reject</button>
                <button id="cookie-accept" style="background: #d4af37; border: none; color: #111; padding: 8px 16px; cursor: pointer; border-radius: 4px; font-weight: 600;">Accept</button>
            </div>
        `;
        document.body.appendChild(banner);

        document.getElementById('cookie-accept').addEventListener('click', () => LilAuraLayout.updateConsent(true));
        document.getElementById('cookie-reject').addEventListener('click', () => LilAuraLayout.updateConsent(false));
    }
}

document.addEventListener('DOMContentLoaded', () => {
    LilAuraLayout.injectGA4();
});
