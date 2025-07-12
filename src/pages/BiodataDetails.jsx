import React, { useEffect, useState } from "react";
import Swal from "sweetalert2";
import { useAuth } from "../contexts/AuthContext";
import { useNavigate, useParams } from "react-router-dom";
import {
  FaHeart,
  FaRegHeart,
  FaPhone,
  FaEnvelope,
  FaStar,
  FaLock,
  FaChevronRight,
} from "react-icons/fa";
import { IoMdPersonAdd } from "react-icons/io";
import { MdVerified } from "react-icons/md";

const BiodataDetails = () => {
  const { currentUser, jwtToken, userData } = useAuth();
  const navigate = useNavigate();
  const { biodataId } = useParams();

  const [biodata, setBiodata] = useState(null);
  const [similarBiodatas, setSimilarBiodatas] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [hasApprovedRequest, setHasApprovedRequest] = useState(false);
  const [premiumRequestApproved, setPremiumRequestApproved] = useState(false);
  const [isFavorite, setIsFavorite] = useState(false);
  // Redirect if not logged in

  //console.log(biodata)
  useEffect(() => {
    if (!currentUser) {
      navigate("/login");
    }
  }, [currentUser, navigate]);

  // ✅ Check if already favorite when component loads
  useEffect(() => {
    const checkFavoriteStatus = async () => {
      if (!jwtToken || !currentUser || !biodataId) return;
      try {
        const res = await fetch(
          `https://matrimony-backend-p3ok.onrender.com/api/favourites/check/${biodataId}`,
          {
            headers: { Authorization: `Bearer ${jwtToken}` },
          }
        );
        const data = await res.json();
        setIsFavorite(data.isFavorite);
      } catch {
        console.error("Failed to fetch favourite status");
      }
    };

    checkFavoriteStatus();
  }, [jwtToken, currentUser, biodataId]);

  // Fetch biodata details and similar biodatas
  useEffect(() => {
    if (!jwtToken || !biodataId) return;

    const fetchBiodata = async () => {
      setLoading(true);
      setError(null);
      try {
        // Fetch biodata details
        const res = await fetch(
          `https://matrimony-backend-p3ok.onrender.com/api/biodata/${biodataId}`,
          {
            headers: { Authorization: `Bearer ${jwtToken}` },
          }
        );

        if (!res.ok) {
          const errData = await res.json();
          setError(errData.message || "Failed to fetch biodata.");
          setLoading(false);
          return;
        }

        const data = await res.json();
        setBiodata(data.biodata);

        // Fetch similar biodatas of same biodataType, excluding current
        const similarRes = await fetch(
          `https://matrimony-backend-p3ok.onrender.com/api/biodatas?biodataType=${data.biodata.biodataType}&limit=6`
        );
        const similarData = await similarRes.json();
        const filtered = (similarData.biodatas || []).filter(
          (b) => b.biodataId !== data.biodata.biodataId
        );
        setSimilarBiodatas(filtered.slice(0, 3));
      } catch (err) {
        setError(err.message || "Error fetching biodata.");
      }
      setLoading(false);
    };

    fetchBiodata();
  }, [biodataId, jwtToken]);

  // Check if user has approved contact request
  useEffect(() => {
    if (!jwtToken || !biodataId || !currentUser) return;

    const checkApprovedRequest = async () => {
      try {
        const res = await fetch(
          `https://matrimony-backend-p3ok.onrender.com/api/contact-request-status?biodataId=${biodataId}&userId=${currentUser.uid}`,
          {
            headers: { Authorization: `Bearer ${jwtToken}` },
          }
        );
        if (res.ok) {
          const data = await res.json();
          setHasApprovedRequest(data.approved);
        } else {
          setHasApprovedRequest(false);
        }
      } catch {
        setHasApprovedRequest(false);
      }
    };

    checkApprovedRequest();
  }, [biodataId, jwtToken, currentUser]);

  // Check premium request approval status
  useEffect(() => {
    if (!jwtToken || !currentUser) return;

    const fetchPremiumRequestStatus = async () => {
      try {
        const res = await fetch(
          `https://matrimony-backend-p3ok.onrender.com/api/premiumRequests/status/${currentUser.uid}`,
          {
            headers: { Authorization: `Bearer ${jwtToken}` },
          }
        );
        if (!res.ok) {
          setPremiumRequestApproved(false);
          return;
        }
        const data = await res.json();
        setPremiumRequestApproved(data.status === "approved");
      } catch {
        setPremiumRequestApproved(false);
      }
    };

    fetchPremiumRequestStatus();
  }, [jwtToken, currentUser]);

  // ✅ Modified handler with Swal
  const handleAddToFavourites = async () => {
    try {
      const res = await fetch(
        "https://matrimony-backend-p3ok.onrender.com/api/favourites",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${jwtToken}`,
          },
          body: JSON.stringify({ biodataId: Number(biodataId) }),
        }
      );
      const data = await res.json();
      if (data.success) {
        setIsFavorite(true);
        Swal.fire({
          toast: true,
          position: "top-end",
          icon: "success",
          title: "Added to Favourites",
          showConfirmButton: false,
          timer: 1500,
        });
      } else {
        Swal.fire({
          toast: true,
          position: "top-end",
          icon: "info",
          title: data.message || "Already in Favourites",
          showConfirmButton: false,
          timer: 1500,
        });
      }
    } catch {
      Swal.fire({
        toast: true,
        position: "top-end",
        icon: "error",
        title: "Error adding to Favourites",
        showConfirmButton: false,
        timer: 1500,
      });
    }
  };

  const handleRequestContact = () => {
    navigate(`/checkout/${biodataId}`);
  };

  if (loading)
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-pink-50 to-white">
        <div className="flex flex-col items-center">
          <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-pink-600"></div>
          <p className="mt-4 text-lg text-pink-700 font-medium">
            Loading profile...
          </p>
        </div>
      </div>
    );

  if (error)
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-pink-50 to-white">
        <div className="bg-white p-8 rounded-xl shadow-lg max-w-md w-full mx-4">
          <div className="text-center">
            <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-red-100">
              <svg
                className="h-6 w-6 text-red-600"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                />
              </svg>
            </div>
            <h3 className="mt-3 text-lg font-medium text-gray-900">
              Error loading profile
            </h3>
            <div className="mt-2 text-sm text-gray-500">
              <p>{error}</p>
            </div>
            <div className="mt-5">
              <button
                onClick={() => window.location.reload()}
                className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-pink-600 hover:bg-pink-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-pink-500"
              >
                Try again
              </button>
            </div>
          </div>
        </div>
      </div>
    );

  if (!biodata)
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-pink-50 to-white">
        <div className="bg-white p-8 rounded-xl shadow-lg max-w-md w-full mx-4 text-center">
          <div className="mx-auto flex items-center justify-center h-16 w-16 rounded-full bg-pink-100">
            <svg
              className="h-8 w-8 text-pink-600"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
          </div>
          <h3 className="mt-4 text-lg font-medium text-gray-900">
            Profile not found
          </h3>
          <p className="mt-2 text-sm text-gray-500">
            The requested biodata could not be found. It may have been removed
            or is temporarily unavailable.
          </p>
          <div className="mt-6">
            <button
              onClick={() => navigate("/biodatas")}
              className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-pink-600 hover:bg-pink-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-pink-500"
            >
              Browse other profiles
            </button>
          </div>
        </div>
      </div>
    );

  const isOwner = currentUser?.email === biodata.contactEmail;
  const isPremium =
    isOwner ||
    premiumRequestApproved ||
    userData?.isPremium === true ||
    userData?.role === "admin";

  const canViewContact = isPremium || hasApprovedRequest;
  //console.log(canViewContact)

  return (
    <div className="bg-gradient-to-br from-pink-50 to-white min-h-screen py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        {/* Main Profile Section */}
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
          <div className="md:flex">
            {/* Profile Image Section */}
            <div className="md:w-1/3 p-6 flex flex-col items-center justify-center bg-gradient-to-b from-pink-100 to-white">
              <div className="relative mb-6">
                <div className="relative group">
                  <img
                    src={
                      biodata.profileImage
                        ? biodata.profileImage
                        : biodata.biodataType === "bride"
                        ? "https://images.unsplash.com/photo-1534528741775-53994a69daeb?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80"
                        : "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80"
                    }
                    alt={biodata.name}
                    className="w-64 h-64 rounded-full object-cover border-8 border-white shadow-lg transform transition-transform duration-500 hover:scale-105"
                    onError={(e) => {
                      e.target.onerror = null; // Prevent infinite loop if fallback fails
                      e.target.src =
                        biodata.biodataType === "bride"
                          ? "https://images.unsplash.com/photo-1534528741775-53994a69daeb?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80"
                          : "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80";
                    }}
                  />
                  <div className="absolute inset-0 rounded-full border-8 border-transparent group-hover:border-pink-200 transition-all duration-300"></div>
                </div>

                {isPremium && (
                  <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 flex items-center bg-gradient-to-r from-pink-600 to-purple-600 text-white text-xs font-bold px-4 py-1 rounded-full shadow-lg">
                    <MdVerified className="mr-1" />
                    Verified Profile
                  </div>
                )}
              </div>

              <div className="text-center">
                <button
                  onClick={handleAddToFavourites}
                  className={`flex items-center justify-center px-6 py-2 rounded-full shadow-md transition-all ${
                    isFavorite
                      ? "bg-pink-600 text-white"
                      : "bg-white text-pink-600 border border-pink-200 hover:bg-pink-50"
                  }`}
                >
                  {isFavorite ? (
                    <FaHeart className="mr-2" />
                  ) : (
                    <FaRegHeart className="mr-2" />
                  )}
                  {isFavorite ? "Favorited" : "Add to Favorites"}
                </button>
              </div>
            </div>

            {/* Profile Details Section */}
            <div className="md:w-2/3 p-8">
              <div className="flex justify-between items-start mb-6">
                <div>
                  <h1 className="text-3xl font-bold text-gray-900">
                    {biodata.name}
                  </h1>
                  <div className="flex items-center mt-2">
                    <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-pink-100 text-pink-800 mr-3">
                      {biodata.biodataType}
                    </span>
                    <span className="text-gray-600">
                      Biodata ID: {biodata.biodataId}
                    </span>
                  </div>
                </div>
                {canViewContact && (
                  <div className="flex space-x-2">
                    <a
                      href={`tel:${biodata.mobile}`}
                      className="p-2 rounded-full bg-green-100 text-green-600 hover:bg-green-200 transition-colors"
                      title="Call"
                    >
                      <FaPhone />
                    </a>
                    <a
                      href={`mailto:${biodata.contactEmail}`}
                      className="p-2 rounded-full bg-blue-100 text-blue-600 hover:bg-blue-200 transition-colors"
                      title="Email"
                    >
                      <FaEnvelope />
                    </a>
                  </div>
                )}
              </div>

              {/* Profile Highlights */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
                <div className="bg-pink-50 rounded-lg p-4 text-center">
                  <p className="text-sm text-pink-600 font-medium">Age</p>
                  <p className="text-xl font-bold text-gray-900">
                    {biodata.age}
                  </p>
                </div>
                <div className="bg-pink-50 rounded-lg p-4 text-center">
                  <p className="text-sm text-pink-600 font-medium">Height</p>
                  <p className="text-xl font-bold text-gray-900">
                    {biodata.height}
                  </p>
                </div>
                <div className="bg-pink-50 rounded-lg p-4 text-center">
                  <p className="text-sm text-pink-600 font-medium">
                    Occupation
                  </p>
                  <p className="text-xl font-bold text-gray-900">
                    {biodata.occupation}
                  </p>
                </div>
                <div className="bg-pink-50 rounded-lg p-4 text-center">
                  <p className="text-sm text-pink-600 font-medium">Location</p>
                  <p className="text-xl font-bold text-gray-900">
                    {biodata.presentDivision}
                  </p>
                </div>
              </div>

              {/* Detailed Information */}
              <div className="space-y-8">
                {/* Personal Information */}
                <div className="border-b border-gray-200 pb-6">
                  <h3 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
                    <span className="w-2 h-6 bg-pink-600 rounded-full mr-3"></span>
                    Personal Information
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <p className="text-sm text-gray-500">Date of Birth</p>
                      <p className="text-gray-900 font-medium">
                        {biodata.dateOfBirth || "Not specified"}
                      </p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Weight</p>
                      <p className="text-gray-900 font-medium">
                        {biodata.weight}
                      </p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Race</p>
                      <p className="text-gray-900 font-medium">
                        {biodata.race}
                      </p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">
                        Permanent Division
                      </p>
                      <p className="text-gray-900 font-medium">
                        {biodata.permanentDivision}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Family Information */}
                <div className="border-b border-gray-200 pb-6">
                  <h3 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
                    <span className="w-2 h-6 bg-pink-600 rounded-full mr-3"></span>
                    Family Information
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <p className="text-sm text-gray-500">Father's Name</p>
                      <p className="text-gray-900 font-medium">
                        {biodata.fatherName}
                      </p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Mother's Name</p>
                      <p className="text-gray-900 font-medium">
                        {biodata.motherName}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Partner Expectations */}
                <div className="border-b border-gray-200 pb-6">
                  <h3 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
                    <span className="w-2 h-6 bg-pink-600 rounded-full mr-3"></span>
                    Partner Expectations
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                      <p className="text-sm text-gray-500">Age Range</p>
                      <p className="text-gray-900 font-medium">
                        {biodata.expectedPartnerAge}
                      </p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Height</p>
                      <p className="text-gray-900 font-medium">
                        {biodata.expectedPartnerHeight}
                      </p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Weight</p>
                      <p className="text-gray-900 font-medium">
                        {biodata.expectedPartnerWeight}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Contact Information */}
                <div className="pb-6">
                  <h3 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
                    <span className="w-2 h-6 bg-pink-600 rounded-full mr-3"></span>
                    Contact Information
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <p className="text-sm text-gray-500">Email</p>
                      <p className="text-gray-900 font-medium">
                        {canViewContact ? (
                          <p className="text-pink-600 hover:underline flex items-center">
                            {biodata.contactEmail}
                          </p>
                        ) : (
                          <span className="text-gray-500 flex items-center">
                            <FaLock className="mr-2" /> Hidden - Request access
                          </span>
                        )}
                      </p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Mobile</p>
                      <p className="text-gray-900 font-medium">
                        {canViewContact ? (
                          <p className="text-pink-600 hover:underline flex items-center">
                            {biodata.mobile}
                            
                          </p>
                        ) : (
                          <span className="text-gray-500 flex items-center">
                            <FaLock className="mr-2" /> Hidden - Request access
                          </span>
                        )}
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="mt-8 flex flex-wrap gap-4">
                {!canViewContact && (
                  <button
                    onClick={handleRequestContact}
                    className="flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-full shadow-sm text-white bg-gradient-to-r from-pink-600 to-orange-500 hover:from-pink-700 hover:to-orange-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-pink-500 transition-all hover:shadow-lg"
                  >
                    <IoMdPersonAdd className="mr-2" />
                    Request Contact Information
                  </button>
                )}
                <button
                  onClick={() => navigate("/biodatas")}
                  className="flex items-center justify-center px-8 py-3 border border-gray-300 text-base font-medium rounded-full shadow-sm text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-pink-500 transition-all"
                >
                  Browse More Profiles
                  <FaChevronRight className="ml-2" />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Similar Profiles Section */}
        {similarBiodatas.length > 0 && (
          <div className="mt-16">
            <div className="flex justify-between items-center mb-8">
              <h2 className="text-2xl font-bold text-gray-900">
                Similar Profiles You Might Like
              </h2>
              <button
                onClick={() => navigate("/biodatas")}
                className="text-pink-600 hover:text-pink-800 font-medium flex items-center"
              >
                View all <FaChevronRight className="ml-1" />
              </button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {similarBiodatas.map((b) => (
                <div
                  key={b.biodataId}
                  className="bg-white rounded-xl shadow-md overflow-hidden transition-all duration-300 hover:shadow-xl hover:-translate-y-1 cursor-pointer"
                  onClick={() => navigate(`/biodata/${b.biodataId}`)}
                >
                  <div className="relative">
                    <img
                      src={
                        b.profileImage ||
                        (b.biodataType === "bride"
                          ? "https://images.unsplash.com/photo-1534528741775-53994a69daeb?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80"
                          : "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80")
                      }
                      alt={b.name}
                      className="w-full h-48 object-cover"
                    />
                    <div className="absolute top-2 right-2 bg-white/80 backdrop-blur-sm rounded-full p-1 shadow">
                      <FaHeart className="text-pink-600" />
                    </div>
                  </div>
                  <div className="p-6">
                    <div className="flex justify-between items-start">
                      <h3 className="text-lg font-semibold text-gray-900">
                        {b.name}
                      </h3>
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-pink-100 text-pink-800">
                        {b.biodataType}
                      </span>
                    </div>
                    <div className="mt-4 grid grid-cols-2 gap-3">
                      <div>
                        <p className="text-xs text-gray-500">Age</p>
                        <p className="text-sm font-medium text-gray-900">
                          {b.age}
                        </p>
                      </div>
                      <div>
                        <p className="text-xs text-gray-500">Height</p>
                        <p className="text-sm font-medium text-gray-900">
                          {b.height}
                        </p>
                      </div>
                      <div>
                        <p className="text-xs text-gray-500">Occupation</p>
                        <p className="text-sm font-medium text-gray-900">
                          {b.occupation}
                        </p>
                      </div>
                      <div>
                        <p className="text-xs text-gray-500">Location</p>
                        <p className="text-sm font-medium text-gray-900">
                          {b.presentDivision}
                        </p>
                      </div>
                    </div>
                    <button className="mt-6 w-full flex items-center justify-center px-4 py-2 border border-transparent rounded-full text-sm font-medium text-white bg-pink-600 hover:bg-pink-700 transition-colors">
                      View Full Profile
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default BiodataDetails;
