import { Link, useLocation } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import { useEffect, useState } from "react";
import { FaHeart } from "react-icons/fa";

const Navbar = () => {
  const { currentUser, userData, loading } = useAuth();
  const isLoggedIn = !!currentUser;
  const isAdmin = userData?.role === "admin";

  const location = useLocation();
  const [scrolled, setScrolled] = useState(false);
  const [showMobileMenu, setShowMobileMenu] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const isActive = (path) => location.pathname === path;

  const linkClass = (path) =>
    `block px-3 py-2 rounded-md text-base font-medium ${
      isActive(path)
        ? scrolled
          ? "bg-pink-100 text-pink-600"
          : "bg-pink-800 text-white"
        : scrolled
        ? "text-gray-700 hover:bg-pink-50 hover:text-pink-600"
        : "text-gray-100 hover:bg-pink-700 hover:text-white"
    }`;

  if (loading) return null; // Prevent flicker before userData is loaded

  return (
    <nav
      className={`fixed w-full z-50 transition-all duration-300 ${
        scrolled
          ? "bg-white shadow-lg py-2"
          : "bg-gradient-to-r from-pink-600 to-purple-700 py-3"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link
            to="/"
            className={`flex items-center text-2xl font-bold ${
              scrolled ? "text-pink-600" : "text-white"
            }`}
          >
            <FaHeart className="text-pink-300 text-3xl mr-2" />
            <span className="hidden sm:inline">SoulMate</span>
            <span className="sm:hidden">SM</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <Link to="/" className={linkClass("/")}>
              Home
            </Link>
            <Link to="/biodatas" className={linkClass("/biodatas")}>
              Biodatas
            </Link>
            <Link to="/about" className={linkClass("/about")}>
              About Us
            </Link>
            <Link to="/contact" className={linkClass("/contact")}>
              Contact Us
            </Link>

            {isLoggedIn ? (
              isAdmin ? (
                <Link
                  to="/admin"
                  className="px-3 py-2 rounded-md text-sm font-medium bg-pink-600 text-white hover:bg-pink-700 transition-colors"
                >
                  Admin Dashboard
                </Link>
              ) : (
                <Link
                  to="/dashboard"
                  className="px-3 py-2 rounded-md text-sm font-medium bg-pink-600 text-white hover:bg-pink-700 transition-colors"
                >
                  My Dashboard
                </Link>
              )
            ) : (
              <Link
                to="/login"
                className="px-3 py-2 rounded-md text-sm font-medium bg-pink-600 text-white hover:bg-pink-700 transition-colors"
              >
                Login / Register
              </Link>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <button
              type="button"
              onClick={() => setShowMobileMenu(!showMobileMenu)}
              className={`inline-flex items-center justify-center p-2 rounded-md ${
                scrolled ? "text-black" : "text-white"
              } hover:text-pink-600 focus:outline-none`}
              aria-controls="mobile-menu"
              aria-expanded={showMobileMenu}
            >
              <svg
                className="h-6 w-6"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                {showMobileMenu ? (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                ) : (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                )}
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {showMobileMenu && (
        <div
          className="md:hidden px-4 pt-2 pb-4 space-y-1 shadow-lg"
          id="mobile-menu"
        >
          <Link
            to="/"
            onClick={() => setShowMobileMenu(false)}
            className={linkClass("/")}
          >
            Home
          </Link>
          <Link
            to="/biodatas"
            onClick={() => setShowMobileMenu(false)}
            className={linkClass("/biodatas")}
          >
            Biodatas
          </Link>
          <Link
            to="/about"
            onClick={() => setShowMobileMenu(false)}
            className={linkClass("/about")}
          >
            About Us
          </Link>
          <Link
            to="/contact"
            onClick={() => setShowMobileMenu(false)}
            className={linkClass("/contact")}
          >
            Contact Us
          </Link>

          {isLoggedIn ? (
            isAdmin ? (
              <Link
                to="/admin"
                onClick={() => setShowMobileMenu(false)}
                className="block px-3 py-2 rounded-md text-base font-medium bg-pink-600 text-white hover:bg-pink-700"
              >
                Admin Dashboard
              </Link>
            ) : (
              <Link
                to="/dashboard"
                onClick={() => setShowMobileMenu(false)}
                className="block px-3 py-2 rounded-md text-base font-medium bg-pink-600 text-white hover:bg-pink-700"
              >
                My Dashboard
              </Link>
            )
          ) : (
            <Link
              to="/login"
              onClick={() => setShowMobileMenu(false)}
              className="block px-3 py-2 rounded-md text-base font-medium bg-pink-600 text-white hover:bg-pink-700"
            >
              Login / Register
            </Link>
          )}
        </div>
      )}
    </nav>
  );
};

export default Navbar;
