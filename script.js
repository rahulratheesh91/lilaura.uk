// LilAura Central Analytics & Tracking Layer - Release 4
class LilAuraAnalytics {
    static trackEvent(eventName, params = {}) {
        if (!window.gtag) return;
        const sanitizedParams = { ...params };
        delete sanitizedParams.email;
        delete sanitizedParams.phone;
        delete sanitizedParams.name;
        delete sanitizedParams.address;
        
        window.gtag('event', eventName, sanitizedParams);
    }

    static trackViewItem(product) {
        if (!product) return;
        this.trackEvent('view_item', {
            currency: 'GBP',
            value: Number(product.price) || 0,
            items: [{
                item_id: product.id || product.sku,
                item_name: product.name,
                item_category: product.category || 'Jewellery',
                price: Number(product.price) || 0,
                quantity: 1
            }]
        });
    }

    static trackSelectItem(product, listName = 'Product Catalog') {
        if (!product) return;
        this.trackEvent('select_item', {
            item_list_name: listName,
            items: [{
                item_id: product.id || product.sku,
                item_name: product.name,
                item_category: product.category || 'Jewellery',
                price: Number(product.price) || 0
            }]
        });
    }

    static trackOutboundEtsy(productOrContext) {
        this.trackEvent('click_outbound_etsy', {
            destination_type: productOrContext.type || 'product_listing',
            item_id: productOrContext.id || 'general_shop',
            item_name: productOrContext.name || 'Etsy Store'
        });
    }

    static trackSearch(searchTerm) {
        if (!searchTerm) return;
        this.trackEvent('search', { search_term: searchTerm.trim() });
    }

    static trackAddToWishlist(product) {
        if (!product) return;
        this.trackEvent('add_to_wishlist', {
            currency: 'GBP',
            value: Number(product.price) || 0,
            items: [{
                item_id: product.id || product.sku,
                item_name: product.name,
                price: Number(product.price) || 0
            }]
        });
    }
}
