import { useState, useRef, useEffect } from "react";
import { toast } from "react-hot-toast";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Upload, X, File as FileIcon, Loader2 } from "lucide-react";
import { useConsultationStore } from "@/store/consultationStore";

// ✅ 1. IMPORT SELECT COMPONENTS AND COUNTRY DATA
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { countryData } from "@/lib/data/countries"; // Make sure this path is correct for your project

// Define allowed file types for validation and the input's accept attribute
const ALLOWED_FILE_TYPES = [
  "image/jpeg",
  "image/png",
  "image/webp",
  "application/pdf",
  "application/msword", // .doc
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document", // .docx
];
const ACCEPTED_FILES_STRING = ".png, .jpg, .jpeg, .pdf, .doc, .docx";

const ConsultationForm = ({ onSuccess }: { onSuccess?: () => void }) => {
  const { isLoading, isSuccess, error, submitConsultation, reset } =
    useConsultationStore();

  // ✅ 2. UPDATE STATE FOR PHONE NUMBER
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [countryCode, setCountryCode] = useState("+91"); // New state for country code
  const [phone, setPhone] = useState(""); // This now holds only the number
  const [message, setMessage] = useState("");
  const [attachments, setAttachments] = useState<File[]>([]);
  const [filePreviews, setFilePreviews] = useState<string[]>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isSuccess) {
      toast.success("Request sent successfully!");
      setFullName("");
      setEmail("");
      setPhone("");
      setCountryCode("+91"); // Reset country code on success
      setMessage("");
      handleRemoveAllFiles();
      onSuccess?.();
      reset();
    }
    if (error) {
      toast.error(error);
      reset();
    }
  }, [isSuccess, error, reset, onSuccess]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFiles = e.target.files;

    if (!selectedFiles) {
      return;
    }

    const newFiles = Array.from(selectedFiles);
    const maxSizeInBytes = 10 * 1024 * 1024; // 10MB

    for (const file of newFiles) {
      if (!ALLOWED_FILE_TYPES.includes(file.type)) {
        toast.error(
          `Invalid file type: ${file.name}. Please upload an image, PDF, or DOC file.`
        );
        continue;
      }

      if (file.size > maxSizeInBytes) {
        toast.error(`File size exceeds the 10MB limit: ${file.name}.`);
        continue;
      }

      setAttachments((prev) => [...prev, file]);

      if (file.type.startsWith("image/")) {
        const reader = new FileReader();
        reader.onloadend = () =>
          setFilePreviews((prev) => [...prev, reader.result as string]);
        reader.readAsDataURL(file);
      } else {
        setFilePreviews((prev) => [...prev, ""]);
      }
    }

    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  const handleRemoveFile = (index: number) => {
    setAttachments((prev) => prev.filter((_, i) => i !== index));
    setFilePreviews((prev) => prev.filter((_, i) => i !== index));
  };

  const handleRemoveAllFiles = () => {
    setAttachments([]);
    setFilePreviews([]);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (isLoading) return;

    const formData = new FormData();
    formData.append("fullName", fullName);
    formData.append("email", email);
    // ✅ 3. COMBINE COUNTRY CODE AND PHONE ON SUBMIT
    formData.append("phone", `${countryCode}${phone}`);
    formData.append("message", message);
    attachments.forEach((attachment) => {
      formData.append("attachments[]", attachment);
    });

    await submitConsultation(formData);
  };

  return (
    <>
      <DialogHeader className="p-6 pb-4">
        <DialogTitle className="text-2xl font-bold text-center">
          Get a Free Consultation
        </DialogTitle>
        <DialogDescription className="text-center">
          Fill out the form below and we'll get back to you shortly.
        </DialogDescription>
      </DialogHeader>

      <div className="px-6 pb-6">
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="fullName">Full Name</Label>
            <Input
              id="fullName"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              placeholder="John Doe"
              required
              disabled={isLoading}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@example.com"
              required
              disabled={isLoading}
            />
          </div>

          {/* ✅ 4. UPDATED PHONE NUMBER FIELD WITH DROPDOWN */}
          <div className="space-y-2">
            <Label htmlFor="phone">Phone Number</Label>
            <div className="flex items-center gap-2">
              <Select
                defaultValue={countryCode}
                onValueChange={setCountryCode}
                disabled={isLoading}
              >
                <SelectTrigger className="w-[150px]">
                  <SelectValue placeholder="Code" />
                </SelectTrigger>
                <SelectContent>
                  {countryData.map((country) => (
                    <SelectItem key={country.iso} value={`+${country.code}`}>
                      {country.country} (+{country.code})
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <Input
                id="phone"
                type="tel"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="XXXXXXXXXX"
                required
                disabled={isLoading}
                className="flex-1"
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="message">Message</Label>
            <Textarea
              id="message"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Please describe your medical needs..."
              className="min-h-[100px]"
              disabled={isLoading}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="attachment">Upload Medical Documents (Optional)</Label>
            {attachments.length > 0 ? (
              <div className="w-full p-3 space-y-3 border rounded-lg border-border">
                {attachments.map((attachment, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between"
                  >
                    <div className="flex items-center gap-3 min-w-0">
                      {filePreviews[index] ? (
                        <img
                          src={filePreviews[index]}
                          alt="File preview"
                          className="object-cover w-10 h-10 rounded-md"
                        />
                      ) : (
                        <FileIcon className="w-8 h-8 text-muted-foreground" />
                      )}
                      <div className="flex-grow min-w-0">
                        <p className="text-sm font-medium truncate text-foreground">
                          {attachment.name}
                        </p>
                        <p className="text-xs text-muted-foreground">
                          {(attachment.size / 1024).toFixed(2)} KB
                        </p>
                      </div>
                    </div>
                    <Button
                      type="button"
                      variant="ghost"
                      size="icon"
                      onClick={() => handleRemoveFile(index)}
                      className="w-8 h-8 rounded-full flex-shrink-0"
                      disabled={isLoading}
                    >
                      <X className="w-4 h-4" />
                    </Button>
                  </div>
                ))}
              </div>
            ) : (
              <div
                className={`relative flex flex-col items-center justify-center w-full h-32 transition-colors border-2 border-dashed rounded-lg border-border bg-background ${
                  !isLoading && "cursor-pointer hover:bg-muted"
                }`}
                onClick={() => !isLoading && fileInputRef.current?.click()}
              >
                <Input
                  ref={fileInputRef}
                  id="attachment"
                  type="file"
                  className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                  onChange={handleFileChange}
                  disabled={isLoading}
                  accept={ACCEPTED_FILES_STRING}
                  multiple
                />
                <div className="flex flex-col items-center justify-center text-center">
                  <Upload className="w-8 h-8 mb-2 text-muted-foreground" />
                  <p className="mb-1 text-sm text-foreground">
                    <span className="font-semibold text-blue-600">
                      Click to upload
                    </span>{" "}
                    or drag and drop
                  </p>
                  <p className="text-xs text-muted-foreground">
                    Image, PDF, DOC/DOCX (max. 10MB)
                  </p>
                </div>
              </div>
            )}
          </div>

          <Button
            type="submit"
            variant="medical"
            className="w-full"
            disabled={isLoading}
          >
            {isLoading ? (
              <>
                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                Submitting...
              </>
            ) : (
              "Submit Request"
            )}
          </Button>
        </form>
      </div>
    </>
  );
};

export default ConsultationForm;