import { Helmet } from "react-helmet"; 
import { Link } from "react-router-dom";
import { FaTruck, FaGlobeAfrica, FaBan, FaUndoAlt, FaEnvelope } from "react-icons/fa";

export default function ShippingPolicy() {
  return (
    <div className="w-full bg-white px-6 py-12 text-gray-800 leading-relaxed">
      <Helmet>
        <title>Shipping Policy | Oakress</title>
        <meta
          name="description"
          content="Oakress UK shipping policy. Learn about delivery timelines, processing times, international shipping rules, customs duties, order cancellations, and return shipping responsibilities."
        />
        <meta
          name="keywords"
          content="Oakress UK shipping, delivery policy UK, international shipping, UK consumer rights, processing time, customs duties"
        />
        <link rel="canonical" href="https://oakress.com/shipping-policy" />
      </Helmet>

      {/* Breadcrumb Navigation */}
      <nav className="text-sm text-gray-500 mb-8 max-w-3xl mx-auto">
        <Link to="/" className="hover:text-purple-700">Home</Link> <span className="mx-2">/</span>
        <span className="text-gray-700">Shipping Policy</span>
      </nav>

      {/* Page Title */}
      <h1 className="text-4xl font-bold text-center mb-10 text-gray-900">
        Shipping Policy
      </h1>

      <div className="max-w-3xl mx-auto space-y-10">

        {/* UK Domestic Shipping */}
        <section className="pb-6 border-b border-gray-200">
          <h2 className="text-2xl font-semibold mb-3 flex items-center gap-2">
            <FaTruck className="text-purple-600" /> Domestic Shipping (United Kingdom)
          </h2>
          <p>
            Oakress operates from the United Kingdom, and all items are carefully made to order.
            Please allow a standard processing time of <strong>7–10 business days</strong> before dispatch.
          </p>
          <p className="mt-2">
            Once your order has been shipped, you will receive a <strong>tracking number</strong> via email.
            Delivery time within the UK typically ranges from <strong>2–4 business days</strong> after dispatch.
          </p>
        </section>

        {/* International Shipping */}
        <section className="pb-6 border-b border-gray-200">
          <h2 className="text-2xl font-semibold mb-3 flex items-center gap-2">
            <FaGlobeAfrica className="text-purple-600" /> International Shipping
          </h2>
          <p>
            We ship worldwide from the United Kingdom. Delivery timelines vary by destination and
            typically take <strong>10–20 business days</strong>. Transit delays caused by customs
            inspections or local postal services are outside our control.
          </p>
          <p className="mt-2">
            <strong>Customs, Duties & Taxes:</strong> For orders shipped outside the UK, any import
            duties, VAT, or customs charges applied by the destination country are the
            <strong> customer&apos;s responsibility</strong>. These fees are not included in product or
            shipping costs as required under international customs regulations.
          </p>
        </section>

        {/* Order Cancellations (UK Law Compliant) */}
        <section className="pb-6 border-b border-gray-200">
          <h2 className="text-2xl font-semibold mb-3 flex items-center gap-2">
            <FaBan className="text-purple-600" /> Order Cancellations
          </h2>
          <p>
            Because Oakress pieces are <strong>handmade to order</strong>, cancellation is only
            permitted within <strong>12 hours</strong> of placing your order.
          </p>
          <p className="mt-2">
            Under the UK Consumer Contracts Regulations, businesses are allowed to exempt
            <strong> made-to-order or bespoke items</strong> from the standard 14-day cancellation
            period. Once production begins, the order cannot be cancelled or amended.
          </p>
        </section>

        {/* Return Shipping */}
        <section className="pb-6 border-b border-gray-200">
          <h2 className="text-2xl font-semibold mb-3 flex items-center gap-2">
            <FaUndoAlt className="text-purple-600" /> Return Shipping
          </h2>
          <p>
            If a return is approved, the customer is responsible for the cost of return shipping,
            in line with UK consumer legislation for made-to-order goods.
          </p>
          <p className="mt-2">
            We strongly recommend using a <strong>tracked and insured courier service</strong>, as
            Oakress cannot be held liable for lost or undelivered return parcels.
          </p>
        </section>

        {/* Contact */}
        <section>
          <h2 className="text-2xl font-semibold mb-3 flex items-center gap-2">
            <FaEnvelope className="text-purple-600" /> Need Help?
          </h2>
          <p>
            For questions about your order or shipping, please contact our Client Care Team at{" "}
            <a href="mailto:oakress@yahoo.com" className="text-purple-600 underline hover:text-purple-800">
              oakress@yahoo.com
            </a>.
          </p>
        </section>

        {/* Policy Signature */}
        <div className="pt-6 text-center">
          <p className="font-medium">With appreciation,</p>
          <p className="font-semibold tracking-wide">Oakress</p>
          <p className="italic text-gray-600">Crafted for the woman of quiet luxury.</p>
        </div>
      </div>
    </div>
  );
}
