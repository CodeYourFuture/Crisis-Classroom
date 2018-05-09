import React from "react";
// import { Link } from "react-router-dom";
import Button from "../../../button";
import FirstForm from "./firstForm";
import SecondForm from "./SecondForm";
import ThirdForm from "./ThirdForm"; 
import './style.css';


import _ from "lodash";
// const config = {
//   bucketName: "wolfjawan",
//   region: "eu-west-2",
//   accessKeyId: process.env.REACT_APP_S3_ACCESS_KEY_ID,
//   secretAccessKey: process.env.REACT_APP_S3_SECRET_ACCESS_KEY
// };

export default class LessonTitle extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      info: {
        title: null,
        numberOfPeople: null,
        duration: null
      },
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
  onChange = event => {
    const { info } = this.state;
    _.set(info, event.target.name, event.target.value);

    this.setState({
      info
    });
  };
  onChangeImage = event => {
    // @TODO
    // Get the image from the vent, then use an helper ot upload it to S3,
    // Once you got the url, display it somewhere
  };
  hanldeSteps = () => {
    //   this.setState(prevState => {
    //   //   steps: prevState.steps.concat([{ name: "stpe4", imag: "stpe5" }]);
    //   // });
  };

  render() {
    var forms = [<FirstForm/>,
    <SecondForm/>,
    <ThirdForm />];

    return (
      <div className="lesson-form">

        {forms[this.state.activeForm]}<div className="colum next">
        {this.state.activeForm < forms.length - 1 && (
          <Button
            className="btn  btn-primary mt-2"
            value="Next"
            onClick={this.nextFormHandler}
          />
        )}
        {this.state.activeForm > 0 && (
          
          <Button
            className="btn  btn-primary mt-2"
            value="previouse"
            onClick={this.previouseHandler}
          />
        )}</div>
      </div>
    );
  }
}
