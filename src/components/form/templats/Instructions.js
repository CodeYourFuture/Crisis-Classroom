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
      instructions: props.instructions
    };
  }

  onChangeInstructionshandler = (e, index) => {
    const instruction = this.state.instructions[index];
    const newinstructionName = {
      ...instruction,
      [e.target.name]: e.target.value
    };
    this.setState({
      instructions: this.state.instructions.map(
        (instruction, i) => (i === index ? newinstructionName : instruction)
      )
    });
  };

  onChangeImageInstructionshandler = (e, index) => {
    const instruction = this.state.instructions[index];
    var reader = new FileReader();
    reader.readAsDataURL(e.target.files[0]);
    reader.onload = () => {
      const newinstructionImage = { ...instruction, image: reader.result };
      this.setState({
        instructions: this.state.instructions.map(
          (instruction, i) => (i === index ? newinstructionImage : instruction)
        )
      });
    };
  };

  addInstructionsHandler = e => {
    this.setState({
      instructions: [
        ...this.state.instructions,
        { id: this.state.instructions.length + 1, name: "", image: "" }
      ]
    });
  };

  removeInstructionsHandler = id => {
    const { instructions } = this.state;
    instructions.forEach(instruction => {
      if (instruction.id === id) {
        instruction.image = null;
      }
    });
    this.setState({
      instructions
    });
  };

  render() {
    return (
      <div>
        <div>
          <h2> Add instructions </h2>
          <div>
            {this.state.instructions &&
              this.state.instructions.map(({ name, image, id }, i) => {
                return (
                  <div className="lessonForm" key={id}>
                    <div className="form-group">
                      <Label value="instruction Name" />
                      <div className="row">
                        <Input
                          className="form-control"
                          type="text"
                          name="name"
                          onChange={e => this.onChangeInstructionshandler(e, i)}
                          placeholder="instruction"
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
                                  this.onChangeImageInstructionshandler(e, i)
                                }
                                accept="image/*"
                              />
                            </label>
                          </div>
                        ) : (
                          <div
                            className="image-container"
                            onClick={() => this.removeInstructionsHandler(id)}
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
            className="btn btn-outline-dark lessonBtn"
            value="Add"
            onClick={this.addInstructionsHandler}
          />
          &nbsp;
          <Button
            className="btn btn-outline-dark lessonBtn"
            value="Next"
            onClick={() =>
              this.props.onAddInstructions(this.state.instructions)
            }
          />
        </div>
      </div>
    );
  }
}

export default class instructionsFormWrapper extends React.Component {
  render() {
    return (
      <Context.Consumer>
        {({ onAddInstructions, instructions }) => (
          <Form
            instructions={instructions}
            onAddInstructions={onAddInstructions}
          />
        )}
      </Context.Consumer>
    );
  }
}
