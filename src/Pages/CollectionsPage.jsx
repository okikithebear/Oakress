import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";

// Import hero and collection images
import HeroImage from "../assets/Actual product/Gemini 8.jpg";
import Collection1 from "../assets/Actual product/Collection1.JPG";
import Collection2 from "../assets/Actual product/Collection2.JPG";
import Collection3 from "../assets/Actual product/Collection3.JPG";
import Collection4 from "../assets/Actual product/Collection4.JPG";
import Collection5 from "../assets/Actual product/Collection5.JPG";
import Collection6 from "../assets/Actual product/Collection6.JPG";
import Collection7 from "../assets/Actual product/Collection7.JPG";
import Collection8 from "../assets/Actual product/Collection8.JPG";
import Collection9 from "../assets/Actual product/Collection9.JPG";
import Collection10 from "../assets/Actual product/Gem15.jpg";
import Collection11 from "../assets/Actual product/Gemini 4.jpg";
import Collection12 from "../assets/Actual product/Gemini 8.jpg";
import Collection13 from "../assets/Actual product/Gemini 6.jpg";
import Collection14 from "../assets/Actual product/Gemini 2.jpg";
import Collection15 from "../assets/Actual product/Gem13.jpg";
import Collection16 from "../assets/Actual product/Gem0.jpg";

// Collection data
const CollectionsPage = [
  {
    id: 1,
    title: "Serenity Layers",
    description: "Sheer layers, soft palettes, and floral whispers of serenity.",
    image: Collection1,
  },
  {
    id: 2,
    title: "Threaded Luxury",
    description: "Delicate embroidery meets tactile luxury.",
    image: Collection2,
  },
  {
    id: 3,
    title: "Golden Hour Satin",
    description: "Where sunlight and satin meet in timeless elegance.",
    image: Collection3,
  },
  {
    id: 4,
    title: "Nocturne Bloom",
    description: "Night-blooming motifs with celestial undertones.",
    image: Collection4,
  },
  {
    id: 5,
    title: "Pure Form",
    description: "Sculpted silhouettes with whispers of purity.",
    image: Collection5,
  },
  {
    id: 6,
    title: "Soft Architecture",
    description: "Soft pastels entwined with structured grace.",
    image: Collection6,
  },
  {
    id: 7,
    title: "Quiet Power",
    description: "A symphony of strength and allure.",
    image: Collection7,
  },
  {
    id: 8,
    title: "Muted Confidence",
    description: "Muted tones capturing quiet confidence.",
    image: Collection8,
  },
  {
    id: 9,
    title: "Ethereal Rebirth",
    description: "An ode to ethereal beauty reborn.",
    image: Collection9,
  },
  {
    id: 10,
    title: "Gemini Fragment",
    description: "Modern distortion of classic silhouettes.",
    image: Collection10,
  },
  {
    id: 11,
    title: "Dual Identity",
    description: "Two worlds merged into one visual language.",
    image: Collection11,
  },
  {
    id: 12,
    title: "Structured Drift",
    description: "Chaos refined into tailored precision.",
    image: Collection12,
  },
  {
    id: 13,
    title: "Neo Silk Motion",
    description: "Fluid movement captured in fabric form.",
    image: Collection13,
  },
  {
    id: 14,
    title: "The Gemini Form",
    description: "The final expression of duality and design.",
    image: Collection14,
  },
   {
  id: 15,
  title: "Celestial Motion",
  description: "Fluid tailoring shaped through contrast, movement, and quiet intensity.",
  image: Collection15,
},
{
  id: 16,
  title: "Eclipse Theory",
  description: "An interplay of shadow, structure, and contemporary elegance.",
  image: Collection16,
},
];

