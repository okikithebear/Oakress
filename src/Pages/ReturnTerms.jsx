import { Helmet } from "react-helmet";
import { Link } from "react-router-dom";
import {
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
          content="Read Oakress UK-compliant return, refund and exchange policy for ready-to-wear and custom clothing orders."
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
            Thank you for choosing Oakress. This policy outlines your rights under UK consumer law when purchasing Ready-to-Wear (RTW) pieces and custom clothing from us online. 
            All orders are crafted with care. Please review our <span className="font-medium">Size Guide</span> and contact Client Care before purchasing if you need assistance.
          </p>
        </section>

        {/* 14-Day Cooling-Off (RTW) */}
        <section className="pb-6 border-b border-gray-200">
          <h2 className="text-2xl font-semibold mb-3 flex items-center gap-2">
            <FaUndoAlt className="text-purple-600" /> 
            14-Day Right to Cancel (Ready-to-Wear)
          </h2>
          <p>
            Under the UK Consumer Contracts Regulations 2013, customers have the right to cancel any
            <strong> Ready-to-Wear (RTW)</strong> online purchase within <strong>14 days</strong> of receiving the item — 
            no reason required.
          </p>
          <p className="mt-3">
            You then have an additional <strong>14 days</strong> to return the item.
          </p>

          <p className="mt-3">Items returned under the cooling-off period must be:</p>
          <ul className="list-disc ml-6 mt-2 space-y-1">
            <li>Unused and in resalable condition</li>
            <li>Unworn and unwashed</li>
            <li>Free from makeup, perfume and damage</li>
            <li>Returned with original tags and packaging</li>
          </ul>

          <p className="mt-3">
            Once we receive the returned item (or proof of postage), we will issue a <strong>full refund</strong> within
            14 days, including the original standard delivery cost.
          </p>

          <p className="mt-3 text-sm italic">
            *This statutory right does not apply to custom-made or personalised pieces.*
          </p>
        </section>

        {/* Faulty Items – CRA2015 */}
        <section className="pb-6 border-b border-gray-200">
          <h2 className="text-2xl font-semibold mb-3 flex items-center gap-2">
            <FaInfoCircle className="text-purple-600" /> 
            Faulty or Incorrect Items (Consumer Rights Act 2015)
          </h2>
          <p>
            If your item arrives <strong>faulty, damaged, or not as described</strong>, you are entitled to a
            <strong> full refund within 30 days</strong> of delivery under UK law.
          </p>
          <p className="mt-3">
            After 30 days, and within the first 6 months, you are entitled to a repair or replacement. 
            If neither is possible, a refund will be issued.
          </p>
        </section>

        {/* Exchanges */}
        <section className="pb-6 border-b border-gray-200">
          <h2 className="text-2xl font-semibold mb-3 flex items-center gap-2">
            <FaExchangeAlt className="text-purple-600" /> 
            Exchanges (RTW)
          </h2>
          <p>
            We offer exchanges on our Ready-to-Wear pieces if the item is returned in perfect condition.
            Exchanges are not available for custom or made-to-measure garments unless a fault is confirmed.
          </p>
        </section>

        {/* Custom Orders */}
        <section className="pb-6 border-b border-gray-200">
          <h2 className="text-2xl font-semibold mb-3 flex items-center gap-2">
            <FaRulerCombined className="text-purple-600" /> 
            Custom & Made-to-Measure Orders
          </h2>
          <p>
            Custom garments created using your provided measurements are <strong>not eligible</strong> for cancellations,
            refunds, or exchanges under the 14-day cooling-off period.
          </p>
          <p className="mt-3">
            However, you are fully protected under the Consumer Rights Act 2015 if the garment arrives faulty 
            or not as described.
          </p>
        </section>

        {/* Adjustments */}
        <section className="pb-6 border-b border-gray-200">
          <h2 className="text-2xl font-semibold mb-3 flex items-center gap-2">
            <FaTools className="text-purple-600" /> 
            Alterations & Fit Adjustments
          </h2>
          <p>
            Post-delivery adjustments for sizing or styling preferences are the responsibility of the client.
            Alteration costs and additional shipping fees are covered by the customer.
          </p>
        </section>

        {/* Return Shipping */}
        <section className="pb-6 border-b border-gray-200">
          <h2 className="text-2xl font-semibold mb-3 flex items-center gap-2">
            <FaTruck className="text-purple-600" /> 
            Return Shipping Costs
          </h2>
          <p>
            For change-of-mind RTW returns, customers are responsible for return postage.
            For faulty items, Oakress will cover or reimburse reasonable return postage costs.
          </p>
        </section>

        {/* International Duties */}
        <section className="pb-6 border-b border-gray-200">
          <h2 className="text-2xl font-semibold mb-3 flex items-center gap-2">
            <FaGlobeAfrica className="text-purple-600" /> 
            International Duties & Customs
          </h2>
          <p>
            International returns must have duties and taxes prepaid. 
            Parcels with unpaid customs charges will be declined.
          </p>
        </section>

        {/* Support */}
        <section className="pb-6 border-b border-gray-200">
          <h2 className="text-2xl font-semibold mb-3 flex items-center gap-2">
            <FaHeadset className="text-purple-600" /> 
            Customer Support
          </h2>
          <p>
            For returns, cancellations or faulty item reports, contact{" "}
            <a
              href="mailto:oakress@yahoo.com"
              className="text-purple-600 underline hover:text-purple-800"
            >
              oakress@yahoo.com
            </a>. You will receive a response within 24–48 business hours.
          </p>
        </section>

        {/* Notice */}
        <section>
          <h2 className="text-2xl font-semibold mb-3 flex items-center gap-2">
            <FaInfoCircle className="text-purple-600" /> 
            Policy Notice
          </h2>
          <p>
            This policy aligns with UK Consumer Law, including the Consumer Contracts Regulations 2013 
            and the Consumer Rights Act 2015. Oakress may update this policy when required. 
            This does not affect your statutory rights.
          </p>
        </section>

        {/* Footer */}
        <div className="pt-6 text-center">
          <p className="font-medium">With appreciation,</p>
          <p className="font-semibold tracking-wide">Oakress</p>
          <p className="italic text-gray-600">Crafted for the woman of quiet luxury.</p>
        </div>
      </div>
    </div>
  );
}
