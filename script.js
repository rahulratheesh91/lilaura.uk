/* LILAURA UNIFIED ENGINE (Design + SEO) */

// 1. URL POLISH
if (window.location.pathname.endsWith('.html') && window.location.pathname !== '/index.html') {
    window.history.replaceState(null, '', window.location.pathname.replace(/\.html$/, '') + window.location.search);
} else if (window.location.pathname === '/index.html') {
    window.history.replaceState(null, '', '/');
}

// 2. PRODUCT DATABASE
const products = [
    { id: 16, sku: "SSCF-ALBR-16", name: "18K Gold Plated Stainless Steel Cuff Bracelet", category: "Anti-tarnish Kada", price: 16.49, inStock: true, image: "https://i.etsystatic.com/40040678/r/il/43a595/8197151304/il_1140xN.8197151304_btta.jpg", imageHover: "", desc: "Premium 18K PVD gold-plated stainless steel cuff bracelet. Waterproof, sweat-resistant, and highly resistant to tarnishing for everyday luxury wear.", seoTitle: "18K Gold Plated Cuff Bracelet | Waterproof Stainless Steel Kada | LilAura UK", metaDesc: "Shop the premium 18K PVD gold-plated stainless steel cuff bracelet by LilAura. Waterproof, sweat-resistant, and tarnish-resistant jewelry in the UK.", altText: "Close-up of 18K gold plated stainless steel cuff bracelet on a neutral background", etsyLink: "https://www.etsy.com/uk/listing/4530558606/18k-gold-plated-stainless-steel-cuff" },
    { id: 17, sku: "SSCF-INF-17", name: "Infinity Cuff with Double Layered Zircon Stones", category: "Anti-tarnish Kada", price: 18.49, inStock: false, image: "https://i.etsystatic.com/40040678/r/il/7a4f17/8197075762/il_1140xN.8197075762_9l3z.jpg", imageHover: "", desc: "Stunning infinity motif open cuff embellished with double-layered sparkling zircon stones. Crafted from premium stainless steel, this 18K PVD gold-plated bracelet is water-resistant and perfect for everyday wear in the UK.", seoTitle: "18K Gold Plated Infinity Cuff | Stainless Steel Jewellery UK", metaDesc: "Discover our stunning 18K PVD gold-plated infinity cuff with zircon stones. Water-resistant stainless steel jewelry by LilAura.", altText: "18K Gold Plated Infinity Cuff Bracelet with Zircon Stones", etsyLink: "https://www.etsy.com/uk/listing/4530529391/anti-tarnish-infinity-cuff-with-double" },
    { id: 18, sku: "SSBR-CHM-18", name: "Charm Bracelet (Celestial & Floral Motifs)", category: "Anti-tarnish Bracelets", price: 12.99, inStock: true, image: "https://i.etsystatic.com/40040678/r/il/dc3ce4/8237168671/il_1140xN.8237168671_jfzc.jpg", imageHover: "", desc: "Delicate charm bracelet featuring intricate celestial and floral motifs on a durable stainless steel chain. 18K PVD gold-plated and highly resistant to water and sweat.", seoTitle: "Gold Plated Charm Bracelet | Stainless Steel Jewellery | LilAura", metaDesc: "Shop delicate celestial and floral charm bracelets. 18K PVD gold-plated stainless steel jewellery designed for everyday wear in the UK.", altText: "Gold Plated Stainless Steel Charm Bracelet", etsyLink: "https://www.etsy.com/uk/listing/4529459089/anti-tarnish-charm-bracelets-with" },
    { id: 19, sku: "SSFR-RNG-19", name: "Stainless Steel Statement Ring with Zircon Stones", category: "Finger Rings", price: 12.49, inStock: true, image: "https://i.etsystatic.com/40040678/r/il/8fa288/8237035721/il_1140xN.8237035721_745p.jpg", imageHover: "", desc: "Bold statement ring crafted from durable stainless steel with embedded brilliant-cut zircon stones. Finished with a high-grade 18K PVD gold plating for long-lasting wear.", seoTitle: "Gold Plated Zircon Statement Ring | Stainless Steel | LilAura UK", metaDesc: "Bold 18K PVD gold-plated statement ring with brilliant zircon stones. Crafted from stainless steel for water-resistant, long-lasting luxury.", altText: "18K Gold Plated Statement Ring with Zircon Stones", etsyLink: "https://www.etsy.com/uk/listing/4529409433/anti-tarnish-stainless-steel-rings-with" },
    { id: 5, sku: "TRNK-PAL-05", name: "Traditional Palakka Choker Necklace Set with Matching Earstuds", category: "Traditional Jewellery", price: 22.99, inStock: true, image: "https://i.etsystatic.com/40040678/r/il/a1210d/8348817959/il_1588xN.8348817959_chs4.jpg", imageHover: "https://i.etsystatic.com/40040678/r/il/0f7782/8300923278/il_1588xN.8300923278_m5s3.jpg", desc: "Authentic South Indian heritage Palakka choker set. Includes matching traditional earstuds. Perfect for weddings and festive wear, crafted beautifully in traditional gold-coated brass.", seoTitle: "Traditional Indian Palakka Choker Set | Brass Heritage Jewellery UK | LilAura", metaDesc: "Authentic South Indian Palakka choker set with matching earstuds. Premium traditional gold-coated brass jewellery perfect for weddings and cultural events.", altText: "Traditional Indian Brass Palakka Choker Necklace Set", etsyLink: "https://www.etsy.com/uk/listing/4529392003/traditional-palakka-choker-necklace-set" },
    { id: 20, sku: "SSNK-EMR-20", name: "Gold Plated Emerald Pendant Necklace", category: "Anti-tarnish Necklaces", price: 15.49, inStock: true, image: "https://i.etsystatic.com/40040678/r/il/ffa352/8189114976/il_1140xN.8189114976_1kwd.jpg", imageHover: "", desc: "Exquisite geometric emerald-cut green stone pendant on an 18K PVD gold-plated chain. Simple, daily luxury made from robust stainless steel.", seoTitle: "Gold Plated Emerald Pendant | Stainless Steel Necklace | LilAura", metaDesc: "Exquisite 18K PVD gold-plated emerald-cut pendant necklace. Water-resistant stainless steel jewellery perfect for everyday luxury in the UK.", altText: "18K Gold Plated Emerald Pendant Necklace", etsyLink: "https://www.etsy.com/uk/listing/4529214581/anti-tarnish-gold-plated-emerald-pendant" },
    { id: 21, sku: "SSCF-HPR-21", name: "Gold Plated Stainless Steel Heart Pearl Bangle", category: "Anti-tarnish Kada", price: 17.99, inStock: true, image: "https://i.etsystatic.com/40040678/r/il/8b2186/8160669462/il_1140xN.8160669462_1gej.jpg", imageHover: "", desc: "Romantic open cuff bangle featuring twin mother-of-pearl heart accents set in durable 18K PVD gold-plated stainless steel. Highly resistant to tarnishing.", seoTitle: "Gold Plated Pearl Bangle | Stainless Steel Jewellery UK", metaDesc: "Romantic open cuff bangle with twin mother-of-pearl hearts. 18K PVD gold-plated stainless steel jewellery for daily wear.", altText: "18K Gold Plated Stainless Steel Heart Pearl Bangle", etsyLink: "https://www.etsy.com/uk/listing/4525317383/gold-plated-stainless-steel-heart-pearl" },
    { id: 8, sku: "TRNK-PAL-08", name: "Traditional Kerala Palakka Choker Necklace Set with Jhumka Earrings", category: "Traditional Jewellery", price: 22.79, inStock: true, image: "https://i.etsystatic.com/40040678/r/il/344f38/8294466386/il_1588xN.8294466386_g100.jpg", imageHover: "https://i.etsystatic.com/40040678/r/il/febf4b/8342363125/il_1588xN.8342363125_44u7.jpg", desc: "Grand Kerala-style green Palakka short choker necklace paired with traditional bell-shaped Jhumka earrings. Classic temple jewelry cast in traditional gold-coated brass.", seoTitle: "Kerala Palakka Choker & Jhumka Set | Traditional Indian Brass Jewellery", metaDesc: "Grand Kerala-style green Palakka choker with traditional Jhumka earrings. Authentic traditional gold-coated brass jewellery crafted for Indian heritage aesthetics.", altText: "Traditional Indian Brass Kerala Palakka Choker with Jhumka Earrings", etsyLink: "https://www.etsy.com/uk/listing/4525327387/traditional-kerala-palakka-choker" },
    { id: 9, sku: "TRNK-COIN-09", name: "Ganapathy Coin Palakka Choker Traditional Heritage Necklace", category: "Traditional Jewellery", price: 20.99, inStock: false, image: "https://i.etsystatic.com/40040678/r/il/433e57/8300782474/il_1588xN.8300782474_9tgy.jpg", imageHover: "https://i.etsystatic.com/40040678/r/il/07ba53/8348676775/il_1588xN.8348676775_9har.jpg", desc: "Traditional Kasu Mala coin choker featuring Lord Ganesha motifs interlaced with classic Palakka stones. Heirloom craftsmanship utilizing traditional gold-coated brass.", seoTitle: "Ganapathy Coin Kasu Mala | Traditional Indian Brass Jewellery UK | LilAura", metaDesc: "Traditional Kasu Mala coin choker featuring Lord Ganesha. Premium traditional gold-coated brass heritage jewellery perfect for South Indian weddings.", altText: "Traditional Indian Brass Ganapathy Coin Palakka Choker", etsyLink: "https://www.etsy.com/uk/listing/4483539459/coin-palakka-choker-traditional-necklace" },
    { id: 22, sku: "SSNK-EMR-22", name: "Gold Plated Emerald Green Leaf Pendant Necklace", category: "Anti-tarnish Necklaces", price: 16.99, inStock: true, image: "https://i.etsystatic.com/40040678/r/il/e0133d/8235370965/il_1140xN.8235370965_lcqj.jpg", imageHover: "", desc: "Exquisite geometric emerald-cut green stone pendant on an 18K PVD gold-plated chain. Made of solid stainless steel to guarantee durable daily wear.", seoTitle: "Gold Plated Emerald Leaf Pendant | Stainless Steel Jewellery", metaDesc: "Geometric emerald green leaf pendant on an 18K PVD gold-plated chain. Water-resistant stainless steel necklace for daily wear.", altText: "18K Gold Plated Emerald Green Leaf Pendant", etsyLink: "https://www.etsy.com/uk/listing/4533568863/anti-tarnish-gold-plated-emerald-green" },
    { id: 11, sku: "TRNK-PAL-11", name: "Traditional Indian Lakshmi Choker Necklace Set with Matching Ear studs", category: "Traditional Jewellery", price: 33.99, inStock: true, image: "https://i.etsystatic.com/40040678/r/il/78acc5/8345517199/il_1588xN.8345517199_5d0d.jpg", imageHover: "https://i.etsystatic.com/40040678/r/il/398816/8297620094/il_1588xN.8297620094_50p8.jpg", desc: "Authentic South Indian heritage Palakka choker set. Includes matching traditional earstuds. Beautifully forged in traditional gold-coated brass, perfect for weddings and festive wear.", seoTitle: "Lakshmi Choker Necklace Set | Traditional Indian Brass Jewellery | LilAura", metaDesc: "Authentic South Indian Lakshmi temple choker set. Crafted in traditional gold-coated brass, this heritage jewellery is ideal for bridal and festive wear.", altText: "Traditional Indian Brass Lakshmi Choker Necklace Set", etsyLink: "https://www.etsy.com/uk/listing/4533558563/traditional-indian-lakshmi-choker" },
    { id: 12, sku: "TRNK-PAL-12", name: "Traditional Indian Green Meenakari Choker Necklace Set", category: "Traditional Jewellery", price: 15.99, inStock: true, image: "https://i.etsystatic.com/40040678/r/il/3bd6bb/8348520825/il_1588xN.8348520825_f3eq.jpg", imageHover: "https://i.etsystatic.com/40040678/r/il/ded90e/8348520811/il_1588xN.8348520811_n4rl.jpg", desc: "Elegant green Meenakari lotus design choker set. Exquisite traditional gold-coated brass handiwork that perfects any traditional Indian occasion.", seoTitle: "Green Meenakari Choker Set | Traditional Indian Brass Jewellery UK", metaDesc: "Elegant green Meenakari lotus design choker set. Premium traditional gold-coated brass jewellery that adds a touch of heritage elegance to any occasion.", altText: "Traditional Indian Brass Green Meenakari Choker Necklace Set", etsyLink: "https://www.etsy.com/uk/listing/4535086033/green-lotus-meenakari-necklace-set" },
    { id: 13, sku: "TRNK-PAL-13", name: "Traditional Indian Red Meenakari Choker Necklace Set", category: "Traditional Jewellery", price: 17.99, inStock: true, image: "https://i.etsystatic.com/40040678/r/il/51c271/8348522389/il_1588xN.8348522389_7zme.jpg", imageHover: "https://i.etsystatic.com/40040678/r/il/4ba53c/8300627856/il_1588xN.8300627856_qz6y.jpg", desc: "Elegant Red Meenakari lotus design choker. Sculpted in traditional gold-coated brass to showcase vibrant Indian heritage colors for cultural celebrations.", seoTitle: "Red Meenakari Choker Necklace Set | Traditional Indian Brass Jewellery", metaDesc: "Stunning red Meenakari lotus choker set. Discover authentic traditional gold-coated brass jewellery perfect for cultural celebrations and Indian weddings.", altText: "Traditional Indian Brass Red Meenakari Choker Necklace Set", etsyLink: "https://www.etsy.com/uk/listing/4535073097/red-lotus-meenakari-necklace-set" },
    { id: 14, sku: "SSCF-MSC-14", name: "18K Gold Plated Moving Stone Cuff Bracelet", category: "Anti-tarnish Kada", price: 14.99, inStock: true, image: "https://i.etsystatic.com/40040678/r/il/2fbb3e/8346941703/il_1588xN.8346941703_2nlb.jpg", imageHover: "https://v.etsystatic.com/video/upload/ac_none,du_15,q_auto:good/jcndfbtklzpickvk6xz3.mp4", desc: "Add a touch of playful elegance to your everyday look with this stunning 18K PVD Gold Plated Moving Stone Cuff. Crafted from durable stainless steel, the three sparkling stone beads inside move freely.", seoTitle: "Moving Stone Cuff Bracelet | Gold Plated Stainless Steel", metaDesc: "Playful 18K PVD gold-plated moving stone cuff. Water-resistant stainless steel jewellery featuring a dynamic rolling bead design.", altText: "18K Gold Plated Moving Stone Cuff Bracelet", etsyLink: "https://www.etsy.com/uk/listing/4544224715/18k-gold-plated-moving-stone-cuff" },
    { id: 15, sku: "TRNK-TLCN-15", name: "Tri-layered traditional coin necklace set", category: "Traditional Jewellery", price: 21.99, inStock: false, image: "https://i.etsystatic.com/40040678/r/il/92675a/8300843552/il_1588xN.8300843552_1ope.jpg", imageHover: "https://i.etsystatic.com/40040678/r/il/4e7dd8/8300843550/il_1588xN.8300843550_t434.jpg", desc: "Elegant Tri-layered traditional coin necklace set perfect for traditional occasions. Designed with premium gold-coated traditional brass.", seoTitle: "Tri-Layered Coin Necklace Set | Traditional Indian Brass Jewellery UK", metaDesc: "Elegant tri-layered traditional coin necklace set. Authentic traditional gold-coated brass jewellery crafted for stunning heritage style.", altText: "Traditional Indian Brass Tri-Layered Coin Necklace Set", etsyLink: "https://www.etsy.com/uk/listing/4537960719/tri-layered-traditional-coin-necklace" },
    { id: 10, sku: "SSNK-HNS-SC-10", name: "Interlocking Heart Necklace with zircon stones and Snake Chain", category: "Anti-tarnish Necklaces", price: 14.99, inStock: true, image: "https://i.etsystatic.com/40040678/r/il/22fdf0/8394955889/il_794xN.8394955889_hxeo.jpg", imageHover: "https://i.etsystatic.com/40040678/r/il/270fd6/8347068668/il_794xN.8347068668_h0yl.jpg", desc: "Featuring two intertwined hearts one lined with brilliant zircon stones and the other finished in smooth 18K PVD gold plating. Premium stainless steel ensures long-lasting quality.", seoTitle: "Gold Plated Interlocking Heart Necklace | Stainless Steel", metaDesc: "18K PVD gold-plated interlocking heart necklace with zircon stones. Premium stainless steel jewellery for everyday wear.", altText: "18K Gold Plated Interlocking Heart Necklace", etsyLink: "https://www.etsy.com/uk/listing/4542359876/18k-gold-plated-interlocking-heart" },
    { id: 7, sku: "SSNK-KHP-SC-07", name: "Knotted Heart Pendant Necklace and Snake Chain", category: "Anti-tarnish Necklaces", price: 14.49, inStock: true, image: "https://i.etsystatic.com/40040678/r/il/cbe8d1/8395016183/il_794xN.8395016183_6r2h.jpg", imageHover: "https://i.etsystatic.com/40040678/r/il/d54fec/8395016175/il_794xN.8395016175_al3i.jpg", desc: "Featuring an intricate, soft-knotted open heart pendant strung on a sleek snake chain. Made from 18K PVD gold-plated stainless steel for water-resistant durability.", seoTitle: "Gold Plated Knotted Heart Pendant | Stainless Steel Jewellery", metaDesc: "Chic soft-knotted open heart pendant on a snake chain. 18K PVD gold-plated stainless steel necklace for modern everyday elegance.", altText: "18K Gold Plated Knotted Heart Pendant Necklace", etsyLink: "https://www.etsy.com/uk/listing/4542987137/18k-gold-plated-knotted-heart-pendant" },
    { id: 6, sku: "SSNK-PHN-SC-06", name: "Puffy Heart Necklace and Snake Chain", category: "Anti-tarnish Necklaces", price: 15.99, inStock: true, image: "https://i.etsystatic.com/40040678/r/il/aa1651/8347132378/il_794xN.8347132378_paag.jpg", imageHover: "https://i.etsystatic.com/40040678/r/il/6066b0/8347132366/il_794xN.8347132366_hqus.jpg", desc: "Whether you are dressing up for a special evening or adding a touch of romance to your everyday attire, this 18K PVD gold-plated stainless steel piece provides a durable luster wear after wear.", seoTitle: "Gold Plated Puffy Heart Necklace | Stainless Steel | LilAura", metaDesc: "Romantic puffy heart necklace on a durable snake chain. 18K PVD gold-plated stainless steel jewellery crafted for everyday wear.", altText: "18K Gold Plated Puffy Heart Necklace", etsyLink: "https://www.etsy.com/uk/listing/4536791687/18k-gold-plated-puffy-heart-necklace" },
    { id: 4, sku: "SSCF-BCF-04", name: "Bamboo Cuff", category: "Anti-tarnish Kada", price: 15.99, inStock: true, image: "https://i.etsystatic.com/40040678/r/il/3ce51c/8299089674/il_794xN.8299089674_1zdo.jpg", imageHover: "https://i.etsystatic.com/40040678/r/il/cecc15/8346984277/il_794xN.8346984277_j1kv.jpg", desc: "Featuring an intricate, organic bamboo-inspired joint design, this piece effortlessly blends modern elegance with natural charm. Crafted from 18K PVD gold-plated stainless steel, it serves as a water-resistant everyday staple.", seoTitle: "Gold Plated Bamboo Cuff Bracelet | Stainless Steel Jewellery", metaDesc: "Organic bamboo-inspired open cuff bracelet. 18K PVD gold-plated stainless steel jewellery designed for everyday durability.", altText: "18K Gold Plated Bamboo Cuff Bracelet", etsyLink: "https://www.etsy.com/uk/listing/4544247010/18k-gold-plated-anti-tarnish-bamboo-cuff" },
    { id: 3, sku: "SSCF-OPC-03", name: "Open Pearl Cuff - 18K Gold Plated", category: "Anti-tarnish Kada", price: 16.00, inStock: true, image: "https://i.etsystatic.com/40040678/r/il/7f3803/8348706407/il_1588xN.8348706407_c8gw.jpg", imageHover: "https://i.etsystatic.com/40040678/r/il/a7d942/8300811782/il_1588xN.8300811782_jtsa.jpg", desc: "Featuring an artistic, wavy melted-metal silhouette accented with lustrous white pearls. This 18K PVD gold-plated stainless steel cuff blends contemporary sculptural design with classic sophistication.", seoTitle: "Gold Plated Open Pearl Cuff | Stainless Steel | LilAura UK", metaDesc: "Wavy melted-metal silhouette cuff accented with lustrous pearls. 18K PVD gold-plated stainless steel jewellery.", altText: "18K Gold Plated Open Pearl Cuff", etsyLink: "https://www.etsy.com/uk/listing/4544460683/18k-gold-plated-anti-tarnish-open-pearl" },
    { id: 2, sku: "SSCF-DFC-02", name: "Daisy Flower Cuff - 18K Gold Plated", category: "Anti-tarnish Kada", price: 14.99, inStock: true, image: "https://i.etsystatic.com/40040678/r/il/fffc67/8370637995/il_1588xN.8370637995_7884.jpg", imageHover: "https://i.etsystatic.com/40040678/r/il/6b9b2e/8370637991/il_1588xN.8370637991_m4fb.jpg", desc: "Whether you're dressing up for a special occasion or looking for a chic accessory for daily wear, this water-resistant, 18K PVD gold-plated stainless steel cuff is the ultimate addition to your collection.", seoTitle: "Gold Plated Daisy Flower Cuff | Stainless Steel Jewellery", metaDesc: "Chic daisy flower open cuff. 18K PVD gold-plated stainless steel jewellery that is perfect for everyday stacking.", altText: "18K Gold Plated Daisy Flower Cuff", etsyLink: "https://www.etsy.com/uk/listing/4547568348/18k-gold-plated-anti-tarnish-daisy" },
    { id: 1, sku: "SSCF-GCZ-01", name: "Geometric bangle with cubic zirconia stones - 18K Gold Plated", category: "Anti-tarnish Kada", price: 16.99, inStock: true, image: "https://i.etsystatic.com/40040678/r/il/f01e22/8362594725/il_1588xN.8362594725_a8hd.jpg", imageHover: "https://i.etsystatic.com/40040678/r/il/81a7f0/8314706242/il_1588xN.8314706242_9r93.jpg", desc: "Elevate your everyday style with this stunning 18K PVD Gold Plated Geometric Cuff Bangle. Forged in solid stainless steel, this statement bangle strikes the perfect balance between modern edge and timeless elegance.", seoTitle: "Gold Plated Geometric Zircon Bangle | Stainless Steel", metaDesc: "Sophisticated textured geometric bangle with cubic zirconia. 18K PVD gold-plated stainless steel jewellery for timeless elegance.", altText: "18K Gold Plated Geometric Zircon Bangle", etsyLink: "https://www.etsy.com/uk/listing/4546445474/18k-gold-plated-anti-tarnish-geometric" },
    { id: 23, sku: "TRNK-CHK-23", name: "Heart Motif Blue Choker Necklace Set", category: "Traditional Jewellery", price: 20.99, inStock: true, image: "https://i.etsystatic.com/40040678/r/il/14ccbd/8411663121/il_1140xN.8411663121_cjfe.jpg", imageHover: "https://i.etsystatic.com/40040678/r/il/904348/8363781070/il_1140xN.8363781070_k57g.jpg", desc: "Discover the perfect blend of tradition and contemporary flair with this stunning Blue Heart Motif Choker Set from LilAura. Inspired by timeless South Indian craftsmanship, this multi-layered necklace features rich, cobalt-blue stones set against radiant gold-coated traditional brass.", seoTitle: "Blue Indian Choker Necklace Set | Traditional Gold Coated Brass Jewellery", metaDesc: "Blue Heart Motif Choker Set from LilAura. Inspired by timeless South Indian craftsmanship, this piece features cobalt-blue stones set against traditional gold-coated brass.", altText: "Blue Indian Choker Necklace Set Traditional Gold Coated Brass", etsyLink: "https://www.etsy.com/uk/listing/4553285308/blue-choker-necklace-set-traditional" },
    { id: 24, sku: "TRNK-CHK-24", name: "Ganesh Lakshmi Coin Choker with Earrings", category: "Traditional Jewellery", price: 23.99, inStock: true, image: "https://i.etsystatic.com/40040678/r/il/e50271/8363857578/il_1588xN.8363857578_n8gm.jpg", imageHover: "https://i.etsystatic.com/40040678/r/il/19135a/8411740379/il_1588xN.8411740379_qzoo.jpg", desc: "Embrace the rich heritage of South Indian craftsmanship with the LilAura Temple Coin Choker Set. Inspired by royal antique designs, this stunning 'Kasumala' necklace features intricately embossed Ganesha motifs and Goddess Lakshmi coins.", seoTitle: "Temple Coin Necklace Set - Traditional Gold Coated Brass", metaDesc: "Traditional gold-coated brass Lakshmi Kasumala with earrings, Ruby and emerald ethnic wedding jewellery", altText: "Traditional Lakshmi Kasumala with earrings", etsyLink: "https://www.etsy.com/uk/listing/4553282701/antique-matte-gold-plated-temple" },
    { id: 25, sku: "SSCF-BNC-25", name: "Nail Cuff - 18K Gold Plated", category: "Anti-tarnish Kada", price: 13.99, inStock: true, image: "https://i.etsystatic.com/40040678/r/il/ba2a6f/8462317781/il_794xN.8462317781_jom8.jpg", imageHover: "https://v.etsystatic.com/e/videos/5f67/b72e32d9-0511-4c51-bce5-7bcf769d3abd/vid_v1.mp4", desc: "Featuring an artistic, wavy melted-metal silhouette. This 18K PVD gold-plated stainless steel cuff blends contemporary sculptural design with classic sophistication.", seoTitle: "Gold Plated nail Cuff | Stainless Steel | LilAura UK", metaDesc: "Bent Nail-metal silhouette cuff. 18K PVD gold-plated stainless steel jewellery.", altText: "18K Gold Plated Nail Cuff", etsyLink: "https://www.etsy.com/uk/listing/4560286618/18k-gold-plated-anti-tarnish-minimalist" }
];

