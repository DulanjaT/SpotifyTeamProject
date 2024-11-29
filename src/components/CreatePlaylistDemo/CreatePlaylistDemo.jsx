import { useState } from "react";
import requestWrapper from "../../spotify/requestWrapper";

export default function CreatePlaylistDemo({userID})
{
	const [data, setData] = useState(null);
	const [error, setError] = useState(null);
	
	const createPlaylist = () => requestWrapper(`users/${userID}/playlists`, {
		method: "POST",
		headers: {
			"Content-Type": "application/json"
		},
		body: JSON.stringify({
			name: "Test"
		})
	}, setData, setError);

	if (data)
	{
		return (
			<a href={data.external_urls.spotify}>{data.external_urls.spotify}</a>
		);
	} else if(error)
	{
		return (
			<h1>Error {error.status}{error.message ? ": " + error.message : null}</h1>
		);
	}
	return (
		<button onClick={createPlaylist}>Create playlist "Test" (This actually creates a playlist in your account)</button>
	);
}
