import React, { Component } from "react";
import "./style.css";

export default class ImageUploader extends Component {
  constructor(props) {
    super(props);
    this.state = {
      img: ""
    };
  }

  loadFile = event => {
    var reader = new FileReader();
    reader.onload = () => {
      this.setState({
        img: reader.result
      });
    };
    reader.readAsDataURL(event.target.files[0]);
  };

  render() {
    return (
      <div>
        <label className="btn btn-outline-dark">
          {this.state.img === "" ? (
            "chose a file"
          ) : (
            <img width="60px" src={this.state.img} alt="sssss" />
          )}
          <input
            style={{ display: "none" }}
            type="file"
            onChange={this.loadFile}
            accept="image/*"
          />
        </label>
      </div>
    );
  }
}
