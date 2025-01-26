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
  const [isProfileMenuOpen, setProfileMenuOpen] = useState(false);

  useEffect(() => {
    document.body.style.overflow = isMobileMenuOpen ? "hidden" : "auto";
  }, [isMobileMenuOpen]);

  const navLinks = [
    { path: "/", label: "Home", icon: faHome },
    { path: "/about", label: "About", icon: faInfoCircle },
    { path: "/collection", label: "Collection", icon: faBox },
    { path: "/contact", label: "Contact", icon: faEnvelope },
  ];

  return (
    <div className="flex items-center justify-between py-5 font-medium">
      {/* Logo */}
      <Link to="/">
        <img src={assets.logo} alt="Logo" className="w-36" />
      </Link>

      {/* Navigation Links */}
      <ul className="hidden sm:flex gap-5 text-sm text-gray-700">
        {navLinks.map(({ path, label }) => (
          <NavLink
            key={label}
            to={path}
            className={({ isActive }) =>
              `flex flex-col items-center gap-1 ${
                isActive ? "text-indigo-600" : ""
              }`
            }
          >
            <p>{label.toUpperCase()}</p>
            <hr className="w-2/4 border-none h-[1.5px] bg-gray-700 hidden" />
          </NavLink>
        ))}
      </ul>

      {/* Icons and Mobile Menu */}
      <div className="flex items-center gap-6">
        {/* Search Icon */}
        <FontAwesomeIcon
          icon={faSearch}
          className="w-5 cursor-pointer"
          aria-label="Search"
        />

        {/* Profile Icon */}
        <div className="relative">
          <FontAwesomeIcon
            icon={faUserCircle}
            className="w-5 cursor-pointer"
            aria-label="Profile"
            onClick={() => setProfileMenuOpen(!isProfileMenuOpen)}
          />
          {isProfileMenuOpen && (
            <div
              className="absolute right-0 mt-2 w-36 py-3 px-5 bg-slate-100 text-gray-500 rounded shadow-lg"
              role="menu"
            >
              <p className="cursor-pointer hover:text-black">My Profile</p>
              <p className="cursor-pointer hover:text-black">Orders</p>
              <p className="cursor-pointer hover:text-black">Logout</p>
            </div>
          )}
        </div>

        {/* Cart Icon */}
        <Link to="/cart" className="relative" aria-label="Cart">
          <FontAwesomeIcon icon={faShoppingCart} className="w-5 min-w-5" />
          <p className="absolute right-[-5px] bottom-[-5px] w-4 h-4 flex items-center justify-center bg-black text-white text-xs rounded-full">
            10
          </p>
        </Link>

        {/* Mobile Menu Icon */}
        <FontAwesomeIcon
          onClick={() => setMobileMenuOpen(!isMobileMenuOpen)}
          icon={isMobileMenuOpen ? faTimes : faBars}
          className="w-5 cursor-pointer sm:hidden"
          aria-label="Toggle Menu"
        />
      </div>

      {/* Mobile Navigation Menu */}
      <div
        className={`fixed top-0 right-0 bottom-0 bg-white transition-transform duration-300 shadow-lg z-50 ${
          isMobileMenuOpen ? "translate-x-0" : "translate-x-full"
        } w-3/4 sm:w-1/2`}
        role="menu"
        aria-hidden={!isMobileMenuOpen}
      >
        <ul className="flex flex-col gap-6 p-8 text-base text-gray-800">
          {navLinks.map(({ path, label, icon }) => (
            <NavLink
              key={label}
              to={path}
              onClick={() => setMobileMenuOpen(false)}
              className={({ isActive }) =>
                `flex items-center gap-3 font-medium hover:text-indigo-600 transition-all ${
                  isActive ? "text-indigo-600" : ""
                }`
              }
            >
              <FontAwesomeIcon icon={icon} className="w-5 h-5" />
              {label}
            </NavLink>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Navbar;
