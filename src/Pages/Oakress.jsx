"use client";
import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, ChevronLeft, ChevronRight, Info, Maximize, Minimize } from "lucide-react";
import muse1 from "../assets/Aisha.jpeg";
import muse2 from "../assets/Laduma.jpeg";
import muse3 from "../assets/Loza.jpg";
import muse4 from "../assets/Kenneth.jpeg";
import muse5 from "../assets/Mariam.jpeg";
import muse6 from "../assets/Imane.jpeg";

const muses = [
  {
    name: "Aisha Ayensu Obuobi",
    description: "Founder of Christie Brown, fusing traditional Ghanaian textiles with contemporary silhouettes.",
    image: muse1,
  },
  {
    name: "Laduma Ngxokolo",
    description: "Founder of Maxhosa by Laduma, showcasing bold Xhosa-inspired knitwear.",
    image: muse2,
  },
  {
    name: "Loza Maléombho",
    description: "Designer blending Ivorian, Brazilian, and North American influences in her creations.",
    image: muse3,
  },
  {
    name: "Kenneth Ize",
    description: "Celebrated for vibrant, contemporary designs using traditional West African textiles.",
    image: muse4,
  },
  {
    name: "Mariam Afolabi",
    description: "Founder of Mazelle, merging West African, Victorian, and contemporary styles.",
    image: muse5,
  },
  {
    name: "Imane Ayissi",
    description: "Couture designer combining modernity with African heritage, using luxurious fabrics.",
    image: muse6,
  },
];

// Motion variants
const backdropVariants = { hidden: { opacity: 0 }, show: { opacity: 1 }, exit: { opacity: 0 } };
const modalVariants = { hidden: { opacity: 0, scale: 0.98 }, show: { opacity: 1, scale: 1, transition: { duration: 0.3 } }, exit: { opacity: 0, scale: 0.98, transition: { duration: 0.2 } } };
const fadeUp = { hidden: { opacity: 0, y: 40 }, visible: (i) => ({ opacity: 1, y: 0, transition: { duration: 0.6, delay: i * 0.15 } }) };

