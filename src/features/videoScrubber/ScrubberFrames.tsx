import { useRef, useEffect, useMemo, useState } from 'react';
import * as React from 'react';
import { useSelector } from 'react-redux';
import type { RootState } from 'app/rootReducer';
import videoFramesToCanvasArray from 'utils/videoFramesToCanvasArray';
import 'features/videoScrubber/scrubberStyles.css';

interface ScrubberFramesProps {
  videoSrc: string
  width: number
  height: number
  duration: number
  scrubberFramesMax: number
}

// todo: add wait animation while 'videoFramesToCanvasArray' is resolving.
const ScrubberFrames: React.FC<ScrubberFramesProps> = ({ 
  videoSrc,
  width,
  height,
  duration,
  scrubberFramesMax
}) => {
	const canvasRef = useRef<HTMLCanvasElement | null>(null);
  // avoid refs when possible--canvasFrames can be state. perhaps consider moving to redux?
  const [canvasFrames, setCanvasFrames] = useState<Array<HTMLCanvasElement>>([]);
	const currentScrubberFrame = useSelector<RootState, number>(
		(state) => state.scrubber.currentScrubberFrame
	);

	// Create array of temporal offsets into video by dividing its duration
	// by the number of video frame samples that can be scrubbed.
	// The more frame samples, the smoother the scrubbing.
	const currentTimes = useMemo<Array<number>>(() => { 
    const timeIncrement: number = duration / scrubberFramesMax;
    // pre-allocation has better performance than pushing
    const currentTimes: Array<number> = new Array(scrubberFramesMax);
    for (let i = 0; i < currentTimes.length; i++) currentTimes[i] = i * timeIncrement + 0.1;
		return currentTimes;
  }, [duration, scrubberFramesMax]);

	// Create an array of canvas elements, each holding a frame of video
	// that corresponds to a temporal offset in the 'currentTimes' array.
	useEffect(() => {
		videoFramesToCanvasArray(
			videoSrc,
			currentTimes,
			width,
      height
    ).then(setCanvasFrames);
	}, [videoSrc, currentTimes, width, height]);

	useEffect(() => {
		if (canvasRef.current !== null && canvasFrames.length) {
			const ctx = canvasRef.current.getContext('2d');
			ctx?.drawImage(canvasFrames[currentScrubberFrame], 0, 0);
		}
	}, [canvasFrames, currentScrubberFrame]);

	return(
		<div className='scrubberFrames-container'>
			<canvas
				ref={canvasRef}
				width={width}
				height={height}
			/>
		</div>
	);
}

export default ScrubberFrames;
