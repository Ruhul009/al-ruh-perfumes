import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Heart, Plus, Minus, MessageCircle } from "lucide-react";
import { openWhatsApp } from "../utils/whatsapp";
import { ProductModalProps } from "../types";

const ProductModal = ({
  product,
  isOpen,
  onClose,
}: ProductModalProps): React.JSX.Element | null => {
  const [selectedImage, setSelectedImage] = useState<number>(0);
  const [quantity, setQuantity] = useState<number>(1);
  const [isLiked, setIsLiked] = useState<boolean>(false);

  if (!product) return null;

  const handleBuyNow = (): void => {
    openWhatsApp(product, quantity);
    onClose();
  };

  const handleLike = (): void => {
    setIsLiked(!isLiked);
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
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}>
          <motion.div
            className="bg-white rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-hidden"
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.8, opacity: 0 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            onClick={(e) => e.stopPropagation()}>
            {/* Header */}
            <div className="flex justify-between items-center p-6 border-b border-gray-200">
              <h2 className="text-2xl font-bold text-gray-800">
                Product Details
              </h2>
              <button
                onClick={onClose}
                className="p-2 hover:bg-gray-100 rounded-full transition-colors">
                <X className="w-6 h-6" />
              </button>
            </div>

            <div className="flex flex-col lg:flex-row">
              {/* Image Section */}
              <div className="lg:w-1/2 p-6">
                <div className="relative">
                  <img
                    src={product.images[selectedImage]}
                    alt={product.name}
                    className="w-full h-96 object-cover rounded-xl"
                  />

                  {/* Sale Badge */}
                  {product.isOnSale && product.showSaleAnimation && (
                    <div className="absolute top-4 left-4 bg-red-500 text-white px-3 py-1 rounded-full text-sm font-bold">
                      -{product.salePercentage}% OFF
                    </div>
                  )}

                  {/* Like Button */}
                  <button
                    onClick={handleLike}
                    className="absolute top-4 right-4 p-2 bg-white/80 rounded-full hover:bg-white transition-colors">
                    <Heart
                      className={`w-5 h-5 ${
                        isLiked ? "text-red-500 fill-red-500" : "text-gray-600"
                      }`}
                    />
                  </button>
                </div>

                {/* Thumbnail Images */}
                {product.images.length > 1 && (
                  <div className="flex gap-2 mt-4">
                    {product.images.map((image, index) => (
                      <button
                        key={index}
                        onClick={() => setSelectedImage(index)}
                        className={`w-16 h-16 rounded-lg overflow-hidden border-2 transition-colors ${
                          selectedImage === index
                            ? "border-purple-500"
                            : "border-gray-200 hover:border-gray-300"
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
              <div className="lg:w-1/2 p-6 flex flex-col justify-between">
                <div>
                  {/* Product Name */}
                  <h1 className="text-3xl font-bold text-gray-800 mb-4">
                    {product.name}
                  </h1>

                  {/* Category */}
                  <span className="inline-block bg-purple-100 text-purple-700 px-3 py-1 rounded-full text-sm font-medium mb-4">
                    {product.category}
                  </span>

                  {/* Description */}
                  <p className="text-gray-600 mb-6 leading-relaxed">
                    {product.description}
                  </p>

                  {/* Price */}
                  <div className="flex items-center gap-4 mb-6">
                    <span className="text-3xl font-bold text-gray-800">
                      ₹{product.price.toLocaleString("en-IN")}
                    </span>
                    {product.isOnSale && (
                      <span className="text-xl text-gray-500 line-through">
                        ₹{product.mrp.toLocaleString("en-IN")}
                      </span>
                    )}
                    {product.isOnSale && (
                      <span className="bg-red-100 text-red-700 px-2 py-1 rounded text-sm font-medium">
                        Save ₹
                        {(product.mrp - product.price).toLocaleString("en-IN")}
                      </span>
                    )}
                  </div>

                  {/* Stock Status */}
                  <div className="mb-6">
                    {product.inStock ? (
                      <span className="text-green-600 font-medium flex items-center gap-2">
                        <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                        In Stock
                      </span>
                    ) : (
                      <span className="text-red-600 font-medium flex items-center gap-2">
                        <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                        Out of Stock
                      </span>
                    )}
                  </div>
                </div>

                {/* Quantity and Add to Cart */}
                <div className="space-y-4">
                  {/* Quantity Selector */}
                  <div className="flex items-center gap-4">
                    <span className="font-medium text-gray-700">Quantity:</span>
                    <div className="flex items-center border border-gray-300 rounded-lg">
                      <button
                        onClick={decreaseQuantity}
                        className="p-2 hover:bg-gray-100 transition-colors"
                        disabled={quantity <= 1}>
                        <Minus className="w-4 h-4" />
                      </button>
                      <span className="px-4 py-2 font-medium">{quantity}</span>
                      <button
                        onClick={increaseQuantity}
                        className="p-2 hover:bg-gray-100 transition-colors">
                        <Plus className="w-4 h-4" />
                      </button>
                    </div>
                  </div>

                  {/* Buy Now Button */}
                  <motion.button
                    className="w-full bg-gradient-to-r from-green-600 to-green-700 text-white py-4 px-6 rounded-lg font-semibold text-lg hover:from-green-700 hover:to-green-800 transition-all duration-300 flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={handleBuyNow}
                    disabled={!product.inStock}>
                    <MessageCircle className="w-5 h-5" />
                    Buy Now - ₹
                    {(product.price * quantity).toLocaleString("en-IN")}
                  </motion.button>
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
