import React, { useState, useMemo, useCallback } from 'react';
import CanvasVideoFrameCollection from 'VideoScrubber/CanvasVideoFrameCollection';
import './canvasVideoFrameScrubber.css';

interface CanvasVideoFrameScrubberProps {
  videoSrc: string
  frameCount: number
  width: number
  height: number
  duration: number
}

const CanvasVideoFrameScrubber: React.FC<CanvasVideoFrameScrubberProps> = ({
  videoSrc, 
  frameCount,
  width,
  height,
  duration }) => {
  const [showFrameAtIndex, setShowFrameAtIndex] = useState<number>(Math.floor(frameCount / 2));

  const currentTimes = useMemo<Array<number>>(() => { 
    const timeIncrement: number = duration / frameCount;
    const currentTimesArr: Array<number> = [];
    for (let i = 0; i < frameCount; i++) {
        currentTimesArr.push(i * timeIncrement + 0.1);
    }
    return currentTimesArr; 
  }, [duration, frameCount]);

  const onSlideHandler = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
      setShowFrameAtIndex(parseInt(e.target.value));
  }, [showFrameAtIndex]);

  return (
    <div>
      <div>
        <CanvasVideoFrameCollection
          currentTimes={currentTimes}
          showFrameAtIndex={showFrameAtIndex}
          videoSrc={videoSrc}
          width={width}
          height={height}
        />
      </div>
      <div className="slidecontainer">
        <input 
          type='range'
          min='0'
          max={frameCount - 1} 
          step='1'
          defaultValue={Math.floor(frameCount / 2)} 
          className='slider' 
          onChange={onSlideHandler}
          data-testid='backgroundSelectorInput'
        />
    </div>
    </div>
  );
}

export default CanvasVideoFrameScrubber;