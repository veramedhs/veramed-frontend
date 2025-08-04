import { create } from 'zustand';
import { apiClient } from '../lib/apiClient';

interface ServiceFormState {
  isLoading: boolean;
  error: string | null;
  submitForm: (formData: FormData) => Promise<void>;
}

export const useServiceStore = create<ServiceFormState>((set) => ({
  isLoading: false,
  error: null,
  submitForm: async (formData) => {
    set({ isLoading: true, error: null });
    try {
      const response = await apiClient.post('/service-request', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      set({ isLoading: false });
      // You can handle the success response here, e.g., show a success message
      console.log('Form submitted successfully:', response.data);
    } catch (error) {
      set({ isLoading: false, error: 'An error occurred while submitting the form.' });
      // You can handle the error here, e.g., show an error message
      console.error('Error submitting form:', error);
    }
  },
}));