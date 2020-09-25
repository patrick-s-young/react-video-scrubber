
export type VideoMetadata = { 
  videoHeight: number,
  videoWidth: number,
  duration: number,
}

interface LoadVideoMetadata {
 (filePath: string, waitLimit: number): Promise<unknown>
}

const loadVideoMetadata: LoadVideoMetadata = (filePath: string, waitLimit: number) => {

  let videoMetadata = new Promise<VideoMetadata>((resolve, reject) => {
    const newVideo = document.createElement('video');
    newVideo.src = filePath;
    newVideo.onloadedmetadata = (ev: React.SyntheticEvent) => {
      const target = ev.currentTarget as HTMLVideoElement;
      resolve({ 
        videoHeight: target.videoHeight,
        videoWidth: target.videoWidth,
        duration: target.duration
      });
    }
  });

  let timeout = new Promise<string>((resolve, reject) => {
    let id = setTimeout(() => {
      clearTimeout(id);
      reject(`Request timed out at ${waitLimit} second`);
    }, waitLimit);
  });

  return Promise.race([
    videoMetadata,
    timeout
  ]);
}

export default loadVideoMetadata;