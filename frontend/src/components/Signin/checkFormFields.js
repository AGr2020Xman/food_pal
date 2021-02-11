export const checkFormFields = ({ email, name, password, confirmPassword }) => {
  let errors = {};
  let formIsValid = true;
  // email
  const emailRegex = /^\w+([\.-]?\w+)*@[a-z]+([\.-]?[a-z]+)*(\.[a-z]{2,4})+$/;
  const emailResult = emailRegex.test(email);

  if (!email) {
    formIsValid = false;
    errors["email"] = "Cannot be empty";
  } else if (!emailResult) {
    formIsValid = false;
    errors["email"] = "Email is not valid";
  }

  // password
  if (!password) {
    formIsValid = false;
    errors["password"] = "Cannot be empty";
  } else if (password.length < 6) {
    formIsValid = false;
    errors["password"] = "Password must be at least 6 characters";
  }

  return [errors, formIsValid];
};
