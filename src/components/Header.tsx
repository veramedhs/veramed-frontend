import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Phone, Mail, Menu, X } from "lucide-react";
import PopupForm from "@/components/PopupForm"; // Make sure the path is correct

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [showPopup, setShowPopup] = useState(false);
  const location = useLocation();

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const openPopup = () => {
    setShowPopup(true);
    document.body.style.overflow = "hidden";
  };

  const closePopup = () => {
    setShowPopup(false);
    document.body.style.overflow = "auto";
  };

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
    if (isMenuOpen || showPopup) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
  }, [isMenuOpen, showPopup]);

  const NavLink = ({ to, hash, children, className, onClick }: { to: string; hash?: string; children: React.ReactNode; className?: string; onClick?: () => void }) => {
    const isHomePage = location.pathname === "/";
    
    if (isHomePage && hash) {
      return (
        <a href={hash} className={className} onClick={onClick}>
          {children}
        </a>
      );
    } else {
      return (
        <Link to={`/${hash ? hash : ""}`} className={className} onClick={onClick}>
          {children}
        </Link>
      );
    }
  };

  return (
    <>
      <header className="bg-background/95 backdrop-blur-sm border-b border-border sticky top-0 z-50">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-20">
            <Link to="/" className="flex items-center space-x-2 hover:opacity-80 transition-opacity">
              <div className="w-10 h-10 bg-gradient-primary rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-lg">V</span>
              </div>
              <div>
                <h1 className="text-md sm:text-xl font-bold text-foreground">
                  Veramed Health Solutions
                </h1>
                <p className="text-xs text-muted-foreground">
                  Medical Tourism Excellence
                </p>
              </div>
            </Link>

            <nav className="hidden md:flex items-center space-x-8">
              <NavLink to="/" hash="#services" className="text-foreground hover:text-primary">Services</NavLink>
              <NavLink to="/" hash="#about" className="text-foreground hover:text-primary">About</NavLink>
              <NavLink to="/" hash="#collaborate" className="text-foreground hover:text-primary">Be Partner With Us</NavLink>
              <NavLink to="/" hash="#why-us" className="text-foreground hover:text-primary">Why Choose Us</NavLink>
              <NavLink to="/" hash="#contact" className="text-foreground hover:text-primary">Contact</NavLink>
              <Link to="/blog" className="text-foreground hover:text-primary">Blog</Link>
            </nav>

            <div className="flex items-center">
              <div className="flex items-center space-x-1">
                <Phone className="w-4 h-4" />
                <a href="tel:+91-9953306560">+91-9953306560</a>
              </div>
              <Button variant="medical" className="hidden md:block ml-4" onClick={openPopup}>
                Get Second Opinion
              </Button>
              <button className="md:hidden ml-4" onClick={toggleMenu} aria-label="Toggle Menu">
                {isMenuOpen ? <X /> : <Menu />}
              </button>
            </div>
          </div>

          <div
            className={`absolute left-0 w-full bg-background shadow-lg md:hidden transition-all duration-300 ease-in-out ${
              isMenuOpen 
                ? "opacity-100 translate-y-0" 
                : "opacity-0 -translate-y-full pointer-events-none"
            }`}
          >
            <div className="container mx-auto px-4 py-8">
              <nav className="flex flex-col space-y-6 text-center">
                <NavLink to="/" hash="#services" className="text-foreground hover:text-primary" onClick={toggleMenu}>Services</NavLink>
                <NavLink to="/" hash="#about" className="text-foreground hover:text-primary" onClick={toggleMenu}>About</NavLink>
                <NavLink to="/" hash="#collaborate" className="text-foreground hover:text-primary" onClick={toggleMenu}>Be Partner With Us</NavLink>
                <NavLink to="/" hash="#why-us" className="text-foreground hover:text-primary" onClick={toggleMenu}>Why Choose Us</NavLink>
                <NavLink to="/" hash="#contact" className="text-foreground hover:text-primary" onClick={toggleMenu}>Contact</NavLink>
                <Link to="/blog" className="text-foreground hover:text-primary" onClick={toggleMenu}>Blog</Link>
              </nav>
              <div className="mt-8 pt-6 border-t border-border flex flex-col items-center space-y-4 text-sm text-muted-foreground">
                <div className="flex items-center space-x-2">
                  <Phone className="w-4 h-4" />
                  <a href="tel:+91-9953306560">+91-9953306560</a>
                </div>
                <div className="flex items-center space-x-2">
                  <Mail className="w-4 h-4" />
                  <a href="mailto:info@veramedhealth.com">info@veramedhealth.com</a>
                </div>
              </div>
              <Button variant="medical" className="w-full mt-8" onClick={openPopup}>
                Get Second Opinion
              </Button>
            </div>
          </div>
        </div>
      </header>

      {showPopup && (
  <div
    className="fixed inset-0 bg-black/60 z-[999] flex items-center justify-center px-4"
    onClick={closePopup}
  >
    <div
      className="relative bg-background dark:bg-background rounded-xl max-w-md w-full py-4 px-3"
      onClick={(e) => e.stopPropagation()}
      style={{ transform: 'scale(0.92)' }} // Slightly smaller scale to reduce height
    >
      <button
        onClick={closePopup}
        className="absolute top-2 right-2 text-muted-foreground hover:text-foreground"
        aria-label="Close"
      >
        <X className="w-5 h-5" />
      </button>

      {/* 🔷 Border wrapper */}
      <div className="border-2 border-primary rounded-xl p-3 space-y-3">
        <PopupForm />
      </div>
    </div>
  </div>
)}

    </>
  );
};

export default Header;
