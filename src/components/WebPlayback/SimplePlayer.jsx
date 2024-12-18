import React, { useEffect, useState } from "react";
import { Box, Typography, IconButton, Slider, Stack } from "@mui/material";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import PauseIcon from "@mui/icons-material/Pause";
import SkipNextIcon from "@mui/icons-material/SkipNext";
import SkipPreviousIcon from "@mui/icons-material/SkipPrevious";

export default function SimpleWebPlayer({ trackUri }) {
  const [accessToken, setAccessToken] = useState(null);
  const [player, setPlayer] = useState(null);
  const [deviceId, setDeviceId] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [currentUri, setCurrentUri] = useState(null); // Holds both trackUri and playlistUri
  const [trackDetails, setTrackDetails] = useState({
    trackName: "",
    artistName: "",
    duration: 0,
  });

  // Initialize Spotify Web Playback SDK
  useEffect(() => {
    const token = window.localStorage.getItem("accessToken");
    if (!token) {
      console.error("Access token is missing");
      return;
    }
    setAccessToken(token);

    const script = document.createElement("script");
    script.src = "https://sdk.scdn.co/spotify-player.js";
    script.async = true;
    document.body.appendChild(script);

    window.onSpotifyWebPlaybackSDKReady = () => {
      const spotifyPlayer = new window.Spotify.Player({
        name: "Simple Web Player",
        getOAuthToken: (cb) => cb(token),
      });

      spotifyPlayer.addListener("ready", ({ device_id }) => {
        console.log("Player ready with Device ID", device_id);
        setDeviceId(device_id);
      });

      spotifyPlayer.addListener("player_state_changed", (state) => {
        if (!state) return;

        setIsPlaying(!state.paused);
        setProgress(state.position / 1000); // Convert milliseconds to seconds

        setTrackDetails({
          trackName: state.track_window.current_track.name,
          artistName: state.track_window.current_track.artists
            .map((artist) => artist.name)
            .join(", "),
          duration: Math.floor(
            state.track_window.current_track.duration_ms / 1000
          ),
        });
      });

      spotifyPlayer.addListener("not_ready", ({ device_id }) => {
        console.log("Device ID has gone offline", device_id);
      });

      spotifyPlayer.connect();
      setPlayer(spotifyPlayer);
    };

    return () => {
      if (player) {
        player.disconnect();
      }
    };
  }, []);

  // Handle Playback for Both Playlist and Single Track
  useEffect(() => {
    if (currentUri && player && deviceId) {
      const body = currentUri.startsWith("spotify:playlist:")
        ? { context_uri: currentUri } // For playlist playback
        : { uris: [currentUri] }; // For single track playback

      fetch(`https://api.spotify.com/v1/me/player/play?device_id=${deviceId}`, {
        method: "PUT",

        body: JSON.stringify(body),
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Content-Type": "application/json",
        },
      })
        .then(() => console.log("Playback started for URI:", currentUri))
        .catch((error) => console.error("Error starting playback:", error));
    }
  }, [currentUri, player, deviceId, accessToken]);

  // Listen for Custom "playPlaylist" Event
  useEffect(() => {
    const handlePlayPlaylist = (event) => {
      const { playlistUri } = event.detail;
      console.log("Received playlist URI in SimpleWebPlayer:", playlistUri);
      setCurrentUri(playlistUri); // Set the current URI to the playlist URI
    };

    window.addEventListener("playPlaylist", handlePlayPlaylist);

    return () => {
      window.removeEventListener("playPlaylist", handlePlayPlaylist);
    };
  }, []);

  // Update Current URI for Single Track Playback
  useEffect(() => {
    if (trackUri) {
      setCurrentUri(trackUri);
    }
  }, [trackUri]);

  const skipToNext = async () => {
    if (player && deviceId) {
      fetch(`https://api.spotify.com/v1/me/player/next?device_id=${deviceId}`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Content-Type": "application/json",
        },
      })
        .then(() => console.log("Skipped to next track"))
        .catch((error) =>
          console.error("Error skipping to next track:", error)
        );
    }
  };

  const skipToPrevious = async () => {
    if (player && deviceId) {
      fetch(
        `https://api.spotify.com/v1/me/player/previous?device_id=${deviceId}`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${accessToken}`,
            "Content-Type": "application/json",
          },
        }
      )
        .then(() => console.log("Skipped to previous track"))
        .catch((error) =>
          console.error("Error skipping to previous track:", error)
        );
    }
  };

  const togglePlay = () => {
    if (player) {
      isPlaying ? player.pause() : player.resume();
    }
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "space-between",
        width: "100%",
        height: "100%",
        padding: "10px",
        backgroundColor: "background.paper",
      }}
    >
      {/* Track Info */}
      <Typography variant="h6" gutterBottom>
        {trackDetails.trackName}
      </Typography>
      <Typography variant="body2" color="textSecondary" gutterBottom>
        {trackDetails.artistName}
      </Typography>

      {/* Controls */}
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          gap: "50px",
          width: "100%",
          height: "100%",
        }}
      >
        <IconButton onClick={skipToPrevious}>
          <SkipPreviousIcon sx={{ color: "#fff" }} />
        </IconButton>
        <IconButton onClick={togglePlay}>
          {isPlaying ? (
            <PauseIcon sx={{ color: "#fff" }} />
          ) : (
            <PlayArrowIcon sx={{ color: "#fff" }} />
          )}
        </IconButton>
        <IconButton onClick={skipToNext}>
          <SkipNextIcon sx={{ color: "#fff" }} />
        </IconButton>
      </Box>

      {/* Progress Bar */}
      <Stack
        direction="row"
        spacing={2}
        alignItems="center"
        sx={{ mt: 2, width: "80%" }}
      >
        <Typography variant="body2">
          {Math.floor(progress / 60)}:
          {(progress % 60).toFixed(0).padStart(2, "0")}
        </Typography>
        <Slider
          value={progress}
          min={0}
          max={trackDetails.duration || 100}
          sx={{
            color: "main.primay",
            width: "80%",
            marginTop: "10px",
            height: "4px",
          }}
          onChange={(_, value) => {
            if (player) player.seek(value * 1000);
          }}
        />
        <Typography variant="body2">
          {Math.floor(trackDetails.duration / 60)}:
          {(trackDetails.duration % 60).toString().padStart(2, "0")}
        </Typography>
      </Stack>
    </Box>
  );
}
