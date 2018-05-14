import React from "react";
import Context from "./context";
import Button from "../../button";
import { Grid, Row, Col } from "react-flexbox-grid/lib";
import axios from "axios";

export default class Purview extends React.Component {
  

  onSubmit = lessonData => {
    console.log(lessonData)
    axios
      .post("http://localhost:8080/creat-lessons", lessonData)
      .then(result => {
        console.log(result);
      })
      .catch(err => {
        console.log(err);
      });
  };

  render() {
    return (
      <div>
        <h2>Preview</h2>
        <Grid fluid className="grid-container">
          <Row className="mian-row">
            <Col className="box" lg={3} {...this.props}>
              <div>
                <Context.Consumer>
                  {({ lessonTitles }) =>
                    lessonTitles.map(
                      (lessonTitle, i) => (
                        (
                          <div key={i}>
                            <h4>{lessonTitle.name}</h4>
                            <img
                              className="image"
                              width="50px"
                              src={lessonTitle.image}
                              alt="image"
                            />
                          </div>
                        )
                      )
                    )
                  }
                </Context.Consumer>
              </div>
            </Col>
            <Col className="box" lg={3} {...this.props}>
              <div>
                <Context.Consumer>
                  {({ tools }) =>
                    tools.map((tool, i) => (
                      <div className="purview-items" key={i}>
                        <p>{tool.name}</p>
                        <img
                          className="purview-image"
                          width="50px"
                          src={tool.image}
                          alt="image"
                        />
                      </div>
                    ))
                  }
                </Context.Consumer>
              </div>
            </Col>
            <Col className="box" lg={3} {...this.props}>
              <div>
                <Context.Consumer>
                  {({ lessonTitles }) =>
                    lessonTitles.map((lessonTitle, i) => (
                      <img
                        className="image"
                        width="50px"
                        src={lessonTitle.image}
                        alt="image"
                        key={i}
                      />
                    ))
                  }
                </Context.Consumer>
              </div>
            </Col>
            <Col className="box" lg={3} {...this.props}>
              <div>
                <Context.Consumer>
                  {({ lessonTitles }) =>
                    lessonTitles.map((lessonTitle, i) => (
                      <img
                        className="image"
                        width="50px"
                        src={lessonTitle.image}
                        alt="image"
                        key={i}
                      />
                    ))
                  }
                </Context.Consumer>
              </div>
            </Col>
          </Row>
        </Grid>
        <Context.Consumer>
          {context => {
            const {
              // onAddLessonTitles,
              lessonTitles,
              tools,
              ingredients,
              instructions,
              previousFormHandler
            } = context;
            return (
              <div>
                <Button
                  className="btn btn-outline-dark "
                  value="previous"
                  onClick={previousFormHandler}
                />
                <Button
                  className="btn btn-outline-dark "
                  value="Save"
                  onClick={() =>
                    this.onSubmit({
                      lessonTitles,
                      tools,
                      ingredients,
                      instructions
                    })
                  }
                />
              </div>
            );
          }}
        </Context.Consumer>
      </div>
    );
  }
}
//  onAddLessonTitles, lessonTitles, previousFormHandler
