"use client";
import { motion } from "framer-motion";

const SizeGuide = () => {
  const fadeUp = (delay = 0) => ({
    initial: { opacity: 0, y: 30 },
    whileInView: { opacity: 1, y: 0 },
    transition: { delay, duration: 0.6, ease: "easeOut" },
    viewport: { once: true },
  });

  return (
    <section className="min-h-screen bg-white py-16 px-6 sm:px-12 text-gray-700">
      <div className="max-w-5xl mx-auto text-center">
        <motion.h1
          {...fadeUp(0)}
          className="text-3xl sm:text-4xl font-semibold text-gray-900 mb-4"
        >
          Size Guide
        </motion.h1>
        <motion.p {...fadeUp(0.1)} className="text-gray-600 max-w-3xl mx-auto mb-12">
          While closely following standard U.K. sizing, this sizing is unique to RÍRÁN.
          Before you order, we recommend using the size guide below to determine your
          correct fit.
        </motion.p>
      </div>

      {/* Conversion Chart */}
      <motion.div {...fadeUp(0.2)} className="max-w-4xl mx-auto mb-12">
        <h2 className="text-xl font-semibold text-gray-800 mb-4 text-center">
          Conversion Chart
        </h2>
        <div className="overflow-x-auto">
          <table className="w-full border border-gray-300 text-sm sm:text-base">
            <thead className="bg-gray-100 text-gray-700">
              <tr>
                <th className="py-2 px-4 border">UK</th>
                {[4, 6, 8, 10, 12, 14, 16, 18, 20, 22, 24, 26, 28].map((size) => (
                  <th key={size} className="py-2 px-4 border font-medium">
                    {size}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="py-2 px-4 border font-medium">US</td>
                {[0, 2, 4, 6, 8, 10, 12, 14, 16, 18, 20, 22, 24].map((size) => (
                  <td key={size} className="py-2 px-4 border text-center">
                    {size}
                  </td>
                ))}
              </tr>
            </tbody>
          </table>
        </div>
      </motion.div>

      {/* Size Chart */}
      <motion.div {...fadeUp(0.3)} className="max-w-4xl mx-auto">
        <h2 className="text-xl font-semibold text-gray-800 mb-4 text-center">
          Size Chart [inches]
        </h2>
        <div className="overflow-x-auto">
          <table className="w-full border border-gray-300 text-sm sm:text-base">
            <thead className="bg-gray-100 text-gray-700">
              <tr>
                <th className="py-2 px-4 border"></th>
                {[4, 6, 8, 10, 12, 14, 16, 18, 20, 22, 24, 26, 28].map((size) => (
                  <th key={size} className="py-2 px-4 border font-medium">
                    {size}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="py-2 px-4 border font-medium">BUST</td>
                {[32, 33, 34, 36, 38, 40, 42, 44, 46, 48, 51, 54, 57].map((val) => (
                  <td key={val} className="py-2 px-4 border text-center">
                    {val}
                  </td>
                ))}
              </tr>
              <tr>
                <td className="py-2 px-4 border font-medium">WAIST</td>
                {[23, 25, 27, 29, 31, 33, 35, 37, 39, 41, 44, 47, 50].map((val) => (
                  <td key={val} className="py-2 px-4 border text-center">
                    {val}
                  </td>
                ))}
              </tr>
              <tr>
                <td className="py-2 px-4 border font-medium">HIP</td>
                {[34, 36, 38, 40, 42, 44, 46, 48, 50, 53, 56, 59, 62].map((val) => (
                  <td key={val} className="py-2 px-4 border text-center">
                    {val}
                  </td>
                ))}
              </tr>
            </tbody>
          </table>
        </div>
      </motion.div>
    </section>
  );
};

export default SizeGuide;
