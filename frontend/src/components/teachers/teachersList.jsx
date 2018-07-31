import React, { Component } from "react";
import { Link } from "react-router-dom";
import Input from "../input";
function searchingFor(term) {
  return teachers => {
    return (
      !term || console.log(teachers.skills.map(skill => skill.skill_name.includes(term)))
    )
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
    const searchResult = teachers.filter(searchingFor(this.state.term));
    return (
      <div>
        <h1>Teachers</h1>
        <div>
           <select onChange={this.searchHandler} className="form-control">
            <option>Skill</option>
            {teachers.map(teacher => {
              return teacher.skills.map((skill, i) => {
              return  <option value={skill.skill_name} key={i}>{skill.skill_name}</option>;
              });
            })}
          </select> 

          <Input
            onChange={this.searchHandler}
            type="text"
            placeholder="Search ...."
          />
        </div>
        &nbsp; &nbsp;
        <div>
          {searchResult.map((e, i) => (
            <div key={i}>
              <Link to={`/teachers/${e.id}`}>
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
                <h6>
                  {e.title} {e.first_name} {e.sur_name}
                </h6>
              </Link>
            </div>
          ))}
        </div>
      </div>
    );
  }
}
