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
      id: "",
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
  componentDidMount() {
    if (this.props.location.state) {
      const {
        id,
        lessonTitle,
        lessonTitleImage,
        timeToPrepare,
        timeToPrepareImage,
        numberOfPeople,
        numberOfPeopleImage,
        tools,
        ingredients,
        instructions
      } = this.props.location.state.lesson;
      console.log(id)
      this.setState({
        id,
        lessonTitle,
        lessonTitleImage,
        timeToPrepare,
        timeToPrepareImage,
        numberOfPeople,
        numberOfPeopleImage,
        tools,
        ingredients,
        instructions
      });
      this.nextFormHandler();
    }
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
      <Lesson {...this.props} />,
      <ToolsForm {...this.props} id={this.state.id}/>,
      <Ingredients {...this.props} id={this.state.id}/>,
      <Instructions {...this.props} id={this.state.id}/>,
      <Purview history={this.props.history} id={this.state.id}/>
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
          {this.props.location.state ? (
            <h2 className="text-center">Edit Template</h2>
          ) : (
            <h2 className="text-center">Create A New Template</h2>
          )}
          <div className="lesson-form">{forms[this.state.activeForm]}</div>
        </Context.Provider>
      </div>
    );
  }
}
