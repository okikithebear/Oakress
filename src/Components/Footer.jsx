"use client";
import { motion } from "framer-motion";

const Footer = () => {
  const fadeUp = (delay = 0) => ({
    initial: { opacity: 0, y: 30 },
    whileInView: { opacity: 1, y: 0 },
    transition: { delay, duration: 0.6, ease: "easeOut" },
    viewport: { once: true },
  });

  return (
    <footer className="relative py-20 px-6 sm:px-12 bg-white text-gray-700 border-t border-gray-200 overflow-hidden">
      {/* Elegant Background Glow */}
      <div className="absolute inset-0 opacity-15 pointer-events-none">
        <div className="absolute top-8 left-0 w-80 h-80 bg-gradient-to-br from-gray-200 to-white rounded-full blur-3xl"></div>
        <div className="absolute bottom-8 right-0 w-80 h-80 bg-gradient-to-tl from-gray-100 to-white rounded-full blur-3xl"></div>
      </div>

      {/* Footer Content */}
      <div className="relative grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-14 z-10">
        {/* Connect Column */}
        <motion.div {...fadeUp(0)}>
          <h3 className="text-lg font-semibold tracking-wide mb-6 text-gray-900">
            CONNECT WITH US
          </h3>
          <div className="flex space-x-6">
  {[
    {
      name: "instagram",
      color: "hover:text-black",
      link: "https://www.instagram.com/oakress_?igsh=cHpwMGhwZGlzMms0",
    },
  ].map(({ name, color, link }) => (
    <motion.a
      key={name}
      href={link}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={name}
      whileHover={{ y: -3, scale: 1.1 }}
      className={`text-gray-500 transition-all duration-300 ${color}`}
    >
      <i className={`fab fa-${name} text-2xl`}></i>
    </motion.a>
            ))}
          </div>
        </motion.div>

        {/* Legal Column */}
        <motion.div {...fadeUp(0.1)}>
          <h3 className="text-lg font-semibold tracking-wide mb-6 text-gray-900">
            TERMS & POLICIES
          </h3>
          <ul className="space-y-3 text-sm">
            {[
              ["Terms of Service", "/terms"],
              ["Shipping Policy", "/shipping-policy"],
              ["Return & Refund Policy", "/returns"],
              ["Privacy Policy", "/privacy"],
            ].map(([label, link]) => (
              <li key={label}>
                <a
                  href={link}
                  className="hover:text-black transition-all duration-300 hover:pl-1"
                >
                  {label}
                </a>
              </li>
            ))}
          </ul>
        </motion.div>

        {/* Explore Column */}
        <motion.div {...fadeUp(0.2)}>
          <h3 className="text-lg font-semibold tracking-wide mb-6 text-gray-900">
            THE OAKRESS
          </h3>
          <ul className="space-y-3 text-sm">
            <li>
              <a href="/about" className="hover:text-black hover:pl-1 transition-all duration-300">
                The Legacy
              </a>
            </li>
            <li>
              <a href="/skirt-guide" className="hover:text-black hover:pl-1 transition-all duration-300">
                Skirt Size
              </a>
            </li>
            <li>
              <a href="/size-guide" className="hover:text-black hover:pl-1 transition-all duration-300">
                Size Guide
              </a>
            </li>
          </ul>
        </motion.div>

        {/* Collections Column */}
        <motion.div {...fadeUp(0.3)}>
          <h3 className="text-lg font-semibold tracking-wide mb-6 text-gray-900">
            COLLECTIONS
          </h3>
          <ul className="space-y-3 text-sm">
            <li className="text-gray-600 hover:text-black transition duration-300">
              2025 – Her Garden of Graxe
            </li>
          </ul>
        </motion.div>
      </div>

      {/* Footer Bottom */}
      <motion.div
        {...fadeUp(0.4)}
        className="text-center text-xs sm:text-sm text-gray-500 mt-16 tracking-wide"
      >
        © {new Date().getFullYear()} OAKRESS. Crafted with Grace & Elegance.
      </motion.div>
    </footer>
  );
};

export default Footer;
