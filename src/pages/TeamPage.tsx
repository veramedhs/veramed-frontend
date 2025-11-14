import React from 'react';
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Linkedin, Twitter, Mail } from "lucide-react";
import { Link } from "react-router-dom";

// --- TypeScript Type Definitions ---
interface SocialLinks {
  linkedin: string;
  twitter: string;
  email: string;
}

interface TeamMember {
  name: string;
  role: string;
  imageUrl: string;
  bio: string;
  socials: SocialLinks;
}

// --- Team Member Data (Typed) ---
const teamMembers: TeamMember[] = [
  {
    name: "Dr. Ananya Sharma",
    role: "Founder & Chief Medical Officer",
    imageUrl: "https://i.pravatar.cc/150?u=ananya", // Using a different placeholder for circular images
    bio: "Dr. Sharma founded VeraMed to bridge the gap between patients and world-class medical services.",
    socials: {
      linkedin: "#",
      twitter: "#",
      email: "mailto:ananya.sharma@veramedhs.com",
    },
  },
  {
    name: "Rajesh Kumar",
    role: "Head of Patient Relations",
    imageUrl: "https://i.pravatar.cc/150?u=rajesh",
    bio: "Rajesh leads our patient support team with empathy, ensuring every journey is smooth and stress-free.",
    socials: {
      linkedin: "#",
      twitter: "#",
      email: "mailto:rajesh.kumar@veramedhs.com",
    },
  },
  {
    name: "Priya Singh",
    role: "Lead Case Manager",
    imageUrl: "https://i.pravatar.cc/150?u=priya",
    bio: "Priya specializes in coordinating complex treatments, handling all logistics with meticulous care.",
    socials: {
      linkedin: "#",
      twitter: "#",
      email: "mailto:priya.singh@veramedhs.com",
    },
  },
  {
    name: "Amit Patel",
    role: "Technology & Operations Lead",
    imageUrl: "https://i.pravatar.cc/150?u=amit",
    bio: "Amit spearheads our technology platform, ensuring secure and seamless communication for all.",
    socials: {
      linkedin: "#",
      twitter: "#",
      email: "mailto:amit.patel@veramedhs.com",
    },
  },
];

// --- Team Component with Improved Card Design ---
const Team: React.FC = () => {
  return (
    <section id="team" className="py-20 bg-background">
      <div className="container mx-auto px-4">
        {/* --- Page Header (Consistent with Contact Page) --- */}
        <div className="text-center mb-16 animate-fade-in">
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
            Meet Our
            <span className="text-primary"> Dedicated Team</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Our team of experienced professionals is committed to providing you with
            personalized care and expert guidance throughout your healthcare journey.
          </p>
        </div>

        {/* --- Team Member Grid --- */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {teamMembers.map((member) => (
            <Card
              key={member.name}
              className="flex flex-col p-6 border-border/60 hover:shadow-card-medical transition-all duration-300 hover:-translate-y-1 group hover:bg-muted/40"
            >
              {/* --- Circular Image --- */}
              <div className="mx-auto mb-6">
                <img
                  src={member.imageUrl}
                  alt={`Portrait of ${member.name}`}
                  className="w-32 h-32 rounded-full object-cover border-4 border-white dark:border-gray-800 shadow-md group-hover:scale-105 transition-transform duration-300"
                />
              </div>

              {/* --- Text Content (Left Aligned) --- */}
              <div className="text-center flex-grow">
                <h3 className="text-xl font-bold text-foreground">
                  {member.name}
                </h3>
                <p className="text-primary font-medium text-sm mb-3">{member.role}</p>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  {member.bio}
                </p>
              </div>

              {/* --- Social Links (Footer) --- */}
              <div className="mt-6 pt-4 border-t border-border/60">
                <div className="flex justify-center items-center space-x-4">
                  <a href={member.socials.linkedin} target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-primary transition-colors">
                    <Linkedin className="w-5 h-5" />
                  </a>
                   <a href={member.socials.twitter} target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-primary transition-colors">
                    <Twitter className="w-5 h-5" />
                  </a>
                   <a href={member.socials.email} className="text-muted-foreground hover:text-primary transition-colors">
                    <Mail className="w-5 h-5" />
                  </a>
                </div>
              </div>
            </Card>
          ))}
        </div>

        {/* --- Call to Action (Consistent Styling) --- */}
        <div className="mt-20 text-center">
            <Card className="max-w-2xl mx-auto p-8 shadow-card-medical">
                <h3 className="text-2xl font-bold text-foreground mb-4">Have Questions for Our Team?</h3>
                <p className="text-muted-foreground mb-6">We are here to help. Reach out to us for a free, no-obligation consultation.</p>
                <Link to="/contact-us-now">
                    <Button variant="medical" size="lg">
                        Contact Us Now
                    </Button>
                </Link>
            </Card>
        </div>
      </div>
    </section>
  );
};

export default Team;