import React, { Component } from "react";
import { Link } from "react-router-dom";
import Input from "../input";
import PlusIcon from "../../image/icons/plus-icon-green-hi.png";

function searchingFor(term) {
  return db => {
    return !term || db.lesson_title.toLowerCase().includes(term.toLowerCase());
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
    const lessons = this.props.lessons
    let searchResult = lessons.filter(searchingFor(this.state.term))
    return (
      <div>
        <h1>Templates</h1>
        <div className="templets">
          <Input
            onChange={this.searchHandler}
            type="text"
            placeholder="Search for template"
          />
        </div>
        &nbsp; &nbsp;
        <div className="templets">
          <Link to="/add-new-template" className="add-templat">
            <img
              src={PlusIcon}
              alt="plus icon green"
              className="add-templat-p"
            />
          </Link>
          {searchResult.map((e, i) => (
            <div className="templetsItem" key={i}>
              <Link to={`/templates/${e.id}`}>
                {e.lesson_title || "[no description]"}
                <img
                  className="templetsItemImg"
                  src={e.lesson_title_image}
                  alt={e.lesson_title}
                />
              </Link>
            </div>
          ))}
        </div>
      </div>
    );
  }
}
