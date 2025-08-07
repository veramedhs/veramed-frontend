import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { 
  Award, 
  Users, 
  Globe, 
  Calendar,
  MapPin
} from "lucide-react";
import { Link } from "react-router-dom";

const About = () => {
  return (
    <section id="about" className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Left Content */}
          <div className="animate-slide-in">
            <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
              Leading Medical Tourism with 
              <span className="text-primary"> Expert Guidance</span>
            </h2>
            
            <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
              Founded in 2016 by Mr. Shah Fahad, Veramed Health Solutions has grown from a Delhi-based 
              startup to a trusted name in international medical tourism. With over 12 years of industry 
              experience, our founder brings deep expertise in navigating both Indian and international 
              healthcare systems.
            </p>

            <div className="space-y-6 mb-8">
              <div className="flex items-start space-x-4">
                <div className="p-2 bg-primary/10 rounded-lg">
                  <Calendar className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <h4 className="font-semibold text-foreground mb-1">Founded in 2016</h4>
                  <p className="text-muted-foreground">8+ years of dedicated service in medical tourism</p>
                </div>
              </div>
              
              <div className="flex items-start space-x-4">
                <div className="p-2 bg-accent/10 rounded-lg">
                  <MapPin className="w-6 h-6 text-accent" />
                </div>
                <div>
                  <h4 className="font-semibold text-foreground mb-1">Delhi Headquarters</h4>
                  <p className="text-muted-foreground">Prime geographical position for global healthcare access</p>
                </div>
              </div>
              
              <div className="flex items-start space-x-4">
                <div className="p-2 bg-medical-teal/10 rounded-lg">
                  <Users className="w-6 h-6 text-medical-teal" />
                </div>
                <div>
                  <h4 className="font-semibold text-foreground mb-1">Expert Leadership</h4>
                  <p className="text-muted-foreground">12+ years of experience in healthcare systems</p>
                </div>
              </div>
            </div>

           <Link to={"/meet-out-team"}>
            <Button variant="medical" size="lg">
              Meet Our Team
            </Button>
           </Link>
          </div>

          {/* Right Content - Stats Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            <Card className="p-6 text-center bg-card shadow-card-medical hover:shadow-medical transition-all duration-300 hover:-translate-y-2">
              <Globe className="w-12 h-12 mx-auto mb-4 text-accent" />
              <div className="text-3xl font-bold mb-2 text-foreground">15+</div>
              <div className="text-muted-foreground">Partner Countries</div>
            </Card>

            <Card className="p-6 text-center bg-gradient-primary text-white shadow-medical hover:shadow-lg transition-all duration-300 hover:-translate-y-2">
              <Award className="w-12 h-12 mx-auto mb-4" />
              <div className="text-3xl font-bold mb-2">8+</div>
              <div className="text-white/90">Years of Excellence</div>
            </Card>
            
            <Card className="p-6 text-center bg-card shadow-card-medical hover:shadow-medical transition-all duration-300 hover:-translate-y-2">
              <Users className="w-12 h-12 mx-auto mb-4 text-primary" />
              <div className="text-3xl font-bold mb-2 text-foreground">5000+</div>
              <div className="text-muted-foreground">Satisfied Patients</div>
            </Card>
          </div>
        </div>

        {/* Mission Statement */}
        <div className="mt-20 text-center">
          <div className="max-w-4xl mx-auto p-8 bg-gradient-subtle rounded-2xl shadow-card-medical">
            <h3 className="text-2xl font-bold text-foreground mb-6">Our Mission</h3>
            <p className="text-lg text-muted-foreground leading-relaxed">
              To empower patients with access to quality international healthcare by providing 
              comprehensive support, expert guidance, and personalized care throughout their 
              medical journey abroad. We bridge the gap between patients and world-class 
              medical institutions, ensuring safe, effective, and affordable healthcare solutions.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
