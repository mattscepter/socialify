import {
  GETPROFILE_FOLLOWERS,
  POST_COUNT,
  GETPROFILE_USER,
  GETPROFILE_POST,
  PROFILEPOST_LOADING,
  PROFILE_LOADING,
} from "../actionsTypes";
import axiosInstance from "../../utils/axiosInstance";

const getpostcount = (data) => ({
  type: POST_COUNT,
  payload: data,
});

const getprofilefollowers = (data) => ({
  type: GETPROFILE_FOLLOWERS,
  payload: data,
});

const getprofileuser = (data) => ({
  type: GETPROFILE_USER,
  payload: data,
});

const getprofilepost = (data) => ({
  type: GETPROFILE_POST,
  payload: data,
});

const profileloading = (data) => ({
  type: PROFILE_LOADING,
  payload: data,
});

const profilepostloading = (data) => ({
  type: PROFILEPOST_LOADING,
  payload: data,
});

const getProfilePost = (id) => {
  return (dispatch) => {
    dispatch(profilepostloading(true));
    axiosInstance
      .get(`/post/getpost/${id}`)
      .then((res) => {
        dispatch(
          getprofilepost(
            res.data.sort((p1, p2) => {
              return new Date(p2.createdAt) - new Date(p1.createdAt);
            })
          )
        );
        dispatch(profilepostloading(true));
      })
      .catch((err) => {
        dispatch(profilepostloading(false));
        console.log(err);
      });
  };
};

const getProfileUser = (id) => {
  return (dispatch) => {
    dispatch(profileloading(true));
    axiosInstance
      .get(`/auth/user/${id}`)
      .then((res) => {
        dispatch(profileloading(false));
        dispatch(getprofileuser(res.data.user));
      })
      .catch((err) => {
        dispatch(profileloading(false));
        console.log(err);
      });
  };
};

const getPostCount = (id) => {
  return (dispatch) => {
    axiosInstance
      .get(`/post/postcount/${id}`)
      .then((res) => dispatch(getpostcount(res.data)))
      .catch((err) => console.log(err));
  };
};

const getProfileFOllowers = (id) => {
  return (dispatch) => {
    axiosInstance
      .get(`/api/follower/${id}`)
      .then((res) => {
        if (res.data === null) {
          dispatch(getprofilefollowers({ followers: [], following: [] }));
        } else {
          dispatch(getprofilefollowers(res.data));
        }
      })
      .catch((err) => console.log(err));
  };
};

export { getPostCount, getProfileFOllowers, getProfileUser, getProfilePost };
