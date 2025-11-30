import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import founder from "../assets/Logo1.jpeg";

const About = () => {
  const [activeTab, setActiveTab] = useState("founder");

  const tabs = [
    { id: "legacy", label: "THE LEGACY" },
    { id: "history", label: "THE HISTORY" },
    { id: "founder", label: "THE FOUNDER" },
    { id: "impact", label: "THE IMPACT" },
  ];

  const fadeUp = {
    hidden: { opacity: 0, y: 40 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" },
    },
    exit: { opacity: 0, y: -40, transition: { duration: 0.4 } },
  };

  const renderContent = () => {
    switch (activeTab) {
      case "legacy":
        return (
          <motion.div
            key="legacy"
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="text-center max-w-3xl mx-auto px-4"
          >
            <h2 className="text-3xl md:text-4xl font-semibold mb-6 text-yellow-800">
              Our Legacy
            </h2>
            <p className="text-gray-600 text-base md:text-lg leading-relaxed">
              Oakress was born from a passion to celebrate the grace and strength of
              African women. Each dress tells a story — a blend of heritage, artistry,
              and modern elegance. Our legacy is woven in every fabric, stitch, and
              silhouette, inspiring confidence, individuality, and timeless beauty.
            </p>
          </motion.div>
        );

      case "history":
        return (
          <motion.div
            key="history"
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="text-center max-w-3xl mx-auto px-4"
          >
            <h2 className="text-3xl md:text-4xl font-semibold mb-6 text-yellow-800">
              Our History
            </h2>
            <p className="text-gray-600 text-base md:text-lg leading-relaxed">
              Since our humble beginnings in 2010, Oakress has grown from a small atelier
              in Nigeria to a rising luxury. Our founder’s
              vision was simple — to redefine modern African elegance with designs that
              honor tradition while embracing innovation. Every collection is a step
              forward in our journey, crafted with care and passion.
            </p>
          </motion.div>
        );

      case "founder":
        return (
          <motion.div
            key="founder"
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 items-start max-w-6xl mx-auto px-4"
          >
            <motion.img
              src={founder}
              alt="Jane Doe"
              className="w-full h-auto object-cover rounded-2xl shadow-xl md:sticky md:top-24"
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1, transition: { duration: 0.6 } }}
            />
            <div className="space-y-6 text-gray-700 text-base md:text-lg leading-relaxed">
              <h2 className="text-2xl md:text-4xl font-bold text-yellow-800 mb-4">
              Adetunmise Salisu: Redefining Modern Elegance
              </h2>
              <p>
                <strong>Adetunmise Salisu </strong>, the visionary behind{" "}
                <strong>Oakress</strong>, founded the label with a mission to craft
                timeless, empowering dresses that celebrate femininity, individuality,
                and the artistry of couture.
              </p>
              <h3 className="text-lg md:text-xl font-semibold text-yellow-700 uppercase">
                From Thought to Thread
              </h3>
              <p>
                Raised with an eye for elegance, Adetunmise combined business acumen with
                creative flair, ensuring that Oakress balances strategy, innovation, and
                artistry in every design.
              </p>
              <h3 className="text-lg md:text-xl font-semibold text-yellow-700 uppercase">
                A Vision for the Future
              </h3>
              <p>
                Today, Adetunmise continues to champion sustainability and authentic African
                craftsmanship, designing dresses that empower women while leaving a
                positive mark on the fashion industry.
              </p>
            </div>
          </motion.div>
        );

      case "impact":
        return (
          <motion.div
            key="impact"
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="text-center max-w-3xl mx-auto px-4"
          >
            <h2 className="text-3xl md:text-4xl font-semibold mb-6 text-yellow-800">
              Our Impact
            </h2>
            <p className="text-gray-600 text-base md:text-lg leading-relaxed">
              Oakress is more than fashion — it’s a movement. By empowering local
              artisans, sourcing sustainable materials, and embracing ethical practices,
              we create dresses that make a difference. Our impact is felt in every
              community we touch, fostering creativity, opportunity, and a love for
              luxury African design.
            </p>
          </motion.div>
        );

      default:
        return null;
    }
  };

  return (
    <section className="w-full px-4 md:px-12 py-16 bg-gradient-to-b from-white to-yellow-50 relative">
      <h1 className="text-center text-4xl md:text-5xl font-bold mb-12 text-gray-900">
        About Us
      </h1>

      {/* Tabs */}
      <div className="flex overflow-x-auto gap-4 md:gap-6 border-b border-gray-300 mb-12 justify-start md:justify-center scrollbar-hide px-2 md:px-0">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            className={`pb-2 relative text-base md:text-xl font-medium tracking-wide transition-all duration-300 ${
              activeTab === tab.id
                ? "text-yellow-700 font-semibold"
                : "text-gray-700 hover:text-yellow-700"
            }`}
            aria-selected={activeTab === tab.id}
            onClick={() => setActiveTab(tab.id)}
          >
            {tab.label}
            {activeTab === tab.id && (
              <motion.div
                layoutId="underline"
                className="absolute left-0 right-0 -bottom-[2px] h-[3px] bg-yellow-700 rounded-full"
                transition={{ type: "spring", stiffness: 300, damping: 25 }}
              />
            )}
          </button>
        ))}
      </div>

      {/* Dynamic Content */}
      <div className="flex justify-center">
        <AnimatePresence mode="wait">{renderContent()}</AnimatePresence>
      </div>
    </section>
  );
};

export default About;
