import * as React from 'react';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { preloadVideo, loadVideoMetadata } from 'utils';
import { setVideoState } from 'features/userVideo/videoSlice';
import type { VideoState } from 'features/userVideo/videoSlice';
import type { RootState } from 'app/rootReducer';
import 'features/userVideo/userVideo.css';

interface VideoUploadProps {
  onVideoSelectedCallback: () => void;
}

export const VideoUpload: React.FC<VideoUploadProps> = ({ onVideoSelectedCallback }) => {
  // conditional render button once video has been selected and uplaoded
  const [videoSelected, setVideoSelected] = useState<boolean>(false);
  // conditional rendering of error during component did mount useEffect
  const [error, setError] = useState<string | null>(null);
  // get video data for preview along with 'use video' button
  const { src, width } = useSelector<RootState, VideoState>((state) => state.video as VideoState);
  // update videoSlice after component did mount useEffect
  const dispatch = useDispatch();
  const onSetVideoState = (videoState: VideoState) => {
    dispatch(setVideoState({
      src: videoState.src,
      duration: videoState.duration,
      width: videoState.width,
      height: videoState.height
    }));
    setVideoSelected(true);
  }
  // placeholder value for user's video upload
  const videoPath: string = 'video/swing_480x480_24fps.mp4';
  // preload video as blob (for iOS autoplay) and update videoSlice w/ metadata
	useEffect(() => {
		preloadVideo(videoPath)
    .then(src => loadVideoMetadata(src, 1000))
    .then(onSetVideoState)
		.catch(setError);
  }, []);

  // todo: refactor inline css
  return (
    <div className='video-upload-container'>
      <div className='video-upload-container-item'>
      {videoSelected 
        ? <div className='video-upload-preview'>
            <video src={src}width={width > window.innerWidth ? window.innerWidth : width} webkit-playsinline='true' playsInline={true} muted autoPlay loop style={{ paddingBottom: '10px'}}/>
            <button onClick={onVideoSelectedCallback} >Use Video</button>
          </div>
        : <img src='images/loading_200x200.gif' alt='loading' style={{ marginTop: '140px'}}/>
      }
      {error !== null && <div>{error}</div>}
      </div>
    </div>
  );
}
