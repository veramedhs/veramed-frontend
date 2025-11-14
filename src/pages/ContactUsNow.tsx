import React, { useState } from "react";
import { Phone, Mail, MapPin } from "lucide-react";
import Footer from "../components/Footer";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";

const ContactUsNow = () => {
  const [phone, setPhone] = useState("");

  return (
    <div className="w-full">

      {/* ---------------------- HERO SECTION ------------------------ */}
      <div className="w-full bg-[#E7F4FF] px-6 lg:px-12 py-16 lg:py-24">
        <div className="container mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">

          {/* LEFT SIDE */}
          <div className="space-y-6">
            <h1 className="text-3xl lg:text-5xl font-bold leading-tight text-blue-950">
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-sky-400 to-blue-600">
                Connect
              </span>{" "}
              with Our <br />
              Healthcare Experts
            </h1>

            <p className="text-slate-700 text-base lg:text-lg max-w-xl">
              Veramed Health Solutions is your trusted partner in global
              healthcare. We help patients access world-class hospitals,
              internationally trained specialists, and advanced treatments with
              transparent guidance and complete end-to-end support.
              <br /><br />
              Our medical tourism experts assist with medical opinions,
              treatment planning, travel coordination, hospital admissions, and
              international care management.
              <br /><br />
              With a dedicated team available 24/7, we ensure that every patient
              receives personalized support, fast medical responses, and a seamless
              healthcare journey from the first inquiry to complete recovery.
              <br /><br />
              Whether you need help understanding treatment options, selecting the
              right hospital, or planning international travel for healthcare,
              Veramed provides reliable guidance at every step.
            </p>

            {/* CONTACT ROW */}
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

          {/* RIGHT SIDE – FORM */}
          <div className="bg-blue-950 text-white p-8 rounded-3xl shadow-xl space-y-6">
            
            {/* Full Name */}
            <div>
              <label className="block mb-1 text-sm font-semibold">Full Name *</label>
              <input
                type="text"
                className="w-full px-4 py-3 rounded-lg text-blue-900"
                placeholder="Full Name"
              />
            </div>

            {/* Phone + Location */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

              {/* PHONE INPUT */}
              <div>
                <label className="block mb-1 text-sm font-semibold">Phone Number *</label>
                <PhoneInput
                  country={"in"}
                  value={phone}
                  onChange={(value) => setPhone(value)}
                  inputStyle={{
                    width: "100%",
                    padding: "18px 48px",
                    borderRadius: "8px",
                    fontSize: "15px",
                    color: "#0a1f44",
                  }}
                  buttonStyle={{
                    borderRadius: "8px 0 0 8px",
                  }}
                />
              </div>

              {/* LOCATION INPUT */}
              <div>
                <label className="block mb-1 text-sm font-semibold">Country / City *</label>
                <input
                  type="text"
                  className="w-full px-4 py-3 rounded-lg text-blue-900"
                  placeholder="Your Location"
                />
              </div>
            </div>

            {/* File Upload */}
            <div>
              <label className="block mb-1 text-sm font-semibold">
                Upload Medical Reports (Optional)
              </label>
              <input
                type="file"
                multiple
                className="w-full px-4 py-3 rounded-lg bg-white text-blue-900 border border-slate-300 cursor-pointer"
              />
              <p className="text-xs text-slate-300 mt-1">
                You can upload PDFs, images, or documents (multiple files allowed)
              </p>
            </div>

            {/* Message */}
            <div>
              <label className="block mb-1 text-sm font-semibold">
                Describe Your Medical Requirement *
              </label>
              <textarea
                rows={4}
                className="w-full px-4 py-3 rounded-lg text-blue-900"
                placeholder="Share medical reports, symptoms, or treatment needs"
              ></textarea>
            </div>

            <button className="w-full bg-sky-400 hover:bg-sky-500 text-blue-900 font-bold py-3 rounded-lg transition-all">
              SUBMIT REQUEST
            </button>
          </div>
        </div>
      </div>

      {/* ---------------------- OUR LOCATIONS SECTION ---------------------- */}
      <div className="w-full bg-[#E7F4FF] px-6 lg:px-12 pt-10 pb-20">
        <div className="container mx-auto grid grid-cols-1 lg:grid-cols-2 gap-10 items-start">

          {/* LEFT SIDE */}
          <div className="space-y-4 mt-[-10px]">
            <h2 className="text-4xl font-bold text-blue-950 mb-2">Our Locations</h2>

            <div className="bg-white p-4 rounded-2xl shadow-md space-y-4">

              <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-sm">

                <h3 className="text-xl font-bold text-blue-950">
                  Veramed Health Solutions
                </h3>

                <p className="text-slate-700 mt-1 leading-relaxed">
                  Plot No. 3060-P, near Ambedkar Chowk, Samaspur Village,
                  Sector 46, Gurugram, Haryana 122003
                </p>

                <div className="grid grid-cols-2 mt-4 border-t pt-3 text-blue-900">
                  <a
                    href="tel:+919953306560"
                    className="flex items-center gap-2 text-sm font-semibold hover:text-blue-700"
                  >
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

                {/* IMAGE */}
                <div className="w-full pt-5">
                  <img
                    src="/src/assets/contact_img.png"
                    alt="Veramed Contact"
                    className="w-full rounded-xl object-cover shadow-sm"
                  />
                </div>

              </div>
            </div>
          </div>

          {/* MAP SIDE */}
          <div className="rounded-3xl overflow-hidden shadow-lg h-[520px] mt-[-10px]">
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
