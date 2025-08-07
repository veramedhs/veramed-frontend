import { Button } from "@/components/ui/button";
import { ArrowRight, Shield, Globe, Heart } from "lucide-react";
import heroImage from "@/assets/medical-hero.jpg";
import { Link } from "react-router-dom";

const Hero = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0">
        <img
          src={heroImage}
          alt="Medical Tourism Excellence"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-medical-blue/90 via-medical-blue/80 to-medical-teal/90"></div>
      </div>

      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 text-center text-white">
        <div className="max-w-4xl mx-auto animate-fade-in">
          <div className="flex justify-center mb-6">
            <div className="flex items-center space-x-4 mb-6">
              <div className="p-3 bg-white/10 rounded-full backdrop-blur-sm">
                <Globe className="w-8 h-8" />
              </div>
              <div className="p-3 bg-white/10 rounded-full backdrop-blur-sm">
                <Heart className="w-8 h-8" />
              </div>
              <div className="p-3 bg-white/10 rounded-full backdrop-blur-sm">
                <Shield className="w-8 h-8" />
              </div>
            </div>
          </div>

          <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
            Your Gateway to
            <span className="block bg-gradient-to-r from-white to-medical-light bg-clip-text text-transparent">
              Global Healthcare
            </span>
          </h1>

          <p className="text-xl md:text-2xl mb-8 max-w-2xl mx-auto leading-relaxed text-white/90">
            Facilitating world-class medical treatments abroad with comprehensive support,
            expert guidance, and personalized care since 2016.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
            <Link to={"/start-your-journey"}>
              <Button variant="hero" className="group">
                Start Your Journey
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-16">
            <div className="text-center p-6 bg-white/10 backdrop-blur-sm rounded-lg border border-white/20">
              <div className="text-3xl font-bold mb-2">8+</div>
              <div className="text-white/80">Years of Excellence</div>
            </div>
            <div className="text-center p-6 bg-white/10 backdrop-blur-sm rounded-lg border border-white/20">
              <div className="text-3xl font-bold mb-2">5000+</div>
              <div className="text-white/80">Patients Served</div>
            </div>
            <div className="text-center p-6 bg-white/10 backdrop-blur-sm rounded-lg border border-white/20">
              <div className="text-3xl font-bold mb-2">15+</div>
              <div className="text-white/80">Partner Countries</div>
            </div>
          </div>
        </div>
      </div>

      {/* Floating Elements */}
      <div className="absolute top-20 left-10 w-20 h-20 bg-white/5 rounded-full animate-pulse hidden lg:block"></div>
      <div className="absolute bottom-20 right-10 w-32 h-32 bg-white/5 rounded-full animate-pulse hidden lg:block"></div>
    </section>
  );
};

export default Hero;