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

  // Name
  if (!name) {
    formIsValid = false;
    errors["name"] = "Cannot be empty";
  } else if (typeof name !== "undefined") {
    if (!name.match(/^[a-zA-Z]+$/) || name.length >= 30) {
      formIsValid = false;
      errors["name"] = "Letters only, and not greater than 30 characters";
    }
  }

  // confirm password
  if (!confirmPassword) {
    console.log("1,", confirmPassword);
    formIsValid = false;
    errors["confirmPassword"] = "Cannot be empty";
  } else if (confirmPassword !== password) {
    console.log("2,", confirmPassword);
    formIsValid = false;
    errors["confirmPassword"] = "Must match password";
  }

  return [errors, formIsValid];
};
