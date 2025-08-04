import React, { useState, useRef } from 'react';
import { countryData } from '../lib/data/countries';
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
  SelectValue
} from "@/components/ui/select";
import { useServiceStore } from '@/store/serviceStore';
import { UploadCloud, File as FileIcon, X } from 'lucide-react';
import toast, { Toaster } from 'react-hot-toast';

interface ServiceFormProps {
  serviceTitle?: string;
}

// ✅ A REUSABLE, ROBUST FILE INPUT COMPONENT
// It works directly with File objects, making it clean and reliable.
const FileInput = ({
  id,
  label,
  file,
  onFileChange,
  required = false,
}: {
  id: string;
  label: string;
  file: File | null;
  onFileChange: (file: File | null) => void;
  required?: boolean;
}) => {
  const inputRef = useRef<HTMLInputElement>(null);

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0] || null;
    // You can add validation here if needed (size, type, etc.)
    onFileChange(selectedFile);
  };

  const handleRemoveFile = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    onFileChange(null);
    if (inputRef.current) {
      inputRef.current.value = ""; // Reset the input field
    }
  };

  return (
    <div className="space-y-2">
      <Label htmlFor={id} className="font-medium">
        {label}
        {required && <span className="text-red-500 ml-1">*</span>}
      </Label>
      <input
        type="file"
        id={id}
        name={id}
        ref={inputRef}
        className="hidden"
        onChange={handleFileSelect}
        accept=".pdf,.jpg,.jpeg,.png"
      />
      <div
        className="relative flex w-full flex-col items-center justify-center rounded-lg border-2 border-dashed border-gray-300 p-4 transition hover:border-gray-400 hover:bg-gray-50 cursor-pointer"
        onClick={() => inputRef.current?.click()}
      >
        {!file ? (
          <div className="text-center">
            <UploadCloud className="mx-auto h-8 w-8 text-gray-400" />
            <p className="mt-2 text-sm text-gray-600"><span className="font-semibold text-blue-600">Click to upload</span></p>
            <p className="text-xs text-gray-500">PDF, JPG, PNG etc.</p>
          </div>
        ) : (
          <div className="text-center">
            <FileIcon className="mx-auto h-8 w-8 text-blue-500" />
            <div className="mt-2 text-sm font-medium text-gray-700 break-all px-4">{file.name}</div>
            <p className="text-xs text-muted-foreground">{(file.size / 1024).toFixed(2)} KB</p>
            <button
              type="button"
              onClick={handleRemoveFile}
              className="absolute -top-2 -right-2 flex h-6 w-6 items-center justify-center rounded-full bg-red-500 text-white shadow-md transition hover:bg-red-600"
              aria-label="Remove file"
            >
              <X className="h-4 w-4" />
            </button>
          </div>
        )}
      </div>
    </div>
  );
};