// 3. CART & UI LOGIC
const $ = s => document.querySelector(s), $$ = s => document.querySelectorAll(s);
let cart = JSON.parse(localStorage.getItem('lilauraCart') || '[]');
let wishes = JSON.parse(localStorage.getItem('lilauraWish') || '[]');

function toast(m) {
    let t = $('#toast'); if(!t) return;
    t.textContent = m; t.classList.add('show');
    setTimeout(() => t.classList.remove('show'), 2000);
}

function saveCart() {
    localStorage.setItem('lilauraCart', JSON.stringify(cart));
    localStorage.setItem('lilauraWish', JSON.stringify(wishes));
    renderCart();
    const countEl = $('#cartCount');
    if(countEl) countEl.textContent = cart.reduce((a, x) => a + x.qty, 0);
}

function renderCart() {
    let box = $('#cartItems'), bottom = $('#cartBottom');
    if(!box || !bottom) return;
    if(!cart.length){
        box.innerHTML = `<div class="cart-empty">Your bag is waiting.<br><br><a class="under" href="shop.html" onclick="closeDrawer()">Discover the edit</a></div>`;
        bottom.innerHTML = ''; return;
    }
    box.innerHTML = cart.map((x, i) => `
        <div class="cart-item">
            <img src="${x.img}">
            <div style="flex:1">
                <h4>${x.name}</h4>
                <small class="price-mod">£${x.price.toFixed(2)}</small><small style="letter-spacing:0.1em; color:var(--gold); text-transform:uppercase; margin-left:8px">· Qty ${x.qty}</small><br>
                <button onclick="removeItem(${i})" style="border:0;background:none;padding:10px 0 0;text-decoration:underline;font-size:10px; color:var(--muted); cursor:pointer">Remove</button>
            </div>
        </div>`).join('');
    let total = cart.reduce((a, x) => a + x.price * x.qty, 0);
    bottom.innerHTML = `
        <div class="cart-total"><span>Total</span><span class="price-mod">£${total.toFixed(2)}</span></div>
        <button class="checkout" onclick="window.open('https://www.etsy.com/uk/shop/LilauraElegance', '_blank')">Checkout securely on Etsy</button>`;
}

