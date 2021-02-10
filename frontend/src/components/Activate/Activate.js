import React, { useState } from "react";
import { GET_ERRORS, SET_CURRENT_USER } from "../../actions/types";
import { useAppContext } from "../../store";
import { activateUser } from "../../utils/userFunctions";
import { setAuthToken } from "../../utils/setAuthToken";
import { useHistory } from "react-router-dom";
import jwt_decode from "jwt-decode";
import { activate } from "../../../../backend/controllers/auth";

function Activate() {
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
      [e.target.name]: e.target.value.trim(),
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const user = {
      email: formState.email,
      code: formState.code,
    };
    try {
      const response = await activateUser(user);

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
              <label htmlFor="activateCode">Activation Code</label>
              <input
                type="number"
                className="form-control"
                name="activation code"
                placeholder="Enter code sent to your email"
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
            <button type="submit" className="btn btn-lg btn-primary btn-block">
              Sign in
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Activate;
