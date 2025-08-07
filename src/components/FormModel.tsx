import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Paperclip, Loader2, X } from 'lucide-react';
import { toast, Toaster } from 'react-hot-toast';

// Import your UI components
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

// Import country data
import { countryData } from '@/lib/data/countries';
import { apiClient } from '@/lib/apiClient';

// Form validation schema - UPDATED for multiple files
const formSchema = z.object({
  name: z.string().min(2, { message: 'Name must be at least 2 characters.' }),
  email: z.string().email({ message: 'Please enter a valid email address.' }),
  countryCode: z.string().min(1, { message: 'Please select a country code.' }),
  phone: z.string().min(8, { message: 'Please enter a valid phone number.' }),
  message: z.string().min(10, { message: 'Message must be at least 10 characters.' }).max(500),
  attachment: z.instanceof(FileList).optional(),
});

type FormValues = z.infer<typeof formSchema>;

// Component props
interface FormModalProps {
  triggerElement: React.ReactNode;
  title: string;
  description: string;
  namePlaceholder: string;
}

export const FormModal: React.FC<FormModalProps> = ({ triggerElement, title, description, namePlaceholder }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [fileNames, setFileNames] = useState<string[]>([]);

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
      email: '',
      countryCode: '+91', // Default to India
      phone: '',
      message: '',
    },
  });

  const { register, handleSubmit, formState: { errors }, reset, watch, setValue } = form;

  // Watch for changes in the file input
  const fileInput = watch('attachment');
  React.useEffect(() => {
    if (fileInput && fileInput.length > 0) {
      const names = Array.from(fileInput).map(file => file.name);
      setFileNames(names);
    } else {
      setFileNames([]);
    }
  }, [fileInput]);

  const handleRemoveFile = (indexToRemove: number) => {
    const currentFiles = Array.from(watch('attachment') || []);
    const updatedFiles = currentFiles.filter((_, index) => index !== indexToRemove);

    // Create a new FileList and update the form value
    const dataTransfer = new DataTransfer();
    updatedFiles.forEach(file => dataTransfer.items.add(file));
    setValue('attachment', dataTransfer.files, { shouldValidate: true });
  };


  const onSubmit = async (data: FormValues) => {
    setIsSubmitting(true);

    const formData = new FormData();
    formData.append('fullName', data.name);
    formData.append('email', data.email);
    formData.append('phone', `${data.countryCode}${data.phone}`);
    formData.append('message', data.message);

    // Append all files to the form data
    if (data.attachment && data.attachment.length > 0) {
      Array.from(data.attachment).forEach(file => {
        // Use 'attachments[]' to indicate an array of files
        formData.append('attachments[]', file);
      });
    }

    const submissionPromise = apiClient.post('/api/v1/veramed/collaborate', formData);

    toast.promise(submissionPromise, {
      loading: 'Submitting your inquiry...',
      success: 'Your inquiry has been submitted successfully!',
      error: 'There was an error submitting your inquiry.',
    });

    try {
      await submissionPromise;
      setIsOpen(false);
      reset();
      setFileNames([]);
    } catch (error) {
      console.error('Submission failed:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <Toaster position="top-center" reverseOrder={false} />
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogTrigger asChild>{triggerElement}</DialogTrigger>
        <DialogContent className="sm:max-w-lg bg-card text-foreground">
          <DialogHeader>
            <DialogTitle className="text-2xl font-bold text-primary">{title}</DialogTitle>
            <DialogDescription className="text-muted-foreground">{description}</DialogDescription>
          </DialogHeader>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div className="grid grid-cols-1 gap-4">
              {/* Name Field */}
              <div className="space-y-2">
                <Label htmlFor="name">{namePlaceholder}</Label>
                <Input id="name" placeholder={namePlaceholder} {...register('name')} />
                {errors.name && <p className="text-sm text-red-500">{errors.name.message}</p>}
              </div>

              {/* Email Field */}
              <div className="space-y-2">
                <Label htmlFor="email">Email Address</Label>
                <Input id="email" type="email" placeholder="you@example.com" {...register('email')} />
                {errors.email && <p className="text-sm text-red-500">{errors.email.message}</p>}
              </div>

              {/* Phone Field */}
              <div className="space-y-2">
                <Label htmlFor="phone">Phone Number</Label>
                <div className="flex items-center gap-2">
                  <Select
                    defaultValue="+91"
                    onValueChange={(value) => setValue('countryCode', value)}
                  >
                    <SelectTrigger className="w-[130px]">
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
                  <Input id="phone" type="tel" placeholder="XXXXXXXXXX" {...register('phone')} className="flex-1" />
                </div>
                {errors.countryCode && <p className="text-sm text-red-500">{errors.countryCode.message}</p>}
                {errors.phone && <p className="text-sm text-red-500">{errors.phone.message}</p>}
              </div>

              {/* Message Field */}
              <div className="space-y-2">
                <Label htmlFor="message">Your Message</Label>
                <Textarea id="message" placeholder="Please describe your needs..." {...register('message')} rows={4} />
                {errors.message && <p className="text-sm text-red-500">{errors.message.message}</p>}
              </div>

              {/* Attachment Field - UPDATED */}
              <div className="space-y-2">
                <Label htmlFor="attachment-input">Attach Files (Optional)</Label>
                {/* File Upload Trigger */}
                <Label
                  htmlFor="attachment-input"
                  className="flex items-center gap-2 p-2 border-2 border-dashed rounded-md cursor-pointer hover:border-primary hover:bg-primary/10 transition-colors"
                >
                  <Paperclip className="w-4 h-4 text-muted-foreground" />
                  <span className="text-sm text-muted-foreground">
                    Click to upload documents
                  </span>
                </Label>
                <Input id="attachment-input" type="file" {...register('attachment')} className="hidden" multiple />

                {/* Display Selected Files */}
                {fileNames.length > 0 && (
                  <div className="space-y-2 mt-2">
                    <p className="text-sm font-medium">Selected files:</p>
                    {fileNames.map((name, index) => (
                      <div key={index} className="flex items-center justify-between p-2 text-sm border rounded-md bg-muted/50">
                        <span className="truncate">{name}</span>
                        <Button
                          type="button"
                          variant="ghost"
                          size="icon"
                          className="w-6 h-6"
                          onClick={() => handleRemoveFile(index)}
                        >
                          <X className="w-4 h-4" />
                        </Button>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>

            <DialogFooter className="pt-4">
              <DialogClose asChild>
                <Button type="button" variant="outline">
                  Cancel
                </Button>
              </DialogClose>
              <Button type="submit" variant="medical" disabled={isSubmitting}>
                {isSubmitting ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Submitting...
                  </>
                ) : (
                  'Submit Inquiry'
                )}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </>
  );
};