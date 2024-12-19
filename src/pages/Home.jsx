import React from "react";
import { Box, Typography, AppBar, Toolbar, Container } from "@mui/material";
import Search from "../components/Search/Search.jsx";
import MyPlaylist from "../components/MyPlayList/MyPlaylist";
import UserPlaylists from "../components/UserPlaylists/UserPlaylists.jsx";

export default function HomePage() {
  return (
    <Box sx={{ bgcolor: "#121212", color: "#fff", minHeight: "100vh" }}>
      {/* AppBar/Header */}
      <AppBar position="static" sx={{ bgcolor: "#1DB954" }}>
        <Toolbar>
          <Typography variant="h6" sx={{ flexGrow: 1 }}>
            Spotify App
          </Typography>
        </Toolbar>
      </AppBar>

      {/* Main Content */}
      <Container sx={{ paddingTop: 4 }}>
        {/* Welcome Message */}
        <Typography
          variant="h4"
          gutterBottom
          sx={{
            textAlign: "center",
            marginBottom: 4,
            fontWeight: "bold",
            color: "#fff",
          }}
        >
          Welcome to Your Spotify Dashboard
        </Typography>

        {/* Library (Your Playlists) Section */}
        <Typography
          variant="h5"
          gutterBottom
          sx={{
            marginTop: 4,
            marginBottom: 4,
            fontWeight: "bold",
            color: "#fff",
            textAlign: "center",
          }}
        >
          Your Playlists
        </Typography>
        <Box sx={{ marginBottom: 6 }}>
          <UserPlaylists />
        </Box>

        {/* Liked Songs Section */}
        <Typography
          variant="h5"
          gutterBottom
          sx={{
            marginTop: 4,
            marginBottom: 4,
            fontWeight: "bold",
            color: "#fff",
            textAlign: "center",
          }}
        >
          Your Liked Songs
        </Typography>
        <Box sx={{ marginBottom: 6 }}>
          <MyPlaylist />
        </Box>

        {/* Search Component at the end */}
        <Box sx={{ marginTop: 6, marginBottom: 6 }}>
          <Search />
        </Box>
      </Container>
    </Box>
  );
}
