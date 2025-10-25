import { Link } from "react-router-dom";
import { Helmet } from "react-helmet";

export default function TermsOfService() {
  return (
    <>
      <Helmet>
        <title>Terms of Service | Oakress</title>
        <meta
          name="description"
          content="Review the official Terms of Service for Oakress. Learn about user responsibilities, limitations of liability, and policies when using our website."
        />
        <meta
          name="keywords"
          content="Oakress terms, Oakress legal, Terms of service Nigeria, ecommerce terms, Oakress policies"
        />
      </Helmet>

      <div className="w-full bg-white px-6 md:px-24 py-10 md:py-20 font-outfit">
        {/* Breadcrumb */}
        <nav className="text-sm text-gray-500 mb-10">
          <Link to="/" className="hover:text-black">Home</Link> /{" "}
          <span className="text-black">Terms of Service</span>
        </nav>

        {/* Page Header */}
        <h1 className="text-4xl md:text-5xl font-semibold text-gray-900 mb-6 tracking-tight">
          Terms of Service
        </h1>
        <p className="text-gray-600 mb-12 leading-relaxed">
          These Terms of Service govern your use of our website and services. By accessing or purchasing from 
          Oakress, you agree to comply with these terms.
        </p>

        {/* Sections */}
        <div className="space-y-10 text-gray-800 leading-relaxed">

          <section className="pb-8 border-b border-gray-200">
            <h2 className="text-2xl font-semibold mb-3">1. Acceptance of Terms</h2>
            <p>
              By using this website, you confirm that you are at least 18 years old or have obtained consent 
              from a legal guardian. If you disagree with any part of these terms, please discontinue use of 
              our services immediately.
            </p>
          </section>

          <section className="pb-8 border-b border-gray-200">
            <h2 className="text-2xl font-semibold mb-3">2. Use of Our Website</h2>
            <p>
              You agree not to misuse our platform or engage in activities such as hacking, scraping, fraud, or 
              unauthorized access. Oakress reserves the right to suspend accounts violating these rules.
            </p>
          </section>

          <section className="pb-8 border-b border-gray-200">
            <h2 className="text-2xl font-semibold mb-3">3. Product Information & Pricing</h2>
            <p>
              We make every effort to ensure product descriptions, images, and prices are accurate. However, we 
              reserve the right to correct errors or update information without notice.
            </p>
          </section>

          <section className="pb-8 border-b border-gray-200">
            <h2 className="text-2xl font-semibold mb-3">4. Orders & Payment</h2>
            <p>
              All orders are subject to acceptance and availability. Payment must be made using accepted methods 
              listed at checkout. We reserve the right to cancel orders suspected of fraud.
            </p>
          </section>

          <section className="pb-8 border-b border-gray-200">
            <h2 className="text-2xl font-semibold mb-3">5. Intellectual Property</h2>
            <p>
              All content on Oakress, including text, graphics, logos, and images, is our property and protected 
              by intellectual property laws. You may not replicate or distribute our content without permission.
            </p>
          </section>

          <section className="pb-8 border-b border-gray-200">
            <h2 className="text-2xl font-semibold mb-3">6. Limitation of Liability</h2>
            <p>
              Oakress is not liable for indirect, incidental, or consequential damages arising from use of 
              our services. Use the website at your own risk.
            </p>
          </section>

          <section className="pb-8 border-b border-gray-200">
            <h2 className="text-2xl font-semibold mb-3">7. Governing Law</h2>
            <p>
              These terms are governed by the laws of the Federal Republic of Nigeria. Any disputes will be 
              settled in Nigerian courts.
            </p>
          </section>

        </div>

        {/* Cross Links */}
         <div className="pt-6 text-center">
          <p className="font-medium">With appreciation,</p>
          <p className="font-semibold tracking-wide">Oakress</p>
          <p className="italic text-gray-600">Crafted for the woman of quiet luxury.</p>
        </div>
      </div>
    </>
  );
}
