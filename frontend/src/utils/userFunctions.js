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

export const loginUser = (userData) => {
  // console.log(userData);
  return axios.post("/api/signin", {
    email: userData.email,
    password: userData.password,
  });
};

export const activateUser = (userData) => {
  return axios.post("/api/activate", userData);
};

export const getUsers = () => {
  return axios.get("/api/allusers").then((res) => res.data);
};

export const getUser = () => {
  return axios.get("/api/profile");
};
