import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { 
  CheckCircle, 
  Heart, 
  Shield, 
  Users,
  Clock,
  Globe,
  Star,
  Headphones
} from "lucide-react";

const WhyChooseUs = () => {
  const advantages = [
    {
      icon: CheckCircle,
      title: "End-to-End Coordination",
      description: "Seamless experience from hospital selection through recuperation and follow-up care.",
      highlight: "Complete Journey Management"
    },
    {
      icon: Users,
      title: "Expert Leadership",
      description: "12+ years of experience with deep insight into both Indian and international healthcare systems.",
      highlight: "Proven Expertise"
    },
    {
      icon: Heart,
      title: "Holistic Patient Experience",
      description: "Understanding that medical travel is emotionally taxing, we provide comprehensive personal support.",
      highlight: "Compassionate Care"
    },
    {
      icon: Globe,
      title: "Regional Advantage",
      description: "Operating from Delhi with expanding global collaborations for streamlined access to top-tier centers.",
      highlight: "Strategic Location"
    }
  ];

  const features = [
    {
      icon: Shield,
      title: "Accredited Hospitals",
      description: "Partnerships with internationally accredited medical institutions"
    },
    {
      icon: Clock,
      title: "24/7 Support",
      description: "Round-the-clock assistance throughout your medical journey"
    },
    {
      icon: Star,
      title: "Personalized Care",
      description: "Tailored treatment plans based on individual needs and preferences"
    },
    {
      icon: Headphones,
      title: "Language Support",
      description: "Professional interpreters for clear communication with medical staff"
    }
  ];

  return (
    <section id="why-us" className="py-20 bg-gradient-subtle">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16 animate-fade-in">
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
            Why Choose 
            <span className="text-primary"> Veramed Health Solutions?</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            We stand out in the medical tourism industry through our unique combination of 
            expertise, personalized care, and comprehensive support systems.
          </p>
        </div>

        {/* Main Advantages */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
          {advantages.map((advantage, index) => (
            <Card 
              key={index} 
              className="p-8 hover:shadow-medical transition-all duration-500 hover:-translate-y-2 bg-card border-l-4 border-l-primary group"
            >
              <div className="flex items-start space-x-6">
                <div className="p-4 bg-gradient-primary rounded-xl flex-shrink-0 group-hover:scale-110 transition-transform duration-300">
                  <advantage.icon className="w-8 h-8 text-white" />
                </div>
                <div>
                  <div className="inline-block px-3 py-1 bg-primary/10 text-primary text-sm font-medium rounded-full mb-3">
                    {advantage.highlight}
                  </div>
                  <h3 className="text-xl font-bold text-foreground mb-3 group-hover:text-primary transition-colors">
                    {advantage.title}
                  </h3>
                  <p className="text-muted-foreground leading-relaxed">
                    {advantage.description}
                  </p>
                </div>
              </div>
            </Card>
          ))}
        </div>

        {/* Additional Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {features.map((feature, index) => (
            <Card 
              key={index} 
              className="p-6 text-center hover:shadow-card-medical transition-all duration-300 hover:-translate-y-1 group bg-card"
            >
              <div className="p-4 bg-primary/10 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center group-hover:bg-gradient-primary group-hover:scale-110 transition-all duration-300">
                <feature.icon className="w-8 h-8 text-primary group-hover:text-white transition-colors" />
              </div>
              <h4 className="font-semibold text-foreground mb-2 group-hover:text-primary transition-colors">
                {feature.title}
              </h4>
              <p className="text-sm text-muted-foreground">
                {feature.description}
              </p>
            </Card>
          ))}
        </div>

        {/* Comparison Section */}
        <div className="bg-card rounded-2xl p-8 shadow-card-medical">
          <h3 className="text-2xl font-bold text-center text-foreground mb-8">
            The Veramed Difference
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-primary rounded-full flex items-center justify-center mx-auto mb-4">
                <Heart className="w-8 h-8 text-white" />
              </div>
              <h4 className="font-semibold text-foreground mb-2">Personal Touch</h4>
              <p className="text-sm text-muted-foreground">
                Unlike larger facilitators, we provide personalized attention and cultural understanding
              </p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-medical-teal rounded-full flex items-center justify-center mx-auto mb-4">
                <Globe className="w-8 h-8 text-white" />
              </div>
              <h4 className="font-semibold text-foreground mb-2">Local Expertise</h4>
              <p className="text-sm text-muted-foreground">
                Deep understanding of Indian healthcare system combined with international partnerships
              </p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-trust-blue rounded-full flex items-center justify-center mx-auto mb-4">
                <Shield className="w-8 h-8 text-white" />
              </div>
              <h4 className="font-semibold text-foreground mb-2">Proven Results</h4>
              <p className="text-sm text-muted-foreground">
                Growing reputation in Delhi's medical tourism scene with 95% success rate
              </p>
            </div>
          </div>
        </div>

        <div className="text-center mt-12">
          <Button variant="medical" size="lg" className="mr-4">
            Start Your Journey
          </Button>
          <Button variant="outline" size="lg">
            Compare Services
          </Button>
        </div>
      </div>
    </section>
  );
};

export default WhyChooseUs;