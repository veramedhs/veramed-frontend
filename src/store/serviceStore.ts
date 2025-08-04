import { create } from 'zustand';
import { apiClient } from '../lib/apiClient';
import toast from 'react-hot-toast';

interface ServiceFormState {
  isLoading: boolean;
  error: string | null;
  submitForm: (formData: FormData) => Promise<boolean>;
}

export const useServiceStore = create<ServiceFormState>((set) => ({
  isLoading: false,
  error: null,

  submitForm: async (formData) => {
    set({ isLoading: true, error: null });
    try {
      const response = await apiClient.post('/api/v1/veramed/services', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      console.log('Form submitted successfully:', response.data);
      toast.success('🎉 Service request submitted successfully!');
      set({ isLoading: false });
      return true;
    } catch (error: any) {
      console.error('Error submitting form:', error);
      const errMsg = error?.response?.data?.message || 'An error occurred while submitting the form.';
      toast.error(errMsg);
      set({ isLoading: false, error: errMsg });
      return false;
    }
  },
}));
