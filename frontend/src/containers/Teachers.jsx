import React, { Component } from "react";
import axios from "axios";
import { Switch, Route, Redirect } from "react-router-dom";
import TeachersLists from "../components/teachers/teachersLists.jsx";
import Teacher from "../components/teachers/teacher.jsx";

export default class Teachers extends Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      teachers: [],
      err: false,
      msg: false,
      teacherName:null,
      skillName: null,
      skillLevel: null,
      WhatExperience: null,
      Whatplace: null,
      Collage: null
    };
  }

  componentDidMount() {
      axios
      .post(`${process.env.REACT_APP_DOMAIN}/teachers`)
      .then(result => {
        if (result.msg) {
          this.setState({ msg: result.msg });
        } else if (result) {
          this.setState({ teachers: result.data });
        } else
          this.setState({
            err:
              "Sorry something happened on the server, please try again later."
          });
      })
      .catch(error => {
        if (error) {
          this.setState({
            err:
              "Sorry something happened on the server, please try again later."
          });
        }
      });
  }
  searchHandler = e => {
    this.setState({
      [e.target.name]: e.target.value,
      result: e.target.value.length ? true : false
    });
  };

  render() {
    const { match } = this.props;
    const {
      err,
      msg,
      teacherName,
      skillName,
      skillLevel,
      WhatExperience,
      Whatplace,
      Collage,
      teachers
    } = this.state;
    //search For teacher Name
    const searchResultForTeacherName = teachers.filter(searchingForTeacherName(teacherName));
    //search For Skill Name
    const searchResultForSkillName = searchResultForTeacherName.filter(
      searchingForSkillName(skillName)
    );
    //search For Skill Level
    const searchResultForSkillLevel = searchResultForSkillName.filter(
      searchingForSkillLevel(skillLevel)
    );
    //search For Experiences
    const searchResultForWhatExperience = searchResultForSkillLevel.filter(
      searchingForWhatExperience(WhatExperience)
    );

    //search For places they work in
    const searchResultForWhatplace = searchResultForWhatExperience.filter(
      searchingForWhatplace(Whatplace)
    );

    //search For Collages
    const searchResultForCollages = searchResultForWhatplace.filter(
      searchingForCollages(Collage)
    );

    return (
      <div>
        {msg || err ? (
          <h5 className="error">
            {msg}
            {err}
          </h5>
        ) : (
          <Switch>
            <Route
              ref="Route"
              exact
              path="/teachers"
              render={props => (
                <TeachersLists
                  ref="TeachersLists"
                  {...props}
                  teachers={this.state.teachers}
                  searchResultForSkillName={searchResultForSkillName}
                  searchResultForSkillLevel={searchResultForSkillLevel}
                  searchResultForWhatExperience={searchResultForWhatExperience}
                  searchResultForWhatplace={searchResultForWhatplace}
                  searchResultForCollages={searchResultForCollages}
                  searchHandler={this.searchHandler}
                />
              )}
            />
            <Route
              exact
              path="/teachers/:id"
              render={props => (
                <Teacher {...props} teachers={this.state.teachers} />
              )}
            />
            <Redirect to={match.path} />
          </Switch>
        )}
      </div>
    );
  }
}
//search for teacher name
function searchingForTeacherName(teacherName) {
  return teachers => {
    return !teacherName || teachers.first_name.toLowerCase().includes(teacherName.toLowerCase());
  };
}
//search For Skill Name
function searchingForSkillName(skillName) {
  return teachers => {
    const result = teachers.skills
      .map(skill => skill.skill_name.includes(skillName))
      .filter(index => index === true);
    return !skillName || result[0];
  };
}

//search For Skill Level
function searchingForSkillLevel(skillLevel) {
  return teachers => {
    const result = teachers.skills
      .map(skill => skill.skill_level.includes(skillLevel))
      .filter(index => index === true);
    return !skillLevel || result[0];
  };
}
//search For Experiences
function searchingForWhatExperience(WhatExperience) {
  return teachers => {
    const result = teachers.experiences
      .map(experience => experience.what_experience.includes(WhatExperience))
      .filter(index => index === true);
    return !WhatExperience || result[0];
  };
}
//search For places they work in
function searchingForWhatplace(Whatplace) {
  return teachers => {
    const result = teachers.experiences
      .map(experience => experience.what_place.includes(Whatplace))
      .filter(index => index === true);
    return !Whatplace || result[0];
  };
}
//search For Collages
function searchingForCollages(Collage) {
  return teachers => {
    const result = teachers.experiences
      .map(experience => experience.with_whom_teacher.includes(Collage))
      .filter(index => index === true);
    return !Collage || result[0];
  };
}
