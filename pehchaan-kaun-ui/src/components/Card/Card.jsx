import React from "react";
import "./Card.scss";
const Card = (props) => {
  const { img, name, designation, empId } = props.profileData;
  return (
    <div className="card-wrapper" id={"card-wrapper-" + props.id}>
      <img className="profile-img" src={img} alt="pic" />
      <div className="profile-details">
        <span className="name">{name}</span>
        <span className="designation">{designation}</span>
        <span className="emp-id">{empId}</span>
      </div>
      <button
        value="View Details"
        className="view-details-btn"
        id={"view-details-btn-" + props.id}
        onClick={() => props.viewDetailsClick(props)}
      >
        View Details
      </button>
    </div>
  );
};

export default Card;
