import React from "react";
import Input from "../../input";
import Label from "../../label";
import Button from "../../button";

export default class ToolsForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      tools: [{ id: 1, name: "", image: "" }],
      img: null
    };
  }

  onChangehandler = index => e => {
    const tool = this.state.tools[index];
    const newToolName = { ...tool, [e.target.name]: e.target.value };
    this.setState({
      tools: this.state.tools.map(
        (tool, i) => (i === index ? newToolName : tool)
      )
    });
  };

  onChangeImagehandler = index => e => {
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

  render() {
    console.log(this.state);
    return (
      <div>
        <h2> Add Tools </h2>
        <div>
          {this.state.tools &&
            this.state.tools.map(({ name, image, id }, i) => {
              return (
                <div className="row" key={id}>
                  <div className="form-group">
                    <Label value="Tool Name" />
                    <div className="row">
                      <Input
                        className="form-control"
                        type="text"
                        name="name"
                        onChange={this.onChangehandler(i)}
                        placeholder="Tool"
                        value={name}
                      />
                      <div>
                        <label className="btn btn-outline-dark">
                          Chose a file
                          <input
                            style={{ display: "none" }}
                            type="file"
                            name="image"
                            onChange={this.onChangeImagehandler(i)}
                            accept="image/*"
                          />
                        </label>
                      </div>
                    </div>
                  </div>
                  <div>
                    {this.state.tools.map(
                      (tool, i) =>
                        id === i + 1 ? (
                          <img
                            width="100px"
                            src={tool.image}
                            alt="foo"
                            key={i}
                          />
                        ) : (
                          ""
                        )
                    )}
                  </div>
                </div>
              );
            })}
        </div>
        &nbsp;
        <Button
          className="btn btn-outline-dark"
          value="Add"
          onClick={this.addToolsHandler}
        />
        &nbsp;
      </div>
    );
  }
}
