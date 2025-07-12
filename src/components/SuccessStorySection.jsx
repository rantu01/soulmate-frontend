import React, { useEffect, useState } from "react";
import { FaHeart, FaQuoteLeft, FaCalendarAlt } from "react-icons/fa";
import { motion } from "framer-motion";
import Swal from "sweetalert2";

const SuccessStorySection = () => {
  const [stories, setStories] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStories = async () => {
      try {
        const res = await fetch(
          "https://matrimony-backend-p3ok.onrender.com/api/success-stories"
        );
        const data = await res.json();
        if (res.ok && data.success) {
          // Sort descending (latest first) by marriage/creation date
          const sortedStories = data.stories.sort(
            (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
          );
          setStories(sortedStories);
        }
      } catch (err) {
        console.error("Failed to load success stories", err);
      }
      setLoading(false);
    };

    fetchStories();
  }, []);

  const viewStoryModal = (story) => {
    Swal.fire({
      title: "Success Story",
      html: `
        <img src="${
          story.image
        }" alt="Story Image" style="width:100%; border-radius:8px; margin-bottom:15px;" />
        <p><strong>Email:</strong> ${story.email}</p>
        <p><strong>Date:</strong> ${new Date(
          story.createdAt
        ).toLocaleDateString()}</p>
        <hr />
        <p style="margin-top:10px;">${story.story}</p>
      `,
      showCloseButton: true,
      confirmButtonText: "Close",
      width: "600px",
      customClass: {
        popup: "p-6",
      },
    });
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 30, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.6,
      },
    },
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-pink-600"></div>
      </div>
    );
  }

  if (stories.length === 0) {
    return (
      <div className="text-center py-16 bg-gradient-to-b from-pink-50 to-white">
        <div className="max-w-2xl mx-auto px-4">
          <div className="bg-white p-8 rounded-xl shadow-lg">
            <FaHeart className="mx-auto text-4xl text-pink-500 mb-4" />
            <h3 className="text-2xl font-bold text-gray-800 mb-2">
              No Success Stories Yet
            </h3>
            <p className="text-gray-600 mb-6">
              Be the first to share your beautiful journey with us!
            </p>
            <button className="bg-gradient-to-r from-pink-600 to-purple-600 text-white font-semibold py-2 px-6 rounded-full hover:shadow-md transition duration-300">
              Share Your Story
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <section className="bg-gradient-to-b from-pink-50 to-white py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-pink-600 mb-4">
            Real Love Stories
          </h2>
          <p className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto">
            Discover heartwarming journeys of couples who found their perfect
            match through us
          </p>
        </div>

        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={containerVariants}
        >
          {stories.map((story) => (
            <motion.div
              key={story._id}
              variants={itemVariants}
              className="group"
            >
              <div className="relative bg-white rounded-xl shadow-lg overflow-hidden h-full transition-all duration-300 hover:shadow-xl hover:-translate-y-2">
                <div className="relative h-64 overflow-hidden">
                  <img
                    src={
                      story.image ||
                      "https://images.unsplash.com/photo-1529633982980-95651d6d4d74?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80"
                    }
                    alt="Happy couple"
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent"></div>
                  <div className="absolute bottom-4 left-4">
                    <div className="bg-pink-600 text-white text-sm font-bold px-3 py-1 rounded-full inline-flex items-center">
                      <FaHeart className="mr-1" /> Success Story
                    </div>
                  </div>
                </div>

                <div className="p-6 flex flex-col justify-between h-[280px]">
                  <div>
                    <div className="flex items-center mb-4">
                      <div className="flex items-center text-amber-400">
                        {[...Array(5)].map((_, i) => (
                          <svg
                            key={i}
                            className="w-5 h-5 fill-current"
                            viewBox="0 0 20 20"
                          >
                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                          </svg>
                        ))}
                      </div>
                    </div>

                    <FaQuoteLeft className="text-pink-200 text-3xl mb-4" />
                    <p className="text-gray-700 italic mb-6 line-clamp-4">
                      {story.story}
                    </p>
                  </div>

                  <div className="flex justify-between items-center border-t pt-4">
                    <div className="flex items-center text-gray-500 text-sm">
                      <FaCalendarAlt className="mr-2" />
                      {new Date(story.createdAt).toLocaleDateString("en-US", {
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                      })}
                    </div>

                    <button
                      onClick={() => viewStoryModal(story)}
                      className="bg-pink-600 text-white text-sm px-4 py-2 rounded-full hover:bg-pink-700 transition"
                    >
                      Read Full Story
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default SuccessStorySection;
