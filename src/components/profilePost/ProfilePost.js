import React, { useState, useEffect } from "react";
import Profile from "../profile/Profile";
import axiosInstance from "../../utils/axiosInstance";
import Socialify from "../../assets/photos/SocialifyMain.svg";
import "./ProfilePost.scss";
import { CircularProgress } from "@material-ui/core";

function ProfilePost({ user, setpostdeleted, setpostSelected }) {
  const [display, setDisplay] = useState(false);
  const [userPost, setUserPost] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedPost, setSelectedPost] = useState({});

  useEffect(() => {
    const getPost = async () => {
      setLoading(true);
      await axiosInstance
        .get(`/post/getpost/${user.userId}`)
        .then((res) => {
          setLoading(false);
          setUserPost(
            res.data.sort((p1, p2) => {
              return new Date(p2.createdAt) - new Date(p1.createdAt);
            })
          );
        })
        .catch((err) => {
          setLoading(false);
          console.log(err);
        });
    };
    getPost();
  }, [user]);

  return (
    <>
      {loading ? (
        <CircularProgress className="loadingIcon" />
      ) : (
        <>
          {display ? (
            <Profile
              setDisplay={setDisplay}
              post={selectedPost}
              user={user}
              postdeleted={setpostdeleted}
              setpostSelected={setpostSelected}
            />
          ) : (
            <></>
          )}
          {userPost.length !== 0 ? (
            <>
              <div className="profilePage__postGrid">
                {userPost.map((post) => {
                  return (
                    <div
                      className="profilePage__postGridPost"
                      onClick={() => {
                        setSelectedPost(true);
                        setSelectedPost(post);
                        setDisplay("1");
                      }}
                    >
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
                            objectFit: "contain",
                            opacity: "1",
                            height: "90%",
                            width: "90%",
                          }}
                        />
                      )}
                    </div>
                  );
                })}
              </div>
            </>
          ) : (
            <p style={{ fontSize: "2rem", padding: "1rem", color: "grey" }}>
              No Post Available
            </p>
          )}
        </>
      )}
    </>
  );
}

export default ProfilePost;
