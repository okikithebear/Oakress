import { useEffect, useRef, useState } from "react";
import Title from "./Title";

import Design1 from "../assets/Actual product/Design 1.JPG";
import Design2 from "../assets/Actual product/Oakress 2.JPG";
import Design3 from "../assets/Actual product/Muse .JPG";
import Design4 from "../assets/Actual product/Design 4.JPG";
import Design5 from "../assets/Actual product/Design 5.JPG";

/**
 * DesignDetailSlider
 *
 * - Desktop: hover to expand (folding slider) — original behavior preserved.
 * - Mobile: swipeable slider with scroll-snap + optional arrows (industry standard).
 * - Accessibility: keyboard & aria, lazy-loading images.
 * - No autoplay (industry default).
 */
const DesignDetailSlider = () => {
  const [activeIndex, setActiveIndex] = useState(null); // desktop hover index
  const [isDesktop, setIsDesktop] = useState(false);
  const trackRef = useRef(null);

  const slides = [
    { image: Design1, alt: "Oakress Signature Craft" },
    { image: Design2, alt: "Tailored Precision" },
    { image: Design3, alt: "Luxury Stitch Finish" },
    { image: Design4, alt: "Premium Inner Lining" },
    { image: Design5, alt: "Elegant Simplicity" },
  ];

  // Detect desktop (lg) using matchMedia. Tailwind's lg breakpoint is usually 1024px.
  useEffect(() => {
    const mq = window.matchMedia("(min-width: 1024px)");
    const set = (ev) => setIsDesktop(ev.matches ?? mq.matches);
    set(mq); // initial
    mq.addEventListener("change", set);
    // fallback for older browsers: use attachEvent? modern browsers ok.
    return () => mq.removeEventListener("change", set);
  }, []);

  // Mobile slider helpers (one slide per view)
  const scrollPrev = () => {
    const track = trackRef.current;
    if (!track) return;
    const width = track.clientWidth; // container width to snap one slide
    track.scrollBy({ left: -width, behavior: "smooth" });
  };
  const scrollNext = () => {
    const track = trackRef.current;
    if (!track) return;
    const width = track.clientWidth;
    track.scrollBy({ left: width, behavior: "smooth" });
  };

  // Keyboard accessibility: left/right arrow to navigate slides when focus on track
  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;
    const handler = (e) => {
      if (e.key === "ArrowLeft") scrollPrev();
      if (e.key === "ArrowRight") scrollNext();
    };
    track.addEventListener("keydown", handler);
    return () => track.removeEventListener("keydown", handler);
  }, []);

  return (
    <section className="flex flex-col items-center justify-center bg-white py-10">
      {/* Title Section */}
      <div className="text-center mb-10 px-4">
        <Title text1="PRECISION" text2="CRAFTSMANSHIP" />
        <p className="w-full sm:w-3/4 lg:w-2/3 mx-auto text-sm sm:text-base text-gray-600 leading-relaxed">
          At Oakress, every stitch is intentional. Every curve, every fold,
          every detail is thoughtfully crafted by skilled hands. This is where
          craftsmanship meets passion — where design is more than fashion; it’s
          an expression of character and individuality.
        </p>
      </div>

      {/* Slider Container:
          - On mobile: horizontal scroll with snap (one slide per view).
          - On desktop: overflow hidden and flex behavior controlled with inline style flex: 4 / 1.
      */}
      <div className="relative w-full">
        {/* Arrows for mobile (visible on small screens) */}
        <button
          aria-label="Previous"
          onClick={scrollPrev}
          className="absolute left-2 top-1/2 -translate-y-1/2 z-20 p-2 rounded-full bg-white shadow-lg lg:hidden"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2" aria-hidden>
            <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
          </svg>
        </button>

        <button
          aria-label="Next"
          onClick={scrollNext}
          className="absolute right-2 top-1/2 -translate-y-1/2 z-20 p-2 rounded-full bg-white shadow-lg lg:hidden"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2" aria-hidden>
            <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
          </svg>
        </button>

        {/* Track */}
        <div
          ref={trackRef}
          tabIndex={0}
          role="region"
          aria-label="Design gallery slider"
          className={`
            flex items-stretch
            rounded-2xl
            h-64 sm:h-80 lg:h-96
            ${isDesktop ? "overflow-hidden" : "overflow-x-auto"}
            snap-x snap-mandatory
            scrollbar-hide
          `}
          style={{
            // ensure mobile shows one slide per view; flex-basis for mobile slides handled below
            scrollBehavior: "smooth",
            WebkitOverflowScrolling: "touch",
          }}
        >
          {slides.map((slide, index) => {
            // Desktop: use flex expansion by setting flex style
            // Mobile: make each slide full width (one per view) using flex: '0 0 100%'
            const style = isDesktop
              ? { flex: activeIndex === index ? 4 : 1, minWidth: 0 } // keep desktop fold behavior
              : { flex: "0 0 100%", maxWidth: "100%" }; // mobile: one per view

            return (
              <div
                key={index}
                onMouseEnter={() => isDesktop && setActiveIndex(index)}
                onMouseLeave={() => isDesktop && setActiveIndex(null)}
                className={`
                  relative cursor-pointer overflow-hidden
                  transition-all duration-500 ease-in-out
                  snap-start
                  ${isDesktop ? "mr-0" : "mr-3"} /* small gap between slides on mobile */
                `}
                style={style}
                aria-hidden={false}
              >
                <img
                  src={slide.image}
                  alt={slide.alt}
                  loading="lazy"
                  className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
                  style={{ display: "block" }}
                />

                {/* Overlay (visible on desktop when active; on mobile always show subtle overlay on hover/tap) */}
                <div
                  className={`absolute inset-0 bg-black/35 flex items-end p-4 text-white transition-opacity duration-500
                    ${isDesktop ? (activeIndex === index ? "opacity-100" : "opacity-0") : "opacity-100"}
                  `}
                >
                  <div>
                    <h3 className="text-lg font-semibold uppercase tracking-wide">{slide.alt}</h3>
                    <p className="text-sm">Discover the artistry →</p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Mobile hint (only on mobile) */}
      <p className="lg:hidden text-gray-500 text-xs mt-3 italic">Swipe to explore →</p>
    </section>
  );
};

export default DesignDetailSlider;
