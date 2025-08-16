import React from "react";
import { Link } from "react-router-dom";
import { FaExclamationTriangle } from "react-icons/fa";

const ErrorPage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 to-white flex flex-col items-center justify-center px-4 text-center">
      <div className="max-w-md">
        <div className="text-red-500 mb-6">
          <FaExclamationTriangle className="text-6xl mx-auto" />
        </div>
        <h1 className="text-4xl sm:text-5xl font-extrabold text-gray-800 mb-4">
          404 - Page Not Found
        </h1>
        <p className="text-lg sm:text-xl text-gray-600 mb-8">
          Oops! The page you are looking for doesn't exist or has been moved.
        </p>
        <Link
          to="/"
          className="inline-block bg-red-500 text-white px-6 py-3 rounded-full font-medium text-lg hover:bg-red-600 transition duration-300 shadow"
        >
          Go to Homepage
        </Link>
      </div>
      
    </div>
  );
};

export default ErrorPage;
