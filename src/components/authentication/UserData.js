import "./form.scss";
import {
  Button,
  IconButton,
  TextareaAutosize,
  Avatar,
  CircularProgress,
} from "@material-ui/core";
import { useState } from "react";
import Compressor from "compressorjs";
import PhotoIcon from "@material-ui/icons/Photo";
import ClearRoundedIcon from "@material-ui/icons/ClearRounded";
import axiosInstance from "../../utils/axiosInstance";

function UserData({ auth, userId }) {
  const [disc, setdisc] = useState("");
  const [imgDisp, setImgDisp] = useState();
  const [loading, setLoading] = useState(false);

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
    imageFormObj.append("userId", userId);
    imageFormObj.append("discription", disc);
    await axiosInstance
      .post("/data/userdata", imageFormObj)
      .then((res) => {
        setLoading(false);
        auth("Login");
      })
      .then((err) => {
        setLoading(false);
        console.log(err);
      });
  };

  return (
    <>
      <Avatar
        src={imgDisp}
        style={{ width: "10rem", height: "10rem", marginBottom: "1rem" }}
      />
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
      <Button className="secondary" onClick={() => auth("Login")}>
        Skip
      </Button>
    </>
  );
}

export default UserData;
