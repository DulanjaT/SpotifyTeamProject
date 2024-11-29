import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router';

import Root from "./pages/Root";
import Authorize from "./pages/login/Authorize";
import GetToken from "./pages/login/GetToken";
import App from "./pages/App";
import ArtistDemo from './pages/ArtistDemo';
import WebPlayback from './components/WebPlayback/WebPlayback';
import Player from './pages/Player';

//Temporarily disabled strict mode because current configuration will duplicate token requests, need to determine if this is a design issue on my part
//https://react.dev/reference/react/useState#caveats
//Router docs here: https://reactrouter.com/start/library/routing
createRoot(document.getElementById('root')).render(
	//<StrictMode>
		<BrowserRouter>
			<Routes>
				<Route path="/" element={<Root />}>
					<Route index element={<Authorize />} />
					<Route path="getToken" element={<GetToken />} />
					<Route path="app" element={<App />} />
					<Route path="artist" element={<ArtistDemo />} />
					<Route path="player" element={<WebPlayback />} />
					<Route path="playlist" element={<Player />} />
					
					
				</Route>
			</Routes>
		</BrowserRouter>
	//</StrictMode>
);
