import { red } from "@material-ui/core/colors";
import React from "react";
import landingpagecss from "../CSS/landingpagecss.css";
import Theme from "./mytheme";
import Navbar from "./navbar";
import Paper from "./paper";
class Landing extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      paperOpen: false,
    };
  }
  changePaperOpen = (value) => {
    this.setState({ paperOpen: !this.state.paperOpen });
    console.log("VALLL->", value);
    this.handlePaperOpen();
  };
  handlePaperOpen = () => {
    var paper = document.querySelector(".paper-container");
    console.log("HELLO FROM HANDLER");
    if (this.state.paperOpen === true) {
      paper.style.display = "block";
    } else if (this.state.paperOpen === false) {
      paper.style.display = "none";
    }
  };
  render() {
    return (
      <section className="landing-page-section">
        <section className="navbar-section">
          {/* <Navbar /> */}
          <Theme />
          <Navbar paperOpen={(val) => this.changePaperOpen(val)} />
          <div class="paper-container">
            <Paper />
          </div>
        </section>
      </section>
    );
  }
}
export default Landing;
