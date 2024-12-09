import { useState, useEffect } from "react";
import requestWrapper from "../../spotify/requestWrapper";

export default function PlaylistTracks({ playlistId }) {
  const [tracks, setTracks] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (playlistId) {
      requestWrapper(`playlists/${playlistId}/tracks`, null, setTracks, setError);
    }
  }, [playlistId]);

  if (error) {
    return (
      <h1>
        Error {error.status}
        {error.message ? `: ${error.message}` : ""}
      </h1>
    );
  }

  if (!tracks) {
    return <h1>Loading tracks...</h1>;
  }
 console.log(tracks)
  return (
    <div>
      <h1>Tracks in Playlist</h1>
      <ul>
  {tracks.items
    .filter((item) => item.track !== null) // Filter out null tracks
    .map((item, index) => (
      <li key={item.track.id || `track-${index}`}>
        {item.track.name} by {item.track.artists.map((artist) => artist.name).join(", ")}
      </li>
    ))}
</ul>
    </div>
  );
}