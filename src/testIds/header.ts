interface HeaderTestIdsType {
    // Main Navigation
    logo: string;
    
    // Search and Cart
    searchButton: string;
    cartButton: string;
    
    // User Actions
    loginButton: string;
    languageSelector: string;
    
    // App Downloads
    downloadApp: string;
    iosDownload: string;
    androidDownload: string;
    
    // Links
    clubBenefits: string;
    service: string;
    seller: string;
    business: string;
    blog: string;
}

export const HeaderTestIds: HeaderTestIdsType = {
    // Main Navigation
    logo: 'nocnoc-logo',
    
    // Search and Cart
    searchButton: 'search-btn',
    cartButton: 'cart-btn',
    
    // User Actions
    loginButton: 'login-btn',
    languageSelector: 'language-btn',
    
    // App Downloads
    downloadApp: 'download-app',
    iosDownload: 'ios-download',
    androidDownload: 'android-download',
    
    // Links
    clubBenefits: 'noc-noc-club-benefits-link',
    service: 'insta-link',
    seller: 'seller-link',
    business: 'business-link',
    blog: 'blog-link'
};

export type { HeaderTestIdsType };