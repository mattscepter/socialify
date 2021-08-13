import "./Requests.scss";
import React from "react";
import { useSelector } from "react-redux";
import Request from "../request/Request";
import Skeleton from "@material-ui/lab/Skeleton";

function Requests({ follow, followerLoading, setFollowed }) {
  const user = useSelector((state) => state.auth.user);
  const follower = useSelector((state) => state.follower);

  return (
    <div className="rightinfo-bottom">
      <h2>Follow requests</h2>
      <div className="requests">
        {followerLoading ? (
          <div
            style={{
              display: "flex",
              alignItems: "center",
              marginLeft: "3rem",
            }}
          >
            <Skeleton
              animation="wave"
              variant="circle"
              style={{
                width: "3rem",
                height: "3rem",
                margin: "0.8rem",
                marginLeft: "0",
                marginBottom: "0",
              }}
            />
            <Skeleton
              animation="wave"
              variant="rect"
              style={{
                width: "20rem",
                height: "1rem",
                margin: "0.8rem",
                marginLeft: "0",
                borderRadius: "0.5rem",
                marginBottom: "0",
              }}
            />
          </div>
        ) : (
          <>
            {" "}
            {follower.requests?.length === 0 ? (
              <p
                style={{
                  textAlign: "center",
                  fontSize: "1.5rem",
                  color: "gray",
                  paddingTop: "1rem",
                }}
              >
                No request available
              </p>
            ) : (
              <>
                {follower.requests?.map((request) => {
                  return (
                    <Request
                      request={request}
                      currentUser={user}
                      setFollowed={setFollowed}
                    />
                  );
                })}
              </>
            )}
          </>
        )}
      </div>
    </div>
  );
}

export default Requests;
