import { useEffect, useState } from "react";
import {
  List,
  ListItem,
  ListItemText,
  Box,
  Typography,
  Button,
  Grid,
  Pagination,
  IconButton,
} from "@mui/material";
import requestWrapper from "../../spotify/requestWrapper";
import { useOutletContext } from "react-router";
import AddIcon from "@mui/icons-material/Add";
import addToQueue from "../../utilities/addToQueue";
import TinyButton from "../Button.jsx/Button";
import { PlayArrow, PlayArrowRounded,PlayCircleFilledOutlined} from "@mui/icons-material";

import PlayCircleFilledOutlinedIcon from '@mui/icons-material/PlayCircleFilledOutlined';
export default function PlaylistTracks({
  playlistId,
  playlistName,
  onBack,
  likedTracks = null,
  isLikedSongs = false,
}) {
  const { onSelectTrack } = useOutletContext(); // Get onSelectTrack from OutletContext
  const [tracks, setTracks] = useState({ items: [] });
  const [error, setError] = useState(null);
  const [totalTracks, setTotalTracks] = useState(0); // Total number of tracks
  const [page, setPage] = useState(1); // Current page
  const limit = 20; // Number of tracks per page

  // State to store the current track/playlist URI
  const [trackUri, setTrackUri] = useState(null); // Added for playlist playback

  useEffect(() => {
    if (!isLikedSongs) {
      const offset = (page - 1) * limit;
      console.log("Fetching playlist tracks with pagination...");
      requestWrapper(
        `playlists/${playlistId}/tracks?limit=${limit}&offset=${offset}`,
        null,
        (data) => {
          if (data && data.items) {
            setTracks(data); // Ensure data is valid
            setTotalTracks(data.total || 0); // Set total tracks
          } else {
            setTracks({ items: [] }); // Fallback to empty tracks
          }
        },
        (err) => {
          console.error("Error fetching tracks:", err);
          setError(err);
        }
      );
    } else {
      if (likedTracks != null) {
        setTracks({ items: likedTracks });
        setTotalTracks(likedTracks.length);
      } else {
        setError(new Error("Couldn't retrieve saved tracks"));
      }
    }
  }, [playlistId, page]);

/* Handle page change */
  const handlePageChange = (event, value) => {
    setPage(value); // Update the page state
  };

  /* Add song to player queue */
  const handleAddToQueue = (trackUri) => {
    console.log("Adding to queue:", trackUri);
    // Call Spotify API to add to queue
    addToQueue(trackUri);
  };

  if (error) {
    return (
      <Typography variant="h6" color="error">
        Error: {error.message}
      </Typography>
    );
  }

  if (!tracks) {
    return <Typography>Loading tracks...</Typography>;
  }

  // Playlist tracks play function

  // Function (WORKING) to play the playlist V#1
  // const playPlaylist = () => {
  //   const playlistUri = `spotify:playlist:${playlistId}`; // Construct playlist URI
  //   console.log("Playing playlist with URI:", playlistUri);

  //   setTrackUri(playlistUri); // Set this URI for SimpleWebPlayer
  // };

  // Function to play the playlist V#2
  const playPlaylist = () => {
    const playlistUri = `spotify:playlist:${playlistId}`;
    console.log("Playing playlist with URI:", playlistUri);

    // This will send the playlistUri to SimpleWebPlayer
    window.dispatchEvent(
      new CustomEvent("playPlaylist", { detail: { playlistUri } })
    );
  };
// Whats th
  const getBackButton = () => {
    if (!isLikedSongs) {
      return (
        <Button variant="outlined" onClick={onBack} sx={{ mb: 2 }}>
          Back to Playlists
        </Button>
      );
    }
  };

  return (
    <Box
      sx={{
        bgcolor: "background.paper",
        color: "text.primary",
        padding: 2,
        height: "100vh",
        overflowY: "none",
      }}
    >
      {/* Back Button */}

      {getBackButton()}
      {/* Playlist Tracks Header */}
      <Typography variant="subtitle1">Playlist</Typography>
      <Typography variant="h5" gutterBottom>
        {playlistName}
      </Typography>
      {/* Play Playlist Button */}
      <Button startIcon={<PlayCircleFilledOutlined />} variant="contained" onClick={playPlaylist} sx={{ mb: 2 }}>
        Play
      </Button>

      {/* Table Header */}
      <Grid
        container
        sx={{ fontWeight: "bold", p: 1, borderBottom: "1px solid #333" }}
      >
        <Grid item xs={1}>
          #
        </Grid>
        <Grid item xs={2}></Grid>
        <Grid item xs={4}>
          Title
        </Grid>
        <Grid item xs={3}>
          Album
        </Grid>
        <Grid item xs={2}></Grid>
      </Grid>
      {/* Track List */}

      <List>
        {console.log("tracks", tracks)}
        {tracks.items.map((item, index) => {
          const track = item.track;

          // Skip invalid or null tracks
          if (!track || !track.name || !track.artists || !track.album) {
            return null;
          }

          return (
            <ListItem
              key={track.id + index}
              sx={{
                display: "flex",
                alignItems: "center",
                borderBottom: "1px solid #333",
                padding: 1,
                cursor: "pointer",
                transition: "background-color 0.2s ease", // Smooth transition for hover
                "&:hover": {
                  backgroundColor: "background.highlight", // Spotify green highlight
                },
              }}
              onClick={() => onSelectTrack(track.uri)}
            >
              <Grid container alignItems="center">
                <Grid item xs={1}>
                  <Typography>{index + 1 + (page - 1) * limit}</Typography>
                </Grid>

                {/* Album Art */}
                <Grid item xs={2}>
                  {track.album.images[0] && (
                    <img
                      src={track.album.images[0].url}
                      alt={track.album.name}
                      style={{
                        width: "50px",
                        height: "50px",
                        objectFit: "cover",
                        borderRadius: "4px",
                      }}
                    />
                  )}
                </Grid>

                {/* Track Details */}
                <Grid item xs={4}>
                  <Typography variant="body1" color="text.primary">
                    {track.name}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {track.artists.map((artist) => artist.name).join(", ")}
                  </Typography>
                </Grid>

                {/* Album Name */}
                <Grid item xs={3}>
                  <Typography variant="body2" color="text.primary">
                    {track.album.name}
                  </Typography>
                </Grid>

                {/* Add to Queue Button */}
                <Grid item xs={2} sx={{ textAlign: "center" }}>
                  <TinyButton
                    icon={<AddIcon />}
                    tooltip="Add to Queue"
                    onClick={(event) => {
                      event.stopPropagation(); // Prevent triggering the ListItem's onClick
                      handleAddToQueue(track.uri);
                    }}
                  />
                </Grid>
              </Grid>
            </ListItem>
          );
        })}
      </List>

      {/* Pagination */}
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          marginTop: 2,
        }}
      >
        <Pagination
          count={Math.ceil(totalTracks / limit)} // Calculate total pages
          page={page}
          onChange={handlePageChange}
          color="primary"
        />
      </Box>
    </Box>
  );
}
