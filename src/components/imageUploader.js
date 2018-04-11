import React, { Component } from "react";
import ReactS3 from "react-s3";
import "./style.css";

const config = {
  bucketName: "wolfjawan",
  albumName: "photos",
  region: "eu-west-2",
  accessKeyId: "AKIAIOKWZTBO7CVFPNGQ",
  secretAccessKey: "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"
};

export default class ImageUploader extends Component {
  constructor(props) {
    super(props);
    this.state = {
      file: null
    };
  }
  fileSelectedHandler = event => {
    console.log(event.target.files[0]);
    this.setState({
      file: event.target.files[0]
    });
  };

  upload = () => {
    const file = this.state.file;
    ReactS3.upload(file, config)
      .then(data => {})
      .catch(err => {
        alert(err);
        console.log(err);
      });
  };

  render() {
    return (
      <div>
        <label className="btn btn-primary btn-file">
        Choose a file
          <input
            style={{ display: "none" }}
            type="file"
            onChange={this.fileSelectedHandler}
          />
        </label>
        <button onClick={this.upload}>Upload</button>
      </div>
    );
  }
}

// import React, { Component } from "react";

// export default class ImageUploader extends Component {
//   state = {
//     selectedFile: null
//   };

//   fileSelectedHandler = event => {
//     console.log(event.target.files[0])
//     this.setState({
//       selectedFile: event.target.files[0]
//     });
//   };

//   render() {
//     return (
//         <div>
//           <input
//             type="file"
//             onChange={this.fileSelectedHandler}
//             ref={fileInput => (this.fileInput = fileInput)}
//           />
//            <button
//           className="btn btn-info"
//           onClick={() => this.fileInput.click()}
//         >
//           Chose File
//         </button>
//           <img
//             className="templetsItemImg"
//             src={this.state.selectedFile}
//             alt="img"
//           />
//         </div>
//       )
//   }
// }
