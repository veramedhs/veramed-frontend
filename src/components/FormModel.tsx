// src/components/FormModal.tsx

import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Paperclip, Loader2, X } from 'lucide-react';
import { toast, Toaster } from 'react-hot-toast';
import { apiClient } from '@/lib/apiClient';

import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
  DialogClose,
} from '@/components/ui/dialog';

import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';

import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";

// ----------------- Zod Validation -----------------
const formSchema = z.object({
  name: z.string().min(2),
  email: z.string().email(),
  phone: z.string().min(5),
  message: z.string().min(10).max(500),
  attachment: z.instanceof(FileList).optional(),
});

type FormValues = z.infer<typeof formSchema>;

interface FormModalProps {
  triggerElement: React.ReactNode;
  title: string;
  description: string;
  namePlaceholder: string;
}

export const FormModal: React.FC<FormModalProps> = ({
  triggerElement,
  title,
  description,
  namePlaceholder,
}) => {

  const [isOpen, setIsOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [fileNames, setFileNames] = useState<string[]>([]);
  const [countryCode, setCountryCode] = useState("+91");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [nameInput, setNameInput] = useState("");

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
      email: '',
      phone: '',
      message: '',
    },
  });

  const { register, handleSubmit, formState: { errors }, reset, setValue, watch } = form;

  const watchedFiles = watch("attachment");

  React.useEffect(() => {
    if (watchedFiles?.length > 0) {
      setFileNames([...watchedFiles].map((f) => f.name));
    } else {
      setFileNames([]);
    }
  }, [watchedFiles]);

  // ----------------------- PHONE -----------------------
  const handlePhoneChange = (value: string, country: any) => {
    const dial = `+${country.dialCode}`;
    setCountryCode(dial);

    const numberOnly = value.replace(country.dialCode, "");
    setPhoneNumber(numberOnly);

    setValue("phone", numberOnly, { shouldValidate: true });
  };

  // ----------------------- NAME VALIDATION -----------------------
  const handleNameChange = (e: any) => {
    const value = e.target.value;
    if (/^[A-Za-z\s]*$/.test(value)) {
      setNameInput(value);
      setValue("name", value, { shouldValidate: true });
    }
  };

  // ----------------------- REMOVE FILE -----------------------
  const handleRemoveFile = (index: number) => {
    const newFiles = [...(watchedFiles || [])].filter((_, i) => i !== index);

    const dt = new DataTransfer();
    newFiles.forEach((f) => dt.items.add(f));

    setValue("attachment", dt.files);
  };

  // ----------------------- SUBMIT FORM -----------------------
  const onSubmit = async (data: FormValues) => {
    if (!phoneNumber.trim()) return toast.error("Please enter phone number.");

    setIsSubmitting(true);

    const formData = new FormData();
    formData.append("fullName", data.name);
    formData.append("email", data.email);
    formData.append("phone", `${countryCode}${phoneNumber}`);
    formData.append("message", data.message);

    if (data.attachment) {
      [...data.attachment].forEach((file) =>
        formData.append("attachments[]", file)
      );
    }

    toast.loading("Submitting...");

    try {
      await apiClient.post('/api/v1/veramed/collaborate', formData);
      toast.dismiss();
      toast.success("Inquiry submitted successfully!");

      reset();
      setPhoneNumber("");
      setFileNames([]);
      setCountryCode("+91");
      setNameInput("");
      setIsOpen(false);

    } catch (err) {
      toast.dismiss();
      toast.error("Submission failed!");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <Toaster position="top-center" />

      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogTrigger asChild>{triggerElement}</DialogTrigger>

        {/* ⭐ Modal with scrollable content (same as ReviewModal) */}
        <DialogContent
          className="
            sm:max-w-lg
            w-[96%]
            p-0
            rounded-xl
            bg-card
            shadow-lg
            max-h-[85vh]
            flex flex-col
            overflow-hidden
          "
        >
          {/* ⭐ Scrollable Body Wrapper */}
          <div className="flex-1 overflow-y-auto p-4 sm:p-6">

            <DialogHeader className="mb-3">
              <DialogTitle className="text-xl sm:text-2xl font-bold text-primary">
                {title}
              </DialogTitle>
              <DialogDescription className="text-sm sm:text-base">
                {description}
              </DialogDescription>
            </DialogHeader>

            {/* ---------------- FORM ---------------- */}
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">

              {/* NAME */}
              <div className="space-y-1">
                <Label>Full Name</Label>
                <Input
                  {...register("name")}
                  value={nameInput}
                  onChange={handleNameChange}
                  placeholder={namePlaceholder}
                />
                {errors.name && (
                  <p className="text-red-600 text-xs">Enter valid name</p>
                )}
              </div>

              {/* EMAIL */}
              <div className="space-y-1">
                <Label>Email</Label>
                <Input {...register("email")} placeholder="you@example.com" />
                {errors.email && <p className="text-red-600 text-xs">Invalid email</p>}
              </div>

              {/* PHONE */}
              <div className="space-y-1">
                <Label>Phone Number</Label>

                <PhoneInput
                  country={"in"}
                  value={countryCode + phoneNumber}
                  onChange={handlePhoneChange}
                  inputProps={{ required: true }}
                  containerClass="w-full"
                  inputClass="
                    !w-full 
                    !py-3 
                    !text-sm 
                    !border 
                    !border-gray-300 
                    !rounded-lg
                  "
                />
              </div>

              {/* MESSAGE */}
              <div className="space-y-1">
                <Label>Your Message</Label>
                <Textarea rows={3} {...register("message")} />
                {errors.message && (
                  <p className="text-red-600 text-xs">Message too short</p>
                )}
              </div>

              {/* ATTACHMENTS */}
              <div className="space-y-1">
                <Label>Attach Files</Label>

                <Label
                  htmlFor="attachment"
                  className="p-2 border-2 border-dashed rounded-md cursor-pointer hover:bg-primary/10 flex items-center gap-2"
                >
                  <Paperclip className="w-4" /> Upload documents
                </Label>

                <Input
                  id="attachment"
                  type="file"
                  className="hidden"
                  multiple
                  {...register("attachment")}
                />

                {fileNames.length > 0 && (
                  <div className="space-y-1 mt-2">
                    {fileNames.map((name, idx) => (
                      <div
                        key={idx}
                        className="flex justify-between bg-muted p-2 rounded-md"
                      >
                        <span className="text-sm truncate">{name}</span>

                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => handleRemoveFile(idx)}
                        >
                          <X className="w-4" />
                        </Button>
                      </div>
                    ))}
                  </div>
                )}
              </div>

            </form>
          </div>

          {/* ⭐ Sticky Footer */}
          <DialogFooter className="p-4 border-t">
            <DialogClose asChild>
              <Button variant="outline" type="button">
                Cancel
              </Button>
            </DialogClose>

            <Button type="submit" variant="medical" disabled={isSubmitting}>
              {isSubmitting ? <Loader2 className="animate-spin" /> : "Submit Inquiry"}
            </Button>
          </DialogFooter>

        </DialogContent>
      </Dialog>
    </>
  );
};
