import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { 
  Shield, 
  Handshake, 
  Hospital,
  User,
  LucideIcon
} from "lucide-react";
import React from 'react';
import { FormModal } from "../FormModel";

// --- Import the FormModal component ---

// --- Updated data structure to include modal properties ---
type CollaborationOption = {
  icon: LucideIcon;
  title: string;
  description: string;
  cta: string;
  opensModal: boolean; // Does this card's button open a modal?
  modalTitle?: string; // Optional: Title for the modal
  modalDescription?: string; // Optional: Description for the modal
  namePlaceholder?: string; // Optional: Name placeholder for the modal
};

const OurCollaboration: React.FC = () => {
  const collaborationOptions: CollaborationOption[] = [
    {
      modalTitle: "Partner as Insurer",
      icon: Shield,
      title: "Insurance Providers",
      description: "Partner with us to offer your clients seamless access to top-tier medical facilities and care coordination.",
      cta: "Partner as Insurer",
      opensModal: true, // Set to true to activate modal for this card
      namePlaceholder: "Name of the Insurance Provider",
    },
    {
      modalTitle: "Work with Us",
      icon: Handshake,
      title: "NGOs & Charities",
      description: "Collaborate to extend medical aid and support to communities in need, ensuring efficient and compassionate care.",
      cta: "Work with Us",
      opensModal: true, // Set to true to activate modal for this card
      namePlaceholder: "Name of the NGO",
    },
    {
      icon: Hospital,
      title: "Hospitals & Clinics",
      description: "Join our network of accredited medical centers to reach a global patient base seeking quality healthcare.",
      cta: "Join Our Network",
      opensModal: true, // This will now open the modal
      modalTitle: "Network Partnership Inquiry",
      modalDescription: "We're excited to learn about your facility. Please fill out the form below to start the partnership process.",
      namePlaceholder: "Name of the Organization",
    },
    {
      icon: User,
      title: "Individuals",
      description: "Ready to start your medical journey? Let us handle the complexities while you focus on your health.",
      cta: "Start Your Journey",
      opensModal: true, // Example: Also activating for patients
      modalTitle: "Start Your Personal Journey",
      modalDescription: "Tell us about your needs, and a dedicated patient advisor will contact you to discuss your options.",
      namePlaceholder: "Name of the Doctor",
    }
  ];

  return (
    <section id="collaborate" className="py-20 bg-white">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-16 animate-fade-in">
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
            Collaborate With 
            <span className="text-primary"> Veramed Health</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            We partner with organizations and individuals to create a global ecosystem of accessible, high-quality healthcare. Find the path that's right for you.
          </p>
        </div>

        {/* --- MODIFIED Collaboration Cards Grid --- */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {collaborationOptions.map((option, index) => {
            const ctaButton = (
              <Button variant="outline" className="w-full mt-auto group-hover:bg-primary group-hover:text-white transition-colors duration-300">
                {option.cta}
              </Button>
            );

            return (
              <Card 
                key={index} 
                className="p-8 text-center flex flex-col items-center hover:shadow-medical transition-all duration-500 hover:-translate-y-2 bg-card border-b-4 border-b-primary group"
              >
                {/* Icon */}
                <div className="p-4 bg-gradient-primary rounded-xl mb-6 flex-shrink-0 group-hover:scale-110 transition-transform duration-300">
                  <option.icon className="w-10 h-10 text-white" />
                </div>
                
                {/* Title */}
                <h3 className="text-xl font-bold text-foreground mb-3 group-hover:text-primary transition-colors h-16 flex items-center justify-center">
                  {option.title}
                </h3>
                
                {/* Description */}
                <p className="text-muted-foreground leading-relaxed mb-8 flex-grow">
                  {option.description}
                </p>

                {/* --- Conditional Modal Trigger --- */}
                {option.opensModal ? (
                  <FormModal
                    namePlaceholder={option.namePlaceholder || 'Name'}
                    title={option.modalTitle || 'Contact Us'} // Fallback title
                    description={option.modalDescription || 'Please fill out the form and we will get back to you.'} // Fallback description
                    triggerElement={ctaButton}
                  />
                ) : (
                  ctaButton // Render the button directly if no modal is needed
                )}
              </Card>
            );
          })}
        </div>

        {/* --- MODIFIED General Contact Button --- */}
        <div className="text-center mt-16">
           <FormModal
            namePlaceholder="Name"
              title="General Inquiry"
              description="Have a question we haven't answered? Please fill out the form below and a member of our team will be in touch."
              triggerElement={
                 <Button variant="medical" size="lg">
                    Have Questions? Contact Us
                 </Button>
              }
           />
        </div>
        
      </div>
    </section>
  );
};

export default OurCollaboration;