import React, { useState } from "react";
import { Box, Drawer, AppBar, Toolbar, Typography, List, ListItem, ListItemText} from "@mui/material";
import { Outlet, useOutletContext } from "react-router";
import SimpleWebPlayer from "../components/WebPlayback/SimplePlayer";
import Header from "../components/Header/Header";
import UserPlaylists from "../components/UserPlaylists/UserPlaylists";
import { Link } from "react-router";
const drawerWidth = 240;

export default function TestMainLayout() {
    const [currentTrackUri, setCurrentTrackUri] = useState(null);

    // Function to update the song URI dynamically
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
    <ListItem button component={Link} to="/home" sx={{ textDecoration: "none", color: "inherit" }}>
        <ListItemText primary="Home" />
    </ListItem>
    <ListItem button component={Link} to="/search" sx={{ textDecoration: "none", color: "inherit" }}>
        <ListItemText primary="Search" />
    </ListItem>
    <ListItem button component={Link} to="/playlists" sx={{ textDecoration: "none", color: "inherit" }}>
        <ListItemText primary="Library" />
    </ListItem>
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

            {/* Right Sidebar */}
     {/*        <Box
                sx={{
                    gridArea: "rightSidebar",
                    bgcolor: "#1c1c1c",
                    overflowY: "auto",
                    padding: 2,
                }}
            >
                <UserPlaylists />
            </Box> */}

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