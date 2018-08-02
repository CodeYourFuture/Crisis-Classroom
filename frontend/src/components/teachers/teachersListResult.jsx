import React, { Component } from "react";
import { Link } from "react-router-dom";
// import Input from "../input";

let skillNames = [];
let whatExperiences = [];
let Whatplaces = [];
let Collages = [];


export default class TeachersListResult extends Component {
  constructor(props) {
    super(props);
    this.state = {
      skillNames:[],
      err: null,
      msg: null
    };
  }
componentDidMount(){
  console.log(this.props)
  this.props.teachers.map(teacher => {
    return (
      //search For Skill Name
      teacher.skills.map(skill => {
        return this.setState({
          skillNames:skill
        })
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
} 
  render() {
    const { teachers, searchHandler, searchResultForCollages } = this.props;
    console.log(this.props)

    return (
      <div>
        <h1>Teachers</h1>
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
            {Array.from(new Set(whatExperiences)).map((name, i) => {
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
            {Array.from(new Set(Whatplaces)).map((name, i) => {
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