function removeItem(i) { cart.splice(i, 1); saveCart(); }
function openDrawer() { $('#drawer')?.classList.add('open'); $('#overlay')?.classList.add('open'); document.body.classList.add('lock'); }
function closeDrawer() { $('#drawer')?.classList.remove('open'); $('#overlay')?.classList.remove('open'); document.body.classList.remove('lock'); }

function addToCart(id) {
    const p = products.find(x => x.id === id); if(!p) return;
    let item = cart.find(x => x.name === p.name);
    if(item) item.qty++; else cart.push({name: p.name, price: p.price, img: p.image, qty: 1});
    saveCart(); toast(p.name + ' added to bag'); openDrawer();
}

function toggleWish(event, id) {
    event.stopPropagation(); const p = products.find(x => x.id === id); if(!p) return;
    if(wishes.includes(p.name)) { wishes = wishes.filter(x => x !== p.name); toast('Removed from wishlist'); event.target.classList.remove('active'); } 
    else { wishes.push(p.name); toast('Added to wishlist'); event.target.classList.add('active'); }
    saveCart();
}

// 4. RENDERING ENGINES
document.addEventListener('DOMContentLoaded', () => {
    if($('#cartBtn')) $('#cartBtn').onclick = openDrawer;
    if($('#closeDrawer')) $('#closeDrawer').onclick = closeDrawer;
    if($('#overlay')) $('#overlay').onclick = closeDrawer;
    if($('#menuBtn')) $('#menuBtn').onclick = () => $('#mega').classList.toggle('open');
    saveCart();

    const shopGrid = document.getElementById('shop-grid');
    if (shopGrid) renderShop(products);

    // Enhanced Filter Logic (Handles Kadas, Cuffs & Bracelets together)
    $$('.tab').forEach(b => b.onclick = () => {
        $$('.tab').forEach(x => x.classList.remove('active'));
        b.classList.add('active');
        const f = b.dataset.filter.toLowerCase();

        if (!shopGrid) return;

        if (f === 'all') {
            renderShop(products);
        } else if (f === 'kadas' || f === 'bracelets' || f === 'cuffs') {
            const wristwear = products.filter(p => 
                p.category.toLowerCase().includes('kada') || 
                p.category.toLowerCase().includes('bracelet') ||
                p.name.toLowerCase().includes('cuff') ||
                p.name.toLowerCase().includes('bangle')
            );
            renderShop(wristwear);
        } else {
            renderShop(products.filter(p => 
                p.category.toLowerCase().includes(f) ||
                p.name.toLowerCase().includes(f)
            ));
        }
    });

    const detailContainer = document.getElementById('product-detail-container');
    if (detailContainer) {
        const params = new URLSearchParams(window.location.search);
        const p = products.find(x => x.id === parseInt(params.get('id'))) || products[0];
        renderDetail(p);
    }
    
    if(!sessionStorage.getItem('fomoShown')) setTimeout(triggerFomo, 8000);
    setInterval(updateTimer, 1000); updateTimer(); renderRecent();
});

