/**
 * Utility functions for price calculations
 */

/**
 * Calculate sale percentage based on MRP and current price
 * @param mrp - Maximum Retail Price (original price)
 * @param price - Current selling price
 * @returns Calculated sale percentage (rounded to nearest integer)
 */
export const calculateSalePercentage = (mrp: number, price: number): number => {
    if (mrp <= 0 || price <= 0 || price >= mrp) {
        return 0;
    }

    const percentage = ((mrp - price) / mrp) * 100;
    return Math.round(percentage);
};

/**
 * Calculate savings amount
 * @param mrp - Maximum Retail Price
 * @param price - Current selling price
 * @returns Amount saved
 */
export const calculateSavings = (mrp: number, price: number): number => {
    return Math.max(0, mrp - price);
};

/**
 * Check if a product is on sale
 * @param mrp - Maximum Retail Price
 * @param price - Current selling price
 * @returns True if product is on sale (price < mrp)
 */
export const isProductOnSale = (mrp: number, price: number): boolean => {
    return price < mrp && mrp > 0;
};
