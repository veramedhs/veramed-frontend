import React, { useState } from 'react';
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";

import {
  Phone,
  Mail,
  MapPin,
  Clock,
  Send,
  MessageCircle,
  Calendar,
  Globe
} from "lucide-react";

const Contact = () => {
  const [formData, setFormData] = useState({
    fullName: "",
    phone: "",
    email: "",
    preferredCountry: "",
    medicalCondition: "",
    additionalInfo: "",
  });

  const [countryCode, setCountryCode] = useState("+91");
  const [phoneNumber, setPhoneNumber] = useState("");

  const handleInputChange = (e: any) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  // ⭐ Phone Input
  const handlePhoneChange = (value: string, data: any) => {
    const dial = `+${data.dialCode}`;
    const numberOnly = value.replace(data.dialCode, "");

    setCountryCode(dial);
    setPhoneNumber(numberOnly);
    setFormData(prev => ({ ...prev, phone: numberOnly }));
  };

  const handleSubmit = (e: any) => {
    e.preventDefault();

    const finalData = {
      ...formData,
      phone: `${countryCode}${phoneNumber}`
    };

    console.log("Submitted Data:", finalData);
  };

  return (
    <section id="contact" className="py-20 bg-background">
      <div className="container mx-auto px-4">

        <div className="text-center mb-16 animate-fade-in">
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
            Ready to Begin Your <span className="text-primary">Healthcare Journey?</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Get in touch with our expert team for a personalized consultation.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-16">

          {/* Left Cards */}
          <div className="space-y-6">
            <Card className="p-6 hover:shadow-card-medical">
              <div className="flex items-center gap-4 mb-4">
                <div className="p-3 bg-gradient-primary rounded-lg">
                  <Phone className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h4 className="font-semibold">Phone</h4>
                  <p className="text-muted-foreground">+91-9953306560</p>
                </div>
              </div>
              <p className="text-sm text-muted-foreground">Speak with our experts</p>
            </Card>

            <Card className="p-6 hover:shadow-card-medical">
              <div className="flex items-center gap-4 mb-4">
                <div className="p-3 bg-medical-teal rounded-lg">
                  <Mail className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h4 className="font-semibold">Email</h4>
                  <p className="text-muted-foreground">veramedhs@gmail.com</p>
                </div>
              </div>
              <p className="text-sm text-muted-foreground">Send us your requirements</p>
            </Card>

            <Card className="p-6 hover:shadow-card-medical">
              <div className="flex items-center gap-4 mb-4">
                <div className="p-3 bg-trust-blue rounded-lg">
                  <MapPin className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h4 className="font-semibold">Office</h4>
                  <p className="text-muted-foreground">Gurgaon, India</p>
                </div>
              </div>
              <p className="text-sm text-muted-foreground">Visit our HQ</p>
            </Card>

            <Card className="p-6 hover:shadow-card-medical">
              <div className="flex items-center gap-4 mb-4">
                <div className="p-3 bg-accent rounded-lg">
                  <Clock className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h4 className="font-semibold">Hours</h4>
                  <p className="text-muted-foreground">24/7 Support</p>
                </div>
              </div>
              <p className="text-sm text-muted-foreground">Round-the-clock assistance</p>
            </Card>
          </div>

          {/* Contact Form */}
          <div className="lg:col-span-2">
            <Card className="p-8 shadow-card-medical">
              <h3 className="text-2xl font-bold mb-6">Get Your Free Consultation</h3>

              <form onSubmit={handleSubmit} className="space-y-6">
                
                {/* Row 1 */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium mb-2">Full Name *</label>

                    {/* ⭐ VALIDATION APPLIED HERE ⭐ */}
                    <Input
                      name="fullName"
                      placeholder="Enter your full name"
                      value={formData.fullName}
                      onChange={(e) => {
                        const cleaned = e.target.value.replace(/[^A-Za-z ]+/g, "");
                        setFormData(prev => ({ ...prev, fullName: cleaned }));
                      }}
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-2">Phone Number *</label>
                    <PhoneInput
                      country="in"
                      value={countryCode + phoneNumber}
                      onChange={handlePhoneChange}
                      inputProps={{ required: true }}
                      containerClass="w-full"
                      inputClass="!w-full !py-3 !text-sm !border !border-gray-300 !rounded-lg"
                    />
                  </div>
                </div>

                {/* Row 2 */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium mb-2">Email Address *</label>
                    <Input
                      name="email"
                      type="email"
                      placeholder="your.email@example.com"
                      value={formData.email}
                      onChange={handleInputChange}
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-2">Preferred Country</label>
                    <Input
                      name="preferredCountry"
                      placeholder="India, Singapore..."
                      value={formData.preferredCountry}
                      onChange={handleInputChange}
                    />
                  </div>
                </div>

                {/* Condition */}
                <div>
                  <label className="block text-sm font-medium mb-2">Medical Condition *</label>
                  <Input
                    name="medicalCondition"
                    placeholder="Describe your condition..."
                    value={formData.medicalCondition}
                    onChange={handleInputChange}
                    required
                  />
                </div>

                {/* Additional Info */}
                <div>
                  <label className="block text-sm font-medium mb-2">Additional Information</label>
                  <Textarea
                    name="additionalInfo"
                    placeholder="Any extra details..."
                    rows={4}
                    value={formData.additionalInfo}
                    onChange={handleInputChange}
                  />
                </div>

                {/* Buttons */}
                <div className="flex flex-col sm:flex-row gap-4">
                  <Button type="submit" variant="medical" className="flex-1 group">
                    <Send className="w-4 h-4 mr-2 group-hover:translate-x-1" />
                    Send Consultation Request
                  </Button>

                  <Button type="button" variant="outline" className="flex-1">
                    <Calendar className="w-4 h-4 mr-2" />
                    Schedule Call Back
                  </Button>
                </div>

              </form>
            </Card>
          </div>
        </div>

        {/* Bottom Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card className="p-6 text-center hover:shadow-card-medical">
            <div className="p-4 bg-gradient-primary rounded-full w-16 h-16 mx-auto mb-4">
              <MessageCircle className="w-8 h-8 text-white mx-auto" />
            </div>
            <h4 className="font-semibold mb-2">Live Chat</h4>
            <p className="text-sm text-muted-foreground mb-4">Instant support</p>
            <a href="https://wa.me/9953306560">
              <Button variant="outline" size="sm">Start Chat</Button>
            </a>
          </Card>

          <Card className="p-6 text-center hover:shadow-card-medical">
            <div className="p-4 bg-medical-teal rounded-full w-16 h-16 mx-auto mb-4">
              <Phone className="w-8 h-8 text-white mx-auto" />
            </div>
            <h4 className="font-semibold mb-2">Emergency Support</h4>
            <p className="text-sm text-muted-foreground mb-4">24/7 assistance</p>
            <a href="tel:+919953306560">
              <Button variant="medical" size="sm">Call Now</Button>
            </a>
          </Card>

          <Card className="p-6 text-center hover:shadow-card-medical">
            <div className="p-4 bg-trust-blue rounded-full w-16 h-16 mx-auto mb-4">
              <Globe className="w-8 h-8 text-white mx-auto" />
            </div>
            <h4 className="font-semibold mb-2">Find Doctors</h4>
            <p className="text-sm text-muted-foreground mb-4">Browse specialists</p>
            <Button variant="outline" size="sm">Browse</Button>
          </Card>
        </div>

      </div>
    </section>
  );
};

export default Contact;
