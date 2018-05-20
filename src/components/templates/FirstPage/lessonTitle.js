import React from "react";
import "./style.css";

export default class LessonTitle extends React.Component {
  render() {
    return (
      <div>
        <h2>{this.props.lessonTitle}</h2>
        <img
          className="lessonImg"
          src={require(`../../../image/${this.props.lessonImg}`)}
          alt={this.props.lessonTitle}
        />
      </div>
    );
  }
}
