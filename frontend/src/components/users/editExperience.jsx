import React from "react";
import { withRouter } from "react-router";
import axios from "axios";
// import decode from 'jwt-decode';
import {Link} from 'react-router-dom';
// import Button from '../button';
// import Label from "../label";
import Input from "../input";

class editSkill extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      err: null,
      msg: null,
      id: null,
      what_experience: "",
      what_date: "",
      what_place: "",
      with_whom_student: "",
      with_whom_teacher: "",
      about_experience: ""
    };
  }
  handleChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };
  handleEdit = e => {
    e.preventDefault();
    const {
      id,
      what_experience,
      what_date,
      what_place,
      with_whom_student,
      with_whom_teacher,
      about_experience
    } = this.state;
    axios
      .post(`${process.env.REACT_APP_DOMAIN}/edit-experience`, {
        id,
        what_experience,
        what_date,
        what_place,
        with_whom_student,
        with_whom_teacher,
        about_experience
      })
      .then(result => {
        if (result) {
          const { msg } = result.data;
          this.setState({ msg });
        }
      })
      .catch(err => {
        if (err.msg) {
          this.setState({ err: err.msg });
        } else {
          this.setState({
            err:
              "Ops! Sorry something happened on the server, please try again later"
          });
        }
      });
  };
  handleDelete = e => {
    e.preventDefault();
    const { id } = this.state;
    axios
      .post(`${process.env.REACT_APP_DOMAIN}/delete-experience`, {
        id
      })
      .then(result => {
        if (result) {
          const { msg } = result.data;
          this.setState({ msg });
        }
      })
      .catch(err => {
        if (err.msg) {
          this.setState({ err: err.msg });
        } else {
          this.setState({
            err:
              "Ops! Sorry something happened on the server, please try again later"
          });
        }
      });
  };
  UNSAFE_componentWillMount() {
    const url = this.props.match.url;
    const { id } = this.props.match.params;
    axios
      .post(`${process.env.REACT_APP_DOMAIN}${url}`, { id })
      .then(result => {
        if (result) {
          if (result) {
            const {
              id,
              what_experience,
              what_date,
              what_place,
              with_whom_student,
              with_whom_teacher,
              about_experience
            } = result.data[0];
            this.setState({
              id,
              what_experience,
              what_date,
              what_place,
              with_whom_student,
              with_whom_teacher,
              about_experience
            });
          }
        }
      })
      .catch(err => {
        if (err.msg) {
          this.setState({ err: err.msg });
        } else {
          this.setState({
            err:
              "Ops! Sorry something happened on the server, please try again later"
          });
        }
      });
  }

  render() {
    const {
      msg,
      err,
      what_experience,
      what_date,
      what_place,
      with_whom_student,
      with_whom_teacher,
      about_experience
    } = this.state;
    return (
      <div>
        {msg || err ? (
          <div>
            {msg ? (
              <div>
                <p>{msg}</p>
                <Link to="/user-profile">Your Profile</Link>
              </div>
            ) : (
              <p>{err}</p>
            )}
          </div>
        ) : (
          <div>
            <h5>Edit or delete your experience</h5>
            <form>
              <div className="form-group">
                <Input
                  className="form-control"
                  name="what_experience"
                  type="text"
                  placeholder="what Experience"
                  value={what_experience}
                  onChange={this.handleChange}
                />
              </div>
              <div className="form-group">
                <Input
                  className="form-control"
                  name="what_date"
                  type="text"
                  placeholder="Insert the date"
                  value={what_date}
                  onChange={this.handleChange}
                />
              </div>
              <div className="form-group">
                <Input
                  className="form-control"
                  name="what_place"
                  type="text"
                  placeholder="Insert the place"
                  value={what_place}
                  onChange={this.handleChange}
                />
              </div>
              <div className="form-group">
                <Input
                  className="form-control"
                  name="with_whom_student"
                  type="text"
                  placeholder="Student you work with"
                  value={with_whom_student}
                  onChange={this.handleChange}
                />
              </div>
              <div className="form-group">
                <Input
                  className="form-control"
                  name="with_whom_teacher"
                  type="text"
                  placeholder="Teacher you work with"
                  value={with_whom_teacher}
                  onChange={this.handleChange}
                />
              </div>
              <div className="form-group">
                <textarea
                  className="form-control"
                  rows="4"
                  cols="50"
                  name="about_experience"
                  form="usrform"
                  placeholder="More About your experience..> Cane be a short story"
                  value={about_experience}
                  onChange={this.handleChange}
                />
              </div>
              <button
                className="btn btn-outline-dark"
                onClick={this.handleEdit}
              >
                Edit
              </button>
              <button
                className="btn btn-outline-dark"
                onClick={this.handleDelete}
              >
                Delete
              </button>
            </form>
          </div>
        )}
      </div>
    );
  }
}

export default withRouter(editSkill);
