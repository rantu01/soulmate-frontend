import React, { useEffect, useState } from "react";
import Swal from "sweetalert2";
import { FaPhoneAlt, FaUser, FaSpinner } from "react-icons/fa";
import { motion } from "framer-motion";

const ApprovedContactRequest = () => {
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchContactRequests = async () => {
    setLoading(true);
    try {
      const res = await fetch("https://matrimony-backend-p3ok.onrender.com/api/contact-requests");
      const data = await res.json();
      if (res.ok) {
        setRequests(data);
        setError(null);
      } else {
        setError(data.message || "Failed to load contact requests.");
      }
    } catch (err) {
      setError(err.message || "Something went wrong.");
    }
    setLoading(false);
  };

  const handleApprove = async (uid, biodataId) => {
    try {
      const res = await fetch("https://matrimony-backend-p3ok.onrender.com/api/approve-contact", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ uid, biodataId }),
      });

      const data = await res.json();
      if (res.ok && data.success) {
        await Swal.fire({
          icon: "success",
          title: "Approved!",
          text: "Contact request approved successfully.",
          timer: 2000,
          showConfirmButton: false,
        });
        fetchContactRequests();
      } else {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: data.message || "Failed to approve contact request.",
        });
      }
    } catch (err) {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Error approving contact request.",
      });
    }
  };

  useEffect(() => {
    fetchContactRequests();
  }, []);

  return (
    <div className="p-4 sm:p-6 md:p-8 max-w-6xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="bg-white rounded-xl shadow-lg p-6"
      >
        <div className="flex items-center gap-3 mb-6">
          <FaPhoneAlt className="text-2xl text-pink-600" />
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-800">
            Approved Contact Requests
          </h2>
        </div>

        {loading ? (
          <div className="flex justify-center items-center h-60">
            <FaSpinner className="animate-spin text-4xl text-pink-600" />
          </div>
        ) : error ? (
          <p className="text-red-600 text-center">{error}</p>
        ) : requests.length === 0 ? (
          <p className="text-gray-500 text-center">No contact requests found.</p>
        ) : (
          <>
            {/* Desktop Table */}
            <div className="hidden md:block overflow-x-auto rounded-lg border border-gray-200 shadow">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gradient-to-r from-pink-50 to-purple-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-sm font-medium text-gray-700 uppercase">
                      Name
                    </th>
                    <th className="px-6 py-3 text-left text-sm font-medium text-gray-700 uppercase">
                      Email
                    </th>
                    <th className="px-6 py-3 text-left text-sm font-medium text-gray-700 uppercase">
                      Biodata ID
                    </th>
                    <th className="px-6 py-3 text-center text-sm font-medium text-gray-700 uppercase">
                      Action
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {requests.map((req) => (
                    <motion.tr
                      key={req._id}
                      whileHover={{ backgroundColor: "rgba(236,72,153,0.05)" }}
                      className="transition-colors"
                    >
                      <td className="px-6 py-4">{req.name || "N/A"}</td>
                      <td className="px-6 py-4">{req.email || "N/A"}</td>
                      <td className="px-6 py-4">{req.biodataId ?? "N/A"}</td>
                      <td className="px-6 py-4 text-center">
                        {req.status === "approved" ? (
                          <span className="text-green-600 font-semibold">Approved</span>
                        ) : (
                          <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={() => handleApprove(req.uid, req.biodataId)}
                            className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-4 py-2 rounded-lg text-sm shadow hover:shadow-md"
                          >
                            Approve Contact
                          </motion.button>
                        )}
                      </td>
                    </motion.tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Mobile Cards */}
            <div className="md:hidden space-y-4">
              {requests.map((req) => (
                <div
                  key={req._id}
                  className="bg-white shadow rounded-xl p-4 border border-gray-100 space-y-3"
                >
                  <div className="flex items-center gap-3">
                    <div className="bg-pink-100 p-3 rounded-full">
                      <FaUser className="text-pink-600 text-xl" />
                    </div>
                    <div>
                      <p className="font-semibold text-gray-800">{req.name || "N/A"}</p>
                      <p className="text-sm text-gray-600">{req.email || "N/A"}</p>
                    </div>
                  </div>
                  <p className="text-sm text-gray-700">
                    <strong>Biodata ID:</strong> {req.biodataId ?? "N/A"}
                  </p>
                  {req.status === "approved" ? (
                    <span className="inline-block text-green-600 font-semibold">Approved</span>
                  ) : (
                    <button
                      onClick={() => handleApprove(req.uid, req.biodataId)}
                      className="bg-gradient-to-r from-blue-600 to-purple-600 text-white w-full py-2 rounded-lg text-sm shadow"
                    >
                      Approve Contact
                    </button>
                  )}
                </div>
              ))}
            </div>
            
          </>
        )}
      </motion.div>
    </div>
  );
};

export default ApprovedContactRequest;
