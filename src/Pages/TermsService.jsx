import { Link } from "react-router-dom";
import { Helmet } from "react-helmet";

export default function TermsOfService() {
  return (
    <>
      <Helmet>
        <title>Terms of Service | Oakress</title>
        <meta
          name="description"
          content="Read the official UK Terms of Service for Oakress. Understand your rights, responsibilities, and the legal framework governing the use of our website and services."
        />
        <meta
          name="keywords"
          content="Oakress UK terms, Oakress legal, UK terms of service, ecommerce terms UK, Oakress policies"
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
          These Terms of Service outline the rules and conditions for using the Oakress
          website and purchasing our products. By accessing our website or making a
          purchase, you agree to comply with these terms, as well as all applicable UK laws.
        </p>

        {/* Sections */}
        <div className="space-y-10 text-gray-800 leading-relaxed">

          {/* Acceptance of Terms */}
          <section className="pb-8 border-b border-gray-200">
            <h2 className="text-2xl font-semibold mb-3">1. Acceptance of Terms</h2>
            <p>
              By using this website, you confirm that you are at least 18 years of age or
              have permission from a legal guardian. If you do not agree with any section of
              these Terms of Service, you must discontinue use of the website immediately.
            </p>
          </section>

          {/* Website Use */}
          <section className="pb-8 border-b border-gray-200">
            <h2 className="text-2xl font-semibold mb-3">2. Use of Our Website</h2>
            <p>
              You agree to use this website lawfully and responsibly in accordance with the
              laws of England & Wales. Prohibited activities include hacking, data scraping,
              fraudulent activity, attempts to bypass security systems, or any misuse that
              may disrupt the website.
            </p>
            <p className="mt-2">
              Oakress reserves the right to suspend or terminate access to users who violate
              these terms or engage in behaviour that threatens the integrity of our platform.
            </p>
          </section>

          {/* Product Info & Pricing */}
          <section className="pb-8 border-b border-gray-200">
            <h2 className="text-2xl font-semibold mb-3">3. Product Information & Pricing</h2>
            <p>
              We strive to ensure all product descriptions, images, and prices are accurate
              and up to date. However, errors may occasionally occur. Oakress reserves the
              right to update or correct information at any time without prior notice,
              including after an order has been placed.
            </p>
          </section>

          {/* Orders & Payment */}
          <section className="pb-8 border-b border-gray-200">
            <h2 className="text-2xl font-semibold mb-3">4. Orders & Payment</h2>
            <p>
              All orders are subject to availability and confirmation. Prices and availability
              may change without notice. Payments must be made using the methods displayed at
              checkout.
            </p>
            <p className="mt-2">
              We reserve the right to refuse or cancel any order that raises concerns about
              fraud, misuse, or suspicious activity in line with UK e-commerce and fraud
              prevention regulations.
            </p>
          </section>

          {/* Intellectual Property */}
          <section className="pb-8 border-b border-gray-200">
            <h2 className="text-2xl font-semibold mb-3">5. Intellectual Property</h2>
            <p>
              All content on this website — including logos, product images, text, graphics,
              and design elements — is the property of Oakress and protected under UK
              intellectual property laws.
            </p>
            <p className="mt-2">
              You may not reproduce, distribute, modify, or commercially exploit any of our
              content without prior written permission.
            </p>
          </section>

          {/* Limitation of Liability */}
          <section className="pb-8 border-b border-gray-200">
            <h2 className="text-2xl font-semibold mb-3">6. Limitation of Liability</h2>
            <p>
              To the fullest extent permitted under UK law, Oakress shall not be held liable
              for indirect, incidental, or consequential damages resulting from your use or
              inability to use our website or services.
            </p>
            <p className="mt-2">
              Nothing in these terms excludes liability for death or personal injury caused
              by negligence, fraud, or any other liability that cannot be excluded under
              the laws of England & Wales.
            </p>
          </section>

          {/* Governing Law (Updated to UK) */}
          <section className="pb-8 border-b border-gray-200">
            <h2 className="text-2xl font-semibold mb-3">7. Governing Law</h2>
            <p>
              These Terms of Service are governed by and interpreted in accordance with the
              laws of England & Wales. Any disputes arising from the use of this website or
              from purchases made through Oakress shall be resolved exclusively in the courts
              of England & Wales.
            </p>
          </section>
        </div>

        {/* Signature */}
        <div className="pt-6 text-center">
          <p className="font-medium">With appreciation,</p>
          <p className="font-semibold tracking-wide">Oakress</p>
          <p className="italic text-gray-600">Crafted for the woman of quiet luxury.</p>
        </div>
      </div>
    </>
  );
}
