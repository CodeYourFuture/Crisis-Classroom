import React, { Component } from "react";
import ReactS3 from "react-s3";
import "./style.css";

const config = {
  bucketName: "wolfjawan",
  region: "eu-west-2",
  accessKeyId: process.env.REACT_APP_S3_ACCESS_KEY_ID,
  secretAccessKey: process.env.REACT_APP_S3_SECRET_ACCESS_KEY
};

export default class ImageUploader extends Component {
  constructor(props) {
    super(props);
    this.state = {
      file: null,
      img: ""
    };
  }
  // fileSelectedHandler = event => {
  //   console.log(event.target.files[0]);
  //   this.setState({
  //     file: event.target.files[0]
  //   });
  // };
  loadFile(event) {
    var reader = new FileReader();
    reader.onload = ()=> {
      this.setState({
        img: reader.result})
    };
    // this.setState({img: event.target.files[0]})
    reader.readAsDataURL(event.target.files[0]);
  }
  upload = event => {
    event.preventDefault();

    const { img } = this.state;
    // console.log(file)
    ReactS3.upload(img, config)
      .then(data => {
        console.log(data)
        // return data.url // find the right property
      })
      .catch(err => {
        alert(err);
        console.log(err);
      });
  };

  render() {
    return (
      <div>
        <label className="btn btn-primary btn-file">
          {this.state.img === "" ? (
            "chose a file"
          ) : (
            <img width="50px" src={this.state.img}
            alt="foot"
            />
          )}
          <input
            style={{ display: "none" }}
            type="file"
            onChange={event => this.loadFile(event)}
            accept="image/*"
          />
        </label>

        {/* <button onClick={this.upload}>Upload</button> */}
        <button onClick={this.upload}>Upload</button>
      </div>
    );
  }
}
