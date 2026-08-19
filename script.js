/* LILAURA CORE ENGINE
   Includes: SEO Injection, Dual-Image Stacking, FOMO Popup, and Mobile Menu Logic
*/

/* --- URL POLISH: Remove .html from Address Bar --- */
if (window.location.pathname.endsWith('.html') && window.location.pathname !== '/index.html') {
    const cleanUrl = window.location.pathname.replace(/\.html$/, '') + window.location.search + window.location.hash;
    window.history.replaceState(null, '', cleanUrl);
} else if (window.location.pathname === '/index.html') {
    window.history.replaceState(null, '', '/');
}

// --- 1. PRODUCT DATABASE (SEO OPTIMIZED) ---
const products = [
    { 
        id: 16, 
        sku: "SSCF-ALBR-16", 
        name: "18K Gold Plated Stainless Steel Cuff Bracelet", 
        category: "Anti-tarnish Kada", 
        price: 16.49, 
        image: "https://i.etsystatic.com/40040678/r/il/43a595/8197151304/il_1140xN.8197151304_btta.jpg", 
        imageHover: "", 
        desc: "Premium 18K gold plated stainless steel cuff bracelet. Waterproof, sweat-resistant, and guaranteed anti-tarnish for everyday luxury wear.",
        seoTitle: "18K Gold Plated Cuff Bracelet | Waterproof Anti-Tarnish Kada | LilAura UK",
        metaDesc: "Shop the premium 18K gold plated stainless steel cuff bracelet by LilAura. 100% waterproof, sweat-resistant, and anti-tarnish Indian heritage jewelry in the UK.",
        altText: "Close-up of 18K gold plated anti-tarnish cuff bracelet on a neutral background",
        etsyLink: "https://www.etsy.com/uk/listing/4530558606/18k-gold-plated-stainless-steel-cuff"
    },
    { 
        id: 17, 
        sku: "SSCF-INF-17", 
        name: "Anti-Tarnish Infinity Cuff with Double Layered Zircon Stones", 
        category: "Anti-tarnish Kada", 
        price: 18.49, 
        inStock: false, 
        image: "https://i.etsystatic.com/40040678/r/il/7a4f17/8197075762/il_1140xN.8197075762_9l3z.jpg", 
        imageHover: "", 
        desc: "Stunning infinity motif open cuff embellished with double-layered sparkling zircon stones. Crafted from premium anti-tarnish stainless steel, this 18K gold plated bracelet is 100% waterproof, hypoallergenic, and perfect for everyday wear in the UK.",
        seoTitle: "18K Gold Plated Infinity Cuff | Anti-Tarnish Stainless Steel Jewellery UK",
        metaDesc: "Discover our stunning 18K gold plated infinity cuff with zircon stones. Waterproof, hypoallergenic, and anti-tarnish stainless jewelry by LilAura.",
        altText: "18K Gold Plated Anti-Tarnish Infinity Cuff Bracelet with Zircon Stones",
        etsyLink: "https://www.etsy.com/uk/listing/4530529391/anti-tarnish-infinity-cuff-with-double" 
    },
    { 
        id: 18, 
        sku: "SSBR-CHM-18", 
        name: "Anti-Tarnish Charm Bracelet (Celestial & Floral Motifs)", 
        category: "Anti-tarnish Bracelets", 
        price: 12.99, 
        image: "https://i.etsystatic.com/40040678/r/il/dc3ce4/8237168671/il_1140xN.8237168671_jfzc.jpg", 
        imageHover: "", 
        desc: "Delicate charm bracelet featuring intricate celestial and floral motifs on a durable anti-tarnish golden alloy chain. 18K gold plated and highly resistant to water and sweat.",
        seoTitle: "Gold Plated Charm Bracelet | Anti-Tarnish Stainless Steel Jewellery | LilAura",
        metaDesc: "Shop delicate celestial and floral charm bracelets. 18K gold plated, anti-tarnish stainless steel jewellery designed for everyday waterproof wear in the UK.",
        altText: "Gold Plated Anti-Tarnish Stainless Steel Charm Bracelet",
        etsyLink: "https://www.etsy.com/uk/listing/4529459089/anti-tarnish-charm-bracelets-with" 
    },
    { 
        id: 19, 
        sku: "SSFR-RNG-19", 
        name: "Anti-Tarnish Stainless Steel Statement Ring with Zircon Stones", 
        category: "Finger Rings", 
        price: 12.49, 
        image: "https://i.etsystatic.com/40040678/r/il/8fa288/8237035721/il_1140xN.8237035721_745p.jpg", 
        imageHover: "", 
        desc: "Bold statement ring crafted from titanium stainless steel with embedded brilliant-cut zircon stones. Will never turn your finger green due to the high-grade 18K gold plated anti-tarnish finish.",
        seoTitle: "Gold Plated Zircon Statement Ring | Anti-Tarnish Stainless Steel | LilAura UK",
        metaDesc: "Bold 18K gold plated statement ring with brilliant zircon stones. Crafted from anti-tarnish stainless steel for waterproof, long-lasting luxury.",
        altText: "18K Gold Plated Anti-Tarnish Statement Ring with Zircon Stones",
        etsyLink: "https://www.etsy.com/uk/listing/4529409433/anti-tarnish-stainless-steel-rings-with" 
    },
    { 
        id: 5, 
        sku: "TRNK-PAL-05", 
        name: "Traditional Palakka Choker Necklace Set with Matching Earstuds", 
        category: "Traditional Jewellery", 
        price: 22.99, 
        image: "https://i.etsystatic.com/40040678/r/il/a1210d/8348817959/il_1588xN.8348817959_chs4.jpg", 
        imageHover: "https://i.etsystatic.com/40040678/r/il/0f7782/8300923278/il_1588xN.8300923278_m5s3.jpg", 
        desc: "Authentic South Indian heritage Palakka choker set. Includes matching traditional earstuds. Perfect for weddings and festive wear, crafted beautifully in traditional brass.",
        seoTitle: "Traditional Indian Palakka Choker Set | Brass Heritage Jewellery UK | LilAura",
        metaDesc: "Authentic South Indian Palakka choker set with matching earstuds. Premium traditional brass jewellery perfect for weddings and cultural events.",
        altText: "Traditional Indian Brass Palakka Choker Necklace Set",
        etsyLink: "https://www.etsy.com/uk/listing/4529392003/traditional-palakka-choker-necklace-set" 
    },
    { 
        id: 20, 
        sku: "SSNK-EMR-20", 
        name: "Anti-Tarnish Gold Plated Emerald Pendant Necklace", 
        category: "Anti-tarnish Necklaces", 
        price: 15.49, 
        image: "https://i.etsystatic.com/40040678/r/il/ffa352/8189114976/il_1140xN.8189114976_1kwd.jpg", 
        imageHover: "", 
        desc: "Exquisite geometric emerald-cut green stone pendant on an 18k gold vermeil water-resistant chain. Simple, daily luxury made from robust anti-tarnish stainless steel.",
        seoTitle: "Gold Plated Emerald Pendant | Anti-Tarnish Stainless Steel Necklace | LilAura",
        metaDesc: "Exquisite 18K gold plated emerald-cut pendant necklace. Waterproof, anti-tarnish stainless steel jewellery perfect for everyday luxury in the UK.",
        altText: "18K Gold Plated Anti-Tarnish Emerald Pendant Necklace",
        etsyLink: "https://www.etsy.com/uk/listing/4529214581/anti-tarnish-gold-plated-emerald-pendant" 
    },
    { 
        id: 21, 
        sku: "SSCF-HPR-21", 
        name: "Gold Plated Stainless Steel Heart Pearl Bangle", 
        category: "Anti-tarnish Kada", 
        price: 17.99, 
        image: "https://i.etsystatic.com/40040678/r/il/8b2186/8160669462/il_1140xN.8160669462_1gej.jpg", 
        imageHover: "", 
        desc: "Romantic open cuff bangle featuring twin mother-of-pearl heart accents set in durable 18K gold-plated stainless steel. Guaranteed anti-tarnish and completely waterproof.",
        seoTitle: "Gold Plated Pearl Bangle | Anti-Tarnish Stainless Steel Jewellery UK",
        metaDesc: "Romantic open cuff bangle with twin mother-of-pearl hearts. 18K gold plated anti-tarnish stainless steel jewellery that is completely waterproof.",
        altText: "18K Gold Plated Stainless Steel Heart Pearl Bangle",
        etsyLink: "https://www.etsy.com/uk/listing/4525317383/gold-plated-stainless-steel-heart-pearl" 
    },
    { 
        id: 8, 
        sku: "TRNK-PAL-08", 
        name: "Traditional Kerala Palakka Choker Necklace Set with Jhumka Earrings", 
        category: "Traditional Jewellery", 
        price: 22.79, 
        image: "https://i.etsystatic.com/40040678/r/il/344f38/8294466386/il_1588xN.8294466386_g100.jpg", 
        imageHover: "https://i.etsystatic.com/40040678/r/il/febf4b/8342363125/il_1588xN.8342363125_44u7.jpg", 
        desc: "Grand Kerala-style green Palakka short choker necklace paired with traditional bell-shaped Jhumka earrings. Classic temple jewelry cast in durable traditional brass.",
        seoTitle: "Kerala Palakka Choker & Jhumka Set | Traditional Indian Brass Jewellery",
        metaDesc: "Grand Kerala-style green Palakka choker with traditional Jhumka earrings. Authentic traditional brass jewellery crafted for Indian heritage aesthetics.",
        altText: "Traditional Indian Brass Kerala Palakka Choker with Jhumka Earrings",
        etsyLink: "https://www.etsy.com/uk/listing/4525327387/traditional-kerala-palakka-choker" 
    },
    { 
        id: 9, 
        sku: "TRNK-COIN-09", 
        name: "Ganapathy Coin Palakka Choker Traditional Heritage Necklace", 
        category: "Traditional Jewellery", 
        price: 20.99, 
        inStock: false,
        image: "https://i.etsystatic.com/40040678/r/il/433e57/8300782474/il_1588xN.8300782474_9tgy.jpg", 
        imageHover: "https://i.etsystatic.com/40040678/r/il/07ba53/8348676775/il_1588xN.8348676775_9har.jpg", 
        desc: "Traditional Kasu Mala coin choker featuring Lord Ganesha motifs interlaced with classic Palakka stones. Heirloom craftsmanship utilizing premium traditional brass.",
        seoTitle: "Ganapathy Coin Kasu Mala | Traditional Indian Brass Jewellery UK | LilAura",
        metaDesc: "Traditional Kasu Mala coin choker featuring Lord Ganesha. Premium traditional brass heritage jewellery perfect for South Indian weddings.",
        altText: "Traditional Indian Brass Ganapathy Coin Palakka Choker",
        etsyLink: "https://www.etsy.com/uk/listing/4483539459/coin-palakka-choker-traditional-necklace" 
    },
    { 
        id: 22, 
        sku: "SSNK-EMR-22", 
        name: "Anti-Tarnish Gold Plated Emerald Green Leaf Pendant Necklace", 
        category: "Anti-tarnish Necklaces", 
        price: 16.99, 
        image: "https://i.etsystatic.com/40040678/r/il/e0133d/8235370965/il_1140xN.8235370965_lcqj.jpg", 
        imageHover: "", 
        desc: "Exquisite geometric emerald-cut green stone pendant on an 18k gold vermeil water-resistant chain. Made of solid stainless steel to guarantee anti-tarnish wear.",
        seoTitle: "Gold Plated Emerald Leaf Pendant | Anti-Tarnish Stainless Steel Jewellery",
        metaDesc: "Geometric emerald green leaf pendant on an 18k gold plated chain. Waterproof, anti-tarnish stainless steel necklace for daily wear.",
        altText: "18K Gold Plated Anti-Tarnish Emerald Green Leaf Pendant",
        etsyLink: "https://www.etsy.com/uk/listing/4533568863/anti-tarnish-gold-plated-emerald-green" 
    },
    { 
        id: 11, 
        sku: "TRNK-PAL-11", 
        name: "Traditional Indian Lakshmi Choker Necklace Set with Matching Ear studs", 
        category: "Traditional Jewellery", 
        price: 33.99, 
        image: "https://i.etsystatic.com/40040678/r/il/78acc5/8345517199/il_1588xN.8345517199_5d0d.jpg", 
        imageHover: "https://i.etsystatic.com/40040678/r/il/398816/8297620094/il_1588xN.8297620094_50p8.jpg", 
        desc: "Authentic South Indian heritage Palakka choker set. Includes matching traditional earstuds. Beautifully forged in traditional brass, perfect for weddings and festive wear.",
        seoTitle: "Lakshmi Choker Necklace Set | Traditional Indian Brass Jewellery | LilAura",
        metaDesc: "Authentic South Indian Lakshmi temple choker set. Crafted in traditional brass, this heritage jewellery is ideal for bridal and festive wear.",
        altText: "Traditional Indian Brass Lakshmi Choker Necklace Set",
        etsyLink: "https://www.etsy.com/uk/listing/4533558563/traditional-indian-lakshmi-choker" 
    },
    { 
        id: 12, 
        sku: "TRNK-PAL-12", 
        name: "Traditional Indian Green Meenakari Choker Necklace Set", 
        category: "Traditional Jewellery", 
        price: 15.99, 
        image: "https://i.etsystatic.com/40040678/r/il/3bd6bb/8348520825/il_1588xN.8348520825_f3eq.jpg", 
        imageHover: "https://i.etsystatic.com/40040678/r/il/ded90e/8348520811/il_1588xN.8348520811_n4rl.jpg", 
        desc: "Elegant green Meenakari lotus design choker set. Exquisite traditional brass handiwork that perfects any traditional Indian occasion.",
        seoTitle: "Green Meenakari Choker Set | Traditional Indian Brass Jewellery UK",
        metaDesc: "Elegant green Meenakari lotus design choker set. Premium traditional brass jewellery that adds a touch of heritage elegance to any occasion.",
        altText: "Traditional Indian Brass Green Meenakari Choker Necklace Set",
        etsyLink: "https://www.etsy.com/uk/listing/4535086033/green-lotus-meenakari-necklace-set" 
    },
    { 
        id: 13, 
        sku: "TRNK-PAL-13", 
        name: "Traditional Indian Red Meenakari Choker Necklace Set", 
        category: "Traditional Jewellery", 
        price: 17.99, 
        image: "https://i.etsystatic.com/40040678/r/il/51c271/8348522389/il_1588xN.8348522389_7zme.jpg", 
        imageHover: "https://i.etsystatic.com/40040678/r/il/4ba53c/8300627856/il_1588xN.8300627856_qz6y.jpg", 
        desc: "Elegant Red Meenakari lotus design choker. Sculpted in traditional brass to showcase vibrant Indian heritage colors for cultural celebrations.",
        seoTitle: "Red Meenakari Choker Necklace Set | Traditional Indian Brass Jewellery",
        metaDesc: "Stunning red Meenakari lotus choker set. Discover authentic traditional brass jewellery perfect for cultural celebrations and Indian weddings.",
        altText: "Traditional Indian Brass Red Meenakari Choker Necklace Set",
        etsyLink: "https://www.etsy.com/uk/listing/4535073097/red-lotus-meenakari-necklace-set" 
    },
    { 
        id: 14, 
        sku: "SSCF-MSC-14", 
        name: "18K Gold Plated Moving Stone Cuff Bracelet", 
        category: "Anti-tarnish Kada", 
        price: 14.99, 
        image: "https://i.etsystatic.com/40040678/r/il/2fbb3e/8346941703/il_1588xN.8346941703_2nlb.jpg", 
        imageHover: "https://v.etsystatic.com/video/upload/ac_none,du_15,q_auto:good/jcndfbtklzpickvk6xz3.mp4", 
        desc: "Add a touch of playful elegance to your everyday look with this stunning 18K Gold Plated Moving Stone Cuff. Crafted from anti-tarnish stainless steel, the three sparkling stone beads inside move freely.",
        seoTitle: "Moving Stone Cuff Bracelet | Anti-Tarnish Gold Plated Stainless Steel",
        metaDesc: "Playful 18K gold plated moving stone cuff. Waterproof, anti-tarnish stainless steel jewellery featuring a dynamic rolling bead design.",
        altText: "18K Gold Plated Anti-Tarnish Moving Stone Cuff Bracelet",
        etsyLink: "https://www.etsy.com/uk/listing/4544224715/18k-gold-plated-moving-stone-cuff" 
    },
    { 
        id: 15, 
        sku: "TRNK-TLCN-15", 
        name: "Tri-layered traditional coin necklace set", 
        category: "Traditional Jewellery", 
        price: 21.99, 
        inStock: false,
image: "https://i.etsystatic.com/40040678/r/il/92675a/8300843552/il_1588xN.8300843552_1ope.jpg", 
        imageHover: "https://i.etsystatic.com/40040678/r/il/4e7dd8/8300843550/il_1588xN.8300843550_t434.jpg", 
        desc: "Elegant Tri-layered traditional coin necklace set perfect for traditional occasions. Designed with premium traditional brass for long-lasting luster.",
        seoTitle: "Tri-Layered Coin Necklace Set | Traditional Indian Brass Jewellery UK",
        metaDesc: "Elegant tri-layered traditional coin necklace set. Authentic traditional brass jewellery crafted for stunning heritage style.",
        altText: "Traditional Indian Brass Tri-Layered Coin Necklace Set",
        etsyLink: "https://www.etsy.com/uk/listing/4537960719/tri-layered-traditional-coin-necklace" 
    },
    { 
        id: 10, 
        sku: "SSNK-HNS-SC-10", 
        name: "Interlocking Heart Necklace with zircon stones and Snake Chain", 
        category: "Anti-tarnish Necklaces", 
        price: 14.99, 
        image: "https://i.etsystatic.com/40040678/r/il/22fdf0/8394955889/il_794xN.8394955889_hxeo.jpg", 
        imageHover: "https://i.etsystatic.com/40040678/r/il/270fd6/8347068668/il_794xN.8347068668_h0yl.jpg", 
        desc: "Featuring two intertwined hearts one lined with brilliant zircon stones and the other polished in smooth 18K gold. Premium anti-tarnish stainless steel ensures everlasting quality.",
        seoTitle: "Gold Plated Interlocking Heart Necklace | Anti-Tarnish Stainless Steel",
        metaDesc: "18K gold plated interlocking heart necklace with zircon stones. Premium anti-tarnish stainless steel jewellery that won't fade or rust.",
        altText: "18K Gold Plated Anti-Tarnish Interlocking Heart Necklace",
        etsyLink: "https://www.etsy.com/uk/listing/4542359876/18k-gold-plated-interlocking-heart" 
    },
    { 
        id: 7, 
        sku: "SSNK-KHP-SC-07", 
        name: "Knotted Heart Pendant Necklace and Snake Chain", 
        category: "Anti-tarnish Necklaces", 
        price: 14.49, 
        image: "https://i.etsystatic.com/40040678/r/il/cbe8d1/8395016183/il_794xN.8395016183_6r2h.jpg", 
        imageHover: "https://i.etsystatic.com/40040678/r/il/d54fec/8395016175/il_794xN.8395016175_al3i.jpg", 
        desc: "Featuring an intricate, soft-knotted open heart pendant strung on a sleek snake chain. Made from 18K gold plated anti-tarnish stainless steel for waterproof durability.",
        seoTitle: "Gold Plated Knotted Heart Pendant | Anti-Tarnish Stainless Steel Jewellery",
        metaDesc: "Chic soft-knotted open heart pendant on a snake chain. 18K gold plated, anti-tarnish stainless steel necklace for modern everyday elegance.",
        altText: "18K Gold Plated Anti-Tarnish Knotted Heart Pendant Necklace",
        etsyLink: "https://www.etsy.com/uk/listing/4542987137/18k-gold-plated-knotted-heart-pendant" 
    },
    { 
        id: 6, 
        sku: "SSNK-PHN-SC-06", 
        name: "Puffy Heart Necklace and Snake Chain", 
        category: "Anti-tarnish Necklaces", 
        price: 15.99, 
        image: "https://i.etsystatic.com/40040678/r/il/aa1651/8347132378/il_794xN.8347132378_paag.jpg", 
        imageHover: "https://i.etsystatic.com/40040678/r/il/6066b0/8347132366/il_794xN.8347132366_hqus.jpg", 
        desc: "Whether you are dressing up for a special evening or adding a touch of romance to your everyday attire, this 18K gold plated anti-tarnish stainless steel piece will maintain its luster wear after wear.",
        seoTitle: "Gold Plated Puffy Heart Necklace | Anti-Tarnish Stainless Steel | LilAura",
        metaDesc: "Romantic puffy heart necklace on a durable snake chain. 18K gold plated anti-tarnish stainless steel jewellery crafted for waterproof wear.",
        altText: "18K Gold Plated Anti-Tarnish Puffy Heart Necklace",
        etsyLink: "https://www.etsy.com/uk/listing/4536791687/18k-gold-plated-puffy-heart-necklace" 
    },
    { 
        id: 4, 
        sku: "SSCF-BCF-04", 
        name: "Anti-Tarnish Bamboo Cuff", 
        category: "Anti-tarnish Kada", 
        price: 15.99, 
        inStock: true, 
        image: "https://i.etsystatic.com/40040678/r/il/3ce51c/8299089674/il_794xN.8299089674_1zdo.jpg", 
        imageHover: "https://i.etsystatic.com/40040678/r/il/cecc15/8346984277/il_794xN.8346984277_j1kv.jpg", 
        desc: "Featuring an intricate, organic bamboo-inspired joint design, this piece effortlessly blends modern elegance with natural charm. Crafted from 18K gold plated stainless steel, it serves as a waterproof, anti-tarnish everyday staple.",
        seoTitle: "Gold Plated Bamboo Cuff Bracelet | Anti-Tarnish Stainless Steel Jewellery",
        metaDesc: "Organic bamboo-inspired open cuff bracelet. 18K gold plated, anti-tarnish stainless steel jewellery designed to be completely waterproof.",
        altText: "18K Gold Plated Anti-Tarnish Bamboo Cuff Bracelet",
        etsyLink: "https://www.etsy.com/uk/listing/4544247010/18k-gold-plated-anti-tarnish-bamboo-cuff" 
    },
    { 
        id: 3, 
        sku: "SSCF-OPC-03", 
        name: "Anti tarnish Open Pearl Cuff- 18K Gold Plated", 
        category: "Anti-tarnish Kada", 
        price: 16.00, 
        inStock: true, 
        image: "https://i.etsystatic.com/40040678/r/il/7f3803/8348706407/il_1588xN.8348706407_c8gw.jpg", 
        imageHover: "https://i.etsystatic.com/40040678/r/il/a7d942/8300811782/il_1588xN.8300811782_jtsa.jpg", 
        desc: "Featuring an artistic, wavy melted-metal silhouette accented with lustrous white pearls. This 18K gold plated anti-tarnish stainless steel cuff blends contemporary sculptural design with classic sophistication.",
        seoTitle: "Gold Plated Open Pearl Cuff | Anti-Tarnish Stainless Steel | LilAura UK",
        metaDesc: "Wavy melted-metal silhouette cuff accented with lustrous pearls. 18K gold plated anti-tarnish stainless steel jewellery.",
        altText: "18K Gold Plated Anti-Tarnish Open Pearl Cuff",
        etsyLink: "https://www.etsy.com/uk/listing/4544460683/18k-gold-plated-anti-tarnish-open-pearl" 
    },
    { 
        id: 2, 
        sku: "SSCF-DFC-02", 
        name: "Anti tarnish Daisy Flower Cuff- 18K Gold Plated", 
        category: "Anti-tarnish Kada", 
        price: 14.99, 
        inStock: true, 
        image: "https://i.etsystatic.com/40040678/r/il/fffc67/8370637995/il_1588xN.8370637995_7884.jpg", 
        imageHover: "https://i.etsystatic.com/40040678/r/il/6b9b2e/8370637991/il_1588xN.8370637991_m4fb.jpg", 
        desc: "Whether you're dressing up for a special occasion or looking for a chic accessory for daily wear, this waterproof, 18K gold plated anti-tarnish stainless steel cuff is the ultimate addition to your collection.",
        seoTitle: "Gold Plated Daisy Flower Cuff | Anti-Tarnish Stainless Steel Jewellery",
        metaDesc: "Chic daisy flower open cuff. 18K gold plated, waterproof, and anti-tarnish stainless steel jewellery that is perfect for everyday stacking.",
        altText: "18K Gold Plated Anti-Tarnish Daisy Flower Cuff",
        etsyLink: "https://www.etsy.com/uk/listing/4547568348/18k-gold-plated-anti-tarnish-daisy" 
    },
    { 
        id: 1, 
        sku: "SSCF-GCZ-01", 
        name: "Anti tarnish Geometric bangle with cubic zirconia stones - 18K Gold Plated", 
        category: "Anti-tarnish Kada", 
        price: 16.99, 
        inStock: true, 
        image: "https://i.etsystatic.com/40040678/r/il/f01e22/8362594725/il_1588xN.8362594725_a8hd.jpg", 
        imageHover: "https://i.etsystatic.com/40040678/r/il/81a7f0/8314706242/il_1588xN.8314706242_9r93.jpg", 
        desc: "Elevate your everyday style with this stunning 18K Gold Plated Geometric Cuff Bangle. Forged in solid anti-tarnish stainless steel, this statement bangle strikes the perfect balance between modern edge and timeless elegance.",
        seoTitle: "Gold Plated Geometric Zircon Bangle | Anti-Tarnish Stainless Steel",
        metaDesc: "Sophisticated textured geometric bangle with cubic zirconia. 18K gold plated anti-tarnish stainless steel jewellery for timeless elegance.",
        altText: "18K Gold Plated Anti-Tarnish Geometric Zircon Bangle",
        etsyLink: "https://www.etsy.com/uk/listing/4546445474/18k-gold-plated-anti-tarnish-geometric" 
    },
    { 
        id: 23, 
        sku: "TRNK-CHK-23", 
        name: "Heart Motif Blue Choker Necklace Set", 
        category: "Traditional Jewellery", 
        price: 20.99, 
        image: "https://i.etsystatic.com/40040678/r/il/14ccbd/8411663121/il_1140xN.8411663121_cjfe.jpg", 
        imageHover: "https://i.etsystatic.com/40040678/r/il/904348/8363781070/il_1140xN.8363781070_k57g.jpg", 
        desc: "Discover the perfect blend of tradition and contemporary flair with this stunning Blue Heart Motif Choker Set from LilAura. Inspired by timeless South Indian craftsmanship, this multi-layered necklace features rich, cobalt-blue stones set against radiant gold-plated brass, accented with delicate ruby-red and emerald-green micro-stones.",
        seoTitle: "Blue Indian Choker Necklace Set | Traditional Gold Plated Heart Motif Jewellery",
        metaDesc: "Blue Heart Motif Choker Set from LilAura. Inspired by timeless South Indian craftsmanship, this multi-layered necklace features rich, cobalt-blue stones set against radiant gold-plated brass, accented with delicate ruby-red and emerald-green micro-stones.",
        altText: "Blue Indian Choker Necklace Set Traditional Gold Plated Heart Motif Jewellery",
        etsyLink: "https://www.etsy.com/uk/listing/4553285308/blue-choker-necklace-set-traditional" 
    }
];

