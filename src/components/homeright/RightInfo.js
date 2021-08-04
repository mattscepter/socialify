import React from "react";
import "./RightInfo.scss";
import { Avatar } from "@material-ui/core";
import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom";

function RightInfo({ postcount, follow }) {
  const history = useHistory();
  const user = useSelector((state) => state.user);

  return (
    <div className="rightinfo">
      <div className="rightinfo-top">
        <div
          onClick={() => {
            history.push(`/profile/${user.userId}`);
          }}
          className="rightinfo-top__header"
          style={{ cursor: "pointer" }}
        >
          <Avatar
            className="rightinfo-top__header-Avatar"
            src={`${process.env.REACT_APP_UPLOAD}/profilepic/${user.profileImg}`}
            style={{ width: "8rem", height: "8rem", margin: "1rem" }}
          />
          <h2>{user.userName}</h2>
        </div>
        <div className="rightinfo-top__middle">
          <h2>{user.name}</h2>
          <p>{user.discription}</p>
        </div>
        <div className="rightinfo-top__footer">
          <div className="rightinfo-top__footerBox">
            <h4>Posts</h4>
            <h5>{postcount}</h5>
          </div>
          <div className="rightinfo-top__footerBox">
            <h4>Followers</h4>
            <h5>{follow.followers?.length}</h5>
          </div>
          <div className="rightinfo-top__footerBox">
            <h4>Following</h4>
            <h5>{follow.following?.length}</h5>
          </div>
        </div>
      </div>
    </div>
  );
}

export default RightInfo;
