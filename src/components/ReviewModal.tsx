// src/components/ReviewModal.tsx - Refactored with custom Tailwind CSS for UI components

import React, { useState, useEffect, useCallback, useRef } from "react";
import { Star, Paperclip, X, Loader2 } from "lucide-react";
import { toast } from "react-hot-toast";
import { apiClient } from "@/lib/apiClient";

// ⭐ Country dropdown library
import Select from "react-select";
import countryList from "react-select-country-list";

interface ReviewModalProps {
  isOpen: boolean;
  onOpenChange: (isOpen: boolean) => void;
  onSuccess: () => void;
}

export const ReviewModal: React.FC<ReviewModalProps> = ({
  isOpen,
  onOpenChange,
  onSuccess,
}) => {
  const [name, setName] = useState("");
  const [location, setLocation] = useState("");
  const [review, setReview] = useState("");
  const [rating, setRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);

  const [imageFiles, setImageFiles] = useState<File[]>([]
);
  const [imagePreviews, setImagePreviews] = useState<string[]>([]);

  const [isSubmitting, setIsSubmitting] = useState(false);

  const countryOptions = countryList().getData();

  const handleNameChange = (value: string) => {
    const cleaned = value.replace(/[^A-Za-z\s]/g, "");
    setName(cleaned);
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;

    if (!files) return;

    const validFiles: File[] = [];
    const previews: string[] = [];

    Array.from(files).forEach((file) => {
      if (file.type.startsWith("image/")) {
        validFiles.push(file);
        previews.push(URL.createObjectURL(file));
      } else {
        toast.error("Only image files are allowed.");
      }
    });

    setImageFiles((prev) => [...prev, ...validFiles]);
    setImagePreviews((prev) => [...prev, ...previews]);
  };

  const removeImage = (index: number) => {
    setImageFiles((prev) => prev.filter((_, i) => i !== index));
    setImagePreviews((prev) => prev.filter((_, i) => i !== index));
  };

  const resetForm = () => {
    setName("");
    setLocation("");
    setReview("");
    setRating(0);
    setHoverRating(0);
    setImageFiles([]);
    setImagePreviews([]);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (
      rating === 0 ||
      name.trim() === "" ||
      review.trim() === "" ||
      location.trim() === ""
    ) {
      toast.error("Please fill in all required fields and provide a rating.");
      return;
    }

    setIsSubmitting(true);

    const formData = new FormData();
    formData.append("name", name);
    formData.append("location", location);
    formData.append("rating", String(rating));
    formData.append("review", review);

    imageFiles.forEach((file) => {
      formData.append("profileImages", file);
    });

    const submissionPromise = apiClient.post(
      "/api/v1/veramed/review",
      formData
    );

    toast.promise(submissionPromise, {
      loading: "Submitting your review...",
      success: "Thank you! Your review is awaiting approval.",
      error: "Submission failed. Please try again.",
    });

    try {
      await submissionPromise;
      resetForm();
      onSuccess();
      onOpenChange(false); // Close modal on success
    } catch (error) {
      console.error("Submission failed:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  // Close modal when Escape key is pressed
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onOpenChange(false);
      }
    };
    if (isOpen) {
      document.addEventListener("keydown", handleKeyDown);
    } else {
      document.removeEventListener("keydown", handleKeyDown);
    }
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, onOpenChange]);

  // Handle click outside modal content to close
  const modalContentRef = useRef<HTMLDivElement>(null);
  const handleOverlayClick = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      if (modalContentRef.current && !modalContentRef.current.contains(e.target as Node)) {
        onOpenChange(false);
      }
    },
    [onOpenChange]
  );

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4"
      onClick={handleOverlayClick}
      role="dialog"
      aria-modal="true"
      aria-labelledby="dialog-title"
      aria-describedby="dialog-description"
    >
      <div
        ref={modalContentRef}
        className="relative w-full max-w-[525px] max-h-[85vh] rounded-lg bg-white p-0 shadow-lg flex flex-col overflow-hidden"
        // Prevent clicks inside content from closing the modal
        onClick={(e) => e.stopPropagation()}
      >
        {/* Dialog Header */}
        <div className="flex flex-col space-y-1.5 p-6 border-b border-gray-200">
          <h2 id="dialog-title" className="text-2xl font-semibold leading-none tracking-tight text-gray-900">
            Share Your Experience
          </h2>
          <p id="dialog-description" className="text-sm text-gray-500">
            Your feedback helps us improve and guide other patients.
          </p>
          <button
            type="button"
            className="absolute right-4 top-4 rounded-md p-1 opacity-70 transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-gray-300 disabled:pointer-events-none"
            onClick={() => onOpenChange(false)}
            aria-label="Close"
          >
            <X className="h-4 w-4 text-gray-500" />
          </button>
        </div>

        {/* Dialog Body (scrollable) */}
        <div className="flex-1 overflow-y-auto px-6 pb-4">
          <form onSubmit={handleSubmit}>
            <div className="grid gap-4 py-4">
              {/* Name + Country Dropdown */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label htmlFor="name" className="text-sm font-medium leading-none text-gray-700">Full Name *</label>
                  <input
                    id="name"
                    type="text"
                    value={name}
                    placeholder="e.g., John Doe"
                    onChange={(e) => handleNameChange(e.target.value)}
                    required
                    disabled={isSubmitting}
                    className="flex h-10 w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm text-gray-900 ring-offset-white file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-gray-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium leading-none text-gray-700">Your Location *</label>
                  <Select
                    options={countryOptions}
                    placeholder="Select Country"
                    value={
                      countryOptions.find((c) => c.label === location) || null
                    }
                    onChange={(value: any) => setLocation(value ? value.label : "")}
                    isDisabled={isSubmitting}
                    className="text-gray-900"
                    styles={{
                        control: (provided, state) => ({
                            ...provided,
                            borderColor: state.isFocused ? '#3B82F6' : '#D1D5DB', // blue-500 or gray-300
                            boxShadow: state.isFocused ? '0 0 0 1px #3B82F6' : 'none',
                            '&:hover': {
                                borderColor: state.isFocused ? '#3B82F6' : '#9CA3AF', // blue-500 or gray-400
                            },
                            height: '40px', // h-10
                            backgroundColor: state.isDisabled ? '#F3F4F6' : 'white', // gray-100 for disabled
                            cursor: state.isDisabled ? 'not-allowed' : 'default',
                        }),
                        option: (provided, state) => ({
                            ...provided,
                            backgroundColor: state.isSelected ? '#BFDBFE' : state.isFocused ? '#E0F2FE' : null, // blue-200 / blue-100
                            color: '#1F2937', // gray-800
                        }),
                        singleValue: (provided) => ({
                            ...provided,
                            color: '#1F2937', // gray-800
                        }),
                        placeholder: (provided) => ({
                            ...provided,
                            color: '#9CA3AF', // gray-400
                        }),
                    }}
                  />
                </div>
              </div>

              {/* Rating */}
              <div className="space-y-2">
                <label className="text-sm font-medium leading-none text-gray-700">Your Rating *</label>
                <div
                  className="flex items-center gap-2"
                  onMouseLeave={() => setHoverRating(0)}
                >
                  {[...Array(5)].map((_, index) => {
                    const currentRating = index + 1;
                    return (
                      <Star
                        key={index}
                        className={`w-8 h-8 cursor-pointer transition-colors ${
                          currentRating <= (hoverRating || rating)
                            ? "text-yellow-400 fill-yellow-400"
                            : "text-gray-300"
                        }`}
                        onClick={() =>
                          !isSubmitting && setRating(currentRating)
                        }
                        onMouseEnter={() =>
                          !isSubmitting && setHoverRating(currentRating)
                        }
                      />
                    );
                  })}
                </div>
              </div>

              {/* Review */}
              <div className="space-y-2">
                <label className="text-sm font-medium leading-none text-gray-700">Your Review *</label>
                <textarea
                  value={review}
                  onChange={(e) => setReview(e.target.value)}
                  placeholder="Describe your experience..."
                  rows={4}
                  required
                  disabled={isSubmitting}
                  className="flex w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm text-gray-900 ring-offset-white placeholder:text-gray-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 min-h-[80px]"
                />
              </div>

              {/* Multiple Image Upload */}
              <div className="space-y-2">
                <label className="text-sm font-medium leading-none text-gray-700">Upload Photos (Optional)</label>

                <input
                  id="image-upload"
                  type="file"
                  accept="image/*"
                  multiple
                  onChange={handleImageChange}
                  className="hidden"
                  disabled={isSubmitting}
                />

                <label
                  htmlFor="image-upload"
                  className={`flex items-center justify-center gap-2 p-2 border-2 border-dashed rounded-md transition ${
                    isSubmitting
                      ? "cursor-not-allowed opacity-60 bg-gray-50"
                      : "cursor-pointer hover:border-blue-400 hover:bg-blue-50"
                  } h-10`}
                >
                  <Paperclip className="w-4 h-4 text-gray-500" />
                  <span className="text-sm text-gray-500">
                    Click to upload photos
                  </span>
                </label>

                {/* Image Previews */}
                {imagePreviews.length > 0 && (
                  <div className="grid grid-cols-3 gap-3 mt-2">
                    {imagePreviews.map((src, index) => (
                      <div key={index} className="relative w-24 h-24">
                        <img
                          src={src}
                          alt={`Preview ${index + 1}`}
                          className="w-full h-full object-cover rounded-md border border-gray-200"
                        />

                        {!isSubmitting && (
                          <button
                            type="button"
                            className="absolute -top-2 -right-2 h-6 w-6 rounded-full bg-red-500 text-white flex items-center justify-center shadow-sm hover:bg-red-600 transition-colors focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
                            onClick={() => removeImage(index)}
                            aria-label={`Remove image ${index + 1}`}
                          >
                            <X className="h-4 w-4" />
                          </button>
                        )}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </form>
        </div>

        {/* Dialog Footer */}
        <div className="flex justify-end gap-2 p-4 border-t border-gray-200">
          <button
            type="button"
            className="inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gray-300 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-gray-300 bg-white hover:bg-gray-100 hover:text-gray-900 h-10 px-4 py-2"
            onClick={() => onOpenChange(false)}
            disabled={isSubmitting}
          >
            Cancel
          </button>

          <button
            type="submit"
            onClick={handleSubmit} // Attach handleSubmit to the submit button
            className="inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 h-10 px-4 py-2 bg-blue-600 text-white hover:bg-blue-700"
            disabled={isSubmitting}
          >
            {isSubmitting ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Submitting...
              </>
            ) : (
              "Submit Review"
            )}
          </button>
        </div>
      </div>
    </div>
  );
};