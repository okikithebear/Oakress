import { Helmet } from "react-helmet";
import { Link } from "react-router-dom";

export default function PrivacyPolicy() {
  return (
    <div className="w-full bg-white px-6 sm:px-8 md:px-16 py-12 text-gray-800 leading-relaxed">
      <Helmet>
        <title>Privacy Policy | Oakress</title>
        <meta
          name="description"
          content="Read the Oakress UK Privacy Policy. Learn how we collect, use, store, and protect your personal data in compliance with the UK GDPR and Data Protection Act 2018."
        />
        <meta
          name="keywords"
          content="Oakress Privacy Policy UK, UK GDPR, Data Protection Act 2018, data protection, ecommerce privacy UK"
        />
        <link rel="canonical" href="https://oakress.com/privacy-policy" />
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
            At Oakress, we value and respect your privacy. This Privacy Policy explains how 
            we collect, use, store, and protect your personal information in accordance with 
            the <strong>UK General Data Protection Regulation (UK GDPR)</strong> and the 
            <strong> Data Protection Act 2018</strong>.  
            By using our website or purchasing from us, you agree to the practices described here.
          </p>
        </section>

        {/* Information We Collect */}
        <section className="pb-6 border-b border-gray-200">
          <h2 className="text-2xl font-semibold mb-2">Information We Collect</h2>
          <p>We may collect the following types of data:</p>
          <ul className="list-disc ml-6 space-y-1">
            <li>Contact details (name, email address, phone number, billing/delivery address)</li>
            <li>Order and payment information (processed securely by third-party payment providers)</li>
            <li>Delivery and logistics information</li>
            <li>Communications such as inquiries, reviews, or customer support messages</li>
            <li>Technical data such as IP address, device type, and browser information</li>
            <li>Cookie and usage data for analytics and site functionality</li>
          </ul>
        </section>

        {/* How Data is Used */}
        <section className="pb-6 border-b border-gray-200">
          <h2 className="text-2xl font-semibold mb-2">How We Use Your Information</h2>
          <p>Your data may be used to:</p>
          <ul className="list-disc ml-6 space-y-1">
            <li>Process, confirm, and deliver your orders</li>
            <li>Provide customer service and respond to inquiries</li>
            <li>Improve website performance, functionality, and security</li>
            <li>Send newsletters or promotional offers (only with explicit consent)</li>
            <li>Comply with legal, regulatory, and tax obligations</li>
          </ul>
        </section>

        {/* Cookies */}
        <section className="pb-6 border-b border-gray-200">
          <h2 className="text-2xl font-semibold mb-2">Cookies & Tracking Technologies</h2>
          <p>
            We use cookies to ensure the website functions correctly, improve user experience, 
            and analyse performance. Cookies are used in accordance with the 
            <strong> Privacy and Electronic Communications Regulations (PECR)</strong>.
          </p>
          <p className="mt-2">
            You may manage or disable cookies through your browser settings at any time.
          </p>
        </section>

        {/* Data Sharing */}
        <section className="pb-6 border-b border-gray-200">
          <h2 className="text-2xl font-semibold mb-2">How We Share Your Data</h2>
          <p>
            We do not sell or rent personal information. Data may be shared only with trusted 
            third parties who help us operate our business, such as:
          </p>
          <ul className="list-disc ml-6 space-y-1">
            <li>Payment processors (e.g. Stripe, PayPal)</li>
            <li>Delivery and logistics partners</li>
            <li>Professional service providers (IT support, website hosting)</li>
          </ul>
          <p className="mt-2">
            All third parties are required to comply with UK GDPR standards.
          </p>
        </section>

        {/* Data Security */}
        <section className="pb-6 border-b border-gray-200">
          <h2 className="text-2xl font-semibold mb-2">Data Security</h2>
          <p>
            We implement strict security measures including encryption, secure access controls, 
            and monitoring to protect your information from unauthorized access, alteration, 
            or disclosure.
          </p>
        </section>

        {/* Your Rights */}
        <section className="pb-6 border-b border-gray-200">
          <h2 className="text-2xl font-semibold mb-2">Your Rights Under UK GDPR</h2>
          <p>You have the right to:</p>
          <ul className="list-disc ml-6 space-y-1">
            <li>Access the personal data we hold about you</li>
            <li>Request correction of inaccurate or incomplete data</li>
            <li>Request deletion of your personal data (&quot;right to be forgotten&quot;)</li>
            <li>Object to or restrict processing of your data</li>
            <li>Withdraw consent for marketing communications at any time</li>
            <li>Request a copy of your data in a portable format</li>
          </ul>
        </section>

        {/* Data Retention */}
        <section className="pb-6 border-b border-gray-200">
          <h2 className="text-2xl font-semibold mb-2">Data Retention</h2>
          <p>
            We retain personal data only for as long as necessary to fulfil the purposes outlined 
            in this policy, including legal and accounting requirements.
          </p>
        </section>

        {/* Third-Party Links */}
        <section className="pb-6 border-b border-gray-200">
          <h2 className="text-2xl font-semibold mb-2">Links to Third-Party Websites</h2>
          <p>
            Our website may contain links to external sites. We are not responsible for the 
            privacy policies or practices of third-party websites.
          </p>
        </section>

        {/* Contact */}
        <section>
          <h2 className="text-2xl font-semibold mb-2">Contact Us</h2>
          <p>
            If you have questions, concerns, or want to exercise your data rights, please contact us at{" "}
            <a href="mailto:oakress@yahoo.com" className="underline font-medium">
              oakress@yahoo.com
            </a>.
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
