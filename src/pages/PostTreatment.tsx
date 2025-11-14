import React, { useEffect, useState } from "react";
import { CheckCircle } from "lucide-react";
import postTreatmentImg from "@/assets/serviceSection.jpeg";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import img1 from "../assets/1.jpeg";
import img2 from "../assets/3.jpeg";
import img3 from "../assets/c2.jpeg";
import "country-select-js";
import "country-select-js/build/css/countrySelect.min.css";
import $ from "jquery";
import toast, { Toaster } from "react-hot-toast";

const PostTreatment: React.FC = () => {
  const [formData, setFormData] = useState({
    fullName: "",
    phone: "",
    country: "",
    message: "",
    files: [] as File[],
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    const $countryInput = ($("#countryInput") as any);

    $countryInput.countrySelect({
      preferredCountries: ["in", "us", "gb"],
      responsiveDropdown: true,
    });

    const onCountryChange = () => {
      const countryData = $countryInput.countrySelect("getSelectedCountryData");
      setFormData((prev) => ({
        ...prev,
        country: countryData.name || "",
        phone: countryData.iso2 ? `+${countryData.dialCode}` : prev.phone,
      }));
    };

    const initialCountryData = $countryInput.countrySelect("getSelectedCountryData");
    if (initialCountryData && initialCountryData.name) {
      setFormData((prev) => ({
        ...prev,
        country: initialCountryData.name,
        phone: initialCountryData.iso2 ? `+${initialCountryData.dialCode}` : prev.phone,
      }));
    }

    $countryInput.on("countrychange", onCountryChange);

    return () => {
      $countryInput.off("countrychange", onCountryChange);
    };
  }, []);

  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    if (!formData.fullName.trim()) {
      newErrors.fullName = "Full name is required.";
    } else if (!/^[A-Za-z\s]*$/.test(formData.fullName.trim())) {
      newErrors.fullName = "Full name must contain only alphabets.";
    }
    if (!formData.phone.trim()) {
      newErrors.phone = "Phone number is required.";
    }
    if (!formData.country.trim()) {
      newErrors.country = "Country is required.";
    }
    if (!formData.message.trim()) {
      newErrors.message = "Please describe your follow-up needs.";
    }
    if (formData.files.length > 5) {
      newErrors.files = "You can upload up to 5 files only.";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const newFiles = Array.from(e.target.files).slice(0, 5);
      setFormData({ ...formData, files: newFiles });
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
    if (!validateForm()) {
      setSubmitted(false);
      toast.error("Please correct the errors in the form.");
      return;
    }

    try {
      const dataToSend = new FormData();
      dataToSend.append("fullName", formData.fullName);
      dataToSend.append("phone", formData.phone);
      dataToSend.append("country", formData.country);
      dataToSend.append("message", formData.message);

      formData.files.forEach((file) => dataToSend.append("files", file));

      const response = await fetch(
        "http://192.168.1.10:5000/api/v1/veramed/create-culture-and-language",
        { method: "POST", body: dataToSend }
      );

      if (response.ok) {
        setSubmitted(true);
        toast.success(
          "Request submitted successfully! Our care team will contact you shortly."
        );
        setFormData({ fullName: "", phone: "", country: "", message: "", files: [] });
        setErrors({});

        const $countryInput = ($("#countryInput") as any);
        $countryInput.countrySelect("selectCountry", "us");
      } else {
        toast.error("Failed to submit request. Please try again.");
      }
    } catch (err) {
      console.error(err);
      toast.error("An error occurred. Please check your network and try again.");
    }
  };

  return (
    <div className="bg-gray-50 min-h-screen py-16 px-4 md:px-16">
      <Toaster position="top-right" reverseOrder={false} />

      {/* Header */}
      <div className="max-w-6xl mx-auto text-center mb-12">
        <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
          Post-Treatment Follow-Up
        </h1>
        <p className="text-lg text-gray-600 max-w-3xl mx-auto">
          We stay connected after your treatment with continuous support, online consultations, and coordination with your local healthcare providers.
        </p>
      </div>

      {/* Info Section */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-start max-w-6xl mx-auto mb-16">
        <div className="bg-white p-6 rounded-xl shadow-md">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">What’s Included</h2>
          <ul className="space-y-3 text-left">
            {[
              "Online follow-up consultations",
              "Medical report tracking",
              "Coordination with home doctor",
              "Long-term care and recovery guidance",
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
            src={postTreatmentImg}
            alt="Post Treatment Follow Up"
            className="w-full h-full object-cover"
          />
        </div>

        <div className="bg-white p-6 rounded-xl shadow-md text-left">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">More Information</h2>
          <p className="text-gray-700 leading-relaxed">
            Our post-treatment care ensures smooth recovery through consistent virtual check-ins, medical monitoring, and collaboration with your home country physicians.
          </p>
        </div>
      </div>

      {/* Form + Images - separate divs with shadow */}
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-10">
        {/* Form */}
        <div className="bg-white p-8 rounded-2xl shadow-xl border border-gray-200">
          <h2 className="text-2xl font-semibold text-gray-800 mb-6 text-center md:text-left">
            Request Post-Treatment Support
          </h2>

          {submitted ? (
            <div className="text-center text-green-600 font-medium text-lg p-6 bg-green-50 rounded-lg shadow border border-green-200">
              ✅ Thank you! Our care team will reach out to assist you soon.
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-5">
              {/* Full Name */}
              <div>
                <label className="block text-gray-700 font-medium mb-2">Full Name</label>
                <input
                  type="text"
                  value={formData.fullName}
                  onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                  className={`w-full border ${errors.fullName ? "border-red-500" : "border-gray-300"} rounded-lg p-3 focus:ring-2 focus:ring-blue-500 focus:outline-none`}
                  placeholder="Enter your full name"
                />
                {errors.fullName && <p className="text-red-500 text-sm mt-1">{errors.fullName}</p>}
              </div>

              {/* Country */}
              <div>
                <label className="block text-gray-700 font-medium mb-2">Country</label>
                <input
                  id="countryInput"
                  type="text"
                  placeholder="Select your country"
                  className={`w-full border ${errors.country ? "border-red-500" : "border-gray-300"} rounded-lg p-3 focus:ring-2 focus:ring-blue-500 focus:outline-none`}
                />
                {errors.country && <p className="text-red-500 text-sm mt-1">{errors.country}</p>}
              </div>

              {/* Phone */}
              <div>
                <label className="block text-gray-700 font-medium mb-2">Phone Number</label>
                <PhoneInput
                  country={formData.country ? ($("#countryInput") as any).countrySelect("getSelectedCountryData")?.iso2 || "us" : "us"}
                  value={formData.phone}
                  onChange={(phone, countryData) => {
                    setFormData({
                      ...formData,
                      phone: phone,
                      country: (countryData as any)?.name || formData.country,
                    });
                    const $countryInput = ($("#countryInput") as any);
                    if ((countryData as any)?.iso2) {
                      $countryInput.countrySelect("selectCountry", (countryData as any).iso2);
                    }
                  }}
                  containerClass="w-full"
                  inputClass={`!w-full !py-2.5 !text-sm !border ${errors.phone ? "!border-red-500" : "!border-gray-300"} !rounded-lg focus:!ring-2 focus:!ring-blue-500 focus:!outline-none`}
                />
                {errors.phone && <p className="text-red-500 text-sm mt-1">{errors.phone}</p>}
              </div>

              {/* Message */}
              <div>
                <label className="block text-gray-700 font-medium mb-2">Describe Your Follow-Up Needs</label>
                <textarea
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  className={`w-full border ${errors.message ? "border-red-500" : "border-gray-300"} rounded-lg p-3 h-28 focus:ring-2 focus:ring-blue-500 focus:outline-none`}
                  placeholder="Tell us about your follow-up care or support requirements..."
                />
                {errors.message && <p className="text-red-500 text-sm mt-1">{errors.message}</p>}
              </div>

              {/* File Upload */}
              <div>
                <label className="block text-gray-700 font-medium mb-2">Upload Medical Documents (Optional)</label>
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center bg-gray-50 hover:bg-gray-100 transition cursor-pointer">
                  <input type="file" multiple onChange={handleFileChange} className="hidden" id="fileUpload" />
                  <label htmlFor="fileUpload" className="cursor-pointer">
                    <div className="flex flex-col items-center">
                      <p className="text-blue-600 font-medium">Click to upload</p>
                      <p className="text-gray-500 text-sm">or drag and drop<br />Image, PDF, DOC/DOCX (max. 10MB)</p>
                    </div>
                  </label>
                </div>
                {formData.files.length > 0 && (
                  <ul className="mt-2 text-sm text-gray-600">
                    {formData.files.map((file, index) => (
                      <li key={index}>📎 {file.name}</li>
                    ))}
                  </ul>
                )}
                {errors.files && <p className="text-red-500 text-sm mt-1">{errors.files}</p>}
              </div>

              {/* Submit */}
              <div className="text-center md:text-left">
                <button type="submit" className="bg-blue-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-blue-700 transition-all duration-200">
                  Submit Request
                </button>
              </div>
            </form>
          )}
        </div>

        {/* Images */}
        <div className="space-y-4 bg-white p-6 rounded-2xl shadow-xl border border-gray-200">
          <img src={img1} alt="Post-Treatment Image 1" className="w-full h-60 object-cover rounded-xl shadow-md" />
          <img src={img2} alt="Post-Treatment Image 2" className="w-full h-60 object-cover rounded-xl shadow-md" />
          <img src={img3} alt="Post-Treatment Image 3" className="w-full h-60 object-cover rounded-xl shadow-md" />
        </div>
      </div>
    </div>
  );
};

export default PostTreatment;
