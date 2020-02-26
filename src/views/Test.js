import React from "react";
import axios from "axios";

const Test = () => {
  console.log("auth page", axios.defaults.headers.common);

  return <div>Test page</div>;
};

export default Test;
