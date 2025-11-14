// src/pages/LeaveReviewPage.tsx

import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Star, Paperclip, X, Loader2 } from "lucide-react";
import { Toaster, toast } from 'react-hot-toast';
import { apiClient } from '@/lib/apiClient';
import { Link, useNavigate } from 'react-router-dom'; // Import useNavigate for redirection
import Footer from '@/components/Footer';

// This is a standalone page, so it doesn't need props like isOpen or onOpenChange
export const LeaveReviewPage: React.FC = () => {
  const [name, setName] = useState('');
  const [location, setLocation] = useState('');
  const [review, setReview] = useState('');
  const [rating, setRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate(); // Hook for programmatic navigation

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (!file.type.startsWith('image/')) {
        toast.error("Please upload a valid image file (PNG, JPG, etc.).");
        return;
      }
      setImageFile(file);
      setImagePreview(URL.createObjectURL(file));
    }
  };

  const removeImage = () => {
    setImageFile(null);
    setImagePreview(null);
  };

  // The handleSubmit logic is almost identical, but with a redirect on success
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (rating === 0 || name.trim() === '' || review.trim() === '' || location.trim() === '') {
      toast.error("Please fill in all required fields and provide a rating.");
      return;
    }

    setIsSubmitting(true);

    const formData = new FormData();
    formData.append('name', name);
    formData.append('location', location);
    formData.append('rating', String(rating));
    formData.append('review', review);
    if (imageFile) {
      formData.append('profileImage', imageFile);
    }
    
    try {
      // We don't use toast.promise here to have more control over the redirect
      const submissionToast = toast.loading('Submitting your review...');
      await apiClient.post('/api/v1/veramed/review', formData);

      // On success, show a success message and then redirect
      toast.success('Thank you! Your review is awaiting approval.', { id: submissionToast });
      
      // Redirect to the homepage after a 2-second delay so the user can see the message
      setTimeout(() => {
        navigate('/');
      }, 2000);

    } catch (error) {
      console.error("Submission failed:", error);
      toast.error('Submission failed. Please try again.');
      setIsSubmitting(false); // Only set isSubmitting to false on error, so they can try again
    }
  };

  return (
    <>
      <Toaster position="top-center" reverseOrder={false} />
      <div className="container mx-auto max-w-3xl py-12 px-4">
        <Card>
          <CardHeader>
            <CardTitle className="text-3xl font-bold">Share Your Experience</CardTitle>
            <CardDescription>
              Your feedback helps us improve and guides other patients on their journey.
            </CardDescription>
          </CardHeader>
          <form onSubmit={handleSubmit}>
            <CardContent className="grid gap-6">
              {/* Form fields are identical to the modal's */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Full Name *</Label>
                  <Input id="name" value={name} onChange={(e) => setName(e.target.value)} placeholder="e.g., John Doe" required disabled={isSubmitting} />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="location">Your Location *</Label>
                  <Input id="location" value={location} onChange={(e) => setLocation(e.target.value)} placeholder="e.g., London, UK" required disabled={isSubmitting} />
                </div>
              </div>

              <div className="space-y-2">
                <Label>Your Rating *</Label>
                <div className="flex items-center gap-2" onMouseLeave={() => setHoverRating(0)}>
                  {[...Array(5)].map((_, index) => {
                    const currentRating = index + 1;
                    return ( <Star key={index} className={`w-8 h-8 cursor-pointer transition-colors ${currentRating <= (hoverRating || rating) ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'}`} onClick={() => !isSubmitting && setRating(currentRating)} onMouseEnter={() => !isSubmitting && setHoverRating(currentRating)} />);
                  })}
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="review">Your Review *</Label>
                <Textarea id="review" value={review} onChange={(e) => setReview(e.target.value)} placeholder="Tell us about your experience..." rows={5} required disabled={isSubmitting} />
              </div>

              <div className="space-y-2">
                <Label>Upload Photo (Optional)</Label>
                <Input id="image-upload" type="file" accept="image/*" onChange={handleImageChange} className="hidden" disabled={isSubmitting} />
                <Label htmlFor="image-upload" className={`flex items-center gap-2 p-3 border-2 border-dashed rounded-md transition-colors ${isSubmitting ? 'cursor-not-allowed bg-muted/50' : 'cursor-pointer hover:border-primary hover:bg-primary/10'}`}>
                  <Paperclip className="w-4 h-4 text-muted-foreground" />
                  <span className="text-sm text-muted-foreground">Click to upload a profile photo</span>
                </Label>
                {imagePreview && (
                  <div className="mt-2 relative w-24 h-24">
                    <img src={imagePreview} alt="Selected preview" className="w-full h-full object-cover rounded-md" />
                    {!isSubmitting && (
                      <Button type="button" variant="destructive" size="icon" className="absolute -top-2 -right-2 h-6 w-6 rounded-full" onClick={removeImage}>
                        <X className="h-4 w-4" />
                      </Button>
                    )}
                  </div>
                )}
              </div>
            </CardContent>
            <CardFooter className="flex justify-end gap-2">
              {/* The "Cancel" button is now a Link that goes to the homepage */}
              <Link to="/"><Button type="button" variant="outline" disabled={isSubmitting}>Cancel</Button></Link>
              <Button type="submit" variant="medical" disabled={isSubmitting}>
                {isSubmitting ? (<> <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Submitting... </>) : ("Submit Review")}
              </Button>
            </CardFooter>
          </form>
        </Card>
      </div>
      <Footer />
    </>
  );
};

export default LeaveReviewPage;