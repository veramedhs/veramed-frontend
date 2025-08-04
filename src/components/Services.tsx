import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import {
  Stethoscope,
  Plane,
  Languages,
  Heart,
  MapPin,
  FileText,
  Phone,
  Users
} from "lucide-react";

const Services = () => {
  const services = [
    {
      icon: Stethoscope,
      title: "Treatment Planning & Hospital Selection",
      description: "Personalized pairing with world-class institutions based on each patient's specific medical needs and preferences.",
      color: "text-medical-blue",
      path: "/servicedetails/treatment-planning",
      id: "treatment-planning"
    },
    {
      icon: Plane,
      title: "Visa & Travel Logistics",
      description: "End-to-end handling of travel-related permits, transportation, and comfortable lodging arrangements.",
      color: "text-medical-teal",
      path: "/servicedetails/visa-travel",
      id: "visa-travel"
    },
    {
      icon: Languages,
      title: "Cultural & Language Support",
      description: "Trained interpreters assist patients throughout treatment and travel, ensuring clear communication.",
      color: "text-trust-blue",
      path: "/servicedetails/language-support",
      id: "language-support"
    },
    {
      icon: Heart,
      title: "Post-Treatment Follow-Up",
      description: "Continuity of care back home through scheduled follow-ups and remote check-ins after treatment abroad.",
      color: "text-medical-blue",
      path: "/servicedetails/post-treatment",
      id: "post-treatment"
    }
  ];

  const additionalServices = [
    { icon: FileText, title: "Medical Record Management" },
    { icon: Phone, title: "24/7 Support Hotline" },
    { icon: MapPin, title: "Local Assistance Abroad" },
    { icon: Users, title: "Family Support Services" }
  ];

  return (
    <section id="services" className="py-20 bg-gradient-subtle">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16 animate-fade-in">
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
            Comprehensive Medical Tourism Services
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            From initial consultation to post-treatment care, we provide end-to-end support
            for your international healthcare journey.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
          {services.map((service, index) => (
            <Link to={service.path}>
              <Card
                key={index}
                className="p-8 hover:shadow-medical transition-all duration-500 hover:-translate-y-2 bg-card border-border group"
              >
                <div className="flex items-start space-x-6">
                  <div className="p-4 bg-gradient-primary rounded-lg flex-shrink-0 group-hover:scale-110 transition-transform duration-300">
                    <service.icon className="w-8 h-8 text-white" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-foreground mb-3 group-hover:text-primary transition-colors">
                      {service.title}
                    </h3>
                    <p className="text-muted-foreground leading-relaxed">
                      {service.description}
                    </p>
                  </div>
                </div>
              </Card>
            </Link>
          ))}
        </div>

        <div className="bg-card rounded-2xl p-8 shadow-card-medical">
          <h3 className="text-2xl font-bold text-center text-foreground mb-8">
            Additional Support Services
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {additionalServices.map((service, index) => (
              <div key={index} className="text-center group cursor-pointer">
                <div className="p-4 bg-gradient-primary rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                  <service.icon className="w-8 h-8 text-white" />
                </div>
                <p className="text-sm font-medium text-foreground group-hover:text-primary transition-colors">
                  {service.title}
                </p>
              </div>
            ))}
          </div>
        </div>

        <div className="text-center mt-12">
          <Button variant="medical" size="lg">
            Explore All Services
          </Button>
        </div>
      </div>
    </section>
  );
};

export default Services;