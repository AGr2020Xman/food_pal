import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { toast } from "react-toastify";
import { resetPassword } from "../../utils/userFunctions";
import { checkFormFields } from "./checkFormFields";

function Reset(props) {
  const history = useHistory();

  const [resetState, setResetState] = useState({
    token: "",
    newPassword: "",
    confirmPassword: "",
    errors: {},
    formIsValid: true,
  });

  const handleValidation = () => {
    const [errors, formIsValid] = checkFormFields(resetState);
    setResetState({ ...resetState, errors, formIsValid });
  };

  const onChange = (event) => {
    setResetState({
      ...resetState,
      [event.target.name]: event.target.value.trim(),
    });
  };

  const onSubmit = async (event) => {
    let errors = {};
    handleValidation();
    event.preventDefault();
    const userData = {
      token: resetState.token,
      newPassword: resetState.newPassword,
      confirmPassword: resetState.confirmPassword,
    };
    if (resetState.formIsValid) {
      try {
        console.log(userData);
        const res = await resetPassword(userData);
        console.log(res.data);
        if (res.data.error) {
          errors["message"] = `${res.data.message}`;
          toast(`${res.data.message}`);
        } else {
          console.log("Password Reset");
          toast("Password reset, redirecting to sign in...");
          setTimeout(() => {
            history.push("/signin");
          }, 2500);
        }
      } catch (error) {
        errors["message"] =
          "You should be able to reset if you have the reset code for the correct email address";
        setResetState({ ...resetState, errors });
      }
    } else {
      console.log("Form has errors.");
      errors["message"] = "Error with either code or unmatched passwords";
      toast("Error, please check details are correct");

      setResetState({ ...resetState, errors });
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
            <span style={{ color: "red" }}>{resetState.errors["message"]}</span>
            <div className="form-group">
              <label htmlFor="token">Reset token</label>
              <input
                type="text"
                refs="token"
                className="form-control"
                name="token"
                placeholder="Enter token sent to your email (eg: 123456)"
                value={resetState.token}
                onChange={onChange}
              />
            </div>
            <span style={{ color: "red" }}>{resetState.token["token"]}</span>
            <div className="form-group">
              <label htmlFor="newPassword">New Password</label>
              <input
                type="password"
                refs="newPassword"
                className="form-control"
                name="newPassword"
                placeholder="Enter new password"
                value={resetState.newPassword}
                onChange={onChange}
              />
              <span style={{ color: "red" }}>
                {resetState.errors["password"]}
              </span>
            </div>
            <div className="form-group">
              <label htmlFor="confirmPassword">Confirm Password</label>
              <input
                type="password"
                refs="confirmPassword"
                className="form-control"
                name="confirmPassword"
                placeholder="Confirm your new password"
                value={resetState.confirmPassword}
                onChange={onChange}
              />
              <span style={{ color: "red" }}>
                {resetState.errors["confirmPassword"]}
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

export default Reset;
