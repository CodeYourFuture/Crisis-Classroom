import React from "react";
import ImageUploade from "react-image-uploader";

export default class FirstForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = { pictures: [] };
  }

  onDrop = picture => {
    console.log(this.state.pictures)
    this.setState({
      pictures: this.state.pictures.concat(picture)
    });
    
  };

  render() {
    return (
      <ImageUploade
        // withIcon={true}
        // buttonText="Choose images"
        // onChange={this.onDrop}
        // imgExtension={[".jpg", ".gif", ".png", ".gif"]}
        // maxFileSize={5242880}
      />
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
