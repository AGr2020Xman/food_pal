import axios from "axios";

export const setAuthToken = (token) => {
  if (token) {
    console.log("Token inside of set Auth Token fx util", token);
    window.localStorage.setItem("userToken", token);
    // Apply authorization token to every request if logged in
    axios.defaults.headers.common["Authorization"] = token;
  } else {
    // Delete auth header
    console.log("No token so localstorage is remove header", token);
    window.localStorage.clear();
    delete axios.defaults.headers.common["Authorization"];
  }
};
