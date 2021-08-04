import { CircularProgress } from "@material-ui/core";
import React from "react";
import "./Loading.scss";

function Loading() {
  return (
    <div className="loading">
      <CircularProgress className="loading__icon" />
    </div>
  );
}

export default Loading;
