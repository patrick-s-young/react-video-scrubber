export type VideoMetadata = { 
  videoHeight: number,
  videoWidth: number,
  duration: number,
}

interface LoadVideoMetadata {
 (filePath: string, waitLimit: number): Promise<VideoMetadata>
}

const loadVideoMetadata: LoadVideoMetadata = (filePath: string, waitLimit: number) => {
  let timeoutId: NodeJS.Timeout;

  const timeout = new Promise<never>((_resolve, reject) => {
    timeoutId = setTimeout(() => {
      reject(`Request timed out at ${waitLimit} second`);
    }, waitLimit);
  });

  const videoMetadata = new Promise<VideoMetadata>((resolve, _reject) => {
    const newVideo = document.createElement('video');
    newVideo.src = filePath;
    newVideo.addEventListener('loadedmetadata', (ev: Event) => {
      const target = ev.currentTarget as HTMLVideoElement;
      resolve({
        videoHeight: target.videoHeight,
        videoWidth: target.videoWidth,
        duration: target.duration
      });
      clearTimeout(timeoutId);
    }, { once: true })
  });

  return Promise.race([
    videoMetadata,
    timeout
  ]);
}

export default loadVideoMetadata;
