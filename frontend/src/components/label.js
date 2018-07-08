import React, { Component } from "react";

export default class Label extends Component {
  render() {
    return <label className={this.props.className}>{this.props.value}</label>;
  }
}
