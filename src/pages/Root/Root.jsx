import React, { useState } from "react";
import { Box, List, ListItem, ListItemText } from "@mui/material";
import { Outlet, useOutletContext } from "react-router";
import SimpleWebPlayer from "../../components/WebPlayback/SimplePlayer";
import Header from "../../components/Header/Header";
import { Link } from "react-router";

import SpotifyAuthContext from "../../contexts/SpotifyAuthContext";
import styles from "./Root.module.css"
import useSpotifyAuth from "../../hooks/useSpotifyAuth";
import Library from "../../components/Library/Library";

export default function Root()
{
	const { spotifyAuth, setSpotifyAuth, spotifyAuthErr, setSpotifyAuthErr, setupInitialToken, restoreToken, logout } = useSpotifyAuth();
	const [currentTrackUri, setCurrentTrackUri] = useState(null);

	return (
		<SpotifyAuthContext.Provider value={{ spotifyAuth, setSpotifyAuth, spotifyAuthErr, setSpotifyAuthErr, setupInitialToken, restoreToken, logout }}>
			<Box className={styles.Grid}>
				<Header />
				<Box className={styles.Sidebar}>
					<Library />
				</Box>
				<Box className={styles.Content}>
					<Outlet context={{ onSelectTrack: setCurrentTrackUri }} />
				</Box>
				{/* Player */}
				<Box
			sx={{
				gridArea: "player",
				display: "flex",
				flexDirection: "column", // Ensures text and controls are stacked vertically
				alignItems: "center",
				justifyContent: "center",
				height: "100%", // Matches the allocated grid row height
				overflow: "hidden", // Prevents content from spilling out
				padding: "8px", // Add padding to avoid content touching edges
				boxSizing: "border-box", // Include padding in the layout
				bgcolor: "main.default"
			}}>
					
				</Box>
			</Box>
		</SpotifyAuthContext.Provider>
	);
}
//<SimpleWebPlayer trackUri={currentTrackUri} />