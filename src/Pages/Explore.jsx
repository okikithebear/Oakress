import { motion } from "framer-motion";
import { useEffect, useRef } from "react";
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
  const sectionRef = useRef(null);

  useEffect(() => {
    const section = sectionRef.current;
    const cards = section.querySelectorAll(".trend-card");

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("animate-fade-in-up");
          }
        });
      },
      { threshold: 0.2 }
    );

    cards.forEach((card) => observer.observe(card));
    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="w-full bg-white px-4 sm:px-6 py-12 sm:py-16"
    >
      {/* Heading */}
      <motion.h1
        className="text-3xl sm:text-4xl md:text-5xl font-bold text-center mb-12 tracking-wide text-neutral-800"
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
          auto-rows-[260px] sm:auto-rows-[360px] lg:auto-rows-[480px]
          gap-5 max-w-screen-xl mx-auto
        "
      >
        {editorials.map((item, i) => {
          const gridClass = [
            i === 0 ? "sm:col-span-2 sm:row-span-2" : "",
            i === 3 ? "sm:col-span-2 sm:row-span-1" : "",
          ].join(" ");

          return (
            <div
              key={item.title}
              className={`trend-card relative overflow-hidden rounded-2xl shadow-lg group opacity-0 transform translate-y-6 transition-all duration-700 ease-out ${gridClass}`}
            >
              {/* Image */}
              <img
                src={item.image}
                alt={item.title}
                loading="lazy"
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              />

              {/* Gradient Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-end justify-start p-6">
                <p className="text-white text-xl sm:text-2xl font-semibold">
                  {item.title}
                </p>
              </div>
            </div>
          );
        })}
      </div>

      {/* Animation keyframes */}
      <style>
        {`
          .animate-fade-in-up {
            opacity: 1 !important;
            transform: translateY(0) !important;
          }
        `}
      </style>
    </section>
  );
}
