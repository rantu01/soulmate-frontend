import React, { useEffect, useState } from "react";
import Swal from "sweetalert2";

const ApprovedPremium = () => {
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchRequests = async () => {
    setLoading(true);
    try {
      const res = await fetch("https://matrimony-backend-p3ok.onrender.com/api/premium-requests");
      const data = await res.json();
      if (res.ok) {
        setRequests(data);
        setError(null);
      } else {
        setError(data.message || "Failed to load requests.");
      }
    } catch (err) {
      setError(err.message || "Something went wrong.");
    }
    setLoading(false);
  };

  const handleApprove = async (email, biodataId) => {
    try {
      const res = await fetch("https://matrimony-backend-p3ok.onrender.com/api/approve-premium", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, biodataId }),
      });

      const data = await res.json();
      if (res.ok && data.success) {
        Swal.fire({
          icon: "success",
          title: "Approved!",
          text: "Premium access has been granted.",
          timer: 2000,
          toast: true,
          position: "top-end",
          showConfirmButton: false,
        });

        setRequests((prev) =>
          prev.map((req) =>
            req.email === email && req.biodataId === biodataId
              ? { ...req, status: "approved" }
              : req
          )
        );
      } else {
        Swal.fire({
          icon: "error",
          title: "Failed!",
          text: data.message || "Could not approve request.",
        });
      }
    } catch (err) {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: err.message || "Approval failed.",
      });
    }
  };

  useEffect(() => {
    fetchRequests();
  }, []);

  return (
    <div className="p-4 sm:p-6 md:p-8 max-w-7xl mx-auto">
      <div className="text-center mb-8">
        <h2 className="text-3xl md:text-4xl font-bold text-pink-600 mb-2">
          💎 Premium Approval Requests
        </h2>
        <p className="text-gray-600">Manage user upgrade requests efficiently and professionally.</p>
      </div>

      {loading ? (
        <div className="text-center text-lg text-gray-500">⏳ Loading requests...</div>
      ) : error ? (
        <div className="text-center text-red-600 font-medium">{error}</div>
      ) : requests.length === 0 ? (
        <div className="text-center py-6 text-gray-500">🚫 No premium requests found.</div>
      ) : (
        <>
          {/* ✅ Desktop Table */}
          <div className="hidden md:block overflow-x-auto bg-white rounded-xl shadow-lg">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gradient-to-r from-pink-500 to-purple-500 text-white">
                <tr>
                  <th className="px-6 py-3 text-left text-sm font-semibold uppercase">Name</th>
                  <th className="px-6 py-3 text-left text-sm font-semibold uppercase">Email</th>
                  <th className="px-6 py-3 text-left text-sm font-semibold uppercase">Biodata ID</th>
                  <th className="px-6 py-3 text-center text-sm font-semibold uppercase">Action</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-100">
                {requests.map((req) => (
                  <tr key={req._id} className="hover:bg-pink-50 transition">
                    <td className="px-6 py-4">{req.name}</td>
                    <td className="px-6 py-4 text-sm text-gray-600">{req.email}</td>
                    <td className="px-6 py-4 font-semibold">#{req.biodataId}</td>
                    <td className="px-6 py-4 text-center">
                      {req.status === "approved" ? (
                        <span className="inline-block px-3 py-1 text-sm font-medium bg-green-100 text-green-700 rounded-full">
                          Approved
                        </span>
                      ) : (
                        <button
                          onClick={() => handleApprove(req.email, req.biodataId)}
                          className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-full text-sm font-semibold transition"
                        >
                          Make Premium
                        </button>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* ✅ Mobile Layout */}
          <div className="md:hidden space-y-4">
            {requests.map((req) => (
              <div
                key={req._id}
                className="bg-white rounded-xl shadow p-4 border border-gray-200"
              >
                <p className="text-sm text-gray-700">
                  <span className="font-semibold">Name:</span> {req.name}
                </p>
                <p className="text-sm text-gray-700">
                  <span className="font-semibold">Email:</span> {req.email}
                </p>
                <p className="text-sm text-gray-700">
                  <span className="font-semibold">Biodata ID:</span> #{req.biodataId}
                </p>
                <div className="mt-3 text-right">
                  {req.status === "approved" ? (
                    <span className="inline-block px-3 py-1 text-sm font-medium bg-green-100 text-green-700 rounded-full">
                      Approved
                    </span>
                  ) : (
                    <button
                      onClick={() => handleApprove(req.email, req.biodataId)}
                      className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-full text-sm font-semibold transition"
                    >
                      Make Premium
                    </button>
                  )}
                </div>
              </div>
            ))}
            
          </div>
        </>
      )}
    </div>
  );
};

export default ApprovedPremium;
