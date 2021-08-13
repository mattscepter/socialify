import React, { useState } from "react";
import Profile from "../profile/Profile";
import Socialify from "../../assets/photos/SocialifyMain.svg";
import "./ProfilePost.scss";
import { CircularProgress } from "@material-ui/core";
import { useSelector } from "react-redux";

function ProfilePost({ user, setpostdeleted, setpostSelected }) {
  const [display, setDisplay] = useState(false);
  const [selectedPost, setSelectedPost] = useState({});
  const loading = useSelector((state) => state.profile.profilepostloading);
  const userPost = useSelector((state) => state.profile.post);

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
                      key={post._id}
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
