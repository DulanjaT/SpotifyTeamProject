import { useEffect, useState } from "react";
import requestWrapper from "../../spotify/requestWrapper";

export default function PlaylistTracks({ playlistId, onBack }) {
  const [tracks, setTracks] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Fetch tracks for the selected playlist
    requestWrapper(`playlists/${playlistId}/tracks`, null, setTracks, setError);
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

  return (
    <div>
      <button onClick={onBack}>Back to Playlists</button>
      <h1>Tracks in Playlist</h1>
      <ul>
        {tracks.items.map((item) => (
          <li key={item.track.id}>
            {item.track.name} by {item.track.artists.map((artist) => artist.name).join(", ")}
          </li>
        ))}
      </ul>
    </div>
  );
}