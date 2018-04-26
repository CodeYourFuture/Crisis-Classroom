import React, { Component } from "react";

// import "../../App.css";

export default class Button extends Component {
  render() {
    return (
      <div>
        <button className={this.props.className} onClick={this.props.onClick}>
          {this.props.value}
        </button>
      </div>
    );
  }
}
