import React from "react";
// import { Link } from 'react-router-dom';
// import Button from '../../button';
// import Label from '../../label';
import Input from "../../input";
import axios from "axios";
import decode from "jwt-decode";

export default class AddExperience extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      err: null,
      msg: null,
      what_experience: "",
      what_date: "",
      what_place: "",
      with_whom_student: "",
      with_whom_teacher: "",
      about_experience: "",
      success: false
    };
  }
  handleChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  handleSubmit = e => {
    e.preventDefault();
    const token = localStorage.getItem("id_token");
    const decoded = decode(token);
    const user_id = decoded.id;
    const {
      what_experience,
      what_date,
      what_place,
      with_whom_student,
      with_whom_teacher,
      about_experience
    } = this.state;
    axios
      .post(`${process.env.REACT_APP_DOMAIN}/creat-experience`, {
        user_id,
        what_experience,
        what_date,
        what_place,
        with_whom_student,
        with_whom_teacher,
        about_experience
      })
      .then(result => {
        if (result) {
          const { msg, success } = result.data;
          this.setState({ msg, success });
        }
      })
      .catch(err => {
        if (err.msg) {
          this.setState({ err: err.msg });
        } else {
          this.setState({
            err:
              "Sorry something happened on the server, please try again later."
          });
        }
      });
  };
  render() {
    const { err, msg, success } = this.state;
    return (
      <div>
        {success && this.props.showBackData(success)}
        {msg || err ? (
          <p>{msg}</p>
        ) : (
          <div>
            {err && <p className="error">{err}</p>}
            <p>Add new experience</p>
            <form>
              <div className="form-group">
                <Input
                  className="form-control"
                  name="what_experience"
                  type="text"
                  placeholder="what Experience"
                  value={this.state.what_experience}
                  onChange={this.handleChange}
                />
              </div>
              <div className="form-group">
                <Input
                  className="form-control"
                  name="what_date"
                  type="text"
                  placeholder="Insert the date"
                  value={this.state.what_date}
                  onChange={this.handleChange}
                />
              </div>
              <div className="form-group">
                <Input
                  className="form-control"
                  name="what_place"
                  type="text"
                  placeholder="Insert the place"
                  value={this.state.what_place}
                  onChange={this.handleChange}
                />
              </div>
              <div className="form-group">
                <Input
                  className="form-control"
                  name="with_whom_student"
                  type="text"
                  placeholder="Student you work with"
                  value={this.state.with_whom_student}
                  onChange={this.handleChange}
                />
              </div>
              <div className="form-group">
                <Input
                  className="form-control"
                  name="with_whom_teacher"
                  type="text"
                  placeholder="Teacher you work with"
                  value={this.state.with_whom_teacher}
                  onChange={this.handleChange}
                />
              </div>
              <div className="form-group">
                <textarea
                  className="form-control-textarea"
                  rows="4"
                  cols="50"
                  name="about_experience"
                  form="usrform"
                  placeholder="More About your experience..> Cane be a short story"
                  value={this.state.about_experience}
                  onChange={this.handleChange}
                />
              </div>
              <button
                className="btn btn-info btn-lg w-100"
                onClick={this.handleSubmit}
              >
                Add
              </button>
            </form>
          </div>
        )}
      </div>
    );
  }
}
