import React, { Fragment, Component } from "react";
import axios from "axios";
import withFormState from "../../header/withFormState";
import decode from "jwt-decode";

class SkillForm extends Component {
  state = {
    skill_name: "",
    about_skill: "",
    skill_level: ""
  };
  handleChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };
  handleSubmit = e => {
    e.preventDefault();
    this.props.toSubmitting();
    const token = localStorage.getItem("id_token");
    const decoded = decode(token);
    const user_id = decoded.id;
    axios
      .post(`${process.env.REACT_APP_DOMAIN}/creat-skill`, {
        user_id,
        ...this.state
      })
      .then(this.props.toSuccess, this.props.showBackData())
      .catch(this.props.toError);
  };

  render() {
    return (
      <Fragment>
        <p>Add new skill</p>
        <form>
          <div className="form-group">
            <input
              className="form-control"
              name="skill_name"
              type="text"
              placeholder="Skill name"
              value={this.state.skill_name}
              onChange={this.handleChange}
            />
          </div>
          <div className="form-group">
            <textarea
              className="form-control-textarea"
              rows="4"
              cols="50"
              name="about_skill"
              form="usrform"
              placeholder="More About your skill..."
              value={this.state.about_skill}
              onChange={this.handleChange}
            />
          </div>
          <div className="form-group">
            <select
              name="skill_level"
              value={this.state.skill_level}
              onChange={this.handleChange}
              className="form-control"
            >
              <option>Skill level</option>
              <option value="Beginner">Beginner</option>
              <option value="Intermediate">Intermediate</option>
              <option value="Advance">Advance</option>
            </select>
          </div>
          <button
            className="btn btn-info btn-lg w-100"
            onClick={this.handleSubmit}
          >
            Add
          </button>
        </form>
      </Fragment>
    );
  }
}

export default withFormState(SkillForm);
