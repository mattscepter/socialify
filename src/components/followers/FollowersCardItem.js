import React, { useEffect, useState } from "react";
import { Button, CircularProgress } from "@material-ui/core";
import { useDispatch, useSelector } from "react-redux";
import axiosInstance from "../../utils/axiosInstance";
import { accepted } from "../../context/actions/followeractions";
import { showfollowers } from "../../context/actions/followeractions";
import { addConvo } from "../../context/actions/convoactions";
import { useHistory } from "react-router";
import BadgeAvatars from "../avatar/BadgeAvatar";

function FollowersCardItem({ f, userId, type, id }) {
  const [buttonStatus, setButtonStatus] = useState("");
  const [buttonLoading, setButtonLoading] = useState(false);
  const dispatch = useDispatch();
  const history = useHistory();

  const followers = useSelector((state) => state.follower.followers);
  const following = useSelector((state) => state.follower.following);
  const requested = useSelector((state) => state.follower.requested);
  const currentUser = useSelector((state) => state.auth.user);
  const convo = useSelector((state) => state.convo.convo);
  const onlineusers = useSelector((state) => state.auth.onlineusers);

  useEffect(() => {
    setButtonLoading(true);
    if (followers.includes(f._id) && following.includes(f._id)) {
      setButtonStatus("Unfollow");
      setButtonLoading(false);
    }

    if (!followers.includes(f._id) && following.includes(f._id)) {
      setButtonStatus("Unfollow");
      setButtonLoading(false);
    }
    if (followers.includes(f._id) && !following.includes(f._id)) {
      if (id === userId) {
        setButtonStatus("Follow Back");
        setButtonLoading(false);
      } else {
        setButtonStatus("Follow");
        setButtonLoading(false);
      }
    }
    if (requested.includes(f._id)) {
      setButtonStatus("Requested");
      setButtonLoading(false);
    }
  }, [f._id, followers, following, type, id, userId, requested]);

  const followUser = async () => {
    setButtonLoading(true);
    await axiosInstance
      .post("/api/follow", { userId: currentUser.userId, followerId: f._id })
      .then((res) => {
        dispatch(accepted(res.data));
        setButtonLoading(false);
      })
      .catch((err) => {
        setButtonLoading(false);
        console.log(err);
      });
  };

  const unfollowUser = async (e) => {
    setButtonLoading(true);
    await axiosInstance
      .post("/api/unfollow", { userId: currentUser.userId, followerId: f._id })
      .then((res) => {
        dispatch(accepted(res.data));
        setButtonLoading(false);
      })
      .catch((err) => {
        setButtonLoading(false);
        console.log(err);
      });
  };

  const unRequest = async () => {
    setButtonLoading(true);
    await axiosInstance
      .put("/api/declinerequest", {
        userId: f._id,
        followerId: currentUser.userId,
      })
      .then((res) => {
        setButtonLoading(false);
        dispatch(accepted(res.data));
      })
      .catch((err) => {
        setButtonLoading(false);
        console.log(err);
      });
  };

  const buttonClick = (e) => {
    e.preventDefault();
    if (buttonStatus === "Follow" || buttonStatus === "Follow Back") {
      followUser();
    } else if (buttonStatus === "Requested") {
      unRequest();
    } else if (buttonStatus === "Unfollow") {
      unfollowUser();
    }
  };

  const addconvo = async () => {
    dispatch(showfollowers({ type: null, show: false, id: null, data: [] }));
    dispatch(addConvo(f, currentUser, convo, f.profileImg));
    history.push("/chat");
  };

  return (
    <>
      <div
        onClick={() => {
          dispatch(showfollowers({ type: null, show: false }));
          history.push(`/profile/${f._id}`);
        }}
        className="followercard__ListUserLeft"
      >
        <BadgeAvatars
          dimension="3.5"
          disp={
            onlineusers.filter((c) => c.userId === f._id)[0] === undefined
              ? false
              : true
          }
          url={`${process.env.REACT_APP_UPLOAD}/profilepic/${f.profileImg}`}
        />

        <div className="followercard__ListUserLeftName">
          <h4>{f.userName}</h4>
          <p>{f.name}</p>
        </div>
      </div>
      {userId === f._id ? (
        <></>
      ) : (
        <div style={{ display: "flex" }}>
          <Button onClick={buttonClick}>
            {" "}
            {buttonLoading ? (
              <CircularProgress
                style={{
                  height: "2rem",
                  width: "2rem",
                  color: "white",
                }}
              />
            ) : (
              <>{buttonStatus}</>
            )}
          </Button>
          {id === userId ? (
            <Button
              onClick={(e) => {
                e.preventDefault();
                addconvo();
              }}
            >
              Chat
            </Button>
          ) : (
            <></>
          )}
        </div>
      )}
    </>
  );
}

export default FollowersCardItem;
