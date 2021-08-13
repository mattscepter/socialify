import React, { useState } from "react";
import ChatMessages from "../../components/chatmessage/ChatMessages";
import ChatSidebar from "../../components/chatsidebar/ChatSidebar";
import Loading from "../../components/loading/Loading";
import "./Chatpage.scss";
import { useMediaQuery } from "@material-ui/core";

function Chatpage() {
  const [chatDisplay, setChatDisplay] = useState(false);
  const [loading, setloading] = useState(true);

  const mobile = useMediaQuery("(max-width:600px)");

  setTimeout(() => {
    setloading(false);
  }, 500);

  return (
    <>
      {loading ? (
        <Loading />
      ) : (
        <div className="chatpage">
          <div className="chatpage__body">
            {!mobile && (
              <>
                <ChatSidebar
                  className="chatpage__bodySidebar"
                  setChatDisplay={setChatDisplay}
                />
                <ChatMessages
                  setChatDisplay={setChatDisplay}
                  className="chatpage__bodyMessage"
                />
              </>
            )}
            {mobile && (
              <>
                {chatDisplay ? (
                  <>
                    <ChatMessages setChatDisplay={setChatDisplay} />
                  </>
                ) : (
                  <>
                    <ChatSidebar setChatDisplay={setChatDisplay} />
                  </>
                )}
              </>
            )}
          </div>
        </div>
      )}
    </>
  );
}

export default Chatpage;
