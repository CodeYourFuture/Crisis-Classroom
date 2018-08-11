import React from "react";
import axios from "axios";
import decode from "jwt-decode";

export default class TeachersCommunication extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      err: null,
      msg: null,
      message: "",
      send_to_email: false,
      messageSent: null
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
    e.preventDefault();
    const getTime = date => {
      return `${date.getHours()}:${("0" + date.getMinutes()).slice(-2)}`;
    };
    const date_id = Date.now().toString();
    const time = getTime(new Date(Date.now()));
    const { toUserId, socket } = this.props;
    const token = localStorage.getItem("id_token");
    const decoded = decode(token);
    const userId = decoded.id;
    const { message, send_to_email } = this.state;

    socket.emit("SEND_MESSAGE", {
      time,
      user_id: userId,
      to_user_id: toUserId,
      message,
      send_to_email,
      date_id
    });

    axios
      .post(`${process.env.REACT_APP_DOMAIN}/messenger`, {
        time,
        userId,
        toUserId,
        message,
        send_to_email
      })
      .then(result => {
        if (result) {
          const { msg, messageSent } = result.data;
          this.setState({ msg, messageSent });
          if (messageSent) {
            this.props.componentDidMount();
          }
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
    this.setState({ message: "" });
  };

  render() {
    return (
      <div>
        <form>
          <div className="form-group">
            <input
              className="form-control messenger-input"
              name="message"
              form="usrform"
              placeholder="Write a message ... "
              value={this.state.message}
              onChange={this.handleChange}
            />
          </div>
          <div className="messenger-send-btn-checkbox">
            <div className="form-group messenger-checkbox">
              <input
                type="checkbox"
                name="send_to_email"
                onChange={this.handleChangeCheckbox}
              />
              {"  "}
              <label>Send as a email </label>
            </div>
            <div className="messenger-btn-div">
              <button
                className="btn btn-outline-dark messenger-btn"
                onClick={this.handleSubmit}
              >
                Send
              </button>
            </div>
          </div>
        </form>
      </div>
    );
  }
}
