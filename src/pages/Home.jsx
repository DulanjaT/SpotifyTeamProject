import React from "react";
import { Box, Typography, AppBar, Toolbar, Container } from "@mui/material";
import Search from "../components/Search/Search.jsx" // Assuming Search component is in the same directory
import Artist from "./ArtistDemo"; // Assuming Artist component is in the same directory

export default function Home() {
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

        {/* Search Component */}
        <Box sx={{ marginBottom: 6 }}>
          <Search />
        </Box>

        {/* Artist Details */}
        <Typography
          variant="h5"
          gutterBottom
          sx={{
            marginBottom: 4,
            fontWeight: "bold",
            color: "#fff",
            textAlign: "center",
          }}
        >
          Featured Artist
        </Typography>
        <Box sx={{ display: "flex", justifyContent: "center" }}>
          <Artist />
        </Box>
      </Container>
    </Box>
  );
}
