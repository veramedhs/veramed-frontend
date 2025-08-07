// src/pages/Testimonials.tsx

import React, { useState } from 'react';
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Star, MessageSquarePlus } from "lucide-react";
import { Toaster } from 'react-hot-toast';

// Import the modal component. Note: We no longer need ReviewFormData here.
import { ReviewModal } from '@/components/ReviewModal'; 

// --- TypeScript Type Definitions ---
interface Testimonial {
  _id?: string; // Add optional _id for mapping keys from the database
  name: string;
  location: string;
  profileImageUrl?: string; // Now using the backend's name for the image
  rating: number;
  review: string;
}

// --- Dummy Data ---
// This will eventually be replaced by a fetch call to your backend.
const testimonials: Testimonial[] = [
  {
    _id: "1",
    name: "Aisha Ahmed",
    location: "Dubai, UAE",
    profileImageUrl: "https://i.pravatar.cc/150?u=aisha",
    rating: 5,
    review: "The entire process was seamless. From the initial consultation to my recovery in Turkey, the team was incredibly supportive. I felt safe and cared for every step of the way.",
  },
  {
    _id: "2",
    name: "John Carter",
    location: "London, UK",
    profileImageUrl: "https://i.pravatar.cc/150?u=john",
    rating: 5,
    review: "I was hesitant about medical travel, but this company exceeded all my expectations. The hospital in India was state-of-the-art, and the cost savings were significant.",
  },
  {
    _id: "3",
    name: "Fatima Al-Sayed",
    location: "Riyadh, Saudi Arabia",
    profileImageUrl: "https://i.pravatar.cc/150?u=fatima",
    rating: 4,
    review: "Excellent coordination and communication. They handled all the logistics, which allowed me to focus solely on my health. Highly recommended for their professionalism.",
  },
  {
    _id: "4",
    name: "David Chen",
    location: "Singapore",
    profileImageUrl: "https://i.pravatar.cc/150?u=david",
    rating: 5,
    review: "My knee replacement surgery in Thailand was a huge success. The quality of care was top-notch, and the team provided fantastic post-operative support.",
  },
  {
    _id: "5",
    name: "Chidinma Okoro",
    location: "Lagos, Nigeria",
    profileImageUrl: "https://i.pravatar.cc/150?u=chidinma",
    rating: 5,
    review: "An absolutely trustworthy and reliable service. They connected me with the best specialists and made sure my journey was comfortable and hassle-free.",
  },
  {
    _id: "6",
    name: "Maria Garcia",
    location: "Madrid, Spain",
    profileImageUrl: "https://i.pravatar.cc/150?u=maria",
    rating: 4,
    review: "The level of personal attention was remarkable. My case manager was available 24/7 to answer my questions. It made all the difference in my experience.",
  },
];

// --- Helper & Reusable Card Component ---
const StarRating: React.FC<{ rating: number }> = ({ rating }) => ( <div className="flex items-center gap-1">{[...Array(5)].map((_, i) => (<Star key={i} className={`w-5 h-5 ${i < rating ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'}`} />))}</div>);

const TestimonialCard: React.FC<{ testimonial: Testimonial }> = ({ testimonial }) => (
  <Card className="w-[380px] p-6 flex flex-col shrink-0">
    <div className="flex items-start gap-4 mb-4">
      <img 
        // Use a default image if one isn't provided
        src={testimonial.profileImageUrl || 'https://i.pravatar.cc/150?u=default'} 
        alt={testimonial.name} 
        className="w-16 h-16 rounded-full object-cover border-2 border-border" 
      />
      <div>
        <h4 className="font-bold text-lg text-foreground">{testimonial.name}</h4>
        <p className="text-sm text-muted-foreground">{testimonial.location}</p>
      </div>
    </div>
    <div className="mb-4">
      <StarRating rating={testimonial.rating} />
    </div>
    <p className="text-muted-foreground leading-relaxed flex-grow">“{testimonial.review}”</p>
  </Card>
);

// --- Main Testimonials Component ---
const Testimonials: React.FC = () => {
  // This state now ONLY controls whether the modal is visible or not.
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    // Wrap with a Fragment to include the Toaster at the top level
    <>
      <Toaster position="top-center" reverseOrder={false} />
      
      <section id="testimonials" className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16 animate-fade-in">
            <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
              Trusted by Patients<span className="text-primary"> Worldwide</span>
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Hear from those who have embarked on their healthcare journey with us. Their stories are a testament to our commitment to care.
            </p>

            <div className="mt-8">
              <Button variant="medical" size="lg" onClick={() => setIsModalOpen(true)}>
                <MessageSquarePlus className="w-5 h-5 mr-2" />
                Leave a Review
              </Button>
            </div>
          </div>
        </div>

        {/* Marquee remains the same, using dummy data for now */}
        <div className="relative flex flex-col gap-8">
          <div className="marquee">
            <div className="marquee-group">
              {testimonials.map((t) => <TestimonialCard key={t._id} testimonial={t} />)}
            </div>
            <div aria-hidden="true" className="marquee-group">
              {testimonials.map((t) => <TestimonialCard key={`${t._id}-clone`} testimonial={t} />)}
            </div>
          </div>
          <div className="marquee marquee--reverse">
            <div className="marquee-group">
              {testimonials.map((t) => <TestimonialCard key={t._id} testimonial={t} />)}
            </div>
            <div aria-hidden="true" className="marquee-group">
              {testimonials.map((t) => <TestimonialCard key={`${t._id}-clone`} testimonial={t} />)}
            </div>
          </div>
        </div>
      </section>

      {/* Render the modal, passing only the necessary props */}
      <ReviewModal
        isOpen={isModalOpen}
        onOpenChange={setIsModalOpen}
        onSuccess={() => {
          setIsModalOpen(false);
          // Here you could optionally re-fetch your testimonials to show the new one
          // after it's approved by an admin.
        }}
      />
    </>
  );
};

export default Testimonials;