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

import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";

const ALLOWED_FILE_TYPES = [
  "image/jpeg",
  "image/png",
  "image/webp",
  "application/pdf",
  "application/msword",
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
];
const ACCEPTED_FILES_STRING = ".png, .jpg, .jpeg, .pdf, .doc, .docx";

const ConsultationForm = ({ onSuccess }: { onSuccess?: () => void }) => {
  const { isLoading, isSuccess, error, submitConsultation, reset } =
    useConsultationStore();

  const [fullName, setFullName] = useState("");
  const [countryCode, setCountryCode] = useState("+91");
  const [phone, setPhone] = useState(""); // ⭐ Full phone always shown
  const [message, setMessage] = useState("");
  const [attachments, setAttachments] = useState<File[]>([]);
  const [filePreviews, setFilePreviews] = useState<string[]>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const fullNameRegex = /^[A-Za-z\s.'-]{2,50}$/;

  useEffect(() => {
    if (isSuccess) {
      toast.success("Request sent successfully!");
      setFullName("");
      setPhone("");
      setCountryCode("+91");
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

  const handlePhoneChange = (value: string, data: any) => {
    const dial = `+${data.dialCode}`;
    setCountryCode(dial);

    // Always show full number (country code + actual number)
    const number = value.replace("+", "").replace(data.dialCode, "");
    setPhone(number);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFiles = e.target.files;
    if (!selectedFiles) return;

    const newFiles = Array.from(selectedFiles);
    const maxSizeInBytes = 10 * 1024 * 1024;

    for (const file of newFiles) {
      if (!ALLOWED_FILE_TYPES.includes(file.type)) {
        toast.error(`Invalid file type: ${file.name}`);
        continue;
      }

      if (file.size > maxSizeInBytes) {
        toast.error(`File size exceeds 10MB: ${file.name}`);
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
  };

  const handleRemoveFile = (index: number) => {
    setAttachments((prev) => prev.filter((_, i) => i !== index));
    setFilePreviews((prev) => prev.filter((_, i) => i !== index));
  };

  const handleRemoveAllFiles = () => {
    setAttachments([]);
    setFilePreviews([]);
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!fullName.trim()) return toast.error("Please enter your full name.");
    if (!fullNameRegex.test(fullName))
      return toast.error("Enter a valid full name.");

    if (!phone.trim()) return toast.error("Enter your phone number.");
    if (phone.length < 5 || phone.length > 15)
      return toast.error("Please enter a valid phone number.");

    const formData = new FormData();
    formData.append("fullName", fullName.trim());
    formData.append("phone", `${countryCode}${phone.trim()}`);
    formData.append("message", message.trim());
    formData.append("email", "dumy@gmail.com");

    attachments.forEach((file) => formData.append("attachments[]", file));

    await submitConsultation(formData);
  };

  return (
    <div className="max-h-[85vh] flex flex-col overflow-hidden">

      <DialogHeader className="p-4 pb-2">
        <DialogTitle className="text-xl font-bold text-center">
          Get a Free Consultation
        </DialogTitle>
        <DialogDescription className="text-center">
          Fill out the form below and we'll get back to you shortly.
        </DialogDescription>
      </DialogHeader>

      {/* ⭐ Scrollable Body */}
      <div className="flex-1 overflow-y-auto px-4 pb-4">
        <form id="consultationForm" onSubmit={handleSubmit} className="space-y-4">

          {/* Full Name */}
          <div className="space-y-2">
            <Label>Full Name</Label>
            <Input
              value={fullName}
              onChange={(e) =>
                setFullName(e.target.value.replace(/[^A-Za-z\s.'-]/g, ""))
              }
              placeholder="John Doe"
              required
              disabled={isLoading}
            />
          </div>

          {/* Phone Number */}
          <div className="space-y-2">
            <Label>Phone Number</Label>

            <PhoneInput
              country={"in"}
              value={countryCode + phone}
              onChange={handlePhoneChange}
              inputProps={{
                name: "phone",
                required: true,
              }}
              containerClass="w-full"
              inputClass="!w-full !py-2.5 !text-sm !border !border-gray-300 !rounded-lg"
            />
          </div>

          {/* Message */}
          <div className="space-y-2">
            <Label>Message</Label>
            <Textarea
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Please describe your medical needs..."
              className="min-h-[90px]"
              disabled={isLoading}
            />
          </div>

          {/* File Upload */}
          <div className="space-y-2">
            <Label>Upload Medical Documents (Optional)</Label>

            {attachments.length > 0 ? (
              <div className="w-full p-3 border rounded-lg space-y-2 max-h-32 overflow-auto">
                {attachments.map((attachment, index) => (
                  <div key={index} className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      {filePreviews[index] ? (
                        <img
                          src={filePreviews[index]}
                          className="w-10 h-10 rounded-md"
                        />
                      ) : (
                        <FileIcon className="w-7 h-7 text-muted-foreground" />
                      )}
                      <p className="text-xs truncate">{attachment.name}</p>
                    </div>

                    <Button
                      type="button"
                      variant="ghost"
                      size="icon"
                      onClick={() => handleRemoveFile(index)}
                    >
                      <X className="w-4 h-4" />
                    </Button>
                  </div>
                ))}
              </div>
            ) : (
              <div
                className="
                  relative border-2 border-dashed rounded-lg
                  h-20 flex flex-col items-center justify-center
                  cursor-pointer hover:bg-muted transition
                "
                onClick={() => !isLoading && fileInputRef.current?.click()}
              >
                <Input
                  ref={fileInputRef}
                  type="file"
                  accept={ACCEPTED_FILES_STRING}
                  multiple
                  className="absolute inset-0 opacity-0 cursor-pointer"
                  onChange={handleFileChange}
                />

                <Upload className="w-5 h-5 mb-1 text-muted-foreground" />
                <p className="text-xs font-semibold text-blue-600">Click to upload</p>
                <p className="text-[10px] text-muted-foreground">JPG, PNG, PDF, DOC</p>
              </div>
            )}
          </div>

        </form>
      </div>

      {/* ⭐ Sticky Footer */}
      <div className="p-4 border-t">
        <Button
          className="w-full"
          type="submit"
          variant="medical"
          form="consultationForm"
          disabled={isLoading}
        >
          {isLoading ? (
            <>
              <Loader2 className="w-4 h-4 animate-spin mr-2" /> Submitting...
            </>
          ) : (
            "Submit Request"
          )}
        </Button>
      </div>

    </div>
  );
};

export default ConsultationForm;
