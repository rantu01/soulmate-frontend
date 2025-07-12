import React from "react";
import {
  FaHeart,
  FaFacebookF,
  FaTwitter,
  FaInstagram,
  FaLinkedinIn,
  FaPhoneAlt,
  FaEnvelope,
  FaMapMarkerAlt,
} from "react-icons/fa";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-gradient-to-b from-pink-800 to-purple-900 text-white pt-16 pb-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          <div>
            <div className="flex items-center mb-6">
              <FaHeart className="text-pink-300 text-3xl mr-2" />
              <h3 className="text-2xl font-bold bg-gradient-to-r from-pink-300 to-purple-600 bg-clip-text text-transparent">
                Soul<span className="text-white">Mate</span>
              </h3>
            </div>
            <p className="text-gray-300 mb-6">
              Connecting hearts since 2010. Our mission is to help you find your
              perfect life partner with trust and authenticity.
            </p>
            <div className="flex space-x-4">
              <a
                href="https://www.facebook.com/"
                className="bg-gray-700 hover:bg-pink-600 w-10 h-10 rounded-full flex items-center justify-center transition-colors duration-300"
              >
                <FaFacebookF />
              </a>
              <a
                href="https://x.com/"
                className="bg-gray-700 hover:bg-blue-500 w-10 h-10 rounded-full flex items-center justify-center transition-colors duration-300"
              >
                <FaTwitter />
              </a>
              <a
                href="https://www.instagram.com/"
                className="bg-gray-700 hover:bg-pink-500 w-10 h-10 rounded-full flex items-center justify-center transition-colors duration-300"
              >
                <FaInstagram />
              </a>
              <a
                href="https://www.linkedin.com/in/rantubytes/"
                className="bg-gray-700 hover:bg-blue-700 w-10 h-10 rounded-full flex items-center justify-center transition-colors duration-300"
              >
                <FaLinkedinIn />
              </a>
            </div>
          </div>

          <div>
            <h4 className="text-lg font-semibold mb-6 border-b border-gray-700 pb-2">
              Quick Links
            </h4>
            <ul className="space-y-3">
              <li>
                <Link to="/">
                  <p className="text-gray-300 hover:text-pink-500 transition-colors duration-300 flex items-center">
                    <FaHeart className="mr-2 text-pink-600 text-xs" /> Home
                  </p>
                </Link>
              </li>
              <li>
                <Link to="/biodatas">
                  <p className="text-gray-300 hover:text-pink-500 transition-colors duration-300 flex items-center">
                    <FaHeart className="mr-2 text-pink-600 text-xs" /> Biodatas
                  </p>
                </Link>
              </li>
              <li>
                <Link to="/about">
                  <p className="text-gray-300 hover:text-pink-500 transition-colors duration-300 flex items-center">
                    <FaHeart className="mr-2 text-pink-600 text-xs" />
                    About
                  </p>
                </Link>
              </li>
              <li>
                <Link to="/contact">
                  <p className="text-gray-300 hover:text-pink-500 transition-colors duration-300 flex items-center">
                    <FaHeart className="mr-2 text-pink-600 text-xs" />
                    Contact
                  </p>
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-lg font-semibold mb-6 border-b border-gray-700 pb-2">
              Contact Us
            </h4>
            <ul className="space-y-4">
              <li className="flex items-start">
                <FaMapMarkerAlt className="text-pink-600 mt-1 mr-3 flex-shrink-0" />
                <span className="text-gray-300">
                  123 Love Lane, Boyra, Khulna-9000, Bangladesh
                </span>
              </li>
              <li className="flex items-center">
                <FaPhoneAlt className="text-pink-600 mr-3" />
                <p
                  href="tel:+8801912345678"
                  className="text-gray-300 hover:text-pink-500 transition-colors duration-300"
                >
                  +880 1316 034237
                </p>
              </li>
              <li className="flex items-center">
                <FaEnvelope className="text-pink-600 mr-3" />
                <a
                  href="mailto:info@matrimonyplatform.com"
                  className="text-gray-300 hover:text-pink-500 transition-colors duration-300"
                >
                  info@matrimonyplatform.com
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-lg font-semibold mb-6 border-b border-gray-700 pb-2">
              Newsletter
            </h4>
            <p className="text-gray-300 mb-4">
              Subscribe to our newsletter for the latest updates and success
              stories.
            </p>
            <form className="flex">
              <Link to="/dashboard">
                <button
                  type="submit"
                  className="bg-gradient-to-r from-pink-600 to-purple-600 hover:from-pink-700 hover:to-purple-700 px-4 py-2 rounded-r-lg font-medium transition-colors duration-300"
                >
                  Subscribe
                </button>
                
              </Link>
            </form>
          </div>
        </div>

        <div className="border-t border-gray-700 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-400 text-sm mb-4 md:mb-0">
            &copy; {new Date().getFullYear()} Soul Mate, Rantu All rights
            reserved.
          </p>
          <div className="flex space-x-6">
            <Link
              href="/privacy"
              className="text-gray-400 hover:text-pink-500 text-sm transition-colors duration-300"
            >
              Privacy Policy
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
