import { createRoot } from "react-dom/client";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { BrowserRouter, Routes, Route } from "react-router";

import theme from "./theme/theme";

import Root from "./pages/Root/Root";
import Authorize from "./pages/login/Authorize";
import GetToken from "./pages/login/GetToken";
import AuthorizedRoute from "./components/AuthorizedRoute/AuthorizedRoute";

import Home from "./components/Views/Home/Home";
import Playlist from "./components/Views/Playlist/Playlist";
import Album from "./components/Views/Album/Album";
import Artist from "./components/Views/Artist/Artist";
import Liked from "./components/Views/Liked/Liked";
import Search from "./components/Views/Search/Search";

const queryClient = new QueryClient();

//Try moving cssbaseline around
createRoot(document.getElementById('root')).render(
	<>
		<ThemeProvider theme={theme}>
			<CssBaseline />
			<QueryClientProvider client={queryClient}>
				<LocalizationProvider dateAdapter={AdapterDayjs}>
					<BrowserRouter>
						<Routes>
							<Route path="/" element={<Root />}>
								<Route index element={<Authorize />} />
								<Route path="getToken" element={<GetToken />} />
								<Route path="app" element={<AuthorizedRoute />}>
									<Route index element={<Home />} />
									<Route path="playlist/:id" element={<Playlist />} />
									<Route path="album/:id" element={<Album />} />
									<Route path="artist/:id" element={<Artist />} />
									<Route path="liked" element={<Liked />} />
									<Route path="search" element={<Search />} />
								</Route>
							</Route>
						</Routes>
					</BrowserRouter>
				</LocalizationProvider>
			</QueryClientProvider>
		</ThemeProvider>
	</>
);

/*


*/