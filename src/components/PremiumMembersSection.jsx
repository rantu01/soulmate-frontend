import React, { useEffect, useState } from "react";
import { useAuth } from "../contexts/AuthContext";
import { useNavigate } from "react-router-dom";

const PremiumMembersSection = () => {
  const { currentUser } = useAuth();
  const navigate = useNavigate();

  const [premiumBiodatas, setPremiumBiodatas] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [sortOrder, setSortOrder] = useState("asc");

  useEffect(() => {
    const fetchPremiumBiodatas = async () => {
      setLoading(true);
      setError(null);
      try {
        const res = await fetch(`https://matrimony-backend-p3ok.onrender.com/api/biodatas?premium=true&limit=6`);
        const data = await res.json();
        if (res.ok) {
          let biodatas = data.biodatas || [];
          biodatas.sort((a, b) => {
            const ageA = Number(a.age) || 0;
            const ageB = Number(b.age) || 0;
            return sortOrder === "asc" ? ageA - ageB : ageB - ageA;
          });
          setPremiumBiodatas(biodatas);
        } else {
          setError(data.message || "Failed to fetch premium biodatas.");
        }
      } catch (err) {
        setError(err.message || "Error fetching biodatas.");
      }
      setLoading(false);
    };

    fetchPremiumBiodatas();
  }, [sortOrder]);

  const handleViewProfile = (biodataId) => {
    if (!currentUser) {
      navigate("/login");
      return;
    }
    navigate(`/biodata/${biodataId}`);
  };

  return (
    <section className="max-w-7xl mx-auto px-4 py-12 sm:px-6 lg:px-8">
      <div className="text-center mb-12">
        <h2 className="text-4xl font-extrabold text-gray-900 sm:text-5xl">
          <span className="block">Premium</span>
          <span className="block text-pink-600 mt-2">Member Profiles</span>
        </h2>
        <p className="mt-4 max-w-2xl text-xl text-gray-600 mx-auto">
          Meet our exclusive premium members - verified profiles with complete information
        </p>
      </div>

      <div className="flex flex-col sm:flex-row justify-between items-center mb-8 gap-4">
        <div className="flex-1 w-full sm:w-auto">
          <div className="relative">
            <label htmlFor="sortOrder" className="sr-only">Sort by Age</label>
            <select
              id="sortOrder"
              value={sortOrder}
              onChange={(e) => setSortOrder(e.target.value)}
              className="block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-pink-500 focus:border-pink-500 sm:text-sm rounded-md shadow-sm"
            >
              <option value="asc">Age: Low to High</option>
              <option value="desc">Age: High to Low</option>
            </select>
          </div>
        </div>
        <div className="flex-1 text-right">
          <p className="text-sm text-gray-500">
            Showing {premiumBiodatas.length} premium members
          </p>
        </div>
      </div>

      {loading ? (
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-pink-600"></div>
        </div>
      ) : error ? (
        <div className="bg-red-50 border-l-4 border-red-500 p-4">
          <div className="flex">
            <div className="flex-shrink-0">
              <svg className="h-5 w-5 text-red-500" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
              </svg>
            </div>
            <div className="ml-3">
              <p className="text-sm text-red-700">{error}</p>
            </div>
          </div>
        </div>
      ) : premiumBiodatas.length === 0 ? (
        <div className="text-center py-12">
          <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <h3 className="mt-2 text-lg font-medium text-gray-900">No premium members found</h3>
          <p className="mt-1 text-sm text-gray-500">Check back later or try adjusting your search criteria.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {premiumBiodatas.map((biodata) => (
            <div
              key={biodata.biodataId}
              className="bg-white rounded-xl shadow-md overflow-hidden transition-all duration-300 hover:shadow-xl hover:-translate-y-1"
            >
              <div className="relative">
                <img
                  src={biodata.profileImage || "https://images.unsplash.com/photo-1517841905240-472988babdf9?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80"}
                  alt={biodata.name || "Profile"}
                  className="w-full h-64 object-cover"
                />
                <div className="absolute top-4 right-4 bg-pink-600 text-white text-xs font-bold px-2 py-1 rounded-full">
                  Premium
                </div>
              </div>
              
              <div className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-xl font-bold text-gray-900">{biodata.name || "Not specified"}</h3>
                  <span className="bg-pink-100 text-pink-800 text-xs font-semibold px-2.5 py-0.5 rounded">
                    ID: {biodata.biodataId}
                  </span>
                </div>
                
                <div className="grid grid-cols-2 gap-4 mb-6">
                  <div>
                    <p className="text-sm font-medium text-gray-500">Age</p>
                    <p className="text-lg font-semibold text-gray-900">{biodata.age || "N/A"}</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-500">Type</p>
                    <p className="text-lg font-semibold text-gray-900 capitalize">{biodata.biodataType || "N/A"}</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-500">Location</p>
                    <p className="text-lg font-semibold text-gray-900">{biodata.permanentDivision || "N/A"}</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-500">Occupation</p>
                    <p className="text-lg font-semibold text-gray-900">{biodata.occupation || "N/A"}</p>
                  </div>
                </div>
                
                <button
                  onClick={() => handleViewProfile(biodata.biodataId)}
                  className="w-full bg-gradient-to-r from-pink-600 to-purple-600 hover:from-pink-700 hover:to-purple-700 text-white font-medium py-2 px-4 rounded-lg transition duration-300 shadow-md hover:shadow-lg"
                >
                  View Full Profile
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </section>
  );
};

export default PremiumMembersSection;