const ServiceForm: React.FC<ServiceFormProps> = ({ serviceTitle }) => {
  const { isLoading, error, submitForm } = useServiceStore();
  const formRef = useRef<HTMLFormElement>(null);

  // ✅ 1. THE STATE IS THE SOURCE OF TRUTH: We store the entire File object.
  const [medicalReports, setMedicalReports] = useState<File | null>(null);
  const [previousRecords, setPreviousRecords] = useState<File | null>(null);
  const [attendantPassport, setAttendantPassport] = useState<File | null>(null);
  const [patientPassport, setPatientPassport] = useState<File | null>(null);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!formRef.current) return;

    // Validation using the state, which is the single source of truth.
    if (serviceTitle?.includes("Treatment Planning") && !medicalReports) {
      toast.error('Please attach your medical reports to proceed.');
      return;
    }
    if (serviceTitle?.includes("Visa & Travel") && !patientPassport) {
      toast.error("Please attach the patient's passport to proceed.");
      return;
    }

    // ✅ 2. THE GOLDEN RULE: Build FormData manually.
    const formData = new FormData();
    const form = formRef.current;

    // Append all text fields. This is safe even if some are not rendered.
    if (form.patientName) formData.append('patientName', form.patientName.value);
    if (form.email) formData.append('email', form.email.value);
    if (form.countryCode) formData.append('countryCode', form.countryCode.value);
    if (form.phone) formData.append('phone', form.phone.value);
    if (form.message) formData.append('message', form.message.value);
    if (form.medicalCondition) formData.append('medicalCondition', form.medicalCondition.value);
    if (form.hospitalName) formData.append('hospitalName', form.hospitalName.value);
    if (form.attendantName) formData.append('attendantName', form.attendantName.value);
    if (form.relation) formData.append('relation', form.relation.value);

    // ✅ 3. CONDITIONAL APPENDING: Only add files if they exist in the state.
    if (medicalReports) formData.append('medicalReports', medicalReports);
    if (previousRecords) formData.append('previousRecords', previousRecords);
    if (patientPassport) formData.append('patientPassport', patientPassport);
    if (attendantPassport) formData.append('attendantPassport', attendantPassport);

    // Append the serviceTitle prop
    if (serviceTitle) formData.append('serviceTitle', serviceTitle);

    // This log will now be accurate and clean.
    console.log('Final FormData contents to be submitted:');
    for (const pair of formData.entries()) {
      if (pair[1] instanceof File) {
        console.log(`${pair[0]}: [File] name=${pair[1].name}, size=${pair[1].size} bytes`);
      } else {
        console.log(`${pair[0]}: ${pair[1]}`);
      }
    }

    await submitForm(formData);
  };

  const renderPatientDetailsFields = () => (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-4">
        <div className="space-y-2">
          <Label htmlFor="patientName">Patient Name</Label>
          <Input id="patientName" name="patientName" placeholder="Enter patient name" required />
        </div>
        <div className="space-y-2">
          <Label htmlFor="email">Email ID</Label>
          <Input id="email" name="email" type="email" placeholder="Enter email address" required />
        </div>
      </div>
      <div className="space-y-2">
        <Label htmlFor="phone">Mobile Number</Label>
        <div className="flex flex-col gap-2 md:flex-row">
          <Select name="countryCode" defaultValue="IN-+91" required>
            <SelectTrigger className="w-full md:w-[130px]"><SelectValue placeholder="Code" /></SelectTrigger>
            <SelectContent>
              {countryData.map((country) => (
                <SelectItem key={country.iso} value={`${country.iso}-${country.code}`}>{country.iso} (+{country.code})</SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Input id="phone" name="phone" type="tel" placeholder="98765 43210" required className="flex-1" />
        </div>
      </div>
    </>
  );

  const renderTreatmentPlanningFields = () => (
    <div className="col-span-2 rounded-2xl p-4 border-1 border-primary">
      {renderPatientDetailsFields()}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
        <div className="space-y-2">
          <Label htmlFor="medicalCondition">Medical Condition</Label>
          <Input id="medicalCondition" name="medicalCondition" placeholder="Describe your medical condition" required />
        </div>
        <FileInput id="medicalReports" label="Attach Medical Reports" required file={medicalReports} onFileChange={setMedicalReports} />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
        <div className="space-y-2">
          <Label htmlFor="hospitalName">Hospital Name</Label>
          <Input id="hospitalName" name="hospitalName" placeholder="Preferred hospital (optional)" />
        </div>
        <FileInput id="previousRecords" label="Attach Previous Treatment Records" file={previousRecords} onFileChange={setPreviousRecords} />
      </div>
    </div>
  );

  const renderVisaTravelFields = () => (
    <div className="col-span-2 rounded-2xl p-4">
      {renderPatientDetailsFields()}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
        <div className="space-y-2">
          <Label htmlFor="attendantName">Attendant Name</Label>
          <Input id="attendantName" name="attendantName" placeholder="Enter attendant name" />
        </div>
        <div className="space-y-2">
          <Label htmlFor="relation">Relation with Patient</Label>
          <Input id="relation" name="relation" placeholder="e.g., Spouse, Parent, Child" />
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
        <FileInput id="attendantPassport" label="Attach Attendant Passport" file={attendantPassport} onFileChange={setAttendantPassport} />
        <FileInput id="patientPassport" label="Attach Patient Passport" required file={patientPassport} onFileChange={setPatientPassport} />
      </div>
      <div className="space-y-2 mt-4">
        <FileInput id="medicalReports" label="Attach Medical Reports" file={medicalReports} onFileChange={setMedicalReports} />
      </div>
    </div>
  );

  const renderServiceSpecificFields = () => {
    if (!serviceTitle) return renderPatientDetailsFields();
    if (serviceTitle.includes("Treatment Planning")) return renderTreatmentPlanningFields();
    if (serviceTitle.includes("Visa & Travel")) return renderVisaTravelFields();
    return renderPatientDetailsFields();
  };

  return (
    <Card className="p-8 shadow-card-medical bg-card border-4 border-medical rounded-2xl">
      <Toaster position="top-center" reverseOrder={false} />
      <form ref={formRef} onSubmit={handleSubmit} className="grid grid-cols-1 gap-6 rounded-2xl p-0 sm:p-4" noValidate>
        {renderServiceSpecificFields()}
        <div className="col-span-1 space-y-4">
          <div className="space-y-2">
            <Label htmlFor="message">Additional Message</Label>
            <Textarea id="message" name="message" placeholder="Write your message or any additional information..." className="min-h-[120px] resize-none" />
          </div>
          <div>
            <Button type="submit" variant="medical" size="lg" className="w-full" disabled={isLoading}>
              {isLoading ? 'Submitting...' : 'Submit Request'}
            </Button>
            {error && <p className="text-red-500 mt-2">{error}</p>}
          </div>
        </div>
      </form>
    </Card>
  );
};

export default ServiceForm;