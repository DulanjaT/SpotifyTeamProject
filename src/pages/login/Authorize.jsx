import maintainToken from "../../spotify/auth/maintainToken";
import authorizePKCE from "../../spotify/auth/authorizePKCE";
import { Box, Button, Typography } from "@mui/material";

export default function Authorize()
{
	if (!import.meta.env.VITE_SPOTIFY_CLIENT_ID
		|| !import.meta.env.VITE_SPOTIFY_REDIRECT_URI
		|| !import.meta.env.VITE_SPOTIFY_SCOPE)
		return (
			<p>Missing environment variables</p>
		);
	if (window.localStorage.getItem("accessToken")
		&& window.localStorage.getItem("refreshToken")
		&& window.localStorage.getItem("tokenExpiration"))
	{
		const tokenExpiration = parseInt(window.localStorage.getItem("tokenExpiration"));
		if (tokenExpiration && tokenExpiration > Date.now())
		{
			maintainToken({
				access_token: window.localStorage.getItem("accessToken"),
				refresh_token: window.localStorage.getItem("refreshToken"),
				expires_in: (tokenExpiration - Date.now()) / 1000
			});
			window.location.href = "/App";
			return ;
		}
	}
	return (
		<Box
			display="flex"
			flexDirection="column"
			alignItems="center"
			justifyContent="center"
			height="100%"
			>
			
			<Typography
				variant="h5"
				
				
			>Authorize Spotify to continue
				</Typography>
			<Button
			onClick={authorizePKCE}
			variant="contained"
			color="primary"
			size="large"
			>Authorize</Button>
		</Box>
	);
}
