# Spotify Team Project: SimplePlayer

A collaborative Spotify application that allows users to browse, search, and manage playlists with an integrated web player.


## Features
- User Authentication: Authenticate users with Spotify using OAuth.
- Browse Music: Navigate through Home, Search, Library, and Liked Songs tabs.
- Playlist Management: View and manage user playlists.
- Web Player: Play and control tracks directly within the app.

## Tech Stack
- Frontend: React, Material-UI
- Backend: Node.js, Express
- API Integration: Spotify Web API
- Environment Management: Vite

## Installation Instructions

1.	Clone the repository:

```shell
git clone https://github.com/your-repo/SpotifyTeamProject.git
cd SpotifyTeamProject
```

2.	Install dependencies:

```shell
npm install
```
3.	Set up the environment variables:

- Create a .env file in the project root.
- Add the following content to .env:

```shell
VITE_SPOTIFY_CLIENT_ID=your-client-id
VITE_SPOTIFY_SCOPE=playlist-read-private playlist-modify-private playlist-modify-public streaming user-read-playback-state user-modify-playback-state user-read-currently-playing app-remote-control user-top-read user-read-recently-played user-library-modify user-library-read user-read-email user-read-private
VITE_SPOTIFY_REDIRECT_URI=http://localhost:5173/getToken
```
4.	Run the development server:
```shell
npm run dev
```
5.	Access the app in your browser:
```shell
Open http://localhost:5173.
```

## Project Structure

SpotifyTeamProject/
├── public/                # Static assets
├── src/
│   ├── components/        # Reusable components (e.g., Header, Sidebar, Player)
│   ├── pages/             # Route-specific components
│   ├── utils/             # Helper functions and constants
│   └── App.jsx            # Main application file
├── .env                   # Environment variables
├── package.json           # Node.js dependencies and scripts
└── README.md              # Project documentation

## How it Works

1. Authentication: The app uses Spotify’s OAuth to grant access to user accounts and fetch data.
2.	Dynamic Routing: React Router is used to handle navigation between different sections like Home, Search, Library, and Liked Songs.
3.	Spotify API: All data (playlists, songs, playback) is fetched using the Spotify Web API.
4.	Material-UI: Provides a sleek and responsive UI design.

## Available Scripts

-	npm run dev - Start the development server.
-	npm run build - Build the project for production.
-	npm run preview - Preview the production build locally.

## Contributing

1.	Fork the repository.
2.	Create a feature branch:

```shell
git checkout -b feature/your-feature
```

3.	Commit your changes:
```shell
git commit -m "Add your changes here"
```

4. Push the branch:
```shell
git push origin feature/your-feature
```

5. Open a pull request.

## License 
This project is licensed under the MIT License.

## Acknowledgements
-	Spotify Web API: https://developer.spotify.com/documentation/web-api
-	Material-UI: https://mui.com/material-ui/#/
-	React Router: https://reactrouter.com/


****************************************
******** TO BE DELETED ****************
****************************************

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