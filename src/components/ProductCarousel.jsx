import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import { motion } from "framer-motion";
import ProductCard from "./ProductCard";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

const ProductCarousel = ({
  products,
  onAddToCart,
  onViewProduct,
  title = "Featured Products",
}) => {
  return (
    <div className="py-8">
      <motion.div
        className="text-center mb-8"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}>
        <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-2">
          {title}
        </h2>
        <div className="w-24 h-1 bg-gradient-to-r from-purple-600 to-pink-600 mx-auto rounded-full"></div>
      </motion.div>

      <Swiper
        modules={[Navigation, Pagination, Autoplay]}
        spaceBetween={30}
        slidesPerView={1}
        navigation
        pagination={{ clickable: true }}
        autoplay={{
          delay: 3000,
          disableOnInteraction: false,
        }}
        breakpoints={{
          640: {
            slidesPerView: 2,
            spaceBetween: 20,
          },
          768: {
            slidesPerView: 3,
            spaceBetween: 30,
          },
          1024: {
            slidesPerView: 4,
            spaceBetween: 30,
          },
        }}
        className="mySwiper">
        {products.map((product) => (
          <SwiperSlide key={product.id}>
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}>
              <ProductCard
                product={product}
                onAddToCart={onAddToCart}
                onViewProduct={onViewProduct}
              />
            </motion.div>
          </SwiperSlide>
        ))}
      </Swiper>

      <style jsx global>{`
        .mySwiper .swiper-button-next,
        .mySwiper .swiper-button-prev {
          color: #8b5cf6;
          background: white;
          border-radius: 50%;
          width: 44px;
          height: 44px;
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
        }

        .mySwiper .swiper-button-next:after,
        .mySwiper .swiper-button-prev:after {
          font-size: 18px;
        }

        .mySwiper .swiper-pagination-bullet {
          background: #8b5cf6;
          opacity: 0.3;
        }

        .mySwiper .swiper-pagination-bullet-active {
          opacity: 1;
        }
      `}</style>
    </div>
  );
};

export default ProductCarousel;
