import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface LanguageState {
  currentLanguage: string;
  availableLanguages: string[];
}

const initialState: LanguageState = {
  currentLanguage: 'English',
  availableLanguages: ['English', 'Kinyarwanda', 'Spanish', 'French']
};

const languageSlice = createSlice({
  name: 'language',
  initialState,
  reducers: {
    setLanguage: (state, action: PayloadAction<string>) => {
      if (state.availableLanguages.includes(action.payload)) {
        state.currentLanguage = action.payload;
       
        if (typeof window !== 'undefined') {
          localStorage.setItem('kfh_language', action.payload);
        }
      }
    },
    initializeLanguage: (state) => {
      
      if (typeof window !== 'undefined') {
        const savedLanguage = localStorage.getItem('kfh_language');
        if (savedLanguage && state.availableLanguages.includes(savedLanguage)) {
          state.currentLanguage = savedLanguage;
        }
      }
    }
  }
});

export const { setLanguage, initializeLanguage } = languageSlice.actions;
export default languageSlice.reducer;
