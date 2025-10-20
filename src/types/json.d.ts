// Type declarations for JSON imports
declare module "*.json" {
    const value: any;
    export default value;
}

// Specific type declarations for our JSON files
declare module "../data/products.json" {
    import { Product } from "./index";
    const products: { products: Product[] };
    export default products;
}

declare module "../data/banners.json" {
    import { Banner } from "./index";
    const banners: { banners: Banner[] };
    export default banners;
}

declare module "../data/contact.json" {
    import { ContactData } from "./index";
    const contactData: ContactData;
    export default contactData;
}

declare module "../data/whatsapp.json" {
    import { WhatsAppConfig } from "./index";
    const whatsappData: WhatsAppConfig & {
        businessName: string;
        defaultMessage: string;
        instructions: string;
        autoOpen: boolean;
        messageTemplate: {
            greeting: string;
            productDetails: {
                name: string;
                price: string;
                category: string;
                quantity: string;
                total: string;
                originalPrice: string;
                discount: string;
            };
            closing: string;
        };
    };
    export default whatsappData;
}
