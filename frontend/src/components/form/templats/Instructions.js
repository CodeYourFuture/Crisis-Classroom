import React from "react";
import Input from "../../input";
import Label from "../../label";
import Button from "../../button";
import Context from "./context";
import axios from "axios";

class Form extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      instructions: props.instructions
    };
  }

  onChangeInstructionshandler = (e, index) => {
    const instruction = this.state.instructions[index];
    const newinstruction_name = {
      ...instruction,
      [e.target.name]: e.target.value
    };
    this.setState({
      instructions: this.state.instructions.map(
        (instruction, i) => (i === index ? newinstruction_name : instruction)
      )
    });
  };

  onChangeImageInstructionshandler = (e, index) => {
    const instruction = this.state.instructions[index];
    const data = new FormData();
    data.append("image", e.target.files[0]);
    axios.post(`${process.env.REACT_APP_DOMAIN}/files`, data).then(result => {
      const newinstruction_image = {
        ...instruction,
        instruction_image: result.data.image
      };
      this.setState({
        instructions: this.state.instructions.map(
          (instruction, i) => (i === index ? newinstruction_image : instruction)
        )
      });
    });
  };

  addInstructionsHandler = e => {
    this.setState({
      instructions: [
        ...this.state.instructions,
        {
          instruction_id: this.state.instructions.length + 1,
          instruction_name: "",
          instruction_image: ""
        }
      ]
    });
  };

  removeInstructionsImgHandler = instruction_id => {
    const { instructions } = this.state;
    instructions.forEach(instruction => {
      if (instruction.instruction_id === instruction_id) {
        instruction.instruction_image = null;
      }
    });
    this.setState({
      instructions
    });
  };

  removeInstructionsHandler = i => {
    const { instructions } = this.state;
    let removeResult = instructions.filter(
      instruction => instruction.instruction_id !== i
    );

    this.setState({
      instructions: removeResult
    });
  };

  render() {
    return (
      <div className="template-form">
        <div>
          {this.props.id ? (
            <h2> Edit, Remove or add instructions </h2>
          ) : (
            <h2> Add instructions </h2>
          )}
          <div>
            {this.state.instructions &&
              this.state.instructions.map(
                (
                  { instruction_name, instruction_image, instruction_id },
                  i
                ) => {
                  return (
                    <div key={i}>
                      <div className="form-group">
                        <Label value="instruction Name" />
                        <div className="lessonInput">
                          <Input
                            className="form-control"
                            type="text"
                            name="instruction_name"
                            onChange={e =>
                              this.onChangeInstructionshandler(e, i)
                            }
                            placeholder="instruction"
                            value={instruction_name}
                          />
                          {!instruction_image ? (
                            <div>
                              <label className="btn btn-outline-dark">
                                Upload an image
                                <input
                                  style={{ display: "none" }}
                                  type="file"
                                  name="instruction_image"
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
                              onClick={() =>
                                this.removeInstructionsImgHandler(
                                  instruction_id
                                )
                              }
                            >
                              <img
                                className="image"
                                width="100px"
                                src={instruction_image}
                                alt="instruction"
                              />
                              <div className="middle">
                                <div className="text">Remove</div>
                              </div>
                            </div>
                          )}
                          &nbsp;
                          <Button
                            className="btn btn-outline-danger lessonBtn"
                            value="Remove"
                            onClick={() =>
                              this.removeInstructionsHandler(instruction_id)
                            }
                          />
                        </div>
                      </div>
                    </div>
                  );
                }
              )}
          </div>
          <Button
            className="btn btn-outline-dark "
            value="Add"
            onClick={this.addInstructionsHandler}
          />
          <hr/>
          <div className="template-form-btn">
            <div>
              <Button
                className="btn btn-outline-dark "
                value="previous"
                onClick={this.props.previousFormHandler}
              />
            </div>
            <div className="btn-right">
              <Button
                className="btn btn-outline-dark "
                value="Next"
                onClick={() =>
                  this.props.onAddInstructions(this.state.instructions)
                }
              />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default class instructionsFormWrapper extends React.Component {
  render() {
    return (
      <Context.Consumer>
        {({ onAddInstructions, instructions, previousFormHandler }) => (
          <Form
            instructions={instructions}
            onAddInstructions={onAddInstructions}
            previousFormHandler={previousFormHandler}
            {...this.props}
          />
        )}
      </Context.Consumer>
    );
  }
}
