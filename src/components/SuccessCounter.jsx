import React, { useEffect, useState } from "react";
import { FaUsers, FaFemale, FaMale, FaRing, FaHeart } from "react-icons/fa";
import CountUp from "react-countup";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

const SuccessCounter = () => {
  const [stats, setStats] = useState({
    total: 0,
    girls: 0,
    boys: 0,
    marriages: 0,
  });

  useEffect(() => {
    const fetchCounters = async () => {
      try {
        const res = await fetch("https://matrimony-backend-p3ok.onrender.com/api/counter-stats");
        const data = await res.json();
        setStats({
          total: data.totalBiodata || 0,
          girls: data.totalGirls || 0,
          boys: data.totalBoys || 0,
          marriages: data.totalMarriages || 0,
        });
      } catch (error) {
        console.error("Failed to fetch stats:", error.message);
      }
    };

    fetchCounters();
  }, []);

  const counterItems = [
    {
      icon: <FaUsers className="text-4xl" />,
      value: stats.total,
      label: "Total Biodatas",
      color: "from-blue-500 to-blue-600",
      suffix: "+",
    },
    {
      icon: <FaFemale className="text-4xl" />,
      value: stats.girls,
      label: "Girls Biodatas",
      color: "from-pink-500 to-pink-600",
      suffix: "+",
    },
    {
      icon: <FaMale className="text-4xl" />,
      value: stats.boys,
      label: "Boys Biodatas",
      color: "from-sky-500 to-sky-600",
      suffix: "+",
    },
    {
      icon: <FaRing className="text-4xl" />,
      value: stats.marriages,
      label: "Successful Marriages",
      color: "from-green-500 to-green-600",
      suffix: "+",
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
            Our Success in Numbers
          </h2>
          <p className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto">
            Join thousands of happy couples who found their life partners
            through our platform
          </p>
        </div>

        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={containerVariants}
        >
          {counterItems.map((item, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              className="relative group"
            >
              <div className="absolute -inset-1 bg-gradient-to-r from-pink-600 to-purple-600 rounded-xl blur opacity-25 group-hover:opacity-75 transition duration-300"></div>
              <div className="relative bg-white rounded-xl shadow-lg h-full p-8 flex flex-col items-center text-center hover:shadow-xl transition duration-300">
                <div
                  className={`mb-6 p-4 rounded-full bg-gradient-to-r ${item.color} text-white shadow-md`}
                >
                  {item.icon}
                </div>
                <div className="text-4xl font-bold text-gray-800 mb-2">
                  <CountUp
                    end={item.value}
                    duration={2.5}
                    separator=","
                    suffix={item.suffix}
                  />
                </div>
                <p className="text-gray-600">{item.label}</p>
                <div className="absolute bottom-0 left-0 right-0 h-1 overflow-hidden rounded-b-xl">
                  <div
                    className={`h-full bg-gradient-to-r ${item.color} transition-all duration-1000 ease-out`}
                    style={{ width: "0%" }}
                    onMouseEnter={(e) => (e.currentTarget.style.width = "100%")}
                    onMouseLeave={(e) => (e.currentTarget.style.width = "0%")}
                  ></div>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        <div className="mt-16 bg-gradient-to-r from-pink-600 to-purple-600 rounded-2xl p-8 md:p-12 text-white text-center">
          <div className="max-w-4xl mx-auto">
            <div className="inline-flex items-center justify-center bg-white/20 rounded-full p-3 mb-6">
              <FaHeart className="text-2xl" />
            </div>
            <h3 className="text-2xl md:text-3xl font-bold mb-6">
              Ready to Begin Your Journey?
            </h3>
            <p className="text-lg md:text-xl mb-8 opacity-90">
              Be our next success story! Create your profile today and find your
              perfect match.
            </p>

            <Link to="/dashboard/view-biodata">
              <button className="bg-white text-pink-600 font-semibold px-8 py-3 rounded-full hover:bg-pink-50 transition-colors duration-300 shadow-lg">
                Join Now
              </button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SuccessCounter;
