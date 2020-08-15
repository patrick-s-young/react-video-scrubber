import React from 'react';
import CanvasVideoFrameScrubber from './components/CanvasVideoFrameScrubber/CanvasVideoFrameScrubber'
import './components/CanvasVideoFrameScrubber/CanvasVideoFrameScrubber.css'
function App() {
  const videoSrc = "06_1.mp4"
  const width = 480
  const height = 480
  const frameCount = 20

  const videoElement = document.createElement('video')
  videoElement.src = videoSrc
  document.getElementById("videoContainer")?.appendChild(videoElement)
  
  return (
    <div>
      <div style={{ width: '480px'}}>
        <CanvasVideoFrameScrubber
          videoSrc={videoSrc}
          frameCount={frameCount}
          width={width}
          height={height}
        />
      </div>
      <div id="videoContainer" className="video-container"/>
    </div>
  );
}

export default App;
