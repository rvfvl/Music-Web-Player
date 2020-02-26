import axios from "axios";

const addTokenToHeaders = () => {
  if (localStorage.getItem("access_token")) {
    const accessToken = localStorage.getItem("access_token");

    axios.defaults.headers.common["Authorization"] = `Bearer ${accessToken}`;
  } else {
    delete axios.defaults.headers.common["Authorization"];
  }
};

export default addTokenToHeaders;
