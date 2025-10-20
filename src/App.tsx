import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Header from "./components/Header";
import BannerCarousel from "./components/BannerCarousel";
import ProductGrid from "./components/ProductGrid";
import ProductModal from "./components/ProductModal";
import Footer from "./components/Footer";
import { ThemeProvider } from "./contexts/ThemeContext";
import productsData from "./data/products.json";
import { Product } from "./types";
import "./App.css";

function App(): React.JSX.Element {
  const [products, setProducts] = useState<Product[]>([]);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [selectedCategory, setSelectedCategory] = useState<string>("All");

  // Load products on component mount
  useEffect(() => {
    setProducts(productsData.products);
  }, []);

  const handleViewProduct = (product: Product): void => {
    setSelectedProduct(product);
    setIsModalOpen(true);
  };

  const handleCategoryClick = (category: string): void => {
    // Scroll to products section and trigger category filter
    const productsSection = document.getElementById("products");
    if (productsSection) {
      productsSection.scrollIntoView({ behavior: "smooth" });
    }

    // Trigger category filter in ProductGrid
    // We'll pass this as a prop to ProductGrid
    setSelectedCategory(category);
  };

  const handleCloseModal = (): void => {
    setIsModalOpen(false);
    setSelectedProduct(null);
  };

  return (
    <ThemeProvider>
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-300">
        <Header />

        <main>
          {/* Banner Carousel */}
          <BannerCarousel />

          {/* Products Section */}
          <section
            id="products"
            className="py-16 bg-white dark:bg-gray-800 transition-colors duration-300">
            <ProductGrid
              products={products}
              onViewProduct={handleViewProduct}
              selectedCategory={selectedCategory}
              onCategoryChange={setSelectedCategory}
            />
          </section>

          {/* Categories Section */}
          <section
            id="categories"
            className="py-16 bg-gray-100 dark:bg-gray-700 transition-colors duration-300">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <motion.div
                className="text-center mb-12"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true }}>
                <h2 className="text-3xl md:text-4xl font-bold text-gray-800 dark:text-white mb-4">
                  Explore by Category
                </h2>
                <p className="text-gray-600 dark:text-gray-300 text-lg">
                  Discover fragrances that match your style and personality
                </p>
              </motion.div>

              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
                {["Oud", "Floral", "Woody", "Fresh", "Oriental", "Citrus"].map(
                  (category, index) => (
                    <motion.div
                      key={category}
                      className={`rounded-xl p-6 text-center hover:shadow-lg transition-all duration-300 cursor-pointer ${
                        selectedCategory === category
                          ? "bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-lg"
                          : "bg-white dark:bg-gray-800 hover:shadow-xl"
                      }`}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.6, delay: index * 0.1 }}
                      viewport={{ once: true }}
                      whileHover={{ scale: 1.05 }}
                      onClick={() => handleCategoryClick(category)}>
                      <div
                        className={`w-16 h-16 rounded-full mx-auto mb-4 flex items-center justify-center ${
                          selectedCategory === category
                            ? "bg-white/20"
                            : "bg-gradient-to-r from-purple-500 to-pink-500"
                        }`}>
                        <span
                          className={`font-bold text-xl ${
                            selectedCategory === category
                              ? "text-white"
                              : "text-white"
                          }`}>
                          {category.charAt(0)}
                        </span>
                      </div>
                      <h3
                        className={`font-semibold ${
                          selectedCategory === category
                            ? "text-white"
                            : "text-gray-800 dark:text-white"
                        }`}>
                        {category}
                      </h3>
                    </motion.div>
                  )
                )}
              </div>
            </div>
          </section>
        </main>

        <Footer />

        {/* Product Modal */}
        <ProductModal
          product={selectedProduct}
          isOpen={isModalOpen}
          onClose={handleCloseModal}
        />
      </div>
    </ThemeProvider>
  );
}

export default App;