function renderShop(items) {
    const container = document.getElementById('shop-grid');
    if (!container) return;
    if (!items.length) { container.innerHTML = `<div style="grid-column:1/-1; text-align:center; padding:50px 0;">No items found.</div>`; return; }

    // --- SORTING LOGIC: Keep specific IDs at the bottom ---
    const bottomIds = [16, 17, 18, 19, 20, 21, 22];
    const regularItems = items.filter(p => !bottomIds.includes(p.id));
    const bottomItems = items.filter(p => bottomIds.includes(p.id));
    const sortedItems = [...regularItems, ...bottomItems];

    container.innerHTML = sortedItems.map(p => {
        const isVid = p.imageHover && p.imageHover.endsWith('.mp4');
        const hoverHTML = isVid ? `<video src="${p.imageHover}" autoplay loop muted class="hover-visual"></video>` : `<img src="${p.imageHover || p.image}" class="hover-img">`;
        const tag = p.inStock ? '' : `<span class="tag" style="background:#2C2C2C">Sold Out</span>`;
        const activeWish = wishes.includes(p.name) ? 'active' : '';

        return `
        <article class="product" onclick="window.location.href='product.html?id=${p.id}'">
            <div class="media">
                ${tag}
                <button class="heart ${activeWish}" onclick="toggleWish(event, ${p.id})">♡</button>
                <img src="${p.image}" class="base-img">
                ${hoverHTML}
                <div class="quickbar">
                    <button class="quick" onclick="event.stopPropagation(); window.location.href='product.html?id=${p.id}'">Quick view</button>
                    <button class="add" onclick="event.stopPropagation(); addToCart(${p.id})">Add to bag</button>
                </div>
            </div>
            <div class="pinfo">
                <div class="pmeta">${p.category}</div>
                <div class="pname">${p.name}</div>
                <div class="price">£${p.price.toFixed(2)}</div>
            </div>
        </article>`;
    }).join('');
}

