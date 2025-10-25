"use client";
import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom"; // swap with next/link for Next.js

// ---------- CONFIG ----------
const ACCENT = "#8C6A4F"; // luxury bronze — change to your brand color
// ---------------------------

const ReadyOrder = () => {
  const [offsetY, setOffsetY] = useState(0);
  const floatRef = useRef(null);

  // minor parallax: move the ambient circle slowly on scroll (subtle)
  useEffect(() => {
    const onScroll = () => {
      // gentle smoothing
      setOffsetY(window.scrollY * 0.08);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <section
      aria-labelledby="ready-order-heading"
      className="relative py-20 px-6 lg:px-20 bg-gradient-to-b from-white to-neutral-50 overflow-hidden"
    >
      {/* ambient decorative soft circle (parallax) */}
      <div
        ref={floatRef}
        aria-hidden
        style={{
          transform: `translate3d(-50%, ${offsetY}px, 0)`,
        }}
        className="pointer-events-none absolute left-1/2 -translate-x-1/2 -top-40 w-[56rem] h-[56rem] rounded-full"
      >
        <div
          style={{ background: `radial-gradient(circle at 30% 30%, ${ACCENT}10, transparent 40%)` }}
          className="w-full h-full opacity-20 blur-[100px]"
        />
      </div>

      <div className="max-w-5xl mx-auto text-center relative z-10">
        {/* Tagline */}
        <motion.p
          id="ready-order-tag"
          initial={{ opacity: 0, y: 8 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.6 }}
          transition={{ duration: 0.6 }}
          className="uppercase tracking-[0.22em] text-xs sm:text-sm text-neutral-500"
        >
          Oakress 
        </motion.p>

        {/* Heading */}
        <motion.h1
          id="ready-order-heading"
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.6 }}
          transition={{ duration: 0.7, delay: 0.06 }}
          className="mt-4 text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-light leading-tight text-neutral-900"
        >
          Crafted for the woman who{" "}
          <span
            className="font-semibold italic"
            style={{ color: ACCENT }}
          >
            defines her presence
          </span>
        </motion.h1>

        {/* Supporting copy */}
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.6 }}
          transition={{ duration: 0.75, delay: 0.12 }}
          className="mt-6 text-base sm:text-lg text-neutral-600 max-w-3xl mx-auto leading-relaxed"
        >
          Begin a bespoke journey: couture fittings, refined materials and finishes,
          and pieces tailored to your life. Oakress is where considered design meets
          enduring confidence.
        </motion.p>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.6 }}
          transition={{ duration: 0.8, delay: 0.18 }}
          className="mt-10 flex justify-center gap-4"
        >
          <Link to="/bespoke" aria-label="Begin bespoke journey">
            <motion.button
              whileHover={{ translateY: -2 }}
              whileTap={{ scale: 0.98 }}
              className="inline-flex items-center gap-3 px-8 py-3 rounded-full bg-neutral-900 text-white font-semibold text-sm shadow-[0_8px_30px_rgba(2,6,23,0.12)] transition"
              style={{ boxShadow: "0 8px 30px rgba(2,6,23,0.12)" }}
            >
              Begin Your Bespoke Journey
              <ArrowRight className="w-4 h-4" />
            </motion.button>
          </Link>

          
        </motion.div>

        {/* subtle footnote */}
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.25 }}
          className="mt-6 text-xs text-neutral-500"
        >
          Bespoke starts from consultation — appointments available by request.
        </motion.p>
      </div>

      {/* decorative thin divider bottom */}
      <div className="absolute left-0 right-0 bottom-0 h-px bg-gradient-to-r from-transparent via-neutral-200 to-transparent" />
    </section>
  );
};

export default ReadyOrder;
