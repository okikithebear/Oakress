import { motion } from "framer-motion";

import muse1 from "../assets/Muse1.avif";
import muse2 from "../assets/Muse2.jpg";
import muse3 from "../assets/Muse3.jpg";
import muse4 from "../assets/Muse1.avif";
import muse5 from "../assets/Muse2.jpg";
import muse6 from "../assets/Muse3.jpg";

const muses = [
  {
    name: "Luna Marlowe",
    description:
      "A modern muse, embodying elegance, strength, and timeless beauty.",
    image: muse1,
  },
  {
    name: "Aria Kembé",
    description:
      "Her style tells a story of grace, heritage, and contemporary flair.",
    image: muse2,
  },
  {
    name: "Sofia Imani",
    description:
      "An icon whose presence inspires creativity in every collection.",
    image: muse3,
  },
  {
    name: "Isla Vesper",
    description:
      "Her gaze holds the mystery of untold stories and timeless dreams.",
    image: muse4,
  },
  {
    name: "Noor Elara",
    description:
      "Blending cultural heritage with a modern twist, she defines chic.",
    image: muse5,
  },
  {
    name: "Celine Amara",
    description: "A radiant spirit, capturing elegance in its purest form.",
    image: muse6,
  },
];

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, delay: i * 0.15 },
  }),
};

export default function OakdressMuse() {
  return (
    <div
      className="w-full bg-white px-4 sm:px-6 md:px-8 py-12 sm:py-16"
      role="region"
      aria-labelledby="muses-heading"
    >
      {/* Heading */}
      <motion.h1
        id="muses-heading"
        className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-center mb-8 sm:mb-12 tracking-wide"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        Muses & Icons
      </motion.h1>

      {/* Responsive Grid */}
      <div
        className="
          grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3
          gap-4 sm:gap-6
          max-w-screen-lg sm:max-w-screen-xl mx-auto
          auto-rows-[280px] sm:auto-rows-[360px] md:auto-rows-[420px] lg:auto-rows-[480px]
        "
      >
        {muses.map((muse, i) => (
          <motion.article
            key={muse.name}
            className="relative rounded-lg overflow-hidden group shadow-lg focus-within:ring-4 focus-within:ring-indigo-500"
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            custom={i}
            tabIndex={0}
            aria-label={`${muse.name}, ${muse.description}`}
          >
            {/* Image */}
            <img
              src={muse.image}
              alt={muse.name}
              className="w-full h-full object-cover transition-transform duration-[700ms] group-hover:scale-105"
              loading="lazy"
              decoding="async"
              fetchPriority="low"
              draggable={false}
            />

            {/* Name Overlay */}
            <div
              className="
                absolute bottom-0 left-0 right-0
                bg-black bg-opacity-40
                px-3 py-2 sm:px-4 sm:py-3
                text-white font-semibold tracking-wide
                text-center text-sm sm:text-base
                select-none
              "
            >
              {muse.name}
            </div>

            {/* Description Slide-Up */}
            <motion.div
              className="
                absolute bottom-0 left-0 right-0
                px-3 sm:px-4 py-2 sm:py-3
                bg-black bg-opacity-60 backdrop-blur-md
                text-white text-xs sm:text-sm
                text-center
                translate-y-full group-hover:translate-y-0
                transition-transform duration-500
                select-none
              "
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            >
              {muse.description}
            </motion.div>
          </motion.article>
        ))}
      </div>
    </div>
  );
}
