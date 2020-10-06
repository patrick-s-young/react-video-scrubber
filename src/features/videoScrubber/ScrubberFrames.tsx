import React, { useRef, useEffect, useMemo, useState } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from 'app/rootReducer';
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
  scrubberFramesMax }) => {
		
	const canvasRef = useRef<HTMLCanvasElement | null>(null);
	const canvasFramesRef = useRef<Array<HTMLCanvasElement>>([]);
	const [canvasFramesInitialized, setCanvasFramesInitialized] = useState<boolean>(false);
	const { currentScrubberFrame } = useSelector(
		( state: RootState ) => state.scrubber
	);
	
	// Create array of temporal offsets into video by dividing its duration
	// by the number of video frame samples that can be scrubbed.
	// The more frame samples, the smoother the scrubbing.
	const currentTimes = useMemo<Array<number>>(() => { 
    const timeIncrement: number = duration / scrubberFramesMax;
    const currentTimes: Array<number> = [];
    for (let i = 0; i < scrubberFramesMax; i++) currentTimes.push(i * timeIncrement + 0.1);
		return currentTimes 
		}, [duration, scrubberFramesMax]
	);

	// Create and array of canvas elements, each holding a frame of video
	// that corresponds to a temporal offset in the 'currentTimes' array.
	useMemo(() => {
		videoFramesToCanvasArray(
			videoSrc,
			currentTimes,
			width,
			height)
		.then(canvasFrames => canvasFramesRef.current = canvasFrames as Array<HTMLCanvasElement>)
		.then(ignoredValue => setCanvasFramesInitialized(true))
	}, [videoSrc, currentTimes, width, height]);

	useEffect(() => {
		if (canvasRef.current !== null && canvasFramesInitialized) {
			const ctx = canvasRef.current.getContext('2d');
			ctx?.drawImage(canvasFramesRef.current[currentScrubberFrame], 0, 0);
		}
	}, [currentScrubberFrame, canvasFramesInitialized]);

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