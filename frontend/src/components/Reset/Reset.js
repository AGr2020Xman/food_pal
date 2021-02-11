import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { forgotPassword } from "../../utils/userFunctions";
import { checkFormFields } from "./checkFormFields";

function Signup(props) {
  const history = useHistory();

  const [registerState, setRegisterState] = useState({
    token: "",
    password: "",
    confirmPassword: "",
    errors: {},
    formIsValid: true,
  });

  const handleValidation = () => {
    const [errors, formIsValid] = checkFormFields(registerState);
    setRegisterState({ ...registerState, errors, formIsValid });
  };

  const onChange = (event) => {
    setRegisterState({
      ...registerState,
      [event.target.name]: event.target.value,
    });
  };

  const onSubmit = async (event) => {
    let errors = {};
    handleValidation();
    event.preventDefault();
    const userData = {
      email: registerState.email,
    };
    if (registerState.formIsValid) {
      try {
        console.log(userData);
        const res = await forgotPassword(userData);
        console.log(res.data);
        if (res.data.error) {
          errors["message"] = `${res.data.message}`;
        } else {
          console.log("Password Reset");
          setTimeout(() => {
            history.push("/reset");
          }, 2500);
        }
      } catch (error) {
        errors["message"] =
          "You should be able to reset if you have the reset code for the correct email address";
        setRegisterState({ ...registerState, errors });
      }
    } else {
      console.log("Form has errors.");
      errors["message"] = "Error with either code or unmatched passwords";
    }
  };

  return (
    <div className="container">
      <div className="row">
        <div className="mx-auto mt-5 col-md-6">
          <form noValidate onSubmit={onSubmit}>
            <h1 className="mb-3 h3 font-weight normal">
              Reset your password - don't forget the reset token sent to the
              email provided.
            </h1>
            <span style={{ color: "red" }}>
              {registerState.errors["message"]}
            </span>
            <div className="form-group">
              <label htmlFor="reset">Reset Token</label>
              <input
                type="text"
                refs="reset"
                className="form-control"
                name="reset"
                placeholder="Enter reset token"
                value={registerState.token}
                onChange={onChange}
              />
              <span style={{ color: "red" }}>
                {registerState.token["token"]}
              </span>
            </div>
            <div className="form-group">
              <label htmlFor="password">Password</label>
              <input
                type="password"
                refs="password"
                className="form-control"
                name="password"
                placeholder="Enter Password"
                value={registerState.password}
                onChange={onChange}
              />
              <span style={{ color: "red" }}>
                {registerState.errors["password"]}
              </span>
            </div>
            <div className="form-group">
              <label htmlFor="confirmPassword">Confirm Password</label>
              <input
                type="password"
                refs="confirmPassword"
                className="form-control"
                name="confirmPassword"
                placeholder="Confirm your password"
                value={registerState.confirmPassword}
                onChange={onChange}
              />
              <span style={{ color: "red" }}>
                {registerState.errors["confirmPassword"]}
              </span>
            </div>
            <button type="submit" className="btn btn-lg btn-primary btn-block">
              Submit
            </button>
            <p className="text-center">
              Remember your password?
              <em>
                <a href="/signin"> Sign in here</a>
              </em>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Signup;
