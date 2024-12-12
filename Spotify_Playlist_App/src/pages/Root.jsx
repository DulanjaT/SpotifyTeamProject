import React, { useState } from "react";
import { Outlet } from "react-router";
import Header from "../components/Header/Header"
import SimpleWebPlayer from "../components/WebPlayback/SimplePlayer";

export default function Root() {
  const [currentTrackUri, setCurrentTrackUri] = useState(null);

  // Function to update the song URI dynamically
  const handleSongSelection = (trackUri) => {
    setCurrentTrackUri(trackUri);
  };

  return (
    <div>
      {/* Header Component */}
      {/* <Header /> */}

      {/* Main Content */}
      <div style={{ marginBottom: "100px" }}>
        {/* Pass the handleSongSelection to child routes */}
		<Outlet context={{ onSelectTrack: handleSongSelection }} />
      </div>

      {/* Simple Web Player */}
     {/*  {currentTrackUri && (
        <SimpleWebPlayer trackUri={currentTrackUri} />
      )} */}
    </div>
  );
}