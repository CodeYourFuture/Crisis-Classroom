import React from "react";
import Input from "../../../input";
import Label from "../../../label";
import Button from "../../../button";
import ImageUploader from "../../../imageUploader";

export default class Form3 extends React.Component {
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
        <h2>Add Steps required</h2>
        <div>
          {this.state.fields &&
            this.state.fields.map(fields => {
              return (
                <div className="form-group">
                  <Label value="Steps Name" />
                  <div className="row">
                    <Input
                      className="form-control"
                      type="text"
                      name="StepsName"
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
