export const checkFormFields = ({ token, password, confirmPassword }) => {
  let errors = {};
  let formIsValid = true;

  // token
  if (!token) {
    formIsValid = false;
    errors["token"] = "Cannot be empty, check your emails for reset token";
  } else if (token.length > 6) {
    formIsValid = false;
    errors["token"] =
      "Token should be 6 numbers, check your emails for reset token";
  }

  // password
  if (!password) {
    formIsValid = false;
    errors["password"] = "Cannot be empty";
  } else if (password.length < 6) {
    formIsValid = false;
    errors["password"] = "Password must be at least 6 characters";
  }
  // confirm password
  if (!confirmPassword) {
    formIsValid = false;
    errors["confirmPassword"] = "Cannot be empty";
  } else if (confirmPassword !== password) {
    formIsValid = false;
    errors["confirmPassword"] = "Must match password";
  }

  return [errors, formIsValid];
};
