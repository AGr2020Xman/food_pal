import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { forgotPassword } from "../../utils/userFunctions";
import { checkFormFields } from "./checkFormFields";

function Forgot(props) {
  const history = useHistory();

  const [registerState, setRegisterState] = useState({
    email: "",
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
        const res = await forgotPassword(userData);
        if (res.data.error) {
          errors["message"] = `${res.data.message}`;
        } else {
          errors["message"] = res.data.message;
          setTimeout(() => {
            history.push("/reset");
          }, 2500);
        }
      } catch (error) {
        errors["message"] =
          "If this email exists in our database, you should receive a reset code.";
        setRegisterState({ ...registerState, errors });
      }
    } else {
      console.log("Form has errors.");
      errors["email"] = "Error with email entered";
    }
  };

  return (
    <div className="container">
      <div className="row">
        <div className="mx-auto mt-5 col-md-6">
          <form noValidate onSubmit={onSubmit}>
            <h1 className="mb-3 h3 font-weight normal">
              Enter your email to receive a reset code.
            </h1>
            <span style={{ color: "red" }}>
              {registerState.errors["message"]}
            </span>
            <div className="form-group">
              <label htmlFor="email">Email Address</label>
              <input
                type="email"
                refs="email"
                className="form-control"
                name="email"
                placeholder="Enter Email"
                value={registerState.email}
                onChange={onChange}
              />
              <span style={{ color: "red" }}>
                {registerState.errors["email"]}
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

export default Forgot;
