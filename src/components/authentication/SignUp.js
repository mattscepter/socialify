import { Button, CircularProgress } from "@material-ui/core";
import React, { useState } from "react";
import axiosInstance from "../../utils/axiosInstance";
import "./form.scss";
import UserData from "./UserData";

const SignUp = ({ auth }) => {
  const [user, setUSer] = useState({
    name: "",
    email: "",
    userName: "",
    password: "",
    cpassword: "",
  });
  const [datapage, setdatapage] = useState(false);
  const [userId, setUserId] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleInput = (e) => {
    setUSer({ ...user, [e.target.name]: e.target.value });
  };

  const register = async (e) => {
    e.preventDefault();
    setLoading(true);
    await axiosInstance
      .post("/auth/register", user)
      .then((res) => {
        setUserId(res.data._id);
        setdatapage(true);
        setLoading(false);
      })
      .catch((error) => {
        setLoading(false);
        setError(error.response.data.error);
        if (
          error.response.data.error === "Email already exists" ||
          error.response.data.error === "Invalid email"
        ) {
          setUSer({ ...user, email: "" });
        } else if (error.response.data.error === "Username already exists") {
          setUSer({ ...user, userName: "" });
        } else if (error.response.data.error === "Password not same") {
          setUSer({ ...user, password: "", cpassword: "" });
        }
      });
  };

  return (
    <div className="authentication__input">
      {datapage ? (
        <>
          <UserData auth={auth} userId={userId} />
        </>
      ) : (
        <>
          <h2>Register</h2>
          <div className="authentication__inputContainer">
            <input
              type="text"
              placeholder="Enter Name"
              onChange={handleInput}
              name="name"
              value={user.name}
            />
          </div>
          <div className="authentication__inputContainer">
            <input
              type="text"
              placeholder="Enter Username"
              onChange={handleInput}
              name="userName"
              value={user.userName}
            />
          </div>
          <div className="authentication__inputContainer">
            <input
              type="text"
              placeholder="Enter Email"
              onChange={handleInput}
              name="email"
              value={user.email}
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
          <div className="authentication__inputContainer">
            <input
              type="text"
              placeholder="Confirm Password"
              onChange={handleInput}
              name="cpassword"
              value={user.cpassword}
            />
          </div>
          {error !== "" ? (
            <div className="error">
              <p>!! {error}</p>
            </div>
          ) : (
            <></>
          )}

          <Button className="primary" onClick={register}>
            {loading ? (
              <CircularProgress
                style={{ height: "3rem", width: "3rem", color: "white" }}
              />
            ) : (
              <>SignUp</>
            )}
          </Button>
          <Button className="secondary" onClick={() => auth("Login")}>
            Login
          </Button>
        </>
      )}
    </div>
  );
};

export default SignUp;
