import React from "react";
import "./Comment.scss";
import { Avatar } from "@material-ui/core";
import { useHistory } from "react-router-dom";

function Comment({ comment }) {
  const history = useHistory();
  return (
    <div className="comment">
      <div
        onClick={() => {
          history.push(`/profile/${comment.userId}`);
        }}
        className="comment__header"
      >
        <Avatar style={{ width: "2.5rem", height: "2.5rem" }} />
        <p>
          {comment.userName} <span>{comment.comment}</span>
        </p>
      </div>
      <div className="comment__timestamp">
        <p>
          {new Date(comment.createdAt).toLocaleString("en-US", {
            hour12: true,
            hour: "numeric",
            minute: "numeric",
            day: "numeric",
            month: "short",
          })}
        </p>
      </div>
    </div>
  );
}

export default Comment;
