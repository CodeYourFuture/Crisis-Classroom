import React from "react";
import Context from "./context";
import Lesson from "./lesson";
import ToolsForm from "./ToolsForm";
import Ingredients from "./Ingredients";
import Instructions from "./Instructions";
import Purview from "./purview";
// import Button from "../../button";
// import {Link} from "react-router-dom";


export default class LessonForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      activeForm: 0,
      id: "",
      lesson_title: "",
      lesson_title_image: "",
      time_to_prepare: "",
      time_to_prepare_image: "",
      number_of_people: "",
      number_of_people_image: "",
      ingredients: [],
      instructions: [],
      tools: []
    };
  }
  componentDidMount() {
    if (this.props.location.state) {
      const {
        id,
        lesson_title,
        lesson_title_image,
        time_to_prepare,
        time_to_prepare_image,
        number_of_people,
        number_of_people_image,
        tools,
        ingredients,
        instructions
      } = this.props.location.state.lesson;
      this.setState({
        id,
        lesson_title,
        lesson_title_image,
        time_to_prepare,
        time_to_prepare_image,
        number_of_people,
        number_of_people_image,
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
      lesson_title,
      lesson_title_image,
      time_to_prepare,
      time_to_prepare_image,
      number_of_people,
      number_of_people_image
    } = lesson;

    this.setState({
      lesson_title,
      lesson_title_image,
      time_to_prepare,
      time_to_prepare_image,
      number_of_people,
      number_of_people_image
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
      lesson_title,
      lesson_title_image,
      time_to_prepare,
      time_to_prepare_image,
      number_of_people,
      number_of_people_image,
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
      lesson_title,
      lesson_title_image,
      time_to_prepare,
      time_to_prepare_image,
      number_of_people,
      number_of_people_image,
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
          <div>{forms[this.state.activeForm]}</div>
        </Context.Provider>
      </div>
    );
  }
}
