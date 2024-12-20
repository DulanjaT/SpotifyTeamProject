import requestWrapper from "./requestWrapper";

export const fetchPlaylists = async () => {
  return await requestWrapper("me/playlists");
};

export const createPlaylist = async (name, description) => {
  const userId = localStorage.getItem("userId");
  const data = {
    name,
    description,
    public: false, // Create a private playlist
  };
  return await requestWrapper(`users/${userId}/playlists`, "POST", data);
};

export const addTracksToPlaylist = async (playlistId, trackUris) => {
  const data = { uris: trackUris };
  return await requestWrapper(`playlists/${playlistId}/tracks`, "POST", data);
};
