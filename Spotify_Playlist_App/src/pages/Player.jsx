/* Work in progress */

import { useEffect } from "react";

function SpotifyPlayer() {
  useEffect(() => {
    const token = localStorage.getItem("accessToken"); // Replace with your method of fetching a valid token.

    // Define the global callback for the Spotify SDK
    window.onSpotifyWebPlaybackSDKReady = () => {
      const player = new window.Spotify.Player({
        name: "Spotify Web Playback SDK",
        getOAuthToken: (cb) => {
          cb(token); // Pass the token to the SDK
        },
        volume: 0.5,
      });

      // Event listeners for player readiness and errors
      player.addListener("ready", ({ device_id }) => {
        console.log("Ready with Device ID:", device_id);
      });

      player.addListener("not_ready", ({ device_id }) => {
        console.log("Device ID has gone offline:", device_id);
      });

      player.addListener("initialization_error", ({ message }) => {
        console.error("Initialization error:", message);
      });

      player.addListener("authentication_error", ({ message }) => {
        console.error("Authentication error:", message);
      });

      player.addListener("account_error", ({ message }) => {
        console.error("Account error:", message);
      });

      // Connect the player
      player.connect();
    };
  }, []);

  return <div>Loading Spotify Player...</div>;
}

export default SpotifyPlayer;