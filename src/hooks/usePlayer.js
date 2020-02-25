import React, { useEffect, useState } from "react";

const usePlayer = () => {
  const [player, setPlayer] = useState(null);

  useEffect(() => {
    //Initialize Player Instance
    window.onSpotifyWebPlaybackSDKReady = () => {
      const playerInstance = new window.Spotify.Player({
        name: "Default Player",
        getOAuthToken: cb => cb(localStorage.getItem("access_token"))
      });

      playerInstance.addListener("ready", ({ device_id }) => {
        console.log("Ready with Device ID", device_id);
      });

      playerInstance.connect();

      setPlayer(playerInstance);
    };
  }, []);

  //Play music via player using Spotify uri.
  const playTrack = spotify_uri => {
    const {
      _options: { getOAuthToken, id }
    } = player;

    getOAuthToken(access_token => {
      fetch(`https://api.spotify.com/v1/me/player/play?device_id=${id}`, {
        method: "PUT",
        body: JSON.stringify({ uris: [...spotify_uri] }),
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${access_token}`
        }
      });
    });
  };

  // useEffect(() => {
  //   window.onSpotifyWebPlaybackSDKReady = () => {
  //     const player = new window.Spotify.Player({
  //       name: "Default Player",
  //       getOAuthToken: cb => {
  //         cb(localStorage.getItem("access_token"));
  //       }
  //     });
  //     // Error handling
  //     player.addListener("initialization_error", ({ message }) => {
  //       console.error(message);
  //     });
  //     player.addListener("authentication_error", ({ message }) => {
  //       console.error(message);
  //     });
  //     player.addListener("account_error", ({ message }) => {
  //       console.error("account_error", message);
  //     });
  //     player.addListener("playback_error", ({ message }) => {
  //       console.error("playback_error", message);
  //     });
  //     // Playback status updates
  //     player.addListener("player_state_changed", state => {
  //       console.log("player_state_changed", state);
  //     });
  //     // Ready
  //     player.addListener("ready", ({ device_id }) => {
  //       console.log("Ready with Device ID", device_id);

  //       playTrack({
  //         playerInstance: player,
  //         spotify_uri: "spotify:track:7xGfFoTpQ2E7fRF5lN10tr"
  //       });
  //     });
  //     // Not Ready
  //     player.addListener("not_ready", ({ device_id }) => {
  //       console.log("Device ID has gone offline", device_id);
  //     });
  //     // Connect to the player!
  //     player.connect();
  //   };
  // }, []);

  return { player, playTrack };
};

export default usePlayer;
