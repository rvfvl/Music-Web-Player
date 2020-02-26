import React, { useEffect, useContext } from "react";
import axios from "axios";
import usePlayer from "../hooks/usePlayer";
import AuthProvider, { AuthContext } from "../context/AuthProvider";

const DashboardPage = () => {
  const { isLoading, user } = useContext(AuthContext);
  const { player, playTrack } = usePlayer();

  if (isLoading) {
    return <div>Loading</div>;
  }

  return (
    <div>
      Dashboard
      <button
        onClick={() => playTrack(["spotify:track:7xGfFoTpQ2E7fRF5lN10tr", "spotify:track:11dFghVXANMlKmJXsNCbNl"])}
      >
        Play Song
      </button>
      <button onClick={() => player.togglePlay()}>Play/Resume</button>
      <button onClick={() => console.log(player)}>Get player state</button>
    </div>
  );
};

export default DashboardPage;
