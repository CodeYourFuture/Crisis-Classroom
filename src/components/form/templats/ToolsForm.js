import React from "react";
import Input from "../../input";
import Label from "../../label";
import Button from "../../button";
import Context from "./context";
import "./style.css";

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
    var reader = new FileReader();
    reader.readAsDataURL(e.target.files[0]);
    reader.onload = () => {
      const newToolImage = { ...tool, image: reader.result };
      this.setState({
        tools: this.state.tools.map(
          (tool, i) => (i === index ? newToolImage : tool)
        )
      });
    };
  };

  addToolsHandler = e => {
    this.setState({
      tools: [
        ...this.state.tools,
        { id: this.state.tools.length + 1, name: "", image: "" }
      ]
    });
  };

  removeToolsHandler = id => {
    const { tools } = this.state;
    tools.forEach(tool => {
      if (tool.id === id) {
        tool.image = null;
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
            this.state.tools.map(({ name, image, id }, i) => {
              return (
                <div className="lessonForm" key={id}>
                  <div className="form-group">
                    <Label value="Tool Name" />
                    <div className="lessonInput">
                      <Input
                        className="form-control"
                        type="text"
                        name="name"
                        onChange={e => this.onChangeToolshandler(e, i)}
                        placeholder="Tool"
                        value={name}
                      />
                      {!image ? (
                        <div>
                          <label className="btn btn-outline-dark">
                            Chose a file
                            <input
                              style={{ display: "none" }}
                              type="file"
                              name="image"
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
                          onClick={() => this.removeToolsHandler(id)}
                        >
                          <img
                            className="image"
                            width="100px"
                            src={image}
                            alt="foo"
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
            value="previouse"
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
