import React from "react";
import Input from "../../input";
import Label from "../../label";
import Button from "../../button";
import "./style.css";

export default class ToolsForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      tools: [{ id: 1, name: "", image: null }],
      img: null
    };
  }

  onChangehandler = (e, index) => {
    const tool = this.state.tools[index];
    const newToolName = { ...tool, [e.target.name]: e.target.value };
    this.setState({
      tools: this.state.tools.map(
        (tool, i) => (i === index ? newToolName : tool)
      )
    });
  };

  onChangeImagehandler = (e, index) => {
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
    console.log("handler");
    this.setState({
      tools: [
        ...this.state.tools,
        { id: this.state.tools.length + 1, name: "", image: "" }
      ]
    });
  };

  removeToolsHandler = id => {
    console.log("ciao");
    const { tools } = this.state;
    tools.forEach(tool => {
      if (tool.id === id) {
        tool.image = null;
      }
    });
    console.log(tools);
    this.setState({
      tools
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
                        onChange={e => this.onChangehandler(e, i)}
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
                              onChange={e => this.onChangeImagehandler(e, i)}
                              accept="image/*"
                            />
                          </label>
                        </div>
                      ) : (
                        <div className="image-container" onClick={() => this.removeToolsHandler(id)}>
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
