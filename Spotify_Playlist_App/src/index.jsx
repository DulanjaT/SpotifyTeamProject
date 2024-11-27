import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router';

import Root from "./pages/Root";
import Authorize from "./pages/login/Authorize";
import GetToken from "./pages/login/GetToken";
import App from "./pages/App";

//Temporarily disabled strict mode because current configuration will duplicate token requests, need to determine if this is a design issue on my part
//https://react.dev/reference/react/useState#caveats
//GetToken path must match Spotify redirect URI
//Router docs here: https://reactrouter.com/start/library/routing
createRoot(document.getElementById('root')).render(
	//<StrictMode>
		<BrowserRouter>
			<Routes>
				<Route path="/" element={<Root />}>
					<Route index element={<Authorize />} />
					<Route path="getToken" element={<GetToken />} />
					<Route path="app" element={<App />} />
				</Route>
			</Routes>
		</BrowserRouter>
	//</StrictMode>
);
