import React, { useEffect, useState } from "react";
import "./Conversation.scss";
import { useDispatch, useSelector } from "react-redux";
import { selectedconvo, selectedimg } from "../../context/actions/convoactions";
import BadgeAvatars from "../avatar/BadgeAvatar";
import axiosInstance from "../../utils/axiosInstance";

function Conversation({ convo, userId, setChatDisplay }) {
  const [userImg, setuserImg] = useState(null);
  const selected = useSelector((state) => state.convo.selected);
  const onlineusers = useSelector((state) => state.auth.onlineusers);
  const dispatch = useDispatch();
  let convoUser = convo?.members?.find((m) => m.userId !== userId);

  useEffect(() => {
    const getImg = async () => {
      await axiosInstance
        .get(`/auth/userImg/${convoUser.userId}`)
        .then((res) => {
          setuserImg(res.data.profileImg);
        })
        .catch((err) => console.log(err));
    };
    getImg();
    return function cleanup() {
      getImg();
    };
  }, [convoUser.userId]);

  return (
    <div
      onClick={() => {
        dispatch(selectedconvo(convo));
        dispatch(selectedimg(userImg));
        setChatDisplay(true);
      }}
      style={{
        backgroundColor: `${selected?._id === convo._id ? "lightgray" : ""}`,
      }}
      className="conversation"
    >
      <BadgeAvatars
        dimension="4"
        url={`${process.env.REACT_APP_UPLOAD}/profilepic/${userImg}`}
        disp={
          onlineusers.filter((c) => c.userId === convoUser.userId)[0] ===
          undefined
            ? false
            : true
        }
      />
      <h2 className="conversation__username">{convoUser.userName}</h2>
    </div>
  );
}

export default Conversation;
