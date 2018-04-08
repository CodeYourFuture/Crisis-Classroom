import React from "react";
import { Grid, Row, Col } from "react-flexbox-grid/lib";
import Tools from "./tools";
import TimeToPrepair from "./timeToPrepair";
import NumberOfPeople from "./numberOfPeople";
import LessonTitle from "./lessonTitle";
import Ingredients from "./ingredients";
import Instructions from "./insturctions";
import Instructionsparttwo from "./instructionsparttwo";
import Fakedb from "../../../data/Fakedb.json";

import "./style.css";

export default class FirstPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      lesson: null
    };
  }

  componentDidMount() {
    const { id } = this.props.match.params
    const lesson = Fakedb.find(
      g => g.lessons.id === parseInt(id, 10)
    );
    this.setState({ lesson });
  }

  render() {
    const { lesson } = this.state;
  
    if (lesson === null) {
      return <h1>Loading....</h1>;
    }
  
    return (
      <div>
        {[lesson].map((e, i) => {
          return (
            <Grid fluid className="container" key={i}>
              <Row className="minrow">
                <Col className="box1" lg={3} {...this.props}>
                  <LessonTitle
                    lessonTitle={e.lessons.lessonTitle}
                    lessonImg={e.lessons.lessonImg}
                  />
                  <TimeToPrepair
                    timeToPrepair={e.lessons.timeToPrepair}
                    timeToPrepairClock={e.lessons.timeToPrepairClock}
                  />
                  <NumberOfPeople
                    numberOfPeople={e.lessons.numberOfPeople}
                    peopleSymbole={e.lessons.peopleSymbole}
                  />
                  <hr />
                  <Tools
                    tools={e.lessons.tools}
                    toolsItem={e.lessons.toolsItem}
                  />
                </Col>
                <Col className="box1" lg={3} {...this.props}>
                  <Ingredients
                    ingredient={e.lessons.ingredient}
                    ingredients={e.lessons.ingredients}
                  />
                </Col>
                <Col className="box1" lg={3} {...this.props}>
                  <Instructions
                    instruction={e.lessons.instruction}
                    instructions={e.lessons.instructions}
                  />
                </Col>
                <Col className="box1" lg={3} {...this.props}>
                  <Instructionsparttwo instructions={e.lessons.instructions} />
                </Col>
              </Row>
            </Grid>
          );
        })}
      </div>
    );
  }
}
