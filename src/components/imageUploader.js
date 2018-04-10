import React, { Component } from "react";

import DropzoneS3Uploader from 'react-dropzone-s3-uploader'
 
export default class S3Uploader extends Component {
 
 
  render() {
    const uploadOptions = {
      server: 'http://localhost:3000',
      signingUrlQueryParams: {uploadType: 'jpg'},
    }
    const s3Url = 'https://wolfjawan2.s3.amazonaws.com'  
    console.log(s3Url)
 
    return (
      <DropzoneS3Uploader
        s3Url={s3Url}
        maxSize={540 * 540 * 10}
        upload={uploadOptions}
      />
    )
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
//           {/* <button
//           className="btn btn-info"
//           onClick={() => this.fileInput.click()}
//         >
//           Chose File
//         </button> */}
//           <img
//             className="templetsItemImg"
//             src={this.state.selectedFile}
//             alt="img"
//           />
//         </div>
//       )
//   }
// }
