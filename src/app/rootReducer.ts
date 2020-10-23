import { combineReducers } from '@reduxjs/toolkit';
import scrubberReducer from 'features/videoScrubber/scrubberSlice';
import videoReducer from 'features/userVideo/videoSlice';

const rootReducer = combineReducers({
  scrubber: scrubberReducer,
  video: videoReducer
});

export type RootState = ReturnType<typeof rootReducer>;

export default rootReducer;
