import React from "react";
import "./Header.scss";
import Dlogo from "../../img/dlogo.svg";
import chaupLogo from "../../img/ChaupaalLogo.png";
const Header = () => {
  return (
    <div className="header">
      <img className="dlogo" src={Dlogo} alt="Deloitte" />
      <span>? Pehchaan Kaun ¿</span>
      <img className="clogo" src={chaupLogo} alt="Chaupaal" />
    </div>
  );
};
export default Header;
