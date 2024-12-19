import { useContext, useEffect } from "react";
import { Navigate } from "react-router";
import SpotifyAuthContext from "../../contexts/SpotifyAuthContext";

export default function GetToken()
{
	const { spotifyAuth, spotifyAuthErr, setupInitialToken } = useContext(SpotifyAuthContext);

	if (spotifyAuth?.access_token)
		return (<Navigate to="/app" />);
	if (spotifyAuthErr)
		return (<h1>{spotifyAuthErr.message}</h1>);
	const urlParams = new URLSearchParams(window.location.search);
	if (!urlParams.get("code"))
		return (<Navigate to="/" />);

	useEffect(() => {setupInitialToken(urlParams.get("code")), [spotifyAuth]});
	return (
		<h1>Loading</h1>
	);
}
