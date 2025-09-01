import { motion } from "framer-motion";
import beauty1 from "../assets/beauty.jpg";
import beauty2 from "../assets/beauty1.jpg";
import beauty3 from "../assets/beauty2.jpg";
import beauty4 from "../assets/beauty4.jpg";

const pillars = [
  {
    title: "Craftsmanship",
    desc: "Each garment is meticulously crafted with precision and passion.",
    image: beauty1,
  },
  {
    title: "Sustainability",
    desc: "We source responsibly, ensuring beauty that lasts beyond seasons.",
    image: beauty2,
  },
  {
    title: "Elegance",
    desc: "Our designs embody timeless sophistication and grace.",
    image: beauty4,
  },
  {
    title: "Empowerment",
    desc: "We design to uplift, inspire, and empower every woman.",
    image: beauty3,
  },
];

export default function TheWayOfBeauty() {
  return (
    <section className="w-full bg-white px-4 sm:px-6 py-12 sm:py-16">
      {/* Heading */}
      <motion.h1
        className="text-3xl sm:text-4xl md:text-5xl font-bold text-center mb-12 sm:mb-16 tracking-wide"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        The Way of Beauty
      </motion.h1>

      {/* Grid Layout */}
      <div
        className="
          max-w-screen-xl mx-auto 
          grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 
          gap-6 
          auto-rows-[280px] sm:auto-rows-[350px] lg:auto-rows-[500px]
        "
      >
        {pillars.map((pillar, i) => {
          const gridClass =
            i === 0
              ? "lg:col-span-2 lg:row-span-2"
              : i === 2
              ? "lg:col-span-2 lg:row-span-1"
              : "";

          return (
            <motion.div
              key={pillar.title}
              className={`relative overflow-hidden rounded-2xl group shadow-md hover:shadow-xl ${gridClass}`}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: i * 0.15 }}
            >
              {/* Image with blur-up effect */}
              <div className="relative w-full h-full overflow-hidden">
                <img
                  src={pillar.image}
                  alt={pillar.title}
                  loading="lazy"
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                {/* Blur overlay for loading effect */}
                <div className="absolute inset-0 bg-gray-200 animate-pulse opacity-0 group-[img]:hidden"></div>
              </div>

              {/* Overlay */}
              <motion.div
                className="absolute inset-0 bg-black/50 flex flex-col justify-end p-6 translate-y-full group-hover:translate-y-0 transition-all duration-700"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.2 }}
              >
                <h3 className="text-xl sm:text-2xl md:text-3xl font-semibold text-white mb-2">
                  {pillar.title}
                </h3>
                <p className="text-sm sm:text-base text-white/90 leading-relaxed">
                  {pillar.desc}
                </p>
              </motion.div>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}
