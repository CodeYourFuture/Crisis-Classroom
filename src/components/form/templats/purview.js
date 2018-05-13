import React from "react";
import Context from "./context";
import Button from "../../button";
import { Grid, Row, Col } from "react-flexbox-grid/lib";

export default class Purview extends React.Component {
  render() {
    return (
      <div>
        <h2>Purview</h2>
        <Grid fluid className="grid-container">
          <Row className="mian-row">
            <Col className="box" lg={3} {...this.props}>
              <div>
                <Context.Consumer>
                  {({ lessonTitles }) =>
                    lessonTitles.map(lessonTitle => (
                      <div>
                        <h4>{lessonTitle.name}</h4>
                        <img
                          className="image"
                          width="50px"
                          src={lessonTitle.image}
                          alt="foo"
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
                  {({ tools }) =>
                    tools.map(tool => (
                      <div className="purview-items">
                        <p>{tool.name}</p>
                        <img
                          className="purview-image"
                          width="50px"
                          src={tool.image}
                          alt="foo"
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
                    lessonTitles.map(lessonTitle => (
                      <img
                        className="image"
                        width="50px"
                        src={lessonTitle.image}
                        alt="foo"
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
                    lessonTitles.map(lessonTitle => (
                      <img
                        className="image"
                        width="50px"
                        src={lessonTitle.image}
                        alt="foo"
                      />
                    ))
                  }
                </Context.Consumer>
              </div>
            </Col>
          </Row>
        </Grid>
        <Context.Consumer>
          {({ onAddLessonTitles, lessonTitles, previousFormHandler }) => (
            <Button
              className="btn btn-outline-dark "
              value="previouse"
              onClick={previousFormHandler}
            />
          )}
        </Context.Consumer>
      </div>
    );
  }
}
