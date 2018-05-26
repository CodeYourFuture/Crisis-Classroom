import React from "react";
import { Link } from "react-router-dom";
import { Grid, Row, Col } from "react-flexbox-grid/lib";


import "./style.css";

export default class FirstPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      lesson: null,
      error: null
    };
  }

  componentDidMount() {
    const { id } = this.props.match.params;
    const lesson = this.props.lessons.find(g => g.id === parseInt(id, 10));
    if (lesson) {
      this.setState({ lesson: lesson });
    } else {
      this.setState({ error: "Lesson not found" });
    }
  }

  render() {
    const { lesson, error } = this.state;
    if (error) {
      return (
        <div className="not-found-templates">
          <h3>{error}</h3>
          &nbsp; &nbsp;
          <Link to="/templates" className="btn btn-outline-success">
            Go back to templates
          </Link>
        </div>
      );
    }
    if (lesson === null) {
      return <h1>Loading....</h1>;
    }
    return (
      <div>
        <Grid fluid className="grid-container">
          <Row className="mian-row">
            <Col className="box" lg={3} {...this.props}>
              <div>
                <div className="preview-title-items">
                  <h2>{lesson.lessonTitle}</h2>
                  <img
                    className="preview-title-image"
                    src={lesson.lessonTitleImage}
                    alt="lessonTitle"
                  />
                </div>
                <div className="preview-items">
                  <h6>{lesson.timeToPrepare}</h6>
                  <img
                    className="preview-image"
                    width="50px"
                    src={lesson.timeToPrepareImage}
                    alt="ingredient"
                  />
                </div>
                <div className="preview-items">
                  <h6>{lesson.numberOfPeople}</h6>
                  <img
                    className="preview-image"
                    width="50px"
                    src={lesson.numberOfPeopleImage}
                    alt="ingredient"
                  />
                </div>
              </div>
              <hr className="preview-hr" />
              <h4>Tools</h4>
              {lesson.tools.map((tool, i) => (
                <div className="preview-items" key={i}>
                  <h6>{tool.toolName}</h6>
                  <img
                    className="preview-image"
                    width="50px"
                    src={tool.toolImage}
                    alt="tool"
                  />
                </div>
              ))}
            </Col>
            <Col className="box" lg={3} {...this.props}>
              <h4>Ingredients</h4>
              {lesson.ingredients.map((ingredient, i) => (
                <div className="preview-items" key={i}>
                  <h6>{ingredient.ingredientName}</h6>
                  <img
                    className="preview-image"
                    width="50px"
                    src={ingredient.ingredientImage}
                    alt="ingredient"
                  />
                </div>
              ))}
            </Col>
            <Col className="box" lg={3} {...this.props}>
              <h4>Instructions</h4>
              {lesson.instructions.map((instruction, i) => {
                return (
                  <div className="preview-items" key={i}>
                    <h6>{instruction.instructionName}</h6>
                    <img
                      className="preview-image"
                      width="50px"
                      src={instruction.instructionImage}
                      alt="instruction"
                    />
                  </div>
                );
              })}
            </Col>
            <Col className="box" lg={3} {...this.props} />
          </Row>
        </Grid>
      </div>
    );
  }
}
