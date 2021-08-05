import React, { useEffect } from "react";
import "./Timeline.scss";
import Post from "../post/Post";
import { useSelector, useDispatch } from "react-redux";
import Loading from "../../components/loading/Loading";
import { getPosts } from "../../context/actions/postactions";

function Timeline() {
  const posted = useSelector((state) => state.auth.posted);
  const user = useSelector((state) => state.auth.user);
  const post = useSelector((state) => state.posts.posts);
  const loading = useSelector((state) => state.posts.loading);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getPosts(user));
  }, [dispatch, user, posted]);

  return (
    <>
      {loading ? (
        <Loading />
      ) : (
        <div className="timeline">
          {post?.length === 0 ? (
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
          ) : (
            <>
              {post.map((p) => {
                return <Post postdata={p} key={p._id} />;
              })}
            </>
          )}
        </div>
      )}
    </>
  );
}

export default Timeline;
