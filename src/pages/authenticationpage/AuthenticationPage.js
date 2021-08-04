import React, { useState } from "react";
import "./AuthenticationPage.scss";
import SocialifyMain from "../../assets/photos/SocialifyMain.svg";
import SignUp from "../../components/authentication/SignUp";
import Login from "../../components/authentication/Login";
import { useMediaQuery } from "@material-ui/core";

const AuthenticationPage = ({ Auth }) => {
  const [auth, setAuth] = useState(Auth);

  const mobile = useMediaQuery("(max-width:900px)");

  return (
    <div className="authentication">
      <img src={SocialifyMain} alt="Socialify Logo" />
      {!mobile && <div className="divider"></div>}
      {auth === "Login" ? <Login auth={setAuth} /> : <SignUp auth={setAuth} />}
    </div>
  );
};

export default AuthenticationPage;
