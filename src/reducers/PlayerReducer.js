import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  playerInstance: null,
  loading: "idle"
};

const playerSlice = createSlice({
  name: "player",
  initialState,
  reducers: {
    connectPlayer: state => {
      const playerInst = new window.Spotify.Player({
        name: "Default Player",
        getOAuthToken: cb => cb(localStorage.getItem("access_token")),
        volume: 0.2
      });

      playerInst.addListener("ready", ({ device_id }) => {
        console.log("Ready with Device ID", device_id);
      });

      playerInst.addListener("player_state_changed", state => {
        console.log("player_state_changed", state);
      });

      playerInst.connect();

      state.playerInstance = playerInst;
    }
  }
});

export const { connectPlayer } = playerSlice.actions;

export default playerSlice;
