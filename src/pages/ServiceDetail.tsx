// src/pages/ServiceDetail.tsx
import React from "react";
import { useParams } from "react-router-dom";
import ServiceForm from "../components/ServiceForm";
import { CheckCircle } from "lucide-react";

import serviceImg from "@/assets/serviceSection.jpeg";
import visaImg from "@/assets/visa1.jpeg";
import treatmentImg from "@/assets/p&t1.png";
import languageImg from "@/assets/c&l.jpeg";
import max3 from "../assets/1.jpeg";

const serviceData: Record<
  string,
  {
    title: string;
    description: string;
    included: string[];
    moreInfo: string;
    quote: string;
  }
> = {
  "treatment-planning": {
    title: "Treatment Planning & Hospital Selection",
    description:
      "We personalize your treatment journey by connecting you with world-class hospitals and experts based on your medical condition and personal preferences.",
    included: [
      "Personalized treatment plans",
      "Expert doctor recommendations",
      "Accredited hospital options",
      "Cost estimate comparison",
    ],
    moreInfo:
      "Our dedicated team thoroughly evaluates your medical reports and preferences to match you with the best hospitals and doctors. We also help you compare costs, success rates, and treatment methodologies to help you make the right decision.",
    quote: "The right treatment starts with the right plan.",
  },
  "visa-travel": {
    title: "Visa & Travel Logistics",
    description:
      "From visas to airport pickup and hotels, we manage all your travel arrangements so you can focus on recovery.",
    included: [
      "Medical visa assistance",
      "Flight and accommodation bookings",
      "Airport pick-up and drop",
      "24/7 travel coordination",
    ],
    moreInfo:
      "We simplify the entire travel process by helping you acquire a medical visa, booking flights and hotels close to the hospital, and arranging airport pickup — so your medical journey starts stress-free.",
    quote: "Let us handle the logistics, so you can focus on healing.",
  },
  "language-support": {
    title: "Cultural & Language Support",
    description:
      "Our interpreters help break language barriers, ensuring you feel understood and comfortable throughout your stay.",
    included: [
      "Multilingual translators",
      "Cultural orientation",
      "Assistance with hospital formalities",
      "Patient-friendly communication",
    ],
    moreInfo:
      "We ensure you’re never alone during your treatment. From language interpreters to cultural liaisons, we support you in every step of your journey with empathy and clarity.",
    quote: "Every word matters when it comes to your care.",
  },
  "post-treatment": {
    title: "Post-Treatment Follow-Up",
    description:
      "We support your recovery even after you return home through virtual checkups and local partner care.",
    included: [
      "Online consultations",
      "Medical report monitoring",
      "Liaison with your home doctor",
      "Long-term care guidance",
    ],
    moreInfo:
      "Healing doesn't stop at discharge. We help you maintain continuity of care by connecting you with your treating doctors via video calls and coordinating with local physicians back home.",
    quote: "Healing continues beyond the hospital walls.",
  },
};

const ServiceDetail: React.FC = () => {
  const { serviceId } = useParams();
  const service = serviceData[serviceId ?? ""];

  if (!service) {
    return (
      <div className="py-16 px-4 md:px-16 bg-gray-50 min-h-screen">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
            Service Not Found
          </h1>
          <p className="text-lg text-gray-600">
            The requested service could not be found. Please check the URL or
            return to the homepage.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="py-16 px-4 md:px-16 bg-gray-50 min-h-screen">
      <div className="max-w-6xl mx-auto">
        {/* --- Service Header --- */}
        <div className="text-center mb-12">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
            {service.title}
          </h1>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            {service.description}
          </p>
        </div>

        {/* --- Info Section --- */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          {/* Included */}
          <div className="bg-white p-6 rounded-lg shadow-sm">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">
              What’s Included
            </h2>
            <ul className="space-y-3">
              {service.included.map((item, index) => (
                <li key={index} className="flex items-center">
                  <CheckCircle className="w-5 h-5 text-green-500 mr-3" />
                  <span className="text-gray-700">{item}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Image */}
          <div className="rounded-xl overflow-hidden shadow-lg">
            <img
              src={
                serviceId === "visa-travel"
                  ? visaImg
                  : serviceId === "treatment-planning"
                  ? treatmentImg
                  : serviceId === "language-support"
                  ? languageImg
                  : serviceImg
              }
              alt="Service Visual"
              className="w-full h-full object-cover"
            />
          </div>

          {/* More Info */}
          <div className="bg-white p-6 rounded-lg shadow-sm">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">
              More Information
            </h2>
            <p className="text-gray-700 leading-relaxed">{service.moreInfo}</p>
          </div>
        </div>

        {/* --- Hospital Images + Form --- */}
        <div className="bg-white p-8 rounded-lg shadow-md grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          {/* Left side - hospital images */}
          <div className="flex justify-center items-center w-full">
            <ServiceForm serviceTitle={service.title} />
          </div>
          <div className="grid grid-cols-1 gap-5 mt-0">
            <img
              src={max3}
              alt="Max Hospital"
              className="w-full h-full object-cover rounded-lg shadow hover:scale-105 transition-transform duration-300"
            />
            
           
            <img
              src={max3}
              alt="Hospital 4"
              className="w-full h-full object-cover rounded-lg shadow hover:scale-105 transition-transform duration-300"
            />
          </div>

          {/* Right side - form */}
          
        </div>
      </div>
    </div>
  );
};

export default ServiceDetail;
