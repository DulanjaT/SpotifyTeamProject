import React, { useState } from "react";
import { Box, Grid, Typography, List, ListItem, ListItemButton, ListItemText, Avatar } from "@mui/material";
import { Link, useOutletContext } from "react-router";
import UserInfo from "../components/UserInfo/UserInfo";
import UserPlaylists from "../components/UserPlaylists/UserPlaylists";
import { Outlet } from "react-router";
import SongSearch from "../components/SongSearch/SongSearch";


export default function MainLayout() {
  const [currentTrackUri, setCurrentTrackUri] = useState(null);

  // Function to update the song URI dynamically
  const handleSongSelection = (trackUri) => {
    setCurrentTrackUri(trackUri);
  };

  return (
    <Box sx={{ height: "100vh", display: "flex", flexDirection: "column" }}>
      {/* Main Grid */}
      <Grid container sx={{ flexGrow: 1 }}>
        {/* Sidebar */}
        <Grid
          item={true}
          xs={2}
          sx={{
            bgcolor: "#1d1d1d",
            color: "#fff",
            p: 2,
            display: "flex",
            flexDirection: "column",
          }}
        >
          <Typography variant="h5" gutterBottom>
            Spotify
          </Typography>
          <List>
            <ListItem disablePadding>
              <ListItemButton component={Link} to="/app">
                {/* Link to Home */}
                <ListItemText primary="Home" />
              </ListItemButton>
            </ListItem>
            <ListItem disablePadding>
              <ListItemButton component={Link} to="/search">
                {/* Link to SongSearch */}
                <ListItemText primary="search" />
              </ListItemButton>
            </ListItem>
            <ListItem disablePadding>
              <ListItemButton component={Link} to="/playlists">
                {/* Link to UserPlaylists */}
                <ListItemText primary="Library" />
              </ListItemButton>
            </ListItem>
          </List>
        </Grid>

        {/* Main Content */}
        <Grid
          item={true}
          xs={8}
          sx={{
            bgcolor: "#121212",
            color: "#fff",
            p: 3,
            overflowY: "auto",
          }}
          >
            <Outlet />
        </Grid>

        {/* User Info Section */}
        <Grid
          item={true}
          xs={5}
          sx={{
            bgcolor: "#1d1d1d",
            color: "#fff",
            p: 2,
            display: "flex",
            flexDirection: "column",
            alignItems: "flex-end",
          }}
        >
          	<Outlet context={{ onSelectTrack: handleSongSelection }} />
              {/* Simple Web Player */}
      {currentTrackUri && (
        <SimpleWebPlayer trackUri={currentTrackUri} />
      )}
        </Grid>
      </Grid>
    </Box>
  );
}