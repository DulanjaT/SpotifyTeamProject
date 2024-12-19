import maintainToken from "../../spotify/auth/refreshToken";
import authorizePKCE from "../../spotify/auth/authorizePKCE";
import { useContext, useEffect } from "react";
import SpotifyAuthContext from "../../contexts/SpotifyAuthContext";
import { Navigate } from "react-router";
import { Box, Button, Modal, Typography } from "@mui/material";

export default function Authorize()
{
	const { spotifyAuth, restoreToken } = useContext(SpotifyAuthContext);

	if (!import.meta.env.VITE_SPOTIFY_CLIENT_ID
		|| !import.meta.env.VITE_SPOTIFY_REDIRECT_URI
		|| !import.meta.env.VITE_SPOTIFY_SCOPE)
		return (<p>Missing environment variables</p>);
	if (spotifyAuth?.access_token)
		return (<Navigate to="/app" />);

	useEffect(() => {
		restoreToken(
			window.localStorage.getItem("access_token"),
			window.localStorage.getItem("refresh_token"),
			window.localStorage.getItem("tokenExpiration"));
	}, [spotifyAuth]);

	return (
		<div>
			<Modal open={true}>
				<Box sx={{
						bgcolor: "background.paper",
						borderRadius: 1,
						position: 'absolute',
						top: '50%',
						left: '50%',
						padding: 4,
						transform: 'translate(-50%, -50%)',
						boxShadow: 24,
						display: "flex",
						flexDirection: "column"
					}}>
					<Typography>Please log in with Spotify (Spotify logo somewhere + style this please)</Typography>
					<Button variant="outlined" onClick={authorizePKCE}>
						Authorize
					</Button>
				</Box>
			</Modal>
		</div>
	);
}
