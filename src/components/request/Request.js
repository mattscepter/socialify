import { Avatar, Button } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import "./Request.scss";
import axiosInstance from "../../utils/axiosInstance";
import { useDispatch } from "react-redux";
import { accepted } from "../../context/actions/followeractions";

function Request({ request, currentUser }) {
  const [user, setuser] = useState({});
  const dispatch = useDispatch();

  useEffect(() => {
    const getUser = async () => {
      await axiosInstance
        .get(`/auth/user/${request}`)
        .then((res) => setuser(res.data.user))
        .catch((err) => console.log(err));
    };
    getUser();
  }, [request]);

  const acceptRequest = async (e) => {
    e.preventDefault();
    await axiosInstance
      .put("/api/acceptrequest", {
        userId: currentUser.userId,
        followerId: request,
      })
      .then(() => dispatch(accepted(request)))
      .catch((err) => console.log(err));
  };

  const declineRequest = async (e) => {
    e.preventDefault();
    await axiosInstance
      .put("/api/declinerequest", {
        userId: currentUser.userId,
        followerId: request,
      })
      .then((res) => {
        dispatch(accepted(request));
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div className="request">
      <div className="request__header">
        <Avatar
          src={`${process.env.REACT_APP_UPLOAD}/profilepic/${user.profileImg}`}
          style={{ width: "3rem", height: "3rem" }}
        />
        <p>{user.userName}</p>
      </div>
      <div className="request__button">
        <Button onClick={acceptRequest}>Accept</Button>
        <Button onClick={declineRequest}>Decline</Button>
      </div>
    </div>
  );
}

export default Request;