// --- 2. PAGE LOAD & RENDERING LOGIC ---
document.addEventListener('DOMContentLoaded', () => {

    const mobileBtn = document.getElementById('mobile-menu-btn');
    const mobileMenu = document.getElementById('mobile-menu');
    const iconOpen = document.getElementById('menu-icon-open');
    const iconClose = document.getElementById('menu-icon-close');

    if (mobileBtn && mobileMenu) {
        mobileBtn.addEventListener('click', () => {
            mobileMenu.classList.toggle('hidden');
            iconOpen.classList.toggle('hidden');
            iconClose.classList.toggle('hidden');
        });
    }

    const shopGrid = document.getElementById('shop-grid');
    if (shopGrid) {
        renderShop(products);
    }

    const productDetail = document.getElementById('product-detail-container');
    if (productDetail) {
        const urlParams = new URLSearchParams(window.location.search);
        const pid = parseInt(urlParams.get('id'));
        const product = products.find(p => p.id === pid) || products[0]; 
        renderProductDetail(product);
    }
});

function renderShop(items) {
    const container = document.getElementById('shop-grid');
    if (!container) return; 
    
    if (items.length === 0) {
        container.innerHTML = `<div class="col-span-full text-center py-12 font-serif text-xl text-LilAura-subtle">No jewelry items found in this category.</div>`;
        return;
    }

    // --- SORTING LOGIC: Keep IDs 16 through 22 at the absolute bottom ---
    const bottomIds = [16, 17, 18, 19, 20, 21, 22];
    
    const regularItems = items.filter(p => !bottomIds.includes(p.id));
    const bottomItems = items.filter(p => bottomIds.includes(p.id));
    const sortedItems = [...regularItems, ...bottomItems];

    container.innerHTML = sortedItems.map(p => {
        const isVideo = p.imageHover && p.imageHover.endsWith('.mp4');
        const hoverElement = isVideo 
            ? `<video src="${p.imageHover}" autoplay loop muted playsinline class="absolute inset-0 w-full h-full object-cover opacity-0 transition-all duration-700 ease-out group-hover:opacity-100 group-hover:scale-105 z-20"></video>`
            : `<img src="${p.imageHover ? p.imageHover : p.image}" alt="${p.altText || p.name}" loading="lazy" class="absolute inset-0 w-full h-full object-cover opacity-0 transition-all duration-700 ease-out group-hover:opacity-100 group-hover:scale-105 z-20">`;

        return `
        <div class="group cursor-pointer flex flex-col justify-between" onclick="window.location.href='product.html?id=${p.id}'">
            <div>
                <div class="w-full aspect-[3/4] overflow-hidden bg-gray-100 relative border border-LilAura-gold/10">
                    <img src="${p.image}" alt="${p.altText || p.name}" loading="lazy" 
                         class="absolute inset-0 w-full h-full object-cover transition-all duration-700 ease-out group-hover:opacity-0 group-hover:scale-105 z-10">
                    
                    ${hoverElement}
                    
                    <div class="absolute top-2 left-2 bg-black/70 backdrop-blur-sm text-LilAura-gold text-[9px] px-2 py-1 tracking-widest uppercase font-sans z-30">Official Etsy Item</div>
                    <div class="absolute bottom-0 inset-x-0 bg-gradient-to-t from-black/60 to-transparent p-3 opacity-0 group-hover:opacity-100 transition-opacity flex justify-end z-30">
                        <span class="text-white text-[10px] uppercase tracking-widest bg-LilAura-emerald px-2 py-1">View Details &rarr;</span>
                    </div>
                </div>
                <div class="mt-4 text-center">
                    <p class="text-[9px] tracking-[0.2em] uppercase text-LilAura-emerald mb-1">${p.category}</p>
                    <h3 class="font-serif text-base md:text-lg text-LilAura-text leading-snug group-hover:text-LilAura-gold transition-colors line-clamp-2">${p.name}</h3>
                </div>
            </div>
            <div class="mt-2 text-center">
                <p class="font-price text-xl text-LilAura-gold font-normal tracking-widest">£${p.price.toFixed(2)}</p>
            </div>
        </div>
        `;
    }).join('');
}

