import React, { Component } from "react";
import { Link } from "react-router-dom";
import Input from "../input";
import "./style.css";

function searchingFor(term) {
  return db => {
    return (
      !term || db.lessonTitle.toLowerCase().includes(term.toLowerCase())
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
    let searchResult = this.props.lessons.filter(searchingFor(this.state.term));
    return (
      <div>
        <h1>Templates</h1>
        <div className="templets">
          <Input
            onChange={this.searchHandler}
            type="text"
            placeholder="Search for template"
          />
          <Link to="/add-new-templet" className="push">
            <button className="btn btn-primary">Add One</button>
          </Link>
        </div>
        &nbsp; &nbsp;
        <div className="templets">
          {searchResult.map((e, i) => (
            <div className="templetsItem" key={i}>
              <Link to={`/templates/${e.id}`}>
                {e.lessonTitle || "[no description]"}
                <img
                  className="templetsItemImg"
                  src={e.lessonTitleImage}
                  alt={e.lessonTitle}
                />
              </Link>
            </div>
          ))}
        </div>
      </div>
    );
  }
}