function renderDetail(p) {
    document.title = p.seoTitle || `${p.name} | LilAura UK`;
    $('#p-cat').innerText = p.category; $('#p-sku').innerText = `SKU: ${p.sku}`;
    $('#p-name').innerText = p.name; $('#p-price').innerText = `£${p.price.toFixed(2)}`;
    $('#p-desc').innerText = p.desc;
    
    $('#p-image').src = p.image;
    if (p.imageHover.endsWith('.mp4')) { $('#p-video-hover').src = p.imageHover; $('#p-video-hover').style.display = 'block'; } 
    else { $('#p-image-hover').src = p.imageHover || p.image; }

    $('#buy-btn').onclick = () => { addToCart(p.id); if(!p.inStock) toast('Item is currently out of stock.'); };
    if(!p.inStock) { $('#buy-btn').innerText = "Out of Stock"; $('#buy-btn').style.background = "#ddd"; $('#buy-btn').style.color = "#666"; }

    if (p.category.includes('Traditional')) {
        $('#faq-mat-title').innerHTML = `Materials & Finish <span>+</span>`;
        $('#faq-mat-content').innerHTML = `Forged in authentic traditional brass with a classic gold coating.`;
    } else {
        $('#faq-mat-title').innerHTML = `Anti-Tarnish Guarantee <span>+</span>`;
        $('#faq-mat-content').innerHTML = `Crafted from high-grade stainless steel with 18K gold PVD plating. 100% waterproof.`;
    }

    $$('.accordion').forEach(el => el.onclick = () => el.classList.toggle('active'));
    remember(p);
}

