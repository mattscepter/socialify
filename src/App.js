import "./App.scss";
import AuthenticationPage from "./pages/authenticationpage/AuthenticationPage";
import BottomNav from "./components/bottomnavigation/BottomNav";
import Homepage from "./pages/homepage/Homepage";
import { Switch, Route, Redirect } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import ProfilePage from "./pages/profilepage/ProfilePage";
import Header from "./components/header/Header";
import { useEffect, useState } from "react";
import Loading from "./components/loading/Loading";
import { IconButton, useMediaQuery } from "@material-ui/core";
import LeftInfo from "./components/homeleft/LeftInfo";
import ClearRoundedIcon from "@material-ui/icons/ClearRounded";
import Requests from "./components/requests/Requests";
import { fetchUserToken, setonlineusers } from "./context/actions/authactions";
import Chatpage from "./pages/chatpage/Chatpage";
import { getPosts } from "./context/actions/postactions";
import {
  getFollowerData,
  GetFollowers,
  getFollowingData,
} from "./context/actions/followeractions";
import FollowersCard from "./components/followers/FollowersCard";
import { getConvo, addmsg, shiftconvo } from "./context/actions/convoactions";

function App() {
  const socket = useSelector((state) => state.auth.socket);
  const loading = useSelector((state) => state.auth.getuserloading);
  const authstate = useSelector((state) => state.auth.authstate);
  const posted = useSelector((state) => state.posts.posted);
  const dispatch = useDispatch();
  const [addPostDisp, setAddPostDisp] = useState(false);
  const [requestsdisp, setrequestsdisp] = useState(false);
  const user = useSelector((state) => state.auth.user);
  const edited = useSelector((state) => state.auth.edited);
  const follower = useSelector((state) => state.follower);
  const mobile = useMediaQuery("(max-width:710px)");

  useEffect(() => {
    dispatch(getConvo(user.userId));
  }, [dispatch, user.userId]);

  useEffect(() => {
    dispatch(fetchUserToken());
    return function cleanup() {
      dispatch(fetchUserToken());
    };
  }, [dispatch, edited]);

  useEffect(() => {
    dispatch(getPosts(user));
    return function cleanup() {
      dispatch(getPosts(user));
    };
  }, [dispatch, user, posted]);

  useEffect(() => {
    dispatch(getFollowerData(follower.followers));
    return function cleanup() {
      dispatch(getFollowerData(follower.followers));
    };
  }, [dispatch, follower.followers, follower.accepted]);

  useEffect(() => {
    dispatch(getFollowingData(follower.following));
    return function cleanup() {
      dispatch(getFollowingData(follower.following));
    };
  }, [dispatch, follower.following]);

  useEffect(() => {
    dispatch(GetFollowers(user));
  }, [dispatch, user, follower.accepted]);

  useEffect(() => {
    socket?.on("getMessage", function (data) {
      dispatch(
        addmsg({
          _id: data.conversationId,
          message: {
            sender: data.senderId,
            message: data.message,
            createdAt: Date.now(),
          },
        })
      );
      dispatch(shiftconvo(data.conversationId));
    });
    socket?.on("getUsers", function (data) {
      dispatch(setonlineusers(data));
    });
  }, [dispatch, socket]);

  return (
    <div className="App">
      {loading ? (
        <Loading />
      ) : (
        <>
          {authstate ? <Header /> : <></>}
          {authstate ? <div style={{ height: "6rem" }}></div> : <></>}
          <Switch>
            <Route exact path="/">
              {authstate ? <Homepage /> : <AuthenticationPage Auth="Login" />}
            </Route>
            <Route path="/login">
              {authstate ? (
                <Redirect to="/" />
              ) : (
                <AuthenticationPage Auth="Login" />
              )}
            </Route>
            <Route path="/register">
              {authstate ? (
                <Redirect to="/" />
              ) : (
                <AuthenticationPage Auth="SignUp" />
              )}
            </Route>
            <Route path="/profile/:id">
              {authstate ? (
                <ProfilePage />
              ) : (
                <AuthenticationPage Auth="Login" />
              )}
            </Route>
            <Route path="/chat">
              {authstate ? <Chatpage /> : <AuthenticationPage Auth="Login" />}
            </Route>
          </Switch>
          {authstate && addPostDisp ? (
            <>
              <div className="App__add">
                <div className="App__addpost" style={{ top: "20%" }}>
                  <IconButton
                    onClick={() => setAddPostDisp(false)}
                    className="App__addpostButton"
                  >
                    <ClearRoundedIcon className="App__addpostButtonIcon" />
                  </IconButton>
                  <LeftInfo />
                </div>
              </div>
            </>
          ) : (
            <></>
          )}
          {authstate && follower.showfollower?.show ? (
            <div className="App__add">
              <div className="App__addpost">
                <FollowersCard />
              </div>
            </div>
          ) : (
            <></>
          )}
          {authstate && requestsdisp ? (
            <>
              <div className="App__add">
                <div className="App__addpost">
                  <IconButton
                    onClick={() => setrequestsdisp(false)}
                    className="App__addpostButton"
                  >
                    <ClearRoundedIcon className="App__addpostButtonIcon" />
                  </IconButton>
                  <Requests />
                </div>
              </div>
            </>
          ) : (
            <></>
          )}

          {authstate ? (
            <>
              {mobile && (
                <BottomNav
                  setAddPostDisp={setAddPostDisp}
                  setrequestsdisp={setrequestsdisp}
                  requests={follower?.requests?.length}
                />
              )}
            </>
          ) : (
            <></>
          )}
        </>
      )}
    </div>
  );
}

export default App;
