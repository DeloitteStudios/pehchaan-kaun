import React from "react";
import "./Card.scss";
const Card = (props) => {
  const { img, name, designation, empId, viewDetailsClick } = props.profileData;
  return (
    <div className="card-wrapper">
      <img className="profile-img" src={img} alt="pic" />
      <div className="profile-details">
        <span className="name">{name}</span>
        <span className="designation">{designation}</span>
        <span className="emp-id">{empId}</span>
      </div>
      <button
        value="View Details"
        className="view-details-btn"
        onClick={() => viewDetailsClick(empId)}
      >
        View Details
      </button>
    </div>
  );
};

export default Card;
