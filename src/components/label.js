import React, { Component } from "react";

export default class Label extends Component {
  render() {
    return <label className="label-form">{this.props.value}</label>;
  }
}
