import React, { useEffect, useState } from "react";
import Swal from "sweetalert2";
import { FaHeart, FaSpinner } from "react-icons/fa";
import { motion } from "framer-motion";

const SuccessStories = () => {
  const [stories, setStories] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStories = async () => {
      try {
        const res = await fetch("https://matrimony-backend-p3ok.onrender.com/api/admin/success-stories");
        if (!res.ok) throw new Error("Failed to fetch success stories");
        const data = await res.json();
        setStories(data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchStories();
  }, []);

  const viewStory = (story) => {
    Swal.fire({
      title: "Success Story",
      html: `
        <div style="text-align: left;">
          <img src="${story.image}" alt="Story Image" style="max-width:100%; border-radius: 8px; margin-bottom: 10px;" />
          <p><strong>Male Biodata ID:</strong> ${story.maleBiodataId}</p>
          <p><strong>Female Biodata ID:</strong> ${story.femaleBiodataId}</p>
          <p><strong>Email:</strong> ${story.email}</p>
          <p><strong>Date:</strong> ${new Date(story.createdAt).toLocaleDateString()}</p>
          <hr/>
          <p>${story.storyText}</p>
        </div>
      `,
      showCloseButton: true,
      confirmButtonText: "Close",
      width: "600px",
      background: "#fff",
      confirmButtonColor: "#ec4899",
    });
  };

  return (
    <div className="p-4 sm:p-6 md:p-8 max-w-7xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="bg-white rounded-xl shadow-lg p-6"
      >
        <div className="flex items-center gap-3 mb-6">
          <FaHeart className="text-2xl text-pink-600" />
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-800">
            Success Stories
          </h2>
        </div>

        {loading ? (
          <div className="flex justify-center items-center h-60">
            <FaSpinner className="animate-spin text-4xl text-pink-600" />
          </div>
        ) : stories.length === 0 ? (
          <p className="text-gray-500 text-center">No success stories found.</p>
        ) : (
          <>
            {/* Desktop Table */}
            <div className="hidden md:block overflow-x-auto border rounded-lg">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gradient-to-r from-pink-50 to-purple-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-sm font-medium text-gray-700 uppercase">
                      Image
                    </th>
                    <th className="px-6 py-3 text-left text-sm font-medium text-gray-700 uppercase">
                      Male ID
                    </th>
                    <th className="px-6 py-3 text-left text-sm font-medium text-gray-700 uppercase">
                      Female ID
                    </th>
                    <th className="px-6 py-3 text-left text-sm font-medium text-gray-700 uppercase">
                      Email
                    </th>
                    <th className="px-6 py-3 text-left text-sm font-medium text-gray-700 uppercase">
                      Date
                    </th>
                    <th className="px-6 py-3 text-center text-sm font-medium text-gray-700 uppercase">
                      Action
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {stories.map((story) => (
                    <motion.tr
                      key={story._id}
                      whileHover={{ backgroundColor: "rgba(236,72,153,0.05)" }}
                      className="transition"
                    >
                      <td className="px-6 py-4">
                        <img
                          src={story.image}
                          alt="Success"
                          className="w-16 h-16 object-cover rounded"
                        />
                      </td>
                      <td className="px-6 py-4">{story.maleBiodataId}</td>
                      <td className="px-6 py-4">{story.femaleBiodataId}</td>
                      <td className="px-6 py-4">{story.email}</td>
                      <td className="px-6 py-4">
                        {new Date(story.createdAt).toLocaleDateString()}
                      </td>
                      <td className="px-6 py-4 text-center">
                        <motion.button
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          onClick={() => viewStory(story)}
                          className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-4 py-2 rounded-lg text-sm shadow hover:shadow-md"
                        >
                          View Story
                        </motion.button>
                      </td>
                    </motion.tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Mobile Cards */}
            <div className="md:hidden space-y-6">
              {stories.map((story) => (
                <div
                  key={story._id}
                  className="bg-white border rounded-xl p-4 shadow space-y-3"
                >
                  <img
                    src={story.image}
                    alt="Success"
                    className="w-full h-48 object-cover rounded-md"
                  />
                  <p className="text-sm text-gray-700">
                    <strong>Male ID:</strong> {story.maleBiodataId}
                  </p>
                  <p className="text-sm text-gray-700">
                    <strong>Female ID:</strong> {story.femaleBiodataId}
                  </p>
                  <p className="text-sm text-gray-700">
                    <strong>Email:</strong> {story.email}
                  </p>
                  <p className="text-sm text-gray-700">
                    <strong>Date:</strong>{" "}
                    {new Date(story.createdAt).toLocaleDateString()}
                  </p>
                  <button
                    onClick={() => viewStory(story)}
                    className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-2 rounded-lg text-sm shadow hover:shadow-md"
                  >
                    View Story
                  </button>
                </div>
              ))}
            </div>
          </>
        )}
      </motion.div>
    </div>
  );
};

export default SuccessStories;
