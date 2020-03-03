import React, { useEffect } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { connectPlayer } from "../reducers/PlayerReducer";
import usePlayer from "../hooks/usePlayer";

const DashboardPage = () => {
  // const { player, playTrack } = usePlayer();
  const dispatch = useDispatch();
  const player = useSelector(state => state.player.playerInstance);
  const { playTrack } = usePlayer(player);

  useEffect(() => {
    setTimeout(() => {
      dispatch(connectPlayer());
    }, 100);
  }, []);

  if (!player) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      Dashboard
      {console.log("axios ", axios.defaults.headers.common)}
      Dashboard
      <button
        onClick={() => playTrack(["spotify:track:7xGfFoTpQ2E7fRF5lN10tr", "spotify:track:11dFghVXANMlKmJXsNCbNl"])}
      >
        Play Song
      </button>
      {/* <button onClick={() => player.togglePlay()}>Play/Resume</button>
      <button onClick={() => console.log(player)}>Get player state</button> */}
    </div>
  );
};

export default DashboardPage;
