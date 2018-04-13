import React from "react";

export default class SearchForInput extends React.Component {
  render() {
    return (
      <input
        className="form-control"
        type="text"
        placeholder="Search for templete"
        onChange={this.props.searchHandler}
      />
    );
  }
}
