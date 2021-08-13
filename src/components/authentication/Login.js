import { Button, CircularProgress } from "@material-ui/core";
import React, { useState, useEffect } from "react";
import "./form.scss";
import { useHistory } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { loginUser } from "../../context/actions/authactions";

const Login = ({ auth }) => {
  const authstate = useSelector((state) => state.auth.authstate);
  const loading = useSelector((state) => state.auth.loading);
  const error = useSelector((state) => state.auth.error);
  const dispatch = useDispatch();
  const history = useHistory();
  const [user, setUSer] = useState({
    user: "",
    password: "",
  });

  useEffect(() => {
    if (authstate) {
      history.push("/");
    } else if (error !== "") {
      setUSer({
        user: "",
        password: "",
      });
    }
  }, [authstate, error, history]);

  const handleInput = (e) => {
    setUSer({ ...user, [e.target.name]: e.target.value });
  };

  const login = async (e) => {
    e.preventDefault();
    dispatch(loginUser(user));
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
      {error !== "" &&
      error !== undefined &&
      error !== "Unauthorized: No token provided" ? (
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
