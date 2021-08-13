import React from "react";
import "./Timeline.scss";
import Post from "../post/Post";
import { useSelector } from "react-redux";
import PostLoading from "../post/PostLoading";

function Timeline() {
  const post = useSelector((state) => state.posts);
  return (
    <>
      {post.loading ? (
        <PostLoading />
      ) : (
        <div className="timeline" style={{ overflowX: "hidden" }}>
          {post.posts.length !== 0 ? (
            <>
              {post.posts.map((p) => {
                return <Post postdata={p} key={p._id} />;
              })}
            </>
          ) : (
            <p
              style={{
                fontSize: "2.5rem",
                marginTop: "2rem",
                fontWeight: "500",
                color: "gray",
                textAlign: "center",
              }}
            >
              No post available
            </p>
          )}
        </div>
      )}
    </>
  );
}

export default Timeline;
