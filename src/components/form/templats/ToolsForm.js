import React from "react";
import Input from "../../input";
import Label from "../../label";
import Button from "../../button";

export default class ToolsForm extends React.Component {


  render() {
    console.log("2");
    return (
      <div>
        <h2> Add Tools </h2>
        <div>
          {this.props.userData.toolsFields &&
            this.props.userData.toolsFields.map((fields, key) => {
              return (
                <div className="form-group" key={key}>
                  <Label value="Tool Name" />
                  <div className="row">
                    <Input
                      className="form-control"
                      type="text"
                      name="ToolName"
                      onChange={this.props.onChangehandler}
                      placeholder="Tool"
                      value={this.props.userData.ToolName}
                    />
                    <div>
                      <label className="btn btn-outline-dark">
                        Chose a file
                        <input
                          style={{ display: "none" }}
                          type="file"
                          onChange={this.props.handleUploadFile}
                          accept="image/*"
                        />
                      </label>
                    </div>
                  </div>
                </div>
              );
            })}
        </div>
        &nbsp;
        <Button
          className="btn btn-outline-dark"
          value="Add"
          onClick={this.props.addToolsHandler}
        />
        &nbsp;
      </div>
    );
  }
}
