import {
  GET_FOLLOWERS,
  ACCEPTED,
  GET_FOllOWERS_DATA,
  GET_FOllOWING_DATA,
  SHOW_FOLLOWERS,
} from "../actionsTypes";
import axiosInstance from "../../utils/axiosInstance";

const getFollower = (data) => ({
  type: GET_FOLLOWERS,
  payload: data,
});

const accepted = (data) => ({
  type: ACCEPTED,
  payload: data,
});

const getfollowerdata = (data) => ({
  type: GET_FOllOWERS_DATA,
  payload: data,
});

const getfollowingdata = (data) => ({
  type: GET_FOllOWING_DATA,
  payload: data,
});

const showfollowers = (data) => ({
  type: SHOW_FOLLOWERS,
  payload: data,
});

const GetFollowers = (user) => {
  return (dispatch) => {
    axiosInstance
      .get(`/api/follower/${user.userId}`)
      .then(async (res) => {
        if (res.data !== null) {
          dispatch(getFollower(res.data));
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };
};

const getFollowerData = (data) => {
  return (dispatch) => {
    axiosInstance
      .post("/auth/getUserData", { data })
      .then((res) => dispatch(getfollowerdata(res.data)))
      .catch((err) => console.log(err));
  };
};

const getFollowingData = (data) => {
  return (dispatch) => {
    axiosInstance
      .post("/auth/getUserData", { data })
      .then((res) => dispatch(getfollowingdata(res.data)))
      .catch((err) => console.log(err));
  };
};

export {
  getFollower,
  GetFollowers,
  accepted,
  getfollowerdata,
  getfollowingdata,
  getFollowerData,
  getFollowingData,
  showfollowers,
};
