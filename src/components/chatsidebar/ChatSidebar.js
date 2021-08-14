import React, { useState, useEffect } from "react";
import "./ChatSidebar.scss";
import Conversation from "./Conversation";
import ClickAwayListener from "@material-ui/core/ClickAwayListener";
import { IconButton } from "@material-ui/core";
import SearchIcon from "@material-ui/icons/Search";
import { useSelector, useDispatch } from "react-redux";
import { addConvo } from "../../context/actions/convoactions";
import BadgeAvatars from "../avatar/BadgeAvatar";
import ScrollableFeed from "react-scrollable-feed";

function ChatSidebar({ setChatDisplay }) {
  const [search, setsearch] = useState("");
  const [display, setdisplay] = useState(false);
  const [chatSearched, setChatSearched] = useState([]);
  const socket = useSelector((state) => state.auth.socket);
  const follower = useSelector((state) => state.follower.followers);
  const following = useSelector((state) => state.follower.following);
  const user = useSelector((state) => state.auth.user);
  const convo = useSelector((state) => state.convo.convo);
  const onlineusers = useSelector((state) => state.auth.onlineusers);
  const dispatch = useDispatch();

  useEffect(() => {
    socket.emit("find_user", search);
    socket.on("find_user_result", function (user) {
      setChatSearched(user);
    });
  }, [search, socket]);

  const addconvo = async (data) => {
    dispatch(addConvo(data, user, convo, data.profileImg));
  };

  return (
    <div className="sidebar">
      <div className="sidebar__header">
        <div className="sidebar__headerH3">
          <h3>Conversations</h3>
        </div>
        <ClickAwayListener
          onClickAway={() => {
            setdisplay(false);
            setsearch("");
            setChatSearched([]);
          }}
        >
          <div className="sidebar__searchBox">
            {display ? (
              <div className="sidebar__searchBoxResult">
                <div className="sidebar__searchBoxResultSearch">
                  <input
                    className="sidebar__searchBoxResultSearchInput"
                    type="text"
                    placeholder="Enter name or username"
                    value={search}
                    onChange={(e) => setsearch(e.target.value)}
                    onFocus={() => setdisplay(true)}
                  />
                </div>
                <h4>Search results</h4>
                <div className="sidebar__searchBoxResultContainer">
                  {chatSearched.map((s) => {
                    return (
                      <>
                        {follower.includes(s._id) ||
                        following.includes(s._id) ? (
                          <div
                            key={s._id}
                            onClick={() => {
                              setdisplay(false);
                              addconvo(s);
                            }}
                            className="sidebar__searchBoxResultContainerOptions"
                          >
                            <BadgeAvatars
                              dimension="3.5"
                              url={`${process.env.REACT_APP_UPLOAD}/profilepic/${s.profileImg}`}
                              disp={
                                onlineusers.filter(
                                  (c) => c.userId === s._id
                                )[0] === undefined
                                  ? false
                                  : true
                              }
                            />

                            <div>
                              <p style={{ fontWeight: "500" }}>{s.userName}</p>
                              <p>{s.name}</p>
                            </div>
                          </div>
                        ) : (
                          <></>
                        )}
                      </>
                    );
                  })}
                </div>
              </div>
            ) : null}
            <IconButton
              className="sidebar__searchBoxButton"
              onClick={() => setdisplay(!display)}
            >
              <SearchIcon className="sidebar__searchBoxButtonIcon" />
            </IconButton>
          </div>
        </ClickAwayListener>
      </div>
      <ScrollableFeed>
        <div className="sidebar__conversations">
          {convo?.map((c) => {
            return (
              <div key={c._id}>
                <Conversation
                  convo={c}
                  userId={user.userId}
                  setChatDisplay={setChatDisplay}
                />
              </div>
            );
          })}
        </div>
      </ScrollableFeed>
    </div>
  );
}

export default ChatSidebar;
