import React, { useEffect, useState } from "react";
import axios from "axios";
import { CheckCircle } from "lucide-react";
import treatmentImg from "@/assets/p&t1.png";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import img1 from "../assets/1.jpeg";
import img2 from "../assets/2.jpeg";
import img3 from "../assets/3.jpeg";
import $ from "jquery";
import "country-select-js";
import "country-select-js/build/css/countrySelect.min.css";
import toast, { Toaster } from "react-hot-toast";

// ⭐ ADD FOOTER IMPORT
import Footer from "@/components/Footer";

const TreatmentAndPlanning: React.FC = () => {
  const [formData, setFormData] = useState({
    fullName: "",
    phone: "+91",
    country: "",
    message: "",
    files: [] as File[],
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    const $countryInput = $("#countryInput") as any;

    if ($countryInput.length) {
      $countryInput.countrySelect({
        preferredCountries: ["in", "us", "gb"],
        responsiveDropdown: true,
      });

      $(".country-select, .country-list").css({
        width: "100%",
        maxWidth: "400px",
      });

      const handleCountryChange = () => {
        const countryData = $countryInput.countrySelect("getSelectedCountryData");
        if (countryData && countryData.name) {
          setFormData((prev) => ({
            ...prev,
            country: countryData.name,
          }));
        }
      };

      $countryInput.on("change blur", handleCountryChange);
      return () => $countryInput.off("change blur", handleCountryChange);
    }
  }, []);

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.fullName.trim()) {
      newErrors.fullName = "Full name is required.";
    } else if (!/^[A-Za-z\s]+$/.test(formData.fullName.trim())) {
      newErrors.fullName = "Full name must contain only letters and spaces.";
    }

    if (!formData.phone.trim()) newErrors.phone = "Phone number is required.";
    if (!formData.country.trim()) newErrors.country = "Country is required.";
    if (!formData.message.trim())
      newErrors.message = "Please describe your treatment needs.";
    if (formData.files.length > 5)
      newErrors.files = "You can upload up to 5 files only.";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
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
        files: [...prev.files, ...validFiles],
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
      files: [...prev.files, ...validFiles],
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) {
      toast.error("Please fill all required fields correctly.");
      return;
    }

    try {
      const formDataToSend = new FormData();
      formDataToSend.append("fullName", formData.fullName);
      formDataToSend.append("phone", formData.phone);
      formDataToSend.append("country", formData.country);
      formDataToSend.append("message", formData.message);
      formData.files.forEach((file) => formDataToSend.append("files", file));

      const response = await axios.post(
        "http://192.168.1.10:5000/api/v1/veramed/create-culture-and-language",
        formDataToSend,
        { headers: { "Content-Type": "multipart/form-data" } }
      );

      console.log("✅ API Response:", response.data);
      toast.success("Form submitted successfully!");
      setSubmitted(true);
      setFormData({ fullName: "", phone: "+91", country: "", message: "", files: [] });
    } catch (error) {
      console.error("❌ Error submitting form:", error);
      toast.error("Something went wrong. Please try again later.");
    }
  };

  return (
    <>
      <div className="bg-gray-50 min-h-screen py-16 px-4 md:px-16">
        <Toaster position="top-right" toastOptions={{ duration: 4000 }} />

        {/* Header */}
        <div className="max-w-6xl mx-auto text-center mb-12">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
            Treatment Planning & Hospital Selection
          </h1>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            We personalize your treatment journey by connecting you with world-class
            hospitals and experts based on your medical condition and preferences.
          </p>
        </div>

        {/* Info Section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-start max-w-6xl mx-auto mb-16">
          <div className="bg-white p-6 rounded-xl shadow-md border border-blue-300">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">What’s Included</h2>
            <ul className="space-y-3 text-left">
              {[
                "Personalized treatment plans",
                "Expert doctor recommendations",
                "Accredited hospital options",
                "Cost estimate comparison",
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
              src={treatmentImg}
              alt="Treatment Planning"
              className="w-full h-full object-cover"
            />
          </div>

          <div className="bg-white p-6 rounded-xl shadow-md border border-blue-300 text-left">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">More Information</h2>
            <p className="text-gray-700 leading-relaxed">
              Our team evaluates your medical reports and preferences to match you with
              the best hospitals and doctors. We also help you compare costs and success
              rates for the best decision.
            </p>
          </div>
        </div>

        {/* Form and Images */}
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Form Section */}
          <div className="bg-white p-8 rounded-2xl shadow-xl border border-blue-400">
            <h2 className="text-2xl font-semibold text-gray-800 mb-6 text-center md:text-left">
              Get a Personalized Treatment Plan
            </h2>

            {submitted ? (
              <div className="text-center text-green-600 font-medium text-lg">
                ✅ Thank you! We’ll contact you soon with your treatment plan.
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
                    id="countryInput"
                    type="text"
                    value={formData.country}
                    onChange={(e) => setFormData({ ...formData, country: e.target.value })}
                    className="w-full border border-blue-300 rounded-lg p-3 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                    placeholder="Select your country"
                    readOnly
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
                    onChange={(phone) => setFormData({ ...formData, phone })}
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
                    Describe Your Treatment Needs
                  </label>
                  <textarea
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className="w-full border border-blue-300 rounded-lg p-3 h-28 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                    placeholder="Tell us about your medical condition..."
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

          {/* Images Section */}
          <div className="bg-white p-6 rounded-2xl shadow-xl border border-blue-400 space-y-4">
            {[img1, img2, img3].map((img, i) => (
              <img
                key={i}
                src={img}
                alt={`Treatment ${i}`}
                className="w-full h-60 object-cover rounded-xl shadow-md border border-blue-200"
              />
            ))}
          </div>
        </div>
      </div>

     
      <Footer />

    </>
  );
};

export default TreatmentAndPlanning;
