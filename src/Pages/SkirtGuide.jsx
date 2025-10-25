"use client";
import { motion } from "framer-motion";

const SkirtLengthGuide = () => {
  const fadeUp = (delay = 0) => ({
    initial: { opacity: 0, y: 30 },
    whileInView: { opacity: 1, y: 0 },
    transition: { delay, duration: 0.6, ease: "easeOut" },
    viewport: { once: true },
  });

  return (
    <section className="min-h-screen bg-[#fdfaf7] py-16 px-6 sm:px-12 text-gray-700">
      <div className="max-w-5xl mx-auto text-center">
        <motion.h1
          {...fadeUp(0)}
          className="text-3xl sm:text-4xl font-semibold text-gray-900 mb-4"
        >
          Skirt Length Guide
        </motion.h1>
        <motion.p {...fadeUp(0.1)} className="text-gray-600 max-w-3xl mx-auto mb-12">
          Use this guide to determine the most comfortable skirt length for your height.
          Note: All skirt lengths are measured in inches and are slightly longer at the
          back for added coverage.
        </motion.p>
      </div>

      {/* First Table: 4&#39;10&#34; - 5&#39;4&#34; */}
      <motion.div {...fadeUp(0.2)} className="max-w-5xl mx-auto mb-12">
        <h2 className="text-lg font-semibold text-gray-800 mb-4 text-center">
          Heights 4&#39;10&#34; – 5&#39;4&#34;
        </h2>
        <div className="overflow-x-auto">
          <table className="w-full border border-gray-300 text-sm sm:text-base">
            <thead className="bg-white text-gray-700">
              <tr>
                <th className="py-2 px-4 border"></th>
                {[
                  "4&#39;10&#34;",
                  "4&#39;11&#34;",
                  "5&#39;0&#34;",
                  "5&#39;1&#34;",
                  "5&#39;2&#34;",
                  "5&#39;3&#34;",
                  "5&#39;4&#34;",
                ].map((h) => (
                  <th
                    key={h}
                    className="py-2 px-4 border font-medium"
                    dangerouslySetInnerHTML={{ __html: h }}
                  />
                ))}
              </tr>
            </thead>
            <tbody>
              {[
                { label: "MICRO-MINI", values: [10.5, 11, 11, 11.5, 12, 12.5, 13] },
                { label: "MINI", values: [13.5, 14, 14, 14.5, 15, 15.5, 16] },
                { label: "KNEE-LENGTH", values: [18.5, 19, 19, 19.5, 20, 20.5, 21] },
                { label: "MIDI", values: [28.5, 29, 29, 29.5, 30, 30.5, 31] },
                { label: "MAXI", values: [34.5, 35, 35, 35.5, 36, 36.5, 37] },
              ].map((row) => (
                <tr key={row.label}>
                  <td className="py-2 px-4 border font-medium">{row.label}</td>
                  {row.values.map((val, i) => (
                    <td key={i} className="py-2 px-4 border text-center">
                      {val}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </motion.div>

      {/* Second Table: 5&#39;5&#34; - 6&#39;0&#34; */}
      <motion.div {...fadeUp(0.3)} className="max-w-5xl mx-auto">
        <h2 className="text-lg font-semibold text-gray-800 mb-4 text-center">
          Heights 5&#39;5&#34; – 6&#39;0&#34;
        </h2>
        <div className="overflow-x-auto">
          <table className="w-full border border-gray-300 text-sm sm:text-base">
            <thead className="bg-white text-gray-700">
              <tr>
                <th className="py-2 px-4 border"></th>
                {[
                  "5&#39;5&#34;",
                  "5&#39;6&#34;",
                  "5&#39;7&#34;",
                  "5&#39;8&#34;",
                  "5&#39;9&#34;",
                  "5&#39;10&#34;",
                  "5&#39;11&#34;",
                  "6&#39;0&#34;",
                ].map((h) => (
                  <th
                    key={h}
                    className="py-2 px-4 border font-medium"
                    dangerouslySetInnerHTML={{ __html: h }}
                  />
                ))}
              </tr>
            </thead>
            <tbody>
              {[
                { label: "MICRO-MINI", values: [13.5, 14, 14.5, 15, 15.5, 16, 16.5, 17] },
                { label: "MINI", values: [16.5, 17, 17.5, 18, 18.5, 19, 19.5, 20] },
                {
                  label: "KNEE-LENGTH",
                  values: [21.5, 22, 22.5, 23, 23.5, 24, 24.5, 25.5],
                },
                { label: "MIDI", values: [31.5, 32, 32.5, 33, 33.5, 34, 34.5, 35.5] },
                { label: "MAXI", values: [37.5, 38, 38.5, 39, 39.5, 40, 40.5, 41] },
              ].map((row) => (
                <tr key={row.label}>
                  <td className="py-2 px-4 border font-medium">{row.label}</td>
                  {row.values.map((val, i) => (
                    <td key={i} className="py-2 px-4 border text-center">
                      {val}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </motion.div>
    </section>
  );
};

export default SkirtLengthGuide;
