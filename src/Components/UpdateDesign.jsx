import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { Link } from "react-router-dom";

import Design1 from "../assets/Actual product/Gem13.jpg";
import Design2 from "../assets/Actual product/Gemini 6.jpg";
import Design3 from "../assets/Actual product/Gemini 8.jpg";

const collectionImages = [
  {
    id: 1,
    image: Design1,
    
  },
  {
    id: 2,
    image: Design2,
  
  },
  {
    id: 3,
    image: Design3,
  
  },
];

export default function LatestCollection() {
  return (
    <section className="relative py-28 px-6 md:px-12 overflow-hidden">

      {/* soft grain */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none bg-[url('/noise.png')]" />

      {/* subtle ambient gradients */}
      <div className="absolute top-0 left-0 w-[400px] h-[400px] bg-stone-200/40 blur-3xl rounded-full" />
      <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-neutral-200/40 blur-3xl rounded-full" />

      <div className="relative z-10 max-w-7xl mx-auto">

        {/* HEADER */}
        <motion.div
          initial={{ opacity: 0, y: 35 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          viewport={{ once: true }}
          className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-10 mb-24"
        >
          <div>

            {/* subtle collection indicator */}
            <div className="flex items-center gap-3 mb-6">
              <div className="w-2 h-2 rounded-full bg-neutral-900 animate-pulse" />

              <p className="uppercase tracking-[0.35em] text-[11px] text-neutral-500">
                Newly Released Mini Collection
              </p>
            </div>

            <h2 className="text-5xl md:text-7xl font-light leading-[0.92] tracking-tight text-neutral-900">
              Gemini
              <span className="font-semibold"> Collection</span>
            </h2>
          </div>

          <div className="max-w-md">
            <p className="text-neutral-500 leading-relaxed text-base mb-8">
              Refined silhouettes and expressive textures designed to embody
              contemporary elegance with understated confidence.
            </p>

            {/* collection button */}
            <Link
              to="/collections-page"
              className="group inline-flex items-center gap-3 border border-neutral-300
              px-6 py-3 rounded-full text-sm text-neutral-900
              hover:bg-neutral-900 hover:text-white
              transition-all duration-500"
            >
              Explore Full Collection

              <ArrowUpRight
                className="w-4 h-4 transition-transform duration-500
                group-hover:translate-x-1 group-hover:-translate-y-1"
              />
            </Link>
          </div>
        </motion.div>

        {/* GRID */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">

          {/* FEATURED IMAGE */}
          <motion.div
            initial={{ opacity: 0, scale: 0.98 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="lg:col-span-7 group relative overflow-hidden rounded-[2rem]
            h-[520px] md:h-[700px]
            bg-white border border-neutral-200"
          >

            {/* latest badge */}
            <div className="absolute top-6 left-6 z-20 backdrop-blur-md bg-white/80
            border border-neutral-200 px-4 py-2 rounded-full">

              <p className="text-[10px] uppercase tracking-[0.3em] text-neutral-700">
                Latest Drop
              </p>
            </div>

            <img
              src={collectionImages[0].image}
              alt={collectionImages[0].title}
              className="w-full h-full object-cover transition duration-700 group-hover:scale-[1.04]"
            />

            {/* subtle overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-white/50 via-transparent to-transparent" />

            {/* content */}
            <div className="absolute bottom-0 left-0 p-8 md:p-10">

              <p className="uppercase tracking-[0.28em] text-[11px] text-neutral-500 mb-3">
                {collectionImages[0].subtitle}
              </p>

              <h3 className="text-4xl md:text-5xl font-medium text-neutral-900">
                {collectionImages[0].title}
              </h3>
            </div>
          </motion.div>

          {/* SIDE GRID */}
          <div className="lg:col-span-5 flex flex-col gap-8">

            {collectionImages.slice(1).map((item, index) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, x: 25 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.15 }}
                viewport={{ once: true }}
                className="group relative overflow-hidden rounded-[2rem]
                h-[335px] bg-white border border-neutral-200"
              >

                {/* subtle badge */}
                <div className="absolute top-5 left-5 z-20 backdrop-blur-md bg-white/80
                border border-neutral-200 px-3 py-2 rounded-full">

                  <p className="text-[9px] uppercase tracking-[0.25em] text-neutral-700">
                    New
                  </p>
                </div>

                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full h-full object-cover transition duration-700 group-hover:scale-[1.04]"
                />

                <div className="absolute inset-0 bg-gradient-to-t from-white/40 via-transparent to-transparent" />

                <div className="absolute bottom-0 left-0 p-7">

                  <p className="uppercase text-[10px] tracking-[0.3em] text-neutral-500 mb-2">
                    {item.subtitle}
                  </p>

                  <h3 className="text-2xl md:text-3xl font-medium text-neutral-900">
                    {item.title}
                  </h3>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* subtle footer detail */}
        

      </div>
    </section>
  );
}