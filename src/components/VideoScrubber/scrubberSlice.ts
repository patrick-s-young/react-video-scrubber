import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { scrubberFramesMax } from 'app/app.config';

export type CurrentScrubberFrame = number;

export interface ScrubberState {
  currentScrubberFrame: CurrentScrubberFrame
}

const initialState: ScrubberState = {
  currentScrubberFrame: Math.floor(scrubberFramesMax / 2)
}

const scrubberSlice = createSlice({
  name: 'scrubber',
  initialState,
  reducers: {
    setCurrentScrubberFrame (state, action: PayloadAction<CurrentScrubberFrame>) {
      state.currentScrubberFrame = action.payload;
    }
  }
});

export const {
  setCurrentScrubberFrame
} = scrubberSlice.actions;

export type SetCurrentScrubberFrame = ReturnType<typeof setCurrentScrubberFrame>;

export default scrubberSlice.reducer;