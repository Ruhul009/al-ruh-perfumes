import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Plus, Minus } from "lucide-react";
import { openWhatsApp } from "../utils/whatsapp";
import {
  calculateSalePercentage,
  isProductOnSale,
  calculateSavings,
} from "../utils/priceUtils";
import { ProductModalProps } from "../types";

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

const ProductModal = ({
  product,
  isOpen,
  onClose,
}: ProductModalProps): React.JSX.Element | null => {
  const [selectedImage, setSelectedImage] = useState<number>(0);
  const [quantity, setQuantity] = useState<number>(1);

  // Reset quantity and selected image when product changes
  useEffect(() => {
    if (product) {
      setQuantity(1);
      setSelectedImage(0);
    }
  }, [product?.id]);

  // Prevent background scroll when modal is open
  useEffect(() => {
    if (isOpen) {
      // Get current scroll position
      const scrollY = window.scrollY;

      // Prevent scrolling by adding overflow hidden to body
      document.body.style.overflow = "hidden";
      document.body.style.paddingRight = "0px"; // Prevent layout shift

      // Store scroll position in a data attribute for reference
      document.body.setAttribute("data-scroll-y", scrollY.toString());

      return () => {
        // Restore scrolling when modal closes
        document.body.style.overflow = "";
        document.body.style.paddingRight = "";
        document.body.removeAttribute("data-scroll-y");
      };
    }
  }, [isOpen]);

  if (!product) return null;

  const handleBuyNow = (): void => {
    openWhatsApp(product, quantity);
    onClose();
  };

  const increaseQuantity = (): void => {
    setQuantity((prev) => prev + 1);
  };

  const decreaseQuantity = (): void => {
    if (quantity > 1) {
      setQuantity((prev) => prev - 1);
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 bg-black/50 backdrop-blur-sm"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}>
          <motion.div
            className="bg-white dark:bg-gray-800 rounded-2xl max-w-4xl w-full max-h-[98vh] sm:max-h-[95vh] overflow-hidden shadow-2xl flex flex-col"
            initial={{ scale: 0.8, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.8, opacity: 0, y: 20 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            onClick={(e) => e.stopPropagation()}>
            {/* Header */}
            <div className="flex justify-between items-center p-4 sm:p-6 border-b border-gray-200 dark:border-gray-700 flex-shrink-0">
              <h2 className="text-lg sm:text-2xl font-bold text-gray-800 dark:text-white">
                Product Details
              </h2>
              <button
                onClick={onClose}
                className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full transition-colors touch-manipulation">
                <X className="w-5 h-5 sm:w-6 sm:h-6" />
              </button>
            </div>

            {/* Main Content */}
            <div className="flex-1 overflow-hidden">
              <div className="flex flex-col lg:flex-row h-full">
                {/* Image Section */}
                <div className="lg:w-1/2 p-3 sm:p-6 flex-shrink-0">
                  <div className="relative">
                    <img
                      src={product.images[selectedImage]}
                      alt={product.name}
                      className="w-full h-40 sm:h-56 lg:h-72 object-cover rounded-xl"
                    />

                    {/* Sale Badge */}
                    {isProductOnSale(product.mrp, product.price) &&
                      product.showSaleAnimation && (
                        <div className="absolute top-4 left-4 bg-red-500 text-white px-3 py-1 rounded-full text-sm font-bold">
                          -{calculateSalePercentage(product.mrp, product.price)}
                          % OFF
                        </div>
                      )}
                  </div>

                  {/* Thumbnail Images */}
                  {product.images.length > 1 && (
                    <div className="flex gap-2 mt-4 overflow-x-auto pb-2">
                      {product.images.map((image, index) => (
                        <button
                          key={index}
                          onClick={() => setSelectedImage(index)}
                          className={`flex-shrink-0 w-12 h-12 sm:w-16 sm:h-16 rounded-lg overflow-hidden border-2 transition-colors touch-manipulation ${
                            selectedImage === index
                              ? "border-purple-500"
                              : "border-gray-200 dark:border-gray-600 hover:border-gray-300 dark:hover:border-gray-500"
                          }`}>
                          <img
                            src={image}
                            alt={`${product.name} ${index + 1}`}
                            className="w-full h-full object-cover"
                          />
                        </button>
                      ))}
                    </div>
                  )}
                </div>

                {/* Product Info */}
                <div className="lg:w-1/2 p-3 sm:p-6 flex flex-col justify-between">
                  {/* Scrollable Content Area */}
                  <div className="flex-1 overflow-y-auto">
                    {/* Product Name */}
                    <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold text-gray-800 dark:text-white mb-3 sm:mb-4 leading-tight">
                      {product.name}
                    </h1>

                    {/* Category */}
                    <span className="inline-block bg-purple-100 dark:bg-purple-900 text-purple-700 dark:text-purple-300 px-3 py-1 rounded-full text-sm font-medium mb-3 sm:mb-4">
                      {product.category}
                    </span>

                    {/* Description with scroll */}
                    <div className="overflow-y-auto mb-4 max-h-24 sm:max-h-32">
                      <p className="text-gray-600 dark:text-gray-300 leading-relaxed pr-2 text-sm sm:text-base scrollbar-thin scrollbar-thumb-gray-300 dark:scrollbar-thumb-gray-600 scrollbar-track-gray-100 dark:scrollbar-track-gray-800">
                        {product.description}
                      </p>
                    </div>

                    {/* Price Section */}
                    <div className="mb-4">
                      <div className="flex items-center justify-between gap-2">
                        <div className="flex items-center gap-2 flex-wrap">
                          <span className="text-lg sm:text-xl font-bold text-gray-800 dark:text-white">
                            ₹{product.price.toLocaleString("en-IN")}
                          </span>
                          {isProductOnSale(product.mrp, product.price) && (
                            <>
                              <span className="text-sm text-gray-500 dark:text-gray-400 line-through">
                                ₹{product.mrp.toLocaleString("en-IN")}
                              </span>
                              <span className="bg-red-100 dark:bg-red-900 text-red-700 dark:text-red-300 px-1.5 py-0.5 rounded text-xs font-medium">
                                Save ₹
                                {calculateSavings(
                                  product.mrp,
                                  product.price
                                ).toLocaleString("en-IN")}
                              </span>
                            </>
                          )}
                        </div>

                        {/* Stock Status */}
                        <div className="flex items-center gap-1 flex-shrink-0">
                          {product.inStock ? (
                            <span className="text-green-600 text-xs font-medium flex items-center gap-1">
                              <div className="w-1.5 h-1.5 bg-green-500 rounded-full"></div>
                              In Stock
                            </span>
                          ) : (
                            <span className="text-red-600 text-xs font-medium flex items-center gap-1">
                              <div className="w-1.5 h-1.5 bg-red-500 rounded-full"></div>
                              Out of Stock
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Fixed Bottom Section */}
                  <div className="flex-shrink-0 space-y-3 pt-3 border-t border-gray-200 dark:border-gray-700">
                    {/* Quantity Selector */}
                    <div className="flex items-center gap-3 sm:gap-4">
                      <span className="font-medium text-gray-700 dark:text-gray-300 text-sm sm:text-base">
                        Quantity:
                      </span>
                      <div className="flex items-center border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700">
                        <button
                          onClick={decreaseQuantity}
                          className="p-2 hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors touch-manipulation"
                          disabled={quantity <= 1}>
                          <Minus className="w-4 h-4" />
                        </button>
                        <span className="px-3 sm:px-4 py-2 font-medium text-gray-800 dark:text-white min-w-[3rem] text-center">
                          {quantity}
                        </span>
                        <button
                          onClick={increaseQuantity}
                          className="p-2 hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors touch-manipulation">
                          <Plus className="w-4 h-4" />
                        </button>
                      </div>
                    </div>

                    {/* Buy Now Button */}
                    <motion.button
                      className="w-full bg-gradient-to-r from-green-600 to-green-700 text-white py-3 sm:py-4 px-4 sm:px-6 rounded-lg font-semibold text-base sm:text-lg hover:from-green-700 hover:to-green-800 transition-all duration-300 flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed touch-manipulation shadow-lg"
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={handleBuyNow}
                      disabled={!product.inStock}>
                      <WhatsAppIcon className="w-4 h-4 sm:w-5 sm:h-5" />
                      <span className="truncate">
                        Buy Now - ₹
                        {(product.price * quantity).toLocaleString("en-IN")}
                      </span>
                    </motion.button>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default ProductModal;
