import { useState, useEffect, useCallback, useMemo, useRef } from "react";
import { assets } from "../assets/assets";
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
  faBox,
  faEnvelope,
} from "@fortawesome/free-solid-svg-icons";
import { useAuth } from "../Context/AuthContext";
import { signOut } from "firebase/auth";
import { auth } from "../firebase";

const Navbar = () => {
  const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isSearchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [isProfileOpen, setProfileOpen] = useState(false);

  const { user } = useAuth();
  const navigate = useNavigate();
  const profileRef = useRef(null);

  // ✅ Close profile dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (profileRef.current && !profileRef.current.contains(e.target)) {
        setProfileOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // ✅ Lock scroll & close on ESC for mobile menu
  useEffect(() => {
    document.body.style.overflow = isMobileMenuOpen ? "hidden" : "auto";

    const handleEsc = (e) => {
      if (e.key === "Escape") {
        setMobileMenuOpen(false);
        setSearchOpen(false);
        setProfileOpen(false);
      }
    };
    window.addEventListener("keydown", handleEsc);
    return () => window.removeEventListener("keydown", handleEsc);
  }, [isMobileMenuOpen]);

  const navLinks = useMemo(
    () => [
      { path: "/", label: "Home", icon: faHome },
      { path: "/about", label: "About", icon: faInfoCircle },
      { path: "/collections", label: "Collection", icon: faBox },
      { path: "/contact", label: "Contact", icon: faEnvelope },
    ],
    []
  );

  const renderNavLinks = useCallback(
    (isMobile = false) =>
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
      )),
    [navLinks]
  );

  const handleLogout = async () => {
    await signOut(auth);
    navigate("/signin");
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/search?q=${searchQuery}`);
      setSearchOpen(false);
      setSearchQuery("");
    }
  };

  return (
    <>
      <nav className="fixed top-0 left-0 w-full h-16 bg-white shadow-md z-50">
        <div className="flex items-center justify-between h-full px-4 sm:px-8 font-medium">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2">
            <img src={assets.logo} alt="Logo" className="w-32 sm:w-36" />
          </Link>

          {/* Desktop Navigation */}
          <ul className="hidden sm:flex gap-8">{renderNavLinks()}</ul>

          {/* Right Icons */}
          <div className="flex items-center gap-6">
            {/* Search */}
            <button
              aria-label="Search"
              onClick={() => setSearchOpen((prev) => !prev)}
              className="hover:text-indigo-600 transition"
            >
              <FontAwesomeIcon icon={faSearch} className="w-5 h-5" />
            </button>

            {/* Profile Dropdown */}
            <div className="relative" ref={profileRef}>
              <FontAwesomeIcon
                icon={faUserCircle}
                className="w-6 h-6 cursor-pointer hover:text-indigo-600"
                aria-label="Profile Menu"
                onClick={() => setProfileOpen((prev) => !prev)}
              />
              {isProfileOpen && (
                <div
                  className="absolute right-0 mt-2 w-44 bg-white border rounded-lg shadow-lg"
                  role="menu"
                >
                  {!user ? (
                    <button
                      onClick={() => navigate("/sign-in")}
                      className="block w-full text-left px-4 py-2 hover:bg-gray-100"
                    >
                      Sign In
                    </button>
                  ) : (
                    <>
                      <button
                        onClick={() => navigate("/profile")}
                        className="block w-full text-left px-4 py-2 hover:bg-gray-100"
                      >
                        My Profile
                      </button>
                      <button
                        onClick={() => navigate("/orders")}
                        className="block w-full text-left px-4 py-2 hover:bg-gray-100"
                      >
                        Orders
                      </button>
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
            <Link
              to="/cart"
              className="relative hover:text-indigo-600 transition"
              aria-label="Cart"
            >
              <FontAwesomeIcon icon={faShoppingCart} className="w-6 h-6" />
              <span className="absolute -right-2 -top-2 w-5 h-5 flex items-center justify-center bg-black text-white text-xs rounded-full">
                10
              </span>
            </Link>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setMobileMenuOpen(true)}
              className="sm:hidden hover:text-indigo-600 transition"
              aria-label="Open Mobile Menu"
            >
              <FontAwesomeIcon icon={faBars} className="w-6 h-6" />
            </button>
          </div>
        </div>

        {/* Mobile Overlay */}
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

      {/* Search Overlay */}
      {isSearchOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center">
          <div className="bg-white rounded-lg p-4 w-11/12 max-w-md shadow-lg">
            <form onSubmit={handleSearchSubmit} className="flex">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search..."
                className="flex-grow border p-2 rounded-l-lg focus:outline-none"
                autoFocus
              />
              <button
                type="submit"
                className="bg-indigo-600 text-white px-4 rounded-r-lg hover:bg-indigo-700"
              >
                Search
              </button>
            </form>
          </div>
        </div>
      )}

      {/* Page Content Wrapper */}
      <div className="pt-20 px-4 sm:px-8">{/* Your page content */}</div>
    </>
  );
};

export default Navbar;
