import React, { useEffect, useState } from "react";
import "./Header.scss";
import SearchIcon from "@material-ui/icons/Search";
import ExitToAppRoundedIcon from "@material-ui/icons/ExitToAppRounded";
import HomeIcon from "@material-ui/icons/Home";
import ChatRoundedIcon from "@material-ui/icons/ChatRounded";
import { Avatar, IconButton, useMediaQuery } from "@material-ui/core";
import Socialify from "../../assets/photos/Socialify.svg";
import { useDispatch } from "react-redux";
import { logoutUser } from "../../context/actions/authactions";
import cookie from "js-cookie";
import { useHistory } from "react-router-dom";
import { useSelector } from "react-redux";
import ClickAwayListener from "@material-ui/core/ClickAwayListener";

function Header() {
  const [search, setsearch] = useState("");
  const [searchedUser, setsearchedUser] = useState([]);
  const dispatch = useDispatch();
  const history = useHistory();
  const currentUser = useSelector((state) => state.user);
  const socket = useSelector((state) => state.socket);
  const [display, setdisplay] = useState(false);

  const mobile = useMediaQuery("(max-width:650px)");

  useEffect(() => {
    socket.emit("find_user", search);
    socket.on("find_user_result", function (user) {
      setsearchedUser(user);
    });
  }, [search, socket]);

  const logout = (e) => {
    e.preventDefault();
    cookie.remove("jwt");
    dispatch(logoutUser());
    history.push("/");
  };

  return (
    <>
      {!mobile && (
        <div className="header">
          <div className="headerweb">
            <div
              onClick={() => {
                history.push("/");
              }}
              className="headerweb__logo"
            >
              <img src={Socialify} alt="Socialify logo" />
            </div>

            <div className="headerweb__search">
              <ClickAwayListener
                onClickAway={() => {
                  setsearchedUser([]);
                  setdisplay(false);
                }}
              >
                <div className="headerweb__searchBox">
                  {display ? (
                    <div className="headerweb__searchBoxResult">
                      <h4>Search results</h4>
                      <div className="headerweb__searchBoxResultContainer">
                        {searchedUser.map((s) => {
                          return (
                            <div
                              onClick={() => {
                                setdisplay(false);
                                history.push(`/profile/${s._id}`);
                              }}
                              className="headerweb__searchBoxResultContainerOptions"
                            >
                              <Avatar
                                src={`${process.env.REACT_APP_UPLOAD}/profilepic/${s.profileImg}`}
                                style={{ width: "3rem", height: "3rem" }}
                              />
                              <div>
                                <p style={{ fontWeight: "500" }}>
                                  {s.userName}
                                </p>
                                <p>{s.name}</p>
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  ) : null}

                  <input
                    className="headerweb__searchBoxInput"
                    type="text"
                    placeholder="Enter name or username"
                    value={search}
                    onChange={(e) => setsearch(e.target.value)}
                    onFocus={() => setdisplay(true)}
                  />
                  <SearchIcon className="headerweb__searchBoxIcon" />
                </div>
              </ClickAwayListener>
            </div>

            <div className="headerweb__icons">
              <IconButton
                onClick={() => {
                  history.push("/");
                }}
                style={{ height: "4.5rem", width: "4.5rem" }}
              >
                <HomeIcon className="headerweb__icon" />
              </IconButton>
              <IconButton style={{ height: "4.5rem", width: "4.5rem" }}>
                <ChatRoundedIcon
                  className="headerweb__icon"
                  style={{ paddingTop: "1.5rem" }}
                />
              </IconButton>
              <IconButton
                onClick={logout}
                style={{ height: "4.5rem", width: "4.5rem" }}
              >
                <ExitToAppRoundedIcon className="headerweb__icon" />
              </IconButton>
              <IconButton
                onClick={() => {
                  history.push(`/profile/${currentUser.userId}`);
                }}
                style={{ height: "6rem", width: "6rem", marginLeft: "1rem" }}
              >
                <Avatar
                  className="headerweb__avatar"
                  src={`${process.env.REACT_APP_UPLOAD}/profilepic/${currentUser.profileImg}`}
                />
              </IconButton>
            </div>
          </div>
        </div>
      )}

      {mobile && (
        <div className="header">
          <div className="headermobile">
            <IconButton onClick={logout} className="headermobile__logoutButton">
              <ExitToAppRoundedIcon className="headermobile__logoutButtonIcon" />
            </IconButton>
            <div
              onClick={() => {
                history.push("/");
              }}
              className="headermobile__logo"
            >
              <img src={Socialify} alt="Socialify logo" />
            </div>

            <div className="headermobile__search">
              <ClickAwayListener
                onClickAway={() => {
                  setdisplay(false);
                }}
              >
                <div className="headermobile__searchBox">
                  {display ? (
                    <div className="headermobile__searchBoxResult">
                      <div className="headermobile__searchBoxResultSearch">
                        <input
                          className="headermobile__searchBoxResultSearchInput"
                          type="text"
                          placeholder="Enter name or username"
                          value={search}
                          onChange={(e) => setsearch(e.target.value)}
                          onFocus={() => setdisplay(true)}
                        />
                      </div>
                      <h4>Search results</h4>
                      <div className="headermobile__searchBoxResultContainer">
                        {searchedUser.map((s) => {
                          return (
                            <div
                              onClick={() => {
                                setdisplay(false);
                                history.push(`/profile/${s._id}`);
                              }}
                              className="headermobile__searchBoxResultContainerOptions"
                            >
                              <Avatar
                                src={`${process.env.REACT_APP_UPLOAD}/profilepic/${s.profileImg}`}
                                style={{ width: "3rem", height: "3rem" }}
                              />
                              <div>
                                <p style={{ fontWeight: "500" }}>
                                  {s.userName}
                                </p>
                                <p>{s.name}</p>
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  ) : null}
                  <IconButton
                    className="headermobile__searchBoxButton"
                    onClick={() => setdisplay(!display)}
                  >
                    <SearchIcon className="headermobile__searchBoxButtonIcon" />
                  </IconButton>
                </div>
              </ClickAwayListener>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default Header;
