import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from 'app/rootReducer';
import { setCurrentScrubberFrame, CurrentScrubberFrame } from 'features/videoScrubber/scrubberSlice';
import 'features/videoScrubber/scrubberStyles.css';

interface ScrubberSliderProps {
  scrubberFramesMax: number
}

const ScrubberSlider: React.FC<ScrubberSliderProps> = ({
  scrubberFramesMax
}) => {
  const dispatch = useDispatch();
  const { currentScrubberFrame } = useSelector(
    (state: RootState) => state.scrubber
  );

  const onSlideHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(setCurrentScrubberFrame(parseInt(e.target.value) as CurrentScrubberFrame));
  }

  return (
    <div className="scrubberSlider-container">
      <input 
        type='range'
        min='0'
        max={scrubberFramesMax - 1} 
        step='1'
        defaultValue={currentScrubberFrame} 
        className='scrubberSlider' 
        onChange={onSlideHandler}
        data-testid='backgroundSelectorInput'
      />
    </div>
  );
}

export default ScrubberSlider;