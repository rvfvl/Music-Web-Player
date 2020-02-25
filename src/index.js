import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import AuthProvider, { AuthContext } from "./context/AuthProvider";

ReactDOM.render(
  <AuthProvider>
    <App />
  </AuthProvider>,
  document.getElementById("root")
);
