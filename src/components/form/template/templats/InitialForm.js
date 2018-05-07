import React, { Component } from "react";
import axios from "axios";

export default class uploadMyFile extends Component {


  handleUploadFile = event => {
    const data = new FormData();
    data.append("file", event.target.files[0]);
    data.append("name", "file name");
    data.append("description", "about file");

    axios
      .post("http://localhost:8080/files", data)
      .then(response => {
        console.log(response);
      })
      .catch(error => {
        console.log(error);
      });
  };
  render() {
    return (
      <div>
        <input type="file" onChange={this.handleUploadFile} />
      </div>
    );
  }
}

// import React from "react";
// import Input from "../../../input";
// import Label from "../../../label";
// import ImageUploader from "../../../imageUploader";

// export default class FirstForm extends React.Component {
//   render() {
//     return (
//       <div>
//         <form>
//           <div className="form-group">
//             <Label value="Title" />
//             <div className="row">
//               <Input
//                 className="form-control"
//                 type="text"
//                 onChange={this.onChange}
//                 placeholder="Insert title"
//                 name="title"
//               />
//               &nbsp;
//               <ImageUploader />
//             </div>
//           </div>
//           <div className="form-group">
//             <Label value="Time to perpare" />
//             <div className="row">
//               <Input
//                 className="form-control"
//                 type="text"
//                 name="duration"
//                 onChange={this.onChange}
//                 placeholder="How much time does it require?"
//                 value={this.props.duration}
//               />
//               &nbsp;
//               <ImageUploader />
//             </div>
//           </div>

//           <div className="form-group">
//             <Label value="N. People" />
//             <div className="row">
//               <Input
//                 className="form-control"
//                 type="text"
//                 name="numberOfPeople"
//                 onChange={this.onChange}
//                 placeholder="How many people is it for?"
//                 value={this.props.numberOfPeople}
//               />
//               &nbsp;
//               <ImageUploader />
//             </div>
//           </div>
//         </form>
//       </div>
//     );
//   }
// }
