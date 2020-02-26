import React from "react";
import axios from "axios";

const AuthorizationPage = () => {
  return <div>{console.log(axios.defaults.headers.common)}Authorization Page</div>;
};

export default AuthorizationPage;
