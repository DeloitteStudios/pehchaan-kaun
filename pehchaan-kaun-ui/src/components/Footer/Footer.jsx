import React from "react";
import "./Footer.scss";

const Footer = () => {
  return (
    <div className="footer-wrapper">
      <div className="team-members">
        <span>Abhishek Kumar</span>
        <span>Mohd. Haris</span>
        <span>Snigdha Sachar</span>
        <span>Tanvi Kapur</span>
        <span>Vibhor Khanna</span>
      </div>
      <div className="team-name">Code Diggers</div>
      <div className="hackathon">Made for JumpStart 2022</div>
    </div>
  );
};
export default Footer;
