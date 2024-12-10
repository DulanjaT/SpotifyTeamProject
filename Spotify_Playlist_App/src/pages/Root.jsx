import { Outlet } from "react-router";
import Header from "../components/Header/Header";
import Player from "../components/Player/Player";

const Root = () => {
  return (
    <div style={{ display: "flex", flexDirection: "column", height: "100vh" }}>
      {/* Sticky Header */}
      <div style={{ position: "sticky", top: 0, zIndex: 10 }}>
        <Header />
      </div>

      {/* Main Content */}
      <div style={{ flex: 1, overflowY: "hidden" }}>
        <Outlet />
      </div>

      {/* Sticky Player */}
      <div style={{ position: "sticky", bottom: 0, zIndex: 10 }}>
        <Player />
      </div>
    </div>
  );
};

export default Root;
