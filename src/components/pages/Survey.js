import React, { Component } from "react";
import "./style.css";
var firebase = require("firebase");
var uuid=require("uuid");
var config = {
    apiKey: "AIzaSyBHnGKmokYexkzQPztbPE_tpG4DSusII28",
    authDomain: "crisis-classroom.firebaseapp.com",
    databaseURL: "https://crisis-classroom.firebaseio.com",
    projectId: "crisis-classroom",
    storageBucket: "crisis-classroom.appspot.com",
    messagingSenderId: "670869434346"
  };
  firebase.initializeApp(config);


export default class Survey extends Component {
   
    nameSubmit(event){
        var studentName= this.refs.name.value;
        this.setState({studentName: studentName},function(){
            console.log(this.state);
        })
    }

    answerSelected(event){
        var answers= this.state.answers;
        if(event.target.name ==='answer1'){
            answers.answer1=event.target.value;
        }else if(event.target.name ==='answer2'){
            answers.answer2=event.target.value;
        }else if(event.target.name ==='answer3'){
            answers.answer3=event.target.value;
        }
        this.setState({answers:answers }, function(){
            console.log(answers);
        })

    }

    questionSubmit(){
        firebase.database().ref("servey"+this.state.uid).set({
            studentName:this.state.studentName,
            answers:this.state.answers

        });

        this.setState( {isSubmitted: true} );
    }

    constructor(props){
        super(props);
        this.state={
            uid: uuid.v1(),
            studentName: "",
            answers: {
                answer1: "",
                answer2: "",
                answer3: ""
            },
            isSubmitted : false
        };
        this.nameSubmit=this.nameSubmit.bind(this);
        this.answerSelected=this.answerSelected.bind(this);
        this.questionSubmit=this.questionSubmit.bind(this);
    }





    render() {

        var studentName;
        var questions;
        if(this.state.studentName === '' && this.state.isSubmitted === false ){
            studentName = <div>
                <h1>Hey , please type your name !</h1>
                <form onSubmit={this.nameSubmit}>
                    <input className="namy" type="text" placeholder="Enter your name" ref="name"/>
                </form>
            </div>;
            questions= ""
        } else if(this.state.studentName != "" && this.state.isSubmitted === false){
            studentName = <h1> Welcome to survey, {this.state.studentName}</h1>;
            questions = <div>
                <h2>Here are some questions:</h2>
                <form onSubmit={this.questionSubmit}>
                    <div className="card">
                        <label>What kind of Templates do you like the most:</label>
                        <div>
                        <input className="my" type="radio" name="answer1" value="making" onChange={this.answerSelected}/> Making
                        <input className="my" type="radio" name="answer1" value="Cooking" onChange={this.answerSelected}/> Cooking
                        <input className="my" type="radio" name="answer1" value="Playing" onChange={this.answerSelected}/> Playing
                        </div>
                    </div>

                    <div className="card">
                        <label>You are a :</label>
                        <div>
                        <input className="my" type="radio" name="answer2" value="Student" onChange={this.answerSelected}/> Student
                        <input className="my" type="radio" name="answer2" value="Teacher" onChange={this.answerSelected}/> Teacher
                        <input className="my" type="radio" name="answer2" value="Visitor" onChange={this.answerSelected}/> Visitor
                        </div>
                    </div>
                
                    <div className="card">
                        <label>Is online learning helpful:</label>
                        <div>
                        <input className="my" type="radio" name="answer3" value="Yes" onChange={this.answerSelected}/> Yes
                        <input className="my" type="radio" name="answer3" value="No" onChange={this.answerSelected}/> No
                        <input className="my" type="radio" name="answer3" value="Maybe" onChange={this.answerSelected}/> Maybe
                        </div>
                    </div>
                    <input className="btn btn-primary" type="submit" value="submit"/>
                </form>
                
            </div>
        } else if(this.state.isSubmitted === true){
            studentName=<h1>Thanks, {this.state.studentName}</h1>
        }



        return (<div>
            {studentName}
            {questions}
            </div>
        
        );
    }
}
