import React from "react";
import axios from "axios";
import Context from "./context";
import ToolsForm from "./ToolsForm";
// import Ingredients from "./Ingredients";
import InstructionsFormWrapper from "./Instructions";
import Button from "../../button";

import "./style.css";
export default class LessonForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      activeForm: 0,
      title: "",
      duration: "",
      numberOfPeople: "",
      ingredients: [],
      instructions: [],
      tools: []
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

  onAddTools = tools => {
    this.setState({ tools });
    this.nextFormHandler();
  };
  onAddInstruction = instructions => {
    this.setState({ instructions });
    this.previousFormHandler();
  };

  nextFormHandler = () => {
    this.setState(prevState => {
      return {
        activeForm: prevState.activeForm + 1
      };
    });
  };

  previousFormHandler = () => {
    this.setState(prevState => {
      return {
        activeForm: prevState.activeForm - 1
      };
    });
  };

  render() {
    // console.log(this.state.instructions)
    const { tools, activeForm, instructions } = this.state;
    var forms = [
      // <LessonTitle />,
      <ToolsForm />,
      // <Ingredients />,
      <InstructionsFormWrapper />
    ];
    const context = {
      tools,
      onAddTools: this.onAddTools,
      instructions,
      onAddInstruction: this.onAddInstruction
    };
    console.log(instructions, activeForm);
    return (
      <div>
        <Context.Provider value={context}>
          <h2 className="text-center">Creat New Templete</h2>
          <div className="lesson-form">
            {forms[this.state.activeForm]}
            {this.state.activeForm > 0 && (
              <Button
                className="btn btn-outline-dark"
                value="previouse"
                onClick={this.previousFormHandler}
              />
            )}
          </div>
        </Context.Provider>
      </div>
    );
  }
}
