import React, { useEffect, useState } from "react";
import "./Timeline.scss";
import Post from "../post/Post";
import { useSelector } from "react-redux";
import axiosInstance from "../../utils/axiosInstance";
import Loading from "../../components/loading/Loading";

function Timeline() {
  const posted = useSelector((state) => state.posted);
  const user = useSelector((state) => state.user);
  const [post, setPost] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const getPost = async () => {
      setLoading(true);
      await axiosInstance
        .get(`/post/getposts/${user.userId}`)
        .then((res) => {
          setPost(
            res.data.sort((p1, p2) => {
              return new Date(p2.createdAt) - new Date(p1.createdAt);
            })
          );
          setLoading(false);
        })
        .catch((err) => {
          console.log(err);
        });
    };
    getPost();
  }, [user.userId, posted]);

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
