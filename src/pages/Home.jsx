import React from "react";
import { Box, Typography, AppBar, Toolbar, Container } from "@mui/material";
import Search from "../components/Search/Search.jsx";
import MyPlaylist from "../components/MyPlayList/MyPlaylist";
import UserPlaylists from "../components/UserPlaylists/UserPlaylists.jsx";
import DailyMixes from "../components/DailyMixes/DailyMixes.jsx";

export default function HomePage() {
  return (
    <Box sx={{ bgcolor: "background.paper", color: "#fff", minHeight: "100vh" }}>

      {/* Main Content */}
      <Container sx={{ paddingTop: 4 }}>
        {/* Welcome Message */}

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

      
<Box sx={{ marginBottom: 6 }}>
  <DailyMixes />
</Box>

        {/* Search Component at the end */}
        <Box sx={{ marginTop: 6, marginBottom: 6 }}>
          <Search />
        </Box>
      </Container>
    </Box>
  );
}
