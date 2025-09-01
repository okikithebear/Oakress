import { useId, useState } from "react";
import { ArrowRight, Instagram } from "lucide-react";
import { motion } from "framer-motion";
import beauty1 from "../assets/beauty1.jpg";
import beauty2 from "../assets/beauty1.jpg";
import beauty3 from "../assets/beauty1.jpg";
import beauty4 from "../assets/beauty1.jpg";

export default function Showcase() {
  const [email, setEmail] = useState("");
  const [consent, setConsent] = useState(false);
  const [status, setStatus] = useState("idle");
  const [message, setMessage] = useState("");
  const fieldId = useId();
  const consentId = useId();
  const helperId = useId();
  const honeyId = useId();

  const items = [
    {
      src: beauty1,
      alt: "Sleeveless coral satin mini dress",
      href: "#",
      ig: "#",
    },
    {
      src: beauty2,
      alt: "Hot pink long-sleeve mini dress",
      href: "#",
      ig: "#",
    },
    {
      src: beauty3,
      alt: "Crimson two-piece set at night venue",
      href: "#",
      ig: "#",
    },
    {
      src: beauty4,
      alt: "Plum halter satin dress",
      href: "#",
      ig: "#",
    },
  ];

  const isValidEmail = (val) => /\S+@\S+\.\S+/.test(val);

  async function handleSubscribe(e) {
    e.preventDefault();
    if ((e.currentTarget.elements.namedItem("company")?.value ?? "") !== "")
      return;
    if (!isValidEmail(email)) {
      setStatus("error");
      setMessage("Enter a valid email address.");
      return;
    }
    if (!consent) {
      setStatus("error");
      setMessage("Please agree to receive emails.");
      return;
    }
    try {
      setStatus("submitting");
      setMessage("");
      await new Promise((r) => setTimeout(r, 600));
      setStatus("success");
      setMessage("Thanks! Check your inbox to confirm your subscription.");
      setEmail("");
      setConsent(false);
    } catch {
      setStatus("error");
      setMessage("Something went wrong. Please try again.");
    }
  }

  function onCardKeyDown(e, href) {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      window.location.assign(href);
    }
  }

  return (
    <section className="bg-white py-14 sm:py-16 px-4">
      {/* Heading */}
      <div className="max-w-6xl mx-auto">
        <h2 className="text-center font-semibold tracking-tight text-3xl sm:text-4xl text-gray-900">
          In <span className="font-extrabold">The Oakress</span>
        </h2>
      </div>

      {/* Gallery */}
      <div className="max-w-6xl mx-auto mt-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 px-4">
        {items.map((item, i) => (
          <motion.figure
            key={i}
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.4, delay: i * 0.05 }}
            className="group relative overflow-hidden bg-white shadow-md hover:shadow-xl transition-shadow duration-300 rounded-t-full rounded-b-lg cursor-pointer"
            tabIndex={0}
            role="link"
            aria-label={`Open look: ${item.alt}`}
            onKeyDown={(e) => onCardKeyDown(e, item.href)}
            onClick={() => (window.location.href = item.href)}
          >
            <img
              src={item.src}
              alt={item.alt}
              loading="lazy"
              decoding="async"
              className="h-80 w-full object-cover transition-transform duration-500 group-hover:scale-[1.05]"
            />
            {/* Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
            <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between opacity-0 group-hover:opacity-100 transition-opacity">
              <figcaption className="text-white text-sm font-medium drop-shadow">
                Shop the look
              </figcaption>
              <span className="inline-flex items-center gap-1 text-white/90 text-xs">
                <Instagram className="h-4 w-4" aria-hidden="true" /> View on IG
              </span>
            </div>
          </motion.figure>
        ))}
      </div>

      {/* Newsletter */}
      <div className="max-w-2xl mx-auto mt-10 sm:mt-12 text-center">
        <p className="text-base sm:text-lg text-gray-700">
          Be the first to know about new collections and exclusive offers.
        </p>
        <form onSubmit={handleSubscribe} noValidate className="mt-4">
          <label htmlFor={fieldId} className="sr-only">
            Email address
          </label>
          <div className="flex items-stretch rounded-full border border-gray-300 bg-white shadow-sm focus-within:ring-2 focus-within:ring-gray-900 overflow-hidden">
            <input
              id={fieldId}
              type="email"
              name="email"
              autoComplete="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email"
              aria-describedby={helperId}
              className="flex-1 px-5 py-3 text-gray-900 placeholder:text-gray-400 outline-none"
              required
              inputMode="email"
            />
            <button
              type="submit"
              disabled={status === "submitting"}
              className="px-4 sm:px-5 py-3 bg-gray-900 text-white hover:bg-gray-800 disabled:opacity-60 disabled:cursor-not-allowed transition-colors"
              aria-label="Subscribe"
            >
              <ArrowRight className="h-5 w-5" />
            </button>
          </div>

          <div className="mt-3 flex items-start gap-2 text-left">
            <input
              id={consentId}
              type="checkbox"
              checked={consent}
              onChange={(e) => setConsent(e.target.checked)}
              className="mt-1 h-4 w-4 rounded border-gray-300 text-gray-900 focus:ring-gray-900"
              required
            />
            <label htmlFor={consentId} className="text-sm text-gray-600">
              I agree to receive emails from RÍRÁN and understand I can
              unsubscribe anytime. Read our{" "}
              <a
                href="/privacy"
                className="underline underline-offset-2 hover:no-underline"
              >
                Privacy Policy
              </a>
              .
            </label>
          </div>

          <div className="hidden" aria-hidden="true">
            <label htmlFor={honeyId}>Company</label>
            <input
              id={honeyId}
              name="company"
              type="text"
              autoComplete="organization"
              tabIndex={-1}
            />
          </div>

          <p
            id={helperId}
            role="status"
            aria-live="polite"
            className={`mt-2 text-sm ${
              status === "error"
                ? "text-red-600"
                : status === "success"
                ? "text-green-700"
                : "text-gray-500"
            }`}
          >
            {status === "idle" &&
              "We use double opt-in. A confirmation email will be sent."}
            {status === "submitting" && "Submitting…"}
            {status === "error" && message}
            {status === "success" && message}
          </p>
        </form>
      </div>
    </section>
  );
}
