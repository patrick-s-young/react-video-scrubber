# React Video Scrubber
This React component is a locally-based solution for generating still frames from a video source. This method is an alternative to a server-side, Node.js/FFmpeg solution where video frames would be extracted and returned to the client as a sequence of images.

![05](https://user-images.githubusercontent.com/42591798/90859550-4ba77f80-e33d-11ea-95fd-2c974e32865e.gif)
# Scrub Video Frames using Array of Canvas Elements
![03_main_sequence](https://user-images.githubusercontent.com/42591798/90858701-91634880-e33b-11ea-984c-b63f8655ec01.gif)
## Application Logic Flow

The diagram below illustrates the high-level data and component flow of the application, from initial video load through frame extraction and user-driven scrubbing.

```mermaid
flowchart TD
    A[App mounts] --> B{videoReady?}
    B -- No --> C[VideoUpload component]
    C --> D[preloadVideo<br/>fetch video as Blob]
    D --> E[loadVideoMetadata<br/>read duration, width, height]
    E --> F[dispatch setVideoState<br/>updates videoSlice]
    F --> G[User clicks 'Use Video']
    G --> H[onVideoSelectedCallback<br/>setVideoReady=true]
    H --> B
    B -- Yes --> I[Scrubber component]
    I --> J[ScrubberFrames]
    I --> K[ScrubberSlider]
    J --> L[Compute currentTimes array<br/>duration / scrubberFramesMax]
    L --> M[videoFramesToCanvasArray<br/>seek video to each time<br/>draw frame to canvas]
    M --> N[setCanvasFrames<br/>array of HTMLCanvasElement]
    K --> O[User moves slider]
    O --> P[dispatch setCurrentScrubberFrame<br/>updates scrubberSlice]
    P --> Q[ScrubberFrames re-renders]
    N --> Q
    Q --> R[Draw canvasFrames currentScrubberFrame<br/>to visible canvas]
```

### Flow Summary

1. **Load** &mdash; `VideoUpload` preloads the source video as a Blob and reads its metadata, then dispatches it into the Redux `videoSlice`.
2. **Confirm** &mdash; Once the user confirms the video, `App` swaps `VideoUpload` for the `Scrubber`.
3. **Extract Frames** &mdash; `ScrubberFrames` calculates evenly-spaced time offsets and uses `videoFramesToCanvasArray` to seek a hidden `<video>` element to each offset, drawing the result into an array of `<canvas>` elements.
4. **Scrub** &mdash; `ScrubberSlider` dispatches the current frame index to the `scrubberSlice`; `ScrubberFrames` listens for changes and paints the matching cached canvas into the visible canvas.

## Running Locally

Make sure you have [Node.js](http://nodejs.org/) installed.

```sh
git clone https://github.com/patrick-s-young/react-video-scrubber.git # or clone your own fork
cd react-video-scrubber
yarn install
yarn start
```

## Built With

* [React](https://react-cn.github.io/react/downloads.html) - JavaScript UI library.
* [Redux Toolkit](https://redux-toolkit.js.org/) - Opinionated, batteries-included toolset for efficient Redux development.
* [TypeScript](https://www.typescriptlang.org/) - Extends JavaScript by adding types to the language.
* [webpack](https://webpack.js.org/) - Static module builder.

## Authors

* **Patrick Young** - [Patrick Young](https://github.com/patrick-s-young)

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
