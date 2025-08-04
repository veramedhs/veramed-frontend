import { Button } from "@/components/ui/button";
import { 
  Heart, 
  Mail, 
  Phone, 
  MapPin,
  Globe,
  Facebook,
  Twitter,
  Linkedin,
  Instagram
} from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-gradient-to-br from-medical-blue to-medical-teal text-white">
      <div className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="space-y-4">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-white rounded-lg flex items-center justify-center">
                <Heart className="w-6 h-6 text-medical-blue" />
              </div>
              <div>
                <h3 className="text-xl font-bold">Veramed Health Solutions</h3>
                <p className="text-white/80 text-sm">Medical Tourism Excellence</p>
              </div>
            </div>
            
            <p className="text-white/90 leading-relaxed">
              Your trusted partner in global healthcare, facilitating world-class 
              medical treatments abroad with comprehensive support since 2016.
            </p>
            
            <div className="flex space-x-3">
              <div className="p-2 bg-white/10 rounded-lg hover:bg-white/20 transition-colors cursor-pointer">
                <Facebook className="w-5 h-5" />
              </div>
              <div className="p-2 bg-white/10 rounded-lg hover:bg-white/20 transition-colors cursor-pointer">
                <Twitter className="w-5 h-5" />
              </div>
              <div className="p-2 bg-white/10 rounded-lg hover:bg-white/20 transition-colors cursor-pointer">
                <Linkedin className="w-5 h-5" />
              </div>
              <div className="p-2 bg-white/10 rounded-lg hover:bg-white/20 transition-colors cursor-pointer">
                <Instagram className="w-5 h-5" />
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li><a href="#services" className="text-white/80 hover:text-white transition-colors">Our Services</a></li>
              <li><a href="#about" className="text-white/80 hover:text-white transition-colors">About Us</a></li>
              <li><a href="#why-us" className="text-white/80 hover:text-white transition-colors">Why Choose Us</a></li>
              <li><a href="#contact" className="text-white/80 hover:text-white transition-colors">Contact</a></li>
              <li><a href="#" className="text-white/80 hover:text-white transition-colors">Patient Stories</a></li>
              <li><a href="#" className="text-white/80 hover:text-white transition-colors">Country Guides</a></li>
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Our Services</h4>
            <ul className="space-y-2">
              <li><a href="#" className="text-white/80 hover:text-white transition-colors">Treatment Planning</a></li>
              <li><a href="#" className="text-white/80 hover:text-white transition-colors">Hospital Selection</a></li>
              <li><a href="#" className="text-white/80 hover:text-white transition-colors">Visa Assistance</a></li>
              <li><a href="#" className="text-white/80 hover:text-white transition-colors">Travel Logistics</a></li>
              <li><a href="#" className="text-white/80 hover:text-white transition-colors">Language Support</a></li>
              <li><a href="#" className="text-white/80 hover:text-white transition-colors">Post-Treatment Care</a></li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Contact Information</h4>
            <div className="space-y-3">
              <div className="flex items-center space-x-3">
                <Phone className="w-5 h-5 text-white/80" />
                <span className="text-white/90">+91-9953306560</span>
              </div>
              <div className="flex items-center space-x-3">
                <Mail className="w-5 h-5 text-white/80" />
                <span className="text-white/90">info@veramedhealth.com</span>
              </div>
              <div className="flex items-center space-x-3">
                <MapPin className="w-5 h-5 text-white/80" />
                <span className="text-white/90">Sec-46, Gurugram, Haryana</span>
              </div>
              <div className="flex items-center space-x-3">
                <Globe className="w-5 h-5 text-white/80" />
                <span className="text-white/90">24/7 Global Support</span>
              </div>
            </div>
            
            <Button variant="outline" className="mt-4 border-white hover:bg-white hover:text-medical-blue">
              Emergency Contact
            </Button>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-white/20 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center">
          <div className="text-white/80 text-sm mb-4 md:mb-0">
            © 2024 Veramed Health Solutions. All rights reserved. | Founded by Shah Fahad
          </div>
          <div className="flex space-x-6 text-sm">
            <a href="#" className="text-white/80 hover:text-white transition-colors">Privacy Policy</a>
            <a href="#" className="text-white/80 hover:text-white transition-colors">Terms of Service</a>
            <a href="#" className="text-white/80 hover:text-white transition-colors">Medical Disclaimer</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;