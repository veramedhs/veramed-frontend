import { useState, useRef, useEffect } from "react";
import { toast } from "react-hot-toast";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Upload, X, File as FileIcon, Loader2 } from "lucide-react";
import { useConsultationStore } from "@/store/consultationStore";

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
  const { isLoading, isSuccess, error, submitConsultation, reset } = useConsultationStore();

  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [message, setMessage] = useState("");
  const [attachment, setAttachment] = useState<File | null>(null);
  const [filePreview, setFilePreview] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  console.log(attachment)

  useEffect(() => {
    if (isSuccess) {
      toast.success("Request sent successfully!");
      setFullName("");
      setEmail("");
      setPhone("");
      setMessage("");
      handleRemoveFile(); // Use the remove handler to correctly reset file state
      onSuccess?.();
      reset();
    }
    if (error) {
      toast.error(error);
      reset();
    }
  }, [isSuccess, error, reset, onSuccess]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];

    if (!selectedFile) {
      return;
    }

    const maxSizeInBytes = 10 * 1024 * 1024; // 10MB

    if (!ALLOWED_FILE_TYPES.includes(selectedFile.type)) {
      toast.error("Invalid file type. Please upload an image, PDF, or DOC file.");
      if (fileInputRef.current) fileInputRef.current.value = "";
      return;
    }

    if (selectedFile.size > maxSizeInBytes) {
      toast.error("File size exceeds the 10MB limit.");
      if (fileInputRef.current) fileInputRef.current.value = "";
      return;
    }

    setAttachment(selectedFile);

    if (selectedFile.type.startsWith("image/")) {
      const reader = new FileReader();
      reader.onloadend = () => setFilePreview(reader.result as string);
      reader.readAsDataURL(selectedFile);
    } else {
      setFilePreview(null);
    }
  };

  const handleRemoveFile = () => {
    setAttachment(null);
    setFilePreview(null);
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
    formData.append("phone", phone);
    formData.append("message", message);
    if (attachment) {
      formData.append("attachment", attachment);
    }

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
          {/* --- RESTORED: Input fields --- */}
          <div className="space-y-2">
            <Label htmlFor="fullName">Full Name</Label>
            <Input id="fullName" value={fullName} onChange={(e) => setFullName(e.target.value)} placeholder="John Doe" required disabled={isLoading} />
          </div>

          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input id="email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="you@example.com" required disabled={isLoading} />
          </div>

          <div className="space-y-2">
            <Label htmlFor="phone">Phone Number</Label>
            <Input id="phone" type="tel" value={phone} onChange={(e) => setPhone(e.target.value)} placeholder="+1 (555) 123-4567" required disabled={isLoading} />
          </div>

          <div className="space-y-2">
            <Label htmlFor="message">Message</Label>
            <Textarea id="message" value={message} onChange={(e) => setMessage(e.target.value)} placeholder="Please describe your medical needs..." className="min-h-[100px]" disabled={isLoading} />
          </div>
          {/* --- End of restored fields --- */}


          <div className="space-y-2">
            <Label htmlFor="attachment">Upload Medical Documents (Optional)</Label>
            {attachment ? (
              <div className="w-full p-3 space-y-3 border rounded-lg border-border">
                {/* --- RESTORED: Display for selected file --- */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3 min-w-0">
                    {filePreview ? (
                      <img src={filePreview} alt="File preview" className="object-cover w-10 h-10 rounded-md" />
                    ) : (
                      <FileIcon className="w-8 h-8 text-muted-foreground" />
                    )}
                    <div className="flex-grow min-w-0">
                      <p className="text-sm font-medium truncate text-foreground">{attachment.name}</p>
                      <p className="text-xs text-muted-foreground">{(attachment.size / 1024).toFixed(2)} KB</p>
                    </div>
                  </div>
                  <Button type="button" variant="ghost" size="icon" onClick={handleRemoveFile} className="w-8 h-8 rounded-full flex-shrink-0" disabled={isLoading}>
                    <X className="w-4 h-4" />
                  </Button>
                </div>
                {/* --- End of restored display --- */}
              </div>
            ) : (
              <div
                className={`relative flex flex-col items-center justify-center w-full h-32 transition-colors border-2 border-dashed rounded-lg border-border bg-background ${!isLoading && 'cursor-pointer hover:bg-muted'}`}
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
                />
                <div className="flex flex-col items-center justify-center text-center">
                  <Upload className="w-8 h-8 mb-2 text-muted-foreground" />
                  <p className="mb-1 text-sm text-foreground">
                    <span className="font-semibold text-blue-600">Click to upload</span> or drag and drop
                  </p>
                  <p className="text-xs text-muted-foreground">
                    Image, PDF, DOC/DOCX (max. 10MB)
                  </p>
                </div>
              </div>
            )}
          </div>

          {/* --- RESTORED: Submit Button --- */}
          <Button type="submit" variant="medical" className="w-full" disabled={isLoading}>
            {isLoading ? (
              <>
                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                Submitting...
              </>
            ) : (
              "Submit Request"
            )}
          </Button>
          {/* --- End of restored button --- */}
        </form>
      </div>
    </>
  );
};

export default ConsultationForm;