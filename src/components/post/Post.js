import React, { useEffect, useState } from "react";
import "./Post.scss";
import { Accordion, Avatar, IconButton } from "@material-ui/core";
import FavoriteIcon from "@material-ui/icons/Favorite";
import axiosInstance from "../../utils/axiosInstance";
import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import Skeleton from "@material-ui/lab/Skeleton";
import SendRoundedIcon from "@material-ui/icons/SendRounded";
import AccordionDetails from "@material-ui/core/AccordionDetails";
import AccordionSummary from "@material-ui/core/AccordionSummary";
import ExpandMoreRoundedIcon from "@material-ui/icons/ExpandMoreRounded";
import Comment from "../comment/Comment";

function Post({ postdata }) {
  const [user, setUser] = useState({});
  const [likes, setLikes] = useState([]);
  const [isLiked, setIsLiked] = useState(false);
  const [likenumber, setLikeNumber] = useState();
  const [loading, setLoading] = useState(false);
  const [commentLoading, setCommmentLoading] = useState(false);
  const [comment, setComment] = useState("");
  const [comments, setComments] = useState([]);
  const User = useSelector((state) => state.auth.user);
  const history = useHistory();
  const baseURL = `${process.env.REACT_APP_UPLOAD}/posts/${postdata.imgPath}`;

  useEffect(() => {
    const getUser = async () => {
      setLoading(true);
      await axiosInstance
        .get(`/auth/user/${postdata.userId}`)
        .then(async (res) => {
          await axiosInstance
            .get(`/post/likes/${postdata._id}`)
            .then((response) => {
              setLikeNumber(response.data.likes.length);
              setLikes(response.data.likes);
              setUser(res.data.user);
              setLoading(false);
            })
            .catch((err) => {
              console.log(err);
              setLoading(false);
            });
        })
        .catch((err) => {
          console.log(err);
          setLoading(false);
        });
    };
    getUser();
  }, [postdata.userId, postdata._id]);

  useEffect(() => {}, [likes]);

  useEffect(() => {
    if (likes.includes(User.userId)) {
      setIsLiked(true);
    }
  }, [User.userId, likes]);

  const likePost = async (e) => {
    e.preventDefault();
    await axiosInstance
      .put(`/post/likepost/${postdata._id}`, { userId: User.userId })
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

  const [expanded, setExpanded] = useState(false);

  const handleChange = (panel) => async (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
    if (isExpanded) {
      getComments();
    }
  };

  const getComments = async () => {
    setCommmentLoading(true);
    await axiosInstance
      .get(`/comments/getcomment/${postdata._id}`)
      .then(async (res) => {
        setCommmentLoading(false);
        setComments(res.data.comment);
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
        postId: postdata._id,
        userName: User.userName,
        comment: comment,
      })
      .then((res) => {
        getComments();
        setComment("");
      })
      .catch((err) => console.log(err.response));
  };

  return (
    <>
      <div className="post">
        <div
          onClick={() => {
            history.push(`/profile/${user.userId}`);
          }}
          className="post__header"
          style={{ cursor: "pointer" }}
        >
          {loading ? (
            <>
              {" "}
              <Skeleton
                animation="wave"
                variant="circle"
                style={{
                  width: "4rem",
                  height: "4rem",
                  margin: "0.8rem",
                  marginLeft: "0",
                }}
              />{" "}
              <Skeleton
                animation="wave"
                variant="rect"
                style={{
                  width: "10rem",
                  height: "2rem",
                  margin: "0.8rem",
                  marginLeft: "0",
                  borderRadius: "0.5rem",
                }}
              />
            </>
          ) : (
            <>
              <Avatar
                src={`${
                  user.profileImg !== ""
                    ? `${process.env.REACT_APP_UPLOAD}/profilepic/${user.profileImg}`
                    : ""
                }`}
                style={{ height: "3rem", width: "3rem" }}
              />
              <h2>{user.userName}</h2>
            </>
          )}
        </div>
        <div className="post__caption">
          {loading ? (
            <>
              <Skeleton
                animation="wave"
                variant="rect"
                style={{
                  width: "30rem",
                  height: "1.5rem",
                  margin: "0.8rem",
                  marginLeft: "0",
                  borderRadius: "0.5rem",
                }}
              />
              <Skeleton
                animation="wave"
                variant="rect"
                style={{
                  width: "25rem",
                  height: "1rem",
                  margin: "0.8rem",
                  marginLeft: "0",
                  borderRadius: "0.5rem",
                }}
              />
            </>
          ) : (
            <>
              <h3>{postdata.title}</h3>
              <p>{postdata.caption}</p>
            </>
          )}
        </div>
        {postdata.imgPath !== "" ? (
          <div className="post__image">
            <img src={baseURL} alt="" />
          </div>
        ) : (
          <></>
        )}

        <div className="post__footer">
          <div className="post__footerLeft">
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
        </div>
        <div className="post__timestamp">
          <p>
            {new Date(postdata.createdAt).toLocaleString("en-US", {
              hour12: true,
              hour: "numeric",
              minute: "numeric",
              day: "numeric",
              month: "short",
            })}
          </p>
        </div>
        <div className="post__comment">
          <div className="post__commentAdd">
            <textarea
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
        <Accordion
          expanded={expanded === "panel1"}
          onChange={handleChange("panel1")}
          className="accordian"
          style={{ boxShadow: "none" }}
        >
          <AccordionSummary
            expandIcon={<ExpandMoreRoundedIcon style={{ fontSize: "3rem" }} />}
            aria-controls="panel1bh-content"
            id="panel1bh-header"
            className="accordian__header"
            style={{ boxShadow: "none" }}
          >
            <h3>View Comments</h3>
          </AccordionSummary>
          <AccordionDetails className="accordian__details">
            {commentLoading ? (
              <div style={{ display: "flex", alignItems: "center" }}>
                <Skeleton
                  animation="wave"
                  variant="circle"
                  style={{
                    width: "3rem",
                    height: "3rem",
                    margin: "0.8rem",
                    marginLeft: "0",
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
            ) : (
              <>
                {comments.length !== 0 ? (
                  <>
                    {comments.map((c) => {
                      return <Comment comment={c} />;
                    })}{" "}
                  </>
                ) : (
                  <p
                    style={{
                      fontSize: "1.5rem",
                      color: "grey",
                      textAlign: "center",
                    }}
                  >
                    No comments
                  </p>
                )}
              </>
            )}
          </AccordionDetails>
        </Accordion>
      </div>
    </>
  );
}

export default Post;
