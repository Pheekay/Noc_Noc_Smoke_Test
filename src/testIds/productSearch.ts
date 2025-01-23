export interface SearchResultTestIds {
    container: {
        productCard: string;
        imageSection: string;
        detailSection: string;
        priceSection: string;
    };
    slider: {
        container: string;
        prevButton: string;
        nextButton: string;
        dots: string;
    };
    product: {
        title: string;
        seller: string;
        rating: string;
        soldCount: string;
        tags: string;
    };
    price: {
        current: string;
        original: string;
        discount: string;
        unit: string;
    };
}


export const searchResultTestIds = {
    container: {
        productCard: 'product-card',
        detailSection: 'detail-section',
        priceSection: 'price-section',
        imageSection: 'image-section',
    },
    product: {
        title: 'product-title',
        seller: 'product-seller',
        rating: 'product-rating',
        soldCount: 'product-sold-count',
        tags: 'product-tags',
        sku: 'product-sku',
        specs: 'product-specs',
    },
    price: {
        current: 'price-current',
        original: 'price-original',
        discount: 'price-discount',
    },
};
