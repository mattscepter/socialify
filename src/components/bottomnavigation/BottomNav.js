import React from "react";
import "./BottomNav.scss";
import BottomNavigation from "@material-ui/core/BottomNavigation";
import BottomNavigationAction from "@material-ui/core/BottomNavigationAction";
import { Avatar, Badge } from "@material-ui/core";
import AddCircleRoundedIcon from "@material-ui/icons/AddCircleRounded";
import HomeIcon from "@material-ui/icons/Home";
import ChatRoundedIcon from "@material-ui/icons/ChatRounded";
import NotificationsRoundedIcon from "@material-ui/icons/NotificationsRounded";
import { useHistory } from "react-router-dom";
import { useSelector } from "react-redux";

function BottomNav({ setAddPostDisp, setrequestsdisp, requests }) {
  const history = useHistory();
  const currentUser = useSelector((state) => state.auth.user);

  return (
    <div>
      <BottomNavigation className="bottomnav">
        <BottomNavigationAction
          onClick={() => history.push("/")}
          icon={<HomeIcon className="bottomnav__icon" />}
        />
        <BottomNavigationAction
          onClick={() => history.push("/chat")}
          icon={<ChatRoundedIcon className="bottomnav__icon" />}
        />
        <BottomNavigationAction
          onClick={() => setAddPostDisp(true)}
          icon={
            <AddCircleRoundedIcon
              style={{ fontSize: "6rem", color: "#476072" }}
            />
          }
        />

        <BottomNavigationAction
          onClick={() => setrequestsdisp(true)}
          icon={
            <Badge badgeContent={requests} color="primary" overlap="circular">
              <NotificationsRoundedIcon className="bottomnav__icon" />
            </Badge>
          }
        />
        <BottomNavigationAction
          onClick={() => history.push(`/profile/${currentUser.userId}`)}
          icon={
            <Avatar
              src={`${process.env.REACT_APP_UPLOAD}/profilepic/${currentUser.profileImg}`}
              style={{ height: "3.5rem", width: "3.5rem" }}
            />
          }
        />
      </BottomNavigation>
    </div>
  );
}

export default BottomNav;
