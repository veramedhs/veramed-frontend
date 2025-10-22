import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { ArrowRight, Shield, Globe, Heart } from "lucide-react";
import { Link } from "react-router-dom";
import heroImg from "@/assets/hero.png";
import heroImgPhone from "@/assets/hero-mobile.png";

const Hero = () => {
  const [years, setYears] = useState(1);
  const [patients, setPatients] = useState(1);
  const [countries, setCountries] = useState(1);

  useEffect(() => {
    const yearsTarget = 8;
    const patientsTarget = 5000;
    const countriesTarget = 15;

    const yearsInterval = setInterval(() => {
      setYears((prev) => {
        if (prev >= yearsTarget) {
          clearInterval(yearsInterval);
          return yearsTarget;
        }
        return prev + 1;
      });
    }, 100);

    const patientsInterval = setInterval(() => {
      setPatients((prev) => {
        if (prev >= patientsTarget) {
          clearInterval(patientsInterval);
          return patientsTarget;
        }
        return prev + 50;
      });
    }, 1);

    const countriesInterval = setInterval(() => {
      setCountries((prev) => {
        if (prev >= countriesTarget) {
          clearInterval(countriesInterval);
          return countriesTarget;
        }
        return prev + 1;
      });
    }, 100);

    return () => {
      clearInterval(yearsInterval);
      clearInterval(patientsInterval);
      clearInterval(countriesInterval);
    };
  }, []);

  return (
    <section className="bg-white dark:bg-gray-900">
      <div className="container mx-auto pt-5 px-6 py-16">
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
              Veramed Group partners with India’s accredited hospitals to deliver safe, affordable, and world-class medical care — built on expertise, compassion, and trust since 2016
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
              <div className="bg-gray-100 dark:bg-gray-800 p-6 rounded-lg shadow">
                <div className="text-xl sm:text-3xl font-bold text-gray-800 dark:text-white">
                  {years}+
                </div>
                <div className="text-gray-500 dark:text-gray-400">Years of Excellence</div>
              </div>
              <div className="bg-gray-100 dark:bg-gray-800 p-6 rounded-lg shadow">
                <div className="text-xl sm:text-3xl font-bold text-gray-800 dark:text-white">
                  {patients}+
                </div>
                <div className="text-gray-500 dark:text-gray-400">Patients Served</div>
              </div>
              <div className="bg-gray-100 dark:bg-gray-800 p-6 rounded-lg shadow">
                <div className="text-xl sm:text-3xl font-bold text-gray-800 dark:text-white">
                  {countries}+
                </div>
                <div className="text-gray-500 dark:text-gray-400">Partner Countries</div>
              </div>
            </div>
          </div>

          {/* Right Side: Image */}
          <div className="lg:w-1/2 mt-12 lg:mt-0">
            <div className="relative w-full h-96 bg-gray-200 dark:bg-gray-700 rounded-lg shadow-lg overflow-hidden">
              <img
                src={heroImg}
                className="hidden sm:block w-full h-full object-cover"
                alt="Veramed health solution"
              />
              <img
                src={heroImgPhone}
                className="block sm:hidden w-full h-full object-cover"
                alt="Veramed health solution"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
