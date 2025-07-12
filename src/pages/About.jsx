import React from "react";
import {
  FaHeart,
  FaHandsHelping,
  FaShieldAlt,
  FaUserCheck,
} from "react-icons/fa";
import { Link } from "react-router-dom";

const AboutUs = () => {
  return (
    <div className="bg-gradient-to-b from-pink-50 to-white py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-pink-600 mb-4">
            Our Story of Creating Happy Beginnings
          </h2>
          <p className="text-lg md:text-xl text-gray-600 max-w-4xl mx-auto">
            Trusted by millions of families worldwide to find their perfect
            match
          </p>
        </div>

        <div className="flex flex-col lg:flex-row gap-12 items-center mb-20">
          <div className="lg:w-1/2">
            <div className="relative rounded-xl overflow-hidden shadow-xl">
              <img
                src="https://i.ibb.co/8D53z3Xr/closeup-woman-sitting-man-s-back-looking-happy.jpg"
                alt="Happy couple"
                className="w-full h-auto object-cover transition-transform duration-500 hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-pink-600/30 to-transparent"></div>
            </div>
          </div>
          <div className="lg:w-1/2">
            <h3 className="text-2xl md:text-3xl font-semibold text-gray-800 mb-6">
              Connecting Hearts Since 2010
            </h3>
            <p className="text-gray-600 mb-6">
              Founded with a vision to revolutionize the way people find life
              partners, our platform combines traditional values with modern
              technology. We understand that marriage is not just about two
              individuals, but the coming together of families and values.
            </p>
            <p className="text-gray-600 mb-8">
              With over a decade of experience, we've successfully helped more
              than 500,000 couples find their perfect match. Our verified
              profiles and advanced matching algorithms ensure meaningful
              connections that last a lifetime.
            </p>
            <div className="flex flex-wrap gap-4">
              <span className="bg-pink-100 text-pink-800 px-4 py-2 rounded-full text-sm font-medium">
                Trusted Platform
              </span>
              <span className="bg-pink-100 text-pink-800 px-4 py-2 rounded-full text-sm font-medium">
                500K+ Matches
              </span>
              <span className="bg-pink-100 text-pink-800 px-4 py-2 rounded-full text-sm font-medium">
                Verified Profiles
              </span>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-20">
          <div className="bg-white p-8 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300 text-center">
            <div className="bg-pink-100 w-16 h-16 mx-auto rounded-full flex items-center justify-center mb-6">
              <FaHeart className="text-pink-600 text-2xl" />
            </div>
            <h4 className="text-xl font-semibold mb-3 text-gray-800">
              Authentic Connections
            </h4>
            <p className="text-gray-600">
              We prioritize genuine profiles and meaningful matches over
              superficial connections.
            </p>
          </div>

          <div className="bg-white p-8 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300 text-center">
            <div className="bg-pink-100 w-16 h-16 mx-auto rounded-full flex items-center justify-center mb-6">
              <FaHandsHelping className="text-pink-600 text-2xl" />
            </div>
            <h4 className="text-xl font-semibold mb-3 text-gray-800">
              Personalized Assistance
            </h4>
            <p className="text-gray-600">
              Our relationship experts provide personalized matchmaking support
              when you need it.
            </p>
          </div>

          <div className="bg-white p-8 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300 text-center">
            <div className="bg-pink-100 w-16 h-16 mx-auto rounded-full flex items-center justify-center mb-6">
              <FaShieldAlt className="text-pink-600 text-2xl" />
            </div>
            <h4 className="text-xl font-semibold mb-3 text-gray-800">
              Privacy Protection
            </h4>
            <p className="text-gray-600">
              Your privacy and security are our top priorities with advanced
              protection measures.
            </p>
          </div>

          <div className="bg-white p-8 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300 text-center">
            <div className="bg-pink-100 w-16 h-16 mx-auto rounded-full flex items-center justify-center mb-6">
              <FaUserCheck className="text-pink-600 text-2xl" />
            </div>
            <h4 className="text-xl font-semibold mb-3 text-gray-800">
              Verified Profiles
            </h4>
            <p className="text-gray-600">
              Rigorous verification process ensures you interact with genuine
              individuals.
            </p>
          </div>
        </div>

        <div className="bg-pink-600 rounded-2xl p-8 md:p-12 text-white">
          <div className="max-w-4xl mx-auto text-center">
            <h3 className="text-2xl md:text-3xl font-bold mb-6">
              Ready to Begin Your Journey?
            </h3>
            <p className="text-lg md:text-xl mb-8 opacity-90">
              Join thousands of happy couples who found their life partners
              through our platform. Your perfect match might be just a click
              away.
            </p>

            <Link to="/">
              <button className="bg-white text-pink-600 font-semibold px-8 py-3 rounded-full hover:bg-pink-50 transition-colors duration-300 shadow-lg">
                Create Your Profile Now
              </button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutUs;
