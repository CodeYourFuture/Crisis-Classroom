import React from "react";
// import Input from "../../input";
// import Label from "../../label";
// import Button from "../../button";
import Context from "./context";

export default class Purview extends React.Component {
  render() {
    return (
      <div>
        <Context.Consumer>
      {({ lessonTitles }) => (
        lessonTitles.map(lessonTitle =>(
          <img
          className="image"
          width="50px"
          src={lessonTitle.image}
          alt="foo"
        />
        ))
      )}
        </Context.Consumer>
      </div>
    );
  }
}
