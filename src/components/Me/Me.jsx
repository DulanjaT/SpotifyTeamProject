import { Box, Typography, Avatar, Button, Menu, MenuItem } from "@mui/material";
import { useContext, useEffect, useState } from "react";
import SpotifyAuthContext from "../../contexts/SpotifyAuthContext";
import styles from "./Me.module.css";

export default function Me()
{
	const { spotifyAuth, logout } = useContext(SpotifyAuthContext);
	const [ anchor, setAnchor ] = useState(null);

	if (!spotifyAuth?.id)
		return ;
	return (
		<>
			<Button variant="outlined" onClick={(e) => setAnchor(e.currentTarget)}>
				<Avatar src={spotifyAuth.image} alt="User Avatar" className={styles.Avatar} />
				<Typography className={styles.Username}>{spotifyAuth.name}</Typography>
			</Button>
			<Menu
				anchorEl={anchor}
				open={!!anchor}
				onClose={() => setAnchor(null)}>
				<MenuItem onClick={logout}>Logout</MenuItem>
			</Menu>
		</>);
}
