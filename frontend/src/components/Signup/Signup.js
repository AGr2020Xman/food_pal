import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { registerUser, getUsers } from "../../utils/userFunctions";
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

  const onSubmit = (event) => {
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
      getUsers().then((data) => {
        console.log(data);
        const alreadyRegisteredUser = data.find(
          (element) => element.email === registerState.email
        );
        if (!alreadyRegisteredUser) {
          registerUser(userData).then((res) => {
            history.push("/activate");
          });
          console.log("Form submitted");
        } else {
          errors["email"] = "Email already exists";
          setRegisterState({ ...registerState, errors });
        }
      });
    } else {
      console.log("Form has errors.");
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
          </form>
        </div>
      </div>
    </div>
  );
}

export default Signup;
