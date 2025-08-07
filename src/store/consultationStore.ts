import { create } from 'zustand';
import { apiClient } from '@/lib/apiClient'; // Adjust path if needed


interface ConsultationState {
  isLoading: boolean;
  isSuccess: boolean;
  error: string | null;
  submitConsultation: (data: FormData) => Promise<void>;
  reset: () => void;
}

/**
 * Zustand store for managing the state of the consultation form submission.
 */
export const useConsultationStore = create<ConsultationState>((set) => ({
  // 1. Initial State
  isLoading: false, 
  isSuccess: false,
  error: null,

  // 2. Action to handle the API submission
  submitConsultation: async (data: FormData) => {
    // Reset state and set loading to true for a new submission
    set({ isLoading: true, isSuccess: false, error: null });

    try {
      await apiClient.post('/api/v1/veramed/contact', data);

      // On successful API call, update the state
      set({ isLoading: false, isSuccess: true });

    } catch (err: any) {
      // On failure, extract a useful error message and update the state
      const errorMessage =
        err.response?.data?.message ||
        err.message ||
        "An unexpected error occurred. Please try again.";

      set({ isLoading: false, isSuccess: false, error: errorMessage });
      console.error("Consultation submission failed:", err);
    }
  },

  // 3. Action to reset the store to its initial values
  // This is called by the form component after a success or error has been handled.
  reset: () => {
    set({
      isLoading: false,
      isSuccess: false,
      error: null,
    });
  },
}));