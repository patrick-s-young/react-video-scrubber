import { createSlice, PayloadAction } from '@reduxjs/toolkit';


export interface VideoState {
  src: string
  duration: number
  width: number
  height: number
}

const initialState: Partial<VideoState> = {
  src: undefined,
  duration: undefined,
  width: undefined,
  height: undefined
}

const videoSlice = createSlice({
  name: 'video',
  initialState,
  reducers: {
    setVideoState (state, action: PayloadAction<VideoState>) {
      const { src, duration, width, height } = action.payload;
      state.src = src;
      state.duration = duration;
      state.width = width;
      state.height = height;
    }
  }
});

export const {
  setVideoState
} = videoSlice.actions;

export type SetVideoState = ReturnType<typeof setVideoState>;

export default videoSlice.reducer;