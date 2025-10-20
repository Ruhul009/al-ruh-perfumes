import { WHATSAPP_CONFIG } from '../config/whatsapp';
import { Product } from '../types';

// WhatsApp utility functions
export const generateWhatsAppMessage = (product: Product, quantity: number = 1): string => {
    const total = product.price * quantity;
    const template = WHATSAPP_CONFIG.messageTemplate;

    let message = `${template.greeting}

*Product Details:*
${template.productDetails.name.replace('{productName}', product.name)}
${template.productDetails.price.replace('{price}', product.price.toLocaleString('en-IN'))}
${template.productDetails.category.replace('{category}', product.category)}
${template.productDetails.quantity.replace('{quantity}', quantity.toString())}
${template.productDetails.total.replace('{total}', total.toLocaleString('en-IN'))}

${product.isOnSale ? template.productDetails.originalPrice.replace('{originalPrice}', product.mrp.toLocaleString('en-IN')) : ''}
${product.isOnSale ? template.productDetails.discount.replace('{discountPercentage}', product.salePercentage?.toString() || '0') : ''}

${template.closing}`;

    return encodeURIComponent(message);
};

export const openWhatsApp = (product: Product, quantity: number = 1): void => {
    const message = generateWhatsAppMessage(product, quantity);
    const whatsappUrl = `https://wa.me/${WHATSAPP_CONFIG.phoneNumber}?text=${message}`;

    // Open WhatsApp in a new tab
    window.open(whatsappUrl, '_blank', 'noopener,noreferrer');
};

export const formatProductForWhatsApp = (product: Product): Partial<Product> => {
    return {
        name: product.name,
        price: product.price,
        category: product.category,
        isOnSale: product.isOnSale,
        mrp: product.mrp,
        salePercentage: product.salePercentage,
        description: product.description
    };
};
