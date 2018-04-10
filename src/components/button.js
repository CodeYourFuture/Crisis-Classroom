import React, { Component } from "react";

// import "../../App.css";

export default class Button extends Component {
  render() {
    return (
      <div>
        <button className="btn btn-primary " onClick={this.props.onClick}>
          {this.props.value}
        </button>
      </div>
    );
  }
}
