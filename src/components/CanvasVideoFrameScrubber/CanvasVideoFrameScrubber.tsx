import React, { useState, useEffect } from 'react'
import CanvasVideoFrameCollection from './CanvasVideoFrameCollection'
import Slider from '../Slider/Slider'

interface CanvasVideoFrameScrubberProps {
  videoSrc: string
  frameCount: number
  width: number
  height: number
}
const CanvasVideoFrameScrubber: React.FC<CanvasVideoFrameScrubberProps> = ({
  videoSrc, 
  frameCount,
  width,
  height}) => {
  const [showFrameAtIndex, setShowFrameAtIndex] = useState<number>(5)
  const [currentTimes, setCurrentTimes] = useState<Array<number>>([])

  useEffect(() => {
    const videoElement = document.createElement('video')
    videoElement.src = videoSrc
    videoElement.onloadedmetadata = () => {
      const timeIncrement: number = videoElement.duration / frameCount
      const currentTimesArr: Array<number> = []
      for (let i = 0; i < frameCount; i++) {
        currentTimesArr.push(i * timeIncrement + 0.1)
      }
      console.log(`currentTimesArr: ${currentTimesArr}`)
      setCurrentTimes(currentTimesArr);
    }
  }, [videoSrc, frameCount]);

  useEffect(() => {
    console.log(`useEffect :: currentTimes: ${currentTimes}`)
  }, [currentTimes])

  const sliderCallback = (scalerValue: number ): void => {
    const frameIndex = Math.floor(scalerValue * frameCount)
    if (frameIndex !== showFrameAtIndex) {
      console.log(`sliderCallback with frameIndex: ${frameIndex}\n`)
      setShowFrameAtIndex(frameIndex)
    }
  }
  return (
    <div>
      <div>
        { currentTimes.length &&
        <CanvasVideoFrameCollection
          currentTimes={currentTimes}
          showFrameAtIndex={showFrameAtIndex}
          videoSrc={videoSrc}
          width={width}
          height={height}
        />
        }
      </div>
      <div>
        <Slider
          sliderCallback={sliderCallback}
        />
      </div>
      <div id="videoContainer" className="video-container"/>
    </div>
  );
}

export default CanvasVideoFrameScrubber