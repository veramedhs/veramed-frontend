import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Phone,
  Mail,
  Menu,
  X,
  Calendar,
  User,
  MessageCircleMore,
} from "lucide-react";
import ConsultationForm from "./ConsultationModal";

// Custom NavLink for smooth scrolling on homepage
const NavLink = ({
  to,
  hash,
  children,
  className,
  onClick,
}: {
  to: string;
  hash?: string;
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
}) => {
  const location = useLocation();
  const isHomePage = location.pathname === "/";

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (onClick) onClick();
    if (isHomePage && hash) {
      e.preventDefault();
      document.querySelector(hash)?.scrollIntoView({ behavior: "smooth" });
    }
  };

  if (isHomePage && hash) {
    return (
      <a href={hash} className={className} onClick={handleClick}>
        {children}
      </a>
    );
  }

  return (
    <Link to={`/${hash || ""}`} className={className} onClick={onClick}>
      {children}
    </Link>
  );
};

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) {
        setIsMenuOpen(false);
      }
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    document.body.style.overflow = isMenuOpen ? "hidden" : "auto";
  }, [isMenuOpen]);

  return (
    <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
      <header className="bg-background/95 backdrop-blur-sm border-b border-border sticky top-0 z-50">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-20">
            <Link
              to="/"
              className="flex items-center space-x-2 hover:opacity-80 transition-opacity"
            >
              <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-cyan-400 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-lg">V</span>
              </div>
              <div>
                <h1 className="text-md sm:text-l font-bold text-foreground">
                  Veramed Health Solutions
                </h1>
                <p className="text-xs text-muted-foreground">
                  Medical Tourism India
                </p>
              </div>
            </Link>

            <nav className="hidden md:flex items-center space-x-8">
              <NavLink to="/" hash="#services" className="text-foreground hover:text-primary transition-colors">Services</NavLink>
              <NavLink to="/" hash="#about" className="text-foreground hover:text-primary transition-colors">About</NavLink>
              <NavLink to="/" hash="#collaborate" className="text-foreground hover:text-primary transition-colors">Be Partner With Us</NavLink>
              <NavLink to="/" hash="#why-us" className="text-foreground hover:text-primary transition-colors">Why Choose Us</NavLink>
              <NavLink to="/" hash="#contact" className="text-foreground hover:text-primary transition-colors">Contact</NavLink>
              <Link to="/blog" className="text-foreground hover:text-primary transition-colors">Blog</Link>
            </nav>

            <div className="flex items-center">
              <div className="hidden lg:flex items-center space-x-1 mr-4">
                <Phone className="w-4 h-4 text-primary" />
                <a href="tel:+91-9953306560" className="text-sm hover:text-primary transition-colors">+91-9953306560</a>
              </div>

              <DialogTrigger asChild>
                <Button variant="medical" className="hidden md:block">
                  Get Second Opinion
                </Button>
              </DialogTrigger>

              <button className="md:hidden ml-4" onClick={() => setIsMenuOpen(!isMenuOpen)} aria-label="Toggle Menu">
                {isMenuOpen ? <X /> : <Menu />}
              </button>
            </div>
          </div>

          {/* Mobile Menu */}
          <div className={`absolute left-0 w-full bg-background shadow-lg md:hidden transition-all duration-300 ease-in-out ${isMenuOpen ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-full pointer-events-none"}`}>
            <div className="container mx-auto px-4 py-8">
              <nav className="flex flex-col space-y-6 text-center">
                <NavLink to="/" hash="#services" className="text-lg text-foreground hover:text-primary" onClick={() => setIsMenuOpen(false)}>Services</NavLink>
                <NavLink to="/" hash="#about" className="text-lg text-foreground hover:text-primary" onClick={() => setIsMenuOpen(false)}>About</NavLink>
                <NavLink to="/" hash="#collaborate" className="text-lg text-foreground hover:text-primary" onClick={() => setIsMenuOpen(false)}>Be Partner With Us</NavLink>
                <NavLink to="/" hash="#why-us" className="text-lg text-foreground hover:text-primary" onClick={() => setIsMenuOpen(false)}>Why Choose Us</NavLink>
                <NavLink to="/" hash="#contact" className="text-lg text-foreground hover:text-primary" onClick={() => setIsMenuOpen(false)}>Contact</NavLink>
                <Link to="/blog" className="text-lg text-foreground hover:text-primary" onClick={() => setIsMenuOpen(false)}>Blog</Link>
              </nav>
              <div className="mt-8 pt-6 border-t border-border flex flex-col items-center space-y-4 text-sm text-muted-foreground">
                <div className="flex items-center space-x-2">
                  <Phone className="w-4 h-4" />
                  <a href="tel:+91-9953306560">+91-9953306560</a>
                </div>
                <div className="flex items-center space-x-2">
                  <Mail className="w-4 h-4" />
                  <a href="mailto:veramedhs@gmail.com">veramedhs@gmail.com</a>
                </div>
              </div>

              <DialogTrigger asChild>
                <Button variant="medical" className="w-full mt-8" onClick={() => setIsMenuOpen(false)}>
                  Get Second Opinion
                </Button>
              </DialogTrigger>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Bottom Navigation Bar */}
      <div className="fixed bottom-0 inset-x-0 bg-white border-t shadow-md flex justify-around items-center py-2 z-50 md:hidden">
        <Link to="/#doctors" className="flex flex-col items-center text-xs text-muted-foreground hover:text-primary">
          <User className="h-5 w-5" />
          Doctors
        </Link>
        <Link to="/#book" className="flex flex-col items-center text-xs text-muted-foreground hover:text-primary">
          <Calendar className="h-5 w-5" />
          Book Appt
        </Link>
        <a href="https://wa.me/919953306560" target="_blank" rel="noopener noreferrer" className="flex flex-col items-center text-xs text-muted-foreground hover:text-primary">
          <MessageCircleMore className="h-5 w-5" />
          Chat
        </a>
        <a href="tel:+919953306560" className="flex flex-col items-center text-xs text-muted-foreground hover:text-primary">
          <Phone className="h-5 w-5" />
          Call Us
        </a>
        <button className="flex flex-col items-center text-xs text-muted-foreground hover:text-primary" onClick={() => setIsMenuOpen(true)}>
          <Menu className="h-5 w-5" />
          Menu
        </button>
      </div>

      {/* Modal Dialog Content */}
      <DialogContent className="sm:max-w-[480px] p-0 border-none">
        <ConsultationForm onSuccess={() => setIsModalOpen(false)} />
      </DialogContent>
    </Dialog>
  );
};

export default Header;
