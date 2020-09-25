import React, { useEffect, useState } from 'react';
import CanvasVideoFrameScrubber from 'VideoScrubber/CanvasVideoFrameScrubber';
import { videoSrc, frameCount } from './constants';
import './App.css';
import loadVideoMetadata, { VideoMetadata } from '../utils/loadVideoMetadata';

const App = () => {
  const [videoData, setVideoData] = useState<VideoMetadata | null>(null); 

  useEffect(() => {
    loadVideoMetadata(videoSrc, 2000).then(data => setVideoData(data)).catch(error => console.log(error));
  }, []);

  return (
    <div id="container">
      <div>
        SOURCE
      </div>
      <div>
        FRAME SCRUBBER
      </div>

      <div> 
        { videoData !== null &&
            <video
              autoPlay
              muted
              loop
            >
              <source src={videoSrc} type='video/mp4' />  
            </video>
        }
      </div>
      <div>
        { videoData !== null &&
            <div style={{ width: videoData.videoWidth + 'px'}}>
              <CanvasVideoFrameScrubber
                videoSrc={videoSrc}
                frameCount={frameCount}
                width={videoData.videoWidth}
                height={videoData.videoHeight}
                duration={videoData.duration}
              />
            </div>
        }
      </div>
    </div>
  );
}

export default App;