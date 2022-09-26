import React from "react";
import "./mainstyle.css";

class Card extends React.Component {
  constructor() {
    super();
  }
  render() {
    const ren = () =>
      this.props.st1.map((x, index) => (
        <h1>
          {x}
          {index}
        </h1>
      ));
    return (
      <div>
        {ren()}
        {console.log("props", this.props.st1)}Hello
      </div>
    );
  }
}
export default Card;
