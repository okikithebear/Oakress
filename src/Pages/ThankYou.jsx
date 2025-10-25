import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { CheckCircle2 } from "lucide-react";
import { useEffect, useState } from "react";
import Confetti from "react-confetti";
import { jsPDF } from "jspdf";
import autoTable from "jspdf-autotable";
import { useCart } from "../Context/CartContext";

const ThankYou = () => {
  const navigate = useNavigate();
  const { cart, calculateTotal } = useCart();
  const [dimensions, setDimensions] = useState({ width: window.innerWidth, height: window.innerHeight });
  const [countdown, setCountdown] = useState(15);
  const [showConfetti, setShowConfetti] = useState(true);

  // Update window dimensions for Confetti
  useEffect(() => {
    const handleResize = () => setDimensions({ width: window.innerWidth, height: window.innerHeight });
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Countdown redirect
  useEffect(() => {
    if (countdown <= 0) {
      navigate("/collections");
      return;
    }
    const timer = setTimeout(() => setCountdown(countdown - 1), 1000);
    return () => clearTimeout(timer);
  }, [countdown, navigate]);

  // Stop confetti after 4 seconds
  useEffect(() => {
    const confettiTimer = setTimeout(() => setShowConfetti(false), 4000);
    return () => clearTimeout(confettiTimer);
  }, []);

  // Generate downloadable invoice PDF
  const generateInvoice = () => {
    if (!cart || cart.length === 0) return;

    const doc = new jsPDF();
    doc.setFontSize(18);
    doc.text("Oakress - Order Invoice", 14, 20);
    doc.setFontSize(12);
    doc.text(`Date: ${new Date().toLocaleDateString()}`, 14, 30);
    doc.text(`Order Total: ₦${calculateTotal().toLocaleString()}`, 14, 37);

    const tableColumn = ["Item", "Qty", "Price", "Subtotal"];
    const tableRows = cart.map(item => [
      item.name,
      item.quantity,
      `₦${item.price.toLocaleString()}`,
      `₦${(item.price * item.quantity).toLocaleString()}`
    ]);

    autoTable(doc, {
      startY: 45,
      head: [tableColumn],
      body: tableRows,
      theme: "grid",
      headStyles: { fillColor: [255, 204, 0] },
      styles: { cellPadding: 3, fontSize: 11 },
    });

    doc.save(`Oakress_Invoice_${new Date().getTime()}.pdf`);
  };

  return (
    <section className="w-full min-h-screen flex flex-col items-center justify-center bg-yellow-50 px-6 py-20 relative overflow-hidden">
      {showConfetti && (
        <Confetti
          width={dimensions.width}
          height={dimensions.height}
          numberOfPieces={150}
          gravity={0.3}
          friction={0.98}
          recycle={false}
        />
      )}

      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.6 }}
        className="bg-white shadow-2xl rounded-3xl p-10 max-w-lg w-full text-center relative z-10"
      >
        <CheckCircle2 className="mx-auto h-20 w-20 text-green-600 mb-6" />
        <h1 className="text-3xl md:text-4xl font-bold mb-4 text-yellow-800">
          Thank You for Your Order!
        </h1>
        <p className="text-gray-700 mb-6 text-lg leading-relaxed">
          Your order has been successfully placed. We are preparing it and will notify you once it’s on the way.
        </p>

        <div className="flex flex-col sm:flex-row justify-center gap-4">
          <Link
            to="/collections"
            className="inline-block px-6 py-3 bg-yellow-700 text-white font-semibold rounded-xl hover:bg-yellow-800 transition-colors uppercase tracking-wider shadow-md"
          >
            Browse Collections
          </Link>

          <button
            onClick={generateInvoice}
            className="inline-block px-6 py-3 bg-gray-900 text-white font-semibold rounded-xl hover:bg-gray-800 transition-colors uppercase tracking-wider shadow-md"
          >
            Download Invoice
          </button>
        </div>

        <p className="text-gray-500 text-sm mt-4">
          Redirecting to collections in <span className="font-semibold">{countdown}</span> seconds...
        </p>

        <p className="text-gray-500 text-sm mt-6">
          Want to check your order details? Visit your{" "}
          <Link to="/account" className="underline hover:no-underline">
            account page
          </Link>
          .
        </p>
      </motion.div>
    </section>
  );
};

export default ThankYou;
