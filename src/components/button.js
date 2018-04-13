import React, { Component } from "react";

// import "../../App.css";

export default class Button extends Component {
  render() {
    return (
      <div>
        <button style={{margin: "10px"}} className="btn btn-primary " onClick={this.props.onClick}>
          {this.props.value}
        </button>
      </div>
    );
  }
}
