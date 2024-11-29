import { useState, useEffect } from "react";
import requestWrapper from "../../spotify/requestWrapper";

const base_track = {
    name: "",
    album: {
        images: [ { url: "" } ]
    },
    artists: [ { name: "" } ]
};

export default function WebPlayback()
{
	const [player, setPlayer] = useState(null);
	const [paused, setPaused] = useState(null);
	const [active, setActive] = useState(null);
	const [track, setTrack] = useState(base_track);
	
	useEffect(() => {
		const script = document.createElement("script");
		script.src = "https://sdk.scdn.co/spotify-player.js";
		script.async = true;
		document.body.appendChild(script);

		window.onSpotifyWebPlaybackSDKReady = () => {
			const player = new window.Spotify.Player({
				name: "Test Name",
				getOAuthToken: cb => { cb(window.localStorage.getItem("accessToken")); },
				volume: 0.5
			});
			setPlayer(player);
	
			player.addListener("ready", ({ device_id }) => {
				console.log(`Ready with id ${device_id}`);
			});
	
			player.addListener("not_ready", ({ device_id }) => {
				console.log(`Unready with id ${device_id}`);
			});

			player.addListener('player_state_changed', (state => {
				if (!state)
					return;

				setTrack(state.track_window.current_track);
				setPaused(state.paused);

				player.getCurrentState().then(state => { (!state) ? setActive(false) : setActive(true) });
			}));
	
			player.connect();
		}
	}, []);

	return (
		<div className="main-wrapper">
			<img src={track.album.images[0].url} className="now-playing__cover" alt="" />
			<div className="now-playing__side">
				<div className="now-playing__name">{track.name}</div>
				<div className="now-playing__artist">{track.artists[0].name}</div>
			</div>
			<button className="btn-spotify" onClick={() => { player.previousTrack() }}>&lt;&lt;</button>
			<button className="btn-spotify" onClick={() => { player.togglePlay() }}>{ paused ? "PLAY" : "PAUSE" }</button>
			<button className="btn-spotify" onClick={() => { player.nextTrack() }}>&gt;&gt;</button>
		</div>
	);	
}
