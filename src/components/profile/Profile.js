import { IconButton, Avatar, useMediaQuery } from "@material-ui/core";
import React, { useState, useEffect } from "react";
import "./Profile.scss";
import ClearRoundedIcon from "@material-ui/icons/ClearRounded";
import FavoriteIcon from "@material-ui/icons/Favorite";
import axiosInstance from "../../utils/axiosInstance";
import { useSelector } from "react-redux";
import Comment from "../comment/Comment";
import Socialify from "../../assets/photos/SocialifyMain.svg";
import Skeleton from "@material-ui/lab/Skeleton";
import SendRoundedIcon from "@material-ui/icons/SendRounded";
import DeleteIcon from "@material-ui/icons/Delete";
import Post from "../post/Post";

function Profile({ setDisplay, post, user, postdeleted, setpostSelected }) {
  const User = useSelector((state) => state.auth.user);
  const [likes, setLikes] = useState([]);
  const [isLiked, setIsLiked] = useState(false);
  const [likenumber, setLikeNumber] = useState();
  const [loading, setLoading] = useState(false);
  const [comments, setComments] = useState([]);
  const [comment, setComment] = useState("");
  const [commentLoading, setCommmentLoading] = useState(false);

  const mobile = useMediaQuery("(max-width:700px)");

  useEffect(() => {
    const getUser = async () => {
      setLoading(true);
      await axiosInstance
        .get(`/post/likes/${post._id}`)
        .then((response) => {
          setLikeNumber(response.data.likes.length);
          setLikes(response.data.likes);
          setLoading(false);
        })
        .catch((err) => {
          console.log(err);
          setLoading(false);
        });
    };
    getUser();
  }, [post.userId, post._id]);

  useEffect(() => {
    const getComment = async () => {
      setCommmentLoading(true);
      await axiosInstance
        .get(`/comments/getcomment/${post._id}`)
        .then(async (res) => {
          setComments(res.data.comment);
          setCommmentLoading(false);
        })
        .catch((err) => {
          setCommmentLoading(false);
          console.log(err);
        });
    };
    getComment();
  }, [post._id]);

  useEffect(() => {}, [likes]);

  useEffect(() => {
    if (likes.includes(User.userId)) {
      setIsLiked(true);
    }
  }, [User.userId, likes]);

  const likePost = async (e) => {
    e.preventDefault();
    await axiosInstance
      .put(`/post/likepost/${post._id}`, { userId: User.userId })
      .then((res) => {
        if (res.data === "Liked") {
          setLikeNumber(likenumber + 1);
          setIsLiked(true);
        } else {
          setLikeNumber(likenumber - 1);
          setIsLiked(false);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const addComment = async (e) => {
    e.preventDefault();
    await axiosInstance
      .post("/comments/addcomment", {
        userId: User.userId,
        postId: post._id,
        userName: User.userName,
        comment: comment,
      })
      .then((res) => setComment(""))
      .catch((err) => console.log(err.response));
  };

  const deletePost = async (e) => {
    e.preventDefault();
    await axiosInstance
      .delete(`post/deletepost/${post._id}`)
      .then((res) => {
        setDisplay(false);
        postdeleted(res);
      })
      .catch((err) => console.log(err));
  };

  return (
    <>
      {!mobile && (
        <>
          <div className="profile">
            <div className="profileback">
              <IconButton
                onClick={() => {
                  setpostSelected(false);
                  setDisplay(false);
                  setIsLiked(false);
                }}
                className="profileback__cancelButton"
              >
                <ClearRoundedIcon className="profileback__cancelButtonIcon" />
              </IconButton>
              <div className="profileback__imgPart">
                {post.imgPath ? (
                  <img
                    src={`${process.env.REACT_APP_UPLOAD}/posts/${post.imgPath}`}
                    alt=""
                  />
                ) : (
                  <img
                    src={Socialify}
                    alt=""
                    style={{
                      opacity: "0.5",
                      height: "90%",
                      width: "90%",
                      marginLeft: "3rem",
                    }}
                  />
                )}
              </div>
              <div className="profileback__detailPart">
                <div className="profileback__detailPartHeader">
                  <div className="profileback__detailPartHeaderRight">
                    <Avatar
                      src={`${process.env.REACT_APP_UPLOAD}/profilepic/${user.profileImg}`}
                      style={{ height: "4rem", width: "4rem" }}
                    />
                    <h2>{user.userName}</h2>
                  </div>
                  <div className="profileback__detailPartHeaderLeft">
                    {user.userId !== User.userId ? (
                      <></>
                    ) : (
                      <>
                        <IconButton
                          onClick={deletePost}
                          style={{
                            height: "4rem",
                            width: "4rem",
                            marginRight: "1.5rem",
                          }}
                        >
                          <DeleteIcon
                            style={{ height: "3rem", width: "3rem" }}
                          />
                        </IconButton>
                      </>
                    )}
                  </div>
                </div>
                <div className="profileback__detailPartDesc">
                  <h3>{post.title}</h3>
                  <p>{post.caption}</p>
                </div>
                <div className="profileback__detailPartLikes">
                  <IconButton
                    onClick={likePost}
                    style={{ height: "3.5rem", width: "3.5rem" }}
                  >
                    <FavoriteIcon
                      className="icon"
                      style={{ color: `${isLiked ? "red" : "lightgrey"}` }}
                    />
                  </IconButton>
                  {loading ? (
                    <>
                      {" "}
                      <Skeleton
                        animation="wave"
                        variant="rect"
                        style={{
                          width: "10rem",
                          height: "1rem",
                          margin: "0.8rem",
                          marginLeft: "0",
                          borderRadius: "0.5rem",
                        }}
                      />
                    </>
                  ) : (
                    <p>{likenumber} people liked it</p>
                  )}
                </div>
                <div className="profileback__detailPartTimestamp">
                  <p>
                    {new Date().toLocaleString("en-US", {
                      hour12: true,
                      hour: "numeric",
                      minute: "numeric",
                      day: "numeric",
                      month: "short",
                    })}
                  </p>
                </div>
                <div className="post__comment" style={{ paddingBottom: "0" }}>
                  <div className="post__commentAdd">
                    <textarea
                      cols="30"
                      minRows="1"
                      type="text"
                      placeholder="Add Comment"
                      value={comment}
                      onChange={(e) => setComment(e.target.value)}
                    />
                    <IconButton onClick={addComment}>
                      <SendRoundedIcon className="sendIcon" />
                    </IconButton>
                  </div>
                </div>

                <div className="profileback__detailPartComments">
                  <h3>Comments</h3>
                  <div className="profileback__detailPartComment">
                    {commentLoading ? (
                      <>
                        <div style={{ display: "flex", alignItems: "center" }}>
                          <Skeleton
                            animation="wave"
                            variant="circle"
                            style={{
                              width: "3rem",
                              height: "3rem",
                              margin: "0.8rem",
                              marginLeft: "-10rem",
                            }}
                          />
                          <Skeleton
                            animation="wave"
                            variant="rect"
                            style={{
                              width: "20rem",
                              height: "1rem",
                              margin: "0.8rem",
                              marginLeft: "0",
                              borderRadius: "0.5rem",
                            }}
                          />
                        </div>
                      </>
                    ) : (
                      <>
                        {" "}
                        {comments.map((c) => {
                          return <Comment comment={c} />;
                        })}
                      </>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </>
      )}

      {mobile && (
        <div className="profilemobile">
          <div className="profilemobile__back">
            {user.userId !== User.userId ? (
              <></>
            ) : (
              <>
                <IconButton
                  onClick={deletePost}
                  className="profilemobile__backdeleteButton"
                >
                  <DeleteIcon className="profilemobile__backdeleteButtonIcon" />
                </IconButton>
              </>
            )}
            <IconButton
              onClick={() => {
                setpostSelected(false);
                setDisplay(false);
                setIsLiked(false);
              }}
              className="profilemobile__backcancelButton"
            >
              <ClearRoundedIcon className="profilemobile__backcancelButtonIcon" />
            </IconButton>
            <Post postdata={post} className="profilemobile__backPost" />
          </div>
        </div>
      )}
    </>
  );
}

export default Profile;
