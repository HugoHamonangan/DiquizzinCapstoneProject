import { configureStore } from '@reduxjs/toolkit';
import languageReducer from '../states/slices/languageSlices';
import isUserPlayingReducer from './slices/isUserPlayingSlices';

const store = configureStore({
  reducer: {
    language: languageReducer,
    isUserPlaying: isUserPlayingReducer,
  },
});

store.subscribe(() => {
  const state = store.getState();
  localStorage.setItem('language', state.language);
  localStorage.setItem('isUserPlaying', JSON.stringify(state.isUserPlaying));
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
