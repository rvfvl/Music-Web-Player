import React from "react";
import { Route, BrowserRouter, Switch } from "react-router-dom";
import AuthProvider from "./context/AuthProvider";
import PrivateRoute from "./views/PrivateRoute";
import DashboardPage from "./views/DashboardPage";
import AuthorizationPage from "./views/AuthorizationPage";
import Test from "./views/Test";

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Switch>
          <PrivateRoute exact path="/" component={DashboardPage} />
          <Route exact path="/authorize" component={AuthorizationPage} />
          <Route exact path="/test" component={Test} />
        </Switch>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
