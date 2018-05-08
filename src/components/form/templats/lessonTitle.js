import React, { Component } from "react";
import Input from "../../input";
import Label from "../../label";

export default class lessonTitle extends Component {
  render() {
    return (
      <div>
        <form>
          <div className="form-group">
            <Label value="Title" />
            <div className="row">
              <Input
                className="form-control"
                type="text"
                name="title"
                onChange={this.props.onChangehandler}
                placeholder="Insert title"
                value={this.props.userData.title}
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
          <div className="form-group">
            <Label value="Time to perpare" />
            <div className="row">
              <Input
                className="form-control"
                type="text"
                name="duration"
                onChange={this.props.onChangehandler}
                placeholder="How much time does it require?"
                value={this.props.userData.duration}
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
          <div className="form-group">
            <Label value="N. People" />
            <div className="row">
              <Input
                className="form-control"
                type="text"
                name="numberOfPeople"
                onChange={this.props.onChangehandler}
                placeholder="How many people is it for?"
                value={this.props.userData.numberOfPeople}
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
        </form>
      </div>
    );
  }
}
