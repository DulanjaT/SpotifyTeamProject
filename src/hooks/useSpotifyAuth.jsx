import { useEffect, useState } from "react";
import requestToken from "../spotify/auth/requestToken";
import refreshToken from "../spotify/auth/refreshToken";
import requestUtil from "../spotify/requestUtil";

export default function useSpotifyAuth()
{
	const [ spotifyAuth, setSpotifyAuth ] = useState(null);
	const [ spotifyAuthErr, setSpotifyAuthErr ] = useState(null);

	const handleToken = (data) => {
		const tokenExpiration = Date.now() + data.expires_in * 1000;

		window.localStorage.setItem("access_token", data.access_token);
		window.localStorage.setItem("refresh_token", data.refresh_token);
		window.localStorage.setItem("tokenExpiration", tokenExpiration);
		setSpotifyAuth(Object.assign(spotifyAuth || {}, {
			access_token: data.access_token,
			refresh_token: data.refresh_token,
			tokenExpiration: tokenExpiration
		}));
	};

	const setupInitialToken = async (code) => {
		try {
			handleToken(await requestToken(window.localStorage.getItem("code_verifier"), code));
		} catch (err) {
			setSpotifyAuth(null);
			setSpotifyAuthErr(err);
		}
	};

	const restoreToken = (access_token, refresh_token, tokenExpiration) => {
		if (tokenExpiration)
			tokenExpiration = parseInt(tokenExpiration);
		if (access_token && refresh_token && tokenExpiration && tokenExpiration > Date.now())
		{
			handleToken({access_token, refresh_token, expires_in: Math.floor((tokenExpiration - Date.now()) / 1000)});
			return (true);
		}
		return (false);
	};

	const logout = () => {
		window.localStorage.removeItem("access_token");
		window.localStorage.removeItem("refresh_token");
		window.localStorage.removeItem("tokenExpiration");
		setSpotifyAuth(null);
	};

	useEffect(() => {
		if (!spotifyAuth || spotifyAuthErr)
			return ;

		const refreshTimeout = setTimeout(async () => {
			try {
				handleToken(await refreshToken(spotifyAuth.refresh_token));
			} catch (err) {
				setSpotifyAuth(null);
				setSpotifyAuthErr(err);
			}
		}, spotifyAuth.tokenExpiration - Date.now());

		if (!spotifyAuth.id)
		{
			(async () => {
				try {
					const me = await requestUtil(spotifyAuth, "me");
					setSpotifyAuth(state => ({
						... state,
						...{
							id: me.id,
							name: me.display_name,
							image: me.images[0]?.url
						}
					}));
				} catch (err) {
					setSpotifyAuth(null);
					setSpotifyAuthErr(err);
				}
			})();
		}

		return (() => clearTimeout(refreshTimeout));
	}, [spotifyAuth]);

	return { spotifyAuth, setSpotifyAuth, spotifyAuthErr, setSpotifyAuthErr, setupInitialToken, restoreToken, logout };
}
