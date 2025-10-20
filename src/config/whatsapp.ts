import whatsappData from '../data/whatsapp.json';

// WhatsApp Configuration
export const WHATSAPP_CONFIG = {
    // Get phone number from JSON file
    phoneNumber: whatsappData.phoneNumber,

    // Business name for the message
    businessName: whatsappData.businessName,

    // Default message template
    defaultMessage: whatsappData.defaultMessage,

    // Additional instructions
    instructions: whatsappData.instructions,

    // Additional settings
    autoOpen: whatsappData.autoOpen,
    messageTemplate: whatsappData.messageTemplate
};

// WhatsApp configuration is now managed via JSON file
// See WHATSAPP_MANAGEMENT.md for detailed instructions
