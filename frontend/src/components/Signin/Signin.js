import React, { useState } from "react";
import { GET_ERRORS, SET_CURRENT_USER } from "../../actions/types";
import { useAppContext } from "../../store";
import { loginUser } from "../../utils/userFunctions";
import { setAuthToken } from "../../utils/setAuthToken";
import { useHistory } from "react-router-dom";
import jwt_decode from "jwt-decode";
import Button from "@material-ui/core/Button";
import { toast } from "react-toastify";

function Signin() {
  const history = useHistory();

  const [formState, setFormState] = useState({
    email: "",
    password: "",
    errors: {},
  });

  const [appState, appDispatch] = useAppContext();

  const onChange = (e) => {
    setFormState({
      ...formState,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    let errors = {};
    e.preventDefault();
    const user = {
      email: formState.email,
      password: formState.password,
    };
    try {
      const response = await loginUser(user);
      // if (response.error)
      // console.log("response log ", response);

      // Set token to localStorage
      const token = response.data.accessToken;

      // console.log("Token from response", token);
      // Set token to Auth header
      setAuthToken(token);
      // Decode token to get user data
      const decodedToken = jwt_decode(token);
      console.log("decoded", decodedToken);
      // Set current user
      await appDispatch({ type: SET_CURRENT_USER, payload: decodedToken });
      errors["success"] = "Success! Redirecting...";
      setFormState({ ...formState, errors });

      setTimeout(() => {
        history.push("/home");
      }, 2000);
    } catch (error) {
      errors["failure"] = error.response.data.message;
      setFormState({ ...formState, errors });
      // toast.dark(error.response.data.message);
      // console.log(error);
      // console.log(appState);
      appDispatch({
        type: GET_ERRORS,
        payload: error,
      });

      // return error ? console.log(error) : "";
      // console.log(appState);
      // console.log(appState.errors);
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
            <span style={{ color: "red" }}>{formState.errors["failure"]}</span>
            <button type="submit" className="btn btn-lg btn-primary btn-block">
              Sign in
            </button>
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
