import React from "react";
import Input from "../../input";
import Label from "../../label";
import Button from "../../button";
import Context from "./context";
import axios from "axios";

class Form extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      lesson_title: props.lesson_title,
      lesson_title_image: props.lesson_title_image,
      time_to_prepare: props.time_to_prepare,
      time_to_prepare_image: props.time_to_prepare_image,
      number_of_people: props.number_of_people,
      number_of_people_image: props.number_of_people_image
    };
  }

  onChange = e => {
    const { name, value } = e.target;
    this.setState({
      [name]: value
    });
  };

  onChangeImageLessonhandler = event => {
    const data = new FormData();
    data.append("image", event.target.files[0]);
    const { name } = event.target;
    axios
      .post(`${process.env.REACT_APP_DOMAIN}/files`, data)
      .then(result => {
        if (result) {
          const image = result.data.image;
          this.setState({
            ...this.state,
            [name]: image
          });
        }
      })
      .catch(error => {
        this.setState({ error });
      });
  };
  // onChangeImageLessonhandler = e => {
  //   const file = e.target.files[0];
  //   const { name } = e.target;
  //   ReactS3.upload(file, config).then(result => {
  //     const image = result.location;
  //     this.setState({
  //       ...this.state,
  //       [name]: image
  //     });
  //   });
  // };

  removeImageHandler = e => {
    const file = e.target.name;
    if ("lesson_title_image" === file) {
      this.setState({ lesson_title_image: null });
    }
    if ("time_to_prepare_image" === file) {
      this.setState({ time_to_prepare_image: null });
    }
    if ("number_of_people_image" === file) {
      this.setState({ number_of_people_image: null });
    }
  };

  render() {
    const {
      lesson_title,
      lesson_title_image,
      time_to_prepare,
      time_to_prepare_image,
      number_of_people,
      number_of_people_image
    } = this.state;
    return (
      <div className="template-form">
        <div>
          <div>
            <div>
              <div>
                <Label value="Lesson Title" />
                <div className="lessonInput">
                  <Input
                    className=" form-control "
                    type="text"
                    name="lesson_title"
                    onChange={this.onChange}
                    placeholder="Lesson Title"
                    value={lesson_title}
                  />
                  &nbsp;
                  {!lesson_title_image ? (
                    <div>
                      <label className="btn btn-outline-dark">
                        Upload an image
                        <input
                          style={{ display: "none" }}
                          type="file"
                          name="lesson_title_image"
                          onChange={this.onChangeImageLessonhandler}
                          accept="image/*"
                        />
                      </label>
                    </div>
                  ) : (
                    <div className="image-container">
                      <img
                        className="image"
                        width="100px"
                        src={lesson_title_image}
                        alt="lesson Title "
                      />
                      <div className="middle">
                        <button
                          className="text"
                          name="lesson_title_image"
                          onClick={this.removeImageHandler}
                        >
                          Remove
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
          <div>
            <hr />
            <div>
              <Label value="Time To Prepare" />
              <div className="lessonInput">
                <Input
                  className=" form-control "
                  type="text"
                  name="time_to_prepare"
                  onChange={this.onChange}
                  placeholder="Time To Prepare"
                  value={time_to_prepare}
                />
                &nbsp;
                {!time_to_prepare_image ? (
                  <div>
                    <label className="btn btn-outline-dark">
                      Upload an image
                      <input
                        style={{ display: "none" }}
                        type="file"
                        name="time_to_prepare_image"
                        onChange={this.onChangeImageLessonhandler}
                        accept="image/*"
                      />
                    </label>
                  </div>
                ) : (
                  <div className="image-container">
                    <img
                      className="image"
                      width="100px"
                      src={time_to_prepare_image}
                      alt="lesson Title "
                    />
                    <div className="middle">
                      <button
                        className="text"
                        name="time_to_prepare_image"
                        onClick={this.removeImageHandler}
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
          <div>
            <hr />
            <div>
              <Label value="Number Of People" />
              <div className="lessonInput">
                <Input
                  className="form-control"
                  type="text"
                  name="number_of_people"
                  onChange={this.onChange}
                  placeholder="Number Of People"
                  value={number_of_people}
                />
                &nbsp;
                {!number_of_people_image ? (
                  <div>
                    <label className="btn btn-outline-dark">
                      Upload an image
                      <input
                        style={{ display: "none" }}
                        type="file"
                        name="number_of_people_image"
                        onChange={this.onChangeImageLessonhandler}
                        accept="image/*"
                      />
                    </label>
                  </div>
                ) : (
                  <div className="image-container">
                    <img
                      className="image"
                      width="100px"
                      src={number_of_people_image}
                      alt="number Of People"
                    />
                    <div className="middle">
                      <button
                        className="text"
                        name="number_of_people_image"
                        onClick={this.removeImageHandler}
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
        <hr />
        <hr />
        <div className="template-form-btn">
          <div className="btn-right">
            <Button
              className="btn btn-outline-dark"
              value="Next"
              onClick={() => this.props.onAddLesson(this.state)}
            />
          </div>
        </div>
      </div>
    );
  }
}

export default class Lesson extends React.Component {
  render() {
    return (
      <Context.Consumer>
        {({
          onAddLesson,
          lesson_title,
          lesson_title_image,
          time_to_prepare,
          time_to_prepare_image,
          number_of_people,
          number_of_people_image
        }) => (
          <Form
            lesson_title={lesson_title}
            lesson_title_image={lesson_title_image}
            time_to_prepare={time_to_prepare}
            time_to_prepare_image={time_to_prepare_image}
            number_of_people={number_of_people}
            number_of_people_image={number_of_people_image}
            onAddLesson={onAddLesson}
            {...this.props}
          />
        )}
      </Context.Consumer>
    );
  }
}
