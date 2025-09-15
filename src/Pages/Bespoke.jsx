"use client";
import { useState } from "react";
import { motion } from "framer-motion";
import { Upload, Calendar, Send } from "lucide-react";
import emailjs from "@emailjs/browser"; // npm i @emailjs/browser

const BespokeOrder = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    eventType: "",
    fabric: "",
    notes: "",
    file: null,
  });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setFormData({
      ...formData,
      [name]: files ? files[0] : value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSuccess(false);

    const templateParams = {
      name: formData.name,
      email: formData.email,
      eventType: formData.eventType,
      fabric: formData.fabric,
      notes: formData.notes,
      fileName: formData.file ? formData.file.name : "No file uploaded",
    };

    emailjs
      .send(
        "your_service_id", // replace with EmailJS service ID
        "your_template_id", // replace with EmailJS template ID
        templateParams,
        "your_public_key" // replace with EmailJS public key
      )
      .then(
        () => {
          setSuccess(true);
          setFormData({
            name: "",
            email: "",
            eventType: "",
            fabric: "",
            notes: "",
            file: null,
          });
        },
        () => setError("Failed to send request. Please try again.")
      )
      .finally(() => setLoading(false));
  };

  return (
    <section className="relative py-24 px-6 lg:px-20 bg-gradient-to-b from-white to-neutral-50 text-gray-900">
      {/* Header */}
      <motion.div
        className="max-w-4xl mx-auto text-center"
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <p className="uppercase tracking-widest text-sm font-medium text-gray-500">
          Made to Order
        </p>
        <h2 className="mt-4 text-4xl md:text-5xl font-bold tracking-tight">
          Bespoke Dresses <span className="text-indigo-600">Made for You</span>
        </h2>
        <p className="mt-6 text-lg md:text-xl text-gray-600 max-w-2xl mx-auto">
          From sketch to final stitch, our atelier brings your vision to life.
          Submit your made-to-order request and begin your journey.
        </p>
      </motion.div>

      {/* Form */}
      <motion.form
        onSubmit={handleSubmit}
        className="mt-16 max-w-3xl mx-auto bg-white p-8 rounded-2xl shadow-xl border border-neutral-200"
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, duration: 0.8 }}
      >
        {/* Name + Email */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium mb-2">Full Name</label>
            <input
              type="text"
              name="name"
              required
              value={formData.name}
              onChange={handleChange}
              className="w-full px-4 py-3 rounded-lg bg-neutral-100 text-gray-900 focus:ring-2 focus:ring-indigo-500 outline-none"
              placeholder="Enter your name"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Email</label>
            <input
              type="email"
              name="email"
              required
              value={formData.email}
              onChange={handleChange}
              className="w-full px-4 py-3 rounded-lg bg-neutral-100 text-gray-900 focus:ring-2 focus:ring-indigo-500 outline-none"
              placeholder="Enter your email"
            />
          </div>
        </div>

        {/* Event Type */}
        <div className="mt-6">
          <label className="block text-sm font-medium mb-2">Occasion</label>
          <select
            name="eventType"
            value={formData.eventType}
            onChange={handleChange}
            required
            className="w-full px-4 py-3 rounded-lg bg-neutral-100 text-gray-900 focus:ring-2 focus:ring-indigo-500 outline-none"
          >
            <option value="">Select occasion</option>
            <option>Wedding</option>
            <option>Evening</option>
            <option>Cocktail</option>
            <option>Runway / Fashion Show</option>
            <option>Other</option>
          </select>
        </div>

        {/* Fabric Choice */}
        <div className="mt-6">
          <label className="block text-sm font-medium mb-2">
            Preferred Fabric
          </label>
          <select
            name="fabric"
            value={formData.fabric}
            onChange={handleChange}
            className="w-full px-4 py-3 rounded-lg bg-neutral-100 text-gray-900 focus:ring-2 focus:ring-indigo-500 outline-none"
          >
            <option value="">Choose fabric</option>
            <option>Silk</option>
            <option>Satin</option>
            <option>Velvet</option>
            <option>Chiffon</option>
            <option>Other</option>
          </select>
        </div>

        {/* Upload Inspiration */}
        <div className="mt-6">
          <label className="block text-sm font-medium mb-2">
            Upload Inspiration Image
          </label>
          <div className="flex items-center space-x-4">
            <label className="flex items-center space-x-2 px-4 py-3 rounded-lg bg-neutral-100 cursor-pointer hover:bg-neutral-200 transition">
              <Upload className="w-5 h-5 text-indigo-500" />
              <span>Upload file</span>
              <input
                type="file"
                name="file"
                accept="image/*"
                onChange={handleChange}
                className="hidden"
              />
            </label>
            {formData.file && (
              <span className="text-sm text-gray-500">
                {formData.file.name}
              </span>
            )}
          </div>
        </div>

        {/* Notes */}
        <div className="mt-6">
          <label className="block text-sm font-medium mb-2">
            Additional Notes
          </label>
          <textarea
            name="notes"
            value={formData.notes}
            onChange={handleChange}
            rows="4"
            className="w-full px-4 py-3 rounded-lg bg-neutral-100 text-gray-900 focus:ring-2 focus:ring-indigo-500 outline-none"
            placeholder="Tell us about your ideas, measurements, or special requests..."
          />
        </div>

        {/* CTA */}
        <div className="mt-8 flex justify-center">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            type="submit"
            disabled={loading}
            className="flex items-center px-8 py-4 bg-indigo-600 text-white rounded-full font-semibold shadow-lg hover:bg-indigo-500 transition disabled:opacity-50"
          >
            <Send className="w-5 h-5 mr-2" />
            {loading ? "Sending..." : "Submit Request"}
          </motion.button>
        </div>

        {/* Feedback */}
        {success && (
          <p className="mt-6 text-green-600 text-center">
            ✅ Your request has been sent successfully!
          </p>
        )}
        {error && <p className="mt-6 text-red-600 text-center">⚠️ {error}</p>}
      </motion.form>

      {/* Extra: Consultation CTA */}
      <div className="max-w-4xl mx-auto text-center mt-16">
        <p className="text-gray-600 mb-4">Prefer a one-on-one consultation?</p>
        <motion.a
          href="https://wa.me/234XXXXXXXXXX" // replace with your WhatsApp link
          target="_blank"
          rel="noopener noreferrer"
          whileHover={{ scale: 1.05 }}
          className="inline-flex items-center px-6 py-3 bg-indigo-600 text-white rounded-full font-medium shadow-lg hover:bg-indigo-500"
        >
          <Calendar className="w-5 h-5 mr-2" /> Book a Consultation
        </motion.a>
      </div>
    </section>
  );
};

export default BespokeOrder;
