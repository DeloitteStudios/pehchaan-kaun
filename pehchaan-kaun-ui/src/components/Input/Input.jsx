import React from "react";
import "./Input.scss";
import searchIcon from "../../img/search-icon.svg";

const Input = (props) => {
  return (
    <div className="input-wrapper">
      {props.searchBtn && (
        <button onClick={props.onSearchClick}>
          <img src={searchIcon} alt="search" />
        </button>
      )}
      <input
        type="text"
        className="input-field"
        placeholder={props.placeholder}
        onChange={props.onChange}
      />
    </div>
  );
};
export default Input;
