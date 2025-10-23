import { motion } from "framer-motion";
import { openWhatsApp } from "../utils/whatsapp";
import {
  calculateSalePercentage,
  isProductOnSale,
  calculateSavings,
} from "../utils/priceUtils";
import { ProductCardProps } from "../types";

// Custom WhatsApp Icon Component
const WhatsAppIcon = ({ className }: { className?: string }) => (
  <svg
    className={className}
    viewBox="0 0 24 24"
    fill="currentColor"
    xmlns="http://www.w3.org/2000/svg">
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.885 3.488" />
  </svg>
);

const ProductCard = ({
  product,
  onViewProduct,
}: ProductCardProps): React.JSX.Element => {
  const handleBuyNow = (e: React.MouseEvent<HTMLButtonElement>): void => {
    e.stopPropagation();
    openWhatsApp(product);
  };

  const handleViewProduct = (): void => {
    onViewProduct(product);
  };

  return (
    <motion.div
      className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl overflow-hidden group cursor-pointer relative h-full flex flex-col border border-gray-100 dark:border-gray-700 transition-colors duration-300"
      whileHover={{ y: -4 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
      onClick={handleViewProduct}>
      {/* Image Container with Overlay */}
      <div className="relative overflow-hidden">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-64 sm:h-72 object-cover transition-all duration-500 group-hover:scale-110"
        />

        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

        {/* Sale Badge */}
        {isProductOnSale(product.mrp, product.price) &&
          product.showSaleAnimation && (
            <motion.div
              className="absolute top-2 left-2 sm:top-3 sm:left-3 bg-gradient-to-r from-red-500 to-red-600 text-white px-2 sm:px-3 py-1 sm:py-1.5 rounded-full text-xs sm:text-sm font-bold shadow-lg z-10"
              initial={{ scale: 0, rotate: -10 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ delay: 0.2, type: "spring", stiffness: 200 }}>
              -{calculateSalePercentage(product.mrp, product.price)}%
            </motion.div>
          )}
      </div>

      {/* Content Container */}
      <div className="p-4 sm:p-5 flex flex-col flex-1">
        {/* Category Badge */}
        <div className="mb-2 sm:mb-3">
          <span className="inline-block text-xs font-semibold text-purple-600 dark:text-purple-400 bg-purple-50 dark:bg-purple-900 px-2 sm:px-3 py-1 sm:py-1.5 rounded-full border border-purple-200 dark:border-purple-700">
            {product.category}
          </span>
        </div>

        {/* Product Name */}
        <h3 className="font-bold text-lg sm:text-xl text-gray-900 dark:text-white mb-2 line-clamp-2 leading-tight">
          {product.name}
        </h3>

        {/* Description */}
        <p className="text-gray-600 dark:text-gray-300 text-sm mb-3 sm:mb-4 line-clamp-2 leading-relaxed flex-grow">
          {product.description}
        </p>

        {/* Price Section */}
        <div className="mb-3 sm:mb-4">
          <div className="flex flex-col sm:flex-row sm:items-baseline gap-1 sm:gap-2 mb-1">
            <span className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white">
              ₹{product.price.toLocaleString("en-IN")}
            </span>
            {isProductOnSale(product.mrp, product.price) && (
              <span className="text-base sm:text-lg text-gray-400 dark:text-gray-500 line-through">
                ₹{product.mrp.toLocaleString("en-IN")}
              </span>
            )}
          </div>
          {isProductOnSale(product.mrp, product.price) && (
            <p className="text-xs sm:text-sm text-green-600 dark:text-green-400 font-medium">
              Save ₹
              {calculateSavings(product.mrp, product.price).toLocaleString(
                "en-IN"
              )}
            </p>
          )}
        </div>

        {/* Buy Now Button */}
        <motion.button
          className={`w-full py-3 sm:py-3.5 px-3 sm:px-4 rounded-xl font-semibold text-sm sm:text-base transition-all duration-300 flex items-center justify-center gap-2 touch-manipulation ${
            product.inStock
              ? "bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white shadow-lg hover:shadow-green-200"
              : "bg-gray-200 dark:bg-gray-700 text-gray-500 dark:text-gray-400 cursor-not-allowed"
          }`}
          whileHover={product.inStock ? { scale: 1.02 } : {}}
          whileTap={product.inStock ? { scale: 0.98 } : {}}
          onClick={handleBuyNow}
          disabled={!product.inStock}>
          <WhatsAppIcon className="w-4 h-4 sm:w-5 sm:h-5" />
          <span className="truncate">
            {product.inStock ? "Buy Now" : "Out of Stock"}
          </span>
        </motion.button>
      </div>
    </motion.div>
  );
};

export default ProductCard;
