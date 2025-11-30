"use client";
import { motion } from "framer-motion";
import editorial1 from "../assets/Actual product/Explore1.JPG";
import editorial2 from "../assets/Actual product/Explore2.JPG";
import editorial3 from "../assets/Actual product/Explore3.JPG";
import editorial4 from "../assets/Actual product/Ad2.JPG";
import editorial5 from "../assets/Actual product/Collection7.JPG";
import editorial6 from "../assets/Actual product/Oakress 2.JPG";

const editorials = [
  { title: "Runway Elegance", image: editorial1 },
  { title: "Bridal Moments", image: editorial2 },
  { title: "Street Luxe", image: editorial3 },
  { title: "The Atelier", image: editorial4 },
  { title: "Modern Glamour", image: editorial5 },
  { title: "Cultural Essence", image: editorial6 },
];

// Framer Motion Variants
const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.15 },
  },
};

const card = {
  hidden: { opacity: 0, y: 40 },
  show: {
    opacity: 1,
    y: 0,
    transition: { type: "spring", stiffness: 60, damping: 15 },
  },
};

export default function ExploreNewTrends() {
  return (
    <section className="w-full bg-white px-4 sm:px-6 py-12 sm:py-20">
      {/* Heading */}
      <motion.h1
        className="text-3xl sm:text-4xl md:text-5xl font-bold text-center mb-12 tracking-wide text-neutral-800"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        Explore New Trends
      </motion.h1>

      {/* Grid */}
      <motion.div
        variants={container}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.2 }}
        className="
          grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4
          auto-rows-[260px] sm:auto-rows-[360px] lg:auto-rows-[480px]
          gap-6 max-w-screen-xl mx-auto
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
              variants={card}
              whileHover={{ scale: 1.03, rotateX: 3, rotateY: -3 }}
              transition={{ type: "spring", stiffness: 200, damping: 15 }}
              className={`relative overflow-hidden rounded-2xl shadow-lg group cursor-pointer ${gridClass}`}
            >
              {/* Image */}
              <motion.img
                src={item.image}
                alt={item.title}
                loading="lazy"
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              />

              {/* Overlay */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileHover={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4 }}
                className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent flex items-end justify-start p-6"
              >
                <p className="text-white text-xl sm:text-2xl font-semibold tracking-wide">
                  {item.title}
                </p>
              </motion.div>
            </motion.div>
          );
        })}
      </motion.div>
    </section>
  );
}
