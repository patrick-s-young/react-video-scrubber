import React, { useState } from 'react'
import CanvasVideoFrameCollection from './CanvasVideoFrameCollection'
import Slider from '../Slider/Slider'

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
  const [currentTimes] = useState<Array<number>>(() => { 
    const timeIncrement: number = duration / frameCount
    const currentTimesArr: Array<number> = []
    for (let i = 0; i < frameCount; i++) {
        currentTimesArr.push(i * timeIncrement + 0.1)
    }
    return currentTimesArr; 
  })

  const sliderCallback = (scalerValue: number ): void => {
    const frameIndex = Math.floor(scalerValue * frameCount)
    if (frameIndex !== showFrameAtIndex) {
      setShowFrameAtIndex(frameIndex)
    }
  }

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
      <div>
        <Slider
          sliderCallback={sliderCallback}
        />
      </div>
    </div>
  );
}

export default CanvasVideoFrameScrubber