import React, { Component } from "react";

// import "../../App.css";

export default class Input extends Component {
  render() {
    return (
      <input
        className="form-control"
        type={this.props.type}
        name={this.props.name}
        value={this.props.value}
        placeholder={this.props.placeholder}
        onChange={this.props.onChange}
      />
    );
  }
}
