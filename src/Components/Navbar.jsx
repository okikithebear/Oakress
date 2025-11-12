// src/Components/Navbar.jsx
import { useState, useEffect, useCallback, useRef } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faSearch,
  faUserCircle,
  faShoppingCart,
  faBars,
  faTimes,
  faHome,
  faInfoCircle,
  faSpa,
  faBox,
  faEnvelope,
  faPhotoFilm,
  faClipboardList,
} from "@fortawesome/free-solid-svg-icons";
import { toast } from "react-toastify";
import { signOut } from "firebase/auth";

import { auth } from "../firebase";
import { assets } from "../assets/assets";
import { useAuth } from "../Context/AuthContext";
import { useCart } from "../Context/CartContext";

// Navigation Links
const navLinks = [
  { path: "/", label: "Home", icon: faHome },
  { path: "/about", label: "About", icon: faInfoCircle },
  { path: "/shop", label: "Shop", icon: faBox },
  { path: "/gallery", label: "Gallery", icon: faPhotoFilm },
 { path: "/collections-page", label: "Collections", icon: faSpa },
  { path: "/bookings", label: "Bookings", icon: faClipboardList },
  { path: "/contact", label: "Contact", icon: faEnvelope },
];

// Custom hook to close dropdowns/overlays on outside click or ESC
const useOutsideClose = (refs, setStates) => {
  useEffect(() => {
    const handleClickOutside = (e) => {
      refs.forEach((ref, i) => {
        if (ref.current && !ref.current.contains(e.target)) setStates[i](false);
      });
    };
    const handleEsc = (e) => e.key === "Escape" && setStates.forEach((fn) => fn(false));

    document.addEventListener("mousedown", handleClickOutside);
    window.addEventListener("keydown", handleEsc);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      window.removeEventListener("keydown", handleEsc);
    };
  }, [refs, setStates]);
};

