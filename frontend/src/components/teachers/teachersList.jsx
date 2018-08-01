import React, { Component } from "react";
import { Link } from "react-router-dom";
// import Input from "../input";

export default class TeacherslatesList extends Component {
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
    const teachers = this.props.teachers;
    //search For Skill Name
    let skillNames = [];
    const searchResultForSkillName = teachers.filter(
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
    let whatExperiences = [];
    //search For places they work in
    const searchResultForWhatplace = searchResultForWhatExperience.filter(
      searchingForWhatplace(Whatplace)
    );
    let Whatplaces = [];
    //search For Collages
    const searchResultForCollages = searchResultForWhatplace.filter(
      searchingForCollages(Collage)
    );
    let Collages = [];
    // with_whom_teacher;
    teachers.map(teacher => {
      return (
        //search For Skill Name
        teacher.skills.map(skill => {
          return skillNames.push(skill.skill_name);
        }),
        //search For Experiences
        teacher.experiences.map(experience => {
          return whatExperiences.push(experience.what_experience);
        }),
        //search For places they work in
        teacher.experiences.map(experience => {
          return Whatplaces.push(experience.what_place);
        }),
        //search For Collages
        teacher.experiences.map(experience => {
          return Collages.push(experience.with_whom_teacher);
        })
      );
    });
    return (
      <div>
        <h1>Teachers</h1>
        <div>
          <select
            onChange={this.searchHandler}
            name="skillName"
            className="form-control"
          >
            <option value="">Skills</option>
            {Array.from(new Set(skillNames)).map((name, i) => {
              return (
                <option value={name} key={i}>
                  {name}
                </option>
              );
            })}
          </select>
          <select
            name="skillLevel"
            onChange={this.searchHandler}
            className="form-control"
          >
            <option value="">Skill level</option>
            <option value="Beginner">Beginner</option>
            <option value="Intermediate">Intermediate</option>
            <option value="Advance">Advance</option>
          </select>
          <select
            onChange={this.searchHandler}
            name="WhatExperience"
            className="form-control"
          >
            <option value="">Experiences</option>
            {Array.from(new Set(whatExperiences)).map((name, i) => {
              return (
                <option value={name} key={i}>
                  {name}
                </option>
              );
            })}
          </select>
          <select
            onChange={this.searchHandler}
            name="Whatplace"
            className="form-control"
          >
            <option value="">Industry</option>
            {Array.from(new Set(Whatplaces)).map((name, i) => {
              return (
                <option value={name} key={i}>
                  {name}
                </option>
              );
            })}
          </select>
          <select
            onChange={this.searchHandler}
            name="Collage"
            className="form-control"
          >
            <option value="">Collages</option>
            {Array.from(new Set(Collages)).map((name, i) => {
              return (
                <option value={name} key={i}>
                  {name}
                </option>
              );
            })}
          </select>
        </div>
        &nbsp; &nbsp;
        <div>
          {searchResultForCollages.map((e, i) => (
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
