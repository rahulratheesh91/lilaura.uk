/* LILAURA CORE ENGINE - UPDATED FROM CSV
   Contains full product catalog, WhatsApp Checkout, and FOMO Logic
*/

// --- 1. PRODUCT DATABASE ---
// Note: I have assigned placeholder images and estimated prices. 
// You should update specific prices if needed.
const products = [
    // --- Anti-tarnish Bracelets (Chain Bracelet) ---
    { id: 101, sku: "ALBR-NJ-01", name: "Zircon Star & Moon Bracelet (Blue Pearl)", category: "Anti-tarnish Bracelets", price: 45.00, image: "https://images.unsplash.com/photo-1611591437281-460bfbe1220a?auto=format&fit=crop&w=800", desc: "Delicate anti-tarnish chain featuring zircon star and moon motifs with blue pearl accents." },
    { id: 102, sku: "ALBR-NJ-02", name: "Gold Butterfly Bracelet", category: "Anti-tarnish Bracelets", price: 42.00, image: "https://images.unsplash.com/photo-1573408301185-9146fe634ad0?auto=format&fit=crop&w=800", desc: "A timeless butterfly design on a durable golden alloy chain." },
    { id: 103, sku: "ALBR-NJ-03", name: "Zircon Star & Moon Bracelet (Yellow Pearl)", category: "Anti-tarnish Bracelets", price: 45.00, image: "https://images.unsplash.com/photo-1611591437281-460bfbe1220a?auto=format&fit=crop&w=800", desc: "Celestial motifs paired with warm yellow pearls." },
    { id: 104, sku: "ALBR-NJ-04", name: "Zircon Star & Moon Bracelet (Pink Pearl)", category: "Anti-tarnish Bracelets", price: 45.00, image: "https://images.unsplash.com/photo-1611591437281-460bfbe1220a?auto=format&fit=crop&w=800", desc: "Soft pink pearls meet sparkling zircon stars." },
    { id: 105, sku: "ALBR-NJ-05", name: "Zircon Star & Moon Bracelet (White Pearl)", category: "Anti-tarnish Bracelets", price: 45.00, image: "https://images.unsplash.com/photo-1611591437281-460bfbe1220a?auto=format&fit=crop&w=800", desc: "Classic white pearls with zircon detailing." },
    { id: 106, sku: "SSBR-CJ-06", name: "Black Clover Bracelet", category: "Anti-tarnish Bracelets", price: 48.00, image: "https://images.unsplash.com/photo-1573408301185-9146fe634ad0?auto=format&fit=crop&w=800", desc: "Elegant black clover motifs on a gold-tone chain." },
    { id: 107, sku: "SSBR-CJ-07", name: "Golden Clover Bracelet", category: "Anti-tarnish Bracelets", price: 48.00, image: "https://images.unsplash.com/photo-1611591437281-460bfbe1220a?auto=format&fit=crop&w=800", desc: "All-gold aesthetic featuring lucky clover charms." },
    { id: 108, sku: "SSBR-CJ-08", name: "Dual Layer Butterfly Bracelet", category: "Anti-tarnish Bracelets", price: 55.00, image: "https://images.unsplash.com/photo-1573408301185-9146fe634ad0?auto=format&fit=crop&w=800", desc: "Double layered chain for a stacked look with butterfly details." },
    { id: 109, sku: "SSBR-CJ-09", name: "Emerald Stone Clover Bracelet", category: "Anti-tarnish Bracelets", price: 52.00, image: "https://images.unsplash.com/photo-1611591437281-460bfbe1220a?auto=format&fit=crop&w=800", desc: "Rich emerald green stones set in a clover design." },
    { id: 110, sku: "SSBR-CJ-10", name: "White Rectangle Charm Bracelet", category: "Anti-tarnish Bracelets", price: 45.00, image: "https://images.unsplash.com/photo-1573408301185-9146fe634ad0?auto=format&fit=crop&w=800", desc: "Modern minimalist white geometric charms." },
    { id: 111, sku: "SSBR-CJ-11", name: "Dual Layer Starfish Bracelet", category: "Anti-tarnish Bracelets", price: 50.00, image: "https://images.unsplash.com/photo-1611591437281-460bfbe1220a?auto=format&fit=crop&w=800", desc: "Ocean-inspired starfish motifs on a double chain." },
    { id: 112, sku: "SSBR-CJ-12", name: "Infinity Chain Bracelet", category: "Anti-tarnish Bracelets", price: 40.00, image: "https://images.unsplash.com/photo-1573408301185-9146fe634ad0?auto=format&fit=crop&w=800", desc: "A symbol of forever. Simple and elegant." },
    { id: 113, sku: "SSBR-CJ-13", name: "Dual Layer Black Clover & Stone", category: "Anti-tarnish Bracelets", price: 58.00, image: "https://images.unsplash.com/photo-1611591437281-460bfbe1220a?auto=format&fit=crop&w=800", desc: "Complex dual layer design with black clovers and white stones." },
    { id: 114, sku: "SSBR-CJ-14", name: "Black Marble Butterfly Bracelet", category: "Anti-tarnish Bracelets", price: 52.00, image: "https://images.unsplash.com/photo-1573408301185-9146fe634ad0?auto=format&fit=crop&w=800", desc: "Unique black marble effect on butterfly charms." },
    { id: 115, sku: "SSBR-CJ-15", name: "Sacred Heart Multicolor Stones", category: "Anti-tarnish Bracelets", price: 60.00, image: "https://images.unsplash.com/photo-1611591437281-460bfbe1220a?auto=format&fit=crop&w=800", desc: "Statement piece featuring a sacred heart with vibrant stones." },

    // --- Anti-tarnish Kada (Cuffs) ---
    { id: 201, sku: "SSCF-CJ-01", name: "Half Round White Stone Cuff", category: "Anti-tarnish Kada", price: 65.00, image: "https://images.unsplash.com/photo-1602173574767-37ac01994b2a?auto=format&fit=crop&w=800", desc: "Structure and sparkle. A rigid cuff with embedded white stones." },
    { id: 202, sku: "SSCF-CJ-02", name: "White Lilly Cuff", category: "Anti-tarnish Kada", price: 60.00, image: "https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?auto=format&fit=crop&w=800", desc: "Floral inspiration in a modern open-cuff design." },
    { id: 203, sku: "SSCF-CJ-03", name: "White Love Cuff", category: "Anti-tarnish Kada", price: 55.00, image: "https://images.unsplash.com/photo-1602173574767-37ac01994b2a?auto=format&fit=crop&w=800", desc: "Minimalist cuff engraved with love motifs." },
    { id: 204, sku: "SSCF-CJ-04", name: "Infinity With Stones Cuff", category: "Anti-tarnish Kada", price: 65.00, image: "https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?auto=format&fit=crop&w=800", desc: "The infinity symbol reimagined as a luxury stone-studded cuff." },
    { id: 205, sku: "SSCF-CJ-05", name: "Blue Evil Eye Cuff", category: "Anti-tarnish Kada", price: 58.00, image: "https://images.unsplash.com/photo-1602173574767-37ac01994b2a?auto=format&fit=crop&w=800", desc: "Protective Evil Eye design with deep blue accents." },
    { id: 206, sku: "SSCF-CJ-06", name: "White Stones Evil Eye Cuff", category: "Anti-tarnish Kada", price: 58.00, image: "https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?auto=format&fit=crop&w=800", desc: "A subtle take on the Evil Eye using clear white stones." },
    { id: 207, sku: "SSCF-CJ-07", name: "Pearl Wine Cuff", category: "Anti-tarnish Kada", price: 62.00, image: "https://images.unsplash.com/photo-1602173574767-37ac01994b2a?auto=format&fit=crop&w=800", desc: "Rich wine tones paired with lustrous pearls." },
    { id: 208, sku: "SSCF-CJ-08", name: "Beach Vibe Cuff", category: "Anti-tarnish Kada", price: 50.00, image: "https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?auto=format&fit=crop&w=800", desc: "Relaxed, wavy design perfect for vacation wear." },
    { id: 209, sku: "SSCF-CJ-09", name: "Twisted Wave With Stones Cuff", category: "Anti-tarnish Kada", price: 68.00, image: "https://images.unsplash.com/photo-1602173574767-37ac01994b2a?auto=format&fit=crop&w=800", desc: "An artistic twisted metal design studded with stones." },
    { id: 210, sku: "SSCF-CJ-10", name: "Criss-Cross White Stones Cuff", category: "Anti-tarnish Kada", price: 70.00, image: "https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?auto=format&fit=crop&w=800", desc: "Statement piece with a criss-cross diamond look." },
    { id: 211, sku: "SSCF-CJ-11", name: "Moving Stones Cuff", category: "Anti-tarnish Kada", price: 75.00, image: "https://images.unsplash.com/photo-1602173574767-37ac01994b2a?auto=format&fit=crop&w=800", desc: "Dynamic design where stones have slight movement." },
    { id: 212, sku: "SSCF-CJ-12", name: "White Heart Cuff", category: "Anti-tarnish Kada", price: 55.00, image: "https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?auto=format&fit=crop&w=800", desc: "Simple, romantic white heart centerpiece." },
    { id: 213, sku: "SSCF-MJ-13", name: "Nail Style Kada (Small 4.8)", category: "Anti-tarnish Kada", price: 60.00, image: "https://images.unsplash.com/photo-1602173574767-37ac01994b2a?auto=format&fit=crop&w=800", desc: "Trendy nail-design bangle. Small size." },
    { id: 214, sku: "SSCF-MJ-14", name: "Nail Style Kada (Medium)", category: "Anti-tarnish Kada", price: 60.00, image: "https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?auto=format&fit=crop&w=800", desc: "Trendy nail-design bangle. Medium size." },
    { id: 215, sku: "SSCF-MJ-15", name: "Two White Heart Pearls (Medium)", category: "Anti-tarnish Kada", price: 58.00, image: "https://images.unsplash.com/photo-1602173574767-37ac01994b2a?auto=format&fit=crop&w=800", desc: "Medium size kada featuring twin pearl hearts." },
    { id: 216, sku: "SSCF-MJ-16", name: "Bamboo Design Kada (Medium)", category: "Anti-tarnish Kada", price: 62.00, image: "https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?auto=format&fit=crop&w=800", desc: "Textured bamboo finish in gold plating." },
    { id: 217, sku: "SSCF-MJ-17", name: "Black Gold Flower Kada", category: "Anti-tarnish Kada", price: 65.00, image: "https://images.unsplash.com/photo-1602173574767-37ac01994b2a?auto=format&fit=crop&w=800", desc: "Striking black and gold floral contrast." },
    { id: 218, sku: "SSCF-MJ-18", name: "Star & Circle With Stones", category: "Anti-tarnish Kada", price: 60.00, image: "https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?auto=format&fit=crop&w=800", desc: "Geometric shapes with embedded zirconia." },
    { id: 219, sku: "SSCF-MJ-19", name: "Tri Layered White Stones Kada", category: "Anti-tarnish Kada", price: 80.00, image: "https://images.unsplash.com/photo-1602173574767-37ac01994b2a?auto=format&fit=crop&w=800", desc: "Luxurious triple-layer look in one piece." },
    { id: 220, sku: "SSCF-MJ-20", name: "Small White Stoned Kada (Medium)", category: "Anti-tarnish Kada", price: 55.00, image: "https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?auto=format&fit=crop&w=800", desc: "Delicate and stackable with small white stones." },

    // --- Finger Rings (New Category) ---
    { id: 301, sku: "SSFR-CJ-01", name: "Tri Layered White Stones Ring", category: "Finger Rings", price: 35.00, image: "https://images.unsplash.com/photo-1605100804763-247f67b3557e?auto=format&fit=crop&w=800", desc: "Statement ring giving the illusion of a stack." },
    { id: 302, sku: "SSFR-CJ-02", name: "Snake Ring", category: "Finger Rings", price: 30.00, image: "https://images.unsplash.com/photo-1605100804763-247f67b3557e?auto=format&fit=crop&w=800", desc: "Bold, winding snake design. Adjustable." },
    { id: 303, sku: "SSFR-CJ-03", name: "Flower and Leaf Ring", category: "Finger Rings", price: 32.00, image: "https://images.unsplash.com/photo-1605100804763-247f67b3557e?auto=format&fit=crop&w=800", desc: "Nature-inspired design with delicate detailing." },
    { id: 304, sku: "SSFR-CJ-04", name: "Two Stones Ring", category: "Finger Rings", price: 28.00, image: "https://images.unsplash.com/photo-1605100804763-247f67b3557e?auto=format&fit=crop&w=800", desc: "Minimalist ring featuring two prominent stones." },
    { id: 305, sku: "SSFR-CJ-05", name: "Pearls and Stones Ring", category: "Finger Rings", price: 38.00, image: "https://images.unsplash.com/photo-1605100804763-247f67b3557e?auto=format&fit=crop&w=800", desc: "A classic combination of pearls and sparkle." },

    // --- Anti-tarnish Necklaces ---
    { id: 401, sku: "SSNK-NJ-01", name: "Zircon Star & Moon Necklace", category: "Anti-tarnish Necklaces", price: 55.00, image: "https://images.unsplash.com/photo-1599643478518-17488fbbcd75?auto=format&fit=crop&w=800", desc: "Matches our bracelet collection. Celestial charm." },
    { id: 402, sku: "SSNK-NJ-02", name: "Small Golden Beads Necklace", category: "Anti-tarnish Necklaces", price: 45.00, image: "https://images.unsplash.com/photo-1599643478518-17488fbbcd75?auto=format&fit=crop&w=800", desc: "Everyday luxury. Delicate golden bead chain." },
    { id: 403, sku: "SSNK-NJ-03", name: "Golden Butterfly Curb Necklace", category: "Anti-tarnish Necklaces", price: 50.00, image: "https://images.unsplash.com/photo-1599643478518-17488fbbcd75?auto=format&fit=crop&w=800", desc: "Thicker curb chain with a feminine butterfly accent." },
    { id: 404, sku: "SSNK-NJ-04", name: "Double Layer White Shell Necklace", category: "Anti-tarnish Necklaces", price: 60.00, image: "https://images.unsplash.com/photo-1599643478518-17488fbbcd75?auto=format&fit=crop&w=800", desc: "Layered look with natural white shell elements." },
    { id: 405, sku: "SSNK-NJ-05", name: "Pulsatile Heart Bow Silver Necklace", category: "Anti-tarnish Necklaces", price: 52.00, image: "https://images.unsplash.com/photo-1599643478518-17488fbbcd75?auto=format&fit=crop&w=800", desc: "Unique 'beating heart' stone design in silver finish." },
    { id: 406, sku: "SSNK-NJ-06", name: "Charm Necklace - Multicolor", category: "Anti-tarnish Necklaces", price: 58.00, image: "https://images.unsplash.com/photo-1599643478518-17488fbbcd75?auto=format&fit=crop&w=800", desc: "Playful and vibrant multicolor charms." },
    { id: 407, sku: "SSNK-NJ-07", name: "Ring Buckle Roman Digital Diamond", category: "Anti-tarnish Necklaces", price: 65.00, image: "https://images.unsplash.com/photo-1599643478518-17488fbbcd75?auto=format&fit=crop&w=800", desc: "Roman numeral design with embedded crystals." },
    { id: 408, sku: "SSNK-NJ-08", name: "Upper Sign Tassel Necklace", category: "Anti-tarnish Necklaces", price: 55.00, image: "https://images.unsplash.com/photo-1599643478518-17488fbbcd75?auto=format&fit=crop&w=800", desc: "Elegant drop tassel design." },
    { id: 409, sku: "SSNK-NJ-09", name: "Charm Necklace - Golden Tiny Squares", category: "Anti-tarnish Necklaces", price: 50.00, image: "https://images.unsplash.com/photo-1599643478518-17488fbbcd75?auto=format&fit=crop&w=800", desc: "Geometric minimalism with tiny golden squares." },
    { id: 410, sku: "SSNK-NJ-10", name: "Titanium Steel Flower Necklace (Blue)", category: "Anti-tarnish Necklaces", price: 48.00, image: "https://images.unsplash.com/photo-1599643478518-17488fbbcd75?auto=format&fit=crop&w=800", desc: "Ultra-durable titanium steel with blue flower motif." },
    { id: 411, sku: "SSNK-NJ-11", name: "Titanium Steel Flower Necklace (Yellow)", category: "Anti-tarnish Necklaces", price: 48.00, image: "https://images.unsplash.com/photo-1599643478518-17488fbbcd75?auto=format&fit=crop&w=800", desc: "Ultra-durable titanium steel with yellow flower motif." },
    { id: 412, sku: "SSNK-SB-12", name: "Emerald Geometric Cut Pendant", category: "Anti-tarnish Necklaces", price: 55.00, image: "https://images.unsplash.com/photo-1599643478518-17488fbbcd75?auto=format&fit=crop&w=800", desc: "Sharp, modern geometric cut emerald stone." },
    { id: 413, sku: "SSNK-SB-13", name: "Infinity Heart Pendant with Zircon", category: "Anti-tarnish Necklaces", price: 58.00, image: "https://images.unsplash.com/photo-1599643478518-17488fbbcd75?auto=format&fit=crop&w=800", desc: "Intertwined heart and infinity symbols." },
    { id: 414, sku: "SSNK-SB-14", name: "Silver Round Halo Necklace", category: "Anti-tarnish Necklaces", price: 52.00, image: "https://images.unsplash.com/photo-1599643478518-17488fbbcd75?auto=format&fit=crop&w=800", desc: "Classic round halo pendant in silver finish." },
    { id: 415, sku: "SSNK-CJ-32", name: "Emerald Tiny Bow Chain", category: "Anti-tarnish Necklaces", price: 45.00, image: "https://images.unsplash.com/photo-1599643478518-17488fbbcd75?auto=format&fit=crop&w=800", desc: "Dainty bow with a small emerald accent." },
    { id: 416, sku: "SSNK-CJ-33", name: "White Stone Tiny Bow Chain", category: "Anti-tarnish Necklaces", price: 45.00, image: "https://images.unsplash.com/photo-1599643478518-17488fbbcd75?auto=format&fit=crop&w=800", desc: "Dainty bow with a white stone accent." },
    { id: 417, sku: "SSNK-CJ-34", name: "Golden Heart Pendant Necklace", category: "Anti-tarnish Necklaces", price: 48.00, image: "https://images.unsplash.com/photo-1599643478518-17488fbbcd75?auto=format&fit=crop&w=800", desc: "Timeless puffed heart pendant." },
    { id: 418, sku: "SSNK-CJ-35", name: "Double Heart Pendant with Stones", category: "Anti-tarnish Necklaces", price: 55.00, image: "https://images.unsplash.com/photo-1599643478518-17488fbbcd75?auto=format&fit=crop&w=800", desc: "Two hearts intertwined, embellished with stones." },
    { id: 419, sku: "SSNK-CJ-36", name: "Tri Stone Satellite Chain", category: "Anti-tarnish Necklaces", price: 50.00, image: "https://images.unsplash.com/photo-1599643478518-17488fbbcd75?auto=format&fit=crop&w=800", desc: "Satellite chain features three focal stones." },
    { id: 420, sku: "SSNK-CJ-37", name: "Infinity Heart with Small Stones", category: "Anti-tarnish Necklaces", price: 52.00, image: "https://images.unsplash.com/photo-1599643478518-17488fbbcd75?auto=format&fit=crop&w=800", desc: "Petite version of our infinity heart design." },
    { id: 421, sku: "SSNK-CJ-38", name: "Emerald Geometric Pendant", category: "Anti-tarnish Necklaces", price: 55.00, image: "https://images.unsplash.com/photo-1599643478518-17488fbbcd75?auto=format&fit=crop&w=800", desc: "Bold green geometric pendant." },
    { id: 422, sku: "SSNK-CJ-39", name: "White Diamond Stone Pendant", category: "Anti-tarnish Necklaces", price: 55.00, image: "https://images.unsplash.com/photo-1599643478518-17488fbbcd75?auto=format&fit=crop&w=800", desc: "Solitaire style white stone pendant." },
    { id: 423, sku: "SSNK-CJ-40", name: "White Marble Butterfly Pendant", category: "Anti-tarnish Necklaces", price: 52.00, image: "https://images.unsplash.com/photo-1599643478518-17488fbbcd75?auto=format&fit=crop&w=800", desc: "Marbled texture butterfly wing." },
    { id: 424, sku: "SSNK-CJ-41", name: "Black Rectangle Pendant", category: "Anti-tarnish Necklaces", price: 48.00, image: "https://images.unsplash.com/photo-1599643478518-17488fbbcd75?auto=format&fit=crop&w=800", desc: "Sleek black onyx style rectangle." },
    { id: 425, sku: "SSNK-CJ-42", name: "Emerald Charm Necklace with Earrings", category: "Anti-tarnish Necklaces", price: 75.00, image: "https://images.unsplash.com/photo-1599643478518-17488fbbcd75?auto=format&fit=crop&w=800", desc: "Complete set: Emerald charm necklace with matching studs." },
    { id: 426, sku: "SSNK-CJ-43", name: "White Rectangle Charm Set", category: "Anti-tarnish Necklaces", price: 75.00, image: "https://images.unsplash.com/photo-1599643478518-17488fbbcd75?auto=format&fit=crop&w=800", desc: "Complete set: White stone rectangle necklace and earrings." },
    { id: 427, sku: "SSNK-CJ-44", name: "Tri Heart Charm Necklace", category: "Anti-tarnish Necklaces", price: 50.00, image: "https://images.unsplash.com/photo-1599643478518-17488fbbcd75?auto=format&fit=crop&w=800", desc: "Three hanging hearts on a delicate chain." },
    { id: 428, sku: "SSNK-CJ-45", name: "Hummingbird Pendant Necklace", category: "Anti-tarnish Necklaces", price: 48.00, image: "https://images.unsplash.com/photo-1599643478518-17488fbbcd75?auto=format&fit=crop&w=800", desc: "Detailed hummingbird motif." },
    { id: 429, sku: "SSNK-CJ-46", name: "White Stone Butterfly Necklace", category: "Anti-tarnish Necklaces", price: 52.00, image: "https://images.unsplash.com/photo-1599643478518-17488fbbcd75?auto=format&fit=crop&w=800", desc: "Butterfly with paved white stones." },
    { id: 430, sku: "SSNK-CJ-47", name: "Pink Single Stone Pendant", category: "Anti-tarnish Necklaces", price: 45.00, image: "https://images.unsplash.com/photo-1599643478518-17488fbbcd75?auto=format&fit=crop&w=800", desc: "Soft pink solitaire pendant." },
    { id: 431, sku: "SSNK-CJ-48", name: "Heart and Round Stone Charm", category: "Anti-tarnish Necklaces", price: 50.00, image: "https://images.unsplash.com/photo-1599643478518-17488fbbcd75?auto=format&fit=crop&w=800", desc: "Mixed shape charms for texture." },
    { id: 432, sku: "SSNK-CJ-49", name: "Flower and Round Stone Charm", category: "Anti-tarnish Necklaces", price: 50.00, image: "https://images.unsplash.com/photo-1599643478518-17488fbbcd75?auto=format&fit=crop&w=800", desc: "Floral motif mixed with solitaire stones." },
    { id: 433, sku: "SSNK-CJ-50", name: "Multicolor Stone & Holo Charm", category: "Anti-tarnish Necklaces", price: 58.00, image: "https://images.unsplash.com/photo-1599643478518-17488fbbcd75?auto=format&fit=crop&w=800", desc: "Holographic shine meets multicolor stones." },
    { id: 434, sku: "SSNK-CJ-51", name: "Dual Layer White Marble Star", category: "Anti-tarnish Necklaces", price: 60.00, image: "https://images.unsplash.com/photo-1599643478518-17488fbbcd75?auto=format&fit=crop&w=800", desc: "Layered chain with marble star pendant." },
    { id: 435, sku: "SSNK-CJ-52", name: "Two Tail Pink & White Butterfly", category: "Anti-tarnish Necklaces", price: 55.00, image: "https://images.unsplash.com/photo-1599643478518-17488fbbcd75?auto=format&fit=crop&w=800", desc: "Unique butterfly design with trailing chains." },
    { id: 436, sku: "SSNK-MJ-53", name: "5 Emerald Leaf Necklace", category: "Anti-tarnish Necklaces", price: 60.00, image: "https://images.unsplash.com/photo-1599643478518-17488fbbcd75?auto=format&fit=crop&w=800", desc: "Nature inspired vine of emerald leaves." },
    { id: 437, sku: "SSNK-MJ-54", name: "Emerald Love Pendant Necklace", category: "Anti-tarnish Necklaces", price: 52.00, image: "https://images.unsplash.com/photo-1599643478518-17488fbbcd75?auto=format&fit=crop&w=800", desc: "'Love' script with emerald accent." },
    { id: 438, sku: "SSNK-MJ-55", name: "6 Big Golden Beads Necklace", category: "Anti-tarnish Necklaces", price: 55.00, image: "https://images.unsplash.com/photo-1599643478518-17488fbbcd75?auto=format&fit=crop&w=800", desc: "Statement beads on a thick chain." },
    { id: 439, sku: "SSNK-MJ-56", name: "Golden Bow Necklace", category: "Anti-tarnish Necklaces", price: 48.00, image: "https://images.unsplash.com/photo-1599643478518-17488fbbcd75?auto=format&fit=crop&w=800", desc: "Classic polished gold bow." },
    { id: 440, sku: "SSNK-MJ-57", name: "Golden Hollow Heart Through Chain", category: "Anti-tarnish Necklaces", price: 48.00, image: "https://images.unsplash.com/photo-1599643478518-17488fbbcd75?auto=format&fit=crop&w=800", desc: "Modern open heart design where chain passes through." },
    { id: 441, sku: "SSNK-MJ-58", name: "White Marble Bow Pendant", category: "Anti-tarnish Necklaces", price: 52.00, image: "https://images.unsplash.com/photo-1599643478518-17488fbbcd75?auto=format&fit=crop&w=800", desc: "Soft white marble inlay in a bow shape." },
    { id: 442, sku: "SSNK-MJ-59", name: "White Marble Flower & 4 Pearls", category: "Anti-tarnish Necklaces", price: 65.00, image: "https://images.unsplash.com/photo-1599643478518-17488fbbcd75?auto=format&fit=crop&w=800", desc: "Complex floral design with pearl stations." },
    { id: 443, sku: "SSNK-MJ-60", name: "Multicolor Clover Necklace", category: "Anti-tarnish Necklaces", price: 55.00, image: "https://images.unsplash.com/photo-1599643478518-17488fbbcd75?auto=format&fit=crop&w=800", desc: "Lucky clovers in various gemstone colors." },
    { id: 444, sku: "SSNK-MJ-61", name: "Snake Chain", category: "Anti-tarnish Necklaces", price: 40.00, image: "https://images.unsplash.com/photo-1599643478518-17488fbbcd75?auto=format&fit=crop&w=800", desc: "Sleek, liquid-gold effect snake chain. Essential." },

    // --- Traditional Necklaces ---
    { id: 501, sku: "TRNK-SFJ-15", name: "Ganapathy Kasumala with Earrings", category: "Traditional Jewellery", price: 120.00, image: "https://images.unsplash.com/photo-1617112837568-7c852445657b?auto=format&fit=crop&w=800", desc: "Traditional coin necklace featuring Lord Ganesha. Includes earrings." },
    { id: 502, sku: "TRNK-SFJ-16", name: "Elephant Goddess Choker (Green/White)", category: "Traditional Jewellery", price: 110.00, image: "https://images.unsplash.com/photo-1617112837568-7c852445657b?auto=format&fit=crop&w=800", desc: "Beaded choker with heritage elephant motifs." },
    { id: 503, sku: "TRNK-SFJ-17", name: "Blue Love Multilayered Choker", category: "Traditional Jewellery", price: 95.00, image: "https://images.unsplash.com/photo-1617112837568-7c852445657b?auto=format&fit=crop&w=800", desc: "Royal blue stones in a layered traditional setting." },
    { id: 504, sku: "TRNK-SFJ-18", name: "Red Palakka with Jhumka", category: "Traditional Jewellery", price: 130.00, image: "https://images.unsplash.com/photo-1617112837568-7c852445657b?auto=format&fit=crop&w=800", desc: "Kerala traditional Palakka necklace with matching Jhumkas." },
    { id: 505, sku: "TRNK-SFJ-19", name: "Red Palakka with Stud", category: "Traditional Jewellery", price: 115.00, image: "https://images.unsplash.com/photo-1617112837568-7c852445657b?auto=format&fit=crop&w=800", desc: "Ruby red Palakka set with elegant studs." },
    { id: 506, sku: "TRNK-SFJ-20", name: "Green Palakka with Stud", category: "Traditional Jewellery", price: 115.00, image: "https://images.unsplash.com/photo-1617112837568-7c852445657b?auto=format&fit=crop&w=800", desc: "Classic green Palakka stones with matching studs." },
    { id: 507, sku: "TRNK-SFJ-21", name: "Green Palakka with Kasu", category: "Traditional Jewellery", price: 140.00, image: "https://images.unsplash.com/photo-1617112837568-7c852445657b?auto=format&fit=crop&w=800", desc: "Fusion of Palakka stones and Kasu coins." },
    { id: 508, sku: "TRNK-SFJ-22", name: "Maroon Palakka with Kasu", category: "Traditional Jewellery", price: 140.00, image: "https://images.unsplash.com/photo-1617112837568-7c852445657b?auto=format&fit=crop&w=800", desc: "Deep maroon traditional set with coin detailing." },
    { id: 509, sku: "TRNK-SFJ-23", name: "Three Layered Kasu Mala", category: "Traditional Jewellery", price: 150.00, image: "https://images.unsplash.com/photo-1617112837568-7c852445657b?auto=format&fit=crop&w=800", desc: "Grand three-tier coin necklace for weddings." },
    { id: 510, sku: "TRNK-SFJ-24", name: "Long Chain with Goddess Pendant", category: "Traditional Jewellery", price: 160.00, image: "https://images.unsplash.com/photo-1617112837568-7c852445657b?auto=format&fit=crop&w=800", desc: "Temple jewelry long chain featuring Goddess Lakshmi." }
];

