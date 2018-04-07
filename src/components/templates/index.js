import React, { Component } from "react";
import { Route, Link } from "react-router-dom";
import Fakedb from "../../data/Fakedb.json";
import FirstPage from "./FirstPage/index";
import "./style.css";

export default class TemplatIndex extends Component {
  render() {
    return (
      <div>
        <div>
          {Fakedb.map((e, i) => (
            <Route exact path="/templates/temp" className="templets" key={i}>
              <Link to={`/templates/temp/${e.lessons.id}`} key={i}>
                <div className="templetsItem">
                  {e.lessons.lessonTitle || "[no description]"}
                  <img
                    className="templetsItemImg"
                    src={require(`../../image/archive/${e.lessons.lessonImg}`)}
                    alt={e.lessons.lessonTitle}
                  />
                </div>
              </Link>
            </Route>
          ))}
        </div>
        <Route
          path="/templates/temp/:eId"
          render={({ match }) => (
            <FirstPage
              lesson={Fakedb.find(g => g.lessons.id === parseInt(match.params.eId, 10))}
            />
          )}
        />
      </div>
    );
  }
}
