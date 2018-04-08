import React from "react";

export default class SearchForInpud extends React.Component {

  render() {
    return (
      <div>
        <input
          className="form-control"
          type="text"
          placeholder="Search for templete"
          onChange={ this.props.searchHandler}
        />
      </div>
    );
  }
}
