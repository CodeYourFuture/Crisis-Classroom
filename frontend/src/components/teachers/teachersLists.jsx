import React, { Component } from "react";
import { Link } from "react-router-dom";
import decode from "jwt-decode";

export default class TeachersList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      filters: false,
      err: null,
      msg: null
    };
  }

  getSkills = () => {
    const { teachers } = this.props;
    const uniqueSkills = skills => {
      const uSkills = new Set(skills);
      return Array.from(uSkills);
    };
    const skills = [];
    teachers.forEach(teacher => {
      teacher.skills.forEach(skill => {
        skills.push(skill.skill_name);
      });
    });

    return uniqueSkills(skills).map((skill, i) => {
      return (
        <option value={skill} key={i}>
          {skill}
        </option>
      );
    });
  };

  gitSkillLevel = () => {
    const { searchResultForSkillName } = this.props;
    const uniqueSkillLevel = skillLevel => {
      const uSkillLevels = new Set(skillLevel);
      return Array.from(uSkillLevels);
    };
    const skillLevels = [];
    searchResultForSkillName.forEach(teacher => {
      teacher.skills.forEach(skill => {
        skillLevels.push(skill.skill_level);
      });
    });

    return uniqueSkillLevel(skillLevels).map((skillLevel, i) => {
      return (
        <option value={skillLevel} key={i}>
          {skillLevel}
        </option>
      );
    });
  };

  getExperiences = () => {
    const { searchResultForSkillLevel } = this.props;
    const uniqueExperience = experience => {
      const uExperience = new Set(experience);
      return Array.from(uExperience);
    };
    const experiences = [];
    searchResultForSkillLevel.forEach(teacher => {
      teacher.experiences.forEach(experience => {
        experiences.push(experience.what_experience);
      });
    });
    return uniqueExperience(experiences).map((experience, i) => {
      return (
        <option value={experience} key={i}>
          {experience}
        </option>
      );
    });
  };

  getIndustrys = () => {
    const { searchResultForWhatExperience } = this.props;
    const uniquIndustry = industry => {
      const uIndustry = new Set(industry);
      return Array.from(uIndustry);
    };
    const industrys = [];
    searchResultForWhatExperience.forEach(teacher => {
      teacher.experiences.forEach(experience => {
        industrys.push(experience.what_place);
      });
    });
    return uniquIndustry(industrys).map((industry, i) => {
      return (
        <option value={industry} key={i}>
          {industry}
        </option>
      );
    });
  };

  getCollages = () => {
    const { searchResultForWhatplace } = this.props;
    const uniquCollage = collage => {
      const uCollage = new Set(collage);
      return Array.from(uCollage);
    };
    const collages = [];
    searchResultForWhatplace.forEach(teacher => {
      teacher.experiences.forEach(experience => {
        collages.push(experience.with_whom_teacher);
      });
    });
    return uniquCollage(collages).map((collage, i) => {
      return (
        <option value={collage} key={i}>
          {collage}
        </option>
      );
    });
  };

  render() {
    const { searchHandler, searchResultForCollages } = this.props;
    const token = localStorage.getItem("id_token");
    const decoded = decode(token);
    const userId = decoded.id;
    return (
      <div>
        <h1>Teachers</h1>
        <div>
          <input
            className="form-control"
            onChange={searchHandler}
            name="teacherName"
            type="text"
            placeholder="Search by teachers name..."
          />
        </div>
        <hr />
        <h4>Find teachers by their details</h4>
        <div className="teachers-filters">
          <select
            onChange={searchHandler}
            name="skillName"
            className="form-control teachers-filter"
          >
            <option value="">Skills</option>
            {this.getSkills()}
          </select>
          <select
            name="skillLevel"
            onChange={searchHandler}
            className="form-control teachers-filter"
          >
            <option value="">Skill level</option>
            {this.gitSkillLevel()}
          </select>
          <select
            onChange={searchHandler}
            name="WhatExperience"
            className="form-control teachers-filter"
          >
            <option value="">Experiences</option>
            {this.getExperiences()}
          </select>
          <select
            onChange={searchHandler}
            name="Whatplace"
            className="form-control teachers-filter"
          >
            <option value="">Industry</option>
            {this.getIndustrys()}
          </select>
          <select
            onChange={searchHandler}
            name="Collage"
            className="form-control teachers-filter"
          >
            <option value="">Collages</option>
            {this.getCollages()}
          </select>
        </div>
        <hr />
        <hr />
        <div className="teschers-list-div">
          {searchResultForCollages.map((e, i) => (
            <div className="teschers-list" key={i}>
              <div>
                {e.id === userId ? (
                  <Link to={`/user-profile`}>
                    {!e.avatar ? (
                      <div>
                        {e.title === "Mr" ? (
                          <img
                            className="teachers-list-avatar"
                            src={require("../../image/icons/man-avatar.jpg")}
                            alt="avatar"
                          />
                        ) : (
                          <img
                            className="teachers-list-avatar"
                            src={require("../../image/icons/women-avatar.jpg")}
                            alt="avatar"
                          />
                        )}
                      </div>
                    ) : (
                      <img
                        className="teachers-list-avatar"
                        src={e.avatar}
                        alt="avatar"
                      />
                    )}
                    <h6>
                      {e.title} {e.first_name} {e.sur_name}
                    </h6>
                  </Link>
                ) : (
                  <Link to={`/teachers/${e.id}`}>
                    {!e.avatar ? (
                      <div>
                        {e.title === "Mr" ? (
                          <img
                            className="teachers-list-avatar"
                            src={require("../../image/icons/man-avatar.jpg")}
                            alt="avatar"
                          />
                        ) : (
                          <img
                            className="teachers-list-avatar"
                            src={require("../../image/icons/women-avatar.jpg")}
                            alt="avatar"
                          />
                        )}
                      </div>
                    ) : (
                      <img
                        className="teachers-list-avatar"
                        src={e.avatar}
                        alt="avatar"
                      />
                    )}
                    <h6>
                      {e.title} {e.first_name} {e.sur_name}
                    </h6>
                  </Link>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }
}
