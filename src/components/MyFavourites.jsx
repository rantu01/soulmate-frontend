import React, { useEffect, useState } from "react";
import { useAuth } from "../contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

const MyFavouritesTable = () => {
  const { currentUser, jwtToken } = useAuth();
  const navigate = useNavigate();

  const [favourites, setFavourites] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch favourites
  useEffect(() => {
    if (!currentUser) {
      navigate("/login");
      return;
    }

    const fetchFavourites = async () => {
      try {
        setLoading(true);
        setError(null);

        const res = await fetch("https://matrimony-backend-p3ok.onrender.com/api/my-favourites", {
          headers: {
            Authorization: `Bearer ${jwtToken}`,
          },
        });

        if (!res.ok) throw new Error("Failed to load favourites.");

        const data = await res.json();
        setFavourites(data.favourites || []);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchFavourites();
  }, [currentUser, jwtToken, navigate]);

  // Handle delete with confirmation
  const handleDelete = async (biodataId) => {
    const result = await Swal.fire({
      title: "Are you sure?",
      text: "Do you want to remove this favourite?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, remove it!",
    });

    if (!result.isConfirmed) return;

    try {
      const res = await fetch(
        `https://matrimony-backend-p3ok.onrender.com/api/favourites/${biodataId}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${jwtToken}`,
          },
        }
      );

      if (!res.ok) throw new Error("Failed to remove favourite.");

      setFavourites((prev) => prev.filter((b) => b.biodataId !== biodataId));
      Swal.fire("Removed!", "Favourite has been removed.", "success");
    } catch (err) {
      Swal.fire("Error", err.message, "error");
    }
  };

  if (loading) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-pink-600"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center text-red-600">
        <p>Error: {error}</p>
      </div>
    );
  }

  if (favourites.length === 0) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center text-gray-500">
        <p>No favourites found.</p>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto p-6">
      <h2 className="text-2xl font-semibold mb-4">My Favourites</h2>
      <div className="overflow-x-auto border rounded-md shadow-sm">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-100">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Name
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Biodata ID
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Permanent Address
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Occupation
              </th>
              <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                Action
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {favourites.map((fav) => (
              <tr key={fav.biodataId}>
                <td className="px-6 py-4 whitespace-nowrap text-gray-900">
                  {fav.name || "N/A"}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-gray-900">
                  {fav.biodataId}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-gray-900">
                  {fav.permanentAddress || fav.permanentDivision || "N/A"}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-gray-900">
                  {fav.occupation || "N/A"}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-center">
                  <button
                    onClick={() => handleDelete(fav.biodataId)}
                    className="inline-flex items-center px-3 py-1.5 border border-transparent text-sm leading-4 font-medium rounded-md text-white bg-red-600 hover:bg-red-700 focus:outline-none"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default MyFavouritesTable;
