import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import { motion } from "framer-motion";
import bannersData from "../data/banners.json";
import { BannerCarouselProps } from "../types";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

const BannerCarousel = ({}: BannerCarouselProps): React.JSX.Element => {
  // Filter only active banners
  const banners = bannersData.banners.filter((banner) => banner.isActive);

  const handleBannerClick = (buttonLink: string): void => {
    if (buttonLink.startsWith("#")) {
      // Scroll to section if it's an anchor link
      const element = document.querySelector(buttonLink);
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
      }
    } else {
      // Open external link
      window.open(buttonLink, "_blank", "noopener,noreferrer");
    }
  };

  return (
    <section className="relative">
      <Swiper
        modules={[Navigation, Pagination, Autoplay]}
        spaceBetween={0}
        slidesPerView={1}
        navigation
        pagination={{ clickable: true }}
        autoplay={{
          delay: 5000,
          disableOnInteraction: false,
        }}
        loop={true}
        className="bannerSwiper">
        {banners.map((banner) => (
          <SwiperSlide key={banner.id}>
            <div className="relative h-[400px] sm:h-[500px] md:h-[600px] overflow-hidden">
              <img
                src={banner.image}
                alt={banner.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-black/40"></div>
              <div className="absolute inset-0 flex items-center">
                <div className="max-w-7xl mx-auto px-3 sm:px-4 lg:px-8 w-full">
                  <motion.div
                    className="max-w-2xl text-white"
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}>
                    <motion.h1
                      className="text-2xl sm:text-4xl md:text-6xl font-bold mb-3 sm:mb-4 leading-tight"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.2, duration: 0.8 }}>
                      {banner.title}
                    </motion.h1>
                    <motion.h2
                      className="text-lg sm:text-2xl md:text-3xl font-semibold mb-3 sm:mb-4 text-purple-300"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.4, duration: 0.8 }}>
                      {banner.subtitle}
                    </motion.h2>
                    <motion.p
                      className="text-sm sm:text-lg md:text-xl mb-6 sm:mb-8 text-gray-200 leading-relaxed"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.6, duration: 0.8 }}>
                      {banner.description}
                    </motion.p>
                    <motion.button
                      className="bg-gradient-to-r from-purple-600 to-pink-600 text-white px-6 sm:px-8 py-3 sm:py-4 rounded-full font-semibold text-base sm:text-lg hover:from-purple-700 hover:to-pink-700 transition-all duration-300 shadow-lg hover:shadow-xl touch-manipulation"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.8, duration: 0.8 }}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => handleBannerClick(banner.buttonLink)}>
                      {banner.buttonText}
                    </motion.button>
                  </motion.div>
                </div>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
};

export default BannerCarousel;
