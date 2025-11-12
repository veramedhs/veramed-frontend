import React, { useEffect, useState } from "react";
import { CheckCircle } from "lucide-react";
import languageImg from "@/assets/c&l.jpeg";
import "react-country-phone-input/lib/style.css";
// import ReactCountryPhoneInput from "react-country-phone-input"; // This import is unused and conflicts with PhoneInput below
import img1 from "../assets/c1.jpg";
import img2 from "../assets/c2.jpeg";

import useCountryStore from "@/store/useCountryStore ";
import PhoneInput from "react-country-phone-input"; // Corrected to use "react-country-phone-input"
import { apiClient } from "@/lib/apiClient";
import toast, { Toaster } from "react-hot-toast"; // Import toast and Toaster

const CultureAndLanguage: React.FC = () => {
  const [formData, setFormData] = useState({
    fullName: "",
    phone: "",
    country: "",
    message: "",
    files: [] as File[],
  });

  const { countries, isLoading, error, fetchCountries } = useCountryStore();
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    fetchCountries();
  }, [fetchCountries]);

  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    if (!formData.fullName.trim()) newErrors.fullName = "Full name is required.";
    else if (!/^[A-Za-z\s]*$/.test(formData.fullName.trim()))
      newErrors.fullName = "Full name must contain only alphabets.";
    if (!formData.phone.trim()) newErrors.phone = "Phone number is required.";
    if (!formData.country.trim()) newErrors.country = "Country is required.";
    if (!formData.message.trim())
      newErrors.message = "Please describe your language or cultural needs.";
    if (formData.files.length > 5)
      newErrors.files = "You can upload up to 5 files only.";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      // Limit file selection to 5, as per validation logic
      const newFiles = Array.from(e.target.files).slice(0, 5);
      setFormData({
        ...formData,
        files: newFiles,
      });
      // Clear file error if it was present and now files are <= 5
      if (errors.files && newFiles.length <= 5) {
        setErrors((prevErrors) => {
          const updatedErrors = { ...prevErrors };
          delete updatedErrors.files;
          return updatedErrors;
        });
      }
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
      try {
        // Create FormData object to send files
        const dataToSend = new FormData();
        dataToSend.append("fullName", formData.fullName);
        dataToSend.append("phone", formData.phone);
        dataToSend.append("country", formData.country);
        dataToSend.append("message", formData.message);

        formData.files.forEach((file) => {
          dataToSend.append("files", file); // 'files' should match your backend's expected field name for multiple files
        });

        const response = await apiClient.post("/api/v1/veramed/culture", dataToSend);

        if (response.status === 200 || response.status === 201) {
          setSubmitted(true);
          toast.success("Request submitted successfully! Our team will contact you shortly.");
          // Optionally reset form after successful submission
          setFormData({
            fullName: "",
            phone: "",
            country: "",
            message: "",
            files: [],
          });
          setErrors({}); // Clear any previous errors
        } else {
          toast.error("Failed to submit request. Please try again.");
          console.error("API response error:", response);
        }
      } catch (err) {
        toast.error("An error occurred. Please check your network and try again.");
        console.error("API call failed:", err);
      }
    } else {
      // If validation fails, show an error toast
      toast.error("Please correct the errors in the form.");
      setSubmitted(false); // Ensure submitted state is false if validation fails
    }
  };

  return (
    <div className="bg-gray-50 min-h-screen py-16 px-4 md:px-16">
      <Toaster position="top-right" reverseOrder={false} /> {/* Toaster component added */}

      {/* Header Section */}
      <div className="max-w-6xl mx-auto text-center mb-12">
        <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
          Cultural & Language Support
        </h1>
        <p className="text-lg text-gray-600 max-w-3xl mx-auto">
          Our interpreters and cultural experts help bridge language gaps, ensuring you feel
          understood and supported throughout your treatment journey.
        </p>
      </div>

      {/* Info Section */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-start max-w-6xl mx-auto mb-16">
        <div className="bg-white p-6 rounded-xl shadow-md">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">
            What’s Included
          </h2>
          <ul className="space-y-3 text-left">
            {[
              "Multilingual interpreters",
              "Cultural orientation support",
              "Assistance with hospital formalities",
              "Translation of medical documents",
            ].map((item, index) => (
              <li key={index} className="flex items-center">
                <CheckCircle className="w-5 h-5 text-green-500 mr-3" />
                <span className="text-gray-700">{item}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="rounded-xl overflow-hidden shadow-md">
          <img
            src={languageImg}
            alt="Cultural & Language Support"
            className="w-full h-full object-cover"
          />
        </div>

        <div className="bg-white p-6 rounded-xl shadow-md text-left">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">
            More Information
          </h2>
          <p className="text-gray-700 leading-relaxed">
            We ensure clear and compassionate communication between patients and healthcare
            providers. Our multilingual team and cultural liaisons make sure you are comfortable,
            informed, and understood at every step.
          </p>
        </div>
      </div>

      {/* Form + Images */}
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-10 bg-white p-8 rounded-2xl shadow-xl items-center">
        {/* LEFT SIDE — Form */}
        <div>
          <h2 className="text-2xl font-semibold text-gray-800 mb-6 text-center md:text-left">
            Request Cultural or Language Assistance
          </h2>

          {submitted ? (
            <div className="text-center text-green-600 font-medium text-lg">
              ✅ Thank you! Our support team will contact you shortly.
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-5">
              {/* Full Name */}
              <div>
                <label className="block text-gray-700 font-medium mb-2">
                  Full Name
                </label>
                <input
                  type="text"
                  value={formData.fullName}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      // ONLY THIS LINE WAS ADDED/MODIFIED from your previous update
                      fullName: e.target.value.replace(/[0-9]/g, ""),
                    })
                  }
                  className={`w-full border ${
                    errors.fullName ? "border-red-500" : "border-gray-300"
                  } rounded-lg p-3 focus:ring-2 focus:ring-blue-500 focus:outline-none`}
                  placeholder="Enter your full name"
                />
                {errors.fullName && (
                  <p className="text-red-500 text-sm mt-1">{errors.fullName}</p>
                )}
              </div>

              {/* Country */}
              <div>
                <label className="block text-gray-700 font-medium mb-2">
                  Country
                </label>
                <select
                  value={formData.country}
                  onChange={(e) =>
                    setFormData({ ...formData, country: e.target.value })
                  }
                  className={`w-full border ${
                    errors.country ? "border-red-500" : "border-gray-300"
                  } rounded-lg p-3 focus:ring-2 focus:ring-blue-500 focus:outline-none`}
                >
                  <option value="">Select your country</option>
                  {isLoading ? (
                    <option disabled>Loading countries...</option>
                  ) : error ? (
                    <option disabled>Error loading countries: {error}</option>
                  ) : (
                    countries.map((c) => (
                      <option key={c.name} value={c.name}>
                        {c.name}
                      </option>
                    ))
                  )}
                </select>
                {errors.country && (
                  <p className="text-red-500 text-sm mt-1">{errors.country}</p>
                )}
              </div>

              {/* Phone Number */}
              <div>
                <label className="block text-gray-700 font-medium mb-2">Phone Number</label>
                <PhoneInput
                  country={"in"}  // ISO code for India
                  value={formData.phone}
                  onChange={(phone) => setFormData({ ...formData, phone })}
                  containerClass="w-full"
                  inputClass={`!w-full !py-2.5 !text-xs md:!text-sm !border ${
                    errors.phone ? "!border-red-500" : "!border-blue-300"
                  } !rounded-lg focus:!ring-2 focus:!ring-blue-500 focus:!outline-none`}
                />
                {errors.phone && (
                  <p className="text-red-500 text-sm mt-1">{errors.phone}</p>
                )}
              </div>

              {/* Message */}
              <div>
                <label className="block text-gray-700 font-medium mb-2">
                  Describe Your Needs
                </label>
                <textarea
                  value={formData.message}
                  onChange={(e) =>
                    setFormData({ ...formData, message: e.target.value })
                  }
                  className={`w-full border ${
                    errors.message ? "border-red-500" : "border-gray-300"
                  } rounded-lg p-3 h-28 focus:ring-2 focus:ring-blue-500 focus:outline-none`}
                  placeholder="Tell us what kind of cultural or translation support you need..."
                />
                {errors.message && (
                  <p className="text-red-500 text-sm mt-1">{errors.message}</p>
                )}
              </div>

              {/* Files */}
              <div>
                <label className="block text-gray-700 font-medium mb-2">
                  Attach Related Documents (optional)
                </label>
                <input
                  type="file"
                  multiple
                  onChange={handleFileChange}
                  className={`w-full border ${
                    errors.files ? "border-red-500" : "border-gray-300"
                  } rounded-lg p-2 bg-gray-50 focus:ring-2 focus:ring-blue-500 focus:outline-none`}
                />
                {formData.files.length > 0 && (
                  <ul className="mt-2 text-sm text-gray-600">
                    {formData.files.map((file, index) => (
                      <li key={index}>📎 {file.name}</li>
                    ))}
                  </ul>
                )}
                {errors.files && (
                  <p className="text-red-500 text-sm mt-1">{errors.files}</p>
                )}
              </div>

              {/* Submit */}
              <div className="text-center md:text-left">
                <button
                  type="submit"
                  className="bg-blue-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-blue-700 transition-all duration-200"
                >
                  Submit Request
                </button>
              </div>
            </form>
          )}
        </div>

        {/* RIGHT SIDE — Images */}
        <div className="space-y-4">
          <img
            src={img1}
            alt="Cultural Support 1"
            className="w-full h-60 object-cover rounded-xl shadow-md"
          />
          <img
            src={img2}
            alt="Cultural Support 2"
            className="w-full h-60 object-cover rounded-xl shadow-md"
          />
        </div>
      </div>
    </div>
  );
};

export default CultureAndLanguage;