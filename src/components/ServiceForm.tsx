import React, { useState } from 'react';
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Phone,
  Mail,
  MapPin,
  Clock,
  Send,
  MessageCircle,
  Calendar,
  Globe,
  Loader2
} from "lucide-react";
import { countryData } from "@/lib/data/countries";

const Contact = () => {
  // Form state
  const [formData, setFormData] = useState({
    fullName: '',
    countryCode: '+91',
    phone: '',
    email: '',
    preferredCountry: '',
    medicalCondition: '',
    additionalInfo: '',
  });

  // UI state
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState({});

  // Handlers
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    // Clear error when typing
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const handleCountryCodeChange = (value) => {
    setFormData(prev => ({ ...prev, countryCode: value }));
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.fullName.trim()) newErrors.fullName = 'Full name is required';
    if (!formData.phone.trim()) newErrors.phone = 'Phone number is required';
    if (!formData.email.trim()) newErrors.email = 'Email is required';
    if (!formData.medicalCondition.trim()) newErrors.medicalCondition = 'Medical condition is required';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    if (!validateForm()) {
      setIsLoading(false);
      return;
    }

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));

      // In a real app, you would use:
      // const response = await fetch('your-api-endpoint', {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify(formData)
      // });

      // Reset form on success
      setFormData({
        fullName: '',
        countryCode: '+91',
        phone: '',
        email: '',
        preferredCountry: '',
        medicalCondition: '',
        additionalInfo: '',
      });

      setIsSubmitted(true);
      setTimeout(() => setIsSubmitted(false), 5000);
    } catch (error) {
      console.error('Submission error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section id="contact" className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16 animate-fade-in">
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
            Ready to Begin Your
            <span className="text-primary"> Healthcare Journey?</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Get in touch with our expert team for a personalized consultation.
            We're here to guide you every step of the way.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-16">
          {/* Contact Information */}
          <div className="lg:col-span-1 space-y-6">
            <Card className="p-6 hover:shadow-card-medical transition-all duration-300">
              <div className="flex items-center space-x-4 mb-4">
                <div className="p-3 bg-gradient-primary rounded-lg">
                  <Phone className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h4 className="font-semibold text-foreground">Phone</h4>
                  <p className="text-muted-foreground">+91-9953306560</p>
                </div>
              </div>
              <p className="text-sm text-muted-foreground">
                Speak directly with our medical tourism experts
              </p>
            </Card>

            <Card className="p-6 hover:shadow-card-medical transition-all duration-300">
              <div className="flex items-center space-x-4 mb-4">
                <div className="p-3 bg-medical-teal rounded-lg">
                  <Mail className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h4 className="font-semibold text-foreground">Email</h4>
                  <p className="text-muted-foreground">veramedhs@gmail.com</p>
                </div>
              </div>
              <p className="text-sm text-muted-foreground">
                Send us your medical requirements and questions
              </p>
            </Card>

            <Card className="p-6 hover:shadow-card-medical transition-all duration-300">
              <div className="flex items-center space-x-4 mb-4">
                <div className="p-3 bg-trust-blue rounded-lg">
                  <MapPin className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h4 className="font-semibold text-foreground">Office</h4>
                  <p className="text-muted-foreground">Gurgaon, India</p>
                </div>
              </div>
              <p className="text-sm text-muted-foreground">
                Visit our headquarters for in-person consultation
              </p>
            </Card>

            <Card className="p-6 hover:shadow-card-medical transition-all duration-300">
              <div className="flex items-center space-x-4 mb-4">
                <div className="p-3 bg-accent rounded-lg">
                  <Clock className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h4 className="font-semibold text-foreground">Hours</h4>
                  <p className="text-muted-foreground">24/7 Support Available</p>
                </div>
              </div>
              <p className="text-sm text-muted-foreground">
                Round-the-clock assistance for urgent medical needs
              </p>
            </Card>
          </div>

          {/* Contact Form */}
          <div className="lg:col-span-2">
            <Card className="p-8 shadow-card-medical">
              <h3 className="text-2xl font-bold text-foreground mb-6">
                Get Your Free Consultation
              </h3>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">
                      Full Name *
                    </label>
                    <Input
                      name="fullName"
                      placeholder="Enter your full name"
                      value={formData.fullName}
                      onChange={handleInputChange}
                    />
                    {errors.fullName && (
                      <p className="mt-1 text-sm text-red-600">{errors.fullName}</p>
                    )}
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">
                      Phone Number *
                    </label>
                    <div className="flex items-center gap-2">
                      <Select
                        defaultValue="+91"
                        onValueChange={handleCountryCodeChange}
                      >
                        <SelectTrigger className="w-[130px]">
                          <SelectValue placeholder="Code" />
                        </SelectTrigger>
                        <SelectContent>
                          {countryData.map((country) => (
                            <SelectItem key={country.iso} value={`+${country.code}`}>
                              {country.iso} (+{country.code})
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <Input
                        name="phone"
                        type="tel"
                        placeholder="XXXXXXXXXX"
                        className="flex-1"
                        value={formData.phone}
                        onChange={handleInputChange}
                      />
                    </div>
                    {errors.phone && (
                      <p className="mt-1 text-sm text-red-600">{errors.phone}</p>
                    )}
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">
                      Email Address *
                    </label>
                    <Input
                      name="email"
                      type="email"
                      placeholder="your.email@example.com"
                      value={formData.email}
                      onChange={handleInputChange}
                    />
                    {errors.email && (
                      <p className="mt-1 text-sm text-red-600">{errors.email}</p>
                    )}
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">
                      Preferred Country
                    </label>
                    <Input
                      name="preferredCountry"
                      placeholder="e.g., Singapore, Thailand, India"
                      value={formData.preferredCountry}
                      onChange={handleInputChange}
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">
                    Medical Condition / Treatment Required *
                  </label>
                  <Input
                    name="medicalCondition"
                    placeholder="Brief description of medical condition or treatment needed"
                    value={formData.medicalCondition}
                    onChange={handleInputChange}
                  />
                  {errors.medicalCondition && (
                    <p className="mt-1 text-sm text-red-600">{errors.medicalCondition}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">
                    Additional Information
                  </label>
                  <Textarea
                    name="additionalInfo"
                    placeholder="Please provide any additional details..."
                    rows={4}
                    value={formData.additionalInfo}
                    onChange={handleInputChange}
                  />
                </div>

                {/* Success message */}
                {isSubmitted && (
                  <div className="p-4 mb-4 text-sm text-green-700 bg-green-100 rounded-lg">
                    Thank you! Your consultation request has been submitted. We'll contact you shortly.
                  </div>
                )}

                <div className="flex flex-col sm:flex-row gap-4">
                  <Button
                    type="submit"
                    variant="medical"
                    className="flex-1 group"
                    disabled={isLoading}
                  >
                    {isLoading ? (
                      <>
                        <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                        Processing...
                      </>
                    ) : (
                      <>
                        <Send className="w-4 h-4 mr-2 group-hover:translate-x-1 transition-transform" />
                        Send Consultation Request
                      </>
                    )}
                  </Button>
                  <Button
                    type="button"
                    variant="outline"
                    className="flex-1"
                    disabled={isLoading}
                  >
                    <Calendar className="w-4 h-4 mr-2" />
                    Schedule Call Back
                  </Button>
                </div>
              </form>
            </Card>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card className="p-6 text-center hover:shadow-card-medical transition-all duration-300 hover:-translate-y-1 group cursor-pointer">
            <div className="p-4 bg-gradient-primary rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center group-hover:scale-110 transition-transform">
              <MessageCircle className="w-8 h-8 text-white" />
            </div>
            <h4 className="font-semibold text-foreground mb-2">Live Chat</h4>
            <p className="text-sm text-muted-foreground mb-4">
              Instant support for urgent queries
            </p>
            <a href="https://wa.me/9953306560" target="_blank" rel="noopener noreferrer">
              <Button variant="outline" size="sm">Start Chat</Button>
            </a>
          </Card>

          <Card className="p-6 text-center hover:shadow-card-medical transition-all duration-300 hover:-translate-y-1 group cursor-pointer">
            <div className="p-4 bg-medical-teal rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center group-hover:scale-110 transition-transform">
              <Phone className="w-8 h-8 text-white" />
            </div>
            <h4 className="font-semibold text-foreground mb-2">Emergency Support</h4>
            <p className="text-sm text-muted-foreground mb-4">
              24/7 emergency medical assistance
            </p>
            <a href="tel:+919953306560">
              <Button variant="medical" size="sm">Call Now</Button>
            </a>
          </Card>

          <Card className="p-6 text-center hover:shadow-card-medical transition-all duration-300 hover:-translate-y-1 group cursor-pointer">
            <div className="p-4 bg-trust-blue rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center group-hover:scale-110 transition-transform">
              <Globe className="w-8 h-8 text-white" />
            </div>
            <h4 className="font-semibold text-foreground mb-2">Find Doctors</h4>
            <p className="text-sm text-muted-foreground mb-4">
              Browse specialists based on your condition
            </p>
            <Button variant="outline" size="sm">Browse</Button>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default Contact;