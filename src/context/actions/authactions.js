import {
  LOGIN_LOADING,
  LOGIN_SUCCESS,
  LOGIN_ERROR,
  LOGOUT_USER,
  POSTED,
  ACCEPTED,
  GETUSER_LOADING,
} from "../actionsTypes";
import cookie from "js-cookie";
import axiosInstance from "../../utils/axiosInstance";
import io from "socket.io-client";

const getuserloading = () => ({
  type: GETUSER_LOADING,
});
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

const loginUser = (user) => {
  return (dispatch) => {
    dispatch(loginLoading());
    axiosInstance
      .post("/auth/signin", user)
      .then((res) => {
        console.log("loggedin");
        if (res.data.token) {
          const socket = io.connect(process.env.REACT_APP_BASE_URL);
          socket.emit("addUser", res.data.user.userId);
          dispatch(loginSuccess({ userData: res.data.user, socket: socket }));
          cookie.set("jwt", res.data.token, { expires: 1 });
        }
      })
      .catch((err) => {
        if (err.response) dispatch(loginError(err.response.data.error));
      });
  };
};

const fetchUserToken = () => {
  return (dispatch) => {
    dispatch(getuserloading());
    const headers = {
      authorization: cookie.get("jwt"),
    };
    axiosInstance
      .get("/auth/homepage", {
        headers,
      })
      .then((res) => {
        const socket = io.connect(process.env.REACT_APP_BASE_URL);
        socket.emit("addUser", res.data.user.userId);
        dispatch(loginSuccess({ userData: res.data.user, socket: socket }));
      })
      .catch((err) => {
        if (err.response) {
          dispatch(loginError(err.response.data.error));
        }
        console.log(err);
      });
  };
};

export {
  loginLoading,
  loginSuccess,
  loginError,
  logoutUser,
  posted,
  accepted,
  fetchUserToken,
  loginUser,
  getuserloading,
};
