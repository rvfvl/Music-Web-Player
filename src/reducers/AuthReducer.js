import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  isAuthenticated: false,
  accessToken: localStorage["access_token"],
  user: null,
  error: null,
  loading: "idle"
};

const AuthSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    fetchUserStarted: state => {
      if (state.loading === "idle") {
        state.loading = "loading";
      }
    },
    fetchUserSuccess: (state, action) => {
      state.user = action.payload;
      state.isAuthenticated = true;

      if (state.loading === "loading") {
        state.loading = "idle";
      }
    },
    fetchUserError: (state, action) => {
      localStorage.removeItem("access_token");
      state.isAuthenticated = false;
      state.user = null;
      state.accessToken = null;
      state.error = action.payload;

      if (state.loading === "loading") {
        state.loading = "idle";
      }
    },
    authenticate: (state, action) => {
      if (action.payload) {
        const hashToObject = action.payload
          .replace("#", "")
          .split("&")
          .map(v => v.split("="))
          .reduce((acc, [key, value]) => ({ ...acc, [key]: value }), {});

        localStorage.setItem("access_token", hashToObject.access_token);

        state.isAuthenticated = true;
        state.accessToken = hashToObject.access_token;
      }
    }
  }
});

export const { authenticate } = AuthSlice.actions;

export default AuthSlice;

export const fetchUserProfile = () => async dispatch => {
  dispatch(AuthSlice.actions.fetchUserStarted());

  try {
    const response = await axios.get("https://api.spotify.com/v1/me");

    dispatch(AuthSlice.actions.fetchUserSuccess(response.data));
  } catch (error) {
    dispatch(AuthSlice.actions.fetchUserError(error.message.toString()));
  }
};
