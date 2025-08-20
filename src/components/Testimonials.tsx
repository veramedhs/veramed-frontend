// src/pages/Testimonials.tsx

import React, { useState, useEffect, useCallback } from 'react';
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Star, MessageSquarePlus, Loader2 } from "lucide-react";
// --- MODIFICATION: Import the 'toast' function ---
import { Toaster, toast } from 'react-hot-toast';

import { ReviewModal } from '@/components/ReviewModal'; 
import { apiClient } from '@/lib/apiClient'; // Ensure this path is correct

// --- TypeScript Type Definition ---
interface Testimonial {
  _id: string; 
  name: string;
  location: string;
  profileImageUrl?: string;
  rating: number;
  review: string;
}

// --- UTILITY: Function to limit word count ---
const truncateText = (text: string, wordLimit: number): string => {
  const words = text.split(' ');
  if (words.length <= wordLimit) {
    return text;
  }
  return words.slice(0, wordLimit).join(' ') + '...';
};

// --- Reusable Card Component ---
const StarRating: React.FC<{ rating: number }> = ({ rating }) => ( 
  <div className="flex items-center gap-1">
    {[...Array(5)].map((_, i) => (
      <Star key={i} className={`w-5 h-5 ${i < rating ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'}`} />
    ))}
  </div>
);

const TestimonialCard: React.FC<{ testimonial: Testimonial }> = ({ testimonial }) => (
  <Card className="w-[380px] h-[260px] p-6 flex flex-col shrink-0">
    <div className="flex items-start gap-4 mb-4">
      <img 
        src={testimonial.profileImageUrl || `https://ui-avatars.com/api/?name=${testimonial.name.replace(' ', '+')}&background=random`} 
        alt={`Testimonial from ${testimonial.name}`}
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
    <p className="text-muted-foreground leading-relaxed flex-grow text-sm">
      “{truncateText(testimonial.review, 25)}”
    </p>
  </Card>
);

// --- Main Testimonials Component ---
const Testimonials: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [reviews, setReviews] = useState<Testimonial[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchReviews = useCallback(async () => {
    setIsLoading(true);
    try {
      const response = await apiClient.get('/api/v1/veramed/review/approved');
      if (response.data && response.data.success) {
        setReviews(response.data.data);
      } else {
        throw new Error(response.data.message || "Failed to fetch reviews.");
      }
      setError(null);
    } catch (err) {
      console.error("Failed to fetch reviews:", err);
      setError("Could not load testimonials at this time. Please try again later.");
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchReviews();
  }, [fetchReviews]);
  
  const MarqueeContent = () => (
    <>
      {reviews.map((testimonial) => <TestimonialCard key={testimonial._id} testimonial={testimonial} />)}
    </>
  );

  return (
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

        <div className="relative">
          {isLoading && (
            <div className="flex justify-center items-center h-48">
              <Loader2 className="w-12 h-12 text-primary animate-spin" />
              <p className="ml-4 text-muted-foreground">Loading Testimonials...</p>
            </div>
          )}

          {error && !isLoading && (
            <div className="text-center h-48 flex justify-center items-center">
              <p className="text-red-500">{error}</p>
            </div>
          )}

          {!isLoading && !error && reviews.length > 0 && (
            <div className="marquee">
              <div className="marquee-group">
                <MarqueeContent />
              </div>
              <div aria-hidden="true" className="marquee-group">
                <MarqueeContent />
              </div>
            </div>
          )}

          {!isLoading && !error && reviews.length === 0 && (
             <div className="text-center h-48 flex justify-center items-center">
               <p className="text-muted-foreground">Be the first to share your story!</p>
             </div>
          )}
        </div>
      </section>

      {/* --- MODIFICATION: Updated onSuccess handler --- */}
      <ReviewModal
        isOpen={isModalOpen}
        onOpenChange={setIsModalOpen}
        onSuccess={() => {
          setIsModalOpen(false);
          // This toast notification provides clear feedback to the user.
          toast.success("Thank you! Your review has been submitted for approval.");
        }}
      />
    </>
  );
};

export default Testimonials;