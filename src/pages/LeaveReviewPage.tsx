// src/pages/LeaveReviewPage.tsx

import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Star, Paperclip, X, Loader2, Download } from "lucide-react";
import { Toaster, toast } from 'react-hot-toast';
import { apiClient } from '@/lib/apiClient';
import { Link, useNavigate } from 'react-router-dom';
import Footer from '@/components/Footer';

// ⭐ Country Dropdown
import Select from "react-select";
import countryList from "react-select-country-list";

export const LeaveReviewPage: React.FC = () => {
  const [name, setName] = useState('');
  const [location, setLocation] = useState<any>(null);
  const [review, setReview] = useState('');
  const [rating, setRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);

  // ⭐ MULTIPLE FILE SUPPORT
  const [files, setFiles] = useState<any[]>([]);

  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();

  const countryOptions = countryList().getData();

  // ⭐ NAME VALIDATION — ONLY LETTERS
  const handleNameChange = (e: any) => {
    const value = e.target.value;
    if (/^[A-Za-z\s]*$/.test(value)) setName(value);
  };

  // ⭐ MULTIPLE FILE UPLOAD (Image + PDF + DOC)
  const handleFileUpload = (e: any) => {
    const uploaded = Array.from(e.target.files);

    const validFiles = uploaded.filter((file: any) =>
      file.type.startsWith("image/") ||
      file.type === "application/pdf" ||
      file.type.includes("word")
    );

    if (validFiles.length !== uploaded.length) {
      toast.error("Only Images, PDF, DOC allowed.");
    }

    const mappedFiles = validFiles.map((file: any) => ({
      file,
      name: file.name,
      url: URL.createObjectURL(file)
    }));

    setFiles((prev) => [...prev, ...mappedFiles]);
  };

  const removeFile = (index: number) => {
    setFiles(files.filter((_, i) => i !== index));
  };

  // ⭐ Submit Review
  const handleSubmit = async (e: any) => {
    e.preventDefault();

    if (!name.trim() || !review.trim() || !location || rating === 0) {
      toast.error("Please fill all required fields.");
      return;
    }

    setIsSubmitting(true);

    const formData = new FormData();
    formData.append("name", name);
    formData.append("location", location.label);
    formData.append("rating", String(rating));
    formData.append("review", review);

    files.forEach((item: any) => {
      formData.append("documents", item.file);
    });

    try {
      const submissionToast = toast.loading("Submitting...");
      await apiClient.post("/api/v1/veramed/review", formData);

      toast.success("Your review is awaiting approval.", { id: submissionToast });

      setTimeout(() => navigate("/"), 2000);

    } catch (err) {
      toast.error("Submission failed.");
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <Toaster position="top-center" />

      <div className="container mx-auto max-w-3xl py-12 px-4">
        <Card>
          <CardHeader>
            <CardTitle className="text-3xl font-bold">Share Your Experience</CardTitle>
            <CardDescription>Your feedback helps us improve.</CardDescription>
          </CardHeader>

          <form onSubmit={handleSubmit}>
            <CardContent className="grid gap-6">

              {/* NAME + LOCATION */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">

                {/* Full Name */}
                <div className="space-y-2">
                  <Label>Full Name *</Label>
                  <Input
                    value={name}
                    onChange={handleNameChange}
                    placeholder="Enter your name"
                    required
                    disabled={isSubmitting}
                  />
                </div>

                {/* Country Dropdown */}
                <div className="space-y-2">
                  <Label>Your Location *</Label>
                  <Select
                    options={countryOptions}
                    value={location}
                    onChange={setLocation}
                    isDisabled={isSubmitting}
                    placeholder="Select Country"
                    className="text-black"
                  />
                </div>
              </div>

              {/* RATING */}
              <div className="space-y-2">
                <Label>Your Rating *</Label>
                <div className="flex gap-2" onMouseLeave={() => setHoverRating(0)}>
                  {[1, 2, 3, 4, 5].map((i) => (
                    <Star
                      key={i}
                      className={`w-8 h-8 cursor-pointer transition 
                        ${i <= (hoverRating || rating)
                          ? "text-yellow-400 fill-yellow-400"
                          : "text-gray-300"
                        }`}
                      onClick={() => !isSubmitting && setRating(i)}
                      onMouseEnter={() => !isSubmitting && setHoverRating(i)}
                    />
                  ))}
                </div>
              </div>

              {/* REVIEW */}
              <div className="space-y-2">
                <Label>Your Review *</Label>
                <Textarea
                  value={review}
                  onChange={(e) => setReview(e.target.value)}
                  rows={5}
                  required
                  disabled={isSubmitting}
                />
              </div>

              {/* MULTIPLE FILE UPLOAD */}
              <div className="space-y-2">
                <Label>Upload Documents (Optional)</Label>

                <Input
                  id="reviewFiles"
                  type="file"
                  multiple
                  accept="image/*,application/pdf,.doc,.docx"
                  onChange={handleFileUpload}
                  className="hidden"
                />

                <Label
                  htmlFor="reviewFiles"
                  className="flex items-center gap-2 p-3 border-2 border-dashed rounded-md cursor-pointer hover:bg-blue-50"
                >
                  <Paperclip className="w-4 h-4" />
                  <span>Upload Images / PDF / Documents</span>
                </Label>

                {/* File Preview List */}
                {files.length > 0 && (
                  <div className="mt-3 space-y-3">
                    {files.map((file: any, index: number) => (
                      <div
                        key={index}
                        className="flex items-center justify-between p-3 border rounded-lg bg-gray-50"
                      >
                        <div className="flex items-center gap-3">
                          {/* Thumbnail for images */}
                          {file.file.type.startsWith("image/") ? (
                            <img
                              src={file.url}
                              className="w-12 h-12 object-cover rounded"
                            />
                          ) : (
                            <div className="w-12 h-12 flex items-center justify-center bg-gray-200 rounded text-sm">
                              {file.file.type.includes("pdf") ? "PDF" : "DOC"}
                            </div>
                          )}

                          <span className="text-sm font-medium">{file.name}</span>
                        </div>

                        <div className="flex gap-2">
                          {/* DOWNLOAD */}
                          <a
                            href={file.url}
                            download={file.name}
                            className="p-2 bg-green-500 text-white rounded hover:bg-green-600"
                          >
                            <Download className="w-4 h-4" />
                          </a>

                          {/* REMOVE */}
                          <button
                            type="button"
                            onClick={() => removeFile(index)}
                            className="p-2 bg-red-500 text-white rounded hover:bg-red-600"
                          >
                            <X className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>

            </CardContent>

            <CardFooter className="flex justify-end gap-2">
              <Link to="/">
                <Button variant="outline" disabled={isSubmitting}>Cancel</Button>
              </Link>

              <Button type="submit" disabled={isSubmitting}>
                {isSubmitting ? (
                  <>
                    <Loader2 className="h-4 w-4 animate-spin mr-2" />
                    Submitting...
                  </>
                ) : (
                  "Submit Review"
                )}
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
