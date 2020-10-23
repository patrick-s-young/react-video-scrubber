import { useRef, useEffect, useMemo, useState } from 'react';
import * as React from 'react';
import { useSelector } from 'react-redux';
import videoFramesToCanvasArray from 'features/videoScrubber/helpers/videoFramesToCanvasArray';
import type { RootState } from 'app/rootReducer';

import type { ScrubberState } from 'features/videoScrubber/scrubberSlice';
import 'features/videoScrubber/scrubberStyles.css';

interface ScrubberFramesProps {
  videoSrc: string
  width: number
  height: number
  duration: number
  canvasWidth: number
}

// todo: add wait animation while 'videoFramesToCanvasArray' is resolving.
const ScrubberFrames: React.FC<ScrubberFramesProps> = ({ 
  videoSrc,
  width,
  height,
  duration,
  canvasWidth
}) => {
	const [ canvasFrames, setCanvasFrames ] = useState<Array<HTMLCanvasElement>>([]);
	const { currentScrubberFrame, scrubberFramesMax } = useSelector<RootState, ScrubberState>(
    (state) => state.scrubber
	);
	const [ debug, setDebug ] = useState<string>('');
	const canvasRef = useRef<HTMLCanvasElement | null>(null);
  // todo: move to scrubberSlice
  //const [canvasFrames, setCanvasFrames] = useState<Array<HTMLCanvasElement>>([]);
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
      canvasWidth
    ).then(setCanvasFrames);
	}, [videoSrc, currentTimes, width, height]);


	useEffect(() => {
		let value =  `debug: canvasFrames.length = ${canvasFrames.length} `
		if (canvasRef.current !== null && canvasFrames.length) {
			value = `${value} || above drawImage`;
			const ctx = canvasRef.current.getContext('2d');
			ctx?.drawImage(canvasFrames[currentScrubberFrame], 0, 0);
		}
		setDebug(value);
	}, [canvasFrames, currentScrubberFrame]);

	return(
		<div className='scrubberFrames-container'>
			{`debug: ${debug}`}
			<canvas
				ref={canvasRef}
				width={canvasWidth}
				height={canvasWidth}
			/>
		</div>
	);
}

export default ScrubberFrames;
