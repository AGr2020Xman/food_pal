import React, { useContext } from "react";
import { Redirect, Route } from "react-router-dom";
import { AuthContext } from "../AuthContext/AuthContext";

const AuthRoute = ({ render, ...routeProps }) => {
  const { authenticated } = useContext(AuthContext);
  return (
    <Route
      {...routeProps}
      render={() => (authenticated ? render() : <Redirect to="/signin" />)}
    />
  );
};

export default AuthRoute;
