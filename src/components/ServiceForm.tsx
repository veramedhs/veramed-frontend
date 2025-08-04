import React from 'react';
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

interface ServiceFormProps {
  serviceTitle?: string;
}

const ServiceForm: React.FC<ServiceFormProps> = ({ serviceTitle }) => {
  const { isLoading, error, submitForm } = useServiceStore();

  const fileInputClass =
    "file:bg-blue-100 hover:file:bg-blue-200 file:text-black file:rounded-md file:border-0 file:px-4 file:py-2 file:cursor-pointer";

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    await submitForm(formData);
  };

  const renderPatientDetailsFields = () => (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-4">
        <div className="space-y-2">
          <Label htmlFor="patientName" className="font-medium">
            Patient Name<span className="text-red-500 ml-1">*</span>
          </Label>
          <Input id="patientName" name="patientName" placeholder="Enter patient name" required />
        </div>
        <div className="space-y-2">
          <Label htmlFor="mobileNumber" className="font-medium">
            Mobile Number<span className="text-red-500 ml-1">*</span>
          </Label>
          <Input id="mobileNumber" name="mobileNumber" placeholder="Enter mobile number" required />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <Label htmlFor="country" className="font-medium">
            Country<span className="text-red-500 ml-1">*</span>
          </Label>
          <Select name="country" required>
            <SelectTrigger>
              <SelectValue placeholder="Select your country" />
            </SelectTrigger>
            <SelectContent>
              {countryData.map((country) => (
                <SelectItem key={country.iso} value={country.country}>
                  {country.country}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div className="space-y-2">
          <Label htmlFor="email" className="font-medium">Email ID</Label>
          <Input id="email" name="email" type="email" placeholder="Enter email address" required />
        </div>
      </div>
    </>
  );

  const renderTreatmentPlanningFields = () => (
    <div className="col-span-2 rounded-2xl p-4 border-1 border-primary">
      {renderPatientDetailsFields()}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <Label htmlFor="medicalCondition" className="font-medium">Medical Condition</Label>
          <Input id="medicalCondition" name="medicalCondition" placeholder="Describe your medical condition" required />
        </div>
        <div className="space-y-2">
          <Label htmlFor="medicalReports" className="font-medium">Attach Medical Reports</Label>
          <Input id="medicalReports" name="medicalReports" type="file" accept=".pdf,.jpg,.jpeg,.png" multiple className={fileInputClass} required />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
        <div className="space-y-2">
          <Label htmlFor="hospitalName" className="font-medium">Hospital Name</Label>
          <Input id="hospitalName" name="hospitalName" placeholder="Preferred hospital (optional)" />
        </div>
        <div className="space-y-2">
          <Label htmlFor="previousRecords" className="font-medium">Attach Previous Treatment Records</Label>
          <Input id="previousRecords" name="previousRecords" type="file" accept=".pdf,.jpg,.jpeg,.png" multiple className={fileInputClass} />
        </div>
      </div>
    </div>
  );

  const renderVisaTravelFields = () => (
    <div className="col-span-2 rounded-2xl p-4">
      {renderPatientDetailsFields()}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <Label htmlFor="attendantName" className="font-medium">Attendant Name</Label>
          <Input id="attendantName" name="attendantName" placeholder="Enter attendant name" />
        </div>
        <div className="space-y-2">
          <Label htmlFor="relation" className="font-medium">Relation with Patient</Label>
          <Input id="relation" name="relation" placeholder="e.g., Spouse, Parent, Child" />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
        <div className="space-y-2">
          <Label htmlFor="passportNumber" className="font-medium">
            Passport Number<span className="text-red-500 ml-1">*</span>
          </Label>
          <Input id="passportNumber" name="passportNumber" placeholder="Enter passport number" required />
        </div>
        <div className="space-y-2">
          <Label htmlFor="travelDates" className="font-medium">Travel Dates</Label>
          <Input id="travelDates" name="travelDates" placeholder="Expected travel period" required />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
        <div className="space-y-2">
          <Label htmlFor="dateOfBirth" className="font-medium">Date of Birth</Label>
          <Input id="dateOfBirth" name="dateOfBirth" type="date" required />
        </div>
        <div className="space-y-2">
          <Label htmlFor="travelers" className="font-medium">Number of Travelers</Label>
          <Input id="travelers" name="travelers" type="number" placeholder="Number of people traveling" required />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
        <div className="space-y-2">
          <Label htmlFor="attendantPassport" className="font-medium">Attach Attendant Passport</Label>
          <Input id="attendantPassport" name="attendantPassport" type="file" accept=".pdf,.jpg,.jpeg,.png" className={fileInputClass} />
        </div>
        <div className="space-y-2">
          <Label htmlFor="patientPassport" className="font-medium">
            Attach Patient Passport<span className="text-red-500 ml-1">*</span>
          </Label>
          <Input id="patientPassport" name="patientPassport" type="file" accept=".pdf,.jpg,.jpeg,.png" required className={fileInputClass} />
        </div>
      </div>

      <div className="space-y-2 mt-4">
        <Label htmlFor="medicalReports" className="font-medium">Attach Medical Reports</Label>
        <Input id="medicalReports" name="medicalReports" type="file" accept=".pdf,.jpg,.jpeg,.png" multiple className={fileInputClass} />
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
      <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6 rounded-2xl p-4">
        {renderServiceSpecificFields()}
        <div className="md:col-span-2 space-y-2">
          <Label htmlFor="message" className="font-medium">Additional Message</Label>
          <Textarea
            id="message"
            name="message"
            placeholder="Write your message or any additional information..."
            className="min-h-[120px] resize-none"
          />
        </div>
        <div className="md:col-span-2">
          <Button type="submit" variant="medical" size="lg" className="w-full" disabled={isLoading}>
            {isLoading ? 'Submitting...' : 'Submit Request'}
          </Button>
          {error && <p className="text-red-500 mt-2">{error}</p>}
        </div>
      </form>
    </Card>
  );
};

export default ServiceForm;