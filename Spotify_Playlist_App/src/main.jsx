import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { BrowserRouter, Routes, Route } from 'react-router';
import Root from "./pages/Root";
import Authorize from "./pages/login/Authorize";
import GetToken from "./pages/login/GetToken";
import App from "./pages/App";

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
