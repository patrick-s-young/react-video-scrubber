import React, { useState } from 'react';
import CanvasVideoFrameScrubber from '../components/CanvasVideoFrameScrubber/CanvasVideoFrameScrubber';
import { videoSrc, frameCount } from './constants';
import './App.css';

interface VideoData {
  duration: number;
  width: number;
  height: number;
}

const App = () => {
  const [videoData, setVideoData] = useState<VideoData | null>(null); 
  const onLoadedMetaDataCallback = (event: React.SyntheticEvent) => {
    const target = event.currentTarget as HTMLVideoElement;
    setVideoData({
      duration: target.duration,
      width: target.videoWidth,
      height: target.videoHeight
    });
  }
  
  // dispay the source video and the frame scrubber side by side
  return (
    <div id="container">
      <div>
        SOURCE
      </div>

      <div>
        FRAME SCRUBBER
      </div>

      <div> 
        <video
            src={videoSrc}
            muted 
            autoPlay
            loop
            onLoadedMetadata={onLoadedMetaDataCallback} 
        />
      </div>

      <div>
        { videoData !== null &&
          <div style={{ width: videoData.width + 'px'}}>
            <CanvasVideoFrameScrubber
              videoSrc={videoSrc}
              frameCount={frameCount}
              width={videoData.width}
              height={videoData.height}
              duration={videoData.duration}
            />
          </div>
        }
      </div>
    </div>
  );
}

export default App;