import React, { useEffect } from "react";
import { Redirect } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { authenticate } from "../reducers/AuthReducer";

const AuthorizationPage = ({ location }) => {
  const dispatch = useDispatch();
  const isAuthenticated = useSelector(state => state.auth.isAuthenticated);

  useEffect(() => {
    dispatch(authenticate(location.hash));
  }, [location.hash]);

  if (isAuthenticated) {
    return <Redirect to="/" />;
  }

  return (
    <div>
      <a href="https://accounts.spotify.com/authorize?client_id=2f1d0ed53bfc410ea3ef619488450302&redirect_uri=http://localhost:3000/authorize&scope=user-read-private%20user-read-email%20streaming&response_type=token">
        Authorize with Spotify
      </a>
    </div>
  );
};

export default AuthorizationPage;