const Navbar = () => {
  const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isSearchOpen, setSearchOpen] = useState(false);
  const [isProfileOpen, setProfileOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const { cartCount, products } = useCart();
  const { user } = useAuth();
  const navigate = useNavigate();
  const profileRef = useRef(null);

  // Close profile dropdown on outside click or ESC
  useOutsideClose([profileRef], [setProfileOpen]);

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    document.body.style.overflow = isMobileMenuOpen ? "hidden" : "auto";
  }, [isMobileMenuOpen]);

  // Render navigation links
  const renderNavLinks = useCallback(
    (isMobile = false) =>
      navLinks.map(({ path, label, icon }) => (
        <NavLink
          key={label}
          to={path}
          onClick={() => isMobile && setMobileMenuOpen(false)}
          className={({ isActive }) =>
            `flex items-center gap-2 transition-all font-medium ${
              isMobile ? "text-lg py-2" : "text-sm"
            } hover:text-yellow-600 ${isActive ? "text-yellow-600" : "text-gray-700"}`
          }
        >
          {isMobile && <FontAwesomeIcon icon={icon} className="w-5 h-5" />}
          {label}
        </NavLink>
      )),
    []
  );

  // Handle search submit
  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (!searchQuery.trim()) return;

    const query = searchQuery.toLowerCase();

    const matchedProduct = products?.find((p) => p.name.toLowerCase().includes(query));
    if (matchedProduct) {
      navigate(`/product/${matchedProduct.id}`);
    } else {
      const routes = {
        home: "/",
        about: "/about",
        collections: "/collections",
        gallery: "/gallery",
        booking: "/bespoke",
        contact: "/contact",
        profile: "/profile",
        cart: "/cart",
        orders: "/orders",
        signin: "/sign-in",
        login: "/sign-in",
      };
      const matchedRoute = Object.keys(routes).find((key) => query.includes(key));
      matchedRoute ? navigate(routes[matchedRoute]) : toast.error("No results found 🔍");
    }
    setSearchQuery("");
    setSearchOpen(false);
  };

  // Handle logout
  const handleLogout = async () => {
    try {
      await signOut(auth);
      toast.success("Logged out successfully");
      navigate("/sign-in");
    } catch (err) {
      console.error(err);
      toast.error("Failed to logout");
    }
  };

  return (
    <>
      <nav className="fixed top-0 left-0 w-full h-16 bg-white shadow-md z-50">
        <div className="flex items-center justify-between h-full px-4 sm:px-8 font-medium">
          {/* Logo */}
          <Link to="/">
            <img src={assets.logo} alt="Logo" className="w-32 sm:w-36" />
          </Link>

          {/* Desktop Nav */}
          <ul className="hidden sm:flex gap-8">{renderNavLinks()}</ul>

          {/* Right Controls */}
          <div className="flex items-center gap-6">
            {/* Desktop Search */}
            <form
              onSubmit={handleSearchSubmit}
              className="hidden sm:flex items-center border rounded-lg overflow-hidden"
            >
              <input
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search..."
                className="px-3 py-1 text-sm w-40 focus:w-56 transition-all duration-300 outline-none"
              />
              <button type="submit" className="bg-yellow-600 text-white px-3 hover:bg-yellow-700">
                <FontAwesomeIcon icon={faSearch} />
              </button>
            </form>

            {/* Mobile Search */}
            <button
              onClick={() => setSearchOpen((p) => !p)}
              className="sm:hidden hover:text-yellow-600"
            >
              <FontAwesomeIcon icon={faSearch} />
            </button>

            {/* Profile */}
            <div className="relative" ref={profileRef}>
              <FontAwesomeIcon
                icon={faUserCircle}
                className="w-6 h-6 cursor-pointer hover:text-yellow-600"
                onClick={() => setProfileOpen((p) => !p)}
              />
              {isProfileOpen && (
                <div className="absolute right-0 mt-2 w-44 bg-white border rounded-lg shadow-lg">
                  {!user ? (
                    <button
                      onClick={() => navigate("/sign-in")}
                      className="block w-full text-left px-4 py-2 hover:bg-gray-100"
                    >
                      Sign In
                    </button>
                  ) : (
                    <>
                      {["/account-details",].map((path, i) => (
                        <button
                          key={i}
                          onClick={() => navigate(path)}
                          className="block w-full text-left px-4 py-2 hover:bg-gray-100"
                        >
                          {path === "/account-details" ? "My Account" : "Orders"}
                        </button>
                      ))}
                      <button
                        onClick={handleLogout}
                        className="block w-full text-left px-4 py-2 hover:bg-gray-100"
                      >
                        Logout
                      </button>
                    </>
                  )}
                </div>
              )}
            </div>

            {/* Cart */}
            <Link to="/cart" className="relative hover:text-yellow-600">
              <FontAwesomeIcon icon={faShoppingCart} className="w-6 h-6" />
              {cartCount > 0 && (
                <span className="absolute -right-2 -top-2 w-5 h-5 flex items-center justify-center bg-yellow-600 text-white text-xs rounded-full">
                  {cartCount}
                </span>
              )}
            </Link>

            {/* Mobile Menu Button */}
            <button onClick={() => setMobileMenuOpen(true)} className="sm:hidden hover:text-yellow-600">
              <FontAwesomeIcon icon={faBars} />
            </button>
          </div>
        </div>

        {/* Mobile Sidebar */}
        <aside
          className={`fixed top-0 right-0 h-full w-3/4 max-w-xs bg-white shadow-lg transform transition-transform duration-300 sm:hidden ${
            isMobileMenuOpen ? "translate-x-0" : "translate-x-full"
          }`}
        >
          <div className="flex justify-between items-center p-4 border-b">
            <img src={assets.logo} alt="Logo" className="w-28" />
            <button onClick={() => setMobileMenuOpen(false)}>
              <FontAwesomeIcon icon={faTimes} />
            </button>
          </div>
          <ul className="flex flex-col p-6 gap-4">{renderNavLinks(true)}</ul>
        </aside>
      </nav>

      {/* Mobile Search Overlay */}
      {isSearchOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center sm:hidden">
          <div className="bg-white p-4 rounded-lg w-11/12 max-w-md">
            <form onSubmit={handleSearchSubmit} className="flex">
              <input
                className="flex-grow border p-2 rounded-l-lg"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search..."
              />
              <button className="bg-yellow-600 text-white px-4 rounded-r-lg">Search</button>
            </form>
          </div>
        </div>
      )}

      <div className="pt-20" />
    </>
  );
};

export default Navbar;
