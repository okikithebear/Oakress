import { Link, useNavigate, useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import { CheckCircle2 } from "lucide-react";
import { useEffect, useState } from "react";
import Confetti from "react-confetti";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";


const ThankYou = () => {
  const navigate = useNavigate();
  const { state } = useLocation();
  const { customer = {}, cart = [], deliveryFee = 0, total = 0 } = state || {}; // ✅ use location.state

  const [dimensions, setDimensions] = useState({
    width: window.innerWidth,
    height: window.innerHeight,
  });
  const [countdown, setCountdown] = useState(15);
  const [showConfetti, setShowConfetti] = useState(true);

 // Format currency in Pounds (£)
const formatCurrency = (number) =>
  new Intl.NumberFormat("en-GB", {
    style: "currency",
    currency: "GBP",
    minimumFractionDigits: 2,
  }).format(number);

  // Update window dimensions for Confetti
  useEffect(() => {
    const handleResize = () =>
      setDimensions({ width: window.innerWidth, height: window.innerHeight });
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Countdown redirect
  useEffect(() => {
    if (countdown <= 0) {
      navigate("/collections-page");
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

    const doc = new jsPDF({ unit: "pt", format: "a4" });
    const invoiceId = "INV-" + Date.now();
    const date = new Date().toLocaleDateString();

    // HEADER
    doc.setFillColor(54, 33, 89);
    doc.rect(0, 0, 595, 50, "F");
    doc.setFontSize(20);
    doc.setTextColor(255, 255, 255);
    doc.text("Oakress", 297.5, 30, { align: "center" });
    doc.setFontSize(14);
    doc.text("Order Invoice", 297.5, 45, { align: "center" });

    // BODY
    doc.setFontSize(12);
    doc.setTextColor(0, 0, 0);
    doc.text(`Invoice No: ${invoiceId}`, 40, 80);
    doc.text(`Date: ${date}`, 40, 95);
    doc.text(`Bill To: ${customer.name || "Customer"}`, 350, 80);

    // TABLE
    const tableColumn = ["Item", "Quantity", "Unit Price", "Subtotal"];
    const tableRows = cart.map((item) => [
      item.name,
      String(item.quantity),
      formatCurrency(item.price),
      formatCurrency(item.price * item.quantity),
    ]);

 // Attach autoTable
autoTable(doc, {
  startY: 110,
  head: [tableColumn],
  body: tableRows,
  theme: "grid",
  headStyles: { fillColor: [54, 33, 89], textColor: 255 },
  styles: { font: "helvetica", fontSize: 10 },
  margin: { left: 40, right: 40 }
});

    // TOTALS
const subtotal = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);
const grandTotal = total; // use passed total

    const finalY = doc.lastAutoTable.finalY + 20 || 150;

    doc.text(`Subtotal: ${formatCurrency(subtotal)}`, 400, finalY);
    doc.text(`Delivery: ${formatCurrency(deliveryFee)}`, 400, finalY + 15);
    doc.setFont(undefined, "bold");
    doc.text(`Grand Total: ${formatCurrency(grandTotal)}`, 400, finalY + 35);

    // FOOTER
    doc.setFont(undefined, "normal");
    doc.setFontSize(10);
    doc.text("Thank you for your purchase!", 297.5, 780, { align: "center" });
    doc.text("Oakress - Crafted with care.", 297.5, 795, { align: "center" });

    doc.save(`Oakress_Invoice_${invoiceId}.pdf`);
  };

  if (!cart || cart.length === 0)
    return (
      <div className="text-center py-20">
        <h2 className="text-2xl font-semibold">No order data found</h2>
        <Link
          to="/collections-page"
          className="mt-4 inline-block px-6 py-3 bg-yellow-700 text-white rounded-xl hover:bg-yellow-800 transition"
        >
          Browse Collections
        </Link>
      </div>
    );

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
            to="/collections-page"
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
      </motion.div>
    </section>
  );
};

export default ThankYou;
