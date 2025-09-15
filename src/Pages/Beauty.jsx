"use client";
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

// Animation Variants
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
    transition: { type: "spring", stiffness: 60, damping: 18 },
  },
};

export default function TheWayOfBeauty() {
  return (
    <section className="w-full bg-white px-4 sm:px-6 py-12 sm:py-20">
      {/* Heading */}
      <motion.h1
        className="text-3xl sm:text-4xl md:text-5xl font-bold text-center mb-12 sm:mb-16 tracking-wide text-neutral-800"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        The Way of Beauty
      </motion.h1>

      {/* Grid */}
      <motion.div
        variants={container}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.2 }}
        className="
          max-w-screen-xl mx-auto 
          grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 
          gap-6 
          auto-rows-[280px] sm:auto-rows-[360px] lg:auto-rows-[500px]
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
              variants={card}
              whileHover={{ scale: 1.02 }}
              transition={{ type: "spring", stiffness: 200, damping: 18 }}
              className={`relative overflow-hidden rounded-2xl shadow-lg group cursor-pointer ${gridClass}`}
            >
              {/* Background Image */}
              <img
                src={pillar.image}
                alt={pillar.title}
                loading="lazy"
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              />

              {/* Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/40 to-transparent flex items-end">
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  whileHover={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, ease: "easeOut" }}
                  className="p-6"
                >
                  <h3 className="text-xl sm:text-2xl md:text-3xl font-semibold text-white mb-2">
                    {pillar.title}
                  </h3>
                  <p className="text-sm sm:text-base text-white/90 leading-relaxed">
                    {pillar.desc}
                  </p>
                </motion.div>
              </div>
            </motion.div>
          );
        })}
      </motion.div>
    </section>
  );
}
