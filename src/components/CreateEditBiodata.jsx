import React, { useEffect, useState } from "react";
import { useAuth } from "../contexts/AuthContext";
import { useNavigate } from "react-router-dom";

const divisions = [
  "Dhaka",
  "Chattagram",
  "Rangpur",
  "Barisal",
  "Khulna",
  "Mymensingh",
  "Sylhet",
];
const weights = ["40kg", "45kg", "50kg", "60kg", "70kg", "80kg+"];
const heights = ["4.5ft", "5ft", "5.5ft", "6ft", "6.5ft+"];
const occupations = ["Student", "Job", "Business", "Housewife"];
const races = ["Fair", "Medium", "Dark"];

const CreateEditBiodata = () => {
  const { currentUser, jwtToken } = useAuth();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    biodataType: "Male",
    name: "",
    profileImage: "",
    dateOfBirth: "",
    height: "",
    weight: "",
    age: "",
    occupation: "",
    race: "",
    fatherName: "",
    motherName: "",
    permanentDivision: "",
    presentDivision: "",
    expectedPartnerAge: "",
    expectedPartnerHeight: "",
    expectedPartnerWeight: "",
    contactEmail: currentUser?.email || "",
    mobile: "",
  });

  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [errors, setErrors] = useState({});
  const [showSuccess, setShowSuccess] = useState(false);
  const [imageError, setImageError] = useState(false);

  useEffect(() => {
    if (!currentUser || !jwtToken) return;

    const fetchBiodata = async () => {
      setLoading(true);
      try {
        const res = await fetch(
          `https://matrimony-backend-p3ok.onrender.com/api/my-biodata?email=${currentUser.email}`,
          {
            headers: {
              Authorization: `Bearer ${jwtToken}`,
            },
          }
        );

        const data = await res.json();
        if (res.ok && data.success && data.biodata) {
          setForm((prev) => ({ ...prev, ...data.biodata }));
        }
      } catch (err) {
        console.error("Error fetching biodata:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchBiodata();
  }, [currentUser, jwtToken]);

  // Auto-calculate age from date of birth
  useEffect(() => {
    if (form.dateOfBirth) {
      const dob = new Date(form.dateOfBirth);
      const ageDiff = Date.now() - dob.getTime();
      const ageDate = new Date(ageDiff);
      const calculatedAge = Math.abs(ageDate.getUTCFullYear() - 1970);
      setForm((prev) => ({ ...prev, age: calculatedAge }));
    }
  }, [form.dateOfBirth]);

  const validateForm = () => {
    const newErrors = {};

    if (!form.name.trim()) newErrors.name = "Name is required";
    if (!form.dateOfBirth || new Date(form.dateOfBirth) > new Date()) {
      newErrors.dateOfBirth = "Please enter a valid date of birth";
    }
    if (!form.height) newErrors.height = "Height is required";
    if (!form.weight) newErrors.weight = "Weight is required";
    if (!form.occupation) newErrors.occupation = "Occupation is required";
    if (!form.race) newErrors.race = "Race is required";
    if (!form.fatherName.trim())
      newErrors.fatherName = "Father's name is required";
    if (!form.motherName.trim())
      newErrors.motherName = "Mother's name is required";
    if (!form.permanentDivision)
      newErrors.permanentDivision = "Permanent division is required";
    if (!form.presentDivision)
      newErrors.presentDivision = "Present division is required";

    // Validate mobile number format for Bangladesh
    const mobileRegex = /^(\+)?(88)?01[0-9]{9}$/;
    if (!form.mobile.trim()) {
      newErrors.mobile = "Mobile number is required";
    } else if (!mobileRegex.test(form.mobile)) {
      newErrors.mobile =
        "Please enter a valid Bangladeshi mobile number (e.g. +8801XXXXXXXXX)";
    }

    // Validate profile image URL
    try {
      new URL(form.profileImage);
    } catch (e) {
      newErrors.profileImage = "Please enter a valid URL";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });

    // Clear error when user starts typing
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const handleImageError = () => {
    setImageError(true);
  };

  const handleSubmit = async (e) => {
  e.preventDefault();

  if (!validateForm()) return;

  setSubmitting(true);

  // Convert biodataId to number and increment if creating new biodata
  let newBiodataId = form.biodataId;
  if (!newBiodataId) {
    // if biodataId is missing, start from 1 or fetch last id from backend then +1
    newBiodataId = 1;
  } else {
    newBiodataId = Number(newBiodataId) + 1;
  }

  const method = form.biodataId ? "PATCH" : "POST";
  const url = "https://matrimony-backend-p3ok.onrender.com/api/biodata";

  const { _id, ...sanitizedForm } = form;

  // Use newId only if creating, or keep existing for update
  const payload = method === "POST" 
    ? { ...sanitizedForm, biodataId: newBiodataId } 
    : sanitizedForm;

  try {
    const res = await fetch(url, {
      method,
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${jwtToken}`,
      },
      body: JSON.stringify(payload),
    });

    const data = await res.json();

    if (res.ok && data.success) {
      setShowSuccess(true);
      setTimeout(() => {
        navigate("/dashboard/view-biodata");
      }, 1500);
    } else {
      setErrors({ submit: data.message || "Failed to save biodata. Please try again." });
    }
  } catch (error) {
    console.error("Submission error:", error);
    setErrors({ submit: "An error occurred while submitting. Please try again later." });
  } finally {
    setSubmitting(false);
  }
};


  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-pink-600"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white rounded-xl shadow-md overflow-hidden">
          {/* Form Header */}
          <div className="bg-gradient-to-r from-pink-600 to-purple-600 px-6 py-4">
            <h2 className="text-2xl font-bold text-white">
              {form.biodataId ? "Edit Your Biodata" : "Create New Biodata"}
            </h2>
            <p className="text-pink-100 mt-1">
              {form.biodataId
                ? "Update your information"
                : "Fill in your details to create a biodata"}
            </p>
          </div>

          {/* Main Form */}
          <form onSubmit={handleSubmit} className="p-6 md:p-8">
            {errors.submit && (
              <div className="mb-6 p-4 bg-red-50 text-red-700 rounded border border-red-200">
                {errors.submit}
              </div>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Personal Information Section */}
              <div className="md:col-span-2">
                <h3 className="text-lg font-semibold text-gray-800 border-b pb-2 mb-4">
                  Personal Information
                </h3>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Biodata Type *
                </label>
                <div className="flex space-x-4">
                  <label className="inline-flex items-center">
                    <input
                      type="radio"
                      name="biodataType"
                      value="Male"
                      checked={form.biodataType === "Male"}
                      onChange={handleChange}
                      className="h-4 w-4 text-pink-600 focus:ring-pink-500 border-gray-300"
                    />
                    <span className="ml-2 text-gray-700">Male</span>
                  </label>
                  <label className="inline-flex items-center">
                    <input
                      type="radio"
                      name="biodataType"
                      value="Female"
                      checked={form.biodataType === "Female"}
                      onChange={handleChange}
                      className="h-4 w-4 text-pink-600 focus:ring-pink-500 border-gray-300"
                    />
                    <span className="ml-2 text-gray-700">Female</span>
                  </label>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Full Name *
                </label>
                <input
                  name="name"
                  placeholder="Your full name"
                  value={form.name}
                  onChange={handleChange}
                  className={`mt-1 block w-full rounded-md shadow-sm focus:border-pink-500 focus:ring-pink-500 p-2 border ${
                    errors.name ? "border-red-300" : "border-gray-300"
                  }`}
                />
                {errors.name && (
                  <p className="mt-1 text-sm text-red-600">{errors.name}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Profile Image URL *
                </label>
                <input
                  name="profileImage"
                  placeholder="https://example.com/photo.jpg"
                  value={form.profileImage}
                  onChange={handleChange}
                  className={`mt-1 block w-full rounded-md shadow-sm focus:border-pink-500 focus:ring-pink-500 p-2 border ${
                    errors.profileImage ? "border-red-300" : "border-gray-300"
                  }`}
                />
                {errors.profileImage && (
                  <p className="mt-1 text-sm text-red-600">
                    {errors.profileImage}
                  </p>
                )}
                {form.profileImage && !imageError && (
                  <div className="mt-2">
                    <img
                      src={form.profileImage}
                      alt="Profile preview"
                      className="h-20 w-20 object-cover rounded border"
                      onError={handleImageError}
                    />
                    <p className="text-xs text-gray-500 mt-1">Image preview</p>
                  </div>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Date of Birth *
                </label>
                <input
                  type="date"
                  name="dateOfBirth"
                  value={form.dateOfBirth}
                  onChange={handleChange}
                  max={new Date().toISOString().split("T")[0]}
                  className={`mt-1 block w-full rounded-md shadow-sm focus:border-pink-500 focus:ring-pink-500 p-2 border ${
                    errors.dateOfBirth ? "border-red-300" : "border-gray-300"
                  }`}
                />
                {errors.dateOfBirth && (
                  <p className="mt-1 text-sm text-red-600">
                    {errors.dateOfBirth}
                  </p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Age *
                </label>

                <input
                  name="age"
                  type="number"
                  placeholder="Auto-calculated"
                  value={form.age}
                  readOnly
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm bg-gray-100 p-2 border cursor-not-allowed"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Height *
                </label>
                <select
                  name="height"
                  value={form.height}
                  onChange={handleChange}
                  className={`mt-1 block w-full rounded-md shadow-sm focus:border-pink-500 focus:ring-pink-500 p-2 border ${
                    errors.height ? "border-red-300" : "border-gray-300"
                  }`}
                >
                  <option value="">Select your height</option>
                  {heights.map((h) => (
                    <option key={h} value={h}>
                      {h}
                    </option>
                  ))}
                </select>
                {errors.height && (
                  <p className="mt-1 text-sm text-red-600">{errors.height}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Weight *
                </label>
                <select
                  name="weight"
                  value={form.weight}
                  onChange={handleChange}
                  className={`mt-1 block w-full rounded-md shadow-sm focus:border-pink-500 focus:ring-pink-500 p-2 border ${
                    errors.weight ? "border-red-300" : "border-gray-300"
                  }`}
                >
                  <option value="">Select your weight</option>
                  {weights.map((w) => (
                    <option key={w} value={w}>
                      {w}
                    </option>
                  ))}
                </select>
                {errors.weight && (
                  <p className="mt-1 text-sm text-red-600">{errors.weight}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Occupation *
                </label>
                <select
                  name="occupation"
                  value={form.occupation}
                  onChange={handleChange}
                  className={`mt-1 block w-full rounded-md shadow-sm focus:border-pink-500 focus:ring-pink-500 p-2 border ${
                    errors.occupation ? "border-red-300" : "border-gray-300"
                  }`}
                >
                  <option value="">Select your occupation</option>
                  {occupations.map((o) => (
                    <option key={o} value={o}>
                      {o}
                    </option>
                  ))}
                </select>
                {errors.occupation && (
                  <p className="mt-1 text-sm text-red-600">
                    {errors.occupation}
                  </p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Race *
                </label>
                <select
                  name="race"
                  value={form.race}
                  onChange={handleChange}
                  className={`mt-1 block w-full rounded-md shadow-sm focus:border-pink-500 focus:ring-pink-500 p-2 border ${
                    errors.race ? "border-red-300" : "border-gray-300"
                  }`}
                >
                  <option value="">Select your race</option>
                  {races.map((r) => (
                    <option key={r} value={r}>
                      {r}
                    </option>
                  ))}
                </select>
                {errors.race && (
                  <p className="mt-1 text-sm text-red-600">{errors.race}</p>
                )}
              </div>

              {/* Family Information Section */}
              <div className="md:col-span-2 mt-4">
                <h3 className="text-lg font-semibold text-gray-800 border-b pb-2 mb-4">
                  Family Information
                </h3>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Father's Name *
                </label>
                <input
                  name="fatherName"
                  placeholder="Father's full name"
                  value={form.fatherName}
                  onChange={handleChange}
                  className={`mt-1 block w-full rounded-md shadow-sm focus:border-pink-500 focus:ring-pink-500 p-2 border ${
                    errors.fatherName ? "border-red-300" : "border-gray-300"
                  }`}
                />
                {errors.fatherName && (
                  <p className="mt-1 text-sm text-red-600">
                    {errors.fatherName}
                  </p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Mother's Name *
                </label>
                <input
                  name="motherName"
                  placeholder="Mother's full name"
                  value={form.motherName}
                  onChange={handleChange}
                  className={`mt-1 block w-full rounded-md shadow-sm focus:border-pink-500 focus:ring-pink-500 p-2 border ${
                    errors.motherName ? "border-red-300" : "border-gray-300"
                  }`}
                />
                {errors.motherName && (
                  <p className="mt-1 text-sm text-red-600">
                    {errors.motherName}
                  </p>
                )}
              </div>

              {/* Location Information */}
              <div className="md:col-span-2 mt-4">
                <h3 className="text-lg font-semibold text-gray-800 border-b pb-2 mb-4">
                  Location Information
                </h3>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Permanent Division *
                </label>
                <select
                  name="permanentDivision"
                  value={form.permanentDivision}
                  onChange={handleChange}
                  className={`mt-1 block w-full rounded-md shadow-sm focus:border-pink-500 focus:ring-pink-500 p-2 border ${
                    errors.permanentDivision
                      ? "border-red-300"
                      : "border-gray-300"
                  }`}
                >
                  <option value="">Select permanent division</option>
                  {divisions.map((d) => (
                    <option key={d} value={d}>
                      {d}
                    </option>
                  ))}
                </select>
                {errors.permanentDivision && (
                  <p className="mt-1 text-sm text-red-600">
                    {errors.permanentDivision}
                  </p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Present Division *
                </label>
                <select
                  name="presentDivision"
                  value={form.presentDivision}
                  onChange={handleChange}
                  className={`mt-1 block w-full rounded-md shadow-sm focus:border-pink-500 focus:ring-pink-500 p-2 border ${
                    errors.presentDivision
                      ? "border-red-300"
                      : "border-gray-300"
                  }`}
                >
                  <option value="">Select present division</option>
                  {divisions.map((d) => (
                    <option key={d} value={d}>
                      {d}
                    </option>
                  ))}
                </select>
                {errors.presentDivision && (
                  <p className="mt-1 text-sm text-red-600">
                    {errors.presentDivision}
                  </p>
                )}
              </div>

              {/* Partner Expectations */}
              <div className="md:col-span-2 mt-4">
                <h3 className="text-lg font-semibold text-gray-800 border-b pb-2 mb-4">
                  Partner Expectations (Optional)
                </h3>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Expected Partner Age
                </label>
                <input
                  name="expectedPartnerAge"
                  type="number"
                  placeholder="Expected age"
                  value={form.expectedPartnerAge}
                  onChange={handleChange}
                  min="18"
                  max="100"
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-pink-500 focus:ring-pink-500 p-2 border"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Expected Partner Height
                </label>
                <select
                  name="expectedPartnerHeight"
                  value={form.expectedPartnerHeight}
                  onChange={handleChange}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-pink-500 focus:ring-pink-500 p-2 border"
                >
                  <option value="">Select expected height</option>
                  {heights.map((h) => (
                    <option key={h} value={h}>
                      {h}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Expected Partner Weight
                </label>
                <select
                  name="expectedPartnerWeight"
                  value={form.expectedPartnerWeight}
                  onChange={handleChange}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-pink-500 focus:ring-pink-500 p-2 border"
                >
                  <option value="">Select expected weight</option>
                  {weights.map((w) => (
                    <option key={w} value={w}>
                      {w}
                    </option>
                  ))}
                </select>
              </div>

              {/* Contact Information */}
              <div className="md:col-span-2 mt-4">
                <h3 className="text-lg font-semibold text-gray-800 border-b pb-2 mb-4">
                  Contact Information
                </h3>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Email *
                </label>
                <input
                  name="contactEmail"
                  value={form.contactEmail}
                  readOnly
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm bg-gray-100 p-2 border cursor-not-allowed"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Mobile Number *
                </label>
                <input
                  name="mobile"
                  placeholder="+8801XXXXXXXXX"
                  value={form.mobile}
                  onChange={handleChange}
                  className={`mt-1 block w-full rounded-md shadow-sm focus:border-pink-500 focus:ring-pink-500 p-2 border ${
                    errors.mobile ? "border-red-300" : "border-gray-300"
                  }`}
                />
                {errors.mobile && (
                  <p className="mt-1 text-sm text-red-600">{errors.mobile}</p>
                )}
                <p className="mt-1 text-xs text-gray-500">
                  Bangladeshi format: +8801XXXXXXXXX
                </p>
              </div>
            </div>

            {/* Form Actions */}
            <div className="mt-8 flex flex-col sm:flex-row justify-end gap-3">
              <button
                type="button"
                onClick={() => navigate(-1)}
                className="px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-pink-500"
                disabled={submitting}
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={submitting}
                className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-gradient-to-r from-pink-600 to-purple-600 hover:from-pink-700 hover:to-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-pink-500 disabled:opacity-70 disabled:cursor-not-allowed"
              >
                {submitting ? (
                  <>
                    <svg
                      className="animate-spin -ml-1 mr-2 h-4 w-4 text-white inline"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      ></circle>
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                      ></path>
                    </svg>
                    Processing...
                  </>
                ) : form.biodataId ? (
                  "Update Biodata"
                ) : (
                  "Publish Biodata"
                )}
              </button>
            </div>
          </form>
        </div>
      </div>

      {/* Success Toast */}
      {showSuccess && (
        <div className="fixed bottom-4 right-4 bg-green-500 text-white px-4 py-2 rounded shadow-lg animate-fade-in-up">
          Biodata {form.biodataId ? "updated" : "created"} successfully!
        </div>
      )}
    </div>
  );
};

export default CreateEditBiodata;
