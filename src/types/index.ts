// Product types
export interface Product {
    id: number;
    name: string;
    description: string;
    price: number;
    mrp: number;
    image: string;
    images: string[];
    category: string;
    inStock: boolean;
    isOnSale?: boolean;
    salePercentage?: number;
    showSaleAnimation?: boolean;
}

// Banner types
export interface Banner {
    id: number;
    title: string;
    subtitle: string;
    image: string;
    buttonText: string;
    buttonLink: string;
    isActive: boolean;
    isInternalLink?: boolean;
}

// Contact types
export interface ContactInfo {
    email: string;
    phone: string;
    address: string;
    socialMedia: {
        instagram: string;
    };
}

export interface ContactData {
    contactInfo: ContactInfo;
}

// WhatsApp types
export interface WhatsAppConfig {
    phoneNumber: string;
    messageTemplate: string;
}

// Theme types
export interface ThemeContextType {
    theme: 'light' | 'dark';
    toggleTheme: () => void;
    mounted?: boolean;
}

// Component prop types
export interface ProductCardProps {
    product: Product;
    onViewProduct: (product: Product) => void;
}

export interface ProductModalProps {
    product: Product | null;
    isOpen: boolean;
    onClose: () => void;
}

export interface ProductGridProps {
    products: Product[];
    onViewProduct: (product: Product) => void;
    selectedCategory: string;
    onCategoryChange: (category: string) => void;
}

export interface HeaderProps {
    // Add any header-specific props here if needed
}

export interface FooterProps {
    // Add any footer-specific props here if needed
}

export interface BannerCarouselProps {
    // Add any banner carousel-specific props here if needed
}

export interface ThemeToggleProps {
    // Add any theme toggle-specific props here if needed
}
