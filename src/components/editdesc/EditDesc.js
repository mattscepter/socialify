import React from "react";
import "./EditDesc.scss";
import {
  Button,
  IconButton,
  TextareaAutosize,
  Avatar,
  CircularProgress,
  Switch,
} from "@material-ui/core";
import { useState } from "react";
import Compressor from "compressorjs";
import PhotoIcon from "@material-ui/icons/Photo";
import ClearRoundedIcon from "@material-ui/icons/ClearRounded";
import axiosInstance from "../../utils/axiosInstance";
import { useDispatch, useSelector } from "react-redux";
import "../authentication/form.scss";
import { editdata } from "../../context/actions/authactions";

function EditDesc({ seteditDisplay, user, setpostdeleted }) {
  const currentUser = useSelector((state) => state.auth.user);
  const dispatch = useDispatch();
  const [disc, setdisc] = useState(currentUser.discription);
  const [imgDisp, setImgDisp] = useState(
    `${process.env.REACT_APP_UPLOAD}/profilepic/${currentUser.profileImg}`
  );
  const [loading, setLoading] = useState(false);
  const [removeImg, setRemoveImg] = useState(false);

  const [img, setImg] = useState({
    file: null,
  });

  const handleCompressedUpload = (e) => {
    const image = e.target.files[0];
    new Compressor(image, {
      quality: 0.3,
      maxWidth: 1000,
      success: (compressedResult) => {
        setImg(compressedResult);

        let reader = new FileReader();

        reader.onloadend = () => {
          setImgDisp(reader.result);
        };

        reader.readAsDataURL(compressedResult);
      },
    });
  };

  const saveData = async (e) => {
    e.preventDefault();
    setLoading(true);
    let imageFormObj = new FormData();
    imageFormObj.append("imageName", "multer-image-" + Date.now());
    imageFormObj.append("imageData", img);
    imageFormObj.append("userId", currentUser.userId);
    imageFormObj.append("discription", disc);
    imageFormObj.append("updateImg", removeImg);
    imageFormObj.append("profilePic", currentUser.profileImg);
    await axiosInstance
      .patch("/data/userdata", imageFormObj)
      .then((res) => {
        console.log(res);
        setLoading(false);
        seteditDisplay(false);
        setpostdeleted(imgDisp);
        dispatch(editdata(disc));
      })
      .then((err) => {
        setLoading(false);
        console.log(err);
      });
  };

  console.log(removeImg);
  console.log(img);

  return (
    <div className="authentication__input editdesc">
      <IconButton
        onClick={() => {
          seteditDisplay(false);
        }}
        className="profileback__cancelButton"
      >
        <ClearRoundedIcon className="profileback__cancelButtonIcon" />
      </IconButton>
      <Avatar
        src={imgDisp}
        style={{ width: "10rem", height: "10rem", marginBottom: "1rem" }}
      />
      {removeImg ? (
        <></>
      ) : (
        <>
          {" "}
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
                  style={{ height: "3rem", width: "3rem" }}
                  onClick={() => {
                    setImgDisp("");
                    setImg({ file: null });
                    setImgDisp(
                      `${process.env.REACT_APP_UPLOAD}/profilepic/${user.user.profileImg}`
                    );
                  }}
                >
                  <ClearRoundedIcon
                    style={{ height: "2rem", width: "2rem", color: "gray" }}
                  />
                </IconButton>
              </div>
            ) : (
              <></>
            )}
          </div>
        </>
      )}
      <div className="removeImg">
        <Switch
          checked={removeImg}
          onChange={(e) => {
            if (!removeImg) {
              setImgDisp("");
              setImg({ file: null });
            } else {
              setImgDisp(
                `${process.env.REACT_APP_UPLOAD}/profilepic/${user.user.profileImg}`
              );
            }
            setRemoveImg(e.target.checked);
          }}
          style={{ color: "#548ca8" }}
        />
        <p>Remove image</p>
      </div>

      <div className="authentication__inputContainer">
        <TextareaAutosize
          placeholder="Description"
          value={disc}
          onChange={(e) => setdisc(e.target.value)}
        ></TextareaAutosize>
      </div>
      <Button className="primary" onClick={saveData}>
        {loading ? (
          <CircularProgress
            style={{ height: "3rem", width: "3rem", color: "white" }}
          />
        ) : (
          <>Submit</>
        )}
      </Button>
    </div>
  );
}

export default EditDesc;
