
const { detect } = require('detect-browser');
const browser = detect();

interface VideoFramesToCanvasArray {
  (videoSrc: string, currentTimes: Array<number>, width: number, height: number): Promise<unknown>
}

// todo: add timeout error waitLimit
const videoFramesToCanvasArray: VideoFramesToCanvasArray = (
  videoSrc,
  currentTimes,
  width,
  height
) => {
  const canvasArray: Array<Promise<HTMLCanvasElement>> = currentTimes.map((currentTime) => {
    return new Promise<HTMLCanvasElement>((resolve, reject) => {
      const video: HTMLVideoElement = document.createElement('video');
      video.src = videoSrc;
      
      if (browser.name === 'safari') {
        // for webkit, wait for onloadedmeta date before setting currentTime.
        video.onloadedmetadata = () => {
          video.currentTime = currentTime;
        }
      } else {
        video.currentTime = currentTime;
      }

      video.onseeked = () => {
        const canvas = document.createElement('canvas');
        canvas.width = width;
        canvas.height = height;
        const ctx = canvas.getContext('2d');
        ctx?.drawImage(video,  0, 0);
        resolve(canvas);
      }
    });
  });

  return Promise.all(canvasArray);
}

export default videoFramesToCanvasArray;