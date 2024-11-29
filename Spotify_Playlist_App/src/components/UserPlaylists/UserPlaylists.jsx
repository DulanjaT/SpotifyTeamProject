import { useEffect, useState } from "react";
import requestWrapper from "../../spotify/requestWrapper";
import PlaylistTracks from "../PlaylistTracks/PlaylistTracks";


export default function UserPlaylists() {
  const [playlists, setPlaylists] = useState(null);
  const [error, setError] = useState(null);
  const [selectedPlaylist, setSelectedPlaylist] = useState(null); // State to track the selected playlist

  useEffect(() => {
    // Fetch playlists from the Spotify API
    requestWrapper("me/playlists", null, setPlaylists, setError);
    
  }, []);

  if (error) {
    return (
      <h1>
        Error {error.status}
        {error.message ? `: ${error.message}` : ""}
      </h1>
    );
  }

  if (!playlists) {
    return <h1>Loading playlists...</h1>;
  }

  // If a playlist is selected, show the PlaylistTracks component
  if (selectedPlaylist) {
    return <PlaylistTracks playlistId={selectedPlaylist} onBack={() => setSelectedPlaylist(null)} />;
  }

  return (
    <div>
      
      <h1>Your Playlists</h1>
      <ul>
        {playlists.items
          .filter((playlist) => playlist !== null) // Filter out null items
          .map((playlist) => (
            <li key={playlist.id}>
              <button onClick={() => setSelectedPlaylist(playlist.id)}>
                {playlist.name}
              </button>
            </li>
          ))}
      </ul>
    </div>
  );
 
}