function renderProductDetail(p) {
    document.getElementById('p-cat').innerText = p.category;
    document.getElementById('p-name').innerText = p.name;
    document.getElementById('p-price').innerText = `£${p.price.toFixed(2)}`;
    document.getElementById('p-desc').innerText = p.desc;
    document.getElementById('p-sku').innerText = `SKU: ${p.sku}`; 
    
    // SEO INJECTION
    document.title = p.seoTitle || `${p.name} | LilAura UK`;
    let metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
        metaDescription.setAttribute('content', p.metaDesc || p.desc);
    }
    
    // IMAGE & ALT TEXT INJECTION
    const baseImg = document.getElementById('p-image');
    if (baseImg) {
        baseImg.src = p.image;
        baseImg.alt = p.altText || p.name;
    }
    
    const hoverImg = document.getElementById('p-image-hover');
    const hoverVid = document.getElementById('p-video-hover');
    
    if (p.imageHover && p.imageHover.endsWith('.mp4')) {
        if (hoverImg) hoverImg.classList.add('hidden');
        if (hoverVid) {
            hoverVid.src = p.imageHover;
            hoverVid.classList.remove('hidden'); 
        }
    } else {
        if (hoverVid) hoverVid.classList.add('hidden'); 
        if (hoverImg) {
            hoverImg.src = p.imageHover ? p.imageHover : p.image;
            hoverImg.alt = p.altText || p.name;
            hoverImg.classList.remove('hidden'); 
        }
    }
    
    // OUT OF STOCK LOGIC
    const soldOutOverlay = document.getElementById('sold-out-overlay');
    const etsyBtn = document.getElementById('buy-etsy-btn');
    
    if (p.inStock === false) {
        if (soldOutOverlay) soldOutOverlay.classList.remove('hidden');
        if (etsyBtn) {
            etsyBtn.innerHTML = `<span>Out of Stock</span>`;
            etsyBtn.classList.add('bg-gray-300', 'text-gray-500', 'cursor-not-allowed', 'pointer-events-none');
            etsyBtn.classList.remove('bg-LilAura-emerald', 'hover:bg-LilAura-gold', 'text-white');
            etsyBtn.href = "#";
        }
    } else {
        if (soldOutOverlay) soldOutOverlay.classList.add('hidden');
        if (etsyBtn) {
            etsyBtn.innerHTML = `<span>Buy Instantly on Etsy</span><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-4 h-4 group-hover:translate-x-1 transition-transform"><path stroke-linecap="round" stroke-linejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" /></svg>`;
            etsyBtn.classList.remove('bg-gray-300', 'text-gray-500', 'cursor-not-allowed', 'pointer-events-none');
            etsyBtn.classList.add('bg-LilAura-emerald', 'hover:bg-LilAura-gold', 'text-white');
            etsyBtn.href = p.etsyLink || "https://www.etsy.com/uk/shop/LilauraElegance";
        }
    }

    // SEO SCHEMA INJECTION (Enriched for Google Rich Results)
    const schemaData = {
      "@context": "https://schema.org/",
      "@type": "Product",
      "name": p.seoTitle || p.name,
      "image": [p.image],
      "description": p.metaDesc || p.desc,
      "sku": p.sku,
      "brand": { "@type": "Brand", "name": "LilAura" },
      "material": p.category.includes("Traditional") ? "Traditional Brass" : "18K Gold Plated Stainless Steel",
      "color": "Gold",
      "category": p.category,
      "offers": {
        "@type": "Offer",
        "priceCurrency": "GBP",
        "price": p.price,
        "itemCondition": "https://schema.org/NewCondition",
        "availability": p.inStock === false ? "https://schema.org/OutOfStock" : "https://schema.org/InStock",
        "url": p.etsyLink || window.location.href,
        "seller": {
            "@type": "Organization",
            "name": "LilAura UK"
        }
      }
    };
    const script = document.createElement('script');
    script.type = "application/ld+json";
    script.text = JSON.stringify(schemaData);
    document.head.appendChild(script);

    // DYNAMIC MATERIALS & BADGE LOGIC
    const badge1 = document.getElementById('dynamic-badge-1');
    const faqMatTitle = document.getElementById('faq-materials-title');
    const faqMatContent = document.getElementById('faq-materials-content');
    const faqCareContent = document.getElementById('faq-care-content');

    if (p.category.includes('Traditional')) {
        if (badge1) {
            badge1.innerHTML = `
                <div class="w-6 h-6 md:w-8 md:h-8 mx-auto mb-2 text-LilAura-gold">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.563.563 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z" /></svg>
                </div>
                <p class="font-sans text-[8px] md:text-[9px] uppercase tracking-widest text-LilAura-subtle">Premium Brass</p>
            `;
        }
        if (faqMatTitle && faqMatContent && faqCareContent) {
            faqMatTitle.innerHTML = `Materials & Finish <span class="transition group-open:rotate-180 text-LilAura-gold"><svg fill="none" height="24" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" viewBox="0 0 24 24" width="24"><polyline points="6 9 12 15 18 9"></polyline></svg></span>`;
            faqMatContent.innerHTML = `Our heritage collections are forged in authentic <strong>traditional brass</strong> with a classic gold coating to honor timeless Indian craftsmanship.`;
            faqCareContent.innerHTML = `To preserve the intricate finish and gold coating, please keep these traditional pieces dry and away from water, perfumes, and harsh chemicals. Gently wipe with a soft cloth after wearing.`;
        }
    } else {
        if (badge1) {
            badge1.innerHTML = `
                <div class="w-6 h-6 md:w-8 md:h-8 mx-auto mb-2 text-LilAura-gold">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                </div>
                <p class="font-sans text-[8px] md:text-[9px] uppercase tracking-widest text-LilAura-subtle">Anti-Tarnish</p>
            `;
        }
        if (faqMatTitle && faqMatContent && faqCareContent) {
            faqMatTitle.innerHTML = `Materials & Anti-Tarnish Guarantee <span class="transition group-open:rotate-180 text-LilAura-gold"><svg fill="none" height="24" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" viewBox="0 0 24 24" width="24"><polyline points="6 9 12 15 18 9"></polyline></svg></span>`;
            faqMatContent.innerHTML = `Our modern pieces are expertly crafted from high-grade <strong>stainless steel</strong> and finished with highly durable <strong>18K gold PVD plating</strong>. This advanced bonding process ensures the jewelry is 100% waterproof, sweat-resistant, and hypoallergenic, meaning it will never tarnish or turn your skin green.`;
            faqCareContent.innerHTML = `Our stainless steel pieces are designed for 24/7 wear, meaning you can swim, shower, and exercise in them without worry. Gently wipe your jewelry with a soft cloth occasionally to restore its eternal shine.`;
        }
    }
}

