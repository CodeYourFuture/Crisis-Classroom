import React from "react";
import ImageUploader from "../../../imageUploader";
import Input from "../../../input";
import Label from "../../../label";
import Button from "../../../button";

export default class FormTools extends React.Component {
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
    return (
      <div>
        <h2> Add Tools </h2>
        <div>
          {this.state.fields &&
            this.state.fields.map(fields => {
              return (
                <div className="form-group">
                  <Label value="Tool Name" />
                  <div className="row">
                    <Input
                      className="form-control"
                      type="text"
                      name="ToolName"
                      onChange={this.onChange}
                      placeholder="Tool"
                      value={this.props.ToolName}
                    />
                    &nbsp;
                    <ImageUploader />
                  </div>
                </div>
              );
            })}
        </div>
        &nbsp;
        <Button
          className="btn btn-outline-dark"
          value="Add"
          onClick={this.add}
        />
        &nbsp;
      </div>
    );
  }
}
