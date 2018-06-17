import React, {Component} from 'react';
import './style.css';
import axios from 'axios';

export default class Survey extends Component {
  constructor (props) {
    super (props);
    this.state = {
      studentName: '',
      answer1: '',
      answer2: '',
      answer3: '',
      isSubmitted: false,
    };
  }

  nameSubmit = event => {
    var studentName = this.refs.name.value;
    this.setState ({
      studentName: studentName,
    });
  };

  answerSelected = event => {
    this.setState ({
      [event.target.name]: event.target.value,
    });
  };

  questionSubmit = () => {
    const {studentName, answer1, answer2, answer3} = this.state;
    axios
      .post ('http://localhost:8080/survey', {
        studentName,
        answer1,
        answer2,
        answer3,
      })
      .then (result => {
        console.log (result);
      })
      .catch (error => {
        console.log (error);
      });

    console.log (this.state);
    this.setState ({isSubmitted: true});
  };

  render () {
    var studentName;
    var questions;
    if (this.state.studentName === '' && this.state.isSubmitted === false) {
      studentName = (
        <div className="text-center n-survey head-survey">
          <h1>Hey , please type your name !</h1>
          <div className="input-s">
            <form onSubmit={this.nameSubmit}>
              <input
                className="namy"
                type="text"
                placeholder="Enter your name"
                ref="name"
              />
            </form>
          </div>
        </div>
      );
      questions = '';
    } else if (
      this.state.studentName !== '' &&
      this.state.isSubmitted === false
    ) {
      studentName = (
        <h1 className="text-center n-survey head">
          {' '}Welcome to survey, {this.state.studentName}
        </h1>
      );
      questions = (
        <div className="text-center n-survey">
          <h2>Here are some questions:</h2>
          <form onSubmit={this.questionSubmit}>
            <div className="card">
              <label>What kind of Templates do you like the most:</label>
              <div>
                <input
                  className="my"
                  type="radio"
                  name="answer1"
                  value="making"
                  onChange={this.answerSelected}
                />
                {' '}
                Making
                <input
                  className="my"
                  type="radio"
                  name="answer1"
                  value="Cooking"
                  onChange={this.answerSelected}
                />
                {' '}
                Cooking
                <input
                  className="my"
                  type="radio"
                  name="answer1"
                  value="Playing"
                  onChange={this.answerSelected}
                />
                {' '}
                Playing
              </div>
            </div>

            <div className="card">
              <label>You are a :</label>
              <div>
                <input
                  className="my"
                  type="radio"
                  name="answer2"
                  value="Student"
                  onChange={this.answerSelected}
                />
                {' '}
                Student
                <input
                  className="my"
                  type="radio"
                  name="answer2"
                  value="Teacher"
                  onChange={this.answerSelected}
                />
                {' '}
                Teacher
                <input
                  className="my"
                  type="radio"
                  name="answer2"
                  value="Visitor"
                  onChange={this.answerSelected}
                />
                {' '}
                Visitor
              </div>
            </div>

            <div className="card">
              <label>Is online learning helpful:</label>
              <div>
                <input
                  className="my"
                  type="radio"
                  name="answer3"
                  value="Yes"
                  onChange={this.answerSelected}
                />
                {' '}
                Yes
                <input
                  className="my"
                  type="radio"
                  name="answer3"
                  value="No"
                  onChange={this.answerSelected}
                />
                {' '}
                No
                <input
                  className="my"
                  type="radio"
                  name="answer3"
                  value="Maybe"
                  onChange={this.answerSelected}
                />
                {' '}
                Maybe
              </div>
            </div>
            <input className="btn btn-primary" type="submit" value="submit" />
          </form>

        </div>
      );
    } else if (this.state.isSubmitted === true) {
      studentName = (
        <h1 className="text-center n-survey head-survey">
          Thanks, {this.state.studentName} !
        </h1>
      );
    }
    return (
      <div>
        {studentName}
        {questions}
      </div>
    );
  }
}
