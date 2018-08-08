import React, { Component } from "react";
import axios from "axios";
import decode from "jwt-decode";
import TeachersCommunication from "../form/user/teachersCommunication";

export default class Messenger extends Component {
  constructor(props) {
    super(props);
    this.state = {
      err: null,
      msg: null,
      senderMesseges: [],
      receiverMesseges: []
    };
  }
  UNSAFE_componentWillMount() {
    const token = localStorage.getItem("id_token");
    const decoded = decode(token);
    const senderId = decoded.id;
    const receiverId = this.props.teacher.id;
    axios
      .post(`${process.env.REACT_APP_DOMAIN}/get-messeges`, {
        senderId,
        receiverId
      })
      .then(result => {
        if (result) {
          const { senderMesseges, receiverMesseges } = result.data;
          this.setState({ senderMesseges, receiverMesseges });
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
  dynamicSort = property => {
    var sortOrder = 1;
    if (property[0] === "-") {
      sortOrder = -1;
      property = property.substr(1);
    }
    return (a, b) => {
      var result =
        a[property] < b[property] ? -1 : a[property] > b[property] ? 1 : 0;
      return result * sortOrder;
    };
  };
  messeges = () => {
    const { teacher } = this.props;
    const token = localStorage.getItem("id_token");
    const decoded = decode(token);
    const id = decoded.id;
    const { senderMesseges, receiverMesseges } = this.state;
    const resultMesseges = senderMesseges
      .concat(receiverMesseges)
      .sort(this.dynamicSort("id"));
    return resultMesseges.map((messeges, i) => {
      if (messeges.sender_id === id) {
        return (
          <h6 key={i} className="sender-messeges">
            {messeges.messege} :you
          </h6>
        );
      } else
        return (
          <h6 key={i} className="receiver-messeges">
            {teacher.first_name}: {messeges.messege}
          </h6>
        );
    });
  };
  render() {
    const { teacher } = this.props;
    return (
      <div>
        <div>{this.messeges()}</div>
        <div>
          <TeachersCommunication receiverId={teacher.id} componentDidMount={this.componentDidMount}/>
        </div>
      </div>
    );
  }
}
