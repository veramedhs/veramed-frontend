import { create } from 'zustand';

// --- Type Definitions for the Store ---

export interface Country {
  name: string;
  code: string;
  dial_code: string;
}

interface CountryState {
  countries: Country[];
  isLoading: boolean;
  error: string | null;
  fetchCountries: () => Promise<void>;
}

// --- Create the Zustand Store ---
const useCountryStore = create<CountryState>((set, get) => ({
  countries: [],
  isLoading: false,
  error: null,

  // Action to fetch countries from the public JSON file
  fetchCountries: async () => {
    // Prevent re-fetching if data already exists or is loading
    if (get().countries.length > 0 || get().isLoading) {
      return;
    }

    set({ isLoading: true, error: null });

    try {
      const response = await fetch('/countries.json'); // Fetches from the 'public' folder
      if (!response.ok) {
        throw new Error('Failed to fetch country data.');
      }
      const data: Country[] = await response.json();
      
      set({ countries: data, isLoading: false });

    } catch (err) {
      const errorMessage = (err instanceof Error) ? err.message : 'An unexpected error occurred.';
      set({ error: errorMessage, isLoading: false });
      console.error("Error fetching country codes:", errorMessage);
    }
  },
}));

export default useCountryStore;