# LilAura Functionality Preservation Matrix — v2.1

## Preserved / upgraded
- Product catalogue and product JSON data
- Heritage / Everyday separation
- Product-level material and claim flags
- Static SEO product URLs
- Product schema and canonical metadata
- Etsy outbound purchase flow
- Single-product Etsy deep-link checkout
- Multi-item bag
- Remove item
- Empty bag
- Bag quantity badge
- Wishlist persistence
- Recently viewed products
- Product image hover / alternate visual where `imageHover` exists
- Product video hover where the source is an MP4
- Mobile product-image alternate view
- Search
- Collection filters
- Responsive product grid
- Product quick-view navigation
- Add-to-bag from catalogue cards
- Promotion banner and live countdown
- Responsive navigation / mobile menu
- WhatsApp concierge
- Email contact route
- Etsy shop route
- Reviews page
- Care page
- Policies / privacy pages
- SEO landing pages and journal architecture
- Robots and sitemap
- Accessibility skip link and semantic headings
- Reduced-motion-friendly visual transitions

## New in v2.1
- `/admin.html` Admin Studio
- Product CRUD editor
- Product Truth validation
- Promotion editor
- Site configuration editor
- Homepage merchandising controls
- JSON / configuration backup and import
- GitHub publish workflow
- Static product-page regeneration during GitHub publish
- Admin URL noindex/nofollow and robots exclusion

## Deliberately not carried forward
### Fabricated social-proof FOMO notifications
The former engine contained a notification that invented statements such as "Someone in London bought this 2 minutes ago" using random locations and times. This is not retained because it represents unverified purchase activity as fact. If real order/event data is later available, a truthful social-proof component can be integrated.

## Static-site constraint
The admin does not contain a GitHub secret. Direct publishing requires the store owner to enter a GitHub fine-grained token with repository Contents read/write permission for the session, or to download the generated files and upload them manually.
