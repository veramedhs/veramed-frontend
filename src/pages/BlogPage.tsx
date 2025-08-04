// src/pages/BlogPage.tsx
import React from "react";
import Slider from "react-slick";
import { Link } from "react-router-dom";
import { ArrowLeft, Home } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import img1 from "../assets/img01.png";
import img2 from "../assets/img02.png";
import img3 from "../assets/img03.png";

const BlogPage: React.FC = () => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 800,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
  };

  return (
    <section id="blog" className="py-20 bg-gradient-subtle min-h-screen">
      {/* Navigation buttons */}
      <div className="container mx-auto px-4 mb-8">
        <div className="flex space-x-2">
          <Link 
            to="/" 
            className="flex items-center space-x-2 bg-card/90 backdrop-blur-sm px-4 py-2 rounded-lg shadow-card-medical hover:bg-card transition-colors duration-200 border border-border"
          >
            <ArrowLeft className="w-4 h-4 text-foreground" />
            <span className="text-foreground">Back</span>
          </Link>
          <Link 
            to="/" 
            className="flex items-center space-x-2 bg-gradient-primary text-white px-4 py-2 rounded-lg shadow-medical hover:shadow-lg transition-all duration-200"
          >
            <Home className="w-4 h-4" />
            <span>Home</span>
          </Link>
        </div>
      </div>

      <div className="container mx-auto px-4">
        <div className="text-center mb-16 animate-fade-in">
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
            📰 Blog Highlights
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Discover the latest insights and innovations in medical tourism and healthcare technology
          </p>
        </div>

        <div className="max-w-4xl mx-auto">
          <Slider {...settings}>
            {/* Slide 1 */}
            <div className="p-6">
              <Card className="p-8 hover:shadow-medical transition-all duration-500 hover:-translate-y-2 bg-card border-border group">
                <div className="text-center">
                  <img
                    src={img1}
                    alt="Blog 1"
                    className="mx-auto w-full max-w-md h-56 object-cover rounded-lg shadow-card-medical mb-6 group-hover:scale-105 transition-transform duration-300"
                  />
                  <h3 className="text-2xl md:text-3xl font-semibold text-foreground mb-4 group-hover:text-primary transition-colors">
                    Robotic Surgery: A New Era in Healing
                  </h3>
                  <p className="text-muted-foreground leading-relaxed text-base md:text-lg">
                    At Veramed Health Solutions, we specialize in organizing end-to-end medical tours for international patients seeking high-quality and affordable treatment in India. As a trusted facilitator, we simplify the healthcare journey for global patients, making it seamless, secure, and successful. Whether it's robotic surgery or advanced procedures, we help you access the best doctors and hospitals in India with complete support at every step.
                  </p>
                </div>
              </Card>
            </div>

            {/* Slide 2 */}
            <div className="p-6">
              <Card className="p-8 hover:shadow-medical transition-all duration-500 hover:-translate-y-2 bg-card border-border group">
                <div className="text-center">
                  <img
                    src={img2}
                    alt="Blog 2"
                    className="mx-auto w-full max-w-md h-56 object-cover rounded-lg shadow-card-medical mb-6 group-hover:scale-105 transition-transform duration-300"
                  />
                  <h3 className="text-2xl md:text-3xl font-semibold text-foreground mb-4 group-hover:text-primary transition-colors">
                    Precision and Recovery with Robotic Urology
                  </h3>
                  <p className="text-muted-foreground leading-relaxed text-base md:text-lg">
                    Veramed goes beyond just booking appointments. Our team provides pre-treatment services like free medical consultation, personalized hospital selection, and visa support. Once you arrive, we arrange airport pickup, interpreter services, and priority appointments, ensuring you receive robotic urology treatments with precision, efficiency, and compassionate care.
                  </p>
                </div>
              </Card>
            </div>

            {/* Slide 3 */}
            <div className="p-6">
              <Card className="p-8 hover:shadow-medical transition-all duration-500 hover:-translate-y-2 bg-card border-border group">
                <div className="text-center">
                  <img
                    src={img3}
                    alt="Blog 3"
                    className="mx-auto w-full max-w-md h-56 object-cover rounded-lg shadow-card-medical mb-6 group-hover:scale-105 transition-transform duration-300"
                  />
                  <h3 className="text-2xl md:text-3xl font-semibold text-foreground mb-4 group-hover:text-primary transition-colors">
                    Revolutionizing Recovery: The Power of Technology
                  </h3>
                  <p className="text-muted-foreground leading-relaxed text-base md:text-lg">
                    From initial arrival to long-term recovery, Veramed Health Solutions supports your full treatment lifecycle. We coordinate your rehabilitation, manage prescriptions, and ensure that recovery plans are tailored to your needs. By leveraging technology and a patient-first approach, we ensure that healing continues beyond the hospital — with empathy and expertise.
                  </p>
                </div>
              </Card>
            </div>
          </Slider>
        </div>

        <div className="text-center mt-12">
        { /* <Button variant="medical" size="lg">
            Read More Articles
          </Button>*/}
        </div>
      </div>
    </section>
  );
};

export default BlogPage;