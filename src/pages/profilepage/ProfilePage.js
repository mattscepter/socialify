import React, { useState, useEffect } from "react";
import "./ProfilePage.scss";
import { Avatar, Button, IconButton } from "@material-ui/core";
import { useSelector, useDispatch } from "react-redux";
import axiosInstance from "../../utils/axiosInstance";
import { useParams } from "react-router-dom";
import Loading from "../../components/loading/Loading";
import ProfilePost from "../../components/profilePost/ProfilePost";
import EditIcon from "@material-ui/icons/Edit";
import EditDesc from "../../components/editdesc/EditDesc";
import { CircularProgress } from "@material-ui/core";
import { showfollowers } from "../../context/actions/followeractions";
import {
  getPostCount,
  getProfileFOllowers,
  getProfilePost,
  getProfileUser,
} from "../../context/actions/profileactions";
import { useHistory } from "react-router";
import { addConvo } from "../../context/actions/convoactions";

function ProfilePage() {
  const [editDisplay, seteditDisplay] = useState(false);
  const currentUser = useSelector((state) => state.auth.user);
  const [buttonStatus, setButtonStatus] = useState("Follow");
  const [buttonLoading, setButtonLoading] = useState(false);
  const [postdeleted, setpostdeleted] = useState();
  const [postSelected, setpostSelected] = useState(false);
  const [unfollowed, setunfollowed] = useState();
  const history = useHistory();
  const dispatch = useDispatch();
  let { id } = useParams();
  const follow = useSelector((state) => state.profile.followers);
  const postcount = useSelector((state) => state.profile.postcount);
  const user = useSelector((state) => state.profile.user);
  const loading = useSelector((state) => state.profile.profileloading);
  const convo = useSelector((state) => state.convo.convo);

  useEffect(() => {
    dispatch(getPostCount(id));
  }, [dispatch, id, postdeleted]);

  useEffect(() => {
    dispatch(getProfileFOllowers(id));
  }, [dispatch, id, unfollowed]);

  useEffect(() => {
    dispatch(getProfileUser(id));
  }, [dispatch, id]);
  useEffect(() => {
    dispatch(getProfilePost(id));
  }, [dispatch, id, postdeleted]);

  useEffect(() => {
    if (follow?.followers && follow?.followers.includes(currentUser.userId)) {
      setButtonStatus("Unfollow");
    } else if (
      follow?.requests &&
      follow?.requests.includes(currentUser.userId)
    ) {
      setButtonStatus("Requested");
    }
  }, [currentUser.userId, follow]);

  const followUser = async () => {
    setButtonLoading(true);
    await axiosInstance
      .post("/api/follow", { userId: currentUser.userId, followerId: id })
      .then((res) => {
        setButtonLoading(false);
        setButtonStatus("Requested");
      })
      .catch((err) => {
        setButtonLoading(false);
        console.log(err);
      });
  };

  const unfollowUser = async (e) => {
    setButtonLoading(true);
    await axiosInstance
      .post("/api/unfollow", { userId: currentUser.userId, followerId: id })
      .then((res) => {
        const index = follow?.followers?.indexOf(currentUser.userId);
        if (index > -1) {
          follow?.followers?.splice(index, 1);
        }
        setunfollowed(res);
        setButtonLoading(false);
        setButtonStatus("Follow");
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
        userId: id,
        followerId: currentUser.userId,
      })
      .then((res) => {
        setButtonLoading(false);
        setButtonStatus("Follow");
      })
      .catch((err) => {
        setButtonLoading(false);
        console.log(err);
      });
  };

  const buttonClick = (e) => {
    e.preventDefault();
    if (buttonStatus === "Follow") {
      followUser();
    } else if (buttonStatus === "Requested") {
      unRequest();
    } else if (buttonStatus === "Unfollow") {
      unfollowUser();
    }
  };

  return (
    <>
      {loading ? (
        <Loading />
      ) : (
        <div className="profilePage">
          {editDisplay ? (
            <EditDesc
              seteditDisplay={seteditDisplay}
              user={user}
              setpostdeleted={setpostdeleted}
            />
          ) : (
            <></>
          )}
          <div className="profilePage__header">
            {currentUser.userId !== id ? (
              <></>
            ) : (
              <>
                {!editDisplay || !postSelected ? (
                  <>
                    {" "}
                    <IconButton
                      onClick={() => seteditDisplay(true)}
                      className="profilePage__headereditButton"
                    >
                      <EditIcon className="profilePage__headereditButtonIcon" />
                    </IconButton>
                  </>
                ) : (
                  <></>
                )}
              </>
            )}
            <Avatar
              src={`${process.env.REACT_APP_UPLOAD}/profilepic/${user.profileImg}`}
              className="profilePage__header-Avatar"
            />
            <h2>{user.userName}</h2>
          </div>
          <div className="profilePage__desc">
            <h2>{user.name}</h2>
            <p>{user.discription}</p>
            {currentUser.userId === id ? (
              <></>
            ) : (
              <>
                <Button
                  onClick={buttonClick}
                  style={{
                    backgroundColor: `${
                      buttonStatus === "Requested" ? "#476072" : "#548ca8"
                    }`,
                  }}
                >
                  {buttonLoading ? (
                    <CircularProgress
                      style={{
                        height: "3rem",
                        width: "3rem",
                        color: "white",
                      }}
                    />
                  ) : (
                    <>{buttonStatus}</>
                  )}
                </Button>
                {follow?.followers.includes(currentUser.userId) ||
                follow?.following.includes(currentUser.userId) ? (
                  <Button
                    onClick={(e) => {
                      e.preventDefault();
                      dispatch(
                        addConvo(
                          {
                            name: user.name,
                            userName: user.userName,
                            profileImg: user.profileImg,
                            _id: user.userId,
                          },
                          currentUser,
                          convo,
                          user.profileImg
                        )
                      );
                      history.push("/chat");
                    }}
                  >
                    Chat
                  </Button>
                ) : (
                  <></>
                )}
              </>
            )}
          </div>
          <div className="profilePage__followers">
            <div className="profilePage__followersBox">
              <h4>Posts</h4>
              <h5>{postcount}</h5>
            </div>
            <div
              onClick={() => {
                if (currentUser.userId === id) {
                  dispatch(
                    showfollowers({
                      type: "Followers",
                      show: true,
                      data: [],
                      id: currentUser.userId,
                    })
                  );
                } else if (buttonStatus === "Unfollow") {
                  dispatch(
                    showfollowers({
                      type: "Followers",
                      show: true,
                      data: follow.followers,
                      id: id,
                    })
                  );
                }
              }}
              className="profilePage__followersBox"
            >
              <h4>Followers</h4>
              <h5>{follow?.followers?.length}</h5>
            </div>
            <div
              onClick={() => {
                if (currentUser.userId === id) {
                  dispatch(
                    showfollowers({
                      type: "Following",
                      show: true,
                      data: [],
                      id: currentUser.userId,
                    })
                  );
                } else if (buttonStatus === "Unfollow") {
                  dispatch(
                    showfollowers({
                      type: "Following",
                      show: true,
                      data: follow.following,
                      id: id,
                    })
                  );
                }
              }}
              className="profilePage__followersBox"
            >
              <h4>Following</h4>
              <h5>{follow?.following?.length}</h5>
            </div>
          </div>
          <div className="profilePage__post">
            <h3 className="profilePage__postH3">Posts</h3>
            {currentUser.userId === id ||
            follow?.followers?.includes(currentUser.userId) ? (
              <ProfilePost
                user={user}
                setpostdeleted={setpostdeleted}
                setpostSelected={setpostSelected}
              />
            ) : (
              <p style={{ color: "gray", fontSize: "2rem", padding: "2rem" }}>
                Follow to see posts
              </p>
            )}
          </div>
        </div>
      )}
    </>
  );
}

export default ProfilePage;
