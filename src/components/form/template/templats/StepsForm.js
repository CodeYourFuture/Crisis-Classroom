import React from "react";
// import { Link } from "react-router-dom";
import ImageUploader from "../../../imageUploader";
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
                      className="form-control"
                      type="text"
                      name="ToolName"
                      onChange={this.onChange}
                      placeholder="step name"
                      value={this.props.ToolName}
                    />
                    &nbsp;
                    <ImageUploader />
                  </div>
                </div>
              );
            })}
          &nbsp;
          <Button
            className="btn btn-outline-dark"
            value="Add"
            onClick={this.add}
          />
          &nbsp;
        </div>
      </div>
    );
  }
}
