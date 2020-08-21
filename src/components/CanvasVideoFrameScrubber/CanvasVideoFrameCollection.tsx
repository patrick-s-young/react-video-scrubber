import React, { useState, useRef, useEffect, ReactElement } from 'react';
import CanvasVideoFrame from './CanvasVideoFrame';

interface CanvasVideoFrameCollectionProps {
  currentTimes: Array<number>,
  showFrameAtIndex: number,
  videoSrc: string,
  width: number,
  height: number,
}

const CanvasVideoFrameCollection: React.FC<CanvasVideoFrameCollectionProps> = ({
  currentTimes,
  showFrameAtIndex,
  videoSrc,
  width,
  height }) => {
  const [loading, setLoading] = useState(true);
  const collectionRef = useRef<Array<ReactElement> | null>(null);

  useEffect(() => {
    collectionRef.current = currentTimes.map((currentTime) => {
      return(<CanvasVideoFrame
        videoSrc={videoSrc}
        currentTime={currentTime}
        key={currentTime}
        width={width}
        height={height}
      />)}
      )
      setLoading(false);
  }, [currentTimes, height, width, videoSrc]);

  return (
    <>
      {loading !== true && collectionRef.current !== null &&
      collectionRef.current.filter((canvasVideoFrame, index) => showFrameAtIndex === index) }
    </>
  );
}

export default CanvasVideoFrameCollection;