import React from "react";
import Input from "../../input";
import axios from "axios";
import decode from "jwt-decode";

export default class AddSkill extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      err: null,
      msg: null,
      skill_name: "",
      about_skill: "",
      skill_level: "",
      success: false
    };
  }

  handleChange = e => {
    this.setState({
      [e.target.name]: e.target.value,
      msg: null,
      success: false
    });
  };

  handleSubmit = e => {
    e.preventDefault();
    const token = localStorage.getItem("id_token");
    const decoded = decode(token);
    const user_id = decoded.id;
    const { skill_name, about_skill, skill_level } = this.state;
    axios
      .post(`${process.env.REACT_APP_DOMAIN}/creat-skill`, {
        user_id,
        skill_name,
        about_skill,
        skill_level
      })
      .then(result => {
        if (result) {
          const { msg, success } = result.data;
          this.setState({
            msg,
            success,
            skill_name: "",
            about_skill: "",
            skill_level: ""
          });
        }
      })
      .catch(err => {
        if (err.msg) {
          this.setState({ err: err.msg });
        } else {
          this.setState({
            err:
              " Sorry something happened on the server, please try again later"
          });
        }
      });
  };
  render() {
    const { msg, err, success } = this.state;
    return (
      <div>
        {success && this.props.showBackData()}
        <div>
          {msg && <p>{msg}</p>}
          {err && <p className="error">{err}</p>}
          <p>Add new skill</p>
          <form>
            <div className="form-group">
              <Input
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
        </div>
      </div>
    );
  }
}