export default function HerGardenOfGrace() {
  const [selectedIndex, setSelectedIndex] = useState(null);
  const [direction, setDirection] = useState(0);

  const openLightbox = (index) => setSelectedIndex(index);
  const closeLightbox = () => setSelectedIndex(null);

  const nextImage = () => {
    setDirection(1);
    setSelectedIndex((prev) => (prev + 1) % CollectionsPage.length);
  };

  const prevImage = () => {
    setDirection(-1);
    setSelectedIndex(
      (prev) => (prev - 1 + CollectionsPage.length) % CollectionsPage.length
    );
  };

  const swipeConfidenceThreshold = 10000;

  return (
    <div className="min-h-screen bg-black text-white overflow-hidden">
      {/* Hero Section */}
      <section className="relative h-[80vh] w-full flex flex-col items-center justify-center text-center overflow-hidden">
        <img
          src={HeroImage}
          alt="Gemini by Oakress"
          className="absolute inset-0 w-full h-full object-cover opacity-50"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/50 to-black"></div>

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="text-5xl md:text-7xl font-light tracking-[0.15em] mb-4 uppercase"
        >
          2026 — Gemini
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 1 }}
          className="text-gray-300 text-lg max-w-2xl px-6 leading-relaxed"
        >
          A story of femininity reborn — soft silhouettes, organic textures, and
          the quiet power of grace.
        </motion.p>
      </section>

      {/* Collection Grid */}
      <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 px-8 py-24">
        {CollectionsPage.map((item, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: index * 0.2 }}
            viewport={{ once: true }}
            onClick={() => openLightbox(index)}
            className="group relative overflow-hidden rounded-3xl shadow-lg cursor-pointer"
          >
            <img
              src={item.image}
              alt={item.name}
              className="w-full h-[450px] object-cover transition-transform duration-[1200ms] group-hover:scale-110"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-transparent opacity-70 group-hover:opacity-90 transition-all duration-700"></div>
            <div className="absolute bottom-6 left-6">
              <h2 className="text-2xl font-semibold tracking-wide mb-1">
                {item.name}
              </h2>
              <p className="text-gray-300 text-sm max-w-xs">{item.description}</p>
            </div>
          </motion.div>
        ))}
      </section>

      {/* Lightbox Modal with Swipe */}
      <AnimatePresence>
        {selectedIndex !== null && (
          <motion.div
            className="fixed inset-0 bg-black/90 flex items-center justify-center z-50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeLightbox}
          >
            <motion.div
              key={selectedIndex}
              custom={direction}
              variants={{
                enter: (dir) => ({
                  x: dir > 0 ? 300 : -300,
                  opacity: 0,
                  scale: 0.95,
                }),
                center: { x: 0, opacity: 1, scale: 1 },
                exit: (dir) => ({
                  x: dir > 0 ? -300 : 300,
                  opacity: 0,
                  scale: 0.95,
                }),
              }}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{
                x: { type: "spring", stiffness: 300, damping: 30 },
                opacity: { duration: 0.3 },
              }}
              drag="x"
              dragConstraints={{ left: 0, right: 0 }}
              dragElastic={1}
              onDragEnd={(e, { offset, velocity }) => {
                const swipe = Math.abs(offset.x) * velocity.x;
                if (swipe < -swipeConfidenceThreshold) {
                  nextImage();
                } else if (swipe > swipeConfidenceThreshold) {
                  prevImage();
                }
              }}
              className="relative max-w-5xl w-full px-6"
              onClick={(e) => e.stopPropagation()}
            >
              <img
                src={CollectionsPage[selectedIndex].image}
                alt={CollectionsPage[selectedIndex].name}
                className="w-full max-h-[80vh] object-contain rounded-xl select-none"
              />

              <div className="text-center mt-6">
                <h2 className="text-2xl font-semibold mb-1">
                  {CollectionsPage[selectedIndex].name}
                </h2>
                <p className="text-gray-400 text-sm">
                  {CollectionsPage[selectedIndex].description}
                </p>
              </div>

              <button
                className="absolute top-4 right-6 text-white hover:text-gray-400 transition"
                onClick={closeLightbox}
              >
                <X size={32} />
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
