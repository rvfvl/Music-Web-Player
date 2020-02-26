import React from "react";
import { Route, BrowserRouter, Switch } from "react-router-dom";
import AuthProvider from "./context/AuthProvider";
import PrivateRoute from "./views/PrivateRoute";
import DashboardPage from "./views/DashboardPage";
import AuthorizationPage from "./views/AuthorizationPage";

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Switch>
          <PrivateRoute exact path="/" component={DashboardPage} />
          <Route exact path="/authorize" component={AuthorizationPage} />
        </Switch>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
