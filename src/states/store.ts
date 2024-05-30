import { configureStore } from '@reduxjs/toolkit';
import languageReducer from '../states/slices/languageSlices';

const store = configureStore({
  reducer: {
    language: languageReducer,
  },
});

store.subscribe(() => {
  const state = store.getState();
  localStorage.setItem('language', state.language);
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
