export const checkFormFields = ({ email, code }) => {
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

  if (!code) {
    formIsValid = false;
    errors["code"] = "Cannot be empty";
  } else if (code.length !== 6) {
    formIsValid = false;
    errors["code"] = "Check your emails for the 6-digit code";
  }

  return [errors, formIsValid];
};
