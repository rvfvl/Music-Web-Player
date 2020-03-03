import React from "react";
import ReactDOM from "react-dom";
import { configureStore } from "@reduxjs/toolkit";
import { Provider } from "react-redux";
import AuthSlice from "./reducers/AuthReducer";
import PlayerSlice from "./reducers/PlayerReducer";
import App from "./App";

console.log(AuthSlice);

const store = configureStore({
  reducer: {
    auth: AuthSlice.reducer,
    player: PlayerSlice.reducer
  }
});

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById("root")
);
