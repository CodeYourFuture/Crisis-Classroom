import React from "react";
import InitialForm from "./InitialForm";
import ToolsForm from "./ToolsForm";
import StepsForm from "./StepsForm";
import ThirdForm from "./ThirdForm";
import Button from "../../../button";

import "./style.css";
export default class LessonForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      title: "",
      duration: "",
      numberOfPeople: "",
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

  onChangehandler = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  // FormTwoHandler = e => {
  //   this.setState({
  //     form2: e.target.value
  //   });
  // };

  render() {
    var forms = [
      <InitialForm onChange={this.onChangehandler} />,
      <ToolsForm {...this.state} />,
      <StepsForm />,
      <ThirdForm />
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
