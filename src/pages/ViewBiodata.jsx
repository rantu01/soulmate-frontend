import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import {
  UserCircleIcon,
  IdentificationIcon,
  CakeIcon,
  ScaleIcon,
  BriefcaseIcon,
  UserGroupIcon,
  MapPinIcon,
  HeartIcon,
  PhoneIcon,
  EnvelopeIcon,
  CheckBadgeIcon,
  ArrowLeftIcon,
  XMarkIcon,
  CheckIcon
} from "@heroicons/react/24/outline";

const ViewBiodata = () => {
  const { currentUser, jwtToken } = useAuth();
  const [biodata, setBiodata] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [isPremiumRequested, setIsPremiumRequested] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchBiodata = async () => {
      try {
        setLoading(true);
        setError(null);
        const res = await fetch(
          `https://matrimony-backend-p3ok.onrender.com/api/my-biodata?email=${currentUser.email}`,
          {
            headers: {
              Authorization: `Bearer ${jwtToken}`,
            },
          }
        );

        if (!res.ok) {
          const err = await res.json();
          throw new Error(err.message || "Failed to fetch biodata");
        }

        const data = await res.json();
        if (data.success) {
          setBiodata(data.biodata);
          if (data.biodata?.premiumRequested) {
            setIsPremiumRequested(true);
          }
        } else {
          throw new Error(data.message || "No biodata found");
        }
      } catch (error) {
        console.error("Error:", error);
        setError(error.message);
        setBiodata(null);
      } finally {
        setLoading(false);
      }
    };

    if (currentUser?.email && jwtToken) {
      fetchBiodata();
    } else {
      navigate("/login");
    }
  }, [currentUser, jwtToken, navigate]);

  const handleMakePremium = async () => {
    try {
      const res = await fetch("https://matrimony-backend-p3ok.onrender.com/api/request-premium", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${jwtToken}`,
        },
        body: JSON.stringify({ biodataId: biodata.biodataId }),
      });
      
      const data = await res.json();
      if (data.success) {
        setIsPremiumRequested(true);
        setShowModal(false);
      } else {
        throw new Error(data.message || "Request failed");
      }
    } catch (error) {
      console.error("Error:", error);
      setError(error.message);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-purple-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading your biodata...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="bg-white p-6 rounded-lg shadow-md max-w-md text-center">
          <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-red-100">
            <XMarkIcon className="h-6 w-6 text-red-600" />
          </div>
          <h3 className="mt-3 text-lg font-medium text-gray-900">Error Loading Biodata</h3>
          <p className="mt-2 text-sm text-gray-500">{error}</p>
          <div className="mt-4 space-x-3">
            <button
              onClick={() => window.location.reload()}
              className="inline-flex items-center rounded-md border border-transparent bg-gray-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2"
            >
              Try Again
            </button>
            <button
              onClick={() => navigate("/dashboard/edit-biodata")}
              className="inline-flex items-center rounded-md border border-transparent bg-purple-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2"
            >
              Create Biodata
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (!biodata) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="bg-white p-6 rounded-lg shadow-md max-w-md text-center">
          <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-blue-100">
            <UserCircleIcon className="h-6 w-6 text-blue-600" />
          </div>
          <h3 className="mt-3 text-lg font-medium text-gray-900">No Biodata Found</h3>
          <p className="mt-2 text-sm text-gray-500">You haven't created a biodata yet.</p>
          <div className="mt-4">
            <button
              onClick={() => navigate("/dashboard/edit-biodata")}
              className="inline-flex items-center rounded-md border border-transparent bg-purple-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2"
            >
              Create Biodata
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white rounded-xl shadow-md overflow-hidden">
          {/* Header */}
          <div className="bg-gradient-to-r from-purple-600 to-indigo-600 px-6 py-4">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-2xl font-bold text-white">Your Biodata Profile</h2>
                {biodata.isPremium && <p className="text-white">you are <span className="text-pink-300">premium</span></p>}
                <div className="flex items-center mt-1">
                  {biodata.premium ? (
                    <span className="inline-flex items-center rounded-full bg-yellow-100 px-2.5 py-0.5 text-xs font-medium text-yellow-800">
                      <CheckBadgeIcon className="h-3 w-3 mr-1" />
                      Premium Member
                    </span>
                  ) : isPremiumRequested ? (
                    <span className="inline-flex items-center rounded-full bg-blue-100 px-2.5 py-0.5 text-xs font-medium text-blue-800">
                      Premium Request Pending
                    </span>
                  ) : null}
                </div>
              </div>
              <button
                onClick={() => navigate(-1)}
                className="inline-flex items-center rounded-full bg-white bg-opacity-20 p-2 text-white hover:bg-opacity-30 focus:outline-none"
              >
                <ArrowLeftIcon className="h-5 w-5" />
              </button>
            </div>
          </div>

          {/* Main Content */}
          <div className="p-6">
            <div className="flex flex-col md:flex-row gap-8">
              {/* Profile Image */}
              <div className="w-full md:w-1/3">
                <div className="relative">
                  {biodata.profileImage ? (
                    <img
                      src={biodata.profileImage}
                      alt={biodata.name}
                      className="w-full h-auto rounded-lg shadow-md object-cover aspect-[3/4]"
                      onError={(e) => {
                        e.target.src = "https://via.placeholder.com/400x500?text=No+Image";
                        e.target.className = "w-full h-auto rounded-lg shadow-md bg-gray-100 aspect-[3/4]";
                      }}
                    />
                  ) : (
                    <div className="w-full aspect-[3/4] bg-gray-100 rounded-lg shadow-md flex items-center justify-center">
                      <UserCircleIcon className="h-24 w-24 text-gray-400" />
                    </div>
                  )}
                </div>

                {/* Premium Button */}
                {!biodata.isPremium && !isPremiumRequested && (
                  <button
                    onClick={() => setShowModal(true)}
                    className="mt-6 w-full bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white font-medium py-2 px-4 rounded-lg shadow-md transition-colors flex items-center justify-center"
                  >
                    <CheckBadgeIcon className="h-5 w-5 mr-2" />
                    Make Premium
                  </button>
                )}

                {/* Edit Button */}
                <button
                  onClick={() => navigate(`/dashboard/edit-biodata`)}
                  className="mt-4 w-full border border-purple-600 text-purple-600 hover:bg-purple-50 font-medium py-2 px-4 rounded-lg transition-colors"
                >
                  Edit Biodata
                </button>
              </div>

              {/* Biodata Details */}
              <div className="w-full md:w-2/3">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Personal Information */}
                  <div className="md:col-span-2">
                    <h3 className="text-lg font-semibold text-gray-800 border-b pb-2 mb-4 flex items-center">
                      <IdentificationIcon className="h-5 w-5 mr-2 text-purple-600" />
                      Personal Information
                    </h3>
                  </div>

                  <div>
                    <p className="text-sm text-gray-500">Name</p>
                    <p className="font-medium">{biodata.name}</p>
                  </div>

                  <div>
                    <p className="text-sm text-gray-500">Biodata Type</p>
                    <p className="font-medium capitalize">{biodata.biodataType}</p>
                  </div>

                  <div>
                    <p className="text-sm text-gray-500">Age</p>
                    <p className="font-medium">{biodata.age}</p>
                  </div>

                  <div>
                    <p className="text-sm text-gray-500">Date of Birth</p>
                    <p className="font-medium">{biodata.dateOfBirth || "Not specified"}</p>
                  </div>

                  <div>
                    <p className="text-sm text-gray-500">Height</p>
                    <p className="font-medium">{biodata.height || "Not specified"}</p>
                  </div>

                  <div>
                    <p className="text-sm text-gray-500">Weight</p>
                    <p className="font-medium">{biodata.weight || "Not specified"}</p>
                  </div>

                  <div>
                    <p className="text-sm text-gray-500">Occupation</p>
                    <p className="font-medium">{biodata.occupation || "Not specified"}</p>
                  </div>

                  <div>
                    <p className="text-sm text-gray-500">Race</p>
                    <p className="font-medium">{biodata.race || "Not specified"}</p>
                  </div>

                  {/* Family Information */}
                  <div className="md:col-span-2 mt-4">
                    <h3 className="text-lg font-semibold text-gray-800 border-b pb-2 mb-4 flex items-center">
                      <UserGroupIcon className="h-5 w-5 mr-2 text-purple-600" />
                      Family Information
                    </h3>
                  </div>

                  <div>
                    <p className="text-sm text-gray-500">Father's Name</p>
                    <p className="font-medium">{biodata.fatherName || "Not specified"}</p>
                  </div>

                  <div>
                    <p className="text-sm text-gray-500">Mother's Name</p>
                    <p className="font-medium">{biodata.motherName || "Not specified"}</p>
                  </div>

                  {/* Location Information */}
                  <div className="md:col-span-2 mt-4">
                    <h3 className="text-lg font-semibold text-gray-800 border-b pb-2 mb-4 flex items-center">
                      <MapPinIcon className="h-5 w-5 mr-2 text-purple-600" />
                      Location Information
                    </h3>
                  </div>

                  <div>
                    <p className="text-sm text-gray-500">Permanent Division</p>
                    <p className="font-medium">{biodata.permanentDivision || "Not specified"}</p>
                  </div>

                  <div>
                    <p className="text-sm text-gray-500">Present Division</p>
                    <p className="font-medium">{biodata.presentDivision || "Not specified"}</p>
                  </div>

                  {/* Partner Expectations */}
                  <div className="md:col-span-2 mt-4">
                    <h3 className="text-lg font-semibold text-gray-800 border-b pb-2 mb-4 flex items-center">
                      <HeartIcon className="h-5 w-5 mr-2 text-purple-600" />
                      Partner Expectations
                    </h3>
                  </div>

                  <div>
                    <p className="text-sm text-gray-500">Expected Age</p>
                    <p className="font-medium">{biodata.expectedPartnerAge || "Not specified"}</p>
                  </div>

                  <div>
                    <p className="text-sm text-gray-500">Expected Height</p>
                    <p className="font-medium">{biodata.expectedPartnerHeight || "Not specified"}</p>
                  </div>

                  <div>
                    <p className="text-sm text-gray-500">Expected Weight</p>
                    <p className="font-medium">{biodata.expectedPartnerWeight || "Not specified"}</p>
                  </div>

                  {/* Contact Information */}
                  <div className="md:col-span-2 mt-4">
                    <h3 className="text-lg font-semibold text-gray-800 border-b pb-2 mb-4 flex items-center">
                      <EnvelopeIcon className="h-5 w-5 mr-2 text-purple-600" />
                      Contact Information
                    </h3>
                  </div>

                  <div>
                    <p className="text-sm text-gray-500">Email</p>
                    <p className="font-medium">{biodata.contactEmail}</p>
                  </div>

                  <div>
                    <p className="text-sm text-gray-500">Mobile</p>
                    <p className="font-medium">{biodata.mobile || "Not specified"}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Premium Confirmation Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg shadow-xl max-w-md w-full">
            <div className="p-6">
              <div className="flex items-center justify-center w-12 h-12 mx-auto rounded-full bg-purple-100">
                <CheckBadgeIcon className="h-6 w-6 text-purple-600" />
              </div>
              <h3 className="mt-3 text-lg font-medium text-gray-900 text-center">Upgrade to Premium</h3>
              <div className="mt-2">
                <p className="text-sm text-gray-500 text-center">
                  Are you sure you want to request premium status for this biodata?
                </p>
                <ul className="mt-4 text-sm text-gray-600 space-y-2">
                  <li className="flex items-start">
                    <CheckIcon className="h-5 w-5 text-green-500 mr-2 flex-shrink-0" />
                    Increased visibility in search results
                  </li>
                  <li className="flex items-start">
                    <CheckIcon className="h-5 w-5 text-green-500 mr-2 flex-shrink-0" />
                    Priority placement in listings
                  </li>
                  <li className="flex items-start">
                    <CheckIcon className="h-5 w-5 text-green-500 mr-2 flex-shrink-0" />
                    Premium badge on your profile
                  </li>
                </ul>
              </div>
              <div className="mt-6 flex justify-center gap-4">
                <button
                  type="button"
                  className="inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-purple-600 text-base font-medium text-white hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 sm:text-sm"
                  onClick={handleMakePremium}
                >
                  Yes, Make Premium
                </button>
                <button
                  type="button"
                  className="inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 sm:text-sm"
                  onClick={() => setShowModal(false)}
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ViewBiodata;