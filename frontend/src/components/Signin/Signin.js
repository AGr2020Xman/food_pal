import React, { useState } from "react";
import { GET_ERRORS, SET_CURRENT_USER } from "../../actions/types";
import { useAppContext } from "../../store";
import { loginUser } from "../../utils/userFunctions";
import { setAuthToken } from "../../utils/setAuthToken";
import { useHistory } from "react-router-dom";
import jwt_decode from "jwt-decode";
import Button from "@material-ui/core/Button";

function Signin() {
  const history = useHistory();

  const [formState, setFormState] = useState({
    name: "",
    email: "",
    password: "",
  });

  const [, appDispatch] = useAppContext();

  const onChange = (e) => {
    setFormState({
      ...formState,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const user = {
      name: formState.name,
      email: formState.email,
      password: formState.password,
    };
    try {
      const response = await loginUser(user);
      // Set token to localStorage
      const token = response.accessToken;
      // Set token to Auth header
      setAuthToken(token);
      // Decode token to get user data
      const decodedToken = jwt_decode(token);
      // Set current user
      appDispatch({ type: SET_CURRENT_USER, payload: decodedToken });
      history.push("/dashboard");
    } catch (error) {
      appDispatch({
        type: GET_ERRORS,
        payload: error,
      });
    }
  };

  return (
    <div className="container">
      <div className="row">
        <div className="mx-auto mt-5 col-md-6">
          <form noValidate onSubmit={handleSubmit}>
            <h1 className="mb-3 h3 font-weight normal">Please Sign in</h1>
            <div className="form-group">
              <label htmlFor="email">Email Address</label>
              <input
                type="email"
                className="form-control"
                name="email"
                placeholder="Enter Email"
                value={formState.email}
                onChange={onChange}
              />
            </div>
            <div className="form-group">
              <label htmlFor="password">Password</label>
              <input
                type="password"
                className="form-control"
                name="password"
                placeholder="Enter Password"
                value={formState.password}
                onChange={onChange}
              />
            </div>
            <Button
              color="primary"
              variant="contained"
              className="btn-lg btn-block"
            >
              Sign in
            </Button>
          </form>
          <Button
            color="secondary"
            variant="contained"
            href="/forgot"
            className="btn-lg btn-block"
          >
            Forgot Password
          </Button>
          <p className="text-center">
            Haven't got an account?
            <em>
              <a href="/signup"> Sign up</a>
            </em>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Signin;
