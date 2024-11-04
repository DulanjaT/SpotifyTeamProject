import React, { useState } from 'react';
import { searchSongs } from '../../services/spotifyApi';

const SongSearch = () => {
  const [query, setQuery] = useState('');         // User input for search
  const [songs, setSongs] = useState([]);          // Array of fetched songs

  const handleSearch = async () => {
    const results = await searchSongs(query);      // Fetch songs based on user input
    setSongs(results);                             // Update state with fetched songs
  };

  return (
    <div id='songsearch'>
      <h2>Song Search</h2>
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Enter song name or artist"
      />
      <button onClick={handleSearch}>Search</button>

      <div>
        <h3>Results:</h3>
        {songs.length > 0 ? (
          <ul>
            {songs.map((song) => (
              <li key={song.id}>
                {song.name} by {song.artists.map((artist) => artist.name).join(', ')}
              </li>
            ))}
          </ul>
        ) : (
          <p>No results found</p>
        )}
      </div>
    </div>
  );
};

export default SongSearch;