import React from "react";
import Context from "./context";
import Lesson from "./lesson";
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
      lessonTitle: "",
      lessonTitleImage: "",
      timeToPrepare: "",
      timeToPrepareImage: "",
      numberOfPeople: "",
      numberOfPeopleImage: "",
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

  onAddLesson = lesson => {
    const {
      lessonTitle,
      lessonTitleImage,
      timeToPrepare,
      timeToPrepareImage,
      numberOfPeople,
      numberOfPeopleImage
    } = lesson;

    this.setState({
      lessonTitle,
      lessonTitleImage,
      timeToPrepare,
      timeToPrepareImage,
      numberOfPeople,
      numberOfPeopleImage
    });
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
    const {
      lessonTitle,
      lessonTitleImage,
      timeToPrepare,
      timeToPrepareImage,
      numberOfPeople,
      numberOfPeopleImage,
      tools,
      ingredients,
      instructions
    } = this.state;
    var forms = [
      <Lesson />,
      <ToolsForm />,
      <Ingredients />,
      <Instructions />,
      <Purview history={this.props.history} />
    ];
    const context = {
      lessonTitle,
      lessonTitleImage,
      timeToPrepare,
      timeToPrepareImage,
      numberOfPeople,
      numberOfPeopleImage,
      onAddLesson: this.onAddLesson,
      tools,
      onAddTools: this.onAddTools,
      ingredients,
      onAddIngredients: this.onAddIngredients,
      instructions,
      onAddInstructions: this.onAddInstructions,
      previousFormHandler: this.previousFormHandler
    };
    return (
      <div>
        <Context.Provider value={context}>
          <h2 className="text-center">Create A New Template</h2>
          <div className="lesson-form">{forms[this.state.activeForm]}</div>
        </Context.Provider>
      </div>
    );
  }
}
