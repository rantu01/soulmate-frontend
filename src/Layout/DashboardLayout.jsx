import {
  Outlet,
  NavLink,
  useNavigate,
  Link,
  useLocation,
} from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import { useState, useEffect } from "react";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import {
  ChartBarIcon,
  UserGroupIcon,
  HeartIcon,
  EnvelopeIcon,
  CheckBadgeIcon,
  HomeIcon,
  PencilSquareIcon,
  EyeIcon,
  InboxIcon,
  BookmarkIcon,
  UserIcon,
} from "@heroicons/react/24/solid";
import { motion } from "framer-motion";

const DashboardLayout = () => {
  const { logout, currentUser } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [stats, setStats] = useState({
    totalUsers: 0,
    activeProfiles: 0,
    matchesMade: 0,
    premiumMembers: 0,
    contactRequests: 0,
  });
  const [loadingStats, setLoadingStats] = useState(true);

  const isDashboardRoot = location.pathname === "/dashboard";

  useEffect(() => {
    const fetchStats = async () => {
      try {
        setLoadingStats(true);
        const res = await fetch(
          "https://matrimony-backend-p3ok.onrender.com/api/counter-stats"
        );
        const data = await res.json();
        setStats({
          totalUsers: data.totalBiodata || 0,
          activeProfiles: (data.totalGirls || 0) + (data.totalBoys || 0),
          matchesMade: data.totalMarriages || 0,
          premiumMembers: 0,
          contactRequests: 0,
        });
      } catch (error) {
        console.error("Failed to fetch stats:", error);
      } finally {
        setLoadingStats(false);
      }
    };

    if (isDashboardRoot) {
      fetchStats();
    }
  }, [isDashboardRoot]);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  const navItems = [
    { path: "/", label: "Soul Mate Home", icon: <HomeIcon className="h-5 w-5" /> },
    { path: "/dashboard/edit-biodata", label: "Edit Biodata", icon: <PencilSquareIcon className="h-5 w-5" /> },
    { path: "/dashboard/view-biodata", label: "View Biodata", icon: <EyeIcon className="h-5 w-5" /> },
    { path: "/dashboard/my-contact-request", label: "Contact Requests", icon: <InboxIcon className="h-5 w-5" /> },
    { path: "/dashboard/my-favourites", label: "My Favourites", icon: <HeartIcon className="h-5 w-5" /> },
    { path: "/dashboard/got-married", label: "Got Married", icon: <UserIcon className="h-5 w-5" /> },
  ];

  const statCards = [
    {
      title: "Total Users",
      value: stats.totalUsers,
      icon: <UserGroupIcon className="h-8 w-8 text-white" />,
      bgColor: "bg-gradient-to-br from-blue-500 to-blue-600",
    },
    {
      title: "Active Profiles",
      value: stats.activeProfiles,
      icon: <ChartBarIcon className="h-8 w-8 text-white" />,
      bgColor: "bg-gradient-to-br from-green-500 to-green-600",
    },
    {
      title: "Matches Made",
      value: stats.matchesMade,
      icon: <HeartIcon className="h-8 w-8 text-white" />,
      bgColor: "bg-gradient-to-br from-pink-500 to-pink-600",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      {/* Mobile Header */}
      <header
        className={`lg:hidden fixed w-full z-20 transition-all duration-300 ${
          isScrolled ? "bg-white shadow-lg" : "bg-gradient-to-r from-pink-600 to-purple-600"
        }`}
      >
        <div className="flex items-center justify-between px-4 py-3">
          <div className="flex items-center">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className={`focus:outline-none ${
                isScrolled ? "text-gray-800" : "text-white"
              }`}
            >
              {mobileMenuOpen ? (
                <XMarkIcon className="h-6 w-6" />
              ) : (
                <Bars3Icon className="h-6 w-6" />
              )}
            </button>
            <Link to="/" className="ml-4">
              <span className={`text-xl font-bold ${isScrolled ? "text-pink-600" : "text-white"}`}>
                SoulMate
              </span>
            </Link>
          </div>
          {currentUser && (
            <div className="flex items-center">
              <div className="h-8 w-8 rounded-full bg-white flex items-center justify-center text-pink-600 font-semibold shadow-md">
                {currentUser.email.charAt(0).toUpperCase()}
              </div>
            </div>
          )}
        </div>
      </header>

      <div className="flex flex-col lg:flex-row pt-16 lg:pt-0">
        {/* Sidebar - Desktop */}
        <aside className="hidden lg:block w-72 bg-gradient-to-b from-gray-800 to-gray-900 text-white p-6 fixed h-full shadow-xl">
          <div className="space-y-1">
            <Link to="/" className="block mb-8">
              <motion.h2 
                className="text-2xl font-bold text-white flex items-center"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5 }}
              >
                <span className="mr-2 text-pink-400">💍</span>
                <span>SoulMate</span>
              </motion.h2>
            </Link>
            <div className="space-y-2">
              {navItems.map((item, index) => (
                <motion.div
                  key={item.path}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.1 }}
                >
                  <NavLink
                    to={item.path}
                    className={({ isActive }) =>
                      `flex items-center px-4 py-3 rounded-lg transition-all duration-300 ${
                        isActive
                          ? "bg-gradient-to-r from-pink-600 to-purple-600 text-white shadow-md"
                          : "text-gray-300 hover:bg-gray-700 hover:text-white"
                      }`
                    }
                  >
                    <span className="mr-3">{item.icon}</span>
                    {item.label}
                  </NavLink>
                </motion.div>
              ))}
            </div>
          </div>

          <div className="mt-auto pt-8 border-t border-gray-700">
            <motion.button
              onClick={handleLogout}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="w-full flex items-center justify-center px-4 py-3 rounded-lg bg-gradient-to-r from-red-600 to-pink-600 text-white hover:from-red-700 hover:to-pink-700 transition-all shadow-lg"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 mr-2"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M3 3a1 1 0 00-1 1v12a1 1 0 102 0V4a1 1 0 00-1-1zm10.293 9.293a1 1 0 001.414 1.414l3-3a1 1 0 000-1.414l-3-3a1 1 0 10-1.414 1.414L14.586 9H7a1 1 0 100 2h7.586l-1.293 1.293z"
                  clipRule="evenodd"
                />
              </svg>
              Logout
            </motion.button>
          </div>
        </aside>

        {/* Mobile Sidebar */}
        {mobileMenuOpen && (
          <div className="lg:hidden fixed inset-0 z-10 bg-gray-800 bg-opacity-75">
            <motion.div 
              className="fixed inset-y-0 left-0 w-72 bg-gradient-to-b from-gray-800 to-gray-900 text-white p-6 overflow-y-auto"
              initial={{ x: -300 }}
              animate={{ x: 0 }}
              exit={{ x: -300 }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
            >
              <div className="flex items-center justify-between mb-8">
                <Link
                  to="/"
                  className="block"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  <h2 className="text-2xl font-bold text-white flex items-center">
                    <span className="mr-2 text-pink-400">💍</span> SoulMate
                  </h2>
                </Link>
                <button
                  onClick={() => setMobileMenuOpen(false)}
                  className="text-gray-400 hover:text-white"
                >
                  <XMarkIcon className="h-6 w-6" />
                </button>
              </div>

              <div className="space-y-2">
                {navItems.map((item) => (
                  <NavLink
                    key={item.path}
                    to={item.path}
                    onClick={() => setMobileMenuOpen(false)}
                    className={({ isActive }) =>
                      `flex items-center px-4 py-3 rounded-lg transition-colors ${
                        isActive
                          ? "bg-gradient-to-r from-pink-600 to-purple-600 text-white shadow-md"
                          : "text-gray-300 hover:bg-gray-700 hover:text-white"
                      }`
                    }
                  >
                    <span className="mr-3">{item.icon}</span>
                    {item.label}
                  </NavLink>
                ))}
              </div>

              <div className="mt-8 pt-4 border-t border-gray-700">
                <button
                  onClick={handleLogout}
                  className="w-full flex items-center justify-center px-4 py-3 rounded-lg bg-gradient-to-r from-red-600 to-pink-600 text-white hover:from-red-700 hover:to-pink-700 transition-colors shadow-md"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5 mr-2"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M3 3a1 1 0 00-1 1v12a1 1 0 102 0V4a1 1 0 00-1-1zm10.293 9.293a1 1 0 001.414 1.414l3-3a1 1 0 000-1.414l-3-3a1 1 0 10-1.414 1.414L14.586 9H7a1 1 0 100 2h7.586l-1.293 1.293z"
                      clipRule="evenodd"
                    />
                  </svg>
                  Logout
                </button>
              </div>
            </motion.div>
          </div>
        )}

        {/* Main Content */}
        <main className="flex-1 lg:ml-72 p-4 lg:p-8">
          <div className="bg-white rounded-2xl shadow-sm p-6 lg:p-8 min-h-[calc(100vh-8rem)]">
            {isDashboardRoot ? (
              <div>
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                >
                  <h1 className="text-2xl md:text-3xl font-bold text-gray-800 mb-6">
                    Welcome Back, {currentUser?.email.split('@')[0]}!
                  </h1>
                  <p className="text-gray-600 mb-8">
                    Here's what's happening with your matrimony platform today.
                  </p>
                </motion.div>

                {loadingStats ? (
                  <div className="flex justify-center items-center h-64">
                    <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-pink-600"></div>
                  </div>
                ) : (
                  <motion.div 
                    className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6 mb-8"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ staggerChildren: 0.1 }}
                  >
                    {statCards.map((stat, index) => (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.3, delay: index * 0.1 }}
                        whileHover={{ y: -5 }}
                        className={`${stat.bgColor} rounded-xl p-6 text-white shadow-lg transition-all duration-300 hover:shadow-xl`}
                      >
                        <div className="flex justify-between items-start">
                          <div>
                            <p className="text-sm font-medium opacity-90">
                              {stat.title}
                            </p>
                            <p className="text-3xl font-bold mt-2">
                              {stat.value.toLocaleString()}
                            </p>
                          </div>
                          <div className="p-3 rounded-full bg-white bg-opacity-20">
                            {stat.icon}
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </motion.div>
                )}
              </div>
            ) : (
              <Outlet />
            )}
          </div>
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;