import React, { useEffect, useState } from "react";
import { useAuth } from "../contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import {
  ClockIcon,
  CheckBadgeIcon,
  XMarkIcon,
  ArrowPathIcon,
  ArrowLeftIcon,
} from "@heroicons/react/24/outline";

const MyContactRequests = () => {
  const { currentUser, jwtToken } = useAuth();
  const navigate = useNavigate();
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [error, setError] = useState(null);

  const fetchRequests = async () => {
    try {
      setRefreshing(true);
      setError(null);
      const res = await fetch("https://matrimony-backend-p3ok.onrender.com/api/my-contact-requests", {
        headers: {
          Authorization: `Bearer ${jwtToken}`,
        },
      });

      if (!res.ok) {
        throw new Error("Failed to load contact requests");
      }

      const data = await res.json();
      setRequests(data.requests || []);
    } catch (err) {
      console.error(err.message);
      setError(err.message);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  const handleDelete = async (id) => {
    const confirm = await Swal.fire({
      title: "Are you sure?",
      text: "You want to delete this contact request?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    });

    if (!confirm.isConfirmed) return;

    try {
      const res = await fetch(`https://matrimony-backend-p3ok.onrender.com/api/contact-request/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${jwtToken}`,
        },
      });

      const result = await res.json();
      if (res.ok && result.success) {
        Swal.fire("Deleted!", "Request has been deleted.", "success");
        fetchRequests(); // refresh the list
      } else {
        throw new Error(result.message || "Failed to delete");
      }
    } catch (err) {
      Swal.fire("Error", err.message, "error");
    }
  };

  useEffect(() => {
    if (!currentUser) {
      navigate("/login");
    } else {
      fetchRequests();
    }
  }, [currentUser, jwtToken]);

  const getStatusBadge = (status) => {
    const base = "inline-flex items-center px-2 py-0.5 rounded text-xs font-medium";
    if (status === "Approved") {
      return (
        <span className={`${base} bg-green-100 text-green-800`}>
          <CheckBadgeIcon className="w-4 h-4 mr-1" />
          Approved
        </span>
      );
    }
    return (
      <span className={`${base} bg-yellow-100 text-yellow-800`}>
        <ClockIcon className="w-4 h-4 mr-1" />
        {status ?? "Pending"}
      </span>
    );
  };

  if (loading) {
    return (
      <div className="h-screen flex items-center justify-center">
        <div className="animate-spin h-10 w-10 border-t-2 border-b-2 border-purple-600 rounded-full"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center mt-10 text-red-500">
        <p>{error}</p>
        <button
          onClick={fetchRequests}
          className="mt-4 px-4 py-2 bg-purple-600 text-white rounded hover:bg-purple-700"
        >
          Retry
        </button>
      </div>
    );
  }

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">My Contact Requests</h2>
        <div className="flex space-x-2">
          <button
            onClick={fetchRequests}
            disabled={refreshing}
            className="p-2 bg-purple-100 hover:bg-purple-200 text-purple-700 rounded"
          >
            <ArrowPathIcon className={`h-5 w-5 ${refreshing ? "animate-spin" : ""}`} />
          </button>
          <button
            onClick={() => navigate(-1)}
            className="p-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded"
          >
            <ArrowLeftIcon className="h-5 w-5" />
          </button>
        </div>
      </div>

      {requests.length === 0 ? (
        <div className="text-center py-12">
          <XMarkIcon className="mx-auto h-12 w-12 text-gray-400" />
          <p className="mt-2 text-gray-600">You haven't made any contact requests yet.</p>
        </div>
      ) : (
        <div className="overflow-x-auto border rounded-lg">
          <table className="min-w-full divide-y divide-gray-200 text-sm">
            <thead className="bg-gray-100">
              <tr>
                <th className="px-4 py-3 text-left font-medium text-gray-700">Name</th>
                <th className="px-4 py-3 text-left font-medium text-gray-700">Biodata ID</th>
                <th className="px-4 py-3 text-left font-medium text-gray-700">Status</th>
                <th className="px-4 py-3 text-left font-medium text-gray-700">Action</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-100">
              {requests.map((req) => (
                <tr key={req._id}>
                  <td className="px-4 py-3 text-gray-800">
                    {req.name || "N/A"}
                  </td>
                  <td className="px-4 py-3 text-gray-800">
                    {req.biodataId ?? "N/A"}
                  </td>
                  <td className="px-4 py-3">{getStatusBadge(req.status)}</td>
                  <td className="px-4 py-3">
                    <button
                      onClick={() => handleDelete(req._id)}
                      className="text-red-600 hover:text-red-800"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default MyContactRequests;
