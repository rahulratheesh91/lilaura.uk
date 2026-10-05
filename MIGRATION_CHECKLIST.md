# LilAura GitHub Pages Migration Checklist

## Upload
- [ ] Replace the current repository root with the contents of this folder, or merge carefully if other non-site files exist.
- [ ] Keep `CNAME` unchanged.
- [ ] Keep `.nojekyll`.

## Configuration
- [ ] Update `site-config.js` with the Web3Forms public access key if a form is required.
- [ ] Add GA4 measurement ID only when the analytics property is ready.

## DNS / GitHub Pages
- [ ] Confirm GitHub Pages is publishing from the intended branch/root.
- [ ] Confirm custom domain resolves to `www.lilaura.uk`.
- [ ] Confirm HTTPS is enabled.

## Search
- [ ] Verify `robots.txt`.
- [ ] Verify `sitemap.xml`.
- [ ] Add the domain/property in Google Search Console.
- [ ] Submit the sitemap.
- [ ] Inspect the homepage, category pages and a sample of product URLs.
- [ ] Monitor indexing and crawl errors.

## Commerce
- [ ] Test every Etsy product link.
- [ ] Test the legacy `/product.html?id=` redirect for at least IDs 1, 5, 16, 23 and 37.
- [ ] Test the shopping bag and Etsy checkout handoff.
- [ ] Test WhatsApp Concierge links.

## Claims / legal
- [ ] Verify all product material and wear claims against supplier/product documentation.
- [ ] Review privacy, returns and terms pages before treating them as final legal advice.
- [ ] Do not publish unsupported waterproof, anti-tarnish, hypoallergenic, nickel-free, lead-free or certification claims.

## Performance
- [ ] Replace external Etsy-hosted product images with a controlled image CDN or repository/CDN pipeline when practical.
- [ ] Convert commercial master imagery to WebP/AVIF.
- [ ] Add product-specific hero/model/macro images as they become available.
