import { useContext, useState } from "react";
import SpotifyAuthContext from "../contexts/SpotifyAuthContext";

export default function useSpotifyRequestWrapper()
{
	// On success, data contains the JSON response
	const [ data, setData ] = useState(null);
	// On failure, error is an object with property "status" containing HTTP error code and optional property "message" if available
	const [ error, setError ] = useState(null);
	const { spotifyAuth } = useContext(SpotifyAuthContext);

	const clear = () => { setData(null); };

	/**
	 * @param {string} path Api endpoint such as "me" or "users/{user_id}/playlists". May not be prefixed with a forward-slash
	 * @param {?Object} req null or Fetch RequestInit object https://developer.mozilla.org/en-US/docs/Web/API/RequestInit
	 */
	const requestWrapper = async (path, req) => {
		if (!req)
			req = {};
		if (!req.headers)
			req.headers = {};
		req.headers.Authorization = "Bearer " + spotifyAuth.access_token;
		const res = await fetch(new URL(path, "https://api.spotify.com/v1/"), req);
		if (res.ok)
		{
			const data = await res.json(); //Handle throw
			return (setData(data));
		}
	
		let error = { status: res.status };
		if (res.status == 401
			|| res.status == 403
			|| res.status == 429)
		{
			const data = await res.json();
			error.message = data.message;
		}
		setError(error);
	};

	return { requestWrapper, data, error, clear };
}
