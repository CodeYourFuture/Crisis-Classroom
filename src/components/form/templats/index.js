import React from "react";
import Context from "./context";
import LessonTitle from "./lessonTitle";
import ToolsForm from "./ToolsForm";
import Ingredients from "./Ingredients";
import Instructions from "./Instructions";
import Purview from "./purview";
// import Button from "../../button";
// import {Link} from "react-router-dom";

import "./style.css";
export default class LessonForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      activeForm: 0,
      lessonTitles: [],
      ingredients: [],
      instructions: [],
      tools: []
    };
  }

  onAddTools = tools => {
    this.setState({ tools });
    this.nextFormHandler();
  };

  onAddIngredients = ingredients => {
    this.setState({ ingredients });
    this.nextFormHandler();
  };

  onAddLessonTitles = lessonTitles => {
    this.setState({ lessonTitles });
    this.nextFormHandler();
  };

  onAddInstructions = instructions => {
    this.setState({ instructions });
    this.nextFormHandler();
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
    const { tools, ingredients, lessonTitles, instructions } = this.state;
    var forms = [
      <LessonTitle />,
      <ToolsForm />,
      <Ingredients />,
      <Instructions />,
      <Purview history={this.props.history}/>
    ];
    const context = {
      tools,
      onAddTools: this.onAddTools,
      ingredients,
      onAddIngredients: this.onAddIngredients,
      lessonTitles,
      onAddLessonTitles: this.onAddLessonTitles,
      instructions,
      onAddInstructions: this.onAddInstructions,
      previousFormHandler:this.previousFormHandler
    };
    return (
      <div>
        <Context.Provider value={context}>
          <h2 className="text-center">Create A New Template</h2>
          <div className="lesson-form">
            {forms[this.state.activeForm]}
          </div>
        </Context.Provider>
      </div>
    );
  }
}
