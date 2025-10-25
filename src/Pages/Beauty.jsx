"use client";
import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, ChevronLeft, ChevronRight, Info, Maximize, Minimize } from "lucide-react";
import beauty1 from "../assets/Actual product/Ad.JPG";
import beauty2 from "../assets/Actual product/Ad4.JPG";
import beauty3 from "../assets/Actual product/Ad2.JPG";
import beauty4 from "../assets/Actual product/Ad3.JPG";

/*
  Cinematic Noir gallery data (same as your pillars)
*/
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

// Motion variants for modal
const backdropVariants = {
  hidden: { opacity: 0 },
  show: { opacity: 1 },
  exit: { opacity: 0 },
};

const modalVariants = {
  hidden: { opacity: 0, scale: 0.98 },
  show: { opacity: 1, scale: 1, transition: { duration: 0.28, ease: "easeOut" } },
  exit: { opacity: 0, scale: 0.98, transition: { duration: 0.18 } },
};

export default function TheWayOfBeauty() {
  const [lightboxIndex, setLightboxIndex] = useState(null); // index into pillars
  const [showCaption, setShowCaption] = useState(false);
  const [isZoomed, setIsZoomed] = useState(false);
  const [translate, setTranslate] = useState({ x: 0, y: 0 }); // pan offsets
  const panStartRef = useRef(null);
  const touchStartRef = useRef(null);
  const containerRef = useRef(null);
  const lastTapRef = useRef(0);

  const openAt = (index) => {
    setLightboxIndex(index);
    setShowCaption(false);
    setIsZoomed(false);
    setTranslate({ x: 0, y: 0 });
    // prevent body scroll when modal open
    document.body.style.overflow = "hidden";
  };

  const closeLightbox = () => {
    setLightboxIndex(null);
    setShowCaption(false);
    setIsZoomed(false);
    setTranslate({ x: 0, y: 0 });
    document.body.style.overflow = "";
  };

  // ensure body overflow resets on unmount (safety)
  useEffect(() => {
    return () => {
      document.body.style.overflow = "";
    };
  }, []);

  useEffect(() => {
    // keyboard support
    const onKey = (e) => {
      if (lightboxIndex === null) return;
      if (e.key === "Escape") closeLightbox();
      if (e.key === "ArrowLeft") setLightboxIndex((i) => (i > 0 ? i - 1 : i));
      if (e.key === "ArrowRight")
        setLightboxIndex((i) => (i < pillars.length - 1 ? i + 1 : i));
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [lightboxIndex]);

  // Swipe handlers (touch)
  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    let startX = 0;
    let startY = 0;
    let moving = false;

    const onTouchStart = (e) => {
      if (e.touches && e.touches.length === 1) {
        startX = e.touches[0].clientX;
        startY = e.touches[0].clientY;
        moving = true;
        touchStartRef.current = { startX, startY, time: Date.now() };
      }
    };

    const onTouchMove = (e) => {
      if (!moving || !e.touches || e.touches.length !== 1) return;
      const dx = e.touches[0].clientX - startX;
      const dy = e.touches[0].clientY - startY;

      // if zoomed, treat as pan
      if (isZoomed) {
        setTranslate((prev) => ({ x: prev.x + dx, y: prev.y + dy }));
        startX = e.touches[0].clientX;
        startY = e.touches[0].clientY;
      }
    };

    const onTouchEnd = (e) => {
      moving = false;
      const touchStart = touchStartRef.current;
      if (!touchStart) return;
      const elapsed = Date.now() - touchStart.time;
      const endX = (e.changedTouches && e.changedTouches[0].clientX) || startX;
      const deltaX = endX - touchStart.startX;

      // quick swipe detection (desktop-like)
      if (!isZoomed && Math.abs(deltaX) > 60 && elapsed < 350) {
        if (deltaX < 0) {
          setLightboxIndex((i) => (i < pillars.length - 1 ? i + 1 : i));
        } else {
          setLightboxIndex((i) => (i > 0 ? i - 1 : i));
        }
      }
      touchStartRef.current = null;
    };

    el.addEventListener("touchstart", onTouchStart, { passive: true });
    el.addEventListener("touchmove", onTouchMove, { passive: false });
    el.addEventListener("touchend", onTouchEnd, { passive: true });

    return () => {
      el.removeEventListener("touchstart", onTouchStart);
      el.removeEventListener("touchmove", onTouchMove);
      el.removeEventListener("touchend", onTouchEnd);
    };
  }, [isZoomed]);

  // Pointer-based pan (desktop) when zoomed
  const onPointerDown = (e) => {
    if (!isZoomed) return;
    panStartRef.current = { x: e.clientX, y: e.clientY };
    (e.target || window).setPointerCapture?.(e.pointerId);
  };

  const onPointerMove = (e) => {
    if (!isZoomed || !panStartRef.current) return;
    const dx = e.clientX - panStartRef.current.x;
    const dy = e.clientY - panStartRef.current.y;
    setTranslate((prev) => ({ x: prev.x + dx, y: prev.y + dy }));
    panStartRef.current = { x: e.clientX, y: e.clientY };
  };

  const onPointerUp = (_e) => {
    panStartRef.current = null;
    try {
      (_e.target || window).releasePointerCapture?.(_e.pointerId);
    } catch {
      // pointer was already released — safe to ignore
    }
  };

  // double-click / double-tap to toggle zoom
const handleImageClick = () => {
  const now = Date.now();
  const dt = now - lastTapRef.current;
  lastTapRef.current = now;
  // double-tap/double-click threshold ~300ms
  if (dt < 300) {
    setIsZoomed((z) => {
      if (z) setTranslate({ x: 0, y: 0 });
      return !z;
    });
  }
};


  // compute transform style when zoomed
  const imageStyle = {
    transition: isZoomed ? "transform 0.12s linear" : "transform 0.28s ease",
    transform: isZoomed
      ? `scale(1.9) translate(${translate.x / 1.9}px, ${translate.y / 1.9}px)`
      : "scale(1) translate(0,0)",
    touchAction: isZoomed ? "none" : "auto",
    cursor: isZoomed ? "grab" : "zoom-in",
  };

  return (
    <section className="w-full bg-white px-4 sm:px-6 py-12 sm:py-20">
      {/* Heading */}
      <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-center mb-12 sm:mb-16 tracking-wide text-neutral-800">
        The Way of Beauty
      </h1>

      {/* Grid */}
      <div className="max-w-screen-xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 auto-rows-[280px] sm:auto-rows-[360px] lg:auto-rows-[500px]">
        {pillars.map((pillar, i) => {
          const gridClass =
            i === 0
              ? "lg:col-span-2 lg:row-span-2"
              : i === 2
              ? "lg:col-span-2 lg:row-span-1"
              : "";

          return (
            <div
              key={pillar.title}
              className={`relative overflow-hidden rounded-2xl shadow-lg group cursor-zoom-in ${gridClass}`}
              onClick={() => openAt(i)}
            >
              <img
                src={pillar.image}
                alt={pillar.title}
                loading="lazy"
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/40 to-transparent flex items-end">
                <div className="p-6 opacity-100">
                  <h3 className="text-xl sm:text-2xl md:text-3xl font-semibold text-white mb-2">
                    {pillar.title}
                  </h3>
                  <p className="text-sm sm:text-base text-white/90 leading-relaxed">
                    {pillar.desc}
                  </p>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {lightboxIndex !== null && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
            initial="hidden"
            animate="show"
            exit="exit"
            variants={backdropVariants}
            style={{
              background:
                "radial-gradient(ellipse at center, rgba(0,0,0,0.75) 0%, rgba(0,0,0,0.95) 80%)",
            }} // cinematic vignette
            onClick={closeLightbox} // close on outside click
          >
            <motion.div
              variants={modalVariants}
              className="relative w-full max-w-5xl mx-auto"
              onClick={(e) => e.stopPropagation()} // prevent close when clicking modal
            >
              {/* Film grain & vignette overlay (subtle) */}
              <div className="pointer-events-none absolute inset-0 rounded-lg mix-blend-overlay opacity-5" />

              {/* Close button */}
              <button
                onClick={closeLightbox}
                className="absolute top-6 right-6 z-60 bg-black/40 backdrop-blur-sm p-2 rounded-full text-white hover:bg-black/60 transition"
                aria-label="Close"
              >
                <X size={20} />
              </button>

              {/* Prev/Next */}
              {lightboxIndex > 0 && (
                <button
                  onClick={() => setLightboxIndex((i) => i - 1)}
                  className="absolute left-4 top-1/2 -translate-y-1/2 z-40 bg-black/30 p-3 rounded-full text-white hover:bg-black/50 transition"
                  aria-label="Previous"
                >
                  <ChevronLeft size={20} />
                </button>
              )}
              {lightboxIndex < pillars.length - 1 && (
                <button
                  onClick={() => setLightboxIndex((i) => i + 1)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 z-40 bg-black/30 p-3 rounded-full text-white hover:bg-black/50 transition"
                  aria-label="Next"
                >
                  <ChevronRight size={20} />
                </button>
              )}

              {/* Info / zoom controls */}
              <div className="absolute left-6 bottom-6 z-40 flex items-center gap-3">
                <button
                  onClick={() => setShowCaption((s) => !s)}
                  className="bg-black/30 p-2 rounded-md text-white hover:bg-black/50 transition flex items-center gap-2"
                  aria-label="Toggle caption"
                >
                  <Info size={16} />
                  <span className="hidden sm:inline text-sm">Info</span>
                </button>

                <button
                  onClick={() => {
                    setIsZoomed((z) => {
                      if (z) setTranslate({ x: 0, y: 0 });
                      return !z;
                    });
                  }}
                  className="bg-black/30 p-2 rounded-md text-white hover:bg-black/50 transition flex items-center gap-2"
                  aria-label={isZoomed ? "Reset zoom" : "Toggle zoom"}
                >
                  {isZoomed ? <Minimize size={16} /> : <Maximize size={16} />}
                  <span className="hidden sm:inline text-sm">{isZoomed ? "Reset" : "Zoom"}</span>
                </button>
              </div>

              {/* Image container */}
              <div
                ref={containerRef}
                className="relative bg-black rounded-lg overflow-hidden"
                onPointerDown={onPointerDown}
                onPointerMove={onPointerMove}
                onPointerUp={onPointerUp}
                onPointerCancel={onPointerUp}
              >
                <motion.img
                  key={pillars[lightboxIndex].image}
                  src={pillars[lightboxIndex].image}
                  alt={pillars[lightboxIndex].title}
                  initial={{ opacity: 0, scale: 0.98 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.98 }}
                  className="w-full max-h-[80vh] object-contain mx-auto"
                  onClick={handleImageClick}
                  style={imageStyle}
                  draggable={false}
                />
              </div>

              {/* Caption panel (hidden by default) */}
              <AnimatePresence>
                {showCaption && (
                  <motion.div
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 8 }}
                    className="mt-4 px-4 py-3 bg-black/70 text-white rounded-b-lg text-left"
                  >
                    <div className="flex items-start justify-between gap-4">
                      <div>
                        <h3 className="text-lg font-semibold">{pillars[lightboxIndex].title}</h3>
                        <p className="text-sm text-white/90 mt-1">{pillars[lightboxIndex].desc}</p>
                      </div>
                      <div className="text-xs text-white/70">
                        <p>Photo: Oakress Studio</p>
                        <p className="mt-1">Model & styling credits</p>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
