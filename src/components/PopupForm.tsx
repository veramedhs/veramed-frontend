"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Upload, X, File as FileIcon } from "lucide-react";

const PopupForm = () => {
  const [file, setFile] = useState<File | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setFile(file);
    }
  };

  const handleRemoveFile = () => {
    setFile(null);
  };

  return (
    <div className="p-8 rounded-2xl shadow-xl w-full max-w-md mx-auto bg-white">
      <div className="text-center mb-6">
        <h2 className="text-2xl font-bold text-foreground">Get a Consultation</h2>
        <p className="text-muted-foreground">
          Fill out the form below and we'll get back to you shortly.
        </p>
      </div>

      <form className="space-y-6">
        <div className="grid w-full items-center gap-1.5">
          <Label htmlFor="name">Full Name</Label>
          <Input type="text" id="name" placeholder="John Doe" required />
        </div>

        <div className="grid w-full items-center gap-1.5">
          <Label htmlFor="phone">Phone Number</Label>
          <Input type="tel" id="phone" placeholder="+1 (555) 123-4567" required />
        </div>

        <div className="grid w-full items-center gap-1.5">
          <Label htmlFor="message">Message</Label>
          <Textarea
            id="message"
            placeholder="Please describe your medical needs..."
            className="min-h-[120px]"
          />
        </div>

        <div className="grid w-full items-center gap-1.5">
          <Label htmlFor="file-upload">Upload Medical Documents (Optional)</Label>
          {file ? (
            <div className="flex items-center justify-between p-3 rounded-md bg-muted/20">
              <div className="flex items-center gap-2">
                <FileIcon className="w-5 h-5 text-muted-foreground" />
                <span className="text-sm font-medium text-foreground truncate">
                  {file.name}
                </span>
              </div>
              <Button
                type="button"
                variant="ghost"
                size="icon"
                onClick={handleRemoveFile}
                className="h-7 w-7"
              >
                <X className="w-4 h-4" />
              </Button>
            </div>
          ) : (
            <div className="relative flex flex-col items-center justify-center w-full h-32 border-2 border-dashed rounded-lg cursor-pointer border-border bg-blue-100 hover:bg-blue-200 transition-colors">
              <Input
                id="file-upload"
                type="file"
                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                onChange={handleFileChange}
              />
              <div className="flex flex-col items-center justify-center pt-5 pb-6 text-center">
                <Upload className="w-8 h-8 mb-3 text-blue-500" />
                <p className="mb-1 text-sm text-blue-600">
                  <span className="font-semibold">Click to upload</span> or drag and drop
                </p>
                <p className="text-xs text-blue-600">
                  PDF, DOCX, or image files (max. 10MB)
                </p>
              </div>
            </div>
          )}
        </div>

        <Button type="submit" variant="medical" className="w-full">
          Submit Request
        </Button>
      </form>
    </div>
  );
};

export default PopupForm;
