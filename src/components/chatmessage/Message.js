import React from "react";
import "./Message.scss";

function Message({ type, message }) {
  const time = new Date(message.createdAt).toLocaleString("en-US", {
    hour12: true,
    hour: "numeric",
    minute: "numeric",
    day: "numeric",
    month: "short",
  });

  return (
    <div className={`chat__message ${type}`}>
      <p
        style={{
          margin: "0",
          paddingBottom: "0.1rem",
          maxWidth: "100%",
          wordWrap: "break-word",
        }}
      >
        {message.message}
      </p>
      <p style={{ fontSize: "1rem", margin: "0" }}>{time}</p>
    </div>
  );
}

export default Message;