// --- 2. CART LOGIC ---
let cart = JSON.parse(localStorage.getItem('lilauraCart')) || [];

function addToCart(productId) {
    const product = products.find(p => p.id === productId);
    if (product) {
        cart.push(product);
        localStorage.setItem('lilauraCart', JSON.stringify(cart));
        updateCartCount();
        // Show success feedback
        const btn = document.getElementById('add-to-cart-btn');
        if(btn) {
            const originalText = btn.innerText;
            btn.innerText = "Added!";
            btn.classList.add('bg-lilaura-text');
            setTimeout(() => {
                btn.innerText = originalText;
                btn.classList.remove('bg-lilaura-text');
            }, 1000);
        } else {
            alert(`${product.name} added to your cart.`);
        }
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

    let message = "Hello Lilaura! I would like to order:%0A%0A";
    let total = 0;

    cart.forEach((item, index) => {
        message += `${index + 1}. ${item.name} (${item.sku}) - £${item.price}%0A`;
        total += item.price;
    });

    message += `%0A*Total Price: £${total.toFixed(2)}*`;
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
    if (!container) return; // Guard clause
    
    container.innerHTML = items.map(p => `
        <div class="group cursor-pointer" onclick="window.location.href='product.html?id=${p.id}'">
            <div class="w-full aspect-[3/4] overflow-hidden bg-gray-100 relative">
                <img src="${p.image}" alt="${p.name}" loading="lazy" class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500">
                <div class="absolute bottom-2 right-2 bg-white px-2 py-1 text-[10px] uppercase tracking-widest text-lilaura-text opacity-0 group-hover:opacity-100 transition-opacity">Quick View</div>
            </div>
            <div class="mt-4 text-center">
                <p class="text-[10px] tracking-widest uppercase text-lilaura-emerald mb-1">${p.category}</p>
                <h3 class="font-serif text-lg text-lilaura-text leading-tight group-hover:text-lilaura-gold transition-colors">${p.name}</h3>
                <p class="font-sans text-sm text-lilaura-subtle mt-1">£${p.price.toFixed(2)}</p>
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
    document.getElementById('p-sku').innerText = `SKU: ${p.sku}`; // Added SKU display
    
    // Bind Add to Cart Button
    const btn = document.getElementById('add-to-cart-btn');
    btn.onclick = () => addToCart(p.id);
    
    // Inject Schema for SEO
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
        "availability": "https://schema.org/InStock"
      }
    };
    const script = document.createElement('script');
    script.type = "application/ld+json";
    script.text = JSON.stringify(schemaData);
    document.head.appendChild(script);
}

// Filter Function
function filterCategory(cat) {
    const buttons = document.querySelectorAll('.filter-btn');
    buttons.forEach(btn => btn.classList.remove('text-lilaura-gold', 'underline'));
    event.target.classList.add('text-lilaura-gold', 'underline');

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
    "Mrs.Wright", "Sarah", "Anjali", "Jessica", "Ms.Bennett", 
    "Ms.Kensington", "Emily", "Aisha", "Chloe", "Mrs.Caldwell", 
    "Ms.Sinclair", "Ms.Harrington", "Ms.Ashford", "Rebecca", "Simran"
];

function triggerFomoNotification() {
    const fomoPopup = document.getElementById('fomo-popup');
    if (!fomoPopup) return; 

    const randomCity = ukLocations[Math.floor(Math.random() * ukLocations.length)];
    const randomName = customerNames[Math.floor(Math.random() * customerNames.length)];
    const randomProduct = products[Math.floor(Math.random() * products.length)];

    document.getElementById('fomo-text').innerText = `${randomName} in ${randomCity} purchased`;
    document.getElementById('fomo-product').innerText = randomProduct.name;

    fomoPopup.classList.add('show-fomo');

    setTimeout(() => {
        fomoPopup.classList.remove('show-fomo');
    }, 5000);
}

setTimeout(() => {
    triggerFomoNotification();
    setInterval(triggerFomoNotification, 60000); 
}, 10000);
