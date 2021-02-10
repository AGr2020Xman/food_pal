import axios from "axios";
import jwt_decode from "jwt-decode";
import { setAuthToken } from "../utils/setAuthToken";
import { SET_CURRENT_USER } from "./types";

export const setUserLogout = async (dispatch) => {
  await setAuthToken(false);
  dispatch({ type: SET_CURRENT_USER, payload: {} });
};

export const setUserLoggedIn = async (token, dispatch) => {
  await setAuthToken(token);
  // Decode token to get user data
  const decodedToken = await jwt_decode(token);
  // Set current user
  await dispatch({ type: SET_CURRENT_USER, payload: decodedToken });
};
//
export const activateUser = (userData) => {
  return axios.post("/api/activate", userData);
};

// Register User
// export const registerUser = (userData, history) => {
//   axios.post("/api/signup", userData).then((res) => history.push("/login"));
// };

// // Login - get user token
// export const loginUser = (userData) => {
//   return axios.post("/api/signin", userData);
// };
