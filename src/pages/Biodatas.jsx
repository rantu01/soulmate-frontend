import React, { useEffect, useState } from "react";
import { useAuth } from "../contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import { FaHeart, FaSearch, FaFilter, FaMapMarkerAlt, FaUserTie, FaBirthdayCake, FaIdCard } from "react-icons/fa";

const divisions = [
  "Dhaka",
  "Chattagram",
  "Rangpur",
  "Barisal",
  "Khulna",
  "Mymensingh",
  "Sylhet",
];

const BiodatasPage = () => {
  const { currentUser } = useAuth();
  const navigate = useNavigate();

  const [filters, setFilters] = useState({
    ageMin: 18,
    ageMax: 60,
    biodataType: "",
    division: "",
  });

  const [biodatas, setBiodatas] = useState([]);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);

  const ITEMS_PER_PAGE = 8;

  const normalizeNumber = (val) => {
    if (val == null) return null;
    if (typeof val === "number") return val;
    if (typeof val === "string") return Number(val);
    if (typeof val === "object") {
      if (val.$numberInt) return Number(val.$numberInt);
      if (val.$numberDouble) return Number(val.$numberDouble);
    }
    return null;
  };

  useEffect(() => {
    const fetchBiodatas = async () => {
      setLoading(true);
      try {
        const params = new URLSearchParams({
          page,
          limit: ITEMS_PER_PAGE.toString(),
          ageMin: filters.ageMin.toString(),
          ageMax: filters.ageMax.toString(),
        });
        if (filters.biodataType) params.append("biodataType", filters.biodataType);
        if (filters.division) params.append("division", filters.division);

        const res = await fetch(`https://matrimony-backend-p3ok.onrender.com/api/biodatas?${params.toString()}`, {
          headers: {
            Authorization: `Bearer ${currentUser?.jwtToken || ""}`,
          },
        });

        if (!res.ok) {
          console.error("Failed to fetch biodatas:", await res.text());
          setBiodatas([]);
          setTotal(0);
          setLoading(false);
          return;
        }

        const data = await res.json();
        const normalizedBiodatas = data.biodatas.map((b) => ({
          ...b,
          biodataId: normalizeNumber(b.biodataId),
          age: normalizeNumber(b.age),
          expectedPartnerAge: normalizeNumber(b.expectedPartnerAge),
        }));

        setBiodatas(normalizedBiodatas);
        setTotal(data.total || 0);
      } catch (error) {
        console.error("Failed to fetch biodatas:", error);
        setBiodatas([]);
        setTotal(0);
      }
      setLoading(false);
    };

    fetchBiodatas();
  }, [filters, page, currentUser]);

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters((prev) => ({ ...prev, [name]: value }));
    setPage(1);
  };

  const handleAgeMinChange = (e) => {
    let val = Number(e.target.value);
    if (val > filters.ageMax) val = filters.ageMax;
    setFilters((prev) => ({ ...prev, ageMin: val }));
    setPage(1);
  };

  const handleAgeMaxChange = (e) => {
    let val = Number(e.target.value);
    if (val < filters.ageMin) val = filters.ageMin;
    setFilters((prev) => ({ ...prev, ageMax: val }));
    setPage(1);
  };

  const handleViewProfile = (biodataId) => {
    if (!currentUser) {
      navigate("/login");
      return;
    }
    navigate(`/biodata/${biodataId}`);
  };

  const totalPages = Math.ceil(total / ITEMS_PER_PAGE);

  return (
    <div className="min-h-screen bg-gradient-to-b from-pink-50 to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-pink-600 mb-4">
            Find Your Perfect Match
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Browse through thousands of verified profiles to find your life partner
          </p>
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Filters sidebar */}
          <aside className="lg:w-80 bg-white p-6 rounded-2xl shadow-lg">
            <div className="flex items-center mb-6 pb-4 border-b border-gray-100">
              <FaFilter className="text-pink-500 mr-3" />
              <h2 className="text-2xl font-bold text-gray-800">
                Filter Profiles
              </h2>
            </div>

            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center">
                  <FaBirthdayCake className="mr-2 text-pink-500" />
                  Age Range
                </label>
                <div className="flex items-center space-x-4">
                  <div className="relative flex-1">
                    <input
                      type="number"
                      name="ageMin"
                      min={18}
                      max={filters.ageMax}
                      value={filters.ageMin}
                      onChange={handleAgeMinChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-pink-500"
                    />
                  </div>
                  <span className="text-gray-500">to</span>
                  <div className="relative flex-1">
                    <input
                      type="number"
                      name="ageMax"
                      min={filters.ageMin}
                      max={60}
                      value={filters.ageMax}
                      onChange={handleAgeMaxChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-pink-500"
                    />
                  </div>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center">
                  <FaHeart className="mr-2 text-pink-500" />
                  Biodata Type
                </label>
                <select
                  name="biodataType"
                  value={filters.biodataType}
                  onChange={handleFilterChange}
                  className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-pink-500 sm:text-sm rounded-lg shadow-sm"
                >
                  <option value="">All Types</option>
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center">
                  <FaMapMarkerAlt className="mr-2 text-pink-500" />
                  Division
                </label>
                <select
                  name="division"
                  value={filters.division}
                  onChange={handleFilterChange}
                  className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-pink-500 sm:text-sm rounded-lg shadow-sm"
                >
                  <option value="">All Divisions</option>
                  {divisions.map((d) => (
                    <option key={d} value={d}>
                      {d}
                    </option>
                  ))}
                </select>
              </div>

              <button
                onClick={() => setFilters({
                  ageMin: 18,
                  ageMax: 60,
                  biodataType: "",
                  division: "",
                })}
                className="w-full py-2 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-pink-700 bg-pink-100 hover:bg-pink-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-pink-500 transition-colors flex items-center justify-center"
              >
                <FaSearch className="mr-2" />
                Reset Filters
              </button>
            </div>
          </aside>

          {/* Biodatas list */}
          <main className="flex-1">
            <div className="bg-white p-6 rounded-2xl shadow-lg mb-6">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <h2 className="text-2xl font-bold text-gray-800 mb-1">Browse Profiles</h2>
                  <p className="text-gray-600">
                    Showing {biodatas.length} of {total} results
                  </p>
                </div>
                {total > 0 && (
                  <div className="mt-3 sm:mt-0">
                    <div className="flex items-center text-sm text-gray-500">
                      <span className="mr-2">Page</span>
                      <select
                        value={page}
                        onChange={(e) => setPage(Number(e.target.value))}
                        className="border border-gray-300 rounded-md px-3 py-1 focus:outline-none focus:ring-2 focus:ring-pink-500"
                      >
                        {Array.from({ length: totalPages }, (_, i) => (
                          <option key={i + 1} value={i + 1}>
                            {i + 1}
                          </option>
                        ))}
                      </select>
                      <span className="ml-2">of {totalPages}</span>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {loading ? (
              <div className="bg-white p-12 rounded-2xl shadow-lg flex flex-col items-center justify-center">
                <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-pink-500 mb-4"></div>
                <p className="text-gray-600">Loading profiles...</p>
              </div>
            ) : biodatas.length === 0 ? (
              <div className="bg-white p-12 rounded-2xl shadow-lg text-center">
                <svg
                  className="mx-auto h-16 w-16 text-gray-400"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1.5}
                    d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
                <h3 className="mt-4 text-xl font-medium text-gray-900">
                  No profiles found
                </h3>
                <p className="mt-2 text-gray-500">
                  Try adjusting your search filters or check back later
                </p>
                <button
                  onClick={() => setFilters({
                    ageMin: 18,
                    ageMax: 60,
                    biodataType: "",
                    division: "",
                  })}
                  className="mt-6 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-lg shadow-sm text-white bg-gradient-to-r from-pink-500 to-purple-500 hover:from-pink-600 hover:to-purple-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-pink-500 transition-colors"
                >
                  Reset All Filters
                </button>
              </div>
            ) : (
              <>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {biodatas.map((b) => (
                    <div
                      key={b.biodataId}
                      className="bg-white rounded-2xl shadow-lg overflow-hidden transition-all duration-300 hover:shadow-xl hover:transform hover:-translate-y-1"
                    >
                      <div className="p-6 flex flex-col sm:flex-row items-start space-y-4 sm:space-y-0 sm:space-x-6">
                        <div className="flex-shrink-0 relative">
                          <img
                            src={b.profileImage || "https://images.unsplash.com/photo-1534528741775-53994a69daeb?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80"}
                            alt={b.name}
                            className="h-32 w-32 rounded-xl object-cover border-4 border-pink-100"
                          />
                          <div className="absolute -bottom-2 -right-2 bg-pink-500 text-white text-xs font-bold px-2 py-1 rounded-full">
                            #{b.biodataId}
                          </div>
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex justify-between items-start">
                            <div>
                              <h3 className="text-xl font-bold text-gray-800">
                                {b.name || "Not specified"}
                              </h3>
                              <p className="text-gray-500">
                                {b.occupation || "Occupation not specified"}
                              </p>
                            </div>
                            <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${
                              b.biodataType === "Male" 
                                ? "bg-blue-100 text-blue-800" 
                                : "bg-pink-100 text-pink-800"
                            }`}>
                              {b.biodataType}
                            </span>
                          </div>
                          <div className="mt-4 grid grid-cols-2 gap-4">
                            <div className="flex items-center">
                              <FaBirthdayCake className="text-pink-500 mr-2" />
                              <div>
                                <p className="text-xs text-gray-500">Age</p>
                                <p className="text-sm font-medium text-gray-900">{b.age || "N/A"}</p>
                              </div>
                            </div>
                            <div className="flex items-center">
                              <FaMapMarkerAlt className="text-pink-500 mr-2" />
                              <div>
                                <p className="text-xs text-gray-500">Location</p>
                                <p className="text-sm font-medium text-gray-900">{b.permanentDivision || "N/A"}</p>
                              </div>
                            </div>
                            <div className="flex items-center">
                              <FaUserTie className="text-pink-500 mr-2" />
                              <div>
                                <p className="text-xs text-gray-500">Profession</p>
                                <p className="text-sm font-medium text-gray-900">{b.occupation || "N/A"}</p>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="px-6 py-4 bg-gradient-to-r from-pink-50 to-purple-50 text-right border-t border-gray-100">
                        <button
                          onClick={() => handleViewProfile(b.biodataId)}
                          className="inline-flex items-center px-5 py-2 border border-transparent text-sm font-medium rounded-lg shadow-sm text-white bg-gradient-to-r from-pink-600 to-purple-600 hover:from-pink-700 hover:to-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-pink-500 transition-colors"
                        >
                          View Full Profile
                        </button>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Pagination */}
                {totalPages > 1 && (
                  <div className="mt-12 flex items-center justify-between bg-white p-6 rounded-2xl shadow-lg">
                    <div className="flex-1 flex justify-between sm:hidden">
                      <button
                        disabled={page === 1}
                        onClick={() => setPage((p) => Math.max(p - 1, 1))}
                        className={`relative inline-flex items-center px-4 py-2 border text-sm font-medium rounded-lg ${
                          page === 1
                            ? "bg-gray-100 text-gray-400 border-gray-200"
                            : "bg-white text-gray-700 hover:bg-gray-50 border-gray-300"
                        }`}
                      >
                        Previous
                      </button>
                      <button
                        disabled={page === totalPages}
                        onClick={() => setPage((p) => Math.min(p + 1, totalPages))}
                        className={`ml-3 relative inline-flex items-center px-4 py-2 border text-sm font-medium rounded-lg ${
                          page === totalPages
                            ? "bg-gray-100 text-gray-400 border-gray-200"
                            : "bg-white text-gray-700 hover:bg-gray-50 border-gray-300"
                        }`}
                      >
                        Next
                      </button>
                    </div>
                    <div className="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
                      <div>
                        <p className="text-sm text-gray-700">
                          Showing <span className="font-medium">{(page - 1) * ITEMS_PER_PAGE + 1}</span> to{" "}
                          <span className="font-medium">
                            {Math.min(page * ITEMS_PER_PAGE, total)}
                          </span>{" "}
                          of <span className="font-medium">{total}</span> profiles
                        </p>
                      </div>
                      <div>
                        <nav
                          className="relative z-0 inline-flex rounded-lg shadow-sm -space-x-px"
                          aria-label="Pagination"
                        >
                          <button
                            disabled={page === 1}
                            onClick={() => setPage((p) => Math.max(p - 1, 1))}
                            className={`relative inline-flex items-center px-3 py-2 rounded-l-lg border text-sm font-medium ${
                              page === 1
                                ? "bg-gray-100 text-gray-400 border-gray-200 cursor-not-allowed"
                                : "bg-white text-gray-500 hover:bg-gray-50 border-gray-300"
                            }`}
                          >
                            <span className="sr-only">Previous</span>
                            <svg
                              className="h-5 w-5"
                              xmlns="http://www.w3.org/2000/svg"
                              viewBox="0 0 20 20"
                              fill="currentColor"
                              aria-hidden="true"
                            >
                              <path
                                fillRule="evenodd"
                                d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z"
                                clipRule="evenodd"
                              />
                            </svg>
                          </button>
                          {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                            let pageNum;
                            if (totalPages <= 5) {
                              pageNum = i + 1;
                            } else if (page <= 3) {
                              pageNum = i + 1;
                            } else if (page >= totalPages - 2) {
                              pageNum = totalPages - 4 + i;
                            } else {
                              pageNum = page - 2 + i;
                            }
                            return (
                              <button
                                key={pageNum}
                                onClick={() => setPage(pageNum)}
                                className={`relative inline-flex items-center px-4 py-2 border text-sm font-medium ${
                                  page === pageNum
                                    ? "z-10 bg-gradient-to-r from-pink-500 to-purple-500 text-white border-transparent"
                                    : "bg-white text-gray-500 hover:bg-gray-50 border-gray-300"
                                }`}
                              >
                                {pageNum}
                              </button>
                            );
                          })}
                          <button
                            disabled={page === totalPages}
                            onClick={() => setPage((p) => Math.min(p + 1, totalPages))}
                            className={`relative inline-flex items-center px-3 py-2 rounded-r-lg border text-sm font-medium ${
                              page === totalPages
                                ? "bg-gray-100 text-gray-400 border-gray-200 cursor-not-allowed"
                                : "bg-white text-gray-500 hover:bg-gray-50 border-gray-300"
                            }`}
                          >
                            <span className="sr-only">Next</span>
                            <svg
                              className="h-5 w-5"
                              xmlns="http://www.w3.org/2000/svg"
                              viewBox="0 0 20 20"
                              fill="currentColor"
                              aria-hidden="true"
                            >
                              <path
                                fillRule="evenodd"
                                d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                                clipRule="evenodd"
                              />
                            </svg>
                          </button>
                        </nav>
                      </div>
                    </div>
                  </div>
                )}
              </>
            )}
          </main>
        </div>
      </div>
    </div>
  );
};

export default BiodatasPage;