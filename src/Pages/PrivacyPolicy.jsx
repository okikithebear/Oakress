import { Helmet } from "react-helmet";
import { Link } from "react-router-dom";

export default function PrivacyPolicy() {
  return (
    <div className="w-full bg-white px-6 sm:px-8 md:px-16 py-12 text-gray-800 leading-relaxed">
      <Helmet>
        <title>Privacy Policy | Oakress</title>
        <meta
          name="description"
          content="Oakress values your privacy. Read how we collect, use, and protect your personal data in accordance with GDPR and Nigeria Data Protection Regulation (NDPR)."
        />
        <meta
          name="keywords"
          content="Oakress Privacy Policy, data protection, NDPR, GDPR compliance, customer data, secure checkout"
        />
        <link rel="canonical" href="https://oakress.com.ng/privacy-policy" />
      </Helmet>

      {/* Breadcrumb */}
      <nav className="text-sm text-gray-600 mb-6">
        <Link to="/" className="hover:text-black">Home</Link>
        <span className="mx-2">/</span>
        <span>Privacy Policy</span>
      </nav>

      {/* Page Title */}
      <h1 className="text-4xl font-bold tracking-wide text-center mb-10">
        Privacy Policy
      </h1>

      <div className="max-w-3xl mx-auto space-y-8">

        {/* Introduction */}
        <section className="pb-6 border-b border-gray-200">
          <p>
            At Oakress, your privacy is important to us. This Privacy Policy outlines how 
            we collect, use, store, and protect your personal information in compliance 
            with the <strong>Nigeria Data Protection Regulation (NDPR)</strong> and 
            <strong> GDPR</strong> standards.
          </p>
        </section>

        {/* Information We Collect */}
        <section className="pb-6 border-b border-gray-200">
          <h2 className="text-2xl font-semibold mb-2">Information We Collect</h2>
          <ul className="list-disc ml-6 space-y-1">
            <li>Contact information (name, address, phone number, email)</li>
            <li>Order and payment details</li>
            <li>Delivery information</li>
            <li>Customer communication and inquiries</li>
            <li>Device and usage data via cookies for site performance</li>
          </ul>
        </section>

        {/* Use of Your Information */}
        <section className="pb-6 border-b border-gray-200">
          <h2 className="text-2xl font-semibold mb-2">How We Use Your Information</h2>
          <p>We use your data to:</p>
          <ul className="list-disc ml-6 space-y-1">
            <li>Process and deliver your orders</li>
            <li>Provide customer support</li>
            <li>Improve our website experience</li>
            <li>Communicate updates and exclusive offers (with consent)</li>
            <li>Fulfill legal and tax obligations</li>
          </ul>
        </section>

        {/* Cookies */}
        <section className="pb-6 border-b border-gray-200">
          <h2 className="text-2xl font-semibold mb-2">Cookies & Tracking</h2>
          <p>
            Oakress uses cookies to personalize and enhance your shopping experience. 
            You may disable cookies in your browser settings.
          </p>
        </section>

        {/* Data Sharing */}
        <section className="pb-6 border-b border-gray-200">
          <h2 className="text-2xl font-semibold mb-2">Data Sharing</h2>
          <p>
            We do not sell personal data. Information may only be shared with trusted 
            service providers such as payment processors and logistics partners strictly 
            for business operations.
          </p>
        </section>

        {/* Security */}
        <section className="pb-6 border-b border-gray-200">
          <h2 className="text-2xl font-semibold mb-2">Data Security</h2>
          <p>
            Your information is protected using secure encryption and restricted access 
            to authorized personnel only.
          </p>
        </section>

        {/* Rights */}
        <section className="pb-6 border-b border-gray-200">
          <h2 className="text-2xl font-semibold mb-2">Your Rights</h2>
          <p>You have the right to:</p>
          <ul className="list-disc ml-6 space-y-1">
            <li>Request access to your data</li>
            <li>Correct or update personal information</li>
            <li>Request deletion of your data</li>
            <li>Withdraw marketing consent</li>
          </ul>
        </section>

        {/* Third-Party Links */}
        <section className="pb-6 border-b border-gray-200">
          <h2 className="text-2xl font-semibold mb-2">Third-Party Links</h2>
          <p>
            Our website may contain external links. Oakress is not responsible for the 
            privacy practices of third-party websites.
          </p>
        </section>

        {/* Contact */}
        <section>
          <h2 className="text-2xl font-semibold mb-2">Contact Us</h2>
          <p>
            For privacy concerns or data requests, please contact us at{" "}
            <a href="mailto:oakress@yahoo.com" className="underline font-medium">
              oakress@yahoo.com
            </a>.
          </p>
        </section>

        {/* Footer Links */}
        <div className="pt-6 text-center">
          <p className="font-medium">With appreciation,</p>
          <p className="font-semibold tracking-wide">Oakress</p>
          <p className="italic text-gray-600">Crafted for the woman of quiet luxury.</p>
        </div>
      </div>
    </div>
  );
}
