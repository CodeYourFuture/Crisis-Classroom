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
    
    // const { teacher } = this.props;
    const token = localStorage.getItem("id_token");
    const decoded = decode(token);
    const id = decoded.id;
    const { senderMesseges, receiverMesseges } = this.state;
    const resultMesseges = senderMesseges
      .concat(receiverMesseges)
      .sort(this.dynamicSort("date_id"));
    return resultMesseges.map((messeges, i) => {
      const cls = messeges.sender_id === id ? "sender-messeges" : "receiver-messeges"
      return (
        <div className={`${cls}-div`}>
          <h6 key={i} className={cls}>
            {messeges.messege}
          </h6>
        </div>
      );
      
    });

  };

  onMessageSend = (messege) => {
    const date_id = Date.now().toString();
    const firstMessage = this.state.senderMesseges[0]
    const newMessage = {
      sender_id: firstMessage.sender_id,
      receiver_id: firstMessage.receiver_id,
      date_id,
      messege
    }
    const senderMesseges = [...this.state.senderMesseges, newMessage]
    this.setState({senderMesseges})
  }

  render() {
    const { teacher } = this.props;
    return (
      <div className="container">
        <button
          type="button"
          className="btn btn-info btn-lg"
          data-toggle="modal"
          data-target="#myModal"
        >
          Open Messenger
        </button>
        <div className="modal fade" id="myModal" role="dialog">
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <button type="button" className="close" data-dismiss="modal">
                  &times;
                </button>
                <h4 className="modal-title">Messenger</h4>
              </div>
              <div className="modal-body">
                <div className="messenger-div">
                  <div className="mesenger">
                    <div id="message-content" >{this.messeges()}</div>
                  </div>
                </div>
                <TeachersCommunication
                  receiverId={teacher.id}
                  componentDidMount={this.componentDidMount}
                  // {...this.props}
                  onMessageSend={this.onMessageSend}
                />
              </div>
              <div className="messenger-form-container">

              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
