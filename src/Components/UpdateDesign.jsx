import { motion, useMotionValue, useSpring } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { Link } from "react-router-dom";

import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Mousewheel, Autoplay } from "swiper/modules";

import "swiper/css";
import "swiper/css/pagination";

import Design1 from "../assets/Actual product/Gemini21.jpg";
import Design2 from "../assets/Actual product/Gemini22.jpg";
import Design3 from "../assets/Actual product/Gemini 2.jpg";
import Design4 from "../assets/Actual product/Gemini 10.jpg";
import Design5 from "../assets/Actual product/Gemini24.jpg";
import Design6 from "../assets/Actual product/Gemini 4.jpg";
import Design7 from "../assets/Actual product/Gemini29.jpg";
import Design8 from "../assets/Actual product/Gemini26.jpg";
import Design9 from "../assets/Actual product/Gem14.jpg";
import Design10 from "../assets/Actual product/Gem15.jpg";

const collectionImages = [
  { image: Design1, subtitle: "Luxury Capsule" },
  { image: Design2, subtitle: "Gemini Series" },
  { image: Design3, subtitle: "Limited Drop" },
  { image: Design4, subtitle: "Gemini Series" },
  { image: Design5, subtitle: "Limited Drop" },
  { image: Design6, subtitle: "Gemini Series" },
  { image: Design7, subtitle: "Limited Drop" },
  { image: Design8, subtitle: "Gemini Series" },
  { image: Design9, subtitle: "Luxury Capsule" },
  { image: Design10, subtitle: "Limited Drop" },
];

export default function LatestCollection() {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const springX = useSpring(mouseX, { stiffness: 80, damping: 22 });
  const springY = useSpring(mouseY, { stiffness: 80, damping: 22 });

  const handleMouseMove = (e) => {
    const { innerWidth, innerHeight } = window;

    mouseX.set((e.clientX - innerWidth / 2) / 70);
    mouseY.set((e.clientY - innerHeight / 2) / 70);
  };

  return (
    <section
      onMouseMove={handleMouseMove}
      className="relative overflow-hidden py-28 bg-white"
    >
      {/* HEADER */}
      <div className="max-w-[1300px] mx-auto px-5 md:px-10 mb-14">
        <div className="flex flex-col lg:flex-row lg:justify-between gap-10">
          <div>
            <p className="uppercase tracking-[0.35em] text-[11px] text-neutral-500 mb-5">
              Newly Released Collection
            </p>

            <h2 className="text-5xl md:text-7xl font-light leading-[0.9]">
              Gemini <span className="font-semibold">Collection</span>
            </h2>
          </div>

          <div className="max-w-md">
            <p className="text-neutral-500 leading-relaxed mb-6">
              Refined silhouettes and expressive textures crafted for cinematic luxury.
            </p>

            <Link
              to="/collections-page"
              className="inline-flex items-center gap-3 border border-neutral-300 px-6 py-3 rounded-full hover:bg-black hover:text-white transition"
            >
              Explore Collection
              <ArrowUpRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </div>

      {/* SWIPER */}
      <Swiper
        modules={[Pagination, Mousewheel, Autoplay]}
        speed={1300}
        loop
        centeredSlides
        mousewheel={{ forceToAxis: true }}
        autoplay={{ delay: 4200, disableOnInteraction: false }}
        pagination={{ clickable: true }}
        slidesPerView={1.1}
        spaceBetween={10}
        breakpoints={{
          768: { slidesPerView: 1.25, spaceBetween: 16 },
          1024: { slidesPerView: 1.5, spaceBetween: 22 },
          1400: { slidesPerView: 1.75, spaceBetween: 28 },
        }}
        className="!overflow-visible"
      >
        {collectionImages.map((item) => (
          <SwiperSlide key={item.image}>
            {({ isActive }) => (
              <motion.div
                style={{ x: springX, y: springY }}
                animate={{
                  scale: isActive ? 1 : 0.94,
                  opacity: isActive ? 1 : 0.55,
                }}
                transition={{ duration: 0.85, ease: "easeOut" }}
                className="relative h-[520px] md:h-[680px] overflow-hidden group rounded-[28px]"
              >
                {/* IMAGE WRAPPER (soft edge layer) */}
                <div className="absolute inset-0 rounded-[28px] overflow-hidden">
                  <img
                    src={item.image}
                    alt=""
                    className="w-full h-full object-cover object-[50%_40%] transition-transform duration-1000 group-hover:scale-[1.04]"
                  />

                  {/* inner soft edge vignette */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-black/20" />
                </div>

                {/* TEXT */}
                <div className="absolute bottom-0 left-0 p-8 md:p-12">
                  <p className="text-white/60 text-[11px] tracking-[0.35em] uppercase mb-2">
                    {item.subtitle}
                  </p>
                </div>
              </motion.div>
            )}
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
}