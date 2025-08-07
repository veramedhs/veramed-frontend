import Header from "@/components/Header";
import Hero from "@/components/Hero";
import Services from "@/components/Services";
import About from "@/components/About";
import WhyChooseUs from "@/components/WhyChooseUs";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import OurCollaboration from "@/components/ui/OurCollabration";
import BlogSection from "@/components/BlogSection";
import Testimonials from "@/components/Testimonials";

const Index = () => {
  return (
    <div className="min-h-screen">

      <Hero />
      <Services />
      <About />
      <OurCollaboration />
      <WhyChooseUs />
      
      <Testimonials/>

      <Contact />
      <Footer />

    </div>
  );
};

export default Index;
