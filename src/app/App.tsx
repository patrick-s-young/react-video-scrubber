import * as React from 'react';
import Scrubber from 'features/videoScrubber/Scrubber';
import { videoSrc, scrubberFramesMax } from 'app/app.config';
import 'app/App.css';

const App: React.FC = () =>
	<div className='app-container'>
		<div>
			SOURCE
		</div>
		<div>
			FRAME SCRUBBER
		</div>
		<div> 
			<video autoPlay muted loop >
				<source src={videoSrc} type='video/mp4' />  
			</video>
		</div>
		<div>
			<Scrubber
        videoSrc={videoSrc}
        scrubberFramesMax={scrubberFramesMax}
			/>
		</div>
	</div>


export default App;