export default function OakdressMuse() {
  const [lightboxIndex, setLightboxIndex] = useState(null);
  const [showCaption, setShowCaption] = useState(false);
  const [isZoomed, setIsZoomed] = useState(false);
  const [translate, setTranslate] = useState({ x: 0, y: 0 });
  const panStartRef = useRef(null);
  const touchStartRef = useRef(null);
  const containerRef = useRef(null);
  const lastTapRef = useRef(0);

  const openAt = (index) => { setLightboxIndex(index); setShowCaption(false); setIsZoomed(false); setTranslate({ x: 0, y: 0 }); document.body.style.overflow = "hidden"; };
  const closeLightbox = () => { setLightboxIndex(null); setShowCaption(false); setIsZoomed(false); setTranslate({ x: 0, y: 0 }); document.body.style.overflow = ""; };

  // Keyboard nav
  useEffect(() => {
    const onKey = (e) => {
      if (lightboxIndex === null) return;
      if (e.key === "Escape") closeLightbox();
      if (e.key === "ArrowLeft") setLightboxIndex(i => (i > 0 ? i - 1 : i));
      if (e.key === "ArrowRight") setLightboxIndex(i => (i < muses.length - 1 ? i + 1 : i));
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [lightboxIndex]);

  // Touch swipe
  useEffect(() => {
    const el = containerRef.current; if (!el) return;
    let startX = 0, startY = 0, moving = false;
    const onTouchStart = (e) => { if (e.touches.length === 1) { startX = e.touches[0].clientX; startY = e.touches[0].clientY; moving = true; touchStartRef.current = { startX, startY, time: Date.now() }; } };
    const onTouchMove = (e) => {
      if (!moving || e.touches.length !== 1) return;
      const dx = e.touches[0].clientX - startX, dy = e.touches[0].clientY - startY;
      if (isZoomed) { setTranslate(prev => ({ x: prev.x + dx, y: prev.y + dy })); startX = e.touches[0].clientX; startY = e.touches[0].clientY; }
    };
    const onTouchEnd = (e) => {
      moving = false; const ts = touchStartRef.current; if (!ts) return;
      const deltaX = ((e.changedTouches?.[0]?.clientX) || startX) - ts.startX;
      const elapsed = Date.now() - ts.time;
      if (!isZoomed && Math.abs(deltaX) > 60 && elapsed < 350) { deltaX < 0 ? setLightboxIndex(i => (i < muses.length - 1 ? i + 1 : i)) : setLightboxIndex(i => (i > 0 ? i - 1 : i)); }
      touchStartRef.current = null;
    };
    el.addEventListener("touchstart", onTouchStart, { passive: true });
    el.addEventListener("touchmove", onTouchMove, { passive: false });
    el.addEventListener("touchend", onTouchEnd, { passive: true });
    return () => { el.removeEventListener("touchstart", onTouchStart); el.removeEventListener("touchmove", onTouchMove); el.removeEventListener("touchend", onTouchEnd); };
  }, [isZoomed]);

  // Pointer pan
  const onPointerDown = (e) => { if (!isZoomed) return; panStartRef.current = { x: e.clientX, y: e.clientY }; (e.target || window).setPointerCapture?.(e.pointerId); };
  const onPointerMove = (e) => { if (!isZoomed || !panStartRef.current) return; const dx = e.clientX - panStartRef.current.x; const dy = e.clientY - panStartRef.current.y; setTranslate(prev => ({ x: prev.x + dx, y: prev.y + dy })); panStartRef.current = { x: e.clientX, y: e.clientY }; };
  const onPointerUp = () => {
  panStartRef.current = null;
};


  const handleImageClick = () => {
    const now = Date.now();
    const dt = now - lastTapRef.current;
    lastTapRef.current = now;
    if (dt < 300) setIsZoomed(z => { if (z) setTranslate({ x: 0, y: 0 }); return !z; });
  };

  const imageStyle = { transition: isZoomed ? "transform 0.12s linear" : "transform 0.28s ease", transform: isZoomed ? `scale(1.8) translate(${translate.x / 1.8}px, ${translate.y / 1.8}px)` : "scale(1) translate(0,0)", touchAction: isZoomed ? "none" : "auto", cursor: isZoomed ? "grab" : "zoom-in" };

  return (
    <section className="w-full bg-white px-4 sm:px-6 md:px-8 py-12 sm:py-16">
      <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-center mb-12 tracking-wide text-neutral-900">Muses & Icons</h1>

      {/* Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-screen-xl mx-auto auto-rows-[300px] sm:auto-rows-[360px] lg:auto-rows-[420px]">
        {muses.map((muse, i) => (
          <motion.article key={muse.name} className="relative rounded-xl overflow-hidden group shadow-lg cursor-zoom-in" variants={fadeUp} initial="hidden" animate="visible" custom={i} onClick={() => openAt(i)}>
            <img src={muse.image} alt={muse.name} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" loading="lazy" draggable={false} />
            <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-40 text-white text-center py-2 font-semibold">{muse.name}</div>
          </motion.article>
        ))}
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {lightboxIndex !== null && (
          <motion.div className="fixed inset-0 z-50 flex items-center justify-center p-4" variants={backdropVariants} initial="hidden" animate="show" exit="exit" style={{ background: "radial-gradient(ellipse at center, rgba(0,0,0,0.85) 0%, rgba(0,0,0,0.95) 80%)" }} onClick={closeLightbox}>
            <motion.div variants={modalVariants} className="relative w-full max-w-5xl mx-auto" onClick={e => e.stopPropagation()}>
              {/* Close */}
              <button onClick={closeLightbox} className="absolute top-6 right-6 z-50 bg-black/40 p-2 rounded-full text-white hover:bg-black/60 transition"><X size={20} /></button>

              {/* Prev/Next */}
              {lightboxIndex > 0 && <button onClick={() => setLightboxIndex(i => i - 1)} className="absolute left-4 top-1/2 -translate-y-1/2 z-40 bg-black/30 p-3 rounded-full text-white hover:bg-black/50 transition"><ChevronLeft size={20} /></button>}
              {lightboxIndex < muses.length - 1 && <button onClick={() => setLightboxIndex(i => i + 1)} className="absolute right-4 top-1/2 -translate-y-1/2 z-40 bg-black/30 p-3 rounded-full text-white hover:bg-black/50 transition"><ChevronRight size={20} /></button>}

              {/* Info & Zoom */}
              <div className="absolute left-6 bottom-6 z-40 flex items-center gap-3">
                <button onClick={() => setShowCaption(s => !s)} className="bg-black/30 p-2 rounded-md text-white hover:bg-black/50 flex items-center gap-2"><Info size={16} /> <span className="hidden sm:inline text-sm">Info</span></button>
                <button onClick={() => setIsZoomed(z => { if (z) setTranslate({ x: 0, y: 0 }); return !z; })} className="bg-black/30 p-2 rounded-md text-white hover:bg-black/50 flex items-center gap-2">{isZoomed ? <Minimize size={16} /> : <Maximize size={16} />} <span className="hidden sm:inline text-sm">{isZoomed ? "Reset" : "Zoom"}</span></button>
              </div>

              {/* Image */}
              <div ref={containerRef} className="relative bg-black rounded-lg overflow-hidden" onPointerDown={onPointerDown} onPointerMove={onPointerMove} onPointerUp={onPointerUp} onPointerCancel={onPointerUp}>
                <motion.img key={muses[lightboxIndex].image} src={muses[lightboxIndex].image} alt={muses[lightboxIndex].name} className="w-full max-h-[80vh] object-contain mx-auto" onClick={handleImageClick} style={imageStyle} draggable={false} />
              </div>

              {/* Caption */}
              <AnimatePresence>
                {showCaption && (
                  <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 8 }} className="mt-4 px-4 py-3 bg-black/70 text-white rounded-b-lg text-left">
                    <h3 className="text-lg font-semibold">{muses[lightboxIndex].name}</h3>
                    <p className="mt-1 text-sm">{muses[lightboxIndex].description}</p>
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
