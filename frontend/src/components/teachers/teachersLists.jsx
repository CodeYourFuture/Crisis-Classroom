import React, { Component } from "react";
// import { Link } from "react-router-dom";
// import Input from "../input";
import TeachersListResult from "./teachersListResult.jsx";

export default class TeachersList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      skillName: null,
      skillLevel: null,
      WhatExperience: null,
      Whatplace: null,
      Collage: null
    };
  }

  searchHandler = e => {
    this.setState({
      [e.target.name]: e.target.value,
      result: e.target.value.length ? true : false
    });
  };

  render() {
    const {
      skillName,
      skillLevel,
      WhatExperience,
      Whatplace,
      Collage
    } = this.state;
    // const { teachers } = this.props;
    //search For Skill Name
    const searchResultForSkillName = this.props.teachers.filter(
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
        <TeachersListResult
          {...this.props}
          // teachers={this.props.teachers}
          // props={this.props}
          searchResultForCollages={searchResultForCollages}
          searchHandler={this.searchHandler}
        />
      </div>
    );
  }
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
