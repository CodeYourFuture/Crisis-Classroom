import React, { Fragment, Component } from "react";
import Input from "../../input";
import axios from "axios";
import decode from "jwt-decode";
import withFormState from "../../header/withFormState";

class AddExperience extends Component {
  state = {
    what_experience: "",
    what_date: "",
    what_place: "",
    with_whom_student: "",
    with_whom_teacher: "",
    about_experience: ""
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
      .post(`${process.env.REACT_APP_DOMAIN}/creat-experience`, {
        user_id,
        ...this.state
      })
      .then(this.props.toSuccess, this.props.showBackData())
      .catch(this.props.toError);
  };
  render() {
    return (
      <Fragment>
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
      </Fragment>
    );
  }
}
export default withFormState(AddExperience);
