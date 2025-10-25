"use client";
import { useForm } from "react-hook-form";
import { motion } from "framer-motion";
import { Mail, Phone, MapPin, User, MessageSquare, Send } from "lucide-react";
import { useState, useEffect, useRef } from "react";
import emailjs from "@emailjs/browser";

const Contact = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
    watch,
  } = useForm();

  const [status, setStatus] = useState(null);
  const mapRef = useRef(null);

  const onSubmit = async (data) => {
    try {
      // Sending email using EmailJS
      await emailjs.send(
        "YOUR_SERVICE_ID",      // replace with your EmailJS service ID
        "YOUR_TEMPLATE_ID",     // replace with your EmailJS template ID
        {
          from_name: data.name,
          from_email: data.email,
          subject: data.subject,
          message: data.message,
        },
        "YOUR_PUBLIC_KEY"       // replace with your EmailJS public key
      );
      setStatus("success");
      reset();
    } catch (error) {
      console.error("Email sending failed:", error);
      setStatus("error");
    }
  };

  // Lazy-load Google Map only when in view
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && mapRef.current && !mapRef.current.innerHTML) {
          mapRef.current.innerHTML = `
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d243646.3072886638!2d-0.3817847!3d51.5287352!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x48761b3334a89e29%3A0xbee04c875f52e47d!2sLondon%2C%20UK!5e0!3m2!1sen!2suk!4v1696268000000!5m2!1sen!2suk"
              width="100%"
              height="100%"
              style="border:0; border-radius: 1rem;"
              loading="lazy"
              allowfullscreen
              referrerpolicy="no-referrer-when-downgrade"
            ></iframe>
          `;
        }
      },
      { threshold: 0.3 }
    );
    if (mapRef.current) observer.observe(mapRef.current);
    return () => observer.disconnect();
  }, []);

  const inputFields = [
    { id: "name", label: "Your Name", icon: <User /> },
    { id: "email", label: "Your Email", type: "email", icon: <Mail /> },
    { id: "subject", label: "Subject", icon: <MessageSquare /> },
  ];

  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-white via-gray-50 to-indigo-50 py-20 px-6 sm:px-12 lg:px-20">
      <div className="absolute top-0 left-0 w-96 h-96 bg-indigo-100 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-pulse -z-10"></div>
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-purple-100 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-pulse delay-700 -z-10"></div>

      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center relative z-10">
        {/* Left Section */}
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="space-y-6"
        >
          <h1 className="text-4xl sm:text-5xl font-extrabold text-gray-900 leading-tight">
            Let’s Create Something Beautiful Together
          </h1>
          <p className="text-lg text-gray-600 max-w-md">
            Have a bespoke request, collaboration idea, or just want to say hi?
            Drop us a message — we’d love to connect with you.
          </p>

          <div className="space-y-4 text-gray-700">
            <div className="flex items-center gap-3">
              <Mail className="w-5 h-5 text-indigo-600" />
              <a href="mailto:support@oakdresses.com" className="hover:underline">
                support@oakdresses.com
              </a>
            </div>
            <div className="flex items-center gap-3">
              <Phone className="w-5 h-5 text-indigo-600" />
              <a href="tel:+447575839134" className="hover:underline">
                +44 757 583 9134
              </a>
            </div>
            <div className="flex items-center gap-3">
              <MapPin className="w-5 h-5 text-indigo-600" />
              <span>United Kingdom</span>
            </div>
          </div>
        </motion.div>

        {/* Right Section - Form */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="bg-white shadow-xl rounded-2xl p-8 border border-gray-100 backdrop-blur-md"
        >
          {status === "success" ? (
            <div className="text-green-600 font-semibold text-center py-10 text-lg">
              ✅ Message sent successfully! We’ll get back to you soon.
            </div>
          ) : status === "error" ? (
            <div className="text-red-600 font-semibold text-center py-10 text-lg">
              ❌ Something went wrong. Please try again.
            </div>
          ) : (
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              {inputFields.map(({ id, label, type = "text", icon }) => {
                const value = watch(id);
                return (
                  <div key={id} className="relative">
                    <div className="absolute left-4 top-4 text-gray-400">{icon}</div>
                    <input
                      type={type}
                      id={id}
                      {...register(id, { required: `${label} is required` })}
                      placeholder=" "
                      className={`peer w-full pl-12 p-4 border ${
                        errors[id] ? "border-red-500" : "border-gray-300"
                      } rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 placeholder-transparent`}
                    />
                    <label
                      htmlFor={id}
                      className={`absolute left-12 text-gray-500 text-sm transition-all duration-200
                        ${value ? "-translate-y-4 text-indigo-600 text-sm" : "top-4 text-gray-400 text-base"}
                        peer-focus:-translate-y-4 peer-focus:text-indigo-600 peer-focus:text-sm bg-white px-1`}
                    >
                      {label}
                    </label>
                    {errors[id] && (
                      <p className="text-red-500 text-sm mt-1">{errors[id].message}</p>
                    )}
                  </div>
                );
              })}

              {/* Message Field */}
              <div className="relative">
                <div className="absolute left-4 top-4 text-gray-400">
                  <MessageSquare />
                </div>
                <textarea
                  {...register("message", { required: "Message cannot be empty" })}
                  id="message"
                  placeholder=" "
                  rows={5}
                  className={`peer w-full pl-12 p-4 border ${
                    errors.message ? "border-red-500" : "border-gray-300"
                  } rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 resize-none placeholder-transparent`}
                />
                <label
                  htmlFor="message"
                  className={`absolute left-12 text-gray-500 text-sm transition-all duration-200
                    ${watch("message") ? "-translate-y-4 text-indigo-600 text-sm" : "top-4 text-gray-400 text-base"}
                    peer-focus:-translate-y-4 peer-focus:text-indigo-600 peer-focus:text-sm bg-white px-1`}
                >
                  Your Message
                </label>
                {errors.message && (
                  <p className="text-red-500 text-sm mt-1">{errors.message.message}</p>
                )}
              </div>

              <motion.button
                type="submit"
                disabled={isSubmitting}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="w-full flex justify-center items-center gap-2 py-4 bg-indigo-600 text-white font-semibold rounded-xl shadow-md hover:bg-indigo-500 transition disabled:opacity-50"
              >
                {isSubmitting ? (
                  "Sending..."
                ) : (
                  <>
                    <Send className="w-4 h-4" /> Send Message
                  </>
                )}
              </motion.button>
            </form>
          )}
        </motion.div>
      </div>

      {/* Lazy-loaded Map Section */}
      <div
        ref={mapRef}
        className="mt-20 w-full h-80 rounded-2xl overflow-hidden shadow-lg"
      ></div>
    </section>
  );
};

export default Contact;
