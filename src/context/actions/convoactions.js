import {
  GET_CONVO,
  ADD_CONVO,
  SEND_MSG,
  SELECTED_CONVO,
  SHIFT_CONVO,
  SELECTED_IMG,
  DELETE_CONVO,
} from "../actionsTypes";

import axiosInstance from "../../utils/axiosInstance";

const getconvo = (data) => ({
  type: GET_CONVO,
  payload: data,
});

const selectedconvo = (data) => ({
  type: SELECTED_CONVO,
  payload: data,
});

const addconvo = (data) => ({
  type: ADD_CONVO,
  payload: data,
});

const shiftconvo = (data) => ({
  type: SHIFT_CONVO,
  payload: data,
});

const addmsg = (data) => ({
  type: SEND_MSG,
  payload: data,
});

const selectedimg = (data) => ({
  type: SELECTED_IMG,
  payload: data,
});

const deleteconvo = (data) => ({
  type: DELETE_CONVO,
  payload: data,
});

const getConvo = (id) => {
  return (dispatch) => {
    axiosInstance
      .get(`/conversation/getConvo/${id}`)
      .then((res) => dispatch(getconvo(res.data)))
      .catch((err) => console.log(err));
  };
};

const addConvo = (data, user, convo, img) => {
  return (dispatch) => {
    axiosInstance
      .post("/conversation/addConvo", {
        sender: {
          userName: user.userName,
          name: user.name,
          profileImg: user.profileImg,
          userId: user.userId,
        },
        reciever: {
          userName: data.userName,
          name: data.name,
          profileImg: data.profileImg,
          userId: data._id,
        },
      })
      .then((res) => {
        if (convo.filter((c) => c._id === res.data._id).length !== 0) {
          dispatch(shiftconvo(res.data._id));
          dispatch(selectedconvo(res.data));
          dispatch(selectedimg(img));
        } else {
          dispatch(addconvo(res.data));
          dispatch(selectedconvo(res.data));
          dispatch(selectedimg(img));
        }
      })
      .catch((err) => console.log(err));
  };
};

const sendMsg = (_id, message) => {
  return (dispatch) => {
    axiosInstance
      .post("/conversation/sendMsg", { _id, message })
      .then((res) => {
        dispatch(
          addmsg({
            _id,
            message: {
              sender: message.sender,
              message: message.message,
              createdAt: Date.now(),
            },
          })
        );
      })
      .catch((err) => console.log(err));
  };
};

const deleteConvo = (_id) => {
  return (dispatch) => {
    axiosInstance
      .delete(`/conversation/deleteConvo/${_id}`)
      .then(() => {
        dispatch(deleteconvo(_id));
        dispatch(selectedconvo(null));
      })
      .catch((err) => console.log(err));
  };
};

export {
  getConvo,
  addConvo,
  selectedconvo,
  sendMsg,
  addmsg,
  shiftconvo,
  selectedimg,
  deleteConvo,
};
