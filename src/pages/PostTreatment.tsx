import React, { useEffect, useState } from "react";
import { CheckCircle } from "lucide-react";
import postTreatmentImg from "@/assets/serviceSection.jpeg";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import img1 from "../assets/1.jpeg";
import img2 from "../assets/3.jpeg";
import img3 from "../assets/c2.jpeg";
import useCountryStore from "@/store/useCountryStore "; // not take number in Full Name - Assuming this is a comment and the path is correct

const PostTreatment: React.FC = () => {
  const [formData, setFormData] = useState({
    fullName: "",
    phone: "+91",
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
    // Only set file error if files exceed limit
    if (formData.files.length > 5) {
      newErrors.files = "You can upload up to 5 files only.";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      // Limit file selection to 5
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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
      setSubmitted(true);
      console.log("✅ Form Submitted:", formData);
      // Here you would typically send formData to your backend
      // Reset form if needed:
      // setFormData({ fullName: "", phone: "+91", country: "", message: "", files: [] });
    } else {
      setSubmitted(false); // If validation fails, ensure submitted state is false
    }
  };

  return (
    <div className="bg-gray-50 min-h-screen py-16 px-4 md:px-16">
      {/* Header Section */}
      <div className="max-w-6xl mx-auto text-center mb-12">
        <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
          Post-Treatment Follow-Up
        </h1>
        <p className="text-lg text-gray-600 max-w-3xl mx-auto">
          We stay connected after your treatment with continuous support,
          online consultations, and coordination with your local healthcare providers.
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
            Our post-treatment care ensures smooth recovery through consistent
            virtual check-ins, medical monitoring, and collaboration with your
            home country physicians. Your healing journey continues with us.
          </p>
        </div>
      </div>

      {/* Form + Images */}
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-10 bg-white p-8 rounded-2xl shadow-xl items-center">
        {/* LEFT SIDE — Form */}
        <div>
          <h2 className="text-2xl font-semibold text-gray-800 mb-6 text-center md:text-left">
            Request Post-Treatment Support
          </h2>

          {submitted ? (
            <div className="text-center text-green-600 font-medium text-lg">
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
                  onChange={(e) =>
                    setFormData({ ...formData, fullName: e.target.value })
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
                <label className="block text-gray-700 font-medium mb-2">Country</label>
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
                  Describe Your Follow-Up Needs
                </label>
                <textarea
                  value={formData.message}
                  onChange={(e) =>
                    setFormData({ ...formData, message: e.target.value })
                  }
                  className={`w-full border ${
                    errors.message ? "border-red-500" : "border-gray-300"
                  } rounded-lg p-3 h-28 focus:ring-2 focus:ring-blue-500 focus:outline-none`}
                  placeholder="Tell us about your follow-up care or support requirements..."
                />
                {errors.message && (
                  <p className="text-red-500 text-sm mt-1">{errors.message}</p>
                )}
              </div>

              {/* Files */}
              <div>
                <label className="block text-gray-700 font-medium mb-2">
                  Attach Medical Reports (optional)
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
            alt="Post-Treatment Image 1"
            className="w-full h-60 object-cover rounded-xl shadow-md"
          />
          <img
            src={img2}
            alt="Post-Treatment Image 2"
            className="w-full h-60 object-cover rounded-xl shadow-md"
          />
          <img
            src={img3}
            alt="Post-Treatment Image 3"
            className="w-full h-60 object-cover rounded-xl shadow-md"
          />
        </div>
      </div>
    </div>
  );
};

export default PostTreatment;