"use client";
import { useForm } from "react-hook-form";
import { motion } from "framer-motion";
import { Mail, Phone, MapPin } from "lucide-react";
import { useState } from "react";
import emailjs from "@emailjs/browser";

const Contact = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm();

  const [status, setStatus] = useState(null);

  const onSubmit = async (data) => {
    try {
      // Replace with your own EmailJS keys
      const result = await emailjs.send(
        "YOUR_SERVICE_ID",
        "YOUR_TEMPLATE_ID",
        {
          name: data.name,
          email: data.email,
          subject: data.subject,
          message: data.message,
        },
        "YOUR_PUBLIC_KEY"
      );

      console.log("EmailJS result:", result.text);
      setStatus("success");
      reset();
    } catch (error) {
      console.error("EmailJS error:", error);
      setStatus("error");
    }
  };

  return (
    <section className="relative px-6 sm:px-12 lg:px-20 py-16 bg-gradient-to-b from-white to-gray-50">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        {/* Left Section */}
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          className="space-y-6"
        >
          <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight text-gray-900">
            Let’s Create Something Beautiful Together
          </h1>
          <p className="text-lg text-gray-600 leading-relaxed">
            Have a bespoke request, collaboration idea, or just want to say hi?
            Drop us a message—we’d love to connect with you.
          </p>

          <div className="space-y-4 text-gray-700">
            <div className="flex items-center gap-3">
              <Mail className="w-5 h-5 text-black" />
              <span>support@oakdresses.com</span>
            </div>
            <div className="flex items-center gap-3">
              <Phone className="w-5 h-5 text-black" />
              <span>+234 123 456 789</span>
            </div>
            <div className="flex items-center gap-3">
              <MapPin className="w-5 h-5 text-black" />
              <span>Lagos, Nigeria</span>
            </div>
          </div>
        </motion.div>

        {/* Right Section - Form */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="bg-white shadow-lg rounded-2xl p-8 border border-gray-100"
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
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
              <div>
                <input
                  {...register("name", { required: "Name is required" })}
                  placeholder="Your Name"
                  className="w-full p-4 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-black"
                />
                {errors.name && (
                  <p className="text-red-500 text-sm">{errors.name.message}</p>
                )}
              </div>

              <div>
                <input
                  type="email"
                  {...register("email", { required: "Email is required" })}
                  placeholder="Your Email"
                  className="w-full p-4 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-black"
                />
                {errors.email && (
                  <p className="text-red-500 text-sm">{errors.email.message}</p>
                )}
              </div>

              <div>
                <input
                  {...register("subject", { required: "Subject is required" })}
                  placeholder="Subject"
                  className="w-full p-4 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-black"
                />
                {errors.subject && (
                  <p className="text-red-500 text-sm">
                    {errors.subject.message}
                  </p>
                )}
              </div>

              <div>
                <textarea
                  {...register("message", {
                    required: "Message cannot be empty",
                  })}
                  placeholder="Your Message"
                  rows={5}
                  className="w-full p-4 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-black resize-none"
                />
                {errors.message && (
                  <p className="text-red-500 text-sm">
                    {errors.message.message}
                  </p>
                )}
              </div>

              <motion.button
                type="submit"
                disabled={isSubmitting}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="w-full py-4 bg-black text-white font-semibold rounded-xl shadow-md hover:bg-gray-800 transition"
              >
                {isSubmitting ? "Sending..." : "Send Message"}
              </motion.button>
            </form>
          )}
        </motion.div>
      </div>
    </section>
  );
};

export default Contact;
