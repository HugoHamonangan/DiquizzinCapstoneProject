import { configureStore, createSlice } from '@reduxjs/toolkit';

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

const store = configureStore({
  reducer: {
    language: languageSlice.reducer,
  },
});

store.subscribe(() => {
  const state = store.getState();
  localStorage.setItem('language', state.language);
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
