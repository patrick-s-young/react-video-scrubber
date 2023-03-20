import * as React from 'react';
import { useState } from 'react';
import { useSelector } from 'react-redux';
import Scrubber from 'features/videoScrubber/Scrubber';
import { VideoUpload } from 'features/userVideo/VideoUpload';
import type { VideoState } from 'features/userVideo/videoSlice';
import type { RootState } from 'app/rootReducer';
import './app.css';

const App: React.FC = () => {
	// conditional render <VideoUpload> or <MosaicTiles>
	const [videoReady, setVideoReady] = useState<boolean>(false);
	// set app screen width relative to video width
	const { src, duration, width, height } = useSelector<RootState, VideoState>((state) => state.video as VideoState);
	const appScreenWidth: Partial<number> = width > window.innerWidth ? window.innerWidth : width;
	// callback from <VideoUpload> when user-selected video is ready
	const onVideoSelectedCallback = () => {
		setVideoReady(true);
	}
	// <VideoUpload> is a mock for user-initiated video uploads
	return (
<div className='app'>
			<div className='app-container' style={{ width }}>
				{!videoReady
					? <VideoUpload onVideoSelectedCallback={onVideoSelectedCallback}/>
					: <Scrubber
							src={src}
							duration={duration}
							width={width}
							height={height}/>
				}
			</div>
    </div>
	);
}
			
export default App;
