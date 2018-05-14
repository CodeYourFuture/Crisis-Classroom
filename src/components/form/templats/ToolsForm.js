import React from "react";
import Input from "../../input";
import Label from "../../label";
import Button from "../../button";
import Context from "./context";
import ReactS3 from "react-s3";
import "./style.css";

const config = {
  bucketName: "crisis-class-room",
  region: "eu-west-2",
  accessKeyId: process.env.REACT_APP_S3_ACCESS_KEY_ID,
  secretAccessKey: process.env.REACT_APP_S3_SECRET_ACCESS_KEY
};

class Form extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      tools: props.tools
    };
  }

  onChangeToolshandler = (e, index) => {
    const tool = this.state.tools[index];
    const newToolName = { ...tool, [e.target.name]: e.target.value };
    this.setState({
      tools: this.state.tools.map(
        (tool, i) => (i === index ? newToolName : tool)
      )
    });
  };

  onChangeImageToolshandler = (e, index) => {
    const tool = this.state.tools[index];
    const file = e.target.files[0];
    ReactS3.upload(file, config).then(result => {
      const newToolImage = { ...tool, toolImage: result.location};
      this.setState({
        tools: this.state.tools.map(
          (tool, i) => (i === index ? newToolImage : tool)
        )
      });
    });
  };

  addToolsHandler = e => {
    this.setState({
      tools: [
        ...this.state.tools,
        { toolId: this.state.tools.length + 1, toolName: "", toolImage: "" }
      ]
    });
  };

  removeToolsHandler = toolId => {
    const { tools } = this.state;
    tools.forEach(tool => {
      if (tool.toolId === toolId) {
        tool.toolImage = null;
      }
    });
    this.setState({
      tools
    });
  };

  render() {
    return (
      <div>
        <div>
          <h2> Add Tools </h2>
          {this.state.tools &&
            this.state.tools.map(({ toolName, toolImage, toolId }, i) => {
              return (
                <div className="lessonForm" key={toolId}>
                  <div className="form-group">
                    <Label value="Tool Name" />
                    <div className="lessonInput">
                      <Input
                        className="form-control"
                        type="text"
                        name="toolName"
                        onChange={e => this.onChangeToolshandler(e, i)}
                        placeholder="Tool"
                        value={toolName}
                      />
                      {!toolImage ? (
                        <div>
                          <label className="btn btn-outline-dark">
                            Upload an image
                            <input
                              style={{ display: "none" }}
                              type="file"
                              name="toolImage"
                              onChange={e =>
                                this.onChangeImageToolshandler(e, i)
                              }
                              accept="image/*"
                            />
                          </label>
                        </div>
                      ) : (
                        <div
                          className="image-container"
                          onClick={() => this.removeToolsHandler(toolId)}
                        >
                          <img
                            className="image"
                            width="100px"
                            src={toolImage}
                            alt="tool"
                          />
                          <div className="middle">
                            <div className="text">Remove</div>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
        </div>
        <Button
          className="btn btn-outline-dark"
          value="Add"
          onClick={this.addToolsHandler}
        />
        &nbsp;
        <div style={{display:"flex"}}>
          <Button
            className="btn btn-outline-dark"
            value="previous"
            onClick={this.props.previousFormHandler}
          />
          &nbsp;
          <Button
            className="btn btn-outline-dark"
            value="Next"
            onClick={() => this.props.onAddTools(this.state.tools)}
          />
        </div>
      </div>
    );
  }
}

export default class ToolsFormWrapper extends React.Component {
  render() {
    return (
      <Context.Consumer>
        {({ onAddTools, tools, previousFormHandler }) => (
          <Form
            tools={tools}
            onAddTools={onAddTools}
            previousFormHandler={previousFormHandler}
          />
        )}
      </Context.Consumer>
    );
  }
}
