import "./App.scss";
import AuthenticationPage from "./pages/authenticationpage/AuthenticationPage";
import BottomNav from "./components/bottomnavigation/BottomNav";
import Homepage from "./pages/homepage/Homepage";
import { Switch, Route, Redirect } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import ProfilePage from "./pages/profilepage/ProfilePage";
import Header from "./components/header/Header";
import { useEffect, useState } from "react";
import cookie from "js-cookie";
import axiosInstance from "./utils/axiosInstance";
import {
  loginLoading,
  loginSuccess,
  loginError,
} from "./context/actions/authactions";
import Loading from "./components/loading/Loading";
import io from "socket.io-client";
import { IconButton, useMediaQuery } from "@material-ui/core";
import LeftInfo from "./components/homeleft/LeftInfo";
import ClearRoundedIcon from "@material-ui/icons/ClearRounded";
import Requests from "./components/requests/Requests";

function App() {
  const loading = useSelector((state) => state.loading);
  const authstate = useSelector((state) => state.authstate);
  const dispatch = useDispatch();
  const [addPostDisp, setAddPostDisp] = useState(false);
  const [requestsdisp, setrequestsdisp] = useState(false);
  const [follow, setfollow] = useState({});
  const user = useSelector((state) => state.user);
  const accepted = useSelector((state) => state.accepted);

  const mobile = useMediaQuery("(max-width:650px)");

  useEffect(() => {
    const callChatPage = async () => {
      dispatch(loginLoading());
      const headers = {
        authorization: cookie.get("jwt"),
      };
      await axiosInstance
        .get("/auth/homepage", {
          headers,
        })
        .then((res) => {
          const socket = io.connect(process.env.REACT_APP_BASE_URL);
          dispatch(loginSuccess({ userData: res.data.user, socket: socket }));
          socket.emit("addUser", res.data.user.userId);
        })
        .catch((err) => {
          if (err.response) {
            dispatch(loginError(err.response.data.error));
          }
          console.log(err);
        });
    };

    callChatPage();
  }, [dispatch]);

  useEffect(() => {
    const getfollow = async () => {
      await axiosInstance
        .get(`/api/follower/${user.userId}`)
        .then(async (res) => {
          setfollow(res.data);
        })
        .catch((err) => {
          console.log(err.response.data.error);
        });
    };
    getfollow();
  }, [user.userId, accepted]);

  return (
    <div className="App">
      {loading ? (
        <Loading />
      ) : (
        <>
          {authstate ? <Header /> : <></>}
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
          </Switch>
          {authstate && addPostDisp ? (
            <>
              <div className="App__add">
                <div className="App__addpost">
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
                  <Requests follow={follow} />
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
                  requests={follow?.requests?.length}
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
