import React from "react";
import { Box, Drawer, AppBar, Toolbar, Typography, List, ListItem, ListItemText } from "@mui/material";
import { Outlet } from "react-router";
import SimpleWebPlayer from "../components/WebPlayback/SimplePlayer";
import Header from "../components/Header/Header";

const drawerWidth = 240;

export default function TestMainLayout() {
  return (
    <Box sx={{ display: "flex", flexDirection: "column", height: "100vh", backgroundColor: "#121212" }}>
      {/* AppBar */}
      <AppBar
        position="fixed"
        sx={{
          zIndex: (theme) => theme.zIndex.drawer + 1,
          backgroundColor: "#1c1c1c",
          color: "#fff",
          boxShadow: "none",
          marginLeft: drawerWidth,
          width: `calc(100% - ${drawerWidth}px)`, // Adjust width for sidebar
        }}
      >
       
        <Header />
        
      </AppBar>

      {/* Sidebar */}
      <Drawer
        variant="permanent"
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          [`& .MuiDrawer-paper`]: {
            width: drawerWidth,
            boxSizing: "border-box",
            backgroundColor: "#1c1c1c",
            color: "#fff",
          },
        }}
      >
        <Toolbar />
        <List>
          {["Home", "Search", "Library"].map((text) => (
            <ListItem button key={text}>
              <ListItemText primary={text} />
            </ListItem>
          ))}
        </List>
      </Drawer>

      {/* Main Content */}
      <Box
        component="main"
        sx={{
          flex: 1,
          marginLeft: drawerWidth,
          marginTop: 8, // Push below AppBar
          marginBottom: "100px", // Reserve space for player bar
          backgroundColor: "#181818",
          color: "#fff",
          overflow: "auto",
        }}
      >
        <Outlet /> {/* Render the routed content here */}
      </Box>

      {/* Player Bar */}
      <Box
        sx={{
          position: "fixed",
          bottom: 0,
          left: 0, // Full width from left to right
          right: 0,
          height: "100px",
          backgroundColor: "#1c1c1c",
          color: "#fff",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          zIndex: 1300,
          
        }}
      >
        <SimpleWebPlayer />
      </Box>
    </Box>
  );
}

VERSION 2

import React, { useState } from "react";
import { Box, Drawer, AppBar, Toolbar, Typography, List, ListItem, ListItemText, Grid } from "@mui/material";
import { Outlet, useOutletContext } from "react-router";
import SimpleWebPlayer from "../components/WebPlayback/SimplePlayer";
import Header from "../components/Header/Header";

const drawerWidth = 240;

export default function TestMainLayout() {
    const [currentTrackUri, setCurrentTrackUri] = useState(null);

    // Function to update the song URI dynamically
    const handleSongSelection = (trackUri) => {
      setCurrentTrackUri(trackUri);
    };
  return (
    <Box sx={{ display: "flex", flexDirection: "column", height: "100vh", overflow: "hidden" }}>
      {/* Header */}
      <AppBar
        position="fixed"
        sx={{
          backgroundColor: "#1c1c1c",
          color: "#fff",
          boxShadow: "none",
          zIndex: (theme) => theme.zIndex.drawer + 1,
        }}
      >
        <Header />
      </AppBar>

      {/* Main Layout */}
      <Box sx={{ display: "flex", flexGrow: 1, marginTop: "64px", overflow: "hidden" }}>
        {/* Left Sidebar */}
        <Box
          sx={{
            width: drawerWidth,
            backgroundColor: "#1c1c1c",
            color: "#fff",
            height: "calc(100vh - 164px)", // Deduct header and player height
            overflowY: "auto",
          }}
        >
          <Drawer
            variant="permanent"
            sx={{
              [`& .MuiDrawer-paper`]: {
                width: drawerWidth,
                boxSizing: "border-box",
                backgroundColor: "#1c1c1c",
                color: "#fff",
              },
            }}
          >
            <Toolbar />
            <List>
              {["Home", "Search", "Playlists"].map((text) => (
                <ListItem button key={text}>
                  <ListItemText primary={text} />
                </ListItem>
              ))}
            </List>
          </Drawer>
        </Box>
{/* 2nd Sidebar Menu */}
<Box
          sx={{
        
            width: "200px",
            backgroundColor: "#1c1c1c",
            color: "#fff",
            height: "calc(100vh - 164px)", // Deduct header and player height
            overflowY: "auto",
          }}
        >
          <List>
            {["Navigation 1", "Navigation 2", "Navigation 3"].map((text) => (
              <ListItem button key={text}>
                <ListItemText primary={text} />
              </ListItem>
            ))}
          </List>
        </Box>

        {/* Main Content */}
        <Box
          sx={{
            flexGrow: 1,
            backgroundColor: "#181818",
            color: "#fff",
            padding: 2,
            height: "calc(100vh - 164px)", // Deduct header and player height
            overflowY: "auto",
          }}
        >
        		<Outlet context={{ onSelectTrack: handleSongSelection }} />
        </Box>

        
      </Box>

      {/* Player */}
      <Box
        sx={{
          position: "absolute",
          bottom: 0,
          left: 0,
          width: "100%",
          height: "170px", // Adjust as needed
          backgroundColor: "#1c1c1c",
          color: "#fff",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          zIndex: 1300,
        }}
      >
        <SimpleWebPlayer  trackUri={currentTrackUri}/>
      </Box>
    </Box>
  );
}