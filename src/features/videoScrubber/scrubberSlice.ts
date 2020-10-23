import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export type CurrentScrubberFrame = number;
export interface ScrubberState {
  currentScrubberFrame: CurrentScrubberFrame,
  scrubberFramesMax: number,
  canvasWidth: number
}
const scrubberFramesMaxDefault: number = 20;
export const initialState: ScrubberState = {
  scrubberFramesMax: scrubberFramesMaxDefault,
  currentScrubberFrame: Math.floor(scrubberFramesMaxDefault / 2),
  canvasWidth: 0
}
const scrubberSlice = createSlice({
  name: 'scrubber',
  initialState,
  reducers: {
    setScrubberCanvasWidth (state, action: PayloadAction<number>) {
      const width = action.payload;
      state.canvasWidth = width > window.innerWidth ? window.innerWidth : width;
    },
    setCurrentScrubberFrame (state, action: PayloadAction<CurrentScrubberFrame>) {
      state.currentScrubberFrame = action.payload;
    }
  }
});

export const {
  setScrubberCanvasWidth,
  setCurrentScrubberFrame
} = scrubberSlice.actions;

export type SetCurrentScrubberFrame = ReturnType<typeof setCurrentScrubberFrame>;

export default scrubberSlice.reducer;
