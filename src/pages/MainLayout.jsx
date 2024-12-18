import React, { useState } from "react";
import {
  Box,
  Drawer,
  AppBar,
  Toolbar,
  Typography,
  List,
  ListItem,
  ListItemText,
} from "@mui/material";
import { Outlet, useOutletContext } from "react-router";
import SimpleWebPlayer from "../components/WebPlayback/SimplePlayer";
import Header from "../components/Header/Header";
import UserPlaylists from "../components/UserPlaylists/UserPlaylists";
import { Link } from "react-router";

/* Adjust this to make the sidebar bigger/smaller */
const drawerWidth = 170;

export default function TestMainLayout() {
  const [currentTrackUri, setCurrentTrackUri] = useState(null);

  const [currentTab, setCurrentTab] = useState("HOME");

  // Function to update the song URI dynamically
  const handleSongSelection = (trackUri) => {
    setCurrentTrackUri(trackUri);
  };

  const handleSidebarClick = (selectedTab) => {
    setCurrentTab(selectedTab);
  };

  const getSideBarStyles = (tabToStyle) => {
    if (currentTab === tabToStyle) {
      return { textDecoration: "none", fontWeight: "bold", color: "inherit" };
    } else {
      return { textDecoration: "none", color: "inherit" };
    }
  };

  return (
    <Box
      sx={{
        display: "grid",
        gridTemplateRows: "65px 1fr 130px", // Adjust header height to match Toolbar
        gridTemplateColumns: `${drawerWidth}px 1fr 200px`, // Sidebar, content, and right sidebar
        gridTemplateAreas: `
          "header header header"
          "sidebar content content"
          "player player player"
        `,
        height: "100vh",
        overflow: "hidden",
        bgcolor: "background.default",
        color: "#fff",
      }}
    >
      {/* Header */}
      {/* <AppBar
        position="static"
        sx={{
          gridArea: "header",
          backgroundColor: "background.paper",
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
      </AppBar> */}
      <Header />

      {/* Left Sidebar */}
      <Box
        sx={{
          gridArea: "sidebar",
          bgcolor: "background.paper",
          padding: "16px",
          display: "flex",
          flexDirection: "column",
          color: "text.primary",
          margin: 2.5,
          borderRadius: 1,
        }}
      >
        <List>
          <ListItem component={Link} to="/home" sx={getSideBarStyles("HOME")}>
            <ListItemText
              primary="Home"
              onClick={() => handleSidebarClick("HOME")}
            />
          </ListItem>
          <ListItem
            component={Link}
            to="/search"
            sx={getSideBarStyles("SEARCH")}
          >
            <ListItemText
              primary="Search"
              onClick={() => handleSidebarClick("SEARCH")}
            />
          </ListItem>
          <ListItem
            component={Link}
            to="/playlists"
            sx={getSideBarStyles("LIBRARY")}
          >
            <ListItemText
              primary="Library"
              onClick={() => handleSidebarClick("LIBRARY")}
            />
          </ListItem>
          <ListItem
            component={Link}
            to="/liked-songs"
            sx={getSideBarStyles("MY_PLAYLIST")}
          >
            <ListItemText
              primary="Liked songs"
              onClick={() => handleSidebarClick("MY_PLAYLIST")}
            />
          </ListItem>
        </List>
      </Box>

      {/* Main Content */}
      <Box
        sx={{
          gridArea: "content",
          overflowY: "auto",
          padding: "16px",
          bgcolor: "background.paper",
          margin: 2.5,
          borderRadius: 1,
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
    flexDirection: "column", // Ensures text and controls are stacked vertically
    alignItems: "center",
    justifyContent: "center",
    height: "100%", // Matches the allocated grid row height
    overflow: "hidden", // Prevents content from spilling out
    padding: "8px", // Add padding to avoid content touching edges
    boxSizing: "border-box", // Include padding in the layout
    bgcolor: "main.default"
  }}
>
        <SimpleWebPlayer trackUri={currentTrackUri} />
      </Box>
    </Box>
  );
}
