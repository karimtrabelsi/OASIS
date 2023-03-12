import React from "react";
import { Route, Router, Switch } from "react-router-dom";
import ForgotPassword from "../pages/ForgotPassword";
import LockScreen from "../pages/LockScreen";
import Login from "../pages/Login";
import Registration from "../pages/Registration";

const Auth = () => {
  return (
    <Router basename="/auth">
      <Switch>
        <Route exact path="/login" component={Login} />
        <Route exact path="/forgot-password" component={ForgotPassword} />
        <Route exact path="/registration" component={Registration} />
        <Route exact path="/lock-screen" component={LockScreen} />
      </Switch>
    </Router>
  );
};

export default Auth;
