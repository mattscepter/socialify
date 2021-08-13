import { IconButton } from "@material-ui/core";
import React, { useState } from "react";
import "./ChatMessages.scss";
import SendRoundedIcon from "@material-ui/icons/SendRounded";
import Message from "./Message";
import ScrollableFeed from "react-scrollable-feed";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteConvo,
  selectedconvo,
  sendMsg,
  shiftconvo,
} from "../../context/actions/convoactions";
import ArrowBackRoundedIcon from "@material-ui/icons/ArrowBackRounded";
import { useMediaQuery } from "@material-ui/core";
import BadgeAvatars from "../avatar/BadgeAvatar";
import DeleteIcon from "@material-ui/icons/Delete";

function ChatMessages({ setChatDisplay }) {
  const selected = useSelector((state) => state.convo.selected);
  const selectedImg = useSelector((state) => state.convo.selectedImg);
  const socket = useSelector((state) => state.auth.socket);
  const user = useSelector((state) => state.auth.user);
  const dispatch = useDispatch();
  const [message, setuserMsg] = useState({
    sender: user.userId,
    message: "",
  });
  const mobile = useMediaQuery("(max-width:600px)");
  const currentChat = selected?.members;
  const currentUser = currentChat?.filter((c) => c.userId !== user.userId)[0];
  const onlineusers = useSelector((state) => state.auth.onlineusers);

  return (
    <div className="chatmessages">
      <div className="chatmessages__header">
        {selected === null ? (
          <div style={{ width: "100%" }}>
            <p
              style={{
                color: "white",
                textAlign: "center",
                fontSize: "2rem",
                fontWeight: "300",
              }}
            >
              Your messages will show here
            </p>
          </div>
        ) : (
          <>
            <div className="chatmessages__headerLeft">
              {mobile && (
                <IconButton
                  onClick={() => {
                    setChatDisplay(false);
                    dispatch(selectedconvo(null));
                  }}
                >
                  <ArrowBackRoundedIcon
                    style={{ fontSize: "3rem", color: "white" }}
                  />
                </IconButton>
              )}
              <BadgeAvatars
                dimension="4"
                disp={
                  onlineusers.filter(
                    (c) => c.userId === currentUser.userId
                  )[0] === undefined
                    ? false
                    : true
                }
                url={`${process.env.REACT_APP_UPLOAD}/profilepic/${selectedImg}`}
              />
              <div className="chatmessages__headerLeftDetail">
                <h2 className="chatmessages__headerLeftDetailUsername">
                  {currentUser?.userName}
                </h2>
                <p>{currentUser?.name}</p>
              </div>
            </div>
            <div className="chatmessages__headerRight">
              <IconButton
                onClick={() => {
                  setChatDisplay(false);
                  dispatch(deleteConvo(selected._id));
                }}
              >
                <DeleteIcon style={{ fontSize: "3rem", color: "white" }} />
              </IconButton>
            </div>
          </>
        )}
      </div>
      <div className="chatmessages__body">
        {selected === null ? (
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              height: "100%",
            }}
          >
            <p
              style={{
                textAlign: "center",
                fontSize: "4rem",
                fontWeight: "300",
              }}
            >
              Select a chat or start a new one
            </p>
          </div>
        ) : (
          <ScrollableFeed className="chatmessages__bodyScroll">
            {selected?.messages?.map((m, index) => {
              return (
                <div key={index}>
                  <Message
                    message={m}
                    type={m.sender === user.userId ? "reciever" : "sender"}
                  />
                </div>
              );
            })}
          </ScrollableFeed>
        )}
      </div>

      {selected === null ? (
        <></>
      ) : (
        <>
          <div className="chatmessages__footer">
            <textarea
              type="text"
              placeholder="Type your message"
              value={message.message}
              onChange={(e) =>
                setuserMsg({ ...message, message: e.target.value })
              }
            />
            <IconButton
              onClick={(e) => {
                e.preventDefault();
                dispatch(sendMsg(selected._id, message));
                setuserMsg({ ...message, message: "" });
                socket.emit("sendMessage", {
                  conversationId: selected._id,
                  senderId: user.userId,
                  recieverId: selected?.members?.filter(
                    (m) => m.userId !== user.userId
                  )[0].userId,
                  message: message.message,
                });
                dispatch(shiftconvo(selected._id));
              }}
              className="chatmessages__footerSendButton"
            >
              <SendRoundedIcon className="chatmessages__footerSendButtonIcon" />
            </IconButton>
          </div>
        </>
      )}
    </div>
  );
}

export default ChatMessages;
