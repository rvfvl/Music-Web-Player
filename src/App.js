import React, { useEffect, useContext } from "react";
import axios from "axios";
import usePlayer from "./hooks/usePlayer";
import AuthProvider, { AuthContext } from "./context/AuthProvider";

function App() {
  const user = useContext(AuthContext);
  const { player, playTrack } = usePlayer();

  const loginToSpotify = () => {
    const hashToObject = window.location.hash
      .replace("#", "")
      .split("&")
      .map(v => v.split("="))
      .reduce((acc, [key, value]) => ({ ...acc, [key]: value }), {});

    if (hashToObject.hasOwnProperty("access_token")) {
      localStorage.setItem("access_token", hashToObject.access_token);
      //axios.defaults.headers.common["Authorization"] = `Bearer ${hashToObject.access_token}`;
    }

    window.location.hash = "";
  };

  const updateHeaders = () => {
    if (localStorage.getItem("access_token")) {
      const accessToken = localStorage.getItem("access_token");

      axios.defaults.headers.common["Authorization"] = `Bearer ${accessToken}`;
    } else {
      delete axios.defaults.headers.common["Authorization"];
    }
  };

  const fetchProfile = async () => {
    const result = await axios.get("https://api.spotify.com/v1/me");
    console.log(result);
  };

  useEffect(() => {
    loginToSpotify();
    updateHeaders();
    //fetchProfile();
  }, []);

  return (
    <div>
      {console.log(axios.defaults.headers.common)}
      {console.log("user context", user)}
      {console.log("player", player)}
      <a href="https://accounts.spotify.com/authorize?client_id=2f1d0ed53bfc410ea3ef619488450302&redirect_uri=http://localhost:3000/&scope=user-read-private%20user-read-email%20streaming&response_type=token">
        Authorize with Spotify
      </a>
      <button
        onClick={() => playTrack(["spotify:track:7xGfFoTpQ2E7fRF5lN10tr", "spotify:track:11dFghVXANMlKmJXsNCbNl"])}
      >
        Play Song
      </button>
    </div>
  );
}

export default App;
