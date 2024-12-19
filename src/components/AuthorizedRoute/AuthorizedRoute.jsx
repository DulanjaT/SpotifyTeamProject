import { useContext } from "react";
import { Navigate, Outlet } from "react-router";
import SpotifyAuthContext from "../../contexts/SpotifyAuthContext";

export default function AuthorizedRoute()
{
	const { spotifyAuth } = useContext(SpotifyAuthContext);
	if (!spotifyAuth?.access_token)
		return (
			<Navigate to="/" />
		);
	return (
		<Outlet />
	);
}
