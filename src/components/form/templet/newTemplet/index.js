import React from "react";
import LessonTitle from "./title";
import "./style.css";
export default class LessonForm extends React.Component {
  render() {
    return (
      <div className="lessons-form">
        <LessonTitle />
      </div>
    );
  }
}
