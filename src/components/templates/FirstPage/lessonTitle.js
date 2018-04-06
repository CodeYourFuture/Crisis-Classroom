import React from "react";
import "./style.css";

export default class LessonTitle extends React.Component {
  render() {
    return (
      <div>
        <h1>{this.props.lessonTitle}</h1>
        <img
          className="lessonImg"
          src={require(`../../../image/archive/${this.props.lessonImg}`)}
          alt={this.props.lessonTitle}
        />
      </div>
    );
  }
}
