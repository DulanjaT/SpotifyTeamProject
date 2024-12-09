import { useState } from "react";
import UserPlaylists from "../components/UserPlaylists/UserPlaylists";
import Player from "./Player";


export function PlaylistPlay() {
    const [currentUri, setCurrentUri] = useState(null); // State to store the currently selected song URI

    return (
        <div>
            {/* Pass a callback to UserPlaylists to set the selected song */}
            <UserPlaylists onTrackSelect={(uri) => setCurrentUri(uri)} />
            <Player uri={currentUri} /> {/* Pass the selected song URI to the Player */}
        </div>
    );
}