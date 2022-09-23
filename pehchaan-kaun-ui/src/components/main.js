import React from 'react';
import Card from './card';
import Stateex from './stateex';
import './mainstyle.css';
import Child from './Child';

class Main extends React.Component {
  constructor() {
    super();
    this.state = {
      firstState: 'name',
      itemlist: [],
      buttonColor: '',
    };
  }
  componentDidUpdate = () => {
    console.log('State-> ', this.state.firstState);
  };
  // changeState = () => {
  //   if (this.state.firstState === "name") {
  //     this.setState({ firstState: "hello" });
  //   } else if (this.state.firstState === "hello") {
  //     this.setState({ firstState: "name" });
  //   }
  // };
  addItem = () =>
    this.setState({ itemlist: [...this.state.itemlist, 'Hello'] });

  callbackFunc = (col) => {
    console.log('This is the color Sent from child: ', col);
    this.setState({ buttonColor: col });
  };

  render() {
    const items = () => {
      return <Card st1={this.state.itemlist} />;
    };
    return (
      <div className="mydiv">
        {/* {items()}
        <button onClick={this.addItem}>click</button>
        <div>
          <h1>{this.state.firstState}</h1>
        </div>
        <Child callbackFunc={this.callbackFunc} />
        <button style={{ background: this.state.buttonColor }}>
          COLOR CHANGE BUTTON
        </button> */}
        <Stateex title="TITLE AS PROP" />
      </div>
    );
  }
}
export default Main;
