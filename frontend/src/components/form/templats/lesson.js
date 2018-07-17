import React from 'react';
import Input from '../../input';
import Label from '../../label';
import Button from '../../button';
import Context from './context';
import axios from 'axios';
import './style.css';

class Form extends React.Component {
  constructor (props) {
    super (props);
    this.state = {
      lessonTitle: props.lessonTitle,
      lessonTitleImage: props.lessonTitleImage,
      timeToPrepare: props.timeToPrepare,
      timeToPrepareImage: props.timeToPrepareImage,
      numberOfPeople: props.numberOfPeople,
      numberOfPeopleImage: props.numberOfPeopleImage,
    };
  }

  onChange = e => {
    const {name, value} = e.target;
    this.setState ({
      [name]: value,
    });
  };

  onChangeImageLessonhandler = event => {
    const data = new FormData ();
    data.append ('image', event.target.files[0]);
    const {name} = event.target;
    axios
      .post (`${process.env.REACT_APP_DOMAIN}/files`, data)
      .then (result => {
        if (result) {
          const image = result.data.image;
          this.setState ({
            ...this.state,
            [name]: image,
          });
        }
      })
      .catch (error => {
        console.log (error);
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
    if ('lessonTitleImage' === file) {
      this.setState ({lessonTitleImage: null});
    }
    if ('timeToPrepareImage' === file) {
      this.setState ({timeToPrepareImage: null});
    }
    if ('numberOfPeopleImage' === file) {
      this.setState ({numberOfPeopleImage: null});
    }
  };

  render () {
    const {
      lessonTitle,
      lessonTitleImage,
      timeToPrepare,
      timeToPrepareImage,
      numberOfPeople,
      numberOfPeopleImage,
    } = this.state;
    return (
      <div>
        <div>
          <div className="lessonForm">
            <div className="form-group">
              <Label value="Lesson Title" />
              <div className="lessonInput">
                <Input
                  className="form-control"
                  type="text"
                  name="lessonTitle"
                  onChange={this.onChange}
                  placeholder="Lesson Title"
                  value={lessonTitle}
                />
                {!lessonTitleImage
                  ? <div>
                      <label className="btn btn-outline-dark">
                        Upload an image
                        <input
                          style={{display: 'none'}}
                          type="file"
                          name="lessonTitleImage"
                          onChange={this.onChangeImageLessonhandler}
                          accept="image/*"
                        />
                      </label>
                    </div>
                  : <div className="image-container">
                      <img
                        className="image"
                        width="100px"
                        src={lessonTitleImage}
                        alt="lesson Title "
                      />
                      <div className="middle">
                        <button
                          className="text"
                          name="lessonTitleImage"
                          onClick={this.removeImageHandler}
                        >
                          Remove
                        </button>
                      </div>
                    </div>}
              </div>
            </div>
          </div>
        </div>
        <div className="lessonForm">
          <div className="form-group">
            <Label value="Time To Prepare" />
            <div className="lessonInput">
              <Input
                className="form-control"
                type="text"
                name="timeToPrepare"
                onChange={this.onChange}
                placeholder="Time To Prepare"
                value={timeToPrepare}
              />
              {!timeToPrepareImage
                ? <div>
                    <label className="btn btn-outline-dark">
                      Upload an image
                      <input
                        style={{display: 'none'}}
                        type="file"
                        name="timeToPrepareImage"
                        onChange={this.onChangeImageLessonhandler}
                        accept="image/*"
                      />
                    </label>
                  </div>
                : <div className="image-container">
                    <img
                      className="image"
                      width="100px"
                      src={timeToPrepareImage}
                      alt="lesson Title "
                    />
                    <div className="middle">
                      <button
                        className="text"
                        name="timeToPrepareImage"
                        onClick={this.removeImageHandler}
                      >
                        Remove
                      </button>
                    </div>
                  </div>}
            </div>
          </div>
        </div>
        <div className="lessonForm">
          <div className="form-group">
            <Label value="Number Of People" />
            <div className="lessonInput">
              <Input
                className="form-control"
                type="text"
                name="numberOfPeople"
                onChange={this.onChange}
                placeholder="Number Of People"
                value={numberOfPeople}
              />
              {!numberOfPeopleImage
                ? <div>
                    <label className="btn btn-outline-dark">
                      Upload an image
                      <input
                        style={{display: 'none'}}
                        type="file"
                        name="numberOfPeopleImage"
                        onChange={this.onChangeImageLessonhandler}
                        accept="image/*"
                      />
                    </label>
                  </div>
                : <div className="image-container">
                    <img
                      className="image"
                      width="100px"
                      src={numberOfPeopleImage}
                      alt="number Of People"
                    />
                    <div className="middle">
                      <button
                        className="text"
                        name="numberOfPeopleImage"
                        onClick={this.removeImageHandler}
                      >
                        Remove
                      </button>
                    </div>
                  </div>}
            </div>
          </div>
        </div>
        &nbsp;
        <Button
          className="btn btn-outline-dark lessonBtn"
          value="Next"
          onClick={() => this.props.onAddLesson (this.state)}
        />
      </div>
    );
  }
}

export default class Lesson extends React.Component {
  render () {
    return (
      <Context.Consumer>
        {({
          onAddLesson,
          lessonTitle,
          lessonTitleImage,
          timeToPrepare,
          timeToPrepareImage,
          numberOfPeople,
          numberOfPeopleImage,
        }) => (
          <Form
            lessonTitle={lessonTitle}
            lessonTitleImage={lessonTitleImage}
            timeToPrepare={timeToPrepare}
            timeToPrepareImage={timeToPrepareImage}
            numberOfPeople={numberOfPeople}
            numberOfPeopleImage={numberOfPeopleImage}
            onAddLesson={onAddLesson}
            {...this.props}
          />
        )}
      </Context.Consumer>
    );
  }
}
