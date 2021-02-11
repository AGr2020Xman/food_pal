import React from "react";
import { Redirect } from "react-router-dom";
import { useAppContext } from "./store";

function Auth(ComposedComponent) {
  const [state, dispatch] = useAppContext();

  return function Authentication(props) {
    console.log("inside Auth function", state);
    console.log("dispatch inside auth", dispatch);
    return state.isAuthenticated ? (
      <ComposedComponent {...props} state={state} dispatch={dispatch} />
    ) : (
      <Redirect to="/signin" />
    );
  };
}

export default Auth;
