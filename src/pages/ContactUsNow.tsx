// ---------------- FULL UPDATED ContactUsNow.tsx ------------------

import { useState, useRef, useCallback } from "react";
import { Phone, Mail, MapPin, X } from "lucide-react";
import Footer from "../components/Footer";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";

import { Country, State, City } from "country-state-city";
import imgC from "../assets/contact-us.png";
import { apiClient } from "@/lib/apiClient";

const MAX_PREVIEW_COLUMNS = {
  sm: 2,
  md: 3,
  lg: 4,
};

const ContactUsNow = () => {
  const [phone, setPhone] = useState("");
  const [fullName, setFullName] = useState("");
  const [message, setMessage] = useState(""); // State for message field
  const [isLoading, setIsLoading] = useState(false); // State for loading indicator
  const [submissionStatus, setSubmissionStatus] = useState<string | null>(null); // State for submission status message

  const handleNameChange = (e: any) => {
    const value = e.target.value;
    if (/^[A-Za-z\s]*$/.test(value)) setFullName(value);
  };

  const [selectedCountry, setSelectedCountry] = useState<any>(null);
  const [selectedState, setSelectedState] = useState<any>(null);
  const [selectedCity, setSelectedCity] = useState<any>(null);

  const countries = Country.getAllCountries();
  const states = selectedCountry ? State.getStatesOfCountry(selectedCountry.isoCode) : [];
  const cities = selectedState ? City.getCitiesOfState(selectedCountry.isoCode, selectedState.isoCode) : [];

  const [uploadedFiles, setUploadedFiles] = useState<
    { id: string; file: File; url?: string }[]
  >([]);

  const inputRef = useRef<HTMLInputElement | null>(null);
  const dropRef = useRef<HTMLLabelElement | null>(null);
  const [isDragOver, setIsDragOver] = useState(false);

  const generateId = (file: File) => `${file.name}-${file.size}-${file.lastModified}`;

  const ACCEPTED_TYPES = [
    "image/jpeg",
    "image/jpg",
    "image/png",
    "image/webp",
    "application/pdf",
    "application/msword",
    "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
  ];

  const handleFiles = useCallback((files: File[]) => {
    const newItems = files
      .filter((f) => ACCEPTED_TYPES.includes(f.type) || f.name.match(/\.(pdf|docx|doc|jpg|jpeg|png|webp)$/i))
      .map((file) => ({
        id: generateId(file),
        file,
        url: file.type.startsWith("image/") ? URL.createObjectURL(file) : undefined,
      }));

    setUploadedFiles((prev) => {
      const existing = new Set(prev.map((p) => p.id));
      return [...prev, ...newItems.filter((n) => !existing.has(n.id))];
    });
  }, []);

  const handleFileInputChange = (e: any) => {
    const files = Array.from(e.target.files || []) as File[];
    handleFiles(files);
    if (inputRef.current) inputRef.current.value = "";
  };

  const handleDragOver = (e: any) => {
    e.preventDefault();
    setIsDragOver(true);
  };
  const handleDragLeave = (e: any) => {
    e.preventDefault();
    setIsDragOver(false);
  };
  const handleDrop = (e: any) => {
    e.preventDefault();
    setIsDragOver(false);
    const files: File[] = Array.from(e.dataTransfer.files || []);
    handleFiles(files);
};

  const removeFile = (id: string) => {
    setUploadedFiles((prev) => prev.filter((p) => p.id !== id));
  };

  const fileTypeLabel = (file: File) => {
    if (file.type.startsWith("image/")) return "image";
    if (file.type.includes("pdf")) return "pdf";
    if (file.name.match(/\.(docx|doc)$/i)) return "doc";
    return "file";
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setSubmissionStatus(null); // Clear previous status

    const formData = new FormData();
    formData.append('fullName', fullName);
    formData.append('phone', phone);
    formData.append('country', selectedCountry?.name || '');
    formData.append('state', selectedState?.name || '');
    formData.append('city', selectedCity?.name || '');
    formData.append('message', message);

    uploadedFiles.forEach((item) => {
      formData.append('medicalReports', item.file);
    });

    try {
      const response = await apiClient.post('/api/v1/veramed/contact/submit', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      console.log('Submission successful:', response.data);
      setSubmissionStatus('success');
      // Optionally reset form fields here
      setFullName('');
      setPhone('');
      setSelectedCountry(null);
      setSelectedState(null);
      setSelectedCity(null);
      setMessage('');
      setUploadedFiles([]);
    } catch (error) {
      console.error('Submission error:', error);
      setSubmissionStatus('error');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="w-full">
      {/* ---------------------------------------------------------
                         HERO SECTION
      --------------------------------------------------------- */}
      <div className="w-full bg-[#E7F4FF] px-6 lg:px-12 py-16 lg:py-24">
        <div className="container mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">

          {/* LEFT CONTENT */}
          <div className="space-y-6">
            <h1 className="text-3xl lg:text-5xl font-bold leading-tight text-blue-950">
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-sky-400 to-blue-600">
                Connect
              </span>{" "}
              with Our <br />
              Healthcare Experts
            </h1>

            <p className="text-slate-700 text-base lg:text-lg max-w-xl">
              Veramed Health Solutions is your trusted partner in global healthcare.
              We help patients access world-class hospitals, internationally trained specialists,
              and advanced treatments with transparent guidance and complete end-to-end support.
              <br /><br />
              Our medical tourism experts assist with medical opinions, treatment planning,
              travel coordination, admissions, and international care.
              <br /><br />
              With 24/7 support, every patient receives fast responses and personalized assistance.
            </p>

            {/* CONTACT INFO ROW */}
            <div className="flex items-center gap-6 text-blue-900 flex-wrap">
              <div className="flex items-center gap-2">
                <Phone className="w-5 h-5" />
                <a href="tel:+919953306560" className="font-medium">
                  +91 99533 06560
                </a>
              </div>

              <div className="flex items-center gap-2">
                <Mail className="w-5 h-5" />
                <a href="mailto:veramedhs@gmail.com" className="font-medium">
                  veramedhs@gmail.com
                </a>
              </div>

              <div className="flex items-center gap-2">
                <MapPin className="w-5 h-5" />
                <span className="font-medium">Sec-46, Gurugram, Haryana</span>
              </div>
            </div>
          </div>

          {/* FORM SECTION */}
          <form onSubmit={handleSubmit} className="bg-blue-950 text-gray-400 p-8 rounded-3xl shadow-xl space-y-6 h-full">

            {/* Name */}
            <div>
              <label className="block mb-1 text-sm font-semibold">Full Name *</label>
              <input
                type="text"
                value={fullName}
                onChange={handleNameChange}
                className="w-full px-4 py-3 rounded-lg text-blue-900"
                placeholder="Full Name"
                required
              />
            </div>

            {/* Phone + Country */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* PHONE */}
              <div>
                <label className="block mb-1 text-sm font-semibold">Phone Number *</label>
                <PhoneInput
                  country={"in"}
                  value={phone}
                  onChange={(value) => setPhone(value)}
                  containerStyle={{ width: "100%" }}
                  inputStyle={{
                    width: "100%",
                    height: "56px",
                    paddingLeft: "58px",
                    borderRadius: "8px",
                    border: "1px solid #CBD5E1",
                    color: "#1E3A8A",
                  }}
                  buttonStyle={{
                    borderRadius: "8px 0 0 8px",
                    height: "56px",
                  }}
                  inputProps={{
                    required: true,
                  }}
                />
              </div>

              {/* COUNTRY */}
              <div>
                <label className="block mb-1 text-sm font-semibold">Country *</label>
                <select
                  className="w-full h-[56px] px-4 rounded-lg text-blue-900"
                  value={selectedCountry?.isoCode || ""}
                  onChange={(e) => {
                    const c = countries.find((co) => co.isoCode === e.target.value);
                    setSelectedCountry(c);
                    setSelectedState(null);
                    setSelectedCity(null);
                  }}
                  required
                >
                  <option value="">Select Country</option>
                  {countries.map((c) => (
                    <option key={c.isoCode} value={c.isoCode}>{c.name}</option>
                  ))}
                </select>
              </div>
            </div>

            {/* State + City */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

              {/* STATE */}
              <div>
                <label className="block mb-1 text-sm font-semibold">State *</label>
                <select
                  className="w-full h-[56px] px-4 rounded-lg text-blue-900"
                  value={selectedState?.isoCode || ""}
                  onChange={(e) => {
                    const s = states.find((st) => st.isoCode === e.target.value);
                    setSelectedState(s);
                    setSelectedCity(null);
                  }}
                  disabled={!selectedCountry}
                  required
                >
                  <option value="">Select State</option>
                  {states.map((s) => (
                    <option key={s.isoCode} value={s.isoCode}>{s.name}</option>
                  ))}
                </select>
              </div>

              {/* CITY */}
              <div>
                <label className="block mb-1 text-sm font-semibold">City *</label>
                <select
                  className="w-full h-[56px] px-4 rounded-lg text-blue-900"
                  value={selectedCity?.name || ""}
                  onChange={(e) => {
                    const city = cities.find((c) => c.name === e.target.value);
                    setSelectedCity(city);
                  }}
                  disabled={!selectedState}
                  required
                >
                  <option value="">Select City</option>
                  {cities.map((city) => (
                    <option key={city.name} value={city.name}>{city.name}</option>
                  ))}
                </select>
              </div>
            </div>

            {/* UPLOAD */}
            <div>
              <label className="block mb-1 text-sm font-semibold">Upload Medical Reports (Optional)</label>

              <label
                ref={dropRef}
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                onDrop={handleDrop}
                className={`w-full flex flex-col items-center justify-center px-4 py-6 bg-white
                rounded-xl border ${isDragOver ? "border-blue-400 bg-blue-50" : "border-slate-300"}
                border-dashed cursor-pointer`}
              >
                <div className="text-center text-blue-900">
                  <div className="text-sm font-medium">Click to upload or drag & drop</div>
                  <div className="text-xs mt-1 text-slate-500">
                    PDF, JPG, PNG, DOC supported — Multiple files allowed
                  </div>
                </div>

                <input
                  ref={inputRef}
                  type="file"
                  multiple
                  accept=".pdf,.jpg,.jpeg,.png,.webp,.doc,.docx"
                  onChange={handleFileInputChange}
                  className="hidden"
                />
              </label>

              {/* Preview */}
              {uploadedFiles.length > 0 && (
                <div className="mt-3 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
                  {uploadedFiles.map((f) => (
                    <div key={f.id} className="relative bg-white rounded-lg border overflow-hidden">
                      {fileTypeLabel(f.file) === "image" ? (
                        <img src={f.url} className="w-full h-24 object-cover" />
                      ) : (
                        <div className="w-full h-24 flex items-center justify-center text-sm font-semibold text-blue-900">
                          {fileTypeLabel(f.file).toUpperCase()}
                        </div>
                      )}

                      <div className="p-2 flex justify-between items-center">
                        <span className="text-xs truncate">{f.file.name}</span>
                        <button type="button" onClick={() => removeFile(f.id)}>
                          <X className="w-4 h-4 text-red-600" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* MESSAGE */}
            <div>
              <label className="block mb-1 text-sm font-semibold">Describe Your Medical Requirement *</label>
              <textarea
                rows={4}
                className="w-full px-4 py-3 rounded-lg text-blue-900"
                placeholder="Share symptoms or treatment needs"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                required
              ></textarea>
            </div>

            <button
              type="submit"
              className="w-full bg-sky-400 hover:bg-sky-500 text-blue-900 font-bold py-3 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed"
              disabled={isLoading}
            >
              {isLoading ? 'SUBMITTING...' : 'SUBMIT REQUEST'}
            </button>

            {submissionStatus === 'success' && (
              <p className="text-green-500 text-center text-sm">Request submitted successfully!</p>
            )}
            {submissionStatus === 'error' && (
              <p className="text-red-500 text-center text-sm">Failed to submit request. Please try again.</p>
            )}
          </form>
        </div>
      </div>

      {/* ---------------------------------------------------------
                      OUR LOCATIONS (UPDATED)
      --------------------------------------------------------- */}
      <div className="w-full bg-[#E7F4FF] px-6 lg:px-12 pt-6 pb-20">

      <h2 className="text-4xl font-bold text-blue-950 mb-6 -mt-4 px-6 lg:px-12">
  Our Locations
</h2>



        <div className="container mx-auto grid grid-cols-1 lg:grid-cols-2 gap-10 items-stretch">

          {/* LEFT CARD — equal height */}
          <div className="h-full">
            <div className="bg-white p-5 rounded-2xl shadow-md h-full flex flex-col justify-between">

              <div>
                <h3 className="text-xl font-bold text-blue-950">Veramed Health Solutions</h3>

                <p className="text-slate-700 mt-1 leading-relaxed">
                  Plot No. 3060-P, near Ambedkar Chowk, Samaspur Village, Sector 46,
                  Gurugram, Haryana 122003
                </p>

                <div className="grid grid-cols-2 mt-4 border-t pt-3 text-blue-900">
                  <a href="tel:+919953306560" className="flex items-center gap-2 text-sm font-semibold hover:text-blue-700">
                    <Phone className="w-4 h-4" /> Call
                  </a>

                  <a
                    href="https://www.google.com/maps/dir//Veramed/"
                    target="_blank"
                    className="flex items-center gap-2 text-sm font-semibold hover:text-blue-700"
                  >
                    ↗ Directions
                  </a>
                </div>
              </div>

              <div className="w-full pt-5">
                <img src={imgC} alt="Veramed Contact" className="w-full rounded-xl object-cover shadow-sm" />
              </div>

            </div>
          </div>

          {/* RIGHT MAP — equal height */}
          <div className="rounded-3xl overflow-hidden shadow-lg h-full min-h-[520px]">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3508.6583555920547!2d77.06279897414119!3d28.42956399327122!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390d19006dbfd66f%3A0xfccd84faea69391e!2sVeramed%20Health%20solutions!5e0!3m2!1sen!2sin!4v1763115086561!5m2!1sen!2sin"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              loading="lazy"
            ></iframe>
          </div>

        </div>
      </div>

      <Footer />
    </div>
  );
};

export default ContactUsNow;