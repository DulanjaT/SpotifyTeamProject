# SpotifyTeamProject
## Installation instructions
In Spotify_Playlist_App/
1. Run in terminal:
```shell
npm install
```
2. Create .env file in root of project.
3. Copy this text into .env file:

VITE_SPOTIFY_CLIENT_ID=1a0452d5280943149451e81f4c9b52bf
VITE_SPOTIFY_SCOPE=playlist-read-private playlist-modify-private playlist-modify-public streaming user-read-playback-state user-modify-playback-state user-read-currently-playing app-remote-control user-top-read user-read-recently-played user-library-modify user-library-read user-read-email user-read-private
VITE_SPOTIFY_REDIRECT_URI=http://localhost:5173/getToken

4. In terminal:
```shell
npm run dev
```
5. Open localhost:5173 in browser