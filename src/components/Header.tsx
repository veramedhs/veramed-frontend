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

// Smooth scroll component
const NavLink = ({
  to,
  hash,
  children,
  className,
  onClick,
}: any) => {
  const location = useLocation();
  const isHomePage = location.pathname === "/";

  const handleClick = (e: any) => {
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
      if (window.innerWidth >= 1024) {
        setIsMenuOpen(false);
      }
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
      <header className="bg-background/95 backdrop-blur-sm border-b border-border sticky top-0 z-50">
        
        {/* ⭐ MAX WIDTH CONTAINER for proper alignment */}
        <div className="max-w-[1280px] mx-auto px-4">

          {/* ⭐ Reduced header height */}
          <div className="flex items-center justify-between h-16">

            {/* LOGO */}
            <Link
              to="/"
              className="flex items-center space-x-2 hover:opacity-80 transition-opacity"
            >
              <div className="w-9 h-9 bg-gradient-to-br from-blue-500 to-cyan-400 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-base">V</span>
              </div>
              <div>
                <h1 className="text-sm md:text-base font-bold text-foreground leading-tight">
                  Veramed Health Solutions
                </h1>
                <p className="text-[10px] md:text-xs text-muted-foreground">
                  Medical Tourism India
                </p>
              </div>
            </Link>

            {/* DESKTOP NAV */}
            <nav className="hidden lg:flex items-center space-x-5">
              <NavLink to="/" hash="#services" className="nav-link">Services</NavLink>
              <NavLink to="/" hash="#about" className="nav-link">About</NavLink>
              <NavLink to="/" hash="#collaborate" className="nav-link">Be Partner With Us</NavLink>
              {/* <NavLink to="/" hash="#why-us" className="nav-link">Why Choose Us</NavLink>} */}
              <NavLink to="/" hash="#contact" className="nav-link">Contact</NavLink>
              <Link to="/blog" className="nav-link">Blog</Link>
              <Link to="/leave-review" className="nav-link">Leave a Review</Link>
            </nav>

            {/* CTA + PHONE */}
            <div className="flex items-center">
              <div className="hidden xl:flex items-center space-x-1 mr-4">
                <Phone className="w-4 h-4 text-primary" />
                <a href="tel:+91-9953306560" className="text-sm hover:text-primary">
                  +91-9953306560
                </a>
              </div>

              <DialogTrigger asChild>
                <Button variant="medical" className="hidden md:block">
                  Get Second Opinion
                </Button>
              </DialogTrigger>

              {/* MOBILE MENU ICON */}
              <button
                className="ml-3 lg:hidden"
                onClick={() => setIsMenuOpen(!isMenuOpen)}
              >
                {isMenuOpen ? <X /> : <Menu />}
              </button>
            </div>
          </div>

          {/* ⭐ MOBILE MENU */}
          <div
            className={`lg:hidden absolute left-0 w-full bg-white shadow-lg transition-all duration-300 ${
              isMenuOpen ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-4 pointer-events-none"
            }`}
          >
            <div className="px-4 py-6 space-y-6 text-center">
              <NavLink className="mobile-link" to="/" hash="#services" onClick={() => setIsMenuOpen(false)}>Services</NavLink>
              <NavLink className="mobile-link" to="/" hash="#about" onClick={() => setIsMenuOpen(false)}>About</NavLink>
              <NavLink className="mobile-link" to="/" hash="#collaborate" onClick={() => setIsMenuOpen(false)}>Be Partner With Us</NavLink>
              <NavLink className="mobile-link" to="/" hash="#why-us" onClick={() => setIsMenuOpen(false)}>Why Choose Us</NavLink>
              <NavLink className="mobile-link" to="/" hash="#contact" onClick={() => setIsMenuOpen(false)}>Contact</NavLink>
              <Link className="mobile-link" to="/blog" onClick={() => setIsMenuOpen(false)}>Blog</Link>
              <Link className="mobile-link" to="/leave-review" onClick={() => setIsMenuOpen(false)}>Leave a Review</Link>

              <div className="border-t pt-4 space-y-3">
                <div className="flex justify-center items-center space-x-2 text-sm">
                  <Phone className="w-4" />
                  <a href="tel:+919953306560">+91-9953306560</a>
                </div>

                <DialogTrigger asChild>
                  <Button variant="medical" className="w-full" onClick={() => setIsMenuOpen(false)}>
                    Get Second Opinion
                  </Button>
                </DialogTrigger>
              </div>
            </div>
          </div>

        </div>
      </header>

      {/* MODAL CONTENT */}
      <DialogContent className="sm:max-w-[480px] p-0 border-none">
        <ConsultationForm onSuccess={() => setIsModalOpen(false)} />
      </DialogContent>
    </Dialog>
  );
};

export default Header;
