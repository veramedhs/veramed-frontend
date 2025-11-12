import { Link } from "react-router-dom";
import { 
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
              <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-cyan-400 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-lg">V</span>
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
              <Facebook className="w-5 h-5 p-2 bg-white/10 rounded-lg hover:bg-white/20 cursor-pointer transition-colors"/>
              <Twitter className="w-5 h-5 p-2 bg-white/10 rounded-lg hover:bg-white/20 cursor-pointer transition-colors"/>
              <Linkedin className="w-5 h-5 p-2 bg-white/10 rounded-lg hover:bg-white/20 cursor-pointer transition-colors"/>
              <Instagram className="w-5 h-5 p-2 bg-white/10 rounded-lg hover:bg-white/20 cursor-pointer transition-colors"/>
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
              <li><Link to="/patients-gallery" className="text-white/80 hover:text-white transition-colors">Patient Gallery</Link></li>
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Our Services</h4>
            <ul className="space-y-2">
              <li><Link to="/treatment-planning" className="text-white/80 hover:text-white transition-colors">Treatment Planning & Hospital Selection</Link></li>
              <li><Link to="/visa-travel" className="text-white/80 hover:text-white transition-colors">Visa & Travel Logistics</Link></li>
              <li><Link to="/culture-language-support" className="text-white/80 hover:text-white transition-colors">Cultural & Language Support</Link></li>
              <li><Link to="/post-treatment" className="text-white/80 hover:text-white transition-colors">Post-Treatment Follow-Up</Link></li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Contact Information</h4>
            <div className="space-y-3">
              <div className="flex items-center space-x-3">
                <Phone className="w-5 h-5 text-white/80" />
                <a href="tel:+919953306560" className="text-white/90 hover:underline">+91-9953306560</a>
              </div>
              <div className="flex items-center space-x-3">
                <Mail className="w-5 h-5 text-white/80" />
                <a href="mailto:veramedhs@gmail.com" className="text-white/90 hover:underline">veramedhs@gmail.com</a>
              </div>
              <div className="flex items-center space-x-3">
                <MapPin className="w-5 h-5 text-white/80" />
                <a href="https://www.google.com/maps/search/Sec-46,+Gurugram,+Haryana" target="_blank" rel="noopener noreferrer" className="text-white/90 hover:underline">
                  Sec-46, Gurugram, Haryana
                </a>
              </div>
              <div className="flex items-center space-x-3">
                <Globe className="w-5 h-5 text-white/80" />
                <span className="text-white/90">24/7 Global Support</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-white/20 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center">
          <div className="text-white/80 text-sm mb-4 md:mb-0">
            © 2025 Veramed Health Solutions. All rights reserved. | Founded by Shah Fahad
          </div>
          <div className="flex space-x-6 text-sm">
            <Link to="/privacy-policy" className="text-white/80 hover:text-white transition-colors">Privacy Policy</Link>
            <Link to="/terms-and-condition" className="text-white/80 hover:text-white transition-colors">Terms of Service</Link>
            <Link to="/medical-desclaimar" className="text-white/80 hover:text-white transition-colors">Medical Disclaimer</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
