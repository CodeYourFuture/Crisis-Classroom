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

  onChangeImageLessonTitleshandler = (e, index) => {
    const lessonTitle = this.state.lessonTitles[index];
    var reader = new FileReader();
    reader.readAsDataURL(e.target.files[0]);
    reader.onload = () => {
      const newLessonTitleImage = { ...lessonTitle, image: reader.result };
      this.setState({
        lessonTitles: this.state.lessonTitles.map(
          (lessonTitle, i) => (i === index ? newLessonTitleImage : lessonTitle)
        )
      });
    };
  };

  addLessonTitlesHandler = e => {
    this.setState({
      lessonTitles: [
        ...this.state.lessonTitles,
        { id: this.state.lessonTitles.length + 1, name: "", image: "" }
      ]
    });
  };

  removeLessonTitlesHandler = id => {
    const { lessonTitles } = this.state;
    lessonTitles.forEach(lessonTitle => {
      if (lessonTitle.id === id) {
        lessonTitle.image = null;
      }
    });
    this.setState({
      lessonTitles
    });
  };

  render() {
    // console.log(this.state.lessonValue);
    return (
      <div>
        <div>
          <h2>lessonTitles </h2>
          {this.state.lessonTitles &&
            this.state.lessonTitles.map(({ name, image, id }, i) => {
              return (
                <div className="lessonForm" key={id}>
                  <div className="form-group">
                    <Label
                      value={this.state.lessonValue.map(
                        (vall, i) => (id === i + 1 ? vall : "")
                      )}
                    />
                    <div className="lessonInput">
                      <Input
                        className="form-control"
                        type="text"
                        name="name"
                        onChange={e => this.onChangeLessonTitleshandler(e, i)}
                        placeholder={this.state.lessonValue.map(
                          (vall, i) => (id === i + 1 ? vall : "")
                        )}
                        value={name}
                      />
                      {!image ? (
                        <div>
                          <label className="btn btn-outline-dark">
                            Chose a file
                            <input
                              style={{ display: "none" }}
                              type="file"
                              name="image"
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
                          onClick={() => this.removeLessonTitlesHandler(id)}
                        >
                          <img
                            className="image"
                            width="100px"
                            src={image}
                            alt="foo"
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

// import React, { Component } from "react";
// import Input from "../../input";
// import Label from "../../label";

// export default class lessonTitle extends Component {
//   render() {
//     return (
//       <div>
//         <form>
//           <div className="form-group">
//             <Label value="Title" />
//             <div className="row">
//               <Input
//                 className="form-control"
//                 type="text"
//                 name="title"
//                 onChange={this.props.onChangehandler}
//                 placeholder="Insert title"
//                 value={this.props.userData.title}
//               />
//               &nbsp;
//               <div>
//                 <label className="btn btn-outline-dark">
//                   Chose a file
//                   <input
//                     style={{ display: "none" }}
//                     type="file"
//                     onChange={this.props.handleUploadFile}
//                     accept="image/*"
//                   />
//                 </label>
//               </div>
//             </div>
//           </div>
//           <div className="form-group">
//             <Label value="Time to perpare" />
//             <div className="row">
//               <Input
//                 className="form-control"
//                 type="text"
//                 name="duration"
//                 onChange={this.props.onChangehandler}
//                 placeholder="How much time does it require?"
//                 value={this.props.userData.duration}
//               />
//               &nbsp;
//               <div>
//                 <label className="btn btn-outline-dark">
//                   Chose a file
//                   <input
//                     style={{ display: "none" }}
//                     type="file"
//                     onChange={this.props.handleUploadFile}
//                     accept="image/*"
//                   />
//                 </label>
//               </div>
//             </div>
//           </div>
//           <div className="form-group">
//             <Label value="N. People" />
//             <div className="row">
//               <Input
//                 className="form-control"
//                 type="text"
//                 name="numberOfPeople"
//                 onChange={this.props.onChangehandler}
//                 placeholder="How many people is it for?"
//                 value={this.props.userData.numberOfPeople}
//               />
//               &nbsp;
//               <div>
//                 <label className="btn btn-outline-dark">
//                   Chose a file
//                   <input
//                     style={{ display: "none" }}
//                     type="file"
//                     onChange={this.props.handleUploadFile}
//                     accept="image/*"
//                   />
//                 </label>
//               </div>
//             </div>
//           </div>
//         </form>
//       </div>
//     );
//   }
// }
