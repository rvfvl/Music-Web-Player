import React, { useEffect } from "react";
import { Route, BrowserRouter, Switch } from "react-router-dom";
import addTokenToHeaders from "./utils/addTokenToHeaders";
import { fetchUserProfile } from "./reducers/AuthReducer";
import { useDispatch } from "react-redux";

//Import routes
import PrivateRoute from "./views/PrivateRoute";
import DashboardPage from "./views/DashboardPage";
import AuthorizationPage from "./views/AuthorizationPage";

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    addTokenToHeaders();
    dispatch(fetchUserProfile());
  }, []);

  return (
    <BrowserRouter>
      <Switch>
        <PrivateRoute exact path="/" component={DashboardPage} />
        <Route exact path="/authorize" component={AuthorizationPage} />
      </Switch>
    </BrowserRouter>
  );
}

export default App;
