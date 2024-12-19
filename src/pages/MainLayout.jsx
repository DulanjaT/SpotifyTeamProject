import React, { useState } from "react";
import {
  Box,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
} from "@mui/material";
import {
  Home as HomeIcon,
  Search as SearchIcon,
  LibraryMusic as LibraryMusicIcon,
  Favorite as FavoriteIcon,
} from "@mui/icons-material";
import { Link, Outlet } from "react-router-dom";
import SimpleWebPlayer from "../components/WebPlayback/SimplePlayer";
import Header from "../components/Header/Header";

const drawerWidth = 240;

export default function TestMainLayout() {
  const [currentTrackUri, setCurrentTrackUri] = useState(null);
  const [currentTab, setCurrentTab] = useState("HOME");

  const handleSongSelection = (trackUri) => {
    setCurrentTrackUri(trackUri);
  };

  const handleSidebarClick = (selectedTab) => {
    setCurrentTab(selectedTab);
  };

  const getSideBarStyles = (tabToStyle) => {
    if (currentTab === tabToStyle) {
      return { textDecoration: "none", fontWeight: "bold", color: "#1DB954" };
    } else {
      return { textDecoration: "none", color: "inherit" };
    }
  };

  return (
    <Box
      sx={{
        display: "grid",
        gridTemplateRows: "65px 1fr 170px",
        gridTemplateColumns: `${drawerWidth}px 1fr`,
        gridTemplateAreas: `
          "header header"
          "sidebar content"
          "player player"
        `,
        height: "100vh",
        overflow: "hidden",
        bgcolor: "background.default",
        color: "#fff",
      }}
    >
      {/* Header */}
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
          <ListItem
            component={Link}
            to="/home"
            sx={getSideBarStyles("HOME")}
            onClick={() => handleSidebarClick("HOME")}
          >
            <ListItemIcon>
              <HomeIcon sx={{ color: currentTab === "HOME" ? "#1DB954" : "inherit" }} />
            </ListItemIcon>
            <ListItemText primary="Home" />
          </ListItem>
          <ListItem
            component={Link}
            to="/search"
            sx={getSideBarStyles("SEARCH")}
            onClick={() => handleSidebarClick("SEARCH")}
          >
            <ListItemIcon>
              <SearchIcon sx={{ color: currentTab === "SEARCH" ? "#1DB954" : "inherit" }} />
            </ListItemIcon>
            <ListItemText primary="Search" />
          </ListItem>
          <ListItem
            component={Link}
            to="/playlists"
            sx={getSideBarStyles("LIBRARY")}
            onClick={() => handleSidebarClick("LIBRARY")}
          >
            <ListItemIcon>
              <LibraryMusicIcon
                sx={{ color: currentTab === "LIBRARY" ? "#1DB954" : "inherit" }}
              />
            </ListItemIcon>
            <ListItemText primary="Library" />
          </ListItem>
          <ListItem
            component={Link}
            to="/liked-songs"
            sx={getSideBarStyles("MY_PLAYLIST")}
            onClick={() => handleSidebarClick("MY_PLAYLIST")}
          >
            <ListItemIcon>
              <FavoriteIcon
                sx={{ color: currentTab === "MY_PLAYLIST" ? "#1DB954" : "inherit" }}
              />
            </ListItemIcon>
            <ListItemText primary="Liked Songs" />
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
          bgcolor: "main.default",
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
