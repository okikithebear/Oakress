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
          content="Learn about Oakress shipping timelines, international delivery, processing time, and customer responsibilities regarding duties and customs."
        />
        <meta
          name="keywords"
          content="Oakress shipping, delivery policy, luxury brand Nigeria, international orders, processing time"
        />
        <link rel="canonical" href="https://oakress.com.ng/shipping-policy" />
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

        {/* Domestic Shipping */}
        <section className="pb-6 border-b border-gray-200">
          <h2 className="text-2xl font-semibold mb-3 flex items-center gap-2">
            <FaTruck className="text-purple-600" /> Domestic Shipping (Nigeria)
          </h2>
          <p>
            All Oakress pieces are made to order with precision and care. Please allow a standard processing time of <strong>7–10 business days</strong> before dispatch. Once shipped, a <strong>tracking number</strong> will be sent to your email.
          </p>
        </section>

        {/* International Shipping */}
        <section className="pb-6 border-b border-gray-200">
          <h2 className="text-2xl font-semibold mb-3 flex items-center gap-2">
            <FaGlobeAfrica className="text-purple-600" /> International Shipping
          </h2>
          <p>
            We ship worldwide. Delivery time depends on your location and typically takes <strong>10–20 business days</strong>. Please note that international orders may experience delays due to <strong>customs clearance</strong>, which is beyond our control.
          </p>
          <p className="mt-2">
            <strong>Customs & Duties:</strong> Import duties, taxes, and charges are <strong>not included</strong> in item prices or shipping costs. These charges are the responsibility of the customer.
          </p>
        </section>

        {/* Order Cancellations */}
        <section className="pb-6 border-b border-gray-200">
          <h2 className="text-2xl font-semibold mb-3 flex items-center gap-2">
            <FaBan className="text-purple-600" /> Order Cancellations
          </h2>
          <p>
            Orders can only be canceled within <strong>12 hours</strong> after purchase. After production begins, cancellations or changes are not permitted as each piece is handcrafted on demand.
          </p>
        </section>

        {/* Return Shipping */}
        <section className="pb-6 border-b border-gray-200">
          <h2 className="text-2xl font-semibold mb-3 flex items-center gap-2">
            <FaUndoAlt className="text-purple-600" /> Return Shipping
          </h2>
          <p>
            Customers are responsible for the cost of return shipping. We recommend using a <strong>tracked courier service</strong> as Oakress is not responsible for lost return shipments.
          </p>
        </section>

        {/* Contact */}
        <section>
          <h2 className="text-2xl font-semibold mb-3 flex items-center gap-2">
            <FaEnvelope className="text-purple-600" /> Need Help?
          </h2>
          <p>
            For order assistance or shipping questions, reach out to our Client Care Team at{" "}
            <a href="mailto:oakress@yahoo.com" className="text-purple-600 underline hover:text-purple-800">
              oakress@yahoo.com
            </a>.
          </p>
        </section>

        {/* Policy Navigation */}
        <div className="pt-6 text-center">
          <p className="font-medium">With appreciation,</p>
          <p className="font-semibold tracking-wide">Oakress</p>
          <p className="italic text-gray-600">Crafted for the woman of quiet luxury.</p>
        </div>
      </div>
    </div>
  );
}
