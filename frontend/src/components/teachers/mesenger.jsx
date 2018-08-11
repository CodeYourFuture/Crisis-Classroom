import React, { Component } from "react";
import axios from "axios";
import decode from "jwt-decode";
// import ScrollArea from "react-scrollbar";

import TeachersCommunication from "../form/user/teachersCommunication";

export default class Messenger extends Component {
  constructor(props) {
    super(props);
    this.state = {
      err: null,
      msg: null,
      userMessages: [],
      toUserMessages: []
    };
    this.socketEvents = []
  }

  UNSAFE_componentWillMount() {
    const { socket } = this.props;
    this.getMessages();
    socket.on("RECEIVE_MESSAGE", message => {
      this.addMessage(message);
    });
  }

  componentWillUnmount() {
		this.deinitialize()
	}


	deinitialize(){
		const { socket } = this.props
		this.removeSocketEvents(socket, this.socketEvents)
	}

	removeSocketEvents(socket, events){
		if(events.length > 0){
			socket.off(events[0])
			this.removeSocketEvents(socket, events.slice(1))
		}
  }
  

  addMessage = message => {
    const token = localStorage.getItem("id_token");
    const decoded = decode(token);
    const userId = decoded.id;
    // const toUserId = this.props.teacher.id;
    if (userId === message.user_id) {
      console.log("save user message");
      const userMessages = [...this.state.userMessages, message];
      this.setState({ userMessages });
    }
    if (userId === message.to_user_id) {
      console.log("save resiver message");
      const userMessages = [...this.state.userMessages, message];
      this.setState({ userMessages });
    }
    this.socketEvents.push(message)
    // console.log(message);
  };

  getMessages() {
    const token = localStorage.getItem("id_token");
    const decoded = decode(token);
    const userId = decoded.id;
    const toUserId = this.props.teacher.id;
    axios
      .post(`${process.env.REACT_APP_DOMAIN}/get-messages`, {
        userId,
        toUserId
      })
      .then(result => {
        if (result) {
          const { userMessages, toUserMessages } = result.data;
          this.setState({ userMessages, toUserMessages });
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

  messages = () => {
    // const { teacher } = this.props;
    const { userMessages, toUserMessages } = this.state;
    const token = localStorage.getItem("id_token");
    const decoded = decode(token);
    const userId = decoded.id;
    const resultMessages = userMessages
      .concat(toUserMessages)
      .sort(this.dynamicSort("date_id"));
    return resultMessages.map((messages, i) => {
      const cls =
        messages.user_id === userId ? "user-messages" : "to-user-messages";
      return (
        <div className={`${cls}-div`} key={i}>
          <h6 className={cls}>
            <p>{messages.time}</p>
            <p>{messages.message}</p>
          </h6>
        </div>
      );
    });
    // return resultMessages.map((messages, i) => {
    //   if (messages.user_id === userId) {
    //     return (
    //       <div key={i} className={`user-messages-div`}>
    //         <h6 className="user-messages">{messages.message}</h6>
    //       </div>
    //     );
    //   } else
    //     return (
    //       <div key={i} className={`to_user-messages-div`}>
    //         <h6 className="to-user-messages">{messages.message}</h6>
    //       </div>
    //     );
    // });
  };

  render() {
    const { teacher } = this.props;
    console.log(teacher);
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
                <h4 className="modal-title">{teacher.sur_name}</h4>
              </div>
              <div className="modal-body">
                <div className="messenger-div">
                  <div ref={`thing`} id="messenger" className="mesenger">
                    <div id="message-content">{this.messages()}</div>
                  </div>
                </div>
                <TeachersCommunication
                  toUserId={teacher.id}
                  socket={this.props.socket}
                />
              </div>
              <div className="messenger-form-container" />
            </div>
          </div>
        </div>
      </div>
    );
  }
}
