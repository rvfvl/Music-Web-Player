const parseTokenHashAndSave = () => {
  const hashToObject = window.location.hash
    .replace("#", "")
    .split("&")
    .map(v => v.split("="))
    .reduce((acc, [key, value]) => ({ ...acc, [key]: value }), {});

  if (hashToObject.hasOwnProperty("access_token")) {
    localStorage.setItem("access_token", hashToObject.access_token);
    console.log("got token", hashToObject.access_token);
    //axios.defaults.headers.common["Authorization"] = `Bearer ${hashToObject.access_token}`;
  }

  window.location.hash = "";
};

export default parseTokenHashAndSave;
