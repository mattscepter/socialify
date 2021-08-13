import React from "react";
import "./Post.scss";
import Skeleton from "@material-ui/lab/Skeleton";
import { Accordion, IconButton } from "@material-ui/core";
import FavoriteIcon from "@material-ui/icons/Favorite";
import SendRoundedIcon from "@material-ui/icons/SendRounded";
import AccordionSummary from "@material-ui/core/AccordionSummary";
import ExpandMoreRoundedIcon from "@material-ui/icons/ExpandMoreRounded";

function PostLoading() {
  return (
    <>
      <div className="post">
        <div className="post__header" style={{ cursor: "pointer" }}>
          <Skeleton
            animation="wave"
            variant="circle"
            style={{
              width: "4rem",
              height: "4rem",
              margin: "0.8rem",
              marginLeft: "0",
            }}
          />{" "}
          <Skeleton
            animation="wave"
            variant="rect"
            style={{
              width: "10rem",
              height: "2rem",
              margin: "0.8rem",
              marginLeft: "0",
              borderRadius: "0.5rem",
            }}
          />
        </div>
        <div className="post__caption">
          <Skeleton
            animation="wave"
            variant="rect"
            style={{
              width: "30rem",
              height: "1.5rem",
              margin: "0.8rem",
              marginLeft: "0",
              borderRadius: "0.5rem",
            }}
          />
          <Skeleton
            animation="wave"
            variant="rect"
            style={{
              width: "25rem",
              height: "1rem",
              margin: "0.8rem",
              marginLeft: "0",
              borderRadius: "0.5rem",
            }}
          />
        </div>

        <div
          className="post__image"
          style={{ height: "40rem", backgroundColor: "lightgray" }}
        ></div>

        <div className="post__footer">
          <div className="post__footerLeft">
            <IconButton style={{ height: "3.5rem", width: "3.5rem" }}>
              <FavoriteIcon className="icon" style={{ color: "lightgrey" }} />
            </IconButton>
            <Skeleton
              animation="wave"
              variant="rect"
              style={{
                width: "10rem",
                height: "1rem",
                margin: "0.8rem",
                marginLeft: "0",
                borderRadius: "0.5rem",
              }}
            />
          </div>
        </div>
        <div className="post__timestamp">
          <p></p>
        </div>
        <div className="post__comment">
          <div className="post__commentAdd">
            <textarea type="text" placeholder="Add Comment" />
            <IconButton>
              <SendRoundedIcon className="sendIcon" />
            </IconButton>
          </div>
        </div>
        <Accordion className="accordian" style={{ boxShadow: "none" }}>
          <AccordionSummary
            expandIcon={<ExpandMoreRoundedIcon style={{ fontSize: "3rem" }} />}
            aria-controls="panel1bh-content"
            id="panel1bh-header"
            className="accordian__header"
            style={{ boxShadow: "none" }}
          >
            <h3>View Comments</h3>
          </AccordionSummary>
        </Accordion>
      </div>
    </>
  );
}

export default PostLoading;
