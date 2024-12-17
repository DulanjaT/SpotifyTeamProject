import React, { useState, useEffect } from "react";
import {
  Box,
  Drawer,
  AppBar,
  Toolbar,
  Typography,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
} from "@mui/material";
import { Home, Search, LibraryMusic } from "@mui/icons-material";
import { Outlet } from "react-router";
import SimpleWebPlayer from "../components/WebPlayback/SimplePlayer";
import Header from "../components/Header/Header";
import { Link } from "react-router";
const drawerWidth = 240;

export default function TestMainLayout() {
  const [currentTrackUri, setCurrentTrackUri] = useState(null);
  const [playlists, setPlaylists] = useState([]);

  useEffect(() => {
    const fetchPlaylists = async () => {
      try {
        const response = await fetch("https://api.spotify.com/v1/me/playlists", {
          headers: {
            Authorization: `Bearer ${process.env.VITE_SPOTIFY_ACCESS_TOKEN}`,
          },
        });

        if (!response.ok) {
          throw new Error("Failed to fetch playlists");
        }

        const data = await response.json();
        setPlaylists(data.items);
      } catch (error) {
        console.error("Error fetching playlists:", error);
      }
    };

    fetchPlaylists();
  }, []);

  const handleSongSelection = (trackUri) => {
    setCurrentTrackUri(trackUri);
  };

  return (
    <Box
      sx={{
        display: "grid",
        gridTemplateRows: "65px 1fr 170px", // Adjust header height to match Toolbar
        gridTemplateColumns: `${drawerWidth}px 1fr 200px`, // Sidebar, content, and right sidebar
        gridTemplateAreas: `
          "header header header"
          "sidebar content content"
          "player player player"
        `,
        height: "100vh",
        overflow: "hidden",
        bgcolor: "#121212",
        color: "#fff",
      }}
    >
      {/* Header */}
      <AppBar
        position="static"
        sx={{
          gridArea: "header",
          backgroundColor: "#1c1c1c",
          boxShadow: "none",
          width: "100%",
        }}
      >
        <Toolbar
          sx={{
            minHeight: "48px", // Reduce the height
            padding: "0 !important", // Remove any default padding
          }}
        >
          <Header />
        </Toolbar>
      </AppBar>

      {/* Left Sidebar */}
      <Box
        sx={{
          gridArea: "sidebar",
          bgcolor: "#1c1c1c",
          padding: "16px",
          display: "flex",
          flexDirection: "column",
          color: "#fff",
        }}
      >
        <List>
          {/* Home */}
          <ListItem
            button
            component={Link}
            to="/home"
            sx={{ textDecoration: "none", color: "inherit" }}
          >
            <ListItemIcon sx={{ color: "inherit" }}>
              <Home />
            </ListItemIcon>
            <ListItemText primary="Home" />
          </ListItem>

          {/* Search */}
          <ListItem
            button
            component={Link}
            to="/search"
            sx={{ textDecoration: "none", color: "inherit" }}
          >
            <ListItemIcon sx={{ color: "inherit" }}>
              <Search />
            </ListItemIcon>
            <ListItemText primary="Search" />
          </ListItem>

          {/* Library */}
          <ListItem
            button
            component={Link}
            to="/playlists"
            sx={{ textDecoration: "none", color: "inherit" }}
          >
            <ListItemIcon sx={{ color: "inherit" }}>
              <LibraryMusic />
            </ListItemIcon>
            <ListItemText primary="Library" />
          </ListItem>
        </List>

        {/* Playlists */}
        <Typography variant="h6" sx={{ marginTop: 2, marginBottom: 1, fontWeight: "bold" }}>
          Playlists
        </Typography>
        <List>
          {playlists.map((playlist) => (
            <ListItem button key={playlist.id} sx={{ color: "#fff", textDecoration: "none" }}>
              <ListItemText primary={playlist.name} />
            </ListItem>
          ))}
        </List>
      </Box>

      {/* Main Content */}
      <Box
        sx={{
          gridArea: "content",
          overflowY: "auto",
          padding: 0,
          bgcolor: "#181818",
        }}
      >
        <Outlet context={{ onSelectTrack: handleSongSelection }} />
      </Box>

      {/* Player */}
      <Box
        sx={{
          gridArea: "player",
          bgcolor: "#1c1c1c",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          height: "100%",
        }}
      >
        <SimpleWebPlayer trackUri={currentTrackUri} />
      </Box>
    </Box>
  );
}
