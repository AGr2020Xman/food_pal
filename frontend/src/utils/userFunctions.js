import axios from "axios";

export const registerUser = (userData) => {
  // console.log(userData);
  return axios.post("/api/signup", {
    name: userData.name,
    email: userData.email,
    password: userData.password,
    confirmPassword: userData.confirmPassword,
  });
};

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

export const loginUser = (userData) => {
  console.log("Yoohoo loginUser", userData);
  return axios.post("/api/signin", {
    email: userData.email,
    password: userData.password,
  });
};

export const activateUser = (userData) => {
  return axios.patch("/api/activate", {
    code: userData.code,
    email: userData.email,
  });
};

export const signoutUser = (userData) => {
  return axios.get("/api/signout", {});
};

export const getUsers = () => {
  return axios.get("/api/allusers").then((res) => res.data);
};

export const getUser = () => {
  return axios.get("/api/profile");
};
