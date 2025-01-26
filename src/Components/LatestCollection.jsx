import { useContext, useEffect, useState } from "react";
import { ShopContext } from "../Context/ShopContext";
import Title from "./Title";
// import ProductItem from "../Components/ProductItem";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import { Navigation, Autoplay } from "swiper/modules"; // Import Autoplay for auto-sliding
import { useNavigate } from "react-router-dom";

// Function to format currency with Naira symbol and commas
const formatCurrency = (amount) => {
  return `₦${Number(amount).toLocaleString()}`;
};

const LatestCollection = () => {
  const { products } = useContext(ShopContext);
  const [latestProducts, setLatestProducts] = useState([]);
  const navigate = useNavigate(); // Initialize useNavigate

  useEffect(() => {
    if (products?.length) {
      setLatestProducts(products.slice(0, 10)); // Adjust to get the desired number of products
    }
  }, [products]);

  // Function to handle product click
  const handleProductClick = (productId) => {
    navigate(`/product/${productId}`); // Navigate to product detail page
  };

  return (
    <section className="my-12 px-4 lg:px-16">
      {/* Section Title */}
      <div className="text-center mb-10 text-2xl">
        <Title text1="LATEST" text2="COLLECTIONS" />
        <p className="w-full sm:w-3/4 lg:w-2/3 mx-auto text-sm sm:text-base text-gray-600">
          Browse through the newest additions to our catalog. Carefully selected and crafted to fit your style.
        </p>
      </div>

      {/* Scrollable Product Collection */}
      <div className="relative overflow-hidden">
        <Swiper
          modules={[Navigation, Autoplay]} // Added Autoplay module
          navigation={{
            prevEl: ".swiper-button-prev",
            nextEl: ".swiper-button-next",
          }}
          autoplay={{ delay: 3000, disableOnInteraction: false }} // Auto-slide every 3 seconds
          spaceBetween={30}
          slidesPerView={3}
          loop={true}
          breakpoints={{
            375: {
              slidesPerView: 1, // 1 slide for screens >= 640px
            },
            768: {
              slidesPerView: 3, // 2 slides for screens >= 768px
            },
            1024: {
              slidesPerView: 4, // 3 slides for screens >= 1024px
            },
          }}
          className="product-carousel"
        >
          {latestProducts.length > 0 ? (
            latestProducts.map((item, index) => (
              <SwiperSlide key={index} className="group relative">
                <div
                  className="relative w-full bg-white cursor-pointer overflow-hidden rounded-lg"
                  onClick={() => handleProductClick(item._id)} // Add click handler
                >
                  {/* Image */}
                  <div className="relative w-full h-[500px] sm:h-[350px] lg:h-[400px]">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-full h-full object-cover rounded-t-lg"
                    />
                  </div>

                  {/* Product Info */}
                  <div className="p-4 text-start bg-gray-200 rounded-b-lg shadow-md">
                    <p className="text-lg font-semibold text-gray-800">{item.name}</p>
                    <p className="text-base text-purple-600 mt-1">{item.type}</p>
                    <p className="text-xl font-bold text-gray-900 mt-2">
                      {formatCurrency(item.price)}
                    </p>
                  </div>
                </div>
              </SwiperSlide>
            ))
          ) : (
            <div className="col-span-full text-center text-gray-500">
              <p>Loading the latest collections...</p>
            </div>
          )}
        </Swiper>
      </div>
    </section>
  );
};

export default LatestCollection;
