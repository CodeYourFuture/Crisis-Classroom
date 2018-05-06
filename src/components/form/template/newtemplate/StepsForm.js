import React from "react";
// import { Link } from "react-router-dom";
import S3Uploader from "../../../imageUploader";
// import ReactS3 from "react-s3";

import Input from "../../../input";
import Button from "../../../button";

export default class StepsForm extends React.Component {
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
        <h2> Steps required</h2>
        <div>
          {this.state.fields &&
            this.state.fields.map(fields => {
              return (
                <div className="form-group">
                  {/* <Label value="Step Name" /> */}
                  <div className="row">
                    <Input
                      type="text"
                      name="ToolName"
                      onChange={this.onChange}
                      placeholder="step name"
                      value={this.props.ToolName}
                    />
                    &nbsp;
                    <S3Uploader />
                  </div>
                </div>
              );
            })}

          <Button
            className="w3-button w3-xlarge w3-circle w3-teal"
            value="+"
            onClick={this.add}
          />
        </div>
      </div>
    );
  }
}
