import React from "react";
import Input from "../../input";
import Label from "../../label";
import Button from "../../button";
import Context from "./context";
import ReactS3 from "react-s3";
import "./style.css";

const config = {
  bucketName: "crisis-class-room",
  region: "eu-west-2",
  accessKeyId: process.env.REACT_APP_S3_ACCESS_KEY_ID,
  secretAccessKey: process.env.REACT_APP_S3_SECRET_ACCESS_KEY
};
class Form extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      lessonTitles: props.lessonTitles,
      lessonValue: [
        "Lesson Title",
        "Time to prepare",
        "Number of people",
        "Something else"
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

  onChangeImageLessonTitleshandler = (e, index) => {
    const lessonTitle = this.state.lessonTitles[index];
    const file = e.target.files[0];
    ReactS3.upload(file, config).then(result => {
      const newLessonTitleName = {
        ...lessonTitle,
        lessonTitleImage: result.location
      };
      this.setState({
        lessonTitles: this.state.lessonTitles.map(
          (lessonTitle, i) => (i === index ? newLessonTitleName : lessonTitle)
        )
      });
    });
  };

  addLessonTitlesHandler = e => {
    this.setState({
      lessonTitles: [
        ...this.state.lessonTitles,
        {
          lessonTitleId: this.state.lessonTitles.length + 1,
          lessonTitleName: "",
          lessonTitleImage: ""
        }
      ]
    });
  };

  removeLessonTitlesImageHandler = lessonTitleId => {
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


  //ameer pleaze make it work
  removeLessonTitlesHandler = i => {
    const { lessonTitles } = this.state;
    this.setState({
      lessonTitles: lessonTitles.splice(-i, 1)
    });
  };

  render() {
    return (
      <div>
        <div>
          <h2>Lesson Title </h2>
          {this.state.lessonTitles &&
            this.state.lessonTitles.map(
              ({ lessonTitleName, lessonTitleImage, lessonTitleId }, i) => {
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
                            onClick={() =>
                              this.removeLessonTitlesImageHandler(lessonTitleId)
                            }
                          >
                            <img
                              className="image"
                              width="100px"
                              src={lessonTitleImage}
                              alt="lesson Title "
                            />
                            <div className="middle">
                              <div className="text">Remove</div>
                            </div>
                          </div>
                        )}
                        &nbsp;
                        <Button
                          className="btn btn-outline-danger lessonBtn"
                          value="Remove"
                          onClick={() => this.removeLessonTitlesHandler(i)}
                        />
                      </div>
                    </div>
                  </div>
                );
              }
            )}
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
