import React, { useState } from "react";
import "./LeftInfo.scss";
import PhotoIcon from "@material-ui/icons/Photo";
import { Button, IconButton, TextareaAutosize } from "@material-ui/core";
import Compressor from "compressorjs";
import axiosInstance from "../../utils/axiosInstance";
import { useSelector, useDispatch } from "react-redux";
import ClearRoundedIcon from "@material-ui/icons/ClearRounded";
import { CircularProgress } from "@material-ui/core";
import { posted } from "../../context/actions/postactions";

function LeftInfo() {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.user);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [post, setPost] = useState({
    title: "",
    caption: "",
  });
  const [img, setImg] = useState({
    file: null,
  });

  const handleCompressedUpload = (e) => {
    const image = e.target.files[0];
    new Compressor(image, {
      quality: 0.4,
      maxWidth: 1500,
      success: (compressedResult) => {
        setImg(compressedResult);
      },
    });
  };

  const postData = async (e) => {
    e.preventDefault();
    setLoading(true);
    const { title, caption } = post;
    let imageFormObj = new FormData();

    imageFormObj.append("imageName", "multer-image-" + Date.now());
    imageFormObj.append("imageData", img);
    imageFormObj.append("userId", user.userId);
    imageFormObj.append("title", title);
    imageFormObj.append("caption", caption);
    imageFormObj.append("userName", user.userName);
    imageFormObj.append("profileImg", user.profileImg);

    await axiosInstance
      .post("/post/addpost", imageFormObj)
      .then((res) => {
        dispatch(posted(title));
        setLoading(false);
        setPost({ title: "", caption: "" });
        setImg({ file: null });
        console.log("Posted");
      })
      .catch((err) => {
        setLoading(false);
        if (err.response) {
          setError(err.response.data.error);
        } else {
          console.log(err);
        }
        ErrorTimeout();
      });
  };

  const ErrorTimeout = () => {
    setTimeout(() => {
      setError("");
    }, 3000);
  };

  return (
    <>
      <div className="leftinfo">
        <div className="addpost">
          <h2>Add Post</h2>
          <form>
            <div className="title">
              <label>Title: </label>
              <input
                type="text"
                placeholder="Enter title"
                value={post.title}
                onChange={(e) => setPost({ ...post, title: e.target.value })}
              />
            </div>
            <div className="caption">
              <label>Caption: </label>
              <TextareaAutosize
                placeholder="Enter your caption"
                value={post.caption}
                onChange={(e) => setPost({ ...post, caption: e.target.value })}
              ></TextareaAutosize>
            </div>
            <div className="addimg">
              <input
                type="file"
                id="file"
                onChange={(e) => handleCompressedUpload(e)}
              />
              <label htmlFor="file">
                {img.file === null ? (
                  <>
                    <PhotoIcon style={{ fontSize: "2rem" }} />
                    <p>Add image</p>
                  </>
                ) : (
                  <p className="imageName">{img.name}</p>
                )}
              </label>
              {img.file !== null ? (
                <div className="cancelImg">
                  <IconButton
                    onClick={() => setImg({ file: null })}
                    style={{ height: "3rem", width: "3rem" }}
                  >
                    <ClearRoundedIcon
                      style={{ height: "2rem", width: "2rem" }}
                    />
                  </IconButton>
                </div>
              ) : (
                <></>
              )}
            </div>
            {error !== "" ? (
              <div className="error">
                <p>!! {error}</p>
              </div>
            ) : (
              <></>
            )}

            <div className="buttons">
              <Button type="submit" onClick={postData}>
                {loading ? (
                  <CircularProgress
                    style={{ height: "3rem", width: "3rem", color: "white" }}
                  />
                ) : (
                  <>Add Post</>
                )}
              </Button>
            </div>
          </form>
        </div>
      </div>
      {/* <div className="leftlogo">
        <img src={Plane} alt="" />
      </div> */}
    </>
  );
}

export default LeftInfo;
