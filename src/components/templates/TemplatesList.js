import React, { Component } from "react";
import { Link } from "react-router-dom";
import Fakedb from "../../data/Fakedb.json";
import SearchForInpud from "../form/templet/searchForTemplet";
import "./style.css";

function searchingFor(term) {
  return db => {
    return (
      !term || db.lessons.lessonTitle.toLowerCase().includes(term.toLowerCase())
    );
  };
}

export default class TemplatIndex extends Component {
  constructor(props) {
    super(props);
    this.state = {
      term: null
    };
  }
  searchHandler = e => {
    this.setState({
      term: e.target.value,
      result: e.target.value.length ? true : false
    });
  };

  render() {
    let searchResult = Fakedb.filter(searchingFor(this.state.term));
    return (
      <div>
        <h1>Templates</h1>
        <div className="templets">
          <SearchForInpud searchHandler={this.searchHandler} />
          <Link to="/add-new-templet">
            <button className="btn btn-primary">Add One</button>
          </Link>
        </div>
        <div className="templets">
          {searchResult.map((e, i) => (
            <div className="templetsItem">
              <Link to={`/templates/${e.lessons.id}`} key={i}>
                {e.lessons.lessonTitle || "[no description]"}
                <img
                  className="templetsItemImg"
                  src={require(`../../image/archive/${e.lessons.lessonImg}`)}
                  alt={e.lessons.lessonTitle}
                />
              </Link>
            </div>
          ))}
        </div>
      </div>
    );
  }
}
