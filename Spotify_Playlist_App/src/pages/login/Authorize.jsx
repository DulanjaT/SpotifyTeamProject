import maintainToken from "../../spotify/auth/maintainToken";
import authorizePKCE from "../../spotify/auth/authorizePKCE";

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
		<div>
			<p>Explain access requirements here</p>
			<button onClick={authorizePKCE}>Authorize</button>
		</div>
	);
}
