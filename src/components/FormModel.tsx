import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Paperclip, Loader2 } from 'lucide-react';
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

// Form validation schema
const formSchema = z.object({
  name: z.string().min(2, { message: 'Name must be at least 2 characters.' }),
  email: z.string().email({ message: 'Please enter a valid email address.' }),
  countryCode: z.string().min(1, { message: 'Please select a country code.' }),
  phone: z.string().min(8, { message: 'Please enter a valid phone number.' }),
  message: z.string().min(10, { message: 'Message must be at least 10 characters.' }).max(500),
  attachment: z.any().optional(),
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
  const [fileName, setFileName] = useState('');

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

  const { register, handleSubmit, formState: { errors }, reset, watch } = form;

  // Watch for changes in the file input
  const fileInput = watch('attachment');
  React.useEffect(() => {
    if (fileInput && fileInput.length > 0) {
      setFileName(fileInput[0].name);
    } else {
      setFileName('');
    }
  }, [fileInput]);

  const onSubmit = async (data: FormValues) => {
    setIsSubmitting(true);

    const formData = new FormData();
    formData.append('fullName', data.name);
    formData.append('email', data.email);
    formData.append('phone', `${data.countryCode}${data.phone}`);
    formData.append('message', data.message);

    if (data.attachment && data.attachment.length > 0) {
      formData.append('attachment', data.attachment[0]);
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
      setFileName('');
    } catch (error) {
      console.error('Submission failed:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      {/* Ensure Toaster is included in your app's layout, once */}
      <Toaster position="top-center" reverseOrder={false} />
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogTrigger asChild>{triggerElement}</DialogTrigger>
        <DialogContent className="sm:max-w-lg bg-card text-foreground">
          <DialogHeader>
            <DialogTitle className="text-2xl font-bold text-primary">{title}</DialogTitle>
            <DialogDescription className="text-muted-foreground">{description}</DialogDescription>
          </DialogHeader>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            {/* ... (rest of your form fields are the same) */}
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

            {/* Phone Field - UPDATED */}
            <div className="space-y-2">
              <Label htmlFor="phone">Phone Number</Label>
              <div className="flex items-center gap-2">
                <Select
                  defaultValue="+91"
                  onValueChange={(value) => form.setValue('countryCode', value)}
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
                <Input id="phone" type="tel" placeholder="Enter Your Mobile Number" {...register('phone')} className="flex-1" />
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

            {/* Attachment Field */}
            <div className="space-y-2">
              <Label htmlFor="attachment">Attach a File (Optional)</Label>
              <Label
                htmlFor="attachment-input"
                className="flex items-center gap-2 p-2 border-2 border-dashed rounded-md cursor-pointer hover:border-primary hover:bg-primary/10 transition-colors"
              >
                <Paperclip className="w-4 h-4 text-muted-foreground" />
                <span className="text-sm text-muted-foreground">
                  {fileName || 'Click to upload a document'}
                </span>
              </Label>
              <Input id="attachment-input" type="file" {...register('attachment')} className="hidden" />
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