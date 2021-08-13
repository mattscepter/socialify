import { IconButton } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import "./FollowersCard.scss";
import ClearRoundedIcon from "@material-ui/icons/ClearRounded";
import { useSelector, useDispatch } from "react-redux";
import { showfollowers } from "../../context/actions/followeractions";
import axiosInstance from "../../utils/axiosInstance";
import FollowersCardItem from "./FollowersCardItem";

function FollowersCard() {
  const user = useSelector((state) => state.auth.user);
  const type = useSelector((state) => state.follower.showfollower.type);
  const id = useSelector((state) => state.follower.showfollower.id);
  const data = useSelector((state) => state.follower.showfollower.data);
  const followers = useSelector((state) => state.follower);
  const [follower, setfollower] = useState([]);
  const dispatch = useDispatch();

  useEffect(() => {
    const getData = async (data) => {
      await axiosInstance
        .post("auth/getUserData", { data })
        .then((response) => setfollower(response.data))
        .catch((err) => console.log(err));
    };
    if (user.userId === id) {
      if (type === "Followers") {
        setfollower(followers.followersData);
      } else if (type === "Following") {
        setfollower(followers.followingData);
      }
    } else {
      getData(data);
      return function cleanup() {
        getData(data);
      };
    }
  }, [
    data,
    followers.followersData,
    followers.followingData,
    id,
    type,
    user.userId,
  ]);

  return (
    <div className="followercard">
      <IconButton
        style={{
          height: "4rem",
          width: "4rem",
          position: "absolute",
          top: "-4rem",
          right: "0",
        }}
        onClick={() =>
          dispatch(
            showfollowers({ type: null, show: false, id: null, data: [] })
          )
        }
      >
        <ClearRoundedIcon style={{ fontSize: "3.5rem", color: "#548ca8" }} />
      </IconButton>
      <h2>{type}</h2>
      <div className="followercard__List">
        {follower?.length === 0 ? (
          <p
            style={{
              fontSize: "2rem",
              textAlign: "center",
              color: "lightgray",
            }}
          >
            No {type} Available
          </p>
        ) : (
          <>
            {follower?.map((f) => {
              return (
                <div key={f.userName} className="followercard__ListUser">
                  <FollowersCardItem
                    f={f}
                    userId={user.userId}
                    type={type}
                    id={id}
                  />
                </div>
              );
            })}
          </>
        )}
      </div>
    </div>
  );
}

export default FollowersCard;
