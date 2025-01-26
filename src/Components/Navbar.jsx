import { useState } from 'react';
import { assets } from '../assets/assets';
import { Link, NavLink } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch, faUserCircle, faShoppingCart, faBars, faTimes, faHome, faInfoCircle, faBox, faEnvelope } from '@fortawesome/free-solid-svg-icons';

const Navbar = () => {
  const [visible, setVisible] = useState(false); // Added state for menu visibility

  return (
    <div className="flex items-center justify-between py-5 font-medium">
      {/* Logo */}
      <img src={assets.logo} alt="logo" className="w-36" />

      {/* Navigation Links */}
      <ul className="hidden sm:flex gap-5 text-sm text-gray-700">
        <NavLink
          to="/"
          className={({ isActive }) =>
            `flex flex-col items-center gap-1 ${isActive ? 'text-indigo-600' : ''}`
          }
        >
          <p>HOME</p>
          <hr className="w-2/4 border-none h-[1.5px] bg-gray-700 hidden" />
        </NavLink>
        <NavLink
          to="/about"
          className={({ isActive }) =>
            `flex flex-col items-center gap-1 ${isActive ? 'text-indigo-600' : ''}`
          }
        >
          <p>ABOUT</p>
          <hr className="w-2/4 border-none h-[1.5px] bg-gray-700 hidden" />
        </NavLink>
        <NavLink
          to="/collection"
          className={({ isActive }) =>
            `flex flex-col items-center gap-1 ${isActive ? 'text-indigo-600' : ''}`
          }
        >
          <p>COLLECTION</p>
          <hr className="w-2/4 border-none h-[1.5px] bg-gray-700 hidden" />
        </NavLink>
        <NavLink
          to="/contact"
          className={({ isActive }) =>
            `flex flex-col items-center gap-1 ${isActive ? 'text-indigo-600' : ''}`
          }
        >
          <p>CONTACT</p>
          <hr className="w-2/4 border-none h-[1.5px] bg-gray-700 hidden" />
        </NavLink>
      </ul>

      {/* Icons and Mobile Menu */}
      <div className="flex items-center gap-6">
        {/* Search Icon */}
        <FontAwesomeIcon icon={faSearch} className="w-5 cursor-pointer" />

        {/* Profile Icon with Dropdown */}
        <div className="group relative">
          <FontAwesomeIcon icon={faUserCircle} className="w-5 cursor-pointer" />
          <div className="group-hover:block hidden absolute dropdown-menu right-0 pt-4">
            <div className="flex flex-col gap-2 w-36 py-3 px-5 bg-slate-100 text-gray-500 rounded">
              <p className="cursor-pointer hover:text-black">My Profile</p>
              <p className="cursor-pointer hover:text-black">Orders</p>
              <p className="cursor-pointer hover:text-black">Logout</p>
            </div>
          </div>
        </div>

        {/* Cart Icon */}
        <Link to="/cart" className="relative">
          <FontAwesomeIcon icon={faShoppingCart} className="w-5 min-w-5" />
          <p className="absolute right-[-5px] bottom-[-5px] w-4 h-4 flex items-center justify-center bg-black text-white text-xs rounded-full">
            10
          </p>
        </Link>

        {/* Mobile Menu Icon */}
        <FontAwesomeIcon
          onClick={() => setVisible(!visible)}
          icon={faBars}
          className="w-5 cursor-pointer sm:hidden"
        />
      </div>

      {/* Mobile Navigation Menu */}
      <div
        className={`absolute top-0 right-0 bottom-0 bg-white transition-transform duration-300 shadow-lg ${visible ? 'translate-x-0' : 'translate-x-full'} w-3/4 sm:w-1/2`}
      >
        {/* Close Button */}
        <button
          onClick={() => setVisible(false)}
          className="absolute top-4 right-4 text-gray-700 p-2 bg-gray-100 rounded-full shadow-md hover:bg-gray-200"
          aria-label="Close Menu"
        >
          <FontAwesomeIcon icon={faTimes} className="w-6 h-6" />
        </button>

        {/* Mobile Navigation Links */}
        <ul className="flex flex-col gap-6 p-8 text-base text-gray-800">
          <NavLink
            to="/"
            onClick={() => setVisible(false)}
            className={({ isActive }) =>
              `flex items-center gap-3 font-medium hover:text-indigo-600 transition-all ${isActive ? 'text-indigo-600' : ''}`
            }
          >
            <FontAwesomeIcon icon={faHome} className="w-5 h-5" />
            Home
          </NavLink>
          <NavLink
            to="/about"
            onClick={() => setVisible(false)}
            className={({ isActive }) =>
              `flex items-center gap-3 font-medium hover:text-indigo-600 transition-all ${isActive ? 'text-indigo-600' : ''}`
            }
          >
            <FontAwesomeIcon icon={faInfoCircle} className="w-5 h-5" />
            About
          </NavLink>
          <NavLink
            to="/collection"
            onClick={() => setVisible(false)}
            className={({ isActive }) =>
              `flex items-center gap-3 font-medium hover:text-indigo-600 transition-all ${isActive ? 'text-indigo-600' : ''}`
            }
          >
            <FontAwesomeIcon icon={faBox} className="w-5 h-5" />
            Collection
          </NavLink>
          <NavLink
            to="/contact"
            onClick={() => setVisible(false)}
            className={({ isActive }) =>
              `flex items-center gap-3 font-medium hover:text-indigo-600 transition-all ${isActive ? 'text-indigo-600' : ''}`
            }
          >
            <FontAwesomeIcon icon={faEnvelope} className="w-5 h-5" />
            Contact
          </NavLink>
        </ul>
      </div>
    </div>
  );
};

export default Navbar;
