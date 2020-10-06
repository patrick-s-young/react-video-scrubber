import React, { useEffect, useState } from 'react';
import ScrubberFrames from 'features/videoScrubber/ScrubberFrames';
import ScrubberSlider from 'features/videoScrubber/ScrubberSlider';
import loadVideoMetadata, { VideoMetadata } from 'utils/loadVideoMetadata';
import { scrubberFramesMax } from 'app/app.config';
import 'features/videoScrubber/scrubberStyles.css';

interface ScrubberProps {
  videoSrc: string
}

const Scrubber: React.FC<ScrubberProps> = ({ videoSrc }) => {
	const [videoData, setVideoData] = useState<VideoMetadata | null>(null); 

	useEffect(() => {
		loadVideoMetadata(videoSrc, 2000)
			.then(data => setVideoData(data as VideoMetadata))
			.catch(error => console.log(error));
	}, []);

	return(
		<div className='scrubber-container'>
		 { videoData !== null &&
		 		<div style={{ width: videoData.videoWidth + 'px'}}>
					<ScrubberFrames
						videoSrc={'video/swing.mp4'}
						width={videoData.videoWidth}
						height={videoData.videoHeight}
						duration={videoData.duration}
						scrubberFramesMax={scrubberFramesMax}
					/>
					<ScrubberSlider
						scrubberFramesMax={scrubberFramesMax}
					/>
				</div>
			}
		</div>
	);
}

export default Scrubber;