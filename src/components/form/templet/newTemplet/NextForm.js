import React from "react";
// import { Link } from "react-router-dom";
// import Input from "../../../input";
// import Button from "../../../button";
// import Label from "../../../label";
// import S3Uploader from "../../../imageUploader";
// import ReactS3 from "react-s3";
export default class NexForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      fields: []
    };
  }
  add = name => {
    this.setState({
      fields: [...this.state.fields, name]
    });
  };
  render() {
    console.log(this.state.fields);
    return (
      <div>
        {this.state.fields &&
          this.state.fields.map(fields => {
            return (
              <div>
                <input type="text" />
                <input type="file" />
              </div>
            );
          })}
        <button onClick={this.add}> add</button>
      </div>
    );
  }
}
