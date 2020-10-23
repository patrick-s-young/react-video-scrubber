// exported out of videoSlice
import type { VideoState } from 'features/userVideo/videoSlice';

export interface LoadVideoMetadata {
 (src: string, waitLimit: number): Promise<VideoState>
}

export const loadVideoMetadata: LoadVideoMetadata = (
  src,
  waitLimit) => {
  let timeoutId: NodeJS.Timeout;
  const timeout = new Promise<never>((_resolve, reject) => {
    timeoutId = setTimeout(() => {
      reject(`Request timed out at ${waitLimit} second`);
    }, waitLimit);
  });

  let videoMetadata = new Promise<VideoState>((resolve, _reject) => {
    const newVideo = document.createElement('video');
    newVideo.src = src;
    newVideo.addEventListener('loadedmetadata', (ev: Event) => {
      const target = ev.currentTarget as HTMLVideoElement;
      resolve({ 
        src,
        duration: target.duration,
        width: target.videoWidth,
        height: target.videoHeight
      });
      clearTimeout(timeoutId);
    }, { once: true })
  });


  return Promise.race([
    videoMetadata,
    timeout
  ]);
}
