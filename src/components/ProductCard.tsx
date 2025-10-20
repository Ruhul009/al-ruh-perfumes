import { useState } from "react";
import { motion } from "framer-motion";
import { Heart, Eye, MessageCircle } from "lucide-react";
import { openWhatsApp } from "../utils/whatsapp";
import { ProductCardProps } from "../types";

const ProductCard = ({
  product,
  onViewProduct,
}: ProductCardProps): React.JSX.Element => {
  const [isHovered, setIsHovered] = useState<boolean>(false);
  const [isLiked, setIsLiked] = useState<boolean>(false);

  const handleBuyNow = (e: React.MouseEvent<HTMLButtonElement>): void => {
    e.stopPropagation();
    openWhatsApp(product);
  };

  const handleViewProduct = (): void => {
    onViewProduct(product);
  };

  const handleLike = (e: React.MouseEvent<HTMLButtonElement>): void => {
    e.stopPropagation();
    setIsLiked(!isLiked);
  };

  return (
    <motion.div
      className="bg-white rounded-xl shadow-lg overflow-hidden group cursor-pointer relative"
      whileHover={{ y: -5 }}
      transition={{ duration: 0.3 }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={handleViewProduct}>
      {/* Sale Badge */}
      {product.isOnSale && product.showSaleAnimation && (
        <motion.div
          className="absolute top-2 left-2 bg-red-500 text-white px-2 py-1 rounded-full text-xs font-bold z-10"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.2 }}>
          -{product.salePercentage}%
        </motion.div>
      )}

      {/* Like Button */}
      <button
        onClick={handleLike}
        className="absolute top-2 right-2 p-2 bg-white/80 rounded-full z-10 hover:bg-white transition-colors">
        <Heart
          className={`w-4 h-4 ${
            isLiked ? "text-red-500 fill-red-500" : "text-gray-600"
          }`}
        />
      </button>

      {/* Product Image */}
      <div className="relative overflow-hidden">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-64 object-cover transition-transform duration-300 group-hover:scale-105"
        />

        {/* Overlay with buttons */}
        <motion.div
          className="absolute inset-0 bg-black/50 flex items-center justify-center gap-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
          initial={{ opacity: 0 }}
          animate={{ opacity: isHovered ? 1 : 0 }}>
          <motion.button
            className="bg-white text-gray-800 p-3 rounded-full hover:bg-gray-100 transition-colors"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            onClick={(e) => {
              e.stopPropagation();
              onViewProduct(product);
            }}>
            <Eye className="w-5 h-5" />
          </motion.button>
          <motion.button
            className="bg-white text-gray-800 p-3 rounded-full hover:bg-gray-100 transition-colors"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleBuyNow}>
            <MessageCircle className="w-5 h-5" />
          </motion.button>
        </motion.div>
      </div>

      {/* Product Info */}
      <div className="p-4">
        <h3 className="font-semibold text-lg text-gray-800 mb-2 line-clamp-2">
          {product.name}
        </h3>

        <p className="text-gray-600 text-sm mb-3 line-clamp-2">
          {product.description}
        </p>

        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <span className="text-2xl font-bold text-gray-800">
              ₹{product.price.toLocaleString("en-IN")}
            </span>
            {product.isOnSale && (
              <span className="text-lg text-gray-500 line-through">
                ₹{product.mrp.toLocaleString("en-IN")}
              </span>
            )}
          </div>
          <span className="text-sm text-gray-500 bg-gray-100 px-2 py-1 rounded">
            {product.category}
          </span>
        </div>

        <motion.button
          className="w-full bg-gradient-to-r from-green-600 to-green-700 text-white py-2 px-4 rounded-lg font-medium hover:from-green-700 hover:to-green-800 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={handleBuyNow}
          disabled={!product.inStock}>
          <MessageCircle className="w-4 h-4" />
          {product.inStock ? "Buy Now" : "Out of Stock"}
        </motion.button>
      </div>
    </motion.div>
  );
};

export default ProductCard;
