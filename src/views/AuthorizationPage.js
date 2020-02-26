import React, { useEffect, useContext } from "react";
import { Link, Redirect } from "react-router-dom";
import parseTokenHashAndSave from "../utils/parseTokenHashAndSave";
import axios from "axios";
import { AuthContext } from "../context/AuthProvider";

const AuthorizationPage = () => {
  const { isLoading, user } = useContext(AuthContext);

  useEffect(() => {
    parseTokenHashAndSave();
  }, []);

  if (!isLoading && user) {
    return <Redirect to="/" />;
  }

  if (isLoading) {
    return <div>Loading</div>;
  }

  return (
    <div>
      <a href="https://accounts.spotify.com/authorize?client_id=2f1d0ed53bfc410ea3ef619488450302&redirect_uri=http://localhost:3000/authorize&scope=user-read-private%20user-read-email%20streaming&response_type=token">
        Authorize with Spotify
      </a>
      <Link to="/test">GO to test</Link>
    </div>
  );
};

export default AuthorizationPage;
