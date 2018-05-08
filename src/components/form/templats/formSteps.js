import React from "react";
import LessonTitle from "./lessonTitle";
import ToolsForm from "./ToolsForm";
import Ingredients from "./Ingredients";
import Instructions from "./Instructions";
import Button from "../../button";

import "./style.css";
export default class FormSteps extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      activeForm: 0
    };
  }

  nextFormHandler = event => {
    event.preventDefault();
    this.setState(prevState => {
      return {
        activeForm: prevState.activeForm + 1
      };
    });
  };

  previouseHandler = event => {
    event.preventDefault();
    this.setState(prevState => {
      return {
        activeForm: prevState.activeForm - 1
      };
    });
  };

  render() {
    var forms = [
      <LessonTitle
        onChangehandler={this.props.onChangehandler}
        handleUploadFile={this.props.handleUploadFile}
        userData={this.props.userData}
      />,
      <ToolsForm
        onChangehandler={this.props.onChangehandler}
        handleUploadFile={this.props.handleUploadFile}
        userData={this.props.userData}
        addToolsHandler={this.props.addToolsHandler}
      />,
      <Ingredients
        onChangehandler={this.props.onChangehandler}
        handleUploadFile={this.props.handleUploadFile}
        addIngredientsHandler={this.props.addIngredientsHandler}        
        userData={this.props.userData}
      />,
      <Instructions
        onChangehandler={this.props.onChangehandler}
        handleUploadFile={this.props.handleUploadFile}
        addInstructionsHandler={this.props.addInstructionsHandler}        
        userData={this.props.userData}
      />
    ];
    return (
      <div>
        <h2 className="text-center">Creat New Templete</h2>
        <div className="lesson-form">
          {forms[this.state.activeForm]}
          <div className="row">
            {this.state.activeForm > 0 && (
              <Button
                className="btn btn-outline-dark"
                value="previouse"
                onClick={this.previouseHandler}
              />
            )}
            &nbsp;
            {this.state.activeForm < forms.length - 1 && (
              <Button
                className="btn btn-outline-dark"
                value="Next"
                onClick={this.nextFormHandler}
              />
            )}
          </div>
        </div>
      </div>
    );
  }
}
