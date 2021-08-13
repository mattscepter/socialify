import {
  GETPOST_LOADING,
  GETPOST_SUCCESS,
  GETPOST_ERROR,
  POSTED,
} from "../actionsTypes";
import axiosInstance from "../../utils/axiosInstance";

const getpostLoading = () => ({
  type: GETPOST_LOADING,
});

const getpostSuccess = (data) => ({
  type: GETPOST_SUCCESS,
  payload: data,
});

const getpostError = (data) => ({
  type: GETPOST_ERROR,
  payload: data,
});

const posted = (data) => ({
  type: POSTED,
  payload: data,
});

const getPosts = (user) => {
  return (dispatch) => {
    dispatch(getpostLoading());
    axiosInstance
      .get(`/post/getposts/${user.userId}`)
      .then((res) => {
        dispatch(
          getpostSuccess(
            res.data.sort((p1, p2) => {
              return new Date(p2.createdAt) - new Date(p1.createdAt);
            })
          )
        );
      })
      .catch((err) => {
        dispatch(getpostError(err));
      });
  };
};

export { getpostLoading, getpostSuccess, getpostError, getPosts, posted };
