import React from "react";
import "./ImgInput.scss";
import uploadImg from "../../img/upload-img.svg";

const ImgInput = (props) => {
  return (
    <div className="input-wrapper">
      <input
        className="input-field"
        id="actual-btn"
        type="file"
        onChange={props.onChange}
        hidden
      />
      <label for="actual-btn">
        <img src={uploadImg} alt="Choose File" />
      </label>
    </div>
  );
};
export default ImgInput;
