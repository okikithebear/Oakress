import { motion } from "framer-motion";
import editorial1 from "../assets/beauty.jpg";
import editorial2 from "../assets/beauty.jpg";
import editorial3 from "../assets/beauty.jpg";
import editorial4 from "../assets/beauty.jpg";
import editorial5 from "../assets/beauty.jpg";
import editorial6 from "../assets/beauty.jpg";

const editorials = [
  { title: "Runway Elegance", image: editorial1 },
  { title: "Bridal Moments", image: editorial2 },
  { title: "Street Luxe", image: editorial3 },
  { title: "The Atelier", image: editorial4 },
  { title: "Modern Glamour", image: editorial5 },
  { title: "Cultural Essence", image: editorial6 },
];

export default function ExploreNewTrends() {
  return (
    <div className="w-full bg-white px-4 sm:px-6 py-12 sm:py-16">
      {/* Heading */}
      <motion.h1
        className="text-3xl sm:text-4xl md:text-5xl font-bold text-center mb-10 sm:mb-14 tracking-wide"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        Explore New Trends
      </motion.h1>

      {/* Grid */}
      <div
        className="
          grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4
          auto-rows-[250px] sm:auto-rows-[350px] lg:auto-rows-[450px]
          gap-4 sm:gap-6 max-w-screen-xl mx-auto
        "
      >
        {editorials.map((item, i) => {
          const gridClass = [
            i === 0 ? "sm:col-span-2 sm:row-span-2" : "",
            i === 3 ? "sm:col-span-2 sm:row-span-1" : "",
          ].join(" ");

          return (
            <motion.div
              key={item.title}
              className={`relative overflow-hidden rounded-lg group ${gridClass}`}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: i * 0.15 }}
            >
              {/* Image */}
              <img
                src={item.image}
                alt={item.title}
                loading="eager"
                className="w-full h-full object-cover transition-transform duration-[700ms] group-hover:scale-110"
              />

              {/* Overlay */}
              <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-center justify-center">
                <p className="text-white text-lg sm:text-xl md:text-2xl font-semibold text-center px-4">
                  {item.title}
                </p>
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
