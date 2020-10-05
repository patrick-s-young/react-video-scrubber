import { combineReducers } from '@reduxjs/toolkit';
import scrubberReducer from 'features/videoScrubber/scrubberSlice';

const rootReducer = combineReducers({
  scrubber: scrubberReducer
});

export type RootState = ReturnType<typeof rootReducer>;

export default rootReducer;