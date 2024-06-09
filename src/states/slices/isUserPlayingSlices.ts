import { createSlice } from '@reduxjs/toolkit';

const getInitialIsUserPlaying = (): string => {
  const storedIsUserPlaying = localStorage.getItem('isUserPlaying');

  return storedIsUserPlaying ? storedIsUserPlaying : 'no';
};

const isUserPlayingSlice = createSlice({
  name: 'isUserPlaying',
  initialState: getInitialIsUserPlaying,
  reducers: {
    setIsUserPlayingYes: () => 'yes',
    setIsUserPlayingNo: () => 'no',
  },
});

export const { setIsUserPlayingYes, setIsUserPlayingNo } =
  isUserPlayingSlice.actions;

export default isUserPlayingSlice.reducer;
