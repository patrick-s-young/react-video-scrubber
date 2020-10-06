import React, { useEffect, useState } from 'react';
import ScrubberFrames from 'features/videoScrubber/ScrubberFrames';
import ScrubberSlider from 'features/videoScrubber/ScrubberSlider';
import loadVideoMetadata from 'utils/loadVideoMetadata';
import type { VideoMetadata } from 'utils/loadVideoMetadata';
import 'features/videoScrubber/scrubberStyles.css';

interface ScrubberProps {
  videoSrc: string
  scrubberFramesMax: number
}

const Scrubber: React.FC<ScrubberProps> = ({
  videoSrc,
  scrubberFramesMax
}) => {
  const [videoData, setVideoData] = useState<VideoMetadata | null>(null);
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    loadVideoMetadata(videoSrc, 2000)
      .then(setVideoData)
      .catch((err: Error) => setError(err.toString()));
  }, []);

  return (
    <div className='scrubber-container'>
      {videoData !== null &&
        <div style={{ width: videoData.videoWidth + 'px' }}>
          <ScrubberFrames
            videoSrc={videoSrc}
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
      {error !== null && <div>{error}</div>}
    </div>
  );
}

export default Scrubber;
