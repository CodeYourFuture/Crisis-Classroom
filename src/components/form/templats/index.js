import React from "react";
import axios from "axios";

import FormSteps from "./formSteps";

import "./style.css";
export default class LessonForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      title: "",
      duration: "",
      numberOfPeople: "",
      toolsFields: [],
      ingredientsFields: [],
      instructionsFields:[],
      ToolName: [],
      ingredient: [],
      StepsName: []
    };
  }
  onChangehandler = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };
  addToolsHandler = e => {
    this.setState({
      toolsFields: [...this.state.toolsFields, e]
    });
  };
  addIngredientsHandler = e => {
    this.setState({
      ingredientsFields: [...this.state.ingredientsFields, e]
    });
  };
  addInstructionsHandler = e => {
    this.setState({
      instructionsFields: [...this.state.instructionsFields, e]
    });
  };

  handleUploadFile = event => {
    const data = new FormData();
    data.append("file", event.target.files[0]);
    data.append("name", "file name");
    data.append("description", "about file");

    axios
      .post("http://localhost:8080/files", data)
      .then(response => {
        console.log(response);
      })
      .catch(error => {
        console.log(error);
      });
  };

  render() {
    console.log(this.state);
    return (
      <div>
        <FormSteps
          onChangehandler={this.onChangehandler}
          handleUploadFile={this.handleUploadFile}
          addToolsHandler={this.addToolsHandler}
          addIngredientsHandler={this.addIngredientsHandler}
          addInstructionsHandler={this.addInstructionsHandler}
          userData={this.state}
        />
      </div>
    );
  }
}
