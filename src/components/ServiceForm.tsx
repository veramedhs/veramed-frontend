import React, { useState, useRef } from "react";
import { countryData } from "../lib/data/countries";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useServiceStore } from "@/store/serviceStore";
import { UploadCloud, File as FileIcon, X } from "lucide-react";
import toast, { Toaster } from "react-hot-toast";

interface ServiceFormProps {
  serviceTitle?: string;
}

const MAX_FILE_SIZE = 10 * 1024 * 1024;
const ALLOWED_TYPES = [
  "image/jpeg",
  "image/png",
  "application/pdf",
  "application/msword",
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
];

// ✅ FILE INPUT COMPONENT
const FileInput = ({
  id,
  label,
  files,
  onFileChange,
  required = false,
}: {
  id: string;
  label: string;
  files: File[];
  onFileChange: (files: File[]) => void;
  required?: boolean;
}) => {
  const inputRef = useRef<HTMLInputElement>(null);

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFiles = e.target.files ? Array.from(e.target.files) : [];
    if (!selectedFiles.length) return;

    const validFiles: File[] = [];

    for (const file of selectedFiles) {
      if (!ALLOWED_TYPES.includes(file.type)) {
        toast.error(
          `Invalid file: ${file.name}. Allowed types: JPG, PNG, PDF, DOC, DOCX`
        );
        continue;
      }
      if (file.size > MAX_FILE_SIZE) {
        toast.error(`File too large: ${file.name} (max 10MB)`);
        continue;
      }
      validFiles.push(file);
    }

    if (validFiles.length) onFileChange([...files, ...validFiles]);
    if (inputRef.current) inputRef.current.value = "";
  };

  const handleRemoveFile = (index: number) => {
    onFileChange(files.filter((_, i) => i !== index));
  };

  return (
    <div className="space-y-2">
      <Label htmlFor={id}>
        {label}
        {required && <span className="text-red-500 ml-1">*</span>}
      </Label>
      <input
        type="file"
        ref={inputRef}
        className="hidden"
        id={id}
        accept=".pdf,.jpg,.jpeg,.png,.doc,.docx"
        onChange={handleFileSelect}
        multiple
      />
      <div
        onClick={() => inputRef.current?.click()}
        className="flex flex-col items-center justify-center border-2 border-dashed border-gray-300 rounded-lg p-4 cursor-pointer hover:border-blue-400 hover:bg-blue-50 transition"
      >
        <UploadCloud className="w-8 h-8 text-blue-500" />
        <p className="text-sm font-medium mt-2">Click to upload or drag files</p>
        <p className="text-xs text-gray-500">JPG, PNG, PDF, DOC (max 10MB)</p>
      </div>

      {files.length > 0 && (
        <div className="mt-3 space-y-2">
          {files.map((file, i) => (
            <div
              key={i}
              className="flex items-center justify-between bg-gray-50 border border-gray-200 p-2 rounded-md"
            >
              <div className="flex items-center gap-2 truncate">
                <FileIcon className="h-5 w-5 text-gray-500" />
                <span className="text-sm truncate">{file.name}</span>
              </div>
              <button
                type="button"
                onClick={() => handleRemoveFile(i)}
                className="bg-red-500 hover:bg-red-600 text-white rounded-full h-6 w-6 flex items-center justify-center"
              >
                <X className="h-4 w-4" />
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

const ServiceForm: React.FC<ServiceFormProps> = ({ serviceTitle }) => {
  const { isLoading, error, submitForm } = useServiceStore();
  const formRef = useRef<HTMLFormElement>(null);

  const [medicalReports, setMedicalReports] = useState<File[]>([]);
  const [attendantPassport, setAttendantPassport] = useState<File[]>([]);
  const [patientPassport, setPatientPassport] = useState<File[]>([]);

  // ✅ Validation helpers
  const validateText = (text: string) => /^[A-Za-z\s.'-]+$/.test(text);
  const validatePhone = (text: string) => /^[0-9]{6,15}$/.test(text);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault(); // stop default reload

    const formData = new FormData(formRef.current!);
    const patientName = formData.get("patientName")?.toString().trim() || "";
    formData.append("email", "dumy@gmail.com");
    const phone = formData.get("phone")?.toString().trim() || "";

    if (!validateText(patientName)) {
      toast.error("Please enter a valid patient name (letters only)");
      return;
    }

    if (!validatePhone(phone)) {
      toast.error("Please enter a valid phone number (6–15 digits)");
      return;
    }

    if (serviceTitle?.includes("Treatment Planning") && medicalReports.length === 0) {
      toast.error("Please attach your medical reports to proceed.");
      return;
    }
    if (serviceTitle?.includes("Visa & Travel") && patientPassport.length === 0) {
      toast.error("Please attach the patient’s passport to proceed.");
      return;
    }

    medicalReports.forEach((f) => formData.append("medicalReports[]", f));
    attendantPassport.forEach((f) => formData.append("attendantPassport[]", f));
    patientPassport.forEach((f) => formData.append("patientPassport[]", f));

    if (serviceTitle) formData.append("serviceTitle", serviceTitle);

    const success = await submitForm(formData);

    if (success) {
      toast.success(" Your request has been submitted successfully!");
      // ⏳ Reload page after short delay to show toast
      setTimeout(() => {
        window.location.reload();
      }, 1500);
    }
  };

  // ✅ Reusable Fields
  const renderPatientDetailsFields = () => (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-4">
        <div>
          <Label htmlFor="patientName">Patient Name</Label>
          <Input
            id="patientName"
            name="patientName"
            placeholder="Enter patient name"
            pattern="[A-Za-z\s.'-]+"
            required
            onChange={(e) =>
              (e.target.value = e.target.value.replace(/[^A-Za-z\s.'-]/g, ""))
            }
          />
        </div>
      </div>

      <div>
        <Label htmlFor="phone">Mobile Number</Label>
        <div className="flex flex-col md:flex-row gap-2">
          <Select name="countryCode" defaultValue="IN-+91" required>
            <SelectTrigger className="md:w-[130px] w-full">
              <SelectValue placeholder="Code" />
            </SelectTrigger>
            <SelectContent>
              {countryData.map((c) => (
                <SelectItem key={c.iso} value={`${c.iso}-+${c.code}`}>
                  {c.iso} (+{c.code})
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Input
            id="phone"
            name="phone"
            type="tel"
            inputMode="numeric"
            pattern="[0-9]{6,15}"
            maxLength={15}
            placeholder="Enter mobile number"
            required
            className="flex-1"
            onChange={(e) => (e.target.value = e.target.value.replace(/\D/g, ""))}
          />
        </div>
      </div>
    </>
  );

  // ✅ Service-specific UI
  const renderServiceSpecificFields = () => {
    if (!serviceTitle) return renderPatientDetailsFields();

    if (serviceTitle.includes("Treatment Planning"))
      return (
        <div className="p-4 border rounded-xl bg-gradient-to-br from-blue-50 to-white">
          {renderPatientDetailsFields()}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
            <div>
              <Label htmlFor="medicalCondition">Medical Condition</Label>
              <Input
                id="medicalCondition"
                name="medicalCondition"
                placeholder="Describe your medical condition"
                onChange={(e) =>
                  (e.target.value = e.target.value.replace(/[^A-Za-z\s.'-]/g, ""))
                }
                required
              />
            </div>
            <FileInput
              id="medicalReports"
              label="Attach Medical Reports"
              required
              files={medicalReports}
              onFileChange={setMedicalReports}
            />
          </div>
        </div>
      );

    if (serviceTitle.includes("Visa & Travel"))
      return (
        <div className="p-4 border rounded-xl bg-gradient-to-br from-green-50 to-white">
          {renderPatientDetailsFields()}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
            <div>
              <Label htmlFor="attendantName">Attendant Name</Label>
              <Input
                id="attendantName"
                name="attendantName"
                placeholder="Enter attendant name"
                onChange={(e) =>
                  (e.target.value = e.target.value.replace(/[^A-Za-z\s.'-]/g, ""))
                }
              />
            </div>
            <div>
              <Label htmlFor="relation">Relation with Patient</Label>
              <Input
                id="relation"
                name="relation"
                placeholder="e.g., Spouse, Parent, Child"
                onChange={(e) =>
                  (e.target.value = e.target.value.replace(/[^A-Za-z\s.'-]/g, ""))
                }
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
            <FileInput
              id="attendantPassport"
              label="Attach Attendant Passport"
              files={attendantPassport}
              onFileChange={setAttendantPassport}
            />
            <FileInput
              id="patientPassport"
              label="Attach Patient Passport"
              required
              files={patientPassport}
              onFileChange={setPatientPassport}
            />
          </div>
        </div>
      );

    return renderPatientDetailsFields();
  };

  return (
    <Card className="p-6 sm:p-8 shadow-xl rounded-2xl border border-gray-200 bg-white">
      <Toaster position="top-center" />
      <form ref={formRef} onSubmit={handleSubmit} className="grid gap-6" noValidate>
        {renderServiceSpecificFields()}
        <div className="space-y-4">
          <div>
            <Label htmlFor="message">Additional Message</Label>
            <Textarea
              id="message"
              name="message"
              placeholder="Write your message or any additional information..."
              className="min-h-[120px] resize-none"
            />
          </div>
          <Button
            type="submit"
            size="lg"
            className="w-full bg-gradient-to-br from-blue-500 to-cyan-400 hover:bg-blue-700 text-white rounded-xl"
            disabled={isLoading}
          >
            {isLoading ? "Submitting..." : "Submit Request"}
          </Button>
          {error && <p className="text-red-500 text-sm">{error}</p>}
        </div>
      </form>
    </Card>
  );
};

export default ServiceForm;
