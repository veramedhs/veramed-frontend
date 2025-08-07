import { Button } from "@/components/ui/button";
import { ArrowRight, Shield, Globe, Heart } from "lucide-react";
import { Link } from "react-router-dom";
import heroImg from "@/assets/hero.png"
import heroImgPhone from "@/assets/hero-mobile.png"


const Hero = () => {
  return (
    <section className="bg-white dark:bg-gray-900">
      <div className="container mx-auto px-6 py-16">
        <div className="flex flex-col lg:flex-row items-center">
          {/* Left Side: Content */}
          <div className="lg:w-1/2 lg:pr-12">
            <div className="flex items-center space-x-4 mb-4">
              <div className="p-2 bg-blue-100 dark:bg-blue-800/20 rounded-full">
                <Globe className="w-6 h-6 text-blue-600 dark:text-blue-400" />
              </div>
              <div className="p-2 bg-red-100 dark:bg-red-800/20 rounded-full">
                <Heart className="w-6 h-6 text-red-600 dark:text-red-400" />
              </div>
              <div className="p-2 bg-green-100 dark:bg-green-800/20 rounded-full">
                <Shield className="w-6 h-6 text-green-600 dark:text-green-400" />
              </div>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-gray-800 dark:text-white leading-tight">
              Your Gateway to
              <span className="block text-blue-600 dark:text-blue-400">
                Global Healthcare
              </span>
            </h1>

            <p className="mt-4 text-lg text-gray-600 dark:text-gray-300">
              Facilitating world-class medical treatments abroad with comprehensive support,
              expert guidance, and personalized care since 2016.
            </p>

            <div className="mt-8">
              <Link to={"/start-your-journey"}>
                <Button size="lg" className="group">
                  Start Your Journey
                  <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
                </Button>
              </Link>
            </div>

            <div className="mt-12 grid grid-cols-3 gap-6 text-center">
              <div>
                <div className="text-3xl font-bold text-gray-800 dark:text-white">8+</div>
                <div className="text-gray-500 dark:text-gray-400">Years of Excellence</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-gray-800 dark:text-white">5000+</div>
                <div className="text-gray-500 dark:text-gray-400">Patients Served</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-gray-800 dark:text-white">15+</div>
                <div className="text-gray-500 dark:text-gray-400">Partner Countries</div>
              </div>
            </div>
          </div>

          {/* Right Side: Image */}
          <div className="lg:w-1/2 mt-12 lg:mt-0">
            <div className="relative w-full h-96 bg-gray-200 dark:bg-gray-700 rounded-lg shadow-lg overflow-hidden">
              <img src={heroImg} className="hidden sm:block w-full h-full object-cover" alt="Veramed health solution" />
              <img src={heroImgPhone} className="block sm:hidden w-full h-full object-cover" alt="Veramed health solution" />


            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;