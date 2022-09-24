import React from "react";
import "./ImgInput.scss";
import uploadImg from "../../img/upload-img.svg";

const ImgInput = (props) => {
  return (
    <div className="input-wrapper">
      <input
        className="input-field"
        id={"actual-btn-" + props.index.toString()}
        type="file"
        onChange={props.handler}
        style={{ display: "none" }}
      />
      {/* <input type="file" onChange={props.onc} /> */}
      {/* <button onClick={props.onc}>Click</button> */}
      <label
        className={`${props.isUploaded ? "uploaded" : ""}`}
        htmlFor={"actual-btn-" + props.index.toString()}
        id={"label-for-" + props.index.toString()}
      >
        <img src={uploadImg} alt="Choose File" />
      </label>
      <span className={"input-file-name-" + props.index.toString()} id={"input-file-name" + props.index.toString()}>{props.fileName ? props.fileName : props.defaultName}</span>
    </div>
  );
};
export default ImgInput;
