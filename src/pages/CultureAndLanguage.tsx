import React, { useEffect, useState, useRef } from "react";
import { CheckCircle } from "lucide-react";
import languageImg from "@/assets/c&l.jpeg";
import "react-phone-input-2/lib/style.css";
import PhoneInput from "react-phone-input-2";
import "country-select-js/build/css/countrySelect.css";
import $ from "jquery";
import "country-select-js";
import img1 from "../assets/c1.jpg";
import img2 from "../assets/c2.jpeg";
import { apiClient } from "@/lib/apiClient";
import toast, { Toaster } from "react-hot-toast";

const CultureAndLanguage: React.FC = () => {
  const [formData, setFormData] = useState<{
    fullName: string;
    phone: string;
    country: string;
    message: string;
    files: File[];
  }>({
    fullName: "",
    phone: "+91",
    country: "",
    message: "",
    files: [],
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submitted, setSubmitted] = useState(false);
  const countryInputRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    if (countryInputRef.current) {
      const $input = $(countryInputRef.current);
      $input.countrySelect({
        preferredCountries: ["in", "us", "gb", "ae"],
        responsiveDropdown: true,
      });

      if (!formData.country) {
        const countryData = $input.countrySelect("getSelectedCountryData");
        setFormData((prev) => ({ ...prev, country: countryData.name || "" }));
      }

      $input.on("countrychange", function (_e: any, countryData: any) {
        setFormData((prev) => ({
          ...prev,
          country: countryData?.name || "",
        }));
      });

      $(".country-select").css({ width: "100%", maxWidth: "400px" });
    }

    return () => {
      if (countryInputRef.current) $(countryInputRef.current).off("countrychange");
    };
  }, []);

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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) {
      toast.error("Please correct the errors in the form.");
      setSubmitted(false);
      return;
    }

    try {
      const dataToSend = new FormData();
      dataToSend.append("fullName", formData.fullName);
      dataToSend.append("phone", formData.phone);
      dataToSend.append("country", formData.country);
      dataToSend.append("message", formData.message);
      formData.files.forEach((file) => dataToSend.append("files", file));

      const response = await apiClient.post(
        "/api/v1/veramed/create-culture-and-language",
        dataToSend
      );

      if (response.status === 200 || response.status === 201) {
        setSubmitted(true);
        toast.success(
          "Request submitted successfully! Our team will contact you shortly."
        );
        setFormData({
          fullName: "",
          phone: "+91",
          country: "",
          message: "",
          files: [],
        });
        setErrors({});
      } else {
        toast.error("Failed to submit request. Please try again.");
      }
    } catch (err) {
      console.error("API call failed:", err);
      toast.error("An error occurred. Please check your network and try again.");
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const newFiles = Array.from(e.target.files);
      const validFiles = newFiles.filter((file) => file.size <= 10 * 1024 * 1024);
      const oversized = newFiles.filter((file) => file.size > 10 * 1024 * 1024);

      if (oversized.length > 0) {
        toast.error("Some files were too large (max 10MB each) and were skipped.");
      }

      setFormData((prev) => ({
        ...prev,
        files: [...prev.files, ...validFiles].slice(0, 5),
      }));
    }
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    const droppedFiles = Array.from(e.dataTransfer.files);
    const validFiles = droppedFiles.filter((file) => file.size <= 10 * 1024 * 1024);
    const oversized = droppedFiles.filter((file) => file.size > 10 * 1024 * 1024);

    if (oversized.length > 0) {
      toast.error("Some files were too large (max 10MB each) and were skipped.");
    }

    setFormData((prev) => ({
      ...prev,
      files: [...prev.files, ...validFiles].slice(0, 5),
    }));
  };

  return (
    <div className="bg-gray-50 min-h-screen py-16 px-4 md:px-16">
      <Toaster position="top-right" toastOptions={{ duration: 4000 }} />

      {/* Header */}
      <div className="max-w-6xl mx-auto text-center mb-12">
        <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
          Cultural & Language Support
        </h1>
        <p className="text-lg text-gray-600 max-w-3xl mx-auto">
          Our interpreters and cultural experts help bridge language gaps, ensuring you
          feel understood and supported throughout your treatment journey.
        </p>
      </div>

      {/* Info Section */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-start max-w-6xl mx-auto mb-16">
        <div className="bg-white p-6 rounded-xl shadow-md border border-blue-300">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">What’s Included</h2>
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

        <div className="rounded-xl overflow-hidden shadow-md border border-blue-300">
          <img
            src={languageImg}
            alt="Cultural & Language Support"
            className="w-full h-full object-cover"
          />
        </div>

        <div className="bg-white p-6 rounded-xl shadow-md border border-blue-300 text-left">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">More Information</h2>
          <p className="text-gray-700 leading-relaxed">
            We ensure clear and compassionate communication between patients and
            healthcare providers. Our multilingual team and cultural liaisons
            make sure you are comfortable, informed, and understood at every step.
          </p>
        </div>
      </div>

      {/* Form and Images */}
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-10">
        {/* Form */}
        <div className="bg-white p-8 rounded-2xl shadow-xl border border-blue-400">
          <h2 className="text-2xl font-semibold text-gray-800 mb-6 text-center md:text-left">
            Request Cultural or Language Assistance
          </h2>

          {submitted ? (
            <div className="text-center text-green-600 font-medium text-lg">
              ✅ Thank you! We'll contact you shortly.
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-5">
              {/* Full Name */}
              <div>
                <label className="block text-gray-700 font-medium mb-2">Full Name</label>
                <input
                  type="text"
                  value={formData.fullName}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      fullName: e.target.value.replace(/[0-9]/g, ""),
                    })
                  }
                  className="w-full border border-blue-300 rounded-lg p-3 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                  placeholder="Enter your full name"
                />
                {errors.fullName && (
                  <p className="text-red-500 text-sm mt-1">{errors.fullName}</p>
                )}
              </div>

              {/* Country */}
              <div>
                <label className="block text-gray-700 font-medium mb-2">Country</label>
                <input
                  ref={countryInputRef}
                  type="text"
                  value={formData.country}
                  readOnly
                  className="w-full border border-blue-300 rounded-lg p-3 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                  placeholder="Select your country"
                />
                {errors.country && (
                  <p className="text-red-500 text-sm mt-1">{errors.country}</p>
                )}
              </div>

              {/* Phone */}
              <div>
                <label className="block text-gray-700 font-medium mb-2">Phone Number</label>
                <PhoneInput
                  country={"in"}
                  value={formData.phone}
                  onChange={(value: string) => setFormData({ ...formData, phone: value })}
                  containerClass="w-full"
                  inputClass="!w-full !py-2.5 !text-sm !border !border-blue-300 !rounded-lg focus:!ring-2 focus:!ring-blue-500 focus:!outline-none"
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
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  className="w-full border border-blue-300 rounded-lg p-3 h-28 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                  placeholder="Tell us what kind of cultural or translation support you need..."
                />
                {errors.message && (
                  <p className="text-red-500 text-sm mt-1">{errors.message}</p>
                )}
              </div>

              {/* File Upload */}
              <div>
                <label className="block text-gray-700 font-medium mb-2">
                  Upload Medical Documents (Optional)
                </label>
                <div
                  className="border-2 border-dashed border-blue-300 rounded-xl p-6 text-center hover:border-blue-500 transition-all duration-200 bg-gray-50 cursor-pointer"
                  onClick={() => document.getElementById("fileInput")?.click()}
                  onDragOver={(e) => e.preventDefault()}
                  onDrop={handleDrop}
                >
                  <p className="text-blue-600 font-medium mt-3">
                    Click to upload
                    <span className="text-gray-600 font-normal"> or drag and drop</span>
                  </p>
                  <p className="text-gray-500 text-sm mt-1">
                    Image, PDF, DOC/DOCX (max. 10MB)
                  </p>

                  <input
                    id="fileInput"
                    type="file"
                    multiple
                    onChange={handleFileChange}
                    className="hidden"
                    accept=".jpg,.jpeg,.png,.pdf,.doc,.docx"
                  />
                </div>

                {formData.files.length > 0 && (
                  <ul className="mt-3 text-sm text-gray-700 text-left space-y-1">
                    {formData.files.map((file, index) => (
                      <li
                        key={index}
                        className="flex items-center justify-between border-b border-gray-100 pb-1"
                      >
                        <span>📎 {file.name}</span>
                        <button
                          type="button"
                          onClick={() =>
                            setFormData((prev) => ({
                              ...prev,
                              files: prev.files.filter((_, i) => i !== index),
                            }))
                          }
                          className="text-red-500 hover:text-red-700 text-xs"
                        >
                          Remove
                        </button>
                      </li>
                    ))}
                  </ul>
                )}
                {errors.files && (
                  <p className="text-red-500 text-sm mt-1">{errors.files}</p>
                )}
              </div>

              <div className="text-center md:text-left">
                <button
                  type="submit"
                  className="bg-blue-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-blue-700 transition-all duration-200 border border-blue-800"
                >
                  Submit Request
                </button>
              </div>
            </form>
          )}
        </div>

        {/* Images */}
        <div className="bg-white p-6 rounded-2xl shadow-xl border border-blue-400 space-y-4">
          {[img1, img2].map((img, i) => (
            <img
              key={i}
              src={img}
              alt={`Cultural ${i}`}
              className="w-full h-60 object-cover rounded-xl shadow-md border border-blue-200"
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default CultureAndLanguage;