function filterCategory(cat, event) {
    const buttons = document.querySelectorAll('.filter-btn');
    buttons.forEach(btn => btn.classList.remove('text-LilAura-gold', 'border-LilAura-gold'));
    if (event && event.target) {
        event.target.classList.add('text-LilAura-gold', 'border-LilAura-gold');
    }

    if(cat === 'All') {
        renderShop(products);
    } else {
        const filtered = products.filter(p => p.category === cat);
        renderShop(filtered);
    }
}

// --- 3. LUXURY SOCIAL PROOF (FOMO) LOGIC ---
const ukLocations = ["London", "Birmingham", "Manchester", "Leicester", "Leeds", "Edinburgh", "Glasgow", "Bristol", "Liverpool", "Nottingham", "Bradford"];
const customerNames = ["Priya", "Sarah", "Anjali", "Jessica", "Fatima", "Neha", "Emily", "Aisha", "Chloe", "Riya", "Sonia", "Zara", "Meera", "Rebecca", "Simran"];

function triggerFomoNotification() {
    const fomoPopup = document.getElementById('fomo-popup');
    if (!fomoPopup) return; 

    const randomCity = ukLocations[Math.floor(Math.random() * ukLocations.length)];
    const randomName = customerNames[Math.floor(Math.random() * customerNames.length)];
    const randomProduct = products[Math.floor(Math.random() * products.length)];

    document.getElementById('fomo-text').innerText = `${randomName} in ${randomCity} recently ordered via Etsy`;
    document.getElementById('fomo-product').innerText = randomProduct.name;

    fomoPopup.classList.add('show-fomo');

    sessionStorage.setItem('fomoShown', 'true');

    setTimeout(() => {
        fomoPopup.classList.remove('show-fomo');
    }, 5000);
}

if (!sessionStorage.getItem('fomoShown')) {
    setTimeout(() => {
        triggerFomoNotification();
    }, 8000); 
}
