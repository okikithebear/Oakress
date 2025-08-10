const Footer = () => {
  return (
    <footer className="py-10 px-6 text-gray-700 w-full">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
        {/* Connect With Us Section */}
        <div>
          <h3 className="text-lg font-semibold mb-4">CONNECT WITH US</h3>
          <div className="flex space-x-4">
            <a
              href="#"
              aria-label="Twitter"
              className="text-gray-500 hover:text-black transition duration-200"
            >
              <i className="fab fa-twitter text-2xl"></i>
            </a>
            <a
              href="#"
              aria-label="Facebook"
              className="text-gray-500 hover:text-black transition duration-200"
            >
              <i className="fab fa-facebook text-2xl"></i>
            </a>
            <a
              href="#"
              aria-label="Instagram"
              className="text-gray-500 hover:text-black transition duration-200"
            >
              <i className="fab fa-instagram text-2xl"></i>
            </a>
          </div>
        </div>

        {/* Legal Terms Section */}
        <div>
          <h3 className="text-lg font-semibold mb-4">TERMS AND CONDITIONS</h3>
          <ul className="space-y-2">
            <li>
              <a
                href="/terms"
                className="hover:text-black transition duration-200"
              >
                Terms of Service
              </a>
            </li>
            <li>
              <a
                href="/shipping-policy"
                className="hover:text-black transition duration-200"
              >
                Shipping Policy
              </a>
            </li>
            <li>
              <a
                href="/returns"
                className="hover:text-black transition duration-200"
              >
                Return and Refund Policy
              </a>
            </li>
            <li>
              <a
                href="/privacy"
                className="hover:text-black transition duration-200"
              >
                Privacy Policy
              </a>
            </li>
          </ul>
        </div>

        {/* The Oakress Legacy Section */}
        <div>
          <h3 className="text-lg font-semibold mb-4">THE OAKRESS</h3>
          <ul className="space-y-2">
            <li>
              <a href="#" className="hover:text-black transition duration-200">
                The Legacy
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-black transition duration-200">
                The History
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-black transition duration-200">
                The Founder
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-black transition duration-200">
                The Impact
              </a>
            </li>
          </ul>
          <select
            className="mt-4 w-full border-gray-300 rounded p-2 focus:outline-none focus:ring focus:ring-black"
            aria-label="Select Country"
          >
            <option value="USD">United States (USD $)</option>
            <option value="EUR">Europe (EUR €)</option>
            <option value="GBP">United Kingdom (GBP £)</option>
          </select>
        </div>

        {/* Collections Section */}
        <div>
          <h3 className="text-lg font-semibold mb-4">COLLECTIONS</h3>
          <ul className="space-y-2">
            <li>2016 – Noir Éclat by the OAKRESS</li>
            <li>2017 – The woman 2018</li>
            <li>2020 – Bridal – Beyond by the OAKRESS</li>
            <li>2020 – RTW – Awelewa by the OAKRESS</li>
          </ul>
        </div>
      </div>

      {/* Footer Bottom */}
      <div className="text-center text-sm text-gray-500 mt-10">
        © 2025 OAKRESS. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
