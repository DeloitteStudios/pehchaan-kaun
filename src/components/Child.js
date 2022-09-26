import { red } from "@material-ui/core/colors";
import { Call, CommentSharp } from "@material-ui/icons";
import React, { Component } from "react";
class Child extends Component {
  constructor(props) {
    super(props);
    this.state = {
      color: "red",
    };
  }
  caller = (color) => {
    console.log("CHILD CLICKED");
    this.setState({ color: color });
    console.log("THIS STATE COLOR", this.state.color);
    this.props.callbackFunc(color);
  };
  render() {
    return (
      <>
        <h1>This is the child component</h1>
        <button
          onClick={
            this.state.color === "red"
              ? () => this.caller("blue")
              : () => this.caller("red")
          }
        >
          Click to call callback
        </button>
      </>
    );
  }
}
export default Child;
