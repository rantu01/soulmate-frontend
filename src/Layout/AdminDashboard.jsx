import React, { useState, useEffect } from "react";
import {
  Link,
  NavLink,
  Outlet,
  useNavigate,
  useLocation,
} from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import {
  FaHome,
  FaUsers,
  FaCrown,
  FaEnvelope,
  FaSignOutAlt,
  FaBars,
  FaTimes,
  FaStar,
  FaChartPie,
  FaDollarSign,
  FaUserCog
} from "react-icons/fa";
import { motion } from "framer-motion";
import BiodataPieChart from "../components/BiodataPieChart";
import PaymentSummary from "../components/PaymentSummary";

const AdminDashboard = () => {
  const { logout, currentUser } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  const handleLogout = async () => {
    await logout();
    navigate("/login");
  };

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { 
      to: "/admin", 
      icon: <FaHome className="text-lg" />, 
      text: "Dashboard Home",
      desc: "Overview and analytics"
    },
    {
      to: "/admin/manage-users",
      icon: <FaUsers className="text-lg" />,
      text: "Manage Users",
      desc: "User administration"
    },
    {
      to: "/admin/approve-premium",
      icon: <FaCrown className="text-lg" />,
      text: "Premium Requests",
      desc: "Approve premium status"
    },
    {
      to: "/admin/approve-contact",
      icon: <FaEnvelope className="text-lg" />,
      text: "Contact Requests",
      desc: "Manage contact permissions"
    },
    {
      to: "/admin/success-story",
      icon: <FaStar className="text-lg" />,
      text: "Success Stories",
      desc: "Couple testimonials"
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      {/* Mobile Header */}
      <header
        className={`lg:hidden fixed w-full z-30 transition-all duration-300 ${
          isScrolled
            ? "bg-white shadow-lg py-2"
            : "bg-gradient-to-r from-indigo-600 to-purple-600 py-4"
        }`}
      >
        <div className="container mx-auto px-4 flex justify-between items-center">
          <motion.div 
            whileHover={{ scale: 1.02 }}
            className="flex items-center"
          >
            <FaUserCog className={`mr-2 ${isScrolled ? "text-indigo-600" : "text-white"}`} size={20} />
            <h2
              className={`text-xl font-bold ${
                isScrolled ? "text-gray-800" : "text-white"
              }`}
            >
              Admin Panel
            </h2>
          </motion.div>
          <motion.button
            whileTap={{ scale: 0.9 }}
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className={`p-2 rounded-md ${
              isScrolled ? "text-gray-700" : "text-white"
            }`}
          >
            {isMobileMenuOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
          </motion.button>
        </div>
      </header>

      {/* Mobile Sidebar */}
      {isMobileMenuOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="lg:hidden fixed inset-0 z-20 bg-black bg-opacity-50"
          onClick={() => setIsMobileMenuOpen(false)}
        >
          <motion.div
            initial={{ x: -300 }}
            animate={{ x: 0 }}
            exit={{ x: -300 }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            className="bg-white w-80 h-full shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="p-6 border-b border-gray-200 bg-gradient-to-r from-indigo-600 to-purple-600 text-white">
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 rounded-full bg-white flex items-center justify-center text-indigo-600 font-bold text-xl shadow-md">
                  {currentUser?.email?.charAt(0).toUpperCase()}
                </div>
                <div className="pt-30">
                  <h4 className="font-semibold">Administrator</h4>
                  <p className="text-sm text-indigo-100">{currentUser?.email}</p>
                </div>
              </div>
            </div>
            <nav className="p-4 space-y-1 overflow-y-auto h-[calc(100%-180px)]">
              {navLinks.map((link) => (
                <motion.div
                  key={link.to}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <NavLink
                    to={link.to}
                    className={({ isActive }) =>
                      `flex items-center px-4 py-4 rounded-lg transition-all mb-1 ${
                        isActive
                          ? "bg-gradient-to-r from-indigo-50 to-purple-50 text-indigo-600 font-medium border-l-4 border-indigo-500"
                          : "text-gray-700 hover:bg-gray-50"
                      }`
                    }
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    <span className="mr-3 text-indigo-500">{link.icon}</span>
                    <div>
                      <p className="font-medium">{link.text}</p>
                      <p className="text-xs text-gray-500">{link.desc}</p>
                    </div>
                  </NavLink>
                </motion.div>
              ))}
            </nav>
            <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-gray-200 bg-white">
              <motion.button
                whileHover={{ x: 3 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleLogout}
                className="w-full flex items-center justify-center px-4 py-3 rounded-lg text-white bg-gradient-to-r from-red-500 to-pink-500 hover:from-red-600 hover:to-pink-600 transition-all shadow-md"
              >
                <FaSignOutAlt className="mr-3" />
                Sign Out
              </motion.button>
              <Link to="/" className="block mt-2 text-center text-sm text-indigo-600 hover:underline">
                Back to Main Site
              </Link>
            </div>
          </motion.div>
        </motion.div>
      )}

      <div className="flex pt-16 lg:pt-0">
        {/* Desktop Sidebar */}
        <aside className="hidden lg:flex flex-col w-72 bg-white shadow-xl fixed h-full border-r border-gray-200">
          <div className="p-6 border-b border-gray-200 bg-gradient-to-r from-indigo-600 to-purple-600">
            <motion.div 
              whileHover={{ scale: 1.02 }}
              className="flex items-center"
            >
              <FaUserCog className="text-white mr-3" size={24} />
              <h2 className="text-2xl font-bold text-white">Admin Dashboard</h2>
            </motion.div>
          </div>
          <div className="p-6 border-b border-gray-200">
            <div className="flex items-center space-x-4">
              <div className="w-14 h-14 rounded-full bg-gradient-to-r from-indigo-500 to-purple-500 flex items-center justify-center text-white font-bold text-2xl shadow-md">
                {currentUser?.email?.charAt(0).toUpperCase()}
              </div>
              <div>
                <h4 className="font-semibold text-gray-800">Administrator</h4>
                <p className="text-sm text-gray-500">{currentUser?.email}</p>
              </div>
            </div>
          </div>
          <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
            {navLinks.map((link) => (
              <motion.div
                key={link.to}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <NavLink
                  to={link.to}
                  className={({ isActive }) =>
                    `flex items-center px-4 py-4 rounded-lg transition-all mb-2 ${
                      isActive
                        ? "bg-gradient-to-r from-indigo-50 to-purple-50 text-indigo-600 font-medium border-l-4 border-indigo-500"
                        : "text-gray-700 hover:bg-gray-50"
                    }`
                  }
                >
                  <span className="mr-3 text-indigo-500">{link.icon}</span>
                  <div>
                    <p className="font-medium">{link.text}</p>
                    <p className="text-xs text-gray-500">{link.desc}</p>
                  </div>
                </NavLink>
              </motion.div>
            ))}
          </nav>
          <div className="p-4 border-t border-gray-200">
            <motion.button
              whileHover={{ x: 3 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleLogout}
              className="w-full flex items-center justify-center px-4 py-3 rounded-lg text-white bg-gradient-to-r from-red-500 to-pink-500 hover:from-red-600 hover:to-pink-600 transition-all shadow-md"
            >
              <FaSignOutAlt className="mr-3" />
              Sign Out
            </motion.button>
            <Link 
              to="/" 
              className="block mt-3 text-center text-sm text-indigo-600 hover:underline"
            >
              Back to Main Site
            </Link>
          </div>
        </aside>

        {/* Content Area */}
        <main className="flex-1 lg:ml-72 p-4 lg:p-4 transition-all duration-300">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className={`bg-white rounded-xl shadow-sm p-6 ${
              isScrolled ? "lg:mt-4" : "lg:mt-0"
            }`}
          >
            {location.pathname === "/admin" ? (
              <>
                <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8">
                  <h3 className="text-2xl font-semibold text-gray-800 mb-4 md:mb-0">
                    Dashboard Overview
                  </h3>
                  <div className="flex items-center space-x-2">
                    <span className="px-3 py-1 bg-indigo-100 text-indigo-800 rounded-full text-sm font-medium">
                      Admin View
                    </span>
                    <span className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm font-medium">
                      {new Date().toLocaleDateString()}
                    </span>
                  </div>
                </div>
                
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
                  <div className="bg-gradient-to-br from-indigo-50 to-purple-50 rounded-xl p-6 shadow-inner">
                    <div className="flex items-center mb-4">
                      <FaChartPie className="text-indigo-600 mr-3 text-xl" />
                      <h4 className="text-lg font-semibold text-gray-800">
                        Biodata Statistics
                      </h4>
                    </div>
                    <BiodataPieChart />
                  </div>
                  
                  <div className="bg-gradient-to-br from-blue-50 to-cyan-50 rounded-xl p-6 shadow-inner">
                    <div className="flex items-center mb-4">
                      <FaDollarSign className="text-blue-600 mr-3 text-xl" />
                      <h4 className="text-lg font-semibold text-gray-800">
                        Payment Summary
                      </h4>
                    </div>
                    <PaymentSummary />
                  </div>
                </div>
                
                <div className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-xl p-6 shadow-inner">
                  <h4 className="text-lg font-semibold text-gray-800 mb-4">
                    Quick Actions
                  </h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                    {navLinks.slice(1).map((link) => (
                      <motion.div
                        key={link.to}
                        whileHover={{ y: -3 }}
                        whileTap={{ scale: 0.98 }}
                      >
                        <NavLink
                          to={link.to}
                          className="block bg-white p-4 rounded-lg shadow-sm hover:shadow-md border border-gray-200 transition-all"
                        >
                          <div className="flex items-center">
                            <span className="mr-3 text-indigo-500">
                              {link.icon}
                            </span>
                            <span className="font-medium text-gray-800">
                              {link.text}
                            </span>
                          </div>
                        </NavLink>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </>
            ) : (
              <Outlet />
            )}
          </motion.div>
        </main>
      </div>
    </div>
  );
};

export default AdminDashboard;