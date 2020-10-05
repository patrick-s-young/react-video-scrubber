import React from 'react';
import Scrubber from 'features/videoScrubber/Scrubber';
import { videoSrc } from 'app/app.config';
import 'app/app.css';

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
			/>
		</div>
	</div>


export default App;