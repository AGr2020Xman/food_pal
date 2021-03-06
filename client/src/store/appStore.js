import { isEmpty } from "lodash";
import { GET_ERRORS, SET_CURRENT_USER, USER_LOADING } from "../actions/types";
import jwt_decode from "jwt-decode";
import { setAuthToken } from "../utils/setAuthToken";

const getToken = () => {
  const token = localStorage.getItem("userToken");
  if (token) {
    setAuthToken(token);
    const decodedToken = jwt_decode(token);
    return decodedToken;
  }
  return {};
};

export const appInitialState = {
  isAuthenticated: !isEmpty(getToken()),
  user: getToken(),
  loading: false,
  errors: {},
};

export function appReducer(state, action) {
  switch (action.type) {
    case SET_CURRENT_USER:
      // console.log(state, action.payload);
      return {
        ...state,
        isAuthenticated: !isEmpty(action.payload),
        user: action.payload,
      };
    case USER_LOADING:
      return {
        ...state,
        loading: true,
      };
    case GET_ERRORS:
      return { ...state, errors: action.payload };
    default:
      return state;
  }
}
