import React, { Component } from "react";
import { Link } from "react-router-dom";

export default class TeachersList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      filters: false,
      err: null,
      msg: null
    };
  }

  showFilters = () => {
    if (!this.state.filters) {
      this.setState({ filters: true });
    } else this.setState({ filters: false });
  };
  render() {
    const {
      searchHandler,
      teachers,
      searchResultForSkillName,
      searchResultForSkillLevel,
      searchResultForWhatExperience,
      searchResultForWhatplace,
      searchResultForCollages
    } = this.props;
    const { filters } = this.state;

    return (
      <div>
        <h1>Teachers</h1>
        <button onClick={this.showFilters}>Filter</button>
        {filters && (
          <div>
            <select
              onChange={searchHandler}
              name="skillName"
              className="form-control"
            >
              <option value="">Skills</option>
              {teachers.map(teacher => {
                return teacher.skills.map((skill, i) => {
                  return (
                    <option value={skill.skill_name} key={i}>
                      {skill.skill_name}
                    </option>
                  );
                });
              })}
            </select>
            {/* Array.from(new Set(skillNames)).map((name, i) => {
                return (
                  <option value={name} key={i}>
                    {name}
                  </option>
                );
              }) */}
            <select
              name="skillLevel"
              onChange={searchHandler}
              className="form-control"
            >
              <option value="">Skill level</option>
              {searchResultForSkillName.map(teacher => {
                // return teacher.skills.map((skill, i) => {
                    var seen = {}
                    return teacher.skills.filter((skill)=> {
                      var skill_level=skill.skill_level
                      if (seen[skill_level])
                      return seen[skill_level] = true

                     return skill_level
                    })
                 
                    (<option value={skill_level}>{skill_level} </option>)
                // });
              })}
            </select>
            <select
              onChange={searchHandler}
              name="WhatExperience"
              className="form-control"
            >
              <option value="">Experiences</option>
              {searchResultForSkillLevel.map(teacher => {
                return teacher.experiences.map((experience, i) => {
                  return (
                    <option value={experience.what_experience} key={i}>
                      {experience.what_experience}
                    </option>
                  );
                });
              })}
            </select>
            <select
              onChange={searchHandler}
              name="Whatplace"
              className="form-control"
            >
              <option value="">Industry</option>
              {searchResultForWhatExperience.map(teacher => {
                return teacher.experiences.map((experience, i) => {
                  return (
                    <option value={experience.what_place} key={i}>
                      {experience.what_place}
                    </option>
                  );
                });
              })}
            </select>
            <select
              onChange={searchHandler}
              name="Collage"
              className="form-control"
            >
              <option value="">Collages</option>
              {searchResultForWhatplace.map(teacher => {
                return teacher.experiences.map((experience, i) => {
                  return (
                    <option value={experience.with_whom_teacher} key={i}>
                      {experience.with_whom_teacher}
                    </option>
                  );
                });
              })}
            </select>
          </div>
        )}
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
