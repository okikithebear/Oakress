import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

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
            className="text-center max-w-2xl mx-auto"
          >
            <h2 className="text-3xl font-semibold mb-4">Our Legacy</h2>
            <p className="text-gray-600 leading-relaxed">
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
            className="text-center max-w-2xl mx-auto"
          >
            <h2 className="text-3xl font-semibold mb-4">Our History</h2>
            <p className="text-gray-600 leading-relaxed">
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
            className="grid md:grid-cols-2 gap-8 items-start max-w-6xl mx-auto"
          >
            <motion.img
              src="/images/founder.jpg"
              alt="Jane Doe"
              className="w-full h-auto object-cover rounded-2xl shadow-lg"
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1, transition: { duration: 0.6 } }}
            />
            <div className="space-y-6 text-gray-700">
              <h2 className="text-3xl font-semibold text-yellow-800">
                Jane Doe: Redefining Modern Elegance
              </h2>
              <p>
                <strong>Jane Doe</strong>, the visionary behind{" "}
                <strong>[Your Brand Name]</strong>, founded the label with one
                clear mission: to craft timeless pieces that celebrate
                femininity, individuality, and the artistry of couture. Her
                journey from a high-powered corporate career to the heart of the
                fashion world is a testament to her courage, creativity, and
                relentless pursuit of excellence.
              </p>
              <h3 className="text-xl font-semibold text-yellow-800 uppercase">
                From Boardroom to Atelier
              </h3>
              <p>
                Raised in a world where elegance was a way of life, Janes
                passion for design began early, inspired by the women who shaped
                her sense of style and strength. She honed her business acumen
                in global finance before turning her focus to fashion, bringing
                an unshakable foundation in strategy and innovation — qualities
                that now define her brand’s DNA.
              </p>
              <h3 className="text-xl font-semibold text-yellow-800 uppercase">
                A Signature Aesthetic
              </h3>
              <p>
                Every piece Jane creates is a love letter to the modern woman —
                meticulously cut, thoughtfully detailed, and imbued with quiet
                confidence. Her designs balance sculptural silhouettes with
                fluid draping, marrying contemporary minimalism with subtle nods
                to heritage craftsmanship.
              </p>
              <h3 className="text-xl font-semibold text-yellow-800 uppercase">
                Empowerment Through Design
              </h3>
              <p>
                Jane believes true luxury lies not only in the fabric, but in
                the feeling it evokes. Her work is about more than garments —
                it’s about empowering women to own their presence, tell their
                stories, and step into any room with quiet authority.
              </p>
              <h3 className="text-xl font-semibold text-yellow-800 uppercase">
                A Vision for the Future
              </h3>
              <p>
                Looking ahead, Jane remains committed to blending tradition with
                innovation — championing sustainable practices, supporting local
                artisans, and creating pieces that stand the test of time.
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
            className="text-center max-w-2xl mx-auto"
          >
            <h2 className="text-3xl font-semibold mb-4">Our Impact</h2>
            <p className="text-gray-600 leading-relaxed">
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
    <div className="w-full px-4 py-12 bg-white">
      {/* Tabs */}
      <div className="flex justify-center gap-6 border-b border-gray-300 mb-10 relative">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            className={`pb-2 relative text-lg tracking-wide transition-all duration-300 ${
              activeTab === tab.id
                ? "text-yellow-700 font-semibold"
                : "text-gray-700 hover:text-yellow-700"
            }`}
            onClick={() => setActiveTab(tab.id)}
          >
            {tab.label}
            {activeTab === tab.id && (
              <motion.div
                layoutId="underline"
                className="absolute left-0 right-0 -bottom-[1px] h-[2px] bg-yellow-700"
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
              />
            )}
          </button>
        ))}
      </div>

      {/* Dynamic Content */}
      <div className="flex justify-center">
        <AnimatePresence mode="wait">{renderContent()}</AnimatePresence>
      </div>
    </div>
  );
};

export default About;
