import { createSlice } from '@reduxjs/toolkit';

const getInitialLanguage = (): string => {
  const storedLanguage = localStorage.getItem('language');
  return storedLanguage ? storedLanguage : 'en';
};

const languageSlice = createSlice({
  name: 'language',
  initialState: getInitialLanguage,
  reducers: {
    setEnglish: () => 'en',
    setIndonesian: () => 'id',
  },
});

export const { setEnglish, setIndonesian } = languageSlice.actions;

export default languageSlice.reducer;
