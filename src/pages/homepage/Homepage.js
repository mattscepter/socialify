import React, { useState, useEffect } from "react";
import LeftInfo from "../../components/homeleft/LeftInfo";
import RightInfo from "../../components/homeright/RightInfo";
import "./Homepage.scss";
import Timeline from "../../components/timeline/Timeline";
import { useMediaQuery } from "@material-ui/core";
import Requests from "../../components/requests/Requests";
import axiosInstance from "../../utils/axiosInstance";
import { useSelector } from "react-redux";

function Homepage() {
  const [follow, setfollow] = useState({});
  const [postcount, setpostcount] = useState();
  const user = useSelector((state) => state.auth.user);
  const posted = useSelector((state) => state.auth.posted);
  const accepted = useSelector((state) => state.auth.accepted);

  const tablet = useMediaQuery("(max-width:950px)");
  const mobile = useMediaQuery("(max-width:650px)");

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

  useEffect(() => {
    const getPostCount = async () => {
      await axiosInstance
        .get(`/post/postcount/${user.userId}`)
        .then((respon) => {
          setpostcount(respon.data);
        })
        .catch((err) => {
          if (err.response) console.log(err.response.data.error);
        });
    };
    getPostCount();
  }, [user.userId, posted]);

  return (
    <div>
      <div className="homebody">
        {!tablet && (
          <div className="homeleftrel">
            <div className="homeleft">
              <div className="homeleft__fixed">
                <LeftInfo />
              </div>
            </div>
          </div>
        )}
        <div className="homemiddle">
          <Timeline />
        </div>
        {!mobile && (
          <div className="homeright">
            <div className="homeright__absolute">
              <div className="homeright__relative">
                {!tablet && <RightInfo postcount={postcount} follow={follow} />}
                <Requests follow={follow} />
                {tablet && <LeftInfo />}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Homepage;
