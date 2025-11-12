import PropTypes from "prop-types";
import { assets } from "../assets/assets";

const AuthLayout = ({ children, title, subtitle }) => (
  <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-yellow-50 to-white px-4">
    <div className="bg-white p-10 rounded-2xl shadow-xl w-full max-w-md border border-gray-200 text-center">
      <img src={assets.logo} alt="Logo" className="mx-auto w-32 mb-6" />
      <h1 className="text-3xl font-bold text-gray-900 mb-2">{title}</h1>
      <p className="text-gray-500 mb-8">{subtitle}</p>
      {children}
    </div>
  </div>
);

AuthLayout.propTypes = {
  children: PropTypes.node.isRequired,
  title: PropTypes.string.isRequired,
  subtitle: PropTypes.string,
};

export default AuthLayout;
