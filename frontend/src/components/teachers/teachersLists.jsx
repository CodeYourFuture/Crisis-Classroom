import React, { Component } from "react";
import { Link } from "react-router-dom";

export default class TeachersList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      skillNames: [],
      experienceName: [],
      industry: [],
      collages: [],
      filters: false,
      err: null,
      msg: null
    };
  }
  removAndsetStateHandlr() {
    this.removState();
    setTimeout(() => {


    }, 100);
    this.setCollagesDropdown();
    this.setIndustryDropdown();
    this.setExperienceNameDrupdown();
    this.setSkillDrupdown();
  }
  removState() {
    this.setState({
      skillNames: [],
      experienceName: [],
      industry: [],
      collages: []
    });
  }
  setSkillDrupdown() {
    const { searchResultForCollages } = this.props;
    searchResultForCollages.map(teacher => {
      return this.setState(prevState => {
        return {
          skillNames: prevState.skillNames.concat(
            teacher.skills.map(skill => skill.skill_name)
          )
        };
      });
    });
  }
  setExperienceNameDrupdown() {
    const { searchResultForCollages } = this.props;
    searchResultForCollages.map(teacher => {
      return this.setState(prevState => {
        return {
          experienceName: prevState.experienceName.concat(
            teacher.experiences.map(experience => experience.what_experience)
          )
        };
      });
    });
  }
  setIndustryDropdown() {
    const { searchResultForCollages } = this.props;
    searchResultForCollages.map(teacher => {
      return this.setState(prevState => {
        return {
          industry: prevState.industry.concat(
            teacher.experiences.map(experience => experience.what_place)
          )
        };
      });
    });
  }
  setCollagesDropdown() {
    const { searchResultForCollages } = this.props;
    searchResultForCollages.map(teacher => {
      return this.setState(prevState => {
        return {
          collages: prevState.collages.concat(
            teacher.experiences.map(experience => experience.with_whom_teacher)
          )
        };
      });
    });
  }

  showFilters = () => {
    this.removAndsetStateHandlr();
    if (!this.state.filters) {
      this.setState({ filters: true });
    } else this.setState({ filters: false });
  };
  render() {
    const { searchHandler, searchResultForCollages } = this.props;
    const {
      filters,
      skillNames,
      experienceName,
      collages,
      industry
    } = this.state;

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
              onChange={searchHandler}
              className="form-control"
            >
              <option value="">Skill level</option>
              <option value="Beginner">Beginner</option>
              <option value="Intermediate">Intermediate</option>
              <option value="Advance">Advance</option>
            </select>
            <select
              onChange={searchHandler}
              name="WhatExperience"
              className="form-control"
            >
              <option value="">Experiences</option>
              {Array.from(new Set(experienceName)).map((name, i) => {
                return (
                  <option value={name} key={i}>
                    {name}
                  </option>
                );
              })}
            </select>
            <select
              onChange={searchHandler}
              name="Whatplace"
              className="form-control"
            >
              <option value="">Industry</option>
              {Array.from(new Set(industry)).map((name, i) => {
                return (
                  <option value={name} key={i}>
                    {name}
                  </option>
                );
              })}
            </select>
            <select
              onChange={searchHandler}
              name="Collage"
              className="form-control"
            >
              <option value="">Collages</option>
              {Array.from(new Set(collages)).map((name, i) => {
                return (
                  <option value={name} key={i}>
                    {name}
                  </option>
                );
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
