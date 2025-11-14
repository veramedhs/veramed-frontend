// src/components/ReviewModal.tsx

import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  DialogClose,
} from "@/components/ui/dialog";
import { Star, Paperclip, X, Loader2 } from "lucide-react";
import { toast } from 'react-hot-toast';
import { apiClient } from '@/lib/apiClient';

interface ReviewModalProps {
  isOpen: boolean;
  onOpenChange: (isOpen: boolean) => void;
  onSuccess: () => void;
}

export const ReviewModal: React.FC<ReviewModalProps> = ({ isOpen, onOpenChange, onSuccess }) => {
  const [name, setName] = useState('');
  const [location, setLocation] = useState('');
  const [review, setReview] = useState('');
  const [rating, setRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (!file.type.startsWith('image/')) {
        toast.error("Please upload a valid image file.");
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

  const resetForm = () => {
    setName('');
    setLocation('');
    setReview('');
    setRating(0);
    setHoverRating(0);
    setImageFile(null);
    setImagePreview(null);
  };

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

    const submissionPromise = apiClient.post('/api/v1/veramed/review', formData);

    toast.promise(submissionPromise, {
      loading: 'Submitting your review...',
      success: 'Thank you! Your review is awaiting approval.',
      error: 'Submission failed. Please try again.',
    });

    try {
      await submissionPromise;
      resetForm();
      onSuccess();
    } catch (error) {
      console.error("Submission failed:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[525px]">
        <DialogHeader>
          <DialogTitle className="text-2xl">Share Your Experience</DialogTitle>
          <DialogDescription>
            Your feedback helps us improve and guide other patients.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit}>
          <div className="grid gap-4 py-4">

            {/* ⭐ FULL NAME — Only characters allowed */}
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="name">Full Name *</Label>
                <Input
                  id="name"
                  value={name}
                  placeholder="e.g., John Doe"
                  onChange={(e) => {
                    const cleaned = e.target.value.replace(/[^A-Za-z ]+/g, "");
                    setName(cleaned);
                  }}
                  required
                  disabled={isSubmitting}
                />
              </div>

              {/* LOCATION */}
              <div className="space-y-2">
                <Label htmlFor="location">Your Location *</Label>
                <Input
                  id="location"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  placeholder="e.g., London, UK"
                  required
                  disabled={isSubmitting}
                />
              </div>
            </div>

            {/* Rating */}
            <div className="space-y-2">
              <Label>Your Rating *</Label>
              <div className="flex items-center gap-2" onMouseLeave={() => setHoverRating(0)}>
                {[...Array(5)].map((_, index) => {
                  const currentRating = index + 1;
                  return (
                    <Star
                      key={index}
                      className={`w-8 h-8 cursor-pointer transition-colors ${
                        currentRating <= (hoverRating || rating)
                          ? 'text-yellow-400 fill-yellow-400'
                          : 'text-gray-300'
                      }`}
                      onClick={() => !isSubmitting && setRating(currentRating)}
                      onMouseEnter={() => !isSubmitting && setHoverRating(currentRating)}
                    />
                  );
                })}
              </div>
            </div>

            {/* Review */}
            <div className="space-y-2">
              <Label htmlFor="review">Your Review *</Label>
              <Textarea
                id="review"
                value={review}
                onChange={(e) => setReview(e.target.value)}
                placeholder="Tell us about your experience..."
                rows={4}
                required
                disabled={isSubmitting}
              />
            </div>

            {/* Image Upload */}
            <div className="space-y-2">
              <Label>Upload Photo (Optional)</Label>

              <Input
                id="image-upload"
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                className="hidden"
                disabled={isSubmitting}
              />

              <Label
                htmlFor="image-upload"
                className={`flex items-center gap-2 p-2 border-2 border-dashed rounded-md transition-colors ${
                  isSubmitting ? 'cursor-not-allowed bg-muted/50' : 'cursor-pointer hover:border-primary hover:bg-primary/10'
                }`}
              >
                <Paperclip className="w-4 h-4 text-muted-foreground" />
                <span className="text-sm text-muted-foreground">Click to upload a photo</span>
              </Label>

              {imagePreview && (
                <div className="mt-2 relative w-24 h-24">
                  <img src={imagePreview} alt="Preview" className="w-full h-full object-cover rounded-md" />
                  {!isSubmitting && (
                    <Button
                      type="button"
                      variant="destructive"
                      size="icon"
                      className="absolute -top-2 -right-2 h-6 w-6 rounded-full"
                      onClick={removeImage}
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  )}
                </div>
              )}
            </div>
          </div>

          <DialogFooter>
            <DialogClose asChild>
              <Button type="button" variant="outline" disabled={isSubmitting}>Cancel</Button>
            </DialogClose>

            <Button type="submit" variant="medical" disabled={isSubmitting}>
              {isSubmitting ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Submitting...
                </>
              ) : (
                "Submit Review"
              )}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};