// 5. TIMERS & RECENT VIEWS & POPUPS
function remember(p){
    let r = JSON.parse(localStorage.getItem('lilauraRecent')||'[]').filter(x => x.name !== p.name);
    r.unshift({name: p.name, img: p.image, price: p.price, id: p.id});
    localStorage.setItem('lilauraRecent', JSON.stringify(r.slice(0,6)));
}

function renderRecent(){
    let r = JSON.parse(localStorage.getItem('lilauraRecent')||'[]');
    if(!r.length) return;
    const recentSection = $('#recent');
    const recentGrid = $('#recentGrid');
    
    if (recentSection && recentGrid) {
        recentSection.classList.add('show');
        recentGrid.innerHTML = r.map(x => `
        <div class="recent-card" style="cursor:pointer" onclick="window.location.href='product.html?id=${x.id}'">
            <img src="${x.img}">
            <p>${x.name}<br><small style="font-family:'Bodoni Moda', serif; font-size:14px; color:var(--gold)">£${(+x.price).toFixed(2)}</small></p>
        </div>`).join('');
    }
}

function updateTimer() {
    const end = new Date(Date.now() + 72*60*60*1000); 
    let d = Math.max(0, end - Date.now()), s = Math.floor(d/1000), days = Math.floor(s/86400); s %= 86400;
    let h = Math.floor(s/3600); s %= 3600; let m = Math.floor(s/60), sec = s%60;
    if($('#miniTimer')) $('#miniTimer').textContent = `${String(h+days*24).padStart(2,'0')}:${String(m).padStart(2,'0')}:${String(sec).padStart(2,'0')}`;
    if($('#days')) { $('#days').textContent = String(days).padStart(2,'0'); $('#hours').textContent = String(h).padStart(2,'0'); $('#mins').textContent = String(m).padStart(2,'0'); $('#secs').textContent = String(sec).padStart(2,'0'); }
}

function triggerFomo() {
    toast('P***a in London recently ordered via Etsy.');
    sessionStorage.setItem('fomoShown', 'true');
}
