import React from "react";
import Input from "../../input";
import Label from "../../label";
import Button from "../../button";
import Context from "./context";
import "./style.css";

class Form extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      lessonTitles: props.lessonTitles,
      lessonValue: [
        "Lesson Title",
        "Time to perpar",
        "Number of people",
        "Somethinge else"
      ]
    };
  }

  onChangeLessonTitleshandler = (e, index) => {
    const lessonTitle = this.state.lessonTitles[index];
    const newLessonTitleName = {
      ...lessonTitle,
      [e.target.name]: e.target.value
    };
    this.setState({
      lessonTitles: this.state.lessonTitles.map(
        (lessonTitle, i) => (i === index ? newLessonTitleName : lessonTitle)
      )
    });
  };

  onChangeImageLessonTitleshandler = async (e, index) => {
    const lessonTitle = this.state.lessonTitles[index];
    // var reader = new FileReader();
    // reader.readAsDataURL(e.target.files[0]);
    // reader.onload = () => {
    const filePath = await fetch("https://localhost/uploadImage", file).then();

    const newLessonTitleImage = { ...lessonTitle, lessonTitleImage: e.target.files[0] };
    this.setState({
      lessonTitles: this.state.lessonTitles.map(
        (lessonTitle, i) => (i === index ? newLessonTitleImage : lessonTitle)
      )
    });
    // };
  };

  addLessonTitlesHandler = e => {
    this.setState({
      lessonTitles: [
        ...this.state.lessonTitles,
        { lessonTitleId: this.state.lessonTitles.length + 1, lessonTitleName: "", lessonTitleImage: "" }
      ]
    });
  };

  removeLessonTitlesHandler = lessonTitleId => {
    const { lessonTitles } = this.state;
    lessonTitles.forEach(lessonTitle => {
      if (lessonTitle.lessonTitleId === lessonTitleId) {
        lessonTitle.lessonTitleImage = null;
      }
    });
    this.setState({
      lessonTitles
    });
  };

  render() {
    return (
      <div>
        <div>
          <h2>Lesson Title </h2>
          {this.state.lessonTitles &&
            this.state.lessonTitles.map(({ lessonTitleName, lessonTitleImage, lessonTitleId }, i) => {
              return (
                <div className="lessonForm" key={lessonTitleId}>
                  <div className="form-group">
                    <Label
                      value={this.state.lessonValue.map(
                        (vall, i) => (lessonTitleId === i + 1 ? vall : "")
                      )}
                    />
                    <div className="lessonInput">
                      <Input
                        className="form-control"
                        type="text"
                        name="lessonTitleName"
                        onChange={e => this.onChangeLessonTitleshandler(e, i)}
                        placeholder={this.state.lessonValue.map(
                          (vall, i) => (lessonTitleId === i + 1 ? vall : "")
                        )}
                        value={lessonTitleName}
                      />
                      {!lessonTitleImage ? (
                        <div>
                          <label className="btn btn-outline-dark">
                            Upload an image
                            <input
                              style={{ display: "none" }}
                              type="file"
                              name="lessonTitleImage"
                              onChange={e =>
                                this.onChangeImageLessonTitleshandler(e, i)
                              }
                              accept="image/*"
                            />
                          </label>
                        </div>
                      ) : (
                        <div
                          className="image-container"
                          onClick={() => this.removeLessonTitlesHandler(lessonTitleId)}
                        >
                          <img
                            className="image"
                            width="100px"
                            src={lessonTitleImage}
                            alt="image"
                          />
                          <div className="middle">
                            <div className="text">Remove</div>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
        </div>
        <Button
          className="btn btn-outline-dark lessonBtn"
          value="Add"
          onClick={this.addLessonTitlesHandler}
        />
        &nbsp;
        <Button
          className="btn btn-outline-dark lessonBtn"
          value="Next"
          onClick={() => this.props.onAddLessonTitles(this.state.lessonTitles)}
        />
      </div>
    );
  }
}

export default class LessonTitlesFormWrapper extends React.Component {
  render() {
    return (
      <Context.Consumer>
        {({ onAddLessonTitles, lessonTitles }) => (
          <Form
            lessonTitles={lessonTitles}
            onAddLessonTitles={onAddLessonTitles}
          />
        )}
      </Context.Consumer>
    );
  }
}
