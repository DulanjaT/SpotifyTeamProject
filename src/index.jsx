import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router";
import Root from "./pages/Root";
import Authorize from "./pages/login/Authorize";
import GetToken from "./pages/login/GetToken";
import App from "./pages/App";
import ArtistDemo from "./pages/ArtistDemo";
import UserPlaylists from "./components/UserPlaylists/UserPlaylists";
import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";
import { CssBaseline, ThemeProvider } from "@mui/material";
import theme from "./theme/theme";
import TestMainLayout from "./pages/MainLayout";
import Search from "./components/Search/Search";
import HomePage from "./pages/Home";
import PlaylistManager from "./components/CreatePlaylist/ManagePlaylist";
import MyPlaylist from "./components/MyPlayList/MyPlaylist";
//Temporarily disabled strict mode because current configuration will duplicate token requests, need to determine if this is a design issue on my part
//https://react.dev/reference/react/useState#caveats
//Router docs here: https://reactrouter.com/start/library/routing
createRoot(document.getElementById("root")).render(
  //<StrictMode>
  <ThemeProvider theme={theme}>
    <BrowserRouter>
      <CssBaseline />
      <Routes>
        <Route path="/" element={<TestMainLayout />}>
          <Route index element={<Authorize />} />
          <Route path="getToken" element={<GetToken />} />
          <Route path="app" element={<UserPlaylists />} />
          {/* This is our Root for now */}
          <Route path="home" element={<HomePage />} />
          <Route path="artist" element={<ArtistDemo />} />
          <Route path="playlists" element={<UserPlaylists />} />
          <Route path="search" element={<Search />} />
          <Route path="create" element={<PlaylistManager />} />
          <Route path="liked-songs" element={<MyPlaylist />} />
        </Route>
      </Routes>
    </BrowserRouter>
  </ThemeProvider>
  //</StrictMode>
);
