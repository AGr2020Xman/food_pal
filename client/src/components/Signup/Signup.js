import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { registerUser } from "../../utils/userFunctions";
import { checkFormFields } from "./checkFormFields";

function Signup(props) {
  const history = useHistory();

  const [registerState, setRegisterState] = useState({
    name: "",
    email: "",
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
      name: registerState.name,
      email: registerState.email,
      password: registerState.password,
      confirmPassword: registerState.password,
    };
    if (registerState.formIsValid) {
      try {
        console.log(userData);
        const res = await registerUser(userData);
        console.log(res.data);
        if (res.data.error) {
          errors["failure"] = `${res.data.message}`;
        } else {
          console.log("Form submitted");
          errors["failure"] = "Success! Redirecting...";
          setRegisterState({ ...registerState, errors });
          setTimeout(() => {
            history.push("/activate");
          });
        }
      } catch (error) {
        errors["email"] = "Email already exists";
        setRegisterState({ ...registerState, errors });
      }
    } else {
      console.log("Form has errors.");
      errors["failure"] = "Error signing up";
      setRegisterState({ ...registerState, errors });
    }
  };

  return (
    <div className="container">
      <div className="row">
        <div className="mx-auto mt-5 col-md-6">
          <form noValidate onSubmit={onSubmit}>
            <h1 className="mb-3 h3 font-weight normal">
              Sign up to get started!
            </h1>
            <span style={{ color: "red" }}>
              {registerState.errors["failure"]}
            </span>
            <div className="form-group">
              <label htmlFor="first_name">Username</label>
              <input
                type="text"
                refs="name"
                className="form-control"
                name="name"
                placeholder="Enter name or username"
                value={registerState.name}
                onChange={onChange}
              />
              <span style={{ color: "red" }}>
                {registerState.errors["name"]}
              </span>
            </div>
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
              Sign Up
            </button>
            <p className="text-center">
              Already have an account?
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
