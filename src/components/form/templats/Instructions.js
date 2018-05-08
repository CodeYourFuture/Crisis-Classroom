import React from "react";
import Input from "../../input";
import Label from "../../label";
import Button from "../../button";

export default class Instructions extends React.Component {
  render() {
    console.log("4");
    return (
      <div>
        <h2>Instructions</h2>
        <div>
          {this.props.userData.instructionsFields &&
            this.props.userData.instructionsFields.map((fields, key) => {
              return (
                <div className="form-group" key={key}>
                  <Label value="Steps Name" />
                  <div className="row">
                    <Input
                      className="form-control"
                      type="text"
                      name="StepsName"
                      onChange={this.props.onChangehandler}
                      placeholder="Steps"
                      value={this.props.userData.StepsName}
                    />
                    &nbsp;
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
          &nbsp;
          <Button
            className="btn btn-outline-dark"
            value="Add"
            onClick={this.props.addInstructionsHandler}
          />
          &nbsp;
        </div>
      </div>
    );
  }
}
