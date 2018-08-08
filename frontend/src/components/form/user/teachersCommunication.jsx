import React from "react";
import axios from "axios";
import decode from "jwt-decode";

export default class AddExperience extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      err: null,
      msg: null,
      messege: "",
      send_to_email: false
    };
  }
  handleChangeCheckbox = e => {
    this.setState({
      [e.target.name]: e.target.checked
    });
  };
  handleChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  handleSubmit = e => {
    this.props.getMesseges()
    e.preventDefault();
    const { receiverId } = this.props;
    const token = localStorage.getItem("id_token");
    const decoded = decode(token);
    const senderId = decoded.id;
    const { messege, send_to_email } = this.state;
    axios
      .post(`${process.env.REACT_APP_DOMAIN}/messenger`, {
        senderId,
        receiverId,
        messege,
        send_to_email
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
              "Sorry something happened on the server, please try again later."
          });
        }
      });
  };
  render() {
    const { err, msg } = this.state;
    return (
      <div>
        <p>
          {msg}
          {err}
        </p>
        <form>
          <div className="form-group">
            <textarea
              className="form-control"
              rows="2"
              cols="10"
              name="messege"
              form="usrform"
              placeholder="Write a messege ... "
              value={this.state.messege}
              onChange={this.handleChange}
            />
          </div>
          <div className="form-group">
            <label>Send it to email as well</label>
            <input
              type="checkbox"
              name="send_to_email"
              onChange={this.handleChangeCheckbox}
            />
          </div>
          <button className="btn btn-outline-dark" onClick={this.handleSubmit}>
            Send
          </button>
        </form>
      </div>
    );
  }
}
