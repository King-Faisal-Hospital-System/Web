import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit';
import api from '../../lib/api';

interface LanguageState {
  currentLanguage: string;
  availableLanguages: string[];
  loading: boolean;
}

const initialState: LanguageState = {
  currentLanguage: 'English',
  availableLanguages: ['English', 'Kinyarwanda', 'Spanish', 'French'],
  loading: false
};

// Async thunk to get user language from backend
export const fetchUserLanguage = createAsyncThunk(
  'language/fetchUserLanguage',
  async (_, { rejectWithValue }) => {
    try {
      const response = await api.get('/settings');
      return response.data.settings.preferences.language || 'English';
    } catch (error: any) {
      // Fallback to localStorage if API fails
      if (typeof window !== 'undefined') {
        const savedLanguage = localStorage.getItem('kfh_language');
        return savedLanguage || 'English';
      }
      return 'English';
    }
  }
);

const languageSlice = createSlice({
  name: 'language',
  initialState,
  reducers: {
    setLanguage: (state, action: PayloadAction<string>) => {
      if (state.availableLanguages.includes(action.payload)) {
        state.currentLanguage = action.payload;
        // Save to localStorage as backup
        if (typeof window !== 'undefined') {
          localStorage.setItem('kfh_language', action.payload);
        }
      }
    },
    initializeLanguage: (state) => {
      // Fallback to localStorage for immediate initialization
      if (typeof window !== 'undefined') {
        const savedLanguage = localStorage.getItem('kfh_language');
        if (savedLanguage && state.availableLanguages.includes(savedLanguage)) {
          state.currentLanguage = savedLanguage;
        }
      }
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUserLanguage.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchUserLanguage.fulfilled, (state, action) => {
        state.loading = false;
        if (state.availableLanguages.includes(action.payload)) {
          state.currentLanguage = action.payload;
          // Sync with localStorage
          if (typeof window !== 'undefined') {
            localStorage.setItem('kfh_language', action.payload);
          }
        }
      })
      .addCase(fetchUserLanguage.rejected, (state) => {
        state.loading = false;
        // Keep current language on error
      });
  }
});

export const { setLanguage, initializeLanguage } = languageSlice.actions;
export default languageSlice.reducer;
