import axios from "axios";

export const getFood = () => {
    return axios.get("");
  };

export const registerUser = (userData) => {
  // console.log(userData);
  return axios.post("/api/signup", {
    name: userData.name,
    email: userData.email,
    password: userData.password,
    confirmPassword: userData.confirmPassword,
  });
};

export const signoutUser = () => {
  return axios.get("/api/signout");
}; // from auth local storage

export const forgotPassword = (userData) => {
  return axios.patch("/api/forgot", {
    email: userData.email,
  });
};

export const resetPassword = ({ token, newPassword, confirmPassword }) => {
  return axios.patch("/api/reset", {
    token: token,
    newPassword: newPassword,
    confirmPassword: confirmPassword,
  });
};