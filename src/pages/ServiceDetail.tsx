import React from "react";
import { useParams } from "react-router-dom";
import ServiceForm from "../components/ServiceForm";

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
      <div className="py-16 px-4 md:px-16 bg-blue-50 min-h-screen">
        <h1 className="text-3xl md:text-4xl font-bold text-blue-900 mb-6">
          Service Not Found
        </h1>
        <p className="text-lg text-gray-700 max-w-3xl mb-10">
          The requested service could not be found.
        </p>
      </div>
    );
  }

  return (
    <div className="py-16 px-4 md:px-16 bg-blue-50 min-h-screen">
      <h1
        className={`text-3xl font-bold text-blue-900 mb-6 ${
          serviceId === "treatment-planning" ? "text-center" : ""
        }`}
      >
        {serviceId === "treatment-planning" ? (
          <>
            <span>Treatment Planning</span>
            <br className="block md:hidden" />
            <span className="md:ml-1">& Hospital Selection</span>
          </>
        ) : (
          service.title
        )}
      </h1>

      <p className="text-base md:text-lg text-gray-700  mb-10 text-center">
        {service.description}
      </p>

      {/* Grid Row: What's Included | Quote | More Information */}
      <div className="grid grid-cols-1 md:grid-cols-3 md:gap-x-12 gap-y-6 mb-12">
        {/* What's Included */}
        <div className="pl-2">
          <h2 className="text-xl font-semibold text-blue-800 mb-3">
            What’s Included
          </h2>
          <ul className="list-disc pl-5 text-gray-700 space-y-1">
            {service.included.map((item, index) => (
              <li key={index}>{item}</li>
            ))}
          </ul>
        </div>

        {/* Quote */}
        <div className="bg-white p-4 border-l-4 border-blue-500 shadow rounded-md flex items-center justify-center">
          <p className="italic text-blue-700 text-lg md:text-xl font-medium text-center">
            “{service.quote}”
          </p>
        </div>

        {/* More Information */}
        <div>
          <h2 className="text-xl font-semibold text-blue-800 mb-3">
            More Information
          </h2>
          <p className="text-gray-700 leading-relaxed">{service.moreInfo}</p>
        </div>
      </div>

      {/* Shared Form */}
      <ServiceForm serviceTitle={service.title} />
    </div>
  );
};

export default ServiceDetail;
