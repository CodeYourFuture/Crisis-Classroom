import React from "react";
// import { Link } from "react-router-dom";
import S3Uploader from "../../../imageUploader";
// import ReactS3 from "react-s3";
export default class SecondForm extends React.Component {
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
        <h2> add Step, Tools required</h2>
      <div>
        {this.state.fields &&
          this.state.fields.map(fields => {
            return (
              <div>
              <label>
                step name
                <input type="text" />
                </label>
                &nbsp;
                <S3Uploader />

              </div>
            );
          })}
        <button onClick={this.add}> add</button>
      </div>
      </div>

    );
  }
}
