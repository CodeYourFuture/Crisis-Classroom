import React, { Component } from "react";
import ReactS3 from "react-s3";
import "./style.css";

const config = {
  bucketName: "wolfjawan",
  albumName: "photos",
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
  fileSelectedHandler = event => {
    console.log(event.target.files[0]);
    this.setState({
      file: event.target.files[0]
    });
  };
  loadFile(event) {
    var reader = new FileReader();
    reader.onload = ()=> {
      this.setState({img: reader.result})
    };
    reader.readAsDataURL(event.target.files[0]);
  }
  upload = (event) => {
    event.preventDefault();
    console.log(file)
    const file = this.state.file;

    ReactS3.upload(this.files, config)
      .then(data => {
        // console.log(data)
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
            
          {this.state.img === '' ? "chose a file" : <img width="50px" src={this.state.img}/> }          
          <input
            style={{ display: "none" }}
            type="file"
            onChange={event=>this.loadFile(event)}
              accept="image/*"
            
          /> 
          
        </label>
        
        {/* <button onClick={this.upload}>Upload</button> */}
      </div>
    );
  }
}