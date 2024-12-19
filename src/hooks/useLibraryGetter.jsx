import { useContext, useState } from "react";
import requestUtil from "../spotify/requestUtil";
import SpotifyAuthContext from "../contexts/SpotifyAuthContext";

export default function useLibraryGetter()
{
	const [ data, setData ] = useState(null);
	const [ error, setError ] = useState(null);
	const { spotifyAuth } = useContext(SpotifyAuthContext);

	const clear = () => { setData(null); };

	const getLibrary = async () => {
		const library = [];
		
		try {
			const playlists = await requestUtil(spotifyAuth, "me/playlists");
			library.push(... playlists.items);
		} catch (err) {
			return (setError(err));
		}
		try {
			const albums = await requestUtil(spotifyAuth, "me/albums");
			library.push(... albums.items.map(e => e.album));
		} catch (err) {
			return (setError(err));
		}
		try {
			const liked = await requestUtil(spotifyAuth, "me/tracks");
			library.unshift({
				id: "liked",
				type: "liked",
				name: "Liked Songs",
				images: [
					{ url: "https://misc.scdn.co/liked-songs/liked-songs-640.png" }
				],
				tracks: { total: liked.total }
			});
		} catch (err) {
			return (setError(err));
		}
		setData(library);
	};

	return { getLibrary, data, error, clear };
}
