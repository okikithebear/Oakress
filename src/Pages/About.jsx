import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import founder from "../assets/beauty1.jpg";
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
            className="text-center max-w-3xl mx-auto"
          >
            <h2 className="text-4xl font-semibold mb-6 text-yellow-800">
              Our Legacy
            </h2>
            <p className="text-gray-600 text-lg leading-relaxed">
              For decades, our designs have celebrated the timeless beauty and
              strength of women worldwide, weaving stories into every stitch.
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
            className="text-center max-w-3xl mx-auto"
          >
            <h2 className="text-4xl font-semibold mb-6 text-yellow-800">
              Our History
            </h2>
            <p className="text-gray-600 text-lg leading-relaxed">
              Founded in 2010, we began as a small atelier with a dream to
              redefine modern elegance, one garment at a time.
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
            className="grid md:grid-cols-2 gap-12 items-start max-w-6xl mx-auto"
          >
            <motion.img
              src={founder}
              alt="Jane Doe"
              className="w-full h-auto object-cover rounded-2xl shadow-xl sticky top-24"
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1, transition: { duration: 0.6 } }}
            />
            <div className="space-y-6 text-gray-700 text-lg leading-relaxed">
              <h2 className="text-4xl font-bold text-yellow-800 mb-4">
                Jane Doe: Redefining Modern Elegance
              </h2>
              <p>
                <strong>Jane Doe</strong>, the visionary behind{" "}
                <strong>Oakress</strong>, founded the label with one clear
                mission: to craft timeless pieces that celebrate femininity,
                individuality, and the artistry of couture.
              </p>
              <h3 className="text-xl font-semibold text-yellow-700 uppercase">
                From Boardroom to Atelier
              </h3>
              <p>
                Raised in a world where elegance was a way of life, Jane’s
                passion for design began early. She honed her business acumen
                before turning her focus to fashion, blending strategy and
                artistry.
              </p>
              <h3 className="text-xl font-semibold text-yellow-700 uppercase">
                A Vision for the Future
              </h3>
              <p>
                Jane remains committed to blending tradition with innovation —
                championing sustainability and creating pieces that stand the
                test of time.
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
            className="text-center max-w-3xl mx-auto"
          >
            <h2 className="text-4xl font-semibold mb-6 text-yellow-800">
              Our Impact
            </h2>
            <p className="text-gray-600 text-lg leading-relaxed">
              From sustainable sourcing to empowering artisans, we believe
              fashion can be a force for good — creating beauty that lasts.
            </p>
          </motion.div>
        );

      default:
        return null;
    }
  };

  return (
    <section className="w-full px-6 md:px-12 py-16 bg-gradient-to-b from-white to-yellow-50 relative">
      {/* Section Heading */}
      <h1 className="text-center text-5xl font-bold mb-12 text-gray-900">
        About Us
      </h1>

      {/* Tabs */}
      <div className="flex overflow-x-auto gap-6 border-b border-gray-300 mb-12 justify-center scrollbar-hide">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            className={`pb-2 relative text-lg md:text-xl font-medium tracking-wide transition-all duration-300 ${
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
