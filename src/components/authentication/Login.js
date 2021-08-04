import { Button, CircularProgress } from "@material-ui/core";
import React, { useState } from "react";
import "./form.scss";
import axiosInstance from "../../utils/axiosInstance";
import cookie from "js-cookie";
import { useHistory } from "react-router-dom";
import {
  loginLoading,
  loginSuccess,
  loginError,
} from "../../context/actions/authactions";
import { useSelector, useDispatch } from "react-redux";
import io from "socket.io-client";

const Login = ({ auth }) => {
  const loading = useSelector((state) => state.loading);
  const error = useSelector((state) => state.error);
  const dispatch = useDispatch();
  const history = useHistory();
  const [user, setUSer] = useState({
    user: "",
    password: "",
  });

  const handleInput = (e) => {
    setUSer({ ...user, [e.target.name]: e.target.value });
  };

  const login = async (e) => {
    e.preventDefault();
    dispatch(loginLoading());
    await axiosInstance
      .post("/auth/signin", user)
      .then((res) => {
        console.log("loggedin");
        if (res.data.token) {
          const socket = io.connect(process.env.REACT_APP_BASE_URL);
          socket.emit("addUser", res.data.user.userId);
          dispatch(loginSuccess({ userData: res.data.user, socket: socket }));
          cookie.set("jwt", res.data.token, { expires: 1 });
        }
        history.push("/");
      })
      .catch((err) => {
        if (err.response) dispatch(loginError(err.response.data.error));
        setUSer({
          user: "",
          password: "",
        });
      });
  };

  return (
    <div className="authentication__input">
      <h2>Login</h2>
      <div className="authentication__inputContainer">
        <input
          type="text"
          placeholder="Enter Username or Email"
          onChange={handleInput}
          name="user"
          value={user.user}
        />
      </div>
      <div className="authentication__inputContainer">
        <input
          type="text"
          placeholder="Enter Password"
          onChange={handleInput}
          name="password"
          value={user.password}
        />
      </div>
      {error !== "" ? (
        <div className="error">
          <p>!! {error}</p>
        </div>
      ) : (
        <></>
      )}

      <Button className="primary" onClick={login}>
        {loading ? (
          <CircularProgress
            style={{ height: "3rem", width: "3rem", color: "white" }}
          />
        ) : (
          <>Login</>
        )}
      </Button>
      <Button className="secondary" onClick={() => auth("Signup")}>
        Sign Up
      </Button>
    </div>
  );
};

export default Login;
