import React, { useEffect, useState } from "react";
import Swal from "sweetalert2";
import {
  FaSearch,
  FaUserShield,
  FaCrown,
  FaUsers,
  FaSpinner,
} from "react-icons/fa";
import { motion } from "framer-motion";

const ManageUsers = () => {
  const [users, setUsers] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchUsers = async (query = "") => {
    setLoading(true);
    try {
      const res = await fetch(
        `https://matrimony-backend-p3ok.onrender.com/api/users?search=${query}`
      );
      const data = await res.json();
      if (res.ok) {
        setUsers(data);
        setError(null);
      } else {
        setError(data.message || "Failed to fetch users.");
        Swal.fire({
          icon: "error",
          title: "Error",
          text: data.message || "Failed to fetch users.",
          background: "#fff",
          confirmButtonColor: "#ec4899",
        });
      }
    } catch (err) {
      setError(err.message || "Something went wrong.");
      Swal.fire({
        icon: "error",
        title: "Error",
        text: err.message || "Something went wrong.",
        background: "#fff",
        confirmButtonColor: "#ec4899",
      });
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();
    fetchUsers(searchTerm.trim());
  };

  const updateUserRole = async (email, role) => {
    const { isConfirmed } = await Swal.fire({
      title: "Confirm Update",
      text: `Are you sure you want to make this user ${role}?`,
      icon: "question",
      showCancelButton: true,
      confirmButtonColor: "#ec4899",
      cancelButtonColor: "#6b7280",
      confirmButtonText: "Yes, update!",
      background: "#fff",
    });

    if (!isConfirmed) return;

    try {
      const res = await fetch(
        `https://matrimony-backend-p3ok.onrender.com/api/users/role`,
        {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email, role }),
        }
      );
      const data = await res.json();
      if (res.ok && data.success) {
        await Swal.fire({
          icon: "success",
          title: "Success",
          text: `${role} role updated successfully`,
          background: "#fff",
          confirmButtonColor: "#ec4899",
        });
        fetchUsers(searchTerm);
      } else {
        Swal.fire({
          icon: "error",
          title: "Update Failed",
          text: data.message || "Update failed.",
          background: "#fff",
          confirmButtonColor: "#ec4899",
        });
      }
    } catch (err) {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Error updating user.",
        background: "#fff",
        confirmButtonColor: "#ec4899",
      });
    }
  };

  // ... (same imports and states as your original code above)

  return (
    <div className="p-4 sm:p-6 md:p-8 max-w-7xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="bg-white rounded-xl shadow-lg p-6"
      >
        {/* Header & Search */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8">
          <div className="flex items-center mb-4 md:mb-0">
            <FaUsers className="text-3xl text-pink-600 mr-3" />
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-800">
              Manage Users
            </h2>
          </div>
          <form
            onSubmit={handleSearch}
            className="flex flex-col sm:flex-row gap-3"
          >
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <FaSearch className="text-gray-400" />
              </div>
              <input
                type="text"
                placeholder="Search by name or email..."
                className="border border-gray-300 px-4 py-2 pl-10 rounded-lg w-full focus:ring-2 focus:ring-pink-500 focus:border-transparent shadow-sm"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <motion.button
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.98 }}
              type="submit"
              className="bg-gradient-to-r from-pink-600 to-purple-600 hover:from-pink-700 hover:to-purple-700 text-white px-4 py-2 rounded-lg shadow-md transition-all"
            >
              Search
            </motion.button>
          </form>
        </div>

        {/* Loading & Error */}
        {loading ? (
          <div className="flex justify-center items-center h-64">
            <FaSpinner className="animate-spin text-4xl text-pink-600" />
          </div>
        ) : error ? (
          <div className="bg-red-50 border-l-4 border-red-500 p-4 rounded">
            <p className="text-red-700">{error}</p>
          </div>
        ) : users.length === 0 ? (
          <p className="text-center text-gray-500">
            No users found matching your search.
          </p>
        ) : (
          <>
            {/* ✅ Desktop Table */}
            <div className="hidden md:block overflow-x-auto rounded-lg border border-gray-200 shadow-sm">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gradient-to-r from-pink-50 to-purple-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-sm font-medium text-gray-700 uppercase tracking-wider">
                      User
                    </th>
                    <th className="px-6 py-3 text-left text-sm font-medium text-gray-700 uppercase tracking-wider">
                      Email
                    </th>
                    <th className="px-6 py-3 text-center text-sm font-medium text-gray-700 uppercase tracking-wider">
                      Admin
                    </th>
                    <th className="px-6 py-3 text-center text-sm font-medium text-gray-700 uppercase tracking-wider">
                      Premium
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {users.map((user) => (
                    <motion.tr
                      key={user._id}
                      whileHover={{ backgroundColor: "rgba(236,72,153,0.05)" }}
                      className="transition-colors"
                    >
                      <td className="px-6 py-4">
                        <div className="flex items-center">
                          <img
                            className="h-10 w-10 rounded-full object-cover"
                            src={
                              user.photoURL ||
                              `https://ui-avatars.com/api/?name=${user.name}`
                            }
                            alt={user.name}
                          />
                          <div className="ml-4 font-medium text-gray-900">
                            {user.name}
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 text-gray-700">{user.email}</td>
                      <td className="px-6 py-4 text-center">
                        {user.role === "admin" ? (
                          <span className="px-2 py-1 text-xs font-semibold bg-green-100 text-green-800 rounded-full">
                            Admin
                          </span>
                        ) : (
                          <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={() => updateUserRole(user.email, "admin")}
                            className="flex items-center justify-center mx-auto px-3 py-1 bg-purple-600 text-white text-sm rounded-lg shadow"
                          >
                            <FaUserShield className="mr-1" /> Make Admin
                          </motion.button>
                        )}
                      </td>
                      <td className="px-6 py-4 text-center">
                        {user.isPremium ? (
                          <span className="px-2 py-1 text-xs font-semibold bg-yellow-100 text-yellow-800 rounded-full inline-flex items-center">
                            <FaCrown className="mr-1" /> Premium
                          </span>
                        ) : (
                          <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={() =>
                              updateUserRole(user.email, "premium")
                            }
                            className="flex items-center justify-center mx-auto px-3 py-1 bg-amber-500 text-white text-sm rounded-lg shadow"
                          >
                            <FaCrown className="mr-1" /> Make Premium
                          </motion.button>
                        )}
                      </td>
                    </motion.tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* ✅ Mobile Card Layout */}
            <div className="md:hidden space-y-4 ">
              {users.map((user) => (
                <div
                  key={user._id}
                  className="bg-white shadow rounded-xl p-2 space-y-3 border border-gray-100"
                >
                  <div className="flex items-center space-x-4">
                    <img
                      className="h-12 w-12 rounded-full object-cover"
                      src={
                        user.photoURL ||
                        `https://ui-avatars.com/api/?name=${user.name}`
                      }
                      alt={user.name}
                    />
                    <div>
                      <p className="text-base font-semibold text-gray-800">
                        {user.name}
                      </p>
                      <p className="text-sm text-gray-600">{user.email}</p>
                    </div>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium">Admin:</span>
                    {user.role === "admin" ? (
                      <span className="text-green-700 bg-green-100 text-xs px-3 py-1 rounded-full">
                        Admin
                      </span>
                    ) : (
                      <button
                        onClick={() => updateUserRole(user.email, "admin")}
                        className="text-white bg-purple-600 hover:bg-purple-700 px-3 py-1 rounded text-xs"
                      >
                        <FaUserShield className="inline-block mr-1" /> Make
                        Admin
                      </button>
                    )}
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium">Premium:</span>
                    {user.isPremium ? (
                      <span className="text-yellow-700 bg-yellow-100 text-xs px-3 py-1 rounded-full flex items-center">
                        <FaCrown className="mr-1" /> Premium
                      </span>
                    ) : (
                      <button
                        onClick={() => updateUserRole(user.email, "premium")}
                        className="text-white bg-amber-500 hover:bg-amber-600 px-3 py-1 rounded text-xs"
                      >
                        <FaCrown className="inline-block mr-1" /> Make Premium
                      </button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </>
        )}
      </motion.div>
    </div>
  );
};

export default ManageUsers;
