import { useState, useEffect } from "react";
import { assets } from "../assets/assets";
import { Link, NavLink } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faSearch,
  faUserCircle,
  faShoppingCart,
  faBars,
  faTimes,
  faHome,
  faInfoCircle,
  faBox,
  faEnvelope,
} from "@fortawesome/free-solid-svg-icons";

const Navbar = () => {
  const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    document.body.style.overflow = isMobileMenuOpen ? "hidden" : "auto";
  }, [isMobileMenuOpen]);

  const navLinks = [
    { path: "/", label: "Home", icon: faHome },
    { path: "/about", label: "About", icon: faInfoCircle },
    { path: "/collections", label: "Collection", icon: faBox },
    { path: "/contact", label: "Contact", icon: faEnvelope },
  ];

  const renderNavLinks = (isMobile = false) =>
    navLinks.map(({ path, label, icon }) => (
      <NavLink
        key={label}
        to={path}
        onClick={() => isMobile && setMobileMenuOpen(false)}
        className={({ isActive }) =>
          `flex items-center gap-2 font-medium transition-all 
          ${isMobile ? "text-lg py-2" : "text-sm"}
          hover:text-indigo-600 ${
            isActive ? "text-indigo-600" : "text-gray-700"
          }`
        }
      >
        {isMobile && <FontAwesomeIcon icon={icon} className="w-5 h-5" />}
        {label}
      </NavLink>
    ));

  return (
    <nav className="relative flex items-center justify-between py-5 px-4 sm:px-8 font-medium bg-white shadow-sm">
      {/* Logo */}
      <Link to="/" className="flex items-center gap-2">
        <img src={assets.logo} alt="Logo" className="w-36" />
      </Link>

      {/* Desktop Nav */}
      <ul className="hidden sm:flex gap-6">{renderNavLinks()}</ul>

      {/* Icons */}
      <div className="flex items-center gap-6">
        {/* Search */}
        <button aria-label="Search">
          <FontAwesomeIcon icon={faSearch} className="w-5 h-5 cursor-pointer" />
        </button>

        {/* Profile Dropdown */}
        <div className="relative group">
          <FontAwesomeIcon
            icon={faUserCircle}
            className="w-6 h-6 cursor-pointer"
            aria-label="Profile Menu"
          />
          <div
            className="absolute right-0 mt-2 w-40 bg-white border rounded-lg shadow-lg hidden group-hover:block"
            role="menu"
          >
            <button className="block w-full text-left px-4 py-2 hover:bg-gray-100">
              My Profile
            </button>
            <button className="block w-full text-left px-4 py-2 hover:bg-gray-100">
              Orders
            </button>
            <button className="block w-full text-left px-4 py-2 hover:bg-gray-100">
              Logout
            </button>
          </div>
        </div>

        {/* Cart */}
        <Link to="/cart" className="relative" aria-label="Cart">
          <FontAwesomeIcon icon={faShoppingCart} className="w-6 h-6" />
          <span className="absolute -right-2 -top-2 w-5 h-5 flex items-center justify-center bg-black text-white text-xs rounded-full">
            10
          </span>
        </Link>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setMobileMenuOpen(true)}
          className="sm:hidden"
          aria-label="Open Mobile Menu"
        >
          <FontAwesomeIcon icon={faBars} className="w-6 h-6" />
        </button>
      </div>

      {/* Overlay */}
      {isMobileMenuOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 sm:hidden"
          onClick={() => setMobileMenuOpen(false)}
        />
      )}

      {/* Mobile Menu */}
      <aside
        className={`fixed top-0 right-0 h-full w-3/4 max-w-xs bg-white shadow-lg transform transition-transform duration-300 sm:hidden z-50 ${
          isMobileMenuOpen ? "translate-x-0" : "translate-x-full"
        }`}
        role="dialog"
        aria-modal="true"
      >
        <div className="flex justify-between items-center p-4 border-b">
          <img src={assets.logo} alt="Logo" className="w-28" />
          <button
            onClick={() => setMobileMenuOpen(false)}
            aria-label="Close Mobile Menu"
          >
            <FontAwesomeIcon icon={faTimes} className="w-6 h-6" />
          </button>
        </div>
        <ul className="flex flex-col p-6 gap-4">{renderNavLinks(true)}</ul>
      </aside>
    </nav>
  );
};

export default Navbar;
