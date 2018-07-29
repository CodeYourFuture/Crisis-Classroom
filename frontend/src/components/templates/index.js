import React from "react";
import { Link } from "react-router-dom";
import { Grid, Row, Col } from "react-flexbox-grid/lib";
import axios from "axios";
import Button from "../button";
import "./style.css"

export default class Template extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      lesson: null,
      error: null
    };
  }
  editHandler = lesson => {
    this.props.history.push({
      pathname: "/add-new-template",
      state: { lesson }
    });
  };
  DeleteHandler = lesson => {
    axios
      .post(`${process.env.REACT_APP_DOMAIN}/delete-lessons`, lesson)
      .then(result => {
        if (result) {
          this.props.history.replace("/template-deleted");
        }
      })
      .catch(err => {
        console.log(err);
      });
  };

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
            <Col className="box" lg={3}>
              <div>
                <div className="preview-title-items">
                  <h2>{lesson.lesson_title}</h2>
                  <img
                    className="preview-title-image"
                    src={lesson.lesson_title_image}
                    alt="lesson_title"
                  />
                </div>
                <div className="preview-items">
                  <h6>{lesson.time_to_prepare}</h6>
                  <img
                    className="preview-image"
                    width="50px"
                    src={lesson.time_to_prepare_image}
                    alt="ingredient"
                  />
                </div>
                <div className="preview-items">
                  <h6>{lesson.number_of_people}</h6>
                  <img
                    className="preview-image"
                    width="50px"
                    src={lesson.number_of_people_image}
                    alt="ingredient"
                  />
                </div>
              </div>
              <hr className="preview-hr" />
              <h4>Tools</h4>
              {lesson.tools.map((tool, i) => (
                <div className="preview-items" key={i}>
                  <h6>{tool.tool_name}</h6>
                  <img
                    className="preview-image"
                    width="50px"
                    src={tool.tool_image}
                    alt="tool"
                  />
                </div>
              ))}
            </Col>
            <Col className="box" lg={3}>
              <h4>Ingredients</h4>
              {lesson.ingredients.map((ingredient, i) => (
                <div className="preview-items" key={i}>
                  <h6>{ingredient.ingredient_name}</h6>
                  <img
                    className="preview-image"
                    width="50px"
                    src={ingredient.ingredient_image}
                    alt="ingredient"
                  />
                </div>
              ))}
            </Col>
            <Col className="box" lg={3}>
              <h4>Instructions</h4>
              {lesson.instructions.map((instruction, i) => {
                return (
                  <div className="preview-items" key={i}>
                    <h6>{instruction.instruction_name}</h6>
                    <img
                      className="preview-image"
                      width="50px"
                      src={instruction.instruction_image}
                      alt="instruction"
                    />
                  </div>
                );
              })}
            </Col>
            <Col className="box" lg={3} />
          </Row>
        </Grid>
        <div style={{ display: "flex" }}>
          <Button
            className="btn btn-outline-dark "
            value="Edit"
            onClick={() => this.editHandler(lesson)}
          />
          &nbsp;
          <Button
            className="btn btn-outline-danger"
            value="Delete"
            onClick={() => this.DeleteHandler(lesson)}
          />
        </div>
      </div>
    );
  }
}
