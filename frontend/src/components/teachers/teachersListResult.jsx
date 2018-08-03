import React, { Component } from "react";
import { Link } from "react-router-dom";
// import Input from "../input";

let skillNames = [];
let experienceName = [];
let industry = [];
let Collages = [];

export default class TeachersListResult extends Component {
  constructor(props) {
    super(props);
    this.state = {
      // skillNames: [],
      // experienceName: [],
      // industry: [],
      // collages: [],
      filters: false,
      err: null,
      msg: null
    };
  }
  onChangeFilters() {
    console.log("hi", this.props);
    const { searchResultForCollages } = this.props;
    searchResultForCollages.map(teacher => {
      return (
        //search For Skill Name
        teacher.skills.map(skill => {
          // console.log(this.state.skillNames)
          // const skillNames = skill.skill_name;
          return skillNames.push(skill.skill_name);
          // return this.setState({
          //   skillNames: [...this.state.skillNames, skillNames]
          // });
        }),
        //search For Experiences
        teacher.experiences.map(experience => {
          return experienceName.push(experience.what_experience);
          // return this.setState({
          //   experienceName: [
          //     ...this.state.experienceName,
          //     experience.what_experience
          //   ]
          // });
        }),
        //search For places they work in
        teacher.experiences.map(experience => {
          return industry.push(experience.what_place);
          // return this.setState({
          //   industry: [...this.state.industry, experience.what_place]
          // });
        }),
        //search For Collages
        teacher.experiences.map(experience => {
          return Collages.push(experience.with_whom_teacher);
          // return this.setState({
          //   collages: [...(this.state.collages + experience.with_whom_teacher)]
          // });
        })
      );
    });
  }
  showFilters = () => {
    this.onChangeFilters();
    if (!this.state.filters) {
      this.setState({ filters: true });
    } else this.setState({ filters: false });
  };
  render() {
    const { searchHandler, searchResultForCollages } = this.props;
    const {
      filters
      // skillNames,
      // experienceName,
      // collages,
      // industry
    } = this.state;
    // console.log(this.state);
    // console.log(this.state.skillNames);

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
              {Array.from(new Set(Collages)).map((name, i) => {
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
