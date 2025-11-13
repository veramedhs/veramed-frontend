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
      setYears((prev) => (prev >= yearsTarget ? yearsTarget : prev + 1));
    }, 100);

    const patientsInterval = setInterval(() => {
      setPatients((prev) => (prev >= patientsTarget ? patientsTarget : prev + 50));
    }, 1);

    const countriesInterval = setInterval(() => {
      setCountries((prev) => (prev >= countriesTarget ? countriesTarget : prev + 1));
    }, 100);

    return () => {
      clearInterval(yearsInterval);
      clearInterval(patientsInterval);
      clearInterval(countriesInterval);
    };
  }, []);

  return (
    <section className="bg-white dark:bg-gray-900 w-full overflow-hidden">
      <div className="container mx-auto px-4 md:px-6 lg:px-8 py-10 md:py-16">
        <div className="flex flex-col lg:flex-row items-center gap-10 lg:gap-16">

          {/* LEFT SECTION */}
          <div className="lg:w-1/2 text-center lg:text-left">
            {/* Icon Row */}
            <div className="flex items-center justify-center lg:justify-start space-x-4 mb-4">
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

            {/* Heading */}
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-800 dark:text-white leading-tight">
              Your Gateway to
              <span className="block text-blue-600 dark:text-blue-400 mt-1">
                Global Healthcare
              </span>
            </h1>

            {/* Description */}
            <p className="mt-4 text-base sm:text-lg text-gray-600 dark:text-gray-300 max-w-xl mx-auto lg:mx-0">
              Veramed Group partners with India’s accredited hospitals to deliver safe,
              affordable, and world-class medical care — built on expertise, compassion,
              and trust since 2016.
            </p>

            {/* CTA Button */}
            <div className="mt-6 sm:mt-8">
              <Link to={"/start-your-journey"}>
                <Button size="lg" className="group w-full sm:w-auto">
                  Start Your Journey
                  <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
                </Button>
              </Link>
            </div>

            {/* Stats Section */}
            <div className="mt-10 sm:mt-12 grid grid-cols-3 gap-4 sm:gap-6 text-center">
              <div className="bg-gray-100 dark:bg-gray-800 p-4 sm:p-6 rounded-lg shadow">
                <div className="text-lg sm:text-3xl font-bold text-gray-800 dark:text-white">
                  {years}+
                </div>
                <div className="text-gray-500 dark:text-gray-400 text-xs sm:text-sm">
                  Years of Excellence
                </div>
              </div>

              <div className="bg-gray-100 dark:bg-gray-800 p-4 sm:p-6 rounded-lg shadow">
                <div className="text-lg sm:text-3xl font-bold text-gray-800 dark:text-white">
                  {patients}+
                </div>
                <div className="text-gray-500 dark:text-gray-400 text-xs sm:text-sm">
                  Patients Served
                </div>
              </div>

              <div className="bg-gray-100 dark:bg-gray-800 p-4 sm:p-6 rounded-lg shadow">
                <div className="text-lg sm:text-3xl font-bold text-gray-800 dark:text-white">
                  {countries}+
                </div>
                <div className="text-gray-500 dark:text-gray-400 text-xs sm:text-sm">
                  Partner Countries
                </div>
              </div>
            </div>
          </div>

          {/* RIGHT SECTION — HERO IMAGE */}
          <div className="lg:w-1/2 flex justify-center">
            <div className="relative w-full max-w-md sm:max-w-lg md:max-w-xl h-72 sm:h-80 md:h-[420px] bg-gray-200 dark:bg-gray-700 rounded-lg shadow-lg overflow-hidden">
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
