import {
  LOGIN_LOADING,
  LOGIN_SUCCESS,
  LOGIN_ERROR,
  LOGOUT_USER,
  POSTED,
  ACCEPTED,
} from "../actionsTypes";

const loginLoading = () => ({
  type: LOGIN_LOADING,
});

const loginSuccess = (data) => ({
  type: LOGIN_SUCCESS,
  payload: data,
});

const loginError = (data) => ({
  type: LOGIN_ERROR,
  payload: data,
});

const logoutUser = () => ({
  type: LOGOUT_USER,
});

const posted = (data) => ({
  type: POSTED,
  payload: data,
});

const accepted = (data) => ({
  type: ACCEPTED,
  payload: data,
});

export { loginLoading, loginSuccess, loginError, logoutUser, posted, accepted };
