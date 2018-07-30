import React, { Component } from "react";
import { Link } from "react-router-dom";
import Input from "../input";

function searchingFor(term) {
  return teachers => {
    return !term || teachers.first_name.toLowerCase().includes(term.toLowerCase());
  };
}

export default class TeacherslatesList extends Component {
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
    const teachers = this.props.teachers;
    let searchResult = teachers.filter(searchingFor(this.state.term));
    return (
      <div>
        <h1>Teachers</h1>
        <div>
          <Input
            onChange={this.searchHandler}
            type="text"
            placeholder="Search for template"
          />
        </div>
        &nbsp; &nbsp;
        <div>
          {searchResult.map((e, i) => (
            <div key={i}>
              <Link to={`/teacher/${e.id}`}>
                {e.first_name || "[no description]"}
                {!e.avatar ? (
                  <div>
                    {e.title === "Mr" ? (
                      <img
                        className="user-avatar"
                        src={require("../../image/icons/man-avatar.jpg")}
                        alt="avatar"
                      />
                    ) : (
                      <img
                        className="user-avatar"
                        src={require("../../image/icons/women-avatar.jpg")}
                        alt="avatar"
                      />
                    )}
                  </div>
                ) : (
                  <img className="user-avatar" src={e.avatar} alt="avatar" />
                )}
              </Link>
            </div>
          ))}
        </div>
      </div>
    );
  }
}
