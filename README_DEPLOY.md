# LilAura SEO Commerce Rebuild v2.0

Static GitHub Pages rebuild generated from the supplied LilAura repository and product catalogue.

## What changed
- Heritage vs Everyday product-truth separation.
- Static, crawlable product pages under `/products/<slug>/`.
- Product JSON-LD with price, SKU, availability and product image.
- Dedicated SEO landing pages for Kerala, Palakka, Meenakari, anti-tarnish, 18K PVD, necklaces, earrings, cuffs/bangles and gifts.
- Journal hub + evergreen topical articles.
- Canonicals, Open Graph, sitemap and robots.txt.
- Responsive luxury UI with accessible controls and reduced-motion support.
- Legacy `product.html?id=` URLs redirect client-side to the new static product URL.
- Existing Etsy checkout remains the transaction endpoint.

## Before publishing
1. Replace `REPLACE_WITH_YOUR_WEB3FORMS_ACCESS_KEY` in `site-config.js` if you want to activate a Web3Forms contact form.
2. Replace `REPLACE_WITH_GA4_MEASUREMENT_ID` only after creating the analytics property; do not paste secrets into the repository.
3. Verify every product claim against the supplier/product record. The generated catalogue deliberately does **not** add waterproof or anti-tarnish claims to Heritage products.
4. Test all Etsy URLs and images.
5. Submit `https://www.lilaura.uk/sitemap.xml` to Google Search Console after deployment.

## GitHub Pages
Upload the contents of this folder to the repository root. Keep `CNAME` as the custom-domain file.

## Important
This is a static GitHub Pages implementation. Checkout remains on Etsy; it is not a replacement payment processor.

## Admin Studio v2.1
Open `https://www.lilaura.uk/admin.html` after deployment. The admin is a browser-based CMS for this static GitHub Pages architecture.

### What it can manage
- Products: add, edit, delete, price, stock, SKU, world, material, images, Etsy URL, SEO fields and product-level claims.
- Product Truth validation: prevents Heritage products from being published with PVD, anti-tarnish, waterproof or water-resistant flags unless you deliberately remove the validation rule in code.
- Promotion bar: enable/disable campaign, title, offer text and countdown end time.
- Site configuration: brand, domain, Etsy, Instagram, WhatsApp, email and analytics configuration.
- Homepage controls: hero copy and featured product IDs.
- Backups/imports: download or restore `products.json` and `site-config.js`.
- GitHub publishing: generates the updated static product pages and commits them to the configured repository.

### GitHub publishing security
The admin does not contain a GitHub secret. Enter a fine-grained GitHub Personal Access Token only when you are ready to publish. The token is kept in browser memory for that session and is not written to `localStorage` or committed to the repository. Give the token only the minimum required repository permission: `Contents: Read and write`.

### Important static-site limitation
A browser admin cannot safely update a GitHub repository without authentication. The Publish to GitHub screen therefore requires your own token. If you prefer not to use a token in the browser, use the admin's Download buttons and upload the generated files manually to GitHub.

The admin URL is marked `noindex,nofollow` and excluded from `robots.txt`, but this is not an authentication mechanism. Do not treat `/admin.html` as a secret URL.
