import React from "react";
import InitialForm from "./InitialForm";
import ToolsForm from "./ToolsForm";
import StepsForm from "./StepsForm";
import Button from "../../../button";

import "./style.css";
export default class LessonForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      title: "",
      duration: "",
      numberOfPeople: "",

      form2: { fields: [] },
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

  onChangehandler = (e, name) => {
    this.setState({
      [name]: e.target.value
    });
    console.log(this.state);
  };

  FormTwoHandler = e => {
    this.setState({
      form2: e.target.value
    });
  };

  render() {
    // const { title, numberOfPeople, duration } = this.state;
    //  console.log(this.title)
    var forms = [
      <InitialForm onChange={this.onChangehandler} />,
      <ToolsForm {...this.state} />,

      <StepsForm />
    ];
    return (
      <div className="lesson-form">
        {forms[this.state.activeForm]}
        {this.state.activeForm < forms.length - 1 && (
          <Button
            className="btn  btn-primary"
            value="Next"
            onClick={this.nextFormHandler}
          />
        )}
        {this.state.activeForm > 0 && (
          <Button
            className="btn  btn-primary "
            value="previouse"
            onClick={this.previouseHandler}
          />
        )}
      </div>
    );
  }
}
