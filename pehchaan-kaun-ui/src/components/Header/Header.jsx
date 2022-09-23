import React from "react";
import "./Header.scss";
import Dlogo from "../../img/dlogo.svg";

const Header = () => {
  return (
    <div className="header">
      <img src={Dlogo} alt="Deloitte" />
    </div>
  );
};
export default Header;
