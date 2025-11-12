import React, { useState } from "react";
import { CheckCircle } from "lucide-react";
import img from "../assets/visa1.jpeg";
import img2 from "../assets/Tourist-Visa.jpg";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";

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
  const [submitted, setSubmitted] = useState(false);

  // ✅ Validation Logic
  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    // Patient Name validation: required + letters and spaces only
    if (!formData.patientName.trim()) {
      newErrors.patientName = "Please enter patient name.";
    } else if (!/^[A-Za-z\s]+$/.test(formData.patientName.trim())) {
      newErrors.patientName = "Patient name must contain only letters and spaces.";
    }

    if (!formData.phoneNumber.trim()) {
      newErrors.phoneNumber = "Please enter mobile number.";
    } else if (formData.phoneNumber.replace(/\D/g, "").length < 7) {
      newErrors.phoneNumber = "Enter a valid mobile number.";
    }

    // Attendant Name validation: required + letters and spaces only
    if (!formData.attendantName.trim()) {
      newErrors.attendantName = "Please enter attendant name.";
    } else if (!/^[A-Za-z\s]+$/.test(formData.attendantName.trim())) {
      newErrors.attendantName = "Attendant name must contain only letters and spaces.";
    }

    if (!formData.attendantPassport) newErrors.attendantPassport = "Please attach attendant passport.";
    if (!formData.patientPassport) newErrors.patientPassport = "Please attach patient passport.";
    
    return newErrors;
  };

  // ✅ Handle Submit
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const validationErrors = validateForm();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      setSubmitted(false); // Ensure submitted is false if there are errors
      return;
    }
    setErrors({}); // Clear errors on successful validation
    setSubmitted(true);
    console.log("✅ Visa & Travel form submitted:", formData);
    // Here you would typically send the formData to your backend
  };

  // ✅ File Handlers
  const handleFileChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    field: "attendantPassport" | "patientPassport"
  ) => {
    if (e.target.files && e.target.files[0]) {
      setFormData({ ...formData, [field]: e.target.files[0] });
    }
  };

  return (
    <div className="bg-gray-50 min-h-screen py-16 px-4 md:px-16">
      {/* Header */}
      <div className="max-w-6xl mx-auto text-center mb-12">
        <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
          Visa & Travel Logistics
        </h1>
        <p className="text-lg text-gray-600 max-w-3xl mx-auto">
          From visas to airport pickup and hotels, we manage all your travel arrangements so you can focus on recovery.
        </p>
      </div>

      {/* Info Section */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-start max-w-6xl mx-auto mb-16">
        <div className="bg-white p-6 rounded-xl shadow-md">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">What’s Included</h2>
          <ul className="space-y-3 text-left">
            {["Medical visa assistance", "Flight and accommodation bookings", "Airport pick-up and drop", "24/7 travel coordination"].map(
              (item, index) => (
                <li key={index} className="flex items-center">
                  <CheckCircle className="w-5 h-5 text-green-500 mr-3" />
                  <span className="text-gray-700">{item}</span>
                </li>
              )
            )}
          </ul>
        </div>

        <div className="rounded-xl overflow-hidden shadow-md">
          <img src={img} alt="Visa and Travel Logistics" className="w-full h-full object-cover" />
        </div>

        <div className="bg-white p-6 rounded-xl shadow-md text-left">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">More Information</h2>
          <p className="text-gray-700 leading-relaxed">
            We simplify the entire travel process by helping you acquire a medical visa, booking flights and hotels close to the hospital, and arranging airport pickup — so your medical journey starts stress-free.
          </p>
        </div>
      </div>

      {/* Form + Images */}
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-10 bg-white p-8 rounded-2xl shadow-xl items-center">
        {/* Form */}
        <div>
          <h2 className="text-2xl font-semibold text-gray-800 mb-6 text-center md:text-left">
            Visa & Travel Assistance Form
          </h2>

          {submitted ? ( // Conditionally render success message or form
            <div className="text-center text-green-600 font-medium text-lg p-6 bg-green-50 rounded-lg shadow">
              ✅ Thank you! Your Visa & Travel assistance request has been submitted. We'll be in touch shortly.
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-5">
              {/* Patient Name */}
              <div>
                <label htmlFor="patientName" className="block text-gray-700 font-medium mb-2">Patient Name</label>
                <input
                  id="patientName"
                  type="text"
                  value={formData.patientName}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      // ✅ Filters out numbers as the user types
                      patientName: e.target.value.replace(/[0-9]/g, ""),
                    })
                  }
                  className={`w-full border rounded-lg p-3 focus:ring-2 focus:ring-blue-500 outline-none ${errors.patientName ? "border-red-500" : "border-gray-300"}`}
                  placeholder="Enter patient name "
                  aria-invalid={!!errors.patientName}
                  aria-describedby="patientNameError"
                />
                {errors.patientName && <p id="patientNameError" className="text-red-500 text-sm mt-1">{errors.patientName}</p>}
              </div>

              {/* Mobile Number */}
              <div>
                <label htmlFor="phoneNumber" className="block text-gray-700 font-medium mb-2">Mobile Number</label>
                <PhoneInput
                  country={"in"}
                  value={formData.phoneNumber}
                  onChange={(value) => setFormData({ ...formData, phoneNumber: value || "" })}
                  inputProps={{
                    name: 'phoneNumber',
                    id: 'phoneNumber',
                    required: true,
                    autoFocus: false
                  }}
                  containerClass="w-full"
                  inputClass={`!w-full !py-2.5 !border !rounded-lg focus:!ring-2 focus:!ring-blue-500 outline-none ${errors.phoneNumber ? "!border-red-500" : "!border-gray-300"}`}
                  buttonClass={`!border ${errors.phoneNumber ? "!border-red-500" : "!border-gray-300"} !rounded-lg`}
                />
                {errors.phoneNumber && <p className="text-red-500 text-sm mt-1">{errors.phoneNumber}</p>}
              </div>

              {/* Attendant Name */}
              <div>
                <label htmlFor="attendantName" className="block text-gray-700 font-medium mb-2">Attendant Name</label>
                <input
                  id="attendantName"
                  type="text"
                  value={formData.attendantName}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      // ✅ Filters out numbers as the user types
                      attendantName: e.target.value.replace(/[0-9]/g, ""),
                    })
                  }
                  className={`w-full border rounded-lg p-3 focus:ring-2 focus:ring-blue-500 outline-none ${errors.attendantName ? "border-red-500" : "border-gray-300"}`}
                  placeholder="Enter attendant name "
                  aria-invalid={!!errors.attendantName}
                  aria-describedby="attendantNameError"
                />
                {errors.attendantName && <p id="attendantNameError" className="text-red-500 text-sm mt-1">{errors.attendantName}</p>}
              </div>

              {/* Attendant Passport */}
              <div>
                <label htmlFor="attendantPassport" className="block text-gray-700 font-medium mb-2">Attach Attendant Passport</label>
                <input
                  id="attendantPassport"
                  type="file"
                  accept=".pdf,.jpg,.jpeg,.png"
                  onChange={(e) => handleFileChange(e, "attendantPassport")}
                  className={`w-full border rounded-lg p-2 bg-gray-50 ${errors.attendantPassport ? "border-red-500" : "border-gray-300"}`}
                  aria-invalid={!!errors.attendantPassport}
                  aria-describedby="attendantPassportError"
                />
                {formData.attendantPassport && (
                  <p className="text-sm text-gray-600 mt-1">📎 {formData.attendantPassport.name}</p>
                )}
                {errors.attendantPassport && <p id="attendantPassportError" className="text-red-500 text-sm mt-1">{errors.attendantPassport}</p>}
              </div>

              {/* Patient Passport */}
              <div>
                <label htmlFor="patientPassport" className="block text-gray-700 font-medium mb-2">Attach Patient Passport</label>
                <input
                  id="patientPassport"
                  type="file"
                  accept=".pdf,.jpg,.jpeg,.png"
                  onChange={(e) => handleFileChange(e, "patientPassport")}
                  className={`w-full border rounded-lg p-2 bg-gray-50 ${errors.patientPassport ? "border-red-500" : "border-gray-300"}`}
                  aria-invalid={!!errors.patientPassport}
                  aria-describedby="patientPassportError"
                />
                {formData.patientPassport && (
                  <p className="text-sm text-gray-600 mt-1">📎 {formData.patientPassport.name}</p>
                )}
                {errors.patientPassport && <p id="patientPassportError" className="text-red-500 text-sm mt-1">{errors.patientPassport}</p>}
              </div>

              {/* Additional Message */}
              <div>
                <label htmlFor="additionalMessage" className="block text-gray-700 font-medium mb-2">Additional Message (optional)</label>
                <textarea
                  id="additionalMessage"
                  rows={4}
                  value={formData.additionalMessage}
                  onChange={(e) => setFormData({ ...formData, additionalMessage: e.target.value })}
                  className="w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-blue-500 outline-none"
                  placeholder="Enter any additional message"
                />
              </div>

              {/* Submit Button */}
              <div className="text-center md:text-left">
                <button
                  type="submit"
                  className="bg-blue-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-blue-700 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                >
                  Submit Request
                </button>
              </div>
            </form>
          )}
        </div>

        {/* Images */}
        <div className="space-y-4 rounded-2xl overflow-hidden shadow-lg">
          <img src={img2} alt="Visa Assistance" className="w-full h-60 object-cover" />
          <img src={img} alt="Travel Assistance" className="w-full h-60 object-cover" />
        </div>
      </div>
    </div>
  );
};

export default VisaAndTravel;