import React, { useState } from "react";
import { CheckCircle } from "lucide-react";
import img from "../assets/visa1.jpeg";
import img2 from "../assets/Tourist-Visa.jpg";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import toast, { Toaster } from "react-hot-toast";
import Footer from "@/components/Footer"; // ✅ import your Footer component

const VisaAndTravel: React.FC = () => {
  const [formData, setFormData] = useState({
    patientName: "",
    phoneNumber: "",
    attendantName: "",
    attendantPassport: null as File | null,
    patientPassport: null as File | null,
    additionalMessage: "",
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(false);

  // ✅ Validation
  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.patientName.trim()) {
      newErrors.patientName = "Please enter patient name.";
    } else if (!/^[A-Za-z\s]+$/.test(formData.patientName.trim())) {
      newErrors.patientName =
        "Patient name must contain only letters and spaces.";
    }

    if (!formData.phoneNumber.trim()) {
      newErrors.phoneNumber = "Please enter mobile number.";
    } else if (formData.phoneNumber.replace(/\D/g, "").length < 7) {
      newErrors.phoneNumber = "Enter a valid mobile number.";
    }

    if (!formData.attendantName.trim()) {
      newErrors.attendantName = "Please enter attendant name.";
    } else if (!/^[A-Za-z\s]+$/.test(formData.attendantName.trim())) {
      newErrors.attendantName =
        "Attendant name must contain only letters and spaces.";
    }

    if (!formData.attendantPassport)
      newErrors.attendantPassport = "Please attach attendant passport.";
    if (!formData.patientPassport)
      newErrors.patientPassport = "Please attach patient passport.";

    return newErrors;
  };

  // ✅ Submit Handler
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const validationErrors = validateForm();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setErrors({});
    setLoading(true);

    try {
      const data = new FormData();
      data.append("patientName", formData.patientName);
      data.append("phoneNumber", formData.phoneNumber);
      data.append("attendantName", formData.attendantName);
      data.append("additionalMessage", formData.additionalMessage);
      if (formData.attendantPassport)
        data.append("attendantPassport", formData.attendantPassport);
      if (formData.patientPassport)
        data.append("patientPassport", formData.patientPassport);

      const response = await fetch(
        "http://192.168.1.10:5000/api/v1/veramed/visa-and-travel",
        {
          method: "POST",
          body: data,
        }
      );

      if (response.ok) {
        toast.success("✅ Visa & Travel form submitted successfully!");
        setFormData({
          patientName: "",
          phoneNumber: "",
          attendantName: "",
          attendantPassport: null,
          patientPassport: null,
          additionalMessage: "",
        });
      } else {
        const err = await response.json();
        toast.error(err.message || "❌ Something went wrong. Please try again.");
      }
    } catch (error) {
      console.error("Error submitting form:", error);
      toast.error("❌ Failed to submit form. Please check your connection.");
    } finally {
      setLoading(false);
    }
  };

  // ✅ File Upload Handler
  const handleFileChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    field: "attendantPassport" | "patientPassport"
  ) => {
    if (e.target.files && e.target.files[0]) {
      setFormData({ ...formData, [field]: e.target.files[0] });
    }
  };

  return (
    <>
      <div className="bg-gray-50 min-h-screen py-16 px-4 md:px-16">
        <Toaster position="top-center" reverseOrder={false} />

        {/* Header */}
        <div className="max-w-6xl mx-auto text-center mb-12">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
            Visa & Travel Logistics
          </h1>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            From visas to airport pickup and hotels, we manage all your travel
            arrangements so you can focus on recovery.
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
                "Medical visa assistance",
                "Flight and accommodation bookings",
                "Airport pick-up and drop",
                "24/7 travel coordination",
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
              src={img}
              alt="Visa and Travel Logistics"
              className="w-full h-full object-cover"
            />
          </div>

          <div className="bg-white p-6 rounded-xl shadow-md text-left">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">
              More Information
            </h2>
            <p className="text-gray-700 leading-relaxed">
              We simplify the entire travel process by helping you acquire a
              medical visa, booking flights and hotels close to the hospital,
              and arranging airport pickup — so your medical journey starts
              stress-free.
            </p>
          </div>
        </div>

        {/* --- FORM and IMAGE section --- */}
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-10">
          {/* Form Box */}
          <div className="bg-white p-8 rounded-2xl shadow-xl">
            <h2 className="text-2xl font-semibold text-gray-800 mb-6 text-center md:text-left">
              Visa & Travel Assistance Form
            </h2>

            <form onSubmit={handleSubmit} className="space-y-5">
              {/* Patient Name */}
              <div>
                <label className="block text-gray-700 font-medium mb-2">
                  Patient Name
                </label>
                <input
                  type="text"
                  value={formData.patientName}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      patientName: e.target.value.replace(/[0-9]/g, ""),
                    })
                  }
                  className={`w-full border rounded-lg p-3 focus:ring-2 focus:ring-blue-500 outline-none ${
                    errors.patientName ? "border-red-500" : "border-gray-300"
                  }`}
                  placeholder="Enter patient name"
                />
                {errors.patientName && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.patientName}
                  </p>
                )}
              </div>

              {/* Mobile Number */}
              <div>
                <label className="block text-gray-700 font-medium mb-2">
                  Mobile Number
                </label>
                <PhoneInput
                  country={"in"}
                  value={formData.phoneNumber}
                  onChange={(value) =>
                    setFormData({ ...formData, phoneNumber: value || "" })
                  }
                  inputProps={{ name: "phoneNumber", required: true }}
                  containerClass="w-full"
                  inputClass={`!w-full !py-2.5 !border !rounded-lg focus:!ring-2 focus:!ring-blue-500 outline-none ${
                    errors.phoneNumber ? "!border-red-500" : "!border-gray-300"
                  }`}
                />
                {errors.phoneNumber && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.phoneNumber}
                  </p>
                )}
              </div>

              {/* Attendant Name */}
              <div>
                <label className="block text-gray-700 font-medium mb-2">
                  Attendant Name
                </label>
                <input
                  type="text"
                  value={formData.attendantName}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      attendantName: e.target.value.replace(/[0-9]/g, ""),
                    })
                  }
                  className={`w-full border rounded-lg p-3 focus:ring-2 focus:ring-blue-500 outline-none ${
                    errors.attendantName ? "border-red-500" : "border-gray-300"
                  }`}
                  placeholder="Enter attendant name"
                />
                {errors.attendantName && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.attendantName}
                  </p>
                )}
              </div>

              {/* Attendant Passport */}
              <div>
                <label className="block text-gray-700 font-medium mb-2">
                  Attach Attendant Passport
                </label>
                <div
                  className="border-2 border-dashed border-gray-300 rounded-xl p-5 text-center hover:border-blue-500 transition-all cursor-pointer bg-gray-50"
                  onClick={() =>
                    document.getElementById("attendantPassportInput")?.click()
                  }
                >
                  <p className="text-blue-600 font-medium mt-2">
                    Click to upload or drag and drop
                  </p>
                  <p className="text-gray-500 text-sm mt-1">
                    PDF, JPG, PNG (max. 10MB)
                  </p>
                  <input
                    id="attendantPassportInput"
                    type="file"
                    accept=".pdf,.jpg,.jpeg,.png"
                    onChange={(e) => handleFileChange(e, "attendantPassport")}
                    className="hidden"
                  />
                </div>
                {formData.attendantPassport && (
                  <p className="text-sm text-gray-600 mt-1">
                    📎 {formData.attendantPassport.name}
                  </p>
                )}
                {errors.attendantPassport && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.attendantPassport}
                  </p>
                )}
              </div>

              {/* Patient Passport */}
              <div>
                <label className="block text-gray-700 font-medium mb-2">
                  Attach Patient Passport
                </label>
                <div
                  className="border-2 border-dashed border-gray-300 rounded-xl p-5 text-center hover:border-blue-500 transition-all cursor-pointer bg-gray-50"
                  onClick={() =>
                    document.getElementById("patientPassportInput")?.click()
                  }
                >
                  <p className="text-blue-600 font-medium mt-2">
                    Click to upload or drag and drop
                  </p>
                  <p className="text-gray-500 text-sm mt-1">
                    PDF, JPG, PNG (max. 10MB)
                  </p>
                  <input
                    id="patientPassportInput"
                    type="file"
                    accept=".pdf,.jpg,.jpeg,.png"
                    onChange={(e) => handleFileChange(e, "patientPassport")}
                    className="hidden"
                  />
                </div>
                {formData.patientPassport && (
                  <p className="text-sm text-gray-600 mt-1">
                    📎 {formData.patientPassport.name}
                  </p>
                )}
                {errors.patientPassport && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.patientPassport}
                  </p>
                )}
              </div>

              {/* Additional Message */}
              <div>
                <label className="block text-gray-700 font-medium mb-2">
                  Additional Message (optional)
                </label>
                <textarea
                  rows={4}
                  value={formData.additionalMessage}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      additionalMessage: e.target.value,
                    })
                  }
                  className="w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-blue-500 outline-none"
                  placeholder="Enter any additional message"
                />
              </div>

              {/* Submit Button */}
              <div className="text-center md:text-left">
                <button
                  type="submit"
                  disabled={loading}
                  className={`bg-blue-600 text-white px-6 py-3 rounded-lg font-medium transition-all duration-200 ${
                    loading
                      ? "opacity-70 cursor-not-allowed"
                      : "hover:bg-blue-700"
                  }`}
                >
                  {loading ? "Submitting..." : "Submit Request"}
                </button>
              </div>
            </form>
          </div>

          {/* Image Box */}
          <div className="bg-white p-6 rounded-2xl shadow-xl space-y-4">
            <img
              src={img2}
              alt="Visa Assistance"
              className="w-full h-60 object-cover rounded-lg"
            />
            <img
              src={img}
              alt="Travel Assistance"
              className="w-full h-60 object-cover rounded-lg"
            />
          </div>
        </div>
      </div>

      
      <Footer />
    </>
  );
};

export default VisaAndTravel;
