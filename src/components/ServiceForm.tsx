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

// ✅ UPDATED REUSABLE FILE INPUT COMPONENT FOR MULTIPLE FILES
const FileInput = ({
  id,
  label,
  files,
  onFileChange,
  required = false,
}: {
  id: string;
  label:string;
  files: File[];
  onFileChange: (files: File[]) => void;
  required?: boolean;
}) => {
  const inputRef = useRef<HTMLInputElement>(null);

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFiles = e.target.files ? Array.from(e.target.files) : [];
    if (selectedFiles.length === 0) return;
    
    // Append new files to the existing list
    onFileChange([...files, ...selectedFiles]);

    // Reset the input so the onChange event fires again for the same file
    if (inputRef.current) {
      inputRef.current.value = "";
    }
  };

  const handleRemoveFile = (indexToRemove: number) => {
    onFileChange(files.filter((_, index) => index !== indexToRemove));
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
        accept=".pdf,.jpg,.jpeg,.png,.doc,.docx"
        multiple // Allow multiple files to be selected
      />
      {/* UPLOAD AREA */}
      <div
        className="relative flex w-full flex-col items-center justify-center rounded-lg border-2 border-dashed border-gray-300 p-4 transition hover:border-gray-400 hover:bg-gray-50 cursor-pointer"
        onClick={() => inputRef.current?.click()}
      >
        <div className="text-center">
          <UploadCloud className="mx-auto h-8 w-8 text-gray-400" />
          <p className="mt-2 text-sm text-gray-600"><span className="font-semibold text-blue-600">Click to upload files</span></p>
          <p className="text-xs text-gray-500">You can select multiple documents</p>
        </div>
      </div>
      
      {/* FILES PREVIEW LIST */}
      {files.length > 0 && (
        <div className="mt-2 space-y-2">
          {files.map((file, index) => (
            <div key={index} className="flex items-center justify-between rounded-md border bg-muted/50 p-2">
              <div className="flex items-center gap-2 min-w-0">
                <FileIcon className="h-5 w-5 flex-shrink-0 text-muted-foreground" />
                <span className="text-sm font-medium truncate min-w-0">{file.name}</span>
              </div>
              <button
                type="button"
                onClick={() => handleRemoveFile(index)}
                className="flex h-6 w-6 items-center justify-center rounded-full bg-red-500 text-white shadow-sm transition hover:bg-red-600"
                aria-label={`Remove ${file.name}`}
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

  // ✅ 1. STATE IS UPDATED TO HOLD ARRAYS OF FILES
  const [medicalReports, setMedicalReports] = useState<File[]>([]);
  const [previousRecords, setPreviousRecords] = useState<File[]>([]);
  const [attendantPassport, setAttendantPassport] = useState<File[]>([]);
  const [patientPassport, setPatientPassport] = useState<File[]>([]);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!formRef.current) return;

    // ✅ 2. VALIDATION CHECKS THE ARRAY LENGTH
    if (serviceTitle?.includes("Treatment Planning") && medicalReports.length === 0) {
      toast.error('Please attach your medical reports to proceed.');
      return;
    }
    if (serviceTitle?.includes("Visa & Travel") && patientPassport.length === 0) {
      toast.error("Please attach the patient's passport to proceed.");
      return;
    }

    const formData = new FormData(formRef.current);
    
    // ✅ 3. ITERATE AND APPEND FILES FOR EACH CATEGORY
    medicalReports.forEach(file => formData.append('medicalReports[]', file));
    previousRecords.forEach(file => formData.append('previousRecords[]', file));
    patientPassport.forEach(file => formData.append('patientPassport[]', file));
    attendantPassport.forEach(file => formData.append('attendantPassport[]', file));

    if (serviceTitle) formData.append('serviceTitle', serviceTitle);

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

        <div className="flex flex-col gap-2 md:flex-row" >
          <Select name="countryCode"  defaultValue="IN-+91" required    >
            <SelectTrigger className="w-full md:w-[130px]">
              <SelectValue placeholder="Code" /></SelectTrigger>
            <SelectContent>
              {countryData.map((country) => (
                <SelectItem key={country.iso} value={`${country.iso}-+${country.code}`}>
                  {country.iso} (+{country.code})
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Input id="phone" name="phone" type="tel" placeholder="XXXXXXXXXX" required className="flex-1" />
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
        <FileInput id="medicalReports" label="Attach Medical Reports" required files={medicalReports} onFileChange={setMedicalReports} />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
        <div className="space-y-2">
          <Label htmlFor="hospitalName">Hospital Name</Label>
          <Input id="hospitalName" name="hospitalName" placeholder="Preferred hospital (optional)" />
        </div>
        <FileInput id="previousRecords" label="Attach Previous Treatment Records" files={previousRecords} onFileChange={setPreviousRecords} />
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
        <FileInput id="attendantPassport" label="Attach Attendant Passport" files={attendantPassport} onFileChange={setAttendantPassport} />
        <FileInput id="patientPassport" label="Attach Patient Passport" required files={patientPassport} onFileChange={setPatientPassport} />
      </div>
      <div className="space-y-2 mt-4">
        <FileInput id="medicalReports" label="Attach Medical Reports" files={medicalReports} onFileChange={setMedicalReports} />
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
    <Card className=" p-4 sm:p-8 shadow-card-medical bg-card border-4 border-medical rounded-2xl">
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