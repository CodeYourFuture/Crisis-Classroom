import React from "react";
import { Grid, Row, Col } from "react-flexbox-grid/lib";
import Tools from "./tools";
import TimeToPrepair from "./timeToPrepair";
import NumberOfPeople from "./numberOfPeople";
import LessonTitle from "./lessonTitle";
import Ingredients from "./ingredients";
import Instructions from "./insturctions";
import Instructionsparttwo from "./instructionsparttwo"

import "./style.css";

export default class FirstPage extends React.Component {
  render() {
    return (
      <div>
        {this.props.data.map((e, i) => {
          return (
            <Grid fluid className="container">
              <Row className="minrow">
                <Col className="box1" lg={3} {...this.props} key={i}>
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
                <Col className="box1" lg={3} {...this.props} key={i}>
                  <Ingredients
                    ingredient={e.lessons.ingredient}
                    ingredients={e.lessons.ingredients}
                  />
                </Col>
                <Col className="box1" lg={3} {...this.props} key={i}>
                  <Instructions
                    instruction={e.lessons.instruction}
                    instructions={e.lessons.instructions}
                  />
                </Col>
                <Col className="box1" lg={3} {...this.props} key={i}>
                  <Instructionsparttwo
                    instructions={e.lessons.instructions}
                  />
                </Col>
                
              </Row>
            </Grid>
          );
        })}
        
      </div>
    );
  }
}
