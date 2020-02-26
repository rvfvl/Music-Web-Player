import React, { useContext } from "react";
import { Route, Redirect } from "react-router-dom";
import { AuthContext } from "../context/AuthProvider";

const PrivateRoute = ({ component: Component, ...rest }) => {
  const user = useContext(AuthContext);

  console.log("private route", user);

  return (
    <Route
      {...rest}
      render={props =>
        user ? <Component {...props} /> : <Redirect to={{ pathname: "/authorize", state: { from: props.location } }} />
      }
    />
  );
};

export default PrivateRoute;
