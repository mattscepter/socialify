import React from "react";
import Badge from "@material-ui/core/Badge";
import Avatar from "@material-ui/core/Avatar";
import { makeStyles, withStyles } from "@material-ui/core/styles";

const StyledBadge = withStyles((theme) => ({
  badge: {
    backgroundColor: "#44b700",
    color: "#44b700",
    boxShadow: `0 0 0 2px ${theme.palette.background.paper}`,
    "&::after": {
      position: "absolute",
      top: 0,
      left: 0,
      width: "80%",
      height: "80%",
      borderRadius: "50%",
      animation: "$ripple 1.2s infinite ease-in-out",
      border: "1px solid currentColor",
      content: '""',
    },
  },
  "@keyframes ripple": {
    "0%": {
      transform: "scale(.8)",
      opacity: 1,
    },
    "100%": {
      transform: "scale(2.4)",
      opacity: 0,
    },
  },
}))(Badge);

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    "& > *": {
      margin: 0,
    },
  },
}));

export default function BadgeAvatars({
  url = "",
  dimension = "3",
  disp = false,
}) {
  const classes = useStyles();

  return (
    <>
      {disp ? (
        <div className={classes.root}>
          <StyledBadge
            overlap="circular"
            anchorOrigin={{
              vertical: "top",
              horizontal: "right",
            }}
            variant="dot"
          >
            <Avatar
              alt=""
              src={url}
              style={{ height: `${dimension}rem`, width: `${dimension}rem` }}
            />
          </StyledBadge>
        </div>
      ) : (
        <Avatar
          alt=""
          src={url}
          style={{ height: `${dimension}rem`, width: `${dimension}rem` }}
        />
      )}
    </>
  );
}
