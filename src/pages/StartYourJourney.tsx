import { CheckCircle, HeartHandshake, Stethoscope, Plane, ShieldCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import img from "@/assets/suj.jpg"
import Footer from "@/components/Footer";

const StartYourJourney = () => {
  const tourismServices = [
    {  
      title: "Doctor & Hospital Selection",
      description: "We find the right specialist and hospital based on your diagnosis, preference, and budget."
    },
    {
      title: "Medical Visa Assistance",
      description: "We provide documentation support and embassy coordination for a smoother, faster visa process."
    },
    {
      title: "Airport Pickup & Accommodation",
      description: "Our staff receives you upon arrival, arranging safe lodging near your hospital."
    },
    {
      title: "Interpretation & Translation",
      description: "We offer translators in French, Arabic, Russian, Swahili, and more, breaking all language barriers."
    }
  ];

  // Helper for staggered animation delays
  const animationDelay = (index) => ({ animationDelay: `${index * 150}ms` });

  return (
    <section className="py-20 bg-gradient-subtle bg-grid-pattern overflow-x-hidden">
      <div className="container mx-auto px-4">
        {/* Header Section */}
        <div className="text-center mb-24 animate-fade-in-up">
          <h1 className="text-4xl md:text-6xl font-bold text-foreground mb-6">
            Start Your Journey
          </h1>
          <p className="text-xl text-muted-foreground max-w-4xl mx-auto leading-relaxed">
            Every healing journey begins with a single step. We are here to make that step — and every one that follows — easier, safer, and more reassuring.
          </p>
        </div>

        {/* Main Content Sections */}
        <div className="space-y-24">
          
          {/* The Veramed Difference Section with the Team Image */}
          <div className="grid md:grid-cols-2 gap-12 items-center animate-fade-in-up">
            <div className="bg-card p-8 rounded-2xl shadow-card-medical">
              <h2 className="text-3xl font-bold text-foreground mb-4">
                Discover the Veramed Difference
              </h2>
              <p className="text-muted-foreground mb-4">
                Navigating a new country's medical system can be overwhelming. We are more than a tourism company — we are your **full-service healthcare companion**.
              </p>
              <p className="text-muted-foreground">
                Our experienced, multilingual team serves patients from across the globe, ensuring you feel heard, safe, and supported every step of the way.
              </p>
            </div>
            {/* The Image */}
            <div className="rounded-2xl shadow-lg overflow-hidden group">
              <img 
                src={img}
                alt="diverse teDiveram of Veramed Health Solutions professionals"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ease-in-out"
              />
            </div>
          </div>

          {/* End-to-End Medical Tourism Support Section */}
          <div className="animate-fade-in-up">
            <div className="text-center">
              <h2 className="text-3xl font-bold text-foreground mb-6">
                End-to-End Medical Tourism Support
              </h2>
              <p className="text-lg text-muted-foreground max-w-3xl mx-auto mb-12">
                We offer comprehensive services tailored to your individual case. Our support includes:
              </p>
            </div>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {tourismServices.map((service, index) => (
                <Card 
                  key={index} 
                  className="p-6 bg-card border-border flex flex-col items-center text-center space-y-4 group hover:border-primary hover:shadow-medical-glow transition-all duration-300 hover:-translate-y-2 animate-fade-in-up"
                  style={animationDelay(index)}
                >
                  <div className="p-3 bg-gradient-primary rounded-lg group-hover:scale-110 transition-transform duration-300">
                    <CheckCircle className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground text-lg mb-2">{service.title}</h3>
                    <p className="text-muted-foreground text-sm">{service.description}</p>
                  </div>
                </Card>
              ))}
            </div>
          </div>

          {/* Compassionate Repatriation & Trusted Partner Section */}
          <div className="grid md:grid-cols-2 gap-12 items-center animate-fade-in-up">
             <div className="bg-card p-8 rounded-2xl shadow-card-medical md:order-2">
              <h2 className="text-3xl font-bold text-foreground mb-4">
                Trusted by Patients & Partners
              </h2>
              <p className="text-muted-foreground">
                 From life-saving treatments to wellness retreats, our patients and partners trust us for professional care, affordable options, and heartfelt service. We are a symbol of care without borders.
              </p>
            </div>
            <div className="flex justify-center items-center md:order-1">
              <div className="p-8 bg-gradient-primary rounded-full animate-pulse-slow">
                <HeartHandshake className="w-24 h-24 text-white" />
              </div>
            </div>
          </div>

          {/* Final CTA Section */}
          <div className="text-center rounded-2xl p-10 mt-16 relative overflow-hidden animate-fade-in-up bg-card shadow-xl">
            <div className="absolute inset-0 bg-gradient-to-r from-medical-blue to-medical-teal opacity-10 animate-hue-rotate"></div>
            <div className="relative z-10">
              <ShieldCheck className="w-16 h-16 text-primary mx-auto mb-6" />
              <h2 className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-primary to-medical-teal mb-4">
                Begin Today — With Confidence
              </h2>
              <p className="text-muted-foreground max-w-3xl mx-auto mb-8 text-lg">
                Your journey to better health starts with a conversation. Let us guide you with knowledge, kindness, and professionalism. You are never alone.
              </p>
             { /*<Button variant="medical" size="lg" className="animate-glow shadow-lg">
                Start Your Journey Today
              </Button>*/}
              <p className="text-muted-foreground mt-8 font-semibold italic">
                Travel for treatment. Return with trust.
              </p>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </section>
  );
};

export default StartYourJourney;