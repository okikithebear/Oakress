import { Helmet } from "react-helmet";
import { Link } from "react-router-dom";
import {
  FaTimesCircle,
  FaUndoAlt,
  FaExchangeAlt,
  FaRulerCombined,
  FaTools,
  FaTruck,
  FaGlobeAfrica,
  FaHeadset,
  FaInfoCircle,
} from "react-icons/fa";

export default function ReturnRefundPolicy() {
  return (
    <div className="w-full bg-white px-6 py-12 text-gray-800 leading-relaxed">
      <Helmet>
        <title>Return & Refund Policy | Oakress</title>
        <meta
          name="description"
          content="Review Oakress return and refund policy for made-to-order garments. Learn about cancellations, refunds, store credit, and custom order terms."
        />
        <link rel="canonical" href="https://oakress.com.ng/return-policy" />
      </Helmet>

      {/* Breadcrumb */}
      <nav className="text-sm text-gray-500 mb-8 max-w-3xl mx-auto">
        <Link to="/" className="hover:text-purple-700">
          Home
        </Link>{" "}
        <span className="mx-2">/</span>
        <span className="text-gray-700">Return & Refund Policy</span>
      </nav>

      {/* Title */}
      <h1 className="text-4xl font-bold text-center mb-10 text-gray-900">
        Return & Refund Policy
      </h1>

      <div className="max-w-3xl mx-auto space-y-10">
        {/* Intro */}
        <section className="pb-6 border-b border-gray-200">
          <p>
            Thank you for choosing Oakress. Each piece is crafted with care and precision. Before placing your order, kindly review our{" "}
            <span className="font-medium">Size Guide</span>, as all orders are considered final once placed. For any sizing assistance, our Client Care team is available prior to purchase.
          </p>
        </section>

        {/* Cancellations */}
        <section className="pb-6 border-b border-gray-200">
          <h2 className="text-2xl font-semibold mb-3 flex items-center gap-2">
            <FaTimesCircle className="text-purple-600" /> Order Cancellations
          </h2>
          <p>
            Cancellation requests must be submitted within <strong>12 hours</strong> of placing your order and before production begins.
            Once production starts, cancellations will not be accepted.
          </p>
        </section>

        {/* Refunds */}
        <section className="pb-6 border-b border-gray-200">
          <h2 className="text-2xl font-semibold mb-3 flex items-center gap-2">
            <FaUndoAlt className="text-purple-600" /> Refunds
          </h2>
          <p>
            Refunds are granted <strong>only in cases of confirmed studio errors</strong>. Photo or video proof must be provided for review.
          </p>
          <ul className="list-disc ml-6 mt-2 space-y-1">
            <li>No cash refunds.</li>
            <li>Approved refunds are issued as <strong>store credit only</strong>.</li>
          </ul>
          <p className="mt-3">Returned items must be:</p>
          <ul className="list-disc ml-6 mt-2 space-y-1">
            <li>Unworn, unused, and unaltered</li>
            <li>Free from stains, perfume, or damage</li>
            <li>Returned with original tags and packaging</li>
          </ul>
          <p className="mt-3">
            Return requests must be submitted within <strong>7 days</strong> of delivery. Shipping fees are non-refundable.
          </p>
        </section>

        {/* Exchanges */}
        <section className="pb-6 border-b border-gray-200">
          <h2 className="text-2xl font-semibold mb-3 flex items-center gap-2">
            <FaExchangeAlt className="text-purple-600" /> Exchanges
          </h2>
          <p>
            Due to the made-to-order nature of our garments, we do not offer exchanges. Exceptions apply only in the case of verified production errors.
          </p>
        </section>

        {/* Custom Orders */}
        <section className="pb-6 border-b border-gray-200">
          <h2 className="text-2xl font-semibold mb-3 flex items-center gap-2">
            <FaRulerCombined className="text-purple-600" /> Made-to-Measure Orders
          </h2>
          <p>
            Custom pieces made using <strong>your provided measurements</strong> are not eligible for returns or refunds unless a confirmed studio error occurs.
          </p>
        </section>

        {/* Adjustments */}
        <section className="pb-6 border-b border-gray-200">
          <h2 className="text-2xl font-semibold mb-3 flex items-center gap-2">
            <FaTools className="text-purple-600" /> Adjustments
          </h2>
          <p>
            Post-delivery adjustments are the responsibility of the client. Alteration and shipping fees are covered by the customer.
          </p>
        </section>

        {/* Return Shipping */}
        <section className="pb-6 border-b border-gray-200">
          <h2 className="text-2xl font-semibold mb-3 flex items-center gap-2">
            <FaTruck className="text-purple-600" /> Return Shipping
          </h2>
          <p>
            Clients are responsible for return shipping fees. We strongly recommend using tracked shipping services. Oakress is not responsible for lost parcels.
          </p>
        </section>

        {/* Customs */}
        <section className="pb-6 border-b border-gray-200">
          <h2 className="text-2xl font-semibold mb-3 flex items-center gap-2">
            <FaGlobeAfrica className="text-purple-600" /> Duties & Customs
          </h2>
          <p>
            International returns must have duties and taxes prepaid. Parcels with unpaid customs charges will be declined.
          </p>
        </section>

        {/* Support */}
        <section className="pb-6 border-b border-gray-200">
          <h2 className="text-2xl font-semibold mb-3 flex items-center gap-2">
            <FaHeadset className="text-purple-600" /> Client Support
          </h2>
          <p>
            For return or refund requests, contact{" "}
            <a
              href="mailto:oakress@yahoo.com"
              className="text-purple-600 underline hover:text-purple-800"
            >
              oakress@yahoo.com
            </a>
            . Response time: 24–48 business hours.
          </p>
        </section>

        {/* Notice */}
        <section>
          <h2 className="text-2xl font-semibold mb-3 flex items-center gap-2">
            <FaInfoCircle className="text-purple-600" /> Policy Notice
          </h2>
          <p>
            Oakress reserves the right to modify this policy at any time to align with brand standards and service improvements.
          </p>
        </section>

        {/* Footer Note */}
        <div className="pt-6 text-center">
          <p className="font-medium">With appreciation,</p>
          <p className="font-semibold tracking-wide">Oakress</p>
          <p className="italic text-gray-600">Crafted for the woman of quiet luxury.</p>
        </div>

        
      </div>
    </div>
  );
}
