import React, { useState } from "react";
import { activateUser } from "../../utils/userFunctions";
import { useHistory } from "react-router-dom";
import { checkFormFields } from "./checkFormFields";

function Activate() {
  const history = useHistory();

  const [formState, setFormState] = useState({
    email: "",
    code: "",
    errors: {},
    formIsValid: true,
  });

  const handleValidation = () => {
    const [errors, formIsValid] = checkFormFields(formState);
    setFormState({ ...formState, errors, formIsValid });
  };

  const onChange = (e) => {
    setFormState({
      ...formState,
      [e.target.name]: e.target.value.trim(),
    });
  };

  const onSubmit = async (event) => {
    let errors = {};
    handleValidation();
    event.preventDefault();
    const userData = {
      email: formState.email,
      code: formState.code,
    };
    if (formState.formIsValid) {
      try {
        console.log(userData);
        const res = await activateUser(userData);
        console.log(res.data);
        if (res.data.error) {
          errors["failure"] = `${res.data.message}`;
        } else {
          console.log("Form submitted");
          setTimeout(() => {
            errors["success"] = "Success! Redirecting to sign in page";
            history.push("/signin");
          }, 3000);
        }
      } catch (error) {
        errors["failure"] =
          "Unable to activate account, please check you entered the correct details.";
        setFormState({ ...formState, errors });
      }
    } else {
      console.log("Form has errors.");
      errors["failure"] =
        "Error activating, please check that your email and code are correct.";
    }
  };

  return (
    <div className="container">
      <div className="row">
        <div className="mx-auto mt-5 col-md-6">
          <form noValidate onSubmit={onSubmit}>
            <h1 className="mb-3 h3 font-weight normal">
              Please activate your account
            </h1>
            <span style={{ color: "red" }}>{formState.errors["failure"]}</span>
            <span style={{ color: "green" }}>
              {formState.errors["success"]}
            </span>

            <div className="form-group">
              <label htmlFor="code">Activation Code</label>
              <input
                type="number"
                className="form-control"
                name="code"
                placeholder="Enter code sent to your email (eg: 123456)"
                value={formState.code}
                onChange={onChange}
              />
            </div>
            <span style={{ color: "red" }}>{formState.errors["code"]}</span>
            <div className="form-group">
              <label htmlFor="email">Email</label>
              <input
                type="email"
                className="form-control"
                name="email"
                placeholder="Enter email"
                value={formState.email}
                onChange={onChange}
              />
            </div>
            <span style={{ color: "red" }}>{formState.errors["email"]}</span>
            <button type="submit" className="btn btn-lg btn-primary btn-block">
              Activate your account
            </button>
            <span className="info-span" style={{ color: "green" }}></span>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Activate;
