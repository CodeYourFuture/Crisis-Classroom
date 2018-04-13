import React from "react";
// import { Link } from "react-router-dom";
import Input from "../../../input";
import Button from "../../../button";
import Label from "../../../label";
// import S3Uploader from "../../../imageUploader";
import _ from  "lodash"
// import "./style.css";

export default class LessonTitle extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      info: {
        title: null, 
        numberOfPeople: null, 
        duration: null 
      },
      activeForm: 0,
      steps: [
        {
          name: "step1",
          imag: "file"
        },
        {
          name: "step2",
          imag: "file2"
        }
      ]
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
  onChange = (event)=>{
    const {info} = this.state
    _.set(info, event.target.name, event.target.value)
    
    this.setState({
      
      info: info
      

    })

  }
  hanldeSteps = () => {
  //   this.setState(prevState => {
  //   //   steps: prevState.steps.concat([{ name: "stpe4", imag: "stpe5" }]);
  //   // });
  };

  render() {
    var forms = [
      <form>
        <div className="form-group">
          <Label value="Title" />
          <div className="row">
            <Input
              type="text"
              onChange={ this.onChange}
              placeholder="Insert title"
              name="title"
              value={this.state.info.title}
            />
            &nbsp;
            {/* <S3Uploader /> */}
          </div>
        </div>
        <div className="form-group">
          <Label value="Time to perpare" />
          <div className="row">
            <Input
              type="text"
              name="duration"
              onChange={ this.onChange}
              placeholder="How much time does it require?"
              value={this.state.info.duration}
            />
            &nbsp;
            {/* <S3Uploader /> */}
          </div>
        </div>
        <div className="form-group">
          <Label value="N. People" />
          <div className="row">
            <Input
              type="text"
              name="numberOfPeople"
              onChange={ this.onChange}
              placeholder="How many people is it for?"
              value={this.state.info.numberOfPeople}
            />
            &nbsp;
            {/* <S3Uploader /> */}
          </div>
        </div>
      </form>,

      <form value="1">
        form 1
        <input type="text" />
      </form>,

      <form value="1">
        form 2
        <input type="text" />
      </form>
    ];

    return (
      <div className="lesson-form">
        <h2>Creat New Templete</h2>

        {forms[this.state.activeForm]}
        {this.state.activeForm < forms.length - 1 && (
          <Button value="Next" onClick={this.nextFormHandler} />
        )}
        {this.state.activeForm > 0 && (
          <Button value="previouse" onClick={this.previouseHandler} />
        )}
      </div>
    );
  }
}
