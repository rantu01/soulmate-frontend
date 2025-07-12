import React, { useState } from "react";
import { useAuth } from "../contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

const GotMarried = () => {
  const { currentUser, jwtToken } = useAuth();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    selfBiodataId: "",
    partnerBiodataId: "",
    image: "",
    story: "",
  });

  const [submitting, setSubmitting] = useState(false);

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!jwtToken) {
      Swal.fire({
        icon: "warning",
        title: "Unauthorized",
        text: "You must be logged in to submit a story.",
      });
      return;
    }

    try {
      setSubmitting(true);

      const res = await fetch("https://matrimony-backend-p3ok.onrender.com/api/success-story", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${jwtToken}`,
        },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (res.ok && data.success) {
        Swal.fire({
          icon: "success",
          title: "Submitted!",
          text: "Your story has been submitted successfully.",
          confirmButtonText: "Go to Home",
        }).then(() => navigate("/"));
      } else {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: data.message || "Failed to submit your story.",
        });
      }
    } catch (error) {
      console.error("Error submitting success story:", error);
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Something went wrong. Please try again.",
      });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white shadow-md rounded">
      <h2 className="text-2xl font-bold mb-4 text-center">Share Your Success Story 💍</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="number"
          name="selfBiodataId"
          placeholder="Your Biodata ID"
          value={formData.selfBiodataId}
          onChange={handleChange}
          required
          className="w-full border rounded p-2"
        />
        <input
          type="number"
          name="partnerBiodataId"
          placeholder="Partner's Biodata ID"
          value={formData.partnerBiodataId}
          onChange={handleChange}
          required
          className="w-full border rounded p-2"
        />
        <input
          type="text"
          name="image"
          placeholder="Image URL (Couple Photo)"
          value={formData.image}
          onChange={handleChange}
          required
          className="w-full border rounded p-2"
        />
        <textarea
          name="story"
          placeholder="Write your success story here..."
          rows="5"
          value={formData.story}
          onChange={handleChange}
          required
          className="w-full border rounded p-2"
        ></textarea>

        <button
          type="submit"
          disabled={submitting}
          className="w-full bg-green-600 hover:bg-green-700 text-white py-2 rounded"
        >
          {submitting ? "Submitting..." : "Submit Story"}
        </button>
      </form>
    </div>
  );
};

export default GotMarried;
