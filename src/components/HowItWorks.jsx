import React from "react";
import {
  FaUserPlus,
  FaSearch,
  FaHeart,
  FaPhoneAlt,
  FaArrowRight,
} from "react-icons/fa";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

const HowItWorks = () => {
  const steps = [
    {
      icon: <FaUserPlus className="text-4xl" />,
      title: "Create Your Profile",
      description:
        "Sign up for free and build your biodata with photos, preferences, and personal details.",
      color: "from-purple-500 to-purple-600",
    },
    {
      icon: <FaSearch className="text-4xl" />,
      title: "Search & Match",
      description:
        "Explore thousands of verified profiles and find matches based on your preferences.",
      color: "from-blue-500 to-blue-600",
    },
    {
      icon: <FaHeart className="text-4xl" />,
      title: "Express Interest",
      description:
        "Like or favorite someone's profile to let them know you're interested.",
      color: "from-pink-500 to-pink-600",
    },
    {
      icon: <FaPhoneAlt className="text-4xl" />,
      title: "Connect & Chat",
      description:
        "Request contact details. Premium users get direct access to contact info.",
      color: "from-green-500 to-green-600",
    },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.5,
      },
    },
  };

  return (
    <section className="bg-gradient-to-b from-pink-50 to-white py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-pink-600 mb-4">
            How Our Matrimony Service Works
          </h2>
          <p className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto">
            Find your perfect life partner in just four simple steps
          </p>
        </div>

        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mb-16"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={containerVariants}
        >
          {steps.map((step, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              className="relative group"
            >
              <div className="absolute -inset-1 bg-gradient-to-r from-pink-600 to-purple-600 rounded-xl blur opacity-25 group-hover:opacity-75 transition duration-300"></div>
              <div className="relative bg-white rounded-xl shadow-lg h-full p-8 flex flex-col items-center text-center hover:shadow-xl transition duration-300">
                <div
                  className={`mb-6 p-4 rounded-full bg-gradient-to-r ${step.color} text-white shadow-md`}
                >
                  {step.icon}
                </div>
                <div className="flex items-center justify-center absolute top-0 -mt-4">
                  <div className="bg-white border-2 border-pink-500 text-pink-600 font-bold rounded-full w-8 h-8 flex items-center justify-center shadow-sm">
                    {index + 1}
                  </div>
                </div>
                <h3 className="text-xl font-bold text-gray-800 mb-3">
                  {step.title}
                </h3>
                <p className="text-gray-600 mb-6">{step.description}</p>
                <div className="mt-auto w-full">
                  <div className="h-1 w-full bg-gray-100 rounded-full overflow-hidden">
                    <div
                      className={`h-full bg-gradient-to-r ${step.color} transition-all duration-1000 ease-out`}
                      style={{ width: "0%" }}
                      onMouseEnter={(e) =>
                        (e.currentTarget.style.width = "100%")
                      }
                      onMouseLeave={(e) => (e.currentTarget.style.width = "0%")}
                    ></div>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        <div className="text-center">
          <Link to="/dashboard/view-biodata">
            <button className="bg-gradient-to-r from-pink-600 to-purple-600 hover:from-pink-700 hover:to-purple-700 text-white font-semibold py-3 px-8 rounded-full inline-flex items-center shadow-lg hover:shadow-xl transition duration-300">
              Get Started Today <FaArrowRight className="ml-2" />
            </button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
